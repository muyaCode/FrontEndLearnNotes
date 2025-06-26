# Electron 应用更新

## 体验问题

### 更新体验

- 快、影响小
- 流畅度、用户等待耗时

### 软件更新的难题-权限问题

Windows 系统：UAC & 权限问题

### 软件更新的难题-解决方案

#### 更新过程体验

- 增量更新
  - 包括像 Bsdiff Xdelta 等等
- 自动更新
  - 用户重启之后就是最新版，如 Chrome 浏览器

#### UAC 问题

- Windows 计划任务
- Windows Services
- 以上两者本质就是在安装的时候去提权，然后常驻在系统中，因此它们的更新过程就不会被限制
- 不同的是：就是 Windows 计划任务跟应用程序是没有办法交互的，而 Windows Services 是可以的
- 最有效的办法：不操作管理员权限文件、注册表

## 盘点桌面端软件更新

### 一、手动更新

- 用户手动下载、安装新包
- 优点：简单、稳定
- 缺点：过程繁琐、慢、影响使用、更新率低
- 适合场景：低频更新、用户粘性高、作为各种升级技术的降级方案

#### 手动更新流程

更新服务 => 匹配 => 客户端版本|用户信息

检查更新器 => 返回 => 包地址|版本号|更新文案

更新引导 => 提示 => 新功能|是否升级

手动更新 => 手动操作 => 跳转浏览器|打开安装包覆盖

### 二、文件覆盖

- 程序自动替换文件更新
- 优点：下载过程快
- 缺点：慢、实现比较复杂、稳定性差、写文件失败
- 适合场景：打补丁

#### 文件覆盖流程

更新服务 => 匹配 => 客户端版本|用户信息

检查更新器 => 返回 => 包地址|版本号|更新文案

更新引导 => 提示 => 新功能|是否升级

文件覆盖 => 程序操作 => 吊起子程序|关闭应用|将补丁复制到应用目录|重新启动

### 三、自动更新

- 后台下载文件、重启即新版
- 优点：稳定、快、打扰少
- 缺点：实现复杂
- 适合场景：高频更新软件、体验要求高

#### 自动更新流程

更新服务 => 检查更新器 => 下载新包 => 重启应用加载新包

- boot：启动入口
- versions：读取版本号
  - 1.0.0
  - 1.0.1

### 四、操作系统应用商店更新

#### Windows App Store 和 Mac App Store

- 通过各平台应用商店发布
- 优点：统一、稳定
- 缺点：受应用商店局限
- 适合场景：操作系统应用商店上架的软件

### 软件更新对比

| 更新方式 | 手动更新                                         | 文件覆盖                           | 自动更新                 | 操作系统                   |
| -------- | ------------------------------------------------ | ---------------------------------- | ------------------------ | -------------------------- |
| 优点     | 简单、稳定                                       | 下载过程快                         | 稳定、快、打扰少         | 统一、稳定                 |
| 缺点     | 过程繁琐、慢、影响使用、更 慢、新率低            | 实现比较复杂、稳定性差、写文件失败 | 实现复杂                 | 受应用商店局限             |
| 适用场景 | 低频更新、用户粘性高、作为各种升级技术的降级方案 | 打补丁                             | 高频更新软件、体验要求高 | 操作系统应用商店上架的软件 |

## 盘点 Electron 更新

### 一、Web 化

- 将渲染进程(业务)放置在远程 HTTPS
- 优点：更新快、体验极好
- 缺点：无法离线使用、主进程更新复杂、多版本兼容问题
- 场景：重业务、壳子更新少

### 二、更新的文件覆盖

- 属于文件覆盖思路
- 如：张鑫旭的更新方法：<https://www.zhangxinxu.com/wordpress/2017/06/how-electron-online-update-hot-fix/?replytocom=361528>

### 三、Electron 官方自动更新

自动更新文档：[autoUpdater | Electron (electronjs.org)](https://www.electronjs.org/zh/docs/latest/api/auto-updater)

- 基于 Squirrel 框架完成的自动更新：如 `electron-builder-squirrel-windows` 库

### 四、Electron-Updater

官方文档：

- [发布和更新 | Electron (electronjs.org)](https://www.electronjs.org/zh/docs/latest/tutorial/推送更新教程)
- [发布和更新 | Electron (electronjs.org)](https://www.electronjs.org/zh/docs/latest/tutorial/tutorial-publishing-updating)
- [更新应用程序 | Electron (electronjs.org)](https://www.electronjs.org/zh/docs/latest/tutorial/updates)

Electron 官方 Updater 的改版，由 electron-builder 提出

- 优点
  - 接入简单
  - Windows 支持签名验证
  - 支持进度条
  - 基于 electron-builder 非常容易使用
- 缺点
  - windows 更新体验没有内置的好
  - windows 存在权限问题
  - 详见：<https://www.electron.build/auto-update.html>

## 更新相关技术

### 一、增量更新

- 增量更新：只更新需要更新的地方
- 增量包(差分包、补丁包)：新旧包的差异包
- 增量技术：
  - bsdiff/bspatch:适用二进制文件、开源、免费、广泛使用 (尤其移动端)
  - Xdelta3:适用于二进制
  - Courgette: 谷歌提出的方案，是 bsdiff 的优化
  - RTPatch:商业付费
  - 对比参考：[Xdelta3 bsdiff Courgette 三种差分算法比较 - 尚叶鑫的个人主页 (shangyexin.com)](https://www.shangyexin.com/2018/09/28/delta_algorithm/)

#### 增量更新过程

- 新版本和旧版本对比：V1.0.0 和 V1.0.1 => diff => patch(1.0.0-1.0.1)
- 对比出不一样的地方，更新补丁 path：V1.0.0 和 patch(1.0.0-1.0.1) => patch => V1.0.1

### 二、灰度发布

- 客户端无法“回滚”
- 按一定规则逐渐放量
  - 用户特征
  - 客户端特征
  - 随机
  - ...

#### 灰度发布流程

灰度平台 => 更新服务 => 客户端(1.0) | 客户端(1.0) | 客户端(1.1)

## 实战 Electron 更新

官网文档：[更新应用程序 | Electron (electronjs.org)](https://www.electronjs.org/zh/docs/latest/tutorial/updates#applying-updates)

自动更新文档：[autoUpdater | Electron (electronjs.org)](https://www.electronjs.org/zh/docs/latest/api/auto-updater)

### Mac 客户端更新-服务端

有返回

```json
{
	"url": "https://mycompany.example.com/myapp/releases/myrelease",
	"name": "My Release Name",
	"notes": "Theses are some release notes innit",
	"pub date": "2023-09-18T12:29:53+01:00"
}
```

无返回

```json
status=204
```

### Mac 客户端更新-客户端需求

- 证书
  - 一般 Developerld 证书就够用了
  - 本机测试：自建证书流程
    - 打开钥匙串 -> 顶部菜单栏 “钥匙串访问” -> 证书助理 -> 创建证书
    - 创建证书：填写名称、身份类型：自签名、证书类型：代码签名
    - 信任证书：证书的钥匙串搜索出创建好的证书 -> 双击证书 -> 信任 -> 始终信任证书

### Mac 客户端更新

使用的 electron API 和 事件

- const { autoUpdater } = require('electron');
- autoUpdater.setFeedUrl(更新服务 url);
- autoUpdater.checkForUpdate();
- autoUpdater.quitAndInstall();
- 监听事件：'update-available'、'update-downloaded'、'error'

#### 流程示意

检查更新( checkForUpdate) => 下载包 => 安装包 (quitAndInstall) => 替换文件

#### 使用 dialog 原生系统对话框模块 弹出更新提示对话框

- 用于打开和保存文件、警报等的本机系统对话框
- dialog.showMessageBox
- dialog.showOpenDialog
- dialog.showSaveDialog
- Promise、也支持 Sync 方法

### 一、Mac 系统软件客户端更新服务

1.新建`updater-server`目录

2.npm init 初始化 Node

```bash
npm init -y
```

3.安装 koa 相关依赖和 compare-versions 版本检测库

```bash
yarn add koa koa-router koa-static-server compare-versions
# 或
npm install koa koa-router koa-static-server compare-versions --save
```

4.根目录新建 index.js 文件，写入以下代码

```js
const Koa = require("koa");
const app = new Koa();
const Router = require("koa-router");
const router = new Router();
const server = require("koa-static-server");
const compareVersions = require("compare-versions");

// 获取最新的版本
function getNewVersion(versions) {
	if (!versions) return null;

	let maxVersion = {
		name: "1.0.1",
		pub_date: "2023-02-01T12:26:53+1:00",
		notes: "新增功能",
		url: "http://127.0.0.1:3385/public/remote_control-1.0.1-mac.zip",
	};
	if (compareVersions.compare(maxVersion.name, versions, ">")) {
		return maxVersion;
	}
	return null;
}

// Mac系统客户端更新
router.get("/darwin", (ctx, next) => {
	// 处理Mac更新，请求后缀：?version=1.0.0&uid=123
	const { version } = ctx.query;
	let newVersion = getNewVersion(version);

	if (newVersion) {
		ctx.body = newVersion;
	} else {
		ctx.status = 204;
	}
});

app.use(
	server({
		rootDir: "public",
		rootPath: "/public",
	})
);
app.use(router.routes()).use(router.allowedMethods());

const port = 33855;
app.listen(port, () => {
	console.log(`软件更新服务运行在：http://localhost: ${port}`);
});
```

5.回到 electron 的 `main` 主进程中，新建 update.js 文件，写入以下代码

```js
const { app, autoUpdater, dialog } = require("electron");

if (process.platform == "darwin") {
	autoUpdater.setFeedURL(
		"http://127.0.0.1:33855/darwin?version=" + app.getVersion()
	);
} else if (process.platform == "win32") {
	autoUpdater.setFeedURL(
		"http://127.0.0.1:33855/win32?version=" + app.getVersion()
	);
}

// 定时轮询，服务端推送
autoUpdater.checkForUpdates();

autoUpdater.on("update-available", (e, notes, version) => {
	// 配合main.js中的'will-finish-launching'的生命周期监听是在app.whenReady().then();之前
	// 提醒用户更新，dialog模块需要在app.whenReady().then();之后才能使用
	app.whenReady().then(() => {
		let clickId = dialog.showMessageBoxSync({
			type: "info",
			title: "升级提示",
			message: "已为你升级到最新版，是否立即体验",
			buttons: ["马上升级", "手动重启"],
			cancelId: 1,
		});
		if (cancelId === 0) {
			autoUpdater.quitAndInstall();
			app.quit();
		}
	});
});

autoUpdater.on("error", (err) => {
	console.log("update error：", err);
});
```

6.在 main.js 主进程中，添加监听 `'will-finish-launching'` 生命周期，触发更新

```js
// 监听软件启动完成，加载软件更新
app.on("will-finish-launching", () => {
	require("./update.js");
});
```

### 二、Windows 客户端更新—服务端

- 响应 feedURL/RELEASES
- 有更新返回 RELEASES 文件内容(打包时出现的)，如`BBC6F98A5CD32C675AAB6737A5F67176248B900C remote_control-1.0.1-fullnupkg 62177782`
- 无更新返回 204
- 响应 `feedURL/*.nupkg`，返回更新安装包

#### 前置准备

- 包准备
  - 安装包不能使用 NSIS，需要使用 Squirrel
  - 更新需要 Squirrel 配套的 nupkg 包

#### 服务端编码 windows 客户端的更新

update-server 服务端的 `index.js` 继续添加代码

```js
const Koa = require("koa");
const app = new Koa();
const Router = require("koa-router");
const router = new Router();
const server = require("koa-static-server");
const compareVersions = require("compare-versions");

// 获取最新的版本
function getNewVersion(versions) {
	if (!versions) return null;

	let maxVersion = {
		name: "1.0.1",
		pub_date: "2023-02-01T12:26:53+1:00",
		notes: "新增功能",
		url: "http://127.0.0.1:3385/public/remote_control-1.0.1-mac.zip",
	};
	if (compareVersions.compare(maxVersion.name, versions, ">")) {
		return maxVersion;
	}
	return null;
}

// Windows系统客户端更新
router.get("/win32/RELEASES", (ctx, next) => {
	// 处理Windows系统客户端更新，请求后缀：?version=1.0.0&uid=123
	let newVersion = getNewVersion(ctx.query.version);

	if (newVersion) {
		ctx.body =
			"08650F322824190BA203D64BF41728381B4D87F7 remote_control-1.0.1-full.nupkg 100716339";
	} else {
		ctx.status = 204;
	}
});
// windows静态文件服务
router.get("/win32/(.*).nupkg", (ctx, next) => {
	// redirect s3 静态文件服务
	ctx.redirect(`/public/${ctx.params[0]}.nupkg`);
});

// Mac系统客户端更新
router.get("/darwin", (ctx, next) => {
	// 处理Mac更新，请求后缀：?version=1.0.0&uid=123
	let newVersion = getNewVersion(ctx.query.version);

	if (newVersion) {
		ctx.body = newVersion;
	} else {
		ctx.status = 204;
	}
});

app.use(
	server({
		rootDir: "public",
		rootPath: "/public",
	})
);
app.use(router.routes()).use(router.allowedMethods());

const port = 33855;
app.listen(port, () => {
	console.log(`软件更新服务运行在：http://localhost: ${port}`);
});
```

#### 回到 electron 的 客户端项目代码

- 1.先安装库：`npm i electron-squirrel-startup --save`
  - npm 地址：[electron-squirrel-startup - npm (npmjs.com)](https://www.npmjs.com/package/electron-squirrel-startup)
- 2.在 main.js 主进程最上面加上：`if(require('electron-squirrel-startup')) return;`

#### 重新编译客户端再运行

- 3.重新编译 electron 的软件客户端
- 4.在打包后的文件夹：`squirrel-windows`的 `软件名 Setup 1.0.0.exe` 包，双击安装，安装后会在桌面生成快捷图标，然后会自动启动，需要把自动启动的软件进程退出，再重新启动，才会提示升级

#### 更新流程

检查更新( checkForUpdate ) => 下载包 => 安装包 (quitAndInstall) => 更新快捷方式 => 删除之前版本

#### Windows 更新的坑

- 第一次启动时候会报错：<https://github.com/electron/electron/issues/7155#issuecomment-245993316>
- 替换过程如果被中断会报错

## Electron 应用工程化--更新过程&问题

### 更新服务

- 开源项目：[update.electronjs.org](https://github.com/electron/update.electronjs.org)
- 私有项目：[nucleus](https://github.com/atlassian/nucleus)、[release-server](https://github.com/ArekSredzki/electron-release-server)

![electron更新](.\img\electron更新.jpg)

### Electron 更新进度条方案

![electron更新进度条方案](.\img\electron更新进度条方案.jpg)

### Electron 更新提速--增量更新

![Electron更新提速--增量更新](.\img\Electron更新提速--增量更新.jpg)
