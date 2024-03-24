# Node项目上线部署

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
