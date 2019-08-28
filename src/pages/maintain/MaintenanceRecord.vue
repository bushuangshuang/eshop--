<template>
    <div class="MaintenanceRecord-box">
      <common-header :tittle="tittle" :showleft="true" :routerLeft="routerLeft" :showrightt="true" :routerpublic="routerpublic" :righttitle="righttitle"></common-header>
      <div class="MaintenanceRecord-portrait">
        <li>
          <div class="left">
            <img src="../../assets/image/article.png" alt="">
            <div class="left-right">
              <p>用户名称</p>
              <p>2019-01-01 尼欧||中档配置</p>
            </div>

          </div>

          <div class="right">
            审核中
          </div>
        </li>
      </div>
      <div class="MaintenanceRecord-list">
        <li>
          <span>车型</span>
          <span>尼欧||</span>
        </li>
        <li>
          <span>日期</span>
          <span>2019-01-01</span>
        </li>
        <li>
          <span>花费</span>
          <span>258元</span>
        </li>
        <li>
          <span>里程</span>
          <span>111公里</span>
        </li>
        <li>
          <span>门店</span>
          <span>紫荆清远门店</span>
        </li>
        <li>
          <span>评价</span>
          <span>尼欧||</span>
        </li>
      </div>
      <div class="text-content">
        <!--<h4>保养单据</h4>-->
        <table>
          <tr>
            <td>保养项目</td>
            <td>材料</td>
            <td>配件材料费(元)</td>
            <td>工时费(元)</td>
          </tr>
          <tr>
            <td>火花塞</td>
            <td>原厂</td>
            <td>258</td>
            <td>2</td>
          </tr>
          <tr>
            <td>合计</td>
            <td></td>
            <td>258</td>
            <td>2</td>
          </tr>
        </table>

      </div>
      <div class="text-content">
        <h4>保养心得</h4>
        <p>
          费用低，更实惠，价格只有4s店的几分之一服务透明,全程监控保养完之后可以通过视频查看操作全程。费用低
          更实惠，价格只有4s店的几分之一服务透明,全程监控保养完之后可以通过视频查看操作全程
        </p>
      </div>
      <div class="text-content">
        <h4>保养单据</h4>

      </div>
    </div>
</template>

<script>
  import commonHeader from 'common/common-header'
    export default {
        name: "MaintenanceRecord",
      data(){
          return{
            tittle:'我的保养',
            righttitle:'操作',
            routerLeft:'/maintenance/maintenance',
            routerpublic:'/'
          }
      },
      components:{
        commonHeader
      }
    }
</script>

<style scoped lang="less">
  @import "~styles/index.less";
  @import "~styles/variable.less";
  .MaintenanceRecord-box{
    width: 100%;
    height: auto;
    .fs(30);
    .MaintenanceRecord-portrait{
      width: 100%;
      height: 2rem;
      /*border: 1px solid red;*/
      background: #fff;
      padding: 0 0.4rem;
      .fs(30);
      margin-bottom: 0.2rem;
      li{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .left{
          display: flex;
          text-align: left;
          p:last-child{
            color: #999999;
          }
          img{
            width: 1rem;
            height: 1rem;
            border-radius: 50%;
            margin-right: 0.2rem;
          }

        }
        .right{
          color: #2975FC;
        }
      }
    }
    .MaintenanceRecord-list{
      width: 100%;
      height: auto;
      background: #fff;
      line-height: 35px;
      li:nth-child(3){
        span:last-child{
          color: #FF4014;
        }
      }
      li{
        width: 100%;
        height: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 0.4rem;
        span:last-child{
          color: #666666;
        }
      }
    }
    .text-content{
      background: #fff;
      margin-bottom: 0.4rem;
      table{
        width: 100%;
        background: #fff;
        margin-top: 0.3rem;
        tr:nth-child(1){
          background: #FFF1E7;
        }
        tr:nth-child(2){
          border-top: none;
          border-bottom: none;
        }
        tr{
          width: 100%;
          display: flex;
          justify-content: space-between;
          border: 1px solid #FF7414;
          td{
            text-align: center;
            flex-wrap: nowrap;
            width: 23%;

          }
          td:nth-child(3){
            width: 32%;
            /*border-top: none;*/
          }
        }
      }
      padding: 0.4rem;
      >h4{
        color: #F47442;
      }
      p{
        margin-bottom: 0.3rem;
      }
      line-height: 0.7rem;
      .fs(30);
      text-align: left;
      width: 100%;
      height: auto;

    }

  }
</style>
