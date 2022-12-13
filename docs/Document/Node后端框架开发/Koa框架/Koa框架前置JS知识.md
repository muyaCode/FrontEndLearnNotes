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
