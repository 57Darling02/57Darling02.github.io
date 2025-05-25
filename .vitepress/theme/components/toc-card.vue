<template>
    <div class="toc-card a-card">
        <i class="fas fa-columns" />
        <span class="toc-title" style="font-weight: 600;">目录导航</span>
        <el-anchor v-if="currentPost?.headings?.length" :container="scrollContainer" :offset="45"
            direction="vertical" style="background-color: transparent;" :marker="false" @change="handleScroll" :select-scroll-top="true">
            <el-tree-v2 ref="treeRef" :height="300" style="max-width: 300px;" :indent="12" :data="treeData"
                :props="treeProps" :expand-on-click-node="false" :check-on-click-leaf="false" :highlight-current="true">
                <template #default="{ node, data }">
                    <el-anchor-link :href="`${data.value}`" :title="data.label" :active="data.value === currentUrl">
                    </el-anchor-link>
                </template>
            </el-tree-v2>
        </el-anchor>
    </div>
</template>

<script lang="ts" setup>
import { computed, ref, onMounted } from 'vue'
const treeRef = ref<InstanceType<typeof ElTreeV2>>()
// 通用工具函数
const normalizeLink = link => link.replace(/\.(md|html)$/, '')
const getScrollContainer = () => {
    if (typeof window === 'undefined') return null
    return document.querySelector('.el-scrollbar__wrap') || window
}
const props = defineProps({
    posts: Array,
    currentUrl: String
})
const treeProps = {
    children: 'children',
    label: 'label',
    value: 'value'
}
const treeData = computed(() => {
    const stack: any[] = []
    const result = []

    for (const heading of currentPost.value?.headings || []) {
        const node = {
            label: heading.text,
            value: heading.anchor,
            children: []
        }
        // 核心逻辑：根据数字层级调整栈结构
        while (stack.length >= heading.level) stack.pop()

        if (stack.length) {
            stack[stack.length - 1].children.push(node)
        } else {
            result.push(node)
        }

        stack.push(node)
    }

    return result
})
const scrollContainer = ref(null)

// 计算属性
const normalizedUrl = computed(() => {
    try {
        const url = new URL(props.currentUrl, location.origin)
        return normalizeLink(decodeURIComponent(url.pathname)) // 解码处理
    } catch {
        return normalizeLink(decodeURIComponent(props.currentUrl.split('#')[0])) // 解码处理
    }
})

const currentPost = computed(() =>
    props.posts.find(post => normalizeLink(post.link) === normalizedUrl.value)
)

const handleScroll = (e) => {
    treeRef.value?.setCurrentKey(e)
    const currentNode = treeRef.value?.getCurrentNode()
    const currentKey = treeRef.value?.getCurrentKey()
    if (currentNode) {
        // console.log('Current Node:', currentNode)
        treeRef.value?.scrollToNode(currentNode,'smart')
        treeRef.value?.setExpandedKeys([currentKey])
    }
    
    // console.log(treeRef.value?.getCurrentKey())
}
onMounted(() => {
    scrollContainer.value = getScrollContainer()
})

</script>

<style scoped>
.toc-card {
    width: 100%;
    right: 2rem;
    top: 6rem;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    padding: 3px;
    padding: 1rem;
    overflow-y: hidden;
}
</style>