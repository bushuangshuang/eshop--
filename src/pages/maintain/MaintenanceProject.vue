<template>
    <div class="MaintenanceProject-box">
      <common-header :tittle="tittle" :showleft="true" :routerLeft="routerLeft" :showrightt="true" :routerpublic="routerpublic" :righttitle="righttitle"></common-header>
      <div class="MaintenanceProject-title" >
        <li>发动机机油</li>
        <li>机油滤清器</li>
        <li>变速油箱</li>
        <li>火花塞</li>
        <li>空调滤清器</li>
        <li>燃油滤清器</li>
        <li>制动液</li>
        <li>+自定义保养</li>
      </div>
      <div class="MaintenanceProject-list" @click="maintain">
        <li>  <mt-field label="自定义保养名"  type="text" ><span>删除</span></mt-field></li>
        <li>
          <mt-field label="材料费" placeholder="请输入" type="text" ></mt-field>
        </li>
        <li>
          <mt-field label="材料品质" placeholder="请选择" type="text" ></mt-field>
        </li>
        <li>
          <mt-field label="工时费" placeholder="请输入" type="text" ></mt-field>
        </li>
      </div>
      <div class="MaintenanceProject-list" @click="maintain">
        <li>  <mt-field label="发动机机油"  type="text" ><span>删除</span></mt-field></li>
        <li>
          <mt-field label="材料费" placeholder="请输入" type="text" ></mt-field>
        </li>
        <li>
          <mt-field label="材料品质" placeholder="请选择" type="text" ></mt-field>
        </li>
        <li>
          <mt-field label="工时费" placeholder="请输入" type="text" ></mt-field>
        </li>
      </div>
    </div>
</template>

<script>
  import commonHeader from 'common/common-header'
    export default {
        name: "MaintenanceProject",
      data(){
          return{
            tittle:'保养记录',
            righttitle:'操作',
            routerLeft:'/maintenance/maintenance',
            routerpublic:'/'
          }
      },
      components:{
        commonHeader
      },
      methods:{
        maintain(){
          this.$router.push('/maintenance/MaintenanceRecord')
        }
      }
    }
</script>

<style scoped lang="less">
  @import "~styles/index.less";
  @import "~styles/variable.less";
  .MaintenanceProject-box{
    width: 100%;
    height: auto;
    .MaintenanceProject-title{
      width: 100%;
      height: 2.5rem;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      /*border: 1px solid #000;*/
      align-items: center;
      background: #fff;
      padding:  0.4rem;
      color: #777675;
      li{
        width: 22%;
        background: #FEF1EC;
        height: 0.7rem;
        border-radius: 0.3rem;
        line-height: 0.7rem;
      }
      li:nth-child(2){
        margin: 0 0.2rem 0 0.2rem;
      }
    }
    .MaintenanceProject-list{
      margin: 0.3rem 0;
      padding: 0 0.3rem;
      text-align: left;
      li:nth-child(1){
        .mint-cell-wrapper {
          padding-left:0.2rem ;
        }
        span{
          color:#F46161;
        }
      }
    }
  }
</style>
