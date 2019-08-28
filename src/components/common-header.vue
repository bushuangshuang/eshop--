<template>
    <div class="header-box">
      <li class="h-left" v-if="showleft" @click="routerBack?goBackRouter():back(routerLeft,carProductCd)"><van-icon name="arrow-left" /></li>
      <li class="h-left" v-else="showleft">&nbsp;</li>
      <li class="h-center" v-if="showinput">
        <span class="icon"></span>
        <input type="text" class="search" placeholder="搜索你想要的内容" />
      </li>
      <li class="h-center" v-else="showinput">{{tittle}}</li>
      <li class="h-right news" v-if="showright"><!--<van-icon name="chat-o" @click="toNews" />--></li>
      <li class="h-right news" v-else-if="showrightt" @click="routerRight(routerpublic)" style="color:#F47442;text-align:left">{{righttitle}}</li>
      <li class="h-right news" v-else="showright">&nbsp;</li>
    </div>
</template>

<script>
export default {
  props: {
    routerBack: {
      type: Boolean,
      default: false
    },
    carProductCd: {
      type: String,
      default: ''
    },
    routerLeft: {
      type: String,
      default: '/'
    },
    showright: {
      type: Boolean,
      default: false
    },
    righttitle:{
      type: String,
      default: '标题'
    },
    showleft: {
      type: Boolean,
      default: false
    },
    showinput: {
      type: Boolean,
      default: false
    },
    tittle: {
      type: String,
      default: '标题'
    },
    showback: {
      type: Boolean,
      default: true
    },
    showmore: {
      type: Boolean,
      default: false
    },
    showrightt: {
      type: Boolean,
      default: false
    },
    routerpublic: {
      type: String,
      default: '/'
    }
  },
  data() {
    return {

    }
  },
  beforeRouteLeave (to, from, next) {
    // 设置下一个路由的 meta
    to.meta.keepAlive = this.iskeeplive// B 跳转到 A 时，让 A 缓存，即不刷新
    next()
    console.log('to---', to )
  },
  methods: {
    back(routerLeft, carProductCd) {
      this.$router.push({path: routerLeft, params: {carProductCd: carProductCd, comeFrom: 'children'}})
    },
    toNews() {
      this.$router.push('/message')
    },
    goBackRouter() {
      this.$router.goBack()
    },
    routerRight(routerpublic) {
      this.$router.push({path: routerpublic})
    }

  }
}
</script>

<style lang="less" scoped>
@import "~styles/index.less";
@import "~styles/variable.less";
.header-box{
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  border-bottom: 1px solid #dedede;
  .fs(30);
  .h-left{
    width: 15%;
    text-align: center;
    .van-icon {
      line-height: 50px;
      font-size: 0.6rem;
    }
  }
  .h-center{
    width: 70%;
    height: 100%;
    line-height: 50px;
    .padding(0,60);
    .fs(32);
    color: #000;
    position: relative;
    text-align: center;
    .icon {
      position: absolute;
      display: inline-block;
      .w(30);
      .h(30);
      .top(36);
      .left(80);
      background-image: url('../assets/image/search-f.png');
      background-repeat: no-repeat;
      background-size: cover;
    }
    .search {
      background-color:#f7f3f8;
      .b-radius(58);
      .lh(58);
      width: 100%;
      outline: none;
      .pl(65);
      .pr(65);
      .pt(5);
      .fs(28);
    }
  }
  .h-right{
    width: 15%;
    text-align: center;
    .fs(30);
    line-height: 50px;
    .van-icon {
      line-height: 50px;
      font-size: 0.6rem;
    }
  }
}
</style>
