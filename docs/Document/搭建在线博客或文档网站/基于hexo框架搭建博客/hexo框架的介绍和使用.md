# hexo框架的介绍和使用

官网：[Hexo](https://hexo.io/zh-cn/index.html)

GitHub：[hexojs/hexo](https://github.com/hexojs/hexo)

## hexo的介绍

基于node

## hexo的安装和使用

npm包管理工具
npm install -g hexo(hexo-cli)
下载的资源是国外的可能比较慢
淘宝镜像（代理的仓库）

```bash
npm install -g hexo --registry=https://registry.npm.taobao.org
```

在一个空目录（hexo init）博客系统的初始化
`hexo\source\_posts md`文档就是博客文档
如果要写一篇博客（新建文件  xxx.md）
把md文档转html文件（hexo g）
在自己的服务器预览（hexo s） localhost:4000
如果从新生成html文件可能会有缓存 （hexo clean,hexo g）

和github关联 推代码到github
和git关联 hexo-deploy-git 插件

```bash
npm install hexo-deployer-git --save
```

和github关联需要配置文件
修改文件  _config.yml  在最下面

```bash
type: git
repo: git@github.com:用户名/用户名.github.io.git
branch: master
```

需要在github配置仓库 名称（用户名.github.io）

把代码推到github (hexo d)

只能预览代码 无法预览页面

配置当前仓库可以通过网络访问页面

在仓库的首页  settings--->GitHub Pages-->改选项 Source（none---master branch）

通过 用户名.github.io 访问你的博客
