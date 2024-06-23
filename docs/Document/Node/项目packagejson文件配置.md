# 项目 packagejson 文件配置

## 前言

package.json 是一个用于描述和配置项目的重要文件，其中包含了许多字段和选项，可以影响项目的构建、依赖管理、脚本执行等方面。了解这些字段可以帮助开发者更好地理解和控制项目的行为。

package.json 对于大部分前端开发者来说，知道 dependencies 与 devDependencies 就够了。但对于库开发者或有更高级需求的开发者来说，了解 package.json 的其他字段是非常有必要的。

本文介绍的字段分为官方字段与非官方字段。非官方字段是被主流打包工具（webpack，Rollup）所支持， 旨在提供更高级的配置和功能，以满足特定的构建需求，可能不具备通用性。

目前版本：v7.24.2

## 一、必须属性

### 1. name

定义项目的名称，不能以"."和"\_"开头，不能包含大写字母

### 2. version

定义项目的版本号，格式为：大版本号.次版本号.修订号

## 二、描述信息

### 1. description

项目描述

### 2. keywords

项目关键词

### 3. author

项目作者

```js
"author": "name (http://barnyrubble.tumblr.com/)"
```

### 4. contributors

项目贡献者

```js
"contributors": [
    "name <b@rubble.com> (http://barnyrubble.tumblr.com/)"
  ]
```

### 5. homepage

项目主页地址

### 6. repository

项目代码仓库地址

### 7. bugs

项目提交问题的地址

```js
 //提交问题的地址和反馈的邮箱,url通常是Github中的issues页面
"bugs": {
  "url" : "https://github.com/facebook/react/issues",
  "email" : "xxxxx@xx.com"
}
```

### 8. funding

指定项目的资金支持方式和链接

```js
"funding": {
    "type": "patreon",
    "url": "https://www.patreon.com/my-module"
  }
```

## 三、依赖配置

### 1. dependencies

生产环境的依赖包

如果不使用脱字符（^），安装的版本号固定；如果使用，则能安装当前大版本的最新版本，在 package-lock.json 中可查看当前实际安装的版本。

### 2. devDependencies

开发环境的依赖包，例如 webpack、vite、babel、ESLint 等，不会被安装到生产环境中

### 3. peerDependencies

对等依赖的作用：

1. 减小打包体积：例如使用 react 开发的组件库，安装 react 是必不可少的，而使用组件库的开发者，本地项目肯定安装了 react，因此开发的组件库中不必把 react 打包进去（期望项目的使用者来提供这些模块的实现）。
2. 版本一致性：使用你的组件库的开发者需要确保他们项目中安装了与你声明的对等依赖版本兼容的包，以确保组件库正常运行。

示例：声明要使用组件库，需在项目中安装大于 17.0.1 版本的 react

```js
"peerDependencies": {
    "react": ">17.0.1"
  }
```

### 4. peerDependenciesMeta

将对等依赖标记为可选，如果用户没有安装对等依赖，npm 不会发出警告

```js
"peerDependenciesMeta": {
    "react": {
      "optional": true //标记为可选
    }
  }
```

### 5. bundledDependencies

声明捆绑依赖项（使用情景较少）

### 6. optionalDependencies

声明可选依赖项（使用情景较少）

### 7. engines

声明对 npm 或 node 的版本要求

```js
"engines": {
    "node": ">=8.10.3 <12.13.0",
    "npm": ">=6.9.0"
  }
```

engines 只是起一个说明的作用，即使用户安装的版本不符合要求，也不影响依赖包的安装。

### 8. workspaces

单个代码库中统一管理多个包（monorepo），在 workspaces 声明目录下的 package 会软链到根目录的 node_modules 中。

#### 1. 初始化项目

```js
npm init -y
```

#### 2. 声明本项目是 workspaces 模式

```js
"private":"true",
  "workspaces": [
    "packages/*"
  ],
```

表示所有子包都在 packages 文件夹下

#### 3. 创建子包 p1

```js
npm init -w packages/p1 -y
```

在 node_modules/.package-lock.json 中可以看到 "link": true 链接符号信息

#### 4. 新建 packages/p1/index.js

```js
module.exports = "p1包";
```

#### 5. 创建子包 p2

```js
npm init -w packages/p2 -y
```

#### 6. 将子包 p1 添加到 p2 中

```js
npm i p1 -w p2
```

安装，卸载等命令都是一样的，只是多了"--workspace="参数（简写-w），用来指定在哪个包中执行命令

#### 7. 子包 p2 使用 p1

```js
const p1 = require("p1");

console.log("使用", p1);

module.exports = "p2包";
```

workspaces 功能与 lerna 类似，如果只需简单地管理多个包，workspaces 足够了。lerna 具有版本管理，发包提示，简化多包项目发布流程等更多功能。

## 四、脚本配置

### 1. scripts

脚本入口

### 2. config

用于定义项目的配置项，例如设置环境变量

1.config 配置

```js
"config": {
    "baseUrl": "https://example.com"
  }
```

2.scripts 配置

```js
"scripts": {
    "start": "node index.js",
},
```

### 3. 新建 index.js

```js
//使用process.env.npm_package_config_XXX取值
console.log(process.env.npm_package_config_baseUrl);
```

运行 npm run start，终端打印出 [example.com](https://example.com)

## 五、文件&目录

### 1. module（非官方字段）

指定 ES 模块入口文件

示例：当其他开发者在他们的项目中导入你的包时，会加载并执行包中的 dist/index.esm.js

```js
"main": "dist/index.esm.js"
```

### 2. main

指定 CommonJS 模块或 ES 模块入口文件。如果不指定该字段，默认是根目录下的 index.js

提示：从 Node.js 12.20.0 版本开始，"main" 字段也可以指定 ES 模块的入口文件

### 3. browser

指定浏览器使用的入口文件，例如 umd 模块。

### 4. types（非官方字段）

指定 TypeScript 类型声明文件（.d.ts 文件）的路径

### 5. exports（非官方字段）

当打包工具支持 exports 字段时（webpack、Rollup 等），以上 main，browser，module，types 四个字段都被忽略

"." 表示默认导出

"import": 指定了 ES module (ESM) 规范下的导出文件路径

"require": 指定了 CommonJS 规范下的导出文件路径

"browser": 指定了用于浏览器环境的导出文件路径

"types": 指定了类型声明文件的路径

```js
"exports": {
    ".": {
      "import": "./dist/index.esm.js",
      "require": "./dist/index.cjs.js",
      "browser": "./dist/index.umd.js",
      "types": "./dist/index.d.ts"
    }
  }
```

导出其他文件，例如除了导出默认路径，导出源文件

```js
"exports":{
    ...
  "./main" : "./src/main.js"
},
```

其他项目中使用

```js
import main from "packageName"; // . 方式定义的
import main from "packageName/main"; // ./main 方式定义的
```

### 6. type（非官方字段）

指定模块系统的使用方式，"commonjs"，"module"，"umd"，"json"

示例：指定模块系统为 ES module 模式，使用 CommonJS 文件时，需显式的定义为 .cjs 文件扩展名，来明确指定这些文件为 CommonJS 模块

```js
"type":"module"
```

### 7. files

指定哪些包被推送到 npm 服务器中

示例：只推送 index.js 和 dist 包到 npm 服务器

```js
"files": [
    "index.js",
    "dist"
  ],
```

可以在项目根目录新建一个.npmignore 文件，说明不需要提交到 npm 服务器的文件，类似.gitignore。写在这个文件中的文件即便被写在 files 属性里也会被排除在外

### 8. bin

定义在全局安装时可执行的命令（使用情景较少）

### 9. man

Linux 中的帮助指令（使用情景较少）

### 10. directories

定义项目目录结构的字段（使用情景较少）

## 六、发布配置

### 1. private

防止私有包发布到 npm 服务器，要发布到 npm 上设为 false

### 2. preferGlobal（非官方字段）

当设置 "preferGlobal" 字段为 true 时，它表示你的包更适合以全局方式安装，而不是作为项目的依赖项进行本地安装。

这个字段的设置是为了向用户传达关于你的包的最佳使用方式的建议。它并不会直接影响包的安装方式或包管理器的行为。

### 3. publishConfig

在发布包时指定特定的配置

示例：指定包发布的注册表 URL，指定所有用户都可以访问（私有的会收费）

```js
"publishConfig": {
    "registry": "https://registry.npmjs.org/",
    "access": "public"
  }
```

### 4. os

指定你的包适用的操作系统

示例：包只适用于 darwin（macOS）和 linux

```js
"os": ["darwin", "linux"]
```

示例：禁用 win32

```js
"os"["!win32"]; //禁用的操作系统
```

### 5. cpu

该配置和 OS 配置类似，用 CPU 可以更准确的限制用户的安装环境

### 6. license

指定软件的开源协议：

ISC：在所有副本中保留版权声明和许可证声明，使用者就可以拿你的代码做任何想做的事情，你也无需承担任何责任

MIT：在所有副本或主要部分中保留版权声明和许可证声明，使用者就可以拿你的代码做任何想做的事情，你也无需承担任何责任

开源协议查询地址：[opensource.org/licenses/](https://opensource.org/licenses/)

## 七、第三方配置（非官方字段）

### 1. eslintConfig

eslint 的配置，更推荐新建 .eslintrc 进行配置

使用参考：[新建 .eslintrc](https://juejin.cn/post/7228978346502946874#heading-16)

### 2. babel

babel 的配置，更推荐新建 .babelrc 进行配置

### 3. unpkg

unpkg 是一个基于 CDN 的前端包托管服务，用于在浏览器中直接引用和加载 npm 上发布的包。

无需下载，直接通过 `<script>` 标签引用

```js
<script src="https://unpkg.com/package-name@version"></script>
```

### 4. lint-staged

lint-staged 是一个在 Git 暂存文件上运行 linters 的工具，通常配合 gitHooks 一起使用。

使用参考：[配置 husky、lint-staged、@commitlint/cli](https://juejin.cn/post/7228978346502946874#heading-22)

### 5. browserslist

告知支持哪些浏览器及版本，Autoprefixer 常用到它

```js
"browserslist": [
    "defaults",
    "not ie < 8",
    "last 2 versions",
    "> 1%",
    "iOS 7",
    "last 3 iOS versions"
  ]
```

### 6. sideEffects

指示包是否具有副作用，协助 Webpack，Rollup 等进行 tree shaking

多数情况下可以直接设置为 false，这样打包工具就会自动删除未被 import 的代码

但是有些情况例外

1. 有一些特定的模块文件，它们执行一些副作用操作，如注册全局事件监听器、修改全局状态等。
2. 告诉构建工具不要将样式文件排除在无用代码消除的优化范围之外

```js
"sideEffects": ["./path/to/module.js", "*.css"]
```
