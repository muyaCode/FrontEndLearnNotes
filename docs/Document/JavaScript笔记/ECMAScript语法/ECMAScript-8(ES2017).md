# ECMAScript-8(ES2017)

## 提案



## 新特性

- `Async functions`
- `Object.entries`
- `Object.values`
- `Object.getOwnPropertyDescriptors`
- `Trailing commas`

## async 和 await

### 简介

async 是“异步”的简写，而 await 可以认为是 async wait 的简写。 所以应该很好理解 async用于申明一个 function 是异步的，而 await 用于等待一个异步方法执行完成。

简单理解：

- async 是让方法变成异步。

- await 是等待异步方法执行完成。

- async 和 await 两种语法结合 可以让异步代码像同步代码一样

### async 函数

- 1.async 函数的返回值为 promise 对象，
- 2.promise 对象的结果由 async 函数执行的返回值决定

代码例子

```js
//async 函数
async function fn(){
    // 返回一个字符串
    // return '尚硅谷';
    // 返回的结果不是一个 Promise 类型的对象, 返回的结果就是成功 Promise 对象
    // return;
    //抛出错误, 返回的结果是一个失败的 Promise
    // throw new Error('出错啦!');
    //返回的结果如果是一个 Promise 对象
    return new Promise((resolve, reject)=>{
        resolve('成功的数据');
        // reject("失败的错误");
    });
}

const result = fn();

//调用 then 方法
result.then(value => {
    console.log(value);
}, reason => {
    console.warn(reason);
})
```

### await 表达式

- 1.await 必须写在 async 函数中

- 2.await 右侧的表达式一般为 promise 对象

- 3.await 返回的是 promise 成功的值

- 4.await 的 promise 失败了, 就会抛出异常, 需要通过 try...catch 捕获处理

代码例子

```js
//创建 promise 对象
const p = new Promise((resolve, reject) => {
    // resolve("用户数据");
    reject("失败啦!");
})

// await 要放在 async 函数中.
async function main() {
    try {
        let result = await p;
        //
        console.log(result);
    } catch (e) {
        console.log(e);
    }
}
//调用函数
main();
```

async和await 结合  读取文件代码例子

```js
//1. 引入 fs 模块
const fs = require("fs");

//读取『为学』
function readWeiXue() {
    return new Promise((resolve, reject) => {
        fs.readFile("./resources/为学.md", (err, data) => {
            //如果失败
            if (err) reject(err);
            //如果成功
            resolve(data);
        })
    })
}

function readChaYangShi() {
    return new Promise((resolve, reject) => {
        fs.readFile("./resources/插秧诗.md", (err, data) => {
            //如果失败
            if (err) reject(err);
            //如果成功
            resolve(data);
        })
    })
}

function readGuanShu() {
    return new Promise((resolve, reject) => {
        fs.readFile("./resources/观书有感.md", (err, data) => {
            //如果失败
            if (err) reject(err);
            //如果成功
            resolve(data);
        })
    })
}

//声明一个 async 函数
async function main(){
    //获取为学内容
    let weixue = await readWeiXue();
    //获取插秧诗内容
    let chayang = await readChaYangShi();
    // 获取观书有感
    let guanshu = await readGuanShu();

    console.log(weixue.toString());
    console.log(chayang.toString());
    console.log(guanshu.toString());
}

main();
```

async和await 结合  封装AJAX请求例子

```js
// 发送 AJAX 请求, 返回的结果是 Promise 对象
function sendAJAX(url) {
    return new Promise((resolve, reject) => {
        //1. 创建对象
        const x = new XMLHttpRequest();

        //2. 初始化
        x.open('GET', url);

        //3. 发送
        x.send();

        //4. 事件绑定
        x.onreadystatechange = function () {
            if (x.readyState === 4) {
                if (x.status >= 200 && x.status < 300) {
                    //成功啦
                    resolve(x.response);
                }else{
                    //如果失败
                    reject(x.status);
                }
            }
        }
    })
}
    
//promise then 方法测试
// sendajax("https://api.apiopen.top/getjoke").then(value=>{
//     console.log(value);
// }, reason=>{})
  
// async 与 await 测试  axios
async function main(){
    //发送 AJAX 请求
    let result = await sendAJAX("https://api.apiopen.top/getJoke");
            //再次测试
    let tianqi = await sendAJAX('https://www.tianqiapi.com/api/?version=v1&city=%E5%8C%97%E4%BA%AC&appid=23941491&appsecret=TXoD5e8P')

    console.log(tianqi);
}

main();
```

## 对象方法扩展

### Object.values 和 Object.entries

- 0.Object.keys()方法 (以前的语法)

  - 返回一个给定对象的所有可枚举属性的数组

  - 返回键

- 1.Object.values()方法

  - 返回一个给定对象的所有可枚举属性值的数组

  - 返回键的值

- 2.Object.entries()方法

  - 返回一个给定对象自身可遍历属性 [key,value] 的数组

  - 返回数组里面包裹数组，包裹的一个数组是键值对并排。

  - 可使用Map获取数组里的值

代码例子

```js
const school = {
    name:"尚硅谷",
    cities:['北京','上海','深圳'],
    xueke: ['前端','Java','大数据','运维']
};

//获取对象所有的键
console.log(Object.keys(school));
//获取对象所有的值
console.log(Object.values(school));
//entries
console.log(Object.entries(school));
//创建 Map
const m = new Map(Object.entries(school));
console.log(m.get('cities'));
```

### Object.getOwnPropertyDescriptors

该方法返回指定对象所有自身属性的描述对象，用来进行深层次对象的克隆

代码例子

```js
const school = {
    name:"尚硅谷",
    cities:['北京','上海','深圳'],
    xueke: ['前端','Java','大数据','运维']
};

//对象属性的描述对象
console.log(Object.getOwnPropertyDescriptors(school));
const obj = Object.create(null, {
     name: {
        // 设置值
        value: '尚硅谷',
        // 属性特性
        writable: true,
        configurable: true,
        enumerable: true
    } 
});
// 打印返回的值是name的对象值，此处可以进行对象深层次的克隆
```

## `Trailing commas` 尾后逗号

如果你想要添加新的属性，并且在上一行已经使用了尾后逗号，你可以仅仅添加新的一行，而不需要修改上一行。

⚠️ JSON 不允许尾后逗号

**举例：**

- 字面量中的尾后逗号

  - 对象

    ```js
    let obj = {
      a: 1,
      b: 2
    }
    ```

  - 数组

    ```js
    let arr = [
      1, 
      2
    ]
    ```

- 函数中的尾后逗号

  - 参数定义

    ```js
    function(x, y) {}
    function(x, y,) {}
    (x, y) => {}
    (x, y,) => {}
    ```

  - 函数调用

    ```js
    fun(x, y)
    fun(x, y,)
    ```

  - 不合法的尾后逗号

    不含参数或者在剩余参数后面加逗号，都是不合法的尾后逗号

    ```js
    function(,) {}
    (,) => {}
    fn(,)
    function(...arg,) {}
    (...arg,) => {}
    ```

- 解构中的尾后逗号

  ```js
  let [a, b,] = [1, 2];
  let {x, y} = {x: 1, y: 2};
  ```

- JSON中的尾后逗号

  JSON中不允许出现尾后逗号

  ```js
  JSON.parse("[1, 2, 3,]")  // ❌
  JSON.parse('{"a": 1,}')   // ❌
  JSON.parse("[1, 2, 3]")   // ✅
  JSON.parse('{"a": 1}')    // ✅
  ```

## `String.prototype.padStart()`

`padStart()` 用另一个字符串填充当前字符串。

**返回值：** 在原字符串**开头**填充指定的填充字符串直到目标长度所形成的新字符串。

**语法：**

```js
str.padStart(targetLength);
str.padStart(targetLength, padString);
```

- targetLength：当前字符串需要填充到的目标长度。如果这个数值小于当前字符串的长度，则返回当前字符串本身。
- padString（可选）：填充字符串。如果字符串太长，使填充后的字符串长度超过了目标长度，则只保留最左侧的部分，其他部分会被截断。此参数的默认值为 " "。

**举例：**

```js
'abc'.padStart(10);         // "       abc"
'abc'.padStart(10, "foo");  // "foofoofabc"
'abc'.padStart(6,"123465"); // "123abc"
'abc'.padStart(8, "0");     // "00000abc"
'abc'.padStart(1);          // "abc"
```

## `String.prototype.padEnd()`

`padEnd()` 方法会用一个字符串填充当前字符串（如果需要的话则重复填充）。

**返回值：** 返回在原字符串**末尾**填充指定的填充字符串直到目标长度所形成的新字符串。

**语法：**

```js
str.padEnd(targetLength)
str.padEnd(targetLength, padString)
```

- targetLength：当前字符串需要填充到的目标长度。如果这个数值小于当前字符串的长度，则返回当前字符串本身。
- padString（可选）：填充字符串。如果字符串太长，使填充后的字符串长度超过了目标长度，则只保留最左侧的部分，其他部分会被截断。此参数的缺省值为 " "。

**举例：**

```js
'abc'.padEnd(10);          // "abc       "
'abc'.padEnd(10, "foo");   // "abcfoofoof"
'abc'.padEnd(6, "123456"); // "abc123"
'abc'.padEnd(1);           // "abc"
```

