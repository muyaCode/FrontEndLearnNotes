# Rspack打包工具

## 相关网址

Rspack官网：https://www.rspack.dev/zh/

Rspack开源地址：[web-infra-dev/rspack: A fast Rust-based web bundler 🦀️ (github.com)](https://github.com/web-infra-dev/rspack)

## 介绍

2023 年 3 月 10 号，字节跳动 Web Infra 团队正式宣布发布了 Rspack。

Rspack ：

- 配置几乎跟 webpack 一模一样，连插件和 loader 的 API 也基本相同，这使得现有的 webpack 项目迁移成本非常低。
- Rspack 支持 JS 编写 loader 和 plugin，没想到吧？但确实如此(感兴趣的可以看看 napi-rs)，这意味着大部分的 webpack 生态可以直接复用，这使得 Rspack 生态有非常好的开端。
- 也正是由于 Rspack 支持 JS 编写 loader 和 plugin，这使得扩展门槛非常低，你不会 Rust 也可以写 loader 和 plugin，直接用 JS 就可以开发。

到如今，Rspack 在业界已经有了相当大的影响力了，不少的国外知名项目，比如 `Discord` 等等，都已经接入 Rspack，并且获得了 5~10 倍的性能提升。前不久，《现代 JavaScript 库开发：原理、技术与实战》作者颜海镜老哥也将团队的巨型项目(50w 行代码)从 webpack 迁移到了 Rspack，获得了 10 倍以上的性能收益，不禁要为 Rspack "代颜"：

![img](./Rspack.assets/3bae9f63dfa049daa80e31a076457ea4tplv-k3u1fbpfcp-jj-mark3024000q75.webp)

Rspack 的出现，让我们能够看到了 Rust 前端构建工具这个赛道的可行性，基于 Rust 的构建工具，原来也可以低成本地落地到生产环境，也可以非常"接地气"。