<template>
  <el-drawer v-model="drawer" size="90%" style="background-color: antiquewhite;">
    <moreFuc />
  </el-drawer>
  <nav class="navbar">
    <!-- 左侧区 -->
    <div class="brand-group">
      <a class="brand-logo" href="/">
        <img :src="logo" alt="avatar">
      </a>
      <a class="brand-text" href="/">{{ title }}</a>
    </div>

    <!-- 中间区 -->
    <div class="search-container">
      <div class="search-input" v-if="false">
        <input type="text" placeholder="动物怎么叫" class="search-field">
        <i class="fa-solid fa-magnifying-glass search-icon"></i>
      </div>
    </div>

    <!-- 右侧菜单区 -->
    <div class="menu-group">
      <div class="dropitem">
        <el-dropdown v-for="item in menuItems" :key="item.label" popper-class="custom-dropdown">
          <h3 class="menu-fitem">
            <span>
              <i :class="item.icon"></i>
              {{ item.label }}
              <i class="fa-light fa-angle-up arrow-icon"></i>
            </span>
          </h3>
          <template #dropdown v-if="item.children?.length">
            <el-dropdown-menu>
              <el-dropdown-item v-for="subitem in item.children" :key="subitem.key" class="menu-item"
                @click="handleMenuClick(subitem)">
                <i :class="subitem.icon"></i>
                {{ subitem.label }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <div class="sbbtn">
        <h3 class="menu-fitem">
        <span>
          <i class="fa-solid fa-list" @click="drawer = true"></i>
        </span>
      </h3>
      </div>
      
    </div>

  </nav>
</template>

<script setup>
import moreFuc from './moreFuc.vue';
import { ref } from 'vue'
import { useData } from 'vitepress'
const { theme } = useData()
const {
  logo = theme.value.logo,
  title = theme.value.siteTitle,
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

const drawer = ref(false)

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
</script>

<style>
.navbar {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  align-items: center;
  height: var(--nav-height);
  padding: 0 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  border-color: rgba(228, 195, 195, 0.13);
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
}

/* 品牌区样式 */
.navbar .brand-group {
  display: flex;
  align-items: center;
  gap: 12px;
}

.brand-logo img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  transition: transform 0.3s ease;
}

.brand-group:hover img {
  transform: scale(1.1);
}

.brand-text {
  color: white;
  font-weight: 600;
  font-size: 1.2rem;
  text-decoration: none;
}


/* 菜单区样式 */
el-dropdown,
.menu-group {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  border: 0px;
}

[class*="el-"]:focus-visible {
  outline: none !important;
}

.menu-fitem {
  color: white;
  line-height: 2;
  margin-left: 20px;
}

.menu-fitem span {
  background: linear-gradient(to right, #3498db, #2980b9) no-repeat left bottom;
  background-size: 0 5px;
  transition: background-size 0.3s;
  padding-bottom: 10px;
  font-size: 1rem;
  white-space: nowrap;
  /* 新增禁止换行属性 */
  display: inline-flex;
  /* 使用弹性布局保持元素对齐 */
  align-items: center;
  gap: 6px;
  /* 控制图标和文字间距 */
}

.menu-fitem span:hover {
  background-size: 100% 5px;
}

.sbbtn {
  display: none;
}

.arrow-icon {
  margin-left: 8px;
  transition: transform 0.3s ease;
  display: inline-block;
}

.menu-fitem:hover .arrow-icon {
  transform: rotate(180deg);
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .navbar {
    grid-template-columns: auto 1fr auto;
    padding: 0 16px;
  }

  .brand-text {
    display: none;
  }

}

@media (max-width: 768px) {
  .search-container {
    display: none;
  }

  .navbar {
    grid-template-columns: auto 1fr;
  }
}

@media (max-width: 480px) {
  .menu-fitem i {
    margin: 0;
  }
  .dropitem{
    display: none;
  }

  .sbbtn {
    display: flex;
  }

}

</style>