'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  //NODE_ENV: '"dev"',
  BASE_URL: '"https://x-eshop.zqysjt.com/api/v1"',
  imgFileUrl: '"https://eshop.s3.cn-north-1.jcloudcs.com/"'
})
