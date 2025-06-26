# 02\_给 VitePress 添加 algolia 搜索

VitePress 搭建静态网站并在 GitHub/Gitee Pages 部署：<https://agangdundan.cn/origin/>

## 前期准备

### 1、algolia 账号创建和应用

1.在 [algolia 官网](https://www.algolia.com/doc/) 首页，点击蓝色按钮 "SIGN UP"

![1.jpg](.\img\1.jpg)

2.使用邮箱注册一个账号，或者直接选择以 GitHub 身份登录。

![2.jpg](.\img\2.jpg)

3.登录之后，会进入控制面板页面，点击右上角头像，会有一个 `Settings` 选项

![3.jpg](.\img\3.jpg)

4.点击 `Applications` 应用实例选项

![4.png](.\img\4.png)

5.新建应用实例

![5.png](.\img\5.png)

6.创建应用步骤

![6.png](.\img\6.png)

7.选择地区和创建

![7.jpg](.\img\7.jpg)

8.全部打钩后创建应用

![8.jpg](.\img\8.jpg)

至此应用创建成功

### 2、应用配置

在 VitePress 里面配置 algolia 搜索框，创建一个 `docs/.vitepress/algolia.js` 文件

```js
// algolia.js：展示 algolia 搜索框
export default {
	appId: "", //
	apiKey: "", // Search-Only API Key
	indexName: "", // algolia创建的实例应用名称：FrontEndLearnNotes
	placeholder: "请输入关键词", //
	buttonText: "搜索", //
	searchParameters: {
		//
		faeFilters: ["tags:guide,api"],
	},
};
```

在`docs/.vitepress/config.js`` 中导入引用 algolia 的模块

```js
import socialLinks from "./socialLinks";
import nav from "./nav";
import algolia from "./algolia";
import sidebar from "./sidebar";

export default {
	lang: "zh", // 中文，英文设置en
	title: "牡涯前端学习笔记", // 浏览器标签标题
	description: "记录前端学习过的笔记",
	base: "/FrontEndLearnNotes/", // url默认前缀
	appearance: true, // 暗黑模式
	ignoreDeadLinks: true, // 不会因死链接而使构建失败
	lastUpdated: true, // 使用 git 提交获取时间戳，使默认主题能够显示页面的上次更新时间
	// markdown主题
	markdown: {
		// 主题选择：https://github.com/shikijs/shiki/blob/main/docs/themes.md#all-themes
		// 主题预览：https://vscodethemes.com/
		// 添加自定义的主题(加载主题)：https://github.com/shikijs/shiki/blob/main/docs/themes.md#loading-theme
		theme: "one-dark-pro",
		lineNumbers: true, // 显示代码行数
	},
	// outDir: "../dist", // 打包输出的目录
	// titleTemplate: '牧涯前端学习笔记', // 标题后缀
	cleanUrls: "without-subfolders", // url设置
	// 浏览器标签图标设置
	head: [
		[
			"link",
			{
				rel: "icon",
				href: "https://avatars.githubusercontent.com/u/48587992?v=4",
			},
		],
		// ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
	],

	// ***** 主题设置 *****
	themeConfig: {
		logo: "/img/buding.svg",
		siteTitle: "牧涯前端学习笔记", // 网站左上角标题
		outlineTitle: "⚡️内容大纲",

		// 右上角导航
		nav,
		// 右上角导航中显示带有图标的社交帐户链接
		socialLinks,
		// 展示 algolia 搜索框
		algolia,
		// *****左边侧栏导航*****
		sidebar,

		// 编辑
		editLink: {
			pattern:
				"https://github.com/muyaCode/FrontEndLearnNotes/edit/main/docs/:path",
			text: "在 GitHub 上编辑此页",
		},
		lastUpdateText: "上次更新时间：",
		// 卡片广告
		carbonAds: {
			code: "卡片广告 code",
			placement: "卡片广告布置",
		},
		docFooter: {
			prev: "上一篇",
			next: "下一篇",
		},
		// 首页页脚配置。您可以添加消息和版权。仅当页面由于设计原因不包含边栏时，才会显示页脚。
		footer: {
			message: "Released under the MIT License.",
			copyright: "Copyright © 2022-MuYa",
		},
	},
};
```

#### 上面 algolia.js 的配置 Key 获取

1.重新进入 Settings 应用设置页面，点击对应的应用，进入到应用配置页面，点击 `API Keys` 获取 key

![2-1.jpg](.\img\2-1.jpg)

会看到如下界面，`Search-Only API Key`  可公开的 key，是在 VitePress 项目中会使用的 Key；而  `Admin API Key`  是用于后端爬虫需要用到的的 key，因为是私有的，所以一会放在 Github Secrets 中

![2-2.png](.\img\2-2.png)

2.复制公开的 key：`Search-Only API Key` 到 vitepress 项目的`docs/.vitepress/algolia.js`

appId 字段填入：`Application ID`

apiKey 字段填入：`Search-Only API Key`

indexName 字段是：algolia 刚刚创建的实例应用名称

```js
// 展示 algolia 搜索框
export default {
	appId: "1L6FRXPKEM", // Application ID
	apiKey: "934b4c2e67a08d72d379c9af236c5859", // Search-Only API Key
	indexName: "FrontEndLearnNotes", // algolia创建的实例应用名称：FrontEndLearnNotes
	placeholder: "请输入关键词",
	buttonText: "搜索",
	searchParameters: {
		faeFilters: ["tags:guide,api"],
	},
};
```

3.执行 ci 配置，打开 VitePress 项目的 github 地址，点击 Setting 选项，点击 `Secrets` 中的 `Actions`。

![2-3.jpg](.\img\2-3.jpg)

3.1 创建  `API_KEY` 字段，将 algolia 应用的`Admin API Key` 复制到`API_KEY` 中

3.2 创建  `APPLICATION_ID` 字段，将 algolia 应用的  `Application ID`  复制到  `APPLICATION_ID`中

![2-4.jpg](.\img\2-4.jpg)

4.在 VitePress 项目中，创建 `crawlerConfig.json` 文件

在项目的根目录下创建  `crawlerConfig.json`  文件，内容如下，注意前两个字段需要进行替换。这是告诉  `algolia`  需要爬取的配置

```json
{
	"index_name": "FrontEndLearnNotes",
	"start_urls": ["https://muyacode.github.io/FrontEndLearnNotes/"],
	"rateLimit": 8,
	"maxDepth": 10,
	"selectors": {
		"lvl0": {
			"selector": "",
			"defaultValue": "Documentation"
		},
		"lvl1": ".content h1",
		"lvl2": ".content h2",
		"lvl3": ".content h3",
		"lvl4": ".content h4",
		"lvl5": ".content h5",
		"content": ".content p, .content li"
	},
	"selectors_exclude": [
		"aside",
		".page-footer",
		".next-and-prev-link",
		".table-of-contents"
	],
	"js_render": true
}
```

5.编写 CI 脚本

在项目根目录`.github/workflows`  文件夹下，创建  `algolia.yml`  文件（名称可更改，自定义），粘贴如下内容：

```json
name: algolia
on:
  push:
    branches:
      - main
jobs:
  algolia:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Get the content of algolia.json as config
        id: algolia_config
        run: echo "config=$(cat crawlerConfig.json | jq -r tostring)" >> $GITHUB_OUTPUT
      - name: Push indices to Algolia
        uses: signcl/docsearch-scraper-action@master
        env:
          APPLICATION_ID: ${{ secrets.APPLICATION_ID }}
          API_KEY: ${{ secrets.API_KEY }}
          CONFIG: ${{ steps.algolia_config.outputs.config }}
```

> 这里 yml 就是使用 Github Actions 在 Docker 中执行的 AlgoliaDocSearch scraper action，当我们推送到 main 分支时就会立即执行这个任务，当然如果你是 master 分支只需要修改 branches 那里的值即可

## 项目提交 algolia 搜索配置后的应用结构爬虫数据

1.回到项目提交代码到 GitHub，然后打开 GitHub 项目链接，点击 `Actions` ，选择刚刚提交的记录带有 algolia 的

![3-1.jpg](.\img\3-1.jpg)

2.点击 algolia，发现正在执行爬虫工作

![3-2.jpg](.\img\3-2.jpg)

3.回到 algolia 的 Applications 应用列表

![3-3.jpg](.\img\3-3.jpg)

4.点击后发现，应用已经在爬取数据

![3-4.png](.\img\3-4.png)

## 总结
