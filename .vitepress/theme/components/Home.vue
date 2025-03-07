<template>
    <div class="firstview">
        <h1 class="main-title">{{ mainTitle }}</h1>
        <h2 class="subtitle">{{ typedText }}<span class="cursor">|</span></h2>
    </div>
</template>

<script setup>
import { ref, watchEffect, onUnmounted } from 'vue'
import { useData } from 'vitepress'
const { theme } = useData()
const mainTitle = ref(theme.value.mainTitle)
const subTitles = ref(theme.value.subTitles)
const currentSubTitle = ref(0)
const typedText = ref('')
let isDeleting = false
let timer

const typeWriter = () => {
    const fullText = subTitles.value[currentSubTitle.value]
    if (isDeleting) {
        typedText.value = fullText.substring(0, typedText.value.length - 1)
    } else {
        typedText.value = fullText.substring(0, typedText.value.length + 1)
    }

    let typeSpeed = 150
    if (isDeleting) typeSpeed = 75

    if (!isDeleting && typedText.value === fullText) {
        typeSpeed = 3000  // 保持时间从2秒增加到3秒
        isDeleting = true
    } else if (isDeleting && typedText.value === '') {
        isDeleting = false
        currentSubTitle.value = (currentSubTitle.value + 1) % subTitles.value.length
    }

    timer = setTimeout(typeWriter, typeSpeed)
}

watchEffect(() => {
    clearTimeout(timer)
    typeWriter()
})

onUnmounted(() => clearTimeout(timer))
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