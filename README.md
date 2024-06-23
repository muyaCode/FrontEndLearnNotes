# FrontEndLearnNotes/前端学习笔记

**vitepress 框架的 markdown 写作相关文档**：<https://vitepress.vuejs.org/guide/markdown>

## 解决 Node 项目打包内存溢出报错：JS stacktrace

安装依赖后，运行或打包项目报错：vitepress 内存溢出(JS stacktrace)，是因为内存设置不足

需要在 `node_modules/.bin/vitepress` 文件 和 `node_modules/.bin/vitepress.CMD` 文件修改增加运行内存：

**vitepress** 文件

```bash
if [ -x "$basedir/node" ]; then
  exec "$basedir/node"  " --max_old_space_size=49152 $basedir/../vitepress/bin/vitepress.js" "$@"
else
  exec node --max_old_space_size=49152  "$basedir/../vitepress/bin/vitepress.js" "$@"
fi
```

**vitepress.CMD** 文件

```bash
@IF EXIST "%~dp0\node.exe" (
  "%~dp0\node.exe --max_old_space_size=49152"  "%~dp0\..\vitepress\bin\vitepress.js" %*
) ELSE (
  @SET PATHEXT=%PATHEXT:;.JS;=;%
  node --max_old_space_size=49152  "%~dp0\..\vitepress\bin\vitepress.js" %*
)
```
