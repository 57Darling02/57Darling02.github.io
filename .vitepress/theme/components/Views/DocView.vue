<template>
    <div class="doc-header" style="width: 100%;" v-if="!isFocusMode">
        <slot name="doc-header">
            <PostInfo />
        </slot>
    </div>

    <div id="content-container" :style="{ maxWidth: isFocusMode ? 'none' : '1200px' }">

        <div id="page-wrapper" :class="{ 'a-card': !isFocusMode }" class="fade-item">
            <content class="vp-doc" style="overflow-x: hidden;" />
        </div>


        <div class="sidebar" v-if="showSidebar">
            <template v-if="!isFocusMode">
                <slot name="sidebar-non-stay">
                    <ProfileCard />
                </slot>
                <div class="sidebar-stay">
                    <slot name="sidebar-stay">
                        <div class="a-card" style="height: 300px;display: flex;flex-direction: column;padding: 18px;">
                            <Toc />
                        </div>

                    </slot>
                </div>
            </template>
            <template v-else>
                <div class="sidebar-stay" style="background-color: var(--vp-sidebar-bg-color);">
                    <Toc />
                </div>
            </template>
        </div>

    </div>

</template>
<script lang='ts' setup>
import Toc from '../Toc.vue'
import PostInfo from '../default/PostInfo.vue'
import { ref, inject, onMounted, computed } from 'vue'
import ProfileCard from '../default/ProfileCard.vue'
// 获取全局状态和方法
const isFocusMode = inject('isFocusMode')
const showNavbar = inject('showNavbar')
const showSidebar = inject('showSidebar')
const top = computed(() => (showNavbar.value ? 'var(--nav-height)' : '0px'))
const isMounted = ref(false)
onMounted(() => {
    isMounted.value = true
})
</script>
<style lang="scss">
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
    padding: 20px;
    width: 100%;
    padding: 5px 15px 5px;
    margin-left: 10px;
}

.sidebar {
    padding: 0px 10px;
    // position: static;
    min-width: var(--sidebar-width);
    max-width: var(--sidebar-width);
    opacity: 0;
    transform: translateX(20px);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    visibility: visible;
    display: flex;
    flex-direction: column;
    gap: 10px;
    animation: fadeInUp 1s ease-in-out 0.2s forwards;
}

.sidebar-stay {
    position: sticky;
    top: v-bind(top);
    max-height: calc(100vh - (var(--nav-height) + 20px));

    /* 保留滚动缓冲空间 */
    transition:
        top 0.3s cubic-bezier(0.4, 0, 0.2, 1),
        transform 0.3s ease;
    will-change: top;
    z-index: 50;
    display: flex;
    flex-direction: column;
}
</style>