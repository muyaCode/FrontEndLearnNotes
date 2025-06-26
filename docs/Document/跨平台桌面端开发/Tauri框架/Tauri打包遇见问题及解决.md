# Tauri 打包遇见问题及解决

打包 Tauri 时，需要下载： <https://github.com/wixtoolset/wix3/releases>

Downloading <https://github.com/wixtoolset/wix3/releases/download/wix3112rtm/wix311-binaries.zip>

但 GitHub 下载太慢，其他镜像下载地址：

- [NJU](https://mirrors.nju.edu.cn/pub/ovirt/ovirt-4.4/src/wix-toolset-binaries/)

下载完后：

- 1.新建文件夹`C:\Users[UserName]\AppData\Local\tauri\WixTools`
- 2.解压`wix311-binaries.zip`内的文件到`WixTools`目录
- 3.再回到项目运行打包命令：`pnpm tauri build`

## 使用图标库打包后报错

使用的是`@iconify/vue`图标库，dev 开发环境能正常运行，但是打包后生产环境中图标不显示，然后使用 debug 调试命令打包：`pnpm run tauri build --debug`

打包成功后，打开打包的软件，打开调试控制台发现报错：是请求图标的错误

- `Refused to connect to '<URL>' because it violates the following Content Security Policy directive: "connect-src ipc: <URL>".`
- `Refused to connect to 'https://api.iconify.design/fluent.json?icons=line-horizontal-3-20-filled%2Ctoolbox-28-filled' because it violates the document's Content Security Policy.`

### 方法 1：Content Security Policy (CSP) 规则设置

如果你想在 Tauri 项目中使用 `@iconify/vue` 库，你需要在 Tauri 的配置中添加允许连接到该库的 Content Security Policy (CSP) 规则。这样，你的应用就可以从 `@iconify/vue` 获取图标资源。

看起来你的应用程序在尝试从多个不同的源加载图标资源，但这些尝试都因为违反了 Content Security Policy（CSP）而被拒绝。CSP 是一种安全措施，用于限制网页可以从哪些源加载资源，以此来防止跨站脚本攻击（XSS）和数据注入攻击。

以下是一些步骤来设置 CSP 规则以允许连接到 `@iconify/vue` 库：

1. 打开你的 Tauri 项目的配置文件（通常是 `tauri.conf.json` 。
2. 在配置文件中找到或添加一个 `security` 部分。
3. 在 `security` 部分中，添加一个 `contentSecurityPolicy` 字段，指定允许连接到 `@iconify/vue` 的域名。例如：

```json
{
	"security": {
		"csp": "default-src 'self'; connect-src 'self' https://api.iconify.design"
	}
}
```

确保将 `https://api.iconify.design` 替换为实际的图标资源域名。这样，你的 Tauri 应用就可以从 `@iconify/vue` 获取图标了。

如果你的应用程序需要从其他域名加载资源，你可以在`connect-src`指令中用空格分隔它们。

如果你在使用 Vite 作为前端构建工具，你可能还需要在`vite.config.ts`中进行相应的配置，以确保在构建过程中生成的 HTML 文件包含正确的 CSP 设置。

### 图标离线

在使用 Tauri、Vite 和 Vue 3 框架结合`@iconify/vue`图标库进行项目开发时，如果你想要离线加载图标，可以采取以下步骤：

1. **安装@iconify/vue 库**： 你可以使用 npm 或 yarn 来安装`@iconify/vue`库。这个库允许你在 Vue 应用中使用超过 10 万个图标。

   ```bash
   npm install --save-dev @iconify/vue
   # 或者
   yarn add --dev @iconify/vue
   ```

2. **导入图标数据**： `@iconify/vue`不包含图标数据，而是从 Iconify API 动态加载。为了离线使用，你需要将图标数据导入到你的项目中。你可以从 Iconify Icons 包中导入数据，或者创建自定义图标包。

   ```javascript
   import { Icon } from "@iconify/vue";
   import homeIcon from "@iconify-icons/mdi-light/home";
   ```

3. **在组件中使用图标**： 一旦导入了图标数据，你就可以在 Vue 组件中使用它们。

   ```vue
   <template>
   	<Icon :icon="homeIcon" />
   </template>

   <script>
   import { Icon } from "@iconify/vue";
   import homeIcon from "@iconify-icons/mdi-light/home";

   export default {
   	components: {
   		Icon,
   	},
   	data() {
   		return {
   			homeIcon,
   		};
   	},
   };
   </script>
   ```

4. **配置 Tauri 的 CSP**： 由于你现在是离线使用图标，你需要确保 Tauri 的 Content Security Policy（CSP）不会阻止加载本地图标数据。在`tauri.conf.json`中更新 CSP 设置，允许加载本地资源。

   ```json
   {
   	"tauri": {
   		"security": {
   			"csp": "default-src 'self' data:; script-src 'self'; object-src 'self';"
   		}
   	}
   }
   ```

   1. **`default-src 'self' data:;`**：
      - `default-src` 指令定义了默认的资源加载策略。
      - `'self'` 表示只允许从当前域名加载资源。
      - `data:` 表示允许加载`data:` URL，这通常用于内联数据，例如 base64 编码的图像或字体。
   2. **`script-src 'self';`**：
      - `script-src` 指令定义了可以加载 JavaScript 脚本的源。
      - `'self'` 表示只允许从当前域名加载 JavaScript 脚本。
   3. **`object-src 'self';`**：
      - `object-src` 指令定义了可以加载插件（例如 Flash）的源。
      - `'self'` 表示只允许从当前域名加载插件。

5. **构建和测试**： 完成上述步骤后，运行你的构建命令来打包应用，并确保在离线环境中测试图标是否正常加载。

以上步骤可以帮助你在 Tauri 应用中离线使用`@iconify/vue`库的图标。请注意，由于图标数据可能会占用较大空间，你可能需要考虑只包含应用中实际使用到的图标。

## 内容安全策略（CSP）

跟前端的 html 的 `<meta>` 元素的 content 字段一样：[内容安全策略（CSP） - HTTP | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CSP)

当配置 Content Security Policy (CSP) 时，你可以使用多个指令来控制网页中可以加载哪些资源。以下是一些常用的 CSP 指令以及它们的含义：

1. **`default-src`**：
   - 默认策略，用于定义加载资源的默认行为。
   - 例如：`default-src 'self' cdn.example.com;` 表示只允许从当前域名和 `cdn.example.com` 加载资源。
2. **`script-src`**：
   - 定义可以加载 JavaScript 脚本的源。
   - 例如：`script-src 'self' js.example.com;` 表示只允许从当前域名和 `js.example.com` 加载 JavaScript 脚本。
3. **`style-src`**：
   - 定义可以加载样式表或 CSS 的源。
   - 例如：`style-src 'self' css.example.com;` 表示只允许从当前域名和 `css.example.com` 加载样式表。
4. **`img-src`**：
   - 定义可以加载图像的源。
   - 例如：`img-src 'self' img.example.com;` 表示只允许从当前域名和 `img.example.com` 加载图像。
5. **`connect-src`**：
   - 适用于 XMLHttpRequest（AJAX）、WebSocket、fetch()等。
   - 例如：`connect-src 'self';` 表示只允许从当前域名进行连接。
6. **`font-src`**：
   - 定义可以加载字体资源的源（通过 @font-face）。
   - 例如：`font-src font.example.com;` 表示只允许从 `font.example.com` 加载字体。
7. **`object-src`**：
   - 定义可以加载插件（如 `<object>`、`<embed>` 或 `<applet>`）的源。
   - 例如：`object-src 'self';` 表示只允许从当前域名加载插件。
8. **`media-src`**：
   - 定义可以加载音频和视频的源（如 HTML5 `<audio>`、`<video>` 元素）。
   - 例如：`media-src media.example.com;` 表示只允许从 `media.example.com` 加载音频和视频。

这些指令可以根据你的应用需求进行调整。通过配置 CSP，你可以限制资源的加载源，从而增加网页的安全性，防止跨站脚本攻击（XSS）等风险。

Tauri 的 CSP（内容安全策略）设置是可以自定义的，以确保你的应用程序的安全性。在 Tauri 的配置文件中，你可以通过`tauri > security > csp`字段来设置 CSP。这个设置应该尽可能地限制，只允许 WebView 从你信任的主机加载资源。

以下是一个 Tauri CSP 设置的示例：

```json
{
	"tauri": {
		"security": {
			"csp": "default-src 'self'; script-src 'self' https://api.iconify.design; connect-src 'self' https://api.iconify.design"
		}
	}
}
```

在这个示例中，`default-src 'self'`表示所有的资源都必须来自于同一个源，即你的应用程序。`script-src 'self' https://api.iconify.design`允许脚本从你的应用程序和`api.iconify.design`加载。`connect-src 'self' https://api.iconify.design`允许通过 XMLHttpRequest、WebSocket 或 fetch 等方式从你的应用程序和`api.iconify.design`进行连接。

你应该根据你的应用程序的具体需求来调整这些设置。例如，如果你的应用程序需要从其他的 CDN 或 API 服务加载资源，你需要在相应的 CSP 指令中添加这些服务的 URL。

请记住，正确配置 CSP 对于保护你的应用程序免受跨站点脚本攻击（XSS）和其他网络安全威胁至关重要。如果你需要更多关于 Tauri CSP 设置的信息，可以查看 Tauri 的官方文档。

- [开发安全 | Tauri Apps](https://tauri.app/zh-cn/v1/references/security/)

## 生成Windows便携绿色版安装包

问题：[tauri-apps/tauri-action#59](https://github.com/tauri-apps/tauri-action/issues/59)

[是否可以创建独立的二进制文件？ ·tauti-apps/金牛座 ·讨论 #3048 (github.com)](https://github.com/tauri-apps/tauri/discussions/3048)

基本上，我们应该设置一个不需要管理员权限的标志

文档：[Windows 安装程序 |Tauri 应用程序](https://tauri.app/zh-cn/v1/guides/building/windows/)

