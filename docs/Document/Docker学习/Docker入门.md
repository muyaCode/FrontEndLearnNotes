# Docker入门

## 相关网址

Docker官网：https://www.docker.com

docker库：https://hub.docker,com

## Docker简介

Docker是一个开源的引擎，可以轻松的为任何应用创建一个轻量级的、可移植的、自给自足的容器。开发者在笔记本上编译测试通过的容器可以批量地在生产环境中部署，包括VMs (虚拟机) 、bare metal、OpenStack 集群和其他的基础应用平台。

Docker通常用于如下场景：

- web应用的自动化打包和发布 ;
- 自动化测试和持续集成、发布；
- 在服务型环境中部署和调整数据库或其他的后台应用；
- 从头编译或者扩展现有的OpenShift或Cloud Foundry平台来搭建自己的PaaS环境。

## 微服务的核心思想



## Docker vs VM

VM：

- 运行在宿主机之上的完整的操作系统
- 运行自身操作系统会占用较多的资源

Docker :

- Docker更加轻量高效
- 对系统资源的利用率很高
- 比虚拟机技术更为轻便、快捷
- 隔离效果不如VM

## Docker的相关概念

Docker是CS架构，主要有两个概念

Docker daemon:

- 运行在宿主机上
- Docker守护进程
- 用户通过Docker client(Docker命令)与Docker daemon交互

Docker client:

- Docker 命令行工具，是用户使用Docker的主要方式 
- Docker client与Docker daemon通信并将结果返回给用户 
- Docker client也可以通过socket或者RESTful api访问远程的Docker daemon

## 安装与Hello world



## 常用命令与Dockerfile

Dockerfile 概念

Dockerfile 文件格式

构建镜像

镜像标签

修改容器内容

## Docker Hub

docker库：https://hub.docker,com

## 实战 :打包一个WEB服务器



## 微服务到底是什么

微服务属于架构层面的设计模式

微服务的设计概念以业务功能为主

微服务独立提供对应的业务功能

微服务不拘泥于具体的实现语言

微服务架构 ~ 模块化开发 + 分布式计算

微服务一一集成与部署

- 持续集成一jekins
- 虚拟化一一虚拟机
- 容器-Docker

## K8S(Kubernetes)入门

官网：https://www.kubernetes.org.cn/k8s

### 什么是K8s

- Kubernetes，因为首尾字母中间有8个字符，所以被简写成 K8s。
- k8s 是底层资源与容器间的一个抽象层，如果和单机架构类比，可以算作是一个分布式时代的 Linux。
- K8s 是 Google 开源的容器集群管理系统。在 Docker 技术的基础上，为容器化的应用提供部署运行、资源调度、服务发现和动态伸缩等一系列完整功能，提高了大规模容器集群管理的便捷性。

### K8S的特点

k8s是一个管理容器的工具，也是管理应用整个生命周期的一个工具应用更新从创建应用，应用的部署，应用提供服务，扩容缩容应用，而且可以做到故障自愈。

- 可移植：支持公有云，私有云，混合云
- 可扩展：模块化，热插拨，可组合
- 自愈：自动替换，自动重启，自动复制，自动扩展

### K8S的管理步骤

在k8s进行管理应用的时候，基本步骤是：

1. 创建集群
2. 部署应用
3. 发布应用
4. 扩展应用
5. 更新应用

### K8S的架构结构

- 生态系统
- 接口层
- 管理层
- 应用层
- 核心层

### 安装K8S

在Linux下安装单机版的集群环境

以root身份执行以下操作 :

1、关闭Linux防火墙

- systemctI stop firewalld
- systemctl disable firewalld

2、安装Kubernetes和依赖组件etcd

- yum install -y etcd kubernetes

3、修改配置

- Docker配置文件：`/etc/sysconfig/docker`，`OPTIONS=''--selinux-enabled=false --insecure-registry gcr.io'`
- Kubernetes apiservce配置文件：`/etc/kubernetes/apiserver`，把 --admission-control参数中的ServiceAccount删除

4、按顺序启动所有的服务

- systemctl start etcd
- systemctl start docker
- systemctl start kube-apiserver
- systemctl start kube-controller-manager
- systemctl start kube-scheduler
- systemctl start kubelet
- systemctl start kube-proxy
