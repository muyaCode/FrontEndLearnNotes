# Node版本管理工具

Node 所有历史版本：<https://nodejs.org/dist/>

## nvm-Node版本管理工具

[Node.js的多版本管理工具之nvm - 掘金 (juejin.cn)](https://juejin.cn/post/7140151675926347789)

### nvm下载：

node.js版本管理器开源地址：<https://github.com/coreybutler/nvm-windows>

下载地址：<https://github.com/coreybutler/nvm-windows/releases>

### nvm的简介、安装、使用：

<https://blog.csdn.net/QWERTYQ16/article/details/124497532>

### NVM的安装

常用命令：

```bash
# nvm版本
nvm version
# 列出当前已安装的所有的NVM for Windows 的Node版本
nvm list 
# nvm list 简化
nvm ls
# 安装最新版本Node
nvm install latest
# 显示当前的版本
nvm current

# Mac版本中,列出全部可以安装的node版本
nvm ls-remote 
# windows版本,列出全部可以安装的node版本
nvm ls available
# 给不同的版本号添加别名
nvm alias
# 删除已定义的别名
nvm unalias

# 在当前版本node环境下，重新全局安装指定版本号的npm包
nvm reinstall-packages 

# 启用Node版本管理
nvm on
# 禁用Node版本管理
nvm off
# 切换到使用指定的版本：使用某一具体版本，例如 ：nvm use 14.3.0
nvm use 版本号
# 卸载某一具体版本，例如：nvm uninstall 14.3.0
nvm uninstall 版本号
```



## Volta-Node版本管理工具

### Volta简介

无忧无虑的 JavaScript 工具管理器

- 快速无缝地安装和运行任何 JS 工具！Volta 是用 Rust 构建的，并作为一个活泼的静态二进制文件发布。
- 确保项目中的每个人都拥有相同的工具，而不会干扰他们的工作流程。
- 无论包管理器、Node运行时还是操作系统

#### ❣️为什么要使用 Volta？｜ 为什么选择Volta？

使用 Volta，一旦您选择了 Node 引擎，您就不必担心它。切换项目不需要您手动切换版本。您可以在工具链中安装 npm 软件包二进制文件，而无需定期重新安装它们或找出它们停止工作的原因。

Volta 的工作是`node`管理JavaScript 命令行工具，例如作为 JavaScript 包的一部分提供的可执行文件`npm`。 与包管理器一样，Volta 会根据您当前的目录跟踪您正在处理的项目。Volta 工具链中的工具会自动检测您在使用特定版本工具的项目中，并将您引导到最适合您的工具版本。`yarn`

### 相关网址

官网：https://volta.sh/

开源地址：https://github.com/volta-cli/volta

文档：https://docs.volta.sh/guide/getting-started

### 下载安装

下载地址：https://github.com/volta-cli/volta/releases/

安装的话参照官方文档：[Getting Started | Volta](https://docs.volta.sh/guide/getting-started)

### 确认已安装

设置环境变量：`.zshrc`查看shell配置文件如带有`cat`命令的文件等，如果写入如下路径，就OK了。 ~/.zshrc

```shell
export VOLTA_HOME="$HOME/.volta"
export PATH="$VOLTA_HOME/bin:$PATH"
```

**window也可以手动在系统变量内设置**

重新启动终端一次`volta`，检查是否可以使用该命令。

```shell
volta --version
```

### 管理你的工具链

> Volta 工具链管理的工具由`volta install`两个`volta uninstall`命令控制

#### Node安装

> 在工具链中安装工具时，安装的版本是该工具的_默认版本_。除非您在一个项目目录中工作，其中您有一个固定版本的 Node 以使用不同的版本，否则它默认为 Volta 使用的版本。 例如，您可以通过安装特定版本来选择 Node 的默认版本。

```shell
$ volta install node@14.15.5
```

> 如果您没有指定确切的版本，Volta 会选择与您的请求相匹配的适当版本。

```shell
$ volta install node@14
```

> `latest`您也可以安装最新版本。此外，如果您完全省略版本，Volta 将选择并安装最新的 LTS 版本。

```shell
$ volta install node@latest
# Node@LTS
$ volta install node
```

> 当您运行任何这些命令时，由 Volta 在 PATH 环境（或 Windows 上的 Path）中提供的节点可执行文件默认自动运行所选版本的节点。 同样，您可以使用`volta install npm`和`volta install yarn`分别选择 npm 和 Yarn 包管理器的版本。这些工具使用所选节点的默认版本运行。

#### 节点引擎固定

> `volta pin`您可以使用命令来选择项目的 Node 引擎和包管理器的版本。

```shell
$ volta pin node@14.17
$ volta pin npm@6.14
```

将Volta保存到`package.json`:

```json
"volta":  {  
	"node":  "14.17.3",  
	"npm":  "6.14.13"  
}
```

> 这样，使用 Volta 进行项目开发的每个人都将自动获得与json设置的相同版本。

#### 使用项目工具

> node和包管理器可执行文件不是工具链中唯一的智能工具。工具链中的包二进制文件也可以识别当前目录并尊重当前项目结构。

> 例如，安装 Typescript 包会将编译器可执行文件 ( `tsc`) 添加到工具链中。 终端

```shell
npm install --global typescript
```

> 根据您参与的项目，此可执行文件将切换到您项目中选择的 TypeScript 版本。

```shell
cd /path/to/project-using-typescript-3.9.4
tsc --version # 3.9.4

cd /path/to/project-using-typescript-4.4.5
tsc --version # 4.4.5
```

如您所见，不仅 Node 和 npm / Yarn 等包管理器，而且通过它们安装的包二进制文件都受到 Volta 的监控。因此，它会自动切换每个项目的版本。

#### 安全便利

> Volta 的工具链会跟踪您的位置。因此，您使用的工具将始终优先考虑您正在处理的项目的设置。这意味着您在切换项目时不必担心更改已安装软件的状态。 此外，每次运行工具时，Volta 都会覆盖跟踪，使 npm 或 Yarn 脚本永远不会知道工具链的内容。 结合这两个特性，Volta 解决了全局封装的问题。换句话说，Volta 提供了全局包安装的便利，但没有危险。 例如，`npm i -g typescript`您可以安全地安装 TypeScript，`tsc`并享受直接从控制台调用它的便利。

### 快速设置和切换 Node 引擎

> 您可以获取和使用特定版本的节点。

```shell
volta install node@14
```

> 您会立即注意到该工具的响应能力。您的开发时间很宝贵！JavaScript 开发人员应该得到一个快速的工具。🙂

### 协作者的可复制环境

> Volta 允许您使用单个命令选择项目的节点引擎和包管理器。

```shell
~~路径/到/你的/项目~~
volta pin node@12
```

> Volta 将 Node 引擎的确切版本存储在 package.json 中，因此您可以将您的选择提交给 git。从那时起，每次您在项目目录中运行 Node 时，Volta 都会自动切换到与您选择相同版本的 Node 。同样，您的合作者也可以通过在他们各自的开发机器上安装 Volta 来做同样的事情。

这就是Volta的全部意义所在。这是每个人都在使用Volta的条件，但是创建环境的人可以`volta pin`通过命令修复版本，其他成员可以不假思索地执行它`npm install`。  能省去检查版本的麻烦。

### 重新安装？

> Volta 允许您将喜欢的软件包二进制文件安装为命令行工具，而不必担心会破坏您的开发项目。更好的是，这些工具在安装期间固定到特定的 Node 引擎，除非您明确指示它们，否则不会更改。

```shell
$ npm install -g surge
$ surge -h
```

即使使用此全局安装，也会为每个项目记住版本，因此您不必担心版本。

### 💡Volta 命令

`volta`命令行参考：https://docs.volta.sh/reference/

#### 常用的命令

##### `volta install`

`volta install`设置工具的默认版本。如果未缓存本地指定的版本，请从该工具中获取它。

 如何使用`volta install [FLAGS] <tool[@version]>`。 上面说明了安装时指定版本的方法，但总结如下。

```shell
# 安装指定版本的node
$ volta install node@14.17.3  

# 安装特定版本中的稳定的node版本
$ volta install node@14  

# 安装LTS版本的node 
$ volta install  node  

# 安装最新版本的node
$ volta install node@latest
```

##### `volta pin`

`volta pin package.json`该命令更新项目文件以使用所选版本的工具。

此命令只能用于节点和包管理器（npm / Yarn）。

使用方法是`volta pin [FLAGS] <tool[@version]>`。

```shell
# node版本固定
$ volta pin node@14.17

# npm版本固定
$ volta pin npm@6.14 
# or volta pin yarn@1.19
```

在项目目录中执行上述`volta pin`命令时，`package.json`将写入以下设置。

```json
{
  ...,
+ "volta": {
+   "node": "14.17.3",
+   "npm": "6.14.13" //or "yarn": "1.19.2"
+ }
}
```

通过与您的团队共享此`package.json`内容，例如在 GitHub 上，每个人都可以使用相同版本的 Node 或 npm。

例如，假设您在`package.json`一个项目中运行了上述设置。如果 npm 的版本缓存在 本地机器上，将显示。 如果它没有缓存在本地机器上，它将从安装开始，并在安装完成时显示。

```bash
npm -v

6.14.13
```

这样，如果你本地有那个版本，它会自动切换到那个版本，否则它会从版本安装开始。

这很方便，而且`npm install`即使你运行它而不用担心版本，版本也会自动对齐，所以`package-lock.json`不会有任何差异。（npm 6系和7系`package-lock.json`的内容很不一样。）

##### `volta list`

`volta list`该命令检查并显示包含已安装 Node 运行时、包管理器和二进制文件的包。

如何使用`volta list [FLAGS] [OPTIONS] [tool]`。

`volta list`该命令的用法总结如下。

```shell
# 使用方法
volta list [FLAGS] [OPTIONS] [tool]
# Flags
-c, --current # 显示当前活动工具
              # 此标志为缺省设置
-d, --default # 显示默认工具
    --verbose # 启用高级诊断
    --quiet   # 防止不必要的显示
-h, --help    # 显示帮助信息

# OPTIONS
--format <format>   # 指定输出格式
                    # 有效值为`human`or`plain`
                    # 默认值为`human`，否则为`plain`
                    
# ARGS
<tool>  # 指定要列出的工具（node，npm，yarn或其他二进制文件）
        # 指定all以显示所有内容
```

`volta list`您可以查看该项目中使用的工具的版本。

`volta list all`现在您可以看到 Volta 管理的工具列表。

### Volta命令速查备份

`volta`命令行参考：https://docs.volta.sh/reference/

```bash
# 将工具离线缓存到本地
volta fetch
# 下载一个工具例如 volta install node@14(自动下载稳定版本)
# 切换node成默认版本是使用此命令
volta install
# 卸载一个工具，指定详细名称如node/npm/cnpm/yarn
volta uninstall
# 固定项目的运行时或包管理器的版本固定到json中
volta pin
# 查看当前使用工具的版本,后面加上工具名称如node/npm/cnpm/yarn都可以
volta list
# 命令补全
volta completions
# 查看volta的工具安装目录
volta which
# 为当前用户/shell 启用 volta
volta setup
# 运行带有自定义Node、npm、pnpm和/或Yarn版本的命令
volta run
# 帮助信息
volta help
```

## nodemon：Node热启动命令行工具

npm：[nodemon：Node热启动命令行工具](https://www.npmjs.com/package/nodemon)

nodemon开发基于Node.js的应用程序，是一个命令行工具，它可以监测到我们当前执行文件的保存，自动重新运行命令，可以提高我们日常开发效率。

## Node版本对应的node-sass版本

| NodeJS版本 | 对应的node-sass版本 | Node Module |
|:--------:|:--------------:|:-----------:|
| Node 16  | 6.0+           | 93          |
| Node 15  | 5.0+           | 88          |
| Node 14  | 4.14+          | 83          |
| Node 13  | 4.13+,<5.0     | 79          |
| Node 12  | 4.12+          | 72          |
| Node 11  | 4.10+,<5.0     | 67          |
| Node 10  | 4.9+,<6.0      | 64          |
| Node 8   | 4.5.3+,<5.0    | 57          |
| Node <8  | <5.0           | <57         |
