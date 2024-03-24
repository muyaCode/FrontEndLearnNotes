# JavaScript 的运行环境

## 浏览器的工作原理、核心

### 浏览器工作原理图例

![浏览器工作原理](.\img\浏览器工作原理.png)

### 浏览器内核

我们经常会说：不同的浏览器有不同的内核组成

- **Gecko**：早期被 Netscape 和 Mozilla Firefox 浏览器浏览器使用；
- **Trident**：微软开发，被 IE4~IE11 浏览器使用，但是 Edge 浏览器已经转向 Blink；
- **Webkit**：苹果基于 KHTML 开发、开源的，用于 Safari，Google Chrome 之前也在使用；
- **Blink**：是 Webkit 的一个分支，Google 开发，目前应用于 Google Chrome、Edge、Opera 等;

事实上，我们经常说的浏览器内核指的是浏览器的排版引擎

- **排版引擎**(layout engine)，也称为**浏览器引擎**( browser engine )、**页面染引擎**(rendering engine)或**样版引擎**。

### 浏览器渲染过程

但是在浏览器执行过程中，HTML 解析的时候遇到了 JavaScript 标签，应该怎么办呢?
会停止解析 HTML，而去加载和执行 JavaScript 代码![浏览器渲染过程](.\img\浏览器渲染过程.jpg)

## JavaScript 引擎的解析

### JavaScript 引擎就是 执行 JavaScript 的代码

- JavaScript 是高级语言，高级的编程语言都是需要转成最终的机器指令来执行的
- 事实上我们编写的 JavaScript 无论你交给浏览器或者 Node 执行，最后都是需要被 CPU 执行的
- 但是 CPU 只认识自己的指令集，实际上是机器语言，才能被 CPU 所执行
- 所以我们需要**JavaScript 引擎**帮助我们**将 JavaScript 代码翻译成 CPU 指令来执行**

### 常见的 JavaScript 引擎

- **SpiderMonkey**：第一款 JavaScript 引擎，由 Brendan Eich 开发(也就是 JavaScript 作者);
- **Chakra**：微软开发，用于 IT 浏览器;
- **JavaScriptCore**：WebKit 中的 JavaScript 引擎，Apple 公司开发
- **V8**：Google 开发的强大 JavaScript 引擎，也帮助 Chrome 从众多浏览器中脱颖而出，Node 和 Chrome 谷歌浏览器都是使用的这个引擎;

### 浏览器内核和 JavaScript 引擎的关系

这里我们先以 WebKit 为例，WebKit 事实上由两部分组成的

- WebCore：负责 HTML 解析、布局、染等等相关的工作
- JavaScriptCore：解析、执行 JavaScript 代码;

![浏览器内核和JavaScript引擎的关系](.\img\浏览器内核和JavaScript引擎的关系.jpg)

小程序的引擎架构

![小程序的引擎架构](.\img\小程序的引擎架构.jpg)

## V8 引擎的工作原理

官方地址：<https://developers.google.com/v8/>

GitHub：<https://github.com/v8/v8>

### V8 引擎的介绍

- V8 是用 C ++编写的 Google 开源高性能 JavaScript 和 WebAssembly 引擎，它用于 Chrome 和 Nodejs 等。
- 它实现 ECMAScript 和 WebAssembly，并在 Windows 7 或更高版本，macOS 10.12+和使用 x64，IA-32，ARM 或 MIPS 处理器的 Linux 系统上运行。
- V8 可以独立运行，也可以嵌入到任何 C ++应用程序中。

#### V8 引擎解析 JavaScript 代码原理

AST 抽象语法树生成网站：[AST explorer](https://astexplorer.net/)

![V8引擎原理图](.\img\V8引擎原理图.jpg)

babel 下：

语法树运行顺序：ts --> js --> ast --> generate code --> js 代码

vue 的编译顺序：vue template --> ast --> createVNode

ES6 转 ES5 也是使用 AST 抽象语法树转换

### V8 引擎解析的架构

V8 引擎本身的源码非常复杂，大概有超过 100w 行 C++代码，通过了解它的架构，我们可以知道它是如何对 JavaScript 执行的：

**Parse**模块会将 JavaScript 代码转换成 AST(抽象语法树)，这是因为解释器并不直接认识 JavaScript 代码;

- 如果函数没有被调用，那么是不会被转换成 AST 的
- Parse 的 V8 官方文档：<https://v8.dev/blog/scanner>

**Ignition**是一个解释器，会将 AST 转换成 ByteCode(字节码)

- 同时会收集 TurboFan 优化所需要的信息(比如函数参数的类型信息，有了类型才能进行真实的运算)
- 如果函数只调用一次，Ignition 会执行解释执行 ByteCode;
- Ignition 的 V8 官方文档：<https://v8.dev/blog/ignition-interpreter>

**TurboFan**是一个编译器，可以将字节码编译为 CPU 可以直接执行的机器码;

- 如果一个函数被多次调用，那么就会被标记为**热点函数**，那么就会经过 TurboFan 转换成优化的机器码，提高代码的执行性能
- 但是，**机器码实际上也会被还原为 Bvteode**，这是因为如果后续执行函数的过程中，类型发生了变化(比如 sum 函数原来执行的是 number 类型，后来执行变成了 string 类型)，之前优化的机器码并不能正确的处理运算，就会逆向的转换成字节码；
- TurboFan 的 V8 官方文档：<https://v8.dev/blog/turbofan-iit>

### V8 引擎的官方解析图

![v8引擎的官方解析图](.\img\v8引擎的官方解析图.jpg)

### V8 引擎执行的细节

#### JavaScript 源码是如何被解析(Parse 过程)的

- 1.Blink 浏览器内核将源码交给 V8 引擎，Stream 获取到源码并且进行编码转换;
- 2.Scanner 会进行词法分析(lexicalanalysis)，词法分析会将代码转换成 tokens;
- 3.接下来 tokens 会被转换成 AST 树，经过 Parser 和 PreParser:
  - Parser 就是直接将 tokens 转成 AST 树架构;
  - PreParser 称之为**预解析**，为什么需要预解析呢?
    - 这是因为并不是所有的 JavaScript 代码，在一开始时就会被执行。那么对所有的 JavaScript 代码进行解析，必然会影响网页的运行效率;
    - 所以 V8 引擎就实现了**Lazy Parsing( 延迟解析)**的方案，它的作用是将不必要的函数进行预解析，也就是只解析暂时需要的内容，而对**函数的全量解析**是在函数被调用时才会进行；
    - 比如我们在一个函数 outer 内部定义了另外一个函数 inner，那么 inner 函数就会进行预解析
- 4.生成 AST 树后，会被 Ignition 转成字节码（bytecode），之后的过程就是代码的执行过程-->后续会详细分析

#### JavaScript 代码在 V8 引擎中的运行过程

- 1.代码被解析，v8 引擎内部会帮助我们创建一个对象：Global Object（全局对象） -> Go
  - 该对象 所有的作用域( scope )都可以访问;
  - 里面会包含`Date、Array、String、Number、setTimeout、setInterval`等等
  - 其中还有一个`window属性`指向自己
- 2.运行代码
  - 2.1. v8 为了执行代码，v8 引肇内部会有一个执行上下文栈(Execution Context Stack，ECStack)(函数调用栈)
    - 执行的是全局的代码块：
    - 1.全局的代码块为了执行会构建一个 Global Execution Context(GEC)
    - 2.GEC 会 被**放入到 ECS**中执行；
    - GEC 被放入到 ECS 中里面包含两部分内容
      - 第一部分：在代码执行前，在`parser转成AST的过程`中，会将`全局定义的变量、函数`等加入到`GlobalObject`中但是`并不会赋值`；
        √ 这个过程也称之为变量的作用域提升( hoisting )
      - 第二部分：在代码执行中，对变量赋值，或者执行其他的函数；
  - 2.2. 因为我们执行的是全局代码，为了全局代码能够正常的执行，需要创建 全局执行上下文(Global Execution Cntext)(全局代码需要被执行时才会创建)
