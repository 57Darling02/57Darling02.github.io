// .vitepress/config.mts
import { defineConfig } from "file:///D:/myCode/VitePress-Butterfly/node_modules/vitepress/dist/node/index.js";
import AutoImport from "file:///D:/myCode/VitePress-Butterfly/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///D:/myCode/VitePress-Butterfly/node_modules/unplugin-vue-components/dist/vite.js";
import { ElementPlusResolver } from "file:///D:/myCode/VitePress-Butterfly/node_modules/unplugin-vue-components/dist/resolvers.js";
import mathjax3 from "file:///D:/myCode/VitePress-Butterfly/node_modules/markdown-it-mathjax3/index.js";

// site_config.ts
var site_config_default = {
  // VitePress 站点基本配置,必填，允许留空
  site_name: "My Awesome Site",
  site_description: "\u8FD9\u662F\u4E00\u4E2A\u4F7F\u7528 VitePress \u6784\u5EFA\u7684\u6587\u6863\u7AD9\u70B9\u3002",
  site_url: "/",
  author: "57Darling02",
  // 首页配置
  home: {
    mainTitle: "My Awesome Site",
    subTitles: ["\u4E16\u754C\u4E0A\u53EA\u6709\u4E00\u79CD\u82F1\u96C4\u4E3B\u4E49", "\u90A3\u5C31\u662F\u5728\u8BA4\u6E05\u751F\u6D3B\u7684\u771F\u76F8\u540E", "\u4F9D\u7136\u70ED\u7231\u751F\u6D3B"]
    //打字机效果的副标题，使用字符串列表
  },
  // 侧边简介卡
  avatar: "https://resource-un4.pages.dev/article/yjtp.webp",
  name: "57Darling02",
  position: "\u5168\u6808\u5F00\u53D1\u3001\u4F18\u5316\u7B97\u6CD5\u7231\u597D\u8005",
  bio: "\u7EA2\u7EA2\u706B\u706B\u604D\u604D\u60DA\u60DA",
  socialLinks: [
    {
      name: "GitHub",
      icon: "fa-brands fa-github",
      url: "https://github.com/57Darling02/"
    }
  ],
  footer: {
    message: "Released under the MIT License.",
    copyright: "Copyright \xA9 2025-present My Awesome Site"
  },
  // 即将完成的配置
  nav: [
    { text: "\u9996\u9875", link: "/" },
    { text: "\u6307\u5357", link: "/guide/" }
  ],
  sidebar: {
    "/guide/": [
      {
        text: "\u6307\u5357",
        items: [
          { text: "\u4ECB\u7ECD", link: "/guide/introduction" },
          { text: "\u5B89\u88C5", link: "/guide/installation" }
        ]
      }
    ]
  }
};

// .vitepress/config.mts
var customElements = [
  "mjx-container",
  "mjx-assistive-mml",
  "math",
  "maction",
  "maligngroup",
  "malignmark",
  "menclose",
  "merror",
  "mfenced",
  "mfrac",
  "mi",
  "mlongdiv",
  "mmultiscripts",
  "mn",
  "mo",
  "mover",
  "mpadded",
  "mphantom",
  "mroot",
  "mrow",
  "ms",
  "mscarries",
  "mscarry",
  "mscarries",
  "msgroup",
  "mstack",
  "mlongdiv",
  "msline",
  "mstack",
  "mspace",
  "msqrt",
  "msrow",
  "mstack",
  "mstack",
  "mstyle",
  "msub",
  "msup",
  "msubsup",
  "mtable",
  "mtd",
  "mtext",
  "mtr",
  "munder",
  "munderover",
  "semantics",
  "math",
  "mi",
  "mn",
  "mo",
  "ms",
  "mspace",
  "mtext",
  "menclose",
  "merror",
  "mfenced",
  "mfrac",
  "mpadded",
  "mphantom",
  "mroot",
  "mrow",
  "msqrt",
  "mstyle",
  "mmultiscripts",
  "mover",
  "mprescripts",
  "msub",
  "msubsup",
  "msup",
  "munder",
  "munderover",
  "none",
  "maligngroup",
  "malignmark",
  "mtable",
  "mtd",
  "mtr",
  "mlongdiv",
  "mscarries",
  "mscarry",
  "msgroup",
  "msline",
  "msrow",
  "mstack",
  "maction",
  "semantics",
  "annotation",
  "annotation-xml"
];
var config_default = defineConfig({
  title: site_config_default.site_name || "VitePress-Butterfly",
  description: site_config_default.site_description || "VitePress-Butterfly is a VitePress theme inspired by the Butterfly theme.",
  themeConfig: site_config_default,
  lastUpdated: true,
  head: [["link", { rel: "stylesheet", href: "https://cdnjs.snrat.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" }]],
  vite: {
    ssr: {
      noExternal: ["element-plus"]
    },
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ]
  },
  vue: {
    template: {
      compilerOptions: {
        isCustomElement: (tag) => customElements.includes(tag)
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
  }
});
export {
  config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLnZpdGVwcmVzcy9jb25maWcubXRzIiwgInNpdGVfY29uZmlnLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcbXlDb2RlXFxcXFZpdGVQcmVzcy1CdXR0ZXJmbHlcXFxcLnZpdGVwcmVzc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcbXlDb2RlXFxcXFZpdGVQcmVzcy1CdXR0ZXJmbHlcXFxcLnZpdGVwcmVzc1xcXFxjb25maWcubXRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9teUNvZGUvVml0ZVByZXNzLUJ1dHRlcmZseS8udml0ZXByZXNzL2NvbmZpZy5tdHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlcHJlc3MnXHJcbmltcG9ydCBBdXRvSW1wb3J0IGZyb20gJ3VucGx1Z2luLWF1dG8taW1wb3J0L3ZpdGUnXHJcbmltcG9ydCBDb21wb25lbnRzIGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3ZpdGUnXHJcbmltcG9ydCB7IEVsZW1lbnRQbHVzUmVzb2x2ZXIgfSBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy9yZXNvbHZlcnMnXHJcbmltcG9ydCBtYXRoamF4MyBmcm9tICdtYXJrZG93bi1pdC1tYXRoamF4MydcclxuaW1wb3J0IG15Y29uZmlnIGZyb20gJy4uL3NpdGVfY29uZmlnJ1xyXG5jb25zdCBjdXN0b21FbGVtZW50cyA9IFtcclxuICAnbWp4LWNvbnRhaW5lcicsXHJcbiAgJ21qeC1hc3Npc3RpdmUtbW1sJyxcclxuICAnbWF0aCcsXHJcbiAgJ21hY3Rpb24nLFxyXG4gICdtYWxpZ25ncm91cCcsXHJcbiAgJ21hbGlnbm1hcmsnLFxyXG4gICdtZW5jbG9zZScsXHJcbiAgJ21lcnJvcicsXHJcbiAgJ21mZW5jZWQnLFxyXG4gICdtZnJhYycsXHJcbiAgJ21pJyxcclxuICAnbWxvbmdkaXYnLFxyXG4gICdtbXVsdGlzY3JpcHRzJyxcclxuICAnbW4nLFxyXG4gICdtbycsXHJcbiAgJ21vdmVyJyxcclxuICAnbXBhZGRlZCcsXHJcbiAgJ21waGFudG9tJyxcclxuICAnbXJvb3QnLFxyXG4gICdtcm93JyxcclxuICAnbXMnLFxyXG4gICdtc2NhcnJpZXMnLFxyXG4gICdtc2NhcnJ5JyxcclxuICAnbXNjYXJyaWVzJyxcclxuICAnbXNncm91cCcsXHJcbiAgJ21zdGFjaycsXHJcbiAgJ21sb25nZGl2JyxcclxuICAnbXNsaW5lJyxcclxuICAnbXN0YWNrJyxcclxuICAnbXNwYWNlJyxcclxuICAnbXNxcnQnLFxyXG4gICdtc3JvdycsXHJcbiAgJ21zdGFjaycsXHJcbiAgJ21zdGFjaycsXHJcbiAgJ21zdHlsZScsXHJcbiAgJ21zdWInLFxyXG4gICdtc3VwJyxcclxuICAnbXN1YnN1cCcsXHJcbiAgJ210YWJsZScsXHJcbiAgJ210ZCcsXHJcbiAgJ210ZXh0JyxcclxuICAnbXRyJyxcclxuICAnbXVuZGVyJyxcclxuICAnbXVuZGVyb3ZlcicsXHJcbiAgJ3NlbWFudGljcycsXHJcbiAgJ21hdGgnLFxyXG4gICdtaScsXHJcbiAgJ21uJyxcclxuICAnbW8nLFxyXG4gICdtcycsXHJcbiAgJ21zcGFjZScsXHJcbiAgJ210ZXh0JyxcclxuICAnbWVuY2xvc2UnLFxyXG4gICdtZXJyb3InLFxyXG4gICdtZmVuY2VkJyxcclxuICAnbWZyYWMnLFxyXG4gICdtcGFkZGVkJyxcclxuICAnbXBoYW50b20nLFxyXG4gICdtcm9vdCcsXHJcbiAgJ21yb3cnLFxyXG4gICdtc3FydCcsXHJcbiAgJ21zdHlsZScsXHJcbiAgJ21tdWx0aXNjcmlwdHMnLFxyXG4gICdtb3ZlcicsXHJcbiAgJ21wcmVzY3JpcHRzJyxcclxuICAnbXN1YicsXHJcbiAgJ21zdWJzdXAnLFxyXG4gICdtc3VwJyxcclxuICAnbXVuZGVyJyxcclxuICAnbXVuZGVyb3ZlcicsXHJcbiAgJ25vbmUnLFxyXG4gICdtYWxpZ25ncm91cCcsXHJcbiAgJ21hbGlnbm1hcmsnLFxyXG4gICdtdGFibGUnLFxyXG4gICdtdGQnLFxyXG4gICdtdHInLFxyXG4gICdtbG9uZ2RpdicsXHJcbiAgJ21zY2FycmllcycsXHJcbiAgJ21zY2FycnknLFxyXG4gICdtc2dyb3VwJyxcclxuICAnbXNsaW5lJyxcclxuICAnbXNyb3cnLFxyXG4gICdtc3RhY2snLFxyXG4gICdtYWN0aW9uJyxcclxuICAnc2VtYW50aWNzJyxcclxuICAnYW5ub3RhdGlvbicsXHJcbiAgJ2Fubm90YXRpb24teG1sJyxcclxuXTtcclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICB0aXRsZTogbXljb25maWcuc2l0ZV9uYW1lfHxcIlZpdGVQcmVzcy1CdXR0ZXJmbHlcIixcclxuICBkZXNjcmlwdGlvbjogbXljb25maWcuc2l0ZV9kZXNjcmlwdGlvbnx8XCJWaXRlUHJlc3MtQnV0dGVyZmx5IGlzIGEgVml0ZVByZXNzIHRoZW1lIGluc3BpcmVkIGJ5IHRoZSBCdXR0ZXJmbHkgdGhlbWUuXCIsXHJcbiAgdGhlbWVDb25maWc6IG15Y29uZmlnLFxyXG4gIGxhc3RVcGRhdGVkOiB0cnVlLFxyXG4gIGhlYWQ6IFtbJ2xpbmsnLCB7IHJlbDogJ3N0eWxlc2hlZXQnLCBocmVmOiAnaHR0cHM6Ly9jZG5qcy5zbnJhdC5jb20vYWpheC9saWJzL2ZvbnQtYXdlc29tZS82LjUuMS9jc3MvYWxsLm1pbi5jc3MnIH1dXSxcclxuICB2aXRlOiB7XHJcbiAgICBzc3I6IHtcclxuICAgICAgbm9FeHRlcm5hbDogWydlbGVtZW50LXBsdXMnXVxyXG4gICAgfSxcclxuICAgIHBsdWdpbnM6IFtcclxuICAgICAgQXV0b0ltcG9ydCh7XHJcbiAgICAgICAgcmVzb2x2ZXJzOiBbRWxlbWVudFBsdXNSZXNvbHZlcigpXSxcclxuICAgICAgfSksXHJcbiAgICAgIENvbXBvbmVudHMoe1xyXG4gICAgICAgIHJlc29sdmVyczogW0VsZW1lbnRQbHVzUmVzb2x2ZXIoKV0sXHJcbiAgICAgIH0pLFxyXG4gICAgXVxyXG4gIH0sXHJcbiAgdnVlOiB7XHJcbiAgICB0ZW1wbGF0ZToge1xyXG4gICAgICBjb21waWxlck9wdGlvbnM6IHtcclxuICAgICAgICBpc0N1c3RvbUVsZW1lbnQ6ICh0YWcpID0+IGN1c3RvbUVsZW1lbnRzLmluY2x1ZGVzKHRhZyksXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIG1hcmtkb3duOiB7XHJcbiAgICBjb25maWc6IChtZCkgPT4ge1xyXG4gICAgICBtZC51c2UobWF0aGpheDMpO1xyXG4gICAgfSxcclxuICAgIGltYWdlOiB7XHJcbiAgICAgIC8vIFx1OUVEOFx1OEJBNFx1Nzk4MVx1NzUyOFx1RkYxQlx1OEJCRVx1N0Y2RVx1NEUzQSB0cnVlIFx1NTNFRlx1NEUzQVx1NjI0MFx1NjcwOVx1NTZGRVx1NzI0N1x1NTQyRlx1NzUyOFx1NjFEMlx1NTJBMFx1OEY3RFx1MzAwMlxyXG4gICAgICBsYXp5TG9hZGluZzogdHJ1ZVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG59KVxyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXG15Q29kZVxcXFxWaXRlUHJlc3MtQnV0dGVyZmx5XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxteUNvZGVcXFxcVml0ZVByZXNzLUJ1dHRlcmZseVxcXFxzaXRlX2NvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovbXlDb2RlL1ZpdGVQcmVzcy1CdXR0ZXJmbHkvc2l0ZV9jb25maWcudHNcIjtleHBvcnQgZGVmYXVsdCB7XHJcbiAgICAvLyBWaXRlUHJlc3MgXHU3QUQ5XHU3MEI5XHU1N0ZBXHU2NzJDXHU5MTREXHU3RjZFLFx1NUZDNVx1NTg2Qlx1RkYwQ1x1NTE0MVx1OEJCOFx1NzU1OVx1N0E3QVxyXG4gICAgc2l0ZV9uYW1lOiBcIk15IEF3ZXNvbWUgU2l0ZVwiLFxyXG4gICAgc2l0ZV9kZXNjcmlwdGlvbjogXCJcdThGRDlcdTY2MkZcdTRFMDBcdTRFMkFcdTRGN0ZcdTc1MjggVml0ZVByZXNzIFx1Njc4NFx1NUVGQVx1NzY4NFx1NjU4N1x1Njg2M1x1N0FEOVx1NzBCOVx1MzAwMlwiLFxyXG4gICAgc2l0ZV91cmw6IFwiL1wiLFxyXG4gICAgYXV0aG9yOiAnNTdEYXJsaW5nMDInLFxyXG4gICAgXHJcbiAgICAvLyBcdTk5OTZcdTk4NzVcdTkxNERcdTdGNkVcclxuICAgIGhvbWU6e1xyXG4gICAgICAgIG1haW5UaXRsZTpcIk15IEF3ZXNvbWUgU2l0ZVwiLFxyXG4gICAgICAgIHN1YlRpdGxlczpbJ1x1NEUxNlx1NzU0Q1x1NEUwQVx1NTNFQVx1NjcwOVx1NEUwMFx1NzlDRFx1ODJGMVx1OTZDNFx1NEUzQlx1NEU0OScsJ1x1OTBBM1x1NUMzMVx1NjYyRlx1NTcyOFx1OEJBNFx1NkUwNVx1NzUxRlx1NkQzQlx1NzY4NFx1NzcxRlx1NzZGOFx1NTQwRScsJ1x1NEY5RFx1NzEzNlx1NzBFRFx1NzIzMVx1NzUxRlx1NkQzQiddLC8vXHU2MjUzXHU1QjU3XHU2NzNBXHU2NTQ4XHU2NzlDXHU3Njg0XHU1MjZGXHU2ODA3XHU5ODk4XHVGRjBDXHU0RjdGXHU3NTI4XHU1QjU3XHU3QjI2XHU0RTMyXHU1MjE3XHU4ODY4XHJcbiAgICB9LFxyXG4gICAgXHJcbiAgICAvLyBcdTRGQTdcdThGQjlcdTdCODBcdTRFQ0JcdTUzNjFcclxuICAgIGF2YXRhcjogXCJodHRwczovL3Jlc291cmNlLXVuNC5wYWdlcy5kZXYvYXJ0aWNsZS95anRwLndlYnBcIixcclxuICAgIG5hbWU6ICc1N0RhcmxpbmcwMicsXHJcbiAgICBwb3NpdGlvbjogJ1x1NTE2OFx1NjgwOFx1NUYwMFx1NTNEMVx1MzAwMVx1NEYxOFx1NTMxNlx1N0I5N1x1NkNENVx1NzIzMVx1NTk3RFx1ODAwNScsXHJcbiAgICBiaW86ICdcdTdFQTJcdTdFQTJcdTcwNkJcdTcwNkJcdTYwNERcdTYwNERcdTYwREFcdTYwREEnLFxyXG4gICAgc29jaWFsTGlua3M6IFtcclxuICAgICAge1xyXG4gICAgICAgIG5hbWU6ICdHaXRIdWInLFxyXG4gICAgICAgIGljb246ICdmYS1icmFuZHMgZmEtZ2l0aHViJyxcclxuICAgICAgICB1cmw6ICdodHRwczovL2dpdGh1Yi5jb20vNTdEYXJsaW5nMDIvJ1xyXG4gICAgICB9XHJcbiAgICBdLFxyXG4gICAgZm9vdGVyOiB7XHJcbiAgICAgICAgbWVzc2FnZTogJ1JlbGVhc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4nLFxyXG4gICAgICAgIGNvcHlyaWdodDogJ0NvcHlyaWdodCBcdTAwQTkgMjAyNS1wcmVzZW50IE15IEF3ZXNvbWUgU2l0ZSdcclxuICAgIH0sXHJcbiAgICAvLyBcdTUzNzNcdTVDMDZcdTVCOENcdTYyMTBcdTc2ODRcdTkxNERcdTdGNkVcclxuICAgIG5hdjogW1xyXG4gICAgICAgIHsgdGV4dDogJ1x1OTk5Nlx1OTg3NScsIGxpbms6ICcvJyB9LFxyXG4gICAgICAgIHsgdGV4dDogJ1x1NjMwN1x1NTM1NycsIGxpbms6ICcvZ3VpZGUvJyB9LFxyXG4gICAgXSxcclxuICAgIHNpZGViYXI6IHtcclxuICAgICAgICAnL2d1aWRlLyc6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGV4dDogJ1x1NjMwN1x1NTM1NycsXHJcbiAgICAgICAgICAgICAgICBpdGVtczogW1xyXG4gICAgICAgICAgICAgICAgICAgIHsgdGV4dDogJ1x1NEVDQlx1N0VDRCcsIGxpbms6ICcvZ3VpZGUvaW50cm9kdWN0aW9uJyB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHsgdGV4dDogJ1x1NUI4OVx1ODhDNScsIGxpbms6ICcvZ3VpZGUvaW5zdGFsbGF0aW9uJyB9XHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdXHJcbiAgICB9LFxyXG59Il0sCiAgIm1hcHBpbmdzIjogIjtBQUEwUyxTQUFTLG9CQUFvQjtBQUN2VSxPQUFPLGdCQUFnQjtBQUN2QixPQUFPLGdCQUFnQjtBQUN2QixTQUFTLDJCQUEyQjtBQUNwQyxPQUFPLGNBQWM7OztBQ0owUCxJQUFPLHNCQUFRO0FBQUE7QUFBQSxFQUUxUixXQUFXO0FBQUEsRUFDWCxrQkFBa0I7QUFBQSxFQUNsQixVQUFVO0FBQUEsRUFDVixRQUFRO0FBQUE7QUFBQSxFQUdSLE1BQUs7QUFBQSxJQUNELFdBQVU7QUFBQSxJQUNWLFdBQVUsQ0FBQyxzRUFBYyw0RUFBZSxzQ0FBUTtBQUFBO0FBQUEsRUFDcEQ7QUFBQTtBQUFBLEVBR0EsUUFBUTtBQUFBLEVBQ1IsTUFBTTtBQUFBLEVBQ04sVUFBVTtBQUFBLEVBQ1YsS0FBSztBQUFBLEVBQ0wsYUFBYTtBQUFBLElBQ1g7QUFBQSxNQUNFLE1BQU07QUFBQSxNQUNOLE1BQU07QUFBQSxNQUNOLEtBQUs7QUFBQSxJQUNQO0FBQUEsRUFDRjtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ0osU0FBUztBQUFBLElBQ1QsV0FBVztBQUFBLEVBQ2Y7QUFBQTtBQUFBLEVBRUEsS0FBSztBQUFBLElBQ0QsRUFBRSxNQUFNLGdCQUFNLE1BQU0sSUFBSTtBQUFBLElBQ3hCLEVBQUUsTUFBTSxnQkFBTSxNQUFNLFVBQVU7QUFBQSxFQUNsQztBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ0wsV0FBVztBQUFBLE1BQ1A7QUFBQSxRQUNJLE1BQU07QUFBQSxRQUNOLE9BQU87QUFBQSxVQUNILEVBQUUsTUFBTSxnQkFBTSxNQUFNLHNCQUFzQjtBQUFBLFVBQzFDLEVBQUUsTUFBTSxnQkFBTSxNQUFNLHNCQUFzQjtBQUFBLFFBQzlDO0FBQUEsTUFDSjtBQUFBLElBQ0o7QUFBQSxFQUNKO0FBQ0o7OztBRHZDQSxJQUFNLGlCQUFpQjtBQUFBLEVBQ3JCO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFDRjtBQUNBLElBQU8saUJBQVEsYUFBYTtBQUFBLEVBQzFCLE9BQU8sb0JBQVMsYUFBVztBQUFBLEVBQzNCLGFBQWEsb0JBQVMsb0JBQWtCO0FBQUEsRUFDeEMsYUFBYTtBQUFBLEVBQ2IsYUFBYTtBQUFBLEVBQ2IsTUFBTSxDQUFDLENBQUMsUUFBUSxFQUFFLEtBQUssY0FBYyxNQUFNLHVFQUF1RSxDQUFDLENBQUM7QUFBQSxFQUNwSCxNQUFNO0FBQUEsSUFDSixLQUFLO0FBQUEsTUFDSCxZQUFZLENBQUMsY0FBYztBQUFBLElBQzdCO0FBQUEsSUFDQSxTQUFTO0FBQUEsTUFDUCxXQUFXO0FBQUEsUUFDVCxXQUFXLENBQUMsb0JBQW9CLENBQUM7QUFBQSxNQUNuQyxDQUFDO0FBQUEsTUFDRCxXQUFXO0FBQUEsUUFDVCxXQUFXLENBQUMsb0JBQW9CLENBQUM7QUFBQSxNQUNuQyxDQUFDO0FBQUEsSUFDSDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLEtBQUs7QUFBQSxJQUNILFVBQVU7QUFBQSxNQUNSLGlCQUFpQjtBQUFBLFFBQ2YsaUJBQWlCLENBQUMsUUFBUSxlQUFlLFNBQVMsR0FBRztBQUFBLE1BQ3ZEO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFVBQVU7QUFBQSxJQUNSLFFBQVEsQ0FBQyxPQUFPO0FBQ2QsU0FBRyxJQUFJLFFBQVE7QUFBQSxJQUNqQjtBQUFBLElBQ0EsT0FBTztBQUFBO0FBQUEsTUFFTCxhQUFhO0FBQUEsSUFDZjtBQUFBLEVBQ0Y7QUFFRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
