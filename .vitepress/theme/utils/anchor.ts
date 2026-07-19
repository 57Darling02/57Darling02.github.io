import type { InjectionKey } from 'vue'

const DEFAULT_NAV_HEIGHT = 48
const DEFAULT_ANCHOR_CLEARANCE = 8

export type AnchorNavigator = (hash: string) => void

export const anchorNavigatorKey = Symbol('anchorNavigator') as InjectionKey<AnchorNavigator>

export function normalizeHash(value: string): string {
  const hashIndex = value.indexOf('#')
  const fragment = hashIndex >= 0 ? value.slice(hashIndex + 1) : value
  if (!fragment) return ''

  try {
    return `#${decodeURIComponent(fragment)}`
  } catch {
    return ''
  }
}

export function getHashId(value: string): string {
  return normalizeHash(value).slice(1)
}

export function getAnchorScrollOffset(): number {
  if (typeof window === 'undefined') {
    return DEFAULT_NAV_HEIGHT + DEFAULT_ANCHOR_CLEARANCE
  }

  const styles = getComputedStyle(document.documentElement)
  const navHeight = Number.parseFloat(styles.getPropertyValue('--nav-height'))
  const clearance = Number.parseFloat(styles.getPropertyValue('--anchor-clearance'))

  return (Number.isFinite(navHeight) ? navHeight : DEFAULT_NAV_HEIGHT)
    + (Number.isFinite(clearance) ? clearance : DEFAULT_ANCHOR_CLEARANCE)
}
