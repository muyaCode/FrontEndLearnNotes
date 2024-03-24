# Electron打包工具的选择

## 两种主流打包工具 @electron-forge 和 electron-builder 的不同

electron-forge和electron-builder都是用于构建和打包Electron应用程序的工具，但它们的主要区别在于：

electron-forge是一个全面的开发框架，它提供了一整套开发工具和插件，用于加快Electron应用程序的开发过程。它有一个强大的CLI命令行接口，可以自动化很多开发任务，如创建项目模板、支持本地开发服务器、支持开发热更新、支持自动安装依赖、打包成不同的平台的可执行文件等。

- electron-packager不包含在electron-forge中，但是electron-forge是构建在electron-packager之上的。具体来说，当你使用electron-forge打包你的Electron应用程序时，它会使用electron-packager来创建可执行文件。这意味着您无需单独安装electron-packager，因为它已经被electron-forge包含在内了。

electron-builder则是一个纯粹的构建和打包工具。它主要用于将已经开发完毕的Electron应用程序打包成不同的平台的可执行文件。它支持多种构建方式，例如打包成可执行文件、打包成安装程序、打包成独立的应用程序、打包成蓝色灯、snap、flatpak等。

因此，如果你正在开发Electron应用程序，并需要加速开发过程，electron-forge是一个不错的选择；如果您的应用程序已经开发完毕，并需要将其打包为可执行文件或安装程序，electron-builder则是一个更好的选择。

## 两种工具的场景对比

|              |               electron-builder               |                electron-forge                |
| ------------ | :------------------------------------------: | :------------------------------------------: |
| 签名         |                     ✔✔✔                      |                     ✔✔✔                      |
| 安装包类型   |                     ✔✔✔                      |                     ✔✔✔                      |
| 原生模块编译 |                     ✔✔✔                      |                     ✔✔✔                      |
| 定制化       |                     ✔✔✔                      |                      ✔                       |
| 上手成本     |                      ✔✔                      |                      ✔                       |
| boilerplate  |                      ✖                       |                     ✔✔✔                      |
| 跨平台构建   |                Linux、Windows                |                      ✖                       |
| 社区活跃度   |                     ✔✔✔                      |                      ✔✔                      |
| 场景         | 打包和发布的完整解决方案，基本适用于所有场景 | 创建到发布的一体化解决方案，适合从0到1的项目 |
