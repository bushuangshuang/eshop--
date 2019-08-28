<template>
  <div class="relname-box">
    <common-header :tittle="tittle" :showleft="true" :routerLeft="routerLeft" ></common-header>
    <div class="relname-list">
    <van-cell-group>
      <van-field required clearable v-model="from.realName" label="姓名"   placeholder="请输入姓名" />
      <div class="van-cell van-field">
        <span style="color: red;margin-left: -0.2rem">*</span>
        <div class="van-cell__title van-field__label"><span >性别</span></div>
        <div class="van-cell__value">
          <van-radio-group v-model="from.sex" :disabled="isDisabled">
            <van-radio name="1">男</van-radio>
            <van-radio name="2">女</van-radio>
          </van-radio-group>
        </div>
      </div>
      <van-field required clearable v-model="from.email" label="邮箱" :disabled="isDisabled" placeholder="请输入邮箱" />
<!--      <van-field required label="手机号" :disabled="isDisabled" v-model="phone" disabled="disabled"/>-->
<!--      <van-field required clearable v-model="from.verifiedCode" label="验证码" :disabled="isDisabled" placeholder="请输入验证码" >-->
<!--        <van-button slot="button" size="small" type="primary" v-if="!isDisabled" @click="getCode" :style="codeDisabled==false?'border: 1px solid #F88F6B;background-color:#F88F6B':'background-color:#9D9D9D;border: 1px solid #9D9D9D;'">-->
<!--          {{verifyText}}</van-button>-->
<!--      </van-field>-->
      <div class="address-box">
        <van-field required clearable v-model="from.address" label="联系地址" :disabled="Disabled" @click="isDisabled?'':selAddress('area')" placeholder="请选择所在地区" />
        <span v-if="!isDisabled" @click="isDisabled?'':selAddress('area')" class="selectStyle">选择</span>
      </div>
      <div class="address-box">
        <van-field required clearable v-model="from.idCardTypeName" label="证件类型" :disabled="Disabled" @click="isDisabled?'':selAddress('idType')" placeholder="身份证" />
        <!--
 <span v-if="!isDisabled" @click="isDisabled?'':selAddress('idType')" class="selectStyle">选择</span>-->
      </div>
      <van-field clearable required v-model="from.idCard" label="身份证号" :disabled="isDisabled" placeholder="请输入证件号" />
      <van-field clearable required v-model="from.bankCD" label="银行卡号" :disabled="isDisabled" placeholder="请输入银行卡号" @input="isbankcd"/>
      <van-field clearable required v-model="from.bankNM" label="开户行" :disabled="isDisabled" placeholder="请输入开户行" />
      <div class="address-box">
        <van-field required clearable v-model="from.cardIssueDateName" :disabled="Disabled" label="卡片日期" @click="isDisabled?'':selAddress('date')" placeholder="请选择卡片日期" />
        <span v-if="!isDisabled" @click="isDisabled?'':selAddress('date')" class="selectStyle">选择</span>
      </div>
      <van-field required clearable v-model="from.reservedPhone" :disabled="isDisabled" label="预留手机号" placeholder="请输入预留手机号" @blur="isphone(phone)"/>
      <span v-if="this.isphoneshow" class="span">{{this.phoneerr}}</span>
    </van-cell-group>
    <div class="idcard">
      <div>
        <label>
          <span class="identText">身份证正面</span>
        </label>
        <van-uploader :disabled="isDisabled" :after-read="onReadIdCardFront" accept="image/*">
          <img class="img-icon" src="../../assets/image/realname.jpg" alt="">
          <img class="img-file" v-if="(from.idCardFront!=undefined&&from.idCardFront!=null&&from.idCardFront!='')?true:false" :src="imgFileUrl+from.idCardFront" alt="">
        </van-uploader>
      </div>
      <div>
        <label >
          <span class="identText">身份证反面</span>
        </label>
        <van-uploader :disabled="isDisabled" :after-read="onReadIdCardVerso" accept="image/*">
          <img class="img-icon" src="../../assets/image/realname.jpg" alt="">
          <img class="img-file" v-if="(from.idCardVerso!=undefined&&from.idCardVerso!=null&&from.idCardVerso!='')?true:false" :src="imgFileUrl+from.idCardVerso" alt="">
        </van-uploader>
      </div>
    </div>
    <div class="btn">
      <van-checkbox v-model="ss" style="font-size: 0.3rem" @change="signing(ss)" >用户通过苏宁支付进行签约认证，请勾选确认</van-checkbox>
      <mt-button type="primary" v-if="!isDisabled" @click="toRealName" :style="isDisabled?'background-color:#999':''">提交</mt-button>
      <!--<mt-button type="primary" @click="toRealName" >提交</mt-button>-->
      <!--&lt;!&ndash;<p>温馨提示：无需注册 输入手机号即可登录</p>&ndash;&gt;-->
    </div>
    <van-popup v-model="areaAndTypeShow" position="bottom" :overlay="true">
      <van-area v-if="isSelectedPopup=='area'?true:false" :area-list="areaList" v-model="from.address" @confirm="selectedArea" @cancel="cancelArea" />
      <van-picker v-if="isSelectedPopup=='idType'?true:false" :columns="idTypeList" v-model="from.idCardType" show-toolbar @cancel="cancelArea" @confirm="onConfirmType"  />
      <van-datetime-picker v-if="isSelectedPopup=='date'?true:false" type="date" v-model="from.cardIssueDate"  @confirm="selectDate" @cancel="cancelArea" />
    </van-popup>
    <van-dialog v-model="showFriend" show-cancel-button :before-close="beforeClose" confirm-button-text="确认" >
      <van-field v-model="msgId" type="phone" label="短信序列号"  class="dialog-inp" />
      <van-field  clearable v-model="from.verifiedCode" label="验证码" :disabled="isDisabled" placeholder="请输入验证码" >
<!--        <van-button slot="button" size="small" type="primary" v-if="!isDisabled" @click="getCode" :style="codeDisabled==false?'border: 1px solid #F88F6B;background-color:#F88F6B':'background-color:#9D9D9D;border: 1px solid #9D9D9D;'">-->
<!--          {{verifyText}}</van-button>-->
      </van-field>
    </van-dialog>
  </div>

  </div>
</template>
<script>
import commonHeader from 'common/common-header'
import AreaList from '../../assets/area.js'
import * as homeApi from '../../api/home-api'
import { Toast } from 'vant'
import { imgFileUrl } from '../../apiconfig/index'
export default {
  name: 'realname',
  components: {
    commonHeader
  },
  data() {
    return {
      msgId:'',
      tel:'',
      showFriend:false,
      ISaggree:false,
      ss:false,
      Disabled:true,
      timer: null,
      verifyText: '获取验证码',
      codeDisabled: false,
      countdown: 60,
      isphoneshow: false,
      imgFileUrl: imgFileUrl,
      areaList: AreaList,
      idTypeList: [],
      value: '',
      tittle: '实名认证',
      routerLeft: localStorage.getItem('fromrouter'),
      phoneerr: '',
      areaAndTypeShow: false,
      isSelectedPopup: '',
      phone: localStorage.getItem('phone') || '',
      from: {
        realName: '',
        sex: '',
        email: '',
        address: '',
        verifiedCode: '',
        idCardType: '',
        idCardTypeName: '',
        idCard: '',
        bankCD: '',
        bankNM: '',
        cardIssueDate: new Date(),
        cardIssueDateName: '',
        reservedPhone: '',
        idCardFront: '',
        idCardVerso: '',
        fromrouter: '',
        torouter: ''
      },
      errorMsg: {
        realName: '必填'
      },
      isDisabled: false,
      usernamephone: localStorage.getItem('phone')
    }
  },
  beforeRouteEnter: (to, from, next) => {
    this.fromrouter = from.path
    localStorage.setItem('fromrouter', from.path)
    next()
  },
  beforeRouteLeave(to, from, next) {
    this.torouter = to.path
    next()
  },
  mounted() {
    this.getPersonInfo()
    this.signing()
  },
  methods: {
    signing(ss){
      this.ISaggree=ss
    },
    beforeClose(action, done) {
      if (action === 'confirm') {
        let data={
          msgId:this.msgId,
          verificationCode:this.from.verifiedCode
        }
        homeApi.suNingconfirm(data).then(res=>{
          if(res.data.code=='200'){
            Toast('实名认证成功')
            done()
            let data = {
              "realName": this.from.realName,
              "sex" : this.from.sex,
              "email": this.from.email,
              "phone": this.phone,
              // "verifiedCode": this.from.verifiedCode,
              "address": this.from.address,
              "idCardType": '1',
              "idCard": this.from.idCard,
              "bankNM": this.from.bankNM,
              "bankCD": this.from.bankCD.replace(/\s*/g, ""),
              "cardIssueDate": this.from.cardIssueDate.getTime(),
              "reservedPhone": this.reservedPhone,
              "idCardFront": this.from.idCardFront,
              "idCardVerso": this.from.idCardVerso
            }
            homeApi.realName(data).then(res => {
              if (res.data.code === '200') {
                this.isDisabled = true
                homeApi.getPersonInfo().then(res => {
                  if (res.data.code === '200') {
                    localStorage.setItem('realName', res.data.User.realName)
                    localStorage.setItem('isAuth', res.data.User.isAuth)
                  }
                })
              } else {
                Toast(res.data.msg)
              }
            }).catch(err => {
              console.log(err)
            })
          }else if(res.data.code=='501'){
            Toast(res.data.code.msg)
          }
        }).catch(err=>{
          console.log('ERR',err)
        })
        if (!this.from.verifiedCode) {
          Toast('请输入短信验证码')
          done(false)
          return
        }
      } else if (action === 'cancel') {
        this.from.verifiedCode=''
        done() // 关闭
      }
    },
    isbankcd(){
      this.from.bankCD = this.from.bankCD.replace(/\s/g,'').replace(/[^\d]/g,'').replace(/(\d{4})(?=\d)/g,'$1 ')
    },
    getIdTypeOption() {
      let data = {
        type: 'ID_TYPE'
      }
      homeApi.loadDataByType(data).then(res => {
        if (res.data.code === '200') {
          this.idTypeList = res.data.list
          for (let i = 0; i < this.idTypeList.length; i++) {
            this.idTypeList[i]['text'] = this.idTypeList[i].name
          }
        } else {
          Toast(res.data.msg)
        }
      })
    },
    getPersonInfo() {
      this.getIdTypeOption()
      homeApi.getPersonInfo().then(res => {
        if (res.data.User.isAuth === '2') {
          this.isDisabled = true
        } else if (res.data.User.isAuth === '1') {
          this.isDisabled = false
        }
        if (res.data.code === '200') {
          this.from = res.data.User
          if (this.from.cardIssueDate == null || '') {
            this.from.cardIssueDate = new Date((this.from.cardIssueDate))
          } else {
            this.from.cardIssueDate = new Date((this.from.cardIssueDate).replace(/-/g, '/'))
          }
          this.selectDate(this.from.cardIssueDate)
          for (let i = 0; i < this.idTypeList.length; i++) {
            if (this.from.idCardType === this.idTypeList[i].key) {
              this.from.idCardTypeName = this.idTypeList[i].name
              break
            }
          }
        } else {
          Toast(res.data.msg)
        }
      })
    },
    isphone(phone) {
      var myreg = /^[1][3,4,5,6,7,8][0-9]{9}$/
      if (myreg.test(phone) === false) {
        this.phoneerr = '请输入正确的手机号'
        this.isphoneshow = true
      } else {
        this.isphoneshow = false
      }
    },
    getCode() {
      if (this.phone === undefined || this.phone === null || this.phone === '') {
        Toast('手机号码不能为空')
        return
      }
      if (!this.timer) {
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
      if (this.codeDisabled === true) {
        return
      }
      let params = {
        phone: this.phone
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
    onReadIdCardFront(file) {
      this.from.idCardFront = ''
      const formData = new FormData()
      formData.append('upfile', file.file)
      homeApi.uploadFile(formData).then(res => {
        if (res.data.code === '200') {
          this.from.idCardFront = res.data.list[0]
        } else {
          Toast(res.data.msg)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    onReadIdCardVerso(file) {
      this.from.idCardVerso = ''
      const formData = new FormData()
      formData.append('upfile', file.file)
      homeApi.uploadFile(formData).then(res => {
        if (res.data.code === '200') {
          this.from.idCardVerso = res.data.list[0]
        } else {
          Toast(res.data.msg)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    selAddress(status) {
      this.isSelectedPopup = status
      this.areaAndTypeShow = true
    },
    selectedArea(value) {
      if (value[0].name == value[1].name) {
        this.from.address = value[0].name + value[2].name
      } else {
        this.from.address = value[0].name + value[1].name + value[2].name
      }
      this.areaAndTypeShow = false
    },
    onConfirmType(value) {
      this.from.idCardTypeName = value.name
      this.from.idCardType = value.key
      this.areaAndTypeShow = false
    },
    selectDate(value) {
      if (value === undefined && value === null && value === '') {
        value = new Date()
      }
      let year = value.getFullYear()
      let month = value.getMonth() + 1
      let date = value.getDate()
      this.from.cardIssueDate = value
      this.from.cardIssueDateName = year + '/' + (month.toString().length == 1 ? '0' + month : month) + '/' + (date.toString().length == 1 ? '0' + date : date)
      this.areaAndTypeShow = false
    },
    cancelArea() {
      this.areaAndTypeShow = false
    },
    toRealName() {
      let tipErrorMsg = ''
      if (this.from.realName === undefined || this.from.realName === null || this.from.realName === '') {
        tipErrorMsg += '姓名不能为空\n'
      }
      if (this.from.sex === undefined || this.from.sex === null || this.from.sex === '') {
        tipErrorMsg += '性别不能为空\n'
      }
      if (this.from.email === undefined || this.from.email === null || this.from.email === '') {
        tipErrorMsg += '邮箱不能为空\n'
      }
    //   if (this.from.verifiedCode === undefined || this.from.verifiedCode === null || this.from.verifiedCode === '') {
    //     tipErrorMsg += '验证码不能为空\n'
    // }
      if (this.from.address === undefined || this.from.address === null || this.from.address === '') {
        tipErrorMsg += '地址不能为空\n'
      }
      // if (this.from.idCardType === undefined || this.from.idCardType === null || this.from.idCardType === '') {
      //   tipErrorMsg += '证件类型不能为空\n'
      // }
      if (this.from.idCard === undefined || this.from.idCard === null || this.from.idCard === '') {
        tipErrorMsg += '证件号不能为空\n'
      }
      if (this.from.bankCD === undefined || this.from.bankCD === null || this.from.bankCD === '') {
        tipErrorMsg += '银行卡不能为空\n'
      }
      if (this.from.bankNM === undefined || this.from.bankNM === null || this.from.bankNM === '') {
        tipErrorMsg += '开户行不能为空\n'
      }
      if (this.from.cardIssueDate === undefined || this.from.cardIssueDate === null || this.from.cardIssueDate === '') {
        tipErrorMsg += '卡片日期不能为空\n'
      }
      if (this.from.reservedPhone === undefined || this.from.reservedPhone === null || this.from.reservedPhone === '') {
        tipErrorMsg += '预留手机号不能为空\n'
      }
      if (this.from.idCardFront === undefined || this.from.idCardFront === null || this.from.idCardFront === '') {
        tipErrorMsg += '身份证正面不能为空\n'
      }
      if (this.from.idCardVerso === undefined || this.from.idCardVerso === null || this.from.idCardVerso === '') {
        tipErrorMsg += '身份证反面不能为空'
      }
      if (tipErrorMsg !== undefined && tipErrorMsg !== null && tipErrorMsg !== '') {
        Toast(tipErrorMsg)
        return
      }
      if (this.ISaggree ===false) {
        Toast('请先勾选签约认证')
        return

      }else if(this.ISaggree ===undefined){
        Toast('请先勾选签约认证')
        return
      }
      let params={
        cardHolderName:this.from.realName,
        certNo:this.from.idCard,
        mobileNo:this.from.reservedPhone,
        cardNo:this.from.bankCD.replace(/\s*/g, "")
      }
      homeApi.suNingPay(params).then(res=>{
        this.msgId=res.data.msgId
        console.log(res.data)
        if(res.data.code=='200'){
          this.showFriend=true
          this.beforeClose()
        }else {
          Toast(res.data.msg)
        }
      }).catch(err=>{
        console.log('err',err)
      })


    }
  }

}
</script>

<style scoped lang="less">
  @import "~styles/index.less";
  @import "~styles/variable.less";
  .relname-box {

    .span{
      color: red;
    }
    width: 100%;
    height: auto;
    background: #fff;
    text-align: left;
    li:nth-child(3){
      img{
        width: 0.4rem;
        height: 0.4rem;
      }
    }
    .relname-list{
      .padding(0,20);
      .van-field{
        .padding(0,30);
        border: none;
        line-height:45px;
        .fs(30);
      }
      .van-radio-group{
        width: 100%;
        .fs(30);
        line-height:45px;
        display: flex;
        justify-content: flex-start;
        .van-radio{
          .mr(50)
        }
      }
      .address-box{
        position: relative;
        .selectStyle{
          width: 1.2rem;
          height: 0.6rem;
          font-size: 0.4rem;
          position: absolute;
          right: 0;
          top: 50%;
          margin-top: -0.3rem;
        }
      }
      .btn{
        .pl(30);
        .pr(30);
        .pb(40);

        .mint-button--normal{
          width: 100% !important;
          background: #F45416;
        }
      }
      .idcard{
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .pt(40);
        .pb(40);
        .pl(70);
        .pr(70);
        label{
          position: relative;
        }
        .identfileinp{
          position: absolute;
          left: 0;
          top: 0;
          opacity: 0;
        }
        .identBtn{
          margin-right: 5px;
        }
        .identText{
          color: #ccc;
        }
        div{
          width: 40%;
          border: 1px solid #EBEBEB;
          background: #F7F7F7;
          text-align: center;
          .pt(20);
          .pb(40);
          .input-z{
            width:90%;
            height: 2rem;
            border: 3px dotted #ccc;
          }
          .van-uploader{
            width: 1.5rem;
            height: 1.5rem;
            border: 3px dotted #ccc;
            margin: 0 auto;
            margin-top: 0.3rem;
            border-radius: 0.3rem;
            display: flex;
            justify-content: center;
            align-items: center;
            line-height: 1.5rem;
            .img-icon{
              .mt(20);
              width:60%;
            }
            .img-file{
              position: absolute;
              width: 135%;
              height: 135%;
              top: -0.15rem;
            }
          }
        }
      }
    }
  }
</style>
<style type="text/css">
  .van-cell:not(:last-child)::after{
    left: 0px;
  }
  .van-field__error-message {
    line-height: 30px;
    font-size: 0.4rem;
  }
</style>
