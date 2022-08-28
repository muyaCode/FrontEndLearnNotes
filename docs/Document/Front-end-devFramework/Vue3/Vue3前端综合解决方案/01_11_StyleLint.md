# 集成StyleLint

stylelint和eslint有相似的作用和原理，只不过校验对象不同，它主要用来校验你的样式代码，如css、scss、less等，这里就不做过多介绍，相信聪明的你可以从刚刚eslint的文章中做到举一反三，直接上代码：

```text
npm install --save-dev stylelint
npm install --save-dev stylelint-config-standard
```

在本地创建名为.stylelintrc.js的配置文件，配置如下：

```text
"use strict";
module.exports = {
  ignoreFiles: [
    "./**",
    "!./client/views/**/*.vue",
    "!./client/views/**/*.scss",
    "!./client/styles/**/*.scss",
    "!./client/plugin/**/*.vue",
    "!./client/plugin/**/*.scss"
  ],
  extends: ["stylelint-config-standard"],
  rules: {
      // 这里可以覆盖一些配置
  }
};
```

测试一下校验能力，项目根目录输入代码：

```text
npx stylelint ./ --fix
```

上面代码会默认读取.stylelintrc.js的配置，忽略你不需要校验的目录。

### 在本地 git commit 时进行 hard lint

虽说我们已经在本地编辑器中安装了 vscode plugin Eslint 和 vscode plugin stylelint，但是这仍然不太到位，它只是一种辅助加持，并不能做到真正的“硬限制”，我们希望通过一种方式，新人下载项目代码后即可自带校验功能（npm install一下开箱即用），无需再手动配置任何东西。我们尝试和commitlint一样在commit环节同时完成eslint和stylelint的校验，若校验不通过，则无法提交代码，阿三称之为“hard lint”。

我们仍然期望它是一种“增量校验”，因为如果每次执行git commit -m 都要执行npx eslint ./** --fix对项目中所有文件做一次校验，老板都要等破产了，实在是太慢了，我们只需对Git中处于 staged状态（git add的文件）的文件进行校验即可。

前面我们讲过，想要在执行 git commit时进行一些自定义的操作， 我们可以借助husky监听git hooks的能力，此时，我们可以监听pre-commit钩子，也就是说它会比commit-msg钩子先触发，优先进行eslint和stylelint的校验，校验通过后再进行commitlint的校验。

前面我们以前安装了husky, 那么我们如何实现只对staged的文件进行“增量校验”呢？此时需要借助另外一个包lint-staged ，执行下面命令：

```text
npm install --save-dev lint-staged
```

然后在package.json文件中，增加下面配置（注意这里只是增加配置，别傻乎乎的把自己的原有配置给覆盖了）：

```text
{
  "scripts": {
    "eslint:fix": "eslint --fix --ext \".js,.vue\"",
    "eslint:lint": "eslint --ext \".js,.vue\"",
    "stylelint:fix": "stylelint \"./**\" --fix"
  },
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged",
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  },
  "lint-staged": {
    "linters": {
      "*.{scss,css}":[
        "npm run stylelint:fix",
        "git add"
      ],
      "*.vue": [
        "npm run stylelint:fix",
        "npm run eslint:fix",
        "git add"
      ],
      "*.{js}": [
        "npm run eslint:fix",
        "git add"
      ]
    },
    "ignore": [
      "**/test/**"
      // 你要忽略的其他目录...
    ]
  }
}
```

注意"lint-staged"这个配置，它会匹配Git中处于staged状态的文件名，并针对这些匹配到的文件执行相对应的脚本，以vue文件为例，它会你在执行git commit -m 'test'时，依次执行npm run stylelint:fix、npm run eslint:fix 和 git add，如果没有错误或者错误能被自动修复(--fix)， 则会将改动自动add 将修复后的代码加入 git staged, 继续进行commitlint的校验，若全部通过，才会生成一个新的commit，它的流程如下图：

![](https://pic4.zhimg.com/80/v2-c7ef2a6be8937d43c49a289efb0eb4c3_720w.jpg)

### 6.3、其他lint时机

除了上面讲的在编辑器中进行“soft lint” 和在commit阶段进行“hard lint”之外，我们还可以在“webpack的loader阶段”或“CI持续集成远端”进行校验，但这不一定是必须的，需要看你们公司的是否需要这种校验，感兴趣的同学可以自己研究一下。
