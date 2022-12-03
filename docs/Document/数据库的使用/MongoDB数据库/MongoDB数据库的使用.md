# mongoDB数据库

有关 CRUD（创建、读取、更新、删除）操作的信息， 看：

- [插入文档](https://www.mongodb.com/docs/manual/tutorial/insert-documents/)

- [查询文档](https://www.mongodb.com/docs/manual/tutorial/query-documents/)

- [更新文档](https://www.mongodb.com/docs/manual/tutorial/update-documents/)

- [删除文档](https://www.mongodb.com/docs/manual/tutorial/remove-documents/)

## Node连接MongoDB数据库

### 1.mongodb库连接MongoDB

官网mongodb示例连接文档：[快速入门 — Node.js (mongodb.com)](https://www.mongodb.com/docs/drivers/node/current/quick-start/)

官方文档以mongodb这个库为例：https://github.com/mongodb/node-mongodb-native

npm包地址：[mongodb - npm (npmjs.com)](https://www.npmjs.com/package/mongodb)

mongodb官网文档：[https://mongoosejs.com/](https://mongoosejs.com/)  

中文网文档：[http://www.mongoosejs.net/](http://www.mongoosejs.net/)

菜鸟教程：[Node.js 连接 MongoDB | 菜鸟教程 (runoob.com)](https://www.runoob.com/nodejs/nodejs-mongodb.html)

**操作示例：**

- 安装mongodb库：`npm i mongodb`

- **node使用mongodb库连接上mongodb数据库**

```jsx
const MongoClient = require('mongodb').MongoClient;

// mongoDB数据库的服务地址
const url = 'mongodb://localhost:27017';

// 操作的数据库名称
const mdb = 'stu_db';

// 实例化链接对象
const client = new MongoClient(url);

// 实例对象connect连接数据库
client.connect(function(err) {
  if (err) {
    console.log('数据库连接失败....')
  } else {
    console.log('数据库连接成功....')
    const db = client.db(mdb);
    client.close();
  }
})
```

- **stu_db库(集合)中插入数据**

```jsx
const MongoClient = require('mongodb').MongoClient;

// mongoDB数据库的服务地址
const url = 'mongodb://localhost:27017';

// 操作的数据库名称
const mdb = 'stu_db';

// 实例化链接对象
const client = new MongoClient(url);

// 实现插入数据的方法
function insertDocuments(db, callback) {
 // 获取操作数据库的集合
 const collection = db.collection('stu_db');
 // 通过集合对象来插入文档
 collection.insertMany([
   {name: 'Chris',   age: 24, city: '北京市'},
   {name: 'Wilson',  age: 26, city: '南京市'},
   {name: 'Alan',    age: 22, city: '重庆市'},
   {name: 'Jimmy',   age: 21, city: '杭州市'},
   {name: 'Elvis',   age: 20, city: '长沙市'},
   {name: 'Danny',   age: 18, city: '合肥市'},
  ],function(error, result) {
   if (error) {
    console.log('数据插入失败...')
   } else {
     console.log('数据插入成功...');
     callback(result)
   }
 })
}

// 实例对象connect连接数据库
client.connect(function(err) {
  if (err) {
    console.log('数据库连接失败....')
  } else {
    console.log('数据库连接成功....')
    const db = client.db(mdb);
    // 插入数据 
    insertDocuments(db,(res) => {
      console.log(res);
      client.close();
    })

  }
})
```

![](../img/mongoDB-lj.jpg)

- **stu_db库(集合)中删除数据**

```jsx
const MongoClient = require('mongodb').MongoClient;

// mongoDB数据库的服务地址
const url = 'mongodb://localhost:27017';

// 操作的数据库名称
const mdb = 'stu_db';

// 实例化链接对象
const client = new MongoClient(url);

// 删除数据
function delDocuments(db, callback) {
  const collection = db.collection('stu_db');
  collection.deleteOne({name:'Elvis'}, function(err, result) {
    if(err) {
      console.log('数据删除失败...')
    } else {
      console.log('数据删除成功...')
      callback(result)
    } 
  })
}

// 实例对象connect连接数据库
client.connect(function(err) {
  if (err) {
    console.log('数据库连接失败....')
  } else {
    console.log('数据库连接成功....')
    const db = client.db(mdb);

    // 删除数据
     delDocuments(db, (res) => {
      client.close();
    }) 

  }
})
```

- **stu_db库(集合)中修改数据**

```jsx
const MongoClient = require('mongodb').MongoClient;

// mongoDB数据库的服务地址
const url = 'mongodb://localhost:27017';

// 操作的数据库名称
const mdb = 'stu_db';

// 实例化链接对象
const client = new MongoClient(url);

// 修改数据
function updateDocuments(db, callback) {
  // 获取操作数据库的集合
  const collection = db.collection('stu_db');
  collection.updateMany(
    {name: 'Alan'},
    {
      $set: {
        name: 'Lison'
      }
    },
    function (err, result) {
      if (err) {
        console.log('数据更新失败...')
      } else {
        console.log('数据更新成功...');
        callback(result)
      } 
    }
  )
}

// 实例对象connect连接数据库
client.connect(function(err) {
  if (err) {
    console.log('数据库连接失败....')
  } else {
    console.log('数据库连接成功....')
    // 更新数据
   updateDocuments(db, (res) => {
      console.log(res);
      client.close();
    })

  }
})
```

- **stu_db库(集合)中查询数据**

```jsx
const MongoClient = require('mongodb').MongoClient;

// mongoDB数据库的服务地址
const url = 'mongodb://localhost:27017';

// 操作的数据库名称
const mdb = 'stu_db';

// 实例化链接对象
const client = new MongoClient(url);

// 查询数据
function findDocuments(db, callback) {
  // 获取操作数据库的集合
  const collection = db.collection('stu_db');
  collection.find({age: 20}).toArray(function(err, result){
    if(err) {
      console.log('数据查询失败...')
    } else {
      console.log('数据查询成功...');
      callback(result)
    }
  })
}

// 实例对象connect连接数据库
client.connect(function(err) {
  if (err) {
    console.log('数据库连接失败....')
  } else {
    console.log('数据库连接成功....')
    const db = client.db(mdb);
    // 查询数据
     findDocuments(db, (res) => {
       console.log(res);
       client.close();
    })

  }
})
```

---

### 2.mongoose对象模型工具库连接MongoDB

使用mongoose连接MongoDB数据库-npm包：[mongoose - npm (npmjs.com)](https://www.npmjs.com/package/mongoose)

**抽象模型对应：一层层包含：schema包含model，model包含entitv**

| MongoDB     | MySQL       | Mongoose |
|:-----------:|:-----------:|:--------:|
| database    | database    | database |
| collection  | table       | schema   |
| document    | row         | model    |
| field       | column      | entity   |
| index       | index       | methods  |
| primary key | primary key | statics  |
| 无           | table join  | virtual  |

#### 1、安装 mongoose

```bash
npm install mongoose
```

#### 2、引用

```javascript
const mongoose = require('mongoose');
```

#### 3、创建js文件用于连接MongoDB数据库

```javascript
// 引入mongoose
const mongoose = require('mongoose');
// 定义字符串常量
const uri = "mongodb://localhost:27017/test" // test是数据库名字
// 1.连接数据库
mongoose.connect(uri, { useNewUrlParser:true, useUnifiedTopology:true }) 
// 2.连接成功
mongoose.connection.on('connected', () => {
    console.log('连接成功：', db_url);
})
// 3.连接失败
mongoose.connection.on('error', (err) => {
    console.log('连接错误：', err);
})
// 4.断开连接
mongoose.connection.on('disconnection', () => {
    console.log('断开连接');
})
module.exports = mongoose;
```

#### 实现增删改查操作

#### 1、插入数据

定义UserSchema：设计文档结构

参考教程：[mongoose - npm (npmjs.com)](https://www.npmjs.com/package/mongoose)

```javascript
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const SALT_WORK_FACTOR = 10
const MAX_LOGIN_ATTEMPTS = 5
const LOCK_TIME = 2 * 60 * 60 * 1000
// 
const Schema = mongoose.Schema
// 定义Schema
const UserSchema = new Schema({
  // user admin superAdmin
  role: {
    type: String,
    default: 'user'
  },
  username: String,
  password: String,
  email: String,
  age: Number,
  hashed_password: String,
  loginAttempts: {
    type: Number,
    required: true,
    default: 0
  },
  lockUntil: Number,
  meta: {
    createdAt: {
      type: Date,
      default: Date.now()
    },
    updatedAt: {
      type: Date,
      default: Date.now()
    }
  }
})

// 登录机制保护方法：判断是否到可以登录得时限
UserSchema.virtual('isLocked').get(function () {
  return !!(this.lockUntil && this.lockUntil > Date.now())
})

// .pre保存前的中间件middleware处理事件
UserSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createdAt = this.meta.updatedAt = Date.now()
  } else {
    this.meta.updatedAt = Date.now()
  }

  next()
})

// 密码保存
UserSchema.pre('save', function (next) {
  let user = this
  // 如果没有修改密码
  if (!user.isModified('password')) return next()
  // 重新加密 密码
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err)

    bcrypt.hash(user.password, salt, (error, hash) => {
      if (error) return next(error)

      user.password = hash
      next()
    })
  })
})

// 添加Schema的实例方法
UserSchema.methods = {
  // 密码的比较方法
  comparePassword: function (_password, password) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(_password, password, function (err, isMatch) {
        if (!err) resolve(isMatch)
        else reject(err)
      })
    })
  },
  // 登录机制保护方法：密码错误多少次超限，实现账户锁定
  incLoginAttempts: function (user) {
    const that = this

    return new Promise((resolve, reject) => {
      if (that.lockUntil && that.lockUntil < Date.now()) {
        that.update({
          $set: {
            loginAttempts: 1
          }, 
          $unset: {
            lockUntil: 1
          }
        }, function (err) {
          if (!err) resolve(true)
          else reject(err)
        })
      } else {
        let updates = {
          $inc: {
            loginAttempts: 1
          }
        }

        if (that.loginAttempts + 1 >= MAX_LOGIN_ATTEMPTS && !that.isLocked) {
          updates.$set = {
            lockUntil: Date.now() + LOCK_TIME
          }
        }

        that.update(updates, err => {
          if (!err) resolve(true)
          else reject(err)
        })
      }
    })
  }
}

// 将文档结构发布为模型
const UserModel = mongoose.model('UserModel', UserSchema)
```

其中，mongoose.model 方法就是用来将一个架构发布为 model; 其中：

> 第一个参数：传入一个大写名词单数字符串用来表示你的数据库名称，其中，mongoose会自动将大写名词的字符串生成小写复数的集合名称，例如这里的UserModel最终会变成 usermodels 集合名称。  
> 第二个参数：架构 Schema  
> 返回值：模型构造函数

3）插入数据(Model.save([fn]))：

```javascript
const mongoose = require('mongoose')
const UserModel = mongoose.model('UserModel')

//创建模型
let Model = new UserModel({
    username:'小明',
    password:'123456',
    age:18
})
//2.同模型的sava([fn]),保存模型到数据库中
Model.save((err,res) => {
    if(err){
        console.log('保存失败：',err);
    }else{
        console.log(res);
    }
})
```

打开mongo 数据库，可以看到数据被插入进去（便于后续操作，于是多添加了几条数据）  ![在这里插入图片描述](https://img-blog.csdnimg.cn/bf51b5dcc116419e9d44bdfcdabcf981.png)

#### 2、更新数据

```javascript
Model.updateOne(conditions, doc, [options], [callback])
```

> conditions: 更新的条件，该值是一个对象。  
> doc： 需要更新的内容，该值也是一个对象。  
> options：可选参数，它有如下属性：  
> safe ：（布尔型）安全模式（默认为架构中设置的值（true））  
> upsert ：（boolean）如果不匹配，是否创建文档（false）  
> multi ：（boolean）是否应该更新多个文档（false）  
> runValidators：如果为true，则在此命令上运行更新验证程序。更新验证器根据模型的模式验证更新操作。  
> strict：（布尔）覆盖strict此更新的选项  
> overwrite： （布尔）禁用只更新模式，允许您覆盖文档（false）  
> callback: 回调函数

```javascript
function update(){
     //找到更新的数据
     let  where_str = { 'username' : '小明'};
     //更新后的数据
     let update_str = { 'password' : 'abcdefg'};   
     UserModel.updateOne(where_str,update_str,function(err,res){
        if(err){
            console.log('更新失败：',err);
        }else{
            console.log(res);
        }
    })
}
update() //调用更新函数
```

![在这里插入图片描述](../img/mongoose-update2.png)

密码成功更改！  

第二种更新方法  

2）更新并返回数据：终端返回更新前的所有数据，数据库响应更新后的数据

```javascript
Model.findOneAndUpdate([(conditions, doc, [options], [callback])]
```

> conditions： 第一个参数是一个对象参数，是用于查询与之相匹配的数据用的  
> doc：第二个参数也是一个对象参数，用于修改查询到的数据中的某条信息  
> options：第三个参数也是一个对象参数，主要用于设定匹配数据与更新数据的一些规定，比较复杂，一般用不到  
> callback：第四个参数也就是我们最熟悉的回调函数，函数默认传入两个参数,err、data。当数据库发生错误的时候传回一个err，若数据库正常，err为空；当正常根据第一个参数查询到相关数据并成功修改了我们设定的数据，data返回修改前的数据信息，若根据第一个参数没有查询到相关数据，data为null

```javascript
UserModel.findOneAndUpdate({
        username: '小张'
    },{
        $set: {
            password: 'aaaaaaaaaa'
        }
    },{},function(err,data){
        if(err){
            console.log("更新错误!");
        }
        else if(!data) {
            console.log("未找到数据！");
            console.log(data);
        }
        else if(data) {
            console.log("更新成功!");
            console.log(data);
        }
    })
```

看终端打印结果：为更改前的数据  
![在这里插入图片描述](../img/mongoose-chenggong.png)  
数据库中返回的数据为更改后的密码  
![在这里插入图片描述](https://img-blog.csdnimg.cn/0074cd7915e54305bdbcd0c63568235c.png)

### 3、查询数据

```javascript
//查询所有
UserModel.find(function(err,data){
  if(err){
      console.log(err)
  }else{
      console.log(data)
  }
})
```

![在这里插入图片描述](../img/mongoose-lianjiechenggong.png)

```javascript
//按id查询
UserModel.findById({_id:"61e91a69455a152a1c3dd150"},function(err,data){
    if(err){
        console.log(err)
    }else{
        console.log(data);
    }
})
```

![在这里插入图片描述](../img/mongoose-genx.png)

```javascript
//记录数查询
UserModel.countDocuments(function(err,data){
        if(err){
            console.log(err)
        }else{
            console.log("记录数："+data);
        }
    })
```

![在这里插入图片描述](../img/mongoose-update-console.png)

#### 4、删除数据

```javascript
UserModel.deleteOne({
       username: '小张'
   },{},function(err,data){
       if(err){
           console.log('删除错误!');
       }
       else if(!data) {
           console.log("未找到数据！");
           console.log(data);
       }
       else if(data) {
           console.log("删除成功!");
           console.log(data);
       }
   })
```

![在这里插入图片描述](../img/mongoose-shanchucg.png)  

查看数据库，成功删除小张信息。  

![mongoose-sccg-sjk.png](..\img\mongoose-sccg-sjk.png)
