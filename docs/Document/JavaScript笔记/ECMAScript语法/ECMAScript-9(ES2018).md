# ECMAScript-9(ES2018)

## 提案



## 新特性

- `Async iterators` 异步迭代器
- `Object rest properties` 剩余属性
- `Object spread properties` 扩展属性
- `Promise.prototype.finally`

## 对象的方法扩展

rest 剩余参数与 spread 扩展运算符在 ES6 中已经引入，不过 ES6 中只针对于数组， 在 ES9 中为对象提供了像数组一样的 rest 参数和扩展运算符

### rest剩余参数：...user

```js
// rest剩余参数...user
function connect({host, port, ...user}) {
   console.log(host);
   console.log(port);
   console.log(user);
}
connect({
   host: '127.0.0.1',
   port: 3306,
   username: 'root',
   password: 'root',
   type: 'master'
});
```

#### `Object rest properties`

**举例：**

```js
let test = {
  a: 1,
  b: 2,
  c: 3,
  d: 4
}

let {a, b, ...rest} = test;

console.log(a);               // 1
console.log(b);               // 2
console.log(rest);            // {c: 3, d: 4}
```

**⚠️ 注意：**

- `null` 不能使用扩展运算符

```js
let {a, b, ...rest} = null;    // ❌
```

### spread扩展运算符

```js
const skillOne = {
    q:'天音波'
}
const skillTwo = {
    q:'金钟罩'
}
const skillThree = {
    q:'天雷破'
}
const skillFour= {
    q:'猛龙摆尾'
}

const mangseng = {
    ...skillOne , ...skillTwo , 
    ...skillThree , ...skillFour 
}
// 合并的对象打印
console.log(mangseng);
```

**举例：**

```js
let test = {
  a: 1,
  b: 2
}
let result = {c: 3, ...test};
console.log(result);             // {c: 3, a: 1, b: 2}


let test = null;
let result = {c: 3, ...test};    // {c: 3}
```



## 正则表达式扩展

### 命名捕获组

ES9 允许命名捕获组使用符号『`?<name>`』,这样获取捕获结果可读性和可维护性更强

原来提取url例子

```js
let str = '哈哈哈';
// 提取 url 与 [标签文本]
const reg = /(.*)<\/a>/;
// 执行
const result = reg.exec(str);
// 打印输出
console.log(result[1]);
console.log(result[2]);
```

命名捕获组代码例子

```js
let str = '哈哈哈';
// 提取 url 与 [标签文本]
const reg = /.*)">(?<text>.*)<\/a>/;
// 执行
const result = reg.exec(str);
// 打印输出
console.log(result.groups.url);
console.log(result.groups.text);
```

分组名字：`?<url>`

### 反向断言

ES9 支持反向断言，通过对匹配结果前面的内容进行判断，对匹配进行筛选。

正向断言代码例子 (以前的语法)

```js
//声明字符串
let str = 'JS5211314 你知道么 555 啦啦啦';

//正向断言
const reg = /\d+(?=啦)/;
const result = reg.exec(str);
```

反向断言代码例子

```js
//声明字符串
let str = 'JS5211314 你知道么 555 啦啦啦';

//反向断言
const reg = /(?<=么)\d+/;
const result = reg.exec(str);
console.log(result);
```

### dotAll 模式

正则表达式中点.匹配除回车外的任何单字符，标记『s』改变这种行为，允许行终止符出现

代码例子

```js
let str = `

 
 肖生克的救赎
 上映日期: 1994-09-10
 
 
 阿甘正传
 上映日期: 1994-07-06
 
`;

// 声明正则
// 旧的正则：缺点，匹配多个这种形式的内容结构会很麻烦
// const reg = /\s+(.*?)<\/a>\s+(.*?)<\/p>/;
// dotAll 模式：.*     g：全局匹配
const reg = /.*?(.*?)<\/a>.*?(.*?)<\/p>/gs;
//执行匹配
const result = reg.exec(str);
let result;
let data = [];
while(result = reg.exec(str)){
 data.push({title: result[1], time: result[2]});
}
//输出结果
console.log(data);
```

爬虫爬取的时候把元素里内容的提取

## 异步迭代 for await of

## `Async iterators` 异步迭代器

**返回值：** `Async iterator` 对象的 next() 方法返回一个 `Promise`，这个 `Promise` 的返回值可以被解析成 `{value, done}` 的格式，

**语法：**`iterator.next().then(({value, done}) => {});`

**举例：**

```js
const asyncIterator = () => {
  const array = [1, 2];
  return {
    next: function() {
      if(array.length) {
        return Promise.resolve({
          value: array.shift(),
          done: false
        });
      }
      return Promise.resolve({
        done: true
      });
    }
  }
}

let iterator = asyncIterator();

const test = async() => {
  await iterator.next().then(console.log);  // {value: 1, done: false}
  await iterator.next().then(console.log);  // {value: 2, done: false}
  await iterator.next().then(console.log);  // {done: true}
}

test();
```

### 可以使用 `for-await-of` 在循环中异步调用函数

```js
const promises = [
  new Promise((resolve) => resolve(1)),
  new Promise((resolve) => resolve(2)),
  new Promise((resolve) => resolve(3)),
];

const test = async() => {
  for await (const p of promises) {
    console.log('p', p);
  }
};

test();
```

## `Promise.prototype.finally`

在`Promise`结束的时候，不管是结果是`resolved`还是`rejected`，都会调用`finally`中的方法

`finally`中的回调函数不接受任何参数

**返回值：** 一个Promise

**语法：**

```js
const promise = new Promise((resolve, reject) => {
  resolve('resolved');
  reject('rejectd');
})

promise.then((res) => {
  console.log(res);
}).finally(() => {
  console.log('finally')
});
```

**举例：**

```js
const promise = new Promise((resolve, reject) => {
  resolve(1);
  reject(2);
});

const test = () => {
  console.log(3);
  promise.then((res) => {
    console.log(4, res);
  }).catch(err => {
    console.log(5, err);
  }).finally(() => {
    console.log(6);
  });
};

test();  // 3 4 1 6
```

