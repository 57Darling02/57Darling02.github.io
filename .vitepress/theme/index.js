// https://vitepress.dev/guide/custom-theme
import Layout from './Layout.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './fontawesome/css/all.min.css'
import './css/index.css'

/** @type {import('vitepress').Theme} */
export default {
  Layout,
  enhanceApp({ app, router, siteData }) {
    app.use(ElementPlus)
  }
}

