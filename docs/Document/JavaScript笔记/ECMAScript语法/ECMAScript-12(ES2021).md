# ECMAScript-12(ES2021)

## 提案



## ES 2021（ES12）新增了如下新特性👇

- 逻辑运算符和赋值表达式（&&=，||=，??=）
- `String.prototype.replaceAll()`
- 数字分隔符
- `Promise.any`

## `String.prototype.replaceAll()`

返回一个新字符串，字符串中所有满足 pattern 的部分都会被 replacement 替换掉。原字符串保持不变。

- pattern 可以是一个字符串或 RegExp；
- replacement 可以是一个字符串或一个在每次被匹配被调用的函数。

```js
'aabbcc'.replaceAll('b', '.');  // 'aa..cc'
```

使用正则表达式搜索值时，必须是全局的：

```js
'aabbcc'.replaceAll(/b/, '.');  // TypeError: replaceAll must be called with a global RegExp

'aabbcc'.replaceAll(/b/g, '.');  // "aa..cc"
```

## 数字分隔符

ES12 允许 JavaScript 的数值使用下划线（_）作为分隔符，但是没有规定间隔的位数：

```js
123_00
```

小数和科学记数法也可以使用分隔符：

```js
0.1_23
1e10_00
```

⚠️ 注意：

- 不能放在数值的最前面和最后面；
- 不能将两个及两个以上的分隔符连在一起；
- 小数点的前后不能有分隔符；
- 科学记数法里，e 或 E 前后不能有分隔符。

## Promise.any

Promise.any() 接收一个Promise可迭代对象，只要其中的一个 promise 成功，就返回那个已经成功的 promise 。如果可迭代对象中没有一个 promise 成功（即所有的 promises 都失败/拒绝），就返回一个失败的 promise

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



## WeakRefs

使用WeakRefs的Class类创建对对象的弱引用(对对象的弱引用是指当该对象应该被GC回收时不会阻止GC的回收行为)

## 逻辑运算符和赋值表达式（&&=，||=，??=）

逻辑运算符和赋值表达式，新特性结合了逻辑运算符（&&，||，??）和赋值表达式而JavaScript已存在的 复合赋值运算符有：

```js
a ||= b
//等价于
a = a || (a = b)

a &&= b
//等价于
a = a && (a = b)

a ??= b
//等价于
a = a ?? (a = b)

5. 数字分隔符
数字分隔符，可以在数字之间创建可视化分隔符，通过_下划线来分割数字，使数字更具可读性
const money = 1_000_000_000;
//等价于
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

```js
const a = { duration: 50 };

a.duration ??= 10;
console.log(a.duration);  // 50

a.speed ??= 25;
console.log(a.speed);  // 25
```

