/* eslint-disable */
import axios from 'axios'
import Vue from 'vue'
import router from '../router'
import { Dialog } from 'vant';

Vue.use(Dialog);

/**
 * 定义请求常量
 * TIME_OUT、ERR_OK
 */
export const TIME_OUT = 5000;    // 请求超时时间
export const ERR_OK = true;      // 请求成功返回状态，字段和后台统一
export const baseUrl = process.env.BASE_URL   // 引入全局url，定义在全局变量process.env中
export const imgFileUrl = process.env.imgFileUrl  // 引入图片预览

// 请求超时时间
axios.defaults.timeout = TIME_OUT
axios.defaults.withCredentials=true;

// 封装请求拦截
axios.interceptors.request.use(
  config => {
    let token = localStorage.getItem('token')   // 获取token
    config.headers['Content-Type'] = 'application/json;charset=UTF-8;'//
    config.headers['Authorization'] = ''
    if(token != null){                          // 如果token不为null，否则传token给后台
      config.headers['Authorization'] = token
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
// 封装响应拦截，判断token是否过期
axios.interceptors.response.use(
  response => {
    let {data} = response
    if(response.data.code=='501'&&response.data.msg=='未登录'&&response.data.success==false){
      Dialog.alert({
        message: '您未登录，请登录'
      }).then(() => {
        router.push('/home/login');
      });

    } else {
      return Promise.resolve(response)
    }
  },
  error => {
    return Promise.reject(error)
  }
)
// 封装post请求
export function fetch(requestUrl, params = '') {
  return axios({
    url: requestUrl,
    method: 'post',
    data:  params

  })
}
