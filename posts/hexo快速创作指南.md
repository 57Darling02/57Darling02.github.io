---
title: hexo快速创作指南 
date: 2024-02-17 20:25:41
tags: 瞎捣鼓
cover: https://resource-un4.pages.dev/yspic/dm2.webp
copyright: true
---

## 基本设置

1. 下载hexo快速创作：

	这玩意的诞生可见 [如何写一篇hexo博客](https://57d02.cn/2024/01/29/%E5%A6%82%E4%BD%95%E5%86%99%E4%B8%80%E7%AF%87hexo%E5%8D%9A%E5%AE%A2/)

	代码仓库：[GitHub](https://github.com/57Darling02/Typor-with-hexo)

	下载地址：[Github](https://github.com/57Darling02/Typor-with-hexo/raw/main/dist/main.zip)，[百度云盘](https://pan.baidu.com/s/12UKEueoSrfS_SRxhtyqwoQ?pwd=4p62)

2. 设置编辑器：

	这个工具只是脚本工具，不自带编辑器。因此他需要指定外部编辑器：这里推荐Typora，当然选择vscode，word甚至记事本都行，可以直接选择桌面的快捷方式。或是相应编辑器下的exe文件。

3. 设置hexo根目录：确保其下层目录存在source文件夹

## 其他设置

- 模板model.md文件设置：程序根目录下resource中存在model.md文件，其中$TITLE$ 和$TIME$ 将会被替换成文件名和创建文件的具体时间。当然你也可以在程序根目录下config文件夹中的config.ini中替换模板文件的相对地址。
- 自定义按钮执行的脚本：程序根目录下config文件夹中的config.ini中存放按钮及其执行的shell代码。根据实际需要进行修改即可。
- 编辑器和hexo根目录可以在右上角设置中更改。
- 脚本按钮左下角的开关为控制台输出的显示开关，仅有输出功能，输入no。
- 脚本按钮右下角为hexo server开关，打开相当于hexo s或hexo server ,但是无法使用crtl+c进行停止，请再次点击右下角按钮以停止（相当于crtl +c 命令）

## 后记

​	很多东西没写，因为我用不到了。很多功能很鸡肋，比如卡死，闪退或者没效果等等。可以尝试按下stop all process 按钮或再次尝试，或者关闭软件重启试试，以上。





