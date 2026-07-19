<script lang="ts" setup>
import { computed, nextTick } from 'vue'
import { useData } from 'vitepress'
import ThemeIcon from '../ThemeIcon.vue'

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
    { clipPath: isDark.value ? clipPath.reverse() : clipPath },
    {
      duration: 300,
      easing: 'ease-in',
      pseudoElement: `::view-transition-${isDark.value ? 'old' : 'new'}(root)`
    }
  )
}
const switchTitle = computed(() => isDark.value
    ? theme.value.lightModeSwitchTitle || 'Switch to light theme'
    : theme.value.darkModeSwitchTitle || 'Switch to dark theme')
</script>

<template>
    <button class="control-icon-button" type="button" :title="switchTitle" :aria-label="switchTitle" @click="toggleAppearance">
      <ThemeIcon :name="isDark ? 'sun' : 'moon'" />
    </button>
</template>

<style scoped>
.control-icon-button {
  border: 0;
  padding: 0;
  background: transparent;
  color: inherit;
  cursor: pointer;
  line-height: 1;
}
</style>
