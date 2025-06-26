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

### 使用场景

假如有这样一个使用场景：需要先请求 a 链接，等返回信息之后，再请求 b 链接的另外一个资源。下面代码展示的是使用 fetch 来实现这样的需求，fetch 被定义在 window 对象中，它返回的是一个 Promise 对象。

```js
fetch('https://blog.csdn.net/')
  .then(response => {
    console.log(response)
    return fetch('https://juejin.im/')
  })
  .then(response => {
    console.log(response)
  })
  .catch(error => {
    console.log(error)
  })
```

虽然上述代码可以实现这个需求，但语义化不明显，代码不能很好地表示执行流程。基于这个原因，ES8 引入了 async/await，这是 JavaScript 异步编程的一个重大改进，提供了在不阻塞主线程的情况下使用同步代码实现异步访问资源的能力，并且使得代码逻辑更加清晰。

```js
async function foo () {
  try {
    let response1 = await fetch('https://blog.csdn.net/')
    console.log(response1)
    let response2 = await fetch('https://juejin.im/')
    console.log(response2)
  } catch (err) {
    console.error(err)
  }
}
foo()
```

通过上面代码，你会发现整个异步处理的逻辑都是使用同步代码的方式来实现的，而且还支持 try catch 来捕获异常，这感觉就在写同步代码，所以是非常符合人的线性思维的。

### 注意点

- await 只能在 async 标记的函数内部使用，单独使用会触发 Syntax error。
- await后面需要跟异步操作，不然就没有意义，而且await后面的Promise对象不必写then，因为await的作用之一就是获取后面Promise对象成功状态传递出来的参数。

### async/await的缺陷

了解`Async/await`是非常有用的，但还有一些缺点需要考虑。

`Async/await` 让你的代码看起来是同步的，在某种程度上，也使得它的行为更加地同步。 `await` 关键字会阻塞其后的代码，直到promise完成，就像执行同步操作一样。它确实可以允许其他任务在此期间继续运行，但您自己的代码被阻塞。

这意味着您的代码可能会因为大量`await`的promises相继发生而变慢。每个`await`都会等待前一个完成，而你实际想要的是所有的这些promises同时开始处理（就像我们没有使用`async/await`时那样）。

有一种模式可以缓解这个问题——通过将 `Promise` 对象存储在变量中来同时开始它们，然后等待它们全部执行完毕。如果想更加深入的了解，请参考 [如何使用 Promise - 学习 Web 开发 | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Asynchronous/Promises#asyncawait的缺陷)

## 对象方法扩展

### Object.values 和 Object.entries

#### 0.Object.keys()方法 (以前的语法)

- 返回一个给定对象的所有可枚举属性的数组

- 返回键

#### 1.Object.values()方法

- 返回一个给定对象的所有可枚举属性值的数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值。
- 返回键的值

```js
const obj = {
  name: "jimmy",
  age: 18,
  height: 188,
};
console.log(Object.values(obj)); // [ 'jimmy', 18, 188 ]
```

#### 2.Object.entries()方法

- 返回一个给定对象自身可遍历属性 [key,value] 的数组，成员是参数对象自身的（不含继承的）所有可遍历属性的键值对数组。

- 返回数组里面包裹数组，包裹的一个数组是键值对并排。

- 可使用Map获取数组里的值

```js
const obj = {
  name: "jimmy",
  age: 18,
  height: 188,
};
console.log(Object.entries(obj)); // [ [ 'name', 'jimmy' ], [ 'age', 18 ], [ 'height', 188 ] ]
console.log(Object.entries([1, 2, 3])); // [ [ '0', 1 ], [ '1', 2 ], [ '2', 3 ] ]
```

#### 综合对比代码例子

```js
const school = {
    name:"尚硅谷",
    cities:['北京','上海','深圳'],
    xueke: ['前端','Java','大数据','运维']
};

// 获取对象所有的键
console.log(Object.keys(school));
// 获取对象所有的值
console.log(Object.values(school));
// entries
console.log(Object.entries(school));
// 创建 Map
const m = new Map(Object.entries(school));
console.log(m.get('cities'));
```

### Object.getOwnPropertyDescriptors

该方法返回：指定对象所有自身属性的描述对象，用来进行深层次对象的克隆

代码例子

```js
const obj = {
  name: "jimmy",
  age: 18,
};
const desc = Object.getOwnPropertyDescriptors(obj);
console.log(desc);  
// 打印结果
{
  name: {
    value: 'jimmy',
    writable: true,
    enumerable: true,
    configurable: true
  },
  age: { 
   value: 18, 
   writable: true,
   enumerable: true, 
   configurable: true 
  }
}
```

上面打印结果中的

- `value`表示当前对象的默认值
- `writable`表示对象属性是否可以修改
- `enumerable`表示当前这个属性是否可以出现在对象的枚举属性中
- `configurable`表示当前对象的属性能否用delete删除

那这些对象的属性我们怎么设置和修改他们呢，我们可以使用es5的 `Object.defineProperty()`

```js
const obj = {};
Object.defineProperty(obj, "name", {
  value: "jimmy",
  writable: true,
  configurable: true,
  enumerable: true,
});
Object.defineProperty(obj, "age", {
  value: 34,
  writable: true,
  configurable: true,
  enumerable: true,
});
console.log(obj); // { name: 'jimmy', age: 34 }
```

接下来我们演示下，一些属性设置为false的情况

```js
const obj = {};
Object.defineProperty(obj, "name", {
  value: "jimmy",
  writable: false,
  configurable: false,
  enumerable: true,
});
console.log(obj); // { name: 'jimmy' }
obj.name = "chimmy";
console.log(obj); // { name: 'jimmy' }
delete obj.name
console.log(obj); // { name: 'jimmy' }
```

和不能被删除，打印出来还是原来的对象。

**设置enumerable为false时**

```js
const obj = {};
Object.defineProperty(obj, "name", {
  value: "jimmy",
  writable: true,
  configurable: true,
  enumerable: false,
});
console.log(obj); // { }
for (let key in obj) {
  console.log(key); // ""
}
```

当设置enumerable: false时，表示对象的属性不可被枚举，这时打印对象为空，遍历对象的键也为空。

## 字符串方法的扩展

### String.prototype.padStart()

`padStart()` ：把指定字符串填充到字符串头部，返回新字符串。

**返回值：** 在原字符串**开头**填充指定的填充字符串直到目标长度所形成的新字符串。

**语法：**

```js
str.padStart(targetLength);
str.padStart(targetLength, padString);
```

- **targetLength**：当前字符串需要填充到的目标长度。如果这个数值小于当前字符串的长度，则返回当前字符串本身。
- **padString（可选）**：填充字符串。如果字符串太长，使填充后的字符串长度超过了目标长度，则只保留最左侧的部分，其他部分会被截断。此参数的默认值为 " "。

**举例：**

```js
'abc'.padStart(10);         // "       abc"
'abc'.padStart(10, "foo");  // "foofoofabc"
'abc'.padStart(6,"123465"); // "123abc"
'abc'.padStart(8, "0");     // "00000abc"
'abc'.padStart(1);          // "abc"
```

#### 应用场景

日期格式化：yyyy-mm-dd的格式：

```js
const now = new Date()
const year = now.getFullYear()
// 月份和日期 如果是一位前面给它填充一个0
const month = (now.getMonth() + 1).toString().padStart(2, '0')
const day = (now.getDate()).toString().padStart(2, '0')
console.log(year, month, day)
console.log( `${year}-${month}-${day}` ) //输入今天的日期 2021-12-31
```

数字替换(手机号，银行卡号等）

```js
const tel = '18781268679'
const newTel = tel.slice(-4).padStart(tel.length, '*')
console.log(newTel) // *******5678
```

### String.prototype.padEnd()

`padEnd()` ：把指定字符串填充到字符串尾部，返回新字符串。（如果需要的话则重复填充）

**返回值：** 返回在原字符串**末尾**填充指定的填充字符串直到目标长度所形成的新字符串。

**语法：**

```js
str.padEnd(targetLength)
str.padEnd(targetLength, padString)
```

- **targetLength**：当前字符串需要填充到的目标长度。如果这个数值小于当前字符串的长度，则返回当前字符串本身。
- **padString（可选）**：填充字符串。如果字符串太长，使填充后的字符串长度超过了目标长度，则只保留最左侧的部分，其他部分会被截断。此参数的缺省值为 " "。

**举例：**

```js
'abc'.padEnd(10);          // "abc       "
'abc'.padEnd(10, "foo");   // "abcfoofoof"
'abc'.padEnd(6, "123456"); // "abc123"
'abc'.padEnd(1);           // "abc"
```

#### 应用场景

在JS前端我们处理时间戳的时候单位是ms毫秒，但是，后端同学返回的时间戳则不一样是毫秒，可能只有10位，以s秒为单位。所以，我们在前端处理这个时间戳的时候，保险起见，要先做一个13位的补全，保证单位是毫秒。

```js
// 伪代码
console.log(new Date().getTime()) // 时间戳 13位的
timestamp = +String(timestamp).padEnd(13, '0')
```

## `Trailing commas` 尾后逗号

如果你想要添加新的属性，并且在上一行已经使用了尾后逗号，你可以仅仅添加新的一行，而不需要修改上一行。

⚠️ JSON 不允许尾后逗号

**举例：**

字面量中的尾后逗号

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

函数中的尾后逗号

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

解构中的尾后逗号

```js
let [a, b,] = [1, 2];
let {x, y} = {x: 1, y: 2};
```

JSON中的尾后逗号

JSON中不允许出现尾后逗号

```js
JSON.parse("[1, 2, 3,]")  // ❌
JSON.parse('{"a": 1,}')   // ❌
JSON.parse("[1, 2, 3]")   // ✅
JSON.parse('{"a": 1}')    // ✅
```



#### 第二

ES8 允许函数的最后一个参数有尾逗号（Trailing comma）。 此前，函数定义和调用时，都不允许最后一个参数后面出现逗号。

```js
function clownsEverywhere(
    param1,
    param2
) {
    /* ... */
}

clownsEverywhere(
    'foo',
    'bar'
)
```

上面代码中，如果在param2或bar后面加一个逗号，就会报错。

如果像上面这样，将参数写成多行（即每个参数占据一行），以后修改代码的时候，想为函数clownsEverywhere添加第三个参数，或者调整参数的次序，就势必要在原来最后一个参数后面添加一个逗号。这对于版本管理系统来说，就会显示添加逗号的那一行也发生了变动。这看上去有点冗余，因此新的语法允许定义和调用时，尾部直接可以加上一个逗号。

```js
function clownsEverywhere(
    param1,
    param2,
) {
    /* ... */
}

clownsEverywhere(
    'foo',
    'bar',
)
```

这样的规定也使得，函数参数与数组和对象的尾逗号规则，保持一致了。
