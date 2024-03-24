# ECMAScript-7(ES2016)

## 提案



## Array.includes

- 检测数组中是否包含某个元素，返回布尔类型值

- 跟ES5-indexOf()方法相似，不过返回值不一样

```js
const mingzhu = ['西游记','红楼梦','三国演义','水浒传'];
console.log(mingzhu.includes('西游记'));
console.log(mingzhu.includes('金瓶梅'));
```

## 指数操作符(幂运算)

在 ES7 中引入指数运算符「**」，用来实现幂运算，功能与 Math.pow 结果相同

```js
console.log(2 ** 10)

Math.pow(2, 10);
```
