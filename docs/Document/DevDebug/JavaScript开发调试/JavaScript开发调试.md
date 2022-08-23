# JavaScript开发调试指导

### 项目本地以 Debug 模式启动


### console.log() 代码打印调试

console.log
Console作为 JS 中的一个原生对象，为我们提供了在浏览器控制台进行调试的能力。百分百的前端人都知道console.log()语句，但通过本文的介绍会发现，console.log()真的是一个最熟悉的陌生'人'。
常规用法
console.log()是最为常用的打印输出方法，其可以接收任意类型的内容并输出：

```javascript
console. log('1', 1, true, null, undefined, Symbol, {a:1}, [1], new Set(), new Date)
```

冷门用法
除了常规用法外，console.log()还可以利用以下通配符发挥特殊作用：


%c：用于添加样式。
可以把输出的语句看做是一个节点，常见的color、font、padding等 css 属性都可以使用。具体用法是在需要添加样式的字符串前加入%c匹配符，紧接着的第二个参数用于定义样式。请看以下示例：
```javascript
console.log("1231 %c这是你没有见过的console.log", "color: #fff; border-radius: 5px; padding: 10px 25px;background: linear-gradient(315deg, #1fd1f9 0%, #b621fe 74%)",'1231');
```



%o or %O：用于以对象格式打印。
在字符串中加入%o 或者 %O，可以将字符串后紧接着的对象插入到字符串中。请看示例：
```javascript
console.log('一串%o字符', $0);
```

另外呢，%o 和%O也有一定的差别，%O的作用更像console.dir:
```javascript
console.log('一串%o字符', $0);
console.log('一串%O字符', $0);
```



%d or %i：用于将数字输出为整数。
%d or %i可以将其之后紧随的字符作为整数输出，类似于toFixed(0)：
```javascript
console.log('输出为整数%i',1.99)
```

转换类数字的字符串也是可以的：
```javascript
console.log('输出为整数%i','1.99')
```

其余的转换逻辑其实与 js 是一样的：
```javascript
console.log('输出为整数%i','aa1.99')
```



%s：用于打印字符串。
%s可以将其之后紧随的任意类型的值作为字符串输出，类似于 js 中的字符串拼接：
```javascript
console.log('类似于字符串拼接%s',123)
console.log('类似于字符串拼接%s',[1,2,3])
console.log('类似于字符串拼接%s',null)
console.log('类似于字符串拼接%s',{})
```



%f：用于格式化打印浮点数。
%f可以将其之后紧随的任意类型的值作为浮点数输出，可以通过%.2f这样的形式来指定需要格式化的位数：
``` javascript
console.log("浮点数格式化 %f", 1)
console.log("浮点数格式化 %.3f", 1.232323)
```

值得注意的是，该语法在chrome及edge中并不会生效。


其他：
从206个console.log()完全弄懂数据类型转换的前世今生(下)：
5分钟教你使用 console.log 输出五彩斑斓的黑：https://juejin.cn/post/7087192401978064933
你应该会的前端Debug技能：https://juejin.cn/post/7084924971901779998