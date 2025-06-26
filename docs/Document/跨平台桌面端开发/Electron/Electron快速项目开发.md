# Electron快速项目开发

## electron-quick-start 项目仓库

克隆示例项目的仓库

```bash
git clone https://github.com/electron/electron-quick-start
```

或者命令行快速创建

```bash
# 使用 npm:
npm create @quick-start/electron

# 使用 Yarn:
yarn create @quick-start/electron

# 使用 pnpm:
pnpm create @quick-start/electron
```

进入这个仓库

```bash
cd electron-quick-start
```

安装依赖

```bash
npm install 
```

运行

```bash
npm start
```

如果下载比较慢的话，推荐使用淘宝镜像。

```bash
npm config set ELECTRON_MIRROR https://npm.taobao.org/mirrors/electron/
```

## Electron与react结合

下载示例工程

```bash
git clone --depth 1 --single-branch --branch master https://github.com/electron-react-boilerplate/electron-react-boilerplate.git electron-react-start
```

进入工程安装依赖

```bash
cd electron-react-start
```

启动开发模式

```bash
yarn dev
```

可能出现的问题1：

网速太慢yarn总是不成功

安装yrm并切换镜像

```bash
npm install yrm –g
```

查看所有镜像

```bash
yrm ls
```

切换镜像

```bash
yrm use taobao
```

## Electron与Vue结合

## 项目功能开发

参考教程文章：

- [Electron学习笔记(一) 配置, 创建, 设置, 监听_小松鼠举栗子的博客-CSDN博客_electron 监听窗口打开](https://blog.csdn.net/allen8612433/article/details/115731700)
- [Electron学习笔记(二) 窗口, 通信, 剪切板, 系统托盘_小松鼠举栗子的博客-CSDN博客_electron dragstart](https://blog.csdn.net/allen8612433/article/details/115893755)
- [Electron学习笔记(三) 读写, 焦点, 窗口句柄, 预加载_小松鼠举栗子的博客-CSDN博客_browserwindow 窗口句柄](https://blog.csdn.net/allen8612433/article/details/115934598)
- [Electron学习笔记(四) 拉伸, 拖动, 扩展, 菜单_小松鼠举栗子的博客-CSDN博客](https://blog.csdn.net/allen8612433/article/details/116012804)
- [Electron学习笔记(五) 通过Addon(n-api)实现可扩展接口_小松鼠举栗子的博客-CSDN博客](https://blog.csdn.net/allen8612433/article/details/106937163)
- [Electron学习笔记(六) 实现四格多片源播放器_小松鼠举栗子的博客-CSDN博客](https://blog.csdn.net/allen8612433/article/details/106141314)
- [Electron学习笔记(七) C++编译Electron_小松鼠举栗子的博客-CSDN博客_electron c++](https://blog.csdn.net/allen8612433/article/details/116118238)
- [用C++和Go开发Node.js和Electron本地模块-CSDN程序员研修院](https://edu.csdn.net/course/detail/16216)

[Electron 进程间通信的四种方式 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/543924835)
