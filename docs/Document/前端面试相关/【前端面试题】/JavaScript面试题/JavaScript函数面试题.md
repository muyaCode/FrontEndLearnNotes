# JavaScript 函数面试题

MDN 的 function 文档：[Function - JavaScript | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function)

## JavaScript 中函数相关概念

### JavaScript 中函数是一等公民

在 JavaScript 中，函数是非常重要的，并且是一等公民

- 那么就意味着函数的使用是非常灵活的：
- 函数可以作为另外一个**函数的参数**，也可以作为另外一个函数的**返回值**来使用，这种函数也称高阶函数
- 函数内可以定义另外的函数

**高阶函数**：

- 一个函数如果接收另一个函数作为参数，或者该函数会返回另一个函数作为返回值的函数，那么这个函数称之为高阶函数
- 闭包函数也属于高阶函数

内置的高阶函数

- 数组的方法，很多都是接收回调函数作为参数

### 函数执行过程的内存

1.GO 是(golbal Object)全局对象里面，会创建出函数的对象

2.执行函数后，会创建函数执行对象 AO

3.函数对象会指向对应全局对象，全局对象也会指向对应的函数对象

4.函数执行对象 AO，执行上下文中指向函数内的变量

5.执行完成，函数执行对象 AO 占用的内存便会被销毁

## function 的考题

### 五种函数方法的执行输出

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>function案例</title>
	</head>
	<body></body>
	<script>
		function Foo() {
		    getName = function () {
		        console.log(1);
		    };
		    // 不实例化Foo，直接执行：指向 window
		    // 实例化Foo，再执行：
		    return this;
		}

		// 给函数Foo添加静态属性方法 =》 函数对象上的方法
		Foo.getName = function () {
		    console.log(2);
		};

		// 给构造函数的原型添加方法：下面两种方法执行
		// var foo = new Foo() => foo.getName
		// new Foo().getName
		Foo.prototype.getName = function () {
		    console.log(3);
		};

		// 给变量赋值方法
		var getName = function () {
		    console.log(4);
		};

		// 给对象赋值方法
		var obj = {
		    foo: function () {
		    	console.log('obj-foo');
			};
		}

		// 定义getName函数方法
		function getName() {
		    console.log(5);
		}

		// 打印2 => 直接给函数的静态属性方法
		Foo.getName();
		// 打印4 =》 优先执行function语句式的函数方法getName，再执行变量getName的属性方法，后面执行会覆盖前面执行的所以打印4
		getName();
		// 打印1 =》 值执行Foo()函数，getName变量在Foo()函数内重新被赋值，return的 this 指向 window，所以执行window.getName方法，也就是执行Foo()的getName静态属性方法
		// Foo() -> this -> window -> window.getName -> window.getName变量在Foo()函数内重新被赋值，所以打印1
		Foo().getName(); // 打印1
		// 打印1 =》 上面Foo()的getName静态属性被赋值了新方法，所以跟着打印1
		getName();
		// 打印2 =》 new Foo没有()，所以new无用（不是实例化方法），只是执行Foo.getName属性方法，所以打印2
		new Foo.getName();
		// 打印3 =》 执行的是实例化后的构造函数Foo的prototype原型的实例方法 -> Foo.prototype.getName()
		new Foo().getName();
		// 打印3 =》
		// 先执行第二个new之后相当于：var foo = new Foo();foo.getName() -> Foo.prototype.getName()
		// 再执行第一个new：new的是Foo.prototype.getName()，new Foo.prototype.getName()，无返回值，没有实际作用
		new new Foo().getName();
	</script>
</html>
```

### function 的函数作用域

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>function的函数作用域</title>
	</head>
	<body></body>
	<script>
		// 优先执行独立作用域内的变量
		var x = 1;
		function test(
			x,
			y = function () {
				x = 3; // x为参数
				console.log(x); // （2）：打印[3]，参数的作用域
			}
		) {
			console.log(x); // （1）：打印[undefined]，形参实参相统一  x => undefind
			var x = 2;
			y();
			console.log(x); // （3）：打印[2]，函数内部作用域的变量赋值
		}

		test();
		console.log(x); // （4）：打印[1]，全局作用域x变量 => 1
	</script>
</html>
```

## Function 考题

Function 文档：

- [Function - JavaScript | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function)
- [Function（） 构造函数 - JavaScript |多核 (mozilla.org)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/Function)

### Function 考题 1：浏览器环境和 node 环境下的变量和 new Function()

```js

```

## 函数柯里化

在一个函数中，首先填充几个参数，然后再返回一个新的函数的技术，称为函
数的柯里化。通常可用于在不侵入函数的前提下，为函数 预置通用参数，供多
次重复调用。

```js
const add = function add(x) {
	return function (y) {
		return x + y;
	};
};
const add1 = add(1);
add1(2) === 3;
add1(20) === 21;
```

## 立即执行函数

```js

```

## 箭头函数

### 谈一谈箭头函数与普通函数的区别？

- 函数体内的 this 对象，就是定义时所在的对象，而不是使用时所在的对象
- 不可以当作构造函数，也就是说，不可以使用 new 命令，否则会抛出一个错误
- 不可以使用 arguments 对象，该对象在函数体内不存在。如果要用，可以用 Rest 参数代替
- 不可以使用 yield 命令，因此箭头函数不能用作 Generator 函数

```js

```

## 函数的作用域链

一链套一链

### 说说你对作用域链的理解

作用域链的作用是保证执行环境里有权访问的变量和函数是有序的，作用域链的变量只能向上访问，变量访问到 window 对象即被终止，作用域链向下访问变量是不被允许的

简单的说，作用域就是变量与函数的可访问范围，即作用域控制着变量与函数的可见性和生命周期

## 函数的 this 指向的绑定和优先级

### 谈一谈函数中 this 的指向

this 的指向在函数定义的时候是确定不了的，只有函数执行的时候才能确定 this 到底指向谁，实际上 this 的最终指向的是那个调用它的对象

《javascript 语⾔精髓》中大概概括了 4 种调用方式：

- 方法调用模式
- 函数调用模式
- 构造器调用模式
- apply/call 调用模式

### 规则一：默认绑定

独立函数调用：独立的函数调用，可以理解成函数没有绑定到某个对象上进行调用；

案例 1：

```js
function foo() {
	console.log(this);
}
foo();
```

案例 2：

```js
function test1() {
	console.log(this);
	test2();
}

function test2() {
	console.log(this);
	test3();
}

function test3() {
	console.log(this);
}
test1();
```

案例 3：

```js
function foo() {
	func();
}
var obj = {
	name: "why",
	bar: function () {
		console.log(this);
	},
};
foo(obj.bar);
```

### 规则二：隐式绑定

某个对象的方法调用：也就是它的调用位置中，是通过某个对象发起的函数调用

谁调用，this 就指向谁

案例 1：

```js
function foo() {
	console.log(this);
}
var obj = {
	name: "why",
	foo: foo,
};
obj.foo();
```

案例 2：

```js
function foo() {
	console.log(this);
}
var obj1 = {
	name: "obj1",
	foo: foo,
};
var obj2 = {
	name: "obj2",
	obj1: obj1,
};
obj2.obj1.foo();
```

案例 3：

```js
function foo() {
	func();
}
var obj1 = {
	name: "obj1",
	bar: foo,
};
var bar = obj1.foo;
bar();
```

### 规则三：显示绑定

不希望在 对象内部 包含这个函数的引用，同时又希望在这个对象上进行强制调用

- JavaScript 所有的函数都可以使用 call 和 apply 方法(这个和 Prototype 有关)
  - 它们两个的区别这里不再展开;
  - √ 其实非常简单，第一个参数是相同的，后面的参数，apply 为数组，call 为参数列表
- 这两个函数的第一个参数都要求是一个对象，这个对象的作用就是给 this 准备的。
- 在调用这个函数时，会将 this 绑定到这个传入的对象上。

#### 通过 call 或者 apply 绑定 this 对象

显示绑定后，this 就会明确指向绑定的对象

```js
function foo() {
	console.log(this);
}
// 显示绑定
foo.call(window); // this指向window
foo.call({ name: "哈哈" }); // 指向该对象
foo.call(123); // 指向该Number对象，存放是123
```

#### 通过 bind 方法总是绑定到指定对象上

```js
function foo() {
	console.log(this);
}

var obj = {
	name: "哈哈",
};

var bar = foo.bind(obj);
bar(); // this指向 obj 对象
```

### 规则四：new 绑定

JavaScript 中的函数可以当做一个类的构造函数来使用，也就是使用 new 关键字。

使用 new 关键字来调用函数是，会执行如下的操作

- 1.创建一个全新的对象;

- 2 这个新对象会被执行 prototype 连接;

- 3.这个新对象会绑定到函数调用的 this 上(this 的绑定在这个步骤完成)

- 4.如果函数没有返回其他对象，表达式会返回这个新对象：

- ```js
  // 创建Persion构造函数
  function Persion(name) {
  	console.log(this);
  	this.name = name;
  }
  var persion = new Persion("人");
  console.log(persion);
  ```

## 函数闭包

MDN 文档：[闭包 - JavaScript | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Closures)

### 什么是闭包

闭包的定义，分成两个：在计算机科学中 和 在 JavaScript 中。

在计算机科学中对闭包的定义(维基百科):

- 闭包(英语：Closure)，又称词法闭包( Lexical Closure )或函数闭包( function closures );
- 是在支持 **头等函数** 的编程语言中，实现词法绑定的一种技术;
- 闭包在实现上是一个结构体，它存储了一个函数和一个关联的环境(相当于一个符号查找表);
- 闭包跟函数最大的区别在于，当捕捉闭包的时候，它的 自由变量 会在捕捉时被确定，这样即使脱离了捕捉时的上下文，它也能照常运行

闭包的概念出现于 60 年代，最早实现闭包的程序是 Scheme，那么我们就可以理解为什么 JavaScript 中有闭包：

因为 JavaScript 中有大量的设计是来源于 Scheme 的;

### 闭包

闭包就是能够读取其他函数内部变量的函数

闭包：是指有权访问另一个函数作用域中变量的函数，创建闭包的最常见的方式就是在一个函数内创建另一个函数，通过另一个函数访问这个函数的局部变量,利用闭包可以突破作用链域

**闭包的定义很简单**：函数 A 返回了一个函数 B，并且函数 B 中使用了函数 A
的变量，函数 B 就被称为闭包。

闭包的特性：

- 函数内再嵌套函数
- 内部函数可以引用外层的参数和变量
- 参数和变量不会被垃圾回收机制回收

### 说说你对闭包的理解

使用闭包主要是为了设计私有的方法和变量。闭包的优点是可以避免全局变量的污染，缺点是闭包会常驻内存，会增大内存使用量，使用不当很容易造成内存泄露。在 js 中，函数即闭包，只有函数才会产生作用域的概念

闭包 的最大用处有两个，一个是可以读取函数内部的变量，另一个就是让这些变量始终保持在内存中

闭包的另一个用处，是封装对象的私有属性和私有方法

- 好处：能够实现封装和缓存等；
- 坏处：就是消耗内存、不正当使用会造成内存溢出的问题

### 使用闭包的注意点

由于闭包会使得函数中的变量都被保存在内存中，内存消耗很大，所以不能滥用闭包，否则会造成网页的性能问题，在 IE 中可能导致内存泄露

解决方法是，在退出函数之前，将不使用的局部变量全部删除

### 如何理解闭包？

#### 思路：闭包由词法环境和函数组成

内部函数 inner 如果引用了外部函数 outer 的变量 a，会形成闭包。如果这个内部函数作为外部函数的返回值，就会形成词法环境的引用闭环（循环引用），对应变量 a 就会常驻在内存中，形成大家所说的“闭包内存泄漏”。

虽然闭包有内存上的问题，但是却突破了函数作用域的限制，使函数内外搭起了沟通的桥梁。

闭包也是实现私有方法或属性，暴露部分公共方法的渠道。

还可以引申出柯里化，bind 等概念。

### 闭包代码示例

下面是一段简单的闭包代码示例

```js
function foo() {
	var name = "foo";
	function bar() {
		console.log("bar", name);
	}
	return bar;
}
var fn = foo();
fn();
```

### 闭包的工作原理(代码在内存中的执行过程)

GO 是(golbal Object)全局对象，AO 对象是函数执行所创建的对象（此概念解释看“JavaScript 的运行和原理-JavaScript 的运行环境”文档）

正常函数执行完后便会被销毁，而函数闭包内的函数，却可以访问外层本该销毁的函数的上下文变量（**有了闭包函数，可以阻止 AO 对外层函数内存被销毁**）

- 一个普通的函数 function，如果它可以访问外层作用于的自由变量，那么这个函数就是一个闭包;
- 从广义的角度来说：JavaScript 中的函数都是闭包;
- 从狭义的角度来说：JavaScript 中一个函数，如果访问了外层作用域的变量，那么它是一个闭包

![闭包的工作原理](.\img\闭包的工作原理.jpg)

更清晰的图

![闭包的工作原理2](.\img\闭包的工作原理2.jpg)

### 闭包产生的内存泄露

那么我们为什么经常会说闭包是有内存泄露的呢?

- 在上面的案例中，如果后续我们不再使用闭包函数了，那么该函数对象应该要被销毁掉，并且其用着的父作用域 AO 也应该被销毁掉;
- 但是目前因为在全局作用域下函数内的变量对 0xb00 的函数对象有引用，而 0xb00 的作用域中 AO(0x200)有引用，所以最终会造成这些内存都是无法被释放的;
- 所以我们经常说的闭包会造成内存泄露，其实就是刚才的引用链中的所有对象都是无法释放的;

解决闭包造成内存泄露

- 因为当将闭包函数设置为 null 时`fn = null`，就不再对函数对象 0xb00 有引用，那么对应的 AO 对象 0x200 也就不可达了口在 GC 的下一次检测中，它们就会被销毁掉;

**简单来说**：闭包执行完成后，函数对象的和函数执行内存不会自动销毁，这样会产生内存泄漏，可以函数赋值：`fn = null`(闭包内外的两个函数都要赋值)，即可手动销毁内存

#### 闭包内存泄漏例子

```js
function createFnArray() {
	// var arr = [1,1,1,1,1,1,1,1,1,1,1,1]
	// 占用空间是4M * 100 + 其他内存 = 400M+
	var arr = new Array(1024 * 1024).fill(1);
	return function () {
		console.log(arr.length);
	};
}

// 函数执行内存存在数组对象内：100 * 100 = 10000  = 10s
var arrayFns = [];
for (var i = 0; i < 100; i++) {
	setTimeout(() => {
		arrayFns.push(createFnArray());
	}, i * 100);
}

// 定时销毁内存
setTimeout(() => {
	for (var i = 0; i < 50; i++) {
		setTimeout(() => {
			arrayFns.pop(); // 定时删除方法
		}, i * 100);
	}
}, 10000);
```

可以在浏览器控制台性能调试选项调试性能相关，如内存。

### 经典面试题：循环中使用闭包解决 var 定义函数的问题

```js
for (var i = 1; i <= 5; i++) {
	setTimeout(function timer() {
		console.log(i);
	}, i * 1000);
}
```

首先因为 setTimeout 是个异步函数，所有会先把循环全部执行完毕，这时候 i 就是 6 了，所以会输出一堆 6 。

解决办法两种，第一种使用闭包

```js
for (var i = 1; i <= 5; i++) {
	(function (j) {
		setTimeout(function timer() {
			console.log(j);
		}, j * 1000);
	})(i);
}
```

第二种就是使用 setTimeout 的第三个参数

```js
for (var i = 1; i <= 5; i++) {
	setTimeout(
		function timer(j) {
			console.log(j);
		},
		i * 1000,
		i
	);
}
```

第三种就是使用 let 定义 i 了

```js
for (let i = 1; i <= 5; i++) {
	setTimeout(function timer() {
		console.log(i);
	}, i * 1000);
}
```

因为对于 let 来说，他会创建一个块级作用域，相当于

```js
{
	// 形成块级作用域
	let i = 0;
	{
		let ii = i;

		setTimeout(function timer() {
			console.log(i);
		}, i * 1000);
	}
	i++;
	{
		let ii = i;
	}
	i++;
	{
		let ii = i;
	}
	// ...
}
```

## JavaScript 函数式编程

### 谈一谈你理解的函数式编程

简单说，"函数式编程"是一种"编程范式"（programming paradigm），也就是如何编写程序的方法论

它具有以下特性：闭包和高阶函数、惰性计算、递归、函数是"第一等公⺠"、只用"表达式"

### 函数的柯里化

```js

```

### 函数的执行方式

```js

```

三个显示绑定 this 的方法调用函数：apply、call、bind

```js

```

### 把函数 Arguments 对象参数转成 array 数组类型

Arguments 对象文档：[Arguments 对象 - JavaScript | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/arguments)

ES6 箭头函数中，没有 Arguments 参数，推荐使用 ES6 的 [剩余参数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Rest_parameters)

```js
function foo(num1, num2) {
	// 1.自己遍历
	var newArr = [];
	for (var i = 0; i < arguments.length; i++) {
		newArr.push(arguments[i] * 10);
	}
	console.log(newArr);
	// 2.Array.prototype.slice将arguments转成array
	var newArr2 = Array.prototype.slice.call(arguments);
	console.log(newArr2);
	var newArr3 = [].sice.call(arguments);
	console.log(newArr3);
	// 3.ES6的语法
	var newArr4 = Array.from(arguments);
	console.log(newArr4);
	var newArr5 = [...arguments];
	console.Tog(newArr5);
}
foo(10, 20, 30, 40, 50);
```

### 异步编程的实现方式

#### 回调函数

- 优点：简单、容易理解
- 缺点：不利于维护，代码耦合高

#### 事件监听(采用时间驱动模式，取决于某个事件是否发生)：

- 优点：容易理解，可以绑定多个事件，每个事件可以指定多个回调函数
- 缺点：事件驱动型，流程不够清晰

#### 发布/订阅(观察者模式)

类似于事件监听，但是可以通过‘消息中⼼ ʼ，了解现在有多少发布者，多少订阅者

#### Promise 对象

- 优点：可以利用 then 方法，进行链式写法；可以书写错误时的回调函数；
- 缺点：编写和理解，相对比较难

#### Generator 函数

- 优点：函数体内外的数据交换、错误处理机制
- 缺点：流程管理不方便

#### async 函数

- 优点：内置执行器、更好的语义、更⼴的适用性、返回的是 Promise、结构清晰。
- 缺点：错误处理机制
