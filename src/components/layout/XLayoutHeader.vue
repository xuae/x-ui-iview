<!--布局顶部 - 面包屑、用户头像信息等-->
<template>
  <Header class="layout-header">
    <Icon
      class="layout-header__trigger"
      :class="sidebar.collapsed ? 'rotate-icon' : ''"
      type="md-menu"
      size="24"
      @click="handleCollapsed"
    ></Icon>
    <Breadcrumb class="layout-header__breadcrumb">
      <template v-if="$route.name !== 'home'">
        <BreadcrumbItem key="home">
          <router-link :to="{ name: 'home' }">首页</router-link>
        </BreadcrumbItem>
      </template>
      <template v-for="({ name, meta, children }, index) in route.matched">
        <BreadcrumbItem v-if="meta && meta.title" :key="index">
          <span v-if="hasView(name, meta, children)">
            {{ meta.title }}
          </span>
          <router-link v-else :to="{ name }">
            {{ meta.title }}
          </router-link>
        </BreadcrumbItem>
      </template>
    </Breadcrumb>
    <div class="layout-header__right">
      <Dropdown class="layout-header__user" @on-click="handleMenuClick">
        <div>
          <Avatar icon="md-person" />
          <div class="layout-header__user__name">
            {{ userName }}
          </div>
        </div>
        <DropdownMenu slot="list" placement="bottom-end" style="width: 160px">
          <DropdownItem name="user">
            <Icon type="md-person" />
            个人中心
          </DropdownItem>
          <DropdownItem name="setting">
            <Icon type="md-settings" />
            个人设置
          </DropdownItem>
          <Divider style="margin: 0" />
          <DropdownItem name="logout">
            <Icon type="md-exit" />
            退出登录
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  </Header>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

export default {
  name: 'XLayoutHeader',
  data() {
    return {
      userName: null,
    };
  },
  computed: {
    ...mapState(['sidebar']),
    route() {
      return this.$route;
    },
  },
  created() {
    this.userName = 'Admin'; // localStorage.getItem('userName');
  },
  methods: {
    ...mapMutations({ setCollapsed: 'sidebar/SET_COLLAPSED' }),

    // 面包屑是否有页面
    hasView(name, meta, children, index) {
      return !name || !children || children.length === 0 || index === this.route.matched.length - 1;
    },

    // 左侧菜单栏折叠事件
    handleCollapsed() {
      this.setCollapsed(!this.sidebar.collapsed);
    },

    // 右上角菜,单点击事件
    async handleMenuClick(key) {
      // console.log(key)
      switch (key) {
        case 'user':
          // 个人中心
          break;
        case 'setting':
          // 个人设置
          break;
        case 'logout':
          // 退出
          // const res = await Account.logout();
          // if (res.isOk()) {
          //   await this.$router.replace({ name: 'login' });
          // } else {
          //   res.alertMessage();
          // }
          break;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.layout-header {
  background: @white;
  padding: 0;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  z-index: 21;

  &__breadcrumb {
    display: inline-block;
  }

  &__trigger {
    padding: @padding-md;
    transition: all 0.3s;
    cursor: pointer;

    &:hover {
      color: @primary-color;
    }

    &.rotate-icon {
      transform: rotate(270deg);
    }
  }

  &__right {
    float: right;
    height: 100%;
    padding-right: @padding-md;

    & > div {
      display: inline-block;
      padding: 0 @padding-md;
      cursor: pointer;

      &:hover {
        background: rgba(0, 0, 0, 0.025);
      }
    }
  }
  &__user {
    &__name {
      display: inline-block;
      margin-left: @padding-sm;
      max-width: 90px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      vertical-align: middle;
    }
  }
}
</style>
