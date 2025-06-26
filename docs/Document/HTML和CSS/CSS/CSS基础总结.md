# CSS 基础总结

Chrome 团队制作的 CSS 教程：<https://web.dev/learn/css/>

https://css-tricks.com/

[乔什·W·科莫 --- Josh W Comeau](https://www.joshwcomeau.com/)

[1.5 万字 CSS 基础拾遗（核心知识、常见需求） (qq.com)](https://mp.weixin.qq.com/s/1gKTFLzWRMe2KhtHXfIMnw)

## CSS 学习文档

CSS-菜鸟文档：[CSS 教程 | 菜鸟教程 (runoob.com)](https://www.runoob.com/css/css-tutorial.html)

CSS3-菜鸟文档：[CSS3 教程 | 菜鸟教程 (runoob.com)](https://www.runoob.com/css3/css3-tutorial.html)

编程之家文档：<https://www.jb51.cc/css3-tutorial/>

掘金收藏-CSS 学习文档：[CSS - 牧涯的收藏集 - 掘金 (juejin.cn)](https://juejin.cn/collection/6845244366366179341)

codepen 固定的 CSS 示例：[CodePen: Online Code Editor and Front End Web Developer Community](https://codepen.io/following)

码上掘金-收集的界面样式：[码上掘金 (juejin.cn)](https://code.juejin.cn/)

---

我的 CSS 练习项目：[muyaCode/css-exercise: CSS 练习 (github.com)](https://github.com/muyaCode/css-exercise)

## CSS 总结

### 一：CSS3 简介

如同人类的的进化一样，CSS3 是 CSS2 的“进化”版本，在 CSS2 基础上，增强或新增了许多特性， 弥补了 CSS2 的众多不足之处，使得 Web 开发变得更为高效和便捷    动画   圆角   阴影   边框图片 …

Css 当 js 用

Js 当后台语言用

### 二：CSS3 现状

1、  浏览器支持程度差，需要添加私有前缀(移动端)

- a) requestFullScreen

- b) webkitRequestFullScreen

- c) mozRequestFullScreen

- d) msRequestFullScreen

- e) oRequestFullScreen

2、移动端支持优于 PC 端

3、不断改进中

4、应用相对广泛

### 三：选择器

CSS3 新增了许多灵活查找元素的方法，极大的提高了查找元素的效率和精准度。CSS3 选择器与 jQuery 中所提供的绝大部分选择器兼容

文档：[CSS 选择器 | 菜鸟教程 (runoob.com)](https://www.runoob.com/cssref/css-selectors.html)

#### 1.  属性选择器

- 1) **E[attribute]** 表示存在 attr 属性即可；

  - div[class] - 标签需要有 class 属性
  - div[style] - 标签需要有 style 属性

- 2) **E[attr=val]** 表示属性值完全等于 val；

  - div[class=mydemo]

- 3) **E[attr*=val]** 表示的属性值里包含 val 字符并且在“任意”位置；

  - div[class*=mydemo]

- 4) **E[attr^=val]** 表示的属性值里包含 val 字符并且在“开始”位置；

  - div[class^=mydemo]

- 5) **E[attr$=val]** 表示的属性值里包含 val 字符并且在“结束”位置；

  - div[class$=demos]

- 属性选择器列表

| 选择符        | 简介                                            |
| ------------- | ----------------------------------------------- |
| E[att]        | 选择具有 att 属性的 E 元素                      |
| E[att=“val”]  | 选择具有 att 属性、且属性值等于 val 的 E 元素   |
| E[att^=“val”] | 选择具有 att 属性、且属性值以 val 开头的 E 元素 |
| E[att$=“val”] | 选择具有 att 属性、且属性值以 val 结尾的 E 元素 |
| E[att*=“val”] | 选择具有 att 属性、且属性值中含有 val 的 E 元素 |

```css
button {
	cursor: pointer;
}

button[disabled] {
	cursor: default;
}

input[type="search"] {
	color: skyblue;
}

span[class^="black"] {
	color: lightgreen;
}

span[class$="black"] {
	color: lightsalmon;
}

span[class*="black"] {
	color: lightseagreen;
}
```

#### 2. 兄弟伪类

指定类型的元素(相邻元素)：.class + li {} - class 类后面的元素之后的第一个 li 元素

指定类型的所有元素：.class ~ li {} - class 类后面每一个(所有)的 li 元素

#### 3.  伪类选择器-伪元素选择器

- 1)  鼠标伪类：a:hover  a:link  a:active  a:visited

- 2)  以**某元素相对于其父元素或兄弟元素**的位置来获取无素的结构伪类

  - a) **E:first-child**：查找 E 这个元素的父元素的第一个子元素 E

  - b) **E:last-child**：最后一个子元素

  - c) **E:fist-of-type**：查找第一个元素：查找的时候限制类型--只会查找满足类型的子元素

  - d) **E:last-of-type**：查找最后一个元素：查找的时候限制类型-查找最后一个元素-只会查找满足类型的子元素

  - e) **E:nth-child(n)**：第 n 个子元素，计算方法是 E 元素的全部兄弟元素：li:nth-child(n)

  - f) **E:nth-last-child(n)**：同 E:nth-child(n) 相似，只是倒着计算

  - g) **E:nth-child(even)**：所有的偶数

  - h) **E:nth-child(odd)**：所有的奇数

  - i) **E:nth-of-type(n)**：指定类型：n 可以是 even 偶数和 odd 奇数，也可以指定数

  - j) **E:empty**：选中没有任何子节点的 E 元素，注意，空格也算子元素

  - k) **E:target**：结合锚点进行使用，处于当前锚点的元素会被选中

  - | 选择符           | 简介                           |
    | ---------------- | ------------------------------ |
    | E:first-child    | 匹配父元素中的第一个子元素 E   |
    | E:last-child     | 匹配父元素中的最后一个子元素 E |
    | E:nth-child(n)   | 匹配父元素中的第 n 个子元素 E  |
    | E:first-of-type  | 匹配指定类型 E 的第一个元素    |
    | E:last-of-type   | 匹配指定类型 E 的最后一个元素  |
    | E:nth-of-type(n) | 匹配指定类型 E 的第 n 个元素   |

  - ```css
    ul li:first-child {
    	background-color: lightseagreen;
    }
  
    ul li:last-child {
    	background-color: lightcoral;
    }
  
    ul li:nth-child(3) {
    	background-color: aqua;
    }
    ```

- 3)  重点说明：n 遵循线性变化，其取值 0、1、2、3、4、... 但是当 n<=0 时，选取无效

  - 注意：本质上就是选中第几个子元素
  - n 可以是数字、关键字、公式
  - n 如果是数字，就是选中第几个
  - 常见的关键字有  `even`  偶数、`odd`  奇数
  - 常见的公式如下(如果 n 是公式，则从 0 开始计算)
  - 但是第 0 个元素或者超出了元素的个数会被忽略

    | 公式 | 取值                               |
    | ---- | ---------------------------------- |
    | 2n   | 偶数                               |
    | 2n+1 | 奇数                               |
    | 5n   | 5 10 15 …                          |
    | n+5  | 从第 5 个开始（包含第 5 个）到最后 |
    | -n+5 | 前 5 个（包含第 5 个）…            |

- 4)  案例代码：

  - ```css
    /*第一个li元素*/
    li:first-child {
    	color: red;
    }
    /*最后一个元素*/
    li:last-child {
    	color: green;
    }
    /*获取第10个元素*/
    li:nth-child(10) {
    	color: orange;
    }
    /*获取倒数第3个li元素*/
    li:nth-last-child(3) {
    	color: purple;
    }
    /*获取索引顺序为6的倍数的li元素*/
    li:nth-child(6n) {
    	text-decoration: underline;
    	border: 1px solid red;
    }
    /*获取所有索引为偶数的li元素*/
    li:nth-child(even) {
    	border: 1px solid black;
    }
    /*获取前5个li元素*/
    li:nth-child(-n + 5) {
    	background-color: #ddd;
    }
    
    /*n 是公式，从 0 开始计算 */
    li:nth-child(n) {
    	background-color: lightcoral;
    }
    
    /* 偶数 */
    li:nth-child(2n) {
    	background-color: lightskyblue;
    }
    
    /* 奇数 */
    li:nth-child(2n + 1) {
    	background-color: lightsalmon;
    }
    
    /* 选择第 0 5 10 15, 应该怎么选 */
    li:nth-child(5n) {
    	background-color: orangered;
    }
    
    /* n + 5 就是从第5个开始往后选择 */
    li:nth-child(n + 5) {
    	background-color: peru;
    }
    
    /* -n + 5 前五个 */
    li:nth-child(-n + 5) {
    	background-color: tan;
    }
    
    /*n可是多种形式：nth-child(2n)、nth-child(2n+1)、nth-child(-n+5)等*/
    ```

nth-child(n) 和 nth-of-type(n)的区别：

- nth-child 选择父元素里面的第几个子元素，不管是第几个类型
- nth-of-type 选择指定类型的元素

```css
div :nth-child(1) {
	background-color: lightblue;
}

div :nth-child(2) {
	background-color: lightpink;
}

div span:nth-of-type(2) {
	background-color: lightseagreen;
}

div span:nth-of-type(3) {
	background-color: #fff;
}
```

#### 4.  伪元素选择器

- a)  重点：**E::before**、**E::after**

  - i.  是一个行内元素，需要转换成块：**display:block** 、**float:** 、**position:**

  - ii.  必须添加 content，哪怕不设置内容，也需要**content:""**

  - iii. **E:after**、**E:before** 在旧版本里是伪类，在新版本里是伪元素

    - 新版本下**E:after**、**E:before**会被自动识别为**E::after**、**E::before**，按伪元素来对待，这样做的目的是用来做兼容处理

  - iv. E::before：定义在一个元素的内容之前插入[content](http://www.dreamdu.com/css/property_content/)属性定义的内容与样式

  - v. E::after：定义在一个元素的内容之后插入[content](http://www.dreamdu.com/css/property_content/)属性定义的内容与样式

  - vi.  注意：

    - 1. IE6、IE7 与 IE8（怪异模式）不支持此伪元素

    - 2. CSS2 中 **E:before**或者**E:after**，是属于伪类的，并且没有伪元素的概念，CSS3 中 提出伪元素的概念 E::before 和 E::after，并且归属到了伪元素当中，伪类里就不再存在 E:before 或者 &nbsp;&nbsp;E:after 伪类

  - 使用例子：

    - **优惠券的样式编写**：

    - ```css

      ```

    - 为元素添加字体图标

    - ```css

      ```

    - 为元素实现纯 CSS 图标样式

    - ```html
    
      ```

- b) **E::first-letter**：文本的第一个字母或字(不是词组)(首字下沉可以拿这个伪元素设置)

- c) **E::first-line**：文本第一行（如果设置了::first-letter，就不能再设置当前伪元素）

- d) **E::selection**：当前选中的文本样式（只能设置颜色等样式，而不能设置文本文字大小）

### 四：颜色设置：11111111、00000000、0-255

文档：[CSS 颜色 | 菜鸟教程 (runoob.com)](https://www.runoob.com/cssref/css-colors.html)

HTML5 中添加了一些新的颜色的表示方式

#### 1.RGBA：说得简单一点就是在 RGB 的基础上加进了一个通道 Alpha。RGBA 在 RGB 的基础上多了控制 alpha 透明度的参数

以上 R、G、B 三个参数，正整数值的取值范围为：0 - 255。

百分数值的取值范围为：0.0% - 100.0%。

超出范围的数值将被截至其最接近的取值极限。并非所有浏览器都支持使用百分数值。

A 参数，取值在 0~1 之间，不可为负值。

RGBA 比元素设置 CSS 的透明度更好，因为单独的颜色可以在不影响整个元素的透明度，他不会影响到元素其他的属性，比如说边框，字体同时也不会影响到其他元素的相关透明度

a) **语法:**

Ø R：红色值。正整数 | 百分数

Ø G：绿色值。正整数 | 百分数

Ø B：蓝色值。正整数| 百分数

Ø A：透明度。取值 0~1 之间

b) **使用示例：**

```css
div {
	width: 200px;
	height: 200px;
	background-color: rgba(10, 20, 245, 0.5);
	color: white;
}
```

#### 2. HSLA(H,S,L,A)

a) **此色彩模式与**[**HSL**](http://www.css88.com/book/css/values/color/hsl.htm)**相同，只是在**[**HSL**](http://www.css88.com/book/css/values/color/hsl.htm)**模式上新增了 Alpha 透明度**

b) **语法：**

Ø H：**Hue(色调,色相)**：0(或 360)表示红色，120 表示绿色，240 表示蓝色，也可取其他数值来指定颜色。取值为：0 – 360,过渡为：(红橙黄绿青蓝紫红)

Ø S：**Saturation(饱和度)**：取值为：0.0% - 100.0%

Ø L：**Lightness(亮度|明度)**：取值为：0.0% - 100.0%，50%是平衡值

Ø A：**Alpha 透明度**：取值 0~1 之间。

c) **示例**

```css
span {
	width: 200px;
	height: 200px;
	display: block;
	background-color: hsla(360, 100%, 50%, 0.6);
	color: white;
}
```

#### 3.关于上面的两个颜色模式最后一个属性透明度 Alpha 的补充说明

- a) opacity 只能针对整个盒子设置透明度，子盒子及内容会继承父盒子的透明度

- b) transparent 不可调节透明度，始终完全透明

- c)  使用 rgba 来控制颜色，相对 opacity ，不具有继承性

### 五：文本(shadow)阴影

css 发光和阴影：<https://www.jb51.net/css/799874.html>

文本效果文档：<https://www.runoob.com/css3/css3-text-effects.html>

text-shadow 还没有出现时，大家在网页设计中阴影一般都是用 photoshop 做成图片，现在有了 css3 可以直接使用 text-shadow 属性来指定阴影。这个属性可以有两个作用，产生阴影和模糊主体。这样在不使用图片时能给文字增加质感

1. **语法：**

```css
text-shadow： none或向X轴偏移 | none或向Y轴偏移 | shadow阴影模糊值 或 none | color颜色
```

**也就是：**

text-shadow:[颜色(Color)  x 轴(X Offset) y 轴(Y Offset) 模糊半径(Blur)],[颜色(color) x 轴(X Offset) y 轴(Y Offset) 模糊半径(Blur)]...

**或者：**

text-shadow:[x 轴(X Offset) y 轴(Y Offset)   模糊半径(Blur)   颜色(Color)],[x 轴(X Offset) y 轴(Y Offset)   模糊半径(Blur)   颜色(Color)]...

2. **取值：**

- a) length：长度值，可以是负值。用来指定阴影的延伸距离。其中 X Offset 是水平偏移值，Y Offset 是垂直偏移值

- b) shadow：阴影的模糊值，不可以是负值，用来指定模糊效果的作用距离

- c) color：指定阴影颜色，也可以是 rgba 透明色。

  3. **说明：**

可以给一个对象应用一组或多组阴影效果，方式如前面的语法显示一样，用逗号隔开。text-shadow: X-Offset Y-Offset Blur Color 中 X-Offset 表示阴影的水平偏移距离，其值为正值时阴影向右偏移，如果其值为负值时，阴影向左偏移；

Y-Offset 是指阴影的垂直偏移距离，如果其值是正值时，阴影向下偏移反之其值是负值时阴影向顶部偏移；Blur 是指阴影的模糊程度，其值不能是负值，如果值越大，阴影越模糊，反之阴影越清晰，如果不需要阴影模糊可以将 Blur 值设置为 0；Color 是指阴影的颜色，其可以使用 rgba 色

4. **一些效果案例代码：**

```css
.demo {
	width: 600px;
	padding: 30px;
	background-color: #666;
	margin: 20px auto;
	text-align: center;
	font: bold 80px/100% "微软雅黑";
	color: #fff;
}
```

阴影效果

```css
/*侧阴影效果*/
.demo1 {
	text-shadow: 2px 2px 2px #ff0000;
}
/*辉光效果*/
.demo2 {
	text-shadow: 0 0 30px red;
}
/*多层辉光效果*/
.demo3 {
	text-shadow: 0 0 5px #fff, 0 0 15px #fff, 0 0 40px #fff, 0 0 70px red;
}
/*苹果经典效果*/
.demo4 {
	color: black;
	text-shadow: 0 1px 1px #fff;
}
/*浮雕效果*/
.demo5 {
	color: #ccc;
	text-shadow: -1px -1px 0px #fff, -2px -2px 0px #eee, 1px 1px 0px #444, 2px 2px
			0px #333;
}
/*模糊字效果*/
.demo6 {
	color: transparent; /*将本身设置为透明*/
	text-shadow: 0 0 6px #ff9966;
}
```

### 六：盒模型

1.在默认情况下，CSS 设置的盒子宽度仅仅是内容区的宽度，而非盒子的宽度。同样，高度类似。真正盒子的宽度（在页面呈现出来的宽度）和高度，需要加上一些其它的属性。例如：

- a) padding + border + width = 盒子的宽度

- b) padding + border + height = 盒子的高度

很明显，这不直观，很容易出错，造成网页中其它元素的错位。

2.CSS3 中可以通过**box-sizing** 来指定盒模型，即可指定为 content-box、border-box，这样我们计算盒子大小的方式就发生了改变

- a) **content-box**：对象的实际宽度等于设置的 width 值和 border、padding 之和

- b) **border-box**：对象的实际宽度就等于设置的 width 值，即使定义有 border 和 padding 也不会改变对象的实际宽度

  3.浏览器的兼容性：

IE8 及以上版本支持该属性，Firefox 需要加上浏览器厂商前缀-moz-，对于低版本的 IOS 和 Android 浏览器也需要加上-webkit-

### 七：边框圆角

border-radius 可以通过值来定义样式相同的角，也对每个角分别定义

1.值的说明：

- border-radius: 10px;

  border-radius: 10%;

  - 将创建四个大小一样的圆角

- border-radius: 10px 10px 10px 10px;

  - 四个值分别表示左上角、右上角、右下角、左下角

- border-radius: 0px 0px;

  - 第一个值表示左上角、右下角；第二个值表示右上角、左下角

- border-radius: 0px 0px 0px;

  - 第一个值表示左上角；第二个值表示右上角、左下角；第三个值表示右下角

- border-radius: 100px 80px 60px 20px/20px 60px 80px 100px;

  - 不规则的圆角形状，水平和垂直方向：

  - 分别是水平方向：左上，右上，右下，左下 / 垂直方向的：左上，右上，右下，左下

    2.单个圆角的设置：除了同时设置四个圆角以外，还可以单独对每个角进行设置。对应四个角，CSS3 提供四个单独的属性：

- border-top-left-radius:

- border-top-right-radius:

- border-bottom-right-radius:

- border-bottom-left-radius:

这四个属性都可以同时设置 1 到 2 个值。如果设置 1 个值，表示水平半径与垂直半径相等。如果设置 2 个值，第一个值表示水平半径，第二个值表示垂直半径

3.补充：创建两个值的非对称圆角还有一种书写方式：如 border-radius:20px/10px;表示在水平方向上 20px,在垂直方向上 10px;具体说明如下：可分别设置长、短半径，以“/”进行分隔，遵循“1，2，3，4”规则，“/”前面的 1~4 个用来设置横轴半径（分别对应横轴 1、2、3、4 位置 ），“/”后面 1~4 个参数用来设置纵轴半径（分别对应纵轴 1、2、3、4 位置 ）

4.示例代码：

```css
div{
    width: 200px;
    /*height: 200px;*/
    height: 100px;  /*为椭圆设置的高度*/
    background-color: red;
    margin: 100px auto;
    /*四个方向的圆角值相同*/
    /*border-radius: 100px;*/
    /*左上，右下为20px   右上，左下为40px*/
    /*border-radius: 20px 40px;*/
    /*左上为20px   右上，左下为40px  右下为80px*/
    /*border-radius: 20px 40px 80px;*/
    /*左上：20px  右上：40px 右下：80px  左下：100px*/
    /*border-radius: 20px 40px 80px 100px;*/

    /*设置某一个方向上的圆角*/
    /*border-bottom-left-radius: 100px;*/

    /*非对称圆角--制作椭圆*/
    border-top-left-radius: 100px 50px;
    border-top-right-radius: 100px 50px;
    border-bottom-right-radius: 100px 50px;
    border-bottom-left-radius: 100px 50px;

    /*非对称圆角的简写方式*/
    /*四个方向上都是一致的非对称圆角*/
    /*border-radius: 100px/50px;*/
    /*也可以这样*/
    /*border-radius: 100px 80px 60px 20px/20px 60px 80px 100px;*/
    /*等价于：*/
    /*border-top-left-radius: 100px 20px;
    border-top-right-radius: 80px 60px;
    border-bottom-right-radius: 60px 80px;
    border-bottom-left-radius: 20px 100px;*/
}
```

---

### 八：伪元素和圆角结合案例：android 机器人

1.  效果：

2. Div 结构：

```html
<div class="content">
	    <!--身体头部-->
	    
	<div class="header"></div>
	    <!--身体主体-->
	    
	<div class="body"></div>
	    <!--脚-->
	    
	<div class="footer"></div>
</div>
```

3.  样式：主要使用伪元素选择器

```html
<style>
	* {
		padding: 0;
		margin: 0;
	}
	body {
		background-color: #ccc;
	}
	.content {
		width: 500px;
		height: 450px;
		margin: 50px auto;
		background-color: #fff;
		padding-top: 30px;
	}
	.header {
		width: 200px;
		height: 100px;
		margin: 0 auto;
		background-color: green;
		border-radius: 100px 100px 0 0;
		position: relative;
	}
	.header::before,
	.header::after {
		content: "";
		position: absolute;
		width: 20px;
		height: 20px;
		background-color: #fff;
		border-radius: 10px;
		top: 40px;
	}
	.header::before {
		left: 50px;
	}
	.header::after {
		right: 50px;
	}
	.body {
		width: 200px;
		height: 200px;
		background-color: green;
		margin: 0 auto;
		margin-top: 10px;
		border-radius: 0 0 20px 20px;
		position: relative;
	}
	.body::before,
	.body::after {
		content: "";
		position: absolute;
		top: 10px;
		width: 30px;
		height: 150px;
		background-color: green;
		border-radius: 10px;
	}
	.body::before {
		left: -50px;
	}
	.body::after {
		right: -50px;
	}
	.footer {
		width: 200px;
		height: 200px;
		margin: 0 auto;
		position: relative;
	}
	.footer::before,
	.footer::after {
		content: "";
		position: absolute;
		top: 0px;
		width: 35px;
		height: 80px;
		background-color: green;
		border-radius: 0 0 40px 40px;
	}
	.footer::before {
		left: 40px;
	}
	.footer::after {
		right: 40px;
	}
</style>
```

### 九：边框阴影

文档：[CSS3 边框 | 菜鸟教程 (runoob.com)](https://www.runoob.com/css3/css3-borders.html)

文档：[CSS3 box-shadow 属性 | 菜鸟教程 (runoob.com)](https://www.runoob.com/cssref/css3-pr-box-shadow.html)

1. **box-shadow**：属性向边框添加一个或多个阴影。

2.  语法：box-shadow: h-shadow v-shadow blur spread color inset;

注释：box-shadow 向框添加一个或多个阴影。该属性是由逗号分隔的阴影列表，每个阴影由 2-4 个长度值、可选的颜色值以及可选的 inset 关键词来规定。省略长度的值是 0。

3.  属性值说明：

| **值**   | **描述**                                               |
| -------- | ------------------------------------------------------ |
| h-shadow | 必需。水平阴影的位置。允许负值。                       |
| v-shadow | 必需。垂直阴影的位置。允许负值。                       |
| blur     | 可选。模糊距离（默认 0）。                             |
| spread   | 可选。阴影的尺寸。值越大，阴影的扩散面积越大（默认 0） |
| color    | 可选。阴影的颜色（默认黑色）。                         |
| inset    | 可选。将外部阴影 (outset) 改为内部阴影（默认外阴影）。 |

4.  在添加阴影的时候，最好考虑到不同浏览器的兼容

5.  案例示例：

```css
/*为item添加边框阴影*/
div[class="item"]:nth-child(-n + 4) {
	    box-shadow: 1px 1px 3px 0px #bbb;
}
/*可以同时添加多个边框阴影*/
div[class="item"]:last-child {
	    box-shadow: 1px 1px 2px #ff0000 inset, -1px -1px 2px #ff0000 inset;
}
```

### 十：边框图片

文档：[CSS3 border-image 属性 | 菜鸟教程 (runoob.com)](https://www.runoob.com/cssref/css3-pr-border-image.html)

1.  功能：将图片规定为包围 div 元素的边框

a)  定义和用法： border-image 属性是一个简写属性，用于设置以下属性

- border-image-source

- border-image-slice

- border-image-width

- border-image-outset

- border-image-repeat

b)  属性说明：

| 值                  | 描述                                                           |
| ------------------- | -------------------------------------------------------------- |
| border-image-source | 用在边框的图片的路径。                                         |
| border-image-slice  | 图片边框向内偏移—裁切。                                        |
| border-image-width  | 图片边框的宽度。                                               |
| border-image-outset | 边框图像区域超出边框的量。                                     |
| border-image-repeat | 图像边框是否应平铺(repeated)、铺满(rounded)或拉伸(stretched)。 |

2.  案例：任意拉伸的按钮：通过一个按钮的背景图片制作出任意大小的按钮，实现背景填充效果：

1.  效果：

2.  代码：

```css
.downLoad{
    width:80px;
    height: 30px;
    display: block;
    text-align: center;
    line-height: 30px;
    border: 1px solid #ccc;
    /*设置图片边框背景*/
    border-image: url("../images/btn_bg.png");
    /*设置裁切区域，同时设置填充模式*/
    border-image-slice: 10 fill;
    /*设置边框的大小，这个一般与裁切区域大小一致，否则就发生缩放*/
    border-image-width: 10px;
    /*设置边框的重复模式*/
    border-image-repeat: round;
}
```

### CSS 渐变

#### 一、两种渐变

CSS 渐变：

- <https://zhuanlan.zhihu.com/p/375386445>

- <https://www.cnblogs.com/k21vin/p/16443647.html>

文档：[CSS3 渐变 | 菜鸟教程 (runoob.com)](https://www.runoob.com/css3/css3-gradients.html)

渐变是 CSS3 当中比较丰富多彩的一个特性，通过渐变我们可以实现许多炫丽的效果，有效的减少图片的使用数量，并且具有很强的适应性和可扩展性。可分为线性渐变、径向渐变

1. **linear-gradient**：线性渐变指沿着某条直线朝一个方向产生渐变效果

a)  语法：

```css
linear-gradient( [point || angle,]? stop, stop [, stop]* )
```

b)  参数说明：

- Ø  第一个参数表示线性渐变的方向

  - 1. to left：设置渐变为从右到左。相当于: 270deg;

  - 2. to right：设置渐变从左到右。相当于: 90deg;

  - 3. to top：设置渐变从下到上。相当于: 0deg;

  - 4. to bottom：设置渐变从上到下。相当于: 180deg。这是默认值，等同于留空不写。也可以直接指定度数，如 45deg

- Ø  第二个参数是起点颜色,可以指定颜色的位置

- Ø  第三个参数是终点颜色，你还可以在后面添加更多的参数，表示多种颜色的渐变

c)  示例：

```css
div {
	width: 400px;
	height: 400px;
	margin: 100px auto;
	background: linear-gradient(
		0deg,
		red,
		orange,
		yellow,
		green,
		#00ffff,
		blue,
		purple
	);
}
```

2. **radial-gradient**：径向渐变指从一个中心点开始沿着四周产生渐变效果

a)  语法：

```css
radial-gradient = radial-gradient([ [ shape || size ] [ at position ]? , | at position, ]?color-stop[ , color-stop ]+)
```

b)  取值：

- i. position 确定圆心的位置。如果提供 2 个参数，第一个表示横坐标，第二个表示纵坐标；如果只提供一个，第二值默认为 50%，即 center

- ii. shape：渐变的形状，ellipse 表示椭圆形，circle 表示圆形。默认为 ellipse，如果元素形状为正方形的元素，则 ellipse 和 circle 显示一样

- iii. size：渐变的大小，即渐变到哪里停止，它有四个值。 closest-side：最近边； farthest-side：最远边； closest-corner：最近角； farthest-corner：最远角。默认是最远的角 farthest-corner

- iv. color：指定颜色。Rgba  hsla

c)  一些案例示例代码：

```css
<style>
    .div1{
        width: 200px;
        height: 200px;
        margin: 10px auto;
        /*设置径向渐变效果:从中心点开始，从一种颜色到另外一种颜色*/
        background: radial-gradient(circle at center,red,blue);
    }
    .div2{
        width: 200px;
        height: 200px;
        border-radius: 100px;
        margin: 10px auto;
        /*设置径向渐变效果:从指定坐开始，从一种颜色到另外一种颜色*/
        background: radial-gradient(circle at 50px 50px,#eeffff,#334455);
    }
    .div3{
        width: 200px;
        height: 200px;
        border-radius: 100px;
        margin: 10px auto;
        /*设置径向渐变效果:从指定坐标开始，从一种颜色到另外一种颜色，同时指定颜色的位置*/
        background: radial-gradient(circle at 50px 50px,#eeffff 0%,#666 70%,rgba(33,33,33,0.8) 80%);
    }
    /*指定渐变的形状*/
    .div4{
        width: 200px;
        height: 100px;
        margin: 10px auto;
        /*设置径向渐变效果:从中心点开始，从一种颜色到另外一种颜色*/
        background: radial-gradient(ellipse at center,red,green,blue);
    }
    /*指定渐变的size*/
    .div5{
        width: 200px;
        height: 100px;
        margin: 10px auto;
        /*设置径向渐变效果:从中心点开始，从一种颜色到另外一种颜色,同时指定了大小为渐变到最近的边*/
        background: radial-gradient(circle closest-side at center,red,green,blue);
    }
    /*使用系统提供的位置设置*/
    .div6{
        width: 200px;
        height: 100px;
        margin: 10px auto;
        /*设置径向渐变效果:从右上角点开始，从一种颜色到另外一种颜色*/
        background: radial-gradient(circle at top right,red,green,blue);
    }
</style>
```

重复的线性渐变：

```css
repeating-linear-gradient() 函数用于重复线性渐变
```

重复的径向渐变：

```css
repeating-radial-gradient() 函数用于重复径向渐变
```

---

#### 二：背景

文档：[CSS3 背景 | 菜鸟教程 (runoob.com)](https://www.runoob.com/css3/css3-backgrounds.html)

##### A：background-size 属性

CSS 里的 background-size 属性能够让程序员决定如何在指定的元素里展示,它通过改变背景尺寸的通过各种不同是属性值改变背景尺寸呈现的大小。往往建议不要将图放大，如果有需要，尽量让图缩小

1.  语法：

```css
background-size: auto(原始图片大小) || number(数值) || percentage(百分比) || cover(
		放大铺满
	)
	|| contain(缩小铺满);
```

2.  参数说明：

- a) auto：此值为默认值，保持背景图片的原始高度和宽度;

- b) number：此值设置具体的值，可以改变背景图片的大小;

- c) percentage：此值为百分值，可以是 0%〜100%之间任何值，但此值只能应用在块元素上，所设置百分值将使用背景图片大小根据所在元素的宽度的百分比来计算

- d) cover：此值是将图片放大，以适合铺满整个容器，这个主要运用在，当图片小于容器时，又无法使用 background-repeat 来实现时，我们就可以采用 cover;将背景图片放大到适合容器的大小

- e) contain：此值刚好与 cover 相反，其主要是将背景图片缩小，以适合铺满整个容器，这个主要运用在，当背景图片大于元素容器时，而又需要将背景图片全部显示出来，此时我们就可以使用 contain 将图片缩小到适合容器大小为止。

- f)  当 background-size 取值为 number 和 percentage 时可以设置两个值，也可以设置一个值，当只取一个值时，第二个值相当于 auto，但这里的 auto 并不会使背景图片的高度保持自己原始高度，而是会参照第一个参数值进行等比例缩放。

  3.  使用案例：

```html
<style>
	    *{
	        padding: 0;
	        margin: 0;
	    }
	    .div1{
	         width: 200px;
	         height: 200px;
	         margin:10px auto;
	         /*默认的背景设置，会让背景图片从左上角原点位置进行设置，不会自动的让背景图片适应容器的大小从而进行缩放*/
	         background: url("../images/1.jpg");
	     }
	    .div2{
	        width: 200px;
	        height: 200px;
	        margin:10px auto;
	        background: url("../images/1.jpg");
	        /*设置背景图片的大小,指定大小，有可能会让背景图片变形*/
	        background-size: 200px 200px;
	    }
	    .div3{
	        width: 200px;
	        height: 200px;
	        margin:10px auto;
	        background: url("../images/1.jpg");
	        /*设置背景图片的大小,cover:会让宽或者高适应当前容器的宽或者高，进行等比例缩放，但是超出的部分不会显示，所以有些图片的区域可能会无法显示*/
	        background-size: cover;
	    }
	    .div4{
	        width: 200px;
	        height: 200px;
	        margin:10px auto;
	        background: url("../images/1.jpg") no-repeat;
	        /*设置背景图片的大小,cover:会让宽或者高适应当前容器的宽或者高，进行等比例缩放，图片完全在容器以内，但是在不重复背景图片的情况下，会造成容器的部分区域空白*/
	        background-size: contain;
	    }
</style>
```

##### B：background-origin 属性

1.  作用：background-origin 属性规定 background-position 属性相对于什么位置来定位。默认值是 left top 左上角

2.  语法：background-origin: padding-box|border-box|content-box;

3.  属性值说明：

| padding-box | 背景图像相对于内边距框来定位。 |
| ----------- | ------------------------------ |
| border-box  | 背景图像相对于边框盒来定位。   |
| content-box | 背景图像相对于内容框来定位。   |

##### C：background-clip 属性

1. background-clip 属性规定背景的绘制区：虽然是设置裁切，但是控制的是显示。说白了，就是设置最终显示那些区域

2.  语法：background-clip: border-box|padding-box|content-box;

3.  属性值说明：

| **值**      | **描述**               |
| ----------- | ---------------------- |
| border-box  | 背景被裁剪到边框盒。   |
| padding-box | 背景被裁剪到内边距框。 |
| content-box | 背景被裁剪到内容框。   |

##### D：几个属性的综合案例：精灵图的使用

1.  需求：为块设置精灵图背景，需要更大的展示区域，能够以更大的范围响应用户的需要，但是只需要显示指定的背景图片

2.  效果：

3.  代码：

```css
.jd_topEeum {
	height: 44px;
	width: 40px;
	position: absolute;
	background: url("../images/sprites.png") no-repeat;
	background-clip: content-box;
	background-origin: content-box;
	background-size: 200px 200px;
	padding: 12px;
	top: 0;
}
```

#### 三：CSS 过渡-transition

过渡文档：[CSS3 过渡 | 菜鸟教程 (runoob.com)](https://www.runoob.com/css3/css3-transitions.html)

通过过渡 transition，我们可以在不使用 Flash 动画或 JavaScript 的情况下，当元素从一种样式变换为另一种样式时为元素添加效果。 要实现这一点，必须规定两项内容：1.规定希望把效果添加到哪个 CSS 属性上，2.规定效果的时长

1.  语法：

```css
transition: property duration timing-function delay;
```

2.  参数说明：

**transition**：属性是一个简写属性，用于设置四个过渡属性，四个属性可以当都抽出来全写：transition-property: | transition-duration: | transition-timing-function: | transition-delay:

| **值**                                                                                                                                   | **描述**                            |
| ---------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| [transition-property](http://www.w3school.com.cn/cssref/pr_transition-property.asp "CSS3 transition-property 属性")                      | 规定设置过渡效果的 CSS 属性的名称。 |
| [transition-duration](http://www.w3school.com.cn/cssref/pr_transition-duration.asp "CSS3 transition-duration 属性")                      | 规定完成过渡效果需要多少秒或毫秒。  |
| [transition-timing-function](http://www.w3school.com.cn/cssref/pr_transition-timing-function.asp "CSS3 transition-timing-function 属性") | 规定速度效果的速度曲线。            |
| [transition-delay](http://www.w3school.com.cn/cssref/pr_transition-delay.asp "CSS3 transition-delay 属性")                               | 定义过渡效果何时开始。              |

```css
div {
	transition-property: width;
	transition-duration: 1s;
	transition-timing-function: linear;
	transition-delay: 2s;
	/* Safari */
	-webkit-transition-property: width;
	-webkit-transition-duration: 1s;
	-webkit-transition-timing-function: linear;
	-webkit-transition-delay: 2s;
}
```

3.  补充说明**tansition-timing-function**：属性规定过渡效果的速度曲线

| **值**                        | **描述**                                                                          |
| ----------------------------- | --------------------------------------------------------------------------------- |
| linear                        | 规定以相同速度开始至结束的过渡效果（等于 cubic-bezier(0,0,1,1)）。                |
| ease                          | 规定慢速开始，然后变快，然后慢速结束的过渡效果（cubic-bezier(0.25,0.1,0.25,1)）。 |
| ease-in                       | 规定以慢速开始的过渡效果（等于 cubic-bezier(0.42,0,1,1)）。                       |
| ease-out                      | 规定以慢速结束的过渡效果（等于 cubic-bezier(0,0,0.58,1)）。                       |
| ease-in-out                   | 规定以慢速开始和结束的过渡效果（等于 cubic-bezier(0.42,0,0.58,1)）。              |
| cubic-bezier(_n_,_n_,_n_,_n_) | 在 cubic-bezier 函数中定义自己的值。可能的值是 0 至 1 之间的数值。                |

4.  案例说明：

```css
div {
	width: 200px;
	height: 200px;
	background-color: red;
	/*添加单个过渡效果*/
	/*transition:background-color 2s;*/
	/*也可以同时设置多个过渡效果*/
	/*transition:background-color 2s,left 1s;*/
	/*可以设置某个过渡效果的延迟*/
	/*transition:background-color 2s,left 1s 1s;*/
	/*可以设置过渡效果的速率曲线*/
	/*transition:background-color 2s,left 1s ease-out 1s;*/
	/*还可以一次性的为所有属性添加过渡效果*/
	transition: all 1s;
	position: absolute;
	left: 0;
	top: 0;
}
```

5.  使用建议：

因为 transition 最早是有由 webkit 内核浏览器提出来的，mozilla 和 opera 都是最近版本才支持这个属性，而我们的大众型浏览器 IE 全家都是不支持，另外由于各大现代浏览器 Firefox,Safari,Chrome,Opera 都还不支持 W3C 的标准写法，所以在应用 transition 时我们有必要加上各自的前缀，最好在放上我们 W3C 的标准写法，这样标准的会覆盖前面的写法，只要浏览器支持我们的 transition 属性，那么这种效果就会自动加上去，如

```css
-moz-transition: all 5s ease 1s;
-webkit-transition: all 1s ease 1s;
-o-transition: all 1s ease 1s;
transition: all 1s ease 1s;
```

#### 四：过渡案例：手风琴菜单

主题：过渡效果的使用

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>Title</title>
		<style>
			* {
				padding: 0;
				margin: 0;
			}
			.menu {
				width: 200px;
				height: auto;
				margin: 100px auto;
			}
			.item {
				width: 100%;
				height: auto;
			}
			.item > h3 {
				height: 40px;
				line-height: 40px;
				background-color: #7dffe7;
				color: orange;
				border-bottom: 2px solid #ccc;
				padding-left: 10px;
			}
			.item > .itemBox {
				width: 100%;
				height: 0px;
				overflow: hidden;
				/*display: none;*/
				/*添加过渡效果:过渡效果只能产生从某个值到另外一个具体的值的过渡*/
				/*1.一定要设置为哪些css样式添加过渡效果*/
				/*transition-property: display;*/
				transition-property: height;
				/*2.一定要设置过渡效果的耗时*/
				transition-duration: 1s;
			}
			.item > .itemBox > ul {
				list-style: none;
				background-color: #eaffb6;
				padding: 10px;
			}

			/*为item添加hover伪类*/
			.item:hover > .itemBox {
				/*display: block;*/
				height: 110px;
			}
		</style>
	</head>
	<body>
		<div class="menu">
			<div class="item">
				<h3>市内新闻</h3>
				<div class="itemBox">
					<ul>
						<li>深圳超市肉菜档遭抢</li>
						<li>深圳超市肉菜档遭抢</li>
						<li>深圳超市肉菜档遭抢</li>
						<li>深圳超市肉菜档遭抢</li>
					</ul>
				</div>
			</div>
			<div class="item">
				<h3>省内新闻</h3>
				<div class="itemBox">
					<ul>
						<li>深圳超市肉菜档遭抢</li>
						<li>深圳超市肉菜档遭抢</li>
						<li>深圳超市肉菜档遭抢</li>
						<li>深圳超市肉菜档遭抢</li>
					</ul>
				</div>
			</div>
			<div class="item">
				<h3>国内新闻</h3>
				<div class="itemBox">
					<ul>
						<li>深圳超市肉菜档遭抢</li>
						<li>深圳超市肉菜档遭抢</li>
						<li>深圳超市肉菜档遭抢</li>
						<li>深圳超市肉菜档遭抢</li>
					</ul>
				</div>
			</div>
			<div class="item">
				<h3>国际新闻</h3>
				<div class="itemBox">
					<ul>
						<li>深圳超市肉菜档遭抢</li>
						<li>深圳超市肉菜档遭抢</li>
						<li>深圳超市肉菜档遭抢</li>
						<li>深圳超市肉菜档遭抢</li>
					</ul>
				</div>
			</div>
		</div>
	</body>
</html>
```

#### 五：2D 和 3D 旋转-transform

##### 2D 旋转

文档：[CSS3 2D 转换 | 菜鸟教程 (runoob.com)](https://www.runoob.com/css3/css3-2dtransforms.html)

CSS3 转换可以对元素进行移动、缩放、转动、拉长或拉伸

transform 的五个属性：

- translate() - 根据左(X 轴)和顶部(Y 轴)位置给定的参数，从当前元素位置移动
- rotate() - 在一个给定度数顺时针旋转的元素。负值是允许的，这样是元素逆时针旋转
- scale() - 该元素增加或减少的大小，取决于宽度（X 轴）和高度（Y 轴）的参数
- skew() - 转变宽度为原来的大小的 2 倍，和其原始大小 3 倍的高度
- matrix() -方法和 2D 变换方法合并成一个
  - 六个参数：
  - 包含旋转，缩放，移动（平移）和倾斜功能

###### 新转换属性

以下列出了所有的转换属性:

| Property                                                                        | 描述                       | CSS |
| ------------------------------------------------------------------------------- | -------------------------- | --- |
| [transform](https://www.runoob.com/cssref/css3-pr-transform.html)               | 适用于 2D 或 3D 转换的元素 | 3   |
| [transform-origin](https://www.runoob.com/cssref/css3-pr-transform-origin.html) | 允许您更改转化元素轴心位置 | 3   |

###### 2D 转换方法

| 函数                            | 描述                                     |
| ------------------------------- | ---------------------------------------- |
| matrix(_n_,_n_,_n_,_n_,_n_,_n_) | 定义 2D 转换，使用六个值的矩阵。         |
| translate(_x_,_y_)              | 定义 2D 转换，沿着 X 和 Y 轴移动元素。   |
| translateX(_n_)                 | 定义 2D 转换，沿着 X 轴移动元素。        |
| translateY(_n_)                 | 定义 2D 转换，沿着 Y 轴移动元素。        |
| scale(_x_,_y_)                  | 定义 2D 缩放转换，改变元素的宽度和高度。 |
| scaleX(_n_)                     | 定义 2D 缩放转换，改变元素的宽度。       |
| scaleY(_n_)                     | 定义 2D 缩放转换，改变元素的高度。       |
| rotate(_angle_)                 | 定义 2D 旋转，在参数中规定角度。         |
| skew(_x-angle_,_y-angle_)       | 定义 2D 倾斜转换，沿着 X 和 Y 轴。       |
| skewX(_angle_)                  | 定义 2D 倾斜转换，沿着 X 轴。            |
| skewY(_angle_)                  | 定义 2D 倾斜转换，沿着 Y 轴。            |

###### 代码例子，transform 选转结合过渡 transition

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>Title</title>
		<style>
			* {
				padding: 0;
				margin: 0;
			}
			div {
				width: 100px;
				height: 100px;
				background-color: red;
				margin-left: 200px;
				margin-top: 10px;
				/*添加过渡效果  css样式名称 耗时*/
				transition: transform 2s;
			}
			/*移动translate*/
			div:first-of-type:active {
				/*使用transform实现元素的移动 a.移动是参照元素的左上角 b.执行完毕之后会恢复到原始状态
            1.如果只有一个参数就代表x方向
            2.如果有两个参数就代表x/y方向*/
				/*transform: translate(100px);*/
				/*transform: translate(400px,500px);*/
				/*transform: translate(0px,500px);*/

				/*添加水平或者垂直方向的移动*/
				/*transform:translateX(300px);*/
				transform: translateY(300px);
			}
			/*缩放：scale*/
			div:nth-of-type(2):active {
				/*实现缩放  1指不缩放，>1.01放大  <0.99缩小  参照元素的几何中心
            1.如果只有一个参数，就代表x和y方向都进行相等比例的缩放
            2.如果有两个参数，就代表x/y方向*/
				/*transform: scale(2);*/
				/*transform: scale(2,1);*/
				/*缩放指定的方向 */
				/*transform:scaleX(0.5);*/
				transform: scaleY(0.5);
			}
			/*旋转：rotate*/
			div:nth-of-type(3) {
				/*设置旋转轴心
            1.x y
            2.关键字：left top right bottom center*/
				background-color: purple;
				transform-origin: left top;
			}
			div:nth-of-type(3):active {
				/*transform:rotate(-90deg);
            transform: translateX(700px);*/
				/*同时添加多个transform属性值*/
				transform: translateX(700px) rotate(-90deg);
				/*transform: rotate(-90deg) translateX(700px);*/
			}
			/*斜切：skew*/
			div:nth-of-type(4):active {
				background-color: blue;
				/*如果角度为正，则往当前轴的负方向斜切，如果角度为，则往当前轴的正方向斜切*/
				transform: skew(-30deg);
				/*transform:skew(30deg,-30deg);*/
				/*设置某个方向的斜切值*/
				/*transform:skewX(30deg);*/
				/*transform:skewY(30deg);*/
			}
		</style>
	</head>
	<body>
		<div>1</div>
		<div>2</div>
		<div>3</div>
		<div>4</div>
	</body>
</html>
```

扑克牌旋转轴心案例：

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>Title</title>
		<style>
			* {
				padding: 0;
				margin: 0;
			}
			.pkBox {
				width: 155px;
				height: 219px;
				position: relative;
				margin: 300px auto;
			}
			.pkBox > img {
				width: 100%;
				height: 100%;
				position: absolute;
				left: 0;
				top: 0;
				/*添加过渡*/
				transition: transform 2s;
				/*设置旋转轴心*/
				transform-origin: right top;
			}
			/*添加鼠标上移的效果*/
			.pkBox:hover > img:nth-of-type(1) {
				transform: rotate(60deg);
			}
			.pkBox:hover > img:nth-of-type(2) {
				transform: rotate(120deg);
			}
			.pkBox:hover > img:nth-of-type(3) {
				transform: rotate(180deg);
			}
			.pkBox:hover > img:nth-of-type(4) {
				transform: rotate(240deg);
			}
			.pkBox:hover > img:nth-of-type(5) {
				transform: rotate(300deg);
			}
			.pkBox:hover > img:nth-of-type(6) {
				transform: rotate(360deg);
			}
		</style>
	</head>
	<body>
		<div class="pkBox">
			<img src="../img/pk1.png" alt="" />
			<img src="../img/pk2.png" alt="" />
			<img src="../img/pk1.png" alt="" />
			<img src="../img/pk2.png" alt="" />
			<img src="../img/pk1.png" alt="" />
			<img src="../img/pk2.png" alt="" />
		</div>
	</body>
</html>
```

pk1

![pk1.png](.\img\pk1.png)

pk2

![pk2.png](.\img\pk2.png)

同时添加多个 transform 属性：

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>Title</title>
		<style>
			* {
				padding: 0;
				margin: 0;
			}
			body {
				background-color: #31965b;
			}
			.box {
				width: 440px;
				margin: 100px auto;
			}
			.box > img {
				transition: transform 1s;
			}
			.box > img:nth-of-type(1) {
				transform: translate(100px, 100px) rotate(30deg);
			}
			.box > img:nth-of-type(2) {
				transform: translate(-100px, -100px) rotate(-30deg);
			}
			.box > img:nth-of-type(3) {
				transform: translate(200px, 200px) rotate(60deg);
			}
			.box > img:nth-of-type(4) {
				transform: translate(-200px, -200px) rotate(-60deg);
			}
			.box > img:nth-of-type(5) {
				transform: translate(150px, 150px) rotate(90deg);
			}
			.box > img:nth-of-type(6) {
				transform: translate(50px, 150px) rotate(-90deg);
			}
			.box > img:nth-of-type(7) {
				transform: translate(-150px, -150px) rotate(60deg);
			}
			.box > img:nth-of-type(8) {
				transform: translate(10px, -250px) rotate(-90deg);
			}
			.box > img:nth-of-type(9) {
				transform: translate(-250px, 10px) rotate(45deg);
			}

			.box:hover > img {
				transform: none;
			}
		</style>
	</head>
	<body>
		<div class="box">
			<img src="../img/shield_1_01.png" alt="" />
			<img src="../img/shield_1_02.png" alt="" />
			<img src="../img/shield_1_03.png" alt="" />
			<img src="../img/shield_1_04.png" alt="" />
			<img src="../img/shield_1_05.png" alt="" />
			<img src="../img/shield_1_06.png" alt="" />
			<img src="../img/shield_1_07.png" alt="" />
			<img src="../img/shield_1_08.png" alt="" />
			<img src="../img/shield_1_09.png" alt="" />
		</div>
	</body>
</html>
```

shield_1_01.png

![shield_1_01.png](.\img\shield_1_01.png)

shield_1_02.png

![shield_1_02.png](.\img\shield_1_02.png)

shield_1_03.png

![shield_1_03.png](.\img\shield_1_03.png)

shield_1_04.png

![shield_1_04.png](.\img\shield_1_04.png)

shield_1_05.png

![shield_1_05.png](.\img\shield_1_05.png)

shield_1_06.png

![shield_1_06.png](.\img\shield_1_06.png)

shield_1_07.png

![shield_1_07.png](.\img\shield_1_07.png)

shield_1_08.png

![shield_1_08.png](.\img\shield_1_08.png)

shield_1_09.png

![shield_1_09.png](.\img\shield_1_09.png)

---

任意元素居中案例：transform: translate(-50%,-50%);

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>Title</title>
		<style>
			* {
				padding: 0;
				margin: 0;
			}
			.box {
				width: 400px;
				height: 400px;
				border-radius: 200px;
				background-color: #ccc;
				margin: 100px auto;
				position: relative;
			}
			.rec {
				width: 200px;
				height: 200px;
				background-color: red;
				position: absolute;
				/*定位的百分比是参照父容器的宽高*/
				left: 50%;
				top: 50%;
				/*使用transform实现元素的居中  百分比是参照元素本身的宽高*/
				transform: translate(-50%, -50%);
				/*transform: translate(-50px,-50px);*/
			}
		</style>
	</head>
	<body>
		<div class="box">
			<div class="rec"></div>
		</div>
	</body>
</html>
```

---

##### 3D 旋转

文档：[CSS3 3D 转换 | 菜鸟教程 (runoob.com)](https://www.runoob.com/css3/css3-3dtransforms.html)

- rotateX() - 围绕其在一个给定度数 X 轴旋转的元素
- rotateY() - 围绕其在一个给定度数 Y 轴旋转的元素

###### 转换属性

下表列出了所有的转换属性：

| 属性                                                                                                                  | 描述                                 | CSS |
| --------------------------------------------------------------------------------------------------------------------- | ------------------------------------ | --- |
| [transform](https://www.runoob.com/cssref/css3-pr-transform.html "CSS3 transform 属性")                               | 向元素应用 2D 或 3D 转换。           | 3   |
| [transform-origin](https://www.runoob.com/cssref/css3-pr-transform-origin.html "CSS3 transform-origin 属性")          | 允许你改变被转换元素的位置。         | 3   |
| [transform-style](https://www.runoob.com/cssref/css3-pr-transform-style.html "CSS3 transform-style 属性")             | 规定被嵌套元素如何在 3D 空间中显示。 | 3   |
| [perspective](https://www.runoob.com/cssref/css3-pr-perspective.html "CSS3 perspective 属性")                         | 规定 3D 元素的透视效果。             | 3   |
| [perspective-origin](https://www.runoob.com/cssref/css3-pr-perspective-origin.html "CSS3 perspective-origin 属性")    | 规定 3D 元素的底部位置。             | 3   |
| [backface-visibility](https://www.runoob.com/cssref/css3-pr-backface-visibility.html "CSS3 backface-visibility 属性") | 定义元素在不面对屏幕时是否可见。     | 3   |

###### 3D 转换方法

| 函数                                                                      | 描述                                      |
| ------------------------------------------------------------------------- | ----------------------------------------- |
| matrix3d(_n_,_n_,_n_,_n_,_n_,_n_,_n_,_n_,_n_,_n_,_n_,_n_,_n_,_n_,_n_,_n_) | 定义 3D 转换，使用 16 个值的 4x4 矩阵。   |
| translate3d(_x_,_y_,_z_)                                                  | 定义 3D 转化。                            |
| translateX(_x_)                                                           | 定义 3D 转化，仅使用用于 X 轴的值。       |
| translateY(_y_)                                                           | 定义 3D 转化，仅使用用于 Y 轴的值。       |
| translateZ(_z_)                                                           | 定义 3D 转化，仅使用用于 Z 轴的值。       |
| scale3d(_x_,_y_,_z_)                                                      | 定义 3D 缩放转换。                        |
| scaleX(_x_)                                                               | 定义 3D 缩放转换，通过给定一个 X 轴的值。 |
| scaleY(_y_)                                                               | 定义 3D 缩放转换，通过给定一个 Y 轴的值。 |
| scaleZ(_z_)                                                               | 定义 3D 缩放转换，通过给定一个 Z 轴的值。 |
| rotate3d(_x_,_y_,_z_,_angle_)                                             | 定义 3D 旋转。                            |
| rotateX(_angle_)                                                          | 定义沿 X 轴的 3D 旋转。                   |
| rotateY(_angle_)                                                          | 定义沿 Y 轴的 3D 旋转。                   |
| rotateZ(_angle_)                                                          | 定义沿 Z 轴的 3D 旋转。                   |
| perspective(_n_)                                                          | 定义 3D 转换元素的透视视图。              |

三维变换使用基于二维变换的相同属性，可以让我们基于三个坐标方向对元素进行变换。和二维变形一样，三维变形可以使用 transform 属性来设置

###### 1. 3D 移动

- a)  方法：translate3d(x,y,z) 使元素在这三个纬度中移动,也可以分开写，如：translateX(length),translateY(length), translateZ(length)

- b)  示例：

- ```css
  div:hover{
      /*Y轴移动+100px*/
      /*transform:translateY(100px);*/
      /*X轴移动100px*/
      /*transform:translateX(100px);*/
      /*x轴和Y轴方向同时移动*/
      transform:translate3d(100px,100px,0px);
  }
  ```

###### 2. 3D 缩放

- a) scale3d(number,number,number) 使元素在这三个纬度中缩放，也可分开写，如：scaleX(),scaleY(),scaleZ()

- b)  示例

- ```css
  div:hover{
      /*Y轴方向放大1倍*/
      /*transform: scaleX(2);*/
      /*X轴方向缩小0.5*/
      /*transform: scaleX(0.5);*/
      /*x轴和Y轴方向同时进行缩放*/
      transform: scale3d(2,0.5,1);
  }
  ```

###### 3. 3D 旋转

- a) rotate3d(x,y,z,angle)：指定需要进行旋转的坐标轴

- b) rotateX(angle) 是元素依照 x 轴旋转

- c) rotateY(angle) 是元素依照 y 轴旋转；

- d) rotateZ(angle) 是元素依照 z 轴旋转

- e)  示例：

- ```css
  div:hover{
      /*Y轴方向旋转45度*/
      /*transform: rotateY(45deg);*/
      /*X轴方向旋转90度*/
      /*transform: rotateX(90deg);*/
      /*x轴和Y轴方向同时进行旋转放*/
      transform: rotate3d(1,1,0,45deg);
  }
  ```

###### 4.  透视/景深效果

左手法则：大拇指指向当前坐标轴的下方向，手指环绕的方向就是正方向

- f) perspective(length) 为一个元素设置三维透视的距离。仅作用于元素的后代，而不是其元素本身。当 perspective:none/0;时，相当于没有设 perspective(length)。比如你要建立一个小立方体，长宽高都是 200px。如果你的 perspective < 200px ，那就相当于站在盒子里面看的结果，如果 perspective 非常大那就是站在非常远的地方看（立方体已经成了小正方形了），意味着 perspective  属性指定了观察者与 z=0 平面的距离，使具有三维位置变换的元素产生透视效果

- g)  perspective-origin 属性规定了镜头在平面上的位置。默认是放在元素的中心

h) transform-style：使被转换的子元素保留其 3D 转换(需要设置在父元素中)：

| **值**      | **描述**                            |
| ----------- | ----------------------------------- |
| flat        | 子元素将不保留其 3D 位置-平面方式。 |
| preserve-3d | 子元素将保留其 3D 位置—立体方式。   |

###### 3D 移动、缩放、旋转的案例

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>Title</title>
		<style>
			* {
				padding: 0;
				margin: 0;
			}
			div {
				width: 100px;
				height: 100px;
				background-color: red;
				margin-left: 200px;
				margin-top: 10px;
				/*添加过渡*/
				transition: transform 2s;
			}
			/*添加三维移动--3D移动*/
			div:first-of-type:active {
				/*translate3d(X方向的偏移，Y方向的偏移，Z方向的偏移)*/
				/*transform: translate3d(400px,0,0);*/
				/*transform: translate3d(400px,400px,0);*/
				transform: translate3d(0px, 0px, 400px);
			}
			/*添加三维缩放*/
			div:nth-of-type(2):active {
				/*scale3d(x方向上的缩放，y方向的缩放，z方向的缩放)
            >1.01 放大   <0.99 缩小*/
				/*transform:scale3d(2,0.5,10);*/
				transform: scale3d(1, 1, 10);
			}
			/*添加三维旋转*/
			div:nth-of-type(3):active {
				/*rotate3d(x,y,z,angle):
            x:代表x轴方向上的一个向量值
            y:代表y轴方向上的一个向量值
            z:代表z轴方向上的一个向量值*/
				transform: rotate3d(1, 1, 1, 330deg);
			}
		</style>
	</head>
	<body>
		<div>1</div>
		<div>2</div>
		<div>3</div>
		<div>4</div>
	</body>
</html>
```

###### 透视，立方体案例

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>Title</title>
		<style>
			* {
				padding: 0;
				margin: 0;
			}
			.box {
				width: 200px;
				height: 200px;
				margin: 100px auto;
				position: relative;
				/*让box默认旋转，方便观察：试着把deg值改变看看*/
				transform: rotate3d(1, 1, 0, -30deg);
				/*让子元素保留3d变换之后的效果*/
				transform-style: preserve-3d;
				/*添加透视景深效果(观察的原点，配合下面perspective-origin使用)：试着把值增大或缩小*/
				/* perspective: 0px; */
				/*设置透视的观察角度：试着把两个值增大或缩小看看*/
				/* 第一个参数:是往左右,第二个参数是上下 */
				perspective-origin: 0px 0px;
			}
			.box > div {
				width: 200px;
				height: 200px;
				position: absolute;
				opacity: 0.5;
			}
			.front {
				background-color: red;
				transform: translateZ(100px);
			}
			.back {
				background-color: green;
				transform: translateZ(-100px) rotateY(180deg);
			}
			.left {
				background-color: blue;
				/*移动+旋转*/
				transform: translateX(-100px) rotateY(-90deg);
			}
			.right {
				background-color: pink;
				transform: translateX(100px) rotateY(90deg);
			}
			.top {
				background-color: purple;
				transform: translateY(-100px) rotateX(90deg);
			}
			.bottom {
				background-color: orange;
				transform: translateY(100px) rotateX(-90deg);
			}
		</style>
	</head>
	<body>
		<div class="box">
			<div class="front">front</div>
			<div class="back">back</div>
			<div class="left">left</div>
			<div class="right">right</div>
			<div class="top">top</div>
			<div class="bottom">bottom</div>
		</div>
	</body>
</html>
```

#### 六：animation 动画

CSS3 动画 文档：[CSS3 动画 | 菜鸟教程 (runoob.com)](https://www.runoob.com/css3/css3-animations.html)

CSS 中支持动画的属性 文档：[CSS 动画 | 菜鸟教程 (runoob.com)](https://www.runoob.com/cssref/css-animatable.html)

---

动画是 CSS3 中具有颠覆性的特征之一，可通过设置多个节点来精确控制一个或一组动画，常用来实现复杂的动画效果.

##### 1.  必要元素

- a、通过@keyframes 指定动画序列；自动补间动画，确定两个点，系统会自动计算中间过程。这两个点就称为关键帧。我们可以设置多个关键帧

- b、通过百分比将动画序列分割成多个节点；

- c、在各节点中分别定义各属性

- d、通过 animation 将动画应用于相应元素；

##### 2. CSS3animation 动画样式常用属性

- a)  动画序列的名称：animation-name: move;

- b)  动画的持续时间：animation-duration: 1s;

- c)  动画的延时：animation-delay: 1s;

- d)  播放状态：animation-play-state: paused 停止|running 运行;

- e)  播放速度：animation-timing-function: linear;

- f)  播放次数 反复：animation-iteration-count: 1;

- g)  动画播放完结后的状态：animation-fill-mode: forwards;

- h)  循环播放时，交叉动画：animation-direction: alternate;

下面的表格列出了 @keyframes 规则和所有动画属性：

| 属性                                                                                                                                    | 描述                                                                                     | CSS |
| --------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | --- |
| [@keyframes](https://www.runoob.com/cssref/css3-pr-animation-keyframes.html "CSS3 @keyframes 规则")                                     | 规定动画。                                                                               | 3   |
| [animation](https://www.runoob.com/cssref/css3-pr-animation.html "CSS3 animation 属性")                                                 | 所有动画属性的简写属性。                                                                 | 3   |
| [animation-name](https://www.runoob.com/cssref/css3-pr-animation-name.html "CSS3 animation-name 属性")                                  | 规定 @keyframes 动画的名称。                                                             | 3   |
| [animation-duration](https://www.runoob.com/cssref/css3-pr-animation-duration.html "CSS3 animation-duration 属性")                      | 规定动画完成一个周期所花费的秒或毫秒。默认是 0。                                         | 3   |
| [animation-timing-function](https://www.runoob.com/cssref/css3-pr-animation-timing-function.html "CSS3 animation-timing-function 属性") | 规定动画的速度曲线。默认是 "ease"。                                                      | 3   |
| [animation-fill-mode](https://www.runoob.com/cssref/css3-pr-animation-fill-mode.html "CSS3 animation-fill-mode 属性")                   | 规定当动画不播放时（当动画完成时，或当动画有一个延迟未开始播放时），要应用到元素的样式。 | 3   |
| [animation-delay](https://www.runoob.com/cssref/css3-pr-animation-delay.html "CSS3 animation-delay 属性")                               | 规定动画何时开始。默认是 0。                                                             | 3   |
| [animation-iteration-count](https://www.runoob.com/cssref/css3-pr-animation-iteration-count.html "CSS3 animation-iteration-count 属性") | 规定动画被播放的次数。默认是 1。                                                         | 3   |
| [animation-direction](https://www.runoob.com/cssref/css3-pr-animation-direction.html "CSS3 animation-direction 属性")                   | 规定动画是否在下一周期逆向地播放。默认是 "normal"。                                      | 3   |
| [animation-play-state](https://www.runoob.com/cssref/css3-pr-animation-play-state.html "CSS3 animation-play-state 属性")                | 规定动画是否正在运行或暂停。默认是 "running"。                                           | 3   |

##### 3.  代码说明

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>Title</title>
		<style>
			* {
				padding: 0;
				margin: 0;
			}
			div {
				width: 100px;
				height: 100px;
				background-color: red;

				/*添加动画效果*/
				/*1.animation-name:指定动画名称*/
				animation-name: moveTest;
				/*2.设置动画的总耗时*/
				animation-duration: 2s;
				/*3.设置动画的播放次数，默认为1次  可以指定具体的数值，也可以指定infinite(无限次)*/
				animation-iteration-count: 1;
				/*4.设置交替动画  alternate:来回交替*/
				animation-direction: alternate;
				/*5.设置动画的延迟*/
				animation-delay: 2s;
				/*5.设置动画结束时的状态：默认情况下，动画执行完毕之后，会回到原始状态
            forwards:会保留动画结束时的状态，在有延迟的情况下，并不会立刻进行到动画的初始状态
            backwards:不会保留动画结束时的状态，在添加了动画延迟的前提下，如果动画有初始状态，那么会立刻进行到初始状态
            both:会保留动画的结束时状态，在有延迟的情况下也会立刻进入到动画的初始状态*/
				animation-fill-mode: both;
				/*6.动画的时间函数*/
				animation-timing-function: linear;
				/*设置动画的播放状态  paused:暂停   running:播放*/
				animation-play-state: running;
			}

			/*创建动画*/
			@keyframes moveTest {
				/*百分比是指整个动画耗时的百分比  10s*/
				/*0%{
                transform: translate(0,0);
            }*/
				/*from:0%*/
				from {
					transform: translate(0, 0) rotate(45deg);
				}
				/*0~1*/
				50% {
					transform: translate(0, 500px);
				}
				/*1~2*/
				/*100%{
                transform: translate(500px,600px);
            }*/
				/*to:100%*/
				to {
					transform: translate(500px, 600px);
				}
			}
		</style>
	</head>
	<body>
		<div></div>
		<input type="button" value="播放" id="play" />
		<input type="button" value="暂停" id="pause" />
		<script>
			var div = document.querySelector("div");
			document.querySelector("#play").onclick = function () {
				div.style.animationPlayState = "running";
			};
			document.querySelector("#pause").onclick = function () {
				div.style.animationPlayState = "paused";
			};
		</script>
	</body>
</html>
```

##### 4.  动画案例：汽车/钟表/宇宙

###### 无缝滚动图片

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>Title</title>
		<style>
			* {
				padding: 0;
				margin: 0;
			}
			div {
				width: 882px;
				height: 86px;
				margin: 100px auto;
				background-color: #ddd;
				overflow: hidden;
			}
			div > ul {
				width: 200%;
				list-style: none;
				/*1.设置的名称*/
				animation-name: move;
				/*2.设置动画的耗时*/
				animation-duration: 7s;
				/*3.市场无限循环*/
				animation-iteration-count: infinite;
				/*4.设置时间函数*/
				animation-timing-function: linear;
			}

			div > ul > li {
				width: 126px;
				float: left;
			}
			div > ul > li　 > img {
				width: 100%;
			}
			/*鼠标上移，停止动画*/
			div:hover > ul {
				cursor: pointer;
				animation-play-state: paused;
			}

			/*创建动画*/
			@keyframes move {
				from {
					transform: translateX(0);
				}
				to {
					transform: translateX(-882px);
				}
			}
		</style>
	</head>
	<body>
		<div>
			<ul>
				<li><img src="../images/1.jpg" alt="" /></li>
				<li><img src="../images/2.jpg" alt="" /></li>
				<li><img src="../images/3.jpg" alt="" /></li>
				<li><img src="../images/4.jpg" alt="" /></li>
				<li><img src="../images/5.jpg" alt="" /></li>
				<li><img src="../images/6.jpg" alt="" /></li>
				<li><img src="../images/7.jpg" alt="" /></li>
				<li><img src="../images/1.jpg" alt="" /></li>
				<li><img src="../images/2.jpg" alt="" /></li>
				<li><img src="../images/3.jpg" alt="" /></li>
				<li><img src="../images/4.jpg" alt="" /></li>
				<li><img src="../images/5.jpg" alt="" /></li>
				<li><img src="../images/6.jpg" alt="" /></li>
				<li><img src="../images/7.jpg" alt="" /></li>
			</ul>
		</div>
	</body>
</html>
```

###### 钟表滚动案例

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>Title</title>
		<style>
			* {
				padding: 0;
				margin: 0;
			}
			.clock {
				width: 300px;
				height: 300px;
				border: 10px solid #ccc;
				/*border-radius: 160px;*/
				/*百分比参照元素的实际宽高*/
				border-radius: 50%;
				margin: 100px auto;
				position: relative;
			}
			.line {
				width: 8px;
				height: 300px;
				background-color: #ccc;
				position: absolute;
				/*参照父容器的宽*/
				left: 50%;
				top: 0;
				/*参照元素本身*/
				transform: translate(-50%, 0);
			}
			.line1,
			.line4 {
				width: 10px;
			}
			.line2 {
				transform: translate(-50%, 0) rotate(30deg);
			}
			.line3 {
				transform: translate(-50%, 0) rotate(60deg);
			}
			.line4 {
				transform: translate(-50%, 0) rotate(90deg);
			}
			.line5 {
				transform: translate(-50%, 0) rotate(120deg);
			}
			.line6 {
				transform: translate(-50%, 0) rotate(150deg);
			}
			.cover {
				width: 250px;
				height: 250px;
				border-radius: 50%;
				background-color: #fff;
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-50%, -50%);
			}
			.hour {
				width: 6px;
				height: 80px;
				background-color: red;
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-50%, -100%);
				transform-origin: center bottom;
				animation: clockAnimation 43200s linear infinite;
			}
			.minute {
				width: 4px;
				height: 90px;
				background-color: green;
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-50%, -100%);
				transform-origin: center bottom;
				animation: clockAnimation 3600s linear infinite;
			}
			.second {
				width: 2px;
				height: 100px;
				background-color: blue;
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-50%, -100%);

				/*设置旋转轴心*/
				transform-origin: center bottom;
				/*添加动画*/
				animation: clockAnimation 60s infinite steps(60);
				/*steps(60)与animation-timing-function的其它属性冲突*/
				/*animation-timing-function: steps(60);*/
			}
			.center {
				width: 20px;
				height: 20px;
				background-color: #ccc;
				border-radius: 50%;
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-50%, -50%);
			}

			/*创建动画*/
			@keyframes clockAnimation {
				from {
					transform: translate(-50%, -100%) rotate(0deg);
				}
				to {
					transform: translate(-50%, -100%) rotate(360deg);
				}
			}
		</style>
	</head>
	<body>
		<div class="clock">
			<div class="line line1"></div>
			<div class="line line2"></div>
			<div class="line line3"></div>
			<div class="line line4"></div>
			<div class="line line5"></div>
			<div class="line line6"></div>
			<div class="cover"></div>
			<div class="hour"></div>
			<div class="minute"></div>
			<div class="second"></div>
			<div class="center"></div>
		</div>
	</body>
</html>
```

###### 宇宙旋转动画

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>Title</title>
		<style>
			* {
				padding: 0;
				margin: 0;
			}
			body {
				background: url("../images/bg.jpg");
			}
			ul {
				width: 600px;
				height: 600px;
				margin: 100px auto;
				position: relative;
			}
			ul > li {
				list-style: none;
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-50%, -50%);
				border-radius: 50%;
				box-sizing: border-box;
				/*添加动画*/
				animation: starAnimation linear infinite;
			}
			ul > li > span {
				width: 12px;
				height: 12px;
				border-radius: 6px;
				background-color: #fff741;
				position: absolute;
				left: 50%;
				top: 0;
				/*margin-left: -6px;
            margin-top: -6px;*/
				animation: starAnimation 2s linear infinite;
			}
			ul > li > span > span {
				width: 6px;
				height: 6px;
				border-radius: 3px;
				background-color: blue;
				position: absolute;
				left: 3px;
				top: -10px;
			}
			ul > li:nth-child(1) {
				width: 60px;
				height: 60px;
				background-color: #fff741;
				box-shadow: 0px 0px 50px #fff741;
			}
			ul > li:nth-child(2) {
				width: 120px;
				height: 120px;
				border: 2px solid #394057;
				animation-duration: 2s;
			}
			ul > li:nth-child(3) {
				width: 180px;
				height: 180px;
				border: 2px solid #394057;
				animation-duration: 4s;
			}
			ul > li:nth-child(4) {
				width: 240px;
				height: 240px;
				border: 2px solid #394057;
				animation-duration: 7s;
				/*添加背景*/
				background: url("../images/asteroids_meteorids.png") no-repeat;
				background-size: 240px 240px;
			}
			ul > li:nth-child(5) {
				width: 300px;
				height: 300px;
				border: 2px solid #394057;
				animation-duration: 13s;
			}
			ul > li:nth-child(6) {
				width: 360px;
				height: 360px;
				border: 2px solid #394057;
				animation-duration: 18s;
			}
			ul > li:nth-child(7) {
				width: 420px;
				height: 420px;
				border: 2px solid #394057;
				animation-duration: 28s;
			}
			ul > li:nth-child(8) {
				width: 480px;
				height: 480px;
				border: 2px solid #394057;
				animation-duration: 43s;
			}
			ul > li:nth-child(9) {
				width: 540px;
				height: 540px;
				border: 2px solid #394057;
				animation-duration: 66s;
			}
			ul > li:nth-child(10) {
				width: 600px;
				height: 600px;
				border: 2px solid #394057;
				animation-duration: 88s;
			}

			@keyframes starAnimation {
				from {
					transform: translate(-50%, -50%) rotate(0deg);
				}
				to {
					transform: translate(-50%, -50%) rotate(360deg);
				}
			}
		</style>
	</head>
	<body>
		<ul>
			<li></li>
			<li><span></span></li>
			<li><span></span></li>
			<li><span></span></li>
			<li><span></span></li>
			<li><span></span></li>
			<li>
				<span><span></span></span>
			</li>
			<li><span></span></li>
			<li><span></span></li>
			<li><span></span></li>
		</ul>
	</body>
</html>
```

---

#### 七：web 字体和字体图标

开发人员可以为自已的网页指定特殊的字体，无需考虑用户电脑上是否安装了此特殊字体，从此把特殊字体处理成图片的时代便成为了过去。它的支持程度比较好，甚至 IE 低版本浏览器也能支持。

##### 1.  字体格式

不同浏览器所支持的字体格式是不一样的，我们有必要了解一下有关字体格式的知识。

1、TureTpe(.ttf)格式

.ttf 字体是 Windows 和 Mac 的最常见的字体，是一种 RAW 格式，支持这种字体的浏览器有 IE9+、Firefox3.5+、Chrome4+、Safari3+、Opera10+、iOS Mobile、Safari4.2+；

2、OpenType(.otf)格式

.otf 字体被认为是一种原始的字体格式，其内置在 TureType 的基础上，支持这种字体的浏览器有 Firefox3.5+、Chrome4.0+、Safari3.1+、Opera10.0+、iOS Mobile、Safari4.2+；

3、Web Open Font Format(.woff)格式

woff 字体是 Web 字体中最佳格式，他是一个开放的 TrueType/OpenType 的压缩版本，同时也支持元数据包的分离，支持这种字体的浏览器有 IE9+、Firefox3.5+、Chrome6+、Safari3.6+、Opera11.1+；

4、Embedded Open Type(.eot)格式

.eot 字体是 IE 专用字体，可以从 TrueType 创建此格式字体，支持这种字体的浏览器有 IE4+；

5、SVG(.svg)格式

.svg 字体是基于 SVG 字体渲染的一种格式，支持这种字体的浏览器有 Chrome4+、Safari3.1+、Opera10.0+、iOS Mobile Safari3.2+

##### 2.  字体图标

常见的是把网页常用的一些小的图标，借助工具帮我们生成一个字体包，然后就可以像使用文字一样使用图标了

###### a)  优点

Ø  将所有图标打包成字体库，减少请求；

Ø  具有矢量性，可保证清晰度；

Ø  使用灵活，便于维护

###### b)  生成字体图标文件

- a)  下载字体图标文件：如<https://www.awesomes.cn/>的网站的介绍和使用

- b)  自定义字体

  - ```css
    /*定义字体图标*/
    @font-face {
        font-family: 'wjs'; //自定义的字体名称
        src: url('../fonts/MiFie-Web-Font.eot'); /* IE9*/
        src: url('../fonts/MiFie-Web-Font.eot') format('embedded-opentype'), /* IE6-IE8 */
        url('../fonts/MiFie-Web-Font.woff') format('woff'), /* chrome、firefox */
        url('../fonts/MiFie-Web-Font.ttf') format('truetype'), /* chrome、firefox、opera、Safari, Android, iOS 4.2+*/
        url('../fonts/MiFie-Web-Font.svg') format('svg'); /* iOS 4.1- */
    }
    ```

- c)  通过 css 样式使用字体

  - ```css
    /*自定义字体图标*/
    .wjs_font_icon{
        font-family: wjs; //这里对应着自定义的字体名称
    }
    /*手机图标对应的编码*/
    .wjs_font_icon_phone::before{
        content: "\e908"; //指定显示的内容
    }
    ```

---

#### 八：多列布局

CSS3 中新出现的多列布局(multi-column)是传统 HTML 网页中块状布局模式的有力扩充。这种新语法能够让 WEB 开发人员轻松的让文本呈现多列显示。

我们知道，当一行文字太长时，读者读起来就比较费劲，有可能读错行或读串行；人们的视点从文本的一端移到另一端、然后换到下一行的行首，如果眼球移动浮动过大，他们的注意力就会减退，容易读不下去。

所以，为了最大效率的使用大屏幕显示器，页面设计中需要限制文本的宽度，让文本按多列呈现，就像报纸上的新闻排版一样

##### 常用属性

- column-count:  属性设置列的具体个数

- column-width: 属性控制列的宽度

- column-gap: 两列之间的缝隙间隔

- column-rule: 规定列之间的宽度、样式和颜色

- column-span: 规定元素应横跨多少列(n:指定跨 n 列  all:跨所有列)

##### 多列的用法

```css
<style>
    *{
        padding: 0;
        margin: 0;
    }
    .wrapper{
        width:1054px;
        padding:20px;
        margin:0 auto;
        font-family: "微软雅黑",Arial;
        /*设置以几列的方式显示*/
        column-count:2;
        /*指定列宽*/
        column-width:500px;
        /*指定列与列之间的间距*/
        column-gap: 50px;
        /*指定列与列之间间隙的样式*/
        /*column-rule:2px dotted red*/
        /*相对应下面的三个属性*/
        column-rule-color:red;
        column-rule-style:dotted;
        column-rule-width:2px;
    }
    .wrapper > h4{
        column-span: all;
    }
</style>
```

##### 列高度的平衡

如果设定列的最大高度，这个时候，文本内容会从第一列开始填充，然后第二列，第三列

max-height: 300px;

---

#### 九：伸缩布局：display: flex

文档：[CSS3 弹性盒子 | 菜鸟教程 (runoob.com)](https://www.runoob.com/css3/css3-flexbox.html)

布局的传统解决方案，基于[盒状模型](https://developer.mozilla.org/en-US/docs/Web/CSS/box_model)，依赖  [display](https://developer.mozilla.org/en-US/docs/Web/CSS/display)属性  + [position](https://developer.mozilla.org/en-US/docs/Web/CSS/position)属性  + [float](https://developer.mozilla.org/en-US/docs/Web/CSS/float)属性。

它对于那些特殊布局非常不方便。CSS3 在布局方面做了非常大的改进，使得我们对块级元素的布局排列变得十分灵活，适应性非常强，其强大的伸缩性，在响应式开中可以发挥极大的作用。

##### 重要属性

- display: flex; 如果一个容器设置了这个属性，那么这个盒子里面的所有直接子元素都会自动的变成伸缩项(flex item)

- justify-content:  设置或检索弹性盒子元素在主轴（横轴）方向上的对齐方式,语法：justify-content：flex-start | flex-end | center | space-between | space-around

- flex-start：弹性盒子元素将向行起始位置对齐。该行的第一个子元素的主起始位置的边界将与该行的主起始位置的边界对齐，同时所有后续的伸缩盒项目与其前一个项目对齐。

- flex-end：弹性盒子元素将向行结束位置对齐。该行的第一个子元素的主结束位置的边界将与该行的主结束位置的边界对齐，同时所有后续的伸缩盒项目与其前一个项目对齐。

- center：弹性盒子元素将向行中间位置对齐。该行的子元素将相互对齐并在行中居中对齐，同时第一个元素与行的主起始位置的边距等同与最后一个元素与行的主结束位置的边距（如果剩余空间是负数，则保持两端相等长度的溢出）。

- space-between：弹性盒子元素会平均地分布在行里。如果最左边的剩余空间是负数，或该行只有一个子元素，则该值等效于'flex-start'。在其它情况下，第一个元素的边界与行的主起始位置的边界对齐，同时最后一个元素的边界与行的主结束位置的边距对齐，而剩余的伸缩盒项目则平均分布，并确保两两之间的空白空间相等。

- space-around：弹性盒子元素会平均地分布在行里，两端保留子元素与子元素之间间距大小的一半。如果最左边的剩余空间是负数，或该行只有一个伸缩盒项目，则该值等效于'center'。在其它情况下，伸缩盒项目则平均分布，并确保两两之间的空白空间相等，同时第一个元素前的空间以及最后一个元素后的空间为其他空白空间的一半。

- flex-flow: flex-flow 属性是 flex-direction 属性和 flex-wrap 属性的简写形式，默认值为 row nowrap。它用来设置或检索弹性盒模型对象的子元素排列方式,它的两种取值：flex-direction：定义弹性盒子元素的排列方向。flex-wrap：控制 flex 容器是单行或者多行。

- flex-direction：  **flex-direction**：row | row-reverse | column | column-reverse

- row：主轴与行内轴方向作为默认的书写模式。即横向从左到右排列（左对齐）。

- row-reverse：对齐方式与 row 相反。

- column：主轴与块轴方向作为默认的书写模式。即纵向从上往下排列（顶对齐）。

- column-reverse：对齐方式与 column 相反。

- flex-wrap：  flex-wrap：nowrap | wrap | wrap-reverse

- nowrap：flex 容器为单行。该情况下 flex 子项可能会溢出容器

- wrap：flex 容器为多行。该情况下 flex 子项溢出的部分会被放置到新行，子项内部会发生断行

- wrap-reverse：反转  wrap 排列。

- flex 属性：flex 属性是 flex-grow, flex-shrink  和  flex-basis 的简写，默认值为 0 1 auto。后两个属性可选

  - 语法：flex: [flex-grow] [flex-shrink] [flex-basis]：大多数情况下没必要使用这种语法，当使用 flex 缩写时，大多数情况下没必要使用这种语法

  - flex: [number]：这个语法指定了一个数字，代表了这个伸缩项目该占用的剩余空间比例

  - flex: auto：属性值被设为 auto 的伸缩项目，会根据主轴自动伸缩以占用所有剩余空间

#### 十：栅格系统-display:grid

文档：<https://developer.mozilla.org/zh-CN/docs/Web/CSS/grid>

#### 11：媒体查询

##### 1、设置 meta 标签

1.H5 页面窗口自动调整到设备宽度，并禁止用户缩放页面

```html
<meta
	name="viewport"
	content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum- scale=1.0,user-scalable=no"
/>
<--! 参数说明 width = device-width 宽度等于当前设备的宽度 initial-scale
初始的缩放比例 (默认设置为1.0) maximum-scale
允许用户缩放到的最大比例(默认设置为1.0) user-scalable 用户是否可以手动缩放
(默认设置为no -->
```

2.忽略将页面中的数字识别为电话号码

```html
<meta name="format-detection" content="telephone=no" />
```

3.忽略 Android 平台中对邮箱地址的识别

```html
<meta name="format-detection" content="email=no" />
```

4.当网站添加到主屏幕快速启动方式，可隐藏地址栏，仅针对 ios 的 safari

```html
<meta name="apple-mobile-web-app-capable" content="yes" />
```

<!-- ios7.0版本以后，safari上已看不到效果 -->

5.将网站添加到主屏幕快速启动方式，仅针对 ios 的 safari 顶端状态条的样式

```html
<meta name="apple-mobile-web-app-status-bar-style" content="black" />
<!-- 可选default、black、black-translucent -->
```

##### 2、媒体查询语句

```css
@media screen and (max-width: 768px) {
	*设备小于768px加载样式，语法是：and+(属性)*/ body {
		background-color: red;
	}
}
@media screen and (max-width: 992px) and (min-width: 768px) {
	*设备小于768px但小于992px加载样式*/ body {
		background-color: pink;
	}
}
@media screen and (min-width: 992px) {
	*设备大于992px加载样式*/ body {
		background-color: green;
	}
}
```
