# Electron客户端安全

官网文档：[安全 | Electron (electronjs.org)](https://www.electronjs.org/zh/docs/latest/tutorial/security)

## XSS

注入XSS

```html
<img onerror="alert(XSS')" />
```

Electron并不是一个浏览器，XSS在Electron中就会变成 RCE(remote command/code execute) 远程代码执行漏洞

```html
<img onerror="require('child_process').exec(rce.bat)" />
```

通过这个可以做一些底层操作，从对浏览器的影响，变成了对系统的影响。

如调取系统的计算器

```html
<img onerror="require('child_process').exec" />
```

## 安全编码实践

- 1.基本Web安全措施(XSS：[前端安全系列（一）：如何防止XSS攻击？ - 美团技术团队 (meituan.com)](https://tech.meituan.com/2018/09/27/fe-security.html))
- 2.窗体开启安全选项
- 3.Node可执行环境
  - ✔主进程任何时候
  - ✔渲染进程-本地内容
  - ✔渲染进程-远程内容 preload阶段
  - ✖渲染进程-远程内容运行阶段
- 4.限制连接跳转
  - ✔https可信域
  - ✔应用本地协议
  - ✖file://
- 5.更多请查阅：[安全 | Electron (electronjs.org)](https://www.electronjs.org/zh/docs/latest/tutorial/security)

## Electron可能存在的漏洞

### 漏洞内容：桌面端存在“克隆攻击“

攻击手段：将 cookie 文件 copy 至其他机器，可直接使用

场景：

- 使用软件加载github网站：<https://github.com/>，登录上github，然后在Mac系统中：`~/Library/Application Support/Mercurius/Cookies` 目录中，可以看到生成的 Cookies文件，把该文件共享到另一台Mac机器
- 然后另一边的机器，把拿到的 Cookies文件也替换到`~/Library/Application Support/Mercurius/Cookies` 目录中，再次启动应用，会发已经登录上了github账号

在Chrome上没有这个漏洞，为什么Electron会有

Electron cookie 没有像 Chrome 加密
issue：chromium的加密存储写在固定keychain，即所有Electron会复写同一个存储

### 解决克隆攻击

#### 用户认证信息与设备指纹绑定

##### 1.启动应用

##### 2.生成指纹

- 稳定性、唯一性
- 设备信息+混淆算法
- 建议是原生实现

##### 3.服务端校验

- 登录时将cookie与指纹绑定
- 校验方法：与绑定时指纹比较

## 应用安全

APP层面

- Web安全+
- 官方安全最佳实践checklist
- 应用代码混淆

NPM层面

- “Left-Pad” “event-stream“
  - 检测工具nsp/snyk
  - 关注npm官博安全文章：[Node.js Security Progress Report – Permission Model Merged - OpenJS Foundation](https://openjsf.org/blog/2023/03/13/node-js-security-progress-report-permission-model-merged/)
  - [Node.js Security Progress Report - Looking Forward to 2023 - OpenJS Foundation](https://openjsf.org/blog/2022/12/15/node-js-security-progress-report-looking-forward-to-2023/)

Electron Framework层面

- 升级最新electron稳定版本
- 反馈给官方邮件：security@electronjs.org
- 具备构建electron应急能力

## 如何保障Electron应用安全?

- 威胁来源
  - 用户认证信息泄露
  - 数据泄露
  - 应用权限失控
  - 应用代码问题&漏洞

![应用安全](.\img\应用安全.jpg)
