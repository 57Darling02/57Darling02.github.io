<template>
    <div class="firstview">
        <h1 class="main-title">{{ mainTitle }}</h1>
        <!-- 添加multipleStrings类名 -->
        <h2 class="subtitle multipleStrings"><span class="cursor">|</span></h2>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useData } from 'vitepress'
const { theme } = useData()
import TypeIt from 'typeit'
const mainTitle = ref(theme.value.mainTitle)
const subTitles = ref(theme.value.subTitles)
let typeitInstance = null
onMounted(() => {
  typeitInstance = new TypeIt('.subtitle', {
    strings: subTitles.value,
    speed: 100,
    breakLines: false,
    lifeLike: true,
    loop: true,
    cursor: {
      autoStart: false, // 使用我们自己的光标样式
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
    font-size: 3rem;
    margin-bottom: 1rem;
    color: wheat;
}

.subtitle {
    font-size: 1.5rem;
    min-height: 2em;
    color: white;
}

.cursor {
    animation: blink 0.7s infinite;
}

@keyframes blink {

    0%,
    100% {
        opacity: 1
    }

    50% {
        opacity: 0
    }
}

@keyframes typing {
    from {
        width: 0
    }

    to {
        width: 100%
    }
}

@keyframes blink-caret {

    from,
    to {
        border-color: transparent
    }

    50% {
        border-color: #333
    }
}

</style>