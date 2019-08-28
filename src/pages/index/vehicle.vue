<template>
  <div class="point-box">
    <div class="point-header">
      <li @click="back">
        <img src="../../assets/image/back.png" alt="">
      </li>
      <li>
        车辆保养
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
          <p>保养项目：<span>{{item.object}}</span></p>
          <p>保养时间：<span>{{item.time}}</span></p>
          <p>关联车型：<span>{{item.type}}</span></p>
          <p>保养费用：<span>{{item.price}}</span></p>
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
    name: "vehicle",
    data(){
      return{
        searchvalue:'',
        list:[
          {
            object:'项目名称',
            time:'2019-03-20',
            type:'尼欧||',
            price:'500元',
            integral:'1000分',
            date:'2018-03-20'
          },
          {
            object:'项目名称',
            time:'2019-03-20',
            type:'尼欧||',
            price:'500元',
            integral:'1000分',
            date:'2018-03-20'
          },
          {
            object:'项目名称',
            time:'2019-03-20',
            type:'尼欧||',
            price:'500元',
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
        height: 3.5rem;
        line-height: 0.7rem;
        background: #fff;
        .fs(30);
        border-bottom: 1px solid #E7E7E7;
        padding: 0 0.3rem;
        .left{
          text-align: left;
          span{
            color: #6B6B6B;
            margin-left: 1rem;
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
