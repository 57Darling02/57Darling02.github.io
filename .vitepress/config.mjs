import { defineConfig } from 'vitepress'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import mathjax3 from 'markdown-it-mathjax3'
const customElements = [
	'mjx-container',
    'mjx-assistive-mml',
	'math',
	'maction',
	'maligngroup',
	'malignmark',
	'menclose',
	'merror',
	'mfenced',
	'mfrac',
	'mi',
	'mlongdiv',
	'mmultiscripts',
	'mn',
	'mo',
	'mover',
	'mpadded',
	'mphantom',
	'mroot',
	'mrow',
	'ms',
	'mscarries',
	'mscarry',
	'mscarries',
	'msgroup',
	'mstack',
	'mlongdiv',
	'msline',
	'mstack',
	'mspace',
	'msqrt',
	'msrow',
	'mstack',
	'mstack',
	'mstyle',
	'msub',
	'msup',
	'msubsup',
	'mtable',
	'mtd',
	'mtext',
	'mtr',
	'munder',
	'munderover',
	'semantics',
	'math',
	'mi',
	'mn',
	'mo',
	'ms',
	'mspace',
	'mtext',
	'menclose',
	'merror',
	'mfenced',
	'mfrac',
	'mpadded',
	'mphantom',
	'mroot',
	'mrow',
	'msqrt',
	'mstyle',
	'mmultiscripts',
	'mover',
	'mprescripts',
	'msub',
	'msubsup',
	'msup',
	'munder',
	'munderover',
	'none',
	'maligngroup',
	'malignmark',
	'mtable',
	'mtd',
	'mtr',
	'mlongdiv',
	'mscarries',
	'mscarry',
	'msgroup',
	'msline',
	'msrow',
	'mstack',
	'maction',
	'semantics',
	'annotation',
	'annotation-xml',
];
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "57Darling02's Blog",
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
    mainTitle: "57Darling02's Blog",
    subTitles: ['如果你抑郁了，说明你活在过去', '如果你焦虑了，说明你活在未来', '当你平静了，你才活在当下。'],
    defaultauthor: '57Darling02',
    // 网站顶部导航栏配置
    logo: "https://resource-un4.pages.dev/article/yjtp.webp",
    siteTitle: '57Darling02',
    menuItems: [
      {
        label: '我的网站',
        icon: 'fal fa-browser',
        children: [
          {
            key: 'action1',
            label: 'BJTU课程平台青春版',
            icon: 'fa-light fa-cloud',
            link: 'https://course.bjtu.top'
          },
          {
            key: 'action2',
            label: '闪装智拼',
            icon: 'fa-light fa-cubes',
            link: 'https://box.57d02.cn'
          },
          {
            key: 'action3',
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
      }
      
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
    vue: {
      template: {
        compilerOptions: {
          isCustomElement: (tag) => customElements.includes(tag),
        }
      }
    }
  },
  markdown: {
    config: (md) => {
      md.use(mathjax3);
    },
    image: {
      // 默认禁用；设置为 true 可为所有图片启用懒加载。
      lazyLoading: true
    }
  },
  
})

