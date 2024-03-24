# 基于 Rust 的 MD 编译器：Rspress

## 简介

大家平时如果要快速搭建一个文档站点、博客站点或者产品的主页，可能会选择 `Docusaurus`、`VuePress`、`VitePress` 等等，社区的这些框架确实可以很方便的帮助我们快速搭建一个文档站点，但这些框架的性能却成为了一个问题，基于 Vite 的 `VitePress` 虽然借助 Vite 在开发阶段的优势可以快速启动，但在生产环境下，不得不使用 Rollup 打包，仍然”不够快“。

而在这个领域，我们又有了一个新的选择：`Rspress`。这个框架中也有相当多的 Rust 成分，比如基于 Rspack 进行构建、基于 Rust 编写的 Markdown 编译器，并且最终的性能也是很不错的，基本能在一秒内启动项目：

## 相关网址

官网：https://rspress.dev/zh/

开源地址：https://github.com/web-infra-dev/rspress
