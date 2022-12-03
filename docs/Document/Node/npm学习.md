# npm学习

官网文档：[npm 中文文档 | npm 中文网 (npmjs.cn)](https://www.npmjs.cn/)

npm淘宝镜像：

等待参考：[学习NPM这一篇就够了_轻松的小希的博客-CSDN博客_npm 学习](https://blog.csdn.net/qq_38490457/article/details/109739444)

### 配置npm淘宝镜像



## npm命令学习

# 1 简介

npm是一个包管理工具，包括三个部分：

- 网站：展示、查找各种包（代码模块，package）及其使用方法，设置参数以及管理npm使用体验的平台

- 注册表（registry）：是一个巨大的数据库，保存了每个包的信息

- 命令行工具（CLI）：用来直接使用npm

# 2 安装和使用

由于npm是用Node.js写的，因此要安装Node.js来使用npm。  
最快捷的安装方式是从Node.js官网直接下载安装Node.js，npm也会自动安装。  
安装后运行以下命令以检测是否安装成功：  

```bash
node -v // 查看Node.js版本

npm -v // 查看npm版本
```

命令

```bash
# 查看 npm 命令列表
npm help

# 查看各个命令的简单用法
npm -l

# 查看 npm 的版本
npm -v

# 查看 npm 的配置
npm config list -l
```

安装成功后，直接运行npm的各种命令来下载、删除、发布包等，例如安装一个第三方包： 

```bash
// 会在当前目录下创建一个 node_modules 的目录，并将下载的包保存在该目录下
npm install
```

# 3 package.json文件

该文件用来描述一个项目所需要用到的所有依赖包及其版本号

必须包含name和version属性：

```bash
运行以下命令来创建一个package.json文件：
npm init  // 创建一个package.json文件，创建过程中会有一系列关于需要怎样创建package.json的问题需要回答
npm init --yes/-y  // 传建一个默认的package.json文件
```

一个默认的paskage.json文件：

```json
{
  "name": "my_package",  // 当前目录的名字，这个package的名字
  "description": "",  // README.md文档内容的第一行，如果没有 README.md则为空字符串, README.md描述了这个项目的相关信息，有利于npm检索
  "version": "1.0.0",  // 当前版本
  "main": "index.js",  // 入口文件
  "scripts": {
    "test": "echo "Error: no test specified" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/ashleygwilliams/my_package.git"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/ashleygwilliams/my_package/issues"
  },
  "homepage": "https://github.com/ashleygwilliams/my_package"
}
```

可以设置字段值： 

```bash
npm set init.author.email "example@npmjs.com"
```

还可以自定义npm init过程中的问答：在家目录下创建一个 .npm-init.js文件自定义问答内容，详见：https://github.com/npm/init-package-json

package.json使用dependencies和devDependencies两个属性用来描述项目所需依赖包：

```json
{
  "name": "my_package",
  "version": "1.0.0",
  "dependencies": {  // 生产环境需要用到的依赖包
    "my_dep": "^1.0.0"  // 依赖包的版本号描述使用语义版本(SemVer)语法
  },
  "devDependencies" : {  // 本地开发环境需要用到的依赖包
    "my_test_framework": "^3.1.0"
  }
```

npm list命令以树型结构列出当前项目安装的所有模块，以及它们依赖的模块。

```bash
npm list
```

npm search命令用于搜索npm仓库，它后面可以跟字符串，也可以跟正则表达式

```bash
npm search jquery
```

npm info命令可以查看每个模块的具体信息 

```bash
npm info underscore
```

不同环境需要用到的依赖包安装方法：

```bash

# 本地安装
npm install <package name>
npm install <package name> --save/-S // 安装到dependencies
npm install <package name> --save-dev // 安装到devDependencies

# 全局安装
npm install -global <package name>
npm install -g <package name>

# 也支持直接输入Github代码库地址
npm install git://github.com/package/path.git
npm install git://github.com/package/path.git#0.1.0

# 强制重新安装
npm install <packageName> --force

# 如果你希望，所有模块都要强制重新安装，那就删除node_modules目录，重新执行npm install
rm -rf node_modules
npm install
```

安装不同版本

```bash
npm install sax@latest
npm install sax@0.1.1
npm install sax@">=0.1.0 <0.2.0"

# 如果使用--save-exact参数，会在package.json文件指定安装模块的确切版本
npm install readable-stream --save --save-exact

npm install sax --save
npm install node-tap --save-dev
# 或者
npm install sax -S
npm install node-tap -D

# 如果要安装beta版本的模块，需要使用下面的命令
# 安装最新的beta版
npm install <module-name>@beta (latest beta)
# 安装指定的beta版
npm install <module-name>@1.3.1-beta.3

# npm install默认会安装dependencies字段和devDependencies字段中的所有模块，如果使用--production参数，可以只安装dependencies字段的模块
npm install --production
# 或者
NODE_ENV=production npm install
```

npm update命令可以更新本地安装的模块

```bash
# 升级当前项目的指定模块
npm update [package name]

# 升级全局安装的模块
npm update -global [package name]
```

npm uninstall命令，卸载已安装的模块

```bash
npm uninstall [package name]

# 卸载全局模块
npm uninstall [package name] -global
```



npm 不仅可以用于模块管理，还可以用于执行脚本。

package.json 文件有一个 scripts 字段，可以用于指定脚本命令，供npm直接调用。

```bash
npm run xxx
```

`npm run` 命令会自动在环境变量 $PATH 添加 node_modules/.bin 目录，所以 scripts 字段里面调用命令时不用加上路径，这就避免了全局安装 NPM 模块。

`npm run` 如果不加任何参数，直接运行，会列出 package.json 里面所有可以执行的脚本命令。

npm内置了两个命令简写：

```bash
npm test 等同于执行 npm run test
npm start 等同于执行 npm run start
```

## 4 管理本地安装的包

```bash
npm update // 更新npm
npm uninstall // 卸载删除npm
npm uninstall --save lodash // 删除package.json文件中dependencies的依赖 
npm uninstall --save-dev lodash // 删除package.json文件中devDependencies的依赖  
npm install -g // 安装全局包，如果是命令行工具，应该要全局安装 
npm update -g // 更新全局包  
npm update -g // 更新全部全局包 
npm outdated -g --depth=0 // 检测那些包需要更新  
npm install npm@latest -g // 更新npm 
npm uninstall -g // 删除全局包
```

# 5 发布更新一个包

可以将任何一个包含package.json文件的目录发布到npm中，只有添加到.gitignore或.npmignore中的文件不会被发布到npm上。

## 5.1 发布

首先要在官网注册一个npm账号，注册成功后：

```bash
npm login // 登录npm  
npm whoami // 查看当前登录用户以检查是否登录成功
```

有两点注意：

- 包的名字要唯一并且和包的功能相关
- 添加readme.md文档便于被优先检索到

```bash
npm publish // 发布到npm
```

发布时如果提示“ You do not have permission to publish "". Are you logged in as the correct user? :”  

就说明npm上已有同名的包了，需要修改package.json的name字段值。

发布成功后就可以在官网上看到自己的包了。

## 5.2 更新包

开发完执行以下命令可以更新包，注意由于reamme.md文档内容会展示在npm官网中该package的详情页面，在更新package时如果有需要也要同步更新readme。

npm version // 更新 

update_type有三种类型：patch、minor、major

（更多语义化版本的介绍详见：https://docs.npmjs.com/about-semantic-versioning）：

- patch：会增加第三个版本号，表示向后兼容的bug修复
- minor：会增加第二个版本号，表示向后兼容的新特性
- major：会增加第一个版本号并重置后两个版本号，变为x.0.0，表示向后不兼容的重大变更

版本号更新后再执行 

```bash
npm publish
```

## Node项目根目录下的bin文件夹

放置可执行文件，如：

bin/www文件：项目启动入口，代码示例

```js
#!/usr/bin/env node

/**
 * Module dependencies.启动文件
 */

var app = require('../app');
var debug = require('debug')('demo:server');
var http = require('http');

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');
// app.set('port', port);

/**
 * Create HTTP server.
 * http://nodejs.cn/api/http.html#http_class_http_server
 * 返回的是一个http.Server实例，继承自: <net.Server>
 * http://nodejs.cn/api/net.html#net_class_net_server
 * 而<net.Server>继承自: <EventEmitter>
 * http://nodejs.cn/api/events.html#events_class_eventemitter
 */
var server = http.createServer(app.callback());

/**
 * Listen on provided port, on all network interfaces.
 */

// 启动 HTTP 服务器用于监听连接
server.listen(port);
// on方法来自于<EventEmitter>
// error、listening事件来自于<net.Server>
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  // 关于失败的系统调用描述：http://nodejs.cn/api/errors.html#errors_error_syscall
  // https://man7.org/linux/man-pages/man2/syscalls.2.html
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      // 拒绝访问)
      console.error(bind + ' requires elevated privileges');
      // http://nodejs.cn/api/process.html#process_process_exit_code
      // 调用 process.exit() 将强制进程尽快退出，即使还有尚未完全完成的异步操作，包括对 process.stdout 和 process.stderr 的 I/O 操作。
      process.exit(1);
      break;
    case 'EADDRINUSE':
      // 地址已经被使用
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  // http://nodejs.cn/api/net.html#net_server_address
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
```

在`package.json`文件中

```json
"scripts": {
 "start":"node ./bin/www"
}
```

终端输入`npm start`，则它将自动启动`./bin/www`文件
