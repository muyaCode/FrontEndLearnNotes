# React 学习前置

## React 简介

由 Facebook 公司开源，用于动态构建用户界面的 JavaScript 库(只关注于视图)

### React 的特点

1.采用组件化模式、声明式编码，提高了效率及组件复用率

2.在 React Native 可以使用 React 语法 编写原生移动应用

3.使用虚拟 DOM+ 优秀的 Diffing 算法，尽量减少与真实 DOM 的交互

### React 高效的原因

1.使用虚拟(virtual)DOM, 不总是直接操作页面真实 DOM。

2.DOM Diffing 算法, 最小化页面重绘。

### React 相关 js 库

- 1.react：React 核心库。
- 2.react-dom：提供操作 DOM 的 react 扩展库。
- 3.react-scripts：
- 4.babel.min.js：解析 JSX 语法代码转为 JS 代码的库。

```html
<script type="text/babel">
	// 里面写jsx语法的语句,靠babel解析翻译
</script>
```

5.prop-types.js：对父组件传来的 props 进行检查

- npm 官网：<https://www.npmjs.com/package/prop-types>
- react 官方：<https://reactjs.org/docs/typechecking-with-proptypes.html>

相关库要按此顺序引入，才能正常运行

### React 版本

- 15.x
- 16.x
- 17.x
- 18.x

## React 开发相关网站

### 官网

- 英文官网：https://reactjs.org/

- 中文官网：https://react.docschina.org/

- 中文网文档：https://react.docschina.org/docs/state-and-lifecycle.html

React 官网：[React](https://react.dev/)

React 中文网：[React 官方中文文档 – 用于构建用户界面的 JavaScript 库 (docschina.org)](https://react.docschina.org/)

React 开源 GitHub 地址：[facebook/react: The library for web and native user interfaces (github.com)](https://github.com/facebook/react)

React 快速开发库：[Getting Started | Create React App (create-react-app.dev)](https://create-react-app.dev/docs/getting-started/)

React 快速开发库 GitHub 开源地址：[facebook/create-react-app: Set up a modern web app by running one command. (github.com)](https://github.com/facebook/create-react-app)

### 中文学习文档：

- [快速入门 | React 中文文档 | React 中文网 (bootcss.com)](https://react.bootcss.com/learn)
- [React 中文导航 (react-china.org)](http://nav.react-china.org/)
- [React 中文文档 · React 入门教程 (caibaojian.com)](http://caibaojian.com/react/)

## 相关库

[mistcss —**仅使用 CSS 编写 React 组件**(typicode.github.io)](https://typicode.github.io/mistcss/)

开源地址：[typicode/mistcss: Write atomic React components using only CSS! (JS-from-CSS™) 🌬️ (github.com)](https://github.com/typicode/mistcss)
