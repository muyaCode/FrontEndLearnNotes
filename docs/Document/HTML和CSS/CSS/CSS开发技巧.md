# CSS 开发技巧

[CSS Reset - Piccalilli](https://piccalil.li/blog/a-more-modern-css-reset/)

灵活运用 CSS 开发技巧：<https://juejin.cn/post/6844903926110617613>

Css Sprite 精灵图：<https://www.jb51.cc/css-sprite-tutorial/1187472.html>

[纯 CSS 检测文本是否溢出 - 掘金 (juejin.cn)](https://juejin.cn/post/7347221074704777226)

## 1. First letter drop 首字母丢失

![image-20240306182349834](./CSS开发技巧.assets/image-20240306182349834.png)

我们可以使用 `:first-letter` 来删除文本的第一个字母：

```css
p:first-letter {
	font-size: 200%;
	color: #8a2be2;
}
```

`:first-letter` 选择器用于指定元素的首字母样式，它仅适用于块级元素。效果如下:

[first-letter (codepen.io)](https://codepen.io/OMGZui/pen/oNEMVvN)

## 2. 图像文本环绕

![image-20240306182430920](./CSS开发技巧.assets/image-20240306182430920.png)

CSS 中的 `shape-outside` 属性是一个非常有用且强大的工具，它允许设计师和开发者控制内容如何围绕一个浮动元素（通常是图像或图形）进行排列。通过定义这个属性中的形状，您可以创建更复杂和吸引人的布局，使文本环绕复杂的形状，而不仅仅是通常的矩形。

`shape-outside` 属性定义了内容将围绕其排列的形状。它通常与 float 属性一起使用，因为只有浮动的元素才会有内容围绕它。

**可用的值:**

1. none: 默认值。不创建任何形状；内容围绕元素的盒子进行排列。
2. `<shape-box>`: 使用元素的边距盒、边框盒、填充盒或内容盒作为参考盒。

- margin-box
- border-box
- padding-box
- content-box

1. `<basic-shape>`: 可以定义一个基本的形状，例如：

- circle()
- ellipse()
- inset()
- polygon()

1. `<image>`: 一个图像可以用作形状的参考。图像的 alpha 通道决定了形状的尺寸。

#### 举例

使用椭圆:

```css
.element {
	float: left;
	shape-outside: ellipse(50% 50% at 50% 50%);
}
```

使用多边形:

```css
.element {
	float: left;
	shape-outside: polygon(0% 0%, 100% 0%, 50% 100%);
}
```

使用图像:

```css
.element {
	float: left;
	shape-outside: url("path-to-image.png");
}
```

#### 实际应用

假设你有一个圆形图像，您希望文本围绕它排列，同时尊重圆的边界。没有 shape-outside，文本只会围绕图像的矩形边界盒子进行排列。但使用 `shape-outside`，可以使文本平滑地围绕圆形图像进行排列，从而得到更加视觉上吸引人的布局。

整合地址：[shape-outside (codepen.io)](https://codepen.io/OMGZui/pen/JjpBzGP)

## 3. 使用 `:where()` 简化代码

当将同一样式应用于多个元素时，CSS 可能会像这样：

```css
.page div,
.paget .title,
.page #article {
	color: red;
}
```

这段代码看起来并不是很易读，而 `:where()` 伪类就派上了用场。 `:where()` 伪类函数接受一个选择器列表作为其参数，并将选择所有可以由选择器列表中的任何规则选择的元素。

```css
.page :where(div, .title, #article) {
	color: red;
}
```

## 4. 透明图像的阴影

![image-20240306182521323](./CSS开发技巧.assets/image-20240306182521323.png)

你是否曾尝试在透明图像上添加 box-shadow ，结果却看起来像是你添加了边框？我想我们都有过这样的经历。为透明图像添加阴影效果的解决方案是使用 `drop-shadow` 。

它的工作方式是， `drop-shadow` 属性遵循给定图像的`alpha`通道。因此，阴影是基于图像内部的形状，而不是显示在其外部。

事例地址：[shadow (codepen.io)](https://codepen.io/OMGZui/pen/bGLjJNO)

## 5. 文字的打字效果

网页设计正在以每分钟的速度变得更富创意。借助 CSS 动画功能，您可以让您的网页充满生机。在这个例子中，我们使用动画和`@keyframes`属性来实现打字机效果。

具体来说，对于这个演示，我们实现了 `steps()` 属性来分割我们的文本动画。首先，你需要指定 `steps()` 的数量，就我们的情况来说，这是我们希望进行动画处理的文本的字符长度。

其次，我们使用 `@keyframes` 来声明动画何时开始。例如，如果你在“文字打字效果”后面写了另一个词，除非你改变 CSS 片段中的 steps() 数量，否则动画将无法工作。

也就是说，这种效果并不是特别新颖。然而，尽管可以通过使用 CSS 达到同样的效果，但大多数开发者仍然会选择使用 JavaScript 库。

事例地址：[Typing Effect (codepen.io)](https://codepen.io/OMGZui/pen/MWQBxqd)

## 6. 设置自定义光标

你可能永远不需要强制让你的访客使用独特的光标。至少，对于一般的用户体验目的来说是这样。然而，关于 `cursor` 属性的一点值得注意的是，它允许你展示图片。这相当于以照片格式展示工具提示。

一些使用场景包括能够比较两张不同的照片，而无需在视口中渲染这些照片。例如，可以使用光标属性来节省设计中的空间。由于你可以将自定义光标锁定到特定的 `div`元素上，所以它不会干扰到元素之外的其他元素。

事例地址：[cursor (codepen.io)](https://codepen.io/OMGZui/pen/abqjMXd)

## 7. 纯 CSS 的清单

正如我在文章开头提到的，CSS 正在稳步发展。而这个动态清单的演示就是一个很好的例证。

它的工作方式是我们将复选框输入类型与 `:checked` 伪类一起使用。并使用 transform 属性在 `:checked` 规范返回真值时更改状态。

使用这种方法可以实现各种各样的目标。例如，当用户点击特定的复选框时，切换隐藏的内容。它适用于单选和复选框等输入类型，但也可以应用于`<option>`和`<select>`元素。

事例地址：[checklist (codepen.io)](https://codepen.io/OMGZui/pen/yLvqwZW)

### 1. 自定义光标（cursor）

首先来看一下`CSS`的内置光标样式。平时开发中用到的基本上就是`default`、`pointer`、`not-allowed`、`move`这几个。其实内置的光标样式还有很多，大家可以把鼠标放到下面的颜色块上体验一下。

自定义光标也很简单，只需要通过`cursor: url(xxx)`引入一张图片即可。有时候我们下载的`chrome`主题会改变光标的样式，用的就是这个方法。

[鼠标光标样式 - 码上掘金 (juejin.cn)](https://code.juejin.cn/pen/7187210955057528888)

### 2. 自定义 placeholder 样式（::placeholder）

如果一个输入框是必填的，如果没有输入具体值，在失焦的情况下一般都会标红提示。这时候也可以把`placeholder`变成红色的达到更加醒目的效果。

[自定义 placeholder 字体颜色 - 码上掘金 (juejin.cn)](https://code.juejin.cn/pen/7187211344746119200)

### 3. 自定义选中样式（::selection）

有时候我们看到网页的文字选中会有特殊的样式，就是通过`::selection`这个伪元素来实现的。

`::selection`伪元素用来应用于文档中被用户高亮的部分。在使用这个伪元素时，有一点需要注意，只有以下这些`CSS`属性可以用于`::selection` 选择器：

- [`color`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/color)
- [`background-color`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-color)
- [`cursor`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/cursor)
- [`caret-color`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/caret-color)
- [`outline`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/outline)
- [`text-decoration`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/text-decoration)
- [`text-emphasis-color` (en-US)](https://developer.mozilla.org/en-US/docs/Web/CSS/text-emphasis-color)
- [`text-shadow`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/text-shadow)

[选中文字背景变色 - 码上掘金 (juejin.cn)](https://code.juejin.cn/pen/7187212680875704377)

### 4. 禁止用户选择 & 可以整段选择（user-select）

有些网站会禁止用户选中内容进行复制，在 CSS 层面可以通过`user-select: none`来实现。

`user-select`属性用来控制用户能否选中文本。它可以接收的参数还有`auto`、`text`、`contain`、`all`等。

当为`all`时，当点击子元素或者上下文时，包含该子元素的最顶层元素也会被选中。有了这个属性，我们在复制整篇内容时，不用先选中然后通过拖动滚动条来实现复制大段的内容了，可以通过先找到想要复制的元素的根元素，然后给它加上`user-select: all`的属性，就可以轻松的点击一下就全部选中了。

[选择整段文字的方式 - 码上掘金 (juejin.cn)](https://code.juejin.cn/pen/7187213869830373388)

### 5. 禁止鼠标事件（pointer-events）

在有些需求中，需要禁止用户点击某个区域，看起来鼠标在这个区域完全不起作用，不会响应相应的事件。这时候可以通过`pointer-events`属性来限制。

`pointer-events`属性用来指定在什么情况下某个特定的图形元素可以成为鼠标事件的`target`。把它设置成`none`即可到达效果。

[禁止鼠标点击事件 - 码上掘金 (juejin.cn)](https://code.juejin.cn/pen/7187214405023563831)

### 6. 让网站变灰（filter:grayscale）

在一些公祭日的时候，我们浏览网站通常都会发现网站整体风格都会变成灰色的。这种效果就是用`filter`这个属性实现的。

`filter`属性可以将模糊或颜色偏移等图形效果应用于元素，可以接收的函数包括：

- [`blur()`](https://developer.mozilla.org/en-US/docs/Web/CSS/filter-function/blur)、
- [`brightness()`](https://developer.mozilla.org/en-US/docs/Web/CSS/filter-function/brightness)
- [`contrast()`](https://developer.mozilla.org/en-US/docs/Web/CSS/filter-function/contrast)
- [`grayscale()`](https://developer.mozilla.org/en-US/docs/Web/CSS/filter-function/grayscale)
- [`hue-rotate()`](https://developer.mozilla.org/en-US/docs/Web/CSS/filter-function/hue-rotate)
- [`invert()`](https://developer.mozilla.org/en-US/docs/Web/CSS/filter-function/invert)
- [`opacity()`](https://developer.mozilla.org/en-US/docs/Web/CSS/filter-function/opacity)
- [`saturate()`](https://developer.mozilla.org/en-US/docs/Web/CSS/filter-function/saturate)
- [`sepia()`](https://developer.mozilla.org/en-US/docs/Web/CSS/filter-function/sepia)
- [`drop-shadow()`](https://developer.mozilla.org/en-US/docs/Web/CSS/filter-function/drop-shadow)

其中`grayscale(）`函数的作用就是将图片转换成灰度，可以接收数字或者百分比参数。0 代表不做处理，1 代表完全变成灰度。两者之间的数值通过线性插值来生成具体的灰度值。不传参默认为 1。所以我们用`filter:grayscale()`一行代码就可以实现让网站变灰的效果。

[前端页面一键置黑 - 码上掘金 (juejin.cn)](https://code.juejin.cn/pen/7187214942305517600)

### 7. 多行文本截断展示省略号(-webkit-line-clamp)

单行文本截断展示省略号的方法估计大家已经应用的很是得心应手了。

```css
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;
```

多行文本省略号用到：`-webkit-line-clamp`，`-webkit-line-clamp`属性可以把块容器中的内容限制为指定的行数。它只有在`display`属性设置成`-webkit-box`或者`-webkit-inline-box`并且`-webkit-box-orient`属性设置成`vertical`时才有效果。再配合上`overflow: hidden`和`text-overflow: ellipsis`就可以实现多行文本截断展示省略号的效果了。

[多行显示省略号 - 码上掘金 (juejin.cn)](https://code.juejin.cn/pen/7187217068771508257)

### 8. 实现镜像、倒影等效果（-webkit-box-reflect）

`-webkit-box-reflect`这个属性可以在不同方向反射元素的内容。有了这个属性，我们就可以实现一些神奇的效果，比如镜像、倒影等。

[图片镜像及倒影 - 码上掘金 (juejin.cn)](https://code.juejin.cn/pen/7187217522876219448)

## CSS 动画

[仅限 CSS 的 DVD 屏幕保护程序动画 |哈维尔·莫拉莱斯 (javiermorales.dev)](https://www.javiermorales.dev/blog/dvd)

可视化 CSS 动画：[Animotion — Visual CSS Animation Builder](https://animotion.dev/)

# 实用的 CSS 技巧

想要让你的网站在激烈的竞争中脱颖而出吗？使用 CSS 的强大功能可以帮助你实现这一目标。本文将分享 22 个实用的 CSS 技巧，帮助你提升网站的外观和用户体验。无论你是一个新手还是有经验的开发者，这些技巧都将为你的网站注入新鲜的设计元素和动感效果。

1. 自定义字体： 通过使用@font-face 规则，你可以在网站中应用自定义字体，增加独特性和品牌识别度。选择适合你网站风格的字体，并确保它们能够正确加载和显示。
2. 渐变背景色： 使用 CSS 渐变背景色可以为你的网站添加华丽的外观。尝试不同类型的渐变，如线性渐变、径向渐变或重复渐变。通过指定起始颜色和结束颜色，你可以创建丰富多彩的背景效果。

```css
.background {
	background: linear-gradient(to right, #ff9900, #ff5500);
}
```

动画效果： 利用 CSS 的过渡和动画属性，为你的网站添加动感效果。创建平滑的过渡、淡入淡出效果或引人注目的动画序列。通过定义动画的持续时间、延迟时间和重复次数，你可以控制动画的表现方式。

```css
.box {
	transition: background-color 0.3s ease-in-out;
}

.box:hover {
	background-color: #ff5500;
}
```

响应式布局： 使用 CSS 媒体查询来创建响应式布局，使你的网站在不同设备上都能呈现出良好的用户体验。根据屏幕尺寸和方向，调整元素的大小、位置和样式。使用弹性盒子（Flexbox）或网格布局（Grid Layout）来实现灵活的自适应设计。

```css
@media screen and (max-width: 768px) {
	.container {
		flex-direction: column;
	}

	.sidebar {
		order: 2;
	}

	.main-content {
		order: 1;
	}
}
```

平滑滚动效果： 通过使用 CSS 的 scroll-behavior 属性，你可以为网页添加平滑滚动效果，使页面在滚动时更加流畅和舒适。将其应用于 html 或 body 元素，即可启用平滑滚动效果。

```css
html {
	scroll-behavior: smooth;
}
```

网格布局： 使用 CSS 网格布局可以轻松创建复杂的网格结构，实现灵活的页面布局。通过定义网格容器和网格项，你可以精确控制元素的位置和大小。

```css
.grid-container {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-gap: 20px;
}

.grid-item {
	grid-column: span 2;
	grid-row: span 1;
}
```

自定义滚动条样式： 通过使用 CSS 的::-webkit-scrollbar 伪类选择器，你可以自定义滚动条的样式。调整滚动条的宽度、颜色和形状，以适应你的设计需求。

```css
::-webkit-scrollbar {
	width: 10px;
}

::-webkit-scrollbar-thumb {
	background-color: #ff5500;
}

::-webkit-scrollbar-track {
	background-color: #f1f1f1;
}
```

响应式字体大小： 使用 CSS 的 vw 单位（视窗宽度的百分比）可以创建响应式字体大小。通过设置根元素的字体大小为 vw 单位，使字体随着屏幕尺寸的变化而自适应。

```css
html {
	font-size: 4vw;
}
```

阴影效果： 通过使用 CSS 的 box-shadow 属性，你可以添加阴影效果，为元素增添立体感和深度。调整阴影的颜色、模糊程度和偏移量，以实现不同的效果。

```css
.box {
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
```

自定义滚动条样式： 通过使用 CSS 的::-webkit-scrollbar 伪类选择器，你可以自定义滚动条的样式。调整滚动条的宽度、颜色和形状，以适应你的设计需求。

```css
/* Webkit浏览器（Chrome等） */
::-webkit-scrollbar {
	width: 8px;
}

::-webkit-scrollbar-track {
	background-color: #f1f1f1;
}

::-webkit-scrollbar-thumb {
	background-color: #888;
}

::-webkit-scrollbar-thumb:hover {
	background-color: #555;
}
```

文本溢出省略号： 当文本内容超过容器宽度时，可以使用 CSS 的 text-overflow 属性来实现省略号的效果，以便更好地处理长文本。

```css
.container {
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}
```

边框动画效果： 通过使用 CSS 的 transition 属性和:hover 伪类，可以为元素添加边框动画效果，使其在鼠标悬停时产生过渡效果。

```css
.box {
	border: 1px solid #ccc;
	transition: border-color 0.3s ease-in-out;
}

.box:hover {
	border-color: #ff5500;
}
```

图片模糊效果： 通过使用 CSS 的 filter 属性中的 blur 函数，你可以为图片添加模糊效果。调整模糊程度，使图像呈现出柔和的视觉效果。

```css
.image {
	filter: blur(5px);
}
```

渐变背景色： 使用 CSS 的 linear-gradient 函数，你可以为元素创建渐变背景色。定义起点和终点的颜色值，以及渐变的方向，实现各种炫丽的背景效果。

```css
.container {
	background: linear-gradient(to right, #ff5500, #ffd200);
}
```

文字阴影效果： 通过使用 CSS 的 text-shadow 属性，你可以为文字添加阴影效果，增加文字的可读性和视觉效果。可以调整阴影的颜色、位置和模糊程度。

```css
.text {
	text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}
```

渐变边框样式： 使用 CSS 的 border-image 属性，你可以创建具有渐变效果的边框样式。定义渐变图像或渐变颜色作为边框的源，以及边框的切片方式和宽度。

```css
.border {
	border: 10px solid;
	border-image: linear-gradient(to right, #ff5500, #ffd200) 1;
}
```

旋转动画效果： 通过使用 CSS 的 transform 属性，你可以为元素创建旋转动画效果。指定旋转角度和过渡时间，在页面中实现各种旋转效果。

```css
.box {
	transform: rotate(45deg);
	transition: transform 0.3s ease-in-out;
}

.box:hover {
	transform: rotate(90deg);
}
```

渐变文本效果： 使用 CSS 的 background-clip 属性和渐变背景色，可以为文本创建渐变效果。将渐变应用到文本的背景区域，形成独特的渐变文本效果。

```css
.text {
	background: linear-gradient(to right, #ff5500, #ffd200);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
}
```

透明度动画效果： 通过使用 CSS 的 opacity 属性和 transition 属性，你可以为元素创建透明度动画效果。控制元素的透明度，使其在过渡期间平滑淡入或淡出。

```css
.box {
	opacity: 0;
	transition: opacity 0.3s ease-in-out;
}
.box:hover {
	opacity: 1;
}
```

悬浮效果： 通过使用 CSS 的:hover 伪类和 transform 属性，可以为元素创建各种悬浮效果，如放大、旋转、倾斜等。

```css
.box {
	transition: transform 0.3s ease-in-out;
}

.box:hover {
	transform: scale(1.2);
}
```

渐变阴影效果： 使用 CSS 的 box-shadow 属性，你可以为元素创建渐变阴影效果。定义阴影的颜色和偏移量，使元素呈现出立体感。

```css
.box {
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), inset 0 0 8px rgba(255, 255, 255, 0.5);
}
```

文字动画效果： 通过使用 CSS 的@keyframes 规则和 animation 属性，可以为文字创建动画效果。定义关键帧和动画属性，使文字在页面中产生动态效果。

```css
.text {
	animation: rainbow 5s infinite;
}

@keyframes rainbow {
	0% {
		color: red;
	}
	20% {
		color: orange;
	}
	40% {
		color: yellow;
	}
	60% {
		color: green;
	}
	80% {
		color: blue;
	}
	100% {
		color: purple;
	}
}
```
