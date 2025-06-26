# WebSocket

**MDN文档**：[WebSocket API - Web API | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/API/WebSockets_API)

[WebSocket (javascript.info)](https://zh.javascript.info/websocket)

[HTML5 WebSocket | 菜鸟教程 (runoob.com)](https://www.runoob.com/html/html5-websocket.html)

## WebSocket简介

**WebSocket API** 是一种先进的技术，可在用户浏览器和服务器之间开启双向交互式通信会话。利用该 API，可以向服务器发送信息，并接收事件驱动的响应，而无需轮询服务器以获得回复。

**备注：** 虽然 WebSocket 连接在功能上与标准 Unix 风格的 socket 有些类似，但两者并无关联。

## 接口

### [`WebSocket`](https://developer.mozilla.org/zh-CN/docs/Web/API/WebSocket)

**用于连接 WebSocket 服务器的主要接口，之后可以在这个连接上发送和接收数据。**

### [`CloseEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/CloseEvent)

**连接关闭时 WebSocket 对象触发的事件。**

### [`MessageEvent`](https://developer.mozilla.org/zh-CN/docs/Web/API/MessageEvent)

**当从服务器获取到消息的时候 WebSocket 对象触发的事件。**

## WebSocket API的基本使用

WebSocket API：[WebSocket - Web API 接口 |MDN的 (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/API/WebSocket)

```js
// 创建ws连接
const ws = new WebSocket('ws://localhost:8080/test');
ws.onopen = function() {
    console.log('WebSocket 连接已经建立。');
    ws.send('Hello, server!');
};
ws.onmessage = function(event) {
    console.log('收到服务器消息：', event.data);
};
ws.onerror = function(event) {
    console.error('WebSocket 连接出现错误：', event);
};
ws.onclose = function() {
    console.log('WebSocket 连接已经关闭。');
}
```

## 编写 WebSocket 客户端应用

MDN文档：[编写 WebSocket 客户端应用 - Web API | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/API/WebSockets_API/Writing_WebSocket_client_applications)

## 编写 WebSocket 服务器

MDN文档：[编写 WebSocket 服务器 - Web API | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/API/WebSockets_API/Writing_WebSocket_servers)

## Deno用 JavaScript 编写 WebSocket 服务器

参考：[使用 JavaScript 编写 WebSocket 服务器 （Deno） - Web API |MDN的 (mozilla.org)](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API/Writing_a_WebSocket_server_in_JavaScript_Deno#code)

此示例演示如何使用 Deno 创建 WebSocket API 服务器，并附带一个网页。

Deno 是一个 JavaScript 运行时，它支持 TypeScript 即时编译和缓存。Deno 内置了格式化程序、linter、测试运行器等，还实现了许多 Web API。通过符合 Web 标准，所有特定于 Deno 的 API 都在命名空间下实现。`Deno`

[Deno 网站](https://deno.com/)提供了安装 Deno 的说明。

代码将包含在两个文件中，一个用于服务器，一个用于客户端。

### 服务端

创建一个`main.js`文件。此文件将包含简单 HTTP 服务器的代码，该服务器也将为客户端 HTML 提供服务。

```js
Deno.serve({
  port: 80,
  handler: async (request) => {
    // If the request is a websocket upgrade,
    // we need to use the Deno.upgradeWebSocket helper
    if (request.headers.get("upgrade") === "websocket") {
      const { socket, response } = Deno.upgradeWebSocket(request);

      socket.onopen = () => {
        console.log("CONNECTED");
      };
      socket.onmessage = (event) => {
        console.log(`RECEIVED: ${event.data}`);
        socket.send("pong");
      };
      socket.onclose = () => console.log("DISCONNECTED");
      socket.onerror = (error) => console.error("ERROR:", error);

      return response;
    } else {
      // If the request is a normal HTTP request,
      // we serve the client HTML file.
      const file = await Deno.open("./index.html", { read: true });
      return new Response(file.readable);
    }
  },
});
```

`Deno.upgradeWebSocket()`将连接升级到 WebSocket 连接，[这在协议升级机制](https://developer.mozilla.org/en-US/docs/Web/HTTP/Protocol_upgrade_mechanism)中有进一步说明。

[`Deno.serve()`](https://deno.land/api@v1.36.4?s=Deno.serve) 在后台使用 `Deno.listen()`和 `Deno.serveHttp()`，是一个更高级的接口，可以轻松设置 HTTP 服务器。

如果没有它，代码将如下所示。

```js
for await (const conn of Deno.listen({ port: 80 })) {
  for await (const { request, respondWith } of Deno.serveHttp(conn)) {
    respondWith(handler(request));
  }
}
```

### 客户端

创建一个`index.html`文件。此文件将包含一个脚本，该脚本将在建立连接后每五秒对服务器执行一次 ping 操作。

```html
<!doctype html>
<h2>WebSocket Test</h2>
<p>Sends a ping every five seconds</p>
<div id="output"></div>
<script>
  const wsUri = "ws://127.0.0.1/";
  const output = document.querySelector("#output");
  const websocket = new WebSocket(wsUri);
  let pingInterval;

  function writeToScreen(message) {
    output.insertAdjacentHTML("afterbegin", `<p>${message}</p>`);
  }

  function sendMessage(message) {
    writeToScreen(`SENT: ${message}`);
    websocket.send(message);
  }

  websocket.onopen = (e) => {
    writeToScreen("CONNECTED");
    sendMessage("ping");
    pingInterval = setInterval(() => {
      sendMessage("ping");
    }, 5000);
  };

  websocket.onclose = (e) => {
    writeToScreen("DISCONNECTED");
    clearInterval(pingInterval);
  };

  websocket.onmessage = (e) => {
    writeToScreen(`RECEIVED: ${e.data}`);
  };

  websocket.onerror = (e) => {
    writeToScreen(`ERROR: ${e.data}`);
  };
</script>
```

### 运行代码

使用这两个文件，使用 Deno 运行应用程序。

```bash
deno run --allow-net=0.0.0.0:80 --allow-read=./index.html main.js
```

Deno 要求我们为可以在主机上访问的内容提供明确的权限。

- `--allow-net=0.0.0.0:80`允许应用在端口 80 上附加到 localhost
- `--allow-read=./index.html`允许访问客户端的 HTML 文件

## 在线工具

[websocket在线测试 (websocket-test.com)](http://www.websocket-test.com/)

## 工具库

- [AsyncAPI](https://www.asyncapi.com/)：用于描述基于 WebSocket 等协议的事件驱动架构的规范。可以使用它来描述基于 WebSocket 的 API，就像使用 OpenAPI 规范描述 REST API 一样。了解[为什么要考虑将 AsyncAPI 与 WebSocket 结合使用](https://www.asyncapi.com/blog/websocket-part1)和[如何使用](https://www.asyncapi.com/blog/websocket-part2)。
- [HumbleNet](https://hacks.mozilla.org/2017/06/introducing-humblenet-a-cross-platform-networking-library-that-works-in-the-browser/)：一个在浏览器中工作的跨平台网络库。它由 WebSocket 和 WebRTC 的 C 语言封装器组成，可抽象出跨浏览器的差异，便于为游戏和其他应用程序创建多用户网络功能。
- [µWebSockets](https://github.com/uNetworking/uWebSockets)：由 [C++11](https://isocpp.org/) 和 [Node.js](https://nodejs.org/) 实现的高度可扩展的 WebSocket 服务器和客户端。
- [Socket.IO](https://socket.io/)：基于长轮询和 WebSocket 的 [Node.js](https://nodejs.org/) 第三方传输协议。
- [SocketCluster](https://socketcluster.io/)：适用于 [Node.js](https://nodejs.org/) 的 pub/sub WebSocket 框架，注重可扩展性。
- [WebSocket-Node](https://github.com/theturtle32/WebSocket-Node)：用 [Node.js](https://nodejs.org/) 实现的 WebSocket 服务器 API。
- [Total.js](https://www.totaljs.com/)：用 [Node.js](https://nodejs.org/) 实现的 Web 应用程序框架（例如：[WebSocket 聊天](https://github.com/totaljs/examples/tree/master/websocket)）。
- [Faye](https://www.npmjs.com/package/faye-websocket)：用于 [Node.js](https://nodejs.org/) 服务器和客户端的 [`WebSocket`](https://developer.mozilla.org/zh-CN/docs/Web/API/WebSocket)（双向连接）和 [EventSource](https://developer.mozilla.org/zh-CN/docs/Web/API/EventSource)（单向连接）。
- [SignalR](https://dotnet.microsoft.com/zh-cn/apps/aspnet/signalr)：当 WebSocket 可用时，SignalR 将在覆盖范围内使用 WebSocket；当 WebSocket 不可用时，SignalR 将优雅地回退到其他技术，而应用程序代码保持不变。
- [Caddy](https://caddyserver.com/)：能够将任意命令（stdin/stdout）代理为 websocket 的 web 服务器。
- [ws](https://github.com/websockets/ws)：流行的 WebSocket 客户端和服务器 [Node.js](https://nodejs.org/) 库。
- [jsonrpc-bidirectional](https://github.com/bigstepinc/jsonrpc-bidirectional)：异步 RPC，在一个连接上，服务器和客户端可以同时导出函数（客户端可以调用服务器，服务器也可以调用客户端）。
- [cowboy](https://github.com/ninenines/cowboy)：Cowboy 是一款小型、快速、现代的 Erlang/OTP HTTP 服务器，支持 WebSocket。
- [ZeroMQ](https://zeromq.org/)：ZeroMQ 是一个可嵌入的网络库，可通过进程内、IPC、TCP、UDP、TIPC、组播和 WebSocket 传输消息。
- [WebSocket King](https://websocketking.com/)：帮助开发、测试和使用 WebSocket 服务器的客户端工具。
- [PHP WebSocket Server](https://github.com/napengam/phpWebSocketServer)：用 PHP 编写的服务器，用于处理通过 websocket wss:// 或 ws:// 以及通过 ssl:// 和 tcp:// 的普通套接字进行的连接。
- [Channels](https://channels.readthedocs.io/en/stable/index.html)：增加了对 WebSocket（以及其他需要长时间运行异步连接的协议）的支持的 Django 库。
- [Channels](https://hexdocs.pm/phoenix/channels.html)：在 Elixir Phoenix 框架中使用 WebSocket 进行可扩展的实时通信。
- [LiveView](https://github.com/phoenixframework/phoenix_live_view)：在 Elixir Phoenix 框架中通过 WebSocket 实现实时交互式网络体验。
- [Flask-SocketIO](https://flask-socketio.readthedocs.io/en/latest/)：让 Flask 应用程序可以在客户端和服务器之间进行低延迟的双向通信。
- [Gorilla WebSocket](https://pkg.go.dev/github.com/gorilla/websocket)：Gorilla WebSocket 是 WebSocket 协议的 [Go](https://go.dev/) 实现。

## [规范](https://developer.mozilla.org/zh-CN/docs/Web/API/WebSockets_API#规范)

| Specification                                                |
| :----------------------------------------------------------- |
| [WebSockets Standard # the-websocket-interface](https://websockets.spec.whatwg.org/#the-websocket-interface) |

## 教程

[使用ws - 廖雪峰的官方网站 (liaoxuefeng.com)](https://www.liaoxuefeng.com/wiki/1022910821149312/1103327377678688)

[WebSocket协议：5分钟从入门到精通 - 程序猿小卡 - 博客园 (cnblogs.com)](https://www.cnblogs.com/chyingp/p/websocket-deep-in.html)

其他教程：

[基于WebRtc和WebSocket实现视频聊天 - 掘金 (juejin.cn)](https://juejin.cn/post/7348362217145172006)

websocket封装：[赶快收藏！全网最佳websocket封装：完美支持断网重连、自动心跳！ - 掘金 (juejin.cn)](https://juejin.cn/post/7371365854012276747)

