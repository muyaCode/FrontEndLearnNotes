# Ajax 概念入门到手写

编程之家 ajax 教程：<https://www.jb51.cc/ajax-tutorial/>

参考：[AJAX 简介 (w3school.com.cn)](https://www.w3school.com.cn/js/js_ajax_intro.asp)

## 1、http 介绍

1. 什么是协议

   1. 协议是一个汉语词汇，读音为 xié yì，意思是共同计议，协商；经过谈判、协商而制定的共同承认、共同遵守的文件 — 来自百度百科
   2. 所谓协议，就是双方协商好要遵循的沟通准则，比如：用户协议、服务协议等

2. 常见协议类型以及特点

   网络协议，其实也就是前后端商量好的沟通准则。服务器要能读得懂客户端的请求，客户端也要懂服务器的响应，那么他们之间就需要一个协议

   ![协议.png](.\img\协议.png)

   就像发电报一样，发送者按照协议规定的编码方式发送，接收者再按照相同的协议准则解码

   **四种协议**：

   1. TCP
   2. HTTP
   3. HTTPS
   4. FTP

3. http 协议基于 TCP 协议，面向连接

4. 三次握手和四次挥手

   1. 三次握手和四次挥手：HTTP 基于 TCP，是面向连接的协议，建立连接要通过三次握手，断开连接要经过四次挥手![HTTP握手和挥手.png](.\img\HTTP握手和挥手.png)
   2. http 协议的构成：![请求和响应.jpg](.\img\请求和响应.jpg)

5. 请求头，请求体，响应头，响应体

## 2、同步异步

同步异步概念介绍

- 同步：一个人在同一个时刻只能做一件事情，在执行一些耗时的操作（不需要看管）不去做别的事，只是等待

- 异步：在执行一些耗时的操作（不需要看管）去做别的事，而不是等待

> JS 是单线程语言，所谓“单线程”就是一根筋，对于拿到的程序，一行一行的执行.

以定时器为例说明异步

```js
setTimeout(() => {
	console.log(1);
}, 1000);
console.log(2);
```

## 3、认识 ajax

可以通过以下几种方式让浏览器发出对服务端的请求，获得服务端的数据：

- 地址栏输入地址，回车，刷新

- 特定元素的 href 或 src 属性

- 表单提交

### 传统前后端交互缺点，ajax 由来

- 传统项目前后端不分离，用户触发一个 http 请求服务器,然后服务器收到之后,在做出响应到用户,并且返回一个新的页面，也就是说交互都是通过页面刷新或页面跳转来实现。

  这样的方式对于用户体验来讲其实并不友好，少量的数据更新也会引发整个页面重新请求，浪费了很大一部分资源。

  因此，我们希望有一种更好的方式，可以不用重新请求整个页面而达到更新部分数据的效果。2005 年，ajax（Asynchronous Javascript And XML）横空出世，给前端行业带来了巨大的变化与革新。

- ajax 特点

  - 优点
    不需要插件支持（一般浏览器且默认开启 JavaScript 即可）
    用户体验极佳（不刷新页面即可获取可更新的数据）
    提升 Web 程序的性能（在传递数据方面做到按需发送，不必整体提交）
    减轻服务器和带宽的负担（将服务器的一些操作转移到客户端）
  - 缺点
    前进、后退的功能被破坏（因为 Ajax 永远在当前页，不会记录前后页面）
    搜索引擎的支持度不够（因为搜索引擎爬虫还不能理解 JS 引起变化数据的内容）
    不同版本的浏览器度 XMLHttpRequest 对象支持度不足(比如 IE5 之前)

- 状态码和状态值

  - 常见状态码：
    100 ~ 199 - 表示连接继续
    200 ~ 299 - 表示各种意义上的成功
    300 ~ 399 - 表示重定向
    400 ~ 499 - 表示各种客户端错误
    500 ~ 599 - 表示各种服务端错误

- ajax 使用过程（以顾客吃饭服务员端菜为例讲解使用过程）

  - | 餐馆吃饭 | 网页 |
    | -------- | ---- |
    | 顾客     | 页面 |
    | 服务员   | Ajax |
    | 厨房     | 后台 |
  - | 顾客吃饭                                                   | Ajax                                                                                                                              |
    | ---------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
    | 点餐，告诉服务员吃什么，服务员记录                         | 准备页面请求，创建 XMLHttpRequest 对象                                                                                            |
    | 服务员带着菜单到后厨告诉厨师客人要吃哪些菜                 | 使用  XMLHttpRequest 对象的 open（）和 send（）方法发送资源请求给服务器                                                           |
    | 厨师开始工作                                               | 后台计算                                                                                                                          |
    | 厨师菜炒好了，告诉服务员，服务员从厨师那儿取菜，并端给顾客 | onreadystatechange 函数，状态改变时发送数据回客户端，使用  XMLHttpRequest 对象的 responseText 或 responseXML 属性获得服务器的响应 |

### readyState

由于 readystatechange 事件是在 xhr 对象状态变化时触发（不单是在得到响应时），也就意味着这个事件会被触发多次，所以我们有必要了解每一个状态值代表的含义：

| readyState | 状态描述         | 说明                                                   |
| ---------- | ---------------- | ------------------------------------------------------ |
| 0          | UNSENT           | 代理（XHR）被创建，但尚未调用 open()方法               |
| 1          | OPENED           | open()方法已经被调用，并且已经可以获取状态行和响应头   |
| 2          | HEADERS_RECEIVED | send() 方法已经被调用，并且已经可以获取状态行和响应头  |
| 3          | LOADING          | 响应体下载中， responseText 属性可能已经包含部分数据。 |
| 4          | DONE             | 响应体下载完成，可以直接使用 `responseText`            |

2.1.1. 时间轴

UNSENT->OPENED->HEADERS_RECEIVED->LOADING->DONE

初始化->建立连接->接收到响应头->响应体加载中->加载完成

```js
var xhr = new XMLHttpRequest();
console.log(xhr.readyState);

// => 0
// 初始化 请求代理对象
xhr.open("GET", "time.php");
console.log(xhr.readyState);
// => 1
// open 方法已经调用，建立一个与服务端特定端口的连接

xhr.send();

xhr.addEventListener("readystatechange", function () {
	switch (this.readyState) {
		case 2:
			// => 2
			// 已经接受到了响应报文的响应头

			// 可以拿到头
			// console.log(this.getAllResponseHeaders())
			console.log(this.getResponseHeader("server"));
			// 但是还没有拿到体
			console.log(this.responseText);
			break;

		case 3:
			// => 3
			// 正在下载响应报文的响应体，有可能响应体为空，也有可能不完整

			// 在这里处理响应体不保险（不可靠）
			console.log(this.responseText);
			break;

		case 4:
			// => 4
			// 一切 OK （整个响应报文已经完整下载下来了）

			// 这里处理响应体
			console.log(this.responseText);
			break;
	}
});
```

通过理解每一个状态值的含义得出一个结论：一般我们都是在 readyState 值为 4 时，执行响应的后续逻辑。

```js
xhr.onreadystatechange = function () {
	if (this.readyState === 4) {
		// 后续逻辑......
	}
};
```

遵循 HTTP

本质上 XMLHttpRequest 就是 JavaScript 在 Web 平台中发送 HTTP 请求的手段，所以我们发送出去的请求任然是

```js
// 设置请求报文的请求行
xhr.open("GET", "./time.php");
// 设置请求头
xhr.setRequestHeader("Accept", "text/plain");
// 设置请求体
xhr.send(null);

xhr.onreadystatechange = function () {
	if (this.readyState === 4) {
		// 获取响应状态码
		console.log(this.status);
		// 获取响应状态描述
		console.log(this.statusText);

		// 获取响应头信息
		console.log(this.getResponseHeader("Content‐Type")); // 指定响应头
		console.log(this.getAllResponseHeader()); // 全部响应头

		// 获取响应体
		console.log(this.responseText); // 文本形式
		console.log(this.responseXML); // XML 形式，了解即可不用了
	}
};
```

HTTP 请求，同样符合 HTTP 约定的格式：

> 参考链接：
>
> <https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest>
>
> <https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest>

## 4、AJAX 具体用法

### 发送一个 GET 请求

> 通常在一次 GET 请求过程中，参数传递都是通过 URL 地址中的 ? 参数传递

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Document</title>
	</head>
	<body>
		<button onclick="sendMsg()">发送请求</button>
		<div></div>
		<script>
			function sendMsg() {
				// 1. 创建一个XMLHttpRequest对象
				var xhr = new XMLHttpRequest();
				// 2. 调用open方法打开连接
				// open方法有三个参数：
				//   1. 请求的method
				//   2. 请求的url
				//   3. 是否异步，默认值为true，一般这个参数可以不传
				xhr.open("get", "./data.php?id=1");
				// 3. 发送请求：一般在 GET 请求时无需设置响应体，可以传 null 或者干脆不传
				xhr.send(null);
				// 4. 监听状态的改变
				xhr.onreadystatechange = function () {
					// 判断状态值 ， 0 -4 五种状态，4代表最终的完成
					if (xhr.readyState === 4) {
						// 通过 xhr 的 responseText 获取到响应的响应体
						console.log(this);
						// 判断状态码
						if (xhr.status === 200) {
							var resp = JSON.parse(xhr.responseText);
							console.log(resp);
							document.querySelector("div").innerHTML = `
              <h2>编号: ${resp.id}</h2>
              <h2>标题: ${resp.title}</h2>
            `;
						}
					}
				};
			}
		</script>
	</body>
</html>
```

### 发送一个 POST 请求

get 和 post 的区别

| GET                          | POST         |
| ---------------------------- | ------------ |
| 大小限制，4K 左右            | 无限制       |
| <http://www.taobao.com?id=3> | 放在请求体里 |
| 明文传输                     | 相对更安全   |

> 发送一个 POST 请求：POST 请求过程中，都是采用请求体承载需要提交的数据。

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Document</title>
	</head>
	<body>
		<button onclick="sendMsg()">发送请求</button>
		<div></div>
		<script>
			function sendMsg() {
				var xhr = new XMLHttpRequest();
				// 这里method传post
				xhr.open("post", "./data.php");
				// 设置请求头中的 Content‐Type 为 application/x‐www‐form‐urlencoded
				// 标识此次请求的请求体格式为 urlencoded 以便于服务端接收数据
				xhr.setRequestHeader(
					"Content-Type",
					"application/x-www-form-urlencoded"
				);
				// 需要提交到服务端的数据可以通过 send 方法的参数传递
				// 格式：key1=value1&key2=value2
				xhr.send("name=zhangsan&age=18");
				xhr.onreadystatechange = function () {
					if (xhr.readyState === 4) {
						if (xhr.status === 200) {
							var resp = JSON.parse(xhr.responseText);
							console.log(resp);
							document.querySelector("div").innerHTML = `
            <h2>姓名：${resp.name}</h2>
            <h2>年龄：${resp.age}</h2>
            <h2>余额：${resp.money}</h2>
            `;
						}
					}
				};
			}
		</script>
	</body>
</html>
```

### ajax 结合同步异步

`xhr.open()` 方法第三个参数要求传入的是一个 bool 值，其作用就是设置此次请求是否采用异步方式执行，默认

为 true ，如果需要同步执行可以通过传递 false 实现：

```js
console.log("before ajax");

var xhr = new XMLHttpRequest();
// 默认第三个参数为 true 意味着采用异步方式执行
xhr.open("GET", "./time.php", true);
xhr.send(null);
xhr.onreadystatechange = function () {
	if (this.readyState === 4) {
		// 这里的代码最后执行
		console.log("request done");
	}
};
console.log("after ajax");
```

如果采用同步方式执行，则代码会卡死在 `xhr.send()` 这一步：

```js
console.log("before ajax");

var xhr = new XMLHttpRequest();
// 同步方式
xhr.open("GET", "./time.php", false);
// 同步方式 执行需要 先注册事件再调用 send，否则 readystatechange 无法触发
xhr.onreadystatechange = function () {
	if (this.readyState === 4) {
		// 这里的代码最后执行
		console.log("request done");
	}
};
xhr.send(null);
console.log("after ajax");
```

演示同步异步差异。

一定在发送请求 send() 之前注册 readystatechange （不管同步或者异步）

> 为了让这个事件可以更加可靠（一定触发），一定是先注册

了解同步模式即可，切记不要使用同步模式。

至此，我们已经大致了解了 AJAX 的基本 API 。

## 5、封装 ajax

ajax 的 get 和 post 请求方法一个页面内使用

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Document</title>
	</head>
	<body>
		<button onclick="sendMsg()">发送请求</button>
		<script>
			function sendMsg() {
				// get('./data.php', { id: 3, title: 'lisi' }, function (resp) {
				//   console.log(resp)
				// }, true)

				post(
					"./data2.php",
					{ id: 3, title: "lisi" },
					function (resp) {
						console.log(resp);
					},
					true
				);
			}

			// 封装get
			// url：string，请求的地址
			// query：object，请求携带的参数
			// callback：function，成功之后的回调
			// isJson： boolean，是否需要解析json
			function get(url, query, callback, isJson) {
				// 如果有参数，先把参数拼接在url后面
				if (query) {
					url += "?";
					for (var key in query) {
						url += `${key}=${query[key]}&`;
					}
					// 取出最后多余的 &
					url = url.slice(0, -1);
				}

				var xhr = new XMLHttpRequest();
				xhr.open("get", url);
				xhr.send();
				xhr.onreadystatechange = function () {
					if (xhr.readyState === 4) {
						if (xhr.status === 200) {
							var res = isJson
								? JSON.parse(xhr.responseText)
								: xhr.responseText;
							callback(res);
						}
					}
				};
			}

			function post(url, query, callback, isJson) {
				// 如果有参数，把参数拼接起来
				var str = "";
				if (query) {
					for (var key in query) {
						str += `${key}=${query[key]}&`;
					}
					// 取出最后多余的 &
					str = str.slice(0, -1);
				}

				var xhr = new XMLHttpRequest();
				xhr.open("post", url);
				xhr.setRequestHeader(
					"Content-Type",
					"application/x-www-form-urlencoded"
				);
				xhr.send(str);
				xhr.onreadystatechange = function () {
					if (xhr.readyState === 4) {
						if (xhr.status === 200) {
							var res = isJson
								? JSON.parse(xhr.responseText)
								: xhr.responseText;
							callback(res);
						}
					}
				};
			}
		</script>
	</body>
</html>
```

ajax 的 get 和 post 请求方法：

1.html 内使用

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<script src="./util.js"></script>
		<title>Document</title>
	</head>

	<body>
		<button onclick="sendMsg()">发送请求</button>
		<script>
			function sendMsg() {
				// util.get('./data.php', { id: 3, title: 'lisi' }, function (resp) {
				//   console.log(resp)
				// }, true)

				// util.post('./data2.php', { id: 3, title: 'lisi' }, function (resp) {
				//   console.log(resp)
				// }, true)

				// util.ajax({
				//   method: 'get',
				//   url: './data.php',
				//   query: { id: 3, title: 'wangwu' },
				//   callback: function (resp) {
				//     console.log(resp)
				//   },
				//   isJson: true
				// })

				util.ajax({
					method: "post",
					url: "./data2.php",
					query: {
						id: 3,
						title: "wangwu",
					},
					callback: function (resp) {
						console.log(resp);
					},
					isJson: true,
				});
			}
		</script>
	</body>
</html>
```

2.封装的 utils.js：ajax 的 get 和 post 请求方法分别封装

```js
var util = {
	get: function (url, query, callback, isJson) {
		if (query) {
			url += "?";
			for (var key in query) {
				url += `${key}=${query[key]}&`;
			}
			// 取出最后多余的 &
			url = url.slice(0, -1);
		}

		var xhr = new XMLHttpRequest();
		xhr.open("get", url);
		xhr.send();
		xhr.onreadystatechange = function () {
			if (xhr.readyState === 4) {
				if (xhr.status === 200) {
					var res = isJson ? JSON.parse(xhr.responseText) : xhr.responseText;
					callback(res);
				}
			}
		};
	},
	post: function (url, query, callback, isJson) {
		// 如果有参数，把参数拼接起来
		var str = "";
		if (query) {
			for (var key in query) {
				str += `${key}=${query[key]}&`;
			}
			// 取出最后多余的 &
			str = str.slice(0, -1);
		}

		var xhr = new XMLHttpRequest();
		xhr.open("post", url);
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xhr.send(str);
		xhr.onreadystatechange = function () {
			if (xhr.readyState === 4) {
				if (xhr.status === 200) {
					var res = isJson ? JSON.parse(xhr.responseText) : xhr.responseText;
					callback(res);
				}
			}
		};
	},
	// params: object ： { method, url, query, callback, isJson }
	ajax: function (params) {
		var xhr = new XMLHttpRequest();
		if (params.method.toLowerCase() === "get") {
			if (params.query) {
				params.url += "?";
				for (var key in params.query) {
					params.url += `${key}=${params.query[key]}&`;
				}
				params.url = params.url.slice(0, -1);
			}
			xhr.open("get", params.url);
			xhr.send();
		} else {
			// post
			var str = "";
			if (params.query) {
				for (var key in params.query) {
					str += `${key}=${params.query[key]}&`;
				}
				str = str.slice(0, -1);
			}
			xhr.open("post", params.url);
			xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			xhr.send(str);
		}
		xhr.onreadystatechange = function () {
			if (xhr.readyState === 4) {
				if (xhr.status === 200) {
					var resp = params.isJson
						? JSON.parse(xhr.responseText)
						: xhr.responseText;
					params.callback(resp);
				}
			}
		};
	},
};
```

## 6、响应数据格式

JSON

body

data

FormData

## 7、ajax 实战

- 段子列表和查看作者

  - 列表接口：[开放 API-2.0](https://api.apiopen.top/getJoke)
  - 详情接口：[https://api.apiopen.top/getSingleJoke?sid=段子 id](https://api.apiopen.top/getSingleJoke?sid=%E6%AE%B5%E5%AD%90id)

- 接口的使用

  - util.js：封装好的 ajax

    ```js
    var util = {
    	get: function (url, query, callback, isJson) {
    		if (query) {
    			url += "?";
    			for (var key in query) {
    				url += `${key}=${query[key]}&`;
    			}
    			// 取出最后多余的 &
    			url = url.slice(0, -1);
    		}

    		var xhr = new XMLHttpRequest();
    		xhr.open("get", url);
    		xhr.send();
    		xhr.onreadystatechange = function () {
    			if (xhr.readyState === 4) {
    				if (xhr.status === 200) {
    					var res = isJson
    						? JSON.parse(xhr.responseText)
    						: xhr.responseText;
    					callback(res);
    				}
    			}
    		};
    	},
    	post: function (url, query, callback, isJson) {
    		// 如果有参数，把参数拼接起来
    		var str = "";
    		if (query) {
    			for (var key in query) {
    				str += `${key}=${query[key]}&`;
    			}
    			// 取出最后多余的 &
    			str = str.slice(0, -1);
    		}

    		var xhr = new XMLHttpRequest();
    		xhr.open("post", url);
    		xhr.setRequestHeader(
    			"Content-Type",
    			"application/x-www-form-urlencoded"
    		);
    		xhr.send(str);
    		xhr.onreadystatechange = function () {
    			if (xhr.readyState === 4) {
    				if (xhr.status === 200) {
    					var res = isJson
    						? JSON.parse(xhr.responseText)
    						: xhr.responseText;
    					callback(res);
    				}
    			}
    		};
    	},
    	// params: object ： { method, url, query, callback, isJson }
    	ajax: function (params) {
    		var xhr = new XMLHttpRequest();
    		if (params.method.toLowerCase() === "get") {
    			if (params.query) {
    				params.url += "?";
    				for (var key in params.query) {
    					params.url += `${key}=${params.query[key]}&`;
    				}
    				params.url = params.url.slice(0, -1);
    			}
    			xhr.open("get", params.url);
    			xhr.send();
    		} else {
    			// post
    			var str = "";
    			if (params.query) {
    				for (var key in params.query) {
    					str += `${key}=${params.query[key]}&`;
    				}
    				str = str.slice(0, -1);
    			}
    			xhr.open("post", params.url);
    			xhr.setRequestHeader(
    				"Content-Type",
    				"application/x-www-form-urlencoded"
    			);
    			xhr.send(str);
    		}
    		xhr.onreadystatechange = function () {
    			if (xhr.readyState === 4) {
    				if (xhr.status === 200) {
    					var resp = params.isJson
    						? JSON.parse(xhr.responseText)
    						: xhr.responseText;
    					params.callback(resp);
    				}
    			}
    		};
    	},
    };
    ```

  - index.html：请求发起

    ```html
    <!DOCTYPE html>
    <html lang="en">
    	<head>
    		<meta charset="UTF-8" />
    		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
    		<title>段子查询系统</title>
    		<script src="./util.js"></script>
    	</head>
    
    	<body>
    		<ul id="wrap"></ul>
    		<script>
    			// 列表接口：https://api.apiopen.top/getJoke
    			// 详情接口：https://api.apiopen.top/getSingleJoke?sid=段子id
    
    			// 页面以开始就查询段子列表
    			util.get(
    				"https://api.apiopen.top/getJoke",
    				null,
    				function (resp) {
    					console.log(resp);
    					var html = "";
    					// 拼接li字符串显示在ul里
    					resp.result.forEach(function (item) {
    						html += `
              <li>
                <h3>${item.text}</h3>
                <button data-id="${item.sid}">查看作者</button>
              </li>
            `;
    					});
    					document.querySelector("#wrap").innerHTML = html;
    				},
    				true
    			);
    
    			// 事件委托 给button添加事件
    			document.querySelector("#wrap").onclick = function (e) {
    				var target = e.target;
    				if (target.tagName === "BUTTON") {
    					// 从按钮的自定义属性上取到sid
    					var sid = target.getAttribute("data-id");
    					util.get(
    						"https://api.apiopen.top/getSingleJoke",
    						{
    							sid: sid,
    						},
    						function (resp) {
    							console.log(resp);
    							var name = resp.result.name;
    							// 找到父级li，插入作者信息
    							var b = document.createElement("b");
    							b.innerHTML = name;
    							target.parentNode.appendChild(b);
    						},
    						true
    					);
    				}
    			};
    		</script>
    	</body>
    </html>
    ```

## 8、Promise

### promise 作用

- romise：承诺，服务员承诺会把菜端上来

- Promise 是 ES6 新增的一个对象，我们可以使用 promise 来许下一个承诺。

  - 这个对象有三种状态：Pending（进行中）、Resolved（已完成，又称 Fulfilled）和 Rejected（已失败）。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。

- Promise 的作用：把异步代码写成同步形式

### promise 使用

Promise 的封装

```js
function foo () {
 return new Promise(function () {
 ……
 })
}

foo().then(function () {
 ……
})
```

### 封装基于 promise 的 get 请求

util.js：封装好的 ajax

```js
var util = {
	get: function (url, query, callback, isJson) {
		if (query) {
			url += "?";
			for (var key in query) {
				url += `${key}=${query[key]}&`;
			}
			// 取出最后多余的 &
			url = url.slice(0, -1);
		}

		var xhr = new XMLHttpRequest();
		xhr.open("get", url);
		xhr.send();
		xhr.onreadystatechange = function () {
			if (xhr.readyState === 4) {
				if (xhr.status === 200) {
					var res = isJson ? JSON.parse(xhr.responseText) : xhr.responseText;
					callback(res);
				}
			}
		};
	},
	post: function (url, query, callback, isJson) {
		// 如果有参数，把参数拼接起来
		var str = "";
		if (query) {
			for (var key in query) {
				str += `${key}=${query[key]}&`;
			}
			// 取出最后多余的 &
			str = str.slice(0, -1);
		}

		var xhr = new XMLHttpRequest();
		xhr.open("post", url);
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xhr.send(str);
		xhr.onreadystatechange = function () {
			if (xhr.readyState === 4) {
				if (xhr.status === 200) {
					var res = isJson ? JSON.parse(xhr.responseText) : xhr.responseText;
					callback(res);
				}
			}
		};
	},
	// params: object ： { method, url, query, callback, isJson }
	ajax: function (params) {
		var xhr = new XMLHttpRequest();
		if (params.method.toLowerCase() === "get") {
			if (params.query) {
				params.url += "?";
				for (var key in params.query) {
					params.url += `${key}=${params.query[key]}&`;
				}
				params.url = params.url.slice(0, -1);
			}
			xhr.open("get", params.url);
			xhr.send();
		} else {
			// post
			var str = "";
			if (params.query) {
				for (var key in params.query) {
					str += `${key}=${params.query[key]}&`;
				}
				str = str.slice(0, -1);
			}
			xhr.open("post", params.url);
			xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			xhr.send(str);
		}
		xhr.onreadystatechange = function () {
			if (xhr.readyState === 4) {
				if (xhr.status === 200) {
					var resp = params.isJson
						? JSON.parse(xhr.responseText)
						: xhr.responseText;
					params.callback(resp);
				}
			}
		};
	},
	// 基于promise的get请求
	// return new Promise
	fetch: function (url, query, isJson) {
		if (query) {
			url += "?";
			for (var key in query) {
				url += `${key}=${query[key]}&`;
			}
			url = url.slice(0, -1);
		}
		return new Promise(function (resolve, reject) {
			var xhr = new XMLHttpRequest();
			xhr.open("get", url);
			xhr.send();
			xhr.onreadystatechange = function () {
				if (xhr.readyState === 4) {
					if (xhr.status === 200) {
						var resp = isJson ? JSON.parse(xhr.responseText) : xhr.responseText;
						resolve(resp);
					} else {
						reject();
					}
				}
			};
		});
	},
};
```

请求：

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Document</title>
		<script src="./util.js"></script>
	</head>
	<body>
		<button onclick="sendMsg()">发送请求</button>
		<script>
			function sendMsg() {
				// 把异步代码写成同步形式，不用传回调函数了，而是在then里处理成功
				util.fetch("./data.php", { id: 3 }, true).then(function (resp) {
					console.log(resp);
				});
			}
		</script>
	</body>
</html>
```

### 使用 promise 改造段子列表

util.js：封装好的 ajax

```js
var util = {
	get: function (url, query, callback, isJson) {
		if (query) {
			url += "?";
			for (var key in query) {
				url += `${key}=${query[key]}&`;
			}
			// 取出最后多余的 &
			url = url.slice(0, -1);
		}

		var xhr = new XMLHttpRequest();
		xhr.open("get", url);
		xhr.send();
		xhr.onreadystatechange = function () {
			if (xhr.readyState === 4) {
				if (xhr.status === 200) {
					var res = isJson ? JSON.parse(xhr.responseText) : xhr.responseText;
					callback(res);
				}
			}
		};
	},
	post: function (url, query, callback, isJson) {
		// 如果有参数，把参数拼接起来
		var str = "";
		if (query) {
			for (var key in query) {
				str += `${key}=${query[key]}&`;
			}
			// 取出最后多余的 &
			str = str.slice(0, -1);
		}

		var xhr = new XMLHttpRequest();
		xhr.open("post", url);
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xhr.send(str);
		xhr.onreadystatechange = function () {
			if (xhr.readyState === 4) {
				if (xhr.status === 200) {
					var res = isJson ? JSON.parse(xhr.responseText) : xhr.responseText;
					callback(res);
				}
			}
		};
	},
	// params: object ： { method, url, query, callback, isJson }
	ajax: function (params) {
		var xhr = new XMLHttpRequest();
		if (params.method.toLowerCase() === "get") {
			if (params.query) {
				params.url += "?";
				for (var key in params.query) {
					params.url += `${key}=${params.query[key]}&`;
				}
				params.url = params.url.slice(0, -1);
			}
			xhr.open("get", params.url);
			xhr.send();
		} else {
			// post
			var str = "";
			if (params.query) {
				for (var key in params.query) {
					str += `${key}=${params.query[key]}&`;
				}
				str = str.slice(0, -1);
			}
			xhr.open("post", params.url);
			xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			xhr.send(str);
		}
		xhr.onreadystatechange = function () {
			if (xhr.readyState === 4) {
				if (xhr.status === 200) {
					var resp = params.isJson
						? JSON.parse(xhr.responseText)
						: xhr.responseText;
					params.callback(resp);
				}
			}
		};
	},
	// 基于promise的get请求
	// return new Promise
	fetch: function (url, query, isJson) {
		if (query) {
			url += "?";
			for (var key in query) {
				url += `${key}=${query[key]}&`;
			}
			url = url.slice(0, -1);
		}
		return new Promise(function (resolve, reject) {
			var xhr = new XMLHttpRequest();
			xhr.open("get", url);
			xhr.send();
			xhr.onreadystatechange = function () {
				if (xhr.readyState === 4) {
					if (xhr.status === 200) {
						var resp = isJson ? JSON.parse(xhr.responseText) : xhr.responseText;
						resolve(resp);
					} else {
						reject();
					}
				}
			};
		});
	},
};
```

html：

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>段子查询系统</title>
		<script src="./util.js"></script>
	</head>
	<body>
		<ul id="wrap"></ul>
		<script>
			// 列表接口：https://api.apiopen.top/getJoke
			// 详情接口：https://api.apiopen.top/getSingleJoke?sid=段子id

			// 页面以开始就查询段子列表
			// fetch方法，在then里来写成功之后的逻辑
			util
				.fetch("https://api.apiopen.top/getJoke", null, true)
				.then(function (resp) {
					var html = "";
					// 拼接li字符串显示在ul里
					resp.result.forEach(function (item) {
						html += `
          <li>
            <h3>${item.text}</h3>
            <button data-id="${item.sid}">查看作者</button>
          </li>
        `;
					});
					document.querySelector("#wrap").innerHTML = html;
				});

			// 事件委托给button添加事件
			document.querySelector("#wrap").onclick = function (e) {
				var target = e.target;
				if (target.tagName === "BUTTON") {
					// 从按钮的自定义属性上取到sid
					var sid = target.getAttribute("data-id");

					util
						.fetch("https://api.apiopen.top/getSingleJoke", { sid: sid }, true)
						.then(function (resp) {
							var name = resp.result.name;
							// 找到父级li，插入作者信息
							var b = document.createElement("b");
							b.innerHTML = name;
							target.parentNode.appendChild(b);
						});
				}
			};
		</script>
	</body>
</html>
```

改造成 promise 对比两者区别

## 9、使用 fetch

- 介绍 fetch
  - ES6，无需插件支持
  - 获取资源的接口
  - 比 XMLHttpRequest 更好用
  - 返回一个 promise
  - 避免回调
  - 并不会因为状态码错误而 reject
- 使用 fetch

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>段子查询系统</title>
	</head>

	<body>
		<ul id="wrap"></ul>
		<script>
			// 列表接口：https://api.apiopen.top/getJoke
			// 详情接口：https://api.apiopen.top/getSingleJoke?sid=段子id

			// 页面以开始就查询段子列表
			// fetch方法，在then里来写成功之后的逻辑
			fetch("https://api.apiopen.top/getJoke")
				.then(function (resp) {
					return resp.json();
				})
				.then(function (resp) {
					var html = "";
					// 拼接li字符串显示在ul里
					resp.result.forEach(function (item) {
						html += `
            <li>
              <h3>${item.text}</h3>
              <button data-id="${item.sid}">查看作者</button>
            </li>
          `;
					});
					document.querySelector("#wrap").innerHTML = html;
				});

			// 事件委托给button添加事件
			document.querySelector("#wrap").onclick = function (e) {
				var target = e.target;
				if (target.tagName === "BUTTON") {
					// 从按钮的自定义属性上取到sid
					var sid = target.getAttribute("data-id");

					fetch(`https://api.apiopen.top/getSingleJoke?sid=${sid}`)
						.then(function (resp) {
							return resp.json();
						})
						.then(function (resp) {
							var name = resp.result.name;
							// 找到父级li，插入作者信息
							var b = document.createElement("b");
							b.innerHTML = name;
							target.parentNode.appendChild(b);
						});
				}
			};

			const data = {
				id: 1,
				title: "aaa",
			};
			fetch(url, {
				body: JSON.stringify(data),
				method: "POST",
			})
				.then((response) => response.json())
				.then((myJson) => {
					console.log(muJson);
				});
		</script>
	</body>
</html>
```

## 10、jQuery 中的 AJAX

jQuery 中有一套专门针对 AJAX 的封装，功能十分完善，经常使用，需要着重注意。

> 参考：
>
> <http://www.jquery123.com/category/ajax/>
>
> <http://www.w3school.com.cn/jquery/jquery_ref_ajax.asp>

### $.ajax

```js
$.ajax({
	url: "./get.php",
	type: "get",
	dataType: "json",
	data: { id: 1 },
	beforeSend: function (xhr) {
		console.log("before send");
	},
	success: function (data) {
		console.log(data);
	},
	error: function (err) {
		console.log(err);
	},
	complete: function () {
		console.log("request completed");
	},
});
```

常用选项参数介绍：

- url：请求地址

- type：请求方法，默认为 get

- dataType：服务端响应数据类型

- contentType：请求体内容类型，默认 application/x-www-form-urlencoded

- data：需要传递到服务端的数据，如果 GET 则通过 URL 传递，如果 POST 则通过请求体传递

- timeout：请求超时时间

- beforeSend：请求发起之前触发

- success：请求成功之后触发（响应状态码 200）

- error：请求失败触发

- complete：请求完成触发（不管成功与否）

### $.get

- GET 请求快捷方法

### $.post

- POST 请求快捷方法

### 全局事件处理

<http://www.jquery123.com/category/ajax/global-ajax-event-handlers/>

## 11、浏览器同源策略，跨域访问

同源策略是浏览器的一种安全策略，所谓同源是指域名，协议，端口完全相同，只有同源的地址才可以相互通过

AJAX 的方式请求。

同源或者不同源说的是两个地址之间的关系，不同源地址之间请求我们称之为跨域请求

什么是同源？例如：<http://www.example.com/detail.html> 与一下地址对比

- 浏览器的安全策略

- 非同源数据不能直接互相访问

- **必须协议、域名、端口号三者完全一致才叫同源**

- | 对比地址                                 | 是否同源 | 原因           |
  | ---------------------------------------- | -------- | -------------- |
  | http://api.example.com/detail.html       | 不同源   | 域名不同       |
  | https://www.example.com/detail.html      | 不同源   | 协议不同       |
  | http://www.example.com:8080/detail.html  | 不同源   | 端口不同       |
  | http://api.example.com:8080/detail.html  | 不同源   | 域名、端口不同 |
  | https://api.example.com/detail.html      | 不同源   | 协议、域名不同 |
  | https://www.example.com:8080/detail.html | 不同源   | 端口、协议不同 |
  | http://www.example.com/other.html        | 同源     | 只是目录不同   |

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Document</title>
	</head>
	<body>
		<button onclick="sendMsg()">发送请求</button>
		<script>
			function sendMsg() {
				// 通过wamp直接localhost打开是可以的，因为是同源
				// 但是如果直接编辑器里打开或者127.0.0.1打开就不行了，因为不同源
				fetch("http://localhost/data.php")
					.then((resp) => resp.json())
					.then((resp) => {
						console.log(resp);
					});
			}
		</script>
	</body>
</html>
```

### cors 跨域-后端设置跨域

Cross Origin Resource Share，跨域资源共享

- 后端设置响应头，cors 允许跨域访问

  - Cross origin resource sharing 跨域资源共享

    php 后端设置响应头:

  - ```php
    header('Access-Control-Allow-Origin:*');
    ```

- 上面别人使用的开放接口，别人就设置了 cors 的，所以可以直接访问

> 这种方案无需客户端作出任何变化（客户端不用改代码），只是在被请求的服务端响应的时候添加一个 Access-Control-Allow-Origin 的响应头，表示这个资源是否允许指定域请求。

### jsonp 跨域-前端后端配合跨域

- jsonp 跨域原理

  - JSON with Padding，是一种借助于 script 标签发送跨域请求的技巧。

    其原理就是在客户端借助 script 标签请求服务端的一个动态网页（php 文件），服务端的这个动态网页返回一

    段带有函数调用的 JavaScript 全局函数调用的脚本，将原本需要返回给客户端的数据传递进去。

    以后绝大多数情况都是采用 JSONP 的手段完成不同源地址之间的跨域请求

- 实现 jsonp 跨域

  - 利用**src 属性**的开放性原则

    - ```html
      <script src=""></script>
      <img src=""></img>
      ```

  - 利用 script 标签在引入外部 JS 时不受同源策略限制的特性，来实现跨域。(src 的开放性原则)

  - JSONP 只能处理 GET 请求方式的跨域

    - 服务器端构建一个字符串：字符串中的内容是能够在 JS 中执行的函数调用的结构

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Document</title>
	</head>
	<body>
		<!-- <img src="http://t8.baidu.com/it/u=3571592872,3353494284&fm=79&app=86&f=JPEG?w=1200&h=1290" > -->

		<!-- <script src="http://code.jquery.com/jquery-3.4.1.min.js"></> -->

		<!-- <script src="http://localhost/data.js"></script> -->

		<!-- <script src="http://localhost/data.txt"></script> -->

		<!-- 无论文件的后缀名是什么，请求回来的内容都会作为js代码来执行 -->
		<script>
			// jsonp接口后端返回的是一个函数的调用
			// jsonp只能处理get类型的跨域
			function fn1(resp) {
				console.log(resp);
			}
		</script>
		<script src="http://localhost/data.php?cb=fn1"></script>
	</body>
</html>
```

php 代码：data.php

```php
<?php
  $cb = $_GET['cb'];
  // echo 'console.log("php")';
  // php的双引号可以直接解析变量，单引号不行
  echo "$cb(123)";

?>
```

data.text

```js
console.log("txt");
```

data.js

```js
console.log("data");
```

总结一下：由于 XMLHttpRequest 无法发送不同源地址之间的跨域请求，所以我们必须要另寻他法，script 这种方案就是我们最终选择的方式，我们把这种方式称之为 JSONP，如果你不了解原理，先记住怎么用，多用一段时间再来看原理。

### jsonp 跨域实战

- 百度搜索接口实现搜索效果

  [https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=关键字&cb=回调函数名](https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=%E5%85%B3%E9%94%AE%E5%AD%97&cb=%E5%9B%9E%E8%B0%83%E5%87%BD%E6%95%B0%E5%90%8D)

例子：

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Document</title>
	</head>
	<body>
		<div>
			<img
				src="https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png"
				alt=""
			/>
			<input type="text" id="search" />
			<ul id="list"></ul>
		</div>
		<script>
			// https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=关键字&cb=回调函数名
			var search = document.querySelector("#search");
			var list = document.querySelector("#list");

			search.onkeyup = function () {
				var text = this.value;
				// 这里需要一个script标签发起请求
				var script = document.createElement("script");
				script.src = `https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=${text}&cb=fn`;
				document.body.appendChild(script); // 把script标签的src属性用做jsonp请求使用
				document.body.removeChild(script); // 如果不移除会生成太多script标签
			};

			list.onmousedown = function (e) {
				var target = e.target;
				// 点击相应的li标签
				if (target.tagName === "LI") {
					search.value = target.innerHTML;
					list.innerHTML = "";
				}
			};
			// input失去焦点：搜索的数据清空
			search.onblur = function () {
				list.innerHTML = "";
			};

			function fn(resp) {
				console.log(resp);
				var html = "";
				resp.s.forEach((element) => {
					html += `<li>${element}</li>`;
				});
				list.innerHTML = html;
			}
		</script>
	</body>
</html>
```

## 前端常用的几种请求方式

> XMLHttpRequest、Fetch、Axios、WebSocket优缺点和使用场景

前端数据请求方式主要包括XMLHttpRequest、Fetch、Axios、WebSocket等。这些请求方式各有特点，适用于不同的场景。本文将从综合性能、优缺点、最佳使用场景以及使用方式的角度对这些数据请求方式进行分析。

### XMLHttpRequest（XHR）

XMLHttpRequest 是前端最早使用的数据请求方式。它支持异步请求，可以通过设置回调函数处理请求完成后的数据。

#### 性能：XHR 在较早的浏览器中表现良好，但随着浏览器性能的提升，其性能瓶颈逐渐凸显。相较于其他请求方式，XHR 的性能稍逊一筹。

#### 优点：

- **广泛的浏览器支持**：尽管现代浏览器更推荐使用 Fetch API，但 XMLHttpRequest 仍然得到了几乎所有浏览器的支持，包括一些较旧的版本。
- **事件驱动**：XMLHttpRequest 使用事件驱动模型，提供了 `onreadystatechange`、`onload`、`onerror` 等事件，可以方便地监听请求的不同阶段。
- **支持上传进度监控**：XMLHttpRequest 提供了 `upload` 属性，可以用来监控文件上传的进度。
- **支持请求和响应头访问**：可以通过 `setRequestHeader` 和 `getResponseHeader` 方法来设置和获取请求和响应的头信息。
- **支持超时设置**：可以通过 `timeout` 属性设置请求的超时时间，并在超时后触发 `ontimeout` 事件。
- **支持同步请求**：虽然不推荐，但 XMLHttpRequest 支持同步请求，这在某些特定的场景下可能有用。

#### 缺点：

- **语法复杂**：相比于 Fetch API，XMLHttpRequest 的语法更加复杂，使用起来不够直观。
- **基于回调**：XMLHttpRequest 使用回调函数来处理响应，这可能导致回调地狱（callback hell），代码难以维护。
- **不支持 Promise**：XMLHttpRequest 不直接支持 Promise，需要手动封装或使用第三方库来实现 Promise 风格的调用。
- **取消请求不够优雅**：虽然 XMLHttpRequest 支持通过 `abort` 方法取消请求，但这并不是一个优雅的解决方案，因为它会导致请求被突然终止。
- **跨域问题**：默认情况下，XMLHttpRequest 不支持跨域请求，需要服务器配置 CORS 头或者在客户端使用代理。

#### 最佳使用场景：对于一些老旧项目或者需要与多种后端系统交互的场景，使用 XHR 可以保证兼容性。

#### 使用方式：

```
var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://xxx', true);
xhr.onreadystatechange = function() {
  if (xhr.readyState == 4 && xhr.status == 200) {
    var data = JSON.parse(xhr.responseText);
    console.log(data);
  }
};
xhr.send();
```

### Fetch

Fetch 是一个现代的、基于 Promise 的 HTTP 客户端，用于浏览器和 Node.js。它提供了一种更简洁、更易于理解的方式来处理网络请求。

#### 性能：Fetch 在现代浏览器中性能较好，相较于 XHR 有所提升。

#### 优点

- **简洁的语法**：Fetch API 提供了一种更简洁、更易读的语法，使得发送请求和处理响应变得更加直观。
- **基于 Promise**：Fetch API 返回 Promises，这使得异步操作更加易于管理和链式调用。
- **内置的错误处理**：当网络请求出现问题时，Fetch API 会返回一个带有错误状态的 Promise，可以方便地使用 `.catch()` 方法进行处理。
- **流式响应**：Fetch API 支持流式响应，这意味着你可以处理正在下载的数据，而不必等待整个响应体下载完成。
- **跨域支持**：Fetch API 天然支持 CORS（跨源资源共享），使得跨域请求更加容易实现。
- **请求和响应对象**：Fetch API 提供了 Request 和 Response 对象，这些对象可以让你更容易地控制请求的行为和访问响应的内容。

#### 缺点：

- **默认不携带 Cookie**：Fetch API 在默认情况下不会发送同源的 Cookie，这可能导致一些基于 Cookie 的认证机制出现问题。可以通过设置请求的 `credentials` 选项来解决这个问题。
- **不支持超时处理**：Fetch API 本身不提供请求超时的功能。不过，可以通过包装 Promise 来实现超时逻辑。
- **旧浏览器兼容性**：Fetch API 在一些旧版本的浏览器中不被支持，可能需要使用 polyfill。
- **错误处理不够直观**：Fetch API 不会将 HTTP 状态码为 4xx 或 5xx 的响应视为错误，这意味着你需要在 `.then()` 方法中手动检查响应状态。
- **取消请求需要额外的 API**：虽然 Fetch API 本身不支持取消请求，但可以通过结合使用 `AbortController` 来实现。
- **上传进度监控**：Fetch API 不提供上传进度的监控，而 XMLHttpRequest 支持。

#### 最佳使用场景：现代浏览器中，需要简洁语法和链式调用的场景。

#### 使用方式：

```
fetch('https://xxx')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

### Axios

Axios 是一个基于 Promise 的 HTTP 客户端，用于浏览器和 Node.js。它扩展了 Fetch API，提供了更丰富的功能。

#### 性能：Axios 在现代浏览器中性能较好，与 Fetch 相当。

#### 优点：

- **基于 Promise 的 API**：Axios 使用 Promise，使得异步操作更加简洁和易于管理，支持 `.then` 和 `.catch` 方法。
- **拦截器支持**：Axios 允许你添加请求和响应拦截器，这些拦截器可以在请求发送之前或响应到达之前进行自定义处理。
- **转换请求数据和响应数据**：Axios 允许你在请求发送之前转换请求数据（transformRequest）和在响应到达之前转换响应数据（transformResponse）。
- **取消请求**：Axios 支持取消请求，通过 CancelToken 实现，这是 XMLHttpRequest 所缺乏的特性。
- **自动转换 JSON 数据**：Axios 会自动将 JavaScript 对象转换为 JSON 字符串当发送请求，并将响应中的 JSON 数据自动转换为 JavaScript 对象。
- **客户端支持防御 XSRF**：Axios 提供了防御 XSRF（跨站请求伪造）的功能。
- **错误处理**：Axios 提供了统一的错误处理机制，当请求失败时，会在 `.catch` 中捕获到错误。
- **创建实例**：Axios 允许创建实例，并在实例上设置默认配置，这对于多次请求使用相同配置非常有用。

#### 缺点：

- **额外的依赖**：使用 Axios 意味着你的项目将依赖于一个第三方库，这可能会增加项目的复杂性。
- **浏览器兼容性**：虽然 Axios 支持大多数现代浏览器，但不支持 IE9 及以下版本，如果你需要支持这些旧浏览器，可能需要引入额外的 polyfill。
- **体积**：相比于原生 Fetch API，Axios 的体积更大，如果你只使用它的部分功能，可能会感觉不够精简。
- **学习曲线**：对于初学者来说，Axios 提供了很多高级功能，这可能需要一个学习曲线来理解和正确使用它们。
- **社区和维护**：虽然 Axios 很受欢迎，但它的维护和更新速度可能不如一些官方的 API 快，而且社区支持也可能有限。

#### 最佳使用场景：需要在项目中进行大量 HTTP 请求，且需要丰富配置和取消请求功能的场景；易与 Vue.js 集成。

#### 使用方式：

```
axios.get('https://xxx')
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.log('Error:', error);
  });
```

### WebSocket

WebSocket 是一种网络通信协议，支持全双工通信。在前端，WebSocket 主要用于与后端实时交互数据。

#### 性能：WebSocket 提供了持续的 TCP 连接，减少了请求次数，提高了性能。

#### 优点：

- **实时通信**：WebSocket 提供了实时双向通信的能力，服务器可以随时向客户端发送消息，这对于需要实时更新的应用（如实时聊天、游戏、实时数据监控等）非常有用。
- **减少服务器负载**：与传统的轮询（polling）或长轮询（long polling）相比，WebSocket 减少了不必要的 HTTP 请求，从而减轻了服务器的负载。
- **保持连接状态**：一旦 WebSocket 连接建立，连接会保持开放状态，直到客户端或服务器关闭连接，这意味着不需要每次通信都重新建立连接。
- **轻量级协议**：WebSocket 协议本身相对简单，头部开销较小，这使得数据传输更加高效。
- **支持二进制数据**：WebSocket 不仅支持文本数据，还支持二进制数据，这对于需要传输图像、音频、视频等二进制数据的应用非常有用。

#### 缺点：

- **浏览器支持**：尽管现代浏览器普遍支持 WebSocket，但一些较旧的浏览器可能不支持，这意味着你可能需要考虑兼容性问题。
- **服务器实现复杂**：相比于基于 HTTP 的服务，实现 WebSocket 服务器需要更多的逻辑来处理连接的维护、消息的广播等。
- **需要额外的逻辑**：WebSocket 本身并不提供消息的可靠传输，如果需要确保消息的可靠性，开发者需要自己实现重传机制。
- **跨域问题**：WebSocket 同样受到同源策略的限制，跨域 WebSocket 连接需要服务器支持相应的 CORS（跨源资源共享）设置。
- **连接管理**：WebSocket 连接需要有效管理，包括连接的建立、保持、重连和关闭等，这可能会增加应用的复杂性。
- **负载均衡器的支持**：在使用 WebSocket 时，负载均衡器需要能够处理长连接，这可能会限制某些云服务或代理服务器的使用。

#### 最佳使用场景：需要实时交互数据的场景，如聊天应用、在线游戏等。

```
var socket = new WebSocket('ws://api.example.com/data');
socket.onopen = function(event) {
  // 连接成功
};
socket.onmessage = function(event) {
  // 收到消息
  var data = JSON.parse(event.data);
  console.log(data);
};
socket.onerror = function(error) {
  // 连接出错
  console.log('Error:', error);
};
socket.onclose = function(event) {
  // 连接关闭
};
```

### 性能比较

在比较性能时，需要考虑多个方面，包括执行速度、内存使用、兼容性、易用性和功能特性。下面是一个简化的表格，概述了 XMLHttpRequest、Fetch API、Axios 和 WebSocket 这四种方式的性能比较：

| 特性/方式     | XMLHttpRequest                 | Fetch API                    | Axios                                | WebSocket                                |
| :------------ | :----------------------------- | :--------------------------- | :----------------------------------- | :--------------------------------------- |
| 执行速度      | 中等                           | 快                           | 快                                   | 非常快（长连接）                         |
| 内存使用      | 中等                           | 低                           | 低                                   | 低（长连接）                             |
| 兼容性        | 旧浏览器可能需要 ActiveXObject | 新浏览器                     | 新浏览器，旧浏览器需要 polyfill      | 新浏览器，旧浏览器需要 polyfill          |
| 易用性        | 复杂的 API，基于回调           | 简洁的 API，基于 Promise     | 简洁的 API，基于 Promise，提供拦截器 | 简单的 API，但需要处理连接管理和消息格式 |
| 功能特性      | 事件驱动，支持同步请求         | 基于 Promise，不支持同步请求 | 丰富的配置，拦截器，自动转换 JSON    | 实时双向通信，不支持 HTTP 请求方法       |
| 跨域请求      | 需要服务器支持 CORS            | 默认支持 CORS                | 默认支持 CORS                        | 需要服务器支持 CORS                      |
| 取消请求      | 支持 `abort` 方法              | 结合 `AbortController` 使用  | 结合 `AbortController` 使用          | 通过关闭连接取消                         |
| 自动转换 JSON | 不支持                         | 支持                         | 支持                                 | 不支持，需要手动处理                     |

### 最佳使用场景

- XMLHttpRequest (XHR): 适用于需要广泛兼容性的老旧系统或需要与多种后端系统交互的场景。
- Fetch API: 适用于现代浏览器中，需要简洁语法和链式调用的场景。
- Axios: 适用于需要在项目中进行大量HTTP请求，且需要丰富配置和取消请求功能的场景，如与后端系统交互频繁的单页应用（SPA）。
- WebSocket: 适用于需要实时交互数据的场景，如实时聊天应用、在线游戏等。

总结：在选择前端数据请求方式时，应根据项目的具体需求、兼容性要求以及性能考虑来决定使用哪种方法。每种方法都有其优点和局限性，理解它们的特点，可以帮助开发者更好地构建高效、稳定的前端应用。
