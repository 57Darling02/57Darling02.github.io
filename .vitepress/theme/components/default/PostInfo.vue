<template>
  <div class="a-card" id="article-header">
    <!-- 标题区域 -->
    <div id="header-title">
      <h1>{{ title }}</h1>
    </div>
    <!-- 元信息区域 -->
    <div class="meta-info">
      <!-- 作者信息 -->
      <div class="author-info">
        <el-icon><User /></el-icon>
        <span class="author">{{ author }}</span>
      </div>
      <!-- 分隔线 -->
      <div class="divider"></div>
      <!-- 发布日期 -->
      <div class="date-info">
        <el-icon><Calendar /></el-icon>
        <time :datetime="date">{{ formattedDate }}</time>
      </div>
    </div>
    <VPDocFooterLastUpdated/>
    
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useData } from 'vitepress'
import { Calendar, User } from '@element-plus/icons-vue'
import VPDocFooterLastUpdated from './VPDocFooterLastUpdated.vue'
const { frontmatter,theme,page } = useData()
// console.log(frontmatter.value)
// console.log(theme.value)
// console.log(page.value)
const {
  title = "Untitled Article",
  author = frontmatter.value?.author ||theme.value?.author || "Unknown Author",
  date = '',
} = frontmatter.value

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

<style>

#article-header {
  padding: 2rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  backdrop-filter: blur(5px);
  border-color: rgba(228, 195, 195, 0.13);
  background-color: transparent;
  display: flex;
  animation: fadeInUp 1s ease-in-out 0.2s forwards;
  opacity: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

#header-title {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

#header-title h1 {
  margin-bottom: 8px;
  color: var(--white);
  font-weight: 400;
  font-size: 2.5em;
  line-height: 1.5;
  color: wheat !important;
  
}

.meta-info {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.author-info,
.date-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.divider {
  width: 1px;
  height: 1em;
  background: var(--vp-c-divider);
}

.icon {
  color: var(--vp-c-brand);
  font-size: 0.9em;
}

.title-icon {
  font-size: 1.2em;
}

/* 响应式设计 */
@media (max-width: 640px) {
  .article-header {
    padding: 1.5rem;
  }

  #header-title h1 {
    font-size: 1.5rem;
  }

  .meta-info {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }

  .divider {
    display: none;
  }
}
</style>