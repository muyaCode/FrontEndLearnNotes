# NodeJS 爬虫系统开发

Nodejs 因为基于 JavaScript 的语法，对解析 html 标签有着天然的优势

## 爬虫系统以及 Robots 协议介绍

**爬虫**，是一种自动获取网页内容的程序。是搜索引擎的重要组成部分，因此搜索引擎优化很大程度上就是针对爬虫而做出的优化。

**robots.txt**是一个文本文件，robots.txt 是一个协议，不是一个命令。
robots.txt 是爬虫要查看的第一个文件。
robots.txt 文件告诉爬虫在服务器上什么文件是可以被查看的，搜索机器人就会按照该文件中的内容来确定访问的范围。

## 使用环境和技术栈

Express

Axios

Cheerio

## 实现命令行工具

什么是命令行工具：

- 客户端软件
- 用户交互
- 面向开发者
- ...

开发命令行工具步骤：

- process.argv 与解析 process.argv
- npm install commander
- npm install optimist
- npm install prompt
- 输出帮助信息
- 输出彩色文本

运行脚本到命令执行总共需要几步：

- 脚本与运行脚本
- 设置默认的运行时
- 使用 chmod 分配执行权限
- 设置环境变量
- 开始使用命令行
