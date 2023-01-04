# CSS奇淫巧技

Defensive CSS：<https://defensivecss.dev/>

这个网站收集各种防御性的 CSS 技巧，防止客户端出现各种破坏 CSS 显示的情况

## CSS Modules

阮一峰的日志：[CSS Modules 用法教程 - 阮一峰的网络日志 (ruanyifeng.com)](https://www.ruanyifeng.com/blog/2016/06/css_modules.html)

CSS Modules 不是官方规范或浏览器中的实现，而是构建步骤中的一个过程（在 Webpack 或 Browserify 的帮助下），它改变了类名和选择器的作用域（即有点像命名空间）。

目的：**解决 CSS 中全局作用域的问题**

### 开启 CSS Module

在vue中开启：开启后，class的类名会在后面随机生成字符串，达到独一无二的类名效果

```html
<style module>

<style>
```

在 React 中默认开启了 CSS Module，样式表文件需要以 `xxx.module.sass/less/css` 命名

我们也可以通过配置 webpack 来开启 CSS Module

webpack.config.js

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        loader: "css-loader",
        options: {
          modules: true,
          localIdentName: "[name]_[local]__[hash:base64:5]"
        }
      }
    ]
  }
};
```

`localIdentName` 可以定义生产的哈希类名，默认是 `[hash:base64]`

详细配置见: [css-loader | webpack 中文文档 (docschina.org)](https://webpack.docschina.org/loaders/css-loader/)

`localIdentName`选项的占位符有：

```bash
 [name] 源文件名称 (样式文件的文件名)
 [folder] 文件夹相对于 compiler.context 或者 modules.localIdentContext 配置项的相对路径。
 [path] 源文件相对于 compiler.context 或者 modules.localIdentContext 配置项的相对路径。
 [file] - 文件名和路径。
 [ext] - 文件拓展名。
 [hash] - 字符串的哈希值。基于 localIdentHashSalt、localIdentHashFunction、localIdentHashDigest、localIdentHashDigestLength、localIdentContext、resourcePath 和 exportName 生成。
 [<hashFunction>:hash:<hashDigest>:<hashDigestLength>] - 带有哈希设置的哈希。
 [local] - 原始类名。
```

### 局部作用域

#### 没有 CSS Module 的组件样式

默认 CSS 的规则是全局生效的，任何一个组件下的 CSS 样式，都会影响其他组件中使用相同类名的地方。

style.css

```css
.title {
  color: red;
}
```

App.js

```javascript
import "./styles.css";

export default function App() {
  return (
    <div className="title">
      <h1>Hello World</h1>
    </div>
  );
}
```

Header.css

```css
.title {
  color: green;
}
```

Header.js

```javascript
import "./Header.css";

export default function Header() {
  return <h2 className="title">Header 组件</h2>;
}
```

index.js

```javascript
import { StrictMode } from "react";
import ReactDOM from "react-dom";

import App from "./App";
import Header from "./Header";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <Header />
    <App />
  </StrictMode>,
  rootElement
);
```

此时我们的页面上展示的就是绿色的 `Header 组件` 和 `Hello World`

因为定义了两个相同的 title class，虽然是在不同的组件中导入，但是他们的类名是一样的，最终都会在全局作用域下生效，因为这两个组件都渲染在了页面上。  
至于为什么会显示成绿色，因为 Header 组件是后导入的，所以 Header 的 title 样式就覆盖了 App 的 title 样式，这就是 CSS 层叠样式的概念了，此处不再赘述。（如果导入顺序换一下，那么就是红色了）

#### CSS Module 是怎么局部作用 CSS 样式的？

**答案**：产生局部作用域的唯一方法，就是使用一个独一无二的 class 的名字，不会与其他选择器重名。这就是 CSS Modules 的做法。

这里就拿 React 项目来进行解释

在 React 中，默认是开启 CSS Module 的。但是对于样式表文件的命名一个约束。需要以`.module.less/css/sass`结尾

随意我们就可以这样改造一下 Header 组件，来使用 CSS Module 的功能。

1. 重命名：Header.css -> Header.module.css

```css
.title {
  color: green;
}
```

2.修改 Header.js 中的导入

```javascript
import styles from "./Header.module.css";

export default function Header() {
  return <h2 className={styles.title}>Header 组件</h2>;
}
```

效果： `Header 组件` 展示为绿色；`Hello World`展示为红色。可以看到 Header 中相同类名的样式并没有影响到我们的 App 组件

此时在控制台中查看 HTML，发现我们 Header 组件中的 h2 标签上的 class 类名变成了`<h2class="_src_Header_module__title">Header 组件</h2>`

同理在样式表文件中也变成了

```css
._src_Header_module__title {
  color: green;
}
```

App 组件

```html
<div class="title"><h1>Hello World</h1></div>
```

```css
.title {
  color: red;
}
```

随机的 className 是可以配置的：通过 webpack.config.js 中配置 css-loader 的 localIdentName 选项来定义生成的随机类名

### 全局作用域(:global)

通常在我们的日常开发中有这种场景：  
我们有一个自己的组件，但是这个组件使用了一些第三方的组件库，对于我们使用的第三方组件我们又想修改一下它的样式。

如果此时，我们直接在当前组件的样式文件中，通过定义一个和第三方组件相同类名的类（比如说 antd button 的 antdr-btn 类），然后写自己的样式：

Button.module.css

```css
.antdr-btn {
  color: pink;
}
```

然后我在组件中导入

Button.js

```javascript
import styles from "./Button.module.css";
```

此时我们会发现我们的修改并没有生效，为什么呢？原因就是最后我们导入的类名会被 css-loader 处理成一个随机的值，所以导致不再是`antdr-btn`。

那么我们如何实现在自定义组件中修改第三方组件的样式呢？

**需要不对第三方组件的类名进行哈希，保留原始类名，才能起到样式覆盖的作用`:global`**

```css
:global(.antdr-btn) {
  color: red;
}
```

:global(.className)那么此时这个 className 即使是在组件的样式表中定义的也不会被添加 hash 值，所以就可以影响全局所有类名为 className 的样式

**注意：**

此时组件中对该类的样式修改会影响全局所有使用该类名的地方，所以为了将样式修改限制到本组件，一般推荐将:global 使用在组件自定义类名范围下，然后添加这个自定义类名到组件中

```sass
.Header {
  padding-bottom: 20px;
  /* stylelint-disable-next-line selector-class-pattern */
  :global(.antdr-tabs-nav) {
    padding: 0;
    background: #ffffff;
  }

}
```

CSS Modules 还提供一种显式的局部作用域语法:local(.className)，等同于.className（直接在样式文件中写.className）该类名在编译后会被添加 hash 值

### class 的组合

在 CSS Modules 中，一个选择器可以继承另一个选择器的规则，这称为"组合"。

在 Header.module.css 中，让.title 继承.back 。

Header.module.css

```css
.back {
  background-color: blue;
}
.title {
  composes: back;
  color: green;
}
```

Header.js

```javascript
import styles from "./Header.module.css";

export default function Header() {
  return <h2 className={styles.title}>Header 组件</h2>;
}
```

编译后

CSS

```css
._src_Header_module__back {
  background-color: blue;
}
._src_Header_module__title {
  color: green;
}
```

HTML

```html
<h2 class="_src_Header_module__title _src_Header_module__back">Header 组件</h2>
```

### 继承其他模块

选择器也可以继承其他 CSS 文件里面的规则。

other.module.css

```css
.other {
  background-color: chartreuse;
}
```

Header.module.css

```css
.title {
  composes: other from "./other.module.css";
  color: green;
}
```

**注意：**

导入的类名需要和被导入文件中的类名相同

编译之后的效果和 composes 同一个文件中的 class 效果相同

## CSS in JS

参考：

- [CSS-IN-JS_拾荒李的博客-CSDN博客_css in js](https://blog.csdn.net/woyebuzhidao321/article/details/121410908)

- [CSS in JS 简介 - 阮一峰的网络日志 (ruanyifeng.com)](http://www.ruanyifeng.com/blog/2017/04/css_in_js.html)

- [CSS in JS的好与坏 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/103522819)

React项目的CSS使用方法：

## CSS实现-视觉差滚动效果

利用

## CSS动画硬件加速-动画渲染优化属性（实现高性能CSS动画）

### 浏览器CSS动画渲染原理图示

![CSS动画浏览器渲染原理1.jpg](.\img\CSS动画浏览器渲染原理1.jpg)

![CSS动画浏览器渲染原理2.jpg](.\img\CSS动画浏览器渲染原理2.jpg)

### 浏览器CSS动画渲染调试

开发者工具-Performance-点击左上角刷新图标-整个动画过程被完整记录，可以点击上面的时间轴，记录了动画加载的过程

#### 浏览器渲染的阶段

**RECORDS**：

1. Function Call

2. Recalculate Style

3. LayoutPaint Setup

4. Paint

5. Composite Layers

---

### CSS Triggers

官方网址：[https://csstriggers.com/](https://wanghi.cn/go.php?https://csstriggers.com/)

简介描述：提供在线的页面解析参考，**CSS动画的各个属性在各个浏览器内核渲染的步骤**

CSS Triggers提供在线的页面解析参考，程序员可通过此参考了解哪些CSS属性触发了重绘和合成，但不引发布局，这些是浏览器在渲染网页时的执行过程。

**Layout**：浏览器生成每个元素的几何形状和位置

**Paint**：浏览器将每个元素的像素解析为图层

**Composite**：浏览器在屏幕上绘制图层。

合成操作是浏览器执行的最廉价操作，如果你的CSS动画的代码反复触发合成和重绘操作的属性，则很难将60fps(每秒帧数)作为平滑网页动画的关键数字。

---

### 做动画尽量使用的属性：只执行 Composite Layer 阶段，执行效率高

- 3d或者perspective、transform 属性

- 使用 animation，transition 改变 opacity，transform的元素

- video、canvas、flash、CSS filters 等

---

### 硬件加速

当我们需要高频交互的CSS动画时候，我们需要考虑使用css3硬件加速。

- css3硬件加速又叫做GPU加速，是利用GPU进行渲染，减少CPU操作的一种优化方案。

- 浏览器首先将页面解析成DOM树，DOM树和CSS让浏览器构建渲染树，渲染树包括渲染对象。

- 每个渲染对象会被分配到一个图层中，每个图层会被更新到GPU中，由于GPU中的transform等CSS属性不触发repaint，因此不需要重绘，单独处理，所以能大大提高网页的性能。

- 当浏览器引擎检测到页面中某个MOD元素应用了某些CSS规则时候就会开启，最显著的特征的元素是3D变换。

- 页面css做图片滑动，滚动，特别是手机端，可能出现卡顿，闪白等情况，解决这些动画卡顿的情况，我们通常可以采用GPU加速的方式。

- 由于 GPU 中的 transform 等 CSS 属性不会触发 repaint，所以能大大提高网页的性能。

---

- GPU擅长对 texture 进行偏移、放大缩小、旋转等

- GPU 渲染时跳过 Layout、paint 阶段，只触发Composite，速度极快

**开启硬件加速**：

CSS 中的以下几个属性能触发硬件加速：

```css
transform

opacity

filter

will-change
```

**强行开始加速**：

如果有一些元素不需要用到上述属性，但是需要触发硬件加速效果，可以使用一些小技巧来诱导浏览器开启硬件加速

- transform：translate3d(0,0,0);

- ```css
  .haorooms_element {
      -webkit-transform: translateZ(0);
      -moz-transform: translateZ(0);
      -ms-transform: translateZ(0);
      -o-transform: translateZ(0);
      transform: translateZ(0); 
      /**或者**/
      transform: rotateZ(360deg);
      transform: translate3d(0, 0, 0);
  }
  ```

- 通过-webkit-transform:transition3d/translateZ开启GPU硬件加速之后，有些时候可能会导致浏览器频繁闪烁或抖动，可以尝试以下办法解决之：
  
  ```css
  -webkit-backface-visibility:hidden;
  -webkit-perspective:1000;
  ```

- 通过-webkit-transform:transition3d/translateZ开启GPU硬件加速的适用范围：
  
  > 1、使用很多大尺寸图片(尤其是PNG24图)进行动画的页面。
  >
  > 2、页面有很多大尺寸图片并且进行了css缩放处理，页面可以滚动时。
  >
  > 3、使用background-size:cover设置大尺寸背景图，并且页面可以滚动时。
  >
  > 4、编写大量DOM元素进行CSS3动画时(transition/transform/keyframes/absTop&Left)。
  >
  > 5、使用很多PNG图片拼接成CSS Sprite时。

**注意问题**：

- 1、过多的使用GPU处理会导致内存问题，可能导致浏览器崩溃。

- 2、在GPU渲染字体会导致抗锯齿无效，因为GPU和CPU的算法不同，因此即使最终硬件加速停止了，文本还是会在动画期间显示的很模糊，尽量不要包含文字。

现在，像Chrome、FireFox、Safari、IE9+和最新版本的Opera都支持硬件加速，当它们检测到页面中某个DOM元素应用了某些CSS规则时就会开启，最显著的特征的元素的3D变换。

---

### will-change属性

will-change文档：[will-change - CSS（层叠样式表） | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/CSS/will-change)

#### 1、will-change是做什么的呢?

CSS 是用来描述结构化文档（如HTML、[XML](https://so.csdn.net/so/search?q=XML&spm=1001.2101.3001.7020)）怎样渲染的语言。

CSS渲染器在渲染属性前，会有个准备的过程。有些属性需要css渲染器事先做很多准备才能实现渲染。这就容易导致页面出现卡顿，交互体验不好等问题。

如果设置了 will-change 属性，那么浏览器就可以提前知道哪些元素的属性将会改变，提前做好准备。待需要改变元素的时机到来时，就可以立刻实现它们。从而避免卡顿等问题。

> 例如，使用 3D Transforms 让元素在屏幕上移动时，此元素和它的上下文会被提到另一个“层”，独立于其它元素被渲染。这样那些不变的元素就能避免被重复渲染。这可以显著提高性能。

然而，将元素提取到一个新层，相对来说是代价较高的操作。这可能使 transform 动画延迟几百毫秒。

**总结**：增强页面渲染性能

#### 2、怎么用

下面是一个使用脚本应用 will-change 属性的例子：

> ```js
> var el = document.getElementById('element');
> // 当鼠标移动到该元素上时给该元素设置 will-change 属性
> el.addEventListener('mouseenter', hintBrowser);
> // 当 CSS 动画结束后清除 will-change 属性
> el.addEventListener('animationEnd', removeHint);
> function hintBrowser () {
>     // 填写上那些你知道的，会在 CSS 动画中发生改变的 CSS 属性名们
>     this.style.willChange = 'transform, opacity';
> }
> function removeHint() {
>     this.style.willChange = 'auto';
> }
> ```

##### 语法说明

> ```css
> Formal syntax: auto | <animateable-feature>#
> <animateable-feature> = scroll-position | contents | <custom-ident>
> ```

语法：

> ```css
> /* 关键字值 */
> will-change: auto;
> will-change: scroll-position;
> will-change: contents;
> will-change: transform;        /* <custom-ident>示例 */
> will-change: opacity;          /* <custom-ident>示例 */
> will-change: left, top;        /* 两个<animateable-feature>示例 */
> 
> /* 全局值 */
> will-change: inherit;
> will-change: initial;
> will-change: unset;
> ```

###### auto

**浏览器会根据情况，自行进行优化。**

###### scroll-position

**表示开发者将要改变元素的滚动位置。**

> 例如，浏览器通常仅呈现可滚动元素“滚动窗口”中的内容。而某些内容超过该窗口。如设置了此值，浏览器将扩展呈现“滚动窗口”周围的内容，从而顺利地进行更长、更快的滚动。

###### content

**表示开发者将要改变元素的内容。**

> 例如，浏览器常将大部分不经常改变的元素缓存下来。但如果一个元素的内容不断发生改变，那么产生和维护这个缓存就是在浪费时间。此属性值可以减少浏览器对元素的缓存，或者完全避免缓存。变为从始至终都重新渲染元素。

注意：这个值会被应用到它所声明元素的子节点。在文档树较高的节点上使用，可能会对页面性能造成很大的影响。尽量在文档树最末端使用。

###### [custom-ident]

**表示开发者将要改变的元素属性。如果给定的值是缩写，则默认被扩展全。**

> 例如，设置 will-change: background 将会被补全 background 的所有属性 will-change: background-image, background-position, ...

###### [animateable-feature]

**表示可以动画的一些特征值。比如：left、top、margin等。**

---

will-change虽然可以加速，但是，一定一定要适度使用。遵循最小化影响原则。

可以让父元素hover的时候，声明will-change，这样，移出的时候就会自动remove，触发的范围基本上是有效元素范围。

```css
.will-change-parent:hover .will-change {
  will-change: transform;
}
.will-change {
  transition: transform 0.3s;
}
.will-change:hover {
  transform: scale(1.5);
}
```

如果使用JS添加will-change, 事件或动画完毕，一定要及时remove. 比方说点击某个按钮，其他某个元素进行动画。点击按钮(click)，要先按下(mousedown)再抬起才出发。因此，可以mousedown时候提示浏览器准备GPU加速, 动画结束自带回调，移除GPU加速：

```css
dom.onmousedown = function() {
    target.style.willChange = 'transform';
};
dom.onclick = function() {
    // target动画哔哩哔哩...
};
target.onanimationend = function() {
    // 动画结束回调，移除will-change
    this.style.willChange = 'auto';
};
```

#### 3、使用时须注意的几点

##### **1、不要在过多的属性和元素上使用 will-change**

> ```css
> * { will-change: transform, opacity /*, ...*/; }
> ```

你可能会觉得这么做不错，就可以优化一切属性了。

其实并非如此。

will-change 可能会引发一些十分耗费资源的优化措施。如果像上边这样给所有元素都添加，可能会使页面变慢，甚至崩溃。

##### **2、在元素属性变化完成后最好移除 will-change 属性**

有些情况，可以不移除。

比如，给页面中少量的元素使用 will-change 属性能使交互体验更好。

> ```css
> body > .sidebar {
> will-change: transform;
> /*当鼠标移动到侧边栏时，会有滑动效果*/
> }
> ```

因为只在很少的元素上使用，所以它所能产生的副作用可以忽略不计。

当变化很频繁时也可以不移除。例如，鼠标移动产生的变化，或者持续存在的动画效果。此时设置 will-change 属性，其实就是在提示浏览器，这些元素会持续或有规律的发生变化，要保持对它们的优化。

> ```css
> .cats-flying-around-the-screen {
> will-change: left, top;
> } 
> ```

##### **3、给 will-change 属性足够的时间做准备**

如果在动画开始的那一刻才添加 will-change 属性，是没有优化效果的。一些优化是需要充分的准备时间的.如果没有足够的时间，那 will-change 所能提高的性能也就无从谈起。所以要找到添加 will-change 属性的时机。

> 比如，当一个元素被点击时发生变化。那么就可以在 hover 事件上设置 will-change 属性。这能给浏览器提供大概200毫秒准备时间。因为相较之下，人类的响应速度较慢。这可以通过脚本或者简单的CSS来实现。
>
> ```css
> .element { transition: opacity .2s; opacity: 1; }
> .element:hover { will-change: opacity; }
> .element:active { opacity: .3; }
> ```

如果变化是发生在触发 hover 事件时，上边的做法就无法起到优化作用了。但还是可以找到恰当的时机的。比如在祖先元素上设置 will-change 属性，就可以给浏览器预留足够的准备时间。

> ```css
> .element { transition: opacity .2s; opacity: 1; }
> .container:hover > .element { will-change: opacity; }
> .element:hover { opacity: .3; }
> ```

#### will-change的兼容性一览

["will-change" | Can I use... Support tables for HTML5, CSS3, etc](https://caniuse.com/?search=will-change)

---

#### 使用硬件加速的注意事项

内存。如果GPU加载了大量的纹理，那么很容易就会发生内容问题，这一点在移动端浏览器上尤为明显，所以，一定要牢记不要让页面的每个元素都使用硬件加速。

使用GPU渲染会影响字体的抗锯齿效果。这是因为GPU和CPU具有不同的渲染机制。即使最终硬件加速停止了，文本还是会在动画期间显示得很模糊。
