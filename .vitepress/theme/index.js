// https://vitepress.dev/guide/custom-theme
import Layout from './Layout.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './fontawesome/css/all.min.css'


/** @type {import('vitepress').Theme} */
export default {
  Layout,
  enhanceApp({ app, router, siteData }) {
    app.use(ElementPlus)
    const modules = import.meta.glob('./css/*.css', { eager: true });
    if (!import.meta.env.SSR) {
      for (const path in modules) {
        const style = document.createElement('style');
        style.textContent = modules[path].default;
        document.head.appendChild(style);
      }
    }
  }
}

