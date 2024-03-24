# Electron 相关技巧

功能开发教程：<https://juejin.cn/post/7103749039677505566>

**electron 小技巧整理**：

[笔记｜ electron 小技巧整理，总有一款适合你 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/503375804)

[electron 应用开发优秀实践 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/549734690)

## 一、开发环境：热更新

这里在开发环境中有一个问题就是，咱们这里的渲染进程是打包好的 dist 文件，无法每次修改后热更新。只有重新打包生成新的 dist 后页面才会更新。

两个依赖包：`concurrently` 和`wait-on`

```bash
npm i concurrently -D
npm i wait-on -D
```

- concurrently：方便 script 同时启动多个命令
- wait-on：它可以等待文件、端口、套接字和 http(s) 资源可用后触发。

开发时热更新，我们就要放弃 build 一个 dist 文件来作为渲染进程的做法了。 简单来说，我们正常执行 npm run dev 生成一个页面服务，这样的环境是有热更新的。

所以我们只需要在主进程中加载 dev 服务中的页面作为渲染进程就可以了。 修改一下主进程 main.js

```js {1,4,6-8}
    ...
    const createWindow = () => {
      // Create the browser window.
      const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
          preload: path.join(__dirname, "/preload.js"),
        },
      });
      // 加载 index.html
      mainWindow.loadURL("http://localhost:3333/");
      // 打开开发工具
      // mainWindow.webContents.openDevTools()
    };
    ...
```

然后打开两个终端，第一个先执行 npm run dev，等待服务启动后在另外一个里执行 npm run start 即可。

当然我们也可以一个命令完成这些。在 package.json 中添加命令：

```json
    ...
    "scripts": {
        "dev": "vite --host",
        "build": "vite build",
        "preview": "vite preview",
        "start": "electron .",
        "electron": "wait-on tcp:3333 && electron .",
        "exe-dev": "concurrently -k \"npm run dev\" \"npm run electron\""
      },
    ...
```

开发时执行 exe-dev 即可。

## 二、electron12+以上版本，在渲染进程中使用 remote 模块

在 electron 12 及以下版本中的 electron

在主进程中设置`enableRemoteModule: true`后，只需要从`electron`中引入`remote`即可

```javascript
const remote = require("electron");
```

12+版本废弃，而 14+以上版本移除，替代需要安装模块：`@electron/remote`

文档说明：[重大更改 | Removed: `remote` module](https://www.electronjs.org/zh/docs/latest/breaking-changes#removed-remote-module)

**以 electron v21.4.1 版本为例，使用@electron/remote 库来使用 remote 模块**：

1、先安装模块 `@electron/remote`

```javascript
npm install --save @electron/remote
# 或者
yarn add @electron/remote -D
```

2、主进程中`new BrowserWindow({})`的 webPreferences 设置`enableRemoteModule:true`

```js
webPreferences: {
	enableRemoteModule: true; // 是否允许渲染进程使用Remote远程模块
}
```

同时在创建窗口实例之后引入模块

```javascript
require("@electron/remote/main").initialize(); //
require("@electron/remote/main").enable(mainWin.webContents); // electron报错：Uncaught Error: @electron/remote is disabled for this WebContents
```

main.js

```javascript
import { app, shell, BrowserWindow } from "electron";

function createWindow() {
	// 创建主窗口
	let mainWindow = new BrowserWindow({
		width: 900,
		height: 670,
		show: false,
		autoHideMenuBar: true,
		...(process.platform === "linux" ? { icon } : {}),
		webPreferences: {
			preload: join(__dirname, "../preload/index.js"), // 注入脚本
			sandbox: false,
			// 警告：在生产环境中启用nodeIntegration和禁用contextsolation是不安全的
			// 考虑在preload预加载中使用 contextBridge.exposeInMainWorld 上下文隔离
			// 更多信息请访问：https://www.electronjs.org/zh/docs/latest/tutorial/context-isolation
			nodeIntegration: true, // 渲染进程使用Node API，不安全
			contextIsolation: false, // 上下文隔离开启，解决require报错，不安全
			webSecurity: false, // 关闭Electron的跨域同源安全策略保护，配合ELECTRON_DISABLE_SECURITY_WARNINGS使用去掉警告，不安全
			enableRemoteModule: true, // 是否允许渲染进程使用Remote远程模块
		},
	});
	//
	require("@electron/remote/main").initialize();
	require("@electron/remote/main").enable(mainWindow.webContents);

	// 加载时显示
	mainWindow.on("ready-to-show", () => {
		mainWindow.show();
	});

	mainWindow.webContents.setWindowOpenHandler((details) => {
		shell.openExternal(details.url);
		return { action: "deny" };
	});

	// 为了在渲染器中使用模块热替换（HMR）功能，需要使用 环境变量 来确定窗口浏览器是加载本地 html 文件还是本地 URL
	if (is.dev && process.env["ELECTRON_RENDERER_URL"]) {
		mainWindow.loadURL(process.env["ELECTRON_RENDERER_URL"]);
	} else {
		mainWindow.loadFile(join(__dirname, "../renderer/index.html"));
	}

	mainWindow.on("close", () => {
		console.log("mainWindow is closed");
		mainWindow = null;
	});
}
```

3.在 vue|react|html 页面中（渲染进程中）导入`remote`模块

```javascript
const remote = require("@electron/remote");
```

完成后即可在渲染进程中使用`remote`模块，例如

```javascript
const remote = require("@electron/remote");

window.addEventListener("DOMContentLoaded", () => {
	// 点击按钮打开一个新窗口
	const oBtn = document.getElementById("btn");
	oBtn.addEventListener("click", () => {
		// 如何创建新窗口
		let indexMin = new remote.BrowserWindow({
			width: 200,
			height: 200,
		});
		indexMin.loadFile("list.html");
		indexMin.on("close", () => {
			indexMin = null;
		});
	});
});
```

## 如何在 Electron 中采集桌面共享和系统音频

在使用 Electron 开发音视频项目的时候，我们不可避免会 遇到桌面共享这种场景。

webRTC 提供了， getUserMedia 方法用于采集 用户媒体数据。比如摄像头，麦克风。

### 设置主进程信息

我们需要先在 Electron 中，先创建窗体并载入入口 index 文件。

代码如下：

```jsx
const { app, BrowserWindow, desktopCapturer, ipcMain } = require("electron");

const path = require("path");
let win = null;
function createWindow() {
	win = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			preload: path.join(__dirname, "preload.js"),
		},
	});
	win.loadFile("index.html");
}

app.whenReady().then(() => {
	createWindow();

	app.on("activate", () => {
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow();
		}
	});
});

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});
```

### 使用 desktopCapturer 模块

desktopCapturer 模块是 Electron 提供的官方模块用于捕获系统桌面。 desktopCapture 支持捕获，应用窗口 和 桌面两种媒体源。

但是，此模块有使用限制，需要在主进程进行调用。 所以我们需要用到 Electron 中进行间通信的方式。

所以我们需要通过， IPC 通讯的形式，让我们，在渲染进程中进行调用。

首先，我们在 main.js 中，通过 ipcMain 注册一个方法，getSources

```jsx
// .... other code
ipcMain.handle("getSources", async () => {
	return await desktopCapturer.getSources({ types: ["window", "screen"] });
});
```

接着，我们在渲染进程中，通过 **ipcRenderer** 去 invoke 调用此方法便实现了，这个调用过程。

```jsx
// .... other codes
const inputSources = await ipcRenderer.invoke("getSources");

// ... other codes
```

获得 source 列表后， 我们在渲染进程中，通过 HTML5 的 getUserMedia 进行捕获具体窗口或者桌面。

示例代码：

```jsx
// ...

// other Code
let constraints = {
	audio: {
		mandatory: {
			chromeMediaSource: "desktop",
		},
	},
	video: {
		mandatory: {
			chromeMediaSource: "desktop",
			chromeMediaSourceId: sourceId,
		},
	},
};

const stream = await navigator.mediaDevices.getUserMedia(constraints);

handleStream(stream);

function handleStream(stream) {
	const video = document.querySelector("video");
	video.srcObject = stream;
	video.onloadedmetadata = (e) => video.play();
}
// ...

// other code
```

至此我们就完成了， 桌面视频数据采集了。

后续我们，可以对采集到的数据进行 ，本地录制或者 通过 webrtc 推到远端等一系列操作。

### 总结

在 electron 中实现桌面共享 和 chrome web 中差异还是蛮大的， 在 chrome 中我们只需要调用 `getDisplayMedia` 方法就能唤起桌面选择和画面采集。

但在 electron 中，我们需要使用到， 进程间通信模块 ipc 、 桌面采集模块 `desktopCapturer` 、以及 HTML5 的 getUserMedia 方法才能完成整个桌面采集的过程。

DEMO 代码：[shitouzxy/Electron-screenCapturerer-demo: a short demo capturerer screen in Electron . (github.com)](https://github.com/shitouzxy/Electron-screenCapturerer-demo)
