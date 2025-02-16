const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    // disableHostCheck: true,
    allowedHosts: 'all',
    proxy: 'http://185.112.83.36:8080/',
  },
  publicPath: '/'
})
