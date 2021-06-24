const components = {};
const files = require.context('./', false, /(?<!index)\.vue$/);
files.keys().forEach(fileName => {
  const file = files(fileName);
  const fileModuleName = fileName
    .replace(/^\.\//, '')
    .replace(/\.\w+$/, '')
    .replace(/.*\//g, '');
  components[fileModuleName] = file.default;
});

const install = function (Vue) {
  // 判断是否安装过
  // if (install.installed) {
  //   return;
  // }

  // 注册所有组件
  Object.values(components).forEach(component => {
    Vue.component(component.name, component);
  });
};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  install,
  ...components,
};
