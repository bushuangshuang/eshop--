/**
 * home.js
 * 用于home模块的状态管理
 */
/* eslint-disable */
import * as types from '../mutation-type'  // 引入定义的方法
const home = {
  state: {
    number: 0,
  },
  // 更新状态
  mutations: {
    incrment(state,payload) {
     state.number+=payload.num
   },

  },
  // actions注册事件处理函数，当这个函数被触发时，将状态提交到mutains中处理
  actions: {
    incrment:({commit})=>commit('incrment')
    // incrment(state) {   // 修改state 可通过mapMutations调用
    //   state.number++
    // },
  },
  getters: {            // 定义getters，可以通过mapGetters拓展函数调用
    number: state => {
      return state.number
    },
  }
}
export default home    // 输出home模块
