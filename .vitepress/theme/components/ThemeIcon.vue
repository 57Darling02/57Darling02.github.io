<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { iconRegistry } from 'virtual:theme-icons'
import { isFontAwesomeIcon } from '../utils/fontAwesome'

const props = withDefaults(defineProps<{
  name?: string
  size?: number | string
  src?: string
  strokeWidth?: number | string
}>(), {
  name: 'circle-help',
  size: '1em',
  strokeWidth: 2,
})

const imageFailed = ref(false)
const icon = computed(() => iconRegistry[props.name] || iconRegistry['circle-help'])
const showImage = computed(() => Boolean(props.src) && !imageFailed.value)
const showFontAwesomeIcon = computed(() => isFontAwesomeIcon(props.name))
const cssSize = computed(() => typeof props.size === 'number' ? `${props.size}px` : props.size)

watch(() => props.src, () => {
  imageFailed.value = false
})
</script>

<template>
  <img
    v-if="showImage"
    class="theme-icon theme-icon-image"
    :src="src"
    alt=""
    aria-hidden="true"
    :style="{ width: cssSize, height: cssSize }"
    @error="imageFailed = true"
  />
  <i
    v-else-if="showFontAwesomeIcon"
    :class="['theme-icon', 'theme-icon-font-awesome', name]"
    aria-hidden="true"
    :style="{ fontSize: cssSize, width: cssSize, height: cssSize }"
  />
  <component
    v-else
    :is="icon"
    class="theme-icon"
    :size="size"
    :stroke-width="strokeWidth"
    aria-hidden="true"
    focusable="false"
    :style="{ width: cssSize, height: cssSize }"
  />
</template>

<style scoped>
.theme-icon {
  display: inline-block;
  flex: 0 0 auto;
  width: 1em;
  height: 1em;
  vertical-align: -0.125em;
}

.theme-icon-image {
  display: inline-block;
  object-fit: contain;
}

.theme-icon-font-awesome {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  text-align: center;
}
</style>
