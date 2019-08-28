<template>
  <div class="orderinfo-box">
    <common-header :tittle="tittle" :showleft="true" :showright="true" :routerLeft="routerLeft"></common-header>
    <div class="orderinfo-content" >
      <img :src="imgFileUrl+data.carProductPic" alt="">
      <li >
        <p>
          <span>{{data.productNm}}<i>{{data.carProductVer}}</i></span>
          <span  @click="parameter(data)">参数配置</span>
        </p>
          <p class="dis">{{data.carProductStyle}}</p>

          <div class="dis" v-if="data.carProductKind==='1'"><div class="left">容量：<span >{{data.carPowerBatkwh}}</span></div><div class="right">续航里程：<span>{{data.carPowerMaxKm}}</span></div></div>
        <div class="dis" v-if="data.carProductKind==='2'"><div class="left">排量：<span >{{data.carPowerSvolume}}</span></div><div class="right"><span>环保标准：{{data.carPowerEp}}</span></div></div>
          <div  class="dis"><div class="left">保修政策：<span>{{data.carProductKeep}}</span></div><div class="right">成交价格：<span>{{data.orderMoney}}万</span></div></div>
          <div  class="dis"><div class="left">销售价格：<span>{{data.sellingPrice}}</span></div><div class="right">金融服务：<span>{{data.financialServicesModel}}</span></div></div>
          <div  class="dis"><span>销售商：<span>{{data.partnerNm}}</span></span></div>
      </li>
      <!--<div class="btn">
        <mt-button @click="loan">预计贷款明细</mt-button>
      </div>-->
      <div class="line-f">&nbsp;</div>
      <div class="step">
          <h5 v-if="isshow=='1'">订单编号：{{data.orderFlowNo}}</h5>
        <h5>订单状态</h5>
        <div class="step-list">
          <van-steps direction="vertical" :active=activeS >
            <van-step v-for="item in data.nodeList">
              <h3>{{item.codedesc}}</h3>
              <p>{{item.lastUpdTime}}</p>
            </van-step>
          </van-steps>
        </div>
      </div>
      <div class="line-f" v-if="orderPaymentDetails.length > 0">&nbsp;</div>
      <div  class="orderPaymentDetails" v-if="orderPaymentDetails.length > 0">
        <li>
          <span>支付时间</span>
          <span>金额（元）</span>
        </li>
        <li v-for="item in orderPaymentDetails">
          <span>{{item.createDate}}</span>
          <span>{{item.payAmount}}</span>
        </li>
      </div>
      <div class="line-f">&nbsp;</div>
      <div class="business">
        <h5>商家信息</h5>
        <p>名称：{{data.partnerNm}}</p>
        <p>地址：{{data.partnerAddress}}</p>
        <p>联系电话：{{data.partnerLinkPhone}}</p>
      </div>
      <div class="submitBtn">
        <button @click="checkcars(data.id)" v-if="isshow=='1'">确认验车</button>
        <button @click="platform(data.partnerLinkPhone)">联系平台</button>
      </div>
  </div>
  </div>
</template>

<script>
import { Step, Steps } from 'vant'
import commonHeader from 'common/common-header'
import * as homeApi from '../../api/home-api'
import { imgFileUrl } from '../../apiconfig/index'
import { Dialog, Toast } from 'vant'
export default {
  name: 'orderinfo',
  components: { Step, Steps, commonHeader },
  data() {
    return {
      isshow: localStorage.getItem('orderTitle'),
      routerLeft: '/orderlist',
      tittle: '',
      imgFileUrl: imgFileUrl,
      checkcar: this.$route.params.checkcar,
      list: [],
      data: {},
      orderId: '',
      activeS: Number(''),
      nodelistarr: [],
      orderPaymentDetails: [],
      countRefundAmount: ''
    }
  },
  mounted() {
    this.getorderinfo()
  },
  methods: {
    checkcars(id) {
      let params = {
        id: id
      }
      homeApi.checkcaroperatio(params).then(res => {
        if (res.data.code == '200') {
          this.activeS = Number(this.activeS) + 1
          Toast('用户验车成功')
        } else {
          Toast(res.data.msg)
        }
      }).catch(err => {
        console.log('ERR', err)
      })
    },
    loan() {
      this.$router.push({path: '/calculate'})
    },
    parameter(data) {
      localStorage.setItem('carProductCd', data.carProductCd)
      this.$router.push({path: '/parameter'})
    },
    platform(tel) {
      window.location.href = 'tel:' + tel
    },
    getorderinfo() {
      let params = {
        'id': localStorage.getItem('orderId')
      }
      homeApi.orderinfo(params).then(res => {
        if (res.data.code === '200') {
          this.data = res.data.data
          let nodelist = res.data.data.nodeList
          this.countRefundAmount = res.data.data.countRefundAmount
          this.orderPaymentDetails = res.data.data.orderPaymentDetails
          if (localStorage.getItem('orderTitle') === '1') {
            this.tittle = '用户验车'
          } else if (localStorage.getItem('orderTitle') === '2') {
            this.tittle = '订单详情'
          }
          for (var i = 0; i < nodelist.length; i++) {
            if (nodelist[i].used == true) {
              this.nodelistarr.push(nodelist[i].used)
              this.activeS = Number(this.nodelistarr.length - 1)
            }
          }
        } else {
          Toast(res.data.msg)
        }
      }).catch(err => {
        console.log(err)
      })
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
      .orderPaymentDetails{
        .padding(30,20);
        li:last-child{
          border-bottom: 1px solid #969799;
        }
        li{
          width: 100%;
          height: 0.7rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border: 1px solid #969799;
          border-bottom: none;
          span{
            width: 50%;
            height: 100%;
            line-height: 0.7rem;
          }
          span:last-child{
            border-left: 1px solid #969799;
          }
        }
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
          .margin(0,10)
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
