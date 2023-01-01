# JavaScript的Canvas学习

本文章参考文章：[学习 HTML5 Canvas 这一篇文章就够了 | 菜鸟教程 (runoob.com)](https://www.runoob.com/w3cnote/html5-canvas-intro.html)

**canvas练习项目**：[muyaCode/canvas_study: canvas学习 (github.com)](https://github.com/muyaCode/canvas_study)

## 相关文档工具

**MDN的Canvas文档**：

- HTML的canvas标签的使用：[HTMLCanvasElement - Web API 接口参考 | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLCanvasElement)

- CanvasAPI：[Canvas - Web API 接口参考 | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API)

**菜鸟教程的Canvas文档工具**：

- HTML的canvas标签支持的HTML的`全局属性`和`事件属性`文档：[HTML canvas 标签 | 菜鸟教程 (runoob.com)](https://www.runoob.com/tags/tag-canvas.html)

- HTML5 Canvas文档：[HTML5 Canvas | 菜鸟教程 (runoob.com)](https://m.runoob.com/html/html5-canvas.html)

- HTML 画布文档：[HTML 画布 | 菜鸟教程 (runoob.com)](https://www.runoob.com/tags/ref-canvas.html)

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

---

canvas元素的兼容性：

> Internet Explorer 9、Firefox、Opera、Chrome 和 Safari 支持 `<canvas>` 标签的属性及方法。
> **注意**：Internet Explorer 8 及更早的IE版本不支持 `<canvas>` 元素。

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

- 弧度概念
- arc()
  - x 圆心横坐标
  - y 圆心纵坐标
  - r 半径
  - startAngle 开始角度
  - endAngle 结束角度
  - anticlockwise 是否逆时针方向绘制（默认false表示顺时针；true表示逆时针）

### 3.绘制文本

- ctx.font = '微软雅黑' 设置字体
- strokeText()
- fillText(text,x,y,maxWidth)
  - text 要绘制的文本
  - x,y 文本绘制的坐标（文本左下角）
  - maxWidth 设置文本最大宽度，可选参数
- ctx.textAlign文本水平对齐方式，相对绘制坐标来说的
  - left
  - center
  - right
  - start 默认
  - end
- ctx.direction属性css(rtl ltr) start和end于此相关
  - 如果是ltr,start和left表现一致
  - 如果是rtl,start和right表现一致
- ctx.textBaseline 设置基线（垂直对齐方式 ）
  - top 文本的基线处于文本的正上方，并且有一段距离
  - middle 文本的基线处于文本的正中间
  - bottom 文本的基线处于文本的证下方，并且有一段距离
  - hanging 文本的基线处于文本的正上方，并且和文本粘合
  - alphabetic 默认值，基线处于文本的下方，并且穿过文字
  - ideographic 和bottom相似，但是不一样
- measureText() 获取文本宽度obj.width

### 4.实例练习

- 绘制扇形
  
  - ```html
    
    ```

- 绘制圆角矩形
  
  - ```html
    
    ```

- 绘制圆
  
  - ```html
    
    ```

- 绘制饼图
  
  - ```html
    
    ```

## 做动画

### 1.绘制图片

- drawImage()
  - 三个参数drawImage(img,x,y)
    - img 图片对象、canvas对象、video对象
    - x,y 图片绘制的左上角
  - 五个参数drawImage(img,x,y,w,h)
    - img 图片对象、canvas对象、video对象
    - x,y 图片绘制的左上角
    - w,h 图片绘制尺寸设置(图片缩放，不是截取)
  - 九个参数drawImage(img,x,y,w,h,x1,y1,w1,h1)
    - img 图片对象、canvas对象、video对象
    - x,y,w,h 图片中的一个矩形区域
    - x1,y1,w1,h1 画布中的一个矩形区域

### 2.序列帧动画

- 绘制精灵图
- 动起来
- 控制边界
- 键盘控制

### 3.坐标变换

- 平移 移动画布的原点
  - translate(x,y) 参数表示移动目标点的坐标
- 缩放
  - scale(x,y) 参数表示宽高的缩放比例
- 旋转
  - rotate(angle) 参数表示旋转角度

## ​canvas在web游戏开发的应用

MDN的HTML5游戏开发教程：<https://developer.mozilla.org/zh-CN/docs/Games/Introduction_to_HTML5_Game_Development>

Canvas游戏开发教程：

- 1
