# MySQL版本介绍

MySQL的版本说明

**MySQL Community Server 社区版本**，开源免费，但不提供官方技术支持。

**MySQL Enterprise Edition 企业版本**，需付费，可以试用30天。

**MySQL Cluster 集群版**，开源免费。可将几个MySQL Server封装成一个Server。

**MySQL Cluster CGE 高级集群版**，需付费。

MySQL Workbench(GUI TOOL)一款专为MySQL设计的ER/数据库建模工具。它是著名的数据库设计工具DBDesigner4的继任者。MySQL Workbench又分为两个版本，分别是社区版（MySQL Workbench OSS）、商用版（MySQL Workbench SE）。

**MySQL Community Server** 是开源免费的，这也是我们通常用的MySQL的版本。根据不同的操作系统平台细分为多个版本

**MySQL Community Server**说明：

选择Generally Available（GA）Release 去下载。

寻找GA5.7版本：[Looking for previous GA versions?](https://dev.mysql.com/downloads/mysql/5.7.html)

GA 是指软件的通用版本，一般指正式发布的版本。

“essentials” 是指精简版，不包含 embedded server and benchmark suite，有自动安装程序和配置向导，没有MySQL文档。

“noinstall” 是指非安装的压缩包的。包含 embedded server and benchmark suite，没有自动安装程序和配置向导，需手动安装配置，有MySQL文档。

mysql-essential-5.1.60-win32.msi 是精简版，如果只需要mysql服务，就选择此版本。

mysql-5.1.60-win32.msi 是完整版，包含安装程序和配置向导，有MySQL文档。

mysql-noinstall-5.1.60-win32.zip 是非安装的zip压缩包，没有自动安装程序和配置向导，需手动安装配置，有MySQL文档。

mysql-5.1.60.zip 是用于windows的Mysql源码压缩包

带 "winx64" 的则是对应的64位版本，在64位操作系统下使用。

一般做后台开发，我们就下载mysql-essential-5.1.60-win32.msi 即可

## MySQL社区版安装哪个版本好用，最稳定

一般来说，稳定的版本就好，但是大版本也必须选择市面上稳定运行的通用版本，比如mysql5.6 5.7版本，因为这样你可以获取到最新的特性而不会落伍，学习他们在一段时间内可以保持领先。

mysql是非常好用的互联网数据库，但是由于很多时候都是收到oracle的影响，现在很多企业转到自己开发mysql，因为源代码是开放的，因此，还有的人就转向另一个mysql衍生版本，叫做mariadb，使用起来跟mysql几乎一模一样，但是完全免费不要钱，建议你也使用这个版本。

另外，他使用起来是用区分32位和64位的，如果你的操作系统是64位的，现在很多电脑都是64位版本的了，建议你也使用64位版本的。

**MySQL各版本的比较：**

mysql5.7 : 2015年发布，mysql5.7查询性能得以大幅提升，比 MySQL 5.6 提升 1 倍降低了建立数据库连接的时间。

mysql5.6 : 2013年2月发布，mysql5.6版本其中InnoDB可以限制大量表打开的时候内存占用过多的问题InnoDB性能加强。如大内存优化等InnoDB死锁信息可以记录到 error 日志，方便分析InnoDB提供全文索引能力。

mysql5.5 : 2010年12月发布mysql5.5版本默认存储引擎更改为InnoDB 多个回滚段（Multiple Rollback Segments）,之前的innodb版本最大能处理1023个并发处理操作，现在mysql5.5可以处理高达128K的并发事物 改善事务处理中的元数据锁定。例如，事物中一个语句需要锁一个表，会在事物结束时释放这个表，而不是像以前在语句结束时释放表。 增加了INFORMATION_SCHEMA[?ski:m?]]表，新的表提供了与InnoDB压缩和事务处理锁定有关的具体信息。

mysql5.1 : 20o8年发布的MySQL 5.1 的版本，基本上就是一个增加了崩溃恢复功能的MyISAM，使用表级锁，但可以做到读写不冲突，即在进行任何类型的更新操作的同时都可以进行读操作，但多个写操作不能并发。

mysql-5.0 : mysql-5.0版本之前，myisam默认支持的表大小为4G。从mysql-5.0以后，myisam默认支持256T的表单数据。myisam只缓存索引数据。 2005年的5.0版本又添加了存储过程、服务端游标、触发器、查询优化以及分布式事务功能

mysql-4.1 : 2002年发布的4.0 Beta版，至此MySQL终于蜕变成一个成熟的关系型数据库系统。 2002年mysql4.1版本增加了子查询的支持，字符集增加UTF-8，GROUP BY语句增加了ROLLUP，MySQL.user表采用了更好的加密算法。支持每个innodb引擎的表单独放到一个表空间里。innodb通过使用MVCC(多版本并发控制)来获取高并发性，并且实现sql标准的4种隔离级别，同时使用一种被称成next-key locking的策略来避免幻读(phantom)现象。除此之外innodb引擎还提供了插入缓存(insert buffer)、二次写(double write)、自适应哈西索引(adaptive hash index)、预读(read ahead)等高性能技术。

mysql5.7的兼容性强，5.7之后就说8.0版本了，现在一直用的是5.7的，推荐8.0的

mysql使用5.x系列的比较稳定

受服务器内存建议：

如果服务器内存大于16G，可直接选择MySQL8.0版本。

**MySQL数据库版本建议：**

CPU/内存数据库

1H/512M MySQL5.1

1H/1G MySQL5.1/5.5

2H/2G MySQL5.1/5.5

2H/4G MySQL5.5/5.6

4H/4G+MySQL5.5/5.6/5.7
