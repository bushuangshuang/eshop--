<template>
    <div class="service-box">
      <common-header :tittle="tittle" :showleft="true" :showright="true"></common-header>
      <div class="service-banner">
        <img :src="imgFileUrl+fileAddress" alt="">
      </div>
    </div>
</template>

<script>
import commonHeader from 'common/common-header'
import { imgFileUrl } from '../../apiconfig/index'
export default {
  name: 'service',
  components: {
    commonHeader
  },
  data() {
    return {
      tittle: '服务保障',
      imgFileUrl:imgFileUrl,
      fileAddress: '20190722025858996p8AKz',
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
  .service-box{
    width: 100%;
    height: auto;
    .service-header{
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
    .service-banner{
      width: 100%;
      height: auto;
      img{
        width: 100%;
        height: 100%;
        display: block;
      }
    }
    .service-dis{
      width: 100%;
      height: auto;
      li{
        width: 100%;
        height: 5rem;
        border-bottom: 1px solid #EEF2F1;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        background: #fff;
        .fs(30);
        h4{
          font-weight: 700;
          margin-bottom: 0.2rem;
        }
        p{
          color: #939393;
        }
        img{
          width: 50%;
          height: 50%;
          margin: 0.3rem 0;
        }
      }
    }
  }
</style>
