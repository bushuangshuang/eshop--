<template>
  <div class="content-box">
    <index-header :showinput="true" :showback="false" :address="address" @on-select-city="choseCity"></index-header>
    <div id="iCenter"></div>
    <div class="home-content">
        <mt-swipe :auto="4000" style="height:6rem;">
        <mt-swipe-item >
          <img :src="imgFileUrl+'20190801005436718vU7iQ'" alt="">
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <div class="bay-car">
      <router-link to="/home/Detail" tag="li">
        <div>
            <img src="../../assets/image/shop.jpg"/>
        </div>
        <span>购车中心</span>
      </router-link>
<!--      <router-link to="/story" tag="li">-->
      <li @click="story">
        <div>
          <img src="../../assets/image/flow.jpg"/>
        </div>
        <span>活动专区</span>
      </li>
<!--      </router-link>-->
      <li @click="service">
            <div>
              <img src="../../assets/image/serve.jpg"/>
            </div>
            <span>服务保障</span>
      </li>
      <li @click="shopcar">
            <div>
              <img src="../../assets/image/financial.jpg"/>
            </div>
            <span>购车流程</span>
      </li>
    </div>
    <div class="purchasing" v-if="carSeriesList.length!=0?true:false"> <!--<button @click="getDeviceInfo">获取设备信息</button>-->
      <h4>轻松购车四步搞定</h4>
      <div class="purchasing-list">
        <li v-for="(item,index) in carSeriesList">
          <img :src="!!item.classPic?imgFileUrl+item.classPic:''" style="height:172px;" />
          <div class="bg">
            <div class="type">
              <span>{{item.classNm}}</span>
              <span class="font-n">指导价格{{item.carProductPriceRange}}</span>
            </div>
            <div class="check">
                <span>{{item.parentClassNm}}<span v-if="!!item.compartmentType">/</span>{{item.compartmentType}}<span v-if="!!item.carProductKind">/</span>{{item.carProductKind}} </span>
                <span style="margin-left: 0.3rem;color: #FC8328;">售价范围{{item.carProductSalePriceRange}}</span>
            </div>
            <div class="way"><span v-for="itemD in carSeriesList[index].seriesFinaceList">{{itemD}}</span></div>
          </div>
            <mt-button @click="toCarType(item.id,item.classNm)" type="primary" size="large">查看买车方案</mt-button>
        </li>
      </div>
    </div>
      <div v-if="isShow" class="area1">
        <div class="titleArea">
          <span @click="getIsOpenAddress"><van-icon name="location" />当前位置</span>
          <span @click="closeAddress">关闭</span>
        </div>
        <v-distpicker type="mobile" @selected='selected' v-show="addInp" >
        </v-distpicker>
        <div class="mask" v-show="mask"></div>
      </div>
    <common-process></common-process>
    <common-new></common-new>
  </div>
</template>

<script>
import {mapMutations, mapGetters, mapState} from 'vuex'
import commonHeader from 'common/common-header'
import commonPlan from '../purchasingPlan/purchasingplan'
import commonProcess from '../wholeProcess/wholeProcess'
import commonNew from '../new/new'
import indexHeader from 'common/index-header'
import * as homeApi from '../../api/home-api'
import { MessageBox } from 'mint-ui'
import { imgFileUrl } from '../../apiconfig/index'
import { Toast } from 'vant'
import MapLoader from '../../assets/js/map.js'
import getDeviceInfo from '../../assets/js/deviceInfo.js'

import VDistpicker from 'v-distpicker'
export default {
  components: {
    commonHeader,
    commonPlan,
    commonProcess,
    commonNew,
    indexHeader,
    VDistpicker
  },
  data () {
    return {
      city: '请选择',
      addInp: false,
      mask: false,
      imgFileUrl: imgFileUrl,
      num: 0,
      carSeriesList: [],
      page: {
        pageNumber: 1,
        pageSize: 4
      },
      address: localStorage.getItem('locationCity') || '全国',
      isShow: false,
      version: ''
    }
  },
  computed: {
    ...mapGetters([
      'number'
    ]),
    ...mapState({
      number: state => state.home.number
    })
  },
  created() {
    this.getCarSeriesList()
    !!localStorage.getItem('locationCity') ? '' : this.getAddress()
    this.UpPackage()
  },
  methods: {
    ...mapMutations({
      setNum: 'SET_NUM'
    }),
    story() {
      Toast('建设中敬请期待...')
    },
    getDeviceInfo() {
      mui.plusReady(function () {
        getDeviceInfo()
      })
    },
    UpPackage() {
      var wgtVer = null
      var type = 0
      function plusReady() {
        // 获取本地应用资源版本号
        plus.runtime.getProperty(plus.runtime.appid, function(inf) {
          wgtVer = inf.version
          if (mui.os.ios) { // 苹果手机
            if (1 != type) {
              return // 苹果手机不执行打开软件更新软件操作
            }
            mui.ajax({
              type: 'get',
              dataType: 'json',
              url: 'https://itunes.apple.com/lookup', // 获取当前上架APPStore版本信息
              data: {
                id: 1472327937 // APP唯一标识ID
              },
              contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
              success: function (data) {
                plus.nativeUI.closeWaiting()
                console.log('jsjsjsjs' + JSON.stringify(data))
                // $.each(data, function(i, norms) {
                //   $.each(norms, function(key, value) {
                //     $.each(value, function(j, normItem) {
                //       if (j=='version') {
                //         if (normItem > wgtVer) {
                //           plus.nativeUI.alert('发现新版本:V' + normItem)
                //           document.location.href = 'https://itunes.apple.com/cn/app/san-gu-hui/id1472327937?mt=8' // 上新APPStore下载地址
                //         } else {
                //           plus.nativeUI.alert('当前版本号已是最新')
                //         }
                //       }
                //     })
                //   })
                // })
                return
              }
            })
          } else if (mui.os.android) {
            checkUpdate()
          }
        })
      }
      if (window.plus) {
        plusReady()
      } else {
        document.addEventListener('plusready', plusReady, false)
      }
      // 检测更新
      var checkUrl = 'http://v.zqysjt.com:8080/apk.txt'
      function checkUpdate() {
        // plus.nativeUI.showWaiting('检测更新...')
        var xhr = new XMLHttpRequest()
        xhr.responseType = 'text'
        xhr.onreadystatechange = function() {
          switch(xhr.readyState) {
            case 4:
              plus.nativeUI.closeWaiting()
              if(xhr.status == 200) {
                var newVer = xhr.responseText.replace(/[\r\n]/g, '') // xhr.responseText
                if (wgtVer && newVer && (wgtVer < newVer)) {
                  downWgt() // 下载升级包
                } else {
                  // plus.nativeUI.alert('已是最新版本！')
                }
              } else {
                // console.log('检测更新失败！')
                // plus.nativeUI.alert('检测更新失败！')
              }
              break
            default:
              break
          }
        }
        xhr.open('GET', checkUrl, true)
        xhr.send()
      }
      // 下载wgt文件
      var wgtUrl = 'https://eshopapk.s3.cn-north-1.jdcloud-oss.com/update.wgt'
      function downWgt() {
        var cfi = confirm('检测到有新版本，是否更新软件?')
        if (cfi == true) {
          plus.nativeUI.showWaiting('正在更新软件，请稍后...')
          plus.downloader.createDownload(wgtUrl, {filename: '_doc/update/'}, function(d, status) {
            if (status == 200) {
              installWgt(d.filename) // 安装wgt包
            } else {
              plus.nativeUI.alert('下载安装包失败！')
            }
            plus.nativeUI.closeWaiting()
          }).start()
        }
      }
      function installWgt(path) {
        plus.nativeUI.showWaiting('正在安装文件，请稍后...')
        plus.runtime.install(path, {}, function() {
          plus.nativeUI.closeWaiting()
          // console.log('安装wgt文件成功！')
          plus.nativeUI.alert('应用资源更新完成！', function() {
            plus.runtime.restart()
          })
        }, function(e) {
          plus.nativeUI.closeWaiting()
          console.log('安装wgt文件失败[' + e.code + ']：' + e.message)
          plus.nativeUI.alert('安装文件失败')
        })
      }
    },
    checkUpdate() {
      let type = 0
      if (1 == type) {
        plus.nativeUI.showWaiting('检测更新...')
      }
      plus.runtime.getProperty(plus.runtime.appid, function(inf) {
        let ver = inf.version;
        if(mui.os.ios) {    //苹果手机
          if(1 != type){
            return;//苹果手机不执行打开软件更新软件操作
          }
          mui.ajax({
            type:'get',
            dataType:'json',
            url:'https://itunes.apple.com/lookup',//获取当前上架APPStore版本信息
            data: {
              id:1472327937 //APP唯一标识ID
            },
            contentType:'application/x-www-form-urlencoded;charset=UTF-8',
            success:function(data){
              plus.nativeUI.closeWaiting();
              console.log('jsjsjsjs'+json2string(data));
              $.each(data, function(i,norms) {
                $.each(norms, function(key,value) {
                  $.each(value, function(j, normItem) {
                    if(j=='version'){
                      if(normItem>ver){
                        plus.nativeUI.alert('发现新版本:V'+normItem);
                        document.location.href='https://itunes.apple.com/cn/app/san-gu-hui/id' + owner.getIOSAppID() + '?mt=8'; //上新APPStore下载地址
                      }else{
                        plus.nativeUI.alert('当前版本号已是最新');
                      }
                    }
                  });
                });
              });
              return ;
            }
          });
        }else if(mui.os.android) {
          owner.Ajax('/app/update/check', {}, function(data) {
            if(data){
              if(server.AjaxSUCCESS() == data.code){
                if(1 == type){
                  plus.nativeUI.closeWaiting();
                }
                var newVer=data.data;
                console.log(owner.getWGTVER() + "检测更新成功："+newVer.version);
                if(owner.getWGTVER()&&newVer.version&&(owner.getWGTVER() < newVer.version)){
                  owner.downWgt();  // 下载升级包
                }else{
                  console.log("type："+type);
                  if(1 == type){
                    plus.nativeUI.alert("当前版本号已是最新！");
                  }
                }
              }else{
                console.log("检测更新失败！");
                if(1 == type){
                  plus.nativeUI.alert("检测更新失败！");
                }
              }
              // 请求成功
            }else{
              //				plus.nativeUI.alert("检测更新失败！");
            }
          });
        }
      });
    },
    selected(data) {
      this.closeAddress()
      if (data.province.value === '北京市' || data.province.value === '天津市' || data.province.value === '重庆市' || data.province.value === '上海市') {
        this.city = data.province.value.substring(0, 3)
        this.address = data.province.value.substring(0, 3)
        localStorage.setItem('locationCity', data.province.value.substring(0, 3))
        localStorage.setItem('lnglat', [0, 0])
      } else {
        this.city = data.city.value.substring(0, 3)
        this.address = data.city.value.substring(0, 3)
        localStorage.setItem('locationCity', data.city.value.substring(0, 3))
        localStorage.setItem('lnglat', [0, 0])
      }
    },
    getIsOpenAddress() {
      this.closeAddress()
      this.getAddress()
    },
    closeAddress() {
      this.isShow = false
      this.mask = false
      this.addInp = false
    },
    choseCity() {
      this.isShow = true
      this.mask = true
      this.addInp = true
    },
    getAddress() {
      let that = this
      mui.plusReady(function() {
        plus.geolocation.getCurrentPosition(geoInf, function(e) {
          console.log('error==' + e.code)
          if(e.code === 10){ // http://ask.dcloud.net.cn/article/282
            var btnArray = ['取消', '设置']
            mui.confirm('定位权限未开启,请到设置->隐私->定位服务中开启。', '定位服务已关闭', btnArray, function(e) {
              if (e.index == 1) {
                if(mui.os.ios) {
                  var UIApplication = plus.ios.import('UIApplication')
                  var NSURL = plus.ios.import('NSURL')
                  var setting = NSURL.URLWithString('app-settings:')
                  var application = UIApplication.sharedApplication()
                  application.openURL(setting)
                  plus.ios.deleteObject(setting)
                  plus.ios.deleteObject(application)
                }else{
                  var main = plus.android.runtimeMainActivity()
                  var Intent = plus.android.importClass('android.content.Intent')
                  var mIntent = new Intent('android.settings.LOCATION_SOURCE_SETTINGS')
                  main.startActivity(mIntent)
                }
              } else {
                plus.nativeUI.toast('位置权限未开启,定位获取失败')
              }
            })
          }
          localStorage.setItem('lnglat', '0,0')
          // console.log(e.code + '==' + e.message)
        }, {geocode: true, provider: 'amap'})
        function geoInf (position) {
          var codns = position.coords // 获取地理坐标信息；
          var longt = codns.longitude // 获取到当前位置的经度
          var lat = codns.latitude // 获取到当前位置的纬度；
          let lnglatStr = longt + ',' + lat
          localStorage.setItem('lnglat', lnglatStr)
          if (!!position.address.city) {
            let cityStr = position.address.city.substring(0, 3)
            that.address = cityStr
            localStorage.setItem('locationCity', cityStr)
          }
        }
      })
    },
    getAddress1() {
      let that = this
      MapLoader().then(AMap => {
        var mapObj = new AMap.Map('iCenter', {
          resizeEnable: true
        })
        let lnglat = []
        // 插件
        mapObj.plugin(['AMap.Geolocation'], function () {
          var geolocation = new AMap.Geolocation({
            enableHighAccuracy: true, // 是否使用高精度定位，默认:true
            timeout: 10000, // 超过10秒后停止定位，默认：无穷大
            maximumAge: 0, // 定位结果缓存0毫秒，默认：0
            convert: true, // 自动偏移坐标，偏移后的坐标为高德坐标，默认：true
            showButton: true, // 显示定位按钮，默认：true
            buttonPosition: 'LB', // 定位按钮停靠位置，默认：'LB'，左下角
            buttonOffset: new AMap.Pixel(10, 20), // 定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            showMarker: true, // 定位成功后在定位到的位置显示点标记，默认：true
            showCircle: true, // 定位成功后用圆圈表示定位精度范围，默认：true
            panToLocation: true, // 定位成功后将定位到的位置作为地图中心点，默认：true
            zoomToAccuracy: true, // 定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            extensions: 'base'
          })
          // 使用远程定位，见 remogeo.js
          var remoGeo = new RemoGeoLocation()
          // 替换方法
          navigator.geolocation.getCurrentPosition = function() {
            return remoGeo.getCurrentPosition.apply(remoGeo, arguments)
          }
          // 替换方法
          navigator.geolocation.watchPosition = function() {
            return remoGeo.watchPosition.apply(remoGeo, arguments)
          }
          mapObj.addControl(geolocation)
          geolocation.getCurrentPosition()
          AMap.event.addListener(geolocation, 'complete', onComplete) // 返回定位信息
          AMap.event.addListener(geolocation, 'error', onError) // 返回定位出错信息
          function onComplete(obj) {
            lnglat = obj.position.lng + ',' + obj.position.lat
            localStorage.setItem('lnglat', lnglat)
            if (!!obj.addressComponent.city) {
              that.address = obj.addressComponent.city.substring(0, 3)
              localStorage.setItem('locationCity', obj.addressComponent.city.substring(0, 3))
            } else {
              that.address = obj.addressComponent.province.substring(0, 3)
              localStorage.setItem('locationCity', obj.addressComponent.province.substring(0, 3))
            }
          }
          function onError(obj) {
            Toast(obj.message + '地图加载失败')
            // console.log('地图加载失败', obj)
          }
        })
      }, e => {
        // console.log('地图加载失败', e)
      })
    },
    getCarSeriesList() {
      let data = {
        pageNumber: this.page.pageNumber,
        pageSize: this.page.pageSize
      }
      homeApi.selectCarSeriesPage(data).then(res => {
        if (res.data.code === '200') {
          this.carSeriesList = res.data.page.list
        } else {
          Toast(res.data.msg)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    toDetail() {
      this.$router.togo('/Home/Detail')
    },
    service() {
      this.$router.push('/service')
    },
    shopcar() {
      this.$router.push('/wholeprocess')
    },
    toNews() {
      MessageBox.alert('敬请期待...', '提示')
    },
    toCarType(id, name) {
      localStorage.setItem('seriesId', id)
      localStorage.setItem('seriesName', name)
      this.$router.push({path: '/info', name: 'carplan'})
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "~styles/index.less";
@import "~styles/variable.less";
li{
  list-style: none;
}
.area1{
  width: 100%;
  height: 92%;
  position:fixed;
  left: 0;
  bottom: 0;
  overflow-y: scroll;
  background-color: #ffffff;
  .titleArea {
    border-bottom: 1px solid #f6f6f6;
    padding: 8px 30px 8px 20px;
    text-align: left;
    display: flex;
    justify-content: space-between;
  }
}
.distpicker-address-wrapper .address-header ul {
  position: fixed !important;
  left: 0 !important;
  top: 0 !important;

}
.page-content{
}
.content-box{
  .fs(30);
}
.home-content{
  .mint-swipe-items-wrap{
    width: 100%;
    height: 100%;
    img{
      width: 100%;
      height: 100%;
    }
  }
}
.bay-car{
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color:#fff;
  height: 2.4rem;
  margin-bottom: 0.2rem;
  .pl(10);
  .pr(10);
  li{
    width: 25%;
    height: 2rem !important;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    span{
      .pt(10);
    }
    div{
      display: flex;
      justify-content: center;
      width: 1rem;
      height: 1rem;
      margin-bottom: 0.1rem;
      .fs(26);
      >img{
        width: 120%;
        height: 120%;
      }
    }
  }
}
.header-box{
  position: absolute;
  width: 100%;
  .h(100);
  .lh(100);
  background-color: @base-color;
  color: @base-header-color;
  .fs(@base-header-size);
  display: flex;
  z-index: 1;
  .left-icon{
    position: relative;
    flex: 1;
    img{
      width: 20%;
      height: 30%;
      vertical-align: middle;
    }
    .locationFont{
      .fs(28);
    }
    .icon-back{
      position: absolute;
      display: inline-block;
      .w(50);
      .h(50);
      .left(25);
      .top(25);
      background-image: url("../../assets/imgs/w-back.svg");
      background-size: cover;
    }
  }
  .header-tittle{
    flex: 3;
  }
  .right-icon{
    position: relative;
    flex: 1;
    img{
      width: 30%;
      vertical-align: middle;
      .mr(-50);
    }
    .icon{
      position: absolute;
      display: inline-block;
      .w(50);
      .h(50);
      .right(25);
      .top(25);
      background-image: url("../../assets/imgs/more.svg");
      background-size: cover;
    }
  }
}
.purchasing {
  height: auto;
  background: #fff;
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
        padding-left: 0.4rem;
        padding-right: 0.3rem;
        .mt(10);
        padding-bottom: 0.42rem;
        .fs(26);
        span{
          padding:0.08rem;
          border-radius:2px;
          border: 1px solid #FC904C;
          color: #FC904C;
          display: flex;
          align-items: center;
          justify-content: center;
          .mr(10);
        }
        span:last-child{
          .mr(0);
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
        background-color:#f5f5f5!important;
      }
      .color{
        position: absolute;
        bottom: 5.3rem;
        left:50%;
        /*width:100%;*/
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
          .fs(35);
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
      .pb(45);
    }
  }
}
</style>
