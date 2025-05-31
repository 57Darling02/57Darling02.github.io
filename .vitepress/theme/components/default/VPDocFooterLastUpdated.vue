<script setup lang="ts">
import { ref, computed, watchEffect, onMounted } from 'vue'
import { useData } from 'vitepress'
const { theme, page, lang } = useData()
// 添加有效性检查
const hasValidDate = computed(() => {
  return page.value.lastUpdated && !isNaN(new Date(page.value.lastUpdated).getTime())
});

const date = computed(() => 
  hasValidDate.value ? new Date(page.value.lastUpdated!) : new Date()
);

const isoDatetime = computed(() => 
  hasValidDate.value ? date.value.toISOString() : ''
);

const datetime = ref('')

// set time on mounted hook to avoid hydration mismatch due to
// potential differences in timezones of the server and clients
onMounted(() => {
  watchEffect(() => {
    datetime.value = new Intl.DateTimeFormat(
      theme.value.lastUpdated?.formatOptions?.forceLocale ? lang.value : undefined,
      theme.value.lastUpdated?.formatOptions ?? {
        dateStyle: 'short',
        timeStyle: 'short'
      }
    ).format(date.value)
  })
})
</script>

<template>
  <a class="VPLastUpdated">
    {{ theme.lastUpdated?.text || theme.lastUpdatedText || 'Last updated' }}:
    <time :datetime="isoDatetime">{{ datetime }}</time>
  </a>
</template>

<style scoped>
.VPLastUpdated {
  line-height: 24px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-2);
}

@media (min-width: 640px) {
  .VPLastUpdated {
    line-height: 32px;
    font-size: 14px;
    font-weight: 500;
  }
}
</style>
