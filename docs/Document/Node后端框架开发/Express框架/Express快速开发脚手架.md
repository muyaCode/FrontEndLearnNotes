# Express快速开发脚手架

生成器工具express-generator（又称为脚手架工具） 可以快速创建一个express应用的骨架（应用骨架是指我们在项目开发过程中常用的目录或文件，比如：css目录、js目录、img目录），以提高开发效率。

## 1 使用步骤

### 1.1 全局安装express-generator

```bash
npm i express-generator -g
```

### 1.2 使用脚手架初始化项目

```bash
# --view=ejs 使用ejs模板引擎
express --view=ejs 项目包名
```

### 1.3 进入目录, 安装所有需要的模块

```bash
cd 项目包名
然后
npm install
```

### 1.4 启动项目

项目自己的package.json文件中的“scripts”配置项，如果配置如下：【重点】

```json
"scripts": {  
  "start": "node ./bin/www",
  "hot": "nodemon  ./bin/www"
}
```

命令行终端窗口使用`npm run start`或 `npm run hot`来运行项目，当“scripts”配置项中的键名为"start"时则可以省力run，直接使用npm start来运行项目。

```bash
npm  start   
```

## 1.5 浏览器访问

```bash
locaohost:端口号
```

## 2 目录及文件介绍

```bash
bin - 项目启动为文件目录
public - 公共的静态资源目录
routes - 路由模块目录
views - ejs模板文件目录
app.js - 项目入口文件
```

## 前后端数据交互总结

| 请求方法   | 编码格式                             | 前端要传输的数据格式                                             | 后端如何获取                                | 应用场景 |
| ------ | -------------------------------- | ------------------------------------------------------ | ------------------------------------- | ---- |
| GET    | url地址后面（querystring）             | url?key1=value1&key2=value2                            | 不需要中间件:req.query                      | 获取数据 |
| POST   | applicaion/x-www-form-urlencoded | form-data: key1=value1&key2=value2                     | express.urlencoded( { extend:true } ) | 提交数据 |
| POST   | applicaion/json（只能通过ajax）        | request-payload: '{ "key1":"value1","key2":"value2" }' | express.json()                        |      |
| POST   | mutilpart/form-data（可以使用表单）      | 文件流                                                    |                                       | 文件上传 |
| DELETE | 同post                            |                                                        |                                       | 删除数据 |
| PUT    | 同post                            |                                                        |                                       | 更新数据 |
