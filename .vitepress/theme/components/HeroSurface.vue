<template>
  <div class="hero-surface" :class="`is-${appearance}`">
    <div class="hero-surface-media" :style="backgroundStyle" aria-hidden="true">
      <img
        v-if="imageSource"
        :key="imageSource.src"
        class="hero-surface-image"
        :src="imageSource.src"
        alt=""
        @error="handleImageError"
      />

      <template v-if="showRainfall">
        <div
          v-for="layer in starLayers"
          :key="layer"
          :class="['hero-surface-star-layer', `layer${layer}`]"
          aria-hidden="true"
        />
      </template>

      <svg
        class="hero-surface-waves"
        viewBox="0 0 1440 72"
        preserveAspectRatio="none"
        shape-rendering="auto"
      >
        <defs>
          <path
            :id="waveId"
            d="M-240 32c160-18 320-18 480 0s320 18 480 0 320-18 480 0 320 18 480 0v72H-240Z"
          />
        </defs>
        <g>
          <use class="hero-surface-wave-layer wave-back" :href="`#${waveId}`" y="0" />
          <use class="hero-surface-wave-layer wave-middle" :href="`#${waveId}`" y="7" />
          <use class="hero-surface-wave-layer wave-front" :href="`#${waveId}`" y="14" />
        </g>
      </svg>
    </div>

    <div class="hero-surface-content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, useId, watch } from 'vue'
import { useData } from 'vitepress'
import { useLayoutState } from '../composables/useLayoutState'
import type ThemeConfig from '../types/ThemeConfig'

type Appearance = 'blurred' | 'clear'
type ImageSource = { src: string; kind: 'cover' | 'background' }

const props = withDefaults(defineProps<{
  cover?: string
  appearance?: Appearance
}>(), {
  cover: '',
  appearance: 'blurred',
})

const { theme, isDark } = useData<ThemeConfig>()
const { isMobile } = useLayoutState()
const waveId = `hero-surface-wave-${useId()}`
const coverFailed = ref(false)
const backgroundFailed = ref(false)
const starLayers = [2, 3, 4, 5]
const hexColorPattern = /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/

const normalizedCover = computed(() => props.cover.trim())
const themeBackground = computed(() => String(theme.value.background || '').trim())
const themeBackgroundColor = computed(() => {
  return hexColorPattern.test(themeBackground.value) ? themeBackground.value : ''
})
const themeBackgroundImage = computed(() => {
  return themeBackgroundColor.value ? '' : themeBackground.value
})
const imageSource = computed<ImageSource | undefined>(() => {
  if (normalizedCover.value && !coverFailed.value) {
    return { src: normalizedCover.value, kind: 'cover' }
  }

  if (themeBackgroundImage.value && !backgroundFailed.value) {
    return { src: themeBackgroundImage.value, kind: 'background' }
  }
})
const backgroundStyle = computed(() => ({
  backgroundColor: themeBackgroundColor.value || 'var(--hero-ground)',
}))
const showRainfall = computed(() => theme.value.bg_rainfall && !isDark.value && !isMobile.value)

function handleImageError() {
  if (imageSource.value?.kind === 'cover') {
    coverFailed.value = true
  } else {
    backgroundFailed.value = true
  }
}

watch(normalizedCover, () => {
  coverFailed.value = false
})

watch(themeBackground, () => {
  backgroundFailed.value = false
})
</script>

<style lang="scss" scoped>
@use "sass:list";
@use "sass:math";

.hero-surface {
  --hero-min-height: max(24rem, 65vh);
  --hero-ground: var(--vp-c-content-ground);
  --hero-wave-back: color-mix(in srgb, var(--hero-ground) 92%, var(--vp-c-brand) 8%);
  --hero-wave-middle: color-mix(in srgb, var(--hero-ground) 96%, var(--vp-c-brand) 4%);

  position: relative;
  isolation: isolate;
  display: grid;
  align-items: end;
  box-sizing: border-box;
  width: 100%;
  min-height: var(--hero-min-height);
  overflow: hidden;
  color: var(--vp-c-text);
}

.hero-surface-media {
  position: absolute;
  z-index: 0;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}

.hero-surface-media::after {
  position: absolute;
  z-index: 1;
  inset: 0;
  content: '';
  background: linear-gradient(
    to bottom,
    color-mix(in srgb, var(--hero-ground) 2%, transparent),
    color-mix(in srgb, var(--hero-ground) 56%, transparent) 56%,
    color-mix(in srgb, var(--hero-ground) 90%, transparent)
  );
}

.hero-surface-image {
  position: absolute;
  z-index: 0;
  inset: 0;
  width: 100%;
  height: 100%;
  max-width: none;
  object-fit: cover;
}

.hero-surface.is-blurred .hero-surface-media {
  backdrop-filter: blur(18px) saturate(1.08);
  -webkit-backdrop-filter: blur(18px) saturate(1.08);
}

.hero-surface.is-blurred .hero-surface-image {
  inset: -1.5rem;
  width: calc(100% + 3rem);
  height: calc(100% + 3rem);
  filter: blur(18px) saturate(1.08) brightness(0.72);
  transform: scale(1.03);
}

.hero-surface.is-clear .hero-surface-media::after {
  background: linear-gradient(
    to bottom,
    color-mix(in srgb, var(--hero-ground) 26%, transparent),
    color-mix(in srgb, var(--hero-ground) 62%, transparent) 56%,
    color-mix(in srgb, var(--hero-ground) 92%, transparent)
  );
}

.hero-surface-content {
  position: relative;
  z-index: 1;
  align-self: stretch;
  display: grid;
  align-items: end;
  min-width: 0;
}

.hero-surface-waves {
  position: absolute;
  z-index: 2;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: clamp(3rem, 6vw, 4.5rem);
}

.hero-surface-wave-layer {
  transform-box: fill-box;
  transform-origin: center;
  transform: scaleX(var(--wave-scale));
  will-change: transform;
}

.wave-back {
  --wave-scale: 1.08;

  fill: var(--hero-wave-back);
  animation: hero-wave-sway 10s cubic-bezier(0.45, 0, 0.55, 1) infinite alternate;
}

.wave-middle {
  --wave-scale: 1;

  fill: var(--hero-wave-middle);
  animation: hero-wave-sway 7s cubic-bezier(0.45, 0, 0.55, 1) -3s infinite alternate-reverse;
}

.wave-front {
  --wave-scale: 0.94;

  fill: var(--hero-ground);
  animation: hero-wave-sway 4.5s cubic-bezier(0.45, 0, 0.55, 1) -1s infinite alternate;
}

:global(.dark) .hero-surface {
  --hero-wave-back: color-mix(in srgb, var(--hero-ground) 82%, var(--vp-c-brand) 18%);
  --hero-wave-middle: color-mix(in srgb, var(--hero-ground) 92%, var(--vp-c-brand) 8%);
}

@function getShadows($count, $seed) {
  $shadows: ();

  @for $index from 1 through $count {
    $x: math.div(($index * $index * 37 + $index * 61 + $seed * 17) % 10000, 100);
    $y: math.div(($index * $index * 71 + $index * 19 + $seed * 29) % 10000, 100);
    $shadows: list.append($shadows, #{$x}vw #{$y}vh #fff, comma);
  }

  @return $shadows;
}

$duration: 400s;
$count: 250;

@for $i from 2 through 5 {
  $duration: math.div($duration, 2);
  $count: math.floor(math.div($count, 2));

  .hero-surface-star-layer.layer#{$i} {
    $size: $i * 1.2px;

    position: absolute;
    top: 0;
    left: 0;
    width: $size;
    height: $size;
    border-radius: 50%;
    background-color: antiquewhite;
    box-shadow: getShadows($count, $i * 97);
    animation: hero-stars-rise $duration linear infinite;

    &::after {
      position: absolute;
      top: 100%;
      left: 0;
      width: inherit;
      height: inherit;
      border-radius: inherit;
      content: '';
      box-shadow: inherit;
    }
  }
}

@keyframes hero-wave-sway {
  from {
    transform: translate3d(-5%, 0, 0) scaleX(var(--wave-scale));
  }

  to {
    transform: translate3d(5%, 0, 0) scaleX(var(--wave-scale));
  }
}

@keyframes hero-stars-rise {
  to {
    transform: translateY(-100vh);
  }
}

@media (max-width: 748px) {
  .hero-surface {
    --hero-min-height: clamp(17rem, 65svh, 28rem);

    min-height: var(--hero-min-height);
    align-items: center;
  }

  .hero-surface-content {
    align-items: center;
  }

  .hero-surface-star-layer {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-surface-star-layer {
    display: none;
  }

  .hero-surface-wave-layer {
    animation: none;
  }
}
</style>
