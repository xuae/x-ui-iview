import '@/assets/style/view-design.less';
import App from './App.vue';
import IView from 'view-design';
import router from './router';
import store from './store';
import Vue from 'vue';

Vue.config.productionTip = false;

Vue.use(IView);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
