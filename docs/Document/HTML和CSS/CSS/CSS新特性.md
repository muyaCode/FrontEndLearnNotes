# CSS新特性

新的特性，最近发表的特性，对于旧版本的浏览器或者部分浏览器不支持，或者不兼容，酌情使用

HTML+CSS+JavaScript兼容性查询网站：[Can I use... Support tables for HTML5, CSS3, etc](https://caniuse.com/ciu/about)

可以快速可视化哪些前端技术与哪些浏览器兼容

直接从CanIUse网站查看支持表外，还有一个为喜欢命令行工具的用户提供的选项。这个设置非常简单。首先，您需要确保安装了Node.js，它是npm预打包的。要检查是否已经安装了npm，只需在CLI中运行npm -v。

```shell
npm install -g caniuse-cmd
caniuse preload
```

![](https://www.11meigui.com/wp-content/uploads/2020/03/caniuse-preload-1024x50.png)

还有许多选项可以根据个人喜好和所需的信息来使用。这些内容包括:  

—short， -s short输出:一行显示浏览器，不显示注释或描述(显示多个结果时默认)[布尔值]  

—long， -l long输出:显示更多信息(显示单个结果时的默认值)[布尔值]  

—oneline， -1单行输出:只有全局百分比，没有每个浏览器的信息

---

**CSS** 的**2019-2022年**的新特性发展状态报告：

[The State of CSS 2019](https://2019.stateofcss.com/tw/)

[The State of CSS 2020](https://2020.stateofcss.com/zh-Hans/)

[The State of CSS 2021](https://2021.stateofcss.com/zh-Hans/)

[The State of CSS 2022](https://2022.stateofcss.com/en-US/)

---

CSS新特性文章参考：

2017：

- [2017 年值得学习的 3 个 CSS 新特性 - 掘金 (juejin.cn)](https://juejin.cn/post/6844903480100913166)

- [css3新特性汇总 - 掘金 (juejin.cn)](https://juejin.cn/post/6844903518931795982)

2019：

- [CSS3 和 HTML5 新特性一览 - 掘金 (juejin.cn)](https://juejin.cn/post/6844903829679390728)

- [2019年这1年多学到的CSS新特性 | 掘金年度征文 - 掘金 (juejin.cn)](https://juejin.cn/post/6844904033149255688)

- [CSS3 新特性 - 掘金 (juejin.cn)](https://juejin.cn/post/6844904033870675981)

2020：

- [2020不容错过！24个CSS新特性来了 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/267066908)

2021：

- [详解16个CSS新特性（2021最新版-下）](https://blog.csdn.net/Taobaojishu/article/details/120574222)

- [超详|2020年你不应该错过的CSS新特性 - 掘金 (juejin.cn)](https://juejin.cn/post/6886258269137043464)

- [一起了解一下css新特性@property - 掘金 (juejin.cn)](https://juejin.cn/post/7007336931092594701)

- [5个你已经可以尝试的css新特性 (gxlsystem.com)](https://www.gxlsystem.com/qianduan-8992.html)

- [CSS新特性contain，控制页面的重绘与重排 - 掘金 (juejin.cn)](https://juejin.cn/post/6958990366888607757)

- [2021年你可能不知道的 CSS 特性（下篇） - 掘金 (juejin.cn)](https://juejin.cn/post/6978647140910727176)

2022：

- [2022年你不知道的CSS新特性_wei佳的博客-CSDN博客_css 2022新特性](https://blog.csdn.net/weixin_47426048/article/details/125594552)

- [2022年CSS的6个新特性，赶快来了解一下（看过就会的那种） - 掘金 (juejin.cn)](https://juejin.cn/post/7108549853969383455)

- [2022年你不应该错过的CSS新特性 - 掘金 (juejin.cn)](https://juejin.cn/post/7073291417728057381)

- [2022年你不知道的CSS新特性 - 掘金 (juejin.cn)](https://juejin.cn/post/7103409377821851662)

- [都2022年了，还不知道这几个CSS特性该out了 - 掘金 (juejin.cn)](https://juejin.cn/post/7118892686861402120)

## CSS 变量

### 一、变量的声明

声明变量的时候，变量名前面要加两根连词线（`--`）。

```css
body {
  --foo: #7F583F;
  --bar: #F7EFD2;
}
```

上面代码中，`body`选择器里面声明了两个变量：`--foo`和`--bar`。

它们与`color`、`font-size`等正式属性没有什么不同，只是没有默认含义。所以 CSS 变量（CSS variable）又叫做**"CSS 自定义属性"**（CSS custom properties）。因为变量与自定义的 CSS 属性其实是一回事。

你可能会问，为什么选择两根连词线（`--`）表示变量？因为`$foo`被 Sass 用掉了，`@foo`被 Less 用掉了。为了不产生冲突，官方的 CSS 变量就改用两根连词线了。

各种值都可以放入 CSS 变量。

```css
:root{
  --main-color: #4d4e53;
  --main-bg: rgb(255, 255, 255);
  --logo-border-color: rebeccapurple;

  --header-height: 68px;
  --content-padding: 10px 20px;

  --base-line-height: 1.428571429;
  --transition-duration: .35s;
  --external-link: "external link";
  --margin-top: calc(2vh + 20px);
}
```

变量名大小写敏感，`--header-color`和`--Header-Color`是两个不同变量。

### 二、var() 函数

`var()`函数用于读取变量。

```css
a {
  color: var(--foo);
  text-decoration-color: var(--bar);
}
```

`var()`函数还可以使用第二个参数，表示变量的默认值。如果该变量不存在，就会使用这个默认值。

```css
color: var(--foo, #7F583F);
```

第二个参数不处理内部的逗号或空格，都视作参数的一部分。

```css
var(--font-stack, "Roboto", "Helvetica");
var(--pad, 10px 15px 20px);
```

`var()`函数还可以用在变量的声明。

```css
:root {
  --primary-color: red;
  --logo-text: var(--primary-color);
}
```

注意，变量值只能用作属性值，不能用作属性名。

```css
.foo {
  --side: margin-top;
  /* 无效 */
  var(--side): 20px;
}
```

上面代码中，变量`--side`用作属性名，这是无效的。

### 三、变量值的类型

如果变量值是一个字符串，可以与其他字符串拼接。

```css
--bar: 'hello';
--foo: var(--bar)' world';
```

利用这一点，可以 debug（[例子](https://codepen.io/malyw/pen/oBWMOY)）。

```css
body:after {
  content: '--screen-category : 'var(--screen-category);
}
```

如果变量值是数值，不能与数值单位直接连用。

```css
.foo {
  --gap: 20;
  /* 无效 */
  margin-top: var(--gap)px;
}
```

上面代码中，数值与单位直接写在一起，这是无效的。必须使用`calc()`函数，将它们连接。

```css
.foo {
  --gap: 20;
  margin-top: calc(var(--gap) * 1px);
}
```

如果变量值带有单位，就不能写成字符串。

```css
/* 无效 */
.foo {
  --foo: '20px';
  font-size: var(--foo);
}

/* 有效 */
.foo {
  --foo: 20px;
  font-size: var(--foo);
}
```

### 四、作用域

同一个 CSS 变量，可以在多个选择器内声明。读取的时候，优先级最高的声明生效。这与 CSS 的"层叠"（cascade）规则是一致的。

下面是一个[例子](http://jsbin.com/buwahixoqo/edit?html,css,output)。

```html
<style>
  :root { --color: blue; }
  div { --color: green; }
  #alert { --color: red; }
  * { color: var(--color); }
</style>

<p>蓝色</p>
<div>绿色</div>
<div id="alert">红色</div>
```

上面代码中，三个选择器都声明了`--color`变量。不同元素读取这个变量的时候，会采用优先级最高的规则，因此三段文字的颜色是不一样的。

这就是说，变量的作用域就是它所在的选择器的有效范围。

```css
body {
  --foo: #7F583F;
}

.content {
  --bar: #F7EFD2;
}
```

上面代码中，变量`--foo`的作用域是`body`选择器的生效范围，`--bar`的作用域是`.content`选择器的生效范围。

由于这个原因，全局的变量通常放在根元素`:root`里面，确保任何选择器都可以读取它们。

```css
:root {
  --main-color: #06c;
}
```

### 五、响应式布局

CSS 是动态的，页面的任何变化，都会导致采用的规则变化。

利用这个特点，可以在响应式布局的`media`命令里面声明变量，使得不同的屏幕宽度有不同的变量值。

```css
body {
  --primary: #7F583F;
  --secondary: #F7EFD2;
}

a {
  color: var(--primary);
  text-decoration-color: var(--secondary);
}

@media screen and (min-width: 768px) {
  body {
    --primary:  #F7EFD2;
    --secondary: #7F583F;
  }
}
```

### 六、兼容性处理

对于不支持 CSS 变量的浏览器，可以采用下面的写法。

```css
a {
  color: #7F583F;
  color: var(--primary);
}
```

也可以使用`@support`命令进行检测。

```css
@supports ( (--a: 0)) {
  /* supported */
}

@supports ( not (--a: 0)) {
  /* not supported */
}
```

### 七、JavaScript 操作

JavaScript 也可以检测浏览器是否支持 CSS 变量。

```javascript
const isSupported =
  window.CSS &&
  window.CSS.supports &&
  window.CSS.supports('--a', 0);

if (isSupported) {
  /* supported */
} else {
  /* not supported */
}
```

JavaScript 操作 CSS 变量的写法如下。

```javascript
// 设置变量
document.body.style.setProperty('--primary', '#7F583F');

// 读取变量
document.body.style.getPropertyValue('--primary').trim();
// '#7F583F'

// 删除变量
document.body.style.removeProperty('--primary');
```

这意味着，JavaScript 可以将任意值存入样式表。下面是一个监听事件的例子，事件信息被存入 CSS 变量。

```javascript
const docStyle = document.documentElement.style;

document.addEventListener('mousemove', (e) ={
  docStyle.setProperty('--mouse-x', e.clientX);
  docStyle.setProperty('--mouse-y', e.clientY);
});
```

那些对 CSS 无用的信息，也可以放入 CSS 变量。

```css
--foo: if(x 5) this.width = 10;
```

上面代码中，`--foo`的值在 CSS 里面是无效语句，但是可以被 JavaScript 读取。这意味着，可以把样式设置写在 CSS 变量中，让 JavaScript 读取。

所以，CSS 变量提供了 JavaScript 与 CSS 通信的一种途径。

## 
