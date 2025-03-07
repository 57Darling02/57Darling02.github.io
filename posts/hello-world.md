---
title: Hello World！ 
date: 2024-01-25 15:35:57
cover: https://resource-un4.pages.dev/yspic/dm1.webp
tags: 瞎捣鼓
copyright: true
copyright_author: Fomalhaut
copyright_url: https://www.fomal.cc/posts/4aa2d85f.html
copyright_info: 转载，我抄了我可能会用到的
---

# 你好，世界！

### post代码格式

``` Markdown
--- 
title: bx
date: 2024-01-25 15:35:57
updated: 2024-01-25 15:35:57
tags: 
categories: 
keywords: 
description: 
top_img: 【可选】文章顶部图片
comments:
cover: 【可选】文章缩略图(如果没有设置top_img,文章页顶部将显示缩略图，可设为false/图片地址/留空)
toc:
toc_number:
toc_style_simple:
copyright:
copyright_author:
copyright_author_href: 作者链接
copyright_url:
copyright_info: 	【可选】文章版权模块的版权声明文字
mathjax:
katex:
aplayer:
highlight_shrink:
aside:
--- 
```
# Page Front-matter：
```md

--- 

title: Hello World！ 
date: 2024-01-25 15:35:57
updated: 2024-01-25 15:35:57
type: 
comments: #【可选】显示页面评论模块(默认 true)
description:
keywords:
top_img: 【可选】页面顶部图片
mathjax:
katex:
aside: 【可选】显示侧边栏 (默认 true)
aplayer: 【可选】在需要的页面加载aplayer的js和css,请参考文章下面的音乐 配置

highlight_shrink: 【可选】配置代码框是否展开(true/false)(默认为设置中highlight_shrink的配置)
--- 

```
| 写法 | 解释     |
| -------- | -------- |
| title    | 【必需】页面标题 |
| date     | 【必需】页面创建日期 |
| type      | 【必需】标籤、分类和友情链接三个页面需要配置  |

# 代码块演示
```shell
# VSCode终端
hexo clean; hexo s
hexo clean; hexo g; hexo d
git add .; git commit -m "npm publish"; npm version patch; 
git push
# Cmder终端
hexo clean && hexo s
hexo clean && hexo g && hexo d
git add . && git commit -m "npm publish" && npm version patch
git push
```

# 多级标题

# H1

## H2

### H3

#### H4

##### H5

###### H6

```
# H1
## H2
### H3
#### H4
##### H5
###### H6
```

# 文字样式

<u>下划线演示</u>

文字**加粗**演示

文字*斜体*演示

文本`高亮`演示

文本~~删除~~线演示

<font size = 5>5号字</font>
<font face="黑体">黑体</font>
<font color=blue>蓝色</font>

<table><tr><td bgcolor=MistyRose>这里的背景色是：MistyRosen，此处输入任意想输入的内容</td></tr></table>

```
<u>下划线演示</u>

文字**加粗**演示

文字*斜体*演示

文本`高亮`演示

文本~~删除~~线演示

<font size = 5>5号字</font>
<font face="黑体">黑体</font>
<font color=blue>蓝色</font>

<table><tr><td bgcolor=MistyRose>这里的背景色是：MistyRosen，此处输入任意想输入的内容</td></tr></table>
```

>  Java
>  二级引用演示
>  MySQL
>
>  >外键
>  >
>  >事务
>  >
>  >**行级锁**(引用内部一样可以用格式)
>
>  ....

# 无序列表

* Java
* Python
* ...

+ Java
+ Python
+ ...

- Java
- Python
- ...

