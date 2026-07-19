<template>
  <div class="document-view">
    <div class="doc-header">
      <slot name="doc-header" />
    </div>

    <div class="content-ground">
      <div id="content-container">
        <div id="page-wrapper">
          <slot name="main-content" />
          <div v-if="isMobile" class="mobile-sidebar">
            <slot name="mobile-sidebar">
              <slot name="sidebar-non-stay" />
              <slot name="sidebar-stay" />
            </slot>
          </div>
        </div>

        <aside v-if="!isMobile" v-show="showSidebar" id="site-sidebar" class="sidebar">
          <slot name="sidebar-non-stay" />
          <div class="sidebar-stay" :class="{ 'nav-hidden': !showNavbar }">
            <slot name="sidebar-stay" />
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>
<script lang='ts' setup>
import { useLayoutState } from '../composables/useLayoutState'

const { showNavbar, showSidebar, isMobile } = useLayoutState()
</script>
<style lang="scss" scoped>
.document-view {
    width: 100%;
    margin-top: calc(-1 * var(--nav-height));
}

.doc-header {
    width: 100%;
}

.content-ground {
    width: 100%;
    background: var(--vp-c-content-ground);
}

#content-container {
    display: flex;
    justify-self: center;
    justify-content: center;
    margin: 0 auto;
    min-width: 0;
    position: relative;
    width: 100%;
    max-width: 1380px;
}

#page-wrapper {
    flex: 1 1 0;
    min-width: 0;
    padding: 20px 5px 0;
}

.mobile-sidebar {
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
    margin-top: 12px;
}

.sidebar {
    padding: 0px 10px;
    padding-top: 20px;
    // position: static;
    flex: 0 0 var(--sidebar-width);
    min-width: 0;
    max-width: var(--sidebar-width);
    opacity: 0;
    transform: translateX(20px);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    visibility: visible;
    display: flex;
    flex-direction: column;
    gap: 10px;
    animation: fadeInUp 1s ease-in-out 0.2s forwards;
}

.sidebar-stay {
    position: sticky;
    top: var(--nav-height);
    max-height: calc(100vh - (var(--nav-height)));
    /* 保留滚动缓冲空间 */
    transition:
        top 0.3s cubic-bezier(0.4, 0, 0.2, 1),
        transform 0.3s ease;
    will-change: top;
    z-index: 50;
    display: flex;
    flex-direction: column;
    &.nav-hidden {
        top: 10px;
        max-height: 100vh;
    }
}
</style>
