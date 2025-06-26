# npm 学习

**NPM 官网：[npm (npmjs.com)](https://www.npmjs.com/)**

**NPM 中文教程文档：[npm 中文文档 | npm 中文网 (npmjs.cn)](https://www.npmjs.cn/)**

## npm 简介

- 包管理工具的主要作用是管理第三方依赖，也可以看成一个"轮子"工厂，每个人都可以上传自己造的"轮子"和下载使用别人的"轮子"，包管理工具顾名思义就是统一管理这些轮子的软件或者工具，它以多种方式自动处理项目依赖关系、提供了命令行工具（CLI）、支持跟踪依赖项和版本等功能，
- 除此之外还可以安装、卸载、更新和升级包，配置项目设置，运行脚本等等

版本

- npm 是 2010 年发布的 nodejs 依赖管理工具，在此之前，前端的依赖管理都是手动下载和管理的
- 2017：npm 5 发布，提供类似 yarn.lock 的 package-lock.json 文件
  - npx：npm 从 v5.2.0 开始新增了 npx 命令，>= 该版本会自动安装 npx
    - [npx 有什么作用跟意义？为什么要有 npx？什么场景使用？_](https://blog.csdn.net/zz00008888/article/details/126117685)
- 2018：npm 6 发布，在 npm 在安装依赖项之前检查安全漏洞，提高了安全性

预装

- 1.因为 node 预装了 npm ，所以安装 node 后，不需要手动安装 npm
- 2.在 npm 中，要安装 nvm 才能完成版本切换

## NPM 教程相关网站

等待参考：[学习 NPM 这一篇就够了\_轻松的小希的博客-CSDN 博客\_npm 学习](https://blog.csdn.net/qq_38490457/article/details/109739444)

编程之家 NPM 教程：<https://www.jb51.cc/npm-tutorial/>

## 一、npm 淘宝源镜像配置安装

### npm 的镜像源管理工具：nrm

```bash
# 全局安装nrm
npm install -g nrm
# 查看当前可选的镜像源
nrm ls
# 切换淘宝镜像源
nrm use taobao
# 添加自己公司私有源：
nrm add name http://www.xxx.xxx/
```

### npm 源镜像设置

查看镜像是否设置

```bash
npm config get registry // 查看镜像，不是国内，再设置淘宝镜像即可
```

**原淘宝 npm 域名即将停止解析，请切换至新域名**：[npmmirror 中国镜像站](http://www.npmmirror.com/)

`http://npm.taobao.org`和 `http://registry.npm.taobao.org` 将在 **2022.06.30** 号正式下线和停止 DNS 解析

新域名为 `npmmirror.com`, 相关服务域名切换规则请参考：

```bash
http://npm.taobao.org => http://npmmirror.com
http://registry.npm.taobao.org => http://registry.npmmirror.com
```

### 使用淘宝镜像方法一

使用阿里定制的 cnpm 命令行工具代替默认的 npm，输入以下代码

```bash
npm install -g cnpm --registry=http://registry.npmmirror.com
```

检查是否安装成功：

```bash
cnpm -v
```

安装成功之后，以后安装依赖包的方式和 npm 的是一样的，只是 npm 的命令换成是 cnpm 就可以了。

### 使用淘宝镜像方法二

a: 单次使用：

```bash
npm install --registry=http://registry.npmmirror.com
```

b: 永久替换：

在开发 react-native 的时候，不要使用 cnpm，cnpm 安装的模块路径比较奇怪，packager 不能正常识别。

所以，为了方便开发，我们最好是直接永久使用淘宝的镜像源

直接命令行的设置

```bash
npm config set registry https://registry.npm.taobao.org
```

手动修改设置

```bash
1.打开.npmrc文件（C:\Program Files\nodejs\node_modules\npm\npmrc，没有的话可以使用git命令行建一个( touch .npmrc)，用cmd命令建会报错）
2.增加 registry =https://registry.npm.taobao.org  即可。
```

如果需要恢复成原来的官方地址只需要执行如下命令:

```bash
npm config set registry https://registry.npmjs.org
```

检测是否安装成功：

```bash
npm config get registry
```

有时 npm 命令不太稳定，报错的话，可以使用 cnpm，语法一模一样

```bash
npm install -g cnpm --registry=https://registry.npm.taobao.org
```

### 项目中 npmrc 文件配置

文档：[npmrc | npm 中文文档 | npm 中文网 (npmjs.cn)](https://www.npmjs.cn/files/npmrc/)

npmrc

```bash
registry=https://registry.npm.taobao.org/
```

## 二、npm 命令学习

### 包（文件夹）

- 多个文件，有效的被组织与管理的一个单位
- 留一个入口

### 1 简介

npm 是一个包管理工具，包括三个部分：

- 网站：展示、查找各种包（代码模块，package）及其使用方法，设置参数以及管理 npm 使用体验的平台

- 注册表（registry）：是一个巨大的数据库，保存了每个包的信息

- 命令行工具（CLI）：用来直接使用 npm

### 2 安装和使用

由于 npm 是用 Node.js 写的，因此要安装 Node.js 来使用 npm。  
最快捷的安装方式是从 Node.js 官网直接下载安装 Node.js，npm 也会自动安装。  
安装后运行以下命令以检测是否安装成功：

```bash
node -v // 查看Node.js版本

npm -v // 查看npm版本
```

命令

```bash
# 查看 npm 命令列表
npm help

# 查看各个命令的简单用法
npm -l

# 查看 npm 的版本
npm -v

# 查看 npm 的配置
npm config list -l
```

安装成功后，直接运行 npm 的各种命令来下载、删除、发布包等，例如安装一个第三方包：

```bash
// 会在当前目录下创建一个 node_modules 的目录，并将下载的包保存在该目录下
npm install
```

### 3 package.json 文件

package.json 字段详解：[package.json 详解 - 简书 (jianshu.com)](https://www.jianshu.com/p/c86d511d99fd)

package.json 是用来识别项目并且处理项目的依赖关系的，package.json 可以让 npm 启动项目、运行脚本、安装依赖项，一个项目里面必须要有 package.json 文件才能用 npm 安装依赖包

命令生成 package.json 文件

```bash
npm init  // 创建一个package.json文件，创建过程中会有一系列关于需要怎样创建package.json的问题需要回答
npm init --yes/-y  // 传建一个默认的package.json文件
```

一个默认的 paskage.json 文件：

```json
{
  "name": "my_package",  // 当前目录的名字，这个package的名字
  "description": "",  // README.md文档内容的第一行，如果没有 README.md则为空字符串, README.md描述了这个项目的相关信息，有利于npm检索
  "version": "1.0.0",  // 当前版本
  "main": "index.js",  // 入口文件
  "scripts": {
    "test": "echo "Error: no test specified" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/ashleygwilliams/my_package.git"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/ashleygwilliams/my_package/issues"
  },
  "homepage": "https://github.com/ashleygwilliams/my_package"
}
```

可以设置字段值：

```bash
npm set init.author.email "example@npmjs.com"
```

还可以自定义 npm init 过程中的问答：在家目录下创建一个 .npm-init.js 文件自定义问答内容，详见：<https://github.com/npm/init-package-json>

package.json 使用 dependencies 和 devDependencies 两个属性用来描述项目所需依赖包：

```json
{
  "name": "my_package",
  "version": "1.0.0",
  "dependencies": {  // 生产环境需要用到的依赖包
    "my_dep": "^1.0.0"  // 依赖包的版本号描述使用语义版本(SemVer)语法
  },
  "devDependencies" : {  // 本地开发环境需要用到的依赖包
    "my_test_framework": "^3.1.0"
  }
```

npm list 命令以树型结构列出当前项目安装的所有模块，以及它们依赖的模块。

```bash
npm list
```

npm search 命令用于搜索 npm 仓库，它后面可以跟字符串，也可以跟正则表达式

```bash
npm search jquery
```

npm info 命令可以查看每个模块的具体信息

```bash
npm info underscore
```

不同环境需要用到的依赖包安装方法：

```bash

# 本地安装
npm install <package name>
npm install <package name> --save/-S // 安装到dependencies
npm install <package name> --save-dev // 安装到devDependencies

# 全局安装
npm install -global <package name>
npm install -g <package name>

# 也支持直接输入Github代码库地址
npm install git://github.com/package/path.git
npm install git://github.com/package/path.git#0.1.0

# 强制重新安装
npm install <packageName> --force

# 如果你希望，所有模块都要强制重新安装，那就删除node_modules目录，重新执行npm install
rm -rf node_modules
npm install
```

安装不同版本

```bash
npm install sax@latest
npm install sax@0.1.1
npm install sax@">=0.1.0 <0.2.0"

# 如果使用--save-exact参数，会在package.json文件指定安装模块的确切版本
npm install readable-stream --save --save-exact

npm install sax --save
npm install node-tap --save-dev
# 或者
npm install sax -S
npm install node-tap -D

# 如果要安装beta版本的模块，需要使用下面的命令
# 安装最新的beta版
npm install <module-name>@beta (latest beta)
# 安装指定的beta版
npm install <module-name>@1.3.1-beta.3

# npm install默认会安装dependencies字段和devDependencies字段中的所有模块，如果使用--production参数，可以只安装dependencies字段的模块
npm install --production
# 或者
NODE_ENV=production npm install
```

npm update 命令可以更新本地安装的模块

```bash
# 升级当前项目的指定模块
npm update [package name]

# 升级全局安装的模块
npm update -global [package name]
```

npm uninstall 命令，卸载已安装的模块

```bash
npm uninstall [package name]

# 卸载全局模块
npm uninstall [package name] -global
```

npm 不仅可以用于模块管理，还可以用于执行脚本。

package.json 文件有一个 scripts 字段，可以用于指定脚本命令，供 npm 直接调用。

```bash
npm run xxx
```

`npm run` 命令会自动在环境变量 $PATH 添加 node_modules/.bin 目录，所以 scripts 字段里面调用命令时不用加上路径，这就避免了全局安装 NPM 模块。

`npm run` 如果不加任何参数，直接运行，会列出 package.json 里面所有可以执行的脚本命令。

npm 内置了两个命令简写：

```bash
npm test 等同于执行 npm run test
npm start 等同于执行 npm run start
```

### 4 管理本地安装的包

```bash
npm update // 更新npm
npm uninstall // 卸载删除npm
npm uninstall --save lodash // 删除package.json文件中dependencies的依赖
npm uninstall --save-dev lodash // 删除package.json文件中devDependencies的依赖
npm install -g // 安装全局包，如果是命令行工具，应该要全局安装
npm update -g // 更新全局包
npm update -g // 更新全部全局包
npm outdated -g --depth=0 // 检测那些包需要更新
npm install npm@latest -g // 更新npm
npm uninstall -g // 删除全局包
```

### 5 发布更新一个包

可以将任何一个包含 package.json 文件的目录发布到 npm 中，只有添加到.gitignore 或.npmignore 中的文件不会被发布到 npm 上。

#### 5.1 发布

首先要在官网注册一个 npm 账号，注册成功后：

```bash
npm login // 登录npm
npm whoami // 查看当前登录用户以检查是否登录成功
```

有两点注意：

- 包的名字要唯一并且和包的功能相关
- 添加 readme.md 文档便于被优先检索到

```bash
npm publish // 发布到npm
```

发布时如果提示“ You do not have permission to publish "". Are you logged in as the correct user? :”

就说明 npm 上已有同名的包了，需要修改 package.json 的 name 字段值。

发布成功后就可以在官网上看到自己的包了。

#### 5.2 更新包

开发完执行以下命令可以更新包，注意由于 reamme.md 文档内容会展示在 npm 官网中该 package 的详情页面，在更新 package 时如果有需要也要同步更新 readme。

npm version // 更新

update_type 有三种类型：patch、minor、major

（更多语义化版本的介绍详见：<https://docs.npmjs.com/about-semantic-versioning>

- patch：会增加第三个版本号，表示向后兼容的 bug 修复
- minor：会增加第二个版本号，表示向后兼容的新特性
- major：会增加第一个版本号并重置后两个版本号，变为 x.0.0，表示向后不兼容的重大变更

版本号更新后再执行

```bash
npm publish
```

### npm 命令

文档：[01 - npm 是什么？ | npm 中文文档 | npm 中文网 (npmjs.cn)](https://www.npmjs.cn/getting-started/what-is-npm/)

1.自己先有一个包描述文件，创建一个包描述文件

```bash
npm init
# 全部默认同意
npm init -y
```

2.下载包：art-template 和 jquery@1.5.1

```bash
# 将包保存为 开发依赖（项目开发时所依赖的包--devDependencies字段） 项在 package.json 文件中，也就是说，这些包不会被打入最终的构建文件中。
npm install art-template jquery@1.5.1 --save
npm install art-template jquery@1.5.1 --S

# 将安装的包保存为 生产依赖项（项目运行时所依赖的包--dependencies字段） 在 package.json 文件中，也就是说，这些包会被打入最终的构建文件中。
npm install art-template jquery@1.5.1 --save-dev
npm install art-template jquery@1.5.1 --D

# 其他
--save：将安装的包保存为依赖项在 package.json 文件中。
--save-dev：将包保存为开发依赖项在 package.json 文件中。
--save-optional：将包保存为可选依赖项在 package.json 文件中。
--global 或 -g：全局安装包。
--prefix <path>：指定全局安装路径。
--production：只安装生产依赖项，不安装开发依赖项。
--no-save：不将包保存到 package.json 文件中。
```

如 `--save` 和 `--save-dev` 此类命令，可以放在依赖的 前面 或 后面，如下面两个命令是等价的

```bash
npm install --save express
npm install express --save
```

3.根据 package.json 文件中的`dependencies`属性恢复依赖或者安装依赖

```bash
npm install
# 简写
npm i
```

4.卸载一个包

```bash
npm uninstall jquery@1.5.1 --save
```

5.查看包的信息

```bash
npm info jquery
```

6.查看包的信息中的某个字段(版本)

```bash
npm info jquery versions
```

7.查看包的文档

```bash
npm docs jquery
```

8.http-server 依赖 安装在全局

```bash
npm install -g http-server
# 或者
npm install http-server -g
```

9.卸载全局安装的依赖包

```bash
npm uninstall -g http-server
```

10.查看全局包的下载路径

```bash
npm root -g
```

#### 包的加载机制

- 我们未来可能需要辨识一个包中，入口是否是我们想要的启动程序
- 1：查找 node_modules 下的包名文件夹中的 main 属性(常用)
- 2：不常用：查找 node_modules 下的包名.js
- 3：查找 node_modules 下的包名文件夹中的 index.js(常用)

### 依赖包版本问题

- npm 使用了 1.0.0 第一位如果变了 表示不兼容老代码 大规模的更新
- 第二位表示增加了一些功能
- 第三位 表示小的补丁

npm+ git

`npm version major minor patch` 更改版本 并且可以同步 git tag

- 版本：^2.0.0，只要不到 3 都可以 不能小于 2，如 2.0.1，2.2.2
- 版本：~2.1.0，不超过 1 就 ok 2.1.2
- 版本：>=2.1.0
- 版本：<=2.0.0

软件版本的区别

[软件版本区别 - 简书 (jianshu.com)](https://www.jianshu.com/p/7bb5ba9363ef)

- **snapshot（快照），也即开发版**，我们创建 maven 项目时，编辑器会自动给我们填入 1.0-SNAPSHOT 版本，也就是 1.0 开发版，这个版本不能使用，因为该版本处于开发的过程，所以运行时会不时地更新，导致功能变化，正式环境中不得使用 snapshot 版本的库。
- **alpha，内部测试版**，来源于字母 α，是比较早的版本，主要是给开发人员和测试人员测试和找 BUG 用的，不建议使用。
- **beta，公开测试版**，来源于字母 β，这是比 alpha 进一步的版本，面向公众测试，但是不建议使用。
- **pre，这个和 alpha 版本类似**，有时还会细分为 M1,M2 版本，不建议使用；
- **RC(Release Candidate) 用在软件上就是候选版本**。系统平台上就是发行候选版本。
- **GA(General Availability)正式发布的版本**，在国外都是用 GA 来说明 release 版本的；
- **release，发行版**，这是 release 的中文意思，也就是官方推荐使用的版本（也就是我们经常下载的版本）。
- **stable，稳定版**，这个版本相比于测。试版更加稳定，去除了测试版许多的 bug，完善了一些功能，建议使用（也就是我们经常下载的版本）。
- **current 或者 lastest**（更常见的表示），最新版,但是不一定是稳定版本，需要看一下是否还有 release 或者 stable 等版本，可能存在坑，但是你不知道，只有产生了 BUG，你才知道，建议技术比较过硬的开发者使用。
- **eval，评估版**。可能会有一个月或者固定时间的使用期限，通常在使用收费软件的时候，该词较常见。

## 三、package.json 文件解析

文档：[package.json | npm 中文文档 | npm 中文网 (npmjs.cn)](https://www.npmjs.cn/files/package.json/)

### 一、"scripts"的原理

文档：[scripts | npm 中文文档 | npm 中文网 (npmjs.cn)](https://www.npmjs.cn/misc/scripts/)

`package.json`里面的`scripts`字段，可以用于定义脚本命令，供 npm 直接调用，这些脚本就叫做 npm 脚本

```json
{
    "scripts":{
        "start":"nodemon index.js"，
    }
}
```

执行`npm run start`命令的时候，相当于执行 `nodemon index.js`

#### 1.npm 原理

每当执行 npm run，就会自动新建一个 Shell（一般是 Bash），在这个 Shell 里面执行指定的脚本命令，所以只要是 Shell 可以执行的命令都可以卸载 npm 脚本里面，也就可以在 scripts 里面自定义脚本，任何可执行文件也都可以写在里面

`npm run`新建的这个 Shell，会将当前目录的 `node_modules/.bin` 子目录加入 `PATH` 变量，执行结束后，再将 PATH 变量恢复原样

当前目录的 `node_modules/.bin` 子目录里面的所有脚本，都可以直接用脚本名调用，而不必加上路径

```js
"test": "mocha test"
"test": "./node_modules/.bin/mocha test" // 不用加路径，可以不这样写
```

#### 2.简写的 npm 脚本

```js
npm start // npm run start
npm stop // npm run stop
npm test // npm run test
npm restart // npm run stop && npm run restart && npm run start
npm run // 会直接运行，列出package.json里面的所有的可执行脚本
```

#### 3.执行顺序

```js
// 并行执行 &
npm run hello.js &npm run world.js
// 串行执行,前一个成功才能执行后一个 &&
npm run hello.js && npm run world.js
```

#### 4.npm 钩子

npm run 为每条命令提供了 pre- 和 post- 两个钩子（hook）。以 npm run test 为例，如果我们的 scripts 字段规定了 pretest 和 posttest，两个钩子的含义分别是预执行、后执行

```js
prepublish:在打包和发布包之前运行，在npm install没有任何参数的本地运行
postpublish:发布包后运行
preinstall:包安装之前运行
postinstall:包安装后运行
preuninstall:在包卸载之前运行
postuninstall:在包卸载之后运行
preversion:在升级包版本之前运行
postversion:在升级包版本之后，提交之后运行
pretest:单元测试之前
posttest：测试之后
prestop:项目停止前
poststop：停止运行后
prestart:启动前
poststart：启动后
prerestart:重启前
postrestart：重启后
```

#### 5.变量

通过 npm*package*前缀，npm 脚本可以拿到 package.json 里面的字段

```js
{
  "name": "package.json",
  "version": "1.0.0",
  "repostitory":{
     "type":"git"
  }
   "script":{
       "view":"echo $npm_package_repository_type" // bash获得打印出来
    }
}
// 通过环境变量procss.env对象，拿到package.json的字段值
console.log(process.env.npm_package_name) // packages.json
console.log(process.env.npm_package_version) // 1.0.0
console.log(process.env.npm_package_repository_type) // git
```

### 二、项目依赖安装相关

- **"dependencies":{}** 字段：生产依赖，这些包会被打入最终的构建文件中。
- **"devDependencies":{}** 字段：开发依赖，这些包不会被打入最终的构建文件中。
- **"perrDependencies":{}** 字段：用来指定项目所依赖的包的版本范围，会提示你安装缺少的模块，默认要求带版本，但是这些包不会被打入最终的构建文件中。相反，这些包应该由项目的使用者自行安装。
- **"optionalDependencies":{}** 字段：指定项目所依赖的可选包的版本范围。这些包不会被打入最终的构建文件中，而是在运行时从 npm 仓库下载，如果找不到，不会影响 npm 的下载。
- **"bundleDependencies":[]** 字段：指定项目所依赖的包的版本范围，但是这些包会被打入最终的构建文件中。这个字段已经 被废弃 了，现在推荐使用 `dependencies` 字段来代替。

## 四、npx 是什么

### 1、npx 是 npm5.2 版本之后发布的一个命令

### 2、npx 是为了解决什么？

npx 的全称是 （node.js package execute），node.js 的包执行工具

**场景：**项目中(项目内部，不是全局)安装了测试工具 Mocha，我想在项目中调用 Mocha ，怎么调用？

**之前解决办法：**只能在项目脚本和 `package.json` 的 scripts 字段里面， 如果想在命令行下调用，只能像下面这样调用

```bash
./node_modules/.bin/mocha -v(--version)
```

如果对 bash 比较熟悉，也会这样写

```bash
`npm bin`/mocha --version
```

使用 npx，只需要：

```bash
npx mocha -v(--version)
```

### 3、npx 的原理是什么？

npx 在运行的时候，会到 [`node_modules/.bin`] 路径中找可执行的文件，如果找不到，就会去环境变量 [`$PATH`] 里找，如果依然找不到，就会帮你安装

### 4、--no-install 参数和 --ignore-existing 参数

- `--no-install`：强制使用本地模块，不下载远程模块，如果本地不存在该模块，便会报错
- `--ignore-existing`：忽略本地的同名模块，强制安装使用远程模块

### 5、执行 GitHub 源码

```bash
npx github:piuccio/cowsay hello
```

远程代码必须是一个模块，即必须包含 package.json 和入口脚本

### 6、开启静态服务器例子

开启一个静态服务器

```bash
npx http-server
```

### 7、create-react-app 例子

1.使用`create-react-app`创建一个 react 项目。

npm 安装库的方法：

```bash
npm install -g create-react-app

create-react-app my-app
```

npx 方式：

```bash
npx create-react-app my-app
```

**这条命令会临时安装 `create-react-app` 包，命令完成后`create-react-app` 会删掉，不会出现在 global 中。下次再执行，还是会重新临时安装。**

2.npx 甚至支持运行远程仓库的可执行文件：

```bash
npx github:piuccio/cowsay hello
```

3.指定[node](https://so.csdn.net/so/search?q=node&spm=1001.2101.3001.7020)版本来运行`npm scripts`：

```bash
npx -p node@8 npm run build
```

### 8、调用 nodemon

外面调用

```bash
node_moudules/.bin/nodemon --version
```

使用 npx

```bash
npx nodemon --version
```

## 五、配置 NPM

文档：

[folders | npm 中文文档 | npm 中文网 (npmjs.cn)](https://www.npmjs.cn/files/folders/)

## 六、Node 项目根目录下的 bin 文件夹

放置可执行文件，如：

`bin/www` 文件：项目启动入口，代码示例

```js
#! /usr/bin/env node

/**
 * Module dependencies.启动文件
 */

var app = require("../app");
var debug = require("debug")("demo:server");
var http = require("http");

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || "3000");
// app.set('port', port);

/**
 * Create HTTP server.
 * http://nodejs.cn/api/http.html#http_class_http_server
 * 返回的是一个http.Server实例，继承自: <net.Server>
 * http://nodejs.cn/api/net.html#net_class_net_server
 * 而<net.Server>继承自: <EventEmitter>
 * http://nodejs.cn/api/events.html#events_class_eventemitter
 */
var server = http.createServer(app.callback());

/**
 * Listen on provided port, on all network interfaces.
 */

// 启动 HTTP 服务器用于监听连接
server.listen(port);
// on方法来自于<EventEmitter>
// error、listening事件来自于<net.Server>
server.on("error", onError);
server.on("listening", onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
	var port = parseInt(val, 10);

	if (isNaN(port)) {
		// named pipe
		return val;
	}

	if (port >= 0) {
		// port number
		return port;
	}

	return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
	// 关于失败的系统调用描述：http://nodejs.cn/api/errors.html#errors_error_syscall
	// https://man7.org/linux/man-pages/man2/syscalls.2.html
	if (error.syscall !== "listen") {
		throw error;
	}

	var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

	// handle specific listen errors with friendly messages
	switch (error.code) {
		case "EACCES":
			// 拒绝访问)
			console.error(bind + " requires elevated privileges");
			// http://nodejs.cn/api/process.html#process_process_exit_code
			// 调用 process.exit() 将强制进程尽快退出，即使还有尚未完全完成的异步操作，包括对 process.stdout 和 process.stderr 的 I/O 操作。
			process.exit(1);
			break;
		case "EADDRINUSE":
			// 地址已经被使用
			console.error(bind + " is already in use");
			process.exit(1);
			break;
		default:
			throw error;
	}
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
	// http://nodejs.cn/api/net.html#net_server_address
	var addr = server.address();
	var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
	debug("Listening on " + bind);
}
```

在`package.json`文件中

```json
"scripts": {
 "start":"node ./bin/www"
}
```

终端输入`npm start`，则它将自动启动`./bin/www`文件

### npm 更新依赖包方式

需要全局安装 `npm-check-updates` 库，然后执行 `ncu -u` 命令，回车后即可开始更新

```bash
npm install npm-check-updates --global
# 更新当前项目依赖命令
ncu -u
```

### npm link 链接，创建快捷方式，指向命令，使命令可以在命令中使用

`www`文件

```bash
#! /usr/bin/env node
console.log('hello');
```

package.json 文件，lesson 是一个依赖包，

```bash
{
 "bin": {
  "lesson":"./bin/www"
 }
}
```

项目根目录中执行，npm link 链接，创建快捷方式，指向命令，使命令可以在命令中使用

```bash
npm link
```

这个时候就可以执行上面定义的"bin"下的命令了

```bash
lesson
```

## 七、yarn

官网：[Yarn (yarnpkg.com)](https://classic.yarnpkg.com/lang/en/)

0.npm 安装 yarn

```bash
# 全局安装yarn
npm install -g yarn
npm install yarn -g
# 查看是否安装成功
yarn --version
yarn -v
# 配置镜像源
yarn config set registry https://registry.npm.taobao.org -g
yarn config set sass_binary_site http://cdn.npm.taobao.org/dist/node-sass -g
# 检查源
yarn config get registry // https://registry.npm.taobao.org
yarn config get sass_binary_site // https://npm.taobao.org/mirrors/node-sass/

# 其他
# 初始化一个项目
yarn init
# 装包
yarn add packagename
yarn add packagename --dev
# 更新包
yarn upgrade packagename
# 删除包
yarn remove packagename
# 安装所有包
yarn
yarn install
# 发布包
yarn publish
# 查看包的缓存列表
yarn cache list
# 全局安装包 == npm -g
yarn global
```

1.检测哪些包可以升级

```bash
yarn outdated
```

2.升级指定包

```bash
yarn upgrade <package-name> --latest
# 或者这样单个更新
yarn add vue@latest # 可以在命令行中【回车键】或者【空格键】选择想要安装的版本
```

3.或者使用 yarn-upgrade-all 库 升级全部的依赖包

```bash
# 全局安装yarn-upgrade-all 库
npm install -g yarn-upgrade-all
# 执行升级全部依赖包
yarn yarn-upgrade-all
```

推荐使用这种更新方式，无需安装依赖。

```bash
yarn upgrade-interactive --latest
```

### yarn 和 npm 的命令对比

| 说明                             | Yarn                      | NPM/CNPM                     |
| -------------------------------- | ------------------------- | ---------------------------- |
| 初始化某个项目                   | yarn init                 | npm init                     |
| 默认安装依赖包                   | yarn install/link         | npm install/link             |
| 安装某个依赖并默认保存到 package | yarn add taco             | npm install taco --save      |
| 移除某个依赖                     | yarn remove taco          | npm uninstall taco --save    |
| 安装某个开发时的依赖             | yarn add taco -dev        | npm install taco --save -dev |
| 更新某个依赖项目                 | yarn upgrade taco         | npm update taco --save       |
| 安装某个全局依赖项目             | yarn global add taco      | npm install taco --global    |
| 发布/登录/退出，一系列 NPM 操作  | yarn publish/login/logout | npm publish/login/logout     |
| 运行某个命令                     | yarn run/test             | npm run/test                 |

## 八、pnpm

官网：[Fast, disk space efficient package manager | pnpm](https://pnpm.io/)

官网：<https://pnpm.js.org/installation/>

### 全局安装

```bash
npm install pnpm -g
```

### 设置源

```bash
# pnpm版本
pnpm --version
# 查看源
pnpm config get registry
# 切换淘宝源
pnpm config set registry https://registry.npmmirror.com/
```

### 使用

```bash
pnpm install pack
pnpm i pack
pnpm add pack       # -S  默认写入dependencies
pnpm add pack -D    # -D devDependencies
pnpm add pack -g    # 全局安装
```

### 移除

```bash
pnpm remove 包              # 移除包
pnpm remove 包 --global     # 移除全局包
```

### 更新

```bash
pnpm up                   # 更新所有依赖项
pnpm upgrade 包           # 更新包
pnpm upgrade 包 --global  # 更新全局包
```

### 设置存储路径

```bash
# 安装完记得重启下环境使其生效
# windows环境不好整就直接重启，重启后指定目录会生效

# pnpm全局仓库路径(类似 .git 仓库)
pnpm config set store-dir "D:\nodejs\pnpm\.pnpm-store"
# pnpm全局安装路径
pnpm config set global-dir "D:\nodejs\pnpm\pnpm-global"
# pnpm全局bin路径
pnpm config set global-bin-dir "D:\nodejs"
# pnpm创建pnpm-state.json文件的目录
pnpm config set state-dir "D:\nodejs\pnpm"
# pnpm全局缓存路径
pnpm config set cache-dir "D:\nodejs\pnpm\cache"
```

### 个人使用

- 一些需要 node-gyp 的包一定要记得安装好

### 在系统上禁止使用脚本解决方法

```shell
# 以管理员身份运行power shell
set-executionpolicy remotesigned
```

# hosts配置

```bash
#﻿#﻿# Copyright (c) 1993-2009 Microsoft Corp.
#
# This is a sample HOSTS file used by Microsoft TCP/IP for Windows.
#
# This file contains the mappings of IP addresses to host names. Each
# entry should be kept on an individual line. The IP address should
# be placed in the first column followed by the corresponding host name.
# The IP address and the host name should be separated by at least one
# space.
#
# Additionally, comments (such as these) may be inserted on individual
# lines or following the machine name denoted by a '#' symbol.
#
# For example:
#
#      102.54.94.97     rhino.acme.com          # source server
#       38.25.63.10     x.acme.com              # x client host
# localhost name resolution is handled within DNS itself.
#	127.0.0.1       localhost
#	::1             localhost
#127.0.0.1 www.test.com
#127.0.0.1 www.zzadmin.com
# github网站加速
# 140.82.112.3 github.com
# 199.232.5.194 github.global.ssl.fastly.net
# 54.231.114.219 github-cloud.s3.amazonaws.com
# 199.232.69.194 github.global.ssl.fastly.net
# 140.82.112.4 github.com
# npm 下载报错：getaddrinfo ENOENT raw.githubusercontent.com
# Edge浏览器侧边栏相关
#20.196.210.19 edgeservices.bing.com
#20.196.210.19 sydney.bing.com
#  ***VPN Official Webistes DNS Settings***
#104.18.200.99 www.ivacy.com
#104.18.85.5 billing.ivacy.com
#54.171.39.37 go.nordvpn.net
#54.171.39.37 nordvpn.net
#52.44.235.100 get.affiliatescn.net
#104.18.4.178 billing.purevpn.com
#104.16.113.39 www.purevpn.com
#45.33.2.97 affiliates.purevpn.com
#104.16.37.8 purevpn.com
#104.18.0.55 my.purevpn.com
#69.16.145.224 strongvpn.com
#69.16.145.224 intranet.strongvpn.com
#69.16.145.213 links.strongvpn.com
#192.200.155.38 affiliate.strongvpn.com
#104.16.53.111 support.strongvpn.com
#204.236.156.105 get.surfshark.net
#104.18.121.34 surfshark.com
#104.18.121.34 order.surfshark.com
#104.18.121.34 my.surfshark.com
#104.18.249.37 support.surfshark.com
#127.0.0.1 api.github.com
#127.0.0.1 gist.github.com
#127.0.0.1 raw.github.com
#127.0.0.1 githubusercontent.com
#127.0.0.1 raw.githubusercontent.com
#127.0.0.1 camo.githubusercontent.com
#127.0.0.1 cloud.githubusercontent.com
#127.0.0.1 avatars.githubusercontent.com
#127.0.0.1 avatars0.githubusercontent.com
#127.0.0.1 avatars1.githubusercontent.com
#127.0.0.1 avatars2.githubusercontent.com
#127.0.0.1 avatars3.githubusercontent.com
#127.0.0.1 user-images.githubusercontent.com
#127.0.0.1 objects.githubusercontent.com
#127.0.0.1 private-user-images.githubusercontent.com
#127.0.0.1 github.com
#127.0.0.1 pages.github.com
#127.0.0.1 githubapp.com
#127.0.0.1 github.io
#127.0.0.1 www.github.io
#127.0.0.1 pinterest.com
#127.0.0.1 www.pinterest.com
#127.0.0.1 pinimg.com
#127.0.0.1 sm.pinimg.com
#127.0.0.1 s.pinimg.com
#127.0.0.1 i.pinimg.com
#127.0.0.1 artstation.com
#127.0.0.1 www.artstation.com
#127.0.0.1 cdn-learning.artstation.com
#127.0.0.1 cdna.artstation.com
#127.0.0.1 cdn.artstation.com
#127.0.0.1 cdnb.artstation.com
#127.0.0.1 aleksi.artstation.com
#127.0.0.1 aroll.artstation.com
#127.0.0.1 dya.artstation.com
#127.0.0.1 yourihoek.artstation.com
#127.0.0.1 rishablue.artstation.com
#127.0.0.1 ww.artstation.com
#127.0.0.1 magazine.artstation.com
#127.0.0.1 imgur.com
#127.0.0.1 i.imgur.com
#127.0.0.1 s.imgur.com
#127.0.0.1 i.stack.imgur.com
#127.0.0.1 m.imgur.com
#127.0.0.1 api.imgur.com
#127.0.0.1 p.imgur.com
#127.0.0.1 www.imgur.com
#127.0.0.1 fufufu23.imgur.com
#127.0.0.1 thepoy.imgur.com
#127.0.0.1 blog.imgur.com
#127.0.0.1 cellcow.imgur.com
#127.0.0.1 t.imgur.com
#127.0.0.1 vercel.app
#127.0.0.1 in.appcenter.ms
#127.0.0.1 appcenter.ms
#127.0.0.1 local.steampp.net
# Added by Docker Desktop
192.168.1.5 host.docker.internal
192.168.1.5 gateway.docker.internal
# To allow the same kube context to work on the host and the container:
127.0.0.1 kubernetes.docker.internal
# End of section

# Steam++ Start
127.0.0.1 irc-ws.chat.twitch.tv
127.0.0.1 irc-ws-r.chat.twitch.tv
127.0.0.1 passport.twitch.tv
127.0.0.1 abs.hls.ttvnw.net
127.0.0.1 video-edge-646949.pdx01.abs.hls.ttvnw.net
127.0.0.1 id-cdn.twitch.tv
127.0.0.1 id.twitch.tv
127.0.0.1 pubsub-edge.twitch.tv
127.0.0.1 supervisor.ext-twitch.tv
127.0.0.1 vod-secure.twitch.tv
127.0.0.1 music.twitch.tv
127.0.0.1 twitch.tv
127.0.0.1 www.twitch.tv
127.0.0.1 m.twitch.tv
127.0.0.1 app.twitch.tv
127.0.0.1 badges.twitch.tv
127.0.0.1 blog.twitch.tv
127.0.0.1 inspector.twitch.tv
127.0.0.1 stream.twitch.tv
127.0.0.1 dev.twitch.tv
127.0.0.1 clips.twitch.tv
127.0.0.1 gql.twitch.tv
127.0.0.1 vod-storyboards.twitch.tv
127.0.0.1 trowel.twitch.tv
127.0.0.1 countess.twitch.tv
127.0.0.1 extension-files.twitch.tv
127.0.0.1 vod-metro.twitch.tv
127.0.0.1 pubster.twitch.tv
127.0.0.1 help.twitch.tv
127.0.0.1 link.twitch.tv
127.0.0.1 player.twitch.tv
127.0.0.1 api.twitch.tv
127.0.0.1 cvp.twitch.tv
127.0.0.1 clips-media-assets2.twitch.tv
127.0.0.1 client-event-reporter.twitch.tv
127.0.0.1 gds-vhs-drops-campaign-images.twitch.tv
127.0.0.1 us-west-2.uploads-regional.twitch.tv
127.0.0.1 assets.help.twitch.tv
127.0.0.1 discuss.dev.twitch.tv
127.0.0.1 dashboard.twitch.tv
127.0.0.1 store.ubisoft.com
127.0.0.1 fonts.gstatic.com
127.0.0.1 gravatar.com
127.0.0.1 secure.gravatar.com
127.0.0.1 www.gravatar.com
127.0.0.1 themes.googleusercontent.com
127.0.0.1 ajax.googleapis.com
127.0.0.1 fonts.googleapis.com
127.0.0.1 maxcdn.bootstrapcdn.com
127.0.0.1 google.com
127.0.0.1 www.google.com
127.0.0.1 hcaptcha.com
127.0.0.1 assets.hcaptcha.com
127.0.0.1 imgs.hcaptcha.com
127.0.0.1 www.hcaptcha.com
127.0.0.1 docs.hcaptcha.com
127.0.0.1 js.hcaptcha.com
127.0.0.1 newassets.hcaptcha.com
127.0.0.1 imgs3.hcaptcha.com
127.0.0.1 client-api.arkoselabs.com
127.0.0.1 epic-games-api.arkoselabs.com
127.0.0.1 cdn.arkoselabs.com
127.0.0.1 prod-ireland.arkoselabs.com
127.0.0.1 api.github.com
127.0.0.1 gist.github.com
127.0.0.1 raw.github.com
127.0.0.1 githubusercontent.com
127.0.0.1 raw.githubusercontent.com
127.0.0.1 camo.githubusercontent.com
127.0.0.1 cloud.githubusercontent.com
127.0.0.1 avatars.githubusercontent.com
127.0.0.1 avatars0.githubusercontent.com
127.0.0.1 avatars1.githubusercontent.com
127.0.0.1 avatars2.githubusercontent.com
127.0.0.1 avatars3.githubusercontent.com
127.0.0.1 user-images.githubusercontent.com
127.0.0.1 objects.githubusercontent.com
127.0.0.1 private-user-images.githubusercontent.com
127.0.0.1 github.com
127.0.0.1 pages.github.com
127.0.0.1 githubapp.com
127.0.0.1 github.io
127.0.0.1 www.github.io
127.0.0.1 pinterest.com
127.0.0.1 www.pinterest.com
127.0.0.1 pinimg.com
127.0.0.1 sm.pinimg.com
127.0.0.1 s.pinimg.com
127.0.0.1 i.pinimg.com
127.0.0.1 artstation.com
127.0.0.1 www.artstation.com
127.0.0.1 cdn-learning.artstation.com
127.0.0.1 cdna.artstation.com
127.0.0.1 cdn.artstation.com
127.0.0.1 cdnb.artstation.com
127.0.0.1 aleksi.artstation.com
127.0.0.1 aroll.artstation.com
127.0.0.1 dya.artstation.com
127.0.0.1 yourihoek.artstation.com
127.0.0.1 rishablue.artstation.com
127.0.0.1 ww.artstation.com
127.0.0.1 magazine.artstation.com
127.0.0.1 imgur.com
127.0.0.1 i.imgur.com
127.0.0.1 s.imgur.com
127.0.0.1 i.stack.imgur.com
127.0.0.1 m.imgur.com
127.0.0.1 api.imgur.com
127.0.0.1 p.imgur.com
127.0.0.1 www.imgur.com
127.0.0.1 fufufu23.imgur.com
127.0.0.1 thepoy.imgur.com
127.0.0.1 blog.imgur.com
127.0.0.1 cellcow.imgur.com
127.0.0.1 t.imgur.com
127.0.0.1 vercel.app
# Steam++ End
```

