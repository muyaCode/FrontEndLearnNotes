# yt-dlp 下载安装使用

文章参考修改翻译：[Yt-dlp Commands: The Complete Tutorial For Beginners (2023) - OSTechNix](https://ostechnix.com/yt-dlp-tutorial/)

## 相关网址资源

yt-dlp 开源地址：https://github.com/yt-dlp/yt-dlp

yt-dlp 软件版本下载：https://github.com/yt-dlp/yt-dlp/releases

### 官方文档检索

更改功能和添加了支持网站文档（全局检索）：[yt-dlp/Changelog.md 在 master ·YT-DLP/YT-DLP (github.com)](https://github.com/yt-dlp/yt-dlp/blob/master/Changelog.md)

**支持下载的网站列表：**[yt-dlp/supportedsites.md at master · yt-dlp/yt-dlp (github.com)](https://github.com/yt-dlp/yt-dlp/blob/master/supportedsites.md)

## 功能介绍

**yt-dlp** 是一个免费的开源命令行程序工具，可用于从 YouTube 和其他视频等一千多个托管网站下载视频。

yt-dlp 是现已停产的 **youtube-dlc** 的一个分支，其目标是添加新功能和补丁，同时保持与原始项目的兼容性。

它支持多种视频和音频格式，还可用于下载字幕和元数据。yt-dlp 适用于 Windows、macOS 和 Linux。

国内平台的解析工具已经存在很多，像 you-get 之类，我们主要用它来下载海外视频。

作为 youtube-dl 的增补版，yt-dlp 有着比起前辈更快的速度，以及众多新特性。本文仅记录 win10 系统 python 环境下的跑通方法。

在尝试前，先确保本地存在 3.7+的 python 版本，推荐安装 ffmpeg、ffprobe 等依赖，以方便视频合并、转码等后续处理。

轻松爬取网络上的视频，并且可以调用 FFmpeg，对视频进行转码与合并。

youtobe-dl 之前被下架后，之后在开源人士的反馈上又被迫上架。

ytdl 基于 youtobe-dl 的 fork 开发，主要是添加一些补丁和特征、特点，并且和官方项目保存同步更新。

部分的特征：

- 可以使用外部下载器下载，如：使用 aria2 进行下载。
- 直接调用浏览器，使用浏览器环境爬取视频和使用浏览器的 cookies
- ……

yt-dlp 是一个用于从 YouTube、Vimeo 和其他类似网站下载视频的开源软件，它是基于 youtube-dl 的一个分支，但有很多改进和新功能。yt-dlp 的一些主要功能包括：

- 支持多种视频格式和质量，可以自适应码率切换和合并视频和音频。
- 支持下载字幕、缩略图、元数据等附加信息，并可以嵌入到视频文件中。
- 支持下载播放列表、频道、直播流等多个视频。
- 支持绕过地理限制、身份验证、加密等障碍，可以下载受版权保护或限制的视频。
- 支持与 SponsorBlock 集成，可以标记或删除视频中的赞助商部分。
- 支持多种网络选项，可以设置代理、超时、重试等参数，提高下载速度和稳定性。
- 支持多种文件系统选项，可以指定下载目录、文件名、覆盖规则等参数，方便管理下载文件。
- 支持多种后处理选项，可以对下载的视频进行转换、裁剪、过滤等操作，提高视频质量和兼容性。

## YT-DLP 有什么主要功能?

1. **网络选项：** 更改 yt-dlp 与网络通信的方式。这包括选项，例 [如设置代理](https://www.rapidseedbox.com/zh/proxy)、调整超时值和指定用户代理字符串。
2. **跳过地理限制：** 此功能允许您绕过可能基于位置阻止您访问特定视频的地理限制。您可以使用 yt-dlp 选项与 VPN 或代理一起绕过这些限制。
3. **视频选择：** 使用 yt-dlp，您可以从播放列表或频道选择要下载的视频。此外，您还可以下载整个播放列表和频道。
4. **下载选项：** 此功能允许您控制下载过程。例如，您可以选择仅下载音频、仅下载视频或同时下载两者。您还可以设置视频质量和下载速度限制。
5. **文件系统选项：** 使用此功能，您可以指定已下载视频的输出目录和文件名模板。
6. **缩略图图像：** 与视频一起下载缩略图图像。您甚至可以指定图像格式和大小。
7. **解决方案：** 此功能为在下载过程中出现的问题提供各种解决方案。例如，您可以使用“-no-check-certificate”选项来绕过 SSL 证书验证。
8. **对失败的下载进行自动重试。** 默认情况下，yt-dlp 会尝试三次下载视频，然后放弃并转到下一个。您还可以配置此次重试的次数。
9. **视频格式选项：** Yt-dlp 让您选择要下载的视频格式，例如 MP4、WebM 或 FLV。您还可以设置视频质量和分辨率。
10. **字幕功能：** 此 yt-dlp 选项允许您与视频一起下载字幕（嵌入）。您可以指定字幕格式和语言。
11. **身份验证选项：** 与某些网站进行身份验证，例如 YouTube 或 Vimeo。您可以使用用户名和密码或 API 密钥等选项进行身份验证。
12. **后处理选项：** 对已下载的视频执行各种后处理任务，例如合并或拆分视频文件、添加元数据或将视频转换为不同的格式。
13. **与 SponsorBlock 集成：** 此功能使您能够通过 SponsorBlock API 标记/删除 YouTube 视频中的赞助商部分。

## yt-dlp 和 youtube-dl/youtube-dlc 之间的主要区别

**YT-DLP 的用法**与 youtube-dl 几乎相同，只有一些细微的区别。

yt-dlp 的一些默认选项与 youtube-dl 和 youtube-dlc 的默认选项不同。以下是一些主要区别：

- 与 youtube-dl 和 youtube-dlc 不同，yt-dlp 仅支持 Python 3.7 及更高版本。相比之下，youtube-dl 将其兼容性扩展到 Python 2.6+ 和 3.2+。
- 虽然 ffmpeg 是处理媒体的推荐选项，但不认可作为 yt-dlp 的替代方案。` avconv``ffmpeg `
- yt-dlp 在配置文件的存储上与 youtube-dl 略有不同。
- yt-dlp 中的输出格式已更改。`-F`
- 选项 （`--auto-number`、`-A`）、（`--title`、`-t`） 和 （`--literal`、`-l`） 已弃用，不再按预期运行。
- 默认情况下，yt-dlp 会激活 `--no-abort-on-error`。
- yt-dlp 中的默认输出模板与 youtube-dl 中的默认输出模板不同。YT-DLP 默认使用，而 youtube-dl 使用 .`%(title)s [%(id)s].%(ext)s`、`%(title)s-%(id)s.%(ext)s`
- 与 youtube-dl 不同，yt-dlp 的默认格式排序优先考虑更高的分辨率和更好的编解码器，而不是更高的比特率。
- yt-dlp 中的默认格式选择器是 ，这意味着首选超过纯视频格式的视频 + 音频组合格式：`bv*+ba/b`。
- 与 youtube-dlc 不同，yt-dlp 默认不允许将多个音频/视频流合并为一个文件（以避免与 冲突）：`-f bv*+ba`。
- 使用 yt-dlp 时，也会为播放列表编写元数据文件，例如缩略图、描述或 infojson。
- yt-dlp 列出 YouTube 播放列表中不可用的视频。
- yt-dlp 提取的 YouTube 上传日期以 UTC 格式（如果可用）显示。
- 默认情况下，yt-dlp 会从 infojson 中排除一些内部元数据（例如文件名）。
- yt-dlp 对文件名中无效字符的清理与 youtube-dl 相比有所不同，被认为更智能。
- yt-dlp 尝试在可能的情况下将外部下载程序输出解析为标准进度输出，目前为：`aria2c`。要按原样保留下载程序输出，请使用：`--compat-options no-external-downloader-progress`

有关更多关键差异，请访问 yt-dlp GitHub 存储库。

## 免责和声明警告

**YT-DLP** 是一款功能强大的工具，用于从各种网站下载视频和音频。但是，需要注意的是，yt-dlp 不应用于下载非法或盗版内容。未经版权所有者许可下载受版权保护的材料是非法的，并可能导致严重的法律后果。

如果你不确定视频或音频文件是否受版权保护，最好谨慎行事，不要下载它。网上有许多免费和受版权保护的内容的合法来源。

以下是在使用 yt-dlp 时避免侵犯版权的一些提示：

- 仅下载你有权下载的视频和音频文件。
- 了解你所在国家/地区的版权法。
- 如果你不确定视频或音频文件是否受版权保护，请不要下载它。
- 网上有许多免费和受版权保护的内容的合法来源。

**请负责任、合法地使用 yt-dlp。**

**作者不对盗版行为负责。**

## yt-dlp 下载

yt-dlp 软件版本下载：<https://github.com/yt-dlp/yt-dlp/releases>

![image-20240104233936214](./yt-dlp下载安装使用.assets/image-20240104233936214.png)

## 安装 yt-dlp

### windows 系统安装

window 安装 yt-dlp 十分简单，下载文件后放到 PATH 指定的路径中：`/usr/local/bin/`，再添加【环境变量】path 执行权限即可。也有命令行下载安装的

- 安装方法 1：在 Windows 上，你可以从[官方 GitHub 仓库](https://github.com/yt-dlp/yt-dlp/releases)下载 yt-dlp.exe 文件，并将其放在你的系统路径中，例如：C:\Windows\System32（系统权限文件夹，不需要添加环境变量）。或者放到任意文件夹，需要在 Path 添加环境变量。

- 安装方法 2：如果你已经安装了 Python 和 pip，也可以使用 pip 命令来安装 yt-dlp。
  ```bash
  $ python3 -m pip uninstall yt-dlp
  ```

### 类 UNIX 操作系统安装

如果你使用的是类 UNIX 操作系统，例如 Linux、MacOS 或 BSD，你可以按照以下方法之一轻松安装 yt-dlp：

**方法 1：使用 Curl**

```bash
$ sudo curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -o /usr/local/bin/yt-dlp

$ sudo chmod a+rx /usr/local/bin/yt-dlp
```

**方法二：使用 wget**

```bash
$ sudo wget https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -O /usr/local/bin/yt-dlp

$ sudo chmod a+rx /usr/local/bin/yt-dlp
```

**方法 3：使用 aria2c**

```bash
$ sudo aria2c https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp --dir /usr/local/bin -o yt-dlp

$ sudo chmod a+rx /usr/local/bin/yt-dlp
```

#### Linux 系统安装

- 在 Linux 上，你可以使用你的发行版的软件包管理器来安装 yt-dlp，例如 apt、yum、pacman 等。
- 也可以从[官方 GitHub 仓库](https://github.com/yt-dlp/yt-dlp/releases)下载 yt-dlp 文件，并将其放在你的系统路径中，例如 /usr/local/bin。你还需要安装 ffmpeg 和 ffprobe，这是 yt-dlp 的依赖项。

Linux 系统，执行以下两条简单命令即可安装完成

```sh
$ sudo wget https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -O /usr/local/bin/yt-dlp

$ sudo chmod a+rx /usr/local/bin/yt-dlp
```

#### 通过官方 Linux 仓库安装 Yt-dlp

为方便起见，一些 Linux 发行版在其官方存储库中提供了 Yt-dlp，允许你使用默认包管理器进行安装。以下是不同 Linux 发行版的 yt-dlp 安装说明：

**阿尔卑斯 Linux：**

```bash
$ doas apk -U add yt-dlp
```

**Arch Linux、EndeavourOS、Manjaro Linux：**

```bash
$ sudo pacman -S yt-dlp
```

**Debian、Ubuntu、Linux Mint、Pop！\_OS：**

```bash
$ sudo apt install yt-dlp
```

**软呢帽：**

```bash
$ sudo dnf install yt-dlp
```

**openSUSE 的：**

```bash
$ sudo zypper install yt-dlp
```

请注意，官方存储库中提供的版本有时可能略显过时。要访问最新功能和更新，通常建议使用官方推荐的方法，包括 或 ，如上所示。这些方法可确保你获得最新版本的 yt-dlp。` curl``wget `

#### Mac OS 系统安装

如果是使用 MAC 的，安装方法请移步参考官方文档

- 在 macOS 上，你可以使用 Homebrew 来安装 yt-dlp，如果你已经安装了 Homebrew。
- 也可以从[官方 GitHub 仓库](https://github.com/yt-dlp/yt-dlp/releases)下载 yt-dlp_macOS 文件，并将其放在你的系统路径中，例如 /usr/local/bin。你还需要安装 ffmpeg 和 ffprobe，这是 yt-dlp 的依赖项。

### 使用 Pip 安装 yt-dlp

要启动并运行 yt-dlp，你可以使用 Python 的包管理器 **[Pip](https://ostechnix.com/manage-python-packages-using-pip/)**。以下是各种安装方法：

**方法 1：标准安装**

```bash
$ python3 -m pip install -U yt-dlp
```

此命令将安装 yt-dlp 并确保它是最新的。

**方法 2：最小安装**

如果你更喜欢没有可选依赖项的精益安装：

```bash
$ python3 -m pip install --no-deps -U yt-dlp
```

此命令安装 yt-dlp 时不带任何可选组件。

**方法 3：切削刃（主分支）**

对于那些希望从 master 分支获得最新功能和更新的人：

```bash
$ python3 -m pip install -U pip setuptools wheel
$ python3 -m pip install --force-reinstall https://github.com/yt-dlp/yt-dlp/archive/master.tar.gz
```

请注意，在某些系统上，你可能需要使用 or 代替 .` py``python``python3 `

**更新 yt-dlp：**

要使 yt-dlp 保持最新状态，请运行以下命令：

```bash
$ python3 -m pip install -U yt-dlp
```

### 在 Linux 上安装 FFmpeg

为了让 Yt-dlp 从 YouTube 顺利下载 720p 视频并执行视频格式转换，它依赖于 **FFmpeg**。要在 Linux 系统上设置 FFmpeg，请参阅以下指南。

- [**如何在 Linux 上安装 FFmpeg**](https://ostechnix.com/install-ffmpeg-linux/)

### 使用 Termux 在 Android 上安装 yt-dlp

我们可以通过 **[Termux](https://ostechnix.com/termux-run-linux-android-devices-no-rooting-required/)** 在 Android 设备上安装 yt-dlp。

首先，在你的 Android 手机上**[安装 Termux](https://github.com/termux/termux-app#installation)**。

接下来，打开 Termux 应用程序并运行以下命令以授予 Termux 访问你手机存储的权限，从而允许文件下载。

```bash
termux-setup-storage
```

更新 Termux 中的所有软件包，以确保你拥有最新版本。

```bash
pkg update && pkg upgrade
```

安装基本依赖项，包括 Python、libexpat 和 OpenSSL。

```bash
pkg install libexpat openssl python
```

安装 yt-dlp 并确保它是最新的。Pip 是 Python 的包管理器，将为你处理安装。

```bash
pip install -U yt-dlp
```

如果你打算广泛使用视频操作，建议安装 FFmpeg。此步骤是可选的，但对于与视频相关的任务很有用。

```bash
pkg install ffmpeg
```

若要使 yt-dlp 保持最新状态，请定期运行以下命令：

```bash
pip install -U yt-dlp
```

这可确保你始终通过 Termux 在 Android 设备上使用最新版本的 yt-dlp。你现在可以轻松地在 Android 上下载你喜欢的内容！

### 安装总结

安装方法很多，如：

- Python 的 pip 安装（已经安装有 Python3 编译器的设备，并带包管理器 pip）
- Homebrew 安装（适用于 macOS，并且安装了 Homebrew）
- yum/apt 软件包管理器安装（适用于 Linux）
- 手动配置环境变量（适用于全系统）

### 更新 yt-dlp

如果你使用 or 或 手动安装了 yt-dlp，则可以通过执行以下命令来更新它：` curl``wget``aria2c `

```bash
$ sudo yt-dlp -U
```

对于使用 pip 安装 yt-dlp 的用户，请使用以下命令进行更新：

```bash
$ python3 -m pip install -U yt-dlp
```

如果你使用发行版的包管理器安装了 yt-dlp，请根据系统的包管理器更新 yt-dlp。例如，在 Arch Linux 上，将 yt-dlp 更新为：

```bash
$ sudo pacman -Syu
```

在 Debian 和 Ubuntu 系统上，你可以使用以下命令更新 yt-dlp：

```bash
$ sudo apt update
```

使 yt-dlp 保持最新状态可确保你能够访问最新功能和错误修复。

### 卸载 yt-dlp

```bash
python3 -m pip uninstall yt-dlp
```

## 图文具体安装

### 如何下载及安装 YT-DLP？

- 前往 yt-dlp 官方 GitHub 存储库： [https://github.com/yt-dlp/yt-dlp](https://www.youtube.com/redirect?event=video_description&redir_token=QUFFLUhqbEozdVJoQkhkcUd4VTdjaXZUdGtxSERHck9yd3xBQ3Jtc0tsWFpfYm5FbUppd1JiRDY5elRqTzFfREtGc3l0NzdGUW5qOWFKVXBvUXdjLThaeVUyYzdVaHZYc3FSaHZKYl9Ua3VRUWhNRDhvQ05FdmNiQ3lOTzZwTnNQYVVSeFpqQXNKV0g1T2wtdjhUaUVKQ2sydw&q=https%3A%2F%2Fgithub.com%2Fyt-dlp%2Fyt-dlp&v=HpAnrQbZoC4)
- 向下滚动页面，直到看到下载按钮。 这是一个内部锚点链接，会带您到 https://github.com/yt-dlp/yt-dlp#installation。

![下载并安装 Yt-dlp](./yt-dlp下载安装使用.assets/guide_to_yt-dlp_25-1024x527.png)

- 在这个安装页面上，向下滚动页面找到最新的发布文件。 找到可执行文件，yt-dlp（推荐使用 zip 导入二进制文件的 Linux 或 BSD 版本）、yt-dlp.exe（适用于 Windows）或 yt-dlp_macOS（适用于 macOS）。 如果您的操作系统不支持这些发布文件，请在此页面上向下滚动并找到“替代方法”以查找更多选项。
- 选择您的平台或操作系统，下载适当的发布文件。

![下载并安装 Yt-dlp](./yt-dlp下载安装使用.assets/guide_to_yt-dlp_29-1-1024x547.png)

### a. 在 Windows 上下载及安装 yt-dlp。

- 为了说明问题，我们将在 Windows 2022 Server 上下载和安装 yt-dlp.exe。
- 下载完成后，请验证文件的大小、版本和公司，并双击这个 .exe 文件进行安装。

![下载并安装 Yt-dlp](./yt-dlp下载安装使用.assets/guide_to_yt-dlp_30.png)

- 只要您具有管理员权限，双击这个可执行文件就可以在您的计算机上安装 yt-dlp。

### b. 在 Linux (Ubuntu) 中下载和安装 yt-dlp.

- 为了说明问题，我们将在 Ubuntu 22.04 中下载和安装 yt-dlp 的最新版本。 确保您的 Ubuntu 机器已经更新到最新版本。
- 下面的命令从 GitHub 下载 yt-dlp 程序的最新版本，并将其安装在 /usr/local/bin 目录下，文件名为 yt-dlp。

```bash
$ sudo wget https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -O /usr/local/bin/yt-dlp
```

![下载并安装 Yt-dlp](./yt-dlp下载安装使用.assets/guide_to_yt-dlp_5.png)

以下命令将 /usr/local/bin 目录中的 yt-dlp 文件的权限设置为允许所有用户（所有者、组和其他人）读取和执行该文件。

```bash
$ sudo chmod a+rx /usr/local/bin/yt-dlp
```

这个命令是必要的，以允许用户从命令行运行 yt-dlp 命令。

![下载并安装 Yt-dlp](./yt-dlp下载安装使用.assets/guide_to_yt-dlp_26.png)

## yt-dlp 选项

### 常规选项

```python
-h, --help                       打印帮助文本并退出
--version                        打印程序版本并退出
-U, --update                     将这个程序更新到最新版本。确保您有足够的权限(如果需要，可以使用sudo运行)
-i, --ignore-errors              忽略下载和后处理错误。即使后处理失败，downlocal也被认为是成功的
--no-abort-on-error              继续下一个关于下载错误的视频;例如跳过播放列表中不可用的视频(默认)
--abort-on-error                 如果发生错误，终止进一步的视频下载(别名:——no-ignore-errors)
--dump-user-agent                显示当前用户代理并退出
--list-extractors                列出所有支持的提取器并退出
--extractor-descriptions         所有支持的提取器和退出的输出描述
--force-generic-extractor        使用通用提取器强制提取
--default-search PREFIX          对不符合条件的url使用此前缀。
                                 例如“gvsearch2:”为搜索词“大苹果”从谷歌视频下载两个视频。
                                 使用值"auto"让yt-dlp进行猜测("auto_warning"在猜测时发出警告)。
                                  "error"只是抛出一个错误。默认值“fixup_error”修复损坏的url，
                                 但如果无法进行搜索，则会发出错误
--ignore-config, --no-config     禁用加载除——config-location提供的配置文件外的任何配置文件。
                                 当在配置中给出时文件，不再加载进一步的配置文件。
                                 此外，(为了向后兼容)如果在系统配置文件中找到这个选项，
                                 则用户配置不会被加载
--config-location PATH           主配置文件的位置;到配置或其包含目录的路径
--flat-playlist                  不提取播放列表中的视频，只列出它们
--no-flat-playlist               提取一个playzist的视频
--mark-watched                   标记视频观看(甚至-模拟)。目前仅支持YouTube
--no-mark-watched                不标记观看的视频(默认)
--no-colors                      不发出彩色代码输出
--compat-options OPTS            可以帮助保持兼容性的选项使用youtube-dl或youtube-dlc
                                 通过恢复一些配置对yt-dlp的改动。看到“差异默认行为”的详细信息
```

### 网络选项

```python
--proxy URL                      使用指定的HTTP/HTTPS/SOCKS代理。
                                 要启用SOCKS代理，请指定合适的代理
                                 计划。例如
                                 socks5: / / 127.0.0.1:1080 /。传入空的
                                 String(——proxy "")用于直接连接
--socket-timeout SECONDS         在放弃之前等待的时间，以秒为单位
--source-address IP              绑定到的客户端IP地址
-4, --force-ipv4                 通过IPv4进行所有连接
-6, --force-ipv6                 通过IPv6进行所有连接
```

### 地理限制

```python
--geo-verification-proxy URL     使用此代理来验证的IP地址
                                 一些geo-restricted网站。默认的
                                 由——Proxy指定的代理(如果
                                 选项不存在)用于
                                 实际下载
--geo-bypass                     通过作假绕过地理限制X-Forwarded-For HTTP头
--no-geo-bypass                  不绕过地理限制通过伪造X-Forwarded-For HTTP报头

--geo-bypass-country CODE        武力绕过地理限制明确提供了两个字母的ISO 3166-2国家代码
--geo-bypass-ip-block IP_BLOCK  武力绕过地理限制在CIDR中明确提供的IP块符号
```

### 视频选择

```python
--playlist-start NUMBER          播放列表视频开始(默认为1)
--playlist-end NUMBER            播放列表视频结束(默认是最后)
--playlist-items ITEM_SPEC       播放列表视频项目下载。指定
                                 播放列表中视频的索引
                                 用逗号隔开，如:"——playlist-items
                                 1 2 5 8英寸，如果你想下载视频
                                 在播放列表中索引1,2,5,8。你可以
                                 指定范围:”——playlist-items
                                 1-3,7,10-13"，它会下载视频
                                 在指数12 3 7 10 11 12和13处
--max-downloads NUMBER           下载NUMBER文件后中止
--min-filesize SIZE              切勿下载任何小于尺寸(如50k或446m)的影片。
--max-filesize SIZE              切勿下载超过大小的影片(例如50k或446m)
--date DATE                      只下载在此日期上传的视频。日期可以是“YYYYMMDD”或以下格式"
                                 (now l today) [+-][0-9] (day lweek | month l year) (s)?"
--datebefore DATE                只下载在此日期或之前上传的视频。接受的日期格式与——date相同
--dateafter DATE                 只下载在此日期或之后上传的视频。接受的日期格式与——date相同
--match-filter FILTER            通用的视频滤镜。任何领域(见
                                 “输出模板”)可以与
                                 数字或使用运算符的字符串
                                 定义于“过滤格式”。你可以
                                 还可以简单地指定要匹配的字段
                                 Field is present and !字段"来检查是否
                                 该字段不存在。此外,
                                 Python风格的正则表达式匹配
                                 可以使用“~=”和多个
                                 过滤器可以用“&”进行检查。使用“\”
                                 转义"&"或引号(如果需要)。例如:
                                 ——match-filter”!is_live & like_count > ?One hundred.
                                 & description~='(?i)\bcats \& dogs\b'"
                                 只匹配那些不是直播的视频，有
                                 一个点赞数超过100个(或类似数)
                                 字段不可用)，并具有
                                 包含短语“猫”的描述
                                 &狗”(忽略案例)
--no-match-filter                不要使用通用的视频过滤器(默认)
--no-playlist                    如果URL指的是视频和播放列表，则只下载视频
--yes-playlist                   如果URL是指视频和播放列表，请下载播放列表
--age-limit YEARS                只下载适合特定年龄的视频
--download-archive FILE          只下载档案文件中没有列出的视频。记录所有下载视频的id
--break-on-existing              当遇到存档中的文件时，停止下载过程
--break-on-reject                当遇到已过滤掉的文件时，停止下载过程
--skip-playlist-after-errors N   允许的失败数，直到跳过播放列表的其余部分
--no-download-archive            不要使用存档文件(默认)
```

### 下载选项

```python
-N, --concurrent-fragments N     应该并发下载的dash/ hlnative视频片段数(默认为1)
-r, --limit-rate RATE            最大下载速率(字节/秒)(例如50K或4.2M)
--throttled-rate RATE            最小下载速率(以字节/秒为单位)，低于此速率时将进行节流并重新提取视频数据(例如100K)


-R, --retries RETRIES            重试次数(默认为10)，或“无限”
--fragment-retries RETRIES       一个片段的重试次数(默认为10)，或“无限”(DASH, hLsnative和~ AAAISM)
--skip-unavailable-fragments     跳过DASH hlnative和ISM的不可用片段(默认)
                                 (Alias: --no-abort-on-unavailable-fragment)
--abort-on-unavailable-fragment  如果片段不可用，则中止下载
                                 (Alias: --no-skip-unavailable-fragments)
--keep-fragments                 下载完成后，将下载的片段保存在磁盘上
--no-keep-fragments              下载完成后删除下载的片段(默认)
--buffer-size SIZE               下载缓冲区的大小(例如1024或16K)(默认是1024)
--resize-buffer                  缓冲区大小从初始值——buffer-size(默认值)自动调整
--no-resize-buffer               不自动调整缓冲区大小
--http-chunk-size SIZE           基于块的HTTP下载块的大小(例如10485760或10M)(默认禁用)。
                                 可能对绕过网络服务器施加的带宽节流有用(实验)
--playlist-reverse               按倒序下载播放列表视频
--no-playlist-reverse            按默认顺序下载播放列表视频(默认)
--playlist-random                按随机顺序下载播放列表视频
--xattr-set-filesize             设置文件xattribute ytdl。文件大小与预期的文件大小
--hls-use-mpegts                 对HLS视频使用mpegts容器;允许一些播放器在下载时播放视频，
                                 并减少下载中断时文件损坏的机会。这在默认情况下为实时流启用
--no-hls-use-mpegts              不要在HLS视频中使用mpegts容器。当不下载实时流时，这是默认值
--downloader [PROTO:]NAME        要加载的外部下载程序的名称或路径
                                 使用(可选地)以协议为前缀
                                 (http, ftp, m3u8, dash, rstp, rtmp, mms)到
                                 用它来。目前支持本地,
                                 Aria2c avconv axel curl ffmpeg httpie
                                 wget(推荐:aria2c)。您可以使用
                                 此选项多次设置不同
                                 不同协议的下载程序。为
                                 示例:——downloader aria2c——downloader
                                 "dash,m3u8:native"将使用aria2c
                                 Http /ftp下载，和本机
                                 下载的dash/m3u8下载
                                 (别名:——external-downloader)
--downloader-args NAME:ARGS      把这些论点交给外部
                                 下载器。指定下载器名称和
                                 参数由冒号":"分隔。为
                                 Ffmpeg，参数可以传递给
                                 不同的位置使用相同的语法
                                 ——postprocessor-args。你可以用这个
                                 选择多次给予不同
                                 不同下载程序的参数
                                 (别名:——external-downloader-args)

```

### 文件系统选项

```python
-a, --batch-file FILE            包含要下载的url的文件('-' for
                                 stdin)，每行一个URL。行开始
                                 '#'， ';'或']'被认为是评论和忽视
--no-batch-file                  不从批处理文件中读取url(默认)
-P, --paths [TYPES:]PATH         文件所在的路径
                                 下载。指定文件类型和
                                 以冒号“:”分隔的路径。所有的
                                 支持与——output相同的类型。
                                 此外，您还可以提供“家”
                                 (默认)和"temp"路径。所有
                                 中间文件首先被下载到
                                 临时路径和最终文件是
                                 下载后移动到主路径
                                 完成为止。如果。该选项将被忽略
                                 ——output是一个绝对路径
-o, --output [TYPES:]TEMPLATE    输出文件名模板;详见“输出模板”
--output-na-placeholder TEXT     不可用元的占位符值 输出文件名模板中的字段 (默认:“NA”)
--restrict-filenames             将文件名限制为ASCII字符，避免文件名中出现"&"和空格
--no-restrict-filenames          允许使用Unicode字符，"&"和空格文件名(默认)
--windows-filenames              强制文件名与窗口兼容
--no-windows-filenames           使文件名窗口兼容只有当使用windows(默认)
--trim-filenames LENGTH          限制文件名长度(不包括扩展)到指定的号码字符
-w, --no-overwrites              不覆盖任何文件
--force-overwrites               覆盖所有视频和元数据文件。他的选择包括——不继续
--no-force-overwrites            不覆盖视频，但覆盖相关文件(默认)
-c, --continue                   恢复部分下载的文件/片段(默认)
--no-continue                    不要恢复部分下载的片段。如果文件没有分片，则开始下载整个文件
--part                           使用.part文件而不是直接写入输出文件(默认)
--no-part                        不要使用。part文件-直接写入输出文件
--mtime                          使用Last-modified头来设置文件修改时间(默认)
--no-mtime                       不使用Last-modified头来设置文件修改时间
--write-description              将视频描述写入。description文件
--no-write-description           不写视频描述(默认)
--write-info-json                将视频元数据写入.info.json文件(可能包含个人信息)
--no-write-info-json             不写视频元数据(默认)
--write-playlist-metafiles       编写播放列表元数据，除了
                                 使用——write-info-json时的视频元数据，
                                 ——write-description等等。(默认)
--no-write-playlist-metafiles    当使用——write-info-json，——write-description等时，不要写入播放列表元数据。
--clean-infojson                 删除一些私有字段，例如
                                 infojson中的文件名。注意它
                                 还会有私人恩怨吗
                                 信息(默认)
--no-clean-infojson              将所有字段写入infojson
--write-comments                 检索视频评论放置在
                                 infojson。这些评论是牵强附会的
                                 没有这个选项，如果提取是
                                 以快速著称(别名:-get-comments)
--no-write-comments              不要检索视频评论，除非 撤离速度是众所周知的 (别名:——no-get-comments)
--load-info-json FILE            包含视频信息的JSON文件(使用"——write-info-json"选项创建)
--cookies FILE                   文件读取cookie和转储cookie罐子
--no-cookies                     不要从/文件默认读取/转储cookie)
--cookies-from-browser BROWSER[:PROFILE]
                                 的用户配置文件加载cookie
                                 给定的web浏览器。目前支持
                                 浏览器有:勇敢，铬，铬，
                                 Edge, firefox, opera, safari, vivaldi。你
                                 可以指定用户配置文件名称或
                                 使用"BROWSER:PROFILE_NAME"或
                                 “浏览器:PROFILE_PATH”。如果没有配置文件
                                 给定，最近访问的是
                                 使用
--no-cookies-from-browser        不要从浏览器加载cookie(默认)
--cache-dir DIR                  youtube-dl所在的文件系统中的位置
                                 可以存储一些下载的信息(如 作为客户端标识和签名)永久。
                                 默认情况下$XDG_CACHE_HOME/yt-dlp或
                                 ~ / .cache / yt-dlp
--no-cache-dir                   禁用文件系统缓存
--rm-cache-dir                   删除所有文件系统缓存文件
```

### 缩略图选项

```python
--write-thumbnail                将缩略图图像写入磁盘
--no-write-thumbnail             不将缩略图图像写入磁盘(默认)
--write-all-thumbnails           将所有缩略图图像格式写入磁盘
--list-thumbnails                列出每个视频的可用缩略图。模拟除非使用-no- simulation

```

### 互联网快捷方式选项

```python
--write-link                     写一个互联网快捷方式文件，取决于
                                 在当前平台上(。url, .webloc或
                                 desktop)。该URL可能被操作系统缓存
--write-url-link                 编写一个。url的Windows互联网快捷方式。操作系统根据文件路径缓存URL
--write-webloc-link              编写一个。webloc macOS互联网快捷方式
--write-desktop-link             编写一个。desktop Linux internet快捷方式

```

### 详细程度和模拟选项

```python
-q, --quiet                      启动安静模式。如果与——verbose一起使用，则将日志打印到stderr
--no-warnings                    忽略警告,
-s, --simulate                   不下载视频，不写任何东西到磁盘
--no-simulate                    即使使用了打印/列表选项，也可以下载视频
--ignore-no-formats-error        忽略“无视频格式”错误。有用 提取元数据，即使是视频
                                 实际上不是可以下载的吗 (实验)
--no-ignore-no-formats-error     当没有找到可下载的视频格式时抛出错误(默认)
--skip-download                  不下载视频，但写入所有相关文件(别名:——no-download)
-O, --print TEMPLATE             安静的，但要为每个字段打印给定的字段 视频。模拟除非——no- simulation是
                                 使用。一个字段名或相同的语法 可以使用输出模板
-j, --dump-json                  安静的，但是为每个输出JSON信息
                                 视频。模拟除非——no- simulation是
                                 使用。参见“输出模板”
                                 可用密钥描述
-J, --dump-single-json           安静，但是为每个输出JSON信息
                                 Url或infojson已传递。模拟,除非
                                 ——no-simulate使用。如果URL指向
                                 一个播放列表，整个播放列表信息
                                 在一条线上倾倒
--force-write-archive            即使使用了-s或其他模拟选项，只要没有发生错误，就强制写入下载存档项
                                 (Alias: --force-download-archive)
--newline                        以新行输出进度条
--no-progress                    不打印进度条
--progress                       显示进度条，即使在安静模式
--console-title                  在控制台标题栏显示进度
--progress-template [TYPES:]TEMPLATE
                                 可选的进度输出模板
                                 以“download:”(默认)作为前缀，
                                 “download-title”(主机游戏名称)，
                                 “后处理:”或“postprocess-title:”。
                                 视频的字段可以在
                                 "info"键和进度属性是
                                 可在“进度”键下访问。例如:
                                 ——console-title progress-template
                                 “download-title: % s - (info.id) % (progress.eta)”
-v, --verbose                    打印各种调试信息
--dump-pages                     打印使用base64编码的下载页面以调试问题(非常冗长)
--write-pages                    将下载的中间页面写入当前目录中的文件以调试问题
--print-traffic                  显示发送和读取的HTTP流量

```

### 解决方法

```python
--encoding ENCODING              强制指定的编码(实验性)
--no-check-certificate           禁止HTTPS证书验证
--prefer-insecure                使用未加密的连接来检索有关视频的信息(目前仅支持YouTube)
--user-agent UA                  指定自定义用户代理
--referer URL                    指定一个自定义引用，如果视频访问被限制在一个域使用
--add-header FIELD:VALUE         指定一个自定义HTTP报头及其值，用冒号":"分隔。你可以多次使用这个方法
--bidi-workaround                解决缺乏双向文本支持的终端。在PATH中需要双div r fribidi可执行文件
--sleep-requests SECONDS         数据提取期间请求之间的休眠秒数
--sleep-interval SECONDS         入睡前的秒数
                                 下载。这是最小的睡眠时间
                                 当与——max-sleep-interval一起使用时
                                 (别名:——min-sleep-interval)
--max-sleep-interval SECONDS     睡眠的最大秒数。只能与-min-sleep-interval一起使用
--sleep-subtitles SECONDS        每次字幕下载前休眠的秒数
```

### 视频格式选项

```python
-f, --format FORMAT              视频格式代码，详见“格式选择”
-S, --format-sort SORTORDER      根据给定的字段对格式进行排序，详见“格式排序”
--S-force, --format-sort-force   强制用户指定的排序顺序优先于所有字段，详情请参阅“排序格式”
--no-format-sort-force           有些字段优先于用户指定的排序顺序(默认)，请参阅“排序格式”了解更多细节
--video-multistreams             允许多个视频流合并成一个单一的文件
--no-video-multistreams          每个输出文件只下载一个视频流(默认)
--audio-multistreams             允许多个音频流合并成一个单一的文件
--no-audio-multistreams          每个输出文件只下载一个音频流(默认)
--prefer-free-formats            更喜欢带有免费容器的视频格式 而非同等质量的免费产品。使用
                                 与“-S ext”严格偏好免费 集装箱不论质量如何
--no-prefer-free-formats         不要给空闲容器任何特殊的优先级(默认)
--check-formats                  检查所选的格式是否确实可以下载
--no-check-formats               不检查所选的格式实际上是可下载的
-F, --list-formats               列出每个视频的可用格式。模拟除非使用-no- simulation
--merge-output-format FORMAT     如果需要合并(例如，bestvideo+bestaudio)，输出到给定的容器格式。mkv mp4 ogg
                                 webm flv。如果不需要合并，则忽略

```

### 字幕选项

```python
--write-subs                     编写字幕文件
--no-write-subs                  不写字幕文件(默认)
--write-auto-subs                写自动生成的字幕文件(别名:——Write -automatic-subs)
--no-write-auto-subs             不写自动生成的字幕(默认)(别名:——no-write-automatic-subs)
--list-subs                      列出每个视频可用的字幕。模拟除非使用-no- simulation
--sub-format FORMAT              字幕格式，接受格式优先，例如:“srt”或“ass/srt/best”
--sub-langs LANGS                语言字幕下载(可以是正则表达式)或用逗号分隔的“全部”。
                                 (例如:——sub-langs en.*，ja 带有"-"的语言代码免除了它
                                 从请求的语言。(如:——子 使用——list-subs 可用语言标记列表
```

### 身份验证选项

```python
-u, --username USERNAME          使用此帐户ID登录
-p, --password PASSWORD          账户密码。如果省略了这个选项，那么yt-dlp将会交互地询问
-2, --twofactor TWOFACTOR        双因素身份验证代码
-n, --netrc                      使用.netrc身份验证数据
--netrc-location PATH            .netrc认证数据的位置;路径或其包含的目录。默认为~ / . netrc
--video-password PASSWORD        视频密码(vimeo, youku)
--ap-mso MSO                     Adobe Pass多系统运营商(电视供应商)标识符，使用——ap-list-mso为可用的mso列表
--ap-username USERNAME           多系统操作员帐号登录
--ap-password PASSWORD           多系统操作员帐号密码。
                                 如果省略了这个选项，那么yt-dlp将会交互地询问
--ap-list-mso                    列出所有支持的多系统操作符
```

### 后处理选项

```python
-x, --extract-audio              将视频文件转换为音频文件(需要ffmpeg和ffprobe)
--audio-format FORMAT            指定音频格式以转换音频
                                 当使用-x时。目前支持
                                 格式有:best(默认)或
                                 最好| aac | flac mp3 | | m4a格式|作品| vorbis | wav
--audio-quality QUALITY          指定ffmpeg音频质量，插入一个
                                 值介于0(较好)和9(较差)之间
                                 VBR或特定的比特率，如128K (默认5)
--remux-video FORMAT             将视频重新放入另一个容器，如果 必要的
                                 (目前支持:mp4|mkv|flv | webm | mov avi mp3 | | | mka | m4a格式| ogg |作品)。
                                 如果 目标容器不支持 视频/音频编解码器，重放将失败。你
                                 可以指定多个规则;如。 “aac>m4a/mov>mp4/mkv”将重放aac到 M4a, mov到mp4，其他任何东西到mkv。
--recode-video FORMAT            重新编码成另一种格式，如果 重新编码是必要的。的语法和 支持的格式与——remux-video相同
--postprocessor-args NAME:ARGS   将这些参数给后处理器。
                                 指定后处理器/可执行程序名称
                                 参数由冒号":"分隔
                                 将参数赋给指定的
                                 后处理程序/可执行。支持页:
                                 合并,ModifyChapters SplitChapters,
                                 ExtractAudio、VideoRemuxer VideoConvertor,
                                 元数据、EmbedSubtitle EmbedThumbnail,
                                 SubtitlesConvertor ThumbnailsConvertor,
                                 FixupStretched、FixupM4a FixupM3u8,
                                 FixupTimestamp FixupDuration。的
                                 支持的可执行文件有:AtomicParsley，
                                 FFmpeg FFprobe。你也可以指定
                                 “PP+EXE:ARGS”给出了论证
                                 仅在使用时指定可执行文件
                                 由指定的后处理程序处理。
                                 此外，对于ffmpeg/ffprobe， "_i"/"_o"
                                 可以附加到前缀可选
                                 后面跟着一个数字来传递参数
                                 在指定的输入/输出文件之前。例如:
                                 ——ppa“合并+ ffmpeg_i1: - v安静”。你可以
                                 多次使用这个选项
                                 不同的论点
                                 后处理程序。(别名:——ppa)
-k, --keep-video                 后期处理后将中间视频文件保存在磁盘上
--no-keep-video                  后期处理后删除中间视频文件(默认)
--post-overwrites                覆盖后期处理的文件(默认)
--no-post-overwrites             不覆盖后期处理的文件
--embed-subs                     视频中嵌入字幕(仅mp4, webm和mkv视频)
--no-embed-subs                  不要嵌入字幕(默认)
--embed-thumbnail                嵌入缩略图在视频作为封面艺术
--no-embed-thumbnail             不嵌入缩略图(默认)
--embed-metadata                 在视频文件中嵌入元数据。还增加了
                                 章节文件除非-no-add-章
                                 别名:——add-metadata
--no-embed-metadata              不添加元数据到文件(默认)(别名:——no-add-metadata)
--embed-chapters                 添加章节标记到视频文件(别名:——Add -章)
--no-embed-chapters              不添加章节标记(默认)(别名:——no-add-章)
--parse-metadata FROM:TO         解析其他领域的元数据，如标题/艺术家;详情请参见“修改元数据”
--replace-in-metadata FIELDS REGEX REPLACE 使用给定的正则表达式替换元数据字段中的文本。这个选项可以多次使用
--xattrs                         将元数据写入视频文件的xattrs(使用dublin core和xdg标准)
--fixup POLICY                  自动纠正系统的已知故障
                                文件。一个永远(什么都不做)，警告(只有)
                                发出警告)，detect_or_warn
                                违约;如果可以，修复文件，警告
                                否则)，强制(尝试修复即使文件
                                已经存在
--ffmpeg-location PATH          ffmpeg二进制文件的位置;二进制文件或其包含目录的路径
--exec CMD                       在文件上执行命令
                                 下载和后处理。相同
                                 语法作为输出模板可以使用
                                 将任何字段作为参数传递给
                                 命令。附加字段“filepath”
                                 它包含了
                                 下载的文件也可用。如果没有
                                 字段被传递，%(filepath)q被追加
                                 直到命令的最后。这个选项可以
                                 多次使用
--no-exec                        删除任何先前定义的——exec
--exec-before-download CMD       执行命令之前，实际下载。语法与——exec相同
                                 但是“filepath”不可用。这选项可以多次使用
--no-exec-before-download        删除任何以前定义的- execute -before-download
--convert-subs FORMAT            将字幕转换为另一种格式(目前支持:srt|vtt|ass|lrc)(别名:——Convert -副标题)
--convert-thumbnails FORMAT      将缩略图转换为另一种格式(目前支持:jpg|png)
--split-chapters                 将视频分割成多个文件基于
                                 内部章节。“章:”前缀
                                 可以与"——paths"和"——output"一起使用
                                 设置分割的输出文件名
                                 文件。详见“OUTPUT TEMPLATE”
--no-split-chapters              不要基于章节分割视频(默认)
--remove-chapters REGEX          删除标题匹配的章节
                                 给定的正则表达式。时间范围
                                 用“*”作为前缀也可以在适当的地方使用
                                 的章节，以删除指定的范围。
                                 如:remove-chapters“* 10:15-15:00”
                                 ——remove-chapters“介绍”。这个选项可以多次使用
--no-remove-chapters             不要从文件中删除任何章节(默认)
--force-keyframes-at-cuts       强制关键帧围绕章节之前
                                删除/分裂。需要一个
                                重新编码会很慢，但是
                                最终的视频可能有更少的伪影
                                在削减
--no-force-keyframes-at-cuts    当切割/分割章节时，不要强制关键帧(默认)插件的(区分大小写)名称
--use-postprocessor NAME[:ARGS]  启用后处理器，以及 (可选)传递给它的参数，
                                 由冒号":"分隔。参数是一个
                                 分号";"分隔的NAME=VALUE列表。
                                 "when"参数决定 后处理程序被调用。它可以是
                                 “pre_process”(提取)后, "before_dl"(视频下载前)，
                                 "post_process"(视频下载后; 或"after_move"(在移动文件后
                                 最终到达目的地)。这个选项可以 可多次使用以添加不同 后处理程序

```

### 提取器选项

```python
--extractor-retries RETRIES      已知提取器错误的重试次数(默认为3)，或“无限”
--allow-dynamic-mpd              进程动态DASH清单(默认)(别名:——no-ignore-dynamic-mpd)
--ignore-dynamic-mpd             不处理动态DASH清单(别名:—no-allow-dynamic-mpd)
--hls-split-discontinuity        将HLS播放列表分割成不同的格式，如广告中断
--no-hls-split-discontinuity     不要将HLS播放列表分割成不同的格式，如广告中断(默认)
--extractor-args KEY:ARGS        将这些参数传递给提取器。看到 详细信息请参见“EXTRACTOR ARGUMENTS”。
                                 你可以多次使用这个选项 不同提取器的参数
```

### 输出模板

```python
该-o选项用于指示输出文件名的模板，而-P选项用于指定每种类型的文件应保存到的路径。

tl;dr： 导航到示例。

最简单的用法-o是在下载单个文件时不设置任何模板参数，例如 in yt-dlp -o funny_video.flv "https://some/video"（不推荐像这样的硬编码文件扩展名，可能会破坏一些后处理）。

然而，它也可能包含在下载每个视频时将被替换的特殊序列。特殊序列可以根据python字符串格式化操作进行格式化。例如，%(NAME)s或%(NAME)05d。澄清一下，这是一个百分比符号，后跟括号中的名称，后跟格式化操作。

字段名本身（括号内的部分）也可以有一些特殊的格式：

对象遍历：可以使用.（点）分隔符遍历元数据中可用的字典和列表。您还可以使用:. 例如：%(tags.0)s, %(subtitles.en.-1.ext)s, %(id.3:7:-1)s, %(formats.:.format_id)s。%()s指的是整个 infodict。请注意，下面未列出使用此方法可用的所有字段。使用-j看到这样的领域
加法：数字字段的加法和减法可以分别使用+和来完成-。例如：%(playlist_index+10)03d，%(n_entries+1-playlist_index)d
日期/时间格式：可以根据strftime 格式设置日期/时间字段的格式，方法是使用>. 例如：%(duration>%H-%M-%S)s, %(upload_date>%Y-%m-%d)s,%(epoch-3600>%H-%M-%S)s
备选：备选字段可以用,. 例如：%(release_date>%Y,upload_date>%Y|Unknown)s
Default：可以使用|分隔符指定字段为空时的文字默认值。这将覆盖--output-na-template. 例如：%(uploader|Unknown)s
更换算：除了正常格式类型diouxXeEfFgGcrs，B，j，l，q可用于转化成乙ytes，Ĵ子，逗号分隔升IST（替代形式标志#使得新线\n分隔）和一个串q uoted为终端，分别
Unicode 规范化：格式类型U可用于 NFC Unicode 规范化。替代形式标志 ( #) 将规范化更改为 NFD，并且转换标志+可用于 NFKC/NFKD 兼容性等价规范化。例如：%(title)+.100U是 NFKC
总而言之，字段的一般语法是：

%(name[.keys][addition][>strf][,alternate][|default])[flags][width][.precision][length]type
此外，您可以通过指定文件类型，后跟以冒号分隔的模板，为各种元数据文件分别设置不同的输出模板与通用输出模板:。支持的不同文件类型是subtitle、thumbnail、description、annotation（已弃用）、infojson、link、pl_thumbnail、pl_description、pl_infojson、chapter。例如，-o '%(title)s.%(ext)s' -o 'thumbnail:%(title)s\%(title)s.%(ext)s' 将缩略图放在与视频同名的文件夹中。如果任何模板（默认除外）为空，则不会写入该类型的文件。例如：--write-thumbnail -o "thumbnail:"只会为播放列表而不是视频编写缩略图。
123456789101112131415161718192021
id （字符串）：视频标识符
title （字符串）：视频标题
url （字符串）：视频网址
ext （字符串）：视频文件扩展名
alt_title （字符串）：视频的次要标题
description （字符串）：视频的描述
display_id （字符串）：视频的替代标识符
uploader (string): 视频上传者的全名
license （字符串）：视频许可的许可名称
creator （字符串）：视频的创建者
timestamp （数字）：视频可用时的 UNIX 时间戳
upload_date （字符串）：视频上传日期（YYYYMMDD）
release_date (string): 视频发布的日期 (YYYYMMDD)
release_timestamp （数字）：视频发布时刻的 UNIX 时间戳
uploader_id （字符串）：视频上传者的昵称或 ID
channel （字符串）：上传视频的频道的全名
channel_id （字符串）：频道的 ID
location （字符串）：视频拍摄的物理位置
duration （数字）：以秒为单位的视频长度
duration_string （字符串）：视频的长度（HH:mm:ss）
view_count （数字）：有多少用户在平台上观看过视频
like_count （数字）：视频的正面评价数
dislike_count （数字）：视频的负面评价数
repost_count （数字）：视频的转发次数
average_rating （数字）：用户给出的平均评分，使用的比例取决于网页
comment_count (numeric): 视频的评论数（对于一些提取器，评论只在最后下载，所以这个字段不能使用）
age_limit （数字）：视频的年龄限制（年）
live_status （字符串）：“is_live”、“was_live”、“is_upcoming”、“not_live”之一
is_live (boolean): 这个视频是直播还是定长视频
was_live (boolean): 这个视频最初是否是直播
playable_in_embed (string): 此视频是否允许在其他网站的嵌入式播放器中播放
availability (string): 视频是“private”、“premium_only”、“subscriber_only”、“needs_auth”、“unlisted”还是“public”
start_time （数字）：在 URL 中指定的应开始再现的时间（以秒为单位）
end_time （数字）：复制结束的时间（以秒为单位），如 URL 中所指定
format (string): 人类可读的格式描述
format_id (string): 指定的格式代码 --format
format_note （字符串）：关于格式的附加信息
width （数字）：视频的宽度
height （数字）：视频的高度
resolution (string): 宽度和高度的文字描述
tbr （数字）：以 KBit/s 为单位的音频和视频的平均比特率
abr （数字）：以 KBit/s 为单位的平均音频比特率
acodec （字符串）：正在使用的音频编解码器的名称
asr （数字）：以赫兹为单位的音频采样率
vbr （数字）：以 KBit/s 为单位的平均视频比特率
fps （数字）：帧率
dynamic_range （字符串）：视频的动态范围
vcodec （字符串）：正在使用的视频编解码器的名称
container （字符串）：容器格式的名称
filesize （数字）：字节数，如果事先知道
filesize_approx （数字）：估计字节数
protocol （字符串）：将用于实际下载的协议
extractor （字符串）：提取器的名称
extractor_key (string): 提取器的键名
epoch （数字）：创建文件时的 Unix 纪元
autonumber (numeric): 每次下载都会增加的数字，从 --autonumber-start
n_entries （数字）：播放列表中提取的项目总数
playlist （字符串）：包含视频的播放列表的名称或 ID
playlist_index （数字）：播放列表中视频的索引，根据最终索引填充前导零
playlist_autonumber （数字）：视频在播放列表下载队列中的位置，根据播放列表的总长度填充前导零
playlist_id （字符串）：播放列表标识符
playlist_title （字符串）：播放列表标题
playlist_uploader （字符串）：播放列表上传者的全名
playlist_uploader_id （字符串）：播放列表上传者的昵称或 ID
webpage_url （字符串）：视频网页的 URL，如果提供给 yt-dlp 应该允许再次获得相同的结果
original_url（字符串）：用户提供的 URL（或与webpage_url播放列表条目相同）

可用于属于某个逻辑章节或部分的视频：

chapter （字符串）：视频所属章节的名称或标题
chapter_number （数字）：视频所属章节的编号
chapter_id (string): 视频所属章节的 ID
可用于作为某些系列或节目的一集的视频：

series （字符串）：视频剧集所属的系列或节目的标题
season （字符串）：视频剧集所属的季节标题
season_number （数字）：视频剧集所属的季节编号
season_id （字符串）：视频剧集所属的季节 ID
episode （字符串）：视频集的标题
episode_number （数字）：一季内的视频集数
episode_id （字符串）：视频片段的 ID
可用于作为曲目或音乐专辑一部分的媒体：

track （字符串）：曲目的标题
track_number （数字）：专辑或光盘中的曲目编号
track_id （字符串）：曲目的 ID
artist （字符串）：曲目的艺术家
genre （字符串）：曲目的流派
album （字符串）：曲目所属专辑的标题
album_type (string): 专辑类型
album_artist （字符串）：专辑中出现的所有艺术家的列表
disc_number （数字）：曲目所属的光盘或其他物理介质的编号
release_year （数字）：专辑发行年份（YYYY）
用于带有内部章节的视频chapter:时可用于前缀--split-chapters：

section_title (string): 章节标题
section_number （数字）：文件中的章节编号
section_start （数字）：章节的开始时间（以秒为单位）
section_end （数字）：以秒为单位的章节结束时间
仅在用于--print以下情况时可用：

urls (string): 所有请求格式的 URL，每行一个
filename（字符串）：视频文件的名称。请注意，实际文件名可能因后期处理而有所不同。用于--exec echo在所有后处理完成后获取名称
仅适用于--sponsorblock-chapter-title：

start_time （数字）：章节的开始时间（以秒为单位）
end_time （数字）：以秒为单位的章节结束时间
categories （列表）：章节所属的 SponsorBlock 类别
category (string): 章节所属的最小 SponsorBlock 类别
category_names （列表）：类别的友好名称
name (string): 最小类别的友好名称

```

```bash
输出模板示例
请注意，在 Windows 上，您需要使用双引号而不是单引号。
yt-dlp --get-filename -o ' %(title)s.%(ext)s ' BaW_jenozKc
```

### 格式选择

```python
默认情况下，如果您不传递任何选项，yt-dlp 会尝试下载最佳可用质量。
这通常等同于使用-f bestvideo*+bestaudio/best.
但是，如果启用了多个音频流 ( --audio-multistreams)，
则默认格式更改为-f bestvideo+bestaudio/best.
同样，如果 ffmpeg 不可用，或者如果您使用 yt-dlp 流式传输到stdout( -o -)，
则默认值变为-f best/bestvideo+bestaudio.
```

您还可以使用特殊名称来选择特定的边缘情况格式：

```python
all: 选择所有格式
mergeall：选择和合并所有格式（必须与使用--audio-multistreams，--video-multistreams或两者）
b*, best*: 无论是否包含视频或音频，选择最佳质量格式
w*, worst*: 选择质量最差的格式，不管它是否包含视频或音频
b, best: 选择包含视频和音频的最佳质量格式。相当于best*[vcodec!=none][acodec!=none]
w, worst: 选择包含视频和音频的最差质量格式。相当于worst*[vcodec!=none][acodec!=none]
bv, bestvideo: 选择最佳质量的纯视频格式。相当于best*[acodec=none]
wv, worstvideo: 选择质量最差的纯视频格式。相当于worst*[acodec=none]
bv*, bestvideo*: 选择包含视频的最佳质量格式。它还可能包含音频。相当于best*[vcodec!=none]
wv*, worstvideo*: 选择包含视频的最差质量格式。它还可能包含音频。相当于worst*[vcodec!=none]
ba, bestaudio: 选择质量最好的纯音频格式。相当于best*[vcodec=none]
wa, worstaudio: 选择质量最差的纯音频格式。相当于worst*[vcodec=none]
ba*, bestaudio*: 选择包含音频的最佳质量格式。它还可能包含视频。相当于best*[acodec!=none]
wa*, worstaudio*: 选择包含音频的最差质量格式。它还可能包含视频。相当于worst*[acodec!=none]
```

### 过滤格式

您还可以通过将条件放在括号中来过滤视频格式，如：-f “best[height=720]” (或-f “[filesize>10M]”)。
以下数字元字段可用于比较<, <=, >, >=, =(equals), !=(not equals)：

```python
filesize: 字节数，如果事先知道的话
width：视频的宽度（如果已知）
height：视频的高度（如果已知）
tbr: 音频和视频的平均比特率 (KBit/s)
abr：以 KBit/s 为单位的平均音频比特率
vbr: 以 KBit/s 为单位的平均视频比特率
asr：以赫兹为单位的音频采样率
fps：帧率
还过滤比较=(equals), ^=(starts with), $=(ends with), *=(contains) 和以下字符串元字段的工作：

ext： 文件扩展名
acodec：正在使用的音频编解码器的名称
vcodec：正在使用的视频编解码器的名称
container: 容器格式的名称
protocol: 将用于实际下载的协议，小写 ( http, https, rtsp, rtmp, rtmpe, mms, f4m, ism, http_dash_segments, m3u8, or m3u8_native)
format_id: 格式的简短描述
language: 语言代码

```

### 排序格式

```python
您可以best使用-S( --format-sort)更改被视为 的标准。这个的一般格式是--format-sort field1,field2....

可用的字段是：

hasvid：优先考虑具有视频流的格式
hasaud：优先考虑具有音频流的格式
ie_pref：提取器给出的格式首选项
lang：提取器给出的语言偏好
quality：提取器给出的格式质量
source: 提取器给出的来源偏好
proto: 用于下载的协议 ( https/ ftps> http/ ftp> m3u8_native/ m3u8> http_dash_segments> websocket_frag> 其他 > mms/ rtsp> > 未知 > f4f/ f4m)
vcodec：视频编解码器（av01> vp9.2> vp9> h265> h264> vp8> h263> theora>其它>未知）
acodec：音频编解码器（opus> vorbis> aac> mp4a> mp3> ac3> dts>其他>未知）
codec： 相当于 vcodec,acodec
vext: 视频扩展名 ( mp4> webm> flv> 其他 > 未知)。如果--prefer-free-formats使用，webm则首选。
aext：音频扩展（m4a> aac> mp3> ogg> opus> webm> 其他 > 未知）。如果--prefer-free-formats使用，则顺序更改为opus> ogg> webm> m4a> mp3> aac。
ext： 相当于 vext,aext
filesize: 确切的文件大小，如果事先知道的话。这将不适用于 mu38 和 DASH 格式。
fs_approx：根据清单计算的近似文件大小
size: 如果可用，则为精确文件大小，否则为近似文件大小
height: 视频高度
width: 视频宽度
res：视频分辨率，以最小尺寸计算。
fps: 视频帧率
hdr: 视频的动态范围 ( DV> HDR12> HDR10+> HDR10> HLG> SDR)
tbr：以 KBit/s 为单位的总平均比特率
vbr: 以 KBit/s 为单位的平均视频比特率
abr：以 KBit/s 为单位的平均音频比特率
br: 相当于使用 tbr,vbr,abr
asr：以Hz为单位的音频采样率
请注意，在 Windows 上，您可能需要使用双引号而不是单引号。

#下载并合并最好的纯视频格式和最好的纯音频格式，
#或者如果纯视频格式不可用，则下载最好的组合格式
$ yt-dlp -f ' bv+ba/b '
```

## yt-dlp 下载命令

### 访问 Youtube-dl 帮助

虽然这些示例足以使用 yt-dlp 下载在线视频，但值得注意的是，yt-dlp 提供了大量附加选项。有关深入的信息，你可以通过执行以下命令来查阅 yt-dlp 帮助部分：

```bash
yt-dlp --help
```

### 零、基本命令格式

```bash
yt-dlp [OPTIONS] [--] URL [URL...]
```

### 一、下载视频

#### 默认选择最好的画质进行下载

在命令行下使用时，部分的 URL 中都包含`&`，而`&`在 shell 中表示后台运行的意思，会导致运行出错，所以 URL 最好使用引号`''`包裹起来

```bash
yt-dlp <URL>

# 示例：
yt-dlp https://www.youtube.com/watch?v=t5b20oLaIaw
```

#### 指定视频格式：按文件扩展名下载视频

下载视频时指定格式，此处为`mp4`格式，当然也可以指定其他的格式

```bash
yt-dlp --merge-output-format mp4 <URL>
```

### 二、下载视频或播放列表

#### 1.下载具有自定义名称的视频或播放列表

使用 **`-o`** 标志，后跟所需名称。例如：

```bash
yt-dlp -o 'Abdul Kalam Wings of Fire Autobiography' https://www.youtube.com/watch?v=t5b20oLaIaw
```

#### 2.将视频或播放列表下载到特定位置

使用`-o`后跟目标目录的标志。例如：

```bash
yt-dlp -o '~/Downloads/Abdul Kalam Biography' https://www.youtube.com/watch?v=t5b20oLaIaw
```

#### 3.在文件名中包含其他详细信息

例如标题、上传者名称、上传日期和播放列表名称，请使用以下格式：

```bash
yt-dlp -o '%(title)s by %(uploader)s on %(upload_date)s in %(playlist)s.%(ext)s' https://www.youtube.com/watch?v=t5b20oLaIaw
```

以下是上述命令中使用的不同选项的细分：

- `yt-dlp`：用于下载视频和播放列表的命令行工具的名称。
- `-o`：用于指定输出文件名或目录的标志。
- `%(title)s`：视频或播放列表的标题。
- `%(uploader)s`：视频或播放列表上传者的名称。
- `%(upload_date)s`：视频或播放列表的上传日期。
- `%(playlist)s`：如果视频是播放列表的一部分，则为播放列表的名称。
- `%(ext)s`：下载的视频或音频文件的文件扩展名。

### 三、并行下载多个视频

在某些情况下，你可能需要从网站或任何其他来源下载多个视频。在这种情况下，你有几个方便的选择：

**选项 1：通过提及 URL 进行下载**

你可以通过在命令中指定其 URL 来下载多个视频，并用空格分隔，如下所示：

```bash
yt-dlp <url1> <url2>
```

此方法允许你一次获取多个视频，只需列出它们的 URL。

**选项 2：使用 txt 文本文件**

或者，你可以创建一个包含要下载的所有视频 URL 的文本文件，然后将此文件作为参数传递给 Youtube-dl：

```bash
yt-dlp -a url.txt
```

通过使用此命令，yt-dlp 将自动下载`url.txt`文件中列出的所有视频。这种方法在处理大量视频时特别方便，因为它为你简化了流程。

### 四、从视频中下载纯音频

要将视频下载为音频，即从视频中提取音频，请使用如下所示的 **`-x`** 标志。

```bash
yt-dlp -x https://www.youtube.com/watch?v=t5b20oLaIaw
```

你还可以使用标志指定输出音频格式：`-x --audio-format`

- 添加`--audio-format mp3`就可以把下载下来的当音频视频转码为 mp3

```bash
yt-dlp -x --audio-format mp3 https://www.youtube.com/watch?v=t5b20oLaIaw

yt-dlp -x --audio-format mp3 https://www.bilibili.com/video/BV1PY4y1z7PX
```

此命令仅从给定视频中提取和下载音频。

```bash
[youtube] Extracting URL: https://www.youtube.com/watch?v=t5b20oLaIaw
[youtube] t5b20oLaIaw: Downloading webpage
[youtube] t5b20oLaIaw: Downloading ios player API JSON
[youtube] t5b20oLaIaw: Downloading android player API JSON
[youtube] t5b20oLaIaw: Downloading m3u8 information
[info] t5b20oLaIaw: Downloading 1 format(s): 251
[download] Destination: Dr. Apj Abdul Kalam ｜ Wings of Fire ｜ Autobiography ｜ English ｜ Inspiring Audio Story [t5b20oLaIaw].webm
[download] 100% of   71.04MiB in 00:00:21 at 3.32MiB/s
[ExtractAudio] Destination: Dr. Apj Abdul Kalam ｜ Wings of Fire ｜ Autobiography ｜ English ｜ Inspiring Audio Story [t5b20oLaIaw].mp3
Deleting original file Dr. Apj Abdul Kalam ｜ Wings of Fire ｜ Autobiography ｜ English ｜ Inspiring Audio Story [t5b20oLaIaw].webm (pass -k to keep)
```

![从视频下载纯音频](./yt-dlp下载安装使用.assets/Download-Audio-only-from-a-Video.png)

### 五、下载带有描述、元数据、注释、字幕和缩略图的视频

要下载视频及其随附的详细信息，包括描述、元数据、注释、字幕和缩略图，请使用以下命令：

```bash
$ yt-dlp --write-description --write-info-json --write-annotations --write-sub --write-thumbnail <URL>
```

使用此命令，你不仅可以捕获视频本身，还可以捕获增强观看体验的所有相关元素。

### 5. 显示所有可用的视频或播放列表格式

要查看视频或播放列表的所有可用格式的完整列表，请使用以下命令：

```bash
yt-dlp --list-formats https://www.youtube.com/watch?v=t5b20oLaIaw
```

或者，你可以使用 **`-F`** 标志获得相同的结果：

```bash
yt-dlp -F https://www.youtube.com/watch?v=t5b20oLaIaw
```

这些命令为你提供了可访问内容的各种格式的概述，帮助你做出明智的选择。

![显示视频的所有可用格式](./yt-dlp下载安装使用.assets/Display-All-Available-Formats-of-a-Video.png)显示视频的所有可用格式

从输出中可以看出，yt-dlp 在有组织的表格列中全面显示了所有可访问的视频格式。从左到右移动，此显示包括基本细节，例如

- HDM 系列
- 扩展 （EXT），
- 分辨率
- 每秒帧数 （FPS），
- 通道 （CH），
- 文件大小，
- 总比特率（TBR），
- 协议（PROTO），
- 视频编解码器（VCODEC），
- 视频比特率（VBR），
- 音频编解码器（ACODEC），
- 音频比特率（ABR），
- 音频采样率（ASR），
- 和其他信息。

当你需要下载特定质量或格式的视频时，这种格式被证明特别有用。它可以在选择最适合你需求的格式时做出快速明智的决定。

### 查看 url 链接视频可用的分辨率

```bash
yt-dlp -F <URL>
```

![img](./yt-dlp下载安装使用.assets/2168641-20230426233113424-1077563490.png)

下载指定的音视频，可单独下载音频或视频。如果要同时下载音频和视频，可使用`id1+id2`，下载后会自动合并，例如：`yt-dlp -f 600+598 <URL>`

```bash
yt-dlp -f <ID> <URL>
```

### 查看要下载的视频的大小

若要在下载视频之前获取视频的文件大小，请使用以下标志：`-F`

```bash
yt-dlp -F https://www.youtube.com/watch?v=t5b20oLaIaw
```

![查看 YouTube 视频的大小](./yt-dlp下载安装使用.assets/View-the-Size-of-YouTube-Videos.png)

在输出中，文件大小显示在第 6 列中，让你轻松识别视频的存储要求。

### 7. 下载特定质量和格式的视频

默认情况下，如果你不传递任何选项，yt-dlp 将以最佳可用质量下载视频。但是，你可以根据自己的喜好灵活地下载特定质量或格式的视频或播放列表。

YouTube 为视频下载提供以下质量选项：

- **最好：best** 这将选择可用的最高质量的格式，包括视频和音频。
- **糟糕：worst** 它为视频和音频选择最低质量的格式。
- **最佳视频：bestvideo** 此选项选择质量最佳的纯视频格式（例如，DASH 视频）。
- **最差视频：worstvideo** 与 bestvideo 类似，但选择最低质量的纯视频格式。
- **最佳音频：bestaudio** 这将选择最优质的纯音频格式。
- **最差的音频：worstaudio** 类似于 bestaudio，但选择最低质量的纯音频格式。

例如，如果要以音频和视频的最佳可用质量下载视频，请使用以下命令：

```bash
yt-dlp -f best https://www.youtube.com/watch?v=t5b20oLaIaw
```

同样，要下载质量最好的纯音频：

```bash
yt-dlp -f bestaudio <URL>
```

若要下载最低质量的纯视频格式，请使用以下命令：

```bash
yt-dlp -f worstvideo <URL>
```

你还可以组合不同的格式选项，如下所示：

```bash
yt-dlp -f bestvideo+bestaudio <URL>
```

此命令下载质量最好的纯视频格式和纯音频格式，并使用 或 合并它们。

确保系统上安装了这些工具之一：`ffmpeg`、`avconv`

如果你不希望合并音频和视频，请将+()操作符替换为逗号()，如下所示:

```bash
yt-dlp -f 'bestvideo,bestaudio' https://www.youtube.com/watch?v=t5b20oLaIaw -o '%(title)s.f%(format_id)s.%(ext)s'
```

这个命令分别下载质量最好的视频和音频，生成两个文件。在这种情况下，建议使用输出模板(`-o`选项)，因为 bestvideo 和 bestaudio 可能具有相同的文件名

你甚至可以下载一个视频或播放列表在一个特定的质量和定义的分辨率。例如，要下载分辨率为 480 像素或更低(小于或等于 480p)的最佳质量视频，请使用以下命令:

```bash
yt-dlp -f "best[height<=480]" <URL>
```

如前所述，你可以组合格式选择器来定位特定的视频质量。以下命令下载最佳可用格式（音频和视频），但不超过 480p：

```bash
yt-dlp -f 'bestvideo[height<=480]+bestaudio/best[height<=480]' <URL>
```

可以通过使用 **[mediainfo](https://ostechnix.com/display-media-files-information-on-linux-using-mediainfo/)** 等工具检查媒体文件信息来确认 yt-dlp 是否以所需质量下载了视频。

你还可以灵活**地使用缩写的标志名称**。例如，你可以使用“.” 来替代“,”。同样，你可以将用“for”和“for”。

`bestvideo`、`bv`、`w`、`worst`、`wv`、`worstvideo`

**例子：**

若要下载最佳纯视频格式和最佳纯音频格式，或者如果仅视频不可用，则下载最佳组合格式，请运行：

```bash
yt-dlp -f "bv+ba/b" https://www.youtube.com/watch?v=t5b20oLaIaw
```

下载最差的视频质量：

```bash
yt-dlp -f "wv*+wa/w" https://www.youtube.com/watch?v=t5b20oLaIaw
```

有关更多缩写标志示例，请查看**[“格式选择](https://github.com/yt-dlp/yt-dlp#format-selection)**”页面。

这种速记表示法简化了命令，以便更有效地使用。

### 下载指定分辨率

#### 1.只下载音频

找 m4a 格式，列表越靠后越清晰。比如 ID：140 | EXT：m4a | audio only

```bash
yt-dlp -f140 https://www.youtube.com/watch?v=kNU2WCHVVBk
```

#### 2.下载音频转换成 mp3（加上-x --audio-format 参数）

```bash
yt-dlp -f140 -x --audio-format mp3 https://www.youtube.com/watch?v=kNU2WCHVVBk
```

#### 3.下载视频（带音频）ID：22 | EXT：mp4 | 1280\*720

```bash
yt-dlp -f22 https://www.youtube.com/watch?v=kNU2WCHVVBk
```

#### 4.下载指定分辨率视频+音频（为了方便就直接下载 mp4 格式了）

1080 及以上分辨率的音频和视频是分开的，所以一般会音频和视频一起下载

```bash
yt-dlp -f299+140 https://www.youtube.com/watch?v=kNU2WCHVVBk
```

#### 5.(通用）下载最佳 mp4 视频+最佳 m4a 音频格式并合成 mp4

```bash
yt-dlp -f 'bv[ext=mp4]+ba[ext=m4a]' --embed-metadata --merge-output-format mp4 https://www.youtube.com/watch?v=kNU2WCHVVBk
```

#### 6.指定文件名下载（用-o 参数）

默认下载的文件格式是：title+空格+[id].格式，比如：`xxx[kNU2WCHVVBk].mp4`

文件名只要标题，不要 id，加上 -o '%(title)s.mp4'

```bash
yt-dlp -f 'bv[ext=mp4]+ba[ext=m4a]' --embed-metadata --merge-output-format mp4 https://www.youtube.com/watch?v=kNU2WCHVVBk -o '%(title)s.mp4'
```

### 8. 交互式下载视频

可以使用该标志以交互方式选择每个视频的格式。这将提示你提供可用格式列表，以及它们的 ID、扩展名、分辨率、文件大小和音频/视频编解码器。`-f -`

若要下载特定格式，请键入文件的 ID，然后按 Enter 键。

![交互式格式选择](./yt-dlp下载安装使用.assets/Interactive-Format-Selection.png)

要下载默认选择，请按 Enter 键，而不键入任何内容。要退出交互式格式选择提示，请按：`Ctrl+C` 。

### 9. 使用格式 ID 下载视频

如果你想下载同一视频的多种格式，可以使用逗号作为分隔符。例如，using 将下载所有这三种格式：`-f 22,17,18`，前提是它们可用。

数字 22、17 和 18 对应于相应视频格式的 ID。这些 ID 在 youtube-dl 的输出中称为“格式代码”。

你可以通过使用以下任一命令列出可用格式来发现这些 ID：

```bash
yt-dlp --list-formats https://www.youtube.com/watch?v=t5b20oLaIaw
```

或

```bash
yt-dlp -F https://www.youtube.com/watch?v=t5b20oLaIaw
```

可用格式的 ID 列在第一列中。

质量最好的格式通常在末尾找到，通常带有类似 247 的 ID。

因此，要下载最优质的格式，你可以使用以下命令：

```bash
yt-dlp -f 247 https://www.youtube.com/watch?v=t5b20oLaIaw
```

如果你打算下载多个视频，并且它们不共享相同的可用格式，则可以使用斜杠指定首选项顺序。需要注意的是，左侧的格式是优先的。

例如，using 表示它将尝试下载格式 22（如果可用），然后如果格式 22 不可用，则尝试下载格式 17，依此类推。

如果指定的格式都不可用，它将通知你没有找到合适的下载格式。`-f 22/17/18`

请记住，斜杠是向左关联的，这意味着在选择过程中会优先考虑左侧的格式。

### 10. 按文件扩展名下载视频

要以你喜欢的格式（例如 MP4）下载视频，只需执行以下命令：`--format mp4`

```bash
$ yt-dlp --format mp4 https://www.youtube.com/watch?v=t5b20oLaIaw
```

或者，你可以使用简化版本：`-f mp4`

```bash
$ yt-dlp -f mp4 https://www.youtube.com/watch?v=t5b20oLaIaw
```

必须注意的是，并非所有视频都以你想要的格式提供。在这种情况下，yt-dlp 将自动下载最佳可用格式。

例如，以下命令将下载最优质的 MP4 格式文件。如果 MP4 格式不适用于给定视频，它将下载最佳替代格式：

```bash
$ yt-dlp -f 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best' https://www.youtube.com/watch?v=t5b20oLaIaw
```

如果你希望使用自定义文件名保存这些文件，可以使用以下命令执行此操作：

```bash
$ yt-dlp -f mp4 -o '%(title)s.f%(format_id)s.%(ext)s' https://www.youtube.com/watch?v=t5b20oLaIaw
```

### 11. 设置视频下载的大小限制

从播放列表下载多个视频时，你可能更喜欢特定大小范围内的视频。

例如，要确保没有下载小于指定大小（例如 100MB）的视频，请使用以下命令：

```bash
$ yt-dlp --min-filesize 100M <playlist_url>
```

相反，如果你希望避免下载大于给定尺寸的视频，则可以使用：

```bash
$ yt-dlp --max-filesize 100M <playlist_url>
```

你还可以选择组合格式选择运算符来下载特定大小的视频。例如，后续命令将下载最佳的纯视频格式，只要不超过 100MB：

```bash
$ yt-dlp -f 'best[filesize<100M]' https://www.youtube.com/watch?v=t5b20oLaIaw
```

### 12. 按日期下载视频

yt-dlp 提供了根据上传日期过滤和下载视频或播放列表的功能，这在处理包含数百个视频的大量播放列表时非常有用。

例如，要下载在确切日期（例如 2023 年 9 月 30 日）上传的视频，你可以使用以下命令：

```bash
$ yt-dlp --date 20230930 <URL>
```

要下载在特定日期或之前上传的视频，请执行以下操作：

```bash
$ yt-dlp --datebefore 20230930 <URL>
```

如果你想获取在特定日期或之后上传的视频：

```bash
$ yt-dlp --dateafter 20230930 <URL>
```

仅下载最近 6 个月内上传的视频：

```bash
$ yt-dlp --dateafter now-6months <URL>
```

要下载指定日期范围内的视频，例如从 2022 年 9 月 30 日到 2023 年 9 月 30 日，请使用以下命令：

```bash
$ yt-dlp --dateafter 20220930 --datebefore 20230930 <URL>
```

### 13. 从播放列表下载

#### 下载播放列表特定视频

这是 yt-dlp 提供的另一个有价值的功能，允许你从可能包含数百个条目的播放列表中下载特定歌曲或视频。

下载播放列表所有视频：

```bash
$ yt-dlp https://www.youtube.com/playlist?list=**********
```

要从播放列表下载第 20 个视频，请执行以下命令：

```bash
$ yt-dlp --playlist-items 20 <playlist_url>
```

你还可以同时下载视频并将其转换为另一种格式。在以下示例中，该命令将从播放列表中下载第一个视频并将其转换为` .mp3`格式：

```bash
$ yt-dlp --playlist-items 1 -x --audio-format mp3 <playlist_url>
```

同样，要下载多个随机视频，只需在播放列表中指定视频的索引，用逗号分隔，如下所示：

```bash
$ yt-dlp --playlist-items 2,3,7,10 <playlist_url>
```

你还可以定义要下载的视频范围。要从特定视频开始下载视频播放列表，请说第 10 个视频，然后一直持续到最后：

```bash
$ yt-dlp --playlist-start 10 <playlist_url>
```

要仅下载播放列表中从第 2 位到第 5 位的视频，请使用：

```bash
$ yt-dlp --playlist-start 2 --playlist-end 5 <playlist_url>
```

### 14.根据年龄适合性下载视频

yt-dlp 提供了另一个有价值的功能，可让你下载适合特定年龄段的视频。

例如，如果你想从播放列表中下载所有未标记为“NSFW”或未对 7 岁儿童有年龄限制的“Let's Play”视频，可以使用以下命令：

```bash
$ yt-dlp --match-title "let's play" --age-limit 7 --reject-title "nsfw" <playlist_url>
```

此命令可确保仅下载适合 7 岁观众的视频，过滤掉任何“NSFW”或有年龄限制的内容。

### 15. 设置下载速度限制

要控制下载速度，你可以使用`-r`该选项。例如，下面的命令会将速度限制为每秒 50 KB：

```bash
$ yt-dlp -r 50K <URL>
```

请记住，速度以每秒字节数为单位指定。

### 16. 恢复下载

Yt-dlp 通常会自动从之前中断的地方恢复下载。但是，如果由于任何原因没有恢复下载，则可以使用`-c`或者 `--continue`标志强制继续下载部分完成的文件：

```bash
$ yt-dlp -c <URL>
```

此标志可确保下载从中断的位置继续，即使它之前被中断也是如此。

### 17. 将视频直接流式传输到媒体播放器

要将媒体直接流式传输到媒体播放器，您需要使用 “`-o -`“ 选项指示 yt-dlp 将媒体传输到标准输出 stdout。此外，你的媒体播放器应该能够从 标准输入 stdin 中 读取。

你可以通过将 yt-dlp 的输出通过 VLC 传输到媒体播放器来实现此目的。例如，要流式传输到 VLC，你可以使用以下命令：

```bash
$ yt-dlp -o - "https://www.youtube.com/watch?v=t5b20oLaIaw" | vlc -
```

如果你安装了 ffmpeg，则可以在流式传输到 标准输出 stdout 时使用“`-o - --downloader ffmpeg -f "bv*+ba/b"` 选项以获得最佳可用质量。

### 录制直播

```bash
yt-dlp -f best -o output_filename.extension "直播链接"
```

参数说明:

- -f best：选择最佳质量的视频流进行下载。您可以根据需要选择其他质量选项。
- -o output_filename.extension：指定输出文件的名称和扩展名。您可以将其替换为您希望的文件名和扩展名（例如，output.mp4）。

"直播链接"：替换为您想要录制的直播流的链接。

注意：下载海外平台视频需要开启代理

### 使用 cookies 下载

对于部分视频，需要登录才能下载到 1080p 画质。比较简单的做法是在浏览器登录视频网站，然后直接使用浏览器的 cookies，在`--cookies-from-browser`选项后指定浏览器即可。

- cookies-from-browser：从浏览器调取 cookies，你也可以指定浏览器，比如：`--cookies-from-browser chrome`就是调取 chrome 浏览器的 cookies。目前支持的浏览器选项：brave，chrome,chromium，edge，firefox，opera，safari,vivaldi。
- 回车确认下载时需要手动确认信任程序

```bash
yt-dlp -f --cookies-from-browser firefox <URL>
# 例子
yt-dlp --cookies-from-browser chrome https://www.bilibili.com/video/BV1PY4y1z7PX
```

![img](./yt-dlp下载安装使用.assets/2168641-20230426234617651-1090052017.png)

### 5.指定文件名

如果有的视频名字比较长，就会有`ERROR: unable to open for writing: [Errno 36] File name too long`的报错。

此时我们可以通过`-o`选项来自定义下载的文件名：`%(title)s`表示文件名，`%(title).50s`表示取文件名前 50 个字符，这样就可以避免视频名字过长导致报错的问题了

```bash
yt-dlp --cookies-from firefox -o '%(title).50s.%(ext)s' <URL>
```

### 7.使用代理服务器下载

代理脚本设置：

**pigcha 代理官方永久地址：** https://pigpigchacha.github.io/officialsite

pigcha 代理：[Pigcha 加速器官网](https://www.pigcha.com.hk/)

可以用 pigcha 的控制台代理执行命令。替代下载的代理服务器命令

#### 脚本地址查询

点右下角网络图标进入【网络和 Internet 设置】，选择【代理】

找到【使用设置脚本】，开启

检查命令中的 ip 和端口和【脚本地址】是否一致

```bash
# --proxy 使用指定的HTTP/HTTPS/SOCKS代理。 e.g. socks5://user:pass@127.0.0.1:1080/
# 127.0.0.1表示本机ip，1080表示当前使用的端口，请根据本机情况查询并更改。


# URL填写想下载的视频地址# 下载单个视频
yt-dlp --proxy socks5://127.0.0.1:1080 https://www.youtube.com/watch?v=NtKJSHW68p4

# 下载播放列表的所有视频
yt-dlp --proxy socks5://127.0.0.1:1080 https://www.youtube.com/playlist?list=PLqWr7dyJNgLJ79otw7N9CXQ_AU0Fm04aq
```

#### 用代理下载+纠错教程

此代码最初来自：[#681 ·YT-DLP/YT-DLP](https://github.com/yt-dlp/yt-dlp/issues/681)。

这个 PR 增加了：

- 网页提取失败时回退播放器 url 提取
- 不要为不需要它的客户不必要地下载 js 播放器
- 尝试从任何其他客户端配置中提取 js 播放器 url
- 能够跳过 js 播放器使用/下载（包括 iframe 回退）。
- 这会覆盖客户端的配置设置。
- 这可以启用--extractor-args youtube:player_skip=js
- 需要签名解密的格式会自动跳过（因为没有播放器 url）
- 能够跳过网页下载
- 这可以启用 `--extractor-args youtube:player_skip=webpage`

参考代码：

```bash
yt-dlp https://www.youtube.com/watch?v=FjXkTxSm6ac --proxy socks5://127.0.0.1:10808 --extractor-args youtube:player_skip=js
```

### 列出所有文件的格式信息

```bash
yt-dlp [--proxy ...] URL -F
yt-dlp [--proxy ...] URL --list-formats
```

对图中的标题做一下阅读理解：

| ID   | EXT    | RESOLUTION        | FPS          | CH         | FILESIZE   | TBR                            | PROTO                                                                                                |
| ---- | ------ | ----------------- | ------------ | ---------- | ---------- | ------------------------------ | ---------------------------------------------------------------------------------------------------- |
| 编码 | 扩展名 | 分辨率（宽 x 高） | 每秒画面帧数 | 音频通道数 | 文件字节数 | 音频和视频的平均比特率（KBit） | 下载协议 （http，https，rtsp，rtmp，rtmpe，mms，f4m，ism，http_dash_segments，m3u8，or m3u8_native） |

| VCODEC       | VBR                  | ACODEC       | ABR                  | ASR            | MORE INFO |
| ------------ | -------------------- | ------------ | -------------------- | -------------- | --------- |
| 视频编码方案 | 平均视频码率（KBit） | 音频编码方案 | 平均音频码率（KBit） | 音频采样率(hz) | 补充说明  |

#### 格式选择 -f ，--format

- 含义：格式选择器，根据要求下载指定格式的音视频资源
- 说明：未传参时，默认下载最佳质量的格式。按特定要求下载时，写明视频和音频的格式要求。支持单独下载纯视频/音频，合并下载用"+“连接，各自分开下载用”,“，从左到右选择第一个可用资源下载用”/"
- 示例：

```python
# 根据id，下载编号597的资源作为视频画面，599作为视频声音，把图像和音轨合并为MP4格式导出
yt-dlp -f 597+599 [--proxy ...] URL --merge-output-format mp4# 下载编码为22的文件
yt-dlp -f webm [--proxy ...] URL# 下载最佳质量的单个webm文件（目前支持3gp，aac，flv，m4a，mp3，mp4，ogg，wav，webm格式）
yt-dlp -f webm [--proxy ...] URL# 分开下载视频和音频，格式化命名，按title.ID.EXT模板输出
yt-dlp -f "bv,ba/b" -o "%(title)s.f%(format_id)s.%(ext)s" [--proxy ...] URL# 条件过滤，通过表格中的各项条件筛选目标规格的资源
-f w 	# 下载质量最差的资源文件（同时包含音视频），wv纯视频，wa纯音频，适合测试命令时使用
-f "best[height=720]" 	# 筛选最佳质量的720p视频
-f "[filesize>10M]" 	# 筛选>10M的文件
-f "all[vcodec=none]" 	# 筛选所有纯音频
-f "(mp4,webm)[height<480]"		# 筛选低于480p的最佳mp4视频和webm音轨，合并
-f 'bv[height=1080][ext=mp4]+ba[ext=m4a]' --merge-output-format mp4  # 筛选1080p的mp4视频，与最佳的m4a音频下载合并
```

### 字幕下载

#### --write-subs，–write-auto-subs

- 含义：下载字幕（投稿外挂的或自动翻译生成的）
- 用例：

```python
yt-dlp [--proxy ...] URL --list-subs	# 列出所有支持的字幕信息（语言标识名、语言名、文件格式）
```

下图列出的字幕使用`--write-subs`下载

下图的字幕使用`--write-auto-subs`下载

```bash
# 下载视频时一同下载srt格式的中文字幕，--sub-lang后的值从图中的Langeuage列取得
yt-dlp --write-auto-subs --sub-format srt --sub-lang zh-Hans [--proxy ...] URL# 单独下载最佳格式的英文字幕
yt-dlp --write-auto-subs --sub-format best --sub-lang en --skip-download [--proxy ...] URL# 在视频中嵌入自动生成的阿拉伯语字幕，字幕嵌入操作仅适用于mp4，Webm和MKV视频
yt-dlp --write-auto-subs --sub-lang ar --embed-subs --merge-output-format mp4 [--proxy ...] URL
```

### 批量下载

#### -a FILE

下载文本中所有视频

```bash
yt-dlp -a urls.txt [--proxy ...] URL
```

### 片段提取

#### --download-sections

下载时间戳范围的片段

```bash
yt-dlp --download-sections "*1:30-inf" [--proxy ...] URL      # 前缀*，范围边界0:00 - inf
```

下载指定章节的片段

```bash
yt-dlp --download-sections "intro" [--proxy ...] URL
```

下载所有章节切片并按 id.title.ext 命名，同时下载一份完整的视频。

输出模板参数有 section_number，section_title，section_start 和 section_end

```bash
yt-dlp --split-chapters -o "chapter:%(section_number)03d. %(section_title)s.%(ext)s" [--proxy ...] URL
```

### 格式化命名和存储

#### -o TEMPLATE

格式化命名文件并指定路径保存

```bash
-o "~/YouTube/%(title)s.%(ext)s"
-o "%(uploader)s/%(upload_date)s - %(title)s (%(id)s).%(ext)s"
-o "%(duration>%H-%M-%S)s" # 视频时长
```

输出模板的语法见 output-template

### 更多

- **–merge-output-format FORMAT**：视频合并操作

- **-j，--dump-json**：打印 JSON 信息

- –embed-thumbnail

  ：将视频缩略图嵌入视频封面，需要合并操作

  ```python
  yt-dlp --embed-thumbnail --merge-output-format mp4 [--proxy ...] URL
  ```

- **–embed-metadata**：嵌入元数据，如视频简介描述，需要合并操作

- –audio-format FORMAT

  ：纯音频下载，支持格式转换

  ```python
  yt-dlp -x --audio-format mp3 [--proxy ...] URL -o '%(title)s_%(id)s.mp3'
  ```

- **–skip-download**：跳过视频下载，仅下载相关文件

- **–cookies-from-browser BROWSER**：对于要求登录或会员才可下载的网址，调取浏览器 cookies
  目前支持的浏览器有 brave，chrome，chromium，edge，firefox，opera，safari，vivaldi

### 其他平台使用

#### b 站

下载高清视频需要调取浏览器 cookie 登录

```bash
# 下载单P视频
yt-dlp https://www.bilibili.com/video/BV1dM411t7Ls --cookies-from-browser chrome
# 分P视频仅下载P1
yt-dlp https://www.bilibili.com/video/BV1vs4y1b7rU?p=1 --cookies-from-browser chrome
```

## yt-dlp 简单命令备忘单

文档：[yt-dlp/yt-dlp: A youtube-dl fork with additional features and fixes (github.com)](https://github.com/yt-dlp/yt-dlp#format-selection)

此备忘单为你提供**了一些基本的 yt-dlp 命令**，以帮助你开始有效地下载视频和播放列表。

### 基本下载：

- **下载视频：**

```
  yt-dlp <video_url>
```

- **下载播放列表：**

```
  yt-dlp <playlist_url>
```

### 格式选择：

- **选择最佳质量：**

```
  yt-dlp -f best <video_url>
```

- **选择特定格式：**

```
  yt-dlp -f <format_id> <video_url>
```

- **纯音频格式：**

```
  yt-dlp -f bestaudio <video_url>
```

### 下载选项

- **限制下载速度：**

```bash
  yt-dlp -r 50K <video_url>
```

- **简历下载：**

```bash
  yt-dlp -c <video_url>
```

### 过滤筛选

- **按日期筛选：**

```bash
  yt-dlp --date 20230101 <video_url>
```

- **按年龄限制筛选：**

```bash
  yt-dlp --age-limit 18 <video_url>
```

- **按标题筛选：**

```bash
  yt-dlp --match-title "keyword" <playlist_url>
```

### 高级命令

- **按格式代码下载：**

```bash
  yt-dlp -f 22,17,18 <video_url>
```

- **按文件扩展名下载：**

```bash
  yt-dlp --format mp4 <video_url>
```

- **设置大小限制：**

```bash
  yt-dlp --min-filesize 100M <playlist_url>
```

- **从播放列表下载特定视频：**

```bash
  yt-dlp --playlist-items 1,3,5 <playlist_url>
```

记住将 and 替换为你想要下载的实际 url。`<video_url><playlist_url>`

#### 打印出可用的格式和信息：

```bash
yt-dlp --list-formats  https://www.youtube.com/watch?v=1La4QzGeaaQ
```

#### 打印视频和音频流的 JSON 信息：

```bash
yt-dlp --dump-json https://www.youtube.com/watch?v=1La4QzGeaaQ
```

### 单个视频或音频下载：

下载宽度等于或大于 720p 的最佳格式（视频 + 音频）。将此文件另存为 `video_id.extension (1La4QzGeaaQ.mp4)`：

```bash
yt-dlp -f "best[height>=720]" https://www.youtube.com/watch?v=1La4QzGeaaQ -o '%(id)s.%(ext)s'
```

#### 下载并合并最佳视频流与最佳音频流：

```bash
yt-dlp -f 'bv*+ba' https://www.youtube.com/watch?v=1La4QzGeaaQ -o '%(id)s.%(ext)s'
```

#### 下载 1080p 视频并与最佳音频流合并：

```bash
yt-dlp -f 'bv*[height=1080]+ba' https://www.youtube.com/watch?v=1La4QzGeaaQ -o '%(id)s.%(ext)s'
```

#### 下载 mp4 格式的 1080p 视频并与最佳 m4a 音频格式合并：

```bash
yt-dlp -f 'bv[height=1080][ext=mp4]+ba[ext=m4a]' --merge-output-format mp4 https://www.youtube.com/watch?v=1La4QzGeaaQ -o '%(id)s.mp4'
```

#### 将视频缩略图嵌入视频文件使用 `--embed-thumbnail`：

```bash
yt-dlp -f 'bv[height=1080][ext=mp4]+ba[ext=m4a]' --embed-thumbnail --merge-output-format mp4 https://www.youtube.com/watch?v=1La4QzGeaaQ -o '%(id)s.mp4'
```

#### 将字幕嵌入视频文件（如果存在） `--embed-subs`：

```bash
yt-dlp -f 'bv[height=1080][ext=mp4]+ba[ext=m4a]' --embed-subs --merge-output-format mp4 https://www.youtube.com/watch?v=1La4QzGeaaQ -o '%(id)s.mp4'
```

#### 嵌入有关视频的元数据`--embed-metadata`：

```bash
yt-dlp -f 'bv[height=1080][ext=mp4]+ba[ext=m4a]' --embed-metadata --merge-output-format mp4 https://www.youtube.com/watch?v=1La4QzGeaaQ -o '%(id)s.mp4'
```

#### 将最佳音频转换为 mp3 文件：

```bash
yt-dlp -f 'ba' -x --audio-format mp3 https://www.youtube.com/watch?v=1La4QzGeaaQ -o '%(id)s.mp3'
```

格式选择和过滤的所有选项都可以在这里找到，有很多。

### 下载播放列表：

下载包含 1080p 视频和最佳音频的 YouTube 播放列表。将视频添加到存档文本文件中，保存到 channel_id/playlist_id 目录：

```bash
yt-dlp -f 'bv*[height=1080]+ba' --download-archive videos.txt  https://www.youtube.com/playlist?list=PLlVlyGVtvuVnUjA4d6gHKCSrLAAm2n1e6 -o '%(channel_id)s/%(playlist_id)s/%(id)s.%(ext)s'
```

### 下载频道：

将整个 YouTube 频道下载为具有最佳音频的 720p 视频。保存到以频道名称命名的文件夹中，视频文件是视频的标题（Foo the Flowerhorn/5 Months Update – Flowerhorn Foods.webm）。

```bash
yt-dlp -f 'bv*[height=720]+ba' --download-archive videos.txt https://www.youtube.com/c/FootheFlowerhorn/videos -o '%(channel)s/%(title)s.%(ext)s'
```

## ❤ 推荐的 yt-dlp 下载视频工作流程

## dlp 插件的高级用法

以下我们将为您展示 yt-dlp 插件的另外两个高级用法。 我们将在 Linux 上展示这些示例。

### a. 配置 yt-dlp.conf 文件。

yt-dlp 插件还提供了一系列默认选项，它会自动实现，包括首选视频格式，如 mkv、mp4、webm 等。 要创建一个 yt-dlp 可以使用的配置文件，请在配置文件中输入支持的命令。 配置文件可以从系统（/etc/yt-dlp.conf）、用户配置、主目录配置、便携式或主配置加载。

使用文本编辑器从终端打开（或创建）yt-dlp.conf：

```bash
sudo vim /etc/yt-dlp.conf
```

或

```bash
sudo vi /etc/yt-dlp.conf
```

- 下面的配置文件是一个示例（但您可以根据自己的喜好进行自定义）。 使用下面的配置，yt-dlp 将自动将所有视频保存在特定路径（/Youtube）中，并将它们重命名为 Title.extension。 yt-dlp 默认将 YouTube 视频保存到其默认路径，并将 URL 作为主标题。

此配置还将嵌入缩略图、元数据和英文字幕。

![使用 Yt-dlp](./yt-dlp下载安装使用.assets/guide_to_yt-dlp_13.png)

- • 现在让我们尝试一下全新的 yt-dlp 配置：

- ```bash
  yt-dlp https://www.youtube.com/watch?v=z8HY1aVzZDM
  ```

![使用 Yt-dlp](./yt-dlp下载安装使用.assets/guide_to_yt-dlp_12.png)

使用此配置文件，您可以自动化整个 YouTube 下载过程。 这可以节省时间，因为您不再需要为每一行视频下载输入配置。 配置文件将使用您个性化的下载格式进行处理。

**注意（适用于 Windows 用户）：** 建议将此配置文件放置在“${APPDATA}/yt-dlp/config”中，并将其保存为 .txt。 AppData 文件夹位于“C:\Users\\AppData\”下，通常是一个隐藏文件夹。

在此配置文件中设置配置行类似于我们在本节中在 Linux 中所做的操作。

### b. 使用 Bashrc 文件。

使用 bashrc 文件是优化 yt-dlp 下载过程的另一种方式。 这些文件包含 Bash shell 的 shell（命令行界面）设置。 bashrc 文件在每次打开新的终端会话时执行，它可以用于配置 shell 的各种设置和别名。 bashrc 文件对于 yt-dlp 来说非常有用，因为您可以使用它来设置别名或 shell 函数，简化 yt-dlp 的使用。 例如，您可以创建一个别名，通过在终端中输入单个命令，自动下载您喜欢的格式和质量的视频。 这可以节省您的时间，使得定期使用 yt-dlp 更加容易。

- 在 Ubuntu 中找到 .bashrc 文件，可以前往 home/ubuntu > .bashrc。

![使用 Yt-dlp](./yt-dlp下载安装使用.assets/guide_to_yt-dlp_24-1024x264.png)

- **使用以下任何一个文本编辑器打开 .bashrc 文件。**

```bash
sudo vi ~/.bashrc
```

或

```bash
sudo nano ~/.bashrc
```

- 输入您想要的 yt-dlp 的 bashrc 别名。 例如：

```bash
# yt-dlp aliasesalias ydl='yt-dlp'alias ydlmp4='yt-dlp -f "bestvideo&#91;ext=mp4]+bestaudio&#91;ext=m4a]/best&#91;ext=mp4]/best"'alias ydlmkv='yt-dlp -f "bestvideo&#91;ext=mkv]+bestaudio&#91;ext=mka]/best&#91;ext=mkv]/best"'
```

![使用 Yt-dlp](./yt-dlp下载安装使用.assets/guide_to_yt-dlp_28.png)

要激活别名，请关闭并重新打开终端窗口或运行以下命令：

```bash
$ source ~/.bashrc
```

现在，让我们测试一下别名。 使用别名应该可以让我们在使用 yt-dlp 下载 YouTube 视频时更加轻松。 例如，通过输入“ydlmp4”，您可以避免编写冗长的命令，例如 bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best。

现在有很多事情正在发生！ 正如您从下面的输出中所看到的那样... 我们的别名正在工作，配置正在尝试嵌入缩略图、字幕、元数据等。 此外，视频正在保存在（和使用）/Youtube/%(title)s.%(ext)s 中——其中标题是视频的名称，而不是 URL。

![使用 Yt-dlp](./yt-dlp下载安装使用.assets/guide_to_yt-dlp_2-1024x473.png)

### c. 使用 yt-dlp 将大量数据管理和下载到种子盒子中。

如果您使用 yt-dlp 下载和管理大量数据，那么种子盒子（ [种子盒子](https://www.rapidseedbox.com/zh/) ）可能是一个很好的解决方案。 种子盒子是专为匿名下载和上传数字文件（如种子、NZB、视频和音乐）而设计的远程 VPS 或专用服务器。 **此外，由于种子盒子专为下载和上传而设计，它们通常提供高速下载。**

例如，您可以远程连接到您的种子盒子，并使用其强大的资源来使用 yt-dlp 下载视频。 种子盒子还提供像 [Plex](https://www.rapidseedbox.com/blog/plex-complete-guide) 或 [Kodi](https://www.rapidseedbox.com/blog/guide-to-kodi) 这样的流媒体平台，以及其他管理您的媒体收藏的好方法。 如果您以后决定更改格式、压缩或编码，种子盒子也配备了强大的媒体转换器，如 [Handbrake](https://www.rapidseedbox.com/blog/guide-to-mastering-handbrake)。 您可以使用 FTP 或 Sync 协议轻松下载所有媒体内容。

这种组合可以实现快速高效的下载和轻松管理所有下载内容。

## FFmpeg 的安装

### 安装依赖项: FFmpeg 和 FFProbe

在继续使用 yt-dlp 之前，强烈建议您安装 FFmpeg 和 FFprobe。 还有其他关于网络、元数据和其他杂项的“可选”依赖项， **但 FFmpeg 和 FFprobe 几乎是“必需”的。**

- **FFmpeg** 是处理视频、音频和其他多媒体文件的多媒体框架。 yt-dlp 使用它执行各种多媒体操作，包括合并不同格式的视频或音频文件。 没有它，yt-dlp 将无法合并所请求的格式。 例如，您可能下载一个没有音频的 1080p 视频。

- **FFProbe** 是随 FFmpeg 一起提供的命令行工具。 FFProbe 用于分析和从多媒体文件（如视频和音频）中提取信息。 Yt-dlp 需要使用 FFProbe 从正在下载的多媒体文件中提取元数据。 这些元数据包括视频或音频编解码器、分辨率、持续时间、比特率和其他有关多媒体文件的技术细节等信息。 如果没有 FFprobe，yt-dlp 将无法提取这些元数据，并且它的某些功能可能无法正常工作。

![下载并安装 Yt-dlp 的依赖](./yt-dlp下载安装使用.assets/guide_to_yt-dlp_8.png)

- 在安装 FFmpeg 和 FFprobe 之前，请确保您的计算机已经更新到最新版本。

#### a. 在 Linux 上安装 FFmpeg 和 FFprobe。

**要在 Linux 机器上（Ubuntu 22.04）安装 FFmpeg，请使用以下命令：**

```bash
sudo apt install ffmpeg
```

要检查安装和当前版本，请使用以下命令：

```bash
ffmpeg -version
```

![下载并安装 Yt-dlp 的依赖](./yt-dlp下载安装使用.assets/guide_to_yt-dlp_14-1024x296.png)

**FFprobe 安装？** 安装 FFmpeg 包时会自动安装 FFprobe。 无需额外安装 FFprobe。 要测试 FFprobe 是否已安装，请使用“ffprobe”命令：

![下载并安装 Yt-dlp 的依赖](./yt-dlp下载安装使用.assets/guide_to_yt-dlp_22-1024x375.png)

#### b. 在 Windows 上安装 FFmpeg 和 FFprobe。

- 请前往 https://ffmpeg.org/ 并下载 Windows 平台的 FFmpeg 包（.EXE 文件）。 发布版本通常比 Git 主版本更稳定，后者会更频繁地发布。
- 选择您需要的版本，下载 7z 或 zip 文件并解压缩。

![下载并安装 Yt-dlp 的依赖](./yt-dlp下载安装使用.assets/guide_to_yt-dlp_21.png)

- 下载 FFmpeg 包并将其保存在任何您想要的位置。
- 我们创建了一个名为“PATH_Programs-ytdpl”的新文件夹，我们将移动并解压缩 FFmpeg 包到该文件夹中。
- 在 ffmpeg-(文件名) > bin > 目录下，您将看到三个工具：ffmpeg、ffplay 和 ffprobe。 将这三个应用程序移动（解压缩）到您的新文件夹中。

![下载并安装 Yt-dlp 的依赖](./yt-dlp下载安装使用.assets/guide_to_yt-dlp_31.png)

- 记录路径（例如：C:\PATH_Programs -ytdlp），并前往“编辑系统环境变量”。 此 Windows 实用程序允许您修改操作系统和计算机上运行的应用程序所使用的环境变量。 我们接下来将定义的 PATH 环境变量指定了操作系统在查找可执行文件时应搜索的目录列表。
- • 要打开此功能，请转到 Windows 搜索栏，输入“path”。

![下载并安装 Yt-dlp 的依赖](./yt-dlp下载安装使用.assets/guide_to_yt-dlp_23-1024x601.png)

- • 在“系统属性”>“高级”中，转到“环境变量”。

![下载并安装 Yt-dlp 的依赖](./yt-dlp下载安装使用.assets/guide_to_yt-dlp_16.png)

- 在“环境变量”中，在“管理员的用户变量”下选择 Path（1）> 然后单击“编辑”。

![下载并安装 Yt-dlp 的依赖](./yt-dlp下载安装使用.assets/guide_to_yt-dlp_7.png)

- • 新的“编辑环境变量”窗口将打开。 单击“新建”（1）> 输入存储 FFmpeg 的路径（2）> 单击“确定”（3）。

![下载并安装 Yt-dlp 的依赖](./yt-dlp下载安装使用.assets/guide_to_yt-dlp_10.png)

- • 现在，无论何时您想从任何文件夹或位置运行 FFmpeg，计算机都会知道它的位置，并允许您使用它。
- 现在，从 Windows 命令提示符中测试 FFmpeg 配置。 打开“cmd”并键入“ffmpeg”。 您应该会得到以下输出。

![下载并安装 Yt-dlp 的依赖](./yt-dlp下载安装使用.assets/guide_to_yt-dlp_6.png)

- 现在，从 Windows 命令提示符中测试 FFmpeg 配置。 打开“cmd”并键入“ffmpeg”。 您应该会得到以下输出。

## 配合 FFmpeg

如果想获得更好的体验建议环境变量内配置好 FFmpeg，比如：下载的视频需要进行转码、多端视频合并。

### 下载及合并

```text
yt-dlp -f [下载ID] [代理配置] [视频链接] [合并语句] [外部下载器选择] [下载器参数]
-f [id] #选择下载内容，注意和 -F 区分。例子中使用137+140，如果你只下载720p则填写22就好，后面的合并语句可不填写。
--proxy #代理配置 见前文
--merge-output-format [合并输出格式] #例子中选择mp4作为输出格式
--external-downloader [下载器名称] #下载器选择 例子中选择aria2c
--downloader-args [下载器名称]:"[下载器配置]" #下载器配置语句 例子中 x 16 代表16线程下载 -k 1M 代表块大小为1M 但youtube不支持分块故此句可忽略
```

#### 效果 2

```text
D:\youtube>yt-dlp -f 137+140 --proxy socks5://127.0.0.1:8080 https://www.youtube.com/watch?v=rrQJvPaPbFM --merge-output-format mp4 --external-downloader aria2c --downloader-args aria2c:"-x 16 -k 1M"
[youtube] rrQJvPaPbFM: Downloading webpage
[youtube] rrQJvPaPbFM: Downloading android player API JSON
[info] rrQJvPaPbFM: Downloading 1 format(s): 137+140
[download] Destination: Polar Grit X Pro _ Route And Elevation Profiles [rrQJvPaPbFM].f137.mp4
[download] 100% of 85.85MiB in 00:53
[download] Destination: Polar Grit X Pro _ Route And Elevation Profiles [rrQJvPaPbFM].f140.m4a
[download] 100% of 3.32MiB in 00:04
[Merger] Merging formats into "Polar Grit X Pro _ Route And Elevation Profiles [rrQJvPaPbFM].mp4"
Deleting original file Polar Grit X Pro _ Route And Elevation Profiles [rrQJvPaPbFM].f140.m4a (pass -k to keep)
Deleting original file Polar Grit X Pro _ Route And Elevation Profiles [rrQJvPaPbFM].f137.mp4 (pass -k to keep)
```

下载完成后 ffmpeg 合并视频和音轨，输出至你的 cmd 的当前路径。

### 手动合并下载的分段视频

当下载好（选择完画质的）视频后，可能需要手动合并音视频。此时需要用到 ffmpeg。

#### 单独合并

```bash
ffmpeg -i input.mp4 -i input.m4a -c:v copy -c:a copy -strict experimental output.file
```

### yt-dlp 配合 ffmpeg 进行直播转播

使用 yt-dlp 结合 ffmpeg 可以在录制直播流的同时进行实时转播（转码和重编码）操作。以下是一个示例命令

```go
yt-dlp -o - "直播链接" | ffmpeg -i - -c:v copy -c:a aac -strict experimental -f flv "rtmp://转播服务器地址"
```

yt-dlp 结合 ffmpeg 进行实时转播时，您可以通过指定不同的 ffmpeg 参数来控制转播的码率、分辨率和其他设置。

**指定视频和音频码率：**

```bash
yt-dlp -o - "直播链接" | ffmpeg -i - -c:v libx264 -b:v 2000k -c:a aac -b:a 128k -strict experimental -f flv "rtmp://转播服务器地址"
```

在这个命令中，-b:v 指定视频码率为 2000k，-b:a 指定音频码率为 128k。

**指定分辨率：**

```bash
yt-dlp -o - "直播链接" | ffmpeg -i - -vf "scale=1280:720" -c:v libx264 -b:v 2000k -c:a aac -b:a 128k -strict experimental -f flv "rtmp://转播服务器地址"
```

在这个命令中，-vf "scale=1280:720" 指定视频分辨率为 1280x720 像素。

**指定帧率：**

```bash
yt-dlp -o - "直播链接" | ffmpeg -i - -r 30 -c:v libx264 -b:v 2000k -c:a aac -b:a 128k -strict experimental -f flv "rtmp://转播服务器地址"
```

在这个命令中，-r 30 指定视频帧率为 30 帧每秒。

## 配合 Aria2 下载器加速下载

一些情况下，我们会使用多线程下载器，充分利用我们的带宽。比如：使用 aria2。

作为外部下载器加速下载，多线程并发，提升带宽利用率。

### 1.Aria2 相关资源和下载

- Aria2 的 GitHub 开源地址：https://github.com/aria2/aria2

- Aria2 的下载地址：https://github.com/aria2/aria2/releases

- Aria2 的官方文档：https://aria2.github.io/manual/en/html/aria2c.html

### 2.安装 aria2 配合使用

#### 官网下载

访问官网 releases 页面：[Releases · aria2/aria2 (github.com)](https://github.com/aria2/aria2/releases)，根据选择的版本和本机环境在 Assets 下找到安装包，点击下载

我是 windows 系统，这里选择 windows x64 的安装包

下载成功后解压，为了方便我直接放 D 盘并改名 aria2

#### 环境变量配置

打开文件夹，复制 aria2c.exe 的路径（我这里是 D:\aria2），在环境变量 path 中配置

调出环境变量快捷操作：

`win+R`调出【运行】对话框 -> 输入 sysdm.cpl，回车打开【系统属性】 -> 【高级】-> 【环境变量】 -> 【用户变量】

双击 path 新建，粘贴路径

配置了 aria2 的命令行输入：
![配置了aria2](./yt-dlp下载安装使用.assets/aria2c_macOS.png)

##### aria2c 命令行调用格式

```bash
aria2c [OPTIONS] [URI | MAGNET | TORRENT_FILE | METALINK_FILE]...
```

命令行输入——查看具体参数说明：

```bash
aria2c -h
```

最简单的用法是 aria2c URL，例如：

```python
aria2c https://www.bilibili.com/
```

##### 在 yt-dlp 中调用 Aria2

- --downloader：下载器选择，支持 aria2c，avconv，axel，curl，ffmpeg，httpie，wget。
- --downloader-args：下载器的额外参数：下载参数 -c：断点续传；-j：并发数；-x：线程数（最多 16）；-k：分段（每段 1M）

```bash
yt-dlp --downloader aria2c --downloader-args aria2c:"-c -j 3 -x 8 -k 1M" [--proxy ...] URL

# 下载B站视频的例子
yt-dlp --external-downloader aria2c --downloader-args aria2c:"-x 8 -k 1M" https://www.bilibili.com/video/BV1PY4y1z7PX
```

> 8 线程、分片（每分 1M，且视频支持分片下载，否则不生效）

[下载视频激活 aria2](./yt-dlp下载安装使用.assets/yt-dlpWith_aria2.png)](https://imagehost.mintimate.cn/post_yt-dlp/yt-dlpWith_aria2.png)

下载视频激活 aria2

## MediaInfo 开源媒体信息命令行

MediaInfo 是一个用于分析视频和音频文件的编码和内容信息的开源软件。它支持多种格式，可以显示文件的标题，作者，时长，编码器，比特率，帧率，分辨率，声道，语言等信息。

第三方文档：[使用 MediaInfo 在 Linux 上显示媒体文件信息 - OSTechNix](https://ostechnix.com/display-media-files-information-on-linux-using-mediainfo/)

官网：[MediaInfo (mediaarea.net)](https://mediaarea.net/en/MediaInfo)

MediaInfo 开源地址：[MediaArea/MediaInfo: Convenient unified display of the most relevant technical and tag data for video and audio files. (github.com)](https://github.com/MediaArea/MediaInfo)

源码下载地址：[MediaInfo - 下载 (mediaarea.net)](https://mediaarea.net/en/MediaInfo/Download)

其他中文文档：

- [MediaInfo 使用简介（新版本支持 HEVC）\_mediainfo 位置-CSDN 博客](https://blog.csdn.net/leixiaohua1020/article/details/11903507)
- [开源项目 MediaInfo_mediainfo sdk-CSDN 博客](https://blog.csdn.net/maxwoods/article/details/12774211)
- [MediaInfo 库的使用\_mediainfo 库下载和使用-CSDN 博客](https://blog.csdn.net/danjuan123/article/details/65444009)

## 开源播放器 MPV

开源地址：[mpv-player/mpv: 🎥 Command line video player (github.com)](https://github.com/mpv-player/mpv)

文档：[mpv.io | Installation](https://mpv.io/installation/)

### 一、国外的 youtube-dl / yt-dlp 方案：

1.使用 mpv 内置的 youtube-dl 播放在线视频方案：mpv 默认集成了 youtube-dl 的在线视频解析方案，用法如下：

```bash
mpv --referrer="https://www.bilibili.com" --start=13 https://www.bilibili.com/v
```

可以按官网文档快速安装或者参考以上链接了解更详细用法，然后配置 mpv.conf 文件，文件末尾加上如下几行：

```bash
script-opts=ytdl_hook-ytdl_path=/usr/local/bin/yt-dlpscript-opts-append=ytdl_hook-ytdl_path=/usr/local/bin/yt-dlp
```

这样我们再次使用如下的写法时，它便会把默认的 youtube-dl 的自带视频解析引擎替换为 yt-dlp。如下图所示：

```bash
mpv --referrer="https://www.bilibili.com" -v --no-resume-playback --start=13 https://www.bilibili.com/video/BV1PV4y177LE
```

![img](./yt-dlp下载安装使用.assets/f9dcd100baa1cd11135c24a00af386f7c1ce2db0.png)

mpv.conf 文件配置详情如下，可以参考：[mpv 详细配置文件 - 简书 (jianshu.com)](https://www.jianshu.com/p/3dfd11a9c2a7)

### 二、配置登录时使用 Cookies

有些视频使用 MPV 进行下载或播放时，会提示需要用户登录，或出现播放及下载不了的情况，此时可以通过设置 cookies 来正常访问。默认是支持两种方式的。

## 更多用例文档

更多用例文档：[yt-dlp/yt-dlp: A youtube-dl fork with additional features and fixes (github.com)](https://github.com/yt-dlp/yt-dlp#embedding-examples)

可用参数和公共函数列表：[yt-dlp/yt_dlp/YoutubeDL.py at master · yt-dlp/yt-dlp (github.com)](https://github.com/yt-dlp/yt-dlp/blob/master/yt_dlp/YoutubeDL.py)

**支持的视频网站列表：**[yt-dlp/supportedsites.md at master · yt-dlp/yt-dlp (github.com)](https://github.com/yt-dlp/yt-dlp/blob/master/supportedsites.md)

## 故障报错排除解决

### 1 无法连接

> WARNING: [youtube] Unable to download webpage: <urlopen error [WinError 10061] 由于目标计算机积极拒绝，无法连接。>

解决：

1. 检查 vpn 或代理是否正常连接
2. 检查命令的地址和脚本地址是否一致

——————————————————————————————————

下面，你将找到可能偶尔遇到的常见错误列表。这些问题中的大多数可以通过将 yt-dlp 更新到最新版本来解决。

但是，有一些错误，如下面列出的错误，即使使用 Youtube-dl 的更新版本，也可能仍然存在。

### 2 Unable to extract uploader id

```bash
Unable to extract uploader id; please report this issue on https://github.com/yt-dlp/yt-dlp/issues?q= , filling out the appropriate issue template. Confirm you are on the latest version using yt-dlp -U
```

解决：

yt-dlp -U 检查是否有可用新版本，尝试更新 yt-dlp

```bash
pip310 install --upgrade yt-dlp
```

### 1. 错误：Fix "Unable to download video data: HTTP Error 403: Forbidden" Error

从 YouTube 下载视频时，有时你会收到如下错误。

```
ERROR: unable to download video data: HTTP Error 403: Forbidden
```

要修复此错误，只需使用以下命令清除 yt-dlp 缓存：

```bash
yt-dlp --rm-cache-dir
Removing cache dir /home/ostechnix/.cache/yt-dlp …
```

### 5.2. 错误：Unable to Open for Writing: [Errno 36] File Name Too Long

如果你在尝试下载名称较长的 YouTube 视频时遇到此错误，请按照以下步骤解决该错误：

你可能会看到类似于以下内容的错误消息：

```bash
[youtube] _XEgknKEBws: Downloading webpage
 ERROR: unable to open for writing: [Errno 36] File name too long: '\xe0\xae\xa8\xe0\xaf\x8b
[...]
\xe0\xaf\x8d\xe0\xae\x95\xe0\xae\xae\xe0\xaf\x8d-_XEgknKEBws.f136.mppart
```

要解决此错误，只需使用“”标志下载具有你选择的较短名称的视频。例如：`-o`

```bash
yt-dlp -f 'bestvideo[ext=mp4]+bestaudio[ext=m4a]' -o video.mp4 <URL>
```

在这个命令中，“”标志允许你为下载的视频指定一个自定义名称，确保它具有更短的文件名。

## 常见问题

以下是 yt-dlp 的常见问题 （FAQ）。

**问：什么是 yt-dlp？**

答：yt-dlp 是一个命令行程序，用于从各种网站（包括 YouTube）下载视频和播放列表。它是 youtube-dl 的一个分支，具有附加功能和改进。

**问：如何在我的系统上安装 yt-dlp？**

答：你可以使用 或 或 在 Linux 、macOS 和 Windows 上安装 yt-dlp。在 Linux 上，你还可以分别使用 Debian/Ubuntu 或 Fedora 等包管理器。有关详细的安装说明，请参阅上面的**安装 yt-dlp 部分**。` wget``curl``pip``apt``dnf `

**问：我可以在 Android 上使用 yt-dlp 吗？**

答：是的，你可以通过 Termux 应用程序安装 yt-dlp 在 Android 上使用它。有关在 Android 上设置 yt-dlp 的具体说明，请参阅文档。

**问：如何将 yt-dlp 更新到最新版本？**

答：你可以通过运行以下命令来更新 yt-dlp：

这将获取并安装最新版本的 yt-dlp。`yt-dlp -U`

**问：如何下载特定质量或格式的视频？**

答：yt-dlp 提供了一系列选项来指定下载视频的格式或质量。你可以使用 or 标志后跟格式代码来选择特定的格式或质量。` -f``--format `

**问：我可以只下载视频的音频吗？**

答：是的，你只能使用 yt-dlp 下载视频的音频。使用标志提取音频，并使用 指定所需的音频格式。例如：` -x``--audio-format `

```
yt-dlp -x --audio-format mp3
```

**问：如何设置下载速度限制？**

答：要限制下载速度，请使用标志，后跟所需的速度（以字节/秒为单位）。例如，要将速度限制为 50KB/s：`-r`

```
yt-dlp -r 50K <video_url>
```

**问：如何按上传日期筛选视频？**

答：yt-dlp 允许你按上传日期过滤视频。使用 、 或标志，后跟日期，格式为 YYYYMMDD 来指定筛选条件。` --date``--datebefore``--dateafter `

**问：yt-dlp 是否与脚本和自动化兼容？**

答：是的，yt-dlp 可以集成到脚本和自动化工作流程中。你可以将它与各种脚本语言一起使用，以执行批量下载、计划下载等。

**问：我可以从 YouTube 以外的网站下载视频吗？**

答：是的，yt-dlp 支持广泛的网站，而不仅仅是 YouTube。你可以使用它从各种在线平台下载视频和播放列表。

**问：yt-dlp 合法使用吗？**

答：yt-dlp 本身是下载公开视频的合法工具。但是，在使用 yt-dlp 时，请务必尊重版权和知识产权，并避免在未经适当授权的情况下下载内容。

**Q: 使用 yt-dlp 相对于使用 youtube-dl 有哪些优点？**

A：yt-dlp 提供了额外的功能和选项，这些在 youtube-dl 中不可用。它还有一个活跃的开发社区，确保漏洞得到快速修复和新功能得到添加。请查看我们之前的部分： [优缺点。](https://www.rapidseedbox.com/zh/blog/yt-dlp-complete-guide#06).

**Q: 如何安装 yt-dlp？**

A：您可以通过下载二进制可执行文件或通过操作系统的软件包管理器来安装 yt-dlp 在 Linux、Windows 或 macOS 上。要了解如何安装 yt-dlp，[请返回“如何下载和安装 yt-dlp](https://www.rapidseedbox.com/zh/blog/yt-dlp-complete-guide#02)”部分。

**Q: 我可以使用 yt-dlp 下载不同格式的视频吗？**

A：是的，您可以使用 yt-dlp 下载不同格式的视频。您可以使用命令行选项或编辑配置文件来指定格式。

**Q: 使用 yt-dlp 下载 YouTube 视频是否合法？**

A：YouTube 上的某些内容可能受版权保护，未经许可下载可能是非法的。从 YouTube 下载视频违反 YouTube 的服务条款。但仍然有许多人这样做，而 YouTube 已经决定不采取行动。

**Q: 我可以使用 yt-dlp 下载整个播放列表吗？**

A：是的，yt-dlp 允许您通过指定播放列表的 URL 来下载整个播放列表。

**Q: yt-dlp 是否支持字幕？**

A：是的，yt-dlp 支持多种格式的字幕。您可以在下载中嵌入字幕并指定首选字幕语言。

**Q: 我可以使用 yt-dlp 下载仅包含音频的文件吗？**

A：是的，yt-dlp 允许您以多种格式（如 MP3 和 AAC）下载仅包含音频的文件。

**Q: yt-dlp 是否在积极维护中？**

A：是的，yt-dlp 由一组专业开发人员积极维护，定期发布更新和漏洞修复。

## yt-dlp 的优点及缺点

虽然 yt-dlp 具有许多出色的功能和特点，使其成为最好的 YouTube 下载器之一，但它也有一些缺点需要您了解。 **以下是使用 yt-dlp 的一些优点和缺点。**

### a. 优点:

- **免费且开源：** yt-dlp 是完全免费的。 它也是由一个强大的开发者社区维护的开源项目。
- **多平台支持：** yt-dlp 可用于 Windows、Linux 和 macOS。 这种多平台支持使其适用于广泛的用户。
- **多种下载选项：** 虽然 yt-dlp 是最好的“下载 YouTube 视频”工具之一，但它还有其他选项，这些选项在其他视频下载器中很难看到，包括视频格式、字幕选择和缩略图图像。
- **自动重试：**yt-dlp 具有一些出色的自动化功能。 其中最好的功能之一是它可以自动重试下载失败的内容，节省您的时间和精力。
- **支持更多的网站和扩展：** yt-dlp 不仅支持 YouTube，还支持 Vimeo 和优酷等其他网站。 它还支持浏览器扩展，如 SponsorBlock，可以让您跳过 YouTube 视频中的赞助片段。

### 缺点:

- **没有图形用户界面(GUI)：** 使用 yt-dlp 的一个缺点是缺乏 GUI。 yt-dlp 是一个命令行工具，这可能不适合那些喜欢图形用户界面的用户。
- **需要配置：**从我们的逐步指南中，您可能已经注意到 yt-dlp 需要一些配置知识。 要使用 yt-dlp，您必须学习配置行以获取所需的输出格式、音频质量或其他选项。
- **没有官方软件包：** yt-dlp 没有适用于某些平台的官方软件包。 如果您有技能和耐心从源代码构建或依赖第三方存储库，则没有官方软件包可能不会对您造成不利影响。
- **法律问题：** 下载 YouTube 视频在技术上违反了其服务条款。 因此，公司可能会起诉您。 然而，许多用户仍然决定这样做，而公司也没有惩罚用户下载他们的视频的意愿。 然而，了解下载受版权保护的材料的法律影响仍然非常重要。
