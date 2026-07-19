const visitDataApiUrl = 'https://events.vercount.one/api/v2/log'
const visitDataCacheKey = 'visitorCountData'
const visitDataTimeout = 5_000
const visitorCookieMaxAge = 60 * 60 * 24 * 365
const counterIds = ['site_pv', 'page_pv', 'site_uv'] as const
const counterPrefixes = ['busuanzi', 'vercount'] as const

type CounterId = typeof counterIds[number]
type CounterData = Record<CounterId, number>

let activeRequest: AbortController | undefined
let lastTrackedUrl = ''

function useVisitData() {
  if (typeof window === 'undefined') return

  const url = getCurrentPageUrl()
  if (!url || url === lastTrackedUrl) return

  lastTrackedUrl = url
  activeRequest?.abort()

  const controller = new AbortController()
  activeRequest = controller
  void loadVisitData(url, controller)
}

async function loadVisitData(url: string, controller: AbortController) {
  const timeoutId = window.setTimeout(() => controller.abort(), visitDataTimeout)
  const isNewVisitor = !hasVisitorCookie()

  try {
    const response = await fetch(visitDataApiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url, isNewUv: isNewVisitor }),
      signal: controller.signal,
    })

    if (!response.ok) throw new Error(`HTTP ${response.status}`)

    const data = normalizeCounterData(await response.json())
    if (!data) throw new Error('Invalid counter response')
    if (activeRequest !== controller) return

    if (isNewVisitor) setVisitorCookie()
    setCachedCounterData(data)
    updateCounterElements(data)
  } catch (error) {
    if (activeRequest === controller && !isAbortError(error)) {
      updateCounterElements(getCachedCounterData())
    }
  } finally {
    window.clearTimeout(timeoutId)
    if (activeRequest === controller) activeRequest = undefined
  }
}

function getCurrentPageUrl() {
  const url = new URL(window.location.href)
  url.hash = ''
  url.search = ''
  return url.toString()
}

function getVisitorCookieName() {
  return `vercount_uv_${window.location.host.replace(/[^a-zA-Z0-9_-]/g, '_')}`
}

function hasVisitorCookie() {
  return document.cookie.split('; ').some((entry) => entry === `${getVisitorCookieName()}=1`)
}

function setVisitorCookie() {
  document.cookie = `${getVisitorCookieName()}=1; path=/; max-age=${visitorCookieMaxAge}; samesite=lax`
}

function normalizeCounterData(value: unknown): CounterData | null {
  const response = isRecord(value) && isRecord(value.data) ? value.data : value
  if (!isRecord(response)) return null

  return Object.fromEntries(counterIds.map((id) => [id, toCounterNumber(response[id])])) as CounterData
}

function toCounterNumber(value: unknown) {
  const number = Number(value)
  return Number.isFinite(number) ? number : 0
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value)
}

function setCachedCounterData(data: CounterData) {
  try {
    localStorage.setItem(visitDataCacheKey, JSON.stringify(data))
  } catch {
    // Storage can be unavailable in privacy-focused browser contexts.
  }
}

function getCachedCounterData() {
  try {
    const cached = localStorage.getItem(visitDataCacheKey)
    return cached ? normalizeCounterData(JSON.parse(cached)) : null
  } catch {
    return null
  }
}

function updateCounterElements(data: CounterData | null) {
  if (!data) return

  counterIds.forEach((id) => {
    const value = String(data[id])
    counterPrefixes.forEach((prefix) => {
      document.getElementById(`${prefix}_value_${id}`)?.replaceChildren(value)
      const container = document.getElementById(`${prefix}_container_${id}`)
      if (container) container.style.display = 'inline'
    })
  })
}

function isAbortError(error: unknown) {
  return error instanceof DOMException && error.name === 'AbortError'
}

export default useVisitData
