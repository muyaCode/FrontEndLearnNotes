# GitHub仓库辅助工具和实用技巧

### [GitHub Trends](https://github-trends.com/)

![img](https://cdn.beekka.com/blogimg/asset/202302/bg2023020902.webp)

可视化比较 GitHub 上的开源项目

### GitHub 官方推出的 [github.dev](github.dev)

访问下面的网址，就可以在浏览器里面，使用 VS Code 编辑指定仓库代码：

https://github.dev/[用户名]/[仓库名]

它实际上就是 VS Code 编辑器的 Web 版，并且与 Git 高度集成。

使用时，首先在 GitHub 上面新建一个笔记仓库，公开或私密都可以。然后使用 github.dev 编辑完，再推送回仓库。换到其它机器时，就先从仓库获取文档的最新版本，简直是完美的解决方案。

更棒的是，GitHub 提供了一个快捷入口。 **打开 GitHub 仓库主页，按一下小数点（`.`）这个键，**  页面就会自动跳转到 VS Code 编辑环境，真是太方便了。

![](https://cdn.beekka.com/blogimg/asset/202108/bg2021082601.jpg)

另外，还有一个非官方的  [github1s.com](https://github1s.com/)，也提供类似功能。只要在仓库域名的里面，加上"1s"就可以了。如下：

`https://github1s.com/[用户名]/[仓库名]`

## 1. 使用“T”键快速查找文件

这个功能实在太赞了，但却只有少部分人知道。当你想看一个文件的内容时，按下“T”键，搜索文件名，竟然能直接跳转到目标文件。

**操作步骤**

1. 打开：https://github.com/lodash/lodash

2. 按下“T”键

3. 输入`add.test.js`(任何你想查找的文件)

4. 点击跳转查看内容

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8a8699f94f154244bb79f3e88528f6a3~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp?)

## 2. 3 种方式在线使用“VSCode”编辑器查看代码

虽然使用“T”键可以快速搜索文件，但当咱想查看整个项目代码时，它就显得有点效率低下了。

一起来看看三种在线查看代码的方法，就像在你的 VSCode 编辑器中一样。

第三种是我最喜欢的方式，我相信你会喜欢的。

#### 安装 octree 或者 sourcegraph 插件实现 code 在线浏览

### 2.1 使用"."按键

1. 打开：https://github.com/vuejs/vue

2. 按下"."键

3. 接着你会被重定向到：https://github.dev/vuejs/vue

4. 和本地 vscode 一模一样

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e8528d08596345c69e8e60fc4b58093d~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp?)

### 2.2 使用"github1s.com"

仅仅需要将“github”更改为“github1s”，咱们就可以达到与方法 1 相同的效果！

1. 打开：https://github.com/vuejs/vue
2. 将 url 修改为：https://github1s.com/vuejs/vue

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e96ef7decc344503bd3cfaf50c10388a~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp?)

### 2.3 使用 “gitpod.com/#xxx”

第三种更牛逼了，你甚至可以在线运行 js，只需要在`gitpod.com/#`后添加项目地址就可以达到效果。

1. 打开：https://github.com/qianlongo/fe-handwriting
2. 在地址栏最前面添加 gitpod.com/#

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9994ef41e6b44029ad347dba82cdcdaa~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp?)

## 3. 链接到单行代码

有时我们希望希望通过一个地址就链接到特定的代码行。如下图所示

**这种效果应该怎么实现呢？**

1. 打开 [github.com/qianlongo/f…](https://github.com/qianlongo/fe-handwriting/blob/master/17.quick-sort.js)

2. 单击左侧的行号

3. 复制链接即可（[github.com/qianlongo/f…](https://github.com/qianlongo/fe-handwriting/blob/master/17.quick-sort.js%23L8%EF%BC%89)

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e47b911c41ec434eb964324e44d1c3f3~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp?)

相信你一定注意到了链接后的“L8”。是的，咱们可以通过修改“L”+行号链接到所需的代码。

## 4. 链接到多行代码

既然我们可以链接到一行代码，那可以链接到多行吗？当然可以了！！！

1. 打开：https://github.com/qianlongo/fe-handwriting/blob/master/17.quick-sort.js

2. 按住“shift”键并单击左侧的行号

3. 复制链接：https://github.com/qianlongo/fe-handwriting/blob/master/17.quick-sort.js%23L8-L24%EF%BC%89

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a4a217cffe814e8887eca41b8279a0b3~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp?)

## 5. 跳转到定义函数的位置

如何快速跳转到定义函数的位置？推荐一个 chrome 插件，名字是 sourcegraph。

安装插件后，将鼠标放在使用该功能的位置时，会出现一个按钮。单击就可以跳转到定义它的位置。

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/92dd0ca7222545a7a8ad50d513504e6e~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp?)

## 6. 查看快捷键列表

github 提供了许多快捷键来帮助我们阅读代码，但记住它们真不是一件简单的事，咱们可以使用“Shift”+“？”显示快捷方式列表。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4ac4346e500441b5abaca03431e6a5f4~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp)

## 项目的代码搜索

[Search (github.com)](https://github.com/search?type=code)

## 如何发现优秀开源项目

[GitHub 上能挖矿的神仙技巧 - 如何发现优秀开源项目 · Issue #45 · biaochenxuying/blog](https://github.com/biaochenxuying/blog/issues/45)

## GitHub 统计：Gitstar Ranking

介绍

- GitHub 全球排名：这个排名很权威。

- 每个在 GitHub 开源的开发者，都想知道自己在 GitHub 上的排名吧，很简单只要在上面输入框输入自己的 GitHub 用户名即可，就可以看到自己的统计数据了。

网址

- 官网
  - [gitstar-ranking.com/](https://link.juejin.cn/?target=https%3A%2F%2Fgitstar-ranking.com%2F)

- github
  - https://github.com/k0kubun/gitstar-ranking

