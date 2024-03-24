# Angular面试题

## AngularJS 双向绑定原理

参考回答：

Angular 将双向绑定转换为一堆 watch 表达式，然后递归这些表达式检查是否发生过变化，如果变了则执行相应的 watcher 函数（指 view 上的指令，如 ng-bind，ng-show等或是{{}}）。等到 model 中的值不再发生变化，也就不会再有 watcher 被触发，一个完整的 digest 循环就完成了。

Angular 中在 view 上声明的事件指令，如：ng-click、ng-change 等，会将浏览器的事件转发给$scope 上相应的 model 的响应函数。等待相应函数改变 model，紧接着触发脏检查机制刷新 view。

watch 表达式：可以是一个函数、可以是$scope 上的一个属性名，也可以是一个字符串形式的表达式。$watch 函数所监听的对象叫做 watch 表达式。

watcher 函数：指在view 上的指令（ngBind，ngShow、ngHide 等）以及{{}}表达式，他们所注册的函数。

每一个 watcher 对象都包括：监听函数，上次变化的值，获取监听表达式的方法以及监听表达式，最后还包括是否需要使用深度对比（angular.equals()）

## Angular 中组件之间通信的方式 

参考回答：

Props down

- 1.调用子组件,通过自定义属性传值
- 2.子组件内部通过 Input 来接收属性的值

Events up

- 1.在父组件中定义一个有参数的方法
- 2.调用子组件时,绑定自定义事件和上一步方法
- 3.子组件内部通过 Output 和 EventEmitter 来触发事件并传值.

## Angualr 的八大组成部分并简单描述 

参考回答：

- model 是 Angular 开发中的基本单位,是一个容器,可以包含组件、指令、管道等
- Pipes 可以对数据做一个筛选、过滤、格式化从而得到目的数据
- Components 是可被反复使用的带有特定功能的视图
- Templates 是经过指令和管道、组件等增强过的 html
- Bindings 结合着事件绑定 属性绑定 双向数据绑定等扩展 html 的功能
- Directives 分为结构性和属性型指令还有其他模块中比如路由模块中的指令等，主要是增强 html。
- Service 将组件、应用中的可共用的部分,比如数据或者方法等 封装成服务以方

便服用
DependencyInjection 依赖注入

## Angular 中常见的生命周期的钩子函数? 

参考回答：

ngOnChanges:当 Angular 设置其接收当前和上一个对象值的数据绑定属性时响应。

ngOnInit:在第一个 ngOnChange 触发器之后,初始化组件/指令。这是最常用的方法,用于从后端服务检索模板的数据。

ngDoCheck：检测并在 Angular 上下文发生变化时执行。

每次更改检测运行时,会被调用。

ngOnDestroy:在 Angular 销毁指令/组件之前消除。取消订阅可观察的对象并脱离事件处理程序,以避免内存泄漏。

组件特定的 hooks:

- ngAfterContentInit:组件内容已初始化完成
- ngAfterContentChecked:在 Angular 检查投影到其视图中的绑定的外部内容之后。
- ngAfterViewInit:Angular 创建组件的视图后。
- ngAfterViewChecked：在 Angular 检查组件视图的绑定之后

## Angular 中路由的工作原理 

参考回答：

Angular 应用程序具有路由器服务的单个实例,并且每当 URL 改变时,相应的路由就与路由配置数组进行匹配。在成功匹配时,它会应用重定向,此时路由器会构建 ActivatedRoute 对象的树,同时包含路由器的当前状态。在重定向之前,路由器将通过运行保护(CanActivate)来检查是否允许新的状态。

Route Guard 只是路由器运行来检查路由授权的接口方法。

保护运行后,它将解析路由数据并通过将所需的组件实例化到`<router-outlet></router-outlet>`来激活路由器状态。

## 解释 rjx 在 Angular 中的使用场景 

参考回答：

Rxjs 是在微软所提供的一种的异步处理数据的方式,在 Angular 中处理网络通信时用到了。

创建一个 Observable 并 subsribe

比如：`this.http.get('').subscribe((data)=>{ })`