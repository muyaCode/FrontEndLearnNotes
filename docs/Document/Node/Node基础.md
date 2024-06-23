# Node 基础

## Node 学习指引

**官方网站：**

Node 开源地址 GitHub：<https://github.com/nodejs/node>

Node 官网：[Node.js](https://nodejs.org/zh-cn/)

官网中文 API 文档(点击进相应的版本)：[Docs | Node.js](https://nodejs.org/zh-cn/docs/)

**中文网：**

[Node.Js 中文网 (p2hp.com)](http://nodejs.p2hp.com/)

[Node.js v8.x 中文文档 | Node.js 中文网 (nodeapp.cn)](https://www.nodeapp.cn/)

[Node.js v10.8.0 文档](http://caibaojian.com/nodejs/api/documentation.html)

**收费中文网文档**：[API 文档 | Node.js 中文网 (nodejs.cn)](http://nodejs.cn/api/)

第三方英文和中文 API 文档：<https://nodejs.bootcss.com/api/documentation>

**学习教程：**

编程之家 Node 文档教程：<https://www.jb51.cc/nodejs-tutorial/>

廖雪峰教程：[安装 Node.js 和 npm - 廖雪峰的官方网站](https://www.liaoxuefeng.com/wiki/1022910821149312/1023025597810528)

菜鸟教程 Node 文档：[Node.js 教程 | 菜鸟教程](https://www.runoob.com/nodejs/nodejs-tutorial.html)

W3C 文档：[Node.js 教程\_w3cschool](https://www.w3cschool.cn/nodejs/)

W3C 文档 2：[Node.js 教程 23_w3cschool](https://www.w3cschool.cn/nodejsdoc/)

## 一、内置对象介绍

### 分类

- 全局对象：何时何处都能访问
- 核心对象：向系统索要，引入即可使用
- 自定义对象：按路径引入即可

### 1.global 全局对象

global 中的属性，叫全局属性;

在 Node 中不同于浏览器，Node 中没有 window 对象，但有 global 全局对象，在 Node 代码中，最外层输出

```js
console.log(this === global);  // false
// global调用函数
(function() {
    console.log(Object.keys(this)); // 打印全局属性
})()
// 打印出
process 进程 开启很多个线程
Buffer 缓存区 我们node 读取文件 内存中的数据 都是二进制 数据16进制
clearInterval  setInterval
clearTimeout  setTimeout
clearImmediate  setImmediate 宏任务
```

### 2.process - 进程（全局对象）

文档：[进程 | Node.js 中文文档 | Node.js 中文网 (nodeapp.cn)](https://www.nodeapp.cn/process.html#process_process)

可以在 Node 中打印 process，看看都有什么属性

```js
console.log(process);
```

- 每个系统的环境变量几乎都不一样，可以利用环境变量中的具体某个特定的值来区分不同的机器

- 1.`process.env` (获取环境变量)：是一个对象，我们可以通过其.属性名来获取具体的**环境变量值**

  - 文档：[进程 | Node.js 中文文档 | Node.js 中文网 (nodeapp.cn)](https://www.nodeapp.cn/process.html#process_process_env)

  - 1.在 windows 系统环境变量设置：变量名：`MY_TEST`，变量值：liulaoshi

  - ```bash
    # 1.在项目当前目录下设置环境变量
    # 开发的时候 localhost / www.xxx.cn

    # 2.临时的变量 export / set => cross-env
    # 命令行中输出临时变量
    export MY_TEST=liulaoshi

    # 3.放到系统的环境变量中 计算 -》系统 -》 环境变量
    Windows系统中：计算机 ——> 系统 ——> 环境变量设置
    Mac系统中，使用命令行输出：cat ~/.bash_profile
    ```

  - 2.获取系统变量

  - ```js
    console.log(path.resolve()); // 解析出一个绝对路径，和下面的一样功能
    console.log(process.cwd()); // 在哪里执行这个文件 ,目录就是哪里 代表的就是执行的文件的目录
    //
    let stuOrTeacher = process.env.MY_TEST;
    console.log(stuOrTeacher);
    // 判断是否等于 liulaoshi
    if (stuOrTeacher === "liulaoshi") {
    	console.log("教师端");
    } else {
    	console.log("学生端");
    }
    ```

  - 运行命令：`node js文件名`

  - 以达到简单区分不同的机器，从而针对生产/开发环境运行不同的效果

- 2.`process.argv`：获取命令行参数（实现命令行工具）

  - 文档：[进程 | Node.js 中文文档 | Node.js 中文网 (nodeapp.cn)](https://www.nodeapp.cn/process.html#process_process_argv)

  - 命令行加法计算器：

  - ```js
    // 最简单的需求，命令行加法计算器
    // process.argv => 返回对应数组的索引所属的值：[node绝对路径，文件的绝对路径 ,1, 3]

    // 获取用户传递的命令行参数数组，数组的2,3索引对应的元素
    let num1 = process.argv[2] - 0; // 索引值2之后才是命令行输入的值
    let num2 = parseInt(process.argv[3]); // parseInt也ok
    let sum = num1 + num2;
    // 输出（卡顿输出）（定时输出）
    console.log("计算中.....");

    // 2秒后输出
    setTimeout(() => {
    	console.log("结果为:" + sum);
    }, 2000);
    ```

  - `commander` 库：命令行的管家 帮你提供 `--help` 等命令的自定义配置：

    - GitHub：[tj/commander.js: node.js command-line interfaces made easy (github.com)](https://github.com/tj/commander.js)

    - NPM：[commander - npm (npmjs.com)](https://www.npmjs.com/package/commander)

  - `chalk` 库：命令行的颜色库(粉笔)

    - GitHub：[chalk/chalk: 🖍 Terminal string styling done right (github.com)](https://github.com/chalk/chalk)
    - NPM：[chalk - npm (npmjs.com)](https://www.npmjs.com/package/chalk)

### 3.全局对象：`module`、`exports`、`require`、`__dirname`、`__filename`

#### `module`、`exports`、`require` 导入导出对象

待定

#### `__filename`/`__dirname` - 文件路径对象（全局对象）

- `__filename`：获取当前运行文件的目录，绝对路径
- `__dirname`：当前运行文件的绝对路径

```js
console.log(__dirname);
console.log("===================================================");
console.log(__filename);
```

### nodejs 实现规范

- `CommonJS`： 规范 JavaScript 语言作为后端语言运行的标准
  - 具备什么能力，该怎么做 ，比如： 具备服务器的功能/ 可以操作文件 .....
  - 模块应该怎么写： Module：
    - 1：依赖一个模块：`require('模块名(id)')`
    - 2： 需要被模块依赖：`module.exports = 给外部的数据`
    - 3：一个文件是一个模块

### 核心对象 path - 路径

文档：[路径（Path） | Node.js 中文文档 | Node.js 中文网 (nodeapp.cn)](https://www.nodeapp.cn/path.html)

- 1：`const path = require('path');`

- 路径 -> 在处理路径的时候很擅长，但是，其不负责判断路径是否存在文件

- 拼接并修正路径 `path.join(__dirname，'a'，'b');` 以当前目录/a/b

- `path.resovle('./xxx') 相对转绝对`

- ```js
  // 引入核心对象
  const path = require("path"); // path没有写路径(核心对象)
  // path在node.exe里面

  // 3段路径来自不同用户的输入    //one//    two      ///three ///
  const myPath = path.join(__dirname, "//one//", "//two//", "//three///");

  // console.log(myPath);

  // 根据相对路径，返回绝对路径
  // 对程序说 ./xxx.js 非要一个绝对路径

  const str = ".///abc////efg.js";
  let temp = path.resolve(str);
  let temp2 = process.cwd();
  console.log(temp); // 输出绝对路径

  console.log(path.resolve()); // 输出绝对路径
  console.log(process.cwd()); // 在哪里执行这个文件，目录就是哪里 代表的就是执行的文件的目录
  ```

- 接收一个合法的路径字符串，转换成一个对象

  - `let pathObj = path.parse(mypath);`

- 接收一个路径对象，转换成一个字符串路径

  - `let str = path.format(pathObj);`

- ```js
  // 接受一段字符串路径
  const path = require("path");
  let myPath = path.join(__dirname, "jack", "rose", "mick.txt");

  // 解析这个路径为对象，更易于操作
  let pathObj = path.parse(myPath);
  // console.log(pathObj);

  // base可以作为修改文件名，或后缀的方式
  pathObj.base = "mick_die.good";

  // 接收路径对象，转换成路径字符串
  myPath = path.format(pathObj);
  console.log(myPath);
  ```

文件内容：

```javascript
{
  root： 'C：\\'，
  dir： 'C：\\Users\\孙悟空'，
  base： '金箍棒.txt'，   // 该属性可以用于修改文件名和后缀
  ext： '.txt'，
  name： '金箍棒'
}
```

- **注意：path 对象是方便我们操作路径的，对于获取来讲： parse 解析成对象，format 转换成字符串.join 拼接并修正.... 对于修改路径对象来讲，可以用 base 属性更改，不能用 name，ext 更改**

## 二、Node 模块

- 弊端

  - 在 js 中要涉及到逻辑，还要在 html 中，为逻辑对象考虑引用顺序

- 所有对象默认都是全局对象，命名冲突

**commonjs 规范**：

- 一个文件就是一个模块
  - 导入用：`require('./xxx.js');`
  - 导出用：`module.exports = xxx;`
  - 在每一个模块内声明的变量属于模块内的作用域

### 1.fs - 文件系统模块

- 文件读写
- 其他功能
- 扩展介绍

### 2.IO - 操作文件对象

- IO

  - I：input 输入
  - O：output 输出
  - 文件的操作就是 IO

- 复制文件的过程， I： 通过计算机，存储文件到剪切板

  - 粘贴到指定目录： O： 通过计算机，将剪切板上的数据，写出到 指定目录

- node 中有两种 IO 的操作

  - 同步 IO

    - 一行代码(读文件)不执行完毕...后续代码不能执行

  - 异步 IO (建议)

    - 一行代码(读写文件) 不执行完毕(正在读写中) ... 后续代码也可以执行

  - 代码体验：

    - 读写文件

    - ```js
      const fs = require("fs"); //必须这个名称
      //读 fs.readFile(路径，回调函数);
      //写 fs.writeFile(路径，数据，回调函数);
      ```

    - 总结： 异步的读/写文件 参数 1：都是路径，可以相对可以绝对，最后一个参数都是回调函数，回调函数的参数中错误对象优先

- 同步和异步 IO 的区别： 同步 IO 会阻塞后续代码执行，异步 IO 不会阻塞后续代码执行

### 3.实现一个 require 方法

```js
const path = require("path");
const fs = require("fs");
const vm = require("vm");

function Module(id) {
	this.id = id;
	this.exports = {}; // 模块的结果
}

Module.wrapper = [
	"(function(module,exports,require,__filename,_dirname){",
	"})",
];

// 文件后缀
Module.extensions = {
	".js"(module) {
		// js需要将exports 传入给用户 用户自己赋值
		let script = fs.readFileSync(module.id, "utf8");
		// 方法
		let fnstr = Module.wrapper[0] + script + Module.wrapper[1];
		let fn = vm.runInThisContext(fnstr); // 让字符串变成js代码
		// 第一个参数是改变this指向 module moduleexports
		fn.call(
			module.exports,
			module,
			module.exports,
			myRequire,
			module.id,
			path.dirname(module.id)
		);
	},
	".json"(module) {
		let script = fs.readFileSync(module.id, "utf8");
		module.exports = JSON.parse(script);
	},
};

// 给你一个相对路径，解析成绝对路径
Module.resolveFileName = function (filename) {
	// 1.把相对路径转换成绝对路径
	let absPath = path.resolve(__dirname, filename);
	let flag = fs.existsSync(absPath); // 判断文件是否存在，异步方法被废弃
	let current = absPath;
	if (!flag) {
		let keys = Object.keys(Module.extensions);
		for (let i = 0; i < keys.length; i++) {
			current = absPath + keys[i];
			let flag = fs.existsSync(current);
			if (flag) {
				break;
			} else {
				current = null;
			}
		}
	}
	// 如果没有，说明加了文件后缀还是不存在
	if (!current) {
		throw new Error("文件不存在");
	}
	// console.log("current绝对路径文件：", current);
	// 返回文件路径
	return current;
};

// 模块加载
Module.prototype.load = function () {
	// 模块加载就是读取文件的内容 后缀
	let ext = path.extname(this.id);
	// 根据不同的后缀，调用不同的处理方法
	Module.extensions[ext](this);
};

Module._cache = {};
// 实现require方法
function myRequire(filename) {
	let current = Module.resolveFileName(filename);

	// 是否有缓存
	if (Module._cache[current]) {
		// 如果加载过了 那模块肯定缓存好了，那么直接将exports返回即可
		return Module._cache[current].exports;
	}
	let module = new Module(current); // 实例化一个Module
	// 缓存
	Module._cache[current] = module;

	module.load();

	return module.exports; // 默认导出module.exports对象
}
// 导入a.json
let json = myRequire("./a");
console.log(json);
// 导入b.js
let bjs = myRequire("./b");
console.log(bjs);
```

文件：a.json

```json
{
	"name": "zhangsan",
	"age": 18
}
```

文件：b.js

```js
module.exports = "hello";
// 如果在这里加 “//” 注释，运行会报错：evalmachine.<anonymous>:2 //
```

## 三、http 核心模块

### http 超文本传输协议

- 协议至少双方 -> http 双方！！
- 客户端(浏览器) -> 服务器
  - 原生应用(QQ) -> 服务器

### 请求与响应交互的过程

- 见图

### 主体对象

- 服务器对象
- 客户端对象
- 请求报文对象(对于服务器来说，是可读)
- 响应报文对象(对于服务器来说，是可写)

### 创建服务器步骤

- 1：引入 http 核心对象
- 2：利用 http 核心对象的.createServer(callback); 创建服务器对象
- 3：使用服务器对象.listen(端口，ip 地址) 开启服务器
- 4：callback(req，res) 根据请求处理响应

### 请求对象

- 请求首行中的 url `req.url`
- 请求首行中的请求方式 `req.method`
- 请求头中的数据`req.headers` 是一个对象
- 头信息中，也可以作为与服务器交互的一种途径

### 获取请求体数据

- 代码对比

- 浏览器：`$('#xx').on('submit'，function(e){    })`
- 服务器：`req.on('data'，function(d){ d.toString(); })`

### querystring 核心对象

- `querystring.parse(formStr)`
- `username=jack&password=123` 转换成如下:
- `{ username: 'jack', password：'123' }`

### 响应对象

- 响应首行 `res.writeHead(状态码)`
- 写响应头
  - 一次性写回头信息
    - `res.writeHead(200，headers)`
  - 多次设置头信息
    - `res.setHeader(key，value);`
- 写响应体
  - 一次性写回响应体
    - `res.end();`
  - 多次写回响应体
    - `res.write();`

### 请求与响应

- 头行体
- content-type 是对请求或者响应体数据，做出的说明

### 响应体数据

- res.write('字符串'||读出文件的二进制数据)
- res.end('字符串'||读出文件的二进制数)

### 回写页面

- 英雄列表
- art-template http
- 只能是访问 get 请求 url： /hero-list 才返回该数据
- 其他请求返回 ok

## 四、其他模块

### events 事件触发器(事件绑定和触发：事件发布和订阅)

文档：[events 事件触发器 | Node.js API 文档 (nodejs.cn)](https://nodejs.cn/api/events.html)

各个事件的通信

```js
// 发布订阅模块 pub / sub
let EventEmitter = require("events");
let util = require( 'util');

function Girl (){}

util.inherits(Girl, EventEmitter);
let girl = new Girl;

girl.on('newListener', (type) => { // 监听到用户做了哪些监听
 console.log(type);
}

let listener1 = () => { console.log('哭'); }
let listener2 = ()=> { console.log('逛街'); }

girl.on("女生失恋", listener1);
girl.on("女生失恋", listener2);

// on emit => new Vue() $on $emit $once $on('change',function())

girl.emit('女生失恋');
```

实现 events 模块

```js
function EventEmitter() {
    this._events = Object.create(null);
}


EventEmitter.prototype.on = function(eventName, callback){
    // 不管任何人 调用了on方法 都可以增加 events
    if(!this._events) this._events = Object.create(null);
    // 监听绑定的事件 不是newLister就调用newListener
    if(eventName !== 'newListener'){
        this.emit('newListener', eventName);
    }

    if(this._events[eventName]){
        this._events[eventName].push(callback);
    }else {
        this._events[eventName] = [callback];
    }

}
EventEmitter.prototype.once = function(eventName, callback){
    // 绑定，执行后删除
    let one = () => { // 2) 会触发one函数
        callback(); // 触发原有的逻辑
        // 删除自己
  this.off(eventName, one); // 再将one删除
    }
    one.l = callback; // 用自定义属性 保存原有的绑定函数
    this.on(eventName, one); // 1) 先绑定
}
EventEmitter.prototype.off = function(eventName, callback){
    //
    if(this._events[eventName])(
  this._events[eventName] = this._events[eventName].filter(fn => {
            return fn != callback && fn.l != callback;
        }
    }
}
EventEmitter.prototype.emit = function(eventName, ...args){
    if(this._events[eventName]){
        this._events[eventName].forEach(fn => fn(...args));
    }
}

module.exports = EventEmitter;
```
