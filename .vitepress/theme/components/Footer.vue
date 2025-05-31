<template>
    <div class="divider">
        <div class="divider-line" />
    </div>
    <div class="footer-container">
        <el-text style='color: var(--vp-c-text-2);'>
            {{ message }}
        </el-text>
        <el-tag size="small" type="success" effect="plain" round>
            {{ copyright }}
        </el-tag>
    </div>
</template>
<script lang='ts' setup>
import { useData } from 'vitepress'
const { theme, page, frontmatter } = useData()
const footer = theme.value.footer || {}
// 得到配置中的footer信息
const copyright = footer.copyright || ''
const message = footer.message || ''
</script>
<style lang="scss" scoped>
.divider {
    width: 100%;
    height: 1px;
}
.footer-container{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10px;
    padding-bottom: 25px;
    padding-top: 25px;
}
.divider-line {
    width: 100%;
    height: 1px;
    transition: background-color 0.5s;
    background-color: var(--vp-c-gutter);
}
</style>