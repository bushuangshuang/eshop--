<template>
    <div class="about-box">
      <common-header :tittle="tittle" :showleft="true"  :routerLeft="routerLeft" ></common-header>
      <div class="about-content">
        <img src="../../assets/image/versionImage.png" alt="">
        <p>版本{{version}}</p>
      </div>
    </div>
</template>

<script>
import commonHeader from 'common/common-header'
export default {
  name: 'about',
  components: {commonHeader},
  data() {
    return {
      tittle: '关于我们',
      routerLeft: '/index/out',
      version: '1.0.0'
    }
  },
  mounted() {
    this.getVersion()
  },
  methods: {
    getVersion() {
      this.version = plus.runtime.version
    }
  }
}
</script>

<style scoped lang="less">
  @import "~styles/index.less";
  @import "~styles/variable.less";
  .about-box{
    width: 100%;
    height: auto;
    .about-content{
      width: 100%;
      height: 6rem;
      background-color: #fff;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .fs(30);
      img{
        width: 3.5rem;
        height: 1.5rem;
        margin-bottom: 0.3rem;
      }
    }
  }
</style>
