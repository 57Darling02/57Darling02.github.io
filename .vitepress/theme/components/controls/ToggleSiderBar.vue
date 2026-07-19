<template>
    <button
        class="control-icon-button"
        type="button"
        :aria-expanded="sidebarOpen"
        :title="sidebarOpen ? '收起侧栏' : '展开侧栏'"
        :aria-label="sidebarOpen ? '收起侧栏' : '展开侧栏'"
        aria-controls="site-sidebar"
        @click="toggleSidebar"
    >
        <ThemeIcon :name="sidebarOpen ? 'panel-left-open' : 'panel-left-close'" />
    </button>
</template>

<script setup lang="ts">
import { useLayoutState } from '../../composables/useLayoutState'
import ThemeIcon from '../ThemeIcon.vue'

const { sidebarOpen, toggleSidebar } = useLayoutState()
</script>

<style scoped>
.control-icon-button {
    border: 0;
    padding: 0;
    background: transparent;
    color: inherit;
    cursor: pointer;
    line-height: 1;
}
</style>
