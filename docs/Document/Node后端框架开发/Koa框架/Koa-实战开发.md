# Koa-实战开发

## 项目前置

使用以下二选一文档初始化koa项目：

- 使用：Koa-应用(Application)-koa项目初始

- 或者使用：Koa项目结构和相关依赖-Koa项目搭建快速开发脚手架

## Koa路由配置

### 原生路由

- ctx.request.path ：获取用户请求的路径，由此实现简单路由

```js
const main = ctx => {
    if( ctx.request.path ){
        ctx.response.type='html'
        ctx.response.body='<h1>无此路径</h1>'
    }else{
        ctx.response.body='<h1>这是首页</h1>'
    }
}
app.use(main)
// 访问localhost:3000/hello 
// 显示 '无此路径'
```

第二种写法

```js
app.use(async ctx => {
    switch(ctx.URL) {
        case '/user':
          break;
          ...
    }
})
```

### koa-router路由

##### 1.安装koa2路由

koa-router文档：[router/API.md  koajs/router (github.com)](https://github.com/koajs/router/blob/HEAD/API.md)

安装命令

```bash
npm install koa-router --save
```

##### 2.自动加载

安装koa 路由自动加载：require-directory

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

1.koa-router基本使用

```js
const Koa = require('koa')
const Router = require('koa-router')
const app = new Koa()
const router = new Router()

router.get('/users/:id', ctx => {
    ctx.body = "这是用户列表" + ctx.params.id
})
app.use(router.routes())
```

2.路由前缀

```js
const usersRouter = new Router({ prefix: '/users'})
usersRouter.get('/:id', ctx => {
    ctx.body = "这是用户列表" + ctx.params.id
})
app.use(usersRouter.routes())
```

3.路由中间件

```js
const auth = async (ctx, next) => {
    if (ctx.url !== '/users') {
        ctx.throw(401)
    }
    await next()
}

usersRouter.get('/:id', auth, ctx => {
    ctx.body = "这是用户列表" + ctx.params.id
}) 
```

###### Koa2 路由前缀

```js
const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();
const router = new Router();
const PostsRouter = new Router({ prefix: '/posts' });
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

> new Router({ prefix: '/posts' })：'/xxx' 路由前缀

###### koa2使用路由中间件

参数：

ctx：

next：

```js
//定义鉴权中间件
const auth = async (ctx, next) => {
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

###### Http Response的类型

> koa默认返回的类型为text/plain，如果想返回其他类型的内容，可以先用**request.accepts**判断一下，客户端希望接受什么数据(根据 HTTP Request 的Accept字段），然后使用ctx.response.type指定返回类型。

```js
const Koa =  require('koa')
const app = new Koa()

const main = ctx => {
    if(ctx.request.accepts('xml')){
        ctx.response.type='xml'
        ctx.response.body='<data>这是一个xml</data>'
    }else if(ctx.request.accepts('json')){
         ctx.response.type = 'json'
        ctx.response.body={data:'123'}
    } else if (ctx.request.accepts('html')) {
        ctx.response.type = 'html'
        ctx.response.body='<p>了不起？？？</p>'
    } else {
        ctx.response.type = 'text'
        ctx.response.body='hehe'
    }
}

app.use(main)
app.listen(3000)

# 启动后访问，可以看到响应了xml 
```

###### 1.3 静态资源加载

> 如果网站提供静态资源（图片、字体、样式表、脚本......），为它们一个个写路由就很麻烦，也没必要。**koa-static**模块封装了这部分的请求。

```js
# 目录结构
|_ static
    |_ 01.jpg
|_ 01.js

# 01.js服务文件
const serve = require('koa-static')
const Koa = require('koa')
const app = new Koa()

const main = serve('static')  //相对路径
const main = serve(__diraname+'/static')  //绝对路径
app.use(main)
app.listen(3000)

# 浏览器访问
localhost:3000/01.jpg
```

###### 1.4 重定向

> 服务器需要重定向（redirect）访问请求。比如，用户登陆以后，将他重定向到登陆前的页面。**ctx.response.redirect()**方法可以发出一个302跳转，将用户导向另一个路由。

- 关键字： ctx.response.redirect(path)

```js
const Koa = require('koa')
const app = new Koa()
const route = require('koa-route')

const about = ctx => { 
    ctx.response.redirect('/')
}
const main = ctx => { 
    ctx.response.body='<h1>这是首页</h1>'
}
app.use(route.get('/',main))
app.use(route.get('/about',about))
app.listen(3000)
```

## 中间件

### 1.1 logger功能

> Koa 的最大特色，也是最重要的一个设计，就是中间件（middleware）。  
> Logger：打印日志

```js
const Koa = require('koa')
const app = new Koa()

const main = ctx => {
    console.log(`${Date.now()} ${ctx.request.method} ${ctx.request.url}`)
    ctx.response.body='请求了'
}

app.use(main)
app.listen(3000)

# 访问后
1502144902843 GET /
```

### 1.2 中间件概念

> 上面例子里的Logger功能，可以拆分成一个独立函数

```js
const Koa = require('koa')
const app = new Koa()

const logger = (ctx,next) => {
    console.log(`${Date.now()} ${ctx.request.method} ${ctx.request.url}`)
    next()
}
const main = ctx => { 
    ctx.response.body='呵呵'
}
app.use(logger)
app.use(main)
app.listen(3000)
```

- 以上的logger函数，main函数就是一个中间件middleware，因为它处在http request和response之间，用来实现某种中间功能
- app.use(middleWare) 来使用中间件
- 参数：默认接受2个参数 (ctx,next),ctx为context对象,当执行完中间件的功能后，调用next()将执行权交移给下一个中间件

### 1.3 中间件栈

> 多个中间件会形成一个栈结构（middle stack），以"先进后出"（first-in-last-out）的顺序执行。

```js
    1. 最外层的中间件首先执行。
    2. 调用next函数，把执行权交给下一个中间件。
    3. ...
    4. 最内层的中间件最后执行。
    5. 执行结束后，把执行权交回上一层的中间件。
    6. ...
    7. 最外层的中间件收回执行权之后，执行next函数后面的代码。
```

```js
const one = (ctx,next) => {
    console.log('one->')
    next()
    console.log('<-one')
}

const two = (ctx, next) => {
    console.log('2->')
    next()
    console.log('<-2')
}

# 执行结果
one->
2->
<-2
<-one
```

- 如果不调用next()，则不会移交执行权

### 1.4 异步中间件

> 如果有异步操作（比如读取数据库），中间件就必须写成 async 函数。

```js
 //fs.promised模块是对fs模块的扩展，需单独这安装后使用
const fs = require('fs.promised'); 
const Koa = require('koa');
const app = new Koa()

const main = async function(ctx,next){
    ctx.response.type='html';
    ctx.response.body= await fs.readFile('./template.html','utf8')
}
app.use(main)
app.listen(3000)
```

> **fs.promised模块**：  
> 原fs模块读取文件后都要用回调函数来处理结果，而fs.promised可以用**promised**来代替回调函数。

```js
# 安装 
npm i fs.promised -S
# 使用
const fs = require('fs.promised')
fs.readFile('./test.json').then(v=>console.log(v),error=>console.log(error))
```

### 1.5 中间件的合成

> koa-compose模块可以将多个中间件合成为一个

```js
const Koa = require('koa')
const compose = require('koa-compose')
const app = new Koa()

const logger = function (ctx,next) {
    console.log(`${Date.now()} ${ctx.request.method} ${ctx.request.url}`)
    next()
}
const main = function (ctx,next) {
    ctx.response.body='这是首页'
}
const middleWare = compose([logger, main])
app.use(middleWare)
app.listen(3000)
```

## 错误处理

### 4.1 500错误

> 如果代码运行过程中发生错误，我们需要把错误信息返回给用户。HTTP 协定约定这时要返回500状态码。Koa 提供了ctx.throw()方法，用来抛出错误，ctx.throw(500)就是抛出500错误

- 关键词：ctx.throw(500)

```js
const Koa = require('koa')
const compose = require('koa-compose')
const app = new Koa()

const main = (ctx, next) => {
    ctx.throw(500)
}

app.use(main)
app.listen(3000)
# 访问
internal server error
```

### 4.2 404错误

> 如果将ctx.response.status设置成404，就相当于ctx.throw(404)，返回404错误。

- 关键词：ctx.response.status=404

```js
const Koa = require('koa')
const compose = require('koa-compose')
const app = new Koa()

const main = (ctx, next) => {
    ctx.response.status = 404;
    ctx.response.body='Page not Found'
}

app.use(main)
app.listen(3000)
```

### 4.3 处理错误的中间件

> 为了方便处理错误，最好使用try...catch将其捕获。但是，为每个中间件都写try...catch太麻烦，我们可以让最外层的中间件，负责所有中间件的错误处理。

```js
const Koa = require('koa')
const compose = require('koa-compose')
const app = new Koa()

const errorHandler = async (ctx, next) => { 
    try {
        await next()
    } catch (err) {
        ctx.response.status = err.statusCode || err.status || 500
        ctx.response.body = {
            msg:err.message
        }
    }
}

const main = ctx => { 
    ctx.response.status = 200
}

app.use(errorHandler)
app.use(main)
app.listen(3000)
```

### 4.4 error事件的监听

> 运行过程中一旦出错，Koa 会触发一个error事件。监听这个事件，也可以处理错误。

```js
const Koa = require('koa')
const compose = require('koa-compose')
const app = new Koa()

app.on('error', (err, next) => { 
    console.error('server error',err)
})
const main = ctx => { 
    ctx.throw(500)
}

app.use(main)
app.listen(3000)
```

### 4.5 释放error事件

> 需要注意的是，如果错误被try...catch捕获，就不会触发error事件。这时，必须调用ctx.app.emit()，手动释放error事件，才能让监听函数生效。

- 关键字：ctx.app.emit('error')触发事件

```js
const Koa = require('koa')
const compose = require('koa-compose')
const app = new Koa()

const handler = async ctx => { 
    try { 
        await next()
    } catch (err) {
        ctx.response.status = err.statusCode || err.status || 500
        ctx.response.type='html'
        ctx.response.body='<h1>发生了一个错误</h1>'
  //  当不写这行时，发生错误时，命令行里看不到错误消息
        ctx.app.emit('error',err,ctx) 
    }
}
const main = ctx => {
    ctx.throw(500)
}
app.on('error', err=> { 
    console.error('server error',err.message)
    console.log(err)
})
app.use(handler)
app.use(main)
app.listen(3000) 
```

## WebApp功能

## 5.1 Cookies

- **ctx.cookies** 用来读写 Cookie。
- **ctx.cookies.set(key,value)** 设置cookie
- **ctx.cookies.get(key)** 获取cookie

```js
const Koa = require('koa')
const compose = require('koa-compose')
const app = new Koa()

const main = ctx => {
    const n = Number(ctx.cookies.get('view') || 0) + 1;
    ctx.cookies.set('view',n)
    ctx.response.body = n + 'views';
}

app.use(main)
app.listen(3000)
# 结果
    每刷新一次，页面显示的views会 +1
```

## 5.2 表单

> Web 应用离不开处理表单。本质上，表单就是 POST 方法发送到服务器的键值对。**koa-body**模块可以用来从 POST 请求的数据体里面提取键值对。

```js
// 前端访问
function submitHandler(){
    let xhr = new XMLHttpRequest();
    xhr.open('POST','http://localhost:3000/test',true);
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4&&xhr.status==200){
            console.log(xhr.responseText)
        }
    }
    const data = {
        name:formName.inputKey.value
    }
    xhr.send(JSON.stringify(data))
}

// 后端服务
const Koa = require('koa')
const koaBody = require('koa-body')
const route = require('koa-route')
const fs = require('fs.promised')
const app = new Koa()

const indexHtml = async ctx => {
    ctx.response.type = 'html'
    ctx.response.body= await fs.readFile('./index.html','utf8')
}
const main = ctx => {
    // ctx.response.header=''
    const body = JSON.parse(ctx.request.body);
    console.log(body)

    if (!body.name) ctx.throw(400, '.name required');
    ctx.body = { name: body.name };
}

app.use(koaBody())
app.use(route.get('/',indexHtml))
app.use(route.post('/test', main));
app.listen(3000)
```

### 5.3 文件上传

> koa-body模块还可以用来处理文件上传

前端

```html
<form name='testname'>
    <input type="file" name='fileInput' id='fileUpload'>
    <button type=button onclick='test()'>提交</button>
</form>
<script>
    function test(){
        let xhr = new XMLHttpRequest();
        const file = document.getElementById('fileUpload')
        console.log(file.files)
        const formData = new FormData();
        formData.append('upfile',file.files[0])
        xhr.open('POST','http://localhost:3000/test',true);
        xhr.onreadystatechange=function(){
            if(xhr.readyState==4&&xhr.status==200){
                console.log(xhr.responseText)
            }
        }
        xhr.send(formData)
        xhr.timeout=100000;

    }
</script>
```

服务端

```js
// 服务端
const Koa = require('koa')
const koaBody = require('koa-body')
const route = require('koa-route')
const fs = require('fs.promised')
const os = require('os')
const path = require('path')
const app = new Koa()

const indexHtml = async ctx => {
    ctx.response.type = 'html'
    ctx.response.body= await fs.readFile('./index.html','utf8')
}
const main =async ctx => {
    const tmpdir = os.tmpdir();
    const filePaths = [];
    const files = ctx.request.body.files || {};
    console.log(ctx.request.body.files)
        const file = files.upfile;
        const filePath = path.join(tmpdir, file.name);  //创建写入目录
        const reader = fs.createReadStream(file.path) //读取上传文件
        const writer = fs.createWriteStream(filePath) 
        reader.pipe(writer)   //写入文件
        filePaths.push(filePath)
    ctx.body = filePaths;
}
app.use(koaBody({multipart:true}))
app.use(route.get('/',indexHtml))
app.use(route.post('/test', main));
app.listen(3000)
```

- os模块：os模块为node的内置模块，用于操作系统。
- os.tmpdir :返回一个字符串, 表明操作系统的 默认临时文件目录.
- path.join(tmpdir,[file.name](http://file.name/)) 实现将文件存放到系统默认临时文件目录下
- ctx.request.body.files 为文件上传的内容对象

## Koa使用数据库

### MySQL

---

### MongoDB

## 数据库

1. knexjs：[https://knexjs.org/](https://knexjs.org/)
2. knexjs中文文档：https://www.songxingguo.com/2018/06/30/knex.js-query/
3. [PostgreSQL新手入门](http://www.ruanyifeng.com/blog/2013/12/getting_started_with_postgresql.html)
   1. 阿里云 postgresql：[云数据库RDS PostgreSQL_pg数据库_混合数据类型复杂查询_数据库-阿里云](https://cn.aliyun.com/product/rds/postgresql)
4. 管理工具 pgadmin：[https://www.pgadmin.org/](https://www.pgadmin.org/) 

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

待定
