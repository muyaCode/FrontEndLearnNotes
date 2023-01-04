# JavaScript面试题

function的考题：

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>function案例</title>
    </head>
    <body></body>
    <script>
        function Foo() {
            getName = function () {
                console.log(1);
            };
            // 不实例化Foo，直接执行：指向 window
            // 实例化Foo，再执行：
            return this;
        }

        // 给函数Foo添加静态属性方法 =》 函数对象上的方法
        Foo.getName = function () {
            console.log(2);
        };

        // 给构造函数的原型添加方法：下面两种方法执行
        // var foo = new Foo() => foo.getName
        // new Foo().getName
        Foo.prototype.getName = function () {
            console.log(3);
        };

        // 给变量赋值方法
        var getName = function () {
            console.log(4);
        };

        // 定义getName函数方法
        function getName() {
            console.log(5);
        }

        // 打印2 => 直接给函数的静态属性方法
        Foo.getName();
        // 打印4 =》 优先执行function语句式的函数方法getName，再执行变量getName的属性方法，后面执行会覆盖前面执行的所以打印4
        getName();
        // 打印1 =》 值执行Foo()函数，getName变量在Foo()函数内重新被赋值，return的 this 指向 window，所以执行window.getName方法，也就是执行Foo()的getName静态属性方法
        // Foo() -> this -> window -> window.getName -> window.getName变量在Foo()函数内重新被赋值，所以打印1
        Foo().getName(); // 打印1
        // 打印1 =》 上面Foo()的getName静态属性被赋值了新方法，所以跟着打印1
        getName();
        // 打印2 =》 new Foo没有()，所以new无用（不是实例化方法），只是执行Foo.getName属性方法，所以打印2
        new Foo.getName();
        // 打印3 =》 执行的是实例化后的构造函数Foo的prototype原型的实例方法 -> Foo.prototype.getName()
        new Foo().getName();
        // 打印3 =》
        // 先执行第二个new之后相当于：var foo = new Foo();foo.getName() -> Foo.prototype.getName()
        // 再执行第一个new：new的是Foo.prototype.getName()，new Foo.prototype.getName()，无返回值，没有实际作用
        new new Foo().getName();
    </script>
</html>
```

11：

```

```
