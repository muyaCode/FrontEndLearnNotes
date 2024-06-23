# GitHub 加速

中国大陆的用户访问 GitHub 的速度很慢，如果不「科学上网」，下载一个项目可能需要等很多时间。

今天这篇文章就帮你彻底解决「GitHub 速度慢」的问题，让你的 GitHub 起飞！

速度慢的原因有很多，但最直接和最主要的原因是 GitHub 的分发加速网络的域名遭到 DNS 污染。

由于 GitHub 的加速分发 CDN 域名 assets-cdn.github.com 遭到 DNS 污染，导致无法连接使用 GitHub 的加速分发服务器，才使得中国大陆访问速度很慢。

我们解决污染问题一般是通过通过修改 Hosts ，GitHub 的 CDN 域名被污染问题也不例外。将域名解析直接指向 IP 地址来绕过 DNS 的解析，以此解决污染问题。

**01**

**解决污染**

**1.** 打开 www.ipaddress.com 查询下面四个网站的 IP 。

- [https://github.com/](https://github.com/)

- [https://assets-cdn.github.com/](https://assets-cdn.github.com/)

- [http://global.ssl.fastly.net/](http://global.ssl.fastly.net/)

- codeload.github.com

把这四个网站的地址复制到刚刚的完整进行查询，假如查询结果如下:

- 140.82.114.3：github.com

- 185.199.108.153：assets-cdn.github.com

- 185.199.109.153：codeload.github.com

- 151.101.184.249：global.ssl.fastly.net

**2.** 找到 Windows 下的 hosts 文件，进行 DNS 映射。![](https://mmbiz.qpic.cn/mmbiz_jpg/ePw3ZeGRruy6FqyWOeCJBkkKIaTNkiaialPoQObU2fVpjibpYPxXyAO05zGaJKAqmqAgGIlOEhQTJvmicm5wXYQlqw/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1)  
将 IP 地址写入进去。  
![](https://mmbiz.qpic.cn/mmbiz_jpg/ePw3ZeGRruy6FqyWOeCJBkkKIaTNkiaialJ2ZXCg6HZWib2pibXJ8mJbUr9Kosn74xUf2KblqnyTCHibbdPPk6751Kw/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1)

然后 win + R 输入 cmd，打开命令行界面。输入 ipconfig/flushdns 刷新 DNS 缓存即可，如果某一天发现网速又变慢了, 可以重新按上面的步骤查询最新的 ip 即可。

**02**

**Chrome 插件**

这款 GitHub 加速插件挺好用的，如果你没办登录谷插件商店，可以关注微信公众号「逛逛 GitHub」回复「加速插件」获取这个好用插件。

![](https://mmbiz.qpic.cn/mmbiz_png/ePw3ZeGRruy6FqyWOeCJBkkKIaTNkiaialawByDe59ksrHgYOF1cVH80aRH1vEnPRb0ml23SToElScPOam3m3dJQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

**03**

**GitHub 克隆网站**

下面这两个网站是 GitHub 的克隆版，也就是该网站的镜像。当你下载、克隆很慢时，可以随意访问下面这俩网站，我试了一下，用这两个网站下载和访问块多了。

- [https://github.com.cnpmjs.org](https://github.com.cnpmjs.org)

- [https://hub.fastgit.org](https://hub.fastgit.org)

**04**

**项目加速下载网站**

下面这个网站是一个 GitHub 加速下载网站，打开你要下载的 GitHub 仓库页面，点击右侧额绿色按钮点击 Download ZIP，等浏览器弹出下载框后复制下载框中的链接地址粘贴到这个网站即可。

[GitHub 加速下载 - 在线工具](http://toolwa.com/github/)

![](https://mmbiz.qpic.cn/mmbiz_png/ePw3ZeGRruy6FqyWOeCJBkkKIaTNkiaialo0oEfI1SXQGPb1hFMd0TQI08QECGCf8HDtQKFpwnLiaG9QqROo8O48w/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

05

### 方案一（不稳定）

五、加载慢，访问不了  
针对 Windows 下访问 GitHub 慢，有些图片加载不全的情况，进行如下处理

（1）查看 IP：打开 DNS 查询网站，分别查 github.com、github.githubassets.com、avatars0.githubusercontent.com

（2）修改 hosts 文件

利用记事本或者 notepad++打开 C:\Windows\System32\drivers\etc\hosts（修改前可以先另存为一份，保证出错能恢复），然后添加以下内容

更改系统 host 方法，当然本人使用的过程中，非常不稳定，有时秒刷，有时又很慢，只能备用。

第一步，下载 switchHost 工具，可以很方便的管理系统 host，切换方便，下载地址，[蓝奏网盘](https://wwd.lanzouf.com/i9N8Y05k27uf) | 提取码：6w5g

第二步，将 host 填入 switchHost,可用 host 获取地址：[raw.hellogithub.com/hosts](https://raw.hellogithub.com/hosts)

hosts 文件(C:\Windows\System32\drivers\etc)，加上以下内容：

192.30.253.113 github.com
185.199.109.154 github.githubassets.com
185.199.111.154 github.githubassets.com
203.98.7.65 gist.github.com

192.30.253.113 github.com
151.101.113.194 github.global.ssl.fastly.net
151.101.184.133 assets-cdn.github.com
151.101.184.133 raw.githubusercontent.com
151.101.184.133 gist.githubusercontent.com
151.101.184.133 cloud.githubusercontent.com
151.101.184.133 camo.githubusercontent.com
151.101.184.133 avatars0.githubusercontent.com
151.101.184.133 avatars1.githubusercontent.com
151.101.184.133 avatars2.githubusercontent.com
151.101.184.133 avatars3.githubusercontent.com
151.101.184.133 avatars4.githubusercontent.com
151.101.184.133 avatars5.githubusercontent.com
151.101.184.133 avatars6.githubusercontent.com
151.101.184.133 avatars7.githubusercontent.com
151.101.184.133 avatars8.githubusercontent.com

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/69ba9e197e854fbbac75211a7780aa13~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp?)

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/450ac68e489346f0b26b27542e3a1ea9~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp?)

后面就可以开刷 github 了，如果不稳定就实行第二个方案。

### 方案二

最爱的徒手（免费）找梯，

第一步，下载免费梯工具 v2ray，工具地址：[github.com/2dust/v2ray…](https://github.com/2dust/v2rayN/releases)

第二步，复制免费节点导入，如果节点不可用，就切换下一个，节点地址：[github.com/aiboboxx/v2…](https://github.com/aiboboxx/v2rayfree)，备用国内：[wuhou.fun/492.html](https://wuhou.fun/492.html)

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1c87fa9505cf4d27872373e649ef8549~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp?)

### 如果没有梯子的话，就看看下面的方法吧

- 首先我们得先获取 github 的 global.ssl.fastly 地址。

- 方式：[**github.global.ssl.fastly.net.ipaddress.com/#ipinfo**](https://link.juejin.cn?target=http%3A//github.global.ssl.fastly.net.ipaddress.com/%23ipinfo) 访问这个网址。会得到 CDN 和 IP 地址。

- 如截图所示:![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/51fa9e4fcbc34c6d8c077271f6a09ec7~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp?)

- 从图中我们可以看到 IP 地址是：199.232.69.194

- 然后我们再获取 github 的地址

- 方式：[**github.com.ipaddress.com/#ipinfo**](https://github.com.ipaddress.com/%23ipinfo) 访问这个网址，会得到 CDN 和 IP 地址

- 如截图所示：![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/90a49e01e1b94651af2f847ecc14ffd3~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp?)

- 从图中我们可以看到 IP 地址是：140.82.114.4

- 最后一步就是修改我们的 HOSTS 文件

- Mac OS 系统

1. 直接打开终端
2. 输入：sudo vim /etc/hosts
3. 输入本机的开机密码
4. 然后会看到如下图：![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/859f4f8516b14e68b52778955c7e6144~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp?)
5. 图中我已经把地址和 IP 都映射好了。
6. 最后就是打开浏览器实际测试了。

- Windows 系统

1. 打开 c 盘，按照这个路径 C:\Windows\System32\drivers\etc\hosts 找到 hosts 文件
2. 用文本编辑器打开文件
3. 然后直接把：140.82.114.4 github.com 和 199.232.69.194 github.global.ssl.fastly.net 复制进去。
4. 保存文件，并关闭。然后打开 github 看看吧

### 这是对比图

- 第一张是没有改之前的，第二张是改之后的。

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a3365df4ef914cbcbcef199b35adfbee~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp?)

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9f04bc03bcf249d69280933a31813557~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp?)

# GitHub End

（3）刷新 DNS

在 cmd 中输入 ipconfig /flushdns 即可刷新，然后重启浏览器，不行的话再重启电脑，这样就能成功打开 github 了，所有图片和内容都能加载。
在 gitee 上有大佬总结了访问策略，具体可查看链接：

https://gitee.com/docmirror/dev-sidecar  
六、加速下载  
有时候需要在 GitHub 下载一些开源项目，但是直接下网速慢到爆炸，这时候需要借助一些手段对其进行下载加速，常见的有几种方法：

码云（需注册），这是一个仿 github 的代码托管平台，通过导入目标开源项目，然后在下载。

另一个平台：[https://githubd.com/#/，无需注册，直接拷贝目标项目链接就可以快速下载。(已失效)](<https://githubd.com/#/%EF%BC%8C%E6%97%A0%E9%9C%80%E6%B3%A8%E5%86%8C%EF%BC%8C%E7%9B%B4%E6%8E%A5%E6%8B%B7%E8%B4%9D%E7%9B%AE%E6%A0%87%E9%A1%B9%E7%9B%AE%E9%93%BE%E6%8E%A5%E5%B0%B1%E5%8F%AF%E4%BB%A5%E5%BF%AB%E9%80%9F%E4%B8%8B%E8%BD%BD%E3%80%82(%E5%B7%B2%E5%A4%B1%E6%95%88)>)

Github 加速下载：GitHub 加速下载 - 在线工具  
将 github 上项目链接复制到输入框中就可以代理加速下载！

打开网站 GitHub Proxy 代理加速，粘贴链接直接下载，或者直接在后台使用下面加速指令  
git clone https://ghproxy.com/https://github.com/stilleshan/ServerStatus  ###下载链接前添加[https://ghproxy.com 即可](https://ghproxy.com%E5%8D%B3%E5%8F%AF)

git clone git://ghproxy.com/[GitHub - stilleshan/ServerStatus: 集成美化主题的 ServerStatus 服务器监控程序 docker 版.更新支持 ARM 架构](https://github.com/stilleshan/ServerStatus) ###加速方法二

git clone https://github.com.cnpmjs.org/stilleshan/ServerStatus   ###加速方法三

git clone https://hub.fastgit.org/stilleshan/ServerStatus   ###加速方法四

git clone https://github.91chi.fun//https://github.com/stilleshan/ServerStatus   ###加速方法五但是上面几种方法都没办法解决从 github 上下载一些 release 的打包文件，故有大佬又针对性的开发了新的加速方法，

可以拷贝下载链接通过 Unlock, speed up and easily transfer content from the cloud - Offcloud.com 下载，但是需要先注册，速度还可以。  
这个网站下载，可以直接使用，不要注册，大家直接 copy 链接上手

七、针对下载

》有时候我们会碰到下载指定分支的 github 开源项目（默认 git clone 的是最新的），这时候就可以借助下面指令实现

git clone -b application https://hub.fastgit.org/PaddlePaddle/PaddleVideo.git  ##b 后接上分支名》如果下载 Github 上某些代码仓库时，如果代码仓库中具有很多子模块，正常使用 git clone —-recursive 下载方式，具体如下

git clone --recursive [GitHub - onnx/onnx-mlir: Representation and Reference Lowering of ONNX Models in MLIR Compiler Infrastructure](https://github.com/onnx/onnx-mlir.git)
