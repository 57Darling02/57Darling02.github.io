<template>
    <div
        id="nav-reveal-zone"
        :class="{ 'nav-reveal-zone-hidden': navPhase === 'hidden' }"
        @mouseenter="handleNavMouseEnter"
        @mouseleave="handleNavMouseLeave"
    >
        <div
            id="nav"
            ref="navRef"
            :class="{ 'nav-compact': isCompact, 'nav-hidden': navPhase === 'hidden' }"
            :aria-hidden="!isNavInteractive ? 'true' : undefined"
        >
            <div id="menu" :inert="!isNavInteractive || undefined">
            <a class="menu-fitem" href="/" aria-label="首页" @click="handleLinkClick('/', $event)">
                <span class="menu-fitem-content">
                    <ThemeIcon name="house" />
                    <span class="menu-label">首页</span>
                </span>
            </a>

            <button v-if="shouldShowMusicPlayer" ref="musicTriggerRef" type="button"
                :class="['menu-fitem', 'menu-fitem-music', { 'menu-fitem-active': musicPanelVisible }]"
                :aria-expanded="musicPanelVisible"
                aria-controls="music-player-panel"
                aria-label="音乐播放器"
                @mouseenter="openMusicPanel" @mouseleave="scheduleCloseMusicPanel" @click="handleMusicTriggerClick">
                <span class="menu-fitem-content">
                    <ThemeIcon name="disc-3" class="music-icon" :class="{ 'music-icon-rotating': isMusicPlaying }" />
                    <span class="menu-label">音乐</span>
                </span>
            </button>

            <template v-for="item in menuItems" :key="item.label">
                <button
                    v-if="item.children?.length"
                    type="button"
                    :class="['menu-fitem', { 'menu-fitem-active': menuPanelVisible && activeMenuItem?.label === item.label }]"
                    :aria-expanded="menuPanelVisible && activeMenuItem?.label === item.label"
                    aria-controls="menu-panel"
                    aria-haspopup="menu"
                    :aria-label="item.label"
                    @mouseenter="handleMenuTriggerMouseEnter(item, $event)"
                    @mouseleave="scheduleCloseMenuPanel"
                    @click="handleMenuTriggerClick(item, $event)"
                >
                    <span class="menu-fitem-content">
                        <ThemeIcon :name="item.icon" :src="item.iconUrl" class="arrow-icon" />
                        <span class="menu-label">{{ item.label }}</span>
                    </span>
                </button>
                <a
                    v-else
                    class="menu-fitem"
                    :href="item.link || undefined"
                    :target="getLinkTarget(item.link)"
                    :rel="getLinkRel(item.link)"
                    :aria-label="item.label"
                    :aria-disabled="!item.link || undefined"
                    @click="handleLinkClick(item.link, $event)"
                >
                    <span class="menu-fitem-content">
                        <ThemeIcon :name="item.icon" :src="item.iconUrl" class="arrow-icon" />
                        <span class="menu-label">{{ item.label }}</span>
                    </span>
                </a>
            </template>

                <VPNavBarSearch class="menu-fitem menu-fitem-search" />
            </div>
        </div>
    </div>

    <el-dropdown ref="menuDropdownRef" :virtual-ref="menuVirtualTriggerRef" :popper-style="popperStyle"
        :disabled="!isNavInteractive"
        :show-arrow="false" :hide-on-click="false" :popper-options="menuPopperOptions" virtual-triggering trigger="click"
        placement="bottom-start" @visible-change="onMenuPanelVisibleChange">
        <template #dropdown>
            <div id="menu-panel" class="menu-panel-shell" @mouseenter="cancelCloseMenuPanel" @mouseleave="scheduleCloseMenuPanel">
                <el-dropdown-menu>
                    <el-dropdown-item v-for="subitem in activeMenuItem?.children || []" :key="subitem.key" class="menu-item"
                        @click="handleMenuClick(subitem, $event)">
                        <ThemeIcon :name="subitem.icon" :src="subitem.iconUrl" />
                        <span class="menu-item-label" :title="subitem.label">{{ subitem.label }}</span>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </div>
        </template>
    </el-dropdown>

    <el-dropdown v-if="shouldShowMusicPlayer" ref="musicDropdownRef" :virtual-ref="musicVirtualTriggerRef" :popper-style="popperStyle"
        :disabled="!isNavInteractive"
        :show-arrow="false" :hide-on-click="false" :popper-options="musicPopperOptions" virtual-triggering trigger="click"
        placement="bottom-start" @visible-change="onMusicPanelVisibleChange">
        <template #dropdown>
            <div id="music-player-panel" class="music-player-shell" @mouseenter="cancelCloseMusicPanel" @mouseleave="scheduleCloseMusicPanel">
                <APlayerWidget :url="musicPlayer.url" :name="musicPlayer.name" :artist="musicPlayer.artist"
                    :cover="musicPlayer.cover" :autoplay="musicPlayer.autoplay" :volume="musicPlayer.volume"
                    @playing-change="isMusicPlaying = $event" />
            </div>
        </template>
    </el-dropdown>
</template>

<script lang="ts" setup>
import type { DropdownInstance } from 'element-plus'
import { useData, useRouter } from 'vitepress'
import { VPNavBarSearch } from 'vitepress/theme'
import { computed, defineAsyncComponent, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import type { MenuChildItem, MenuItem } from '../../types/ThemeConfig'
import type ThemeConfig from '../../types/ThemeConfig'
import { useLayoutState } from '../../composables/useLayoutState'
import ThemeIcon from '../ThemeIcon.vue'

const { theme } = useData<ThemeConfig>()
const router = useRouter()
const { showNavbar, navCompact } = useLayoutState()
const menuItems = computed(() => theme.value.menuItems)
const APlayerWidget = defineAsyncComponent(() => import('../player/APlayerWidget.vue'))

type NavPhase = 'expanded' | 'compact' | 'hidden'

const COLLAPSE_DURATION = 150
const COMPACT_SETTLE_DURATION = 60
const REVEAL_DURATION = 320

const navRef = ref<HTMLElement | null>(null)
const navPhase = ref<NavPhase>(navCompact.value ? 'compact' : 'expanded')
const isCompact = computed(() => navCompact.value || navPhase.value !== 'expanded')
const navHovered = ref(false)
const menuDropdownRef = ref<DropdownInstance>()
const menuPanelVisible = ref(false)
const activeMenuItem = ref<MenuItem | null>(null)

const musicDropdownRef = ref<DropdownInstance>()
const musicPanelVisible = ref(false)
const isMusicPlaying = ref(false)
const musicTriggerRef = ref<HTMLElement | null>(null)
const isNavInteractive = computed(() => (
    navPhase.value !== 'hidden'
    || navHovered.value
    || menuPanelVisible.value
    || musicPanelVisible.value
))

const menuTriggerRect = ref(
    DOMRect.fromRect({
        x: 0,
        y: 0,
        width: 0,
        height: 0,
    }),
)
const menuVirtualTriggerRef = ref({
    getBoundingClientRect: () => menuTriggerRect.value,
})

const musicTriggerRect = ref(
    DOMRect.fromRect({
        x: 0,
        y: 0,
        width: 0,
        height: 0,
    }),
)
const musicVirtualTriggerRef = ref({
    getBoundingClientRect: () => musicTriggerRect.value,
})

const popperStyle = {
    border: 'none',
    borderRadius: '18px',
    overflow: 'hidden',
    background: 'transparent',
    boxShadow: 'none',
}

const menuPopperOptions = {
    modifiers: [{ name: 'offset', options: { offset: [0, 8] } }],
}
const musicPopperOptions = {
    modifiers: [{ name: 'offset', options: { offset: [0, 8] } }],
}

let menuCloseTimer: ReturnType<typeof setTimeout> | null = null
let musicCloseTimer: ReturnType<typeof setTimeout> | null = null
let navPhaseTimer: ReturnType<typeof setTimeout> | null = null
let navPhaseTimerTarget: Extract<NavPhase, 'expanded' | 'hidden'> | null = null
let navMotionVersion = 0
let motionMediaQuery: MediaQueryList | null = null

const prefersReducedMotion = () => (
    typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches
)

const clearNavPhaseTimer = () => {
    if (navPhaseTimer) {
        clearTimeout(navPhaseTimer)
        navPhaseTimer = null
    }
    navPhaseTimerTarget = null
}

const syncNavPhase = (visible: boolean, viewportCompact: boolean) => {
    const previousPhase = navPhase.value
    const pendingTarget = navPhaseTimerTarget
    clearNavPhaseTimer()
    const version = ++navMotionVersion

    if (viewportCompact) {
        navHovered.value = false
        navPhase.value = visible ? 'compact' : 'hidden'
        return
    }

    if (prefersReducedMotion()) {
        navPhase.value = visible ? 'expanded' : 'hidden'
        return
    }

    if (!visible) {
        if (previousPhase === 'hidden') return
        if (pendingTarget === 'expanded') {
            navPhase.value = 'hidden'
            return
        }

        navPhase.value = 'compact'
        navPhaseTimerTarget = 'hidden'
        navPhaseTimer = setTimeout(() => {
            navPhaseTimer = null
            navPhaseTimerTarget = null
            if (version === navMotionVersion && !showNavbar.value) {
                navPhase.value = 'hidden'
            }
        }, COLLAPSE_DURATION + COMPACT_SETTLE_DURATION)
        return
    }

    const wasHidden = previousPhase === 'hidden'
    navPhase.value = 'compact'
    if (!wasHidden) {
        navPhase.value = 'expanded'
        return
    }

    navPhaseTimerTarget = 'expanded'
    navPhaseTimer = setTimeout(() => {
        navPhaseTimer = null
        navPhaseTimerTarget = null
        if (version === navMotionVersion && showNavbar.value) {
            navPhase.value = 'expanded'
        }
    }, REVEAL_DURATION + COMPACT_SETTLE_DURATION)
}

const measureLabelWidths = async () => {
    await nextTick()
    navRef.value?.querySelectorAll<HTMLElement>('.menu-label').forEach((label) => {
        label.style.setProperty('--label-width', `${label.scrollWidth}px`)
    })
}

const defaultMusicPlayer = {
    name: 'Music',
    artist: '',
    cover: '',
    autoplay: true,
    volume: 0.6,
}
const normalizeVolume = (value?: number) => {
    if (typeof value !== 'number' || Number.isNaN(value)) return defaultMusicPlayer.volume
    return Math.min(Math.max(value, 0), 1)
}

const rawMusicPlayerConfig = computed(() => {
    if (theme.value.musicPlayer) return theme.value.musicPlayer
    if (!theme.value.musicTrack) return null
    return {
        enabled: true,
        ...theme.value.musicTrack,
    }
})

const musicPlayer = computed(() => {
    const config = rawMusicPlayerConfig.value
    return {
        enabled: Boolean(config?.enabled),
        url: config?.url?.trim() || '',
        name: config?.name?.trim() || defaultMusicPlayer.name,
        artist: config?.artist?.trim() || defaultMusicPlayer.artist,
        cover: config?.cover?.trim() || defaultMusicPlayer.cover,
        autoplay: typeof config?.autoplay === 'boolean' ? config.autoplay : defaultMusicPlayer.autoplay,
        volume: normalizeVolume(config?.volume),
    }
})
const shouldShowMusicPlayer = computed(() => musicPlayer.value.enabled && Boolean(musicPlayer.value.url))

const handleMotionPreferenceChange = () => {
    syncNavPhase(showNavbar.value, navCompact.value)
}

const handleNavMouseEnter = () => {
    if (!navCompact.value) navHovered.value = true
}

const handleNavMouseLeave = () => {
    navHovered.value = false
}

const isModifiedEvent = (event?: MouseEvent) => {
    if (!event) return false
    return event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0
}

const getUrl = (link: string) => new URL(
    link,
    typeof window === 'undefined' ? 'http://localhost' : window.location.href,
)

const isInternalLink = (link: string) => {
    const currentOrigin = typeof window === 'undefined' ? 'http://localhost' : window.location.origin
    return getUrl(link).origin === currentOrigin
}

const getLinkTarget = (link?: string) => link && !isInternalLink(link) ? '_blank' : undefined
const getLinkRel = (link?: string) => link && !isInternalLink(link) ? 'noopener noreferrer' : undefined

const navigateTo = (link: string, event?: MouseEvent) => {
    if (typeof window === 'undefined') return

    const targetUrl = getUrl(link)
    const internal = isInternalLink(link)
    const targetPath = `${targetUrl.pathname}${targetUrl.search}${targetUrl.hash}`

    if (internal && !isModifiedEvent(event)) {
        void router.go(targetPath)
        return
    }

    const targetWindow = internal ? '_self' : '_blank'
    window.open(targetUrl.toString(), targetWindow, internal ? undefined : 'noopener,noreferrer')
}

const handleLinkClick = (link: string | undefined, event: MouseEvent) => {
    if (!link) {
        event.preventDefault()
        return
    }

    if (!isInternalLink(link) || isModifiedEvent(event)) return

    event.preventDefault()
    void router.go(`${getUrl(link).pathname}${getUrl(link).search}${getUrl(link).hash}`)
}

const handleMenuClick = (item: MenuChildItem, event?: MouseEvent) => {
    closeMenuPanel()
    if (!item.link) return

    navigateTo(item.link, event)
}

const syncRectFromElement = (
    element: HTMLElement | null | undefined,
    targetRect: typeof menuTriggerRect,
) => {
    if (!element) return
    const rect = element.getBoundingClientRect()
    targetRect.value = DOMRect.fromRect({
        x: rect.left,
        y: rect.top,
        width: rect.width,
        height: rect.height,
    })
}

const cancelCloseMenuPanel = () => {
    if (!menuCloseTimer) return
    clearTimeout(menuCloseTimer)
    menuCloseTimer = null
}

const closeMenuPanel = () => {
    cancelCloseMenuPanel()
    menuDropdownRef.value?.handleClose()
}

const scheduleCloseMenuPanel = () => {
    cancelCloseMenuPanel()
    menuCloseTimer = setTimeout(closeMenuPanel, 140)
}

const openMenuPanel = (item: MenuItem, triggerEl: HTMLElement) => {
    if (!item.children?.length) return
    cancelCloseMenuPanel()
    activeMenuItem.value = item
    syncRectFromElement(triggerEl, menuTriggerRect)
    menuDropdownRef.value?.handleOpen()
}

const handleMenuTriggerMouseEnter = (item: MenuItem, event: MouseEvent) => {
    openMenuPanel(item, event.currentTarget as HTMLElement)
}

const handleMenuTriggerClick = (item: MenuItem, event: MouseEvent) => {
    const triggerEl = event.currentTarget as HTMLElement
    const isSameTrigger = activeMenuItem.value?.label === item.label
    if (menuPanelVisible.value && isSameTrigger) {
        closeMenuPanel()
        return
    }

    openMenuPanel(item, triggerEl)
}

const onMenuPanelVisibleChange = (visible: boolean) => {
    menuPanelVisible.value = visible
    if (!visible) activeMenuItem.value = null
}

const cancelCloseMusicPanel = () => {
    if (!musicCloseTimer) return
    clearTimeout(musicCloseTimer)
    musicCloseTimer = null
}

const closeMusicPanel = () => {
    cancelCloseMusicPanel()
    musicDropdownRef.value?.handleClose()
}

const blurNavFocus = () => {
    const activeElement = document.activeElement
    const focusOwners = [
        navRef.value,
        document.getElementById('menu-panel'),
        document.getElementById('music-player-panel'),
    ]

    if (activeElement instanceof HTMLElement && focusOwners.some((owner) => owner?.contains(activeElement))) {
        activeElement.blur()
    }
}

const scheduleCloseMusicPanel = () => {
    cancelCloseMusicPanel()
    musicCloseTimer = setTimeout(closeMusicPanel, 140)
}

const openMusicPanel = () => {
    cancelCloseMusicPanel()
    syncRectFromElement(musicTriggerRef.value, musicTriggerRect)
    musicDropdownRef.value?.handleOpen()
}

const handleMusicTriggerClick = () => {
    syncRectFromElement(musicTriggerRef.value, musicTriggerRect)
    if (musicPanelVisible.value) {
        closeMusicPanel()
        return
    }
    openMusicPanel()
}

const onMusicPanelVisibleChange = (visible: boolean) => {
    musicPanelVisible.value = visible
}

watch(showNavbar, (visible) => {
    if (visible) return
    closeMenuPanel()
    closeMusicPanel()
    blurNavFocus()
})

watch([showNavbar, navCompact], ([visible, viewportCompact]) => {
    syncNavPhase(visible, viewportCompact)
}, {
    immediate: true,
    flush: 'sync',
})

watch([menuItems, shouldShowMusicPlayer], () => {
    void measureLabelWidths()
})

onMounted(() => {
    void measureLabelWidths()

    motionMediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    motionMediaQuery.addEventListener('change', handleMotionPreferenceChange)
    if ('fonts' in document) {
        void document.fonts.ready.then(measureLabelWidths)
    }
})

onBeforeUnmount(() => {
    clearNavPhaseTimer()
    motionMediaQuery?.removeEventListener('change', handleMotionPreferenceChange)
    motionMediaQuery = null
    cancelCloseMenuPanel()
    cancelCloseMusicPanel()
})
</script>

<style lang="scss" scoped>
$nav-height: var(--nav-height);
$border-radius: 50px;
$nav-gap: 4px;
$nav-reveal-peek: 8px;

#nav-reveal-zone {
    position: fixed;
    top: 0;
    left: 50%;
    z-index: var(--z-fixed-control);
    display: flex;
    align-items: flex-start;
    width: max-content;
    max-width: 100vw;
    height: $nav-height;
    transform: translateX(-50%);

    &.nav-reveal-zone-hidden {
        height: $nav-gap;
    }

    @media (min-width: 749px) {
        &.nav-reveal-zone-hidden {
            height: $nav-reveal-peek;
        }
    }
}

#nav {
    height: calc(#{$nav-height} - #{$nav-gap} * 2);
    position: relative;
    top: $nav-gap;
    transform: translateY(0);
    z-index: 1;
    opacity: 0.9;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 8px 32px rgba(31, 38, 135, 0.1);
    border-radius: $border-radius;
    background-color: rgba(var(--vp-c-bg-rgb), 0.5);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(12px);
    padding: 0 20px;
    display: flex;
    overflow: hidden;
    transition: transform 320ms cubic-bezier(0.16, 1, 0.3, 1);

    &.nav-hidden {
        transform: translateY(calc(-100% - #{$nav-gap}));
        transition-duration: 260ms;
        transition-timing-function: cubic-bezier(0.4, 0, 1, 1);
    }

    @media (min-width: 749px) {
        &.nav-hidden {
            transform: translateY(calc(-100% - #{$nav-gap} + #{$nav-reveal-peek}));
        }
    }
}

@media (min-width: 749px) {
    #nav-reveal-zone.nav-reveal-zone-hidden:hover #nav.nav-hidden {
        transform: translateY(0);
        transition-duration: 180ms;
        transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
    }
}

#menu {
    display: flex;
    align-items: center;
    gap: 6px;
    height: 100%;
    margin: 0 auto;

    .menu-fitem {
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        line-height: 1;
        padding: 8px 10px;
        border: 0;
        background: transparent;
        color: inherit;
        cursor: pointer;
        font: inherit;
        text-decoration: none;
        user-select: none;
    }

    .menu-fitem:focus-visible {
        outline: 2px solid var(--vp-c-brand);
        outline-offset: 2px;
    }

    .menu-fitem-content {
        position: relative;
        font-size: 1rem;
        font-weight: 500;
        white-space: nowrap;
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding-bottom: 3px;
        transition: gap 210ms cubic-bezier(0.16, 1, 0.3, 1);
    }

    .menu-label {
        box-sizing: border-box;
        display: inline-block;
        min-width: 0;
        width: var(--label-width);
        overflow: hidden;
        opacity: 1;
        white-space: nowrap;
        transition:
            width 210ms cubic-bezier(0.16, 1, 0.3, 1),
            opacity 120ms ease-out 60ms;
    }

    .menu-fitem-content::after {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        bottom: -4px;
        height: 4px;
        border-radius: 999px;
        background: linear-gradient(to right, #3498db, #2980b9);
        transform: scaleX(0);
        transform-origin: left center;
        transition: transform 0.25s ease;
        pointer-events: none;
    }

    .menu-fitem:hover .menu-fitem-content::after,
    .menu-fitem.menu-fitem-active .menu-fitem-content::after {
        transform: scaleX(1);
    }

    .arrow-icon {
        transition: transform 0.25s ease;
    }

    .menu-fitem.menu-fitem-active .arrow-icon {
        transform: rotate(180deg);
    }

    .menu-fitem-music {
        cursor: pointer;
    }

    .music-icon {
        transform-origin: center;
    }

    .music-icon-rotating {
        animation: music-spin 2s linear infinite;
    }

    .menu-fitem-search {
        align-self: center;
        flex: 0 0 auto;
        padding: 0;

        :deep(.VPNavBarSearchButton) {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 35px;
            height: 35px;
            padding: 0;
            border: 0;
            border-radius: 50%;
            background: transparent;
            color: inherit;
            cursor: pointer;
            font: inherit;
            font-size: 1rem;
            line-height: 1;
        }

        :deep(.VPNavBarSearchButton .text),
        :deep(.VPNavBarSearchButton .keys) {
            display: none;
        }

        :deep(.VPNavBarSearchButton .vpi-search) {
            display: block;
            margin-bottom: 3px;
            transform-origin: center;
            transition: transform 0.2s ease;
        }

        :deep(.VPNavBarSearchButton:hover .vpi-search) {
            transform: scale(1.14);
        }

        :deep(.VPNavBarSearchButton:focus-visible) {
            outline: 2px solid var(--vp-c-brand);
            outline-offset: 2px;
        }
    }
}

#nav.nav-compact {
    #menu .menu-fitem-content {
        gap: 0;
        transition: gap 150ms cubic-bezier(0.4, 0, 1, 1);
    }

    #menu .menu-label {
        width: 0;
        opacity: 0;
        transition:
            width 150ms cubic-bezier(0.4, 0, 1, 1),
            opacity 80ms ease-in;
    }
}

@keyframes music-spin {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}

.music-player-shell {

    padding: 0;
    border-radius: 18px;
    overflow: hidden;
    background: var(--vp-c-bg);
}

.menu-panel-shell {
    inline-size: min(13.5rem, calc(100vw - 2rem));
}

.menu-panel-shell :deep(.menu-item) {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    min-width: 0;
}

.menu-item-label {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

@media (prefers-reduced-motion: reduce) {
    #nav,
    #nav.nav-hidden,
    #nav.nav-hidden:hover,
    #menu .menu-fitem-content,
    #menu .menu-label,
    #nav.nav-compact #menu .menu-fitem-content,
    #nav.nav-compact #menu .menu-label {
        transition: none;
    }
}

@media (max-width: 748px) {
    #nav #menu .menu-fitem-content {
        gap: 0;
    }

    #nav #menu .menu-label {
        width: 0;
        opacity: 0;
    }
}
</style>
