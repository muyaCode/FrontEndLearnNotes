# 02_Git命令详解
git bisect 命令教程：https://www.ruanyifeng.com/blog/2018/12/git-bisect.html

### branch管理

```bash
git checkout -b feat/sass-v1 origin/feat/sass-v1 // 克隆远端分支feat/sass-v1到本地
git checkout -b feat/saas-0817 // 从当前分支新建一个分支feat/saas-0817
git merge [branchName] 将branchName合并到当前分支
git merge [branchName] --squash 将branchName合并到当前分支，并将branchName上的所有提交合并成一次提交
git commit --amend 修改上次的提交信息，push后不会增加新的commit记录，但是会修改本次的commithash(也可以理解为删掉了最新的一次commit，重新又提交了一次)
```
```bash
git commit --amend
// 修改commit msg


```bash
git branch -D [branchName] 删除本地分支
git push origin -D [branchName] 删除远端分支

rebase branch

```bash
git pull --rebase origin [branchName] = git fetch + git rebase

```bash
// 假设当前分支dev, commit 为 a b c d e
// 假设master分支, commit 为 a b f g h
git pull --rebase origin master
// 当前分支dev commit 变为 a b c d e f g h
```

### git rebase master

```bash
// 假设当前分支dev, commit 为 a b c d e
// 假设master分支, commit 为 a b f g h
git rebase origin/master
// 当前分支dev commit 变为 a b f g h c d e
```

### stash贮藏代码

```bash
场景：当你的功能还没开发完不能commit但是现在需要rebase下master,缓存区的代码该咋办？当你写了几行代码，但是现在需要切到其他分支去改bug，缓存区的代码该咋办？
用git stash就好啦
git stash 贮藏代码
git stash pop 恢复到工作区和缓存区，会移除stashid
git stash list 查看当前贮藏区
```

注意：stash@{0} stash@{1} stash@{2} 是stashname

```bash
git stash apply stashname  恢复指定贮藏代码到工作区和缓存区，会保留stashid
git stash save 'msg' 带备注贮藏
git stash show -p 显示最新的贮藏文件具体改动
git stash show -p stashname 显示指定的贮藏文件具体改动
```

### commit

```bash
git commit -m "msg" --no-verify 强制提交不检查
git push -f 强制提交代码并以本地版本代码为主覆盖远程
git push -f是不安全的，git push --force-with-lease更安全，注意--force-with-lease失败后再执行一次也会强制提交覆盖
```

### reset回退

```bash
git log 查看提交日志
git reset 将所有暂存区回退到工作区
git checkout . 丢弃工作区所有的更改
git reset --hard [commit hash] 将从commithash(不包括此hash)之后的丢弃
git reset --hard 将暂存区、工作区所有内容丢弃
git reset --soft [commit hash] 将从commithash(不包括此hash)之后的提交回退到暂存区
git reset --soft HEAD~4 回退最近4次提交到暂存区
```

### cherry-pick 复制提交

```bash
场景：当你在merge或者rebase的时候发现冲突太多了，想哭的时候，可以用原分支check目标分支处理，然后再cherry-pick当前分支的每个提交，这样冲突就会少很多。或者另一分支上有些代码还没有merge到master，但是你当前分支又非要用的时候，就可以cherry-pick过来一份。
git cherry-pick [commit hash] 将其他分支上已提交的commit在当前分支再提交一次，产生新的commithash
```

### revert

```bash
git revert [commit hash] 非merge的commit
git revert -m [1|2] [commit hash] merge类型的commit

通过git show [commit hash]查看
```

- 第三行第一个hash为编号1，第二个hash为编号2，以哪个父hash为主线则保留哪个，删除另一个
复制代码

- git revert -m 1 bd86846 则回滚bd86846的提交，且以ba25a9d master分支为主线保留，回滚掉1c7036f 所在分支提交
复制代码
rebase -i

场景：使用merge导致git提交线乱七八糟，提交日志过多非常难看。自从使用了rebase提交线变得无比丝滑，使用rebase -i合并每个需求的所有提交成1个，使日志变得清晰

git rebase -i HEAD~10 调整最近10次提交的日志、或合并多次提交为1次，让log更好看更清晰

p使用, pick = use commit
s合并掉, squash = use commit, but meld into previous commit
所有的提交按时间倒序排列
被s的会合并到上一次commit,也就是当前排列的上一个里面

### 工作流说明

```bash
scope
feat: 新功能、新特性
fix: 修改 bug
perf: 更改代码，以提高性能（在不影响代码内部行为的前提下，对程序性能进行优化）
refactor: 代码重构（重构，在不影响代码内部行为、功能下的代码修改）
docs: 文档修改
style: 代码格式修改, 注意不是 css 修改（例如分号修改）
test: 测试用例新增、修改
build: 影响项目构建或依赖项修改
revert: 恢复上一次提交
ci: 持续集成相关文件修改
chore: 其他修改（不在上述类型中的修改）
release: 发布新版本
workflow: 工作流相关文件修改
```
