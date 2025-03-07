---
title: KSWEB
date: 2024-01-25 18:03:50
tags: 瞎捣鼓
cover: https://resource-un4.pages.dev/yspic/Marx&Engels.webp
copyright: true
---

# KSWEB？“闲人”的玩具！

闲的没事搜了一下低成本制作服务器，直接发现新大陆！

<div align=center class="aspect-ratio">
    <iframe src="https://player.bilibili.com/player.html?aid=508003641&&page=1&as_wide=1&high_quality=1&danmaku=0&autoplay=0" 
    scrolling="no" 
    border="0" 
    frameborder="no" 
    framespacing="0" 
    high_quality=1
    danmaku=1 
    allowfullscreen="true"> 
    </iframe>
</div>
## KSWEB介绍

> ​	KSWEB是由俄罗斯公司基于Android开发的一款非常强大且好用的手机服务器软件，该软件内容丰富，可为广大用户提供Web服务器、FTP服务器、PHP编程语言、MySQL数据库等服务，有了它，大家就可以让手机立马变成一个可移动的服务器，从而不需要在电脑上安装各种虚拟机或者服务器文件。通过KSWEB进行配置后的服务器，无论是查看链接数量、日志文件和外网访问地址等等详细的信息还是打开音乐、图片、视频等资源都可以快速访问，没有任何的流量限制。
>
> 如果你是新手，如果你没有经验，如果你只想在本地测试一些程序，如果你不想在电脑上装上各种虚拟机或者服务器文件，如果你手上有闲置的安卓手机，如果你想体验国内免备案飞一般的速度……有了它，我们可以最大化的利用闲置资源，有了它，我们可以各种免费的折腾，有了它，你可以把所有的外链都放到手机里，这样既不会担心某一天外链挂掉，也可以让外链的音乐，视频，图片完全瞬间打开，没有任何流量限制。一键安装，迅速快捷，无需各种操作，充分利用闲置资源，完全适合各种折腾控，兼容主流PHP程序，可以作为直接或间接的生产环境。

只要一台手机，我们可以做到：

- 搭建自己的局域网博客：连上自家的网络，可以飞快链接自己的博客（如果你的博客根本不需要开放，仅仅是作为记录）。当我们想创作时，连上WiFi或者打开热点就可以打开创建在自己手机上的博客。
- 移动端小型数据库，KSWEB自带了Mysql数据库，同时附带管理工具phpMyAdmin.把数据库放在手机上时，我们学习数据库相关课程时就能够直接通过手机热点连接localhost:3306端口进行数据库操作，从而避免了安装配置环境的各种麻烦。（我想起刚刚学习数据库时，在电脑上安装数据库和配置环境就花了我一个下午+一天晚上-(ㄒ^ㄒ)-,别骂我，我笨）
- 网站测试：比如相当于hexo s。KSWEB自带Nginx反向代理和apache.对于啥也不懂小白选手我来说，这就是一个有源码就能建站的神器呀。

> Apache(音译为[阿帕奇](https://baike.baidu.com/item/阿帕奇/374191?fromModule=lemma_inlink))是世界使用排名第一的Web服务器软件。它可以运行在几乎所有广泛使用的[计算机平台](https://baike.baidu.com/item/计算机平台/2606037?fromModule=lemma_inlink)上，由于其[跨平台](https://baike.baidu.com/item/跨平台/8558902?fromModule=lemma_inlink)和安全性被广泛使用，是最流行的Web服务器端软件之一。它快速、可靠并且可通过简单的API扩充，将[Perl](https://baike.baidu.com/item/Perl/0?fromModule=lemma_inlink)/[Python](https://baike.baidu.com/item/Python/0?fromModule=lemma_inlink)等[解释器](https://baike.baidu.com/item/解释器/10418965?fromModule=lemma_inlink)编译到服务器中。
>
> 反向代理服务器位于用户与目标服务器之间，但是对于用户而言，反向代理服务器就相当于目标服务器，即用户直接访问反向代理服务器就可以获得目标服务器的资源。同时，用户不需要知道目标服务器的地址，也无须在用户端作任何设定。反向代理服务器通常可用来作为Web加速，即使用反向代理作为Web服务器的前置机来降低网络和服务器的负载，提高访问效率。
>
> Nginx是一款轻量级的[Web](https://baike.baidu.com/item/Web/150564?fromModule=lemma_inlink) 服务器/[反向代理](https://baike.baidu.com/item/反向代理/7793488?fromModule=lemma_inlink)服务器及[电子邮件](https://baike.baidu.com/item/电子邮件/111106?fromModule=lemma_inlink)（IMAP/[POP3](https://baike.baidu.com/item/POP3/175122?fromModule=lemma_inlink)）代理服务器，在[BSD](https://baike.baidu.com/item/BSD/3794498?fromModule=lemma_inlink)-like 协议下发行。其特点是占有内存少，并发能力强，事实上nginx的并发能力在同类型的[网页](https://baike.baidu.com/item/网页/99347?fromModule=lemma_inlink)服务器中表现较好。

​	如果你不想止于局域网，那不妨试试**内网穿透**！

## 内网穿透

简单理解：网中之网向外层穿透。让你在不连接内网的情况下访问处于内网下的设备。

在内网穿透软件Zerotier的介绍视频中讲解了相关原理：

<div align=center class="aspect-ratio">
    <iframe src="https://player.bilibili.com/player.html?bvid=BV1oL411Y7pB&cid=1108384856&&page=1&as_wide=1&high_quality=1&danmaku=0&autoplay=0" s
    scrolling="no" 
    border="0" 
    frameborder="no" 
    framespacing="0" 
    high_quality=1
    danmaku=1 
    allowfullscreen="true"> 
    </iframe>
</div>

#### 推荐：樱花内穿（Android可完全实例）

通过手机在后台同时运行SakuraFrp启动器和KSWEB，成功将手机变成了服务器。

[樱花内穿官网](https://www.natfrp.com/)

注册好后创建隧道（去搜搜大概知道了），在启动器中使用密钥登入，挂后台即可。值得一提的是，使用国内隧道节点只能TCP传输连接。可连接数据库（约等于有了自己的云数据库😎），但网站连接是不行的。同时，国外节点可以使用https或http协议进行穿透（可以建站），但速度嘛。。一言难尽。
