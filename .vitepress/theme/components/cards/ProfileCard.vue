<template>
  <section
    class="a-card profile-card"
    :class="{ 'has-introduction': introduction }"
    :aria-label="`${name} 的个人资料`"
  >
    <div class="profile-stage">
      <div class="profile-panel profile-identity">
        <div class="avatar-wrapper">
          <img :src="avatarSrc" :alt="name" class="avatar" @error="handleAvatarError" />
        </div>
      </div>

      <p v-if="introduction" class="profile-panel profile-introduction">
        {{ introduction }}
      </p>
    </div>

    <div class="profile-footer">
      <div class="profile-meta">
        <p class="name">{{ name }}</p>
        <p v-if="signature" class="signature">{{ signature }}</p>
      </div>

      <nav v-if="socialLinks.length" class="social-links" :aria-label="`${name} 的社交链接`">
        <a
          v-for="(link, index) in socialLinks"
          :key="index"
          :href="link.url"
          target="_blank"
          rel="noopener noreferrer"
          class="social-item"
          :aria-label="link.name"
        >
          <ThemeIcon :name="link.icon" :src="link.iconUrl" />
        </a>
      </nav>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useData } from 'vitepress'
import type ThemeConfig from '../../types/ThemeConfig'
import ThemeIcon from '../ThemeIcon.vue'

const { theme } = useData<ThemeConfig>()

const {
  avatar = '',
  name = 'Unnamed',
  signature = '',
  introduction = '',
  socialLinks = [],
} = theme.value

const normalizeAvatarSrc = (value: unknown) => typeof value === 'string' ? value.trim() : ''

const escapeXml = (value: string) => value.replace(/[<>&'\"]/g, (character) => ({
  '<': '&lt;',
  '>': '&gt;',
  '&': '&amp;',
  "'": '&apos;',
  '"': '&quot;',
})[character] as string)

const createInlineAvatar = (displayName: string) => {
  const label = (displayName || 'U').trim().slice(0, 2).toUpperCase() || 'U'
  const safeLabel = escapeXml(label)
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" role="img" aria-label="${safeLabel}">
      <defs>
        <linearGradient id="avatar-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#4f46e5" />
          <stop offset="100%" stop-color="#0ea5e9" />
        </linearGradient>
      </defs>
      <rect width="100" height="100" rx="50" fill="url(#avatar-gradient)" />
      <text x="50" y="54" text-anchor="middle" dominant-baseline="middle" fill="#ffffff" font-family="Arial, sans-serif" font-size="36" font-weight="700">${safeLabel}</text>
    </svg>
  `

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`
}

const inlineFallbackAvatar = computed(() => createInlineAvatar(name))
const avatarSrc = ref(normalizeAvatarSrc(avatar) || inlineFallbackAvatar.value)

const handleAvatarError = (event: Event) => {
  avatarSrc.value = inlineFallbackAvatar.value

  if (event.target instanceof HTMLImageElement) {
    event.target.onerror = null
    event.target.src = avatarSrc.value
  }
}
</script>

<style lang="scss" scoped>
.profile-card {
  padding: 0;
  overflow: hidden;
}

.profile-stage {
  display: grid;
  place-items: center;
  min-block-size: 9.5rem;
  padding: 1rem 1.25rem;
}

.profile-panel {
  grid-area: 1 / 1;
  min-width: 0;
}

.profile-identity {
  display: grid;
  place-items: center;
  transition: opacity 180ms ease, transform 260ms cubic-bezier(0.22, 1, 0.36, 1);
}

.avatar-wrapper {
  width: 5.75rem;
  aspect-ratio: 1;
  overflow: hidden;
  border: 3px solid color-mix(in srgb, var(--vp-c-brand) 72%, var(--vp-c-bg));
  border-radius: 50%;
  box-shadow: 0 8px 18px color-mix(in srgb, var(--vp-c-brand) 20%, transparent);
}

.avatar {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.profile-introduction {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 0.875rem;
  line-height: 1.7;
  text-align: justify;
  opacity: 0;
  pointer-events: none;
  transform: translateY(1rem);
  transition: opacity 180ms ease, transform 260ms cubic-bezier(0.22, 1, 0.36, 1);
}

.profile-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.75rem;
  min-block-size: 3.875rem;
  padding: 0.75rem 1rem 0.875rem;
  border-top: 1px solid color-mix(in srgb, var(--vp-c-divider) 62%, transparent);
}

.profile-meta {
  flex: 1 1 7rem;
  min-width: 0;
}

.name {
  margin: 0;
  overflow: hidden;
  color: var(--vp-c-text-1);
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.signature {
  margin: 0.35rem 0 0;
  overflow: hidden;
  color: var(--vp-c-text-2);
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 1;
  opacity: 0.72;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.social-links {
  display: flex;
  flex: 0 1 auto;
  flex-wrap: wrap;
  justify-content: flex-end;
  max-width: 100%;
  margin-left: auto;
  gap: 0.375rem;
}

.social-item {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.125rem;
  aspect-ratio: 1;
  border-radius: 50%;
  background: color-mix(in srgb, var(--vp-c-bg-alt) 82%, var(--vp-c-brand) 18%);
  color: var(--vp-c-text-2);
  transition: background-color 180ms ease, color 180ms ease, transform 180ms ease;
}

.social-item:hover {
  background: var(--vp-c-brand);
  color: var(--vp-c-white);
  transform: translateY(-1px);
}

.social-item:focus-visible {
  outline: 2px solid var(--vp-c-brand);
  outline-offset: 3px;
}

.social-item :deep(.theme-icon) {
  font-size: 1.1rem;
}

@media (hover: hover) and (pointer: fine) {
  .profile-card.has-introduction:is(:hover, :focus-within) .profile-identity {
    opacity: 0;
    transform: translateY(-1rem);
  }

  .profile-card.has-introduction:is(:hover, :focus-within) .profile-introduction {
    opacity: 1;
    pointer-events: auto;
    transform: translateY(0);
  }
}

@media (hover: none), (pointer: coarse) {
  .profile-stage {
    display: flex;
    flex-direction: column;
    gap: 0.875rem;
    min-block-size: 0;
  }

  .profile-panel {
    grid-area: auto;
  }

  .profile-introduction {
    opacity: 1;
    pointer-events: auto;
    text-align: center;
    transform: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .profile-identity,
  .profile-introduction,
  .social-item {
    transition: none;
  }
}

</style>
