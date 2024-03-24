# Koa框架前置JS知识

**Express**：Express是第一代最流行的web框架，它对Node.js的http进行了封装
但是它是'基于ES5'的语法，内部实现异步代码，只有一个方法：'回调'

**koa1.x**：基于ES6开发，使用generator实现异步，generator实现异步比回调简单不少，但generator的本意并不是异步

**koa2.x**：基于ES7开发：koa2.x完全使用Promise并配合async实现异步

所以学习Koa需要ES6和ES7的知识

## Express、Koa1.x、Koa2.x区别

### 最大的区别就是内部实现异步的方式不同

- **Express**使用回调函数实现异步, 容易出现回调地狱问题, 但是语法更老兼容性更好
- **Koa1.x**使用generator实现异步, 解决了回调地域问题, 但是generator的本意并不是异步
- **Koa2.x**使用Promise并配合async来实现异步, 解决了回调地域问题, 但是语法太新兼容性不好

### 第二大的区别就是重量级不同

- Express中内置了很多封装好的功能，而Koa中将这些功能都封装到了独立的模块中，想要使用这些功能必须先安装对应的模块才能使用，所以Koa比Express更轻量级

## 使用 Babel 实现 Async 方法

要在 node < 7.6 版本的 Koa 中使用 `async` 方法, 我们推荐使用 [babel's require hook](https://www.babeljs.cn/docs/usage/babel-register/)

```js
require('babel-register');
// 应用的其余 require 需要被放到 hook 后面
const app = require('./app');
```

要解析和编译 async 方法, 你至少应该有 [transform-async-to-generator](https://www.babeljs.cn/docs/plugins/transform-async-to-generator/) 或 [transform-async-to-module-method](https://www.babeljs.cn/docs/plugins/transform-async-to-module-method/) 插件.

例如, 在你的 `.babelrc` 文件中, 你应该有:

```json
{
  "plugins": ["transform-async-to-generator"]
}
```

你也可以用 [env preset](https://www.babeljs.cn/docs/plugins/preset-env/) 的 target 参数 `"node": "current"` 替代.

## 前置知识promise—async+await

### Koa的中间件next()

- [【Node】深入浅出 Koa 的洋葱模型 - 掘金 (juejin.cn)](https://juejin.cn/post/7012031464237694983)
- [三言两语说透koa的洋葱模型 - 掘金 (juejin.cn)](https://juejin.cn/post/7262158134323560508)

Koa 的中间件是通过 Async/Await 实现的，中间件执行顺序是“洋葱圈”模型。

每一个中间件就相当于洋葱的一层，请求从最外层进去，然后从最里层出来，每个中间件都会执行两次。

next() 的作用是将控制权交给下一个中间件，当一个中间件调用 next() 后，会暂停当前中间件的执行，进入下一个中间件，直到下一个中间件不再执行 next() 时沿路返回，依次将控制权交给上一个中间件。

例如，以下代码定义了三个中间件 one、two、three：

```js
const one = (ctx, next) => {
  console.log('>> one');
  next();
  console.log('<< one');
}

const two = (ctx, next) => {
  console.log('>> two');
  next();
  console.log('<< two');
}

const three = (ctx, next) => {
  console.log('>> three');
  next();
  console.log('<< three');
}

app.use(one);
app.use(two);
app.use(three);
```

当请求到达时，中间件的执行顺序是：

- one 中间件打印 `>> one`，然后调用 next()，进入 two 中间件。
- two 中间件打印 `>> two`，然后调用 next()，进入 three 中间件。
- three 中间件打印 `>> three`，然后调用 next()，但是没有下一个中间件了，所以返回 three 中间件。
- three 中间件打印 `<< three`，然后结束，返回 two 中间件。
- two 中间件打印 `<< two`，然后结束，返回 one 中间件。
- one 中间件打印 `<< one`，然后结束，响应请求。

所以，最终的输出结果是：

```bash
>> one
>> two
>> three
<< three
<< two
<< one
```

如果 three 中间件不调用 next()，那么它就是最后一个执行的中间件，不会再返回上一层，所以输出结果是：

```bash
>> one
>> two
>> three
```

### 迭代器和生成器函数



### co 库执行 promise 和 generator function

co库：[co - npm (npmjs.com)](https://www.npmjs.com/package/co)

### 箭头函数 arrow function

```js
const arrow = (param) => {}

const arrow = param => {}

const arrow = param => console.log(param);
```

### 异步函数 async function 统一世界



### 借助 babel 编译 import 与 export

**Node 8版本不支持import 与 export语法**

#### 解决方法

1.安装babel和插件

```bash
npm i babel-cli babel-preset-env -D
```

2.项目新增配置文件`.babelrc`

```json
{
    "presets": [
        [
            "env",
            {
                "targets": {
                    "node": "current"
                }
            }
        ]
    ]
}
```

3.在package.json的"script"运行命令配置

```
"dev": "nodemon -w src -exec \"babel-node src --presets env\""
```

4.在js使用

```
import { writeFileSync as wfs } from 'fs'
```

##### export使用

export文档：[export - JavaScript | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/export)

### 生产环境使用 babel 支持 es6-7

1.在package.json的"script"打包构建命令配置，安装rimraf 依赖包，`rimraf dist` 打包前删除目录

```json
"build": "rimraf dist && babel src -s -D -d dist --presets env"
```

2.运行编译命令

```bash
npm run build
```

运行打包构建编译后会在生成dist目录

