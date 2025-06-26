# Tauri应用更新Updater

文档：[Updater | Tauri Apps](https://tauri.app/zh-cn/v1/guides/distribution/updater/)

API：[updater | Tauri Apps](https://tauri.app/zh-cn/v1/api/js/updater)

正常的应用程序更新需要手动下载并安装，而借助 [Tauri 内置的 Updater 程序](https://tauri.app/zh-cn/v1/guides/distribution/updater/) ，我们可以实现应用程序的自动更新推送

下面将介绍如何在 tauri 项目中实现自动更新推送的过程（仅windows环境）。为了避免给后端增加工作量，我选择静态json文件来配置更新信息，json与安装包同时保存在 minioOSS 中

[打造完美桌面应用体验：Tauri自动升级技术揭秘 - 掘金 (juejin.cn)](https://juejin.cn/post/7326738921471016969)

## 实现步骤

### 1. 生成签名

使用签名可以确保文件的完整性和来源可信性，在项目根目录执行命令 `npm run tauri signer generate -- -w ./app.key `

后生成 app.key 和 app.key.pub（公钥） 文件

### 2. 配置 Updater

文档: [Configuration | Tauri Apps](https://tauri.app/zh-cn/v1/api/config/#updaterconfig)

确保 Tauri 项目配置文件（`tauri.conf.json`）已经正确配置 Updater：

```json5
{
  "updater": {
    "active": true,
    // 更新程序是否激活
    "dialog": false,
    // 显示内置对话框，太丑了我不用
    "pubkey": "xxx",
    // app.key.pub签名公钥
    "endpoints": [
      "https://xxx/updater.json"
      // 更新元数据的静态json文件地址
    ]
  }
}
```

- `endpoints`：数组，通过地址列表来确定服务器端是否有可用更新，字符串 {{target}} 和 {{current_version}} 会在 URL 中自动替换。如果指定了多个地址，服务器在预期时间内未响应，更新程序将依次尝试。 endpoints 支持两种格式：
  - 动态接口 - 服务器根据客户端的更新请求确定是否需要更新。 如果需要更新，服务器应以状态代码 200 OK 进行响应，并在正文中包含更新 JSON。 如果不需要更新，服务器必须响应状态代码 204 No Content。
  - 静态文件 - 备用更新技术使用纯 JSON 文件，将更新元数据存储在 gist，github-pages 或其他静态文件存储中。（我选择的）

配置完成后执行构建客户端的命令得到安装包，别忘了开启 updater 后的构建需要环境变量 `TAURI_PRIVATE_KEY、TAURI_KEY_PASSWORD`

### 3. 编辑静态json文件（保存更新元数据）

文档: [Updater | Tauri Apps](https://tauri.app/zh-cn/v1/guides/distribution/updater/#static-json-file)

由于关闭了内置更新对话框，需要在程序内手动检查更新，并执行后续的交互逻辑：

```json5
// updater.json
{
  "version": "v1.0.0",
  // 版本号，版本格式：主版本号.次版本号.修订号
  "notes": "new Version",
  // 更新说明
  "pub_date": "2024-01-26T01:57:18.253Z",
  // RFC 3339
  "platforms": {
    "windows-x86_64": {
      "signature": "xxx",
      // 私钥，app.key内容
      "url": "https://xxx/xxx.nsis.zip"
      // 安装包地址
    }
  }
}
```

### 4. 程序内手动检查更新

自定义弹窗：[Updater | Tauri Apps](https://tauri.app/zh-cn/v1/guides/distribution/updater/#custom-dialog)

```typescript
checkUpdate().then((res) => {
  const {shouldUpdate, manifest} = res;
  if (shouldUpdate) {
    Modal.confirm({
      title: `发现新版本：${manifest?.version}`,
      content: `是否升级？`,
      okText: '升级',
      cancelText: '取消',
      onOk: async () => {
        try {
          notification.info({
            message: '正在下载更新...',
            duration: 3000,
          });
          await installUpdate();
          await relaunch();
        } catch (e) {
          notification.error({
            message: '下载更新失败',
            description: e?.toString() || '',
          });
        }
      },
    });
  }
});
```

### 5. 手动上传文件到 minioOSS

将 updater.json 和 安装包.zip 文件上传到 minioOSS 中，然后将地址替换。在每次发版时手动修改 updater.json 中的信息，再重新构建并上传安装包。

一切顺利时客户端将收到更新

### 6. 懒人模式（脚本）

在 node 环境内执行构建命令，并继承环境变量

```typescript
execSync('npm run tauri build', {
  stdio: 'inherit',
  env: {
    ...process.env,
    TAURI_PRIVATE_KEY,
    TAURI_KEY_PASSWORD,
  },
});
```

登录 minio 并获取cookie

```typescript
async function login() {
  try {
    // 拿到header内的cookie
    const res = await axios.post('https://xxx/xxx/login', {
      accessKey: 'xxx',
      secretKey: 'xxx',
    });
    return res?.headers?.['set-cookie']?.toString();
  } catch (err) {
    console.log('登录minio失败');
    console.log(err);
  }
}
```

上传文件到 minio

```typescript
async function uploadFile(data, cookie) {
  try {
    await request.post(
      `https://xxx/buckets/xxx/objects/upload`,
      data,
      {
        headers: {
          Cookie: cookie,
          'Content-Type': 'multipart/form-data',
        },
      },
    );
  } catch (err) {
    console.log('上传文件失败');
    console.log(err);
  }
}
```

读取本地安装包并上传

```typescript
const FormData = require('form-data');
const fs = require('fs');

// 读取本地的 updater.json 文件
const buffer_updater = fs.readFileSync('./xxx/updater.json')
// 模拟 formData 格式上传
const formData_updater = new FormData()
formData_updater.append(buffer_updater.length.toString(), buffer_updater)
await uploadFile(formData_updater, cookie)

// 上传安装包同理
```

# Tauri 2.0 Updater自动更新指南

[Tauri 2.0 Updater自动更新指南 - 掘金 (juejin.cn)](https://juejin.cn/post/7358446362575568906)