# ECMAScript-7(ES2016)

## 提案



## Array.prototype.includes()

### 检测数组中是否包含某个值，返回布尔类型值

- 和ES5的indexOf()方法相似，不过返回值不一样

```js
// 语法
arr.includes(valueToFind[, fromIndex])
```

- `valueToFind`，需要查找的元素值。
- `fromIndex` 可选 从`fromIndex` 索引处开始查找 `valueToFind`。如果为负值（即从末尾开始往前跳 `fromIndex` 的绝对值个索引，然后往后搜寻）。默认为 0。

### 示例

```js
const mingzhu = ['西游记','红楼梦','三国演义','水浒传'];
console.log(mingzhu.includes('西游记'));
console.log(mingzhu.includes('金瓶梅'));
```

### 注意点

使用 `includes()`查找字符串是区分大小写的。

```js
const arr = ["es6", "es7", "es8", "a"];
console.log(arr.includes("A")); // false
```

使用 `includes()`只能判断简单类型的数据，对于复杂类型的数据，比如对象类型的数组，二维数组，这些是无法判断的.

```js
const arr = ['es6', ['es7', 'es8'], 'es9',{name:"jimmy"}]
console.log(arr.includes(["es7", "es8"])); // false
console.log(arr.includes({name:"jimmy"})); // false
```

能识别NaN，indexOf是不能识别NaN的

```js
const arr = ['es6', 'es7', NaN, 'es8']
console.log(arr.includes(NaN)) // true
console.log(arr.indexOf(NaN)) // -1
```

最后，如果只想知道某个值是否在数组中存在，而并不关心它的索引位置，建议使用includes()，如果想获取一个值在数组中的位置，那么使用indexOf方法。

## 指数操作符(幂运算)

在 ES7 中引入指数运算符「**」，用来实现幂运算，功能与 Math.pow 结果相同，如下：

```js
console.log(2 ** 10)

Math.pow(2, 10);
```

### 比如我们想求2的10次方

#### 自己写函数实现

```js
function pow(x, y) {
    let result = 1
    for (let i = 0; i < y; i++) {
        result *= x
    }
    return result
}
console.log(pow(2, 10)) // 1024
```

#### Math.pow()

```js
console.log(Math.pow(2, 10)); // 1024
```

#### 使用幂运算符 **

```js
console.log(2 ** 10); // 1024
```

**基本求幂**

```js
2 ** 3   // 8
3 ** 2   // 9
3 ** 2.5 // 15.588457268119896
10 ** -1 // 0.1
NaN ** 2 // NaN
```

**注意**

幂运算符的两个*号之间不能出现空格，否则语法会报错。
