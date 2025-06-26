# CSS工程化(模块化)方案

## 方案1：PostCSS

官网：[PostCSS - a tool for transforming CSS with JavaScript](https://postcss.org/)

中文网：[PostCSS - 用 JavaScript 工具和插件来转换 CSS 代码的工具 | PostCSS中文网](https://www.postcss.com.cn/)

中文文档：[postcss/README-cn.md at postcss/postcss (github.com)](https://github.com/postcss/postcss/blob/HEAD/docs/README-cn.md)

npm文档：[postcss - npm (npmjs.com)](https://www.npmjs.com/package/postcss)

GitHub：[postcss/postcss: Transforming styles with JS plugins (github.com)](https://github.com/postcss/postcss)

---

### PostCSS安装和使用

#### postcss-cli脚手架安装(可以项目中安装，也可以-g全局安装，也可以不装，单单安装postcss)

需要在你的命令行界面或 npm 脚本里使用 PostCSS，你可以使用 [`postcss-cli`](https://github.com/postcss/postcss-cli)

npm文档：[postcss-cli - npm (npmjs.com)](https://www.npmjs.com/package/postcss-cli)

```bash
npm i -D postcss postcss-cli
```

#### 使用postcss

参考npm文档的Usage和配置文件：[postcss-cli - npm (npmjs.com)](https://www.npmjs.com/package/postcss-cli)

项目根目录中，添加postcss.config.js配置文件

```js
// 导入的插件都是按照顺序执行
module.exports = {
  parser: 'sugarss',
  plugins: [
    require('postcss-import')({ ...options }),
    require('postcss-url')({ url: 'copy', useHash: true }),
  ],
}
```

使用插件：autoprefixer：[postcss/autoprefixer](https://github.com/postcss/autoprefixer)自动加前缀

```bash
postcss --use autoprefixer -c options.json -o main.css css/*.css
```

---

PostCSS是一款使用插件去转换CSS的工具，PostCSS本身只有解析能力，各种神奇的能力主要靠插件，各种插件的功能有：模块化、浏览器前缀添加、兼容性的等等

**插件列表**：[postcss/README-cn.md at postcss/postcss (github.com)](https://github.com/postcss/postcss/blob/HEAD/docs/README-cn.md#%E6%8F%92%E4%BB%B6)

- **Autoprefixer**：是一个根据can i use解析css并且为其添加浏览器厂商前缀的PostCSS插件
  
  - npm文档：[autoprefixer - npm (npmjs.com)](https://www.npmjs.com/package/autoprefixer)
  
  - GitHub开源文档：[postcss/autoprefixer：解析CSS并将供应商前缀添加到规则中(github.com)](https://github.com/postcss/autoprefixer#readme)
    
    - 不加任何vender prefix的通常写法。
      
      ```css
      ::placeholder {
          color: gray;
      }
      ```
      
      Autoprefixer将使用基于当前浏览器支持的特性和属性数据去为你添加前缀。你可以尝试下Autoprefixer的demo：[Autoprefixer CSS online](http://autoprefixer.github.io/)

- postcss-import：模块合并
  
  - npm文档：[postcss-import - npm (npmjs.com)](https://www.npmjs.com/package/postcss-import)

- cssnano：CSS代码压缩，分析没有引用或者不起作用的CSS代码，重复的属性，有可以简写的方式，便会简写

- cssnext：使用新的CSS特性，编译使用（被弃用，改用[`postcss-preset-env`](http://preset-env.cssdb.org/)）
  
  - 官网：[cssnext](https://cssnext.github.io/)
  
  - npm文档：[CSSNANO - npm (npmjs.com)](https://www.npmjs.com/package/cssnano)

- postcss-preset-env：
  
  - 官网：[PostCSS Preset Env - CSSTools (cssdb.org)](https://preset-env.cssdb.org/)
  
  - npm文档：[postcss-preset-env - npm (npmjs.com)](https://www.npmjs.com/package/postcss-preset-env)

## 方案2：CSS预处理器

如sass、less、stylus等，在下一篇幅笔记文档：CSS预处理器

## 方案3：webpack等打包构建工具

webpack处理css(css-loader：打包CSS成js + style-loader：把CSS注入到html的head里面)

具体请看笔记文档：**前端工程化/自动化 - 项目打包构建工具**  的文档
