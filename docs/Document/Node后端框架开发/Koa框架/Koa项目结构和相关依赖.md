# Koa 项目结构和相关依赖

Koa 依赖  **node v7.6.0**  或 ES2015 及更高版本和 async 方法支持.

你可以使用自己喜欢的版本管理器(nvm/)快速安装支持的 node 版本：

```bash
nvm install 7
npm i koa
node my-koa-app.js
```

## koa 项目结构

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

**第四种(推荐使用)**：

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

## Koa 依赖

koa-generator 库： 使用  `koa-generator`  生成  `koa`  项目

- babel-core/babel-preset-es2015 - 让 nodeJs 支持 es6 modules

- koa - koa2

- koa-body - request body 解析

  - [koa-body - npm (npmjs.com)](https://www.npmjs.com/package/koa-body)

  - 使用示例：

  - ```js

    ```

- **koa-bodyparser** - request body 解析

  - [koa-bodyparser - npm (npmjs.com)](https://www.npmjs.com/package/koa-bodyparser)

  - **koa-bodyparser 使用示例：**

  - ```js
    var Koa = require('koa');
    var bodyParser = require('koa-bodyparser');

    var app = new Koa();

    // 禁用正文解析器：可以通过设置动态禁用正文解析器。
    // ctx.disableBodyParser = true
    app.use(async (ctx, next) => {
      if (ctx.path === '/disable') ctx.disableBodyParser = true;
      await next();
    });

    // 使用解析和相关配置
    app.use(bodyParser(
        // 自定义 JSON 请求检测函数。默认值为null
        detectJSON: (ctx) => {
          return /\.json$/i.test(ctx.path);
        }
        // 支持扩展类型，或者['json', 'form']：json/form/text/xml
        extendTypes: {
          json: ['application/x-javascript']
        }
        // 支持自定义错误句柄，如果抛出错误，可以自定义响应，如：koa-bodyparser
        onerror: (err, ctx) => {
          ctx.throw('body parse error', 422);
        }
        //
        // encoding: (ctx) => {

        // }
    ));

    app.use(async ctx => {
      // 解析后的body将存储在ctx. request中
      // 如果没有解析任何内容，body将是一个空对象{}
      ctx.body = ctx.request.body;
    });
    ```

- @koa/multer - formData 解析(文件上传)-处理使用[multer](https://github.com/expressjs/multer)  的 Koa 路由中间件

  - [@koa/multer - npm (npmjs.com)](https://www.npmjs.com/package/@koa/multer)
  - [koajs/multer: Middleware for handling `multipart/form-data` for koa, based on Express's multer. (github.com)](https://github.com/koajs/multer)

- koa-cache-control - 缓存控制

- koa-compress - gzip

- koa-cors - 跨域

- koa-logger - 日志

- koa-onerror - 错误处理

- **koa-router - 路由**

  - npm：[koa-router - npm (npmjs.com)](https://www.npmjs.com/package/koa-router)
  - koa-router 的 API 文档：[router/API.md koajs/router (github.com)](https://github.com/koajs/router/blob/HEAD/API.md)

- koa-session - session

- koa-static - 静态资源服务

  - [koa-static - npm (npmjs.com)](https://www.npmjs.com/package/koa-static)

  - 使用案例：

    - ```js
      const Koa = require("koa"); // 引入koa
      const app = new Koa(); // 创建koa应用
      const static = require("koa-static");

      // 可以配置多个文件夹，这个文件夹找不到就找下一个文件夹
      // 相对路径
      app.use(static("./static"));
      // 绝对路径
      app.use(
      	static(__dirname + "/public", {
      		// 默认为true  访问的文件为index.html，可以修改为别的文件名或者false
      		index: false,
      		// 是否同意传输隐藏文件
      		hidden: false,
      		// 如果为true，则在返回next()之后进行服务，从而允许后续中间件先进行响应
      		defer: true,
      	})
      );

      app.listen(3000);
      ```

    - 访问时不需要加上 pubilc，即 “http://127.0.0.1:3000/文件名” 这种形式访问

- koa-static-cache - 静态缓存

  - [koa-static-cache - npm (npmjs.com)](https://www.npmjs.com/package/koa-static-cache)

- koa-swig - 模板引擎，非侵入式，6 年未更新（推荐使用 pug 库）

  - [koa-swig - npm (npmjs.com)](https://www.npmjs.com/package/koa-swig)

- **pug - 模板引擎，(jade) 侵入式，配合 koa-view 使用**

  - 官网：[Getting Started – Pug (pugjs.org)](https://pugjs.org/api/getting-started.html)
  - 中文网：[入门指南 – Pug 模板引擎中文文档 | Pug 中文网 (pugjs.cn)](https://www.pugjs.cn/api/getting-started.html)

- ejs - 模板引擎，非侵入式

  - 官网：[EJS -- Embedded JavaScript templates](https://ejs.co/index.html)

  - 中文网：[EJS -- 嵌入式 JavaScript 模板引擎 | EJS 中文文档 (bootcss.com)](https://ejs.bootcss.com/)

  - **使用示例：**

  - 1.在 app.js 通过 koa-views 注册使用 ejs 模板引擎

  - ```js
    const views = require("koa-views");
    // 如果这样配置，模板的后缀为.html
    app.use(views("views", { map: { html: "ejs" } }));
    // 如果这样配置，模板的后缀为.ejs
    // app.use(views('views', { extension: 'ejs' }));
    ```

    2.Koa 的路由或 app.use 中间件中向模板引擎传递数据：`await ctx.render('页面',{ 数据 })`

  - ```js
    router.get("/add", async (ctx) => {
    	let title = "hello koa2";
    	// 传递数据title
    	await ctx.render("index", { title });
    });
    ```

  - 3.模板中使用路由传递过来的数据

  - ```html
    <!DOCTYPE html>
    <html lang="en">
    	<head>
    		<meta charset="UTF-8" />
    		<title></title>
    	</head>
    	<body>
    		<--! 引入ejs模板 --> <% include public/header.ejs%>
    		这是一个ejs的模板引擎 <--! Ejs 绑定数据title -->
    		<h2>标题---<%=title%></h2>
    	</body>
    </html>
    ```

    引入的模板：public/header.ejs

    ```html
    <h1 class="title">这是一个头部的模块</h1>
    ```

  - 4.views/目录的 html 文件中使用模板语法

  - ```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title></title>
    </head>
    <body>
    <--! 引入ejs模板 -->
    <% include public/header.ejs%>
    <--! Ejs 绑定数据title -->
    <h2>标题---<%=title%></h2>
    <--! js 模板中循环数据 -->
    <ul>
        <%for(var i=0;i<list.length;i++){%>
            <li><%=list[i]%></li>
        <%}%>
    </ul>

    <br/>
    <%=content%>
    <br/>
    <--! Ejs 模板判断语句 -->
    <h2>条件判断</h2>
    <br/>
    <%if(num>24){%>

     大于24
    <%}else{%>

    小于24

    <%}%>
    <br/>
    <% if(true){ %>
        <div>true</div>
    <%} else{ %>
        <div>false</div>
    <%} %>
    </body>
    </html>
    ```

- art-template - 模板引擎，轻量，号称最快速编译的模板引擎

  - 文档：[art-template (aui.github.io)](http://aui.github.io/art-template/zh-cn/index.html)

  - **Koa 使用：[Koa - art-template (aui.github.io)](http://aui.github.io/art-template/koa/)**

- dkoa-view - 静态文件访问能力

  - [koa-view - npm (npmjs.com)](https://www.npmjs.com/package/koa-view)

  - 使用示例：可以配合上面的模板引擎使用

  - ```js
    const view = require('koa-view');

    // 使用模板引擎pug，如果是ejs，也可以把pug替换成ejs
    // views 第一个参数：静态页面的路径 第二个参数配置对象
    // 参数配置对象opts文档configure：http://mozilla.github.io/nunjucks/cn/api.html#configure
    app.use(views(__dirname + '/views', { extension: 'pug' }));));

    // 中间件中传递渲染的数据
    app.use(async ctx => {
      ctx.state = {
        session: ctx.session,
        title: 'app'
      };
      // ctx.render() 是使用app.use(views())模板渲染的koa-view库注入的
      // 用于传递要渲染的数据方法
      await ctx.render('user', {
        // 传递对象属性user可以直接在：views/user.pug使用，[h1= user]
        user: 'Coder'
      });
    });
    ```

- md5 - md5 加密

- Parcel - 零配置的构建打包工具，能够处理打包包裹各种框架语言或者文件

  - 官网：[Parcel (parceljs.org)](https://parceljs.org/)
  - Parcel 1 中文网：[🚀 快速开始 | Parcel 中文网 (parceljs.cn)](https://www.parceljs.cn/getting_started.html)
  - Parcel 2 中文网：[Parcel 中文文档 | Parcel 中文网 (parceljs.cn)](https://v2.parceljs.cn/)

- mkdirp - 递归创建目录

- koa-helmet - 安全

- **项目热重载运行**

- nodemon - 项目热重载运行库：每次修改代码后，自动重启项目

  - 项目安装：npm install nodemon --save-dev

    - **项目安装启动**：`npx nodemon app.js`

  - 全局安装：npm install nodemon -g

    - **全局安装启动项目**：`nodemon app.js`

- supervisor - 项目热重载运行库：每次修改代码后，自动重启项目 - supervisor app.js

  - **项目安装**：npm install supervisor --save-dev

    - 项目安装启动：`npx supervisor app.js`

  - **全局安装**：npm install supervisor -g

    - 全局安装启动项目：`supervisor app.js`
