import '@/assets/style/view-design.less';
import App from './App.vue';
import components from '@/components';
import IView from 'view-design';
import router from './router';
import store from './store';
import Vue from 'vue';

// 注册自定义组件
Vue.use(components);

Vue.config.productionTip = false;

Vue.use(IView);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
