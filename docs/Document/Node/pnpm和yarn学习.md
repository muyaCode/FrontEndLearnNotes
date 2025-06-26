# pnpm 和 yarn 学习

[谈谈前端包管理工具 npm & yarn & pnpm_pnpm cache clean-CSDN 博客](https://blog.csdn.net/wq18512847606/article/details/123446995)

[字节的一个小问题 npm 和 yarn 不一样吗？ - 掘金 (juejin.cn)](https://juejin.cn/post/7060844948316225572)

## yarn

### 简介

- yarn 是 Facebook 于 2016 年 发布的替代 npm 的包管理工具，还可以作为项目管理工具，定位是快速、可靠、安全的依赖管理工具。
- yarn 生成 yarn.lock 文件用于确定 repos 的精确版本，并且比 npm 性能更好

### 相关地址

- 官网：https://yarnpkg.com/
- 开源地址：https://github.com/yarnpkg/yarn
- 常用命令：yarn add/install/remove
- 下载地址：https://github.com/yarnpkg/yarn/releases
- 组织：https://github.com/yarnpkg
- 中文文档地址：

  - [Home | Yarn - JavaScript 软件包管理器 | Yarn 中文文档 - Yarn 中文网 (yarnpkg.cn)](https://www.yarnpkg.cn/)
  - [Yarn 中文文档 (bootcss.com)](https://yarn.bootcss.com/)

- 使用教程：[一文全面了解 pnpm、yarn、cnpm、npx、npm 的使用(强烈建议收藏)-腾讯云开发者社区-腾讯云 (tencent.com)](https://cloud.tencent.com/developer/article/2320612)

### 1.全局安装 yarn

```bash
npm install yarn -g
```

### 2.在项目的根目录设置需要的 yarn 版本

版本设置

```bash
yarn set version latest # 最新版

yarn set version canary # 最新的经典版

yarn set version classic # 最新的经典版

yarn set version 3.x
```

设置命令

```bash
yarn set version [version]
```

### 3.使用 Yarn，在每个项目我们可以使用不同的版本

## pnpm

### 简介

- pnpm 是 2017 年发布的一款替代 npm 包管理工具，具有速度快、节省磁盘空间的特点
- pnpm 具有 yarn 相对于 npm 的所有附加功能，并解决了 yarn 没有解决的磁盘空间问题

### 相关网址

- 官网：https://pnpm.js.org/
- 开源地址：https://github.com/pnpm/pnpm
- 中文文档地址：

  - https://pnpm.io/zh/
  - https://www.pnpm.cn/

- 使用教程：[pnpm、yarn 的基本安装和使用；查看与修改镜像源\_yarn 镜像-CSDN 博客](https://blog.csdn.net/AdminGuan/article/details/127620994)

### 1.pnpm 全局安装

```bash
npm install pnpm -g
```

安装在指定目录

```bash
npm install -g pnpm --prefix "C:\Program Files\nodejs"
```

### 更改缓存目录

#### 某个项目中命令设置当前项目依赖的缓存目录：

```bash
pnpm install --store-dir "D:\node\.pnpm-store"
```

#### 全局设置下载过的依赖缓存目录：

如果想让所有项目都使用同一个 pnpm 缓存目录，可以配置 pnpm 的全局配置文件。

可以通过创建一个 `.pnpmrc` 文件并在其中指定缓存目录来实现这一点。在这个文件中，可以设置 pnpm 的全局选项，包括存储目录。

以下是如何配置 `.pnpmrc` 文件来指定全局缓存目录的步骤：

1. **打开文本编辑器**：打开一个文本编辑器，如记事本。

2. **创建 `.pnpmrc` 文件**：在文本编辑器中创建一个新的文件，并将其命名为 `.pnpmrc`。请确保文件名以点开头，这样它就会被视为隐藏文件。

3. **指定存储目录**：在 `.pnpmrc` 文件中添加以下内容：

   ```bash
   store-dir = "D:\\node\\.pnpm-store"
   ```

   这将会告诉 pnpm 使用 `D:\node\.pnpm-store` 目录作为全局缓存目录。

4. **保存文件**：保存 `.pnpmrc` 文件，并将其放置在你希望 pnpm 从中读取配置的位置。通常，你可以将它放置在用户的主目录下（如 `C:\Users\userHu`）或者系统的根目录下。

一旦配置了全局 `.pnpmrc` 文件，pnpm 将会在安装依赖时使用指定的缓存目录，而不是默认的全局缓存目录。请确保在执行 pnpm 命令时，你处于包含 `.pnpmrc` 文件的目录中，或者 pnpm 将会在其父目录中查找该文件。

### 2.pnpm [其他](https://www.pnpm.cn/motivation)和 npm 使用方法一致

## npm 、yarn 和 pnpm 常用命令

```bash
npm init| yarn init| pnpm init # 初始化命令
npm run| yarn run/yarn | pnpm # 运行脚本
npm publish| yarn publish: 发布包
npm cache clean| yarn cache clean # 清除缓存
npm install| yarn | pnpm install/i # 安装所有依赖
npm install [package]| yarn add [package]| pnpm add [package] # 安装某个依赖项
npm install --save-dev/-D [package]| yarn add --dev/-D [package]| | pnpm add --dev/-D [package] # 安装开发依赖
npm uninstall [package]| yarn remove [package]| pnpm remove/rm [package] # 卸载依赖
npm update| yarn upgrade| pnpm update/up # 更新全部依赖
npm update [package]| yarn upgrade [package]| pnpm update/up [package]| # 更新某个依赖

```

### 清理缓存

```bash
yarn cache clean
npm cache clean -f
pnpm store prune
```

yarn 可以交互式地升级依赖包的命令

```bash
yarn upgrade-interactive --latest
```

npm 升级依赖包：会根据 package.json 中指定的范围更新依赖包的最新版本，并同步更新 package-lock.json 文件中对应的包的版本。如果不带参数，将更新所有依赖包。如果带上 --latest 参数，将更新所有依赖包到最新的稳定版本，可能会跨越主要版本号

```bash
npm update [packageName]
```

npm 全局的升级依赖包：一个全局安装的依赖包，它可以检查和更新 package.json 文件中可更新的依赖包，但不会更新 package-lock.json 文件中对应的包的版本。您需要使用 ncu -u [packageName] 命令来更新指定的包，或者不带参数来更新所有的包。然后，您需要重新安装依赖包，可以使用 rm -rf package-lock.json && npm i 命令

```bash
npm-check-updates
```

也是一个全局安装的依赖包，它可以查看可更新的包信息，并让您选择并更新相应的依赖包。您可以使用 npm-check -u 命令来交互式地更新依赖包。和 npm-check-updates 一样，您也需要重新安装依赖包

```bash
npm-check
```

pnpm 升级依赖包：会根据指定的范围更新依赖包的最新版本。在不带参数的情况下使用时，将更新所有依赖包。如果带上 --latest 参数，将更新所有依赖包到最新的稳定版本，可能会跨越主要版本号

```bash
pnpm update [packageName]
```

pnpm 全局升级依赖包是一个全局安装的依赖包，它可以检查和更新 package.json 文件中可更新的依赖包，但不会更新 pnpm-lock.yaml 文件中对应的包的版本。更新指定的包，或者不带参数来更新所有的包。

```bash
pcu -u [packageName]
```

然后，需要重新安装依赖包，可以使用 `rm -rf pnpm-lock.yaml && pnpm i`命令

```bash
pnpm-check-updates
```

配置全局安装路径：

```bash
pnpm config set store-dir D:\node\pnpm\global
```

配置全局缓存路径：

```bash
pnpm config set cache-dir D:\node\pnpm\cache
```

设置成淘宝镜像

```bash
npm config set registry https://registry.npm.taobao.org
```

恢复成原始镜像

```bash
npm config set registry https://registry.npmjs.org
```

查看当前 npm 镜像源

```bash
npm config get registry
```

卸载 pnpm

```bash
npm rm -g pnpm
```

参考：https://juejin.cn/post/7158295493812944904

pnpm 安装指定版本依赖：

```bash
pnpm add @tauri-apps/cli 1.5.8
```

pnpm 设置目录：

1.获取 pnpm 的缓存目录：存放临时文件

```bash
pnpm config get cache-dir
```

2.获取 pnpm 的存储目录：是用于存放所有下载的包的内容可寻址存储

```bash
pnpm config get store-dir
```

3.获取 pnpm 全局二进制目录：用于存放全局安装的包的可执行文件的

```bash
pnpm config get global-bin-dir
```

4.获取 pnpm 的全局目录：用于存放全局安装的包的依赖和元数据的

```bash
pnpm config get global-dir
```

设置目录

```bash
pnpm config set global-dir "D:\node\.pnpm-store\global"
pnpm config set global-bin-dir "D:\node\.pnpm-store"
pnpm config set cache-dir "D:\node\.pnpm-store\cache"
pnpm config set state-dir "D:\node\.pnpm-store\state"

pnpm config get cache-dir
pnpm config get store-dir
pnpm config get global-bin-dir
pnpm config get global-dir


查看源：pnpm config get registry
切换源：pnpm config set registry [淘宝源或其他源地址]
删除npm或yarn生成的node_modules：rm -rf node_modules
```

pnpm 设置下载镜像：

```bash
镜像站：https://npmmirror.com/
```

查看源

```bash
pnpm get registry
```

临时修改

```bash
pnpm --registry https://registry.npmmirror.com install axios
```

持久使用

```bash
pnpm config set registry https://registry.npmmirror.com
```

还原

```bash
pnpm config set registry https://registry.npmjs.org
```

## 镜像源相关

### cnpm 淘宝源

安装命令

```bash
npm install -g cnpm --registry=https://registry.npm.taobao.org
```

官网：https://npm.taobao.org/

### tyarn
