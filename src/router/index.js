import Vue from 'vue';
import VueRouter from 'vue-router';
import XLayout from '@/components/layout/XLayout';

Vue.use(VueRouter);

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

const router = new VueRouter({
  routes,
});

export default router;
