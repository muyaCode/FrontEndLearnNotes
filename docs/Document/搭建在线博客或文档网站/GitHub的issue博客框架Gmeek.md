# GitHub的issue博客框架Gmeek

## 简介

[Gmeek](https://github.com/Meekdai/Gmeek) 一个博客框架，超轻量级个人博客模板，完全基于`Github Pages `、 `Github Issues` 和 `Github Actions`，可以称作`All in Github`。不需要本地部署，从搭建到写作，只需要18秒，2步搭建好博客，第3步就是写作。

## 网址

**Gmeek的Github地址**： https://github.com/Meekdai/Gmeek

**Gmeek的文档**：https://blog.meekdai.com/

## 搭建安装和配置

文档：[Gmeek快速上手 (meekdai.com)](https://blog.meekdai.com/post/Gmeek-kuai-su-shang-shou.html)

视频教程：https://www.bilibili.com/video/BV1GM4m1m7ZD

## 部署和写文章步骤

- 博客主体使用 **Github Pages** 托管的静态页面
- 构建部署使用 **Github Action**
- 写文章则使用 **Github Issue** 的富文本编辑器。



## 问题解决

### 更改config.json后，标题显示为空，头像可以更换，要怎么解决呀

通过Actions->build Gmeek->Run workflow->里面的按钮全局重新生成一次

把文件上传到Github的API：

```bash
https://api.github.com/repos/{仓库所有者}/{仓库名称}/contents/{文件目录+文件名}
```

