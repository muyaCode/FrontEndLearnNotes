# Koa-实战开发

## 项目前置

使用以下二选一文档初始化koa项目：

- 使用：Koa-应用(Application)-koa项目初始

- 或者使用：Koa项目结构和相关依赖-Koa项目搭建快速开发脚手架

## Koa路由配置

##### 1.安装koa2路由

安装命令

```bash
npm install koa-router --save
```

##### 2.自动加载

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

###### Koa2 路由前缀

```js
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

## Koa使用数据库

MySQL

MongoDB

## 数据库

1. knexjs：[https://knexjs.org/](https://knexjs.org/)
2. knexjs中文文档：https://www.songxingguo.com/2018/06/30/knex.js-query/
3. [PostgreSQL新手入门](http://www.ruanyifeng.com/blog/2013/12/getting_started_with_postgresql.html)
   1. 阿里云 postgresql：[云数据库RDS PostgreSQL_pg数据库_混合数据类型复杂查询_数据库-阿里云](https://cn.aliyun.com/product/rds/postgresql)
4. 管理工具 pgadmin：[https://www.pgadmin.org/](https://www.pgadmin.org/)

# 

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
