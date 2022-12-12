# Node原生API服务开发

完整项目GitHub地址：[muyaCode/node-server: 纯JavaScript实现Node的 Web 服务器接口 练习 (github.com)](https://github.com/muyaCode/node-server)

## 项目目录说明：

```bash
bin - 服务端配置目录
config - 环境变量配置目录
controller - 
db - 
log - 
model - 
public - 
router - 
service - 
utils - 
validator - 
app.js - 服务端业务逻辑的核心文件-处理各种请求
```

## 服务端配置文件：bin/www

www文件可以带后缀.js，也可以不带

```js
/*服务端配置文件*/
/*在这个文件中提供一个最简单的服务端服务即可*/
const http = require('http');
const serverHandle = require('../app');
const PORT = 3000;
const server = http.createServer();
server.on('request', serverHandle);
server.listen(PORT);
```

## 服务端业务逻辑的核心文件：app.js

```js
/*服务端业务逻辑的核心文件*/
/*处理各种请求*/
const queryString = require('querystring');
const goodsRouterHandle = require('./router/goods');
const userRouterHandle = require('./router/user');

// 初始化参数
const initParams = (req) =>{
    // 准备 请求方式 / 请求路径 / 请求参数
    // 1.处理请求方式
    req.method = req.method.toLowerCase();
    // 2.处理请求路径
    req.path = req.url.split('?')[0];
    // 3.处理请求参数
    return new Promise((resolve, reject)=>{
        if(req.method === 'get'){
            let params = req.url.split('?')[1];
            req.query = queryString.parse(params);
            resolve();
        }else if(req.method === 'post'){
            let params = '';
            req.on('data', (chunk)=>{
                params += chunk;
            });
            req.on('end', ()=>{
                req.body = queryString.parse(params);
                resolve();
            });
        }
    });
}
// 请求返回的数据处理
const serverHandle = (req, res)=>{
    res.writeHead(200, {
        'Content-Type':'application/json; charset=utf-8;'
    });
    // 1.准备各种请求参数
    initParams(req).then(()=>{
        // 2.处理各种路由
        let goodsData = goodsRouterHandle(req, res);
        if(goodsData){
            res.end(JSON.stringify(goodsData));
            return
        }
        // 返回的数据
        let userData = userRouterHandle(req, res);
        if(userData){
            res.end(JSON.stringify(userData));
            return
        }
        // 404错误处理
        res.writeHead(404, {
            'Content-Type':'text/plain; charset=utf-8;'
        });
        res.end('404 Not Found');
    })
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
const GOODS_LIST = '/api/goods/list';
const GOODS_DETAIL = '/api/goods/detail';
const GOODS_EDIT = '/api/goods/edit';
const GOODS_NEW = '/api/goods/new';

const USER_LOGIN = '/api/user/login';
const USER_REGISTER = '/api/user/register';
const USER_INFO = '/api/user/info';

module.exports = {
    GOODS_LIST,
    GOODS_DETAIL,
    GOODS_EDIT,
    GOODS_NEW,
    USER_LOGIN,
    USER_REGISTER,
    USER_INFO
}
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
const {
    USER_LOGIN,
    USER_REGISTER,
    USER_INFO
} = require('./routerConst');
const {
    SuccessModel,
    ErrorModel
} = require('../model/ResultModel'); // 响应成功或者失败返回处理模块

const userRouterHandle = (req, res)=>{
    if(req.method === 'post' && req.path === USER_LOGIN){
        // 处理登录
        // return {
        //     code: 200,
        //     msg: '登录成功'
        // }
        return new SuccessModel('登录成功', {name:'lnj', age: 33});
    }else if(req.method === 'post' && req.path === USER_REGISTER){
        // 处理注册
        // return {
        //     code: 200,
        //     msg: '注册成功'
        // }
        return new ErrorModel('注册失败',{})
    }else if(req.method === 'get' && req.path === USER_INFO){
        // 处理获取用户信息
        // return {
        //     code: 200,
        //     msg: '获取用户信息成功',
        //     data: {
        //         name:'lnj',
        //         age: 33
        //     }
        // }
        return new SuccessModel('获取用户信息成功', {name:'lnj', age: 33})
    }
}

module.exports = userRouterHandle;
```

### 编写路由接口：router/goods.js

```js
const {
    GOODS_LIST,
    GOODS_DETAIL,
    GOODS_EDIT,
    GOODS_NEW,} = require('./routerConst');

const goodsRouterHandle = (req, res)=>{
    if(req.method === 'get' && req.path === GOODS_LIST){
        // 处理商品列表
    }else if(req.method === 'get' && req.path === GOODS_DETAIL){
        // 处理商品详情
    }else if(req.method === 'get' && req.path === GOODS_EDIT){
        // 处理编辑商品
    }else if(req.method === 'post' && req.path === GOODS_NEW){
        // 处理新建商品
    }
}
module.exports = goodsRouterHandle;
```

### 响应成功或者失败返回处理模块：model/ResultModel.js

```js
class BaseModel {
    constructor(msg, data){
        this.msg = msg;
        this.data = data;
    }
}
class SuccessModel extends BaseModel{
    constructor(msg, data){
        super(msg, data);
        this.code = 200;
    }
}
class ErrorModel extends BaseModel{
    constructor(msg, data){
        super(msg, data);
        this.code = -1;
    }
}
module.exports = {
    SuccessModel,
    ErrorModel
}
```

## cross-env环境变量库的使用

**根据npm地址文档安装**：[cross-env - npm (npmjs.com)](https://www.npmjs.com/package/cross-env)

### 配置-结合项目：package.json配置

```js
"scripts": {
  "dev": "cross-env NODE_ENV=dev nodemon bin/www",
  "build": "cross-env NODE_ENV=pro nodemon bin/www"
},
```

### 环境变量在项目内的打印使用

```js
console.log(process.env.NODE_ENV)
```

## 数据库的封装

### 1.安装mysql库

安装mysql：[mysql - npm (npmjs.com)](https://www.npmjs.com/package/mysql)

```bash
npm install mysql
```

安装mysql2：[mysql2 - npm (npmjs.com)](https://www.npmjs.com/package/mysql2)

```bash
npm install --save mysql2
```



### 2.数据库根据环境变量-配置：config/db.js

```js
let MYSQL_CONFIG;
let REDIS_CONFIG;

if(process.env.NODE_ENV === 'dev'){
    // MYSQL_CONFIG = {
    //     host     : '127.0.0.1',
    //     port     : '3306',
    //     user     : 'root',
    //     password : 'root',
    //     database : 'demo'
    // }
    MYSQL_CONFIG = {
        databaseName: 'demo',
        databaseUserName: 'root',
        databasePassword: 'root',
        conf:{
            host: '127.0.0.1', // MySQL服务器地址
            port: 3306, // MySQL服务器端口号
            dialect: 'mysql', // 告诉Sequelize当前要操作的数据库类型
            pool: {
                max: 5, // 最多有多少个连接
                min: 0, // 最少有多少个连接
                idle: 10000, // 当前连接多久没有操作就断开
                acquire: 30000, // 多久没有获取到连接就断开
            }
        }
    }
    REDIS_CONFIG ={
        host     : '127.0.0.1',
        port     : '6379',
    }
}else if(process.env.NODE_ENV === 'pro'){
    // MYSQL_CONFIG = {
    //     host     : '127.0.0.1',
    //     port     : '3306',
    //     user     : 'root',
    //     password : 'root',
    //     database : 'demo'
    // }
    MYSQL_CONFIG = {
        databaseName: 'demo',
        databaseUserName: 'root',
        databasePassword: 'root',
        conf:{
            host: '127.0.0.1', // MySQL服务器地址
            port: 3306, // MySQL服务器端口号
            dialect: 'mysql', // 告诉Sequelize当前要操作的数据库类型
            pool: {
                max: 5, // 最多有多少个连接
                min: 0, // 最少有多少个连接
                idle: 10000, // 当前连接多久没有操作就断开
                acquire: 30000, // 多久没有获取到连接就断开
            }
        }
    }
    REDIS_CONFIG ={
        host     : '127.0.0.1',
        port     : '6379',
    }
}
module.exports = {
    MYSQL_CONFIG,
    REDIS_CONFIG
};
```

### 3.配置mysql数据库连接，文件：db/mysql.js

```js
// 1.导入mysql驱动
const mysql      = require('db/mysql');
const { MYSQL_CONFIG } = require('../config/db');
// 2.创建连接对象
const connection = mysql.createConnection(MYSQL_CONFIG);
// 3.连接MySQL数据库
connection.connect();

// 4.操作MySQL数据库方法
const exc = (sql) =>{
    return new Promise((resolve, reject)=>{
        connection.query(sql, function (error, results) {
            if (error){
                reject(error);
            }else{
                resolve(results);
            }
        });
    });
};

module.exports = {
    exc,
    escape: mysql.escape
};
```

### 4.使用数据库：router/user.js

```js
const {
    USER_LOGIN,
    USER_REGISTER,
    USER_INFO
} = require('./routerConst');
const {
    SuccessModel,
    ErrorModel
} = require('../model/ResultModel');
const exc = require('../db/mysql');

const userRouterHandle = (req, res)=>{
    if(req.method === 'post' && req.path === USER_LOGIN){
        // 处理登录
        return new SuccessModel('登录成功', {name:'lnj', age: 33});
    }else if(req.method === 'post' && req.path === USER_REGISTER){
        let sql = `insert into user (username, password) values ('lnj', 123456)`;
        exc(sql).then((results)=>{
            console.log(results);
        }).catch((err)=>{
            console.log(err);
        });
        // 处理注册
        return new ErrorModel('注册失败',{})
    }else if(req.method === 'get' && req.path === USER_INFO){
        // 处理获取用户信息
        return new SuccessModel('获取用户信息成功', {name:'lnj', age: 33})
    }
};

module.exports = userRouterHandle;
```

## 展示静态页面

### 在app.js中，封装并导出处理方法

```js
/**
 * 封装返回数据方法
 * @param res  响应对象
 * @param data 返回的数据
 */
const setEnd = (res, data) =>{
    res.writeHead(200, {
        'Content-Type':'application/json; charset=utf-8;'
    });
    res.end(JSON.stringify(data));
}

// 处理各种请求
const serverHandle = async (req, res)=>{
    writeLog(`${req.method}--${req.url}--${req.headers['user-agent']}`)
    
    /** 展示静态页面 */
    // 0.准备cookie和session
    await initCookieSession(req, res);
    // 1.返回静态网页
    await staticServer.readFile(req, res, rootPath);
    // 2.处理API请求
    res.setEnd = setEnd;

    // 1.准备各种请求参数
    initParams(req, res).then( async ()=>{
        // 2.处理各种路由
        // 2.1处理商品相关路由
        let goodsData = goodsRouterHandle(req, res);
        if(goodsData){
            res.setEnd(res, goodsData);
            return
        }
        // 2.2处理用户相关路由
        let userData = await userRouterHandle(req, res);
        if(userData){
            res.setEnd(res, userData);
            return
        }
        // 2.3没有匹配到任何路由
        res.writeHead(404, {
            'Content-Type':'text/plain; charset=utf-8;'
        });
        res.end('404 Not Found');
    });
};
module.exports = serverHandle;
```

### 新建静态页面

html文件1：public\login.html

html文件2：public\register.html

### 文件：utils/staticServer.js配置

```js
const path = require('path');
const fs = require('fs');
const mime = require('./mime');
/**
 * 读取静态资源
 * @param req  请求对象
 * @param res  响应对象
 * @param rootPath 静态资源所在的目录
 */
function readFile(req, res, rootPath) {
    // 1.获取静态资源地址
    // http://127.0.0.1:3000/login.html?name=lnj&pwd=123456;
    let fileName = req.url.split('?')[0];
    let filePath = path.join(rootPath, fileName); // 前面需要导入path模块
    // 2.判断静态资源是否存在
    let isExists = fs.existsSync(filePath);
    if(!isExists){
        return
    }
    // 3.获取静态资源的后缀名
    let fileExt = path.extname(filePath);
    // 4.根据文件的后缀获取对应的类型
    let type = mime[fileExt];
    // 5.对文本类型进行特殊处理
    if(type.startsWith('text')){
        type += '; charset=utf-8;'
    }
    // 5.告诉客户端返回数据的类型
    res.writeHead(200, {
        'Content-Type': type
    });
    // 6.加载静态资源并返回静态资源
    return new Promise((resolve, reject)=>{
        fs.readFile(filePath, (err, content)=>{
            if(err){
                res.end('Server Error');
                reject(err);
            }else{
                res.end(content);
                resolve();
            }
        });
    });
}
module.exports = {
    readFile
}
```
