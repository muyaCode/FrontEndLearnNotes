# ECMAScript-10(ES2019)

## 提案



## 新特性

- `Array.prototype.{flat, flatMap}`扁平化嵌套数组
- Object.fromEntries
- `String.prototype.{trimStart, trimEnd}`
- Symbol.prototype.description
- Optional catch binding
- Array.prototype.sort() is now required to be stable

## 对象方法扩展

### Object.fromEntries 二维数组转换为对象

#### 二维数组转对象

```js
const result = Object.fromEntries([
    ['name','黎明'],
    ['xueke', 'Java,大数据,前端,云计算']
]);
console.log(result)
```

#### Map对象

```js
const m = new Map();
m.set('name','ATGUIGU');
const result = Object.fromEntries(m);
```

`fromEntries()` 方法会把键值对列表转换成一个对象

**返回值：** 一个新的对象

**语法：**

```js
Object.fromEntries(iterable)
```

- iterable: Array、Map等可迭代对象

**举例：**

```js
let map = new Map([['a', 1], ['b', 2]]);
let mapToObj = Object.fromEntries(map);
console.log(mapToObj);  // {a: 1, b: 2}

let arr = [['a', 1], ['b', 2]];
let arrToObj = Object.fromEntries(arr);
console.log(arrToObj);   // {a: 1, b: 2}

let obj = {a: 1, b: 2};
let newObj = Object.fromEntries(
  Object.entries(obj).map(
    ([key, val]) => [key, val * 2]
  )
);
console.log(newObj);   // {a: 2, b: 4}
```



#### Object.entries(ES8) 对象转二维数组

```js
//Object.entries ES8
const arr = Object.entries({
  name: "小明"
})
console.log(arr);
```

## 字符串方法扩展 `String.prototype.{trimStart, trimEnd}`

清除字符串左侧（最前）和右侧（最后）的空格

### trimStart 和 trimEnd

```js
let str = '   iloveyou   ';

console.log(str);
console.log(str.trimStart());
console.log(str.trimEnd());
```

### `String.prototype.trimStart`

`trimStart()` 方法用来删除字符串的开头的空白字符。

`trimLeft()` 是它的别名。

**返回值：** 一个新的字符串，这个字符串左边的空格已经被去除掉了。

**语法：**

```js
str.trimStart();
str.trimLeft();
```

**举例：**

```js
let str = '    a b cd  ';
str.trimStart();   // 'a b cd  '
str.trimLeft();    // 'a b cd  '
```

### `String.prototype.trimEnd`

`trimEnd()` 方法用来删除字符串末尾的空白字符。

`trimRight()` 是它的别名

**返回值：** 一个新的字符串，这个字符串右边的空格已经被去除了

**语法：**

```js
str.trimEnd()
str.trimRight()
```

**举例：**

```js
let str = '    a b cd  ';
str.trimEnd();                           // '    a b cd'
str.trimRight();                         // '    a b cd'
```

## 数组方法扩展 `Array.prototype.{flat, flatMap}` (扁平化嵌套数组)

### Array.flat 将多维数组转化为低维数组

```js
// 将多维数组转化为低维数组
const arr = [1,2,3,4,[5,6]];
const arr = [1,2,3,4,[5,6,[7,8,9]]];
// 参数为深度 是一个数字
console.log(arr.flat(2)); 

const arr = [1, 2, [[[[3, 4]]]]];

arr.flat();          // [1, 2, [[[3, 4]]]]
arr.flat(3);         // [1, 2, [3, 4]]
arr.flat(-1);        // [1, 2, [[[[3, 4]]]]]
arr.flat(Infinity);  // [1, 2, 3, 4]
```

`flat()`方法会按照一个可指定的深度遍历递归**数组**，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回。

**返回值：** 一个新数组，不会改变旧数组。

**语法：** `arr.flat([depth]);`

- `depth` 是数组遍历的深度，默认是1。

**举例：**

```js
const arr = [1, 2, [[[[3, 4]]]]];

arr.flat();          // [1, 2, [[[3, 4]]]]
arr.flat(3);         // [1, 2, [3, 4]]
arr.flat(-1);        // [1, 2, [[[[3, 4]]]]]
arr.flat(Infinity);  // [1, 2, 3, 4]
```

**⚠️ 注意：**

- `flat()`会移除数组中的空项

```js
let arr = [1, 2, , , 3];
arr.flat();           // [1, 2, 3]
```

#### 手撕 flat

```js
function customFlat(arr, depth = 1) {
    if(!Array.isArray(arr) || depth <= 0) {
        return arr;
    }
    return arr.reduce((pre, cur) => {
        if(Array.isArray(arr)) {
           return pre.concat(customFlat(cur, depth - 1));
        }
        return pre.concat(cur);
    }, []);
}
```

#### 替换

- `reduce`与`concat`

```js
let arr = [1, 2, [3, 4]];
arr.reduce((arr, val) => arr.concat(val), []);
```

- `...` 扩展运算符与`concat`

```js
let arr = [1, 2, [3, 4]];
[].concat(...arr);
```

[Array.prototype.flat() - JavaScript | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/flat)

### Array.flatMap (相当于flat和Map方法结合) 将多维数组转化为一维数组

```js
const arr = [1,2,3,4];
const result = arr.flatMap(item => [item * 10]);
console.log(result);
```

`flatMap()`方法首先使用映射函数映射数组（**深度值为1**）的每个元素，然后将结果压缩成一个新数组。

**返回值：** 一个新数组，并且每个元素都是回调函数的结果。

**语法：**

```js
arr.flatMap(function callback(currentVal[, index[, array]]) {

}[, thisArg])
```

- callback: 可以生成一个新数组所调用的函数
  - currentVal: 当前数组在处理的元素
  - index: 可选，正在处理的元素索引
  - array: 可选，被调用的数组
- thisArg: 执行callback函数时使用的this值

**举例：**

```js
let arr = ['My name', 'is', '', 'Lisa'];
let newArr1 = arr.flatMap(cur => cur.split(' '));  // ["My", "name", "is", "", "Lisa"]
let newArr2 = arr.map(cur => cur.split(' '));  // [["My", "name"], ["is"], [""], ["Lisa"]]
```



## Symbol.prototype.description (获取Symbol的字符串描述)

```js
//创建 Symbol
let s = Symbol('尚硅谷');
console.log(s.description);
```

`description` 是一个只读属性

**返回值：** 它返回Symbol对象的可选描述的字符串

**语法：**

```js
Symbol('myDescription').description;
Symbol.iterator.description;
Symbol.for('foo').description;
```

**举例：**

```js
Symbol('foo').description;      // 'foo'
Symbol().description;           // undefined
Symbol.for('foo').description;  // 'foo'
```

## `Optional catch binding`

可选的捕获绑定，允许省略catch绑定和它后面的圆括号

以前的用法：

```js
try {

} catch(err) {
  console.log('err', err);
}
```

ES10 的用法：

```js
try {

} catch {

}
```

## `JSON.stringify()` 的增强力

`JSON.stringify()` 在 ES10 修复了对于一些超出范围的 Unicode 展示错误的问题，所以遇到 0xD800-0xDFF 之内的字符会因为无法编码成 UTF-8 进而导致显示错误。

在 ES10 它会用转义字符的方式来处理这部分字符而非编码的方式，这样就会正常显示了。

```js
JSON.stringify('😊'); // '"😊"'
```

## 修订 `Function.prototype.toString()`

以前的 toString 方法来自 `Object.prototype.toString()`，现在 的 `Function.prototype.toString()` 方法返回一个表示当前函数源代码的字符串。以前只会返回这个函数，不会包含空格、注释等。

```js
function foo() {
    // es10新特性
    console.log('imooc')
}
console.log(foo.toString());
// function foo() {
//     // es10新特性
//     console.log('imooc')
// }
```

