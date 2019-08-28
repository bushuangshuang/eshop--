<template>
    <div class="morestores-box">
      <common-header :iskeeplive='true' :tittle="tittle" :showleft="true" :showinput="true" :showright="true" :routerLeft="routerLeft" :carProductCd="carProductCd"></common-header>
      <div class="morestores-list">
        <mt-navbar v-model="selected"> <!--1综合排序 2距离 3价格 4销量-->
          <mt-tab-item id="1"><span @click="tabChange('1')">综合排序</span></mt-tab-item>
          <mt-tab-item id="2"><span @click="tabChange('4')">销量排行</span></mt-tab-item>
          <mt-tab-item id="3"> <span @click="tabChange('2')">离我最近</span></mt-tab-item>
        </mt-navbar>
        <!-- tab-container -->
        <mt-tab-container v-model="selected">
          <mt-tab-container-item id="1">
            <div class="content-tab">
              <li v-for="item in stores1List">
                <div class="top" @click="toSelectStore(item.partnerId,item.partnerNm,item.partnerLinkPhone)">
                  <div class="top-left">
                    <img :src="imgFileUrl+item.partnerPic" alt="">
                  </div>
                  <div class="top-right">
                    <h5>{{item.partnerNmStr}}</h5>
                    <p>{{item.partnerAddressStr}}</p>
                    <p>
                      <span><van-icon name="location" color="#999" size="0.45rem" tag="i" />{{item.distanceStr}}&nbsp;&nbsp;&nbsp;售{{item.saleAreaStr}}</span>
                      <span>已售{{item.saleNum}}辆</span>
                    </p>
                  </div>
                </div>
                <div class="bottom" @click="phone(item.partnerLinkPhone)">
                    <p>咨询电话{{item.partnerLinkPhone}}</p>
                </div>
              </li>
            </div>
            <div class="footer">
              <p>共{{stores1List.length}}家门店<!--<van-icon :name="isShow?'arrow-down':'arrow-up'" />--></p>
            </div>
          </mt-tab-container-item>
          <mt-tab-container-item id="2">
            <div class="content-tab">
              <li v-for="item in stores2List" >
                <div class="top" @click="toSelectStore(item.partnerId,item.partnerNm,item.partnerLinkPhone)">
                  <div class="top-left">
                    <img :src="imgFileUrl+item.partnerPic" alt="">
                  </div>
                  <div class="top-right">
                    <h5>{{item.partnerNmStr}}</h5>
                    <p>{{item.partnerAddressStr}}</p>
                    <p>
                      <span><van-icon name="location" color="#999" size="0.45rem" tag="i" />{{item.distanceStr}}&nbsp;&nbsp;&nbsp;售{{item.saleAreaStr}}</span>
                      <span>已售{{item.saleNum}}辆</span>
                    </p>
                  </div>
                </div>
                <div class="bottom" @click="phone(item.partnerLinkPhone)">
                  <p>咨询电话{{item.partnerLinkPhone}}</p>
                </div>
              </li>
            </div>
            <div class="footer">
              <p>共{{stores2List.length}}家门店<!--<van-icon :name="isShow?'arrow-down':'arrow-up'" />--></p>
            </div>
          </mt-tab-container-item>
          <mt-tab-container-item id="3">
            <div class="content-tab">
              <li v-for="item in stores3List" >
                <div class="top" @click="toSelectStore(item.partnerId,item.partnerNm,item.partnerLinkPhone)">
                  <div class="top-left">
                    <img :src="imgFileUrl+item.partnerPic" alt="">
                  </div>
                  <div class="top-right">
                    <h5>{{item.partnerNmStr}}</h5>
                    <p>{{item.partnerAddressStr}}</p>
                    <p>
                      <span><van-icon name="location" color="#999" size="0.45rem" tag="i" />{{item.distanceStr}}&nbsp;&nbsp;&nbsp;售{{item.saleAreaStr}}</span>
                      <span>已售{{item.saleNum}}辆</span>
                    </p>
                  </div>
                </div>
                <div class="bottom" @click="phone(item.partnerLinkPhone)">
                  <p>咨询电话{{item.partnerLinkPhone}}</p>
                </div>
              </li>
            </div>
            <div class="footer">
              <p>共{{stores3List.length}}家门店<!--<van-icon :name="isShow?'arrow-down':'arrow-up'" />--></p>
            </div>
          </mt-tab-container-item>
        </mt-tab-container>
      </div>
    </div>
</template>

<script>
import * as homeApi from '../../api/home-api'
import { imgFileUrl } from '../../apiconfig/index'
import { Toast } from 'vant'
import commonHeader from 'common/common-header'
export default {
  name: 'morestores',
  components: {
    commonHeader
  },
  data() {
    return {
      tittle: '',
      routerLeft: '/orderinfodetail',
      imgFileUrl: imgFileUrl,
      selected: '1',
      storeName: '',
      isShow: true,
      page: {
        pageNumber: 1,
        pageSize: 10
      },
      carProductCd: '',
      stores1List: [],
      stores2List: [],
      stores3List: [],
      ruleForm: {
        name: '',
        phone: '',
        addr: '',
        long: '',
        lat: '',
        start_work_time: '',
        end_work_time: ''
      },
      lng: '',
      lat: ''
    }
  },
  mounted() {
    this.carProductCd = this.$route.params.carProductCd
    let lngLat = localStorage.getItem('lnglat')
    if (!!lngLat) {
      let arr = lngLat.split(',')
      this.lng = arr[0]
      this.lat = arr[1]
    }
    let data = {
      pageNumber: 1,
      pageSize: 10,
      longitude: !!this.lng?this.lng:'0',
      latitude: !!this.lat?this.lat:'0',
      type: '1',
      carId: this.$route.params.carProductCd,
      storeName: this.storeName
    }
    homeApi.getAllDealersByCarId(data).then(res => {
      if (res.data.code === '200') {
        this.stores1List = res.data.page.list
        this.stores1List.forEach(item => {
          item.partnerNmStr = this.getStr10(item.partnerNm)
          item.partnerAddressStr = this.getStr10(item.partnerAddress)
          item.distanceStr = this.getDistance(item.distance)
          item.saleAreaStr = this.getStr3(item.saleArea)
        })
      } else {
        Toast(res.data.msg)
      }
    }).catch(err => {
      console.log(err)
    })
  },
  methods: {
    getStr10(value) {
      let str = value
      if (value !== undefined && value !== null && value !== '') {
        if (value.length > 13) {
          str = value.substring(0, 12) + '...'
        }
      }
      return str
    },
    getStr3(value) {
      let str = value
      if (value !== undefined && value !== null && value !== '') {
        if (value.length > 4) {
          str = value.substring(0, 3) + '...'
        }
      }
      return str
    },
    getDistance (value) {
      let distance = value
      if (!!value) {
        let valueStr = value.toString()
        let isDot = valueStr.indexOf('.') !== -1
        let valueNum = isDot ? parseInt(valueStr.substring(0, valueStr.indexOf('.'))) : value
        if (valueNum < 1) {
          distance = (Number(valueNum) * 1000) + 'm'
        } else {
          distance = (isDot ? Number(valueNum).toFixed(1) : value) + 'km'
        }
      }
      return distance
    },
    showInfoClick() {
      console.log('ss')
    },
    phone(tel) {
      window.location.href = 'tel:' + tel
    },
    tabChange(name) {  // 1综合排序 2距离 3价格 4销量
      if (name === '1') {
        this.getStore1List()
      } else if (name === '4') {
        this.getStore2List()
      } else if (name === '2') {
        this.getStore3List()
      }
    },
    getStore1List() {
      // 1综合排序 2离我最近 3价格最低
      let data = {
        pageNumber: 1,
        pageSize: 10,
        longitude: !!this.lng?this.lng:'0',
        latitude: !!this.lat?this.lat:'0',
        type: '1',
        carId: localStorage.getItem('carProductCd'),
        storeName: this.storeName
      }
      homeApi.getAllDealersByCarId(data).then(res => {
        if (res.data.code === '200') {
          this.stores1List = res.data.page.list
          this.stores1List.forEach(item => {
            item.partnerNmStr = this.getStr10(item.partnerNm)
            item.partnerAddressStr = this.getStr10(item.partnerAddress)
            item.distanceStr = this.getDistance(item.distance)
            item.saleAreaStr = this.getStr3(item.saleArea)
          })
        } else {
          Toast(res.data.msg)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getStore2List() {
      let data = {
        pageNumber: 1,
        pageSize: 10,
        longitude: !!this.lng?this.lng:'0',
        latitude: !!this.lat?this.lat:'0',
        type: '4',
        carId: localStorage.getItem('carProductCd'),
        storeName: this.storeName
      }
      homeApi.getAllDealersByCarId(data).then(res => {
        if (res.data.code === '200') {
          this.stores2List = res.data.page.list
          this.stores2List.forEach(item => {
            item.partnerNmStr = this.getStr10(item.partnerNm)
            item.partnerAddressStr = this.getStr10(item.partnerAddress)
            item.distanceStr = this.getDistance(item.distance)
            item.saleAreaStr = this.getStr3(item.saleArea)
          })
        } else {
          Toast(res.data.msg)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getStore3List() {
      let data = {
        pageNumber: 1,
        pageSize: 10,
        longitude: !!this.lng?this.lng:'0',
        latitude: !!this.lat?this.lat:'0',
        type: '2',
        carId: localStorage.getItem('carProductCd'),
        storeName: this.storeName
      }
      homeApi.getAllDealersByCarId(data).then(res => {
        if (res.data.code === '200') {
          this.stores3List = res.data.page.list
          this.stores3List.forEach(item => {
            item.partnerNmStr = this.getStr10(item.partnerNm)
            item.partnerAddressStr = this.getStr10(item.partnerAddress)
            item.distanceStr = this.getDistance(item.distance)
            item.saleAreaStr = this.getStr3(item.saleArea)
          })
        } else {
          Toast(res.data.msg)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    toNews() {
      this.$router.push('/message')
    },
    toSelectStore(partnerId, partnerNm, partnerLinkPhone) {
      isFresh:true
      localStorage.setItem('partnerId', partnerId)
      localStorage.setItem('partnerNm', partnerNm)
      localStorage.setItem('partnerLinkPhone', partnerLinkPhone)
      this.$router.push({path: '/orderinfodetail', name: 'orderinfodetail', params: {carProductCd: this.carProductCd, comeFrom: 'children'}})
    }
  }
}
</script>

<style scoped lang="less">
  @import "~styles/index.less";
  @import "~styles/variable.less";
  .morestores-box{
    width: 100%;
    .morestores-list{
      width: 100%;
      height: auto;
      .fs(30);
      .mint-tab-item-label{
        span{
          .fs(30)
        }
      }
      .content-tab{
        .pt(20);
        .pl(30);
        .pr(30);
        margin-top:3px;
        background-color: #f5f5f5;
        li{
          .mb(20);
          background: #fff;
          border-radius: 5px;
          .top {
            width: 100%;
            display: flex;
            justify-content: flex-start;
            text-align: left;
            align-items: center;
            border-bottom: 1px solid #dedede;
            .pt(25);
            .pl(25);
            .pr(25);
            .pb(17);
            .top-right{
              width:100%;
              .pl(20);
              h5{
                .fs(35);
                color:#000;
              }
              p{
                color: #999999;
                height:0.75rem;
                line-height: 0.75rem;
                position: relative;
              }
              p:last-child{
                width: 100%;
                display: flex;
                justify-content: space-between;
                span:last-child{
                  color: #FF512B;
                }
              }
            }
            .top-left{
              img{
                width: 2rem;
                height: 2rem;
                border-radius: 0.2rem;
              }

            }
          }
          .bottom{
            height: 1.3rem;
            color: #000;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
      }
      .footer{
        /*background-color:#fff;*/
        height:1.8rem;
        p{
          .pb(20);
          background-color:#f5f5f5;
          i{
            vertical-align: middle;
          }
        }
      }
    }
  }
</style>
