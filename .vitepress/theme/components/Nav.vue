<template>
    <div id="nav" style="flex: 1;" :class="{ 'nav-hidden': !showNavbar  }">
        <el-row style="width: 100%;height: 100%;">
            <el-col :span="12" justify="start">
                <a style="display: flex;width: 100%;height: 100%;justify-content: start; font-weight: 700;" href="/"
                    id="title">
                    <el-text style="color: var(--vp-c-text-1);" truncated>{{ theme.site_name }}</el-text>
                </a>
            </el-col>
            <el-col :span="12" justify="end">
                <div style="display: flex;height: 100%;justify-content: end;" id="menu">
                    <VPNavBarHamburger :active="visible" @click="visible = !visible" />
                </div>
            </el-col>
        </el-row>
    </div>
    <el-drawer v-model="visible" :size="300" :destroy-on-close="true" :z-index="99" :show-close="false"
        style="border-top-left-radius: 12px;border-bottom-left-radius: 12px;" :before-close="handleBeforeClose">

        <el-row>
            <el-col :span="12">主题模式: {{ useData().isDark ? '暗色' : '浅色' }}</el-col>
            <el-col :span="12">
                <VPSwitchAppearance />
            </el-col>
            <el-col :span="12">专注模式: {{ isFocusMode ? '开启' : '关闭' }}</el-col>
            <el-col :span="12">
                <ToggleFocusModeBTN />
            </el-col>
        </el-row>
        <Toc v-if="!showSidebar" />
        <!-- theme: {{ theme }}
        page: {{ page }} -->
        <!-- frontmatter: {{ frontmatter }} -->
        <!-- <Submenu v-if="visible"/> -->
    </el-drawer>
</template>

<script lang='ts' setup>
import { useData, useRouter } from 'vitepress'
const { theme, page, frontmatter } = useData()
import { ref, onMounted, onUnmounted } from 'vue'
import VPSwitchAppearance from './default/VPSwitchAppearance.vue'
import ToggleFocusModeBTN from './default/ToggleFocusModeBTN.vue'
import VPNavBarHamburger from './default/VPNavBarHamburger.vue'
import Toc from './Toc.vue'
const visible = ref(false)
import { inject } from 'vue'
// 获取全局状态和方法
const isFocusMode = inject('isFocusMode')
const showNavbar = inject('showNavbar')
const showSidebar = inject('showSidebar')

const handleBeforeClose = (done: () => void) => {
    // 立即销毁子组件
    visible.value = false
    // 等待下一帧执行关闭动画
    setTimeout(done, 200)

}

</script>


<style lang="scss" scoped>
// 定义变量
$nav-height: var(--nav-height); // 导航栏高度变量
$icon-size: 16px; // 正方形图标尺寸变量
$line-height: 2px; // 线条高度
$line-spacing: 5px; // 线条间距
$animation-duration: 0.3s; // 动画时长

$nav-bg: var(--vp-c-bg-elv);
$border-radius: 15px;
$transition-time: 0.3s;
$hide-offset: 100%;


#nav {
    height: $nav-height;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    opacity: 0.8;
    border-bottom: 1px solid transparent;
    box-shadow: 0 0 0 rgba(202, 199, 199, 0);
    border-bottom-left-radius: $border-radius;
    border-bottom-right-radius: $border-radius;
    background-color: $nav-bg;
    transition: transform $transition-time ease;
    &.nav-hidden {
        transform: translateY(-$hide-offset);
    }
}

#menu {
    align-items: center;
}

#title {
    align-items: center;
    padding-right: 10px;
    padding-left: 10px;
}

.action-buttons {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 16px 0;
}
</style>