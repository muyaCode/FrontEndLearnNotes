# GitHub 快速入门

GitHub 文档：https://docs.github.com/cn

GitHub 新功能：https://github.blog/

教程：[Git 和 Github 终极指南 - GeeksforGeeks](https://www.geeksforgeeks.org/ultimate-guide-git-github/?ref=lbp)

Git 备忘清单（github-cheat-sheet）：[Git 备忘清单 - GitHub Docs](https://docs.github.com/cn/get-started/quickstart/git-cheatsheet)

编程之家 GitHub 教程：<https://www.jb51.cc/github-tutorial/>

> 当您忘记命令或不想在 CLI 中使用帮助时，此 Git 备忘清单可节省时间。
>
> 很快掌握所有可用的 Git 命令可能是一项艰巨的任务。 可以使用“[Git 速查表](https://training.github.com/)”快速参考常用命令。 “Using Git（使用 Git）”备忘清单有多种语言版本。
>
> 此外，请查看  [Git 和 GitHub 学习资源](https://docs.github.com/cn/articles/git-and-github-learning-resources)页，该页链接到指南、视频等。

---

GitHub 在程序开发领域家喻户晓，现在几乎整个互联网的开发者都将版本管理工具 GitHub 作为版本控制的首选，甚至像笔者这样非开发者，一名和每天和数据打交道的人也在使用 GitHub，目的主要有：

- 查找资料：GitHub 上有很多国内外大神开源的数据挖掘、机器学习的资料、代码，笔者直接 fork 或者 clone 下来学习

- 技术交流：通过对开源项目提出 issue，能够起到技术交流的效果

- 个人展示：现在互联网领域中，如果一个程序员在 GitHub 上有一个很好的开源项目，必定是会备受关注。因此 GitHub 实际上是一个很好的展示个人实力的舞台，或许它能够让你受到招聘人员的青睐

github 作为全球最大的开源软件项目托管平台，相信很多程序员都在使用，不仅仅是因为它可以免费的作为我们公有或者私有的代码仓库，更因为 github 上面有大量的开源学习项目或资源，秉着开源自由的理念，吸引了大量的个人或者企业开发者。

github 将所有的改动行为称为 contributions，包括 commit，pr, code review,isssue,fork 等等。

github 有个叫活动概览(Activity overview)的功能，将 contributions 按照下面四个象限进行分类统计：

- Commits：建仓、提交代码或 fork 等会触发

- Pull requests：指开发者在本地对源代码进行更改后，向 GitHub 中托管的 Git 仓库请求合并的功能。

- Code review：预览代码

- Issues：用于 BUG 报告、功能添加、方向性讨论等，将这些以 Issue 形式进行管理。

## Github 使用技巧

很多人搜索 github，但是芸芸众生，要找到自己想要的项目犹如海底捞针一般，今天教大家几项神技，可以快速找到自己想要的内容。

1、按 star 数目搜索，比如 JavaScript，要求星数，这样就能获取 star 数目最多的项目

2、follow 一些 github 上面的大牛

请登录：[https://github-ranking.com/](https://github-ranking.com/)

国内大牛：<http://outofmemory.cn/github/>

这里是搜索名人的网址：[Code Search · GitHub](https://github.com/search)

高级搜索：[GitHub · Where software is built](https://github.com/search/advanced)

3、Awesome + 你的关键字：搜索一些优秀的框架、教程、项目等

4、看一些搜索技巧，设定条件进行搜索

地址：[搜索仓库 - GitHub Docs](https://help.github.com/articles/searching-repositories/)

5、通过 readme 看看人家是否发出 pull request

看看这篇文章：[如何在 github 中贡献自己的力量\_乾龙\_Heron 的博客-CSDN 博客](http://blog.csdn.net/qianlong4526888/article/details/11529981)

6、看 explore 推荐

[Explore GitHub · GitHub](https://github.com/explore)

7、看看其他

[新浪博客](http://blog.sina.com.cn/s/blog_4e60b09d0102vcso.html)

8、直接 github 上搜 fackbook 或者其他，可以看到他们的最新作品

**可以说，正式 GitHub，让社会化全员编程成为了现实。**

## 版本管理

版本管理就是管理更新的历史记录。Git 出现之前，人们主要是使用 Subversion（简称为 SVN）作为版本控制的工具。

### SVN

SVN 是属于**集中型**的版本管理系统，其特点是**将仓库集中存放在服务器中，所以只存在一个仓库**。集中型将所有特点是方便管理，但是如果开发者所处的环境无法联网，则无法获取到最新的源码，进而无法进行开发工作。

![SVN](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2942439a8eb248d88a9b1e1610b87f8a~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp)

### Git

Git 是**分散型**的版本管理系统。从下图中我们可以观察出来，GitHub 将仓库 fork 给每个用户。fork 的仓库和原始的仓库是两个不同的仓库，开发者是可以随意编辑的。

Fork 的过程其实就是将某个仓库复制到自己的账户下

![Git](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cffee4cfb7e6414d96abac58a67fdad4~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp)

## 什么 GitHub

GitHub 是一个基于 Git 的代码托管平台。如果是付费用户可以建立自己的私人仓库，一般用户的话只能建立公用仓库，也就是说仓库的代码必须是公开的。到底 Git 和 GitHub 有什么区别呢？

在 Git 中，开发者将源代码存入名叫“Git 仓库”的资料库中，方便使用；而 GitHub 则是在网络上提供 Git 仓库的一项服务

GitHub 上公开的源代码都是通过 Git 进行管理的。

## 安装与配置 Git

### 安装

现在笔者使用的`MacOS`系统，是自带`Git`的。关于 Windows 系统下安装，请参考如下文章，讲解的非常详细。

Windows 系统 Git 安装教程（详解 Git 安装过程）：

[www.cnblogs.com/xueweisuoyo…](https://www.cnblogs.com/xueweisuoyong/p/11914045.html)

### 配置

首先需要设置使用 Git 时候的名字和邮箱，名字需要使用英文

git config --global user.name "Firstname Lastname" # 名称
git config --global user.email "your_email@example.com" # 邮箱

### ~/.gitconfig 中以如下形式输出文件

[user]
name = Firstname Lastname
email = your_email@example.com

```bash

```

需要注意的是：

1. GitHub 上公开仓库的时候，名字和邮箱会一同被公开，所以请不要使用不便公开的隐私信息

2. 程序员来自世界各地，请使用英文，不要使用汉字；如果不想使用真名，可以使用网站的昵称

**如何提高命令输出的可读性**？

```bash
git config --global color.ui auto   # 将color.ui 设置成auto
```

### 创建账户

进入创建用户的页面：[github.com/join](https://link.juejin.cn/?target=http%3A//github.com/join)

填写如下的信息在点击`Create an accout`即可

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ff235251c6af4e8e923b548dff208d05~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp)

### 配置 SSH

GitHub 上连接现有仓库的认证，是通过使用了 SSH 的公开密钥认证方式进行的。现在我们需要创建公开密钥所需的 SSH Key，并将其添加到 GitHub。

```bash
ssh-keygen -t rsa -C   # 创建SSH Key
```

接下来需要输入两次密码，最终会生成两个文件：

- id_rsa：私有密钥

- id_rsa.pub：公开密钥

下面我们需要在 GitHub 中添加公开密钥，今后就可以使用私有密钥进行认证。点击右上角的账户设定按钮：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6186e3ae3dc34358ad69b8ac14e0a8bc~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp)

进入 settings 之后，添加新的 SSH Key

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d8fc995e4f00457a8ee5f484f97f8905~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp)

接下来会出现 Title 和 Key 两个输入框，在 Title 中输入适当的密钥名称，Key 部分复制上面 id_rsa.pub 文件中的内容

```bash
cat ~/.ssh/id_rsa.pub   # 查看内容
```

添加完成之后，会在我们的邮箱中收到一封提示“公开密钥添加完成”的邮件，确认即可。这样便完成了整个手中的私人密钥和 GitHub 的认证和通信问题，验证一下：

```bash
ssh -T git@github.com
```

在接下来的页面中输入密码和 yes 即可完成验证。

## 建立仓库

首先我们必须明白一点：**仓库有两种**

- 远程在 GitHub 上的仓库：远程仓库

- 在自己本地的仓库：本地仓库

本文是以 MacOS 系统为例，基于 Linux；如果是想学习 Windows 下的仓库创建，请参考下文，讲解的很详细：

Git 使用（10 分钟入门）：

[www.jianshu.com/p/09f243768…](https://www.jianshu.com/p/09f243768cf6)

### 远程仓库

1、建立远程仓库需要我们先登陆自己的 GitHub 账号，再进行建仓。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/24782d0a81e44c01880afe88b4942c44~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp)

2、我们创建一个`git_start`的仓库

- 仓库的名字

- 仓库的简单描述

- **不要**在远程仓库添加 README.md 文件。我们使用手动 push 的方式来添加

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d9e5b6ad22154dd2a2506d98188809d5~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp)

3、仓库解释

打开上面我们创建好的仓库，会出现如下的内容（先写上注释，后面慢慢解释）

```bash
echo "# git_start" >> README.md    # 往README.md中写入内容
git init  # 初始化
git add README.md   # 添加文件
git commit -m "first commit"   # 提交并注释
git branch -M main  # 提交分支
git remote add origin git@github.com:pidada/git_start.git   # 建立远程仓库与本地仓库的连接
git push -u origin main  # 推送
```

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/48cf5bcefc9a490ebe0a43ede27301c8~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp)

### 本地仓库

1、建立本地仓库

所谓的本地仓库，就是你自己电脑客户端的仓库。同样地，笔者在本地建立了同样名字的本地仓库`git_start`，其实就是个文件夹

**本地仓库要和远程仓库保持一致**：

```bash
mkdir git_start  # 创建文件夹，即仓库
cd git_start  # 切换到仓库中
ls  # 查看内容，目前是没有任何内容
```

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/793c8d1780d14b798878588c13e0a24e~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp)

2、初始化操作

```bash
echo "学习GitHub的使用，快速入门" >> README.md   # 往文件中写入内容，后面可以更改
git init   # 初始化
```

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7ded2e5360fc4254b4f14eefd61d2c09~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp)

初始化之后会在当前目录下自动生成一个`.git`的文件。这个文件下存储着管理当前目录内容所需要的仓库数据

3、查看待提交文档

通过`ls`查看已经有了`README.md`文档

```bash
git status  # 查看待提交的文档
```

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/457c5058a7b44547a0c37fb7db29bd52~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp)

4、提交文档

我们将上面的`README.md`文档和生成的`.git`文档一并提交

git add . # 提交全部文件
git add README.md # 单独提交一个文件
git commmit -m "2021-1-1" # commit 提交，同时写上备注：2021-1-1

### add 和 commit 的同步操作

```bash
git commit -am "2021-1-1"
```

**注意：执行了 add 操作，文件还没有被上传到 Git 远程仓库中，只是提交到了缓存区域**

`git commit -m "2021-1-1"`才是真正地提交内容，同时写上备注：将文件从缓存区提交到远程

5、建立远程仓库连接并推送

```bash
git remote add origin git@github.com:peter/git_start.git  # 建立连接
git push -u origin main  # 推送到main分支
```

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/62eaf35496204d3d8f7949bff9eddb65~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp)

6、检查

此时我们刷新远程仓库的页面，会发现页面更新了，也有了内容：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3aa2107ed8ca47999730726ced028072~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp)

7、查看提交日志

```bash
git log  # 查看提交日志
git log --pretty=short  # 只显示一行简述信息
git log README.md  # 只显示指定目录、文件的日志
git log -p README.md  # 只显示指定目录、文件的日志修改前后的改动
```

`commit`栏旁边显示的是指向这个提交的哈希值。**Git 的其他命令中，在指向提交时会用到这个哈希值**

Author 栏旁边是 Git 设置的用户名和邮箱地址

Date 栏显示的是执行日期和时间

最下面是提交信息，-m 参数后面的信息

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6cef230666bd479d852949744052e09e~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp)

8、修改`README.md`文件

通过 vim 编辑器修改内容如下：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/73bb3f8f377640059aa0858689ff4705~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp)

上面使用了 Markdown 语法，然后我们重新按照上面的命令执行一遍：

git status # 状态是红色
git add . # 提交到缓存区
git commit -m "修改 README.md" # 记录提交信息

### git remote add origin git@github.com:peter/git_start.git # 已经建立了连接，所以不必在执行此命令

```bash
git push -u origin main # 推到main分支
```

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/607b0a24cc3b49488c0dd704ff00af7c~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp)

回顾下整个操作的过程：

1. 建立远程仓库

2. 建立本地仓库

3. 初始化本地仓库

4. 文档提交到缓存区

5. 缓存区推送到远程仓库

### 重要命令

我们总结一下上面操作中几个重要的命令：

1、git status

查看仓库中文件的状态。如果有新的文件或者原来的文件有修改过，会出现红色

2、git add

向缓存区中添加内容，缓存区是提交之前的一个临时区域（Stage 或者 Index）

3、git commit  [-m]

将暂存区中的文件保存仓库的历史记录中；-m 参数后面跟上提交信息：**git commit -m "第一次提交"**

4、git log

查看以往提交日志信息：什么人在什么时候进行了提交或者合并等，以及操作前后有怎样的差别

```bash
git log  # 查看日志
git log --pretty=short  # 只显示提交信息的第一行
git log README.md  # 查看某个文件的提交信息
git log -p README.md  #  -p参数只查看提交的改动部分
```

5、git diff

查看工作树、暂存区、最新提交之间的差别。

```bash
git diff  # 查看当前工作树和暂存区的差别
git diff HEAD  # 查看本次提交和上次提交的差别；HEAD指向当前分支中的最新一次提交的指针
```

养成习惯：git commit 之前先执行 git diff HEAD 命令来查看本次提交与上次提交之间的差别；HEAD 指向当前分支中最新的一次提交的指针。

6、仓库操作

`-u`作用：将来运行 git pull 命令从远程仓库获取内容时，本地仓库就可以直接从 origin 的 main 分支中获取内容，不需要添加其他的参数

```bash
git remote add origin git@github.com:github/peter/git_start.git  # 添加远程仓库
git push # 推送到远程仓库
git push -u origin main  # 推送到main分支下
git push -u origin feature_A  # 推送到分支A
git clone  仓库地址  # 将某个远程仓库的内容复制到本地
git push  # 推送
git pull  # 获取最新的远程分支内容
```

### 分支

### main 分支

main 分支是 Git 默认创建的分支，其他所有的分支都是在这个分支的基础上进行的。

- 不同的分支单独进行各自的作业

- 该分支的作业完成之后再和 main 分支合并

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c9de61957e1d44d484746d005407ce85~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp)

进行完作业之后的合并操作：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9306d8792e294cb296bffb011385f44a~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp)

### 分支相关命令

1、git branch-显示分支

显示分支一览表：将分支名列表显示出来，同时确认当前所在的分支；标有星号`*`表示当前分支

```bash
git branch -a  # 查看当前分支的相关信息
```

2、git branch feature-创建分支

```bash
git branch feature
```

3、git checkout feature-切换分支

```bash
git checkout feature
git checkout main  # 切换到main分支
git checkout -  # 切换到上一个分支
```

上面两个命令的合并，创建新的分支并切换到新的分支：

```bash
git checkout -b feature  # 切换到创建的新分支
```

4、git merge-合并分支

假设某个分支已经完成了作业需要和主分支 main 合并，使用如下语句：

```bash
git checkout main  # 切到主分支
git merge --no-off feature-A  # 合并分支
```

5、git log —graph-图的形式查看分支

通过图表的形式查看提交的内容

```bash
git log --graph
```

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c8cb3f99dd86478eb859ff026c8a966f~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp)

### 版本回溯

既然是版本控制系统，那么对于不同版本的管理肯定是至关重要的。**GitHub 的另一个特征便是可以灵活地操作不同的历史版本**。借助分散仓库的优势，可以在不影响其他仓库的前提下对历史版本进行操作。

1、回溯到指定状态

**哈希值只要输入 4 位以上就可以执行了**

```bash
git reset --hard [哈希值]  # 添加指定的哈希值，代表某个时间点的状态
```

2、查看**当前仓库的全部执行过**的操作日志

记录我们操作的每次命令

```bash
git reflog   # 针对当前仓库
git log   # 查看以当前状态为终点的历史日志
```

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/78793e9f70024d4590c0787745923456~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp)

所以我们可以先通过`git reflog`来查看哈希值，再通过`git reset —hard [哈希值]`回到某个状态

3、修改上一条提交信息

使用`git commit --amend`命令

```bash
git commit --amend
```

4、压缩历史

在合并特性分支之前，如果发现已经提交的内容中有拼写等错误，可以先提交一个修改，然后将这个修改包含到前一个提交之中，压缩成一个历史记录

```bash
git rebase -i
git rebase -i HEAD~2  # 当前分支下的两个最新历史记录进行压缩
```

5、添加提交一次完成

```bash
git commit -am "add和commit同时完成"
```

### git reset 详解

#### 命令

对版本回溯命令的详解。git reset 命令用于回退版本，可以指定回退到某个具体的历史版本。

git reset 命令语法格式具体如下：

```bash
git reset [--soft | --mixed | --hard] [HEAD]
```

`--mixed`是**默认参数，可以不带**，用于重置暂存区的文件与上一次的提交（commit）保持一致，工作区文件内容保持不变

#### soft

`--soft`参数用于回退到某个版本

```bash
git reset --soft HEAD  #  回退到上个版本
git reset --soft HEAD~3  # 回退到上上上个版本
```

#### hard⚠️

！！！⚠️ 谨慎使用`--hard` 参数，它会删除回退点之前的所有信息

```bash
git reset --hard HEAD~3   # 回退到上上上个版本
git reset --hard 1de43  # 回退到指定版本
git reset --hard origin/main  # 本地状态回退到和远程相同
```

#### HEAD

```bash
git reset HEAD^   # 回退到所有内容的上一个版本
git reset HEAD^ Git入门.md  # 回退到Git入门.md文件的版本的上一个版本（指定版本的上个版本）
git reset 01b42  # 回退到指定版本，需要至少哈希值的前4位；可以通过git reflog命令先查看我们要回退的版本号的哈希值
```

git reset HEAD 还能取消已缓存的内容。当我们对某个文件的内容进行了修改并且已经执行`git add`之后，我们想取消缓存区的内容，使用如下命令：

```bash
git reset HEAD [filename]
```

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5042b0c244e449c99e79a5369db4ca72~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp)

**关于 HEAD 说明**：

- HEAD 表示当前版本

- HEAD^ 上一个版本

- HEAD^^ 上上一个版本

- HEAD^^^ 上上上一个版本

- 以此类推…

可以使用 ～数字表示

- HEAD~0 表示当前版本

- HEAD~1 上一个版本

- HEAD^2 上上一个版本

- HEAD^3 上上上一个版本

- 以此类推…

#### 总结

- `HEAD`指向的版本就是当前版本，因此，Git 允许我们在版本的历史之间穿梭，使用命令`git reset --hard commit_id`。

- 穿梭前，用`git log`可以查看提交历史，以便确定要回退到哪个版本。

- 要重返未来，用`git reflog`查看命令历史，以便确定要回到未来的哪个版本。
