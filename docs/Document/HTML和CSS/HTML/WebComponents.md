# WebComponents

文档：[Web Component|MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_components)

教程：[前端需要懂的知识- Web Components 的使用](https://www.nowcoder.com/discuss/514477909449498624)

[Web Components 基础入门-Web Components 概念详解（上）](https://juejin.cn/post/6969341653760868360)

[Web Components 基础入门-生命周期（中） - 掘金 (juejin.cn)](https://juejin.cn/post/6969342045135568903)

[Web Components 相关技术基础介绍 (下) - 掘金 (juejin.cn)](https://juejin.cn/post/6972472688254124062)

[69 行代码 实现一个 vue、react、san 超好用通用 table 组件 - 掘金 (juejin.cn)](https://juejin.cn/post/7299354483557072935)

[五分钟带你了解 Web Components](https://zhuanlan.zhihu.com/p/580540604)

[了解 Web Components](https://www.jianshu.com/p/091a8fa9fcc5)

[碎片化学习前端之 HTML（webComponent） - 深巷酒 - 博客园 (cnblogs.com)](https://www.cnblogs.com/huangminghua/p/17387582.html)

[Web 性能日历 » 使用 HTML Web 组件扩展响应式视频 (perfplanet.com)](https://calendar.perfplanet.com/2023/extending-responsive-video-with-html-web-components/)

## Web Components 简介

Web Components 是浏览器用来原生支持“组件化”的方法，它的核心技术组成为：

- **HTML templates**：HTML 模板
- **HTML Imports**：导入 HTML 模板
- **Shadow DOM**：影子 DOM
- **Custom Elements**：自定义元素

Web Components 就是提供浏览器底层的支持，不依赖各种框架的支持和 webpack 的编译，让我们也能使用组件。

Web Components 通过一种标准化的非侵入的方式封装一个组件，每个组件能组织好它自身的 HTML、CSS、JavaScript，并且不会干扰页面上的其他代码。

## 相比框架

2011 年提出 Web Components，为了解决代码复用问题，早于 React、Vue；

相对于 React、Vue 组件，Web Components 是原生组件，不限制接入方的技术，可以接入到 React、Vue 等技术框架中。

## 困境

- 兼容性不足，需要主流浏览器的支持，需要平缓的过渡
- 没有标准的数据绑定机制、在处理自定义元素内部数据、UI 更新、组件间参数传递时不够便捷和友好，目前来看大多还依赖于操控 dom 去实现 UI 更新

## HTML templates：HTML 模板

支持 template 标签和 slot 标签。slot 标签支持动态替换模板中的 HTML 内容，它用 name 属性来作为唯一表示。template 中的内容被插入到 DOM 之前，不会渲染，它可以放在 document 中的任何位置。

`<template>`：包含一个 html 片段，不会在 html 初始化时渲染。主要作用是：通过 JavaScript 获取该代码片段将其放入自定义标签内显示，主要作用于自定义标签

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Document</title>
	</head>
	<body>
		<template id="test_template">
			<div class="container">
				<span class="test_custom">自测自定义标签</span>
			</div>
		</template>
		<custom-button></custom-button>
		<script>
			class CustomButton extends HTMLElement {
				constructor() {
					super();
					const dom = document.querySelector("#test_template").content;
					this.append(dom);
				}
			}
			customElements.define("custom-button", CustomButton);
		</script>
	</body>
</html>
```

浏览器打开，然后调试，再元素(Elemenets)标签上看，自定义标签的字段

我们可以发现这种写法相对于前一种方式，更加`易读`以及`便捷`

`<slot>插槽`：给模板元素传值，增强模板元素的灵活性和通用性。 slot 在使用过程中具备以下特性

- 必须在影子 Dom 种使用，否则不具备插槽的效果
- 给 Slots 传值的元素必须是自定义元素的直接子元素，否则传值失效

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Document</title>
	</head>
	<body>
		<template id="test_template">
			<div class="container">
				<span class="test_custom">自测自定义标签</span>
				<slot name="userName" slot="userName"></slot>
			</div>
		</template>
		<custom-button>
			<div class="name_cls" slot="userName">张三</div>
		</custom-button>
		<script>
			class CustomButton extends HTMLElement {
				constructor() {
					super();
					const dom = document.querySelector("#test_template").content;
					this.append(dom);
				}
			}
			customElements.define("custom-button", CustomButton);
		</script>
	</body>
</html>
```

通过代码元素调试发现：我们插入的`<div class="name_cls">张三</div>`并没有插入到 container 节点内，主要是因为我们的 slot 没有用在影子 dom 种，所以浏览器将`<div class="name_cls">张三</div>`当成其正常的元素进行渲染了；

```html
<script>
	class CustomButton extends HTMLElement {
		constructor() {
			super();
			const shadow = this.attachShadow({ mode: "closed" });
			const dom = document.querySelector("#test_template").content;
			shadow.append(dom);
		}
	}
	customElements.define("custom-button", CustomButton);
</script>
```

当我们将 slot 插入在影子 dom，可以发现 slot 生效了；

另外需要注意的一个点，当使用 slot 的时候下边这个用法是错误的

## HTML Imports：导入 HTML 模板

改造一下上面的例子，将 template 的内容写到一个新的 main.html 文件中，然后通过 link 引入。

```html
<head>
	<link rel="import" href="./main.html" />
</head>
```

## Shadow DOM：影子 DOM

Shadow DOM 提供了一种健壮的封装方式来做到页面节点的隔离，避免全局样式冲突，这也是 Web Component 的核心优势。

浏览器提供了一种机制用于隔离一段代码和另一段代码，说到这里你肯定想到 iframe，但有时候 iframe 会显得非常的沉重以及隔离了太多，导致我们使用起来非常的麻烦； 我们可以利用 shadow root 将 CSS 和 HTML 绑定在一起封装成组件，并且其支持天然的样式隔离；

**`Element.attachShadow()`** 方法给指定的元素挂载一个 Shadow DOM，并且返回对 [ShadowRoot](https://developer.mozilla.org/zh-CN/docs/Web/API/ShadowRoot) 的引用。

```html
<script>
	class CustomButton extends HTMLElement {
		constructor() {
			super();
			const shadow = this.attachShadow({ mode: "closed" });
			const dom = document.querySelector("#test_template").content;
			shadow.append(dom);
		}
	}
	customElements.define("custom-button", CustomButton);
</script>
```

`this.attachShadow({ mode: "closed" })`的`closed`表示表示 `Shadow DOM` 是封闭的，不允许外部访问。如果`mode`的值是`open`，则表示内部的节点可以被外部访问；

**添加样式**

- 如果自定义元素需要样式，我们可以定义全局的样式，例如

```html
custom-button{ ... }
```

正常情况我们应该将样式和自定义标签封装在一起

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Document</title>
	</head>
	<body>
		<div>222</div>
		<template id="test_template">
			<div class="container">
				<span class="test_custom">自测自定义标签</span>
				<slot name="userName"></slot>
			</div>
			<style>
				:host {
					position: relative;
					top: 10px;
				}
				.test_custom {
					color: red;
				}
				div {
					border: 1px solid black;
				}
			</style>
		</template>
		<custom-button>
			<span slot="userName">张三</span>
		</custom-button>
		<script>
			class CustomButton extends HTMLElement {
				constructor() {
					super();
					const shadow = this.attachShadow({ mode: "closed" });
					const dom = document.querySelector("#test_template").content;
					shadow.append(dom);
				}
			}
			customElements.define("custom-button", CustomButton);
		</script>
	</body>
</html>
```

`:host`：表示当前的自定义元素节点;

另外可以发现我们定义的 div 样式只作用于了`影子dom`内部元素，对于外部的 div 没有任何影响，证明了影子 Dom 的样式`隔离特性`；

## Custom Elements：自定义元素

使用 `window.customElements.define` 自定义 html 标签元素，自定义元素需要我们用 JS 封装一个，我们在 html 内使用的自定义元素`custom-button`就是该类的实例；

自定义标签的生命周期 `constructor -> attributeChangedCallback -> connectedCallback`

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Document</title>
	</head>
	<body>
		<custom-button></custom-button>
		<script>
			class CustomButton extends HTMLElement {
				constructor() {
					super();
					console.log("this", this);
					const info = document.createElement("span");
					info.setAttribute("class", "test_custom");
					info.textContent = "自测自定义标签";
					var container = document.createElement("div");
					container.classList.add("container");
					this.append(info, container);
				}
			}
			customElements.define("custom-button", CustomButton);
		</script>
	</body>
</html>
```

浏览器打开，然后调试，再元素(Elemenets)标签上看，自定义标签的字段

我们可以看到`CustomButton`继承了`HTMLElement`，也就是继承了 HTML 元素的特性，最后我们执行了`this.append(DOM)`，也就是将元素内容添加到当前`自定义标签`内，`this`表示自定义元素实例

在 custom element 的构造函数中，可以指定多个不同的回调函数，它们将会在元素的不同生命时期被调用：

- `connectedCallback`：当 custom element 首次被插入文档 DOM 时，被调用。
- `disconnectedCallback`：当 custom element 从文档 DOM 中删除时，被调用。
- `adoptedCallback`：当 custom element 被移动到新的文档时，被调用。
- `attributeChangedCallback`: 当 custom element 增加、删除、修改自身属性时，被调用。

```html

```

## 在 vue react 中使用 Web Components 组件

1、web 组件部分代码([git 地址](https://github.com/ligaopeng123/Vue-WebComponents))

```js
(function () {
	// 配置模板
	const getEemplate = () => {
		// 创建模板
		const template = document.createElement("template"); // 给模板设置id 方便查找
		template.id = "userCardTemplate";
		template.innerHTML = `
    <style>
        :host {
                display: flex;
                align-items: center;
                width: 450px;
                height: 180px;
                background-color: #d4d4d4;
                border: 1px solid #d5d5d5;
                box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
                border-radius: 3px;
                overflow: hidden;
                padding: 10px;
                box-sizing: border-box;
                font-family: 'Poppins', sans-serif;
            }
        .image {
                flex: 0 0 auto;
                width: 160px;
                height: 160px;
                vertical-align: middle;
                border-radius: 5px;
            }
        .container {
                box-sizing: border-box;
                padding: 20px;
                height: 160px;
            }
        .container > .name {
                font-size: 20px;
                font-weight: 600;
                line-height: 1;
                margin: 0;
                margin-bottom: 5px;
            }
        .container > .email {
                font-size: 12px;
                opacity: 0.75;
                line-height: 1;
                margin: 0;
                margin-bottom: 15px;
            }
        .container > .button {
                padding: 10px 25px;
                font-size: 12px;
                border-radius: 5px;
                text-transform: uppercase;
            }
     </style>
    <img class="image">
    <div class="container">
        <p class="name"></p>
        <p class="email"></p>
        <button class="button">Follow John</button>
    </div>
    `;
		return template;
	}; // 讲模板放到dom结构中去
	const createEemplate = () => {
		document.body.appendChild(getEemplate());
	};
	createEemplate();
	class UserCard extends HTMLElement {
		constructor() {
			super();
			this.creatShadow(); // 此处防止vue等框架类型的组件使用时 生命周期导致的参数异常 因此延迟绑定参数
			setTimeout(() => {
				this.creatContent();
			});
		}
		/**
		 * 封闭内部dom
		 */
		creatShadow() {
			this.shadow = this.attachShadow({ mode: "closed" });
		}
		/**
		 * 创建内部显示内容
		 */
		creatContent() {
			var templateElem = document.getElementById("userCardTemplate");
			var content = templateElem.content.cloneNode(true);
			content
				.querySelector("img")
				.setAttribute("src", this.getAttribute("image"));
			content.querySelector(".container>.name").innerText =
				this.getAttribute("name");
			content.querySelector(".container>.email").innerText =
				this.getAttribute("email");
			this.shadow.appendChild(content);
		}
		/**
		 * 当自定义元素第一次被连接到文档DOM时被调用
		 * 相当于mounted
		 */
		connectedCallback() {
			console.log("connectedCallback");
		}
		/**
		 * 当自定义元素与文档DOM断开连接时被调用。
		 * 与beforeDestroy类似
		 */
		disconnectedCallback() {
			console.log("disconnectedCallback");
		}
		/**
		 * 当自定义元素被移动到新文档时被调用。
		 */
		adoptedCallback() {
			console.log("adoptedCallback");
		}
		/**
		 * 暴露哪些属性可以被监听
		 * @returns {string[]}
		 */
		static get observedAttributes() {
			return ["image", "name", "email"];
		}
		/**
		 * 当自定义元素的一个属性被增加、移除或更改时被调用。
		 */
		attributeChangedCallback() {
			console.log("attributeChangedCallback");
		}
	}
	window.customElements.define("user-card", UserCard);
})();
/**
 * 自定义事件
 */
this.dispatchEvent(
	new CustomEvent("submit", {
		detail: {
			data: {},
		},
	})
);
this.dispatchEvent(
	new CustomEvent("afterSubmit", {
		detail: {
			data: {},
		},
	})
);
```

2、vue 中使用部门代码

在 public 目录下得 index.html 中导入

```html
<script src="./UserCard.js"></script>
<template>
	 
	<div id="app">
		   
		<user-card
			v-if="show"
			image="https://semantic-ui.com/images/avatar2/large/kristy.png"
			name="User Name"
			email="yourmail@some-email.com"
		></user-card>
		     
		<user-card
			image="https://semantic-ui.com/images/avatar2/large/kristy.png"
			name="test"
			email="yourmail@some-email.com"
		></user-card>
		    <button @click="onclick">      测试    </button>  
	</div>
</template>
<script>
	export default {
		data: function () {
			return {
				show: true,
			};
		},
		name: "App",
		mounted() {},
		methods: {
			// 测试web组件生命周期
			onclick() {
				this.show = !this.show;
			},
		},
	};
</script>
<style>
	#app {
	  font-family: Avenir, Helvetica, Arial, sans-serif;
	  -webkit-font-smoothing: antialiased;
	  -moz-osx-font-smoothing: grayscale;
	  text-align: center;
	  color: #2c3e50;
	  margin-top: 60px;
	}
</style>
```

3、在 react 中使用

```jsx
// submit事件 在点击登录时触发，传递的登录信息在，detail字段中
// afterSubmit 在登录数据下发服务端后触发 用于处理登录后的路由跳转等逻辑
<user-card url="https://www.baidu.com/"
                  user="account"
                  password="password"
                  id="form"
                  style="background-image: url(/assets/background.jpg)"
                  body-style="right: 200px;"
                  title="系统">
    </user-card>
    <script>
        const form = document.querySelector('#form');
        form.addEventListener('submit', (data)=> {
            console.log(data)
        });
        form.addEventListener('afterSubmit', (data)=> {
            console.log(data)
        });
    </script>

/**
 * 处理react tsx中直接使用web components报错问题
 */
interface UserCardModuleProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {
    title: string,
    ...
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            'user-card': UserCardModuleProps
        }
    }
}
```

4、在 html 中使用

```html
<!DOCTYPE html>
<html>
	<head>
		   
		<meta charset="utf-8" />
		   
		<meta name="viewport" content="width=device-width" />
		   
		<title>JS Bin</title>
	</head>
	<body>
		<user-card
			image="https://semantic-ui.com/images/avatar2/large/kristy.png"
			name="User Name"
			email="yourmail@some-email.com"
		></user-card>
		<user-card
			image="https://semantic-ui.com/images/avatar2/large/kristy.png"
			name="test"
			email="yourmail@some-email.com"
		></user-card>
		<script src="./public/UserCard.js"></script>
		<script></script>
	</body>
</html>
```

## 其他

基于 Web Components 实现一个日历原生组件：https://www.jb51.net/javascript/292802p6p.htm

[svelte + vite 开发 Web Components - 掘金 (juejin.cn)](https://juejin.cn/post/7215896450608300087)

### 编写 Web Components 组件

https://blog.51cto.com/palxp/5776126

```html
<!-- 组件使用 -->
<warning-card title="前方高能">
	<img
		slot="desc"
		src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ba825ffee78c4a1b9c0232e5d2f1d048~tplv-k3u1fbpfcp-watermark.image?"
	/>
</warning-card>

<!-- 组件定义 -->
<template id="warning-card">
	<details class="ContentWarning">
		<summary><strong>⚠️ 注意:</strong> <span id="title"></span></summary>
		<slot name="desc">THE DESCRIPTION</slot>
	</details>
	<!-- 组件样式 -->
	<style>
		.ContentWarning {
			border: 1px solid rgb(0 0 0 / 0.3);
			border-radius: 0.2em;
			padding: 1em;
		}

		.ContentWarning > summary {
			position: relative;
			transition: all 0.3s;
			list-style: none;
			user-select: none;
			cursor: pointer;
			padding: 1em;
			margin: -1em;
			--stripe-color: rgb(0 0 0 / 0.1);
			background-image: repeating-linear-gradient(
				45deg,
				transparent,
				transparent 0.5em,
				var(--stripe-color) 0.5em,
				var(--stripe-color) 1em
			);
		}

		.ContentWarning > summary::after {
			content: "↕ 展开查看";
			text-transform: uppercase;
			letter-spacing: 1px;
			opacity: 0.8;
			font-size: 70%;
			position: absolute;
			right: 1em;
			top: 50%;
			transform: translatey(-50%);
		}

		.ContentWarning[open] > summary {
			margin-bottom: 1em;
		}

		.ContentWarning > summary:hover,
		.ContentWarning > summary:focus {
			--stripe-color: rgb(150 0 0 / 0.1);
		}
	</style>
</template>

<style>
	body {
		font: 125% / 1.4 sans-serif;
		max-width: 600px;
		margin: 1em auto;
		padding: 1em;
	}

	img {
		max-width: 100%;
		display: block;
		height: auto;
	}
</style>

<script>
	// class WarningCard extends HTMLElement {
	//   constructor() {
	//     super();
	//     var templateElem = document.getElementById('warning-card');
	//     var content = templateElem.content.cloneNode(true);
	//     this.appendChild(content);
	//   }
	// }
	// customElements.define('warning-card', WarningCard);

	window.customElements.define(
		"warning-card",
		class extends HTMLElement {
			constructor() {
				super();
				// var templateElem = document.getElementById('warning-card');
				// var content = templateElem.content.cloneNode(true);
				// this.appendChild(content);

				var template = document.getElementById("warning-card").content;
				template.querySelector("#title").innerText = this.getAttribute("title");
				this.attachShadow({ mode: "open" }).appendChild(
					template.cloneNode(true)
				);
			}
		}
	);
</script>
```

## :alarm_clock:基于 web Components 的框架

### LitElement

LitElement 是一款由 Google 团队开发的基于 Web Component 标准的轻量级、可复用的 Web 组件库，还拥有响应式数据、生命周期管理等功能。它使用了原生的 Web 平台功能，不需要依赖其他框架或运行时。适用于单个组件和组件库开发，并解决了 webComponent 的 Custom Elements 的兼容性问题。

- 新版存储库：https://github.com/lit/lit/
- 旧版存储库：https://github.com/lit/lit-element
- 官网：https://lit.dev/

### ofajs

官网：[ofa.js - 不需要打包的 MVVM JavaScript 框架 (ofajs.com)](https://ofajs.com/cn/index.html)

开源地址：https://github.com/kirakiray/ofa.js

### shoelace

开源地址：[shoelace-style/shoelace：基于 Web 标准构建的专业设计的日常 UI 组件的集合。适用于所有框架以及常规 HTML/CSS/JS。🥾 (github.com)](https://github.com/shoelace-style/shoelace)

官网：[Shoelace：一个具有前瞻性的 Web 组件库。](https://shoelace.style/)

### OhMyLive2D

高可自定义且开箱即用的 Live2D For Web 组件, 快速为您的个人网站加入Live2D看板娘

官网：[OhMyLive2D (oml2d.com)](https://oml2d.com/)

开源地址：[oh-my-live2d/oh-my-live2d: 应用于浏览器环境且开箱即用的Live2D组件, 它支持所有版本的Live2D模型, 使用方式足够简单并且高可自定义, 可以快速为您的个人网站添加Live2D看板娘, 使您的个人网站变得更具有特色. (github.com)](https://github.com/oh-my-live2d/oh-my-live2d)

### cami.js

[kennyfrc/cami.js：Cami.js 是一个简单而强大的工具包，用于 Web 应用程序中的交互式孤岛。无需构建步骤。 (github.com)](https://github.com/kennyfrc/cami.js)
