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

方法 Object.fromEntries() 把键值对列表转换为一个对象，这个方法是和 Object.entries() 相对的。

#### 案例1：Object 转换操作

```js
const obj = {
    name: 'jimmy',
    age: 18
}
const entries = Object.entries(obj)
console.log(entries)
// [Array(2), Array(2)]

// ES10
const fromEntries = Object.fromEntries(entries)
console.log(fromEntries)
// {name: "jimmy", age: 18}
```

#### 二维数组转对象

```js
const result = Object.fromEntries([
    ['name','黎明'],
    ['xueke', 'Java,大数据,前端,云计算']
]);
console.log(result)
```

#### Map对象转 Object

```js
const m = new Map();
m.set('name','ATGUIGU');
map.set('age', 18);
const result = Object.fromEntries(m);
console.log(result)
```

#### `fromEntries()` 方法会把键值对列表转换成一个对象

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

#### 案例3：过滤

course表示所有课程，想请求课程分数大于80的课程组成的对象：

```js
const course = {
    math: 80,
    english: 85,
    chinese: 90
}
const res = Object.entries(course).filter(([key, val]) => val > 80)
console.log(res) // [ [ 'english', 85 ], [ 'chinese', 90 ] ]
console.log(Object.fromEntries(res)) // { english: 85, chinese: 90 }
```

#### 案例4：url的search参数转换

```js
// let url = "https://www.baidu.com?name=jimmy&age=18&height=1.88"
// queryString 为 window.location.search
const queryString = "?name=jimmy&age=18&height=1.88";
const queryParams = new URLSearchParams(queryString);
const paramObj = Object.fromEntries(queryParams);
console.log(paramObj); // { name: 'jimmy', age: '18', height: '1.88' }
```

## 字符串方法扩展 `String.prototype.{trimStart, trimEnd}`

清除字符串左侧（最前）和右侧（最后）的空格

### trimStart() 和 trimEnd()

```js
let str = '   iloveyou   ';

console.log(str);
console.log(str.trimStart());
console.log(str.trimEnd());
```

### String.prototype.trimStart()

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

### String.prototype.trimEnd()

`trimEnd()` 方法：用来删除字符串末尾的空白字符。

trimRight 是 trimEnd 的别名。

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

### 语法

```js
let newArray = arr.flat([depth])
```

- `depth` 可选 指定要提取嵌套数组的结构深度，默认值为 1。

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

## Array.flatMap (相当于flat和Map方法结合) 将多维数组转化为一维数组

flatMap() 方法首先使用映射函数映射每个元素，然后将结果压缩成一个新数组。从方法的名字上也可以看出来它包含两部分功能一个是 map，一个是 flat（深度为1）。

```js
// 示例
const arr = [1,2,3,4];
const result = arr.flatMap(item => [item * 10]);
console.log(result);
```

`flatMap()`方法首先使用映射函数映射数组（**深度值为1**）的每个元素，然后将结果压缩成一个新数组。

**返回值：** 一个新数组，并且每个元素都是回调函数的结果。

**语法：**

```js
// 语法
var new_array = arr.flatMap(function callback(currentValue[, index[, array]]) {
    // 返回新数组的元素
}[, thisArg])
```

- callback: 可以生成一个新数组所调用的函数
  - currentVal: 当前数组在处理的元素
  - index: 可选，正在处理的元素索引
  - array: 可选，被调用的数组
- thisArg: 执行callback函数时使用的this值

#### 举例1：

```js
let arr = ['My name', 'is', '', 'Lisa'];
let newArr1 = arr.flatMap(cur => cur.split(' '));  // ["My", "name", "is", "", "Lisa"]
let newArr2 = arr.map(cur => cur.split(' '));  // [["My", "name"], ["is"], [""], ["Lisa"]]
```

#### 举例2：

```js
const numbers = [1, 2, 3]
numbers.map(x => [x * 2]) // [[2], [4], [6]]
numbers.flatMap(x => [x * 2]) // [2, 4, 6]
```

这个示例可以简单对比下 map 和 flatMap 的区别。当然还可以看下下面的示例：

```js
let arr = ['今天天气不错', '', '早上好']
arr.map(s => s.split(''))
// [["今", "天", "天", "气", "不", "错"],[""],["早", "上", "好"]]
arr.flatMap(s => s.split(''))
// ["今", "天", "天", "气", "不", "错", "", "早", "上", "好"]
```

`flatMap` 方法与 `map` 方法和深度depth为1的 `flat` 几乎相同。

## Symbol.prototype.description (获取Symbol的字符串描述)

Symbol 的描述只被存储在内部的 `Description` ，没有直接对外暴露，我们只有调用 Symbol 的 toString() 时才可以读取这个属性：

```js
const name = Symbol('es');
console.log(name.toString()); // Symbol(es)
console.log(name); // Symbol(es)
console.log(name === 'Symbol(es)'); // false
console.log(name.toString() === 'Symbol(es)'); // true
```

现在可以通过 description 方法获取 Symbol 的描述:

```js
const name = Symbol('es')
console.log(name.description) // es
name.description = "es2" // 只读属性 并不能修改描述符
console.log(name.description === 'es') // true
// 如果没有描述符 输入undefined
const s2 = Symbol()
console.log(s2.description) // undefined
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

## 可选的Catch Binding

可选的捕获绑定，允许省略catch绑定和它后面的圆括号。

在 ES10 之前我们都是这样捕获异常的：

```js
try {

} catch(err) {
  console.log('err', err);
}
```

在这里 err 是必须的参数，在 ES10 可以省略这个参数：

```js
try {
    console.log('Foobar')
} catch {
    console.error('Bar')
}
```

### 应用

**验证参数是否为json格式**

这个需求我们只需要返回true或false，并不关心catch的参数。

```js
const validJSON = json => {
    try {
        JSON.parse(json)
        return true
    } catch {
        return false
    }
}
```

## JSON.stringify() 的增强力

`JSON.stringify()` 在 ES10 修复了对于一些超出范围的 Unicode 展示错误的问题，所以遇到 0xD800-0xDFF 之内的字符会因为无法编码成 UTF-8 进而导致显示错误。

在 ES10 它会用转义字符的方式来处理这部分字符而非编码的方式，这样就会正常显示了。

```js
JSON.stringify('😊'); // '"😊"'

// \uD83D\uDE0E  emoji 多字节的一个字符
console.log(JSON.stringify('\uD83D\uDE0E')) // 打印出笑脸

// 如果我们只去其中的一部分  \uD83D 这其实是个无效的字符串
// 之前的版本 ，这些字符将替换为特殊字符，而现在将未配对的代理代码点表示为JSON转义序列
console.log(JSON.stringify('\uD83D')) // "\ud83d"
```

## 修订 Function.prototype.toString()

以前的 toString 方法来自 `Object.prototype.toString()`，现在 的 `Function.prototype.toString()` 方法返回一个表示当前函数源代码的字符串。以前只会返回这个函数，不会包含空格、注释等。

```js
function foo() {
    // es10新特性
    console.log('imooc')
}
console.log(foo.toString());
// 打印如下：
// function foo() {
//     // es10新特性
//     console.log('imooc')
// }
```

将返回注释、空格和语法等详细信息。
