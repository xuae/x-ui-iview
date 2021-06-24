<!--布局左侧边栏 - 包含logo、菜单导航-->
<template>
  <Sider
    v-model="menuCollapsed"
    class="layout-sidebar"
    :class="`layout-sidebar--${sidebar.theme}`"
    hide-trigger
    :breakpoint="sidebar.breakpoint"
    :collapsed-width="sidebar.collapsedWidth"
    :collapsible="sidebar.collapsible"
    :default-collapsed="sidebar.defaultCollapsed"
    :width="sidebar.width"
  >
    <!--Logo-->
    <div class="layout-sidebar__logo">
      <img src="@/assets/logo.png" alt="" />
      <h1>X UI IView</h1>
    </div>
    <!--菜单-->
    <Menu
      mode="vertical"
      class="menu"
      width="auto"
      :class="sidebar.collapsed ? 'menu--collapsed' : ''"
      :theme="sidebar.theme"
      :accordion="sidebar.uniqueOpened"
      :open-names="openMenuKeys"
      :active-name="selectedMenuKey"
      @on-open-change="onOpenChange"
      @on-select="onClick"
    >
      <template v-for="item in routes">
        <!--隐藏的菜单不显示-->
        <template v-if="showMenu(item)">
          <!--一级根菜单，menu = item-->
          <template v-if="isRootMenu(item)">
            <MenuItem
              v-if="!getSubMenus(item)"
              :key="item.name"
              :name="item.name"
            >
              <Icon v-if="getMenuIcon(item)" :type="getMenuIcon(item)" />
              <span>{{ getMenuTitle(item) }}</span>
            </MenuItem>
            <x-layout-sidebar-menu v-else :key="item.name" :menu="item" />
          </template>
          <!--不是一级根菜单，显示其第一个子元素，menu = item.children[0]-->
          <template v-else>
            <MenuItem
              v-if="!getSubMenus(item.children[0])"
              :key="item.children[0].name"
              :name="item.children[0].name"
            >
              <Icon
                v-if="getMenuIcon(item.children[0])"
                :type="getMenuIcon(item.children[0])"
              />
              <span>{{ getMenuTitle(item.children[0]) }}</span>
            </MenuItem>
            <x-layout-sidebar-menu
              v-else
              :key="item.children[0].name"
              :menu="item.children[0]"
            />
          </template>
        </template>
      </template>
    </Menu>
  </Sider>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import XLayoutSidebarMenu from '@/components/layout/XLayoutSidebarMenu';

export default {
  name: 'XLayoutSidebar',
  components: { XLayoutSidebarMenu },
  inject: {
    reloadView: 'reload',
  },
  data() {
    return {
      // 菜单折叠状态
      menuCollapsed: false,
      // 选中的菜单 key 值
      selectedMenuKey: '',
      // 展开的菜单 key 数组
      openMenuKeys: [],
      // 存放菜单折叠时，展开的 key 数组
      tempOpenMenuKeys: [],
    };
  },
  computed: {
    ...mapState(['sidebar']),
    collapsed() {
      return this.sidebar.collapsed;
    },
    routes() {
      return this.$router.options.routes;
    },
    route() {
      return this.$route;
    },
    rootMenuKeys() {
      const keys = [];
      this.routes.forEach(route => {
        if (this.isRootMenu(route)) {
          if (this.getSubMenus(route) && route.name) {
            keys.push(route.name);
          }
        } else if (route.children) {
          if (this.getSubMenus(route.children[0]) && route.children[0].name) {
            keys.push(route.children[0].name);
          }
        }
      });
      return keys;
    },
  },
  watch: {
    menuCollapsed(val) {
      this.setCollapsed(val);
    },
    collapsed(val) {
      if (val) {
        this.tempOpenMenuKeys = [...this.openMenuKeys];
        this.openMenuKeys = [];
      } else {
        this.openMenuKeys = [...this.tempOpenMenuKeys];
      }
      this.menuCollapsed = val;
    },
    route: {
      handler(route) {
        if (route.name) {
          this.selectedMenuKey = route.name;
        }
        const openKeys = [];
        route.matched.forEach(item => {
          if (item.name && item.name !== route.name) {
            openKeys.push(item.name);
          }
        });
        if (this.sidebar.uniqueOpened) {
          this.openMenuKeys = openKeys;
        } else {
          this.openMenuKeys = [...new Set([...this.openMenuKeys, ...openKeys])];
        }
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    ...mapMutations({ setCollapsed: 'sidebar/SET_COLLAPSED' }),
    // 多级菜单展开事件
    onOpenChange(openKeys) {
      // console.log('open', openKeys, this.openMenuKeys);
      if (this.collapsed) {
        return;
      }
      if (this.sidebar.uniqueOpened) {
        // latestOpenKey 无值表示当前菜单被关闭，有值表示当前点击展开的菜单 key
        const latestOpenKey = openKeys.find(
          key => !this.openMenuKeys.includes(key)
        );
        let data = openKeys;
        if (latestOpenKey && this.rootMenuKeys.includes(latestOpenKey)) {
          data = [latestOpenKey];
        }
        this.openMenuKeys = data;
      } else {
        this.openMenuKeys = openKeys;
      }
    },

    // 子菜单点击事件
    onClick(key) {
      if (this.route.name === key) {
        // 若在当前页，则刷新页面
        this.reloadView();
      } else {
        this.$router.push(
          { name: key },
          () => {
            this.selectedMenuKey = key;
          },
          error => {
            this.reloadView();
          }
        );
      }
    },

    // 是否显示菜单
    showMenu(menu) {
      if (this.route.name === menu.name) {
        // 无论当前菜单是否隐藏，只要 name 相同，则强制显示此菜单
        return true;
      }
      return !(menu.meta && menu.meta.hidden);
    },

    // 是否是根菜单，若当前根路由有 redirect，且子路由只有一个时，菜单仅显示子路由
    isRootMenu(menu) {
      if (menu.redirect && menu.children && menu.children.length === 1) {
        return false;
      }
      return true;
    },

    // 获取菜单的标题
    getMenuTitle(menu) {
      if (this.showMenu(menu)) {
        if (menu.meta && menu.meta.title) {
          return menu.meta.title;
        }
        return menu.path;
      }
      return null;
    },

    // 获取菜单的图标
    getMenuIcon(menu) {
      if (menu.meta && menu.meta.icon) {
        return menu.meta.icon;
      }
      return null;
    },

    // 获取菜单需要显示的子菜单列表
    getSubMenus(menu) {
      if (!menu.children || menu.children.length === 0) {
        return null;
      }
      const children = menu.children.filter(item => this.showMenu(item));
      return children.length > 0 ? children : null;
    },
  },
};
</script>

<style lang="less" scoped>
.layout-sidebar {
  height: 100vh;
  overflow: auto;

  ::v-deep .ivu-menu-item {
    padding-top: 10px;
    padding-bottom: 10px;
  }

  &__logo {
    height: @layout-header-height;
    line-height: @layout-header-height;
    position: relative;
    padding: 0 @padding-md;
    overflow: hidden;
    cursor: pointer;
    transition: all 0.3s;

    img {
      height: @layout-header-height / 4 * 3;
      padding: @layout-header-height / 8;
      vertical-align: middle;
      display: inline-block;
    }

    h1 {
      display: inline-block;
      margin: 0;
      font-weight: 500;
      font-size: 20px;
      vertical-align: middle;
      animation: fade-in;
      animation-duration: 0.3s;
    }
  }

  .menu {
    &:after {
      background: transparent;
    }

    span {
      display: inline-block;
      overflow: hidden;
      width: 69px;
      text-overflow: ellipsis;
      white-space: nowrap;
      vertical-align: bottom;
      transition: width 0.2s ease 0.2s;
    }

    .ivu-icon:first-child {
      transform: translateX(0px);
      transition: font-size 0.2s ease, transform 0.2s ease;
      vertical-align: middle;
      font-size: 16px;
    }

    &--collapsed {
      span {
        width: 0px;
        transition: width 0.2s ease;
      }

      .ivu-icon:first-child {
        transform: translateX(5px);
        transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
        vertical-align: middle;
        font-size: 22px;
      }

      ::v-deep .ivu-menu {
        height: 0px !important;
        overflow: hidden;
        transition: height 0.3s ease;
      }

      ::v-deep .ivu-menu-submenu-title-icon {
        display: none;
      }
    }
  }

  &--light {
    background: @white;
    box-shadow: 2px 0 8px 0 rgba(29, 35, 41, 0.05);

    .layout-sidebar__logo {
      background: @white;

      h1 {
        color: @text-color;
      }
    }
  }

  &--dark {
    background: @menu-dark-title;
    box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);

    .layout-sidebar__logo {
      background: @menu-dark-title;

      h1 {
        color: @white;
      }
    }

    ::v-deep .ivu-menu-item-selected {
      background: @primary-color !important;
      color: @white !important;
    }
  }
}
</style>
