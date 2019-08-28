<template>
    <div class="wholeprocess-box">
      <common-header :tittle="tittle" :showleft="true" :showright="true"></common-header>
      <div class="wholeprocess-content">
        <img src="../../assets/image/shopcar.jpg" alt="">
      </div>
    </div>
</template>

<script>
import commonHeader from 'common/common-header'
export default {
  name: 'wholeprocess',
  components: {
    commonHeader
  },
  data() {
    return {
      tittle: '购车流程'
    }
  },
  methods: {
    back() {
      this.$router.goBack()
    },
    toNews() {
      this.$router.push('/message')
    }
  }
}
</script>

<style scoped lang="less">
  @import "~styles/index.less";
  @import "~styles/variable.less";
  .wholeprocess-box{
    width: 100%;
    height: auto;
    .wholeprocess-header{
      width: 100%;
      height: 1.35rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #fff;
      border-bottom: 1px solid #dedede;
      padding: 0 0.2rem 0 0;
      .fs(30);
      li:first-child{
        .van-icon {
          font-size: 0.6rem;
        }
      }
      li{
        .input-box {
          .h(150);
          position: relative;
          .pt(43);
          .pl(30);
          .pr(30);
          .search {
            background-color:#f7f3f8;
            .b-radius(58);
            /*.h(50);*/
            .lh(58);
            width: 100%;
            outline: none;
            .pl(65);
            .pr(65);
            .pt(5);
            .fs(26);
          }
        }
      }
      li:last-child{
        .van-icon{
          .fs(40);
        }
      }
    }

    .wholeprocess-content{
      width: 100%;
      height: auto;
      img{
        width: 100%;
        height: 100%;
      }
    }
  }
</style>
