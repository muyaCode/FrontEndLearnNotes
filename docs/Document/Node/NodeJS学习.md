# Node 学习

官网学习文档：[Node 简介.js (nodejs.dev)](https://nodejs.dev/en/learn/)

官网下载和文档相关：[Node.js (nodejs.org)](https://nodejs.org/zh-cn)

菜鸟教程 Node：[Node.js 教程 | 菜鸟教程 (runoob.com)](https://www.runoob.com/nodejs/nodejs-tutorial.html)

## Node 进程（Node 运行机制）

事件循环

宏任务

微任务

模块化

- 模块对象

- 模块类型

- 模块加载机制

global 对象

process 对象

内置模块

- stream 流

- Buffer 模块

- Event 模块

- Process 模块

- FileSystem 文件系统模块

### 爬虫任务运行：进程任务示例

#### server/tasks/movie.js：爬虫运行任务进程设置

```js
// crawler/latest-list.js的爬虫脚本任务进程配置：node server/tasks/movie.js
const cp = require("child_process");
const { resolve } = require("path");
// const mongoose = require('mongoose');
// const Movie = mongoose.model('Movie');

(async () => {
	console.log("1");
	// 两个页面相同任务，可切换爬取
	// const script = resolve(__dirname, '../crawler/latest-list')
	const script = resolve(__dirname, "../crawler/trailer-list");
	console.log("2");
	const child = cp.fork(script, []);
	console.log("3");
	let invoked = false;
	/**
	 * 为子进程注册函数
	 */
	child.on("error", (err) => {
		if (invoked) return;

		invoked = true;

		console.log(err);
	});

	child.on("exit", (code) => {
		if (invoked) return;

		invoked = true;
		let err = code === 0 ? null : new Error("exit code " + code);

		console.log(err);
	});

	child.on("message", (data) => {
		let result = data.result;

		console.log("result", result);

		// result.forEach(async (item) => {
		//   let movie = await Movie.findOne({
		//     doubanId: item.doubanId
		//   }).exec()

		//   if (!movie) {
		//     movie = new Movie(item)
		//     await movie.save()
		//   }
		// })
	});
})();
```

#### server\crawler\trailer-list.js：puppeteer 爬虫脚本

```js
// puppeteer爬虫脚本01
const puppeteer = require("puppeteer");

const url = `https://movie.douban.com/cinema/nowplaying/nanning/`;

const sleep = (time) =>
	new Promise((resolve) => {
		setTimeout(resolve, time);
	});

(async () => {
	console.log("Start visit the target page");
	// 运行浏览器
	const browser = await puppeteer.launch({
		args: ["--no-sandbox"],
		dumpio: false,
	});
	// 新建浏览器页面
	const page = await browser.newPage();
	// 去往的页面
	await page.goto(url, {
		waitUntil: "networkidle2",
	});

	await sleep(3000);
	// 选择点击“加载更多”标签
	await page.waitForSelector("#nowplaying .more");

	// 加载更多点击多少次
	// for (let i = 0; i < 2; i++) {
	//   await sleep(3000)
	//   await page.click('.more')
	// }

	// 寻找页面元素
	const result = await page.evaluate(() => {
		var $ = window.$;
		var items = $(".list-item");
		var links = [];

		// 元素的获取和写入数组
		if (items.length >= 1) {
			items.each((index, item) => {
				let it = $(item);
				let doubanId = it.attr("id");
				let title = it.attr("data-title");
				let rate = it.attr("data-score");
				let poster = it
					.find(".poster img")
					.attr("src")
					.replace("s_ratio", "l_ratio");

				links.push({
					doubanId,
					title,
					rate,
					poster,
				});
			});
		}

		return links;
	});

	console.log("result", result);
	browser.close();

	// Node进程：运行命令文件：node server/task/movie.js | node server/crawler/trailer-list.js
	process.send({ result });
	process.exit(0); // 进程退出
})();
```

**进程模型：**

同步异步：

1. 异步 IO：

2. libuv：[libuv/libuv：跨平台异步 I/O (github.com)](https://github.com/libuv/libuv)

阻塞非阻塞：

1. 事件循环和事件驱动：

2. libuv 库：

单线程：

1. 进程：

子进程：

1. 启动子进程：

进程通信：

1. 待定

## 内置模块

[首页 | Node.js v20 文档 (nodejs.cn)](https://nodejs.cn/api/)

### fs 文件模块

- fs.rename(path1, path2, [callback]) 重命名某个文件
  - const fs = require('fs');  const root = __dirname; fs.rename(root + 'oldername.txt', root + 'newname.txt', function() {    if (err) throw err;    console.log('rename complete'); });

- fs.chmod(path, mode, [callback]) 修改文件权限
  - const fs = require('fs'); const root = __dirname; fs.chmod(root + '/duang.txt', '666', function( err ) {    if (err) throw err;    console.log('chmod complete'); });

- fs.stat( path, [callback]) 读取文件的元信息，回调函数将返回两个参数（err, stats）, 其中stats是fs.Stats的一个对象。
  - const fs = require('fs'); const root = __dirname; fs.stat(root + '/duang.txt', '666', function( err, stats ) {    if (err) throw err;    console.log( stats ); });

- fs.readFile(path, [callback]) 解析读取文件数据 同步接口:fs.readFileSync( path )

- fs.exists(path, [callback]) 判断文件是否存在
  - const fs = require('fs'); const root = __dirname; /* 判断文件是否存在 */ fs.exists(root + '/duang.txt', function( exists ) {    if ( !exists ) {        // you code here...    } else {        // code....    } });

- fs.unlink(path, [callback]) 删除一个文件
  - const fs = require('fs'); const root = __dirname; fs.stat(root + '/duang.txt, function( err ) {    if (err) throw err; });

- fs.write(fd, buffer, length, position, [callback]) 将buffer缓冲器内容写入fd文件

- fs.read(fd, buffer, length, position, [callback]) 从fd文件中中读取数据

  - buffer : 为写入数据的缓冲器。

  - offset : 为写入到缓冲器的偏移地址。

  - length : 指明了欲读取的数据字节数。

  - position : 为一个整数变量，标识从哪个位置开始读取文件。如果pisition的参数为null，数据将从文件的当前位置开始读取。

  - callback : 接受两个参数（err, bytesRead）, bytesRead是用来标识多少个字节被读取。

- fs.readdir(path[, options], callback)

- fs.appendFile(filename,data,[options],callback);以追加的方式写文件。

- fs.open(filename,flags,[mode],callback); 打开文件。

- fs.mkdir(path,[mode],callback);创建目录。

- fs.readdir(path,callback);读取目录。

- fs.exists(path,callback);查看文件与目录是否存在。

- fs.utimes(path,atime,mtime,callback);修改文件的访问时间和修改时间。

- fs.rename(oldfilename,newfilename,callback);重命名文件名或者目录。

- fs.rmdir(path,callback);删除空目录。

### path 路径模块

- 路径组成

  - path.dirname(p) 返回路径p所在的目录

    - var path = require('path');

    - console.log(path.dirname('/foo/bar/baz/asdf/a.txt'));  // /foo/bar/baz/asdf

    - console.log(path.dirname('/foo/bar/baz/asdf/'));  // /foo/bar/baz

    - console.log(path.dirname('C:/test/aaa'));  // C:/test

  - path.basename(p[, ext]) 返回路径的最后一个部分，即文件名。 参数ext为需要截掉的后缀内容

    - var path = require('path');

    - console.log(path.basename('/foo/bar/baz/asdf/a.txt'));  // a.txt

    - console.log(path.basename('/foo/bar/baz/asdf/a.txt','.txt'));  // a

    - console.log(path.basename('/foo/bar/baz/asdf/'));  // asdf

    - console.log(path.basename('C:/test/aaa'));  // aaa

  - path.extname(p) 返回路径p的扩展名，从最后一个'.'到字符串的末尾。如果最后一个部分没有'.'，或者路径是以'.'开头，则返回空字符串
    - var path = require('path'); console.log(path.extname('/foo/bar/baz/asdf/a.txt'));  // .txt console.log(path.extname('/foo/bar/baz/asdf/a.txt.b'));  // .b console.log(path.extname('/foo/bar/baz/asdf/a.'));  // . console.log(path.extname('C:/test/aaa/.'));  // '' console.log(path.extname('C:/test/aaa'));  // ''

- 分隔符

  - path.sep 返回对应平台下的文件分隔符， win下为'\'，*nix下为'/'
    - var path = require('path'); console.log(path.sep);  // win下为\，*nix下为/ console.log('foo\\bar\\baz'.split(path.sep));  // [ 'foo', 'bar', 'baz' ] console.log('foo/bar/baz'.split(path.sep));  // win下返回['foo/bar/baz']，但在*nix系统下会返回['foo','bar','baz']

  - path.delimiter 返回对应平台下的路径分隔符， win下为';'，*nix下为':'
    - var path = require('path'); console.log(path.delimiter); //win下为“;”，*nix下为“:” console.log(path.sep);  // win下为\，*nix下为/

- 规范化

  - path.normalize(p) 规范化路径，处理冗余的“..”、“.”、“/”字符。发现多个斜杠时，会替换成一个斜杠。当路径末尾包含一个斜杠时，保留。Windows系统使用反斜杠
    - var path = require('path'); console.log(path.normalize('a/b/c/../user/bin'));//a\b\user\bin console.log(path.normalize('a/b/c///../user/bin/'));//a\b\user\bin\ console.log(path.normalize('a/b/c/../../user/bin'));//a\user\bin console.log(path.normalize('a/b/c/.././///../user/bin/..'));//a\user console.log(path.normalize('a/b/c/../../user/bin/../../'));//a\ console.log(path.normalize('a/../../user/bin/../../'));//..\ console.log(path.normalize('a/../../user/bin/../../../../'));//..\..\..\ console.log(path.normalize('./a/.././user/bin/./'));//user\bin\

  - path.join([path1], [path2], [...]) 将多个路径结合在一起，并转换为规范化路径
    - var path = require('path'); console.log(path.join('////./a', 'b////c', 'user/'));//\a\b\c\user console.log(path.join('a', '../../', 'user/'));//..\user\

- 绝对和相对路径

  - path.resolve([from ...], to) 从源地址 from 到目的地址 to 的绝对路径，类似在shell里执行一系列的cd命令

    - path.resolve('foo/bar', '/tmp/file/', '..', 'a/../subfile')

    - 类似于:
      - cd foo/bar cd /tmp/file/ cd .. cd a/../subfile pwd

    - [注意]如果某个from或to参数是绝对路径（比如 'E:/abc'，或是以“/”开头的路径），则将忽略之前的from参数
      - var path = require('path'); console.log(path.resolve('.', 'testFiles/..', 'trdLayer'));//D:\project\trdLayer console.log(path.resolve('..', 'testFiles', 'a.txt'));//D:\testFiles\a.txt console.log(path.resolve('D:', 'abc', 'D:/a'));//D:\a console.log(path.resolve('abc', 'ok.gif'));//D:\project\abc\ok.gif console.log(path.resolve('abc', '..', 'a/../subfile')); //D:\project\subfile

  - path.isAbsolute(path) path是一个绝对路径(比如 'E:/abc')，或者是以“/”开头的路径，二者都会返回true
    - var path = require('path'); console.log(path.isAbsolute('../testFiles/secLayer'));//false console.log(path.isAbsolute('./join.js'));//false console.log(path.isAbsolute('temp'));//false console.log(path.isAbsolute('/temp/../..'));//true console.log(path.isAbsolute('E:/github/nodeAPI/abc/efg'));//true console.log(path.isAbsolute('///temp123'));//true

  - path.relative(from, to) 获取从 from 到 to 的相对路径， 可以看作 path.resolve 的相反实现

    - path.resolve(from, path.relative(from, to)) == path.resolve(to)

    - var path = require('path'); console.log(path.relative('C:\\\test', 'C:\\\impl\\bbb'));//..\impl\bbb console.log(path.relative('C:/test/aaa', 'C:/bbb'));//..\..\bbb console.log(path.relative('C:/test/aaa', 'D:/bbb'));//D:\bbb

### http 模块

- http.server

  - const http = require('http'); const net  = require('net'); const util = require('util'); //随便定义的一个函数，下面会用到 function  a(){    console.log("dajiahao"); } var server = new http.Server(); server.on('request',(req,res)=>{    console.log(req.url);    //设置应答头信息    res.writeHead(200,{'Content-Type':'text/html'});    res.write('hello we are family');    res.end('server already end\n'); }); //显示了三次这也证明了TCP的三次握手 server.on('connection',()=>{    a(); }); server.on('close',()=>{    console.log('server will close'); }); //关闭服务为了触发close事件 server.close();

    - 继承自EventEmitter,提供了以下的事件：

      - 1. request：当客户端请求到来的时候，该事件被触发，提供两个参数request和response，分别是http.ServerRequest和http.ServerResponse表示请求和响应的信息。 

        

      - 2. connection：当TCP建立连接的时候，该事件被触发，提供了一个参数socket，为net.socket的实例(底层协议对象) 

        

      - 3. close：当服务器关闭的时候会被触发 

        

      - 4. 除此之外还有checkContinue、upgrade、clientError等事件 

        

- http.createServer() 创建服务器

  - const http = require('http'); const net  = require('net'); const util = require('util');  http.createServer(function(req,res){    res.writeHead(404,{'Content-Type':'text/plain'})    res.write("we are is content");    res.end("fdsa");  }).listen(3000);

  - 可以打印res属性查看方法

- http.get('路径',callback) 发送get请求。

- http.request(options,callback) 发送请求。

  - options：options是一个类似关联数组的对象，表示请求的参数，callback作为回调函数，需要传递一个参数。

  - options常用的参数有host、port（默认为80）、method（默认为GET）、path（请求的相对于根的路径，默认是“/”。

- http.ServerRequset() 请求信息

  - 属性

    - ccomplete	客户端请求是否已经发送完成

    - httpVersion	HTTP协议版本，通常是1.0或1.1

    - method	HTTP请求方法，如：GET,POST

    - url	原始的请求路径

    - headers	HTTP请求头

    - trailers	HTTP请求尾(不常见)

    - connection	当前HTTP连接套接字，为net.Socket的实例

    - socket	connection属性的别名

    - client	client属性的别名

  - 实例
    - http.createServer(function(req,res){    console.log(req.httpVersion);    //console.log(req.socket);    console.log(req.headers);    console.log(req.method);    res.writeHead(404,{'Content-Type':'text/plain'})    res.write("we are is content");    res.end("fdsa"); }).listen(8080);

  - 获取GET请求内容
    - const http = require('http'); const net  = require('net'); const url  = require('url'); const util = require('util');  http.createServer((req,res)=>{    res.write(util.inspect(url.parse(req.url,true)));    //利用url模块去解析客户端发送过来的URL    res.end(util.inspect(url.parse(req.url,false))); }).listen(8080);

  - 获得POST请求内容
    - const http = require('http'); const net  = require('net'); const url  = require('url'); const util = require('util'); //querystring用于处理URL中的查询字符串 const querystring = require('querystring');  http.createServer((req,res)=>{    var posr = '';    req.on('data',(chunk)=>{        post+=chunk;    });    res,on('end',()=>{        //将字符串变为json的格式        post  =  querystring.parse(post);        //向前端返回字符串        res.end(util.inspect(post));    }); })

- http.ServerResponse 返回客户端信息

### until 模块 

- util.format(格式化输出字符串);

- util.isArray(检查是否为数组);

- util.RegExp(是不是正则);

- util.isDate(是不是日期型);

- util.inherits(child,parent)实现继承；

### events模块

- events.EventEmitter

  - EventEmitter 的核心就是事件触发与事件监听器功能的封装

  - EventEmitter 的每个事件由一个事件名和若干个参 数组成，事件名是一个字符串，通常表达一定的语义。对于每个事件，EventEmitter 支持 若干个事件监听器。当事件触发时，注册到这个事件的事件监听器被依次调用，事件参数作 为回调函数参数传递。

### jade模块

## 第三方模块



## 自定义模块



## 使用require方法加载模块

### 加载内置模块

```js
const fs = require('fs')
```

### 加载第三方模块



### 加载自定义模块

```js
const m1 = require('./m1.js')
```

- 可以省略.js后缀名

## 模块的加载机制

- 1.模块在第一次加载后会被缓存

- 2.内置模块加载优先级是最高的

- 3.自定义模块的加载：必须指定以 ./或../ 开头的路径标识

  - 如果没有指定  ./或../ 这样的路径标识符，则node 会把它当做内置模块或者第三方模块进行加载

  - 如果加载定义模块时，省略了文件的扩展名，则Node.js会按顺序分别尝试一下的文件

    - 1.安卓确切的文件名进行加载

    - 2.补全.js扩展名进行加载

    - 3.补全.json扩展名进行加载

    - 4.补全.node扩展名进行加载

    - 5.加载失败，终端报错

- 4.第三方模块的加载机制

  - 如果传递给require()的模块标识符不是一个内置模块，没有以 ‘./’ 或 '../' 开头，则Node.js 会从当前模块的父级目录开始，尝试从/node_modules 文件夹中加载第三方模块。

  - 如果没有找到对应的第三方模块，则移动到再上一层父级目录中，进行加载，查找到文件系统的根目录

- 5.目录为模块时的加载机制

  - 三种加载方式

  - 1.在被加载的目录下查找一个叫做package.json的文件，并寻找main属性，作为require()

  - 2.如果目录里没有package.json文件，或者main入囗不存在或无法解析，则Node.js将会试图加载目录下的index.js文件。

  - 3.如果以上两步都失败了，则Nodejs“在终端打印错误消息，报告模块的缺失Error:Cannot find module ‘xxx’
