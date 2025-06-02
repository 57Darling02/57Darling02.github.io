# VitePress-Butterfly 主题

基于VitePress和Element Plus的卡片式仿butterfly主题。

示例站点：[模板站点](https://vitepress.57d02.cn/)

[57Darling02's Blog](https://57darling02.github.io/)

##  特色

- 深浅色主题样式、专注模式专注内
- 静态资源自动优化，不需要图床也能够插入图片

##  快速开始（简单部署）

#### **1. Fork 仓库并克隆到本地**

点击 GitHub 上的 **Fork** 按钮，给你的仓库起名（如your-username.github.io），然后克隆到本地：

```bash
git clone https://github.com/your-username/your-username.github.io.git
cd VitePress_butterfly
```

#### 2. 修改配置

将网站变成你的形状😤修改 site_config.ts进行主题配置信息，更改首页背景图、网站名称、侧边栏个人信息等等。具体配置见下文。

#### 3.写一篇文章

在posts/文件夹中创建helloworld.md,内容如下：

```markdown
---
title: 文章标题
date: 2024-03-20
author: 作者
layout: doc # 这行不写也行，涉及到自定义页面才会涉及
---

# Hello World!
这是一篇文章，蛤蛤蛤！！！外币巴伯....

```

 **上传到GitHub**

```
git add . && git commit -m "update" && git push -f origin main
```

可以直接点击脚本



#### （可选，如果你仅仅使用默认样式，请跳过）预览文章

确保你有nodejs环境后，在命令行完成：

##### 安装依赖

```cmd
npm install
```

##### 打包

```
npm run docs:build
```

##### 预览
```
npm run preview
```



#### 4.部署（二选一）

##### 工作流（推荐）

1. 打开.github workflow 复制deploy.yml内容
    ![image-20250310101611742](https://resource-un4.pages.dev/article/image-20250310101611742.png)

1. 在github page 创建工作流自己的工作流：

	会让创建一个文件，命名为mydeploy.yml，粘贴从deploy.yml复制的内容，提交。

1. 等待。

>  优点：后续修改posts文件夹内容，site_config.ts后，只需要上传即可。

##### 本地构建

> 该方式需要你手动打包，并让github部署

1. 构建生产版本

```bash
npm run build
```
>  注意：这里build将打包到最外边docs文件夹中

2. 上传到github

3. 配置GitHub Page，选择docs

![1741082221235](https://resource-un4.pages.dev/article/1741082221235.png)

4. 后续每次修改配置和文章，都要打包构建并上传到github

## 主题更新

#### 直接更新：运行update_theme.sh

> 这将仅保留 "posts/" "site_config.ts"  "public/"  ".github/"，其余文件将被覆盖。如果只修改了以上文件，简单更新即可。

更新的文件会拉到本地，请上传至你的github仓库触发更新.

```
git add . && git commit -m "update" && git push -f origin main
```



#### 手动更新，同步仓库并合并冲突

## 配置指南

修改根目录下的 site_config.ts进行主题配置：内容可参考.vitepress目录中的模板site_config_template.ts。可将其重命名复制到根目录下的 site_config.ts。

> 注意，修改模板没什么效果，还可能导致你更新主题时面临合并问题。


```javascript
export default {
    // VitePress 站点基本配置,必填，允许留空
    site_name: "My Awesome Site",
    site_description: "这是一个使用 VitePress 构建的文档站点。",
    site_url: "/",
    author: '57Darling02',
    
    // 首页配置
    home:{
        mainTitle:"My Awesome Site",
        subTitles:['世界上只有一种英雄主义','那就是在认清生活的真相后','依然热爱生活'],//打字机效果的副标题，使用字符串列表
    },
    background:'/wallpaper/1.webp',//背景图片
    pageSize:8, //首页文章列表分页大小，默认为8
    
    // 侧边简介卡
    avatar: "https://resource-un4.pages.dev/article/yjtp.webp",
    name: '57Darling02',
    position: '全栈开发、优化算法爱好者',
    bio: '红红火火恍恍惚惚',
    socialLinks: [
      {
        name: 'GitHub',
        icon: 'fa-brands fa-github',
        url: 'https://github.com/57Darling02/'
      }
    ],
    footer: {
        message: 'Released under the MIT License.',
        copyright: 'Copyright © 2025-present My Awesome Site'
    }
}

```
### 目录结构

```plainText
Blog/                   # 项目根目录
├── .vitepress/         # 主题组件 不会为这部分提供文档 (一般不用动)
│   ├── theme/
│   ├── site_config.ts  # 模板文件，可以复制到根目录下修改使用          
│   ├── config.mjs   
│   ├── index.js
│   └── ...   
├── site_config.ts     # 站点配置 自定义的配置，主要修改这个文件来配置站点信息
├── posts/             # Markdown文章 文章放这里
├── public/            # 静态资源 例如背景图片，例如 public/a.png 则配置中对应 /a.png
└── package.json       # 依赖配置 (一般不用动)
```
### 文章规范

图片使用相对路径即可。建议使用typra编辑器，可以方便的插入相对路径图片

```markdown
---
title: 文章标题
date: 2024-03-20
author: 作者
cover: url...
layout: doc # 可选布局
---
```
贡献
欢迎贡献代码和反馈问题。

