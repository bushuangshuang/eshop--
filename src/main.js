// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.parameter
/*eslint-disable*/
import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import store from './store'
import router from './router'
import Mint from 'mint-ui'
import Vant from 'vant';
import  'mint-ui/lib/style.css'
import FastClick from 'fastclick'
import '../static/js/flexible.js'
import 'swiper/dist/css/swiper.css';
import 'vant/lib/index.css'
import{Table,TableColumn,} from 'element-ui'
import IScrollView from 'vue-iscroll-view'
import IScroll from 'iscroll'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import vuescroll from 'vuescroll';

/**
*监听浏览器点击返回前进操作动画
*浏览器端使用需要注意路由path的创建，二级应该在一级的基础上添加
*如一级/Home，则二级为/Home/Detail，依次往后加，如果是app的话可忽略以下代码
*/
import * as Sentry from '@sentry/browser';
import * as Integrations from '@sentry/integrations';

Sentry.init({
  dsn: 'http://f3d182a36e274b889568b640d1d27973@sentry.zqysjt.com:8080//6',
  integrations: [
    new Integrations.Vue({
      Vue,
      attachProps: true,
    }),
  ],
  environment: process.env.NODE_ENV
});
//Sentry.captureException(new Error("Something broke"));

let init = 0
window.addEventListener('popstate', function(e) {
  init++
  if (init < 2) {
    router.beforeEach((to, from, next) => {
      let arr1 = to.path.split('/')
      let arr2 = from.path.split('/')
      if (arr1.length === 2) {
        if (arr1[1].length === 0) {
          arr1.splice(1, 1)
        }
      }
      if (arr2.length === 2) {
        if (arr2[1].length === 0) {
          arr2.splice(1, 1)
        }
      }
      if (arr1.length < arr2.length) {
        router.togoback()
      } else {
        router.togoin()
      }
      next()
    })
  }
}, false)

// app 修改状态栏颜色
// document.addEventListener('plusready', function () {
//   let System = window.plus.os.name
//   if (System === 'iOS') {
//     window.plus.navigator.setStatusBarBackground('#d81e06')
//   }
// })

Vue.use(Mint)
Vue.use(Vuex)
Vue.use(Vant)
Vue.use(IScrollView, IScroll,ElementUI)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(iView);
Vue.use(vuescroll, {
  ops: {}, // 在这里设置全局默认配置
  name: 'myScroll' // 在这里自定义组件名字，默认是vueScroll
});

Vue.config.productionTip = false
FastClick.attach(document.body)

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  // render: h => h(App, {
  //   ref: 'app'
  // })
})
