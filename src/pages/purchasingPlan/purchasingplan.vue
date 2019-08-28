<template>
  <div class="purchasing">
    <h4>轻松购车四步搞定</h4>
    <div class="purchasing-list">
      <li v-for="(item,index) in carSeriesList">
        <img :src="imgFileUrl+item.classPic" style="height:172px;" />
        <div class="color" :style="carSeriesList[index].seriesFinaceList.length==0?'bottom:4.63rem':'bottom:5.3rem'">
          <div class="color-center" v-if="carSeriesList[index].colorList.length>0">
          </div>
        </div>
        <div class="bg">
          <div class="type"><span>{{item.classNm}}</span><span class="font-n">指导价格{{item.carProductPriceRange}}</span></div>
          <div class="check">
            <span>{{item.parentClassNm}}<span v-if="!!item.compartmentType">/</span>{{item.compartmentType}}<span v-if="!!item.carProductKind">/</span>{{item.carProductKind}} </span>
            <span style="margin-left: 0.3rem;color: #FC8328;">售价范围{{item.carProductSalePriceRange}}</span>
          </div>
          <div class="way"><span v-for="itemD in carSeriesList[index].seriesFinaceList">{{itemD}}</span></div>
        </div>
        <router-link :to="{ name:'carplan', params: {seriesId: item.id,seriesName: item.classNm} }">
          <mt-button @click="toCarType(item.id,item.classNm)" type="primary" size="large">查看买车方案</mt-button>
        </router-link>
      </li>
      <div class="line-f">&nbsp;</div>
    </div>
  </div>
</template>
<script>
import * as homeApi from '../../api/home-api'
import { imgFileUrl } from '../../apiconfig/index'
import { Toast } from 'vant'
export default {
  name: 'purchasingplan',
  data() {
    return {
      imgFileUrl: imgFileUrl,
      showAll: false,
      carSeriesList: [],
      page: {
        pageNumber: 1,
        pageSize: 1000000
      }
    }
  },
  computed: {
  },
  created() {
    this.getCarSeriesList()
  },
  methods: {
    getCarSeriesList() {
      let data = {
        pageNumber: this.page.pageNumber,
        pageSize: this.page.pageSize
      }
      homeApi.selectCarSeriesPage(data).then(res => {
        if (res.data.code == 200) {
          this.carSeriesList = res.data.page.list
          console.log(res.data.page.list,'112')
        } else {
          Toast(res.data.msg)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    toCarType(id,name){
      localStorage.setItem('seriesId',id);
      localStorage.setItem('seriesName',name);
      this.$router.push({path:'/info',name:'carplan'})
    }
  }
}
</script>

<style scoped lang="less">
  @import "~styles/index.less";
  @import "~styles/variable.less";
  .purchasing {
    height: auto;
    background: #fff;
    /*font-size: @body-font-size !important;*/
    .fs(30);
    > h4 {
      color: #FF6300;
      font-weight: 700;
      text-align: left;
      .pl(30);
      .pr(30);
      .pt(20);
      .pb(20);
      .fs(35);
    }
    .purchasing-list {
      width: 100%;
      .text{
        color:#999;
        .fs(26);
        .pt(20);
        .pb(20);
      }
      .line-f{
        .h(20);
        background-color:#f5f5f5;
      }
      li {
        width: 100%;
        height: auto;
        position: relative;
        .pl(30);
        .pr(30);
        .pb(45);
        .mint-button{
          height: 1.2rem;
          margin-bottom: 0.2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #F47442;
          .fs(30);
          border-radius:0px 0px 4px 4px;
        }
        .check{
          width: 100%;
          display: flex;
          justify-content: space-between;
          padding-left: 0.4rem;
          padding-right: 0.3rem;
          .pb(10);
          flex-wrap: wrap;
          div:nth-child(1){
            .mr(90)
          }
        }
        .way{
          width: 100%;
          display: flex;
          justify-content: flex-start;
          padding-left: 0.5rem;
          .mt(10);
          padding-bottom: 0.42rem;
          .fs(26);
          span{
            display: inline-block;
            padding:0.08rem;
            border-radius:2px;
            border: 1px solid #FC904C;
            color: #FC904C;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          span:nth-child(2){
            .mr(10);
            .ml(10);
          }
        }
        img {
          width: 100%;
          height: 100%;
          border-radius: 4px 4px 0px 0px;
          dispaly:block;
          vertical-align:top;
        }
        .bg{
          background-color:#f5f5f5;
        }
        .color{
          position: absolute;
          bottom: 5.3rem;
          left:50%;
          width:100%;
          .color-center{
            position: relative;
            left: -50%;
            span {
              width: 0.6rem;
              height: 0.6rem;
              display: inline-block;
              border-radius: 2px;
              .mr(10);
            }
            span:last-child {
              .mr(0);
            }
          }

        }
        .type{
          width: 100%;
          display: flex;
          justify-content: space-between;
          padding-left: 0.4rem;
          padding-right: 0.3rem;
          padding-bottom: 0.16rem;
          .pt(30);
          span{
            font-size: 0.45rem;
            font-weight: 600;
          }
          span:nth-child(2){
            color: #FE5330;
            font-weight: 500;
            font-size: 0.4rem;
          }

        }
      }
      li:last-child{
        .pb(30);
      }
    }
  }
</style>
