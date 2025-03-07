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
            <el-text tag="h3" class="article-title" size="large" >{{ title }}</el-text>
            <!-- 标签展示 -->
            <el-space wrap v-if="tags.length" class="tag-group">
                <el-tag size="small" type="primary" effect="plain" round>
                    <i class="fa-light fa-calendar"></i>{{ formattedDate }}
                </el-tag>
            </el-space>
            <el-divider />
        </a>
    </div>
</template>
<style>
.article-title {
    margin-bottom: 8px;
    color: var(--el-color-primary) !important;
    max-width: 100%;
    text-decoration:none
}

.article-excerpt {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    margin: 8px 0;
}

.tag-group {
    margin-top: 12px;
}

.card-footer {
    margin-top: 16px;
    border-top: 1px solid var(--el-border-color-light);
    padding-top: 12px;
}
</style>