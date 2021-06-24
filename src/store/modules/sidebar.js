export default {
  namespaced: true,
  state: {
    // breakpoint 断点
    // {
    //   xs: '480px',
    //   sm: '576px',
    //   md: '768px',
    //   lg: '992px',
    //   xl: '1200px',
    //   xxl: '1600px',
    // }
    // 触发响应式的断点
    breakpoint: 'lg',
    // 当前收起状态
    collapsed: false,
    // 收缩宽度，设置为 0 会出现特殊 trigger
    collapsedWidth: 80,
    // 是否可收起
    collapsible: true,
    // 是否默认收起
    defaultCollapsed: false,
    // 宽度
    width: '240',
    // 主题颜色 'light' | 'dark'
    theme: 'dark',
    // 是否只保持一个子菜单的展开
    uniqueOpened: false,
  },
  getters: {
    // sidebar 当前收起状态
    sidebarCollapsed: (state, getters, rootState, rootGetters) => {
      return state.collapsed;
    },
  },
  mutations: {
    // 设置 sidebar 的当前收起状态
    SET_COLLAPSED: (state, payload) => {
      state.collapsed = payload;
    },
  },
  actions: {},
};
