#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 打包生成静态文件
yarn run docs:build

# 进入生成的文件夹
# cd docs/.vitepress/dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

# time=$(date "+%Y-%m-%d %H:%M:%S") 

# git init
# git add -A
# git commit -m "GitHub Action 自动部署：$time"

# 如果发布到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# # 如果发布到 https://<USERNAME>.github.io   -f 强制推送
# git push -f git@github.com:muyaCode/FrontEndLearningNotes.git master:gh-pages