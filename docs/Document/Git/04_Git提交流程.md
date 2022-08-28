# Git提交流程

在使用Git的过程中如果没有清晰流程和规划，否则,每个人都提交一堆杂乱无章的commit,项目很快就会变得难以协调和维护。Git版本管理同样需要一个清晰的流程和规范。业内普遍采用的git 工作流程就是git flow，使得团队协作效率大大提高‌

下面是git flow的工作流程图：

Git Flow 的常用分支
生产分支（master）‌
Master分支是仓库的主分支，也有人叫Production分支，这个分支包含最近发布到生产环境的代码，最近发布的Release， 这个分支只能从其他分支合并，不能在这个分支直接修改‌

补丁分支（hotfix）‌
当我们在生产环境发现新的Bug时候，我们需要基于master分支创建一个Hotfix分支，然后在Hotfix分支上修复bug，完成Hotfix后，我们要把hotfix分支合并回Master和Develop分支‌，所以Hotfix的改动会进入下一个Release

发布分支（release)‌
当你需要发布一个新功能的时候，要基于Develop分支创建一个Release分支，在Release分支测试并修复bug，完成release后，把release合并到master和develop分支‌

开发分支（develop）‌
这个分支是我们的主开发分支，包含所有要发布到下一个Release的代码，这个主要合并与其他分支，比如Feature分支‌

功能分支（feature）‌
feature分支主要是用来开发一个新的功能，一旦开发完成，我们合并回Develop分支进入下一个Release‌

接下来我们讲下git flow的具体使用细节：
当我们新建git仓库之后，默认会创建一个主分支也就是master分支，由于master分支是用于发布生产环境，所有必须保证master上代码的稳定性，所以我们不能直接在master分支上修改提交。我们要基于master分支创建一个develop分支，develop分支用于保存开发好的相对稳定的功能，master分支和develop分支是仓库的常驻分支，一直会保留在仓库中

当新的开发任务来了之后，就要编写代码了，我们尽量不要在develop分支上写代码，要保证develop分支的相对稳定，所以这时我要就要基于develop 分支创建一个临时的开发分支，然后在开发分支上编写代码，等功能开发完之后我们再把开发分支合并到develop上

新功能合并到develop分支之后，我们想把新功能发布到生产环境，首先基于develop分支创建release分支，然后在release分支测试完成之后，把release分别合并到master分支和develop分支

release分支合并到master分支之后，在master分支上打标签用于发布：

我们把代码发布到了生产环境，用户在使用的时候给我们反馈了一个bug，这时我们需要基于master分支创建一个hotfix 分支，用于修复bug，bug修好之后，把hotfix 分支分别合并到master分支和develop分支

Git flow工具

如果你理解了上面的流程，你完全可以不使用Git flow工具，但是如果你想更标准化的执行git flow，可以尝试使用git flow工具‌

安装‌SourceTree

初始化 Git flow

点击右上角的 “Git 工作流” ，初次会提示我们 “使用 Git Flow 来初始化此仓库”，已经帮助我们预定义好了一些配置，我们只需要点击 “确定” 按钮即可

点击“确定”按钮后，我们会发现 SourceTree 为我们自动创建了 develop 分支，并且切换到了 develop 分支。

Git flow: 建立新功能

继续点击右上角的 “Git 工作流” ，这次会提示我们选择具体的下一个流程动作，这里我们演示一个 “建立新的功能” 流程。

点击 “建议新的功能” ，会让我们对即将要开发的功能进行命名（名称请使用英文），这里我们输入 simple-git-flow，点击确定按钮，会自动帮助我们创建 feature/simple-git-flow 分支，并切换到该分支上。

同时我们也能看到 SourceTree 帮助我们执行了什么命令来达到这样的效果。

已经自动切换到feature/simple-git-flow 分支。

提交代码
此时我们可以在分支上开发我们的新功能，可以在分支上管理代码，而不影响到其他同事的开发工作。

为了简单演示，我们修改下 readme.md 的内容如下：

在 SourceTree 界面，我们需要在 未暂存文件 区域选中 readme.md 并点击 暂存所选 按钮，此时 readme.md 文件会进入到 已暂存文件 区域。只有 已暂存文件 的文件会进行 提交操作 。

在下方的空白区域输入本次提交的说明：a simple git flow 后点击提交按钮，就会提交源码。

如下图所示：可以看到刚刚提交的代码记录

完成新功能开发

经过不断的代码完善，并且经过单元测试后，代码已经完成后，此时就可以完成 新功能的开发，继续点击Git 工作流

点击 “完成功能”，默认会如下图所示，在正常的开发流程下，我们不需要更改任何设置，直接点击确定即可。

SourceTree 展示所执行的命令及结果。

完成后，我们会发现 feature/simple-git-flow 分支已经不见了，同时在 develop 分支上多了一个a simple git flow的提交信息。

至此整个 “建议新功能” 的 git flow 流程就完毕了。

### 如何修改之前的 commit 信息？

其实并不复杂，我们只需要这样做:

1. 将当前分支无关的工作状态进行暂存
   
   > git stash

2. 将 HEAD 移动到需要修改的 commit 上
   
   > git rebase 9633cf0919^ --interactive

3. 找到需要修改的 commit ,将首行的 pick 改成 edit

4. 开始着手解决你的 bug

5. git add 将改动文件添加到暂存

6. git commit –amend 追加改动到提交

7. git rebase –continue 移动 HEAD 回最新的 commit

8. 恢复之前的工作状态
   
   > git stash pop

### 五、项目中使用

这时候问题又来了，为什么我提交的时候会有警告，这个又是如何做到的呢?

这时候，我们需要一款 Node 插件 validate-commit-msg 来检查项目中 Commit message 是否规范。

1. 首先，安装插件：
   
   `npm install --save-dev validate-commit-msg`

2. 使用方式一，建立 .vcmrc 文件：
   
   ```
   { 
   
     "types": ["feat", "fix", "docs", "style", "refactor", "perf", "test", "build", "ci", "chore", "revert"], 
   
     "scope": { 
   
       "required": false, 
   
       "allowed": ["*"], 
   
       "validate": false, 
   
       "multiple": false 
   
     }, 
   
     "warnOnFail": false, 
   
     "maxSubjectLength": 100, 
   
     "subjectPattern": ".+", 
   
     "subjectPatternErrorMsg": "subject does not match subject pattern!", 
   
     "helpMessage": "", 
   
     "autoFix": false 
   
   } 
   ```

3. 使用方式二：写入 package.json
   
   ```json
   { 
   
   "config": { 
   
     "validate-commit-msg": { 
   
       /* your config here */ 
   
     } 
   
   } 
   
   }
   ```

4. 可是我们如果想自动使用 ghooks 钩子函数呢？
   
   ```json
   { 
   
   … 
   
   "config": { 
   
     "ghooks": { 
   
       "pre-commit": "gulp lint", 
   
       "commit-msg": "validate-commit-msg", 
   
       "pre-push": "make test", 
   
       "post-merge": "npm install", 
   
       "post-rewrite": "npm install", 
   
       … 
   
     } 
   
   } 
   
   … 
   
   }
   ```

在 ghooks 中我们可以做很多事情，当然不只是 validate-commit-msg

更多细节请参考：validate-commit-msg

### 六、Commit 规范的作用

- 提供更多的信息，方便排查与回退;

- 过滤关键字，迅速定位;

- 方便生成文档;

### 七、生成 Change log

正如上文提到的生成文档，如果我们的提交都按照规范的话，那就很简单了。生成的文档包括以下三个部分：

- New features
- Bug fixes
- Breaking changes.

每个部分都会罗列相关的 commit ，并且有指向这些 commit 的链接。当然，生成的文档允许手动修改，所以发布前，你还可以添加其他内容。

这里需要使用工具 Conventional Changelog 生成 Change log ：

```
npm install -g conventional-changelog 

cd jartto-domo 

conventional-changelog -p angular -i CHANGELOG.md -w
```

为了方便使用，可以将其写入 package.json 的 scripts 字段。

```
{ 

  "scripts": { 

    "changelog": "conventional-changelog -p angular -i CHANGELOG.md -w -r 0" 

  } 

}
```

这样，使用起来就很简单了：

```
 npm run changelog
```

git

git status                                                                       日志

git add .                                                                        orm

git status （能够省略）开发

git commit -m “[修改] TASK_NAME 修改客户的登陆权限”  （提交代码格式）    rem

 git checkout develop                                                                    

git pull git@YourIp:ProjectName.git develop:develop （必须有）               

git merge --no-ffJIRA_NAME[](http://www.javashuo.com/link?url=http://10.5.30.94:8080/browse/HYBRIS-3482)

 git push git@YourIp:ProjectName.git develop:develop 

git fetch ( 可选 )

git branch -d JIRA_NAME[](http://www.javashuo.com/link?url=http://10.5.30.94:8080/browse/HYBRIS-3482)（必须）

**远程分支拉到本地开发：**

git checkout develop2[远程分支名]

git pull [git@10.5.2.121](mailto:git@10.5.2.121):MFR/hybris5511.git[](http://www.javashuo.com/link?url=http://10.5.2.121:8080/gitlab/MFR/hybris5511/commit/c9ef4d47714abb94ee05bcdfaa3856de0c39719d)develop2:develop2

git checkout -bJIRA_NAMEdevelop2[远程分支名]

git commit -m “[修改] TASK_NAME 把远程分支客户的登陆逻辑修改了”  

git checkout develop2[远程分支名]   

git pull [git@10.5.2.121](mailto:git@10.5.2.121):MFR/hybris5511.gitdevelop2 :develop2

git merge --no-ffJIRA_NAME   

git push [git@10.5.2.121](mailto:git@10.5.2.121):MFR/hybris5511.gitdevelop2 :develop2 

**特殊说明：**

git单个提交文件不能大于100M。不然**Push rejected: D:\MavenSpace\thinkinjava: push master to origin/master was rejected by remote**

**回撤版本号：**

git reset --hard ab868a89

git reset --hard 99e8a874

git reset --hard c0f125bd02c8c84ea2de2dfb4d408b8f54b3b8c1

**本地仓库撤回到暂存区：**

git reset HEAD~1 【回撤一个版本】

git reset HEAD~2 【回撤两个版本】

须要从新Commit。

**设置git日志格式以及查找JIRA任务：**

git config --global alias.lg50 "log -50 --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr)%Creset' --abbrev-commit --date=relative"

git lg50 --grep= SIRBYH-8888

Quick Start

1. 全局安装commitizen & cz-conventional-changelog  
   commitizen是一个撰写合格commit message的工具，用于代替git commit 指令，而cz-conventional-changelog适配器提供conventional-changelog标准（约定式提交标准）。基于不同需求，也可以使用不同适配器。

```bash
npm install -g commitizen cz-conventional-changelog  
echo '{ "path": "cz-conventional-changelog" }' > ~/.czrc
```

安装完毕后，可直接使用git cz来取代git commit。

全局模式下，需要 ~/.czrc 配置文件, 为commitizen指定Adapter。

2. 项目内安装commitlint & husky  
   commitlint负责用于对commit message进行格式校验，husky负责提供更易用的git hook。

```bash
Use npm  
npm i -D husky @commitlint/config-conventional @commitlint/cli

Use yarn  
yarn add husky @commitlint/config-conventional @commitlint/cli -D
```

commitlint只能做格式规范，无法触及内容。对于内容质量的把控只能靠我们自己。

3. 添加相应配置  
   创建commitlint.config.js

```bash
 In the same path as package.json

echo 'module.exports = {extends: ["@commitlint/config-conventional"]};' > ./commitlint.config.js
```

引入husky

```bash
// package.json

"husky": {  
  "hooks": {  
    "commit-msg": "commitlint -e $GIT_PARAMS"  
  }  
}
```

4. 使用  
   执行git cz进入interactive模式，根据提示依次填写

```bash
1.Select the type of change that you're committing 选择改动类型 ()

2.What is the scope of this change (e.g. component or file name)? 填写改动范围 ()

3.Write a short, imperative tense description of the change: 写一个精简的描述 ()

4.Provide a longer description of the change: (press enter to skip) 对于改动写一段长描述 ()

5.Are there any breaking changes? (y/n) 是破坏性修改吗？默认n ()

6.Does this change affect any openreve issues? (y/n) 改动修复了哪个问题？默认n ()
```

生成的commit message格式如下：

```bash
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

填写完毕后，husky会调用commitlint对message进行格式校验，默认规定type及subject为必填项。

任何git commit指令的option都能用在 git cz指令上, 例如git cz -a

Commit message规范在rrd-fe落地使用情况  
针对团队目前使用的情况，我们讨论后拟定了commit message每一部分的填写规则。

1. type  
   type为必填项，用于指定commit的类型，约定了feat、fix两个主要type，以及docs、style、build、refactor、revert五个特殊type，其余type暂不使用。

```
主要type

feat:     增加新功能  
fix:      修复bug

# 特殊type

docs:     只改动了文档相关的内容  
style:    不影响代码含义的改动，例如去掉空格、改变缩进、增删分号  
build:    构造工具的或者外部依赖的改动，例如webpack，npm  
refactor: 代码重构时使用  
revert:   执行git revert打印的message

# 暂不使用type

test:     添加测试或者修改现有测试  
perf:     提高性能的改动  
ci:       与CI（持续集成服务）有关的改动  
chore:    不修改src或者test的其余修改，例如构建过程或辅助工具的变动
```

当一次改动包括主要type与特殊type时，统一采用主要type。

2. scope  
   scope也为必填项，用于描述改动的范围，格式为项目名/模块名，例如：node-pc/common rrd-h5/activity，而we-sdk不需指定模块名。如果一次commit修改多个模块，建议拆分成多次commit，以便更好追踪和维护。
3. body  
   body填写详细描述，主要描述改动之前的情况及修改动机，对于小的修改不作要求，但是重大需求、更新等必须添加body来作说明。
4. break changes  
   break changes指明是否产生了破坏性修改，涉及break changes的改动必须指明该项，类似版本升级、接口参数减少、接口删除、迁移等。
5. affect issues  
   affect issues指明是否影响了某个问题。例如我们使用jira时，我们在commit message中可以填写其影响的JIRA_ID，若要开启该功能需要先打通jira与gitlab。参考文档：[Organize work with projects | GitLab](https://docs.gitlab.com/ee/user/project/)

填写方式例如：

```bash
re #JIRA_ID  
fix #JIRA_ID
```

完整的commit message示例

https://imgconvert.csdnimg.cn/aHR0cHM6Ly9tbWJpei5xcGljLmNuL21tYml6X2pwZy9KZExrRUk5c1pmY2ExZzVpYjZzZVk1U2ZLR1ZzMWJhc1RCVGh3UzdpY3htWm1vMXBzbVRpYkhPSW8wVE5OY1p2UjNZY1lPcWZtNEQ2bXFEU2NMMkpFb0dZdy82NDA?x-oss-process=image/format,png

相应的git log

https://imgconvert.csdnimg.cn/aHR0cHM6Ly9tbWJpei5xcGljLmNuL21tYml6X2pwZy9KZExrRUk5c1pmY2ExZzVpYjZzZVk1U2ZLR1ZzMWJhc1QwTXRzZDhQY09qWG1DZW1ibE1pYTNvaWJwQVUySnVLd2lhZlNtZHk3NGRUZ3FlNERHcWpBT3dIb2cvNjQw?x-oss-process=image/format,png
