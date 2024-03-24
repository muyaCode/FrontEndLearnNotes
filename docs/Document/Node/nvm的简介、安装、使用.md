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

> **1. nvm -v //查看nvm版本**
>
> - nvm --version ：显示 nvm 版本
> **2. nvm list //显示版本列表**
>
> - nvm list ：显示已安装的版本（同 nvm list installed
> - nvm list installed：显示已安装的版本
> - nvm list available：显示所有可以下载的版本
> **3. nvm install //安装指定版本node.js**
>
> - nvm install 14.5.0：安装 14.5.0 版本的 node.js
> - nvm install latest：安装最新版本
> **4. nvm use //使用指定版本node**
>
> - nvm use 14.5.0： 切换到 14.5.0 版本的 node.js
> - --lts // 自动切换到长期支持版本
> - --lts=[LTS name] // 自动切换到指定名称的node长期支持版本
> **5. nvm uninstall [version] //卸载指定版本 node**
>
> - nvm uninstall 14.5.0：卸载到 14.5.0 版本的 node.js
> - nvm uninstall --lts // 卸载长期支持版本的node
> - nvm uninstall --lts=[LTS name] // 卸载一个指定名称的长期支持版本的node
> **6. nvm --help** **//****显示命令行帮助信息**

[ ps：在运行nvm install 的时候，有可能会出现无权限安装的问题，请 **以管理员身份** 运行 **cmd** ]

## 4. 其他命令

> - nvm deactivate // 取消当前nvm命令行效果
> **1. nvm** **查看node版本**
>
> - nvm current // 查看当前使用的node版本
> - nvm ls // 查看所有本地可用的node版本
> - nvm ls [version] // 参看指定版本
> - nvm ls-remote // 查看所有可用远程版本
> - --lts // 查看所有长期支持版本
> - nvm ls-remote [version] // 参看所有node的指定远程版本
> - --lts // 查看所有node长期支持版本
> - --lts=[LTS name] // 仅查看指定名称的长期支持版本
> **2. nvm** **版本别名**
>
> - nvm alias [pattern] // 显示所有以[pattern]开头的版本别名
> - nvm alias [name] [version] // 给版本[version]设置一个别名
> - nvm unalias [name] // 删除[name]的版本别名
> **3. nvm和npm**
>
> - nvm **install**-latest-npm // 在当前node版本中，将npm升级到最新版
> - nvm **reinstall**-packages [version] // 在全局重新安装npm，从[version]版本到当前版本
> **4. npm which显示安装路径**
>
> npm **which** [current | [version]] //显示已安装node的安装路径。
> **5. nvm缓存**
>
> - nvm **cache** dir // 显示nvm的缓存目录
> - nvm **cache** clear // 清楚nvm的缓存目录
> **6. nvm运行node**
>
> - nvm **exec** [--silent] [version] [command] **// 在[version]运行命令[command]**
> - `**nvm exec 4.8.3 node app.js**` //Run `node app.js` with the PATH pointing to node 4.8.3
> - nvm **run** [--silent] [version] [[args]] **// 在[version]以参数[args]运行node** **--**
> - `**nvm run 6.10.3 app.js**` //Run app.js using node 6.10.3
> **7. 设置镜像**
>
> - `nvm node_mirror [url]` ：设置node镜像。默认是<https://nodejs.org/dist/。如果不写url，则使用默认url。设置后可至安装目录settings.txt>文件查看，也可直接在该文件操作。
> - `nvm npm_mirror [url]` ：设置npm镜像。<https://github.com/npm/cli/archive/。如果不写url，则使用默认url。设置后可至安装目录settings.txt>文件查看，也可直接在该文件操作。
> **8. 版本管理**
>
> - `nvm on` ：开启node.js版本管理。
> - `nvm off` ：关闭node.js版本管理。

## 四、nvm的一些命令

```bash
nvm命令行操作命令
1,nvm nvm list 是查找本电脑上所有的node版本

- nvm list 查看已经安装的版本
- nvm list installed 查看已经安装的版本
- nvm list available 查看网络可以安装的版本

2,nvm install 安装最新版本nvm

3,nvm use [version] ## 切换使用指定的版本node

4,nvm ls 列出所有版本

5,nvm current显示当前版本

6,nvm alias [name] [version] ## 给不同的版本号添加别名

7,nvm unalias [name] ## 删除已定义的别名

8,nvm reinstall-packages [version] ## 在当前版本node环境下，重新全局安装指定版本号的npm包

9,nvm on 打开nodejs控制

10,nvm off 关闭nodejs控制

11,nvm proxy 查看设置与代理

12,nvm node_mirror [url] 设置或者查看setting.txt中的node_mirror，如果不设置的默认是 https://nodejs.org/dist/
　　nvm npm_mirror [url] 设置或者查看setting.txt中的npm_mirror,如果不设置的话默认的是： https://github.com/npm/npm/archive/.

13,nvm uninstall [version] 卸载制定的版本

14,nvm use [version] [arch] 切换制定的node版本和位数

15,nvm root [path] 设置和查看root路径

16,nvm version 查看当前的版本
```
