import{_ as e,c as r,b as t,g as p}from"./chunks/framework.WHv14AEj.js";const u=JSON.parse('{"title":"单片机串口调用模块实践","description":"","frontmatter":{"title":"单片机串口调用模块实践","date":"2024-12-20T19:38:15.000Z","copyright":true,"tags":"学习笔记 嵌入式"},"headers":[],"relativePath":"posts/51stc_uart.md","filePath":"posts/51stc_uart.md"}'),i={name:"posts/51stc_uart.md"};function o(n,a,s,l,h,d){return t(),r("div",null,a[0]||(a[0]=[p('<h1 id="单片机串口调用模块实践" tabindex="-1">单片机串口调用模块实践 <a class="header-anchor" href="#单片机串口调用模块实践" aria-label="Permalink to &quot;单片机串口调用模块实践&quot;">​</a></h1><p>​ 这是一篇关于微机原理课程结课设计的一些总结，使用51单片机的串口通讯调用WIFI模块esp-01进行多设备间通讯。</p><p>​ 本来似乎可以使用物联网的开发环境进行，但是我们做的东西比较少，因此仅使用模块自带的AT指令集。</p><p>​ 课设主要分为三个部分：1. 目标功能 2. 硬件设计 3. 软件设计</p><h3 id="目标功能" tabindex="-1">目标功能 <a class="header-anchor" href="#目标功能" aria-label="Permalink to &quot;目标功能&quot;">​</a></h3><p>​ 设计一个实物作为热点发送wifi信号，同时也作为服务器监听该WiFi局域网下的某个ip的某个端口。当其他设备连接上该WiFi并向这个端口发送信息时，服务器处理信息并向发送信息的设备返回响应。（因为目前没想好其实际用途，响应就直接返回搜到的内容）</p><h3 id="硬件设计" tabindex="-1">硬件设计 <a class="header-anchor" href="#硬件设计" aria-label="Permalink to &quot;硬件设计&quot;">​</a></h3><p>元件：ESP01S WIFI模块、AMS1117电源稳压模块、51单片机以及CH341A USB转TTL模块。</p><p>电路设计分为两个部分，分别是51单片机最小系统和WIFI模块。</p><h5 id="_51单片机最小系统" tabindex="-1">51单片机最小系统 <a class="header-anchor" href="#_51单片机最小系统" aria-label="Permalink to &quot;51单片机最小系统&quot;">​</a></h5><p>由晶振电路、复位电路、通信串口、指示灯等四个关键部分组成。</p><ol><li>使用11.0592 MHz晶振和两个30pF电容连接至单片机的XTAL1和XTAL2引脚，形成稳定的时钟信号。</li><li>采用电阻-电容（RC）复位电路方案，通过一个高阻值电阻（设计中选用1 kΩ）和一个低容值电容（设计中选用10 µF）连接至单片机的RST引脚。</li><li>使用P2.0-P2.6作为7个指示灯的控制管脚。</li></ol><h5 id="esp8266-esp-01-wifi模块" tabindex="-1">ESP8266-ESP-01 WIFI模块 <a class="header-anchor" href="#esp8266-esp-01-wifi模块" aria-label="Permalink to &quot;ESP8266-ESP-01 WIFI模块&quot;">​</a></h5><p>从WIFI模块实物图中可以看到，WIFI模块提供了一个2*4的外接管脚，让我们连接到自己的电路中控制，这8个管脚功能定义如下：</p><p>(1) VCC：3.3V 电源。</p><p>(2) RST：ES8266 复位管脚，可做外部硬件复位使用。</p><p>(3) CH_PD：使能管脚，高电平有效。</p><p>(4) UTXD：串口发送管脚，与开发板上串口的RXD相连。</p><p>(5) URXD：串口接收管脚，与开发板上串口的TXD相连。</p><p>(6) GPIO0：GPIO0 为高电平代表从 FLASH 启动，GPIO0 为低电平代表进入系统升级状态，此时可以经过串口升级内部固件。</p><p>(7) GPIO2：此管脚为ESP8266引出的一个IO口。</p><p>(8) GND：GND 管脚。</p><p><img src="https://resource-un4.pages.dev/article/image-20241220200415596.png" alt="esp-01s模块示意图"></p><h5 id="稳压模块" tabindex="-1">稳压模块 <a class="header-anchor" href="#稳压模块" aria-label="Permalink to &quot;稳压模块&quot;">​</a></h5><p>​ 稳压模块选用USB-5P 12V电压转5V、3.3VAMS1117稳压模块，该模块可作为MINIUSB接口转接板使用，MINIUSB母座的引均引出到焊盘。从MINIUSB接囗通过数据线输入5V电压，+5V焊点输出电压5V，3v3焊点输出电压3.3V。MINI USB接口也可以通过数据线或者从DC005电源座接口输入5-12V电压输入5-12V电压，依旧是+5V焊点输出电压等于输入5V，3.3V焊点输出电压3.3V。此外，该稳压模块具有电源指示灯。</p><p>​ 针对51单片机需要5V电压供电的需求，我们将AMS1117模块输出的5V电压直接连接至51单片机的VCC引脚，以确保其正常工作。同时，考虑到ESP01S WIFI模块工作在3.3V电压下的特性，我们将AMS1117模块输出的3.3V电压连接至WIFI模块的VCC引脚，以满足其工作电压要求。</p><h5 id="实物" tabindex="-1">实物 <a class="header-anchor" href="#实物" aria-label="Permalink to &quot;实物&quot;">​</a></h5><p>设计如下：</p><p><img src="https://resource-un4.pages.dev/article/image-20241220200616026.png" alt="设计图"></p><p>实际焊接结果如下：</p><p><img src="https://resource-un4.pages.dev/article/image-20241220200809702.png" alt="实物焊接"></p><h3 id="软件设计" tabindex="-1">软件设计 <a class="header-anchor" href="#软件设计" aria-label="Permalink to &quot;软件设计&quot;">​</a></h3><p>软件设计主要三步走：<strong>模块调试</strong>、<strong>代码编写</strong>、<strong>刷入程序</strong></p><h4 id="模块调试" tabindex="-1">模块调试 <a class="header-anchor" href="#模块调试" aria-label="Permalink to &quot;模块调试&quot;">​</a></h4><p>为了能够调用模块功能和处理模块的响应，我们需要先调试模块<strong>以了解模块的响应特性和验证功能完整</strong>。模块不同的固件可能会有不同的响应，而且手册给的指令集的响应结果也不会显示回车\\r 换行\\n等特殊字符，但我们处理时，需要对这些字符进行处理，因此我们会将响应的ASCII码转换为hex16进制下看结果。</p><h5 id="模块连接测试" tabindex="-1">模块连接测试 <a class="header-anchor" href="#模块连接测试" aria-label="Permalink to &quot;模块连接测试&quot;">​</a></h5><p>CH341A 的TXD RXD分别连接ESP8266 RXD, TXD. 使用串口调试助手设置模块的默认波特率。输入AT(\\r\\n)。</p><p>其hex如下：</p><p>AT\\r\\n : 41 54 0D 0A</p><p>\\r\\nOK\\r\\n : 0D 0A 4F 4B 0D 0A</p><h5 id="调整波特率" tabindex="-1">调整波特率 <a class="header-anchor" href="#调整波特率" aria-label="Permalink to &quot;调整波特率&quot;">​</a></h5><p>响应：</p><p>AT+UART_DEF=9600,8,1,0,0\\r\\n : 41 54 2B 55 41 52 54 5F 44 45 46 3D 39 36 30 30 2C 38 2C 31 2C 30 2C 30 0D 0A</p><p>\\r\\nOK\\r\\n : 0D 0A 4F 4B 0D 0A</p><h5 id="ap模式设置" tabindex="-1">AP模式设置 <a class="header-anchor" href="#ap模式设置" aria-label="Permalink to &quot;AP模式设置&quot;">​</a></h5><p>AT+CWMODE=2\\r\\n : 41 54 2B 43 57 4D 4F 44 45 3D 32 0D 0A</p><p>\\r\\nOK\\r\\n : 0D 0A 4F 4B 0D 0A</p><h5 id="配置服务主机ip地址和监听端口" tabindex="-1">配置服务主机IP地址和监听端口 <a class="header-anchor" href="#配置服务主机ip地址和监听端口" aria-label="Permalink to &quot;配置服务主机IP地址和监听端口&quot;">​</a></h5><p>设置WIFI的IP名为192.168.4.1</p><p>AT+CIPAP=&quot;192.168.4.1&quot;</p><p>开启TCP 服务器模式，监听端口 8080，等待客户端连接</p><p>&quot;AT+CIPSERVER=1,8080&quot;</p><p>使WIFI模块开启多连接模式</p><p>AT+CIPAP=&quot;192.168.4.1&quot;</p><h5 id="等待收到网络信息" tabindex="-1">等待收到网络信息 <a class="header-anchor" href="#等待收到网络信息" aria-label="Permalink to &quot;等待收到网络信息&quot;">​</a></h5><p>成功配置了 TCP 服务器并启动监听端口后，模块将等待客户端连接并发送数据。当客户端发送数据时，模块会接收到这些数据，并返回相应的响应。例如，客服发送了数据“123456789”，模块接收到数据后，会返回响应“+IPD,0,9:123456789”，响应的ASCII码为：</p><p>0D 0A 2B 49 50 44 2C 30 2C 39 3A 31 32 33 34 35 36 37 38 39</p><p>可见区别于指令的响应，搜到网络消息的指令响应只有前面的0D0A（\\r\\n），而没有后面的结束符，因此在处理串口消息时，需要自己写代码判断消息是否结束，并主动处理。</p><h5 id="发送信息" tabindex="-1">发送信息 <a class="header-anchor" href="#发送信息" aria-label="Permalink to &quot;发送信息&quot;">​</a></h5><p>AT+CIPSEND=0,5 这个命令将告诉模块即将向信道1发送5个字符的消息，待</p>',60)]))}const I=e(i,[["render",o]]);export{u as __pageData,I as default};
