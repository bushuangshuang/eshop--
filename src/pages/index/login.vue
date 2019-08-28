<template>
    <div class="login-box">
      <common-header :tittle="tittle" :showleft="true" :showright="false"></common-header>
      <div class="login-content">
        <van-field v-model="phone" label="手机号" placeholder="请输入手机号"/>
          <span v-if="this.isphoneshow" class="span">{{this.phoneerr}}</span>
        <van-field v-model="verifyCode" center clearable label="验证码" placeholder="请输入短信验证码">
          <van-button slot="button" size="small" type="primary" @click="getCode" :style="codeDisabled==false?'border: 1px solid #F88F6B;background-color:#F88F6B':'background-color:#9D9D9D;border: 1px solid #9D9D9D;'">{{verifyText}}</van-button>
        </van-field>
        <van-field v-model="recommendPhone" label="推荐账号" placeholder="推荐人手机号（选填）"  />
        <div class="login-footer">
          <van-checkbox v-model="checked" checked-color="#F88F6B"></van-checkbox>
          <div class="login-agreement" @click="showUseTip()">&nbsp;我已阅读并同意<span>《用户使用协议》</span>及<span>《隐私权条款》</span></div>
        </div>
        <div class="btn">
          <mt-button type="primary" @click="login">登录</mt-button>
          <p>温馨提示：无需注册 输入手机号即可登录</p>
        </div>
      </div>
      <div class="privarcy-footer" v-if="isShowPrivarcy">
        <Button @click="closePrivarcyPage" class="footer-btn">我已阅读并同意</Button>
      </div>
    </div>
</template>

<script>
import * as homeApi from '../../api/home-api'
import {Dialog} from 'vant'
import {mapMutations, mapGetters, mapState} from 'vuex'
import { Toast } from 'vant'
import commonHeader from 'common/common-header'
export default { name: 'login',
  data() {
    return {
      tittle: '登录',
      phone: '',
      verifyCode: '',
      recommendPhone: '',
      verifyText: '获取验证码',
      codeDisabled: false,
      countdown: 60,
      timer: null,
      checked: false,
      phoneerr: '',
      isphoneshow: false,
      isShowPrivarcy: false
    }
  },
  components: {
    Dialog,
    commonHeader
  },
  methods: {
    isphone(phone) {
      this.phone = phone.replace(/\s*/g, '')
      phone = phone.replace(/\s*/g, '')
      var myreg = /^[1][3,4,5,6,7,8][0-9]{9}$/
      if (myreg.test(phone) === false) {
        this.phoneerr = '请输入正确的手机号'
        this.isphoneshow = true
      } else {
        this.isphoneshow = false
      }
    },
    back() {
      this.$router.push('/home')
    },
    login() {
      let tipErrorMsg = ''
      if (this.phone==undefined || this.phone==null || this.phone=='') {
        tipErrorMsg += '手机号不能为空  '
      }
      if (this.verifyCode==undefined || this.verifyCode==null || this.verifyCode=='') {
        tipErrorMsg += '验证码不能为空'
      }
      let myreg = /^[1][3,4,5,6,7,8][0-9]{9}$/
      if (!!this.recommendPhone && myreg.test(this.recommendPhone) === false) {
        tipErrorMsg += '请输入正确的推荐人手机号'
      }

      if (tipErrorMsg != undefined && tipErrorMsg != null && tipErrorMsg != '') {
        Toast(tipErrorMsg)
        return
      }
      if (this.checked == false) {
        Toast('请先阅读并同意《用户使用协议》及《隐私权条款》')
        return
      }
      let paramss = {
        phone: this.phone,
        verifyCode: this.verifyCode,
        recommendPhone: this.recommendPhone
      }
      homeApi.Login(paramss).then(res => {
        if (res.data.code === '200') {
          localStorage.setItem('username', res.data.list.username)
          localStorage.setItem('realName', res.data.list.realName)
          localStorage.setItem('isAuth', res.data.list.isAuth)
          localStorage.setItem('phone', this.phone)
          this.$router.goBack()
        } else {
          Toast(res.data.msg)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    resetCode () {
      clearInterval(this.timer)
      this.codeDisabled = false
      this.verifyText = '获取验证码'
      this.countdown = 60
      this.timer = null
    },
    getCode() {
      if (!this.timer) {
        if (this.phone === undefined || this.phone === null || this.phone === '') {
          Toast('手机号码不能为空')
          return
        } else {
          this.phone = this.phone.replace(/\s*/g, '')
          var myreg = /^[1][3,4,5,6,7,8][0-9]{9}$/
          if (myreg.test(this.phone) === false) {
            Toast('请输入正确的手机号')
            return
          }
        }
        this.timer = setInterval(() => {
          if (this.countdown > 0 && this.countdown <= 60) {
            this.countdown--
            if (this.countdown !== 0) {
              this.verifyText = '重新发送(' + this.countdown + ')'
              this.codeDisabled = true
            } else {
              clearInterval(this.timer)
              this.verifyText = '获取验证码'
              this.countdown = 60
              this.timer = null
              this.codeDisabled = false
            }
          }
        }, 1000)
      }
      if (this.codeDisabled==true) {
        return
      }
      let params = {
        phone: this.phone
      }
      homeApi.TestGetCode(params).then(res => {
        if (res.data.code == 200) {
          Toast('短信发送成功')
        } else {
          Toast(res.data.msg)
        }
      }).catch((res) => {
        Toast('发送失败，请重试或联系管理员！')
      })
    },
    showUseTip() {
      let that = this
      var nwaiting = plus.nativeUI.showWaiting()
      var ws = plus.webview.currentWebview() // 'http://www.yungoche.com/'
      var embed = plus.webview.create('https://www.yungoche.com/privarcy.html', 'privarcyPage', {top: '0px', bottom: '70px'})
      embed.addEventListener('loaded', function() {
        ws.append(embed)
        that.isShowPrivarcy = true
        nwaiting.close()
      }, false)
    },
    closePrivarcyPage() {
      this.checked = true
      plus.webview.close('privarcyPage')
      this.isShowPrivarcy = false
    }
  }
}
</script>

<style scoped lang="less">
  @import "~styles/index.less";
  @import "~styles/variable.less";
  .login-box{
    width: 100%;
    height: auto;
    background: #fff;
    .login-header{
      width: 100%;
      height: 1.35rem;
      border-bottom: 1px solid #F3F3F3;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #fff;
      .fs(35);
      li{
        padding-left: 0.2rem;
        padding-right: 0.2rem;
        img:nth-child(1){
          width: 0.3rem;
          height: 0.5rem;
        }
        img:nth-child(2){
          width: 0.6rem;
          height: 0.5rem;
        }
      }

    }
    .login-content{
      .padding(0,30);
      .span{

        width: 100%;
        color: red;
        margin-left: -1.5rem;
        /*text-align: center;*/
      }
      .van-field{
        text-align: left;
        .padding(0,10);
        border: none;
        line-height:45px;
        .fs(30);
      }
      li{
        text-align: left;
        width: 90%;
        margin: 0 auto;
        border-bottom: 1px solid #F5F5F5;
        span{
          display: inline-block;
          width: 2rem;
          .fs(24);
          height: 0.8rem;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 4px;
        }
      }
    }
    .btn{
      .pl(30);
      .pr(30);
      .pb(40);
      .mint-button--normal{
        width: 100% !important;
        background: #F9A88A;
      }
      p{
        margin-top:0.3rem;
        color: #9D9D9D;
      }
    }
    .login-footer{
      width: 100%;
      margin: 0.5rem auto;
      span{
        color:#F88F6B;
      }
      .van-checkbox{
        display: inline-block!important;
      }
      .login-agreement{
        display: inline;
      }
    }
    .privarcy-footer{
      position: fixed;
      bottom: 0;
      height:70px;
      width:100%;
      vertical-align: middle;
      text-align: center;
      .footer-btn{
        margin-top: 18px;
        background-color: #f55417;
        border: none;
        color: #ffffff;
      }
    }
  }
</style>
<style type="text/css">
  .van-cell:not(:last-child)::after{
    left: 0px;
  }
  .van-checkbox{
    display: inline-block!important;
    vertical-align: middle!important;
  }
  .van-checkbox__icon, .van-checkbox__label{
    line-height: 16px!important;
  }
  .van-checkbox__label{
    margin-left: 6px;
  }
  .van-checkbox__icon .van-icon{
    width: 16px!important;
    height: 16px!important;
    font-size: 16px!important;
    border: 1px solid #d9d9d9;
    line-height: 16px!important;
  }
  .mint-cell:first-child .mint-cell-wrapper{
    background-origin: content-box;
  }
  .mint-cell:last-child{
    background-image: none;
  }
  .mint-cell-wrapper {
    background-image: none;/*linear-gradient(180deg, #dedede, #dedede 50%, transparent 50%);*/
    background-size: 100% 1px;
    background-repeat: no-repeat;
    background-position: bottom left;
    background-origin: content-box;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    font-size: 16px;
    line-height: 1;
    min-height: inherit;
    overflow: hidden;
    width: 100%;
    padding:0px 4px;
  }
</style>
