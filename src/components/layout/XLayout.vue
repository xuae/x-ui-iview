<template>
  <Layout class="layout">
    <x-layout-sidebar @reload-view="onReloadView" />

    <Layout class="layout__container">
      <x-layout-header />

      <Content ref="content" class="layout__content">
        <x-back-top :target="backTopTarget" class="layout__back"></x-back-top>
        <router-view
          v-if="isRouterAlive"
          :key="$route.fullPath"
          class="layout__view"
        />
      </Content>
    </Layout>
  </Layout>
</template>

<script>
import XLayoutHeader from '@/components/layout/XLayoutHeader';
import XLayoutSidebar from '@/components/layout/XLayoutSidebar';
export default {
  name: 'XLayout',
  components: { XLayoutHeader, XLayoutSidebar },
  provide() {
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
      isCollapsed: false,
      isRouterAlive: true,
      backTopTarget: () => window,
    };
  },
  mounted() {
    this.backTopTarget = () => this.$refs.content.$el;
  },
  methods: {
    // 子组件需要刷新当前 view 时调用的方法
    onReloadView() {
      this.reload();
    },

    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.layout {
  display: flex;
  flex: auto;
  flex-direction: row;
  height: calc(100vh - 1px);

  &__container {
    /*display: block; // 顶部不固定*/
    overflow-x: hidden;
  }

  &__content {
    margin: 0;
    padding: @padding-md;
    background: transparent;
    overflow: auto;
  }

  &__view {
    //margin: @padding-md 0 @padding-lg;
    //margin-bottom: @padding-md;
    min-height: 60vh;

    &.ant-card,
    /deep/ .ant-card {
      border: none;
      margin-bottom: @padding-md;
    }
  }

  &__back {
    //box-shadow: @shadow-base;
    //border-radius: 50%;
    //z-index: 30;
  }
}
</style>
