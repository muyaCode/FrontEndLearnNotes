import{_ as n,c as a,o as l,ah as p}from"./chunks/framework.DqD713j2.js";const y=JSON.parse('{"title":"Node 项目项目开发跨域问题 - Nginx 配置","description":"","frontmatter":{},"headers":[],"relativePath":"Document/Node后端框架开发/Node项目开发跨域问题.md","filePath":"Document/Node后端框架开发/Node项目开发跨域问题.md","lastUpdated":1750954157000}'),F={name:"Document/Node后端框架开发/Node项目开发跨域问题.md"};function e(o,s,r,c,t,i){return l(),a("div",null,s[0]||(s[0]=[p(`<h1 id="node-项目项目开发跨域问题-nginx-配置" tabindex="-1">Node 项目项目开发跨域问题 - Nginx 配置 <a class="header-anchor" href="#node-项目项目开发跨域问题-nginx-配置" aria-label="Permalink to &quot;Node 项目项目开发跨域问题 - Nginx 配置&quot;">​</a></h1><h2 id="前后端分离开发的项目存在跨域问题" tabindex="-1">前后端分离开发的项目存在跨域问题 <a class="header-anchor" href="#前后端分离开发的项目存在跨域问题" aria-label="Permalink to &quot;前后端分离开发的项目存在跨域问题&quot;">​</a></h2><h3 id="_1-什么是跨域" tabindex="-1">1.什么是跨域? <a class="header-anchor" href="#_1-什么是跨域" aria-label="Permalink to &quot;1.什么是跨域?&quot;">​</a></h3><p><a href="https://www.xxx.com:3000" target="_blank" rel="noreferrer">https://www.xxx.com:3000</a></p><p><a href="http://www.xxx.com:3000" target="_blank" rel="noreferrer">http://www.xxx.com:3000</a></p><p>协议/一级域名/二级域名/端口号 有一个不同就是跨域</p><p>由于 3000 端口和 3001 端口不同, 所以就是跨域</p><p>所以我们在 3000 端口设置的 cookie3001 是不能使用的，</p><p>而我们在 3001 端口设置的 cookie3000 也是不能使用的</p><h3 id="_2-cookie-的跨域问题" tabindex="-1">2.Cookie 的跨域问题 <a class="header-anchor" href="#_2-cookie-的跨域问题" aria-label="Permalink to &quot;2.Cookie 的跨域问题&quot;">​</a></h3><p>Cookie 是不能跨域使用的, 所以在前后端分离开发的时候，我们当前的代码就会出现问题</p><p>例如:</p><p>前端地址: <a href="http://192.168.0.107:3001/login.html" target="_blank" rel="noreferrer">http://192.168.0.107:3001/login.html</a></p><p>后端地址: <a href="http://127.0.0.1:3000/api/user/testookie%E7%9A%84%E8%B7%A8%E5%9F%9F%E9%97%AE%E9%A2%98" target="_blank" rel="noreferrer">http://127.0.0.1:3000/api/user/testookie的跨域问题</a></p><p>Cookie 是不能跨域使用的，所以在前后端分离开发的时候, 我们当前的代码就会出现问题</p><p>例如:</p><p>前端地址: <a href="http://192.168.0.107:3001/login.html" target="_blank" rel="noreferrer">http://192.168.0.107:3001/login.html</a></p><p>后端地址: <a href="http://127.0.0.1:3000/api/user/test" target="_blank" rel="noreferrer">http://127.0.0.1:3000/api/user/test</a></p><h3 id="正向代理和反向代理" tabindex="-1">正向代理和反向代理 <a class="header-anchor" href="#正向代理和反向代理" aria-label="Permalink to &quot;正向代理和反向代理&quot;">​</a></h3><h4 id="正向代理" tabindex="-1">正向代理 <a class="header-anchor" href="#正向代理" aria-label="Permalink to &quot;正向代理&quot;">​</a></h4><p>顺着请求的方向进行的代理, 我们称之为正向代理</p><p>例如: 访问谷歌</p><p>我是一个用户，我访问不了谷歌，但是我可以访问一台海外的服务器，这台海外服务器又可以访问谷歌</p><p>那么&#39;我&#39;就可以先访问&#39;海外的服务器&#39;, 再通过&#39;海外的服务器&#39;访问谷歌，这就是正向代理</p><h5 id="正向代理特点" tabindex="-1">正向代理特点 <a class="header-anchor" href="#正向代理特点" aria-label="Permalink to &quot;正向代理特点&quot;">​</a></h5><ul><li>在正向代理中，代理服务器是为用户服务的,</li></ul><p>(对于谷歌来说，它并不知道真正访问自己的是谁，只知道有一台服务器访问了自己)</p><h5 id="正向代理的用途" tabindex="-1">正向代理的用途 <a class="header-anchor" href="#正向代理的用途" aria-label="Permalink to &quot;正向代理的用途&quot;">​</a></h5><ul><li><p>访问原来无法访问的资源，如 google</p></li><li><p>对客户端访问授权，上网进行认证</p></li><li><p>... ...</p></li></ul><h4 id="反向代理" tabindex="-1">反向代理 <a class="header-anchor" href="#反向代理" aria-label="Permalink to &quot;反向代理&quot;">​</a></h4><p>反向代理和正向代理正好相反，反向代理服务器是为&#39;服务器&#39;服务的</p><p>(对于用户来说，它并不知道自己真正访问的是谁,，只知道自己访问了一台服务器)</p><h5 id="反向代理的用途" tabindex="-1">反向代理的用途 <a class="header-anchor" href="#反向代理的用途" aria-label="Permalink to &quot;反向代理的用途&quot;">​</a></h5><ul><li><p>负载均衡，通过反向代理服务器来优化网站的负载</p></li><li><p>前后端分离, 统一请求地址</p></li></ul><h3 id="_3-如何解决前后端分离-cookie-的跨域问题" tabindex="-1">3.如何解决前后端分离 Cookie 的跨域问题? <a class="header-anchor" href="#_3-如何解决前后端分离-cookie-的跨域问题" aria-label="Permalink to &quot;3.如何解决前后端分离 Cookie 的跨域问题?&quot;">​</a></h3><h4 id="本地-web-服务器搭建" tabindex="-1">本地 web 服务器搭建 <a class="header-anchor" href="#本地-web-服务器搭建" aria-label="Permalink to &quot;本地 web 服务器搭建&quot;">​</a></h4><p>http-server 本地服务器库，npm 文档：<a href="https://www.npmjs.com/package/http-server" target="_blank" rel="noreferrer">http-server - npm (npmjs.com)</a></p><p>1.全局安装 http-server 库：</p><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki one-dark-pro vp-code" tabindex="0"><code><span class="line"><span style="color:#61AFEF;">npm</span><span style="color:#98C379;"> install</span><span style="color:#D19A66;"> --global</span><span style="color:#98C379;"> http-server</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>2.在静态文件目录下打开终端，输入运行命令：<code>http-server -p 端口</code></p><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki one-dark-pro vp-code" tabindex="0"><code><span class="line"><span style="color:#61AFEF;">http-server</span><span style="color:#D19A66;"> -p</span><span style="color:#D19A66;"> 3001</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>3.浏览器就可以访问静态文件了</p><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki one-dark-pro vp-code" tabindex="0"><code><span class="line"><span style="color:#61AFEF;">localhost:3001</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>4.局域网其他机器访问</p><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki one-dark-pro vp-code" tabindex="0"><code><span class="line"><span style="color:#61AFEF;">服务器机器的ip地址:端口</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h4 id="通过-nginx-反向代理配置解决跨域问题" tabindex="-1">通过 Nginx 反向代理配置解决跨域问题 <a class="header-anchor" href="#通过-nginx-反向代理配置解决跨域问题" aria-label="Permalink to &quot;通过 Nginx 反向代理配置解决跨域问题&quot;">​</a></h4><p>nginx 具体配置文档：<a href="http://nginx.org/en/docs/" target="_blank" rel="noreferrer">nginx 文档</a></p><p>1.Nginx 下载：<a href="http://nginx.org/en/download.html" target="_blank" rel="noreferrer">nginx: download</a></p><p>2.下载后解压配置</p><ol><li><p>找到解压后的文件夹的目录：nginx/conf</p></li><li><p>编辑 nginx.conf 文件</p><ol><li><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki one-dark-pro vp-code" tabindex="0"><code><span class="line"><span style="color:#7F848E;font-style:italic;"># 服务器CPU核数</span></span>
<span class="line"><span style="color:#61AFEF;">worker_processes</span><span style="color:#D19A66;"> 4</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"># 在server里面添加以下</span></span>
<span class="line"></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"># 前端客户端请求根路径代理的地址</span></span>
<span class="line"><span style="color:#61AFEF;">location</span><span style="color:#98C379;"> /</span><span style="color:#98C379;"> {</span></span>
<span class="line"><span style="color:#61AFEF;">    proxy_pass</span><span style="color:#98C379;"> http://服务器ip:端口</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#ABB2BF;">}</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"># 后端服务端请求/api代理的地址</span></span>
<span class="line"><span style="color:#61AFEF;">location</span><span style="color:#98C379;"> /api</span><span style="color:#98C379;"> {</span></span>
<span class="line"><span style="color:#61AFEF;">    proxy_pass</span><span style="color:#98C379;"> http://127.0.0.1:3000</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#61AFEF;">    proxy_set_header</span><span style="color:#98C379;"> Host</span><span style="color:#E06C75;"> $host</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#ABB2BF;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div></li></ol></li></ol><h4 id="nginx-配置文件-nginx-conf-配置详解" tabindex="-1">Nginx 配置文件 nginx.conf 配置详解 <a class="header-anchor" href="#nginx-配置文件-nginx-conf-配置详解" aria-label="Permalink to &quot;Nginx 配置文件 nginx.conf 配置详解&quot;">​</a></h4><div class="language-json line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki one-dark-pro vp-code" tabindex="0"><code><span class="line"><span style="color:#ABB2BF;">#Nginx用户及组：用户 组。window下不指定</span></span>
<span class="line"><span style="color:#ABB2BF;">#user  nobody;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#ABB2BF;">#工作进程：数目。根据硬件调整，通常等于CPU数量或者</span><span style="color:#D19A66;">2</span><span style="color:#ABB2BF;">倍于CPU。</span></span>
<span class="line"><span style="color:#ABB2BF;">worker_processes  </span><span style="color:#D19A66;">1</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#ABB2BF;">#错误日志：存放路径。</span></span>
<span class="line"><span style="color:#ABB2BF;">#error_log  logs/error.log;</span></span>
<span class="line"><span style="color:#ABB2BF;">#error_log  logs/error.log  notice;</span></span>
<span class="line"><span style="color:#ABB2BF;">#error_log  logs/error.log  info;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#ABB2BF;">#pid(进程标识符)：存放路径</span></span>
<span class="line"><span style="color:#ABB2BF;">pid       /usr/local/nginx/logs/nginx.pid;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#ABB2BF;">#一个进程能打开的文件描述符最大值，理论上该值因该是最多能打开的文件数除以进程数。</span></span>
<span class="line"><span style="color:#ABB2BF;">#但是由于nginx负载并不是完全均衡的，所以这个值最好等于最多能打开的文件数。</span></span>
<span class="line"><span style="color:#ABB2BF;">#LINUX系统可以执行 sysctl -a | grep fs.file 可以看到linux文件描述符。</span></span>
<span class="line"><span style="color:#ABB2BF;">worker_rlimit_nofile </span><span style="color:#D19A66;">65535</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#ABB2BF;">events {</span></span>
<span class="line"><span style="color:#FFFFFF;">    #使用epoll的I/O</span><span style="color:#FFFFFF;"> 模型。linux建议epoll，FreeBSD建议采用kqueue，window下不指定。</span></span>
<span class="line"><span style="color:#FFFFFF;">    use</span><span style="color:#FFFFFF;"> epoll;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFFFFF;">    #单个进程最大连接数（最大连接数=连接数*进程数）</span></span>
<span class="line"><span style="color:#FFFFFF;">    worker_connections</span><span style="color:#FFFFFF;">  1024;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFFFFF;">    #客户端请求头部的缓冲区大小。这个可以根据你的系统分页大小来设置，</span></span>
<span class="line"><span style="color:#FFFFFF;">    #一般一个请求头的大小不会超过1k，不过由于一般系统分页都要大于1k，所以这里设置为分页大小。</span></span>
<span class="line"><span style="color:#FFFFFF;">    #client_header_buffer_size</span><span style="color:#FFFFFF;"> 4k;</span></span>
<span class="line"><span style="color:#ABB2BF;">}</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#ABB2BF;">http {</span></span>
<span class="line"><span style="color:#FFFFFF;">    #设定mime类型,类型由mime.type文件定义</span></span>
<span class="line"><span style="color:#FFFFFF;">    include</span><span style="color:#FFFFFF;">       mime.types;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFFFFF;">    default_type</span><span style="color:#FFFFFF;">  application/octet-stream;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFFFFF;">    #日志格式设置</span></span>
<span class="line"><span style="color:#FFFFFF;">    #log_format</span><span style="color:#FFFFFF;">  main</span><span style="color:#FFFFFF;">  &#39;$remote_addr</span><span style="color:#FFFFFF;"> -</span><span style="color:#FFFFFF;"> $remote_user</span><span style="color:#FFFFFF;"> [$time_local]</span><span style="color:#E06C75;"> &quot;$request&quot;</span><span style="color:#FFFFFF;"> &#39;</span></span>
<span class="line"><span style="color:#FFFFFF;">    #</span><span style="color:#FFFFFF;">                  &#39;$status</span><span style="color:#FFFFFF;"> $body_bytes_sent</span><span style="color:#E06C75;"> &quot;$http_referer&quot;</span><span style="color:#FFFFFF;"> &#39;</span></span>
<span class="line"><span style="color:#FFFFFF;">    #</span><span style="color:#FFFFFF;">                  &#39;</span><span style="color:#E06C75;">&quot;$http_user_agent&quot;</span><span style="color:#E06C75;"> &quot;$http_x_forwarded_for&quot;</span><span style="color:#FFFFFF;">&#39;;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#FFFFFF;">    #用了log_format指令设置了日志格式之后，需要用access_log指令指定日志文件的存放路径</span></span>
<span class="line"><span style="color:#FFFFFF;">    #记录了哪些用户，哪些页面以及用户浏览器、ip和其他的访问信息</span></span>
<span class="line"><span style="color:#FFFFFF;">    #access_log</span><span style="color:#FFFFFF;">  logs/host.access.log</span><span style="color:#FFFFFF;">  main;</span></span>
<span class="line"><span style="color:#FFFFFF;">    #access_log</span><span style="color:#FFFFFF;">  logs/host.access.404.log</span><span style="color:#FFFFFF;">  log404;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFFFFF;">    #服务器名字的hash表大小</span></span>
<span class="line"><span style="color:#FFFFFF;">    server_names_hash_bucket_size</span><span style="color:#FFFFFF;"> 128;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFFFFF;">    #客户端请求头缓冲大小。</span></span>
<span class="line"><span style="color:#FFFFFF;">    #nginx默认会用client_header_buffer_size这个buffer来读取header值，</span></span>
<span class="line"><span style="color:#FFFFFF;">    #如果header过大，它会使用large_client_header_buffers来读取。</span></span>
<span class="line"><span style="color:#FFFFFF;">    #如果设置过小HTTP头/Cookie过大</span><span style="color:#FFFFFF;"> 会报400</span><span style="color:#FFFFFF;"> 错误</span><span style="color:#FFFFFF;"> nginx</span><span style="color:#FFFFFF;"> 400</span><span style="color:#FFFFFF;"> bad</span><span style="color:#FFFFFF;"> request</span></span>
<span class="line"><span style="color:#FFFFFF;">    #如果超过buffer，就会报HTTP</span><span style="color:#FFFFFF;"> 414错误(URI</span><span style="color:#FFFFFF;"> Too</span><span style="color:#FFFFFF;"> Long)</span></span>
<span class="line"><span style="color:#FFFFFF;">    #nginx接受最长的HTTP头部大小必须比其中一个buffer大</span></span>
<span class="line"><span style="color:#FFFFFF;">    #否则就会报400的HTTP错误(Bad</span><span style="color:#FFFFFF;"> Request)</span></span>
<span class="line"><span style="color:#FFFFFF;">    #client_header_buffer_size</span><span style="color:#FFFFFF;"> 32k;</span></span>
<span class="line"><span style="color:#FFFFFF;">    #large_client_header_buffers</span><span style="color:#FFFFFF;"> 4</span><span style="color:#FFFFFF;"> 32k;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#FFFFFF;">    #隐藏ngnix版本号</span></span>
<span class="line"><span style="color:#FFFFFF;">    #server_tokens</span><span style="color:#FFFFFF;"> off;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFFFFF;">    #忽略不合法的请求头</span></span>
<span class="line"><span style="color:#FFFFFF;">    #ignore_invalid_headers</span><span style="color:#FFFFFF;">   on;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFFFFF;">    #让</span><span style="color:#FFFFFF;"> nginx</span><span style="color:#FFFFFF;"> 在处理自己内部重定向时不默认使用</span><span style="color:#FFFFFF;">  server_name设置中的第一个域名</span></span>
<span class="line"><span style="color:#FFFFFF;">    #server_name_in_redirect</span><span style="color:#FFFFFF;"> off;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#FFFFFF;">    #客户端请求体的大小</span></span>
<span class="line"><span style="color:#FFFFFF;">    #client_body_buffer_size</span><span style="color:#FFFFFF;">    8m;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#FFFFFF;">    #开启文件传输，一般应用都应设置为on；若是有下载的应用，则可以设置成off来平衡网络I/O和磁盘的I/O来降低系统负载</span></span>
<span class="line"><span style="color:#FFFFFF;">    sendfile</span><span style="color:#FFFFFF;">        on;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#FFFFFF;">    #告诉nginx在一个数据包里发送所有头文件，而不一个接一个的发送。</span></span>
<span class="line"><span style="color:#FFFFFF;">    #tcp_nopush</span><span style="color:#FFFFFF;">     on;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFFFFF;">    #tcp_nodelay</span><span style="color:#FFFFFF;"> off</span><span style="color:#FFFFFF;"> 会增加通信的延时，但是会提高带宽利用率。在高延时、数据量大的通信场景中应该会有不错的效果</span></span>
<span class="line"><span style="color:#FFFFFF;">    #tcp_nodelay</span><span style="color:#FFFFFF;"> on，会增加小包的数量，但是可以提高响应速度。在及时性高的通信场景中应该会有不错的效果</span></span>
<span class="line"><span style="color:#FFFFFF;">    tcp_nodelay</span><span style="color:#FFFFFF;"> on;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#FFFFFF;">    #长连接超时时间，单位是秒</span></span>
<span class="line"><span style="color:#FFFFFF;">    keepalive_timeout</span><span style="color:#FFFFFF;">  65;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFFFFF;">    #gzip模块设置，使用</span><span style="color:#FFFFFF;"> gzip</span><span style="color:#FFFFFF;"> 压缩可以降低网站带宽消耗，同时提升访问速度。</span></span>
<span class="line"><span style="color:#FFFFFF;">    #gzip</span><span style="color:#FFFFFF;">  on;</span><span style="color:#FFFFFF;">                     #开启gzip</span></span>
<span class="line"><span style="color:#FFFFFF;">    #gzip_min_length</span><span style="color:#FFFFFF;">  1k;</span><span style="color:#FFFFFF;">          #最小压缩大小</span></span>
<span class="line"><span style="color:#FFFFFF;">    #gzip_buffers</span><span style="color:#FFFFFF;">     4</span><span style="color:#FFFFFF;"> 16k;</span><span style="color:#FFFFFF;">       #压缩缓冲区</span></span>
<span class="line"><span style="color:#FFFFFF;">    #gzip_http_version</span><span style="color:#FFFFFF;"> 1.0;</span><span style="color:#FFFFFF;">        #压缩版本</span></span>
<span class="line"><span style="color:#FFFFFF;">    #gzip_comp_level</span><span style="color:#FFFFFF;"> 2;</span><span style="color:#FFFFFF;">            #压缩等级</span></span>
<span class="line"><span style="color:#FFFFFF;">    #gzip_types</span><span style="color:#FFFFFF;">   text/plain</span><span style="color:#FFFFFF;"> text/css</span><span style="color:#FFFFFF;"> text/xml</span><span style="color:#FFFFFF;"> text/javascript</span><span style="color:#FFFFFF;"> application/json</span><span style="color:#FFFFFF;"> application/x-javascript</span><span style="color:#FFFFFF;"> application/xml</span><span style="color:#FFFFFF;"> application/xml+rss;#压缩类型</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#FFFFFF;">    #负载均衡</span></span>
<span class="line"><span style="color:#FFFFFF;">    #max_fails为允许请求失败的次数，默认为1</span></span>
<span class="line"><span style="color:#FFFFFF;">    #weight为轮询权重，根据不同的权重分配可以用来平衡服务器的访问率。</span></span>
<span class="line"><span style="color:#FFFFFF;">    #</span><span style="color:#FFFFFF;"> upstream</span><span style="color:#FFFFFF;"> myServer{</span></span>
<span class="line"><span style="color:#FFFFFF;">    #</span><span style="color:#FFFFFF;">   server</span><span style="color:#FFFFFF;">  192.168.247.129</span><span style="color:#ABB2BF;">:</span><span style="color:#D19A66;">8080</span><span style="color:#FFFFFF;"> max_fails=</span><span style="color:#D19A66;">3</span><span style="color:#FFFFFF;"> weight=</span><span style="color:#D19A66;">2</span><span style="color:#FFFFFF;">;</span></span>
<span class="line"><span style="color:#FFFFFF;">    #</span><span style="color:#FFFFFF;">   server</span><span style="color:#D19A66;">  192.168</span><span style="color:#FFFFFF;">.</span><span style="color:#D19A66;">247.129</span><span style="color:#FFFFFF;">:</span><span style="color:#D19A66;">8081</span><span style="color:#FFFFFF;"> max_fails=</span><span style="color:#D19A66;">3</span><span style="color:#FFFFFF;"> weight=</span><span style="color:#D19A66;">4</span><span style="color:#FFFFFF;">;</span></span>
<span class="line"><span style="color:#FFFFFF;">    #</span><span style="color:#ABB2BF;"> }</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#ABB2BF;">    #server {</span></span>
<span class="line"><span style="color:#FFFFFF;">    #</span><span style="color:#FFFFFF;">    listen</span><span style="color:#FFFFFF;">       80;</span></span>
<span class="line"><span style="color:#FFFFFF;">    #</span></span>
<span class="line"><span style="color:#FFFFFF;">    #</span><span style="color:#FFFFFF;">    #IP/域名可以有多个，用空格隔开</span></span>
<span class="line"><span style="color:#FFFFFF;">    #</span><span style="color:#FFFFFF;">    server_name</span><span style="color:#FFFFFF;">  192.168.247.129;</span></span>
<span class="line"><span style="color:#FFFFFF;">    #</span><span style="color:#FFFFFF;">    #server_name</span><span style="color:#FFFFFF;">  www.test.com;</span></span>
<span class="line"><span style="color:#FFFFFF;">    #</span></span>
<span class="line"><span style="color:#FFFFFF;">    #</span><span style="color:#FFFFFF;">    #charset</span><span style="color:#FFFFFF;"> koi8-r;</span></span>
<span class="line"><span style="color:#FFFFFF;">    #</span></span>
<span class="line"><span style="color:#FFFFFF;">    #</span><span style="color:#FFFFFF;">    #access_log</span><span style="color:#FFFFFF;">  logs/host.access.log</span><span style="color:#FFFFFF;">  main;</span></span>
<span class="line"><span style="color:#FFFFFF;">    #</span></span>
<span class="line"><span style="color:#FFFFFF;">    #</span><span style="color:#FFFFFF;">   #反向代理配置，</span></span>
<span class="line"><span style="color:#FFFFFF;">    #</span><span style="color:#FFFFFF;">   #将所有请求为www.test.com的请求全部转发到upstream中定义的目标服务器中。</span></span>
<span class="line"><span style="color:#FFFFFF;">    #</span><span style="color:#FFFFFF;">   location</span><span style="color:#FFFFFF;"> /</span><span style="color:#FFFFFF;"> {</span></span>
<span class="line"><span style="color:#FFFFFF;">    #</span></span>
<span class="line"><span style="color:#FFFFFF;">    #</span><span style="color:#FFFFFF;">       #此处配置的域名必须与upstream的域名一致，才能转发。</span></span>
<span class="line"><span style="color:#FFFFFF;">    #</span><span style="color:#FFFFFF;">       proxy_pass</span><span style="color:#FFFFFF;"> http</span><span style="color:#ABB2BF;">:</span><span style="color:#7F848E;font-style:italic;">//myServer;</span></span>
<span class="line"><span style="color:#FFFFFF;">    #</span><span style="color:#FFFFFF;">       #proxy_pass</span><span style="color:#FFFFFF;"> http:</span><span style="color:#7F848E;font-style:italic;">//192.168.247.129:8080;</span></span>
<span class="line"><span style="color:#FFFFFF;">    #</span></span>
<span class="line"><span style="color:#FFFFFF;">    #</span><span style="color:#FFFFFF;">       proxy_connect_timeout</span><span style="color:#D19A66;"> 20</span><span style="color:#FFFFFF;">;</span><span style="color:#FFFFFF;">          #nginx跟后端服务器连接超时时间(代理连接超时)</span></span>
<span class="line"><span style="color:#FFFFFF;">    #</span></span>
<span class="line"><span style="color:#FFFFFF;">    #</span><span style="color:#FFFFFF;">       #client_max_body_size</span><span style="color:#D19A66;">       10</span><span style="color:#FFFFFF;">m;</span><span style="color:#FFFFFF;">   #允许客户端请求的最大单文件字节数</span></span>
<span class="line"><span style="color:#FFFFFF;">    #</span><span style="color:#FFFFFF;">       #client_body_buffer_size</span><span style="color:#D19A66;">    128</span><span style="color:#FFFFFF;">k;</span><span style="color:#FFFFFF;">  #缓冲区代理缓冲用户端请求的最大字节数</span></span>
<span class="line"><span style="color:#FFFFFF;">    #</span><span style="color:#FFFFFF;">       #proxy_send_timeout</span><span style="color:#D19A66;">         300</span><span style="color:#FFFFFF;">;</span><span style="color:#FFFFFF;">   #后端服务器数据回传时间(代理发送超时)</span></span>
<span class="line"><span style="color:#FFFFFF;">    #</span><span style="color:#FFFFFF;">       #proxy_read_timeout</span><span style="color:#D19A66;">         300</span><span style="color:#FFFFFF;">;</span><span style="color:#FFFFFF;">   #连接成功后，后端服务器响应时间(代理接收超时)</span></span>
<span class="line"><span style="color:#FFFFFF;">    #</span><span style="color:#FFFFFF;">       #proxy_buffer_size</span><span style="color:#D19A66;">          4</span><span style="color:#FFFFFF;">k;</span><span style="color:#FFFFFF;">    #设置代理服务器（nginx）保存用户头信息的缓冲区大小</span></span>
<span class="line"><span style="color:#FFFFFF;">    #</span><span style="color:#FFFFFF;">       #proxy_buffers</span><span style="color:#D19A66;">              4</span><span style="color:#D19A66;"> 32</span><span style="color:#FFFFFF;">k;</span><span style="color:#FFFFFF;"> #proxy_buffers缓冲区，网页平均在</span><span style="color:#D19A66;">32</span><span style="color:#FFFFFF;">k以下的话，这样设置</span></span>
<span class="line"><span style="color:#FFFFFF;">    #</span><span style="color:#FFFFFF;">       #proxy_busy_buffers_size</span><span style="color:#D19A66;">    64</span><span style="color:#FFFFFF;">k;</span><span style="color:#FFFFFF;">   #高负荷下缓冲大小（proxy_buffers*</span><span style="color:#D19A66;">2</span><span style="color:#FFFFFF;">）</span></span>
<span class="line"><span style="color:#FFFFFF;">    #</span><span style="color:#FFFFFF;">       #proxy_temp_file_write_size</span><span style="color:#D19A66;"> 64</span><span style="color:#FFFFFF;">k;</span><span style="color:#FFFFFF;">   #设定缓存文件夹大小，大于这个值，将从upstream服务器传</span></span>
<span class="line"><span style="color:#FFFFFF;">    #</span></span>
<span class="line"><span style="color:#FFFFFF;">    #</span><span style="color:#FFFFFF;">       root</span><span style="color:#FFFFFF;">   html;</span><span style="color:#FFFFFF;"> #文件根目录</span></span>
<span class="line"><span style="color:#FFFFFF;">    #</span></span>
<span class="line"><span style="color:#FFFFFF;">    #</span><span style="color:#FFFFFF;">       #定义首页索引文件的名称</span></span>
<span class="line"><span style="color:#FFFFFF;">    #</span><span style="color:#FFFFFF;">       index</span><span style="color:#FFFFFF;">  index.html</span><span style="color:#FFFFFF;"> index.htm;</span></span>
<span class="line"><span style="color:#FFFFFF;">    #</span><span style="color:#FFFFFF;">       #</span><span style="color:#FFFFFF;"> 重定向</span></span>
<span class="line"><span style="color:#FFFFFF;">    #</span><span style="color:#FFFFFF;">       rewrite</span><span style="color:#FFFFFF;"> ^/(.*)$</span><span style="color:#FFFFFF;"> https:</span><span style="color:#7F848E;font-style:italic;">//localhost/ redirect;</span></span>
<span class="line"><span style="color:#FFFFFF;">    #</span><span style="color:#ABB2BF;">    }</span></span>
<span class="line"><span style="color:#ABB2BF;">    #</span></span>
<span class="line"><span style="color:#ABB2BF;">    #   #动静分离 静态资源走linux 动态资源走tomcat</span></span>
<span class="line"><span style="color:#ABB2BF;">    #   # 注意 /source/image/下面寻找资源</span></span>
<span class="line"><span style="color:#ABB2BF;">    #   location /image/ {</span></span>
<span class="line"><span style="color:#FFFFFF;">    #</span><span style="color:#FFFFFF;">       root</span><span style="color:#FFFFFF;"> /source/;</span></span>
<span class="line"><span style="color:#FFFFFF;">    #</span><span style="color:#FFFFFF;">       autoindex</span><span style="color:#FFFFFF;"> on;</span></span>
<span class="line"><span style="color:#FFFFFF;">    #</span><span style="color:#ABB2BF;">   }</span></span>
<span class="line"><span style="color:#ABB2BF;">    #</span></span>
<span class="line"><span style="color:#ABB2BF;">    #</span></span>
<span class="line"><span style="color:#ABB2BF;">    #    # 出现</span><span style="color:#D19A66;">50</span><span style="color:#ABB2BF;">x错误时，使用/</span><span style="color:#D19A66;">50</span><span style="color:#ABB2BF;">x.html页返回给客户端</span></span>
<span class="line"><span style="color:#ABB2BF;">    #    error_page   </span><span style="color:#D19A66;">500</span><span style="color:#D19A66;"> 502</span><span style="color:#D19A66;"> 503</span><span style="color:#D19A66;"> 504</span><span style="color:#ABB2BF;">  /</span><span style="color:#D19A66;">50</span><span style="color:#ABB2BF;">x.html;</span></span>
<span class="line"><span style="color:#ABB2BF;">    #    location = /</span><span style="color:#D19A66;">50</span><span style="color:#ABB2BF;">x.html {</span></span>
<span class="line"><span style="color:#FFFFFF;">    #</span><span style="color:#FFFFFF;">        root</span><span style="color:#FFFFFF;">   html;</span></span>
<span class="line"><span style="color:#FFFFFF;">    #</span><span style="color:#ABB2BF;">    }</span></span>
<span class="line"><span style="color:#ABB2BF;">    #}</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#ABB2BF;">    #下面是配置生产环境中既支持HTTP又支持HTTPS,保证用户在浏览器中输入HTTP也能正常访问</span></span>
<span class="line"></span>
<span class="line"><span style="color:#ABB2BF;">    # SSL证书 配置</span></span>
<span class="line"><span style="color:#ABB2BF;">    ssl_certificate         cert/yphtoy.com.pem;   #加密证书路径</span></span>
<span class="line"><span style="color:#ABB2BF;">    ssl_certificate_key    cert/yphtoy.com.key;       #加密私钥路径</span></span>
<span class="line"><span style="color:#ABB2BF;">    ssl_protocols        TLSv</span><span style="color:#D19A66;">1</span><span style="color:#ABB2BF;"> TLSv</span><span style="color:#D19A66;">1.1</span><span style="color:#ABB2BF;"> TLSv</span><span style="color:#D19A66;">1.2</span><span style="color:#ABB2BF;">;     #加密协议</span></span>
<span class="line"><span style="color:#ABB2BF;">    ssl_session_cache    shared:SSL:</span><span style="color:#D19A66;">1</span><span style="color:#ABB2BF;">m;             #加密访问缓存设置,可以大大提高访问速度</span></span>
<span class="line"><span style="color:#ABB2BF;">    ssl_session_timeout    </span><span style="color:#D19A66;">10</span><span style="color:#ABB2BF;">m;                       #加密访问缓存过期时间</span></span>
<span class="line"><span style="color:#ABB2BF;">    ssl_ciphers        HIGH:!aNULL:!MD</span><span style="color:#D19A66;">5</span><span style="color:#ABB2BF;">;              #加密算法</span></span>
<span class="line"><span style="color:#ABB2BF;">    ssl_prefer_server_ciphers on;                   #是否由服务器决定采用哪种加密算法</span></span>
<span class="line"></span>
<span class="line"><span style="color:#ABB2BF;">    # 负载均衡</span></span>
<span class="line"><span style="color:#ABB2BF;">    upstream api_upstream</span></span>
<span class="line"><span style="color:#ABB2BF;">    {</span></span>
<span class="line"><span style="color:#FFFFFF;">        server</span><span style="color:#FFFFFF;"> 127.0.0.1</span><span style="color:#ABB2BF;">:</span><span style="color:#D19A66;">8080</span><span style="color:#FFFFFF;"> max_fails=</span><span style="color:#D19A66;">3</span><span style="color:#FFFFFF;"> weight=</span><span style="color:#D19A66;">1</span><span style="color:#FFFFFF;">;</span></span>
<span class="line"><span style="color:#FFFFFF;">        server</span><span style="color:#D19A66;"> 127.0</span><span style="color:#FFFFFF;">.</span><span style="color:#D19A66;">0.1</span><span style="color:#FFFFFF;">:</span><span style="color:#D19A66;">8081</span><span style="color:#FFFFFF;"> max_fails=</span><span style="color:#D19A66;">3</span><span style="color:#FFFFFF;"> weight=</span><span style="color:#D19A66;">1</span><span style="color:#FFFFFF;">;</span></span>
<span class="line"><span style="color:#ABB2BF;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#ABB2BF;">    #api 接口(兼容HTTP)</span></span>
<span class="line"><span style="color:#ABB2BF;">    server{</span></span>
<span class="line"><span style="color:#FFFFFF;">        listen</span><span style="color:#FFFFFF;"> 80;</span></span>
<span class="line"><span style="color:#FFFFFF;">        server_name</span><span style="color:#FFFFFF;"> api.test.com;</span></span>
<span class="line"><span style="color:#FFFFFF;">        #</span><span style="color:#FFFFFF;"> 301重定向跳转到HTTPS接口</span></span>
<span class="line"><span style="color:#FFFFFF;">        return</span><span style="color:#FFFFFF;"> 301</span><span style="color:#FFFFFF;"> https</span><span style="color:#ABB2BF;">:</span><span style="color:#7F848E;font-style:italic;">//$server_name$request_uri;</span></span>
<span class="line"><span style="color:#FFFFFF;">        error_page</span><span style="color:#D19A66;">   500</span><span style="color:#D19A66;"> 502</span><span style="color:#D19A66;"> 503</span><span style="color:#D19A66;"> 504</span><span style="color:#FFFFFF;">  /</span><span style="color:#D19A66;">50</span><span style="color:#FFFFFF;">x.html;</span></span>
<span class="line"><span style="color:#FFFFFF;">        location</span><span style="color:#FFFFFF;"> =</span><span style="color:#FFFFFF;"> /</span><span style="color:#D19A66;">50</span><span style="color:#FFFFFF;">x.html</span><span style="color:#ABB2BF;"> {</span></span>
<span class="line"><span style="color:#FFFFFF;">            root</span><span style="color:#FFFFFF;">   html;</span></span>
<span class="line"><span style="color:#ABB2BF;">        }</span></span>
<span class="line"><span style="color:#ABB2BF;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#ABB2BF;">    #api 接口(兼容HTTPS)</span></span>
<span class="line"><span style="color:#ABB2BF;">    server{</span></span>
<span class="line"><span style="color:#FFFFFF;">        listen</span><span style="color:#FFFFFF;"> 443</span><span style="color:#FFFFFF;"> ssl;</span></span>
<span class="line"><span style="color:#FFFFFF;">        server_name</span><span style="color:#FFFFFF;"> api.test.com;</span></span>
<span class="line"><span style="color:#FFFFFF;">        location</span><span style="color:#FFFFFF;"> /</span><span style="color:#FFFFFF;"> {</span></span>
<span class="line"><span style="color:#FFFFFF;">           root</span><span style="color:#FFFFFF;"> html;</span></span>
<span class="line"><span style="color:#FFFFFF;">           index</span><span style="color:#FFFFFF;">  index.html</span><span style="color:#FFFFFF;"> index.htm;</span></span>
<span class="line"><span style="color:#FFFFFF;">           proxy_pass</span><span style="color:#FFFFFF;"> http</span><span style="color:#ABB2BF;">:</span><span style="color:#7F848E;font-style:italic;">//api_upstream;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFFFFF;">           #语法：</span><span style="color:#FFFFFF;"> proxy_cookie_path</span><span style="color:#FFFFFF;"> oldpath</span><span style="color:#FFFFFF;"> replacepath;</span></span>
<span class="line"><span style="color:#FFFFFF;">           #oldpath就是你要替换的路径</span><span style="color:#FFFFFF;"> replacepath</span><span style="color:#FFFFFF;"> 就是要替换的值</span></span>
<span class="line"><span style="color:#FFFFFF;">           #作用：同一个web服务器下面多个应用之间能获取到cookie</span></span>
<span class="line"><span style="color:#FFFFFF;">           proxy_cookie_path</span><span style="color:#FFFFFF;"> /api/</span><span style="color:#FFFFFF;"> /;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFFFFF;">           #服务端接收的请求头Cooke值不变</span></span>
<span class="line"><span style="color:#FFFFFF;">           proxy_set_header</span><span style="color:#FFFFFF;"> Cookie</span><span style="color:#FFFFFF;"> $http_cookie;</span></span>
<span class="line"><span style="color:#ABB2BF;">        }</span></span>
<span class="line"><span style="color:#ABB2BF;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#ABB2BF;">    #管理后台端(兼容HTTP)</span></span>
<span class="line"><span style="color:#ABB2BF;">    server{</span></span>
<span class="line"><span style="color:#FFFFFF;">        listen</span><span style="color:#FFFFFF;"> 80;</span></span>
<span class="line"><span style="color:#FFFFFF;">        server_name</span><span style="color:#FFFFFF;"> manage.test.com;</span></span>
<span class="line"><span style="color:#FFFFFF;">        #</span><span style="color:#FFFFFF;"> 301重定向跳转到HTTPS接口</span></span>
<span class="line"><span style="color:#FFFFFF;">        return</span><span style="color:#FFFFFF;"> 301</span><span style="color:#FFFFFF;"> https</span><span style="color:#ABB2BF;">:</span><span style="color:#7F848E;font-style:italic;">//$server_name/$request_uri;</span></span>
<span class="line"><span style="color:#FFFFFF;">        error_page</span><span style="color:#D19A66;"> 500</span><span style="color:#D19A66;"> 502</span><span style="color:#D19A66;"> 503</span><span style="color:#D19A66;"> 504</span><span style="color:#FFFFFF;"> /</span><span style="color:#D19A66;">50</span><span style="color:#FFFFFF;">x.html;</span></span>
<span class="line"><span style="color:#FFFFFF;">        location</span><span style="color:#FFFFFF;"> =</span><span style="color:#FFFFFF;"> /</span><span style="color:#D19A66;">50</span><span style="color:#FFFFFF;">x.html</span><span style="color:#ABB2BF;">{</span></span>
<span class="line"><span style="color:#FFFFFF;">             root</span><span style="color:#FFFFFF;"> html;</span></span>
<span class="line"><span style="color:#ABB2BF;">        }</span></span>
<span class="line"><span style="color:#ABB2BF;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#ABB2BF;">    #管理后台端(兼容HTTPS)</span></span>
<span class="line"><span style="color:#ABB2BF;">    server{</span></span>
<span class="line"><span style="color:#FFFFFF;">        listen</span><span style="color:#FFFFFF;"> 443</span><span style="color:#FFFFFF;"> ssl;</span></span>
<span class="line"><span style="color:#FFFFFF;">        server_name</span><span style="color:#FFFFFF;"> manage.test.com;</span></span>
<span class="line"><span style="color:#FFFFFF;">        location</span><span style="color:#FFFFFF;"> /</span><span style="color:#FFFFFF;"> {</span></span>
<span class="line"><span style="color:#FFFFFF;">            root</span><span style="color:#FFFFFF;"> /home/test/web/dist</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFFFFF;">            index</span><span style="color:#FFFFFF;"> /index.html;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#FFFFFF;">            #语法：try_files</span><span style="color:#FFFFFF;"> 【$uri】</span><span style="color:#FFFFFF;"> 【</span><span style="color:#FFFFFF;"> $uri/】</span><span style="color:#FFFFFF;"> 【参数】</span></span>
<span class="line"><span style="color:#FFFFFF;">            #当用户请求https</span><span style="color:#ABB2BF;">:</span><span style="color:#7F848E;font-style:italic;">//manage.test.com/login时，</span></span>
<span class="line"><span style="color:#FFFFFF;">            #一.如果配置了上面的默认index</span><span style="color:#ABB2BF;">,</span><span style="color:#FFFFFF;">会依次请求</span></span>
<span class="line"><span style="color:#FFFFFF;">            #1./home/test/web/dist/login</span><span style="color:#FFFFFF;">       查找有没有login这个文件，没有的话</span></span>
<span class="line"><span style="color:#FFFFFF;">            #2./home/test/web/dist/index.html</span><span style="color:#FFFFFF;">  有就直接返回</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFFFFF;">            #二.如果没有配置了上面的默认index或者配置了没有找到对应的资源,会依次请求</span></span>
<span class="line"><span style="color:#FFFFFF;">            #1./home/test/web/dist/login</span><span style="color:#FFFFFF;">        查找有没有login这个文件，没有的话</span></span>
<span class="line"><span style="color:#FFFFFF;">            #2./home/test/web/dist/login/</span><span style="color:#FFFFFF;">       查找有没有login这个目录，没有的话</span></span>
<span class="line"><span style="color:#FFFFFF;">            #3.请求https</span><span style="color:#ABB2BF;">:</span><span style="color:#7F848E;font-style:italic;">//manage.test.com/index.html  nginx内部做了一个子请求</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFFFFF;">            #三.总的来说</span><span style="color:#ABB2BF;">,</span><span style="color:#FFFFFF;">index的优先级比try_files高,请求会先去找index配置,这里最后一个参数必须存在</span></span>
<span class="line"><span style="color:#FFFFFF;">            try_files</span><span style="color:#FFFFFF;"> $uri</span><span style="color:#FFFFFF;"> $uri/</span><span style="color:#FFFFFF;"> /index.html;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#FFFFFF;">            #解决跨域问题</span></span>
<span class="line"><span style="color:#FFFFFF;">            #允许跨域请求地址(*表示全部,但是无法满足带cookie请求,因为cookie只能在当前域请求)</span></span>
<span class="line"><span style="color:#FFFFFF;">            add_header</span><span style="color:#FFFFFF;"> Access-Control-Allow-Origin</span><span style="color:#FFFFFF;"> $http_origin;</span></span>
<span class="line"><span style="color:#FFFFFF;">            #允许接收cookie和发送cookie</span></span>
<span class="line"><span style="color:#FFFFFF;">            add_header</span><span style="color:#FFFFFF;"> Access-Control-Allow-Credentials</span><span style="color:#FFFFFF;"> &#39;true&#39;;</span></span>
<span class="line"><span style="color:#FFFFFF;">            #允许请求的方法</span></span>
<span class="line"><span style="color:#FFFFFF;">            add_header</span><span style="color:#FFFFFF;"> Access-Control-Allow-Methods</span><span style="color:#FFFFFF;"> &#39;GET,POST,DELETE,PUT,OPTIONS&#39;;</span></span>
<span class="line"><span style="color:#FFFFFF;">            #允许请求头（Content-Type</span><span style="color:#ABB2BF;">:</span><span style="color:#FFFFFF;">请求数据/媒体类型</span><span style="color:#FFFFFF;"> x-requested-with:判断请求是异步还是同步</span><span style="color:#FFFFFF;"> 自定义header</span><span style="color:#FFFFFF;"> 比如</span><span style="color:#FFFFFF;"> token）</span></span>
<span class="line"><span style="color:#FFFFFF;">            add_header</span><span style="color:#FFFFFF;"> Access-Control-Allow-Headers</span><span style="color:#FFFFFF;"> $http_access_control_request_headers;</span></span>
<span class="line"><span style="color:#FFFFFF;">            #浏览器缓存请求头信息</span><span style="color:#ABB2BF;">,</span><span style="color:#FFFFFF;">1800秒内,只会有1次请求，不会出现</span><span style="color:#E06C75;">&quot;OPTIONS&quot;</span><span style="color:#FFFFFF;">预请求,节约资源</span></span>
<span class="line"><span style="color:#FFFFFF;">            #add_header</span><span style="color:#FFFFFF;"> Access-Control-Max-Age</span><span style="color:#FFFFFF;"> &#39;1800&#39;;</span></span>
<span class="line"><span style="color:#FFFFFF;">            if</span><span style="color:#FFFFFF;"> ($request_method</span><span style="color:#FFFFFF;"> =</span><span style="color:#FFFFFF;"> &#39;OPTIONS&#39;)</span><span style="color:#FFFFFF;"> {</span></span>
<span class="line"><span style="color:#FFFFFF;">                    return</span><span style="color:#FFFFFF;"> 204;</span></span>
<span class="line"><span style="color:#ABB2BF;">            }</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#ABB2BF;">            #服务端HttpServletRequest可以获得用户的真实ip</span></span>
<span class="line"><span style="color:#ABB2BF;">            proxy_set_header X-Real-IP $remote_addr;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#ABB2BF;">            #服务端HttpServletRequest可以获得用户的真实ip和经过的每一层代理服务器的ip</span></span>
<span class="line"><span style="color:#ABB2BF;">            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#ABB2BF;">            #服务端接收的请求头Host值不变</span></span>
<span class="line"><span style="color:#ABB2BF;">            proxy_set_header Host  $http_host;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#ABB2BF;">            proxy_set_header X-Nginx-Proxy </span><span style="color:#D19A66;">true</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#ABB2BF;">        }</span></span>
<span class="line"><span style="color:#ABB2BF;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#ABB2BF;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br><span class="line-number">99</span><br><span class="line-number">100</span><br><span class="line-number">101</span><br><span class="line-number">102</span><br><span class="line-number">103</span><br><span class="line-number">104</span><br><span class="line-number">105</span><br><span class="line-number">106</span><br><span class="line-number">107</span><br><span class="line-number">108</span><br><span class="line-number">109</span><br><span class="line-number">110</span><br><span class="line-number">111</span><br><span class="line-number">112</span><br><span class="line-number">113</span><br><span class="line-number">114</span><br><span class="line-number">115</span><br><span class="line-number">116</span><br><span class="line-number">117</span><br><span class="line-number">118</span><br><span class="line-number">119</span><br><span class="line-number">120</span><br><span class="line-number">121</span><br><span class="line-number">122</span><br><span class="line-number">123</span><br><span class="line-number">124</span><br><span class="line-number">125</span><br><span class="line-number">126</span><br><span class="line-number">127</span><br><span class="line-number">128</span><br><span class="line-number">129</span><br><span class="line-number">130</span><br><span class="line-number">131</span><br><span class="line-number">132</span><br><span class="line-number">133</span><br><span class="line-number">134</span><br><span class="line-number">135</span><br><span class="line-number">136</span><br><span class="line-number">137</span><br><span class="line-number">138</span><br><span class="line-number">139</span><br><span class="line-number">140</span><br><span class="line-number">141</span><br><span class="line-number">142</span><br><span class="line-number">143</span><br><span class="line-number">144</span><br><span class="line-number">145</span><br><span class="line-number">146</span><br><span class="line-number">147</span><br><span class="line-number">148</span><br><span class="line-number">149</span><br><span class="line-number">150</span><br><span class="line-number">151</span><br><span class="line-number">152</span><br><span class="line-number">153</span><br><span class="line-number">154</span><br><span class="line-number">155</span><br><span class="line-number">156</span><br><span class="line-number">157</span><br><span class="line-number">158</span><br><span class="line-number">159</span><br><span class="line-number">160</span><br><span class="line-number">161</span><br><span class="line-number">162</span><br><span class="line-number">163</span><br><span class="line-number">164</span><br><span class="line-number">165</span><br><span class="line-number">166</span><br><span class="line-number">167</span><br><span class="line-number">168</span><br><span class="line-number">169</span><br><span class="line-number">170</span><br><span class="line-number">171</span><br><span class="line-number">172</span><br><span class="line-number">173</span><br><span class="line-number">174</span><br><span class="line-number">175</span><br><span class="line-number">176</span><br><span class="line-number">177</span><br><span class="line-number">178</span><br><span class="line-number">179</span><br><span class="line-number">180</span><br><span class="line-number">181</span><br><span class="line-number">182</span><br><span class="line-number">183</span><br><span class="line-number">184</span><br><span class="line-number">185</span><br><span class="line-number">186</span><br><span class="line-number">187</span><br><span class="line-number">188</span><br><span class="line-number">189</span><br><span class="line-number">190</span><br><span class="line-number">191</span><br><span class="line-number">192</span><br><span class="line-number">193</span><br><span class="line-number">194</span><br><span class="line-number">195</span><br><span class="line-number">196</span><br><span class="line-number">197</span><br><span class="line-number">198</span><br><span class="line-number">199</span><br><span class="line-number">200</span><br><span class="line-number">201</span><br><span class="line-number">202</span><br><span class="line-number">203</span><br><span class="line-number">204</span><br><span class="line-number">205</span><br><span class="line-number">206</span><br><span class="line-number">207</span><br><span class="line-number">208</span><br><span class="line-number">209</span><br><span class="line-number">210</span><br><span class="line-number">211</span><br><span class="line-number">212</span><br><span class="line-number">213</span><br><span class="line-number">214</span><br><span class="line-number">215</span><br><span class="line-number">216</span><br><span class="line-number">217</span><br><span class="line-number">218</span><br><span class="line-number">219</span><br><span class="line-number">220</span><br><span class="line-number">221</span><br><span class="line-number">222</span><br><span class="line-number">223</span><br><span class="line-number">224</span><br><span class="line-number">225</span><br><span class="line-number">226</span><br><span class="line-number">227</span><br><span class="line-number">228</span><br><span class="line-number">229</span><br><span class="line-number">230</span><br><span class="line-number">231</span><br><span class="line-number">232</span><br><span class="line-number">233</span><br><span class="line-number">234</span><br><span class="line-number">235</span><br><span class="line-number">236</span><br><span class="line-number">237</span><br><span class="line-number">238</span><br><span class="line-number">239</span><br><span class="line-number">240</span><br><span class="line-number">241</span><br><span class="line-number">242</span><br><span class="line-number">243</span><br><span class="line-number">244</span><br><span class="line-number">245</span><br><span class="line-number">246</span><br><span class="line-number">247</span><br><span class="line-number">248</span><br><span class="line-number">249</span><br><span class="line-number">250</span><br><span class="line-number">251</span><br><span class="line-number">252</span><br><span class="line-number">253</span><br><span class="line-number">254</span><br><span class="line-number">255</span><br><span class="line-number">256</span><br><span class="line-number">257</span><br><span class="line-number">258</span><br><span class="line-number">259</span><br><span class="line-number">260</span><br><span class="line-number">261</span><br><span class="line-number">262</span><br><span class="line-number">263</span><br><span class="line-number">264</span><br><span class="line-number">265</span><br><span class="line-number">266</span><br><span class="line-number">267</span><br><span class="line-number">268</span><br><span class="line-number">269</span><br><span class="line-number">270</span><br><span class="line-number">271</span><br><span class="line-number">272</span><br><span class="line-number">273</span><br><span class="line-number">274</span><br><span class="line-number">275</span><br><span class="line-number">276</span><br><span class="line-number">277</span><br><span class="line-number">278</span><br><span class="line-number">279</span><br><span class="line-number">280</span><br><span class="line-number">281</span><br><span class="line-number">282</span><br><span class="line-number">283</span><br><span class="line-number">284</span><br><span class="line-number">285</span><br><span class="line-number">286</span><br></div></div>`,52)]))}const m=n(F,[["render",e]]);export{y as __pageData,m as default};
