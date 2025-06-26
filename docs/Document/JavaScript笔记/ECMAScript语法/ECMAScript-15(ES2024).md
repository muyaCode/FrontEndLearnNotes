# ECMAScript-15(ES2024)

ECMAScript 2024（ES15） 即将发布（2024年6月），新的版本带来了非常多全新的特性。其中有 5 个全新的 JS 方法。

## 提案

GitHub：https://github.com/tc39/proposal-temporal

文档：https://github.com/tc39/proposal-temporal

## Temporal

[2024 年 5 个令人兴奋的 JavaScript 新功能 - 掘金 (juejin.cn)](https://juejin.cn/post/7348832432080355379)

## 01：Promise.withResolvers

这个功能引入了一个新方法来创建一个 promise，直接返回 resolve 和 reject 的回调。使用 Promise.withResolvers ，我们可以创建直接在其执行函数之外 resolve 和 reject

```js
const [promise, resolve, reject] = Promise.withResolvers();

setTimeout(() => resolve('Resolved after 2 seconds'), 2000);

promise.then(value => console.log(value));
```

## 02：Object.groupBy()

Object.groupBy() 方法是一项新添加的功能，允许我们按照特定属性将数组中的 **对象分组**，从而使数据处理变得更加容易。

```js
const pets = [
  { gender: '男', name: '张三' },
  { gender: '女', name: '李四' },
  { gender: '男', name: '王五' }
];

const res = Object.groupBy(pets, pet => pet.gender);
console.log(res);
// 输出:
// {
//   女: [{ gender: '女', name: '李四' }]
//   男: [{ gender: '男', name: '张三' }, { gender: '男', name: '王五' }],
// }
```

## 03：Temporal

Temporal提案引入了一个新的API，以更直观和高效的方式 **处理日期和时间**。例如，Temporal API提供了新的日期、时间和持续时间的数据类型，以及用于创建、操作和格式化这些值的函数。

```js
const today = Temporal.PlainDate.from({ year: 2023, month: 11, day: 19 });
console.log(today.toString()); // 输出: 2023-11-19

const duration = Temporal.Duration.from({ hours: 3, minutes: 30 });
const tomorrow = today.add(duration);
console.log(tomorrow.toString()); // 输出: 2023-11-20
```

## 04：Records 和 Tuples

Records 和 Tuples 是全新的数据结构，提供了一种更简洁和类型安全的方式来创建对象和数组。

- Records 类似于对象，但具有具体类型的固定属性集。
- Tuples 类似于数组，但具有固定长度，每个元素可以具有不同类型。

```js
let record = #{
  id: 1,
  name: "JavaScript",
  year: 2024
};
console.log(record.name); // 输出: JavaScript
```

## 05：装饰器（Decorators）

装饰器（Decorators）是一种提议的语法，用于添加元数据或修改类、函数或属性的行为。装饰器可用于实现各种功能，如日志记录、缓存和依赖注入。

```js
function logged(target, key, descriptor) {
  const original = descriptor.value;
  descriptor.value = function(...args) {
    console.log(`Calling ${key} with`, args);
    return original.apply(this, args);
  };
  return descriptor;
}

class Example {
  @logged
  sum(a, b) {
    return a + b;
  }
}

const e = new Example();
e.sum(1, 2); // 输出：[1, 2]
```

## 其他

ES15 还提供了很多其他的新提案，比如：新的正则`v`、管道符`|>`、`String.prototype.isWellFormed()`、`ArrayBuffer.prototype.resize` 等等。大家有兴趣的同学可以额外到 mdn 网站上进行了解~~
