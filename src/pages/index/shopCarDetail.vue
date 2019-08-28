<template>
  <div class="orderinfo-box">
    <common-header :tittle="tittle" :showleft="true" :showright="true" :routerLeft="routerLeft"></common-header>
    <div class="orderinfo-content" >
      <img :src="imgFileUrl+data.url" alt="">
      <li >
        <p>
          <span>{{data.productNm}}<i>{{data.carProductVer}}</i></span>
          <span  @click="parameter()">参数配置</span>
        </p>
        <p class="dis">{{data.carProductStyle}}</p>
        <div class="dis" v-if="data.carProductKind==='1'"><div class="left">容量：<span >{{data.carPowerBatkwh}}</span></div><div class="right">续航里程：<span>{{data.carPowerMaxKm}}</span></div></div>
        <div class="dis" v-if="data.carProductKind==='2'"><div class="left">排量：<span >{{data.carPowerSvolume}}</span></div><div class="right"><span>环保标准：{{data.carPowerEp}}</span></div></div>
        <div class="dis"><div class="left">保修政策：<span>{{data.carProductKeep}}</span></div><div class="right">销售价格：<span>{{data.carProductPrice}}万</span></div></div>
        <div class="disLine">金融服务：<span>{{data.financeMethod}}</span></div>
        <div class="dis"><span>销售商：<span>{{data.partnerNm}}</span></span></div>
      </li>
      <div class="line-f">&nbsp;</div>
      <div class="business">
        <h5>商家信息</h5>
        <p>名称：{{data.partnerNm}}</p>
        <p>地址：{{data.partnerAddress}}</p>
        <p>联系电话：{{data.partnerLinkPhone}}</p>
      </div>
      <div class="submitBtn">
        <button @click="platform(data.partnerLinkPhone)">联系平台</button>
      </div>
    </div>
  </div>
</template>

<script>
import commonHeader from 'common/common-header'
import * as homeApi from '../../api/home-api'
import { imgFileUrl } from '../../apiconfig/index'
import { Toast } from 'vant'
export default {
  name: 'orderinfo',
  components: { commonHeader },
  data() {
    return {
      routerLeft: '/shopcar',
      tittle: '购物车详情',
      imgFileUrl: imgFileUrl,
      data: {}
    }
  },
  mounted() {
    this.getShopCarInfo()
  },
  methods: {
    getShopCarInfo() {
      let params = {
        'id': localStorage.getItem('shopId')
      }
      homeApi.getShoppingDetail(params).then(res => {
        if (res.data.code === '200') {
          this.data = res.data.list
        } else {
          Toast(res.data.msg)
        }
      })
    },
    parameter() {
      this.$router.push({path: '/parameter'})
    },
    platform(tel) {
      window.location.href = 'tel:' + tel
    }

  }
}
</script>
<style scoped lang="less">
  @import "~styles/index.less";
  @import "~styles/variable.less";
  .orderinfo-box{
    width: 100%;
    height: auto;
    .orderinfo-header{
      width: 100%;
      height: 1.35rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding:0 0.4rem;
      background: #fff;
      .fs(35);
      li:nth-child(1){
        img{
          width: 0.3rem;
          height: 0.5rem;
        }
      }
      li:nth-child(3){
        img{
          width: 0.5rem;
          height: 0.5rem;
        }
      }
    }
    .orderinfo-content{
      background-color: #ffffff;
      width: 100%;
      height: auto;
      .pl(10);
      .pr(10);
      padding-bottom: 0.5rem;
      >li{
        background: #fff;
        text-align: left;
        padding:0.4rem;
        line-height: 0.8rem;
        .fs(30);
        p:nth-child(2){
        }
        p:nth-child(1){
          .fs(35);
          display: flex;
          justify-content: space-between;
          span:nth-child(1){
            font-weight:bold;
            letter-spacing: 0.03rem;
            i{
              .ml(15);
              font-style:normal;
              font-weight:bold;
            }
          }
          span:nth-child(2){
            .fs(30);
            color: #FF4014;
          }

        }
        .disLine{
          width: 100%;
        }
        .dis{
          width: 100%;
          display: flex;
          justify-content: space-between;
        .left{
          span{
            color: #666666;
          }
        }
          .right{
            text-align: left;
            width: 50%;
            span{
              color: #666666;
            }
          }
        }
        .dis:last-child{
          width: 80%;
        }
      }
      .btn{
        width: 100%;
        padding:0 0.4rem;
        margin-bottom: 0.5rem;
        background: #fff;
        button{
          width: 100%;
          background: #C6DAF6;
          color: #000;
          .fs(33);
        }

      }
      .text{
        width: 100%;
        background: #fff;
        p{
          width: 50%;
          height: 1.3rem;
          margin: 0 auto;
          display: flex;
          .fs(30);
          justify-content: space-between;
          align-items: center;
          span:nth-child(1){
            color: #666666;
          }
          span:nth-child(2){
            color: #FF4014;
          }
        }
      }
      .line-f{
        .h(20);
        background-color:#f5f5f5;
      }
      .step{
        .padding(20,30);
        h5{
          .fs(35);
          color:#ff7414;
          text-align: left;
        }
        .step-list{
          .margin(0,60);
          .fs(30);
          text-align: left;
          h3{
            .pt(20);
            .pr(20);
            .pb(8);
            .pl(20);
          }
          p{
            .pr(20);
            .pb(20);
            .pt(8);
            .fs(28);
            .pl(20);
            color:#999999;
          }
          .van-steps--vertical{
            .padding(40,50);
          }
          .van-step__title{
            .padding(40,40);
          }
          .van-step__circle-container {
            position: absolute;
            top: 0px;
            left: 0px;
            padding: 0 0px;
            background-color: #fff;
            z-index: 999999;
          }
          .van-step__circle-container{
            position: absolute;
            top: 0px;
            left: 0px;
          }
          [class*=van-hairline]::after{
            border: none;
          }
        }
      }
      .business{
        .padding(20,30);
        text-align: left;
        h5{
          .fs(35);
          color:#ff7414;
          .pb(20);
        }
        p{
          .fs(28);
          .padding(6,20);
        }
      }
      .submitBtn{
      display: flex;
      justify-content: space-between;
        button{
          .fs(33);
          width:100%;
          border:none;
          color: #ffffff;
          background-color: #ff7414;
          .padding(20,0);
        }
      }
    }
    img{
      width: 100%;
    }
  }
</style>
<style>
  .van-step__circle {
    display: block;
    width: 10px!important;
    height: 10px!important;
    border-radius: 50%;
    background-color: #969799;
    top: 16px;
    left: -19px!important;
  }
  .van-icon-checked:before{
    font-size:16px;
  }
  .van-step--vertical.van-step--process .van-icon {
    top: 12px;
    left: -22px;
    line-height: 1;
    font-size: 12px;
  }
  /*.van-step--finish .van-step__circle, .van-step--finish .van-step__line{
    content: "\F02F";
    font-size:16px;
  }
  .van-step--finish .van-step__circle:before{
    content: "\F02F";
    font-size:16px;
  }*/
</style>
