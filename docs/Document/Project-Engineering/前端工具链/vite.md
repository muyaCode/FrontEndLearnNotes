# vite

Vite2 文档：[开始 {#getting-started} | Vite 中文网 (vitejs.cn)](https://vitejs.cn/guide/)

Vite3 文档：[开始 | Vite 官方中文文档 (vitejs.cn)](https://vitejs.cn/vite3-cn/guide/)

**最新**

GitHub：[vitejs/vite: Next generation frontend tooling. It's fast! (github.com)](https://github.com/vitejs/vite)

中文官网：[Vite | 下一代的前端工具链 (vitejs.dev)](https://cn.vitejs.dev/)

英文官网：[Vite | Next Generation Frontend Tooling (vitejs.dev)](https://vitejs.dev/)

## 基于 Vite 的项目创建

文档：[开始 | Vite 官方中文文档 (vitejs.dev)](https://cn.vitejs.dev/guide/)

## 依赖构建

文档：[依赖预构建 | Vite 官方中文文档 (vitejs.dev)](https://cn.vitejs.dev/guide/dep-pre-bundling.html)

import 导入语法报错

```js
import { createApp } from "vue";
```

报错：`Uncaught TypeError: Failed to resolve module specifier "vue". Relative references must start with either "/", "./", or "../".`

需要把代码转化成浏览器能识别的代码，这就需要用到预构建配置：[依赖预构建 | Vite 官方中文文档 (vitejs.dev)](https://cn.vitejs.dev/guide/dep-pre-bundling.html)

"依赖预构建"过程的两个目的

- CommonJS 和 UMD 兼容性
  - `import { createApp } from 'vue';`
- 性能
  - `import { debounce } from 'lodash-es'`
  - lodash-es 是 [Lodash](https://lodash.com/) 库导出为 [ES](http://www.ecma-international.org/ecma-262/6.0/) 模块

## 模块热重载

HMR API 插件开发文档：[HMR API | Vite 官方中文文档 (vitejs.dev)](https://cn.vitejs.dev/guide/api-hmr.html)

HRM 更新处理文档：[插件 API - HRM 更新处理 | Vite 官方中文文档 (vitejs.dev)](https://cn.vitejs.dev/guide/api-plugin.html#vite-specific-hooks)

vite 只要使用了 plugins 插件，便内置了模块热重载

```js
export default defineConfig({
	plugins: [vue()],
});
```

热重载只在开发环境中使用，生产环境则不需要

为了使热重载代码在生产环境中被优化去掉，需要自定义`条件守卫`

[HMR API | 必需的条件守卫](https://cn.vitejs.dev/guide/api-hmr.html#required-conditional-guard)

```js
if (import.meta.hot) {
	// HMR 代码
}
```

### 定时器副作用清除和页面的条件刷新和不刷新判断

foo.js

```js
export const foo = () => {
	console.log("foo works!!!!!!!!");
};

let cache = {
	amount: 0,
};

if (import.meta.hot) {
	import.meta.hot.dispose(() => {
		if (timer) {
			clearInterval(timer);
		}
	});

	cache = import.meta.hot.data.cache = {
		amount: import.meta.hot.data.cache ? import.meta.hot.data.cache.amount : 0,
	};
}

let timer = setInterval(() => {
	cache.amount++;
	console.log(cache.amount);
}, 1000);

export { cache };
```

count.js

```js
export const count = 1;

if (import.meta.hot) {
	import.meta.hot.accept((newModule) => {
		console.log(newModule.count);
	});
}
```

main.js

```js
import "./count.js";

import { foo } from "./foo.js";

foo();

console.log("main module.");

if (import.meta.hot) {
	import.meta.hot.accept("./foo", (newFoo) => {
		if (newFoo.cache.amount > 5) {
			import.meta.hot.invalidate();
		} else {
			newFoo.foo();
		}
	});
	// import.meta.hot.accept()
	import.meta.hot.decline();
}
```

## Vite 中使用 TypeScript

Vite 天然支持引入 `.ts` 文件

vite 项目中编译命令

```bash
tsc --noEmit
```

vue 项目中

```bash
vue-tsc --noEmit
```

## Vite 支持 Vue3 使用 JSX

[插件 | Vite 官方中文文档 (vitejs.dev)](https://cn.vitejs.dev/plugins/#official-plugins)

vue3 单文件组件支持：`@vite/plugin-vue`

Vue2 支持：`underfin/vite-plugin-vue2`

Vue3 的 JSX 支持插件：`@vitejs/plugin-vue-jsx`

1.安装插件：`npm i @vitejs/plugin-vue-jsx`

npm：[@vitejs/plugin-vue-jsx - npm (npmjs.com)](https://www.npmjs.com/package/@vitejs/plugin-vue-jsx)

2.项目内使用参考文档

## 在 Vite 中使用 CSS

Vite2 文档：[功能 {#features} | Vite 中文网 (vitejs.cn)](https://vitejs.cn/guide/features.html#vue)

Vite3 文档：[开始 | Vite 官方中文文档 (vitejs.cn)](https://vitejs.cn/vite3-cn/guide/)

**1.Vite 原生支持 CSS**

模块导入方法支持

```js
import "./styles/index.css";
```

**2.原生的 CSS 变量支持**

[使用 CSS 自定义属性（变量） - CSS（层叠样式表） | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Using_CSS_custom_properties)

支持使用新的原生 CSS 变量特性

**3.postcss 集成**

[postcss/postcss: Transforming styles with JS plugins (github.com)](https://github.com/postcss/postcss)

直接安装 postcss 和它的插件，并配置好`postcss.config.js`便可以使用

**4.使用预处理器**

[功能 {#features} | Vite 中文网 (vitejs.cn)](https://vitejs.cn/guide/features.html#css-pre-processors)

## 静态资源引用

vite2 文档：[功能 {#features} | Vite 中文网 (vitejs.cn)](https://vitejs.cn/guide/features.html#static-assets)

vite4 文档：[静态资源处理 | Vite 官方中文文档 (vitejs.dev)](https://cn.vitejs.dev/guide/assets.html)

## 使用 WebWorker

文档：[功能 {#features} | Vite 中文网 (vitejs.cn)](https://vitejs.cn/guide/features.html#web-workers)

WebWorker 是多线程的 JavaScript 环境：以下两种方法都可以在 vite 项目中使用

### 纯 JS 下使用 Web Worker

```js
const worker = new Worker("./worker.js");
```

### Vite 中使用 Web Worker

```js
import MyWorker from "./worker?worker";
const worker = new MyWorker();
```

## 使用 WebAssembly

文档：[功能 {#features} | Vite 中文网 (vitejs.cn)](https://vitejs.cn/guide/features.html#webassembly)

WebAssembly 官网：[WebAssembly](https://webassembly.org/)

WebAssembly（简称 wasm）是一个虚拟指令集体系架构（virtual ISA），整体架构包括核心的 ISA 定义、[二进制编码](https://baike.baidu.com/item/二进制编码/1758517?fromModule=lemma_inlink)、程序语义的定义与执行，以及面向不同的嵌入环境（如 Web）的应用[编程接口](https://baike.baidu.com/item/编程接口/3339711?fromModule=lemma_inlink)（WebAssembly API）。其初始目标是为[C](https://baike.baidu.com/item/C/7252092?fromModule=lemma_inlink)/[C++](https://baike.baidu.com/item/C%2B%2B/99272?fromModule=lemma_inlink)等语言编写的程序经过编译，在确保安全和接近原生应用的运行速度更好地在[Web](https://baike.baidu.com/item/Web/150564?fromModule=lemma_inlink)平台上运行。 --- [WebAssembly\_百度百科 (baidu.com)](https://baike.baidu.com/item/WebAssembly/61812997?fr=aladdin)

### 使用 WebAssembly

1、安装 GIT

https://git-scm.com/ 下载安装

2、安装 CMake

```bash
brew install cmake
```

3、安装 GCC

OS X 上安装 Xcode。Windows 上安装 Visual Studio 2015 Community with Update 3 或 更新的版本

4、编译 Emscripten 程序

```bash
git clone https://github.com/juj/emsdk.git
cd emsdk
./emsdk install latest
./emsdk activate latest --permanent
source ./emsdk env.sh
```

5.创建 C 程序

```c
int add (int x, int y) {
    return x + y;
}
```

6、编译.wasm 文件

```bash
emcc src/math.c -Os -S WASM=1 -s SIDE_MODULE=1 -o ./dist/math.wasm
```

7、把编译好的.wasm 文件复制放项目中，在 Vite 调用 .wasm

```js
import init from "./math.wasm";
init().then((exports) => {
	console.log(exports.add(5, 6));
});
```

## 导入 JSON 及 Glob 导入

文档：[功能 {#features} | Vite 中文网 (vitejs.cn)](https://vitejs.cn/guide/features.html#json)

### JSON 可以被直接导入— 同样支持具名导入

```js
// 导入整个对象
import json from "./example.json";
// 对一个根字段使用具名导入 - 有效帮助 treeshaking!
import { field } from "./example.json";
```

### Vite 支持使用特殊的 `import.meta.glob` 函数从文件系统导入多个模块

语法参考：[mrmlnc/fast-glob: It's a very fast and efficient glob library for Node.js (github.com)](https://github.com/mrmlnc/fast-glob#pattern-syntax)

dir/m1.js

```js
export default "m1";
```

dir/m2.js

```js
export default "m2";
```

main.js

```js
const modules = import.meta.glob("./dir/*.js"); // 导入dir目录中的所有js
// const modules = import.meta.globEager('./dir/*[1].*')

// console.log(modules)
Object.entries(modules).forEach(([key, value]) => {
	console.log(key, value.default);

	// value().then(module => {
	//   console.log(key, module.default)
	// })
});
```

## 集成 ESLint 和 Prettier

### 集成 ESLint

1.VSCode 安装 ESLint 扩展

2.在项目中安装`ESLint`和相关插件

```bash
npm i eslint eslint-config-standard eslint-plugin-import eslint-plugin-promise eslint-plugin-node -D
```

3.项目根目录创建 eslint 配置文件：`.eslintrc.js`

写入配置参考：

- eslint 中文网：[ESLint - Pluggable JavaScript linter - ESLint 中文](http://eslint.cn/)
- eslint 官网：[Find and fix problems in your JavaScript code - ESLint - Pluggable JavaScript Linter](https://eslint.org/)

```js
module.exports = {
	extends: "standard",
	rules: {
		"space-before-function-paren": "off",
		"no-undef": "off",
		"comma-dangle": "off",
	},
};
```

### 集成 Prettier(代码格式化功能)

1.VSCode 安装 Prettier 扩展

2.在项目中安装`Prettier`和相关插件（这里不用）

```bash

```

3.项目根目录创建 prettierrc 配置文件：`.prettierrc`

写入配置参考：

- Prettier 中文网：[[Prettier 中文网 · Prettier 是一个“有态度”的代码格式化工具](https://www.prettier.cn/)](http://eslint.cn/)
- Prettier 官网：[Prettier · Opinionated Code Formatter](https://prettier.io/)

```json
{
	"semi": false,
	"singleQuote": true
}
```

### 集成 husky

GitHub：[typicode/husky: Git hooks made easy 🐶 woof! (github.com)](https://github.com/typicode/husky)

官网：[Husky - Git hooks (typicode.github.io)](https://typicode.github.io/husky/#/)

中文网：[Husky - husky 中文文档 - Breword 文档集合](https://www.breword.com/typicode-husky)

git 提交之前拦截的 git hook 钩子工具

---

1.安装

```bash
npm i husky
```

2.配置文件生成命令

```bash
npx husky install
```

执行完后提示：`husky - Git hooks installed`，并在根目录中生成`.husky`文件夹，至此`husky`安装完成

3.添加提交之前的钩子命令(提交前执行代码检查)："npm run lint"

```bash
npm husky add .husky/pre-commit "npm run lint"
```

4.git 提交代码，如果代码检查出错便不会提交成功

5.git 提交的消息提示：commit-msg

## 构建生产版本

[构建生产版本 | Vite 官方中文文档 (vitejs.dev)](https://cn.vitejs.dev/guide/build.html)

打包的配置 build

## 环境变量和模式

[环境变量和模式 | Vite 官方中文文档 (vitejs.dev)](https://cn.vitejs.dev/guide/env-and-mode.html)

1.**项目中定义环境变量配置文件**，vite 会自动读取添加的环境变量配置：`.env`

文档：[环境变量和模式 | Vite 官方中文文档 (vitejs.dev)](https://cn.vitejs.dev/guide/env-and-mode.html#env-files)

```bash
baseUrl = http://localhost:8080
```

2.**js 中输出定义的环境变量**

```js
console.log(import.meta.env);
```

3.**定义指定环境下的变量文件**：

- 开发环境变量文件：`.env.development`
- 生产环境变量文件：`.env.production`

```bash
baseUrl = http://localhost:8080
```

4.**创建指定 mode 的环境变量配置文件**，如：`.env.test`

文档：[环境变量和模式 | Vite 官方中文文档 (vitejs.dev)](https://cn.vitejs.dev/guide/env-and-mode.html#modes)

```bash
VITE_ENV = test
```

在 package.json 里的"script"配置命令

```json
"dev:test": "vite --mode test"
```

执行命令输出：test

```bash
npm run dev:test
```

5.**输入类型定义提示**：新定义的环境变量在代码输入中是没有提示的，需要配置 typescript 接口

**TypeScript 的智能提示**：[环境变量和模式 | Vite 官方中文文档 (vitejs.dev)](https://cn.vitejs.dev/guide/env-and-mode.html#env-files)

在 `src` 目录下创建一个 `env.d.ts` 以.d.ts 结尾的文件

```typescript
/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_ENV: string;
	// 更多环境变量...
}
```

## 服务器 Webify 项目部署

[部署静态站点 | Vite 官方中文文档 (vitejs.dev)](https://cn.vitejs.dev/guide/static-deploy.html)

以腾讯云服务器为例

- 第一步: 构建生产版本
  - `vite build`
- 第二步: 将项目发布到 github
  - 创建远端 github 仓库
  - 本地代码发布
- 第三步: 注册腾讯云账号
  - https://cloud.tencent.com
- 第四步: web 应用托管-部署项目（免费，但产生的流量收费）
  - https://webify.cloudbase.net/docs/quick-start
  - 1.新建应用：输入应用的信息
  - 2.点击部署应用
  - 3.后面应用便会自动部署，并会显示部署的进度
  - 4.发布成功后，在回到“概览”，等待 CDN 配置生效，才能到”应用列表“访问部署好的域名应用

## Vite 服务端渲染

[服务端渲染 | Vite 官方中文文档 (vitejs.dev)](https://cn.vitejs.dev/guide/ssr.html)

## Vite 与后端集成

[后端集成 | Vite 官方中文文档 (vitejs.dev)](https://cn.vitejs.dev/guide/backend-integration.html)

### 以 java 为例

把前端打包后的文件夹 dist，复制到 java 项目的`resources/static`目录中

在`resources/static/index.html` 中通过读取 `dist/manifest.json` 文件替换位置

```html

```

使用 java 代码写方法来替换静态资源文件位置
