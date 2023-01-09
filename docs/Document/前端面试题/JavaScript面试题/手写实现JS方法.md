# 手写实现JS方法

## 实现JavaScript的深拷贝

### ES5深拷贝函数封装

```js
// ES5实现深拷贝
function deepClone(origin, target) {
 var tar = target || {};
 var toStr = Object.prototype.toString;
 var arrType = "[object Array]"; 

 for (var k in origin) {
  if (origin.has0wnProperty(k)) { // 对象自身属性中是否具有指定的k属性
   if (typeof origin[k] === "object" && origin[k] !== null) {
        // toString方法通过call调用之后 === arrType 就是数组，如果是"[object object]"就是对象
    tar[k] = toStr.call(origin[k]) === arrType ? [] : {};
    deepClone(origin[k], tar[k]);
   } else {
    tar[k] = origin[k];
   }
  }
 }

 return tar;
}
```

---

WeakMap知识铺垫：[WeakMap - JavaScript | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)

new WeakMap()实例化后使用set方法，是弱引用，一引用了元素，引用便回断开，元素就会被内存垃圾回收，不占用内存（设置弱引用，在new WeakMap()实例化的内存中存起来，引用后会删掉节点，节省内存）

`Map` 和 `WeakMap` 是两种数据结构，可用于操纵键和值之间的关系。

区别：

我们可以对 `Map` 的键和值使用对象或任何基本类型。

但是，`WeakMap` 仅接受对象。这意味着我们不能将基本类型用作 `WeakMap` 的键。

```js
const attrs = new WeakMap()

attrs.set('color', 'plum') // error
```

与 `Map`不同，`WeakMap` 不支持对键和值进行迭代。无法获取 `WeakMap` 的所有键或值。此外，也没有办法清除 `WeakMap`。

**最重要的区别是，`WeakMap` 不会阻止在没有对键的引用时对键进行垃圾收集。**

另一方面，`Map` 无限期地维护对键和值的引用。一旦创建了键和值，它们将占用内存，即使没有对它们的引用，也不会被垃圾收集。这可能会导致内存泄漏问题。

考虑下面的一个简单代码，我们将一个唯一的 ID 映射到特定的人的信息：

```js
let id = { value: 1 }

const people = new Map()
people.set(id, {
  name: 'Foo',
  age: 20,
  address: 'Bar'
})

// 移除 id
id = null
```

删除键对象 `id` 后，它仍然能够通过映射键访问其引用：

```js
people.keys().next().value // { value: 1 }
```

由于这种差异，`WeakMap`（顾名思义）保存对键的弱引用。它解释了为什么它的键不可枚举，这在前面的区别中已经提到。

由于 `WeakMap` 保存对键的弱引用，且无法枚举，因此无法使用 `keys()`、`values()`、`entries()` 这些方法。

### ES6实现深拷贝

```js
// ES6实现深拷贝
function deepClone(origin, hashMap = new WeakMap()) {
 if (origin == undefined || typeof origin !== 'object') {
    return origin
  }
  // 如果是时间构造函数
  if (origin instanceof Date) {
    return new Date(origin);
  }
  // 如果是正则构造函数
  if (origin instanceof RegExp) {
    return new RegExp(origin);
  }

  // 判断是否弱引用，两个对象-相互把对方作为键名赋值给对方
  const hashKey = hashMap.get(origin);
  if(hashKey) {
    return hashKey
  }
  // 执行继承来的构造器，实例化构造器得到新的对象，就不用判断
  const target = new origin.constructor();
  // 设置弱引用，引用后会删掉节点，节省内存
  hashMap.set(origin, target);
  for (let k in origin) {
    if (origin.hasOwnProperty(k)) { // 对象自身属性中是否具有指定的k属性
      target[k] = deepClone(origin[k], hashMap); // 递归再赋值
    }
  }

  return target;
}
```

## 实现数组方法

### 实现数组forEach方法

```js
// 实现forEach方法
Array.prototype.myForEach = function (cb) {
  var _arr = this;
  var _len = _arr.length;
  var _arg2 = arguments[1] || window; // 剩余第二个参数，如果没有第二个参数，就指向window

  for (var i = 0; i < _len; i++) {
    // 回调函数apply调用，this指向更改成剩余参数_arg2或者window
    cb.apply(_arg2, [_arr[i], i, _arr]); // apply的第二个参数数组里面的，就是回调函数的参数
  }
}
```

### 实现map方法

```js
// 实现map方法
Array.prototype.myMap = function (cb) {
  var _arr = this;
  var _len = _arr.length;
  var _arg2 = arguments[1] || window; // 剩余第二个参数，如果没有第二个参数，就指向window
  var _newArr = [];
  var _item;
  var _res;

  for (var i = 0; i < _len; i++) {
    _item = deepClone(_arr[i]); // 结合上面的深拷贝方法
    // 回调函数apply调用，this指向更改成剩余参数_arg2或者window
    // apply的第二个参数数组里面的，就是回调函数的参数
    _res = cb.apply(_arg2, [_item, i, _arr]);

    _res &&_newArr.push(_res); // 是否有返回值才执行push
    
  }
  return _newArr;
}
```

### 实现filter方法

```js
// 实现filter方法
Array.prototype.myFilter = function (cb) {
  var _arr = this;
  var _len = _arr.length;
  var _arg2 = arguments[1] || window; // 剩余第二个参数，如果没有第二个参数，就指向window
  var _newArr = [];
  var _item;

  for (var i = 0; i < _len; i++) {
    _item = deepClone(_arr[i]); // 深拷贝
    // 回调函数apply调用，this指向更改成剩余参数_arg2或者window
    // apply的第二个参数数组里面的，就是回调函数的参数
    cb.apply(_arg2, [_item, i, _arr]) ? _newArr.push(_item) : '';
  }
  return _newArr;
}
```

### 实现evey方法

```js
// 实现every方法
Array.prototype.myEvery = function (cb) {
  var _arr = this;
  var _len = _arr.length;
  var _arg2 = arguments[1] || window; // 剩余第二个参数，如果没有第二个参数，就指向window
  var _res = true;

  for (var i = 0; i < _len; i++) {
    if(!cb.apply(_arg2, [_arr[i], i, _arr])) {
      _res = false;
      break;
    }
  }
  return _res;
}
```

### 实现some方法

```js
// 实现some方法
Array.prototype.mySome = function (cb) {
  var _arr = this;
  var _len = _arr.length;
  var _arg2 = arguments[1] || window; // 剩余第二个参数，如果没有第二个参数，就指向window
  var _res = false;

  for (var i = 0; i < _len; i++) {
    if(cb.apply(_arg2, [_arr[i], i, _arr])) {
      _res = true;
      break;
    }
  }
  return _res;
}
```

### 实现reduce与reduceRight方法

```js
// 实现reduce方法
Array.prototype.myReduce = function (cb, initialValue) {
  var _arr = this;
  var _len = _arr.length;
  // 如果有第三个参数就指向它，没有就指向window
  var _arg3 = arguments[2] || window;
  var _item;

  for (var i = 0; i < _len; i++) {
    _item = deepClone(_arr[i]); // 深克隆
    // 指向_arg3
    initialValue = cb.apply(_arg3, [initialValue, _item, i, _arr]);
  }
  return initialValue;
}

// 实现reduceRight方法
Array.prototype.myReduceRight = function (cb, initialValue) {
  var _arr = this;
  var _len = _arr.length;
  // 如果有第三个参数就指向它，没有就指向window
  var _arg3 = arguments[2] || window;
  var _item;

  for (var i = _len - 1; i >= 0; i--) { // 倒叙插入
    _item = deepClone(_arr[i]); // 深克隆
    // 指向_arg3的this，并传四个参数回去
    initialValue = cb.apply(_arg3, [initialValue, _item, i, _arr]);
  }
  return initialValue;
}
```

### 所有的重写实现数组方法练习

index.html：

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>js的底层方法实现</title>
</head>
<body>
  
</body>
<script src="./utils.js"></script>
<script src="./index.js"></script>
</html>
```

utils.js：重写工具方法

```js
// ES6实现深拷贝
function deepClone(origin, hashMap = new WeakMap()) {
 if (origin == undefined || typeof origin !== 'object') {
    return origin
  }
  // 如果是时间构造函数
  if (origin instanceof Date) {
    return new Date(origin);
  }
  // 如果是正则构造函数
  if (origin instanceof RegExp) {
    return new RegExp(origin);
  }

  // 判断是否弱引用，两个对象-相互把对方作为键名赋值给对方
  const hashKey = hashMap.get(origin);
  if(hashKey) {
    return hashKey
  }
  // 执行继承来的构造器，实例化构造器得到新的对象，就不用判断
  const target = new origin.constructor();
  // 设置弱引用，引用后会删掉节点，节省内存
  hashMap.set(origin, target);
  for (let k in origin) {
    if (origin.hasOwnProperty(k)) { // 对象自身属性中是否具有指定的k属性
      target[k] = deepClone(origin[k], hashMap); // 递归再赋值
    }
  }

  return target;
}

// 实现forEach方法
Array.prototype.myForEach = function (cb) {
  var _arr = this;
  var _len = _arr.length;
  var _arg2 = arguments[1] || window; // 剩余第二个参数，如果没有第二个参数，就指向window

  for (var i = 0; i < _len; i++) {
    // 回调函数apply调用，this指向更改成剩余参数_arg2或者window
    cb.apply(_arg2, [_arr[i], i, _arr]); // apply的第二个参数数组里面的，就是回调函数的参数
  }
}

// 实现map方法
Array.prototype.myMap = function (cb) {
  var _arr = this;
  var _len = _arr.length;
  var _arg2 = arguments[1] || window; // 剩余第二个参数，如果没有第二个参数，就指向window
  var _newArr = [];
  var _item;
  var _res;

  for (var i = 0; i < _len; i++) {
    _item = deepClone(_arr[i]); // 结合上面的深拷贝方法
    // 回调函数apply调用，this指向更改成剩余参数_arg2或者window
    // apply的第二个参数数组里面的，就是回调函数的参数
    _res = cb.apply(_arg2, [_item, i, _arr]);

    _res &&_newArr.push(_res); // 是否有返回值才执行push
    
  }
  return _newArr;
}

// 实现filter方法
Array.prototype.myFilter = function (cb) {
  var _arr = this;
  var _len = _arr.length;
  var _arg2 = arguments[1] || window; // 剩余第二个参数，如果没有第二个参数，就指向window
  var _newArr = [];
  var _item;

  for (var i = 0; i < _len; i++) {
    _item = deepClone(_arr[i]); // 深拷贝
    // 回调函数apply调用，this指向更改成剩余参数_arg2或者window
    // apply的第二个参数数组里面的，就是回调函数的参数
    cb.apply(_arg2, [_item, i, _arr]) ? _newArr.push(_item) : '';
  }
  return _newArr;
}

// 实现every方法
Array.prototype.myEvery = function (cb) {
  var _arr = this;
  var _len = _arr.length;
  var _arg2 = arguments[1] || window; // 剩余第二个参数，如果没有第二个参数，就指向window
  var _res = true;

  for (var i = 0; i < _len; i++) {
    if(!cb.apply(_arg2, [_arr[i], i, _arr])) {
      _res = false;
      break;
    }
  }
  return _res;
}

// 实现some方法
Array.prototype.mySome = function (cb) {
  var _arr = this;
  var _len = _arr.length;
  var _arg2 = arguments[1] || window; // 剩余第二个参数，如果没有第二个参数，就指向window
  var _res = false;

  for (var i = 0; i < _len; i++) {
    if(cb.apply(_arg2, [_arr[i], i, _arr])) {
      _res = true;
      break;
    }
  }
  return _res;
}

// 实现reduce方法
Array.prototype.myReduce = function (cb, initialValue) {
  var _arr = this;
  var _len = _arr.length;
  // 如果有第三个参数就指向它，没有就指向window
  var _arg3 = arguments[2] || window;
  var _item;

  for (var i = 0; i < _len; i++) {
    _item = deepClone(_arr[i]); // 深克隆
    // 指向_arg3
    initialValue = cb.apply(_arg3, [initialValue, _item, i, _arr]);
  }
  return initialValue;
}

// 实现reduceRight方法
Array.prototype.myReduceRight = function (cb, initialValue) {
  var _arr = this;
  var _len = _arr.length;
  // 如果有第三个参数就指向它，没有就指向window
  var _arg3 = arguments[2] || window;
  var _item;

  for (var i = _len - 1; i >= 0; i--) { // 倒叙插入
    _item = deepClone(_arr[i]); // 深克隆
    // 指向_arg3的this，并传四个参数回去
    initialValue = cb.apply(_arg3, [initialValue, _item, i, _arr]);
  }
  return initialValue;
}
```

index.js：调用比较

```js
var obj = {
  name: 'Jacky',
  age: 8
}
var arr = [
  {
    name: '周一',
    age: 20
  },
  {
    name: '刘二',
    age: 28
  },
  {
    name: '张三',
    age: 25
  },

  {
    name: '李四',
    age: 30
  },
  {
    name: '王五',
    age: 27
  },
  {
    name: '赵六',
    age: 36
  },
  {
    name: '胡七',
    age: 35
  },
]


// forEach方法输出
// arr.forEach(function (item, index , array) {
//   console.log(this.name);
//   console.log(item, index, array);
// }, obj);

// console.log('------');

// arr.myForEach(function (item, index , array) {
//   console.log(this.name);
//   console.log(item, index, array);
// }, obj);


// map方法输出
// var newArr = arr.map(function (item, index , array) {
//   console.log(this);
//   console.log(item, index, array);
//   return item;
// }, obj);
// console.log(newArr);

// console.log('----------');

// var newArr2 = arr.myMap(function (item, index , array) {
//   console.log(this);
//   console.log(item, index, array);
//   return item;
// }, obj);
// console.log(newArr2);


// filter方法输出
// var newArr = arr.filter(function (item, index , array) {
//   console.log(this);
//   return item.age > 30;
// }, obj);
// console.log(newArr);

// console.log('----------');

// var newArr2 = arr.myFilter(function (item, index , array) {
//   console.log(this);
//   return item.age > 30;
// }, obj);
// console.log(newArr2);


// every方法输出
// var res = arr.every(function (item, index , array) {
//   console.log(this);
//   return item.age < 40;
// }, obj);
// console.log(res);

// console.log('------');

// var res2 = arr.myEvery(function (item, index , array) {
//   console.log(this);
//   return item.age < 40;
// }, obj);
// console.log(res2);


// some方法输出
// var res = arr.some(function (item, index , array) {
//   console.log(this);
//   return item.age < 40;
// }, obj);
// console.log(res);

// console.log('------');

// var res2 = arr.mySome(function (item, index , array) {
//   console.log(this);
//   return item.age < 40;
// }, obj);
// console.log(res2);

// reduce方法输出
// var initialValue = [
//   {
//     name: '大哥',
//     age: 18
//   }
// ];
// var newArr = arr.reduce(function (prev, item, index, array) {
//   console.log(this);
//   item.age >= 25 && prev.push(item);
//   return prev;
// }, initialValue, obj);

// console.log(newArr);

// console.log('----------');

// var initialValue2 = [
//   {
//     name: '二哥',
//     age: 18
//   }
// ];
// var newArr2 = arr.myReduce(function (prev, item, index, array) {
//   console.log(this);
//   item.age >= 25 && prev.push(item);
//   return prev;
// }, initialValue2, obj);

// console.log(newArr2);

// reduceRight方法输出
var initialValue = [
  {
    name: '大哥',
    age: 18
  }
];
var newArr = arr.reduceRight(function (prev, item, index, array) {
  console.log(this);
  item.age >= 25 && prev.push(item);
  return prev;
}, initialValue);

console.log(newArr);

console.log('----------');

var initialValue2 = [
  {
    name: '二哥',
    age: 18
  }
];
var newArr2 = arr.myReduceRight(function (prev, item, index, array) {
  console.log(this);
  item.age >= 25 && prev.push(item);
  return prev;
}, initialValue2);

console.log(newArr2);
```

## 原型和原型链

Function和Object的特殊性

```js
// Function object: 函数 对象，Test是构造函数
console.log(Test.__proto__ === Function.prototype); // true

// const Test = new Function()
console.log(Function.__proto__);
console.log(Function.prototype);
console.log(Function._proto === Function.prototype); // true

// const obj = {};
//const obj = new Object(); // function

console.log(typeof Object);
console.log(Object.__proto__ === Function.prototype); // true
console.log(Object.__proto__ === Function.__proto__); // true
```
