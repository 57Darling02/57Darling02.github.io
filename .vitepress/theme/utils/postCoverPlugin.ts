import fs from 'node:fs'
import path from 'node:path'
import type { Plugin, ViteDevServer } from 'vite'
import yaml from 'js-yaml'

const VIRTUAL_MODULE_ID = 'virtual:post-covers'
const RESOLVED_VIRTUAL_MODULE_ID = `\0${VIRTUAL_MODULE_ID}`
const FRONTMATTER_RE = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/
const SCHEME_RE = /^[a-z][a-z\d+.-]*:/i
const IGNORED_DIRECTORIES = new Set(['.git', 'node_modules'])

type CoverEntry = {
  assetFile: string
  reference: string
  sourceFile: string
  suffix: string
}

export function createPostCoverPlugin(root = process.cwd()): Plugin {
  const postsDirectory = path.resolve(root, 'posts')
  let server: ViteDevServer | undefined
  let source: string | undefined

  const invalidateRegistry = () => {
    const module = server?.moduleGraph.getModuleById(RESOLVED_VIRTUAL_MODULE_ID)
    if (module) server?.moduleGraph.invalidateModule(module)
    return module
  }

  return {
    name: 'post-cover-assets',
    resolveId(id) {
      return id === VIRTUAL_MODULE_ID ? RESOLVED_VIRTUAL_MODULE_ID : null
    },
    load(id) {
      if (id !== RESOLVED_VIRTUAL_MODULE_ID) return null
      source ??= createVirtualModuleSource(root, postsDirectory)
      return source
    },
    configureServer(viteServer) {
      server = viteServer
    },
    handleHotUpdate(context) {
      if (!context.file.endsWith('.md') || !isInsideDirectory(postsDirectory, context.file)) return

      source = undefined
      const module = invalidateRegistry()
      return module ? [...context.modules, module] : undefined
    },
  }
}

function createVirtualModuleSource(root: string, postsDirectory: string) {
  const entries = collectCoverEntries(root, postsDirectory)
  const imports = new Map<string, string>()

  entries.forEach((entry) => {
    if (!imports.has(entry.assetFile)) {
      imports.set(entry.assetFile, `cover${imports.size}`)
    }
  })

  const importSource = [...imports.entries()].map(([assetFile, binding]) => (
    `import ${binding} from ${JSON.stringify(`${toPosixPath(assetFile)}?url`)}`
  ))
  const registrySource = entries.map((entry) => {
    const binding = imports.get(entry.assetFile)
    const value = entry.suffix ? `${binding} + ${JSON.stringify(entry.suffix)}` : binding
    return `${JSON.stringify(getCoverKey(entry.sourceFile, entry.reference))}: ${value}`
  })

  return [
    ...importSource,
    `const postCoverUrls = { ${registrySource.join(', ')} }`,
    'export function resolvePostCover(sourceFile, cover) {',
    "  const normalizedSource = String(sourceFile || '').replace(/\\\\/g, '/').replace(/^(?:\\.\\/|\\/+)+/, '')",
    "  const normalizedCover = String(cover || '').trim()",
    "  return postCoverUrls[`${normalizedSource}\\0${normalizedCover}`] || cover",
    '}',
  ].join('\n')
}

function collectCoverEntries(root: string, postsDirectory: string): CoverEntry[] {
  if (!fs.existsSync(postsDirectory)) return []

  return listMarkdownFiles(postsDirectory).flatMap((markdownFile) => {
    const reference = getRelativeCoverReference(markdownFile)
    if (!reference) return []

    const { pathname, suffix } = splitReference(reference)
    const assetPath = decodeAssetPath(pathname, markdownFile)
    const assetFile = path.resolve(path.dirname(markdownFile), assetPath)

    if (!isInsideDirectory(postsDirectory, assetFile)) {
      throw new Error(`[Post Covers] "${reference}" in "${toProjectPath(root, markdownFile)}" points outside posts/.`)
    }
    if (!fs.statSync(assetFile, { throwIfNoEntry: false })?.isFile()) {
      throw new Error(`[Post Covers] "${reference}" in "${toProjectPath(root, markdownFile)}" does not exist.`)
    }

    return [{
      assetFile,
      reference,
      sourceFile: toProjectPath(root, markdownFile),
      suffix,
    }]
  })
}

function listMarkdownFiles(directory: string): string[] {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(directory, entry.name)
    if (entry.isDirectory()) {
      return IGNORED_DIRECTORIES.has(entry.name) ? [] : listMarkdownFiles(file)
    }
    return entry.isFile() && entry.name.endsWith('.md') ? [file] : []
  })
}

function getRelativeCoverReference(markdownFile: string): string | undefined {
  const source = fs.readFileSync(markdownFile, 'utf-8')
  const frontmatter = parseFrontmatter(source)
  const cover = typeof frontmatter?.cover === 'string' ? frontmatter.cover.trim() : ''

  return cover && isRelativeReference(cover) ? cover : undefined
}

function parseFrontmatter(source: string): Record<string, unknown> | undefined {
  const match = source.match(FRONTMATTER_RE)
  if (!match) return undefined

  const parsed = yaml.load(match[1])
  return parsed && typeof parsed === 'object' && !Array.isArray(parsed)
    ? parsed as Record<string, unknown>
    : undefined
}

function isRelativeReference(reference: string) {
  return !reference.startsWith('/') && !reference.startsWith('#') && !SCHEME_RE.test(reference)
}

function splitReference(reference: string) {
  const suffixIndex = reference.search(/[?#]/)
  return suffixIndex < 0
    ? { pathname: reference, suffix: '' }
    : { pathname: reference.slice(0, suffixIndex), suffix: reference.slice(suffixIndex) }
}

function decodeAssetPath(assetPath: string, markdownFile: string) {
  try {
    return decodeURIComponent(assetPath).replace(/\\/g, path.sep)
  } catch {
    throw new Error(`[Post Covers] "${assetPath}" in "${markdownFile}" is not a valid URL-encoded path.`)
  }
}

function isInsideDirectory(directory: string, file: string) {
  const relative = path.relative(directory, file)
  return relative && !relative.startsWith(`..${path.sep}`) && relative !== '..' && !path.isAbsolute(relative)
}

function toProjectPath(root: string, file: string) {
  return toPosixPath(path.relative(root, file))
}

function getCoverKey(sourceFile: string, reference: string) {
  return `${sourceFile}\0${reference}`
}

function toPosixPath(file: string) {
  return file.replace(/\\/g, '/')
}
