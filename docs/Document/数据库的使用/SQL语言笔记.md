# SQL 语言笔记

76 条 SQL 语言完全兼容 4 种数据库

- MySQL
- Oracle
- SQL Server
- PostgreSQL

## 数据库客户端

- MySQL 字符客户端 mysql
- Oracle 字符客户端 sqlplus
- SQL Server 图形客户端 ADS(Azure Data Studio)
- PostgreSQL 字符客户端 psql

## 教程

https://www.w3school.com.cn/sql/sql_syntax.asp

https://www.runoob.com/sql/sql-tutorial.html

## SQL 语句

### 基本命令

```sql
登录数据库
	[root@host]# mysql -u root -p
Enter password:******  # 登录后进入终端

使用 mysqladmin 创建数据库
	[root@host]# mysqladmin -u root -p create SXT
Enter password:******

创建数据库
	CREATE DATABASE 数据库名;

删除数据库
	drop database <数据库名>;

创建数据表
	CREATE TABLE table_name (column_name column_type);
	CREATE TABLE IF NOT EXISTS `sxt_tbl`(
   `sxt_id` INT UNSIGNED AUTO_INCREMENT,
   `sxt_title` VARCHAR(100) NOT NULL,
   `sxt_author` VARCHAR(40) NOT NULL,
   `submission_date` DATE,
   PRIMARY KEY ( `sxt_id` )
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

删除数据表
	DROP TABLE table_name ;

选择数据库
	use SXT;

数据类型
	数值类型
	日期和时间类型
	字符串类型
```

### 条件

select \* from 表名 where 条件;

#### 比较运算符

| 比较运算符 |    值    |
| :--------: | :------: |
|     =      |   等于   |
|     >      |   大于   |
|     >=     | 大于等于 |
|     <      |   小于   |
|     <=     | 小于等于 |
|   !=或<>   |  不等于  |

示例

```bash
查询编号大于3的学生
	select * from students where id>3;

查询编号不大于4的科目
	select * from subjects where id<=4;

查询姓名不是“黄蓉”的学生
	select * from students where sname!='黄蓉';

查询没被删除的学生
	select * from students where isdelete=0;
```

#### 逻辑运算符

| 逻辑运算符 | 值  |
| :--------: | :-: |
|    and     |     |
|     or     |     |
|    not     |     |

示例

```sql
查询编号大于3的女同学
	select * from students where id>3 and gender=0;
查询编号小于4或没被删除的学生
	select * from students where id<4 or isdelete=0;
```

#### 模糊查询

| 模糊查询 |          值          |
| :------: | :------------------: |
|   like   |                      |
|    %     | 表示任意多个任意字符 |
|    \_    |   表示一个任意字符   |

示例

```sql
查询姓黄的学生
	select * from students where sname like '黄%';
查询姓黄并且名字是一个字的学生
	select * from students where sname like '黄_';
查询姓黄或叫靖的学生
	select * from students where sname like '黄%' or sname like '%靖%';
```

#### 范围查询

in：表示在一个非连续的范围内

示例：查询编号是 1 或 3 或 8 的学生

```sql
select * from students where id in(1,3,8);
```

between ... and ...：表示在一个连续的范围内

示例 1：查询学生是 3 至 8 的学生

```sql
select * from students where id between 3 and 8;
```

示例 2：查询学生是 3 至 8 的男生

```sql
select * from students where id between 3 and 8 and gender=1;
```

#### 空判断

注意：null 与''是不同的

is null：判断是否为空

查询没有填写地址的学生

```sql
select * from students where hometown is null;
```

is not null：判断不为空

查询填写了地址的学生

```sql
select * from students where hometown is not null;
```

查询填写了地址的女生

```sql
select * from students where hometown is not null and gender=0;
```

#### 优先级

- 小括号，not，比较运算符，逻辑运算符
- and 比 or 先运算，如果同时出现并希望先算 or，需要结合()使用

### 排序

语法

```sql
select * from 表名
order by 列1 asc|desc,列2 asc|desc,...
```

语法：

将行数据按照列 1 进行排序，如果某些行列 1 的值相同时，则按照列 2 排序，以此类推

默认按照列值从小到大排列

```sql
asc：从小到大排列，即升序
desc：从大到小排序，即降序
```

示例

查询未删除男生学生信息，按学号降序

```sql
select * from students
where gender=1 and isdelete=0
order by id desc;
```

查询未删除科目信息，按名称升序

```sql
select * from subject
where isdelete=0
order by stitle;
```

### 聚合

为了快速得到统计数据，提供了 5 个聚合函数

#### count(\*)

表示计算总行数，括号中写星与列名，结果是相同的

查询学生总数

```sql
select count(*) from students;
```

#### max(列)

表示求此列的最大值

查询女生的编号最大值

```sql
select max(id) from students where gender=0;
```

#### min(列)

表示求此列的最小值

查询未删除的学生最小编号

```sql
select min(id) from students where isdelete=0;
```

#### sum(列)

表示求此列的和

查询男生的编号之后

```sql
select sum(id) from students where gender=1;
```

#### avg(列)

表示求此列的平均值

查询未删除女生的编号平均值

```sql
select avg(id) from students where isdelete=0 and gender=0;
```

### 分组

- 按照字段分组，表示此字段相同的数据会被放到一个组中
- 分组后，只能查询出相同的数据列，对于有差异的数据列无法出现在结果集中
- 可以对分组后的数据进行统计，做聚合运算

#### 基本语法

```sql
select 列1,列2,聚合... from 表名 group by 列1,列2,列3...
```

#### 例子

##### 查询男女生总数

```sql
select gender as 性别,count(*)
from students
group by gender;
```

##### 查询各城市人数

```sql
select hometown as 家乡,count(*)
from students
group by hometown;
```

#### 分组后的数据筛选

```sql
select 列1,列2,聚合... from 表名
group by 列1,列2,列3...
having 列1,...聚合...
```

##### having 后面的条件运算符与 where 的相同

查询男生总人数

```sql
方案一
select count(*)
from students
where gender=1;
-----------------------------------
方案二：
select gender as 性别,count(*)
from students
group by gender
having gender=1;
```

#### 对比 where 与 having

where 是对 from 后面指定的表进行数据筛选，属于对原始数据的筛选

having 是对 group by 的结果进行筛选

### 分页

获取部分行

- 从 start 开始，获取 count 条数据
- start 索引从 0 开始

```sql
select * from 表名
limit start,count
```

题目和答案

```bash
已知：每页显示m条数据，当前显示第n页

求总页数：此段逻辑后面会在python中实现

查询总条数p1
使用p1除以m得到p2
如果整除则p2为总数页
如果不整除则p2+1为总页数
求第n页的数据
```

sql

```sql
select * from students
where isdelete=0
limit (n-1)*m,m
```

### 范式与关系

### 链表查询

### 自关联查询和子查询
