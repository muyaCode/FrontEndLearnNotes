# SWC：JavaScript 编译器

## 简介

我们比较耳熟能详的就是 Babel 了。Babel 作为一个 JavaScript 编译器，它的重要性不言而喻，它的出现，让我们可以使用 ES6+ 的语法，而不用担心兼容性问题。然而随着项目规模的扩大，Babel 的性能问题也逐渐暴露出来，随后基于 Rust 的 JavaScript 编译器 `SWC` 也应运而生。

SWC是一个可扩展的基于Rust的平台，用于下一代快速开发工具。它被Next.js、Parcel和Deno等工具以及Vercel、字节跳动、腾讯、Shopify等公司使用。

SWC可以用于编译和捆绑。对于编译，它使用现代JavaScript功能获取JavaScript / TypeScript文件，并输出所有主要浏览器支持的有效代码。

## 相关网址

SWC开源地址：https://github.com/swc-project/swc

SWC官网：https://swc.rs/