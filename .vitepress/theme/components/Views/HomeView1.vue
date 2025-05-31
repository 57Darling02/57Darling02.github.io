<template>
  <div class="firstview">
    <el-text truncated type="success" size="large" class="main-title">
      <h2 class="main-title">{{ mainTitle }}</h2>
    </el-text>
    <h3 class="subtitle multipleStrings"></h3>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useData } from 'vitepress'
const { theme } = useData()
import TypeIt from 'typeit'
const mainTitle = ref(theme.value.home.mainTitle || 'VitePress Theme')
const subTitles = ref(theme.value.home.subTitles || ['VitePress Theme'])
let typeitInstance = null
onMounted(() => {
  typeitInstance = new TypeIt('.subtitle', {
    strings: subTitles.value,
    speed: 100,
    breakLines: false,
    lifeLike: true,
    loop: true,
    cursor: {
      autoStart: true,
      animation: { opacity: 0 }
    }
  }).go()
})

onUnmounted(() => {
  typeitInstance?.destroy()
})
</script>
<style>
.firstview {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.main-title {
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: wheat;
}

.subtitle {
  font-size: 1.5rem;
  min-height: 2em;
  color: antiquewhite;
}
</style>