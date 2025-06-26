# uni-app开发

## 为什么要使用uni-app

- 微应用

  - 微信小程序发布

    - 2017.1.9发布

    - 小程序创业

  - 国民级应用普及

    - 支付宝

    - 抖音

    - 头条

    - 百度app

  - 前端泛滥时代
    - 开发维护成本高

  - 未来微应用会成为趋势

- uniapp

  - 一套代码适配

    - ios

    - Android

    - h5

    - 各种小程序平台

  - 优点

    - 学习成本低
      - 基于Vue,微信小程序api
        - 使用Vue,小程序开发,学习成本几乎为零

    - 开发成本低
      - 一套代码多端应用,满足初创公司的一切幻想

    - 按需编译
      - 通过注释写法,即可保留平台特点(微信卡包),又不增加其他平台发布资源包大写

## 开发准备

- 编译工具下载

  - HBuilderX
    - https://www.dcloud.io/

  - 微信小程序开发工具
    - https://developers.weixin.qq.com/miniprogram/dev/devtools/devtools.html

  - 其他自行下载

## 初探uinApp

- 创建项目并且运行

  - HBuilderX>创建项目>选择uinapp空模板
    - 参考官方提供demo

  - 微信开发者工具
    - 打开微信开发者工具>设置>安全设置>打开服务端口

  - HBuilderX>运行>小程序模拟器>运行设置>设置微信小程序开发工具路径

  - 运行>小程序模拟器>启动

## 目录介绍

- unpackage
  - 启动自动生成目录
    - 会自动生成多版本代码

- pages.json

  - pages.json：通用部分配置项,页面路由、导航条、选项卡等页面类信息
    - 文档框架,globalStyle

  - 新增一个页面

- manifest.json
  - 项目常用配置
    - 例如微信小程序AppId
      - 影响真机调试

- main.js
  - 项目入口文件

- App.js
  - 应用配置，用来配置App全局样式以及监听应用的生命周期

- static
  - 存放应用引用静态资源（如图片、视频等）的地方

- pages

  - 业务页面文件存放目录

  - 添加路由
    - 配置页面

  - 配置系统底部导航

- uni.scss

  - 全局通用scss样式库

    - 不需要引入

    - style 加 lang="scss"

    - 安装scss编译插件

- components

  - 新建目录
    - 名字默认写法

  - 兄弟组件通信

    - 事件订阅

      - $on
        - 注册事件调用多次

      - $once
        - 注册事件调用一次

      - $emit
        - 触发事件

## 基础入门

- 表达式测试

  - 语法测试

  - 表达式

    - 输出字符串,定义变量

    - 支持运算符

    - 逻辑运算符

    - 二元运算符

    - js数据类型方法使用
      - 差异

  - 不要在表达式里面写过多逻辑
    - 逻辑语句,switch,alert,等等

- 属性绑定

  - 小程序语法测试
    - 注意基于Vue语法
      - 双引号,与双大括号之间有乾坤

  - :修饰符v-bind简写方式

  - 动态样式

    - class

      - 对象形式

      - 数组形式

      - 数组对象组合形式

    - style

      - 对象形式

      - 数组对象形式

- 方法调用

  - 获取事件对象
    - $event

  - 阻止事件冒泡
    - 修饰符

  - uni-app里没有什么默认事件，比如 submit 并不会跳转页面

- 常用指令

  - v-show

  - v-if

  - v-for

    - 异步渲染

    - 获取当前

- API调用

  - .nvue 是属于weex编写范畴,作用增强uinapp对原生部分支持

  - uinapp里面所有涉及Api调用统一参考,uinapi

- 常用生命周期

  - 应用生命周期

    - onLaunch
      - 可以获取场景值

    - onShow
      - 进入应用触发

    - onHide
      - 切入后台触发

  - 分页生命周期

    - onShow
      - 路由进入触发

    - 页面进入刷新一次

      - onLoad
        - 页面初始化执行,用户页面获取参数

      - onReady
        - 页面初次渲染完毕执行

    - 执行多次

      - onShow
        - 页面进入执行,执行多次

      - onHide
        - 页面离开执行执行多次

    - 监听窗口尺寸变化
      - onResize

    - 下拉执行
      - onPullDownRefresh

    - 页面滚动监听
      - onPageScroll

    - 页面滚动到底执行

      - onReachBottom

      - scroll-view组件有自己的方法

    - 点击系统配置tab触发
      - onTabItemTap

    - 右上角分享设置
      - onShareAppMessage

  - 组件生命周期

    - 参照Vue生命周期

      - h5项目支持

        - beforeUpdate

        - updated

    - beforeCreate
      - 实例初始化执行

    - created
      - 实例创建执行

    - beforeMount
      - 模板渲染之前调用

    - mounted
      - 模板渲染完毕

- 路由跳转

  - 跳转非tab配置,并打开新页面

    - uni.navigateTo
      - 保留当前页面
        - 例如跳转详情页需要返回调用

    - uni.redirectTo
      - 不保留当前页面

    - uni.navigateBack
      - 需要返回调用

    - 小程序中页面栈最多十层。使用uni.navigateTo频繁切换,会导致栈溢出,跳转失败

  - 跳转tab配置页面
    - uni.switchTab(OBJECT)

  - url
    - 携带参数

- 视图容器

  - scroll-view

    - 横滑效果

    - 点击切换效果

- 节点操作

  - uni.createSelectorQuery().select('#test').boundingClientRect(function(e){

  - 不能使用标准HTML标签，也不能用js对dom进行操作

  - 差异

    - 没有window对象

    - 也没有键盘修饰符

  - onReady

- uni_app_ajax

  - 不检查http

  - 设置请求头

- 扩展 nui-app使用

- 地图调用