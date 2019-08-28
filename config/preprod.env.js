'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./production.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"preprod"',
  BASE_URL: '"https://p-eshop.zqysjt.com/api/v1"',
  imgFileUrl: '"https://eshop.s3.cn-north-1.jcloudcs.com/"'
})
