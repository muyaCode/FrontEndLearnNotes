# Node 和其他语言集成

## napi.rs

NAPI-RS 是一个使用 Rust 构建预编译 Node.js 原生扩展的框架

官网：[入门 – NAPI-RS --- Getting started – NAPI-RS](https://napi.rs/docs/introduction/getting-started)

开源地址：https://github.com/napi-rs/napi-rs

教程：

- [初识 NAPI-RS - 掘金 (juejin.cn)](https://juejin.cn/post/7226879080415395897)
- [如何基于 napi-rs 打造 Rust 前端工具链？ - 掘金 (juejin.cn)](https://juejin.cn/post/7243413934765408315)
- [NAPI-RS 是怎么工作的: 从 NAPI 到 Build Script & FFI - 掘金 (juejin.cn)](https://juejin.cn/post/7202541740934709303)

## neon

开源地址：https://github.com/neon-bindings/neon

官网：[www.neon-bindings.com/](https://www.neon-bindings.com/)

它包含一组工具和胶水代码，能够帮助 `Node.js` 开发者提高开发效率，允许他们在 `Rust` 中编写原生的 `Node.js` 模块，并在`JavaScript` 代码中无缝集成。使用 `neon` 可以像在 `C/ C++` 中一样创建一个原生 `Node` 模块，并且使用起来很简单，不会让用户在不安全的代码中 **(Rust 特性之一就是编写安全代码)** 感到害怕或头疼。使用 `Rust` 编写原生模块具有如下的好处：

- 提供原生的性能
- 可以编写多线程的并发程序
- 可以使用 `Rust` 的社区生态，各种开源包
- 可以调用本地操作系统的 `API`

### 应用场景

`Native addon(原生扩展)` 可以做到 `JavaScript` 做不到的一些事情，比如调用系统库、打开一个窗口、调用 `GPU` 等一些系统指令，另外在一些 `CPU` 密集计算的地方，比如说区块链货币计算，文件加密解密等等需要比较高的计算能力，此时我们就可以使用原生模块来进行扩展，原生模块的本质就是一个二进制文件。而前端目前都有哪些比较出名的应用场景呢？

比如：

- swc([swc-project/swc](https://github.com/swc-project/swc))：`swc` 是一个使用 `Rust` 编写的超级超级快的 `Typescript / Javascript` 编译器（类似于 `babel`），它是一个可以同时给 `Rust` 和 `Javascript` 使用的库。想要在 `Rust` 中使用，可以参考这里的 [swc - Rust](https://rustdoc.swc.rs/swc/)，想要在 `Javascript` 中使用，可以参考这里的 [Getting Started – SWC](https://swc.rs/docs/getting-started)。
- next.js(> v12.0): 最新的 `next.js` 中也使用到了 `Rust` 构建的原生模块作为编译器， `next.js` 的编译器是基于上述所说的 `swc` 来写的，根据官方的介绍，使用了最新的编译器之后本地重新编译速度**提升了 3 倍以上**，生产环境的打包速度**提升了 5 倍以上**，并且编译速度**比 Babel 快 17 倍以上**。 [Next.js 12 | Next.js (nextjs.org)](https://nextjs.org/blog/next-12#faster-builds-and-fast-refresh-with-rust-compiler)在这里。
- 另外还有一些第三方开源的使用 `Rust` 编写的 `npm` 包，比如加密算法 [node-rs/packages/bcrypt](https://github.com/napi-rs/node-rs/tree/master/packages/bcrypt) ，中文分词 [node-rs/packages/jieba](https://github.com/napi-rs/node-rs/tree/master/packages/jieba) 等，其中都涉及到复杂的计算。

教程：[Node 和 Rust 之间能碰撞出什么火花? - 掘金 (juejin.cn)](https://juejin.cn/post/7028838434957443086)

## node-gyp

`node-gyp`是一个用 Node.js 编写的跨平台命令行工具，用于为 Node.js 编译本机插件模块。

它包含之前由 Chromium 团队使用的 gyp-next 项目的供应副本，扩展以支持 Node.js 原生插件的开发。

[node-gyp 实现 nodejs 调用 C++ - 掘金 (juejin.cn)](https://juejin.cn/post/6844903971220357134)
