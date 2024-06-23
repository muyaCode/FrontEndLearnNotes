# webpack

[前端项目打包构建演进史 (qq.com)](https://mp.weixin.qq.com/s/511qRlsnDlaK_9UW0N8PlQ)

官网：[webpack (docschina.org)](https://webpack.docschina.org/)

loader 文档：[webpack 中文文档 (docschina.org)](https://webpack.docschina.org/loaders#root)

配置文档：[概念 | webpack 中文文档 (docschina.org)](https://webpack.docschina.org/concepts/)

---

webpack 是一个打包模块化 JS(静态模块打包工具)的工具，在 webpack 里一切文件都是模块，通过 loader 转换文件，通过 plugin 注入钩子，最后输出由多个模块组合成的文件。webpack 专注于构建模块化项目。

打包器(构建工具)会将所有依赖关系按照规则合并为单个 JS 文件，一次加载； 最终，生成浏览器能够使用的静态资源

## webpack 的安装

在 Node 环境下：

1.全局安装，需要两个：webpack 核心模块、webpack-cli 命令行工具；

```bash
npm i webpack webpack-cli -g
```

2.在本地的项目中安装 webpack，--save-dev 可以简写为-D；

本地安装，就只能在本项目中使用 webpack 命令，并且需要 npx 命令;

```bash
npm i webpack webpack-cli -D
```

PS：官方推荐使用本地安装，这样如果有多版本的话，不会导致冲突。

## webpack 的配置和使用

官网配置文档：[概念 | webpack 中文文档 (docschina.org)](https://webpack.docschina.org/concepts/)

### webpack 五个核心概念

**1.Entry**

入口(Entry)指示 webpack 以哪个文件为入口起点开始打包，分析构建内部依赖图。

**2.Output**

输出(Output)指示 webpack 打包后的资源 bundles 输出到哪里去，以及如何命名。

**3.Loader**

Loader 让 webpack 能 够 去 处 理 那 些 非 JavaScript 文 件 (webpack 自 身 只 理 解

JavaScript)

**4.Plugins**

插件(Plugins)可以用于执行范围更广的任务。插件的范围包括，从打包优化和压缩，

一直到重新定义环境中的变量等。

**5.Mode**

模式(Mode)指示 webpack 使用相应模式的配置。

| 选项        | 描述                                                                                                                                                                                                                                        | 特点                        |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| development | 会将 DefinePlugin 中 process.env.NODE_ENV 的值设置 为 development。启用 NamedChunksPlugin 和 NamedModulesPlugin。                                                                                                                           | 能让代码本地调试 运行的环境 |
| production  | 会将 DefinePlugin 中 process.env.NODE_ENV 的值设置 为 production。启用 FlagDependencyUsagePlugin, FlagIncludedChunksPlugin, ModuleConcatenationPlugin, NoEmitOnErrorsPlugin, OccurrenceOrderPlugin, SideEffectsFlagPlugin 和 TerserPlugin。 | 能让代码优化上线 运行的环境 |

### 演示需求和配置

配置文档：[配置 | webpack 中文文档 (docschina.org)](https://webpack.docschina.org/configuration/#use-different-configuration-file)

#### (1) 初始化配置

##### 1.初始化 package.json

项目根目录终端入命令:

```bash
npm init
```

##### 2.下载并安装 webpack

项目根目录终端入命令:

```bash
npm install webpack webpack-cli -g

npm install webpack webpack-cli -D
```

#### (2) webpack 编译打包应用

##### 1.创建文件

##### 2.运行指令

开发环境指令：

```bash
webpack src/js/index.js -o build/js/built.js --mode=development
```

功能：webpack 能够编译打包 js 和 json 文件，并且能将 es6 的模块化语法转换成

浏览器能识别的语法。

生产环境指令：

```bash
webpack src/js/index.js -o build/js/built.js --mode=production
```

功能：在开发配置功能上多一个功能，压缩代码。

> 这些指令可以在 `pacakage.json `的"script"里配置好方便执行

##### 3.结论

webpack 能够编译打包 js 和 json 文件。

能将 es6 的模块化语法转换成浏览器能识别的语法。

能压缩代码。

##### 4.问题

不能编译打包 css、img 等文件。

不能将 js 的 es6 基本语法转化为 es5 以下语法。

#### (3) webpack 开发环境的基本配置

**1** **创建配置文件**

1.创建文件 webpack.config.js

2.配置内容如下

```js
const { resolve } = require("path"); // node 内置核心模块，用来处理路径问题。

module.exports = {
	entry: "./src/js/index.js", // 入口文件
	output: {
		// 输出配置
		filename: "./built.js", // 输出文件名
		path: resolve(__dirname, "build/js"), // 输出文件路径配置
	},
	mode: "development", //开发环境
};
```

终端运行指令：`webpack`

#### 一．模块打包

1.我们创建 02 目录，在其创建约定俗成的两个子目录 `src` 和 `dist`；

2.其中：src 表示源文件，dist 表示生成发布的文件；

3.在 src 中建立两个 js 文件，用 node 环境支持的 CommonJS 规范的模块化；

```js
// module.js
module.exports = {
  'Mr.Lee'
};

// index.js
const name = require('./module.js').name;
console.log(name);
```

4.建立 02.html 文件，引入 src 中的 index.js 文件，但浏览器是无法运行的；

5.此时，我们需要进行打包来解决两个问题：浏览器兼容和导入导出 js 文件的合并；

6.使用**打包命令**，注意目录的问题，如果在根目录带上子目录路径；

```bash
# -o 表示输出
# --mode= 值development 表示开发模式，production 表示生产模式，压缩成一行；
webpack ./02/src/index.js -o ./02/dist/bundle.js --mode=development
```

PS：只要打包入口文件即可，依赖的文件会自动合并；

#### 二．配置文件

打包一次的命令太过于冗长，且特别容易出错，所以要对这些路径参数进行存储；

##### package.json 的 Node 配置文件

1.我们可以创建 package.json 文件，来配置 scripts 属性来部署生成路径；

生成 package.json 配置文件命令

```bash
npm init -y
```

2.然后在 package.json 配置文件中的 `scripts` 属性里添加子属性：build，属性值具体如下：

```bash
"build" : "webpack ./02/src/index.js -o ./02/dist/bundle.js --mode=development"
```

3.然后使用 npm 命令自动执行这个属性值的路径；

```bash
npm run build
```

如果是比较简单的打包，package.json 还行，当参数越发复杂维护将变得困难；

##### webpack.config.js 配置文件

1.Webpack 还提供了一个 webpack.config.js 配置文件，解决 package.json 当参数越发复杂维护将变得困难的问题；

2.由于我们是子目录 01,02 这种，完全可以直接存放子目录中即可；

3.也就是说，配置文件不一定非要存放在根目录，可以根据自己目录结构进行调整；

```js
/* 
webpack 构建时，会自动读取此文件 
*/
//获取当前路径
const path = require("path");
module.exports = {
	// 入口文件
	entry: "./src/index.js",
	// 出口文件
	output: {
		// 文件名
		filename: "bundle.js",
		// 路径，要绝对路径
		path: path.resolve(__dirname, "./dist"),
	},
	// 生成模式: 'production': 'none' | 'development' | 'production'
	mode: "development",
};
```

#### 三.webpack.config.js 配置文件后的打包命令

PS：在哪个目录，就进入哪个目录，直接执行命名：`webpack`，即执行打包

### DevServer 服务整合

文档：[DevServer | webpack 中文文档 (docschina.org)](https://webpack.docschina.org/configuration/dev-server/)

将 DevServer 服务工具整合部署到 Webpack

#### 一．问题需求

- 1.由于代码可能有 CommonJS 等非浏览器支持的语法，每次都必须打包才行运行；
- 2.虽然借助 Webstorm 等工具可以构建服务器环境，但实际上不能时时监控刷新；
- 3.IDE 提供的服务器之间访问的是打包后的文件，是否监听时时刷新看个人习惯；
- 4.以上：如果要方便的话，开发者需求的想法是，开发时方便调试，最后再打包；
- 5.所以，官方提供了 `Webpack-dev-Server` 工具来解决这个问题，支持特性：
  - (1) .支持 HTTP 服务访问：localhost、127.0.0.1 这种
  - (2) .监听变化时时刷新网页，时时预览
  - (3) .支持 Source Map

#### 二．安装和使用配置

1.DevServer 只要安装到本地即可使用，命令如下:

```bash
npm i webpack-dev-server -D
```

2.在 `webpack.config.js` 配置一些最基本的参数，方便运行；

```js
// devServer 自动化
devServer: {
    // 访问路径
	publicPath : '/dist',
	// 独立端口
	port : 3000,
	// 迷你型服务启动信息
	stats: 'minimal',
},
```

- 本地我们可以删除 dist 目录，还原打包之前再启动 devServer，测试效果；
- 此时我们可以发现并不需要打包到本地，它是自动打包到内存让你时时预览调试的；
- 也就是说：调试阶段，可以用 devServer，完成了，再最终打包到本地即可；

  3.我们可以在子目录生成一个 package.json 文件，在 scripts 设置 dev 属性；

```json
"dev": "webpack-dev-server"
```

运行命令

```bash
npm run dev
```

7.目前这个版本，火狐还是会有断开服务器的提醒，不过完全不影响我们调试；

8.如果强迫症的同学，有两种解决方案：

(1) .注释掉输出的错误信息，或者把错误提醒改成信息提醒；

(2) .或者在 devServer 设置错误级别：

```json
clientLogLevel: 'none'
```

PS：还有火狐还会出现 `sockjs.js.map` 的警告，可以设置 devTool 解决；

```json
devtool: 'source-map',
```

PS：以上问题，谷歌浏览器均不存在！

### Plugin 部署 HTML 插件

#### 一．问题需求

1.目前为止，我们只能打包 js 文件模块，事实上：HTML 文件也需要打包到一起；

2.也就是说，我们需要把.js 和.html 文件都要打包到 dist 目录中去；

可以使用 HTML 插件解决路径问题

#### 二．安装和使用配置

1. 首先，安装 html-webpack-plugin 插件，本地安装即可；

```bash
npm i html-webpack-plugin -D
```

PS：安装好后，可以在 package.json 中看到版本号；

2. 我们删除掉 src 外面的.html 文件，在 src 建立 index.html 文件，用于打包；

3. 我们并不需要在.html 文件中使用`script`标签引入.js 文件，让插件处理；

4. 在 webpack.config.js 中，引入插件，具体如下：

```json
// html 插件
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 插件
plugins: [
	new HtmlWebpackPlugin({
        // 值为默认值(可以不写)，源文件
		template: "./src/index.html",
		// 值为默认值(可以不写)，打包生成的文件名
		filename: "index.html"
	})
],

// 运行配置：devServer，publicPath 可以忽略
devServer: {
    // publicPath : '/dist',
    port : 3000,
    stats : "minimal",
},
```

5. 经过上述的一系列操作，解决了两个问题，打包后引入.js 文件，会自动引入；

6. 在使用 DevServer 时，`localhost:3000` 直接访问的就是 index.html；

7. 如果想要.html 和.js 打包后存在不同目录，可设置，并会自动链接；

```json
filename: 'js/bundle.js',

filename: "html/index.html"
```

```html
<script src="../js/bundle.js"></script>
```

PS：打包后，上节课的 source map 生成了一个.map，这个在火狐刷新会引起弹窗；

PS：只要使用 inline-source-map，不生成文件，在最后生成一行文本即可；

### Loader 打包 CSS 文件

#### 一．问题需求

- 1.通过之前的学习，我们知道如何打包 js 模块和 html 页面，并融合；
- 2.还有一种东西需要处理，就是 css 样式以及 less、sass 等预处理样式；
- 3.思路也是一样的，调试的时候可以试试监听，打包的时候也能融合；
- 4.这里需要使用 module 这个属性，并需要安装使用以下三种**CSS 相关插件**：
  - (1).`css-loader`：读取和编译 css 文件，转换为样式字符模块；
  - (2).`style-loader`：将 css 插入到 JavaScript 中；
  - (3).`less-loader`：读取和编译 less 预处理样式，转换为 css 文件；

#### 二. 打包普通.css 文件

1.首先，我们先创建两个基本的 css 文件，另一个引入其中一个；

```css
/*font.css*/
h1 {
	color: blue;
	font-size: 200px;
}

/*base.css*/
@import "font.css";

body {
	background-color: gray;
}
```

PS：和打包 html 文件一样，css 文件并不需要你手动去 link 引入，让插件处理；

2.然后在.js 文件中，把.css 文件通过 require 引入进来；

```js
require("./base.css");
```

3.安装所需的 `css-loader` 插件和 `style-loader` 插件；

```bash
npm i css-loader -D

npm i style-loader -D
```

PS：安装完成后，可以在 package.json 检查版本号，确认已安装；

4.在 `webpack.config.js` 中，使用 module 进行 css 文件部署工作；

```json
// 模块
module: {
    // 规则
    rules: [
        {
            // 规则获取需要部署的文件后缀
            test: /\.css$/,
            // style-loader 将 css 字符串插入到 javascript
            // 通过浏览器工具样式被动态插入到<style>标签内
            // css-loader 将 css 文件编译成字符串给 style-loader 处理
            // 所以，这里数组的执行顺序是从右到左执行，否则失败
            use : ['style-loader','css-loader']
        },
        {

        },
    ]
},
```

#### 三. 打包预处理样式

还有一种 css 编码方式是：预处理样式，比如 Less，sass 等；

1.首先创建一个 less.less 预处理样式文件，代码 css 一样即可，然后引入；

```js
require("./less.less");
```

2.我们这里简单使用一下 Less 先做一个基础了解，先安装 less-loader；

```bash
npm i less-loader -D
```

配置

```json
{
    test: /\.less$/,
    //less-loader 会先将.less 文件转换为.css 文件，然后再向左边处理
    use : ['style-loader', 'css-loader', 'less-loader']
}
```

### Loader 打包图片资源

文档：[webpack 中文文档 (docschina.org)](https://webpack.docschina.org/guides/asset-modules#root)

#### 一．打包思路

1.继续打包文件：`图片文件`，分为 css 引入图片和 html 插入图片；

2.如果是 css 加载图片，都是背景图，总所周知小图片采用 base64 转换字符串；

3.而大图片和 html 插图图片，则都需要单独的 loader 插件来完成；

4.本节课用到的 **loader 插件**如下：

(1).`file-loader`：解析 JavaScipt 和 css 插入的图片；

(2).`url-loader`：将图片转换为 base64 编码字符串；

(3).`html-loader`：将.html 进行打包，从而解析 img 插入问题；

#### 二．安装和使用配置

##### file-loader 插件：解析 JavaScipt 和 css 插入的图片

1.安装并配置

```bash
npm i file-loader -D
```

2.在 `webpack.config.js` 中配置

```json
{
    test: /\.(png|jpg|gif)/,
    use : ['file-loader']
}
```

CSS 文件

```css
#loading {
	width: 780px;
	height: 422px;
	background-image: url("./loading.gif");
}
#ts {
	width: 609px;
	height: 609px;
	background-image: url("./ts.png");
}
```

PS：也可以在.js 文件引入图片，会被自动解析

```js
const img = require("./ts.png");
console.log(img);
```

2.现在，我们要扩展这个插件内容，要求自定义目录和名称，继续在 `webpack.config.js` 中配置：

```json
{
    test: /\.(png|jpg|gif)/,
    loader: 'file-loader',
    // 加载一个 loader
    options: {
        name : './img/[name].[ext]',
        // 写入 img 目录，且按原名和后缀,
    }
},
```

##### url-loader：将图片转换为 base64 编码字符串；

1.插件：`url-loader`，我们限定小于 10kb 的，直接用 base64 编码保存图片；

具体为何要用这么做：扩展要探讨很多，直接搜索相关关键字了解；

总结就是一句话：小图片用 base64 性比价收益最高，反之一样；

```bash
npm i url-loader -D
```

2.在 `webpack.config.js` 中配置

```json
{
    test: /\.(png|jpg|gif)$/,
    // 这里使用 url-loader，它依赖 file-loader
    // 通过先判断图片大小，小的采用 base64，大的采用 file-loader
    loader: 'url-loader',
    options: {
        // 限定 10kg 一下采用 base64 编码
        limit : 10240,
        name : './img/[name].[ext]'
    }
},
```

##### html-loader：将.html 进行打包，从而解析 img 插入问题

1.安装

```bash
npm i html-loader -D
```

2.在 `webpack.config.js` 中配置

```json
{
    test: /\.html$/,
    // 自动交给 url-loader 处理
    use : ['html-loader']
},
```

### 打包其他资源-字体图标

如在阿里图标库下载到项目中使用的图标文件

1.文件加载插件`file-loader`，如果安装了就不用再安装

```bash
npm i file-loader -D
```

2.在 `webpack.config.js` 中`module: { rules: [  ]}`配置

```js
module.exports = {
	// 模块
	module: {
		// 规则
		rules: [
			{
				// 使用法
				// test: /\.(ttf|svg)$/,
				// 排除法
				exclude: /\.(js|json|html|css|less|scss|png|gif|jpg|jpeg)$/,
				loader: "file-loader", // 插件加载
				options: {
					outputPath: "font/",
					publicPath: "./font",
					name: "[name][hash:8].[ext]",
				},
			},
		],
	},
};
```

### 分离 CSS 分类打包

1.虽然之前我们使用 `style-loader` 和 `css-loader` 进行打包；

2.但这种打包是融入到.js 里面最终生成的，并不是独立的.css 文件；

3.之前使用了 html 插件进行.html 打包，这次使用 css 打包的插件为`mini-css-extract-plugin`：

```bash
npm i mini-css-extract-plugin -D
```

在 `webpack.config.js` 中配置

```json
// 获取 css 插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 插件
plugins: [
    new MiniCssExtractPlugin({
    	filename : './css/[name].css',
    })
],
// 模块
module: {
  rules: [
      use: [
        {
            loader : MiniCssExtractPlugin.loader,
            options: {
      			// 设置绝对路径：和其他静态处理插件配置的 outputPath 配置加上 img、js、css 等相结合
                publicPath : '../'
            }
        },
        'css-loader'
      ]
  ]
}
```

PS：使用`域名/img` 这种模式，方便把 img,js,css 等静态资源部署到 cdn 上；

PS：也可以设置开发 src 和 dist 目录结构保持相同，这样更加清晰。

### PostCss 兼容性转换

#### 一．兼容处理-postcss-loader

1.CSS 尤其是很多 CSS3，在部分浏览器是有兼容处理的，需要进行设置；

2.可以使用 `postcss-loader` 来实现 CSS 语法的兼容性处理；

```bash
npm i postcss-loader -D
```

在 `webpack.config.js` 中`module: { rules: [  ]}`配置

```json
// 放在最右边
use : [
	...
	'postcss-loader'
]
```

##### autoprefixer 转换插件

npm：[autoprefixer - npm (npmjs.com)](https://www.npmjs.com/package/autoprefixer)

3.单有 postcss-loader 还不行，需要搭配创建 `autoprefixer` 插件转换；

```bash
npm i autoprefixer -D
```

4.这个插件会在需要兼容性的样式加上 CSS 前缀，比如：-ms、-webkit 等；

5.我们在 base.css 和 font.css(被@import 导入)，增加需要兼容的 css；

```css
display: flex;
transform: rotateY(130deg);
```

6.在当前目录创建 postcss.config.js，用来配置兼容的浏览器；

配置文档：

```json
const AutoPreFixer = require('autoprefixer');

module.exports = {
	plugins: [
   		new AutoPreFixer({
            // 配置文档：https://github.com/browserslist/browserslist#queries
        	overrideBrowserslist: [
                // 可以写多个列表
                '> 0.15% in CN'
       		]
       })
	]
}
```

采用了@import，被导入的 css 无法解析：webpack.config.js

```js
{
    // 由于采用了@import，被导入的 css 无法解析，需要设置 importLoaders=1 即可
    loader : 'css-loader',
    options: {
        importLoaders: 1
    }
}
```

#### 二．CSS4 代码兼容

1.除了兼容浏览器之外，还可以通过 `postcss-preset-env` 实现 CSS4 代码兼容；

```bash
npm i postcss-preset-env -D
```

CSS

```css
:root: {
	--green: green;
}
h1 {
	color: var(--green);
}
```

webpack.config.js 配置

```json
// 请注意：如果使用 postcss-preset-env，就删除 autoprefixer
// 因为 post-preset-env 集成了 autoprefixer，不需要再引入设置
const PostPresetEnv = require('postcss-preset-env);

module.exports = {
    plugins: [
        new PostPresetEnv({
            browsers: [
            	'> 0.15% in CN'
            ]
        }),
    ]
}
```

### Babel 转换 ES6 语法

1.我们有时需要将 ES6+的语法转换成 ES5，让兼容性更好一些；

2.这时需要有三个模块需要安装，具体如下：

- (1).`babel-loader`：与 Webpack 协同工作的模块，加载处理 js 文件；

- (2).`@babel/core`：Babel 编译器的核心模块，是 babel-loader 依赖；

- (3).`@babel/preset-env`：Babel 预置器，用于分析 ES6 语法；

  3.我们安装上述三个模块，然后进行配置，具体方法如下：

```bash
npm i babel-loader @babel/core @babel/preset-env -D
```

在 `webpack.config.js` 中`module: { rules: [  ]}`配置

```json
{
    test : /\.js$/,
    loader: 'babel-loader',
    options: {
        presets : [
            '@babel/preset-env'
        ]
    }
}
```

4.我们在 src 中的 js 文件，使用 ES6 的箭头函数来尝试一下；

```js
let fn = (x, y) => x + y;
console.log(fn(10, 20));
```

- 在没有使用 Babel 时，它打包会原封不动的使用 ES6 语法；
- 在使用 Babel 之后，编译后的代码如下：

```js
var fn = function fn(x, y) {
	return x + y;
};
console.log(fn(10, 20));
```

5.如果你使用了未纳入标准(提案中)的代码，打包时，它会提醒你安装相关插件；

```json
// 提案中，尚未纳入标准的语法
class Person {
    // 新语法私有属性
    #name;
    constructor() {
        this.#name = 'Mr.Lee';
    }
}
```

安装报错提示安装的插件

```bash
npm i @babel/plugin-proposal-class-properties -D
```

配置

```json
{
    test : /\.js$/,
    loader: 'babel-loader',
    options: {
        presets : [
            '@babel/preset-env'
        ],
        // 新的插件配置
        plugins : [
        	'@babel/plugin-proposal-class-properties'
    	]
    }
}
```

### ESLint 校验 JavaScript 代码

#### 一．安装模块

1.基本的 ESLint 实现，需要一下安装以下模块：

- (1).`eslint`：JS 代码检查工具核心模块；
- (2).`eslint-loader`：webpack 协同模块；

  2.首先，先安装 eslint，然后安装配置信息；

```bash
npm i eslint -D
```

生成文件 eslint 配置文件`.eslintrc.js`命令

```bash
eslint --init
```

PS：网上也会别人生成的配置信息可以拿来用，也可以去官网：http://eslint.cn/demo/，参考生成信息；

3.我们安装 `eslint-loader` 模块；

```bash
npm i eslint-loader -D
```

4.最后，我们在 `webpack.config.js` 中`module: { rules: [  ]}`配置；

```json
{
    test : /.js$/,
    loader: 'eslint-loader',
    // 编译前执行
    enforce: 'pre',
    // 不检查的目录
    exclude: /node_modules/
},
```

5.防止错误飘红太多，干扰演示，我们注释掉大部分代码，写上示例；

```js
var foo = bar;
```

最后，需要测试打包和预览提示校验；

### 多页面配置打包

#### 一．多页面配置

1.如果我们想生成多个.html 文件，比如 index.html 和 main.html；

2.此时，我们需要修改一下入口文件和出口文件；

```json
// 入口文件
entry: {
    // 把需要加载的 js 以键值对 方式
    index : './src/js/index.js',
    main : './src/js/main.js'
},
```

或

```json
// 入口文件，也支持 ES6 的箭头函数
entry: () => ({
    index : './src/js/index.js',
    main : './src/js/main.js'
}),
```

3.出口文件，需要按照入口文件的名称进行打包，否则只会打包一个；

```json
// 出口文件
output: {
    // 文件名
    filename : 'js/[name].js',
}),
```

4.最后，我们要使用 HtmlWebpackPlugin 插件来设置自己想要的打包方案；

```json
// 插件
plugins: [
    new HtmlWebpackPlugin({
        // 默认值
        template: "./src/index.html",
        // 默认值
        filename: "index.html",
        chunks: ['index', 'main']
    }),
    new HtmlWebpackPlugin({
        template: "./src/main.html",
        filename: "main.html",
        chunks: ['main']
    }),
]
```

### 压缩 HTML 和 CSS 代码

#### 一．压缩代码

为何要压缩代码？什么情况下要压缩？答：在生产环境下打包时节约资源；

##### 1. 压缩配置

既然在生产环境，那首先要把打包的配置更改为生产环境；

```json
// 生产环境模式
mode: "production",
```

PS：调节为生产环境打包，就会自动将 js 代码进行打包，不需要单独设置；

##### 2. HTML 代码压缩

对于 HTML 文件打包，通过 `HtmlWebpackPlugin` 插件，生产环境会自动压缩；

如果在开发环境中压缩，可以通过配置来设置要压缩的选项：

```json
minify: {
    // 是否去除空格，默认 false
	collapseWhitespace: true,
	// 是否移除注释 默认 false
	removeComments: true,
},
```

##### 3. CSS 代码压缩

对于 CSS 文件，就算设置了生成环境，它也不会自动压缩，此时需要另外设置；

```bash
npm i optimize-css-assets-webpack-plugin -D
```

webpack.config.js 配置

```json
// 获取 css 压缩插件
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')

// 插件
plugins: [
    // 压缩 css
	new OptimizeCssAssetsWebpackPlugin(),
],
```

### 编译打包 Scss 和 TypeScript

#### 一．Scss 编译打包

1.和 Less 一样，Scss 也是 Sass 的一种使用较多的语法；

```bash
npm install sass sass-loader node-sass -D
```

2.具体配置基本和 Less 一样，先创建.scss 文件，并引入；

在 `webpack.config.js` 中`module: { rules: [  ]}`配置

```json
{
    test: /\.scss$/,
    // 从右向左执行
    use : [
        MiniCssExtractPlugin.loader,
        'css-loader',
        'sass-loader'
    ]
},
```

#### 二．TypeScript 编译打包

官网：[TypeScript: JavaScript With Syntax For Types. (typescriptlang.org)](https://www.typescriptlang.org/zh/)

1.越来越流行的 TypeScript，是 JavaScript 的超集；

```bash
npm i typescript ts-loader -D
```

在 `webpack.config.js` 中`module: { rules: [  ]}`配置

```json
{
    test: /\.ts$/,
    use: 'ts-loader',
},
```

2.创建 `tsconfig.js`文件，是 TypeScript 配置文件，配置好 TypeScript 语言的编写配置；

参考配置：[typeScript tsconfig 配置详解 - 掘金 (juejin.cn)](https://juejin.cn/post/6844904093568221191)

3.再编写一个.ts 文件，然后通过 import 导入到 index.js；

```json
// type.ts
export const output = (content : string) => {
	return content
}

// import ts
import { output } from './type.ts'
console.log(output('Mr.Lee'))
```

3.如果要省略掉 import 中文件后缀，需要在 webpack.config.js 中配置；

```json
module.exports = {
    resolve: {
    	extensions: ['.ts', '.js']
    },
}
```

### Resolve 模块解析配置

文档：[解析(Resolve) | webpack 中文文档 (docschina.org)](https://webpack.docschina.org/configuration/resolve/)

#### 一．模块解析

1.我们使用了 typescript，在 import 不限定后缀会出现无法载入；

2.所以，我们使用了 Resolve 模块解析的中 extensions 来进行配置，如果没有配置会报错；

```json
// 模块解析
resolve: {
    // 导入文件查找的限定后缀，默认.js 和.js
    extensions: ['.ts', '.js', '.js', 'less', 'scss']
},
```

3.alias 配置可以用别名的方式，将导入路径映射成一个新的路径；

```json
// 模块解析
resolve: {
    // 导入文件查找的限定后缀，默认.js 和.js
    extensions: ['.ts', '.js', '.js', 'less', 'scss']，
    // 设置一个别名路径(绝对路径)
    alias: {
        css : path.resolve(__dirname, './src/css')
    }
},
```

在其他 js 文件中便可以这样引入

```js
require("css/base.css");
```

4.modules 配置可以指定 webpack 的解析模块目录；

```json
// 模块解析
resolve: {
    // 导入文件查找的限定后缀，默认.js 和.js
    extensions: ['.ts', '.js', '.js', 'less', 'scss']，
    // 设置一个别名路径(绝对路径)
    alias: {
        css : path.resolve(__dirname, './src/css')
    }
    // 解析模块目录：找到解析模块目录，如果当前找不到就不断往上一层找
    // modules: ['node_modules']
    // 解析模块目录：也可以设置指定目录直接查找，检查查找次数
    modules: [path.resolve(__dirname, '../node_modules')]
    // 也可以设置第二参数，防止第一参数找不到报错；
	// modules: [path.resolve(__dirname, '../node_modules'), 'node_modules']
},
```

### Source-Map 配置

文档：[webpack 中文文档 (docschina.org)](https://webpack.docschina.org/configuration/devtool#development)

1.**Source-map 可以将编译、打包、压缩后的代码映射到源代码上**；

2.比如你打包或运行的代码是编译后的，报错后，它能指向你源代码的位置上；

webpack.config.js 配置

```json
// 会生成一个.map 文件
devtool: 'source-map',
```

3.根据不同的方式，有下面几种类型：

```json
// 打包后会生成一个对应的.map 文件
source-map
// 打包后会在 js 文件的内部最后生成 map 内容
inline-source-map
// 打包后会在每个模块都执行 eval
eval-source-map
// 打包后会生成.map 文件但不会追踪原始文件的错误代码
hidden-source-map
// 打包后会生成.map 并只能精确到行
cheap-source-map

// 合并方法
eval-cheap-source-map
...
```

4.在开发环境和生产环境，我们该如何选择？开发要求速度快，调试方便推荐：

```json
// 开发环境
eval-source-map 或 eval-cheap-source-map

// 生产环境
source-map
```

### watch 监听和 clean 清理

#### 一.watch 监听

1.每次打包，都比较烦，耗时耗力，有一种解决方案：watch 文件监听；

2.这种解决方案，就是你打包时，就挂着监听你项目原始文件的变化，从而自动更新；

webpack.config.js 配置

```json
// 文件监听，默认 false
watch: true,
// 监听选项：当 watch: true, 才有效
watchOptions: {
    // 不监听解析模块目录
    ignored: /node_modules/,
    // 防止更新频率太快，默认 300 毫秒，意味监听到变化后 500 毫秒再编译
    aggregateTimeout: 500,
    // 轮询间隔时间，1 秒，询问系统指定文件是否变化了
    poll: 1000
},
```

#### 二.clean 清理

1.每次打包，都要手动删除生成文件的`dist`目录，因为不删除的话，改了配置目录就会多出废目录或文件；

2.所以，使用 clean-webpack-plugin 插件，来处理这个问题；

```bash
npm i clean-webpack-plugin -D
```

webpack.config.js 配置

```json
// 获取 clean 清理插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    plugins: [
        // 清理打包目录插件
        new CleanWebpackPlugin()
    ]
}
```

### HMR 热替换

- 1.页面调试有一个问题，就是当我们编辑了 css 或 js，它会自动刷新；
- 2.但如果有大量的 css 或 js，一个小修改，就要全部刷新，影响开发性能；
- 3.而 HMR 热替换就是解决这个问题，当 css 或 js 修改时，只刷新修改的部分；
- 4.对于 html 文件，不需要热替换，就一个文件；

#### 开启 HMR 热替换

在使用命令启动服务时加上`--hot`，或者在 webpack.config.js 的 devServer 配置；

webpack.config.js 配置

```json
module.exports = {
    devServer: {
        hot: true
    },
}
```

#### css 的热替换

对于 css 的热替换，需要使用 style-loader，而现在被抽离 css 插件替换了；

所以，我们先要注释掉这个插件，改为 style-loader；

在 `webpack.config.js` 中`module: { rules: [  ]}`配置

```json
test: /\.scss$/,
// 从右向左执行
use : [
// MiniCssExtractPlugin.loader,
'style-loader',
'css-loader',
'sass-loader'
]
```

#### html 文件修改自动更新

当开启了 HMR 热替换之后，发现 html 文件修改后无法自动更新了；

此时，我们需要在入口文件加入这个 html 文件，即可；

```json
entry: [
    './src/js/index.js',
    './src/index.html'
],
```

#### js 的热替换

对于 js 的热替换，只要在入口文件，对 `加载的其它的js 文件`进行设置即可；

```js
import name from "./module";
console.log(name);

if (module.hot) {
	module.hot.accept("./module", () => {
		console.log(name);
	});
}
```

### Axios 跨域请求

文档：[DevServer | webpack 中文文档 (docschina.org)](https://webpack.docschina.org/configuration/dev-server/)

1.这里提供两个远程 js 文件，会返回一些数据用于测试跨域问题；

https://cdn.liyanhui.com/data.js (可跨域，设置过)

https://cdn.ycku.com/data.js (不可跨域，默认)

2.安装 axios，用于 ajax 测试；

```bash
npm install axios -D
```

3.编写代码，测试数据；

```js
import axios from "axios";

axios.get("https://cdn.liyanhui.com/data.js").then((res) => {
	console.log(res.data);
});
```

PS：如果把地址中的 `liyanhui` 换成 `ycku` 的话，会出现跨域的问题；

4.通过 devServer 设置代理模式，来解决跨域问题；

webpack.config.js 配置

```js
module.exports = {
	devServer: {
		// 设置代理
		proxy: {
			// 匹配前缀为/api
			"/api": {
				// 目标域名 ip
				target: "https://cdn.ycku.com",
				// 改变源
				changeOrigin: true,
				// 重写 url， 去掉 /api
				pathRewrite: {
					"^/api": "",
				},
			},
		},
	},
};
```

### 环境分离设置

文档：[webpack 中文文档 (docschina.org)](https://webpack.docschina.org/guides/production#setup)

- 1.当配置文件写的越发繁杂时，发现生产环境的配置和开发环境配置有冲突；
- 2.此时，我们希望有两套配置文件，一套用于开发环境，一套用于生产环境；

  1.这里使用 js 合并插件 webpack-merge 来实现配置文件的分离保存

安装环境分离插件`webpack-merge`

```bash
npm i webpack-merge -D
```

2.将原先的 `webpack.config.js` 改为 `base.config.js`

3.我们项目根目录下创建另外两个文件 `dev.config.js`(开发)和 `prod.config.js`(生产)

dev.config.js 文件：开发环境配置`webpack-merge`插件

```js
// 合并 js 插件
const { merge } = require("webpack-merge");

// 基础配置
const base = require("./base.config");

// 开发环境配置
module.exports = merge(base, {
	// 把 `webpack.config.js` 改为 `base.config.js` 文件的配置复制过来
	//devServer
	devServer: {
		port: 3000,
		stats: "minimal",
		//代理
		proxy: {
			"/api": {
				target: "https://cdn.ycku.com",
				changeOrigin: true,
				pathRewrite: {
					"^/api": "",
				},
			},
		},
	},

	//devTool
	devtool: "eval-source-map",

	//开发模式
	mode: "development",
});
```

prod.config.js 文件：

```js
// 合并js插件
const { merge } = require("webpack-merge");
// 公共基础配置
const base = require("./base.config");
// css压缩插件
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
// 清理插件
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

// 生产环境配置
module.exports = merge(base, {
	// 把 `webpack.config.js` 改为 `base.config.js` 文件的配置复制过来
	//监听
	watch: true,

	//监听选项，当true时才有效
	watchOptions: {
		//不监听解析模块目录
		ignored: /node_modules/,
		//更新频率
		aggregateTimeout: 500,
		//轮询
		poll: 1000,
	},

	//插件
	plugins: [
		//清理打包
		new CleanWebpackPlugin(),
		//压缩css
		new OptimizeCssAssetsWebpackPlugin(),
	],

	//devTool
	devtool: "source-map",

	//生产模式
	mode: "production",
});
```

剩下的`base.config.js`文件配置

```js
// 路径
const path = require("path");
// html插件
const HtmlWebpackPlugin = require("html-webpack-plugin");
// css插件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	// 出口文件
	entry: "./src/js/index.js",

	// 出口文件
	output: {
		// 文件名
		filename: "js/bundle.js",
		// 路径，绝对路径
		path: path.resolve(__dirname, "./dist"),
	},

	// 模块解析
	resolve: {
		// 导入语句省略后缀
		extensions: [".ts", ".js", ".json", ".css", ".less", ".scss"],
		// 导入路径的别名
		alias: {
			css: path.resolve(__dirname, "./src/css"),
		},
		// 解析模块目录
		modules: [path.resolve(__dirname, "../node_modules"), "node_modules"],
	},

	// 模块
	module: {
		// 规则
		rules: [
			{
				test: /\.css$/,
				// 执行顺序是从右往左边
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							publicPath: "../",
						},
					},
					{
						loader: "css-loader",
						options: {
							importLoaders: 1,
						},
					},
					"postcss-loader",
				],
			},
			{
				test: /\.less$/,
				use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"],
			},
			{
				test: /\.scss$/,
				use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
			},
			{
				test: /\.(png|jpg|gif)$/,
				loader: "url-loader",
				options: {
					limit: 10240,
					name: "[name].[ext]",
					outputPath: "img",
				},
			},
			{
				test: /\.html$/,
				use: ["html-loader"],
			},
			{
				test: /\.js$/,
				loader: "babel-loader",
				options: {
					presets: ["@babel/preset-env"],
					plugins: ["@babel/plugin-proposal-class-properties"],
				},
			},
			{
				test: /\.ts$/,
				use: ["ts-loader"],
			},
			// {
			//     test : /\.js$/,
			//     loader : 'eslint-loader',
			//     // 编译前执行
			//     enforce: 'pre',
			//     // 不检查指定目录
			//     exclude: /node_modules/
			// }
		],
	},

	// 插件
	plugins: [
		new HtmlWebpackPlugin({
			template: "./src/index.html", // 默认
			filename: "index.html",
			minify: {
				collapseWhitespace: false, // 去掉空格
				removeComments: false, // 去掉注释
			},
		}),
		new MiniCssExtractPlugin({
			filename: "css/[name].css",
		}),
	],
};
```

4.分离好了之后，我们需要修改`package.json`，把"scripts"的启动命令修改成以下：

```json
"dev": "webpack-dev-server --config dev.config.js",
"build" : "webpack --config prod.config.js"
```

PS：打包命名更改为 npm run build 即可；其它不变；

### 打包优化和 dist 服务

optimiztion 选项文档：[优化(Optimization) | webpack 中文文档 (docschina.org)](https://webpack.docschina.org/configuration/optimization/#root)

#### 一．打包优化

1.webpack 提供了一个选项：`optimiztion` 来帮助我们优化；

2.只不过开启了生产环境，就自动开启了压缩，除了 css 需要我们自己弄；

3.我们使用自带的 `Terser-webpack-plugin` 插件来设置自己的压缩选项；

在`prod.config.js`生产环境文件配置

```js
// 打包优化插件
const TerserWebpackPlugin = require('terser-webpack-plugin');

module.exports = merge(base, {
    ...
    // 优化
    optimization: {
        // 如果是生成模式，自动为 true
        // minimize : true,
        // 配置 TW 插件
        minimizer : [
            new TerserWebpackPlugin({
                // 是否开启缓存，开启缓存加速
                cache : false,
                // 插件选项
                terserOptions : {
                    // 压缩方式
                    compress : {
                        // 剔除无用代码
                        unused : true,
                        // 剔除死代码
                        dead_code : true,
                        // 剔除 console.log
                        drop_console : true,
                        // 剔除 debugger
                        drop_debugger : true,
                    }
                }
            })
        ]
    },
}
```

#### 二．运行 dist 服务

1.打包后，我们想要在静态服务器上测试，先要安装静态服务器；

```bash
npm i serve -g
```

基于 dist 目录运行服务命令

```bash
serve dist -s
```

### 以上案例全部示例代码

在当前文档目录：./示例代码/webpack

## webpack 优化环境配置

**示例代码目录**：docs\Document\Project-Engineering\PackToBuild\示例代码\webpack 代码\4.webpack 优化环境配置

### 开发环境性能优化

- 优化打包构建速度

  - HMR

  - ```js
    /*
      HMR: hot module replacement 热模块替换 / 模块热替换
        作用：一个模块发生变化，只会重新打包这一个模块（而不是打包所有模块） 
          极大提升构建速度
          
          样式文件：可以使用HMR功能：因为style-loader内部实现了~
          js文件：默认不能使用HMR功能 --> 需要修改js代码，添加支持HMR功能的代码
            注意：HMR功能对js的处理，只能处理非入口js文件的其他文件。
          html文件: 默认不能使用HMR功能.同时会导致问题：html文件不能热更新了~ （不用做HMR功能）
            解决：修改entry入口，将html文件引入
    */
  
    const { resolve } = require("path");
    const HtmlWebpackPlugin = require("html-webpack-plugin");
  
    module.exports = {
    	entry: ["./src/js/index.js", "./src/index.html"],
    	output: {
    		filename: "js/built.js",
    		path: resolve(__dirname, "build"),
    	},
    	module: {
    		rules: [
    			// loader的配置
    			{
    				// 处理less资源
    				test: /\.less$/,
    				use: ["style-loader", "css-loader", "less-loader"],
    			},
    			{
    				// 处理css资源
    				test: /\.css$/,
    				use: ["style-loader", "css-loader"],
    			},
    			{
    				// 处理图片资源
    				test: /\.(jpg|png|gif)$/,
    				loader: "url-loader",
    				options: {
    					limit: 8 * 1024,
    					name: "[hash:10].[ext]",
    					// 关闭es6模块化
    					esModule: false,
    					outputPath: "imgs",
    				},
    			},
    			{
    				// 处理html中img资源
    				test: /\.html$/,
    				loader: "html-loader",
    			},
    			{
    				// 处理其他资源
    				exclude: /\.(html|js|css|less|jpg|png|gif)/,
    				loader: "file-loader",
    				options: {
    					name: "[hash:10].[ext]",
    					outputPath: "media",
    				},
    			},
    		],
    	},
    	plugins: [
    		// plugins的配置
    		new HtmlWebpackPlugin({
    			template: "./src/index.html",
    		}),
    	],
    	mode: "development",
    	devServer: {
    		contentBase: resolve(__dirname, "build"),
    		compress: true,
    		port: 3000,
    		open: true,
    		// 开启HMR功能
    		// 当修改了webpack配置，新配置要想生效，必须重新webpack服务
    		hot: true,
    	},
    };
    ```

- 优化代码调试

  - source-map（上面笔记也有详细说配置）

  - ```js
    const { resolve } = require("path");
    const HtmlWebpackPlugin = require("html-webpack-plugin");
    
    module.exports = {
    	entry: ["./src/js/index.js", "./src/index.html"],
    	output: {
    		filename: "js/built.js",
    		path: resolve(__dirname, "build"),
    	},
    	module: {
    		rules: [
    			// loader的配置
    			{
    				// 处理less资源
    				test: /\.less$/,
    				use: ["style-loader", "css-loader", "less-loader"],
    			},
    			{
    				// 处理css资源
    				test: /\.css$/,
    				use: ["style-loader", "css-loader"],
    			},
    			{
    				// 处理图片资源
    				test: /\.(jpg|png|gif)$/,
    				loader: "url-loader",
    				options: {
    					limit: 8 * 1024,
    					name: "[hash:10].[ext]",
    					// 关闭es6模块化
    					esModule: false,
    					outputPath: "imgs",
    				},
    			},
    			{
    				// 处理html中img资源
    				test: /\.html$/,
    				loader: "html-loader",
    			},
    			{
    				// 处理其他资源
    				exclude: /\.(html|js|css|less|jpg|png|gif)/,
    				loader: "file-loader",
    				options: {
    					name: "[hash:10].[ext]",
    					outputPath: "media",
    				},
    			},
    		],
    	},
    	plugins: [
    		// plugins的配置
    		new HtmlWebpackPlugin({
    			template: "./src/index.html",
    		}),
    	],
    	mode: "development",
    	devServer: {
    		contentBase: resolve(__dirname, "build"),
    		compress: true,
    		port: 3000,
    		open: true,
    		hot: true,
    	},
    	// 开启source-map功能
    	devtool: "eval-source-map",
    };
    
    /*
      source-map: 一种 提供源代码到构建后代码映射 技术 （如果构建后代码出错了，通过映射可以追踪源代码错误）
    
        [inline-|hidden-|eval-][nosources-][cheap-[module-]]source-map
    
        source-map：外部
          错误代码准确信息 和 源代码的错误位置
        inline-source-map：内联
          只生成一个内联source-map
          错误代码准确信息 和 源代码的错误位置
        hidden-source-map：外部
          错误代码错误原因，但是没有错误位置
          不能追踪源代码错误，只能提示到构建后代码的错误位置
        eval-source-map：内联
          每一个文件都生成对应的source-map，都在eval
          错误代码准确信息 和 源代码的错误位置
        nosources-source-map：外部
          错误代码准确信息, 但是没有任何源代码信息
        cheap-source-map：外部
          错误代码准确信息 和 源代码的错误位置 
          只能精确的行
        cheap-module-source-map：外部
          错误代码准确信息 和 源代码的错误位置 
          module会将loader的source map加入
    
        内联 和 外部的区别：1. 外部生成了文件，内联没有 2. 内联构建速度更快
    
        开发环境：速度快，调试更友好
          速度快(eval>inline>cheap>...)
            eval-cheap-souce-map
            eval-source-map
          调试更友好  
            souce-map
            cheap-module-souce-map
            cheap-souce-map
    
          --> eval-source-map  / eval-cheap-module-souce-map
    
        生产环境：源代码要不要隐藏? 调试要不要更友好
          内联会让代码体积变大，所以在生产环境不用内联
          nosources-source-map 全部隐藏
          hidden-source-map 只隐藏源代码，会提示构建后代码错误信息
    
          --> source-map / cheap-module-souce-map
    */
    ```

### 生产环境性能优化

#### 优化打包构建速度

- **oneOf**：从`module: {rules:[{oneOf: []}]}`，前面的配置：CSS 和预处理器，html 和 js，图片等静态资源文件配置，都可以放置 oneOf 下，达到不会反复被编译，提升生产环境构建速度

- **babel 缓存**：js 代码兼容化编译(如 ES6 转 ES5)缓存：`cacheDirectory: true`

- **多进程打包**：多进程打包，依赖库：`thread-loader`

  - 安装：`npm i thread-loader -D`

  - 给`babel-loader`插件使用

    - 开启多进程打包。
    - 进程启动大概为 600ms，进程通信也有开销（请勿滥用）。
    - 只有工作消耗时间比较长，才需要多进程打包

  - ```js
    const { resolve } = require("path");
    const MiniCssExtractPlugin = require("mini-css-extract-plugin");
    const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
    const HtmlWebpackPlugin = require("html-webpack-plugin");
    const WorkboxWebpackPlugin = require("workbox-webpack-plugin");
  
    /*
      PWA: 渐进式网络开发应用程序(离线可访问)
        workbox --> workbox-webpack-plugin
    */
  
    // 定义nodejs环境变量：决定使用browserslist的哪个环境
    process.env.NODE_ENV = "production";
  
    // 复用loader
    const commonCssLoader = [
    	MiniCssExtractPlugin.loader,
    	"css-loader",
    	{
    		// 还需要在package.json中定义browserslist
    		loader: "postcss-loader",
    		options: {
    			ident: "postcss",
    			plugins: () => [require("postcss-preset-env")()],
    		},
    	},
    ];
  
    module.exports = {
    	entry: "./src/js/index.js",
    	output: {
    		filename: "js/built.[contenthash:10].js",
    		path: resolve(__dirname, "build"),
    	},
    	module: {
    		rules: [
    			{
    				// 在package.json中eslintConfig --> airbnb
    				test: /\.js$/,
    				exclude: /node_modules/,
    				// 优先执行
    				enforce: "pre",
    				loader: "eslint-loader",
    				options: {
    					fix: true,
    				},
    			},
    			{
    				// 以下loader只会匹配一个
    				// 注意：不能有两个配置处理同一种类型文件
    				oneOf: [
    					{
    						test: /\.css$/,
    						use: [...commonCssLoader],
    					},
    					{
    						test: /\.less$/,
    						use: [...commonCssLoader, "less-loader"],
    					},
    					/*
                正常来讲，一个文件只能被一个loader处理。
                当一个文件要被多个loader处理，那么一定要指定loader执行的先后顺序：
                  先执行eslint 在执行babel
              */
    					{
    						test: /\.js$/,
    						exclude: /node_modules/,
    						use: [
    							/* 
                    开启多进程打包。 
                    进程启动大概为600ms，进程通信也有开销（请勿滥用）。
                    只有工作消耗时间比较长，才需要多进程打包
                  */
    							// 'thread-loader', // 直接写便是默认配置
    							// 自定义配置
    							{
    								loader: "thread-loader",
    								options: {
    									workers: 2, // 进程2个
    								},
    							},
    							{
    								loader: "babel-loader",
    								options: {
    									presets: [
    										[
    											"@babel/preset-env",
    											{
    												useBuiltIns: "usage",
    												corejs: { version: 3 },
    												targets: {
    													chrome: "60",
    													firefox: "50",
    												},
    											},
    										],
    									],
    									// 开启babel缓存
    									// 第二次构建时，会读取之前的缓存
    									cacheDirectory: true,
    								},
    							},
    						],
    					},
    					{
    						test: /\.(jpg|png|gif)/,
    						loader: "url-loader",
    						options: {
    							limit: 8 * 1024,
    							name: "[hash:10].[ext]",
    							outputPath: "imgs",
    							esModule: false,
    						},
    					},
    					{
    						test: /\.html$/,
    						loader: "html-loader",
    					},
    					{
    						exclude: /\.(js|css|less|html|jpg|png|gif)/,
    						loader: "file-loader",
    						options: {
    							outputPath: "media",
    						},
    					},
    				],
    			},
    		],
    	},
    	plugins: [
    		new MiniCssExtractPlugin({
    			filename: "css/built.[contenthash:10].css",
    		}),
    		new OptimizeCssAssetsWebpackPlugin(),
    		new HtmlWebpackPlugin({
    			template: "./src/index.html",
    			minify: {
    				collapseWhitespace: true,
    				removeComments: true,
    			},
    		}),
    		new WorkboxWebpackPlugin.GenerateSW({
    			/*
            1. 帮助serviceworker快速启动
            2. 删除旧的 serviceworker
    
            生成一个 serviceworker 配置文件~
          */
    			clientsClaim: true,
    			skipWaiting: true,
    		}),
    	],
    	mode: "production",
    	devtool: "source-map",
    };
    ```

- **externals**：忽略文件，不会被编译打包进构建好的代码

  - ```js
    const { resolve } = require("path");
    const HtmlWebpackPlugin = require("html-webpack-plugin");
  
    module.exports = {
    	entry: "./src/js/index.js",
    	output: {
    		filename: "js/built.js",
    		path: resolve(__dirname, "build"),
    	},
    	plugins: [
    		new HtmlWebpackPlugin({
    			template: "./src/index.html",
    		}),
    	],
    	mode: "production",
    	externals: {
    		// 忽略库名:'npm包名'
    		// 拒绝jQuery被打包进来
    		jquery: "jQuery",
    	},
    };
    ```

- **dll**：动态链接库，将不同的库打包成不同的 chunk

  - webpack.dll.js

  - ```js
    /*
      使用dll技术，对某些库（第三方库：jquery、react、vue...）进行单独打包
        当你运行 webpack 时，默认查找 webpack.config.js 配置文件
        需求：需要运行 webpack.dll.js 文件
          --> webpack --config webpack.dll.js
    */
    
    const { resolve } = require("path");
    const webpack = require("webpack");
    
    module.exports = {
    	entry: {
    		// 最终打包生成的[name] --> jquery
    		// ['jquery'] --> 要打包的库是jquery
    		jquery: ["jquery"],
    	},
    	output: {
    		filename: "[name].js",
    		path: resolve(__dirname, "dll"),
    		library: "[name]_[hash]", // 打包的库里面向外暴露出去的内容叫什么名字
    	},
    	plugins: [
    		// 打包生成一个 manifest.json --> 提供和jquery映射
    		new webpack.DllPlugin({
    			name: "[name]_[hash]", // 映射库的暴露的内容名称
    			path: resolve(__dirname, "dll/manifest.json"), // 输出文件路径
    		}),
    	],
    	mode: "production",
    };
    ```

  - webpack.config.js

  - ```js
    const { resolve } = require('path');
    const HtmlWebpackPlugin = require('html-webpack-plugin');
    const webpack = require('webpack');
    const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');
    
    module.exports = {
      entry: './src/index.js',
      output: {
        filename: 'built.js',
        path: resolve(__dirname, 'build')
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: './src/index.html'
        }),
        // 告诉webpack哪些库不参与打包，同时使用时的名称也得变~
        new webpack.DllReferencePlugin({
          manifest: resolve(__dirname, 'dll/manifest.json'); // 打包输出
        }),
        // 将某个文件打包输出去，并在html中自动引入该资源
        new AddAssetHtmlWebpackPlugin({
          filepath: resolve(__dirname, 'dll/jquery.js'); // 打包输出
        })
      ],
      mode: 'production'
    };
    ```

#### 优化代码运行的性能

- **缓存(hash-chunkhash-contenthash)**：

- **tree shaking**：去除无用(只写了，未引用)代码，不用其他配置，但有前提

  - **使用前提**：
    - 1.必须使用 ES6 模块化
    - 2.开启 production 环境
  - package.json 中的 sideEffects 属性：默认是 false，`"sideEffects": false`，
    - 所有代码都没有副作用（都可以进行 tree shaking），问题：可能会把 css / @babel/polyfill （副作用）文件干掉
  - 需要在 package.json 中把 sideEffects 配置： `"sideEffects": ["*.css", "*.less"]`
  - 之后这些文件就不会进行 tree shaking

- **code split**：代码分割

  - 第一种做法：多入口和单入口方式拆分文件，和输出的文件名

    - ```js
      const { resolve } = require("path");
      const HtmlWebpackPlugin = require("html-webpack-plugin");
  
      module.exports = {
      	// 单入口
      	// entry: './src/js/index.js',
      	entry: {
      		// 多入口：有一个入口，最终输出就有一个bundle
      		index: "./src/js/index.js",
      		test: "./src/js/test.js",
      	},
      	output: {
      		// [name]：取文件名
      		filename: "js/[name].[contenthash:10].js",
      		path: resolve(__dirname, "build"),
      	},
      	plugins: [
      		new HtmlWebpackPlugin({
      			template: "./src/index.html",
      			minify: {
      				collapseWhitespace: true,
      				removeComments: true,
      			},
      		}),
      	],
      	mode: "production",
      };
      ```

  - 第二种做法：optimization.splitChunks 配置：将 node_modules 中代码单独打包一个 chunk 最终输出

    - ```js
      const { resolve } = require("path");
      const HtmlWebpackPlugin = require("html-webpack-plugin");
  
      module.exports = {
      	// 单入口
      	// entry: './src/js/index.js',
      	entry: {
      		index: "./src/js/index.js",
      		test: "./src/js/test.js",
      	},
      	output: {
      		// [name]：取文件名
      		filename: "js/[name].[contenthash:10].js",
      		path: resolve(__dirname, "build"),
      	},
      	plugins: [
      		new HtmlWebpackPlugin({
      			template: "./src/index.html",
      			minify: {
      				collapseWhitespace: true,
      				removeComments: true,
      			},
      		}),
      	],
      	/*
          1. 设置单入口，可以将node_modules中代码单独打包一个chunk最终输出
          2. 设置多入口，自动分析多入口chunk中，有没有公共的文件。如果有会打包成单独一个chunk
        */
      	optimization: {
      		splitChunks: {
      			chunks: "all",
      		},
      	},
      	mode: "production",
      };
      ```

  - 第三种做法：通过 js 代码，让某个文件被单独打包成一个 chunk

    - ```js
      /*
        通过js代码，让某个文件被单独打包成一个chunk
        import动态导入语法：能将某个文件单独打包
      */
      import(/* webpackChunkName: 'test' */'./test')
        .then(({ mul, count }) => {
          // 文件加载成功~
          // eslint-disable-next-line
          console.log(mul(2, 5));
        })
        .catch(() => {
          // eslint-disable-next-line
          console.log('文件加载失败~');
        });
    
      // eslint-disable-next-line
      console.log(sum(1, 2, 3, 4));rue
            }
          })
        ],
        /*
          1. 设置单入口，可以将node_modules中代码单独打包一个chunk最终输出
        */
        optimization: {
          splitChunks: {
            chunks: 'all'
          }
        },
        mode: 'production'
      };
      ```

    - webpack.config.js 是单入口设置

    - ```js
      const { resolve } = require("path");
      const HtmlWebpackPlugin = require("html-webpack-plugin");
    
      module.exports = {
      	// 单入口
      	entry: "./src/js/index.js",
      	output: {
      		// [name]：取文件名
      		filename: "js/[name].[contenthash:10].js",
      		path: resolve(__dirname, "build"),
      	},
      	plugins: [
      		new HtmlWebpackPlugin({
      			template: "./src/index.html",
      			minify: {
      				collapseWhitespace: true,
      				removeComments: true,
      			},
      		}),
      	],
      	/*
          1. 可以将node_modules中代码单独打包一个chunk最终输出
          2. 自动分析多入口chunk中，有没有公共的文件。如果有会打包成单独一个chunk
        */
      	optimization: {
      		splitChunks: {
      			chunks: "all",
      		},
      	},
      	mode: "production",
      };
      ```

- **懒加载/预加载**：js 代码实现懒加载/预加载

  - ```js
    // 点击按钮后再懒加载/预加载
    document.getElementById("btn").onclick = function () {
    	// 懒加载~：当文件需要使用时才加载~
    	// 预加载 webpackPrefetch：会在使用之前，提前加载js文件
    	// 正常加载可以认为是并行加载（同一时间加载多个文件）
    	// 预加载 webpackPrefetch：等其他资源加载完毕，浏览器空闲了，再偷偷加载资源
    	import(
    		/* webpackChunkName: 'test', webpackPrefetch: true */ "./test"
    	).then(({ mul }) => {
    		console.log(mul(4, 5));
    	});
    };
    ```

- **PWA**：渐进式网络开发应用程序(网页离线可访问)，性能也更好（淘宝的网页也使用这个技术）

  - webpack 的 PWA 插件 workbox-webpack-plugin

  - ```js
    const { resolve } = require("path");
    const MiniCssExtractPlugin = require("mini-css-extract-plugin");
    const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
    const HtmlWebpackPlugin = require("html-webpack-plugin");
    const WorkboxWebpackPlugin = require("workbox-webpack-plugin");
    
    /*
      PWA: 渐进式网络开发应用程序(离线可访问)
        workbox --> workbox-webpack-plugin
    */
    
    // 定义nodejs环境变量：决定使用browserslist的哪个环境
    process.env.NODE_ENV = "production";
    
    // 复用loader
    const commonCssLoader = [
    	MiniCssExtractPlugin.loader,
    	"css-loader",
    	{
    		// 还需要在package.json中定义browserslist
    		loader: "postcss-loader",
    		options: {
    			ident: "postcss",
    			plugins: () => [require("postcss-preset-env")()],
    		},
    	},
    ];
    
    module.exports = {
    	entry: "./src/js/index.js",
    	output: {
    		filename: "js/built.[contenthash:10].js",
    		path: resolve(__dirname, "build"),
    	},
    	module: {
    		rules: [
    			{
    				// 在package.json中eslintConfig --> airbnb
    				test: /\.js$/,
    				exclude: /node_modules/,
    				// 优先执行
    				enforce: "pre",
    				loader: "eslint-loader",
    				options: {
    					fix: true,
    				},
    			},
    			{
    				// 以下loader只会匹配一个
    				// 注意：不能有两个配置处理同一种类型文件
    				oneOf: [
    					{
    						test: /\.css$/,
    						use: [...commonCssLoader],
    					},
    					{
    						test: /\.less$/,
    						use: [...commonCssLoader, "less-loader"],
    					},
    					/*
                正常来讲，一个文件只能被一个loader处理。
                当一个文件要被多个loader处理，那么一定要指定loader执行的先后顺序：
                  先执行eslint 在执行babel
              */
    					{
    						test: /\.js$/,
    						exclude: /node_modules/,
    						loader: "babel-loader",
    						options: {
    							presets: [
    								[
    									"@babel/preset-env",
    									{
    										useBuiltIns: "usage",
    										corejs: { version: 3 },
    										targets: {
    											chrome: "60",
    											firefox: "50",
    										},
    									},
    								],
    							],
    							// 开启babel缓存
    							// 第二次构建时，会读取之前的缓存
    							cacheDirectory: true,
    						},
    					},
    					{
    						test: /\.(jpg|png|gif)/,
    						loader: "url-loader",
    						options: {
    							limit: 8 * 1024,
    							name: "[hash:10].[ext]",
    							outputPath: "imgs",
    							esModule: false,
    						},
    					},
    					{
    						test: /\.html$/,
    						loader: "html-loader",
    					},
    					{
    						exclude: /\.(js|css|less|html|jpg|png|gif)/,
    						loader: "file-loader",
    						options: {
    							outputPath: "media",
    						},
    					},
    				],
    			},
    		],
    	},
    	plugins: [
    		new MiniCssExtractPlugin({
    			filename: "css/built.[contenthash:10].css",
    		}),
    		new OptimizeCssAssetsWebpackPlugin(),
    		new HtmlWebpackPlugin({
    			template: "./src/index.html",
    			minify: {
    				collapseWhitespace: true,
    				removeComments: true,
    			},
    		}),
    		// PWA配置
    		new WorkboxWebpackPlugin.GenerateSW({
    			/*
            1. 帮助serviceworker快速启动
            2. 删除旧的 serviceworker
    
            生成一个 serviceworker 配置文件~
          */
    			clientsClaim: true,
    			skipWaiting: true,
    		}),
    	],
    	mode: "production",
    	devtool: "source-map",
    };
    ```

  - 在 index.js 入口文件中配置

    - 1.eslint 不认识 window、navigator 全局变量
    - 2.sw 代码必须运行在服务器上

  - ```js
    /*
      1. eslint不认识 window、navigator全局变量
        解决：需要修改package.json中 eslintConfig 配置
          "env": {
            "browser": true // 支持浏览器端全局变量
          }
       2. sw代码必须运行在服务器上
          --> nodejs
          -->
            npm i serve -g
            serve -s build 启动服务器，将build目录下所有资源作为静态资源暴露出去
    */
    // 注册serviceWorker
    // 处理兼容性问题
    if ("serviceWorker" in navigator) {
    	window.addEventListener("load", () => {
    		navigator.serviceWorker
    			.register("/service-worker.js")
    			.then(() => {
    				console.log("sw注册成功了~");
    			})
    			.catch(() => {
    				console.log("sw注册失败了~");
    			});
    	});
    }
    ```

## Webpack5

此版本重点关注以下内容:

- 通过持久缓存提高构建性能.
- 使用更好的算法和默认值来改善长期缓存.
- 通过更好的树摇和代码生成来改善捆绑包大小.
- 清除处于怪异状态的内部结构，同时在 v4 中实现功能而不引入任何重大更改.
- 通过引入重大更改来为将来的功能做准备，以使我们能够尽可能长时间地使用 v5.

### 自动删除 Node.js Polyfills

早期，webpack 的目标是允许在浏览器中运行大多数 node.js 模块，但是模块格局发生了变化，许多模块用途现在主要是为前端目的而编写的。webpack <= 4 附带了许多 node.js 核心模块的 polyfill，一旦模块使用任何核心模块（即 crypto 模块），这些模块就会自动应用。

尽管这使使用为 node.js 编写的模块变得容易，但它会将这些巨大的 polyfill 添加到包中。在许多情况下，这些 polyfill 是不必要的。

webpack 5 会自动停止填充这些核心模块，并专注于与前端兼容的模块。

迁移：

- 尽可能尝试使用与前端兼容的模块。
- 可以为 node.js 核心模块手动添加一个 polyfill。错误消息将提示如何实现该目标。

### Chunk 和模块 ID

添加了用于长期缓存的新算法。在生产模式下默认情况下启用这些功能。

`chunkIds: "deterministic", moduleIds: "deterministic"`

### Chunk ID

你可以不用使用 `import(/* webpackChunkName: "name" */ "module")` 在开发环境来为 chunk 命名，生产环境还是有必要的

webpack 内部有 chunk 命名规则，不再是以 id(0, 1, 2)命名了

### Tree Shaking

1. webpack 现在能够处理对嵌套模块的 tree shaking

```js
// inner.js
export const a = 1;
export const b = 2;

// module.js
import * as inner from "./inner";
export { inner };

// user.js
import * as module from "./module";
console.log(module.inner.a);
```

在生产环境中, inner 模块暴露的 `b` 会被删除

2. webpack 现在能够多个模块之前的关系

```js
import { something } from "./something";

function usingSomething() {
	return something;
}

export function test() {
	return usingSomething();
}
```

当设置了`"sideEffects": false`时，一旦发现`test`方法没有使用，不但删除`test`，还会删除`"./something"`

3. webpack 现在能处理对 Commonjs 的 tree shaking

### Output

webpack 4 默认只能输出 ES5 代码

webpack 5 开始新增一个属性 output.ecmaVersion, 可以生成 ES5 和 ES6 / ES2015 代码.

如：`output.ecmaVersion: 2015`

### SplitChunk

```js
// webpack4
minSize: 30000;
```

```js
// webpack5
minSize: {
  javascript: 30000,
  style: 50000,
}
```

### Caching

```js
// 配置缓存
cache: {
  // 磁盘存储
  type: "filesystem",
  buildDependencies: {
    // 当配置修改时，缓存失效
    config: [__filename]
  }
}
```

缓存将存储到 `node_modules/.cache/webpack`

### 监视输出文件

之前 webpack 总是在第一次构建时输出全部文件，但是监视重新构建时会只更新修改的文件。

此次更新在第一次构建时会找到输出文件看是否有变化，从而决定要不要输出全部文件。

### 默认值

- `entry: "./src/index.js`
- `output.path: path.resolve(__dirname, "dist")`
- `output.filename: "[name].js"`

### 更多内容

https://github.com/webpack/changelog-v5
