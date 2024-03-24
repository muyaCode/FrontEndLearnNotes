# JavaScript 模块化发展历程

MDN 模块化文档：[JavaScript 模块 - JavaScript | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Modules)

## IIFE 伪模块化标准

- Immediaitely Invoked Function Expression
- 自执行函数`(function () {}}()`

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<meta http-equiv="X-UA-Compatible" content="ie=edge" />
		<title>Document</title>
	</head>
	<body>
		<h1>IIFE 模块化标准</h1>

		<!--
    IIFE
      + 所有的内容放在一个自执行函数里面
      + 但是外界不能使用
      + 我可以把我向外暴露的内容直接暴露出来

    解决问题:
      1. 依赖不清
        + 直接在自执行函数的参数位置, 能看到依赖了哪些模块
      2. 变量全局污染
        + 你后面的代码该用什么变量用什么

    问题:
      1. 文件顺序不能动
      2. 只能知道我依赖的几个模块, 但是模块在哪一个文件中不好说
  -->

		<script src="./a.js"></script>
		<script src="./b.js"></script>
		<script src="./c.js"></script>
	</body>
</html>
```

a.js

```js
// 我作为一个独立模块形式出现
(function () {
	// 所有的内容都在 私有作用域
	var num = 100;
	var flag = true;

	function af1() {
		console.log("a.js 里面的 af1");
	}

	function af2() {
		console.log("a.js 里面的 af2");
	}

	// 把我想向外暴露的内容暴露出去
	// 以一个对象的形式挂载在 window 上
	window.modA = {
		af1: af1,
		af2: af2,
	};
})();
```

b.js

```js
// 我作为一个独立模块形式出现
(function (modA) {
	// 所有的内容都在 私有作用域
	var num = 200;
	var flag = false;

	function bf1() {
		console.log("b.js 里面的 bf1");
	}

	function bf2() {
		console.log("b.js 里面的 bf2");
	}

	window.modB = {
		bf1,
	};
})(modA);
```

c.js

```js
// 我还是做整合的模块
(function (modA, modB) {
	modA.af1();
})(modA, modB);
```

## CommonJs 模块化标准

- 2009 年，nodejs 出现了
- 使用 JS 去做服务端语言
- 伴生的是 commonJs 模块化标准
- 缺点: 只能在后端 JS 里面用

```html

```

## AMD 模块化标准(requirejs 标准) - Async Module Definition

- 官网：[RequireJS](https://requirejs.org/)
- 说明：[amdjs-api/AMD.md at master · amdjs/amdjs-api (github.com)](https://github.com/amdjs/amdjs-api/blob/master/AMD.md)
- 2011 年由社区发起的
- 因为非官方，没有关键字，大家书写了一套叫做 require.js 的第三方文件来实现标准化规范
- 把每一个 JS 独立出来
  - 使用了导入导出的语法来实现模块化
  - 在 jS 文件里面引入另一个 S 文件
- 定义模块
  - 调用 define 的方法
  - 1.独立模块定义：a.js
    - 每一个模块文件开始执行 define()
    - 不依赖其他文件，就是一个单纯的模块
    - 向外暴露的内容，直接 return 出去就好了
  - 2.依赖其他模块的模块：b.js
    - 也是一个模块文件，但是依赖其他模块的内容
    - 使用 define() 定义
    - 语法: `define([ 依赖文件1, 依赖文件2, ... ], function (模块A, 模块B, ...) {})`
  - 3.导入其他模块：c.js
    - 一个模块整合文件
    - 直接使用 a.js 文件里面的方法
    - 使用这个方法 require()
    - 语法: `require([ 依赖文件1, 依赖文件2, ... ], function (模块1, 模块2) {})`

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<meta http-equiv="X-UA-Compatible" content="ie=edge" />
		<title>Document</title>
		<script src="../modules/require.js"></script>
	</head>
	<body>
		<h1>AMD 模块化标准 - 依赖前置</h1>
		<h2>页面必须引入一个叫做 require.js 的文件</h2>
		<p>在官网下载：https://requirejs.org/docs/download.html</p>

		<!--
    页面只需要引入最后的整合文件就可以了

    解决问题:
      1. 依赖很清晰
        + 因为只有一个文件, 那么所有的东西都在一个文件里面出现
      2. 变量全局污染
        + 没有全局污染, 都在私有作用域

    问题:
      1. 依赖前置
        + 不管多少行以后使用的东西, 都会在打开页面的时候就加再进来
        + 缺点: 首屏加载时间长
        + 优点: 后期操作流畅
  -->

		<script src="./c.js"></script>
	</body>
</html>
```

a.js

```js
define(function () {
	// 我是 modA 模块
	var num = 100;
	var flag = true;

	// 我自己文件里面的代码执行
	console.log("a.js 里面的代码执行");

	for (var i = 0; i < 10000; i++) {
		console.log(1);
	}

	// 定义一些方法
	function af1() {
		console.log("a.js 里面的 af1");
	}

	function af2() {
		console.log("a.js 里面的 af2");
	}

	// 向外暴露的内容
	return {
		af1,
		af2,
	};
});
```

b.js

```js
// 我是一个模块 B, 我需要依赖一些 a.js 文件里面的内容
define(["./a.js"], function (modA) {
	console.group("b.js 文件里面的打印");
	console.log("我依赖了 a.js 文件里面的内容", modA);
	console.groupEnd();

	return {
		bf1() {
			console.log("我是 b.js 文件里面的 bf1 方法");
		},
	};
});
```

c.js

```js
require(["./b.js", "./a.js"], function (modB, modA) {
	// modA 就是 a.js 文件后面的 return

	console.group("c.js 文件里面的打印");
	console.log("我依赖的 modA 模块", modA);
	modA.af1();
	modA.af2();
	console.log("我依赖的 modB 模块", modB);
	console.groupEnd();
});
```

## CMD \- Common Module Defineion - 通用模块定义

文章：[seajs (xuanfengge.com)](https://www.xuanfengge.com/tag/seajs)

官网：[SeaJS - A Module Loader for the Web (zhangxinxu.com)](https://www.zhangxinxu.com/sp/seajs/)

GitHub：[seajs/seajs: A Module Loader for the Web (github.com)](https://github.com/seajs/seajs)

npm：[seajs - npm (npmjs.com)](https://www.npmjs.com/package/seajs)

- 2011 左右, 社区里面出现的一个标准

- 淘宝 "玉伯", 开发一了个 CMD 的模块化标准

- 依赖于一个叫做 sea.js 的文件来实现的模块化标准

- 使用: 文件需要引入一个 sea.js 的文件

  - 1.独立模块定义：a.js

    - define(function (require, exports, module) { })
    - require() 用来导入其他文件的
    - module.exports 是为了本文件导出内容的
    - exports 是 module.exports 的别名
    - var exports = module.exports

  - 2.依赖其他模块的模块：b.js

    - 你需要依赖其他文件模块

    - 在 define( function (require, exports, module) {

      ​ 在你需要的位置使用 require() 方法来导入

      ​ var modA = require('地址')

  - 3.资源整合：c.js

    - 使用 seajs.use()
    - 语法: seajs.use(['你要依赖的模块'], function (模块 A) {})

  ```html
  <!DOCTYPE html>
  <html lang="en">
  	<head>
  		<meta charset="UTF-8" />
  		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
  		<meta http-equiv="X-UA-Compatible" content="ie=edge" />
  		<title>Document</title>
  		<script src="../modules/sea.js"></script>
  	</head>
  	<body>
  		<h1>CMD 模块化标准 - 即时依赖</h1>
  		<h2>需要在页面引入一个叫做 sea.js 的文件</h2>

  		<!--
      CMD
  
  
      解决问题
        1. 依赖前置
          + 按需加载, 在你需要的时候, 在加载
          + 也留下了依赖前置的 接口
  
      问题:
        1. 即时依赖
          + 首屏加载快
          + 操作不够流畅
    -->
  		<script src="./c.js"></script>
  	</body>
  </html>
  ```

  a.js

  ```js
  define(function (require, exports, module) {
  	// 我是一个 modA 独立模块
  	var num = 100;
  	var flag = true;

  	// 我是 a 文件里面的代码
  	console.log("我是 a.js 文件里面的打印");

  	for (var i = 0; i < 10000; i++) {
  		console.log(1);
  	}

  	function af1() {
  		console.log("a.js 里面的 af1 方法");
  	}
  	function af2() {
  		console.log("a.js 里面的 af2 方法");
  	}

  	// 向外暴露一些内容
  	module.exports = {
  		af1,
  		af2,
  	};
  });
  ```

  b.js

  ```js
  define(function (require, exports, module) {
  	// 我是 b.js 文件
  	console.group("b.js 文件里面的打印");
  	console.log("我是自己的内容");
  	var modA = require("./a.js");
  	console.log("我依赖的 modA 文件, ", modA);
  	console.groupEnd();
  });
  ```

  c.js

  ```js
  seajs.use(["./b.js"], function (modB) {
  	console.group("我是 c.js 文件里面的打印");
  	console.log("我前置依赖了 modB", modB);
  	console.groupEnd();
  });
  ```

## ES6 Module

- 2015 年发布, ES6 语法里面自带了一个模块化标准
- 但各大浏览器厂商并不买账
- 2016 年开始，Vue 出现了，人家出现了一个脚手架(开发的大框架直接给你搭建好) => 搭建这个架子的时候, 内置了 ES6 模块化标准
- 2018 年，各大浏览器厂商开始原生支持 ES6 模块化标准
- 2018 年中，Chrome 率先原生支持 ES6 模块化
- 语法: 变成了 JS 的语法，和关键字，不需要任何第三方文件的引入
- 特点: 页面必须在服务器上打开
  - => live server 插件
  - => 如果你想使用模块化语法，script 标签要加一个属性 type="module"
- 使用：
  - 1.每一个文件都可以作为独立模块, 页都可以作为整合文件
  - 2.导出语法
    - 2-1. export default 导出的内容
    - 2-2. export var num = 200
  - 3.导入语法
    - 3-1. 接收 export default 导出
      - import 变量 from '哪一个 JS 文件'
    - 3-2. 接收 export 导出的恩日哦那个
      - import { 接收变量 } from '哪一个 JS 文件'
- 2020 年
  - => ES2020 发布新的标准
  - => 多了一个 按需加载的模块化
  - => 语法：import(你要加载的文件).then(function (res) {})

index.html

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<meta http-equiv="X-UA-Compatible" content="ie=edge" />
		<title>Document</title>
	</head>
	<body>
		<h1>ES6 模块化标准</h1>
		<h2>必须要在服务器上打开</h2>
		<h2>script 标签要有 type="module"</h2>

		<!--
    ES6 模块化标准

    解决问题
      1. 变成关键字, 不需要依赖第三方文件
      2. 每一个文件都可以变成模块文件, 也可以是整合文件

    问题:
      1. 浏览器支持不好
        + 必须要在服务器上打开
        + 一旦项目上线, 肯定是服务器打开
      2. 依赖前置
  -->

		<!-- <script src="./c.js" type="module"></script> -->
		<script src="./d.js" type="module"></script>
	</body>
</html>
```

a.js

```js
// 我是一个模块
// 因为这个文件并不会通过 script 标签引入 页面, 所以这些变量不再 window 上
var num = 100;
var flag = true;

function af1() {
	console.log("我是 a.js 里面的 af1 方法");
}
function af2() {
	console.log("我是 a.js 里面的 af2 方法");
}

console.log("a.js");

// 单独导出一个 af1 方法
// 一个文件只能由一个 export default
// export default af1

// 如果你要导出多个, 那么需要以对象或者数组的形式
export default {
	af1,
	af2,
};

export const n = num;
```

b.js

```js
// 我是一个 b.js 模块
import modA from "./a.js";

// 我这个模块向外导出了一个 num 变量值是 200
// export 可以写多个
export var num = 200;
export const str = "hello world";
export function bf1() {
	console.log("我是 b.js 文件里面的 bf1 函数");
}
```

c.js

```js
// 我是整合文件
// 我需要依赖 a.js 文件里面得内容

// modA 接受的是 a.js 文件里面 export default 后面的一整个内容
import modA from "./a.js";

// 我需要依赖 b.js 文件里面的方法
import { num, str } from "./b.js";

console.log("c.js 文件");
console.log(modA);

console.log(num);
console.log(str);
```

d.js

```js
// 我需要依赖 a.js 文件

console.log("d.js");
console.log("d.js");
console.log("d.js");
console.log("d.js");

// 需要的时候在去引入 a.js 文件
import("./a.js").then(function (res) {
	console.log(res);
});
```

---

最新的 [Webpack](https://webpack.github.io/) 和 [Babel](https://babeljs.io/)
