<script setup>
import { useData, useRouter } from 'vitepress'
import Starrysky from './components/Bg_StarrySkySass.vue';
import profieldcard from './components/profieldcard.vue';
import NotFound from './components/NotFound.vue';
import MainLayout from './components/MainLayout.vue';
import articleCard from './components/article-card.vue';
import Loading from './components/Loading.vue';
import Home from './components/Home.vue';
import { ref, onMounted, watch } from 'vue'
import postinfo from './components/postinfo.vue';

import moreFuc from './components/moreFuc.vue';
import tocCard from './components/toc-card.vue';
// https://vitepress.dev/reference/runtime-api#usedata
const { page, frontmatter, theme } = useData()
import { data as posts } from './utils/posts.data.js'
const {
  avatar = "",
  name = '未命名',
} = theme.value
const isMounted = ref(false) 
const { route } = useRouter();
const isTransitioning = ref(false);
watch(
  () => route.path,
  () => {
    isTransitioning.value = true;
    setTimeout(() => {
      isTransitioning.value = false;
    }, 500); // 500ms 要和 CSS 动画时间匹配
  }
);
onMounted(() => {
  isMounted.value = true // 设置标志位为 true
})
</script>

<template>
  <Loading v-if="!isMounted"/>
  <keep-alive>
    <ClientOnly>
      <Starrysky />
    </ClientOnly>
  </keep-alive>
  <NotFound v-if="page.isNotFound" />
  <div class="nullpage" v-else-if="frontmatter.layout === 'customPage'">
    <Content />
  </div>
  <MainLayout v-else-if="frontmatter.layout === 'home'">
    <template #navbar>
    </template>
    <template #header>
      <Home />
    </template>
    <template #main-content>
      <div class="a-card vp-doc">
        <Content />
      </div>
      <div class="vp-doc" v-for="post in posts" :key="post.link" v-if="isMounted">
        <articleCard :post="post" />
      </div>
    </template>
    <template #sidebar-non-stay>
    </template>
    <template #sidebar-stay>
      <profieldcard />
      <div class="a-card vp-doc">
        <moreFuc />
      </div>
    </template>
  </MainLayout>
  <MainLayout v-else>
    <template #navbar>
    </template>
    <template #header>
      <div class="header-info" style="display: flex; width: 100%; justify-content: center;">
        <postinfo />
      </div>
    </template>
    <template #main-content>
      <div class="a-card vp-doc">
        <el-skeleton :rows="5" animated v-if="!isMounted || isTransitioning" />
        <Content v-show="isMounted && !isTransitioning" />
      </div>

    </template>
    <template #sidebar-non-stay>
      <profieldcard />
    </template>
    <template #sidebar-stay>
      <tocCard :posts="posts" :currentUrl="page.relativePath" />
      <div class="a-card vp-doc">
        <moreFuc />
      </div>
    </template>
  </MainLayout>
</template>
<style>
* {
  --el-fill-color-blank: transparent;
}

</style>