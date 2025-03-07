// https://vitepress.dev/guide/custom-theme
import Layout from './Layout.vue'
import elementplus from "element-plus"
import 'element-plus/dist/index.css'
// 导入elementplus组件-中文
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import './fontawesome/css/all.min.css'


/** @type {import('vitepress').Theme} */
export default {
  Layout,
  enhanceApp({ app }) {
    app.use(elementplus, {
      locale: zhCn,
    });
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

