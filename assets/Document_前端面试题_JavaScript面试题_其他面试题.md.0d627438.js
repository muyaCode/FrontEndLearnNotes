import{_ as s,c as n,o as a,d as l}from"./app.661b9247.js";const f=JSON.parse('{"title":"其他面试题","description":"","frontmatter":{},"headers":[{"level":2,"title":"相等性判断","slug":"相等性判断","link":"#相等性判断","children":[]}],"relativePath":"Document/前端面试题/JavaScript面试题/其他面试题.md","lastUpdated":1673284671000}'),e={name:"Document/前端面试题/JavaScript面试题/其他面试题.md"},p=l(`<h1 id="其他面试题" tabindex="-1">其他面试题 <a class="header-anchor" href="#其他面试题" aria-hidden="true">#</a></h1><h2 id="相等性判断" tabindex="-1">相等性判断 <a class="header-anchor" href="#相等性判断" aria-hidden="true">#</a></h2><p>文档：<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Equality_comparisons_and_sameness" target="_blank" rel="noreferrer">JavaScript 中的相等性判断 - JavaScript | MDN (mozilla.org)</a></p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki one-dark-pro"><code><span class="line"><span style="color:#7F848E;font-style:italic;">// JS中相等性的判断</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">// ES6版本，四种相等判断的算法</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">// 全等 三等 ===</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">// 等于 ==</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">// 零值相等：-0 === +0</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">// 同值相等：-0 !== +0    NaN === NaN</span></span>
<span class="line"></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">// JS中提供有关相等判断的操作方法</span></span>
<span class="line"></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">// 严格相等 === Strict Equality</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">// 非严格 (抽象/非约束) 相等 == Loose(自由的，不受限制的) Equality</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">// 0bject.is(v1，v2) ES6新的API，判断两个参数是否是同一个值</span></span>
<span class="line"></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">// === 严格相等</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">// 不进行隐式类型转换 - 类型相同/值也相同</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">// 1 === &#39;1&#39; ? false  1 === 2 ? false</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">// 引用值必须是同一地址</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">// var obj = {}    obj === obj ? true  {} === {} ? false</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">// 两个NaN 或者是NaN跟其他值都不相等</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">// NaN===·NaN ? false     NaN === undefined ? false</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">// +0和-0相等</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">// +0 === -0 ? true</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">// + Infinity 与 - Infinity  相等</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">// + Infinity === - Infinity 不相等</span></span>
<span class="line"></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">// 如何定义变量a不能等于变量a：a !== a;  true  =&gt; var a = NaN;  因为NaN !== NaN</span></span>
<span class="line"></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">// 非严格相等  Abstract equality</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">// 隐式类型转换 - 等式两边都有可能被转换</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">// 转换以后还是用严格相等进行比较：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Equality_comparisons_and_sameness#%E9%9D%9E%E4%B8%A5%E6%A0%BC%E7%9B%B8%E7%AD%89</span></span>
<span class="line"></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">// ToNumber(A) 尝试在比较前将参数 A 转换为数字，这与 +A（单目运算符 +）的效果相同。ToPrimitive(A)通过尝试调用 A 的A.toString() 和 A.valueOf() 方法，将参数 A 转换为原始值（Primitive）</span></span>
<span class="line"></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">// 任何对象都与undefined和null不相等</span></span>
<span class="line"></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">// ===全等对结果的预测是更加清晰明确的</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">// 全等在不隐式类型转换的前提下，更快</span></span>
<span class="line"></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">// falsy值（假的值） 有8个</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">// false 0，+0/-0，8n，&quot;&quot;，&#39;&#39;，\`\`，null，undefined，NaN</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">// 同值相等(same-value)  -0 !== +0 但 NaN === NaN  （正常情况NaN !== NaN）</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">// 零值相等   same-value-zero -0 === +0</span></span>
<span class="line"></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">// 同值相等的底层实现 Object.is() -- 同值相等的实现</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">// Object.is() ES6抛出来的方法</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">// ES5并没有暴露JS引擎的同值相等的方法</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">// 同值相等例子：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Equality_comparisons_and_sameness#%E7%90%86%E8%A7%A3%E7%9B%B8%E7%AD%89%E6%AF%94%E8%BE%83%E7%9A%84%E6%A8%A1%E5%9E%8B</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">// const res1 = Object.is(NaN, NaN)</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">// const res2 = Object.is(null, null)</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">// const res3 = Object.is(undefined, undefined)</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">// const res4 = Object.is(&quot;1&quot;, &quot;1&quot;)</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">// const res5 = Object.is(1, 1)</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">// const res6 = Object.is(-0, +0)</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">// console.log(res1)</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">// console.log(res2)</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">// console.log(res3)</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">// console.log(res4)</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">// console.log(res5)</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">// console.log(res6)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">// 实现同值相等</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">// Object.myIs = function (a, b) {</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">//   if(a === b) {</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">//     // (1 / a === 1 / b) 解析：1 / +0  等于Infinity， 1 / -0 等于 -Infinity，所以+0和-0为false</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">//     return a !== 0 || 1 / a === 1 / b;</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">//   }</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">//   // NaN === NaN的原理</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">//   return a !== a &amp;&amp; b !== b;</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">// }</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br></div></div>`,4),i=[p];function t(c,r,o,b,y,u){return a(),n("div",null,i)}const E=s(e,[["render",t]]);export{f as __pageData,E as default};
