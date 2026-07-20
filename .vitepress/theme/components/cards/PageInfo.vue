<template>
  <HeroSurface class="page-header" :cover="cover" appearance="clear">
    <header class="page-header-content">
      <h1>{{ title }}</h1>
      <p v-if="description">{{ description }}</p>
    </header>
  </HeroSurface>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useData } from 'vitepress'
import { resolvePostCover } from 'virtual:post-covers'
import type ThemeConfig from '../../types/ThemeConfig'
import HeroSurface from '../HeroSurface.vue'

const { frontmatter, page } = useData<ThemeConfig>()

const toText = (value: unknown, fallback = '') => value == null ? fallback : String(value)
const title = computed(() => toText(frontmatter.value.title, 'Untitled Page'))
const description = computed(() => toText(frontmatter.value.description).trim())
const cover = computed(() => resolvePostCover(
  page.value.filePath,
  toText(frontmatter.value.cover).trim(),
))
</script>

<style scoped>
.page-header {
  --hero-min-height: clamp(18rem, 42vh, 28rem);
}

.page-header-content {
  width: min(calc(100% - 3rem), 900px);
  margin: 0 auto;
  padding: 3rem 0 4.5rem;
  animation: page-header-enter 360ms cubic-bezier(0.16, 1, 0.3, 1) both;
}

.page-header-content h1 {
  margin: 0;
  font-size: 2.5rem;
  font-weight: 600;
  line-height: 1.28;
  text-shadow: 0 2px 18px rgb(var(--vp-c-bg-rgb) / 0.42);
  text-wrap: balance;
}

.page-header-content p {
  max-width: 42rem;
  margin: 1rem 0 0;
  color: var(--vp-c-text-1);
  font-size: 1rem;
  line-height: 1.7;
  text-shadow: 0 1px 12px rgb(var(--vp-c-bg-rgb) / 0.5);
}

@keyframes page-header-enter {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 748px) {
  .page-header-content {
    width: calc(100% - 2rem);
    padding: 2.5rem 0 3.75rem;
  }

  .page-header-content h1 {
    font-size: 1.85rem;
    line-height: 1.35;
  }
}

@media (prefers-reduced-motion: reduce) {
  .page-header-content {
    animation: none;
  }
}
</style>
