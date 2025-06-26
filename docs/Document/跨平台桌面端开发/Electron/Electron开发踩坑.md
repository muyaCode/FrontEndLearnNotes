# Electron 开发踩坑

## 浏览器安全策略 eval()阻止报错

把标签 onclick 事件，改成获取`id.addEventListener("click",()=>{})`的方式监听事件

## process is not defined 报错

1.main.js 文件 webPreferences:{}里面

```js
webPreferences: {
  preload: path.join(__dirname, 'preload.js'),
  // 加上以下两句：解决问题：process is not defined
  // 才能使 require 和 process 等变量有效
  nodeIntegration: true,
  // 上面还是报错就再添加这行
  contextIsolation: false,
}
```

## lowdb 本地存储

### 简述

`electron`应用在开发中，需要存储数据到本地，经历了两个版本，其方案都不太一样。

一开始考虑使用 cookie，在开发过程中没有任何问题，但是编译之后去使用，发现无法操作 cookie。原来在开发中直接 js 操作的的浏览器的 cookie，而在 electron 中需要交由底层的 nodejs 去操作本地的 cookie，[官方](https://www.electronjs.org/docs/api/cookies)说法是通过`Session`的`cookies`属性来访问`Cookies`的实例。但是我在实践过程中确实没有成功，然后随着需求变化，数据量变大，就直接放弃了这个方案。

当时用的`electron`版本是`9.0.0`，之后才用的方案是直接文件存储，即直接`fs`读与写，毫无问题。就是注意配置文件的存放位置。

现在再去使用`electron`，版本已经到了`11.0.0`。当我去使用`fs`读写时直接给我报错`fs.writeFile is not a function`，经过一天多的排错和查找，最终放弃该方案，当然我并没有找到原因和解决方案。最后决定使用`lowdb`去实现存储。

### 官方文档

#### Github 仓库

[https://github.com/typicode/lowdb](https://github.com/typicode/lowdb)

#### 官方介绍

Small JSON database for Node, Electron and the browser. Powered by Lodash. ⚡

#### 实现

##### 安装

```bash
npm install lowdb
```

##### 增删改查实例

```javascript
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("db.json");
const db = low(adapter);

// 默认初始化配置文件中
db.defaults({ posts: [], user: {}, count: 0 }).write();

// 增
db.get("posts").push({ id: 1, title: "lowdb is awesome" }).write();

// 删
db.get("posts").remove({ title: "low!" }).write();

// 改
db.set("user.name", "typicode").write();

// 查
db.get("posts[0].title").value();
```

##### 加密

比较重要的是，`lowdb`本身支持对于配置文件的加密，但是需要自己去实现写加解密的函数。

```javascript
const adapter = new FileSync("db.json", {
	serialize: (data) => encrypt(JSON.stringify(data)),
	deserialize: (data) => JSON.parse(decrypt(data)),
});
```

如下加解密方式可以参考下：

```javascript
const algorithm = "aes-256-ctr";
const ENCRYPTION_KEY = "<ENCRYPTION_KEY>";

const IV_LENGTH = 16;

// 加密
function encrypt(text) {
	let iv = crypto.randomBytes(IV_LENGTH);
	let cipher = crypto.createCipheriv(
		algorithm,
		Buffer.from(ENCRYPTION_KEY, "hex"),
		iv
	);
	cipher.setAutoPadding(true);
	let encrypted = cipher.update(text);
	encrypted = Buffer.concat([encrypted, cipher.final()]);
	return iv.toString("hex") + ":" + encrypted.toString("hex");
}

// 解密
function decrypt(text) {
	let textParts = text.split(":");
	let iv = Buffer.from(textParts.shift(), "hex");
	let encryptedText = Buffer.from(textParts.join(":"), "hex");
	let decipher = crypto.createDecipheriv(
		algorithm,
		Buffer.from(ENCRYPTION_KEY, "hex"),
		iv
	);
	let decrypted = decipher.update(encryptedText);
	decrypted = Buffer.concat([decrypted, decipher.final()]);
	return decrypted.toString();
}
```

## mac 下窗口毛玻璃效果

### 简介

一直觉得毛玻璃样式很炫，而要在`electron`中实现，本来是需要自己去写样式的，我在开发之前也去了解了下，想看看有没有大佬已经实现了，不过确实发现了一个[大佬的仓库](https://github.com/arkenthera/electron-vibrancy)分享了毛玻璃组件，但是其 README 也提到了官方仓库对于[mac 的毛玻璃效果的 pr](https://github.com/electron/electron/pull/7898)，然后我去找了官方文档，已经有相关属性了，就很妙啊！

但是为什么标题要写“mac 下”下呢，因为这个属性只对 mac 有效。

#### 文档地址

[https://www.electronjs.org/docs/api/browser-window](https://www.electronjs.org/docs/api/browser-window)

### 相关属性

- `vibrancy` String (可选) - 窗口是否使用 vibrancy 动态效果, 仅 macOS 中有效. Can be `appearance-based`, `light`, `dark`, `titlebar`, `selection`, `menu`, `popover`, `sidebar`, `medium-light`, `ultra-dark`, `header`, `sheet`, `window`, `hud`, `fullscreen-ui`, `tooltip`, `content`, `under-window`, or `under-page`. Please note that using `frame: false` in combination with a vibrancy value requires that you use a non-default `titleBarStyle` as well. Also note that `appearance-based`, `light`, `dark`, `medium-light`, and `ultra-dark` have been deprecated and will be removed in an upcoming version of macOS.

- `visualEffectState`String (optional) - Specify how the material appearance should reflect window activity state on macOS. Must be used with the`vibrancy`property. 可能的值有
  - `followWindow` - 当窗口处于激活状态时，后台应自动显示为激活状态，当窗口处于非激活状态时，后台应自动显示为非激活状态。 This is the default.
  - `active` - 后台应一直显示为激活状态。
  - `inactive` - 后台应一直显示为非激活状态。

代码实现

有了官方 Buff 加持，使起来就很方便了。

```javascript
// background.js
let win = new BrowserWindow({
	width: 800,
	height: 600,
	vibrancy: "dark", // 'light', 'medium-light' etc
	visualEffectState: "active", // 这个参数不加的话，鼠标离开应用程序其背景就会变成白色
});
```

实现就是这么简单！

小伙伴儿们有兴趣的可以参考下我[这个项目](https://github.com/Kuari/QingKe)，使用的毛玻璃样式。

## tray 系统托盘

### tray 系统托盘简述

窗口最小化或者关闭的情况下，进程未退出，需要通过系统托盘来查看，当然还需要托盘菜单。这里就用最简单的菜单实现，加上点击事件触发。

### tray 系统托盘官方文档实现

```javascript
const { app, Menu, Tray } = require("electron");

let tray = null;
app.whenReady().then(() => {
	tray = new Tray("/path/to/my/icon");
	const contextMenu = Menu.buildFromTemplate([
		{ label: "Item1", type: "radio" },
		{ label: "Item2", type: "radio" },
		{ label: "Item3", type: "radio", checked: true },
		{ label: "Item4", type: "radio" },
	]);
	tray.setToolTip("This is my application.");
	tray.setContextMenu(contextMenu);
});
```

代码实现

```javascript
let tray = null;
app.whenReady().then(() => {
	const iconUrl =
		process.env.NODE_ENV === "development"
			? path.join(__dirname, "../build/favicon.ico")
			: path.join(__dirname, "favicon.ico");
	tray = new Tray(nativeImage.createFromPath(iconUrl));

	let trayMenuTemplate = [
		{
			label: "显示/隐藏",
			click: function () {
				return win.isVisible() ? win.hide() : win.show();
			},
		},
		{
			label: "退出",
			click: function () {
				app.quit();
			},
		},
	];
	const contextMenu = Menu.buildFromTemplate(trayMenuTemplate);
	tray.setToolTip("kuari");
	tray.setContextMenu(contextMenu);
});
```

### 参考文档

- [官方文档](https://www.electronjs.org/docs/api/tray)

## 禁止用户调整窗口大小

### 禁止用户调整窗口大小简述

当想为程序设定一个固定的窗口大小时候，需要限制用户对程序窗口的大小进行拖动调整。但是使用官方的设定时候，在 mac 平台上可以禁用调整，当在 windows 平台上时候却依然可以。所以为了兼容两者，可以选择使用无边框来实现。

- `resizable` Boolean (optional) - Whether window is resizable. 默认值为 `true`。

#### Mac 系统

```javascript
win = new BrowserWindow({
	width: 800,
	height: 600,
	resizable: false,
});
```

#### windows

- 为了兼容，可选择都加上无边框

```javascript
win = new BrowserWindow({
	width: 800,
	height: 600,
	frame: false,
	resizable: false,
});
```

参考文档：[BrowserWindow | Electron (electronjs.org)](https://www.electronjs.org/zh/docs/latest/api/browser-window)

## 开发与编译后的文件路径问题

## 去掉边框（无边框）

虽然并非出于直接实现无边框的需求，但是为了实现窗口的固定大小（设置固定值不可调整情况下，mac 是没问题的，但是 windows 一直可以调整大小）而设置了无边框。

background.js 窗口配置

```js
const { BrowserWindow } = require("electron");
win = new BrowserWindow({
	width: 800,
	height: 600,
	frame: false,
});
win.show();
```

## 无边框窗口拖动

### 无边框窗口拖动简述

无边框的拖动本来很简单，只要对可以拖动的部分加上 `-webkit-app-region: drag;` 的样式即可。但是，当可拖动区域存在其他元素，如顶部菜单的搜索框，对 mac 是没有问题的，当在 windows 平台下拖动事件就会覆盖掉其他元素，因此需要对其他元素单独设置样式。

html 页面

```html
<body style="-webkit-app-region: drag"></body>
```

```css
button {
	-webkit-app-region: no-drag;
}
```

CSS

```css
.menu {
	-webkit-app-region: drag;
}

.menu-button {
	-webkit-app-region: no-drag;
}
```

## 自动全量更新

最近完成一个 Redis GUI Client 开源项目——[RedFish](https://github.com/Kuari/RedFish)，经过了漫长的开发期，最后在准备上线`v 1.0.0`的时候，发现跨平台打包和自动化更新还挺麻烦的。当然打包这事儿吧，我再挖个坑......以及自动化更新也是个大坑，以及之前做了一个项目，期间经历了 N 多种更新方案（甲方那无处安放的需求...），包括 electron 的全量更新，electron-builder 的全量更新 ，也做了局部更新等等，再再挖个坑吧。

这次我先记录下最近用的这个`electron-builder`的`auto update`。由于是开源项目，项目中我用的是 github releases 发布版本的，所以当时选择方案时候尽可能原生支持 github。此文中也会介绍怎么使用自定义服务器进行更新。

### 二. 环境

- **Node**: 16.13.0
- **electron**: 13.0
- **electron-builder**: 23.0.3
- **electron-updater**: 5.0.1

### 三. 官方示例

**官网文档**: [auto-update](https://www.electron.build/auto-update.html)

主要代码如下：

```typescript
import { autoUpdater } from "electron-updater";

export default class AppUpdater {
	constructor() {
		const log = require("electron-log");
		log.transports.file.level = "debug";
		autoUpdater.logger = log;
		autoUpdater.checkForUpdatesAndNotify();
	}
}
```

哇喔，看上去整体就很简单！

### 四. 具体实现

#### 1. 安装

```bash
# npm
npm install electron-updater
# yarn
yarn add electron-updater
```

#### 2. 配置 publish

##### github

```json
"build": {
    "publish": {
        "provider": "github",
        "owner": "Kuari",
        "repo": "RedFish"
    }
}
```

##### 自定义服务器

```json
"build": {
    "publish": {
        "provider": "generic",
        "url": "http://your-domain.com/update"
    }
}
```

#### 3. 开启自动化更新

可以看到官方代码中，引入了一个 electron 的日志的库。该库其实个人建议是非常必要的，其将自动更新的功能的检测、下载、更新等流程日志全部存储起来，方便你去进行排错。前段时间我就遇到一个事情，之前做的一个项目突然找到我，说版本升级有问题，虽然那个项目做的是做的增量更新，但是我有日志啊，直接从目标电脑拿到日志，告诉甲方是什么原因导致的，更新功能本身没有问题，应该如何避免这类问题等等。

如其名`checkForUpdatesAndNotify`所言，自动化更新时候会去检测版本，然后更新和通知。其更新方式是静默更新，打开客户端时去检测版本，需要更新时，会下载更新的包，然后在用户关闭客户端后进行更新和通知。

##### 不使用日志，开启自动化更新

配置`background.js`文件

```javascript
import { autoUpdater } from "electron-updater";

// ...

async function createWindow() {
	// ...
	if (process.env.WEBPACK_DEV_SERVER_URL) {
		// ...
	} else {
		createProtocol("app");
		// Load the index.html when not in development
		await win.loadURL("app://./index.html");
		// 加入此行，开启自动化更新
		await autoUpdater.checkForUpdatesAndNotify();
	}
}

// ...
```

##### 使用日志，开启自动化更新

首先先安装日志所需要的库

```bash
# npm
npm install elecrton-log
# yarn
yarn add electron-log
```

然后配置`background.js`文件

```javascript
import { autoUpdater } from "electron-updater";

// ...

async function createWindow() {
	// ...
	if (process.env.WEBPACK_DEV_SERVER_URL) {
		// ...
	} else {
		createProtocol("app");
		// Load the index.html when not in development
		await win.loadURL("app://./index.html");
		// 加入此行，开启自动化更新
		log.transports.file.level = "debug";
		autoUpdater.logger = log;
		await autoUpdater.checkForUpdatesAndNotify();
	}
}

// ...
```

至于日志位置，就是`electron-log`本身使用的日志位置了，其路径如下：

- **on Linux:** `~/.config/{app name}/logs/{process type}.log`
- **on macOS:** `~/Library/Logs/{app name}/{process type}.log`
- **on Windows:** `%USERPROFILE%\AppData\Roaming\{app name}\logs\{process type}.log`

#### 4. 配置更新服务端

那么一个很关键的问题在于，如何配置服务端让客户端知道它要更新呢？在配置了`publish`参数以后，electron 打包文件内会携带一个`latest.yml`文件，其名字会根据不同打包方式和平台等或有所不同，比如`latest-mac.yml`。

我们打开`latest.yml`，可以看到几个文件，其它参数我们目前暂且可以不用管，那是 autoUpdater 处理的。内包含的几个文件在打包后的文件夹内都能找到，我们只需要在服务端把`latest.yml`和其内涉及的几个文件全都放到服务端即可。放上去之后，当我们打开客户端，即可触发自动化检测。

但是如何触发版本更新呢？那也是简单的，就是修改`package.json`内的`version`参数，当服务端的`version`高于客户端时，便会触发自动化更新。在配置了`publish`参数后，除了`latest.yml`文件，客户端内也会有一个更新配置文件，内置打包时的版本号。

#### 5. 更新失败

更新可能不那么一帆风顺，所以如果遇到报错，我们可以打开上述的日志文件，看看到底是哪一步报错了，然后根据相关报错进行排错和调整。

### 五. 报错

`electron`升级到当前最新版（13.0.0），却在 mac 上打包时报错，报错内容如下：

```bash
Exit code: ENOENT. spawn /usr/bin/python ENOENT
```

该问题是由于 mac 系统升级后默认`python`命令是指向`python3`的，但是`vue-cli-plugin-electron-builder`是要求`python2`的，但是`electron-builder`是支持的，所以此处指定其使用`electron-builder v23.0.3`版本。

网上还有另一种解决方案就是将`python`重新指向`python2`，这种方案对于系统来说侵入性太强。我也考虑过起一个 python2 的 docker continer 然后临时指向，但是这样每次写代码还要设置下环境就很麻烦。

总体来说，还是觉得指定版本是最方便了。

解决方案就是在`package.json`中添加如下：

```json
{
	// ...
	"resolutions": {
		"vue-cli-plugin-electron-builder/electron-builder": "^23.0.3"
	}
	// ...
}
```

### 六. 结语

整体来说，使用 electron-builder 的 auto update 配置还是比较简单的。但是自动化更新离不开的一点就是打包，打包涉及的问题还是挺多的，比如 Mac 平台涉及 intel 和 M1 两个包，还有打包需要掏钱买开发者资格获取证书然后签名等，后期文章慢慢跟大家分享吧。

推荐两个参考项目，有需要可以看一看：

- [electron-builder 官方 demo github 仓库](https://github.com/iffy/electron-updater-example)
- 我自己的 Redis GUI Client 开源项目——[RedFish 项目](https://github.com/Kuari/RedFish/releases/tag/v1.0.0)，由于证书问题，目前已经完成了 Mac 平台的自动化更新，包含 Intel 和 M1
