import{_ as s,c as n,o as a,d as l}from"./app.564110b9.js";const C=JSON.parse('{"title":"1. \u65B0\u7EC4\u4EF6","description":"","frontmatter":{},"headers":[{"level":2,"title":"1) Fragment(\u7247\u65AD)","slug":"_1-fragment-\u7247\u65AD","link":"#_1-fragment-\u7247\u65AD","children":[]},{"level":2,"title":"2) Teleport(\u77AC\u79FB)","slug":"_2-teleport-\u77AC\u79FB","link":"#_2-teleport-\u77AC\u79FB","children":[]},{"level":2,"title":"3) Suspense(\u4E0D\u786E\u5B9A\u7684)","slug":"_3-suspense-\u4E0D\u786E\u5B9A\u7684","link":"#_3-suspense-\u4E0D\u786E\u5B9A\u7684","children":[]}],"relativePath":"Document/Front-end-devFramework/Vue3/\u5176\u5B83\u65B0\u7EC4\u4EF6\u548CAPI/01_\u65B0\u7EC4\u4EF6.md","lastUpdated":1661764689000}'),p={name:"Document/Front-end-devFramework/Vue3/\u5176\u5B83\u65B0\u7EC4\u4EF6\u548CAPI/01_\u65B0\u7EC4\u4EF6.md"},o=l(`<h1 id="_1-\u65B0\u7EC4\u4EF6" tabindex="-1">1. \u65B0\u7EC4\u4EF6 <a class="header-anchor" href="#_1-\u65B0\u7EC4\u4EF6" aria-hidden="true">#</a></h1><h2 id="_1-fragment-\u7247\u65AD" tabindex="-1">1) Fragment(\u7247\u65AD) <a class="header-anchor" href="#_1-fragment-\u7247\u65AD" aria-hidden="true">#</a></h2><ul><li>\u5728 Vue2 \u4E2D: \u7EC4\u4EF6\u5FC5\u987B\u6709\u4E00\u4E2A\u6839\u6807\u7B7E</li><li>\u5728 Vue3 \u4E2D: \u7EC4\u4EF6\u53EF\u4EE5\u6CA1\u6709\u6839\u6807\u7B7E, \u5185\u90E8\u4F1A\u5C06\u591A\u4E2A\u6807\u7B7E\u5305\u542B\u5728\u4E00\u4E2A Fragment \u865A\u62DF\u5143\u7D20\u4E2D</li><li>\u597D\u5904: \u51CF\u5C11\u6807\u7B7E\u5C42\u7EA7, \u51CF\u5C0F\u5185\u5B58\u5360\u7528</li></ul><div class="language-vue"><button class="copy"></button><span class="lang">vue</span><pre><code><span class="line"><span style="color:#ABB2BF;">&lt;</span><span style="color:#E06C75;">template</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">  &lt;</span><span style="color:#E06C75;">h2</span><span style="color:#ABB2BF;">&gt;aaaa&lt;/</span><span style="color:#E06C75;">h2</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">  &lt;</span><span style="color:#E06C75;">h2</span><span style="color:#ABB2BF;">&gt;aaaa&lt;/</span><span style="color:#E06C75;">h2</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">&lt;/</span><span style="color:#E06C75;">template</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"></span></code></pre></div><h2 id="_2-teleport-\u77AC\u79FB" tabindex="-1">2) Teleport(\u77AC\u79FB) <a class="header-anchor" href="#_2-teleport-\u77AC\u79FB" aria-hidden="true">#</a></h2><ul><li>Teleport \u63D0\u4F9B\u4E86\u4E00\u79CD\u5E72\u51C0\u7684\u65B9\u6CD5, \u8BA9\u7EC4\u4EF6\u7684 html \u5728\u7236\u7EC4\u4EF6\u754C\u9762\u5916\u7684\u7279\u5B9A\u6807\u7B7E(\u5F88\u53EF\u80FD\u662F body)\u4E0B\u63D2\u5165\u663E\u793A</li></ul><p>ModalButton.vue</p><div class="language-vue"><button class="copy"></button><span class="lang">vue</span><pre><code><span class="line"><span style="color:#ABB2BF;">&lt;</span><span style="color:#E06C75;">template</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">  &lt;</span><span style="color:#E06C75;">button</span><span style="color:#ABB2BF;"> @</span><span style="color:#D19A66;">click</span><span style="color:#ABB2BF;">=</span><span style="color:#ABB2BF;">&quot;</span><span style="color:#E06C75;">modalOpen</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;">true</span><span style="color:#ABB2BF;">&quot;</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">    Open full screen modal! (With teleport!)</span></span>
<span class="line"><span style="color:#ABB2BF;">  &lt;/</span><span style="color:#E06C75;">button</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#ABB2BF;">  &lt;</span><span style="color:#E06C75;">teleport</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;">to</span><span style="color:#ABB2BF;">=</span><span style="color:#98C379;">&quot;body&quot;</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">    &lt;</span><span style="color:#E06C75;">div</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;">v-if</span><span style="color:#ABB2BF;">=</span><span style="color:#ABB2BF;">&quot;</span><span style="color:#E06C75;">modalOpen</span><span style="color:#ABB2BF;">&quot;</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;">class</span><span style="color:#ABB2BF;">=</span><span style="color:#98C379;">&quot;modal&quot;</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">      &lt;</span><span style="color:#E06C75;">div</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">        I&#39;m a teleported modal! (My parent is &quot;body&quot;)</span></span>
<span class="line"><span style="color:#ABB2BF;">        &lt;</span><span style="color:#E06C75;">button</span><span style="color:#ABB2BF;"> @</span><span style="color:#D19A66;">click</span><span style="color:#ABB2BF;">=</span><span style="color:#ABB2BF;">&quot;</span><span style="color:#E06C75;">modalOpen</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;">false</span><span style="color:#ABB2BF;">&quot;</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">          Close</span></span>
<span class="line"><span style="color:#ABB2BF;">        &lt;/</span><span style="color:#E06C75;">button</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">      &lt;/</span><span style="color:#E06C75;">div</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">    &lt;/</span><span style="color:#E06C75;">div</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">  &lt;/</span><span style="color:#E06C75;">teleport</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">&lt;/</span><span style="color:#E06C75;">template</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#ABB2BF;">&lt;</span><span style="color:#E06C75;">script</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#C678DD;">import</span><span style="color:#ABB2BF;"> { </span><span style="color:#E06C75;">ref</span><span style="color:#ABB2BF;"> } </span><span style="color:#C678DD;">from</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">&#39;vue&#39;</span></span>
<span class="line"><span style="color:#C678DD;">export</span><span style="color:#ABB2BF;"> </span><span style="color:#C678DD;">default</span><span style="color:#ABB2BF;"> {</span></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#E06C75;">name</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">&#39;modal-button&#39;</span><span style="color:#ABB2BF;">,</span></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#61AFEF;">setup</span><span style="color:#ABB2BF;">() {</span></span>
<span class="line"><span style="color:#ABB2BF;">    </span><span style="color:#C678DD;">const</span><span style="color:#ABB2BF;"> </span><span style="color:#E5C07B;">modalOpen</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> </span><span style="color:#61AFEF;">ref</span><span style="color:#ABB2BF;">(</span><span style="color:#D19A66;">false</span><span style="color:#ABB2BF;">)</span></span>
<span class="line"><span style="color:#ABB2BF;">    </span><span style="color:#C678DD;">return</span><span style="color:#ABB2BF;"> {</span></span>
<span class="line"><span style="color:#ABB2BF;">      </span><span style="color:#E06C75;">modalOpen</span></span>
<span class="line"><span style="color:#ABB2BF;">    }</span></span>
<span class="line"><span style="color:#ABB2BF;">  }</span></span>
<span class="line"><span style="color:#ABB2BF;">}</span></span>
<span class="line"><span style="color:#ABB2BF;">&lt;/</span><span style="color:#E06C75;">script</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#ABB2BF;">&lt;</span><span style="color:#E06C75;">style</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#D19A66;">.modal</span><span style="color:#ABB2BF;"> {</span></span>
<span class="line"><span style="color:#ABB2BF;">  position: </span><span style="color:#D19A66;">absolute</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#ABB2BF;">  top: </span><span style="color:#D19A66;">0</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#ABB2BF;">  right: </span><span style="color:#D19A66;">0</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#ABB2BF;">  bottom: </span><span style="color:#D19A66;">0</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#ABB2BF;">  left: </span><span style="color:#D19A66;">0</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#ABB2BF;">  background-color: </span><span style="color:#56B6C2;">rgba</span><span style="color:#ABB2BF;">(</span><span style="color:#D19A66;">0</span><span style="color:#ABB2BF;">, </span><span style="color:#D19A66;">0</span><span style="color:#ABB2BF;">, </span><span style="color:#D19A66;">0</span><span style="color:#ABB2BF;">, </span><span style="color:#D19A66;">0.5</span><span style="color:#ABB2BF;">);</span></span>
<span class="line"><span style="color:#ABB2BF;">  display: </span><span style="color:#D19A66;">flex</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#ABB2BF;">  flex-direction: </span><span style="color:#D19A66;">column</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#ABB2BF;">  align-items: </span><span style="color:#D19A66;">center</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#ABB2BF;">  justify-content: </span><span style="color:#D19A66;">center</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#ABB2BF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D19A66;">.modal</span><span style="color:#C678DD;"> </span><span style="color:#E06C75;">div</span><span style="color:#ABB2BF;"> {</span></span>
<span class="line"><span style="color:#ABB2BF;">  display: </span><span style="color:#D19A66;">flex</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#ABB2BF;">  flex-direction: </span><span style="color:#D19A66;">column</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#ABB2BF;">  align-items: </span><span style="color:#D19A66;">center</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#ABB2BF;">  justify-content: </span><span style="color:#D19A66;">center</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#ABB2BF;">  background-color: </span><span style="color:#D19A66;">white</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#ABB2BF;">  width: </span><span style="color:#D19A66;">300</span><span style="color:#E06C75;">px</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#ABB2BF;">  height: </span><span style="color:#D19A66;">300</span><span style="color:#E06C75;">px</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#ABB2BF;">  padding: </span><span style="color:#D19A66;">5</span><span style="color:#E06C75;">px</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#ABB2BF;">}</span></span>
<span class="line"><span style="color:#ABB2BF;">&lt;/</span><span style="color:#E06C75;">style</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"></span></code></pre></div><p>App.vue</p><div class="language-vue"><button class="copy"></button><span class="lang">vue</span><pre><code><span class="line"><span style="color:#ABB2BF;">&lt;</span><span style="color:#E06C75;">template</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">  &lt;</span><span style="color:#E06C75;">h2</span><span style="color:#ABB2BF;">&gt;App&lt;/</span><span style="color:#E06C75;">h2</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">  &lt;</span><span style="color:#E06C75;">modal-button</span><span style="color:#ABB2BF;">&gt;&lt;/</span><span style="color:#E06C75;">modal-button</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">&lt;/</span><span style="color:#E06C75;">template</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#ABB2BF;">&lt;</span><span style="color:#E06C75;">script</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;">lang</span><span style="color:#ABB2BF;">=</span><span style="color:#98C379;">&quot;ts&quot;</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#C678DD;">import</span><span style="color:#ABB2BF;"> </span><span style="color:#E06C75;">ModalButton</span><span style="color:#ABB2BF;"> </span><span style="color:#C678DD;">from</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">&#39;./ModalButton.vue&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C678DD;">export</span><span style="color:#ABB2BF;"> </span><span style="color:#C678DD;">default</span><span style="color:#ABB2BF;"> {</span></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#61AFEF;">setup</span><span style="color:#ABB2BF;">() {</span></span>
<span class="line"><span style="color:#ABB2BF;">    </span><span style="color:#C678DD;">return</span><span style="color:#ABB2BF;"> {}</span></span>
<span class="line"><span style="color:#ABB2BF;">  },</span></span>
<span class="line"></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#E06C75;">components</span><span style="color:#ABB2BF;">: {</span></span>
<span class="line"><span style="color:#ABB2BF;">    </span><span style="color:#E06C75;">ModalButton</span></span>
<span class="line"><span style="color:#ABB2BF;">  }</span></span>
<span class="line"><span style="color:#ABB2BF;">}</span></span>
<span class="line"><span style="color:#ABB2BF;">&lt;/</span><span style="color:#E06C75;">script</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"></span></code></pre></div><h2 id="_3-suspense-\u4E0D\u786E\u5B9A\u7684" tabindex="-1">3) Suspense(\u4E0D\u786E\u5B9A\u7684) <a class="header-anchor" href="#_3-suspense-\u4E0D\u786E\u5B9A\u7684" aria-hidden="true">#</a></h2><ul><li>\u5B83\u4EEC\u5141\u8BB8\u6211\u4EEC\u7684\u5E94\u7528\u7A0B\u5E8F\u5728\u7B49\u5F85\u5F02\u6B65\u7EC4\u4EF6\u65F6\u6E32\u67D3\u4E00\u4E9B\u540E\u5907\u5185\u5BB9\uFF0C\u53EF\u4EE5\u8BA9\u6211\u4EEC\u521B\u5EFA\u4E00\u4E2A\u5E73\u6ED1\u7684\u7528\u6237\u4F53\u9A8C</li></ul><div class="language-vue"><button class="copy"></button><span class="lang">vue</span><pre><code><span class="line"><span style="color:#ABB2BF;">&lt;</span><span style="color:#E06C75;">template</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">  &lt;</span><span style="color:#E5C07B;">Suspense</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">    &lt;</span><span style="color:#E06C75;">template</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;">v-slot:default</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">      &lt;</span><span style="color:#E5C07B;">AsyncComp</span><span style="color:#ABB2BF;"> /&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">      </span><span style="color:#7F848E;">&lt;!-- &lt;AsyncAddress/&gt; --&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">    &lt;/</span><span style="color:#E06C75;">template</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#ABB2BF;">    &lt;</span><span style="color:#E06C75;">template</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;">v-slot:fallback</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">      &lt;</span><span style="color:#E06C75;">h1</span><span style="color:#ABB2BF;">&gt;LOADING...&lt;/</span><span style="color:#E06C75;">h1</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">    &lt;/</span><span style="color:#E06C75;">template</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">  &lt;/</span><span style="color:#E5C07B;">Suspense</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">&lt;/</span><span style="color:#E06C75;">template</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#ABB2BF;">&lt;</span><span style="color:#E06C75;">script</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;">lang</span><span style="color:#ABB2BF;">=</span><span style="color:#98C379;">&quot;ts&quot;</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#7F848E;">/*</span></span>
<span class="line"><span style="color:#7F848E;">\u5F02\u6B65\u7EC4\u4EF6 + Suspense\u7EC4\u4EF6</span></span>
<span class="line"><span style="color:#7F848E;">*/</span></span>
<span class="line"><span style="color:#7F848E;">// import AsyncComp from &#39;./AsyncComp.vue&#39;</span></span>
<span class="line"><span style="color:#C678DD;">import</span><span style="color:#ABB2BF;"> </span><span style="color:#E06C75;">AsyncAddress</span><span style="color:#ABB2BF;"> </span><span style="color:#C678DD;">from</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">&#39;./AsyncAddress.vue&#39;</span></span>
<span class="line"><span style="color:#C678DD;">import</span><span style="color:#ABB2BF;"> { </span><span style="color:#E06C75;">defineAsyncComponent</span><span style="color:#ABB2BF;"> } </span><span style="color:#C678DD;">from</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">&#39;vue&#39;</span></span>
<span class="line"><span style="color:#C678DD;">const</span><span style="color:#ABB2BF;"> </span><span style="color:#E5C07B;">AsyncComp</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> </span><span style="color:#61AFEF;">defineAsyncComponent</span><span style="color:#ABB2BF;">(() </span><span style="color:#C678DD;">=&gt;</span><span style="color:#ABB2BF;"> </span><span style="color:#61AFEF;">import</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&#39;./AsyncComp.vue&#39;</span><span style="color:#ABB2BF;">))</span></span>
<span class="line"><span style="color:#C678DD;">export</span><span style="color:#ABB2BF;"> </span><span style="color:#C678DD;">default</span><span style="color:#ABB2BF;"> {</span></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#61AFEF;">setup</span><span style="color:#ABB2BF;">() {</span></span>
<span class="line"><span style="color:#ABB2BF;">    </span><span style="color:#C678DD;">return</span><span style="color:#ABB2BF;"> {}</span></span>
<span class="line"><span style="color:#ABB2BF;">  },</span></span>
<span class="line"></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#E06C75;">components</span><span style="color:#ABB2BF;">: {</span></span>
<span class="line"><span style="color:#ABB2BF;">    </span><span style="color:#E06C75;">AsyncComp</span><span style="color:#ABB2BF;">,</span></span>
<span class="line"><span style="color:#ABB2BF;">    </span><span style="color:#E06C75;">AsyncAddress</span></span>
<span class="line"><span style="color:#ABB2BF;">  }</span></span>
<span class="line"><span style="color:#ABB2BF;">}</span></span>
<span class="line"><span style="color:#ABB2BF;">&lt;/</span><span style="color:#E06C75;">script</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"></span></code></pre></div><ul><li>AsyncComp.vue</li></ul><div class="language-vue"><button class="copy"></button><span class="lang">vue</span><pre><code><span class="line"><span style="color:#ABB2BF;">&lt;</span><span style="color:#E06C75;">template</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">  &lt;</span><span style="color:#E06C75;">h2</span><span style="color:#ABB2BF;">&gt;AsyncComp22&lt;/</span><span style="color:#E06C75;">h2</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">  &lt;</span><span style="color:#E06C75;">p</span><span style="color:#ABB2BF;">&gt;{{ </span><span style="color:#E06C75;">msg</span><span style="color:#ABB2BF;"> }}&lt;/</span><span style="color:#E06C75;">p</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">&lt;/</span><span style="color:#E06C75;">template</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#ABB2BF;">&lt;</span><span style="color:#E06C75;">script</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;">lang</span><span style="color:#ABB2BF;">=</span><span style="color:#98C379;">&quot;ts&quot;</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#C678DD;">export</span><span style="color:#ABB2BF;"> </span><span style="color:#C678DD;">default</span><span style="color:#ABB2BF;"> {</span></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#E06C75;">name</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">&#39;AsyncComp&#39;</span><span style="color:#ABB2BF;">,</span></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#61AFEF;">setup</span><span style="color:#ABB2BF;">() {</span></span>
<span class="line"><span style="color:#ABB2BF;">    </span><span style="color:#7F848E;">// return new Promise((resolve, reject) =&gt; {</span></span>
<span class="line"><span style="color:#ABB2BF;">    </span><span style="color:#7F848E;">//   setTimeout(() =&gt; {</span></span>
<span class="line"><span style="color:#ABB2BF;">    </span><span style="color:#7F848E;">//     resolve({</span></span>
<span class="line"><span style="color:#ABB2BF;">    </span><span style="color:#7F848E;">//       msg: &#39;abc&#39;</span></span>
<span class="line"><span style="color:#ABB2BF;">    </span><span style="color:#7F848E;">//     })</span></span>
<span class="line"><span style="color:#ABB2BF;">    </span><span style="color:#7F848E;">//   }, 2000)</span></span>
<span class="line"><span style="color:#ABB2BF;">    </span><span style="color:#7F848E;">// })</span></span>
<span class="line"><span style="color:#ABB2BF;">    </span><span style="color:#C678DD;">return</span><span style="color:#ABB2BF;"> {</span></span>
<span class="line"><span style="color:#ABB2BF;">      </span><span style="color:#E06C75;">msg</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">&#39;abc&#39;</span></span>
<span class="line"><span style="color:#ABB2BF;">    }</span></span>
<span class="line"><span style="color:#ABB2BF;">  }</span></span>
<span class="line"><span style="color:#ABB2BF;">}</span></span>
<span class="line"><span style="color:#ABB2BF;">&lt;/</span><span style="color:#E06C75;">script</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"></span></code></pre></div><ul><li>AsyncAddress.vue</li></ul><div class="language-vue"><button class="copy"></button><span class="lang">vue</span><pre><code><span class="line"><span style="color:#ABB2BF;">&lt;</span><span style="color:#E06C75;">template</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">  &lt;</span><span style="color:#E06C75;">h2</span><span style="color:#ABB2BF;">&gt;{{ </span><span style="color:#E06C75;">data</span><span style="color:#ABB2BF;"> }}&lt;/</span><span style="color:#E06C75;">h2</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">&lt;/</span><span style="color:#E06C75;">template</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#ABB2BF;">&lt;</span><span style="color:#E06C75;">script</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;">lang</span><span style="color:#ABB2BF;">=</span><span style="color:#98C379;">&quot;ts&quot;</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#C678DD;">import</span><span style="color:#ABB2BF;"> </span><span style="color:#E06C75;">axios</span><span style="color:#ABB2BF;"> </span><span style="color:#C678DD;">from</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">&#39;axios&#39;</span></span>
<span class="line"><span style="color:#C678DD;">export</span><span style="color:#ABB2BF;"> </span><span style="color:#C678DD;">default</span><span style="color:#ABB2BF;"> {</span></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#C678DD;">async</span><span style="color:#ABB2BF;"> </span><span style="color:#61AFEF;">setup</span><span style="color:#ABB2BF;">() {</span></span>
<span class="line"><span style="color:#ABB2BF;">    </span><span style="color:#C678DD;">const</span><span style="color:#ABB2BF;"> </span><span style="color:#E5C07B;">result</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> </span><span style="color:#C678DD;">await</span><span style="color:#ABB2BF;"> </span><span style="color:#E5C07B;">axios</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">get</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&#39;/data/address.json&#39;</span><span style="color:#ABB2BF;">)</span></span>
<span class="line"><span style="color:#ABB2BF;">    </span><span style="color:#C678DD;">return</span><span style="color:#ABB2BF;"> {</span></span>
<span class="line"><span style="color:#ABB2BF;">      </span><span style="color:#E06C75;">data</span><span style="color:#ABB2BF;">: </span><span style="color:#E5C07B;">result</span><span style="color:#ABB2BF;">.</span><span style="color:#E06C75;">data</span></span>
<span class="line"><span style="color:#ABB2BF;">    }</span></span>
<span class="line"><span style="color:#ABB2BF;">  }</span></span>
<span class="line"><span style="color:#ABB2BF;">}</span></span>
<span class="line"><span style="color:#ABB2BF;">&lt;/</span><span style="color:#E06C75;">script</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"></span></code></pre></div>`,17),e=[o];function B(t,c,r,y,A,F){return a(),n("div",null,e)}const u=s(p,[["render",B]]);export{C as __pageData,u as default};
