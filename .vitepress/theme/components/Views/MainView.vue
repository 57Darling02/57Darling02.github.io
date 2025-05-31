<template>
    <template v-if="frontmatter.layout === 'home'">
        <content />
    </template>
    <template v-else-if="frontmatter.layout === 'page'">
        <content />
    </template>
    <template v-else>
        <div style="display: flex;flex-direction: column;align-items: center;">
            <DocView />
        </div>

    </template>
</template>
<script lang='ts' setup>
import { useData } from 'vitepress'
import { computed } from 'vue'
import DocView from './DocView.vue'
const data = useData()
const frontmatter = computed(() => data.frontmatter.value)

</script>
<style lang="scss" scoped>

</style>