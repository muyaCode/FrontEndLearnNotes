# 01_ESLint 编程规范

GitHub：[https://github.com/eslint/eslint](https://github.com/eslint/eslint)

官网：[https://eslint.org/](https://eslint.org/)

中文网：1：[https://cn.eslint.org/](https://cn.eslint.org/)、2：[https://eslint.bootcss.com/](https://eslint.bootcss.com/)

官网配置指南：[User Guide - ESLint - Pluggable JavaScript Linter](https://eslint.org/docs/latest/user-guide/)

配置选项：[List of available rules - ESLint 中文](https://cn.eslint.org/docs/rules/)

## 什么是 ESLint？

ESLint 是一个用来识别 ECMAScript/JavaScript 并且按照规则给出报告的代码检测工具，他就是一个插件化的 javascript 代码检测**工具**。

代码检查是一种静态的分析，常用于寻找有问题的模式或者代码，并且不依赖于具体的编码格式。对大多数编程语言来说都会有代码检查，一般编译程序会内置检查工具。

JavaScript 是一个动态的弱型语言，在开发过程中比较容易出错。因为没有编译，为了寻找 JavaScript 代码错误同好穿那个需要在执行过程中不断的调试。

**ESLint 和 JSLint、JSHint 的区别：**

1.ESLint 使用 Espree 解析 JavaScript。

2.ESLint 使用 AST 去分析代码中的模式。

3.ESLint 是完全插件化的。每一个规则都是一个插件并且你可以在运行时添加更多的规则。

## ESLint 的特点：

1.内置规则和自定义规则共用一套规则 API。

2.内置的格式化方法和自定义的格式化方法共用一套格式化 API。

3.额外的规则和格式化方法能够在运行时指定。

4.用户可以将结果设置成警告或者错误。

5.每条规则都是各自独立的，可以根据项目情况选择开启或关闭。

## ESLint 的(用户指南)安装和配置：

[Getting Started with ESLint - ESLint 中文](https://cn.eslint.org/docs/user-guide/getting-started)

```bash
npm install eslint         #安装到命令行目前所在目录下
npm install -g eslint      #-g（global）全局安装
                           可以通过npm config set prefix设置下载路径
npm install -save eslint   #-save表示将包安装到当前项目的node_modules文件下
                           并在pakeage文件的dependencies节点写入依赖
npm install -save-dev      #-save-dev将包安装在当前项目的node_modules文件夹下
                           并在写入pakeage文件的dependencies字段中
```

## ESLint 生成配置文件：

如果全局安装了 eslint，我们可以使用以下命令生成配置文件：

```bash
$ eslint --init
```

如果是已在项目中安装了 eslint，则需要在终端中输入下列命令，生存配置文件：

```bash
$ ./node_modules/.bin/eslint --init
```

后面按命令提示生成

### 配置文件优先级：

[`.eslintrc.*`](https://cn.eslint.org/docs/user-guide/configuring#configuration-file-formats)

`ESLint` 支持几种格式的配置文件。

现在存在一个问题，如果同个目录下有多个 `ESLint` 文件，它们会如何执行，优先级如何？

ESLint [源码]([源码 (github.com)](https://github.com/eslint/eslint/blob/v6.0.1/lib/cli-engine/config-array-factory.js#L52))中给出了我们答案，其优先级配置如下：

```js
const configFilenames = [
	".eslintrc.js",
	".eslintrc.yaml",
	".eslintrc.yml",
	".eslintrc.json",
	".eslintrc",
	"package.json",
];
```

### 配置文件的配置字段：[配置文件 - ESLint - 可插入 JavaScript Linter](https://eslint.org/docs/latest/user-guide/configuring/configuration-files)

最简单的配置方法是设置一个 .`eslintrc` JSON 文件，其中可以描述所有的 linting 规则。

`.eslintrc` 的一个示例：

```json
{
	"env": {
		"node": true,
		"browser": true
	},
	"rules": {
		"no-console": 0,
		"space-infix-ops": "error",
		"quotes": [
			"error",
			"single",
			{
				"avoidEscape": true,
				"allowTemplateLiterals": true
			}
		],
		"space-before-blocks": ["error", "always"],
		"semi": ["error", "never"]
	},
	"plugins": []
}
```

#### **主要字段：**

- `root` — 为 `true` 时，停止向上查找父级目录中的配置文件：表示当前目录为根目录，ESLint 规则被限制到该目录下

- `env` — 指定脚本的运行环境：启用 ESLint 规则将被限制到该目录下：[语言选项 - ESLint - 可插拔的 JavaScript Linter](https://eslint.org/docs/latest/user-guide/configuring/language-options#specifying-environments) | [语言选项 - ESLint - 可插拔的 JavaScript Linter](https://eslint.org/docs/latest/user-guide/configuring/language-options#using-configuration-files)

- extends — 配置文件扩展，就可以继承另一个配置文件的所有特征（包括规则、插件和语言选项）并修改所有选项(基础配置需要继承的配置)：[扩展配置文件](https://eslint.org/docs/latest/user-guide/configuring/configuration-files#extending-configuration-files)

- `rules` — 自定义规则：需要修改的启用规则及其各自的错误级别

  https://cn.eslint.org/docs/rules/ | [规则 - ESLint - 可插拔的 JavaScript Linter](https://eslint.org/docs/latest/user-guide/configuring/rules) | [规则 - ESLint - 可插拔的 JavaScript Linter](https://eslint.org/docs/latest/rules/)

  - **rules 基本配置规则：**

    在决定要包含哪些规则之后，您必须设置这些错误级别：

    - `0` 或 `"off"` — 关闭规则

    - `1` 或 `"warn"`— 开启规则作为警告（不会导致程序停止运行或退出）

    - `2` 或 `"error"` — 开启规则作为错误（触发后，程序停止运行或退出）

    错误和警告之间的区别在于 eslint 完成时将具有的退出代码。如果发现任何错误，eslint 将以 `1` 退出代码退出，否则将以 `0` 退出。

    如果在生成步骤中进行 lint，这允许控制哪些规则应**破坏生成**，哪些规则应视为警告。

- `plugins` — 插件配置：[语言选项 - ESLint - 可插拔的 JavaScript Linter](https://eslint.org/docs/latest/user-guide/configuring/language-options#using-a-plugin) | [插件相关配置：包括解析器 parse、处理器 processor]([Plugins - ESLint - Pluggable JavaScript Linter](https://eslint.org/docs/latest/user-guide/configuring/plugins))

  - **将 ESLint 与您喜欢的编码风格结合使用**

    ESLint 个人并不提倡任何编码风格。您可以设置 `.eslintrc` 文件以使用您喜欢的[样式规则](https://eslint.org/docs/rules/#stylistic-issues)强制编码样式。

    您还可以将 ESLint 与样式指南（如 [Airbnb](https://github.com/airbnb/javascript)、[JavaScript 标准风格](https://standardjs.com/)）一起使用。

    你还必须使用额外的插件，例如：

    - Airbnb 的插件 [`eslint-config-airbnb-base`](https://www.npmjs.com/package/eslint-config-airbnb-base)。
    - JavaScript 标准风格 [eslint-config-standard](https://github.com/feross/eslint-config-standard)
    - 一些流行库的插件：[Vue](https://www.npmjs.com/package/eslint-plugin-vue) | [React](https://www.npmjs.com/package/eslint-plugin-react)

- `process` — 处理器：希望利用 Eslint 来约束我们的 框架 代码(比如 vue/react 框架)，配合 plugins 使用：[Plugins - ESLint - Pluggable JavaScript Linter](https://eslint.org/docs/latest/user-guide/configuring/plugins#specifying-processor)

- `parser` — 指定和自定义解析器：[Plugins - ESLint - Pluggable JavaScript Linter](https://eslint.org/docs/latest/user-guide/configuring/plugins#specifying-parser)、[使用自定义解析器 - ESLint - 可插入的 JavaScript Linter](https://eslint.org/docs/latest/developer-guide/working-with-custom-parsers)

- `parserOptions` — 指定解析器选项：[语言选项 - ESLint - 可插拔的 JavaScript Linter](https://eslint.org/docs/latest/user-guide/configuring/language-options#specifying-parser-options)

- `globals` — 脚本在执行期间访问的额外的全局变量：[语言选项 - ESLint - 可插拔的 JavaScript Linter](https://eslint.org/docs/latest/user-guide/configuring/language-options#specifying-globals)

- `overrides` — 针对不同的文件进行不同的 Lint 配置：[Configuration Files - ESLint - Pluggable JavaScript Linter](https://eslint.org/docs/latest/user-guide/configuring/configuration-files#configuration-based-on-glob-patterns)

  - 我们项目中存在一些以  `.test`、`.spec`  结尾的测试文件，那么此时我们希望这些测试文件可以拥有不同的 Lint 配置规则

- `ignorePatterns` — 忽略代码选项：[忽略代码 - ESLint - 可插拔 JavaScript Linter](https://eslint.org/docs/latest/user-guide/configuring/ignoring-code)

## ESLint CLI：

命令行界面文档：[命令行界面 - ESLint - 可插拔 JavaScript Linter](https://eslint.org/docs/latest/user-guide/command-line-interface)

ESLint 附带一个命令行界面（CLI），用于 lint 文件或目录。

```bash
$ eslint index.js
```

前面示例中我们已经看到，运行命令后生成的输出将按文件分组，并将指定 `line:column` 警告/错误、错误原因以及每个故障的规则名称。

## 项目运行的检查命令配置：

项目的 `package.json`，在 `scripts` 字段里面添加以下脚本：

```json
{
	"scripts": {
		"lint": "eslint **/*.js",
		"lint-html": "eslint **/*.js -f html -o ./reports/lint-results.html",
		"lint-fix": "eslint --fix **/*.js"
	}
}
```

我们将该规则应用于以下文件：

```js
var a = 1;
console.log(1);
```

## VSCode 编辑器的 ESLint 的插件：ESLint

ESLint 插件的配置文档（包括了版本说明和配置选项 - Settings Options）：[ESLint - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

**这里以 vscode 编辑器设置为例进行说明：**

VSCode 编辑器有两种配置，一是编辑器配置，二是项目工作区配置：

**编辑器全局配置：**

1. 三种打开设置方式：

   - ``文件->首选项 -> 设置 -> 搜索 ESLint`

   - `左下角设置图标 -> 设置 -> 搜索 ESLint`

   - 快捷键：`ctrl+shift+p` ，然后搜索：Settings -> 选择 -> 首选项：打开设置 -> 搜索 Prettier - > 可以找到并点击 <u>在 settings.json 中编辑</u>

**项目工作区配置：**

- 1.工作区 或 项目里新建文件夹和文件：.vscode -> settings.json

- 2.然后在 settings.json 填写配置

插件配置和.eslintrc 配置文件一样

## 团队 ESLint 规范示例：

[AlloyTeam](https://github.com/AlloyTeam) 给出的 React/Vue/TypeScript 项目的渐进式 ESLint 配置（[eslint-config-alloy](https://github.com/AlloyTeam/eslint-config-alloy)），以下贴出 React 的一小部分配置：

```js
module.exports = {
	parserOptions: {
		babelOptions: {
			presets: ["@babel/preset-react"],
		},
	},
	plugins: ["react"],
	rules: {
		/**     * 布尔值类型的 propTypes 的 name 必须为 is 或 has 开头     * @reason 类型相关的约束交给 TypeScript     */
		"react/boolean-prop-naming": "off",
		/**     * <button> 必须有 type 属性     */
		"react/button-has-type": "off",
		/**     * 一个 defaultProps 必须有对应的 propTypes     * @reason 类型相关的约束交给 TypeScript     */
		"react/default-props-match-prop-types": "off",
		/**     * props, state, context 必须用解构赋值     */
		"react/destructuring-assignment": "off",
		/**     * 组件必须有 displayName 属性     * @reason 不强制要求写 displayName     */
		"react/display-name": "off",
		// ...
	},
};
```

## ESLint 插件开发

**插件开发文档：[使用插件 - ESLint - 最新文档](https://eslint.org/docs/latest/developer-guide/working-with-plugins)、[Working with Plugins - ESLint 中文文档](https://cn.eslint.org/docs/developer-guide/working-with-plugins)**
