# ECMAScript-11(ES2020)

## 提案



## ES2020(ES11)新增了如下新特性 👇

- 空值合并运算符（Nullish coalescing Operator）
- 可选链 Optional chaining
- globalThis
- BigInt
- `String.prototype.matchAll()`
- `Promise.allSettled()`
- Dynamic import（按需 import）

## class 新增

类的静态字段：static.c = 10

```js

```

类的私有(变量)属性：#属性名;

```js
class Person {
	//公有属性
	name;
	//私有属性
	#age;
	#weight;
	//构造方法
	constructor(name, age, weight) {
		this.name = name;
		this.#age = age;
		this.#weight = weight;
	}

	intro() {
		console.log(this.name);
		console.log(this.#age);
		console.log(this.#weight);
	}
}

//实例化
const girl = new Person("晓红", 18, "45kg");
// 报错
// console.log(girl.name);
// console.log(girl.#age);
// console.log(girl.#weight);

girl.intro();
```

## Promise.allSettled (成功和失败的请求都返回)

类方法，返回一个在所有给定的 promise 都已经 fulfilled 或 rejected 后的 promise，并带有一个对象数组，每个对象表示对应的 promise 结果。

```js
Promise.allSettled([
	Promise.resolve(33),
	new Promise((resolve) => setTimeout(() => resolve(66), 0)),
	99,
	Promise.reject(new Error("an error")),
]).then((values) => console.log(values));

// [
//   { status: 'fulfilled', value: 33 },
//   { status: 'fulfilled', value: 66 },
//   { status: 'fulfilled', value: 99 },
//   { status: 'rejected', reason: Error: an error }
// ]

// 声明两个promise对象
const p1 = new Promise((resolve, reject) => {
	setTimeout(() => {
		resolve("商品数据 - 1");
	}, 1000);
});

const p2 = new Promise((resolve, reject) => {
	setTimeout(() => {
		resolve("商品数据 - 2");
		// reject('出错啦!');
	}, 1000);
});

// 调用 allsettled 方法 ：成功和失败的请求都返回，包括是否成功和状态消息
const result = Promise.allSettled([p1, p2]);
console.log(result);
// 相像的方法: 都成功或都失败才会输出，相当于&&
// const res = Promise.all([p1, p2]);
// console.log(res);
```

## String.matchAll (正则批量匹配)

例子

```js
let str = `
    
        肖生克的救赎
        上映日期: 1994-09-10
    
    
        阿甘正传
        上映日期: 1994-07-06
    
`;

//声明正则
const reg = /.*?(.*?)<\/a>.*?(.*?)<\/p>/gs;

//调用方法：批量匹配，返回可迭代对象
const result = str.matchAll(reg);
// for...of或者...扩展运算符：用于遍历和展开数据
// 二选一的方法：
// for(let v of result){
//     console.log(v);
// }
const arr = [...result];

console.log(arr);
```

返回一个包含所有匹配正则表达式的结果及分组捕获组的迭代器。

```js
const regexp = /t(e)(st(\d?))/g;
const str = "test1test2";

const array = [...str.matchAll(regexp)];
console.log(array[0]); // ["test1", "e", "st1", "1"]
console.log(array[1]); // ["test2", "e", "st2", "2"]
```

页面爬虫推荐使用

## ?. 可选链操作符

**介绍：** **可选链操作符**（`?.`）允许读取位于连接对象链深处的属性的值，而不必明确验证链中的每个引用都是否有效。`?.` 操作符的功能类似于`.`链式操作符，不同之处在于，在引用为 `null` 或 `undefined` 时不会报错，该链路表达式返回值为 `undefined`。

**以前的写法：**

```js
const street = user && user.address && user.address.street;
const num =
	user && user.address && user.address.getNum && user.address.getNum();
console.log(street, num);
```

**ES11 的写法：**

```js
const street2 = user?.address?.street;
const num2 = user?.address?.getNum?.();
console.log(street2, num2);
```

**⚠️ 注意：**

可选链不能用于赋值：

```js
let object = {};
object?.property = 1; // Uncaught SyntaxError: Invalid left-hand side in assignment
```

代码例子

```js
// ?.
function main(config) {
	// const dbHost = config && config.db && config.db.host;
	const dbHost = config?.db?.host;

	console.log(dbHost);
}

main({
	db: {
		host: "192.168.1.100",
		username: "root",
	},
	cache: {
		host: "192.168.1.200",
		username: "admin",
	},
});
```

## ?? 空值运算符

需求，只有在 a 未定义 undefined 时才选“helloworld”

**空值合并操作符**（`??`）是一个逻辑操作符，当左边的操作数为 `null` 或 `undefined` 的时候，返回其右侧操作符，否则返回左侧操作符。

### 逻辑或操作符（`||`）

**逻辑或操作符**（`||`），会在左侧操作数为假值时返回右侧操作数，也就是说如果使用 `||` 来为某些变量设置默认值，可能会出现意料之外的情况。比如 0、''、NaN、false：

```js
0 || 1; // 1
0 ?? 1; // 0

"" || "bar"; // 'bar'
"" ?? "bar"; // ''

NaN || 1; // 1
NaN ?? 1; // NaN

false || "bar"; // 'bar'
false ?? "bar"; // false
```

2

```js
function foo(a) {
	a = a || "hello world";
	console.log(a);
}
foo(123);
foo(0);
foo("");
foo(false);
```

如果值为 0/空字符串/false/undefined/null 输出的一样的 hello world

#### 注意

不可以将 `??` 与 AND（`&&`）OR（`||`）一起使用，会报错。

```js
null || undefined ?? "foo"; // 抛出 SyntaxError
true || undefined ?? "foo"; // 抛出 SyntaxError
```

### 空值运算

```js
undefined ?? "foo"; // 'foo'
null ?? "foo"; // 'foo'
"foo" ?? "bar"; // 'foo'

// 用 ?? 空值运算来代替 || 默认参数运算;
function foo(a) {
	a = a ?? "hello world";
	console.log(a);
}
foo(123);
foo(0);
foo("");
foo(false);

// 注意 : 空值运算是不支持 undefined 还有null 的;
```

只有在 a 值为 undefined 或 null 时，才会选 “hello world”

## BigInt 类型(大整型) 任意精度的整数

BigInt 是一种内置对象，用来创建比 2^53 - 1（Number 可创建的最大数字） 更大的整数。可以用来表示任意大的**整数**

**如何定义一个 BigInt：**

- 在一个整数字面量后面加 n，例如 `10n`
- 调用函数 `BigInt()` 并传递一个整数值或字符串值，例如 `BigInt(10)`

**BigInt 的特点：**

- BigInt 不能用于 Math 对象中的方法；

- BigInt 不能与任何 Number 实例混合运算，两者必须转换成同一种类型。但是需要注意，BigInt 在转换成 Number 时可能会丢失精度。

- 当使用 BigInt 时，带小数的运算会被向下取整

- BigInt 和 Number 不是严格相等，但是宽松相等

  ```js
  0n === 0; // false
  0n == 0; // true
  ```

- BigInt 和 Number 可以比较

  ```js
  2n > 2; // false
  2n > 1; // true
  ```

- BigInt 和 Number 可以混在一个数组中排序

  ```js
  const mixed = [4n, 6, -12n, 10, 4, 0, 0n];
  mixed.sort(); // [-12n, 0, 0n, 10, 4n, 4, 6]
  ```

- 被 Object 包装的 BigInt 使用 object 的比较规则进行比较，只用同一个对象比较时才相等

  ```js
  0n === Object(0n); // false
  Object(0n) === Object(0n); // false
  const o = Object(0n);
  o === o; // true
  ```

**BigInt 的方法：**

- `BigInt.asIntN()`
  将 BigInt 值转换为一个 -2^(width-1) 与 2^(width-1) - 1 之间的有符号整数。
- `BigInt.asUintN()`
  将一个 BigInt 值转换为 0 与 2^(width) - 1 之间的无符号整数。
- `BigInt.prototype.toLocaleString()`
  返回此数字的 language-sensitive 形式的字符串。覆盖 `Object.prototype.toLocaleString()` 方法。
- BigInt.prototype.toString()
  返回以指定基数 (base) 表示指定数字的字符串。覆盖 `Object.prototype.toString()` 方法。
- BigInt.prototype.valueOf()
  返回指定对象的基元值。覆盖 `Object.prototype.valueOf()` 方法。

**为什么会有 Bigint 的提案？**
JavaScript 中 `Number.MAX_SAFE_INTEGER`表示最大安全数字，计算结果是 9007199254740991，即在这个数字范围内不会出现精度丢失（小数除外）。但是一旦超过这个范围，js 就会出现计算不准确的情况，这在大数计算的时候就不得不依靠一些第三方库进行解决，因此官方提出了 BigInt 来解决此问题。

代码例子

```js
//大整形
// let n = 521n;
// console.log(n, typeof(n));

//函数
// let n = 123;
// console.log(BigInt(n));
// console.log(BigInt(1.2));

//大数值运算
let max = Number.MAX_SAFE_INTEGER;
console.log(max);
console.log(max + 1);
console.log(max + 2);
// 正确正常运算
console.log(BigInt(max));
console.log(BigInt(max) + BigInt(1));
console.log(BigInt(max) + BigInt(2));
```

## globalThis 对象 全局对象

### 全局(顶层)对象 globalThis 的由来

#### 声明变量的六种方法和顶层对象

- 顶层对象，在浏览器环境指的是 window 对象，在 Node 指的是 global 对象

- ES5 只有两种声明变量的方法：

  - var 命令

  - function 命令

  - var 命令和 function 命令声明的全局变量，依旧是顶层对象的属性

- ES6 添加了四种命令

  - let 命令

  - const 命令

  - import 命令

  - class 命令

  - let 命令、const 命令、class 命令声明的全局变量，不属于顶层对象的属性

#### JavaScript 语言存在一个顶层对象

它提供全局环境（即全局作用域），所有代码都是在这个环境中运行。但是，顶层对象在各种实现里面是不统一的。

- 浏览器里面，顶层对象是 window，但 Node 和 Web Worker 没有 window。

- 浏览器和 Web Worker 里面，self 也指向顶层对象，但是 Node 没有 self。

- Node 里面，顶层对象是 global，但其他环境都不支持。

同一段代码为了能够在各种环境，都能取到顶层对象，现在一般是使用 this 关键字，但是有局限性

- 全局环境中，this 会返回顶层对象。但是，Node.js 模块中 this 返回的是当前模块，ES6 模块中 this 返回的是 undefined。

- 函数里面的 this，如果函数不是作为对象的方法运行，而是单纯作为函数运行，this 会指向顶层对象。但是，严格模式下，这时 this 会返回 undefined。

- 不管是严格模式，还是普通模式，new Function('return this')()，总是会返回全局对象。但是，如果浏览器用了 CSP（Content Security Policy，内容安全策略），那么 eval、new Function 这些方法都可能无法使用。

#### ES2020 之前的顶层对象统一的解决方案

方法 1：

```js
// 方法一
typeof window !== "undefined"
	? window
	: typeof process === "object" &&
	  typeof require === "function" &&
	  typeof global === "object"
	? global
	: this;
```

方法 2：

```js
// 方法二
var getGlobal = function () {
	if (typeof self !== "undefined") {
		return self;
	}
	if (typeof window !== "undefined") {
		return window;
	}
	if (typeof global !== "undefined") {
		return global;
	}
	throw new Error("unable to locate global object");
};
```

ES2020 在语言标准的层面，引入 globalThis 作为顶层对象。也就是说，任何环境下，globalThis 都是存在的，都可以从它拿到顶层对象，指向全局环境下的 this

### 始终指向全局对象

globalThis 全局对象

```js
console.log(globalThis);
```

以前，在 Web 中，可以通过 `window`、`self` 取到全局对象，在 node.js 中，必须使用 `global`。

在松散模式下，可以在函数中返回 `this` 来获取全局对象，但是在严格模式和模块环境下，`this` 会返回 `undefined`。

以前要获取全局对象，可以定义一个函数：

```js
const getGlobal = () => {
	if (typeof self !== "undefined") {
		return self;
	}
	if (typeof window !== "undefined") {
		return window;
	}
	if (typeof global !== "undefined") {
		return global;
	}
	throw new Error("无法找到全局对象");
};

const globals = getGlobal();
console.log(globals);
```

现在 `globalThis` 提供了一个标准的方式来获取不同环境下的全局对象自身值。

## 顶级 await

之前版本 await 不能在非 async 定义的函数之中使用;

```js
await fetch("xxx"); // 老版本会报错;
// 老版本防止报错
(async () => {
	await fetch("xxx");
})();
```

现在可以直接单独使用 await

## 动态 import 导入

`import` 可以在需要的时候，再加载某个模块。

```js
button.addEventListener("click", (event) => {
	import("./dialogBox.js")
		.then((dialogBox) => {
			dialogBox.open();
		})
		.catch((error) => {
			/* Error handling */
		});
});
```

2

```js
const btn = document.getElementById("btn");
// 点击的时候再导入
btn.onclick = function () {
	import("./hello.js").then((module) => {
		module.hello();
	});
};
// 或者使用顶级await，动态导入
let sss = await import("./hello.js");
```

## 参数之中的错误抛出

```js
let foo = (options = throw new TypeError()) => {};
```

再看浏览器兼容性

## try catch 错误捕获新写法

之前版本写法

```js
try {
} catch (e) {
	console.log(e);
}
```

ES2020 写法：去掉错误的参数

```js
try{}catch(){}
```
