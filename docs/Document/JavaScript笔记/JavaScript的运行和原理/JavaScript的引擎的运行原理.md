# JavaScript 的引擎的运行原理

[JavaScript 引擎列表](https://notes.eatonphil.com/javascript-implementations.html)：这个网页做了一个 JavaScript 引擎的不完整列表

JavaScript 任务事件循环可视化工具：<https://www.jsv9000.app/>

事件循环文章：<https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/>

## 宏任务和微任务

### 宏任务

- 分类： `setTimeout()`、`setInterval()`、`requrestAnimationFrame`
- 1.宏任务所处的队列就是宏任务队列
- 2.第一个宏任务队列中只有一个任务： 执行主线程的 js 代码
- 3.宏任务队列可以有多个
- 4.当宏任务队列的中的任务全部执行完以后，会查看是否有微任务队列。如果有先执行微任务队列中的所有任务，如果没有就查看是否有宏任务队列

### 微任务

- 分类：`new Promise().then(回调)`、`process.nextTick`
- 1.微任务所处的队列就是微任务队列
- 2.只有一个微任务队列
- 3.在上一个宏任务队列执行完毕后如果有微任务队列就会执行微任务队列中的所有任务

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>Title</title>
	</head>
	<body>
		<script type="text/javascript" src="main.js"></script>
	</body>
</html>
```

main.js

```js
console.log("----------------- start -----------------");

setTimeout(() => {
	console.log("setTimeout");
}, 0);

new Promise((resolve, reject) => {
	for (var i = 0; i < 5; i++) {
		console.log(i);
	}
	resolve(); // 修改promise实例对象的状态为成功的状态
}).then(() => {
	console.log("promise实例成功回调执行");
});

console.log("----------------- end -----------------");
```

## 执行上下文

执行上下文(execute context) EC

执行上下文对象就是 this

理解：代码执行的环境

时机：代码正式执行之前会进入到执行环境

工作:

- 1.创建变量对象：
  - 1）变量
  - 2）函数及函数的参数
  - 3）全局：window
  - 4）局部：抽象但是确实存在
- 2.确定 this 的指向
  - 1）全局：this ---> window
  - 2）局部：this ---> 调用其的对象
- 3.创建作用域链
  - 父级作用域链 + 当前的变量对象
- 4.扩展

```js
WCobj = {
    // 变量对象： {变量，函数，函数的形参}
    // scopeChain:父级作用域链 + 当前的变量对象
    this:{window || 调用其的对象}
}
```

## JS 引擎预处理(变量提升)

JS 引擎在代码正式执行之前会做一个预处理的工作:

1.收集变量

2.收集函数

依据:

var 将 var 后边的变量定义但是不赋值 var username = undefined;

function(){} 是提前定义了该函数

```js
console.log(username); // 答案: undefined
var username = 'kobe';

fun(); // 答案: 正常执行函数

function fun() {console.log('fun()');
```

## JavaScript底层剖析

### 浏览器工作原理 和 V8引擎

- 浏览器的工作原理

- 浏览器渲染过程

- 认识JavaScript引擎

- 浏览器内核和JS引擎的关系

- V8引擎的原理

- V8引擎的架构

- V8引擎的官方解析图

- V8执行的细节

### 作用域



### 函数、闭包



### 面向对象



### 一系列

- 事件循环

- 微任务

- 宏任务

- 内存管理

- Promise

- await、asnyc

- 防抖、节流
