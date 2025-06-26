# Vue3 项目开发规范

## 文件结构和代码规范

---

创建项目的过程和之前 vue3 基础知识的过程完全一致

配置 vue3 开发环境 ：https://cn.vuejs.org/guide/quick-start.html#without-build-tools

唯一区别就是在步骤

Pick a linter / formatter config - 我们选择了 ESLint + Standard config

JavaScript 风格指南|代码规范、linter 和 formatter：https://standardjs.com/readme-zhcn.html

## 项目结构和插件

### Eslint 插件

如果 eslint 不生效，可以在根目录创建 .vscode 文件夹，然后在文件夹中创建 settings.json 然后输入

```json
{
	"eslint.validate": ["typescript"]
}
```

### Volar 插件

Vetur 插件,已经不推荐使用了, 安装 Volar 插件后记得禁用 vue2 的 Vetur 插件，否则项目报错

---

### 使用 ESLint 规范代码

规范的代码格式可以让整个工作的效率在一定程度上提升到最高

_没有规范可能出现的问题：_  
 -代码难以读懂 -代码提交的时候会有很多格式问题的修改，造成不必要的时间消耗。

_ESLint 是什么？_  
 -是一个开源的 JavaScript 的 linting 工具，使用 espree 将 JavaScript 代码解析成抽象语法树 (AST)，然后通过 AST 来分析我们代码

---

### 命令行工具

```sh
npx eslint --version
npx eslint --ext ts,vue src/**
```

---

### Rules

ESLint 可用的 Rules

一个 rule 有三个等级 0， 代表关闭，1 代表 warning，输出警告，但是不是错误，2 代表错误，会直接抛出错误。这三个数字也可以使用单词来代表，分别是 off warn 和 error。

```sh
rules: {
	'semi': 2
}
```

---

### Extends

一系列的规则作为一组。大家可以把这一组拿来用到自己的项目中，那么这个就是 extends 字段，是一个数组，里面是几个项目，其实在 extends 中的每一个字段，都是一组规则。

###### Vue3 essential 规则组：https://eslint.vuejs.org/rules/

---

### 项目开发规范

- 组件的抽象，vue 是组件的世界，组件是最重要的一环，编写组件是最基本的能力，对于一些常用的功能，我们需要高可用性和可定制性的组件，也就是说我们在整个项目中一般不会用到第三方组件，比如 element，都是从零开始，而且会循序渐进，不断抽象。甚至行成自己的一套小组件库。

- 整体状态数据结构的设计和实现，SPA 一般使用状态工具管理整理状态，并且给多个路由使用，在 vue 中，我们使用 vuex，一个项目的整体数据结构的复杂程度就代表了这个能力的高低，最好是要有多层次的数据结构，相互依赖的关系，还要将数据的获取，结构设计，缓存进行一系列的考量。

- 权限管理和控制，一个项目需要有用户权限的实现，不仅仅是后端，前端作为一个整体的 SPA 的项目，权限控制也尤为重要，我们需要有权限的获取，权限的持久化，权限的更新，那个路由可访问，哪个需要权限才可以访问。发送异步请求的全局 token 注入，全局拦截，全局信息提示等等和权限相关的内容。

# 搭建出团队的 vue3 前端架构

[从 16 个方向逐步搭建基于 vue3 的前端架构 - 掘金 (juejin.cn)](https://juejin.cn/post/7025524870842679310)
