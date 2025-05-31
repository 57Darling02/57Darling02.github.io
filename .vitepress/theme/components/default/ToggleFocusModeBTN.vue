<template>
    <el-switch v-model="isFocusMode" :active-action-icon="Opportunity" :inactive-action-icon="ToiletPaper" />
</template>

<script setup lang="ts">
import { Opportunity, ToiletPaper } from '@element-plus/icons-vue'
import { inject, } from 'vue'
const isFocusMode = inject('isFocusMode')


</script>
