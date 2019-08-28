<template>
  <div class="content-box">
    <common-header :tittle="tittle" :showleft="true" :showright="true" :routerLeft="routerLeft" :carProductCd="seriesId"></common-header>
    <div class="page-content">
      <div class="input-box">
        <span class="icon"></span>
        <input type="text" class="search" placeholder="搜索你想要的内容">
      </div>
      <mt-navbar v-model="selected">
        <mt-tab-item v-for="item in tabList" :id="item.id"><span style="font-size:16px">{{ item.name}}</span></mt-tab-item>
      </mt-navbar>
      <mt-tab-container v-model="selected">
        <mt-tab-container-item v-for="(item,index) in tabList" :id="item.id">
          <div v-if="tabList[index].valueList.length!=0" class="content-tab" v-for="itemV in tabList[index].valueList">
              <div class="content-bg" @click="detailInfo(itemV.carProductCd)">
                <p :style="itemV.onSale=='1'?'color:#333;':'color:#999;'" >
                  <span style="font-weight: 800">{{itemV.carProductStyle}}&nbsp;{{itemV.carProductVer}}
                    <span v-if="itemV.carProductKind=='1'?true:false" style="font-weight: 800">电动</span>
                    <span v-if="itemV.carProductKind=='2'?true:false" style="font-weight: 800">燃油</span>
                  </span>
                  <span v-if="itemV.onSale=='1'?true:false" style="color:#2fd26c;">在售</span>
                  <span v-if="itemV.onSale=='0'?true:false" style="color:#999999">停产</span>
                </p>
                <p :style="itemV.onSale=='1'?'color:#666;':'color:#999;'" v-if="itemV.carProductKind=='1'"><span>容量：&nbsp;{{itemV.carPowerBatkwh}}kWh </span><span>续航里程：&nbsp;{{itemV.carPowerMaxKm}}km</span></p>
                <p :style="itemV.onSale=='1'?'color:#666;':'color:#999;'" v-if="itemV.carProductKind=='2'"><span>排量：&nbsp;{{itemV.carPowerSvolume}}L</span><span>环保标准：&nbsp;{{itemV.carPowerEp}}</span></p>
                <p :style="itemV.onSale=='1'?'color:#666;':'color:#999;'">
                  <span>{{itemV.carProductKeep}}</span>
                  <span>销售价格：&nbsp;<i :style="itemV.onSale=='1'?'color:#ff4014':'color:#999;'">{{itemV.carProductPrice}}</i></span>
                </p>
              </div>
            <!--</router-link>-->
          </div>
          <div v-if="tabList[index].valueList.length==0" class="content-tab" >
            <div class="nullTip">
              <img src="../assets/image/tipNull.png">
              <div>暂无数据</div>
            </div>
          </div>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
  </div>
</template>
<script>
import commonHeader from 'common/common-header'
import * as homeApi from '../api/home-api'
import { Toast } from 'vant'
export default {
  data() {
    return {
      tittle: '',
      routerLeft: '/home/Detail',
      data: 0,
      selected: 1,
      value: '',
      infoid: '',
      // carProductCd:'',
      result: [
        {
          title: '',
          value: ''
        }
      ],
      tabList: [],
      seriesId: localStorage.getItem('seriesId')
    }
  },
  components: {
    commonHeader
  },
  computed: {
    newdata: function() {
      return this.data + 1
    }
  },
  beforeRouteEnter (to, from, next) {
    next()
  },
  beforeRouteLeave (to, from, next) {
    // 设置下一个路由的 meta
    to.meta.keepAlive = false // B 跳转到 A 时，让 A 缓存，即不刷新
    next()
  },
  mounted() {

    this.tittle = localStorage.getItem('seriesName')
    this.seriesId = localStorage.getItem('seriesId')
    let data = {
      seriesId: this.seriesId
    }
    homeApi.motorcycle(data).then(res => {
      if (res.data.code === '200') {
        this.tabList = res.data.list
      } else {
        Toast(res.data.msg)
      }
    }).catch(err => {
      console.log(err)
    })
  },
  activated() {
    this.tittle = localStorage.getItem('seriesName')
    this.seriesId = localStorage.getItem('seriesId')
    let data = {
      seriesId: this.seriesId
    }
    homeApi.motorcycle(data).then(res => {
      if (res.data.code === '200') {
        this.tabList = res.data.list
      } else {
        Toast(res.data.msg)
      }
    }).catch(err => {
      console.log(err)
    })
  },
  methods: {
    tohome() {
      this.$router.push('/')
    },
    add() {
      this.data++
    },
    detailInfo(id) {
      localStorage.setItem('carProductCd', id)
      localStorage.removeItem('Changecolor')
      localStorage.removeItem('payment')
      localStorage.removeItem('financeService')
      localStorage.removeItem('partnerNm')
      this.$router.push({path: '/orderinfodetail', name: 'orderinfodetail', params: { carProductCd: id, comeFrom: 'parent' }})
    }
  }
}
</script>
<style scoped lang="less">
  @import "~styles/index.less";
  @import "~styles/variable.less";
    .header-box {
      position: relative !important;
      color: #333 !important;
    }
    .content-tab{
      .margin(30,30);
      background-color:#fff;
      .padding(30,30);
      text-align:left;
      border-radius:5px;
      .nullTip{
        background-color:#fff;height:60vh;padding-top:20vh;
        text-align:center;
        img{
          width:50%;height:auto;
        }
        div{
          color:#999999;font-size:0.4rem;
          text-align:center;
        }
      }
      .content-bg{
        font-size:16px;
        align-items:center;
        height:2.1rem;
      }
      p:nth-child(2){
        width: 100%;
        display: flex;
        justify-content: space-between;
      }
      p{
        height:0.7rem;
        display:flex;
        align-items:center;
        color:#666;
        justify-content:space-between;
        i{
          font-style:normal
        }
      }
      .mint-tab-item-label a{
        color:#333!important;
      }
    }
    .input-box {
      position: relative;
      .pt(30);
      .pl(40);
      .pr(40);
      .pb(30);
      .icon {
        position: absolute;
        display: inline-block;
        .w(30);
        .h(30);
        .top(50);
        .left(60);
        background: url('../assets/image/search-f.png') no-repeat;
        background-size: cover;
      }
      .search {
        .b-radius(65);
        .lh(65);
        width: 100%;
        outline: none;
        .pl(65);
        .pr(65);
        .pt(5);
        .fs(30);
      }
    }
</style>
