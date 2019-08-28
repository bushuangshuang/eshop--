
<template>
<div class="Account-box">
  <common-header :tittle="tittle" :showleft="true"  :routerLeft="routerLeft" ></common-header>
  <div class="out-one">
    <li>
      <van-uploader  :after-read="onReadIdCardFront" accept="image/gif, image/jpeg" multiple>
        <span>头像</span>
        <img :src="!!url?imgFileUrl+url:''" v-if="userimg()=='1'" alt="">
        <img class="img-file" v-if="(!!this.idCardFront&&this.idCardFront!='')?true:false" :src="!!this.idCardFront?imgFileUrl+this.idCardFront:''" alt="">
        <img :src="!!updateurl?imgFileUrl+updateurl:''" v-if="userimg()=='2'" alt="">
      </van-uploader>
      <van-icon name="arrow" />
    </li>
    <li @click="realname"><span>实名认证</span><van-icon name="arrow" /></li>
    <li @click="bindingphone"><span>绑定手机号</span><span>已绑</span><van-icon name="arrow" /></li>
  </div>
  <li class="btn"> <van-button  @click="dropout">退出当前账号</van-button></li>
    <van-dialog  v-model="showFriend"  show-cancel-button :before-close="beforeClose" confirm-button-text="修改" >
        <van-field  label="手机号" placeholder="请输入手机号" v-model="bindphone" disabled class="dialog-inp"/>
    </van-dialog>
    <van-dialog  v-model="modification"  show-cancel-button :before-close="beforeClosenew" confirm-button-text="修改" >
        <van-field  label="新手机号" placeholder="请输入新的手机号" v-model="newphone"  class="dialog-inp" />
        <van-field  label="验证码" placeholder="请输入手机验证码" v-model="vicode"  class="dialog-inp">
         <van-button slot="button" size="small" type="primary" @click="getCode" :style="codeDisabled==false?'border: 1px solid #F88F6B;background-color:#F88F6B':'background-color:#9D9D9D;border: 1px solid #9D9D9D;'">{{verifyText}}</van-button>
        </van-field>
    </van-dialog>

</div>
</template>

<script>
import commonHeader from 'common/common-header'
import { imgFileUrl } from '../../apiconfig/index'
import * as homeApi from '../../api/home-api'
import { Toast } from 'vant'
export default {
  name: 'AccountSetting',
  components: {commonHeader},
  data() {
    return {
      tittle: '账号设置',
      routerLeft: '/index/out',
      idCardFront: '',
      imgFileUrl: imgFileUrl,
      showFriend: false,
      modification: false,
      bindphone: localStorage.getItem('phone'),
      newphone: '',
      vicode: '',
      codeDisabled: false,
      verifyText: '获取验证码',
      countdown: 60,
      timer: null,
      url: localStorage.getItem('photourl'),
      oldurl: ''
    }
  },
  mounted() {
  },
  activated() {
  },
  methods: {
    getCode() {
      if (!this.timer) {
        if (this.newphone === undefined || this.newphone === null || this.newphone === '') {
          Toast('手机号码不能为空')
          return
        } else {
          this.newphone = this.newphone.replace(/\s*/g, '')
          var myreg = /^[1][3,4,5,6,7,8][0-9]{9}$/
          if (myreg.test(this.newphone) === false) {
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
      if (this.codeDisabled == true) {
        return
      }
      let params = {
        phone: this.newphone
      }
      homeApi.TestGetCode(params).then(res => {
        if (res.data.code === '200') {
          Toast('短信发送成功')
        } else {
          Toast(res.data.msg)
        }
      }).catch((res) => {
        Toast('发送失败，请重试或联系管理员！')
      })
    },
    bindingphone() {
      this.showFriend = true
    },
    userimg() {
      // status 1 默认图片 2 新图片 3 本地图片
      let status = ''
      if (!!this.oldurl) {
        status = '1'
      } else if (!!this.updateurl) {
        status = '2'
      } else {
        status = '3'
      }
    },
    resetCode () {
      clearInterval(this.timer)
      this.codeDisabled = false
      this.verifyText = '获取验证码'
      this.countdown = 60
      this.timer = null
    },
    beforeClose(action, done) {
      if (action === 'confirm') {
        this.modification = true
      }
      done() // 关闭
    },
    beforeClosenew(action, done) {
      if (action === 'confirm') {
        this.modification = false
        this.newphone = ''
        this.vicode = ''
        this.resetCode()
      }
      done() // 关闭
    },
    dropout() {
      this.$dialog.confirm({
        message: '确认退出'
      }).then(() => {
        homeApi.loginout().then(res=>{
          if(res.code='200'){
            localStorage.clear('realName')
            this.$router.push('/')
          }
        }).catch(err=>{
          console.log(err)
        })

      }).catch(() => {
        this.$router.push('/day')
      })
    },
    realname() {
      this.$router.push('/day/realname')
    },
    getperson() {
      let params = {
        photo: this.idCardFront
      }
      homeApi.getPersonInfo(params).then(res => {
        this.oldurl = res.data.User.photo
      }).catch(err => {
        console.log(err)
      })
    },
    updateperson() {
      let params = {
        photo: this.idCardFront
      }
      homeApi.updateperson(params).then(res => {
        this.updateurl = res.data.ConfUser.photo
      }).catch(err => {
        console.log(err)
      })
    },
    onReadIdCardFront(file) {
      this.idCardFront = ''
      const formData = new FormData()
      formData.append('upfile', file.file)
      homeApi.uploadFile(formData).then(res => {
        if (res.data.code === '200') {
          this.idCardFront = res.data.list[0]
          this.updateperson()
        } else {
          Toast(res.data.msg)
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped lang="less">
  @import "~styles/index.less";
  @import "~styles/variable.less";
  .Account-box{
    .dialog-inp{
      height: 1.4rem!important;
      line-height: 1.4rem!important;
      .fs(30)!important;
    }
    .btn{
      width: 100%;
      margin-top: 1rem;
      button{
        width: 100%;
      }
    }
    .out-one{
      margin-bottom: 0.2rem;
      .img-file{
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
      }
      li{
        width: 100%;
        height: 1.6rem;
        border-bottom: 1px solid #ccc;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #fff;
        padding: 0.2rem 0.5rem;
        .fs(30);
        img{
          width: 0.8rem;
          height: 0.8rem;
          vertical-align: middle;
          margin-left: 6.6rem;
          /*margin-right: 5rem;*/
        }
      }
      li:last-child{
        border-bottom: none;
        span:nth-child(2){
          margin-left: 5.4rem;
        }
      }
    }
  }

</style>
