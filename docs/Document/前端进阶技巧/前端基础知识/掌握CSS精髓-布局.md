# 掌握 CSS 精髓-布局

CSS 虽然初衷是用来美化 HTML 文档的，但实际上随着 float、position 等属性的出现，它已经可以起到调整文档渲染结构的作用了，而随着弹性盒子以及网格布局的推出，CSS 将承担越来越重要的布局功能。渐渐地我们发现 HTML 标签决定了页面的逻辑结构，而 CSS 决定了页面的视觉结构。

这一课时我们先来分析常见的布局效果有哪些，然后再通过代码来实现这些效果，从而帮助你彻底掌握 CSS 布局。

我们通常提到的布局，有两个共同点：

大多数用于 PC 端，因为 PC 端屏幕像素宽度够大，可布局的空间也大；

布局是有限空间内的元素排列方式，因为页面设计横向不滚动，纵向无限延伸，所以大多数时候讨论的布局都是对水平方向进行分割。

实际上我们在讨论布局的时候，会把网页上特定的区域进行分列操作。按照分列数目，可以大致分为 3 类，即单列布局、2 列布局、3 列布局。

#### 单列布局

单列布局是最常用的一种布局，它的实现效果就是将一个元素作为布局容器，通常设置一个较小的（最大）宽度来保证不同像素宽度屏幕下显示一致。

一些网站会将单列布局与其他布局方式混合使用，比如拉勾网首页的海报和左侧标签就使用了 2 列布局，这样既能向下兼容窄屏幕，又能按照主次关系显示页面内容。

这种布局的优势在于基本上可以适配超过布局容器宽度的各种显示屏幕，比如上面的示例网站布局容器宽度为 700px，也就是说超过 700px 宽度的显示屏幕上浏览网站看到的效果是一致的。

但它最大的缺点也是源于此，过度的冗余设计必然会带来浪费。例如，在上面的例子中，其实我的屏幕宽度是足够的，可以显示更多的内容，但是页面两侧却出现了大量空白区域，如果在 4k 甚至更宽的屏幕下，空白区域大小会超过页面内容区域大小！

#### 2 列布局

2 列布局使用频率也非常的高，实现效果就是将页面分割成左右宽度不等的两列，宽度较小的列设置为固定宽度，剩余宽度由另一列撑满。为了描述方便，我们暂且称宽度较小的列父元素为次要布局容器，宽度较大的列父元素为主要布局容器。

示例网站：各种文档网站

#### 3 列布局（圣杯布局）

3 列布局按照左中右的顺序进行排列，通常中间列最宽，左右两列次之。

示例网站：

- github 登录后的首页。登录 GitHub 后，蓝色区域为宽度最大的中间列。
- CSDN 首页，这是 3 列布局的第二种实现方式，蓝色部分就是 2 列布局的主要布局容器，而它的子元素又使用了 2 列布局。

3 列布局和 2 列布局类似，也有明确的主次关系，只是关系层次增加了一层。下面我们来看看如何实现这些布局。

#### 3 列布局的圣杯布局和双飞翼布局

- 圣杯布局：两边定宽，中间自适应的 3 列布局，中间列要放在文档流前面以优先渲染。
- 双飞翼布局的中间栏宽度可以缩小至 0

##### 两者异同

两者的功能相同，都是为了实现一个两侧宽度固定，中间宽度自适应的三栏布局，并且中间部分在 HTML 代码中要写在前边，这样它就会被优先加载渲染。

主要的不同之处：在解决中间部分被挡住的问题时，采取的解决办法不一样。圣杯布局是在父元素上设置了 padding-left 和 padding-right，在给左右两边的内容设置 position 为 relative，通过左移和右移来使得左右两边的内容得以很好的展现，而双飞翼布局则是在中间这个 div 的外层又套了一个 div 来放置内容，在给这个中间的 div 设置 margin-left 和 margin-right 。

两种布局方式都是把主列放在文档流最前面，使主列优先加载。

两种布局方式在实现上也有相同之处，都是让三列浮动，然后通过负外边距形成三列布局。

两种布局方式的不同之处在于如何处理中间主列的位置：

- 圣杯布局是利用父容器的左、右内边距+两个列的相对定位;
- 双飞翼布局是把主列嵌套在一个新的父级块中并利用主列的左、右外边距进行布局调整。

#### 布局实现

单列布局没有太多技术难点，通过将设置布局容器（最大）宽度以及左右边距为 auto 即可实现，我们重点讨论 2 列和 3 列布局。关于这两种布局，在网上可以找到很多实现方式，我们是不是只要把这些方式收集起来然后都记住就行了呢？

当然不是！

我们要做的是通过归纳法，找到这些方式的共同实现步骤，只要把这些步骤记住了，就能做到举一反三。

你可以试着自己先整理一下，或者直接看我整理好的结果。

要实现 2 列布局或 3 列布局，可以按照下面的步骤来操作：

（1）为了保证主要布局容器优先级，应将主要布局容器写在次要布局容器之前。

（2）将布局容器进行水平排列；

（3）设置宽度，即次要容器宽度固定，主要容器撑满；

（4）消除布局方式的副作用，如浮动造成的高度塌陷；

（5）为了在窄屏下也能正常显示，可以通过媒体查询进行优化。

根据以上操作步骤，先来看一个使用 flex 布局实现 2 列布局的例子。

第 1 步，写好 HTML 结构。这里为了查看方便，我们为布局容器设置背景颜色和高度。

```html
<style>
	/* 为了方便查看，给布局容器设置高度和颜色 */
	main,
	aside {
		height: 100px;
	}
	main {
		background-color: #f09e5a;
	}
	aside {
		background-color: #c295cf;
	}
</style>
<div>
	<main>主要布局容器</main>
	<aside>次要布局容器</aside>
</div>
```

第 2 步，将布局容器水平排列：

```html
<style>
	.wrap {
		display: flex;
		flex-direction: row-reverse;
	}
	.main {
		flex: 1;
	}
	.aside {
		flex: 1;
	}
</style>
<div class="wrap">
	<main class="main">主要布局容器</main>
	<aside class="aside">次要布局容器</aside>
</div>
```

第 3 步，调整布局容器宽度：

```html
<style>
	.wrap {
		display: flex;
		flex-direction: row-reverse;
	}
	.main {
		flex: 1;
	}
	.aside {
		width: 200px;
	}
</style>
<div class="wrap">
	<main class="main">主要布局容器</main>
	<aside class="aside">次要布局容器</aside>
</div>
```

第 4 步，消除副作用，比如浮动造成的高度塌陷。由于使用 flex 布局没有副作用，所以不需要修改，代码和效果图同第 3 步。

第 5 步，增加媒体查询。

```html
<style>
	.wrap {
		display: flex;
		flex-direction: row-reverse;
		flex-wrap: wrap;
	}
	.main {
		flex: 1;
	}
	.aside {
		width: 200px;
	}
	@media only screen and (max-width: 1000px) {
		.wrap {
			flex-direction: row;
		}
		.main {
			flex: 100%;
		}
	}
</style>
<div class="wrap">
	<main class="main">主要布局容器</main>
	<aside class="aside">次要布局容器</aside>
</div>
```

下面再来个复杂些的 3 列布局的例子。

第 1 步，写好 HTML 结构，为了辨认方便，我们给布局容器设置背景色和高度：

```html
<style>
	/* 为了方便查看，给布局容器设置高度和颜色 */
	.main,
	.left,
	.right {
		height: 100px;
	}
	.main {
		background-color: red;
	}
	.left {
		background-color: green;
	}
	.right {
		background-color: blue;
	}
</style>
<div class="wrap">
	<main class="main">main</main>
	<aside class="left">left</aside>
	<aside class="right">right</aside>
</div>
```

第 2 步，让布局容器水平排列：

```html
<style>
	.main,
	.left,
	.right {
		float: left;
	}
</style>
<div class="wrap">
	<main class="main">main</main>
	<aside class="left">left</aside>
	<aside class="right">right</aside>
</div>
```

第 3 步，调整宽度，将主要布局容器 main 撑满，次要布局容器 left 固定 300px，次要布局容器 right 固定 200px。

这里如果直接设置的话，布局容器 left 和 right 都会换行，所以我们需要通过设置父元素 wrap 内边距来压缩主要布局 main 给次要布局容器留出空间。同时通过设置次要布局容器边距以及采用相对定位调整次要布局容器至两侧。

```html
<style>
	.main,
	.left,
	.right {
		float: left;
	}
	.wrap {
		padding: 0 200px 0 300px;
	}
	.main {
		width: 100%;
	}
	.left {
		width: 300px;
		position: relative;
		left: -300px;
		margin-left: -100%;
	}
	.right {
		position: relative;
		width: 200px;
		margin-left: -200px;
		right: -200px;
	}
</style>
<div class="wrap">
	<main class="main">main</main>
	<aside class="left">left</aside>
	<aside class="right">right</aside>
</div>
```

第 4 步，消除副作用。我们知道使用浮动会造成高度塌陷，如果在父元素后面添加新的元素就会产生这个问题。所以可以通过伪类来清除浮动，同时减小页面宽度，还会发现次要布局容器 left 和 right 都换行了，但这个副作用我们可以在第 5 步时进行消除。

```html
<style>
	.main,
	.left,
	.right {
		float: left;
	}
	.wrap {
		padding: 0 200px 0 300px;
	}
	.wrap::after {
		content: "";
		display: block;
		clear: both;
	}
	.main {
		width: 100%;
	}
	.left {
		width: 300px;
		position: relative;
		left: -300px;
		margin-left: -100%;
	}
	.right {
		position: relative;
		width: 200px;
		margin-left: -200px;
		right: -200px;
	}
</style>
<div class="wrap">
	<main class="main">main</main>
	<aside class="left">left</aside>
	<aside class="right">right</aside>
</div>
```

第 5 步，利用媒体查询调整页面宽度较小情况下的显示优先级。这里我们仍然希望优先显示主要布局容器 main，其次是次要布局容器 left，最后是布局容器 right。

```html
<style>
	.main,
	.left,
	.right {
		float: left;
	}
	.wrap {
		padding: 0 200px 0 300px;
	}
	.wrap::after {
		content: "";
		display: block;
		clear: both;
	}
	.main {
		width: 100%;
	}
	.left {
		width: 300px;
		position: relative;
		left: -300px;
		margin-left: -100%;
	}
	.right {
		position: relative;
		width: 200px;
		margin-left: -200px;
		right: -200px;
	}
	@media only screen and (max-width: 1000px) {
		.wrap {
			padding: 0;
		}
		.left {
			left: 0;
			margin-left: 0;
		}
		.right {
			margin-left: 0;
			right: 0;
		}
	}
</style>
<div class="wrap">
	<main class="main">main</main>
	<aside class="left">left</aside>
	<aside class="right">right</aside>
</div>
```

这种 3 列布局的实现，就是流传已久的**“圣杯布局”**，但标准的圣杯布局没有添加媒体查询。

---

#### 延伸 1：垂直方向的布局

垂直方向有一种布局虽然使用频率不如水平方向布局高，但在面试中很容易被问到，所以这里特意再补充讲解一下。

这种布局将页面分成上、中、下三个部分，上、下部分都为固定高度，中间部分高度不定。当页面高度小于浏览器高度时，下部分应固定在屏幕底部；当页面高度超出浏览器高度时，下部分应该随中间部分被撑开，显示在页面最底部。

这种布局也称之为”sticky footer“，意思是下部分粘黏在屏幕底部。要实现这个功能，最简单的就是使用 flex 或 grid 进行布局。下面是使用 flex 的主要代码：

```html
<style>
	.container {
		display: flex;
		height: 100%;
		flex-direction: column;
	}
	header,
	footer {
		min-height: 100px;
	}
	main {
		flex: 1;
	}
</style>
<div class="container">
	<header></header>
	<main>
		<div>...</div>
	</main>
	<footer></footer>
</div>
```

代码实现思路比较简单，将布局容器的父元素 display 属性设置成 flex，伸缩方向改为垂直方向，高度撑满页面，再将中间布局容器的 flex 属性设置为 1，让其自适应即可。

如果要考虑兼容性的话，其实现起来要复杂些，下面是主要代码：

```html
<style>
	.container {
		box-sizing: border-box;
		min-height: 100vh;
		padding-bottom: 100px;
	}
	header,
	footer {
		height: 100px;
	}
	footer {
		margin-top: -100px;
	}
</style>
<div class="container">
	<header></header>
	<main></main>
</div>
<footer></footer>
```

将上部分布局容器与中间布局容器放入一个共同的父元素中，并让父元素高度撑满，然后设置内下边距给下部分布局容器预留空间，下部分布局容器设置上外边距“嵌入”父元素中。从而实现了随着中间布局容器高度而被撑开的效果。

#### 延伸 2：框架中栅格布局的列数

很多 UI 框架都提供了栅格系统来帮助页面实现等分或等比布局，比如 Bootstrap 提供了 12 列栅格，elment ui 和 ant design 提供了 24 列栅格。

那么你思考过栅格系统设定这些列数背后的原因吗？

首先从 12 列说起，12 这个数字，从数学上来说它具有很多约数 1、2、3、4、6、12，也就是说可以轻松实现 1 等分、2 等分、3 等分、4 等分、6 等分、12 等分，比例方面可以实现 1:11、1:5、1:3、1:2、1:1、1:10:1、1:4:1 等。如果换成 10 或 8，则可实现的等分比例就会少很多，而更大的 16 似乎是个不错的选择，但对于常用的 3 等分就难以实现。

至于使用 24 列不使用 12 列，可能是考虑宽屏幕（PC 端屏幕宽度不断增加）下对 12 列难以满足等分比例需求，比如 8 等分。同时又能够保证兼容 12 列情况下的等分比例（方便项目迁移和替换）。

#### CSS 布局总结

通过这一讲，我们学习了几种常见布局，包括单列、2 列、3 列及垂直三栏布局，同时思考每种布局的优缺点和使用场景，并且对 2 列布局和 3 列布局实现方法归纳成了 5 个步骤，希望你能举一反三，并应用到实际的工作中。

课程代码点击下载：<https://github.com/yalishizhude/course/tree/master/04>

最后布置一道思考题：你还想到了使用哪些方法来实现 2 列或 3 列布局？
