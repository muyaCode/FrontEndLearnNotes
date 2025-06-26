# Koa-响应(Response)

Koa `Response` 对象是在 node 的原生响应对象之上的抽象，提供了诸多对 HTTP 服务器开发有用的功能。

## API

### response.header

响应头对象。

### response.headers

响应头对象。别名是 `response.header`。

### response.socket

响应套接字。 作为 `request.socket` 指向 net.Socket 实例。

### response.status

获取响应状态。默认情况下，`response.status` 设置为 `404` 而不是像 node 的 `res.statusCode` 那样默认为 `200`。

### response.status=

通过数字代码设置响应状态：

- 100 "continue"
- 101 "switching protocols"
- 102 "processing"
- 200 "ok"
- 201 "created"
- 202 "accepted"
- 203 "non-authoritative information"
- 204 "no content"
- 205 "reset content"
- 206 "partial content"
- 207 "multi-status"
- 208 "already reported"
- 226 "im used"
- 300 "multiple choices"
- 301 "moved permanently"
- 302 "found"
- 303 "see other"
- 304 "not modified"
- 305 "use proxy"
- 307 "temporary redirect"
- 308 "permanent redirect"
- 400 "bad request"
- 401 "unauthorized"
- 402 "payment required"
- 403 "forbidden"
- 404 "not found"
- 405 "method not allowed"
- 406 "not acceptable"
- 407 "proxy authentication required"
- 408 "request timeout"
- 409 "conflict"
- 410 "gone"
- 411 "length required"
- 412 "precondition failed"
- 413 "payload too large"
- 414 "uri too long"
- 415 "unsupported media type"
- 416 "range not satisfiable"
- 417 "expectation failed"
- 418 "I'm a teapot"
- 422 "unprocessable entity"
- 423 "locked"
- 424 "failed dependency"
- 426 "upgrade required"
- 428 "precondition required"
- 429 "too many requests"
- 431 "request header fields too large"
- 500 "internal server error"
- 501 "not implemented"
- 502 "bad gateway"
- 503 "service unavailable"
- 504 "gateway timeout"
- 505 "http version not supported"
- 506 "variant also negotiates"
- 507 "insufficient storage"
- 508 "loop detected"
- 510 "not extended"
- 511 "network authentication required"

**注意**: 不用太在意记住这些字符串, 如果你写错了,可以查阅这个列表随时更正.

由于 `response.status` 默认设置为 `404`，因此发送没有 body 且状态不同的响应的操作如下：

```js
ctx.response.status = 200;

// 或其他任何状态
ctx.response.status = 204;
```

### response.message

获取响应的状态消息. 默认情况下, `response.message` 与 `response.status` 关联.

### response.message=

将响应的状态消息设置为给定值。

### response.length=

将响应的 Content-Length 设置为给定值。

### response.length

以数字返回响应的 Content-Length，或者从`ctx.body`推导出来，或者`undefined`。

### response.body

获取响应主体。

### response.body=

将响应体设置为以下之一：

- `string` 写入
- `Buffer` 写入
- `Stream` 管道
- `Object` || `Array` JSON-字符串化
- `null` 无内容响应

如果 `response.status` 未被设置, Koa 将会自动设置状态为 `200` 或 `204`。

Koa 没有防范作为响应体的所有内容 - 函数没有有意义地序列化，返回布尔值可能会根据您的应用程序而有意义。并且当错误生效时，它可能无法正常工作 错误的属性无法枚举。 我们建议在您的应用中添加中间件，以确定每个应用的正文类型。 示例中间件可能是：

```js
app.use(async (ctx, next) => {
  await next()

  ctx.assert.equal('object', typeof ctx, 500, '某些开发错误')
})
```

#### String

Content-Type 默认为 `text/html` 或 `text/plain`, 同时默认字符集是 utf-8。Content-Length 字段也是如此。

#### Buffer

Content-Type 默认为 `application/octet-stream`, 并且 Content-Length 字段也是如此。

#### Stream

Content-Type 默认为 `application/octet-stream`。

每当流被设置为响应主体时，`.onerror` 作为侦听器自动添加到 `error` 事件中以捕获任何错误。此外，每当请求关闭（甚至过早）时，流都将被销毁。如果你不想要这两个功能，请勿直接将流设为主体。例如，当将主体设置为代理中的 HTTP 流时，你可能不想要这样做，因为它会破坏底层连接。

参阅: <https://github.com/koajs/koa/pull/612> 获取更多信息。

以下是流错误处理的示例，而不会自动破坏流：

```js
const PassThrough = require('stream').PassThrough;

app.use(async ctx => {
  ctx.body = someHTTPStream.on('error', (err) => ctx.onerror(err)).pipe(PassThrough());
});
```

#### Object

Content-Type 默认为 `application/json`. 这包括普通的对象 `{ foo: 'bar' }` 和数组 `['foo', 'bar']`。

### response.get(field)

不区分大小写获取响应头字段值 `field`。

```js
const etag = ctx.response.get('ETag');
```

### response.has(field)

如果当前在响应头中设置了由名称标识的消息头，则返回 `true`. 消息头名称匹配不区分大小写.

```js
const rateLimited = ctx.response.has('X-RateLimit-Limit');
```

### response.set(field, value)

设置响应头 `field` 到 `value`:

```js
ctx.set('Cache-Control', 'no-cache');
```

### response.append(field, value)

用值 `val` 附加额外的消息头 `field`。

```js
ctx.append('Link', '<http://127.0.0.1/>');
```

### response.set(fields)

用一个对象设置多个响应头`fields`:

```js
ctx.set({
  'Etag': '1234',
  'Last-Modified': date
});
```

这将委托给 [setHeader](https://nodejs.org/dist/latest/docs/api/http.html#http_request_setheader_name_value) ，它通过指定的键设置或更新消息头，并且不重置整个消息头。

### response.remove(field)

删除消息头 `field`。

### response.type

获取响应 `Content-Type`, 不含 "charset" 等参数。

> 译者注: 这里其实是只获取 *mime-type*, 详见[源码及其注释](https://github.com/koajs/koa/blob/eda27608f7d39ede86d7b402aae64b1867ce31c6/lib/response.js#L371)

```js
const ct = ctx.type;
// => "image/png"
```

### response.type=

设置响应 `Content-Type` 通过 mime 字符串或文件扩展名。

```js
ctx.type = 'text/plain; charset=utf-8';
ctx.type = 'image/png';
ctx.type = '.png';
ctx.type = 'png';
```

注意: 在适当的情况下为你选择 `charset`, 比如 `response.type = 'html'` 将默认是 "utf-8". 如果你想覆盖 `charset`, 使用 `ctx.set('Content-Type', 'text/html')` 将响应头字段设置为直接值。

### response.is(types...)

非常类似 `ctx.request.is()`. 检查响应类型是否是所提供的类型之一。这对于创建操纵响应的中间件特别有用。

例如, 这是一个中间件，可以削减除流之外的所有HTML响应。

```js
const minify = require('html-minifier');

app.use(async (ctx, next) => {
  await next();

  if (!ctx.response.is('html')) return;

  let body = ctx.body;
  if (!body || body.pipe) return;

  if (Buffer.isBuffer(body)) body = body.toString();
  ctx.body = minify(body);
});
```

### response.redirect(url, [alt])

执行 [302] 重定向到 `url`.

字符串 “back” 是特别提供 Referrer 支持的，当 Referrer 不存在时，使用 `alt` 或 “/”。

```js
ctx.redirect('back');
ctx.redirect('back', '/index.html');
ctx.redirect('/login');
ctx.redirect('http://google.com');
```

要更改 “302” 的默认状态，只需在该调用之前或之后给 `status` 赋值。要变更主体请在此调用之后:

```js
ctx.status = 301;
ctx.redirect('/cart');
ctx.body = 'Redirecting to shopping cart';
```

### response.attachment([filename], [options])

将 `Content-Disposition` 设置为 “附件” 以指示客户端提示下载。(可选)指定下载的 `filename` 和部分 [参数](https://github.com/jshttp/content-disposition#options)。

### response.headerSent

检查是否已经发送了一个响应头。 用于查看客户端是否可能会收到错误通知。

### response.lastModified

将 `Last-Modified` 消息头返回为 `Date`, 如果存在。

### response.lastModified=

将 `Last-Modified` 消息头设置为适当的 UTC 字符串。您可以将其设置为 `Date` 或日期字符串。

```js
ctx.response.lastModified = new Date();
```

### response.etag=

设置包含 `"` 包裹的 ETag 响应， 请注意，没有相应的 `response.etag` getter。

```js
ctx.response.etag = crypto.createHash('md5').update(ctx.body).digest('hex');
```

### response.vary(field)

设置 `field` 的 `vary`。

### response.flushHeaders()

刷新任何设置的消息头，然后是主体(body)。
