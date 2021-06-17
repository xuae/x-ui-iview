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
};
