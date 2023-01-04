# 手写Promise

## ES5构造函数实现

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

## class类实现：把上述代码 使用VS Code的在SxPromise函数的快速修复 转为ES6的class类 实现

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
