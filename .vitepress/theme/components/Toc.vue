<script lang="ts" setup>
import { ElTree } from 'element-plus'
import { onContentUpdated, useData } from 'vitepress'
import { nextTick, onMounted, ref, shallowRef } from 'vue'
const { frontmatter, theme } = useData()
const treeRef = ref<InstanceType<typeof ElTree>>()

const treeProps = {
    children: 'children',
    label: 'label',
    value: 'value'
}
const scrollContainer = ref()
const scrollTocContainer = ref()
const getScrollContainer = () => {
    if (typeof window === 'undefined') return null
    return document.querySelector('.el-scrollbar__wrap') || window
}
onMounted(() => {
    scrollContainer.value = getScrollContainer()
    headers.value = getHeaders(frontmatter.value.outline ?? theme.value.outline ?? 'deep');
})
// onContentUpdated(() => {
//     headers.value = getHeaders(frontmatter.value.outline ?? theme.value.outline ?? 'deep');
// })

const anchor_change = (e: string) => {
    treeRef.value?.setCurrentKey(e)
    // const currentNode = treeRef.value?.getCurrentNode()
    // const currentKey = treeRef.value?.getCurrentKey()
    if (typeof window === 'undefined') return
    window.history.replaceState(null, '', e)
    nextTick()
    move2current_anchor()
}
const move2current_anchor = () => {
    if (treeRef.value?.getCurrentKey() && scrollTocContainer.value) {
        const nodeEl = treeRef.value?.$el.querySelector(`.el-anchor__link.is-active`)
        // console.log('nodeEl:', nodeEl)
        if (!nodeEl) return
        // 获取滚动容器元素
        const TocContainer = scrollTocContainer.value.$el.querySelector('.el-scrollbar__wrap');
        if (!TocContainer) return;

        // 计算元素位置
        const containerRect = TocContainer.getBoundingClientRect();
        const nodeRect = nodeEl.getBoundingClientRect();

        // 计算元素在容器内的相对位置
        const nodeTopRelative = nodeRect.top - containerRect.top + TocContainer.scrollTop;
        const nodeBottomRelative = nodeRect.bottom - containerRect.top + TocContainer.scrollTop;

        // 判断是否在可视区域内
        const isVisible = (
            nodeTopRelative >= TocContainer.scrollTop &&
            nodeBottomRelative <= TocContainer.scrollTop + containerRect.height
        );

        // 如果不在可视区域内，滚动到可见位置
        if (!isVisible) {
            // 计算目标滚动位置
            const targetPosition = nodeTopRelative - (containerRect.height / 2);
            // 使用平滑滚动
            TocContainer.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }
}
//根据官方主题简化的大纲逻辑
const headers = shallowRef<Node[]>([])


interface Node {
    children: Node[];
    label: string;
    value: string;
    level: number;
}
function getHeaders(range: any) {
    if (range === false) {
        return [];
    }
    const headers = [
        ...document.querySelectorAll('.vp-doc :where(h1,h2,h3,h4,h5,h6)')
    ]
        .filter((el) => el.id && el.hasChildNodes())
        .map((el) => {
            const level = Number(el.tagName[1]);
            return {
                label: serializeHeader(el),
                value: '#' + el.id,
                level,
                children: [],
            } as Node;
        });

    // return headers
    return resolveHeaders(headers, range);
}
function serializeHeader(h: Element) {
    let ret = '';
    for (const node of h.childNodes) {
        if (node.nodeType === 1) {
            ret += node.textContent;
        }
        else if (node.nodeType === 3) {
            ret += node.textContent;
        }
    }
    return ret.trim();
}
function resolveHeaders(headers, range) {
    const levelsRange = (typeof range === 'object' && !Array.isArray(range)
        ? range.level
        : range) || 2;
    const [high, low] = typeof levelsRange === 'number'
        ? [levelsRange, levelsRange]
        : levelsRange === 'deep'
            ? [2, 6]
            : levelsRange;
    return buildTree(headers, high, low);
}
function buildTree(data: Node[], min: number, max: number) {
    const result: Node[] = [];
    const stack: Node[] = [];
    data.forEach((item) => {
        const node: Node = item as Node;
        let parent = stack[stack.length - 1];
        while (parent && parent.level >= node.level) {
            stack.pop();
            parent = stack[stack.length - 1];
        }
        if (node.level > max || node.level < min)
            return;
        if (parent)
            parent.children.push(node);
        else
            result.push(node);
        stack.push(node);
    });
    return result;
}
</script>

<template>
    <span class="toc-title" style="font-weight: 600;height: 25px;"><i class="fas fa-columns" />目录导航 <el-button
            type="default" size="small" @click="move2current_anchor" >锚点定位<i class="fa-regular fa-circle-dot"></i></el-button>
    </span>

    <el-anchor v-if="headers.length" :container="scrollContainer" :offset="45" direction="vertical"
        style="background-color: transparent;flex: 1;overflow: hidden;display: flex;" :marker="false"
        :select-scroll-top="true" @change="anchor_change">
        <el-scrollbar style="flex: 1;" ref="scrollTocContainer">
            <el-tree ref="treeRef" style="max-width: 300px;background-color: transparent;" :data="headers"
                :props="treeProps" :expand-on-click-node="false" :highlight-current="true" :indent="12"
                :check-on-click-leaf="false" node-key="value" :auto-expand-parent="false" :render-after-expand="false">
                <template #default="{ node, data }">
                    <el-anchor-link :href="`${data.value}`" :title="data.label">
                    </el-anchor-link>
                </template>
            </el-tree>
        </el-scrollbar>

    </el-anchor>
</template>

<style lang="scss">
.el-anchor__list {
    flex: 1;
    display: flex;
    overflow: hidden;
}
</style>
