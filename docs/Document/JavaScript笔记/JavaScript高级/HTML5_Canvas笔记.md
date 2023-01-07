# HTML5_Canvas笔记

本文章参考文章：[学习 HTML5 Canvas 这一篇文章就够了 | 菜鸟教程 (runoob.com)](https://www.runoob.com/w3cnote/html5-canvas-intro.html)

**canvas练习项目**：[muyaCode/canvas_study: canvas学习 (github.com)](https://github.com/muyaCode/canvas_study)

## 相关文档工具

**MDN的Canvas文档**：

- HTML的canvas标签的使用：[HTMLCanvasElement - Web API 接口参考 | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLCanvasElement)

- CanvasAPI：[Canvas - Web API 接口参考 | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API)

**菜鸟教程的Canvas文档工具**：

- HTML的canvas标签支持的HTML的`全局属性`和`事件属性`文档：[HTML canvas 标签 | 菜鸟教程 (runoob.com)](https://www.runoob.com/tags/tag-canvas.html)

- HTML5 Canvas使用例子文档：[HTML5 Canvas | 菜鸟教程 (runoob.com)](https://m.runoob.com/html/html5-canvas.html)

- HTML canvas画布API属性和方法文档：[HTML 画布 | 菜鸟教程 (runoob.com)](https://www.runoob.com/tags/ref-canvas.html)

- **菜鸟工具**：[Canvas 使用 JavaScript 来绘制图形 | 菜鸟工具 (runoob.com)](https://c.runoob.com/codedemo/102/)

**w3cshool的Canvas文档**：

- HTML的canvas标签：[HTML canvas 标签元素 (w3school.com.cn)](https://www.w3school.com.cn/tags/tag_canvas.asp)

- HTML Canvas 参考手册：[HTML Canvas 参考手册 (w3school.com.cn)](https://www.w3school.com.cn/tags/html_ref_canvas.asp)

**教程文档**：

- 语雀书籍教程：<https://www.yuque.com/airing/canvas>

- caibaojian网站收集的W3school教程：
  
  - [Canvas教程 · W3school教程 (caibaojian.com)](http://caibaojian.com/w3c/sitemap/canvas.html)
  
  - <http://caibaojian.com/w3c/html5/html5_ref_canvas.html>

**所有图形线条的练习教程**：[Canvas 练习教程 - 简单教程，简单编程 (twle.cn)](https://www.twle.cn/l/yufei/canvas/canvas-basic-index.html)

## 什么是Canvas

### 1.什么是Canvas

> canvas 最早由Apple苹果公司引入WebKit开源的浏览器引擎，用于Mac OS X 的 Dashboard功能工具，后来又在Safari浏览器和Google Chrome浏览器被实现。
> 基于 Gecko 1.8的浏览器，比如 Firefox 1.5，同样支持canvas元素。  
> `<canvas>` 标签元素是WhatWG Web applications 1.0规范的一部分，也包含于HTML 5中。

### 2.HTML 5的Canvas

canvas是HTML5新增标签

> Canvas API（画布）是在[HTML5](https://baike.baidu.com/item/HTML5/4234903?fromModule=lemma_inlink)中新增的标签用于在网页实时生成图像，并且可以操作图像内容，基本上它是一个可以用JavaScript操作的位图（bitmap）。
> Canvas 对象表示一个 HTML 画布元素  `<canvas>`。它没有自己的行为，但是定义了一个 WebAPI 支持脚本化客户端绘图操作。
> —— 百度百科

HTML5 的 canvas 元素使用 JavaScript 在网页上绘制图像。

画布是一个矩形区域，您可以控制其每一像素。

canvas 拥有多种绘制路径、矩形、圆形、字符以及添加图像的方法。

::: danger HTML5的canvas元素的兼容性
Internet Explorer 9、Firefox、Opera、Chrome 和 Safari 支持 `<canvas>` 标签的属性及方法。
**注意**：Internet Explorer 8 及更早的IE版本不支持 `<canvas>` 元素。
:::

::: warning canvas的标准

- 最新标准：[HTML Standard (whatwg.org)](https://html.spec.whatwg.org/multipage/)
- 稳定版本的标准：[HTML Canvas 2D Context](https://www.w3.org/TR/2013/CR-2dcontext-20130806/)

:::

## Canvas的应用领域

- **游戏开发**：canvas在基于Web的图像显示方面比Flash更加立体、更加精巧，canvas游戏在流畅度和跨平台方面更牛。
  
  - [25 超棒的 HTML5 Canvas 游戏](http://www.oschina.net/news/20143/top-25-best-html5-canvas-games-you-love-to-play)

- **可视化数据**：数据图表，比如百度的ECharts：[Apache ECharts](https://echarts.apache.org/zh/index.html)

- **banner广告**：Flash曾经辉煌的时代，智能手机还未曾出现。现在以及未来的智能机时代，HTML5技术能够在banner广告上发挥巨大作用，用Canvas实现动态的广告效果再合适不过。

- **未来 => 模拟器**：无论从视觉效果还是核心功能方面来说，模拟器产品可以完全由JavaScript来实现。

- **未来 => 远程计算机控制**：Canvas可以让开发者更好地实现基于Web的数据传输，构建一个完美的可视化控制界面。

- **未来 => 图形编辑器**：Photoshop图形编辑器将能够100%基于Web实现。

- **其他可嵌入网站的内容(多用于活动页面、特效)**：类似图表、音频、视频，还有许多元素能够更好地与Web融合，并且不需要任何插件。

- **完整的canvas移动化应用**

## Canvas入门

### 1.创建Canvas元素

向 HTML5 页面创建添加 canvas 元素。

规定元素的 id、宽度和高度：

```html
<canvas id="myCanvas" width="200" height="100"></canvas>
```

### 2.Canvas坐标系

原点（0, 0）

x轴

y轴

![location.jpg](.\img\location.jpg)

### 3.通过JavaScript来绘制

```javascript
/*获取元素*/
var myCanvas = document.querySelector('#myCanvas');
/*获取绘图工具*/
var context = myCanvas.getContext('2d');
/*设置绘图的起始位置*/
context.moveTo(100,100);
/*绘制路径*/
context.lineTo(200,200);
/*描边*/
context.stroke();
```

### 4.完整代码

- `display: block`可以把`<canvas></canvas>`变成块级元素，从而可以通过`margin: 0 auto;`设置为水平居中

- canvas有显示的大小，还有内里分辨率的大小，所以不能在css中设置canvas元素的大小

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        canvas{
            border: 1px solid #ccc;
            /*不建议在 样式设置尺寸*/
            /*width: 600px;
            height: 400px;*/
            display: block;
            margin: 0 auto;
        }
    </style>
</head>
<body>
<!--1.准备画布-->
<!--1.1 画布是白色的 而且默认300*150-->
<!--1.2 设置画布的大小  width="600" height="400" -->
<canvas id="myCanvas" width="600" height="400" ></canvas>
<!--2.准备绘制工具-->
<!--3.利用工具绘图-->
<script>
    /*1.获取元素*/
    // var myCanvas = document.querySelector('canvas');
    var myCanvas = document.querySelector('#myCanvas');
    // js方法设置宽高属性
    // myCanvas.width = "600";
    // myCanvas.height = "400";
    /*2.获取上下文 绘制工具箱 */
    var ctx = myCanvas.getContext('2d'); /*web gl 绘制3d效果的网页技术*/
    /*3.移动画笔*/
    ctx.moveTo(100,100);
    /*4.绘制直线 (轨迹，绘制路径)*/
    ctx.lineTo(200,100);
    /*5.描边*/
    ctx.stroke();
</script>
</body>
</html>
```

## Canvas的概念详解和基本使用

### 1.图形绘制

需要理解些概念：

- 路径的概念

- 路径的绘制
  
  - 描边 stroke()
  - 填充 fill()  
  - ![path.jpg](.\img\path.jpg)
  
  闭合路径
  
  - 手动闭合
  - 程序闭合 closePath()

- 填充规则(非零环绕)  
  
  - ![zero.jpg](.\img\zero.jpg)
  
  - ![非零环绕规则.jpg](.\img\非零环绕规则.jpg)

- 开启新的路径 beginPath()

### 2.canvas.getContext("2d");的属性和方法

- canvas标签getContext的使用文档：[HTMLCanvasElement.getContext() - Web API 接口参考 | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLCanvasElement/getContext)

- getContext("2d")的属性和方法参考文档(下列属性和方法参考的文档1)：[HTML 画布 | 菜鸟教程 (runoob.com)](https://www.runoob.com/tags/ref-canvas.html)

- **canvas.getContext("2d")的使用文档(下列属性和方法参考的文档2)**：[CanvasRenderingContext2D - Web API 接口参考 | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D)

#### 颜色、样式和阴影

| 属性                                                                     | 描述                    |
| ---------------------------------------------------------------------- | --------------------- |
| [fillStyle](https://www.runoob.com/tags/canvas-fillstyle.html)         | 设置或返回用于填充绘画的颜色、渐变或模式。 |
| [strokeStyle](https://www.runoob.com/tags/canvas-strokestyle.html)     | 设置或返回用于笔触的颜色、渐变或模式。   |
| [shadowColor](https://www.runoob.com/tags/canvas-shadowcolor.html)     | 设置或返回用于阴影的颜色。         |
| [shadowBlur](https://www.runoob.com/tags/canvas-shadowblur.html)       | 设置或返回用于阴影的模糊级别。       |
| [shadowOffsetX](https://www.runoob.com/tags/canvas-shadowoffsetx.html) | 设置或返回阴影与形状的水平距离。      |
| [shadowOffsetY](https://www.runoob.com/tags/canvas-shadowoffsety.html) | 设置或返回阴影与形状的垂直距离。      |

| 方法                                                                                     | 描述                    |
| -------------------------------------------------------------------------------------- | --------------------- |
| [createLinearGradient()](https://www.runoob.com/tags/canvas-createlineargradient.html) | 创建线性渐变（用在画布内容上）。      |
| [createPattern()](https://www.runoob.com/tags/canvas-createpattern.html)               | 在指定的方向上重复指定的元素。       |
| [createRadialGradient()](https://www.runoob.com/tags/canvas-createradialgradient.html) | 创建放射状/环形的渐变（用在画布内容上）。 |
| [addColorStop()](https://www.runoob.com/tags/canvas-addcolorstop.html)                 | 规定渐变对象中的颜色和停止位置。      |

#### 虚线

| 方法                                                                                                             | 描述          |
| -------------------------------------------------------------------------------------------------------------- | ----------- |
| [setLineDash(segments)](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/setLineDash) | 填充线时使用虚线模式  |
| [getLineDash()](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/getLineDash)         | 获取当前虚线样式的方法 |

偏移

| 属性                                                                                                         | 说明                                                    |
| ---------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| [lineDashOffset](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/lineDashOffset) | ctx.lineDashOffset = -20;<br/>如果是正的值 往后偏移，如果是负的值 往前偏移 |

#### 线条样式

| 属性                                                               | 描述                    |
| ---------------------------------------------------------------- | --------------------- |
| [lineCap](https://www.runoob.com/tags/canvas-linecap.html)       | 设置或返回线条的结束端点样式。       |
| [lineJoin](https://www.runoob.com/tags/canvas-linejoin.html)     | 设置或返回两条线相交时，所创建的拐角类型。 |
| [lineWidth](https://www.runoob.com/tags/canvas-linewidth.html)   | 设置或返回当前的线条宽度。         |
| [miterLimit](https://www.runoob.com/tags/canvas-miterlimit.html) | 设置或返回最大斜接长度。          |

#### 矩形

| 方法                                                                 | 描述              |
| ------------------------------------------------------------------ | --------------- |
| [rect()](https://www.runoob.com/tags/canvas-rect.html)             | 创建矩形。           |
| [fillRect()](https://www.runoob.com/tags/canvas-fillrect.html)     | 绘制"被填充"的矩形。     |
| [strokeRect()](https://www.runoob.com/tags/canvas-strokerect.html) | 绘制矩形（无填充）。      |
| [clearRect()](https://www.runoob.com/tags/canvas-clearrect.html)   | 在给定的矩形内清除指定的像素。 |

#### 路径

| 方法                                                                             | 描述                                 |
| ------------------------------------------------------------------------------ | ---------------------------------- |
| [fill()](https://www.runoob.com/tags/canvas-fill.html)                         | 填充当前绘图（路径）。                        |
| [stroke()](https://www.runoob.com/tags/canvas-stroke.html)                     | 绘制已定义的路径。                          |
| [beginPath()](https://www.runoob.com/tags/canvas-beginpath.html)               | 起始一条路径，或重置当前路径。                    |
| [moveTo()](https://www.runoob.com/tags/canvas-moveto.html)                     | 把路径移动到画布中的指定点，不创建线条。               |
| [closePath()](https://www.runoob.com/tags/canvas-closepath.html)               | 创建从当前点回到起始点的路径。                    |
| [lineTo()](https://www.runoob.com/tags/canvas-lineto.html)                     | 添加一个新点，然后在画布中创建从该点到最后指定点的线条。       |
| [clip()](https://www.runoob.com/tags/canvas-clip.html)                         | 从原始画布剪切任意形状和尺寸的区域。                 |
| [quadraticCurveTo()](https://www.runoob.com/tags/canvas-quadraticcurveto.html) | 创建二次贝塞尔曲线。                         |
| [bezierCurveTo()](https://www.runoob.com/tags/canvas-beziercurveto.html)       | 创建三次贝塞尔曲线。                         |
| [arc()](https://www.runoob.com/tags/canvas-arc.html)                           | 创建弧/曲线（用于创建圆形或部分圆）。                |
| [arcTo()](https://www.runoob.com/tags/canvas-arcto.html)                       | 创建两切线之间的弧/曲线。                      |
| [isPointInPath()](https://www.runoob.com/tags/canvas-ispointinpath.html)       | 如果指定的点位于当前路径中，则返回 true，否则返回 false。 |

#### 转换

| 方法                                                                     | 描述                             |
| ---------------------------------------------------------------------- | ------------------------------ |
| [scale()](https://www.runoob.com/tags/canvas-scale.html)               | 缩放当前绘图至更大或更小。                  |
| [rotate()](https://www.runoob.com/tags/canvas-rotate.html)             | 旋转当前绘图。                        |
| [translate()](https://www.runoob.com/tags/canvas-translate.html)       | 重新映射画布上的 (0,0) 位置。             |
| [transform()](https://www.runoob.com/tags/canvas-transform.html)       | 替换绘图的当前转换矩阵。                   |
| [setTransform()](https://www.runoob.com/tags/canvas-settransform.html) | 将当前转换重置为单位矩阵。然后运行 transform()。 |

#### 文本

| 属性                                                                   | 描述                    |
| -------------------------------------------------------------------- | --------------------- |
| [font](https://www.runoob.com/tags/canvas-font.html)                 | 设置或返回文本内容的当前字体属性。     |
| [textAlign](https://www.runoob.com/tags/canvas-textalign.html)       | 设置或返回文本内容的当前对齐方式。     |
| [textBaseline](https://www.runoob.com/tags/canvas-textbaseline.html) | 设置或返回在绘制文本时使用的当前文本基线。 |

| 方法                                                                   | 描述              |
| -------------------------------------------------------------------- | --------------- |
| [fillText()](https://www.runoob.com/tags/canvas-filltext.html)       | 在画布上绘制"被填充的"文本。 |
| [strokeText()](https://www.runoob.com/tags/canvas-stroketext.html)   | 在画布上绘制文本（无填充）。  |
| [measureText()](https://www.runoob.com/tags/canvas-measuretext.html) | 返回包含指定文本宽度的对象。  |

#### 图像绘制

| 方法                                                               | 描述              |
| ---------------------------------------------------------------- | --------------- |
| [drawImage()](https://www.runoob.com/tags/canvas-drawimage.html) | 向画布上绘制图像、画布或视频。 |

#### 像素操作

| 属性                                                                 | 描述                               |
| ------------------------------------------------------------------ | -------------------------------- |
| [width](https://www.runoob.com/tags/canvas-imagedata-width.html)   | 返回 ImageData 对象的宽度。              |
| [height](https://www.runoob.com/tags/canvas-imagedata-height.html) | 返回 ImageData 对象的高度。              |
| [data](https://www.runoob.com/tags/canvas-imagedata-data.html)     | 返回一个对象，其包含指定的 ImageData 对象的图像数据。 |

| 方法                                                                           | 描述                                  |
| ---------------------------------------------------------------------------- | ----------------------------------- |
| [createImageData()](https://www.runoob.com/tags/canvas-createimagedata.html) | 创建新的、空白的 ImageData 对象。              |
| [getImageData()](https://www.runoob.com/tags/canvas-getimagedata.html)       | 返回 ImageData 对象，该对象为画布上指定的矩形复制像素数据。 |
| [putImageData()](https://www.runoob.com/tags/canvas-putimagedata.html)       | 把图像数据（从指定的 ImageData 对象）放回画布上。      |

#### 合成

| 属性                                                                                           | 描述                     |
| -------------------------------------------------------------------------------------------- | ---------------------- |
| [globalAlpha](https://www.runoob.com/tags/canvas-globalalpha.html)                           | 设置或返回绘图的当前 alpha 或透明值。 |
| [globalCompositeOperation](https://www.runoob.com/tags/canvas-globalcompositeoperation.html) | 设置或返回新图像如何绘制到已有的图像上。   |

#### 其他

| 方法            | 描述               |
| ------------- | ---------------- |
| save()        | 保存当前环境的状态。       |
| restore()     | 返回之前保存过的路径状态和属性。 |
| createEvent() |                  |
| getContext()  |                  |
| toDataURL()   |                  |

### 3.练习例子

#### 两条平行线，线条的不饱和样式问题 的解决

- 对齐的点是线的中心位置  会把线分成两个0.5px 显示的是会不饱和增加宽度

- 解决方案：前后移动0.5px

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>两条平行线，线条的不饱和样式问题 的解决</title>
    <style>
        canvas {
            border: 1px solid #ccc;
            display: block;
            margin: 0 auto;
        }
    </style>
</head>
<body>
<canvas width="600" height="400"></canvas>
<script>
    var myCanvas = document.querySelector('canvas');
    var ctx = myCanvas.getContext('2d');

    /*画平行线*/
    // 饱和样式：前后移动0.5px
    ctx.moveTo(100,100.5);
    ctx.lineTo(300,100.5);
    // 不饱和样式
    ctx.moveTo(100,200);
    ctx.lineTo(300,200);

    /*绘制上面已定义的路径：把通过 moveTo() 和 lineTo() 方法定义的路径绘制在画布上*/
    ctx.stroke();


    /*关于线条的问题*/
    /*1.默认的宽度是多少   1px*/
    /*2.默认的颜色是什么   黑色*/
    /*产生原因  对齐的点是线的中心位置  会把线分成两个0.5px 显示的是会不饱和增加宽度*/
    /*解决方案  前后移动0.5px */

</script>
</body>
</html>
```

#### 绘制三个不一样的路径

想绘制多个路径而不被覆盖，使用beginPath()方法开启新路径，继续绘制

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>绘制三个不一样的路径</title>
    <style>
        canvas {
            border: 1px solid #ccc;
            display: block;
            margin: 0 auto;
        }
    </style>
</head>
<body>
<canvas width="600" height="400"></canvas>
<script>
    var myCanvas = document.querySelector('canvas');
    var ctx = myCanvas.getContext('2d');

    /*画平行线*/

    ctx.beginPath();/*开启新路径*/
    /*蓝色  10px*/
    ctx.moveTo(100,100);
    ctx.lineTo(300,100);
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 10;
    /*绘制上面已定义的路径：把通过 moveTo() 和 lineTo() 方法定义的路径绘制在画布上*/
    ctx.stroke();

    ctx.beginPath();/*开启新路径*/
    /*红色 20px*/
    ctx.moveTo(100,200);
    ctx.lineTo(300,200);
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 20;
    /*绘制上面已定义的路径：把通过 moveTo() 和 lineTo() 方法定义的路径绘制在画布上*/
    ctx.stroke();

    ctx.beginPath();/*开启新路径*/
    /*绿色 30px*/
    ctx.moveTo(100,300);
    ctx.lineTo(300,300);
    ctx.strokeStyle = 'green';
    ctx.lineWidth = 30;
    /*绘制上面已定义的路径：把通过 moveTo() 和 lineTo() 方法定义的路径绘制在画布上*/
    ctx.stroke();

    // 想绘制多个路径而不被覆盖，使用beginPath()方法开启新路径，继续绘制

</script>
</body>
</html>
```

#### 绘制三角形-填充和不填充

问题：三角形的闭合路径，路径的宽度，会造成第三条线的闭合会出现缺口

解决：使用canvas的自动闭合`closePath()`方法，替代第三条路径自动闭合

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>绘制三角形-填充和不填充</title>
    <style>
        canvas {
            border: 1px solid #ccc;
            display: block;
            margin: 0 auto;
        }
    </style>
</head>
<body>
<canvas width="600" height="400"></canvas>
<script>
    var myCanvas = document.querySelector('canvas');
    var ctx = myCanvas.getContext('2d');

    /*1.绘制一个三角形*/
    ctx.moveTo(100,100);
    ctx.lineTo(200,100);
    ctx.lineTo(200,200);
    /*起始点和lineTo的结束点无法完全闭合缺角，所以使用下面的关闭路径方法*/
    // ctx.lineTo(100,100);
    /*使用canvas的自动闭合：关闭路径*/
    ctx.closePath();

    // 路径宽度
    ctx.lineWidth = 10;
    /*2.绘制路径(描边)*/
    ctx.stroke();
    /*3.绘制形状并填充*/
    // ctx.fill();
</script>
</body>
</html>l();
</script>
</body>
</html>
```

#### 绘制镂空的正方形：非零环绕规则☝️

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>绘制镂空的正方形</title>
    <style>
        canvas {
            border: 1px solid #ccc;
            display: block;
            margin: 0 auto;
        }
    </style>
</head>
<body>
<canvas width="600" height="400"></canvas>
<script>
    var myCanvas = document.querySelector('canvas');
    var ctx = myCanvas.getContext('2d');

    /*1.绘制两个正方形 一大200一小100 套在一起*/
    ctx.moveTo(100,100);
    ctx.lineTo(300,100);
    ctx.lineTo(300,300);
    ctx.lineTo(100,300);
    ctx.closePath(); // 创建从当前点回到起始点的路径

    ctx.moveTo(150,150);
    ctx.lineTo(150,250);
    ctx.lineTo(250,250);
    ctx.lineTo(250,150);
    ctx.closePath(); // 创建从当前点回到起始点的路径

    // 绘制描边路径
    // ctx.stroke();
    // 填充样式
    ctx.fillStyle = 'red';
    /*2.绘制填充*/
    ctx.fill();

    /*在填充的时候回遵循非零环绕规则*/
    // 顺时针和逆时针来绘制外图形和内图形
</script>
</body>
</html>
```

---

画笔的状态

- lineWidth：线宽，默认1px
- lineCap：线末端类型：(butt默认)、round、square
- lineJoin：相交线的拐点 miter(默认)、round、bevel
- strokeStyle：线的颜色
- fillStyle：填充颜色
- setLineDash()：设置虚线
- getLineDash()：获取虚线宽度集合
- lineDashOffset：设置虚线偏移量（负值向右偏移）

#### 绘制三个不同颜色|线的两端样式|拐点形状的箭头

```html
<!DOCTYPE html>
<html lang="en">
 <head>
  <meta charset="UTF-8" />
  <title>绘制三个不同颜色|线的两端样式|拐点形状的箭头</title>
  <style>
   canvas {
    border: 1px solid #ccc;
                display: block;
                margin: 0 auto;
   }
  </style>
 </head>
 <body>
  <canvas width="600" height="400"></canvas>
  <script>
   var myCanvas = document.querySelector("canvas");
   var ctx = myCanvas.getContext("2d");

   /*画平行线*/
            // 第一个蓝色箭头
   ctx.beginPath();
   ctx.moveTo(100, 100);
   ctx.lineTo(200, 20);
   ctx.lineTo(300, 100);
   ctx.strokeStyle = "blue"; // 路径笔触颜色、渐变或模式：蓝色
   ctx.lineWidth = 10;
   ctx.lineCap = "butt"; // 线条的结束端点样式：平直的边缘(默认)
   ctx.lineJoin = "miter"; // 拐角类型：尖角(默认)
   ctx.stroke();

            // 第二个红色箭头
   ctx.beginPath();
   ctx.moveTo(100, 200);
   ctx.lineTo(200, 120);
   ctx.lineTo(300, 200);
   ctx.strokeStyle = "red"; // 路径笔触颜色、渐变或模式：红色
   ctx.lineWidth = 20;
   ctx.lineCap = "square"; // 线条的结束端点样式：正方形
   ctx.lineJoin = "bevel"; // 拐角类型：斜角
   ctx.stroke();

            // 第三个绿色箭头
   ctx.beginPath();
   ctx.moveTo(100, 300);
   ctx.lineTo(200, 220);
   ctx.lineTo(300, 300);
   ctx.strokeStyle = "green"; // 路径笔触颜色、渐变或模式：绿色
   ctx.lineWidth = 30;
   ctx.lineCap = "round"; // 线条的结束端点样式：圆形
   ctx.lineJoin = "round"; // 拐角类型：圆形
   ctx.stroke();
  </script>
 </body>
</html>
```

#### 绘制虚线

getLineDash()方法绘制虚线

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        canvas {
            border: 1px solid #ccc;
            display: block;
            margin: 0 auto;
        }
    </style>
</head>
<body>
<canvas width="600" height="400"></canvas>
<script>
    var myCanvas = document.querySelector('canvas');
    var ctx = myCanvas.getContext('2d');

    /*画线*/
    ctx.moveTo(100,100.5);
    ctx.lineTo(300,100.5);
    /*[5,10] 数组是用来描述你的排列方式的*/
    ctx.setLineDash([20]);
    /*获取虚线的排列方式 获取的是不重复的那一段的排列方式*/
    console.log(ctx.getLineDash());

    /*如果是正的值 往后偏移*/
    /*如果是负的值 往前偏移*/
    // ctx.lineDashOffset = -20;

    ctx.stroke();
</script>
</body>
</html>
```

#### 绘制渐变的矩形

```html
<!DOCTYPE html>
<html lang="en">
 <head>
  <meta charset="UTF-8" />
  <title>08-绘制一个从黑到白的渐变矩形</title>
  <style>
   canvas {
    border: 1px solid #ccc;
    display: block;
    margin: 0 auto;
   }
  </style>
 </head>
 <body>
  <canvas width="600" height="400"></canvas>
  <script>
   var myCanvas = document.querySelector("canvas");
   var ctx = myCanvas.getContext("2d");

   /*绘制一个矩形*/

   /*线是由点构成的：用线绘制矩形*/
   ctx.lineWidth = 30;
   for (var i = 0; i < 255; i++) {
    ctx.beginPath();
    ctx.moveTo(100 + i - 1, 100);
    ctx.lineTo(100 + i, 100);
    ctx.strokeStyle = "rgb(" + i + ",0,0)"; // 渐变
    ctx.stroke();
   }
  </script>
 </body>
</html>
```

#### 绘制网格

```html
<!DOCTYPE html>
<html lang="en">
 <head>
  <meta charset="UTF-8" />
  <title>09-绘制网格</title>
  <style>
   canvas {
    border: 1px solid #ccc;
    display: block;
    margin: 0 auto;
   }
  </style>
 </head>
 <body>
  <canvas width="600" height="400"></canvas>
  <script>
   var myCanvas = document.querySelector("canvas");
   var ctx = myCanvas.getContext("2d");

   /*1.绘制网格*/
   /*2.网格的大小*/
   var gridSize = 10;
   var canvasHeight = ctx.canvas.height;
   var canvasWidth = ctx.canvas.width;

   // 打印数据
   // var canvasHeight = myCanvas.height;
   // var canvasWidth = myCanvas.width;
   // console.log(canvasHeight);
   // console.log(canvasWidth);
   // console.log(ctx.canvas.width);
   // console.log(ctx.canvas.height);

   /*3.画多少条X轴方向的线-横线的条数、画布高度*/
   var xLineTotal = Math.floor(canvasHeight / gridSize); 
   // 画横线
   for (var i = 0; i <= xLineTotal; i++) {
    ctx.beginPath();
    ctx.moveTo(0, i * gridSize - 0.5);
    ctx.lineTo(canvasWidth, i * gridSize - 0.5);
    ctx.strokeStyle = "#eee";
    ctx.stroke();
   }

   /*4.画多少条Y轴方向的线*/
   var yLineTotal = Math.floor(canvasWidth / gridSize);
   // 画竖线
   for (var i = 0; i <= yLineTotal; i++) {
    ctx.beginPath();
    ctx.moveTo(i * gridSize - 0.5, 0);
    ctx.lineTo(i * gridSize - 0.5, canvasHeight);
    ctx.strokeStyle = "#eee";
    ctx.stroke();
   }
   /*5.遍历的形式去画*/
  </script>
 </body>
</html>
```

#### 绘制坐标系

```html
<!DOCTYPE html>
<html lang="en">
 <head>
  <meta charset="UTF-8" />
  <title>10-绘制坐标系</title>
  <style>
   canvas {
    border: 1px solid #ccc;
    display: block;
    margin: 0 auto;
   }
  </style>
 </head>
 <body>
  <canvas width="600" height="400"></canvas>
  <script>
   var myCanvas = document.querySelector("canvas");
   var ctx = myCanvas.getContext("2d");

   /*1.绘制坐标系*/
   /*2.确定原点*/
   /*3.确定距离画布旁边的距离*/
   /*4.确定坐标轴的长度*/
   /*5.确定箭头的大小  是个等腰三角形  10 */
   /*6.绘制箭头填充*/

   var space = 20; // 间距
   var arrowSize = 10; // 箭头尺寸大小

   /*计算原点*/
   var canvasWidth = ctx.canvas.width;
   var canvasHeight = ctx.canvas.height;

   var x0 = space;
   var y0 = canvasHeight - space;

   /*绘制x轴*/
   ctx.beginPath();
   ctx.moveTo(x0, y0);
   ctx.lineTo(canvasWidth - space, y0);
   /*x轴箭头绘制*/
   ctx.lineTo(canvasWidth - space - arrowSize, y0 + arrowSize / 2);
   ctx.lineTo(canvasWidth - space - arrowSize, y0 - arrowSize / 2);
   ctx.lineTo(canvasWidth - space, y0);
   ctx.fill();
   ctx.stroke();

   /*绘制y轴*/
   ctx.beginPath();
   ctx.moveTo(x0, y0);
   ctx.lineTo(space, space);
   /*y轴箭头绘制*/
   ctx.lineTo(space + arrowSize / 2, space + arrowSize);
   ctx.lineTo(space - arrowSize / 2, space + arrowSize);
   ctx.lineTo(space, space);
   ctx.fill();
   ctx.stroke();
  </script>
 </body>
</html>
```

#### 绘制正方形的点

```html
<!DOCTYPE html>
<html lang="en">
 <head>
  <meta charset="UTF-8" />
  <title>11-绘制正方形的点</title>
  <style>
   canvas {
    border: 1px solid #ccc;
    display: block;
    margin: 0 auto;
   }
  </style>
 </head>
 <body>
  <canvas width="600" height="400"></canvas>
  <script>
   var myCanvas = document.querySelector("canvas");
   var ctx = myCanvas.getContext("2d");

   /*1.绘制点*/
   /*2.点的尺寸*/
   /*3.以坐标中心绘制点*/

   // 点的坐标
   var coordinate = {
    x: 100,
    y: 100,
   };
   // 点的尺寸
   var dottedSize = 10;
   // 以坐标中心绘制点
   ctx.moveTo(coordinate.x - dottedSize / 2, coordinate.y - dottedSize / 2);
   ctx.lineTo(coordinate.x + dottedSize / 2, coordinate.y - dottedSize / 2);
   ctx.lineTo(coordinate.x + dottedSize / 2, coordinate.y + dottedSize / 2);
   ctx.lineTo(coordinate.x - dottedSize / 2, coordinate.y + dottedSize / 2);
   ctx.closePath();
   ctx.fill();
  </script>
 </body>
</html>
```

#### 结合 - 网格、坐标系、点的绘制案例：绘制折线图

```html
<!DOCTYPE html>
<html lang="en">
 <head>
  <meta charset="UTF-8" />
  <title>12-绘制折线图</title>
  <style>
   canvas {
    border: 1px solid #ccc;
    display: block;
    margin: 0 auto;
   }
  </style>
 </head>
 <body>
  <canvas width="600" height="400"></canvas>
  <script>
   /*1.构造函数*/
   var LineChart = function (ctx) {
    // 获取绘图工具
    this.ctx = ctx || document.querySelector("canvas").getContext("2d");
    // 画布的大小
    this.canvasWidth = this.ctx.canvas.width;
    this.canvasHeight = this.ctx.canvas.height;
    // 网格的大小
    this.gridSize = 10;
    // 坐标系的间距
    this.space = 20;
    // 坐标原点
    this.x0 = this.space;
    this.y0 = this.canvasHeight - this.space;
    // 箭头的大小
    this.arrowSize = 10;
    // 绘制点
    this.dottedSize = 6;
    /*点的坐标 和数据有关系  数据可视化*/
   };
   /*2.行为方法*/
   LineChart.prototype.init = function (data) {
    this.drawGrid();
    this.drawAxis();
    this.drawDotted(data);
   };
   /*绘制网格*/
   LineChart.prototype.drawGrid = function () {
    // x方向的线
    var xLineTotal = Math.floor(this.canvasHeight / this.gridSize);
    this.ctx.strokeStyle = "#eee";
    for (var i = 0; i <= xLineTotal; i++) {
     this.ctx.beginPath();
     this.ctx.moveTo(0, i * this.gridSize - 0.5);
     this.ctx.lineTo(this.canvasWidth, i * this.gridSize - 0.5);
     this.ctx.stroke();
    }
    // y方向的线
    var yLineTotal = Math.floor(this.canvasWidth / this.gridSize);
    for (var i = 0; i <= yLineTotal; i++) {
     this.ctx.beginPath();
     this.ctx.moveTo(i * this.gridSize - 0.5, 0);
     this.ctx.lineTo(i * this.gridSize - 0.5, this.canvasHeight);
     this.ctx.stroke();
    }
   };
   /*绘制坐标系*/
   LineChart.prototype.drawAxis = function () {
    // X轴
    this.ctx.beginPath();
    this.ctx.strokeStyle = "#000";
    this.ctx.moveTo(this.x0, this.y0);
    this.ctx.lineTo(this.canvasWidth - this.space, this.y0);
    this.ctx.lineTo(
     this.canvasWidth - this.space - this.arrowSize,
     this.y0 + this.arrowSize / 2
    );
    this.ctx.lineTo(
     this.canvasWidth - this.space - this.arrowSize,
     this.y0 - this.arrowSize / 2
    );
    this.ctx.lineTo(this.canvasWidth - this.space, this.y0);
    this.ctx.stroke();
    this.ctx.fill();
    // Y轴
    this.ctx.beginPath();
    this.ctx.strokeStyle = "#000";
    this.ctx.moveTo(this.x0, this.y0);
    this.ctx.lineTo(this.space, this.space);
    this.ctx.lineTo(
     this.space + this.arrowSize / 2,
     this.space + this.arrowSize
    );
    this.ctx.lineTo(
     this.space - this.arrowSize / 2,
     this.space + this.arrowSize
    );
    this.ctx.lineTo(this.space, this.space);
    this.ctx.stroke();
    this.ctx.fill();
   };
   /*绘制所有点*/
   LineChart.prototype.drawDotted = function (data) {
    /*1.数据的坐标 需要转换 canvas坐标*/
    /*2.再进行点的绘制*/
    /*3.把线连起来*/
    var that = this;
    // 记录当前坐标
    var prevCanvasX = 0;
    var prevCanvasY = 0;
    data.forEach(function (item, i) {
     // x = 原点的坐标 + 数据的坐标
     // y = 原点的坐标 - 数据的坐标
     var canvasX = that.x0 + item.x;
     var canvasY = that.y0 - item.y;
     // 绘制点
     that.ctx.beginPath();
     that.ctx.moveTo(
      canvasX - that.dottedSize / 2,
      canvasY - that.dottedSize / 2
     );
     that.ctx.lineTo(
      canvasX + that.dottedSize / 2,
      canvasY - that.dottedSize / 2
     );
     that.ctx.lineTo(
      canvasX + that.dottedSize / 2,
      canvasY + that.dottedSize / 2
     );
     that.ctx.lineTo(
      canvasX - that.dottedSize / 2,
      canvasY + that.dottedSize / 2
     );
     that.ctx.closePath();
     that.ctx.fill();
     /*点的连线*/
     /*当时第一个点的时候 起点是 x0 y0*/
     /*当时不是第一个点的时候 起点是 上一个点*/
     if (i == 0) {
      that.ctx.beginPath();
      that.ctx.moveTo(that.x0, that.y0);
      that.ctx.lineTo(canvasX, canvasY);
      that.ctx.stroke();
     } else {
      /*上一个点*/
      that.ctx.beginPath();
      that.ctx.moveTo(prevCanvasX, prevCanvasY);
      that.ctx.lineTo(canvasX, canvasY);
      that.ctx.stroke();
     }
     // 记录当前的坐标，下一次要用
     prevCanvasX = canvasX;
     prevCanvasY = canvasY;
    });
   };
   /*3.初始化*/
   var data = [
    {
     x: 100,
     y: 120,
    },
    {
     x: 200,
     y: 160,
    },
    {
     x: 300,
     y: 240,
    },
    {
     x: 400,
     y: 120,
    },
    {
     x: 500,
     y: 80,
    },
   ];
   var lineChart = new LineChart();
   lineChart.init(data);
  </script>
 </body>
</html>
```

其他练习请看：**canvas练习项目**：[muyaCode/canvas_study: canvas学习 (github.com)](https://github.com/muyaCode/canvas_study)

## Canvas图形绘制

### 1.矩形绘制

- rect(x,y,w,h)：没有独立路径
- strokeRect(x,y,w,h)：有独立路径，不影响别的绘制
- fillRect(x,y,w,h)：有独立路径，不影响别的绘制
- clearRect(x,y,w,h)：擦除矩形区域

#### 绘制矩形

```html
<!DOCTYPE html>
<html lang="en">
 <head>
  <meta charset="UTF-8" />
  <title>绘制矩形</title>
  <style>
   canvas {
    border: 1px solid #ccc;
    display: block;
    margin: 0 auto;
   }
  </style>
 </head>
 <body>
  <canvas width="600" height="400"></canvas>
  <script>
   var myCanvas = document.querySelector("canvas");
   var ctx = myCanvas.getContext("2d");

   /*方法1：绘制矩形路径 不是独立路径*/
   // ctx.rect(100,100,200,100);
   // ctx.fillStyle = 'green';
   // ctx.stroke();
   // ctx.fill();

   /*方法2：绘制矩形  有自己的独立路径*/
   // ctx.strokeRect(100,100,200,100); // 描边矩形
   ctx.fillRect(100, 100, 200, 100); // 填充矩形

   /*清除矩形的内容*/
   // ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  </script>
 </body>
</html>
```

#### 绘制渐变颜色的矩形

3中方法渐变：

- 方法1：填充颜色属性：fillStyle = 'pink'|'#000'|'rgb()'|'rgba()'

- 方法2：使用一个渐变的createLinearGradient()方法填充矩形

- 方法3：css渐变

```html
<!DOCTYPE html>
<html lang="en">
 <head>
  <meta charset="UTF-8" />
  <title>14-绘制一个渐变颜色的矩形</title>
  <style>
   canvas {
    border: 1px solid #ccc;
    display: block;
    margin: 0 auto;
   }
   /* 方法3：css渐变 */
   /* .linearGradient {
    width: 400px;
    height: 100px;
    background-image: linear-gradient(to right, pink, blue);
   } */
  </style>
 </head>
 <body>
  <div class="linearGradient"></div>
  <canvas width="600" height="400"></canvas>
  <script>
   var myCanvas = document.querySelector("canvas");
   var ctx = myCanvas.getContext("2d");

   // pink---->blue
   // 回想线性渐变---->要素 方向  起始颜色 结束颜色
   // 通过两个点的坐标可以控制 渐变方向


   /*方法1：填充颜色属性：fillStyle = 'pink'|'#000'|'rgb()'|'rgba()' */

   /*方法2：使用一个渐变的createLinearGradient()方法填充矩形*/
   /*x0y0 起始点 x1y1 结束点  确定长度和方向*/
   var linearGradient = ctx.createLinearGradient(100, 100, 500, 400); // 创建一个渐变的方案
   // 添加渐变：渐变是有长度的
   linearGradient.addColorStop(0, "pink");
   //linearGradient.addColorStop(0.5,'red');
   linearGradient.addColorStop(1, "blue");

   ctx.fillStyle = linearGradient;
   // 填充矩形
   ctx.fillRect(100, 100, 400, 100);
  </script>
 </body>
</html>
```

### 2.圆弧绘制

arc() 方法文档：[HTML canvas arc() 方法 | 菜鸟教程 (runoob.com)](https://www.runoob.com/tags/canvas-arc.html)

arcTo() 方法文档：[HTML canvas arcTo() 方法 | 菜鸟教程 (runoob.com)](https://www.runoob.com/tags/canvas-arcto.html)

- 弧度概念
  
  - 1.什么是弧度  是一种长度的描述单位
  - 2.一个弧度怎么去描述  一个圆有多少个弧度  2 * π
  - 3.一弧度有多长  一个弧度一个半径的长度

- 弧度计算
  
  - 角度：一个圆是360度
  - 半径：已一个点为中心多长为放射半径
  - 周长：2 *π* r

- `arc()` 圆弧绘制方法
  
  - 语法：`context.arc(x,y,r,sAngle,eAngle,counterclockwise*);`
  
  - 参数值：

    | 参数               | 描述                                             |
    | ---------------- | ---------------------------------------------- |
    | x                | 圆的中心的 x 坐标（横坐标）。                               |
    | y                | 圆的中心的 y 坐标（纵坐标）。                               |
    | r                | 圆的半径。                                          |
    | sAngle           | 起始角（开始角度），以弧度计（弧的圆形的三点钟位置是 0 度）。               |
    | eAngle           | 结束角（结束角度），以弧度计。                                |
    | counterclockwise | 可选。应该逆时针还是顺时针绘图。false = 顺时针，true = 逆时针。默认false |

#### 理解曲线的绘制：三种线的绘制公式

```html
<!DOCTYPE html>
<html lang="en">
 <head>
  <meta charset="UTF-8" />
  <title>理解曲线的绘制</title>
  <style>
   canvas {
    border: 1px solid #ccc;
    display: block;
    margin: 0 auto;
   }
  </style>
 </head>
 <body>
  <!--
    1.什么是弧度  是一种长度的描述单位
    2.一个弧度怎么去描述  一个圆有多少个弧度  2 * π
    3.一弧度有多长  一个弧度一个半径的长度

    角度：一个圆是360度
    半径：已一个点为中心多长为放射半径
    周长：2 * π * r

    最终的结论：一个角度等于多少弧度  π/180
    -->
  <canvas width="600" height="400"></canvas>
  <script>
   var myCanvas = document.querySelector("canvas");
   var ctx = myCanvas.getContext("2d");

   /*1.体验曲线的绘制*/
   /*2.线是由点构成的*/
   /*3.曲线可以由数学公式得来*/

   for (var i = 1; i < 600; i++) {
    var x = i;
    // var y = x / 2; // 斜线公式1：y = x / 2
    // var y = Math.pow(x / 10-30, 2); // 抛物线公式2：y = (x + 2) ^2
    var y = 50 * Math.sin(x / 10) + 100; // 曲线公式3：y = sin(x)
    ctx.lineTo(x, y);
   }
   ctx.stroke();
  </script>
 </body>
</html>
```

#### 绘制四分之一个圆弧：arc()方法绘制圆弧

```html
<!DOCTYPE html>
<html lang="en">
 <head>
  <meta charset="UTF-8" />
  <title>绘制四分之一个圆弧</title>
  <style>
   canvas {
    border: 1px solid #ccc;
    display: block;
    margin: 0 auto;
   }
  </style>
 </head>
 <body>
  <canvas width="600" height="400"></canvas>
  <script>
   var myCanvas = document.querySelector("canvas");
   var ctx = myCanvas.getContext("2d");

   /*绘制圆弧*/
   // 1.确定圆心：坐标 x, y
   // 2.确定圆半径：r
   // 3.确定起始绘制的位置和结束绘制的位置：确定弧的长度和位置：startAngle, endAngle   弧度
   // 4.取得绘制的方向 direction 默认是顺时针 false 逆时针 true 

   /*在中心位置画一个半径150px的圆弧左下角*/
   var w = ctx.canvas.width;
   var h = ctx.canvas.height;
   // arc()方法绘制圆弧：四分之一个圆计算
   ctx.arc(w / 2, h / 2, 150, Math.PI / 2, Math.PI, true);
   ctx.stroke();
  </script>
 </body>
</html>
```

#### 绘制一个右上角的四分之一的扇形：计算弧度绘制再填充

```html
<!DOCTYPE html>
<html lang="en">
 <head>
  <meta charset="UTF-8" />
  <title>绘制一个右上角的四分之一的扇形</title>
  <style>
   canvas {
    border: 1px solid #ccc;
    display: block;
    margin: 0 auto;
   }
  </style>
 </head>
 <body>
  <canvas width="600" height="400"></canvas>
  <script>
   var myCanvas = document.querySelector("canvas");
   var ctx = myCanvas.getContext("2d");

   /*原理：在中心位置画一个半径150px的圆弧右上角， 1.扇形  2.计算边  3.填充 */
   var w = ctx.canvas.width;
   var h = ctx.canvas.height;

   // 把起点放到圆心位置
   ctx.moveTo(w / 2, h / 2);
   // 计算扇形弧度
   ctx.arc(w / 2, h / 2, 150, 0, -Math.PI / 2, true);

   // 闭合路径
   // ctx.closePath();

   // 填充模式
   ctx.fill();
  </script>
 </body>
</html>
```

#### 绘制一个圆分成六等分颜色随机

```html
<!DOCTYPE html>
<html lang="en">
 <head>
  <meta charset="UTF-8" />
  <title>绘制一个圆分成六等分颜色随机</title>
  <style>
   canvas {
    border: 1px solid #ccc;
    display: block;
    margin: 0 auto;
   }
  </style>
 </head>
 <body>
  <canvas width="600" height="400"></canvas>
  <script>
   var myCanvas = document.querySelector("canvas");
   var ctx = myCanvas.getContext("2d");

   var w = ctx.canvas.width;
   var h = ctx.canvas.height;

   // 分成几等分
   var num = 6;
   // 一份多少弧度
   var angle = (Math.PI * 2) / num;

   // 原点坐标
   var x0 = w / 2;
   var y0 = h / 2;

   // 随机颜色方法
   var getRandomColor = function () {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + "," + g + "," + b + ")";
   };

   // 上一次绘制的结束弧度等于当前次的起始弧度
   for (var i = 0; i < num; i++) {
    // 起始和结束
    var startAngle = i * angle;
    var endAngle = (i + 1) * angle;

    // 开始绘制
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.arc(x0, y0, 150, startAngle, endAngle);

    ctx.fillStyle = getRandomColor(); // 随机颜色
    ctx.fill(); // 填充模式
   }
  </script>
 </body>
</html>
```

#### 结合上面例子：根据年龄分布绘制饼图

```html
<!DOCTYPE html>
<html lang="en">
 <head>
  <meta charset="UTF-8" />
  <title>根据年龄分布绘制饼图</title>
  <style>
   canvas {
    border: 1px solid #ccc;
    display: block;
    margin: 0 auto;
   }
  </style>
 </head>
 <body>
  <canvas width="600" height="400"></canvas>
  <script>
   var myCanvas = document.querySelector("canvas");
   var ctx = myCanvas.getContext("2d");

   /*根据年龄分布绘制饼图*/

   /*1.准备统计的数据*/
   // 15-20岁 6个
   // 20-25岁 30个
   // 25-30岁 10个
   // 30-35岁 8个
   var data = [6, 30, 10, 8];

   /*2.在饼图表示出来*/
   // 各个年龄段人的总数
   var total = 0;
   data.forEach(function (item, i) {
    total += item;
   });
   console.log(total);

   // 存放-数据转成弧度
   var angleList = [];
   data.forEach(function (item, i) {
    var angle = Math.PI * 2 * (item / total);
    angleList.push(angle);
   });
   console.log(angleList);

   /*3.根据弧度绘制扇形*/
   var w = ctx.canvas.width;
   var h = ctx.canvas.height;
   var x0 = w / 2;
   var y0 = h / 2;

   // 获取随机颜色方法
   var getRandomColor = function () {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + "," + g + "," + b + ")";
   };

   var startAngle = 0;
   angleList.forEach(function (item, i) {
    // 上一次绘制的结束弧度等于当前次的起始弧度
    var endAngle = startAngle + item;
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.arc(x0, y0, 150, startAngle, endAngle);
    ctx.fillStyle = getRandomColor();
    ctx.fill();
    // 记录当前的结束位置作为下一次的起始位置
    startAngle = endAngle;
   });
  </script>
 </body>
</html>
```

### 3.绘制文本

文本的方法和属性：打开[HTML 画布 | 菜鸟教程 (runoob.com)](https://www.runoob.com/tags/ref-canvas.html)，搜索 [`文本`] 两字

- ctx.font = '微软雅黑'; - 设置字体

- `strokeText()`：在画布上绘制文本（无填充）

- `fillText(text,x,y,maxWidth)` ：在画布上绘制"被填充的"文本
  
  - text 要绘制的文本
  - x,y 文本绘制的坐标（文本左下角）
  - maxWidth 设置文本最大宽度，可选参数

- `ctx.textAlign`：文本水平对齐方式，相对绘制坐标来说的
  
  - left
  - center
  - right
  - start（默认）
  - end

- `ctx.direction`属性css(rtl、ltr) start和end与此相关
  
  direction属性文档(前面表格没有的属性)：[CanvasRenderingContext2D.direction - Web API 接口参考 | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/direction)
  
  - 如果是ltr，文本方向从左向右，start和left表现一致
  - 如果是rtl，文本方向从右向左，start和right表现一致
  - 如果是inherit(默认值)，根据情况继承 `canvas`元素或者 `Document`

- `ctx.textBaseline`：设置基线（垂直对齐方式 ）
  
  - top 文本的基线处于文本的正上方，并且有一段距离
  - middle 文本的基线处于文本的正中间
  - bottom 文本的基线处于文本的证下方，并且有一段距离
  - hanging 文本的基线处于文本的正上方，并且和文本粘合
  - alphabetic 默认值，基线处于文本的下方，并且穿过文字
  - ideographic 和bottom相似，但是不一样

- `measureText()`：获取文本宽度obj.width

#### 绘制在画布中心的一段文字

```html
<!DOCTYPE html>
<html lang="en">
 <head>
  <meta charset="UTF-8" />
  <title>绘制在画布中心的一段文字</title>
  <style>
   canvas {
    border: 1px solid #ccc;
    display: block;
    margin: 100px auto;
   }
  </style>
 </head>
 <body>
  <canvas width="600" height="400"></canvas>
  <script>
   var myCanvas = document.querySelector("canvas");
   var ctx = myCanvas.getContext("2d");

   // 在画布的中心绘制一段文字
   /*1.声明一段文字*/
   var str = "您吃-,了吗";
   /*2.确定画布的中心*/
   var w = ctx.canvas.width;
   var h = ctx.canvas.height;

   /*3.画一个十字架在画布的中心*/
   ctx.beginPath();
   // 横线
   ctx.moveTo(0, h / 2 - 0.5);
   ctx.lineTo(w, h / 2 - 0.5);
   // 竖线
   ctx.moveTo(w / 2 - 0.5, 0);
   ctx.lineTo(w / 2 - 0.5, h);
   ctx.strokeStyle = "#eee";
   ctx.stroke();

   /*4.绘制文本*/
   ctx.beginPath();
   ctx.strokeStyle = "#000";
   var x0 = w / 2;
   var y0 = h / 2;

   // 注意：起点位置在文字的左下角
   // 有文本的属性  尺寸 字体  左右对齐方式  垂直对齐的方式
   ctx.font = "40px Microsoft YaHei";

   // 左右对齐方式：(center left right start end) 基准起始坐标
   ctx.textAlign = "center";
   // 垂直对齐的方式：基线 baseline(top,bottom,middle) 基准起始坐标
   ctx.textBaseline = "middle";
   // 文本方向的属性：ltr，从左向右；rtl，从右向左；inherit(默认值)，根据情况继承 `canvas`元素或者 `Document`
   // ctx.direction = 'rtl'; 

   // 绘制文本
   // ctx.strokeText(str, x0, y0); // 绘制无填充的文本
   ctx.fillText(str, x0, y0); // 绘制填充文本

   /*5.画一个下划线和文字一样长*/
   ctx.beginPath();

   // 获取文本的宽度
   console.log(ctx.measureText(str));
   // 返回包含指定文本宽度的对象
   var width = ctx.measureText(str).width;

   // 文本的下划线绘制
   ctx.moveTo(x0 - width / 2, y0 + 20);
   ctx.lineTo(x0 + width / 2, y0 + 20);
   ctx.stroke();
  </script>
 </body>
</html>
```

#### 结合上面饼图绘制和文字绘制：绘制完整的带文本数据显示的饼状图

```html
<!DOCTYPE html>
<html lang="en">
 <head>
  <meta charset="UTF-8" />
  <title>绘制完整的带文本数据显示的饼状图</title>
  <style>
   canvas {
    border: 1px solid #ccc;
    display: block;
    margin: 100px auto;
   }
  </style>
 </head>
 <body>
  <canvas width="600" height="400"></canvas>
  <script>
   /***** 绘制饼状态图 *****/
   /*1.1 根据数据绘制一个饼图*/
   /*1.2 绘制标题 从扇形的弧中心伸出一条线在画一条横线在横线的上面写上文字标题*/
   /*1.3 在画布的左上角 绘制说明 一个和扇形一样颜色的矩形 旁边就是文字说明*/
   var PieChart = function (ctx) {
    // 绘制工具
    this.ctx = ctx || document.querySelector("canvas").getContext("2d");
    // 绘制饼图的中心
    this.w = this.ctx.canvas.width;
    this.h = this.ctx.canvas.height;
    // 圆心
    this.x0 = this.w / 2 + 60;
    this.y0 = this.h / 2;
    // 半径
    this.radius = 150;
    // 伸出去的线的长度
    this.outLine = 20;
    // 说明的矩形大小
    this.rectW = 30;
    this.rectH = 16;
    this.space = 20; // 间距
   };

   // 初始化方法里-准备绘制饼图的数据+方法
   PieChart.prototype.init = function (data) {
    this.drawPie(data);
   };

   // 绘制饼图的-结合下面的数据+方法
   PieChart.prototype.drawPie = function (data) {
    var that = this;
    // 1.转化弧度
    var angleList = this.transformAngle(data);
    // 2.绘制饼图
    var startAngle = 0;
    angleList.forEach(function (item, i) {
     // 当前的结束弧度要等于下一次的起始弧度
     var endAngle = startAngle + item.angle;
     that.ctx.beginPath();
     that.ctx.moveTo(that.x0, that.y0);
     that.ctx.arc(that.x0, that.y0, that.radius, startAngle, endAngle);
     var color = (that.ctx.fillStyle = that.getRandomColor());
     that.ctx.fill();

     /*下一次要使用当前的这一次的结束角度*/
     // 绘制伸出去的线的文本说明
     that.drawTitle(startAngle, item.angle, color, item.title);
     // 绘制说明
     that.drawDesc(i, item.title);
     startAngle = endAngle;
    });
   };

   // 绘制饼图的 延申的线 和 线上面的 文本数据说明
   PieChart.prototype.drawTitle = function (startAngle, angle, color, title) {
    /***** 饼图上伸出去的线计算（比较重点和难点的，计算的看说明-有点抽象） *****/
    /*1.确定伸出去的线 通过圆心点和伸出去的线的点，确定这个线*/
    /*2.确定伸出去的点，需要确定伸出去的线的长度*/
    /*3.固定伸出去的线的长度*/
    /*4.计算这个点的坐标*/
    /*5.需要根据角度和斜边的长度*/
    /*5.1 使用弧度：当前扇形的起始弧度 + 对应的弧度的一半 */
    /*5.2 半径 + 伸出去的长度 */
    /*5.2.1 outX = x0 + cos(angle) * (r + outLine)*/
    /*5.2.2 outY = y0 + sin(angle) * (r + outLine)*/

    // 斜边
    var edge = this.radius + this.outLine;
    // x轴方向的直角边
    var edgeX = Math.cos(startAngle + angle / 2) * edge;
    // y轴方向的直角边
    var edgeY = Math.sin(startAngle + angle / 2) * edge;
    // 计算伸出去的点坐标
    var outX = this.x0 + edgeX;
    var outY = this.y0 + edgeY;
    // 画伸出去的线
    this.ctx.beginPath();
    this.ctx.moveTo(this.x0, this.y0);
    this.ctx.lineTo(outX, outY);
    this.ctx.strokeStyle = color;

    /***** 画饼图上的文本说明和下划线 *****/
    // 线的方向怎么判断 伸出去的点在X0的左边 线的方向就是左边
    // 线的方向怎么判断 伸出去的点在X0的右边 线的方向就是右边
    // 结束的点坐标  和文字大小
    this.ctx.font = "14px Microsoft YaHei";
    var textWidth = this.ctx.measureText(title).width;
    // 右
    if (outX > this.x0) {
     this.ctx.lineTo(outX + textWidth, outY);
     this.ctx.textAlign = "left";
    } else {
     // 左
     this.ctx.lineTo(outX - textWidth, outY);
     this.ctx.textAlign = "right";
    }
    this.ctx.stroke();
    this.ctx.textBaseline = "bottom";
    this.ctx.fillText(title, outX, outY);
   };

   // 绘制左上角矩形和文字说明
   PieChart.prototype.drawDesc = function (index, title) {
    /***** 左上角矩形绘制说明 *****/
    // 矩形的大小
    // 距离上和左边的间距
    // 矩形之间的间距
    this.ctx.fillRect(
     this.space,
     this.space + index * (this.rectH + 10),
     this.rectW,
     this.rectH
    );

    // 绘制矩形右边文字
    this.ctx.beginPath();
    this.ctx.textAlign = "left";
    this.ctx.textBaseline = "top";
    this.ctx.font = "12px Microsoft YaHei";
    this.ctx.fillText(
     title,
     this.space + this.rectW + 10,
     this.space + index * (this.rectH + 10)
    );
   };

   // 饼图弧度计算方法
   PieChart.prototype.transformAngle = function (data) {
    // 返回的数据内容包含弧度的
    var total = 0;
    data.forEach(function (item, i) {
     total += item.num;
    });
    // 计算弧度 并且追加到当前的对象内容
    data.forEach(function (item, i) {
     var angle = (item.num / total) * Math.PI * 2;
     item.angle = angle;
    });
    return data;
   };

   // 随机颜色方法
   PieChart.prototype.getRandomColor = function () {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + "," + g + "," + b + ")";
   };

   // 准备的数据
   var data = [
    {
     title: "15-20岁",
     num: 6,
    },
    {
     title: "20-25岁",
     num: 30,
    },
    {
     title: "25-30岁",
     num: 10,
    },
    {
     title: "30以上",
     num: 8,
    },
   ];

   // 实例化构造函数和执行实例方法
   var pieChart = new PieChart();
   pieChart.init(data);
  </script>
 </body>
</html>
```

## 做动画

### 1.绘制图片

图像方法`drawImage()`文档：[HTML canvas drawImage() 方法 | 菜鸟教程 (runoob.com)](https://www.runoob.com/tags/canvas-drawimage.html)

- `drawImage()` 方法的三种不同参数绘制图片
  - 三个参数：`drawImage(img,x,y)`：**在画布上定位图像**
    - img 图片对象、canvas对象、video对象
    - x,y 图片绘制的左上角
  - 五个参数：`drawImage(img,x,y,w,h)`：**在画布上定位图像，并规定图像的宽度和高度**
    - img 图片对象、canvas对象、video对象
    - x,y 图片绘制的左上角
    - w,h 图片绘制尺寸设置(图片缩放，不是截取)
  - 九个参数：`drawImage(img,x,y,w,h,x1,y1,w1,h1)`：**剪切图像，并在画布上定位被剪切的部分**
    - img 图片对象、canvas对象、video对象
    - x,y,w,h 图片中的一个矩形区域
    - x1,y1,w1,h1 画布中的一个矩形区域

#### 绘制图片的三种方式+三种图片加载方法示例

```html
<!DOCTYPE html>
<html lang="en">
 <head>
  <meta charset="UTF-8" />
  <title>绘制图片</title>
  <style>
   canvas {
    border: 1px solid #ccc;
    display: block;
    margin: 0 auto;
   }
  </style>
 </head>
 <body>
  <!-- 方法3：标签引用图片 -->
  <!--<img src="image/01.jpg" alt="">-->
  <canvas width="600" height="400"></canvas>
  <script>
   var myCanvas = document.querySelector("canvas");
   var ctx = myCanvas.getContext("2d");

   /*方法1.创建img元素，加载图片到内存即可*/
   // var img = document.createElement("img");
   // img.src = "image/01.jpg";


   /*方法2：2.1 创建Image对象*/
   var image = new Image();
   /*2.2 要使用图片必须等图片加载完毕：先绑定加载完成事件*/
   image.onload = function () {
    /*实现图片绘制*/
    console.log(image);
    /*绘制图片的三种方式*/

    /*3参数*/
    // ctx.drawImage(image,100,100);

    /*5个参数*/
    // ctx.drawImage(image,100,100,100,100);

    /*9个参数*/
    ctx.drawImage(image, 400, 400, 400, 400, 200, 200, 100, 100);
   };
   /*2.3 再设置图片路径*/
   image.src = "image/02.jpg";
  </script>
 </body>
</html>
```

### 2.序列帧动画

- 绘制精灵图
- 帧动画-动起来
- 控制边界
- 键盘控制

#### 结合上面绘制图像方法-进行帧动画绘制：通过`drawImage()`方法的9个参数的使用来截取图片位置，实现帧动画

精灵图：

![04.png](.\img\04.png)

```html
<!DOCTYPE html>
<html lang="en">
 <head>
  <meta charset="UTF-8" />
  <title>帧动画</title>
  <style>
   canvas {
    border: 1px solid #ccc;
    display: block;
    margin: 0 auto;
   }
  </style>
 </head>
 <body>
  <canvas width="600" height="400"></canvas>
  <script>
   var myCanvas = document.querySelector("canvas");
   var ctx = myCanvas.getContext("2d");

   var image = new Image();
   /*图片加载完成*/
   image.onload = function () {
    // 动态的去获取当前图片的尺寸
    var imageWidth = image.width;
    var imageHeight = image.height;
    // 计算出每一个小人物的尺寸
    var personWidth = imageWidth / 4;
    var personHeight = imageHeight / 4;

    /***** 位截取图片 *****/
    // 帧动画：在固定的时间间隔，根据图片的索引更换显示的图片
    var index = 0;
    /*绘制在画布的中心*/
    // 图片绘制的起始点
    var x0 = ctx.canvas.width / 2 - personWidth / 2;
    var y0 = ctx.canvas.height / 2 - personHeight / 2;
    // 绘制图片截取第一个精灵图
    ctx.drawImage(
     image,
     0,
     0,
     personWidth,
     personHeight,
     x0,
     y0,
     personWidth,
     personHeight
    );
    // 定时按顺序绘制其他精灵图
    setInterval(function () {
     index++; // 裁剪的索引位置
     // 绘制之前清除已经绘制的精灵图，避免重复绘制
     ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
     // 通过`drawImage()`方法的9个参数的使用来截取图片位置，实现帧动画
     ctx.drawImage(
      image,
      index * personWidth,
      0,
      personWidth,
      personHeight,
      x0,
      y0,
      personWidth,
      personHeight
     );
     // 只绘制前3帧
     if (index >= 3) {
      index = 0;
     }
    }, 1000);
   };
   image.src = "image/04.png";
  </script>
 </body>
</html>
```

#### 方向键控制精灵图-行走的帧动画

```html
<!DOCTYPE html>
<html lang="en">
 <head>
  <meta charset="UTF-8" />
  <title>方向键控制的行走的小人</title>
  <style>
   canvas {
    border: 1px solid #ccc;
    display: block;
    margin: 0 auto;
   }
  </style>
 </head>
 <body>
  <canvas width="600" height="400"></canvas>
  <script>
   var Person = function (ctx) {
    // 绘制工具
    this.ctx = ctx || document.querySelector("canvas").getContext("2d");
    // 图片路径
    this.src = "image/04.png";
    // 画布的大小
    this.canvasWidth = this.ctx.canvas.width;
    this.canvasHeight = this.ctx.canvas.height;

    /*行走相关参数*/
    this.stepSzie = 10;
    // 0：前，1：左，2：右，3：后  和图片的行数包含的图片对应上
    this.direction = 0;
    // x轴方向的偏移步数
    this.stepX = 0;
    // y轴方向的偏移步数
    this.stepY = 0;

    // 初始化方法
    this.init();
   };

   Person.prototype.init = function () {
    var that = this;
    /*1.加载图片和绘制出默认的精灵图帧*/
    this.loadImage(function (image) {
     // 图片的大小
     that.imageWidth = image.width;
     that.imageHeight = image.height;
     // 人物的大小
     that.personWidth = that.imageWidth / 4;
     that.personHeight = that.imageHeight / 4;
     // 绘制图片的起点
     that.x0 = that.canvasWidth / 2 - that.personWidth / 2;
     that.y0 = that.canvasHeight / 2 - that.personHeight / 2;

     // 默认绘制在中心位置正面朝外的精灵图帧
     that.ctx.drawImage(
      image,
      0,
      0,
      that.personWidth,
      that.personHeight,
      that.x0,
      that.y0,
      that.personWidth,
      that.personHeight
     );

     /*2.能通过方向键去控制人物行走*/
     that.index = 0;
     // 监听键盘按键，分别截取不同的帧数
     document.onkeydown = function (e) {
      if (e.keyCode == 40) {
       // 0：前
       that.direction = 0;
       that.stepY++;
       that.drawImage(image);
      } else if (e.keyCode == 37) {
       // 1：左
       that.direction = 1;
       that.stepX--;
       that.drawImage(image);
      } else if (e.keyCode == 39) {
       // 2：右
       that.direction = 2;
       that.stepX++;
       that.drawImage(image);
      } else if (e.keyCode == 38) {
       // 3：后
       that.direction = 3;
       that.stepY--;
       that.drawImage(image);
      }
     };
    });
   };

   // 加载图片方法
   Person.prototype.loadImage = function (callback) {
    var image = new Image();
    image.onload = function () {
     callback && callback(image);
    };
    image.src = this.src;
   };

   // 绘制图片方法
   Person.prototype.drawImage = function (image) {
    this.index++;
    // 清除画布，避免重复绘制
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    /***** 绘图 *****/
    // 在精灵图上的定位 x  索引
    // 在精灵图上的定位 y  方向
    this.ctx.drawImage(
     image,
     this.index * this.personWidth,
     this.direction * this.personHeight,
     this.personWidth,
     this.personHeight,
     this.x0 + this.stepX * this.stepSzie,
     this.y0 + this.stepY * this.stepSzie,
     this.personWidth,
     this.personHeight
    );
    // 如果索引超出了 变成0
    if (this.index >= 3) {
     this.index = 0;
    }
   };

   new Person();
  </script>
 </body>
</html>
```

### 3.坐标变换

打开文档搜索【转换】：[HTML 画布 | 菜鸟教程 (runoob.com)](https://www.runoob.com/tags/ref-canvas.html)

- 平移 移动画布的原点
  - translate(x,y) 参数表示移动目标点的坐标：x,y的坐标位置
- 缩放
  - scale(x,y) 参数表示宽高的缩放比例：宽, 高的缩放
- 旋转
  - rotate(angle) 参数表示旋转角度：旋转角度，以弧度计

#### 坐标转换示例

```html
<!DOCTYPE html>
<html lang="en">
 <head>
  <meta charset="UTF-8" />
  <title>认识canvas的转换</title>
  <style>
   canvas {
    border: 1px solid #ccc;
    display: block;
    margin: 0 auto;
   }
  </style>
 </head>
 <body>
  <canvas width="600" height="400"></canvas>
  <script>
   var myCanvas = document.querySelector("canvas");
   var ctx = myCanvas.getContext("2d");
   // ctx.translate(100, 100); // x,y的坐标位置
   // ctx.scale(0.5, 1); // 缩放：宽, 高
   // ctx.rotate(Math.PI / 6); // 旋转：旋转角度，以弧度计
   var startAngle = 0;
   ctx.translate(150, 150);
   setInterval(function () {
    startAngle += Math.PI / 180;
    ctx.rotate(startAngle); // 旋转
    ctx.strokeRect(-50, -50, 100, 100); // 矩形填充
   }, 500);
  </script>
 </body>
</html>
```

### ✨Canvas 动画🌟

#### 1.运动&三角函数

#### 2.边界&摩擦力

#### 3.鼠标&绘制对象交互

#### 4.缓动&弹动

#### 5.碰撞检测

#### 6.高级坐标旋转&斜面反弹

#### 7.撞球物理

#### 8.粒子&万有引力

#### 9.从 2D 到 3D

#### 10.常见的案例&补充

## 绘制绚丽的倒计时

绘制绚丽的倒计时代码：[Gorgeous Countdown (codepen.io)](https://codepen.io/ickedesign/pen/peRvwO)

### Creat Canvas - 创建画布

- canvas是行内元素，有默认的高宽（300px*150px）
  
  ```html
  <!--直接在标签头设置-->
  <canvas width="1024" height="500"></canvas>
  ```
  
  ```js
  // 获取元素，创建绘图的2D上下文环境
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d'); 
  ```

---

### Draw Arc - 绘制弧线（画圆）

- `context.arc(300,300,0,1.5*Math.PI,false)` 的含义是沿顺时针的方向来绘制一个圆心为（300，300），角度为1.5π
  
  ```js
  context.arc(centerx,centery,radius,startingAngle,endingAngle,anticlockwise=false);
  // 默认clockwise=false，即在逆时针的方向上以角度为 0,0.5*PI,1*PI,1.5*PI,2*PI这种形式绘图
  ```

---

### Draw Digit - 绘制静止的时钟

- 先编写一个三维数组，来显示数字和冒号（数字点阵）。这里以0和：来举例
- 不完全，完全请看代码，digit变量部分：[Gorgeous Countdown (codepen.io)](https://codepen.io/ickedesign/pen/peRvwO)

```js
// 数字有7列10行组成，冒号由4列10行组成，数组中有1的地方就是代表有小球
digit =
    [
        // 10 * 7 的二维数组
        [
            [0,0,1,1,1,0,0],
            [0,1,1,0,1,1,0],
            [1,1,0,0,0,1,1],
            [1,1,0,0,0,1,1],
            [1,1,0,0,0,1,1],
            [1,1,0,0,0,1,1],
            [1,1,0,0,0,1,1],
            [1,1,0,0,0,1,1],
            [0,1,1,0,1,1,0],
            [0,0,1,1,1,0,0]
        ],// 0
        // 10 * 4 的二维数组
        [
            [0,0,0,0],
            [0,0,0,0],
            [0,1,1,0],
            [0,1,1,0],
            [0,0,0,0],
            [0,0,0,0],
            [0,1,1,0],
            [0,1,1,0],
            [0,0,0,0],
            [0,0,0,0]
        ]// :
    ];
```

通过循环数组，定义好小球之间的距离，即可画出小球

### renderDigit方法-绘制圆心计算

![renderDigit方法-绘制圆心计算.jpg](.\img\renderDigit方法-绘制圆心计算.jpg)

#### 由圆组成的数字绘制，圆形生成的计算

```js
// 绘制时钟的数字和冒号
function renderDigit(x, y, num, cxt) {
    cxt.fillStyle = "rgb(0, 102, 153)";
    // 先绘制出1
    for (var i = 0; i < digit[num].length; i++) {
        for (var j = 0; j < digit[num][i].length; j++) {
            if (digit[num][i][j] == 1) {
                cxt.beginPath();
                // 弧形的绘制方法：需要计算
                cxt.arc(
                    // 圆心的绘制计算
                    x + j * 2 * (radius + 1) + (radius + 1),
                    y + i * 2 * (radius + 1) + (radius + 1),
                    radius,
                    0,
                    2 * Math.PI
                );
                cxt.closePath();
                // cxt.stroke();

                cxt.fill();
            }
        }
    }
}
```

---

### Countdown Effect - 设置倒计时效果

- 获取倒计时的时间使用设置好的时间减去现在的时间，这个设置好的时间可以使用`new Date()`生成，比如`const endTime=new Date(2017,2,7,20,14,12)`。其中月份是从0开始的，所以这个时间的含义是2017-03-07，20：14：12
- 也可以使用以下的方法来设置固定的时间，比如倒计时时间固定从1小时开始

```js
var endTime = new Date();
// 获取当前时间，并设置倒计时1个小时（因为是毫秒所以计算：3600 * 1000 = 60分钟）
endTime.setTime(endTime.getTime()+3600*1000);
```

使用倒计时时间的方法

```js
// 倒计时的时间计算
function getCurrentShowTimeSeconds() {
    var currentTime = new Date();
    // getTime() 方法可返回距 1970 年 1 月 1 日之间的毫秒数。
    var ret = endTime.getTime() - currentTime.getTime();
    // 将毫秒化成秒,ret要加上
    ret = Math.round(ret / 1000);
    return ret >= 0 ? ret : 0;
}
```

---

### Moving Clock - 让倒计时动起来

- 在页面加载的时候，使用`setInterval()`方法更新，从而数字可以变化而更新生成新的小球的位置
- 为什么定时器是50毫秒，这就设计到帧数的概念

```js
// 添加时钟的动画效果
setInterval(
    function(){
        render(context);// 初始化时间
        update();// 对时间进行更新
    },
    50 // 一秒有1000毫秒，即20分之1，
    // 所以帧率为20，即动画1秒钟更新20次。但事实上，因为里面的函数执行效率不同，所以帧数不一定为20
)
```

- `context.clearRect(x,y,canvasWidth,canvasHeight);`其中x,y指的是清除矩形画布的左上角位置
- canvasWidth,canvasHeight指的是清除矩形画布的宽度和长度。使用该函数可以让canvas中后来生成的图形不会和原来的图形叠加在一起
- `context.fillRect()`，其作用是填充矩形。

```js
context.clearRect(0,0,context.canvas.width,context.canvas.height);
// 从右上角开始，范围是整个画布
// 使用context.canvas.width来获取canvas的宽度是context的属性之一
```

---

### 小球的物理抛物线运动

根据物理公式：幂运算

最后组成的balls数组数据，后面的操作和生成彩色小球的方法都需要用到

```js
// 倒计时变化生成的彩色小球集合，并push到balls[]中
function addBalls(x, y, num) {
    for (var i = 0; i < digit[num].length; i++) {
        for (var j = 0; j < digit[num][i].length; j++) {
            if (digit[num][i][j] == 1) {
                // 定义aBall
                var aBall = {
                    // 这个圆心的计算和数字时间生成的圆心一样
                    x: x + j * 2 * (radius + 1) + (radius + 1),
                    y: y + i * 2 * (radius + 1) + (radius + 1),
                    // 幂运算
                    vx: Math.pow(-1, Math.floor(Math.random() * 1000)) * 5,
                    vy: -5, // 下落的速度
                    g: 1.5 + Math.random(),
                    color: colors[Math.floor(Math.random() * colors.length)],
                };
                // 将小球push进集合中，后面的操作和生成彩色小球的方法都需要用到
                balls.push(aBall);
            }
        }
    }
}
```

---

### Ball Motion - 彩色小球的运动物理现象

#### 下一次倒计时变化，对生成的彩色小球进行运动更新

- 小球的物理抛物线运动和物理碰撞原理

```js
// 对生成的彩色小球进行运动更新
function updateBalls() {
    for (var i = 0; i < balls.length; i++) {
        balls[i].x += balls[i].vx;
        balls[i].y += balls[i].vy;
        balls[i].vy += balls[i].g;

        // 当小球碰地后会反弹
        if (canvasHeight - balls[i].y <= radius) {
            balls[i].y = canvasHeight - radius;
            // 添加阻力系数：物理碰撞现象（每次碰撞的反弹是上一次的倍数系数）
            balls[i].vy = -balls[i].vy * 0.75;
        }
    }

    // 及时清空跳出画布的小球，优化页面的内存
    var cnt = 0;
    for (var i = 0; i < balls.length; i++) {
        if (balls[i].x + radius > 0 && balls[i].x - radius < canvasWidth) {
            // 小球数组中的第0个到cnt-1个是在canvas画布中
            balls[cnt++] = balls[i];
        }
    }
    // Math.min();两个数取最小值
    while (balls.length > Math.min(250, cnt)) {
        balls.pop(); // 删除第cnt个到balls.length-1个数组
        // 删除前面的数组使用balls.shift();
    }
    // while(balls.length>cnt){
    //   balls.pop(); // 删除第cnt个到balls.length-1个数组
    // }
}
```

- 小球的运动的物理碰撞原理：初中物理课上的抛物线一样，有初始速度，重力加速度，摩擦系数。
- 小球的运动也需要借助`setInterval()`方法来更新，类似时钟的动画效果
- 小球触底后反弹使用`if`语句来判断

```js
// 当小球触底后会反弹
if(canvasHeight - ball.y <= ball.r){
    ball.y = canvasHeight-ball.r;
    ball.vy = -ball.vy*0.5; // 添加阻力系数
}
```

#### Performance Optimization - 及时清空Canvas画布外面的小球

- 核心是`balls[cnt++]=balls[i]`这个表达式

```js
// 及时清空跳出画布的小球，优化页面的内存
var cnt = 0
for(var i = 0; i < balls.length; i++){
    if(balls[i].x + radius > 0 && balls[i].x - radius < canvasWidth){
        // 小球数组中的第0个到cnt-1个是在canvas画布中
        balls[cnt++] = balls[i];
    }
}
// Math.min();两个数取最小值
while(balls.length > Math.min(250, cnt)){
    balls.pop(); // 删除第cnt个到balls.length-1个数组
    // 删除前面的数组使用balls.shift();
}
```

---

### Clock Effect - 将倒计时的效果换成正常时钟效果

```js
// 当前的时间计算
function getCurrentShowTimeSeconds() {
    var currentTime = new Date();
    // getTime() 方法可返回距 1970 年 1 月 1 日之间的毫秒数。
    var ret = endTime.getTime() - currentTime.getTime();
    // 将毫秒化成秒,ret要加上
    ret = Math.round(ret / 1000);
    return ret >= 0 ? ret : 0;
}
```

## canvas在web游戏开发的应用

MDN的HTML5游戏开发教程：<https://developer.mozilla.org/zh-CN/docs/Games/Introduction_to_HTML5_Game_Development>

Canvas游戏开发教程：

- 1.白鹭游戏引擎：egret引擎
  
  Egret引擎是一个开源免费的游戏框架，用于构建二维游戏、演示程序和其他图形界面交互应用等。Egret使用**TypeScript**脚本语言开发。当游戏完成最终的打包后，可以将程序转换为HTML5游戏。实现跨平台特性。
  
  Egret不仅仅是一个基于HTML5技术的游戏引擎，我们的产品线中除了Egret引擎还提供了很多辅助游戏开发的工具。**准确的来说，Egret是一套游戏开发的解决方案**。你可以使用Egret引擎来帮助你开发HTML5游戏，并运行在手机和PC端的浏览器中，同时也你可以使用Egret提供的相关工具搭建你自己的游戏开发工作流。
  
  - Egret官网：[白鹭科技-Egret](https://www.egret.com/products)
  - 开源地址：[egret-labs/egret-core](https://github.com/egret-labs/egret-core)
  - cocos官网：[Cocos - 全球领先的2D&3D引擎，游戏/智能座舱/AR/VR/角色/教育](https://www.cocos.com/)

## Canvas库

- **konva**：Konva.js是一个HTML5 Canvas JavaScript框架，它通过为桌面和移动应用程序启用画布交互性来扩展2D上下文
  
  - GitHub：[konvajs/konva](https://github.com/konvajs/konva)
  
  - npm：[konva - npm (npmjs.com)](https://www.npmjs.com/package/konva)
  
  - 官网：[Konva - JavaScript 2d canvas library (konvajs.org)](https://konvajs.org/)
  
  - 特点：

    - 小巧、使用方便、支持移动端和pc端
    - 支持丰富的事件处理操作
    - 支持类似JQuery的操作方式
    - 开源，可以随意更改
    - 社区更新比较活跃，github托管源码
    - 性能也不错

## WebGL

- WebGL是一种Javascript的3D图形接口，把JavaScript和OpenGL ES 2.0结合在一起。

- Canvas是HTML5的画布元素，在使用Canvas时，需要用到Canvas的上下文，可以用2D上下文绘制二维的图像，也可以使用3D上下文绘制三维的图像，其中3D上下文就是指WebGL。
  
  - getContext()方法的四个参数("webgl"就是其中之一)：[HTMLCanvasElement.getContext() - Web API 接口参考 | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLCanvasElement/getContext#%E5%8F%82%E6%95%B0)

- OpenGL是开放式图形标准，跨编程语言、跨平台，Javascript、Java 、C、C++ 、 python 等都能支持OpenGL ，OpenGL的Javascript实现就是WebGL。OpenGL ES 2.0是OpenGL的子集，针对手机、游戏主机等嵌入式设备而设计。

---

OpenGL、WebGL、Canvas、Three.js四者关系

OpenGL：3D绘图标准

WebGL：OpenGL + JavaScript

Canvas：WebGL + Canvas 2D

Three.js：一个基于WebGL封装的库

类似于：

ECMAscript：脚本语言规范

JavaScript：脚本语言

jQuery: 一个基于JavaScript封装的库

简单一句话概括：WebGL和Three.js的关系，相当于JavaScript和jQuery的关系。

---

MDN的WebGL文档：[WebGL - Web API 接口参考 | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGL_API)

WebGL库：

- three.js：Three.js是基于webGL的封装的一个易于使用且轻量级的3D库，Three.js对WebGL提供的接口进行了非常好的封装，简化了很多细节，大大降低了学习成本，极大地提高了性能，功能也非常强大。
  
  Three.js应用场景有哪些？
  
  Web 3D游戏、3D物体模型展示、数据可视化、Web VR、其它特殊效果展示。
  
  - 官网：[Three.js – JavaScript 3D Library (threejs.org)](https://threejs.org/)
  
  - GitHub：[mrdoob/three.js: JavaScript 3D Library. (github.com)](https://github.com/mrdoob/three.js)
  
  - 中文网：

    - [Three.js中文网 (webgl3d.cn)](http://www.webgl3d.cn/)

    - [Three.js 中文教程 | 参考手册 | 使用指南 | 动画特效实例 | 踏得网 (techbrood.com)](https://techbrood.com/threejs/docs/)

    - [three.js 中文 - Javascript 3D 库 (threejs.online)](https://www.threejs.online/)

    - [入门 · Three.js 入门 (sogrey.top)](https://sogrey.top/Three.js-start/start/#top)

    - [Three.js教程 (webgl3d.cn)](http://www.webgl3d.cn/Three.js/)

- d3.js：图表库
  
  - 官网：[D3.js - Data-Driven Documents (d3js.org)](https://d3js.org/)
  
  - GitHub：[d3/d3: Bring data to life with SVG, Canvas and HTML. (github.com)](https://github.com/d3/d3)
  
  - 中文网：

    - [D3js: Data-Driven Documents](https://www.d3js.org.cn/)

    - [xswei/d3js_doc: D3js中文文档 D3中文 (github.com)](https://github.com/xswei/d3js_doc)

- PlayCanvas：
  
  - 官网：[PlayCanvas 开发者资源 | Learn PlayCanvas](https://developer.playcanvas.com/zh/)
  
  - GitHub：[playcanvas/engine: Fast and lightweight JavaScript game engine built on WebGL and glTF (github.com)](https://github.com/playcanvas/engine)

- Babylon.js：
  
  - GitHub：[BabylonJS/Babylon.js：Babylon.js是一个强大、美观、简单、开放的游戏和渲染引擎，它被打包在一个友好的JavaScript框架中。 (github.com)](https://github.com/BabylonJS/Babylon.js)

- filament：
  
  - GitHub：[google/filament：Filament是一个基于物理的实时渲染引擎，适用于Android，iOS，Windows，Linux，macOS和WebGL2。 (github.com)](https://github.com/google/filament)

- ClayGL：
  
  - GitHub：[pissang/claygl: A WebGL graphic library for building scalable Web3D applications (github.com)](https://github.com/pissang/claygl)
  