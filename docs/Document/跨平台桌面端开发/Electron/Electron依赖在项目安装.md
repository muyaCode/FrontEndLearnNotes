# Electron 依赖在项目安装

window 系统指定安装版本：

安装 Electron32 位的版本

打包也要基于 32 位打包，

这样子打出来的包兼容 32 位和 64 位

```bash
npm install--arch=ia32--platform=win32 electron
```

## 1.安装依赖报错

报错如下：

```bash
node_modules/.pnpm/electron@23.0.0/node_modules/electron: Running postinstall script, failed in 4.7s
.../node_modules/electron postinstall$ node install.js
│ Error: Generated checksum for "electron-v23.0.0-win32-x64.zip" did not match expected checksum.
│     at Hash.<anonymous> (D:\Code\[MyProject]\[Electron]\electron-recruitment_assistant\node_modules\.pnpm\sumchecker@3.0.1\node_modules\sumchecker\index.js:133:20)
│     at Hash.emit (node:events:513:28)
│     at emitReadable_ (node:internal/streams/readable:590:12)
│     at onEofChunk (node:internal/streams/readable:568:5)
│     at readableAddChunk (node:internal/streams/readable:275:5)
│     at Readable.push (node:internal/streams/readable:234:10)
│     at node:internal/streams/transform:145:12
│     at Hash._flush (node:internal/crypto/hash:96:3)
│     at Hash.final [as _final] (node:internal/streams/transform:132:10)
│     at callFinal (node:internal/streams/writable:698:12)
└─ Failed in 4.7s at D:\Code\[MyProject]\[Electron]\electron-recruitment_assistant\node_modules\.pnpm\electron@23.0.0\node_modules\electron
Progress: resolved 442, reused 417, downloaded 1, added 404, done
 ELIFECYCLE  Command failed with exit code 1.
```

解决方法：

我使用的是 pnpm 安装

可以设置镜像源

1.快速删除 node_modules

```bash
npm install rimraf -g

rimraf node_modules
```

2.设置源

```bash
# 删除项目中的node_module，然后清除缓存
pnpm store prune
# 设置淘宝源
pnpm config set registry https://registry.npm.taobao.org/
pnpm config set electron_mirror https://npmmirror.com/mirrors/electron/ -g

# 查看当前源
pnpm config get registry
```

如果是 yarn

```bash
# 如果使用了 electron
yarn config set disturl https://registry.npmmirror.com/dist -g
yarn config set electron_mirror https://npmmirror.com/mirrors/electron/ -g
# 如果镜像在官方 Electron 版本中提供不同校验和，你可能必须将 electron_use_remote_checksums=1 设置为 Electron 使用远程 SHASUMS256.txt 文件来验证校验和 而不是嵌入校验和。
yarn config set electron_use_remote_checksums 1
# 如果使用了 node-sass 且 node < 15
yarn config set sass_binary_site https://registry.npmmirror.com/binary.html?path=node-sass/

# 包缓存清理
yarn cache clean
# npm缓存清除
npm cache clean --force
```

全局依赖及缓存设置

yarn

```bash
yarn config set prefix 'E:\\nodejs\\node_global'
yarn config set global-folder 'E:\\nodejs\\node_global'
yarn config set cache 'E:\\nodejs\\node_cache'
```

npm

```bash
npm config set prefix 'E:\\nodejs\\node_global'
npm config set cache 'E:\\nodejs\\node_cache'
```

## 2.electron 依赖安装卡死

在使用 npm 安装 Electron 相关依赖包 ，如：

- electron
- electron-builder
- @electron-forge/cli

可能会碰到一直卡在下载安装包的过程中。

## 解决方法：4 种方法

### 1.手动下载该安装包存放在本地目录中代替网络下载

官网文档：[Electron 常见问题 (FAQ) | Electron (electronjs.org)](https://www.electronjs.org/zh/docs/latest/faq)

官网缓存文档：[安装指导 | Electron (electronjs.org)](https://www.electronjs.org/zh/docs/latest/tutorial/installation#缓存)

需要到 Electron 的 Github 发布页面下载两个文件

淘宝镜像首页：[CNPM Binaries Mirror (npmmirror.com)](https://registry.npmmirror.com/binary.html)

- #### electron 文件夹：electron\Cache

  - Github 下载：[Releases · electron/electron (github.com)](https://github.com/electron/electron/releases/)
  - 淘宝镜像下载(推荐)：[CNPM Binaries Mirror (npmmirror.com)](https://registry.npmmirror.com/binary.html?path=electron/)
  - 下载 electron 开头的指定版本依赖包
  - 如果你不知道自己应该下载哪个版本的 electron 压缩包，可以在以下链接查看 node 版本对应的 electron 版本
    - <https://releases.electronjs.org/>
  - 在下载完成后，需要将文件拷贝到 Electron 的缓存文件夹。不同平台的缓存文件默认位置如下所述：
    - Linux：`$XDG_CACHE_HOME`或`~/.cache/electron/`
    - MacOS：`~/Library/Caches/electron/`
    - Windows：`$LOCALAPPDATA/electron/Cache`或`C:\Users\用户名\AppData\Local\electron\Cache\`
    - 老版本 Electron 的缓存文件夹可能会位于`~/.electron`中
  - 在`\node_modules\electron`下新建文件夹 dist，将刚下载的压缩包解压到 dist 文件夹中
  - 注：electron 依赖中有 path.txt 文件和 dist 文件夹，就不用再去下载这个依赖了

![electron手动下载存放的依赖](.\img\electron手动下载存放的依赖.jpg)

#### 自定义设置 electron 二进制文件缓存目录

Electron 的二进制文件压缩包下载成功后，会复制一份到缓存目录，以备下次使用。在 Windows 环境下，默认的缓存目录为：

`C:\Users\用户名\AppData\Local\electron\Cache`

这是通过 Node.js 的 os.homedir()再附加了几个子目录确定的。

你可以通过设置`electron_config_cache`环境变量来提供用户自定义缓存目录，在命令行下临时设置这个环境变量的方式为：

```bash
set electron_config_cache=D:\ElectronDeepDive\capture1\cache
```

如果你是通过编程的方式使用@electron/get 包，那么也可以通过如下方式把环境变量的设置写到代码里：

```bash
process.env.electron_config_cache="D:\\ElectronDeepDive\\capture1\\cache"
```

如果你希望一劳永逸的解决这个问题，还可以把这个环境变量配置到操作系统中去，如下图所示：

![electron的cache缓存环境变量](.\img\electron的cache缓存环境变量.png)

- #### electron-builder 文件夹：electron-builder\Cache

  - 1.1Github 下载：[Releases · electron-userland/electron-builder (github.com)](https://github.com/electron-userland/electron-builder/releases)
  - 1.2 淘宝镜像下载(推荐)：[CNPM Binaries Mirror (npmmirror.com)](https://registry.npmmirror.com/binary.html?path=electron-builder-binaries/)
  - 2.下载开头指定版本`nsis-xxxx`、`nsis-resources-xxxx`和`winCodeSign-xxxx`依赖包
  - 3.在下载完成后，需要将文件拷贝到 electron-builder 的缓存文件夹。不同平台的缓存文件夹位置如下所述：
    - Linux：`$XDG_CACHE_HOME`或`~/.cache/electron-builder/`
    - MacOS：`~/Library/Caches/electron-builder/`
    - Windows：`$LOCALAPPDATA/electron-builder/Cache`或`C:\Users\用户名\AppData\Local\electron-builder\Cache\`
  - 4.`nsis-xxxx`、`nsis-resources-xxxx`文件拷贝到`electron-builder\Cache\nsis`目录并解压：
  - ![nsis目录](.\img\nsis目录.jpg)
  - 5.`winCodeSign-xxxx`文件拷贝到`electron-builder\Cache\winCodeSign`目录并解压
  - ![winCodeSign文件](.\img\winCodeSign文件.jpg)

### 2.使用 cnpm 淘宝镜像安装

`@electron-forge/cli`安装失败，安装 cnpm 后使用 cnpm 安装 electron 也可解决

```bash
npm install cnpm -g
```

安装依赖

```bash
cnpm install --save-dev electron
cnpm install --save-dev electron-builder
cnpm install --save-dev @electron-forge/cli
```

### 3.淘宝镜像设置

> 这个方法我试验没有效果，也是安装失败

项目根目录创建.yarnrc 或.npmrc 文件设置

```bash
# registry "https://registry.npmmirror.com/"

# electron_mirror "http://npmmirror.com/mirrors/electron/"
# electron_builder_binaries_mirror "http://npmmirror.com/mirrors/electron-binaries/"

# sass_binary_site "http://npmmirror.com/mirrors/node-sass/"
# # phantomjs_cdnurl "http://cnpmjs.org/downloads"

# # sqlite3_binary_host_mirror "https://foxgis.oss-cn-shanghai.aliyuncs.com/"
# profiler_binary_host_mirror "http://npmmirror.com/mirrors/node-sass/node-inspector/"
# chromedriver_cdnurl "https://cdn.npm.taobao.org/dist/chromedriver"



registry "https://registry.npm.taobao.org/"

electron_mirror "https://npm.taobao.org/mirrors/electron/"
electron_builder_binaries_mirror "http://npm.taobao.org/mirrors/electron-builder-binaries/"

sass_binary_site "https://npm.taobao.org/mirrors/node-sass/"
phantomjs_cdnurl "http://cnpmjs.org/downloads"

sqlite3_binary_host_mirror "https://foxgis.oss-cn-shanghai.aliyuncs.com/"
profiler_binary_host_mirror "https://npm.taobao.org/mirrors/node-inspector/"
chromedriver_cdnurl "https://cdn.npm.taobao.org/dist/chromedriver"
```

或者手动设置淘宝源

```bash
npm config set ELECTRON_MIRROR http://npmmirror.com/mirrors/electron/
```

npm 安装依赖

```bash
npm install --save-dev electron
npm install --save-dev electron-builder
npm install --save-dev @electron-forge/cli
```

删除变量

```bash
npm config delete ELECTRON_MIRROR
```

查看 npm 变量

```bash
npm config ls
```

### 4.在 windows 系统添加 electron 下载的地址的环境变量

```bash
变量名：ELECTRON_MIRROR

值：https://cdn.npm.taobao.org/dist/electron/
```
