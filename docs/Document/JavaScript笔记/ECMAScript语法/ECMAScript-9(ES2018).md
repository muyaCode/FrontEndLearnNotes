# ECMAScript-9(ES2018)

## 提案

## 新特性

- `Async iterators` 异步迭代器
- `Object rest properties` 剩余属性
- `Object spread properties` 扩展属性
- `Promise.prototype.finally`

## 对象的方法扩展

rest 剩余参数与 spread 扩展运算符在 ES6 中已经引入，不过 ES6 中只针对于数组， 在 ES9 中为对象提供了像数组一样的 rest 参数和扩展运算符

### rest 剩余参数：...user

```js
// rest剩余参数...user
function connect({ host, port, ...user }) {
	console.log(host);
	console.log(port);
	console.log(user);
}
connect({
	host: "127.0.0.1",
	port: 3306,
	username: "root",
	password: "root",
	type: "master",
});
```

#### `Object rest properties`

**举例：**

```js
let test = {
	a: 1,
	b: 2,
	c: 3,
	d: 4,
};

let { a, b, ...rest } = test;

console.log(a); // 1
console.log(b); // 2
console.log(rest); // {c: 3, d: 4}
```

**⚠️ 注意：**

- `null` 不能使用扩展运算符

```js
let { a, b, ...rest } = null; // ❌
```

### spread 扩展运算符

```js
const skillOne = {
	q: "天音波",
};
const skillTwo = {
	q: "金钟罩",
};
const skillThree = {
	q: "天雷破",
};
const skillFour = {
	q: "猛龙摆尾",
};

const mangseng = {
	...skillOne,
	...skillTwo,
	...skillThree,
	...skillFour,
};
// 合并的对象打印
console.log(mangseng);
```

**举例：**

```js
let test = {
	a: 1,
	b: 2,
};
let result = { c: 3, ...test };
console.log(result); // {c: 3, a: 1, b: 2}

let test = null;
let result = { c: 3, ...test }; // {c: 3}
```

### 注意点

```js
const obj = { x: { y: 10 } };
const copy1 = { ...obj };
const copy2 = { ...obj };
obj.x.y = "jimmy";
console.log(copy1, copy2); // x: {y: "jimmy"} x: {y: "jimmy"}
console.log(copy1.x === copy2.x); // → true
```

如果属性的值是一个对象的话，该对象的引用会被拷贝，而不是生成一个新的对象。

我们再来看下 `Object rest` 的示例：

```js
const input = {
	a: 1,
	b: 2,
	c: 3,
};

let { a, ...rest } = input;

console.log(a, rest); // 1 {b: 2, c: 3}
```

当对象 key-value 不确定的时候，把必选的 key 赋值给变量，用一个变量收敛其他可选的 key 数据，这在之前是做不到的。注意，**rest 属性必须始终出现在对象的末尾**，否则将抛出错误。

## 正则表达式扩展

### 命名捕获组

ES9 允许命名捕获组使用符号『`?<name>`』,这样获取捕获结果可读性和可维护性更强

原来提取 url 例子

```js
let str = "哈哈哈";
// 提取 url 与 [标签文本]
const reg = /(.*)<\/a>/;
// 执行
const result = reg.exec(str);
// 打印输出
console.log(result[1]);
console.log(result[2]);
```

命名捕获组代码例子

```js
let str = "哈哈哈";
// 提取 url 与 [标签文本]
const reg = /.*)">(?<text>.*)<\/a>/;
// 执行
const result = reg.exec(str);
// 打印输出
console.log(result.groups.url);
console.log(result.groups.text);
```

分组名字：`?<url>`

### 反向断言

ES9 支持反向断言，通过对匹配结果前面的内容进行判断，对匹配进行筛选。

正向断言代码例子 (以前的语法)

```js
//声明字符串
let str = "JS5211314 你知道么 555 啦啦啦";

//正向断言
const reg = /\d+(?=啦)/;
const result = reg.exec(str);
```

反向断言代码例子

```js
//声明字符串
let str = "JS5211314 你知道么 555 啦啦啦";

//反向断言
const reg = /(?<=么)\d+/;
const result = reg.exec(str);
console.log(result);
```

### dotAll 模式

正则表达式中点.匹配除回车外的任何单字符，标记『s』改变这种行为，允许行终止符出现

代码例子

```js
let str = `

 
 肖生克的救赎
 上映日期: 1994-09-10
 
 
 阿甘正传
 上映日期: 1994-07-06
 
`;

// 声明正则
// 旧的正则：缺点，匹配多个这种形式的内容结构会很麻烦
// const reg = /\s+(.*?)<\/a>\s+(.*?)<\/p>/;
// dotAll 模式：.*     g：全局匹配
const reg = /.*?(.*?)<\/a>.*?(.*?)<\/p>/gs;
//执行匹配
const result = reg.exec(str);
let result;
let data = [];
while ((result = reg.exec(str))) {
	data.push({ title: result[1], time: result[2] });
}
//输出结果
console.log(data);
```

爬虫爬取的时候把元素里内容的提取

## String 扩展

放松对标签模板里字符串转义的限制, 遇到不合法的字符串转义会返回 undefined，并且从 raw 上可获取原字符串。

下面是一个 es6 的标签模板 如果对这个语法感到陌生，请参考：[字符串的扩展 - ECMAScript 6 入门 (ruanyifeng.com)](https://es6.ruanyifeng.com/#docs/string#标签模板)

```js
const foo = (a, b, c) => {
	console.log(a);
	console.log(b);
	console.log(c);
};
const name = "jimmy";
const age = 18;
foo`这是${name},他的年龄是${age}岁`;
```

参数打印如下：

![image-20240424201332243](<./ECMAScript-9(ES2018).assets/image-20240424201332243.png>)

ES9 开始，模板字符串允许嵌套支持常见转义序列，移除对 ECMAScript 在带标签的模版字符串中转义序列的语法限制。

```js
function foo(a, b, c) {
	console.log(a, b, c);
}
// 在标签函数中使用
// unicode字符\u{61} 对应的值为 a
// unicode字符\u{62} 对应的值为 b
// \unicode 是一个无效的unicode字符
foo`\u{61} and \u{62}`;
foo`\u{61} and \unicode`;
```

![image-20240424201358591](<./ECMAScript-9(ES2018).assets/image-20240424201358591.png>)

### 注意点

在模板字符串中，如果输入无效的 unicode 字符，还是会报错。只有在便签模板中 从 es9 开始才不会报错。

```js
let string = `\u{61} and \unicode`;
console.log(string); // Uncaught SyntaxError: Invalid Unicode escape sequence
```

## 异步迭代 for await of

异步迭代器(for-await-of)：循环等待每个 Promise 对象变为 resolved 状态才进入下一步。

我们知道 for...of 是同步运行的，看如下代码

```js
function TimeOut(time) {
	return new Promise(function (resolve, reject) {
		setTimeout(function () {
			resolve(time);
		}, time);
	});
}

async function test() {
	let arr = [TimeOut(2000), TimeOut(1000), TimeOut(3000)];
	for (let item of arr) {
		console.log(Date.now(), item.then(console.log));
	}
}

test();
```

上面打印结果如下图

![image-20240424201020619](<./ECMAScript-9(ES2018).assets/image-20240424201020619.png>)

上述代码证实了 for of 方法不能遍历异步迭代器，得到的结果并不是我们所期待的，于是 for await of 就粉墨登场啦！

**ES9 中可以用 for...await...of 的语法来操作**

```js
function TimeOut(time) {
	return new Promise(function (resolve, reject) {
		setTimeout(function () {
			resolve(time);
		}, time);
	});
}

async function test() {
	let arr = [TimeOut(2000), TimeOut(1000), TimeOut(3000)];
	for await (let item of arr) {
		console.log(Date.now(), item);
	}
}
test();
// 1560092345730 2000
// 1560092345730 1000
// 1560092346336 3000
```

for await of 环等待每个 Promise 对象变为 resolved 状态才进入下一步。所有打印的结果为 2000，1000，3000。

## `Async iterators` 异步迭代器

**返回值：** `Async iterator` 对象的 next() 方法返回一个 `Promise`，这个 `Promise` 的返回值可以被解析成 `{value, done}` 的格式，

**语法：**`iterator.next().then(({value, done}) => {});`

**举例：**

```js
const asyncIterator = () => {
	const array = [1, 2];
	return {
		next: function () {
			if (array.length) {
				return Promise.resolve({
					value: array.shift(),
					done: false,
				});
			}
			return Promise.resolve({
				done: true,
			});
		},
	};
};

let iterator = asyncIterator();

const test = async () => {
	await iterator.next().then(console.log); // {value: 1, done: false}
	await iterator.next().then(console.log); // {value: 2, done: false}
	await iterator.next().then(console.log); // {done: true}
};

test();
```

### 可以使用 `for-await-of` 在循环中异步调用函数

```js
const promises = [
	new Promise((resolve) => resolve(1)),
	new Promise((resolve) => resolve(2)),
	new Promise((resolve) => resolve(3)),
];

const test = async () => {
	for await (const p of promises) {
		console.log("p", p);
	}
};

test();
```

## Promise.prototype.finally()

在`Promise`结束的时候，不管是结果是`resolved`还是`rejected`，都会调用`finally`中的方法

Promise.prototype.finally() 方法返回一个 Promise，在 promise 执行结束时，无论结果是 fulfilled 或者是 rejected，在执行 then()和 catch()后，都会执行 finally 指定的回调函数。这为指定执行完 promise 后，无论结果是 fulfilled 还是 rejected 都需要执行的代码提供了一种方式，避免同样的语句需要在 then()和 catch()中各写一次的情况。

`finally`中的回调函数不接受任何参数

**返回值：** 一个 Promise

**语法：**

```js
const promise = new Promise((resolve, reject) => {
	resolve("resolved");
	reject("rejectd");
});

promise
	.then((res) => {
		console.log(res);
	})
	.catch((err) => {
		console.log(err);
	})
	.finally(() => {
		console.log("finally");
	});
```

**举例：**

```js
const promise = new Promise((resolve, reject) => {
	resolve(1);
	reject(2);
});

const test = () => {
	console.log(3);
	promise
		.then((res) => {
			console.log(4, res);
		})
		.catch((err) => {
			console.log(5, err);
		})
		.finally(() => {
			console.log(6);
		});
};

test(); // 3 4 1 6
```

### 使用场景

#### **loading 关闭**

需要每次发送请求，都会有 loading 提示，请求发送完毕，就需要关闭 loading 提示框，不然界面就无法被点击。

不管请求成功或是失败，这个 loading 都需要关闭掉，这时把关闭 loading 的代码写在 finally 里再合适不过了。
