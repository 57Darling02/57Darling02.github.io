export function getPageLayout(value: unknown): string {
  return typeof value === 'string' ? value.trim() : ''
}

export function isArticleLayout(value: unknown): boolean {
  const layout = getPageLayout(value)
  return !layout || layout === 'doc'
}

export function isFramedLayout(value: unknown): boolean {
  return isArticleLayout(value) || getPageLayout(value) === 'page'
}
