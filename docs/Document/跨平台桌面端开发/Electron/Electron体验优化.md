# Electron 体验优化

官网文档：[性能 | Electron (electronjs.org)](https://www.electronjs.org/zh/docs/latest/tutorial/performance)

## 流畅度

启动快

交互快

### 启动时性能优化

- 优先加载核心功能，其他非核心流程模块动态加载
- web 性能优化
- 多进程多线程技术：BrowserWindow、BrowserView、ChildProcess、WebWorker
- 打包选项：`asar: true` 可以轻微加快 require 的速度
- 在启动的时候可以使用像 V8 的 snapshot，可以减少我们代码在启动时候编译的过程，启动应用的时候，只需要直接反序列化一下我们的 V8 snapshot，就可以启动（Atom 就是使用这个方法做性能优化）

### 运行时性能优化技巧

- 让主进程保持轻量(使用一个渲染进程处理密集计算)
  - 渲染进程跟主进程有 SyncIPC 操作
  - 主进程卡，UI 就会阻塞
- 不要使用 remote （同步 IPC）
- 使用 requestldleCallback.
  - 这个方法将在浏览器的空闲的时间才会调用我们的函数排队，我们可以将一些不紧急或者低优的任务，通过 requestldleCallback 来去执行，通过使用这个方法，我们的用户就会在空闲的时间段才会被执行，这样子我们就不会影响到我们的关键事件
  - 比如说像检查更新：很经典的做法就是每隔 10 分钟去轮询一次，使用 requestldleCallback，保障我们在检查更新的时候不要影响到我们的主任务
- 窗口复用
  - 在应用中，我们保留一个没有被使用的窗口，等到我们真正去需要窗口的时候，我们可以直接唤起这个窗口，这样子的话我们就可以减少整个创建的过程

## Native 化

Native 在用户认为：就是平台的仿真度

### 白屏

#### 为什么要关注白屏?

- 2 秒内加载完成，超过 3 秒以后 40%用户会离开你
- Google 加载时间从 0.4 秒提升到 0.9 秒导致丢失了 20%流量和广告收入
- 亚马逊页面加载时间每增加 100 毫秒就意味着 1%的销售额损失
- 永远不出现白屏是 Native PC 的一个必备特性

#### Electron 应用为什么要关注白屏?

##### electron 应用加载流程

##### 1.应用启动

app.on('will-finish-launching')

##### 2.初始化完成

app.on('ready')

##### 3.窗口建立完成

app.on('browser-window-created')

##### 4.窗口显示

win.on('show')

##### 5.页面渲染

app.on('web-contents-created')

webContents.on('dom-ready')

window.onload

webContentson('did-finish-load')

browserWindow.on('ready-to-show')

---

页面解析流程

- 1.preload 解析
- 2.解析 html 结构
- 3.加载外部脚本和样式表文件
- 4.解析并执行脚本
- 5.dom 树构建完成(DOMContentLoaded)
- 6.加载图片等外部文件
- 7.页面加载完毕

### Electron 白屏基本功

- 在 生命周期 `ready-to-show` 时候再显示

- 设置窗口底色

- ```js
  win = new BrowserWindow({
  	width: 600,
  	height: 300,
  	show: false, // 窗口是否在创建时显示
  	webPreferences: {
  		nodeIntegration: true,
  		background: "#e2c29", //  设置背景色
  	},
  });
  // 在这个生命周期再显示
  win.on("ready-to-show", () => {
  	win.show();
  });
  ```

### Electron 中如何优雅地实现白屏时的 占位图 或 加载中

- BrowserView、BrowserWindow、ChildWindow

实现例子

main.js

```js
const { app, BrowserWindow, BrowserView, ipcMain } = require("electron");
const path = require("path");

function createWindow() {
	const mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			preload: path.join(__dirname, "preload.js"),
		},
		show: false,
	});

	let view = new BrowserView();
	mainWindow.setBrowserView(view);
	view.setBounds({ x: 0, y: 0, width: 800, height: 600 });
	// 加载loading页面
	view.webContents.loadFile("loading.html");
	// dom加载完成，显示主窗口
	view.webContents.on("dom-ready", () => {
		console.log("show");
		mainWindow.show();
	});
	// 移除显示loading加载页
	ipcMain.on("stop-loading-main", () => {
		console.log("stop");
		mainWindow.removeBrowserView(view);
	});

	mainWindow.loadFile("index.html");
	// mainWindow.loadURL('https://raw.githubusercontent.com/dengyaolong/electron-loading-window-example/master/index.html')

	mainWindow.webContents.openDevTools();
}

app.on("ready", createWindow);

app.on("window-all-closed", function () {
	if (process.platform !== "darwin") app.quit();
});

app.on("activate", function () {
	if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
```

preload.js

```js
let { ipcRenderer } = require("electron");
window.addEventListener("DOMContentLoaded", () => {
	const replaceText = (selector, text) => {
		const element = document.getElementById(selector);
		if (element) element.innerText = text;
	};

	for (const type of ["chrome", "node", "electron"]) {
		replaceText(`${type}-version`, process.versions[type]);
	}
});

window.stopLoading = function () {
	ipcRenderer.send("stop-loading-main");
};
```

renderer.js

```js
setTimeout(() => {
	window.stopLoading();
}, 1000);
```

index.html

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8" />
		<!-- https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP -->
		<meta
			http-equiv="Content-Security-Policy"
			content="default-src 'self'; script-src 'self'"
		/>
		<meta
			http-equiv="X-Content-Security-Policy"
			content="default-src 'self'; script-src 'self'"
		/>
		<title>Hello World!</title>
	</head>
	<body>
		<h1>Hello World!</h1>
		<script src="./renderer.js"></script>
	</body>
</html>
```

loading.html

```html
<html>
	<head>
		<style>
			body {
				background: white;
				margin: 0;
			}
			.lds-spinner {
				position: absolute;
				top: 0;
				bottom: 0;
				margin: auto;
				left: 0;
				right: 0;
				color: official;
				display: inline-block;
				width: 80px;
				height: 80px;
			}
			.lds-spinner div {
				transform-origin: 40px 40px;
				animation: lds-spinner 1.2s linear infinite;
			}
			.lds-spinner div:after {
				content: " ";
				display: block;
				position: absolute;
				top: 3px;
				left: 37px;
				width: 6px;
				height: 18px;
				border-radius: 20%;
				background: #2196f3;
			}
			.lds-spinner div:nth-child(1) {
				transform: rotate(0deg);
				animation-delay: -1.1s;
			}
			.lds-spinner div:nth-child(2) {
				transform: rotate(30deg);
				animation-delay: -1s;
			}
			.lds-spinner div:nth-child(3) {
				transform: rotate(60deg);
				animation-delay: -0.9s;
			}
			.lds-spinner div:nth-child(4) {
				transform: rotate(90deg);
				animation-delay: -0.8s;
			}
			.lds-spinner div:nth-child(5) {
				transform: rotate(120deg);
				animation-delay: -0.7s;
			}
			.lds-spinner div:nth-child(6) {
				transform: rotate(150deg);
				animation-delay: -0.6s;
			}
			.lds-spinner div:nth-child(7) {
				transform: rotate(180deg);
				animation-delay: -0.5s;
			}
			.lds-spinner div:nth-child(8) {
				transform: rotate(210deg);
				animation-delay: -0.4s;
			}
			.lds-spinner div:nth-child(9) {
				transform: rotate(240deg);
				animation-delay: -0.3s;
			}
			.lds-spinner div:nth-child(10) {
				transform: rotate(270deg);
				animation-delay: -0.2s;
			}
			.lds-spinner div:nth-child(11) {
				transform: rotate(300deg);
				animation-delay: -0.1s;
			}
			.lds-spinner div:nth-child(12) {
				transform: rotate(330deg);
				animation-delay: 0s;
			}
			@keyframes lds-spinner {
				0% {
					opacity: 1;
				}
				100% {
					opacity: 0;
				}
			}
		</style>
	</head>
	<body>
		<div class="lds-spinner">
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	</body>
</html>
```

## 测试 Electron 应用性能

使用 Chrome DevTools Performance

资料：Visual Studio Code - The First Second

- [VS Code 是如何优化启动性能的？-阿里云开发者社区 (aliyun.com)](https://developer.aliyun.com/article/787658)
- [性能 | Electron (electronjs.org)](https://www.electronjs.org/zh/docs/latest/tutorial/performance)

## 其他优化

窗口页面精心的设计

快捷键

本地化-国际化语言(Internationalization)

- app.getLocale()
- i18next 库：<https://github.com/i18next/i18next>
- Electron 的 i18n 文章：<https://phrase.com/blog/posts/building-an-electron-app-with-internationalization-i18n/>

开机启动

- 使用库 node-auto-launch：<https://github.com/Teamwork/node-auto-launch>

## 延伸资料

- [Electron 的主进程阻塞导致 UI 卡顿的问题 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/37050595)
- [Electron App Tutorial on Internationalization (i18n) | Phrase](https://phrase.com/blog/posts/building-an-electron-app-with-internationalization-i18n/)
- [Electron 进程间通讯详解 (iguan7u.cn)](https://www.iguan7u.cn/2019/06/30/Electron-进程间通讯详解/)
- [分享这半年的 Electron 应用开发和优化经验 - 腾讯云开发者社区-腾讯云 (tencent.com)](https://cloud.tencent.com/developer/article/1558453)
- [CPU、GPU、内存以及多进程架构 (acohome.cn)](http://blog.acohome.cn/inside-browser-part1/)
