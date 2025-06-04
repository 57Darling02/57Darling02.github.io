<template>
    <el-switch v-model="isFocusMode"/>
</template>

<script setup lang="ts">
import { inject, } from 'vue'
const isFocusMode = inject('isFocusMode')
</script>
