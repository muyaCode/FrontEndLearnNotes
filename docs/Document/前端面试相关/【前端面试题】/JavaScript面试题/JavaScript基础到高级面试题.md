# JavaScript 基础到高级面试题

## 基础知识：ECMA 262 标准

### 一、运用基础知识题

#### 1.JS 中使用 typeof 能得到的哪些类型?（JS 的变量类型）

MDN 文档：[typeof - JavaScript | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/typeof)

```js
typeof "abc"; // string
typeof 123; // number
typeof undefined; // undefined
typeof true; // boolean
typeof []; // object
typeof {}; // object
typeof null; // object
typeof console.log; // function
typeof NaN; // 'number'
typeof Symbol(); // symbol
```

#### 2.何时使用 === 何时使用 == ?（强制类型转换）

变量计算时使用

- 同类型变量对比使用 === 全等
- 不同类型变量使用==，因为这个运算符有隐式的强制转换类型功能

##### 2.1.字符串拼接

```js
var a = 100 + 10; // 110
var b = 100 + "10"; // 110010
```

##### 2.2.== 运算符

```js
100 == "100";
0 == "";
null == undefined;
```

##### 2.3.if 语句

```js
var a = true;
if (a) {
	//
}

var b = 100;
if (b) {
	//
}

var c = "";
if (c) {
	//
}
```

##### 2.4.逻辑运算

```js
console.log(10 && 0); // 0
console.log("abc" || ""); // 'abc'
console.log(!window.abc); // true
// 判断一个变量会被当做 true 还是 false
var a = 100;
console.log(!!a);
```

#### 3.window.onload 和 DOMContentLoaded 的区别?（浏览器渲染过程）

#### 4.用 JS 创建 10 个`<a>`标签，点击的时候弹出来对应的序号（作用域）

#### 5.简述如何实现一个模块加载器，实现类似 requirejs 的基本功能（JS 模块化）

#### 6.实现数组的随机排序（JS 基础算法）

### 二、原型和原型链

原型链文档：[继承与原型链 - JavaScript | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)

#### 1.如何准确判断一个变量是数组类型

```js
var arr = l]
arr instanceof Array // true
typeof arr // object，typeof 是无法判断是否是数组的
```

#### 2.写一个原型链继承的例子

```js
// 动物
function Animal() {
	this.eat = function () {
		console.log("animal eat");
	};
}
// 狗
function Dog() {
	this.bark = function () {
		console.log("dog bark");
	};
}
Dog.prototype = new Animal();
var hashiqi = new Dog();
console.log(hashiqi.eat); // animal eat
```

#### 3.描述 new 一个对象的过程

#### 4.内置的构造函数-扩展(语法糖)

var a= {} 其实是 var a = new Object() 的语法糖

var a= [] 其实是 var a = new Array() 的语法糖

function Foo(){} 其实是 var Foo = new Function(...)

使用 instanceof 判断一个函数 是否是 一个变量的构造函数

instanceof MDN 文档：[instanceof - JavaScript | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/instanceof)

### 三、作用域 闭包

#### 执行上下文

```js
console.log(a); // undefined
var a = 100;

fn("张三"); // "张三"  20
function fn() {
	age = 20;
	console.log(a);
	var age;
}
```

范围：一段`<script>`或者一个函数

全局：变量定义、函数声明

函数：变量定义、函数声明、this、arguments

#### this

### 四、异步 单线程

## JS-Web-API：W3C 标准

W3C 标准没有规定任何 JS 基础相关的东西

只管定义用于浏览器中 JS 操作页面的 API 和全局变量

### 一、DOM 操作

DOM API：[The HTML DOM API - Web API 接口参考 | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/API/HTML_DOM_API)

菜鸟教程：[HTML DOM 教程 | 菜鸟教程 (runoob.com)](https://www.runoob.com/htmldom/htmldom-tutorial.html)

HTML DOM Document 对象：[HTML DOM Document 对象 | 菜鸟教程 (runoob.com)](https://www.runoob.com/jsref/dom-obj-document.html)

DOM Document 文档对象模型：[Document.getElementsByClassName() - Web API 接口参考 | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/getElementsByClassName)

浏览器对象模型 Element 对象方法：[Element](https://developer.mozilla.org/zh-CN/docs/Web/API/Element)

#### DOM 操作的常用 API

[Node.baseURI - Web API 接口参考 | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/baseURI)

[DOM 操作的常用 API*Doe 的博客-CSDN 博客*关于 dom 的 api 有什么](https://blog.csdn.net/weixin_43613849/article/details/121560210)

[DOM 常用 API*梦的遇见 OvO 的博客-CSDN 博客*操作 dom 的 api](https://blog.csdn.net/weixin_48115183/article/details/124742349)

[DOM 和 BOM 的总结 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/50308105)

[最全的 DOM 和 BOM 的解释分析\_忆水思寒的博客-CSDN 博客\_dom 和 bom](https://blog.csdn.net/myqq1418/article/details/107787477)

#### 操作 DOM

1. 获取元素 document.getElementById(id)，浏览器需要
2. 定义一个 document 全局变量，对象类型
3. 给它定义一个 getElementById 的属性，属性值是一个函数

```js
var div1 = document.getElementById("div1"); // 元素
var divList = document.getElementsByTagName("div"); // 集合
console.log(divListlength);
console.log(divList[0]);

var containerList = document.getElementsByClassName(".container"); // 集合
var pList = document.querySelectorAl("p");
```

### 二、Ajax

### 三、事件绑定

## 开发环境

### 一、版本管理

### 二、模块化

### 三、打包工具

## 运行环境

### 一、页面渲染

### 二、性能优化

### 三、前端安全
