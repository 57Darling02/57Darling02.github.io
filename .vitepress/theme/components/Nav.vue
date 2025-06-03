<template>
    <div id="nav" style="flex: 1;" :class="{ 'nav-hidden': !(showNavbar || visible) }">
        <el-row style="width: 100%;height: 100%;">
            <el-col :span="12" justify="start">
                <a style="display: flex;width: 100%;height: 100%;justify-content: start; font-weight: 700;" href="/"
                    id="title">
                    <el-text style="color: var(--vp-c-text-1);" truncated>{{ theme.site_name }}</el-text>
                </a>
            </el-col>
            <el-col :span="12" justify="end" style="flex-direction: column;">
                <div style="display: flex;height: 100%;justify-content: end;" id="menu">
                    <div class="dropitem" v-if="showSidebar" style="padding-right: 10px;">
                        <el-dropdown v-for="item in menuItems" :key="item.label" popper-class="custom-dropdown">
                            <h3 class="menu-fitem">
                                <span>
                                    <i :class="item.icon"></i>
                                    {{ item.label }}
                                    <i class="fa-light fa-angle-up arrow-icon"></i>
                                </span>
                            </h3>
                            <template #dropdown v-if="item.children?.length">
                                <el-dropdown-menu>
                                    <el-dropdown-item v-for="subitem in item.children" :key="subitem.key"
                                        class="menu-item" @click="handleMenuClick(subitem)">
                                        <i :class="subitem.icon"></i>
                                        {{ subitem.label }}
                                    </el-dropdown-item>
                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                    </div>
                    <VPNavBarHamburger :active="visible" @click="visible = !visible"/>
                </div>
            </el-col>
        </el-row>
    </div>
    <el-drawer v-model="visible" :size="300" :destroy-on-close="true" :show-close="false" append-to-body
        style="border-top-left-radius: 12px;border-bottom-left-radius: 12px;" :before-close="handleBeforeClose">
        <template v-if="drawerContentVisible">
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
            <Drawer v-if="!showSidebar"/>
            <!-- theme: {{ theme }}
        page: {{ page }} -->
            <!-- frontmatter: {{ frontmatter }} -->
            <!-- <Submenu v-if="visible"/> -->
        </template>

    </el-drawer>
</template>

<script lang='ts' setup>
import { useData, useRouter } from 'vitepress'
const { theme, page, frontmatter } = useData()
import { ref, onMounted, onUnmounted, watch } from 'vue'
import VPSwitchAppearance from './default/VPSwitchAppearance.vue'
import ToggleFocusModeBTN from './default/ToggleFocusModeBTN.vue'
import VPNavBarHamburger from './default/VPNavBarHamburger.vue'

import Drawer from './Drawer.vue'
const visible = ref(false)
import { inject } from 'vue'
// 获取全局状态和方法
const isFocusMode = inject('isFocusMode')
const showNavbar = inject('showNavbar')
const showSidebar = inject('showSidebar')
const drawerContentVisible = ref(false)
const handleBeforeClose = (done: () => void) => {
    drawerContentVisible.value = false
    setTimeout(done, 200)
}
watch(visible, (newVal) => {
    if (newVal) { // 打开时
        // 等待抽屉展开动画完成（根据你的scss中$transition-time: 0.3s; 设为300ms）
        setTimeout(() => {
            drawerContentVisible.value = true
        }, 200)
    } else { // 关闭时
        // 立即销毁内容
        drawerContentVisible.value = false
    }
})
const { menuItems } = theme.value
const handleMenuClick = (item) => {
    if (item.children?.length) return
    if (item.link) {
        // 生成完整路径
        const basePath = window.location.origin
        const fullPath = item.link.startsWith('/')
            ? `${basePath}${item.link}`
            : `${basePath}/${item.link}`

        if (item.link.startsWith('http')) {
            window.open(item.link, '_blank')
        }
        else {
            window.open(fullPath, '_blank') // 保持新标签页打开行为
        }
    }
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
    z-index: 9999;
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

    el-dropdown,
    .menu-group {
        display: flex;
        justify-content: flex-end;
        gap: 12px;
        border: 0px;
    }

    [class*="el-"]:focus-visible {
        outline: none !important;
    }

    .menu-fitem {
        display: flex;
        align-items: center;
        justify-content: center;
        line-height: 2;
        margin-left: 20px;
    }

    .menu-fitem span {
        background: linear-gradient(to right, #3498db, #2980b9) no-repeat left bottom;
        background-size: 0 5px;
        transition: background-size 0.3s;
        font-size: 1rem;
        white-space: nowrap;
        /* 新增禁止换行属性 */
        display: inline-flex;
        /* 使用弹性布局保持元素对齐 */
        align-items: center;
        gap: 6px;
        /* 控制图标和文字间距 */
    }

    .menu-fitem span:hover {
        background-size: 100% 5px;
    }

    .sbbtn {
        display: none;
    }

    .arrow-icon {
        margin-left: 8px;
        transition: transform 0.3s ease;
        display: inline-block;
    }

    .menu-fitem:hover .arrow-icon {
        transform: rotate(180deg);
    }

    
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