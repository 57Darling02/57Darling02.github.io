---
title: BJTU课程平台漏洞大赏
date: 2025-04-01 01:47:53
tags: 瞎捣鼓
---
# BJTU课程平台漏洞

（新）课程平台，网页技术不知道多少年前的。

**规范的函数命名：**

![image-20250401025622933](https://resource-un4.pages.dev/article/image-20250401025622933.png)

**源码带注释：**

![image-20250402202115199](https://resource-un4.pages.dev/article/image-20250402202115199.png)

（会不会是中学生的作业课设直接偷来用了？🤔）



**废弃功能保留：**

用不到的功能按钮增加一个hidden属性，只隐藏不删除。

![image-20250401021641536](https://resource-un4.pages.dev/article/image-20250401021641536.png)



**用户权限不分离：**

是不是教师权限看全看找不找得到接口🤓。至于谁的id调用的接口，完全不管。

（老师是我，还是我是老师？）

经测试，学生能够通过漏洞完成：

- 修改作业信息

![image-20250402195919687](https://resource-un4.pages.dev/article/image-20250402195919687.png)

（交晚了？我交的时候还没截至啊😏）

- 发布作业

![image-20250402201831143](https://resource-un4.pages.dev/article/image-20250402201831143.png)

(喜欢写作业？多给你布置点😤)

- 删除作业

	![image-20250402201911910](https://resource-un4.pages.dev/article/image-20250402201911910.png)

（我真不想写了，大家都先别写😇）

- 发布、删除课件

![f869a59815a32ab7df460e8faf8cc46](https://resource-un4.pages.dev/article/f869a59815a32ab7df460e8faf8cc46.png)

- 修改课程平台回放视频

![image-20250402192303013](https://resource-un4.pages.dev/article/image-20250402192303013.png)

（没字幕我给你们加😀）

- 查看课程情况统计

（让我看看谁是卷王🤨）



