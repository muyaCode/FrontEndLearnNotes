# HTML5 学习指引

🌟 从 HTML+CSS+JavaScript 到 Web 浏览器-用户的体验-各种工具框架与测试-服务端网页编程--->**😊 前端开发的学习路径 😊**：<https://developer.mozilla.org/zh-CN/docs/Learn/HTML>

编程直接 HTML 教程：<https://www.jb51.cc/html-tutorial/>

HTML 参考手册|菜鸟教程：<https://www.runoob.com/tags/html-reference.html>

w3c 的 HTML+CSS 手册：[HTML 系列教程 (w3school.com.cn)](https://www.w3school.com.cn/h.asp)

## HTML5 是什么？

1. [万维网](http://baike.baidu.com/view/7833.htm)的核心语言、[标准通用标记语言](http://baike.baidu.com/view/5286041.htm)下的一个应用[超文本标记语言](http://baike.baidu.com/view/383720.htm)（[HTML](http://baike.baidu.com/view/692.htm)）的第五次重大修改

2.  支持 Html5 的浏览器包括[Firefox](http://baike.baidu.com/view/3279.htm)（火狐浏览器），[IE9](http://baike.baidu.com/view/2298486.htm)及其更高版本，[Chrome](http://baike.baidu.com/view/1835504.htm)（谷歌浏览器），[Safari](http://baike.baidu.com/view/110484.htm)，Opera 等；国内的傲游浏览器（Maxthon），以及基于 IE 或[Chromium](http://baike.baidu.com/view/404073.htm)（Chrome 的工程版或称实验版）所推出的[360 浏览器](http://baike.baidu.com/view/1949679.htm)、[搜狗浏览器](http://baike.baidu.com/view/2083809.htm)、[QQ 浏览器](http://baike.baidu.com/view/2610930.htm)、[猎豹浏览器](http://baike.baidu.com/view/8467425.htm)等国产浏览器同样具备支持 HTML5 的能力

3. HTML5 的设计目的是为了在移动设备上支持多媒体。新的语法特征被引进以支持这一点，如 video、audio 和 canvas 标记。HTML5 还引进了新的功能，可以真正改变用户与文档的交互方式

4.  增加了新特性：语义特性，本地存储特性，设备兼容特性，连接特性，网页[多媒体](http://baike.baidu.com/view/3323.htm)特性，三维、图形及特效特性，性能与集成特性，CSS3 特性

5.  相比之前的进步：取消了一些过时的[HTML4](http://baike.baidu.com/view/1187297.htm)标记，将内容和展示分离，一些全新的表单输入对象，全新的，更合理的 Tag，本地数据库，Canvas 对象，浏览器中的真正程序，Html5 取代 Flash 在移动设备的地位

6.  优点：

a)  提高可用性和改进用户的友好体验；

b)  有几个新的标签，这将有助于开发人员定义重要的内容；

c)  可以给站点带来更多的多媒体元素(视频和音频)；

d)  可以很好的替代 FLASH 和 Silverlight；

e)  当涉及到网站的抓取和索引的时候，对于[SEO](http://baike.baidu.com/view/1047.htm)很友好；

f)  将被大量应用于移动应用程序和游戏；

g)  可移植性好。

7.  缺点：该标准并未能很好的被 Pc 端浏览器所支持。因新标签的引入，各浏览器之间将缺少一种统一的数据描述格式，造成用户体验不佳。

8.  未来趋势

a)  移动优先

游戏开发者领衔“主演”

### 简单概括

1. H5 即是 HTML 的一个最新的版本，是 html 语言的第五次重大修改--版本，也是 web 的一个标准。

2. 支持：所有的主流浏览器都支持 h5.（chrome,firefox,safari。。。）。IE9 及以上支持 h5(有选择的支持，并不会全部支持),但是 ie8 及以下不支持 h5.

3. 在之前的基础之上新增了一些内容：新语义标签、智能表单、多媒体标签
   结合 CSS3 中的内容如：圆角、动画、过渡等效果，提高用户的体验。

4. 新增了 javascript 的 api，使得操作 dom 更加的方便

5. 还增加了与硬件结合的功能：定位、重力感应、硬件访问等功能

6. 改变了用户与文档的交互方式：多媒体：video audio canvas

7. 通常所说的 H5：HTML5 + CSS3 + JavaScript;组合而成的一个应用开发平台

8. 相对于 h4:

   1. 进步：抛弃了一些不合理不常用的标记和属性

   2. 新增了一些标记和属性--表单

   3. 从代码角度而言，h5 的网页结构代码更简洁。

9. w3c 文档：[HTML5 简介 (w3school.com.cn)](https://www.w3school.com.cn/html/html5_intro.asp)

## HTML4 和 HTML5 编写模板

html:5 +tab

```html
<!--html:5 +tab-->
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
</body>
</head>
<body>

</body>
</html>
```

html:xt +tab:XHTML 过渡型文档类型

```html
<!--html:xt +tab:XHTML过渡型文档类型-->
<!--：网址规范的解析的规则  transitional：过渡-->
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
	<head>
		<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
		<title>Document</title>
	</head>
	<body></body>
</html>
```

html:4s +tab

```html
<!--html:4s +tab-->
<!--strict:严格：完全按照h4的请求进行解析-->
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html lang="en">
	<head>
		<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
		<title>Document</title>
	</head>
	<body></body>
</html>
```

## HTML4 和 HTML5 相比

语法规范

html:4s&4t
html:xt
html:5&!
更加简洁
更加宽松

兼容和语义化

语义化
标签的语义化
header
footer
nav
aside
progress
兼容
引入一个 js 文件，当支持 H5 的时候不引入此文件，不支持的时候引入
快捷键：ccie6
