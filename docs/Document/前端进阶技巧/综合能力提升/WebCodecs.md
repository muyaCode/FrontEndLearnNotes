# WebCodecs

GitHub：[w3c/webcodecs: WebCodecs is a flexible web API for encoding and decoding audio and video. (github.com)](https://github.com/w3c/webcodecs)

**MDN**：[WebCodecs API - Web API | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/API/WebCodecs_API)

**WebCodecs API** 为 web 开发者提供了对视频流的单个帧和音频数据块的底层访问能力。这对于那些需要完全控制媒体处理方式的 web 应用程序非常有用。例如，视频或音频编辑器，以及视频会议。

## WebCodecs 是什么

WebCodecs 于 21 年 9 月份推出，是用于在 web 页面上对音视频进行底层操纵（如编解码）的 API。

WebCodecs 是相对底层的 API，准确来说是为有音视频开发基础的人准备的，对前端同学来说有一定的门槛。

在使用 FFmpeg 时可直接调用包装好的方法，主要门槛在于 wasm 环境的配置和构建。而使用 WebCodecs 时则需要基于编解码的原理手动实现功能。或许后续 WebCodecs 将会推出更加上层的 API。

## 教程

WebCodecs 开启 Web 音视频新篇章：https://hughfenghen.github.io/posts/2023/10/06/webcodecs-new-era-for-media-on-the-web/

demo：https://hughfenghen.github.io/WebAV/demo

github：https://github.com/hughfenghen/WebAV

[基于 WebCodecs 的网页端高性能视频截帧 - 掘金 (juejin.cn)](https://juejin.cn/post/7329573765087756314)

[使用 WebCodec 在浏览器解码视频、抓帧截图、转 GIF - 掘金 (juejin.cn)](https://juejin.cn/post/7358388858305970212)

[WebCodecs 的使用，注意事项以及基本音视频相关原理 - 掘金 (juejin.cn)](https://juejin.cn/post/7349028634826833983)

[WebCodecs 视频导出实践 - 掘金 (juejin.cn)](https://juejin.cn/post/7155463807115116574)

[WebCodecs —— 5G 时代最值得学习的 “低层次” 音视频编解码 API - 掘金 (juejin.cn)](https://juejin.cn/post/7064408938351427591)

[Web 音视频 (基于 WebCodecs 在浏览器中处理音视频数据) - 风痕\_hughfenghen 的专栏 - 掘金 (juejin.cn)](https://juejin.cn/column/7259193729172815928)

## 基于 WebCodecs 构建的纯 Web 音视频处理SDK

项目地址：https://github.com/hughfenghen/WebAV
尝试提供简单易用的 API 在浏览器中处理音视频数据
支持视频、音频、图片、文字等素材

**DEMO**

画布添加各种素材，可录制导出MP4：https://hughfenghen.github.io/WebAV/demo/record-avcanvas.html
SDK合并MP4与各种素材：https://hughfenghen.github.io/WebAV/demo/concat-media.html
录制摄像头麦克风，导出MP4：https://hughfenghen.github.io/WebAV/demo/record-usermedia.html
解码音视频、动图等：https://hughfenghen.github.io/WebAV/demo/decode-media.html

# Web 音视频知识图谱

[音视频 Web API 图谱](https://www.processon.com/view/link/661b519329eb742733da24fb?cid=661b50541c0cb632e514c499)

## 介绍

整理 Web 音视频相关的 API、SDK、文章、对外产品，帮助前端开发者入门/进阶音视频领域，推动 Web 音视频技术的应用实践。

## 动机

音视频技术在 Web 平台应用有限，资料也相对较少，Web 平台处理音视频的基础能力已具备，但未被大部分从业人员所熟知。

由于涉及的 Web API 非常多，所以先整理一份音视频相关的 API 知识图谱，降低在 Web 平台开发音视频应用的门槛；
然后，索引互联网公开的文章、工具、开源项目，目标是让前端开发初学者也能通过自学，掌握在 Web 平台开发音视频应用的基础技能。


