# Express 实战开发

[Express + Node.js 手册 (qq.com)](https://mp.weixin.qq.com/s/-VamCCMrRJtBjICnJ2SW4A)

## Express 实战开发项目地址

express-demo：<https://github.com/muyaCode/express-dome>

## 1.express 项目初始化启动

app.js：

服务器监听、静态资源处理、ejs 模板引擎加载、路由处理方式示例

```js
// 1）.导入express
const express = require("express");
const path = require("path");
const userRouter = require("./router/user"); // 导入user的路由方法userRouter

// 2）.调用express方法, 创建服务端实例对象
const app = express();

// 处理静态资源
app.use(express.static(path.join(__dirname, "public")));

/**
 * 处理动态资源
 */
// 1.告诉express动态资源存储在什么地方
app.set("views", path.join(__dirname, "views"));
// 2.告诉express动态网页使用的是什么模板引擎
app.set("view engine", "ejs");
// 3.监听请求, 返回渲染之后的动态网页
app.get("/", (req, res, next) => {
	// 注意点: express给请求对象和响应对象添加了很多自定义的方法
	res.render("index", { msg: "ejs模板引擎加载成功" });
});

// 通过express处理路由方式一
/*
app.get('/api/goods/list', (req, res, next)=>{
    res.end('it666.list.get');
});
app.get('/api/user/login', (req, res, next)=>{
    // 注意点: 响应对象的json方法是express给响应对象扩展的
    //         这个方法会自动将对象转换成字符串之后返回
    //         这个方法还会自动帮助我们设置响应头
    res.json({
        name:'lnj',
        age:33,
        method: 'get'
    });
});
app.post('/api/goods/detail', (req, res, next)=>{
    res.end('it666.detail.post');
});
app.post('/api/user/register', (req, res, next)=>{
    res.json({
        name:'lnj',
        age:33,
        method: 'post'
    });
});
*/

// 通过express处理路由方式二：使用导入的user路由模块的路由方法userRouter
// '/api/user'是路由前置
app.use("/api/user", userRouter);

// 3）.告诉服务端需要监听哪一个端口
app.listen(3000, () => {
	console.log("express服务启动成功" + "localhost:3000");
});
```

## 2.express 应用级别路由的使用-处理请求参数

app.js：

1.app.路由方法('/路由前缀', () => {})，如：app.post()，app.get()

2.application/json 类型和 application/x-www-form-urlencoded 表单类型的请求数据的解析

```js
// 1）.导入express
const express = require("express");
const path = require("path");

// 2）.调用express方法, 创建服务端实例对象
const app = express();

// 处理静态资源
app.use(express.static(path.join(__dirname, "public")));

// 处理动态资源
// 1.告诉express动态资源存储在什么地方
app.set("views", path.join(__dirname, "views"));
// 2.告诉express动态网页使用的是什么模板引擎
app.set("view engine", "ejs");
// 3.监听请求, 返回渲染之后的动态网页
app.get("/", (req, res, next) => {
	// 注意点: express给请求对象和影响对象添加了很多自定义的方法
	res.render("index", { msg: "www.it666.com" });
});

/**
 * express应用级别路由的使用和数据解析
 */
app.get("/get", (req, res, next) => {
	// express会将get的请求参数转换成对象之后, 放到请求对象的query属性中
	console.log(req.query);
});
// 告诉express能够解析 application/json类型的请求参数
app.use(express.json());
// 告诉express能够解析 表单类型的请求参数 application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
// express会将解析之后, 转换成对象的post请求参数放到请求对象的body属性中
app.post("/post", (req, res, next) => {
	console.log(req.body);
});

// 3）.告诉服务端需要监听哪一个端口
app.listen(3000, () => {
	console.log("express服务启动成功" + "localhost:3000");
});
```

可以使用接口请求工具（postman、Apifox）输入地址测试请求：

```bash
localhost:3000/post
localhost:3000/get?name=555&pwd=123456
```

## 3.express 应用级别路由的使用-处理 Cookie

app.js：

1.在上面的代码的基础上，使用 cookie-parser 库，设置和获取 Cookie

```js
const express = require("express");
const path = require("path");
// cookie解析库
const cookieParser = require("cookie-parser");

// 之前的代码...

// 处理cookie
app.get("/setCookie", (req, res, next) => {
	res.cookie("username", "lnj", { httpOnly: true, path: "/", maxAge: 10000 });
	res.end();
});
app.use(cookieParser());
app.get("/getCookie", (req, res, next) => {
	console.log(req.cookies);
});

// 3）.告诉服务端需要监听哪一个端口
app.listen(3000, () => {
	console.log("express服务启动成功" + "localhost:3000");
});
```

可以使用接口请求工具（postman、Apifox）输入地址测试请求：

```bash
# 设置Cookie
localhost:3000/setCookie
# 获取Cookie，打印在编辑器的终端
localhost:3000/getCookie
```

## 4.express-next 方法

### next()方法使用示例：next()是否继续往下执行下面的方法

```js
// 1.导入express
const express = require("express");
const path = require("path");
const userRouter = require("./router/user");
const cookieParser = require("cookie-parser");

// 2.调用express方法, 创建服务端实例对象
const app = express();

// express-next方法
/*
1.use既可以处理没有路由地址的请求, 也可以处理有路由地址请求
2.use既可以处理get请求, 也可以处理post请求
3.在处理请求的时候是从上至下的判断的, 哪一个先满足就哪一个来处理
4.如果在处理请求的回调函数中没有调用next方法, 那么处理完之后就不会继续往下判断了
5.如果在处理请求的回调函数中调用了next方法,那么处理完之后还会继续往下判断
* */
app.use((req, res, next) => {
	console.log("use1 没有路由地址");
	next();
});
app.use("/", (req, res, next) => {
	console.log("use2 有路由地址");
	next();
});
app.get("/api", (req, res, next) => {
	console.log("get1 /api");
	next();
});
app.get("/api/user", (req, res, next) => {
	console.log("get2 /api/user");
	next();
});
app.post("/api", (req, res, next) => {
	console.log("post1 /api");
	next();
});
app.post("/api/user", (req, res, next) => {
	console.log("post2 /api/user");
	next();
});

// 3.告诉服务端需要监听哪一个端口
app.listen(3000, () => {
	console.log("listen ok");
});
```

可以使用接口请求工具（postman、Apifox）输入地址测试请求：

```bash
# 测试app.use的应用级别的路由：看看两个方法，哪个先执行
localhost:3000/
# 测试/api，get和post方法都切换测试一遍
# 回到编辑器看终端打印输出什么，哪个方法先执行
localhost:3000/api
# 测试/api/user，get和post方法都切换测试一遍
# 回到编辑器看终端打印输出什么，哪个方法先执行
localhost:3000/api/user
```

### 结合之前代码使用例子+说明：

```js
// 1.导入express
const express = require("express");
const path = require("path");
const userRouter = require("./router/user");
const cookieParser = require("cookie-parser");
const createError = require("http-errors");

// 2.调用express方法, 创建服务端实例对象
const app = express();
/*
默认情况下会从上至下的匹配路由处理方法, 一旦匹配到了就会执行,
执行完毕之后如果没有调用next就停止,
执行完毕之后如果调用了next就继续向下匹配
* */
// next方法正确打开姿势
/*
通过next方法, 我们可以将同一个请求的多个业务逻辑拆分到不同的方法中处理
这样可以提升代码的可读性和可维护性, 以及保证代码的单一性
* */
app.get(
	"/api/user/info",
	(req, res, next) => {
		console.log("验证用户是否登陆");
		next();
	},
	(req, res, next) => {
		console.log("用户已经登陆, 可以查看用户信息");
	}
);

// 3.告诉服务端需要监听哪一个端口
app.listen(3000, () => {
	console.log("listen ok");
});
```

## 5.express-处理错误

app.js 内：在上面代码的基础上添加，使用 http-errors 库

使用前先安装：`npm i http-errors`

```js
// 1.导入express
const express = require("express");
const path = require("path");
const createError = require("http-errors");

// 2.调用express方法, 创建服务端实例对象
const app = express();

// express错误处理
app.get("/api/user/login", (req, res, next) => {
	res.end("login");
});
app.get("/api/user/register", (req, res, next) => {
	res.end("register");
});
/*
由于在处理请求的时候会从上至下的匹配
由于前面的处理方法都没有调用next方法, 所以处理完了就不会再继续向下匹配了
由于use没有指定路由地址, 由于use既可以处理get请求, 又可以处理post请求
所以只要前面的路由都没有匹配到, 就会执行下面的use
* */
app.use((req, res, next) => {
	next(createError(404));
});
app.use((err, req, res, next) => {
	console.log(err.status, err.message); // 打印错误
	res.end(err.status, err.message); // 输出错误到网页上
});

// 3.告诉服务端需要监听哪一个端口
app.listen(3000, () => {
	console.log("listen ok");
});
```

可以在浏览器中输入没有定义的路由地址，如：

```bash
localhost:3000/api/user/xxx
```

res.end(err.status, err.message)，这句代码会输出到网页上，为：`404 Not Found`

## 6..express-中间件

### app.js：

app.get/post()方法，里面接收三个参数的回调函数：`(req, res, next) => {}`，就是 express 的中间件

三个参数：

- request 请求对象
- response 响应对象
- next 函数

```js
// 1.导入express
const express = require("express");
const path = require("path");
const createError = require("http-errors");

// 2.调用express方法, 创建服务端实例对象
const app = express();

app.get(
	"/api/user/info",
	(req, res, next) => {
		console.log("验证用户是否登陆");
		next();
	},
	(req, res, next) => {
		console.log("用户已经登陆, 可以查看用户信息");
		res.json({ name: "lnj", age: 66 });
	}
);

app.get("/api/user/info", (req, res, next) => {
	console.log("验证用户是否登陆");
	next();
});
app.get("/api/user/info", (req, res, next) => {
	console.log("用户已经登陆, 可以查看用户信息");
	res.json({ name: "lnj", age: 66 });
});

// 3.告诉服务端需要监听哪一个端口
app.listen(3000, () => {
	console.log("listen ok");
});
```

### 中间件说明

#### 1.什么是中间件?

- 中间件的本质就是一个函数, 这个函数接收 3 个参数 request 请求对象、response 响应对象、next 函数
- 当请求进来，会从第一个中间件开始进行匹配。如果匹配则进入，如果不匹配，则向后依次对比匹配

#### 2.中间件的作用?

- 将一个请求的处理过程，分发到多个环节中，目的效率高，便于维护。即每个环节专门干一件事

#### 3.中间件的分类

1. 应用级别中间件 绑定到 app 实例上的中间件 例如: app.get / app.post

2. 路由级别中间件
   绑定到 router 实例上的中间件
   例如: router.get / router.post

3. 错误处理中间件

   1. 与其他中间件函数的定义基本相同

   2. 不同之处在于错误处理函数多了一个变量：err，即它有 4 个变量：err, req, res, next

4. 内置中间件

   1. express.static()

   2. express.json()

   3. express.urlencoded()

   4. ...

5. 第三方中间件

   1. cookie-parser

   2. ...

## 监听请求里的对象

### Request 对象

request 对象表示 HTTP 请求，包含了请求查询字符串，参数，内容，HTTP 头部等属性。常见属性有：

- req.app
  - 当callback为外部文件时，用req.app访问express的实例

- req.baseUrl
  - 获取路由当前安装的URL路径

- req.body / req.cookies
  - 获得「请求主体」/ Cookies

- req.fresh / req.stale
  - 判断请求是否还「新鲜」

- req.hostname / req.ip
  - 获取主机名和IP地址

- req.originalUrl
  - 获取原始请求URL

- req.params
  - 获取路由的parameters

- req.path
  - 获取请求路径

- req.protocol
  - 获取协议类型

- req.query
  - 获取URL的查询参数串

- req.route
  - 获取当前匹配的路由

- req.subdomains
  - 获取子域名

- req.accepts()
  - 检查可接受的请求的文档类型

- req.acceptsCharsets / req.acceptsEncodings / req.acceptsLanguages
  - 返回指定字符集的第一个可接受字符编码

- req.get()
  - 获取指定的HTTP请求头

- req.is()
  - 判断请求头Content-Type的MIME类型

### Response 对象

response 对象表示 HTTP 响应，即在接收到请求时向客户端发送的 HTTP 响应数据。常见属性有：

- res.send()
  - 传送HTTP响应

- res.app
  - 同req.app一样

- res.append()
  - 追加指定HTTP头

- res.set()
  - 在res.append()后将重置之前设置的头

- res.cookie(name，value [，option])

  - 设置Cookie

  - opition: domain / expires / httpOnly / maxAge / path / secure / signed

- res.clearCookie()
  - 清除Cookie

- res.download()
  - 传送指定路径的文件

- res.get()
  - 返回指定的HTTP头

- res.json()
  - 传送JSON响应

- res.jsonp()
  - 传送JSONP响应

- res.location()
  - 只设置响应的Location HTTP头，不设置状态码或者close response

- res.redirect()
  - 设置响应的Location HTTP头，并且设置状态码302

- res.render(view,[locals],callback)
  - 渲染一个view，同时向callback传递渲染后的字符串，如果在渲染过程中有错误发生next(err)将会被自动调用。callback将会被传入一个可能发生的错误以及渲染后的页面，这样就不会自动输出了。

- res.sendFile(path [，options] [，fn])
  - 传送指定路径的文件 -会自动根据文件extension设定Content-Type

- res.set()
  - 设置HTTP头，传入object可以一次设置多个头

- res.status()
  - 设置HTTP状态码

- res.type()
  - 设置Content-Type的MIME类型

## 7.express-结合快速开发 express-generator 脚手架实战

express-generator 脚手架的安装和使用，**请看文档**：`Express快速开发脚手架`

### 注册和登录开发

#### 1.实现登录注册

##### 路由：routes/user.js

```js
const express = require("express");
const router = express.Router();
const { registerUser, loginCheck } = require("../controller/userController");

router.post("/login", async (req, res, next) => {
	// 处理登录
	let result = await loginCheck(req.body);
	// 存储登录状态
	if (result.code === 200) {
		req.session.username = result.data.username;
		req.session.password = result.data.password;
		req.session.gender = result.data.gender;
	}
	return res.json(result);
});
router.post("/register", async (req, res, next) => {
	// 注册用户
	let result = await registerUser(req.body);
	// 返回注册结果
	return res.json(result);
});
router.get("/test", (req, res, next) => {
	console.log(req.session);
	if (req.session.username) {
		res.end("login ok");
	} else {
		res.end("login error");
	}
});

module.exports = router;
```

##### 路由控制器处理方法：controller/userController.js

安装数据校验库：ajv

其他引用的模块方法继续看后面

```js
const Ajv = require("ajv");
const ajv = new Ajv();
const userSchema = require("../validator/userValidator");
const { getUser, createUser } = require("../service/userService");
const { SuccessModel, ErrorModel } = require("../model/resultModel");
const {
	userDataFail,
	userExistsFail,
	userRegisterFail,
	userLoginFail,
} = require("../config/errorConst");
const generatePwd = require("../utils/crypto");

/**
 * 校验用户数据是否正确
 * @param data 被校验的数据
 * @returns {boolean | PromiseLike<any>}
 */
function userValidate(data) {
	return ajv.validate(userSchema, data);
}

/**
 * 检查用户是否存在
 * @param username 被检查的用户名称
 * @returns {Promise<boolean>}
 */
async function userExists(username) {
	let users = await getUser(username);
	return users.length !== 0;
}

/**
 * 用户注册
 * @param data 用户数据
 * @returns {Promise<ErrorModel|*>}
 */
async function registerUser({ username, password, gender }) {
	// 1.校验数据是否正确
	let valid = userValidate({ username, password, gender });
	if (!valid) {
		return new ErrorModel(userDataFail);
	}
	// 2.判断当前注册的用户是否存储
	let isExists = await userExists(username);
	// 3.判断是否可以注册
	if (valid && !isExists) {
		try {
			// 密码加密之后再存储
			await createUser({ username, password: generatePwd(password), gender });
			return new SuccessModel({ msg: "注册成功" });
		} catch (e) {
			return new ErrorModel(userRegisterFail);
		}
	} else {
		return new ErrorModel(userExistsFail);
	}
}

/**
 * 登录
 * @param username  用户名
 * @param password  密码
 * @returns {Promise<ErrorModel|*|SuccessModel|*>}
 */
async function loginCheck({ username, password }) {
	// 由于存储的密码是加密的, 所以登录时也要用加密的密码去登录
	let users = await getUser(username, generatePwd(password));
	if (users.length !== 0) {
		return new SuccessModel({ msg: "登录成功", data: users[0] });
	} else {
		return new ErrorModel(userLoginFail);
	}
}

module.exports = {
	registerUser,
	loginCheck,
};
```

##### 控制器的校验 Schema：validator/userValidator.js

```js
const userSchema = {
	type: "object",
	properties: {
		username: {
			type: "string",
			pattern: "^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\\.[a-zA-Z0-9_-]+)+$",
			maxLength: 255,
			minLength: 3,
		},
		password: {
			type: "string",
			pattern: "^[A-Za-z0-9]{6,20}$",
			maxLength: 20,
			minLength: 6,
		},
		gender: {
			type: "string",
			pattern: "[男,女,妖]",
		},
	},
	required: ["username", "password"],
};
module.exports = userSchema;
```

##### 数据库操作的服务方法：service\userService.js

```js
const User = require("../db/model/user");

/**
 * 根据用户名获取用户信息你
 * @param username 被获取的用户名
 * @returns {Promise<*>}
 */
async function getUser(username, password) {
	if (password) {
		let results = await User.findAll({
			where: {
				username: username,
				password: password,
			},
		});
		return results;
	} else {
		let results = await User.findAll({
			where: {
				username: username,
			},
		});
		return results;
	}
}
async function createUser({ username, password, gender }) {
	let results = await User.create({
		username: username,
		password: password,
		gender: gender,
	});
	return results["dataValues"];
}
module.exports = {
	getUser,
	createUser,
};
```

##### 请求和响应成功和错误函数方法：model/resultModel.js

```js
class BaseModel {
	constructor({ code, msg, data }) {
		this.code = code;
		this.msg = msg;
		this.data = data;
	}
}
class SuccessModel extends BaseModel {
	constructor({ code, msg, data }) {
		super({ code, msg, data });
		this.code = 200;
	}
}
class ErrorModel extends BaseModel {
	constructor({ code, msg, data }) {
		super({ code, msg, data });
		this.code = -1;
	}
}
module.exports = {
	SuccessModel,
	ErrorModel,
};
```

##### 错误消息对象：config/errorConst.js

```js
module.exports = {
	userDataFail: {
		code: 1001,
		msg: "数据不符合预期",
	},
	userExistsFail: {
		code: 1002,
		msg: "用户已经存在",
	},
	userRegisterFail: {
		code: 1003,
		msg: "注册失败",
	},
	userLoginFail: {
		code: 1004,
		msg: "登录失败",
	},
};
```

##### MD5 加密工具函数：utils/crypto.js

```js
// 1.导入加密模块
const crypto = require("crypto");
const secret = "com.it666";
// 2.创建加密方法
function _md5(password) {
	/*
    MD5加密（加密不可逆）
    MD5的全称是Message-Digest Algorithm 5（信息-摘要算法）。 128位长度。
    目前MD5是一种不可逆算法。具有很高的安全性
    什么叫做不可逆?
    不可以通过加密之后的内容还原加密之前的内容, 我们就称之为不可逆
    * */
	// 1.指定加密方式
	const md5 = crypto.createHash("md5");
	// 2.指定需要加密的内容和加密之后输出的格式
	const hash = md5
		.update(password) // 指定需要加密的内容
		.digest("hex"); // 指定加密之后输出的格式
	/*
    注意点:
    MD5加密, 只要加密的内容没有发生变化, 那么加密之后的内容就不会发生变化
    所以正式因为如此, 虽然MD5是不可逆的, 但是可以暴力破解
    正式因为如此, 所以仅仅通过MD5加密也不安全
    所以我们在加密之前应该对原始数据进行加盐操作
    什么叫做加盐?
    给原始数据混入一些其它数据
    * */
	// console.log(hash); // e80b5017098950fc58aad83c8c14978e
	// e80b5017098950fc58aad83c8c14978e
	return hash;
}
function generatePwd(password) {
	password = password + secret;
	let hash = _md5(password);
	// console.log(hash); // 4167228cfbe1daa78e88c41bf357618e --> abcdefcom.it666
	return hash;
}
module.exports = generatePwd;
// _md5('abcdef');
// generatePwd('abcdef');
/*
数据库:
source(原始值)   target(加密之后值)
abcdef           e80b5017098950fc58aad83c8c14978e
* */
```

#### 2.存储登录状态：app.js

**cookie 解析库**：cookie-parser 库，导出成`cookieParser()`方法

**session 库**：express-session 库，导出后使用`session()`方法

**保持登录状态**：connect-redis 库，使用需要结合 session 库的方法，再使用存储的 RedisStore 常量方法，来保持登录状态

```js
// 导入了一些第三方的模块
const createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const path = require("path");
const fs = require("fs");
const session = require("express-session");
const RedisStore = require("connect-redis")(session);
const redisClient = require("./db/redis");

require("./db/sync"); // 初始化数据库表
// 导入了处理路由的模块
const usersRouter = require("./routes/user");

// 创建了服务端实例对象
const app = express();

// 处理动态网页
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
/*
在express中我们可以通过morgan来记录日志
我们只需要安装morgan, 导入morgan, 注册morgan的中间件即可
在注册morgan中间件的时候需要指定日志的模式, 不同的模式记录的内容也不同
默认情况下morgan会将日志输出到控制台中, 当然我们也可以通过配置让它把日志写入到文件中
* */
// create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(
	path.join(__dirname, "log/access.log"),
	{ flags: "a" }
);
app.use(
	logger("combined", {
		stream: accessLogStream,
	})
);
// 处理post请求参数
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// 解析cookie
app.use(cookieParser());
// 保存登录状态
app.use(
	session({
		name: "userId",
		secret: "COM.it6666.*?", // 用于生成无关紧要的userId的密钥
		cookie: { path: "/", httpOnly: true, maxAge: 24 * 60 * 60 * 1000 },
		store: new RedisStore({ client: redisClient }),
	})
);

// 处理静态网页
app.use(express.static(path.join(__dirname, "public")));

// 注册处理路由模块
app.use("/api/user", usersRouter);

// 处理错误
app.use(function (req, res, next) {
	next(createError(404));
});
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render("error");
});

module.exports = app;
```

---

### 日志记录

### app.js：

使用 fs 模块：fs.createWriteStream() 方法创建日志流

安装 morgan 库：在 app.use()中间件使用，写入日志

- morgan 库 npm 文档：[morgan - npm (npmjs.com)](https://www.npmjs.com/package/morgan)

```js
// 导入了一些第三方的模块
const createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const path = require("path");
const fs = require("fs");
const session = require("express-session");
const RedisStore = require("connect-redis")(session);
const redisClient = require("./db/redis");

require("./db/sync"); // 初始化数据库表
// 导入了处理路由的模块
const usersRouter = require("./routes/user");

// 创建了服务端实例对象
const app = express();

// 处理动态网页
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

/*
在express中我们可以通过morgan来记录日志
我们只需要安装morgan, 导入morgan, 注册morgan的中间件即可
在注册morgan中间件的时候需要指定日志的模式, 不同的模式记录的内容也不同
默认情况下morgan会将日志输出到控制台中, 当然我们也可以通过配置让它把日志写入到文件中
* */
// create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(
	path.join(__dirname, "log/access.log"),
	{ flags: "a" }
);
app.use(
	logger("combined", {
		stream: accessLogStream,
	})
);

// 处理post请求参数
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// 解析cookie
app.use(cookieParser());
// 保存登录状态
app.use(
	session({
		name: "userId",
		secret: "COM.it6666.*?", // 用于生成无关紧要的userId的密钥
		cookie: { path: "/", httpOnly: true, maxAge: 24 * 60 * 60 * 1000 },
		store: new RedisStore({ client: redisClient }),
	})
);

// 处理静态网页
app.use(express.static(path.join(__dirname, "public")));

// 注册处理路由模块
app.use("/api/user", usersRouter);

// 处理错误
app.use(function (req, res, next) {
	next(createError(404));
});
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render("error");
});

module.exports = app;
```

## 静态资源库

可以使用 express.static 中间件来设置静态文件路径。例如，如果你将图片， CSS, JavaScript 文件放在 public 目录下，你可以这么写：

app.use(express.static('public'))

- public/index.html

- public/images

- public/images/bg.jpeg

- public/css

如果要使用多个静态资源目录，请多次调用 express.static 中间件函数：

- app.use(express.static('public'))

- app.use(express.static('files'))

Express 在静态目录查找文件，因此，存放静态文件的目录名不会出现在 URL 中。但可以给静态目录添加一个路由：

- app.use('/static', express.static(path.join(__dirname, 'public')))
  - 设置/static为/public目录的路由

- 访问
  - http://localhost:80/static/css http://localhost:80/static/css/index.css http://localhost:80/static/image http://localhost:80/static/images/bg.jpeg http://localhost:80/static/index.html

为了安全，最好使用绝对路由：

- app.use('/static', express.static(path.join(__dirname, 'public')))

- 运行：node server.js

## 跨域

### CORS跨域

CORS响应头部

- Access-Control-Allow-Origin

- Access-Control-Allow-Headers

- Access-Control-Allow-Methods

CORS请求的分类

- 简单请求

  - 同时满足以下两大条件，就属于简单请求：

  - 1.请求方式：GET、POST、HEAD 三者之一

  - 2.HTTP头部信息不超过以下几种字段： 无自定义头部字段、Accept、Accept-Language、Content-Language、DPR、Downlink、Save-Data、Viewport-Width、Width、Content-Type(只有三个值 application/x-www-form-urlencoded、multipart/from-data、text/plain)

预检请求

- 只要符合以下任何一个条件的请求，都需要进行预检请求

- 1.请求方式：GET、POST、HEAD 之外的请求 Method 类型

- 2.请求头中包含自定义头部字段

- 3.向服务器发送了 application/json 格式的数据

- 在浏览器与服务器正式通信之前，浏览器会先发送 OPTION 请求进行预检，以获知服务器是否允许该实际请求，所以这一次的 OPTION 请求称为 “预检请求” 。 服务器成功响应预检请求后，才会发送真正的请求，并且携带真实数据

简单请求和预检请求的区别

- 简单请求的特点：客户端与服务器之间只会发生一次请求

- 预检请求的特点：客户端与服务器之间会发生两次请求，OPTION 预检请求成功之后，才会发起真正的请求

### JSONP跨域

- 概念和特点

## jwt身份验证

1.安装

```bash
npm i jsonwebtoken express-jwt
```

- jsonwebtoken
  - 用于生成JWT字符串

- express-jwt
  - 用于将 JWT 字符串解析还原成 JSON 对象

2.导入

```js
const jwt = require('jsonwebtoken') 
const expressJWT = require('express-jwt')
```

3.定义secret密钥

```js
const secretKey = 'nianan No1 q_q'
```

4.使用

```js
res.send({
  status: 200,
  message: '登录成功',
  token: jwt.sign({ username:userinfo.username }, secretKey, { expiresIn: '30s' })
})


jwt.sign({ username:userinfo.username }, secretKey, { expiresIn: '30s' })


jwt.sign()
```

jwt.sign()

- 生成 JWT 字符串。并通过 token 属性 发送给客户端

- 参数

  - 参数1：用户的信息对象

  - 参数2：加密的密匙

  - 参数3：配置的对象

5.将 客户端发送过来的 JWT 字符串 解密 解析还原为 JSON 对象

```js
app.use(expressJWT({ secret: secretKey }).unless({ path: [/^\/api\//] }))
```

6.使用req.use 获取用户信息

```js
req.send({  status: 200,  message: '获取用户信息成功',  data: req.use })
```

7.捕获 JWT 解析失败的错误

Express 错误中间件

```js
app.use( (err,req,res,next) => {
  if(err.name === 'admin') {
    return res.send({ status:401,message: '无效的token' })
  }
  // 其他原因导致的错误
  res.send({ status: 500, message: '未知错误' })
})
```



## 身份认证 express-session

1.安装

```bash
npm i express-session
```

2.导入

```bash
const session = require('express-session')
```

3.配置

```js
const express = require('express') 
const app = express() 
const session = require('express-session') 
// 配置挂载 
app.use(session({    
        secret: 'ddssaasd', // 可以为任意字符串    
         resave: false, // 固定写法    
         saveUninitialized: true // 固定写法 
})
```



4.接口里使用

```js
// 将用户的信息存储到Session中 
req.session.user = req.body 
// 设置用户的登录状态 
req.session.islogin = true
```



5.从 session 中取出数据

```js
req.session.user.username
```



6.清空当前用户session数据

```js
req.session.destroy()
```

## 使用 Express 写接口

### 1.创建API路由模块

apiRouter.js

```js
const express = require('express')
const router = express.Router()
// 挂载对应的路由

module.exports = router
```



### 2.导入并注册路由模块

diaoyong.js

```js
const express = require('express')
const app = express()
// 导入调用路由模块
const router = require('./apiRouter')
// 把路由模块，注册到 app 上
app.use('/api',router)
```



### 3.编写 GET 接口

apiRouter.js

```js
// 挂载对应的路由  '/get' ： 路由地址
router.get('/get',(req,res)=>{
  // 通过req.query 获取客户端通过查询字符串，发送到服务器的数据
  const query = req.query
  // 向客户端响应处理的 结果
  res.send({
    // 200 成功处理，其他失败
    status:200,
    // 响应的消息描述
    msg:'GET请求成功！',
    // 需要响应给客户端的数据
    data: query 
  })
})
```

get方法请求地址为：http://localhost/api/get

### 4.编写 POST 接口

apiRouter.js

```js
// 挂载对应的路由  '/post' ： 路由地址
router.post('/post',(req,res)=>{
  // 通过req.query 获取客户端通过查询字符串，发送到服务器的数据
  const query = req.query
  // 向客户端响应处理的 结果
  res.send({
    // 200 成功处理，其他失败
    status:200,
    // 响应的消息描述
    msg:'GET请求成功！',
    // 需要响应给客户端的数据
    data: query 
  })
})
```

POST请求地址为：http://localhost/api/get

### 5.使用 cors 中间件解决跨域问题

1.运行 npm i cors 命令 

- 安装中间件

2.项目中使用 const cors = require('cors')

- 导入中间件

3.在使用路由前 调用 app.use(cors())

- 配置中间件

### 6.安装mysql模块操作连接操作



## 接口接收解析插件

### multer

- 上传的文件数据 解析插件
  - https://www.expressjs.com.cn/resources/middleware/multer.html

- 解析 `multipart/form-data` 格式的表单数据

### body-parser 或者 express.urlencoded()

- 表单提交的x-www-from-urlencoded数据
  - https://www.expressjs.com.cn/resources/middleware/body-parser.html

- 解析 application/x-www-from-urlencoded 格式 表单数据

## 模板引擎之EJS

EJS 是一套简单的模板语言，帮你利用普通的 JavaScript 代码生成 HTML 页面

1.下载Ejs

```bash
npm install ejs --save
```

2.同目录下新建myejs.js

```js
const express= require('express');
const app = express();
// 设置模板文件的目录,并且新建一个viwes的目录
app.set('views', './views');
// 注册模板引擎
app.set('view engine', 'ejs');
// 使用res.render()来渲染一个视图并将呈现的HTML字符串发送给客户端；
app.get('/', function(req, res,) {
    res.render('index', { title: '测试' });
});
// 监听8083端口
app.listen(8083, ()=>{
    console.log('Server is running at http://localhost:8083')
})
```

3.在新建views目录中新建index.ejs

```js
<%= title %>
```

4.运行：node myejs.js
