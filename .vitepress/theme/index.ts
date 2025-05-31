// https://vitepress.dev/guide/custom-theme
import { ref } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/display.css'
// import 'element-plus/theme-chalk/dark/css-vars.css'
import Layout from './Layout.vue'
import './css/style.css'

export default {
  
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app, router, siteData }) {
    // 注入全局变量
    const isFocusMode = ref(false) // 专注模式
    const showNavbar = ref(true) // 显示导航栏
    const showSidebar = ref(true)
    app.provide('isFocusMode', isFocusMode)
    app.provide('showNavbar', showNavbar)
    app.provide('showSidebar', showSidebar)
    // app.component('MyGlobalComponent' /* ... */)
  }
} satisfies Theme
