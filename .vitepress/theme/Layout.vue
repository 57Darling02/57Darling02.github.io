<template>
    <Loading v-if="!isMounted" />
    <Bg_StarrySkySass v-if="!(isFocusMode && (!frontmatter.layout || frontmatter.layout == 'doc'))" />
    <transition name="el-fade-in">
        <div id="control" v-if="showNavbar && lastScrollY > 100">
            <div class="social-item" @click="backToTop">
                <i class="fa-solid fa-chevron-up"></i>
            </div>
        </div>
    </transition>


    <el-scrollbar height="100vh" ref="scrollbarRef" @scroll="handleScroll" wrap-style="max-width:100vw;" noresize>
        <el-header height="var(--nav-height)">
            <ClientOnly><Nav /></ClientOnly>
        </el-header>
            <NotFound v-if="page.isNotFound" />
            <MainView v-else />
            <el-footer>
                <Footer />
            </el-footer>
        
    </el-scrollbar>

</template>

<script setup lang="ts">
import { inject, onMounted, onUnmounted, ref } from 'vue'
import { throttle } from 'lodash-es'
import { useData, onContentUpdated } from 'vitepress'
const { theme, page, frontmatter, isDark } = useData()
import Nav from './components/Nav.vue'
import Footer from './components/Footer.vue'
import MainView from './components/Views/MainView.vue'
import NotFound from './components/Views/NotFound.vue'
import Loading from './components/default/Loading.vue'
import Bg_StarrySkySass from './components/default/Bg_StarrySkySass.vue'
import { useRouter } from 'vitepress'
const router = useRouter()
// 获取全局状态
const isFocusMode = inject('isFocusMode')
const showNavbar = inject('showNavbar', ref(true))
const showSidebar = inject('showSidebar', ref(true))
// 获取全局控件
const isMounted = ref(false)
const scrollbarRef = ref()
const contentContainer = ref()
isDark.value = theme.value.isDark || isDark.value
// 窗口宽度状态和尺寸变化处理
const windowWidth = ref(typeof window !== 'undefined' ? window.innerWidth : 0)
const handleResize = () => {
    if (typeof window === 'undefined') return
    windowWidth.value = window.innerWidth
    // 宽度大于748px显示侧边栏
    showSidebar.value = windowWidth.value > 748
}

//实现导航栏滚动的隐藏和显示
const lastScrollY = ref(0)
const scrollingDown = ref(false)
const handleScroll = throttle(({ scrollTop }) => {
    if (!isMounted.value) return // 挂载前不处理
    const currentY = scrollTop
    const windowHeight = scrollbarRef.value?.wrapRef?.clientHeight || 0
    scrollingDown.value = currentY > lastScrollY.value

    if (typeof window !== 'undefined' && currentY < 100 && (frontmatter.value.layout === 'doc' || frontmatter.value.layout === undefined) && window !== undefined) {
        window.history.replaceState(null, '', router.route.path.replace('.html', ''))
        showNavbar.value = true
    } else if (scrollingDown.value) {
        showNavbar.value = false
    } else {
        showNavbar.value = true
    }
    const documentHeight = contentContainer.value?.scrollHeight || 0

    if (currentY + windowHeight >= documentHeight - 100) {
        showNavbar.value = true
    }
    lastScrollY.value = currentY
}, 250)

// 控制栏
const backToTop = () => {
    scrollbarRef.value?.wrapRef?.scrollTo({ top: 0, behavior: 'smooth' })
}
onContentUpdated(() => {
    backToTop()
})

// 挂载处理
onMounted(() => {
    if (typeof window === 'undefined') return
    contentContainer.value = scrollbarRef.value?.wrapRef?.querySelector('.el-scrollbar__view')
    const initialScrollTop = scrollbarRef.value?.wrapRef?.scrollTop || 0
    showNavbar.value = initialScrollTop < 100
    // 添加窗口大小变化事件监听器
    handleResize()
    window.addEventListener('resize', handleResize)
    setTimeout(() => {
        isMounted.value = true
    }, 800)
})
onUnmounted(() => {
    if (typeof window === 'undefined') return
    window.removeEventListener('resize', handleResize)
})

</script>
<style lang="scss">
#control {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 9999;
}




</style>