# MySQL 数据库的使用

MySQL 参考手册(右边可以选版本)：[MySQL :: MySQL 8.0 Reference Manual](https://dev.mysql.com/doc/refman/8.0/en/)

## Node 连接 MySQL 数据库

### 使用 mysql 库

npm 文档：[MySQL - npm (npmjs.com)](https://www.npmjs.com/package/mysql)

mysql 库入门比较简单，有利于学习 sql 语句

---

参考：[NodeJS 5 分钟 连接 MySQL 增删改查 🥇 - 腾讯云开发者社区-腾讯云 (tencent.com)](https://cloud.tencent.com/developer/article/2086919)

菜鸟教程参考：[Node.js 连接 MySQL | 菜鸟教程 (runoob.com)](https://www.runoob.com/nodejs/nodejs-mysql.html)

---

安装

```bash
npm install mysql
```

#### mysql 库有三种创建连接方式

##### 1.createConnection

使用时需要对连接的创建、断开进行管理

```js
connection.query(
	"SELECT * FROM users WHERE id = ?",
	["123"],
	function (err, rows) {
		if (err) {
			// error
		} else {
			for (let row in rows) {
				processRow(row);
			}
		}
	}
);
```

这种方法较为底层，且每次操作数据库都需要新建数据库连接，若数据库操作需求多，对服务器消耗较大，因此，可以使用第二种连接方式。

##### 2.createPool：建立数据库连接池

创建资源池，使用时不需要对连接的创建、断开进行管理，每次使用完调用一次 release 进行释放连接到资源池，至于连接是否断开交给资源池去管理。每次建立连接时非常消耗资源的，影响性能，因此对连接创建合理的管理，有利于提高性能。

数据库连接池负责分配、管理和释放数据库连接，它允许应用程序重复使用一个现有的数据库连接，而不是重新建立一个；释放空闲时间超过最大空闲时间的数据库连接来避免因为没有释放数据库连接而引起的数据库连接遗漏。

通俗的理解就是： 数据库连接池是程序启动时建立足够数量的数据库连接对象，并将这些连接对象组成一个池，由程序动态的对池中的连接对象进行申请、使用和释放。

###### 优点

1.避免应用程序频繁的连接、断开数据库

2.提供数据库连接对象的使用频率。

###### 创建方式

1.创建连接池

```js
mysql.createPool(config)
    host：数据库服务器的地址
    port: 端口号
    user：连接数据库的用户名
    password：连接数据库的密码
    database：数据库名
    connectionLimit：用于指定连接池中最大的链接数，默认属性值为10.
    multipleStatements ：是否允许执行多条sql语句，默认值为false
```

2.从连接池获取一个连接

```js
连接池名.getConnection(function (err, connection) {
	执行的代码;
});

//参数err：错误对象。连接失败后的错误信息
//参数connection：连接对象。若连接失败,它就是undefined
```

3.释放连接对象(将连接对象放回连接池)： connection.release()  
4.从连接池中移除连接对象： connection.destory()  
5.关闭该连接池： 连接池名.end()；

##### 3.createPoolCluster

创建连接池集群，允许与多个 host 连接

##### 4.数据库访问中的 ORM——sequelize 模块

###### ORM

**考虑到数据库表是一个二维表，包含多行多列，每一行可以用一个 JavaScript 对象表示。这就是传说中的 ORM 技术：Object-Relational Mapping（对象关系映射），把关系数据库的表结构映射到对象上。**

ORM 的特点：

_可以提高开发的效率_

不用直接写 SQL 语句

###### sequelize

**基于 promise 的关系型数据库 ORM 框架，这个库完全采用 JavaScript 开发并且能够用在 Node.JS 环境中，易于使用，支持多 SQL 方言(dialect)。它当前支持 MySQL、MariaDB、SQLite、PostgreSQL、Sql Server 数据库。**

sequelize 的特点：

_强大的模型定义，支持虚拟类型。_  
_支持完善的数据验证，减轻前后端的验证压力。_  
_Sequelize 的查询非常全面和灵活。_

###### sequelize 的使用

1. 安装 sequelize：npm install sequelize *必须先安装 mysql 的驱动模块（npm install mysql）*
2. 连接数据库：创建 sequelize 的对象

```js
//导入mysql模块
const mysql = require("mysql2");
//导入sequelize模块
const Sequelize = require("sequelize");
//创建sequelize对象,参数分别为：数据库名称，数据库类型，密码，配置
var MySequelize = new Sequelize("spj", "root", "929TJ813", {
	host: "localhost",
	port: 3306,
	dialect: "mysql", //数据库类型
	pool: {
		//数据库连接池
		max: 20, //最大连接对象的个数
		min: 5, //最小连接对象的个数
		idle: 1000, //最长等待时间，单位为毫秒
	},
});
module.exports = MySequelize; //导出创建的sequelize对象
```

3. 创建数据模型：数据模型是一个类，对应的是数据库中一张表

```js
const Sequelize = require("sequelize");
const MySequesize = require("../config/dbconfig"); //导入创建的sequelize对象
//创建StudentModel模型，该模型对应的表名是student
var StudentModel = MySequesize.define(
	"users",
	{
		sid: {
			type: Sequelize.INTEGER, //表示属性的数据类型
			field: "s_id", //属性对应的列名,若不定义field则表中的列名(sid)就是属性名
			primaryKey: true, //表示主键
			autoIncrement: true, //表示主键自增
		},
		sname: {
			type: Sequelize.STRING(50),
			field: "s_name",
			allowNull: false, //表示当前列是否允许为空，false表示该列不能为空
			//unique:true    //表示该列的值必须唯一
		},
		sgender: {
			type: Sequelize.STRING(4),
			field: "s_gender",
			allowNull: false,
		},
		sbirthday: {
			type: Sequelize.DATE,
			field: "s_birthday",
			allowNull: false,
		},
		saddress: {
			type: Sequelize.STRING(100),
			field: "s_address",
			allowNull: false,
		},
		sage: {
			type: Sequelize.INTEGER,
			field: "s_age",
			allowNull: false,
		},
	},
	{
		freezeTableName: true, //true表示使用给定的表名，false表示模型名后加s作为表名
		timestamps: false, //true表示给模型加上时间戳属性(createAt、updateAt),false表示不带时间戳属性
	}
);
//同步数据库，force的值为false，表若存在则先删除后创建，force的值为true表示表若存在则不创建
var users = StudentModel.sync({ force: false });

module.exports = StudentModel; //导出模型
```

4. 使用 sequelize 实现增删改查 。

```js
const StudentModel = require("../../db/model/StudentModel");
const Sequelize = require("sequelize");
//插入数据
StudentModel.create({
	sname: "关羽",
	sgender: "男",
	sbirthday: "1998-12-28",
	saddress: "陕西宝鸡",
})
	.then((result) => {
		console.log("插入成功！", result);
	})
	.catch((err) => {
		console.log("插入失败！", err);
	});

//查询数据
StudentModel.findAll({
	raw: true, //查询出来只有需要的数据，没有别的内容
}).then((data) => {
	console.log(data);
});

//删除记录
StudentModel.destroy({
	where: {
		sid: 2,
	},
})
	.then((result) => {
		console.log("删除成功！", result);
	})
	.catch((err) => {
		console.log("删除失败！", err);
	});

//更新记录
StudentModel.findOne({
	where: {
		sid: 3,
	},
})
	.then((users) => {
		users
			.update({
				sname: "张飞",
				sgender: "男",
			})
			.then((result) => {
				console.log("更新成功！", result);
			})
			.catch((err) => {
				console.log("更新失败！", err);
			});
	})
	.catch((error) => {
		console.log("查无此人！", error);
	});

//查询部分字段
StudentModel.findAll({
	attributes: ["sname", "saddress"],
	raw: true,
})
	.then((result) => {
		console.log(result);
	})
	.catch((err) => {
		console.log(err);
	});

//聚合函数
StudentModel.findAll({
	attributes: [[Sequelize.fn("COUNT", Sequelize.col("s_id")), "记录总数"]], //col里面必须放的是列名
	raw: true,
}).then((result) => {
	console.log(result);
});
```

5. 使用 sequelize 实现模糊查询等内容。

```js
const StudentModel = require("../../db/model/StudentModel");
const Op = require("sequelize").Op; //引入sequelize模块的Op操作符

//模糊查询
StudentModel.findAll({
	where: {
		sname: {
			[Op.like]: "张%",
		},
	},
	raw: true,
}).then((result) => {
	console.log(result);
});

//between：查询年龄在12到18之间的人的信息
StudentModel.findAll({
	where: {
		sage: {
			[Op.between]: [12, 18],
		},
	},
	raw: true,
}).then((result) => {
	console.log(result);
});

//in：查询地址是’陕西西安‘和’陕西商洛‘的记录
StudentModel.findAll({
	where: {
		saddress: {
			[Op.in]: ["陕西西安", "陕西商洛"],
		},
	},
	order: [
		["sage", "desc"], //查询结果按照sage的降序排列
	],
	raw: true,
}).then((result) => {
	console.log(result);
});

//and和or：查询性别为’男‘，并且地址是‘陕西宝鸡’的记录
StudentModel.findAll({
	where: {
		[Op.and]: [
			//把and改为or即为或时间
			{
				sgender: {
					[Op.eq]: "男",
				},
			},
			{
				saddress: {
					[Op.eq]: "陕西宝鸡",
				},
			},
		],
	},
	raw: true,
}).then((result) => {
	console.log(result);
});

//limit和offset：分页查询
StudentModel.findAll({
	limit: 3, //查询的记录数
	offset: 1, //从索引值为几的记录开始查询(查询的起始位置)，所有数据的索引值从0开始
	raw: true,
}).then((result) => {
	console.log(result);
});
```

---

##### 第一种方式使用连接 mysql 数据库

测试数据库连接，编辑存储文件 testdatabase.js

```js
let mysql = require("mysql"); //调用MySQL模块
//创建一个connection
let connection = mysql.createConnection({
	host: "127.0.0.1", //主机
	user: "root", //MySQL认证用户名
	password: "123456", //MySQL认证用户密码
	port: "3306", //端口号
});
//创建一个connection
connection.connect(function (err) {
	if (err) {
		console.log("[query] - :" + err);
		return;
	}
	console.log("[connection connect]  succeed!");
});
//执行SQL语句
connection.query("SELECT 1 + 1 AS solution", function (err, rows, fields) {
	if (err) {
		console.log("[query] - :" + err);
		return;
	}
	console.log("The solution is: ", rows[0].solution);
});
//关闭connection
connection.end(function (err) {
	if (err) {
		return;
	}
	console.log("[connection end] succeed!");
});
```

第二种

```js
const mysql = require("mysql");

const options = {
	host: "127.0.0.1",
	user: "root",
	password: "123456",
	database: "test",
	port: "3306",
};

const connection = mysql.createConnection(options);

connection.connect((err) => {
	if (err) return console.log(err);
	console.log("[Mysql connect]");
});

// 添加用户
const userAddSql = `insert into user (uname,age,password) values(?,?,?)`;
let param = ["ptbird", 20, "123456"];
connection.query(userAddSql, param, (err, res) => {
	if (err) return console.log(err);
	console.log("[Mysql INSERT 插入结果 : success");
});
// 查询所有用户
const userSelectSql = `select * from user`;
connection.query(userSelectSql, (err, rows, fields) => {
	rows.forEach((item) => {
		console.log("[Mysql SELECT 查询结果] ： " + item.uname);
	});
	console.log("[Mysql query result] : success");
});
// 更新用户
const userUpdateSql = "UPDATE USER SET uname = (?) where (uid = ?) ";
connection.query(userUpdateSql, ["新姓名", 14], (err, fields) => {
	if (err) return console.log(err);
	console.log("[Mysql UPDATE 受影响的行数] ： " + fields.affectedRows);
});

// 删除用户
const userDeleteSql = "DELETE FROM user WHERE (uid = ?)";
connection.query(userDeleteSql, [1], (err, fields) => {
	if (err) return console.log(err);
	console.log("[Mysql DELETE 受影响的行数] ： " + fields.affectedRows);
});

// 连接关闭
connection.end((err) => {
	if (err) return console.log(err);
	console.log("[Mysql connection end]");
});
```

连接池方式：

```js
const mysql = require("mysql");

// 通过使用 this.flag 判断是否需要 connection，
// 如果是第一次连接，则返回 pool，如果不是第一次，则不需要返回
class MysqlPool {
	constructor() {
		this.flag = true;
		this.pool = mysql.createPool({
			host: "127.0.0.1",
			user: "root",
			password: "123456",
			database: "test",
			port: 3306,
		});
	}
	getPool() {
		if (this.flag) {
			this.pool.on("connection", (connection) => {
				connection.query("SET SESSION auto_increment_increment=1");
				this.flag = false;
			});
		}
		return this.pool;
	}
}

module.exports = MysqlPool;
```

使用连接池类：

```js
const MysqlPool = require("./mysqlPool");

const mysqlPool = new MysqlPool();

const pool = mysqlPool.getPool();
// pool.query 实际上是 pool.getConnection -> connection.query -> connection.release 的封装形式
pool.query("SELECT * FROM user", (err, rows) => {
	console.log(rows[0].uid);
});

pool.getConnection((err, connection) => {
	connection.query("SELECT * FROM user where (uid = ?)", [14], (err, res) => {
		console.log(res);
	});
	connection.release();
});
```

**执行上面文件**

```bash
node testdatabase.js
```

提示如下信息代表连接成功

[connection connect] succeed!  
The solution is: 2  
[connection end] succeed!

**1、查询**

```js
let mysql = require("mysql");
let connection = mysql.createConnection({
	host: "127.0.0.1", //主机
	user: "root", //MySQL认证用户名
	password: "123456", //MySQL认证用户密码
	port: "3306", //端口号
	database: "cnlink_boss",
});
connection.connect();
let userGetSql = "SELECT * FROM cnlink_pjob_innermessage";
// 查
connection.query(userGetSql, function (err, result) {
	if (err) {
		console.log("[SELECT ERROR] - ", err.message);
		return;
	}
	console.log("--------------------------SELECT----------------------------");
	console.log(result);
	console.log(
		"-----------------------------------------------------------------"
	);
});
connection.end();
```

**2、插入**

```js
let mysql = require("mysql");
let connection = mysql.createConnection({
	host: "", //主机
	user: "", //MySQL认证用户名
	password: "", //MySQL认证用户密码
	port: "3306", //端口号
	database: "cnlink_boss",
});
connection.connect();
let userGetSql = "SELECT * FROM cnlink_pjob_innermessage";
// 查
connection.query(userGetSql, function (err, result) {
	if (err) {
		console.log("[SELECT ERROR] - ", err.message);
		return;
	}
	console.log("--------------------------SELECT----------------------------");
	console.log(result);
	console.log(
		"-----------------------------------------------------------------"
	);
});
connection.end();
```

**3、修改**

```js
let mysql = require("mysql");
let connection = mysql.createConnection({
	host: "", //主机
	user: "", //MySQL认证用户名
	password: "", //MySQL认证用户密码
	port: "3306", //端口号
	database: "cnlink_boss",
});
connection.connect();
let userModSql =
	"UPDATE cnlink_pjob_innermessage SET INMES_CONTENT = ?,SEND_TIME = ? WHERE INMES_ID = ?";
let data = ["钟qwrewre23ds 儿的我的慰", "5678", 5];
// 改
connection.query(userModSql, data, function (err, result) {
	if (err) {
		console.log("[UPDATE ERROR] - ", err.message);
		return;
	}
	console.log("--------------------------UPDATE----------------------------");
	console.log("UPDATE affectedRows", result.affectedRows);
	console.log(
		"-----------------------------------------------------------------"
	);
});
connection.end();
```

**4、删除**

```js
let mysql = require("mysql");
let connection = mysql.createConnection({
	host: "", //主机
	user: "", //MySQL认证用户名
	password: "", //MySQL认证用户密码
	port: "3306", //端口号
	database: "cnlink_boss",
});
connection.connect();
let userDelSql = "DELETE FROM cnlink_pjob_innermessage WHERE INMES_ID = ?";
let data = [4];
// 删
connection.query(userDelSql, data, function (err, result) {
	if (err) {
		console.log("[DELETE ERROR] - ", err.message);
		return;
	}
	console.log("--------------------------DELETE----------------------------");
	console.log("DELETE affectedRows", result.affectedRows);
	console.log(
		"-----------------------------------------------------------------"
	);
});
connection.end();
```

### 使用 MySQL2 库

npm 文档：[MySQL2 - npm (npmjs.com)](https://www.npmjs.com/package/mysql2)

---

安装

```bash

```

## 使用 sequelize 库

npm 文档：[sequelize - npm (npmjs.com)](https://www.npmjs.com/package/sequelize)

中文文档 GitHub：[Sequelize 文档的中文版本: v7.1.0 | v6.16.0 (github.com)](https://github.com/demopark/sequelize-docs-Zh-CN)

中文文档：[Sequelize Docs 中文版 | sequelize-docs-Zh-CN (demopark.github.io)](https://demopark.github.io/sequelize-docs-Zh-CN/)

---

##### 介绍

- 此库依赖 mysql2

- sequelize 与 mysql 库相比，不需要写 sql 语句，增删查改都封装成对应的方法

- sequelize 封装了一些简单 sql 语句，掌握封装的方法及对应的参数即可，但学习成本稍微高一些，需要创建模式，模式需要与数据库中的表对应起来。在项目实际开发过程中，使用 sequelize 开发效率更高，代码可以更加简短。也有 query 方法，支持使用 sql 语句。

- sequelize 提供了一个方法 sequelize.sync({ force: true });强制数据库中的表与模式定义的表进行同步，如果数据库中存在与模式定义同名的表，此表会被删除，重新定义。如果数据库中存在模式未定义的表，不会对其进行操作。

---

1.安装：

```bash
npm install --save sequelize
```

2.支持以下驱动：

```bash
# 选择以下之一:
npm install --save pg pg-hstore # Postgres
npm install --save mysql2
npm install --save mariadb
npm install --save sqlite3
npm install --save tedious # Microsoft SQL Server
```

这里下载的是 mysql2 库

3.新建基于 db 目录文件：db/config.js

写入配置

```js
module.exports = {
	// root是数据库管理员账号，‘123546'是密码 3306是端口号（MySQL默认是3306）
	// school_admin是数据库名称
	dbsMysql: "mysql://root:123456@localhost:3306/new",
};
```

4.继续基于打包目录新建文件：db/mysql.js

```js
const Sequelize = require("sequelize");
const mysqlurl = require("./config").dbsMysql;
const sequelize = new Sequelize(mysqlurl, {
	// 选择一种日志记录参数
	logging: console.log, // 默认值,显示日志函数调用的第一个参数
});
// // 每次启动server刷新数据库
//  (async ()=>{
//   await sequelize.sync({ force: true });
//  })()

module.exports = sequelize;
```

**使用阶段**

5.创建模型

在 db 目录下添加 models 文件夹再添加一个`new2.js`

```js
const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../mysql");

const new2 = sequelize.define(
	"t_new2",
	{
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		// 这是其他模型参数
		freezeTableName: true,
	}
);
// 定义的模型是类本身
module.exports = new2;
```

6.路由定义

在 routes 文件夹中添加`new2.js`

```js
//引入kob得routes模块
const router = require("koa-router")();
//定义模型为刚刚创建得new2.js
let Model = require("../db/models/new2");
//正常来说启动端口为http://localhost:3000 添加/new2就可以进入new2路由
router.prefix("/new1");
// 进入new2路由以后可以打印this is a users response!
router.get("/", function (ctx, next) {
	ctx.body = "this is a users response!";
});
//设置增加add接口
router.post("/add", async function (ctx, next) {
	console.log(ctx.request.body);
	const new2 = await Model.create(ctx.request.body);
	ctx.body = {
		code: 200,
		data: new2,
	};
});
//设置查询find接口
router.post("/find", async function (ctx, next) {
	const new2 = await Model.findAll({ include: [] });
	console.log(1111);
	ctx.body = {
		code: 200,
		data: new2,
	};
});
//设置通过id得到所需信息的get接口
router.post("/get", async function (ctx, next) {
	// let users = await User.
	// find({})
	console.log(ctx.request.body);

	let new2 = await Model.findOne({
		// attributes: ['name', 'where']
		where: {
			id: ctx.request.body.id,
		},
	});
	ctx.body = {
		code: 200,
		data: new2,
	};
});
//设置修改update接口
router.post("/update", async function (ctx, next) {
	console.log(ctx.request.body);
	// let pbj = await Model.update({ _id: ctx.request.body._id }, ctx.request.body);

	let new2 = await Model.update(ctx.request.body, {
		where: {
			id: ctx.request.body.id,
		},
	});
	ctx.body = new2;
});
//设置删除delete接口
router.post("/delete", async function (ctx, next) {
	console.log(ctx.request.body);
	// 删除所有名为 "Jane" 的人
	await Model.destroy({
		where: { id: ctx.request.body.id },
	});
	ctx.body = "shibai ";
});

// //每次启动server刷新数据库
//  (async ()=>{
//   await sequelize.sync({ force: true });
//  })()
module.exports = router;
```

7.在`app.js`里面添加路由

```js
//引入刚刚创建的new2路由
const new2 = require("./routes/new2");
//使用我们的路由
app.use(new2.routes(), new2.allowedMethods());
```

8.启动项目

```bash
node app.js
```

9.在数据库中查看是否新建了表 t_new2

10.在浏览器测试刚刚写的 new2.js 的 get 方法

输入 url：http://localhost:3000/new2

11.使用 Apifox 接口测试工具测试接口

```bash
POST：http://localhost:3000/new2/find

GET：http://localhost:3000/new2/get
```
