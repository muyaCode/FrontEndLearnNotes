# Tauri框架入门

官网：<https://tauri.app/zh-cn/>

GitHub开源地址：<https://github.com/tauri-apps/tauri>

## Tauri+系列教程

**Tauri+系列教程**：[lencx/tauri-tutorial · Discussions · GitHub](https://github.com/lencx/tauri-tutorial/discussions?discussions_q=label%3A"Tauri+系列")

---

一文读懂 Tauri：<https://github.com/lencx/tauri-tutorial/discussions/23>

## Tauri 概览

- 利用操作系统提供的 WebView 来呈现界面，来避免打包体积过大。一般套壳空应用打包后的体积控制在 3M 左右。而 [Electron](https://www.electronjs.org/) 会将整个 [Chromium](https://www.chromium.org/) 打包进应用（安装包体积几十兆起步）。因为系统差异，所以使用自带 Webview 会存在兼容性问题，但是应该朝前看，IE 浏览器都被微软自家宣布死亡了。

- 相比 Electron 有更低的内存占用，更小的体积，更少的线程，系统调用等。了解更多 [Tauri 基准测试](https://tauri.app/v1/references/benchmarks)。

- 安装包是跨平台的，目前支持 Mac，Windows，Linux 等，未来也会支持 iOS/iPadOS 和 Android 等，跨平台打包可以使用官方提供的 [Tauri GitHub Action](https://github.com/tauri-apps/tauri-action)，虽然是跨端，但是一些特定于平台的代码还是需要借助于插件或者自行实现，并在真机上进行功能验证，否则可能出现行为和预期不一致。

- 提供内置签名以确保应用自动更新时可以安全安装，相关配置请查看 [Tauri Updater](https://tauri.app/v1/guides/distribution/updater)。

- 使用 [tauri icons](https://tauri.app/v1/guides/features/icons) 命令生成自定义应用图标（要求：格式为 PNG 的正方形图片）。

- 应用更安全，Tauri 在架构层做了很多安全处理（比如：通过配置来约束 Tauri 访问系统文件，网络请求，剪贴板等）。

  - 源代码更安全，Tauri 只提供二进制文件。而不是像 Electron 的 [ASAR](https://www.electronjs.org/docs/latest/tutorial/asar-archives) 文件。
  - 数据更安全，隔离模式会对前后端（Webview 和 Tauri Core）通信数据进行加密传输。

- 前端使用 HTML、CSS、JavaScript 来构建界面（也可以使用前端主流技术，如：[vite](https://vitejs.dev/)，[react](https://reactjs.org/)，[vue](https://vuejs.org/)，[svelte](https://svelte.dev/) 等）。后端目前使用 Rust，未来也可能会支持其他类型语言（如：Go、Nim、Python、Csharp 等）。

- 强大的系统交互能力，支持配置全局快捷键，系统菜单，系统托盘，文件读写，命令行，系统信息，剪贴板等。Rust 给 Tauri 带来了无限的想象力，Rust 可以做的事情，Tauri 理论上也可以做（欢迎自行尝试，可能也有做不了的）。

- Tauri Window

  支持多种配置。磨砂透明背景，无边框功能则需要借助的两个插件（支持 Windows 和 macOS，Linux 暂不支持）：

  - [window-shadows](https://github.com/tauri-apps/window-shadows) - 为窗口添加阴影。
  - [window-vibrancy](https://github.com/tauri-apps/window-vibrancy) - 为窗口配置磨砂效果。

- 支持创建多个窗口以及为新窗口脚本注入，但是脚本注入需要在 rust 端创建窗口，使用 `WindowBuilder::new` 中的 `initialization_script` 来加载脚本。

- 通过提供的 [Tauri Command](https://tauri.app/v1/guides/features/command)，可以从 Web 应用程序调用 Rust 函数。通过 [Tauri Events](https://tauri.app/v1/guides/features/events)（`emit` 和 `listen`）可以在前后端之间传递消息，它与 Tauri Command 有类似性。

- ...

综合来看，[Tauri JS API](https://tauri.app/v1/api/js/) 确实提供了很多便捷 API 供前端使用，但是有些底层方法并未暴露，而 [Tauri Rust API](https://docs.rs/tauri/1.2.0/tauri/) 则要强大很多。

## 开发问题

### 资源 & 文档

- [Tauri doc](https://tauri.app/) - 官方文档，第一参考资料，建议熟读，源码及 issues 可以作为补充。
- [Awesome Tauri](https://github.com/tauri-apps/awesome-tauri) - 精选的 Tauri 生态系统和社区中最好的东西，包含插件和应用，可以借鉴和学习。
- [Tauri issues](https://github.com/tauri-apps/tauri/issues) - 质量很高的问题回答，可以解决开发中遇到的大量困惑或报错。如果未搜到，还可以自己上报，执行 `cargo tauri info` 或 `npm run tauri info` 可以查看平台和版本信息。
- [Tauri discussions](https://github.com/tauri-apps/tauri/discussions) - 讨论社区
- [MDN doc](https://developer.mozilla.org/en-US/) - 很权威的 Web 技术文档，包含 CSS，HTML，JavaScript。
- [Rust doc](https://doc.rust-lang.org/book/) - Rust 编程语言基本语法学习
- [npmjs](https://www.npmjs.com/) - 前端生态的包管理网站
- [crates.io](https://crates.io/) - Rust 生态的包管理网站

### 开发准备

编辑器推荐使用 [Visual Studio Code](https://code.visualstudio.com/)，需要安装的插件：

- [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) - 对 Tauri 命令和 tauri.conf.json JSON 验证提供支持。
- [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer) - 插件提供了对 Rust 编程语言的支持。包含代码提示，类型定义，代码跳转等等。
- [crates](https://marketplace.visualstudio.com/items?itemName=serayuzgur.crates) - 是 `crates.io` 依赖项的插件。旨在帮助开发人员在使用 Cargo.toml 时管理依赖项（鼠标悬停 crate 名称可以显示可用版本列表）。

## 常见问题

### 子窗口不能使用 `__TAURI__` API

新创建的远程 URL 子窗口无法使用 Tauri API，因为这与 Tauri 架构安全是违背的，以下有两条相关 issues：

- [[bug\] cant use window.**TAURI** with remote url](https://github.com/tauri-apps/tauri/issues/4837)
- [[feat\] Inject window.**TAURI** in allowed remote URLs](https://github.com/tauri-apps/tauri/issues/5088)

简单概括为：任何与 IPC 相关的问题都触及到了 Tauri 核心，并不能快速解决此类问题，但在 v2，v3 或未来更高的版本会有所改进。Tauri 不会在外部 URL 开的窗口上注入 Tauri API，如果项目没有本地资源，可以通过将 `distDir` 设置为`远程 URL` 来解决这个问题，或者在使用的运行时更改它。但这种情况下只有一个外部 URL 能够访问 Tauri API，其实就是修改 tauri.conf.json 中配置的 `build.devPath`（开发环境） 和 `build.distDir` （生产环境）字段。

### Brownfield vs Isolation 模式

[Brownfield 模式](https://tauri.app/v1/references/architecture/inter-process-communication/brownfield)是使用 Tauri 的最简单、最直接的模式，因为它尽可能地与现有的前端项目兼容。但也并非完全兼容（API 未被浏览器广泛支持，Tauri 正在实现中的），请参阅 [不兼容部分](https://tauri.app/v1/references/architecture/inter-process-communication/brownfield#incompatibilities)。

[Isolation 模式](https://tauri.app/v1/references/architecture/inter-process-communication/isolation)下前端发送到 Tauri Core 之前会被注入的一个安全的应用程序拦截和修改传入的 IPC 消息（使用 [iframe](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe) 沙盒隔离，使用浏览器的 [SubtleCrypto](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto) 来对数据进行加密。为了确保安全，每次运行应用时都会生成新的密钥），来避免被前端恶意调用。

总结：所以老项目想使用 Tauri 进行套壳，想快速上线，可以考虑 Brownfield 模式。使用 Isolation 模式则更加安全，通信时消息加解密相比于 Brownfield 模式会存在额外的开销成本，除非高性能要求，否则 `AES-GCM` 身份验证算法的成本几乎可以忽略不计。

## 评价 Tauri

> 在技术群，文章评论区也有一些朋友问过我：”如何看待 Tauri？“，我也只是业余折腾，写过几篇浅显的文章而已。

以我目前的了解来看，觉得它很可能成为下一代跨端（桌面，移动端）方案，但前提是它真的实现了比较易用的移动端绑定（目前还在计划中）。Web 的生态奠定了今天的互联网基础，前端技术又是层出不穷，快速迭代。而 Tauri 想做的事情就是实现 Webview 和系统之间的桥接层（站在巨人的肩膀）。所以跨多少个端，提供什么样的能力是 Tauri 需要考虑的事情，开发应用功能是我们需要考虑的事情。Tauri 未提供的支持，我们也可以通过它的插件机制去扩展。

————————————————————————————————————————————

- 参考教程：<https://www.hellagur.com/2022/09/06/%E5%88%9D%E8%AF%86-Tauri-%E7%AF%87%E4%B8%80%E4%B9%8B%E5%88%9D%E7%AA%A5%E9%97%A8%E5%BE%84/>
- [基于tauri+vue3.x多开窗口|Tauri创建多窗体实践 - xiaoyan2017 - 博客园 (cnblogs.com)](https://www.cnblogs.com/xiaoyan2017/p/16812092.html)
- [vue3.js+tauri整合聊天|tauri仿微信|vite3+tauri聊天室 - 掘金 (juejin.cn)](https://juejin.cn/post/7159783024995860494)
- tauri打包桌面应用步骤及配置详解--windows完美打包&mac完美打包：<https://www.cnblogs.com/JokerA/p/15638087.html>

## 介绍

和Electron相比

- 打包更小
- 启动更快
- 性能更好
- 安全性好
