import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
// 需要左方向动画的路由用this.$router.to('****')
Router.prototype.togo = function (path) {
  this.isleft = true
  this.isright = false
  this.push(path)
}
// 需要右方向动画的路由用this.$router.goRight('****')
Router.prototype.goRight = function (path) {
  this.isright = true
  this.isleft = false
  this.push(path)
}
// 需要返回按钮动画的路由用this.$router.goBack()，返回上一个路由
Router.prototype.goBack = function () {
  this.isright = true
  this.isleft = false
  this.go(-1)
}
// 点击浏览器返回按钮执行，此时不需要路由回退
Router.prototype.togoback = function () {
  this.isright = true
  this.isleft = false
}
// 点击浏览器前进按钮执行
Router.prototype.togoin = function () {
  this.isright = false
  this.isleft = true
}
export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: (resolve) => require(['@/pages/index'], resolve),
      // redirect: '/guidePage',
      redirect: '/home',
      children: [
        {
          path: '/home',
          name: 'home',
          component: (resolve) => require(['@/pages/index/home'], resolve),
        },

        {
          path: '/story',
          name: 'story',
          component: (resolve) => require(['@/pages/index/home'], resolve)
        },
        {
          path: '/day',
          name: 'day',
          component: (resolve) => require(['@/pages/index/day'], resolve)
        },
        {
          path: '/garage',
          name: 'garage',
          component: (resolve) => require(['@/pages/index/garage'], resolve)
        }
      ]
    },
    {
      path: '/framePage',
      name: 'framePage',
      component: (resolve) => require(['@/pages/index/framePage'], resolve)
    },
    {
      path: '/home/Detail',
      name: 'Detail',
      component: (resolve) => require(['@/pages/purchasingPlan/shoppingcenter'], resolve)
    },
    {
      path:'/newlist',
      name:'newlist',
      component:(resolve) => require(['@/pages/new/newlist'],resolve)
    },
    {
      path:'/info',
      name:'carplan',
      component:(resolve) => require(['@/pages/detail'],resolve),
      meta: {
        keepAlive: true //需要被缓存的组件
      }
    },
    {
      path:'/day/realname',
      name:'realname',
      component:(resolve) => require(['@/pages/index/realname'],resolve)

    },
    {
      path:'/home/login',
      name:'login',
      component:(resolve) => require(['@/pages/index/login'],resolve)
    },
    {
      path:'/carplan/morestores',
      name:'morestores',
      component:(resolve) => require(['@/pages/purchasingPlan/morestores'],resolve)
    },
    {
      path:'/message',
      name:'message',
      component:(resolve) => require(['@/pages/new/message'],resolve)
    },
    {
      path:'/calculate',
      name:'carculate',
      component:(resolve) => require(['@/pages/purchasingPlan/calculate'],resolve)
    },
    {
      path:'/orderlist',
      name:'orderlist',
      component:(resolve) => require(['@/pages/index/orderlist'],resolve)
    },
    {
      path:'/orderinfo',
      name:'orderinfo',
      component:(resolve) => require(['@/pages/index/orderinfo'],resolve)
    },
    {
      path:'/service',
      name:'service',
      component:(resolve) => require(['@/pages/index/service'],resolve)
    },
    {
      path:'/point',
      name:'point',
      component:(resolve) => require(['@/pages/index/point'],resolve)
    },
    {
      path:'/integral',
      name:'integral',
      component:(resolve) => require(['@/pages/index/integral'],resolve)
    },
    {
      path:'/point',
      name:'point',
      component:(resolve) => require(['@/pages/index/point'],resolve)
    },
    {
      path:'/insurance',
      name:'insurance',
      component:(resolve) => require(['@/pages/index/insurance'],resolve)
    },
    {
      path:'/certification',
      name:'certification',
      component:(resolve) => require(['@/pages/index/certification'],resolve)
    },
    {
      path:'/vehicle',
      name:'vehicle',
      component:(resolve) => require(['@/pages/index/vehicle'],resolve)
    },
    {
      path:'/wholeprocess',
      name:'wholeprocess',
      component:(resolve) => require(['@/pages/index/wholeprocess'],resolve)
    },
    {
      path:'/favorite',
      name:'favorite',
      component:(resolve) => require(['@/pages/index/favorite'],resolve)
    },
    {
      path:'/shopcar',
      name:'shopcar',
      component:(resolve) => require(['@/pages/index/shopcar'],resolve)
    },
    {
      path: '/shopCarDetail',
      name: 'shopCarDetail',
      component: (resolve) => require(['@/pages/index/shopCarDetail'], resolve)
    },
    {
      path: '/orderinfodetail',
      name: 'orderinfodetail',
      component: (resolve) => require(['@/pages/purchasingPlan/carplan'],resolve),
      // meta: {
      //   keepAlive: true //需要被缓存的组件
      // }
    },
    {
      path:'/Vehiclecontrast',
      name:'Vehiclecontrast',
      component:(resolve) => require(['@/pages/purchasingPlan/Vehiclecontrast'],resolve)
    },
    {
      path:'/parameter',
      name:'parameter',
      component:(resolve) => require(['@/pages/index/parameter'],resolve)
    },
    {
      path:'/newinfo',
      name:'newinfo',
      component:(resolve) => require(['@/pages/new/newinfo'],resolve)
    },
    {
      path:'/newlist',
      name:'newlist',
      component:(resolve) => require(['@/pages/new/newlist'],resolve)
    },
    {
      path:'/maintenance',
      name:'maintenance',
      component:(resolve) => require(['@/pages/index/maintenance'],resolve)
    },
    {
      path:'/maintenance/maintenance',
      name:'maintenance',
      component:(resolve) => require(['@/pages/maintain/maintenance'],resolve)
    },
    {
      path:'/maintenance/MaintenanceProject',
      name:'MaintenanceProject',
      component:(resolve) => require(['@/pages/maintain/MaintenanceProject'],resolve)
    },
    {
      path:'/maintenance/MaintenanceRecord',
      name:'MaintenanceRecord',
      component:(resolve) => require(['@/pages/maintain/MaintenanceRecord'],resolve)
    },
    {
      path:'/index/out',
      name:'out',
      component:(resolve) => require(['@/pages/index/out'],resolve)
    },
    {
      path:'/index/out',
      name:'out',
      component:(resolve) => require(['@/pages/index/out'],resolve)
    },
    {
      path:'/garage/garagetbox',
      name:'garagetbox',
      component:(resolve) => require(['@/pages/index/garagetbox'],resolve)
    },
    {
      path:'/garage/Vehicleevaluation',
      name:'Vehicleevaluation',
      component:(resolve) => require(['@/pages/index/Vehicleevaluation'],resolve)
    },
    {
      path:'/index/out/Account',
      name:'AccountSetting',
      component:(resolve) => require(['@/pages/index/AccountSetting'],resolve)
    },
    {
      path:'/index/out/about',
      name:'about',
      component:(resolve) => require(['@/pages/index/about'],resolve)
    },
    {
      path:'/index/out/feedback',
      name:'feedback',
      component:(resolve) => require(['@/pages/index/feedback'],resolve)
    },
  ],

})

