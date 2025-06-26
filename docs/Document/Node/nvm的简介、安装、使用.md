# nvm的简介、安装、使用

## 一、nvm是什么？

nvm是一个[node](https://so.csdn.net/so/search?q=node&spm=1001.2101.3001.7020)的版本管理工具，可以简单操作node版本的切换、安装、查看...等等，与npm不同的是，npm是依赖包的管理工具。

## 二、nvm的安装

### 1.windows包下载地址

百度网盘：<https://pan.baidu.com/s/1EUc-e2Ai-lXXQkjlB8jmlA>   提取码：vg9l

github下载地址：<https://github.com/coreybutler/nvm-windows/releases>

- nvm-noinstall.zip： 绿色免安装版本，但是使用之前需要配置
- nvm-setup.zip：安装版，下载之后点击安装，无需配置就可以使用

### 2.点击如下文件进行安装

#### （1）安装

![f264237810d48e283e54f7f37af142e](https://img-blog.csdnimg.cn/4f264237810d48e283e54f7f37af142e.png)

![33cd315d026041aa903c02c78b30828](https://img-blog.csdnimg.cn/33cd315d026041aa903c02c78b30828f.png)

（注意这里：默认安装到C盘，之后就不用配置环境变量了）

![2860d17bfce641c0b48e539a780c0e03](https://img-blog.csdnimg.cn/2860d17bfce641c0b48e539a780c0e03.png)

![0f69ee63bd8f4ba6b33dfaa44b0ab562](https://img-blog.csdnimg.cn/0f69ee63bd8f4ba6b33dfaa44b0ab562.png)

![8cc7c83b44194154afac3d60652575ef](https://img-blog.csdnimg.cn/8cc7c83b44194154afac3d60652575ef.png)

 之后finish就完成安装了。完成可以以下方式检测

![98d9b56fa2384770a8d465cdaa86b5aa](https://img-blog.csdnimg.cn/98d9b56fa2384770a8d465cdaa86b5aa.png)

⚪如果安装到D盘，则需要配置相对应的环境，如图：（输入相对应的文件位置）

![5153ed11090b4f4db700b6cacb029134](https://img-blog.csdnimg.cn/5153ed11090b4f4db700b6cacb029134.png)

![5083a0ac725d45c695d1af3403ab2950](https://img-blog.csdnimg.cn/5083a0ac725d45c695d1af3403ab2950.png)

#### （2）配置

找到nvm安装目录的文件位置：(默认位置)C:\Users\用户名\AppData\Roaming\nvm，点开`setting.txt`文件，配置

![f086b492f344d7cbe3a8a8c8c235154](https://img-blog.csdnimg.cn/7f086b492f344d7cbe3a8a8c8c235154.png)

![406cf50b3a4f496db02b854498030c5e](https://img-blog.csdnimg.cn/406cf50b3a4f496db02b854498030c5e.png)

然后在它后面输入以下代码：（这是配置镜像源）

```js
node_mirror: https://npm.taobao.org/mirrors/node/
npm_mirror: https://registry.npmmirror.com/mirrors/npm/
```

## 三、使用

1.先卸载之前的node.js

2.在刚刚的nvm文件位置打开cmd

3.输入以下代码查看nvm可安装的node版本

```bash
nvm ls                      // 看安装的所有node.js的版本

nvm list available          // 查显示可以安装的所有node.js的版本
```

4.安装所对应的版本。

```bash
nvm install 版本号 // 例如：nvm install 14.19.0
```

5.切换到安装的版本

```bash
nvm use 版本号           // 切换到使用指定的nodejs版本
```

6.检测是否切换完成，新开一个cmd

```bash
node -v
```

### 3. 常见命令

```bash
# 查看nvm版本
nvm -v
nvm --version

# 查看显示已安装的Node版本列表
nvm ls
nvm list
nvm list installed

# windows版本,列出全部可以安装的node版本
nvm ls available 
nvm list available
# Mac版本中,列出全部可以安装的node版本
nvm ls-remote

# 安装指定Node版本：20.10.11
nvm install 20.10.11
# 安装最新版本
nvm install latest

# 切换使用指定Node版本：20.10.11
nvm use 20.10.11
--lts # 自动切换到长期支持版本
--lts=[LTS name] # 自动切换到指定名称的node长期支持版本
# 切换制定的node版本和位数
nvm use [version] [arch]

# 设置和查看root路径
nvm root [path]

# 卸载指定Node版本
nvm uninstall [version]
# 卸载到 20.10.11 版本的Node
nvm uninstall 20.10.11
# 卸载长期支持版本的node
nvm uninstall --lts
# 卸载一个指定名称的长期支持版本的node
nvm uninstall --lts=[LTS name]

# 给不同的版本号添加别名
nvm alias <name> <version>
# 删除已定义的别名
nvm unalias <name>

# 在当前版本node环境下，重新全局安装指定版本号的npm包
nvm reinstall-packages <version>

# 打开nodejs控制
nvm on

# 关闭nodejs控制
nvm off

# 查看设置与代理
nvm proxy

# 设置或者查看setting.txt中的node_mirror，如果不设置的默认是 https://nodejs.org/dist/
nvm node_mirror [url]

# 设置或者查看setting.txt中的npm_mirror,如果不设置的话默认的是： https://github.com/npm/npm/archive/
nvm npm_mirror [url]

# 显示命令行帮助信息
nvm --help
```

[ ps：在运行nvm install 的时候，有可能会出现无权限安装的问题，请 **以管理员身份** 运行 **cmd** ]

### 4. 其他命令

```bash
# 取消当前nvm命令行效果
nvm deactivate

# 查看当前使用的node版本
nvm current
nvm ls # 查看所有本地可用的node版本
nvm ls [version] # 参看指定版本
nvm ls-remote # 查看所有可用远程版本
--lts # 查看所有长期支持版本
nvm ls-remote [version] # 参看所有node的指定远程版本
--lts # 查看所有node长期支持版本
--lts=[LTS name] # 仅查看指定名称的长期支持版本

nvm 版本别名

nvm alias [pattern] # 显示所有以[pattern]开头的版本别名
nvm alias [name] [version] # 给版本[version]设置一个别名
nvm unalias [name] # 删除[name]的版本别名

nvm和npm

nvm install -latest-npm # 在当前node版本中，将npm升级到最新版
nvm reinstall -packages [version] # 在全局重新安装npm，从[version]版本到当前版本


npm which显示安装路径

npm which [current | [version]] # 显示已安装node的安装路径。

nvm缓存

nvm cache dir # 显示nvm的缓存目录
nvm cache clear # 清楚nvm的缓存目录

nvm运行node

nvm exec [--silent] [version] [command] # 在[version]运行命令[command]
nvm exec 4.8.3 node app.js # Run `node app.js` with the PATH pointing to node 4.8.3
nvm run [--silent] [version] [[args]] # 在[version]以参数[args]运行node --

nvm run 6.10.3 app.js # Run app.js using node 6.10.3

设置镜像

nvm node_mirror [url] # 设置node镜像。默认是<https://nodejs.org/dist/。如果不写url，则使用默认url。设置后可至安装目录settings.txt>文件查看，也可直接在该文件操作。

nvm npm_mirror [url] # 设置npm镜像。<https://github.com/npm/cli/archive/。如果不写url，则使用默认url。设置后可至安装目录settings.txt>文件查看，也可直接在该文件操作。

版本管理

nvm on # 开启node.js版本管理。
nvm off # 关闭node.js版本管理。



# 显示node是运行在32位还是64位模式。指定32或64来覆盖默认体系结构。
nvm arch [32|64]
nvm install [arch] # 该可以是node.js版本或最新稳定版本latest。（可选[arch]）指定安装32位或64位版本（默认为系统arch）。设置[arch]为all以安装32和64位版本。在命令后面添加–insecure，可以绕过远端下载服务器的SSL验证。
nvm list [available] # 列出已经安装的node.js版本。可选的available，显示可下载版本的部分列表。这个命令可以简写为nvm ls [available]。
nvm on # 启用node.js版本管理。
nvm off # 禁用node.js版本管理(不卸载任何东西)
nvm proxy [url] # 设置用于下载的代理。留[url]空白，以查看当前的代理。设置[url]为none删除代理。
nvm node_mirror [url] # 设置node镜像，默认为https://nodejs.org/dist/.。可以设置为淘宝的镜像https://npm.taobao.org/mirrors/node/
nvm npm_mirror [url] # 设置npm镜像，默认为https://github.com/npm/npm/archive/。可以设置为淘宝的镜像https://npm.taobao.org/mirrors/npm/
nvm uninstall # 卸载指定版本的nodejs。
nvm use [version] [arch] # 切换到使用指定的nodejs版本。可以指定32/64位[arch]。
nvm use # 将继续使用所选版本，但根据提供的值切换到32/64位模式
nvm root [path] # 设置 nvm 存储node.js不同版本的目录 ,如果未设置，将使用当前目录。
nvm version # 显示当前运行的nvm版本，可以简写为nvm v
```

## 四、更新nvm

```bash
(
  cd "$NVM_DIR"
  git fetch --tags origin
  git checkout `git describe --abbrev=0 --tags --match "v[0-9]*" $(git rev-list --tags --max-count=1)`
) && \. "$NVM_DIR/nvm.sh"
```

# 其他Node 版本管理器

**五个 Node 版本管理器之间的比较** —— 理想情况下最新版 Node 可以无缝接入项目，但实际上我们往往需要锁定 Node 版本。

这个领域最出名的工具是 **NVM**，不过也许 N、FNM、Volta 甚至是 **pnpm** 会是更好的选择？

[5 个节点版本管理器比较 – 哪个适合你？](https://pavel-romanov.com/5-node-version-managers-compared-which-is-right-for-you)
