<template>
  <div class="point-box">
    <div class="point-header">
      <li @click="back">
        <img src="../../assets/image/back.png" alt="">
      </li>
      <li>
        认证爱车
      </li>
      <li></li>
    </div>
    <div class="point-search">
      <form action="/">
        <van-search placeholder="请输入搜索关键词" v-model="searchvalue" />
      </form>
    </div>
    <div class="point-dis">
      <li v-for="(item,index) in list">
        <div class="left">
          <p>认证时间：<span>{{item.time}}</span></p>
          <p>关联车辆：<span>{{item.car}}</span></p>
          <p>车辆编码：<span>{{item.bm}}</span></p>
          <p>车牌号码：<span>{{item.hm}}</span></p>
          <p>车主姓名：<span>{{item.name}}</span></p>
          <p>联系电话：<span>{{item.phone}}</span></p>

        </div>
        <div class="right">
          <p>{{item.integral}}</p>
          <p>{{item.date}}</p>
        </div>
      </li>
    </div>
  </div>
</template>

<script>
  export default {
    name: "certification",
    data(){
      return{
        searchvalue:'',
        list:[
          {
            time:'2019-03-20',
            car:'尼欧||',
            bm:'AS12345',
            hm:'AS12345',
            name:'张三',
            phone:'15091868557',
            integral:'1000分',
            date:'2018-03-20'
          },
          {
            time:'2019-03-20',
            car:'尼欧||',
            bm:'AS12345',
            hm:'AS12345',
            name:'张三',
            phone:'15091868557',
            integral:'1000分',
            date:'2018-03-20'
          },
          {
            time:'2019-03-20',
            car:'尼欧||',
            bm:'AS12345',
            hm:'AS12345',
            name:'张三',
            phone:'15091868557',
            integral:'1000分',
            date:'2018-03-20'
          }
        ]
      }
    },
    methods:{
      back(){
        this.$router.goBack()
      }
    },
    mounted(){
    }
  }
</script>

<style scoped lang="less">
  @import "~styles/index.less";
  @import "~styles/variable.less";
  .point-box{
    width: 100%;
    height: auto;
    .point-header{
      width: 100%;
      display: flex;
      height: 1.35rem;
      justify-content: space-between;
      align-items: center;
      background: #fff;
      padding: 0 0.4rem;
      .fs(30);
      border-bottom: 1px solid #F4F6FA;
      li:nth-child(1){
        img{
          width: 0.3rem;
          height: 0.4rem;
        }
      }
    }
    .point-search{
      /*border: 1px solid red;*/
      /*border-radius: 0.6rem;*/
      background: #fff;
      padding:0.4rem 0.3rem;
      .point-search{
        /*background: #E8E8E8!important;*/
      }
    }
    .point-dis{
      width: 100%;
      height: auto;
      padding: 0.3rem 0.4rem;
      li{
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 5rem;
        line-height: 0.7rem;
        background: #fff;
        .fs(30);
        border-bottom: 1px solid #E7E7E7;
        padding: 0 0.3rem;
        .left{
          text-align: left;
          span{
            color: #6B6B6B;
          }
        }
        .right{
          p:nth-child(1){
            color: #F65316;
          }
          p:nth-child(2){
            color: #B4B4B4;
          }
        }
      }
    }
  }
</style>
