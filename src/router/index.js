import Vue from 'vue';
import VueRouter from 'vue-router';
import XLayout from '@/components/layout/XLayout';

Vue.use(VueRouter);

const asyncComponent = func => ({
  component: func,
  delay: 0,
  timeout: 30000,
  // errorComponent: ErrorComponent,
  // loadingComponent: LoadingComponent,
});

const LOAD_MAP = {
  components: name => {
    return r => require.ensure([], () => r(require(`@/views/docs/${name}.md`)), 'components');
  },
};

const load = function (filePath, chunkName) {
  return LOAD_MAP[chunkName](filePath);
};

/**
 * 页面路由 + 侧边栏菜单配置
 *
 * vue-router 的基本配置项：
 * path: string,
 * name?: string, // name 作为菜单的 key 值，唯一的，需要显示的菜单必须添加此数据
 * redirect?: RedirectOption, // 若当前根路由有 redirect，且子路由只有一个时，根菜单仅显示子路由
 *
 * 侧边栏菜单显示的数据，需要定义在 meta 中，meta 约束如下：
 * meta?: {
 *   hidden?: boolean, // 是否隐藏此菜单，default: false
 *   title?: string, // 菜单的标题，若没有，则显示 path
 *   icon?: string, // iview icon，全部图标：http://v1.iviewui.com/components/icon
 * }
 */
const routes = [
  {
    path: '/',
    component: XLayout,
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/Home'),
        meta: { title: '首页', icon: 'md-home' },
      },
    ],
  },
  {
    path: '/table',
    component: XLayout,
    redirect: { name: 'table' },
    children: [
      {
        path: '',
        name: 'table',
        component: load('Table', 'components'),
        meta: { title: 'Table 表格组件', icon: 'md-list-box' },
      },
    ],
  },
  {
    path: '/form',
    component: XLayout,
    name: 'form',
    meta: { title: 'Form 表单组件', icon: 'md-clipboard' },
    children: [
      {
        path: 'item',
        name: 'item',
        component: load('FormItem', 'components'),
        meta: { title: 'FormItem' },
      },
      {
        path: 'input',
        name: 'input',
        component: load('Input', 'components'),
        meta: { title: 'Input 输入框' },
      },
      {
        path: 'input-number',
        name: 'input-number',
        component: load('InputNumber', 'components'),
        meta: { title: 'InputNumber 数字输入框' },
      },
      {
        path: 'select',
        name: 'select',
        component: load('Select', 'components'),
        meta: { title: 'Select 下拉框' },
      },
      {
        path: 'checkbox-group',
        name: 'checkbox-group',
        component: load('CheckboxGroup', 'components'),
        meta: { title: 'CheckboxGroup 多选框' },
      },
      {
        path: 'radio-group',
        name: 'radio-group',
        component: load('RadioGroup', 'components'),
        meta: { title: 'RadioGroup 单选框' },
      },
    ],
  },
  {
    path: '/components',
    component: XLayout,
    name: 'components',
    meta: { title: '其他组件', icon: 'ios-keypad' },
    children: [
      {
        path: 'link',
        name: 'link',
        component: load('Link', 'components'),
        meta: { title: 'Link 链接' },
      },
      {
        path: 'back-top',
        name: 'backTop',
        // component: r => r(require('@/views/docs/BackTop.md')),
        // component: r => asyncComponent(r(require('@/views/docs/BackTop.md'))),
        component: load('BackTop', 'components'),
        // component: r => require.ensure([], () => r(require('@/views/docs/BackTop.md')), 'components'),
        meta: { title: 'BackTop 返回顶部' /*, icon: 'md-arrow-up'*/ },
      },
    ],
  },
  {
    path: '/pages',
    component: XLayout,
    name: 'pages',
    meta: { title: '业务逻辑页面', icon: 'logo-buffer' },
    children: [
      {
        path: 'form-build',
        name: 'form-build',
        component: () => import('@/views/form-build/index'),
        meta: { title: '表单构建' },
      },
      {
        path: 'form-custom',
        name: 'form-custom',
        component: () => import('@/views/form-custom/index'),
        meta: { title: '自定义表单', hidden: false },
      },
    ],
  },

  {
    path: '/menu',
    component: XLayout,
    name: 'menu',
    meta: { title: 'menu', icon: 'ios-settings' },
    children: [
      {
        path: 'menu-1',
        name: 'menu-1',
        component: () => import('@/views/About'),
        meta: { title: 'menu-1', icon: 'ios-settings' },
        children: [
          {
            path: 'menu-1-1',
            name: 'menu-1-1',
            component: () => import('@/views/About'),
            meta: { title: 'menu-1-1', icon: 'ios-settings' },
          },
          {
            path: 'menu-1-2',
            name: 'menu-1-2',
            component: () => import('@/views/About'),
            meta: { title: 'menu-1-2' },
          },
        ],
      },
      {
        path: 'menu-2',
        name: 'menu-2',
        component: () => import('@/views/About'),
        meta: { title: 'menu-2' },
        children: [
          {
            path: 'menu-2-1',
            name: 'menu-2-1',
            component: () => import('@/views/About'),
            meta: { title: 'menu-2-1' },
            children: [
              {
                path: 'menu-2-1-1',
                name: 'menu-2-1-1',
                component: () => import('@/views/About'),
                meta: { title: 'menu-2-1-1' },
              },
            ],
          },
        ],
      },
    ],
  },

  {
    path: '/menu2',
    component: XLayout,
    name: 'menu2',
    meta: { title: 'menu2' },
    children: [
      {
        path: 'menu-1',
        name: 'menu2-1',
        component: () => import('@/views/About'),
        meta: { title: 'menu2-1' },
        children: [
          {
            path: 'menu-1-1',
            name: 'menu2-1-1',
            component: () => import('@/views/About'),
            meta: { title: 'menu2-1-1' },
          },
          {
            path: 'menu-1-2',
            name: 'menu2-1-2',
            component: () => import('@/views/About'),
            meta: { title: 'menu2-1-2' },
          },
        ],
      },
      {
        path: 'menu-2',
        name: 'menu2-2',
        component: () => import('@/views/About'),
        meta: { title: 'menu-2' },
        children: [
          {
            path: 'menu-2-1',
            name: 'menu2-2-1',
            component: () => import('@/views/About'),
            meta: { title: 'menu-2-1' },
            children: [
              {
                path: 'menu-2-1-1',
                name: 'menu2-2-1-1',
                component: () => import('@/views/About'),
                meta: { title: 'menu-2-1-1' },
              },
            ],
          },
        ],
      },
    ],
  },
];
// 解决重复跳转路由报错
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

const router = new VueRouter({
  routes,
  scrollBehavior(to, from, savedPosition) {
    // if (to.hash) {
    //   return {
    //     selector: decodeURI(to.hash),
    //     // behavior: 'smooth',
    //   };
    // }
  },
});

export default router;
