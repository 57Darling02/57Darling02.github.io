import ThemeConfig from './theme/types/ThemeConfig'
import { defineConfig, type HeadConfig } from 'vitepress'
import { createHash } from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import yaml from 'js-yaml'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { loadSiteConfig } from './theme/utils/configLoader'
import { injectFirstPaintLoading } from './theme/utils/firstPaintLoading'
import { createSeoConfig } from './theme/utils/seo'
import { fontAwesomeStylesheet, hasFontAwesomeIcons } from './theme/utils/fontAwesome'
import { createThemeIconPlugin } from './theme/utils/themeIconPlugin'

const rawConfig = loadSiteConfig();
const myconfig = rawConfig as ThemeConfig;
const fontAwesomeHead: HeadConfig[] = hasFontAwesomeIcons(myconfig)
  ? [['link', {
      rel: 'stylesheet',
      href: fontAwesomeStylesheet.href,
      integrity: fontAwesomeStylesheet.integrity,
      crossorigin: 'anonymous',
    }]]
  : []
const rewriteTargets = new Map<string, string>();

function rewritePostPath(id: string) {
  if (!id.startsWith('posts/') || !id.endsWith('.md')) return id

  const layout = getMarkdownLayout(id)
  if (layout && layout !== 'doc') {
    return registerRewriteTarget(id, getStandalonePageTarget(id))
  }

  const target = `p/${shortHash(id)}.md`
  return registerRewriteTarget(id, target)
}

function registerRewriteTarget(id: string, target: string) {
  const owner = rewriteTargets.get(target)
  if (owner && owner !== id) {
    throw new Error(`[Route Rewrite] "${target}" is used by both "${owner}" and "${id}".`)
  }
  rewriteTargets.set(target, id)

  return target
}

function shortHash(value: string) {
  return createHash('sha256').update(value).digest('hex').slice(0, 8)
}

function getStandalonePageTarget(id: string) {
  return id.replace(/^posts\//, '')
}

function getMarkdownLayout(id: string) {
  const filePath = path.resolve(process.cwd(), id)
  if (!fs.existsSync(filePath)) return ''

  const source = fs.readFileSync(filePath, 'utf-8')
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/)
  if (!match) return ''

  const frontmatter = yaml.load(match[1])
  return frontmatter && typeof frontmatter === 'object' && !Array.isArray(frontmatter)
    ? String((frontmatter as Record<string, unknown>).layout || '').trim()
    : ''
}
export default defineConfig<ThemeConfig>({
  ...createSeoConfig(myconfig),
  themeConfig: myconfig,
  head: fontAwesomeHead,
  cleanUrls: true,
  ignoreDeadLinks: true,
  // The theme data loader owns timestamp caching so it can fall back to mtime
  // when a deployment has no Git metadata.
  lastUpdated: false,
  rewrites: rewritePostPath,
  vite: {
    publicDir: path.resolve(process.cwd(), '.vitepress/content-public'),
    ssr: {
      noExternal: ['element-plus']
    },
    plugins: [
      createThemeIconPlugin(myconfig),
      {
        name: 'first-paint-loading-dev',
        apply: 'serve',
        transformIndexHtml: injectFirstPaintLoading,
      },
      Components({
        resolvers: [ElementPlusResolver({ importStyle: 'css' })],
      }),
    ]
  },
  markdown: {
    math: true,
    image: {
      // 默认禁用；设置为 true 可为所有图片启用懒加载。
      lazyLoading: true
    }
  },
  transformHtml(code) {
    return injectFirstPaintLoading(code)
  },

})
