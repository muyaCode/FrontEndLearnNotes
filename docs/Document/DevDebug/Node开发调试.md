# Node开发调试

Node.js 如何查看内存泄漏（英文）：<https://blog.appsignal.com/2022/09/28/minimize-heap-allocations-in-nodejs.html>

## inspect 调试法

- 1.修改package.json文件的`scrtips` 脚本命令，增加 `--inspect`，启动服务

  - 1.1 package.json文件：nodemon是运行的依赖库，需要安装

  - ```json
    "script": {
        "dev":"nodemon --inspect=9229 index.js"
    }
    ```

  - 1.2 开始执行命令运行：`npm run dev`

- 2.打开 chrome浏览器，访问：chrome://inspect

  - 打开后如下：
  - ![chrome-inspect](.\img\chrome-inspect.jpg)
  - 点击跳转后便开始监听的Node服务

- 3.回到Node代码中，增加 `debugger` 断点代码

- 4.重启服务，回到chrome浏览器，即可调试源码
