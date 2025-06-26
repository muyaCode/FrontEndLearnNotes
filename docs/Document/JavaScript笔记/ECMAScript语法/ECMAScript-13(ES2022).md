# ECMAScript-13(ES2022)

## 参考：

<https://mp.weixin.qq.com/s/mY_jVsjBEP7E1T4Lh-UwEA>

[总结11个ES2022中你可能遗漏的语法！！！ - 掘金 (juejin.cn)](https://juejin.cn/post/7129345014127132680)

[ECMA 2022 (es13) 新特性 - 掘金 (juejin.cn)](https://juejin.cn/post/7018182022954745870)

[ES2022新规发布，8个实用新功能 - 掘金 (juejin.cn)](https://juejin.cn/post/7119309621453389855)

[ECMAScript 2022 正式发布，有哪些新特性？ - 掘金 (juejin.cn)](https://juejin.cn/post/7112632005912690701)

[ES12 中 8 个很棒的新 JavaScript 语言特性 - 掘金 (juejin.cn)](https://juejin.cn/post/7098572094677450765)

[花十分钟，迅速了解ES13的全部特性 - 掘金 (juejin.cn)](https://juejin.cn/post/7113717200124379172)

## 提案



## class扩展

### 类成员声明

在`ES13`之前，我们只能在构造函数里面声明类的成员，而不能像其他大多数语言一样在类的最外层作用域里面声明成员。不过`ES13`出来之后，这都不算什么事儿了。现在我们终于可以突破这个限制，写下面这样的代码了：

```js
class Car {
  color = 'blue';
  age = 2;
}

const car = new Car();
console.log(car.color); // blue
console.log(car.age); // 2
```

### 私有属性和私有方法

`ES13`之前，我们是不可能给类定义私有成员的。所以一些程序员为了表示某个成员变量是一个私有属性，会给该属性名添加一个下划线(`_`)作为后缀。可是这只能作为程序员之间的君子之约来使用，因为这些变量其实还是可以被外界访问到的。不过在`ES13`中，我们只需要给我们的属性/方法添加一个`hashtag(#)`前缀，这个属性/方法就变成私有的了。当我们的属性变为私有后，任何外界对其的访问都会出错哦。

```js
class Person {
  #firstName = 'randy';
  #lastName = 'su';
  
  #say() {
    console.log('say hello')
  }

  get name() {
    this.#say();
    return `${this.#firstName} ${this.#lastName}`;
  }
}

const person = new Person();
console.log(person.name); // say hello randy su

// 下面都会报错
// SyntaxError: Private field '#firstName' must be
// declared in an enclosing class
console.log(person.#firstName);
console.log(person.#lastName);
console.log(person.#say);
```

### 静态私有属性和私有方法

跟私有属性和方法一样，我们只需要给我们的静态属性/方法添加一个`hashtag(#)`前缀，这个静态属性/方法就变成私有的了。只能在类内部访问啦。

类的静态方法可以使用`this`关键字访问其他的私有或者公有静态成员，而在类的实例方法中则可以通过`this.constructor`来访问这些静态属性.

```js
class Person {
  static #count = 0;

  static getCount() {
    return this.#count;
  }

  constructor() {
    this.constructor.#incrementCount();
  }

  static #incrementCount() {
    this.#count++;
  }
}

const person1 = new Person();
const person2 = new Person();

console.log(Person.getCount()); // 2

// 下面都会报错
console.log(Person.#count);
console.log(Person.#incrementCount);
```

### 判断是否有私有变量

前面我们说了，可以定义私有属性和方法，但是在外部是没办法直接访问的，那么我们怎么知道某对象是否具有某私有属性呢？

在`ES13`中，我们可以通过`in`操作符来判断对象是否具有某私有属性。

```js
class Car {
  #color;

  hasColor() {
    return #color in this;
  }
}

const car = new Car();
console.log(car.hasColor()); // true
```

### 支持定义静态代码块

`ES13`允许在类中通过`static`关键字定义一系列静态代码块，这些代码块只会在类被创造的时候**执行一次**。

一个类可以定义任意多的静态代码块，这些代码块会和穿插在它们之间的静态成员变量一起按照定义的顺序在类初始化的时候执行一次。我们还可以使用`super`关键字来访问父类的属性。

```js
class Vehicle {
  static defaultColor = 'blue';
}

class Car extends Vehicle {
  static colors = [];

  static {
    this.colors.push(super.defaultColor, 'red');
  }

  static {
    this.colors.push('green');
  }

  console.log(Car.colors); ['blue', 'red', 'green']
}
```

## Async Await扩展

### 支持在最外层写await

在`ES13`之前，我们的`await`必须写在`async`方法里面，否则会报错。但是`ES13`允许直接在最外层写`await`，是不是很爽呢？

```js
function setTimeoutAsync(timeout) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, timeout);
  })
}

await setTimeoutAsync(3000);
```

## Array和String扩展

### at函数

我们可以使用`at`函数来索引元素，支持数组和字符串。

```js
const arr = ['a', 'b', 'c', 'd'];

// 第一个元素
console.log(arr.at(0)); // a
// 倒数第一个元素
console.log(arr.at(-1)); // d
// 倒数第二个元素
console.log(arr.at(-2)); // c

const str = 'randy';

// 第一个元素
console.log(str.at(0)); // r
// 倒数第一个元素
console.log(str.at(-1)); // y
// 倒数第二个元素
console.log(str.at(-2)); // d
```

注意传正数从前往后找，下标从`0`开始。传负数从后往前找，下标从`-1`开始。

## RegExp扩展

### 支持返回开始和结束索引

简单来说这个新属性就是允许我们告诉`RegExp`在返回`match`对象的时候，给我们返回匹配到的子字符串的开始和结束索引。

`ES13`之前，我们只能获取正则表达式匹配到的子字符串的开始索引:

```js
const str = 'sun and moon';
const regex = /and/;
const matchObj = regex.exec(str);

// [ 'and', index: 4, input: 'sun and moon', groups: undefined ]
console.log(matchObj);
```

`ES13`后，我们就可以给正则表达式添加一个`d`的标记来让它在匹配的时候给我们既返回匹配到的子字符串的起始位置还返回其结束位置:

```js
const str = 'sun and moon';
const regex = /and/d;
const matchObj = regex.exec(str);
/**
[
  'and',
  index: 4,
  input: 'sun and moon',
  groups: undefined,
  indices: [ [ 4, 7 ], groups: undefined ]
]
 */
console.log(matchObj);
```

你看，设置完`d`标记后，多了一个`indices`的数组，里面就是匹配到的子字符串的范围了！

## Object扩展

### Object.hasOwn()

`Object.hasOwn()`函数接收两个参数，一个是对象，一个是属性，如果这个对象本身就有这个属性的话，这个函数就会返回`true`，否则就返回`false`。

```js
const obj = Object.create(null);
obj.color = 'green';
obj.age = 2;

console.log(Object.hasOwn(obj, 'color')); // true
console.log(Object.hasOwn(obj, 'name')); // false
```

好奇的小伙伴就会问了，不是有`hasOwnProperty()`可以判断某对象是否具有某属性吗？为什么还是要出一个这样的方法。

其实原因有两点，

1. `hasOwnProperty()`方法是`Object`原型上的方法，所以可以被覆盖，如果覆盖了就达不到我们想要的结果了。
2. 如果我们创建了一个原型为`null`的对象(`Object.create(null)`)，也会获取不到该方法而报错。

## Error扩展

### Error对象的cause属性

`ES13`后，`Error`对象多了一个`cause`属性来指明错误出现的原因。这个属性可以帮助我们为错误添加更多的上下文信息，从而帮助使用者们更好地定位错误。这个属性是我们在创建`error`对象时传进去的第二个参数对象的`cause`属性:

```js
function userAction() {
  try {
    apiCallThatCanThrow();
  } catch (err) {
    throw new Error('New error message', { cause: '请求出错啦' });
  }
}

try {
  userAction();
} catch (err) {
  console.log(err);
  console.log(`Cause by: ${err.cause}`); // Cause by: 请求出错啦
}
```

