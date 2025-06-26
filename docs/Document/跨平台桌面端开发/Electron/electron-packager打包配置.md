# electron-packager 打包配置

electron-packager：<https://github.com/electron/electron-packager>

electron-packager 配置文档：[npm.im/electron-packager](https://npm.im/electron-packager "https://npm.im/electron-packager")

electron-packager npm：<https://www.npmjs.com/package/electron-packager>

---

## 使用 electron-packager 打包

使用 electron-packager 打包特点：操作简单，打包后的目录就是程序的运行目录，相当于已经安装过，不用安装操作后才能运行，如果需要打包成安装器，需要使用 electron-builder 打包。

### 1、安装：`electron-packager npm install electron-packager --save-dev`

npm install electron-packager -g

### 2、快速打包命令：`electron-packager`

### 3、使用配置文件打包

#### 在项目的 package.json 文件中的 scipts 节点中添加代码

`electron-packager --platform= --arch= --out=out --icon=assets/app.ico --asar --overwrite --ignore=.git`

- sourcedir：项目源文件所在路径（唯一的必须参数）

- appname：项目名称（直接使用 package.json 文件中的 name 属性更方便）

- platform：要构建哪个平台的应用（Windows、Mac 还是 Linux）

- arch：构建架构 包含 ia32,x64,armv7l,arm64

- out：打包后的地址

- icon：打包图标

- asar：是否生成 app.asar, 不然就是自己的源码

- overwrite：覆盖上次打包

- ignore：不进行打包的文件

打包的路径不能出现中文或者特殊字符，第一次打包需要下载二进制的包耗时会久一些，以后走缓存就快的多了。

##### 下面是在设置了比较简单的打包代码（在 scipts 节点添加下面代码）

`"packager": "electron-packager ./ testapp --win --out ./outputs"`

- ./：sourcedir，项目路径

- testapp：appname，打包后可执行程序(.exe)的名字

- –win：platform，构建 win 平台的打包

- –out：打包后的地址，./outputs 就是打包后的地址

### 4、配置完 package.json 文件后就可以使用命令 `npm run packager` 打包了

打包后跟目录生成 outputs 文件夹：

目录里面 exe 就是打包后可执行程序文件，
