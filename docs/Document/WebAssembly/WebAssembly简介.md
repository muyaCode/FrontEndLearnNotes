# WebAssembly简介

[WebAssembly_百度百科 (baidu.com)](https://baike.baidu.com/item/WebAssembly/61812997)

[WASM：起于前端，不止前端 - 掘金 (juejin.cn)](https://juejin.cn/post/7268539624554119223)

**MDN教程文档(包括C/C++和Rust语言编写WebAssembly 的教程)**：[WebAssembly | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/WebAssembly)

生来取代Docker、JS，谷歌力推，这项技术发布7年后，现状如何？：https://mp.weixin.qq.com/s/x8CbN52-TpEDi_x_t4dQ1w

## WebAssembly是什么？

[WebAssembly | MDN](https://developer.mozilla.org/zh-CN/docs/WebAssembly)（简称Wasm）是一种新型的、可以在现代Web浏览器中运行的代码。这是一种低级类汇编语言，其二进制格式紧凑，为诸如 C、C++和 Rust 等低级源语言提供一个高效的编译目标，以便它们可以在Web上运行。开发者通过自选语言编写代码，然后将其编译为WebAssembly字节码进行运行。字节码在客户端（通常是Web浏览器）上运行，在那里它被编译为可执行机器码并以接近原生的速度执行。

由于Wasm提供给浏览器的是以二进制格式编译的代码，节省了下载和解析JavaScript代码时间，使代码执行效率更高。此外，WASM提供了开发者手动管理内存的选项，以及可以直接访问内存的特性，从而提升了运行效率。WebAssembly不仅具有高效的解析和执行能力，还有着硬件和操作系统无关的低级虚拟机模型，提供了安全的运行环境。当前，WASM可以兼容主流的Web浏览器，例如Chrome、Edge、Firefox、Opera和Safari。

WASM被设计为与JavaScript协同工作，以此实现Web平台上的高性能应用。综合来看，WASM在Web平台上表现出近乎原生的开发速度，充分凸显了WebAssembly的性能与功能，以及JavaScript的表现力与灵活性，使得客户端应用可以轻松地在Web上运行。

- WebAssembly 是一种新的编码方式，可以在现代的网络浏览器中运行，提供一些新特性并主要专注于高性能
- 它是一种低级的类汇编语言，具有紧凑的二进制格式，可以接近原生的性能运行，并为诸如 C / C ++、C#、Rust 等语言提供一个编译目标，以便它们可以在 Web 上运行。

- 在浏览器或 Node.js 中可以导入 WebAssembly 模块，JS 框架能够使用 WebAssembly 来获得巨大的性能优势和新的特性的同时在功能上易于使用

- 它也被设计为可以与 JavaScript 共存，允许两者一起工作。并且Wasm是通过[WebAssembly Community Group (w3.org)](https://www.w3.org/community/webassembly/)开发的一项网络标准，并得到了来自各大主要浏览器厂商的积极参与。

### 起源：一种拓展浏览器能力的新技术

WebAssembly 是一种运行在现代网络浏览器中的新型**代码（Code）**以提供特定功能，特别是在性能方面。它一般不会被直接编写，而是为诸如 C、C++ 和 Rust 等底层语言提供一个高效的编译目标。目前，WebAssembly 已成为与HTML、CSS 以及 JavaScript 并列的web领域第四类编程语言。

## WebAssembly 的目标

1. 快、高效、便利 -- 通过利用一些通用的硬件能力，能够跨平台以近乎于原生的速度执行
2. 可读、可调试 -- WebAssembly 是一种低层次的汇编语言，但是它也有一种人类可读的文本格式，使得人们可编写代码、查看代码、可调试代码。
3. 确保安全 -- WebAssembly 明确运行在安全、沙箱的执行环境，类似其他 Web 的代码，它会强制开启同源和一些权限策略。
4. 不破坏现有的 Web -- WebAssembly 被设计与其他 Web 技术兼容运行，并且保持向后兼容性。

## 初始应用场景

WASM 的诞生，就是来源于想在浏览器原生支持非 JS 语言编写的一些工具，特别是视觉、格式转换、编解码算法等一些工具库。因此最初大家并没有跳出这个范畴，WASM 更多被运用在以下两个方面：

1. **在浏览器中原生运行已有的工具库**：视觉领域的 OpenCV，视频编解码领域的 FFmpeg，都是十分成熟的领域解决方案。WASM 之前更多依赖引入服务端或 JS 版的实现，现在可以原生支持；
2. **替换浏览器应用中计算密集型的模块**：如 Web 3D 中复杂的数学运算、可视化中的布局算法执行、文件对比、加密解密等。

整体来看，WASM 的诞生拓展了浏览器本身的能力，特别是一定程度上补足了浏览器端 JS 执行效率的短板。不过最初的应用场景也仅围绕浏览器提升运行速度展开，开发者仍有替代的解决方案，同时还要考虑引入 WASM 之后带来的 JS 与 WASM 的交互开销。

## WebAssembly 如何与 Web 兼容的？

Web 平台可以看做有两个部分：

1. 一个虚拟机（VM）用于运行 Web 应用代码，例如 JS 引擎运行 JS 代码
2. 一系列 Web API，Web 应用可以调用这些 API 来控制 Web 浏览器/设备 的功能，来做某些事情（DOM、CSSOM、WebGL、IndexedDB、Web Audio API 等）

长期以来，VM 只能加载 JS 运行，JS 可能足够满足我们的需求，但如今我们却遇到了各种性能问题，如 3D 游戏、VR/AR、计算机视觉、图片/视频编辑、以及其他需要原生性能的领域。

同时，下载、解析和编译大体积的 JS 应用是很困难的，在一些资源更加受限的平台上，如移动设备等，则会更加放到这种性能瓶颈。

WebAssembly 是一种与 JavaScript 不同的语言，它不是为了替代 JS 而生的，而是被设计为与 JS 互为补充并能协作，使得 Web 开发者能够重复利用两种语言的优点：

1. JS 是高层次的语言，灵活且极具表现力，动态类型、不需要编译步骤，并且有强大的生态，非常易于编写 Web 应用。
2. WebAssembly 是一种低层次、类汇编的语言，使用一种紧凑的二级制格式，能够以近乎原生的性能运行，并提供了低层次的内存模型，是 C++、Rust 等语言的编译目标，使得这类语言编写的代码能够在 Web 上运行（需要注意的是，WebAssembly 将在未来提供垃圾回收的内存模型等高层次的目标）

随着 WebAssembly 的出现，上述提到的 VM 现在可以加载两种类型的代码执行：JavaScript 和 WebAssembly。

JavaScript 和 WebAssembly 可以互操作，实际上一份 WebAssembly 代码被称为一个模块，而 WebAssembly 的模块与 ES2015 的模块在具有很多共同的特性。

## WebAssembly的关键原理概念

在了解如何编译C语言为WASM的步骤之前，你需要先了解几个关键原理。

**模块（Module）：** 表示一个已经被浏览器编译为可执行机器码的 WebAssembly 二进制代码。模块中包含一系列的函数和数据（例如，全局变量和初始化的内存）。模块是无状态的，类似 Blob，能够在 Window 和 Worker 之间通过 `postMessage` 共享，一个 Module 声明了类似 ES2015 模块类似的 import 和 export。

**内存（Memory）：** 一个可调整大小的 ArrayBuffer，其中包含由 WebAssembly 的低层次内存访问指令读取和写入的线性字节数组。WebAssembly使用一种名为线性内存的数据结构来表示内存。线性内存是一个连续的字节块，其大小总是一页（64 KiB）的倍数。WebAssembly代码可以直接读取和写入这些字节。

**表格（Table）：** 可调整大小的类似于数组的结构，包含引用（例如函数），出于安全和可移植性考虑，这些引用不能以原始字节形式存储在内存中。

**实例（Instance）：** 一个已经与运行时使用的所有状态配对的模块，包括内存（Memory）、表（Table）、以及一系列导入值的模块（Module）集。一个实例（Instance）就像一个 ES 模块，它被加载到一个特定的整体中，并带有一组特定的导入值。

一个WebAssembly模块定义了一系列的函数、全局变量、内存和表格，它们通过与特定的导入和导出的值结合，可以被实例化为一个运行的应用。而内存和表格也可以被实例化为运行的应用，它们的值随着应用的执行而改变。



WebAssembly 的 JavaScript API 提供给开发者创建 Module、Memory、Table 和 Instance 的能力，给定一个 WebAssembly 的 Instance，JS 代码可以同步的调用它的 exports -- 被作为普通的 JavaScript 函数导出。任意 JavaScript 函数可以被 WebAssembly 代码同步的调用，通过将 JavaScript 函数作为 imports 传给 WebAssembly Instance。

因为 JavaScript 能够完全控制 WebAssembly 代码的下载、编译和运行，所以 JavaScript 开发者可以认为 WebAssembly 只是 JavaScript 的一个新特性 -- 可以高效的生成高性能的函数。

在未来， WebAssembly 模块可以以 ES2015 的模块加载形式加载，如 `<script type="module">`，意味着 JS 可以获取、编译、和导入一个 WebAssembly 模块，就像导入 ES2015 模块一样简单。

