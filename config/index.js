'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')
let filePath=process.env.VUE_APP_BACKEND_URL=== 'svt'?'../distsvt/index.html':process.env.VUE_APP_BACKEND_URL=== 'preprod'?'../distpreprod/index.html':process.env.VUE_APP_BACKEND_URL=== 'production'?'../distproduction/index.html':'../dist/index.html'
let filePathM=process.env.VUE_APP_BACKEND_URL=== 'svt'?'../distsvt':process.env.VUE_APP_BACKEND_URL=== 'preprod'?'../distpreprod':process.env.VUE_APP_BACKEND_URL=== 'production'?'../distproduction':'../dist'

let serverObj = {
  dev: {
    // Paths
    env: require('./dev.env'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/api': {
        target: 'https://x-eshop.zqysjt.com/api/v1',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    },

    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 9000, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: true,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: true,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,
    cssSourceMap: true
  },
  build: {
    // Template for index.html
    index: path.resolve(__dirname, filePath),
    // Paths
    assetsRoot: path.resolve(__dirname, filePathM),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',
    /**
     * Source Maps
     */
    productionSourceMap: false,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  configureWebpack: {
    /*externals: {
      AMap: "window.AMap"
    }*/
  }
}

/**
 * 依据命令执行不同的代理文件
 * 全局变量在package.json里配置
 */

/*if (process.env.NODE_ENV === 'development') {
  serverObj.dev.env = (process.env.DEV_ENV === 'local' ? require('./dev.env') : require('./dev.test.env'))
  serverObj.dev.proxyTable = (process.env.DEV_ENV === 'local' ? require('./dev.proxy') : require('./dev.test.proxy'))
}*/

if (process.env.NODE_ENV === 'svt') {
  serverObj.build.env = process.env.VUE_APP_BACKEND_URL=== 'svt'?require('./svt.env'):process.env.VUE_APP_BACKEND_URL=== 'preprod'?require('./preprod.env'):process.env.VUE_APP_BACKEND_URL=== 'production'?require('./production.env'):require('./svt.env')
  //serverObj.build.env = (process.env.DEV_ENV === 'test' ? require('./prod.test.env') : require('./prod.env'))
}
if (process.env.NODE_ENV === 'preprod') {
  serverObj.build.env = process.env.VUE_APP_BACKEND_URL=== 'svt'?require('./svt.env'):process.env.VUE_APP_BACKEND_URL=== 'preprod'?require('./preprod.env'):process.env.VUE_APP_BACKEND_URL=== 'production'?require('./production.env'):require('./svt.env')
}
if (process.env.NODE_ENV === 'production') {
  serverObj.build.env = process.env.VUE_APP_BACKEND_URL=== 'svt'?require('./svt.env'):process.env.VUE_APP_BACKEND_URL=== 'preprod'?require('./preprod.env'):process.env.VUE_APP_BACKEND_URL=== 'production'?require('./production.env'):require('./svt.env')
}

module.exports = serverObj
