import{_ as s,c as a,o as n,d as l}from"./app.564110b9.js";const b=JSON.parse('{"title":"\u4F7F\u7528 VuePress \u642D\u5EFA\u5728\u7EBF\u6587\u6863\u7F51\u7AD9","description":"","frontmatter":{},"headers":[{"level":2,"title":"0. \u5728\u7EBF\u6587\u6863","slug":"_0-\u5728\u7EBF\u6587\u6863","link":"#_0-\u5728\u7EBF\u6587\u6863","children":[]},{"level":2,"title":"1. \u642D\u5EFA\u57FA\u672C\u73AF\u5883","slug":"_1-\u642D\u5EFA\u57FA\u672C\u73AF\u5883","link":"#_1-\u642D\u5EFA\u57FA\u672C\u73AF\u5883","children":[]},{"level":2,"title":"2. \u914D\u7F6E ts \u6559\u7A0B\u6587\u6863","slug":"_2-\u914D\u7F6E-ts-\u6559\u7A0B\u6587\u6863","link":"#_2-\u914D\u7F6E-ts-\u6559\u7A0B\u6587\u6863","children":[]},{"level":2,"title":"3. \u53D1\u5E03\u5230 gitpage","slug":"_3-\u53D1\u5E03\u5230-gitpage","link":"#_3-\u53D1\u5E03\u5230-gitpage","children":[]}],"relativePath":"Document/Front-end-devFramework/Vue3/\u642D\u5EFA\u5728\u7EBF\u6587\u6863\u7F51\u7AD9/01_VuePress\u642D\u5EFA\u5728\u7EBF\u6587\u6863.md","lastUpdated":1661245277000}'),p={name:"Document/Front-end-devFramework/Vue3/\u642D\u5EFA\u5728\u7EBF\u6587\u6863\u7F51\u7AD9/01_VuePress\u642D\u5EFA\u5728\u7EBF\u6587\u6863.md"},e=l(`<h1 id="\u4F7F\u7528-vuepress-\u642D\u5EFA\u5728\u7EBF\u6587\u6863\u7F51\u7AD9" tabindex="-1">\u4F7F\u7528 VuePress \u642D\u5EFA\u5728\u7EBF\u6587\u6863\u7F51\u7AD9 <a class="header-anchor" href="#\u4F7F\u7528-vuepress-\u642D\u5EFA\u5728\u7EBF\u6587\u6863\u7F51\u7AD9" aria-hidden="true">#</a></h1><h2 id="_0-\u5728\u7EBF\u6587\u6863" tabindex="-1">0. \u5728\u7EBF\u6587\u6863 <a class="header-anchor" href="#_0-\u5728\u7EBF\u6587\u6863" aria-hidden="true">#</a></h2><p><a href="https://vuepress.vuejs.org/zh/" target="_blank" rel="noreferrer">VuePress \u5B98\u65B9\u5728\u7EBF\u6587\u6863</a></p><h2 id="_1-\u642D\u5EFA\u57FA\u672C\u73AF\u5883" tabindex="-1">1. \u642D\u5EFA\u57FA\u672C\u73AF\u5883 <a class="header-anchor" href="#_1-\u642D\u5EFA\u57FA\u672C\u73AF\u5883" aria-hidden="true">#</a></h2><div class="language-bash"><button class="copy"></button><span class="lang">bash</span><pre><code><span class="line"><span style="color:#7F848E;"># \u5C06 VuePress \u4F5C\u4E3A\u4E00\u4E2A\u672C\u5730\u4F9D\u8D56\u5B89\u88C5</span></span>
<span class="line"><span style="color:#ABB2BF;">npm install -D vuepress</span></span>
<span class="line"><span style="color:#7F848E;"># \u65B0\u5EFA\u4E00\u4E2A docs \u6587\u4EF6\u5939</span></span>
<span class="line"><span style="color:#ABB2BF;">mkdir docs</span></span>
<span class="line"><span style="color:#7F848E;"># \u65B0\u5EFA\u4E00\u4E2A\u6587\u4EF6: docs/README.md</span></span>
<span class="line"><span style="color:#56B6C2;">echo</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">&#39;# Hello VuePress!&#39;</span><span style="color:#ABB2BF;"> &gt; docs/README.md</span></span>
<span class="line"><span style="color:#7F848E;"># \u542F\u52A8\u6587\u6863\u9879\u76EE</span></span>
<span class="line"><span style="color:#ABB2BF;">npx vuepress dev docs</span></span>
<span class="line"><span style="color:#7F848E;"># \u6784\u5EFA\u9759\u6001\u6587\u4EF6</span></span>
<span class="line"><span style="color:#ABB2BF;">npx vuepress build docs</span></span>
<span class="line"><span style="color:#ABB2BF;">  |-- docs</span></span>
<span class="line"><span style="color:#ABB2BF;">    |-- .vuepress</span></span>
<span class="line"><span style="color:#ABB2BF;">      |-- config.js</span></span>
<span class="line"><span style="color:#ABB2BF;">    |-- README.md</span></span>
<span class="line"></span></code></pre></div><h2 id="_2-\u914D\u7F6E-ts-\u6559\u7A0B\u6587\u6863" tabindex="-1">2. \u914D\u7F6E ts \u6559\u7A0B\u6587\u6863 <a class="header-anchor" href="#_2-\u914D\u7F6E-ts-\u6559\u7A0B\u6587\u6863" aria-hidden="true">#</a></h2><ol><li>\u6574\u4F53\u7ED3\u6784</li></ol><div class="language-"><button class="copy"></button><span class="lang"></span><pre><code><span class="line"><span style="color:#abb2bf;">|-- dist</span></span>
<span class="line"><span style="color:#abb2bf;">|-- dics</span></span>
<span class="line"><span style="color:#abb2bf;">  |-- .vuepress</span></span>
<span class="line"><span style="color:#abb2bf;">    |-- public</span></span>
<span class="line"><span style="color:#abb2bf;">      |-- ts-logo.png</span></span>
<span class="line"><span style="color:#abb2bf;">    |-- config.js</span></span>
<span class="line"><span style="color:#abb2bf;">  |-- chapter1</span></span>
<span class="line"><span style="color:#abb2bf;">    |-- 01_\u521D\u8BC6TS.md</span></span>
<span class="line"><span style="color:#abb2bf;">    |-- 02_\u5B89\u88C5TS.md</span></span>
<span class="line"><span style="color:#abb2bf;">    |-- 03_HelloWorld.md</span></span>
<span class="line"><span style="color:#abb2bf;">  |-- chapter2</span></span>
<span class="line"><span style="color:#abb2bf;">    |-- 1_type.md</span></span>
<span class="line"><span style="color:#abb2bf;">    |-- 2_interface.md</span></span>
<span class="line"><span style="color:#abb2bf;">    |-- 3_class.md</span></span>
<span class="line"><span style="color:#abb2bf;">    |-- 4_function.md</span></span>
<span class="line"><span style="color:#abb2bf;">    |-- 5_generic.md</span></span>
<span class="line"><span style="color:#abb2bf;">    |-- 6_other.md</span></span>
<span class="line"><span style="color:#abb2bf;">  |-- chapter3</span></span>
<span class="line"><span style="color:#abb2bf;">    |-- 01_react.md</span></span>
<span class="line"><span style="color:#abb2bf;">    |-- 02_vue.md</span></span>
<span class="line"><span style="color:#abb2bf;">  |-- chapter4</span></span>
<span class="line"><span style="color:#abb2bf;">    |-- README.md</span></span>
<span class="line"><span style="color:#abb2bf;">  |-- README.md</span></span>
<span class="line"><span style="color:#abb2bf;">|-- package.json</span></span>
<span class="line"><span style="color:#abb2bf;"></span></span></code></pre></div><ol><li>\u589E\u52A0 <code>docs/.vuepress/config.js</code></li></ol><div class="language-javascript"><button class="copy"></button><span class="lang">javascript</span><pre><code><span class="line"><span style="color:#7F848E;">// \u6CE8\u610F: base\u7684\u503C\u4E3Agithub\u4ED3\u5E93\u7684\u540D\u79F0</span></span>
<span class="line"><span style="color:#E5C07B;">module</span><span style="color:#ABB2BF;">.</span><span style="color:#E5C07B;">exports</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> {</span></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#E06C75;">base</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">&#39;/ts-study/&#39;</span><span style="color:#ABB2BF;"> </span><span style="color:#7F848E;">/* \u57FA\u7840\u865A\u62DF\u8DEF\u5F84: */</span><span style="color:#ABB2BF;">,</span></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#E06C75;">dest</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">&#39;dist&#39;</span><span style="color:#ABB2BF;"> </span><span style="color:#7F848E;">/* \u6253\u5305\u6587\u4EF6\u57FA\u7840\u8DEF\u5F84, \u5728\u547D\u4EE4\u6240\u5728\u76EE\u5F55\u4E0B */</span><span style="color:#ABB2BF;">,</span></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#E06C75;">title</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">&#39;TypeScript \u5165\u95E8&#39;</span><span style="color:#ABB2BF;">, </span><span style="color:#7F848E;">// \u6807\u9898</span></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#E06C75;">description</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">&#39;\u5B66\u4E60\u4F7F\u7528 TypeScript&#39;</span><span style="color:#ABB2BF;">, </span><span style="color:#7F848E;">// \u6807\u9898\u4E0B\u7684\u63CF\u8FF0</span></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#E06C75;">themeConfig</span><span style="color:#ABB2BF;">: {</span></span>
<span class="line"><span style="color:#ABB2BF;">    </span><span style="color:#7F848E;">// \u4E3B\u9898\u914D\u7F6E</span></span>
<span class="line"><span style="color:#ABB2BF;">    </span><span style="color:#E06C75;">sidebar</span><span style="color:#ABB2BF;">: [</span></span>
<span class="line"><span style="color:#ABB2BF;">      </span><span style="color:#7F848E;">// \u5DE6\u4FA7\u5BFC\u822A</span></span>
<span class="line"><span style="color:#ABB2BF;">      {</span></span>
<span class="line"><span style="color:#ABB2BF;">        </span><span style="color:#E06C75;">title</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">&#39;\u521D\u8BC6 TypeScript&#39;</span><span style="color:#ABB2BF;">, </span><span style="color:#7F848E;">// \u6807\u9898</span></span>
<span class="line"><span style="color:#ABB2BF;">        </span><span style="color:#E06C75;">collapsable</span><span style="color:#ABB2BF;">: </span><span style="color:#D19A66;">false</span><span style="color:#ABB2BF;">, </span><span style="color:#7F848E;">// \u4E0B\u7EA7\u5217\u8868\u4E0D\u53EF\u6298\u53E0</span></span>
<span class="line"><span style="color:#ABB2BF;">        </span><span style="color:#E06C75;">children</span><span style="color:#ABB2BF;">: [</span></span>
<span class="line"><span style="color:#ABB2BF;">          </span><span style="color:#7F848E;">// \u4E0B\u7EA7\u5217\u8868</span></span>
<span class="line"><span style="color:#ABB2BF;">          </span><span style="color:#98C379;">&#39;chapter1/01_\u521D\u8BC6TS&#39;</span><span style="color:#ABB2BF;">,</span></span>
<span class="line"><span style="color:#ABB2BF;">          </span><span style="color:#98C379;">&#39;chapter1/02_\u5B89\u88C5TS&#39;</span><span style="color:#ABB2BF;">,</span></span>
<span class="line"><span style="color:#ABB2BF;">          </span><span style="color:#98C379;">&#39;chapter1/03_HelloWorld&#39;</span></span>
<span class="line"><span style="color:#ABB2BF;">        ]</span></span>
<span class="line"><span style="color:#ABB2BF;">      },</span></span>
<span class="line"><span style="color:#ABB2BF;">      {</span></span>
<span class="line"><span style="color:#ABB2BF;">        </span><span style="color:#E06C75;">title</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">&#39;TypeScript \u5E38\u7528\u8BED\u6CD5&#39;</span><span style="color:#ABB2BF;">,</span></span>
<span class="line"><span style="color:#ABB2BF;">        </span><span style="color:#E06C75;">collapsable</span><span style="color:#ABB2BF;">: </span><span style="color:#D19A66;">false</span><span style="color:#ABB2BF;">,</span></span>
<span class="line"><span style="color:#ABB2BF;">        </span><span style="color:#E06C75;">children</span><span style="color:#ABB2BF;">: [</span><span style="color:#98C379;">&#39;chapter2/1_type&#39;</span><span style="color:#ABB2BF;">, </span><span style="color:#98C379;">&#39;chapter2/2_interface&#39;</span><span style="color:#ABB2BF;">, </span><span style="color:#98C379;">&#39;chapter2/3_class&#39;</span><span style="color:#ABB2BF;">, </span><span style="color:#98C379;">&#39;chapter2/4_function&#39;</span><span style="color:#ABB2BF;">, </span><span style="color:#98C379;">&#39;chapter2/5_generic&#39;</span><span style="color:#ABB2BF;">]</span></span>
<span class="line"><span style="color:#ABB2BF;">      }</span></span>
<span class="line"><span style="color:#ABB2BF;">    ]</span></span>
<span class="line"><span style="color:#ABB2BF;">  }</span></span>
<span class="line"><span style="color:#ABB2BF;">}</span></span>
<span class="line"></span></code></pre></div><ol start="2"><li>\u589E\u52A0 <code>docs/README.md</code></li></ol><div class="language-bash"><button class="copy"></button><span class="lang">bash</span><pre><code><span class="line"><span style="color:#ABB2BF;">---</span></span>
<span class="line"><span style="color:#7F848E;">#\u9996\u9875</span></span>
<span class="line"><span style="color:#ABB2BF;">home: </span><span style="color:#56B6C2;">true</span></span>
<span class="line"><span style="color:#7F848E;"># \u56FE\u6807</span></span>
<span class="line"><span style="color:#ABB2BF;">heroImage: /ts-logo.png</span></span>
<span class="line"><span style="color:#7F848E;"># \u6309\u94AE\u6587\u672C</span></span>
<span class="line"><span style="color:#ABB2BF;">actionText: \u5F00\u59CB\u5B66\u4E60 \u2192</span></span>
<span class="line"><span style="color:#7F848E;"># \u6309\u94AE\u70B9\u51FB\u8DF3\u8F6C\u8DEF\u5F84</span></span>
<span class="line"><span style="color:#ABB2BF;">actionLink: /chapter1/01_\u521D\u8BC6TS</span></span>
<span class="line"><span style="color:#ABB2BF;">---</span></span>
<span class="line"></span></code></pre></div><ol start="3"><li>\u4FEE\u6539 <code>package.json</code></li></ol><div class="language-json"><button class="copy"></button><span class="lang">json</span><pre><code><span class="line"><span style="color:#98C379;">&quot;scripts&quot;</span><span style="color:#ABB2BF;">: {</span></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#E06C75;">&quot;doc:dev&quot;</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">&quot;vuepress dev docs&quot;</span><span style="color:#ABB2BF;">,</span></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#E06C75;">&quot;doc:build&quot;</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">&quot;vuepress build docs&quot;</span><span style="color:#ABB2BF;">,</span></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#E06C75;">&quot;doc:deploy&quot;</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">&quot;gh-pages -d docs/dist&quot;</span></span>
<span class="line"><span style="color:#ABB2BF;">}</span></span>
<span class="line"></span></code></pre></div><h2 id="_3-\u53D1\u5E03\u5230-gitpage" tabindex="-1">3. \u53D1\u5E03\u5230 gitpage <a class="header-anchor" href="#_3-\u53D1\u5E03\u5230-gitpage" aria-hidden="true">#</a></h2><ol><li><p>\u4F7F\u7528 git \u7BA1\u7406\u5F53\u524D\u9879\u76EE</p></li><li><p>\u5C06\u6253\u5305\u7684\u9879\u76EE\u63A8\u9001\u5230 gitpage</p></li></ol><div class="language-bash"><button class="copy"></button><span class="lang">bash</span><pre><code><span class="line"><span style="color:#7F848E;"># \u4E0B\u8F7D\u5DE5\u5177\u5305</span></span>
<span class="line"><span style="color:#ABB2BF;">yarn add -D gh-pages</span></span>
<span class="line"><span style="color:#7F848E;"># \u6267\u884C\u6253\u5305\u547D\u4EE4</span></span>
<span class="line"><span style="color:#ABB2BF;">yarn doc:build</span></span>
<span class="line"><span style="color:#7F848E;"># \u6267\u884C\u90E8\u7F72\u547D\u4EE4</span></span>
<span class="line"><span style="color:#ABB2BF;">yarn doc:deploy</span></span>
<span class="line"></span></code></pre></div>`,17),o=[e];function c(t,r,B,i,y,d){return n(),a("div",null,o)}const A=s(p,[["render",c]]);export{b as __pageData,A as default};
