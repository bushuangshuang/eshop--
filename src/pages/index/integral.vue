<template>
    <div class="integral-box">
      <div class="integral-banner">
          <div class="integral-title">
            <li>
              <van-icon name="arrow-left" @click="back"/>
            </li>
            <li>
              我的积分
            </li>
            <li>
              积分说明
            </li>
          </div>
          <div class="integral-jf">
            <li> </li>
            <li>
              <h4>100000分</h4>
              <van-button type="default">去兑换</van-button>
            </li>
             <li></li>
          </div>
      </div>
      <div class="integral-tz">
        <img src="../../assets/image/inform.png" alt="">
        <span>消息提示消息消息提示消息</span>
      </div>
      <div class="integral-dis">
        <div class="integral-title">
          <p></p><span>获得积分</span>
        </div>
        <li v-for="(item,id) in list">
          <div class="left">
            <p><span>{{item.recommend}}</span><span>{{item.interage}}</span></p>
            <p>{{item.text}}</p>
          </div>
          <div @click="toSomePage(item.id)" class="right">
            <van-button type="primary" >查看明细</van-button>
          </div>
        </li>
      </div>
    </div>
</template>

<script>
export default {
  name: 'integral',
  data() {
    return {
      list: [
        {
          recommend: '推荐购车',
          interage: '1000分',
          text: '推荐客户200人，排行榜第10位',
          id: '0'
        },
        {
          recommend: '推荐保险',
          interage: '1000分',
          text: '推荐客户200人，排行榜第10位',
          id: '1'
        },
        {
          recommend: '车辆保养',
          interage: '1000分',
          text: '推荐客户200人，排行榜第10位',
          id: '2'
        },
        {
          recommend: '认证爱车',
          interage: '1000分',
          text: '已认证2辆',
          id: '3'
        }
      ],
      infoid: ''
    }
  },
  methods: {
    back() {
      this.$router.goBack()
    },
    toSomePage(id) {
      if (id=='0') {
        this.$router.push({path: '/point', name: 'point', params:{id: id}})
      } else if (id=='1') {
        this.$router.push({path: '/insurance', name: 'insurance', params: { id: id }})
      } else if (id=='2') {
        this.$router.push({path: '/vehicle', name: 'vehicle', params: {id: id}})
      } else {
        this.$router.push({path: '/certification', name: 'certification', params: {id: id}})
      }
    }
  }
}
</script>

<style scoped lang="less">
  @import "~styles/index.less";
  @import "~styles/variable.less";
  .integral-box{
    width: 100%;
    height: auto;
    .integral-banner{
      width: 100%;
      height: 4.5rem;
      background:url("../../assets/image/interage-banner.png") no-repeat ;
      background-size: 100% 100%;
      .integral-title{
        width: 100%;
        display: flex;
        justify-content: space-between;
        .fs(30);
        color: #fff;
        align-items: center;
        height: 1.35rem;
        padding: 0 0.4rem;
        li{
          width: 33%;
          text-align: left;
        }
        li:nth-child(3){
          text-align: right;
        }
        li:nth-child(2){
          text-align: center;
        }
        li:nth-child(1){
          .van-icon {
            font-size: 0.6rem;
          }
          img{
            width: 0.3rem;
            height: 0.5rem;
          }
        }

      }
      .integral-jf{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 0.4rem;
        .fs(30);
        li{
          /*width: 33%;*/
          .van-button--normal{
            padding: 0rem !important;
            width: 2rem;
            height: 0.7rem;
            line-height: 0.7rem;
            border-radius: 0.3rem;
            color: #F55415;
          }
        }
        h4{
          color: #fff;
          margin-bottom: 0.5rem;
        }
      }

    }
    .integral-tz{
      width: 100%;
      height: 1.2rem;
      background: #FFFBE8;
      color: #F55415;
      display: flex;
      align-items: center;
      .fs(30);
      padding: 0 0.4rem;
      img{
        width: 0.5rem;
        height: 0.4rem;
        margin-right: 0.3rem;
      }
    }
    .integral-dis{
      width: 100%;
      height: auto;
      padding:  0.4rem;
      .integral-title{
        width: 100%;
        height: 1.2rem;
        display: flex;
        .fs(30);
        align-items: center;
        background: #fff;
        border-bottom: 1px solid #E5E5E5;
        padding-left: 0.2rem;
        p{
          width: 0.3rem;
          height: 0.3rem;
          background: #F45514;
          border-radius: 50%;
          margin-right: 0.2rem;
        }
      }
      li{
        width: 100%;
        height: auto;
        display: flex;
        background:#fff;
        justify-content: space-between;
        line-height: 0.7rem;
        align-items: center;
        .fs(30);
        padding: 0.2rem;
        border-bottom: 1px solid #DDDDDD;
        .left{
          width: 64%;

          p{
            display: flex;
            justify-content: space-between;
            text-align: left;
            flex-wrap: nowrap;
          }
          p:nth-child(1){
            span:last-child{
              color: #F45416;
            }
          }
          p:nth-child(2){
            color: #B5B5B5;
          }
        }
        .right{
          .van-button {
            background: #F45416;
            color: #fff;
            border: none;
            outline: none;
            border-radius: 0.1rem;
            height: 0.9rem;
            line-height: 0.9rem;
          }
        }
      }
    }
  }
</style>
