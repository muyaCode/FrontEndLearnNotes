# Koa框架开发

## koa项目配置

1.新建项目目录，初始化项目的package.json

```bash
npm init
```

2.安装koa

```bash
npm i koa
```

3.简单的服务器

```js
const http = require('http')
const Koa = require('koa');

const app = new Koa();

/* 创建挂载Koa应用程序的http服务 */
const server = http.createServer(app.callback());

app.use(async ctx => {
  ctx.body = 'Koa服务启动成功'
})

const port = 2333
/* 开始监听/启动服务（指定3000端口与成功回调） */
server.listen(port, () => {
    console.log('Koa服务启动成功：http://localhost:'+ port);
});
```

###### bin/www可执行文件配置

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

## Koa路由配置

###### 1安装koa2路由

```bash
npm install koa-router --save
```

###### 2.自动加载

安装koa 路由自动加载 require-directory

```bash
npm i require-directory --save
```

创建工具类js：core/init.js

```js
const requireDirectory = require('require-directory')
const Router = require('koa-router')
class InitManager {
  // 入口方法
  static initCore(app) {
    InitManager.app = app   // 静态属性
    InitManager.initLoadRouter()    // 路由加载
  }
  // 初始化路由
  static initLoadRouter() {
    // 参数：第一个参数固定参数module，第二个参数要加载的模块的文件路径
    // 第三个参数：每次加载一个参数执行的函数 
    // 在node.js中process.cwd()方法可以获取项目的根路径
    const apiDirectory = `${process.cwd()}/app/api`
    requireDirectory(module, apiDirectory, {visit: loadModule})
    function loadModule(obj) {
      // 判断当前模块是否是Router的实例对象
      if (obj instanceof Router) {
        // 注册理由
        InitManager.app.use(obj.routes())
      }
    }
  }
}
module.exports = InitManager
```

> app.js 入口文件

```js
const Koa = require('koa')
// 引入初始化类
const InitManager = require('./core/init')
const app = new Koa()
// 初始化类
InitManager.initCore(app)
app.listen(9000)
```

###### 获取参数

| 名称                   | 含义                                                                                                  |
| -------------------- | --------------------------------------------------------------------------------------------------- |
| ctx.url              | 获取路由地址（url）                                                                                         |
| ctx.method           | 获取请求方式（GET POST）                                                                                    |
| ctx.params.xx 获取路由参数 | 获取GET请求参数 如：<http://localhost:3000/user/1>                                                          |
| ctx.query 获取查询字符串    | 获取GET请求？后的参数，如：[http://localhost:3000/users?name='aaa'](http://localhost:3000/users?name=%27aaa%27) |
| ctx.body             | 获取POST 提交的参数 (需要中间件：koa-bodyparser）                                                                 |
| ctx.header           | 获取请求头信息                                                                                             |

###### Koa2 路由前缀

```js
const router = new Router();
const PostsRouter = new Router({prefix: '/posts'});
// xxx.com/posts
PostsRouter.get('/', (ctx) => {
  ctx.body = {
    title: '文章首页'
  }
})
// xxx.com/posts/1
PostsRouter.get('/:id', (ctx) => {
  ctx.body = {
    id: ctx.params.id,
    title: '文章列表'
  }
})
app.use(PostsRouter.routes())
```

> prefix: '/xxx' 路由前缀

###### koa2使用路由中间件

```js
//定义鉴权中间件
const  auth = async (ctx, next ) => {
  if (ctx.url !== '/posts'){
    ctx.throw('没有权限访问!')
    await next()
  }
}
// 路由中使用中间件
PostsRouter.get('/', auth, (ctx, next) => {
  ctx.body = {
    name: '首页'
  }
})
```

## Koa

Context(上下文)

请求(Request)

响应(Response)

```js
const Router = require('koa-router')
const router = new Router()
router.get('/api/v1/news/:id', (ctx, next) => {
  ctx.body = {
    // 获取 url中 pathinfo 参数
    params: ctx.params,
    // 获取 url 中 ?params=xxx 参数
    query: ctx.request.query,
    // 获取Http头信息
    header: ctx.request.header,
    // 获取post 提交信息
    body: ctx.request.body
  }
})

module.exports = router
```

## Koa使用数据库

MySQL

MongoDB

## 数据库

1. knexjs：[https://knexjs.org/](https://knexjs.org/)
2. knexjs中文文档：https://www.songxingguo.com/2018/06/30/knex.js-query/
3. [PostgreSQL新手入门](http://www.ruanyifeng.com/blog/2013/12/getting_started_with_postgresql.html)
   1. 阿里云 postgresql：[云数据库RDS PostgreSQL_pg数据库_混合数据类型复杂查询_数据库-阿里云](https://cn.aliyun.com/product/rds/postgresql)
4. 管理工具 pgadmin：[https://www.pgadmin.org/](https://www.pgadmin.org/)

## 相关资源

以下列出了更多第三方提供的 koa 中间件、完整实例、全面的帮助文档等。

- [GitHub repository](https://github.com/koajs/koa)
- [Examples](https://github.com/koajs/examples)
- [Middleware](https://github.com/koajs/koa/wiki)
- [Wiki](https://github.com/koajs/koa/wiki)
- [G+ Community](https://plus.google.com/communities/101845768320796750641)
- [Mailing list](https://groups.google.com/forum/#!forum/koajs)
- [Guide](https://github.com/koajs/koa/blob/master/docs/guide.md)
- [FAQ](https://github.com/koajs/koa/blob/master/docs/faq.md)
- **#koajs** on freenode

## Koa2开发例子

koa2实现上传图片，并且同步上传到七牛云存储

```js
const Koa = require('koa');
const route = require('koa-route');
const serve = require('koa-static');
const inspect = require('util').inspect
const path = require('path')
const os = require('os')
const fs = require('fs')
const Busboy = require('busboy')
const qiniu = require('qiniu')
const qiniuConfig = require('./qiniuconfig')


const app = new Koa();

app.use(serve(__dirname + '/public/'));


// 写入目录
const mkdirsSync = (dirname) => {
  if (fs.existsSync(dirname)) {
    return true
  } else {
    if (mkdirsSync(path.dirname(dirname))) {
      fs.mkdirSync(dirname)
      return true
    }
  }
  return false
}

function getSuffix (fileName) {
  return fileName.split('.').pop()
}

// 重命名
function Rename (fileName) {
  return Math.random().toString(16).substr(2) + '.' + getSuffix(fileName)
}
// 删除文件
function removeTemImage (path) {
  fs.unlink(path, (err) => {
    if (err) {
      throw err
    }
  })
}
// 上传到七牛
function upToQiniu (filePath, key) {
  const accessKey = qiniuConfig.accessKey // 你的七牛的accessKey
  const secretKey = qiniuConfig.secretKey // 你的七牛的secretKey
  const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)

  const options = {
    scope: qiniuConfig.scope // 你的七牛存储对象
  }
  const putPolicy = new qiniu.rs.PutPolicy(options)
  const uploadToken = putPolicy.uploadToken(mac)

  const config = new qiniu.conf.Config()
  // 空间对应的机房
  config.zone = qiniu.zone.Zone_z2
  const localFile = filePath
  const formUploader = new qiniu.form_up.FormUploader(config)
  const putExtra = new qiniu.form_up.PutExtra()
  // 文件上传
  return new Promise((resolved, reject) => {
    formUploader.putFile(uploadToken, key, localFile, putExtra, function (respErr, respBody, respInfo) {
      if (respErr) {
        reject(respErr)
      }
      if (respInfo.statusCode == 200) {
        resolved(respBody)
      } else {
        resolved(respBody)
      }
    })
  })

}

// 上传到本地服务器
function uploadFile (ctx, options) {
  const _emmiter = new Busboy({headers: ctx.req.headers})
  const fileType = options.fileType
  const filePath = path.join(options.path, fileType)
  const confirm = mkdirsSync(filePath)
  if (!confirm) {
    return
  }
  console.log('start uploading...')
  return new Promise((resolve, reject) => {
    _emmiter.on('file', function (fieldname, file, filename, encoding, mimetype) {
      const fileName = Rename(filename)
      const saveTo = path.join(path.join(filePath, fileName))
      file.pipe(fs.createWriteStream(saveTo))
      file.on('end', function () {
        resolve({
          imgPath: `/${fileType}/${fileName}`,
          imgKey: fileName
        })
      })
    })

    _emmiter.on('finish', function () {
      console.log('finished...')
    })

    _emmiter.on('error', function (err) {
      console.log('err...')
      reject(err)
    })

    ctx.req.pipe(_emmiter)
  })
}


app.use(route.post('/upload', async function(ctx, next) {

    const serverPath = path.join(__dirname, './uploads/')
  // 获取上存图片
  const result = await uploadFile(ctx, {
    fileType: 'album',
    path: serverPath
  })
  const imgPath = path.join(serverPath, result.imgPath)
  // 上传到七牛
  const qiniu = await upToQiniu(imgPath, result.imgKey)
  // 上存到七牛之后 删除原来的缓存图片
  removeTemImage(imgPath)
  ctx.body = {
    imgUrl: `http://xxxxx(你的外链或者解析后七牛的路径)/${qiniu.key}`
  }
}));

app.listen(3001);

console.log('listening on port 3001');
```

然后在同一级目录下，创建一个public文件夹，然后在下面新建一个 index.html，因为我们上面已经把这个文件夹设置为静态访问文件夹了， public/index.html 的代码为

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
    <input id="btn1" type="file" name="file"/>  
  <input id="btn2" type="submit" value="提交"/>
</body>
<script>

    var btn1 = document.querySelector('#btn1')
    var btn2 = document.querySelector('#btn2')
    var file = null
    btn1.addEventListener('change', function(e){
        file = e.target.files[0]
    })

    btn2.onclick = function(){
    var _data = new FormData();
    _data.append('file', file);
    xhr(_data)
    }

    var xhr = function(formdata){
        var xmlHttp = new XMLHttpRequest();  

        xmlHttp.open("post","http://127.0.0.1:3001/upload", true);  

        xmlHttp.send(formdata);

        xmlHttp.onreadystatechange = function(){  
          if(xmlHttp.readyState==4){  
              if(xmlHttp.status==200){  
                  var data = xmlHttp.responseText;  
                  console.log(data);  
              }  
          }
        }
    }
</script>
</html>
```
