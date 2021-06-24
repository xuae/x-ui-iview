<!--侧边栏菜单函数式组件-->
<template functional>
  <Submenu :key="props.menu.name" :name="props.menu.name">
    <template slot="title">
      <Icon
        v-if="parent.getMenuIcon(props.menu)"
        :type="parent.getMenuIcon(props.menu)"
      />
      <span>{{ parent.getMenuTitle(props.menu) }}</span>
    </template>
    <template v-for="item in parent.getSubMenus(props.menu)">
      <template v-if="parent.showMenu(item)">
        <MenuItem
          v-if="!parent.getSubMenus(item)"
          :key="item.name"
          :name="item.name"
        >
          <Icon
            v-if="parent.getMenuIcon(item)"
            :type="parent.getMenuIcon(item)"
          />
          <span>{{ parent.getMenuTitle(item) }}</span>
        </MenuItem>
        <x-layout-sidebar-menu v-else :key="item.name" :menu="item" />
      </template>
    </template>
  </Submenu>
</template>

<script>
export default {
  name: 'XLayoutSidebarMenu',
  props: {
    menu: {
      type: Object,
      required: true,
    },
  },
};
</script>
