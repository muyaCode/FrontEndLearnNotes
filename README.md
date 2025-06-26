# FrontEndLearnNotes/前端学习笔记

**vitepress 框架的 markdown 写作相关文档**：<https://vitepress.vuejs.org/guide/markdown>

## 前端学习笔记

记录大前端和全栈的学习笔记 + 学习路径 + 各种网站和学习资源。

## 运行 VitePress 文档项目

使用 npm / yarn / pnpm / bun /等包管理都行

⚠️ 注意：一个前端项目从安装依赖起，从头到尾，尽量只使用一个包管理器，否则会出现乱七八糟的错误。

以下以 bun 包管理 为例：

1. 安装依赖

```bash
bun i
```

2. 运行文档项目

```bash
bun docs:dev
```

3. 打包文档项目

```bash
bun docs:build
```

4. 基于 main 分支打包并提交到远程仓库部署 git-pages，原理是运行项目根目录的脚本文件`deploy.sh` ，命令：

```bash
bun run deploy
```

如果报错，则去检查修改 `deploy.sh` 脚本，把包管理命令、仓库地址等改成你自己的配置

## 解决 JavaScript/Node 项目打包内存溢出报错：JS stacktrace

安装依赖后，运行或打包项目报错：vitepress 内存溢出(JS stacktrace)，JavaScript 堆内存不足的错误。这在打包大型 VitePress 项目时很常见，因为 Node.js 默认的内存限制比较小。

你遇到的是 JavaScript 堆内存不足的错误。这在打包大型 VitePress 项目时很常见，因为 Node.js 默认的内存限制比较小。下面是几种解决方案：

### 1. 增加 Node.js 堆内存限制

在执行打包命令时，通过 `NODE_OPTIONS` 环境变量增加内存限制：

```bash
NODE_OPTIONS=--max-old-space-size=8192 vitepress build docs
```

你可以根据需要调整 `8192`（即 8GB）这个值。

### 2. 修改 package.json 脚本

在 `package.json` 中修改打包脚本，永久增加内存限制：

```json
{
	"scripts": {
		"docs:build": "NODE_OPTIONS=--max-old-space-size=8192 vitepress build docs"
	}
}
```

以上如果报错，设置环境变量的语法各个系统中不同，以下是针对不同环境的解决方案：

#### 跨平台解决方案（推荐）

使用 `cross-env` 包来统一不同操作系统的环境变量设置语法。

1. 安装 `cross-env`：

```bash
bun install --save-dev cross-env
```

2. 修改 `package.json` 中的脚本：

```json
{
	"scripts": {
		"docs:build": "cross-env NODE_OPTIONS=--max-old-space-size=8192 vitepress build docs"
	}
}
```

#### 仅针对 Windows 的解决方案

如果你确定只在 Windows 环境下开发，可以使用 Windows 专用的环境变量设置语法：

```json
{
	"scripts": {
		"docs:build": "set NODE_OPTIONS=--max-old-space-size=8192 && vitepress build docs"
	}
}
```

#### 同时支持 Windows 和 Unix 系统

如果你需要同时支持 Windows 和 Unix 系统，可以使用以下方法：

```json
{
	"scripts": {
		"docs:build:win": "set NODE_OPTIONS=--max-old-space-size=8192 && vitepress build docs",
		"docs:build:unix": "NODE_OPTIONS=--max-old-space-size=8192 vitepress build docs",
		"docs:build": "npm run docs:build:win || npm run docs:build:unix"
	}
}
```

#### 终极解决方案：使用配置文件

如果你不想修改 `package.json`，可以创建一个 `.env` 文件并添加：

```env
NODE_OPTIONS=--max-old-space-size=8192
```

然后使用支持加载环境变量的工具来运行 VitePress，例如 `dotenv-cli`：

```bash
bun install --save-dev dotenv-cli
```

修改 `package.json`：

```json
{
	"scripts": {
		"docs:build": "dotenv -e .env vitepress build docs"
	}
}
```

### 验证内存限制是否生效

可以添加一个简单的脚本验证内存限制是否生效：

```json
{
	"scripts": {
		"check-memory": "node -p 'process.memoryUsage().heapTotal / 1024 / 1024'"
	}
}
```

运行 `bun run check-memory` 应该看到接近你设置的值（以 MB 为单位）。

### 3. 优化 VitePress 配置

通过配置 Vite 来优化打包过程：

```javascript
// .vitepress/config.js
export default {
	vite: {
		build: {
			// 调整 chunk 大小警告限制（可选）
			chunkSizeWarningLimit: 1000, // 1MB

			// 配置 Rollup 分块策略
			rollupOptions: {
				output: {
					manualChunks(id) {
						// 将大依赖单独分块
						if (id.includes("node_modules")) {
							return id
								.toString()
								.split("node_modules/")[1]
								.split("/")[0]
								.toString();
						}
					},
				},
			},
		},
	},
};
```

### 4. 分步构建（高级）

对于超大型项目，可以考虑使用 Vite 的库模式进行分步构建，但这需要更复杂的配置。

### 最终建议

先尝试第一种方法，如果仍然报错，再结合修改 `package.json` 和优化配置。如果项目特别大，可能需要考虑重构部分代码或使用动态导入来拆分应用。
