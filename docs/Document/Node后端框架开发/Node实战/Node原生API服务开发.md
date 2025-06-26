# Node 原生 API 服务开发

完整项目 GitHub 地址：[muyaCode/node-server: 纯 JavaScript 实现 Node 的 Web 服务器接口 练习 (github.com)](https://github.com/muyaCode/node-server)

## 项目目录说明

```bash
bin - 服务端配置目录
config - 环境变量配置目录
controller - 控制器目录 - 处理路由请求参数数据
db - 数据库连接配置
log - 日志打印
model - 模块目录 - 请求成功或者失败模块...
public - 静态资源文件目录
router - 路由方法目录
service - 服务方法目录 - 数据库的数据的增删改查操作
utils - 工具函数目录
validator - 校验方法目录
app.js - 服务端业务逻辑的核心文件-处理各种请求
```

## 服务端配置文件：bin/www

www 文件可以带后缀.js，也可以不带

```js
/*服务端配置文件*/
/*在这个文件中提供一个最简单的服务端服务即可*/
const http = require("http");
const serverHandle = require("../app");
const PORT = 3000;
const server = http.createServer();
server.on("request", serverHandle);
server.listen(PORT);
```

## 服务端业务逻辑的核心文件：app.js

```js
/*服务端业务逻辑的核心文件*/
/*处理各种请求*/
const queryString = require("querystring");
const goodsRouterHandle = require("./router/goods");
const userRouterHandle = require("./router/user");

// 初始化参数
const initParams = (req) => {
	// 准备 请求方式 / 请求路径 / 请求参数
	// 1.处理请求方式
	req.method = req.method.toLowerCase();
	// 2.处理请求路径
	req.path = req.url.split("?")[0];
	// 3.处理请求参数
	return new Promise((resolve, reject) => {
		if (req.method === "get") {
			let params = req.url.split("?")[1];
			req.query = queryString.parse(params);
			resolve();
		} else if (req.method === "post") {
			let params = "";
			req.on("data", (chunk) => {
				params += chunk;
			});
			req.on("end", () => {
				req.body = queryString.parse(params);
				resolve();
			});
		}
	});
};
// 请求返回的数据处理
const serverHandle = (req, res) => {
	res.writeHead(200, {
		"Content-Type": "application/json; charset=utf-8;",
	});
	// 1.准备各种请求参数
	initParams(req).then(() => {
		// 2.处理各种路由
		let goodsData = goodsRouterHandle(req, res);
		if (goodsData) {
			res.end(JSON.stringify(goodsData));
			return;
		}
		// 返回的数据
		let userData = userRouterHandle(req, res);
		if (userData) {
			res.end(JSON.stringify(userData));
			return;
		}
		// 404错误处理
		res.writeHead(404, {
			"Content-Type": "text/plain; charset=utf-8;",
		});
		res.end("404 Not Found");
	});
};
module.exports = serverHandle;
```

## 基于上面写完的代码，启动项目

```bash
nodemon bin/www
```

## 路由接口方法配置：router

### 先定义全部接口的路由地址常量，文件：router/routerConst.js

```js
const GOODS_LIST = "/api/goods/list";
const GOODS_DETAIL = "/api/goods/detail";
const GOODS_EDIT = "/api/goods/edit";
const GOODS_NEW = "/api/goods/new";

const USER_LOGIN = "/api/user/login";
const USER_REGISTER = "/api/user/register";
const USER_INFO = "/api/user/info";

module.exports = {
	GOODS_LIST,
	GOODS_DETAIL,
	GOODS_EDIT,
	GOODS_NEW,
	USER_LOGIN,
	USER_REGISTER,
	USER_INFO,
};
/*
各种路由地址
操作商品接口
/api/goods/list
/api/goods/detail
/api/goods/edit
/api/goods/new
操作用户接口
/api/user/login
/api/user/register
/api/user/info
... ...
**/
```

### 编写路由接口：router/user.js

```js
const { USER_LOGIN, USER_REGISTER, USER_INFO } = require("./routerConst");
const { SuccessModel, ErrorModel } = require("../model/ResultModel"); // 响应成功或者失败返回处理模块

const userRouterHandle = (req, res) => {
	if (req.method === "post" && req.path === USER_LOGIN) {
		// 处理登录
		// return {
		//     code: 200,
		//     msg: '登录成功'
		// }
		return new SuccessModel("登录成功", { name: "lnj", age: 33 });
	} else if (req.method === "post" && req.path === USER_REGISTER) {
		// 处理注册
		// return {
		//     code: 200,
		//     msg: '注册成功'
		// }
		return new ErrorModel("注册失败", {});
	} else if (req.method === "get" && req.path === USER_INFO) {
		// 处理获取用户信息
		// return {
		//     code: 200,
		//     msg: '获取用户信息成功',
		//     data: {
		//         name:'lnj',
		//         age: 33
		//     }
		// }
		return new SuccessModel("获取用户信息成功", { name: "lnj", age: 33 });
	}
};

module.exports = userRouterHandle;
```

### 编写路由接口：router/goods.js

```js
const {
	GOODS_LIST,
	GOODS_DETAIL,
	GOODS_EDIT,
	GOODS_NEW,
} = require("./routerConst");

const goodsRouterHandle = (req, res) => {
	if (req.method === "get" && req.path === GOODS_LIST) {
		// 处理商品列表
	} else if (req.method === "get" && req.path === GOODS_DETAIL) {
		// 处理商品详情
	} else if (req.method === "get" && req.path === GOODS_EDIT) {
		// 处理编辑商品
	} else if (req.method === "post" && req.path === GOODS_NEW) {
		// 处理新建商品
	}
};
module.exports = goodsRouterHandle;
```

### 响应成功或者失败返回处理模块：model/ResultModel.js

```js
class BaseModel {
	constructor(msg, data) {
		this.msg = msg;
		this.data = data;
	}
}
class SuccessModel extends BaseModel {
	constructor(msg, data) {
		super(msg, data);
		this.code = 200;
	}
}
class ErrorModel extends BaseModel {
	constructor(msg, data) {
		super(msg, data);
		this.code = -1;
	}
}
module.exports = {
	SuccessModel,
	ErrorModel,
};
```

## cross-env 环境变量库的使用

**根据 npm 地址文档安装**：[cross-env - npm (npmjs.com)](https://www.npmjs.com/package/cross-env)

### 配置-结合项目：package.json 配置

```js
"scripts": {
  "dev": "cross-env NODE_ENV=dev nodemon bin/www",
  "build": "cross-env NODE_ENV=pro nodemon bin/www"
},
```

### 环境变量在项目内的打印使用

```js
console.log(process.env.NODE_ENV);
```

## 数据库的封装

### 1.安装 mysql 库

安装 mysql：[mysql - npm (npmjs.com)](https://www.npmjs.com/package/mysql)

```bash
npm install mysql
```

### 2.数据库根据环境变量-配置：config/db.js

```js
let MYSQL_CONFIG;
let REDIS_CONFIG;

if (process.env.NODE_ENV === "dev") {
	MYSQL_CONFIG = {
		host: "127.0.0.1",
		port: "3306",
		user: "root",
		password: "root",
		database: "demo",
	};
	REDIS_CONFIG = {
		host: "127.0.0.1",
		port: "6379",
	};
} else if (process.env.NODE_ENV === "pro") {
	MYSQL_CONFIG = {
		host: "127.0.0.1",
		port: "3306",
		user: "root",
		password: "root",
		database: "demo",
	};
	REDIS_CONFIG = {
		host: "127.0.0.1",
		port: "6379",
	};
}
module.exports = {
	MYSQL_CONFIG,
	REDIS_CONFIG,
};
```

### 3.配置 mysql 数据库连接，文件：db/mysql.js

```js
// 1.导入mysql驱动
const mysql = require("db/mysql");
const { MYSQL_CONFIG } = require("../config/db");
// 2.创建连接对象
const connection = mysql.createConnection(MYSQL_CONFIG);
// 3.连接MySQL数据库
connection.connect();

// 4.操作MySQL数据库方法
const exc = (sql) => {
	return new Promise((resolve, reject) => {
		connection.query(sql, function (error, results) {
			if (error) {
				reject(error);
			} else {
				resolve(results);
			}
		});
	});
};

module.exports = {
	exc,
	escape: mysql.escape,
};
```

### 4.使用数据库：router/user.js

```js
const { USER_LOGIN, USER_REGISTER, USER_INFO } = require("./routerConst");
const { SuccessModel, ErrorModel } = require("../model/ResultModel");
const exc = require("../db/mysql");

const userRouterHandle = (req, res) => {
	if (req.method === "post" && req.path === USER_LOGIN) {
		// 处理登录
		return new SuccessModel("登录成功", { name: "lnj", age: 33 });
	} else if (req.method === "post" && req.path === USER_REGISTER) {
		let sql = `insert into user (username, password) values ('lnj', 123456)`;
		exc(sql)
			.then((results) => {
				console.log(results);
			})
			.catch((err) => {
				console.log(err);
			});
		// 处理注册
		return new ErrorModel("注册失败", {});
	} else if (req.method === "get" && req.path === USER_INFO) {
		// 处理获取用户信息
		return new SuccessModel("获取用户信息成功", { name: "lnj", age: 33 });
	}
};

module.exports = userRouterHandle;
```

## 展示静态页面

### 在 app.js 中，封装并导出处理方法

```js
/**
 * 封装返回数据方法
 * @param res  响应对象
 * @param data 返回的数据
 */
const setEnd = (res, data) => {
	res.writeHead(200, {
		"Content-Type": "application/json; charset=utf-8;",
	});
	res.end(JSON.stringify(data));
};

// 处理各种请求
const serverHandle = async (req, res) => {
	writeLog(`${req.method}--${req.url}--${req.headers["user-agent"]}`);

	/** 展示静态页面 */
	// 0.准备cookie和session
	await initCookieSession(req, res);
	// 1.返回静态网页
	await staticServer.readFile(req, res, rootPath);
	// 2.处理API请求
	res.setEnd = setEnd;

	// 1.准备各种请求参数
	initParams(req, res).then(async () => {
		// 2.处理各种路由
		// 2.1处理商品相关路由
		let goodsData = goodsRouterHandle(req, res);
		if (goodsData) {
			res.setEnd(res, goodsData);
			return;
		}
		// 2.2处理用户相关路由
		let userData = await userRouterHandle(req, res);
		if (userData) {
			res.setEnd(res, userData);
			return;
		}
		// 2.3没有匹配到任何路由
		res.writeHead(404, {
			"Content-Type": "text/plain; charset=utf-8;",
		});
		res.end("404 Not Found");
	});
};
module.exports = serverHandle;
```

### 新建静态页面

html 文件 1：public\login.html

html 文件 2：public\register.html

### 文件：utils/staticServer.js 配置

```js
const path = require("path");
const fs = require("fs");
const mime = require("./mime");
/**
 * 读取静态资源
 * @param req  请求对象
 * @param res  响应对象
 * @param rootPath 静态资源所在的目录
 */
function readFile(req, res, rootPath) {
	// 1.获取静态资源地址
	// http://127.0.0.1:3000/login.html?name=lnj&pwd=123456;
	let fileName = req.url.split("?")[0];
	let filePath = path.join(rootPath, fileName); // 前面需要导入path模块
	// 2.判断静态资源是否存在
	let isExists = fs.existsSync(filePath);
	if (!isExists) {
		return;
	}
	// 3.获取静态资源的后缀名
	let fileExt = path.extname(filePath);
	// 4.根据文件的后缀获取对应的类型
	let type = mime[fileExt];
	// 5.对文本类型进行特殊处理
	if (type.startsWith("text")) {
		type += "; charset=utf-8;";
	}
	// 5.告诉客户端返回数据的类型
	res.writeHead(200, {
		"Content-Type": type,
	});
	// 6.加载静态资源并返回静态资源
	return new Promise((resolve, reject) => {
		fs.readFile(filePath, (err, content) => {
			if (err) {
				res.end("Server Error");
				reject(err);
			} else {
				res.end(content);
				resolve();
			}
		});
	});
}
module.exports = {
	readFile,
};
```

## 后端接收的请求数据校验

**安装 ajv 库**：[ajv - npm (npmjs.com)](https://www.npmjs.com/package/ajv)

---

### 1.安装 ajv 库

```bash
npm install ajv
```

### 2.在路由中使用：controllers 控制器目录-处理路由请求参数数据

#### controller/userController.js

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

#### 数据校验方法：validator/userValidat.js

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

#### 数据库增删改查服务方法：service/userService.js

```js
// const {exc, escape} = require('../db/mysql');
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

#### 数据库模块操作的封装：db/model/user.js

```js
const Sequelize = require("sequelize");
const seq = require("../seq");

/*
第一个参数: 用于指定表的名称
第二个参数: 用于指定表中有哪些字段
第三个参数: 用于配置表的一些额外信息
* */
/*
注意点:
1.sequelize在根据模型创建表的时候, 会自动将我们指定的表的名称变成复数
2.sequelize在根据模型创建表的时候, 会自动增加两个字段 createAt/updateAt
* */
let User = seq.define(
	"user",
	{
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		username: {
			type: Sequelize.STRING, // varchar(255)
			allowNull: false,
			unique: true,
		},
		password: {
			type: Sequelize.STRING, // varchar(255)
			allowNull: false,
			unique: false,
		},
		gender: {
			type: Sequelize.ENUM(["男", "女", "妖"]),
			defaultValue: "妖",
		},
	},
	{
		freezeTableName: true, // 告诉sequelize不需要自动将表名变成复数
		timestamps: true, // 不需要自动创建createAt/updateAt这两个字段
	}
);

module.exports = User;
```

#### 用户请求错误返回配置：config\errorConst.js

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

#### 最终在路由 router/user.js 导入 userController 模块方法并使用

```js
const { USER_LOGIN, USER_REGISTER, USER_INFO } = require("./routerConst");
const { registerUser, loginCheck } = require("../controller/userController");
const { redisSet } = require("../db/redis"); // redis数据库操作

const userRouterHandle = async (req, res) => {
	if (req.method === "post" && req.path === USER_LOGIN) {
		// 处理登录
		let result = await loginCheck(req.body);
		// Redis存储登录状态
		if (result.code === 200) {
			req.session.username = result.data.username;
			req.session.password = result.data.password;
			req.session.gender = result.data.gender;
			// 同步到Redis中
			redisSet(req.userId, req.session);
		}
		return result;
	} else if (req.method === "post" && req.path === USER_REGISTER) {
		// 注册用户
		// 注册用户
		let result = await registerUser(req.body);
		// 返回注册结果
		return result;
	} else if (req.method === "get" && req.path === USER_INFO) {
	}
};

module.exports = userRouterHandle;
```

## 原生 Node 全局变量来存储用户登录后生成的 cookies

### 用户前端登录后，安全的设置存储 cookies：router/user.js

```js
const { USER_LOGIN, USER_REGISTER, USER_INFO } = require("./routerConst");
const { registerUser, loginCheck } = require("../controller/userController");
const generatePwd = require("../utils/crypto");

// Cookie过期时间设置
const getCookieExpires = () => {
	let date = new Date();
	date.setTime(date.getTime() + 24 * 60 * 60 * 1000);
	return date.toGMTString();
};
const userRouterHandle = async (req, res) => {
	if (req.method === "post" && req.path === USER_LOGIN) {
		// 处理登录
		let result = await loginCheck(req.body);
		// 保存登录状态
		if (result.code === 200) {
			/*
            注意点1: 由于Cookie既可以在服务端修改, 又可以在客户端修改, 所以存在安全隐患
                    所以我们在服务端设置Cookie的时候, 可以通过httpOnly来指定只能在服务端修改
                    不能在客户端修改
            注意点2: 虽然我们通过服务端保存了登录状态, 但是并没有给登录状态设置过期时间,
                    所以还是存在安全隐患, 所以我们在保存登录状态的时候, 还需要设置过期时间
            注意点3: 在客户端保存用户的用户名明文其实也是不安全的, 所以在在保存登录状态的时候
                    应该md5加密之后再保存
            * */
			res.setHeader(
				"Set-Cookie",
				`username=${generatePwd(
					req.body.username
				)}; path=/; httpOnly; expires=${getCookieExpires()}`
			);
		}
		return result;
	} else if (req.method === "post" && req.path === USER_REGISTER) {
		// 注册用户
		let result = await registerUser(req.body);
		// 返回注册结果
		return result;
	} else if (req.method === "get" && req.path === USER_INFO) {
	}
};

module.exports = userRouterHandle;
```

### 在 app.js 中处理 cookies

```js
/*服务端业务逻辑的核心文件*/
/*处理各种请求*/
const queryString = require("querystring");
const goodsRouterHandle = require("./router/goods");
const userRouterHandle = require("./router/user");
const staticServer = require("./utils/staticServer");
const path = require("path");
const rootPath = path.join(__dirname, "public");
// 定义变量作为session的容器
const SESSION_CONTAINER = {};
/**
 * 生成Cookie过期时间
 * @returns {*}
 */
const getCookieExpires = () => {
	let date = new Date();
	date.setTime(date.getTime() + 24 * 60 * 60 * 1000);
	return date.toGMTString();
};
// 准备各种请求参数
const initParams = (req, res) => {
	// 准备 请求方式 / 请求路径 / 请求参数
	// 1.处理请求方式
	req.method = req.method.toLowerCase();
	// 2.处理请求路径
	req.path = req.url.split("?")[0];
	// 5.处理请求参数
	return new Promise((resolve, reject) => {
		if (req.method === "get") {
			let params = req.url.split("?")[1];
			req.query = queryString.parse(params);
			resolve();
		} else if (req.method === "post") {
			let params = "";
			req.on("data", (chunk) => {
				params += chunk;
			});
			req.on("end", () => {
				console.log(params);
				req.body = queryString.parse(params);
				resolve();
			});
		}
	});
};
const initCookieSession = (req, res) => {
	// 1.处理Cookie
	req.cookie = {};
	if (req.headers.cookie) {
		req.headers.cookie.split(";").forEach((item) => {
			let keyValue = item.split("=");
			req.cookie[keyValue[0]] = keyValue[1];
		});
	}
	// 2.获取用户的唯一标识
	req.userId = req.cookie.userId;
	if (!req.userId) {
		req.userId = `${Date.now()}_${Math.random()}_it666`;
		// 给当前用户分配容器
		SESSION_CONTAINER[req.userId] = {};
		res.setHeader(
			"Set-Cookie",
			`userId=${req.userId}; path=/; httpOnly; expires=${getCookieExpires()}`
		);
	}
	if (!SESSION_CONTAINER[req.userId]) {
		// 给当前用户分配容器
		SESSION_CONTAINER[req.userId] = {};
	}
	req.session = SESSION_CONTAINER[req.userId];
	console.log(req.session);
};
/**
 * 封装返回数据方法
 * @param res  响应对象
 * @param data 返回的数据
 */
const setEnd = (res, data) => {
	res.writeHead(200, {
		"Content-Type": "application/json; charset=utf-8;",
	});
	res.end(JSON.stringify(data));
};
// 处理各种请求
const serverHandle = async (req, res) => {
	// 0.准备cookie和session
	initCookieSession(req, res);
	// 1.返回静态网页
	await staticServer.readFile(req, res, rootPath);
	// 2.处理API请求
	res.setEnd = setEnd;
	// 1.准备各种请求参数
	initParams(req, res).then(async () => {
		// 2.处理各种路由
		// 2.1处理商品相关路由
		let goodsData = goodsRouterHandle(req, res);
		if (goodsData) {
			res.setEnd(res, goodsData);
			return;
		}
		// 2.2处理用户相关路由
		let userData = await userRouterHandle(req, res);
		if (userData) {
			res.setEnd(res, userData);
			return;
		}
		// 2.3没有匹配到任何路由
		res.writeHead(404, {
			"Content-Type": "text/plain; charset=utf-8;",
		});
		res.end("404 Not Found");
	});
};
module.exports = serverHandle;
```

## Redis 数据库的使用：用来存储用户登录后生成的 Session

Redis 的 npm 文档：[redis - npm (npmjs.com)](https://www.npmjs.com/package/redis)

### 1.安装

```bash
npm install redis
```

### 2.连接 Redis 数据库：config/db.js

```js
let MYSQL_CONFIG;
let REDIS_CONFIG;

if (process.env.NODE_ENV === "dev") {
	// MYSQL_CONFIG = {
	//     host     : '127.0.0.1',
	//     port     : '3306',
	//     user     : 'root',
	//     password : 'root',
	//     database : 'demo'
	// }
	MYSQL_CONFIG = {
		databaseName: "demo",
		databaseUserName: "root",
		databasePassword: "root",
		conf: {
			host: "127.0.0.1", // MySQL服务器地址
			port: 3306, // MySQL服务器端口号
			dialect: "mysql", // 告诉Sequelize当前要操作的数据库类型
			pool: {
				max: 5, // 最多有多少个连接
				min: 0, // 最少有多少个连接
				idle: 10000, // 当前连接多久没有操作就断开
				acquire: 30000, // 多久没有获取到连接就断开
			},
		},
	};
	// redis数据库连接
	REDIS_CONFIG = {
		host: "127.0.0.1",
		port: "6379",
	};
} else if (process.env.NODE_ENV === "pro") {
	// MYSQL_CONFIG = {
	//     host     : '127.0.0.1',
	//     port     : '3306',
	//     user     : 'root',
	//     password : 'root',
	//     database : 'demo'
	// }
	MYSQL_CONFIG = {
		databaseName: "demo",
		databaseUserName: "root",
		databasePassword: "root",
		conf: {
			host: "127.0.0.1", // MySQL服务器地址
			port: 3306, // MySQL服务器端口号
			dialect: "mysql", // 告诉Sequelize当前要操作的数据库类型
			pool: {
				max: 5, // 最多有多少个连接
				min: 0, // 最少有多少个连接
				idle: 10000, // 当前连接多久没有操作就断开
				acquire: 30000, // 多久没有获取到连接就断开
			},
		},
	};
	// redis数据库连接
	REDIS_CONFIG = {
		host: "127.0.0.1",
		port: "6379",
	};
}
module.exports = {
	MYSQL_CONFIG,
	REDIS_CONFIG,
};
```

### 3.封装 Redis 数据库方法：db/redis.js

```js
// 1.导入Redis模块
const redis = require("redis");
const { REDIS_CONFIG } = require("../config/db");

// 2.建立Redis连接
const client = redis.createClient(REDIS_CONFIG.port, REDIS_CONFIG.host);
client.on("error", function (error) {
	console.error(error);
});

// 3.封装保存数据和获取数据的方法
function redisSet(key, value) {
	if (typeof value === "object") {
		value = JSON.stringify(value);
	}
	client.set(key, value, redis.print);
}
function redisGet(key) {
	return new Promise((resolve, reject) => {
		client.get(key, (err, value) => {
			if (err) {
				reject(err);
			}
			try {
				resolve(JSON.parse(value));
			} catch (e) {
				resolve(value);
			}
		});
	});
}

module.exports = {
	redisSet,
	redisGet,
};
```

### 4.使用 Redis 数据库来存储用户登录后生成的 Session

#### app.js：封装请求时候的 Session 判断

```js
/*服务端业务逻辑的核心文件*/
/*处理各种请求*/
const queryString = require("querystring");
const goodsRouterHandle = require("./router/goods");
const userRouterHandle = require("./router/user");
const staticServer = require("./utils/staticServer");
const path = require("path");
const rootPath = path.join(__dirname, "public");
const { redisGet } = require("./db/redis");

// 定义变量作为session的容器
// const SESSION_CONTAINER = {};
/**
 * 生成Cookie过期时间
 * @returns {*}
 */
const getCookieExpires = () => {
	let date = new Date();
	date.setTime(date.getTime() + 24 * 60 * 60 * 1000);
	return date.toGMTString();
};
/**
 * 准备各种请求参数
 * @param req 请求对象
 * @param res 响应对象
 * @returns {Promise<any>}
 */
const initParams = (req, res) => {
	// 准备 请求方式 / 请求路径 / 请求参数
	// 1.处理请求方式
	req.method = req.method.toLowerCase();
	// 2.处理请求路径
	req.path = req.url.split("?")[0];
	// 5.处理请求参数
	return new Promise((resolve, reject) => {
		if (req.method === "get") {
			let params = req.url.split("?")[1];
			req.query = queryString.parse(params);
			resolve();
		} else if (req.method === "post") {
			let params = "";
			req.on("data", (chunk) => {
				params += chunk;
			});
			req.on("end", () => {
				console.log(params);
				req.body = queryString.parse(params);
				resolve();
			});
		}
	});
};
/**
 * 初始化Cookie和Session
 * @param req 请求对象
 * @param res 响应对象
 */
const initCookieSession = async (req, res) => {
	// 1.处理Cookie
	req.cookie = {};
	if (req.headers.cookie) {
		req.headers.cookie.split(";").forEach((item) => {
			let keyValue = item.split("=");
			req.cookie[keyValue[0]] = keyValue[1];
		});
	}
	// 2.获取用户的唯一标识
	req.userId = req.cookie.userId;
	if (!req.userId) {
		req.userId = `${Date.now()}_${Math.random()}_it666`;
		// 给当前用户分配容器
		// SESSION_CONTAINER[req.userId] = {};
		req.session = {};
		res.setHeader(
			"Set-Cookie",
			`userId=${req.userId}; path=/; httpOnly; expires=${getCookieExpires()}`
		);
	}
	// if(!SESSION_CONTAINER[req.userId]){
	//     // 给当前用户分配容器
	//     SESSION_CONTAINER[req.userId] = {};
	// }
	if (!req.session) {
		req.session = (await redisGet(req.userId)) || {};
	}
	console.log(req.session);
	// req.session = SESSION_CONTAINER[req.userId];
};
/**
 * 封装返回数据方法
 * @param res  响应对象
 * @param data 返回的数据
 */
const setEnd = (res, data) => {
	res.writeHead(200, {
		"Content-Type": "application/json; charset=utf-8;",
	});
	res.end(JSON.stringify(data));
};
// 处理各种请求
const serverHandle = async (req, res) => {
	// 0.准备cookie和session
	await initCookieSession(req, res);
	// 1.返回静态网页
	await staticServer.readFile(req, res, rootPath);
	// 2.处理API请求
	res.setEnd = setEnd;
	// 1.准备各种请求参数
	initParams(req, res).then(async () => {
		// 2.处理各种路由
		// 2.1处理商品相关路由
		let goodsData = goodsRouterHandle(req, res);
		if (goodsData) {
			res.setEnd(res, goodsData);
			return;
		}
		// 2.2处理用户相关路由
		let userData = await userRouterHandle(req, res);
		if (userData) {
			res.setEnd(res, userData);
			return;
		}
		// 2.3没有匹配到任何路由
		res.writeHead(404, {
			"Content-Type": "text/plain; charset=utf-8;",
		});
		res.end("404 Not Found");
	});
};
module.exports = serverHandle;
```

#### router/user.js：路由方法中存储 session

```js
const { USER_LOGIN, USER_REGISTER, USER_INFO } = require("./routerConst");
const { registerUser, loginCheck } = require("../controller/userController");
const { redisSet } = require("../db/redis");

const userRouterHandle = async (req, res) => {
	if (req.method === "post" && req.path === USER_LOGIN) {
		// 处理登录
		let result = await loginCheck(req.body);
		// 存储登录状态
		if (result.code === 200) {
			req.session.username = result.data.username;
			req.session.password = result.data.password;
			req.session.gender = result.data.gender;
			// 同步到Redis中
			redisSet(req.userId, req.session);
		}
		return result;
	} else if (req.method === "post" && req.path === USER_REGISTER) {
		// 注册用户
		let result = await registerUser(req.body);
		// 返回注册结果
		return result;
	} else if (req.method === "get" && req.path === USER_INFO) {
	}
};

module.exports = userRouterHandle;
```

## 使用 mysql 库的 SQL 注入的安全问题

登录的时候需要查询是否有这个用户和密码，把查询语句的需要密码条件去掉，就可以不用密码登录

**sql 语句的注释**：'-- '，双横杠+空格：注释掉密码输入的 sql 语句的条件

### 用户登录

在用户登录输入用户名，密码随便打，然后点击登录，这时候密码错误也能登录成功

```js
xxxx用户名'--
```

### 如何预防 SQL 注入

把特殊符号转义成普通字符

#### 文件：db/mysql.js

```js
// 1.导入mysql驱动
const mysql = require("db/mysql");
const { MYSQL_CONFIG } = require("../config/db");
// 2.创建连接对象
const connection = mysql.createConnection(MYSQL_CONFIG);
// 3.连接MySQL数据库
connection.connect();

// 4.操作MySQL数据库方法
const exc = (sql) => {
	return new Promise((resolve, reject) => {
		connection.query(sql, function (error, results) {
			if (error) {
				reject(error);
			} else {
				resolve(results);
			}
		});
	});
};

module.exports = {
	exc,
	// 把登录用户名的特殊符号转义成普通字符：预防SQL注入
	escape: mysql.escape,
};
```

#### 使用预防 SQL 注入的方法 escape：service/userService.js

```js
const { exc, escape } = require("../db/mysql");

/**
 * 根据用户名获取用户信息你
 * @param username 被获取的用户名
 * @returns {Promise<*>}
 */
async function getUser(username, password) {
	// 使用预防SQL注入的方法：原理把特殊符号转义成普通字符，预防'-- 'sql语句查询的注释
	username = escape(username);
	password = escape(password);
	if (password) {
		let sql = `select * from user where username = ${username} and password = ${password}`;
		console.log(sql);
		let results = await exc(sql);
		return results;
	} else {
		let sql = `select * from user where username = '${username}'`;
		let results = await exc(sql);
		return results;
	}
}
async function createUser({ username, password, gender }) {
	let sql = `insert into user (username, password, gender) values('${username}','${password}','${gender}');`;
	let results = await exc(sql);
	return results;
}
module.exports = {
	getUser,
	createUser,
};
```

## sequelize 库替换 mysql 库 - 来操作 mysql 数据库

Sequelize 是一个基于 promise 的 Node.js [ORM](https://en.wikipedia.org/wiki/Object-relational_mapping), 目前支持  [Postgres](https://en.wikipedia.org/wiki/PostgreSQL), [MySQL](https://en.wikipedia.org/wiki/MySQL), [MariaDB](https://en.wikipedia.org/wiki/MariaDB), [SQLite](https://en.wikipedia.org/wiki/SQLite)  以及  [Microsoft SQL Server](https://en.wikipedia.org/wiki/Microsoft_SQL_Server). 它具有强大的事务支持, 关联关系, 预读和延迟加载,读取复制等功能。

orm 封装好了 sql 语句，不用再 sql 语句

### 1.安装 sequelize 和 mysql2

Sequelize 的 npm 文档：[sequelize - npm (npmjs.com)](https://www.npmjs.com/package/sequelize)

sequelize 官网：[Sequelize | Feature-rich ORM for modern TypeScript & JavaScript](https://sequelize.org/)

sequelize 中文网：[Sequelize 简介 | Sequelize 中文文档 | Sequelize 中文网](https://www.sequelize.cn/)

```bash
npm install --save sequelize
```

由于`sequelize`依赖于`mysql2`，所以也需要安装`mysql2`

mysql2 的 npm 文档：[mysql2 - npm (npmjs.com)](https://www.npmjs.com/package/mysql2)

```bash
npm install --save mysql2
```

### 2.sequelize 连接 mysql 数据库：db/seq.js

```js
// 1.导入Sequelize
const Sequelize = require("sequelize");
const { MYSQL_CONFIG } = require("../config/db");

// 2.配置连接信息
/*
第一个参数: 要操作的数据库名称
第二个参数: 数据库用户名
第三个参数: 数据库密码
第四个参数: 其它的配置信息
* */
const seq = new Sequelize(
	MYSQL_CONFIG.databaseName,
	MYSQL_CONFIG.databaseUserName,
	MYSQL_CONFIG.databasePassword,
	MYSQL_CONFIG.conf
);

module.exports = seq;
```

### 3.数据库连接配置：config/db.js

```js
let MYSQL_CONFIG;
let REDIS_CONFIG;

if (process.env.NODE_ENV === "dev") {
	// MYSQL_CONFIG = {
	//     host     : '127.0.0.1',
	//     port     : '3306',
	//     user     : 'root',
	//     password : 'root',
	//     database : 'demo'
	// }

	// sequelize库连接mysql
	MYSQL_CONFIG = {
		databaseName: "demo",
		databaseUserName: "root",
		databasePassword: "root",
		conf: {
			host: "127.0.0.1", // MySQL服务器地址
			port: 3306, // MySQL服务器端口号
			dialect: "mysql", // 告诉Sequelize当前要操作的数据库类型
			pool: {
				max: 5, // 最多有多少个连接
				min: 0, // 最少有多少个连接
				idle: 10000, // 当前连接多久没有操作就断开
				acquire: 30000, // 多久没有获取到连接就断开
			},
		},
	};
	REDIS_CONFIG = {
		host: "127.0.0.1",
		port: "6379",
	};
} else if (process.env.NODE_ENV === "pro") {
	// MYSQL_CONFIG = {
	//     host     : '127.0.0.1',
	//     port     : '3306',
	//     user     : 'root',
	//     password : 'root',
	//     database : 'demo'
	// }

	// sequelize库连接mysql
	MYSQL_CONFIG = {
		databaseName: "demo",
		databaseUserName: "root",
		databasePassword: "root",
		conf: {
			host: "127.0.0.1", // MySQL服务器地址
			port: 3306, // MySQL服务器端口号
			dialect: "mysql", // 告诉Sequelize当前要操作的数据库类型
			pool: {
				max: 5, // 最多有多少个连接
				min: 0, // 最少有多少个连接
				idle: 10000, // 当前连接多久没有操作就断开
				acquire: 30000, // 多久没有获取到连接就断开
			},
		},
	};
	REDIS_CONFIG = {
		host: "127.0.0.1",
		port: "6379",
	};
}
module.exports = {
	MYSQL_CONFIG,
	REDIS_CONFIG,
};
```

### 4.定义用户的数据模型：db/model/user.js

```js
const Sequelize = require("sequelize");
const seq = require("../seq");

/*
第一个参数: 用于指定表的名称
第二个参数: 用于指定表中有哪些字段
第三个参数: 用于配置表的一些额外信息
* */
/*
注意点:
1.sequelize在根据模型创建表的时候, 会自动将我们指定的表的名称变成复数
2.sequelize在根据模型创建表的时候, 会自动增加两个字段 createAt/updateAt
* */
let User = seq.define(
	"user",
	{
		// 创建user表
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		username: {
			type: Sequelize.STRING, // varchar(255)
			allowNull: false,
			unique: true,
		},
		password: {
			type: Sequelize.STRING, // varchar(255)
			allowNull: false,
			unique: false,
		},
		gender: {
			type: Sequelize.ENUM(["男", "女", "妖"]),
			defaultValue: "妖",
		},
	},
	{
		freezeTableName: true, // 告诉sequelize不需要自动将表名变成复数
		timestamps: true, // 不需要自动创建createAt/updateAt这两个字段
	}
);

module.exports = User;
```

### 5.封装数据库模型操作：db/sync.js

```js
const seq = require("./seq");

// 0.导入模型
require("./model/user");

// 1.测试配置是否正确
seq
	.authenticate()
	.then(() => {
		console.log("ok");
	})
	.catch((err) => {
		console.log(err);
	});

// 2.执行同步方法, 创建表
seq.sync().then(() => {
	console.log("sync ok");
});
```

### 6.项目中使用基于 Sequelize 封装的模型来操作数据库

#### 服务文件：service/userService.js

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

## 日志相关

使用 Node 文件操作相关 API

### 1.日志：utils/log.js

```js
const fs = require("fs");
const path = require("path");

function createWriteStream() {
	const fullPath = createDirPath();
	const fullFileName = path.join(fullPath, "access.log");
	const writeStream = fs.createWriteStream(fullFileName);
	return writeStream;
}
function createDirPath() {
	const date = new Date();
	const dirName = `${date.getFullYear()}_${
		date.getMonth() + 1
	}_${date.getDay()}`;
	const fullPath = path.join(__dirname, "../log", dirName);
	// console.log(fullPath);
	if (!fs.existsSync(fullPath)) {
		fs.mkdirSync(fullPath);
	}
	return fullPath;
}
const writeStream = createWriteStream();
function writeLog(log) {
	writeStream.write(log + "\n");
}
module.exports = writeLog;
```

### 2.日志方法在 app.js 中注入日志监控：writeLog 方法

```js
/*服务端业务逻辑的核心文件*/
/*处理各种请求*/
const queryString = require("querystring");
const goodsRouterHandle = require("./router/goods");
const userRouterHandle = require("./router/user");
const staticServer = require("./utils/staticServer");
const path = require("path");
const rootPath = path.join(__dirname, "public");
const { redisGet } = require("./db/redis");
const writeLog = require("./utils/log");

require("./db/sync");
/*
1.什么是日志?
- 日志在企业开发中有着不可或缺的作用，
  它可以用以记录用户操作、系统运行状态和错误信息
  日志记录的好坏直接关系到系统出现问题时定位的速度
- 如果没有日志, 那么就相当于人没有眼睛
  日志可以很好的帮助我们分析用户行为
  日志可以很好的帮助我们排查项目上线之后的一些错误
  ... ...

2.常见日志有哪些?
2.1访问日志
2.2错误日志
2.3安全日志
... ...

3.如何记录日志?
后端开发中有很多现成的框架可以帮助我们很好的记录日志
但今天我们要了解的是如何自己手动实现日志的记录
* */
/**
 * 生成Cookie过期时间
 * @returns {*}
 */
const getCookieExpires = () => {
	let date = new Date();
	date.setTime(date.getTime() + 24 * 60 * 60 * 1000);
	return date.toGMTString();
};
/**
 * 准备各种请求参数
 * @param req 请求对象
 * @param res 响应对象
 * @returns {Promise<any>}
 */
const initParams = (req, res) => {
	// 准备 请求方式 / 请求路径 / 请求参数
	// 1.处理请求方式
	req.method = req.method.toLowerCase();
	// 2.处理请求路径
	req.path = req.url.split("?")[0];
	// 5.处理请求参数
	return new Promise((resolve, reject) => {
		if (req.method === "get") {
			let params = req.url.split("?")[1];
			req.query = queryString.parse(params);
			resolve();
		} else if (req.method === "post") {
			let params = "";
			req.on("data", (chunk) => {
				params += chunk;
			});
			req.on("end", () => {
				console.log(params);
				req.body = queryString.parse(params);
				resolve();
			});
		}
	});
};
/**
 * 初始化Cookie和Session
 * @param req 请求对象
 * @param res 响应对象
 */
const initCookieSession = async (req, res) => {
	// 1.处理Cookie
	req.cookie = {};
	if (req.headers.cookie) {
		req.headers.cookie.split(";").forEach((item) => {
			let keyValue = item.split("=");
			req.cookie[keyValue[0]] = keyValue[1];
		});
	}
	// 2.获取用户的唯一标识
	req.userId = req.cookie.userId;
	if (!req.userId) {
		req.userId = `${Date.now()}_${Math.random()}_it666`;
		// 给当前用户分配容器
		// SESSION_CONTAINER[req.userId] = {};
		req.session = {};
		res.setHeader(
			"Set-Cookie",
			`userId=${req.userId}; path=/; httpOnly; expires=${getCookieExpires()}`
		);
	}
	if (!req.session) {
		req.session = (await redisGet(req.userId)) || {};
	}
	console.log(req.session);
};
/**
 * 封装返回数据方法
 * @param res  响应对象
 * @param data 返回的数据
 */
const setEnd = (res, data) => {
	res.writeHead(200, {
		"Content-Type": "application/json; charset=utf-8;",
	});
	res.end(JSON.stringify(data));
};
// 处理各种请求
const serverHandle = async (req, res) => {
	writeLog(`${req.method}--${req.url}--${req.headers["user-agent"]}`);
	// 0.准备cookie和session
	await initCookieSession(req, res);
	// 1.返回静态网页
	await staticServer.readFile(req, res, rootPath);
	// 2.处理API请求
	res.setEnd = setEnd;
	// 1.准备各种请求参数
	initParams(req, res).then(async () => {
		// 2.处理各种路由
		// 2.1处理商品相关路由
		let goodsData = goodsRouterHandle(req, res);
		if (goodsData) {
			res.setEnd(res, goodsData);
			return;
		}
		// 2.2处理用户相关路由
		let userData = await userRouterHandle(req, res);
		if (userData) {
			res.setEnd(res, userData);
			return;
		}
		// 2.3没有匹配到任何路由
		res.writeHead(404, {
			"Content-Type": "text/plain; charset=utf-8;",
		});
		res.end("404 Not Found");
	});
};
module.exports = serverHandle;
```

### 3.日志分析：读取日志来统计网站访问的次数/浏览器信息等：utils/readline.js

```js
// 读取日志来获取网站访问的次数
const fs = require("fs");
const path = require("path");
const readline = require("readline");

function createReadStream() {
	const fullPath = createDirPath();
	const fullFileName = path.join(fullPath, "access.log");
	const readStream = fs.createReadStream(fullFileName);
	return readStream;
}
function createDirPath() {
	const date = new Date();
	const dirName = `${date.getFullYear()}_${
		date.getMonth() + 1
	}_${date.getDay()}`;
	const fullPath = path.join(__dirname, "../log", dirName);
	// console.log(fullPath);
	if (!fs.existsSync(fullPath)) {
		fs.mkdirSync(fullPath);
	}
	return fullPath;
}
const readStream = createReadStream();
const readObject = readline.createInterface({
	input: readStream,
});
let totalCount = 0;
let chromeCount = 0;
readObject.on("line", (lineData) => {
	if (!lineData) {
		return;
	}
	totalCount++;
	if (lineData.indexOf("Chrome") >= 0) {
		chromeCount++;
	}
});
readObject.on("close", () => {
	console.log(chromeCount / totalCount);
});
```
