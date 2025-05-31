<script lang="ts" setup>
import { inject, nextTick, provide, ref, watchPostEffect } from 'vue'
import { useData } from 'vitepress'
import VPSwitch from './VPSwitch.vue'

const { isDark, theme } = useData()

const toggleAppearance = async (e?: MouseEvent) => {
    const enableTransitions = () =>
        'startViewTransition' in document &&
        window.matchMedia('(prefers-reduced-motion: no-preference)').matches

    if (!enableTransitions()) {
        isDark.value = !isDark.value
        return
    }

    const x = e?.clientX || innerWidth / 2
    const y = e?.clientY || innerHeight / 2

    const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${Math.hypot(
            Math.max(x, innerWidth - x),
            Math.max(y, innerHeight - y)
        )}px at ${x}px ${y}px)`
    ] as AnimationKeyFrame[]

    await document.startViewTransition(async () => {
        isDark.value = !isDark.value
        await nextTick()
    }).ready

    document.documentElement.animate(
        { clipPath : isDark.value ? clipPath.reverse() : clipPath },
        {
            duration: 300,
            easing: 'ease-in',
            pseudoElement: `::view-transition-${isDark.value ? 'old' : 'new'}(root)`
        }
    )
}
provide('toggle-appearance', toggleAppearance)

const switchTitle = ref('')

watchPostEffect(() => {
  switchTitle.value = isDark.value
    ? theme.value.lightModeSwitchTitle || 'Switch to light theme'
    : theme.value.darkModeSwitchTitle || 'Switch to dark theme'
})
</script>

<template>
  <VPSwitch :title="switchTitle" class="VPSwitchAppearance" :aria-checked="isDark" @click="toggleAppearance">
    <span class="vpi-sun sun" />
    <span class="vpi-moon moon" />
  </VPSwitch>
</template>

<style scoped>
.VPSwitchAppearance {
  width: 40px;
}
.sun {
  opacity: 1;
}

.moon {
  opacity: 0;
}

.dark .sun {
  opacity: 0;
}

.dark .moon {
  opacity: 1;
}

.dark .VPSwitchAppearance :deep(.check) {
  /*rtl:ignore*/
  transform: translateX(18px);
}
</style>
