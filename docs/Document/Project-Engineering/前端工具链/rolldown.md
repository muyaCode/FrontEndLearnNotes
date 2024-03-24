# rolldown

## 简介

Rolldown 是一个用 Rust 编写的 JavaScript 捆绑器，旨在作为 Vite 中使用的未来捆绑器。它提供与 Rollup 兼容的 API 和插件接口，但在范围上与 esbuild 更相似。

> Rolldown 项目最初由 [Yian Long](https://lgithub.com/Brooooooklyn)（又名Brooooooklyn，NAPI-RS的作者）创建，现在由 [Vite](https://cn.vitejs.dev) 和 [Vue](https://vuejs.org/) 的作者[尤雨溪](https://github.com/yyx990803)（Evan You）领导。

Rolldown 是基于字节跳动的 [**Oxc**](https://oxc-project.github.io) 工具集合构建的，它提供与 Rollup 兼容的应用程序接口和插件接口，但在范围内更类似于 esbuild，其内部架构也更接近于 esbuild 而不是 Rollup，代码块拆分逻辑最终可能会与 Rollup 的不同。

Rolldown 将作为 **Vite** 未来使用的打包工具，号称能够提供原生级性能，并能够避免解析/序列化开销的内置转换。Rolldown 将会与 Rspack 团队展开合作，在一些共享的底层工具和功能上，还会研究如何使用模块联邦在 Rspack 和 Vite 之间工作等。

**Rolldown 与 Vite 的整合需要分阶段进行：**

第一阶段专注于打包，目标是能够替代ES构建进行依赖预打包。

第二阶段是 Rollup 功能的对等性，最重要的是与 Rollup 插件生态系统的兼容性，还需要实现 Tree-shaking 和高级块分割控制，这一阶段的目标是在 Vite 的生产构建中能够使用 Rolldown 代替 Rollup。

第三阶段是针对一些内置的转换，例如，TypeScript、JSX、代码压缩和基于目标浏览器的语法降级等，其中 TypeScript 只会进行转译，它不会处理类型检查，仍需使用 TSC 进行类型检查。

第四阶段则是 Rustify Vite。从长远来看，如何更多的受益于本地级别的速度，实现这一目标的一种可能方式是通过 Rust API 让 Rolldown 公开插件容器。Vite 还将以 Rolldown 作为依赖项引入自己的 Rust 核心，这样才能实现 Rustify。

Vite 最终将会用 Rolldown 替换掉 esbuild 和 Rollup，其实并不是要替代它们而成为更好的替代品，主要目的是更好的满足我们在 Vite 中面临的独特的需求，最终使所有构建在 Vite 之上的用户受益。

**值得注意的是，Rolldown 目前正在积极开发中，处于早期阶段，还不能用于生产。**

### 为什么要开发 Rolldown？

由于 Vite 在开发环境是依赖于 esbuild 的，虽然 esbuild 速度极快且功能丰富，但其输出，在构建资源优化方面有非常有限的控制能力，没有太多方法来控制代码如何拆分。与 Rollup 相比，它的插件 API 也不够灵活，特别是在将多个插件链接在一起来处理相同的文件类型时，因此并不适合作为生产环境打包器。

而 Vite 在生产环境是依赖于 Rollup 的，采用了 Rollup 灵活的插件 API 和基础建设，这对 Vite 在生态中的成功起到了重要作用，虽然 Rollup 已经开始着手改进性能，[在 v4 中将其解析器切换到 SWC](https://github.com/rollup/rollup/pull/5073)，但是在生产环境下还是存在一定的构建性能问题，与原生的打包工具相比仍然较慢。

这两者在输出之间的细微差异可能会导致开发和生产构建之间的行为差异，例如，对 CommonJS 的处理和对模块转换的方式有时可能会有轻微的不一致性，这对于最终用户来说很难调试。而且用户源在整个生产构建过程中由不同的工具反复解析、转换和序列化，这导致了很多可以避免的开销。

正是因为 Vite 目前存在的问题，才导致 Vue 团队试图能够开发一款能够取代 Rollup 和 esbuild 的打包工具，**既能够有原生的速度，又具有 Rollup 的灵活性和成熟性。**

# 总结

基于 Rust 的打包工具 [Rspack](https://www.rspack.dev)，基于 Rust 的 TypeScript/JavaScript 编译器 [SWC](https://swc.rs)，基于 Rust 的 JavaScript 语言的高性能工具集合 [Oxc](https://oxc-project.github.io) 等基于 Rust 开发的前端技术，它们在 Rust 领域探索前端工程化中都取得显著成就。这意味着以 Rust 为前端基建被证实，意味着传统的打包工具本身所带来的问题已经成为过去式， 前端工程化在性能方面将迎来出色的表现。我相信 RollDown 借助开源社区的力量，将会有着丰富的生态系统，丰富的应用场景和丰富的用户基数。

[ViteConf 2023 Replay](https://viteconf.org/23/replay?utm=vite-homepage) 会议

## 相关网址

开源地址：[rolldown/rolldown：用于 JavaScript 的快速 Rust 捆绑器，具有与 Rollup 兼容的 API](https://github.com/rolldown/rolldown)

官网：https://rolldown.rs/