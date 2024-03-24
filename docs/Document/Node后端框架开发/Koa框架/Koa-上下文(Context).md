# Koa-上下文(Context)

Koa Context 将 node 的 `request` 和 `response` 对象封装到单个对象中，为编写 Web 应用程序和 API 提供了许多有用的方法。

这些操作在 HTTP 服务器开发中频繁使用，它们被添加到此级别而不是更高级别的框架，这将强制中间件重新实现此通用功能。

_每个_ 请求都将创建一个 `Context`，并在中间件中作为接收器引用，或者 `ctx` 标识符，如以下代码片段所示：

```js
app.use(async ctx => {
  ctx; // 这是 Context
  ctx.request; // 这是 koa Request
  ctx.response; // 这是 koa Response
});
```

为方便起见许多上下文的访问器和方法直接委托给它们的 `ctx.request`或 `ctx.response` ，不然的话它们是相同的。 例如 `ctx.type` 和 `ctx.length` 委托给 `response` 对象，`ctx.path` 和 `ctx.method` 委托给 `request`。

## API

`Context` 具体方法和访问器.

### ctx.req - Node 的 `request` 对象

Node的API文档：[HTTP | Node.js v19.2.0 Documentation (nodejs.org)](https://nodejs.org/api/http.html#class-httpincomingmessage)

Node的requset对象类型<http.IncomingMessage>，继承stream.Readable类

```js
req.headers
req.rawHeaders
req.reusedSocket
req.httpVersion
req.method
req.url
req.end()
req.on()
req.once()
req.socket
req.write()
req.destroy()
req.abort()
...
```

### ctx.res - Node 的 `response` 对象

```js
res.setHeader()
res.writeHead()
res.end()
res.wtire()
res.statusCode
res.statusMessage
res.on()
res.socket
res.complete
...
```

绕过 Koa 的 response 处理是 **不被支持的**. 应避免使用以下 node 属性：

- `res.statusCode`
- `res.writeHead()`
- `res.write()`
- `res.end()`

## ctx.request - koa 的 `Request` 对象

koa 的 `Request` 对象，详情查看： **Koa-请求(Request)** 文档

## ctx.response - koa 的 `Response` 对象

koa 的 `Response` 对象，详情查看： **Koa-响应(Response)** 文档

### ctx.state - 用户数据存储空间

推荐的命名空间（用户数据存储空间），用于通过中间件传递信息和你的前端视图。

```js
ctx.state.user = await User.find(id);
```

下一个中间件内使用

```js
console.log(ctx.state.user)
```

### ctx.app - Application 对象

应用程序实例引用，Application 对象（const app = new Koa()实例化对象）

### ctx.app.emit - 定义一个类型由第一个参数定义的事件

Koa 应用扩展了内部 [EventEmitter](https://nodejs.org/dist/latest-v11.x/docs/api/events.html)。`ctx.app.emit` 发出一个类型由第一个参数定义的事件。对于每个事件，您可以连接 "listeners"，这是在发出事件时调用的函数。有关更多信息，请参阅[错误处理文档](https://koajs.com/#error-handling)。

### ctx.cookies.get(name, [options]) - 获取cookies

通过 `options` 获取 cookie `name`:

- `signed` 所请求的cookie应该被签名

koa 使用 [cookies](https://github.com/pillarjs/cookies) 模块，其中只需传递参数。

### ctx.cookies.set(name, value, [options]) - 设置cookies

通过 `options` 设置 cookie `name` 的 `value` :

- `maxAge`: 一个数字, 表示从 `Date.now()` 得到的毫秒数.
  - `expires`: 一个 `Date` 对象, 表示 cookie 的到期日期 (默认情况下在会话结束时过期).
  - `path`：一个字符串, 表示 cookie 的路径 (默认是`/`).
  - `domain`：一个字符串, 指示 cookie 的域 (无默认值).
  - `secure`：一个布尔值, 表示 cookie 是否仅通过 HTTPS 发送 (HTTP 下默认为 `false`, HTTPS 下默认为 `true`). [阅读有关此参数的更多信息](https://github.com/pillarjs/cookies#secure-cookies).
  - `httpOnly`：一个布尔值, 表示 cookie 是否仅通过 HTTP(S) 发送，, 且不提供给客户端 JavaScript (默认为 `true`).
  - `sameSite`：一个布尔值或字符串, 表示该 cookie 是否为 "相同站点" cookie (默认为 `false`). 可以设置为 `'strict'`, `'lax'`, `'none'`, 或 `true` (映射为 `'strict'`).
  - `signed`：一个布尔值, 表示是否要对 cookie 进行签名 (默认为 `false`). 如果为 `true`, 则还会发送另一个后缀为 `.sig` 的同名 cookie, 使用一个 27-byte url-safe base64 SHA1 值来表示针对第一个 [Keygrip](https://www.npmjs.com/package/keygrip) 键的 `cookie-name=cookie-value` 的哈希值. 此签名密钥用于检测下次接收 cookie 时的篡改.
  - `overwrite`：一个布尔值, 表示是否覆盖以前设置的同名的 cookie (默认是 `false`). 如果是 true, 在同一个请求中设置相同名称的所有 Cookie（无论路径或域）是否在设置此Cookie 时从 Set-Cookie 消息头中过滤掉.

koa 使用传递简单参数的 [cookies](https://github.com/pillarjs/cookies) 模块。

### ctx.throw([status], [msg], [properties]) - 抛出错误

用来抛出一个包含 `.status` 属性错误的帮助方法，其默认值为 `500`。这样 Koa 就可以做出适当地响应。

允许以下组合：

```js
ctx.throw(400);
ctx.throw(400, 'name required');
ctx.throw(400, 'name required', { user: user });
```

例如 `ctx.throw(400, 'name required')` 等效于:

```js
const err = new Error('name required');
err.status = 400;
err.expose = true;
throw err;
```

请注意，这些是用户级错误，并用 `err.expose` 标记，这意味着消息适用于客户端响应，这通常不是错误消息的内容，因为您不想泄漏故障详细信息。

你可以根据需要将 `properties` 对象传递到错误中，对于装载上传给请求者的机器友好的错误是有用的。这用于修饰其人机友好型错误并向上游的请求者报告非常有用。

```js
ctx.throw(401, 'access_denied', { user: user });
```

koa 使用 [http-errors](https://github.com/jshttp/http-errors) 来创建错误。`status` 只应作为第一个参数传递。

### ctx.assert(value, [status], [msg], [properties]) - 错误的帮助方法

当 `!value` 时抛出一个类似 `.throw` 错误的帮助方法。这与 node 的 [assert()](http://nodejs.org/api/assert.html) 方法类似.

```js
ctx.assert(ctx.state.user, 401, 'User not found. Please login!');
```

koa 使用 [http-assert](https://github.com/jshttp/http-assert) 作为断言。

### ctx.respond - 写入原始的 `res` 对象（不支持使用）

为了绕过 Koa 的内置 response 处理，你可以显式设置 `ctx.respond = false;`。 如果您想要写入原始的 `res` 对象而不是让 Koa 处理你的 response，请使用此参数。

请注意，Koa _不_ 支持使用此功能。这可能会破坏 Koa 中间件和 Koa 本身的预期功能。使用这个属性被认为是一个 hack，只是便于那些希望在 Koa 中使用传统的 `fn(req, res)` 功能和中间件的人。

## 请求 Request 别名 - 以下映射到ctx.request里面

以下访问器和 `koa-请求(Request)` 文档的别名等效：

| Request API                     | 作用                                                                                                                                                                                                                |
|:------------------------------- |:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ctx.header                      | 获取请求头对象信息。这与 node [`http.IncomingMessage`](https://nodejs.org/api/http.html#http_class_http_incomingmessage) 上的 [`headers`](https://nodejs.org/api/http.html#http_message_headers) 字段相同                           |
| ctx.header=                     | 设置请求头对象                                                                                                                                                                                                           |
| ctx.headers                     | 请求头对象。别名为 `request.header`                                                                                                                                                                                        |
| ctx.headers=                    | 设置请求头对象。别名为 `request.header=`                                                                                                                                                                                     |
| ctx.method                      | 请求方法（GET POST）                                                                                                                                                                                                    |
| ctx.method=                     | 设置请求方法，对于实现诸如 `methodOverride()` 的中间件是有用的                                                                                                                                                                         |
| ctx.url                         | 获取请求 URL                                                                                                                                                                                                          |
| ctx.url=                        | 设置请求 URL, 对 url 重写有用                                                                                                                                                                                              |
| ctx.originalUrl                 | 获取请求原始URL                                                                                                                                                                                                         |
| ctx.origin                      | 获取URL的来源，包括 `protocol` 和 `host`<br/>`ctx.origin`                                                                                                                                                                  |
| ctx.href                        | 获取完整的请求URL，包括 `protocol`，`host` 和 `url`                                                                                                                                                                           |
| ctx.path                        | 获取请求路径名                                                                                                                                                                                                           |
| ctx.path=                       | 设置请求路径名，并在存在时保留查询字符串                                                                                                                                                                                              |
| ctx.query                       | 获取解析的查询字符串, 当没有查询字符串时，返回一个空对象。请注意，此 getter _不_ 支持嵌套解析<br/>获取查询字符串，获取GET请求 ? 后的参数，如：localhost:9000/users?name='aaa'                                                                                                |
| ctx.query=                      | 将查询字符串设置为给定对象。 请注意，此 setter _不_ 支持嵌套对象                                                                                                                                                                            |
| ctx.querystring                 | 根据 `?` 获取原始查询字符串                                                                                                                                                                                                  |
| ctx.querystring=                | 设置原始查询字符串                                                                                                                                                                                                         |
| ctx.params.id                   | 获取GET请求路由(/user/:id)参数， 如：localhost:9000/user/1                                                                                                                                                                   |
| ctx.host                        | 存在时获取主机（hostname:port）。当 `app.proxy` 是 **true** 时支持 `X-Forwarded-Host`，否则使用 `Host`                                                                                                                                |
| ctx.hostname                    | 存在时获取主机名。当 `app.proxy` 是 **true** 时支持 `X-Forwarded-Host`，否则使用 `Host`。<br/><br/>如果主机是 IPv6, Koa 解析到 [WHATWG URL API](https://nodejs.org/dist/latest-v8.x/docs/api/url.html#url_the_whatwg_url_api), *注意* 这可能会影响性能。 |
| ctx.fresh                       | 检查请求缓存是否“新鲜”，也就是内容没有改变。此方法用于 `If-None-Match` / `ETag`, 和 `If-Modified-Since` 和 `Last-Modified` 之间的缓存协商。 在设置一个或多个这些响应头后应该引用它。<br/>使用方法查看文档：`koa-请求(Request)`                                                       |
| ctx.stale                       | 与 `ctx.fresh` 相反                                                                                                                                                                                                  |
| ctx.socket                      | 返回请求套接字                                                                                                                                                                                                           |
| ctx.protocol                    | 返回请求协议，“https” 或 “http”。当 `app.proxy`是 **true** 时支持 `X-Forwarded-Proto`                                                                                                                                           |
| ctx.secure                      | 通过 `ctx.protocol == "https"` 来检查请求是否通过 TLS 发出                                                                                                                                                                     |
| ctx.ip                          | 请求远程地址。 当 `app.proxy` 是 **true** 时支持 `X-Forwarded-Proto`                                                                                                                                                          |
| ctx.ips                         | 当 `X-Forwarded-For` 存在并且 `app.proxy` 被启用时，这些 ips 的数组被返回，从上游 - >下游排序。 禁用时返回一个空数组<br/>具体查看文档：`koa-请求(Request)`                                                                                                      |
| ctx.subdomains                  | 以数组形式返回子域<br/>具体查看文档：`koa-请求(Request)`                                                                                                                                                                            |
| ctx.is()                        | 检查传入请求是否包含 `Content-Type` 消息头字段， 并且包含任意的 mime `type`。 如果没有请求主体，返回 `null`。 如果没有内容类型，或者匹配失败，则返回 `false`。 反之则返回匹配的 content-type<br/>使用方法查看文档：`koa-请求(Request)`                                                       |
| ctx.accepts(types)              | 检查给定的 `type(s)` 是否可以接受，如果 `true`，返回最佳匹配，否则为 `false`。 `type` 值可能是一个或多个 mime 类型的字符串，如 `application/json`，扩展名称如 `json`，或数组 `["json", "html", "text/plain"]`<br/>使用方法查看文档：`koa-请求(Request)`                           |
| ctx.acceptsEncodings(encodings) | 检查 `encodings` 是否可以接受，返回最佳匹配为 `true`，否则为 `false`。 请注意，您应该将`identity` 作为编码之一<br/>使用方法查看文档：`koa-请求(Request)`                                                                                                        |
| ctx.acceptsCharsets(charsets)   | 检查 `charsets` 是否可以接受，在 `true` 时返回最佳匹配，否则为 `false`<br/>使用方法查看文档：`koa-请求(Request)`                                                                                                                                  |
| ctx.acceptsLanguages(langs)     | 检查 `langs` 是否可以接受，如果为 `true`，返回最佳匹配，否则为 `false`<br/>使用方法查看文档：`koa-请求(Request)`                                                                                                                                    |
| ctx.get()                       | 返回请求头(header), `field` 不区分大小写                                                                                                                                                                                     |

## 响应 Response 别名 - 以下映射到ctx.response里面

以下访问器和 `koa-响应(Response)` 文档的别名等效：

| Response API       | 作用                                                                                                                                            |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| ctx.body           | 获取响应主体，POST 提交的参数 (需要中间件：koa-bodyparser）                                                                                                      |
| ctx.body=          | 将响应体设置为-详情看使用方法文档<br/>使用方法文档：`koa-响应(Response)`                                                                                               |
| ctx.status         | 获取响应状态。默认情况下，`response.status` 设置为 `404` 而不是像 node 的 `res.statusCode` 那样默认为 `200`                                                             |
| ctx.status=        | 通过数字代码设置响应状态，具体数字含义请看文档：`koa-响应(Response)`                                                                                                    |
| ctx.message        | 获取响应的状态消息. 默认情况下, `response.message` 与 `response.status` 关联                                                                                   |
| ctx.message=       | 将响应的状态消息设置为给定值                                                                                                                                |
| ctx.length=        | 将响应的 Content-Length 设置为给定值                                                                                                                    |
| ctx.length         | 以数字返回响应的 Content-Length，或者从`ctx.body`推导出来，或者`undefined`                                                                                       |
| ctx.type=          | 设置响应 `Content-Type` 通过 mime 字符串或文件扩展名<br/>使用方法文档：`koa-响应(Response)`                                                                           |
| ctx.type           | 获取响应 `Content-Type`, 不含 "charset" 等参数                                                                                                         |
| ctx.headerSent     | 检查是否已经发送了一个响应头。 用于查看客户端是否可能会收到错误通知                                                                                                            |
| **ctx.redirect()** | 执行 [302] 重定向到 `url`<br/>使用方法文档：`koa-响应(Response)`                                                                                             |
| ctx.attachment()   | 将 `Content-Disposition` 设置为 “附件” 以指示客户端提示下载。(可选)指定下载的 `filename` 和部分 [参数](https://github.com/jshttp/content-disposition#options)              |
| ctx.set()          | 用一个对象设置多个响应头`fields`:<br/>```ctx.set({'Etag': '1234', 'Last-Modified': date});```                                                             |
| ctx.append()       | 用值 `val` 附加额外的消息头 `field`。<br/>```ctx.append('Link', '<http://127.0.0.1/>');```                                                               |
| ctx.remove()       | 删除消息头 `field`                                                                                                                                 |
| ctx.lastModified=  | 将 `Last-Modified` 消息头设置为适当的 UTC 字符串。您可以将其设置为 `Date` 或日期字符串。<br/>```<br/>ctx.response.lastModified = new Date();<br/>```                       |
| ctx.etag=          | 设置包含 `"` 包裹的 ETag 响应， 请注意，没有相应的 `response.etag` getter<br/>```ctx.response.etag = crypto.createHash('md5').update(ctx.body).digest('hex');``` |
