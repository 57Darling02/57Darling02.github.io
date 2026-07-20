<template>
    <el-scrollbar
        class="app-scrollbar"
        height="100vh"
        ref="scrollbarRef"
        @scroll="handleScroll"
        noresize
    >
        <el-header height="var(--nav-height)">
            <ClientOnly>
                <Nav />
            </ClientOnly>
        </el-header>
        <NotFound v-if="page.isNotFound" />
        <MainView v-else />

        <el-footer class="page-footer" height="200px">
            <Footer />
        </el-footer>
    </el-scrollbar>
    <div id="control" ref="controlRef">
        <transition name="el-fade-in">
            <button v-show="lastScrollY > 100" class="control-button" type="button" title="回到顶部" aria-label="回到顶部" @click="handleBackToTopClick">
                <ThemeIcon name="chevron-up" />
            </button>
        </transition>
        <transition name="el-fade-in">
            <Toc class="a-card" v-if="showFloatingToc" v-show="isControlPanelOpen"
                style="height: 40vh;width: 300px;;display: flex;flex-direction: column;padding: 18px;" />
        </transition>

        <div id="control-column">
            <div class="control-item">
                <VPNavBarHamburger :active="isControlPanelOpen" @click="toggleControlPanel" />
            </div>

            <transition name="el-fade-in">
                <div id="control-panel" v-show="isControlPanelOpen">
                    <div v-if="canShowSidebar" class="control-item">
                        <ToggleSiderBar />
                    </div>
                    <div class="control-item">
                        <button class="control-button" type="button" title="复制当前页面链接" aria-label="复制当前页面链接" @click="handleCopyLinkClick">
                            <ThemeIcon name="link" />
                        </button>
                    </div>
                    <div class="control-item">
                        <VPSwitchAppearance />
                    </div>
                </div>
            </transition>

        </div>
    </div>

</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, provide, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useData, onContentUpdated } from 'vitepress'
import type ThemeConfig from '../types/ThemeConfig'
const { theme, page, frontmatter, isDark } = useData<ThemeConfig>()
import Nav from '../components/navigation/Nav.vue'
import Footer from '../components/navigation/Footer.vue'
import MainView from '../pages/MainView.vue'
import NotFound from '../pages/NotFound.vue'
import Toc from '../components/navigation/Toc.vue'
import ThemeIcon from '../components/ThemeIcon.vue'
import VPNavBarHamburger from '../components/controls/VPNavBarHamburger.vue'
import VPSwitchAppearance from '../components/controls/VPSwitchAppearance.vue'
import ToggleSiderBar from '../components/controls/ToggleSiderBar.vue'
import { useLayoutState } from '../composables/useLayoutState'
import {
    anchorNavigatorKey,
    getAnchorScrollOffset,
    getHashId,
    normalizeHash,
} from '../utils/anchor'
import { isArticleLayout, isFramedLayout } from '../utils/pageLayout'

const {
    showNavbar,
    showSidebar,
    canShowSidebar,
    setNavbarVisible,
    setFooterVisible,
    startMobileListener,
} = useLayoutState()

const isArticlePage = computed(() => isArticleLayout(frontmatter.value.layout))
const isFramedPage = computed(() => isFramedLayout(frontmatter.value.layout))
const showFloatingToc = computed(() => isArticlePage.value && !showSidebar.value)

// 获取全局控件
const isMounted = ref(false)
type ScrollbarRef = {
    wrapRef?: HTMLElement
}

const scrollbarRef = ref<ScrollbarRef>()
const contentContainer = ref<HTMLElement | null>(null)
if (typeof theme.value.isDark === 'boolean') {
    isDark.value = theme.value.isDark
}
let firstPaintFrame: number | undefined
const isControlPanelOpen = ref(false)
const controlRef = ref<HTMLElement | null>(null)

function throttle<TArgs extends unknown[]>(fn: (...args: TArgs) => void, delay: number) {
    let lastRun = 0
    let timer: ReturnType<typeof setTimeout> | null = null
    let lastArgs: TArgs | null = null

    const run = () => {
        lastRun = Date.now()
        timer = null
        if (!lastArgs) return
        fn(...lastArgs)
        lastArgs = null
    }

    return (...args: TArgs) => {
        lastArgs = args
        const now = Date.now()
        const remaining = delay - (now - lastRun)
        if (remaining <= 0) {
            if (timer) {
                clearTimeout(timer)
                timer = null
            }
            run()
            return
        }
        if (!timer) {
            timer = setTimeout(run, remaining)
        }
    }
}



// 实现导航栏滚动的隐藏和显示
const lastScrollY = ref(0)
const scrollingDown = ref(false)
const checkPageHeight = () => {
    if (!isMounted.value) return
    const docHeight = contentContainer.value?.scrollHeight || 0
    const winHeight = scrollbarRef.value?.wrapRef?.clientHeight || 0
    if (docHeight <= winHeight) setFooterVisible(true)
}
const handleScroll = throttle(({ scrollTop }: { scrollTop: number }) => {
    if (!isMounted.value) return // 挂载前不处理
    const currentY = scrollTop
    const windowHeight = scrollbarRef.value?.wrapRef?.clientHeight || 0
    scrollingDown.value = currentY > lastScrollY.value

    if (typeof window !== 'undefined' && currentY < 150 && isFramedPage.value) {
        setNavbarVisible(true)
    } else if (scrollingDown.value) {
        setNavbarVisible(false)
    } else {
        setNavbarVisible(true)
    }
    const documentHeight = contentContainer.value?.scrollHeight || 0

    if (currentY + windowHeight >= documentHeight - 100) {
        setNavbarVisible(true)
        setFooterVisible(true)
    } else {
        setFooterVisible(false)
    }
    lastScrollY.value = currentY
}, 150)

// 控制栏
const toggleControlPanel = () => {
    isControlPanelOpen.value = !isControlPanelOpen.value
}

const closeControlWhenOutside = (event: Event) => {
    if (!isControlPanelOpen.value) return
    const target = event.target
    if (!(target instanceof Node) || controlRef.value?.contains(target)) return
    isControlPanelOpen.value = false
}

const backToTop = (smooth = true) => {
    scrollbarRef.value?.wrapRef?.scrollTo({ top: 0, behavior: smooth ? 'smooth' : 'auto' })
}

const handleBackToTopClick = () => {
    backToTop()
}

const handleCopyLinkClick = async () => {
    if (typeof window === 'undefined') return

    const url = new URL(window.location.href)
    url.hash = ''

    try {
        await copyText(url.toString())
        ElMessage({
            message: '当前页面链接已复制',
            type: 'success',
        })
    } catch {
        ElMessage({
            message: '复制链接失败，请手动复制地址栏内容',
            type: 'error',
        })
    }
}

async function copyText(text: string) {
    if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text)
        return
    }

    const textarea = document.createElement('textarea')
    textarea.value = text
    textarea.style.position = 'fixed'
    textarea.style.opacity = '0'
    document.body.append(textarea)
    textarea.select()
    const copied = document.execCommand('copy')
    textarea.remove()
    if (!copied) throw new Error('Copy command was rejected')
}

const scrollToHash = (smooth = false) => {
    if (typeof window === 'undefined') return
    const id = getHashId(window.location.hash)
    if (!id) return

    const target = document.getElementById(id)
    const wrap = scrollbarRef.value?.wrapRef
    if (!target || !wrap) return

    const targetRect = target.getBoundingClientRect()
    const wrapRect = wrap.getBoundingClientRect()
    const top = Math.max(
        0,
        targetRect.top - wrapRect.top + wrap.scrollTop - getAnchorScrollOffset(),
    )

    wrap.scrollTo({ top, behavior: smooth ? 'smooth' : 'auto' })
}

const scrollToHashAfterRender = (smooth = false) => {
    nextTick(() => {
        requestAnimationFrame(() => scrollToHash(smooth))
    })
}

const handleHashChange = (event: HashChangeEvent) => {
    if (event.oldURL && event.newURL) {
        const previousUrl = new URL(event.oldURL)
        const nextUrl = new URL(event.newURL)
        if (previousUrl.pathname !== nextUrl.pathname || previousUrl.search !== nextUrl.search) return
    }

    scrollToHashAfterRender(true)
}

const navigateToHash = (hash: string) => {
    if (typeof window === 'undefined') return

    const normalized = normalizeHash(hash)
    if (!normalized) return

    const previousUrl = new URL(window.location.href)
    const nextUrl = new URL(window.location.href)
    nextUrl.hash = normalized.slice(1)

    if (previousUrl.hash !== nextUrl.hash) {
        window.history.pushState({}, '', `${nextUrl.pathname}${nextUrl.search}${nextUrl.hash}`)
    }

    window.dispatchEvent(new HashChangeEvent('hashchange', {
        oldURL: previousUrl.href,
        newURL: nextUrl.href,
    }))
}

provide(anchorNavigatorKey, navigateToHash)

const removeFirstPaintLoading = () => {
    const loading = document.getElementById('first-paint-loading')
    if (!loading) return

    loading.classList.add('is-leaving')
    window.setTimeout(() => loading.remove(), 180)
}

onContentUpdated(() => {
    const hasHash = typeof window !== 'undefined' && Boolean(window.location.hash)
    if (!hasHash) {
        backToTop(false)
    } else {
        scrollToHashAfterRender(false)
    }
    checkPageHeight()
})

// 挂载处理
onMounted(() => {
    if (typeof window === 'undefined') return
    startMobileListener()
    contentContainer.value = scrollbarRef.value?.wrapRef?.querySelector('.el-scrollbar__view')
    const initialScrollTop = scrollbarRef.value?.wrapRef?.scrollTop || 0
    setNavbarVisible(initialScrollTop < 100)
    window.addEventListener('hashchange', handleHashChange)
    document.addEventListener('pointerdown', closeControlWhenOutside, true)
    nextTick(() => {
      firstPaintFrame = window.requestAnimationFrame(() => {
        isMounted.value = true
        removeFirstPaintLoading()
        scrollToHash(false)
        checkPageHeight()
      })
    })
})

onBeforeUnmount(() => {
    if (typeof window === 'undefined') return
    window.removeEventListener('hashchange', handleHashChange)
    document.removeEventListener('pointerdown', closeControlWhenOutside, true)
    if (firstPaintFrame !== undefined) window.cancelAnimationFrame(firstPaintFrame)
})

</script>
<style lang="scss">
.app-scrollbar {
    width: 100%;
    max-width: 100vw;

    .vp-doc :where(h1, h2, h3, h4, h5, h6) {
        scroll-margin-top: calc(var(--nav-height) + var(--anchor-clearance));
    }

    > .el-scrollbar__wrap {
        overflow-x: hidden;

        > .el-scrollbar__view {
            min-width: 0;
            max-width: 100%;
        }
    }

}

.page-footer {
    background: var(--vp-c-content-ground);
}

#control {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: var(--z-fixed-control);
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: flex-end;

    #control-column {
        display: flex;
        flex-direction: row;
        gap: 10px;
        justify-content: flex-end;
    }

    #control-panel {
        display: flex;
        order: -1;
        gap: 10px;
    }

    .control-item,
    .control-button {
        display: inline-flex;
        width: 36px;
        height: 36px;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        background: var(--vp-c-bg-alt);
        color: var(--vp-c-text-2);
        transition: background-color 0.2s ease, color 0.2s ease, transform 0.2s ease;
    }

    .control-button {
        border: 0;
        cursor: pointer;
        font: inherit;
    }

    .control-item > button {
        display: inline-flex;
        width: 100%;
        height: 100%;
        align-items: center;
        justify-content: center;
        border-radius: inherit;
    }

    .control-item:hover,
    .control-button:hover {
        background: var(--vp-c-brand);
        color: white;
        transform: translateY(-1px);
    }

    button:focus-visible {
        outline: 2px solid var(--vp-c-brand);
        outline-offset: 3px;
    }

}
</style>
