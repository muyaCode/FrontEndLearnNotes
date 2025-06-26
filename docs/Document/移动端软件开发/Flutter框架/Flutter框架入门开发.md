# Flutter 框架入门开发

## 参考开发

文档：

- <https://itsallwidgets.com/>
- <https://flutterawesome.com/>
- <https://startflutter.com/>

中文官网：<https://flutter.cn/>

## 项目工程文件结构详解

🟠android：存放 android 平台相关代码

🟡ios：存放 ios 平台相关代码

🟢lib：flutter 代码，即 dart 文件（我们编写的代码存放位置）

🔵test：存放测试代码

🟣pubspec.yaml：配置文件，存放一些第三方的依赖资源

我们在学习 flutter 入门，其实也可以不用管前两个，我们重点放在 lib 文件夹和 pubspec.yaml 文件，也就是存放我们代码编辑的位置。

## Flutter 命令行

- flutter

  - 查看后面可以接什么命令

- flutter doctor

  - 查看需要安装的依赖

- flutter create demo1

  - 创建项目

- flutter -v

  - 查看当前版本

- flutter version

  - 查看所有版本

- flutter analyze

  - 分析项目的 Dart 代码。

- flutter run -v

  - 编译运行

- flutter run

  - 运行你的 Flutter 应用程序

- flutter stop

  - 停止在附加设备上的 Flutter 应用

- flutter test

  - 对当前项目的 Flutter 单元测试

- flutter trace

  - 开始并停止跟踪运行的 Flutter 应用程序

- flutter upgrade

  - 升级你的 Flutter 副本

- flutter build

  - Flutter 构建命令。

- flutter channel

  - 列表或开关 Flutter 通道

- flutter clean

  - 删除构建/目录

- flutter config

  - 配置 Flutter 设置

- flutter devices

  - 列出所有连接的设备

- flutter drive

  - 为当前项目运行 Flutter 驱动程序测试

- flutter format

  - 格式一个或多个 Dart 文件

- flutter fuchsia_reload

  - 在 Fuchsia 上进行热重载

- flutter install

  - 在附加设备上安装 Flutter 应用程序

- flutter logs

  - 显示用于运行 Flutter 应用程序的日志输出

- flutter packages

  - 命令用于管理 Flutter 包

- flutter precache

  - 填充了 Flutter 工具的二进制工件缓存

- flutter screenshot
  - 从一个连接的设备截图

## Flutter 模拟器操作

### 模拟器操作

运行项目

```bash
flutter run
```

模拟器列表

```bash
flutter emulators
```

启动模拟器,只有启动模拟器才可以运行模拟器

```bash
flutter emulators --launch <emulator id>
```

例如未启动模拟器列表:

```bash
Nexus_5X_API_28 • Nexus 5X • Google • Nexus 5X API 28

apple_ios_simulator • iOS Simulator • Apple
```

启动安卓模拟器

```bash
flutter emulators --launch Nexus_5X_API_28
```

运行所有模拟器

```bash
flutter run -d all
```

运行指定模拟器

```bash
flutter run -d <deviceid>
```

例如模拟器列表:

```bash
Android SDK built for x86 • emulator-5554 • android-x86 • Android 9 (API 28) (emulator)
```

2

```bash
xxx的 iPhone • 00008020-001838491169002E • ios • iOS 12.2
```

运行安卓模拟器

```bash
flutter run -d emulator-5554
```

运行 IOS 真机

```bash
flutter run -d 00008020-001838491169002E
```

运行所有模拟器

```bash
flutter run -d all
```

### 运行模拟器过程中命令

- 热更新刷新

  - r

- 热重启刷新

  - R

- 退出运行模拟器 app

  - q

- 切换模拟器系统的效果 (安卓和苹果系统)
  - o

## Flutter 运行调试

### 断点调试

在 Flutter 进行断点调试非常简单，只需要在 Vscode 上打上一个断点，按 F5 就会停在断点处。通过左边的调试栏，观察断点处的变量以及栈堆情况。

### debugger 调试

使用 debugger API 的方式

```dart
import 'dart:developer';

void someFunction(double offset) {
    debugger(when: offset > 30.0, message: 'offset 大于 30 时，中断');
    // ...
}
```

debugger 代码只会在开发阶段运行

### rendering 调试

rendering 即开启布局线，当打开 rendering 时，会在界面上看到一些布局线，以便于修复布局效果。

```dart
import 'package:flutter/rendering.dart';

void main() {
    debugPaintSizeEnabled = !true;
    runApp(new MyApp());
}
```

效果

### 日志调试

直接使用 print 输出内容即可，在 AS、Vscode 里的控制台/调试控制台都可以看到。

为了方便，定义一个 Debug 类。

```dart
class Debug {
    static log(String tag, String text) {
        print('[$tag] $text');
    }
    static info(String tag, String text) {
        print('[$tag] $text');
    }
    static success(String tag, String text) {
        print('[$tag] $text');
    }
    static error(String tag, String text) {
        print('[$tag] $text');
    }
}
```

### 运行状态调试

在使用命令：flutter run 时，会有一个 Observatory URL 地址提供（一般为：http://127.0.0.1:8108/），那就是运行状态调试，打开之后可以看到应用的 GC、VM 方面的信息。注意，如果使用 F5 启动，则没有这个功能。

效果

### 真机调试

开启真机调试的步骤：

- 1.打开 开发者选项 还有 USB 调试。

- 2.使用 USB 将手机连接电脑，若手机出现提示，授权电脑访问手机。

- 3.在命令执行 flutter devices 确认连接电脑的设备。

- 4.然后可通过执行 flutter run 运行我们的 app。

- 5.在手机上开启 USB 调试模式。

Android Studio 切换单独运行 android 目录 的项目

## 项目目录结构

- .dart_tool

  - 记录了一些 dart 工具库所在的位置和信息

- .idea

  - android studio 是基于 idea 开发的，.idea 记录了项目的一些文件的变更记录

- android

  - android 项目需要打包上架的时候，也需要使用此文件夹里面的文件。同样的如果我们需要原生代码的支持，原生代码也是放在这里

- ios

  - 包含了 iOS 项目相关的配置和文件，当我们的项目需要打包上线的时候，需要打开该文件内的 Runner.xcworkspace 文件进行编译和打包工作

- lib

  - 日常开发的 dart 语言代码都放在这里，可以说是我们的“核心工作文件夹”

- test

  - 存放在项目开发过程中的测试代码，良好的测试习惯是保证代码质量的必要手段，希望大家在 test 文件里写更多的代码

- .gitignore

  - git 忽略配置文件

- .metadata

  - IDE 用来记录某个 Flutter 项目属性的的隐藏文件

- .packages

  - pub 工具需要使用的，包含 package 依赖的 yaml 格式的文件

- flutter_app.iml

  - 工程文件的本地路径配置

- pubspec.lock

  - 当前项目依赖所生成的文件

- pubspec.yaml

  - 当前项目的一些配置文件，包括依赖的第三方库、图片资源文件等

- README.md
  - 自述项目信息(html 标签)

## 运行别人的项目

### 清理

- flutter clean

### 下载包

- flutter pub cache repair

- flutter packages get

- flutter pub get

- flutter packages upgrade

### 重新生成命令生成缺失的自动生成的文件

- flutter create .

### 报错“Invalid plugin specification. Invalid “macos” plugin specification.”

更新 Flutter SDK

- flutter upgrade

### gradle 版本

\android\gradle\wrapper\gradle-wrapper.properties 里面的 distributionUrl 值

- `distributionUrl=https\://services.gradle.org/distributions/gradle-4.10.2-all.zip `//这里就是你本地的版本

\android\build.gradle 里面的 如： `dependencies {    classpath 'com.android.tools.build:gradle:3.2.1' //填写本地版本号 }`

- 通过 flutter packages get 命令下载所有依赖的插件

## Flutter 组件

### main.dart 程序入口文件

```dart
// 程序入口
void main() => runApp(
  // 搭建App结构主题
  MaterialApp(
    // app脚手架搭建结构
    home:Scaffold(
      body:
    )
  )
)
```

### 字体设置

- ios 项目

  - 项目中引入 ttf 文件 ，并在 info.plist 中设置引用

- Android 项目

  - 创建一个 Font 资源文件，并将其传递到 TextView 的 FontFamily 参数中

- Flutter 项目
  - 在文件夹中放置字体文件，并在 pubspec.yaml 中引用

### 组件文档

- https://flutterchina.club/widgets/basics/

- http://laomengit.com/guide/widgets/Button.html

### 组件分类

#### 无状态组件 StatelessWidget

作用

- 复用组件

自定义木偶组件

```dart
class MyApp extends StatelessWidget{
  @override
  widget build(BuildContext context){
    return Container();
  }
}
```

#### 有状态组件 StatefullWidget

作用：数据、逻辑处理

自定义组件

```dart
class MyHomePage extends StatefulWidget {
  MyHomePage({Key? key, required this.title}) : super(key: key);
  final String title;

  @override
  _MyHomePageState createState() => _MyHomePageState();
}
```

### 布局组件

#### Container 容器组件

Container 组件是最常用的布局组件之一，可以认为它是 web 开发中的 div，rn 开发中的 View。其往往可以用来控制大小、背景颜色、边框、阴影、内外边距和内容排列方式等

- width: 宽

  - 宽

  - 值
    - 300

- height: 高

  - 高

  - 值
    - 300

- color: 颜色

  - 颜色

  - 值

    - Colors.red

    - Color(0xFFFF0000)

- margin: 外边距

  - 外边距

  - 值

    - 四个方向

      - EdgeInsets.all(100)

    - 单个方向

      - EdgeInsets.only(left:100,top:100,right:100,bottom:100)

    - 水平和垂直

      - EdgeInsets.symmetric(horizontal: 20,vertical: 20)

    - 顺序方向设置值
      - EdgeInsets.fromLTRB(100, 100, 100, 200)

- padding: 内边距

  - 内边距

  - 值

    - 四个方向

      - EdgeInsets.all(100)

    - 单个方向

      - EdgeInsets.only(left:100,top:100,right:100,bottom:100)

    - 水平和垂直

      - EdgeInsets.symmetric(horizontal: 20,vertical: 20)

    - 顺序方向设置值
      - EdgeInsets.fromLTRB(100, 100, 100, 200)

- alingnment: 子容器对齐父容器

  - 值

    - Alignment.topLeft: 左上

    - Alignment.topCenter: 上中

    - Alignment.topRight: 右上

    - Alignment.centerLeft: 左中

    - Alignment.center: 居中

    - Alignment.centerRight: 右中

    - Alignment.bottomLeft: 左下

    - Alignment.bottomCenter: 下中

    - Alignment.bottomRight: 右下

- BoxConstraints 限制容器的宽高

  - 值

    - minWidth

    - maxWidth

    - minHeight

    - maxHeight

  - 例子

    ```dart
    // 容器的大小将被限制在[100*100 ~ 200*200]内
    BoxConstraints(
      minWidth: 100,
      maxWidth: 200,
      minHeight: 100,
      maxHeight: 200,
    )
    ```

- decoration: 装饰

  - 边框 border

    - Border.all()

      - 四个边框

    - Border(top:BorderSide(color:value,width:1,style:BorderStyle.solid),)

      - 顶部颜色、宽、边框样式实线

    - 代码例子

      - ```dart
        // 同时设置4条边框：1px粗细的黑色实线边框
        BoxDecoration(
          border: Border.all(color: Colors.black, width: 1, style: BorderStyle.solid)
        )

        // 设置单边框：上边框为1px粗细的黑色实线边框，右边框为1px粗细的红色实线边框
        BoxDecoration(
          border: Border(
            top: BorderSide(color: Colors.black, width: 1, style: BorderStyle.solid),
            right: BorderSide(color: Colors.red, width: 1, style: BorderStyle.solid),
          ),
        )
        ```

  - 阴影 boxShadow

    - 可以指定 x，y，blur，spread，color 等属性

    - ```dart
      BoxDecoration(
        boxShadow: [
          BoxShadow(
            offset: Offset(0, 0),
            blurRadius: 6,
            spreadRadius: 10,
            color: Color.fromARGB(20, 0, 0, 0),
          ),
        ],
      )
      ```

    -

  - 渐变 gradient

    - 三种渐变

      - LinearGradient：线性渐变

        - ```dart
          // 从左到右，红色到蓝色的线性渐变
          BoxDecoration(
            gradient: LinearGradient(
              begin: Alignment.centerLeft,
              end: Alignment.centerRight,
              colors: [Colors.red, Colors.blue],
            ),
          )
          ```

        -

      - RadialGradient：放射状渐变

        - ```dart
          // 从中心向四周扩散，红色到蓝色的径向渐变
          BoxDecoration(
            gradient: RadialGradient(
              center: Alignment.center,
              colors: [Colors.red, Colors.blue],
            ),
          )
          ```

      - SweepGradient：扇形渐变

```dart
  BoxDecoration(
    gradient: SweepGradient(
        colors: <color>[
            Colors.red,
            Colors.blue
        ],
      )
  )
```

    - widget形式

```dart
    Container(
      decoration: BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment(0.8, 0.0), // 10% of the width, so there are ten blinds.
          colors: [const Color(0xFFFFFFEE), const Color(0xFF999999)], // whitish to gray
          tileMode: TileMode.repeated, // repeats the gradient over the canvas
        ),
      ),
    )
```

    - 函数形式

```dart
  class Sky extends CustomPainter {
    @override
    void paint(Canvas canvas, Size size) {
      var rect = Offset.zero & size;
      var gradient = RadialGradient(
        center: const Alignment(0.7, -0.6),
        radius: 0.2,
          Colors.white,
          Colors.black,
          Colors.red,
        stops: [0.4, 1.0],
      );
      canvas.drawRect(
        rect,
        Paint()..shader = gradient.createShader(rect),
      );
    }
    @override
    bool shouldRepaint(Sky oldDelegate) => false;
    @override
    bool shouldRebuildSemantics(Sky oldDelegate) => false;
  }
  ///调用
  CustomPaint(
    size: Size(300, 300), //指定画布大小
    painter: Sky(),
  );
```

- 圆角 borderRadius

  - BorderRadius.circular 设置 4 个角的圆角

    - ```dart
      // 同时设置4个角的圆角为5
      BoxDecoration(
        borderRadius: BorderRadius.circular(5),
      )
      ```

    -

  - BorderRadius.only 设专门单个角

    - ```dart
      // 设置单圆角：左上角的圆角为5，右上角的圆角为10
      BoxDecoration(
        borderRadius: BorderRadius.only(
          topLeft: Radius.circular(5),
          topRight: Radius.circular(10),
        ),
      )
      ```

- 形状 shape

  - shape: BoxShape.circle,

    - 全圆圆形

    - 和圆角设置的圆形 - 两个圆形形状不能同时使用，否则报错

  - shape: BoxShape.rectangle // 方形形状

- 背景

  - 颜色

    - color: Colors.grey[100],

  - 图片

    - ```dart
      // 背景设置
            decoration: BoxDecoration(
              image: DecorationImage(
                image: NetworkImage('https://c-ssl.duitang.com/uploads/blog/202105/08/20210508151655_73f2f.jpeg'),
                alignment: Alignment.topCenter,
                // repeat: ImageRepeat.noRepeat,
                // 图片铺满
                fit: BoxFit.cover,
                // 滤镜
                colorFilter: ColorFilter.mode(
                  Colors.indigoAccent[400]!. withOpacity(0.5),
                  BlendMode.hardLight
                )
              )
            ),
      ```

    -

- transform: 动画

  - 平移

    - translationValues(x, y, z): 平移 x, y, z；

  - 缩放

  - 旋转

    - rotationX()

      - rotationX(radians): x 轴旋转 radians 弧度；

    - rotationY()

      - rotationY(radians): y 轴旋转 radians 弧度；

    - rotationZ()
      - rotationZ(radians): z 轴旋转 radians 弧度；

  - 倾斜

    - skew()

      - skew(alpha, beta): x 轴倾斜 alpha 度，y 轴倾斜 beta 度；

    - skewX()

      - skewX(alpha): x 轴倾斜 alpha 度；

    - skewY()
      - skewY(beta): y 轴倾斜 beta 度；

- child:容器元件名()

  - 子容器

- 示例

  - ```dart
    Container(
        width: 300, //宽度
        height: 300, //高度
        decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(5), //圆角
            border: Border.all(width: 2.0, color: Colors.blueAccent //边框
            ),
            color: Colors.green,  //颜色
        ),
        alignment: Alignment.center,  //对齐方式
        padding: EdgeInsets.all(10),  //内边距
        margin: EdgeInsets.all(10),   //外边距
        child: Text('测试'),    //子组件
    );
    ```

  -

#### Row/Column 列表(行/列组件)

值

- mainAxisAlignment 主轴排列方式

  - MainAxisAlignment.start

  - MainAxisAlignment.end

  - MainAxisAlignment.center

  - MainAxisAlignment.spaceBetween

  - MainAxisAlignment.spaceAround

  - MainAxisAlignment.spaceEvenly

- crossAxisAlignment 次轴排列方式

  - 特别注意

    - 由于 Column 组件次轴方向上（即水平）默认是居中对齐，所以水平方向上不会撑满其父容器，此时需要指定 CrossAxisAlignment.stretch 才可以

  - crossAxisAlignment.start

  - crossAxisAlignment.end

  - crossAxisAlignment.center

  - crossAxisAlignment.stretch

  - crossAxisAlignment.baseline

- mainAxisSize 在主轴上的尺寸

  - 指在主轴方向上，是包裹其内容，还是撑满其父容器

  - MainAxisSize.min

    - 包裹其内容

  - MainAxisSize.max

    - 撑满父容器

    - 默认值

##### Row 水平方向上排列子 widget 的列表

```dart
Row(
    mainAxisAlignment: MainAxisAlignment.spaceBetween, //主队齐方式
    crossAxisAlignment: CrossAxisAlignment.center, //竖对齐方式
    children: [ //组件数组
        Text('测试1'),
        Expanded( //扩展组件
            child: Text(
                '测试2',
                textAlign: TextAlign.center,
            ),
            flex: 1, //剩下的都是我的
        ),
        Text('测试3'),
    ],
),
```

##### Column 垂直方向上排列子 widget 的列表

```dart
Column(
    mainAxisAlignment: MainAxisAlignment.spaceEvenly, //主队齐方式
    crossAxisAlignment: CrossAxisAlignment.center, //横对齐方式
    children: [    //组件数组
        Text('测试1'),
        Text('测试2'),
        Text('测试3'),
    ],
),
```

#### Stack/Positoned (绝对相对定位布局组件)

Stack 绝对定位的容器

Positioned 相对定位容器

代码例子

```dart
Container(
  height: 100,
  color: Colors.yellow,
  child: Stack(
    children: <widget>[
      Positioned(
        left: 10,
        top: 10,
        child: Container(width: 10, height: 10, color: Colors.red),
      ),
      Positioned(
        right: 10,
        top: 10,
        child: Container(width: 10, height: 10, color: Colors.red),
      ),
      Positioned(
        left: 10,
        bottom: 10,
        child: Container(width: 10, height: 10, color: Colors.red),
      ),
      Positioned(
        right: 10,
        bottom: 10,
        child: Container(width: 10, height: 10, color: Colors.red),
      ),
    ],
  ),
)
```

#### Center 将其子 widget 居中显示在 自身内部的 widget

```dart
Container(
    width: 100,
    height: 100,
    color: Colors.yellow,
    child: Center(
        child: Text('测试'),
    ),
);
```

#### Align 将其子 widget 对齐，并可以根据 子 widget 的大小自动调整大小

```dart
Container(
    width: 100,
    height: 100,
    color: Colors.yellow,
    child: Align(
        alignment: Alignment(0, 0), //范围-1~1，0为中间
        child: Text('测试'),
    ),
);
```

#### AspectRatio 将子 widget 的大小指定为某个特定的长宽比。 自身的比例

```dart
Container(
    alignment: Alignment.center,
    height: 200,
    color: Colors.blueAccent,
    child: AspectRatio(
        aspectRatio: 3,   //是自身的宽高比3：1
            child: Container(
                color: Colors.yellow,
            ),
        ),
    );
```

#### SizeBox 特定大小的盒子

```dart
SizedBox(
    width: 100,
    height: 100,
    child: Center(
        child: Text("测试"),
    ),
);
```

### 基础组件

#### MateralApp

它封装了应用程序实现 Material Design 所需要的一些 widget

```dart
MaterialApp(
    debugShowCheckedModeBanner: false, //是否显示测试
    home: Home(), //主页
    theme: ThemeData(primaryColor: Colors.yellow), //主题设置
    routes: {    //路由集合
        "/about": (context) => Test(),
    },
);
```

#### Scaffold

Material Design 布局结构的基本实现

此类提供了用于显示 drawer、snackbar 和底部 sheet 的 API。

代码例子

```dart
Scaffold(
    appBar: AppBar( //导航栏
    title: Text("Flutter Demo"),  ),
    body: Test(), //内容
    backgroundColor: Colors.grey[100], //背景颜色
    bottomNavigationBar: BottomNavigationBar( //底部栏
        onTap: (index) {
            print('点击的是第$index个');
        },
        currentIndex: 0,
        items: [
            BottomNavigationBarItem(icon: Icon(Icons.home), label: 'Home'),
            BottomNavigationBarItem(icon: Icon(Icons.school), label: 'School'),
        ],
    ),
);
```

#### Drawer 抽屉

```dart
Scaffold(
    drawer: Drawer(  //左滑抽屉
        child: ListView(
            children: [
                DrawerHeader(child: Text('Drawer Header')),
            ],
        ),
    ),
);
```

#### Image 图片

值

- image:

  - AssetImage

    - 使用 AssetImage 之前，需要在 pubspec.yaml 文件中声明好图片资源，然后才能使用；

  - NetworkImage
    - NextworkImage 指定图片的网络地址即可，主要是在加载一些网络图片时会用到；

- width: 图片宽度；

- height: 图片高度；

- color: 图片的背景颜色，当网络图片未加载完毕之前，会显示该背景颜色；

- fit:

  - 图片根据容器大小进行适配

  - BoxFit()

    - fill

    - contain

    - cover

    - fitWidth

    - fitHeight

    - none

    - scaleDown

- repeat: 决定当图片实际大小不足指定大小时是否使用重复效果

代码例子

```dart
Column(
    children: [
        Image(
            image: NetworkImage("网络图片"),
            width: 100,
            fit: BoxFit.fitWidth, //缩放模式
        ),
        ClipOval(   //圆角图片
            child:  Image.asset(
                '本地图片',
                width: 100,
                height: 100,
                fit: BoxFit.contain,
            ),
        )
    ],
),
```

构造函数语法糖

- Image.network()

  - 可以缩写成 Image()

- Image.asset

#### 文本组件

##### Text 文本

值

- style: 文本样式

  - TextStyle()

    - fontSize:13

    - fontWeight.bold

    - color:

      - Colors.red

      - Color(0xFF999999)

    - backgroundColor

    - shadows

- textAlign: 文字对齐方式

  - TextAlign()

    - left

    - right

    - center

    - justify

- softWrap: 文字是否换行

- overflow: 当文字溢出的时候， 以何种方式处理（默认直接截断）

  - TextOverflow()

    - clip

    - fade

    - ellipsis

    - visible

- maxLines: 当文字超过最大行数还没显示完的时候，就会根据 overflow 属性决定如何截断处理。

代码例子

```dart
Text(
    '测试',
    textAlign: TextAlign.center,  //内容对齐方式
    overflow: TextOverflow.ellipsis,  //超出...
    style: TextStyle(   //字体类型
        fontSize: 16,
        fontWeight: FontWeight.bold,
        fontFamily: '黑体',
        color: Colors.blueAccent,
    ),
),
Text.rich(TextSpan( //富文本
    text: '测试',
    style: TextStyle(fontWeight: FontWeight.bold),
    children: <textspan>[
        TextSpan(text: '富文本', style: TextStyle(fontSize: 16))
    ]
)),
```

##### 富文本组件

可以用 Flutter 提供的 Text.rich 构造函数 来创建相应的文本组件

- text 属性是 TextSpan

- TextSpan 中的 style 样式需要设置属性

- 默认字体样式 DefaultTextStyle.of(context).style

Text.rich

```dart
Text.rich(TextSpan(
  children: [
    TextSpan(
      '￥',
      style: TextStyle(
        fontSize: 12,
        color: Color(0xFFFF7528),
      ),
    ),
    TextSpan(
      '258',
      style: TextStyle(
        fontSize: 15,
        color: Color(0xFFFF7528),
      ),
    ),
  ]
))
```

RichText()

```dart
RichText(
      text: TextSpan(
          style: DefaultTextStyle.of(context).style,
          children: <inlinespan>[
            TextSpan(text: '老孟',style: TextStyle(color: Colors.red)),
            TextSpan(text: '，'),
            TextSpan(text: '一个有态度的程序员'),
          ]),
    )
```

值

- textAlign: 对齐

  - TextAlign.end

  - TextAlign.start

  - TextAlign.center

手势交互

```dart
RichText(
      text: TextSpan(
          style: DefaultTextStyle.of(context).style,
          children: <inlinespan>[
            TextSpan(text: '登陆即视为同意'),
            TextSpan(
              text: '《xxx服务协议》',
              style: TextStyle(color: Colors.red),
              recognizer: TapGestureRecognizer()..onTap = () {

              },
            ),
          ]),
    )
```

- recognizer 属性指定手势交互，类型是 GestureRecognizer,GestureRecognizer 是抽象类，一般使用其子类 TapGestureRecognizer 实现点击交互

##### TextField 文本输入框

值

- decoration: InputDecoration( border: InputBorder.none, // 边框设置 hintText: 'password', ),

  - decoration 是 TextField 组件的装饰（外观）参数，类型是 InputDecoration。

  - icon 显示在输入框的前面，用法如下：

    - TextField( decoration: InputDecoration( icon: Icon(Icons.person), ), )

  - 值

    - 行

      - 行名

        - labelText: '姓名：',

      - 行样式
        - labelStyle: TextStyle(color:Colors.red)

    - 长度

      - helperText: '用户名长度为 6-10 个字母',

        - helperText 显示在输入框的左下部，用于提示用户

      - helperStyle: TextStyle(color: Colors.blue),

        - helperStyle 参数表示文本样式

      - helperMaxLines: 1

    - 提示文字

      - hintText: '请输入用户名'
        - 是当输入框为空时的提示，不为空时不在显示

    - 错误

      - errorText: '用户名输入错误'

        - errorText 显示在输入框的左下部，默认字体为红色

      - errorStyle: TextStyle(fontSize: 12),

      - errorMaxLines: 1,

      - errorBorder: OutlineInputBorder(borderSide: BorderSide(color: Colors.red)),

    - 输入框前

      - prefixIcon: Icon(Icons.person)
        - prefix 系列的组件是输入框前面的部分

    - 输入框尾

      - suffixIcon: Icon(Icons.person)
        - 尾部的 Icon

    - 输入统计

      - counterText: '${\_textFieldValue.length}/32'
        - counter 组件统计输入框文字的个数，counter 仅仅是展示效果，不具备自动统计字数的功能， 自动统计字数

    - fill 样式

      - fillColor: Color(0x30cccccc),

        - 输入框背景

      - filled: true,
        - filled 为 true 时，输入框将会被 fillColor 填充

    - 圆角

      - ```dart
        enabledBorder: OutlineInputBorder(          borderSide: BorderSide(color: Color(0x00FF0000)),          borderRadius: BorderRadius.all(Radius.circular(100))),

        ```

      - ```dart
        focusedBorder: OutlineInputBorder(          borderSide: BorderSide(color: Color(0x00000000)),          borderRadius: BorderRadius.all(Radius.circular(100))),
        ```

    - controller 控制

      - 是输入框文本编辑的控制器，可以获取 TextField 的内容、设置 TextField 的内容

      - 获取输入框的内容，变为大写

      - 输入框后面带有“清除”功能

    - 软键盘控制

      - keyboardType 控制软键盘的类型

        - text：通用键盘。

        - multiline：当 TextField 为多行时（maxLines 设置大于 1），右下角的为“换行” 按键。

        - number：数字键盘。

        - phone：手机键盘，比数字键盘多"\*"和 "#"。

        - datetime：在 ios 上和 text 一样，在 android 上出现数字键盘、":"和 "-"。

        - emailAddress：邮箱键盘，有"@" 和 "."按键。

        - url：url 键盘，有"/" 和 "."按键。

        - visiblePassword：既有字母又有数字的键盘。

      - textInputAction 控制软键盘右下角的按键

        - none：android 上显示返回键，ios 不支持。

        - unspecified：让操作系统自己决定哪个合适，一般情况下，android 显示“完成”或者“返回”。

        - done：android 显示代表“完成”的按钮，ios 显示“Done”（中文：完成）。

        - go：android 显示表达用户去向目的地的图标，比如向右的箭头，ios 显示“Go”（中文：前往）。

        - search：android 显示表达搜索的按钮，ios 显示"Search"（中文：搜索）。

        - send：android 显示表达发送意思的按钮，比如“纸飞机”按钮，ios 显示"Send"（中文：发送）。

        - next：android 显示表达“前进”的按钮，比如“向右的箭头”,ios 显示"Next"（中文：下一项）。

        - previous：android 显示表达“后退”的按钮，比如“向左的箭头”,ios 不支持。

        - continueAction：android 不支持，ios 仅在 ios9.0+显示"Continue"（中文：继续）。

        - join：Android 和 ios 显示"Join"（中文：加入）。

        - route：android 不支持，ios 显示"Route"（中文：路线）。

        - emergencyCall：android 不支持，ios 显示"Emergency Call"（中文：紧急电话）。

        - newline：android 显示表达“换行”的按钮，ios 显示”换行“。

      - textCapitalization 配置键盘是大写还是小写 仅支持键盘模式为 text

        - words：每一个单词的首字母大写。

        - sentences：每一句话的首字母大写。

        - characters：每个字母都大写

        - none：都小写

    - 对齐方式

      - textAlignVertical 表示垂直方向的对齐方式，textDirection 表示文本方向

        - ```dart
          TextField(  textAlignVertical: TextAlignVertical.center,  textDirection: TextDirection.rtl, )
          ```

    - toolbarOptions

    - cursor 光标

      - ```dart
        TextField(  showCursor: true,  cursorWidth: 3,  cursorRadius: Radius.circular(10),  cursorColor: Colors.red, )
        ```

    - 密码框

      - obscureText: true,

    - inputFormatters

      - 限制用户输入的内容，比如只想让用户输入字符

        - ```dart
          TextField(  inputFormatters: [    WhitelistingTextInputFormatter(RegExp("[a-zA-Z]")),  ], )
          ```

    - 方法

      - onChanged

        - 是当内容发生变化时回调

      - onSubmitted

        - 是点击回车或者点击软键盘上的完成回调

      - onTap

        - 点击输入框时回调

      - 例子

        - ```dart
          TextField(  onChanged: (value){    print('onChanged:$value');  },  onEditingComplete: (){    print('onEditingComplete');  },    onTap: (){    print('onTap');  }, )
          ```

    - 字数统计 2

      - buildCounter

      - 代码例子

        - ```dart
          TextField(  maxLength: 100,  buildCounter: (    BuildContext context, {    int currentLength,    int maxLength,    bool isFocused,  }) {    return Text(      '$currentLength/$maxLength',    );  }, )
          ```

    - 焦点

      - 动态获取焦点

        - ```dart
          _focusNode = FocusNode(); TextField( focusNode: _focusNode, ... )

          ```

        - FocusScope.of(context).requestFocus(\_focusNode);

      - 动态失去焦点
        - \_focusNode.unfocus();

例子

```dart
TextField(
    decoration: InputDecoration(
        border: InputBorder.none, // 边框设置
        hintText: 'password',  ),
    keyboardType: TextInputType.number, //键盘类型
    textInputAction: TextInputAction.search, //键盘右下角按钮
    autofocus: true, //自动聚焦
    obscureText: true,//隐藏输入内容，如password
    maxLength: 10, ///最大长度
    onChanged: (text) { //输入变化    print(text);  },
    onSubmitted: (val) { //提交内容    print(val);  },
    enabled: true, //是否可点击
    controller: TextEditingController(), //放在外面定义，用于监听
)
```

#### Icon 系统图标

- 值

  - icon: 图标类型；

  - size: 图标大小；

  - color: 图标颜色。

```dart
Icon(
    Icons.favorite, //图标
    color: Colors.pink, //图标颜色
    size: 24, //图标大小
),
IconButton(    //图标按钮
    onPressed: () {
        print('点击图标');
    },
    icon: Icon(Icons.add),
),
```

#### Button 按钮

```dart
ElevatedButton(  onPressed: () {},
    child: Text("elevateButton"),
    style: ButtonStyle(
    textStyle: MaterialStateProperty.all(TextStyle(fontSize: 20)), //字体大小
    foregroundColor: MaterialStateProperty.all(Colors.white), //字体颜色
    backgroundColor: MaterialStateProperty.all(Colors.red), //背景颜色
    padding: MaterialStateProperty.all(EdgeInsets.all(20)), //内边距
    shape: MaterialStateProperty.all(RoundedRectangleBorder(        //形状圆角
        borderRadius: BorderRadius.circular(20))),
    side: MaterialStateProperty.all(BorderSide(color: Colors.purple, width: 1)), //边框大小颜色
    minimumSize: MaterialStateProperty.all(Size(200, 200)), //按钮大小
),
```

#### AppBar 导航

```dart
AppBar(  //导航栏
    title: Text("Flutter Demo"),
    actions: [
        Icon(Icons.add),
        PopupMenuButton(  //弹出菜单
            itemBuilder: (BuildContext context) {
                 return [
                    PopupMenuItem(child: Text('测试1'), value: '1号'),
                    PopupMenuItem(child: Text('测试2'), value: '2号'),
                    PopupMenuItem(child: Text('测试3'), value: '3号'),
                ];
            },
            onSelected: (object) {
                print(object);
            },
        ),
    ],
    backgroundColor: Colors.red,
    foregroundColor: Colors.white,
),
```

#### TabBar

显示水平选项卡的 Material Design widget

```dart
_tabController = TabController(length: 3, vsync: this);

TabBar(
    tabs: [
        Tab(icon: Icon(Icons.home)),
        Tab(icon: Icon(Icons.send)),
        Tab(icon: Icon(Icons.title)),
    ],
    controller: _tabController,
),
```

#### TabBarView

显示与当前选中的选项卡相对应的页面视图。通常和 TabBar 一起使用

```dart
_tabController = TabController(length: 3, vsync: this);

TabBarView(
    children: [
        Text('ceshi1'),
        Text('ceshi2'),
        Text('ceshi3'),
    ],
    controller: _tabController,
),
```

#### FlexibleSpaceBar

#### BottomNavigationBar 底部导航

```dart
BottomNavigationBar(  //底部栏
    onTap: (index) {    print('点击的是第$index个');  },
    currentIndex: 0,
    backgroundColor: Colors.pink,
    selectedItemColor: Colors.yellow,
    unselectedItemColor: Colors.white,
    items: [
        BottomNavigationBarItem(icon: Icon(Icons.home), label: 'Home'),
        BottomNavigationBarItem(icon: Icon(Icons.school), label: 'School'),
    ],
),
```

#### ListView 可滚动列表

```dart
ListView(
    padding: EdgeInsets.all(20),
    children: [
        Container(
            alignment: Alignment.center,
            height: 100,
            color: Colors.green,
            child: Text('测试'),
        ),
        Container(
            alignment: Alignment.center,
            height: 100,
            color: Colors.blueAccent,
            child: Text('测试'),
        ),
        Container(
            alignment: Alignment.center,
            height: 100,
            color: Colors.yellow,
            child: Text('测试'),
        ),
    ],
);


class _TestState extends State<test> {
    final List<string> _text = ['测试', '开发', '发布'];
    @override  Widget build(BuildContext context) {
        return ListView.builder(
            itemCount: _text.length,
            itemBuilder: (BuildContext context, int index) {
                return Container(
                    alignment: Alignment.center,
                    height: 100,
                    color: Colors.yellow,
                    child: Text(_text[index]),
                );
            },    )
        ;
    }
}
```

#### ListTile 固定高度的行

```dart
ListView(
    children: [
        ListTile(
            leading: FlutterLogo(size: 40), //左边图标
            title: Text('title'),      //标题
            subtitle: Text('subtitle'),     //副标题
            trailing: Icon(Icons.favorite), //右边图标
        ),
        ListTile(
            leading: FlutterLogo(size: 40),
            title: Text('title'),
            subtitle: Text('subtitle'),
            trailing: Icon(Icons.favorite),
        ),
    ],
);
```

#### Divider 水平分割线

```dart
ListView(
    children: [
        ListTile(
            title: Text('title'),
            subtitle: Text('subtitle'),
        ),
        Divider(      //分割线
            height: 20, //分割线高度
            thickness: 5, //厚度高度
            indent: 20, //前缩进
            endIndent: 20, //后缩进
            color: Colors.blueAccent, //颜色
        ),
        ListTile(
            title: Text('title'),
            subtitle: Text('subtitle'),
        ),
    ],
);
```

### 手势检测和触摸事件处理

#### 点击 Tap

- onTapDown

  - 在特定位置轻触手势接触了屏幕

- onTapUp

  - 在特定位置产生了一个轻触手势，并停止接触屏幕

- onTap

  - 产生一个轻触手势

- onTapCancel

  - 触发了 onTapDown ，但没能触发 Tap

- Double tap
  - onDoubleTap 用户快速连续两次在同一位置轻敲屏幕.

#### 长按

onLongPress

#### 垂直拖动

onVerticalDragStart

- 接触了屏幕，并可能会垂直移动

onVerticalDragUpdate

- 接触了屏幕，并继续在垂直方向移动

onVerticalDragEnd

- 之前接触了屏幕并垂直移动，并在停止接触屏幕前以某个垂直的速度移动

#### 水平拖拽

onHorizontalDragStart

- 接触了屏幕，并可能会水平移动

onHorizontalDragUpdate

- 接触了屏幕，并继续在水平方向移动

onHorizontalDragEnd

- 之前接触了屏幕并水平移动的接触点与屏幕分离

#### 双击时旋转 例子

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(SampleApp());
}

class SampleApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Sample App',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: AnimateApp(),
    );
  }
}

class AnimateApp extends StatefulWidget {
  @override
  State<statefulwidget> createState() {
    return _AnimateAppState();
  }
}

class _AnimateAppState extends State
    with SingleTickerProviderStateMixin {
  AnimationController controller;
  Animation<double> animation;
  CurvedAnimation curve;

  @override
  void initState() {
    super.initState();
    // 创建 AnimationController 对象
    controller = AnimationController(
        vsync: this, duration: const Duration(milliseconds: 2000));
    curve = CurvedAnimation(parent: controller, curve: Curves.easeIn);
    // 通过 Tween 对象 创建 Animation 对象
    animation = Tween(begin: 50.0, end: 200.0).animate(controller)
      ..addListener(() {
        // 注意：这句不能少，否则 widget 不会重绘，也就看不到动画效果
        setState(() {});
      });
    // 执行动画
    controller.forward();
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        title: 'AnimateApp',
        theme: ThemeData(primaryColor: Colors.blue),
        home: Scaffold(
            appBar: AppBar(
              title: Text('AnimateApp'),
            ),
            body: Center(
              child: GestureDetector(
                child: RotationTransition(
                    turns: curve,
                    child: FlutterLogo(
                      size: 200.0,
                    )),
                onDoubleTap: () {
                  if (controller.isCompleted) {
                    controller.reverse();
                  } else {
                    controller.forward();
                  }
                },
              ),
            )));
  }

  @override
  void dispose() {
    // 资源释放
    controller.dispose();
    super.dispose();
  }
}
```

### 动画

- animate(withDuration)

## 网络编程

### 网络

#### 网络层框架的架构设计

- 1.支持网络库插拔设计，且不干扰业务层

- 2.简洁易用，支持配置来进行请求

- 3.Adapter 设计，扩展性强

- 4.统一的异常和返回处理

#### HiNet 设计

- Dao 层

  - 首页

  - 详情

  - 点赞

  - 收藏

  - 登录

  - 注册

  - 通知

  - 个人中心

  - 排行

  - ...

- REST ful 支持

  - GET

  - POST

  - DELETE

  - ...

- 统一逻辑处理

  - Request processing

  - Response processing

  - Error processing

- 适配层

  - Dio Adapter

  - Http Adapter

  - Mock Adapter

- 三方库

  - dio

  - ...

#### json 编码器和解码器

##### dart 内置解析器

```dart
import 'dart:convert';
```

小项目可以借助来进行手动 JSON 序列化

json 和 map 互转

jsonDecode(jsonString);

- json 转 map

jsonEncode(jsonMap);

- map 转 json

```dart
void test() {
    const jsonString =
        "{ \"name\": \"flutter\", \"url\": \"https://coding.imooc.com/class/487.html\" }";
    //json 转map
    Map<string, dynamic> jsonMap = jsonDecode(jsonString);
    print('name:${jsonMap['name']}');
    print('url:${jsonMap['url']}');
    //map 转json
    String json = jsonEncode(jsonMap);
    print('json:$json');
}
```

解码(JSON String->Object)

```dart
var jsonString = '''
  [
    {"score": 40},
    {"score": 80}
  ]
''';

var scores = jsonDecode(jsonString);
```

编码(Object->JSON String)

##### JSON 解析技巧->生成实体类

- 1.手写实体类

- 2.生产力工具：网页自动生成实体类- json 转 dart 实体类

  - https://www.devio.org/io/tools/json-to-dart/

- 3.生产力工具：json_serializable 插件的使用技巧

  - json_annotatiln:^4.3.0

  - json_serializable:^6.0.1

  - build_runner:^2.1.4

  - 适用于中大型项目，定义手动字段，后期好维护

### 存储

- 本地存储(缓存)

  - shared_preferences

  - 本地 json 对象存储
    - localstorage: ^4.0.0+1

## 运行 flutter 项目下载依赖缓慢或卡住

### gradle 7.0 以下的版本的方式

启动虚拟机，执行 flutter run 后，始终卡在 Running Gradle task 'assembleDebug'...这一步

1.在项目下 android 文件下找到 build.gradle 文件，在两处 repositories 中，把原来内容注释，增加如下：

```bash
maven { url 'https://maven.aliyun.com/repository/google' }
maven { url 'https://maven.aliyun.com/repository/jcenter' }
maven { url 'http://maven.aliyun.com/nexus/content/groups/public' }
```

2.在项目中 android\gradle\wrapper 找到 gradle-wrapper.properties 文件，修改 distributionUrl

```bash
distributionUrl=file\:/D\:/softWare/gradle/gradle-5.4.1-all.zip
```

注意，你安装的 gradle 版本必须和你项目配置的 flutter 版本想匹配，附上插件版本所需的 Gradle 版本链接 （https://www.cnblogs.com/sendling/p/13452173.html），选择安装你适配的版本！

3.修改你的 Flutter 安装目录下的 flutter\packages\flutter_tools\gradle\resolve_dependencies.gradle 和 flutter\packages\flutter_tools\gradle\flutter.gradle 文件，将 maven 仓库地址替换为国内镜像地址

flutter\packages\flutter_tools\gradle\flutter.gradle 文件

```dart
buildscript {
    repositories {
        // google()
        // jcenter()
        // 修改的地方
        maven { url 'https://maven.aliyun.com/repository/google' }
        maven { url 'https://maven.aliyun.com/repository/jcenter' }
        maven { url 'http://maven.aliyun.com/nexus/content/groups/public' }
    }
}
project.rootProject.allprojects {
    repositories {
        maven {
            url repository
            // 修改的地方
            // 添加
            maven { url 'https://maven.aliyun.com/repository/google' }
            maven { url 'https://maven.aliyun.com/repository/jcenter' }
            maven { url 'http://maven.aliyun.com/nexus/content/groups/public' }
        }
    }
}
class FlutterPlugin implements Plugin<Project> {
    // 修改
    private static final String DEFAULT_MAVEN_HOST = "http://download.flutter.io";
```

flutter\packages\flutter_tools\gradle\resolve_dependencies.gradle 文件

```dart
maven {
    url "https://storage.flutter-io.cn/download.flutter.io"
}
```

4.回到 Flutter 项目中，先执行`flutter clean`，然后在终端中输入`cd android`，`./gradlew clean`和`./gradlew build`来清理和构建项目

### gradle 7.0 以上的版本的方式

基于上面的设置

官网文档：[UrlArtifactRepository - Gradle DSL Version 7.0](https://docs.gradle.org/7.0/dsl/org.gradle.api.artifacts.repositories.UrlArtifactRepository.html#org.gradle.api.artifacts.repositories.UrlArtifactRepository:allowInsecureProtocol)

1.修改你的项目下的 android\build.gradle 文件

```dart
repositories {
  // 有两处都要改
  maven {
    url "http://maven.aliyun.com/nexus/content/groups/public/"
    allowInsecureProtocol = true
  }
}
```

2.修改你的 Flutter 安装目录下的

flutter\packages\flutter_tools\gradle\resolve_dependencies.gradle 和 flutter\packages\flutter_tools\gradle\flutter.gradle 文件，

将 maven 仓库的地址改为 https 协议，或者添加`allowInsecureProtocol = true`属性来允许不安全的协议

## 一、🎉Flutter 组件

### 组件文档

<https://flutterchina.club/widgets/basics/>

<http://laomengit.com/guide/widgets/Button.html>

### 1.main.dart 程序入口文件

```dart
// 定义入口函数
void main() {
  // runApp是系统函数，用来执行组件渲染
  runApp(const MyApp());
}
```

### 2.字体设置

#### ios 项目

- 项目中引入 ttf 文件 ，并在 info.plist 中设置引用

#### Android 项目

- 创建一个 Font 资源文件，并将其传递到 TextView 的 FontFamily 参数中

#### Flutter 项目

- 在文件夹中放置字体文件，并在 pubspec.yaml 中引用

### 3.组件分类

#### 无状态组件-StatelessWidget

作用：复用组件

自定义木偶组件

```dart
class MyApp extends StatelessWidget{
  @override
  widget build(BuildContext context){
    return Container();
  }
}
```

#### 有状态组件-StatefullWidget

作用：数据、逻辑处理

自定义组件

```dart
class MyHomePage extends StatefulWidget {
  MyHomePage({Key? key, required this.title}) : super(key: key);
  final String title;

  @override
  _MyHomePageState createState() => _MyHomePageState();
}
```

### 😼 布局组件

#### Container--容器组件

Container 组件是最常用的布局组件之一，可以认为它是 web 开发中的 div，rn 开发中的 View。其往往可以用来控制大小、背景颜色、边框、阴影、内外边距和内容排列方式等

##### width：宽

```dart

```

##### height：高

```dart

```

##### color：颜色

```dart

```

##### margin：外边距

```dart
四个方向
 EdgeInsets.all(100)

单个方向
 EdgeInsets.only(left:100,top:100,right:100,bottom:100)

水平和垂直
 EdgeInsets.symmetric(horizontal: 20,vertical: 20)

顺序方向设置值
 EdgeInsets.fromLTRB(100, 100, 100, 200)
```

##### padding：内边距

```dart
四个方向
 EdgeInsets.all(100)

单个方向
 EdgeInsets.only(left:100,top:100,right:100,bottom:100)

水平和垂直
 EdgeInsets.symmetric(horizontal: 20,vertical: 20)

顺序方向设置值
 EdgeInsets.fromLTRB(100, 100, 100, 200)
```

##### alingnment：子容器对齐父容器

```dart
Alignment.topLeft // 左上
Alignment.topCenter // 上中
Alignment.topRight // 右上
Alignment.centerLeft // 左中
Alignment.center // 居中
Alignment.centerRight // 右中
Alignment.bottomLeft // 左下
Alignment.bottomCenter // 下中
Alignment.bottomRight // 右下
```

##### BoxConstraints：限制容器的宽高

minWidth
maxWidth
minHeight
maxHeight

```dart
// 容器的大小将被限制在[100*100 ~ 200*200]内
BoxConstraints(
  minWidth: 100,
  maxWidth: 200,
  minHeight: 100,
  maxHeight: 200,
)
```

##### decoration：装饰

###### 边框-border

Border.all()：四个边框

```dart
Border(top:BorderSide(color:value,width:1,style:BorderStyle.solid),) // 顶部颜色、宽、边框样式实线
```

代码例子

```dart
// 同时设置4条边框：1px粗细的黑色实线边框
BoxDecoration(
  border: Border.all(color: Colors.black, width: 1, style: BorderStyle.solid)
)

// 设置单边框：上边框为1px粗细的黑色实线边框，右边框为1px粗细的红色实线边框
BoxDecoration(
  border: Border(
    top: BorderSide(color: Colors.black, width: 1, style: BorderStyle.solid),
    right: BorderSide(color: Colors.red, width: 1, style: BorderStyle.solid),
  ),
)
```

###### 阴影-boxShadow

可以指定 x，y，blur，spread，color 等属性

```dart
BoxDecoration(
  boxShadow: [
    BoxShadow(
      offset: Offset(0, 0),
      blurRadius: 6,
      spreadRadius: 10,
      color: Color.fromARGB(20, 0, 0, 0),
    ),
  ],
)
```

###### 渐变-gradient

三种渐变

LinearGradient：线性渐变

```dart
// 从左到右，红色到蓝色的线性渐变
BoxDecoration(
  gradient: LinearGradient(
    begin: Alignment.centerLeft,
    end: Alignment.centerRight,
    colors: [Colors.red, Colors.blue],
  ),
)
```

RadialGradient：放射状渐变

```dart
// 从中心向四周扩散，红色到蓝色的径向渐变
BoxDecoration(
  gradient: RadialGradient(
    center: Alignment.center,
    colors: [Colors.red, Colors.blue],
  ),
)
```

SweepGradient：扇形渐变

```dart
BoxDecoration(
  gradient: SweepGradient(
      colors: <Color>[
         Colors.red,
         Colors.blue
      ],
   )
)
```

widget 形式

```dart
Container(
  decoration: BoxDecoration(
    gradient: LinearGradient(
      begin: Alignment.topLeft,
      end: Alignment(0.8, 0.0), // 10% of the width, so there are ten blinds.
      colors: [const Color(0xFFFFFFEE), const Color(0xFF999999)], // whitish to gray
      tileMode: TileMode.repeated, // repeats the gradient over the canvas
    ),
  ),
)
```

函数形式

```dart
class Sky extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    var rect = Offset.zero & size;
    var gradient = RadialGradient(
      center: const Alignment(0.7, -0.6),
      radius: 0.2,
        Colors.white,
        Colors.black,
        Colors.red,
      stops: [0.4, 1.0],
    );
    canvas.drawRect(
      rect,
      Paint()..shader = gradient.createShader(rect),
    );
  }
  @override
  bool shouldRepaint(Sky oldDelegate) => false;
  @override
  bool shouldRebuildSemantics(Sky oldDelegate) => false;
}
///调用
CustomPaint(
  size: Size(300, 300), //指定画布大小
  painter: Sky(),
);
```

###### 圆角-borderRadius

BorderRadius.circular--置 4 个角的圆角

```dart
// 同时设置4个角的圆角为5
BoxDecoration(
  borderRadius: BorderRadius.circular(5),
)
```

BorderRadius.only--设专门单个角

```dart
// 设置单圆角：左上角的圆角为5，右上角的圆角为10
BoxDecoration(
  borderRadius: BorderRadius.only(
    topLeft: Radius.circular(5),
    topRight: Radius.circular(10),
  ),
)
```

###### 形状-shape

```dart
shape: BoxShape.circle, // 全圆圆形。和圆角设置的圆形 - 两个圆形形状不能同时使用，否则报错

shape: BoxShape.rectangle // 方形形状
```

###### 背景

颜色：color: Colors.grey[100],

图片背景设置

```dart
// 背景设置
decoration: BoxDecoration(
    image: DecorationImage(
        image: NetworkImage('https://c-ssl.duitang.com/uploads/blog/202105/08/20210508151655_73f2f.jpeg'),
        alignment: Alignment.topCenter,
        // repeat: ImageRepeat.noRepeat,
        // 图片铺满
        fit: BoxFit.cover,
        // 滤镜
        colorFilter: ColorFilter.mode(
            Colors.indigoAccent[400]!. withOpacity(0.5),
            BlendMode.hardLight
        )
    )
),
```

##### transform：动画

```bash
平移
 translationValues(x, y, z): 平移x, y, z；

缩放

旋转
 rotationX()
  rotationX(radians): x轴旋转radians弧度；
 rotationY()
  rotationY(radians): y轴旋转radians弧度；
 rotationZ()
  rotationZ(radians): z轴旋转radians弧度；

倾斜
 skew()
  skew(alpha, beta): x轴倾斜alpha度，y轴倾斜beta度；
 skewX()
  skewX(alpha): x轴倾斜alpha度；
 skewY()
  skewY(beta): y轴倾斜beta度；
```

##### child：子容器元件名()

```dart

```

##### 合集示例

```dart
Container(
    width: 300, //宽度
    height: 300, //高度
    decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(5), //圆角
        border: Border.all(width: 2.0, color: Colors.blueAccent //边框
        ),
        color: Colors.green,  //颜色
    ),
    alignment: Alignment.center,  //对齐方式
    padding: EdgeInsets.all(10),  //内边距
    margin: EdgeInsets.all(10),   //外边距
    child: Text('测试'),    //子组件
);
```

#### Row/Column--列表(行/列组件)

mainAxisAlignment：主轴排列方式

- MainAxisAlignment.start
- MainAxisAlignment.end
- MainAxisAlignment.center
- MainAxisAlignment.spaceBetween
- MainAxisAlignment.spaceAround
- MainAxisAlignment.spaceEvenly

crossAxisAlignment：次轴排列方式

- 特别注意：由于 Column 组件次轴方向上（即水平）默认是居中对齐，所以水平方向上不会撑满其父容器，此时需要指定 CrossAxisAlignment.stretch 才可以
- crossAxisAlignment.start
- crossAxisAlignment.end
- crossAxisAlignment.center
- crossAxisAlignment.stretch
- crossAxisAlignment.baseline

mainAxisSize：在主轴上的尺寸

- 指在主轴方向上，是包裹其内容，还是撑满其父容器
- MainAxisSize.min：包裹其内容
- MainAxisSize.max：撑满父容器（默认值）

##### Row：水平方向上排列子 widget 的列表

```dart
Row(
    mainAxisAlignment: MainAxisAlignment.spaceBetween, //主队齐方式
    crossAxisAlignment: CrossAxisAlignment.center, //竖对齐方式
    children: [ //组件数组
        Text('测试1'),
        Expanded( //扩展组件
            child: Text(
                '测试2',
                textAlign: TextAlign.center,
            ),
            flex: 1, //剩下的都是我的
        ),
        Text('测试3'),
    ],
),
```

##### Column：垂直方向上排列子 widget 的列表

```dart
Column(
    mainAxisAlignment: MainAxisAlignment.spaceEvenly, //主队齐方式
    crossAxisAlignment: CrossAxisAlignment.center, //横对齐方式
    children: [    //组件数组
        Text('测试1'),
        Text('测试2'),
        Text('测试3'),
    ],
),
```

#### Stack/Positoned--绝对相对定位布局组件

Stack：绝对定位的容器

Positioned：相对定位容器

```dart
Container(
  height: 100,
  color: Colors.yellow,
  child: Stack(
    children: <Widget>[
      Positioned(
        left: 10,
        top: 10,
        child: Container(width: 10, height: 10, color: Colors.red),
      ),
      Positioned(
        right: 10,
        top: 10,
        child: Container(width: 10, height: 10, color: Colors.red),
      ),
      Positioned(
        left: 10,
        bottom: 10,
        child: Container(width: 10, height: 10, color: Colors.red),
      ),
      Positioned(
        right: 10,
        bottom: 10,
        child: Container(width: 10, height: 10, color: Colors.red),
      ),
    ],
  ),
)
```

#### Center--将其子 widget 居中显示在-自身内部的 widget

```dart
Container(
    width: 100,
    height: 100,
    color: Colors.yellow,
    child: Center(
        child: Text('测试'),
    ),
);
```

#### Align--将其子 widget 对齐，并可以根据--子 widget 的大小自动调整大小

```dart
Container(
    width: 100,
    height: 100,
    color: Colors.yellow,
    child: Align(
        alignment: Alignment(0, 0), //范围-1~1，0为中间
        child: Text('测试'),
    ),
);
```

#### AspectRatio--将子 widget 的大小指定为某个特定的长宽比。--自身的比例

```dart
Container(
    alignment: Alignment.center,
    height: 200,
    color: Colors.blueAccent,
    child: AspectRatio(
        aspectRatio: 3,   //是自身的宽高比3：1
            child: Container(
                color: Colors.yellow,
            ),
        ),
    );
```

#### SizeBox--特定大小的盒子

```dart
SizedBox(
    width: 100,
    height: 100,
    child: Center(
        child: Text("测试"),
    ),
);
```

### 5.基础组件

#### MateralApp

它封装了应用程序实现 Material Design 所需要的一些 widget

```dart
MaterialApp(
    debugShowCheckedModeBanner: false, //是否显示测试
    home: Home(), //主页
    theme: ThemeData(primaryColor: Colors.yellow), //主题设置
    routes: {    //路由集合
        "/about": (context) => Test(),
    },
);
```

#### Scaffold

Material Design 布局结构的基本实现

此类提供了用于显示 drawer、snackbar 和底部 sheet 的 API。

```dart
Scaffold(
    appBar: AppBar( //导航栏
    title: Text("Flutter Demo"),  ),
    body: Test(), //内容
    backgroundColor: Colors.grey[100], //背景颜色
    bottomNavigationBar: BottomNavigationBar( //底部栏
        onTap: (index) {
            print('点击的是第$index个');
        },
        currentIndex: 0,
        items: [
            BottomNavigationBarItem(icon: Icon(Icons.home), label: 'Home'),
            BottomNavigationBarItem(icon: Icon(Icons.school), label: 'School'),
        ],
    ),
);
```

#### Drawer-抽屉

```dart
Scaffold(
    drawer: Drawer(  //左滑抽屉
        child: ListView(
            children: [
                DrawerHeader(child: Text('Drawer Header')),
            ],
        ),
    ),
);
```

#### Image-图片

值：

```dart
image:
 AssetImage
  使用AssetImage之前，需要在pubspec.yaml文件中声明好图片资源，然后才能使用；
 NetworkImage
  NextworkImage指定图片的网络地址即可，主要是在加载一些网络图片时会用到；

width: 图片宽度；

height: 图片高度；

color: 图片的背景颜色，当网络图片未加载完毕之前，会显示该背景颜色；

fit: 图片根据容器大小进行适配
    BoxFit()
     fill
        contain
        cover
        fitWidth
        fitHeight
        none
        scaleDown

repeat: 决定当图片实际大小不足指定大小时是否使用重复效果
```

代码例子：

```dart
Column(
    children: [
        Image(
            image: NetworkImage("网络图片"),
            width: 100,
            fit: BoxFit.fitWidth, //缩放模式
        ),
        ClipOval(   //圆角图片
            child:  Image.asset(
                '本地图片',
                width: 100,
                height: 100,
                fit: BoxFit.contain,
            ),
        )
    ],
),
```

构造函数语法糖

Image.network()：可以缩写成 Image()
Image.asset：

#### 文本组件

##### Text-文本组件

值：

```dart
style:
文本样式
 TextStyle()
  fontSize:13
  fontWeight.bold
  color:
   Colors.red
   Color(0xFF999999)
  backgroundColor
  shadows

textAlign:
文字对齐方式
 TextAlign()
  left
  right
  center
  justify

softWrap:
文字是否换行

overflow:
当文字溢出的时候，
以何种方式处理（默认直接截断）
 TextOverflow()
  clip
  fade
  ellipsis
  visible

maxLines: 当文字超过最大行数还没显示完的时候，就会根据overflow属性决定如何截断处理。
```

代码例子：

```dart
Text(
    '测试',
    textAlign: TextAlign.center,  //内容对齐方式
    overflow: TextOverflow.ellipsis,  //超出...
    style: TextStyle(   //字体类型
        fontSize: 16,
        fontWeight: FontWeight.bold,
        fontFamily: '黑体',
        color: Colors.blueAccent,
    ),
),
Text.rich(TextSpan( //富文本
    text: '测试',
    style: TextStyle(fontWeight: FontWeight.bold),
    children: <TextSpan>[
        TextSpan(text: '富文本', style: TextStyle(fontSize: 16))
    ]
)),
```

##### Text.rich-富文本组件

可以用 Flutter 提供的 Text.rich 构造函数 来创建相应的文本组件

```dart
text属性是TextSpan
TextSpan中的style样式需要设置属性
默认字体样式 DefaultTextStyle.of(context).style
```

Text.rich

```dart
Text.rich(TextSpan(
  children: [
    TextSpan(
      '￥',
      style: TextStyle(
        fontSize: 12,
        color: Color(0xFFFF7528),
      ),
    ),
    TextSpan(
      '258',
      style: TextStyle(
        fontSize: 15,
        color: Color(0xFFFF7528),
      ),
    ),
  ]
))
```

RichText()

```dart
RichText(
      text: TextSpan(
          style: DefaultTextStyle.of(context).style,
          children: <InlineSpan>[
            TextSpan(text: '老孟',style: TextStyle(color: Colors.red)),
            TextSpan(text: '，'),
            TextSpan(text: '一个有态度的程序员'),
          ]),
    )
```

textAlign: 对齐值

- TextAlign.end
- TextAlign.start
- TextAlign.center

手势交互

```dart
RichText(
      text: TextSpan(
          style: DefaultTextStyle.of(context).style,
          children: <InlineSpan>[
            TextSpan(text: '登陆即视为同意'),
            TextSpan(
              text: '《xxx服务协议》',
              style: TextStyle(color: Colors.red),
              recognizer: TapGestureRecognizer()..onTap = () {

              },
            ),
          ]),
    )
```

recognizer 属性指定手势交互，类型是 GestureRecognizer,GestureRecognizer 是抽象类，一般使用其子类 TapGestureRecognizer 实现点击交互

##### TextField-文本输入框

decoration 是 TextField 组件的装饰（外观）参数，类型是 InputDecoration。

icon 显示在输入框的前面，用法如下：

```dart
TextField(
  decoration: InputDecoration(
    border: InputBorder.none, // 边框设置
    icon: Icon(Icons.person),
  ),
)
```

行

```dart
行名
 labelText: '姓名：',
行样式
 labelStyle: TextStyle(color:Colors.red)
```

长度

```dart
helperText: '用户名长度为6-10个字母',
 helperText显示在输入框的左下部，用于提示用户

helperStyle: TextStyle(color: Colors.blue),
 helperStyle参数表示文本样式

helperMaxLines: 1
```

提示文字

```dart
hintText: '请输入用户名' // 是当输入框为空时的提示，不为空时不在显示
```

错误

```dart
errorText: '用户名输入错误'
 errorText显示在输入框的左下部，默认字体为红色

errorStyle: TextStyle(fontSize: 12),

errorMaxLines: 1,

errorBorder: OutlineInputBorder(borderSide: BorderSide(color: Colors.red)),
```

输入框前

```dart
prefixIcon: Icon(Icons.person) // prefix系列的组件是输入框前面的部分
```

输入框尾

```dart
suffixIcon: Icon(Icons.person) // 尾部的Icon
```

输入统计

counter 组件统计输入框文字的个数，counter 仅仅是展示效果，不具备自动统计字数的功能， 自动统计字数

```dart
counterText: '${_textFieldValue.length}/32'
```

fill 样式

```dart
fillColor: Color(0x30cccccc),
 输入框背景

filled: true,
 filled为true时，输入框将会被fillColor填充
```

圆角

```dart
enabledBorder: OutlineInputBorder(
          borderSide: BorderSide(color: Color(0x00FF0000)),
          borderRadius: BorderRadius.all(Radius.circular(100))),

focusedBorder: OutlineInputBorder(
          borderSide: BorderSide(color: Color(0x00000000)),
          borderRadius: BorderRadius.all(Radius.circular(100))),
```

controller-控制

- 是输入框文本编辑的控制器，可以获取 TextField 的内容、设置 TextField 的内容
- 获取输入框的内容，变为大写
- 输入框后面带有“清除”功能

软键盘控制

```dart
keyboardType-控制软键盘的类型
 text：通用键盘。
 multiline：当TextField为多行时（maxLines设置大于1），右下角的为“换行” 按键。
 number：数字键盘。
 phone：手机键盘，比数字键盘多"*"和 "#"。
 datetime：在ios上和text一样，在android上出现数字键盘、":"和 "-"。
 emailAddress：邮箱键盘，有"@" 和 "."按键。
 url：url键盘，有"/" 和 "."按键。
 visiblePassword：既有字母又有数字的键盘。

textInputAction-控制软键盘右下角的按键
 none：android上显示返回键，ios不支持。
 unspecified：让操作系统自己决定哪个合适，一般情况下，android显示“完成”或者“返回”。
 done：android显示代表“完成”的按钮，ios显示“Done”（中文：完成）。
 go：android显示表达用户去向目的地的图标，比如向右的箭头，ios显示“Go”（中文：前往）。
 search：android显示表达搜索的按钮，ios显示"Search"（中文：搜索）。
 send：android显示表达发送意思的按钮，比如“纸飞机”按钮，ios显示"Send"（中文：发送）。
 next：android显示表达“前进”的按钮，比如“向右的箭头”,ios显示"Next"（中文：下一项）。
 previous：android显示表达“后退”的按钮，比如“向左的箭头”,ios不支持。
 continueAction：android 不支持，ios仅在ios9.0+显示"Continue"（中文：继续）。
 join：Android和ios显示"Join"（中文：加入）。
 route：android 不支持，ios显示"Route"（中文：路线）。
 emergencyCall：android 不支持，ios显示"Emergency Call"（中文：紧急电话）。
 newline：android显示表达“换行”的按钮，ios显示”换行“。

textCapitalization-配置键盘是大写还是小写
仅支持键盘模式为text
 words：每一个单词的首字母大写。
 sentences：每一句话的首字母大写。
 characters：每个字母都大写
 none：都小写
```

对齐方式

textAlignVertical：表示垂直方向的对齐方式，textDirection：表示文本方向

```dart
TextField(
  textAlignVertical: TextAlignVertical.center,
  textDirection: TextDirection.rtl,
)
```

toolbarOptions

```dart

```

cursor-光标

```dart
TextField(
  showCursor: true,
  cursorWidth: 3,
  cursorRadius: Radius.circular(10),
  cursorColor: Colors.red,
)
```

密码框

```dart
obscureText: true,
```

inputFormatters

限制用户输入的内容，比如只想让用户输入字符

```dart
TextField(
  inputFormatters: [
    WhitelistingTextInputFormatter(RegExp("[a-zA-Z]")),
  ],
)
```

方法

- onChanged：是当内容发生变化时回调
- onSubmitted：是点击回车或者点击软键盘上的完成回调
- onTap：点击输入框时回调

```dart
TextField(
  onChanged: (value){
    print('onChanged:$value');
  },
  onEditingComplete: (){
    print('onEditingComplete');
  },

  onTap: (){
    print('onTap');
  },
)
```

字数统计 2：buildCounter

```dart
TextField(
  maxLength: 100,
  buildCounter: (
    BuildContext context, {
    int currentLength,
    int maxLength,
    bool isFocused,
  }) {
    return Text(
      '$currentLength/$maxLength',
    );
  },
)
```

焦点

```dart
_focusNode = FocusNode();
// 动态获取焦点
TextField(
 focusNode: _focusNode,
 ...
)

FocusScope.of(context).requestFocus(_focusNode);

// 动态失去焦点
_focusNode.unfocus();
```

文本输入框代码例子：

```dart
TextField(
    decoration: InputDecoration(
        border: InputBorder.none, // 边框设置
        hintText: 'password',  ),
    keyboardType: TextInputType.number, //键盘类型
    textInputAction: TextInputAction.search, //键盘右下角按钮
    autofocus: true, //自动聚焦
    obscureText: true,//隐藏输入内容，如password
    maxLength: 10, ///最大长度
    onChanged: (text) { //输入变化    print(text);  },
    onSubmitted: (val) { //提交内容    print(val);  },
    enabled: true, //是否可点击
    controller: TextEditingController(), //放在外面定义，用于监听
)
```

#### Icon-系统图标

值：

- icon: 图标类型；
- size: 图标大小；
- color: 图标颜色。

```dart
Icon(
    Icons.favorite, //图标
    color: Colors.pink, //图标颜色
    size: 24, //图标大小
),
IconButton(    //图标按钮
    onPressed: () {
        print('点击图标');
    },
    icon: Icon(Icons.add),
),
```

#### Button-按钮

```dart
ElevatedButton(  onPressed: () {},
    child: Text("elevateButton"),
    style: ButtonStyle(
    textStyle: MaterialStateProperty.all(TextStyle(fontSize: 20)), //字体大小
    foregroundColor: MaterialStateProperty.all(Colors.white), //字体颜色
    backgroundColor: MaterialStateProperty.all(Colors.red), //背景颜色
    padding: MaterialStateProperty.all(EdgeInsets.all(20)), //内边距
    shape: MaterialStateProperty.all(RoundedRectangleBorder(        //形状圆角
        borderRadius: BorderRadius.circular(20))),
    side: MaterialStateProperty.all(BorderSide(color: Colors.purple, width: 1)), //边框大小颜色
    minimumSize: MaterialStateProperty.all(Size(200, 200)), //按钮大小
),
```

#### AppBar-导航

```dart
AppBar(  //导航栏
    title: Text("Flutter Demo"),
    actions: [
        Icon(Icons.add),
        PopupMenuButton(  //弹出菜单
            itemBuilder: (BuildContext context) {
                 return [
                    PopupMenuItem(child: Text('测试1'), value: '1号'),
                    PopupMenuItem(child: Text('测试2'), value: '2号'),
                    PopupMenuItem(child: Text('测试3'), value: '3号'),
                ];
            },
            onSelected: (object) {
                print(object);
            },
        ),
    ],
    backgroundColor: Colors.red,
    foregroundColor: Colors.white,
),
```

#### TabBar-选项卡组件

显示水平选项卡的 Material Design widget

```dart
_tabController = TabController(length: 3, vsync: this);

TabBar(
    tabs: [
        Tab(icon: Icon(Icons.home)),
        Tab(icon: Icon(Icons.send)),
        Tab(icon: Icon(Icons.title)),
    ],
    controller: _tabController,
),
```

#### TabBarView-选项卡相对应的页面视图

显示与当前选中的选项卡相对应的页面视图。通常和 TabBar 一起使用

```dart
_tabController = TabController(length: 3, vsync: this);

TabBarView(
    children: [
        Text('ceshi1'),
        Text('ceshi2'),
        Text('ceshi3'),
    ],
    controller: _tabController,
),
```

#### FlexibleSpaceBar

```dart

```

#### BottomNavigationBar-底部导航

```dart
BottomNavigationBar(  //底部栏
    onTap: (index) {    print('点击的是第$index个');  },
    currentIndex: 0,
    backgroundColor: Colors.pink,
    selectedItemColor: Colors.yellow,
    unselectedItemColor: Colors.white,
    items: [
        BottomNavigationBarItem(icon: Icon(Icons.home), label: 'Home'),
        BottomNavigationBarItem(icon: Icon(Icons.school), label: 'School'),
    ],
),
```

#### ListView-可滚动列表

1

```dart
ListView(
    padding: EdgeInsets.all(20),
    children: [
        Container(
            alignment: Alignment.center,
            height: 100,
            color: Colors.green,
            child: Text('测试'),
        ),
        Container(
            alignment: Alignment.center,
            height: 100,
            color: Colors.blueAccent,
            child: Text('测试'),
        ),
        Container(
            alignment: Alignment.center,
            height: 100,
            color: Colors.yellow,
            child: Text('测试'),
        ),
    ],
);
```

2

```dart
class _TestState extends State<Test> {
    final List<String> _text = ['测试', '开发', '发布'];
    @override  Widget build(BuildContext context) {
        return ListView.builder(
            itemCount: _text.length,
            itemBuilder: (BuildContext context, int index) {
                return Container(
                    alignment: Alignment.center,
                    height: 100,
                    color: Colors.yellow,
                    child: Text(_text[index]),
                );
            },    )
        ;
    }
}
```

#### ListTile-固定高度的行

```dart
ListView(
    children: [
        ListTile(
            leading: FlutterLogo(size: 40), //左边图标
            title: Text('title'),      //标题
            subtitle: Text('subtitle'),     //副标题
            trailing: Icon(Icons.favorite), //右边图标
        ),
        ListTile(
            leading: FlutterLogo(size: 40),
            title: Text('title'),
            subtitle: Text('subtitle'),
            trailing: Icon(Icons.favorite),
        ),
    ],
);
```

#### Divider-水平分割线

```dart
ListView(
    children: [
        ListTile(
            title: Text('title'),
            subtitle: Text('subtitle'),
        ),
        Divider(      //分割线
            height: 20, //分割线高度
            thickness: 5, //厚度高度
            indent: 20, //前缩进
            endIndent: 20, //后缩进
            color: Colors.blueAccent, //颜色
        ),
        ListTile(
            title: Text('title'),
            subtitle: Text('subtitle'),
        ),
    ],
);
```

### 6.手势检测和触摸事件处理

#### 点击 Tap

- onTapDown：在特定位置轻触手势接触了屏幕
- onTapUp：在特定位置产生了一个轻触手势，并停止接触屏幕
- onTap：产生一个轻触手势
- onTapCancel：触发了 onTapDown ，但没能触发 Tap
- Double tap：onDoubleTap 用户快速连续两次在同一位置轻敲屏幕.

#### 长按

onLongPress

#### 垂直拖动

- onVerticalDragStart：接触了屏幕，并可能会垂直移动
- onVerticalDragUpdate：接触了屏幕，并继续在垂直方向移动
- onVerticalDragEnd：之前接触了屏幕并垂直移动，并在停止接触屏幕前以某个垂直的速度移动

#### 水平拖拽

- onHorizontalDragStart：接触了屏幕，并可能会水平移动
- onHorizontalDragUpdate：接触了屏幕，并继续在水平方向移动
- onHorizontalDragEnd：之前接触了屏幕并水平移动的接触点与屏幕分离

#### 双击时旋转 例子

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(SampleApp());
}

class SampleApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Sample App',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: AnimateApp(),
    );
  }
}

class AnimateApp extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    return _AnimateAppState();
  }
}

class _AnimateAppState extends State<AnimateApp>
    with SingleTickerProviderStateMixin {
  AnimationController controller;
  Animation<double> animation;
  CurvedAnimation curve;

  @override
  void initState() {
    super.initState();
    // 创建 AnimationController 对象
    controller = AnimationController(
        vsync: this, duration: const Duration(milliseconds: 2000));
    curve = CurvedAnimation(parent: controller, curve: Curves.easeIn);
    // 通过 Tween 对象 创建 Animation 对象
    animation = Tween(begin: 50.0, end: 200.0).animate(controller)
      ..addListener(() {
        // 注意：这句不能少，否则 widget 不会重绘，也就看不到动画效果
        setState(() {});
      });
    // 执行动画
    controller.forward();
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        title: 'AnimateApp',
        theme: ThemeData(primaryColor: Colors.blue),
        home: Scaffold(
            appBar: AppBar(
              title: Text('AnimateApp'),
            ),
            body: Center(
              child: GestureDetector(
                child: RotationTransition(
                    turns: curve,
                    child: FlutterLogo(
                      size: 200.0,
                    )),
                onDoubleTap: () {
                  if (controller.isCompleted) {
                    controller.reverse();
                  } else {
                    controller.forward();
                  }
                },
              ),
            )));
  }

  @override
  void dispose() {
    // 资源释放
    controller.dispose();
    super.dispose();
  }
}
```

### 7.动画

```dart
animate(withDuration)
```

## 二、网络编程

### 1.网络

#### 网络层框架的架构设计

- 1.支持网络库插拔设计，且不干扰业务层
- 2.简洁易用，支持配置来进行请求
- 3.Adapter 设计，扩展性强
- 4.统一的异常和返回处理

#### HiNet 设计

Dao 层

- 首页
- 详情
- 点赞
- 收藏
- 登录
- 注册
- 通知
- 个人中心
- 排行
- ...

REST ful 支持

- GET
- POST
- DELETE
- ...

统一逻辑处理

- Request processing
- Response processing
- Error processing

适配层

- Dio Adapter
- Http Adapter
- Mock Adapter

三方库

- dio
- ...

#### json 编码器和解码器

##### dart 内置解析器

引入内置库-小项目可以借助来进行手动 JSON 序列化

```dart
import 'dart:convert';
```

json 和 map 互转

jsonDecode(jsonString); // json 转 map
jsonEncode(jsonMap); // map 转 json

```dart
void test() {
    const jsonString =
        "{ \"name\": \"flutter\", \"url\": \"https://coding.imooc.com/class/487.html\" }";
    //json 转map
    Map<String, dynamic> jsonMap = jsonDecode(jsonString);
    print('name:${jsonMap['name']}');
    print('url:${jsonMap['url']}');
    //map 转json
    String json = jsonEncode(jsonMap);
    print('json:$json');
}
```

解码(JSON String->Object)

```dart
var jsonString = '''
  [
    {"score": 40},
    {"score": 80}
  ]
''';

var scores = jsonDecode(jsonString);
```

编码(Object->JSON String)

##### JSON 解析技巧->生成实体类

1.手写实体类

2.生产力工具：网页自动生成实体类- json 转 dart 实体类

<https://www.devio.org/io/tools/json-to-dart/>

3.生产力工具：json_serializable 插件的使用技巧

- json_annotatiln:^4.3.0
- json_serializable:^6.0.1
- build_runner:^2.1.4
- 适用于中大型项目，定义手动字段，后期好维护

### 2.存储

```bash
# 本地存储(缓存)
shared_preferences
# 本地json对象存储库
localstorage: ^4.0.0+1
```

## 三、高级

待定

## 四、打包发布

待定
