import '@/assets/style/view-design.less';

import '@/assets/style/global.less';
import App from './App.vue';
import components from '@/components';
import DemoBlock from '@/views/components/DemoBlock';
import IView from 'view-design';
import router from './router';
import store from './store';
import Utils from './utils';
import Vue from 'vue';

Vue.prototype.$utils = Utils;

// 注册自定义组件
Vue.use(components);
// 注册代码块组件
Vue.component(DemoBlock.name, DemoBlock);

Vue.config.productionTip = false;

Vue.use(IView);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
