export default {
    // VitePress 站点基本配置,必填，允许留空
    site_name: "57Darling02's Blog",
    site_description: "哈哈哈哈呵呵呵呵",
    site_url: "/",
    author: '57Darling02',

    // 首页配置
    home: {
        mainTitle: "57Darling02's Blog",
        subTitles: ['世界上只有一种英雄主义', '那就是在认清生活的真相后', '依然热爱生活', '如果你抑郁了，说明你活在过去', '如果你焦虑了，说明你活在未来', '当你平静了，你才活在当下。'],//打字机效果的副标题，使用字符串列表
    },
    background: '/wallpaper/1.webp',
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
        },
        {
            name: '课程平台',
            icon: 'fal fa-browser',
            url: 'https://course.bjtu.top'
        },
        {
            name: 'alist云盘',
            icon: 'fa-light fa-cloud',
            url: 'https://alist.57d02.cn'
        },
    ],
    footer: {
        message: 'Released under the MIT License.',
        copyright: "Copyright © 2025-present 57Darling02's Blog"
    },
    // 即将完成的配置
    nav: [
        { text: '首页', link: '/' },
        { text: '指南', link: '/guide/' },
    ],
    sidebar: {
        '/guide/': [
            {
                text: '指南',
                items: [
                    { text: '介绍', link: '/guide/introduction' },
                    { text: '安装', link: '/guide/installation' }
                ]
            }
        ]
    },
}