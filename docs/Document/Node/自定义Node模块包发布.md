# 自定义Node模块发布

参考文章：<https://juejin.cn/post/7172240485778456606>

## NPM

官网：<https://www.npmjs.com/>

node包（模块）管理器 - 搜索、下载（安装）、升级、删除……node包（模块）

### 搜索后-左边-Sort Packages栏信息

- Quality：质量，稳定性、测试、依赖等

- Maintenance：维护等级，更新频率等

- Optimal：以上三点的综合

### 命令

- 查看已经安装的依赖包命令：`npm ls`

---

## 发布自己的模块包

package.json 文件：项目（模块、包）说明配置文件，该文件描述了当前包的信息，只有拥有 package.json 文件的项目才可以被发布

1.手动创建package.json 文件(初始化项目)

```bash
npm init
或
npm init --yes
```

相关配置选择

```bash
name：包名称，必填
version：版本，必填，格式 x.x.x
main: 包的入口主文件,app.js/index.js
scripts：自定义脚本，通过 npm run 脚本名称即可执行脚本定义的命令
dependencies：生产环境下需要使用的依赖包
devDependencies：只做开发环境（测试环境）

以上都可以全部回车默认选项
（如果使用的是npm init --yes命令，就是相当于全部执行的默认）
```

2.注册npm网站的账号：[npm (npmjs.com)](https://www.npmjs.com/)


3.开发相关模块


4.登录npm账号命令

```bash
npm adduser
或
npm login
```

5.发布开发好的模块

```bash
npm publish
```

## 开发方向

- GUI - Graphical User Interface ： 图形用户界面-office、vscode、浏览器、播放器

- CLI - Command-Line Interface：命令行界面，也称为 CUI，字符用户界面
  
  - 虽然没有GUI操作直观，但是CLI更加节省计算机资源（所以一般用于服务器环境）
  
  - babel、tsc / webpack / vue-cli

- Server - 服务提供（Web Server、IM……）

### CLI命令行工具开发

- command [subCommand] [options] [arguments]
  
  - command：命令，比如 vue
  
  - [subCommand]：子命令，比如 vue create
  
  - [options]：选项，配置，同一个命令不同选项会有不一样的操作结果，比如 vue -h，vue -v
  
  - [arguments]：参数，某些命令需要使用的值，比如 vue create myApp

- 选项与参数的区别：选项是命令内置实现，用户进行选择，参数一般是用户决定传入的值
  
  - 选项一般会有全拼与简写形式（具体看使用的命令帮助），比如 --version = -v

    - 全拼：以 -- 开头 / 简写：以 - 开头

    - 选项也可以接受值，值写在选项之后，通过空格分隔

    - 多个简写的选项可以连写，开头使用一个 - 即可，需要注意的是，如果有接受值的选项需要放在最后，比如：

      - vue create -d -r <-r的值> myApp

      - vue create -dr <-r的值> myApp

### 第三方框架

- commander - 命令行开发工具
  
  - GitHub中文文档：[commander中文文档](https://github.com/tj/commander.js/blob/HEAD/Readme_zh-CN.md)
  
  - npm：[commander - npm (npmjs.com)](https://www.npmjs.com/package/commander)

- chalk - 命令行样式风格控制器
  
  - npm：[chalk - npm (npmjs.com)](https://www.npmjs.com/package/chalk)

- inquirer - 交互式命令行工具
  
  - npm：[inquirer - npm (npmjs.com)](https://www.npmjs.com/package/inquirer)
