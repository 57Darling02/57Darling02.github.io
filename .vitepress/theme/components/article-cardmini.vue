<script setup>
import { computed } from 'vue'
const props = defineProps({
    post: {
        type: Object,
        default: () => ({
            title: 'Untitled Article',
            author: 'Anonymous',
            date: '',
            link: '#',
            tags: [],
            categories: [],
            excerpt: ''
        })
    }
})
// 使用解构赋值设置默认值
const {
    title = 'Untitled Article',
    author = 'Anonymous',
    date = '',
    link = '#',
    tags = [],
    categories = [],
    excerpt = ''
} = props.post || {}
const formattedDate = computed(() => {
    if (!date) return 'Unknown date'
    try {
        return new Date(date).toLocaleDateString('zh-CN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    } catch {
        return 'Invalid date'
    }
})
</script>
<template>
    <div class="a-card">
        <a :href="link" class="article-link">
            <!-- 标题部分 -->
            <el-text tag="h4" class="article-title" size="small" >{{ title }}</el-text>
            <!-- 标签展示 -->
            <el-space wrap v-if="tags.length" class="tag-group">
                <el-tag size="small" type="primary" effect="plain" round>
                    <i class="fa-light fa-calendar"></i>{{ formattedDate }}
                </el-tag>
            </el-space>
        </a>
    </div>
</template>
<style>

</style>