# ECMAScript-6(ES2015)

编程之家-ES6 教程：<https://www.jb51.cc/es6-tutorial/>

阮一峰的开源书籍《ES6 入门教程》，这本书定义 ES6 之后的语法统称 ES6：<https://es6.ruanyifeng.com/>

## ES6

### 1.为什么要学习 ES6

- ⚫ ES6 的版本变动内容最多，具有里程碑意义

- ⚫ ES6 加入许多新的语法特性，编程实现更简单、高效

- ⚫ ES6 是前端发展趋势，就业必备技能

### 2.开始 （聚焦 ES6）

这里引用 `阮一峰` 老师的 `ES6标准入门` 一书中的总结：ES6 既是一个历史名词，也是一个泛指，含义是 5.1 版本以后的 `JavaScript` 的下一代标准，涵盖了 `ES2015、ES2016、ES2017`等，而 `ES2015` 则是正式名称，特指当年发布的正式版本的语言标准 市面上提到的 ES6 一般是指 `ES2015` 标准，但有时也是泛指 `下一代 JavaScript`

**本文主要讲解以下内容:**

- 块级作用域（Block scoping，ES2015）
- 解构（Destructuring，ES2015）
- 箭头函数（Arrow Functions，ES2015）
- 模板字符串（template string，ES2015）
- 剩余参数 / 展开语法（Rest and spread parameters，ES2015）
- 对象字面量简写语法（Object shorthand，ES2015）
- 数组实例的 includes() （ES2016）
- Async/await 异步语法 (ES2017)

### 2.ES6 级其他ES版本兼容性

查看兼容性

- 各大浏览器对 ES 语法的支持：<http://kangax.github.io/compat-table/es6/>

- <http://kangax.github.io/compat-table/>

语法兼容性查询网站`can i use`：<https://caniuse.com>

ES6+版本的代码 --> 通过 webpack的Babel插件  --> ES5 版本支持的代码

- 兼容性更好

## 提案

## 01.let 和 const

### let 声明变量

#### 1.let 作用域只局限于当前代码块{ }

块级作用域的任意嵌套

```js
{
	{
		{
			{
				{
					let insane = "Hello World";
				}
				console.log(insane); // 报错
			}
		}
	}
}
```

上面代码使用了一个五层的块级作用域，每一层都是一个单独的作用域。 第四层作用域无法读取第五层作用域的内部变量

```js
function f1() {
	let n = 5;
	if (true) {
		let n = 10;
	}
	console.log(n); // 5
}
```

上面的函数有两个代码块，都声明了变量 n，运行后输出 5。这表示外层代码块不受内层代码块的影响。 如果两次都使用 var 定义变量 n，最后输出的值才是 10。

内层作用域可以定义外层作用域的同名变量

```js
{
	{
		{
			{
				let insane = "Hello World";
				{
					let insane = "Hello World";
				}
			}
		}
	}
}
```

作用

- 块级作用域的出现，实际上使得获得广泛应用的匿名立即执行函数表达式（匿名 IIFE）不再必要了。

  - ```js
    // IIFE 写法
    (function () {
      var tmp = ...;
      ...
    }());
  
    // 块级作用域写法
    {
      let tmp = ...;
      ...
    }
    ```

- 原因看面试题

#### 2.let 声明的变量同层作用域下不能重复声明

```js
// 报错
function func() {
	let a = 10;
	var a = 1;
}

// 报错
function func() {
	let a = 10;
	let a = 1;
}
```

内层作用域可以定义外层作用域的同名变量

```js
// 不能在函数内部重新声明参数
function func(arg) {
	let arg;
}
func(); // 报错

// 不同作用域则可以
// 内层作用域可以定义外层作用域的同名变量
function func(arg) {
	{
		let arg;
	}
}
func(); // 不报错
```

#### 3.使用 let 声明的变量作用域不会提升

var 命令会发生“变量提升”现象，即变量可以在声明之前使用，值为 undefined

```js
// var 的情况
console.log(foo); // 输出undefined
var foo = 2;
```

脚本开始运行时，变量 foo 已经存在了，但是没有值，所以会输出 undefined

let 所声明的变量一定要在声明后使用，否则报错

```js
// let 的情况
console.log(bar); // 报错ReferenceError
let bar = 2;
```

#### 4.暂时性死区特性 (变量在 let || const 声明之前使用)

```js
var tmp = 123;

if (true) {
	tmp = "abc"; // ReferenceError
	let tmp;
}
```

上面代码中，存在全局变量 tmp，但是块级作用域内 let 又声明了一个局部变量 tmp，导致后者绑定这个块级作用域，所以在 let 声明变量前，对 tmp 赋值会报错

解释

- ES6 明确规定，如果区块中存在 let 和 const 命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域。凡是在声明之前就使用这些变量，就会报错。

- 总之，在代码块内，使用 let 命令声明变量之前，该变量都是不可用的

- 跟作用域提升一样的报错信息

  - ReferenceError

  - ReferenceError: xxx is not defined

### const 声明常量

#### 1.只在当前的代码块{}中有效

```js
if (true) {
	const MAX = 5;
}

MAX; // 作用域外使用报错：Uncaught ReferenceError: MAX is not defined
```

#### 2.作用域不会提升

#### 3.暂时性死区

const 命令声明的常量也是不提升，同样存在暂时性死区，只能在声明的位置后面使用

```js
if (true) {
	console.log(MAX); // ReferenceError
	const MAX = 5;
}
```

上面代码在常量 MAX 声明之前就调用，结果报错。

#### 4.const 声明的常量不能重复声明

```js
var message = "Hello!";
let age = 25;

// 以下两行都会报错
const message = "Goodbye!";
const age = 30;
```

#### 5.基本数据类型常量在声明之后值不可更改

```js
const PI = 3.1415;
PI; // 3.1415

PI = 3;
// TypeError: Assignment to constant variable.
```

#### 6.声明的常量必须赋值

const 声明的变量不得改变值，这意味着，const 一旦声明变量，就必须立即初始化，不能留到以后赋值。

```js
const foo;
// SyntaxError: Missing initializer in const declaration
```

#### 7.复合数据类型常量在声明之后值可更改，但不可重新赋值

复合数据类型常量在声明之后值可更改（数据结构内部值可更改），但不可重新赋值(内存地址不可更改)

文档：<https://es6.ruanyifeng.com/?search=Reflect&x=0&y=0#docs/let#%E6%9C%AC%E8%B4%A8>

const 实际上保证的，并不是变量的值不得改动，而是变量指向的那个 内存地址 所保存的数据不得改动

对于简单类型的数据（数值、字符串、布尔值），值就保存在变量指向的那个内存地址，因此等同于常量

但对于复合类型的数据（主要是对象和数组），变量指向的内存地址，保存的只是一个指向实际数据的指针，const 只能保证这个指针是固定的（即总是指向另一个固定的地址），至于它指向的数据结构是不是可变的，就完全不能控制了

```js
const foo = {};

// 为 foo 添加一个属性，可以成功
foo.prop = 123;
foo.prop; // 123

// 将 foo 指向另一个对象，就会报错
foo = {}; // TypeError: "foo" is read-only
```

代码中，常量 foo 储存的是一个地址，这个地址指向一个对象。不可变的只是这个地址，即不能把 foo 指向另一个地址，但对象本身是可变的，所以依然可以为其添加新属性。

```js
const array = [100, 200];
array[0] = 123; // 改变属性，成功

// 将数组指向另一个数组，就会报错
array = [];
```

2

```js
const a = [];
a.push("Hello"); // 可执行
a.length = 0; // 可执行
a = ["Dave"]; // 报错
```

代码中，常量 a 是一个数组，这个数组本身是可写的，但是如果将另一个数组赋值给 a，就会报错。

```js
const a = [];
a.push("Hello"); // 可执行
a.length = 0; // 可执行
a = ["Dave"]; // 报错
```

##### 对象冻结

###### 1.真的想将对象冻结，应该使用 Object.freeze 方法

```js
const foo = Object.freeze({});

// 常规模式时，下面一行不起作用；
// 严格模式时，该行会报错
foo.prop = 123;
```

代码中，常量 foo 指向一个冻结的对象，所以添加新属性不起作用，严格模式时还会报错。

###### 2.对象的属性也应该冻结

```js
var constantize = (obj) => {
	Object.freeze(obj);
	Object.keys(obj).forEach((key, i) => {
		if (typeof obj[key] === "object") {
			constantize(obj[key]);
		}
	});
};
```

### let、const、var 的区别

#### var 定义的变量

- 1.没有块级作用域的概念，可以跨块访问, 不能跨函数访问

- 2.存在变量提升：允许你在变量声明前使用变量

- var 变量提升的问题引起的报错 (for 循环 var 声明变量，会变成全局变量)

  - for 循环用 var 声明的 i 变量报错

    - <https://juejin.cn/post/6844903717594988557>

    - 遍历点击改变颜色代码例子

      - 正常运行代码

        - ```js


                  <h2 class="page-header">点击切换颜色





                  //获取div元素对象
                  let items = document.getElementsByClassName('item');
    
                  //遍历并绑定事件
                  for(let i = 0;i<items.length;i++){
                      items[i].onclick = function(){
                          //修改当前元素的背景颜色
                          // this.style.background = 'pink';
                          items[i].style.background = 'pink';
                      }
                  }



          ```
    
      - 错误代码
    
        - ```js
          //遍历并绑定事件
          for (var i = 0; i < items.length; i++) {
          	items[i].onclick = function () {
          		//修改当前元素的背景颜色
          		// this.style.background = 'pink';
          		items[i].style.background = "pink";
          	};
          }
          ```

#### let 定义的变量

- 1.只能在块作用域里访问，不能跨块访问，也不能跨函数访问。

- 2.不存在变量提升：不允许你在变量声明前使用变量

- 3.暂时性死区特性
  - 函数或方法外部和内部可以声明同名变量

在 for 循环 let 定义变量

- ```js
  for (let i = 0; i < 2; i++) {}
  console.log(i); // 报错未定义
  ```

- 这个 let 声明的 i 变量没有变量提升 for 循环外面访问不到，会报错（防止循环变量，变成全局变量）

#### const 用来定义常量

使用时必须初始化(即必须赋值)，只能在块作用域里访问，而且不能修改。

例子代码

```js
// 块作用域
{
	var a = 1;
	let b = 2;
	const c = 3;
	// c = 4; // 报错
	var aa;
	let bb;
	// const cc; // 报错
	console.log(a); // 1
	console.log(b); // 2
	console.log(c); // 3
	console.log(aa); // undefined
	console.log(bb); // undefined
}
console.log(a); // 1
// console.log(b); // 报错
// console.log(c); // 报错

// 函数作用域
(function A() {
	var d = 5;
	let e = 6;
	const f = 7;
	console.log(d); // 5
	console.log(e); // 6
	console.log(f); // 7
})();
// console.log(d); // 报错
// console.log(e); // 报错
// console.log(f); // 报错
```

#### 面试题

##### var 变量和 let 变量计数循环对比

```js
var arr = [];
for (var i = 0; i < 2; i++) {
	arr[i] = function () {
		console.log(i);
	};
}
arr[0]();
arr[1]();
```

此题的关键点在于变量 i 是全局的，函数执行时输出的都是全局作用域下的 i 值。

```js
let arr = [];
for (let i = 0; i < 2; i++) {
	arr[i] = function () {
		console.log(i);
	};
}
arr[0]();
arr[1]();
```

此题的关键点在于每次循环都会产生一个块级作用域，每个块级作用域中的变量都是不同的，函数执行时输出的是自己上一级（循环产生的块级作用域）作用域下的 i 值.

##### var 变量：内层变量可能会覆盖外层变量

```js
var tmp = new Date();

function f() {
	console.log(tmp);
	if (false) {
		var tmp = "hello world";
	}
}

f(); // undefined
```

上面代码的原意是，if 代码块的外部使用外层的 tmp 变量，内部使用内层的 tmp 变量。 但是，函数 f 执行后，输出结果为 undefined，原因在于变量提升，导致内层的 tmp 变量覆盖了外层的 tmp 变量。

##### var 变量：用来计数的循环变量泄露为全局变量

```js
var s = "hello";

for (var i = 0; i < s.length; i++) {
	console.log(s[i]);
}

console.log(i); // 5
```

上面代码中，变量 i 只用来控制循环，但是循环结束后，它并没有消失，泄露成了全局变量。

##### 块级作用域可以替换立即执行函数作用域的原因

###### 立即执行函数

```js
(function () {
	var b = 123;
});
console.log(b); //error
```

- 立即执行函数里面的 var 变量，是这个函数的局部变量
- 可以借 立即执行函数 使 var 声明的变量，变成函数的局部变量

###### let 的块级作用域

- 替代了立即执行函数的局部变量的功能

##### 块级作用域与函数声明

- <https://es6.ruanyifeng.com/?search=Reflect&x=0&y=0#docs/let#%E5%9D%97%E7%BA%A7%E4%BD%9C%E7%94%A8%E5%9F%9F%E4%B8%8E%E5%87%BD%E6%95%B0%E5%A3%B0%E6%98%8E>

- 函数能不能在块级作用域之中声明？这是一个相当令人混淆的问题。

## 02.变量的解构赋值

ES6 允许按照一定模式，从数组和对象中提取值， 对变量进行赋值，这被称为解构(Destructuring)

### 声明变量的六种方法

- ES5 只有两种声明变量的方法：

  - var 命令

  - function 命令

- ES6 添加了四种命令

  - let 命令

  - const 命令

  - import 命令

  - class 命令

### 1.解构基本用法

```js
let [name, age, sex] = ["张三", 18, "男"];
console.log(name);
console.log(age);
console.log(sex);
```

相当于

```js
let name = '张三',age = 18,sex = '男'；
```

### 2.对象的解构赋值

```js
let { foo, bar } = { foo: "aaa", bar: "bbb" };
foo; // "aaa"
bar; // "bbb"
```

#### 1.对象的属性没有次序，变量必须与属性同名，才能取到正确的值

- ```js
  // 等号左边的两个变量的次序，与等号右边两个同名属性的次序不一致，但是对取值完全没有影响
  let { bar, foo } = { foo: "aaa", bar: "bbb" };
  foo; // "aaa"
  bar; // "bbb"
  
  // 变量没有对应的同名属性，导致取不到值，最后等于undefined
  let { baz } = { foo: "aaa", bar: "bbb" };
  baz; // undefined
  ```

- 解构失败

- ```js
  // 如果解构失败，变量foo的值等于undefined
  let { foo } = { bar: "baz" };
  foo; // undefined
  ```

#### 2.将现有对象的方法，赋值到某个变量

例子一

```js
// 例一：将Math对象的对数、正弦、余弦三个方法，赋值到对应的变量上
let { log, sin, cos } = Math;
```

例子二

```js
// 例二：将console.log赋值到log变量
const { log } = console;
log("hello"); // hello
```

#### 3.要修改变量名字，得指定名字赋值： let { 原变量名: 要改成的变量名 }

实际上原来的是简写

```js
// 原来的
let { foo: foo, bar: bar } = { foo: 'aaa', bar: 'bbb' };
// 可以自动简写成
let { foo:, bar } = { foo: 'aaa', bar: 'bbb' };
```

foo 是匹配的模式，baz 才是变量

```js
let { foo: baz } = { foo: "aaa", bar: "bbb" };
baz; // "aaa"
```

s

```js
let obj = { first: "hello", last: "world" };
let { first: f, last: l } = obj;
f; // 'hello'
l; // 'world'
```

#### 4.嵌套结构的对象

这时 p 是模式，不是变量，因此不会被赋值

```js
let obj = {
	p: ["Hello", { y: "World" }],
};

let {
	p: [x, { y }],
} = obj;
x; // "Hello"
y; // "World"
```

p 也要作为变量赋值

```js
let obj = {
	p: ["Hello", { y: "World" }],
};

let {
	p,
	p: [x, { y }],
} = obj;
x; // "Hello"
y; // "World"
p; // ["Hello", {y: "World"}]
```

三次解构赋值，分别是对 loc、start、line 三个属性的解构赋值

```js
const node = {
	loc: {
		start: {
			line: 1,
			column: 5,
		},
	},
};

let {
	loc,
	loc: { start },
	loc: {
		start: { line },
	},
} = node;
line; // 1
loc; // Object {start: Object}
start; // Object {line: 1, column: 5}
```

#### 5.对象嵌套赋值

```js
let obj = {};
let arr = [];

({ foo: obj.prop, bar: arr[0] } = { foo: 123, bar: true });

obj; // {prop:123}
arr; // [true]
```

解构模式是嵌套的对象，而且子对象所在的父属性不存在，那么将会报错

```js
// 报错
let {
	foo: { bar },
} = { baz: "baz" };
```

#### 6.对象的解构赋值可以取到继承的属性

```js
const obj1 = {};
const obj2 = { foo: "bar" };
Object.setPrototypeOf(obj1, obj2);

const { foo } = obj1;
foo; // "bar"
```

- 对象 obj1 的原型对象是 obj2。foo 属性不是 obj1 自身的属性，而是继承自 obj2 的属性，解构赋值可以取到这个属性

- `Object.setPrototypeOf(obj, proto)`

  - 参数

    - obj：要设置原型对象的对象。

    - proto：该对象的新原型对象或 null，否则抛出 TypeError 异常。

  - 返回值
    - 设置了新的原型对象的对象

#### 7.对象的解构指定默认值

使用例子

```js
var { x = 3 } = {};
x; // 3

var { x, y = 5 } = { x: 1 };
x; // 1
y; // 5

var { x: y = 3 } = {};
y; // 3

var { x: y = 3 } = { x: 5 };
y; // 5

var { message: msg = "Something went wrong" } = {};
msg; // "Something went wrong"
```

默认值生效的条件是，对象的属性值严格等于 undefined

```js
// 默认值生效
var { x = 3 } = { x: undefined };
x; // 3

// 默认值不生效
var { x = 3 } = { x: null };
x; // null
```

### 3.数组的解构赋值

模式匹配

```js
let [a, b, c] = [1, 2, 3];

// 等价于
let a = 1;
let b = 2;
let c = 3;
```

1.嵌套数组进行解构

```js
let [x, , y] = [1, 2, 3];
x; // 1
y; // 3

let [, , third] = ["foo", "bar", "baz"];
third; // "baz"

let [arr1, [arr2, arr3, [arr4, arr5]]] = [1, [2, 3, [4, 5]]];
arr1; // 1
arr2; // 2
arr3; // 3
arr4; // 4
arr5; // 5

let [head, ...tail] = [1, 2, 3, 4];
head; // 1
tail; // [2, 3, 4]

let [x, y, ...z] = ["a"];
x; // "a"
y; // undefined
z; // []
```

2.解构不成功

```js
let [foo] = [];
let [bar, foo] = [1];
```

两种情况都属于解构不成功，foo 的值都会等于 undefined。

3.不完全解构

- 即等号左边的模式，只匹配一部分的等号右边的数组

```js
let [x, y] = [1, 2, 3];
x; // 1
y; // 2

let [a, [b], d] = [1, [2, 3], 4];
a; // 1
b; // 2
d; // 4
```

4.报错解构

如果等号的右边不是数组

```js
// 报错
let [foo] = 1;
let [foo] = false;
let [foo] = NaN;
let [foo] = undefined;
let [foo] = null;
let [foo] = {};
```

上面的语句都会报错，因为等号右边的值，要么转为对象以后不具备 Iterator 接口（前五个表达式），要么本身就不具备 Iterator 接口（最后一个表达式）

5.Set 结构给 数组的解构赋值

```js
let [x, y, z] = new Set(["a", "b", "c"]);
x; // "a"
```

6.只要某种数据结构具有 Iterator 接口 都可以采用数组形式的解构赋值

```js
function* fibs() {
	let a = 0;
	let b = 1;
	while (true) {
		yield a;
		[a, b] = [b, a + b];
	}
}

let [first, second, third, fourth, fifth, sixth] = fibs();
sixth; // 5
```

上面代码中，fibs 是一个 Generator 生成器函数（参见《11.迭代器和生成器》一章），原生具有 Iterator 接口。解构赋值会依次从这个接口获取值

7.数据解构的默认值

解构赋值允许指定默认值

```js
let [foo = true] = [];
foo; // true

let [x, y = "b"] = ["a"]; // x='a', y='b'
let [x, y = "b"] = ["a", undefined]; // x='a', y='b'
```

只有当一个数组成员严格等于(===) undefined，默认值才会生效

```js
let [x = 1] = [undefined]; // 默认值生效
x; // 1

let [x = 1] = [null];
x; // null
```

解构赋值表达式结合

- ```js
  function f() {
  	console.log("aaa");
  }
  
  let [x = f()] = [1];
  ```

上面代码中，因为 x 能取到值，所以函数 f 根本不会执行。

上面的代码其实等价于下面的代码。

```js
let x;
if ([1][0] === undefined) {
	x = f();
} else {
	x = [1][0];
}
```

默认值可以引用解构赋值的其他变量， 但该变量必须已经声明

```js
let [x = 1, y = x] = []; // x=1; y=1
let [x = 1, y = x] = [2]; // x=2; y=2
let [x = 1, y = x] = [1, 2]; // x=1; y=2
let [x = y, y = 1] = []; // ReferenceError: y is not defined
```

上面最后一个表达式之所以会报错，是因为 x 用 y 做默认值时，y 还没有声明

#### 数组的解构赋值注意点

##### （1）如果要将一个已经声明的变量用于解构赋值，必须非常小心

```js
// 错误的写法
let x;
{x} = {x: 1};
// SyntaxError: syntax error
```

上面代码的写法会报错，因为 JavaScript 引擎会将{x}理解成一个代码块，从而发生语法错误。只有不将大括号写在行首，避免 JavaScript 将其解释为代码块，才能解决这个问题。

```js
// 正确的写法
let x;
({ x } = { x: 1 });
```

- 上面代码将整个解构赋值语句，放在一个圆括号里面，就可以正确执行。

- 关于圆括号与解构赋值的关系：
  - <https://es6.ruanyifeng.com/?search=Reflect&x=0&y=0#docs/destructuring#%E5%9C%86%E6%8B%AC%E5%8F%B7%E9%97%AE%E9%A2%98>

##### （2）解构赋值允许等号左边的模式之中，不放置任何变量名。因此，可以写出非常古怪的赋值表达式

```js
({} = [true, false]);
({} = "abc");
({} = []);
```

上面的表达式虽然毫无意义，但是语法是合法的，可以执行。

##### （3）由于数组本质是特殊的对象，因此可以对数组进行对象属性的解构

```js
let arr = [1, 2, 3];
let { 0: first, [arr.length - 1]: last } = arr;
first; // 1
last; // 3
```

- 对数组进行对象解构

- 数组 arr 的 0 键对应的值是 1，[arr.length - 1]就是 2 键，对应的值是 3

- 方括号这种写法，属于“属性名表达式”

### 4.字符串的解构赋值

```js
const [a, b, c, d, e] = "hello";
a; // "h"
b; // "e"
c; // "l"
d; // "l"
e; // "o"
```

字符串被转换成了一个类似数组的对象

```js
let { length: len } = "hello";
len; // 5
```

类似数组的对象都有一个 length 属性，因此还可以对这个属性字符串的长度解构赋值

### 5.数值和布尔值的解构赋值

解构赋值的规则是，只要等号右边的值不是对象或数组，就先将其转为对象

```js
// 解构赋值时，如果等号右边是数值和布尔值，则会先转为对象

let { toString: s } = 123;
s === Number.prototype.toString; // true

let { toString: s } = true;
s === Boolean.prototype.toString; // true
```

数值和布尔值的包装对象都有 toString 属性，因此变量 s 都能取到值

```js
let { prop: x } = undefined; // TypeError
let { prop: y } = null; // TypeError
```

由于 undefined 和 null 无法转为对象，所以对它们进行解构赋值，都会报错

### 6.函数参数的解构赋值

```js
function add([x, y]) {
	return x + y;
}

add([1, 2]); // 3
```

函数 add 的参数表面上是一个数组，但在传入参数的那一刻，数组参数就被解构成变量 x 和 y

js 内置方法解构赋值

```js
[
	[1, 2],
	[3, 4],
].map(([a, b]) => a + b);
// [ 3, 7 ]
```

函数参数的解构 使用默认值

```js
// undefined就会触发函数参数的默认值
[1, undefined, 3].map((x = "yes") => x);
// [ 1, 'yes', 3 ]
```

2

```js
function move({ x = 0, y = 0 } = {}) {
	return [x, y];
}

move({ x: 3, y: 8 }); // [3, 8]
move({ x: 3 }); // [3, 0]
move({}); // [0, 0]
move(); // [0, 0]
```

上面代码中，函数 move 的参数是一个对象，通过对这个对象进行解构，得到变量 x 和 y 的值。如果解构失败，x 和 y 等于默认值

```js
function move({ x, y } = { x: 0, y: 0 }) {
	return [x, y];
}

move({ x: 3, y: 8 }); // [3, 8]
move({ x: 3 }); // [3, undefined]
move({}); // [undefined, undefined]
move(); // [0, 0]
```

上面代码是为函数 move 的参数指定默认值，而不是为变量 x 和 y 指定默认值，所以会得到与前一种写法不同的结果

### 7.圆括号问题

文档：<https://es6.ruanyifeng.com/?search=Reflect&x=0&y=0#docs/destructuring#%E5%9C%86%E6%8B%AC%E5%8F%B7%E9%97%AE%E9%A2%98>

### 变量的解构赋值用途

#### （1）交换变量的值

```js
let x = 1;
let y = 2;

[x, y] = [y, x];
```

#### （2）从函数返回多个值

返回一个数组

```js
// 返回一个数组
function example() {
	return [1, 2, 3];
}
let [a, b, c] = example();
```

返回一个对象

```js
// 返回一个对象
function example() {
	return {
		foo: 1,
		bar: 2,
	};
}
let { foo, bar } = example();
```

#### （3）函数参数的定义

参数是一组有次序的值

```js
// 参数是一组有次序的值
function f([x, y, z]) { ... }
f([1, 2, 3]);
```

参数是一组无次序的值

```js
// 参数是一组无次序的值
function f({x, y, z}) { ... }
f({z: 3, y: 2, x: 1});
```

#### （4）提取 JSON 数据

```js
let jsonData = {
	id: 42,
	status: "OK",
	data: [867, 5309],
};

let { id, status, data: number } = jsonData;

console.log(id, status, number);
// 42, "OK", [867, 5309]
```

#### （5）函数参数的默认值

```js
// 定义参数
var param = {
  async = true,
  beforeSend = function () {},
  cache = true,
  complete = function () {},
  crossDomain = false,
  global = true,
  // ... more config
}
// 函数
jQuery.ajax = function (url,  param = {}) {
  // ... do stuff
};
```

指定参数的默认值，就避免了在函数体内部再写 var foo = config.foo || 'default foo';这样的语句

#### （6）遍历 Map 结构获取键值对

任何部署了 Iterator 接口的对象，都可以用 for...of 循环遍历。

Map 结构原生支持 Iterator 接口，配合变量的解构赋值，获取键名和键值就非常方便。

```js
const map = new Map();
map.set("first", "hello");
map.set("second", "world");

for (let [key, value] of map) {
	console.log(key + " is " + value);
}
// first is hello
// second is world
```

如果只想获取键名，或者只想获取键值

获取键名

```js
// 获取键名
for (let [key] of map) {
	// ...
}
```

获取键值

```js
// 获取键值
for (let [, value] of map) {
	// ...
}
```

#### （7）输入模块的指定方法

加载模块时，往往需要指定输入哪些方法。解构赋值使得输入语句非常清晰

```js
const { SourceMapConsumer, SourceNode } = require("source-map");
```

### 小结

- 解构赋值就是把数据结构分解，然后给变量进行赋值

- 如果结构不成功，变量跟数值个数不匹配的时候，变量的值为 undefined

- 数组解构用中括号包裹，多个变量用逗号隔开，对象解构用花括号包裹，多个变量用逗号隔开

- 利用解构赋值能够让我们方便的去取对象中的属性跟方法

## 03.字符串的扩展

### 1.字符的 Unicode 表示法

ES6 加强了对 Unicode 的支持

- 允许采用\uxxxx 形式表示一个字符，其中 xxxx 表示字符的 Unicode 码点

- // "a"的 Unicode 编码 "\u0061"

但是，这种表示法只限于码点在\u0000~\uFFFF 之间的字符。超出这个范围的字符，必须用两个双字节的形式表示。

```js
"\uD842\uDFB7";
// "𠮷"

"\u20BB7";
// " 7"
```

如果直接在\u 后面跟上超过 0xFFFF 的数值（比如\u20BB7），JavaScript 会理解成\u20BB+7。由于\u20BB 是一个不可打印字符，所以只会显示一个空格，后面跟着一个 7

只要将码点放入大括号，就能正确解读该字符

```js
"\u{20BB7}";
// "𠮷"

"\u{41}\u{42}\u{43}";
// "ABC"

let hello = 123;
hello; // 123

// 大括号表示法与四字节的 UTF-16 编码是等价的
"\u{1F680}" === "\uD83D\uDE80";
// true
```

有了这种表示法之后，JavaScript 共有 6 种方法可以表示一个字符

```js
"z" === "z"; // true
"\172" === "z"; // true
"\x7A" === "z"; // true
"\u007A" === "z"; // true
"\u{7A}" === "z"; // true
```

### 2.字符串的遍历器接口 for...of

#### ES6 为字符串添加了遍历器接口（详见迭代器(Iterator)），使得字符串可以被 for...of 循环遍历

```js
for (let codePoint of "foo") {
	console.log(codePoint);
}
// "f"
// "o"
// "o"
```

#### 识别大于 0xFFFF 的码点

```js
let text = String.fromCodePoint(0x20bb7);

for (let i = 0; i < text.length; i++) {
	console.log(text[i]);
}
// " "
// " "

for (let i of text) {
	console.log(i);
}
// "𠮷"
```

上面代码中，字符串 text 只有一个字符，但是 for 循环会认为它包含两个字符（都不可打印），而 for...of 循环会正确识别出这一个字符。

### 3.直接输入 U+2028 和 U+2029

### JSON.stringify() 的改造

### 03.模板字符串

ES6 新增的创建字符串的方式，使用反引号定义

1.基本定义

```js
let name = `zhangsan`;
```

2.模板字符串中可以解析变量

```js
let name = "张三";
let sayHello = `hello,my name is ${name}`;
console.log(sayHello);
```

3.模板字符串中可以换行

```js
let result = {
	name: "zhangsan",
	age: 20,
	sex: "男",
};
let html = ` 
     ${result.name}
     ${result.age}
     ${result.sex}
  `;
```

4.在模板字符串中可以调用函数

```js
const sayHello = function () {
	return "哈哈 追不到我吧";
};
let greet = `${sayHello()} 啦啦啦`;
console.log(greet); // 哈哈 追不到我吧啦啦啦
```

## 04.对象简化写法

对象声明简化

```js
let name = ‘张三’
let age = 18
let info = {
  name:name,
  age:age
}

// 变成
let name = ‘张三’
let age = 18
let info = {
  name,
  age
}
```

对象方法简化写法

```js
const school = {
	func: function () {},
};
// 变成
const school = {
	func() {},
};
```

## 05.箭头函数

### 使用

- `() => {}`

  - ()：代表是函数； =>：必须要的符号，指向哪一个代码块；{}：函数体

- `const fn = () => {}`

  - 把一个函数赋值给 fn 常量，便于调用

- `const fn = (n1,n2) => n1 + n2`

  - 返回值可以省略{},直接写代码 n1+n2

- `const fn = n1 => n1`
  - 形参只有一个可以省略()，和只有一条语句时，可以省略{}

### 剩余参数

使用

```js
const sum = (...args) => {
	let total = 0;
	args.forEach((item) => (total += item));
	return total;
};
sum(10, 20);
sum(10, 20, 30);
```

- ...args
  - 剩余的参数全部给它

剩余参数配合解构使用

### 箭头函数的 this 指向

1.箭头函数不绑定 this 关键字，箭头函数中的 this，指向的是函数定义位置的上下文 this (函数声明时所在作用域下的 this 的值)

```js
const obj = { name: "张三" };
function fn() {
	console.log(this); //this 指向 是obj对象
	return () => {
		console.log(this); //this 指向 的是箭头函数定义的位置，那么这个箭头函数定义在fn里面，而这个fn指向是的obj对象，所以这个this也指向是obj对象
	};
}
const resFn = fn.call(obj);
resFn();
```

2.如果在箭头函数中使用 this，this 关键字将指向 箭头函数定义位置中的 this

- 定义箭头函数中的作用域的 this 指向谁，它就指向谁

- 对象不能产生作用域，如果调用的是对象里面的方法，this.指向的是全局变量

  3.箭头函数不适合与 this 有关的回调. 事件回调, 对象的方法

### 箭头函数使用注意

#### 1.箭头函数的 this 是静态的

无论用什么方式想改变 this 的值，this 的指向始终都是函数声明时所在的作用域下

#### 2.箭头函数 不能作为构造函数实例化对象

```js
let person = (name, age) => {
	this.name = name;
	this.age = age;
};
let me = new Person("xiao0", 30);
console.log(me); // 报错
```

#### 3.不能使用 argumnets 变量

```js
let fn = () => {
	console.log(arguments);
};
fn(1, 2, 3); // 报错
```

要使用剩余参数...args

```js
const sum = (...args) => {
	let total = 0;
	args.forEach((item) => (total += item));
	return total;
};
sum(10, 20);
sum(10, 20, 30);
```

...args：剩余的参数全部给它

### 箭头函数应用场景

箭头函数适用于与 this 无关的回调：定时器、数组的方法回调

#### 定时变色案例

```js
//需求：  点击 div 2s 后颜色变成『粉色』
//获取元素
let ad = document.getElementById("ad");
//绑定事件
ad.addEventListener("click", function () {
	//保存 this 的值
	// let _this = this;
	//定时器
	setTimeout(() => {
		//修改背景颜色 this
		// console.log(this);
		// _this.style.background = 'pink';
		this.style.background = "pink";
	}, 2000);
});
```

#### 数组中返回偶数的元素案例

```js
//需求-2  从数组中返回偶数的元素
const arr = [1, 6, 9, 10, 100, 25];
// const result = arr.filter(function(item){
//     if(item % 2 === 0){
//         return true;
//     }else{
//         return false;
//     }
// });

const result = arr.filter((item) => item % 2 === 0);

console.log(result);
```

### 箭头函数面试题

1

```js
var age = 100;

var obj = {
	age: 20,
	say: () => {
		alert(this.age);
	},
};

obj.say(); //箭头函数this指向的是被声明的作用域里面，而对象没有作用域的，所以箭头函数虽然在对象中被定义，但是this指向的是全局作用域
```

## 06.函数参数默认值

1.形参初始值 具有默认值的参数, 一般位置要靠后(潜规则)

```js
function add(a, c = 10, b) {
	return a + b + c;
}
let result = add(1, 2);
console.log(result);
```

2.与解构赋值结合

```js
function connect({ host = "127.0.0.1", username, password, port }) {
	console.log(host);
	console.log(username);
	console.log(password);
	console.log(port);
}
connect({
	host: "atguigu.com",
	username: "root",
	password: "root",
	port: 3306,
});
```

## 07.rest 剩余参数

ES6 引入 rest 参数，用于获取函数的实参，用来代替 arguments

ES5 剩余参数变量 arguments

```js
function date() {
	// arguments代表剩余参数
	console.log(arguments);
}
date("阿娇", "柏芝", "思慧");
```

函数 rest 剩余参数

```js
function date(...args) {
	console.log(args);
}
date("阿娇", "柏芝", "思慧");
```

函数 rest 剩余参数 必须要放到参数最后

```js
function fn(a, b, ...args) {
	console.log(a);
	console.log(b);
	console.log(args);
}
fn(1, 2, 3, 4, 5, 6);
```

剩余参数和解构配合使用

```js
let students = ["wangwu", "zhangsan", "lisi"];
let [s1, ...s2] = students;
console.log(s1); // 'wangwu'
console.log(s2); // ['zhangsan', 'lisi']
```

## 08.spread 拓展运算符

扩展运算符（spread）也是三个点（...）。它好比 rest 参数的逆运算，将一个数组转为用逗号分隔的参数序列，对数组进行解包。

### 扩展例子

数组扩展

```js
let arr = ["a", "b", "c", "d"];
console.log(...ary);
```

数组参数扩展

```js
const arr = ["1", "2", "3"];
function chunwan() {
	console.log(arguments);
}

chunwan(...arr); // chunwan('易烊千玺','王源','王俊凯')
```

### 拓展运算符应用

#### 1.数组合并

```js
const kuaizi = ["王太利", "肖央"];
const fenghuang = ["曾毅", "玲花"];
const zuixuanxiaopingguo = kuaizi.concat(fenghuang);
const zuixuanxiaopingguo = [...kuaizi, ...fenghuang];
console.log(zuixuanxiaopingguo);
```

push 方法合并数组

```js
fenghuang.push(...kuaizi);
```

#### 2.一维数组的或对象克隆 (一层数组或对象的深拷贝)

```js
const sanzhihua = ["E", "G", "M"];
//  ['E','G','M']
const sanyecao = [...sanzhihua];
console.log(sanyecao);
```

#### 3.将伪数组转为真正的数组

```js
// 伪数组
const divs = document.querySelectorAll("div");
// 转成真数组
const divArr = [...divs];
console.log(divArr);
// arguments参数也可以转，但rest参数足以
```

使用构造函数 Array.from()方法 也能将伪数组转成真正的数组

```js
// 定义一个集合
let arrayLike = {
	0: "a",
	1: "b",
	2: "c",
	length: 3,
};
// 转成数组
let arr2 = Array.from(arrayLike);
// ['a', 'b', 'c']
```

方法还可以接受第二个参数-函数，作用类似于数组的 map 方法，用来对每个元素进行处理，将处理后的值放入返回的数组

```js
let arrayLike = {
	0: 1,
	1: 2,
	length: 2,
};
let newAry = Array.from(arrayLike, (item) => item * 2); // [2,4]
```

## 09.Symbol 类型

ES6 引入了一种新的原始数据类型 Symbol，表示独一无二的值。它是 JavaScript 语言的第七种数据类型，是一种类似于字符串的数据类型。

### Symbol 特点

- 1.Symbol 的值是唯一的，用来解决命名冲突的问题

- 2.Symbol 值不能与其他数据进行运算

- 3.Symbol 定义的对象属性不能使用 for…in 循环遍历 ，但是可以使用 Reflect.ownKeys 来获取对象的所有键名

### 使用场景

- ES5 的对象属性名都是字符串，容易造成属性名冲突

- Symbol 类型用于解决命名冲突

- 注: 遇到唯一性的场景时要想到 Symbol

### 创建方法

#### 正常创建

```js
// 创建 Symbol
let s1 = Symbol();
console.log(s1, typeof s1);
```

#### 添加标识创建

```js
//添加标识的 Symbol
let s2 = Symbol("尚硅谷");
let s2_2 = Symbol("尚硅谷");
console.log(s2 === s2_2);
```

#### 使用 Symbol for 定义

```js
// 使用 Symbol for 定义 值是相等的
let s3 = Symbol.for("尚硅谷");
let s3_2 = Symbol.for("尚硅谷");
console.log(s3 === s3_2);
```

### Symbol 类型应用

向对象中添加属性或属性方法

```js
//向对象中添加方法 up down
let game = {
	name: "俄罗斯方块",
	up: function () {},
	down: function () {},
};

//声明一个对象，添加属性
// let methods = {
//     up: Symbol(),
//     down: Symbol()
// };

// game[methods.up] = function(){
//     console.log("我可以改变形状");
// }

// game[methods.down] = function(){
//     console.log("我可以快速下降!!");
// }
// console.log(game);
//
let youxi = {
	name: "狼人杀",
	// 添加属性方法
	[Symbol("say")]: function () {
		console.log("我可以发言");
	},
	[Symbol("zibao")]: function () {
		console.log("我可以自爆");
	},
};

console.log(youxi);
```

#### 对象的属性名 可以有两种类型

- 字符串

  - let s4 = Symbol.for('哈哈哈'); let s5 = Symbol.for('哈哈哈')

- Symbol 类型

  - 独一无二，不会与其他属性名冲突

- 不能与其他数据进行运算

#### 使用注意

不能与其他数据进行运算和比较

```js
//不能与其他数据进行运算
//    let result = s + 100;
//    let result = s > 100;
//    let result = s + s;
```

### Symbol 内置值

除了定义自己使用的 Symbol 值以外，ES6 还提供了 11 个内置的 Symbol 值，指向语言内部使用的方法。可以称这些方法为魔术方法，因为它们会在特定的场 景下自动执行。

文档：<https://www.cnblogs.com/zygll/p/14262826.html>

#### 内置值

- Symbol.hasInstance

  - 当其他对象使用 instanceof 运算符，判断是否为该对象的实例时，会调用这个方法

- Symbol.isConcatSpreadable

  - 对象的 Symbol.isConcatSpreadable 属性等于的是一个布尔值，表示该对象用于 Array.prototype.concat()时，是否可以展开。

- Symbol.species

  - 创建衍生对象时，会使用该属性

- Symbol.match

  - 当执行 str.match(myObject) 时，如果该属性存在，会调用它，返回该方法的返回值。

- Symbol.replace

  - 当该对象被 str.replace(myObject)方法调用时，会返回该方法的返回值。

- Symbol.search

  - 当该对象被 str. search (myObject)方法调用时，会返回该方法的返回值。

- Symbol.split

  - 当该对象被 str. split (myObject)方法调用时，会返回该方法的返回值。

- Symbol.iterator

  - 对象进行 for…of 循环时，会调用 Symbol.iterator 方法，返回该对象的默认遍历器

- Symbol.toPrimitive

  - 该对象被转为原始类型的值时，会调用这个方法，返回该对象对应的原始类型值。

- Symbol.toStringTag

  - 在该对象上面调用 toString 方法时，返回该方法的返回值

- Symbol.unscopables
  - 该对象指定了使用 with 关键字时，哪些属性会被 with 环境排除。

#### 使用例子

```js
class Person {
	static [Symbol.hasInstance](param) {
		console.log(param);
		console.log("我被用来检测类型了");
		return false;
	}
}

let o = {};

console.log(o instanceof Person);

const arr = [1, 2, 3];
const arr2 = [4, 5, 6];
arr2[Symbol.isConcatSpreadable] = false;
console.log(arr.concat(arr2));
```

## 10.内置对象方法扩展

### 数组方法的扩展

```js
ary1 = [1, 2, 3];
ary2 = [4, 5, 6];
let ary3 = [...ary1, ...ary2];
```

- ...ary1

  - 拆分成 1,2,3

- 分解后再合并成一个数组 arry3

将伪数组转成真数组

```js
// 将伪数组转成真数组
Array.from(伪数组名, 函数);
```

零散的数统一转成数组

```js
// 零散的数统一转成数组
Array.of(1, 2, 3);
```

找出第一个符合条件的数组成员，如果没有找到返回 undefined

```js
Array.find(查找条件); // 查找条件可以是函数，或者其他
```

找出第一个符合条件的数组成员的位置，如果没有找到返回-1

```js
Array.findIndex(value, index);
```

某个数组是否包含给定的 1 值，返回布尔值

参数

- 可以是字符串

- 可以是数字

- 可以是其他

```js
Array.includes(1);
```

复制宽度

```js
Array.copywithin(3, 7, 9);

var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
Array.copywithin(3, 7, 9);
alert(arr); // 1,2,3,8,9,6,7,8
```

- 第一个参数

  - 从哪个下标开始

- 第二和第三个参数
  - 范围[start,end]

### 数值方法的扩展

#### 0.Number.EPSILON

是 JavaScript 表示的最小精度

```js
// EPSILON 属性的值接近于 2.2204460492503130808472633361816E-16
function equal(a, b) {
	if (Math.abs(a - b) < Number.EPSILON) {
		return true;
	} else {
		return false;
	}
}
// 浮点数运算和对比
console.log(0.1 + 0.2 === 0.3);
console.log(equal(0.1 + 0.2, 0.3));
```

#### 1.二进制和八进制的表示方式

```js
let b = 0b1010;
let o = 0o777;
let d = 100;
let x = 0xff;
console.log(x);
```

#### 2.Number.isFinite

检测一个数值是否为有限数，返回布尔值

```js
console.log(Number.isFinite(100));
console.log(Number.isFinite(100 / 0));
console.log(Number.isFinite(Infinity));
```

#### 3.Number.isNaN

检测一个数值是否为 NaN ，返回布尔值

```js
console.log(Number.isNaN(123));
```

#### 4.Number.parseInt | Number.parseFloat

字符串转整数

```js
console.log(Number.parseInt("5211314love"));

console.log(Number.parseFloat("3.1415926神奇"));
```

#### 5.Number.isInteger

判断一个数是否为整数

```js
console.log(Number.isInteger(5));
console.log(Number.isInteger(2.5));
```

#### 6.Math.trunc

将数字的小数部分抹掉

```js
console.log(Math.trunc(3.5));
```

#### 7.Math.sign

判断一个数到底为正数 负数 还是零

```js
console.log(Math.sign(100));
console.log(Math.sign(0));
console.log(Math.sign(-20000));
```

### 字符串方法的扩展

#### 模板字符串

ES6 新增的创建字符串的方式，使用反引号定义

##### 1.基本定义

```js
let name = `zhangsan`;
```

##### 2.模板字符串中可以解析变量

```js
let name = "张三";
let sayHello = `hello,my name is ${name}`;
console.log(sayHello);
```

##### 3.模板字符串中可以换行

```js
let result = {
	name: "zhangsan",
	age: 20,
	sex: "男",
};
let html = ` 
     ${result.name}
     ${result.age}
     ${result.sex}
  `;
```

##### 4.在模板字符串中可以调用函数

```js
const sayHello = function () {
	return "哈哈 追不到我吧";
};
let greet = `${sayHello()} 啦啦啦`;
console.log(greet); // 哈哈 追不到我吧啦啦啦
```

#### startsWith() 和 endsWith()

```js
let str = "Hello world!";
str.startsWith("Hello"); // true
str.endsWith("!"); // true
```

- startsWith()

  - 表示参数字符串是否在原字符串的头部，返回布尔值

- endsWith()
  - 表示参数字符串是否在原字符串的尾部，返回布尔值

#### str.repeat()

将原字符串重复 n 次，返回一个新字符串

```js
"x".repeat(3); // "xxx"
"hello".repeat(2); // "hellohello"
```

### 对象方法的扩展

#### Object.is(obj1,obj2)

判断两个值是否完全相等，返回布尔值

```js
console.log(Object.is(NaN, NaN)); // true为真，是相等的
console.log(NaN === NaN); // false 为假，不相等
```

#### Object.assign(obj1,obj2,obj3)

多个对象合并到 第一个对象 里面去：适合用于 配置的合并

```js
// 配置项的合并例子
const config1 = {
	host: "localhost",
	port: 3306,
	name: "root",
	pass: "root",
	test: "test",
};
const config2 = {
	host: "http://atguigu.com",
	port: 33060,
	name: "atguigu.com",
	pass: "iloveyou",
	test2: "test2",
};
console.log(Object.assign(config1, config2));
```

#### Object.setPrototypeOf() Object.getPrototypeOf()

获取和设置原型对象

```js
// 获取和设置原型对象
const school = {
	name: "尚硅谷",
};
const cities = {
	xiaoqu: ["北京", "上海", "深圳"],
};
Object.setPrototypeOf(school, cities);
console.log(Object.getPrototypeOf(school));
console.log(school);
```

#### 延展操作符

- 去除重复数据

### 数据集合方法

#### 1.数据集合-new Set()

##### new Set()方法简介

ES6 提供了新的数据结构 Set（集合）。 它类似于数组，但成员的值都是唯一的，集合实现了 iterator 接口，所以可以使用『扩展运算符』和『for…of…』进行遍历

```js
let se = new Set(["大事", "好事", "小事", "坏事"]);
for (let v of se) {
	console.log(v);
}
```

##### new Set()方法概况

###### 1.特点

- 01.类似于数组，没有重复的元素(唯一的)

- 02.开发中用于去除重复数据

- 03.key 和 value 都是相等的

###### 2.四个方法

- 构造函数创建：`const set = new Set();`

- add(value)

  - set.add('张三');

  - 添加某个值，返回 Set 结构本身

- delete(value)

  - set.delete('张三');

  - 删除某个值，返回一个布尔值，表示删除是否成功

- has(value)

  - set.has('张三');

  - 返回一个布尔值，表示该值是否为 Set 的成员

- clear()

  - set.clear();

  - 清除所有成员，没有返回值

###### 3.一个属性

- set.size
  - 获取过滤重复值后的数组长度

###### 从数据结构中取值遍历

Set 结构的实例与数组一样，拥有 forEach 方法，用于对每个成员执行某种操作，没有返回值

相当于：

```js
const set = new Set(['a','b','c','d']) set.forEach(value => console.log(value))
```

##### new Set()方法的使用

const newSet = new Set();

- Set 本身是一个构造函数，用来生成 Set 数据结构

```js
// Set函数可以接受一个数组作为参数， 用来初始化。
const set = new Set([1, 2, 3, 4, 4]);
console.log(set);
// 值转为{1, 2, 3, 4} , 去除了重复的数据 4
```

new Set()方法可以做数组去重：常用于用户搜索记录功能

##### new Set()方法应用

###### 数组去重

```js
let arr = [1, 2, 3, 4, 5, 4, 3, 2, 1];
let result = [...new Set(arr)];
console.log(result);
```

###### 交集

- 数组

  - ```js
    let arr = [1, 2, 3, 4, 5, 4, 3, 2, 1];
    let arr2 = [4, 5, 6, 5, 6];
    ```

- 全部

  - ```js
    let result = [...new Set(arr)].filter((item) => {
    	let s2 = new Set(arr2); // 4 5 6
    	if (s2.has(item)) {
    		return true;
    	} else {
    		return false;
    	}
    });
    ```

- 简化

  - ```js
    let result = [...new Set(arr)].filter((item) => new Set(arr2).has(item));
    console.log(result);
    ```

###### 并集

数组

```js
let arr = [1, 2, 3, 4, 5, 4, 3, 2, 1];
let arr2 = [4, 5, 6, 5, 6];

let union = [...new Set([...arr, ...arr2])];
console.log(union);
```

###### 差集

数组

```js
let arr = [1, 2, 3, 4, 5, 4, 3, 2, 1];
let arr2 = [4, 5, 6, 5, 6];

let diff = [...new Set(arr)].filter((item) => !new Set(arr2).has(item));
console.log(diff);
```

#### 2.数据集合-new Map()

##### new Map()方法简介

- ES6 提供了 Map 数据结构。它类似于对象，也是键值对的集合。

- 但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。

- Map 也实现了 iterator 接口，所以可以使用『扩展运算符』和『for…of…』进行遍历

##### new Map()方法概况

- 1.特点

  - 01.类似于对象，本质上是键值对的集合

    - Object 解构提供了"字符串-值"的对应。Map 结构提供了"值-值"的对应， 是一种 的 Hash 结构的实现

  - 2.

- 2.属性

  - map.size
    - 长度

- 3.常用方法

  - 1.set 和 get：设置和获取

    - map.set(age,['gg','ll']).set(['dog'],'ggg')

    - map.get(age)

  - 2.delete

    - map.delete(obj);

  - 3.has

    - map.has(obj);

  - 4.clear

    - map.clear();

  - 5.keys(), values(), entries()

    - map.keys();

    - map.values();

    - map.entries();

- 4.遍历
  - map.forEach();

##### new Map()方法的使用

1

```js
//创建一个空 map
let m = new Map();
//创建一个非空 map
let m2 = new Map([
	["name", "尚硅谷"],
	["slogon", "不断提高行业标准"],
]);
//属性和方法
//获取映射元素的个数
console.log(m2.size);
//添加映射值
console.log(m2.set("age", 6));
//获取映射值
console.log(m2.get("age"));
//检测是否有该映射
console.log(m2.has("age"));
//清除
console.log(m2.clear());
//遍历
for (let v of m) {
	console.log(v);
}
```

2

```js
// 声明 Map
let m = new Map();

// 添加元素
m.set("name", "尚硅谷");
m.set("change", function () {
	console.log("我们可以改变你!!");
});
let key = {
	school: "ATGUIGU",
};
m.set(key, ["北京", "上海", "深圳"]);

//size
// console.log(m.size);

//删除
// m.delete('name');

//获取
// console.log(m.get('change'));
// console.log(m.get(key));

//清空
// m.clear();

//遍历
for (let v of m) {
	console.log(v);
}

// console.log(m);
```

##### new Map()方法应用

## 11.迭代器和生成器

### 迭代器(Iterator)

#### 迭代器简介

- ES6 创造了一种新的遍历命令 for...of 循环，Iterator 接口主要供 for...of 消费

- 迭代器也称遍历器（Iterator）就是一种机制。

- 它是一种接口，为各种不同的数据结构提供统一的访问机制。

- 任何数据结构只要部署 Iterator 接口，就可以完成遍历操作。使得集合的操作变得更容易

#### 两个核心

- 1）迭代器能快捷的访问数据，通过 Symbol.iterator 创建迭代器，通过迭代器的 next()方法获取结果

- 2）迭代器是用于遍历数据结构的指针（数据库的游标）

#### 原生具备 iterator 接口的数据 (可用 for of 遍历)

- a) Array

- b) Arguments

- c) Set

- d) Map

- e) String

- f) TypedArray

- g) NodeList

#### 工作原理和例子

迭代器是一种特殊对象，他具有一些专门为迭代过程设计的专有接口，所有的迭代器对象都有一个 next()方法，每次调用都返回一个结果对象。

##### 结果对象有两个属性

- 一个是 value，表示下一个将要返回的值；

- 另一个是 done，他是一个布尔类型的值，在当没有可返回的数据时返回 true，预示着迭代结束

##### 使用步骤

- a) 创建一个指针对象，指向当前数据结构的起始位置

- b) 第一次调用对象的 next 方法，指针自动指向数据结构的第一个成员

- c) 接下来不断调用 next 方法，指针一直往后移动，直到指向最后一个成员

- d) 每调用 next 方法返回一个包含 value 和 done 属性的对象

##### 代码例子

```js
//声明一个数组
const xiyou = ["唐僧", "孙悟空", "猪八戒", "沙僧"];

//使用 for...of 遍历数组
// for(let v of xiyou){
//     console.log(v);
// }

let iterator = xiyou[Symbol.iterator]();

//调用对象的next方法
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
```

2

```js
let arr = [1, 2, 3];
console.log(arr);
//输出arr 打开arr的原型 会发现上面有Symbol方法
//通过Symbol.iterator创建迭代器
const iter = arr[Symbol.iterator]();
console.log(iter); //done为是否迭代完成，false是未完成，true为迭代完成
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());
```

注: 需要自定义遍历数据的时候，想到使用迭代器。

###### 自定义遍历数据例子

```js
//声明一个对象
const banji = {
	name: "终极一班",
	stus: ["xiaoming", "xiaoning", "xiaotian", "knight"],
	[Symbol.iterator]() {
		//索引变量
		let index = 0;
		//
		let _this = this;
		return {
			next: function () {
				if (index < _this.stus.length) {
					const result = { value: _this.stus[index], done: false };
					//下标自增
					index++;
					//返回结果
					return result;
				} else {
					return { value: undefined, done: true };
				}
			},
		};
	},
};

//遍历这个对象
for (let v of banji) {
	console.log(v);
}
```

#### ES5 语法构建迭代器

```js
function createIterator() {
	var i = 0;
	return {
		next: function () {
			var done = i >= items.length;
			var value = !done ? items[i++] : undefined;
			return {
				done: done,
				value: value,
			};
		},
	};
}

var iterator = createInterator([1, 2, 3]);
console.log(iterator.next()); // "{value:1,done:false}"
console.log(iterator.next()); // "{value:2,done:false}"
console.log(iterator.next()); // "{value:3,done:false}"
console.log(iterator.next()); // "{value:undefined,done:true}"
// 当调用次数超过实际值后，不管再调用多少次结果都会是如下值
console.log(iterator.next()); // "{value:undefined,done:true}"
```

createIterator()方法会返回一个对象，该对象拥有一个 next()方法，每次调用 next()方法，都会判断 i 是否大于等于 当前实参的长度；大于或等于时 done 即为 true,反之亦然。然后将 done 取反；当 done 为 true 时 value 赋值为 undefined；否则将 i+1,再取 item 对应下标的值赋值于 value。ES6 迭代器实现原理和案例也就类似。

> 迭代器一般需要配合生成器使用

### 生成器(Generator)

#### 生成器(Generator)简介

生成器函数是 ES6 提供的一种异步编程解决方案

#### 简单代码例子和说明

##### 简单代码例子

```js
function* gen() {
	yield "一只没有耳朵";
	yield "一只没有尾巴";
	return "真奇怪";
}
let iterator = gen();
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
```

##### 代码说明

- 1.表示该函数是一个生成器， \* 的位置没有限制

  - 星号可以紧挨着 function,也可以在中间添加一个空格。

- 2.生成器函数返回的结果是迭代器对象，调用迭代器对象的 next 方法可以得到 yield 语句后的值

- 3.yield 相当于函数的暂停标记，也可以认为是函数的分隔符，每调用一次 next 方法，执行一段代码

- 4.next 方法可以传递实参，作为 yield 语句的返回值

generator 函数 可以通过 yield 关键字 将函数挂起，为改变执行流提供了可能，同时为了做异步编程提供了方案。

#### 生成器函数参数

```js
function* gen(arg) {
	console.log(arg);
	let one = yield 111;
	console.log(one);
	let two = yield 222;
	console.log(two);
	let three = yield 333;
	console.log(three);
}

//执行获取迭代器对象
let iterator = gen("AAA");
console.log(iterator.next());
//next方法可以传入实参：调用都是下一个的返回结果
console.log(iterator.next("BBB"));
console.log(iterator.next("CCC"));
console.log(iterator.next("DDD"));
```

#### 生成器函数实例

##### 异步编程实例：文件操作/网络操作(ajax, request)/数据库操作

```js
// 异步编程  文件操作 网络操作(ajax, request) 数据库操作
// 1s 后控制台输出 111  2s后输出 222  3s后输出 333
// 回调地狱
// setTimeout(() => {
//     console.log(111);
//     setTimeout(() => {
//         console.log(222);
//         setTimeout(() => {
//             console.log(333);
//         }, 3000);
//     }, 2000);
// }, 1000);

function one() {
	setTimeout(() => {
		console.log(111);
		iterator.next();
	}, 1000);
}

function two() {
	setTimeout(() => {
		console.log(222);
		iterator.next();
	}, 2000);
}

function three() {
	setTimeout(() => {
		console.log(333);
		iterator.next();
	}, 3000);
}

function* gen() {
	yield one();
	yield two();
	yield three();
}

//调用生成器函数
let iterator = gen();
iterator.next();
```

##### 模拟获取数据实例： 用户数据 /订单数据 /商品数据

```js
//模拟获取  用户数据  订单数据  商品数据
function getUsers() {
	setTimeout(() => {
		let data = "用户数据";
		//调用 next 方法, 并且将数据传入
		iterator.next(data);
	}, 1000);
}

function getOrders() {
	setTimeout(() => {
		let data = "订单数据";
		iterator.next(data);
	}, 1000);
}

function getGoods() {
	setTimeout(() => {
		let data = "商品数据";
		iterator.next(data);
	}, 1000);
}
// 生成器
function* gen() {
	let users = yield getUsers();
	let orders = yield getOrders();
	let goods = yield getGoods();
}

//调用生成器函数
let iterator = gen();
iterator.next();
```

### 高效处理数据的关键

迭代器，数组方法，新增的集合类型（set，map）结合使用

## 12.class 类的基本运用

### 方法字段说明

- 1.class 声明类

- 2.constructor 定义构造函数初始化

- 3.extends 继承父类

- 4.super 调用父级构造方法

- 5.static 定义静态方法和属性

- 6.父类方法可以重写

  - 子类对父类的方法 ：子类声明和父类相同的命名的方法 ，用来 对父类方法的重写

- 7.get 和 set

  - ```js
    get price(){
      console.log("价格被读取了")
      return '价格呢？'
    }
    ```

  - ```js
    set price(newVal){
      console.log("价格该修改了")
    }
    ```

### class 类的使用

#### 简介

##### 面向对象介绍

- 面向对象把事务分解成一个个对象，然后由对象之间分工与合作

##### 面向对象优点

- 代码灵活、可复用、容易维护和开发，适合多人合作的大型软件项目

##### 面向对象特性

- 封装性

  - 我们平时所用的方法和类都是一种封装，当我们在项目开发中，遇到一段功能的代码在好多地方重复使用的时候，我们可以把他单独封装成一个功能的方法，这样在我们需要使用的地方直接调用就可以了。

  - 封装的优势在于定义只可以在类内部进行对属性的操作，外部无法对这些属性指手画脚，要想修改，也只能通过你定义的封装方法；

- 继承性

  - 继承在我们的项目开发中主要使用为子类继承父类

  - 继承减少了代码的冗余，省略了很多重复代码，开发者可以从父类底层定义所有子类必须有的属性和方法，以达到耦合的目的；

  - 特别提醒：继承会继承父类的实例属性和实例方法，并不会继承静态属性和静态方法，并且静态方法只能通过类名去调用。

- 多态性

  - 多态的具体表现为方法重载和方法重写：

  - 方法重载：重载是指不同的函数使用相同的函数名，但是函数的参数个数或类型不同。调用的时候根据函数的参数来区别不同的函数

  - 方法重写：重写（也叫覆盖）是指在派生类中重新对基类中的虚函数（注意是虚函数）重新实现。即函数名和参数都一样，只是函数的实现体不一样

  - 多态实现了方法的个性化，不同的子类根据具体状况可以实现不同的方法，光有父类定义的方法不够灵活，遇见特殊状况就捉襟见肘了

##### 面向对象和面向过程概念总结比较

总结

- 面向过程就是分析出解决问题所需要的步骤，然后用函数把这些步骤一步一步实现，使用的时候再一个一个的依次调用就可以了。

- 面向对象是把事务分解成为一个个对象，然后由对象之间分工与合作。

比较

- 面向过程性能比面向对象高，适合跟硬件联系很紧密的东西,但是不易维护、不易复用、不易扩展。

- 面向对象易维护、易复用、易扩展，由于面向对象有封装、继承、多态性的特性，可以设计出低耦合的系统，使系统 更加灵活、更加易于维护，但是性能比面向过程低。

#### 类和对象

##### 对象

- 在 JavaScript 中，对象是一组无序的相关属性的方法的集合，所有的事物都是对象

  - 例如：字符串、数组、函数、数值

- 对象是由属性和方法组成

  - 属性

    - 事物的特征，在对象中用属性来表示

  - 方法
    - 事物的行为，在对象中用方法来表示

##### 类 class

ES6 中增加了类的概念，可以使用 class 关键字声明一个类，之后以这个类实例化对象

类抽象了对象的公共部分，它泛指某一大类（class）对象特指某一个，通过类实例化一个具体的对象

###### 类的实例化

```js
class Name {
	constructor(uname) {
		this.uname;
	}
	sing() {
		console.log(this.uname);
	}
}
// 实例化
var zs = new Name("张三");
// 调用方法
zs.sing();
```

###### 类的继承

```js
class Father {
	constructor(uname) {
		this.uname;
	}
	say() {
		return "111";
	}
}

// 继承
class Son extends Father {
	constructor(x) {
		super(x);
	}
	say() {
		super.say();
	}
}
```

- super(x)

  - 先调用父类的构造函数

  - 子类调用必须写在子类 this 之前调用

  - 然后才可以调用父类的方法

  - super.say()
    - 调用父类的普通函数

- 继承中的属性或者方法查找原则

  - 就近原则

  - 1.继承中，如果实例化子类输出一个方法，先看子类有没有这个方法，如果有就先执行子类

  - 2.继承中，如果子类里面没有，就去查找父类有没有这个方法，如果有，就执行父类的这个方法(就近原则)

###### 注意

- 1.在 ES6 中类没有变量提升，所以必须先定义类，才能通过实例化对象

- 2.公有的属性和方法调用要在构造函数里加 this.

- 3.类里面的 this 指向问题

- 4.constructor 里面的 this 指向实例化对象， 方法里面的 this 指向这个方法的调用者

#### 类的使用

##### 基本使用

```js
class Name {
	// 在类中使用constructor来放置属性
	construtor(name, age) {
		this.name = name;
		this.age = age;
	}
	// 在类中添加方法
	sing(song) {
		console.log(this.name + song);
	}
}
// 实例化类对象
let zs = new Name("张三", 18);
// 实例化后调用类的方法
zs.sing("我爱你你却爱着他");
```

##### 类的继承 2

子类继承父类基本示例：extends 关键字可以实现子类继承父类

```js
class Father {
	constructor() {}
	money() {
		console.log("钱钱钱");
	}
}
class Son extends Father {}
let son = new Son();
son.money();
```

super 关键字的使用

super 关键字 用于访问和调用对象父类上的函数 可以调用父类的构造函数，也可以调用父类的普通函数

```js
class Father {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
	sum() {
		console.log(this.x + this.y);
	}
	say() {
		return "我是父类";
	}
}
class Son extends Father {
	constructor(x, y) {
		// 调用了父类中的构造函数
		super(x, y);
	}
	say() {
		// super.say()调用了父类的say方法
		console.log(super.say() + "的子类");
	}
}
let son = new Son(1, 2);
son.sum();
son.say();
```

子类继承父类方法同时扩展方法

```js
class Father {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
	sum() {
		console.log(this.x + this.y);
	}
}
class Son extends Father {
	constructor(x, y) {
		// 利用super调用父类的构造函数
		// 必须写在子类this之前调用操作
		super(x, y);

		this.x = x;
		this.y = y;
	}

	substrcact(x, y) {
		console.log(this.x + this.y);
	}
}
let son = new Son(5, 2);
son.substrcact();
son.sum();
```

#### 类和对象的三个注意点

- 1.在 ES6 中类没有变量提升，必须先定义类，才能通过类实例化对象

- 2.类里面共有的属性和方法一定要加 this 调用

- 3.类里面的 this 指向问题

this 指向示例说明

```js
class Star {
	constructor(name, age) {
		const that = this;
		// constructor里面的this指向的是 创建的实例对象
		this.name = name;
		this.age = age;
		this.btn = document.querySelector("button");
		this.btn.onclick = this.sing;
	}
	sing() {
		// 这个方法的this 指向的是 btn 这个按钮
		// 因为这个按钮调用了这个函数
		console.log(this);
		// that是constructor的this是要打印出名字
		console.log(that.name);
	}
	dance() {
		// 这个方法里面的this指向的是实例对象 ldh
		console.log(this);
	}
}
let ldh = new Star("刘德华");
```

- 面向对象案例
  - tab 栏切换

## 13.新增 API：Proxy 与 Reflect

Proxy

Reflect

## 15.Promise

Promise 是 ES6 引入的异步编程的新解决方案

- 语法上 Promise 是一个构造函数，用来封装异步操作并可以获取其成功或失败的结果。

### 语法

- const promiseObj = new Promise((resolve, reject) => {})

  - 实例化 Promise 对象

- promiseObj.then() 方法

- promiseObj.catch() 方法

- Promise (excutor) {}
  - Promise 构造函数:

### 基本使用语法

```js
//实例化 Promise 对象
const p = new Promise(function (resolve, reject) {
	setTimeout(function () {
		//
		// let data = '数据库中的用户数据';
		// resolve
		// resolve(data);

		let err = "数据读取失败";
		reject(err);
	}, 1000);
});

// 调用 promise 对象的 then 方法
p.then(
	function (value) {
		console.log(value);
	},
	function (reason) {
		console.error(reason);
	}
);
```

### 应用实例

#### Promise 封装读取文件

```js
//1. 引入 fs 模块
const fs = require("fs");

//2. 调用方法读取文件
// fs.readFile('./resources/为学.md', (err, data)=>{
//     //如果失败, 则抛出错误
//     if(err) throw err;
//     //如果没有出错, 则输出内容
//     console.log(data.toString());
// });

//3. 使用 Promise 封装 读取多个文件时使用
const p = new Promise(function (resolve, reject) {
	fs.readFile("./resources/为学.mda", (err, data) => {
		//判断如果失败
		if (err) reject(err);
		//如果成功
		resolve(data);
	});
});

p.then(
	function (value) {
		console.log(value.toString());
	},
	function (reason) {
		console.log("读取失败!!");
	}
);
```

#### Promise 封装 AJAX

```js
// 接口地址: https://api.apiopen.top/getJoke
const p = new Promise((resolve, reject) => {
	//1. 创建对象
	const xhr = new XMLHttpRequest();

	//2. 初始化
	xhr.open("GET", "https://api.apiopen.top/getJ");

	//3. 发送
	xhr.send();

	//4. 绑定事件, 处理响应结果
	xhr.onreadystatechange = function () {
		//判断
		if (xhr.readyState === 4) {
			//判断响应状态码 200-299
			if (xhr.status >= 200 && xhr.status < 300) {
				//表示成功
				resolve(xhr.response);
			} else {
				//如果失败
				reject(xhr.status);
			}
		}
	};
});

//指定回调
p.then(
	function (value) {
		console.log(value);
	},
	function (reason) {
		console.error(reason);
	}
);
```

#### Promise-then 方法 (成功和失败的回调)

```js
//创建 promise 对象
const p = new Promise((resolve, reject) => {
	setTimeout(() => {
		resolve("用户数据");
		// reject('出错啦');
	}, 1000);
});

//调用 then 方法  then方法的返回结果是 Promise 对象, 对象状态由回调函数的执行结果决定
//1. 如果回调函数中返回的结果是 非 promise 类型的属性, 状态为成功, 返回值为对象的成功的值

// const result = p.then(value => {
//     console.log(value);
//     //1. 非 promise 类型的属性
//     // return 'iloveyou';
//     //2. 是 promise 对象
//     // return new Promise((resolve, reject)=>{
//     //     // resolve('ok');
//     //     reject('error');
//     // });
//     //3. 抛出错误
//     // throw new Error('出错啦!');
//     throw '出错啦!';
// }, reason=>{
//     console.warn(reason);
// });

//链式调用
p.then((value) => {}).then((value) => {});
```

#### Promise-catch 方法 (不指定参数：失败的回调)

```js
const p = new Promise((resolve, reject) => {
	setTimeout(() => {
		//设置 p 对象的状态为失败, 并设置失败的值
		reject("出错啦!");
	}, 1000);
});

// p.then(function(value){}, function(reason){
//     console.error(reason);
// });

p.catch(function (reason) {
	console.warn(reason);
});
```

#### Promise 连续读取文件 (回调地狱演示)

```js
/* 连续读取多个文件：回调地狱演示 */
//引入 fs 模块
const fs = require("fs");

// fs.readFile('./resources/为学.md', (err, data1)=>{
//     fs.readFile('./resources/插秧诗.md', (err, data2)=>{
//         fs.readFile('./resources/观书有感.md', (err, data3)=>{
//             let result = data1 + '\r\n' +data2  +'\r\n'+ data3;
//             console.log(result);
//         });
//     });
// });

//使用 promise 实现
const p = new Promise((resolve, reject) => {
	fs.readFile("./resources/为学.md", (err, data) => {
		resolve(data);
	});
});

p.then((value) => {
	return new Promise((resolve, reject) => {
		fs.readFile("./resources/插秧诗.md", (err, data) => {
			resolve([value, data]);
		});
	});
})
	.then((value) => {
		return new Promise((resolve, reject) => {
			fs.readFile("./resources/观书有感.md", (err, data) => {
				//压入
				value.push(data);
				resolve(value);
			});
		});
	})
	.then((value) => {
		console.log(value.join("\r\n"));
	});
```

## 16.ES6 模块化

### 概念

模块化是指将一个大的程序文件，拆分成许多小的文件，然后将小文件组合起来。

### 模块化的好处

- 1.防止命名冲突

- 2.代码复用

- 3.高维护性

### ES6 之前的模块化规范

- 1.CommonJS => NodeJS、Browserify

- 2.AMD => requireJS

- 3.CMD => seaJS

### ES6 模块化语法

export 暴露数据语法

- export

  - 用于规定模块的对外接口

  1.分别暴露

```js
export function test() {
	console.log("哈哈哈");
}
```

2.统一暴露

```js
function test() {
	console.log("哈哈哈");
}
function test2() {
	console.log("呵呵呵");
}
export { test, test2 };
```

3.默认暴露

```js
export default {
	school: "蓝翔挖掘机学校",
	chang: function () {
		console.log("来了啊");
	},
};
```

### import 引入模块

- import
  - 用于输入其他模块提供的功能

#### 1.通用导入模块方法

```js
import * as mi from ‘./src/js/m1.js’

mi.test()
```

#### 2.解构赋值形式

基本使用

```js
import { test,test2 } from ‘./src/js/m1.js’
test()
```

命名冲突使用别名

```js
import { test as test111,test2 } from ‘./src/js/m1.js’
```

默认暴露方法 的 导入

```js
import { default as m3} from ‘./src/js/m1.js’
```

简便形式：默认暴露才能使用这个形式

```js
import  m3 from ‘./src/js/m1.js’
m3.chang()
```

#### 3.script 标签形式引入

```js

```

#### 应用 babel 代码转换

- npm install 安装工具

  - babel-cli

  - babel-preset-env

  - browserify(webpack)

- 命令转换和打包(转成 ES5 语法)

引入 npm 包

```js
import $ from ‘jquery’;

$(''body).css('background','pink')
```
