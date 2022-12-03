# Koa.js学习

## 介绍

Koa 是一个新的 web 框架，由 Express 幕后的原班人马打造， 致力于成为 web 应用和 API 开发领域中的一个更小、更富有表现力、更健壮的基石。

 通过利用 async 函数，Koa 帮你丢弃回调函数，并有力地增强错误处理。 

Koa 并没有捆绑任何中间件， 而是提供了一套优雅的方法，帮助您快速而愉快地编写服务端应用程序。

## 网址

- Koa开源地址GitHub：
  
  - <https://github.com/koajs/koa>  

- 官网 ：
  
  - [https://koajs.com](https://koajs.com)  

- 中文网：
  
  - [https://koa.bootcss.com](https://koa.bootcss.com)  
  - [https://www.koajs.com.cn](https://www.koajs.com.cn)

- 教程文档：
  
  - 基础到入门文档教程：[第一章 入门 · koa · 看云 (kancloud.cn)](https://www.kancloud.cn/chengbenchao/koa_tutorial/993443)
  - 文档2：[导读 · fckoa · 看云 (kancloud.cn)](https://www.kancloud.cn/fckoa/fckoa/885031)

## 入门

服务端要素：

HTTP：Application

接收： Context

解析：Request

响应：Response

中间件：Middlewares

执行上下文：Session、Cookie

###### 常用技术栈：

Pug：模板引擎

- [Started &ndash; Pug](https://pugjs.org/api/getting-started.html)

- [入门指南 – Pug (pugjs.org)](https://pugjs.org/zh-cn/api/getting-started.html)

Parcel：开箱即用开发体验与可扩展的架构相结合，是 Web 应用打包工具库，与模板引擎结合打包成网页：

- [parcel](https://parceljs.org/)

- [Parcel - Web 应用打包工具 | Parcel 中文网 (parceljs.cn)](https://www.parceljs.cn/)

- 

---

## Koa前置JS知识

## Koa项目结构目录

第一种

```bash
bin
config
node_modules
server
    |__database    // 数据库目录
        |__schema    // 构建schema目录
    |__decorator   // 装饰器目录，如router.js路由的装饰
    |__middleware  // 中间件目录
    |__routes    // 路由方法目录
    |__service   // 服务方法目录
    |__task  // 异步等或任务运行脚本方法目录
    |__tpl  // 模板目录
    |__views  // 模板渲染的页面目录
src   // 正常的前端项目目录
    |__assets  // 静态资源目录
    ...
app.js    // 入口运行目录
```

第二种

```bash
|____controllers                  // 控制器目录
|____database                     // 数据库目录
|____models                       // 模型目录
|____public                       // 公共静态资源文件目录
| |____1.jpg
|____routes                       // 路由目录
|____src                          // source 文件
| |____index.js
| |____api                        // api 接口文件目录
| | |____a.js
| | |____b.js
| |____routes                     // routes 路由目录
| | |____aRouter.js
| | |____routes.js
| | |____bRouter.js
|____views                        // 视图目录
|____app.js                       // 入口文件
|____package-lock.json
|____package.json
```

第三种

```bash
├─src           // 应用目录（可设置）
│  ├─controller                 // 控制器
│  ├─config                      // 配置文件
│  ├─db                           // 数据库相关配置
    ├─ model                     // 各个数据模型
    ├─ index.js                   // 数据库配置页面
│  ├─middleWares           // 中间件
│  ├─routes                      // 路由
    ├─ index.js                   // 路由入口文件
    ├─ users.js                  // 用户路由
│  ├─service                    // 服务
│  ├─app.js                   // 入口文件
```

**第四种：推荐使用**

```bash
config - 配置文件，例如：database.config.js
controller - 控制器
decorator - 装饰器 如 decorator/routes.js：对路由拆分和继承的功能方法
models - 数据库模型（ROM）
middlewares - 中间件
public - 静态资源
service - 服务-跟数据库进行交互
static - 静态资源目录
router - 路由
routes - 路由装饰器
app.js - 启动文件
```

## Koa依赖

koa-generator库： 使用 `koa-generator` 生成 `koa` 项目

- babel-core/babel-preset-es2015 - 让 nodeJs 支持 es6 modules
- koa - koa2
- koa-body - request body 解析
- koa-cache-control - 缓存控制
- koa-compress - gzip
- koa-cors - 跨域
- koa-logger - 日志
- koa-onerror - 错误处理
- koa-router - 路由
- koa-session - session
- koa-static - 静态资源服务
- koa-helmet - 安全
- koa-view - 静态文件访问能力
- md5 - md5 加密
- mkdirp - 递归创建目录

## Koa项目搭建快速开发脚手架

1、第一步：全局安装 `koa-generator`

```bash
npm install koa-generator -g
```

2、第二步：使用 `koa-generator` 生成 `koa` 项目

```bash
# 项目名字为：myproject
koa2 myproject
```

3、第三步：进入项目，安装依赖包

```bash
# 进入 myproject 项目
cd myproject
# 安装
npm install
```

4、第四步：启动服务

```bash
npm start
```

5、第五步：打开浏览器

```bash
# 打开下面链接
http://localhost:3000/
# 页面显示
Hello Koa 2!
Welcome to Hello Koa 2!
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
| ctx.params.xx 获取路由参数 | 获取GET请求参数 如：http://localhost:3000/user/1                                                            |
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
