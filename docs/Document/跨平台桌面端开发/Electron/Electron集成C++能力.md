# Electron集成C++能力

官网文档：[Node 原生模块 | Electron (electronjs.org)](https://www.electronjs.org/zh/docs/latest/tutorial/using-native-node-modules)

## Node C++ Addons(扩展)

- C++编写的动态链接共享对象，能被Nodejs require使用

- `.node`文件 本质是动态链接库(Windows的`*.dll`，Mac的`dylib`，Linux的`*.so`）

- 编写C++扩展主流2种写法

  - 一、NAN(Native Abstractions for Node.js):一次编写、到处编译

    - ```bash
      NAN METHOD(Echo){}  ==> 
      Handle<Value> Echo(const Arguments& args); // 0.10.xvoid Echo(FunctionCallbackInfo<Value>& args);// 6.x
      ```

  - 二、N-API(Node.js一部分，独立于runtime v8)：同一ABI、无需重新编译

    - 本身是基于C的API
    - C++封装node-addon-api

### 什么时候用C++扩展

- 使用C++现成库
- 性能提升，密集型计算场景
- 代码保护，核心逻辑

### require('*.node')背后是怎么加载动态库的?

在 Electron 中，Node.js 的模块系统被广泛使用来加载和访问本地模块和原生模块。而 `require('*.node)` 语句则是用于加载 Node.js 原生模块，其中 `.node` 文件是指编译后的二进制 Node.js 模块。下面简单介绍一下在 Electron 中加载动态库的过程。

在 Electron 中，可以通过 Node.js 的 `Module._load()` 方法来加载原生模块。当 `require('*.node)` 语句执行时，实际上是通过调用 `Module._load()` 方法来加载对应的 `.node` 文件。

具体地，`Module._load()` 方法首先会根据传入的模块名，解析出对应的 `.node` 文件路径。然后，它会通过 C++ 的 `dlopen()` 函数，将编译后的 .node 文件加载到内存中，并返回一个动态库的句柄。随后，Node.js 自动与该动态库建立起了链接，并将其作为一个 Node.js 模块来使用。

需要注意的是，由于 Node.js 和 Electron 的特殊性，加载原生模块时可能需要处理一些平台相关的问题。例如，在 Windows 平台上，需要使用 `LoadLibrary()` 替代 `dlopen()` 函数来加载 DLL 文件，而在 macOS 上，需要使用 Objective C 等特殊工具来编写原生模块。

#### require过程

![require('.node')背后是怎么加载动态库的](.\img\require(.node)背后是怎么加载动态库的.jpg)

1.lib/internal/modules/cjs/loaderjs

```js
```

2.src/node_process_methods.cc

```bash

```

3.deps/uv/src/win/dL.c

```c
```

4.待定

## Node扩展

- 给app增加指纹
- 做一个分享到微信的功能
  - 将控制码写入剪切板
  - 唤起微信PC面板

### 环境配置

安装相关依赖

```bash
# Windows必备，管理员身份运行
npm install--global--production windows-build-tools
# 编译工具
npm install -g node-gyp
```

### 编写N-API(C++)

1.初始化 项目

```bash
# 初始化Node项目
npm init -y
# 安装模块
npm i bindings node-addon-api --save-dev
# package.json 增加
"gypfile": true
```

2.编写 `binding.gyp` 文件

```json
{
  "targets":[ 
    {
      "target_name":"fringerprint",
      "cflags!":[ "-fno-exceptions" ],
      "cflags_cc!":[ "-fno-exceptions" ],
      "sources":[ "fringerprint.cc" ],
      "include_dirs":[
        "<!@(node -p \"require('node-addon-api').include\")"
      ],
      'defines': [ 'NAPI_DISABLE_CPP_EXCEPTIONS' ],
    }
  ]
}
```

3.实现C++方法，编写fringerprint.cc文件

4.初始化方法

5.定义模块

6.编译全部模块

```bash
npx node-gyp rebuild
```

7.导入编译好的模块

## Electron集成 dll（动态链接库）

### 使用的库

它可以让我们不编写任何的C++代码情况下，创建于本地dll库的绑定，同时它还负责了JavaScript和C的类型转换，以下是说明和安装

- node-ffi（node版本 < 10，Electron < 6）

- node-ffi-napi（node版本 ≥ 10，Electron 大于等于6）：[node-ffi-napi/node-ffi-napi: A foreign function interface (FFI) for Node.js, N-API style (github.com)](https://github.com/node-ffi-napi/node-ffi-napi)

- ```bash
  npm install ffi
  # 或
  npm install ffi-napi
  ```

### 基本使用

GitHub：[node-ffi-napi/node-ffi-napi: A foreign function interface (FFI) for Node.js, N-API style (github.com)](https://github.com/node-ffi-napi/node-ffi-napi)

教程文档：[Node FFI Tutorial · node-ffi/node-ffi Wiki (github.com)](https://github.com/node-ffi/node-ffi/wiki/Node-FFI-Tutorial)

```js
const ffi = require('ffi-napi');

const libm = ffi.Library('libm', {
    'ceil': [ 'double', [ 'double' ] ]
});
libm.ceil(1.5); // 2
```

### 集成 dll步骤

1.创建一个 Node.js 模块，该模块包含访问 DLL 文件所需的所有代码。可以使用 Node.js 的 `node-ffi` 或 `node-ffi-napi` 模块来加载并调用 DLL 中的函数。

2.将 DLL 文件放置到 Electron 应用程序的某个目录中，例如在应用程序根目录下创建一个名为 `dlls` 的文件夹，并将 DLL 文件放置在其中。

- 如果您在Windows系统上使用DLL，还需要为 DLL 文件设置搜索路径，以便于 Electron 应用程序能够正确地找到 DLL 文件。
- Windows系统下，请确保将DLL文件复制到您的应用程序运行时目录下，通常情况下这是您的应用程序根目录下的`“/resources/app/”`文件夹。

3.在 Electron 主进程或渲染进程的 JavaScript 代码中，使用 Node.js 中的 `path` 模块来获取 DLL 文件的绝对路径。可以使用下列示例代码获取 DLL 文件的绝对路径：

```js
const path = require('path');
const dllPath = path.join(__dirname, '../../dlls/myDll.dll');
```

**4.在 JavaScript 代码中引入 Node.js 模块，并使用该模块中的函数来调用 DLL 中的函数。如下是一个使用 `node-ffi-napi` 模块调用 DLL 中函数的示例代码**：

```js
const ffi = require('ffi-napi');

const myDll = new ffi.Library('dllPath', {
  'myFunctionName': ['int', ['string', 'int']]
});

const result = myDll.myFunctionName('Arg1', 123);
module.exports = { myDll };
```

可以在其他进程中导入使用 `myDll`

**5.在您的JavaScript代码中使用Node.js的 `child_process` API调用DLL，相应的可执行文件（.exe）。您需要使用 `spawn` 或 `exec` 方法来调用DLL。**

```js
const { spawn } = require('child_process');

// 通过 spawn() 函数调用 DLL 文件
const child = spawn('../dlls/myDll.exe', ['Arg1', 321]);

// 监听子进程的 stdout 和 stderr
child.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

child.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});
```

在上述代码中，`spawn()` 函数将运行 `myDll.exe` 可执行文件，并传递 `Arg1` 和 `Arg2` 两个参数。`stdout` 和 `stderr` 事件分别监听子进程的输出和错误信息。

6.如果需要从子进程中获取返回值，可以在 DLL 文件中定义一个函数，并在 Node.js 中调用该函数来获取返回值。

```c
int myFunction(int arg1, int arg2) {
  // 执行相应的操作，并返回结果
  return result;
}
```

Node.js中

```js
const { exec } = require('child_process');

// 通过 exec() 函数调用 DLL 文件中的函数，并获取返回值
exec('../dlls/myDll.exe --my-function', (err, stdout, stderr) => {
  if (err) {
    console.error(`exec error: ${err}`);
    return;
  }
  const result = parseInt(stdout);
  console.log(`Result: ${result}`);
});
```

在上述代码中，`exec()` 函数将运行 `myDll.exe` 可执行文件，并传递 `--my-function` 参数。在 DLL 文件中，可以通过解析该参数来调用相应的函数，并输出函数返回值（可以使用 `printf()` 函数来输出）。

### 常见错误

- Dynamic Linking Error: Win32 error 126
  - dll路径没写对、arch没选对、dll引用有问题
- Dynamic Linking Error: Win32 error 127
  - 传参有问题、dll没有这个函数

### 如果是在Mac系统上，可以调用Applescript脚本

- AppleScript是苹果内置的脚本

- 可以调用其他程序、跟系统底层打交道

- 语法见文档：<https://developer.apple.com/library/archive/documentation/AppleScript/Conceptual/AppleScriptLangGuide/introduction/ASLR_intro.html>

- 使用库 `node-applescript` 集成到Electron中：<https://github.com/TooTallNate/node-applescript>

- 安装：`npm install applescript`

- ```js
  # 调取微信
  tell application "WeChat"
   activate
  end tell
  ```
