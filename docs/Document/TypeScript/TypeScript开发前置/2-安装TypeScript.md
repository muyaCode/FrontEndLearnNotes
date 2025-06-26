# 2-安装TypeScript

命令行运行如下命令，全局安装 TypeScript：

```sh
npm install -g typescript
```

安装完成后，在控制台运行如下命令，检查安装是否成功(3.x)：

```sh
# 查看 tsc 版本
tsc -v

# 编译 ts 文件
tsc fileName.ts
```

## typescript配置文件

生成配置文件

```bash
tsc --init
```

配置文件例子

```json
{
  "compilerOptions": {
    /* Basic Options */
    "target": "es5",                          /* Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017','ES2018' or 'ESNEXT'. 指定ECMAScript的目标版本*/
    "module": "commonjs",                     /* Specify module code generation: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', or 'ESNext'. 指定模块代码的生成方式*/
    // "lib": [],                             /* Specify library files to be included in the compilation. 指定编译的时候用来包含的编译文件*/
    // "allowJs": true,                       /* Allow javascript files to be compiled. 允许编译JS文件*/
    // "checkJs": true,                       /* Report errors in .js files. 在JS中包括错误*/
    // "jsx": "preserve",                     /* Specify JSX code generation: 'preserve', 'react-native', or 'react'. 指定JSX代码的生成方式 是保留还是react-native或者react*/
    // "declaration": true,                   /* Generates corresponding '.d.ts' file.生成相应的类型声明文件 */
    // "declarationMap": true,                /* Generates a sourcemap for each corresponding '.d.ts' file. 为每个类型声明文件生成相应的sourcemap*/
    // "sourceMap": true,                     /* Generates corresponding '.map' file. 生成对应的map文件 */
    // "outFile": "./",                       /* Concatenate and emit output to single file. 合并并且把编译后的内容输出 到一个文件里*/
    // "outDir": "./",                        /* Redirect output structure to the directory.按原始结构输出到目标目录 */
    // "rootDir": "./",                       /* Specify the root directory of input files. Use to control the output directory structure with --outDir. 指定输入文件的根目录，用--outDir来控制输出的目录结构*/
    // "composite": true,                     /* Enable project compilation 启用项目编译*/
    // "removeComments": true,                /* Do not emit comments to output. 移除注释*/
    // "noEmit": true,                        /* Do not emit outputs. 不要输出*/
    // "importHelpers": true,                 /* Import emit helpers from 'tslib'. */
    // "downlevelIteration": true,            /* Provide full support for iterables in 'for-of', spread, and destructuring when targeting 'ES5' or 'ES3'. 当目标是ES5或ES3的时候提供对for-of、扩展运算符和解构赋值中对于迭代器的完整支持*/
    // "isolatedModules": true,               /* Transpile each file as a separate module (similar to 'ts.transpileModule').r把每一个文件转译成一个单独的模块 */

    /* Strict Type-Checking Options */
    //"strict": true,                           /* Enable all strict type-checking options. 启用完全的严格类型检查 */
    // "noImplicitAny": true,                 /* Raise error on expressions and declarations with an implied 'any' type. 不能使用隐式的any类型*/
    // "strictNullChecks": true,              /* Enable strict null checks. 启用严格的NULL检查*/
    // "strictFunctionTypes": true,           /* Enable strict checking of function types. 启用严格的函数类型检查*/
    // "strictBindCallApply": true,           /* Enable strict 'bind', 'call', and 'apply' methods on functions.启用函数上严格的bind call 和apply方法 */
    // "strictPropertyInitialization": true,  /* Enable strict checking of property initialization in classes. 启用类上初始化属性检查*/
    // "noImplicitThis": true,                /* Raise error on 'this' expressions with an implied 'any' type.在默认的any中调用 this表达式报错 */
    // "alwaysStrict": true,                  /* Parse in strict mode and emit "use strict" for each source file. 在严格模式下解析并且向每个源文件中发射use strict*/

    /* Additional Checks */
    // "noUnusedLocals": true,                /* Report errors on unused locals. 有未使用到的本地变量时报错 */
    // "noUnusedParameters": true,            /* Report errors on unused parameters. 有未使用到的参数时报错*/
    // "noImplicitReturns": true,             /* Report error when not all code paths in function return a value. 当不是所有的代码路径都有返回值的时候报错*/
    // "noFallthroughCasesInSwitch": true,    /* Report errors for fallthrough cases in switch statement. 在switch表达式中没有替代的case会报错 */

    /* Module Resolution Options */
    // "moduleResolution": "node",            /* Specify module resolution strategy: 'node' (Node.js) or 'classic' (TypeScript pre-1.6). 指定模块的解析策略 node classic*/
    // "baseUrl": "./",                       /* Base directory to resolve non-absolute module names. 在解析非绝对路径模块名的时候的基准路径*/
    // "paths": {},                           /* A series of entries which re-map imports to lookup locations relative to the 'baseUrl'. 一些路径的集合*/
    // "rootDirs": [],                        /* List of root folders whose combined content represents the structure of the project at runtime. 根目录的列表，在运行时用来合并内容*/
    // "typeRoots": [],                       /* List of folders to include type definitions from. 用来包含类型声明的文件夹列表*/
    // "types": [],                           /* Type declaration files to be included in compilation.在编译的时候被包含的类型声明 */
    // "allowSyntheticDefaultImports": true,  /* Allow default imports from modules with no default export. This does not affect code emit, just typechecking.当没有默认导出的时候允许默认导入，这个在代码执行的时候没有作用，只是在类型检查的时候生效 */
    //"esModuleInterop": true                   /* Enables emit interoperability between CommonJS and ES Modules via creation of namespace objects for all imports. Implies 'allowSyntheticDefaultImports'.*/
    // "preserveSymlinks": true,              /* Do not resolve the real path of symlinks.不要symlinks解析的真正路径 */

    /* Source Map Options */
    // "sourceRoot": "",                      /* Specify the location where debugger should locate TypeScript files instead of source locations. 指定ts文件位置*/
    // "mapRoot": "",                         /* Specify the location where debugger should locate map files instead of generated locations. 指定 map文件存放的位置 */
    // "inlineSourceMap": true,               /* Emit a single file with source maps instead of having a separate file. 源文件和sourcemap 文件在同一文件中，而不是把map文件放在一个单独的文件里*/
    // "inlineSources": true,                 /* Emit the source alongside the sourcemaps within a single file; requires '--inlineSourceMap' or '--sourceMap' to be set. 源文件和sourcemap 文件在同一文件中*/

    /* Experimental Options */
    // "experimentalDecorators": true,        /* Enables experimental support for ES7 decorators. 启动装饰器*/
    // "emitDecoratorMetadata": true,         /* Enables experimental support for emitting type metadata for decorators. */
  }
}
```

## 工具平台

开源地址：https://github.com/Microsoft/TypeScript

官网

- https://www.tslang.cn/

- http://www.typescriptlang.org/

演练场：https://www.typescriptlang.org/zh/play

运行Viewer：te-ast-viewer.com

## 环境搭建和编译

### 0.安装node



### 1.安装TypeScript

nodejs环境下

- npm install -g typescript

- npm i -g typescript

homebrew环境

- ruby -e "url"

### 2.安装node 运行ts文件 依赖

```bash
npm install -g ts-node
```

### 3.TypeScript项目配置文件初始化 生成tsconfig.json文件

- tsc --init

- 配置文档：https://www.tslang.cn/docs/handbook/tsconfig-json.html

### 4.运行调试

```bash
ts-node hello.ts
```

### 5.编译文件和相关选项

#### 编译成js命令

```bash
tsc hello.ts
```

#### 保存自动编译

##### 单个监视

- tsc hello.ts -w
  - 监视编译

##### 多个监视

- 1.根目录新建tsconfig.json 配置文件

  - https://www.tslang.cn/docs/handbook/tsconfig-json.html

  - 配置可以只写空对象
    - { }

  - 详细配置

    - "compilerOptions"

      - ​    // 编译器选项    "compilerOptions": {        "target": "ES5", // 编译成的ES版本        "module": "commonjs", // 模块化规范        ...    },

      - 子选项

        - 常用

          - target

            - 设置ts代码编译的目标版本

            - 可选值：
              - ES3（默认）、ES5、ES6/ES2015、ES7/ES2016、ES2017、ES2018、ES2019、ES2020、ESNext

            - 示例：
              - "compilerOptions": {    "target": "ES6" }
                - 编译成ES6版本的js

          - lib

            - 指定代码运行时所包含的库（宿主环境）

            - 可选值：
              - ES5、ES6/ES2015、ES7/ES2016、ES2017、ES2018、ES2019、ES2020、ESNext、DOM、WebWorker、ScriptHost ......

            - 示例：
              - "compilerOptions": {    "target": "ES6",    "lib": ["ES6", "DOM"],    "outDir": "dist",    "outFile": "dist/aa.js" }

          - module

            - 设置编译后代码使用的模块化系统

            - 可选值：
              - CommonJS、UMD、AMD、System、ES2020、ESNext、None

            - 示例：
              - "compilerOptions": {    "module": "CommonJS" }

          - outDir

            - 编译后文件的所在目录

            - 默认情况下，编译后的js文件会和ts文件位于相同的目录，设置outDir后可以改变编译后文件的位置

            - 示例：
              - "compilerOptions": {    "outDir": "dist" }
                - 设置后编译后的js文件将会生成到dist目录

          - outFile

            - 将所有的文件编译为一个js文件

            - 默认会将所有的编写在全局作用域中的代码合并为一个js文件，如果module制定了None、System或AMD则会将模块一起合并到文件之中

            - 示例：
              - "compilerOptions": {    "outFile": "dist/app.js" }

          - rootDir

            - 指定代码的根目录，默认情况下编译后文件的目录结构会以最长的公共目录为根目录，通过rootDir可以手动指定根目录

            - 示例：
              - "compilerOptions": {    "rootDir": "./src" }

          - allowJs
            - 是否对js文件编译

          - checkJs

            - 是否对js文件进行检查

            - 示例：
              - "compilerOptions": {    "allowJs": true,    "checkJs": true }

          - removeComments

            - 是否删除注释

            - 默认值：false

          - noEmit

            - 不对代码进行编译

            - 默认值：false

          - sourceMap

            - 是否生成sourceMap

            - 默认值：false

        - 严格检查

          - \- strict
            -   \- 启用所有的严格检查，默认值为true，设置后相当于开启了所有的严格检查

          - \- alwaysStrict
            -   \- 总是以严格模式对代码进行编译

          - \- noImplicitAny
            -   \- 禁止隐式的any类型

          - \- noImplicitThis
            -   \- 禁止类型不明确的this

          - \- strictBindCallApply
            -   \- 严格检查bind、call和apply的参数列表

          - \- strictFunctionTypes
            -   \- 严格检查函数的类型

          - \- strictNullChecks
            -   \- 严格的空值检查

          - \- strictPropertyInitialization
            -   \- 严格检查属性是否初始化

        - 额外检查

          - \- noFallthroughCasesInSwitch
            -   \- 检查switch语句包含正确的break

          - \- noImplicitReturns
            -   \- 检查函数没有隐式的返回值

          - \- noUnusedLocals
            -   \- 检查未使用的局部变量

          - \- noUnusedParameters
            -   \- 检查未使用的参数

        - 高级

          - \- allowUnreachableCode

            -   \- 检查不可达代码

            -   \- 可选值：

            - ​    \- true，忽略不可达代码

            - ​    \- false，不可达代码将引起错误

          - \- noEmitOnError

            -   \- 有错误的情况下不进行编译

            -   \- 默认值：false

      - compilerOptions 选项大全
        - https://www.tslang.cn/docs/handbook/compiler-options.html

    - "files"

      -    ` //     "files": [        "core.ts",        "sys.ts",    ]`

      - 指定被编译文件的列表，只有需要编译的文件少时才会用到

    - "include"
      - ​    `// 指定编译的目录下的ts文件    "include": [        // ** 表示任意目录  *表示任意文件        "src/**/*"     ],`

    - "exclude"
      - ​    `// 被排除的：不需要被编译的文件目录    "exclude": [        "node_modules",        "**/*.spec.ts"    ]`

    - "extends"
      - `"extends": "./configs/base",`

- 2.执行命令

  - tsc

  - tsc -w
    - 监视所有ts文件，自动编译

### 6.使用webpack打包ts代码

#### 1.运行项目初始化命令生成package.json文件

- npm init -y

#### 2.安装webpack和其他相关依赖

```bash
npm i -D webpack webpack-cli webpack-dev-server typescript ts-loader html-webpack-plugin clean-webpack-plugin cross-env
```

- -D 开发依赖

- 依赖说明

  - \- webpack
    -   \- 构建工具webpack

  - \- webpack-cli
    -   \- webpack的命令行工具

  - \- webpack-dev-server
    -   \- webpack的开发服务器

  - \- typescript
    -   \- ts编译器

  - \- ts-loader
    -   \- ts加载器，用于在webpack中编译ts文件

  - \- html-webpack-plugin
    -   \- webpack中html插件，用来自动创建html文件

  - \- clean-webpack-plugin
    -   \- webpack中的清除插件，每次构建都会先清除目录

  - cross-env

    - 环境配置

      - 生产环境

      - 开发环境

#### 3.根目录下创建webpack的配置文件webpack.config.js

网上查找相关配置

```js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
    optimization:{
        minimize: false // 关闭代码压缩，可选
    },

    entry: "./src/index.ts",
    
    devtool: "inline-source-map",
    
    devServer: {
        contentBase: './dist'
    },

    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
        environment: {
            arrowFunction: false // 关闭webpack的箭头函数，可选
        }
    },

    resolve: {
        extensions: [".ts", ".js"]
    },
    
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: {
                   loader: "ts-loader"     
                },
                exclude: /node_modules/
            }
        ]
    },

    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title:'TS测试'
        }),
    ]

}
```

#### 4.根目录下创建tsconfig.json，配置可以根据自己需要

```js
{
    "compilerOptions": {
        "target": "ES2015",
        "module": "ES2015",
        "strict": true
    }
}
```

#### 5.修改package.json添加如下配置

```js
{
  ...略...
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack",
    "start": "webpack serve --open chrome.exe"
  },
  ...略...
}
```

#### 6.在src下创建ts文件，并在并命令行执行```npm run build```对代码进行编译，或者执行```npm start```来启动开发服务器



### 7.babel

#### 作用

1.新ES语法转成兼容的旧语法

#### 1.安装依赖包：

```bash
npm i -D @babel/core @babel/preset-env babel-loader core-js
```

- 共安装了4个包，分别是：

  - @babel/core
    - babel的核心工具

  - @babel/preset-env
    - babel的预定义环境

  - @babel-loader
    - babel在webpack中的加载器

  - core-js
    - core-js用来使老版本的浏览器支持新版ES语法

#### 2.修改webpack配置文件

```js
// 引入一个包
const path = require('path');
// 引入html插件
const HTMLWebpackPlugin = require('html-webpack-plugin');
// 引入clean插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// webpack中的所有的配置信息都应该写在module.exports中
module.exports = {

    // 指定入口文件
    entry: "./src/index.ts",

    // 指定打包文件所在目录
    output: {
        // 指定打包文件的目录
        path: path.resolve(__dirname, 'dist'),
        // 打包后文件的文件
        filename: "bundle.js",

        // 告诉webpack不使用箭头
        environment:{
            arrowFunction: false
        }
    },

    // 指定webpack打包时要使用模块
    module: {
        // 指定要加载的规则
        rules: [
            {
                // test指定的是规则生效的文件
                test: /\.ts$/,
                // 要使用的loader
                use: [
                     // 配置babel
                     {
                         // 指定加载器
                         loader:"babel-loader",
                         // 设置babel
                         options: {
                             // 设置预定义的环境
                             presets:[
                                 [
                                     // 指定环境的插件
                                     "@babel/preset-env",
                                     // 配置信息
                                     {
                                         // 要兼容的目标浏览器
                                         targets:{
                                             "chrome":"58",
                                             "ie":"11"
                                         },
                                         // 指定corejs的版本
                                         "corejs":"3",
                                         // 使用corejs的方式 "usage" 表示按需加载
                                         "useBuiltIns":"usage"
                                     }
                                 ]
                             ]
                         }
                     },
                    'ts-loader'
                ],
                // 要排除的文件
                exclude: /node-modules/
            }
        ]
    },

    // 配置Webpack插件
    plugins: [
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
            // title: "这是一个自定义的title"
            template: "./src/index.html"
        }),
    ],

    // 用来设置引用模块
    resolve: {
        extensions: ['.ts', '.js']
    }

};
```

