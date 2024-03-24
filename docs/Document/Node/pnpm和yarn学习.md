# pnpm和yarn学习

## yarn

### 简介



### 相关地址

- 官网：https://yarnpkg.com/
- 开源地址：https://github.com/yarnpkg/yarn
- 组织：https://github.com/yarnpkg
- 中文文档地址：
- 使用教程：[一文全面了解pnpm、yarn、cnpm、npx、npm的使用(强烈建议收藏)-腾讯云开发者社区-腾讯云 (tencent.com)](https://cloud.tencent.com/developer/article/2320612)

## pnpm

### 简介

### 相关网址

- 官网：https://pnpm.js.org/
- 开源地址：https://github.com/pnpm/pnpm
- 中文文档地址：
- 使用教程：

[pnpm、yarn 的基本安装和使用；查看与修改镜像源_yarn 镜像-CSDN博客](https://blog.csdn.net/AdminGuan/article/details/127620994)

## 命令综合

### 清理缓存

```bash
yarn cache clean
npm cache clean -f
pnpm store prune
```

yarn 可以交互式地升级依赖包的命令

```bash
yarn upgrade-interactive --latest
```

npm升级依赖包：会根据 package.json 中指定的范围更新依赖包的最新版本，并同步更新 package-lock.json 文件中对应的包的版本。如果不带参数，将更新所有依赖包。如果带上 --latest 参数，将更新所有依赖包到最新的稳定版本，可能会跨越主要版本号

```bash
npm update [packageName]
```

npm全局的升级依赖包：一个全局安装的依赖包，它可以检查和更新 package.json 文件中可更新的依赖包，但不会更新 package-lock.json 文件中对应的包的版本。您需要使用 ncu -u [packageName] 命令来更新指定的包，或者不带参数来更新所有的包。然后，您需要重新安装依赖包，可以使用 rm -rf package-lock.json && npm i 命令

```bash
npm-check-updates
```

也是一个全局安装的依赖包，它可以查看可更新的包信息，并让您选择并更新相应的依赖包。您可以使用 npm-check -u 命令来交互式地更新依赖包。和 npm-check-updates 一样，您也需要重新安装依赖包

```bash
npm-check
```

pnpm升级依赖包：会根据指定的范围更新依赖包的最新版本。在不带参数的情况下使用时，将更新所有依赖包。如果带上 --latest 参数，将更新所有依赖包到最新的稳定版本，可能会跨越主要版本号

```bash
pnpm update [packageName]
```

pnpm全局升级依赖包是一个全局安装的依赖包，它可以检查和更新 package.json 文件中可更新的依赖包，但不会更新 pnpm-lock.yaml 文件中对应的包的版本。更新指定的包，或者不带参数来更新所有的包。

```bash
pcu -u [packageName]
```

然后，需要重新安装依赖包，可以使用 `rm -rf pnpm-lock.yaml && pnpm i`命令

```bash
pnpm-check-updates
```

配置全局安装路径：

```bash
pnpm config set store-dir D:\node\pnpm\global
```

配置全局缓存路径：

```bash
pnpm config set cache-dir D:\node\pnpm\cache
```

设置成淘宝镜像

```bash
npm config set registry https://registry.npm.taobao.org
```

恢复成原始镜像

```bash
npm config set registry https://registry.npmjs.org
```

查看当前 npm 镜像源

```bash
npm config get registry
```

卸载pnpm

```bash
npm rm -g pnpm
```

参考：https://juejin.cn/post/7158295493812944904

pnpm 安装指定版本依赖：

```bash
pnpm add @tauri-apps/cli 1.5.8
```

pnpm 设置目录：

1.获取pnpm的缓存目录：存放临时文件

```bash
pnpm config get cache-dir
```

2.获取pnpm的存储目录：是用于存放所有下载的包的内容可寻址存储

```bash
pnpm config get store-dir
```

3.获取pnpm全局二进制目录：用于存放全局安装的包的可执行文件的

```bash
pnpm config get global-bin-dir
```

4.获取pnpm的全局目录：用于存放全局安装的包的依赖和元数据的

```bash
pnpm config get global-dir
```

设置目录

```bash
pnpm config set global-dir "D:\node\.pnpm-store\global"
pnpm config set global-bin-dir "D:\node\.pnpm-store"
pnpm config set cache-dir "D:\node\.pnpm-store\cache"
pnpm config set state-dir "D:\node\.pnpm-store\state"

pnpm config get cache-dir
pnpm config get store-dir
pnpm config get global-bin-dir
pnpm config get global-dir


查看源：pnpm config get registry
切换源：pnpm config set registry <淘宝源或其他源地址>
删除npm或yarn生成的node_modules：rm -rf node_modules
```




pnpm 设置下载镜像：

```bash
镜像站：https://npmmirror.com/
```

查看源

```bash
pnpm get registry 
```

临时修改

```bash
pnpm --registry https://registry.npmmirror.com install axios
```

持久使用

```bash
pnpm config set registry https://registry.npmmirror.com
```

还原

```bash
pnpm config set registry https://registry.npmjs.org
```

