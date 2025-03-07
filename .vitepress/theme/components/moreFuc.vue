<template>
    <el-collapse v-if="isClient" accordion>
        <el-collapse v-model="activeName" accordion>
            <el-collapse-item v-for="(item, index) in menuItems" :title="item.label" :name="index">
                <div class="a-card" v-for="citem in item.children" @click="handleMenuClick(citem)">
                    <i :class="citem.icon"></i>
                    {{ citem.label }}
                </div>
            </el-collapse-item>
            <el-collapse-item title="文章" :name="wz">
                <el-scrollbar style="height: 800px">
                    <div v-for="(post, index) in posts" :name="post.link">
                    <articleCardmini :post="post" />
                </div>
                </el-scrollbar>
                
            </el-collapse-item>

        </el-collapse>
    </el-collapse>

</template>
<script setup>
import articleCardmini from './article-cardmini.vue'
import { useData } from 'vitepress'
const { theme, } = useData()
import { ref, onMounted } from 'vue'
const isClient = ref(false)
import { data as posts } from '../utils/posts.data.js'
const {
    menuItems = [
        {
            label: '更多',
            icon: 'fa-solid fa-list',
            children: [
                {
                    key: 'action1',
                    label: 'action1',
                    icon: 'fa-solid fa-circle',
                    link: 'website'
                },
                {
                    key: 'action2',
                    label: 'Action 2',
                    icon: 'fa-solid fa-square',
                    link: 'index'
                },
                {
                    key: 'action3',
                    label: 'Action 3',
                    icon: 'fa-solid fa-star',
                    link: 'website'
                }
            ]
        }
    ]
} = theme.value


const activeName = ref('1')

const handleMenuClick = (item) => {
    if (item.children?.length) {
        return
    }

    if (item.link) {
        // 生成完整路径
        const basePath = window.location.origin
        const fullPath = item.link.startsWith('/')
            ? `${basePath}${item.link}`
            : `${basePath}/${item.link}`

        if (item.link.startsWith('http')) {
            window.open(item.link, '_blank')
        }
        else {
            window.open(fullPath, '_blank') // 保持新标签页打开行为
        }
    }
}
onMounted(() => {
    isClient.value = true
})
</script>
<style scoped>
.a-card {
    --el-fill-color-blank: transparent;
}
</style>