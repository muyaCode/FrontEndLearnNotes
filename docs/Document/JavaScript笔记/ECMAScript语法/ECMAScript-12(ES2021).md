# ECMAScript-12(ES2021)

## 提案



## ES 2021（ES12）新增了如下新特性👇

- 逻辑运算符和赋值表达式（&&=，||=，??=）
- `String.prototype.replaceAll()`
- 数字分隔符
- `Promise.any`

## String.prototype.replaceAll()

`replaceAll()`  方法返回一个新字符串，新字符串中所有满足 `pattern` 的部分都会被`replacement` 替换。`pattern`可以是一个字符串或一个`RegExp`，`replacement`可以是一个字符串或一个在每次匹配被调用的函数。

原始字符串保持不变。

- pattern 可以是一个字符串或 RegExp；
- replacement 可以是一个字符串或一个在每次被匹配被调用的函数。

```js
'aabbcc'.replaceAll('b', '.');  // 'aa..cc'
```

使用正则表达式搜索值时，必须是全局的：

```js
// 运行报错：
'aabbcc'.replaceAll(/b/, '.');  // TypeError: replaceAll must be called with a global RegExp

// 正常运行
'aabbcc'.replaceAll(/b/g, '.');  // "aa..cc"
```

## 数字分隔符

欧美语言中，较长的数值允许每三位添加一个分隔符（通常是一个逗号），增加数值的可读性。比如，`1000`可以写作`1,000`。

`ES2021`中允许 JavaScript 的数值使用下划线（`_`）作为分隔符。但是没有规定间隔的位数：

```js
let budget = 1_000_000_000_000;
budget === 10 ** 12 // true
```

这个数值分隔符没有指定间隔的位数，也就是说，可以每三位添加一个分隔符，也可以每一位、每两位、每四位添加一个。

```js
123_00 === 12_300 // true

12345_00 === 123_4500 // true
12345_00 === 1_234_500 // true
```

小数和科学记数法也可以使用分隔符：

```js
// 小数
0.000_001

// 科学计数法
1e10_000
```

⚠️ 注意点：

- 不能放在数值的最前面（leading）或最后面（trailing）。
- 不能两个或两个以上的分隔符连在一起。
- 小数点的前后不能有分隔符。
- 科学计数法里面，表示指数的`e`或`E`前后不能有分隔符。

下面的写法都会报错。

```js
// 全部报错
3_.141
3._141
1_e12
1e_12
123__456
_1464301
1464301_
```

## Promise.any

Promise.any() 接收一个Promise可迭代对象，只要其中的一个 promise 成功，就返回那个已经成功的 promise 。

如果可迭代对象中没有一个 promise 成功（即所有的 promises 都失败/拒绝），就返回一个失败的 promise

```js
const promise1 = new Promise((resolve, reject) => reject('我是失败的Promise_1')); 
const promise2 = new Promise((resolve, reject) => reject('我是失败的Promise_2')); 
const promiseList = [promise1, promise2]; 

Promise.any(promiseList).then( values => {  
    console.log(values);
}).catch( e => {  
    console.log(e);
});
```

方法接受一组 Promise 实例作为参数，包装成一个新的 Promise 实例返回。

只要参数实例有一个变成 fulfilled 状态，包装实例就会变成 fulfilled 状态；如果所有参数实例都变成 rejected 状态，包装实例就会变成 rejected 状态。

```js
const promise1 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("promise1");
      //  reject("error promise1 ");
    }, 3000);
  });
};
const promise2 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("promise2");
      // reject("error promise2 ");
    }, 1000);
  });
};
const promise3 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("promise3");
      // reject("error promise3 ");
    }, 2000);
  });
};
Promise.any([promise1(), promise2(), promise3()])
  .then((first) => {
    // 只要有一个请求成功 就会返回第一个请求成功的
    console.log(first); // 会返回promise2
  })
  .catch((error) => {
    // 所有三个全部请求失败 才会来到这里
    console.log("error", error);
  });

Promise.any([promise1(), promise2(), promise3()])
  .then((first) => {
    // 只要有一个请求成功 就会返回第一个请求成功的
    console.log(first); // 会返回promise2
  })
  .catch((error) => {
    // 所有三个全部请求失败 才会来到这里
    console.log("error", error);
  });
```

## structuredClone() 深拷贝

MDN文档：[structuredClone() - Web API | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/API/structuredClone)

ECMAScript 2021提供了`structuredClone()`，这是一个用于深拷贝的内置函数。

所有的浏览器都已经在他们的最新版本中实现了这个API，Firefox已经在Firefox 94中把它发布到了稳定版。此外，Node 17和Deno 1.14也实现了这个API。你现在就可以开始使用这个功能了，而且不会觉得有什么问题。

## WeakRef and 

使用WeakRefs的Class类创建对对象的弱引用(对对象的弱引用是指当该对象应该被GC回收时不会阻止GC的回收行为)

MDN：[WeakRef](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/WeakRef)

## Finalizers

MDN：[FinalizationRegistry](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/FinalizationRegistry)

## 逻辑运算符和赋值表达式（&&=，||=，??=）

逻辑运算符和赋值表达式，新特性结合了逻辑运算符（&&，||，??）和赋值表达式而JavaScript已存在的 复合赋值运算符有：

```js
a ||= b
// 等价于
a = a || (a = b)

a &&= b
// 等价于
a = a && (a = b)

a ??= b
// 等价于
a = a ?? (a = b)
```

s数字分隔符，可以在数字之间创建可视化分隔符，通过_下划线来分割数字，使数字更具可读性

```js
const money = 1_000_000_000;
// 等价于
const money = 1000000000;

1_000_000_000 === 1000000000; // true
```

### &&=

逻辑与赋值运算符 `x &&= y` 等价于 `x && (x=y)`：意思是当 x 为真时，x = y。

```js
let a = 1;
let b = 0;

a &&= 2;
console.log(a); // 2

b &&= 2;
console.log(b);  // 0
```

### ||=

逻辑或赋值运算符 `x ||= y` 等价于 `x || (x = y)`：意思是仅在 x 为 false 的时候，x = y。

```js
const a = { duration: 50, title: '' };

a.duration ||= 10;
console.log(a.duration);  // 50

a.title ||= 'title is empty.';
console.log(a.title);  // "title is empty"
```

### ??=

逻辑空赋值运算符 `x ??= y` 等价于 `x ?? (x = y)`：意思是仅在 x 为 null 或 undefined 的时候，x = y。

**示例一**

```js
const a = { duration: 50 };

a.duration ??= 10;
console.log(a.duration);  // 50

a.speed ??= 25;
console.log(a.speed);  // 25
```

**示例二**

```js
function config(options) {
  options.duration ??= 100;
  options.speed ??= 25;
  return options;
}

config({ duration: 125 }); // { duration: 125, speed: 25 }
config({}); // { duration: 100, speed: 25 }
```
