# 02_Prettier-前端代码格式化工具

GitHub：[https://github.com/prettier/prettier](https://github.com/prettier/prettier)

官网：[https://prettier.io/](https://prettier.io/)

官网文档：[https://prettier.io/docs/en/index.html](https://prettier.io/docs/en/index.html)

官网在线试用配置工具：[Prettier v2.7.1](https://prettier.io/playground/)

中文网：[Prettier 中文网](https://www.prettier.cn/)

中文网文档：[What is Prettier? · Prettier 中文网](https://www.prettier.cn/docs/index.html)

中文网在线试用配置工具：[Prettier v2.5.1](https://www.prettier.cn/playground/)

## 01.什么是 prettier

prettier 是一个代码格式化工具，支持下列编程语言的代码格式化

- JavaScript (including experimental features)
- [JSX](https://facebook.github.io/jsx/)
- [Angular](https://angular.io/)
- [Vue](https://vuejs.org/)
- [Flow](https://flow.org/)
- [TypeScript](https://www.typescriptlang.org/)
- CSS, [Less](https://lesscss.org/), and [SCSS](https://sass-lang.com/)
- [HTML](https://en.wikipedia.org/wiki/HTML)
- [JSON](https://json.org/)
- [GraphQL](https://graphql.org/)
- [Markdown](https://commonmark.org/), including [GFM](https://github.github.com/gfm/) and [MDX](https://mdxjs.com/)
- [YAML](https://yaml.org/)

和其他 lint 工具比如 eslint 的区别

prettier 的配置项比较少（容易配置），且只专注于代码样式，而 eslint 还提供语法检查，现在的 eslint 也集成了 formatter 功能。

eslint 能做的显然更多更杂，prettier 的出现是为了降低 eslint 的工作量，减少 eslint 的配置。

prettier 相比 eslint 支持更多文件的格式化。

也支持目前市面上所有主流的编辑器：

## 02.使用方法

### prettier 的使用可分为两种方式：

#### **1、使用编辑器的插件**

使用编辑器插件是最为方便的一种方法，编写完代码，只需要一键即可格式化编写的代码，非常方便。

##### 在插件市场搜索`Prettier`：选择 `Prettier - Code formatter` 插件安装后，进行以下配置：

在项目根目录中新建 perttier 的默认配置文件，能够写入 YML、JSON 的配置格式，并且支持.yaml/.yml/.json/.js 后缀，也可以不带后缀；： `.prettierrc` 文件，写入配置：

```json
// .prettierrc 文件
{
 "extends": [
 "airbnb",
 "prettier",
 "prettier/vue"
 ],
 "semi": false, // 结尾不用分号, 默认true
 "singleQuote": true, // 使用单引号代替双引号，默认false(在jsx中配置无效, 默认都是双引号)
 "trailingComma": "all" | "es5" | "none", // 多行语法中的最后一行是否添加逗号
 "printWidth": 200, // 超过最大值换行
 "htmlWhitespaceSensitivity": "ignore",
 "disableLanguages": ["vue"] // 不格式化vue文件，vue文件的格式化单独设置
 "bracketSpacing": true // 对象中的空格 默认true
 "tabWidth": 2,  // tab缩进大小,默认为2
  "useTabs": false, // 使用tab缩进，默认false
  "jsxBracketSameLine": false, // 在jsx中把'>' 是否单独放一行
  "jsxSingleQuote": false, // 在jsx中使用单引号代替双引号
  "proseWrap": 'preserve', // "always" - 当超出print width（上面有这个参数）时就折行 "never" - 不折行 "perserve" - 按照文件原样折行
  "trailingComma": 'none', // 对象最后一项默认格式化会加逗号
  "arrowParens": 'avoid', // 箭头函数参数括号 默认avoid 可选 avoid(能省略括号的时候就省略)| always(总是有括号)
  "bracketSpacing": true, // 对象中的空格 默认true{ foo: bar } false:{foo: bar}
  "printWidth": 100 // 一行多长，超过的会换行
};
```

**vscode 编辑器设置为例进行说明：**

VSCode 编辑器有两种配置，一是编辑器配置，二是项目工作区配置：

**编辑器全局配置设置：**

1. 三种打开设置方式：

   - ``文件->首选项 -> 设置 -> 搜索 Prettier`

   - `左下角设置图标 -> 设置 -> 搜索 Prettier`

   - 快捷键 `ctrl+shift+p` ，然后搜索：Settings -> 选择 -> 首选项：打开设置 -> 搜索 Prettier - > 可以找到并点击 <u>在 settings.json 中编辑</u>

**项目工作区配置：**

- 1.工作区 或 项目里新建文件夹和文件：.vscode -> settings.json

- 2.然后在 settings.json 填写配置

> Prettierc 配置可以配合 VSCode 编辑器的保存时格式化代码使用：和上面 `编辑器全局配置设置` 步骤，最后一步搜索 save - >勾选 `Editor: Format On Save`

下面的 VSCode 的 setting.json 配置是我自己的对于 HTML/CSS/JS/LESS 文件的 prettier 格式化规则：

```json
{
	// 使能每一种语言默认格式化规则
	"[html]": {
		"editor.defaultFormatter": "esbenp.prettier-vscode"
	},
	"[css]": {
		"editor.defaultFormatter": "esbenp.prettier-vscode"
	},
	"[less]": {
		"editor.defaultFormatter": "esbenp.prettier-vscode"
	},
	"[javascript]": {
		"editor.defaultFormatter": "esbenp.prettier-vscode"
	},

	/*  prettier的配置 */
	"prettier.printWidth": 100, // 超过最大值换行
	"prettier.tabWidth": 4, // 缩进字节数
	"prettier.useTabs": false, // 缩进不使用tab，使用空格
	"prettier.semi": true, // 句尾添加分号
	"prettier.singleQuote": true, // 使用单引号代替双引号
	"prettier.proseWrap": "preserve", // 默认值。因为使用了一些折行敏感型的渲染器（如GitHub comment）而按照markdown文本样式进行折行
	"prettier.arrowParens": "avoid", //  (x) => {} 箭头函数参数只有一个时是否要有小括号。avoid：省略括号
	"prettier.bracketSpacing": true, // 在对象，数组括号与文字之间加空格 "{ foo: bar }"
	"prettier.disableLanguages": ["vue"], // 不格式化vue文件，vue文件的格式化单独设置
	"prettier.endOfLine": "auto", // 结尾是 \n \r \n\r auto
	"prettier.eslintIntegration": false, //不让prettier使用eslint的代码格式进行校验
	"prettier.htmlWhitespaceSensitivity": "ignore",
	"prettier.ignorePath": ".prettierignore", // 不使用prettier格式化的文件填写在项目的.prettierignore文件中
	"prettier.jsxBracketSameLine": false, // 在jsx中把'>' 是否单独放一行
	"prettier.jsxSingleQuote": false, // 在jsx中使用单引号代替双引号
	"prettier.parser": "babylon", // 格式化的解析器，默认是babylon
	"prettier.requireConfig": false, // Require a 'prettierconfig' to format prettier
	"prettier.stylelintIntegration": false, //不让prettier使用stylelint的代码格式进行校验
	"prettier.trailingComma": "es5", // 在对象或数组最后一个元素后面是否加逗号（在ES5中加尾逗号）
	"prettier.tslintIntegration": false // 不让prettier使用tslint的代码格式进行校验
}
```

上面只是一些基本的语言的格式化规范，prettier 每一个属性的配置都有详细的说明，可以根据自己的情况进行调整。

相信每个在 vscode 上编写 vue 的都会下载 Vetur 插件，它目前是 vscode 上面最好用的一款 vue 插件。现在要说的是，如何使用 prettier 格式化 vue 的代码。你没法使用类似格式化 html/css/js 的方式来格式化 vue 格式的代码，像下面这样子的：

```json
{
	"[vue]": {
		"editor.defaultFormatter": "esbenp.prettier-vscode"
	}
}
```

这样 prettier 是不认识的。不过幸运的是，Vetur 插件内部默认使用 prettier 进行格式化的，但是由于 Vetur 的默认格式化配置与我们期望的有所出入，所以我们需要单独对 Vetur 的 prettier 进行配置，如下：

```json
{
	"vetur.format.defaultFormatter.html": "prettier",
	"vetur.format.defaultFormatter.js": "prettier",
	"vetur.format.defaultFormatter.less": "prettier",
	"vetur.format.defaultFormatterOptions": {
		"prettier": {
			"printWidth": 160,
			"singleQuote": true, // 使用单引号
			"semi": true, // 末尾使用分号
			"tabWidth": 4,
			"arrowParens": "avoid",
			"bracketSpacing": true,
			"proseWrap": "preserve" // 代码超出是否要换行 preserve保留
		}
	}
}
```

这些配置是不会和之前配置的 prettier 规则冲突的。

值得提一句的是，Vetur 对于 html 文件默认使用的是 prettyhtml，但是由于 prettier 也可以支持 html 的格式化，所以我觉得统一使用 prettier 对全语言的格式化是比较简洁的，也希望 prettier 能够对更多的语言进行支持。

#### **2、使用脚本的方式**

这种方式就是使用 prettier 指令在命令行窗口对单一文件进行格式化。

首先需要安装 prettier 全局指令：

```bash
npm install -g prettier
```

可以使用  **prettier -v**  检查是否安装完成。

安装好之后，使用下面指令对 xxx.js 文件进行格式化（使用的是 prettier 默认的配置规则）。

```bash
// prettier--write <文件路劲+文件名>

prettier --write ./xxx.js
```

当然，默认的配置规则是不符合我们的需求的，我们需要自定义配置规则。

书写自定义规则的文件需要是下面几种文件和格式：

- `.prettierrc`  文件，支持 yaml 和 json 格式；或者加上 .yaml/.yml/.json 后缀名
- `.prettierrc.toml`  文件（当为 toml 格式的时候，后缀是必须的）
- `prettier.config.js`  或者 .prettierrc.js，需要返回一个对象
- `package.json`  文件中加上"prettier"属性

在项目中，安装到开发依赖上

```bash
npm install --save-dev --save-exact prettier
```

##### 忽略不想格式化的文件

项目根目录创建 [.prettierignore](https://prettier.io/docs/en/ignore.html) 文件，忽略你不希望格式化的文件，node_modules 是默认会被忽略的目录。

他的用法就类似于`.gitignore`，下面是官方给的例子

```bash
# Ignore artifacts:
node_modules
dist
public
.vscode
```

##### 命令行执行格式化

在项目中手动调用 prettier 命令行进行格式化

```bash
npx prettier --write .
```

提前查看会格式化哪些文件，不实际执行格式化

```bash
npx prettier --check .
```

实际使用过程中，还是直接用编辑器的插件的，设置成保存的时候执行格式化。

### 解决 prettier 插件 和 eslint 的冲突

- 安装 [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier%23installation)，这个插件会把 eslint 中可能导致冲突的规则关掉

  - ```shell
    yarn add --dev eslint-config-prettier eslint-plugin-prettier
    ```

  - `eslint-config-prettier`：是一个 eslint 配置，把 eslint 里所有和 prettier 冲突的配置都关闭，需要在`.eslintrc.*`文件里加下 extends 的选项（**要放最底下**，这样才能进行全面覆盖）：

  - ```json
    // .eslintrc.*

    {
      // ...其他配置
      extends: [
          'eslint:recommended',
          'pluin:vue/essential',
          'plugin:prettier/recommended'
      ],
      // ...
    }


    // 上面plugin:prettier/recommended的原子配置
    {
      "extends": ["prettier"],        // 生效 eslint-config-prettier 屏蔽配置
      "plugins": ["prettier"],        // 生效 eslint-plugin-prettier 提示配置
      "rules": {
        "prettier/prettier": "error",   // prettier报错的级别，红色波浪线
        "arrow-body-style": "off",      // 冲突无法解决，直接关闭
        "prefer-arrow-callback": "off"  // 冲突无法解决，直接关闭
      }
    }
    ```

  - `eslint-plugin-prettier`：eslint 的插件，可以让 eslint 用 prettier 的配置来进行**错误提示**，如下图所示，只要提示框中有`eslint(prettier/prettier)`  就说明这个插件生效了。

  - ![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c7143f3a262e41a78e59ad7070a4ec9d~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

- 或者在.eslintrc.js 里面的 rules 选项配置：`"space-before-function-paren": "off"`，然后重启项目

### git hooks

可以设置在 git 提交之前执行一次格式化( **pre-commit hook** )，这样我们仓库里的代码就都是格式化好的了。

只需要在 package.json 里面加入一些配置。

```json
{
	"husky": {
		"hooks": {
			"pre-commit": "lint-staged"
		}
	},
	"lint-staged": {
		"**/*": "prettier --write --ignore-unknown"
	}
}
```

**如果你使用 eslint，请确保 lint-staged 里，eslint 的执行顺序放在前面**

需要安装[husky](https://github.com/typicode/husky) 和 [lint-staged](https://github.com/okonet/lint-staged)这两个依赖才能实现，其中 husky 是帮助我们添加 git hooks 的工具，而 lint-staged 则是筛选那些 staged 的 git 文件执行 lint。

执行`npx mrm lint-staged`就会把两个工具都安装好。

### 用注释忽略格式化代码

`// prettier-ignore`注释会忽略抽象语法树下一行代码的格式化

举个例子

```js
matrix(1, 0, 0, 0, 1, 0, 0, 0, 1);

// prettier-ignore
matrix(
  1, 0, 0,
  0, 1, 0,
  0, 0, 1
)
```

执行 prettier 格式化后:

```js
matrix(1, 0, 0, 0, 1, 0, 0, 0, 1);

// prettier-ignore
matrix(
  1, 0, 0,
  0, 1, 0,
  0, 0, 1
)
```

#### JSX 中的注释

```jsx
<div>
	{/* prettier-ignore */}
	<span     ugly  format=''   />
</div>
```

#### HTML 中的注释

```html
<!-- prettier-ignore -->
<div         class="x"       >hello world</div            >

<!-- prettier-ignore-attribute -->
<div
	(mousedown)="       onStart    (    )         "
	(mouseup)="         onEnd      (    )         "
></div>

<!-- prettier-ignore-attribute (mouseup) -->
<div
	(mousedown)="onStart()"
	(mouseup)="         onEnd      (    )         "
></div>
```

#### CSS 中的注释

```css
/* prettier-ignore */
.my    ugly rule
{

}
```

#### MarkDown 中的注释

```markdown
<!-- prettier-ignore -->
Do   not    format   this
```

#### 忽略一定范围的代码

_available in v1.12.0+_

通常实在文件顶部使用来取消一些自动生成内容的格式化

比如 markdown 里的 toc 和表格等

```html
<!-- prettier-ignore-start -->
<!-- SOMETHING AUTO-GENERATED BY TOOLS - START -->

| MY | AWESOME | AUTO-GENERATED | TABLE | |-|-|-|-| | a | b | c | d |

<!-- SOMETHING AUTO-GENERATED BY TOOLS - END -->
<!-- prettier-ignore-end -->
```

#### YAML

```yaml
# prettier-ignore
key  : value
hello: world
```

#### GraphQL

```bash
{
  # prettier-ignore
  addReaction(input:{superLongInputFieldName:"MDU6SXNzdWUyMzEzOTE1NTE=",content:HOORAY}) {
    reaction {content}
  }
}
```

#### Handlebars

```jsx
{{! prettier-ignore }}
<div>
  "hello! my parent was ignored"
  {{#my-crazy-component     "shall"     be="preserved"}}
    <This
      is  =  "also preserved as is"
    />
  {{/my-crazy-component}}
</div>
```

## 03.使用配置文件进行配置

最推荐的使用方式是使用配置文件。

prettier 支持的配置文件的优先级如下，它使用 [cosmiconfig](https://github.com/davidtheclark/cosmiconfig)提供配置文件支持的：

- A `"prettier"` key in your `package.json` file.
- A `.prettierrc` file written in JSON or YAML.
- A `.prettierrc.json`, `.prettierrc.yml`, `.prettierrc.yaml`, or `.prettierrc.json5` file.
- A `.prettierrc.js`, `.prettierrc.cjs`, `prettier.config.js`, or `prettier.config.cjs` file that exports an object using `module.exports`.
- A `.prettierrc.toml` file.

这里我使用 `.prettierrc.js`来配置，因为偏好 json 那种风格的配置文件，但是 json 有个最大的问题是不支持注释。所以我这里用了 js，把每一项都写上了注释，方便以后改的时候查看。

vscode 读取这种单独配置文件的优先级会高于插件内配置。

### 可配置选项

```js
module.exports = {
	// 1.一行代码的最大字符数，默认是80(printWidth: <int>)
	printWidth: 80,
	// 2.tab宽度为2空格(tabWidth: <int>)
	tabWidth: 2,
	// 3.是否使用tab来缩进，我们使用空格(useTabs: <bool>)
	useTabs: false,
	// 4.结尾是否添加分号，false的情况下只会在一些导致ASI错误的其工况下在开头加分号，我选择无分号结尾的风格(semi: <bool>)
	semi: false,
	// 5.使用单引号(singleQuote: <bool>)
	singleQuote: true,
	// 6.object对象中key值是否加引号（quoteProps: "<as-needed|consistent|preserve>"）as-needed只有在需求要的情况下加引号，consistent是有一个需要引号就统一加，preserve是保留用户输入的引号
	quoteProps: "as-needed",
	// 7.在jsx文件中的引号需要单独设置（jsxSingleQuote: <bool>）
	jsxSingleQuote: false,
	// 8.尾部逗号设置，es5是尾部逗号兼容es5，none就是没有尾部逗号，all是指所有可能的情况，需要node8和es2017以上的环境。（trailingComma: "<es5|none|all>"）
	trailingComma: "es5",
	// 9.object对象里面的key和value值和括号间的空格(bracketSpacing: <bool>)
	bracketSpacing: true,
	// 10.jsx标签多行属性写法时，尖括号是否另起一行(jsxBracketSameLine: <bool>)
	jsxBracketSameLine: false,
	// 11.箭头函数单个参数的情况是否省略括号，默认always是总是带括号（arrowParens: "<always|avoid>"）
	arrowParens: "always",
	// 12.range是format执行的范围，可以选执行一个文件的一部分，默认的设置是整个文件（rangeStart: <int>  rangeEnd: <int>）
	rangeStart: 0,
	rangeEnd: Infinity,
	// 18. vue script和style标签中是否缩进,开启可能会破坏编辑器的代码折叠
	vueIndentScriptAndStyle: false,
	// 19.    endOfLine: "<lf|crlf|cr|auto>" 行尾换行符,默认是lf,
	endOfLine: "lf",
	// 20.embeddedLanguageFormatting: "off",默认是auto,控制被引号包裹的代码是否进行格式化
	embeddedLanguageFormatting: "off",
};

// 14. requirePragma: <bool>,格式化有特定开头编译指示的文件 比如下面两种
/** * @prettier */
// or
/** * @format */

// 15.insertPragma: <bool> 自当插入pragma到已经完成的format的文件开头

// 16. proseWrap: "<always|never|preserve>" 文章换行,默认情况下会对你的markdown文件换行进行format会控制在printwidth以内

// 13. 指定parser,因为pretter会自动选择,所以一般不用指定(parser: "<string>"  parser: require("./my-parser"))
// "babel" (via @babel/parser) Named "babylon" until v1.16.0
// "babel-flow" (same as "babel" but enables Flow parsing explicitly to avoid ambiguity) First available in v1.16.0
// "babel-ts" (similar to "typescript" but uses Babel and its TypeScript plugin) First available in v2.0.0
// "flow" (via flow-parser)
// "typescript" (via @typescript-eslint/typescript-estree) First available in v1.4.0
// "espree" (via espree) First available in v2.2.0
// "meriyah" (via meriyah) First available in v2.2.0
// "css" (via postcss-scss and postcss-less, autodetects which to use) First available in v1.7.1
// "scss" (same parsers as "css", prefers postcss-scss) First available in v1.7.1
// "less" (same parsers as "css", prefers postcss-less) First available in v1.7.1
// "json" (via @babel/parser parseExpression) First available in v1.5.0
// "json5" (same parser as "json", but outputs as json5) First available in v1.13.0
// "json-stringify" (same parser as "json", but outputs like JSON.stringify) First available in v1.13.0
// "graphql" (via graphql/language) First available in v1.5.0
// "markdown" (via remark-parse) First available in v1.8.0
// "mdx" (via remark-parse and @mdx-js/mdx) First available in v1.15.0
// "html" (via angular-html-parser) First available in 1.15.0
// "vue" (same parser as "html", but also formats vue-specific syntax) First available in 1.10.0
// "angular" (same parser as "html", but also formats angular-specific syntax via angular-estree-parser) First available in 1.15.0
// "lwc" (same parser as "html", but also formats LWC-specific syntax for unquoted template attributes) First available in 1.17.0
// "yaml" (via yaml and yaml-unist-parser) First available in 1.14.0

// 17. htmlWhitespaceSensitivity: "<css|strict|ignore>" html中的空格敏感性

// 针对不同文件或目录设置不同配置的方法,json格式例子
// {
//   "semi": false,
//   "overrides": [
//     {
//       "files": "*.test.js",
//       "options": {
//         "semi": true
//       }
//     },
//     {
//       "files": ["*.html", "legacy/**/*.js"],
//       "options": {
//         "tabWidth": 4
//       }
//     }
//   ]
// }
```

下面是精简版本，默认配置在我这里需要修改的只有两个选项

- semi,行末是否加分号，有以下几个原因让我选择 false

  1. 我主要使用的 vue 他的代码风格就是不加分号的，不加分号代码也能正常运行(因为编译器是自动给你加分号执行的)，只需要注意几个会出问题的点。
  2. 加分号会增加文件大小，写代码和删代码都需要多按麻烦
  3. 我常用的其他语言，比如 go，python 和 powershell 也可以不用分号

- 使用单引号而不是双引号，同理，vue 的代码风格使用的是单引号，很多 js 代码风格都是使用单引号

```js
module.exports = {
	semi: false,
	singleQuote: true,
};
```

关于 js 使用单引号的好处，为什么不用双引号

1. 首先，双引号其实是 c 语言（类 c++的 java，c#都是这样）带来的强迫症，c 语言用单引号表示单个字符，双引号表示字符串，c 语言区分这两个我猜是因为要斤斤计较内存的使用的缘故，编译的时候给单个字符内存分配和给字符串内存分配的占用是不同的。但是在 js，python 这些语言里面，单引号双引号都可以用字符串，就没必要一定遵循这个强迫症了。

2. shell 和 powershell 这两种语言里面用单引号表示纯字符串，双引号则是可以添加变量的字符串。因为这两种脚本也是比较常用的，为了统一，干脆所有字符串统一用单引号，双引号留着都不用，比如 powershell 脚本里面我也不用双引号，而是用 format 来格式化字符串。

3. 用单引号可以少按一个 shift，方便一些

4. html 中用的是双引号，所以 js 区分一下，用单引号。

其他默认的配置符合我使用习惯的也有可以讨论的：

关于 tab 用几个空格的讨论我选择用两个空格。

一般两个空格就是最小的缩进了，2 个空格和 4 个空格应该是主流的两种。在前端项目里面一般是两个空格。有以下的原因吧：

1. js 语言回调函数之类嵌套的场景比较多，如果用 4 空格缩进会占用过多的空间，2 空格就比较紧凑。
2. 2 空格输入和删除都更方便（虽然我都是用 tab 输出 2 空格），方便修改

缺点也是比较紧凑，看着容易累。

### 针对特定文件覆盖配置

把官方的例子搬了过来。这样就能针对不同文件进行配置了。

```json
{
	"semi": false,
	"overrides": [
		{
			"files": "*.test.js",
			"options": {
				"semi": true
			}
		},
		{
			"files": ["*.html", "legacy/**/*.js"],
			"options": {
				"tabWidth": 4
			}
		}
	]
}
```
