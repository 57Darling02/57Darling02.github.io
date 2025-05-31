<template>
    <div 
        class="bg-space" 
        :style="BGIMG_url ? { 
            backgroundImage: `url(${BGIMG_url})`, 
            backgroundSize: 'cover',       /* 自适应覆盖容器 */
            backgroundPosition: 'center',  /* 居中显示 */
            backgroundRepeat: 'no-repeat'  /* 禁止重复 */
        } : {}"
    >
        <div  v-for="layer in 5" :class="`layer${layer}`" />
    </div>
</template>
<script lang='ts' setup>
import { useData } from 'vitepress'
const { theme, page, frontmatter } = useData()
const BGIMG_url = theme.value.background || ''

</script>
<style lang="scss" scoped>
@use "sass:math";
@use "sass:string";
.bg-space {
    z-index: -1;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: radial-gradient(
        ellipse at center,
        #0a0a2a 0%,
        #000033 50%,
        #000000 100%
    );
}

@function getShadows($count) {
    $shadows: '';
    @for $_ from 1 through $count {
        $shadows: '#{$shadows}#{math.random(100)}vw #{math.random(100)}vh #fff,';
    }
    @return string.unquote(string.slice($shadows, 1, -2));
}


$duration: 400s;
$count: 1000;
@for $i from 1 through 5 {
    $duration: calc($duration / 2);
    $count: math.floor(calc($count / 2));
    .layer#{$i} {
        $size: #{$i}px;
        position: fixed;
        width: $size;
        height: $size;
        border-radius: 50%;
        left: 0;
        top: 0;
        background-color: antiquewhite;
        box-shadow: getShadows($count);
        animation: moveUp $duration linear infinite;
        &::after {
            content: '';
            position: fixed;
            left: 0;
            top: 100vh;
            border-radius: inherit;
            width: inherit;
            height: inherit;
            box-shadow: inherit;
        }
    }
}

@keyframes moveUp {
    to {
        transform: translateY(-100vh);
    }
}


</style>