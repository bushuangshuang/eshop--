<template>
  <div class="header-box">
    <div class="left-icon">
      <span v-if="showback" @click="back" class="icon-back"></span>
      <van-icon name="location" @click="cityD"/>
      <span @click="cityD">{{address}}</span>
    </div>
    <div class="header-tittle">
        <span v-if="showinput">
          <cus-input></cus-input>
        </span>
      <span v-if="!showinput">{{tittle}}</span>
    </div>
    <div class="right-icon">
        <span v-if="showmore" class="icon"></span>
        <img src="../assets/image/index-user.png" alt="" v-if="this.username==''" @click="back">
        <!--<van-icon name="chat" v-else="this.username!=''" @click="message"/>-->
      </div>
  </div>
</template>

<script>
import cusInput from 'common/cus-input'
export default {
  data() {
    return {
      username: ''
    }
  },
  props: {
    address: {
      type: String,
      default: ''
    },
    showright: {
      type: Boolean,
      default: false
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
    }
  },
  methods: {
    cityD() {
      this.$emit('on-select-city')
    },
    back() {
      this.$router.push('/home/login')
    },
    message(){
      this.$router.push('/message')
    }
  },
  components: {
    cusInput
  },
  mounted() {
   this.username = localStorage.getItem('username')||''
  },

}
</script>

<style lang="less" scoped>
  @import "~styles/index.less";
  @import "~styles/variable.less";
  .header-box{
    position: absolute;
    width: 100%;
    .h(100);
    .lh(100);
    background-color: @base-color;
    color: @base-header-color;
    .fs(@base-header-size);
    display: flex;
    z-index: 1;
    .left-icon{
      position: relative;
      flex: 1;
      .fs(30);
      .van-icon{
        font-size: 0.5rem !important;
        vertical-align: middle;
      }
      img{
        width: 20%;
        height: 30%;
        vertical-align: middle;
      }
      .locationFont{
        .fs(30);
      }
      .icon-back{
        .fs(30);
        position: absolute;
        display: inline-block;
        .w(50);
        .h(50);
        .left(25);
        .top(25);
        background-image: url("../assets/imgs/w-back.svg");
        background-size: cover;
      }
    }
    .header-tittle{
      flex: 3;
    }
    .right-icon{
      position: relative;
      flex: 0.5;
      .pr(40);
      /*margin-right: 0.4rem;*/
      .van-icon{
        font-size: 0.6rem;
        vertical-align: middle;
        .mr(-50);
      }
      img{
        width: 50%;
        vertical-align: middle;
        .mr(-50);
      }
      .icon{
        position: absolute;
        display: inline-block;
        .w(50);
        .h(50);
        .right(25);
        .top(25);
        background-image: url("../assets/imgs/more.svg");
        background-size: cover;
      }
    }
  }
</style>
