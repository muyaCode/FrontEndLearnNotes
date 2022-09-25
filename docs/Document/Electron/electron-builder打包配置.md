# electron-builder打包配置

---

### electron-builder开源地址 ：[electron-userland/electron-builder](https://github.com/electron-userland/electron-builder)

### electron-builder配置文档：[electron-builder](https://www.electron.build/)

### electron-builder npm：[electron-builder (npmjs.com)](https://www.npmjs.com/package/electron-builder)

---

##### electron-builder命令行参数（CLI）

Commands(命令):

```bash
  electron-builder build                    构建命名                      [default]
  electron-builder install-app-deps         下载app依赖
  electron-builder node-gyp-rebuild         重建自己的本机代码
  electron-builder create-self-signed-cert  为Windows应用程序创建自签名代码签名证书
  electron-builder start                    使用electronic-webpack在开发模式下运行应用程序(要electron-webpack模块支持)
```

Building(构建参数):

```bash
  --mac, -m, -o, --macos   Build for macOS,                      [array]
  --linux, -l              Build for Linux                       [array]
  --win, -w, --windows     Build for Windows                     [array]
  --x64                    Build for x64 (64位安装包)             [boolean]
  --ia32                   Build for ia32(32位安装包)             [boolean]
  --armv7l                 Build for armv7l                      [boolean]
  --arm64                  Build for arm64                       [boolean]
  --dir                    Build unpacked dir. 有用的测试.                 [boolean]
  --prepackaged, --pd      预打包应用程序的路径（以可分发的格式打包）
  --projectDir, --project  项目目录的路径。 默认为当前工作目录。
  --config, -c             配置文件路径。 默认为`electron-builder.yml`（或`js`，或`js5`)
```

Publishing(发布):

```bash
  --publish, -p  发布到GitHub Releases [choices: "onTag", "onTagOrDraft", "always", "never", undefined]
```

<font color="red">**Deprecated(废弃):**</font>

```bash
  --draft       请改为在GitHub发布选项中设置releaseType                 [boolean]
  --prerelease  请改为在GitHub发布选项中设置releaseType                 [boolean]
  --platform    目标平台 (请更改为选项 --mac, --win or --linux)
           [choices: "mac", "win", "linux", "darwin", "win32", "all", undefined]
  --arch        目标arch (请更改为选项 --x64 or --ia32)
                   [choices: "ia32", "x64", "armv7l", "arm64", "all", undefined]
```

Other(其他):

```bash
  --help     Show help                   [boolean]
  --version  Show version number         [boolean]
```

Examples(例子):

```bash
  electron-builder -mwl                        为macOS，Windows和Linux构建（同时构建）
  electron-builder --linux deb tar.xz          为Linux构建deb和tar.xz
  electron-builder -c.extraMetadata.foo=bar    将package.js属性`foo`设置为`bar`
  electron-builder --config.nsis.unicode=false 为NSIS配置unicode选项
```

TargetConfiguration(构建目标配置):

```js
target:  String - 目标名称，例如snap.
arch “x64” | “ia32” | “armv7l” | “arm64”> | “x64” | “ia32” | “armv7l” | “arm64”  -arch支持列表
```

---

##### Electron + vue3 + vite + TypeScript + vite-plugin-electron结合 的 package.json 的 "scripts"运行脚本配置：

```json
  "scripts": {
    "dev": "chcp 65001 && vite", // chcp 65001控制台可以打印中文字符 vite 运行项目
    "build": "vue-tsc --noEmit && vite build && electron-builder", // 全平台打包
    "pack": "electron-builder --dir", // 
    "postinstall": "electron-builder install-app-deps", // 下载app依赖
    "build:win32": "electron-builder --win --ia32", // 打包windows平台的32位包
    "build:win64": "electron-builder --win --x64", // 打包windows平台的64位包
    "build:mac": "electron-builder --mac", // mac系统安装包打包
    "build:linux": "electron-builder --linux" // linux
  },
```

---

##### 在package.json 中添加electron-builder打包配置： “build”： {} ：

```json
{
  "build": {
    "appId": "com.muya.desktop", # 包名
    "productName": "moxuanWriting", # 项目名 这也是生成的exe文件的前缀名
    "copyright": "Copyright © 2022 ${author}", # 版权信息
    "compression": "store", #  "store" | "normal" | "maximum" 打包压缩情况(store 相对较快)，store 39749kb, maximum 39186kb
    "files": [
      "./main.js",
      "./dist/**",
      "./package.json",
      "./preload.js"
    ],
    "publish": [
      {
        "provider": "generic", // 服务器提供商 也可以是GitHub等等
        "url": "http://xxxxx/" // 服务器地址
      }
    ],
    # 上面的publish省略和简写
    "publish": {
      "provider": "github"
    },
    "extraFiles": [
      # 把指定的资源复制到程序根目录，即把server文件夹的内容复制到程序根目录，这里server文件夹下的内容相当于我的后台
      "./server",
    ],
    "directories": {
      "output": "release/${version}", #  输出文件夹
      "buildResources": "assets" #  资源文件
    },
    "fileAssociations": [
      {
        "ext": "epub",
        "icon": "assets/icons/epub",
        "role": "Viewer",
        "mimeType": "application/epub+zip"
      },
      {
        "ext": "pdf",
        "icon": "assets/icons/pdf",
        "role": "Viewer",
        "mimeType": "application/pdf"
      },
      {
        "ext": "mobi",
        "icon": "assets/icons/mobi",
        "role": "Viewer",
        "mimeType": "application/x-mobipocket-ebook"
      },
      {
        "ext": "azw3",
        "icon": "assets/icons/azw3",
        "role": "Viewer",
        "mimeType": "application/vnd.amazon.ebook"
      },
      {
        "ext": "djvu",
        "icon": "assets/icons/pdf",
        "role": "Viewer",
        "mimeType": "image/vnd.djvu"
      },
      {
        "ext": "cbz",
        "icon": "assets/icons/comic",
        "role": "Viewer",
        "mimeType": "application/x-cbz"
      },
      {
        "ext": "cbr",
        "icon": "assets/icons/comic",
        "role": "Viewer",
        "mimeType": "application/x-cbr"
      },
      {
        "ext": "cbt",
        "icon": "assets/icons/comic",
        "role": "Viewer",
        "mimeType": "application/x-cbt"
      },
      {
        "ext": "fb2",
        "icon": "assets/icons/fb2",
        "role": "Viewer",
        "mimeType": "application/x-fictionbook+xml"
      }
    ],
    "asar": true, # asar打包
    "extends": null,
    "extraResources": { # 拷贝dll等静态文件到指定位置
        "from": "./extraResources/",
        "to": "extraResources"
    },

    # 各个平台打包配置开始
    "dmg": {
      "contents": [
        {
          "x": 410,
          "y": 150,
          "type": "link",
          "path": "/Applications"
        },
        {
          "x": 130,
          "y": 150,
          "type": "file"
        }
      ]
    },
    "mac": {
      "icon": "assets/icons/icon.ico",
      "category": "public.app-category.productivity",
      # "artifactName": "${productName}_${version}.${ext}",
      "artifactName": "${productName}-${version}-${arch}.${ext}"
      "target": [
        {
          "target": "dmg",
          "arch": [
            "x64",
            "arm64"
          ]
        }
      ],
    },
    "win": {
      "icon": "assets/icons/icon.ico",
      "artifactName": "${productName}-Win-${version}-${arch}.${ext}",
      "publisherName": "App by Troye",
      "target": [
        {
          "target": "nsis", # 安装包打包
          "arch": [
            "x64",
            "ia32"
          ]
        },
        {
          "target": "zip", # zip 压缩包打包
          "arch": [
            "x64",
            "ia32"
          ]
        },
        {
          "target": "portable", # 绿色便携版打包
          "arch": [
            "x64"
          ]
        }
      ]
    },
    "linux": {
      "icon": "assets/icons/icon.ico",
      "category": "Office",
      "artifactName": "${productName}-${version}.${ext}",
      "target": [
        "AppImage",
        "deb",
        "snap",
        "rpm"
      ]
    },
    "portable": {
      "artifactName": "${productName}-Portable-${version}.${ext}"
    },
    # 各个平台打包配置结束

    "nsis": {
      "artifactName": "${productName}-${version}.${ext}", # 
      "oneClick": false, # 创建的程序是否一键安装
      "perMachine": false, # 是否开启安装时权限限制（此电脑或当前用户）
      "allowToChangeInstallationDirectory": true, #  是否允许修改安装目录
      "deleteAppDataOnUninstall": false, # 
      "include": "assets/windows/installer.nsh", # 包含的自定义nsis脚本 ，这个对于构建需求严格得安装过程相当有用。
      "guid": "muya_writing", # 注册表名字，不推荐修改
      "allowElevation": true, # 允许请求提升。 如果为false，则用户必须使用提升的权限重新启动安装程序。
      "installerIcon": "./build/icons/aaa.ico", # 安装程序图标的路径
      "uninstallerIcon": "./build/icons/bbb.ico", # 卸载程序图标的路径
      "installerHeaderIcon": "./build/icons/aaa.ico", # 应用标题图标的路径（进度条上方）
      "createDesktopShortcut": true, # 是否创建桌面快捷方式
      "createStartMenuShortcut": true, # 是否创建开始菜单快捷方式
      "shortcutName": "写作工具", # 默认为应用程序名称
      "shortcutName":"快捷键名称",  # 桌面快捷名称
      "runAfterFinish": false  # 完成后是否运行已安装的应用程序
    },
    "snap": {
      "publish": [
        {
          "provider": "github"
        }
      ]
    },
    "releaseInfo": {
      "releaseNotes": "版本更新的具体内容1"
    }
  }
}
```
