<template>
  <div class="order-list-bg" :style="orderList.length==0?'padding-bottom:0.26rem':''">
    <div v-if="orderList.length!=0" v-for="item in orderList">
      <van-cell
      >
      <van-swipe-cell :right-width="getIsDelete(item)?60:0" :on-close="onClose"
      >
      <div class="content-tab">
        <li>
          <span>订单编号：{{item.orderFlowNo}}</span>
          <span v-if="item.orderStatus==14">办理中</span>
          <span v-if="item.orderStatus==15">成功</span>
          <span v-if="item.orderStatus==12">关闭</span>
        </li>
        <li>
          <div class="left">
            <img :src='getImgUrl(item.carProductPic)' alt="">
          </div>
          <div class="right">
            <p>
              <span>{{item.productNm}}</span>
            </p>
            <p>
              <span v-if="item.carProductKind=='2'?true:false">燃油</span>
              <span v-if="item.carProductKind=='1'?true:false">电动</span>
              /{{item.carProductStyle}}/{{item.productColor}}
            </p>
            <p class="nowrapStyle">经销商：{{item.partnerNm}}</p>
            <p v-if="item.carProductKind=='1'?true:false"><span>容量：{{item.carPowerBatkwh}}kWh</span><span>续航：{{item.carPowerMaxKm}}km</span></p>
            <p v-if="item.carProductKind=='2'?true:false"><span>排气量：{{item.carPowerSvolume}}L</span><span>{{item.carPowerEp}}</span></p>
            <p><span>{{item.carProductKeep}}</span><span>{{item.financialServicesModel}}</span></p>
            <p v-if="item.orderStatus=='8'"><span>订金：<i>{{item.earnestMoney}}</i></span><span :style="(item.orderStatus=='1'||item.orderStatus=='3')?'color:#FF3F12':''">{{item.orderStatusStr}}</span></p>
            <p v-if="item.orderStatus!='8'"><span>价格：<i>{{item.orderPrice}}万</i></span><span :style="(item.orderStatus=='1'||item.orderStatus=='3')?'color:#FF3F12':''">{{item.orderStatusStr}}</span></p>
          </div>
        </li>
        <li>
          <!--删除 6 8-->
          <button class="btn" @click="toPay(item)" v-if="item.orderStatus==6||item.orderStatus==7||item.orderStatus==8||item.orderStatus==11?true:false">预下单成功</button>
          <button class="btn" v-if="item.orderStatus==3?true:false" @click="userTesting(item.id)">用户验车</button>
          <button class="btn" @click="toApplyRefund(item.id)" v-if="item.orderStatus==2||item.orderStatus==3?true:false">申请退款</button>
          <button class="btn" v-if="item.orderStatus==14?true:false" @click="toRevoke(item.id)">撤销申请</button>
          <button class="btn" v-if="item.orderStatus==10?true:false" @click="friend(item.orderFlowNo)">好友推荐</button>
          <button class="btn" @click="orderInfo(item.id)">查看详情</button>
        </li>
      </div>
        <van-button
          square
          slot="right"
          type="danger"
          text="删除"
          @click="deletd(item.id)"
          v-if='item.orderStatus===6||item.orderStatus===8'
        />
      </van-swipe-cell>
      </van-cell>
    </div>
    <div v-if="orderList.length==0" class="nullTip">
      <img src="../assets/image/tipNull.png">
      <p>暂无数据</p>
    </div>
  </div>
</template>

<script>
import { imgFileUrl } from '../apiconfig/index'
export default {
  name: 'common-order-block',
  props: {
    orderList: {
      type: Array,
      default: () => {
        return [{
          id: '',
          orderFlowNo: '',
          carProductPic: '',
          productNm: '',
          carProductKind: '',
          carProductStyle: '',
          productColor: '',
          partnerNm: '',
          carPowerBatkwh: '',
          carPowerMaxKm: '',
          carProductKeep: '',
          financialServicesModel: '',
          earnestMoney: '',
          orderStatus: '',
          orderPrice: '',
          orderStatusStr: '',
          carPowerSvolume: '',
        }]
      }
    }
  },
  data() {
    return {
      imgFileUrl: imgFileUrl,
      defaultUrl: '20190628093610540dkGlo'
    }
  },
  methods: {
    getImgUrl(url) {
      let imgFileUrlS = imgFileUrl
      if (url === undefined || url === null || url === '') {
        imgFileUrlS = imgFileUrl + this.defaultUrl
      } else {
        imgFileUrlS = imgFileUrl + url
      }
      return imgFileUrlS
    },
    onClose(clickPosition, instance) {
      switch (clickPosition) {
        case 'cell':
        case 'outside':
          instance.close()
          break
      }
    },
    getIsDelete(item){
      let isDel = false
      // 全款待支付并且已付订单金额为0时
      if(item.orderStatus === 6 && item.countAmountPaid === 0 ){
        isDel = true
      } else if (item.orderStatus === 8 && item.countDepositPaid === 0) { //履约金或者订金待支付时并且已付定金金额为0时
        isDel = true
      }
      return isDel
    },
    deletd(id) {
        this.$emit('on-to-delete-order',{id:id})
    },
    toPay(item) {
      this.$emit('on-to-pay', { item: item })
    },
    userTesting(id) {
      this.$emit('on-to-order-usercar', { id: id })
    },
    orderInfo(id) {
      this.$emit('on-to-order-info', { id: id })
    },
    toApplyRefund(id) {
      this.$emit('on-to-apply-refund', { id: id})
    },
    toRevoke(id) {
      this.$emit('on-to-revoke', { id: id })
    },
    friend(orderFlowNo) {
      this.$emit('on-friend', { orderFlowNo: orderFlowNo })
    }
  }
}
</script>

<style scoped lang="less">
  @import "~styles/index.less";
  @import "~styles/variable.less";
  .order-list-bg{
    .pt(20);
    .pl(22);
    .pr(22);
    .pb(20);
    background-color: #f5f5f5;
    .nullTip{background-color:#fff;height:70vh;padding-top:20vh;
      img{
        width:50%;height:auto;
      }
      p{
        color:#999999;font-size:0.4rem;
      }
    }
    .content-tab{
      border-radius:5px;
      background: #fff;
      padding: 0 0.4rem;
      .mb(20);
      li:nth-child(1){
        width: 100%;
        display: flex;
        justify-content: space-between;
        background: #fff;
        .fs(30);
        padding-top: 0.4rem;
        span:nth-child(1){
          color:#9E9E9E ;
        }
        span:nth-child(2){
          color:#2ED36B ;
        }
      }
      li:nth-child(2){
        color: #989898;
        display: flex;
        justify-content: space-between;
        background: #fff;
        align-items: center;
        margin-top: 0.3rem;
        height: 3.6rem;
        border-bottom: 1px solid #F5F5F5;
        padding-bottom: 0.2rem;
        .left{
          width: 30%;
          height: 100%;
          img{
            width: 100%;
            height: 100%;
            border-radius: 0.2rem;
            vertical-align: middle;
          }
        }
        .right{
          width: 70%;
          text-align: left;
          padding-left: 0.3rem;
          line-height: 0.6rem;
          .fs(30);
          p{.fs(28);}
          p:nth-child(1){
            color: #000;
            .fs(33);
          }
          p:nth-child(4){
            display: flex;
            justify-content: space-between;
          }
          p:nth-child(5){
            display: flex;
            justify-content: space-between;
          }
          p:nth-child(6){
            display: flex;
            justify-content: space-between;
            span:nth-child(1){
              i{
                color: #FF3F12;
                font-weight: 600;
                font-style:normal
              }
            }
            span:nth-child(2){
              color: #2ED36B;
            }
          }
          .nowrapStyle{overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
        }
      }
      li:nth-child(3){
        margin-top: 0.3rem;
        display: flex;
        justify-content: flex-end;
        .pb(30);
        .btn{
          .fs(28);
          background: #fff;
          border: 1px solid #F68151;
          border-radius: 4px;
          .padding(10,24);
        }
        .btn:nth-child(1){
          background: #F45416;
          color: #fff;
        }
        .btn:nth-child(2){
          color: #F45416;
          margin-left: 0.3rem;
          margin-right: 0.3rem;
        }
        .btn:nth-child(3){
          color: #F45416;
        }
      }
    }
  }
</style>
