<template>
    <div class="shoppingcenter-box">
      <common-header :tittle="tittle" :showleft="true" :showinput="true" :showright="true"></common-header>
      <div class="car-type">
        <mt-tab-container v-model="selected">
          <mt-tab-container-item id="1">
            <common-plan></common-plan>
          </mt-tab-container-item>
          <mt-tab-container-item id="2">
            <div class="someTip">敬请期待...</div>
          </mt-tab-container-item>
          <mt-tab-container-item id="3">
            <div class="someTip">敬请期待...</div>
          </mt-tab-container-item>
        </mt-tab-container>
      </div>
    </div>
</template>

<script>
import carlist from '../../assets/image/carlist.png'
import commonPlan from './purchasingplan'
import commonHeader from 'common/common-header'

export default {
  name: 'shoppingcenter',
  components: {
    commonPlan, commonHeader
  },
  data() {
    return {
      tittle: '',
      selected: '1',
      carTypeList: [
        {
          src: carlist,
          pricelist: [
            {price: '5-8万'},
            {price: '12-18万'},
            {price: '18-25万'},
            {price: '25万'}
          ],
          rangelist: [
            {range: '100-200'},
            {range: '200-300'},
            {range: '300-400'},
            {range: '400以上'}
          ]
        }
      ]
    }
  },
  methods: {
    back() {
      this.$router.goBack()
    },
    toNews() {
      this.$router.push('/message')
      // MessageBox.alert('敬请期待...', '提示')
    }
  }
}
</script>

<style scoped lang="less">
@import "~styles/index.less";
@import "~styles/variable.less";
  .shoppingcenter-box{
    width: 100%;
    height: auto;
    .shoppingcenter-header{
      width: 100%;
      height: 1.35rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #fff;
      border-bottom: 1px solid #dedede;
      li:nth-child(1){
        width: 15%;
        .van-icon {
          font-size: 0.6rem;
        }
      }
      li:nth-child(2){
        width: 70%;
        .input-box {
          .h(150);
          position: relative;
          .pt(43);
          .pl(30);
          .pr(30);
          .icon {
            position: absolute;
            display: inline-block;
            .w(30);
            .h(30);
            .top(60);
            .left(60);
            background-image: url("../../assets/image/search-f.png");
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
      }
      li:nth-child(3){
        width: 15%;
        .van-icon{
          .fs(40);
        }
        .header-right{
          position: absolute;
          display: inline-block;
          .w(50);
          .h(50);
          .right(25);
          .top(25);
          background: url("../../assets/image/message.png") center no-repeat;
          background-size:0.6rem 0.6rem;
        }
      }
    }
    .car-type{
      .line-f{
        .h(20);
        background-color:#f5f5f5;
      }
      .fs30{
        .fs(30)
      }
      .someTip{
        background-color:#fff;
        display:flex;
        justify-content: center;
        padding-top:1rem;
        font-size:0.4rem
      }
    }
    .tab-container-list{
      width: 100%;
      height: auto;
      font-size: 0.12rem;
      p{
        height: 1rem;
        line-height: 1rem;
        display: flex;
        justify-content: space-between;
        span{

        }
      }
      .img{
        width: 100%;
        height: auto;
        img{
          width: 100%;
          height: 100%;
        }
      }
    }

  }
</style>
