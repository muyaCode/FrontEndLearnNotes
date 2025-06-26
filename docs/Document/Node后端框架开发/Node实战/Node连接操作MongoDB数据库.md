# Node连接操作MongoDB数据库

## 文档教程

- https://www.runoob.com/mongodb/mongodb-tutorial.html

- https://www.mongodb.org.cn/manual/

- https://docs.mongoing.com/

## 1.安装驱动

```bash
npm install mongodb
```

## 2.创建数据库

MongoDB 会自动创建数据库和集合

### 1.创建连接

```js
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/laochen";
 
MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
  if (err) throw err;
  console.log("数据库已创建!");
  db.close();
});
```

useNewUrlParser是使用最新的url解析器，避免mongo报警告错误。

### 2.创建集合

使用 createCollection() 方法来创建集合

```js
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/';
MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
    if (err) throw err;
    console.log('数据库已创建');
    var dbase = db.db("laochen");
    dbase.createCollection('site', function (err, res) {
        if (err) throw err;
        console.log("创建集合!");
        db.close();
    });
});
```



## 3.数据库操作( CURD )

### 插入数据

#### 插入一条数据

使用 insertOne()：

```js
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
 
MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("laochen");
    var myobj = { name: "老陈",type: "帅",like:['唱','跳','开车','搞代码'] };
    dbo.collection("user").insertOne(myobj, function(err, res) {
        if (err) throw err;
        console.log("文档插入成功");
        db.close();
    });
});
```

#### 插入多条数据

使用 insertMany()：

```js
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
 
MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("user");
    var myobj =  [
        { name: "老陈",type: "帅",like:['唱'，'跳','开车','搞代码']},
        { name: "吴亦凡",type: "帅",like:['唱'，'跳','大碗面']},
        { name: "肖战",type: "帅",like:['唱'，'跳','爱粉丝']},
       ];
    dbo.collection("user").insertMany(myobj, function(err, res) {
        if (err) throw err;
        console.log("插入的文档数量为: " + res.insertedCount);
        db.close();
    });
});
```

### 查询数据

可以使用 find() 来查找数据，find() 可以返回匹配条件的所有数据。 如果未指定条件，find() 返回集合中的所有数据。

##### 查询所有数据

```js
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
 
MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("laochen");
    dbo.collection("user"). find({}).toArray(function(err, result) { // 返回集合中所有数据
        if (err) throw err;
        console.log(result);
        db.close();
    });
});
```



##### 查询指定条件的数据

```js
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
 
MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("laochen");
     var whereStr = {"name":'老陈'};  // 查询条件
    dbo.collection("user").find(whereStr).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        db.close();
    });
});
```



##### 查询分页

要设置指定的返回条数可以使用 **limit()** 方法，该方法只接受一个参数，指定了返回的条数

limit()：读取两条数据

```js
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
 
MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("runoob");
    dbo.collection("site").find().limit(2).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        db.close();
  });
});
```



##### 要指定跳过的条数

使用 skip() 方法

```js
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
 
MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("laochen");
    dbo.collection("user").find().skip(2).limit(2).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        db.close();
  });
});
```



### 更新数据

#### 更新一条数据

```js
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
 
MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("laochen");
    var whereStr = {"name":'老陈'};  // 查询条件
    var updateStr = {$set: { "type" : '小胖' }};
    dbo.collection("user").updateOne(whereStr, updateStr, function(err, res) {
        if (err) throw err;
        console.log("文档更新成功");
        db.close();
    });
});
```



#### 更新多条数据

使用 updateMany()：

```js
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
 
MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    ar dbo = db.db("laochen");
    var whereStr = {"name":'老陈'};  // 查询条件
    var updateStr = {$set: { "type" : '胸怀天下' }};;
    dbo.collection("user").updateMany(whereStr, updateStr, function(err, res) {
        if (err) throw err;
         console.log(res.result.nModified + " 条文档被更新");
        db.close();
    });
});
```

### 删除数据

#### 删除一条数据

使用deleteOne()方法

```js
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
 
MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("laochen");
    var whereStr = {"name":'吴亦凡'};  // 查询条件
    dbo.collection("user").deleteOne(whereStr, function(err, obj) {
        if (err) throw err;
        console.log("文档删除成功");
        db.close();
    });
});
```

#### 删除多条语句

使用 deleteMany() 方法

```js
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
 
MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("laochen");
    var whereStr = { type: "en" };  // 查询条件
    dbo.collection("site").deleteMany(whereStr, function(err, obj) {
        if (err) throw err;
        console.log(obj.result.n + " 条文档被删除");
        db.close();
    });
});
```

### 排序

排序 使用 sort() 方法，该方法接受一个参数，规定是升序(1)还是降序(-1)

```js
{ type: 1 }  // 按 type 字段升序
{ type: -1 } // 按 type 字段降序
```





```js
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
 
MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("runoob");
    var mysort = { type: 1 };
    dbo.collection("site").find().sort(mysort).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        db.close();
    });
});
```



### 连接集合

使用  $lookup 来实现左连接

有两个集合数据分别为：

集合1：orders

```js
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

let obj = { _id: 1, product_id: 154, status: 1 }
MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("laochen");
    dbo.collection("orders").insertOne(obj, function(err, res) {
        if (err) throw err;
        console.log("文档插入成功");
        db.close();
    });
});
```

集合2：products

```js
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
 
MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("user");
    var myobj =  [
      { _id: 154, name: '笔记本电脑' },
      { _id: 155, name: '耳机' },
      { _id: 156, name: '台式电脑' }
    ];
    dbo.collection("products").insertMany(myobj, function(err, res) {
        if (err) throw err;
        console.log("插入的文档数量为: " + res.insertedCount);
        db.close();
    });
});
```

$lookup 实现左连接

```js
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017/";
 
MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
  if (err) throw err;
  var dbo = db.db("runoob");
  dbo.collection('orders').aggregate([
    { $lookup:
       {
         from: 'products',            // 右集合
         localField: 'product_id',    // 左集合 join 字段
         foreignField: '_id',         // 右集合 join 字段
         as: 'orderdetails'           // 新生成字段（类型array）
       }
     }
    ]).toArray(function(err, res) {
    if (err) throw err;
    console.log(JSON.stringify(res));
    db.close();
  });
});
```

### 删除集合

使用  drop()  方法来删除集合：

```js
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
 
MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("laochen");
    // 删除 test 集合
    dbo.collection("user").drop(function(err, delOK) {  // 执行成功 delOK 返回 true，否则返回 false
        if (err) throw err;
        if (delOK) console.log("集合已删除");
        db.close();
    });
});
```

