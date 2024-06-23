# 使用 VuePress 搭建在线文档网站

VitePress 搭建静态网站并在 GitHub/Gitee Pages 部署：<https://agangdundan.cn/origin/>

网站搜索添加：

- [搜索 | VitePress 中文网 (qzxdp.cn)](https://vitepress.qzxdp.cn/reference/default-theme-search.html#minisearch-选项)
- [emersonbottero/vitepress-plugin-search: Provide local search to your documentation site. (github.com)](https://github.com/emersonbottero/vitepress-plugin-search#readme)
- [使用 Pagefind 为 VitePress 文档添加离线全文搜索能力 - 掘金 (juejin.cn)](https://juejin.cn/post/7217381222025068600?searchId=202308011502425B57F014BAEAEE755CC9)
- [vitepress 添加搜索 | 青训营笔记 - 掘金 (juejin.cn)](https://juejin.cn/post/7199265829955108901)

## 0. 在线文档

[VuePress (vuejs.org)](https://vuepress.vuejs.org/zh/)

## 1. 搭建基本环境

1.将 VuePress 作为一个本地依赖安装

```bash
npm install -D vuepress
```

2.新建一个 docs 文件夹

```bash
mkdir docs
```

3.新建一个文件: docs/README.md

```bash
echo '# Hello VuePress!' > docs/README.md
```

4.启动文档项目

```bash
npx vuepress dev docs
```

5.构建静态文件

```bash
npx vuepress build docs

npx vuepress build docs  |-- docs    |-- .vuepress      |-- config.js    |-- README.md
```

总的命令

```bash
# 将 VuePress 作为一个本地依赖安装
npm install -D vuepress
# 新建一个 docs 文件夹
mkdir docs
# 新建一个文件: docs/README.md
echo '# Hello VuePress!' > docs/README.md
# 启动文档项目
npx vuepress dev docs
# 构建静态文件
npx vuepress build docs
  |-- docs
    |-- .vuepress
      |-- config.js
    |-- README.md
```

## 2. 配置 ts 教程文档

1.整体结构

```bash
|-- dist
|-- dics
  |-- .vuepress
    |-- public
      |-- ts-logo.png
    |-- config.js
  |-- chapter1
    |-- 01_初识TS.md
    |-- 02_安装TS.md
    |-- 03_HelloWorld.md
  |-- chapter2
    |-- 1_type.md
    |-- 2_interface.md
    |-- 3_class.md
    |-- 4_function.md
    |-- 5_generic.md
    |-- 6_other.md
  |-- chapter3
    |-- 01_react.md
    |-- 02_vue.md
  |-- chapter4
    |-- README.md
  |-- README.md
|-- package.json
```

2.增加 `docs/.vuepress/config.js`

```javascript
// 注意: base的值为github仓库的名称
module.exports = {
	base: "/ts-study/" /* 基础虚拟路径: */,
	dest: "dist" /* 打包文件基础路径, 在命令所在目录下 */,
	title: "TypeScript 入门", // 标题
	description: "学习使用 TypeScript", // 标题下的描述
	themeConfig: {
		// 主题配置
		sidebar: [
			// 左侧导航
			{
				title: "初识 TypeScript", // 标题
				collapsable: false, // 下级列表不可折叠
				children: [
					// 下级列表
					"chapter1/01_初识TS",
					"chapter1/02_安装TS",
					"chapter1/03_HelloWorld",
				],
			},
			{
				title: "TypeScript 常用语法",
				collapsable: false,
				children: [
					"chapter2/1_type",
					"chapter2/2_interface",
					"chapter2/3_class",
					"chapter2/4_function",
					"chapter2/5_generic",
				],
			},
		],
	},
};
```

3.增加 `docs/README.md`

```bash
---
#首页
home: true
# 图标
heroImage: /ts-logo.png
# 按钮文本
actionText: 开始学习 →
# 按钮点击跳转路径
actionLink: /chapter1/01_初识TS
---
```

4.修改 `package.json`

```json
"scripts": {
  "doc:dev": "vuepress dev docs",
  "doc:build": "vuepress build docs",
  "doc:deploy": "gh-pages -d docs/dist"
}
```

## 3. 发布到 gitpage

1. 使用 git 管理当前项目

2. 将打包的项目推送到 gitpage

```bash
# 下载工具包
yarn add -D gh-pages
# 执行打包命令
yarn doc:build
# 执行部署命令
yarn doc:deploy
```
