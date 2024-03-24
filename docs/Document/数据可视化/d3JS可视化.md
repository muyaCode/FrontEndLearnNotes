# d3JS 可视化

## 目标

认识 d3 的概念和优缺点

理解 d3 的基本绘图流程

## D3 是什么

- D3 是来源于 Data Driven Documents 的三个首字母，其本质是将数据与 DOM 绑定，并将数据映射至 DOM 属性上。
- D3 是一个基于 web 标准的 JavaScript 可视化库。
- D3 可以借助 SVG, Canvas 以及 HTML 将你的数据生动的展现出来。
- D3 长于可视化，而不止于可视化，还提供了数据处理、数据分析、DOM 操作等诸多功能。
- D3 更接近底层，与 g2、echarts 不同，d3 能直接操作 svg，所以拥有极大的自由度，几乎可以实现任何 2d 的设计需求。

官网地址：https://d3js.org/github

API：https://github.com/d3/d3/blob/master/API.md

### D3 的优缺点

- 优势：掌握 d3 后，可让自己的作品具有更广阔的扩展空间。
- 缺点：学习门槛较高，对用户的 web 技术、可视化理论、数学逻辑都一定要求。

## 快速上手 D3

1.下载 D3.zip：https://github.com/d3/d3

cdn：

- https://lib.baomitu.com/d3/6.2.0/d3.js
- https://d3js.org/d3.v6.min.js

  2.建立 DOM 元素

  3.用数据驱动 DOM 元素

## 2.核心知识

### 选择元素

选择的依据

- 通过 css 选择器选择
- 通过 dom 对象选择

选择的方式

- 单选：select()
- 多选：selectAll()

多选的过滤 filter()

- :nth-child(even)
- ()=>{}

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>选择</title>
		<style>
			body {
				background-color: #faf5ea;
			}
			h1 {
				text-align: center;
			}
			p {
				text-align: center;
				font-size: 24px;
			}
			.sky {
				color: #00acec;
			}
		</style>
	</head>
	<body>
		<h1 id="title">沁园春·长沙</h1>
		<article id="cont">
			<p>独立寒秋，湘江北去，橘子洲头。</p>
			<p>看万山红遍，层林尽染；漫江碧透，百舸争流。</p>
			<p>鹰击长空，鱼翔浅底，万类霜天竞自由。</p>
			<p>怅寥廓，问苍茫大地，谁主沉浮？</p>
			<p>携来百侣曾游。忆往昔峥嵘岁月稠。</p>
			<p>恰同学少年，风华正茂；书生意气，挥斥方遒。</p>
			<p>指点江山，激扬文字，粪土当年万户侯。</p>
			<p>曾记否，到中流击水，浪遏飞舟？</p>
		</article>
		<script src="https://d3js.org/d3.v6.min.js"></script>
		<script>
			/*1-选择的依据
			 *   通过css选择器选择
			 *   通过dom对象选择
			 * */
			/*select 选择'#title'*/
			/*const title=d3.select('#title').attr('class','sky')
    console.log(title.node());*/

			/*select 选择第一个p元素*/
			// d3.select('p').attr('class','sky')

			/*
			 * 用原生js获取title元素
			 * select选择title元素
			 * */
			/*d3.select('#cont').on('click',({target})=>{
        if(target.tagName==='P'){
            d3.select(target).attr('class','sky')
        }
    })*/

			/*2-多选*/
			/*selectAll 选择所有p元素*/
			// d3.selectAll('p').attr('class','sky')

			/*3-过滤多选的元素
			 *   filter((ele,ind)=>{}) 可基于节点元素或节点的索引进行过滤
			 *   filter(':nth-child(n)') 基于元素的索引位置过滤
			 * */
			/*d3.selectAll('p')
        .filter(':nth-child(3)')
        .attr('class','sky')*/
			d3.selectAll("p")
				.filter((ele, ind) => {
					return ind % 3;
				})
				.attr("class", "sky");
		</script>
	</body>
</html>
```

### 设置元素样式

classed 增|删 class

style 内联样式

attr 设置属性，会覆盖以前的属性

- class
- style……

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>样式</title>
		<style>
			body {
				background-color: #faf5ea;
			}
			h1 {
				text-align: center;
			}
			p {
				text-align: center;
				font-size: 24px;
			}
			.sky {
				color: #00acec;
			}
		</style>
	</head>
	<body>
		<h1 id="title">沁园春·长沙</h1>
		<article id="cont">
			<p>独立寒秋，湘江北去，橘子洲头。</p>
			<p>看万山红遍，层林尽染；漫江碧透，百舸争流。</p>
			<p>鹰击长空，鱼翔浅底，万类霜天竞自由。</p>
			<p>怅寥廓，问苍茫大地，谁主沉浮？</p>
			<p>携来百侣曾游。忆往昔峥嵘岁月稠。</p>
			<p>恰同学少年，风华正茂；书生意气，挥斥方遒。</p>
			<p>指点江山，激扬文字，粪土当年万户侯。</p>
			<p>曾记否，到中流击水，浪遏飞舟？</p>
		</article>
		<script src="https://d3js.org/d3.v6.min.js"></script>
		<script>
			/*设置dom样式
			 *   style 内联样式
			 *   classed 增|删class
			 *   attr 设置属性，会覆盖以前的属性值
			 *       class
			 *       style
			 *       ……
			 * */
			/*选择标题元素*/
			const title = d3.select("#title");

			/*style() 方法设置标题颜色*/
			// title.style('color','#00acec')
			// title.style('font-size','48px')

			/*attr() 方法通过对style 属性的设置，改变标题颜色*/
			// title.attr('style','color:red')

			/*classed(class,true|false) 方法增删标题的class*/
			// title.classed('sky',true)
			// title.classed('sky',false)
			// title.classed('a',true)
			// title.classed('b',true)

			/*attr() 方法设置class属性*/
			// title.attr('class','sky')

			/*用style的回调函数，让所有p元素偶数行变蓝*/
			d3.selectAll("p").style("color", (ele, ind) =>
				ind % 2 ? "#00acec" : "#000"
			);

			/*用data数据绑定，动态设置p元素字体大小*/
			// const data=[12,14,16,18,24,28,32,38]
			const data = [12, 14, 16, 18, 24, 28, 32, 38, 48, 52];
			// const data=[12,14,16,18]
			d3.selectAll("p")
				.data(data)
				.style("font-size", (ele) => {
					console.log(ele);
					return ele + "px";
				});
		</script>
	</body>
</html>
```

### 设置元素属性

attr 设置普通的内置属性和自定义属性

property 设置特殊的内置属性

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>属性</title>
		<style>
			body {
				background-color: #faf5ea;
			}
			.question {
				padding: 30px;
				width: 60%;
				margin: auto;
			}
			.title {
				font-weight: bold;
				font-size: 18px;
			}
			.opt {
				display: block;
				line-height: 36px;
			}
		</style>
	</head>
	<body>
		<div class="question">
			<p class="title">《沁园春·长沙》里的诗句有哪些？</p>
			<label>
				<input type="checkbox" checked /> 独立寒秋，湘江北去，橘子洲头。
			</label>
			<label> <input type="checkbox" checked /> 看万山红遍，层林尽染； </label>
			<label> <input type="checkbox" checked /> 好好学习，天天向上。 </label>
		</div>

		<script src="https://d3js.org/d3.v6.min.js"></script>
		<script>
			/*设置dom属性
			 *   attr 设置普通的内置属性和自定义属性
			 *   property 设置特殊的内置属性
			 * */
			/*attr 为所有label元素添加class样式*/
			d3.selectAll("label").attr("class", "opt");

			/*用js取消复选框的选择
			 *   selectAll() 选择所有input元素
			 *   filter((ele,ind)=>{}) 基于元素索引位置过滤
			 *   property() 方法设置checked属性
			 * */
			d3.selectAll("input")
				.filter((ele, ind) => ind === 2)
				.property("checked", false);
			// .attr('checked',false)
		</script>
	</body>
</html>
```

### 设置元素

text 文本内容 html

html 内容

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>内容</title>
		<style>
			body {
				background-color: #faf5ea;
			}
			h1 {
				text-align: center;
			}
			p {
				text-align: center;
				font-size: 24px;
			}
		</style>
	</head>
	<body>
		<h1 id="title"></h1>
		<article id="cont"></article>
		<script src="https://d3js.org/d3.v6.min.js"></script>
		<script>
			/*设置dom内容
			 *   text 文本内容
			 *   html html内容
			 * */
			//标题元素
			const title = d3.select("#title");
			//内容元素
			const cont = d3.select("#cont");
			//标题内容
			const titleText = "沁园春·长沙";
			//标签文本
			const p = `
        <p>独立寒秋，湘江北去，橘子洲头。</p>
        <p>看万山红遍，层林尽染；漫江碧透，百舸争流。</p>
        <p>鹰击长空，鱼翔浅底，万类霜天竞自由。</p>
        <p>怅寥廓，问苍茫大地，谁主沉浮？</p>
        <p>携来百侣曾游。忆往昔峥嵘岁月稠。</p>
        <p>恰同学少年，风华正茂；书生意气，挥斥方遒。</p>
        <p>指点江山，激扬文字，粪土当年万户侯。</p>
        <p>曾记否，到中流击水，浪遏飞舟？</p>
    `;

			/*text设置标题的文本内容*/
			title.text(titleText);

			/*html设置元素的html内容*/
			cont.html(p);
			// cont.text(p)
		</script>
	</body>
</html>
```

### 内容增删元素

append 在当前选择集的最后追加指定名称的子元素

insert 前置元素，可声明在哪个元素前前置元素

data+join 以完全覆盖的方式添加元素

data+enter+append 以差值的方式添加元素

remove 删除元素

元素添加：

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>dom增删改查</title>
		<style>
			body {
				background-color: #faf5ea;
			}
			h1 {
				text-align: center;
			}
			p {
				text-align: center;
				font-size: 24px;
			}
		</style>
	</head>
	<body>
		<h1 id="title">沁园春·长沙</h1>
		<article id="cont"></article>
		<script src="https://d3js.org/d3.v6.min.js"></script>
		<script>
			const arr = [
				"作者：毛主席",
				"独立寒秋，湘江北去，橘子洲头。",
				"看万山红遍，层林尽染；漫江碧透，百舸争流。",
				"鹰击长空，鱼翔浅底，万类霜天竞自由。",
				"怅寥廓，问苍茫大地，谁主沉浮？",
				"携来百侣曾游。忆往昔峥嵘岁月稠。",
				"恰同学少年，风华正茂；书生意气，挥斥方遒。",
				"指点江山，激扬文字，粪土当年万户侯。",
				"曾记否，到中流击水，浪遏飞舟？",
			];
			//内容元素
			const cont = d3.select("#cont");

			/*添加DOM 元素
			 *   append 在当前选择集的最后追加指定名称的子元素
			 *   insert 前置元素，可声明在哪个元素前前置元素
			 *   data+join 以完全覆盖的方式添加元素
			 *   data+enter+append 以差值的方式添加元素
			 * */
			/*
			 * append()，向cont中添加p元素
			 * text()设置元素文本内容
			 * */
			cont
				.append("p")
				.text("独立寒秋，湘江北去，橘子洲头。------")
				.attr("id", "p1");

			/*insert(要添加的元素，在哪个元素之前添加)
			 * 在第一句的前面添加作者
			 * */
			cont.insert("p", "#p1").text("作者：毛主席");

			/*selectAll() 选择所有的p元素
			 * data() 绑定数据
			 * join() 基于数据添加p元素
			 * text(d=>d) 设置DOM元素内容为数据内容
			 * */
			/*cont.selectAll('p')
        .data(arr)
        .join('p')
        .text(ele=>ele)*/

			/*selectAll() 选择所有的p元素
			 * data() 绑定数据
			 * enter() 将数据和已有DOM元素做插值运算
			 * append() 基于插值结果添加p元素
			 * text(d=>d) 设置DOM元素内容为数据内容
			 * */
			cont
				.selectAll("p")
				.data(arr)
				.enter()
				.append("p")
				.text((ele) => ele);
		</script>
	</body>
</html>
```

元素删除

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>dom增删改查</title>
		<style>
			body {
				background-color: #faf5ea;
			}
			h1 {
				text-align: center;
			}
			p {
				text-align: center;
				font-size: 24px;
			}
		</style>
	</head>
	<body>
		<h1 id="title">沁园春·长沙</h1>
		<article id="cont">
			<p>天生我才必有用，不如自挂东南枝。</p>
			<p>独立寒秋，湘江北去，橘子洲头。</p>
			<p>看万山红遍，层林尽染；漫江碧透，百舸争流。</p>
			<p>鹰击长空，鱼翔浅底，万类霜天竞自由。</p>
			<p>怅寥廓，问苍茫大地，谁主沉浮？</p>
			<p>携来百侣曾游。忆往昔峥嵘岁月稠。</p>
			<p>恰同学少年，风华正茂；书生意气，挥斥方遒。</p>
			<p>指点江山，激扬文字，粪土当年万户侯。</p>
			<p>曾记否，到中流击水，浪遏飞舟？</p>
		</article>
		<script src="https://d3js.org/d3.v6.min.js"></script>
		<script>
			/*remove 删除元素*/
			/*select('p') 删除第一个p元素*/
			d3.select("p:nth-child(1)").remove();
		</script>
	</body>
</html>
```

### 入门使用例子

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>入门</title>
		<style>
			html,
			body {
				margin: 0;
				height: 100%;
			}
			#main {
				height: 100%;
				background-color: antiquewhite;
			}
		</style>
	</head>
	<body>
		<!--svg容器对象-div-->
		<div id="main"></div>
		<!--引入d3-->
		<script src="https://lib.baomitu.com/d3/6.2.0/d3.js"></script>
		<script>
			/*需求：
			 *   建立一个小球
			 *   鼠标划入时，变色
			 *   鼠标划出时，恢复原本颜色
			 * */

			/*select() 方法选择容器*/
			const main = d3.select("#main");
			console.log(main);

			/*向容器中添加svg*/
			const svg = main
				.append("svg")
				.attr("width", "100%")
				.attr("height", "100%");

			/*向svg中添加一个圆circle
			 *    attr() 属性设置
			 *       cx|cy 圆心位
			 *       r 半径
			 *       fill
			 *    style() 内联样式设置
			 *       cursor 光标形状
			 *           pointer 小手
			 * */
			const circle = svg
				.append("circle")
				.attr("r", 100)
				.attr("cx", 300)
				.attr("cy", 200);

			/*用on方法监听鼠标划入图形事件mouseover
			 *   attr 方法改变小球填充色fill
			 * */
			circle.on("mouseover", () => {
				circle.attr("fill", "#00acec");
			});

			/*用on方法监听鼠标划出图形事件mouseout
			 *   attr 方法改变小球填充色fill
			 * */
			circle.on("mouseout", () => {
				circle.attr("fill", "#000");
			});
		</script>
	</body>
</html>
```

## 使用 d3 操作 svg

理解 svg 的绘图原理

可以使用 svg 绘制基础图形

可以为 svg 图形添加样式

### 知识点综述

认识 svg

svg 图形

svg 样式

机器人案例

### 认识 svg

SVG 是一种 XML 语言，可以绘制矢量图形。

SVG 的优点是缩放不失真，实现了 DOM 接口，可以监听鼠标事件。

SVG 的缺点是不适合图形数量较大的场景，比如粒子特效。

### svg 绘图方式

从 svg 根元素开始开始绘图。

在 svg 中，通过不同的标签元素，绘制不同的图形元素。

在图形元素中，通过不同的属性设置其形状和样式。

```html
<svg
	version="1.1"
	baseProfile="full"
	width="300"
	height="200"
	xmlns="http://www.w3.org/2000/svg"
>
	<rect width="100%" height="100%" fill="red"></rect>
</svg>
```

### svg 图形

svg 中内置了很多现成的图形元素，可以让我们快速绘图，比如线段 line 、矩形 rect、圆形 circle、椭圆形 ellipse 等；

svg 中还有万能型的绘图元素—路径 path。

#### 图形绘制

rect 矩形

- x|y 矩形左上角点位置
- width|height 尺寸

circle 圆形

- cx|cy 圆心位置
- r 半径

path 路径

- d 路径形状，大写字母为绝对点位，小写字母为相对点位
  - 起点: M|m
    - 下一个点: L|l
    - 圆弧: A, a
    - 二次贝塞尔曲线: Q|q, T|t
    - 三次贝塞尔曲线(): C|c, S|s
  - 闭合路径(): Z|z

### svg 图形的着色区域有两种

描边区域： stroke 代表了描边样式，默认 none

填充区域： fill 代表了填充样式，默认 black

### 图形的着色方式有 3 种

纯色：#000, black, rgb(0,0,0), rgba(0,0,0,1)

渐变

- 线性渐变：linearGradient
- 径向渐变：radialGradient

纹理：pattern

### 机器人-用 d3 操作 svg

### 总结

咱们这一章主要说了 svg 基本用法，以及 d3 对 svg 的操作。下一章，我们会基于 svg，用 d3 绘制柱状图。

### 用 d3 修改机器人案例

将机器人的天线变成虚线

机器人的眼睛变色

机器人的嘴巴变成弧线

```html

```

## 使用 d3 操作 svg

理解 svg 的绘图原理

可以使用 svg 绘制基础图形

可以为 svg 图形添加样式

可以使用 d3 绘制 svg 图形

### 知识点综述

认识 svg

#### svg 绘图方式

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>svg绘图方式</title>
		<style>
			html {
				height: 100%;
			}
			body {
				height: 100%;
				margin: 0;
				display: flex;
				justify-content: center;
				align-items: center;
			}
			svg {
				background-color: antiquewhite;
			}
		</style>
	</head>
	<body>
		<!--
svg 根节点
    version svg版本
    xmlns 命名空间http://www.w3.org/2000/svg
    width|height svg画布尺寸，如400,400
    viewBox 视图框，总会在画布中完全显示，其中的图形会基于视图框的宽高按比例显示
rect 矩形，如 0 0 400 400
-->
		<svg
			version="1.2"
			xmlns="http://www.w3.org/2000/svg"
			width="800"
			height="800"
			viewBox="-200 -200 400 400"
		>
			<rect x="0" y="0" width="400" height="400"></rect>
			<circle r="100" fill="#00acec"></circle>
		</svg>
	</body>
</html>
```

#### svg 图形

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>svg图形</title>
		<style>
			html {
				height: 100%;
			}
			body {
				height: 100%;
				margin: 0;
			}
			svg {
				background-color: antiquewhite;
			}
		</style>
	</head>
	<body>
		<!--
svg 根节点
    version svg版本
    width|height svg画布尺寸
    xmlns 命名空间http://www.w3.org/2000/svg
-->
		<svg
			version="1.2"
			xmlns="http://www.w3.org/2000/svg"
			width="100%"
			height="100%"
		>
			<!--
        rect 矩形
            x|y 矩形左上角点位置
            width|height 尺寸
    -->
			<!--<rect x="100"
          y="50"
          width="100"
          height="50"
          fill="#00acec"
    ></rect>-->

			<!--
        circle 圆形
            cx|cy 圆心位置
            r 半径
    -->
			<!--<circle cx="200"
            cy="100"
            r="80"
    ></circle>-->

			<!--path 路径
        d 路径形状，大写字母为绝对点位，小写字母为相对点位
        起点: M|m
        下一个点: L|l
        圆弧: A, a
        二次贝塞尔曲线: Q|q, T|t
        三次贝塞尔曲线(): C|c, S|s
        闭合路径(): Z|z
        -->

			<!--直线L|l x,y，如 M 300 300 L 500 300-->
			<!--<path d="
            M
            300 300
            L
            500 300
            500 600
            Z
    "
          stroke="#000"
          fill="none"
          stroke-dasharray="10"
          stroke-width="5"
    ></path>-->

			<!--圆弧A|a，如 M 300 300 A 150 200 0 0 0 500 300
            rx ry 半径
            x-axis-rotation x轴方向 [0,360]
            large-arc-flag 是否显示最大弧 0|1
            sweep-flag 弧在哪一侧 0|1
            x y 结束点
    -->
			<!--<path d="
            M
            300 300
            L
            500 300
    "
          stroke="#000"
          fill="none"
          stroke-dasharray="5"
          stroke-width="2"
    ></path>
    <path d="
            M
            300 300
            A
            150 200
            30
            1
            0
            500 300
    "
          stroke="#000"
          fill="none"
          stroke-width="2"
    ></path>-->

			<!--二次贝塞尔曲线 Q|q，如M 100 400 Q 200 100 300 400
            cpx1 cpy1 控制点
            x y 结束点
    -->
			<!--<path d="
            M
            100 400
            L
            200 100
            300 400
    "
          stroke="#000"
          fill="none"
          stroke-dasharray="5"
          stroke-width="2"
    ></path>
    <path d="
            M
            100 400
            Q
            200 100
            300 400
    "
          stroke="#000"
          fill="none"
          stroke-width="2"
    ></path>-->

			<!--二次贝塞尔曲线的延续 T|t，如T 500 400
            x y 结束点
            x y 结束点
            ……
    -->
			<!--<path d="
            M
            100 400
            L
            200 100
            300 400
            500 400
    "
          stroke="#000"
          fill="none"
          stroke-dasharray="5"
          stroke-width="2"
    ></path>
    <path d="
            M
            100 400
            Q
            200 100
            300 400
            T
            500 400
            700 400
    "
          stroke="#000"
          fill="none"
          stroke-width="2"
    ></path>-->

			<!--三次贝塞尔曲线 C|c，如 M 100 400 C 200 400 200 200 300 200
            cpx1 cpy1 控制点1
            cpx2 cpy2 控制点2
            x y 结束点
    -->
			<!--<path d="
            M
            100 400
            L
            200 400
            200 200
            300 200
    "
          stroke="#000"
          fill="none"
          stroke-dasharray="5"
          stroke-width="2"
    ></path>
    <path d="
            M
            100 400
            C
            200 400
            200 200
            300 200
    "
          stroke="#000"
          fill="none"
          stroke-width="2"
    ></path>-->

			<!--三次贝塞尔曲线的延续 S|s，如 S 400 400 500 400
            cpx2 cpy2 控制点2
            x y 结束点
    -->
			<!--<path d="
            M
            100 400
            L
            200 400
            200 200
            300 200
            400 400
            500 400
    "
          stroke="#000"
          fill="none"
          stroke-dasharray="5"
          stroke-width="2"
    ></path>
    <path d="
            M
            100 400
            C
            200 400
            200 200
            300 200
            S
            400 400
            500 400
            600 200
            700 200
    "
          stroke="#000"
          fill="none"
          stroke-width="2"
    ></path>-->

			<!--图形容器 g-->
			<g stroke="#000" fill="none" stroke-width="2">
				<path
					d="
            M
            100 400
            L
            200 400
            200 200
            300 200
            400 400
            500 400
    "
					stroke-dasharray="5"
				></path>
				<path
					d="
            M
            100 400
            C
            200 400
            200 200
            300 200
            S
            400 400
            500 400
            600 200
            700 200
    "
				></path>
			</g>
		</svg>
	</body>
</html>
```

#### svg 样式

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>svg样式</title>
		<style>
			html {
				height: 100%;
			}
			body {
				height: 100%;
				margin: 0;
			}
			svg {
				background-color: antiquewhite;
			}
		</style>
	</head>
	<body>
		<!--
svg 根节点
    version svg版本
    width|height svg画布尺寸
    xmlns 命名空间http://www.w3.org/2000/svg
-->
		<svg
			version="1.2"
			xmlns="http://www.w3.org/2000/svg"
			width="100%"
			height="100%"
		>
			<!--着色区域
        fill 填充区域，默认black
        stroke 描边区域，默认none
    -->
			<!--<circle cx="300" cy="300" r="200" fill="#00acec"/>-->
			<!--<circle cx="300" cy="300" r="200" stroke="#00acec" fill="none" stroke-width="10"/>-->

			<!--着色方式
            纯色
            渐变色
                线性渐变
                径向渐变
            纹理
    -->
			<!--纯色 #000, black, rgb(0,0,0), rgba(0,0,0,1)-->
			<!--<circle cx="300" cy="300" r="200" fill="#000"/>-->
			<!--<circle cx="300" cy="300" r="200" fill="black"/>-->
			<!--<circle cx="300" cy="300" r="200" fill="rgb(0,0,0)"/>-->
			<!--<circle cx="300" cy="300" r="200" fill="rgba(0,0,0,1)"/>-->

			<!--linearGradient 线性渐变
            gradientTransform 渐变变换 https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function
                rotate(a) 旋转[0,360]
                translate(x,y) 移动
                scale(sx,sy) 缩放
        stop 颜色节点
            offset 偏移量[0,1]
            stop-color 颜色
        渐变色的赋值 url(id)
    -->
			<!--<linearGradient id="lg" gradientTransform="
        rotate(30)
    ">
        <stop offset="0" stop-color="#00acec"></stop>
        <stop offset="0.5" stop-color="yellow"></stop>
        <stop offset="1" stop-color="blue"></stop>
    </linearGradient>
    <circle cx="300" cy="300" r="200" fill="url(#lg)"/>-->

			<!--radialGradient 径向渐变
            stop 颜色节点
                offset 偏移量[0,1]
                stop-color 颜色
    -->
			<!--<radialGradient id="rg">
        <stop offset="0" stop-color="#00acec"></stop>
        <stop offset="0.5" stop-color="yellow"></stop>
        <stop offset="1" stop-color="red"></stop>
    </radialGradient>
    <circle cx="300" cy="300" r="200" fill="url(#rg)"/>-->

			<!--pattern 纹理着色
            id
            viewBox 视图框
            width height 纹理元素的尺寸，建议使用百分百
        polygon 多边形
            points 点位，如 0,0 20,50 0,100 50,80 100,100 80,50 100,0 50,20
        image
            href 图片地址
            x|y 位置
            widht|height 宽高
    -->
			<polygon
				points="0,0 20,50 0,100 50,80 100,100 80,50 100,0 50,20"
			></polygon>

			<!--<pattern id="pt"
             width="10%"
             height="10%"
             viewBox="0 0 100 100"
    >
        <polygon points="0,0 20,50 0,100 50,80 100,100 80,50 100,0 50,20"></polygon>
    </pattern>-->
			<pattern id="pt" width="50%" height="50%" viewBox="0 0 100 100">
				<image href="./images/rose.jpg" width="100" height="100"></image>
			</pattern>
			<circle cx="300" cy="300" r="200" fill="url(#pt)" />
		</svg>
	</body>
</html>
```

#### 机器人案例

```html
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>机器人-svg</title>
		<style>
			html {
				height: 100%;
			}
			body {
				height: 100%;
				margin: 0;
			}
			svg {
				background-color: antiquewhite;
			}
		</style>
	</head>
	<body>
		<svg
			version="1.2"
			xmlns="http://www.w3.org/2000/svg"
			width="100%"
			height="100%"
			viewBox="-400 -400 800 800"
		>
			<!--面部填充 rect
            x|y 位置
            width|height 尺寸
            fill 填充色
    -->
			<rect
				x="-200"
				y="0"
				width="400"
				height="200"
				fill="red"
				stroke="#000"
				stroke-width="40"
			></rect>

			<!--面部描边 rect
            fill 填充色，none为无色
            stroke 描边色
            stroke-width 线宽
    -->
			<!--<rect x="-200"
          y="0"
          width="400"
          height="200"
          fill="none"
          stroke="#000"
          stroke-width="40"
    ></rect>-->

			<!--眼罩 rect-->
			<rect x="-200" y="50" width="400" height="60" fill="antiquewhite"></rect>

			<!--嘴巴 path
            d 路径
                M 起点
                L 下一个点
    -->
			<path
				d="
            M
            -100 150
            L
            100 150
    "
				fill="none"
				stroke="#000"
				stroke-width="40"
			></path>

			<!--左眼睛 circle
            cx|cy 圆心位
            r 半径
    -->
			<circle r="20" cx="-100" cy="80" fill="red"></circle>

			<!--右眼睛 path
            d 路径
                M 起点
                A 圆弧
                    rx ry 半径
                    x-axis-rotation x轴方向
                    large-arc-flag 是否显示最大弧
                    sweep-flag 弧在哪一侧
                    x y 结束点
    -->
			<path
				d="
            M
            80 90
            A
            20 20
            0
            0
            1
            120 90
    "
				fill="red"
			></path>

			<!--天线 path
            d 路径
                C 三次贝塞尔
                    cpx1 cpy1 控制点1
                    cpx2 cpy2 控制点2
                    x y 结束点
                S 三次贝塞尔曲线的延续
                    cpx2 cpy2 控制点2
                    x y 结束点
    -->
			<path
				d="
            M
            -200 -200
            C
            -100 -200
            -100 0
            0 0
            S
            100 -200
            200 -200
    "
				fill="none"
				stroke="#000"
				stroke-width="40"
			></path>
		</svg>
	</body>
</html>
```

#### 机器人 D3

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>机器人-d3</title>
		<style>
			html {
				height: 100%;
			}
			body {
				height: 100%;
				margin: 0;
			}
			#main {
				width: 100%;
				height: 100%;
				background-color: antiquewhite;
			}
		</style>
	</head>
	<body>
		<div id="main"></div>
		<script src="https://d3js.org/d3.v6.min.js"></script>
		<script>
			/*获取main 容器*/
			const main = d3.select("#main");

			/*在main容器中建立svg，并设置其相关属性*/
			/*const svg=main.append('svg')
        .attr('version','1.2')
        .attr('xmlns','http://www.w3.org/2000/svg')
        .attr('width','100%')
        .attr('height','100%')
        .attr('viewBox','-400 -400 800 800')*/

			const svg = Draw(main)("svg", {
				version: "1.2",
				xmlns: "http://www.w3.org/2000/svg",
				width: "100%",
				height: "100%",
				viewBox: "-400 -400 800 800",
			});

			/*建立绘图函数Draw，以dom容器为参，返回绘图方法
			 *   绘图方法以图形shape和配置项option为参
			 *       用append方法向容器中添加图形obj
			 *       用for……of……的方法，遍历Object.entries(配置项)的键值对
			 *       用attr方法设置图形obj的属性
			 *       返回图形obj
			 * */
			function Draw(dom) {
				return function (shape, option) {
					const obj = dom.append(shape);
					for (let [key, val] of Object.entries(option)) {
						obj.attr(key, val);
					}
					return obj;
				};
			}

			/*建立以svg为容器的绘图方法draw*/
			const draw = Draw(svg);

			/*绘制图形……*/
			draw("rect", {
				x: -200,
				y: 0,
				width: 400,
				height: 200,
				fill: "red",
				stroke: "#000",
				"stroke-width": 40,
			});

			draw("rect", {
				x: -200,
				y: 50,
				width: 400,
				height: 60,
				fill: "antiquewhite",
			});

			draw("path", {
				d: `
            M
            -100 150
            L
            100 150
        `,
				fill: "none",
				stroke: "#000",
				"stroke-width": 40,
			});

			draw("circle", {
				r: 20,
				cx: -100,
				cy: 80,
				fill: "red",
			});

			draw("path", {
				d: `
            M
            80 90
            A
            20 20
            0
            0
            1
            120 90
        `,
				fill: "red",
			});

			draw("path", {
				d: `
            M
            -200 -200
            C
            -100 -200
            -100 0
            0 0
            S
            100 -200
            200 -200
        `,
				fill: "none",
				stroke: "#000",
				"stroke-width": 40,
			});
		</script>
	</body>
</html>
```

### d3 特点

声明式编程

数据的动态绑定

DOM 节点的智能添加

### 声明式编程

我们的编程方式有两种：

- 命令式：命令机器如何做事。
- 声明式：告诉机器我想要什么结果。

使用 js 直接操作 DOM，就是命令式编程，这样的操作会比较繁琐。

例如，更改标题的文本颜色：

```js
const h2s = document.getElementsByTagName("h2");
for (let i = 0; i < h2s.length; i++) {
	const h2 = h2s.item(i);
	h2.style.setProperty("color", "blue");
}
```

D3 采用的是声明式编程，它可以一步实现上面的效果：

```js
d3.selectAll("h2").style("color", "blue");
```

### 数据的动态绑定

D3 可以使用回调函数动态设置节点的属性。

随机改变标题的颜色：

```js
d3.selectAll("p").style("color", function () {
	return "hsl(" + Math.random() * 360 + ",100%,50%)";
});
```

从回调函数中获取节点索引，基于节点索引的奇偶性设置节点颜色：

```js
d3.selectAll("p").style("color", function (d, i) {
	return i % 2 ? "blue" : "green";
});
```

将数组中的数据绑定到节点：

```js
d3.selectAll('p’)
   .data([40, 60, 80, 90])
   .style('font-size', function(d) { return `${d}px`; });
```

### dom 元素的动态添加

selection.data：为 dom 元素绑定数据

selection.join：基于 data 数据更新 dom 结构

如：

```js
const data = ["恰同学少年", "风华正茂", "书生意气", "挥斥方遒"];
d3.select("#main")
	.selectAll("p")
	.data(data)
	.join("p")
	.text((d) => d);
```

### 如何学习 D3

1.官方 api、文档太多，无从下手。

2.对不具备一定图形基础的同学而言，官方 api、文档的中文翻译晦涩难懂，难以入门。

3.d3 版本更新到 v6 之后，与过去版本差异较大，且没有向下兼容。而当前市场上的书籍和博客大多都过于老旧，用 v6 运行，往往会报错，初学者往往难以解决这种错误。

#### 学习方法

我们在查询官方文档时，其中的一些名称解释，可能会让大家犯晕。所以，大家不要刻意理解官方文档的字面意思，要将其代入实际案例中理解，并尝试揣摩 d3 作者的意图。

#### 修改机器人案例

将机器人的天线变成虚线

机器人的眼睛变色

机器人的嘴巴变成弧线

## 柱状图

熟练的使用 d3 绘制基础图表

掌握 d3 中比例尺的用法

可以用 d3 为图形添加鼠标交互事件和动画

### 知识点综述

### 坐标轴

坐标轴的绘制需要比例尺。

d3 中的比例尺可以让我们自己建立一个坐标轴，并且可以将图表点位解析为像素点位。

比例尺类型：

- scaleBand 分段比例尺，适用于类目轴
- scaleLinear 线性比例尺，适用于数值轴

更多：

坐标轴生成器：

- axisBottom 刻度朝下的坐标轴生成器
- axisLeft 刻度朝左的坐标轴生成器

更多：

01-比例尺-x 轴.html

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>x轴</title>
		<style>
			* {
				box-sizing: border-box;
			}
			#main {
				margin: 20px;
				width: 600px;
				height: 600px;
				border: 1px solid #ddd;
			}
		</style>
	</head>
	<body>
		<div id="main"></div>
		<script src="https://d3js.org/d3.v6.js"></script>
		<script>
			/*===========1-必备数据===========*/
			/*categories 类目数据*/
			const categories = ["html", "css", "js"];

			/*===========2-建立容器对象===========*/
			/*获取main 容器*/
			const main = d3.select("#main");

			/*声明绘图框尺寸
        width 宽度，600
        height 高度，600
    */
			const [width, height] = [600, 600];

			/*建立svg 对象
			 *   svg 画布尺寸100%充满容器对象
			 *   绘图框尺寸按照600设置
			 * */
			const svg = main
				.append("svg")
				.attr("version", 1.2)
				.attr("xmlns", "http://www.w3.org/2000/svg")
				.attr("width", "100%")
				.attr("height", "100%")
				.attr("viewBox", `0 0 ${width} ${height}`);

			/*===========3-建立基础数据===========*/
			/*计算类目数量 len*/
			const len = categories.length;

			/*用range()方法，基于类目数量，获取x轴的在图表坐标系中的数据 xChartData，如[0,1,2]*/
			const xChartData = d3.range(len);
			console.log(xChartData);

			/*x轴在像素坐标内的起始点和结束点 xPixelRange，左右各偏移50*/
			const xPixelRange = [50, width - 50];

			/*===========4-建立x 轴比例尺 xScale===========*/
			/*
			 * 用scaleBand()方法建立分段比例尺 xScale
			 * 用domain()方法在比例尺中写入图表数据xChartData
			 * 用rangeRound()方法在比例尺中写入像素数据，即像素的起始位和结束位xPixelRange
			 * */
			const xScale = d3.scaleBand().domain(xChartData).rangeRound(xPixelRange);

			/*===========5-建立x 轴对象===========*/
			/*基于比例尺xScale，用axisBottom()方法创建刻度朝下的坐标轴生成器 xAxisGenerator*/
			const xAxisGenerator = d3.axisBottom(xScale);

			/*利用坐标轴生成器绘制坐标轴
			 *   在svg中append 加入g 对象
			 *   用attr() 方法设置transform 属性中的translate位置
			 *   用call()方法调用xAxisGenerator轴生成器，生成坐标轴
			 *   用selectAll()方法选择所有的text文本
			 *   用text()方法将图表数据设置为类目数据
			 *   用style()方法设置字体大小
			 * */
			svg
				.append("g")
				.attr("transform", `translate(0 ${height - 50})`)
				.call(xAxisGenerator)
				.selectAll("text")
				.text((ele, ind) => categories[ind])
				.style("font-size", "12px");
		</script>
	</body>
</html>
```

02-比例尺-y 轴.html

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>y轴</title>
		<style>
			* {
				box-sizing: border-box;
			}
			#main {
				margin: 20px;
				width: 600px;
				height: 600px;
				border: 1px solid #ddd;
			}
		</style>
	</head>
	<body>
		<div id="main"></div>
		<script src="https://d3js.org/d3.v6.js"></script>
		<script>
			/*===========1-必备数据===========*/
			/*数据源source：两个系列的数据*/
			const source = [
				//html css js
				[30, 20, 40], //学习人数
				[40, 30, 50], //就业人数
			];

			/*===========1-建立容器对象===========*/
			/*获取main 容器*/
			const main = d3.select("#main");

			/*声明绘图框尺寸
        width 宽度，600
        height 高度，600
    */
			const width = 600;
			const height = 600;

			/*建立svg 对象
			 *   svg 画布尺寸100%充满容器对象
			 *   绘图框尺寸按照600设置
			 * */
			const svg = main
				.append("svg")
				.attr("version", 1.2)
				.attr("xmlns", "http://www.w3.org/2000/svg")
				.attr("width", "100%")
				.attr("height", "100%")
				.attr("viewBox", `0 0 ${width} ${height}`);

			/*===========3-建立基础数据===========*/
			/*计算数据源中所有数据的极值 maxY
			 *   用js原生方法flat()展开数据源，再通过max()方法取极值
			 * */
			const maxY = Math.max(...source.flat());
			// console.log(maxY);

			/*声明y轴在图表坐标系中的数据起点和结束点 yChartRange*/
			const yChartRange = [0, maxY];

			/*声明y轴在像素坐标系中的数据起点和结束点 yPixelRange*/
			const yPixelRange = [height - 50, 50];

			/*===========4-建立y 轴比例尺 yScale===========*/
			/*
			 * 用scaleLinear()方法建立线性比例尺 yScale
			 * 用domain()方法在比例尺中写入图表数据yChartRange
			 * range()方法在比例尺中写入像素数据，即像素的起始位和结束位yPixelRange
			 * */
			const yScale = d3.scaleLinear().domain(yChartRange).range(yPixelRange);

			/*===========5-建立y 轴对象===========*/
			/*基于比例尺yScale，用axisLeft()方法创建刻度朝左的坐标轴生成器 yAxisGenerator*/
			const yAxisGenerator = d3.axisLeft(yScale);

			/*利用坐标轴生成器生成坐标轴
			 *   在svg中append 加入g 对象
			 *   用attr()方法设置transform 属性中的translate位置
			 *   用call()方法调用xAxisGenerator轴生成器，生成坐标轴
			 *   用style()方法设置字体大小
			 * */
			svg
				.append("g")
				.attr("transform", "translate(50 0)")
				.call(yAxisGenerator)
				.selectAll("text")
				.attr("font-size", "12px");
		</script>
	</body>
</html>
```

### 绘图区

#### 建立绘图区的基本步骤

- 建立绘图区相关的基础数据
- 架构绘图区的 DOM 结构
- 设置每个柱状体的 x、y 位置和 width、height 尺寸

例子

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>绘图区</title>
		<style>
			* {
				box-sizing: border-box;
			}
			#main {
				margin: 20px;
				width: 600px;
				height: 600px;
				border: 1px solid #ddd;
			}
			.item {
				cursor: pointer;
			}
			.item:hover {
				opacity: 0.9;
			}
		</style>
	</head>
	<body>
		<div id="main"></div>
		<script src="https://d3js.org/d3.v6.js"></script>
		<script>
			/*===========1-必备数据===========*/
			/*categories 类目信息*/
			const categories = ["html", "css", "js"];
			/*数据源source：两个系列的数据*/
			const source = [
				//html css js
				[30, 20, 40], //学习人数
				[40, 30, 50], //就业人数
			];
			/*调色盘*/
			const color = [
				"#c23531",
				"#2f4554",
				"#61a0a8",
				"#d48265",
				"#91c7ae",
				"#749f83",
				"#ca8622",
				"#bda29a",
				"#6e7074",
				"#546570",
				"#c4ccd3",
			];

			/*===========2-建立容器对象===========*/
			/*获取main 容器*/
			const main = d3.select("#main");

			/*声明绘图框尺寸
        width 宽度，600
        height 高度，600
    */
			const width = 600;
			const height = 600;

			/*建立svg 对象
			 *   svg 画布尺寸100%充满容器对象
			 *   绘图框尺寸按照600设置
			 * */
			const svg = main
				.append("svg")
				.attr("version", 1.2)
				.attr("xmlns", "http://www.w3.org/2000/svg")
				.attr("width", "100%")
				.attr("height", "100%")
				.attr("viewBox", `0 0 ${width} ${height}`);

			/*===========3-建立轴相关的基础数据===========*/
			/*-----x轴相关的基础数据-----*/
			/*计算类目数量 len*/
			const len = categories.length;

			/*用range()方法，基于类目数量，获取x轴的在图表坐标系中的数据 xChartData，如[0,1,2]*/
			const xChartData = d3.range(len);

			/*x轴在像素坐标内的起始点和结束点 xPixelRange，左右各偏移50*/
			const xPixelRange = [50, width - 50];

			/*-----y轴相关的基础数据-----*/
			/*计算数据源中所有数据的极值 maxY
			 *   用js原生方法flat()展开数据源，再通过max()方法取极值
			 * */
			const maxY = Math.max(...source.flat());

			/*声明y轴在图表坐标系中的数据起点和结束点 yChartRange*/
			const yChartRange = [0, maxY];

			/*声明y轴在像素坐标系中的数据起点和结束点 yPixelRange*/
			const yPixelRange = [height - 50, 50];

			/*===========4-建立比例尺===========*/
			/*-----x 轴比例尺 xScale-----*/
			/*
			 * 用scaleBand()方法建立分段比例尺 xScale
			 * 用domain()方法在比例尺中写入图表数据xChartData
			 * 用rangeRound()方法在比例尺中写入像素数据，即像素的起始位和结束位xPixelRange
			 * 用padding()方法设置类目的内边距，百分比单位，如0.1
			 * */
			const xScale = d3
				.scaleBand()
				.domain(xChartData)
				.rangeRound(xPixelRange)
				.padding(0.1);

			/*-----y 轴比例尺 xScale-----*/
			/*
			 * 用scaleLinear()方法建立线性比例尺 yScale
			 * 用domain()方法在比例尺中写入图表数据yChartRange
			 * range()方法在比例尺中写入像素数据，即像素的起始位和结束位yPixelRange
			 * */
			const yScale = d3.scaleLinear().domain(yChartRange).range(yPixelRange);

			/*===========5-建立轴对象===========*/
			/*-----x轴对象-----*/
			/*基于比例尺xScale，用axisBottom()方法创建刻度朝下的坐标轴生成器 xAxisGenerator*/
			const xAxisGenerator = d3.axisBottom(xScale);

			/*利用坐标轴生成器绘制坐标轴
			 *   在svg中append 加入g 对象
			 *   用transform 属性中的translateY 设置x轴的y位置
			 *   用call()方法调用xAxisGenerator轴生成器，生成坐标轴
			 *   用selectAll()方法选择所有的text文本
			 *   用text()方法将图表数据设置为类目数据
			 *   用attr()方法设置字体大小
			 * */
			svg
				.append("g")
				.attr("transform", `translate(0, ${height - 50})`)
				.call(xAxisGenerator)
				.selectAll("text")
				.text((n) => categories[n])
				.attr("font-size", "12px");

			/*-----y轴对象-----*/
			/*基于比例尺yScale，用axisLeft()方法创建刻度朝左的坐标轴生成器 yAxisGenerator*/
			const yAxisGenerator = d3.axisLeft(yScale);

			/*利用坐标轴生成器生成坐标轴
			 *   在svg中append 加入g 对象
			 *   用transform 属性中的translate设置y轴的x位置
			 *   用call()方法调用xAxisGenerator轴生成器，生成坐标轴
			 *   用attr()方法设置字体大小
			 * */
			svg
				.append("g")
				.attr("transform", "translate(50 0)")
				.call(yAxisGenerator)
				.attr("font-size", "12px");

			/*===========6-建立绘图区相关的基础数据===========*/
			/*-----绘图区相关的基础数据-----*/
			/*用x轴比例尺xScale的bandwidth()方法获取x轴上一个类目的像素宽xBandW*/
			const xBandW = xScale.bandwidth();

			/*获取系列的数量n*/
			const n = source.length;

			/*用类目宽除以系列数，得到一个类目中每个系列元素的宽，即列宽colW*/
			const colW = xBandW / n;
			console.log(colW);

			/*计算调色盘颜色数量colorLen*/
			const colorLen = color.length;

			/*===========7-架构绘图区===========*/
			/*在svg中建立系列集合seriesObjs，在系列集合中建立系列对象
			 *   在svg中append 加入g 对象
			 *   selectAll() 选择所有g元素，此处重点不在选择，而是建立一个选择集对象
			 *   用data() 方法将具备系列信息的数据源source绑定到系列集合中
			 *   用join() 基于数据源批量创建g元素，一个g代表一个系列，之后每个g元素里都会放入三个不同类目的柱状体
			 *   用transform 属性中的translate设置系列的x像素位——列宽乘以系列索引
			 *   基于系列索引，从调色盘中取色，然后将其作为一个系列中所有图形的填充色
			 * */
			const seriesObjs = svg
				.append("g")
				.selectAll("g")
				.data(source)
				.join("g")
				.attr(
					"transform",
					(seriesData, seriesInd) => `translate(${seriesInd * colW} 0)`
				)
				.attr("fill", (seriesData, seriesInd) => color[seriesInd % colorLen]);

			/*在系列集合中建立柱状体集合rects
			 *   用系列集合seriesObjs 的selectAll()方法选择所有的rect元素，用于建立选择集对象
			 *   用data()方法将之前绑定在每个系列集合中的数据绑定到柱状体集合中
			 *   用join()基于每个系列的数据数据批量创建rect元素
			 *   用classed() 方法为其添加item属性
			 * */
			const rects = seriesObjs
				.selectAll("rect")
				.data((seriesData) => seriesData)
				.join("rect")
				.classed("item", true);

			/*=8-用attr()方法设置每个柱状体的x、y位置和width、height 尺寸=*/
			/*
			 * 设置柱状体的x像素位
			 *   从回调参数中获取柱状体在当前系列中的索引rectInd,系列索引 seriesInd
			 *   基于柱状体在当前系列中的索引rectInd，用x轴比例尺xScale()获取柱状体在当前系列中的x像素位
			 * 设置柱状体像素宽width为列宽colW
			 * 设置柱状体的y像素位
			 *   从回调参数中解构柱状体数据rectData
			 *   基于柱状体数据rectData，用y轴比例尺yScale()获取柱状体的y像素位
			 * 设置柱状体的像素像素高
			 *   从回调参数中解构柱状体数据rectData
			 *   让y轴上刻度为0的像素位，减去刻度为柱状图实际数据的像素位，即为柱状图的像素高
			 * */
			rects
				.attr("x", (rectData, rectInd) => xScale(rectInd))
				.attr("width", colW)
				.attr("y", (rectData) => yScale(rectData))
				.attr("height", (rectData) => yScale(0) - yScale(rectData));
		</script>
	</body>
</html>
```

### 鼠标事件

使用 on 方法可以为 selector 对象添加鼠标事件，如鼠标划上 mouseover、鼠标移动 mousemove、鼠标划出 mouseout

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>鼠标事件</title>
		<style>
			* {
				box-sizing: border-box;
			}
			#main {
				margin: 20px;
				width: 600px;
				height: 600px;
				border: 1px solid #ddd;
			}
			.item {
				cursor: pointer;
			}
			.item:hover {
				opacity: 0.9;
			}
			#tip {
				position: absolute;
				margin-left: 10px;
				margin-top: 30px;
				line-height: 22px;
				background-color: rgba(0, 0, 0, 0.6);
				padding: 4px 9px;
				font-size: 13px;
				color: #fff;
				border-radius: 3px;
				pointer-events: none;
				display: none;
			}
		</style>
	</head>
	<body>
		<div id="main"></div>
		<script src="https://d3js.org/d3.v6.js"></script>
		<script>
			/*===========1-必备数据===========*/
			/*categories 类目信息*/
			const categories = ["html", "css", "js"];
			/*dimensions 维度信息*/
			const dimensions = ["学习人数", "就业人数"];
			/*数据源source：两个系列的数据*/
			const source = [
				//html css js
				[30, 20, 40], //学习人数
				[40, 30, 50], //就业人数
			];
			/*调色盘*/
			const color = [
				"#c23531",
				"#2f4554",
				"#61a0a8",
				"#d48265",
				"#91c7ae",
				"#749f83",
				"#ca8622",
				"#bda29a",
				"#6e7074",
				"#546570",
				"#c4ccd3",
			];

			/*优化数据源
			 *   使用map方法遍历数据源
			 *   将其中的数据变成对象：
			 *   {
			 *       rectData:柱状体数据,
			 *       rectInd:柱状体索引,
			 *       rectName:柱状体名称,
			 *       seriesInd:系列索引,
			 *       seriesName:系列名称
			 *    }
			 * */
			const source2 = source.map((seriesData, seriesInd) => {
				const seriesName = dimensions[seriesInd];
				return seriesData.map((rectData, rectInd) => {
					const rectName = categories[rectInd];
					return { rectData, rectInd, rectName, seriesData, seriesName };
				});
			});

			console.log(source2);

			/*===========2-建立容器对象===========*/
			/*获取main 容器*/
			const main = d3.select("#main");

			/*声明绘图框尺寸
        width 宽度，600
        height 高度，600
    */
			const width = 600;
			const height = 600;

			/*建立svg 对象
			 *   svg 画布尺寸100%充满容器对象
			 *   绘图框尺寸按照600设置
			 * */
			const svg = main
				.append("svg")
				.attr("version", 1.2)
				.attr("xmlns", "http://www.w3.org/2000/svg")
				.attr("width", "100%")
				.attr("height", "100%")
				.attr("viewBox", `0 0 ${width} ${height}`);

			/*===========3-建立轴相关的基础数据===========*/
			/*-----x轴相关的基础数据-----*/
			/*计算类目数量 len*/
			const len = categories.length;

			/*用range()方法，基于类目数量，获取x轴的在图表坐标系中的数据 xChartData，如[0,1,2]*/
			const xChartData = d3.range(len);

			/*x轴在像素坐标内的起始点和结束点 xPixelRange，左右各偏移50*/
			const xPixelRange = [50, width - 50];

			/*-----y轴相关的基础数据-----*/
			/*计算数据源中所有数据的极值 maxY
			 *   用js原生方法flat()展开数据源，再通过max()方法取极值
			 * */
			const maxY = Math.max(...source.flat());

			/*声明y轴在图表坐标系中的数据起点和结束点 yChartRange*/
			const yChartRange = [0, maxY];

			/*声明y轴在像素坐标系中的数据起点和结束点 yPixelRange*/
			const yPixelRange = [height - 50, 50];

			/*===========4-建立比例尺===========*/
			/*-----x 轴比例尺 xScale-----*/
			/*
			 * 用scaleBand()方法建立分段比例尺 xScale
			 * 用domain()方法在比例尺中写入图表数据xChartData
			 * 用rangeRound()方法在比例尺中写入像素数据，即像素的起始位和结束位xPixelRange
			 * 用padding()方法设置类目的内边距，百分比单位，如0.1
			 * */
			const xScale = d3
				.scaleBand()
				.domain(xChartData)
				.rangeRound(xPixelRange)
				.padding(0.1);

			/*-----y 轴比例尺 xScale-----*/
			/*
			 * 用scaleLinear()方法建立线性比例尺 yScale
			 * 用domain()方法在比例尺中写入图表数据yChartRange
			 * range()方法在比例尺中写入像素数据，即像素的起始位和结束位yPixelRange
			 * */
			const yScale = d3.scaleLinear().domain(yChartRange).range(yPixelRange);

			/*===========5-建立轴对象===========*/
			/*-----x轴对象-----*/
			/*基于比例尺xScale，用axisBottom()方法创建刻度朝下的坐标轴生成器 xAxisGenerator*/
			const xAxisGenerator = d3.axisBottom(xScale);

			/*利用坐标轴生成器绘制坐标轴
			 *   在svg中append 加入g 对象
			 *   用transform 属性中的translateY 设置x轴的y位置
			 *   用call()方法调用xAxisGenerator轴生成器，生成坐标轴
			 *   用selectAll()方法选择所有的text文本
			 *   用text()方法将图表数据设置为类目数据
			 *   用attr()方法设置字体大小
			 * */
			svg
				.append("g")
				.attr("transform", `translate(0, ${height - 50})`)
				.call(xAxisGenerator)
				.selectAll("text")
				.text((n) => categories[n])
				.attr("font-size", "12px");

			/*-----y轴对象-----*/
			/*基于比例尺yScale，用axisLeft()方法创建刻度朝左的坐标轴生成器 yAxisGenerator*/
			const yAxisGenerator = d3.axisLeft(yScale);

			/*利用坐标轴生成器生成坐标轴
			 *   在svg中append 加入g 对象
			 *   用transform 属性中的translate设置y轴的x位置
			 *   用call()方法调用xAxisGenerator轴生成器，生成坐标轴
			 *   用attr()方法设置字体大小
			 * */
			svg
				.append("g")
				.attr("transform", "translate(50 0)")
				.call(yAxisGenerator)
				.attr("font-size", "12px");

			/*===========6-建立绘图区相关的基础数据===========*/
			/*-----绘图区相关的基础数据-----*/
			/*用x轴比例尺xScale的bandwidth()方法获取x轴上一个类目的像素宽xBandW*/
			const xBandW = xScale.bandwidth();

			/*获取系列的数量n*/
			const n = source.length;

			/*用x轴的像素宽除以系列数，得到列宽colW*/
			const colW = xBandW / n;

			/*计算调色盘颜色数量colorLen*/
			const colorLen = color.length;

			/*===========7-架构绘图区===========*/
			/*在svg中建立系列集合seriesObjs，在系列集合中建立系列对象
			 *   在svg中append 加入g 对象
			 *   selectAll() 选择所有g元素，此处终点不在选择，而是建立一个选择集对象
			 *   用data() 方法将具备系列信息的数据源source绑定到系列集合中
			 *   用join() 基于数据源批量创建g元素，一个g代表一个系列，之后每个g元素里都会放入三个不同类目的柱状体
			 *   用transform 属性中的translate设置系列的x像素位——列宽乘以系列索引
			 *   基于系列索引，从调色盘中取色，然后将其作为一个系列中所有图形的填充色
			 * */
			const seriesObjs = svg
				.append("g")
				.selectAll("g")
				.data(source2)
				.join("g")
				.attr("transform", (seriesData, seriesInd) => {
					const seriesX = colW * seriesInd;
					return `translate(${seriesX},0)`;
				})
				.attr("fill", (seriesData, seriesInd) => color[seriesInd % colorLen]);

			/*在系列集合中建立柱状体集合rects
			 *   用系列集合seriesObjs 的selectAll()方法选择所有的rect元素，用于建立选择集对象
			 *   用data()方法将之前绑定在每个系列集合中的数据绑定到柱状体集合中
			 *   用join()基于每个系列的数据数据批量创建rect元素
			 *   用classed() 方法为其添加item属性
			 * */
			const rects = seriesObjs
				.selectAll("rect")
				.data((seriesData) => seriesData)
				.join("rect")
				.classed("item", true);

			/*=8-用attr()方法设置每个柱状体的x、y位置和width、height 尺寸=*/
			/*
			 * 设置柱状体的x像素位
			 *   从回调参数中获取柱状体在当前系列中的索引rectInd,系列索引 seriesInd
			 *   基于柱状体在当前系列中的索引rectInd，用x轴比例尺xScale()获取柱状体在当前系列中的x像素位
			 * 设置柱状体像素宽width为列宽colW
			 * 设置柱状体的y像素位
			 *   从回调参数中解构柱状体数据rectData
			 *   基于柱状体数据rectData，用y轴比例尺yScale()获取柱状体的y像素位
			 * 设置柱状体的像素像素高
			 *   从回调参数中解构柱状体数据rectData
			 *   让y轴上刻度为0的像素位，减去刻度为柱状图实际数据的像素位，即为柱状图的像素高
			 * */
			rects
				.attr("x", ({ rectInd }) => xScale(rectInd))
				.attr("width", colW)
				.attr("y", ({ rectData }) => yScale(rectData))
				.attr("height", ({ rectData }) => yScale(0) - yScale(rectData));

			/*===========9-建立提示对象===========*/
			/*用append()方法向容器对象main中添加div，作为提示对象tip
			 * 用attr() 方法为tip对象添加id
			 * */
			const tip = main.append("div").attr("id", "tip");

			/*===========10-为柱状体添加鼠标事件===========*/
			/*-----鼠标划入事件 mouseover-----*/
			/*
			 * 从事件中的第一个回调参数解析目标对象和鼠标位置
			 *   鼠标位置 clientX,clientY
			 * 从事件中的第二个回调参数解析当前柱状体的数据
			 *   柱状体数据 rectData
			 *   柱状体名称 rectName
			 *   系列名 seriesName
			 * 基于鼠标位置和柱状体信息显示提示
			 *   style()设置display 为block
			 *   style()设置left、top位置
			 *   html()设置元素的html 内容
			 * */
			rects.on(
				"mouseover",
				({ clientX, clientY }, { rectData, seriesName, rectName }) => {
					tip
						.style("display", "block")
						.style("left", `${clientX}px`)
						.style("top", `${clientY}px`).html(`
                <div>${seriesName}</div>
                <div>${rectName}:${rectData}</div>
            `);
				}
			);

			/*-----鼠标移动事件 mousemove-----*/
			/*设置提示left、top位置*/
			rects.on("mousemove", ({ clientX, clientY }) => {
				tip.style("left", `${clientX}px`).style("top", `${clientY}px`);
			});

			/*-----鼠标划出事件 mouseout-----*/
			/*隐藏提示*/
			rects.on("mouseout", () => {
				tip.style("display", "none");
			});
		</script>
	</body>
</html>
```

### transition 动画

- 补间动画是在两个关键帧之间，以某种算法自动计算物体运动的插值，从而形成一种过度效果。
- d3 中建立补间动画的方法：
- transition 建立关键帧
- duration 当前关键帧到上一个关键帧的距离
- ease 插值算法，动画以何种姿态完成过度，https://github.com/d3/d3-easeon
- 监听补间事件
- start 动画开始时
- end 动画结束时

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>transition动画</title>
		<style>
			* {
				box-sizing: border-box;
			}
			#main {
				margin: 20px;
				width: 600px;
				height: 600px;
				border: 1px solid #ddd;
			}
			.item {
				cursor: pointer;
			}
			.item:hover {
				opacity: 0.9;
			}
			#tip {
				position: absolute;
				margin-left: 10px;
				margin-top: 30px;
				line-height: 22px;
				background-color: rgba(0, 0, 0, 0.6);
				padding: 4px 9px;
				font-size: 13px;
				color: #fff;
				border-radius: 3px;
				pointer-events: none;
				display: none;
			}
		</style>
	</head>
	<body>
		<div id="main"></div>
		<script src="https://d3js.org/d3.v6.js"></script>
		<script>
			/*===========1-必备数据===========*/
			/*categories 类目信息*/
			const categories = ["html", "css", "js"];
			/*dimensions 维度信息*/
			const dimensions = ["学习人数", "就业人数"];
			/*数据源source：两个系列的数据*/
			const source = [
				//html css js
				[30, 20, 40], //学习人数
				[40, 30, 50], //就业人数
			];
			/*调色盘*/
			const color = [
				"#c23531",
				"#2f4554",
				"#61a0a8",
				"#d48265",
				"#91c7ae",
				"#749f83",
				"#ca8622",
				"#bda29a",
				"#6e7074",
				"#546570",
				"#c4ccd3",
			];

			/*优化数据源
			 *   使用map方法遍历数据源
			 *   将其中的数据变成对象：
			 *   {
			 *       rectData:柱状体数据,
			 *       rectInd:柱状体索引,
			 *       rectName:柱状体名称,
			 *       seriesInd:系列索引,
			 *       seriesName:系列名称
			 *    }
			 * */
			const source2 = source.map((seriesData, seriesInd) => {
				const seriesName = dimensions[seriesInd];
				return seriesData.map((rectData, rectInd) => {
					const rectName = categories[rectInd];
					return { rectData, rectInd, rectName, seriesInd, seriesName };
				});
			});

			/*===========2-建立容器对象===========*/
			/*获取main 容器*/
			const main = d3.select("#main");

			/*声明绘图框尺寸
        width 宽度，600
        height 高度，600
    */
			const width = 600;
			const height = 600;

			/*建立svg 对象
			 *   svg 画布尺寸100%充满容器对象
			 *   绘图框尺寸按照600设置
			 * */
			const svg = main
				.append("svg")
				.attr("version", 1.2)
				.attr("xmlns", "http://www.w3.org/2000/svg")
				.attr("width", "100%")
				.attr("height", "100%")
				.attr("viewBox", `0 0 ${width} ${height}`);

			/*===========3-建立轴相关的基础数据===========*/
			/*-----x轴相关的基础数据-----*/
			/*计算类目数量 len*/
			const len = categories.length;

			/*用range()方法，基于类目数量，获取x轴的在图表坐标系中的数据 xChartData，如[0,1,2]*/
			const xChartData = d3.range(len);

			/*x轴在像素坐标内的起始点和结束点 xPixelRange，左右各偏移50*/
			const xPixelRange = [50, width - 50];

			/*-----y轴相关的基础数据-----*/
			/*计算数据源中所有数据的极值 maxY
			 *   用js原生方法flat()展开数据源，再通过max()方法取极值
			 * */
			const maxY = Math.max(...source.flat());

			/*声明y轴在图表坐标系中的数据起点和结束点 yChartRange*/
			const yChartRange = [0, maxY];

			/*声明y轴在像素坐标系中的数据起点和结束点 yPixelRange*/
			const yPixelRange = [height - 50, 50];

			/*===========4-建立比例尺===========*/
			/*-----x 轴比例尺 xScale-----*/
			/*
			 * 用scaleBand()方法建立分段比例尺 xScale
			 * 用domain()方法在比例尺中写入图表数据xChartData
			 * 用rangeRound()方法在比例尺中写入像素数据，即像素的起始位和结束位xPixelRange
			 * 用padding()方法设置类目的内边距，百分比单位，如0.1
			 * */
			const xScale = d3
				.scaleBand()
				.domain(xChartData)
				.rangeRound(xPixelRange)
				.padding(0.1);

			/*-----y 轴比例尺 xScale-----*/
			/*
			 * 用scaleLinear()方法建立线性比例尺 yScale
			 * 用domain()方法在比例尺中写入图表数据yChartRange
			 * range()方法在比例尺中写入像素数据，即像素的起始位和结束位yPixelRange
			 * */
			const yScale = d3.scaleLinear().domain(yChartRange).range(yPixelRange);

			/*===========5-建立轴对象===========*/
			/*-----x轴对象-----*/
			/*基于比例尺xScale，用axisBottom()方法创建刻度朝下的坐标轴生成器 xAxisGenerator*/
			const xAxisGenerator = d3.axisBottom(xScale);

			/*利用坐标轴生成器绘制坐标轴
			 *   在svg中append 加入g 对象
			 *   用transform 属性中的translateY 设置x轴的y位置
			 *   用call()方法调用xAxisGenerator轴生成器，生成坐标轴
			 *   用selectAll()方法选择所有的text文本
			 *   用text()方法将图表数据设置为类目数据
			 *   用attr()方法设置字体大小
			 * */
			svg
				.append("g")
				.attr("transform", `translate(0, ${height - 50})`)
				.call(xAxisGenerator)
				.selectAll("text")
				.text((n) => categories[n])
				.attr("font-size", "12px");

			/*-----y轴对象-----*/
			/*基于比例尺yScale，用axisLeft()方法创建刻度朝左的坐标轴生成器 yAxisGenerator*/
			const yAxisGenerator = d3.axisLeft(yScale);

			/*利用坐标轴生成器生成坐标轴
			 *   在svg中append 加入g 对象
			 *   用transform 属性中的translate设置y轴的x位置
			 *   用call()方法调用xAxisGenerator轴生成器，生成坐标轴
			 *   用attr()方法设置字体大小
			 * */
			svg
				.append("g")
				.attr("transform", "translate(50 0)")
				.call(yAxisGenerator)
				.attr("font-size", "12px");

			/*===========6-建立绘图区相关的基础数据===========*/
			/*-----绘图区相关的基础数据-----*/
			/*用x轴比例尺xScale的bandwidth()方法获取x轴上一个类目的像素宽xBandW*/
			const xBandW = xScale.bandwidth();

			/*获取系列的数量n*/
			const n = source.length;

			/*用x轴的像素宽除以系列数，得到列宽colW*/
			const colW = xBandW / n;

			/*计算调色盘颜色数量colorLen*/
			const colorLen = color.length;

			/*===========7-架构绘图区===========*/
			/*在svg中建立系列集合seriesObjs，在系列集合中建立系列对象
			 *   在svg中append 加入g 对象
			 *   selectAll() 选择所有g元素，此处终点不在选择，而是建立一个选择集对象
			 *   用data() 方法将具备系列信息的数据源source绑定到系列集合中
			 *   用join() 基于数据源批量创建g元素，一个g代表一个系列，之后每个g元素里都会放入三个不同类目的柱状体
			 *   用transform 属性中的translate设置系列的x像素位——列宽乘以系列索引
			 *   基于系列索引，从调色盘中取色，然后将其作为一个系列中所有图形的填充色
			 * */
			const seriesObjs = svg
				.append("g")
				.selectAll("g")
				.data(source2)
				.join("g")
				.attr("transform", (seriesData, seriesInd) => {
					const seriesX = colW * seriesInd;
					return `translate(${seriesX},0)`;
				})
				.attr("fill", (seriesData, seriesInd) => color[seriesInd % colorLen]);

			/*在系列集合中建立柱状体集合rects
			 *   用系列集合seriesObjs 的selectAll()方法选择所有的rect元素，用于建立选择集对象
			 *   用data()方法将之前绑定在每个系列集合中的数据绑定到柱状体集合中
			 *   用join()基于每个系列的数据数据批量创建rect元素
			 *   用classed() 方法为其添加item属性
			 * */
			const rects = seriesObjs
				.selectAll("rect")
				.data((seriesData) => seriesData)
				.join("rect")
				.classed("item", true);

			/*=8-用attr()方法设置每个柱状体的x、y位置和width、height 尺寸=*/
			/*
			 * 设置柱状体的x像素位
			 *   从回调参数中获取柱状体在当前系列中的索引rectInd,系列索引 seriesInd
			 *   基于柱状体在当前系列中的索引rectInd，用x轴比例尺xScale()获取柱状体在当前系列中的x像素位
			 * 设置柱状体像素宽width为列宽colW
			 * 设置柱状体的y像素位
			 *   从回调参数中解构柱状体数据rectData
			 *   基于柱状体数据rectData，用y轴比例尺yScale()获取柱状体的y像素位
			 * 设置柱状体的像素像素高
			 *   从回调参数中解构柱状体数据rectData
			 *   让y轴上刻度为0的像素位，减去刻度为柱状图实际数据的像素位，即为柱状图的像素高
			 * */
			rects
				.attr("x", ({ rectData }, rectInd) => xScale(rectInd))
				.attr("width", colW);

			/*第一个关键帧-柱状体的初始状态
			 *   y y轴中刻度0的像素位
			 *   height 0
			 * */
			rects.attr("y", () => yScale(0)).attr("height", 0);

			/*第二个关键字-柱状体的完整状态
			 *   transition() 建立补间动画
			 *   duration() 动画时间
			 *   delay 动画延迟
			 *   ease 补间动画的插值算法，如d3.easeBounce，参考https://github.com/d3/d3-ease
			 * */
			rects
				.transition()
				.duration(1000)
				// .delay(1000)
				// .delay(({rectInd,seriesInd})=>rectInd*300)
				// .delay(({rectInd,seriesInd})=>seriesInd*300)
				.delay(({ rectInd, seriesInd }) => (rectInd + seriesInd) * 300)
				.ease(d3.easeBounce)
				.attr("y", ({ rectData }) => yScale(rectData))
				.attr("height", ({ rectData }) => yScale(0) - yScale(rectData));

			/*===========9-建立提示对象===========*/
			/*用append()方法向容器对象main中添加div，作为提示对象tip
			 * 用attr() 方法为tip对象添加id
			 * */
			const tip = main.append("div").attr("id", "tip");

			/*===========10-为柱状体添加鼠标事件===========*/
			/*-----鼠标划入事件 mouseover-----*/
			/*
			 * 从事件中的第一个回调参数解析目标对象和鼠标位置
			 *   鼠标位置 clientX,clientY
			 * 从事件中的第二个回调参数解析当前柱状体的数据
			 *   柱状体数据 rectData
			 *   柱状体名称 rectName
			 *   系列名 seriesName
			 * 基于鼠标位置和柱状体信息显示提示
			 *   style()设置display 为block
			 *   style()设置left、top位置
			 *   html()设置元素的html 内容
			 * */
			rects.on(
				"mouseover",
				({ clientX, clientY }, { seriesName, rectName, rectData }) => {
					tip
						.style("display", "block")
						.style("left", `${clientX}px`)
						.style("top", `${clientY}px`).html(`
                <div>${seriesName}</div>
                <div>${rectName}：${rectData}</div>
            `);
				}
			);

			/*-----鼠标移动事件 mousemove-----*/
			/*设置提示left、top位置*/
			rects.on("mousemove", ({ clientX, clientY }) => {
				tip.style("left", `${clientX}px`).style("top", `${clientY}px`);
			});

			/*-----鼠标划出事件 mouseout-----*/
			/*隐藏提示*/
			rects.on("mouseout", () => {
				tip.style("display", "none");
			});
		</script>
	</body>
</html>
```

### 缓动跟随

使用缓动跟随，可以如提示缓缓的跟着鼠标移动。

举个例子：闪电侠从 A 点向 B 点移动，闪电侠每一步走出的距离都是 AB 之间距离的一半，那么闪电侠只会越来越接近 B 点，但永远达不到 B 点。

闪电侠行走的这个过程就是缓动动画。

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>缓动跟随</title>
		<style>
			* {
				box-sizing: border-box;
			}
			#main {
				margin: 20px;
				width: 600px;
				height: 600px;
				border: 1px solid #ddd;
			}
			.item {
				cursor: pointer;
			}
			.item:hover {
				opacity: 0.9;
			}
			#tip {
				position: absolute;
				margin-left: 10px;
				margin-top: 30px;
				line-height: 22px;
				background-color: rgba(0, 0, 0, 0.6);
				padding: 4px 9px;
				font-size: 13px;
				color: #fff;
				border-radius: 3px;
				pointer-events: none;
				display: none;
			}
		</style>
	</head>
	<body>
		<div id="main"></div>
		<script src="https://d3js.org/d3.v6.js"></script>
		<script>
			/*===========1-必备数据===========*/
			/*categories 类目信息*/
			const categories = ["html", "css", "js"];
			/*dimensions 维度信息*/
			const dimensions = ["学习人数", "就业人数"];
			/*数据源source：两个系列的数据*/
			const source = [
				//html css js
				[30, 20, 40], //学习人数
				[40, 30, 50], //就业人数
			];
			/*调色盘*/
			const color = [
				"#c23531",
				"#2f4554",
				"#61a0a8",
				"#d48265",
				"#91c7ae",
				"#749f83",
				"#ca8622",
				"#bda29a",
				"#6e7074",
				"#546570",
				"#c4ccd3",
			];

			/*优化数据源
			 *   使用map方法遍历数据源
			 *   将其中的数据变成对象：
			 *   {
			 *       rectData:柱状体数据,
			 *       rectInd:柱状体索引,
			 *       rectName:柱状体名称,
			 *       seriesInd:系列索引,
			 *       seriesName:系列名称
			 *    }
			 * */
			const source2 = source.map((seriesData, seriesInd) => {
				const seriesName = dimensions[seriesInd];
				return seriesData.map((rectData, rectInd) => {
					const rectName = categories[rectInd];
					return { rectData, rectInd, rectName, seriesInd, seriesName };
				});
			});

			/*===========2-建立容器对象===========*/
			/*获取main 容器*/
			const main = d3.select("#main");

			/*声明绘图框尺寸
        width 宽度，600
        height 高度，600
    */
			const width = 600;
			const height = 600;

			/*建立svg 对象
			 *   svg 画布尺寸100%充满容器对象
			 *   绘图框尺寸按照600设置
			 * */
			const svg = main
				.append("svg")
				.attr("version", 1.2)
				.attr("xmlns", "http://www.w3.org/2000/svg")
				.attr("width", "100%")
				.attr("height", "100%")
				.attr("viewBox", `0 0 ${width} ${height}`);

			/*===========3-建立轴相关的基础数据===========*/
			/*-----x轴相关的基础数据-----*/
			/*计算类目数量 len*/
			const len = categories.length;

			/*用range()方法，基于类目数量，获取x轴的在图表坐标系中的数据 xChartData，如[0,1,2]*/
			const xChartData = d3.range(len);

			/*x轴在像素坐标内的起始点和结束点 xPixelRange，左右各偏移50*/
			const xPixelRange = [50, width - 50];

			/*-----y轴相关的基础数据-----*/
			/*计算数据源中所有数据的极值 maxY
			 *   用js原生方法flat()展开数据源，再通过max()方法取极值
			 * */
			const maxY = Math.max(...source.flat());

			/*声明y轴在图表坐标系中的数据起点和结束点 yChartRange*/
			const yChartRange = [0, maxY];

			/*声明y轴在像素坐标系中的数据起点和结束点 yPixelRange*/
			const yPixelRange = [height - 50, 50];

			/*===========4-建立比例尺===========*/
			/*-----x 轴比例尺 xScale-----*/
			/*
			 * 用scaleBand()方法建立分段比例尺 xScale
			 * 用domain()方法在比例尺中写入图表数据xChartData
			 * 用rangeRound()方法在比例尺中写入像素数据，即像素的起始位和结束位xPixelRange
			 * 用padding()方法设置类目的内边距，百分比单位，如0.1
			 * */
			const xScale = d3
				.scaleBand()
				.domain(xChartData)
				.rangeRound(xPixelRange)
				.padding(0.1);

			/*-----y 轴比例尺 xScale-----*/
			/*
			 * 用scaleLinear()方法建立线性比例尺 yScale
			 * 用domain()方法在比例尺中写入图表数据yChartRange
			 * range()方法在比例尺中写入像素数据，即像素的起始位和结束位yPixelRange
			 * */
			const yScale = d3.scaleLinear().domain(yChartRange).range(yPixelRange);

			/*===========5-建立轴对象===========*/
			/*-----x轴对象-----*/
			/*基于比例尺xScale，用axisBottom()方法创建刻度朝下的坐标轴生成器 xAxisGenerator*/
			const xAxisGenerator = d3.axisBottom(xScale);

			/*利用坐标轴生成器绘制坐标轴
			 *   在svg中append 加入g 对象
			 *   用transform 属性中的translateY 设置x轴的y位置
			 *   用call()方法调用xAxisGenerator轴生成器，生成坐标轴
			 *   用selectAll()方法选择所有的text文本
			 *   用text()方法将图表数据设置为类目数据
			 *   用attr()方法设置字体大小
			 * */
			svg
				.append("g")
				.attr("transform", `translate(0, ${height - 50})`)
				.call(xAxisGenerator)
				.selectAll("text")
				.text((n) => categories[n])
				.attr("font-size", "12px");

			/*-----y轴对象-----*/
			/*基于比例尺yScale，用axisLeft()方法创建刻度朝左的坐标轴生成器 yAxisGenerator*/
			const yAxisGenerator = d3.axisLeft(yScale);

			/*利用坐标轴生成器生成坐标轴
			 *   在svg中append 加入g 对象
			 *   用transform 属性中的translate设置y轴的x位置
			 *   用call()方法调用xAxisGenerator轴生成器，生成坐标轴
			 *   用attr()方法设置字体大小
			 * */
			svg
				.append("g")
				.attr("transform", "translate(50 0)")
				.call(yAxisGenerator)
				.attr("font-size", "12px");

			/*===========6-建立绘图区相关的基础数据===========*/
			/*-----绘图区相关的基础数据-----*/
			/*用x轴比例尺xScale的bandwidth()方法获取x轴上一个类目的像素宽xBandW*/
			const xBandW = xScale.bandwidth();

			/*获取系列的数量n*/
			const n = source.length;

			/*用x轴的像素宽除以系列数，得到列宽colW*/
			const colW = xBandW / n;

			/*计算调色盘颜色数量colorLen*/
			const colorLen = color.length;

			/*===========7-架构绘图区===========*/
			/*在svg中建立系列集合seriesObjs，在系列集合中建立系列对象
			 *   在svg中append 加入g 对象
			 *   selectAll() 选择所有g元素，此处终点不在选择，而是建立一个选择集对象
			 *   用data() 方法将具备系列信息的数据源source绑定到系列集合中
			 *   用join() 基于数据源批量创建g元素，一个g代表一个系列，之后每个g元素里都会放入三个不同类目的柱状体
			 *   用transform 属性中的translate设置系列的x像素位——列宽乘以系列索引
			 *   基于系列索引，从调色盘中取色，然后将其作为一个系列中所有图形的填充色
			 * */
			const seriesObjs = svg
				.append("g")
				.selectAll("g")
				.data(source2)
				.join("g")
				.attr("transform", (seriesData, seriesInd) => {
					const seriesX = colW * seriesInd;
					return `translate(${seriesX},0)`;
				})
				.attr("fill", (seriesData, seriesInd) => color[seriesInd % colorLen]);

			/*在系列集合中建立柱状体集合rects
			 *   用系列集合seriesObjs 的selectAll()方法选择所有的rect元素，用于建立选择集对象
			 *   用data()方法将之前绑定在每个系列集合中的数据绑定到柱状体集合中
			 *   用join()基于每个系列的数据数据批量创建rect元素
			 *   用classed() 方法为其添加item属性
			 * */
			const rects = seriesObjs
				.selectAll("rect")
				.data((seriesData) => seriesData)
				.join("rect")
				.classed("item", true);

			/*=8-用attr()方法设置每个柱状体的x、y位置和width、height 尺寸=*/
			/*
			 * 设置柱状体的x像素位
			 *   从回调参数中获取柱状体在当前系列中的索引rectInd,系列索引 seriesInd
			 *   基于柱状体在当前系列中的索引rectInd，用x轴比例尺xScale()获取柱状体在当前系列中的x像素位
			 * 设置柱状体像素宽width为列宽colW
			 * 设置柱状体的y像素位
			 *   从回调参数中解构柱状体数据rectData
			 *   基于柱状体数据rectData，用y轴比例尺yScale()获取柱状体的y像素位
			 * 设置柱状体的像素像素高
			 *   从回调参数中解构柱状体数据rectData
			 *   让y轴上刻度为0的像素位，减去刻度为柱状图实际数据的像素位，即为柱状图的像素高
			 * */

			/*第一个关键帧-柱状体的初始状态
			 *   y y轴中刻度0的像素位
			 *   height 0
			 * */
			rects
				.attr("x", ({ rectData }, rectInd) => xScale(rectInd))
				.attr("width", colW)
				.attr("y", ({ rectData }) => yScale(0))
				.attr("height", 0);

			/*第二个关键字-柱状体的完整状态
			 *   transition() 建立补间动画
			 *   duration() 动画时间
			 *   delay 动画延迟
			 *   ease 补间动画的插值算法，如d3.easeBounce，参考https://github.com/d3/d3-ease
			 * */
			rects
				.transition()
				.duration(1000)
				.delay(({ rectInd, seriesInd }) => {
					// return seriesInd*300
					return (seriesInd + rectInd) * 300;
				})
				.ease(d3.easeBounce)
				.attr("y", ({ rectData }) => yScale(rectData))
				.attr("height", ({ rectData }) => yScale(0) - yScale(rectData));

			/*===========9-建立提示对象===========*/
			/*用append()方法向容器对象main中添加div，作为提示对象tip
			 * 用attr() 方法为tip对象添加id
			 * */
			const tip = main.append("div").attr("id", "tip");

			/*===========10-为柱状体添加鼠标事件===========*/
			/*-----鼠标划入事件 mouseover-----*/
			/*
			 * 从事件中的第一个回调参数解析目标对象和鼠标位置
			 *   鼠标位置 clientX,clientY
			 * 从事件中的第二个回调参数解析当前柱状体的数据
			 *   柱状体数据 rectData
			 *   柱状体名称 rectName
			 *   系列名 seriesName
			 * 基于鼠标位置和柱状体信息显示提示
			 *   style()设置display 为block
			 *   style()设置left、top位置
			 *   html()设置元素的html 内容
			 * */
			/*缓动跟随
			 *   更新终点位置endPos
			 *   开始缓动跟随
			 * */
			rects.on(
				"mouseover",
				({ clientX, clientY }, { seriesName, rectName, rectData }) => {
					tip.style("display", "block").html(`
                <div>${seriesName}</div>
                <div>${rectName}：${rectData}</div>
            `);

					easeTip.endPos = {
						x: clientX,
						y: clientY,
					};
					easeTip.play = true;
				}
			);

			/*-----鼠标移动事件 mousemove-----*/
			/*设置提示left、top位置*/
			/*缓动跟随
			 *   更新终点位置endPos
			 * */
			rects.on("mousemove", ({ clientX, clientY }) => {
				easeTip.endPos = {
					x: clientX,
					y: clientY,
				};
			});

			/*-----鼠标划出事件 mouseout-----*/
			/*隐藏提示*/
			/*缓动跟随
			 *   删除动画帧
			 * */
			rects.on("mouseout", () => {
				tip.style("display", "none");
				easeTip.play = false;
			});

			/*===========12-提示的缓动跟随===========*/
			/*EaseObj 缓动对象
			 *   target 缓动目标
			 *   fm 当前动画帧
			 *   pos 绘图位置
			 *   endPos 目标位置
			 *   ratio 移动比例，如0.1
			 *   _play 是否开始缓动跟随
			 * */
			class EaseObj {
				/*构造函数*/
				constructor(target) {
					this.target = target;
					this.fm = 0;
					this.pos = { x: 0, y: 0 };
					this.endPos = { x: 0, y: 0 };
					this.ratio = 0.1;
					this._play = false;
				}
				/*play 属性的取值器*/
				get play() {
					return this._paly;
				}
				/*play 属性的赋值器
				 *   现在的值不等于当过去值时
				 *       当现在的值为true时
				 *           缓动跟随
				 *           更新目标对象
				 *           连续渲染
				 *       当现在的值为false时
				 *           删除动画帧，取消连续渲染
				 * */
				set play(val) {
					if (val !== this._play) {
						if (val) {
							this.render();
						} else {
							this.cancel();
						}
						this._play = val;
					}
				}

				/*render 渲染方法
				 *   按比值，让pos位置接近终点endPos
				 *   更新目标对象target的样式
				 *   连续渲染
				 * */
				render() {
					const { target, pos, endPos, ratio } = this;
					pos.x += (endPos.x - pos.x) * ratio;
					pos.y += (endPos.y - pos.y) * ratio;
					target.style("left", `${pos.x}px`).style("top", `${pos.y}px`);
					this.fm = requestAnimationFrame(() => {
						this.render();
					});
				}

				/*cancel 删除动画帧，取消连续渲染*/
				cancel() {
					cancelAnimationFrame(this.fm);
				}
			}
			/*easeTip 实例化缓动对象*/
			const easeTip = new EaseObj(tip);
		</script>
	</body>
</html>
```

### 总结

这一章我们主要讲了一个柱状图的绘制流程，其主要目的就是让大家从底层认识图表的绘制原理。

在实际工作中，还是推荐大家使用 echarts 绘制图表，echarts 在绘制图表方面非常专业，而且快捷、方便、稳定，性能和体验度也很好。

当我们遇到自由度比较高、echarts 实现不了的项目的时候，那就可以考虑用 d3 来实现了

## 机器人案例

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>机器人</title>
		<style>
			html {
				height: 100%;
			}
			body {
				height: 100%;
				margin: 0;
			}
			#main {
				width: 100%;
				height: 100%;
				background-color: antiquewhite;
			}
		</style>
	</head>
	<body>
		<div id="main"></div>
		<script src="https://d3js.org/d3.v6.min.js"></script>
		<script>
			const red = "red";
			const sky = "#00acec";
			const black = "#000";
			const strokeWidth = 40;

			const main = d3.select("#main");

			const svg = Draw(main)("svg", {
				version: "1.1",
				xmlns: "http://www.w3.org/2000/svg",
				width: "100%",
				height: "100%",
				viewBox: "-400 -400 800 800",
			});

			const draw = Draw(svg);
			const rectCom = {
				x: -200,
				y: 0,
				width: 400,
				height: 200,
			};
			draw("rect", {
				...rectCom,
				fill: red,
			});
			draw("rect", {
				...rectCom,
				fill: "none",
				stroke: black,
				"stroke-width": strokeWidth,
			});
			draw("rect", {
				x: -200,
				y: 50,
				width: 400,
				height: 60,
				fill: "antiquewhite",
			});
			draw("path", {
				d: "M-100,140 Q0,170 100,140",
				stroke: black,
				"stroke-width": strokeWidth,
			});
			draw("circle", {
				cx: -100,
				cy: 80,
				r: 20,
				fill: sky,
			});

			draw("path", {
				d: `
           M
           80,90
           A
           20 20
           0
           0
           1
           120,90
        `,
				fill: sky,
			});
			draw("path", {
				d: `
            M
            -200,-200
            C
            -100,-200
            -100,0
            0,0
            S
            100,-200
            200,-200
        `,
				fill: "none",
				stroke: black,
				"stroke-width": strokeWidth,
				"stroke-dasharray": "40",
			});

			function Draw(svg) {
				return function (shape, option = {}) {
					const obj = svg.append(shape);
					for (const [key, val] of Object.entries(option)) {
						obj.attr(key, val);
					}
					return obj;
				};
			}
		</script>
	</body>
</html>
```

## 扩展知识

### 数组

min 最小值

max 最大值

extent 极值

sum 求和

mean 平均值

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>数组</title>
		<style>
			html,
			body {
				margin: 0;
				height: 100%;
			}
		</style>
	</head>
	<body>
		<script src="https://d3js.org/d3.v6.min.js"></script>
		<script>
			/*
			 * min 最小值
			 * max 最大值
			 * extent 极值
			 * sum 求和
			 * mean 平均值
			 * */
			const arr = [1, 5, 4, 3, 2];
			console.log(d3.min(arr));
			console.log(d3.max(arr));
			console.log(d3.extent(arr));
			console.log(d3.sum(arr));
			console.log(d3.mean(arr));
		</script>
	</body>
</html>
```

### 请求

json() 请求 json

svg() 请求 svg

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>请求</title>
		<style>
			html,
			body {
				margin: 0;
				height: 100%;
			}
			#main {
				height: 100%;
				background-color: antiquewhite;
			}
		</style>
	</head>
	<body>
		<div id="main"></div>
		<script src="https://d3js.org/d3.v6.min.js"></script>
		<script>
			/*
			 * json() 请求json
			 * svg() 请求svg
			 *   在then方法中可直接或svg的dom对象
			 * ……
			 * */
			/*d3.json('./lib/data.json')
        .then(data=>{
            console.log(data);
        })*/

			d3.svg("./lib/flower.svg").then((dom) => {
				// console.log(dom);
				const svg = dom.querySelector("svg");
				console.log(svg);
				document.querySelector("#main").append(svg);
			});
		</script>
	</body>
</html>
```

lib\data.json

```json
{
	"title": "json 测试"
}
```

flower.svg

```html
<?xml version="1.0" encoding="utf-8"?>
<!-- Generator: Adobe Illustrator 18.1.1, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg
	version="1.1"
	id="图层_1"
	xmlns="http://www.w3.org/2000/svg"
	xmlns:xlink="http://www.w3.org/1999/xlink"
	x="0px"
	y="0px"
	viewBox="0 0 293 500"
	width="293"
	enable-background="new 0 0 293 500"
	xml:space="preserve"
>
	<g>
		<path
			fill="#8E3651"
			d="M206.5,392.4c-17.1,2.4-32.7-5.9-49.4-4.1c-12.2,1.4-23.9,3.8-33.2,8.8c-3.4-1.3-6.8-2.6-10.3-3.7
		c0.4-0.6,0.8-1.1,1.1-1.7c-2.6-13.6-10.5-34.8-22-40.2c-12-5.3-39.3-0.5-46.6,11.3c-4-1.1-9-2.5-9-2.5
		c6.3-10.8,22.5-17.5,30.2-17.7c5.6-18.2,5-36.5-3.4-52.7c-9.8-12.4-14.9-19.8-34.6-33c-3.1-2.1,1.1-8.2,1.1-8.2
		c9.3,10,17.9,14.5,25.4,20.2c-14.5-21.6,0-35.2-20.8-44.9c-1.2-3,2-3.9,2-3.9c14.9,8,15.3,33.9,22.8,52.1c3.2,2.9,6.2,6.3,8.9,10.7
		c11.1,18.4,11.3,46.1,4.1,58.4c4.5-0.8,8.5-0.8,12.2-0.3c2.8-0.1,26.9,0.5,31.3,47.9c6.3-11.6,9.5-26.2,8.7-43.8
		c1.6-3.4,7.6-3.3,7.6-3.3c-3.7,13.1-3.2,22.8-4.2,32.1c11-23.5,30.1-18.1,27.7-41c1.9-2.6,4.4-0.3,4.4-0.3
		c0.8,16.9-21.1,30.6-32.8,46.4c-0.8,4.3-2.1,8.6-4.6,13.2c0,0,0,0,0,0c20.6-12.4,43-26.3,43.1-69.7c0.1-42.9,18.4-80-17.8-101.7
		c-1.1-4-1.7-6.3-1.7-6.3c7.7,4.2,13.7,8.5,18.2,12.7c18.5-4.6,33.8-14.5,43.3-30.1c-2.6-13.6-9.2-15.7-20.1-22.5
		c-8.8-5.5-17.9-13.9-19.1-22.1c0,0,4.6-0.3,5.7-0.4c2,6.9,7.5,11.9,13.5,16.5c-0.9-1.4-1.7-3-2.3-4.5c-28-27,12.5-47.4-30.6-86.6
		c-23.3-21.2-36.1-46.8-62.5-43c-2.6-1.5-4.1-2.4-4.1-2.4c5.4-1,10.6,1.1,14.3-1c9.4-5.3,33,26.6,49.7,32.7c-1.8-6.3-1-10.7,0.5-16
		c1.5-5.3,3.7-9.6,5.3-14.2c2.2-6.5,3.2-20,3.2-20s12.4-6,22-2.4c-0.3,1.5,2,3.3,3.2,4.2c-13.6-2.4-22.7-7-25.1,14.9
		c-1,6.3,12.5,2.5,17.4,3.6c0.6,0.9,0,1.6,2.2,2.6c-23.2,0.3-41.3,16.6,0.8,68.6c17.7-0.4,27-12.8,29.5-22.8c0.1-0.5-4-0.9-6.3-0.6
		c-1.5,0.4-1.8-2.2,0.7-2c2,1.3,5.2-0.4,5.3-1.1c1.4-10.9-3-20.4-3-20.4c1,1.2,3.7,1.9,4.3,3.4c1.8,7.3-0.4,29.2-0.6,29.6
		c8.7-4.2,20.8,1.6,25.1,4.9c2.7,2-0.6,0.8-0.6,2.5c0,1.5-6.7-13-27.2-2.6c-5.6,8-16.4,10.1-22.1,17.7c-8.4,11.1-9,20.4-3.1,37.5
		c0-0.6,0.1-1.2,0.2-1.8c1.2-9.2,13.2-16,15.5-20.3c1.3-0.1,3.4,3.1,4.9,3.3c-12.5,6.3-26.1,12.9-8.6,42.2
		c7.5,5.6,14,11.3,13.7,19.8c6.3-11.6,9.5-26.2,8.7-43.8c1.6-3.4,7.6-3.3,7.6-3.3c-3.7,13.1-3.2,22.8-4.2,32.1
		c11-23.5,30.1-18.1,27.6-41c1.9-2.6,4.4-0.3,4.4-0.3c0.8,16.9-21.1,30.6-32.8,46.4c-0.8,4.3-2.1,8.6-4.6,13.2
		c-10,19-33.6,33.5-47.9,33.7c22.7,26.2-3.2,52.7,8.7,74.7c6.1-7.8,14.3-13.5,22.9-17.2c8.7-3.7,19.1-2.9,27-5.9
		c11.1-4.2,29.9-16.3,29.9-16.3s13.4,2.1,19.9,9.1c-2.3,1.1-0.6,5.5-0.3,7.5c-9.8-7.4-9.8-19.4-41.3-0.4
		c-9.4,5.1,11.6,14.5,15.9,20.2c-0.4,1.4-2.1,1.6-0.7,4.6c-28-22-70.7-23.5-88.8,67.2c21.6,16.6,48.8,13.5,64.8,6.3
		c0.7-0.3-3.5-4.7-6.8-6.6c-2.3-1,1.7-4.5,3.5-1.3c1.5,2.8,6.6,4.5,7.7,4c8-3.3,8-8.9,11.9-10.3c2.9-1,3.9,1.7,2.7,3.8
		c-7.4,8.8-29.2,19.3-30,19.5c15.8,4.3,22.5,21.5,23.3,28.8c0.5,4.6-1.7,0.2-3.9,1.8C233.4,422.4,244.4,401.9,206.5,392.4z"
		/>
		<g>
			<path
				fill="#F4A8B0"
				d="M121.2,160.3c7.2-10.2,24.2-24.6,32.2-18.8c4.6,3.3-2.7,21.1-7.4,23.2c-3.4,1.6-7.1,0.9-10.4-0.5
			c2.5,2.8,9.6,4.4,9.6,8.5c-0.4,4.8-2.9,8.8-6.8,11.6c-5.9,4.4-11.4,4.8-13.5,0.2c-2.5-5.5-6.4-11.8-4.8-18.5
			C120.7,163.2,121.2,160.3,121.2,160.3z M89.9,162.2c1.6-3.8,8.8-2.6,12.3-4.2c-3.6,0-7.4-0.8-10-3.5c-3.6-3.7-3.6-23,2-24.3
			c9.8-2.3,20.3,17.6,23.1,29.7c0,0-0.6,2.8-1.2,5.6c-1,6.9-7.2,11.2-11.6,15.3c-3.8,3.5-8.8,1-12.7-5.3
			C89.2,171.4,88.4,166.7,89.9,162.2z"
			/>
			<path
				fill="#BF4968"
				d="M104.5,181c2.4-2.3,5.4-4.6,7.7-7.3l0,0c1.9-2.3,3.5-4.9,3.9-8.1l0,0c0.6-2.8,1.2-5.6,1.2-5.7l0,0
			c-2-8.7-7.9-21.2-14.7-27l0,0c-2.8-2.3-5.7-3.6-8.6-2.9l0,0c-0.7,0.2-1.3,0.6-1.9,1.2l0,0c-3.9,4.7-3.5,19.9-0.2,23.4l0,0
			c0.2,0.3,0.5,0.5,0.8,0.7l0,0c2.4,2,5.4,2.7,8.4,2.8l0,0c-3.3,1-8.7,0.5-11,3l0,0c-0.2,0.3-0.4,0.6-0.6,0.9l0,0l0.2,0.1l-0.2-0.1
			c-1.5,4.6-0.6,9.4,1.9,13.5l0,0c1.2,2,2.6,3.6,4,4.8l0,0c0,0,0,0,0,0l0,0C98.6,183,101.9,183.4,104.5,181L104.5,181z M117.1,159.9
			c0,0-0.6,2.8-1.2,5.7l0,0c-0.5,3.1-1.9,5.6-3.9,7.9l0,0c-2.3,2.7-5.3,5-7.7,7.3l0,0c-2.5,2.3-5.5,1.9-8.5-0.6l0,0
			c-1.4-1.1-2.7-2.8-3.9-4.7l0,0c-2.5-4.1-3.3-8.7-1.9-13.2l0,0l0,0c0.1-0.3,0.3-0.6,0.5-0.8l0,0c2.2-2.6,8.5-1.8,11.7-3.3l0,0
			l-0.1-0.3c-3.3,0-6.6-0.6-9.1-2.8l0,0c-0.3-0.2-0.5-0.4-0.7-0.7l0,0c-3.1-3.1-3.5-18.6,0.3-22.9l0,0c0.5-0.6,1-1,1.7-1.1l0,0
			c2.8-0.6,5.6,0.5,8.3,2.8l0,0c0,0,0,0,0,0l0,0C109.2,138.8,115.1,151.3,117.1,159.9L117.1,159.9z M138.5,184.5
			c1.2-0.9,2.2-1.9,3.1-2.9l0,0c2.1-2.5,3.4-5.5,3.7-8.8l0,0c0-1.4-0.8-2.5-1.9-3.5l0,0c-2-1.7-5.2-3-7-4.5l0,0
			c3.1,1.2,6.5,1.6,9.7,0.2l0,0c0.7-0.3,1.5-1,2.2-1.9l0,0c4.3-5.2,9.1-18.2,5.4-21.5l0,0c-0.1-0.1-0.1-0.1-0.2-0.1l0,0
			c-7.3-5.2-21.5,5.6-29.7,15.2l0,0c-1.1,1.2-2,2.5-2.8,3.6l0,0l0.1,0.1l-0.2,0c0,0-0.5,2.9-1,5.7l0,0c-1.7,6.8,2.3,13.2,4.8,18.6
			l0,0c0.4,0.9,0.9,1.6,1.6,2.2l0,0C129.1,189.1,133.7,188.1,138.5,184.5L138.5,184.5z M145,172.7c-0.3,3.3-1.6,6.2-3.6,8.6l0,0
			c-0.9,1.1-1.9,2-3.1,2.9l0,0c-4.8,3.6-9.2,4.4-11.8,2.3l0,0c-0.6-0.5-1.1-1.2-1.5-2l0,0c-2.5-5.5-6.4-11.8-4.7-18.4l0,0
			c0.5-2.6,1-5.3,1-5.6l0,0c0.8-1.2,1.7-2.4,2.8-3.6l0,0c8.1-9.6,22.3-20.2,29.2-15.2l0,0c0.1,0,0.1,0.1,0.2,0.1l0,0
			c1.7,1.4,1.5,5.4,0.2,9.7l0,0c-1.3,4.3-3.5,8.8-5.6,11.3l0,0c-0.7,0.9-1.5,1.5-2.1,1.8l0,0c-3.4,1.5-7,0.9-10.3-0.5l0,0l-0.2,0.3
			c0.2,0.2,0.4,0.4,0.6,0.6l0,0c1.9,1.6,5.1,2.9,7.1,4.6l0,0C144.3,170.4,145,171.4,145,172.7L145,172.7z"
			/>
			<path
				fill="#BF4968"
				d="M117.3,154.8c0.2-0.7,1.5-0.9,3.1-0.6c1.5,0.4,2.6,1.2,2.5,1.9c-0.2,0.7-1.5,0.9-3.1,0.6
			C118.2,156.3,117.1,155.5,117.3,154.8z M117.5,165.5c-0.6-0.8-0.8-2.6-0.5-4.5c0.5-2.5,1.8-4.4,2.9-4.2c1.1,0.2,1.7,2.4,1.2,5
			c-0.5,2.4-1.7,4.3-2.8,4.2c0.2,3.7-1.4,15.6-3.9,14.3C111.8,179.1,115.8,168.2,117.5,165.5z"
			/>
			<path
				fill="#E2617D"
				d="M131.6,168.5c0.2-0.9,8.3,0.9,7.7,4C138.8,175.6,131.4,169.5,131.6,168.5z M136.5,180.9
			c-1.5,2.8-6-5.9-5.5-6.8C131.5,173.3,138.1,178.1,136.5,180.9z M131.8,171.6c0.3-0.9,7.9,2,7,5.1
			C137.8,179.7,131.5,172.6,131.8,171.6z M146.2,144.6c1,1.6-8.1,4.1-8.4,3.6C137.5,147.6,145.3,142.9,146.2,144.6z M148.7,146.6
			c0.9,1.6-8.2,3.7-8.5,3.2C139.9,149.3,147.8,144.9,148.7,146.6z M124.9,165c-0.2-0.9,8.8-2.5,9.3,0.6
			C134.8,168.6,125.1,165.9,124.9,165z M150.3,148.8c1,1.6-8.1,4-8.4,3.5C141.5,151.8,149.3,147.2,150.3,148.8z M128.6,174.3
			c0.7-0.7,5,6.4,2.7,8.6C129,185.1,127.9,175,128.6,174.3z M102.9,166.3c-0.1,1-8.8,5.1-8.5,2C94.7,165.2,103,165.4,102.9,166.3z
			 M103.4,142.9c-0.5,0.4-8.2-5-6.8-6.2C98.1,135.5,103.9,142.6,103.4,142.9z M94.8,173.1c-0.4-3.2,7.7-5.1,7.8-4.1
			C102.7,170,95.2,176.3,94.8,173.1z M100.9,144.6c-0.5,0.4-8.1-5.4-6.6-6.5C95.8,137,101.3,144.3,100.9,144.6z M104.8,170
			c0.4,0.9-4.6,9.9-5.9,6.9C97.7,174,104.4,169.1,104.8,170z M95.5,164.2c0.7-3.1,9-1.6,8.8-0.7C104.1,164.5,94.8,167.3,95.5,164.2z
			 M99.7,135.8c1.5-1.1,7,6.2,6.6,6.5C105.8,142.6,98.2,136.9,99.7,135.8z M102.9,159.8c1.7-2.6,9.5,2.2,9,3
			C111.4,163.6,101.2,162.4,102.9,159.8z"
			/>
			<path
				fill="#BF4968"
				d="M137.6,179.1c0.5-0.6,1.3-0.8,1.8-0.4c0.5,0.4,0.6,1.2,0.2,1.9c-0.4,0.6-1.3,0.8-1.8,0.4
			C137.3,180.6,137.2,179.8,137.6,179.1z M133.3,182.8c0.4-0.6,1.3-0.8,1.8-0.4c0.5,0.4,0.6,1.2,0.2,1.9c-0.5,0.6-1.3,0.8-1.8,0.4
			C133,184.3,132.9,183.4,133.3,182.8z M137.1,167.4c0.4-0.6,1.3-0.8,1.8-0.4c0.5,0.4,0.6,1.2,0.2,1.8c-0.5,0.6-1.3,0.8-1.8,0.4
			C136.7,168.9,136.6,168,137.1,167.4z M140.3,174.1c0.5-0.6,1.3-0.8,1.8-0.4c0.5,0.4,0.6,1.2,0.2,1.9c-0.5,0.6-1.3,0.8-1.8,0.4
			C139.9,175.6,139.8,174.7,140.3,174.1z M127.5,184c0.5-0.6,1.3-0.8,1.8-0.4c0.5,0.4,0.6,1.2,0.2,1.9c-0.5,0.6-1.3,0.8-1.8,0.4
			C127.1,185.4,127,184.6,127.5,184z M149.9,145c0.5-0.6,1.3-0.8,1.8-0.4c0.5,0.4,0.6,1.2,0.2,1.8c-0.5,0.6-1.3,0.8-1.8,0.4
			C149.6,146.5,149.5,145.6,149.9,145z M147.2,154.3c0.5-0.6,1.3-0.8,1.8-0.4c0.5,0.4,0.6,1.2,0.2,1.9c-0.5,0.6-1.3,0.8-1.8,0.4
			C146.9,155.7,146.8,154.9,147.2,154.3z M98,159.3c0.7-0.2,1.4,0.3,1.5,1.1c0.2,0.8-0.2,1.5-0.9,1.6c-0.7,0.2-1.4-0.3-1.5-1.1
			C96.9,160.2,97.3,159.5,98,159.3z M93.1,167c-0.7,0.2-1.4-0.3-1.5-1.1c-0.2-0.8,0.2-1.5,0.9-1.6c0.7-0.2,1.4,0.3,1.5,1.1
			C94.1,166.1,93.7,166.9,93.1,167z M100.6,178.3c0.7-0.2,1.4,0.3,1.5,1.1c0.2,0.8-0.2,1.5-0.9,1.6c-0.7,0.2-1.4-0.3-1.5-1.1
			C99.6,179.2,100,178.5,100.6,178.3z M95.6,175c0.7-0.2,1.4,0.3,1.6,1.1c0.2,0.8-0.2,1.5-0.9,1.6c-0.7,0.2-1.4-0.3-1.5-1.1
			C94.5,175.9,94.9,175.1,95.6,175z M92.1,171.6c-0.2-0.8,0.2-1.5,0.9-1.6c0.7-0.2,1.4,0.3,1.5,1.1c0.2,0.7-0.2,1.5-0.9,1.6
			C93,172.8,92.3,172.3,92.1,171.6z M94.5,133.7c0.7-0.2,1.4,0.3,1.5,1.1c0.2,0.8-0.2,1.5-0.9,1.6c-0.7,0.2-1.4-0.3-1.5-1.1
			C93.5,134.6,93.9,133.9,94.5,133.7z M92.6,144.9c-0.2-0.8,0.2-1.5,0.9-1.6c0.7-0.2,1.4,0.3,1.5,1.1c0.2,0.8-0.2,1.5-0.9,1.6
			C93.5,146.2,92.8,145.7,92.6,144.9z"
			/>
			<path
				fill="#FFFFFF"
				d="M131.4,173c-1.6,3.8-8.6-6.6-8.1-7.7C123.8,164.1,133,169.2,131.4,173z M125.8,162.3
			c-0.3-1.1,17.4-6.1,18.3-2.4C144.9,163.7,126.1,163.5,125.8,162.3z M132.3,158.4c-0.6-1,9.7-6.6,11.6-3.4
			C145.7,158.1,132.8,159.3,132.3,158.4z M124.2,162c-0.9-0.7,10.4-13.7,13.4-11.6C140.5,152.5,125.1,162.6,124.2,162z M123.1,168.8
			c0.8-0.6,6.1,14.4,3.1,14.7C121.9,183.8,122.4,169.4,123.1,168.8z M107.6,153.9c-0.9,0.7-12.6-5.4-9.6-7.6
			C101,144.1,108.5,153.2,107.6,153.9z M112.1,167c0.5,0.9-4.6,14.4-8.6,12.4C100.8,178.1,111.7,166.2,112.1,167z M95.8,150.8
			c2.3-3.1,17,8.2,16.3,9.2C111.4,161,93.6,153.9,95.8,150.8z M102.8,167.8c-0.1-4.1,10.5-5.3,10.6-4.1
			C113.3,165,102.8,171.9,102.8,167.8z M105.6,144.5c3.6-0.9,9.2,15.5,8.1,15.8C112.6,160.6,102,145.3,105.6,144.5z"
			/>
		</g>
		<g>
			<radialGradient
				id="SVGID_1_"
				cx="1225.5586"
				cy="4643.4834"
				r="41.5436"
				gradientTransform="matrix(-0.3149 0.9478 -0.9466 -0.317 4921.2949 550.9679)"
				gradientUnits="userSpaceOnUse"
			>
				<stop offset="0" style="stop-color:#EDEDED" />
				<stop offset="1" style="stop-color:#E05A6A" />
			</radialGradient>
			<path
				fill="url(#SVGID_1_)"
				d="M144.3,248.2c4.8,1.2,12.3,17.6,6.4,28.5c-2.6,4.9-11.2,17.9-14.6,16c-1.6-0.9-5.4-12.8-7.6-21.6
			C126.1,261.2,134.4,245.7,144.3,248.2z"
			/>
			<g>
				<radialGradient
					id="SVGID_2_"
					cx="1313.8148"
					cy="4657.8267"
					r="39.4956"
					gradientTransform="matrix(-0.3149 0.9478 -0.9466 -0.317 4921.2949 550.9679)"
					gradientUnits="userSpaceOnUse"
				>
					<stop offset="0" style="stop-color:#EDEDED" />
					<stop offset="1" style="stop-color:#FB879E" />
				</radialGradient>
				<path
					fill="url(#SVGID_2_)"
					d="M98.3,317.3c-2.2-4.6,5.9-21.6,18.2-24.5c5.5-1.3,21.3-3.5,21.9,0.4c0.3,1.9-6.6,12.9-12.1,20.7
				C120.3,322.5,102.7,326.7,98.3,317.3z"
				/>
				<path
					fill="#F4A8B0"
					d="M135.2,313.9c0,0,0.9,8.4,12.3,14.9c2.6,1.5,3.1,2.2,3.3,1.4c-6.8-1.9-10.6-19.3-10.7-19.8
				c0,0,3.5,13.5,9,18.2c0.4,0.3,2.4,1.6,2.2,0.5c-0.3-1.1-2.4-7.8-2.4-7.8l0,0c2,4.5,2.1,5.2,2.7,6.1c0.4,0.5,1.1,0.4,1.2-0.1
				c0.3-1.5,0.7-7.7-2.7-17.1c0,0,4.7,10.6,3.2,17.9c-0.1,0.5,0.6,0.7,0.8,0.2c2.1-5.7-0.1-17.4-0.1-17.4s2.4,10.8,1,16.1
				c-0.1,0.4,0.6,0.7,0.9,0.1c1.8-4.1,3-11.3,3-11.3c-0.7,6.5-1.7,9.1-2,10.9c-0.5,2.5,3.7-5.3,3.7-5.3s-1.4,9.5-6.9,11.6
				c-4.9,1.9-11.4-4.9-11.4-4.9s4.3,2.9,6.5,3.1C151,331.3,136.2,324.3,135.2,313.9z"
				/>
				<path
					fill="#C51770"
					d="M140.8,295.2c1.4-1.1,1.5-3.2,0.4-4.6c-1.1-1.4-3.2-1.6-4.6-0.5c-1.4,1.1-1.5,3.2-0.4,4.6
				C137.4,296.2,139.4,296.4,140.8,295.2z"
				/>

				<radialGradient
					id="SVGID_3_"
					cx="2351.8557"
					cy="-180.1093"
					r="45.4724"
					gradientTransform="matrix(-0.6879 0.7255 0.7253 0.6882 1823.7234 -1285.0223)"
					gradientUnits="userSpaceOnUse"
				>
					<stop offset="0" style="stop-color:#FFFFFF" />
					<stop offset="1" style="stop-color:#FB879E" />
				</radialGradient>
				<path
					fill="url(#SVGID_3_)"
					d="M90.9,297.1c5-1.7,21.2,7.4,22.6,19.6c0.6,5.5,3.3,20.9-0.7,21.3c-2,0.2-14.8-7.3-22-13.3
				C82.9,318.1,80.8,300.7,90.9,297.1z"
				/>
				<g>
					<radialGradient
						id="SVGID_4_"
						cx="52.7258"
						cy="334.7629"
						r="109.9522"
						gradientUnits="userSpaceOnUse"
					>
						<stop offset="0" style="stop-color:#F4D4D7" />
						<stop offset="0.7198" style="stop-color:#E05A6A" />
					</radialGradient>
					<path
						fill="url(#SVGID_4_)"
						d="M69.5,341c0-5.1,14.5-17,26.9-14.3c5.6,1.2,19,7,18,10.8c-0.5,1.9-9.7,7.8-18,12.5
					C87.2,355,69.5,351.4,69.5,341z"
					/>

					<radialGradient
						id="SVGID_5_"
						cx="2330.825"
						cy="-129.7418"
						r="18.876"
						gradientTransform="matrix(-0.6879 0.7255 0.7253 0.6882 1823.7234 -1285.0223)"
						gradientUnits="userSpaceOnUse"
					>
						<stop offset="0" style="stop-color:#FDD0D9" />
						<stop offset="1" style="stop-color:#FB879E" />
					</radialGradient>
					<path
						fill="url(#SVGID_5_)"
						d="M140.6,298.1c3.9,3.2,3.7,21.2-6.3,28.5c-4.5,3.3-18.5,13.4-20.8,10.3
					c-1.1-1.5,1.3-15.9,3.1-24.8C118.6,302.2,132.7,291.6,140.6,298.1z"
					/>
					<path
						fill="#FB879E"
						d="M155.1,350c-2.5,4.6-21.3,9-30.9,1c-4.3-3.6-13.8-11.5-11-14.5c1.4-1.5,12.8-6.2,22.5-6.7
					C146.3,329.2,160.2,340.5,155.1,350z"
					/>

					<radialGradient
						id="SVGID_6_"
						cx="2395.45"
						cy="-88.9725"
						r="38.2298"
						gradientTransform="matrix(-0.6879 0.7255 0.7253 0.6882 1823.7234 -1285.0223)"
						gradientUnits="userSpaceOnUse"
					>
						<stop offset="0" style="stop-color:#F4D4D7" />
						<stop offset="0.7198" style="stop-color:#E05A6A" />
					</radialGradient>
					<path
						fill="url(#SVGID_6_)"
						d="M111.9,378.7c-5.2-0.9-14.3-17.1-9-28.5c2.4-5.1,7.7-15.1,11.3-13.4c0.6,2.7,9.3,8.9,12.3,17.8
					C129.9,364.4,122.5,380.7,111.9,378.7z"
					/>
				</g>
				<g>
					<path
						fill="#FFFFFF"
						d="M93.4,329c0,0-8.5-1-17.8,8.3c-2.1,2.1-2.9,2.5-2.2,2.8c3.6-6,21.8-5.8,22.3-5.8c0,0-14.2,0.4-20.2,4.5
					c-0.4,0.3-2.2,2-1.1,2c1.2,0,8.3-0.6,8.3-0.6l0,0c-4.9,0.9-5.7,0.8-6.7,1.2c-0.6,0.2-0.7,1-0.2,1.2c1.4,0.6,7.4,2.3,17.6,1.2
					c0,0-11.7,2.1-18.5-0.8c-0.5-0.2-0.9,0.4-0.4,0.7c5,3.2,17.2,3.7,17.2,3.7s-11.3-0.1-16.1-2.5c-0.3-0.2-0.8,0.5-0.3,0.8
					c3.6,2.6,10.3,5.3,10.3,5.3c-6.2-2.1-8.5-3.5-10.2-4.2c-2.3-1,4.2,4.7,4.2,4.7s-9-3.4-9.6-9c-0.6-5.1,7.8-9.7,7.8-9.7
					s-4,3.4-4.8,5.5C72.2,340.1,82.9,327.7,93.4,329z"
					/>
					<path
						fill="#FFFFFF"
						d="M110.4,314.7c0,0-1.8-8.1-13.8-13.4c-2.7-1.2-3.4-1.8-3.4-1c7,1.2,12.7,17.9,12.8,18.4
					c0,0-4.9-12.8-10.9-16.9c-0.4-0.3-2.6-1.4-2.2-0.3c0.4,1.1,3.2,7.4,3.2,7.4l0,0c-2.5-4.2-2.6-4.9-3.4-5.7
					c-0.4-0.5-1.2-0.3-1.2,0.2c-0.2,1.5,0.1,7.6,4.5,16.5c0,0-5.8-9.9-5.1-17.2c0.1-0.5-0.7-0.7-0.8-0.2c-1.5,5.7,2,17,2,17
					s-3.5-10.3-2.7-15.6c0-0.4-0.7-0.6-0.9,0C87,308,86.6,315,86.6,315c0-6.4,0.7-9,0.8-10.8c0.2-2.5-3.2,5.5-3.2,5.5
					s0.4-9.4,5.7-11.8c4.8-2.3,11.9,3.8,11.9,3.8s-4.6-2.5-6.9-2.5C92.8,299.2,108.3,304.7,110.4,314.7z"
					/>
				</g>
				<path
					fill="#FFFFFF"
					d="M130.9,361c0-0.2,0-0.3,0.2-0.4l-15-19.9l6.1,11.4l1.2,2.5c0,0,0,0,0.1-0.1c0.2-0.1,0.4,0.1,0.5,0.2
				c0.1,0.2-0.1,0.4-0.2,0.5c-0.2,0.1-0.4,0-0.5-0.2c-0.1-0.1,0-0.3,0.2-0.4l-8.2-15.1l-0.1-0.2l6.4,15.1l1.3,3.4
				c0.2,0,0.4,0.1,0.4,0.2c0.1,0.2,0,0.4-0.2,0.5c-0.2,0.1-0.4-0.1-0.5-0.2c-0.1-0.2,0-0.4,0.2-0.5c0,0,0,0,0,0l-8.3-19.2l-0.3,0.6
				l3.6,14.5l0.6,2.8c0.2,0,0.4,0.1,0.4,0.2c0.1,0.2,0,0.4-0.2,0.5c-0.2,0.1-0.4-0.1-0.5-0.3c-0.1-0.2,0.1-0.4,0.3-0.4c0,0,0,0,0,0
				l-4.2-17l-7.7,17.1l-3.7,7.7c0,0,0.1,0,0.1,0.1c0.1,0.2,0.1,0.4-0.1,0.5c-0.2,0.1-0.4,0.1-0.5-0.1c-0.1-0.2-0.1-0.4,0.1-0.5
				c0.1-0.1,0.3,0,0.4,0l10.9-24.5l-10.1,12.9l-2.4,2.8c0,0,0.1,0,0.1,0.1c0.1,0.2,0.1,0.4-0.1,0.5c-0.2,0.1-0.4,0.1-0.5-0.1
				c-0.1-0.2,0-0.4,0.1-0.5c0.1-0.1,0.3,0,0.4,0l12.8-16.6l-0.1-0.5l-0.6,0.5l-11.5,14.5l-5.4,6.4c0,0,0,0,0.1,0
				c0.1,0.2,0.1,0.4-0.1,0.5c-0.2,0.1-0.4,0-0.5-0.1c-0.1-0.2-0.1-0.4,0.1-0.5c0.2-0.1,0.3,0,0.4,0.1l15.5-19.5l-9.5,8.8l-2.1,1.8
				c0,0,0.1,0,0.1,0.1c0.1,0.2,0,0.4-0.1,0.5c-0.2,0.1-0.4,0-0.5-0.1c-0.1-0.2,0-0.4,0.1-0.5c0.1-0.1,0.3,0,0.4,0.1l12.5-11.7
				l0.2-0.2l-13,9.9l-3,2.1c0.1,0.2,0,0.4-0.1,0.5c-0.2,0.1-0.4,0-0.5-0.1c-0.1-0.2-0.1-0.4,0.1-0.5c0.2-0.1,0.4-0.1,0.5,0.1
				c0,0,0,0,0,0l16.7-13l0.1-0.1l-0.1-0.3l0,0l-0.1,0.1l0,0.2l-0.5,0l-13.5,7.3l-2.6,1.3c0.1,0.2,0,0.4-0.1,0.5
				c-0.2,0.1-0.4,0-0.5-0.1c-0.1-0.2-0.1-0.4,0.1-0.5c0.2-0.1,0.4,0,0.5,0.1c0,0,0,0,0,0l15.6-8.5l-19.9,0.4l-8.5,0c0,0,0,0.1,0,0.1
				c-0.1,0.2-0.3,0.2-0.5,0.1c-0.2-0.1-0.2-0.3-0.1-0.5c0.1-0.2,0.3-0.2,0.5-0.1c0.1,0.1,0.2,0.2,0.1,0.4l26.8-0.6L95,334l-3.6-0.9
				c0,0.1,0,0.1,0,0.2c-0.1,0.2-0.3,0.2-0.5,0.1c-0.2-0.1-0.2-0.3-0.1-0.5c0.1-0.2,0.3-0.2,0.5-0.1c0.1,0.1,0.1,0.2,0.1,0.3
				l20.7,4.6l0.9,0l-1.6-0.6l-18-4.3l-8.1-2.1c0,0,0,0,0,0.1c-0.1,0.2-0.3,0.2-0.5,0.1c-0.2-0.1-0.2-0.3-0.1-0.5
				c0.1-0.2,0.3-0.2,0.5-0.1c0.1,0.1,0.2,0.3,0.1,0.4l24.3,5.6l-12-4.8l-2.5-1.1c0,0,0,0.1,0,0.1c-0.1,0.2-0.3,0.2-0.5,0.1
				c-0.2-0.1-0.2-0.3-0.1-0.5c0.1-0.2,0.3-0.2,0.5-0.1c0.1,0.1,0.2,0.2,0.1,0.4l15.9,6.4l0.2,0.1l-14.5-7.5l-3.2-1.8
				c-0.1,0.1-0.3,0.2-0.5,0.1c-0.2-0.1-0.2-0.3-0.1-0.5c0.1-0.2,0.3-0.2,0.5-0.1c0.2,0.1,0.2,0.3,0.1,0.5c0,0,0,0,0,0l18.9,9.6
				l0.9,0.2l-13.4-9.8l-2.2-1.8c-0.1,0.1-0.3,0.2-0.5,0.1c-0.2-0.1-0.2-0.3-0.1-0.5c0.1-0.2,0.3-0.2,0.5-0.1
				c0.2,0.1,0.2,0.3,0.1,0.5c0,0,0,0,0,0l15.7,11.4l0,0.2l0.1,0l0.1-0.1l0.1,0.2l0.2-0.6l-0.3-0.6l0,0.1l-0.1,0.2l0.2,0.2l-0.2,0.2
				l-13.9-15.5l-5.6-6.5c0,0-0.1,0.1-0.1,0.1c-0.2,0-0.4-0.1-0.4-0.3c0-0.2,0.1-0.4,0.3-0.4c0.2,0,0.4,0.1,0.4,0.3
				c0,0.2-0.1,0.3-0.2,0.3l18,19.9l-7.7-14.5l-1.6-3.3c0,0-0.1,0.1-0.1,0.1c-0.2,0-0.4-0.1-0.4-0.3c0-0.2,0.1-0.4,0.3-0.4
				c0.2,0,0.4,0.1,0.4,0.3c0,0.1-0.1,0.2-0.2,0.3l10.1,18.7l0.6,0.7l-0.5-1.6l-8.5-16.5l-3.7-7.5c0,0,0,0-0.1,0
				c-0.2,0-0.4-0.1-0.4-0.3c0-0.2,0.1-0.4,0.3-0.4c0.2,0,0.4,0.1,0.4,0.3c0,0.2-0.1,0.3-0.2,0.4l11.6,22.1l-4.2-12.3l-0.8-2.7
				c0,0,0,0-0.1,0c-0.2,0-0.4-0.1-0.4-0.3c0-0.2,0.1-0.4,0.3-0.4c0.2,0,0.4,0.1,0.4,0.3c0,0.2-0.1,0.3-0.2,0.4l5.6,16.2l0.1,0.2
				l-3.8-15.9l-0.7-3.6c-0.2,0-0.4-0.1-0.4-0.3c0-0.2,0.1-0.4,0.3-0.4c0.2,0,0.4,0.1,0.4,0.3c0,0.2-0.1,0.4-0.3,0.4c0,0,0,0,0,0
				l5.1,20.6l0.4,0.8l-1.3-16.5l-0.1-2.9c-0.2,0-0.3-0.1-0.4-0.3c0-0.2,0.1-0.4,0.3-0.4c0.2,0,0.4,0.1,0.4,0.3
				c0,0.2-0.1,0.4-0.3,0.4c0,0,0,0,0,0l1.6,18.9l5.7-18.2l2.7-8.1c0,0-0.1,0-0.1-0.1c-0.1-0.2-0.1-0.4,0.1-0.5
				c0.2-0.1,0.4-0.1,0.5,0.1c0.1,0.2,0.1,0.4-0.1,0.5c-0.1,0.1-0.3,0.1-0.4,0l-7.9,25.6l8.5-14l2-3.1c0,0-0.1,0-0.1-0.1
				c-0.1-0.2-0.1-0.4,0.1-0.5c0.2-0.1,0.4-0.1,0.5,0.1c0.1,0.2,0.1,0.4-0.1,0.5c-0.1,0.1-0.2,0.1-0.4,0l-10.9,18.2l-0.3,0.9h0
				l1.1-1.3l9.7-15.7l4.6-7c0,0,0,0-0.1,0c-0.1-0.2-0.1-0.4,0.1-0.5c0.2-0.1,0.4-0.1,0.5,0.1c0.1,0.2,0.1,0.4-0.1,0.5
				c-0.1,0.1-0.3,0.1-0.4,0l-13,21.2l8.4-9.8l1.9-2c0,0-0.1,0-0.1,0c-0.1-0.2-0.1-0.4,0.1-0.5c0.2-0.1,0.4-0.1,0.5,0.1
				c0.1,0.2,0.1,0.4-0.1,0.5c-0.1,0.1-0.3,0.1-0.4,0l-11.1,13.1l-0.1,0.2l11.7-11.4l2.7-2.5c-0.1-0.2-0.1-0.4,0.1-0.5
				c0.2-0.1,0.4-0.1,0.5,0.1c0.1,0.2,0.1,0.4-0.1,0.5c-0.2,0.1-0.4,0.1-0.5-0.1c0,0,0,0,0,0l-15.1,14.9l-0.1,0.1l1-0.3l12.2-8.6
				l2.4-1.6c-0.1-0.2-0.1-0.4,0.1-0.5c0.2-0.1,0.4-0.1,0.5,0.1c0.1,0.2,0.1,0.4-0.1,0.5c-0.2,0.1-0.4,0.1-0.5-0.1c0,0,0,0,0,0
				l-13.9,9.9l17.4-5.4l8.2-2.3c0,0,0-0.1,0-0.1c0.1-0.2,0.3-0.3,0.4-0.2c0.2,0.1,0.3,0.3,0.2,0.5c-0.1,0.2-0.3,0.3-0.5,0.2
				c-0.1,0-0.2-0.2-0.2-0.3l-25.5,8l16.3-0.9l3.7-0.1c0-0.1,0-0.1,0-0.2c0.1-0.2,0.3-0.3,0.5-0.2c0.2,0.1,0.3,0.3,0.2,0.5
				c-0.1,0.2-0.3,0.3-0.5,0.2c-0.1,0-0.2-0.2-0.2-0.3l-21,1.3l-0.5,0.3l1.1,0.1l18.5-0.9l8.4-0.2c0,0,0,0,0-0.1
				c0.1-0.2,0.3-0.3,0.5-0.2c0.2,0.1,0.3,0.3,0.2,0.5c-0.1,0.2-0.3,0.3-0.5,0.2c-0.2-0.1-0.2-0.2-0.2-0.4l-24.9,1.3l12.9,1.3
				l2.8,0.4c0,0,0-0.1,0-0.1c0.1-0.2,0.3-0.3,0.5-0.2c0.2,0.1,0.3,0.3,0.2,0.5c-0.1,0.2-0.3,0.3-0.5,0.2c-0.1,0-0.2-0.2-0.2-0.3
				l-17-1.7l-0.2,0l16,3.2l3.6,0.8c0.1-0.2,0.3-0.3,0.4-0.2c0.2,0.1,0.3,0.3,0.2,0.5c-0.1,0.2-0.3,0.3-0.5,0.2
				c-0.2-0.1-0.3-0.3-0.2-0.5c0,0,0,0,0,0l-20.8-4l-0.3,0l0.7,0.5l14.2,5.3l2.6,1.1c0.1-0.2,0.3-0.3,0.4-0.2
				c0.2,0.1,0.3,0.3,0.2,0.5c-0.1,0.2-0.3,0.3-0.5,0.2c-0.2-0.1-0.3-0.3-0.2-0.5c0,0,0,0,0,0l-16.3-6l14,11.3l6.6,5.5
				c0,0,0-0.1,0.1-0.1c0.2-0.1,0.4,0.1,0.5,0.2c0.1,0.2,0,0.4-0.2,0.5c-0.2,0.1-0.4-0.1-0.5-0.3c0-0.1,0-0.3,0.1-0.4l-21-16.7
				l9.9,13.1l2.1,3c0,0,0.1-0.1,0.1-0.1c0.2-0.1,0.4,0.1,0.5,0.2c0.1,0.2,0,0.4-0.2,0.5c-0.2,0.1-0.4-0.1-0.5-0.2
				c0-0.1,0-0.3,0.1-0.4l-12.8-16.6l-0.6-0.2l0.4,0.8l11.1,14.8l4.9,6.8c0,0,0,0,0.1,0c0.2-0.1,0.4,0.1,0.5,0.2
				c0.1,0.2-0.1,0.4-0.2,0.5C131.2,361.3,131,361.2,130.9,361z M114.1,338.7l0.2-0.5l-0.1-0.1l-0.2,0.2L114.1,338.7z M114.2,337.3
				L114.2,337.3L114.2,337.3L114.2,337.3L114.2,337.3z M113.8,337.8L113.8,337.8l0-0.2L113.8,337.8z M114.1,337.5L114.1,337.5
				L114.1,337.5L114.1,337.5z M113,337.4L113,337.4l0.1,0.3l0.3-0.2L113,337.4z M115.2,337l-0.4,0.1l0,0l0.2,0L115.2,337z
				 M114.8,337.8L114.8,337.8l0.2,0.1L114.8,337.8z"
				/>

				<radialGradient
					id="SVGID_7_"
					cx="1509.4545"
					cy="4778.4731"
					r="44.3633"
					gradientTransform="matrix(-0.4169 0.9073 -0.9064 -0.4191 5057.0356 899.6904)"
					gradientUnits="userSpaceOnUse"
				>
					<stop offset="0" style="stop-color:#EDEDED" />
					<stop offset="1" style="stop-color:#FB879E" />
				</radialGradient>
				<path
					fill="url(#SVGID_7_)"
					d="M99.5,265.8c3.7-3.7,22.3-2.3,28.8,8.1c2.9,4.7,9.7,18.6,6.2,20.7c-1.7,1-14.3-1.4-23.3-3.8
				C101.1,288.2,91.8,273.4,99.5,265.8z"
				/>
				<path
					fill="#FFFFFF"
					d="M124.5,273.4c0,0-5.1-6.6-18.2-6.2c-3,0.1-3.8-0.2-3.5,0.5c6.9-1.9,19.1,10.8,19.4,11.2
				c0,0-9.9-9.5-17.1-10.7c-0.5-0.1-2.9-0.1-2.2,0.7c0.8,0.8,6.1,5.3,6.1,5.3l0,0c-4-2.7-4.5-3.3-5.5-3.7c-0.6-0.2-1.2,0.3-1,0.7
				c0.5,1.4,3.3,6.8,11.1,13c0,0-9.5-6.5-11.9-13.4c-0.2-0.5-0.9-0.3-0.8,0.2c1.1,5.8,9,14.5,9,14.5s-7.6-7.9-9.1-12.9
				c-0.1-0.4-0.9-0.2-0.8,0.3c0.5,4.4,3.1,10.9,3.1,10.9c-2.7-5.8-3.2-8.5-3.8-10.1c-0.9-2.3-0.6,6.3-0.6,6.3s-3.6-8.6,0.1-13.1
				c3.3-4.1,12.4-1.7,12.4-1.7s-5.2-0.3-7.3,0.7C102,266.8,118.4,265.2,124.5,273.4z"
				/>
				<path
					fill="#FFFFFF"
					d="M149.5,273.2c0,0,3.2-7.7-3.1-18.6c-1.4-2.5-1.6-3.3-2.1-2.7c4.8,4.8-0.3,21.7-0.5,22.2
				c0,0,3.4-13.3,1.1-19.9c-0.1-0.4-1.3-2.5-1.6-1.5c-0.3,1.1-1.7,7.9-1.7,7.9l0,0c0.4-4.8,0.8-5.5,0.6-6.5
				c-0.1-0.6-0.8-0.8-1.1-0.5c-1,1.1-4.2,6.4-5.8,16.1c0,0,1.1-11.4,5.8-17c0.3-0.4-0.2-0.9-0.5-0.6c-4.4,3.9-8.1,15.1-8.1,15.1
				s3.1-10.5,6.7-14.4c0.3-0.3-0.2-0.9-0.7-0.5c-3.5,2.7-7.8,8.3-7.8,8.3c3.7-5.3,5.7-7.1,6.8-8.5c1.6-2-5.6,2.8-5.6,2.8
				s5.6-7.5,11.1-6.8c5,0.7,7.1,9.6,7.1,9.6s-2.2-4.6-4-5.8C144.6,250.8,153.5,263.8,149.5,273.2z"
				/>

				<radialGradient
					id="SVGID_8_"
					cx="1255.6855"
					cy="4588.7837"
					r="24.0658"
					gradientTransform="matrix(-0.3149 0.9478 -0.9466 -0.317 4921.2949 550.9679)"
					gradientUnits="userSpaceOnUse"
				>
					<stop offset="0" style="stop-color:#EDEDED" />
					<stop offset="1" style="stop-color:#E2617D" />
				</radialGradient>
				<path
					fill="url(#SVGID_8_)"
					d="M179.4,289c-0.3,5.3-15.4,17.2-27.5,14c-5.5-1.4-18.7-6.4-17.4-10.3c0.6-1.9,10.3-9.2,18.8-13.8
				C162.7,273.9,180,278.2,179.4,289z"
				/>
				<path
					fill="#F4D4D7"
					d="M153.9,301.1c0,0,8.4,1.3,18.2-8.1c2.2-2.1,3.1-2.5,2.3-2.8c-4,6.1-22,5.4-22.5,5.4c0,0,14.1,0,20.4-4.1
				c0.4-0.3,2.3-2,1.2-2c-1.1,0-8.3,0.4-8.3,0.4l0,0c4.9-0.8,5.7-0.7,6.7-1.1c0.6-0.2,0.7-1,0.3-1.2c-1.3-0.7-7.2-2.6-17.4-1.7
				c0,0,11.7-1.9,18.3,1.4c0.5,0.2,0.9-0.4,0.5-0.7c-4.8-3.4-16.9-4.3-16.9-4.3s11.2,0.4,15.8,3.1c0.3,0.2,0.8-0.4,0.4-0.8
				c-3.4-2.8-9.9-5.8-9.9-5.8c6,2.3,8.3,3.9,9.9,4.7c2.3,1.1-3.9-5-3.9-5s8.7,3.8,9,9.6c0.3,5.3-8.3,9.8-8.3,9.8s4.2-3.4,5-5.6
				C175.6,290.2,164.2,302.7,153.9,301.1z"
				/>

				<radialGradient
					id="SVGID_9_"
					cx="1310.1194"
					cy="4594.8784"
					r="28.6287"
					gradientTransform="matrix(-0.3149 0.9478 -0.9466 -0.317 4921.2949 550.9679)"
					gradientUnits="userSpaceOnUse"
				>
					<stop offset="0" style="stop-color:#EDEDED" />
					<stop offset="1" style="stop-color:#E2617D" />
				</radialGradient>
				<path
					fill="url(#SVGID_9_)"
					d="M152.6,333.5c-5.1,1.3-20.2-9.4-20.3-22c0-5.6,1.4-21.4,5.4-21.4c2,0,11.4,8.6,17.9,15.3
				C162.8,312.8,163,330.7,152.6,333.5z"
				/>
				<path
					fill="#FFFFFF"
					d="M162.8,306.6c-0.1-0.1-0.1-0.3,0-0.4l-22.1-11.6l10.4,7.7l2.2,1.8c0,0,0-0.1,0-0.1c0.2-0.1,0.4-0.1,0.5,0
				c0.1,0.2,0.1,0.4,0,0.5c-0.1,0.1-0.4,0.1-0.5,0c-0.1-0.1-0.1-0.3,0-0.4l-13.8-10.2l-0.2-0.1l12.2,11l2.6,2.5
				c0.2-0.1,0.4-0.1,0.5,0c0.1,0.2,0.1,0.4,0,0.5c-0.1,0.1-0.4,0.1-0.5,0c-0.1-0.2-0.1-0.4,0-0.5c0,0,0,0,0,0l-15.6-13.9l0,0.7
				l9.4,11.6l1.7,2.3c0.1-0.1,0.3-0.1,0.5,0c0.1,0.2,0.1,0.4,0,0.5c-0.2,0.1-0.4,0.1-0.5,0c-0.1-0.1-0.1-0.4,0-0.5c0,0,0,0,0,0
				l-11.1-13.6l0.3,18.7l0,8.6c0,0,0.1,0,0.1,0c0.2,0.1,0.2,0.3,0.1,0.5c-0.1,0.2-0.3,0.2-0.5,0.1c-0.2-0.1-0.2-0.3-0.1-0.5
				c0.1-0.1,0.2-0.2,0.4-0.1l-0.6-26.8l-3.7,16l-0.9,3.6c0.1,0,0.1,0,0.2,0c0.2,0.1,0.2,0.3,0.1,0.5c-0.1,0.2-0.3,0.2-0.5,0.1
				c-0.2-0.1-0.2-0.3-0.1-0.5c0.1-0.1,0.2-0.2,0.3-0.1l4.6-20.5l-0.3-0.4l-0.3,0.7l-4.3,18l-2.1,8.1c0,0,0,0,0.1,0
				c0.2,0.1,0.2,0.3,0.1,0.5c-0.1,0.2-0.3,0.2-0.5,0.1c-0.2-0.1-0.2-0.3-0.1-0.5c0.1-0.1,0.3-0.2,0.4-0.1l5.7-24.3l-4.8,12l-1.2,2.5
				c0,0,0.1,0,0.1,0c0.2,0.1,0.2,0.3,0.1,0.5c-0.1,0.2-0.3,0.2-0.5,0.1c-0.2-0.1-0.2-0.3-0.1-0.5c0.1-0.1,0.2-0.2,0.4-0.1l6.4-15.9
				l0.1-0.2l-7.5,14.5l-1.8,3.2c0.1,0.1,0.2,0.3,0.1,0.5c-0.1,0.2-0.3,0.2-0.5,0.1c-0.2-0.1-0.2-0.3-0.1-0.5
				c0.1-0.2,0.3-0.2,0.5-0.1c0,0,0,0,0,0l9.6-18.9l0-0.1l-0.2-0.2l0,0l-0.1,0.1l0.1,0.2l-0.4,0.2l-9.1,12.4l-1.8,2.2
				c0.1,0.1,0.2,0.3,0.1,0.5c-0.1,0.2-0.3,0.2-0.5,0.1c-0.2-0.1-0.2-0.3-0.1-0.5c0.1-0.2,0.3-0.2,0.5-0.1c0,0,0,0,0,0l10.5-14.4
				l-17.8,8.8l-7.7,3.6c0,0,0,0.1,0,0.1c0,0.2-0.2,0.3-0.4,0.3c-0.2,0-0.3-0.2-0.3-0.4c0-0.2,0.2-0.3,0.4-0.3c0.1,0,0.2,0.1,0.3,0.3
				l23.9-12l-16,3.5l-3.6,0.7c0,0,0,0.1,0,0.2c0,0.2-0.2,0.3-0.4,0.3c-0.2,0-0.3-0.2-0.3-0.4c0-0.2,0.2-0.3,0.4-0.3
				c0.1,0,0.2,0.1,0.3,0.2l20.7-4.7l0.8-0.4l-1.7,0.1l-18.1,3.8l-8.2,1.6c0,0,0,0,0,0.1c0,0.2-0.2,0.3-0.4,0.3
				c-0.2,0-0.3-0.2-0.3-0.4c0-0.2,0.2-0.3,0.4-0.3c0.2,0,0.3,0.2,0.3,0.3l24.4-5.2l-12.9,0.7l-2.8,0c0,0,0,0.1,0,0.1
				c0,0.2-0.2,0.3-0.4,0.3c-0.2,0-0.3-0.2-0.3-0.4c0-0.2,0.2-0.3,0.4-0.3c0.2,0,0.3,0.1,0.3,0.3l17.1-1l0.2-0.1l-16.3-0.6l-3.7-0.2
				c0,0.2-0.2,0.3-0.4,0.3c-0.2,0-0.3-0.2-0.3-0.4c0-0.2,0.2-0.3,0.4-0.3c0.2,0,0.3,0.2,0.3,0.4c0,0,0,0,0,0l21.2,0.6l0.9-0.2
				l-16.3-3.2l-2.8-0.7c-0.1,0.2-0.2,0.3-0.4,0.3c-0.2,0-0.3-0.2-0.3-0.4c0-0.2,0.2-0.3,0.4-0.3c0.2,0,0.3,0.2,0.3,0.4c0,0,0,0,0,0
				l19,3.7l0.1,0.2l0.1,0l0.1-0.2l0.2,0.1l-0.1-0.6l-0.5-0.4l0.1,0.1l-0.1,0.2l0.3,0.1l-0.1,0.3l-19.2-8.1l-7.8-3.5
				c0,0,0,0.1-0.1,0.1c-0.2,0.1-0.4,0.1-0.5-0.1c-0.1-0.2-0.1-0.4,0.1-0.5c0.2-0.1,0.4-0.1,0.5,0.1c0.1,0.1,0,0.3,0,0.4l24.7,10.4
				l-13.1-9.9l-2.9-2.3c0,0,0,0.1-0.1,0.1c-0.2,0.1-0.4,0.1-0.5-0.1c-0.1-0.2-0.1-0.4,0.1-0.5c0.2-0.1,0.4-0.1,0.5,0.1
				c0.1,0.1,0.1,0.3,0,0.4l17,12.7l0.9,0.4l-1.2-1.2l-14.7-11.3l-6.5-5.2c0,0,0,0,0,0.1c-0.2,0.1-0.4,0-0.5-0.1
				c-0.1-0.2-0.1-0.4,0.1-0.5c0.2-0.1,0.4-0.1,0.5,0.1c0.1,0.1,0.1,0.3-0.1,0.4l19.9,15.1l-9-9.3l-1.9-2.1c0,0,0,0.1-0.1,0.1
				c-0.2,0.1-0.4,0.1-0.5-0.1c-0.1-0.2-0.1-0.4,0.1-0.5c0.2-0.1,0.4-0.1,0.5,0.1c0.1,0.1,0.1,0.3,0,0.4l12,12.3l0.2,0.1l-10.2-12.8
				l-2.2-2.9c-0.2,0.1-0.4,0-0.5-0.1c-0.1-0.2-0.1-0.4,0.1-0.5c0.2-0.1,0.4-0.1,0.5,0.1c0.1,0.2,0.1,0.4-0.1,0.5c0,0,0,0,0,0
				l13.4,16.5l0.7,0.6l-8.2-14.4l-1.3-2.6c-0.2,0.1-0.4,0-0.5-0.1c-0.1-0.2-0.1-0.4,0.1-0.5c0.2-0.1,0.4-0.1,0.5,0.1
				c0.1,0.2,0.1,0.4-0.1,0.5c0,0,0,0,0,0l9.4,16.4l-2.6-18.9l-1-8.5c0,0-0.1,0-0.1,0c-0.2-0.1-0.3-0.3-0.2-0.5
				c0.1-0.2,0.3-0.3,0.5-0.2c0.2,0.1,0.2,0.3,0.2,0.5c-0.1,0.1-0.2,0.2-0.4,0.2l3.7,26.6l1.8-16.3l0.5-3.7c0,0-0.1,0-0.1,0
				c-0.2-0.1-0.3-0.3-0.2-0.5c0.1-0.2,0.3-0.3,0.5-0.2c0.2,0.1,0.3,0.3,0.2,0.5c-0.1,0.1-0.2,0.2-0.3,0.2l-2.1,21.1l0.1,0.9l0,0
				l0.4-1.6l2.1-18.4l1.1-8.3c0,0,0,0-0.1,0c-0.2-0.1-0.3-0.3-0.2-0.5c0.1-0.2,0.3-0.3,0.5-0.2c0.2,0.1,0.3,0.3,0.2,0.5
				c-0.1,0.2-0.3,0.2-0.4,0.2l-2.8,24.8l3.4-12.5l0.8-2.7c0,0-0.1,0-0.1,0c-0.2-0.1-0.3-0.3-0.2-0.5c0.1-0.2,0.3-0.3,0.5-0.2
				c0.2,0.1,0.3,0.3,0.2,0.5c-0.1,0.1-0.2,0.2-0.4,0.2l-4.4,16.6l0,0.2l5.8-15.3l1.4-3.4c-0.2-0.1-0.2-0.3-0.1-0.5
				c0.1-0.2,0.3-0.3,0.5-0.2c0.2,0.1,0.3,0.3,0.2,0.5c-0.1,0.2-0.3,0.3-0.5,0.2c0,0,0,0,0,0l-7.3,19.9l0,0.2l0.7-0.7l7.4-13l1.5-2.4
				c-0.1-0.1-0.2-0.3-0.1-0.5c0.1-0.2,0.3-0.3,0.5-0.2c0.2,0.1,0.3,0.3,0.2,0.5c-0.1,0.2-0.3,0.3-0.5,0.2c0,0,0,0,0,0l-8.4,14.9
				l13.5-12.3l6.4-5.6c0,0-0.1-0.1-0.1-0.1c0-0.2,0.1-0.4,0.3-0.4c0.2,0,0.4,0.1,0.4,0.3c0,0.2-0.1,0.4-0.3,0.4
				c-0.1,0-0.3-0.1-0.3-0.2l-19.7,18.1l14.4-7.8l3.3-1.6c0,0-0.1-0.1-0.1-0.1c0-0.2,0.1-0.4,0.3-0.4c0.2,0,0.4,0.1,0.4,0.3
				c0,0.2-0.1,0.4-0.3,0.4c-0.1,0-0.2-0.1-0.3-0.2l-18.4,10.1l-0.3,0.5l1-0.4l16.3-8.7l7.5-3.8c0,0,0,0,0-0.1c0-0.2,0.1-0.4,0.3-0.4
				c0.2,0,0.4,0.1,0.4,0.3c0,0.2-0.1,0.4-0.3,0.4c-0.2,0-0.3-0.1-0.4-0.2l-22,11.8l12.2-4.3l2.7-0.8c0,0,0,0,0-0.1
				c0-0.2,0.1-0.4,0.3-0.4c0.2,0,0.4,0.1,0.4,0.3c0,0.2-0.1,0.4-0.3,0.4c-0.2,0-0.3-0.1-0.4-0.2l-16.1,5.7l-0.2,0.1l15.9-3.9
				l3.6-0.8c0-0.2,0.1-0.4,0.3-0.4c0.2,0,0.4,0.1,0.4,0.3c0,0.2-0.1,0.4-0.3,0.4c-0.2,0-0.4-0.1-0.4-0.3c0,0,0,0,0,0l-20.5,5.2
				l-0.2,0.1l0.8,0.2l15.1-1.3l2.9-0.1c0-0.2,0.1-0.3,0.3-0.4c0.2,0,0.4,0.1,0.4,0.3c0,0.2-0.1,0.4-0.3,0.4c-0.2,0-0.4-0.1-0.4-0.3
				c0,0,0,0,0,0l-17.2,1.5l17.5,4.2l8.3,2.2c0,0,0-0.1,0.1-0.1c0.1-0.1,0.4-0.1,0.5,0c0.1,0.2,0.1,0.4,0,0.5c-0.2,0.1-0.4,0.1-0.5,0
				c-0.1-0.1-0.1-0.3,0-0.4l-26.1-6.2l14.5,7.6l3.2,1.8c0,0,0-0.1,0.1-0.1c0.2-0.1,0.4-0.1,0.5,0c0.1,0.2,0.1,0.4,0,0.5
				c-0.2,0.1-0.4,0.1-0.5,0c-0.1-0.1-0.1-0.2,0-0.4l-18.6-9.6l-0.6,0.1l0.8,0.6l16.3,8.7l7.3,4.1c0,0,0,0,0-0.1
				c0.2-0.1,0.4-0.1,0.5,0c0.1,0.2,0.1,0.4,0,0.5C163.2,306.7,162.9,306.7,162.8,306.6z M138.1,293.6l0-0.5L138,293l-0.1,0.3
				L138.1,293.6z M137.6,292.2L137.6,292.2L137.6,292.2L137.6,292.2L137.6,292.2z M137.5,292.8L137.5,292.8l-0.1-0.2L137.5,292.8z
				 M137.6,292.5l0-0.1L137.6,292.5L137.6,292.5z M136.6,292.8l0.1,0l0.1,0.2l0.2-0.3L136.6,292.8z M138.4,291.6l-0.3,0.3l0,0
				l0.2-0.1L138.4,291.6z M138.4,292.4L138.4,292.4l0.2,0.1L138.4,292.4z"
				/>
				<g>
					<g>
						<path
							fill="#E2617D"
							d="M125.7,389.9L125.7,389.9L125.7,389.9L125.7,389.9L125.7,389.9z"
						/>
					</g>
				</g>
				<path
					fill="#E05A6A"
					d="M97.4,356.6c0-0.2,0.1-0.3,0.2-0.4c0.1,0,0.2,0,0.3,0.1l15.2-16.7c0,0-0.1,0-0.1,0l-11.4,7.5l-2.7,1.6
				c0,0,0.1,0.1,0.1,0.1c0,0.2-0.1,0.3-0.2,0.4c-0.2,0-0.3-0.1-0.4-0.2c0-0.2,0.1-0.3,0.2-0.4c0.1,0,0.2,0,0.3,0.1l13.8-9.2
				c-0.1-0.1-0.3-0.1-0.4-0.2l-12.4,8l-6.1,3.7c0,0,0,0,0,0c0,0.2-0.1,0.3-0.2,0.4c-0.2,0-0.3-0.1-0.4-0.2c0-0.2,0.1-0.3,0.2-0.4
				c0.1,0,0.3,0,0.3,0.2l17.8-11.6l-10,4.5l-2.2,0.9c0,0,0,0,0,0.1c0,0.2-0.1,0.3-0.2,0.4c-0.2,0-0.3-0.1-0.4-0.2
				c0-0.2,0.1-0.3,0.2-0.4c0.1,0,0.2,0,0.3,0.2l12.6-5.8c0,0-0.1-0.1-0.1-0.1l-12.3,4.2l-3,0.9c0,0.2-0.1,0.3-0.2,0.3
				c-0.2,0-0.3-0.1-0.4-0.2c0-0.2,0.1-0.3,0.2-0.4c0.2,0,0.3,0.1,0.4,0.2c0,0,0,0,0,0l15.1-5.3c-0.1-0.2-0.2-0.4-0.3-0.6l-11,1.9
				l-2.4,0.3c0,0.2-0.1,0.3-0.2,0.3c-0.2,0-0.3-0.1-0.4-0.2c0-0.2,0.1-0.3,0.2-0.4c0.2,0,0.3,0.1,0.4,0.2c0,0,0,0,0,0l13.3-2.4
				c0,0,0,0,0-0.1c-0.1-0.2-0.1-0.5-0.1-0.7l-14.5-4.5l-6.9-2.3c0,0,0,0.1,0,0.1c-0.1,0.1-0.3,0.1-0.4-0.1c-0.1-0.1-0.1-0.3,0.1-0.4
				c0.1-0.1,0.3-0.1,0.4,0.1c0.1,0.1,0.1,0.2,0,0.3l21.4,6.6c0,0,0-0.1,0-0.1l-11.5-7l-2.6-1.7c0,0,0,0.1-0.1,0.1
				c-0.1,0.1-0.3,0.1-0.4-0.1c-0.1-0.1-0.1-0.3,0-0.4c0.1-0.1,0.3-0.1,0.4,0.1c0.1,0.1,0.1,0.2,0,0.3l14.2,8.5
				c0-0.1,0.1-0.3,0.2-0.4l-12.6-7.8l-6-3.9c0,0,0,0,0,0.1c-0.1,0.1-0.3,0.1-0.4-0.1c-0.1-0.1-0.1-0.3,0.1-0.4
				c0.1-0.1,0.3-0.1,0.4,0.1c0.1,0.1,0.1,0.3,0,0.4l18.1,11.1l-8.4-7.2l-1.7-1.6c0,0,0,0,0,0.1c-0.1,0.1-0.3,0.1-0.4-0.1
				c-0.1-0.1-0.1-0.3,0.1-0.4c0.1-0.1,0.3-0.1,0.4,0.1c0.1,0.1,0.1,0.2,0,0.3l10.8,9.1c0,0,0-0.1,0.1-0.1l-9.2-9.5l-2.1-2.3
				c-0.1,0.1-0.3,0.1-0.4-0.1c-0.1-0.1-0.1-0.3,0.1-0.4c0.1-0.1,0.3-0.1,0.4,0.1c0.1,0.1,0.1,0.3-0.1,0.4c0,0,0,0,0,0l11.5,11.6
				c0.1-0.1,0.3-0.3,0.5-0.4l-6.7-9.5l-1.3-2.1c-0.1,0.1-0.3,0.1-0.4-0.1c-0.1-0.1-0.1-0.3,0-0.4c0.1-0.1,0.3-0.1,0.4,0.1
				c0.1,0.1,0.1,0.3-0.1,0.4c0,0,0,0,0,0l8.2,11.5c0.2-0.1,0.3-0.1,0.5-0.2c0.1,0,0.1,0,0.2,0l-6.1-14.2l-2.8-6.8c0,0-0.1,0-0.1,0
				c-0.2,0-0.3-0.2-0.2-0.4c0-0.2,0.2-0.3,0.4-0.2c0.2,0,0.3,0.2,0.2,0.4c0,0.1-0.1,0.2-0.2,0.2l9.1,20.9c0,0,0,0,0,0l-2.3-13.8
				l-0.4-3.1c0,0-0.1,0-0.1,0c-0.2,0-0.3-0.2-0.3-0.4c0-0.2,0.2-0.3,0.4-0.2c0.2,0,0.3,0.2,0.2,0.4c0,0.1-0.1,0.2-0.2,0.2l2.9,16.9
				c0.1,0,0.3,0,0.4,0.1l-2.4-15.4l-1-7.1c0,0,0,0-0.1,0c-0.2,0-0.3-0.2-0.3-0.4c0-0.2,0.2-0.3,0.4-0.2c0.2,0,0.3,0.2,0.2,0.4
				c0,0.1-0.2,0.2-0.3,0.2l3.4,21l-0.1-11l0.1-2.4c0,0,0,0-0.1,0c-0.2,0-0.3-0.2-0.3-0.4c0-0.2,0.2-0.3,0.4-0.3
				c0.2,0,0.3,0.2,0.2,0.4c0,0.1-0.1,0.2-0.3,0.2l0.2,14.6l0,0.2l1.2-13.9l0.4-3.1c-0.2,0-0.3-0.2-0.2-0.4c0-0.2,0.2-0.3,0.4-0.3
				c0.2,0,0.3,0.2,0.2,0.4c0,0.2-0.2,0.3-0.4,0.2c0,0,0,0,0,0l-1.4,17.2c0.1,0.1,0.3,0.1,0.4,0.2l3.1-12.4l0.7-2.3
				c-0.1,0-0.2-0.2-0.2-0.3c0-0.2,0.2-0.3,0.4-0.2c0.2,0,0.3,0.2,0.2,0.4c0,0.2-0.2,0.3-0.4,0.2c0,0,0,0,0,0l-3.6,14.9
				c0.1,0.1,0.2,0.2,0.2,0.2l9.1-12.6l4.4-5.8c0,0-0.1,0-0.1-0.1c-0.1-0.2,0-0.3,0.2-0.4c0.2-0.1,0.3,0,0.4,0.2
				c0.1,0.2,0,0.3-0.2,0.4c-0.1,0-0.2,0-0.3-0.1l-13.3,18.6l10.7-9l2.5-1.9c0,0-0.1-0.1-0.1-0.1c-0.1-0.2,0-0.3,0.2-0.4
				c0.2-0.1,0.3,0,0.4,0.2c0.1,0.2,0,0.3-0.2,0.4c-0.1,0-0.2,0-0.3-0.1l-13.1,11.2c0.1,0.1,0.1,0.3,0.2,0.4l12-10l5.6-4.4
				c0,0,0,0,0,0c-0.1-0.2,0-0.3,0.2-0.4c0.2-0.1,0.3,0,0.4,0.2c0.1,0.2,0,0.3-0.2,0.4c-0.1,0-0.3,0-0.4-0.1l-16.3,13.6l9.4-5.7
				l2.1-1.1c0,0,0,0-0.1-0.1c-0.1-0.2,0-0.3,0.2-0.4c0.2,0,0.3,0,0.4,0.2c0.1,0.2,0,0.3-0.2,0.4c-0.1,0-0.2,0-0.3-0.1l-12.5,7.6
				l-0.2,0.1l12.6-6l2.9-1.3c0-0.2,0-0.3,0.2-0.4c0.2-0.1,0.3,0,0.4,0.2c0.1,0.2,0,0.3-0.2,0.4c-0.2,0.1-0.3,0-0.4-0.2c0,0,0,0,0,0
				l-15.6,7.6c0,0.1,0,0.3,0,0.4h0.1l12.2-3.6l2.4-0.6c0-0.1,0-0.3,0.2-0.4c0.2-0.1,0.3,0,0.4,0.2c0.1,0.2,0,0.3-0.2,0.4
				c-0.2,0.1-0.3,0-0.4-0.2c0,0,0,0,0,0l-13.9,4.2l15.5,0.4l7.3,0.3c0,0,0-0.1,0-0.1c0.1-0.1,0.3-0.2,0.4-0.1
				c0.1,0.1,0.2,0.3,0.1,0.4c-0.1,0.1-0.3,0.2-0.4,0.1c-0.1-0.1-0.1-0.2-0.1-0.3l-22.8-0.5l13.5,3.7l3,0.9c0,0,0-0.1,0-0.1
				c0.1-0.1,0.3-0.2,0.4-0.1c0.1,0.1,0.2,0.3,0.1,0.4c-0.1,0.1-0.3,0.2-0.4,0.1c-0.1-0.1-0.1-0.2-0.1-0.3l-17.1-4.6
				c0,0.1,0,0.3-0.1,0.4l0.3,0.1l15.2,4.3l6.8,2.1c0,0,0,0,0-0.1c0.1-0.1,0.3-0.2,0.4-0.1c0.1,0.1,0.2,0.3,0.1,0.4
				c-0.1,0.1-0.3,0.2-0.4,0.1c-0.1-0.1-0.1-0.2-0.1-0.4l-20.5-5.7l10,4.6l2.1,1.1c0,0,0-0.1,0-0.1c0.1-0.1,0.3-0.2,0.4-0.1
				c0.1,0.1,0.2,0.3,0.1,0.4c-0.1,0.1-0.3,0.2-0.4,0.1c-0.1-0.1-0.1-0.2-0.1-0.3l-13.3-6l-0.2-0.1l12.1,7l2.7,1.6
				c0.1-0.1,0.3-0.2,0.4-0.1c0.1,0.1,0.2,0.3,0.1,0.4c-0.1,0.1-0.3,0.2-0.4,0.1c-0.1-0.1-0.2-0.3-0.1-0.4c0,0,0,0,0,0l-15.3-8.7
				c-0.1,0.1-0.1,0.2-0.2,0.3l10.1,8.1l1.8,1.6c0.1-0.1,0.3-0.1,0.4,0c0.1,0.1,0.2,0.3,0.1,0.4c-0.1,0.1-0.3,0.2-0.4,0.1
				c-0.1-0.1-0.2-0.3-0.1-0.4c0,0,0,0,0,0l-11.6-9.2l8.3,12.9l3.8,6.2c0,0,0.1,0,0.1,0c0.2,0,0.3,0.2,0.3,0.3c0,0.2-0.1,0.3-0.3,0.3
				c-0.2,0-0.3-0.1-0.3-0.3c0-0.1,0.1-0.2,0.2-0.3l-12.4-19.2l4.5,13.2l0.9,3c0,0,0.1-0.1,0.1,0c0.2,0,0.3,0.1,0.3,0.3
				c0,0.2-0.1,0.3-0.3,0.3c-0.2,0-0.3-0.2-0.3-0.3c0-0.1,0.1-0.2,0.2-0.3l-5.7-16.4c-0.1,0.1-0.2,0.2-0.4,0.3l4.9,14.7l2.1,6.8
				c0,0,0,0,0,0c0.2,0,0.3,0.1,0.3,0.3c0,0.2-0.1,0.3-0.3,0.3c-0.2,0-0.3-0.1-0.3-0.3c0-0.1,0.1-0.3,0.3-0.3l-6.8-20.2l1.9,10.9
				l0.3,2.4c0,0,0,0,0.1,0c0.2,0,0.3,0.2,0.3,0.3c0,0.2-0.2,0.3-0.3,0.3c-0.2,0-0.3-0.1-0.3-0.3c0-0.1,0.1-0.2,0.2-0.3l-2.5-14.4
				l0-0.1c0,0,0,0,0,0l1.1,13.8l0.1,3.1c0.2,0,0.3,0.2,0.3,0.3c0,0.2-0.2,0.3-0.3,0.3c-0.2,0-0.3-0.1-0.3-0.3c0-0.2,0.1-0.3,0.3-0.3
				c0,0,0,0,0,0l-1.4-16.9c0,0-0.1,0-0.1,0c-0.1,0-0.3,0-0.4,0.1l-1,12.1l-0.3,2.4c0.2,0,0.3,0.1,0.3,0.3c0,0.2-0.1,0.3-0.3,0.3
				c-0.2,0-0.3-0.2-0.3-0.3c0-0.2,0.1-0.3,0.3-0.3c0,0,0,0,0,0l1.1-14.5c-0.1,0-0.2,0-0.3,0L103,351.1l-5,5.2c0,0,0.1,0.1,0.1,0.1
				c0,0.2-0.1,0.3-0.2,0.4C97.6,356.9,97.5,356.8,97.4,356.6z"
				/>
				<g>
					<radialGradient
						id="SVGID_10_"
						cx="1874.9363"
						cy="4794.6797"
						r="39.4902"
						gradientTransform="matrix(-0.525 0.849 -0.8483 -0.5273 5188.54 1296.4727)"
						gradientUnits="userSpaceOnUse"
					>
						<stop offset="0" style="stop-color:#F4D4D7" />
						<stop offset="1" style="stop-color:#FB879E" />
					</radialGradient>
					<path
						fill="url(#SVGID_10_)"
						d="M137.2,357.7c-1-5,10.7-19.7,23.4-19.6c5.7,0,21.5,1.6,21.2,5.5c-0.1,1.9-9.4,11-16.5,17.3
					C157.4,367.9,139.3,367.9,137.2,357.7z"
					/>
					<path
						fill="#F2E4E6"
						d="M158,340.9c0,0-8.5,0.8-15.8,11.8c-1.6,2.5-2.4,3-1.6,3.2c2.3-6.6,20.2-10.2,20.7-10.3
					c0,0-13.8,3.3-18.9,8.6c-0.3,0.3-1.8,2.4-0.6,2.1c1.1-0.2,8-2.3,8-2.3l0,0c-4.6,1.9-5.4,2-6.3,2.6c-0.5,0.4-0.4,1.1,0,1.2
					c1.5,0.3,7.7,0.7,17.5-2.5c0,0-11,4.5-18.2,3c-0.5-0.1-0.8,0.6-0.3,0.8c5.6,2.1,17.6,0.1,17.6,0.1s-11.1,2.2-16.3,0.8
					c-0.4-0.1-0.7,0.6-0.2,0.8c4.1,1.8,11.2,3,11.2,3c-6.5-0.8-9.1-1.7-10.9-2.1c-2.5-0.5,5.1,3.7,5.1,3.7s-9.5-1.5-11.2-6.8
					c-1.6-4.8,5.6-11.1,5.6-11.1s-3.2,4.2-3.5,6.4C139.5,356.1,147.5,341.8,158,340.9z"
					/>

					<radialGradient
						id="SVGID_11_"
						cx="1817.0367"
						cy="4820.7754"
						r="68.2547"
						gradientTransform="matrix(-0.525 0.849 -0.8483 -0.5273 5188.54 1296.4727)"
						gradientUnits="userSpaceOnUse"
					>
						<stop offset="0" style="stop-color:#FEEDF0" />
						<stop offset="0.6209" style="stop-color:#E05A6A" />
					</radialGradient>
					<path
						fill="url(#SVGID_11_)"
						d="M150.2,307.9c4.5-2.7,22.3,2.9,26.1,14.6c1.7,5.2,5.2,20.3,1.3,21.5c-1.9,0.6-13.5-4.7-21.8-9.1
					C146.7,330.1,141.1,313.5,150.2,307.9z"
					/>
					<path
						fill="#F2E4E6"
						d="M172.9,321c0,0-3.4-7.6-16.3-10.3c-2.9-0.6-3.7-1.1-3.6-0.3c7.1-0.2,16.1,14.9,16.3,15.4
					c0,0-7.5-11.5-14.1-14.3c-0.4-0.2-2.8-0.8-2.3,0.2c0.6,0.9,4.7,6.5,4.7,6.5h0c-3.3-3.6-3.6-4.3-4.4-4.9c-0.5-0.4-1.2,0-1.2,0.4
					c0.1,1.5,1.7,7.4,7.8,15.2c0,0-7.8-8.5-8.5-15.7c-0.1-0.5-0.8-0.5-0.8,0c-0.3,5.9,5.4,16.2,5.4,16.2s-5.6-9.4-5.8-14.7
					c0-0.4-0.8-0.4-0.9,0.2c-0.5,4.4,0.5,11.3,0.5,11.3c-1.3-6.3-1.2-9-1.4-10.7c-0.3-2.5-2,6-2,6s-1.5-9.2,3.1-12.8
					c4.2-3.2,12.4,1.2,12.4,1.2s-5-1.5-7.2-1C152.5,309.5,168.8,311.7,172.9,321z"
					/>

					<radialGradient
						id="SVGID_12_"
						cx="1786.6823"
						cy="4780.3447"
						r="41.5451"
						gradientTransform="matrix(-0.525 0.849 -0.8483 -0.5273 5188.54 1296.4727)"
						gradientUnits="userSpaceOnUse"
					>
						<stop offset="6.043960e-002" style="stop-color:#FEEDF0" />
						<stop offset="1" style="stop-color:#FB879E" />
					</radialGradient>
					<path
						fill="url(#SVGID_12_)"
						d="M197.9,301.1c4.4,2.3,7.9,20-0.3,29.2c-3.7,4.1-15.1,14.8-17.9,12.2c-1.4-1.3-2.3-13.7-2.4-22.8
					C177.2,309.6,188.9,296.4,197.9,301.1z"
					/>
					<path
						fill="#FFFFFF"
						d="M197.2,326.7c0,0,4.9-6.7,1.2-18.8c-0.8-2.7-0.8-3.6-1.4-3.1c3.5,5.8-5.3,21.1-5.6,21.5
					c0,0,6.4-12.1,5.7-19.1c0-0.5-0.6-2.8-1.2-1.8c-0.6,1-3.4,7.3-3.4,7.3l0,0c1.5-4.6,2-5.2,2.1-6.2c0.1-0.6-0.5-1-0.9-0.7
					c-1.2,0.9-5.6,5.2-9.4,14.3c0,0,3.7-10.8,9.5-15.2c0.4-0.3,0-0.9-0.4-0.7c-5.2,2.8-11.4,12.8-11.4,12.8s5.5-9.5,9.9-12.4
					c0.3-0.2,0-0.9-0.5-0.6c-4,1.8-9.5,6.3-9.5,6.3c4.8-4.3,7.1-5.6,8.6-6.7c2-1.5-6.1,1.5-6.1,1.5s7.2-6,12.4-4
					c4.7,1.8,4.7,11,4.7,11s-1.1-4.9-2.5-6.5C197.6,303.8,203.3,318.5,197.2,326.7z"
					/>

					<radialGradient
						id="SVGID_13_"
						cx="1816.7977"
						cy="4725.7183"
						r="23.3153"
						gradientTransform="matrix(-0.525 0.849 -0.8483 -0.5273 5188.54 1296.4727)"
						gradientUnits="userSpaceOnUse"
					>
						<stop offset="0" style="stop-color:#EDEDED" />
						<stop offset="1" style="stop-color:#FB879E" />
					</radialGradient>
					<path
						fill="url(#SVGID_13_)"
						d="M222.7,348.9c-1.5,5.1-19,13.2-30.1,7.3c-5-2.6-14.9-10.2-12.7-13.7c1-1.7,10.3-6.9,19.7-9.4
					C209.9,330.4,225.8,338.6,222.7,348.9z"
					/>
					<path
						fill="#F2E4E6"
						d="M196.3,354.9c0,0,7.9,3.2,19.6-3.7c2.6-1.5,3.6-1.7,2.9-2.2c-5.3,5-22.7,0.2-23.1,0
					c0,0,13.7,3.3,20.8,0.7c0.5-0.2,2.7-1.4,1.6-1.7c-1.1-0.3-8.1-1.6-8.1-1.6h0c5,0.4,5.7,0.7,6.8,0.5c0.7-0.1,0.9-0.8,0.6-1.1
					c-1.1-1-6.5-4.2-16.5-5.7c0,0,11.8,0.9,17.5,5.6c0.4,0.3,1-0.2,0.6-0.6c-3.9-4.5-15.4-8.1-15.4-8.1s10.8,3,14.7,6.7
					c0.3,0.3,0.9-0.2,0.6-0.7c-2.7-3.5-8.3-7.9-8.3-7.9c5.4,3.7,7.1,5.7,8.6,6.9c2,1.6-2.7-5.7-2.7-5.7s7.6,5.7,6.6,11.4
					c-0.9,5.2-10.3,7.6-10.3,7.6s4.9-2.4,6.2-4.2C219.9,349.4,206,358.9,196.3,354.9z"
					/>

					<radialGradient
						id="SVGID_14_"
						cx="1873.979"
						cy="4727.2314"
						r="57.5237"
						gradientTransform="matrix(-0.525 0.849 -0.8483 -0.5273 5188.54 1296.4727)"
						gradientUnits="userSpaceOnUse"
					>
						<stop offset="0" style="stop-color:#F4D4D7" />
						<stop offset="0.7198" style="stop-color:#E05A6A" />
					</radialGradient>
					<path
						fill="url(#SVGID_14_)"
						d="M186.4,386c-5.3,0.1-17.5-13.8-14.6-26c1.3-5.5,6.3-20.5,10.2-19.6c1.9,0.5,9.1,11,13.8,19
					C201,368.3,197.1,385.7,186.4,386z"
					/>
					<path
						fill="#FEEDF0"
						d="M173.9,363c0,0-1.1,8.4,8.5,17.3c2.2,2,2.5,2.8,2.9,2.1c-6.2-3.4-5.9-21.3-5.9-21.8
					c0,0,0.3,13.9,4.6,19.8c0.3,0.4,2,2.1,2,1c0-1.1-0.6-8.1-0.6-8.1l0,0c0.9,4.8,0.8,5.6,1.2,6.5c0.3,0.6,1,0.6,1.2,0.2
					c0.7-1.4,2.4-7.4,1.3-17.3c0,0,2.1,11.4-1,18.1c-0.2,0.5,0.4,0.9,0.7,0.4c3.3-5,3.9-17,3.9-17s-0.2,11.1-2.7,15.9
					c-0.2,0.3,0.5,0.8,0.8,0.3c2.7-3.6,5.5-10.2,5.5-10.2c-2.2,6.2-3.7,8.5-4.5,10.1c-1,2.3,4.9-4.3,4.9-4.3s-3.6,8.9-9.3,9.7
					c-5.3,0.7-10-7.4-10-7.4s3.5,3.9,5.7,4.5C185.3,383.5,172.5,373.3,173.9,363z"
					/>
					<path
						fill="#FFFFFF"
						d="M202.5,362.2c-0.1-0.2,0-0.3,0.1-0.4l-18.8-16.4l8.3,9.9l1.7,2.2c0,0,0-0.1,0.1-0.1
					c0.2-0.1,0.4,0,0.5,0.1c0.1,0.2,0,0.4-0.1,0.5c-0.2,0.1-0.4,0-0.5-0.1c-0.1-0.1,0-0.3,0.1-0.4l-11.1-13.1l-0.2-0.2l9.3,13.5
					l2,3.1c0.2-0.1,0.4,0,0.5,0.2c0.1,0.2,0,0.4-0.1,0.5c-0.2,0.1-0.4,0-0.5-0.1c-0.1-0.2,0-0.4,0.1-0.5c0,0,0,0,0,0l-12-17.1
					l-0.2,0.7l6.5,13.5l1.1,2.6c0.2-0.1,0.4,0,0.4,0.2c0.1,0.2,0,0.4-0.1,0.5c-0.2,0.1-0.4,0-0.5-0.2c-0.1-0.2,0-0.4,0.2-0.5
					c0,0,0,0,0,0l-7.6-15.7l-4,18.3l-2,8.3c0,0,0.1,0,0.1,0.1c0.1,0.1,0.1,0.4,0,0.5c-0.1,0.1-0.4,0.1-0.5,0c-0.1-0.2-0.1-0.4,0-0.5
					c0.1-0.1,0.3-0.1,0.4,0l5.6-26.2l-7.3,14.7l-1.7,3.3c0,0,0.1,0,0.1,0.1c0.1,0.2,0.1,0.4,0,0.5c-0.2,0.1-0.4,0.1-0.5,0
					c-0.1-0.1-0.1-0.4,0-0.5c0.1-0.1,0.2-0.1,0.4-0.1l9.2-18.8l-0.2-0.4l-0.4,0.6l-8.3,16.5l-3.9,7.4c0,0,0,0,0.1,0
					c0.1,0.1,0.1,0.4,0,0.5c-0.1,0.1-0.4,0.1-0.5,0c-0.1-0.2-0.1-0.4,0-0.5c0.1-0.1,0.3-0.1,0.4,0l11.1-22.3l-7.5,10.5l-1.7,2.2
					c0,0,0.1,0,0.1,0c0.1,0.2,0.1,0.4,0,0.5c-0.1,0.1-0.4,0.1-0.5,0c-0.1-0.1-0.1-0.4,0-0.5c0.1-0.1,0.3-0.1,0.4,0l9.9-14l0.1-0.2
					l-10.7,12.4l-2.5,2.7c0.1,0.1,0.1,0.4,0,0.5c-0.1,0.1-0.4,0.1-0.5,0c-0.1-0.2-0.1-0.4,0-0.5c0.1-0.1,0.4-0.1,0.5,0c0,0,0,0,0,0
					l13.7-16.1l0.1-0.1l-0.1-0.3l0,0l-0.1,0.1l0.1,0.2l-0.4,0.1l-11.7,9.9l-2.3,1.8c0.1,0.2,0.1,0.3,0,0.5c-0.1,0.1-0.4,0.1-0.5,0
					c-0.1-0.2-0.1-0.4,0-0.5c0.1-0.1,0.4-0.1,0.5,0c0,0,0,0,0,0l13.5-11.5l-19.4,4.4l-8.4,1.7c0,0,0,0.1,0,0.1
					c-0.1,0.2-0.3,0.3-0.5,0.2c-0.2-0.1-0.3-0.3-0.2-0.5c0.1-0.2,0.3-0.3,0.5-0.2c0.1,0.1,0.2,0.2,0.2,0.3l26.1-6.1l-16.4-0.3
					l-3.7-0.2c0,0,0,0.1,0,0.2c-0.1,0.2-0.3,0.3-0.5,0.2c-0.2-0.1-0.3-0.3-0.2-0.5c0.1-0.2,0.3-0.3,0.5-0.2c0.1,0,0.2,0.2,0.2,0.3
					l21.2,0.3l0.9-0.2l-1.7-0.3l-18.5-0.5l-8.3-0.4c0,0,0,0,0,0.1c-0.1,0.2-0.3,0.3-0.5,0.2c-0.2-0.1-0.3-0.3-0.2-0.5
					c0.1-0.2,0.3-0.3,0.5-0.2c0.2,0.1,0.2,0.2,0.2,0.4l24.9,0.5l-12.7-2.3l-2.7-0.6c0,0,0,0.1,0,0.1c-0.1,0.2-0.3,0.3-0.5,0.2
					c-0.2-0.1-0.3-0.3-0.2-0.5c0.1-0.2,0.3-0.3,0.5-0.2c0.1,0.1,0.2,0.2,0.2,0.4l16.9,2.9h0.2l-15.8-4.4l-3.5-1.1
					c-0.1,0.2-0.3,0.3-0.5,0.2c-0.2-0.1-0.3-0.3-0.2-0.5c0.1-0.2,0.3-0.3,0.5-0.2c0.2,0.1,0.3,0.3,0.2,0.5c0,0,0,0,0,0l20.5,5.5
					l0.9,0l-15.1-6.9l-2.6-1.3c-0.1,0.2-0.3,0.2-0.4,0.2c-0.2-0.1-0.3-0.3-0.2-0.5c0.1-0.2,0.3-0.3,0.5-0.2c0.2,0.1,0.3,0.3,0.2,0.5
					c0,0,0,0,0,0l17.7,8l0,0.2l0.1,0l0.1-0.2l0.1,0.1l0.1-0.6l-0.4-0.5l0.1,0.1l-0.1,0.2l0.2,0.2l-0.1,0.3l-16.8-12.4l-6.8-5.2
					c0,0,0,0.1-0.1,0.1c-0.2,0.1-0.4,0-0.5-0.2c-0.1-0.2,0-0.4,0.2-0.5c0.2-0.1,0.4,0,0.5,0.2c0,0.1,0,0.3-0.1,0.4l21.6,15.8
					l-10.5-12.6l-2.3-2.9c0,0-0.1,0.1-0.1,0.1c-0.2,0.1-0.4,0-0.5-0.2c-0.1-0.2,0-0.4,0.2-0.5c0.2-0.1,0.4,0,0.5,0.2
					c0,0.1,0,0.3-0.1,0.4l13.7,16.3l0.8,0.6l-0.9-1.5l-11.7-14.3l-5.2-6.6c0,0,0,0,0,0c-0.2,0.1-0.4,0-0.5-0.2
					c-0.1-0.2,0-0.4,0.2-0.5c0.2-0.1,0.4,0,0.5,0.2c0.1,0.2,0,0.3-0.2,0.4l15.9,19.3l-6.6-11.2l-1.3-2.5c0,0,0,0.1-0.1,0.1
					c-0.2,0.1-0.4,0-0.5-0.2c-0.1-0.2,0-0.4,0.2-0.5c0.2-0.1,0.4,0,0.5,0.2c0.1,0.1,0,0.3-0.1,0.4l8.8,14.7l0.2,0.2l-7-14.8
					l-1.5-3.4c-0.2,0-0.4,0-0.4-0.2c-0.1-0.2,0-0.4,0.2-0.5c0.2-0.1,0.4,0,0.5,0.2c0.1,0.2,0,0.4-0.2,0.5c0,0,0,0,0,0l9.2,19.1
					l0.6,0.7l-4.6-15.9l-0.7-2.8c-0.2,0-0.4,0-0.4-0.2c-0.1-0.2,0-0.4,0.2-0.5c0.2-0.1,0.4,0,0.5,0.2c0.1,0.2,0,0.4-0.2,0.5
					c0,0,0,0,0,0l5.4,18.1l1.8-19l1-8.5c0,0-0.1,0-0.1,0c-0.1-0.1-0.2-0.4,0-0.5c0.1-0.2,0.4-0.2,0.5,0c0.2,0.1,0.2,0.4,0,0.5
					c-0.1,0.1-0.2,0.1-0.4,0.1l-2.5,26.7l5.5-15.4l1.3-3.4c-0.1,0-0.1,0-0.1,0c-0.2-0.1-0.2-0.4,0-0.5c0.1-0.2,0.4-0.2,0.5,0
					c0.2,0.1,0.2,0.4,0,0.5c-0.1,0.1-0.2,0.1-0.4,0.1l-7,20.1l-0.1,0.9l0,0l0.8-1.5l6.3-17.4l3-7.8c0,0,0,0-0.1,0
					c-0.2-0.1-0.2-0.4,0-0.5c0.1-0.2,0.4-0.2,0.5,0c0.2,0.1,0.2,0.4,0,0.5c-0.1,0.1-0.3,0.1-0.4,0.1l-8.4,23.5l6.2-11.4l1.4-2.4
					c0,0-0.1,0-0.1,0c-0.2-0.1-0.2-0.4,0-0.5c0.1-0.2,0.4-0.2,0.5,0c0.2,0.1,0.2,0.4,0,0.5c-0.1,0.1-0.3,0.1-0.4,0.1l-8.1,15.1
					l-0.1,0.2l9.1-13.6l2.1-3c-0.1-0.1-0.2-0.3,0-0.5c0.1-0.2,0.4-0.2,0.5,0c0.1,0.1,0.2,0.4,0,0.5c-0.1,0.2-0.4,0.2-0.5,0
					c0,0,0,0,0,0L182,341.6l0,0.1l0.9-0.5l10.2-10.9l2-2c-0.1-0.1-0.1-0.3,0-0.5c0.1-0.2,0.4-0.2,0.5,0c0.2,0.1,0.2,0.4,0,0.5
					c-0.1,0.2-0.4,0.2-0.5,0c0,0,0,0,0,0l-11.6,12.5l15.9-8.8l7.6-4c0,0,0-0.1,0-0.1c0-0.2,0.2-0.4,0.4-0.3c0.2,0,0.4,0.2,0.3,0.4
					c0,0.2-0.2,0.4-0.4,0.3c-0.1,0-0.2-0.1-0.3-0.3l-23.4,13.1l15.8-4.2l3.6-0.8c0,0-0.1-0.1,0-0.2c0-0.2,0.2-0.3,0.4-0.3
					c0.2,0,0.3,0.2,0.3,0.4c0,0.2-0.2,0.4-0.4,0.3c-0.1,0-0.2-0.1-0.3-0.2l-20.3,5.6l-0.4,0.4l1.1-0.1l17.9-4.6l8.1-1.9
					c0,0,0,0,0-0.1c0-0.2,0.2-0.4,0.4-0.3c0.2,0,0.3,0.2,0.3,0.4c0,0.2-0.2,0.3-0.4,0.3c-0.2,0-0.3-0.2-0.3-0.3l-24.1,6.3l12.9-1.3
					l2.8-0.2c0,0,0-0.1,0-0.1c0-0.2,0.2-0.3,0.4-0.3c0.2,0,0.4,0.2,0.3,0.4c0,0.2-0.2,0.3-0.4,0.3c-0.2,0-0.3-0.1-0.3-0.3l-17,1.8
					l-0.2,0.1l16.4-0.1l3.7,0.1c0-0.2,0.2-0.3,0.4-0.3c0.2,0,0.3,0.2,0.3,0.4c0,0.2-0.2,0.4-0.4,0.3c-0.2,0-0.4-0.2-0.3-0.4
					c0,0,0,0,0,0l-21.2,0.3l-0.2,0.1l0.8,0.4l15,2.2l2.8,0.5c0-0.2,0.2-0.3,0.4-0.3c0.2,0,0.4,0.2,0.3,0.4c0,0.2-0.2,0.3-0.4,0.3
					c-0.2,0-0.4-0.2-0.3-0.4c0,0,0,0,0,0l-17.1-2.5l16,8.2l7.5,4c0,0,0-0.1,0.1-0.1c0.2-0.1,0.4,0,0.5,0.1c0.1,0.2,0,0.4-0.1,0.5
					c-0.2,0.1-0.4,0-0.5-0.1c-0.1-0.1,0-0.3,0.1-0.4l-23.9-12.1l12.4,10.8l2.7,2.5c0,0,0-0.1,0.1-0.1c0.2-0.1,0.4,0,0.5,0.1
					c0.1,0.2,0,0.4-0.1,0.5c-0.2,0.1-0.4,0-0.5-0.1c-0.1-0.1,0-0.3,0-0.4l-15.9-13.6l-0.6-0.1l0.6,0.7l13.9,12.2l6.2,5.7
					c0,0,0,0,0-0.1c0.2-0.1,0.4,0,0.5,0.2c0.1,0.2,0,0.4-0.2,0.5C202.8,362.4,202.6,362.4,202.5,362.2z M181.4,343.9l0.1-0.5
					l-0.1-0.1l-0.2,0.3L181.4,343.9z M181.3,342.4L181.3,342.4L181.3,342.4L181.3,342.4L181.3,342.4z M181,343L181,343l-0.1-0.2
					L181,343z M181.2,342.6l0-0.1L181.2,342.6L181.2,342.6z M180.1,342.7l0.1,0l0.1,0.2l0.3-0.2L180.1,342.7z M182.2,342l-0.4,0.2
					l0,0l0.2,0L182.2,342z M182,342.8L182,342.8l0.2,0.1L182,342.8z"
					/>
					<path
						fill="#E05A6A"
						d="M168.8,364.8c-0.1-0.2,0-0.3,0.2-0.4c0.1-0.1,0.2,0,0.3,0.1l11-18.6c-0.1-0.1-0.2-0.1-0.2-0.2l-9,9.1
					l-2.3,2.2c0,0,0.1,0,0.1,0.1c0.1,0.2,0,0.3-0.2,0.4c-0.2,0.1-0.3,0-0.4-0.1c-0.1-0.2,0-0.3,0.1-0.4c0.1-0.1,0.2,0,0.3,0.1
					l11.2-11.4c-0.1-0.1-0.2-0.2-0.3-0.4l-10.2,10.1l-5.2,4.9c0,0,0,0,0,0c0.1,0.2,0,0.3-0.2,0.4c-0.2,0.1-0.3,0-0.4-0.2
					c-0.1-0.2,0-0.3,0.2-0.4c0.1-0.1,0.3,0,0.4,0.1l15-15l-8.9,6.5l-2,1.3c0,0,0,0,0.1,0.1c0.1,0.1,0,0.3-0.1,0.4
					c-0.2,0.1-0.3,0-0.4-0.2c-0.1-0.2,0-0.3,0.2-0.4c0.1-0.1,0.2,0,0.3,0.1l11-8.1c0,0,0,0,0-0.1c0,0,0,0,0-0.1l-11,6.5l-2.7,1.5
					c0.1,0.1,0,0.3-0.2,0.4c-0.2,0.1-0.3,0-0.4-0.2c-0.1-0.2,0-0.3,0.1-0.4c0.2-0.1,0.3,0,0.4,0.2c0,0,0,0,0,0l13.7-8.3
					c-0.1-0.2-0.1-0.4-0.2-0.6l-10.6,4.2l-2.3,0.8c0,0.1,0,0.3-0.2,0.4c-0.2,0.1-0.3,0-0.4-0.2c-0.1-0.2,0-0.3,0.2-0.4
					c0.2-0.1,0.3,0,0.4,0.2c0,0,0,0,0,0l12.9-5.2c0-0.2,0-0.4,0-0.6l-15.7-1.5l-7.2-0.9c0,0,0,0.1,0,0.1c-0.1,0.1-0.3,0.1-0.4,0
					c-0.1-0.1-0.1-0.3,0-0.4c0.1-0.1,0.3-0.1,0.4,0c0.1,0.1,0.1,0.2,0.1,0.3l22.7,2.1l-13.1-4.7l-2.9-1.1c0,0,0,0.1,0,0.1
					c-0.1,0.1-0.3,0.2-0.4,0c-0.1-0.1-0.1-0.3,0-0.4c0.1-0.1,0.3-0.2,0.4,0c0.1,0.1,0.1,0.2,0.1,0.3l16.3,5.7c0-0.1,0.1-0.3,0.1-0.4
					l-14.6-5.3l-6.7-2.6c0,0,0,0,0,0.1c-0.1,0.1-0.3,0.2-0.4,0c-0.1-0.1-0.1-0.3,0-0.4c0.1-0.1,0.3-0.1,0.4,0
					c0.1,0.1,0.1,0.2,0.1,0.4l20,7.2l-9.7-5.3l-2-1.2c0,0,0,0.1,0,0.1c-0.1,0.1-0.3,0.1-0.4,0c-0.1-0.1-0.1-0.3,0-0.4
					c0.1-0.1,0.3-0.1,0.4,0c0.1,0.1,0.1,0.2,0.1,0.3l12.9,7l0.2,0.1l-11.6-7.8l-2.5-1.8c-0.1,0.1-0.3,0.1-0.4,0
					c-0.1-0.1-0.1-0.3,0-0.4c0.1-0.1,0.3-0.1,0.4,0c0.1,0.1,0.2,0.3,0,0.4c0,0,0,0,0,0l14.2,9.4c0.1-0.1,0.2-0.3,0.3-0.4l-9-8.4
					l-1.7-1.7c-0.1,0.1-0.3,0.1-0.4,0c-0.1-0.1-0.2-0.3,0-0.4c0.1-0.1,0.3-0.1,0.4,0c0.1,0.1,0.1,0.3,0,0.4c0,0,0,0,0,0l10.8,10
					c0.1-0.1,0.2-0.3,0.4-0.4l-9.2-13l-4.1-6c0,0-0.1,0-0.1,0c-0.2,0-0.3-0.1-0.3-0.3c0-0.2,0.1-0.3,0.3-0.3c0.2,0,0.3,0.1,0.3,0.3
					c0,0.1-0.1,0.2-0.2,0.3l13.2,18.6l-5-13l-1-3c0,0-0.1,0.1-0.1,0.1c-0.2,0-0.3-0.1-0.3-0.3c0-0.2,0.1-0.3,0.3-0.3
					c0.2,0,0.3,0.1,0.3,0.3c0,0.1-0.1,0.2-0.2,0.3l6.4,16.2c0.1-0.1,0.2-0.1,0.2-0.2c0,0,0.1,0,0.1,0l-5.6-14.7l-2.4-6.7
					c0,0,0,0,0,0c-0.2,0-0.3-0.1-0.3-0.3c0-0.2,0.1-0.3,0.3-0.3c0.2,0,0.3,0.1,0.3,0.3c0,0.1-0.1,0.3-0.2,0.3l7.6,19.9l-2.3-10.8
					l-0.4-2.3c0,0,0,0-0.1,0c-0.2,0-0.3-0.1-0.3-0.3c0-0.2,0.1-0.3,0.3-0.3c0.2,0,0.3,0.1,0.3,0.3c0,0.1-0.1,0.2-0.2,0.3l3.2,14.3
					l0.1,0.2l-1.7-13.9l-0.3-3.1c-0.2,0-0.3-0.1-0.3-0.3c0-0.2,0.1-0.3,0.3-0.3c0.2,0,0.3,0.1,0.3,0.3c0,0.2-0.1,0.3-0.3,0.3
					c0,0,0,0,0,0l2.2,17.1c0.2,0,0.3-0.1,0.5-0.1l0.5-12.4l0.2-2.4c-0.1,0-0.3-0.1-0.3-0.3c0-0.2,0.1-0.3,0.3-0.3
					c0.2,0,0.3,0.1,0.3,0.3c0,0.2-0.1,0.3-0.3,0.3c0,0,0,0,0,0L182,340c0.2,0,0.3,0,0.5,0l6.1-13.6l3.1-6.6c0,0-0.1,0-0.1-0.1
					c-0.1-0.1,0-0.3,0.1-0.4c0.1-0.1,0.3,0,0.4,0.1c0.1,0.1,0,0.3-0.1,0.4c-0.1,0.1-0.2,0-0.3,0l-8.9,20.2c0.1,0,0.1,0,0.2,0
					l8.1-10.4l2-2.4c0,0-0.1,0-0.1-0.1c-0.1-0.1,0-0.3,0.1-0.4c0.1-0.1,0.3,0,0.4,0.1c0.1,0.1,0,0.3-0.1,0.4c-0.1,0.1-0.2,0-0.3,0
					l-9.9,12.8c0.1,0.1,0.3,0.1,0.4,0.2l9-11.3l4.6-5.5c0,0,0,0,0,0c-0.1-0.2,0-0.3,0.1-0.4c0.1-0.1,0.3,0,0.4,0.1
					c0.1,0.2,0,0.3-0.1,0.4c-0.1,0.1-0.3,0-0.4-0.1L184,340.3l8.1-7.5l1.8-1.5c0,0,0,0-0.1-0.1c-0.1-0.1,0-0.3,0.1-0.4
					c0.1-0.1,0.3,0,0.4,0.1c0.1,0.2,0,0.3-0.1,0.4c-0.1,0.1-0.2,0-0.3,0l-9.9,9.3c0,0,0.1,0.1,0.1,0.1l10.1-7.7l2.5-1.8
					c-0.1-0.1,0-0.3,0.1-0.4c0.1-0.1,0.3,0,0.4,0.1c0.1,0.2,0,0.3-0.1,0.4c-0.1,0.1-0.3,0-0.4-0.1c0,0,0,0,0,0l-12.4,9.7
					c0.2,0.2,0.3,0.3,0.5,0.5l9.6-5.2l2.2-1.1c-0.1-0.1,0-0.3,0.1-0.4c0.2-0.1,0.3,0,0.4,0.1c0.1,0.1,0,0.3-0.1,0.4
					c-0.1,0.1-0.3,0-0.4-0.1c0,0,0,0,0,0l-11.7,6.4c0.1,0.1,0.1,0.2,0.2,0.3l14-2.6l7.2-1.2c0,0,0-0.1,0-0.1
					c0.1-0.2,0.3-0.2,0.4-0.2c0.2,0.1,0.2,0.3,0.2,0.4c-0.1,0.2-0.3,0.2-0.4,0.2c-0.1-0.1-0.2-0.2-0.2-0.3l-21.1,4
					c0,0.1,0.1,0.2,0.1,0.3l12.5,0.8l3.1,0.3c0,0,0-0.1,0-0.1c0.1-0.2,0.3-0.2,0.4-0.2c0.2,0.1,0.2,0.3,0.2,0.4
					c-0.1,0.2-0.3,0.2-0.4,0.2c-0.1,0-0.2-0.2-0.2-0.3l-15.6-0.9c0,0.2,0.1,0.3,0.1,0.5l13.8,1l7.1,0.6c0,0,0,0,0-0.1
					c0.1-0.2,0.3-0.2,0.4-0.2c0.2,0.1,0.2,0.3,0.2,0.4c-0.1,0.2-0.3,0.2-0.4,0.2c-0.1-0.1-0.2-0.2-0.2-0.3l-20.9-1.4c0,0,0,0,0,0
					l10.4,2.3l2.3,0.6c0,0,0,0,0-0.1c0.1-0.2,0.3-0.2,0.4-0.2c0.1,0.1,0.2,0.3,0.2,0.4c-0.1,0.2-0.3,0.2-0.4,0.2
					c-0.1-0.1-0.2-0.2-0.2-0.3l-12.7-2.8c0,0.1,0,0.1,0,0.2l11.6,3.8l2.9,1.1c0.1-0.1,0.2-0.2,0.4-0.1c0.2,0.1,0.2,0.3,0.2,0.4
					c-0.1,0.2-0.3,0.2-0.4,0.2c-0.2-0.1-0.2-0.3-0.2-0.4c0,0,0,0,0,0l-14.5-4.6c-0.1,0.3-0.1,0.5-0.3,0.7l9.4,4.8l2.1,1.2
					c0.1-0.1,0.2-0.2,0.4-0.1c0.2,0.1,0.2,0.3,0.2,0.4c-0.1,0.2-0.3,0.2-0.4,0.2c-0.1-0.1-0.2-0.3-0.2-0.4c0,0,0,0,0,0l-11.6-5.8
					c-0.1,0.2-0.2,0.3-0.3,0.5l9.5,9.6l5,5.3c0,0,0.1,0,0.1-0.1c0.2,0,0.3,0.1,0.4,0.3c0,0.2-0.1,0.3-0.3,0.4
					c-0.2,0-0.3-0.1-0.4-0.2c0-0.1,0.1-0.2,0.2-0.3l-14.6-14.8c-0.1,0.1-0.2,0.2-0.4,0.3l6,10.2l1.5,2.8c0,0,0.1-0.1,0.1-0.1
					c0.2,0,0.3,0.1,0.4,0.3c0,0.2-0.1,0.3-0.3,0.4c-0.2,0-0.3-0.1-0.4-0.3c0-0.1,0-0.2,0.1-0.3L184,346c-0.1,0.1-0.2,0.1-0.3,0.2
					c0,0-0.1,0-0.1,0.1l6.7,11.5l3.5,6.3c0,0,0,0,0.1,0c0.2,0,0.3,0.1,0.4,0.3c0,0.2-0.1,0.3-0.3,0.4c-0.2,0-0.3-0.1-0.4-0.3
					c0-0.1,0.1-0.3,0.2-0.3l-10.4-17.7c0,0-0.1,0-0.1,0l3.8,9.6l0.8,2.3c0,0,0,0,0.1,0c0.2,0,0.3,0.1,0.4,0.3c0,0.2-0.1,0.3-0.3,0.4
					c-0.2,0-0.3-0.1-0.4-0.3c0-0.1,0.1-0.2,0.2-0.3l-4.7-11.8c-0.1,0-0.2,0-0.2,0l3.3,11.4l0.8,3c0.2,0,0.3,0.1,0.3,0.2
					c0,0.2-0.1,0.3-0.3,0.4c-0.2,0-0.3-0.1-0.4-0.3c0-0.2,0.1-0.3,0.3-0.4c0,0,0,0,0,0l-4.3-14.4c-0.3,0-0.6,0-0.8,0l1.3,10.5
					l0.2,2.4c0.2,0,0.3,0.1,0.3,0.2c0,0.2-0.1,0.3-0.3,0.4c-0.2,0-0.3-0.1-0.4-0.3c0-0.2,0.1-0.3,0.3-0.4c0,0,0,0,0,0l-1.7-12.9
					c-0.4-0.1-0.7-0.3-1.1-0.5l-7.4,12.3l-3.9,6.2c0,0,0.1,0,0.1,0.1c0.1,0.2,0,0.3-0.2,0.4C169.1,365,168.9,364.9,168.8,364.8z"
					/>
				</g>
				<path
					fill="#E05A6A"
					d="M124.8,313.3c0.1-0.1,0.3-0.1,0.4,0l10.7-17.4c0,0-0.1,0-0.1-0.1l-6.6,7.7l-1.6,1.7c0,0,0,0,0.1,0
				c0.1,0.1,0.1,0.3-0.1,0.4c-0.1,0.1-0.3,0.1-0.4-0.1c-0.1-0.1-0.1-0.3,0-0.4c0.1-0.1,0.2-0.1,0.4,0l8.1-9.5
				c-0.1,0-0.2-0.1-0.2-0.1l-8.3,8.1l-2.3,2.1c0.1,0.1,0.1,0.3-0.1,0.4c-0.1,0.1-0.3,0.1-0.4-0.1c-0.1-0.1-0.1-0.3,0.1-0.4
				c0.1-0.1,0.3-0.1,0.4,0.1c0,0,0,0,0,0l10.5-10.3c-0.1-0.1-0.2-0.2-0.3-0.3c-0.1-0.1-0.2-0.2-0.3-0.3l-8.1,5.7l-2.1,1.3
				c0.1,0.1,0.1,0.3-0.1,0.4c-0.1,0.1-0.3,0.1-0.4-0.1c-0.1-0.1-0.1-0.3,0.1-0.4c0.1-0.1,0.3-0.1,0.4,0.1c0,0,0,0,0,0l10.1-7.1
				c-0.2-0.4-0.4-0.8-0.5-1.2l-14,1.9l-7.2,0.8c0,0,0,0.1,0,0.1c-0.1,0.2-0.3,0.2-0.4,0.1c-0.2-0.1-0.2-0.3-0.1-0.4
				c0.1-0.2,0.3-0.2,0.4-0.1c0.1,0.1,0.2,0.2,0.1,0.3l21.3-3c0-0.1,0-0.2,0-0.3l-12.5-1.4l-3.1-0.4c0,0,0,0.1,0,0.1
				c-0.1,0.2-0.3,0.2-0.4,0.1c-0.2-0.1-0.2-0.3-0.1-0.4c0.1-0.2,0.3-0.2,0.4-0.1c0.1,0,0.1,0.2,0.2,0.3l15.7,1.6
				c0-0.1,0-0.3,0.1-0.4l-14-1.6l-7.1-1c0,0,0,0,0,0.1c-0.1,0.2-0.3,0.2-0.4,0.1c-0.2-0.1-0.2-0.3-0.1-0.4c0.1-0.2,0.3-0.2,0.4-0.1
				c0.1,0.1,0.2,0.2,0.1,0.3l21.1,2.4l-10.6-2.9l-2.3-0.7c0,0,0,0.1,0,0.1c-0.1,0.2-0.3,0.2-0.4,0.1c-0.2-0.1-0.2-0.3-0.1-0.4
				c0.1-0.2,0.3-0.2,0.4-0.1c0.1,0.1,0.2,0.2,0.1,0.3l13,3.5c0-0.1,0-0.1,0.1-0.2l-11.8-4.4l-2.9-1.2c-0.1,0.1-0.2,0.2-0.4,0.1
				c-0.2-0.1-0.2-0.3-0.1-0.4c0.1-0.2,0.3-0.2,0.4-0.1c0.2,0.1,0.2,0.3,0.1,0.4c0,0,0,0,0,0l14.7,5.4c0.1-0.2,0.2-0.4,0.4-0.6
				l-9.7-5.5l-2.1-1.3c-0.1,0.1-0.2,0.2-0.4,0.1c-0.2-0.1-0.2-0.3-0.1-0.4c0.1-0.2,0.3-0.2,0.4-0.1c0.2,0.1,0.2,0.3,0.1,0.4
				c0,0,0,0,0,0l11.9,6.7c0.1-0.1,0.2-0.2,0.2-0.3c0.1-0.1,0.2-0.2,0.3-0.3l-11.3-10l-5.4-5c0,0,0,0.1-0.1,0.1
				c-0.2,0-0.3-0.1-0.4-0.2c0-0.2,0.1-0.3,0.2-0.4c0.2,0,0.3,0.1,0.4,0.2c0,0.1,0,0.2-0.1,0.3l16.8,14.7c0,0,0.1,0,0.1-0.1
				l-7.7-11.1l-1.7-2.6c0,0-0.1,0.1-0.1,0.1c-0.2,0-0.3-0.1-0.4-0.2c0-0.2,0.1-0.3,0.2-0.4c0.2,0,0.3,0.1,0.4,0.2
				c0,0.1,0,0.2-0.1,0.3l9.6,13.7c0.1-0.1,0.3-0.1,0.4-0.2l-8.5-12.5l-3.9-6c0,0,0,0,0,0c-0.2,0-0.3-0.1-0.4-0.2
				c0-0.2,0.1-0.3,0.2-0.4c0.2,0,0.3,0.1,0.4,0.2c0,0.1,0,0.3-0.2,0.3l12,17.6l-4.8-10l-0.9-2.2c0,0,0,0-0.1,0
				c-0.2,0-0.3-0.1-0.4-0.2c0-0.2,0.1-0.3,0.2-0.4c0.2,0,0.3,0.1,0.4,0.2c0,0.1,0,0.3-0.1,0.3l6.3,13c0,0,0,0,0.1,0l-4.7-12.8l-1-3
				c-0.2,0-0.3-0.1-0.4-0.2c0-0.2,0.1-0.3,0.2-0.4c0.2,0,0.3,0.1,0.4,0.2c0,0.2-0.1,0.3-0.2,0.4c0,0,0,0,0,0l5.9,15.7
				c0.2,0,0.4,0,0.5,0l-2.3-11.9l-0.4-2.4c-0.2,0-0.3-0.1-0.3-0.2c0-0.2,0.1-0.3,0.2-0.4c0.2,0,0.3,0.1,0.4,0.2
				c0,0.2-0.1,0.3-0.2,0.4c0,0,0,0,0,0l2.9,14.4c0.2,0,0.4,0,0.6,0.1l2.8-14.6l1.5-7.1c0,0-0.1,0-0.1,0c-0.1-0.1-0.1-0.3,0-0.4
				c0.1-0.1,0.3-0.1,0.4,0c0.1,0.1,0.1,0.3,0,0.4c-0.1,0.1-0.2,0.1-0.3,0l-4,21.8c0.1,0,0.1,0,0.2,0l5.6-12.1l1.4-2.8
				c0,0-0.1,0-0.1-0.1c-0.1-0.1-0.1-0.3,0-0.4c0.1-0.1,0.3-0.1,0.4,0c0.1,0.1,0.1,0.3,0,0.4c-0.1,0.1-0.2,0.1-0.3,0.1l-6.8,15
				c0.1,0.1,0.3,0.1,0.4,0.2l6.3-13.4l3.2-6.4c0,0,0,0-0.1,0c-0.1-0.1-0.1-0.3,0-0.4c0.1-0.1,0.3-0.1,0.4,0c0.1,0.1,0.1,0.3,0,0.4
				c-0.1,0.1-0.3,0.1-0.4,0l-8.9,19.3l6.1-9.2l1.4-1.9c0,0,0,0-0.1,0c-0.1-0.1-0.1-0.3,0-0.4c0.1-0.1,0.3-0.1,0.4,0
				c0.1,0.1,0.1,0.3,0,0.4c-0.1,0.1-0.2,0.1-0.3,0l-7.8,11.8c0,0,0.1,0,0.1,0.1L148,280l2-2.4c-0.1-0.1-0.1-0.3,0-0.4
				c0.1-0.1,0.3-0.1,0.4,0c0.1,0.1,0.1,0.3,0,0.4c-0.1,0.1-0.3,0.1-0.4,0c0,0,0,0,0,0l-10.2,12.8c0,0,0.1,0.1,0.1,0.1
				c0.1,0.1,0.2,0.2,0.3,0.4l8.8-7.8l1.9-1.6c-0.1-0.1-0.1-0.3,0-0.4c0.1-0.1,0.3-0.1,0.4,0c0.1,0.1,0.1,0.3,0,0.4
				c-0.1,0.1-0.3,0.1-0.4,0c0,0,0,0,0,0l-10.5,9.5c0,0,0,0.1,0.1,0.1l13.9-6.1l6.7-2.8c0,0,0-0.1,0-0.1c0-0.2,0.2-0.3,0.4-0.3
				c0.2,0,0.3,0.2,0.2,0.4c0,0.2-0.2,0.3-0.4,0.2c-0.1,0-0.2-0.1-0.2-0.3l-20.5,9.2c0,0,0,0.1,0,0.1l13.4-2.3l3.1-0.4
				c0,0,0-0.1,0-0.1c0-0.2,0.2-0.3,0.4-0.3c0.2,0,0.3,0.2,0.3,0.4c0,0.2-0.2,0.3-0.4,0.3c-0.1,0-0.2-0.1-0.2-0.2l-16.4,3
				c0,0.1,0.1,0.3,0.1,0.4l14.8-2.4l7-1c0,0,0,0,0-0.1c0-0.2,0.2-0.3,0.4-0.3c0.2,0,0.3,0.2,0.3,0.4c0,0.2-0.2,0.3-0.4,0.3
				c-0.1,0-0.2-0.2-0.2-0.3l-20.9,3.6l11-0.1l2.4,0.1c0,0,0,0,0-0.1c0-0.2,0.2-0.3,0.4-0.3c0.2,0,0.3,0.2,0.3,0.4
				c0,0.2-0.2,0.3-0.4,0.3c-0.1,0-0.2-0.1-0.2-0.3l-14.2,0.3c0,0,0,0.1,0,0.1l13.3,1.1l3.1,0.3c0-0.1,0.2-0.3,0.3-0.2
				c0.2,0,0.3,0.2,0.3,0.4c0,0.2-0.2,0.3-0.4,0.2c-0.2,0-0.3-0.2-0.2-0.4c0,0,0,0,0,0l-16.4-1.2c0,0.2,0,0.4-0.1,0.6l11.4,2.8
				l2.4,0.7c0-0.1,0.2-0.2,0.3-0.2c0.2,0,0.3,0.2,0.2,0.4c0,0.2-0.2,0.3-0.4,0.3c-0.2,0-0.3-0.2-0.3-0.4c0,0,0,0,0,0l-13.8-3.3
				c0,0.1,0,0.1-0.1,0.2l12.4,7.8l6.1,4c0,0,0-0.1,0.1-0.1c0.2-0.1,0.3,0,0.4,0.2c0.1,0.2,0,0.3-0.2,0.4c-0.2,0.1-0.3,0-0.4-0.2
				c-0.1-0.1,0-0.2,0.1-0.3l-18.6-11.6c0,0.1,0,0.2-0.1,0.2l9,9.4l2.1,2.3c0,0,0-0.1,0.1-0.1c0.2-0.1,0.3,0,0.4,0.2
				c0.1,0.2,0,0.3-0.2,0.4c-0.2,0.1-0.3,0-0.4-0.2c0-0.1,0-0.2,0.1-0.3l-11.2-11.5c-0.1,0.1-0.1,0.3-0.2,0.4l9.8,10.3l4.8,5.3
				c0,0,0,0,0,0c0.2-0.1,0.3,0,0.4,0.2c0.1,0.2,0,0.3-0.2,0.4c-0.2,0.1-0.4,0-0.4-0.2c-0.1-0.1,0-0.3,0.1-0.4L140,295l6.3,9.1l1.3,2
				c0,0,0,0,0.1-0.1c0.2-0.1,0.3,0,0.4,0.2c0.1,0.2,0,0.3-0.2,0.4c-0.2,0.1-0.3,0-0.4-0.2c-0.1-0.1,0-0.2,0.1-0.3l-7.8-11
				c0,0-0.1,0.1-0.1,0.1l6.2,10.9l1.5,2.8c0.1-0.1,0.3,0,0.4,0.2c0.1,0.2,0,0.3-0.2,0.4c-0.2,0.1-0.3,0-0.4-0.2
				c-0.1-0.2,0-0.3,0.2-0.4c0,0,0,0,0,0l-7.8-13.6c-0.2,0.2-0.4,0.3-0.6,0.4l3.8,10.1l0.8,2.3c0.2,0,0.3,0,0.4,0.2
				c0.1,0.2,0,0.3-0.2,0.4c-0.2,0.1-0.3,0-0.4-0.2c-0.1-0.2,0-0.3,0.2-0.4c0,0,0,0,0,0l-4.7-12.4c-0.4,0.2-0.8,0.3-1.2,0.3
				l-4.2,13.3l-2.3,6.9c0,0,0.1,0,0.1,0.1c0.1,0.1,0.1,0.3-0.1,0.4c-0.1,0.1-0.3,0.1-0.4-0.1c-0.1-0.1-0.1-0.3,0.1-0.4
				c0.1-0.1,0.2-0.1,0.3,0l6.3-20.2c-0.2,0-0.3,0-0.5,0l-6.3,10.3l-1.7,2.6c0,0,0.1,0,0.1,0.1c0.1,0.1,0.1,0.3-0.1,0.4
				c-0.1,0.1-0.3,0.1-0.4-0.1c-0.1-0.1-0.1-0.3,0.1-0.4c0.1-0.1,0.2-0.1,0.3,0l7.8-13c-0.2,0-0.3-0.1-0.5-0.1l-7,11.3l-3.9,6
				c0,0,0,0,0,0c0.1,0.1,0.1,0.3-0.1,0.4c-0.1,0.1-0.3,0.1-0.4-0.1C124.6,313.6,124.7,313.4,124.8,313.3z"
				/>
			</g>
		</g>
		<g>
			<path
				fill="#D46D85"
				d="M247.9,232.7c-5.4-0.3-3.6,11-1.8,20c0.8,4.3,7.6,15.6,10.3,14.4c1.4-0.6,5-9.7,5.3-15.4
			C262.1,243.4,252.9,233,247.9,232.7z"
			/>
			<path
				fill="#FB879E"
				d="M243.6,233.8c-3.5,1.6-6.6,15.3-0.3,22.9c2.8,3.4,11.6,12.3,13.8,10.4c1.1-0.9,2.1-10.6,2.3-17.8
			C259.7,241.5,250.9,230.5,243.6,233.8z"
			/>
			<path
				fill="#C1232F"
				d="M242.4,246.4c0,0,7.4,11.7,7.9,12.3c1.4,1.6,1.9,1.9,1.9,1.4c-0.9-1.6-7.8-15.9-7.9-16.3
			c0,0,5.1,10.3,6.9,13.7c0.2,0.3,1.5,2.5,1.6,2.5c-0.3-0.8-2.4-6.8-2.4-6.8l0,0c1.5,3.5,2.2,5.7,2.6,6.4c0.3,0.4,0.2-0.4,0.1-0.7
			c-0.3-0.9-2.3-8.1-3.5-14.8c0,0,2.4,11.1,3.8,14.6c0.2,0.4,0.5,0.6,0.5,0.3c-0.4-3.8-1.5-13-1.5-13s1.3,9.3,1.9,12.7
			c0.1,0.3,0.2,0.5,0.3,0.2c0.9-2.3,0.8-8.8,0.8-8.8c0.2,4.8-0.1,7.6-0.3,8.8c1.3-1,2-2.2,2-2.2s-0.5,4.2-3.3,5.1
			c-3.3,1-6.1-3-6.1-3s1.9,1.6,3.1,2C251.9,261,242.7,247.2,242.4,246.4z"
			/>
			<path
				fill="#F2E4E6"
				d="M243.7,253.9c0,0-3.7-5.5-0.6-14.8c0.7-2.1,0.7-2.8,1.2-2.4c-2.9,4.4,3.8,16.8,4,17.1
			c0,0-4.8-9.8-4.1-15.3c0-0.4,0.6-2.1,1-1.3c0.4,0.8,2.6,5.9,2.6,5.9l0,0c-1.1-3.7-1.5-4.2-1.5-5c0-0.5,0.5-0.8,0.7-0.5
			c0.9,0.7,4.3,4.4,7.1,11.7c0,0-2.7-8.7-7.2-12.4c-0.3-0.3,0-0.7,0.3-0.5c4,2.4,8.7,10.6,8.7,10.6s-4.1-7.7-7.5-10.2
			c-0.2-0.2,0-0.7,0.4-0.5c3.1,1.6,7.3,5.4,7.3,5.4c-3.7-3.6-5.5-4.7-6.6-5.7c-1.5-1.3,4.8,1.4,4.8,1.4s-5.6-5.1-9.7-3.7
			c-3.7,1.2-3.9,8.4-3.9,8.4s0.9-3.8,2.1-5C243.8,235.9,239.1,247.1,243.7,253.9z"
			/>
			<path
				fill="#C1232F"
				d="M251.1,261.2c-1.4-3-1.2-9-0.5-9.1c0.8-0.2,5.7,3.4,7.1,6.4c1.4,3,0.5,6.2-1.3,6.9
			C254.5,266.2,252.5,264.2,251.1,261.2z"
			/>
			<path
				fill="#C1232F"
				d="M255.1,259.8c0.8-3.1,6.8-8.6,8.4-8.7c0.5,0-0.5,7.9-1.3,10.9c-0.8,3.1-3.6,6-5.6,5.4
			C254.6,266.8,254.3,262.8,255.1,259.8z"
			/>
			<g>
				<path
					fill="#990066"
					d="M256.5,267.5c-0.3-0.1-0.6-0.3-0.9-0.6l0,0c-1.3-1.4-1.4-4.6-0.7-7.2l0,0c0.5-1.9,2.9-4.7,5.1-6.6l0,0
				c1.4-1.2,2.7-2.1,3.4-2.2l0,0c0.1,0,0.1,0,0.2,0.1l0,0c0.5,0.6-0.6,8-1.3,11l0,0c-0.4,1.7-1.5,3.4-2.7,4.4l0,0
				C258.6,267.3,257.5,267.8,256.5,267.5L256.5,267.5z M255.8,266.8c0.2,0.2,0.5,0.4,0.8,0.5l0,0c0.8,0.3,1.8-0.2,2.8-1l0,0
				c1.2-1,2.2-2.7,2.7-4.3l0,0c0.8-2.8,1.7-10.2,1.4-10.8l0,0c-0.6,0.1-1.9,0.9-3.2,2.1l0,0c-2.2,1.9-4.6,4.7-5.1,6.5l0,0
				C254.5,262.3,254.7,265.5,255.8,266.8L255.8,266.8z"
				/>
				<path
					fill="#822929"
					d="M260,253c1.4-1.2,2.7-2.1,3.4-2.2l0,0c0.1,0,0.2,0,0.3,0.1l0,0c0,0,0,0,0,0l0,0l0,0
				c0.5,0.8-0.6,8.1-1.3,11.2l0,0c-0.3,1.3-1,2.6-1.9,3.6l0,0c-0.3,0.3-0.6,0.7-0.9,0.9l0,0c-1,0.9-2.1,1.4-3.2,1.1l0,0l0-0.1l0-0.1
				l0,0.1l0,0.1c-0.3-0.1-0.5-0.2-0.7-0.4l0,0c-0.1-0.1-0.2-0.1-0.2-0.2l0,0c-1.3-1.5-1.4-4.7-0.7-7.3l0,0c0.3-1.1,1.1-2.4,2.2-3.6
				l0,0C257.9,255,259,253.9,260,253L260,253z M260.4,253.4c-1,0.9-2.1,1.9-2.9,3l0,0c-1,1.2-1.8,2.5-2.1,3.4l0,0
				c-0.7,2.5-0.5,5.7,0.6,6.8l0,0l0,0c0.1,0.1,0.1,0.1,0.2,0.2l0,0c0.2,0.1,0.3,0.2,0.5,0.3l0,0c0.7,0.2,1.7-0.1,2.6-1l0,0
				c0.3-0.3,0.6-0.5,0.8-0.9l0,0c0.8-1,1.4-2.2,1.8-3.4l0,0c0.7-2.6,1.6-9.6,1.5-10.6l0,0C262.8,251.5,261.6,252.3,260.4,253.4
				L260.4,253.4z M255.8,266.8C255.8,266.8,255.8,266.8,255.8,266.8L255.8,266.8L255.8,266.8L255.8,266.8L255.8,266.8z"
				/>
			</g>
			<path
				fill="#C1232F"
				d="M250.9,265.8c-4.6-3.2-6.7-8-6.7-8s8.5,0.2,11.1,2.3c2.6,2.1,3.7,5.1,2.5,6.6
			C256.5,268.2,253.6,267.7,250.9,265.8z"
			/>
			<g>
				<path
					fill="#990066"
					d="M250.8,265.9L250.8,265.9l0.1-0.2c2.6,1.8,5.2,2.2,6.5,1.1l0,0c0.1-0.1,0.2-0.2,0.2-0.3l0,0
				c1-1.2,0.4-3.4-1.4-5.4l0,0c-0.3-0.4-0.7-0.7-1.1-1l0,0c-2.3-1.9-9.6-2.2-10.9-2.3l0,0c0.3,0.6,1.4,2.8,3.4,5l0,0
				c0.9,1,1.9,2,3.2,2.8l0,0L250.8,265.9L250.8,265.9c-1.3-0.9-2.3-1.9-3.2-2.8l0,0c-2.4-2.6-3.6-5.2-3.6-5.2l0,0l-0.1-0.2l0.2,0
				c0,0,8.5,0.2,11.2,2.3l0,0c0.4,0.3,0.8,0.7,1.1,1l0,0c1.8,2,2.5,4.3,1.4,5.7l0,0c-0.1,0.1-0.2,0.2-0.3,0.3l0,0
				C256.1,268.3,253.4,267.7,250.8,265.9L250.8,265.9z"
				/>
				<path
					fill="#822929"
					d="M243.9,257.6l0.2,0v0l0,0c0,0,0,0,0,0l0,0l0,0l0,0c0,0,0,0,0.1,0l0,0c0.1,0,0.2,0,0.3,0l0,0
				c0.2,0,0.6,0,1,0l0,0c0.8,0.1,2,0.1,3.2,0.3l0,0c2.5,0.3,5.3,0.9,6.7,2l0,0c0,0,0,0,0,0l0,0c0.4,0.3,0.8,0.7,1.1,1l0,0
				c1.8,2,2.6,4.4,1.4,5.9l0,0c0,0,0,0,0,0l0,0c-0.1,0.1-0.2,0.2-0.3,0.3l0,0c-1.5,1.3-4.3,0.7-6.9-1.1l0,0l-0.1-0.1l0,0
				c-0.4-0.3-0.8-0.6-1.1-0.8l0,0c-0.8-0.6-1.4-1.3-2-1.9l0,0c-2.4-2.6-3.6-5.2-3.6-5.2l0,0l-0.2-0.4L243.9,257.6L243.9,257.6z
				 M256.1,261.3c-0.3-0.3-0.6-0.7-1-1l0,0c0,0,0,0,0,0l0,0c-2.1-1.7-8.7-2.2-10.5-2.2l0,0c0.4,0.8,1.5,2.7,3.3,4.7l0,0
				c0.6,0.6,1.2,1.3,2,1.9l0,0c0.4,0.3,0.8,0.6,1.2,0.9l0,0c2.5,1.8,5.1,2.2,6.3,1.1l0,0c0.1-0.1,0.2-0.2,0.3-0.3l0,0c0,0,0,0,0,0
				l0,0c0,0,0,0,0,0l0,0C258.4,265.4,257.9,263.2,256.1,261.3L256.1,261.3z"
				/>
			</g>
		</g>
		<g>
			<path
				fill="#BF4968"
				d="M239.2,117.5c-1.2-5.6-13.6-1.3-23.4,2.4c-4.6,1.8-15.5,11.2-13.4,13.8c1.1,1.3,12.6,3.1,19.2,2.1
			C231.2,134.5,240.3,122.8,239.2,117.5z"
			/>
			<path
				fill="#FB879E"
				d="M237.4,114.7c-2.4-3.7-18.7-6.1-26.7,1c-3.6,3.2-12.7,13.1-10.2,15.4c1.2,1.1,12.6,1.6,21,1.4
			C230.7,132.3,242.2,122.2,237.4,114.7z"
			/>
			<path
				fill="#F2E4E6"
				d="M214,115.9c0,0,5.9-4.3,17.1-1.6c2.5,0.6,3.3,0.5,2.9,1.1c-5.5-2.8-19,5-19.3,5.2c0,0,10.8-5.7,17.2-5.3
			c0.4,0,2.6,0.5,1.7,1c-0.9,0.5-6.5,3.1-6.5,3.1l0,0c4.1-1.4,4.6-1.8,5.6-1.9c0.6-0.1,0.9,0.4,0.7,0.7c-0.7,1-4.5,4.8-12.6,8.3
			c0,0,9.7-3.4,13.4-8.4c0.3-0.4,0.9-0.1,0.7,0.3c-2.3,4.4-11.1,9.9-11.1,9.9s8.4-4.9,10.8-8.6c0.2-0.3,0.8,0,0.6,0.4
			c-1.5,3.4-5.2,8.2-5.2,8.2c3.7-4.1,4.7-6.2,5.7-7.4c1.3-1.7-1,5.2-1,5.2s5.1-6.2,3-10.5c-1.9-3.9-10.3-3.7-10.3-3.7
			s4.6,0.8,6.1,1.9C234.9,115,221.2,110.6,214,115.9z"
			/>
			<path
				fill="#C1232F"
				d="M206.5,124.3c3.3-1.7,10.3-1.8,10.5-1.1c0.3,0.9-3.2,6.2-6.5,7.9c-3.3,1.7-7.1,0.9-8.2-1
			C201.2,128.2,203.2,126,206.5,124.3z"
			/>
			<path
				fill="#C1232F"
				d="M208.7,128.4c3.7,0.7,10.9,6.7,11.3,8.4c0.1,0.5-9.2-0.1-12.9-0.8c-3.7-0.7-7.5-3.5-7-5.6
			C200.5,128.3,205.1,127.7,208.7,128.4z"
			/>
			<path
				fill="#AB0000"
				d="M199.9,130.4c0.1-0.4,0.3-0.7,0.5-1l0,0c1.5-1.4,5.2-1.7,8.3-1.2l0,0c2.3,0.4,5.9,2.9,8.4,5.1l0,0
			c1.6,1.4,2.8,2.7,3,3.5l0,0c0,0.1,0,0.1,0,0.2l0,0c-0.7,0.5-9.4-0.1-13-0.8l0,0c-2-0.4-4.1-1.4-5.5-2.6l0,0
			C200.4,132.6,199.7,131.5,199.9,130.4L199.9,130.4z M200.7,129.6c-0.2,0.2-0.4,0.5-0.5,0.8l0,0c-0.2,0.9,0.4,1.9,1.5,2.9l0,0
			c1.4,1.2,3.4,2.2,5.4,2.6l0,0c3.4,0.6,12.1,1.2,12.7,0.9l0,0c-0.2-0.6-1.3-1.9-2.9-3.3l0,0c-2.5-2.2-6.1-4.6-8.3-5l0,0
			C205.7,128,202,128.3,200.7,129.6L200.7,129.6z"
			/>
			<path
				fill="#C1232F"
				d="M201.1,124.3c3-5.1,8.3-7.7,8.3-7.7s1,9.1-1.1,12c-2.1,2.9-5.4,4.2-7.3,3
			C199.2,130.4,199.3,127.3,201.1,124.3z"
			/>
			<path
				fill="#AB0000"
				d="M201,124.2l0.1,0.1l0.1,0.1c-1.7,2.8-1.9,5.7-0.4,6.9l0,0c0.1,0.1,0.2,0.2,0.3,0.2l0,0
			c1.5,1,4,0.2,6.1-1.8l0,0c0.4-0.4,0.7-0.8,1-1.2l0,0c1.9-2.5,1.2-10.4,1.1-11.7l0,0c-0.7,0.4-3,1.7-5.3,3.9l0,0
			c-1,1-2,2.2-2.8,3.6l0,0l-0.1-0.1L201,124.2c0.8-1.4,1.8-2.6,2.9-3.6l0,0c2.7-2.7,5.5-4.1,5.5-4.1l0,0l0.2-0.1l0,0.2
			c0,0,1,9.1-1.2,12.1l0,0c-0.3,0.4-0.7,0.9-1,1.2l0,0c-2.1,2-4.7,2.9-6.4,1.8l0,0c-0.1-0.1-0.2-0.2-0.4-0.3l0,0
			C199,130,199.3,127.1,201,124.2L201,124.2z"
			/>
		</g>
		<g>
			<g>
				<path
					fill="#FB879E"
					d="M63,271.8c-2.4,0.8-2.4-2-2.4-3.1c0-6.7,7.1-26.7,15.5-31.9c4-2.4,21.5-2,22.9,1.5
				c0.7,1.7-6.5,19.3-10.1,22.3C85.7,263.1,68.4,269.9,63,271.8z"
				/>
				<path
					fill="#FCA1B3"
					d="M59.1,267.2c-1.6,2.1,1.1,2.9,2.2,3.3c6.2,2,27.1,1.4,34.5-5.1c3.5-3.1,8.7-20.2,5.8-22.6
				c-1.4-1.2-20,0.3-23.9,2.8C74.4,247.9,62.6,262.5,59.1,267.2z"
				/>
				<path
					fill="#E2617D"
					d="M94.8,241.2c4.2,4.3-4.6,18.2-14.8,25.7c-4.8,3.5-20.8,8.9-21.7,5.4c-0.4-1.8,3.8-16.1,10.4-22.7
				C76.6,241.6,90.9,237.1,94.8,241.2z"
				/>
				<path
					fill="#C1232F"
					d="M78.6,247.4c0,0-9.3,5.9-16,18.4c-1.5,2.8-2.3,3.7-1.4,3.3c1.8-6.2,21-20,21.5-20.4c0,0-14.8,11-19.8,18
				c-0.3,0.5-1.7,2.8-0.5,1.9c1.2-0.9,8.5-6.7,8.5-6.7l0,0c-4.9,4.3-5.7,4.8-6.6,5.8c-0.6,0.6-0.4,1.1,0.1,0.9
				c1.7-0.7,8.6-4.3,18.9-12.7c0,0-11.6,10.1-19.7,13.6c-0.6,0.2-0.8,0.9-0.2,0.7c6.4-2,19.4-11,19.4-11s-11.9,8.5-17.8,10.8
				c-0.4,0.2-0.7,0.9-0.1,0.7c4.7-1.3,12.6-4.8,12.6-4.8c-7.3,3.6-10.2,4.5-12.2,5.4c-2.8,1.2,6.1-0.6,6.1-0.6s-10.6,4.9-13.2,2.2
				c-2.3-2.5,4.9-11.5,4.9-11.5s-3.1,5-3.1,6.8C60,269.9,67.1,254.6,78.6,247.4z"
				/>
			</g>
			<g>
				<path
					fill="#C1232F"
					d="M65.2,268.1c3.7-0.3,12.3,3.7,13.1,5.2c0.3,0.5-9,2.3-12.7,2.6c-3.7,0.3-8.2-1.5-8.3-3.6
				C57.2,270.1,61.5,268.4,65.2,268.1z"
				/>
				<path
					fill="#7C252F"
					d="M78.5,273.2c0,0.1,0,0.2,0,0.2l0,0c-0.6,0.7-9.2,2.3-12.8,2.6l0,0c-2.4,0.2-5.2-0.5-6.9-1.6l0,0
				c-0.9-0.6-1.5-1.3-1.6-2.2l0,0c0-0.4,0.1-0.8,0.4-1.2l0,0c1.1-1.7,4.6-2.9,7.6-3.1l0,0c3.1-0.2,9.1,2.3,11.9,4.1l0,0
				C77.8,272.5,78.3,272.9,78.5,273.2L78.5,273.2z M76.9,272.3c-2.7-1.8-8.8-4.3-11.7-4l0,0c-3,0.2-6.4,1.5-7.4,3l0,0
				c-0.2,0.3-0.3,0.7-0.3,1l0,0c0,0.7,0.6,1.4,1.4,1.9l0,0c1.6,1.1,4.3,1.7,6.7,1.5l0,0c3.4-0.2,11.9-1.9,12.6-2.4l0,0
				C78,273.1,77.6,272.7,76.9,272.3L76.9,272.3z"
				/>
			</g>
			<g>
				<path
					fill="#C1232F"
					d="M56.8,266c1.6-5.6,6.1-9.5,6.1-9.5s3.3,8.5,2,11.8c-1.3,3.3-4.1,5.5-6.3,4.8
				C56.5,272.4,55.8,269.4,56.8,266z"
				/>
				<path
					fill="#7C252F"
					d="M63,256.5c0,0,3.3,8.5,2,11.9l0,0c-0.3,0.7-0.6,1.3-1,1.9l0,0c-1.5,2.2-3.6,3.5-5.5,3l0,0
				c-0.3-0.1-0.5-0.2-0.7-0.3l0,0c-1.7-1.1-2.1-3.9-1.2-6.9l0,0l0.1,0l0.1,0c-0.9,3-0.4,5.6,1.1,6.6l0,0c0.2,0.1,0.4,0.2,0.7,0.3
				l0,0c1.6,0.5,3.7-0.7,5.1-2.8l0,0c0.4-0.6,0.7-1.2,0.9-1.8l0,0c1.2-2.9-1.4-10.2-1.9-11.5l0,0c-0.5,0.5-2,1.9-3.5,4.1l0,0
				c-1,1.4-1.9,3.2-2.4,5.1l0,0l-0.1,0l-0.1,0c0.6-2,1.5-3.8,2.5-5.2l0,0c1.8-2.7,3.7-4.4,3.7-4.4l0,0l0.2-0.1L63,256.5L63,256.5z"
				/>
			</g>
		</g>
		<g>
			<radialGradient
				id="SVGID_15_"
				cx="3778.1423"
				cy="-135.2326"
				r="41.5466"
				gradientTransform="matrix(4.080000e-002 -0.9979 0.9973 4.300000e-002 105.3865 4261.5483)"
				gradientUnits="userSpaceOnUse"
			>
				<stop offset="0" style="stop-color:#EDEDED" />
				<stop offset="1" style="stop-color:#E05A6A" />
			</radialGradient>
			<path
				fill="url(#SVGID_15_)"
				d="M118.3,479.5c-5,0.2-16.7-13.5-14-25.6c1.2-5.4,5.9-20.3,9.6-19.4c1.8,0.4,8.7,10.8,13.2,18.7
			C132.1,461.9,128.5,479.1,118.3,479.5z"
			/>
			<g>
				<radialGradient
					id="SVGID_16_"
					cx="3866.3994"
					cy="-120.8933"
					r="39.4941"
					gradientTransform="matrix(4.080000e-002 -0.9979 0.9973 4.300000e-002 105.3865 4261.5483)"
					gradientUnits="userSpaceOnUse"
				>
					<stop offset="0" style="stop-color:#EDEDED" />
					<stop offset="1" style="stop-color:#FB879E" />
				</radialGradient>
				<path
					fill="url(#SVGID_16_)"
					d="M143.4,400.3c3.4,3.8,0.3,22.4-10.8,28.6c-5,2.8-19.5,9.2-21.2,5.6c-0.8-1.8,2.7-14.2,5.9-23.2
				C120.8,401.4,136.5,392.5,143.4,400.3z"
				/>
				<path
					fill="#F4A8B0"
					d="M108.9,413.8c0,0-3.2-7.8-15.9-10.9c-2.9-0.7-3.6-1.2-3.5-0.4c7.1-0.1,15.6,15.6,15.8,16.1
				c0,0-7.1-12-13.7-15c-0.4-0.2-2.8-0.9-2.3,0.1c0.5,1,4.5,6.8,4.5,6.8l0,0c-3.2-3.7-3.4-4.5-4.3-5.1c-0.5-0.4-1.2,0-1.2,0.4
				c0.1,1.5,1.5,7.6,7.3,15.7c0,0-7.5-8.9-8-16.3c0-0.5-0.8-0.5-0.8,0c-0.4,6,4.9,16.7,4.9,16.7s-5.3-9.7-5.4-15.2
				c0-0.4-0.8-0.5-0.9,0.1c-0.6,4.5,0.2,11.6,0.2,11.6c-1.1-6.4-0.9-9.2-1.1-11c-0.3-2.5-2.1,6.1-2.1,6.1s-1.3-9.5,3.4-13
				c4.2-3.2,12.3,1.5,12.3,1.5s-4.9-1.6-7.1-1.2C88.9,401.4,105,404.1,108.9,413.8z"
				/>
				<path
					fill="#C51770"
					d="M108.7,433.2c-1,1.5-0.6,3.5,0.9,4.5c1.5,1,3.5,0.7,4.5-0.8c1-1.5,0.6-3.5-0.9-4.5
				C111.7,431.4,109.6,431.8,108.7,433.2z"
				/>

				<radialGradient
					id="SVGID_17_"
					cx="2645.3486"
					cy="5226.4204"
					r="45.4729"
					gradientTransform="matrix(0.4606 -0.8874 -0.8872 -0.461 3589.4951 5170.0229)"
					gradientUnits="userSpaceOnUse"
				>
					<stop offset="0" style="stop-color:#FFFFFF" />
					<stop offset="1" style="stop-color:#FB879E" />
				</radialGradient>
				<path
					fill="url(#SVGID_17_)"
					d="M156.1,417.6c-4.3,3.1-22.5-1.2-27.2-12.6c-2.1-5.1-9-19.2-5.2-20.7c1.9-0.7,16.2,3,24.8,6.7
				C158,395.2,164.8,411.4,156.1,417.6z"
				/>
				<g>
					<radialGradient
						id="SVGID_18_"
						cx="3772.1052"
						cy="4268.4844"
						r="109.9498"
						gradientTransform="matrix(-0.9611 0.2763 -0.2763 -0.9611 4987.1084 3431.1394)"
						gradientUnits="userSpaceOnUse"
					>
						<stop offset="0" style="stop-color:#F4D4D7" />
						<stop offset="0.7198" style="stop-color:#E05A6A" />
					</radialGradient>
					<path
						fill="url(#SVGID_18_)"
						d="M164.5,369.6c1.4,4.9-9.3,20.4-21.9,21.2c-5.7,0.4-20.2-1.5-20.3-5.4c0-1.9,7.2-10.2,13.9-17
					C143.6,361,161.6,359.6,164.5,369.6z"
					/>

					<radialGradient
						id="SVGID_19_"
						cx="2624.3184"
						cy="5276.7896"
						r="18.8764"
						gradientTransform="matrix(0.4606 -0.8874 -0.8872 -0.461 3589.4951 5170.0229)"
						gradientUnits="userSpaceOnUse"
					>
						<stop offset="0" style="stop-color:#FDD0D9" />
						<stop offset="1" style="stop-color:#FB879E" />
					</radialGradient>
					<path
						fill="url(#SVGID_19_)"
						d="M108.1,430.5c-4.6-2-9.4-19.3-1.8-29.1c3.4-4.4,14.1-18,17.1-15.6c1.5,1.2,3.1,15.6,3.9,24.7
					C128.1,420.5,117.5,434.5,108.1,430.5z"
					/>
					<path
						fill="#FB879E"
						d="M79.8,384.6c1.1-5.2,18-14.5,29.4-9.5c5.2,2.3,16.4,7.2,14.6,10.9c-0.9,1.8-10.6,9.5-19.8,12.7
					C94,402.2,77.5,395.1,79.8,384.6z"
					/>

					<radialGradient
						id="SVGID_20_"
						cx="2688.9402"
						cy="5317.5576"
						r="38.2323"
						gradientTransform="matrix(0.4606 -0.8874 -0.8872 -0.461 3589.4951 5170.0229)"
						gradientUnits="userSpaceOnUse"
					>
						<stop offset="0" style="stop-color:#FFFFFF" />
						<stop offset="1" style="stop-color:#FB879E" />
					</radialGradient>
					<path
						fill="url(#SVGID_20_)"
						d="M113.3,345c5.2-0.5,18.5,12.5,16.5,24.9c-0.9,5.6-3.2,16.6-7.2,16c-1.3-2.5-11.4-6-16.8-13.7
					C100,363.8,102.7,346.1,113.3,345z"
					/>
				</g>
				<g>
					<path
						fill="#FEEDF0"
						d="M144.9,387.7c0,0,8.4-1.4,14.8-12.9c1.4-2.6,2.1-3.2,1.3-3.3c-1.8,6.8-19.4,11.6-19.9,11.8
					c0,0,13.5-4.3,18.2-9.9c0.3-0.4,1.6-2.5,0.5-2.2c-1.1,0.3-7.8,2.9-7.8,2.9v0c4.5-2.2,5.3-2.4,6.1-3c0.5-0.4,0.4-1.1-0.1-1.2
					c-1.5-0.2-7.8-0.2-17.2,3.7c0,0,10.6-5.3,18-4.3c0.5,0.1,0.7-0.7,0.2-0.8c-5.7-1.7-17.5,1.2-17.5,1.2s10.9-3,16.2-2
					c0.4,0.1,0.7-0.7,0.1-0.9c-4.2-1.5-11.4-2.2-11.4-2.2c6.6,0.3,9.2,1,11,1.3c2.5,0.3-5.4-3.3-5.4-3.3s9.6,0.8,11.7,6
					c1.9,4.7-4.8,11.5-4.8,11.5s2.9-4.4,3.1-6.6C162.2,371.2,155.3,386,144.9,387.7z"
					/>
					<path
						fill="#FEEDF0"
						d="M132.4,406.1c0,0,4,7.3,17,9.1c2.9,0.4,3.7,0.8,3.6,0.1c-7.1,0.7-17.1-13.7-17.4-14.1
					c0,0,8.3,10.9,15.2,13.2c0.4,0.2,2.9,0.6,2.2-0.3c-0.6-0.9-5.2-6.2-5.2-6.2l0,0c3.5,3.3,3.9,4,4.8,4.5c0.6,0.3,1.2-0.1,1.1-0.5
					c-0.2-1.5-2.2-7.3-8.9-14.6c0,0,8.4,7.9,9.7,15.1c0.1,0.5,0.9,0.4,0.8-0.1c-0.2-5.9-6.6-15.8-6.6-15.8s6.2,9,6.9,14.2
					c0.1,0.4,0.8,0.4,0.9-0.2c0.2-4.4-1.4-11.3-1.4-11.3c1.7,6.2,1.8,8.9,2.2,10.6c0.5,2.4,1.5-6.1,1.5-6.1s2.2,9.1-2.2,12.9
					c-3.9,3.5-12.5-0.3-12.5-0.3s5.1,1.1,7.3,0.5C153.7,416.2,137.2,415.2,132.4,406.1z"
					/>
				</g>
				<path
					fill="#FFFFFF"
					d="M99.9,367.4c0.1,0.1,0.1,0.3-0.1,0.4l20,15l-9-9.3l-1.9-2.1c0,0,0,0.1-0.1,0.1c-0.2,0.1-0.4,0.1-0.5-0.1
				c-0.1-0.2-0.1-0.4,0.1-0.5c0.2-0.1,0.4-0.1,0.5,0.1c0.1,0.1,0.1,0.3,0,0.4l12,12.2l0.2,0.1L110.9,371l-2.2-2.9
				c-0.2,0.1-0.4,0-0.5-0.1c-0.1-0.2-0.1-0.4,0.1-0.5c0.2-0.1,0.4-0.1,0.5,0.1c0.1,0.2,0.1,0.4-0.1,0.5c0,0,0,0,0,0l13.3,16.2
				l0.1-0.7l-7.4-12.9l-1.3-2.5c-0.2,0.1-0.4,0-0.5-0.1c-0.1-0.2-0.1-0.4,0.1-0.5c0.2-0.1,0.4-0.1,0.5,0.1c0.1,0.2,0.1,0.4-0.1,0.5
				c0,0,0,0,0,0l8.8,15.1l2.7-18.5l1.4-8.4c0,0-0.1,0-0.1,0c-0.1-0.1-0.2-0.4,0-0.5c0.1-0.2,0.4-0.2,0.5,0c0.1,0.1,0.2,0.4,0,0.5
				c-0.1,0.1-0.3,0.1-0.4,0.1l-3.7,26.5l6.2-15.2l1.5-3.4c0,0-0.1,0-0.1-0.1c-0.1-0.1-0.2-0.4,0-0.5c0.1-0.1,0.4-0.2,0.5,0
				c0.2,0.1,0.2,0.4,0,0.5c-0.1,0.1-0.2,0.1-0.4,0.1l-7.8,19.5l0.2,0.4l0.4-0.7l7.1-17.1l3.4-7.7c0,0,0,0-0.1,0
				c-0.1-0.1-0.2-0.4,0-0.5c0.1-0.2,0.4-0.2,0.5,0c0.1,0.1,0.2,0.4,0,0.5c-0.1,0.1-0.3,0.1-0.4,0l-9.5,23.1l6.7-11.1l1.5-2.3
				c0,0-0.1,0-0.1,0c-0.1-0.1-0.2-0.4,0-0.5c0.1-0.1,0.4-0.2,0.5,0c0.1,0.1,0.2,0.4,0,0.5c-0.1,0.1-0.3,0.1-0.4,0.1l-8.8,14.7
				l-0.1,0.2l9.8-13.1l2.3-2.9c-0.1-0.1-0.1-0.3,0-0.5c0.1-0.1,0.4-0.2,0.5,0c0.1,0.1,0.2,0.4,0,0.5c-0.1,0.1-0.4,0.2-0.5,0
				c0,0,0,0,0,0L123,384.5l-0.1,0.1l0.2,0.3l0,0l0.1-0.1l-0.1-0.2l0.4-0.1l11-10.7l2.1-1.9c-0.1-0.1-0.1-0.3,0-0.5
				c0.1-0.1,0.4-0.2,0.5,0c0.1,0.1,0.2,0.4,0,0.5c-0.1,0.1-0.4,0.2-0.5,0c0,0,0,0,0,0l-12.7,12.5l19-5.8l8.2-2.3c0,0,0-0.1,0-0.1
				c0.1-0.2,0.3-0.3,0.5-0.2c0.2,0.1,0.3,0.3,0.2,0.5c-0.1,0.2-0.3,0.3-0.5,0.2c-0.1,0-0.2-0.2-0.2-0.3l-25.6,8l16.3-0.9l3.7-0.1
				c0-0.1,0-0.1,0-0.2c0.1-0.2,0.3-0.3,0.5-0.2c0.2,0.1,0.3,0.3,0.2,0.5c-0.1,0.2-0.3,0.3-0.5,0.2c-0.1,0-0.2-0.2-0.2-0.3l-21.2,1.3
				l-0.9,0.3l1.7,0.2l18.5-0.9l8.4-0.2c0,0,0,0,0-0.1c0.1-0.2,0.3-0.3,0.5-0.2c0.2,0.1,0.3,0.3,0.2,0.5c-0.1,0.2-0.3,0.3-0.5,0.2
				c-0.2-0.1-0.2-0.2-0.2-0.4l-24.9,1.3l12.9,1.3l2.8,0.4c0,0,0-0.1,0-0.1c0.1-0.2,0.3-0.3,0.5-0.2c0.2,0.1,0.3,0.3,0.2,0.5
				c-0.1,0.2-0.3,0.3-0.5,0.2c-0.2,0-0.2-0.2-0.2-0.3l-17.1-1.7l-0.3,0l16.1,3.2l3.6,0.8c0.1-0.2,0.3-0.3,0.4-0.2
				c0.2,0.1,0.3,0.3,0.2,0.5c-0.1,0.2-0.3,0.3-0.5,0.2c-0.2-0.1-0.3-0.3-0.2-0.5c0,0,0,0,0,0l-20.8-4l-0.9,0l15.6,5.8l2.6,1.1
				c0.1-0.2,0.2-0.3,0.4-0.2c0.2,0.1,0.3,0.3,0.2,0.5c-0.1,0.2-0.3,0.3-0.5,0.2c-0.2-0.1-0.3-0.3-0.2-0.5c0,0,0,0,0,0l-18.2-6.6
				l-0.1-0.2l-0.1,0l-0.1,0.2l-0.2-0.1l0,0.6l0.5,0.5l-0.1-0.1l0.1-0.2l-0.3-0.2l0.1-0.3l17.6,11.1l7.2,4.7c0,0,0-0.1,0.1-0.1
				c0.2-0.1,0.4,0,0.5,0.2c0.1,0.2,0,0.4-0.2,0.5c-0.2,0.1-0.4,0-0.5-0.2c-0.1-0.1,0-0.3,0.1-0.4l-22.8-14.2l11.4,11.8l2.5,2.7
				c0,0,0.1-0.1,0.1-0.1c0.2-0.1,0.4,0,0.5,0.2c0.1,0.2,0,0.4-0.2,0.5c-0.2,0.1-0.4,0-0.5-0.2c-0.1-0.1,0-0.3,0.1-0.4l-14.8-15.2
				l-0.8-0.5l1,1.4l12.8,13.5l5.6,6.2c0,0,0,0,0,0c0.2-0.1,0.4,0,0.5,0.2c0.1,0.2,0,0.4-0.2,0.5c-0.2,0.1-0.4,0-0.5-0.2
				c-0.1-0.2,0-0.3,0.1-0.4l-17.2-18l7.4,10.6l1.5,2.4c0,0,0-0.1,0.1-0.1c0.2-0.1,0.4,0,0.5,0.2c0.1,0.2,0,0.4-0.2,0.5
				c-0.2,0.1-0.4,0-0.5-0.2c-0.1-0.1,0-0.3,0.1-0.4l-9.9-14l-0.2-0.2l8.1,14.3l1.7,3.2c0.2-0.1,0.4,0,0.5,0.2c0.1,0.2,0,0.4-0.2,0.5
				c-0.2,0.1-0.4,0-0.5-0.2c-0.1-0.2,0-0.4,0.2-0.5c0,0,0,0,0,0l-10.6-18.4l-0.7-0.7l5.8,15.5l0.9,2.7c0.2,0,0.4,0,0.4,0.2
				c0.1,0.2,0,0.4-0.2,0.5c-0.2,0.1-0.4,0-0.5-0.2c-0.1-0.2,0-0.4,0.2-0.5c0,0,0,0,0,0l-6.7-17.7l-0.4,19.1l-0.4,8.5
				c0,0,0.1,0,0.1,0c0.2,0.1,0.2,0.3,0.1,0.5c-0.1,0.2-0.4,0.2-0.5,0.1c-0.2-0.1-0.2-0.3-0.1-0.5c0.1-0.1,0.2-0.1,0.4-0.1l0.5-26.8
				l-4.3,15.8l-1.1,3.5c0.1,0,0.1,0,0.2,0c0.2,0.1,0.2,0.3,0.1,0.5c-0.1,0.2-0.4,0.2-0.5,0.1c-0.2-0.1-0.2-0.4-0.1-0.5
				c0.1-0.1,0.2-0.1,0.3-0.1l5.5-20.5l0-0.9l0,0l-0.7,1.5l-5,17.8l-2.4,8c0,0,0,0,0.1,0c0.2,0.1,0.2,0.3,0.1,0.5
				c-0.1,0.2-0.3,0.2-0.5,0.1c-0.2-0.1-0.2-0.4-0.1-0.5c0.1-0.1,0.3-0.2,0.4-0.1l6.7-24l-5.3,11.8l-1.3,2.5c0,0,0.1,0,0.1,0
				c0.2,0.1,0.2,0.4,0.1,0.5c-0.1,0.2-0.4,0.2-0.5,0.1c-0.2-0.1-0.2-0.3-0.1-0.5c0.1-0.1,0.3-0.1,0.4-0.1l7-15.6l0.1-0.2l-8.1,14.2
				l-1.9,3.1c0.1,0.1,0.2,0.3,0.1,0.5c-0.1,0.2-0.4,0.2-0.5,0.1c-0.2-0.1-0.2-0.4-0.1-0.5c0.1-0.2,0.3-0.2,0.5-0.1c0,0,0,0,0,0
				l10.4-18.5l0-0.1l-0.8,0.5l-9.3,11.6l-1.9,2.2c0.1,0.1,0.2,0.3,0.1,0.5c-0.1,0.2-0.3,0.2-0.5,0.1c-0.2-0.1-0.2-0.4-0.1-0.5
				c0.1-0.2,0.3-0.2,0.5-0.1c0,0,0,0,0,0l10.6-13.3l-15.2,10l-7.3,4.5c0,0,0,0.1,0,0.1c0,0.2-0.2,0.4-0.4,0.4
				c-0.2,0-0.4-0.2-0.4-0.4c0-0.2,0.2-0.4,0.4-0.4c0.1,0,0.3,0.1,0.3,0.2l22.3-14.7l-15.5,5.3l-3.5,1.1c0,0.1,0.1,0.1,0.1,0.2
				c0,0.2-0.2,0.4-0.4,0.4c-0.2,0-0.4-0.2-0.4-0.4c0-0.2,0.2-0.4,0.4-0.4c0.1,0,0.2,0.1,0.3,0.2l19.8-7l0.4-0.5l-1.1,0.2l-17.5,5.9
				l-8,2.5c0,0,0,0,0,0.1c0,0.2-0.2,0.4-0.4,0.4c-0.2,0-0.4-0.2-0.4-0.4c0-0.2,0.2-0.4,0.4-0.4c0.2,0,0.3,0.1,0.3,0.3l23.6-8.1
				l-12.7,2.3L103,389c0,0,0,0,0,0.1c0,0.2-0.2,0.4-0.4,0.4c-0.2,0-0.4-0.2-0.4-0.4c0-0.2,0.2-0.4,0.4-0.4c0.2,0,0.3,0.1,0.3,0.3
				l16.8-3.1l0.2-0.1l-16.3,1.3l-3.7,0.2c0,0.2-0.2,0.3-0.4,0.3c-0.2,0-0.4-0.2-0.4-0.4c0-0.2,0.2-0.4,0.4-0.4
				c0.2,0,0.4,0.2,0.4,0.4c0,0,0,0,0,0l21.1-1.9l0.2-0.1l-0.8-0.3l-15.1-1.1l-2.8-0.3c0,0.2-0.2,0.3-0.4,0.3c-0.2,0-0.4-0.2-0.4-0.4
				c0-0.2,0.2-0.4,0.4-0.4c0.2,0,0.4,0.2,0.4,0.4c0,0,0,0,0,0l17.3,1.2l-16.6-7l-7.8-3.5c0,0,0,0.1-0.1,0.1
				c-0.2,0.1-0.4,0.1-0.5-0.1c-0.1-0.2-0.1-0.4,0.1-0.5c0.2-0.1,0.4-0.1,0.5,0.1c0.1,0.1,0,0.3,0,0.4l24.8,10.3l-13.1-9.8l-2.9-2.3
				c0,0,0,0.1-0.1,0.1c-0.2,0.1-0.4,0.1-0.5-0.1c-0.1-0.2-0.1-0.4,0.1-0.5c0.2-0.1,0.4-0.1,0.5,0.1c0.1,0.1,0.1,0.3,0,0.4l16.8,12.4
				l0.6,0l-0.7-0.7L106.4,373l-6.6-5.2c0,0,0,0,0,0.1c-0.2,0.1-0.4,0.1-0.5-0.1c-0.1-0.2-0.1-0.4,0.1-0.5
				C99.6,367.1,99.8,367.2,99.9,367.4z M122.3,384.1l-0.1,0.5l0.1,0.1l0.2-0.3L122.3,384.1z M122.5,385.5L122.5,385.5L122.5,385.5
				L122.5,385.5L122.5,385.5z M122.8,384.9L122.8,384.9l0.1,0.2L122.8,384.9z M122.6,385.3l0,0.1L122.6,385.3L122.6,385.3z
				 M123.7,385.1L123.7,385.1l-0.2-0.2l-0.2,0.2L123.7,385.1z M121.7,386l0.4-0.2l0,0l-0.2,0L121.7,386z M121.8,385.2L121.8,385.2
				l-0.2-0.1L121.8,385.2z"
				/>

				<radialGradient
					id="SVGID_21_"
					cx="3522.3535"
					cy="-251.1279"
					r="44.3592"
					gradientTransform="matrix(0.15 -0.9872 0.9869 0.1523 -121.4199 3964.1013)"
					gradientUnits="userSpaceOnUse"
				>
					<stop offset="0" style="stop-color:#EDEDED" />
					<stop offset="1" style="stop-color:#FB879E" />
				</radialGradient>
				<path
					fill="url(#SVGID_21_)"
					d="M156.5,450.1c-2.6,4.6-20.8,8.4-29.9,0.1c-4.1-3.7-14.5-15.2-11.7-18.1
				c1.4-1.4,14.1-2.6,23.5-2.8C148.7,429,161.7,440.7,156.5,450.1z"
				/>
				<path
					fill="#FEEDF0"
					d="M130.3,449.8c0,0,6.7,4.9,19.2,1c2.8-0.9,3.7-0.8,3.3-1.5c-6.1,3.7-21.3-5.1-21.7-5.4
				c0,0,12.1,6.4,19.3,5.5c0.5-0.1,2.9-0.7,1.9-1.3c-1-0.6-7.3-3.4-7.3-3.4l0,0c4.6,1.5,5.2,2,6.3,2.1c0.6,0.1,1.1-0.6,0.8-1
				c-0.8-1.2-5.1-5.6-14.2-9.4c0,0,10.9,3.6,15.1,9.5c0.3,0.4,1,0,0.7-0.4c-2.6-5.3-12.6-11.5-12.6-11.5s9.5,5.5,12.3,9.9
				c0.2,0.3,0.9,0,0.7-0.6c-1.7-4.1-6-9.6-6-9.6c4.2,4.8,5.4,7.3,6.5,8.7c1.5,2-1.2-6.2-1.2-6.2s5.8,7.3,3.6,12.6
				c-2.1,4.8-11.4,5-11.4,5s5.1-1.2,6.8-2.7C153.8,449.8,138.5,455.9,130.3,449.8z"
				/>
				<path
					fill="#FEEDF0"
					d="M106.4,456.8c0,0-1,8.3,8.2,17c2.1,2,2.4,2.8,2.7,2c-5.9-3.3-5.7-21-5.7-21.5c0,0,0.4,13.7,4.4,19.5
				c0.3,0.4,1.9,2.1,1.9,1c0-1.1-0.6-8-0.6-8l0,0c0.9,4.7,0.8,5.5,1.2,6.5c0.2,0.6,1,0.6,1.2,0.2c0.6-1.3,2.3-7.3,1.2-17.1
				c0,0,2.1,11.3-0.9,17.9c-0.2,0.5,0.4,0.8,0.7,0.4c3.1-5,3.6-16.8,3.6-16.8s-0.1,10.9-2.5,15.7c-0.2,0.3,0.4,0.8,0.8,0.3
				c2.6-3.6,5.2-10.1,5.2-10.1c-2,6.1-3.5,8.4-4.2,10c-1,2.3,4.6-4.2,4.6-4.2s-3.3,8.8-8.8,9.6c-5,0.7-9.5-7.2-9.5-7.2
				s3.3,3.8,5.4,4.4C117.2,477,105.1,467,106.4,456.8z"
				/>

				<radialGradient
					id="SVGID_22_"
					cx="3808.2744"
					cy="-189.9377"
					r="24.0661"
					gradientTransform="matrix(4.080000e-002 -0.9979 0.9973 4.300000e-002 105.3865 4261.5483)"
					gradientUnits="userSpaceOnUse"
				>
					<stop offset="0" style="stop-color:#EDEDED" />
					<stop offset="1" style="stop-color:#E2617D" />
				</radialGradient>
				<path
					fill="url(#SVGID_22_)"
					d="M73.2,449.9c-1.2-5.1,10.1-20.8,22.6-21.1c5.6-0.2,19.7,1,19.6,5.1c-0.1,2-7.3,11.7-14.3,18.4
				C93.5,459.8,75.6,460.5,73.2,449.9z"
				/>
				<path
					fill="#FEEDF0"
					d="M93.6,431.7c0,0-8.4,1.1-15.2,12.8c-1.5,2.6-2.3,3.2-1.5,3.4c2.1-7,19.6-11.3,20.1-11.4
				c0,0-13.6,3.9-18.4,9.6c-0.3,0.4-1.7,2.5-0.6,2.2c1.1-0.3,7.8-2.6,7.8-2.6l0,0c-4.5,2.1-5.3,2.2-6.2,2.9c-0.5,0.4-0.4,1.2,0,1.3
				c1.5,0.3,7.7,0.5,17.2-3.1c0,0-10.8,5-18,3.7c-0.5-0.1-0.8,0.6-0.3,0.8c5.6,2,17.4-0.5,17.4-0.5s-10.9,2.7-16.1,1.4
				c-0.4-0.1-0.7,0.7-0.1,0.9c4.1,1.8,11.1,2.8,11.1,2.8c-6.5-0.6-9-1.5-10.8-1.8c-2.5-0.4,5.2,3.7,5.2,3.7s-9.4-1.2-11.3-6.7
				c-1.7-5,5.2-11.7,5.2-11.7s-3.1,4.4-3.3,6.7C75.7,448.2,83.2,433,93.6,431.7z"
				/>

				<radialGradient
					id="SVGID_23_"
					cx="3862.7095"
					cy="-183.8433"
					r="28.6318"
					gradientTransform="matrix(4.080000e-002 -0.9979 0.9973 4.300000e-002 105.3865 4261.5483)"
					gradientUnits="userSpaceOnUse"
				>
					<stop offset="0" style="stop-color:#EDEDED" />
					<stop offset="1" style="stop-color:#E2617D" />
				</radialGradient>
				<path
					fill="url(#SVGID_23_)"
					d="M86.7,399.8c4.5-2.7,22,3.4,25.5,15.5c1.6,5.4,4.6,21,0.7,22.1c-1.9,0.5-13.3-5.1-21.4-9.8
				C82.6,422.5,77.5,405.3,86.7,399.8z"
				/>
				<path
					fill="#FFFFFF"
					d="M84.4,428.5c0.1,0.1,0.2,0.3,0.1,0.4l24.4,5.1l-12.1-4.6l-2.6-1.1c0,0,0,0.1,0,0.1
				c-0.1,0.2-0.3,0.2-0.5,0.1c-0.2-0.1-0.2-0.3-0.1-0.5c0.1-0.2,0.3-0.2,0.5-0.1c0.1,0.1,0.2,0.2,0.1,0.4l16.1,6l0.2,0l-14.7-7.2
				l-3.2-1.7c-0.1,0.2-0.3,0.2-0.5,0.1c-0.2-0.1-0.2-0.3-0.1-0.5c0.1-0.2,0.3-0.2,0.5-0.1c0.2,0.1,0.2,0.3,0.1,0.5c0,0,0,0,0,0
				l18.9,9l-0.2-0.6l-12.2-8.6l-2.3-1.7c-0.1,0.1-0.3,0.2-0.5,0.1c-0.2-0.1-0.2-0.3-0.1-0.5c0.1-0.2,0.3-0.2,0.5-0.1
				c0.2,0.1,0.2,0.3,0.1,0.5c0,0,0,0,0,0l14.4,10l-5.5-17.9l-2.3-8.2c0,0-0.1,0-0.1,0c-0.2-0.1-0.3-0.3-0.2-0.5
				c0.1-0.2,0.3-0.3,0.5-0.2c0.2,0.1,0.3,0.3,0.2,0.5c0,0.1-0.2,0.2-0.3,0.2l7.9,25.6l-0.9-16.4l-0.1-3.7c-0.1,0-0.1,0-0.2,0
				c-0.2-0.1-0.3-0.3-0.2-0.5c0.1-0.2,0.3-0.3,0.5-0.2c0.2,0.1,0.3,0.3,0.2,0.5c0,0.1-0.2,0.2-0.3,0.2l1.3,20.9l0.4,0.3l0.1-0.8
				l-0.9-18.5l-0.2-8.4c0,0,0,0-0.1,0c-0.2-0.1-0.3-0.3-0.2-0.5c0.1-0.2,0.3-0.3,0.5-0.2c0.2,0.1,0.3,0.3,0.2,0.5
				c-0.1,0.2-0.2,0.2-0.4,0.2l1.2,24.9l1.3-12.9l0.4-2.8c0,0-0.1,0-0.1,0c-0.2-0.1-0.3-0.3-0.2-0.5c0.1-0.2,0.3-0.3,0.5-0.2
				c0.2,0.1,0.3,0.3,0.2,0.5c0,0.2-0.2,0.2-0.3,0.2l-1.7,17.1l0,0.2l3.2-16l0.8-3.6c-0.2-0.1-0.3-0.3-0.2-0.4
				c0.1-0.2,0.3-0.3,0.5-0.2c0.2,0.1,0.3,0.3,0.2,0.5c-0.1,0.2-0.3,0.3-0.5,0.2c0,0,0,0,0,0l-4,20.8l0,0.1l0.3,0.2l0,0l0-0.1
				l-0.2-0.1l0.3-0.3l5.4-14.4l1.1-2.6c-0.2-0.1-0.3-0.3-0.2-0.4c0.1-0.2,0.3-0.3,0.5-0.2c0.2,0.1,0.3,0.3,0.2,0.5
				c-0.1,0.2-0.3,0.3-0.5,0.2c0,0,0,0,0,0l-6.1,16.7l14.7-13.4l6.4-5.6c0,0-0.1-0.1-0.1-0.1c0-0.2,0.1-0.4,0.3-0.4
				c0.2,0,0.4,0.1,0.4,0.3c0,0.2-0.1,0.4-0.3,0.4c-0.1,0-0.3-0.1-0.3-0.2l-19.7,18.1l14.4-7.8l3.3-1.6c0,0-0.1-0.1-0.1-0.1
				c0-0.2,0.1-0.4,0.3-0.4c0.2,0,0.4,0.1,0.4,0.3c0,0.2-0.1,0.4-0.3,0.4c-0.1,0-0.2-0.1-0.3-0.2l-18.6,10.2l-0.7,0.6l1.6-0.6
				l16.3-8.7l7.5-3.8c0,0,0,0,0-0.1c0-0.2,0.1-0.4,0.3-0.4c0.2,0,0.4,0.1,0.4,0.3c0,0.2-0.1,0.4-0.3,0.4c-0.2,0-0.3-0.1-0.4-0.2
				l-22,11.8l12.2-4.3l2.7-0.8c0,0,0,0,0-0.1c0-0.2,0.1-0.4,0.3-0.4c0.2,0,0.4,0.1,0.4,0.3c0,0.2-0.1,0.4-0.3,0.4
				c-0.2,0-0.3-0.1-0.4-0.2l-16.1,5.7l-0.2,0.1l15.9-3.9l3.6-0.8c0-0.2,0.1-0.4,0.3-0.4c0.2,0,0.4,0.1,0.4,0.3
				c0,0.2-0.1,0.4-0.3,0.4c-0.2,0-0.4-0.1-0.4-0.3c0,0,0,0,0,0l-20.5,5.2l-0.8,0.4l16.5-1.4l2.9-0.1c0-0.2,0.1-0.3,0.3-0.4
				c0.2,0,0.4,0.1,0.4,0.3c0,0.2-0.1,0.4-0.3,0.4c-0.2,0-0.4-0.1-0.4-0.3c0,0,0,0,0,0l-19.3,1.7l-0.1-0.2l-0.1,0.1l0,0.2l-0.2,0
				l0.3,0.6l0.6,0.2l-0.1-0.1l0-0.2l-0.3,0l0-0.3l20.7,2.5l8.5,1.2c0,0,0-0.1,0-0.1c0.1-0.2,0.4-0.2,0.5,0c0.2,0.1,0.2,0.4,0,0.5
				c-0.1,0.2-0.4,0.2-0.5,0c-0.1-0.1-0.1-0.2-0.1-0.4l-26.6-3.2l15.3,5.9l3.4,1.4c0-0.1,0-0.1,0.1-0.2c0.1-0.1,0.4-0.2,0.5,0
				c0.1,0.1,0.2,0.4,0,0.5c-0.1,0.1-0.4,0.2-0.5,0c-0.1-0.1-0.1-0.2-0.1-0.4l-19.9-7.5l-0.9-0.1l1.5,0.8l17.2,6.8l7.7,3.2
				c0,0,0,0,0-0.1c0.1-0.1,0.4-0.2,0.5,0c0.1,0.1,0.2,0.4,0,0.5c-0.1,0.1-0.4,0.2-0.5,0c-0.1-0.1-0.1-0.3-0.1-0.4l-23.3-9l11.2,6.5
				l2.4,1.5c0,0,0-0.1,0-0.1c0.1-0.1,0.4-0.2,0.5,0c0.2,0.1,0.2,0.4,0,0.5c-0.1,0.2-0.4,0.2-0.5,0c-0.1-0.1-0.1-0.3-0.1-0.4
				l-14.9-8.5l-0.2-0.1l13.4,9.5l2.9,2.2c0.1-0.1,0.3-0.1,0.5,0c0.2,0.1,0.2,0.4,0,0.5c-0.1,0.2-0.4,0.2-0.5,0
				c-0.1-0.1-0.2-0.4,0-0.5c0,0,0,0,0,0l-17.4-12.2l-0.9-0.3l11.9,11.6l2,2.1c0.1-0.1,0.3-0.1,0.5,0c0.2,0.1,0.2,0.4,0,0.5
				c-0.1,0.2-0.4,0.2-0.5,0c-0.2-0.1-0.2-0.4,0-0.5c0,0,0,0,0,0l-13.6-13.2l7.7,17.5l3.3,7.9c0,0,0.1,0,0.1,0c0.2,0,0.3,0.2,0.3,0.4
				c0,0.2-0.2,0.3-0.4,0.3c-0.2,0-0.3-0.2-0.3-0.4c0-0.1,0.2-0.2,0.3-0.3l-10.9-24.5l2.8,16.1l0.5,3.7c0,0,0.1,0,0.1,0
				c0.2,0,0.3,0.2,0.3,0.4c0,0.2-0.2,0.3-0.4,0.3c-0.2,0-0.3-0.2-0.3-0.4c0-0.1,0.1-0.2,0.3-0.3l-3.8-20.9l-0.4-0.9l0,0l0,1.7
				l3,18.3l1.2,8.3c0,0,0,0,0.1,0c0.2,0,0.3,0.2,0.3,0.4c0,0.2-0.2,0.3-0.4,0.3c-0.2,0-0.3-0.2-0.3-0.4c0-0.2,0.2-0.3,0.4-0.3
				l-4.2-24.6l0.2,12.9l-0.1,2.8c0,0,0.1,0,0.1,0c0.2,0,0.3,0.2,0.3,0.4c0,0.2-0.2,0.3-0.4,0.3c-0.2,0-0.3-0.2-0.3-0.4
				c0-0.2,0.2-0.2,0.3-0.3l-0.3-17.2l0-0.2l-1.3,16.3l-0.4,3.6c0.2,0.1,0.3,0.2,0.3,0.4c0,0.2-0.2,0.3-0.4,0.3
				c-0.2,0-0.3-0.2-0.3-0.4c0-0.2,0.2-0.3,0.4-0.3c0,0,0,0,0,0l1.5-21.1l0-0.2l-0.5,0.9l-3.5,14.5l-0.8,2.8c0.2,0.1,0.3,0.2,0.3,0.4
				c0,0.2-0.2,0.3-0.4,0.3c-0.2,0-0.3-0.2-0.3-0.4c0-0.2,0.2-0.3,0.4-0.3c0,0,0,0,0,0l3.9-16.6l-9.5,15.5l-4.6,7.2
				c0,0,0.1,0,0.1,0.1c0.1,0.2,0,0.4-0.2,0.5c-0.2,0.1-0.4,0-0.5-0.2c-0.1-0.2,0-0.4,0.2-0.5c0.1-0.1,0.3,0,0.4,0.1l13.9-22.9
				l-11.7,11.4l-2.7,2.5c0,0,0.1,0.1,0.1,0.1c0.1,0.2,0,0.4-0.2,0.5c-0.2,0.1-0.4,0-0.5-0.2c-0.1-0.2,0-0.4,0.2-0.5
				c0.1-0.1,0.3,0,0.4,0.1l14.9-14.8l0.1-0.6l-0.9,0.6l-13.3,12.8l-6.1,5.7c0,0,0,0,0.1,0c0.1,0.2,0,0.4-0.2,0.5
				c-0.2,0.1-0.4,0-0.5-0.2c-0.1-0.2,0-0.4,0.2-0.5c0.2-0.1,0.3,0,0.4,0.1l17.9-17.4l-10.5,7.5l-2.3,1.5c0,0,0.1,0,0.1,0.1
				c0.1,0.2,0,0.4-0.2,0.5c-0.2,0.1-0.4,0-0.5-0.2c-0.1-0.2,0-0.4,0.2-0.5c0.1-0.1,0.3,0,0.4,0.1l13.9-10l0.2-0.2l-14.2,8.2
				l-3.2,1.7c0.1,0.2,0,0.4-0.2,0.4c-0.2,0.1-0.4,0-0.5-0.2c-0.1-0.2,0-0.4,0.2-0.5c0.2-0.1,0.4,0,0.5,0.2c0,0,0,0,0,0l18.3-10.7
				l0.2-0.2l-0.8,0L96.5,441l-2.7,0.9c0.1,0.2,0,0.4-0.2,0.4c-0.2,0.1-0.4,0-0.5-0.2c-0.1-0.2,0-0.4,0.2-0.5c0.2-0.1,0.4,0,0.5,0.2
				c0,0,0,0,0,0l16.1-6.2l-18,0.8l-8.5,0.2c0,0,0,0.1,0,0.1c-0.1,0.2-0.3,0.2-0.5,0.1c-0.2-0.1-0.2-0.3-0.1-0.5
				c0.1-0.2,0.3-0.2,0.5-0.1c0.1,0.1,0.2,0.2,0.1,0.4l26.8-1.2l-16-3.3l-3.6-0.9c0,0,0,0.1,0,0.2c-0.1,0.2-0.3,0.2-0.5,0.1
				c-0.2-0.1-0.2-0.3-0.1-0.5c0.1-0.2,0.3-0.2,0.5-0.1c0.1,0.1,0.2,0.2,0.1,0.3l20.5,4.1l0.6-0.2l-0.9-0.3l-18.1-3.9l-8.1-1.9
				c0,0,0,0,0,0.1c-0.1,0.2-0.3,0.2-0.5,0.1c-0.2-0.1-0.2-0.3-0.1-0.5C84,428.4,84.2,428.3,84.4,428.5z M111.7,434.1l0.2,0.5l0.1,0
				l0-0.3L111.7,434.1z M112.5,435.3L112.5,435.3L112.5,435.3L112.5,435.3L112.5,435.3z M112.5,434.6L112.5,434.6l0.2,0.1
				L112.5,434.6z M112.5,435l0,0.1L112.5,435L112.5,435z M113.3,434.4L113.3,434.4l-0.3-0.1l-0.1,0.3L113.3,434.4z M111.9,436.1
				l0.2-0.4l0,0l-0.1,0.1L111.9,436.1z M111.7,435.3L111.7,435.3l-0.2,0L111.7,435.3z"
				/>
				<g>
					<g>
						<path
							fill="#E2617D"
							d="M97,338.1L97,338.1L97,338.1L97,338.1L97,338.1z"
						/>
					</g>
				</g>
				<path
					fill="#E05A6A"
					d="M133.4,362.3c0.1,0.1,0,0.3-0.1,0.4c-0.1,0.1-0.2,0-0.3,0l-10.1,20.2c0,0,0.1,0,0.1,0l8.9-10.4l2.1-2.3
				c0,0-0.1,0-0.1-0.1c-0.1-0.2,0-0.3,0.1-0.4c0.2-0.1,0.3,0,0.4,0.1c0.1,0.2,0,0.3-0.1,0.4c-0.1,0.1-0.2,0-0.3,0l-10.7,12.7
				c0.2,0,0.3,0.1,0.5,0.1l9.7-11.1l4.8-5.3c0,0,0,0,0,0c-0.1-0.1,0-0.3,0.1-0.4c0.2-0.1,0.3,0,0.4,0.1c0.1,0.2,0,0.3-0.1,0.4
				c-0.1,0.1-0.3,0-0.4-0.1l-13.9,16.1l8.4-7.1l1.9-1.5c0,0,0,0-0.1,0c-0.1-0.2,0-0.3,0.1-0.4c0.2-0.1,0.3,0,0.4,0.1
				c0.1,0.2,0,0.3-0.1,0.4c-0.1,0.1-0.3,0-0.3-0.1l-10.6,9c0,0,0.1,0,0.1,0.1l10.6-7.4l2.6-1.7c-0.1-0.1,0-0.3,0.1-0.4
				c0.1-0.1,0.3,0,0.4,0.1c0.1,0.2,0,0.3-0.1,0.4c-0.2,0.1-0.3,0-0.4-0.1c0,0,0,0,0,0l-13,9.2c0.2,0.1,0.3,0.3,0.5,0.5l10-4.9l2.2-1
				c-0.1-0.1,0-0.3,0.1-0.4c0.2-0.1,0.3,0,0.4,0.1c0.1,0.2,0,0.3-0.1,0.4c-0.2,0.1-0.3,0-0.4-0.1c0,0,0,0,0,0l-12.2,6c0,0,0,0,0,0.1
				c0.1,0.2,0.2,0.5,0.3,0.7l15.2,0.4l7.3,0.3c0,0,0-0.1,0-0.1c0.1-0.1,0.3-0.2,0.4-0.1c0.1,0.1,0.2,0.3,0.1,0.4
				c-0.1,0.1-0.3,0.2-0.4,0.1c-0.1-0.1-0.1-0.2-0.1-0.3l-22.4-0.4c0,0,0,0.1,0,0.1l13,3.6l3,0.9c0,0,0-0.1,0-0.1
				c0.1-0.1,0.3-0.2,0.4-0.1c0.1,0.1,0.2,0.3,0.1,0.4c-0.1,0.1-0.3,0.2-0.4,0.1c-0.1-0.1-0.1-0.2-0.1-0.3l-16-4.3
				c0,0.1,0,0.3-0.1,0.4l14.3,4l6.8,2.1c0,0,0,0,0-0.1c0.1-0.1,0.3-0.2,0.4-0.1c0.1,0.1,0.2,0.3,0.1,0.4c-0.1,0.1-0.3,0.2-0.4,0.1
				c-0.1-0.1-0.1-0.2-0.1-0.4l-20.5-5.7l10.1,4.6l2.1,1.1c0,0,0-0.1,0-0.1c0.1-0.1,0.3-0.2,0.4-0.1c0.1,0.1,0.2,0.3,0.1,0.4
				c-0.1,0.1-0.3,0.2-0.4,0.1c-0.1-0.1-0.1-0.2-0.1-0.3l-12.9-5.8c0,0,0,0.1,0,0.1l11.5,6.6l2.7,1.6c0.1-0.1,0.3-0.1,0.4-0.1
				c0.1,0.1,0.2,0.3,0.1,0.4c-0.1,0.1-0.3,0.2-0.4,0.1c-0.1-0.1-0.2-0.3-0.1-0.4c0,0,0,0,0,0l-14.2-8c-0.1,0.2-0.2,0.3-0.4,0.5
				l9.1,7.3l1.8,1.6c0.1-0.1,0.3-0.1,0.4,0c0.1,0.1,0.2,0.3,0.1,0.4c-0.1,0.1-0.3,0.2-0.4,0.1c-0.1-0.1-0.2-0.3-0.1-0.4c0,0,0,0,0,0
				l-11-8.8c-0.1,0.1-0.3,0.2-0.4,0.3c-0.1,0-0.1,0-0.2,0.1l9.8,12l4.5,5.7c0,0,0.1,0,0.1-0.1c0.2,0,0.3,0.1,0.3,0.3
				c0,0.2-0.1,0.3-0.3,0.3c-0.2,0-0.3-0.1-0.3-0.3c0-0.1,0.1-0.2,0.2-0.3l-14.6-17.6c0,0,0,0,0,0l6,12.6l1.3,2.9
				c0,0,0.1-0.1,0.1-0.1c0.2,0,0.3,0.1,0.3,0.3c0,0.2-0.1,0.3-0.3,0.3c-0.2,0-0.3-0.1-0.3-0.3c0-0.1,0.1-0.2,0.2-0.3l-7.5-15.4
				c-0.1,0-0.3,0-0.4,0.1l6.6,14.1l2.9,6.5c0,0,0,0,0,0c0.2,0,0.3,0.1,0.3,0.3c0,0.2-0.1,0.3-0.3,0.3c-0.2,0-0.3-0.1-0.3-0.3
				c0-0.1,0.1-0.3,0.2-0.3l-9.1-19.2l3.1,10.6l0.6,2.3c0,0,0,0,0.1,0c0.2,0,0.3,0.1,0.3,0.3c0,0.2-0.1,0.3-0.3,0.3
				c-0.2,0-0.3-0.1-0.3-0.3c0-0.1,0.1-0.2,0.2-0.3l-4.2-14l-0.1-0.2l2.7,13.7l0.5,3.1c0.2,0,0.3,0.1,0.3,0.3c0,0.2-0.1,0.3-0.3,0.3
				c-0.2,0-0.3-0.1-0.3-0.3c0-0.2,0.1-0.3,0.3-0.3c0,0,0,0,0,0l-3.4-17c-0.2,0-0.3-0.1-0.5-0.1l0.5,12.8l0,2.4
				c0.1,0,0.3,0.1,0.3,0.3c0,0.2-0.1,0.3-0.3,0.3c-0.2,0-0.3-0.1-0.3-0.3c0-0.2,0.1-0.3,0.3-0.3c0,0,0,0,0,0l-0.6-15.3
				c-0.1,0-0.2-0.1-0.3-0.2l-5.3,14.6l-2.6,6.8c0,0,0.1,0,0.1,0.1c0.1,0.1,0.1,0.3-0.1,0.4c-0.1,0.1-0.3,0.1-0.4-0.1
				c-0.1-0.1-0.1-0.3,0.1-0.4c0.1-0.1,0.2,0,0.3,0l7.7-21.5l-7.8,11.6l-1.8,2.6c0,0,0.1,0,0.1,0.1c0.1,0.1,0.1,0.3-0.1,0.4
				c-0.1,0.1-0.3,0.1-0.4-0.1c-0.1-0.1-0.1-0.3,0.1-0.4c0.1-0.1,0.2-0.1,0.3,0l9.5-14.4c-0.1-0.1-0.2-0.2-0.3-0.3l-8.8,12.9
				l-4.1,5.8c0,0,0,0,0,0c0.1,0.1,0.1,0.3-0.1,0.4c-0.1,0.1-0.3,0.1-0.4-0.1c-0.1-0.1-0.1-0.3,0.1-0.4c0.1-0.1,0.3-0.1,0.4,0
				l11.9-17.6l-7.5,8.1l-1.7,1.7c0,0,0.1,0,0.1,0c0.1,0.1,0.1,0.3-0.1,0.4c-0.1,0.1-0.3,0.1-0.4-0.1c-0.1-0.1-0.1-0.3,0.1-0.4
				c0.1-0.1,0.2-0.1,0.3,0l9.9-10.7l0.1-0.2l-10.4,9.3l-2.4,2c0.1,0.1,0.1,0.3-0.1,0.4c-0.1,0.1-0.3,0.1-0.4-0.1
				c-0.1-0.1-0.1-0.3,0.1-0.4c0.1-0.1,0.3-0.1,0.4,0.1c0,0,0,0,0,0l12.8-11.6c-0.1-0.1-0.1-0.3-0.1-0.4l-0.1,0l-10.7,6.9l-2.1,1.2
				c0.1,0.1,0.1,0.3-0.1,0.4c-0.1,0.1-0.3,0.1-0.4-0.1c-0.1-0.1-0.1-0.3,0.1-0.4c0.1-0.1,0.3-0.1,0.4,0.1c0,0,0,0,0,0l12.2-7.9
				l-15,3.9l-7.1,1.7c0,0,0,0.1,0,0.1c-0.1,0.2-0.2,0.2-0.4,0.2c-0.2-0.1-0.3-0.2-0.2-0.4c0.1-0.2,0.2-0.2,0.4-0.2
				c0.1,0,0.2,0.2,0.2,0.3l22.1-5.9l-14,0.1l-3.1-0.1c0,0,0,0.1,0,0.1c-0.1,0.2-0.2,0.2-0.4,0.2c-0.2-0.1-0.3-0.2-0.2-0.4
				c0.1-0.2,0.2-0.2,0.4-0.2c0.1,0,0.2,0.1,0.2,0.3l17.7-0.3c0-0.1,0-0.3,0-0.4l-0.3,0l-15.8,0.1l-7.1-0.1c0,0,0,0,0,0.1
				c-0.1,0.2-0.2,0.2-0.4,0.2c-0.2-0.1-0.2-0.2-0.2-0.4c0.1-0.2,0.2-0.3,0.4-0.2c0.1,0.1,0.2,0.2,0.2,0.3l21.3-0.2l-10.9-1.6
				l-2.3-0.4c0,0,0,0.1,0,0.1c-0.1,0.2-0.2,0.2-0.4,0.2c-0.2-0.1-0.2-0.2-0.2-0.4c0.1-0.2,0.2-0.2,0.4-0.2c0.1,0,0.2,0.2,0.2,0.3
				l14.5,2.1h0.2l-13.6-3.3l-3-0.8c-0.1,0.1-0.2,0.2-0.4,0.2c-0.2-0.1-0.3-0.2-0.2-0.4c0.1-0.2,0.2-0.2,0.4-0.2
				c0.2,0.1,0.2,0.2,0.2,0.4c0,0,0,0,0,0l17.1,4.1c0-0.1,0.1-0.3,0.1-0.4l-11.9-5l-2.2-1c-0.1,0.1-0.2,0.2-0.4,0.2
				c-0.2-0.1-0.2-0.2-0.2-0.4c0.1-0.2,0.2-0.2,0.4-0.2c0.2,0.1,0.2,0.2,0.2,0.4c0,0,0,0,0,0l13.7,5.7l-11.5-10.1l-5.4-4.9
				c0,0-0.1,0.1-0.1,0.1c-0.2,0-0.3-0.1-0.4-0.2c0-0.2,0.1-0.3,0.2-0.4c0.2,0,0.3,0.1,0.4,0.2c0,0.1,0,0.2-0.1,0.3l17.3,15l-8-11.5
				l-1.7-2.6c0,0-0.1,0.1-0.1,0.1c-0.2,0-0.3-0.1-0.4-0.2c0-0.2,0.1-0.3,0.2-0.4c0.2,0,0.3,0.1,0.4,0.2c0,0.1,0,0.2-0.1,0.3l10,14.2
				c0.1-0.1,0.2-0.2,0.3-0.4l-8.8-12.8l-3.9-6c0,0,0,0,0,0c-0.2,0-0.3-0.1-0.4-0.2c0-0.2,0.1-0.3,0.2-0.4c0.2,0,0.3,0.1,0.4,0.2
				c0,0.1,0,0.3-0.2,0.3l12.1,17.5l-4.8-9.9l-0.9-2.2c0,0,0,0-0.1,0.1c-0.2,0-0.3-0.1-0.4-0.2c0-0.2,0.1-0.3,0.2-0.4
				c0.2,0,0.3,0.1,0.4,0.2c0,0.1,0,0.2-0.1,0.3l6.4,13.1l0.1,0.1c0,0,0,0,0,0l-4.8-13l-1-3c-0.2,0-0.3-0.1-0.4-0.2
				c0-0.2,0.1-0.3,0.2-0.4c0.2,0,0.3,0.1,0.4,0.2c0,0.2-0.1,0.3-0.2,0.4c0,0,0,0,0,0l6,15.8c0,0,0.1-0.1,0.1-0.1
				c0.1-0.1,0.2-0.1,0.4-0.2l-2.4-11.9l-0.4-2.4c-0.2,0-0.3-0.1-0.3-0.2c0-0.2,0.1-0.3,0.2-0.4c0.2,0,0.3,0.1,0.4,0.2
				c0,0.2-0.1,0.3-0.2,0.4c0,0,0,0,0,0l2.9,14.2c0.1,0,0.2-0.1,0.3-0.1l6.9-13.8l3.4-6.4c0,0-0.1,0-0.1-0.1c-0.1-0.2,0-0.3,0.1-0.4
				C133.1,362.1,133.3,362.1,133.4,362.3z"
				/>
				<g>
					<radialGradient
						id="SVGID_24_"
						cx="3255.2925"
						cy="-443.969"
						r="39.489"
						gradientTransform="matrix(0.27 -0.961 0.9609 0.2723 -357.8255 3619.0989)"
						gradientUnits="userSpaceOnUse"
					>
						<stop offset="0" style="stop-color:#F4D4D7" />
						<stop offset="1" style="stop-color:#FB879E" />
					</radialGradient>
					<path
						fill="url(#SVGID_24_)"
						d="M94.8,372.2c2.4,4.5-4.9,21.9-17.1,25.3c-5.5,1.5-21.1,4.4-21.9,0.6c-0.4-1.9,6-13.2,11.1-21.2
					C72.6,368,90,363,94.8,372.2z"
					/>
					<path
						fill="#F2E4E6"
						d="M79.5,394.1c0,0,8-3.1,11.9-15.7c0.9-2.8,1.4-3.6,0.6-3.5c-0.4,7-16.6,15.4-17,15.6
					c0,0,12.3-7,15.8-13.5c0.2-0.4,1.1-2.8,0-2.2c-1,0.5-7.1,4.4-7.1,4.4l0,0c3.9-3.1,4.7-3.4,5.3-4.2c0.4-0.5,0.1-1.2-0.3-1.2
					c-1.5,0.1-7.7,1.4-16.1,7.2c0,0,9.3-7.4,16.7-7.9c0.5,0,0.6-0.8,0.1-0.8c-5.9-0.4-16.9,4.8-16.9,4.8s10-5.2,15.4-5.3
					c0.4,0,0.5-0.8-0.1-0.9c-4.4-0.6-11.6,0.2-11.6,0.2c6.5-1.1,9.2-0.9,11-1c2.5-0.2-5.9-2.1-5.9-2.1s9.5-1.2,12.7,3.4
					c2.9,4.2-2.4,12.2-2.4,12.2s2-4.9,1.6-7.1C93,374.4,89.3,390.4,79.5,394.1z"
					/>

					<radialGradient
						id="SVGID_25_"
						cx="3197.3923"
						cy="-417.8726"
						r="68.2568"
						gradientTransform="matrix(0.27 -0.961 0.9609 0.2723 -357.8255 3619.0989)"
						gradientUnits="userSpaceOnUse"
					>
						<stop offset="0" style="stop-color:#FEEDF0" />
						<stop offset="0.6209" style="stop-color:#E05A6A" />
					</radialGradient>
					<path
						fill="url(#SVGID_25_)"
						d="M96.1,423.7c-3.6,3.9-22.2,3.4-29.1-6.8c-3.1-4.6-10.6-18.1-7.2-20.3c1.7-1.1,14.3,0.8,23.5,2.7
					C93.3,401.4,103.3,415.8,96.1,423.7z"
					/>
					<path
						fill="#F2E4E6"
						d="M70.7,417.3c0,0,5.4,6.3,18.5,5.4c3-0.2,3.8,0.1,3.5-0.7c-6.8,2.2-19.6-9.9-19.9-10.2
					c0,0,10.4,9,17.5,9.9c0.5,0.1,2.9,0,2.1-0.8c-0.8-0.8-6.3-5-6.3-5l0,0c4.1,2.5,4.6,3.1,5.6,3.5c0.6,0.2,1.2-0.3,1-0.7
					c-0.5-1.4-3.7-6.6-11.7-12.4c0,0,9.8,6.1,12.5,12.8c0.2,0.5,0.9,0.3,0.8-0.2c-1.4-5.7-9.7-14.1-9.7-14.1s7.9,7.5,9.7,12.5
					c0.1,0.3,0.9,0.2,0.8-0.4c-0.7-4.3-3.6-10.8-3.6-10.8c3,5.7,3.6,8.3,4.3,9.9c1,2.3,0.3-6.3,0.3-6.3s4,8.5,0.5,13.1
					c-3.1,4.2-12.3,2.2-12.3,2.2s5.2,0.1,7.2-1C93.5,422.8,77.2,425.2,70.7,417.3z"
					/>

					<radialGradient
						id="SVGID_26_"
						cx="3167.0393"
						cy="-458.3041"
						r="41.5448"
						gradientTransform="matrix(0.27 -0.961 0.9609 0.2723 -357.8255 3619.0989)"
						gradientUnits="userSpaceOnUse"
					>
						<stop offset="6.043960e-002" style="stop-color:#FEEDF0" />
						<stop offset="1" style="stop-color:#FB879E" />
					</radialGradient>
					<path
						fill="url(#SVGID_26_)"
						d="M52.1,443.4c-4.9-1-13.1-17-7.7-28.2c2.4-5,10.4-18.4,13.8-16.6c1.7,0.8,6,12.5,8.6,21.2
					C69.6,429.5,62.1,445.4,52.1,443.4z"
					/>
					<path
						fill="#FEEDF0"
						d="M45.7,418.6c0,0-2.8,7.8,4,18.4c1.5,2.4,1.7,3.3,2.2,2.6c-5-4.6-0.7-21.7-0.6-22.2c0,0-2.8,13.4-0.2,20
					c0.2,0.4,1.4,2.5,1.6,1.4c0.3-1.1,1.3-7.9,1.3-7.9v0c-0.2,4.8-0.5,5.5-0.3,6.6c0.1,0.6,0.8,0.8,1.1,0.5
					c0.9-1.2,3.9-6.6,5.1-16.4c0,0-0.6,11.4-5,17.2c-0.3,0.4,0.2,0.9,0.6,0.6c4.2-4.1,7.4-15.5,7.4-15.5s-2.6,10.6-6,14.7
					c-0.2,0.3,0.2,0.8,0.7,0.5c3.3-2.9,7.4-8.7,7.4-8.7c-3.4,5.5-5.3,7.3-6.4,8.8c-1.5,2,5.4-3.1,5.4-3.1s-5.3,7.8-10.8,7.3
					c-5-0.5-7.6-9.2-7.6-9.2s2.4,4.4,4.2,5.6C51.7,440.8,42.1,428.2,45.7,418.6z"
					/>

					<radialGradient
						id="SVGID_27_"
						cx="3197.157"
						cy="-512.9384"
						r="23.3593"
						gradientTransform="matrix(0.27 -0.961 0.9609 0.2723 -357.8255 3619.0989)"
						gradientUnits="userSpaceOnUse"
					>
						<stop offset="0" style="stop-color:#EDEDED" />
						<stop offset="1" style="stop-color:#FB879E" />
					</radialGradient>
					<path
						fill="url(#SVGID_27_)"
						d="M15,404.3c0-5.3,14.6-17.9,26.9-15.3c5.5,1.2,17.3,5.5,16.2,9.5c-0.5,1.9-8.1,9.7-16.4,14.7
					C32.5,418.6,15,415.1,15,404.3z"
					/>
					<path
						fill="#FEEDF0"
						d="M38.8,391.2c0,0-8.4-0.9-17.8,8.9c-2.1,2.2-2.9,2.6-2.2,2.9c3.7-6.3,21.7-6.4,22.2-6.4
					c0,0-14.1,0.6-20.2,5c-0.4,0.3-2.2,2.1-1.1,2c1.1,0,8.3-0.8,8.3-0.8h0c-4.9,1-5.7,0.9-6.7,1.4c-0.6,0.3-0.7,1-0.3,1.2
					c1.3,0.6,7.4,2.3,17.5,0.9c0,0-11.6,2.4-18.3-0.6c-0.5-0.2-0.9,0.5-0.4,0.7c5,3.2,17.1,3.5,17.1,3.5s-11.2,0.1-16-2.4
					c-0.3-0.2-0.8,0.5-0.3,0.8c3.6,2.6,10.2,5.3,10.2,5.3c-6.2-2.1-8.4-3.5-10.1-4.2c-2.3-1,4.2,4.8,4.2,4.8s-8.9-3.4-9.4-9.2
					c-0.5-5.2,7.8-10.2,7.8-10.2s-4,3.6-4.8,5.8C17.6,403.1,28.4,390.1,38.8,391.2z"
					/>

					<radialGradient
						id="SVGID_28_"
						cx="3254.3367"
						cy="-511.4241"
						r="57.5322"
						gradientTransform="matrix(0.27 -0.961 0.9609 0.2723 -357.8255 3619.0989)"
						gradientUnits="userSpaceOnUse"
					>
						<stop offset="0" style="stop-color:#F4D4D7" />
						<stop offset="0.7198" style="stop-color:#E05A6A" />
					</radialGradient>
					<path
						fill="url(#SVGID_28_)"
						d="M39.8,358.6c5-1.6,20.6,8.4,21.3,21c0.3,5.6-0.4,21.4-4.4,21.6c-2,0.1-11.8-8-18.6-14.5
					C30.6,379.7,29.5,361.9,39.8,358.6z"
					/>
					<path
						fill="#FDD0D9"
						d="M58.1,377.3c0,0-1.3-8.3-12.9-14.3c-2.6-1.3-3.2-2-3.3-1.2c6.9,1.6,11.5,18.8,11.7,19.3
					c0,0-4.1-13.3-9.8-17.7c-0.4-0.3-2.5-1.5-2.2-0.4c0.3,1.1,2.8,7.7,2.8,7.7l0,0c-2.2-4.4-2.3-5.1-3-5.9c-0.4-0.5-1.2-0.3-1.2,0.1
					c-0.3,1.5-0.3,7.7,3.5,17c0,0-5.2-10.4-4.1-17.7c0.1-0.5-0.7-0.7-0.8-0.2c-1.8,5.7,0.9,17.4,0.9,17.4s-2.9-10.7-1.8-16
					c0.1-0.4-0.7-0.6-0.9-0.1c-1.6,4.2-2.5,11.4-2.5,11.4c0.4-6.5,1.2-9.2,1.5-11c0.3-2.5-3.5,5.5-3.5,5.5s1-9.5,6.3-11.9
					c4.9-2.1,11.6,4.3,11.6,4.3s-4.4-2.7-6.7-2.8C41.5,360.7,56.6,367,58.1,377.3z"
					/>
					<path
						fill="#FFFFFF"
						d="M30.9,386c0.1,0.1,0.1,0.3,0,0.4L53.5,397l-10.7-7.2l-2.3-1.6c0,0,0,0.1,0,0.1c-0.1,0.1-0.4,0.1-0.5,0
					c-0.1-0.1-0.1-0.4,0-0.5c0.1-0.1,0.4-0.1,0.5,0c0.1,0.1,0.1,0.3,0,0.4l14.3,9.5l0.2,0.1l-12.7-10.4l-2.8-2.4
					c-0.2,0.1-0.4,0.1-0.5,0c-0.1-0.1-0.1-0.4,0-0.5c0.1-0.1,0.4-0.1,0.5,0c0.1,0.1,0.1,0.4,0,0.5c0,0,0,0,0,0l16.3,13.1l0-0.7
					l-9.9-11.1l-1.8-2.2c-0.1,0.1-0.3,0.1-0.5,0c-0.1-0.1-0.1-0.4,0-0.5c0.1-0.1,0.4-0.1,0.5,0c0.1,0.1,0.1,0.4,0,0.5c0,0,0,0,0,0
					l11.7,13l-1.2-18.7l-0.4-8.5c0,0-0.1,0-0.1,0c-0.2-0.1-0.2-0.3-0.1-0.5c0.1-0.2,0.3-0.2,0.5-0.1c0.2,0.1,0.2,0.3,0.1,0.5
					c-0.1,0.1-0.2,0.2-0.4,0.1l1.8,26.7l2.9-16.1l0.8-3.6c-0.1,0-0.1,0-0.2,0c-0.2-0.1-0.2-0.3-0.1-0.5c0.1-0.2,0.3-0.2,0.5-0.1
					c0.2,0.1,0.2,0.3,0.1,0.5c-0.1,0.1-0.2,0.2-0.3,0.1l-3.6,20.6l0.3,0.3l0.3-0.7l3.4-18.2l1.7-8.2c0,0,0,0-0.1,0
					c-0.2-0.1-0.2-0.3-0.1-0.5c0.1-0.2,0.3-0.2,0.5-0.1c0.2,0.1,0.2,0.3,0.1,0.5c-0.1,0.2-0.3,0.2-0.4,0.1l-4.5,24.5l4.3-12.2l1-2.6
					c0,0-0.1,0-0.1,0c-0.2-0.1-0.2-0.3-0.1-0.5c0.1-0.2,0.3-0.2,0.5-0.1c0.2,0.1,0.2,0.3,0.1,0.5c-0.1,0.1-0.2,0.2-0.4,0.1
					l-5.6,16.2l0,0.2L64,382l1.6-3.3c-0.2-0.1-0.2-0.3-0.1-0.5c0.1-0.2,0.3-0.2,0.5-0.1c0.2,0.1,0.2,0.3,0.1,0.5
					c-0.1,0.2-0.3,0.2-0.5,0.1c0,0,0,0,0,0l-8.7,19.3l0,0.1l0.2,0.2l0,0l0.1-0.1l-0.1-0.2l0.4-0.2l8.5-12.8l1.7-2.3
					c-0.1-0.1-0.2-0.3-0.1-0.5c0.1-0.2,0.3-0.2,0.5-0.1c0.2,0.1,0.2,0.3,0.1,0.5c-0.1,0.2-0.3,0.2-0.5,0.1c0,0,0,0,0,0l-9.8,14.8
					l17.4-9.6l7.6-4c0,0,0-0.1,0-0.1c0-0.2,0.2-0.4,0.4-0.3c0.2,0,0.4,0.2,0.3,0.4c0,0.2-0.2,0.3-0.4,0.3c-0.1,0-0.2-0.1-0.3-0.3
					l-23.4,13.1l15.8-4.2l3.6-0.8c0,0-0.1-0.1,0-0.2c0-0.2,0.2-0.3,0.4-0.3c0.2,0,0.4,0.2,0.3,0.4c0,0.2-0.2,0.3-0.4,0.3
					c-0.1,0-0.2-0.1-0.3-0.2l-20.5,5.6l-0.8,0.5l1.7-0.2l17.9-4.6l8.1-1.9c0,0,0,0,0-0.1c0-0.2,0.2-0.3,0.4-0.3
					c0.2,0,0.3,0.2,0.3,0.4c0,0.2-0.2,0.4-0.4,0.3c-0.2,0-0.3-0.2-0.3-0.3l-24.1,6.4l12.9-1.3l2.8-0.2c0,0,0-0.1,0-0.1
					c0-0.2,0.2-0.4,0.4-0.3c0.2,0,0.3,0.2,0.3,0.4c0,0.2-0.2,0.3-0.4,0.3c-0.2,0-0.3-0.1-0.3-0.3l-17,1.8l-0.2,0.1l16.4-0.1l3.7,0.1
					c0-0.2,0.2-0.3,0.4-0.3c0.2,0,0.4,0.2,0.3,0.4c0,0.2-0.2,0.4-0.4,0.3c-0.2,0-0.3-0.2-0.3-0.4c0,0,0,0,0,0l-21.2,0.3l-0.9,0.2
					l16.4,2.5l2.8,0.5c0-0.2,0.2-0.3,0.4-0.3c0.2,0,0.4,0.2,0.3,0.4c0,0.2-0.2,0.3-0.4,0.3c-0.2,0-0.4-0.2-0.3-0.4c0,0,0,0,0,0
					l-19.2-2.8l-0.1-0.2l-0.1,0l-0.1,0.2L57,399l0.1,0.6l0.6,0.4l-0.1-0.1l0-0.2l-0.3-0.1l0-0.3l19.5,7.2l8,3.1c0,0,0-0.1,0.1-0.1
					c0.2-0.1,0.4-0.1,0.5,0.1c0.1,0.2,0.1,0.4-0.1,0.5c-0.2,0.1-0.4,0.1-0.5-0.1c-0.1-0.1-0.1-0.3,0-0.4l-25.2-9.2l13.5,9.2l3,2.2
					c0,0,0-0.1,0.1-0.1c0.2-0.1,0.4-0.1,0.5,0.1c0.1,0.2,0.1,0.4-0.1,0.5c-0.2,0.1-0.4,0.1-0.5-0.1c-0.1-0.1-0.1-0.3,0-0.4L58.6,400
					l-0.9-0.3l1.2,1.2l15.2,10.5l6.8,4.9c0,0,0,0,0-0.1c0.2-0.1,0.4-0.1,0.5,0.1c0.1,0.2,0.1,0.4-0.1,0.5c-0.2,0.1-0.4,0.1-0.5-0.1
					c-0.1-0.1-0.1-0.3,0-0.4l-20.6-14.1l9.4,8.9l2,2c0,0,0-0.1,0-0.1c0.2-0.1,0.4-0.1,0.5,0.1c0.1,0.2,0.1,0.4-0.1,0.5
					c-0.2,0.1-0.4,0.1-0.5-0.1c-0.1-0.1-0.1-0.3,0-0.4l-12.5-11.7l-0.2-0.1l10.8,12.3l2.3,2.8c0.2-0.1,0.4-0.1,0.5,0.1
					c0.1,0.2,0.1,0.4-0.1,0.5c-0.2,0.1-0.4,0.1-0.5-0.1c-0.1-0.2-0.1-0.4,0.1-0.5c0,0,0,0,0,0L58,400.6l-0.8-0.5l8.9,14l1.4,2.5
					c0.2-0.1,0.4-0.1,0.5,0.1c0.1,0.2,0.1,0.4-0.1,0.5c-0.2,0.1-0.4,0.1-0.5-0.1c-0.1-0.2-0.1-0.4,0.1-0.5c0,0,0,0,0,0l-10.2-16
					l3.5,18.8l1.4,8.4c0,0,0.1,0,0.1,0c0.2,0.1,0.3,0.3,0.2,0.5c-0.1,0.2-0.3,0.3-0.5,0.2c-0.2-0.1-0.3-0.3-0.2-0.5
					c0.1-0.1,0.2-0.2,0.3-0.2l-5-26.3l-1,16.4l-0.3,3.7c0.1,0,0.1,0,0.2,0c0.2,0.1,0.3,0.3,0.2,0.5c-0.1,0.2-0.3,0.3-0.5,0.2
					c-0.2-0.1-0.3-0.3-0.2-0.5c0.1-0.1,0.2-0.2,0.3-0.2l1.1-21.2l-0.2-0.9v0l-0.4,1.6l-1.3,18.5l-0.7,8.3c0,0,0,0,0.1,0
					c0.2,0.1,0.3,0.3,0.2,0.5c-0.1,0.2-0.3,0.3-0.5,0.2c-0.2-0.1-0.3-0.3-0.2-0.5c0.1-0.2,0.2-0.2,0.4-0.2L56,403l-2.8,12.6
					l-0.7,2.7c0,0,0.1,0,0.1,0c0.2,0.1,0.3,0.3,0.2,0.5c-0.1,0.2-0.3,0.3-0.5,0.2c-0.2-0.1-0.3-0.3-0.2-0.5c0.1-0.1,0.2-0.2,0.4-0.2
					l3.7-16.7l0-0.2l-5,15.6l-1.2,3.4c0.2,0.1,0.2,0.3,0.2,0.5c-0.1,0.2-0.3,0.3-0.5,0.2c-0.2-0.1-0.3-0.3-0.2-0.5
					c0.1-0.2,0.3-0.3,0.5-0.2c0,0,0,0,0,0l6.4-20.2l0-0.2l-0.7,0.7l-6.8,13.3l-1.4,2.5c0.1,0.1,0.2,0.3,0.2,0.4
					c-0.1,0.2-0.3,0.3-0.5,0.2c-0.2-0.1-0.3-0.3-0.2-0.5c0.1-0.2,0.3-0.3,0.5-0.2c0,0,0,0,0,0l7.7-15.3L42.1,414l-6.2,5.9
					c0,0,0.1,0.1,0.1,0.1c0,0.2-0.1,0.4-0.3,0.4c-0.2,0-0.4-0.1-0.4-0.3c0-0.2,0.1-0.4,0.3-0.4c0.1,0,0.3,0.1,0.3,0.2l18.8-19
					l-14,8.4l-3.2,1.8c0,0,0.1,0.1,0.1,0.1c0,0.2-0.1,0.4-0.3,0.4c-0.2,0-0.4-0.1-0.4-0.3c0-0.2,0.1-0.4,0.3-0.4
					c0.1,0,0.3,0,0.3,0.1l17.9-10.9l0.3-0.5l-1,0.4l-15.9,9.4l-7.3,4.1c0,0,0,0,0,0.1c0,0.2-0.1,0.4-0.3,0.4c-0.2,0-0.4-0.1-0.4-0.3
					c0-0.2,0.1-0.4,0.3-0.4c0.2,0,0.3,0.1,0.4,0.2l21.4-12.8l-12,4.8l-2.6,0.9c0,0,0,0,0.1,0.1c0,0.2-0.1,0.4-0.3,0.4
					c-0.2,0-0.4-0.1-0.4-0.3c0-0.2,0.1-0.4,0.3-0.4c0.2,0,0.3,0.1,0.4,0.2l15.9-6.5l0.2-0.1l-15.7,4.7l-3.5,0.9
					c0,0.2-0.1,0.4-0.3,0.4c-0.2,0-0.4-0.1-0.4-0.3c0-0.2,0.1-0.4,0.3-0.4c0.2,0,0.4,0.1,0.4,0.3c0,0,0,0,0,0l20.3-6.2l0.2-0.1
					l-0.8-0.2l-15,2l-2.9,0.3c0,0.2-0.1,0.3-0.3,0.4c-0.2,0-0.4-0.1-0.4-0.3c0-0.2,0.1-0.4,0.3-0.4c0.2,0,0.4,0.1,0.4,0.3
					c0,0,0,0,0,0l17.2-2.3l-17.7-3.4l-8.4-1.8c0,0,0,0.1-0.1,0.1c-0.1,0.1-0.4,0.1-0.5,0c-0.1-0.1-0.1-0.4,0-0.5
					c0.1-0.1,0.4-0.1,0.5,0c0.1,0.1,0.1,0.3,0.1,0.4l26.3,5l-14.9-6.9l-3.3-1.7c0,0.1,0,0.1-0.1,0.1c-0.1,0.1-0.4,0.1-0.5,0
					c-0.1-0.1-0.1-0.4,0-0.5c0.1-0.1,0.4-0.1,0.5,0c0.1,0.1,0.1,0.2,0.1,0.4l19,8.7l0.6-0.1l-0.8-0.5l-16.7-7.9l-7.5-3.7
					c0,0,0,0,0,0.1c-0.1,0.1-0.4,0.1-0.5,0c-0.1-0.1-0.1-0.4,0-0.5C30.5,385.8,30.7,385.8,30.9,386z M56.1,397.7l0,0.5l0.1,0.1
					l0.1-0.3L56.1,397.7z M56.7,399.1L56.7,399.1L56.7,399.1L56.7,399.1L56.7,399.1z M56.8,398.5L56.8,398.5l0.1,0.2L56.8,398.5z
					 M56.7,398.9l0,0.1L56.7,398.9L56.7,398.9z M57.7,398.5l-0.1,0l-0.2-0.2l-0.2,0.3L57.7,398.5z M55.9,399.8l0.3-0.3l0,0l-0.2,0.1
					L55.9,399.8z M55.9,398.9L55.9,398.9l-0.2,0L55.9,398.9z"
					/>
					<path
						fill="#E05A6A"
						d="M62.5,374.2c0.1,0.1,0.1,0.3,0,0.4c-0.1,0.1-0.2,0.1-0.3,0l-5.4,21c0.1,0,0.2,0.1,0.3,0.1l6.2-11.2
					l1.6-2.7c0,0-0.1,0-0.1-0.1c-0.1-0.1-0.1-0.3,0-0.4c0.1-0.1,0.3-0.1,0.4,0c0.1,0.1,0.1,0.3,0,0.4c-0.1,0.1-0.2,0.1-0.3,0
					l-7.6,14c0.1,0.1,0.2,0.2,0.4,0.3l7-12.5l3.6-6.2c0,0,0,0,0,0c-0.1-0.1-0.1-0.3,0-0.4c0.1-0.1,0.3-0.1,0.4,0
					c0.1,0.1,0.1,0.3,0,0.4c-0.1,0.1-0.3,0.1-0.4,0L57.8,396l6.8-8.7l1.5-1.8c0,0,0,0-0.1,0c-0.1-0.1-0.1-0.3,0-0.4
					c0.1-0.1,0.3-0.1,0.4,0c0.1,0.1,0.1,0.3,0,0.4c-0.1,0.1-0.2,0.1-0.3,0l-8.3,10.8c0,0,0,0,0.1,0c0,0,0,0,0,0.1l8.8-9.3l2.2-2.2
					c-0.1-0.1-0.1-0.3,0-0.4c0.1-0.1,0.3-0.1,0.4,0c0.1,0.1,0.1,0.3,0,0.4c-0.1,0.1-0.3,0.1-0.4,0v0l-10.9,11.7
					c0.1,0.2,0.2,0.4,0.3,0.6l9-7l2-1.4c-0.1-0.1-0.1-0.3,0-0.4c0.1-0.1,0.3-0.1,0.4,0c0.1,0.1,0.1,0.3,0,0.4
					c-0.1,0.1-0.3,0.1-0.4,0c0,0,0,0,0,0l-10.9,8.5c0.1,0.2,0.1,0.4,0.2,0.6l15.5-2.9l7.2-1.2c0,0,0-0.1,0-0.1
					c0.1-0.2,0.3-0.2,0.4-0.1c0.2,0.1,0.2,0.3,0.2,0.4c-0.1,0.2-0.3,0.2-0.4,0.2c-0.1-0.1-0.2-0.2-0.2-0.3l-22.4,4.2l13.9,0.9
					l3.1,0.3c0,0,0-0.1,0-0.1c0.1-0.2,0.3-0.2,0.4-0.2c0.2,0.1,0.2,0.3,0.2,0.4c-0.1,0.2-0.3,0.2-0.4,0.2c-0.1,0-0.2-0.2-0.2-0.3
					l-17.2-0.9c0,0.1,0,0.3,0,0.4l15.5,1.1l7.1,0.6c0,0,0,0,0-0.1c0.1-0.2,0.3-0.2,0.4-0.2c0.2,0.1,0.2,0.3,0.2,0.4
					c-0.1,0.2-0.3,0.2-0.4,0.2c-0.1-0.1-0.2-0.2-0.2-0.3l-21.2-1.4l10.8,2.4l2.3,0.6c0,0,0-0.1,0-0.1c0.1-0.2,0.3-0.2,0.4-0.2
					c0.1,0.1,0.2,0.3,0.2,0.4c-0.1,0.2-0.3,0.2-0.4,0.2c-0.1,0-0.2-0.2-0.2-0.3l-14.3-3.1l-0.2,0l13.3,4.3l2.9,1.1
					c0.1-0.1,0.2-0.2,0.4-0.1c0.2,0.1,0.2,0.3,0.2,0.4c-0.1,0.2-0.3,0.2-0.4,0.2c-0.2-0.1-0.2-0.3-0.2-0.4c0,0,0,0,0,0l-16.3-5.1
					c0,0.2-0.1,0.3-0.2,0.5l11,5.6l2.1,1.2c0.1-0.1,0.2-0.2,0.4-0.1c0.2,0.1,0.2,0.3,0.2,0.4c-0.1,0.2-0.3,0.2-0.4,0.2
					c-0.2-0.1-0.2-0.3-0.2-0.4c0,0,0,0,0,0L58.5,400c-0.1,0.2-0.2,0.3-0.3,0.5l12.4,10l5.6,4.7c0,0,0-0.1,0.1-0.1
					c0.2-0.1,0.3,0,0.4,0.2c0.1,0.2,0,0.3-0.2,0.4c-0.2,0-0.3,0-0.4-0.2c0-0.1,0-0.2,0.1-0.3l-17.9-14.3l8.5,11.1l1.8,2.6
					c0,0,0.1-0.1,0.1-0.1c0.2,0,0.3,0,0.4,0.2c0.1,0.2,0,0.3-0.2,0.4c-0.2,0.1-0.3,0-0.4-0.2c0-0.1,0-0.2,0.1-0.3l-10.7-13.8
					c-0.1,0.1-0.1,0.2-0.2,0.2c0,0-0.1,0.1-0.1,0.1l9.4,12.6l4.2,5.8c0,0,0,0,0,0c0.2,0,0.3,0,0.4,0.2c0.1,0.2,0,0.3-0.2,0.4
					c-0.2,0.1-0.3,0-0.4-0.2c0-0.1,0-0.3,0.2-0.3l-12.8-17l5.2,9.7l1,2.1c0,0,0,0,0.1-0.1c0.2,0,0.3,0.1,0.4,0.2
					c0,0.2,0,0.3-0.2,0.4c-0.2,0.1-0.3,0-0.4-0.2c0-0.1,0-0.2,0.1-0.3l-7-12.9l-0.1-0.2l5.4,12.9l1.1,2.9c0.2,0,0.3,0.1,0.4,0.2
					c0,0.2,0,0.3-0.2,0.4c-0.2,0-0.3,0-0.4-0.2c0-0.2,0-0.3,0.2-0.4c0,0,0,0,0,0l-6.8-15.8c-0.1,0.1-0.3,0.1-0.4,0.2l3,12.1l0.5,2.4
					c0.1,0,0.3,0.1,0.3,0.2c0.1,0.2,0,0.3-0.2,0.4c-0.2,0.1-0.3,0-0.4-0.2c0-0.2,0-0.3,0.2-0.4c0,0,0,0,0,0l-3.6-14.4
					c-0.2,0.1-0.3,0.1-0.5,0.1l-2.1,14.7l-1.2,7.2c0,0,0.1,0,0.1,0c0.1,0.1,0.1,0.3,0,0.4c-0.1,0.1-0.3,0.1-0.4,0
					c-0.1-0.1-0.1-0.3,0-0.4c0.1-0.1,0.2-0.1,0.3-0.1l3-21.9c-0.1,0-0.1,0-0.2,0L50.7,414l-1.3,2.9c0,0,0.1,0,0.1,0
					c0.1,0.1,0.1,0.3,0,0.4c-0.1,0.1-0.3,0.1-0.4,0c-0.1-0.1-0.1-0.3,0-0.4c0.1-0.1,0.2-0.1,0.3-0.1l6-15.1c-0.1,0-0.3,0-0.4-0.1
					L49.5,415l-2.9,6.5c0,0,0,0,0.1,0c0.1,0.1,0.1,0.3,0,0.4c-0.1,0.1-0.3,0.1-0.4,0c-0.1-0.1-0.1-0.3,0-0.4c0.1-0.1,0.3-0.1,0.4,0
					l8-19.7l-5.7,9.4l-1.3,2c0,0,0.1,0,0.1,0c0.1,0.1,0.1,0.3,0,0.4c-0.1,0.1-0.3,0.1-0.4,0c-0.1-0.1-0.1-0.3,0-0.4
					c0.1-0.1,0.2-0.1,0.3-0.1l7-11.7c0,0-0.1,0-0.1-0.1l-7.5,10.2l-1.9,2.5c0.1,0.1,0.1,0.3,0,0.4c-0.1,0.1-0.3,0.1-0.4,0
					c-0.1-0.1-0.1-0.3,0-0.4c0.1-0.1,0.3-0.1,0.4,0c0,0,0,0,0,0l9.3-12.7c-0.2-0.1-0.4-0.2-0.6-0.4l-7.8,7.7l-1.8,1.6
					c0.1,0.1,0.1,0.3,0,0.4c-0.1,0.1-0.3,0.1-0.4,0c-0.1-0.1-0.1-0.3,0-0.4c0.1-0.1,0.3-0.1,0.4,0c0,0,0,0,0,0l9.5-9.4
					c-0.1-0.1-0.2-0.2-0.3-0.3l-12.8,6.4l-6.6,3.1c0,0,0,0.1,0,0.1c0,0.2-0.2,0.3-0.4,0.3c-0.2,0-0.3-0.2-0.3-0.4
					c0-0.2,0.2-0.3,0.3-0.3c0.1,0,0.2,0.1,0.2,0.2l19.2-9.7c-0.1-0.1-0.2-0.2-0.2-0.3l-12.2,2.7l-3.1,0.6c0,0,0,0.1,0,0.1
					c0,0.2-0.2,0.3-0.4,0.3c-0.2,0-0.3-0.2-0.3-0.4c0-0.2,0.2-0.3,0.4-0.3c0.1,0,0.2,0.1,0.2,0.2l15.2-3.5c-0.1-0.1-0.1-0.3-0.2-0.4
					L39,402.5l-7,1.3c0,0,0,0,0,0.1c0,0.2-0.2,0.3-0.4,0.3c-0.2,0-0.3-0.2-0.3-0.4c0-0.2,0.2-0.3,0.4-0.3c0.1,0,0.2,0.1,0.2,0.3
					l20.5-4.5c0,0,0,0,0,0l-10.7,0.6l-2.4,0c0,0,0,0,0,0.1c0,0.2-0.2,0.3-0.4,0.3c-0.2,0-0.3-0.2-0.3-0.4c0-0.2,0.2-0.3,0.4-0.3
					c0.1,0,0.2,0.1,0.2,0.3l13-0.8c0-0.1,0-0.1,0-0.2l-12.1-0.4l-3.1-0.2c0,0.1-0.2,0.3-0.3,0.2c-0.2,0-0.3-0.2-0.3-0.4
					c0-0.2,0.2-0.3,0.4-0.3c0.2,0,0.3,0.2,0.3,0.4c0,0,0,0,0,0l15.2,0.4c0-0.3,0-0.5,0-0.8l-10.3-2l-2.4-0.6c0,0.1-0.2,0.3-0.3,0.2
					c-0.2,0-0.3-0.2-0.3-0.4c0-0.2,0.2-0.3,0.4-0.3c0.2,0,0.3,0.2,0.3,0.4c0,0,0,0,0,0l12.7,2.4c0-0.2,0.1-0.4,0.2-0.6l-11.8-6.6
					l-6.3-3.7c0,0,0,0.1-0.1,0.1c-0.2,0.1-0.3,0-0.4-0.1c-0.1-0.2,0-0.3,0.1-0.4c0.2-0.1,0.3,0,0.4,0.1c0.1,0.1,0,0.2-0.1,0.3
					L52.7,397c0.1-0.2,0.2-0.3,0.3-0.4l-8.6-8.2l-2.2-2.2c0,0,0,0.1-0.1,0.1c-0.2,0.1-0.3,0-0.4-0.1c-0.1-0.2,0-0.3,0.1-0.4
					c0.2-0.1,0.3,0,0.4,0.1c0.1,0.1,0,0.2,0,0.3l11,10.2c0.1-0.1,0.1-0.2,0.2-0.2c0,0,0.1-0.1,0.1-0.1l-9.6-9.2l-5-5.1c0,0,0,0,0,0
					c-0.1,0.1-0.3,0-0.4-0.1c-0.1-0.2,0-0.3,0.1-0.4c0.2-0.1,0.3,0,0.4,0.1c0.1,0.1,0,0.3-0.1,0.4l14.9,14.2c0,0,0.1,0,0.1-0.1
					l-6.3-8.2l-1.4-1.9c0,0,0,0,0,0.1c-0.2,0.1-0.3,0-0.4-0.1c-0.1-0.2,0-0.3,0.1-0.4c0.2-0.1,0.3,0,0.4,0.1c0.1,0.1,0,0.2-0.1,0.3
					l7.8,10c0.1,0,0.1-0.1,0.2-0.1l-6.3-10.1l-1.6-2.7c-0.2,0.1-0.3,0-0.4-0.1c-0.1-0.2,0-0.3,0.1-0.4c0.2-0.1,0.3,0,0.4,0.1
					c0.1,0.2,0,0.3-0.1,0.4c0,0,0,0,0,0l8.1,12.7c0.3-0.1,0.5-0.2,0.8-0.2l-4.2-9.7l-0.9-2.3c-0.1,0-0.3,0-0.4-0.1
					c-0.1-0.2,0-0.3,0.1-0.4c0.2-0.1,0.3,0,0.4,0.1c0.1,0.2,0,0.3-0.1,0.4c0,0,0,0,0,0l5.2,12c0.4,0,0.8,0,1.2,0.2l3.7-13.9l2-7
					c0,0-0.1,0-0.1-0.1c-0.1-0.1-0.1-0.3,0-0.4C62.2,374,62.4,374,62.5,374.2z"
					/>
				</g>
				<path
					fill="#E05A6A"
					d="M119,411.5c-0.1,0.1-0.2,0.1-0.4,0.1l-5.5,19.7c0,0,0.1,0,0.1,0l4.2-9.3l1.1-2.1c0,0,0,0-0.1,0
				c-0.1-0.1-0.2-0.3-0.1-0.4c0.1-0.1,0.3-0.2,0.4-0.1c0.1,0.1,0.2,0.3,0.1,0.4c-0.1,0.1-0.2,0.1-0.3,0.1l-5.1,11.4
				c0.1,0,0.2,0,0.3,0.1l5.8-10l1.6-2.7c-0.1-0.1-0.1-0.3-0.1-0.4c0.1-0.1,0.3-0.2,0.4-0.1c0.1,0.1,0.2,0.3,0.1,0.4
				c-0.1,0.1-0.3,0.2-0.4,0.1c0,0,0,0,0,0l-7.2,12.8c0.1,0.1,0.3,0.1,0.4,0.2c0.1,0.1,0.2,0.2,0.3,0.3l6.2-7.7l1.6-1.8
				c-0.1-0.1-0.1-0.3,0-0.4c0.1-0.1,0.3-0.2,0.4-0.1c0.1,0.1,0.2,0.3,0.1,0.4c-0.1,0.1-0.3,0.2-0.4,0.1c0,0,0,0,0,0l-7.7,9.7
				c0.3,0.3,0.6,0.7,0.8,1.1l13-5.7l6.7-2.8c0,0,0-0.1,0-0.1c0-0.2,0.2-0.3,0.4-0.2c0.2,0,0.3,0.2,0.3,0.4c0,0.2-0.2,0.3-0.4,0.3
				c-0.1,0-0.2-0.1-0.2-0.3l-19.6,8.8c0,0.1,0.1,0.2,0.1,0.3l12.4-2.1l3.1-0.4c0,0,0-0.1,0-0.1c0-0.2,0.2-0.3,0.4-0.3
				c0.2,0,0.3,0.2,0.3,0.4c0,0.2-0.2,0.3-0.4,0.2c-0.1,0-0.2-0.1-0.2-0.2l-15.5,2.8c0,0.1,0,0.3,0.1,0.4l13.9-2.3l7.1-1
				c0,0,0,0,0-0.1c0-0.2,0.2-0.3,0.4-0.3c0.2,0,0.3,0.2,0.3,0.4c0,0.2-0.2,0.3-0.4,0.2c-0.1,0-0.2-0.2-0.2-0.3l-20.9,3.6l11-0.1
				l2.4,0.1c0,0,0-0.1,0-0.1c0-0.2,0.2-0.3,0.4-0.2c0.2,0,0.3,0.2,0.2,0.4c0,0.2-0.2,0.3-0.4,0.2c-0.1,0-0.2-0.1-0.2-0.3l-13.4,0.2
				c0,0.1,0,0.1,0,0.2l12.5,1l3.1,0.3c0.1-0.1,0.2-0.3,0.3-0.2c0.2,0,0.3,0.2,0.3,0.4c0,0.2-0.2,0.3-0.4,0.3c-0.2,0-0.3-0.2-0.3-0.4
				c0,0,0,0,0,0l-15.7-1.2c0,0.2-0.1,0.4-0.2,0.7l10.8,2.6l2.3,0.7c0.1-0.1,0.2-0.2,0.3-0.2c0.2,0,0.3,0.2,0.3,0.4
				c0,0.2-0.2,0.3-0.4,0.2c-0.2,0-0.3-0.2-0.3-0.4c0,0,0,0,0,0l-13.2-3.1c-0.1,0.1-0.1,0.2-0.2,0.3c-0.1,0.1-0.2,0.2-0.3,0.3
				l13.6,6.5l6.5,3.3c0,0,0-0.1,0.1-0.1c0.2-0.1,0.3,0,0.4,0.1c0.1,0.1,0,0.3-0.1,0.4c-0.1,0.1-0.3,0-0.4-0.1c-0.1-0.1,0-0.2,0-0.3
				l-20.2-9.5c0,0-0.1,0.1-0.1,0.1l10.4,8.6l2.4,2.1c0,0,0-0.1,0.1-0.1c0.2-0.1,0.3,0,0.4,0.1c0.1,0.2,0,0.3-0.1,0.4
				c-0.1,0.1-0.3,0-0.4-0.1c-0.1-0.1,0-0.2,0-0.3l-13-10.5c-0.1,0.1-0.2,0.2-0.3,0.3l11.6,9.7l5.4,4.7c0,0,0,0,0,0
				c0.1-0.1,0.3,0,0.4,0.1c0.1,0.1,0,0.3-0.1,0.4c-0.1,0.1-0.3,0-0.4-0.1c-0.1-0.1,0-0.3,0.1-0.4l-16.4-13.6l7.3,8.3l1.5,1.8
				c0,0,0,0,0-0.1c0.1-0.1,0.3,0,0.4,0.1c0.1,0.1,0,0.3-0.1,0.4c-0.2,0.1-0.3,0-0.4-0.1c-0.1-0.1,0-0.3,0-0.3l-9.6-10.8
				c0,0,0,0-0.1,0l8,11l1.8,2.6c0.1-0.1,0.3,0,0.4,0.1c0.1,0.1,0,0.3-0.1,0.4c-0.1,0.1-0.3,0-0.4-0.1c-0.1-0.2,0-0.3,0.1-0.4
				c0,0,0,0,0,0l-10-13.4c-0.2,0.1-0.3,0.1-0.5,0.2l5.6,10.8l1,2.2c0.1-0.1,0.3,0,0.4,0.1c0.1,0.2,0,0.3-0.1,0.4
				c-0.2,0.1-0.3,0-0.4-0.1c-0.1-0.2,0-0.3,0.1-0.4c0,0,0,0,0,0l-6.8-13c-0.2,0-0.4,0.1-0.6,0.1l1.4,14.8l0.5,7.3c0,0,0.1,0,0.1,0
				c0.2,0.1,0.2,0.3,0.1,0.4c-0.1,0.1-0.3,0.2-0.4,0.1c-0.1-0.1-0.2-0.3-0.1-0.4c0.1-0.1,0.2-0.1,0.3-0.1l-2.2-22.1
				c-0.1,0-0.1,0-0.2,0l-2,13.2l-0.6,3.1c0,0,0.1,0,0.1,0c0.2,0.1,0.2,0.3,0.1,0.4c-0.1,0.2-0.3,0.2-0.4,0.1
				c-0.2-0.1-0.2-0.3-0.1-0.4c0.1-0.1,0.2-0.1,0.3-0.1l2.4-16.3c-0.1,0-0.3-0.1-0.4-0.1l-2.3,14.6l-1.3,7c0,0,0,0,0.1,0
				c0.1,0.1,0.2,0.3,0.1,0.4c-0.1,0.2-0.3,0.2-0.4,0.1c-0.2-0.1-0.2-0.3-0.1-0.4c0.1-0.1,0.2-0.2,0.4-0.1l3.3-21l-3.3,10.5l-0.8,2.2
				c0,0,0.1,0,0.1,0c0.2,0.1,0.2,0.3,0.1,0.4c-0.1,0.2-0.3,0.2-0.4,0.1c-0.2-0.1-0.2-0.3-0.1-0.4c0.1-0.1,0.2-0.2,0.3-0.1l4.2-13.5
				c0,0-0.1,0-0.1,0l-5.2,12.2l-1.3,2.8c0.1,0.1,0.2,0.3,0.1,0.4c-0.1,0.2-0.3,0.2-0.4,0.1c-0.2-0.1-0.2-0.3-0.1-0.4
				c0.1-0.2,0.3-0.2,0.4-0.1c0,0,0,0,0,0l6.3-15.1c0,0-0.1,0-0.1-0.1c-0.1-0.1-0.2-0.2-0.4-0.3l-6.3,10l-1.4,2
				c0.1,0.1,0.2,0.3,0.1,0.4c-0.1,0.2-0.3,0.2-0.4,0.1c-0.2-0.1-0.2-0.3-0.1-0.4c0.1-0.1,0.3-0.2,0.4-0.1c0,0,0,0,0,0l7.5-12.1
				c0,0-0.1-0.1-0.1-0.1l-11.7,9.7l-5.7,4.5c0,0,0,0,0,0.1c0,0.2-0.1,0.3-0.3,0.3c-0.2,0-0.3-0.1-0.3-0.3c0-0.2,0.1-0.3,0.3-0.3
				c0.1,0,0.2,0.1,0.3,0.2l17.2-14.5c0,0,0,0-0.1-0.1l-12.2,5.9l-2.9,1.3c0,0,0.1,0.1,0.1,0.1c0,0.2-0.1,0.3-0.3,0.3
				c-0.2,0-0.3-0.1-0.3-0.3c0-0.2,0.1-0.3,0.3-0.3c0.1,0,0.2,0.1,0.3,0.2l14.9-7.4c-0.1-0.1-0.1-0.2-0.2-0.4l-13.5,6.4l-6.5,2.9
				c0,0,0,0,0,0c0,0.2-0.1,0.3-0.3,0.3c-0.2,0-0.3-0.1-0.3-0.3c0-0.2,0.1-0.3,0.3-0.3c0.1,0,0.3,0.1,0.3,0.2l19.1-9.2l-10.6,3.2
				l-2.3,0.6c0,0,0,0,0,0.1c0,0.2-0.1,0.3-0.3,0.3c-0.2,0-0.3-0.1-0.3-0.3c0-0.2,0.1-0.3,0.3-0.3c0.1,0,0.2,0.1,0.3,0.2l13.6-4.2
				c0,0,0-0.1,0-0.1l-13.1,2.6l-3.1,0.5c0,0.2-0.1,0.3-0.3,0.3c-0.2,0-0.3-0.1-0.3-0.3c0-0.2,0.1-0.3,0.3-0.3c0.2,0,0.3,0.1,0.3,0.3
				c0,0,0,0,0,0l16.1-3.4c-0.1-0.2-0.1-0.4-0.1-0.6l-11.7,0.5l-2.4,0c0,0.2-0.1,0.3-0.3,0.3c-0.2,0-0.3-0.1-0.3-0.3
				c0-0.2,0.1-0.3,0.3-0.3c0.2,0,0.3,0.1,0.3,0.3c0,0,0,0,0,0l14.1-0.6c0-0.1,0-0.1,0-0.2l-14.1-4.1l-7-2.2c0,0,0,0.1,0,0.1
				c-0.1,0.1-0.3,0.1-0.4,0c-0.1-0.1-0.1-0.3,0-0.4c0.1-0.1,0.3-0.1,0.4,0c0.1,0.1,0.1,0.2,0,0.3l21.1,6c0-0.1,0-0.2,0-0.2L98,427.7
				l-2.7-1.7c0,0,0,0.1-0.1,0.1c-0.1,0.1-0.3,0.1-0.4,0c-0.1-0.1-0.1-0.3,0-0.4c0.1-0.1,0.3-0.1,0.4,0c0.1,0.1,0.1,0.2,0,0.3l14,7.9
				c0-0.2,0.1-0.3,0.1-0.5l-12.3-7.2l-6.1-3.8c0,0,0,0,0,0c-0.1,0.1-0.3,0.1-0.4,0c-0.1-0.1-0.1-0.3,0-0.4c0.1-0.1,0.3-0.1,0.4,0
				c0.1,0.1,0.1,0.3,0,0.4l18.4,10.7l-8.6-7l-1.8-1.6c0,0,0,0.1,0,0.1c-0.1,0.1-0.3,0.1-0.4,0c-0.1-0.1-0.1-0.3,0-0.4
				c0.1-0.1,0.3-0.1,0.4,0c0.1,0.1,0.1,0.2,0,0.3l10.5,8.4c0,0,0-0.1,0.1-0.1l-9-8.8l-2.2-2.2c-0.1,0.1-0.3,0.1-0.4-0.1
				c-0.1-0.1-0.1-0.3,0-0.4c0.1-0.1,0.3-0.1,0.4,0c0.1,0.1,0.1,0.3,0,0.4c0,0,0,0,0,0l11.2,10.9c0.1-0.2,0.3-0.4,0.5-0.6l-6.4-8.7
				l-1.4-2c-0.1,0.1-0.3,0.1-0.4-0.1c-0.1-0.1-0.1-0.3,0-0.4c0.1-0.1,0.3-0.1,0.4,0c0.1,0.1,0.1,0.3,0,0.4c0,0,0,0,0,0l7.9,10.6
				c0.3-0.3,0.7-0.5,1.1-0.6l0.3-14l0.3-7.3c0,0-0.1,0-0.1,0c-0.1-0.1-0.2-0.3-0.1-0.4c0.1-0.1,0.3-0.2,0.4-0.1
				c0.1,0.1,0.2,0.3,0.1,0.4c-0.1,0.1-0.2,0.1-0.3,0.1l-0.5,21.2c0.2,0,0.3-0.1,0.5-0.1l3.2-11.7l0.9-3c0,0-0.1,0-0.1,0
				c-0.1-0.1-0.2-0.3-0.1-0.4c0.1-0.1,0.3-0.2,0.4-0.1c0.1,0.1,0.2,0.3,0.1,0.4c-0.1,0.1-0.2,0.1-0.3,0.1l-3.9,14.6
				c0.2,0,0.3,0,0.5,0l3.6-12.8l2.1-6.8c0,0,0,0-0.1,0c-0.1-0.1-0.2-0.3-0.1-0.4c0.1-0.1,0.3-0.2,0.4-0.1
				C119.1,411.1,119.1,411.3,119,411.5z"
				/>
			</g>
		</g>
		<path
			fill="#FEEDF0"
			d="M125.5,362.6c0,0-0.5-6.9-9.2-13c-2-1.4-2.4-2-2.5-1.3c5.3,2,7.8,16.5,7.9,16.9c0,0-2.4-11.2-6.5-15.4
		c-0.3-0.3-1.9-1.5-1.7-0.6c0.2,0.9,1.7,6.5,1.7,6.5h0c-1.4-3.8-1.5-4.4-2-5.1c-0.3-0.4-0.9-0.4-1,0c-0.3,1.2-0.8,6.2,1.6,14.1
		c0,0-3.4-9-2-14.8c0.1-0.4-0.5-0.6-0.6-0.3c-1.8,4.5-0.4,14.2-0.4,14.2s-1.5-9-0.3-13.1c0.1-0.3-0.5-0.6-0.7-0.2
		c-1.6,3.2-2.7,8.9-2.7,8.9c0.8-5.2,1.6-7.3,1.9-8.7c0.4-2-3.1,4-3.1,4s1.4-7.6,5.7-8.9c3.9-1.2,8.8,4.8,8.8,4.8s-3.3-2.7-5.1-3
		C113.6,347.3,125,354.1,125.5,362.6z"
		/>
	</g>
</svg>
```

### 随机数

randomInt 随机整数

randomUniform 随机小数

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>随机数</title>
		<style>
			html,
			body {
				margin: 0;
				height: 100%;
			}
			#main {
				height: 100%;
				background-color: #000;
			}
		</style>
	</head>
	<body>
		<div id="main"></div>
		<script src="https://d3js.org/d3.v6.min.js"></script>
		<script>
			/*
			 * randomInt 随机整数
			 * randomUniform 随机小数
			 * */
			/*const randomI=d3.randomInt(5,10)
    // console.log(randomI());

    const randomU=d3.randomUniform(3,6)
    console.log(randomU());*/

			/*随机大小，随机位置，随机颜色的小球*/
			const main = d3.select("#main");
			const [width, height] = [window.innerWidth, window.innerHeight];
			const svg = main
				.append("svg")
				.attr("width", "100%")
				.attr("height", "100%");

			const randomWidth = d3.randomInt(width);
			const randomHeight = d3.randomInt(height);
			const randomSize = d3.randomInt(1, 9);
			const randomColor = d3.randomInt(0, 255);

			const data = [];
			for (let i = 0; i < 100; i++) {
				data[i] = {
					x: randomWidth(),
					y: randomHeight(),
					z: randomSize(),
					c: `rgb(${randomColor()},${randomColor()},${randomColor()})`,
				};
			}

			svg
				.selectAll("circle")
				.data(data)
				.join("circle")
				.attr("cx", (d) => d.x)
				.attr("cy", (d) => d.y)
				.attr("r", (d) => d.z)
				.attr("fill", (d) => d.c);
		</script>
	</body>
</html>
```

### 格式化

format()数字格式化，如保留小数点后 n 位浮点数

.1f 保留小数点后 1 位浮点数

.2f 保留小数点后 2 位浮点数

timeFormat() 时间格式化

- %Y 年
- %m 月
- %d 日
- %H 时
- %M 分
- %S 秒

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>格式化</title>
	</head>
	<body>
		<div id="main"></div>
		<script src="https://d3js.org/d3.v6.min.js"></script>
		<script>
			/*
			 *  format()数字格式化，如保留小数点后n位浮点数
			 *   .1f 保留小数点后1位浮点数
			 *   .2f 保留小数点后2位浮点数
			 *  timeFormat() 时间格式化
			 *   %Y 年
			 *   %m 月
			 *   %d 日
			 *   %H 时
			 *   %M 分
			 *   %S 秒
			 * */
			const f = d3.format(".4f");
			for (let i = 0; i < 10; i++) {
				const n1 = 0.1 * i;
				// console.log(n1);
				const n2 = f(n1);
				// console.log(n2);
				// console.log(typeof  n2);
				const n3 = parseFloat(n2);
				/*console.log(n3);
        console.log(typeof n3);*/
			}

			const dt = new Date();
			// console.log(dt);

			const tf = d3.timeFormat("%Y-%m-%d %H:%M:%S");
			console.log(tf(dt));
		</script>
	</body>
</html>
```

### 多边形算法

- polygonArea(points)
- 多边形面积 polygonCentroid(points)
- 多边形中心 polygonLength(points)
- 多边形周长 polygonContains(polygon, point)
- 点是否在多边形中

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>多边形算法</title>
		<style>
			html {
				height: 100%;
			}
			body {
				height: 100%;
				margin: 0;
			}
			#main {
				width: 100%;
				height: 100%;
				background-color: antiquewhite;
			}
		</style>
	</head>
	<body>
		<div id="main"></div>
		<script src="https://d3js.org/d3.v6.min.js"></script>
		<script>
			const points = [
				[300, 200],
				[200, 400],
				[400, 400],
			];

			const main = d3.select("#main");
			const svg = main
				.append("svg")
				.attr("width", "100%")
				.attr("height", "100%");

			svg
				.append("polygon")
				.attr("points", points)
				.attr("fill", "none")
				.attr("stroke", "#000")
				.attr("stroke-width", 2);

			//面积
			const hull = d3.polygonArea(points);
			console.log(hull);
			//中心
			const centroid = d3.polygonCentroid(points);
			console.log(centroid);
			//周长
			const len = d3.polygonLength(points);
			console.log(len);

			//点是否在多边形中
			const point = [400, 300];
			// const point=[300,300]
			svg
				.append("circle")
				.attr("cx", point[0])
				.attr("cy", point[1])
				.attr("r", 5);

			const bool = d3.polygonContains(points, point);
			console.log(bool);
		</script>
	</body>
</html>
```

### d3 比例尺原理

d3 比例尺的实现原理就是对两种数据做线性映射。

这种线性映射关系可以用点斜式表示。

已知：

N 类型的数据极值是[minN,maxN]

M 类型的数据极值是[minM,maxM]

x 属于 N

将 x 映射到 M 的中的值为 y 则：

```js
k = (maxM - minM) / (maxN - minN);
b = minM - minN * k;
y = kx + b;
```

例子

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>比例尺</title>
		<style>
			* {
				box-sizing: border-box;
			}
			#main {
				margin: 20px;
				width: 600px;
				height: 600px;
				border: 1px solid #ddd;
			}
			.item {
				cursor: pointer;
			}
			.item:hover {
				opacity: 0.9;
			}
		</style>
	</head>
	<body>
		<div id="main"></div>
		<script src="https://d3js.org/d3.v6.js"></script>
		<script>
			/*===========1-必备数据===========*/
			/*categories 类目信息*/
			const categories = ["html", "css", "js"];
			/*数据源source：两个系列的数据*/
			const source = [
				//html css js
				[30, 20, 40], //学习人数
				[40, 30, 50], //就业人数
			];
			/*调色盘*/
			const color = [
				"#c23531",
				"#2f4554",
				"#61a0a8",
				"#d48265",
				"#91c7ae",
				"#749f83",
				"#ca8622",
				"#bda29a",
				"#6e7074",
				"#546570",
				"#c4ccd3",
			];

			/*===========2-建立容器对象===========*/
			/*获取main 容器*/
			const main = d3.select("#main");

			/*声明绘图框尺寸
        width 宽度，600
        height 高度，600
    */
			const width = 600;
			const height = 600;

			/*建立svg 对象
			 *   svg 画布尺寸100%充满容器对象
			 *   绘图框尺寸按照600设置
			 * */
			const svg = main
				.append("svg")
				.attr("version", 1.2)
				.attr("xmlns", "http://www.w3.org/2000/svg")
				.attr("width", "100%")
				.attr("height", "100%")
				.attr("viewBox", `0 0 ${width} ${height}`);

			/*===========3-建立轴相关的基础数据===========*/
			/*-----x轴相关的基础数据-----*/
			/*计算类目数量 len*/
			const len = categories.length;

			/*用range()方法，基于类目数量，获取x轴的在图表坐标系中的数据 xChartData，如[0,1,2]*/
			const xChartData = d3.range(len);

			/*x轴在像素坐标内的起始点和结束点 xPixelRange，左右各偏移50*/
			const xPixelRange = [50, width - 50];

			/*-----y轴相关的基础数据-----*/
			/*计算数据源中所有数据的极值 maxY
			 *   用js原生方法flat()展开数据源，再通过max()方法取极值
			 * */
			const maxY = Math.max(...source.flat());

			/*声明y轴在图表坐标系中的数据起点和结束点 yChartRange*/
			const yChartRange = [0, maxY];

			/*声明y轴在像素坐标系中的数据起点和结束点 yPixelRange*/
			const yPixelRange = [height - 50, 50];

			/*===========4-建立比例尺===========*/
			/*-----x 轴比例尺 xScale-----*/
			/*
			 * 用scaleBand()方法建立分段比例尺 xScale
			 * 用domain()方法在比例尺中写入图表数据xChartData
			 * 用rangeRound()方法在比例尺中写入像素数据，即像素的起始位和结束位xPixelRange
			 * 用padding()方法设置类目的内边距，百分比单位，如0.1
			 * */
			const xScale = d3
				.scaleBand()
				.domain(xChartData)
				.rangeRound(xPixelRange)
				.padding(0.1);

			/*-----y 轴比例尺 xScale-----*/
			/*
			 * 用scaleLinear()方法建立线性比例尺 yScale
			 * 用domain()方法在比例尺中写入图表数据yChartRange
			 * range()方法在比例尺中写入像素数据，即像素的起始位和结束位yPixelRange
			 * */
			const yScale = d3.scaleLinear().domain(yChartRange).range(yPixelRange);

			/*===========5-建立轴对象===========*/
			/*-----x轴对象-----*/
			/*基于比例尺xScale，用axisBottom()方法创建刻度朝下的坐标轴生成器 xAxisGenerator*/
			const xAxisGenerator = d3.axisBottom(xScale);

			/*利用坐标轴生成器绘制坐标轴
			 *   在svg中append 加入g 对象
			 *   用transform 属性中的translateY 设置x轴的y位置
			 *   用call()方法调用xAxisGenerator轴生成器，生成坐标轴
			 *   用selectAll()方法选择所有的text文本
			 *   用text()方法将图表数据设置为类目数据
			 *   用attr()方法设置字体大小
			 * */
			svg
				.append("g")
				.attr("transform", `translate(0, ${height - 50})`)
				.call(xAxisGenerator)
				.selectAll("text")
				.text((n) => categories[n])
				.attr("font-size", "12px");

			/*-----y轴对象-----*/
			/*基于比例尺yScale，用axisLeft()方法创建刻度朝左的坐标轴生成器 yAxisGenerator*/
			const yAxisGenerator = d3.axisLeft(yScale);

			/*利用坐标轴生成器生成坐标轴
			 *   在svg中append 加入g 对象
			 *   用transform 属性中的translate设置y轴的x位置
			 *   用call()方法调用xAxisGenerator轴生成器，生成坐标轴
			 *   用attr()方法设置字体大小
			 * */
			svg
				.append("g")
				.attr("transform", "translate(50 0)")
				.call(yAxisGenerator)
				.attr("font-size", "12px");

			/*===========6-建立绘图区相关的基础数据===========*/
			/*-----绘图区相关的基础数据-----*/
			/*用x轴比例尺xScale的bandwidth()方法获取x轴上一个类目的像素宽xBandW*/
			const xBandW = xScale.bandwidth();

			/*获取系列的数量n*/
			const n = source.length;

			/*用类目宽除以系列数，得到一个类目中每个系列元素的宽，即列宽colW*/
			const colW = xBandW / n;
			console.log(colW);

			/*计算调色盘颜色数量colorLen*/
			const colorLen = color.length;

			/*===========7-架构绘图区===========*/
			/*在svg中建立系列集合seriesObjs，在系列集合中建立系列对象
			 *   在svg中append 加入g 对象
			 *   selectAll() 选择所有g元素，此处重点不在选择，而是建立一个选择集对象
			 *   用data() 方法将具备系列信息的数据源source绑定到系列集合中
			 *   用join() 基于数据源批量创建g元素，一个g代表一个系列，之后每个g元素里都会放入三个不同类目的柱状体
			 *   用transform 属性中的translate设置系列的x像素位——列宽乘以系列索引
			 *   基于系列索引，从调色盘中取色，然后将其作为一个系列中所有图形的填充色
			 * */
			const seriesObjs = svg
				.append("g")
				.selectAll("g")
				.data(source)
				.join("g")
				.attr(
					"transform",
					(seriesData, seriesInd) => `translate(${seriesInd * colW} 0)`
				)
				.attr("fill", (seriesData, seriesInd) => color[seriesInd % colorLen]);

			/*在系列集合中建立柱状体集合rects
			 *   用系列集合seriesObjs 的selectAll()方法选择所有的rect元素，用于建立选择集对象
			 *   用data()方法将之前绑定在每个系列集合中的数据绑定到柱状体集合中
			 *   用join()基于每个系列的数据数据批量创建rect元素
			 *   用classed() 方法为其添加item属性
			 * */
			const rects = seriesObjs
				.selectAll("rect")
				.data((seriesData) => seriesData)
				.join("rect")
				.classed("item", true);

			/*=8-用attr()方法设置每个柱状体的x、y位置和width、height 尺寸=*/
			/*
			 * 设置柱状体的x像素位
			 *   从回调参数中获取柱状体在当前系列中的索引rectInd,系列索引 seriesInd
			 *   基于柱状体在当前系列中的索引rectInd，用x轴比例尺xScale()获取柱状体在当前系列中的x像素位
			 * 设置柱状体像素宽width为列宽colW
			 * 设置柱状体的y像素位
			 *   从回调参数中解构柱状体数据rectData
			 *   基于柱状体数据rectData，用y轴比例尺yScale()获取柱状体的y像素位
			 * 设置柱状体的像素像素高
			 *   从回调参数中解构柱状体数据rectData
			 *   让y轴上刻度为0的像素位，减去刻度为柱状图实际数据的像素位，即为柱状图的像素高
			 * */
			const kkbScale = KKBScale(0, height - 50, 50, 50);
			console.log("kkbScale", kkbScale(10));
			console.log("yScale", yScale(10));

			rects
				.attr("x", (rectData, rectInd) => xScale(rectInd))
				.attr("width", colW)
				.attr("y", (rectData) => kkbScale(rectData))
				.attr("height", (rectData) => kkbScale(0) - kkbScale(rectData));

			//比例尺
			function KKBScale(ax, ay, bx, by) {
				const AB = {
					x: bx - ax,
					y: by - ay,
				};
				const k = AB.y / AB.x;
				const b = ay - ax * k;
				return function (x) {
					return k * x + b;
				};
			}
		</script>
	</body>
</html>
```

### 总结

咱们这一章主要介绍了 d3 的一些扩展知识，如数组、请求、随机数、格式化、多边形、地图等，每个知识点还有需多其它的方法，大家可以去文档里简单看一下，以后在项目中若遇到了相关需求，可以再去寻找。
