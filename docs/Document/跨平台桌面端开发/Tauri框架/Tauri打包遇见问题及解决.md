# Tauri打包遇见问题及解决

打包Tauri时，需要下载： <https://github.com/wixtoolset/wix3/releases>

Downloading <https://github.com/wixtoolset/wix3/releases/download/wix3112rtm/wix311-binaries.zip>

但GitHub下载太慢，其他镜像下载地址：

- [NJU](https://mirrors.nju.edu.cn/pub/ovirt/ovirt-4.4/src/wix-toolset-binaries/)

下载完后：

- 1.新建文件夹`C:\Users[UserName]\AppData\Local\tauri\WixTools`
- 2.解压`wix311-binaries.zip`内的文件到`WixTools`目录
- 3.再回到项目运行打包命令：`pnpm tauri build`
