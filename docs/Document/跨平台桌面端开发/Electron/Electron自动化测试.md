# Electron自动化测试

官网文档：[自动化测试 | Electron (electronjs.org)](https://www.electronjs.org/zh/docs/latest/tutorial/automated-testing)

## Electron做端到端测试

- 1.安装驱动：

- ```bash
  npm install spectron --save-dev--chromedriver_cdnurl=http://cdn.npm.taobao.org/dist/chromedriver
  ```

- 2.选择喜欢的测试框架+工具

  - ava
  - mocha + chai

- 3.在项目根目录创建test目录

- 4.在package.json加入test命令

## 自动化测试组成

- 1.测试前准备
  - 数据Mock
  - 上下文准备
- 2.测试用例描述(这个测试的是什么) + 行为(做什么事) + 断言(得到什么结果)
- 3.测试后处理
  - 清理Mock的数据
  - 上下文准备的清理

## 自定义驱动

官网文档：

- [使用自定义驱动程序进行自动化测试 | Electron (electronjs.org)](https://www.electronjs.org/zh/docs/latest/tutorial/automated-testing-with-a-custom-driver)
- [自动化测试--自定义驱动 | Electron (electronjs.org)](https://www.electronjs.org/zh/docs/latest/tutorial/automated-testing#使用自定义测试驱动)

例子：VSCode：<https://github.com/microsoft/vscode/pull/47471>

优点：性能、稳定性可控、自定义方法

## 使用 Playwright库

请看上面的：【😉爬虫和Web自动化测试/playwright的入门和使用】  有相关使用笔记教程，参考web自动化爬虫

## 延伸资料

- 使用自定义驱动程序进行自动化测试：[使用自定义驱动程序进行自动化测试 | Electron (electronjs.org)](https://www.electronjs.org/zh/docs/latest/tutorial/automated-testing-with-a-custom-driver)
- spectron启动失败：<https://github.com/electron-userland/spectron/issues/489>
- 平衡单元测试和端到端测试：<https://www.infoq.cn/article/balancing-unit-and-end-to-end-tests>
- S测试：<https://www.sitepoint.com/javascript-testing-unit-functional-integration/>
