# ECMAScript-14(ES2023)

## 提案

**提案地址**：https://github.com/tc39/proposal-array-from-async

根据 **Erick Wendel**（微软 MVP、谷歌开发专家、@nodejs 合作者）的预测，ECMAScript 2023 可能会新增以下数组方法（3️⃣、4️⃣ 为所处提案阶段）：

- 3️⃣ Array.prototype.toReversed()
- 3️⃣ Array.prototype.toSorted()
- 3️⃣ Array.prototype.toSpliced()
- 3️⃣ Array.prototype.with()
- 3️⃣ Array.prototype.group()
- 3️⃣ Array.prototype.groupToMap()
- 4️⃣ Array.prototype.findLast()
- 4️⃣ Array.prototype.findLastIndex()
- 3️⃣ Array.fromAsync()

## 特性

2023 年 6 月 27 日，第 125 届 ECMA 大会正式批准了 ECMAScript 2023 语言规范。总而言之，本次 ECMAScript 2023 并没有新增大的改动点，更多是对 JavaScript 原来语法的完善与增补。而笔者认为其中比较有意义的更新主要有以下两个：

### 1、WeakMap 支持 Symbol 作为 Key。

总所周知， WeakMap 的 Key 是弱引用，且要求是唯一的值。由 Symbol 具有唯一性，保证不可重建，因此在今年的 ECMAScript 2023 新特性中扩展了 WeakMap API，WeakMaps 允许使用唯一的 Symbol 作为键。不过值得注意的是，通过 Symbol.for 创建的 Symbol 是不可以作为弱引用的，因为 Symbol.for 会在全局注册 Symbol，并支持在任何地方通过 Symbol.for 再次引用。

### 2、新增四个通过副本修改数组的方法：toReversed()、toSorted()、toSpliced()、with()，

目前大多数的数组方法都是非破坏性的，当然也存在一些对原数组具有破坏性的方法，例如 reverse()、sort() 以及 splice() 。当我们想要使用这些方法又不想对原数组造成影响的话，通常需要先拷贝一份数组再调用相应的方法，由此可见，这种开发体验不友好的。因此在今年的 ECMAScript 2023 优化了开发体验，新增了相应的非破坏性方法。

关于更多 ECMAScript 2023 其他改动的完整信息，请参考官方文档，此处不再赘述：ECMAScript® 2023 Language&nbsp;Specification：https://tc39.es/ecma262/2023/

参考内容：

ES2023（ES14）新标准详解 - IT 深客：https://www.itthink.tech/article/03e3d5cb-c817-41e9-918b-095fe6ace04b/d081bab2-1200-4fe3-a037-1abb8e6b8ba4#h2-SymbolsE58FAFE4BBA5E4BD9CE4B8BAweakE99B86E59088E79A84key

## 1. 通过副本更改数组

通过副本更改数组的提案目前处于第 3 阶段。该提案为数组和类型化数组提出了四种新的方法：

- Array.prototype.toReversed()
- Array.prototype.toSorted()
- Array.prototype.toSpliced()
- Array.prototype.with()

> **提案地址**：https://github.com/tc39/proposal-change-array-by-copy

为什么会有这个提案呢？我们知道，大多数的数组方法都是非破坏性的，也就是说，在数组执行该方法时，不会改变原数组，比如 `filter()` 方法：

```js
const arr = ["a", "b", "b", "a"];
const result = arr.filter((x) => x !== "b");
console.log(result); // ['a', 'a']
```

当然，也有一些是破坏性的方法，它们在执行时会改变原数组，比如 `sort()` 方法：

```js
const arr = ["c", "a", "b"];
const result = arr.sort();
console.log(result); // ['a', 'b', 'c']
```

在数组的方法中，下面的方法是具有破坏性的：

- `reverse()`
- `sort()`
- `splice()`

如果我们想要这些数组方法应用于数组而不改变它，可以使用下面任意一种形式：

```js
const sorted1 = arr.slice().sort();
const sorted2 = [...arr].sort();
const sorted3 = Array.from(arr).sort();
```

可以看到，我们首先需要创建数组的副本，再对这个副本进行修改。

因此改提案就引入了这三个方法的非破坏性版本，因此不需要手动创建副本再进行操作：

- `reverse()` 的非破坏性版本：`toReversed()`
- `sort()` 非破坏性版本：`toSorted(compareFn)`
- `splice()` 非破坏性版本：`toSpliced(start, deleteCount, ...items)`

该提案将这些函数属性引入到 `Array.prototype`：

- Array.prototype.toReversed() -> Array
- Array.prototype.toSorted(compareFn) -> Array
- Array.prototype.toSpliced(start, deleteCount, ...items) -> Array
- Array.prototype.with(index, value) -> Array

除此之外，该提案还还提出了一个新的非破坏性方法：`with()`。该方法会以非破坏性的方式替换给定 index 处的数组元素，即 `arr[index]=value` 的非破坏性版本。

所有这些方法都将保持目标数组不变，并返回它的副本并执行更改。这些方法适用于数组，也适用于类型化数组，即以下类的实例：

- Int8Array
- Uint8Array
- Uint8ClampedArray
- Int16Array
- Uint16Array
- Int32Array
- Uint32Array
- Float32Array
- Float64Array
- BigInt64Array
- BigUint64Array

> TypedArray 是一种通用的固定长度缓冲区类型，允许读取缓冲区中的二进制数据。其在 WEBGL 规范中被引入用于解决 Javascript 处理二进制数据的问题。类型化数组也是数组，只不过其元素被设置为特定类型的值。
>
> 类型化数组的核心就是一个名为 ArrayBuffer 的类型。每个 ArrayBuffer 对象表示的只是内存中指定的字节数，但不会指定这些字节用于保存什么类型的数据。通过 ArrayBuffer 能做的就是为了将来使用而分配一定数量的字节。

这些提案也适用于元组，元组相当于不可变的数组。它们拥有数组的所有方法——除了破坏性的方法。因此，将后者的非破坏性版本添加到数组对元组是有帮助的，这意味着我们可以使用相同的方法来非破坏性地更改数组和元组。

### （1）Array.prototype.toReversed()

`toReversed()` 是 `reverse()` 方法的非破坏性版本：

```js
const arr = ["a", "b", "c"];
const result = arr.toReversed();
console.log(result); // ['c', 'b', 'a']
console.log(arr); // ['a', 'b', 'c']
```

下面是 `toReversed()` 方法的一个简单的 polyfill：

```js
if (!Array.prototype.toReversed) {
	Array.prototype.toReversed = function () {
		return this.slice().reverse();
	};
}
```

### （2）Array.prototype.toSorted()

`toSorted()` 是 `sort()` 方法的非破坏性版本：

```js
const arr = ["c", "a", "b"];
const result = arr.toSorted();
console.log(result); // ['a', 'b', 'c']
console.log(arr); // ['c', 'a', 'b']
```

下面是 `toSorted()` 方法的一个简单的 polyfill：

```js
if (!Array.prototype.toSorted) {
	Array.prototype.toSorted = function (compareFn) {
		return this.slice().sort(compareFn);
	};
}
```

### （3）Array.prototype.toSpliced()

`splice()` 方法比其他几种方法都复杂，其使用形式：`splice(start, deleteCount, ...items)`。该方法会从从 `start` 索引处开始删除 `deleteCount`个元素，然后在 `start` 索引处开始插入`item` 中的元素，最后返回已经删除的元素。

`toSpliced` 是 `splice()` 方法的非破坏性版本，它会返回更新后的数组，原数组不会变化，并且我们无法再得到已经删除的元素：

```js
const arr = ["a", "b", "c", "d"];
const result = arr.toSpliced(1, 2, "X");
console.log(result); // ['a', 'X', 'd']
console.log(arr); // ['a', 'b', 'c', 'd']
```

下面是 `toSpliced()` 方法的一个简单的 polyfill：

```js
if (!Array.prototype.toSpliced) {
	Array.prototype.toSpliced = function (start, deleteCount, ...items) {
		const copy = this.slice();
		copy.splice(start, deleteCount, ...items);
		return copy;
	};
}
```

### （4）Array.prototype.with()

`with()`方法的使用形式：`with(index, value)`，它是 `arr[index] = value` 的非破坏性版本。

```js
const arr = ["a", "b", "c"];
const result = arr.with(1, "X");
console.log(result); // ['a', 'X', 'c']
console.log(arr); // ['a', 'b', 'c']
```

下面是 `with()` 方法的一个简单的 polyfill：

```js
if (!Array.prototype.with) {
	Array.prototype.with = function (index, value) {
		const copy = this.slice();
		copy[index] = value;
		return copy;
	};
}
```

## 2. 数组分组

### （1）概述

在日常开发中，数组分组是一种极其常见的操作。因此，proposal-array-grouping 提案就提出了两个新的数组方法：

- array.group(callback, thisArg?)
- array.groupToMap(callback, thisArg?)

> **提案地址**：https://github.com/tc39/proposal-array-grouping

下面是这两个方法的类型签名：

```js
Array<Elem>.prototype.group<GroupKey extends (string|symbol)>(
  callback: (value: Elem, index: number, array: Array<Elem>) => GroupKey,
  thisArg?: any
): {[k: GroupKey]: Array<Elem>}

Array<Elem>.prototype.groupToMap<GroupKey>(
  callback: (value: Elem, index: number, array: Array<Elem>) => GroupKey,
  thisArg?: any
): Map<GroupKey, Array<Elem>>
```

这两个方法都用来对数组进行分组：

- 输入：一个数组；
- 输出：组，每个组都有一个组 key，以及一个包含组成员的数组。

这两个方法都会对数组进行遍历，它们会向其回调请求组键并将元素添加到相应的组中。这两个方法在表示组的方式上有所不同：

- `group()`：将组存储在对象中：组键存储为属性键，组成员存储为属性值；
- `groupToMap()`：将组存储在 Map 中：组键存储为 Map 键，组成员存储为 Map 值。

那这两个方法该如何选择呢？我们知道，JavaScript 中对象是支持解构的，如果想要使用解构来获取数组中的值，比如，对于上面对象，可以通过解构获取三个不同组的值：

```js
const { vegetables, fruit, meat } = result;
```

而 Map 的好处就是它的 `key` 不限于字符串和`symbol`，更加自由。

### （2）使用

下面来看几个实用例子。假如执行 `Promise.allSettled()` 方法返回的数组如下：

```js
const settled = [
  { status: 'rejected', reason: 'Jhon' },
  { status: 'fulfilled', value: 'Jane' },
  { status: 'fulfilled', value: 'John' },
  { status: 'rejected', reason: 'Jaen' },
  { status: 'rejected', reason: 'Jnoh' },
];

const {fulfilled, rejected} = settled.group(x => x.status);

// fulfilled 结果如下：
[
  { status: 'fulfilled', value: 'Jane' },
  { status: 'fulfilled', value: 'John' },
]

// rejected 结果如下：
[
  { status: 'rejected', reason: 'Jhon' },
  { status: 'rejected', reason: 'Jaen' },
  { status: 'rejected', reason: 'Jnoh' },
]
```

在这个例子中，使用 `group()` 的效果会更好，因为可以使用解构轻松获取需要组的值。

假如想要对以下数组中人根据国家进行分组：

```js
const persons = [
	{ name: "Louise", country: "France" },
	{ name: "Felix", country: "Germany" },
	{ name: "Ava", country: "USA" },
	{ name: "Léo", country: "France" },
	{ name: "Oliver", country: "USA" },
	{ name: "Leni", country: "Germany" },
];

const result = persons.groupToMap((person) => person.country);

// result 的执行结果和以下 Map 是等价的：
new Map([
	[
		"France",
		[
			{ name: "Louise", country: "France" },
			{ name: "Léo", country: "France" },
		],
	],
	[
		"Germany",
		[
			{ name: "Felix", country: "Germany" },
			{ name: "Leni", country: "Germany" },
		],
	],
	[
		"USA",
		[
			{ name: "Ava", country: "USA" },
			{ name: "Oliver", country: "USA" },
		],
	],
]);
```

在这个例子中，`groupToMap()` 是更好的选择，因为我们可以在 Map 中使用任何类型的键，而在对象中，键只能是字符串或`symbol`。

### （3）polyfill

下面来实现一下这两个方法：

- **Array.prototype.group**

```js
Array.prototype.group = function (callback, thisArg) {
	const result = Object.create(null);
	for (const [index, elem] of this.entries()) {
		const groupKey = callback.call(thisArg, elem, index, this);
		if (!(groupKey in result)) {
			result[groupKey] = [];
		}
		result[groupKey].push(elem);
	}
	return result;
};
```

- **Array.prototype.groupToMap**

```js
Array.prototype.groupToMap = function (callback, thisArg) {
	const result = new Map();
	for (const [index, elem] of this.entries()) {
		const groupKey = callback.call(thisArg, elem, index, this);
		let group = result.get(groupKey);
		if (group === undefined) {
			group = [];
			result.set(groupKey, group);
		}
		group.push(elem);
	}
	return result;
};
```

## 3. 从尾到头搜索数组

### （1）概述

在 JavaScript 中，通过 `find()` 和 `findIndex()` 查找数组中的值是一种常见做法。不过，这些方法从数组的开始进行遍历：

```js
const array = [{ v: 1 }, { v: 2 }, { v: 3 }, { v: 4 }, { v: 5 }];

array.find((elem) => elem.v > 3); // {v: 4}
array.findIndex((elem) => elem.v > 3); // 3
```

如果要从数组的末尾开始遍历，就必须反转数组并使用上述方法。这样做就需要一个额外的数组操作。幸运的是，Wenlu Wang 和 Daniel Rosenwasser 关于`findLast()` 和 `findLastIndex()` 的 ECMAScript 提案解决了这一问题。该提案的一个重要原因就是：**语义**。

> 提案地址：https://github.com/tc39/proposal-array-find-from-last

### （2）使用

它们的用法和`find()`、`findIndex()`类似，唯一不同的是它们是 **从后向前 \*\*遍历数组，这两个方法适用于\*\*数组**和**类数组**。

- `findLast()` 会返回第一个查找到的元素，如果没有找到，就会返回 `undefined`；
- `findLastIndex()` 会返回第一个查找到的元素的索引。如果没有找到，就会返回 -1；

```js
const array = [{ v: 1 }, { v: 2 }, { v: 3 }, { v: 4 }, { v: 5 }];

array.findLast((elem) => elem.v > 3); // {v: 5}
array.findLastIndex((elem) => elem.v > 3); // 4
array.findLastIndex((elem) => elem.v > 5); // undefined
```

### （3）polyfill

下面来实现一下这两个方法：

- **Array.prototype.findLast**

```js
Array.prototype.findLast = function (arr, callback, thisArg) {
	for (let index = arr.length - 1; index >= 0; index--) {
		const value = arr[index];
		if (callback.call(thisArg, value, index, arr)) {
			return value;
		}
	}
	return undefined;
};
```

- **Array.prototype.findLastIndex**

```js
Array.prototype.findLastIndex = function (arr, callback, thisArg) {
	for (let index = arr.length - 1; index >= 0; index--) {
		const value = arr[index];
		if (callback.call(thisArg, value, index, arr)) {
			return index;
		}
	}
	return -1;
};
```

### （4）参考源码

lodash 中也提供了类似方法，下面是相关源码：

- **findLast()**

```js
import findLastIndex from "./findLastIndex.js";
import isArrayLike from "./isArrayLike.js";

/**
 * This method is like `find` except that it iterates over elements of
 * `collection` from right to left.
 *
 * @since 2.0.0
 * @category Collection
 * @param {Array|Object} collection The collection to inspect.
 * @param {Function} predicate The function invoked per iteration.
 * @param {number} [fromIndex=collection.length-1] The index to search from.
 * @returns {*} Returns the matched element, else `undefined`.
 * @see find, findIndex, findKey, findLastIndex, findLastKey
 * @example
 *
 * findLast([1, 2, 3, 4], n => n % 2 == 1)
 * // => 3
 */
function findLast(collection, predicate, fromIndex) {
	let iteratee;
	const iterable = Object(collection);
	if (!isArrayLike(collection)) {
		collection = Object.keys(collection);
		iteratee = predicate;
		predicate = (key) => iteratee(iterable[key], key, iterable);
	}
	const index = findLastIndex(collection, predicate, fromIndex);
	return index > -1
		? iterable[iteratee ? collection[index] : index]
		: undefined;
}

export default findLast;
```

- **findLastIndex()**

```js
import baseFindIndex from "./.internal/baseFindIndex.js";
import toInteger from "./toInteger.js";

/**
 * This method is like `findIndex` except that it iterates over elements
 * of `collection` from right to left.
 *
 * @since 2.0.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @param {Function} predicate The function invoked per iteration.
 * @param {number} [fromIndex=array.length-1] The index to search from.
 * @returns {number} Returns the index of the found element, else `-1`.
 * @see find, findIndex, findKey, findLast, findLastKey
 * @example
 *
 * const users = [
 *   { 'user': 'barney',  'active': true },
 *   { 'user': 'fred',    'active': false },
 *   { 'user': 'pebbles', 'active': false }
 * ]
 *
 * findLastIndex(users, ({ user }) => user == 'pebbles')
 * // => 2
 */
function findLastIndex(array, predicate, fromIndex) {
	const length = array == null ? 0 : array.length;
	if (!length) {
		return -1;
	}
	let index = length - 1;
	if (fromIndex !== undefined) {
		index = toInteger(fromIndex);
		index =
			fromIndex < 0 ? Math.max(length + index, 0) : Math.min(index, length - 1);
	}
	return baseFindIndex(array, predicate, index, true);
}

export default findLastIndex;
```

## 4. Array.fromAsync

在 JavaScript 中内置了 Array.from 方法，它用于将类数组或者可迭代对象生成一个新的数组实例。在 ECMAScript 2018 中引入了异步可迭代对象。而 JavaScript 中一直缺少直接从异步可迭代对象生成数组的内置方法。

proposal-array-from-async 提案中提出来的 `Array.fromAsync` 方法就是为了解决这个问题而提出来的。

下面来看一个简单的例子：

```js
async function* asyncGen(n) {
	for (let i = 0; i < n; i++) yield i * 2;
}

// arr 将变为 [0, 2, 4, 6]`
const arr = [];
for await (const v of asyncGen(4)) {
	arr.push(v);
}

// 与上述方式是等价的
const arr = await Array.fromAsync(asyncGen(4));
```

`Array.fromAsync` 可以将异步迭代转换为 `promise`，并将解析为新数组。在 `promise` 解析之前，它将从输入值中创建一个异步迭代器，进行惰性的迭代，并将每个产生的值添加到新数组中。

与其他基于 Promise 的 API 一样，`Array.fromAsync` 总是会立即返回一个 `promise`。当 `Array.fromAsync` 的输入在创建其异步或同步迭代器时引发错误时，则此 `promise` 状态将被置为 `rejected`。

# 待定

### Array 扩展

#### 数组支持倒序查找

在`JS`中，我们可以使用数组的`find()`函数来在数组中找到第一个满足某个条件的元素。同样地，我们还可以通过`findIndex()`函数来返回这个元素的位置。可是，无论是`find()`还是`findIndex()`，它们都是从数组的头部开始查找元素的，可是在某些情况下，我们可能有从数组后面开始查找某个元素的需要。

`ES13`出来后，我们终于有办法处理这种情况了，那就是使用新的`findLast()`和`findLastIndex()`函数。这两个函数都会从数组的末端开始寻找某个满足条件的元素。

```js
const letters = [
	{ value: "z" },
	{ value: "y" },
	{ value: "x" },
	{ value: "y" },
	{ value: "z" },
];

// 倒序查找
const found = letters.findLast((item) => item.value === "y");
const foundIndex = letters.findLastIndex((item) => item.value === "y");

console.log(found); // { value: 'y' }
console.log(foundIndex); // 3
```

#### toSorted

`sort`方法的复制版本，区别就是`sort`是修改原数组，而`toSorted`是返回新数组。

我们先来看看`sort`

```js
const arr = [1, 3, 5, 2, 8];

const newArr = arr.sort();
console.log("原数组:", arr);
console.log("新数组:", newArr);
```

![image.png](<./ECMAScript-14(ES2023).assets/1df4cfb270cd4fcb8221e07fbee0f59btplv-k3u1fbpfcp-zoom-in-crop-mark1512000.webp>)

我们再来看看`toSorted`

```js
const arr = [1, 3, 5, 2, 8];

const newArr = arr.toSorted();
console.log("原数组:", arr);
console.log("新数组:", newArr);
```

看出区别来了吧，新老数组不一样

![image.png](<./ECMAScript-14(ES2023).assets/ea0f8dd52edf40e4a99d488a411fdf37tplv-k3u1fbpfcp-zoom-in-crop-mark1512000.webp>)

#### toReversed

`reverse`方法的复制版本，区别就是`reverse`是修改原数组，而`toReversed`是返回新数组

我们先来看看`reverse`

```js
const arr = [1, 3, 5, 2, 8];

const newArr = arr.reverse();
console.log("原数组:", arr);
console.log("新数组:", newArr);
```

![image.png](<./ECMAScript-14(ES2023).assets/fd26b4f2849b468fb858361e59bada3ftplv-k3u1fbpfcp-zoom-in-crop-mark1512000.webp>)

我们再来看看`toReversed`

```js
const arr = [1, 3, 5, 2, 8];

const newArr = arr.toReversed();
console.log("原数组:", arr);
console.log("新数组:", newArr);
```

看出区别来了吧，新老数组不一样

![image.png](<./ECMAScript-14(ES2023).assets/a92baaa7ad004197a7f0b56f5b7e0149tplv-k3u1fbpfcp-zoom-in-crop-mark1512000.webp>)

#### toSpliced

`toSpliced`与`splice`区别就很大了。`splice`是截取原数组的数据，并返回截取出来的数据。`toSpliced`是对原数组的副本进行操作，然后返回被截取完后的新数组，并不会修改原数组。

我们先来看看`splice`

```js
const arr = [1, 3, 5, 2, 8];

const newArr = arr.splice(1, 2);
console.log("原数组:", arr);
console.log("新数组:", newArr);
```

![image.png](<./ECMAScript-14(ES2023).assets/a41f687c208b44bf808538f889bbdcb9tplv-k3u1fbpfcp-zoom-in-crop-mark1512000.webp>)

我们再来看看`toSpliced`

```js
const arr = [1, 3, 5, 2, 8];

const newArr = arr.toSpliced(1, 2);
console.log("原数组:", arr);
console.log("新数组:", newArr);
```

看出区别了吧，`toSpliced`并不会影响原数组。返回的是截取后的数组。

![image.png](<./ECMAScript-14(ES2023).assets/6b3558f4e5434c3bb41a903fe0537218tplv-k3u1fbpfcp-zoom-in-crop-mark1512000.webp>)

#### with

`with`有点类似我们通过`[index]`来修改数组，区别就是`with`不是修改原数组，而是返回整个新数组。

我们先来看看通过下标来修改数组的

```js
const arr = [1, 3, 5, 2, 8];

arr[1] = 10;
console.log("原数组:", arr);
```

![image.png](<./ECMAScript-14(ES2023).assets/66ee7faf88624ae0af38be31056eff77tplv-k3u1fbpfcp-zoom-in-crop-mark1512000.webp>)

```js
const arr = [1, 3, 5, 2, 8];

const newArr = arr.with(1, 10);
console.log("原数组:", arr);
console.log("新数组:", newArr);
```

![image.png](<./ECMAScript-14(ES2023).assets/3c6c5c4f7499417593b6c45515185349tplv-k3u1fbpfcp-zoom-in-crop-mark1512000.webp>)

### WeakMap 扩展

#### 支持 Symbol 作为键

之前`WeakMap`是只支持对象作为键，现在还支持 `Symbol` 作为键

```js
const weak = new WeakMap();
const key = Symbol("ref");
weak.set(key, "randy");

console.log(weak.get(key)); // randy
```
