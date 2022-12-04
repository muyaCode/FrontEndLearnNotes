# Koa项目结构和相关依赖

Koa 依赖 **node v7.6.0** 或 ES2015及更高版本和 async 方法支持.

你可以使用自己喜欢的版本管理器(nvm/)快速安装支持的 node 版本：

```bash
nvm install 7
npm i koa
node my-koa-app.js
```

## koa项目结构

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

**第四种(推荐使用)**

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
  - [koa-body - npm (npmjs.com)](https://www.npmjs.com/package/koa-body)
- @koa/multer - formData解析-处理使用[multer](https://github.com/expressjs/multer) 的 Koa 路由中间件
  - [@koa/multer - npm (npmjs.com)](https://www.npmjs.com/package/@koa/multer)
  - [koajs/multer: Middleware for handling `multipart/form-data` for koa, based on Express's multer. (github.com)](https://github.com/koajs/multer)
- koa-cache-control - 缓存控制
- koa-compress - gzip
- koa-cors - 跨域
- koa-logger - 日志
- koa-onerror - 错误处理
- koa-route - 路由，但6年没更新
  - [koa-route - npm (npmjs.com)](https://www.npmjs.com/package/koa-route)
- koa-router - 路由
  - [koa-router - npm (npmjs.com)](https://www.npmjs.com/package/koa-router)
- koa-session - session
- koa-static - 静态资源服务
  - [koa-static - npm (npmjs.com)](https://www.npmjs.com/package/koa-static)
- koa-static-cache - 静态缓存
  - [koa-static-cache - npm (npmjs.com)](https://www.npmjs.com/package/koa-static-cache)
- koa-swig - 模板引擎（通常使用pug库）
  - [koa-swig - npm (npmjs.com)](https://www.npmjs.com/package/koa-swig)
- pug - 模板引擎，(jade) 侵入式，配合koa-view使用
  - 官网：[Getting Started – Pug (pugjs.org)](https://pugjs.org/api/getting-started.html)
  - 中文网：[入门指南 – Pug 模板引擎中文文档 | Pug 中文网 (pugjs.cn)](https://www.pugjs.cn/api/getting-started.html)
- ejs - 模板引擎，非侵入式，
  - 官网：[EJS -- Embedded JavaScript templates](https://ejs.co/index.html)
  - 中文网：[EJS -- 嵌入式 JavaScript 模板引擎 | EJS 中文文档 (bootcss.com)](https://ejs.bootcss.com/)
- Parcel - 零配置的构建工具，能够处理各种框架文件的包裹
  - 官网：[Parcel (parceljs.org)](https://parceljs.org/)
  - Parcel 1中文网：[🚀 快速开始 | Parcel中文网 (parceljs.cn)](https://www.parceljs.cn/getting_started.html)
  - Parcel 2中文网：[Parcel 中文文档 | Parcel 中文网 (parceljs.cn)](https://v2.parceljs.cn/)
- koa-helmet - 安全
- koa-view - 静态文件访问能力
- md5 - md5 加密
- mkdirp - 递归创建目录
- nodemon - 项目热重载运行库：每次修改代码后，自动重启项目 - nodemon app.js
  - 项目安装：npm install nodemon --save-dev
  - 全局安装：npm install nodemon -g
- supervisor - 项目热重载运行库：每次修改代码后，自动重启项目 - supervisor app.js
  - npm install supervisor --save-dev
  - 全局安装：npm install supervisor -g

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

## koa中间件与洋葱模型

事件运行机制

```js
const Koa = require('koa')

const app = new Koa()

app.use(async (ctx, next) => {
    console.log(1)
    ctx.body = 'hello koa'
    await next()
    console.log(2)
})

app.use(async (ctx, next) => {
    console.log(3)
    await next()
    console.log(4)
})

app.use(async (ctx, next) => {
    console.log(5)
})

app.listen(3031, () => {
    console.log('http://localhost:3031/');
})
```

输入结果：13542

洋葱模型：一层一层进入，一层一层出

```js
app.use(async (ctx,next)=>{
  console.log(1);
  await next();
  console.log(2);
});

app.use(async (ctx,next)=>{
  console.log(3);
  await next();
  console.log(4);
});

<<<
1
3
4
2
```
