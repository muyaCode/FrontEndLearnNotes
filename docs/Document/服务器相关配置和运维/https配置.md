# https配置

## Let's Encrypt 免费 SSL 证书

Let's Encrypt 是当前最常用的免费 HTTPS 证书生成工具之一。

该服务由非营利组织提供，致力于为全球范围内的网站提供便捷的自动化证书颁发服务。虽然 Let's Encrypt 证书的有效期只有90天，但是可以自动续期，这使得 Let's Encrypt 更加易于使用和部署。

### 使用

在使用 Let's Encrypt 生成证书时，您可以使用 Certbot 工具来执行此任务。下面是一个示例命令，用于生成证书：

```bash
sudo certbot certonly --email example@qq.com --server https://acme-v02.api.letsencrypt.org/directory --agree-tos --manual --preferred-challenges=dns  -d example.com -d  www.example.com
```

- `certbot`: Certbot 工具名称。
- `certonly`: Certbot 工具的插件，用于生成 SSL/TLS 证书。
- `--email example@qq.com`: Let's Encrypt 要求在生成 SSL 证书时提供有效的联系电子邮件地址。
- `--server https://acme-v02.api.letsencrypt.org/directory`：指定 Certbot 生成证书的 ACME 服务器。这里使用 Let's Encrypt v2 API 端点。
- `--agree-tos`：同意 Let's Encrypt 的服务条款。
- `--manual`：指定使用手动模式生成证书。这意味着您需要在命令提示符下手动操作来验证您拥有该域名。
- `--preferred-challenges=dns`：指定 Certbot 使用 DNS 验证方式进行证书颁发。这表示您需要将一个特定的 TXT 记录添加到 DNS 进行验证。
- `-d 'example.com'`：指定您想要为其生成 SSL 证书的域名。你可以通过添加多个 `-d` 选项来同时为多个域名生成证书。

请注意，由于 `--manual` 选项需要手动操作，因此它可能比其他选项耗费更多时间。另外，使用 DNS 验证时需要在 DNS 服务商处添加 TXT 记录以实现验证，这在某些情况下可能会比较困难，也需要等待 DNS 缓存刷新。在选择选项时，请根据您的需求和特定情况来作出最合适的选择。

我们可以把 `--manual --preferred-challenges=dns` 替换成`--preferred-challenges http-01`并配置 Nginx 服务器的相应设置，使用 HTTP 验证方式生成证书。

### 生成证书详细流程

以下是使用Let's Encrypt生成证书的详细步骤：

#### 安装Certbot

打开终端并输入以下命令（此示例基于Ubuntu Linux）：

```bash
sudo apt-get update
sudo apt-get install certbot

如果您使用其他操作系统，可以按照此指南 [https://certbot.eff.org/instructions](https://certbot.eff.org/instructions) 找到您的操作系统并按照指示进行操作。
```

#### 生成证书：使用以下命令生成证书

```bash
sudo certbot certonly --email example@qq.com --server https://acme-v02.api.letsencrypt.org/directory --agree-tos --manual --preferred-challenges=dns  -d example.com -d  www.example.com
```

请将 `example@qq.com` 替换为您自己的电子邮件地址，并使用您要生成证书的域名替换 `example.com` 和 `www.example.com`。运行此命令后，Certbot将提示您为该域名添加DNS TXT记录。请使用您的DNS提供商或托管服务提供商的管理面板或API添加记录。Certbot将提示您向DNS添加TXT记录的内容。输入它并等待几分钟以允许记录传播并进行验证。一旦您添加了DNS记录，该命令将在 `/etc/letsencrypt` 目录中生成通配符证书。

#### 配置HTTPS：在生成证书后，使用以下方法之一来配置您的HTTPS

- 对于Apache服务器：
  在您的虚拟主机文件中添加以下行：

```bash
SSLEngine on SSLCertificateFile /etc/letsencrypt/live/example.com/cert.pem 
SSLCertificateKeyFile /etc/letsencrypt/live/example.com/privkey.pem 
SSLCertificateChainFile /etc/letsencrypt/live/example.com/chain.pem
```

- 对于NGINX服务器：
  在您的虚拟主机文件中添加以下行：

```bash
ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem; 
ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;
```

#### **验证设置**

使用SSL测试工具（例如：https://www.ssllabs.com/ssltest/）或浏览器检查证书是否已成功更新为HTTPS

### 自动更新证书

自动更新证书时我们使用HTTP 验证方式生成证书会更方便些。

#### 配置 Nginx

```bash
server {
    listen 80;
    server_name example.com www.example.com;
    root  /home/letsencrypt;
}
```

配置访问http://example.com和 http://www.example.com 域名 80端口(http请求)root目录为`/home/letsencrypt`

#### 配置dns解析

域名http://example.com和 http://www.example.com A记录，指向当前机器Ip

#### 利用http验证方式生成证书生成证书

```bash
sudo certbot certonly   --email hustyjy@qq.com --webroot -w /home/letsencrypt -d example.com -d  www.example.com
```

注意`--webroot -w /home/letsencrypt`,就是告诉certbot用http做域名验证时，在目录`/home/letsencrypt`目录下产生对应文件，然后[certbot](https://www.zhihu.com/search?q=certbot&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra={"sourceType"%3A"answer"%2C"sourceId"%3A3170809888})通过`http://example.com/.well-known/acme-challenge/r4IpkhD-0oD1QGaPWeO6X5_IV8A9WmhfPDWe_ILHhDg`便能访问到对应内容完成验证。

运行完成这条命令后，`/etc/letsencrypt/live/example.com/`就会看到证书文件：

```bash
cert.pem  chain.pem  fullchain.pem  privkey.pem  README
```

#### 配置网站https 访问

```bash
server {
    listen 80;
    server_name example.com www.example.com;
    location ^~  /.well-known/acme-challenge/ {  #后面做自动更新使用
                allow all;
                root  /home/letsencrypt;
            }
    return 301 https://$server_name$request_uri; #http跳转为https
}

server {
        #配置使用证书
        ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem;
        ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;

         # Other SSL settings
        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_prefer_server_ciphers on;
        ssl_ciphers ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:...;
#监听端口80 即当访问服务器的端口是80时，进入这个server块处理
        listen 443 ssl;
        server_name example.com www.example.com;

        root /home/lighthouse/www; #网站真正根目录
}
```

`location ^~ /.well-known/acme-challenge/` 独立配置是用于做自动更新用的

#### 手动更新证书

```bash
sudo certbot renew
如果证书不需要更新，Certbot 不会更改现有证书的任何内容。如果证书即将到期，Certbot 会使用相同的证书和配置文件生成新的证书。如果证书已经过期或者将在 30 天内过期，Certbot 会尝试立即更新证书。
```

#### 自动更新证书

如果想为 SSL 证书设置自动续订，可以设置一个 cron 作业以在证书到期之前自动运行 `certbot renew` 命令。例如：

```bash
0 0 * * 1 /usr/bin/certbot renew >> /var/log/certbot-renew.log
```

## 腾讯20个免费 SSL
