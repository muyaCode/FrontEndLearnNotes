import{_ as s,c as n,o as a,a4 as p}from"./chunks/framework.HaEZziQ1.js";const y=JSON.parse('{"title":"别人的面试总结","description":"","frontmatter":{},"headers":[],"relativePath":"Document/前端面试相关/别人的面试总结.md","filePath":"Document/前端面试相关/别人的面试总结.md","lastUpdated":null}'),l={name:"Document/前端面试相关/别人的面试总结.md"},e=p(`<h1 id="别人的面试总结" tabindex="-1">别人的面试总结 <a class="header-anchor" href="#别人的面试总结" aria-label="Permalink to &quot;别人的面试总结&quot;">​</a></h1><h2 id="面试中整理的面试题" tabindex="-1">面试中整理的面试题 <a class="header-anchor" href="#面试中整理的面试题" aria-label="Permalink to &quot;面试中整理的面试题&quot;">​</a></h2><p>接下来就是在这6家公司面试中遇到的问题了。</p><h3 id="一、公司一" tabindex="-1">一、公司一 <a class="header-anchor" href="#一、公司一" aria-label="Permalink to &quot;一、公司一&quot;">​</a></h3><h4 id="_1、机试" tabindex="-1">1、机试 <a class="header-anchor" href="#_1、机试" aria-label="Permalink to &quot;1、机试&quot;">​</a></h4><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="color:#61AFEF;">1、把一个url拆解成origin、文件名、hash拆解成示例的格式。</span></span>
<span class="line"><span style="color:#61AFEF;">2、两个数组合并成一个数组，并进行算法优化。</span></span>
<span class="line"><span style="color:#61AFEF;">3、设置值的时候是数字，输出的时候变成百分号的格式。</span></span>
<span class="line"><span style="color:#61AFEF;">4、首屏优化的方案，分别从代码、网络和缓存说一下。</span></span>
<span class="line"><span style="color:#61AFEF;">5、如果一次性增加100万个用户访问项目，前端角度你会怎么优化。</span></span>
<span class="line"><span style="color:#61AFEF;">6、分别用es5和es6的方式解决一个继承问题</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h4 id="_2、现场面试" tabindex="-1">2、现场面试 <a class="header-anchor" href="#_2、现场面试" aria-label="Permalink to &quot;2、现场面试&quot;">​</a></h4><p>第一轮的机试过了，约了下周进行面试。</p><p>双休在知乎上搜了一下这家公司，网上风评不太好，技术栈也不是我熟悉的，就拒绝了接下来的面试。</p><h3 id="二、公司二" tabindex="-1">二、公司二 <a class="header-anchor" href="#二、公司二" aria-label="Permalink to &quot;二、公司二&quot;">​</a></h3><h4 id="_1、一面" tabindex="-1">1、一面 <a class="header-anchor" href="#_1、一面" aria-label="Permalink to &quot;1、一面&quot;">​</a></h4><div class="language-css line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="color:#ABB2BF;">1</span><span style="color:#C678DD;">、简单的介绍一下你自己</span></span>
<span class="line"><span style="color:#C678DD;">2、你们这项项目中有微信公众号、后台管理端、医生app端和小程序端，有没有提炼出一些公共的工具js，怎么提炼的？</span></span>
<span class="line"><span style="color:#C678DD;">3、你们的git分支管理是怎么样的？</span></span>
<span class="line"><span style="color:#C678DD;">4、你在做完前端项目之后，一般都会写哪些文档，readme里面写一些什么？</span></span>
<span class="line"><span style="color:#C678DD;">5、你做完一个项目之后写一些什么内容，让接手你的人能够看懂你的项目架构，并且迅速上手？</span></span>
<span class="line"><span style="color:#C678DD;">6、你基于你的脚手架做了哪些优化？</span></span>
<span class="line"><span style="color:#C678DD;">7、你们的项目文档一般都要记录哪些基本的东西？</span></span>
<span class="line"><span style="color:#C678DD;">8、有在项目中遇到过xss攻击吗？</span></span>
<span class="line"><span style="color:#C678DD;">9、你这个错误数据上报了哪些数据，怎么实现的？</span></span>
<span class="line"><span style="color:#C678DD;">10、成功抵御过多次攻击能具体说一说吗？</span></span>
<span class="line"><span style="color:#C678DD;">11、说一下你在项目中遇到印象深刻的项目场景，并且怎么解决的？</span></span>
<span class="line"><span style="color:#C678DD;">12、能说一下session跟jwt的优缺点吗？</span></span>
<span class="line"><span style="color:#C678DD;">13、你说用户登录之后要在session中加入user_name，为什么要增加？</span></span>
<span class="line"><span style="color:#C678DD;">14、jwt的整个流程怎么实现的？</span></span>
<span class="line"><span style="color:#C678DD;">15、实现jwt的实现遇到什么困难了吗？</span></span>
<span class="line"><span style="color:#C678DD;">16、如果同一部手机用户A登录了，更换了B登录，此时使用jwt会出现什么问题？</span></span>
<span class="line"><span style="color:#C678DD;">  - 我觉得这里他给挖坑了，B登录了之后就会返回B用户的token，然后请求头带着的就是B的token，验证到的用户也就是B，我认为没有问题啊。我不太清楚他说的可能会有什么问题值啥情况，可能是我考虑不周全，如果有网友知道可以提醒一下我他想问的答案，让我学习一下。</span></span>
<span class="line"><span style="color:#C678DD;">17、当线上出了紧急bug的时候，你们是怎么处理的？</span></span>
<span class="line"><span style="color:#C678DD;">18、你们团队成员是怎么配合完成任务的？</span></span>
<span class="line"><span style="color:#C678DD;">19、你近2年的职业规划？</span></span>
<span class="line"><span style="color:#C678DD;">20、还有什么想问我的吗？</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><p>问的一些问题偏向于后端，面试官大概是java工程师吧。然后从团队管理、怎么让新来的成员快速接手项目、文档方便的管理等等；前端技术问题整个面试过程中占比不大。</p><p>看得出来至少要在团队管理方面有比较深的总结，并且对于团队管理积累上，自己有独有的见解，一面才能面试通过。</p><p>一面就败了的原因，主要偏向于管理方面的经验，这部分我总结比较少。</p><p>另一方面，我觉得有可能招聘单位也没太想清楚要招聘怎样的人吧，时间过去了半年，我今天刷了一下boss直聘，发现这家公司的招聘信息还挂着，人事活跃时间也是几分钟前。</p><h3 id="三、公司三" tabindex="-1">三、公司三 <a class="header-anchor" href="#三、公司三" aria-label="Permalink to &quot;三、公司三&quot;">​</a></h3><h4 id="_1、一面开始" tabindex="-1">1、一面开始 <a class="header-anchor" href="#_1、一面开始" aria-label="Permalink to &quot;1、一面开始&quot;">​</a></h4><div class="language-kotlin line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">kotlin</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="color:#D19A66;">1</span><span style="color:#ABB2BF;">、事件循环的机制了解吗？宏任务和微任务的执行顺序是怎样的？</span></span>
<span class="line"><span style="color:#D19A66;">2</span><span style="color:#ABB2BF;">、怎么理解闭包这个定义的，在平时工作中有用到闭包的使用吗，举个例子。</span></span>
<span class="line"><span style="color:#D19A66;">3</span><span style="color:#ABB2BF;">、vue组件间的哪些通信方式？</span></span>
<span class="line"><span style="color:#D19A66;">4</span><span style="color:#ABB2BF;">、一个父组件潜嵌套了子组件，他的生命周期函数顺序是怎么执行的？</span></span>
<span class="line"><span style="color:#D19A66;">5</span><span style="color:#ABB2BF;">、vue的权限管理应该怎么做？路由级和按钮级分别怎么处理？</span></span>
<span class="line"><span style="color:#D19A66;">6</span><span style="color:#ABB2BF;">、说一下你对虚拟DOM的理解</span></span>
<span class="line"><span style="color:#D19A66;">7</span><span style="color:#ABB2BF;">、了解diff算法吗？vue的diff算法是怎样的一个过程</span></span>
<span class="line"><span style="color:#D19A66;">8</span><span style="color:#ABB2BF;">、能说一下v</span><span style="color:#56B6C2;">-</span><span style="color:#ABB2BF;">for中key的作用吗？</span></span>
<span class="line"><span style="color:#D19A66;">9</span><span style="color:#ABB2BF;">、做过vue项目哪些性能方面的优化？</span></span>
<span class="line"><span style="color:#D19A66;">10</span><span style="color:#ABB2BF;">、vue组件为什么只能有一个根元素？</span></span>
<span class="line"><span style="color:#D19A66;">11</span><span style="color:#ABB2BF;">、如何实现路由懒加载呢？</span></span>
<span class="line"><span style="color:#D19A66;">12</span><span style="color:#ABB2BF;">、客户端渲染和服务端渲染有什么区别呢？在之前的工作中有做过服务端渲染吗？</span></span>
<span class="line"><span style="color:#D19A66;">13</span><span style="color:#ABB2BF;">、Vue长列表的优化方式怎么做？</span></span>
<span class="line"><span style="color:#D19A66;">14</span><span style="color:#ABB2BF;">、Vue3相比Vue2有哪些优化？</span></span>
<span class="line"><span style="color:#D19A66;">15</span><span style="color:#ABB2BF;">、为什么在模板中绑定事件的时候要加.native?</span></span>
<span class="line"><span style="color:#D19A66;">16</span><span style="color:#ABB2BF;">、能说一下响应式原理的过程吗？</span></span>
<span class="line"><span style="color:#D19A66;">17</span><span style="color:#ABB2BF;">、数组的响应式怎么实现的？</span></span>
<span class="line"><span style="color:#D19A66;">18</span><span style="color:#ABB2BF;">、Vue是数据改变后页面也会重新改变嘛；</span><span style="color:#E5C07B;">this</span><span style="color:#ABB2BF;">.a </span><span style="color:#56B6C2;">=</span><span style="color:#D19A66;"> 1</span><span style="color:#ABB2BF;">; </span><span style="color:#E5C07B;">this</span><span style="color:#ABB2BF;">.a </span><span style="color:#56B6C2;">=</span><span style="color:#D19A66;"> 2</span><span style="color:#ABB2BF;">; 他是怎么实现异步更新优化整个渲染过程的？</span></span>
<span class="line"><span style="color:#D19A66;">19</span><span style="color:#ABB2BF;">、render函数封装有什么特别的，或者用到比较巧妙的东西吗？</span></span>
<span class="line"><span style="color:#D19A66;">20</span><span style="color:#ABB2BF;">、浏览器缓存的方式有哪些？</span></span>
<span class="line"><span style="color:#D19A66;">21</span><span style="color:#ABB2BF;">、正向代理和反向代理的区别？</span></span>
<span class="line"><span style="color:#D19A66;">22</span><span style="color:#ABB2BF;">、域名解析过程是怎样的？</span></span>
<span class="line"><span style="color:#D19A66;">23</span><span style="color:#ABB2BF;">、TCP协议三次握手、四次挥手的过程，为什么挥手要4次？</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><h4 id="_2、二面" tabindex="-1">2、二面 <a class="header-anchor" href="#_2、二面" aria-label="Permalink to &quot;2、二面&quot;">​</a></h4><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="color:#61AFEF;">1、nextTick,</span><span style="color:#98C379;"> setTimeout</span><span style="color:#98C379;"> 以及</span><span style="color:#98C379;"> setImmediate</span><span style="color:#98C379;"> 三者有什么区别?</span></span>
<span class="line"><span style="color:#61AFEF;">2、说一下你在项目的安全性做了哪些工作？</span></span>
<span class="line"><span style="color:#61AFEF;">3、当一张表数据量比较多的时候，为了提高查询速度，你们一般会使用哪些方式做优化？</span></span>
<span class="line"><span style="color:#61AFEF;">4、webSocket与传统的http相比有什么优势？</span></span>
<span class="line"><span style="color:#61AFEF;">5、用过koa吗？简要阐述一下koa的洋葱模型。</span></span>
<span class="line"><span style="color:#61AFEF;">6、用过promise吗？它的使用是为了解决一个什么问题？promise底层是怎么设计的？</span></span>
<span class="line"><span style="color:#61AFEF;">7、你们现在整个登录鉴权是怎么设计的？如果要考虑单点登录呢，会如何设计？</span></span>
<span class="line"><span style="color:#61AFEF;">8、如何用同一套代码部署到服务器中，怎么区分当前本地开发环境还是线上环境？是测试环境还是生产环境呢，怎么去区分？</span></span>
<span class="line"><span style="color:#61AFEF;">9、待支付的订单，到期后主动取消这个功能你会怎么设计去做？</span></span>
<span class="line"><span style="color:#61AFEF;">10、如果要做音视频的安全性，你能想到哪些方案？</span></span>
<span class="line"><span style="color:#61AFEF;">11、多台服务器部署定时任务怎么保证一个任务只会做一遍呢？</span></span>
<span class="line"><span style="color:#61AFEF;">12、你觉得程序员除了提升技术能力之外，其他什么能力你比较看重？</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><h4 id="_3、人事面" tabindex="-1">3、人事面 <a class="header-anchor" href="#_3、人事面" aria-label="Permalink to &quot;3、人事面&quot;">​</a></h4><p>人事面遇到的问题都比较类似，我在下面会专门拿一个部分汇总人事面的问题。</p><p>该公司最后也拿到了offer。</p><h3 id="四、公司四" tabindex="-1">四、公司四 <a class="header-anchor" href="#四、公司四" aria-label="Permalink to &quot;四、公司四&quot;">​</a></h3><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="color:#61AFEF;">1、你在项目中用到mongodb吗？</span></span>
<span class="line"><span style="color:#61AFEF;">2、在项目中用到mongodb存储哪些数据？</span></span>
<span class="line"><span style="color:#61AFEF;">3、mongodb的管道有了解吗？聚合管道怎么用的？</span></span>
<span class="line"><span style="color:#61AFEF;">4、mongodb和的mysql优缺点？</span></span>
<span class="line"><span style="color:#61AFEF;">5、你对事务性的了解是怎样的？</span></span>
<span class="line"><span style="color:#61AFEF;">6、node怎么开启子进程？</span></span>
<span class="line"><span style="color:#61AFEF;">7、在一台机器上开启负载均衡的时候，如果这个项目有用到定时任务，你怎么去控制这个定时任务只会执行一次？</span></span>
<span class="line"><span style="color:#61AFEF;">8、你在egg中怎么开启子进程，怎么编写一个定时任务？</span></span>
<span class="line"><span style="color:#61AFEF;">9、react用的多吗？</span></span>
<span class="line"><span style="color:#61AFEF;">10、react组件间通信的方式有哪些？</span></span>
<span class="line"><span style="color:#61AFEF;">11、vuex跟redux的区别有哪些？</span></span>
<span class="line"><span style="color:#61AFEF;">12、computed和watch的区别？</span></span>
<span class="line"><span style="color:#61AFEF;">13、watch和computed哪一个可以实现异步？</span></span>
<span class="line"><span style="color:#61AFEF;">14、vue的通信方式有哪些？</span></span>
<span class="line"><span style="color:#61AFEF;">15、vue的history模式和hash模式的区别是什么？</span></span>
<span class="line"><span style="color:#61AFEF;">16、history模式下会出现404，怎么处理？</span></span>
<span class="line"><span style="color:#61AFEF;">17、你能说一下闭包的优缺点吗？</span></span>
<span class="line"><span style="color:#61AFEF;">18、内存泄漏和内存溢出有什么区别？</span></span>
<span class="line"><span style="color:#61AFEF;">19、还有什么想问我的吗？</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><p>该岗位是node全栈工程师的岗位，对后端的知识点问题的比较深，一层一层的往下问，我后端的知识点稍微薄弱一些，很多很细的问题答不上来；他那边技术栈用的是react，我复习的知识也比较少。</p><p>扑街了理所当然。</p><h4 id="五、公司五" tabindex="-1">五、公司五 <a class="header-anchor" href="#五、公司五" aria-label="Permalink to &quot;五、公司五&quot;">​</a></h4><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="color:#61AFEF;">1.1、自我介绍？</span></span>
<span class="line"><span style="color:#61AFEF;">1.2、常用的选择器有哪些，优先级怎么样？（除了这些还有其他的嘛）</span></span>
<span class="line"><span style="color:#61AFEF;">1.3、垂直居中的实现方案有哪些？</span></span>
<span class="line"><span style="color:#61AFEF;">2.1、你说的网格布局grid垂直居中有哪些属性值？</span></span>
<span class="line"><span style="color:#61AFEF;">2.2、width:100%和width:auto有什么区别？</span></span>
<span class="line"><span style="color:#61AFEF;">3、说一下cookie的作用是什么？</span></span>
<span class="line"><span style="color:#61AFEF;">4、cookie有哪些属性？</span></span>
<span class="line"><span style="color:#61AFEF;">5、设置cookie的domain用来实现什么功能？</span></span>
<span class="line"><span style="color:#61AFEF;">6、懒加载的实现原理是怎样的？（除了你说的那一种还有其他的嘛）</span></span>
<span class="line"><span style="color:#61AFEF;">7、vue中路由懒加载怎么实现？（除了你说的这一种还有其他的嘛）</span></span>
<span class="line"><span style="color:#61AFEF;">8、说一下原型链的理解？</span></span>
<span class="line"><span style="color:#61AFEF;">9、原型链__proto__这个隐式属性的实现原理是怎样的？</span></span>
<span class="line"><span style="color:#61AFEF;">10、说一下vue中双向数据绑定？</span></span>
<span class="line"><span style="color:#61AFEF;">11、vue中computed和watch的区别是什么？</span></span>
<span class="line"><span style="color:#61AFEF;">12、说一下你们的前端登录流程是怎样的？</span></span>
<span class="line"><span style="color:#61AFEF;">13、jwt是什么？</span></span>
<span class="line"><span style="color:#61AFEF;">14、jwt由哪些部分组成？</span></span>
<span class="line"><span style="color:#61AFEF;">15、你在项目中怎么实现打包优化的？</span></span>
<span class="line"><span style="color:#61AFEF;">16、你说的这些优化方式是webpack哪个版本的？</span></span>
<span class="line"><span style="color:#61AFEF;">17、你说一下项目中比较困难的事情有哪些（BFF处理模式）？</span></span>
<span class="line"><span style="color:#61AFEF;">18、你们部署上线是怎么做的？</span></span>
<span class="line"><span style="color:#61AFEF;">19、在项目中有使用jekenis和docker这些吗？</span></span>
<span class="line"><span style="color:#61AFEF;">20、有什么想问我的吗？</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><p>我记得网格布局是有<code>justify-content</code>和<code>align-items</code>属性，并且面试之后专门写了一个文件测试，测试通过。面试官说我属性记错了。</p><p><code>width:100%</code>和<code>width:auto有什么区别?</code>这个问题我没回答出来，最后我问面试官他们的区别是什么。面试结束之后我按照他说的那种方式，也没测试出来区别，很纳闷。</p><p><code>原型链__proto__这个隐式属性的实现原理是怎样的？</code>，我以为这个问题就是让我说一下<code>实例.__proto__</code>指向构造函数的原型，抓住这个点然后扩展一下原型链的知识就好了。他说不是要你回答这个，而是让我说一下__proto__的底层实现，这个问题我不知道，有知道的朋友可以在评论区帮我回复一下，我学习一下这个知识点。</p><p>整个面试从面试官的表达上可以看得出来他有一些紧张，导致有一些问题我也听的不是特别清楚。结束之后我测试的几个知识点也没达到他说的效果，遗憾。</p><p>最后应该是挂了。</p><h4 id="六、公司六" tabindex="-1">六、公司六 <a class="header-anchor" href="#六、公司六" aria-label="Permalink to &quot;六、公司六&quot;">​</a></h4><p>拿到offer，出于公司隐私考虑，不方便透露具体过程。</p><h3 id="人事面问题汇总" tabindex="-1">人事面问题汇总 <a class="header-anchor" href="#人事面问题汇总" aria-label="Permalink to &quot;人事面问题汇总&quot;">​</a></h3><div class="language-scss line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">scss</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="color:#ABB2BF;">1、对自己的评价？</span></span>
<span class="line"><span style="color:#ABB2BF;">2、你有哪些兴趣爱好？</span></span>
<span class="line"><span style="color:#ABB2BF;">3、描述一下你自己的优缺点?或者用三个词语描述你自己？</span></span>
<span class="line"><span style="color:#ABB2BF;">4、你在公司主要做一些什么工作？</span></span>
<span class="line"><span style="color:#ABB2BF;">5、离职原因是什么？</span></span>
<span class="line"><span style="color:#ABB2BF;">6、在工作之外有哪些学习技术的方式？</span></span>
<span class="line"><span style="color:#ABB2BF;">7、公司的整个开发流程是怎样的,你跟团队成员如何配合完成任务？</span></span>
<span class="line"><span style="color:#ABB2BF;">8、你有女(男)朋友了吗(稳定性)？</span></span>
<span class="line"><span style="color:#ABB2BF;">9、你有其他offer吗(稳定性)？</span></span>
<span class="line"><span style="color:#ABB2BF;">10、如何提高工作效率? </span></span>
<span class="line"><span style="color:#ABB2BF;">11、与领导意见不统一时应该怎么办?</span></span>
<span class="line"><span style="color:#ABB2BF;">12、你觉得目前自己的技术在什么位置，觉得自己哪一块能力需要加强？</span></span>
<span class="line"><span style="color:#ABB2BF;">13、您还有什么问题想问我的嘛? </span></span>
<span class="line"><span style="color:#ABB2BF;">15、你的职业规划是怎样的? </span></span>
<span class="line"><span style="color:#ABB2BF;">16、入职之后如何开展工作? </span></span>
<span class="line"><span style="color:#ABB2BF;">17、是否愿意接受加班?</span></span>
<span class="line"><span style="color:#ABB2BF;">18、你能为公司带来什么?你希望公司给你什么?</span></span>
<span class="line"><span style="color:#ABB2BF;">19、在项目中遇到了什么难点问题，最后怎么解决的？</span></span>
<span class="line"><span style="color:#ABB2BF;">20、谈一下你在上一家公司整个技术开发流程，你负责哪些工作？</span></span>
<span class="line"><span style="color:#ABB2BF;">21、你希望自己以后的发展方向是什么？</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><p>知己知彼，从容不迫。</p><h3 id="接下来的计划" tabindex="-1">接下来的计划 <a class="header-anchor" href="#接下来的计划" aria-label="Permalink to &quot;接下来的计划&quot;">​</a></h3><p>在这次的面试中，也发现了自己能力的不足。比如我之前通过node写了一些提升团队的工具，用于提升自己在团队中的kpi。但是在纯前端中可能只能作为一家加分项来看，因为如果问到很具体的node的内存问题、mongodb细节的问题，可能就会被问住了，整个面试体验确实会比较糟糕。</p><p>C市很多大公司都是用的react，我之前在项目中用react比较少，所以空余时间要把react用起来，不用起来就会忘。</p><p>然后vue3的源码和优化的方面也要继续看看了。</p><p>还有这一次没有投递大厂的原因是我没有刷算法，这一点在之前的求职过程中都没有重视起来。现在年限到这了，必须要刷起来，才能更进一步提升自己。</p><h3 id="给大家的一个建议" tabindex="-1">给大家的一个建议 <a class="header-anchor" href="#给大家的一个建议" aria-label="Permalink to &quot;给大家的一个建议&quot;">​</a></h3><p>我在面试的过程中有一个体会，就是：当面试官问你一个很大的问题的时候，你要怎么回答？</p><p>比如面试官问题，简单的跟我说一下继承是什么吧？</p><p>很多朋友遇到这样的一个问题，马上就大脑蒙圈了，脑袋里很紊乱，知道很多，但是无法把他们串起来，不知道从何说起，导致回答的结果不是很好。</p><p>所以像这些技能题，我们在记笔记的时候也应该用这样的方式去记忆和背诵。遵循下面的几个步骤就行了，套公式的方式，一点也不会慌乱。</p><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="color:#61AFEF;">1、解释是什么的问题。</span></span>
<span class="line"><span style="color:#61AFEF;">2、解释这个技术的应用点、应用场景在哪里。</span></span>
<span class="line"><span style="color:#61AFEF;">3、整理一下这个问题的优缺点是什么。</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>我举一个例子来回答一下。比如面试官问：<code>你给我讲一下闭包吧？</code></p><p>我就可以按照上面的归纳，分3步走的原则。</p><div class="language-css line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="color:#ABB2BF;">1</span><span style="color:#C678DD;">. 闭包是：能够访问其他函数内部变量的函数。</span></span>
<span class="line"><span style="color:#C678DD;">2. 闭包一般会在：封装模块的时候，通过函数自执行函数的方式进行实现；或者在模仿块级作用域的时候实现；如：我们常用的库jQuery本身就是一个大的闭包。</span></span>
<span class="line"><span style="color:#C678DD;">3. 闭包的优点是：</span></span>
<span class="line"><span style="color:#C678DD;">    a、能够在离开函数之后继续访问该函数的变量，变量一直保存在内存中。</span></span>
<span class="line"><span style="color:#C678DD;">    b、闭包中的变量是私有的，只有闭包函数才有权限访问它。不会被外面的变量和方法给污染。</span></span>
<span class="line"><span style="color:#C678DD;">闭包的缺点是：</span></span>
<span class="line"><span style="color:#C678DD;">    a、会增加对内存的使用量，影响性能。</span></span>
<span class="line"><span style="color:#C678DD;">    b、不正确的使用闭包会造成内存泄漏。</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>针对上面闭包的回答，可能面试官又会继续问你：<code>内存泄漏是什么啊，你能给我讲一下吗？垃圾回收机制说一下吧？内存泄漏和内存溢出的区别是什么？</code>等等。</p><p>就是你回答完了这个问题之后，你可以先假设性的想一下面试官看到你的这个回答可能会问你什么。然后给自己提问深挖技术深度问题。</p><p>当然那不光是面试，自己平时学习深挖知识的时候，也可以用这种办法。</p>`,57),r=[e];function c(o,i,t,b,u,d){return a(),n("div",null,r)}const F=s(l,[["render",c]]);export{y as __pageData,F as default};
