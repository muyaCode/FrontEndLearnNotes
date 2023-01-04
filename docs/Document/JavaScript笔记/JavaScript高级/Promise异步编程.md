# Promise异步编程

Promise 是异步编程的一种解决方案，比传统的解决方案回调函数, 更合理和更强大。

ES6 将其写进了语言标准，统一了用法，原生提供了Promise对象 。

## Promise相关文档参考

**MDN的Promise文档😉**：[Promise - JavaScript | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)

菜鸟教程文档：[JavaScript Promise | 菜鸟教程 (runoob.com)](https://www.runoob.com/js/js-promise.html)

w3school文档：

- [JavaScript Promise (w3school.com.cn)](https://www.w3school.com.cn/js/js_promise.asp)

- [JavaScript Promise对象_w3cschool](https://www.w3cschool.cn/javascript_guide/javascript_guide-a9jb269c.html)

腾讯云的文档：[Promise - JavaScript中文版 - API参考文档 (apiref.com)](https://www.apiref.com/javascript-zh/Reference/Global_Objects/Promise.htm)

## Promise的作用

- 指定回调函数方式更灵活易懂。

- 解决异步 **回调地狱** 的问题。

## 什么是回调地狱

- 当一个回调函数嵌套一个回调函数的时候

- 就会出现一个嵌套结构

- 当嵌套的多了就会出现回调地狱的情况

- 比如我们发送三个 ajax 请求
  
  - 第一个正常发送
  - 第二个请求需要第一个请求的结果中的某一个值作为参数
  - 第三个请求需要第二个请求的结果中的某一个值作为参数
  
  ```javascript
  ajax({
    url: '我是第一个请求',
    success (res) {
      // 现在发送第二个请求
      ajax({
        url: '我是第二个请求'，
        data: { a: res.a, b: res.b },
        success (res2) {
          // 进行第三个请求
          ajax({
            url: '我是第三个请求',
            data: { a: res2.a, b: res2.b },
            success (res3) { 
              console.log(res3) 
            }
          })
        }
      })
    }
  })
  ```

- **回调地狱，其实就是回调函数嵌套过多导致的**

## 1.Promise基础

### Promise基础语法

### 基础语法

```js
// 实例化Promise构造函数
new Promise(function (resolve, reject) {
  // resolve 表示成功的回调
  // reject 表示失败的回调
}).then(function (res) {
  // 成功的函数
}).catch(function (err) {
  // 失败的函数
}).finally(function() {
   // 返回状态为 (resolved 或 rejected)，失败和成功都在这里返回
})
```

### Promise 对象的状态

Promise 对象通过自身的状态，来控制异步操作。Promise 实例具有三种状态。

- 异步操作“未完成”（pending）
- 异步操作“已完成”（resolved，又称fulfilled）
- 异步操作“失败”（rejected）

这三种的状态的变化途径只有两种

- 异步操作从“未完成”到“已完成”
- 异步操作从“未完成”到“失败”

一旦状态发生变化，就凝固了，不会再有新的状态变化。这也是 Promise 这个名字的由来，它的英语意思是“承诺”，一旦承诺成效，就不得再改变了。这也意味着，Promise 实例的状态变化只可能发生一次。

一旦当前状态变为“已完成”或“失败”，就意味着不会再有新的状态变化了。因此，Promise对象的最终结果只有两种。

- 异步操作成功，Promise对象传回一个值，状态变为`resolved`或`fulfilled`
- 异步操作失败，Promise对象抛出一个错误，状态变为`rejected`

![Promise的基本执行流程.jpg](.\img\Promise的基本执行流程.jpg)

### Promise对象方法

> Promise 是一个对象，也是一个构造函数。

Promise对象方法**MDN文档**：[Promise方法 - JavaScript | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)

#### 1.Promise.prototype.then()

文档：[Promise.prototype.then() - JavaScript | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/then)

- `new Promise`的(resolve, reject)参数，对应p1实例的方法：`.resolve()`和`.catch()`

- `.then`方法参数就是上面的实例参数：(resolve 成功回调, reject 失败回调)

```js
// new Promise的resolve, reject参数，对应实例的方法：.resolve()和.catch()
var p1 = new Promise((resolve, reject) => {
  resolve('成功！');
  // or
  // reject(new Error("出错了！"));
});

// .then方法参数就是上面的实例参数：(resolve 成功回调, reject 失败回调)
p1.then(res => {
  console.log('成功了', res); // 成功！
}, reason => {
  console.error(reason); // 出错了！
});

// 跟上面的then两个回调参数输出一样的方法，推荐使用这种，语义化更加明显
p1.then(res => {
  console.log('成功了', res);
})
.catch(reason => {
  console.error(reason); // 出错了！
})

// 如果两个一起写，并且上面实例化状态是reject，只会走then的第二个回调参数，浏览器只打印"不发奖金111"
// 具体原因：看-Promise 对象的状态：因为从pending状态发生变化，就凝固了，不会再有新的状态变化
p1.then(()=>{
  console.log("发奖金");
},()=>{
  console.log("不发奖金111");
}).catch(()=>{
  console.log("不发奖金222");
})
```

#### 2.Promise.resolve()

文档：[Promise.resolve() - JavaScript | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve)

将现有对象转为 Promise 对象

```javascript
Promise.resolve('哈哈')
// 等价于
new Promise(resolve => resolve('哈哈'))
```

#### 3.Promise.reject()

文档：[Promise.reject() - JavaScript | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/reject)

`Promise.reject(reason)`方法也会返回一个新的 Promise 实例，该实例的状态为`rejected`。

```javascript
const p = Promise.reject('error');
// 等同于
const p = new Promise((resolve, reject) => reject('error'))
```

#### 4.Promise.prototype.finally()

[**ES2018(ES9)发布**]

文档：[Promise.prototype.finally() - JavaScript | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/finally)

在 Promise 结束时，无论结果是 `fulfilled` 或者是 `rejected`，都会执行指定的`.finally()`回调函数

```js
p.finally(onFinally);

p.finally(function() {
  // 返回状态为 (resolved 或 rejected)
  console.log('成功或者失败都会执行的回调函数')
  // 常用于loading状态停止隐藏
  isLoading = false;
});
```

#### 5.Promise.prototype.catch()

文档：[Promise.prototype.catch() - JavaScript | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch)

**catch()** 方法返回一个Promise，并且处理拒绝的情况。它的行为与调用`Promise.prototype.then方法` 相同。(事实上，calling `obj.catch(onRejected)` 内部 calls `obj.then(undefined, onRejected)`).

```js
// 抛出一个错误，大多数时候将调用 catch 方法
var p1 = new Promise(function(resolve, reject) {
  throw 'Uh-oh!';
});

p1.catch(function(e) {
  console.log(e); // "Uh-oh!"
});
```

在异步函数中抛出的错误不会被 catch 捕获到

```js
// 在异步函数中抛出的错误不会被 catch 捕获到
var p2 = new Promise(function(resolve, reject) {
  setTimeout(function() {
    throw 'Uncaught Exception!';
  }, 1000);
});

p2.catch(function(e) {
  console.log(e); // 不会执行
});
```

在 resolve() 后面抛出的错误会被忽略

```js
// 在 resolve() 后面抛出的错误会被忽略
var p3 = new Promise(function(resolve, reject) {
  resolve();
  throw 'Silenced Exception!';
});

p3.catch(function(e) {
   console.log(e); // 不会执行
});
```

#### 6.Promise.all()

文档：[Promise.all() - JavaScript | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)

`Promise.all()`方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。

```javascript
const p = Promise.all([p1, p2, p3]);
```

p的状态由p1，p2，p3 决定，分成两种情况。

（1）只有`p1`、`p2`、`p3`的这三个实例的状态都变成`fulfilled`，`p`的状态才会变成`fulfilled`，此时`p1`、`p2`、`p3`的返回值组成一个数组，传递给`p`的回调函数。

（2）只要`p1`、`p2`、`p3`之中有一个被`rejected`，`p`的状态就变成`rejected`，此时第一个被`reject`的实例的返回值，会传递给`p`的回调函数。

#### 7.Promise.race()

文档：[Promise.race() - JavaScript | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/race)

`Promise.race()`方法同样是将多个 Promise 实例，包装成一个新的 Promise 实例。

```javascript
const p = Promise.race([p1, p2, p3]);
```

上面代码中，只要`p1`、`p2`、`p3` 这三个实例之中有一个实例率先改变状态，`p`的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给`p`的回调函数。

#### 8.Promise.allSettled()

[**ES2020(ES11)发布**]

文档：[Promise.allSettled() - JavaScript | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled)

`Promise.allSettled()`方法，用来确定一组异步操作是否都结束了（不管成功或失败）。

所以，它的名字叫做”Settled“，包含了`”fulfilled“`和`”rejected“`两种情况，表示 promise 的最终状态。

```js
const promises = [ ajax('/200接口'), ajax('/401接口') ];

Promise.allSettled(promises).then(results=>{
    // 过滤出成功的请求
    results.filter(item =>item.status === 'fulfilled');
    过滤出失败的请求
    results.filter(item=> item.status === 'rejected');
})
```

#### 9.Promise.any()

[**ES2021(ES12)发布**]

文档：[Promise.any() - JavaScript | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/any)

只要参数实例有一个先变成`fulfilled`状态，包装实例就会变成`fulfilled`状态；

如果所有参数实例都变成`rejected`状态，包装实例就会变成`rejected`状态。

> `Promise.any()`跟`Promise.race()`方法很像，只有一点不同，就是`Promise.any()`不会因为某个 Promise 变成`rejected`状态而结束，必须等到所有参数 Promise 变成`rejected`状态才会结束。

```js
const pErr = new Promise((resolve, reject) => {
  reject("总是失败");
});

const pSlow = new Promise((resolve, reject) => {
  setTimeout(resolve, 500, "最终完成");
});

const pFast = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, "很快完成");
});

Promise.any([pErr, pSlow, pFast]).then((value) => {
  console.log(value);
  // pFast fulfils first
})
// 期望输出："很快完成"
```

## 2.使用Promise

**参考MDN文档的《使用Promise》**：[使用 Promise - JavaScript | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Using_promises#chaining)

---

Promise的结果：封装方法的链式调用

```html
<!DOCTYPE html>
<html lang="en">
 <head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Promise的结果</title>
 </head>
 <body>
  <script>
   function ajax(url) {
    return new Promise((resolve, reject) => {
     setTimeout(() => {
      // resolve(["1111","2222","3333"]);
      reject({ code: 401, info: "aaaaa" });
     }, 2000);
    });
   }
   var pajax = ajax("11111");
   pajax
    .then((res) => {
     console.log("请求成功", res);
     console.log(pajax);
    })
    .catch((error) => {
     console.log("请求失败", error);
     console.log(pajax);
    });
  </script>
 </body>
</html>


```

Promise封装AJAX：包括请求的数据缓存，避免重复请求：使用`.then()`方法和`.catch()`方法

```html
<!DOCTYPE html>
<html lang="en">
 <head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Promise封装AJAX</title>
 </head>
 <body>
  <script>
   function ajax(url) {
    var cache = ajax.cache || (ajax.cache = { data: null });
    // 如果有缓存的数据
    if (cache.data) {
     console.log("走缓存");
     return Promise.resolve(cache.data);
    }
    //
    return new Promise((resolve, reject) => {
     var xhr = new XMLHttpRequest();
     xhr.open("get", url, true);
     xhr.send();
     xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
       if (xhr.status >= 200 && xhr.status < 300) {
        // 成功
        resolve(JSON.parse(xhr.responseText));
        // 缓存数据
        console.log("不走缓存");
        ajax.cache.data = JSON.parse(xhr.responseText);
       } else {
        // 失败
        reject(xhr.responseText);
       }
      }
     };
    });
   }
            // 请求
   ajax("http://www.xiongmaoyouxuan.com/api/tabs")
    .then((res) => {
     console.log("success", res);
    })
    .catch((err) => {
     console.log("error", err);
    });
            
            // 定时请求测试缓存数据
   setTimeout(() => {
    ajax("http://www.xiongmaoyouxuan.com/api/tabs")
     .then((res) => {
      console.log("success", res);
     })
     .catch((err) => {
      console.log("error", err);
     });
   }, 2000);
            // 请看缓存后再请求
   setTimeout(() => {
    ajax.cache = null;
    ajax("http://www.xiongmaoyouxuan.com/api/tabs")
     .then((res) => {
      console.log("success", res);
     })
     .catch((err) => {
      console.log("error", err);
     });
   }, 3000);
  </script>
 </body>
</html>
```

链式调用`.then()`方法

```js
var p = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve("data")
    },1000)
})

var p1 = p.then(res=>{
    console.log(res);
    // 默认就是retrun undefine, 成功fulfilled
    return res;
}).then(res=>{
    console.log(res); // 前一个.then()方法的Promise 的结果，return返回值
}).then(res=>{
    console.log(res); // 前一个.then()方法没有return，所以是undefine
})
```

## 3.手写Promise（Promise源码的实现）

### 手写实现Promise

```js
function SxPromise(executor) {
    this.status = "pending"; // 记录状态
    this.result = undefined; // 记录执行结果
    this.cb = []; // 成功和失败的回调方法存储
    var _this = this;
    // resolve方法
    function resolve(res) {
        if (_this.status !== "pending") return;
        // console.log(_this)
        _this.status = "fulfilled"
        _this.result = res;

        _this.cb.forEach(item => {
            item.successCB && item.successCB(_this.result)
        });
    }
    // reject方法
    function reject(res) {
        if (_this.status !== "pending") return;
        // console.log("reject")
        _this.status = "rejected"
        _this.result = res;
        _this.cb.forEach(item => {
            item.failCB && item.failCB(_this.result)
        });
    }
    executor(resolve, reject)
}

// 实现.then方法-链式调用，解决回调地狱
SxPromise.prototype.then = function (successCB, failCB) {
    // .catch方法的实现需要的判断，如果没有成功或失败的回调参数，则返回
    if(!successCB){
        successCB = value => value
    }
    if(!failCB){
        failCB = error => error
    }

    // 成功完成、失败、进行中的状态返回
    return new SxPromise((resolve, reject) => {
        // 成功完成 状态，执行successCB成功回调函数
        if (this.status === "fulfilled") {
            var result = successCB && successCB(this.result)
            // console.log(result);
            
            // 如果result结果是SxPromise的实例：用于.then方法里无限返回调用：return new SxPromise()，供链式调用的下一个.then()方法使用
            if (result instanceof SxPromise) {
                result.then(res => {
                    // console.log(res)
                    resolve(res);
                }, err => {
                    // console.log(err)
                    reject(err)
                })
            } else {
                resolve(result);
            }
        }
        // 失败 状态，执行failCB失败回调函数
        if (this.status === "rejected") {
            var result = failCB && failCB(this.result)
            // 如果result结果是SxPromise的实例：用于.then方法里无限返回调用：return new SxPromise()，供链式调用的下一个.then()方法使用
            if (result instanceof SxPromise) {
                result.then(res => {
                    // console.log(res)
                    resolve(res);
                }, err => {
                    // console.log(err)
                    reject(err)
                })
            } else {
                reject(result);
            }
        }
        // 进行中 状态
        if (this.status === "pending") {
            // 收集成功和失败的回调函数
            this.cb.push({
                successCB: () => {
                    var result = successCB && successCB(this.result)
                    // 和上面的两个状态的原理一样
                    if (result instanceof SxPromise) {
                        result.then(res => {
                            // console.log(res)
                            resolve(res);
                        }, err => {
                            // console.log(err)
                            reject(err)
                        })
                    } else {
                        resolve(result);
                    }
                },
                failCB: () => {
                    var result = failCB && failCB(this.result)
                    // 和上面的两个状态的原理一样
                    if (result instanceof SxPromise) {
                        result.then(res => {
                            // console.log(res)
                            resolve(res);
                        }, err => {
                            // console.log(err)
                            reject(err)
                        })
                    } else {
                        reject(result);
                    }
                }
            })
        }
    })
}
// .catch方法的实现
SxPromise.prototype.catch = function(failCB){
    this.then(undefined, failCB)
}
```

class类实现：把上述代码 使用VS Code的在SxPromise函数的快速修复 转为ES6的class类 实现：

```js
class SxPromise {
  constructor(executor) {
    this.status = "pending"; // 记录状态
    this.result = undefined; // 记录执行结果
    this.cb = []; // 成功和失败的回调方法存储
    var _this = this;
    // resolve方法
    function resolve(res) {
      if (_this.status !== "pending")
        return;
      // console.log(_this)
      _this.status = "fulfilled";
      _this.result = res;

      _this.cb.forEach(item => {
        item.successCB && item.successCB(_this.result);
      });
    }
    // reject方法
    function reject(res) {
      if (_this.status !== "pending")
        return;
      // console.log("reject")
      _this.status = "rejected";
      _this.result = res;
      _this.cb.forEach(item => {
        item.failCB && item.failCB(_this.result);
      });
    }
    executor(resolve, reject);
  }
  // 实现.then方法-链式调用，解决回调地狱
  then(successCB, failCB) {
    // .catch方法的实现需要的判断，如果没有成功或失败的回调参数，则返回
    if (!successCB) {
      successCB = value => value;
    }
    if (!failCB) {
      failCB = error => error;
    }

    // 成功完成、失败、进行中的状态返回
    return new SxPromise((resolve, reject) => {
      // 成功完成 状态，执行successCB成功回调函数
      if (this.status === "fulfilled") {
        var result = successCB && successCB(this.result);
        // console.log(result);
        // 如果result结果是SxPromise的实例：用于.then方法里无限返回调用：return new SxPromise()，供链式调用的下一个.then()方法使用
        if (result instanceof SxPromise) {
          result.then(res => {
            // console.log(res)
            resolve(res);
          }, err => {
            // console.log(err)
            reject(err);
          });
        } else {
          resolve(result);
        }
      }
      // 失败 状态，执行failCB失败回调函数
      if (this.status === "rejected") {
        var result = failCB && failCB(this.result);
        // 如果result结果是SxPromise的实例：用于.then方法里无限返回调用：return new SxPromise()，供链式调用的下一个.then()方法使用
        if (result instanceof SxPromise) {
          result.then(res => {
            // console.log(res)
            resolve(res);
          }, err => {
            // console.log(err)
            reject(err);
          });
        } else {
          reject(result);
        }
      }
      // 进行中 状态
      if (this.status === "pending") {
        // 收集成功和失败的回调函数
        this.cb.push({
          successCB: () => {
            var result = successCB && successCB(this.result);
            // 和上面的两个状态的原理一样
            if (result instanceof SxPromise) {
              result.then(res => {
                // console.log(res)
                resolve(res);
              }, err => {
                // console.log(err)
                reject(err);
              });
            } else {
              resolve(result);
            }
          },
          failCB: () => {
            var result = failCB && failCB(this.result);
            // 和上面的两个状态的原理一样
            if (result instanceof SxPromise) {
              result.then(res => {
                // console.log(res)
                resolve(res);
              }, err => {
                // console.log(err)
                reject(err);
              });
            } else {
              reject(result);
            }
          }
        });
      }
    });
  }
  // .catch方法的实现
  catch(failCB) {
    this.then(undefined, failCB);
  }
}



```

## 4.async与await

### 1.async

文档：[async 函数 - JavaScript | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function)

async 函数，使得异步操作变得更加方便。

- 更好的语义。
- 返回值是 Promise。

```js
async function test(){
  console.log('ok')
  // return '哈哈ok'
  return new Promise((resolve,reject)=>{
    // resolve("ok");
    reject("fail");
  })
}
const res = test()
console.log(res)

res.then(res=>{
    console.log(res);
}).catch(err=>{
    console.log(err);
})
```

async函数最终返回一个Promise对象

- 所以不用实例化Promise，可以直接使用Promise的相关方法

- 也可以再实例化new Promise(resolve, reject)返回状态，再使用Promise的相关方法

### 2.await

文档：[await - JavaScript | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/await)

`await`命令后面是一个 Promise 对象，返回该对象的结果。如果不是 Promise 对象，就直接返回对应的值。

```js
async function test(){
    var res1 =  await ajax("http://localhost:3000/news1")
    var res2 =  await ajax("http://localhost:3000/news2")
    return res2
}

test().then(res=>{
    console.log("返回结果",res)
}).catch(err=>{
    console.log("err",err)
})
```

所有await的后面的代码，都会等待异步代码先执行，最后再执行resolve或reject（写代码像同步，其实是异步执行的代码）

```js
async function test(){
  // 所有await的后面的代码，都会等待setTimeout异步代码先执行，最后再执行resolve或reject
  var res = await new Promise((resolve,reject)=>{
    // resolve("ok");
    // reject("fail");
    setTimeout(()=>{
        resolve("ok"); // 第3
        console.log("111111") // 第1
    },1000)
  })
  console.log("22222222");  // 第2
  return res; // 最后return 的结果：就是resolve,reject的执行
}

var res = test()
console.log(res)

res.then(res=>{
  console.log(res);
}).catch(err=>{
  console.log(err);
})
```

### 3.结合 `try{}catch(err){}` 错误捕捉处理

```js
async function request(){
  try{
    var res1 = await ajax("http://localhost:3000/news1")
    var res2 = await ajax("http://localhost:3000/news2")
  }catch(err){
    console.log("err", err)
  }
}
```
