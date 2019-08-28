// var hybrid = {
//
// }
//
// window.Hybrid = hybrid
//
// if (window.Vue) {
//   window.Vue.use(hybrid)
// }
//
// export { hybrid }
var hybrid = {
  install (Vue, options) {
    // 把当前的对象挂载到vue的全局
    Vue.prototype.$hybrid = this
  }
}
// 把vue中绑定的对象挂载到window上
window.Hybrid = hybrid
// 导出共给vue组件中引入使用
export default hybrid
