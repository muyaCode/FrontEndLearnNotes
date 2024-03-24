# Electron打包遇见问题及解决

## ✨Electron-builder 库 打包问题解决

`NPM`下载的问题

因为`NPM`在国内比较慢。导致`electron-V.xxxx.zip`下载失败。这些东西如果是第一次打包的话是需要下载对应`electron`打包依赖的包版本的支持文件。

electron-build配置详情：[https://www.electron.build/configuration/configuration](https://www.electron.build/configuration/configuration)

electron打包淘宝镜像：[https://registry.npmmirror.com/binary.html?path=electron/](https://registry.npmmirror.com/binary.html?path=electron/)

electron-builder-binaries打包淘宝镜像：[https://registry.npmmirror.com/binary.html?path=electron-builder-binaries/](https://registry.npmmirror.com/binary.html?path=electron-builder-binaries/)

### 下列离线下载的安装存放路径

```shell
electron-v.xxxx.zip文件：
windows系统路径：C:\Users\用户名的文件夹\AppData\Local\electron\Cache 
或者  %LOCALAPPDATA%\electron\cache
Linux系统路径：/.cache/electron
macOS系统路径：/Library/Caches/electron

nsis-v.xxx.7z、nsis-resources-v.xxx.7z、winCodeSign-v.xxx.7z文件：
上面相同地址前缀/electron-builder
```

---

### 1.离线下载Electron-builder 打包的依赖包

#### (1.打包时下载electron-v.xxxx.zip文件失败

> electron打包淘宝镜像：[https://registry.npmmirror.com/binary.html?path=electron/](https://registry.npmmirror.com/binary.html?path=electron/)

win解决办法：直接在electron打包淘宝镜像下载对应版本和打包平台的文件

windows系统下载完解压放到：C:\Users\系统用户名\AppData\Local\electron\Cache

Electron设置淘宝源

```bash
npm config set registry https://registry.npm.taobao.org/
npm config set ELECTRON_MIRROR http://npm.taobao.org/mirrors/electron/
```

**🍊其他系统平台的存放路径看：下列离线下载的安装存放路径**：

#### (2.打包时下载 winCodeSign-v.xxx.7z文件 、nsis-resources-v.xxx.7z文件、nsis-v.xxx.7z文件  失败

> electron-builder-binaries 包 github下载：[https://github.com/electron-userland/electron-builder-binaries/releases](https://github.com/electron-userland/electron-builder-binaries/releases)
>
> electron-builder-binaries的淘宝镜像：[https://registry.npmmirror.com/binary.html?path=electron/](https://registry.npmmirror.com/binary.html?path=electron/)

**winCodeSign-v.xxx.7z下载地址**：<https://github.com/electron-userland/electron-builder-binaries/releases/download/winCodeSign-2.5.0/winCodeSign-2.5.0.7z>

**nsis-resources-v.xxx.7z下载地址**：<https://github.com/electron-userland/electron-builder-binaries/releases/download/nsis-3.0.4.1/nsis-3.0.4.1.7z>

**nsis-v.xxx.7z文件下载地址**：<https://github.com/electron-userland/electron-builder-binaries/releases/download/nsis-resources-3.4.1/nsis-resources-3.4.1.7z>

windows系统下载完解压放到：

1. **winCodeSign-v.xxx.7z**：C:\Users\用户名\AppData\Local\electron-builder\Cache\winCodeSign

2. **两个nsis压缩文件**：C:\Users\用户名\AppData\Local\electron-builder\Cache\nsis

**🍊其他系统平台的存放路径看：下列离线下载的安装存放路径**：

### 2.在项目根目录中使用 .npmrc 或者 .yarnrc 镜像指定来下载相关包

```json
# registry "https://registry.npm.taobao.org/"

# electron_mirror "https://registry.npmmirror.com/binary.html?path=electron/"
# electron_builder_binaries_mirror "https://registry.npmmirror.com/binary.html?path=electron-builder-binaries/"

# sass_binary_site "https://registry.npmmirror.com/binary.html?path=node-sass/"
# # phantomjs_cdnurl "http://cnpmjs.org/downloads"

# # sqlite3_binary_host_mirror "https://foxgis.oss-cn-shanghai.aliyuncs.com/"
# profiler_binary_host_mirror "https://registry.npmmirror.com/binary.html?path=node-inspector/"
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

---

## ✨@electron-forge/cli 库 打包问题解决

---

## ✨electron打包 与vue3 + vite + TypeScript + vite-plugin-electron结合 的问题

### 1.使用路由懒加载，打包后报错：`require is not defined`

> 如果vue-router使用了路由懒加载，electron 打包后会报错（ReferenceError: require is not defined）：vite-plugin-electron 默认使用 cjs 打包，要改成es打包才不会报错

vite.config.ts的defineConfig中添加配置：

```json
build: {
  rollupOptions: {
    output: { 
      format: 'es' // 如果vue-router使用了路由懒加载，electron 打包后会报错（ReferenceError: require is not defined）：vite-plugin-electron 默认使用 cjs 打包，要改成es打包才不会报错
    }
  }
}
```

### 2.运行白屏，控制台报错资源无法加载

运行出来会发现是白屏，打开程序控制台可以看到是js文件找不到。 打开dist中index.html发现是js和css路径都是绝对路径，所以这里需要修改为相对路径。

打开 vite.config.js 配置更路径为相对路径

```js
export default defineConfig({
  plugins: [vue()],
  base: './', // 更路径为相对路径
})
```
