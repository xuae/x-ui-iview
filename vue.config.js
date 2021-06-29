const { resolve } = require('path');

module.exports = {
  lintOnSave: false,
  css: {
    loaderOptions: {
      less: {
        modifyVars: {},
        javascriptEnabled: true,
      },
    },
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [resolve(__dirname, 'src/assets/style/var.less')],
    },
  },
  chainWebpack: config => {
    config.resolve.alias.set('vue', 'vue/dist/vue.runtime.esm.js');

    config.module
      .rule('md')
      .test(/\.md$/)
      .use('vue-loader')
      .loader('vue-loader')
      .end()
      .use('markdown-loader')
      .loader(resolve(__dirname, './build/md-loader.js'))
      .end();

    config.module
      .rule('codepoints')
      .test(/\.codepoints$/)
      .use('raw-loader')
      .loader('raw-loader')
      .end();
  },
};
