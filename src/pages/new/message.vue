<template>
    <div class="message-box">
      <common-header :tittle="tittle" :showleft="true"  :routerBack="true"></common-header>
      <div class="message-contentlist">
        <li v-for="item in list">
          <div class="top">{{item.date}}</div>
          <div class="bottom">
            <p><span>{{item.inform}}</span><span>{{item.status}}</span></p>
            <p>
                {{item.content}}
            </p>
          </div>
        </li>
      </div>
    </div>
</template>

<script>
import commonHeader from 'common/common-header'

export default {
  name: 'message',
  components: {
    commonHeader
  },
  data() {
    return {
      tittle: '消息详情',
      year: '',
      list: [
        {
          date: '19/03/13',
          inform: '服务通知',
          status: '未读',
          content: '通知详情通知详情通知详情通知详情通知详情通知详情通知详情通知详情通知详情通知详情通知详情通知详情通知详情通知详情通知详情'
        },
        {
          date: '19/03/13',
          inform: '服务通知',
          status: '未读',
          content: '通知详情通知详情通知详情通知详情通知详情通知详情通知详情通知详情通知详情通知详情通知详情通知详情通知详情通知详情通知详情'
        },
        {
          date: '19/03/13',
          inform: '服务通知',
          status: '未读',
          content: '通知详情通知详情通知详情通知详情通知详情通知详情通知详情通知详情通知详情通知详情通知详情通知详情通知详情通知详情通知详情'
        },
        {
          date: '19/03/13',
          inform: '服务通知',
          status: '未读',
          content: '通知详情通知详情通知详情通知详情通知详情通知详情通知详情通知详情通知详情通知详情通知详情通知详情通知详情通知详情通知详情'
        }
      ]
    }
  },
  methods: {
    newDate() {
      var myDate = new Date()
      this.year = myDate.getFullYear()
    },
    back() {
      this.$router.goBack()
    }
  },
  mounted() {
    this.newDate()
  }
}
</script>

<style scoped lang="less">
  @import "~styles/index.less";
  @import "~styles/variable.less";
  .message-box{
      .message-header{
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .fs(40);
        padding:0 0.2rem;
        height: 1.2rem;
        background: #fff;
        img{
          width: 0.3rem;
          height: 0.4rem;
          vertical-align: middle;
        }
      }
      .message-contentlist{
        width: 100%;
        height: auto;
        li{
          .top{
            width: 2rem;
            height: 0.5rem;
            background: #CECDD2;
            color:#fff;
            margin: 0.2rem auto;
            line-height: 0.5rem;
            border-radius: 0.1rem;
          }
          .bottom{
            width: 90%;
            background:#fff ;
            height: 3rem;
            margin: 0 auto;
            border-radius: 0.2rem;
            padding: 0.2rem;
            p:nth-child(1){
              display: flex;
              justify-content: space-between;
              height: 0.7rem;
              span:nth-child(1){
                .fs(35)
              }
              span:last-child{
                color: #F57344;
              }
            }
            p:nth-child(2){
              text-align: left;
              color: #B2B2B2;
            }
          }
        }
      }
  }
</style>
