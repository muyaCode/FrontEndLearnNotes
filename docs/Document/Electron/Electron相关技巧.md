# Electron相关技巧

## 开发环境：热更新

这里在开发环境中有一个问题就是，咱们这里的渲染进程是打包好的dist文件，无法每次修改后热更新。只有重新打包生成新的dist后页面才会更新。 

##### 两个工具 concurrently wait-on

```bash
npm i concurrently -D
npm i wait-on -D
```

- concurrently：方便 script 同时启动多个命令
- wait-on：它可以等待文件、端口、套接字和 http(s) 资源可用后触发。

开发时热更新，我们就要放弃build一个dist文件来作为渲染进程的做法了。 简单来说，我们正常执行 npm run dev 生成一个页面服务，这样的环境是有热更新的。

所以我们只需要在主进程中加载dev服务中的页面作为渲染进程就可以了。 修改一下主进程 main.js

```js
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

然后打开两个终端，第一个先执行 npm run dev，等待服务启动后在另外一个里执行npm run start 即可。

当然我们也可以一个命令完成这些。在package.json中添加命令：

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
