<template>

    <div id="main-layout">
        <div class="navbar-container" :class="{ 'nav-hidden': !showNavbar }" v-if="isMounted">
            <slot name="navbar">
                <navbar />
            </slot>
        </div>
        <el-scrollbar ref="scrollbarRef" height="100vh" @scroll="handleScroll" :wrap-style="{ overflowX: 'hidden' }">
            
            <div class="Page">
                <div class="header-slot" style="width: 100%;">
                    <div id="fill" style="height: var(--nav-height);"></div>
                    <slot name="header">
                        <postinfo/>
                    </slot>
                </div>
                <div id="content-container">
                    <div id="page-wrapper">
                        <slot name="main-content">
                            
                        </slot>
                    </div>
                    <div class="sidebar" v-if="isMounted">
                        <slot name="sidebar-non-stay">
                            
                        </slot>
                        <div class="sidebar-stay">
                            <slot name="sidebar-stay">
                                
                            </slot>
                        </div>
                    </div>
                </div>
            </div>
            <slot name="footer">
                <div class="footer-container" style="color: white;margin-bottom: 250px;">
                    <el-tag size="small" type="success" effect="plain" round>
                        {{ theme.footer.copyright }}
                    </el-tag>
                </div>
            </slot>
        </el-scrollbar>

    </div>
</template>
<script setup>
import { useData,useRouter  } from 'vitepress'
const {  theme } = useData()
import { ref, onMounted, onUnmounted, watch } from 'vue'
import navbar from './navbar.vue'
import postinfo from './postinfo.vue';
// 状态栏&滚动条设置
const scrollbarRef = ref()
const contentContainer = ref()
const showNavbar = ref(true)
const lastScrollY = ref(0)
const scrollingDown = ref(false)
const isMounted = ref(false) // 新增标志位
const { route } = useRouter();
watch(
  () => route.path,
  () => {
    if (!import.meta.env.SSR && isMounted.value) {
      scrollbarRef.value?.setScrollTop(0)
      showNavbar.value = true // 同时显示导航栏
    }
  }
);
const handleScroll = ({ scrollTop }) => {
    if (!isMounted.value) return // 挂载前不处理
    const currentY = scrollTop
    const windowHeight = scrollbarRef.value?.wrapRef?.clientHeight || 0
    scrollingDown.value = currentY > lastScrollY.value

    if (currentY < 100) {
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
}


onMounted(() => {
    isMounted.value = true
    contentContainer.value = scrollbarRef.value?.wrapRef?.querySelector('.el-scrollbar__view')
    const initialScrollTop = scrollbarRef.value?.wrapRef?.scrollTop || 0
    showNavbar.value = initialScrollTop < 100
})



</script>
<style>
#main-layout {
    position: relative;
    height: 100vh;
}

#main-layout::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    z-index: -1;
}

.navbar-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
    transition:
        transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
        box-shadow 0.3s ease;
}

.nav-hidden {
    transform: translateY(-100%);
    box-shadow: none !important;
}

.Page {
    display: grid;
}

#content-container {
    display: flex;
    justify-self: center;
    justify-content: center;
    max-width: var(--content-max-width);
    min-width: var(--content-min-width);
    position: relative;
    width: 100%;
}

#page-wrapper {
    padding: 10px;
    border-radius: 8px;
    transition: width 0.3s ease;
    width: 100%;
}

.sidebar {
    padding: 10px;
    position: absolute;
    /* 初始位置在可视区域外 */
    right: var(--sidebar-initial-offset);
    top: 0;
    width: var(--sidebar-width);
    opacity: 0;
    transform: translateX(20px);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    visibility: hidden;
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.sidebar-stay {
    position: sticky;
    top: calc(var(--nav-height) + 20px);
    margin-bottom: 40px;
    /* 保留滚动缓冲空间 */
    transition:
        top 0.3s cubic-bezier(0.4, 0, 0.2, 1),
        transform 0.3s ease;
    will-change: top;
    z-index: 50;

}

.nav-hidden~.el-scrollbar .sidebar-stay {
    --nav-height: 0px;
    top: 20px;
    /* 仅保留安全间距 */
}

.footer-container {
    display: flex;
    /* 垂直居中 */
    align-items: center;
    padding-top: 50px;
    flex-direction: column;
}

@media (min-width: 768px) {
    .sidebar {
        position: static;
        transform: translateX(0);
        opacity: 1;
        visibility: visible;
        min-width: var(--sidebar-width);
    }

    #page-wrapper {
        width: calc(100% - var(--sidebar-width));
    }
}
</style>