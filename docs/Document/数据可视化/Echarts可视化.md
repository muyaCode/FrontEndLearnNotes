# Echarts可视化

## Echarts入门

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>快速上手</title>
    <style>
        #main{
            width: 700px;
            height: 500px;
        }
    </style>
</head>
<body>
<!--建立dom 容器-->
<div id="main"></div>
<!--引入echarts-->
<script src="https://lib.baomitu.com/echarts/4.7.0/echarts.min.js"></script>
<script>
    /*基于准备好的dom，初始化echarts实例
    *   echarts.init(dom)
    * */
    const main=document.querySelector('#main')
    const chart=echarts.init(main)

    /*指定图表的option 配置项和数据
    *   xAxis x轴 {}
    *       data 类目数据
    *   yAxis y轴 {}
    *   series 系列列表
    *       type 图表类型
    *       data 数据，与xAxis.data 相对应
    * */
    const option={
        xAxis:{
            data:['html','css','js']
        },
        yAxis:{},
        series:{
            type:'bar',
            data:[30,20,40]
        }
    }

    /*使用刚指定的配置项和数据显示图表
    *   setOption(option)
    * */
    chart.setOption(option)

</script>
</body>
</html>
```

## Echarts组件

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>选择</title>
    <style>
        body{background-color: #faf5ea}
        h1{text-align: center}
        p{
            text-align: center;
            font-size: 24px;
        }
        .sky{
            color: #00acec;
        }
    </style>
</head>
<body>
<h1 id="title">沁园春·长沙</h1>
<article id="cont">
    <p>独立寒秋，湘江北去，橘子洲头。</p>
    <p>看万山红遍，层林尽染；漫江碧透，百舸争流。</p>
    <p>鹰击长空，鱼翔浅底，万类霜天竞自由。</p>
    <p>怅寥廓，问苍茫大地，谁主沉浮？</p>
    <p>携来百侣曾游。忆往昔峥嵘岁月稠。</p>
    <p>恰同学少年，风华正茂；书生意气，挥斥方遒。</p>
    <p>指点江山，激扬文字，粪土当年万户侯。</p>
    <p>曾记否，到中流击水，浪遏飞舟？</p>
</article>
<script src="https://d3js.org/d3.v6.min.js"></script>
<script>
    /*1-选择的依据
    *   通过css选择器选择
    *   通过dom对象选择
    * */
    /*select 选择'#title'*/
    /*const title=d3.select('#title').attr('class','sky')
    console.log(title.node());*/

    /*select 选择第一个p元素*/
    // d3.select('p').attr('class','sky')


    /*
    * 用原生js获取title元素
    * select选择title元素
    * */
    /*d3.select('#cont').on('click',({target})=>{
        if(target.tagName==='P'){
            d3.select(target).attr('class','sky')
        }
    })*/


    /*2-多选*/
    /*selectAll 选择所有p元素*/
    // d3.selectAll('p').attr('class','sky')


    /*3-过滤多选的元素
    *   filter((ele,ind)=>{}) 可基于节点元素或节点的索引进行过滤
    *   filter(':nth-child(n)') 基于元素的索引位置过滤
    * */
    /*d3.selectAll('p')
        .filter(':nth-child(3)')
        .attr('class','sky')*/
    d3.selectAll('p')
        .filter((ele,ind)=>{
            return ind%3
        })
        .attr('class','sky')

</script>
</body>
</html>
```

## Echarts常用图表

折线图

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>折线</title>
    <style>
        #main{
            margin: 20px;
            width: 700px;
            height: 500px;
        }
    </style>
</head>
<body>
<!--建立dom 容器-->
<div id="main"></div>
<!--引入echarts-->
<script src="https://lib.baomitu.com/echarts/4.7.0/echarts.min.js"></script>
<script>
    /*基于准备好的dom，初始化echarts实例*/
    const myChart = echarts.init(document.getElementById('main'));

    /*图表配置项*/
    const option = {
        /*x轴
        *   data 类目轴数据
        *   boundaryGap 边界留白
        *   axisLabel 标签
        *       margin 标签偏移量
        * */
        xAxis:{
            data:['html','css','js','webgl'],
            boundaryGap:0,
            axisLabel:{
                rotate:60,
                margin: 20
            }
        },


        /*y轴*/
        yAxis:{
            axisLabel:{
                margin:20
            }
        },


        /*series 系列集合
        *   type 系列类型，line
        *   name 系列名
        *   data 系列数据，[20,10,30,40]
        *   smooth 平滑
        *   itemStyle 项目样式
        *       color 颜色
        *   areaStyle 区域样式
        *       color 区域颜色
        *       opacity 透明度
        *   symbolSize 标记点大小
        *   symbol 标记图形
        *       内置形状 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
        *       'image://url' 图片
        *       'path://' svg
        * */
        series:[
            {
                name:'学习人数',
                type:'line',
                data:[30,20,40,100],
                smooth:true,
                itemStyle:{
                    color:'#00acec'
                },
                areaStyle:{
                    color:'#00acec',
                    opacity:0.3
                },
                symbolSize:40,
                // symbol:'none',
                // symbol:'image://./images/bs.png',
                symbol:'path://M30.9,53.2C16.8,53.2,5.3,41.7,5.3,27.6S16.8,2,30.9,2C45,2,56.4,13.5,56.4,27.6S45,53.2,30.9,53.2z M30.9,3.5C17.6,3.5,6.8,14.4,6.8,27.6c0,13.3,10.8,24.1,24.101,24.1C44.2,51.7,55,40.9,55,27.6C54.9,14.4,44.1,3.5,30.9,3.5z M36.9,35.8c0,0.601-0.4,1-0.9,1h-1.3c-0.5,0-0.9-0.399-0.9-1V19.5c0-0.6,0.4-1,0.9-1H36c0.5,0,0.9,0.4,0.9,1V35.8z M27.8,35.8 c0,0.601-0.4,1-0.9,1h-1.3c-0.5,0-0.9-0.399-0.9-1V19.5c0-0.6,0.4-1,0.9-1H27c0.5,0,0.9,0.4,0.9,1L27.8,35.8L27.8,35.8z'
            },
            {
                name:'就业人数',
                type:'line',
                data:[40,30,50,150],
                areaStyle:{
                    opacity:0.2
                },
                smooth:true
            }
        ]
    };


    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
</script>
</body>
</html>
```

饼图

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>饼图</title>
    <style>
        #main{
            margin: 20px;
            width: 700px;
            height: 500px;
        }
    </style>
</head>
<body>
<!--建立dom 容器-->
<div id="main"></div>
<!--引入echarts-->
<script src="https://lib.baomitu.com/echarts/4.7.0/echarts.min.js"></script>
<script>
    // 基于准备好的dom，初始化echarts实例
    const myChart = echarts.init(document.getElementById('main'));
    // 指定图表的配置项和数据
    const option = {
        /*视觉映射 visualMap
        *   min 最小值
        *   max 最大值
        *   inRange 定义 在选中范围中 的视觉元素
        *       colorLightness[0, 1] 亮度
        * */
        visualMap:{
            min:0,
            max:100,
            inRange:{
                colorLightness:[0,1]
            }
        },

        /*饼图 pie
        *   type 图表类型
        *   data 数据 [{name,value},...]
        *   roseType 玫瑰图类型
        *       radius 半径
        *       area 面积
        *   radius 半径，[起始半径，结束半径]可生成环形
        *   itemStyle 项目样式
        *       color 颜色
        * */
        series:{
            type:'pie',
            data:[
                {name:'html',value:30},
                {name:'css',value:20},
                {name:'js',value:40},
                {name:'webgl',value:50},
            ],
            roseType:'radius',
            // roseType:'area',
            // radius:100,
            // radius:'70%',
            radius:['40%','70%'],
            itemStyle:{
                color:'#00acec'
            },
            label:{
                position:'inside',
                // formatter:'{b}\n{d}%',
                formatter:({name,percent})=>{
                    return `${name}\n${Math.round(percent)}%`
                },
                lineHeight:22,
                fontSize:14,
                fontWeight:'bold'
            },
            center:['50%','60%']
        }
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
</script>
</body>
</html>
```

散点图

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>散点图</title>
    <style>
        #main{
            margin: 20px;
            width: 700px;
            height: 500px;
        }
    </style>
</head>
<body>
<!--建立dom 容器-->
<div id="main"></div>
<!--引入echarts-->
<script src="https://lib.baomitu.com/echarts/4.7.0/echarts.min.js"></script>
<script>
    // 基于准备好的dom，初始化echarts实例
    const myChart = echarts.init(document.getElementById('main'));
    //数据
    const data=[
        //x y  z
        [0, 0, 20],
        [10,10,40],
        [20,10,50],
        [30,30,30],
    ];
    // 指定图表的配置项和数据
    const option = {
        /*x 轴*/
        xAxis:{},
        /*y轴*/
        yAxis:{},
        /*散点图 scatter
        *   data 数据
        *   symbolSize 散点尺寸
        * */
        series:{
            type:'scatter',
            data,
            // symbolSize:50,
            symbolSize:(data)=>{
                // console.log(data);
                return data[2]
            },
            label:{
                show:true,
                fontSize:14,
                fontWeight:'bold',
                position:'top',
                distance:15,
                // formatter:'{c}',
                formatter:(data)=>{
                    console.log(data);
                    return `散点大小：${data.value[2]}`
                }
            }

        }
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
</script>
</body>
</html>
```

K线图

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>K线图</title>
    <style>
        #main{
            margin: 20px;
            width: 700px;
            height: 500px;
        }
    </style>
</head>
<body>
<!--建立dom 容器-->
<div id="main"></div>
<!--引入echarts-->
<script src="https://lib.baomitu.com/echarts/4.7.0/echarts.min.js"></script>
<script>
    // 基于准备好的dom，初始化echarts实例
    const myChart = echarts.init(document.getElementById('main'));
    // 指定图表的配置项和数据
    const option = {
        /*x 轴*/
        xAxis:{
            data:['周一','周二','周三','周四',]
        },
        /*y轴*/
        yAxis:{},

        /*k 线图 candlestick
        * data [open, close, lowest, highest]-[开盘值, 收盘值, 最低值, 最高值]
        * */
        series:{
            type:'candlestick',
            data:[
                [30,20,10,40],
                [20,30,10,40],
                [20,30,0,40],
                [20,30,0,50],
            ],
            barWidth:'20%',
            itemStyle:{
                color:'orange',
                borderColor:'orange',
                color0:'#00acec',
                borderColor0:'#00acec'
            }
        }
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
</script>
</body>
</html>
```

雷达图

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>雷达</title>
    <style>
        #main{
            margin: 20px;
            width: 700px;
            height: 600px;
        }
    </style>
</head>
<body>
<!--建立dom 容器-->
<div id="main"></div>
<!--引入echarts-->
<script src="https://lib.baomitu.com/echarts/4.7.0/echarts.min.js"></script>
<script>
    // 基于准备好的dom，初始化echarts实例
    const myChart = echarts.init(document.getElementById('main'));
    /*英雄数据
    *   value [生命，攻击，暴击，防御，速度]
    * */
    const data=[
        {
            name:'关羽',
            value:[80,98,80,70,70]
        },
        {
            name:'鲁班',
            value:[85,70,75,95,80]
        },
    ];

    // 指定图表的配置项和数据
    const option = {
        /*标题 title*/
        title:{
            text:'英雄实力对比'
        },

        /*图例 legend
        *   data 数据
        *   orient 排列方式
        *       horizontal 水平，默认
        *       vertical 垂直
        * */
        legend:{},

        //提示
        tooltip:{},

        /*
        * 雷达坐标系组件 radar
        *   indicator 雷达图的指示器集合 []
        *       name 指示器名称
        *       min、max 数据区间，实际数据会在此区间内计算比值
        *       color 标签颜色
        *   shape 雷达形状
        *       polygon 多边形，默认
        *       circle 圆形
        *
        * */
        radar:{
            indicator:[
                {name:'生命',min:0,max:100,color:'green'},
                {name:'攻击',min:0,max:100,color:'red'},
                {name:'暴击',min:0,max:100,color:'orange'},
                {name:'防御',min:0,max:100,color:'#333'},
                {name:'速度',min:0,max:100,color:'blue'},
            ],
            shape:'polygon',
            // shape:'circle',
            splitArea:{
                areaStyle:{
                    color:[
                        'rgba(0,163,236,0)',
                        'rgba(0,163,236,0.1)',
                        'rgba(0,163,236,0.2)',
                        'rgba(0,163,236,0.3)',
                        'rgba(0,163,236,0.4)',
                    ]
                }
            },
            axisLine:{
                lineStyle:{
                    color:'#fff'
                }
            },
            splitLine:{
                lineStyle:{
                    color:'#fff'
                }
            }
        },

        /*
        * 雷达 radar
        *   type 图表类型
        *   data 数据 [{name,value[]},...]
        * */
        series:{
            type:'radar',
            data
        }

    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);

</script>
</body>
</html>
```

仪表盘

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>仪表盘</title>
    <style>
        #main{
            margin: 20px;
            width: 700px;
            height: 500px;
        }
    </style>
</head>
<body>
<!--建立dom 容器-->
<div id="main"></div>
<!--引入echarts-->
<script src="https://lib.baomitu.com/echarts/4.7.0/echarts.min.js"></script>
<script>
    // 基于准备好的dom，初始化echarts实例
    const myChart = echarts.init(document.getElementById('main'));
    // 指定图表的配置项和数据
    const option = {
        /*
        * 仪表盘 gauge
        *   type 图表类型
        *   detail 仪表盘详情{formatter:'{value}%'}
        *   data 数据[{name,value},...]
        * */
        series:{
            type:'gauge',
            detail:{
                formatter:'{value}%'
            },
            data:[
                {name:'速度',value:80}
            ],
            startAngle:270-30,
            endAngle:-60,
            min:-200,
            max:200
        }

    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);

    /*随机修改仪表数值，每隔一秒钟修改一次*/
    setInterval(()=>{
        option.series.data[0].value=Math.round(Math.random()*400)
        myChart.setOption(option)
    },1000)

</script>
</body>
</html>
```

地图-json

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>中国地图</title>
    <style>
        #main{
            width: 100%;
            height: 600px;
        }
    </style>
</head>
<body>
<!--建立dom 容器-->
<div id="main"></div>
<!--引入echarts-->
<script src="https://lib.baomitu.com/echarts/4.7.0/echarts.min.js"></script>
<script>
    //初始化echarts实例
    const myChart = echarts.init(document.getElementById('main'));

    /*获取接送文件*/
    fetch('./data/China.json')
        .then((res) => res.json())
        .then(data => {
            //echarts 注册地图 registerMap
            echarts.registerMap('china',data)
            //echarts 配置文件
            const option = {
                title: {
                    text: '中国地图',
                    left:'center'
                },
                /*
                * 地图 map
                *   type 图表类型
                *   map 地图注册名
                * */
                series:{
                    type:'map',
                    map:'china',
                    // roam:'scale',
                    // roam:'move',
                    roam:true,
                    center: [115.97, 29.71],
                    zoom:1,
                    itemStyle:{
                        areaColor:'#00acec',
                        borderColor:'blue'
                    },
                    emphasis:{
                        itemStyle:{
                            areaColor:'rgba(0,163,236,0.5)',
                            borderColor:'#00acec'
                        },
                        label:{
                            color:'blue'
                        }
                    }
                }
            };
            //基于配置文件显示图表
            myChart.setOption(option);
        })

</script>
</body>
</html>
```

地图-geo

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>中国地图</title>
    <style>
        body{margin: 0}
        #main{
            width: 100%;
            height: 600px;
            background-color: #044161;
        }
    </style>
</head>
<body>
<!--建立dom 容器-->
<div id="main"></div>
<!--引入echarts-->
<script src="https://lib.baomitu.com/echarts/4.7.0/echarts.min.js"></script>

<script>
    const myChart = echarts.init(document.getElementById('main'));
    /*获取接送文件*/
    fetch('./data/China.json')
        .then((res) => res.json())
        .then(data => {
            echarts.registerMap('china',data);
            const option = {
                title: {
                    text: '中国地图',
                    left:'center',
                    textStyle:{
                        color:'rgba(255,255,255,0.8)',
                    },
                    top:24
                },
                geo: {
                    map: 'china',
                    roam:true,
                    zoom:1,
                    itemStyle:{
                        areaColor:'#004981',
                        borderColor:'#029fd4'
                    },
                    emphasis:{
                        itemStyle:{
                            color:'#029fd4'
                        },
                        label:{
                            color:'#fff'
                        }
                    }
                },
                series: [{
                    name: 'pm2.5',
                    type: 'scatter',
                    coordinateSystem:'geo',
                    data: [
                        {
                            name:'海门',
                            value:[121.15, 31.89, 9]
                        },
                        {
                            name:'鄂尔多斯',
                            value:[109.781327, 39.608266, 12]
                        },
                        {
                            name:'招远',
                            value:[120.38, 37.35, 18]
                        },

                    ],
                    symbolSize: function (val) {
                        return val[2];
                    },
                }]
            };
            myChart.setOption(option);
        })

</script>
</body>
</html>
```

案例

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>西虹市 新增确诊/治愈 趋势</title>
    <style>
        #main{
            margin: 20px;
            width: 700px;
            height: 500px;
        }
    </style>
</head>
<body>
<!--建立dom 容器-->
<div id="main"></div>
<!--引入echarts-->
<script src="https://lib.baomitu.com/echarts/4.7.0/echarts.min.js"></script>
<script>
    /*基于准备好的dom，初始化echarts实例*/
    const myChart = echarts.init(document.getElementById('main'));
    /*数据*/
    //日期
    const xData=['3.3', '3.4', '3.5', '3.6', '3.7', '3.8', '3.9'];
    //确诊数据
    const qzData=[200, 170, 90, 80, 30, 40, 10];
    //治愈数据
    const zyData=[10, 20, 40, 70, 120, 145, 150];


    /*指定图表的配置项和数据*/
    const option = {
        /*标题 title {}
        *   主标题 text
        *   副标题 subtext
        *   主标题样式 textStyle
        *       color
        *       fontSize
        * */
        title:{
            text:'西虹市 新增确诊/治愈 趋势',
            subtext:'单位：例',
            textStyle:{
                fontSize:16
            }
        },


        /*提示框 tooltip
        *   trigger 提示框触发方式
        *       item 图形触发，主要在散点图，饼图等无类目轴的图表中使用。
        *       axis 坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表
        *       none 什么都不触发
        *   backgroundColor 背景色
        *   textStyle 文字样式
        *   borderWidth 边界宽度
        *   borderColor 边界颜色
        * */
        tooltip:{
            trigger:'axis',
            backgroundColor:'#fff',
            textStyle:{
                color:'#333'
            },
            borderWidth:1,
            borderColor:'#ddd'
        },

        /*x轴
        *   data 类目轴数据
        *   boundaryGap 边界留白
        *   axisLine 轴线
        *       show 可见性
        *   axisLabel 标签
        *       rotate 旋转
        *       margin 外边距
        *   axisTick 刻度
        *       show 可见性
        * */
        xAxis:{
            data:xData,
            axisTick:{
                show:false,
            },
            boundaryGap:0,
            axisLine:{
                show:false
            },
            axisLabel:{
                rotate:50,
                margin:15
            }
        },


        /*y轴
        *   其属性与x 轴类似
        * */
        yAxis:{
            axisLine:{
                show:false
            },
            axisTick:{
                show:false
            }
        },


        /*图例 legend
        *   data[] 图例的数据,每一项代表一个系列的 name
        *   icon 图表形状
        *   itemGap 元素间隙
        *   itemHeight 元素高度
        *   textStyle 文字样式
        *       fontSize 大小
        *       color 颜色
        *       padding 内间距
        *   left top right bottom 边界位置
        * */
        legend:{
            icon:'circle',
            left:'right',
            top:32,
            itemHeight:7,
            textStyle:{
                padding:[0,0,0,-9],
                color:'#999'
            }
        },

        /*网格 grid
        *   left top right bottom 边界位置
        * */
        grid:{
            left:50,
            right:10,
            top:70
        },

        /*系列列表 series
        *   name 系列名,用于提示tooltip，图例legend 筛选，数据更新
        *   type 列表类型
        *   lineStyle 线的样式
        *       color 颜色
        *   showSymbol 标记点的显示
        *   smooth 线的圆滑
        *   data 数据
        * */
        series:[
            {
                name:'确诊',
                type:'line',
                data:qzData,
                smooth:true,
                lineStyle:{
                    color:'crimson'
                },
                showSymbol:false
            },
            {
                name:'治愈',
                type:'line',
                data:zyData,
                smooth:true,
                /*lineStyle:{
                    color:'lightseagreen'
                },*/
                itemStyle:{
                    color:'lightseagreen'
                },
                symbol:'none'
            },
        ]

    };


    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
</script>
</body>
</html>
```

## Echarts高级应用

```html
```

## Echarts案例

```html
```

## Echarts扩展知识

### 原生图形组件

#### 原生图形组件的基本概念

- 原生图形组件就是可以自定义图形的组件。
- 原生图形组件里绘制的图形，可以绑定鼠标事件、拖拽事件等。

#### 坐标转换

echarts 有两种坐标位：图表位，像素位。

图表位有直角坐标位、地理坐标位等。

原生图形的位置就是基于像素位定位的。

echarts 实例对象提供了图表位和像素位的转换方法：

- convertToPixel(坐标系，[x,y]) 图表位转像素位
- convertFromPixel(坐标系，[x,y]) 像素位转图表位

#### 案例 – 折线图的拖拽

正常绘制折线图

在折线图的所有节点位置绘制原生图形

为原生图形绑定鼠标事件：

- 拖拽时，将原生图形的位置赋予标记点
- 鼠标划入|移动时，显示提示
- 鼠标离开时，隐藏提示

### 响应式布局

在html 中使用css 中的flex 可以轻松实现响应式布局。

在echarts 里，如何适配不同尺寸的屏幕呢？

简单点的可以通过为尺寸、位置等属性设置百分比来实现。复杂些的就需要自定义响应规则。

#### 自定义响应规则的方法

1. 建立基础配置项 baseOption
2. 建立规则配置列表 media
   1. 建立query
   2. 建立此规则下的配置信息option
3. echarts 实例基于baseOption 和media 绘制图表

### 渲染器

- devicePixelRatio 设备分辨率，默认取浏览器的值window.devicePixelRatio。
- renderer 渲染器，支持 'canvas' 或者 'svg'。参见 使用 Canvas 或者 SVG 渲染。
- width 可显式指定实例宽度，单位为像素。如果传入值为 null/undefined/'auto'，则表示自动取 dom（实例容器）的宽度。
- height 可显式指定实例高度，单位为像素。如果传入值为 null/undefined/'auto'，则表示自动取 dom（实例容器）的高度。
- locale 使用的语言，内置 'ZH' 和 'EN' 两个语言，也可以使用 echarts.registerLocale 方法注册新的语言包。目前支持的语言见 src/i18n。

### 三维 echarts

ECharts GL 是基于webgl 开发的。

使用时，需要在引入echarts.min.js后面再引入一个echarts-gl.min.js

### webpack 中使用echarts

1.npm 安装 ECharts

```bash
npm install echarts --save
```

2.引入 ECharts

整体引入

```js
var echarts = require('echarts');
```

按需引入

```js
// 引入 ECharts 主模块
var echarts = require('echarts/lib/echarts');
// 引入柱状图
require('echarts/lib/chart/bar');
// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title’);
```

可以按需引入的模块列表见 <https://github.com/apache/incubator-echarts/blob/master/index.js>

### 微信中使用echarts

1.下载 GitHub 上的 ecomfe/echarts-for-weixin 项目

2.创建微信小程序的项目

3.echarts-for-weixin 项目完全替换刚建立的小程序项目，将 project.config.json 中的appid 替换成自己的appid

2.index.js 引入组件

```js
import * as echarts from '../../ec-canvas/echarts';
```

3.index.wxml 中引入组件

```vue
<view class="container">
    <ec-canvas id="mychart-dom-bar" canvas-id="mychart-bar" ec="{{ ec }}"></ec-canvas>
</view>
```

### echarts 功能很强大，很丰富

echarts 的原生图形组件可以让我们灵活定制图表元素。

echarts 的响应式布局可以让我们的图表自适应容器尺寸。

echarts 的SVG + Canvas 双引擎渲染，使其性能更佳。

echarts 对webgl 三维图形的实现，使其拥有了更加丰富、立体的效果。

echarts 对小程序的兼容使其拥有了更广阔的开发空间。
