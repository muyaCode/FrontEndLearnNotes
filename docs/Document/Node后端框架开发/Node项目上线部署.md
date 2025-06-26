# Node项目上线部署

[一名全栈工程师的技术实践之路 (qq.com)](https://mp.weixin.qq.com/s?__biz=MzIzOTU0NTQ0MA==&mid=2247534374&idx=1&sn=d4fdd79935f4844f57e058cffb67cfc8&chksm=e92a7a29de5df33fed3c5de533c72fb95aa65dfa5e3490e876eff9ae275b840fc2026e70466d&mpshare=1&scene=1&srcid=08110cciaE8QHsjzLSKisPrd&sharer_sharetime=1691717013344&sharer_shareid=31c55da0340daae091e3d76b40a7b2dc&from=industrynews&version=4.1.8.6020&platform=win#rd)

## pm2自动化部署后端服务

PM2 是一个守护进程管理器，可帮助您管理和保持应用程序在线。PM2 入门很简单，它以简单直观的 CLI 形式提供，可通过 NPM 安装。

### 相关网址

- PM2中文网：https://pm2.fenxianglu.cn/
- PM2官网：https://pm2.keymetrics.io/
- PM2官网文档：https://pm2.keymetrics.io/docs/usage/quick-start/
- GitHub：https://github.com/Unitech/pm2

### 示例教程

[PM2 | NodeJS应用进程管理工具—PM2的基本使用-CSDN博客](https://blog.csdn.net/sunyctf/article/details/130655852)

## 揭秘 ChatGPT：流式输出的神奇原理与 SSE 技术

ChatGPT是如何实现流式输出的呢？这背后离不开SSE技术的支持。下面，我们就来详细讲解一下ChatGPT流式输出的原理以及SSE技术的作用，并附上代码示例。

ChatGPT，作为人工智能领域的佼佼者，以其卓越的自然语言处理能力和广泛的应用场景，赢得了众多用户的青睐。其中，ChatGPT的流式输出功能更是让人印象深刻。那么，ChatGPT是如何实现流式输出的呢？这背后离不开Server-Sent Events（SSE）技术的支持。下面，我们就来详细讲解一下ChatGPT流式输出的原理以及SSE技术的作用，并附上代码示例。

#### 一、什么是ChatGPT的流式输出？

ChatGPT的流式输出，指的是在与用户进行对话时，ChatGPT能够实时地、连续地输出文本内容，而不是等待整个回答完全生成后再一次性输出。这种流式输出的方式，使得ChatGPT的响应更加迅速，用户体验更加流畅。

#### 二、SSE技术简介

SSE，全称Server-Sent Events，是一种基于HTTP协议的服务器推送技术。它允许服务器主动向客户端发送数据和信息，实现了服务器到客户端的单向通信。

#### 三、ChatGPT流式输出的原理与SSE技术的应用

ChatGPT采用SSE技术实现流式输出，其原理如下：

- 建立连接：当用户与ChatGPT进行对话时，客户端与服务器之间会建立一个基于HTTP的长连接。这个连接通过SSE机制保持打开状态，允许服务器随时向客户端发送数据。
- 分步生成与实时推送：ChatGPT根据用户的输入和当前的上下文信息，逐步生成回答的一部分。每当有新的内容生成时，服务器就会通过SSE连接将这些内容作为事件推送给客户端。
- 客户端接收与展示：客户端通过JavaScript的EventSource对象监听SSE连接上的事件。一旦接收到服务器推送的数据，客户端会立即将其展示给用户，实现流式输出的效果。

#### 四、代码示例

服务器端（SSE）代码示例（以Node.js为例）：

```javascript
const http = require('http');
const server = http.createServer((req, res) => {
  if (req.url === '/stream') {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    });

    // 模拟ChatGPT的流式输出
    let counter = 0;
    const interval = setInterval(() => {
      const data = `data: ChatGPT says: Hello, this is message ${++counter}\n\n`;
      res.write(data);
    }, 1000); // 每秒发送一次数据

    req.on('close', () => {
      clearInterval(interval);
      res.end();
    });
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(8080, () => {
  console.log('Server listening on port 8080');
});
```

客户端（JavaScript）代码示例：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>SSE Output</title>
  </head>
  <body>
    <div id="chatOutput"></div>
    <script>
      const eventSource = new EventSource('/stream'); // 连接到SSE服务器
      const chatOutput = document.getElementById('chatOutput');

      // 连接建立时的操作
      eventSource.onmessage = event => {
        const data = event.data;
        if(data === '[done]') {
            eventSource.close();
            return;
        }
        chatOutput.innerHTML += data; // 展示接收到的数据
      };

      // 连接建立时的操作
      eventSource.onopen = event => {
        console.error('EventSource onopen:', event);
      };

      // 错误处理
      eventSource.onerror = event => {
        console.error('EventSource failed:', event);
      };
    </script>
  </body>
</html>
```

在上述示例中，服务器端代码创建了一个HTTP服务器，并监听/stream路径。当客户端连接到这个路径时，服务器会开始发送SSE事件，每个事件包含一条模拟的ChatGPT消息。客户端代码通过创建EventSource对象连接到服务器，并监听onmessage事件来接收并展示服务器发送的数据。

#### 五、SSE技术的优势

- 实时性：SSE技术使得服务器能够实时地将数据推送给客户端，无需客户端频繁发起请求，提高了数据的实时性。
- 效率：通过保持长连接的方式，SSE技术避免了频繁建立和断开连接的开销，提高了数据传输的效率。
- 轻量级：SSE技术基于HTTP协议，无需额外的协议支持，使得实现更加轻量级和简单。

#### 六、ChatGPT流式输出的应用场景

ChatGPT的流式输出功能在多个领域都有广泛的应用。例如，在智能客服领域，ChatGPT可以实时地回应用户的问题，提供个性化的服务；在在线教育领域，ChatGPT可以作为智能辅导工具，实时地解答学生的疑问；在娱乐领域，ChatGPT可以作为聊天机器人，与用户进行有趣的对话。此外，流式输出功能还适用于需要实时交互的场景，如实时翻译、智能助手等。

#### 七、注意事项

在实现ChatGPT的流式输出功能时，需要注意以下几点：

- 服务器性能：由于流式输出需要服务器实时推送数据，因此对服务器的性能要求较高。确保服务器具备足够的处理能力和带宽，以应对大量并发连接和数据传输的需求。
- 数据安全性：在传输过程中，要确保数据的安全性，防止敏感信息泄露或被恶意利用。可以采用加密传输、身份验证等措施来增强数据安全性。
- 用户体验：流式输出功能应关注用户体验，确保数据的实时性和准确性。同时，也要注意避免过度推送数据，以免给用户造成困扰或疲劳。

综上所述，ChatGPT的流式输出功能是一项具有重要意义的技术创新，它为用户提供了更加高效、智能的对话体验。通过不断优化和拓展这一功能，我们可以期待ChatGPT在未来能够为更多领域带来变革和突破。

## 如何上线Node编写的项目?

### 1.上线项目需要考虑的几个问题

- 1.1 服务稳定性, 不会因为程序的某个错误或异常导致项目停止服务

- 1.2 线上日志记录, 除了记录访问日志以外, 我们还需要记录错误日志和自定义日志

- 1.3 充分利用服务器资源, Node是单线程的, 服务器是多核的, 一台服务器只运行一个Node程序太浪费资源

### 2.如何解决上述问题?

#### 通过PM2

- 2.1 PM2的进程守护可以在程序崩溃后自动重启

- 2.2 PM2自带日志记录的功能, 可以很方便的记录错误日志和自定义日志

- 2.3 PM2能够启动多个Node进程, 充分利用服务器资源

### 3.PM2使用

pm2的npm文档：[pm2 - npm (npmjs.com)](https://www.npmjs.com/package/pm2)

```bash
# 全局安装pm2包
npm install pm2 -g
# 查看pm2版本|用来检查是否安装成功
pm2 --version
# 在项目终端中，通过pm2运行Node项目
pm2 start app.js
```

#### pm2常用命令

appName|appId：是启动项目成功后出现的表格信息，name和id字段

如果不知道信息，可以使用罗列命令：pm2 list

```bash
# 启动应用程序
pm2 start app.js|config
# 列出启动的所有的应用程序
pm2 list
# 重启应用程序
pm2 restart appName|appId
# 查看应用程序详细信息
pm2 info appName|appId
# 显示指定应用程序的日志
pm2 log appName|appId
# 监控应用程序
pm2 monit appName|appId
# 停止应用程序
pm2 stop appName|appId
# 关闭并删除所有应用
pm2 delete appName|appId
```

#### pm2日志相关命令

pm2 log appName|appId 日志命令：打印的是以下日志，两种日志信息

```js
// 如果是通过pm2来启动Node项目, 那么会自动将log输出的内容记录到自定义日志当中
console.log('接收到请求'); // 自定义日志
console.error('我是错误日志'); 
```

监控应用程序命令：pm2 monit appName|appId

```bash
会实时显示应用程序状态和日志等
```

#### PM2进程守护

自定义错误抛出路由，测试：/error

```js
if(path === '/error'){
  throw new Error('故意抛出异常, 引发程序的崩溃');
}
```

项目抛出异常后会自动重启，达到进程守护的作用

#### PM2常用Node项目配置😍

##### 在需要运行的Node项目根目录中，新建pm2配置文件：`pm2.conf.json`

```json
{
  "apps":{
    "name":"应用程序名称，如:node-server",
    "script": "入口文件名称，如:app.js",
    "watch": true,
    "ignore_watch": [
      "node_modules",
      "logs"
    ],
    "error_file": "logs/错误日志文件名称，如:error.log",
    "out_file": "logs/自定义日志文件名称，如:custom.log",
    "log_date_format": "yyyy-MM-dd HH:mm:ss"
  }
}
```

##### 通过运行pm2配置文件(pm2.conf.json)来启动项目

可以在package.json里配置script命令

```bash
pm2 start pm2.conf.json
```

#### PM2配置：负载均衡-多线程

在需要运行的Node项目根目录中，新建pm2配置文件：`pm2.conf.json`

原有的配置中添加配置，CPU是多少核的服务器："instances": 4

```json
{
  "apps":{
    "name":"应用程序名称，如:node-server",
    "script": "入口文件名称，如:app.js",
    "watch": true,
    "ignore_watch": [
      "node_modules",
      "logs"
    ],
    "error_file": "logs/错误日志文件名称，如:error.log",
    "out_file": "logs/自定义日志文件名称，如:custom.log",
    "log_date_format": "yyyy-MM-dd HH:mm:ss",
    "instances": 4
  }
}
```

再启动运行项目：

```bash
pm2 start pm2.conf.json
```

运行成功后，会启动4个进程，都是一个项目名字，前端访问，会随机分配一个服务器进程

# 
