import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const modules = {};
const files = require.context('./modules', true, /(?<!index)\.[tj]s$/);
files.keys().forEach(fileName => {
  const file = files(fileName);
  const fileModuleName = fileName
    .replace(/^\.\//, '')
    .replace(/\.\w+$/, '')
    .replace(/.*\//g, '');
  modules[fileModuleName] = file.default;
});

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules,
});
