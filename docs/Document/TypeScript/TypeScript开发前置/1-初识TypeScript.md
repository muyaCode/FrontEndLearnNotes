# 1-初识TypeScript

菜鸟教程-TypeScript教程文档：<https://www.runoob.com/typescript/ts-tutorial.html>

---

![TS与JS.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/28ca61cc160c417c8497a00defdca5f0~tplv-k3u1fbpfcp-watermark.image)

## TypeScript 的介绍

TypeScript 是一种由微软开发的开源、跨平台的编程语言。它是 JavaScript 的超集，最终会被编译为 JavaScript 代码。

2012 年 10 月，微软发布了首个公开版本的 TypeScript，2013 年 6 月 19 日，在经历了一个预览版之后微软正式发布了正式版 TypeScript

TypeScript 的作者是安德斯·海尔斯伯格，C#的首席架构师。它是开源和跨平台的编程语言。

TypeScript 扩展了 JavaScript 的语法，所以任何现有的 JavaScript 程序可以运行在 TypeScript 环境中。

TypeScript 是为大型应用的开发而设计，并且可以编译为 JavaScript。

TypeScript 是 JavaScript 的一个超集，主要提供了类型系统和对 ES6+ 的支持，它由 Microsoft 开发，代码开源于 GitHub 上

**TypeScript 是 JavaScript 的一个超集**，主要提供了**类型系统**和**对 ES6+ 的支持**，它由 Microsoft 开发，代码 [开源于 GitHub](https://github.com/Microsoft/TypeScript) 上



- 是JavaScript的超集，主要提供了类型系统和对 ES6+ 的支持

- 以JavaScript为基础构建的语言

- 可以在任何支持JavaScript的平台中执行

- 本质上添加了可选的静态类型和基于类的面向对象编程

- TypeScript 扩展了JavaScript，并添加了类型

- 优势

  - 1.开发过程中，能发现潜在的问题

  - 2.更友好的编辑器自动提示

  - 3.类型的声明，让我们看到代码里的直观语义

- TypeScript增加了什么

  - 类型

  - 支持ES的新特性

  - 强大的开发工具

  - 添加ES不具备的新特性

  - 丰富的配置选项

## TypeScript 的特点

TypeScript 主要有 3 大特点：

- **始于 JavaScript，归于 JavaScript**

TypeScript 可以编译出纯净、 简洁的 JavaScript 代码，并且可以运行在任何浏览器上、Node.js 环境中和任何支持 ECMAScript 3（或更高版本）的 JavaScript 引擎中。

- **强大的类型系统**

**类型系统**允许 JavaScript 开发者在开发 JavaScript 应用程序时使用高效的开发工具和常用操作比如静态检查和代码重构。

- **先进的 JavaScript**

TypeScript 提供最新的和不断发展的 JavaScript 特性，包括那些来自 2015 年的 ECMAScript 和未来的提案中的特性，比如异步功能和 Decorators，以帮助建立健壮的组件。

## TypeScript 优势

- **优势1：编译时静态类型检测**：函数或方法传参或变量赋值不匹配时，会出现编译错误提示，规避了开发期间的大量低级错误，省时，省力。
- **优势2：自动提示更清晰明确。**
- 优势3：引入了泛型和一系列的 TS 特有的类型
- **优势4：强大的 d.ts 声明文件**：声明文件像一个书的目录一样，清晰直观展示了依赖库文件的接口，type类型，类，函数，变量等声明。
- **优势5：轻松编译成 JS 文件**：即使 TS 文件有错误，绝大多数情况也能编译出JS 文件
- **优势6：灵活性高**：尽管 TS 是一门 强类型检查语言，但也提供了 any 类型 和 as any 断言，这提供了 TS 的灵活度。

## 总结

TypeScript 在社区的流行度越来越高，它非常适用于一些大型项目，也非常适用于一些基础库，极大地帮助我们提升了开发效率和体验。
