import { defineConfig } from 'vitepress'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "VitePress-Butterfly",
  description: "VitePress-Butterfly",
  head: [
    // 添加图标
    ['link', { rel: 'icon', href: '/favicon.ico' },
      {
        rel: 'preload',
        href: '/font/ZhuZiAWan2.woff2',
        as: 'font',
        type: 'font/woff2',
        crossorigin: 'anonymous'
      }]
  ],
  themeConfig: {
    // 首页配置
    mainTitle: '57D02',
    subTitles: ['全栈开发爱好者', '算法优化爱好者', '软件开发爱好者', '安卓与嵌入式开发爱好者'],
    defaultauthor: '57D02',
    // 网站顶部导航栏配置
    logo: "https://resource-un4.pages.dev/article/yjtp.webp",
    siteTitle: '57D02',
    menuItems: [
      {
        label: '我的网址',
        icon: 'fal fa-browser',
        children: [
          {
            key: 'action1',
            label: '闪装智拼',
            icon: 'fa-light fa-cubes',
            link: 'https://box.57d02.cn'
          },
          {
            key: 'action2',
            label: 'alist云盘',
            icon: 'fa-light fa-cloud',
            link: 'https://alist.57d02.cn'
          },
        ]
      },
      {
        label: '更多功能',
        icon: 'fa-solid fa-list',
        children: [
          {
            key: 'action1',
            label: '付费CSDN解析',
            icon: 'fa-light fa-magnifying-glass-chart',
            link: 'https://mark.cuckooing.cn/'
          },
          {
            key: 'action2',
            label: '关于',
            icon: 'fa-light fa-address-card',
            link: 'About'
          },
          {
            key: 'music',
            label: '音乐',
            icon: 'fa-light fa-music',
            link: '/music/'
          },
          {
            key: 'movies',
            label: '电影',
            icon: 'fa-light fa-video',
            link: '/movies/'
          },
          {
            key: 'archives',
            label: '归档',
            icon: 'fa-light fa-archive',
            link: '/archives/'
          },
          {
            key: 'tags',
            label: '标签',
            icon: 'fa-light fa-tags',
            link: '/Tags/'
          },
          {
            key: 'categories',
            label: '分类',
            icon: 'fa-light fa-folder-open',
            link: '/categories/'
          },
          {
            key: 'link',
            label: '链接',
            icon: 'fa-light fa-link',
            link: '/link/'
          }
        ]
      }

    ],
    // 侧边信息栏配置
    avatar: "https://resource-un4.pages.dev/article/yjtp.webp",
    name: '57D02',
    position: '全栈开发、优化算法爱好者',
    bio: '红红火火恍恍惚惚',
    socialLinks: [
      {
        name: 'GitHub',
        icon: 'fa-brands fa-github',
        url: 'https://github.com/57Darling02/'
      },
      {
        name: '邮箱',
        icon: 'fa-regular fa-envelope',
        url: '57Darling02@outlook.com'
      },
    ],
    // 站点页脚配置
    footer: {
      message: "VitePress",
      copyright: "Copyright © 2025-present 57D02",
    },
  },
  vite: {
    ssr: {
      noExternal: ['element-plus']
    },
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
      
    ], 
  },
  
})
