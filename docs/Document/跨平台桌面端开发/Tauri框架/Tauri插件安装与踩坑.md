# Tauri插件安装与踩坑

文档：[Tauri 插件 | Tauri Apps](https://tauri.app/zh-cn/v1/guides/features/plugin)

## Tauri-plugin

Tauri-plugin是Tauri API的扩展，是对于基础api的一些补充，现在官方推出的插件已有：

|                                                              |                                           |
| ------------------------------------------------------------ | ----------------------------------------- |
| [authenticator](https://github.com/tauri-apps/plugins-workspace/tree/dev/plugins/authenticator) | 与硬件安全密钥的api。                     |
| [autostart](https://github.com/tauri-apps/plugins-workspace/tree/dev/plugins/autostart) | 在系统启动时自动启动应用。                |
| [fs-extra](https://github.com/tauri-apps/plugins-workspace/tree/dev/plugins/fs-extra) | 核心API中不包含的额外文件系统api。        |
| [fs-watch](https://github.com/tauri-apps/plugins-workspace/tree/dev/plugins/fs-watch) | 观察文件系统的变化。                      |
| [localhost](https://github.com/tauri-apps/plugins-workspace/tree/dev/plugins/localhost) | 在生产端中使用localhost。(默认为tauri://) |
| [log](https://github.com/tauri-apps/plugins-workspace/tree/dev/plugins/log) | 日志模块                                  |
| [persisted-scope](https://github.com/tauri-apps/plugins-workspace/tree/dev/plugins/persisted-scope) | 持久化运行时状态到文件                    |
| [positioner](https://github.com/tauri-apps/plugins-workspace/tree/dev/plugins/positioner) | 窗口位置记忆                              |
| [single-instance](https://github.com/tauri-apps/plugins-workspace/tree/dev/plugins/single-instance) | 确保tauri应用程序只有一个实例在运行。     |
| [sql](https://github.com/tauri-apps/plugins-workspace/tree/dev/plugins/sql) | 与SQL数据库的接口                         |
| [store](https://github.com/tauri-apps/plugins-workspace/tree/dev/plugins/store) | 持久化键值数据（纯异步）                  |
| [stronghold](https://github.com/tauri-apps/plugins-workspace/tree/dev/plugins/stronghold) | 加密的安全数据库                          |
| [upload](https://github.com/tauri-apps/plugins-workspace/tree/dev/plugins/upload) | 用于通过HTTP上传文件的Tauri插件           |
| [websocket](https://github.com/tauri-apps/plugins-workspace/tree/dev/plugins/websocket) | 使用JS绑定的Rust的打开WebSocket连接。     |
| [window-state](https://github.com/tauri-apps/plugins-workspace/tree/dev/plugins/window-state) | 持久化窗口大小和位置                      |

## Tauri插件安装

tauri官方提供三种安装方式：

1. 使用`crates.io`和`npm/yarn/pnpm`（最简单，并且需要您相信其的发布管道工作正常）
2. 使用 `git tags` / `revision hashe`直接从Github拉取源代码（最安全）
3. Git子模块在你的tauri项目中安装这个repo，然后使用文件协议来摄取源代码（最安全，但是使用起来不方便，没尝试过文件导入，比较麻烦）

常用的方式就是1和2，先在Cargo.toml添加rust依赖，再通过npm/pnpm等安装js绑定， 但是由于国内安装包要通过github，以安装 store 为例子, 有以下解决方案：

### 1. 无魔法，不用github-action

**cargo:**
随便找个能拉git的镜像网站，这里用的 `hub.fgit.ml`
`Cargo.toml`:

```toml
[dependencies]
tauri-plugin-store = { git = "https://hub.fgit.ml/tauri-apps/plugins-workspace", branch = "dev" }
```

`pnpm`:
由于直接gitee导入仓库，远程导入github的plugin地址到你的gitee仓库中（或者搜别人拉取的）

```bash
pnpm add git+https://gitee.com/你的仓库/tauri-plugin-store
```

### 2. 有魔法

如果需要在github-action中进行自动构建那么：
`git+https://gitee.com/...` 这种npm包在github-action中会访问不了报错，
需要将其换成原始的即可：

```bash
pnpm add https://github.com/tauri-apps/tauri-plugin-store
```

本地安装连接不上，需要走代理（用**管理员**打开cmd）：

```bash
set http_proxy=http://127.0.0.1:XXXX & set https_proxy=http://127.0.0.1:XXXX
pnpm add https://github.com/tauri-apps/tauri-plugin-store
```
