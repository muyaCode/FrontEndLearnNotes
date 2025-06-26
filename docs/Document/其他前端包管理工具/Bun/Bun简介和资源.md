# Bun

## Bun 简介

Bun 是一个用于 JavaScript 和 TypeScript 应用程序的一体化工具包，它旨在替代 Node.js。

Bun 的核心是一个快速的 JavaScript 运行时，它使用 JavaScriptCore 引擎，减少了启动时间和内存使用量。

Bun 还提供了一些内置的工具和库，例如打包器、转译器、包管理器、测试运行器、Web API 等，使得开发者无需额外安装依赖，就可以直接开始编码。

Bun 还支持 CommonJS 和 ESM 两种模块系统，以及 TypeScript 和 JSX/TSX 语法。Bun 的设计目标是消除缓慢和复杂性，同时保留 JavaScript 的所有优点。

Bun 兼容 Node.js 的所有 API，完全是从头实现的，运行速度大大快于 Node.js。

但 Bun 不仅仅是一个运行时。它也是：

- 一个包管理器 (类似 Yarn、 NPM、 PNPM)
- 一个构建工具 (类似 Webpack、 ESBuild、 Parcel)
- 一个测试运行器
- ... 以及很多其他东西！

所以 Bun 可以通过读取你的 package.json 来安装依赖项。Bun 还可以运行你的脚本。不管它做什么都比其他工具更快。

Bun 在 JavaScript 生态系统的许多方面都有新的尝试，其中的重点是性能。

它优先支持标准的 Web API，如 Fetch。它也支持许多 Node.js APIs，使其能与大多数 NPM 包兼容。

## Bun 相关网站

官网：<https://bun.sh/>

GitHub：<https://github.com/oven-sh/bun>

## Bun 安装使用

### macOS 和 Linux

```bash
npm install -g bun # the last `npm` command you'll ever need
```

### Windows

```bash
powershell -c "irm bun.sh/install.ps1|iex"
```

执行 js/ts 文件、package.json 脚本和可执行包

```bash
bun run
```

- `--wathc`支持在监视模式下运行文件

支持的文件类型有 js\ts\jsx\tsx\txt\json\toml\wasm\sqlite，可以使用插件支持更多

bun 自动读取`.env`文件，并提供以编程方式读写环境变量的惯用方法通过`process.env`或者`Bun.env`或者`import.meta.env`

bun 的目标是完全兼容 Node.js API。[支持度——Node.js compatibility – Runtime | Bun Docs](https://bun.sh/docs/runtime/nodejs-apis)

插件系统，用于扩展运行时和 bundler

```ts
import { plugin, type BunPlugin } from "bun";

const myPlugin: BunPlugin = {
	name: "Custom loader",
	setup(build) {
		// implementation
	},
};

plugin(myPlugin);
```

### package manager

_看起来确实快 第二次安装更快_

- bun install 安装项目依赖，执行{pre|post}install 脚本，将包信息写入 bun.lockb 文件中该文件位于项目根目录下

- bun add 添加指定包等同于

  ```
  pnpm i xxx
  ```

  - `--dev`作为开发依赖
  - `--global`安装全局依赖

- bun remove 删除依赖项

- bun update 将所有的依赖项更新到与指定的版本范围兼容的版本

  - --force 正常情况下遵循 package.json 定义的版本范围，想要忽略并更新到最新版本，可以传入该表示

- bun link 在本地目录中将当前包注册为可链接包

- 下载的所有包都位于全局缓存中`~/.bun/install/cache`。它们存储在名为 like 的子目录中`${name}@${version}`，因此可以缓存包的多个版本

- 在 package.json 中，"workspaces"选项用于指示哪些子目录应被视为 monorepo 中的包/工作区

### bundler

- 为什么需要 bundler
  - **减少 HTTP 请求。**。单个包可能包含数百个文件，使用单独的 HTTP 请求加载每个文件不太行，因此 bunler 用于将应用程序的源代码转换为数量较小的包，可以通过单个请求加载。
  - **代码转换**。例如 ts、jsx、tsx 都必须要转换为纯 js，然后才能被浏览器使用。
- Watch mode `--watch` bundler 支持监听模式
- Bun bundler 实现了一组默认的 loaders，支持`.js` `.cjs` `.mjs` `.ts` `.cts` `.mts` `.tsx` `.jsx` `.toml` `.json` `.txt` `.wasm` `.node`文件

### test runner

- Bun 附带了一个快速、内置、兼容 Jest 的测试运行器
- 支持 ts 和 jsx
- 支持生命周期 hooks
- 快照测试
- UI 和 DOM 测试
- `--wathc`监听模式
- `--preload`脚本预加载
- 运行 `bun test`

```ts
import { expect, test } from "bun:test";

test("2 + 2", () => {
	expect(2 + 2).toBe(4);
});
```

- 测试文件如下
  - `*.test.{js|jsx|ts|tsx}`
  - `*_test.{js|jsx|ts|tsx}`
  - `*.spec.{js|jsx|ts|tsx}`
  - `*_spec.{js|jsx|ts|tsx}`

### api

- `Bun.serve()`用于启动 HTTP 服务器
- `Worker`允许在单独线程上运行新的 js 实例并与之通信，同时与主线程共享 I/O 资源
- 支持使用二进制数据提供了 `ArrayBuffer` `Blob`等 api
- streams 是处理二进制数据的重要抽象，无需将其全部加载到内存中。通常用于读写文件、发送和接受网络请求以及处理大量数据。 还有很多 api 请参考官网这就不一一举例了

## 框架

### Elysia.js

由 Bun 增强的 TypeScript 框架具有端到端的类型安全、统一的类型系统和出色的开发人员体验

开源地址：https://github.com/elysiajs/elysia

官网：https://elysiajs.com/
