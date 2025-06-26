# Vue2 源码解析

Vue2 官网：<https://v2.cn.vuejs.org/v2/api/#%E5%85%A8%E5%B1%80-API>

## vue2 的源码调试解析

在 vue.config.js 里面设置

```js
// 基于vue-cli创建的vue3项目
const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  tra/nspileDependencies: true,
  configureWebpack(config) {
    console.log(config)
    config.devtool = 'cheap-module-source-map' // 这种写法方式
  }
})
// 基于vue-cli创建的vue2项目
module.exports = {
  configureWebpack: config => {
    config.when(
        process.env.NODE_ENV === 'development',
        config => config.devtool('source-map'),
        // source-map模式：是源码未编译的模式，方便debugger调试源码来查看运行情况
        // eval模式：是编译后的模式
    ),
  }
}

// 增加调试的配置后，可以在要调试的代码里 增加断点 或者 debugger
// 然后VSCode运行调试，再去浏览器Sources选项卡进行源码调试
// launch.json设置调试的目录src/*
```

## Virtual DOM 原理

DOM 全称是 Document Object Model，是一种结构化模型，对于 web 开发者来说，结构化的文本是 html 代码，结构模型就是 HTML DOM。HTML 的元素就是 DOM 结构的节点（nodes）。

以浏览器为例，html 代码只是一堆字符串，但是浏览器进行 UI 解析后，变成了内存中的一颗 DOM 树，进而展示为我们看到的页面。我们开发中所操作的 DOM，就是这颗内存中的树。记不记得 DOM 树的重绘和回流，可以理解为浏览器的类 Virtual DOM 装置所做的工作之一。

HTML DOM 的操作靠的是 JS API，如 getElementById；跟 DOM 关系最大的就是 JS 了。

不管怎样，我们如果要改变页面内容，就要操作 DOM：

```js
var item = document.getElementById("myLI");
item.parentNode.removeChild(item);
```

像上面这样，就可以改变页面展示了。时至今日，浏览器计算能力越来越强，我们的页面元素也越来越丰富，DOM 操作无可避免也越来越多，尤其是出现了以交互体验至上的 SPA（单页面应用）后，使得 DOM 操作更是成倍增长，趋势如此，所以开发起来会很困难。想象一下，一个由上万 div 组成的 DOM，要给它们绑定事件，有代理的，有自己的，更新内容后还得加上新的，如果都用 DOM 操作，开发维护起来将会是无穷地狱。

两个突出的问题：

● 难以控制。如果要调整一个事件响应方法，要深入到代码中，找到关联的函数，分析依赖的部分，小心的调整，耗时且出 bug 可能性非常的高；
● 效率低下。写的时候效率低，改的时候效率低，其他人接手时，依然效率很低。

irtual DOM 的引入给我们带来了处理复杂渲染的机制：

● 我们无需关注 DOM 区别，只需要 focus 在数据的更改上；
● 我们无需直接操作 DOM，使得代码层面界面更新变得更简单；也可以说是 React 与 Virtual DOM 双赢的结果；
● 极大提高了界面开发的效率。
如果要细说 React DOM Tree 和 diff 方法，那就会相对复杂一些，对了，再说几点跟 Virtual DOM 相关的调优原则：
● 组件实现 shouldComponentUpdate 方法，主动把控什么时候值得更新；
● 避免跨级别调整 DOM 节点，保持稳定的 DOM 结构会有助于性能的提升；
● 同级几点之间减少数量过大或者过于频繁的位置切换操作。

### Virtual DOM 算法

DOM 的操作与计算，本身是很慢的，任何一个 DOM 的标准属性都有一大堆，这也是 HTML 标准中规定的，再加上读取更新 DOM 的耗时，如果要做完整的对比和操作，那将是一个灾难的开始。然而数据层面的比较要简单得多，而且基于一些约定，我们可以做到只比对少数关键数据属性即可；再加上不考虑跨层的比对，时间复杂度会到零。

下图是深度优先遍历的过程，在此过程中，我们的程序需要记录的是节点的变化。

![深度优先遍历的过程](.\img\深度优先遍历的过程.jpg)

节点变化一般分为三种情况：
● 节点被删除；
● 节点修改了（如：节点的宽度属性变化，位置变化等）；
● 节点新增了子节点。

记录变化之后，还存在一些问题，比如，如果节点只是顺序变化，记录后挨个挪动效率比较低，简单处理可能认为这些节点的父节点需要完全重新渲染。所以框架里很多会对此类变化做优化，如图：

![变化做优化](.\img\变化做优化.jpg)

不做优化的处理方式，对比 A 和 B 发现不一致，那么需要更新第一个子节点为 B，删除原节点 A，以此类推，需要把所有子节点删除，重新渲染更新；这样在大批量的计算中，浪费也是显而易见的，改造方式介绍如下：

● 给同级的子元素打上唯一标识 id，根据 id 来判断老集合与新集合之间节点的差异；
● 老集合中取一个节点，如 A；判断新集合中是否存在；如存在，再判断位置是否需要变化；再做相应的调整；
● 老集合中循环完毕，位置调整完毕，多余节点删除后，再循环新集合，把需要增加的节点添加进来。

以上，大致介绍了 Virtual DOM 带来的变化，如何优化自己的 DOM 操作，及 Virtual DOM 算法的基本思想等；大家如果有兴趣可以深入研究一下树的对比技巧和算法。在这方面每个人都可以有不一样的看法和优化手段。掌握原理能让我们的代码更高效，也更容易从问题的表面看到本质，当然能力也就随之提高，这也是我们认可的工程师成长的重要方式。

### Vue 精髓之响应式数据流

#### 数据流演进史

前端数据流的概念可以从 2010 年诞生的 backbone 典型的 MVC 框架说起，随着前端的业务越来越复杂，前端的技术也在不断的演进中。在 backbone 提出的前端 mvc 概念后，又诞生了 knockout，angular 这类 MVVM 模式的框架，再之后就是目前流行的基于 Virtual DOM 的 Flux。每个框架管理数据流的方式都不尽相同，接下来我们引用 Vue 作者尤雨溪的一句话，来开启今天 Vue 的响应式数据流探索之旅。

Vue 2.0 的实现有与众不同的地方。和 Vue 的响应式系统结合在一起之后，它可以让你不必做任何事就获得完全优化的重渲染。由于每个组件都会在渲染时追踪其响应依赖，所以系统精确地知道应该何时重渲染，应该重渲染哪些组件。不需要 shouldComponentUpdate，也不需要 immutable 数据-it just works。

#### Vue 的响应式数据流的优势

Vue 和 React 都是前端的组件化框架，功能上大同小异，本质上就是借助 Virtual DOM 帮助开发者管理混乱的 DOM，并提供给开发者像操作状态机一样操作页面的能力。

但是，Vue 的 Virtual DOM 不是简单的 Virtual DOM，它结合了响应式数据流的能力。

除了性能，最大的优势是减轻了开发者的负担，开发者大多数情况下不需要依赖 shouldComponentUpdate，也不需要依赖 immutable 数据去判断组件是否需要重新渲染，Vue 会帮你做好这件事。

## Object.defineProperty 与订阅发布设计模式

### Object.defineProperty

JavaScript 提供一个非常强大的方法 Object.defineProperty，它可以定义当某一个值访问和赋值时会先执行自定义的钩子方法。

一个简单的 Object.defineProperty 例子如下：

```js
var obj = {};
var initvalue = "hello";
Object.defineProperty (obj, "newKey", {
    get:funetion (){
      // 当获取值的时候触发的函数
      return initvalue;
    },
    set:funetion (value){
      // 当设置值的时候触发的函数，设置的新值通过参数value 拿到
      console.log(value);
      initvalue = value;
    }
});
// 获取值
conso1e.log(obj.newKey);
// 设置值
obj.newKey = "chang value";
```

这个方法给予 JavaScript 开发一种面向切面编程的能力，使用该方法我们能够隐式、自然的控制属性的访问和赋值。

### 订阅发布设计模式

订阅发布是一个非常常见的设计模式，原理也非常简单，就是订阅者订阅信息，然后发布者发布信息通知订阅者更新。

![发布订阅模式](.\img\发布订阅模式.jpg)
