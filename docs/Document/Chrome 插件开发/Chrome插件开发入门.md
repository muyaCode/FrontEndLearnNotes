# Chrome 插件开发入门

Chrome 插件开发文档：[developer.chrome.com](https://developer.chrome.com/extensions)

## 文章

[开发 chrome 插件实现爬虫 - 掘金 (juejin.cn)](https://juejin.cn/post/6951366925557432356)

[chrome 插件 DIY - 掘金 (juejin.cn)](https://juejin.cn/post/6844903508966113287)

[从零深入 Chrome 插件开发 - 掘金 (juejin.cn)](https://juejin.cn/post/7035782439590952968)

[🌕 手把手从 0 撸一个 Chrome 插件，《特别关注-掘金》 功能 - 掘金 (juejin.cn)](https://juejin.cn/post/7124085369926074399)

[字节跳动 chrome 插件开发指南 - 掘金 (juejin.cn)](https://juejin.cn/post/7114959554709815326)

[飞书 chrome 插件开发指南 - 掘金 (juejin.cn)](https://juejin.cn/post/6970912734086955045)

[从零深入 Chrome 插件开发 - 掘金 (juejin.cn)](https://juejin.cn/post/7035782439590952968)

[【程序员的浪漫】七夕到了，还不快给你女朋友做一个专属 chrome 插件 - 掘金 (juejin.cn)](https://juejin.cn/post/7122332008252080142)

[30 分钟开发一款抓取网站图片资源的浏览器插件 - 掘金 (juejin.cn)](https://juejin.cn/post/6844904119828742152)

[Chrome 插件开发教程之入门指南 (360doc.com)](http://www.360doc.com/content/22/0913/16/11604731_1047745325.shtml)

[Chrome 插件开发入门\_谷歌插件开发\_CShadow7 的博客-CSDN 博客](https://blog.csdn.net/CShadow7/article/details/123730422)

[10 分钟教你开发自己的 Chrome 浏览器插件 - 码农教程 (manongjc.com)](http://www.manongjc.com/detail/51-uzjfsulporgmlpm.html)

视频课程：[chrome 浏览器插件开发视频教程\_哔哩哔哩\_bilibili](https://www.bilibili.com/video/av763262694/?vd_source=5f0c99b3deddffe219938763769b15ac)

---

文章参考：[Chrome 插件开发入门 - 掘金 (juejin.cn)](https://juejin.cn/post/7167562121768042532)

Chrome 的界面布局和插件式设计决定了其可能的扩展点和机制。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f52ab9ecdab94925afa971af29eaa085~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

### Manifest.json:配置入口

用以配置应用名、版本，以及所需的系统权限，最重要、不可缺少，必须置于根目录

- **manifest_version**: 插件版本

目前只支持上架和更新 v3 版本，v2 不再支持，必须在 2023 年前全部替换。且 V3 版的上架审核优先级更高，周期更短。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ea2a4521cd5945e2bad90b1b9a7fdf2b~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

v3 版本对 v2 版的组件和 API 进行了大幅度的优化和安全增强，最主要的变动如下图

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/94768f5f685b48ad99986ffaf792b937~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

- **Permission 权限**

需要申请正确的权限才可以调用相应的 API，如操作选项卡的 tabs 权限。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/afa9411b69f34e73a4da941dfcc45c64~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

**最小权限原则**：尽量使用必要的权限，过多的、敏感权限将导致审核时间大大延长，甚至拒绝

![componets permission.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/59d2312c7d734cb392363b7972f3ea8f~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

v3 版本中 Api Permission 和 Host Permission 分离，以更清晰的界定权限类别。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0906b261e33e4a6995468964e0ee438f~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

### Service Worker: 中央处理器

本质上是浏览器在后台运行的脚本，它是完全独立于它正在处理或服务的网页。它们充当了 web 应用程序、浏览器和网络之间的代理服务器。service worker 赋予 Web 应用程序像原生应用程序一样工作的能力

- **无状态瞬时组件**：在浏览器启动后初始化执行，便销毁
- **事件驱动**： 通过注册各类事件监听器，作为其他组件间的中央处理和通信单元
- **权限最大：** 可以调用除了 Dom 外的大部分 API，完成其他组件不可用执行的功能

![img](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a1ffcece9caf46fe968e31f76f43caa5~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b970805cbea84279802d72e9d7cd5dd3~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

### Popup: 弹窗

点击 browser*action 或者 page*action 图标时打开的一个小窗口网页，焦点离开网页就立即关闭，一般用来做一些临时性的交互。

- 大部分插件主要的交互区域、工作方式
- **最大空间**：800 x 600

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/08d6919f04d5480aa00f713a4709ee0f~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

### ContentJs: 内容脚本

向当前主页面窗口中注入脚本的一种形式，最常见的比如：广告屏蔽、页面 CSS 定制。

- 突破 POP 窗口大小的局限性，自由度更高
- 注意 CSS 样式污染，会导致部分宿主页面变形

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/29e1d46f65ca433e89e2de3d378e04e6~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

## 插件 DIY - Rename Tab

**背景**:

部分网站的所有子页面的标题相同，当打开众多时，很难通过标题快速区分具体是哪个页面，影响并发多开基数。

**功能需求**:

支持手动或自动修改当前页面 Tab 标题，增加 Tab 可辨识性、可搜索性。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6c0a60552b2646579f6f8e3d62e9c476~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1933994b05444c91b4a2cea6861f06e1~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

### 链接

- [Rename Tab](https://link.juejin.cn?target=https%3A%2F%2Fgitee.com%2Fcoderkkx%2Fchrome-crx-demo)
