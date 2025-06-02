export default {
  // VitePress 站点基本配置,必填，允许留空
  site_name: "My Awesome Site",
  site_description: "这是一个使用 VitePress 构建的文档站点。",
  site_url: "/",
  author: '57Darling02',
  defaultFocusMode: false, // 是否默认开启焦点模式
  isDark: null, // 是否默认开启深色模式, null 则会跟随系统
  // 首页配置
  home: {
    mainTitle: "My Awesome Site",
    subTitles: ['世界上只有一种英雄主义', '那就是在认清生活的真相后', '依然热爱生活'],//打字机效果的副标题，使用字符串列表
  },
  background: '/wallpaper/1.webp',
  pageSize: 8, //首页文章列表分页大小，默认为8


  // 侧边简介卡
  avatar: "https://resource-un4.pages.dev/article/yjtp.webp", //头像地址
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
  },
  //菜单栏
  menuToc: true, //是否显示文章目录
  menuItems: [
    {
      label: '好用的网站',
      icon: 'fa-solid fa-browser',
      children: [
        {
          key: 'action1',
          label: '课程平台青春版',
          icon: 'fa-solid fa-browser',
          link: 'https://course.bjtu.top'
        },
        
      ]
    },
    {
      label: '更多',
      icon: '',
      children: [
        {
          key: 'action1',
          label: '标签',
          icon: 'fa-solid fa-tags',
          link: '/Tags/'
        },
      ]
    },
    
  ],
}