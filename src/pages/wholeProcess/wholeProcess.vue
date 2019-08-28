<template>
    <div>
      <div class="line-f">&nbsp;</div>
      <div class="wholeprocess">
        <h4>购车流程</h4>
        <div class="wholeprocess-list">
          <li @click="showText('实名认证')">
            <img :src="src1" alt="">
            <span>实名认证</span>
          </li>
          <div class="next-step"><img src="../../assets/image/index-con-r.png"></div>
          <li @click="showText('平台下单')">
            <img :src="src2" alt="">
            <span>平台下单</span>
          </li>
          <div class="next-step"><img src="../../assets/image/index-con-r.png"></div>
          <li @click="showText('快速审批')">
            <img :src="src3" alt="">
            <span>快速审批</span>
          </li>
          <div class="next-step"><img src="../../assets/image/index-con-r.png"></div>
          <li @click="showText('一站式提车')">
            <img :src="src4" alt="">
            <span>一站式提车</span>
          </li>
        </div>
        <div class="next-top"><img :style="marginLeft" src="../../assets/image/index-next-top.png"></div>
        <div class="text">{{ text }}</div>
      </div>

    </div>
</template>

<script>
import srcSelected from '../../assets/image/flow.png'
import srcBefore from '../../assets/image/flow2.png'
import examine from '../../assets/image/examine.png'
import pickup from '../../assets/image/pickup.png'
import selectorder from '../../assets/image/selectorder.png'
import realname from '../../assets/image/realname .png'
import selectexamine from '../../assets/image/selectexamine.png'
import selectpickup from '../../assets/image/selectpickup.png'

export default {
  name: "wholeProcess",
  data () {
    return {
      text: '',
      src1: '',
      src2: '',
      src3: '',
      src4: '',
      marginLeft: ''
    }
  },
  mounted () {
    this.showText('实名认证')
  },
  methods: {
    showText (name) {
      if (name === '实名认证') {
        this.src1 = srcSelected
        this.src2 = srcBefore
        this.src3 = examine
        this.src4 = pickup
        this.text = '便捷的实名认证，为用户提供平台专属购车服务。'
        this.marginLeft = 'margin-left:0.9rem'
      } else if (name === '平台下单') {
        this.src2 = selectorder
        this.src1 = realname
        this.src3 = examine
        this.src4 = pickup
        this.text = '轻松购车四部曲选择车系、车型、下单、支付。'
        this.marginLeft = 'margin-left:3.18rem'
      } else if (name === '快速审批') {
        this.src3 = selectexamine
        this.src2 = srcBefore
        this.src1 = realname
        this.src4 = pickup
        this.text = '申请汽车贷款金融产品，实现分分钟放贷审批。'
        this.marginLeft = 'margin-left:5.4rem'
      } else if (name === '一站式提车') {
        this.src4 = selectpickup
        this.src3 = examine
        this.src2 = srcBefore
        this.src1 = realname
        this.text = '协助用户做好验车、提车，以及后期办理车辆金融贷款手续。'
        this.marginLeft = 'margin-left:7.86rem'
      }
    }
  }
}
</script>

<style scoped lang="less">
@import "~styles/index.less";
@import "~styles/variable.less";
  .line-f{
    .h(15);
    background-color:#f5f5f5;
  }
  .wholeprocess{
    background-color: #ffffff;
    .pl(30);
    .pr(30);
    .fs(30);
    .next-top{
      img{
        display: block;
        vertical-align: top;
        .w(20);
        .h(20);
        .pt(3.5);
      }
    }
    >h4{
      color: #FF6300;
      font-weight: 700;
      text-align: left;
      .fs(35);
      .pt(20);
      .pb(20);
    }
    .text{
      .fs(28);
      width: 100%;
      display: flex;
      align-items: center;
      background: #F5F5F5;
      padding:0.35rem 0.4rem;
      text-align: left;
      .lh(45);
    }
    .wholeprocess-list{
      width: 100%;
      display: flex;
      justify-content: space-between;
      .pl(30);
      .pr(30);
      .pt(20);
      .next-step{
        .pt(20);
        img{
          .w(10);
          .h(20);
        }
      }
      li{
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        span{
          margin-top: 0.25rem;
          margin-bottom: 0.2rem;
        }
      }
      img{
        width: 1rem;
        height: 1rem;
      }
    }
  }
</style>
