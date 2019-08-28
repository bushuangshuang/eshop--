<template>
  <div>
    <div v-if="isrealName==2">实名认证成功</div>
    <div v-if="isrealName==1">实名认证失败</div>
    <div v-if="garagelist.length==0 && isAuth==1" class="garage-relname">
      <common-header :tittle="title1" :showleft="false" :routerLeft="routerLeft"></common-header>
      <div class="garage-relname-content">
        <img src="../../assets/image/identification.png" alt="">
        <p>为了保证您的账号安全</p>
        <p>请通过实名认证</p>
        <button @click="realname">立即认证</button>
      </div>
    </div>
    <div v-if="garagelist.length==0 && isAuth==2" class="garage-relname">
      <common-header tittle="车库" :showleft="false" :routerLeft="routerLeft"></common-header>
      <div class="garage-relname-content">
        <img src="../../assets/image/carNull.png" alt="">
        <p>暂无车辆&nbsp;<router-link to="/home/Detail" tag="span">立即添加</router-link></p>
      </div>
    </div>
    <div v-if="this.garagelist.length!=0" class="garage-box">
      <common-header :tittle="'欢迎你，' + userName +'车主'" :showleft="false" :showright="true"></common-header>
      <div class="swiper-container" id="investproSwiper">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item,index) in garagelist">
            <div class="investpro newhand_slide" >
              <img :src="!!item.myCarPic?imgFileUrl+item.myCarPic:''" :value="index" alt="">
            </div>
          </div>
        </div>
      </div>
      <div v-if="this.carProductKind=='1'" class="garage-dispose">
        <li>
          <div class="title">
            <span>{{form.classNm}}&nbsp;&nbsp;{{form.carProductNm}}</span>
            <span @click="friend">好友推荐</span>
          </div>
          <div class="adress">
            <span>驱动电机编号</span>
            <span >{{formTBox.driveMotorData_num}}</span>
          </div>
          <div class="engine">
            <span>车架号</span>
            <span>{{form.vin}}</span>
          </div>
          <!--<div class="ljnmdv">-->
            <!--<span>车架号</span>-->
            <!--<span>{{form.vin}}</span>-->
          <!--</div>-->
          <div class="status">
            <span>车辆状态</span>
            <!--<span class="statusActive">充电中100%</span>-->
            <span v-if="formTBox.carStatus=='1'">
              <img src="../../assets/image/caring.png" />行驶中
            </span>
            <span v-else-if="formTBox.carStatus==2">
              <img src="../../assets/image/stopCar.png" />停车
            </span>
          </div>
          <div class="starttime">
            <span>
              充电状态&nbsp;&nbsp;
              <!--<img src="../../assets/image/battery.png" />-->
              <div class="chargeStatusTxt">
                <span>{{formTBox.chargeStatus==='1'?'停车充电':formTBox.chargeStatus==='2'?'行车充电':formTBox.chargeStatus==='3'?'未充电':formTBox.chargeStatus==='4'?'充电完成':''}}
                </span>
              </div>
             </span>
            <span>
              剩余电量&nbsp;&nbsp;<span class="chargeStatusC">{{formTBox.soc}}%</span>
            </span>
          </div>
          <!--<div class="endtime">-->
            <!--<span>预计结束时间</span>-->
            <!--<span>2019-01-01 11:30:40</span>-->
          <!--</div>-->
          <div class="more" @click="more(form.vin)">详细信息</div>
        </li>
      </div>
      <div v-if="this.carProductKind=='2'" class="garage-dispose">
        <li>
          <div class="title">
            <span>{{form.classNm}}&nbsp;&nbsp;{{form.carProductNm}}</span>
            <span @click="friend()">好友推荐</span>
          </div>
          <div class="adress">
            <span>发动机号</span>
            <span>暂无</span>
          </div>
          <div class="engine">
            <span>车架号</span>
            <span>暂无</span>
          </div>
          <div class="ljnmdv">
            <span>车辆状态</span>
            <span>暂无</span>
          </div>
          <div class="status">
            <span>燃油标号</span>
            <span>暂无</span>
          </div>
          <div class="starttime">
            <span>环保标注</span>
            <span>暂无</span>
          </div>
          <div class="more" @click="more">
            详细信息
          </div>
        </li>
      </div>
      <div class="garage-mileage" v-if="this.carProductKind=='1'">
        <li>
          <p>{{formTBox.remainedPowerMile}}</p>
          <p>续航里程</p>
        </li>
        <li>
          <p>{{formTBox.averageEnergyConsumption}}</p>
          <p>平均耗电量</p>
        </li>
        <li>
          <p>{{formTBox.totalOdometer}}</p>
          <p>累计里程</p>
        </li>
      </div>
      <div class="garage-mileage" v-if="this.carProductKind=='2'">
        <li>
          <p>暂无</p>
          <p>当前行驶里程</p>
        </li>
        <li>
          <p>暂无</p>
          <p>平均功耗</p>
        </li>
        <li>
          <p>暂无</p>
          <p>累计里程</p>
        </li>
      </div>
      <div class="garage-icon">
        <li @click="maintenance">
          <img src="../../assets/image/maintenance.png" alt="" >
          <p>保养记录</p>
        </li>
        <li>
          <img src="../../assets/image/bx.png" alt="">
          <p>维修记录</p>
        </li>
        <li>
          <img src="../../assets/image/cl.png" alt="">
          <p>车辆报告</p>
        </li>
        <li>
          <img src="../../assets/image/cdz.png" alt="">
          <p>找充电桩</p>
        </li>
        <li>
          <img src="../../assets/image/bx.png" alt="">
          <p>保险信息</p>
        </li>
        <li>
          <img src="../../assets/image/pj.png" alt="">
          <p>购置配件</p>
        </li>
        <li>
          <img src="../../assets/image/weizhang.png" alt="">
          <p>违章信息</p>
        </li>
        <li @click="carassess">
          <img src="../../assets/image/clpg.png" alt="">
          <p>车辆评估</p>
        </li>
      </div>
      <div></div>
      <van-dialog v-model="showFriend" show-cancel-button :before-close="beforeClose" confirm-button-text="推送" >
        <van-field v-model="username" label="姓名" placeholder="请输入姓名"  class="dialog-inp" />
        <van-field v-model="tel" type="phone" label="手机号" placeholder="请输入手机号" class="dialog-inp" />
      </van-dialog>
    </div>
  </div>
</template>

<script>
import Swiper from 'swiper'
import { Toast } from 'vant'
import * as homeApi from '../../api/home-api'
import { imgFileUrl } from '../../apiconfig/index'
import commonHeader from 'common/common-header'
export default {
  name: 'garage',
  components: {
    commonHeader
  },
  data() {
    return {
      businessId: '',
      carProductKind: '',
      title1: '立即认证',
      imgFileUrl: imgFileUrl,
      routerLeft: '/garage',
      isrealName: localStorage.getItem('realName'),
      myCarList: [],
      showFriend: false,
      username: '',
      userName: '',
      tel: '',
      form: {
        classNm: '',
        carProductNm: '',
        engineNumber: '',
        vin: '',
        socLowAlarm: '',
        carProductKind:''
      },
      formTBox: {},
      garagelist: [],
      activeIndex: 0,
      chargeStatusOption: [
        {
          value: 1,
          label: '停车充电'
        },
        {
          value: 2,
          label: '行车充电'
        },
        {
          value: 3,
          label: '未充电'
        },
        {
          value: 4,
          label: '充电完成'
        }
      ],
      isAuth: localStorage.getItem('isAuth') || ''
    }
  },
  created() {
    this.getGarageList()
  },
  mounted() {

    this.userName = (localStorage.getItem('realName') !== undefined && localStorage.getItem('realName') != null && localStorage.getItem('realName')!='')?(localStorage.getItem('realName')||''):(localStorage.getItem('username')||'')
  },
  updated() {
    let _this = this
    new Swiper('#investproSwiper', {
      slidesPerView: 'auto',
      centeredSlides: true,
      loop: false,
      initialSlide: _this.activeIndex,
      paginationClickable: false,
      fade: {
        crossFade: true
      },
      on: {
        slideChangeTransitionEnd() {
          _this.getFormData(this.activeIndex)
          _this.activeIndex = this.activeIndex
        }
      }
    })
    this.tittle = '欢迎你，' + (localStorage.getItem('realName') != undefined && localStorage.getItem('realName') != null && localStorage.getItem('realName')!='')?(localStorage.getItem('realName')||''):(localStorage.getItem('username')||'') + '车主'
  },
  methods: {
    getGarageList() {
      let params = {
        pageNumber: 1,
        pageSize: 10
      }
      homeApi.getgarage(params).then(res => {
        if (res.data.code === '200') {
          this.garagelist = res.data.page.list

          //   for(var j=0;j<this.garagelist.length;j++){
          //     this.carProductKind=this.garagelist[0].carProductKind
          // }
          if (this.garagelist.length !== 0) {
            this.getFormData(0)
          }
        } else {
          Toast(res.data.msg)
        }
      })
    },
    carassess() {
      this.$router.push('/garage/Vehicleevaluation')
    },
    realname() {
      this.$router.push('/day/realname')
    },
    maintenance() {
      this.$router.push('/maintenance')
    },
    getFormData(index) {
      this.form = this.garagelist[index]
      this.carProductKind=this.form.carProductKind
      let data = {
        vin: this.garagelist[index].vin
      }
      homeApi.queryMyTbox(data).then(res => {
        if (res.data.code === '200') {
          this.formTBox = res.data.data
        } else {
          Toast(res.data.msg)
        }
      })
    },
    more(vin) {
      localStorage.setItem('vin', vin)
      this.$router.push({path: '/garage/garagetbox', params: {vin: vin}})
    },
    back() {
      this.$router.goBack()
    },
    toNews() {
      this.$router.push('/message')
    },
    friend() {
      this.showFriend = true
    },
    beforeClose(action, done) {
      if (action === 'confirm') {
        if (!this.username || !this.tel) {
          Toast('请输入姓名或手机号')
          done(false)
          return
        } else {
          done()
        }
        if (!(/^[1][3,4,5,6,7,8][0-9]{9}$/.test(this.tel))) {
          Toast('手机号格式错误')
          done(false)
          return
        } else {
          done()
        }
        let data = {
          ofuser: this.tel,
          ofuserName: this.username,
          type: '2',
          businessId:this.form.id.toString(),
        }
        homeApi.tShoppingCart(data).then(res => {
          if (res.data.code === '200') {
            done()
            Toast('好友推荐成功')
          } else {
            done()
            Toast(res.data.msg)
          }
        }).catch(err => {
          console.log(err)
        })
      } else if (action === 'cancel') {
        this.username = ''
        this.tel = ''
        done()
      }
    },
  },
  computed: {
  }
}
</script>

<style scoped lang="less">
  @import "~styles/index.less";
  @import "~styles/variable.less";
  .garage-relname{
    width: 100%;
    height: 100vh;
    background-color: #fff;
    .fs(30);
    .garage-relname-content{
      img{
        margin-top: 3rem;
      }
      p:nth-child(2){
        margin-top: 1rem;
      }
      p{
        span{
          color: #ff7414;
          text-decoration: underline;
        }
      }
      padding: 0 0.2rem;
      button{
        width: 100%;
        height: 1rem;
        background-color: #ff7414;
        outline: none;
        border: none;
        color: #fff;
        border-radius: 0.1rem;
        margin-top: 2rem;
      }
      img{
        width: 50%;
        height: 50%;
      }
    }
  }
  .garage-box{
    width: 100%;
    height: auto;
    #investproSwiper {
      vertical-align: middle;
      .swiper-slide {
        vertical-align: middle;
        width: 5rem;
        .hrplan_slide {
          height: 3rem;
        }
        .sxm_slide {
          height: 3rem;
        }
        .investpro {
          background-size: 100% 100%;
          background-repeat: no-repeat;
          -webkit-transition: all 0.5s linear;
          img{
            width: 4.8rem;
            height: 3rem;

          }
        }
      }
      .swiper-slide-active .investpro {
        img{
          transform: scale(1.2);
        }
      }
      .swiper-slide-active .hrplan_slide {
        height: 3rem;
      }
      .swiper-slide-active .newhand_slide {
        height: 3rem;
      }
      .swiper-slide-active .sxm_slide {
        height: 3rem;
      }
    }
    .swiper-container {
      width: 100%;
      background: #fff;
      .pt(40);
      .pb(40);
      .swiper-slide{
        width: 40%;
        height: 3rem;
        margin-left: 0.3rem;
        margin-right: 0.3rem;
        img{
          width: 100%;
          height: 100%;
          border-radius: 0.2rem;
        }
      }
    }
    .garage-dispose{
      width: 100%;
      height: auto;
      background: #fff;
      line-height: 1.5rem;
      li{
        /*padding:0 0.4rem;*/
        padding: 0 0.4rem 0.05rem 0.4rem;
        .fs(30);
        position: relative;
        .more{
          .fs(28);
          color:#fff;
          height:1.1rem;
          line-height: 1.1rem;
          width: 100%;
          background-color: #ff7414;
          border-radius: 0.1rem;
          margin:0.2rem 0 0.2rem 0;
        }
        .title{
          width: 100%;
          display: flex;
          justify-content: space-between;
          height: 1rem;
          align-items: center;
          padding-top: 0.3rem;
          span:first-child{
            .fs(30);
            font-weight: 600;
          }
          span:last-child{
            color:#F68F6A;
          }
        }
        .adress,.engine,.ljnmdv,.status,.starttime,.endtime{
          width: 100%;
          display: flex;
          justify-content: space-between;
          height: 1.1rem;
          align-items: center;
          border-bottom: 1px solid #FAFAFA;
          .chargeStatusC{
            color:#F68F6A;
          }
        }
        .starttime{
          span{
            .chargeStatusTxt{
              /*position: relative;*/
              width: 2.5rem;
              height: 1.1rem;
              display: inline-block;
              background: url('../../assets/image/battery.png') no-repeat left center;
              background-size:2.5rem 0.8rem;
              text-align: center;
              vertical-align: middle;
              span{
                position: relative;
                top:-0.17rem;
                left: -0.1rem;
              }
            }
          }

        }
        .status{
          span{
            img{
              width: 0.63rem;
              height: 0.6rem;
              vertical-align: middle;
              margin-right: 0.1rem;
            }
          }
          /*.statusActive{
            border: 1px solid #F68F6A!important;
            color: #F68F6A!important;
            background-color: #ffffff!important;
          }
          span:nth-child(2){
            width: 2.5rem!important;
          }
          span:nth-child(2),span:nth-child(3),span:nth-child(4) {
            width: 2rem;
            height: 0.8rem;
            line-height: 0.8rem;
            text-align: center;
            background-color: #DEDEDE;
            color: #767676;
            border-radius: 0.1rem;
          }*/
        }
      }
    }
    .garage-mileage{
      width: 100%;
      height: 2rem;
      display: flex;
      justify-content: space-around;
      background: #fff;
      .fs(25);
      margin-top: 0.2rem;
      margin-bottom: 0.2rem;
      li{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        p:nth-child(1){
          margin-bottom: 0.2rem;
          font-weight: 600;
          .fs(27);
        }
        p:nth-child(2){
          color:#A7A7A7;
        }
      }
    }
    .garage-icon{
      width:100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      background: #fff;
      padding: 0.2rem;
      margin-bottom: 0.5rem;
      li{
        width: 25%;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        img{
          width: 0.5rem;
          height: 0.5rem;
          margin-bottom: 0.2rem;
          margin-top: 0.2rem;
        }
        p{
          color: #838383;
          margin-bottom: 0.3rem;
        }
      }
    }
    .van-dialog{
      padding-top:0.4rem;
      .fs(30);
      .dialog-inp{
        height: 1rem!important;
        line-height: 1rem;
        text-align: left;
        padding:0 0.4rem 0 0.5rem;
      }
    }
    .van-cell:not(:last-child)::after {
      left: 0.2rem;
      right: 0.2rem;
    }
  }
</style>
