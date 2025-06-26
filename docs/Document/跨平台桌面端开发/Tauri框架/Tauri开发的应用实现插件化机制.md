# Tauri 开发的应用实现插件化机制

Tauri 是一个强大的多语言通用工具包，允许工程师构建各种应用程序。它使用 Rust 工具和 Webview 中呈现的 HTML 的组合来构建桌面应用程序。后端使用 Rust 与系统进行交互，如获取系统信息、系统通知、系统文件等。包装成 Tauri 插件后，会暴露出 JavaScript API 供前端使用，通过 Webview 进行消息传递来控制系统。

使用 tauri 开发应用，应用内部实现 API，可以供其他开发者调用 API 实现插件化机制，基于我的应用开发插件嵌入我的应用使用。有哪些实现思路？思路用代码怎么实现？

基于tauri实现的工具集合应用，支持插件安装：

- 源码：<https://github.com/feint123/dtools/tree/dev>
- 视频：<https://www.bilibili.com/video/BV13r4y157sg/>

## Tauri 实现思路以及如何用代码实现：

tauri 文档：[Tauri 插件 | Tauri Apps](https://tauri.app/zh-cn/v1/guides/features/plugin/)

**插件化机制**：为了实现插件化机制，可以考虑以下方法：

- **插件注册和加载**：在应用启动时，动态加载插件。插件可以是单独的 Rust 模块或者 JavaScript 文件。你可以在应用的配置中指定要加载的插件列表。
- **插件接口定义**：定义一个标准的插件接口，包括插件的生命周期方法（例如初始化、销毁、处理消息等）。插件必须实现这些接口方法。
- **插件通信**：使用 Webview 进行插件之间的通信。插件可以通过 Webview 发送消息给其他插件或应用本身。

**代码示例**：下面是一个简单的示例，展示如何创建一个 Tauri 插件并实现插件化机制：

```rust
// 创建一个插件
use tauri::{plugin::{Builder, TauriPlugin}, Runtime};

// 自定义插件命令处理函数
#[tauri::command]
fn initialize() {
    // 插件初始化逻辑
}

#[tauri::command]
fn do_something() {
    // 插件处理逻辑
}

pub fn init<R: Runtime>() -> TauriPlugin<R> {
    Builder::new("awesome")
        .invoke_handler(tauri::generate_handler![initialize, do_something])
        .build()
}

```

在你的应用中，你可以这样使用插件：

```rust
fn main() {
    tauri::Builder::default()
        .plugin(my_awesome_plugin::init())
        .run(tauri::generate_context!())
        .expect("failed to run app");
}

```

## 基于 Rust 的实现思路：

## 思路一：使用 Tauri 提供的插件系统，来实现 Tauri 的应用内部 API 和插件化机制。

这种思路的优点是，你可以利用 Tauri 已经封装好的插件构建器和调用处理器，来方便地定义和使用你的插件。

你的插件可以使用 Tauri 的内置 API，也可以自定义自己的命令和状态。你的插件还可以提供一个 JavaScript 包，来让其他开发者在 Web 端调用你的插件提供的功能。

这种思路的缺点是，你的插件需要遵循 Tauri 的插件规范，可能会受到一些限制或约束。你的插件也需要和 Tauri 的版本保持一致，否则可能会出现兼容性问题。

这种思路的代码示例大致如下：

```rust
// 这是你的应用内部 API 的插件定义
use tauri::{ plugin::{Builder, TauriPlugin}, Runtime, };

// 这是你的应用内部 API 的自定义命令
#[tauri::command]
// 这个命令可以让其他插件获取你的应用的信息
fn get_app_info() -> String {
  // 这里可以返回你的应用的名称、版本、描述等信息
  "My App Info".to_string()
}

#[tauri::command]
// 这个命令可以让其他插件执行你的应用的某个功能
fn do_something() {
  // 这里可以执行你的应用的某个功能，例如打开一个窗口、发送一个通知等
}

pub fn init<R: Runtime>() -> TauriPlugin<R> {
  Builder::new("my_app_api")
    .invoke_handler(tauri::generate_handler![get_app_info, do_something])
    .build()
}

// 这是你的应用的主函数，你需要将你的应用内部 API 的插件实例传递给应用程序的 plugin 方法
fn main() {
  tauri::Builder::default()
    .plugin(my_app_api::init())
    .run(tauri::generate_context!())
    .expect("failed to run app");
}

// 这是你的应用内部 API 的 JavaScript 包，你可以将它发布到 npm 上，让其他开发者在 Web 端调用你的应用内部 API
import { invoke } from '@tauri-apps/api'

export async function getAppInfo() {
  return invoke('plugin:my_app_api|get_app_info')
}

export async function doSomething() {
  return invoke('plugin:my_app_api|do_something')
}
```

基于你的应用内部 API 开发的插件的示例

```rust
// 这是一个基于你的应用内部 API 开发的插件的示例
use tauri::{ plugin::{Builder, TauriPlugin}, Runtime, };

// 这是你的插件的自定义命令
#[tauri::command]
// 这个命令可以调用你的应用内部 API 的 get_app_info 命令，获取你的应用的信息
fn get_my_app_info<R: Runtime>(_app: AppHandle<R>) -> String {
  // 这里可以使用 tauri::execute_promise 来异步调用你的应用内部 API 的命令
  tauri::execute_promise(
    _app,
    // the argument passed to the Rust command
    move || {
      // invoke your app api command here
      invoke("plugin:my_app_api|get_app_info")
    },
    // the callback on resolve
    |app, info| {
      // do something with the info here
    },
    // the callback on reject
    |app, error| {
      // handle the error here
    },
  );
}

#[tauri::command]
// 这个命令可以调用你的应用内部 API 的 do_something 命令，执行你的应用的某个功能
fn do_something_with_my_app<R: Runtime>(_app: AppHandle<R>) {
  // 这里可以使用 tauri::execute_promise 来异步调用你的应用内部 API 的命令
  tauri::execute_promise(
    _app,
    // the argument passed to the Rust command
    move || {
      // invoke your app api command here
      invoke("plugin:my_app_api|do_something")
    },
    // the callback on resolve
    |app, result| {
      // do something with the result here
    },
    // the callback on reject
    |app, error| {
      // handle the error here
    },
  );
}

pub fn init<R: Runtime>() -> TauriPlugin<R> {
  Builder::new("my_plugin")
    .invoke_handler(tauri::generate_handler![get_my_app_info, do_something_with_my_app])
    .build()
}

```

## 思路二：使用 Rust 的动态库机制，来实现你的应用内部 API 和插件化机制。

这种思路的优点是，你可以自由地定义和实现你的应用内部 API 和插件，不受 Tauri 的插件规范的限制或约束。

你的插件可以使用任何 Rust 的库或框架，也可以使用其他语言编写，只要能够编译成动态库。

你的插件也不需要和 Tauri 的版本保持一致，只要能够和你的应用内部 API 兼容。

这种思路的缺点是，你需要自己处理动态库的加载和调用，可能会遇到一些复杂或棘手的问题，例如平台差异、内存安全、错误处理等。你的插件也不能提供一个 JavaScript 包，让其他开发者在 Web 端调用你的插件提供的功能，而需要通过你的应用内部 API 来进行中转。

这种思路的代码示例大致如下：

```rust
// 这是你的应用内部 API 的动态库定义
use std::ffi::CString;
use std::os::raw::{c_char, c_int};

// 这是你的应用内部 API 的接口类型，你可以根据你的需要自定义
pub type AppInfo = *const c_char;
pub type AppResult = c_int;

// 这是你的应用内部 API 的接口函数，你可以根据你的需要自定义
#[no_mangle]
pub extern "C" fn get_app_info() -> AppInfo {
  // 这里可以返回你的应用的名称、版本、描述等信息
  let info = "My App Info".to_string();
  let c_info = CString::new(info).unwrap();
  c_info.into_raw()
}

#[no_mangle]
pub extern "C" fn do_something() -> AppResult {
  // 这里可以执行你的应用的某个功能，例如打开一个窗口、发送一个通知等
  // 这里可以返回你的应用的执行结果，例如成功或失败的状态码
  0
}

```

应用的主函数，你需要将你的应用内部 API 的动态库加载到你的应用中，然后将它传递给你的插件

```rust
// 这是你的应用的主函数，你需要将你的应用内部 API 的动态库加载到你的应用中，然后将它传递给你的插件
use libloading::{Library, Symbol};

fn main() {
    // 这里可以加载你的应用内部 API 的动态库，例如 libmy_app_api.so
    let app_api_lib = Library::new("libmy_app_api.so").unwrap();
    // 这里可以获取你的应用内部 API 的接口函数的符号，例如 get_app_info 和 do_something
    let get_app_info: Symbol<unsafe extern "C" fn() -> AppInfo> =
        unsafe { app_api_lib.get(b"get_app_info").unwrap() };
    let do_something: Symbol<unsafe extern "C" fn() -> AppResult> =
        unsafe { app_api_lib.get(b"do_something").unwrap() };
    // 这里可以调用你的应用内部 API 的接口函数，例如获取你的应用的信息、执行你的应用的某个功能等
    let app_info = unsafe { get_app_info() };
    let app_result = unsafe { do_something() };
    // 这里可以将你的应用内部 API 的接口函数的符号传递给你的插件，例如 my_plugin
    my_plugin::init(get_app_info, do_something);
}

```

基于你的应用内部 API 开发的插件的定义：

```rust
// 这是一个基于你的应用内部 API 开发的插件的定义
use std::ffi::CStr;
use std::os::raw::{c_char, c_int};

// 这是你的应用内部 API 的接口类型，你可以根据你的需要自定义
pub type AppInfo = *const c_char;
pub type AppResult = c_int;

// 这是你的插件的初始化函数，你可以根据你的需要自定义
pub fn init(
    get_app_info: unsafe extern "C" fn() -> AppInfo,
    do_something: unsafe extern "C" fn() -> AppResult,
) {
    // 这里可以调用你的应用内部 API 的接口函数，例如获取你的应用的信息、执行你的应用的某个功能等
    let app_info = unsafe { get_app_info() };
    let app_result = unsafe { do_something() };
    // 这里可以打印或处理你的应用内部 API 的返回值，例如转换成 Rust 的类型或字符串等
    let app_info_str = unsafe { CStr::from_ptr(app_info) }.to_str().unwrap();
    println!("App info: {}", app_info_str);
    println!("App result: {}", app_result);
}

```

## 基于前端 JS 代码的实现思路：

## **思路一**：使用 Tauri 提供的 invoke API，来实现你的应用内部 API 和插件化机制。

这种思路的优点是，你可以利用 Tauri 已经封装好的 invoke API，来方便地从 Web 端调用你的应用内部 API 或插件提供的命令。

你的应用内部 API 或插件可以使用 Tauri 的内置 API，也可以自定义自己的命令和状态。

你的应用内部 API 或插件还可以提供一个 JavaScript 包，来让其他开发者在 Web 端调用你的应用内部 API 或插件提供的功能。

这种思路的缺点是，你的应用内部 API 或插件需要遵循 Tauri 的插件规范，可能会受到一些限制或约束。你的应用内部 API 或插件也需要和 Tauri 的版本保持一致，否则可能会出现兼容性问题。

这种思路的代码示例大致如下：

```js
// 这是你的应用内部 API 的 JavaScript 包，你可以将它发布到 npm 上，让其他开发者在 Web 端调用你的应用内部 API
import { invoke } from "@tauri-apps/api";

export async function getAppInfo() {
	return invoke("plugin:my_app_api|get_app_info");
}

export async function doSomething() {
	return invoke("plugin:my_app_api|do_something");
}
```

这是一个基于你的应用内部 API 开发的插件的 JavaScript 包，你可以将它发布到 npm 上，让其他开发者在 Web 端调用你的插件提供的功能：

```js
// 这是一个基于你的应用内部 API 开发的插件的 JavaScript 包，你可以将它发布到 npm 上，让其他开发者在 Web 端调用你的插件提供的功能
import { invoke } from "@tauri-apps/api";

export async function getMyAppInfo() {
	return invoke("plugin:my_plugin|get_my_app_info");
}

export async function doSomethingWithMyApp() {
	return invoke("plugin:my_plugin|do_something_with_my_app");
}
```

这是你的 Web 端的代码，你可以使用你的应用内部 API 或插件提供的 JavaScript 包，来调用你的应用内部 API 或插件提供的功能

```js
// 这是你的 Web 端的代码，你可以使用你的应用内部 API 或插件提供的 JavaScript 包，来调用你的应用内部 API 或插件提供的功能
import { getAppInfo, doSomething } from "my-app-api";
import { getMyAppInfo, doSomethingWithMyApp } from "my-plugin";

async function main() {
	// 这里可以调用你的应用内部 API 或插件提供的功能，例如获取你的应用的信息、执行你的应用的某个功能等
	const appInfo = await getAppInfo();
	console.log(appInfo);
	await doSomething();
	const myAppInfo = await getMyAppInfo();
	console.log(myAppInfo);
	await doSomethingWithMyApp();
}

main();
```

## **思路二**：使用 Tauri 提供的 event API，来实现你的应用内部 API 和插件化机制。

这种思路的优点是，你可以利用 Tauri 已经封装好的 event API，来方便地从 Web 端监听和触发你的应用内部 API 或插件提供的事件。

你的应用内部 API 或插件可以使用 Tauri 的内置 API，也可以自定义自己的事件和状态。

你的应用内部 API 或插件还可以提供一个 JavaScript 包，来让其他开发者在 Web 端监听和触发你的应用内部 API 或插件提供的事件。

这种思路的缺点是，你的应用内部 API 或插件需要遵循 Tauri 的插件规范，可能会受到一些限制或约束。你的应用内部 API 或插件也需要和 Tauri 的版本保持一致，否则可能会出现兼容性问题。

这种思路的代码示例大致如下：

```js
// 这是你的应用内部 API 的 JavaScript 包，你可以将它发布到 npm 上，让其他开发者在 Web 端调用你的应用内部 API
import { event } from "@tauri-apps/api";

export async function getAppInfo() {
	// 这里可以触发你的应用内部 API 的 get_app_info 事件，让你的应用返回你的应用的信息
	event.emit("plugin:my_app_api|get_app_info");
	// 这里可以监听你的应用内部 API 的 app_info 事件，获取你的应用返回的信息
	return new Promise((resolve, reject) => {
		event.listenOnce("plugin:my_app_api|app_info", (info) => {
			resolve(info);
		});
	});
}

export async function doSomething() {
	// 这里可以触发你的应用内部 API 的 do_something 事件，让你的应用执行你的应用的某个功能
	event.emit("plugin:my_app_api|do_something");
	// 这里可以监听你的应用内部 API 的 app_result 事件，获取你的应用返回的结果
	return new Promise((resolve, reject) => {
		event.listenOnce("plugin:my_app_api|app_result", (result) => {
			resolve(result);
		});
	});
}
```

这是一个基于你的应用内部 API 开发的插件的 JavaScript 包，你可以将它发布到 npm 上，让其他开发者在 Web 端调用你的插件提供的功能

```js
// 这是一个基于你的应用内部 API 开发的插件的 JavaScript 包，你可以将它发布到 npm 上，让其他开发者在 Web 端调用你的插件提供的功能
import { event } from "@tauri-apps/api";

export async function getMyAppInfo() {
	// 这里可以触发你的插件的 get_my_app_info 事件，让你的插件调用你的应用内部 API 的 get_app_info 事件，获取你的应用的信息
	event.emit("plugin:my_plugin|get_my_app_info");
	// 这里可以监听你的插件的 my_app_info 事件，获取你的插件返回的信息
	return new Promise((resolve, reject) => {
		event.listenOnce("plugin:my_plugin|my_app_info", (info) => {
			resolve(info);
		});
	});
}

export async function doSomethingWithMyApp() {
	// 这里可以触发你的插件的 do_something_with_my_app 事件，让你的插件调用你的应用内部 API 的 do_something 事件，执行你的应用的某个功能
	event.emit("plugin:my_plugin|do_something_with_my_app");
	// 这里可以监听你的插件的 my_app_result 事件，获取你的插件返回的结果
	return new Promise((resolve, reject) => {
		event.listenOnce("plugin:my_plugin|my_app_result", (result) => {
			resolve(result);
		});
	});
}
```

这是你的 Web 端的代码，你可以使用你的应用内部 API 或插件提供的 JavaScript 包，来调用你的应用内部 API 或插件提供的功能

```js
// 这是你的 Web 端的代码，你可以使用你的应用内部 API 或插件提供的 JavaScript 包，来调用你的应用内部 API 或插件提供的功能
import { getAppInfo, doSomething } from "my-app-api";
import { getMyAppInfo, doSomethingWithMyApp } from "my-plugin";

async function main() {
	// 这里可以调用你的应用内部 API 或插件提供的功能，例如获取你的应用的信息、执行你的应用的某个功能等
	const appInfo = await getAppInfo();
	console.log(appInfo);
	await doSomething();
	const myAppInfo = await getMyAppInfo();
	console.log(myAppInfo);
	await doSomethingWithMyApp();
}
main();
```

## 思路三：使用 WebAssembly，来实现你的应用内部 API 和插件化机制。

这种思路的优点是，你可以利用 WebAssembly 的跨平台和高性能的特性，来编写和运行你的应用内部 API 和插件。

你的应用内部 API 和插件可以使用任何支持编译成 WebAssembly 的语言，例如 Rust、C、C++ 等。

你的应用内部 API 和插件也不需要和 Tauri 的版本保持一致，只要能够和你的 Web 端兼容。

这种思路的缺点是，你需要自己处理 WebAssembly 的编译和加载，可能会遇到一些复杂或棘手的问题，例如模块化、内存管理、错误处理等。

你的应用内部 API 和插件也不能提供一个 JavaScript 包，让其他开发者在 Web 端调用你的应用内部 API 或插件提供的功能，而需要通过 WebAssembly 的导入和导出来进行交互。

这种思路的代码示例大致如下：

```rust
// 这是你的应用内部 API 的 WebAssembly 模块定义，你可以使用 Rust 或其他支持编译成 WebAssembly 的语言来编写
use wasm_bindgen::prelude::*;

// 这是你的应用内部 API 的导出函数，你可以根据你的需要自定义
#[wasm_bindgen]
pub fn get_app_info() -> String {
  // 这里可以返回你的应用的名称、版本、描述等信息
  "My App Info".to_string()
}

#[wasm_bindgen]
pub fn do_something() -> i32 {
  // 这里可以执行你的应用的某个功能，例如打开一个窗口、发送一个通知等
  // 这里可以返回你的应用的执行结果，例如成功或失败的状态码
  0
}
```

基于你的应用内部 API 开发的插件的 WebAssembly 模块定义，你可以使用 Rust 或其他支持编译成 WebAssembly 的语言来编写：

```rust
// 这是一个基于你的应用内部 API 开发的插件的 WebAssembly 模块定义，你可以使用 Rust 或其他支持编译成 WebAssembly 的语言来编写
use wasm_bindgen::prelude::*;

// 这是你的插件的导入函数，你可以根据你的需要自定义
#[wasm_bindgen(module = "/my_app_api.wasm")]
extern "C" {
  fn get_app_info() -> String;
  fn do_something() -> i32;
}

// 这是你的插件的导出函数，你可以根据你的需要自定义
#[wasm_bindgen]
pub fn get_my_app_info() -> String {
  // 这里可以调用你的应用内部 API 的 get_app_info 函数，获取你的应用的信息
  get_app_info()
}

#[wasm_bindgen]
pub fn do_something_with_my_app() -> i32 {
  // 这里可以调用你的应用内部 API 的 do_something 函数，执行你的应用的某个功能
  do_something()
}

```

Web 端的代码，你可以使用 WebAssembly 的 API，来加载和调用你的应用内部 API 或插件提供的 WebAssembly 模块：

```js
// 这是你的 Web 端的代码，你可以使用 WebAssembly 的 API，来加载和调用你的应用内部 API 或插件提供的 WebAssembly 模块
async function main() {
	// 这里可以加载你的应用内部 API 的 WebAssembly 模块，例如 my_app_api.wasm
	const appApiModule = await WebAssembly.instantiateStreaming(
		fetch("my_app_api.wasm")
	);
	// 这里可以加载你的插件的 WebAssembly 模块，例如 my_plugin.wasm
	const pluginModule = await WebAssembly.instantiateStreaming(
		fetch("my_plugin.wasm")
	);
	// 这里可以调用你的应用内部 API 或插件提供的功能，例如获取你的应用的信息、执行你的应用的某个功能等
	const appInfo = appApiModule.instance.exports.get_app_info();
	console.log(appInfo);
	const appResult = appApiModule.instance.exports.do_something();
	console.log(appResult);
	const myAppInfo = pluginModule.instance.exports.get_my_app_info();
	console.log(myAppInfo);
	const myAppResult = pluginModule.instance.exports.do_something_with_my_app();
	console.log(myAppResult);
}

main();
```
