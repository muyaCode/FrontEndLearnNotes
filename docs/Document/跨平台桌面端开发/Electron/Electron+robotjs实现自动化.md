# Electron+robotjs 实现自动化

参考：[electron+robotjs 安装出错问题解决日志\_electron 安装 robotjs_QIHU.ZY 的博客-CSDN 博客](https://blog.csdn.net/jncinets/article/details/123822486)

robotjs 官网编译方案：<http://robotjs.io/docs/electron>

Electron 编译元素 Node 模块方案：<https://www.electronjs.org/zh/docs/latest/tutorial/using-native-node-modules>

## 1.安装 robotjs

在已有的 electron 项目中添加 robotjs 并使用

```bash
npm install robotjs --save
或
yarn add robotjs
或
pnpm install robotjs --save
```

```js
// js中引入使用
const robot = require("robotjs");
```

## 2.引用 robotjs 后运行时报错

![运行时报错](.\img\运行时报错.jpg)

```bash
start electron app...
X [ERROR] Could not resolve "./build/Release/robotjs.node"

    node_modules/robotjs/index.js:1:22:
      1 │ var robotjs = require('./build/Release/robotjs.node');
        ╵                       ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

19:32:32 [vite] error while updating dependencies:
Error: Build failed with 1 error:
node_modules/robotjs/index.js:1:22: ERROR: Could not resolve "./build/Release/robotjs.node"
    at failureErrorWithLog (D:\Code\[MyProject]\[Electron]\electron-recruitment_assistant\node_modules\esbuild\lib\main.js:1604:15)
    at D:\Code\[MyProject]\[Electron]\electron-recruitment_assistant\node_modules\esbuild\lib\main.js:1056:28
    at runOnEndCallbacks (D:\Code\[MyProject]\[Electron]\electron-recruitment_assistant\node_modules\esbuild\lib\main.js:1476:61)
    at buildResponseToResult (D:\Code\[MyProject]\[Electron]\electron-recruitment_assistant\node_modules\esbuild\lib\main.js:1054:7)
    at D:\Code\[MyProject]\[Electron]\electron-recruitment_assistant\node_modules\esbuild\lib\main.js:1166:14
    at responseCallbacks.<computed> (D:\Code\[MyProject]\[Electron]\electron-recruitment_assistant\node_modules\esbuild\lib\main.js:701:9)
    at handleIncomingPacket (D:\Code\[MyProject]\[Electron]\electron-recruitment_assistant\node_modules\esbuild\lib\main.js:756:9)
    at Socket.readFromStdout (D:\Code\[MyProject]\[Electron]\electron-recruitment_assistant\node_modules\esbuild\lib\main.js:677:7)
    at Socket.emit (node:events:513:28)
    at addChunk (node:internal/streams/readable:324:12)
```

### 报错原因

robotjs 使用的 Node 环境与当前 Node 版本不一致，需要重新编译 robotjs

### 解决方案

**根据官网文档方案**：<http://robotjs.io/docs/electron>

注意：找到 electron 的版本和对应的 Node 版本，这里的 node 版本可不是你在命令行中查到的版本；

如果没安装 node-gyp 等编译工具，需要先安装

```bash
# window系统C和C++打包工具
npm install -g --production windows-build-tools
yarn global add windows-build-tools

# node包编译工具
npm install -g node-gyp
```

#### 安装 electron-rebuild 重新编译项目中使用的 Node 版本

#### 1.先安装：electron-rebuild

注意：electron-rebuild 必须安装到 dependencies 里

```bash
npm i electron-rebuild --dev
或
yarn add electron-rebuild -D
或
pnpm i electron-rebuild --dev
```

依赖包的命令目录

```bash
./node_modules/.bin/electron-rebuild
```

#### 安装原生模块文档

关于 gyp 与 node-gyp 与 node-pre-gyp 可以看这篇文章：<https://zhuanlan.zhihu.com/p/330468774>

**官网安装原生模块文档**：[Node 原生模块 | Electron (electronjs.org)](https://www.electronjs.org/zh/docs/latest/tutorial/using-native-node-modules)

#### 2.进入 robotjs 目录，直接进入模块文件夹

```bash
cd ./node_modules/robotjs
```

#### 3.目录中执行执行命令

版本说明

```bash
node-gyp rebuild --runtime=electron --disturl=https://atom.io/download/atom-shell --target=<你的electron版本> --abi=<对应abi版本>
```

示例：项目中查询 abi 版本：`npx electron --abi`

```bash
node-gyp rebuild --runtime=electron --target=21.4.1 --disturl=https://atom.io/download/atom-shell --abi=109
```

注意：

- --target：是你当前的 electron 版本
- --abi：当前 electron 中`node版本`对应的`node_abi`号：[找 abi 版本](https://github.com/mapbox/node-pre-gyp/blob/master/lib/util/abi_crosswalk.json)
  - 1.或者在这里查询-`node版本`对应的`node_abi`号：[v21 (yuque.com)](https://www.yuque.com/u34495/mivcfg/by432vfs60nuuoy7)
  - 2.或者使用命令：打开 全局`electron --abi` 或 局部 `npx electron --abi`

#### 编译成功后仍然遇到版本不匹配的问题

![编译成功后仍然遇到版本不匹配的问题](.\img\编译成功后仍然遇到版本不匹配的问题.jpg)

其实报错信息中已经提示了 需要哪个版本，重新编译对应版本的 robotjs 就行了

其他还不能解决的问题：[为电子重建机器人 J ·问题 #675 ·Octalmage/robotjs (github.com)](https://github.com/octalmage/robotjs/issues/675)

尝试运行下面命令来修复错误：

```bash
electron-rebuild -f -w robotjs
```

#### 安装 robotjs 引入使用后报错

报错信息

```bash
App threw an error during load
Error: A dynamic link library (DLL) initialization routine failed.
\\?\D:\vue\lianji\node_modules\robotjs\build\Release\robotjs.node
    at process.module.(anonymous function) [as dlopen] (ELECTRON_ASAR.js:166:20)
    at Object.Module._extensions..node (internal/modules/cjs/loader.js:740:18)
    at Object.module.(anonymous function) [as .node] (ELECTRON_ASAR.js:166:20)
    at Module.load (internal/modules/cjs/loader.js:620:32)
    at tryModuleLoad (internal/modules/cjs/loader.js:559:12)
    at Function.Module._load (internal/modules/cjs/loader.js:551:3)
    at Module.require (internal/modules/cjs/loader.js:658:17)
    at require (internal/modules/cjs/helpers.js:20:18)
    at Object.<anonymous> (D:\vue\lianji\node_modules\robotjs\index.js:1:170)
    at Object.<anonymous> (D:\vue\lianji\node_modules\robotjs\index.js:38:3)
```

#### 在项目根目录中执行

##### 1.直接执行编译命令

```bash
npm rebuild --runtime=electron --target=21.1.1 --disturl=https://atom.io/download/atom-shell --abi=102
```

##### 2.在 package.json 中设置编译命令

Node 版本使用的是：17.1.0

```json
"scripts": {
    "rebuild": "npm rebuild --runtime=electron --target=21.1.1 --disturl=https://atom.io/download/atom-shell --abi=102"
  },
```

## 3.使用命令创建的 electron 项目快速开发安装 robotjs 的错误

```bash
npm create @quick-start/electron
```

选择使用的是 vue 的 js 模板

### 原因

背景：使用 electron-builder 和 @journeyapps/sqlcipher 的项目

安装 robotjs 时，会执行：electron-builder install-app-deps

一般 electron-builder 的项目下完包的最后，会调用 electron-builder install-app-deps 命令重新构建本地依赖

### 然后报错

```bash
electron-builder install-app-deps
  • electron-builder  version=23.6.0
  • loaded configuration  file=D:\Code\[MyProject]\[Electron]\electron-recruitment_assistant\electron-builder.yml
  • rebuilding native dependencies  dependencies=robotjs@0.6.0 platform=win32 arch=x64
  • install prebuilt binary  name=robotjs version=0.6.0 platform=win32 arch=x64 napi=
  • build native dependency from sources  name=robotjs
                                          version=0.6.0
                                          platform=win32
                                          arch=x64
                                          napi=
                                          reason=prebuild-install failed with error (run with env DEBUG=electron-builder to get more information)
                                          error=D:\Code\[MyProject]\[Electron]\electron-recruitment_assistant\node_modules\node-abi\index.js:36
      throw new Error('Could not detect abi for version ' + target + ' and runtime ' + runtime + '.  Updating "node-abi" might help solve this issue if it is a new release of ' + runtime)
      ^

    Error: Could not detect abi for version 23.0.0 and runtime electron.  Updating "node-abi" might help solve this issue if it is a new release of electron
        at getAbi (D:\Code\[MyProject]\[Electron]\electron-recruitment_assistant\node_modules\node-abi\index.js:36:9)
        at module.exports (D:\Code\[MyProject]\[Electron]\electron-recruitment_assistant\node_modules\prebuild-install\rc.js:73:57)
        at Object.<anonymous> (D:\Code\[MyProject]\[Electron]\electron-recruitment_assistant\node_modules\prebuild-install\bin.js:9:25)
        at Module._compile (node:internal/modules/cjs/loader:1159:14)
        at Module._extensions..js (node:internal/modules/cjs/loader:1213:10)
        at Module.load (node:internal/modules/cjs/loader:1037:32)
        at Module._load (node:internal/modules/cjs/loader:878:12)
        at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:81:12)
        at node:internal/main/run_main_module:23:47

    Node.js v18.12.1

  • rebuilding native dependency  name=robotjs version=0.6.0
  ⨯ cannot execute  cause=exit status 1
yarn run v1.22.19
$ prebuild-install || node-gyp rebuild

    D:\Code\[MyProject]\[Electron]\electron-recruitment_assistant\node_modules\robotjs>if not defined npm_config_node_gyp (node "C:\Program Files\nodejs\node_modules\npm\bin\node-gyp-bin\\..\..\node_modules\node-gyp\bin\node-gyp.js" rebuild )  else (node "" rebuild )
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.

warning ..\..\package.json: No license field
    D:\Code\[MyProject]\[Electron]\electron-recruitment_assistant\node_modules\node-abi\index.js:36
      throw new Error('Could not detect abi for version ' + target + ' and runtime ' + runtime + '.  Updating "node-abi" might help solve this issue if it is a new release of ' + runtime)
      ^

    Error: Could not detect abi for version 23.0.0 and runtime electron.  Updating "node-abi" might help solve this issue if it is a new release of electron
        at getAbi (D:\Code\[MyProject]\[Electron]\electron-recruitment_assistant\node_modules\node-abi\index.js:36:9)
        at module.exports (D:\Code\[MyProject]\[Electron]\electron-recruitment_assistant\node_modules\prebuild-install\rc.js:73:57)
        at Object.<anonymous> (D:\Code\[MyProject]\[Electron]\electron-recruitment_assistant\node_modules\prebuild-install\bin.js:9:25)
        at Module._compile (node:internal/modules/cjs/loader:1159:14)
        at Module._extensions..js (node:internal/modules/cjs/loader:1213:10)
        at Module.load (node:internal/modules/cjs/loader:1037:32)
        at Module._load (node:internal/modules/cjs/loader:878:12)
        at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:81:12)
        at node:internal/main/run_main_module:23:47

    Node.js v18.12.1
    gyp info it worked if it ends with ok
    gyp info using node-gyp@9.1.0
    gyp info using node@18.12.1 | win32 | x64
    gyp info find Python using Python version 3.10.10 found at "C:\Users\userHu\AppData\Local\Microsoft\WindowsApps\PythonSoftwareFoundation.Python.3.10_qbz5n2kfra8p0\python.exe"
    gyp http GET https://registry.npmmirror.com/dist/v23.0.0/node-v23.0.0-headers.tar.gz
    gyp http 404 https://registry.npmmirror.com/dist/v23.0.0/node-v23.0.0-headers.tar.gz
    gyp WARN install got an error, rolling back install
    gyp ERR! configure error
    gyp ERR! stack Error: 404 response downloading https://registry.npmmirror.com/dist/v23.0.0/node-v23.0.0-headers.tar.gz
    gyp ERR! stack     at go (C:\Users\userHu\AppData\Roaming\nvm\v18.12.1\node_modules\npm\node_modules\node-gyp\lib\install.js:153:17)
    gyp ERR! stack     at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
    gyp ERR! stack     at async install (C:\Users\userHu\AppData\Roaming\nvm\v18.12.1\node_modules\npm\node_modules\node-gyp\lib\install.js:62:18)
    gyp ERR! System Windows_NT 10.0.22621
    gyp ERR! command "C:\\Program Files\\nodejs\\node.exe" "C:\\Program Files\\nodejs\\node_modules\\npm\\node_modules\\node-gyp\\bin\\node-gyp.js" "rebuild"
    gyp ERR! cwd D:\Code\[MyProject]\[Electron]\electron-recruitment_assistant\node_modules\robotjs
    gyp ERR! node -v v18.12.1
    gyp ERR! node-gyp -v v9.1.0
    gyp ERR! not ok
error Command failed with exit code 1.

                    command='C:\Program Files\nodejs\node.exe' 'C:\Users\userHu\AppData\Roaming\nvm\v18.12.1\node_modules\yarn\bin\yarn.js' run install
                    workingDir=D:\Code\[MyProject]\[Electron]\electron-recruitment_assistant\node_modules\robotjs
error Command failed with exit code 1.
info Visit https://yarnpkg.com/en/docs/cli/add for documentation about this command.
```

[当我为 javaScript 项目安装 robotjs 时出错（操作系统自动化） ·问题 #642 ·Octalmage/robotjs (github.com)](https://github.com/octalmage/robotjs/issues/642)

前面的都不行的话，看：Electron 编译元素 Node 模块方案：<https://www.electronjs.org/zh/docs/latest/tutorial/using-native-node-modules>

文档页面内搜索：`--dist-url=https://electronjs.org/headers` 替换 `--disturl=https://atom.io/download/atom-shell` ，因为 atom-shell 这个链接停止运营
