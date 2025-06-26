# Koa-应用(Application)

## koa项目初始

1.新建项目目录，初始化项目的package.json

```bash
npm init
```

2.安装koa

```bash
npm i koa
```

3.利用Node的http和https内置库将同一个应用程序同时作为 HTTP 和 HTTPS 或多个地址

```js
const http = require('http');
const https = require('https');
const Koa = require('koa');

const app = new Koa();

app.use(async ctx => {
  ctx.body = 'Koa服务启动成功'
})

/* 开始监听http服务 */
http.createServer(app.callback()).listen(3000);
/* 开始监听https服务 */
https.createServer(app.callback()).listen(3001);
```

## 项目设置属性

应用程序设置是 `app` 实例上的属性，目前支持如下：

- `app.env` 默认是 **NODE_ENV** 或 "development"
- `app.keys` 签名的 cookie 密钥数组
- `app.proxy` 当真正的代理头字段将被信任时
- 忽略 `.subdomains` 的 `app.subdomainOffset` 偏移量，默认为 2
- `app.proxyIpHeader` 代理 ip 消息头, 默认为 `X-Forwarded-For`
- `app.maxIpsCount` 从代理 ip 消息头读取的最大 ips, 默认为 0 (代表无限)

您可以将设置传递给构造函数:

```js
const Koa = require('koa');
const app = new Koa({ proxy: true });
```

或动态的:

```js
const Koa = require('koa');
const app = new Koa();
app.proxy = true;
```

bin/www可执行文件配置

```js

```

## 实例化new Koa()的属性和方法

```js
const Koa = require('koa');
const app = new Koa();
```

下面是app的方法和属性

### app.listen(...) 端口监听

Koa 应用程序不是 HTTP 服务器的1对1展现。 可以将一个或多个 Koa 应用程序安装在一起以形成具有单个HTTP服务器的更大应用程序。

创建并返回 HTTP 服务器，将给定的参数传递给 `Server#listen()`。这些内容都记录在 [nodejs.org](http://nodejs.org/api/http.html#http_server_listen_port_hostname_backlog_callback).

以下是一个无作用的 Koa 应用程序被绑定到 `3000` 端口：

```javascript
const Koa = require('koa');
const app = new Koa();
app.listen(3000);
```

这里的 `app.listen(...)` 方法只是以下方法的语法糖:

```javascript
const http = require('http');
const Koa = require('koa');
const app = new Koa();
http.createServer(app.callback()).listen(3000);
```

这意味着您可以将同一个应用程序同时作为 HTTP 和 HTTPS 或多个地址：

```javascript
const http = require('http');
const https = require('https');
const Koa = require('koa');
const app = new Koa();
http.createServer(app.callback()).listen(3000);
https.createServer(app.callback()).listen(3001);
```

### app.callback() 方法的回调函数

返回适用于 `http.createServer()` 方法的回调函数来处理请求。你也可以使用此回调函数将 koa 应用程序挂载到 Connect/Express 应用程序中。

### app.use(function) 请求到来时执行的函数（注册中间件）

将给定的中间件方法添加到此应用程序。`app.use()` 返回 `this`, 因此可以链式表达调用.

```js
app.use(someMiddleware)
app.use(someOtherMiddleware)
app.listen(3000)
```

它等同于

```js
app.use(someMiddleware)
  .use(someOtherMiddleware)
  .listen(3000)
```

参阅 [Middleware](https://github.com/koajs/koa/wiki#middleware) 获取更多信息.

### app.keys=  设置签名的 Cookie 密钥

这些被传递给 [KeyGrip](https://github.com/crypto-utils/keygrip)，但是你也可以传递你自己的 `KeyGrip` 实例。

例如，以下是可以接受的：

```js
app.keys = ['im a newer secret', 'i like turtle'];
app.keys = new KeyGrip(['im a newer secret', 'i like turtle'], 'sha256');
```

这些密钥可以倒换，并在使用 `{ signed: true }` 参数签名 Cookie 时使用。

```js
ctx.cookies.set('name', 'tobi', { signed: true });
```

### app.context 是app.use(async ctx => {})的参数

`app.context` 是从其创建 `ctx` 的原型。

所有的app.use下的ctx都是共享的，可以在某一个app.use中通过ctx来传递数据给下一个app.use中间件：使用ctx.state.xxx传递，文档请看： **Koa-上下文(Context)**

您可以通过编辑 `app.context` 为 `ctx` 添加其他属性。这对于将 `ctx` 添加到整个应用程序中使用的属性或方法非常有用，这可能会更加有效（不需要中间件）和/或 更简单（更少的 `require()`），而更多地依赖于`ctx`，这可以被认为是一种反模式。

例如，要从 `ctx` 添加对数据库的引用：

```js
app.context.db = db();

app.use(async ctx => {
  console.log(ctx.db);
});
```

注意:

- `ctx` 上的许多属性都是使用 `getter` ，`setter` 和 `Object.defineProperty()` 定义的。你只能通过在 `app.context` 上使用 `Object.defineProperty()` 来编辑这些属性（不推荐）。查阅：<https://github.com/koajs/koa/issues/652>.
- 安装的应用程序目前使用其父级的 `ctx` 和设置。 因此，安装的应用程序只是一组中间件。

### app.on 错误处理

默认情况下，将所有错误输出到 stderr，除非 `app.silent` 为 `true`。 当 `err.status` 是 `404` 或 `err.expose` 是 `true` 时默认错误处理程序也不会输出错误。 要执行自定义错误处理逻辑，如集中式日志记录，您可以添加一个 “error” 事件侦听器：

```js
app.on('error', err => {
  log.error('server error', err)
});
```

如果 req/res 期间出现错误，并且 _无法_ 响应客户端，`Context`实例仍然被传递：

```js
app.on('error', (err, ctx) => {
  log.error('server error', err, ctx)
});
```

当发生错误 _并且_ 仍然可以响应客户端时，也没有数据被写入 socket 中，Koa 将用一个 500 “内部服务器错误” 进行适当的响应。在任一情况下，为了记录目的，都会发出应用级 “错误”。
