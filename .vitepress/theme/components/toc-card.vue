<template>
    <div class="toc-card a-card">
        <i class="fas fa-columns" />
        <span class="toc-title" style="font-weight: 600;">目录导航</span>

        <el-scrollbar style="height: 300px;">
            <el-anchor v-if="currentPost?.headings?.length" :container="scrollContainer" direction="vertical"
                type="underline" :offset="30" @click="handleClick" style="background-color: transparent;">
                <el-anchor-link v-for="heading in currentPost.headings" :href="heading.anchor" :title="heading.text" :class="'toc-level-' + heading.level"/>

            </el-anchor>
        </el-scrollbar>

    </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'

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

const handleClick = (e) => {
    e.preventDefault()
}
onMounted(() => {
    scrollContainer.value = getScrollContainer()
    console.log(currentPost.value.headings)
})

</script>

<style scoped>
.toc-card {
    width: 100%;
    right: 2rem;
    top: 6rem;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    padding: 1rem;
    max-height: 80vh;
    overflow-y: auto;
}

.toc-title {
    color: #2c3e50;
    font-size: 1.1rem;
    margin-bottom: 0.8rem;
    padding-bottom: 0.4rem;
    border-bottom: 1px solid #eee;
}


.toc-level-2 {
    padding-left: 0;
}

.toc-level-3 {
    padding-left: 0.5rem;
}

.toc-level-4 {
    padding-left: 1.5rem;
}

.toc-level-5 {
    padding-left: 2.5rem;
}

.toc-level-6 {
    padding-left: 3.5rem;
}

/* 新增更高的层级支持 */
.toc-level-7 {
    padding-left: 4.5rem;
}

.toc-level-8 {
    padding-left: 5.5rem;
}

.empty-tip {
    color: #999;
    font-size: 0.9rem;
    text-align: center;
    padding: 1rem 0;
}
</style>