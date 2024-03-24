# Serverle 应用实战场景案例

## 1.Web 应用：身份认证：使用 Serverless 实现登录注册功能

代码参考：<https://github.com/nodejh/serverless-class>

登录的过程就是身份认证的过程

注册账号 => 输入用户名 => 密码登录

身份认证几乎是每个系统必备能力所以很多同学开发应用时，实现的第一功能就是登录注册

### 基于 Serverless 的身份认证功能的技术方案

要实现应用中的身份认证，首先要详细了解身份认证的技术方案，以及该方案怎么在 Serverless 架构中使用

Cookie-Session，早期互联网主要以 Web 为主，客户端是浏览器所以 Cookie-Session 方式是早期最常用的身份认证方式

![Cookie-Session](.\img\Cookie-Session.jpg)

Cookie-Session 方案存在两个主要问题

- 服务端的 Session ID 是直接存储在内存中的在分布式系统中无法共享登录状态

  - 解决办法：就是用一个共享存储来保存 Session 信息，最常见的就是 Redis ，因为 Redis 是一个内存数据库，读写速度很快

  - 基于共享存储的 Cookie-Session 身份认证流程

    ![基于共享存储的 Cookie-Session 身份认证流程](.\img\基于共享存储的 Cookie-Session 身份认证流程.jpg)

    不过呢上面这个方案，还是没有解决非浏览器不支持 cookie 的身份认证的问题

- cookie 是浏览器的功能，手机 App 等客户端并不支持 cookie 所以该方案不适用于非浏览器的应用

  - 可以使用 JWT 方案：JWT 是(JSON Web Token) 的简称

  - JWT 方案流程图例
    ![JWT 方案流程图例](D:\Code\[MyProject]\FrontEndLearnNotes\docs\Document\Serverless\img\JWT 方案流程图例.jpg)

  - token 是个比较长字符串：Header.Payload.Signature

  - 实际的 token 示例：

    ```bash
    eyJhbGciOiJIUzl1NilsInR5cC16lkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJgYWNrliwiaWFOljoxNjEwODg1MTcxfQ.Klduc-undaZ0z
    Bt4wjGZIK5fMlxlauVH[ G1DVGDCw
    ```

    JWT 这种身份认证方案，也非常适合 Serverless 应用

### 基于 Express.js 框架进行开发登录和注册功能的 Serverless 应用

参考代码：<https://github.com/nodejh/serverless-class>

#### 初始化应用

##### 1.应用初始化

```bash
npm i express body-parser @webserverless/fc-express -S
```

##### 2.初始化 Serverless 项目模板：template.yaml

```yaml
ROSTemplateFormatVersion: '2015-09-01'
Transform: 'Aliyun::Serverless-2018-04-03'
Resources:
 serverless:
  Type: 'Aliyun::Serverless::Service’
  Properties:
   Policies:
    - AliyunContainerRegistryReadOnlyAccess
   InternetAccess: true
  golang-runtime:
   Type: 'Aliyun::Serverless::Function‘
   Properties:
    Description: 'Golang Runtime’
    Runtime: nodejs12
    Timeout: 10
    CAPort: 8080
    Handler: index.handler
    MemorySize: 1024
    CodeUri: './'
    Events:
     httpTrigger:
      Type: HTTP
      Properties:
       AuthType: ANONYMOUS
       Methods: ['POST', 'GET']
```

##### 3.编写初始化代码：index.js

```js
const proxy = require("@webserverless/fc-express");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// 定义 /路由，返回 Hello Serverless!
app.get("/", (req, res) => {
	res.json({ success: true, data: "Hello Serverless!" });
});

const server = new proxy.Server(app);

module.exports.handler = function (reg, res, context) {
	// 使用 @webserverless/fc-express 来将函数计算的请求转发给 Express.js 应用
	// @webserverless/fc-express 可以将函数参数转换为Express.js 的路由参数
	server.httpProxy(req, res, context);
};
```

##### 4.通过命令部署应用

```bash
fun deploy -y
```

##### 5.测试部署后的应用

```bash
curl https://1457216987974698.cnshanghai.fc.aliyuncs.com/2016-08-15/proxy/serverless/auth-app/
```

#### 实现注册功能

先获取用户输入的用户名和密码，然后判断用户是否存在如果不存在就将其存入表格存储数据库

表格存储：可以直接通过 RestfulAPI 进行读写，并且弹性可扩展，更适合 Serverless 应用

##### 1.安装 tablestore 依赖：tablestore 库 封装了表格存储的 API

```bash
npm i tablestore -S
```

##### 2.在 index.js 中

```js
// ...
const TableStore = require("tablestore");

// ??? TableStore client
const client = new TableStore.Client({
	accessKeyId: "<your access key>",
	accessKeySecret: "your access secret",
	endpoint: "https://serverless-app.cn-shanghai.ots.aliyuncs.com",
	instancename: " serverless-app",
});
```

##### 3.定义 /register 路由，处理注册请求

```js
app.post("/register", async (req, res) => {
	// 从请求体中获取用户信息
	const name = reg.body.name;
	const password = req.body.password;
	const age = req.body.age;

	// 判断用户是否已经存在
	const { row } = await client.getRow({
		tableName: "user",
		primaryKey: [{ name }],
	});

	if (row.primaryKey) {
		// 如果用户已存在，则直接返回
		return res.json({ success: false, message: "用户已存在" });
	}

	// 创建用户，将用户信息写入到表格存储中
	await client.putRow({
		tableName: "user",
		condition: new TableStore.Condition(
			TableStore.RowExistenceExpectation.EXPECT_NOT_EXIST,
			null
		),
		primaryKey: [{ name }],
		attributeColumns: [{ password }, { age }],
	});

	// 返回创建成功
	return res.send({ success: true });
});
```

至此，注册功能完成

##### 4.通过命令来部署应用

```bash
fun deploy -y
```

##### 5.验证功能

```bash
# 第一次验证
$ curlhttps://1457216987974698.cn-shanghai.fc.aliyuncs.com/2016-08-15/proxy/serverless/auth/login \
-d "name=jack&password=123456&age=18"
-X POST

{ "success":true }


# 第二次验证
$ curlhttps://1457216987974698.cn-shanghai.fc.aliyuncs.com/2016-0815/proxy/serverless/auth/login \
-d "name=jack&password=123456&age=18"
-X POST

{ "success": false, "message": "用户已存在" }
```

#### 实现登录功能

登录就是验证用户输入的用户名密码是否正确

查询出用户信息 => 对比用户密码与数据库中的用户密码是否一致 => 登录成功 => 生成 token（可根据 token 查询用户信息）

##### 1.安装 Node.js 中的 JWT 依赖包 jsonwebtoken

```bash
npm install jsonwebtoken -S
```

##### 2.在 index.js 中，定义/login 路由

```js
const jwt = require("jsonwebtoken");

// 设置密钥，非常重要，不能泄露
const SECRET = "token_secret xd2dasf19df=";

// ...

//定义 /login 路由，用来实现登录功能
app.post("/login", async (req, res) => {
	// 从请求体中获取用户名和密码
	const name = req.body.name;
	const password = req.body.password;

	// 根据用户名查询用户信息
	const { row } = await client.getRow({
		tableName: "user",
		primaryKey: [{ name }],
	});

	// 如果查询结果为空，则直接返回用户不存在
	if (!row.primaryKey) {
		return res.json({ success: false, message: "用户不存在" });
	}

	// 从查询结果中构造用户信息
	const user = { name };
	row.attributes.forEach((item) => (user[item.columnName] = item.columnValue));

	// 判断密码是否正确
	if (password !== user.password) {
		return res.json({ success: false, message: "密码错误" });
	}

	user.password = "******";

	/**
	 * 生成 token
	 * jwt.sign() 接受两个参数，一个是传入的对象，一个是自定义的密钥
	 */
	const token = jwt.sign(user, SECRET);
	return res.json({ success: true, data: { token } });
});
```

##### 3.通过命令部署应用

```bash
fun deploy -y
```

##### 4.验证登录

```bash
# 验证登录
$ curl https://1457216987974698.cn-shanghai.fc.aliyuncs.com/2016-08-15/proxy/serverless/auth-app/login \
-d "name=jack&password=123456"
-X POST

{"success":true, "data": {"token"： "eyJhbGciOiJIUzl1NilsInR5cCI6lkpXVCJ9.eyJuYW1lljoiamFjaylslmFnZSI6ljE4liwicGFzc3dvcmQiOilqkioqKioiLCJpYXQiOjE2MTA5MDY5MTJ9.qzNZarWbpDUA8SO6nLd4ffEUR1IVOWKGXiocHV7Mku"}}

# 使用错误的密码登录
$ curl https://1457216987974698.cn-shanghai.fc.aliyuncs.com/2016-08-15/proxy/serverless/auth-app/login \
-d "name=jack&password=1234561"
-X POST

{"success":false, "message":"密码错误"}
```

登录成功后，客户端需要将 token 保存下来，然后在接下来的请求中，都需要带上 token

```bash
Authorization: Bearer token
```

#### 实现获取当前登录的用户信息的功能

##### 1.定义 /user 路由，获取当前登录的用户信息

```js
app.get("/user", (req, res) => {
	// 从HTTP 请求头中获取 token 信息
	const token = req.headers.authorization.split("").pop();

	try {
		// 验证 token 并解析出用户信息
		const user = jwt.verify(token, SECRET);
		return res.json({ success: true, data: user });
	} catch (error) {
		return res.json({ success: false, data: "身份认证失败" });
	}
});
```

##### 2.将代码部署到函数计算

```bash
fun deploy -y
```

##### 3.测试验证功能

```bash
# 测试验证功能
$ curlhttps://1457216987974698.cn-shanghai.fc.aliyuncs.com/2016-08-15/proxy/serverless/auth-app/user \
-H "Authorization: BearereyJhbGciOiJIUzl1NilsInR5cC16lkpXVCJ9.eyJuYW1lljoiamFiaylslmFnZSI6IjE4liwicGFzc3dvcmQioilqKioqKioiLCJpYXQiOjE2MTA5MDY5MTJ9.qzNZarWbpDUA8-SO6nLd4ffEUR1IVOWKGXiocHV7Mku"

{"success":true,"data":{"name":"jack","age":"18","password":"******","iat": 1610905944}}


# 使用错误的token进行身份认证
$ curlhttps://1457216987974698.cn-shanghai.fc.aliyuncs.com/201608-15/proxy/serverless/auth-app/user \
-H "Authorization: BearereyJhbGciOiJIUzl1NilsInR5cC161kpXVCJ9.evJuYW1lljoiamFiavlslmFnzSI6ljE4liwicGFzc3dvcmOiOilgKiogKioiLCJpYXOiOiE2MTA5MDY5MTJ9qzNZarWbpDUA8-SO6nLd4ffEUR1IVOWKGXiocHV7Mk"

{"success": false,"data": "身份认证失败"}
```

### Serverless 应用的身份认证总结

Serverless 应用的身份认证本质上是要将有状态的认证方案改为无状态的

- 使用共享存储来保存登录状态
- 使用无状态的身份认证方案，比如 JWT

功能

- Cookie-Session 的身份认证方式，是在服务端存储 Session 信息客户端 (浏览器) 通过 cookie 存储 Session ID
- JWT 的身份认证方式，是在服务端根据用户信息生成 token 客户端保存 token
- Cookie-Session 的认证方案通常是有状态的对于分布式、无状态的应用，需要将 Session 保存在共享存储中
- JWT 的认证方式通常是无状态的，所以比较适合 Serverless 应用

## 2.Restful API：基于 Serverless 构建弹性可扩展的 Restful API

参考代码：<https://github.com/nodejh/serverless-class>

### 前言

API 是使用 Serverless 最常见，也是最适合的场景之一

- 不用购买、管理服务器等基础设施，不用关心服务器的运维，节省人力成本
- 基于 Serverless 的 API，具备自动弹性伸缩的能力
- 能根据请求流量弹性扩缩容，让你不再担心流量波峰、波谷
- 基于 Serverless 的 API 按实际资源使用量来付费，节省财务成本

实践过程中的问题

- 怎么设计最优的架构?

- 怎么管理多个函数?

- 怎么组织代码?

### 内容管理系统的架构设计

在进行架构设计前，你要明确系统的需求，如：

- 用户注册
- 修改文章
- 用户登录
- 删除文章
- 发布文章
- 查询文章

API 网关图例

![API网关图例](.\img\API网关图例.jpg)

用户数据设计

User 表

| username | 用户名 |
| -------- | ------ |
| password | 密码   |

Article 文章表

| article_id  | 文章 ID  |
| ----------- | -------- |
| title       | 文章标题 |
| username    | 创建者   |
| content     | 文章内容 |
| create_date | 创建时间 |
| update_date | 更新时间 |

index.js

```js
const TableStore = require("tablestore");

// 初始化TableStore client
const client= new TableStore.Client({
    accessKeyld: '<your access key>';
    accessKeySecret: '<your access secret>';
    endpoint: "https://serverless-app.cn-shanghai.ots.aliyuncs.com",
    instancename:"serverless-cms",
});

/**
* 创建 user 表
* 参考文档:https://help.aliyun.com/document_detail/100594.html
*/
....

// 创建 文章article 表
...
```

以上完整代码：

```bash
git clone https://github.com/nodejh/serverless-class

# 文件夹
cd 16/cms
```

需要实现以下几个 API：

- 用户注册：POST /user/register
- 用户登录：POST /user/login
- 发布文章：POST /article/create
- 查询文章：GET /article/detail/[article_id]
- 更新文章：POST /article/update
- 删除文章：PUT /article/delete/[article_id]

初始化 Serverless 项目模板：template.yaml

```yaml
ROSTemplateFormatVersion: '2015-09-01'
Transform: 'Aliyun::Serverless-2018-04-03'
Resources:
 # 函数服务，该服务中的函数都是内容管理系统的函数
 serverless:
  Type: 'Aliyun::Serverless::Service’
  Properties:
   Description: 'Serverless 内容管理系统'
  # 函数名称
  [functionName]:
   Type: 'Aliyun::Serverless::Function'
   Properties:
 # 函数路径
 Handler: <functionPath>.handler
 Runtime: nodejs12
 CodeUri: './'
  # API网关分组，分钟中的所有API都是内容管理系统的API
  ......
  具体配置还有很多...
  有空去阿里云文档找
```

### 用户注册接口

- 请求方法：POST
- Path：/user/register
- Body 参数：username 用户名、password 密码

#### 1.src/function/user/register.js

```js
const client = require("..../db/client");

/**
 * 用户注册
 * @param {string}username 用户名
 * @param {string]password 密码
 */
async function register(username, password) {
	await client.createRow("user", { username }, { password });
}
module.exports.handler = function (event, context, callback) {
	// 从 event 中获取 API 网关传递 HTTP 请求 body 数据
	const body = JSON.parse(JSON.parse(event.toString()).body);
	const { username, password } = body;

	register(username, password)
		.then(() => callback(null, { success: true }))
		.catch((error) =>
			callback(error, { success: false, message: "用户注册失败" })
		);
};
```

#### 2.将应用部署到函数计算

```bash
fun deploy
# 如果看到运行后都部署成功，就成功了
```

#### 3.通过 curl 测试一下

```bash
$ curlhttp://a88f7e84f71749958100997b77b3e2f6-cn-beijing.alicloudapi.com/user/register \
-X POST
-d "username=Jack&password=123456"

{ "success": true }
```

#### 4.阿里云控制台查看用户注册的数据

![阿里云控制台查看用户注册的数据](.\img\阿里云控制台查看用户注册的数据.jpg)

### 用户登录接口

- 请求方法：POST
- Path：/user/login
- Body 参数：username 用户名、password 密码

#### 1.src/function/user/login.js

```js
const assert = require("assert");
const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../../config");
const client = require("./../db/client");

/**
 * 用户登录
 * @param {string}username 用户名
 * @param {string}password 密码
 */
async function login(username, password) {
	const user = await client.getRow("user", { username });
	assert(user && user.password === password);
	const token = jwt.sign({ username: user.username }, jwt_secret);
	return token;
}
module.exports.handler = function (event, context, callback) {
	const body = JSON.parse(JSON.parse(event.toString()).body);
	const { username, password } = body;

	login(username, password)
		.then((token) => callback(null, { success: true, data: { token } }))
		.catch((error) =>
			callback(error, { success: false, message: "用户登录失败" })
		);
};
```

#### 2.将应用部署到函数计算

```bash
fun deploy
# 如果看到运行后都部署成功，就成功了
```

#### 3.通过 curl 测试一下

```bash
$ curlhttp://a88f7e84f71749958100997b77b3e2f6-cn-beijing.alicloudapi.com/user/login \
-X POST
-d "username=Jack&password=123456"

{"success":true, "data": {"token":"eyJhbGciOiJIUzl1NilslnR5cCI6lkpXVCJ9.eyJ1c2VybmFtZS16lkphY2siLCJpYXQiOjE2MTEOOTI2ODF9.c56Xm4RBLYI5yVtR_Vk0lZOLOyijofcyE-P7vjkf4nA"}}
```

### 实现身份认证

Express.js 框架的身份认证中间件，用来拦截所有请求。身份认证通过后才能进执行后面的代码逻辑

#### 1.src/middleware/auth.js

```js
const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../config/index");

/**
 * 身份认证
 * @param fobject} event API 网关的 event 对象
 * @return fobiect]认证通过后返 user 信息;认证失败则返回 false
 */
const auth = function (event) {
	try {
		const data = JSON.parse(event.toString());
		if (data.headers && data.headers.Authorization) {
			const token = JSON.parse(event.toString())
				.headers.Authorization.split("")
				.pop();
			const user = jwt.verify(token, jwt_secret);
			return user;
		}
		return false;
	} catch (error) {
		return false;
	}
};

module.exports = auth;
```

#### 2.引入 auth.js 并传入 event 对象

```js
const auth = require("/middleware/auth");

module.exports.handler = function (event, context, callback) {
	// 使用 auth 进行身份认证
	const user = auth(event);
	if (!user) {
		// 若认证失败则直接返回
		return callback("身份认证失败!");
	}
	// 通过身份认证后的业务逻辑
	// ...
	callback(null);
};
```

#### 3.将应用部署到函数计算

```bash
fun deploy
# 如果看到运行后都部署成功，就成功了
```

### 发布文章接口

- 请求方法：POST
- Path：article/create
- Headers 参数：Authorization token
- Body 参数：title、 content

#### 1.src/function/article/auth.js

```js
const uuid = require("uuid");
const auth = require("../../middleware/auth");
const client = require(".././db/client");

/**
 * 创建文章
 * @param {string}username 用户名
 * @param {string} title 文章标题
 * @param {string} content 文章内容
 */
async function createArticle(username, title, content) {
	const article_id = uuid.v4();
	const now = new Date().toLocaleString();
	await client.createRow(
		"article",
		{
			article_id,
		},
		{
			username,
			title,
			content,
			create_date: now,
			update_date: now,
		}
	);
	return article_id;
}

module.exports.handler = function (event, context, callback) {
	// 身份认证
	const user = auth(event);
	if (!user) {
		// 若认证失败则直接返回
		return callback("身份认证失败");
	}
	// 从 user 中获取 username
	const { username } = user;
	const body = JSON.parse(JSON.parse(event.toString()).body);
	const { title, content } = body;

	createArticle(username, title, content)
		.then(() => callback(null, { success: true }))
		.catch((error) =>
			callback(error, { success: false, message: "创建文章失败" })
		);
};
```

#### 2.将应用部署到函数计算

```bash
fun deploy
# 如果看到运行后都部署成功，就成功了
```

#### 3.curl 命令测试

```bash
$ curlhttp://a88f7e84f71749958100997b77b3e2f6-cn-beijing.alicloudapi.com/article/create \
-X POST
-d "title=这是文章标题&content=内容内容内容.."
-H "Authorization: Bearer eyJhbGciOiJIUzl1NilslnR5cCl6lkpXVCJ9.eyJ1c2VybmFtZS16lkphY2siLCJpYXQiOjE2MTEOOTI20DF9.c56Xm4RBLYl5yVtR_Vk0lZOLOyijofcyE-P7vikf4nA"

{"success": true,"data": {"article_id": "d4b9bad8-a0ed-499d-b3c6c57f16eaa193"}}
```

文章发布成功后，可以在控制台表格存储中看到对应的数据

### 查询文章接口

- 请求方法：GET
- Path：article/detail/[article_id]
- Headers 参数：Authorization token

#### 1.src/function/article/auth.js

```js
const uuid = require("uuid");
const auth = require("../../middleware/auth");
const client = require(".././db/client");

/**
 * 获取文章详情
 * @param {string} title 文章ID
 */
async function getArticle(article_id) {
	const res = await client.getRow("article", {
		article_id,
	});
	return res;
}

module.exports.handler = function (event, context, callback) {
	// 身份认证
	const user = auth(event);
	if (!user) {
		// 若认证失败则直接返回
		return callback("身份认证失败");
	}
	// 从 event 对象中获取文章 ID
	const article_id = JSON.parse(event.toString()).pathParameters["article_id"];

	getArticle(article_id)
		.then((detail) => callback(null, { success: true, data: detail }))
		.catch((error) =>
			callback(error, { success: false, message: "创建文章失败" })
		);
};
```

#### 2.将应用部署到函数计算

```bash
fun deploy
# 如果看到运行后都部署成功，就成功了
```

#### 3.curl 命令测试

```bash
$ curlhttp://a88f7e84f71749958100997b77b3e2f6-cn-beijing.alicloudapi.com/article/detail/d4b9bad8-aDed-499d-b3c6.c57f16eaa193 \
-H "Authorization: Bearer eyJhbGciOiJIUzl1NilslnR5cC16lkpXVCJ9.eyJ1c2VybmFtZs16lkphY2siLCJpYXQiOiE2MTEOOTI2ODF9.c56Xm4RBLY[5yVtR_Vk0lZOLOyijofcyEP7vjKf4nA"

{"success"true, "data": { "article_id": "d4b9bad8-a0ed-499d-b3c6c57f16eaa193","content":"内容内容内容......","create_date"."1/24/20212:05:46 PM","title":"这是文章标题","update_date","1/24/2021,2:05:46PM","username":"Jack"}}
```

### 更新文章请求

- 请求方法：PUT
- Path：/article/update/[article_id]
- Headers 参数：Authorization token
- Body 参数：title、content

#### 1.src/function/article/auth.js

```js
const auth = require("./../middleware/auth");
const client = require("../../db/client");

/**
 * 更新文章
 * @param {string} article_id 待更新的文章ID
 * @param {string} title 文草标题
 * @param {string}  content 文章内容
 */
async function updateArticle(article_id, title, content) {
	const now = new Date().toLocaleString();
	await client.updateRow(
		"article",
		{
			article_id,
		},
		{
			title,
			content,
			update_date: now,
		}
	);
}

module.exports.handler = function (event, context, callback) {
	// 身份认证
	const user = auth(event);
	if (!user) {
		// 若认证失败则直接返回
		return callback("身份认证失败");
	}

	const eventObject = JSON.parse(event.toString());
	// 从event 对象的 pathParameters 中获取 Path 参数
	const article_id = eventObject.pathParameters["article id"];
	const body = JSON.parse(eventObject.body);
	// 从 event 对象的 body 中获取请求体参数
	const { title, content } = body;

	updateArticle(article_id, title, content)
		.then(() => callback(null, { success: true }))
		.catch((error) =>
			callback(error, { success: false, message: "更新文章失败" })
		);
};
```

#### 2.将应用部署到函数计算

```bash
fun deploy
# 如果看到运行后都部署成功，就成功了
```

#### 3.curl 命令测试

```bash
$ curl http://a88f7e84f71749958100997b77b3e2f6-cn-beijing.alicloudapi.com/article/update/d4b9bad8-aDed-499d-b3c6c57f16eaa193 \
-X PUT\
-d "title=这是文章标题&content=更新的内容..."\
-H "Authorization: Bearer eyJhbGciOiJIUzl1NilsInR5cC16lkpXVCJ9.eyJ1c2VybmFtZS16lkphY2siLCJpYXOiOjE2MTEOOTI2ODF9.c56Xm4RBLY[5yVtR_Vk0lZOLOyijofcyE-P7vjkf4nA"

{"success": true}
```

### 删除文章请求

- 请求方法：DELETE
- Path：/article/delete/[article_id]
- Headers 参数：Authorization token

#### 1.src/function/article/auth.js

```js
const uuid = require("uuid");
const auth = require("../../middleware/auth");
const client = require(".././db/client");

/**
 * 删除文章
 * @param {string} title 文章ID
 */
async function deleteArticle(article_id) {
	const res = await client.deleteRow("article", {
		article_id,
	});
	return res;
}

module.exports.handler = function (event, context, callback) {
	// 身份认证
	const user = auth(event);
	if (!user) {
		// 若认证失败则直接返回
		return callback("身份认证失败");
	}
	// 从 event 对象中获取文章 ID
	const article_id = JSON.parse(event.toString()).pathParameters["article_id"];

	deleteArticle(article_id)
		.then(() => callback(null, { success: true }))
		.catch((error) =>
			callback(error, { success: false, message: "删除文章失败" })
		);
};
```

#### 2.将应用部署到函数计算

```bash
fun deploy
# 如果看到运行后都部署成功，就成功了
```

#### 3.curl 命令测试

```bash
$ curl http://a88f7e84f71749958100997b77b3e2f6-cn-beijing.alicloudapi.com/article/delete/d4b9bad8-a0ed-499db3c6-c57f16eaa193 \
-X DELETE
-H "Authorization: Bearer eyJhbGciOiJIUzl1NilsInR5cC161kpxVCJ9.eyJ1c2VybmFtZS16lkphY2siLCJpYXQiOjE2MTEOOTI2ODF9.c56Xm4RBLY[5yVtR_Vk0lZOLOyijofcyE-P7vikf4nA"

{"success":true}
```

### 基于 Serverless 构建弹性可扩展的 Restful API 总结

基于 Serverless 开发 RestfulAPI 的整个代码非常简单每个函数只负责一个独立的业务

- 基于 Serverless 开发 API 时，建议你使用 API 网关进行 API 的管理
- 对于数据库等第三方服务，建议对其基本操作进行封装这样更方便进行扩展
- Serverless 函数需要保持简单、独立、单一职责

## 服务端渲染(SSR)应用

参考代码：<https://github.com/nodejh/serverless-class>

### 前言

Serverless 最大的应用场景之一：就是开发服务端渲染(SSR)应用

### 基于 Serverless 的服务端渲染架构

#### 主流前端框架

- React.js
- Vue.js

#### 主流前端框架的问题

- 不利于 SEO：页面源码不再是 HTML，而是染 HTML 的 JavaScript 这就导致搜索引擎爬虫难以解析其中的内容
- 初始化性能差：通常单元应用的 JS 文件体积都比较大、加载耗时比较长导致页面白屏

#### 传统服务端渲染架构

![传统服务端渲染架构](.\img\传统服务端渲染架构.jpg)

#### 实现一个服务端渲染应用，通常面临着一些问题

- 部署服务端渲染应用需要购买服务器，并配置服务器环境，要对服务器进行运维
- 需要关注业务量，考虑有没有高并发场景、服务器有没有扩容机制
- 需要实现负载均衡、流量控制等复杂后端能力等

#### 基于 Serverless 的服务选染架构

![基于Serverless的服务选染架构](.\img\基于Serverless的服务选染架构.jpg)

#### 进阶版基于 Serverless 的服务端染架构

![进阶版基于Serverless的服务端染架构](.\img\进阶版基于Serverless的服务端染架构.jpg)

### 实现一个 Serverless 的服务端渲染应用

#### 功能

- 首页-文章列表
- 文章详情

示例代码：<https://github.com/nodejh/serverless-class/tree/master/17/serverless-ssr-cms>

接口文件夹：src

页面实现文件夹：web

##### 1.首页接口的实现：src/service/index.ts

##### 2.首页页面的实现：web/pages/index

- fetch.ts：获取首页数据
- render.tsx：首页页面 UI 组件代码
- index.less：样式代码

##### 3.详情页接口的实现：src/service/detail.ts

##### 4.详情页页面的实现：web/pages/detail

- fetch.ts：获取详情页数据
- render$id.tsx：详情页页面 UI 组件代码
- index.less：样式代码

部署：更好的实践是:实现一个业务的持续集成流程，统一构建部署

### 总结

基于 Serverless 的服务端渲染应用实现也比较简单，如果你想要追求更好的用户体验我也建议你对核心业务做服务端渲染的优化

#### 达到页面的极致体验

- 将静态资源部署到 CDN，提升资源加载速度
- 针对页面进行缓存，减少函数冷启动对性能的影响
- 对服务端异常进行降级处理

  1.基于 Serverless 的服务端染应用，可以让我们不用关心服务器的运维应用也天然具有弹性

  2.基于 Serverless 开发服务端渲染应用建议完善业务的持续集成流程

  3.要达到页面的极致性能还需要考虑将静态资源部署到 CDN、对页面进行缓存等技术

  4.对于服务端渲染应用建议你完善业务的服务降级能力，进一步提高稳定性对于服务端渲染应用建议你完善业务的服务降级能力，进一步提高稳定性

## 批处理任务：基于 Serverless 开发音视频处理系统

音视频处理：是一个 CPU 密集型的操作，非常消耗计算资源

### 传统音视频处理方案

信息传播的媒介

- 文字
- 图片
- 视频
- 短视频
- 直播
- AR
- VR

![传统音视频处理方案](.\img\传统音视频处理方案.jpg)

虽然用了视频转码服务，但还是要购买大量的服务器，来搭建自己的视频处理系统，对视频进行更高级的自定义处理

遇到的问题

- 如何应对大量并发任务?
- 能否让这个系统有更高的弹性和可用性?

### 基于 Serverless 的音视频处理系统

从基础设施的角度来看：基于 Serverless 的音视频解决方案--主要是替换了传统方案中的计算资源，也就是替换了服务器

基于 Serverless 平台提供的丰富的触发器，也能简化编程模型

传统服务器

![传统服务器](.\img\传统服务器.jpg)

基于 Serverless 平台提供的丰富的触发器

![基于 Serverless 平台提供的丰富的触发器](.\img\基于 Serverless 平台提供的丰富的触发器.jpg)

基于 Serverless 的音视频处理系统，使用了 ffmpeg 和 ffprobe 命令行工具，主要有以下几个功能：

- 获取视频时长
- 截取视频 GIF 图
- 获取视频元数据
- 对视频进行转码
- 为视频添加水印

示例参考代码：<https://github.com/nodejh/serverless-class/tree/master/18/serverless-video>

1.公共方法：common/utils.js

2.获取 OSS 客户端操作：functions/get_duration/index.js

#### 音视频处理系统的部署

函数的依赖：需要一起打包上传到 FaaS 平台

所以需要将 ffmpeg 和 ffprobe 上传

在上传到 FaaS 平台之前，需要为其赋予可执行权限

1.通过 ls 命令来查看文件的权限

```bash
$ ls -l

-rwxr-xr-x 1 root staff 39000328 2 9 20:59 ffmpeg
-rwxr-xr-x 1 root staff 38906056 2 9 21:00 ffprobe
```

![权限说明](.\img\权限说明.jpg)

2.如果两个文件都没有执行文件权限，需要通过下面的命令添加权限

```bash
chmod +x ffmpeg
chmod +x ffprobe
```

3.如何授权：在 template.yaml

```yaml
# 权限相关
Role: acs:ram::1457216987974698:role/aliyunfclogexecutionrole
```

### 基于 Serverless 开发音视频处理系统 总结

这一讲我们学习了怎么基于 Serverless 实现一个音视频处理系统，介绍了如何通过 ncc 进行代码构建

- Serverless 除了适合 Web 接口、服务端染等场景还适合 CPU 密集型的任务
- 基于 Serverless 开发的音视频处理系统本身就具备弹性、可扩展、低成本、免运维、高可用的能力
- 对干需要通过代码执行的命令行工具等依赖，部署到 FaaS 平台之前需要为其设置可执行权限若函数依需要调用其他云产品的接口，需要为函数授予相应权限
- 对于添加水印、视频转码等消耗资源的操作需要为函数设置较大的内存和超时时间

## 批处理任务：基于 Serverless 开发大数据计算批处理

## 物联网应用

## 短网址服务开发

其他参考项目：[Tsuk1ko/cfworker-url-shortener: 部署在 Cloudflare Workers 的短网址服务 (github.com)](https://github.com/Tsuk1ko/cfworker-url-shortener)

参考文章：[短网址生成-nodejs 实现*nodejs 短链接服务*(def p [\])的博客-CSDN 博客](https://blog.csdn.net/zhoujiaping123/article/details/81365343/)

### 功能简要描述

用户可以为指定 URL 创建对应短

- 链允许用户通过参数指定生成的短链 slug
- 如果没有指定短链，默认使用自动生成的短字符 ID

用户访问短链，自动跳转到相应 URL

- 如果短链不存在，则返回 404
- 如果短链存在，记录访问日志 (ip、ua、timestamp)

---

实际腾讯云函数项目成品：[zce/tcb: All my tencent cloudbase sources. (github.com)](https://github.com/zce/tcb)

成品代码：[zce/short: A short url service. (github.com)](https://github.com/zce/short)

### 1.创建一个 Express 项目后台服务

视频教程：<https://www.bilibili.com/video/av630234827/>

**0.package.json**

```json
{
	"name": "short-url",
	"version": "1.0.0",
	"description": "基于Serverless + Express开发短网址服务",
	"main": "index.js",
	"keywords": [],
	"author": "",
	"license": "ISC",
	"scripts": {
		"dev": "node-dev -r dotenv/config index.js"
	},
	"devDependencies": {
		"node-dev": "^6.7.0",
		"dotenv": "^16.3.1"
	},
	"dependencies": {
		"@cloudbase/node-sdk": "2.5.0",
		"express": "^4.17.1",
		"nanoid": "^4.0.2"
	}
}
```

**1.app.js**：全部代码

看腾讯云的《开发指南文档》：[云开发 CloudBase 概述-开发指南-文档中心-腾讯云 (tencent.com)](https://cloud.tencent.com/document/product/876/19369)

```js
const cloudbase = require("@cloudbase/node-sdk");
```

```js
const express = require("express");
const { nanoid } = require("nanoid");
// 根据腾讯开发文档：数据库初始化引用
const { init } = require("@cloudbase/node-sdk");

const { SECRET_ID, SECRET_KEY } = process.env;
// 初始化数据库
const tcb = init({ env: "zce", secretId: SECRET_ID, secretKey: SECRET_KEY });
// 1. 获取数据库引用
const db = tcb.database();
const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.post("/create", async (request, response) => {
	const { url, slug = nanoid(4) } = request.body;
	// 添加一堆逻辑判断

	// 2. 构造添加语句：链接添加进数据库
	await db.collection("links").add({ slug, url });
	// 请求后的返回链接
	response.send({ link: "http://localhost:3080/" + slug });
});

// 生成短链接
app.get("/:slug", async (req, res) => {
	const { slug } = req.params;
	const { data } = await db.collection("links").where({ slug }).get();
	const [link] = data;

	// 添加意外情况的判断逻辑

	res.redirect(link.url);
});

module.exports = app;
```

**2.index.js**：全部代码

```js
const app = require("./app");
app.listen(3080, () => console.log("server is ready > http://localhost:3080"));
```

**3.`.env`文件**

```bash
SECRET_ID=
SECRET_KEY=
```

**4.接口测试文件（前提：先安装插件【REST Client】）：test.http，文件顶部有个提示：`Send Request`，点击便会请求接口**

```bash
### create
POST http://localhost:3080/create
content-type: application/json

{
 "url": "https://github.com",
 "slug": "zce"
}

### redirect
GET http://localhost:3080/xxx
content-type: application/json

{
 "url": "https://github.com"
}

```

**5.腾讯云：云开发 CloudBase——数据库——新建环境——勾选 开启免费资源——创建——回到创建好的数据库——新建集合**

## Serverless+Eggjs 开发后台管理

视频教程：[Serverless + Egg.js 开发后台管理\_哔哩哔哩\_bilibili](https://www.bilibili.com/video/av413092278/?vd_source=5f0c99b3deddffe219938763769b15ac)

珠峰文档：[珠峰架构师成长计划 (zhufengpeixun.com)](<http://www.zhufengpeixun.com/strong/html/97.serverless.html#t11.1> Serverless 是什么？)

## 小程序

## Nuxt3+Vercel+Serverless 全栈开发

视频：<https://www.bilibili.com/video/BV1Dk4y1s7er/>

## 阿里工程师带你从零开始学 Node.js：Serverless

视频：<https://www.bilibili.com/video/BV1154y1T7dy/>
