import{_ as n,c as a,o as p,ah as e}from"./chunks/framework.DqD713j2.js";const l="/FrontEndLearnNotes/assets/640.Bu_SdZ3W.webp",r="/FrontEndLearnNotes/assets/640-1713282528610-853.DYQ7LNZh.webp",t="/FrontEndLearnNotes/assets/640-1713282528610-854.DzL0Pe-W.webp",i="/FrontEndLearnNotes/assets/640-1713282528610-855.BPm55WSq.webp",c="/FrontEndLearnNotes/assets/640-1713282528610-856.C7QN8kSU.webp",b="/FrontEndLearnNotes/assets/640-1713282528610-857.AM7fgzda.webp",o="/FrontEndLearnNotes/assets/640-1713282528610-858.D5kCH9qH.webp",v=JSON.parse('{"title":"搭建前端脚手架","description":"","frontmatter":{},"headers":[],"relativePath":"Document/前端进阶技巧/实际应用场景解析/搭建前端脚手架.md","filePath":"Document/前端进阶技巧/实际应用场景解析/搭建前端脚手架.md","lastUpdated":1750954157000}'),u={name:"Document/前端进阶技巧/实际应用场景解析/搭建前端脚手架.md"};function m(d,s,g,T,h,x){return p(),a("div",null,s[0]||(s[0]=[e(`<h1 id="搭建前端脚手架" tabindex="-1">搭建前端脚手架 <a class="header-anchor" href="#搭建前端脚手架" aria-label="Permalink to &quot;搭建前端脚手架&quot;">​</a></h1><p><a href="https://juejin.cn/post/7260144602471776311" target="_blank" rel="noreferrer">写给5年前端妹子的三万字脚手架教程 - 掘金 (juejin.cn)</a></p><h1 id="使用-vue-js-编写命令行界面-前端开发-cli-的利器" tabindex="-1">使用 Vue.js 编写命令行界面,前端开发 CLI 的利器 <a class="header-anchor" href="#使用-vue-js-编写命令行界面-前端开发-cli-的利器" aria-label="Permalink to &quot;使用 Vue.js 编写命令行界面,前端开发 CLI 的利器&quot;">​</a></h1><h2 id="前言" tabindex="-1">前言 <a class="header-anchor" href="#前言" aria-label="Permalink to &quot;前言&quot;">​</a></h2><p>如何将Vue渲染到命令行工具 😃.关于命令行工具,大家应该都比较熟悉了,比如vue-cli、Vite等.我们在编写前端应用面向用户时,通常会非常关注用户体验,作为开发者,我们在使用工具时,它给予我们的开发者体验(DX)我们也会十分关注.团队在今年有自研脚手架的计划,作为前端,我就在想是否能有较低成本的研发方案能让团队的小伙伴参与进来,大家可以像编写前端应用一样搞定它.因此,<strong>Temir</strong>[3]应运而生.</p><h2 id="temir" tabindex="-1">Temir <a class="header-anchor" href="#temir" aria-label="Permalink to &quot;Temir&quot;">​</a></h2><h3 id="介绍" tabindex="-1">介绍 <a class="header-anchor" href="#介绍" aria-label="Permalink to &quot;介绍&quot;">​</a></h3><p><strong>Temir</strong>[4],一个用Vue组件来编写命令行界面应用的工具.开发者只需要使用Vue就可以编写命令行应用,不需要任何额外的学习成本.</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki one-dark-pro vp-code" tabindex="0"><code><span class="line"><span>&lt;script lang=&quot;ts&quot; setup&gt;</span></span>
<span class="line"><span>import { ref } from &#39;@vue/runtime-core&#39;</span></span>
<span class="line"><span>import { TBox, TText } from &#39;@temir/core&#39;</span></span>
<span class="line"><span>const counter = ref(0)</span></span>
<span class="line"><span>setInterval(() =&gt; {</span></span>
<span class="line"><span>  counter.value++</span></span>
<span class="line"><span>}, 100)</span></span>
<span class="line"><span>&lt;/script&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;template&gt;</span></span>
<span class="line"><span>  &lt;TBox&gt;</span></span>
<span class="line"><span>    &lt;TText color=&quot;green&quot;&gt;</span></span>
<span class="line"><span>      {{ counter }} tests passed</span></span>
<span class="line"><span>    &lt;/TText&gt;</span></span>
<span class="line"><span>  &lt;/TBox&gt;</span></span>
<span class="line"><span>&lt;/template&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><h3 id="组件" tabindex="-1">组件 <a class="header-anchor" href="#组件" aria-label="Permalink to &quot;组件&quot;">​</a></h3><p><strong>Temir</strong>[5]提供了一些基础组件帮助开发者编写与扩展命令行工具:</p><h4 id="文本组件-text" tabindex="-1">文本组件 (Text) <a class="header-anchor" href="#文本组件-text" aria-label="Permalink to &quot;文本组件 (Text)&quot;">​</a></h4><p>文本组件可以显示文本,将其样式更改为粗体、下划线、斜体或删除线.</p><p><img src="`+l+`" alt="图片"></p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki one-dark-pro vp-code" tabindex="0"><code><span class="line"><span>&lt;TText color=&quot;green&quot;&gt;</span></span>
<span class="line"><span>  I am green</span></span>
<span class="line"><span>&lt;/TText&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;TText color=&quot;black&quot; background-color=&quot;white&quot;&gt;</span></span>
<span class="line"><span>  I am black on white</span></span>
<span class="line"><span>&lt;/TText&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;TText color=&quot;white&quot;&gt;</span></span>
<span class="line"><span>  I am white</span></span>
<span class="line"><span>&lt;/TText&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;TText :bold=&quot;true&quot;&gt;</span></span>
<span class="line"><span>  I am bold</span></span>
<span class="line"><span>&lt;/TText&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;TText :italic=&quot;true&quot;&gt;</span></span>
<span class="line"><span>  I am italic</span></span>
<span class="line"><span>&lt;/TText&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;TText :underline=&quot;true&quot;&gt;</span></span>
<span class="line"><span>  I am underline</span></span>
<span class="line"><span>&lt;/TText&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;TText :strikethrough=&quot;true&quot;&gt;</span></span>
<span class="line"><span>  I am strikethrough</span></span>
<span class="line"><span>&lt;/TText&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;TText :inverse=&quot;true&quot;&gt;</span></span>
<span class="line"><span>  I am inversed</span></span>
<span class="line"><span>&lt;/TText&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br></div></div><h4 id="盒子组件-box" tabindex="-1">盒子组件 (Box) <a class="header-anchor" href="#盒子组件-box" aria-label="Permalink to &quot;盒子组件 (Box)&quot;">​</a></h4><p><code>&lt;Box&gt;</code>是构建布局必不可少的Temir组件.就像在浏览器中<code>&lt;div style=&#39;display: flex&#39;&gt;.</code>它提供了一些构建布局的常用属性,比如尺寸、内外边距、对齐方式等.</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki one-dark-pro vp-code" tabindex="0"><code><span class="line"><span>&lt;template&gt;</span></span>
<span class="line"><span>  &lt;TBox justify-content=&quot;flex-start&quot;&gt;</span></span>
<span class="line"><span>    &lt;TText&gt;X&lt;/TText&gt;</span></span>
<span class="line"><span>  &lt;/TBox&gt;</span></span>
<span class="line"><span>  // [X      ]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  &lt;TBox justify-content=&quot;center&quot;&gt;</span></span>
<span class="line"><span>    &lt;TText&gt;X&lt;/TText&gt;</span></span>
<span class="line"><span>  &lt;/TBox&gt;</span></span>
<span class="line"><span>  // [   X   ]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  &lt;TBox justify-content=&quot;flex-end&quot;&gt;</span></span>
<span class="line"><span>    &lt;TText&gt;X&lt;/TText&gt;</span></span>
<span class="line"><span>  &lt;/TBox&gt;</span></span>
<span class="line"><span>  // [      X]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  &lt;TBox justify-content=&quot;space-between&quot;&gt;</span></span>
<span class="line"><span>    &lt;TText&gt;X&lt;/TText&gt;</span></span>
<span class="line"><span>    &lt;TText&gt;Y&lt;/TText&gt;</span></span>
<span class="line"><span>  &lt;/TBox&gt;</span></span>
<span class="line"><span>  // [X      Y]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  &lt;TBox justify-content=&quot;space-around&quot;&gt;</span></span>
<span class="line"><span>    &lt;TText&gt;X&lt;/TText&gt;</span></span>
<span class="line"><span>    &lt;TText&gt;Y&lt;/TText&gt;</span></span>
<span class="line"><span>  &lt;/TBox&gt;</span></span>
<span class="line"><span>  // [  X   Y  ]</span></span>
<span class="line"><span>&lt;/template&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br></div></div><h4 id="换行组件-newline" tabindex="-1">换行组件 (Newline) <a class="header-anchor" href="#换行组件-newline" aria-label="Permalink to &quot;换行组件 (Newline)&quot;">​</a></h4><p>添加一个或多个换行符(\\n)。必须在<code>&lt;Text&gt;</code>组件中使用。</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki one-dark-pro vp-code" tabindex="0"><code><span class="line"><span>&lt;script&gt;</span></span>
<span class="line"><span>import { TBox, TNewline, TText } from &#39;@temir/core&#39;</span></span>
<span class="line"><span>&lt;/script&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;template&gt;</span></span>
<span class="line"><span>  &lt;TBox&gt;</span></span>
<span class="line"><span>    &lt;TText&gt;</span></span>
<span class="line"><span>      &lt;TText color=&quot;green&quot;&gt;</span></span>
<span class="line"><span>        Hello</span></span>
<span class="line"><span>      &lt;/TText&gt;</span></span>
<span class="line"><span>      &lt;TNewline /&gt;</span></span>
<span class="line"><span>      &lt;TText color=&quot;red&quot;&gt;</span></span>
<span class="line"><span>        World</span></span>
<span class="line"><span>      &lt;/TText&gt;</span></span>
<span class="line"><span>    &lt;/TText&gt;</span></span>
<span class="line"><span>  &lt;/TBox&gt;</span></span>
<span class="line"><span>&lt;/template&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><h4 id="填充组件-spacer" tabindex="-1">填充组件 (Spacer) <a class="header-anchor" href="#填充组件-spacer" aria-label="Permalink to &quot;填充组件 (Spacer)&quot;">​</a></h4><p>沿其包含布局的主轴展开的灵活空间。作为填充元素之间所有可用空间的快捷方式，它非常有用。</p><p>例如，在具有默认伸缩方向(<code>row</code>)的<code>&lt;Box&gt;</code>中使用<code>&lt;Spacer&gt;</code>将把&quot;Left&quot;定位到左边，并将&quot;Right&quot;推到右边。</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki one-dark-pro vp-code" tabindex="0"><code><span class="line"><span>&lt;script lang=&quot;ts&quot; setup&gt;</span></span>
<span class="line"><span>import { TBox, TSpacer, TText } from &#39;@temir/core&#39;</span></span>
<span class="line"><span>&lt;/script&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;template&gt;</span></span>
<span class="line"><span>  &lt;TBox&gt;</span></span>
<span class="line"><span>    &lt;TText&gt;Left&lt;/TText&gt;</span></span>
<span class="line"><span>    &lt;TSpacer /&gt;</span></span>
<span class="line"><span>    &lt;TText&gt;Right&lt;/TText&gt;</span></span>
<span class="line"><span>  &lt;/TBox&gt;</span></span>
<span class="line"><span>&lt;/template&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h4 id="超链接组件-link" tabindex="-1">超链接组件 (Link) <a class="header-anchor" href="#超链接组件-link" aria-label="Permalink to &quot;超链接组件 (Link)&quot;">​</a></h4><p><img src="`+r+`" alt="图片"></p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki one-dark-pro vp-code" tabindex="0"><code><span class="line"><span>&lt;script lang=&quot;ts&quot; setup&gt;</span></span>
<span class="line"><span>import { TBox, TText } from &#39;@temir/core&#39;</span></span>
<span class="line"><span>import TLink from &#39;@temir/link&#39;</span></span>
<span class="line"><span>&lt;/script&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;template&gt;</span></span>
<span class="line"><span>  &lt;TBox</span></span>
<span class="line"><span>    :margin=&quot;5&quot;</span></span>
<span class="line"><span>    width=&quot;20&quot;</span></span>
<span class="line"><span>    border-style=&quot;round&quot;</span></span>
<span class="line"><span>    justify-content=&quot;center&quot;</span></span>
<span class="line"><span>  &gt;</span></span>
<span class="line"><span>    &lt;TLink url=&quot;https://github.com&quot;&gt;</span></span>
<span class="line"><span>      &lt;TText color=&quot;yellow&quot;&gt;</span></span>
<span class="line"><span>        Hi</span></span>
<span class="line"><span>      &lt;/TText&gt;</span></span>
<span class="line"><span>      &lt;TText color=&quot;cyan&quot;&gt;</span></span>
<span class="line"><span>        Github</span></span>
<span class="line"><span>      &lt;/TText&gt;</span></span>
<span class="line"><span>    &lt;/TLink&gt;</span></span>
<span class="line"><span>  &lt;/TBox&gt;</span></span>
<span class="line"><span>&lt;/template&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><h4 id="加载中组件-spinner" tabindex="-1">加载中组件 (Spinner) <a class="header-anchor" href="#加载中组件-spinner" aria-label="Permalink to &quot;加载中组件 (Spinner)&quot;">​</a></h4><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki one-dark-pro vp-code" tabindex="0"><code><span class="line"><span>&lt;script lang=&quot;ts&quot; setup&gt;</span></span>
<span class="line"><span>import { TBox, TText } from &#39;@temir/core&#39;</span></span>
<span class="line"><span>import TSpinner from &#39;@temir/spinner&#39;</span></span>
<span class="line"><span>&lt;/script&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;template&gt;</span></span>
<span class="line"><span>  &lt;TBox</span></span>
<span class="line"><span>    :margin=&quot;5&quot;</span></span>
<span class="line"><span>    width=&quot;20&quot;</span></span>
<span class="line"><span>    border-style=&quot;round&quot;</span></span>
<span class="line"><span>    justify-content=&quot;center&quot;</span></span>
<span class="line"><span>  &gt;</span></span>
<span class="line"><span>    &lt;TText&gt;</span></span>
<span class="line"><span>      &lt;TText color=&quot;yellow&quot;&gt;</span></span>
<span class="line"><span>        &lt;TSpinner /&gt;</span></span>
<span class="line"><span>      &lt;/TText&gt;</span></span>
<span class="line"><span>      Loading</span></span>
<span class="line"><span>    &lt;/TText&gt;</span></span>
<span class="line"><span>  &lt;/TBox&gt;</span></span>
<span class="line"><span>&lt;/template&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><h4 id="标签页组件-tab" tabindex="-1">标签页组件 (Tab) <a class="header-anchor" href="#标签页组件-tab" aria-label="Permalink to &quot;标签页组件 (Tab)&quot;">​</a></h4><p><img src="`+t+`" alt="图片"></p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki one-dark-pro vp-code" tabindex="0"><code><span class="line"><span>&lt;script lang=&quot;ts&quot; setup&gt;</span></span>
<span class="line"><span>import { computed, ref } from &#39;@vue/runtime-core&#39;</span></span>
<span class="line"><span>import { TBox, TText } from &#39;@temir/core&#39;</span></span>
<span class="line"><span>import { TTab, TTabs } from &#39;@temir/tab&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const tabs = [&#39;Vue&#39;, &#39;React&#39;, &#39;Angular&#39;, &#39;Solid&#39;, &#39;Svelte&#39;]</span></span>
<span class="line"><span>const activeIndex = ref(0)</span></span>
<span class="line"><span>const selectedText = computed(() =&gt; tabs[activeIndex.value])</span></span>
<span class="line"><span>&lt;/script&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;template&gt;</span></span>
<span class="line"><span>  &lt;TBox&gt;</span></span>
<span class="line"><span>    &lt;TText&gt;</span></span>
<span class="line"><span>      Selected Text :</span></span>
<span class="line"><span>      &lt;TText color=&quot;red&quot;&gt;</span></span>
<span class="line"><span>        {{ selectedText }}</span></span>
<span class="line"><span>      &lt;/TText&gt;</span></span>
<span class="line"><span>    &lt;/TText&gt;</span></span>
<span class="line"><span>  &lt;/TBox&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  &lt;TBox&gt;</span></span>
<span class="line"><span>    &lt;TTabs :on-change=&quot;(index) =&gt; activeIndex = +index&quot;&gt;</span></span>
<span class="line"><span>      &lt;TTab v-for=&quot;item in tabs&quot; :key=&quot;item&quot;&gt;</span></span>
<span class="line"><span>        {{ item }}</span></span>
<span class="line"><span>      &lt;/TTab&gt;</span></span>
<span class="line"><span>    &lt;/TTabs&gt;</span></span>
<span class="line"><span>  &lt;/TBox&gt;</span></span>
<span class="line"><span>&lt;/template&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br></div></div><h4 id="选择组件" tabindex="-1">选择组件 <a class="header-anchor" href="#选择组件" aria-label="Permalink to &quot;选择组件&quot;">​</a></h4><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki one-dark-pro vp-code" tabindex="0"><code><span class="line"><span>&lt;script lang=&quot;ts&quot; setup&gt;</span></span>
<span class="line"><span>import TSelectInput from &#39;@temir/select-input&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const items = [</span></span>
<span class="line"><span>  {</span></span>
<span class="line"><span>    label: &#39;Vue&#39;,</span></span>
<span class="line"><span>    value: &#39;Vue&#39;,</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>  {</span></span>
<span class="line"><span>    label: &#39;Vite&#39;,</span></span>
<span class="line"><span>    value: &#39;Vite&#39;,</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>  {</span></span>
<span class="line"><span>    label: &#39;Temir&#39;,</span></span>
<span class="line"><span>    value: &#39;Temir&#39;,</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>]</span></span>
<span class="line"><span>function onSelect(value) {</span></span>
<span class="line"><span>  console.log(&#39;selected&#39;, value)</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>&lt;/script&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;template&gt;</span></span>
<span class="line"><span>  &lt;TSelectInput :items=&quot;items&quot; :on-select=&quot;onSelect&quot; /&gt;</span></span>
<span class="line"><span>&lt;/template&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br></div></div><h3 id="安装" tabindex="-1">安装 <a class="header-anchor" href="#安装" aria-label="Permalink to &quot;安装&quot;">​</a></h3><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki one-dark-pro vp-code" tabindex="0"><code><span class="line"><span>npm install @temir/core</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="使用" tabindex="-1">使用 <a class="header-anchor" href="#使用" aria-label="Permalink to &quot;使用&quot;">​</a></h3><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki one-dark-pro vp-code" tabindex="0"><code><span class="line"><span>&lt;script lang=&quot;ts&quot; setup&gt;</span></span>
<span class="line"><span>import { ref } from &#39;@vue/runtime-core&#39;</span></span>
<span class="line"><span>import { TBox, TText } from &#39;@temir/core&#39;</span></span>
<span class="line"><span>const counter = ref(0)</span></span>
<span class="line"><span>setInterval(() =&gt; {</span></span>
<span class="line"><span>  counter.value++</span></span>
<span class="line"><span>}, 100)</span></span>
<span class="line"><span>&lt;/script&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;template&gt;</span></span>
<span class="line"><span>  &lt;TBox&gt;</span></span>
<span class="line"><span>    &lt;TText color=&quot;green&quot;&gt;</span></span>
<span class="line"><span>      {{ counter }} tests passed</span></span>
<span class="line"><span>    &lt;/TText&gt;</span></span>
<span class="line"><span>  &lt;/TBox&gt;</span></span>
<span class="line"><span>&lt;/template&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><h3 id="hmr支持" tabindex="-1">HMR支持 <a class="header-anchor" href="#hmr支持" aria-label="Permalink to &quot;HMR支持&quot;">​</a></h3><p>前面我们提到了开发者体验(DX),在现在的前端工程中,对开发者很有帮助且提效的就是HMR,这么香的东西<strong>Temir</strong>[6]没有理由不拥有它,话不多说,直接展示:</p><h3 id="开箱即用" tabindex="-1">开箱即用 <a class="header-anchor" href="#开箱即用" aria-label="Permalink to &quot;开箱即用&quot;">​</a></h3><p>使用<strong>Temir</strong>[7]定制化CLI非常简单,我们提供了**@temir/cli**[8]帮助你快速构建一个基于<strong>Temir</strong>[9]的CLI.</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki one-dark-pro vp-code" tabindex="0"><code><span class="line"><span>mkdir my-temir-cli</span></span>
<span class="line"><span></span></span>
<span class="line"><span>cd my-temir-cli</span></span>
<span class="line"><span></span></span>
<span class="line"><span>touch main.ts</span></span>
<span class="line"><span></span></span>
<span class="line"><span>npm install @temir/cl</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Dev (开发)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>temir main.ts</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Build (打包)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>temir build main.ts</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p>你可以通过下载这个 <strong>例子</strong>[10] 来快速开始，你也可以打开 <strong>repl.it sandbox</strong>[11]来在线体验和尝试它。</p><h2 id="演示" tabindex="-1">演示 <a class="header-anchor" href="#演示" aria-label="Permalink to &quot;演示&quot;">​</a></h2><h3 id="hi-temir-12" tabindex="-1"><strong>Hi Temir</strong>[12] <a class="header-anchor" href="#hi-temir-12" aria-label="Permalink to &quot;**Hi Temir**[12]&quot;">​</a></h3><p><img src="`+i+'" alt="图片"></p><h3 id="borders-13" tabindex="-1"><strong>Borders</strong>[13] <a class="header-anchor" href="#borders-13" aria-label="Permalink to &quot;**Borders**[13]&quot;">​</a></h3><h3 id="table-14" tabindex="-1"><strong>Table</strong>[14] <a class="header-anchor" href="#table-14" aria-label="Permalink to &quot;**Table**[14]&quot;">​</a></h3><p><img src="'+c+'" alt="图片"></p><h3 id="vitest-15" tabindex="-1"><strong>Vitest</strong>[15] <a class="header-anchor" href="#vitest-15" aria-label="Permalink to &quot;**Vitest**[15]&quot;">​</a></h3><p><img src="'+b+'" alt="图片"></p><h2 id="实现" tabindex="-1">实现 <a class="header-anchor" href="#实现" aria-label="Permalink to &quot;实现&quot;">​</a></h2><ul><li>createRenderer</li></ul><p>Temir的实现主要得益于Vue3出色的跨平台能力,我们可以通过<strong>createRenderer</strong>[16] API创建一个自定义渲染器,通过创建宿主环境中对应的Node和Element,并对元素进行增删改查操作.</p><ul><li>Yoga</li></ul><p>Vue提供了跑在命令行界面的接口,那我们就还缺少一个布局引擎就能把Vue 跑在命令行工具了.Temir使用了Yoga,一款Flexbox布局引擎.使用你在构建浏览器应用时使用过的类似CSS的属性，为你的CLI构建出色的用户界面。</p><p><img src="'+o+'" alt="图片"></p><h2 id="致谢" tabindex="-1">致谢 <a class="header-anchor" href="#致谢" aria-label="Permalink to &quot;致谢&quot;">​</a></h2><ul><li>这个项目的灵感来源于<strong>ink</strong>[17]</li><li><strong>vite-node</strong>[18]为实现HMR提供了强力的支持</li></ul>',61)]))}const f=n(u,[["render",m]]);export{v as __pageData,f as default};
