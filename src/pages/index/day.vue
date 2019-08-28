<template>
  <div class="my-box">
    <div class="my-header">
        <div class="header-dis">
          <li></li>
          <li>个人中心</li>
          <li >
            <img src="../../assets/image/set.png" alt="" @click="layout(photourl)">
          </li>
        </div>
        <div class="header-img">
          <li>
            <img  :src="!!photourl?imgFileUrl+photourl:''" alt="" @click="layout(photourl)">
            <span v-if="getLoginStatus()=='1'" @click="login">未登录</span>
            <span v-if="getLoginStatus()=='2'">游客</span>
            <span v-if="getLoginStatus()=='3'">{{realName}}</span>
          </li>
          <li>
            <p v-if="this.isLoginshow==null||this.isLoginshow==undefined">0.00</p>
            <p v-else v-for="item in infolist">{{item.balance}}</p>
            <p>余额</p>
          </li>
          <li>
            <p v-if="this.isLoginshow==null||this.isLoginshow==undefined">0.00</p>
            <p v-else v-for="item in infolist">{{item.accumPoints}}</p>
            <p>积分</p>
          </li>
        </div>
        <div class="header-position">
          <li @click="car">
            <img src="../../assets/image/my-car.png" alt="">
            <div>

              <span v-if="this.isLoginshow==null||this.isLoginshow==undefined">0</span>
              <span v-for="item in infolist" v-else>{{item.carCount}}</span>
              <span>车辆</span>
            </div>
          </li>
          <li>
            <img src="../../assets/image/my-card.png" alt="">
            <div>
              <span  v-if="this.isLoginshow==null||this.isLoginshow==undefined">0</span>
              <span v-for="item in infolist">{{item.cardCount}}</span>
              <span>银行卡</span>
            </div>
          </li>
          <li>
            <img src="../../assets/image/my-lorrn.png" alt="">
            <div>
              <span v-if="this.isLoginshow==null||this.isLoginshow==undefined">0</span>
              <span v-for="item in infolist">{{item.loanCount}}</span>
              <span>贷款</span>
            </div>
          </li>
        </div>
        <div class="my-order">
          <div class="top">
            <h4>我的订单</h4>
            <li @click="orderlist">
              查看全部
              <img src="../../assets/image/more.png" alt="">
            </li>
          </div>
          <div class="bottom">
            <!--<div class="order-list">-->
              <li @click="obligation">
                <img src="../../assets/image/order-list1.jpg" alt="">
                <span>待付款</span>
              </li>
              <li @click="forcar">
                <img src="../../assets/image/order-list2.jpg" alt="">
                <span>备车中</span>
              </li>
              <li @click="checkcar">
                <img src="../../assets/image/order-list3.jpg" alt="">
                <span>线下验车</span>
              </li>
              <li @click="cancel">
                <img src="../../assets/image/order-list4.jpg" alt="">
                <span>已取消</span>
              </li>
              <li @click="drawback">
                <img src="../../assets/image/order-list5.jpg" alt="">
                <span>申请退款</span>
              </li>
            <!--</div>-->
          </div>
        </div>
        <div class="service">
        <div class="top">
          <h4>功能服务</h4>
        </div>
        <div class="bottom">
          <!--<div class="order-list">-->
          <li @click="shopcar">
            <img src="../../assets/image/l1.png" alt="">
            <span>购物车</span>
          </li>
          <li @click="favorite" >
            <img src="../../assets/image/l2.png" alt="">
            <span>收藏夹</span>
          </li>
          <router-link to="/shopcar" tag="li">
            <img src="../../assets/image/l3.png" alt="">
            <span>车型对比</span>
          </router-link>
          <li @click="integral">
            <img src="../../assets/image/l4.png" alt="">
            <span>积分管理</span>
          </li>
          <li  @click="loan">
            <img src="../../assets/image/l5.png" alt="">
            <span>贷款信息</span>
          </li>
          <li  @click="members">
            <img src="../../assets/image/l6.png" alt="">
            <span>会员管理</span>
          </li>
          <li @click="message">
            <img src="../../assets/image/l7.png" alt="">
            <span>消息提醒</span>
          </li>
          <li>
            <img src="../../assets/image/l8.png" alt="">
            <span>客服中心</span>
          </li>
          <!--<router-link to="/day/realname" tag="li">-->
          <li @click="rename">
            <img src="../../assets/image/l9.png" alt="">
            <span>实名认证</span>
          </li>
          <!--</router-link>-->
          <li @click="set">
            <img src="../../assets/image/l10.png" alt="">
            <span>设置中心</span>
          </li>
          <li @click="about">
            <img src="../../assets/image/l11.png" alt="">
            <span>关于我们</span>
          </li>
          <!--</div>-->
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import {mapMutations, mapGetters, mapState} from 'vuex'
import commonHeader from 'common/common-header'
import * as homeApi from '../../api/home-api'
import { imgFileUrl } from '../../apiconfig/index'
import { Dialog, Toast } from 'vant'
export default {
  data () {
    return {
      num: 0,
      card:localStorage.getItem('isAuth'),
      isLoginshow:localStorage.getItem('username'),
      infolist:[],
      realName:localStorage.getItem('realName'),
      isAuth:localStorage.getItem('isAuth'),
      imgFileUrl:imgFileUrl,
      photourl:''
    }
  },
  created() {
    this.getLoginStatus()
  },
  mounted() {
    if (localStorage.getItem('username')!=null||localStorage.getItem('username')!=undefined) {
      this.getinfolist()
    }
  },
  methods: {
    orderlist(){
      if(!!localStorage.getItem('username')){
        this.$router.push({name:'orderlist',params:{active:0}})
        this.getinfolist()
      }else if(localStorage.getItem('username')==''||localStorage.getItem('username')==null||localStorage.getItem('username')==undefined){
        Toast('您还未登录')
      }
    },
    // 扫一扫
    scan(){
      cordova.plugins.barcodeScanner.scan(
        function (result) {
          alert("We got a barcode\n" +
            "Result: " + result.text + "\n" +
            "Format: " + result.format + "\n" +
            "Cancelled: " + result.cancelled)
        },
        function (error) {
          alert(error)
        }
      )
      // #endif
    },
    // 积分管理
    integral(){
      Toast('敬请期待')
    },
    loan(){
      Toast('敬请期待')
    },
    members(){
      Toast('敬请期待')
    },
    getLoginStatus(){ // 1 未登录 2 游客 3 姓名
      let status=''
      if(!!localStorage.getItem('username')){
        if(!!localStorage.getItem('isAuth')&&localStorage.getItem('isAuth')=='1'){
          status='2'
        }else if(!!localStorage.getItem('isAuth')&&localStorage.getItem('isAuth')=='2'){
          status='3'
        } else{ //异常
          status='1'
        }
      } else {
        status='1'
      }
      return status
    },
    set(url){
      this.$router.push({path: '/index/out',})
    },
    // 待付款
    obligation(){
      if(this.checkLogin()){
        Toast('您还未登录')
        return
      }
        this.$router.push({name:'orderlist',params:{active:1}})
        this.getinfolist()

    },
    // 备车中
    forcar(){
      if(this.checkLogin()){
        Toast('您还未登录')
        return
      }
        this.$router.push({name:'orderlist',params:{active:2}})
        this.getinfolist()


    },
    // 线下验车
    checkcar(){
      if(this.checkLogin()){
        Toast('您还未登录')
        return
      }
      this.$router.push({name:'orderlist',params:{active:3}})
      this.getinfolist()
    },
    checkLogin(){
      let isLogin=false
      if(localStorage.getItem('username')==''||localStorage.getItem('username')==null||localStorage.getItem('username')==undefined){
        isLogin=true
      }
      return isLogin
    },
    // 已取消
    cancel(){
      if(this.checkLogin()){
        Toast('您还未登录')
        return
      }
        this.$router.push({name:'orderlist',params:{active:4}})
        this.getinfolist()

    },
    message(){
      // this.$router.push('/message')
      Toast('敬请期待')
    },

    getinfolist() {
      let params = {}
      homeApi.getPersonInfo(params).then(res => {
        this.infolist = res.data
        for (var item in res.data.User) {
          this.photourl = res.data.User.photo
          localStorage.setItem('photourl',res.data.User.photo)
          localStorage.setItem('partnerPhone', res.data.User.partnerPhone)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    layout(url) {
      this.$router.push({path: '/index/out', name: 'out', params: {urll: url }})
    },
    car() {
      this.$router.push('/garage')
    },
    ...mapMutations({
      setNum: 'SET_NUM'
    }),
    todetail() {
      this.$router.togo('/Home/Detail')
    },
    drawback() {
      this.$router.push({name: 'orderlist', params: {active: '5'}})
    },
    favorite() {
      this.$router.push('/favorite')
    },
    shopcar() {
      this.$router.push('/shopcar')
    },
    rename() {
      if (this.checkLogin()) {
        Toast('您还未登录')
        return
      }
      this.$router.push('/day/realname')
      localStorage.setItem('isgarage', false)
    },
    login() {
      this.$router.push('/home/login')
    },
    about() {
      this.$router.push('/index/out/about')
    }
  },
  components: {
    commonHeader
  },
  computed: {
    ...mapGetters([
      'number'
    ]),
    ...mapState({
      number: state => state.home.number
    })
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "~styles/index.less";
@import "~styles/variable.less";
.my-box{
  .mb(98);
  .fs(30);
  background: #fff !important;
  height: auto;
  .my-header{
    width: 100%;
    height: 4rem;
    background: url("../../assets/image/mybanner.png") no-repeat ;
    background-size: 100%;
    position: absolute;
    color: #fff;
    /*font-size: 0.24rem !important;*/
    .header-dis{
      width: 100%;
      display: flex;
      justify-content: space-between;
      height: 1.2rem;
      align-items: center;
      padding-left: 0.5rem;
      padding-right: 0.5rem;
      img{
        width: 0.5rem;
        height: 0.5rem;
      }
    }
    .header-img{
      width: 100%;
      height: 1.54rem;
      display: flex;
      justify-content: space-around;
      align-items: center;
      padding-right: 0.5rem;
      li:nth-child(1){
        display: flex;
        /*justify-content: space-around;*/
        align-items: center;
        width: 40%;
        padding-left:0.5rem;
        /*border: 1px solid red;*/
        /*height: 100%;*/
        /*font-size: ;*/
        img{
          width: 1rem;
          height:1rem;
          border-radius: 50%;
          display: block;
          margin-right: 0.4rem;
        }
      }
      li:nth-child(2),li:nth-child(3){
        width: 30%;
        /*border: 1px solid red;*/
      }
    }
    .header-position{
      width: 90%;
      margin: 0.5rem auto;
      background: #fff;
      height: 2rem;
      border-radius: 0.2rem;
      color: #000;
      display: flex;
      justify-content: space-around;
      box-shadow: 0px 10px 5px #F3F3F3;
      li{
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 0.35rem;
        img{
          width: 0.7rem;
          height: 0.5rem;
          margin-right: 0.15rem;
        }
        div{
          display: flex;
          flex-wrap: wrap;
          span{
            display: block;
            width: 100%;
            color: #737373;
          }
        }
        /*flex-direction: column;*/
      }
      /*position: absolute;*/
      /*top: 2rem;*/
      /*left: 0;*/
    }
    .my-order{
      color: #000;
      width: 92%;
      /*height:3rem;*/
      background: #fff;
      margin: 0 auto;
      margin-bottom: 0.3rem;
      .top{
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding:0 0.3rem;
        height: 1.3rem;
        align-items: center;
        border-bottom: 0.1px solid #ccc;
        h4{
          /*font-size: 0;*/
          .fs(35);
          font-weight: 600;
        }
        li{
          .fs(25);
          color: #ccc;
          img{
            width: 0.2rem;
            height: 100%;
            /*vertical-align:middle;*/
            margin-left: 0.2rem;

          }
        }

      }
      .bottom{
          width: 100%;
          height: 2rem;
          display: flex;
          justify-content: space-between;
          color: #000;
          align-items: center;
        li{
          width: 25%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-direction: column;
          color: #6C6C6C;
          .fs(25);
          img{
            width: 0.8rem;
            height: 0.8rem;

            margin-bottom: 0.2rem;
          }
        }

      }
    }
    .service{
      width: 92%;
      margin: 0 auto;
      height: auto;
      background: #fff;
      padding-bottom: 0.2rem;
      margin-bottom: 1.5rem;
      .top{
        h4{
          width: 100%;
          font-weight: 700;
          display: flex;
          justify-content: space-between;
          padding:0 0.3rem;
          height: 1rem;
          align-items: center;

          color: #000;
        }

      }
      .bottom{
        color: #6C6C6C;
        .fs(25);
        width: 100%;
        /*height: 3rem;*/
        display: flex;
        /*justify-content: space-between;*/
        color: #000;
        align-items: center;
        flex-wrap: wrap;
        background: #fff;

        li{
          width: 25%;
          height: 1.35rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-direction: column;
          margin-top: 0.4rem;
          color: #6C6C6C;
          /*border: 1px solid red;*/
          img{
            width: 0.8rem;
            height: 0.8rem;
            /*border: 1px solid red;*/
          }

        }
      }
      /*display: flex;*/
    }
  }
}
</style>
