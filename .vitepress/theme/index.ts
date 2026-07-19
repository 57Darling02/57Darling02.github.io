// https://vitepress.dev/guide/custom-theme
import { inBrowser, type Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { nextTick } from 'vue'
import 'element-plus/theme-chalk/dark/css-vars.css'
import 'element-plus/es/components/image-viewer/style/css'
import 'element-plus/es/components/message/style/css'
import Layout from './layouts/AppLayout.vue'
import './css/style.css'
import useVisitData from './composables/useVisitData'
import { createLayoutState, layoutStateKey } from './composables/useLayoutState'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app, router }) {
    if (inBrowser) {
      router.onAfterRouteChange = () => {
        // Wait for the new page's counter elements before updating them.
        void nextTick(useVisitData)
      }
    }
    app.provide(layoutStateKey, createLayoutState())
  }
} satisfies Theme
