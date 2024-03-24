# Node 项目项目开发跨域问题 - Nginx 配置

## 前后端分离开发的项目存在跨域问题

### 1.什么是跨域?

<https://www.xxx.com:3000>

<http://www.xxx.com:3000>

协议/一级域名/二级域名/端口号 有一个不同就是跨域

由于 3000 端口和 3001 端口不同, 所以就是跨域

所以我们在 3000 端口设置的 cookie3001 是不能使用的，

而我们在 3001 端口设置的 cookie3000 也是不能使用的

### 2.Cookie 的跨域问题

Cookie 是不能跨域使用的, 所以在前后端分离开发的时候，我们当前的代码就会出现问题

例如:

前端地址: <http://192.168.0.107:3001/login.html>

后端地址: <http://127.0.0.1:3000/api/user/testookie的跨域问题>

Cookie 是不能跨域使用的，所以在前后端分离开发的时候, 我们当前的代码就会出现问题

例如:

前端地址: <http://192.168.0.107:3001/login.html>

后端地址: <http://127.0.0.1:3000/api/user/test>

### 正向代理和反向代理

#### 正向代理

顺着请求的方向进行的代理, 我们称之为正向代理

例如: 访问谷歌

我是一个用户，我访问不了谷歌，但是我可以访问一台海外的服务器，这台海外服务器又可以访问谷歌

那么'我'就可以先访问'海外的服务器', 再通过'海外的服务器'访问谷歌，这就是正向代理

##### 正向代理特点

- 在正向代理中，代理服务器是为用户服务的,

(对于谷歌来说，它并不知道真正访问自己的是谁，只知道有一台服务器访问了自己)

##### 正向代理的用途

- 访问原来无法访问的资源，如 google

- 对客户端访问授权，上网进行认证

- ... ...

#### 反向代理

反向代理和正向代理正好相反，反向代理服务器是为'服务器'服务的

(对于用户来说，它并不知道自己真正访问的是谁,，只知道自己访问了一台服务器)

##### 反向代理的用途

- 负载均衡，通过反向代理服务器来优化网站的负载

- 前后端分离, 统一请求地址

### 3.如何解决前后端分离 Cookie 的跨域问题?

#### 本地 web 服务器搭建

http-server 本地服务器库，npm 文档：[http-server - npm (npmjs.com)](https://www.npmjs.com/package/http-server)

1.全局安装 http-server 库：

```bash
npm install --global http-server
```

2.在静态文件目录下打开终端，输入运行命令：`http-server -p 端口`

```bash
http-server -p 3001
```

3.浏览器就可以访问静态文件了

```bash
localhost:3001
```

4.局域网其他机器访问

```bash
服务器机器的ip地址:端口
```

#### 通过 Nginx 反向代理配置解决跨域问题

nginx 具体配置文档：[nginx 文档](http://nginx.org/en/docs/)

1.Nginx 下载：[nginx: download](http://nginx.org/en/download.html)

2.下载后解压配置

1. 找到解压后的文件夹的目录：nginx/conf

2. 编辑 nginx.conf 文件

   1. ```bash
      # 服务器CPU核数
      worker_processes 4;

      # 在server里面添加以下

      # 前端客户端请求根路径代理的地址
      location / {
          proxy_pass http://服务器ip:端口;

      }
      # 后端服务端请求/api代理的地址
      location /api {
          proxy_pass http://127.0.0.1:3000;
          proxy_set_header Host $host;
      }
      ```

#### Nginx 配置文件 nginx.conf 配置详解

```json
#Nginx用户及组：用户 组。window下不指定
#user  nobody;

#工作进程：数目。根据硬件调整，通常等于CPU数量或者2倍于CPU。
worker_processes  1;

#错误日志：存放路径。
#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

#pid(进程标识符)：存放路径
pid       /usr/local/nginx/logs/nginx.pid;

#一个进程能打开的文件描述符最大值，理论上该值因该是最多能打开的文件数除以进程数。
#但是由于nginx负载并不是完全均衡的，所以这个值最好等于最多能打开的文件数。
#LINUX系统可以执行 sysctl -a | grep fs.file 可以看到linux文件描述符。
worker_rlimit_nofile 65535;


events {
    #使用epoll的I/O 模型。linux建议epoll，FreeBSD建议采用kqueue，window下不指定。
    use epoll;

    #单个进程最大连接数（最大连接数=连接数*进程数）
    worker_connections  1024;

    #客户端请求头部的缓冲区大小。这个可以根据你的系统分页大小来设置，
    #一般一个请求头的大小不会超过1k，不过由于一般系统分页都要大于1k，所以这里设置为分页大小。
    #client_header_buffer_size 4k;
}


http {
    #设定mime类型,类型由mime.type文件定义
    include       mime.types;

    default_type  application/octet-stream;

    #日志格式设置
    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';


    #用了log_format指令设置了日志格式之后，需要用access_log指令指定日志文件的存放路径
    #记录了哪些用户，哪些页面以及用户浏览器、ip和其他的访问信息
    #access_log  logs/host.access.log  main;
    #access_log  logs/host.access.404.log  log404;

    #服务器名字的hash表大小
    server_names_hash_bucket_size 128;

    #客户端请求头缓冲大小。
    #nginx默认会用client_header_buffer_size这个buffer来读取header值，
    #如果header过大，它会使用large_client_header_buffers来读取。
    #如果设置过小HTTP头/Cookie过大 会报400 错误 nginx 400 bad request
    #如果超过buffer，就会报HTTP 414错误(URI Too Long)
    #nginx接受最长的HTTP头部大小必须比其中一个buffer大
    #否则就会报400的HTTP错误(Bad Request)
    #client_header_buffer_size 32k;
    #large_client_header_buffers 4 32k;


    #隐藏ngnix版本号
    #server_tokens off;

    #忽略不合法的请求头
    #ignore_invalid_headers   on;

    #让 nginx 在处理自己内部重定向时不默认使用  server_name设置中的第一个域名
    #server_name_in_redirect off;


    #客户端请求体的大小
    #client_body_buffer_size    8m;


    #开启文件传输，一般应用都应设置为on；若是有下载的应用，则可以设置成off来平衡网络I/O和磁盘的I/O来降低系统负载
    sendfile        on;


    #告诉nginx在一个数据包里发送所有头文件，而不一个接一个的发送。
    #tcp_nopush     on;

    #tcp_nodelay off 会增加通信的延时，但是会提高带宽利用率。在高延时、数据量大的通信场景中应该会有不错的效果
    #tcp_nodelay on，会增加小包的数量，但是可以提高响应速度。在及时性高的通信场景中应该会有不错的效果
    tcp_nodelay on;


    #长连接超时时间，单位是秒
    keepalive_timeout  65;

    #gzip模块设置，使用 gzip 压缩可以降低网站带宽消耗，同时提升访问速度。
    #gzip  on;                     #开启gzip
    #gzip_min_length  1k;          #最小压缩大小
    #gzip_buffers     4 16k;       #压缩缓冲区
    #gzip_http_version 1.0;        #压缩版本
    #gzip_comp_level 2;            #压缩等级
    #gzip_types   text/plain text/css text/xml text/javascript application/json application/x-javascript application/xml application/xml+rss;#压缩类型




    #负载均衡
    #max_fails为允许请求失败的次数，默认为1
    #weight为轮询权重，根据不同的权重分配可以用来平衡服务器的访问率。
    # upstream myServer{
    #   server  192.168.247.129:8080 max_fails=3 weight=2;
    #   server  192.168.247.129:8081 max_fails=3 weight=4;
    # }



    #server {
    #    listen       80;
    #
    #    #IP/域名可以有多个，用空格隔开
    #    server_name  192.168.247.129;
    #    #server_name  www.test.com;
    #
    #    #charset koi8-r;
    #
    #    #access_log  logs/host.access.log  main;
    #
    #   #反向代理配置，
    #   #将所有请求为www.test.com的请求全部转发到upstream中定义的目标服务器中。
    #   location / {
    #
    #       #此处配置的域名必须与upstream的域名一致，才能转发。
    #       proxy_pass http://myServer;
    #       #proxy_pass http://192.168.247.129:8080;
    #
    #       proxy_connect_timeout 20;          #nginx跟后端服务器连接超时时间(代理连接超时)
    #
    #       #client_max_body_size       10m;   #允许客户端请求的最大单文件字节数
    #       #client_body_buffer_size    128k;  #缓冲区代理缓冲用户端请求的最大字节数
    #       #proxy_send_timeout         300;   #后端服务器数据回传时间(代理发送超时)
    #       #proxy_read_timeout         300;   #连接成功后，后端服务器响应时间(代理接收超时)
    #       #proxy_buffer_size          4k;    #设置代理服务器（nginx）保存用户头信息的缓冲区大小
    #       #proxy_buffers              4 32k; #proxy_buffers缓冲区，网页平均在32k以下的话，这样设置
    #       #proxy_busy_buffers_size    64k;   #高负荷下缓冲大小（proxy_buffers*2）
    #       #proxy_temp_file_write_size 64k;   #设定缓存文件夹大小，大于这个值，将从upstream服务器传
    #
    #       root   html; #文件根目录
    #
    #       #定义首页索引文件的名称
    #       index  index.html index.htm;
    #       # 重定向
    #       rewrite ^/(.*)$ https://localhost/ redirect;
    #    }
    #
    #   #动静分离 静态资源走linux 动态资源走tomcat
    #   # 注意 /source/image/下面寻找资源
    #   location /image/ {
    #       root /source/;
    #       autoindex on;
    #   }
    #
    #
    #    # 出现50x错误时，使用/50x.html页返回给客户端
    #    error_page   500 502 503 504  /50x.html;
    #    location = /50x.html {
    #        root   html;
    #    }
    #}



    #下面是配置生产环境中既支持HTTP又支持HTTPS,保证用户在浏览器中输入HTTP也能正常访问

    # SSL证书 配置
    ssl_certificate         cert/yphtoy.com.pem;   #加密证书路径
    ssl_certificate_key    cert/yphtoy.com.key;       #加密私钥路径
    ssl_protocols        TLSv1 TLSv1.1 TLSv1.2;     #加密协议
    ssl_session_cache    shared:SSL:1m;             #加密访问缓存设置,可以大大提高访问速度
    ssl_session_timeout    10m;                       #加密访问缓存过期时间
    ssl_ciphers        HIGH:!aNULL:!MD5;              #加密算法
    ssl_prefer_server_ciphers on;                   #是否由服务器决定采用哪种加密算法

    # 负载均衡
    upstream api_upstream
    {
        server 127.0.0.1:8080 max_fails=3 weight=1;
        server 127.0.0.1:8081 max_fails=3 weight=1;
    }

    #api 接口(兼容HTTP)
    server{
        listen 80;
        server_name api.test.com;
        # 301重定向跳转到HTTPS接口
        return 301 https://$server_name$request_uri;
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }

    #api 接口(兼容HTTPS)
    server{
        listen 443 ssl;
        server_name api.test.com;
        location / {
           root html;
           index  index.html index.htm;
           proxy_pass http://api_upstream;

           #语法： proxy_cookie_path oldpath replacepath;
           #oldpath就是你要替换的路径 replacepath 就是要替换的值
           #作用：同一个web服务器下面多个应用之间能获取到cookie
           proxy_cookie_path /api/ /;

           #服务端接收的请求头Cooke值不变
           proxy_set_header Cookie $http_cookie;
        }
    }

    #管理后台端(兼容HTTP)
    server{
        listen 80;
        server_name manage.test.com;
        # 301重定向跳转到HTTPS接口
        return 301 https://$server_name/$request_uri;
        error_page 500 502 503 504 /50x.html;
        location = /50x.html{
             root html;
        }
    }

    #管理后台端(兼容HTTPS)
    server{
        listen 443 ssl;
        server_name manage.test.com;
        location / {
            root /home/test/web/dist

            index /index.html;


            #语法：try_files 【$uri】 【 $uri/】 【参数】
            #当用户请求https://manage.test.com/login时，
            #一.如果配置了上面的默认index,会依次请求
            #1./home/test/web/dist/login       查找有没有login这个文件，没有的话
            #2./home/test/web/dist/index.html  有就直接返回

            #二.如果没有配置了上面的默认index或者配置了没有找到对应的资源,会依次请求
            #1./home/test/web/dist/login        查找有没有login这个文件，没有的话
            #2./home/test/web/dist/login/       查找有没有login这个目录，没有的话
            #3.请求https://manage.test.com/index.html  nginx内部做了一个子请求

            #三.总的来说,index的优先级比try_files高,请求会先去找index配置,这里最后一个参数必须存在
            try_files $uri $uri/ /index.html;



            #解决跨域问题
            #允许跨域请求地址(*表示全部,但是无法满足带cookie请求,因为cookie只能在当前域请求)
            add_header Access-Control-Allow-Origin $http_origin;
            #允许接收cookie和发送cookie
            add_header Access-Control-Allow-Credentials 'true';
            #允许请求的方法
            add_header Access-Control-Allow-Methods 'GET,POST,DELETE,PUT,OPTIONS';
            #允许请求头（Content-Type:请求数据/媒体类型 x-requested-with:判断请求是异步还是同步 自定义header 比如 token）
            add_header Access-Control-Allow-Headers $http_access_control_request_headers;
            #浏览器缓存请求头信息,1800秒内,只会有1次请求，不会出现"OPTIONS"预请求,节约资源
            #add_header Access-Control-Max-Age '1800';
            if ($request_method = 'OPTIONS') {
                    return 204;
            }


            #服务端HttpServletRequest可以获得用户的真实ip
            proxy_set_header X-Real-IP $remote_addr;

            #服务端HttpServletRequest可以获得用户的真实ip和经过的每一层代理服务器的ip
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

            #服务端接收的请求头Host值不变
            proxy_set_header Host  $http_host;

            proxy_set_header X-Nginx-Proxy true;
        }
    }

}
```
