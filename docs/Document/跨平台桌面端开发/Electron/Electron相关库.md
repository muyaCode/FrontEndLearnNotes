# Electron相关库

## package.json 中 `devDependencies` 与 `dependencies` 的区别

`dependencies`  表示我们要在生产环境下使用该依赖

`devDependencies`  则表示我们仅在开发环境使用该依赖

在打包时，一定要分清哪些包属于生产依赖，哪些属于开发依赖，尤其是在项目较大，依赖包较多的情况下。

若在生产环境下错应或者少引依赖包，即便是成功打包，但在使用应用程序期间也会报错，导致打包好的程序无法正常运行。

### `electron-forge`库

- 类似于 cli 的工具集，是一个快速构建 electron 的构建工具，里面包含打包、自动更新等，目的是简化开发到打包的一整套流程

- 内部书写`html`和`js`为原生写法，未集成第三方框架

- Electron Forge 是一个用来构建现代化 Electron 应用的完善的工具。 Electron Forge 将多个现有的（ 且有稳定维护的 ）Electron 构建工具整合为一个简单易用的工具包，所有人都可以用它来快速地搭建 Electron 开发环境。

  Forge 将一些流行框架整合为[“开箱即用”](https://www.electronforge.io/templates/typescript-template)的模板，比如：React、Vue、Angular 等。 Forge 的一些核心模块来自于上层的 Electron 社区（比如[`electron-packager`](https://links.jianshu.com/go?to=https%3A//github.com/electron/electron-packager)），因而 Electron 主要维护人员（比如说 Slack）提交的 Electron 更新也会使 Forge 的用户受益。

### `electron-builder`库

- electron-builder 就是有比 electron-packager 有更丰富的的功能，支持更多的平台，同时也支持了自动更新。除了这几点之外，由 electron-builder 打出的包更为轻量，并且可以打包出不暴露源码的 setup 安装程序。

- Electron Builder 是一个完备的 Electron 应用打包和分发解决方案，它致力于软件开发的集成体验。 [`electron-builder`](https://links.jianshu.com/go?to=https%3A//github.com/electron-userland/electron-builder) 出于简化的目的添加了一个依赖项，可以在内部管理所有更多的要求。

  `electron-builder` 会将 Electron 维护者使用的模块和功能(例如: auto-updater) 替换为自定义的. Electron Builder 打包的应用内组件的集成度会更高，同时与主流的 Electron 应用共同点也就更少了。

  将已有的 electron 应用打包成 exe 等格式可执行文件

### `electron-packager`库

- 将已有的 electron 应用打包成 msi 格式

- npm install electron-packager --save-dev

- electron-packager 的打包基本命令是：

  - electron-packager sourcedir appname platform architecture electron version optional options

- 参数说明：

  - sourcedir：项目所在路径
  - appname：应用名称
  - platform：确定了你要构建哪个平台的应用（Windows、Mac 还是 Linux）
  - architecture：决定了使用 x86 还是 x64 还是两个架构都用
  - electron version：electron 的版本
  - optional options：可选选项

  为了方便起见，在`package.json`中添加代码：

  ```json
  "scripts": {
      "package": "electron-packager ./ myapp --out ./OutApp --version 1.7.9 --overwrite --icon=./app/img/icon/icon.ico"
    }
  ```

- 然后在命令行中执行`npm run package`

- 特点：

  1、支持平台有：Windows (32/64 bit)、OS X (also known as macOS)、Linux (x86/x86_64);  
  2、进行应用更新时，使用 electron 内置的`autoUpdate`进行更新  
  3、支持 CLI 和 JS API 两种使用方式；

`electron-packager`  和  `electron-builder`的区别：

- `electron-packager`  和  `electron-builder`  都是用于 electron 应用打包的模块， 相比较`electron-builder`有更丰富的功能，支持更多的平台，打包的文件更加轻量，支持非`electron`内置的自动更新（内置的自动更新需上传到 git 等支持平台）

### `ffi-napi`：C/C++ dll 模块调用

- #### `electron-rebuild`：自动编译原生 node 模块，和 ffi-napi 库配合使用

命令：npx electron-rebuild

官网文档：<https://www.electronjs.org/zh/docs/latest/tutorial/using-native-node-modules#%E4%B8%BA-electron-%E6%89%8B%E5%8A%A8%E7%BC%96%E8%AF%91>

#### 数据库 lowdb

electron 应用数据库有非常多的选择如 lowdb 、 sqlite3 、 electron-store 、 pouchdb 、 dedb 、 rxdb 、 dexie 、 ImmortalDB 等。这些数据库都有一个特性，那就是无服务器。

electron 应用数据库技术选型考虑因素主要有以下 3 点：

> - 生态（使用者数量、维护频率、版本稳定度）
> - 能力
> - 性能
> - 其他（和使用者技术匹配度）

我们通过以下渠道进行了相关调研

> - github 的 issues、commit、fork、star
> - sourcegraph 关键字搜索结果数
> - npm 包下载量、版本发布
> - 官网和博客

给出四个最优选择，分别是 lowdb 、 sqlite3 、 nedb 、 electron-store ， 理由如下：

> - **lowdb：**  生态、能力、性能三方面表现优秀， json 形式的存储结构， 支持 lodash 、 ramda 等 api 操作，利于备份和调用
> - **sqlite3：**  生态、能力、性能三方面表现优秀， Nodejs 关系型数据库第一选择方案
> - **nedb：**  能力、性能三方面表现优秀，缺点是基本不维护了，但底子还在，尤其操作是 MongoDB 的子集，对于熟悉 MongoDB 的使用者来说是绝佳选择。
> - **electron-store：**  生态表现优秀，轻量级持久化方案，简单易用

我们使用的数据库选型是 lowdb 方案。

> PS：提一下 pouchdb ，如果需要将本地数据同步到远端数据库，可以使用 pouchdb ，其和 couchdb 可以轻松完成同步。

#### 脚本工具 zx

软件开发过程中，将一些流程和操作通过脚本来完成，可以有效地提高开发效率和幸福度。

依赖 node runtime 的优秀选择就两个：shelljs 和 zx ， 选择 zx 的理由如下：

> 1. 自带 fetch 、 chalk 等常用库，使用方便快捷
> 2. 多个子进程方便快捷、执行远端脚本、解析 md 、 xml 文件脚本、支持 ts ，功能丰富且强大
> 3. 谷歌出品，大厂背景，生态非常活跃
