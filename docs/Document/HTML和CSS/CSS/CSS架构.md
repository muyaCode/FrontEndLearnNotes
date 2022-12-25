# CSS架构

掌握各种 CSS 设计模式、解决难复用、难扩展等问题

企业级别 CSS 架构

扩展各种 CSS 奇淫巧技，发挥 CSS 的威力

## CSS 的设计模式

### OOCSS：面向对象的CSS开发模式

文档参考：[OOCSS - The Future of Writing CSS - KeyCDN](https://www.keycdn.com/blog/oocss)

文章：[首页 ·stubbornella/oocss Wiki (github.com)](https://github.com/stubbornella/oocss/wiki)

OO：面向对象，OOCSS：面向对象的CSS开发模式

Object Oriented CSS 面向对象的CSS

#### 1.容器与内容分离

容器与内容分离模式：样式在任何容器中都可以复用

```html
<!-- post中的metadata -->
<div class="post">
  <p class="metadata">
    <a>哈哈哈</a><a>2022-12-25</a>
  </p>
</div>
<!-- comment中的metadata -->
<div class="comment">
  <p class="metadata">
    <a>嘿嘿嘿</a></a></a><a>2022-12-25</a>
  </p>
</div>
```

分别写各自的CSS

```css
.post {}
.comment{}
.metadata {}
```

#### 2.结构（基础对象） 与 皮肤（对象）分离

符合面向对象的CSS开发模式：Vue的各种UI组件库的样式都符合这个模式

```html
<div class="menu fix2"></div>
```

css

```css
/* 基础组件  */
.menu {
  color: green;
  font-size: 14px;
}
/* 分离和新加入覆盖模式 */
.fix2 {
  font-size: 16px;
}
```

#### 3.面向设计开发的CSS

后面的文档说的都是面向设计模式开发 的 CSS 思想

---

## AMCSS

官网文档：[AMCSS - Attribute Modules for CSS](https://amcss.github.io/)

**Attribute Modules for CSS CSS的属性模块**

AM是一种使用HTML 属性及其值而非样式元素的类的技术。这样，每个属性都可以有效地声明一个单独的命名空间来封装样式信息，从而使HTML和CSS更具可读性和可维护性。

**简单来说就是通过css属性选择器来模块化CSS**

优势：属性值得灵活性，相当于通过属性值来增加命名空间，减少全局名称空间，以便更好的将css模块化

```html
  <div am-blockName>
    <div am-blockname-chilElement></div>
    <p am-tritName="one two">hello</p>
  </div>
```

```css
[am-blockName] {
  width: 500px;
}

[am-blockname-chilElement] {
  height: 50px;
}

[am-tritName~="one"] {
  font-size: 30px;
}
```

## CSS-BEM：CSS命名规范

**BEM官网**：[BEM](https://en.bem.info/)

参考文章：[2020年你还没用BEM？_前端秀儿的博客-CSDN博客_bem.js](https://blog.csdn.net/Jsoning/article/details/103767210)

- `BEM`中块、元素、修饰器的命名如果存在多个单词使用`- 单中划线`连接
  
  - `B`意思是`（Block） 块`，`E`意思是`（Element）元素`，`M`意思是`（Modifier）修饰器`
    
    - > "-" 中划线 ：仅作为连字符使用，表示某个块或者某个子元素的多单词之间的连接记号。
      
      > "--" 双中划线 ：用来连接 块或元素与修饰器
      
      > "__" 双下划线：用来连接 块和块或元素的子元素
      
      > "_" 单下划线：用来描述一个块或者块的子元素的一种状态

- BEM 是一个简单又非常有用的命名约定。让你的前端代码更容易阅读和理解，更容易协作，更容易控制，更加健壮和明确，而且更加严密。

> 可以通过阅读`Element-UI`源码来分析学习`BEM`规范，使用BEM规范语义化更加鲜明，阅读更容易理解

`BEM`中块、元素、修饰器的命名如果存在多个单词使用`- 单中划线`连接

```css
.button {} /*基础按钮*/

/*通过双中划线连接修饰器 这样语义化更加鲜明*/
.button--state-success {} /*状态为成功的button*/
.footer__button{} /*底部按钮样式*/
.footer__button--state-success{} /*底部状态为成功的按钮样式*/
/*state-success 多个单词直接使用-连接*/
```

- 每一个块(block)名应该有一个命名空间（前缀）
  - `block` 代表了更高级别的抽象或组件：如button、footer。
  - `block__element` 代表 .block 的后代，用于形成一个完整的 .block 的整体。
  - `block--modifier` 代表 .block 的不同状态或不同版本。
    使用两个连字符和下划线而不是一个，是为了让你自己的块可以用单个连字符来界定。如：

```javascript
.sub-block__element {}

.sub-block--modifier {}
```

### BEM 命名法的好处

BEM的关键是，可以获得更多的描述和更加清晰的结构，从其名字可以知道某个标记的含义。于是，通过查看 HTML 代码中的 class 属性，就能知道元素之间的关联。

常规的命名法示例：

```javascript
<div class="article">
    <div class="body">
        <button class="button-primary"></button>
        <button class="button-success"></button>
    </div>
</div>
复制代码
```

- 这种写法从 DOM 结构和类命名上可以了解每个元素的意义，但无法明确其真实的层级关系。在 css 定义时，也必须依靠层级选择器来限定约束作用域，以避免跨组件的样式污染。

使用了 BEM 命名方法的示例：

```javascript
<div class="article">
    <div class="article__body">
        <div class="tag"></div>
        <button class="article__button--primary"></button>
        <button class="article__button--success"></button>
    </div>
</div>
复制代码
```

- 通过 BEM 命名方式，模块层级关系简单清晰，而且 css 书写上也不必作过多的层级选择

### 如何使用 BEM 命名法

#### 1.什么时候应该用 BEM 格式

- 使用 BEM 的诀窍是，你要知道什么时候哪些东西是应该写成 BEM 格式的。
  
  - 比如说同一个tab组件，有两种不同样式的UI写法
    
    - 不同的写法需要 --modifier 来取名连接命名，如参考elementUI的写法：
  
  - 

- 并不是每个地方都应该使用 BEM 命名方式。当需要明确关联性的模块关系时，应当使用 BEM 格式。
  
  - 比如只是一条公共的单独的样式，就没有使用 BEM 格式的意义：

```javascript
.hide {
    display: none !important;
}
```

#### 2.在 CSS 预处理器中使用 BEM 格式

- BEM 的一个槽点是，命名方式长而难看，书写不雅。相比 BEM 格式带来的便利来说，我们应客观看待。

- 而且，一般来说会使用通过 LESS/SASS 等预处理器语言来编写 CSS，利用其语言特性书写起来要简单很多。

以 LESS 为例：

```javascript
.article {
    max-width: 1200px;
    &__body {
        padding: 20px;
    }
    &__button {
        padding: 5px 8px;
        &--primary {background: blue;}
        &--success {background: green;}
    }
}
```

#### 3.流行框架的组件中使用 BEM 格式

- 在当前流行的 `Vue.js` / `React` / `Angular` 等前端框架中，都有 CSS 组件级作用域的编译实现，其基本原理均为利用 CSS 属性选择器特性，为不同的组件生成不同的属性选择器。

- 当你选择了这种局部作用域的写法时，在较小的组件中，BEM 格式可能显得没那么重要。但对于公共的、全局性的模块样式定义，还是推荐使用 BEM 格式。

- 另外，对于对外发布的公共组件来说，一般为了风格的可定制性，都不会使用这种局部作用域方式来定义组件样式。此时使用 BEM 格式也会大显其彩。

#### 4.避免 .block__el1__el2 的格式

- 在深层次嵌套的 DOM
- 结构下，应避免过长的样式名称定义。
- 层级最后不要超过 4 级，不然增加阅读的理解难度

#### 5.BEM命名太长

BEM的命名中包含了模块名，长长的命名会让HTML标签会显得臃肿。

其实每个使用BEM的开发团队多多少少会改变其命名规范，比如Instagram团队使用的驼峰式:

```css
.blockName-elementName--modifierName { /* ... */ }
```

还有单下划线：

```css
.block-name_element-name--modifierName { /* ... */ }
```

还有修饰器名用单横线连接：

```css
.blockName__elementName-modifierName { /* ... */ }
```

其实这些对缩短命名没有多大的帮助，但我们也无需担心文件体积的问题，由于服务端有gzip压缩，BEM命名相同的部分多，压缩下来的体积不会太大。另外现在都用IDE来编写代码了，有自动提示功能，也无须担心重复的输入过长的名字。

---

### 推荐写法和风格

block-name__element-name--modifier-name：模块名 + 元素名 + 修饰器名

```html
.form { }
.form--theme-xmas { }
.form--simple { }
.form__input { }
.form__submit { }
.form__submit--disabled { }

//对应的HTML结构如下：
<form class="form form--theme-xmas form--simple">
  <input class="form__input" type="text" />
  <input
    class="form__submit form__submit--disabled"
    type="submit" />
</form>
```

## SMACSS-CSS：样式模块分类处理

**官网文档**：[Book - Scalable and Modular Architecture for CSS (smacss.com)](http://smacss.com/book/)

**Scalable and Modular Architecture for CSS 可扩展和模块化的css架构**

SMACSS主要是介绍遵循SMACSS的基本规则和命名规则，按照SMACSS的规则，书写规范的CSS

### 类别

项目CSS的目录style下的分类：以下首字母新建文件夹时是小写

- Base：重置浏览器的样式

- Layout：页面布局样式（Vue项目里变成了组件，不需要在这里写）

- Modules：公共的复用的小模块样式（Vue项目里变成了组件，不需要在这里写）

- State：不同的状态效果的模块

- Theme：页面的颜色皮肤主题

好处：易维护、易复用、易扩展...

命名规范：

- .l-header：页面布局样式命名

- .is-hidden：状态样式效果命名

- theme-nav：皮肤样式命名

### 目的

使用类别主要是将重复的操作简化，减少代码量，简化维护，并提高用户体验的一致性

1. 基本规则（Base）
- css重置，设置css重置样式表
2. 布局规则（Layout）
- 将页面分为主要部分和次要部分，主要部分位于主要部分之间，因此布局样式分为主要样式和次要样式

- 主要部分使用id选择器，含有布局样式的话可以这么写（.l-fixed #header）
3. 模块规则（Module）
- 模块是页面中更离散的组件，可以是导航栏、对话框等等，模块位于lauout组件或其他组件内部

- 每个模块都应设计为作为独立组件存在。这样，页面将更加灵活。如果操作正确，则可以轻松地将模块移动到布局的不同部分，而不会中断。

- 请避免使用ID和元素选择器，而仅使用类名
4. 状态规则（State）
- 状态是增加和覆盖所有其他样式，例如打开关闭、正确和错误

- 可以使用!important

- 例如：is-、has-
5. 主题规则（Theme）
- 主题定义了颜色和图像，使您的应用程序或站点具有外观。将主题分成自己的样式集，可以轻松地为其他主题重新定义这些样式

## IT-CSS：CSS的分层处理

**官网**：[itcss, from CSS Wizardry](https://itcss.io/)

**参考GitHub收集的相关资源**：[ahmadajmi/awesome-itcss: 🤗 🎉 A curated list of awesome ITCSS articles, videos, and code examples (github.com)](https://github.com/ahmadajmi/awesome-itcss)

参考文章：[ITCSS：可扩展和可维护的CSS架构 - Xfive](https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture/)

**nverted Triangle CSS 倒三角CSS**

可扩展和可维护的CSS架构

层次比SMACSS分的更密

**ITCSS的主要原则之一是将CSS代码库分为几个部分（称为layer），这些部分采用倒三角形的形式：**

![ITCSS.png](D:\Code\[MyProject]\FrontEndLearnNotes\docs\Document\HTML和CSS\CSS\img\ITCSS.png)

**IT-CSS的层次：从上到下，下层永远继承它上面所有层次的样式**

- Settings：维护整个网站的样式变量，与预处理器一起使用，并包含字体，颜色定义等

- Tools：维护样式的工具库：全局使用的 mixin 和 function 功能。重要的是不要在前2层中输出任何CSS

- Generic：浏览器的默认样式重置-重置或规范化样式，框大小定义等。这是生成实际CSS的第一层

- Base：对一些元素进行定制化的设置-HTML元素（例如H1，A等）的样式。这些带有浏览器的默认样式，因此我们可以在此处重新定义它们

- Objects：定义未装饰设计模式的基于类的选择器，例如OOCSS已知的媒体对象组件：OOCSS（Vue项目中在Components组件目录替代）

- Components：特定的UI组件。这是我们大部分工作的地方，我们的UI组件通常由对象和组件组成：OOCSS（Vue项目中在Components组件目录替代）

- Trumps或者Utilities：权重比较高的样式：!important;     - 工具程序类能够覆盖三角形中之前发生的样式

## RSCSS：

GitHub：[rstacruz/rscss: Reasonable System for CSS Stylesheet Structure (github.com)](https://github.com/rstacruz/rscss)

官网：[ricostacruz.com/rscss](https://ricostacruz.com/rscss "https://ricostacruz.com/rscss")

## ACSS：一个样式属性对应一个类

[Tailwind CSS](https://www.tailwindcss.cn/)便是基于这个思想开发

- 好处：极强的复用性、维护成本低

- 坏处：破坏了 CSS 的语义化

## SUITCSS：基于组件的开发改善CSS创作体验

官网：[SUIT CSS: style tools for UI components](https://suitcss.github.io/)

**SUIT CSS是一种专注于为基于组件的开发改善CSS创作体验的方法**

基于组件的系统允许将松散耦合的独立单元实现和组合为定义明确的复合对象。组件已封装，但能够通过接口/事件进行互操作

**命名约定：**

**工具 class**

语法：u-[sm-|md-|lg-] utilityName使用驼峰式命名

```html
<div class="u-cf">
  <a class="u-floatLeft" href="{{url}}">
    <img class="u-block" src="{{src}}" alt="">
  </a>
  <p class="u-sizeFill u-textBreak">
    …
  </p>
</div>
```

**组件 （负责组件特定样式的css）**

语法：[-][-descendentName][–modifierName]

- namespace(命名空间 可选）

```css
.twt-Button { / * … * / }
.twt-Tabs { / * … * / }
```

- ComponentName（组件名称）
  使用驼峰式写法

```html
<article class="MyComponent"></article>
```

- descendentName（组件子节点名称）
  使用驼峰式写法

```html
<article class="Tweet">
  <div class="Tweet-bodyText"></div>
</article>
```

- modifierName（修饰符名称）
  用于描述组件修饰符，使用驼峰式写法

```html
<button class="Button Button--default"></button>
```

**变量**
语法：–ComponentName[-descendant|–modifier][-onState]-(cssProperty|variableName)

```css
:root {
   ---ComponentName-backgroundColor 
  --ComponentName-descendant-backgroundColor 
  --ComponentName--modifier-backgroundColor 
  --ComponentName-onHover-backgroundColor 
  --ComponentName-descendant-onHover-backgroundColor 
}
```

## 架构使用示例

CSS架构的GitHub例子：[vue3-css-framework](https://github.com/muyaCode/vue3-css-framework)

src\style\目录的样式

也可以看elementPlus源码

## 总结

各种CSS设计模式可以组合使用

都可以在`src/style`目录中新建使用个模块目录

## CSS资源

### CSS标准化

- [Normalize](https://github.com/necolas/normalize.css) - 一套提供较好的多浏览器默认样式一致性的CSS规范
- [Normalize-OpenType](https://github.com/kennethormandy/normalize-opentype.css) - 为Normalize.css添加了OpenType特性，如连字、字间距等等。
- [Reset](http://meyerweb.com/eric/tools/css/reset/) - 一套CSS标准，将全部的HTML元素调整到一致的基准线
- [sanitize.css](https://10up.github.io/sanitize.css/) - 一套可立即使用的，符合当今最优实践的CSS规范。

### 大型网站的CSS开发

- [Github 的 CSS方案](http://markdotto.com/2014/07/23/githubs-css/) by [Mark Otto](https://twitter.com/mdo).
- [CodePen 的 CSS 方案](http://codepen.io/chriscoyier/blog/codepens-css) by [Chris Coyier](https://twitter.com/chriscoyier).
- [Lonely Planet 的 CSS 方案](http://ianfeather.co.uk/css-at-lonely-planet/) by [Ian Feather](https://twitter.com/ianfeather).
- [Groupon 的 CSS方案](http://mikeaparicio.com/2014/08/10/css-at-groupon/) by [Mike Aparicio](https://twitter.com/peruvianidol).
- [Buffer 的 CSS 方案](http://blog.brianlovin.com/buffers-css/) by [Brian Lovin](https://twitter.com/brian_lovin).
- [HOOTSUITE 的 CSS 方案](http://code.hootsuite.com/css-at-hootsuite/) by Steve Mynett.
- [我们是如何精简 Trello 的 CSS 架构的](http://blog.trello.com/refining-the-way-we-structure-our-css-at-trello/) by [Bobby Grace](https://twitter.com/bobbygrace).
- [Bugsnag 的 CSS 架构](https://bugsnag.com/blog/bugsnags-css-architecture) by [Max Luster](https://twitter.com/maxluster).
- [Ghost 的 CSS 方案](http://dev.ghost.org/css-at-ghost/) by Paul Davis.
- [Medium 的 CSS 方案](https://medium.com/@fat/mediums-css-is-actually-pretty-fucking-good-b8e2a6c78b06) by [Jacob Thornton](https://twitter.com/fat).

### 代码风格指导

- [编写符合语言习惯的 CSS](https://github.com/necolas/idiomatic-css) by [Nicolas Gallagher](https://twitter.com/necolas).
- [CSS 指南](http://cssguidelin.es/) by [Harry Roberts](https://twitter.com/csswizardry).
- [Sass 指南](http://sass-guidelin.es/) by [Hugo Giraudel](https://twitter.com/HugoGiraudel).
- [Mark Otto 编写的风格指南，受「GitHub 风格」和「编写符合语言习惯的 CSS」所激发](http://codeguide.co/) by [Mark Otto](https://twitter.com/mdo).
- [ThinkUp 的 CSS 风格指导](https://github.com/ThinkUpLLC/ThinkUp/wiki/Code-Style-Guide:-CSS)，作者ThinkUp
- [Google 的 HTML/CSS 风格指导](http://google-styleguide.googlecode.com/svn/trunk/htmlcssguide.xml)
- [WordPress 的 CSS 代码标准](https://make.wordpress.org/core/handbook/coding-standards/css/)

### 风格指导

- [Atlassian 官方 UI 文档](https://docs.atlassian.com/aui/latest/)；
- [设计元素](http://rizzo.lonelyplanet.com/styleguide/design-elements/colours) by [lonely planet](http://www.lonelyplanet.com/).
- [GitHub 的 CSS 风格指导](https://github.com/styleguide/css)
- [Patterns](http://ux.mailchimp.com/patterns) by [MailChimp 的风格指南](http://mailchimp.com/).
- [Lighting Design System](https://www.lightningdesignsystem.com/) by [Salesforce 的风格指南](http://www.salesforce.com/).
- [SASS 风格指南](http://sass-lang.com/styleguide) by Sass team.
- [星巴克的风格指南](http://www.starbucks.com/static/reference/styleguide/) by [Starbucks](http://www.starbucks.com/).
- [关于网站风格指导的一些资源](http://styleguides.io/examples.html) by [Awesome people](https://github.com/maban/styleguides/graphs/contributors).

### CSS命名习惯和方式

- [Atomic OOBEMITSCSS](http://www.sitepoint.com/atomic-oobemitscss/)
- [BEM](https://en.bem.info/)
- [SMACSS](https://smacss.com/)
- [Point North](http://pointnorth.io/#base-browser-styling)
- [ITCSS](http://itcss.io/)
- [OOCSS](http://www.smashingmagazine.com/2011/12/12/an-introduction-to-object-oriented-css-oocss/)
- [Title CSS](http://www.sitepoint.com/title-css-simple-approach-css-class-naming/)
- [idiomatic-css](https://github.com/necolas/idiomatic-css)
- [Atomic Design](http://patternlab.io/resources.html)
- [SUIT CSS](https://github.com/suitcss/suit/blob/master/doc/naming-conventions.md#u-utilityname)
- [Kickoff CSS](https://trykickoff.github.io/learn/css.html#namingscheme)
