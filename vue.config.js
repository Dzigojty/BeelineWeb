const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    // disableHostCheck: true,
    allowedHosts: 'all',
    proxy: 'https://tehnika-test.ru/',
  },
  publicPath: '/'
})
