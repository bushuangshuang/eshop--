<template>
    <div class="Vehicleevaluation-box">
      <common-header :tittle="tittle" :showleft="true"  :routerLeft="routerLeft" ></common-header>
      <div class="vehicle-list">
        <van-cell-group>
          <div class="address-box">
            <van-field required clearable v-model="form.carName" label="选择车辆" @click="selAddress" placeholder="请选择车辆" />
            <span @click="selAddress" class="selectStyle">选择</span>
          </div>
          <van-field required label="手机号" v-model="form.phone"/>
          <van-field required clearable v-model="form.verifiedCode" label="验证码" placeholder="请输入验证码" >
            <van-button slot="button" size="small" type="primary" @click="getCode" :style="codeDisabled==false?'border: 1px solid #F88F6B;background-color:#F88F6B':'background-color:#9D9D9D;border: 1px solid #9D9D9D;'">{{verifyText}}</van-button>
          </van-field>
          <div class="checkboxLabel"><span class="red-star">*</span>关联项</div>
          <van-checkbox-group required v-model="form.result">
            <van-checkbox
              v-for="(item, index) in checkBoxList"
              :key="index"
              :name="item.value"
            >
              {{ item.label }}
            </van-checkbox>
          </van-checkbox-group>
        </van-cell-group>
        <div class="login-footer">
          <van-checkbox v-model="form.checked" class="checkRadio" checked-color="#07c160" icon-size="10px">评估声明</van-checkbox>
        </div>
      </div>
      <van-popup v-model="areaAndTypeShow" position="bottom" :overlay="true">
        <van-picker :columns="carList" v-model="form.carId" show-toolbar @cancel="cancelCar" @confirm="onConfirmCar"  />
      </van-popup>
      <li class="btn">
        <van-button type="default" @click="generatingReports">生成报告</van-button>
      </li>
      <div class="EvaluationList">
        <li>
          <span>评估时间</span>
          <span>文件名称</span>
          <span>状态</span>
        </li>
        <li>
          <span>2019-05-01</span>
          <span>LS5A3CJC2JF980.pdf</span>
          <span>评估中</span>
        </li>
        <li>
          <span>2019-05-01</span>
          <span>LS5A3CJC2JF980.pdf</span>
          <span>评估中</span>
        </li>
        <li>
          <span>2019-05-01</span>
          <span>LS5A3CJC2JF980.pdf</span>
          <span>评估中</span>
        </li>
      </div>

    </div>
</template>

<script>
import commonHeader from 'common/common-header'
import * as homeApi from '../../api/home-api'
import { Toast, Dialog} from 'vant'
export default {
  components: {commonHeader, Toast, Dialog},
  name: 'Vehicleevaluation',
  data() {
    return {
      tittle: '车辆评估',
      routerLeft: '/garage',
      verifyText: '获取验证码',
      codeDisabled: false,
      countdown: 60,
      areaAndTypeShow: false,
      form: {
        carId: '',
        carName: '',
        phone: '',
        verifiedCode: '',
        result: [],
        checked: false
      },
      carList: [],
      checkBoxList: [
        {
          value: '1',
          label: '保养记录'
        },
        {
          value: '2',
          label: '维修记录'
        }
      ]

    }
  },
  mounted() {
    this.getCarList()
  },
  methods: {
    getCarList() {
      let params = {
        pageNumber: 1,
        pageSize: 10000
      }
      homeApi.getgarage(params).then(res => {
        if (res.data.code === '200') {
          let list = res.data.page.list
          let carOption = []
          list.forEach(item => {
            let obj = {
              text: item.carLicence,
              value: item.carProductCd
            }
            carOption.push(obj)
          })
          this.carList = carOption
        } else {
          Toast(res.data.msg)
        }
      })
    },
    selAddress() {
      this.areaAndTypeShow = true
    },
    onConfirmCar(value) {
      this.areaAndTypeShow = false
      this.form.carName = value.text
      this.form.carId = value.value
    },
    cancelCar() {
      this.areaAndTypeShow = false
    },
    getCode() {
      if (this.form.phone === undefined || this.form.phone === null || this.form.phone === '') {
        Toast('手机号码不能为空')
        return
      } else {
        var myreg = /^[1][3,4,5,6,7,8][0-9]{9}$/
        if (myreg.test(this.form.phone) === false) {
          Toast('请输入正确的手机号')
          return
        }
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
        phone: this.form.phone
      }
      homeApi.TestGetCode(params).then(res => {
        console.log(res.data)
        if (res.data.code === '200') {
          Toast('短信发送成功')
        } else {
          Toast(res.data.msg)
        }
      }).catch((res) => {
        Toast('发送失败，请重试或联系管理员！')
      })
    },
    generatingReports() {
      let tipErrorMsg = ''
      if (this.form.carName === undefined || this.form.carName === null || this.form.carName === '') {
        tipErrorMsg += '车辆不能为空\n'
      }
      if (this.form.phone === undefined || this.form.phone === null || this.form.phone === '') {
        tipErrorMsg += '手机号不能为空\n'
      } else {
        var myreg = /^[1][3,4,5,6,7,8][0-9]{9}$/
        if (myreg.test(this.form.phone) === false) {
          tipErrorMsg += '请输入正确的手机号\n'
        }
      }
      if (this.form.verifiedCode === undefined || this.form.verifiedCode === null || this.form.verifiedCode === '') {
        tipErrorMsg += '验证码不能为空\n'
      }
      if (this.form.result.length === 0) {
        tipErrorMsg += '关联项不能为空\n'
      }
      if (tipErrorMsg !== undefined && tipErrorMsg !== null && tipErrorMsg !== '') {
        Toast(tipErrorMsg)
        return
      }
      if (this.form.checked === false) {
        Toast('请先选择评估声明')
        return
      }
      let data = {
        carName: this.form.carName,
        phone: this.form.phone,
        verifiedCode: this.form.verifiedCode
        // result: this.form.result
      }
      console.log('data==' + JSON.stringify(data))
      console.log('result==' + JSON.stringify(this.form.result))
    }
  }
}
</script>

<style scoped lang="less">
  @import "~styles/index.less";
  @import "~styles/variable.less";
  .Vehicleevaluation-box {
    .span{
      color: red;
    }
    width: 100%;
    height: auto;
    background: #fff;
    text-align: left;
    .vehicle-list{
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
      .checkboxLabel{
        padding: 0.2rem 0 0 0.4rem;
        .fs(30);
        line-height:34px;
        display: inline-block;
        vertical-align: top;
        .red-star{
          position: absolute;
          left: 7px;
          font-size: 14px;
          color: #f44;
        }
      }
      .van-checkbox-group{
        display: inline-block;
        padding-top: 0.2rem;
        .van-checkbox{
          padding-left:1rem;
          .fs(30);
          line-height:34px;
          //display: inline-block;
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
      .login-footer{
        .checkRadio{
          padding-left: 0.4rem;
          line-height: 45px;
          .van-checkbox__label{
            color: #969799!important;
          }
        }
        span{
          color: #969799!important;
        }
        .van-checkbox{
          .fs(26);
        }
      }
    }
    .btn{
      width: 100%;
      height: 1rem;
      padding: 0 0.5rem;
      align-items: center;
      padding-bottom: 1.5rem;
      background-color: #fff;
      .van-button{
        width: 100%;
        background-color:#ff7414 ;
        .fs(30);
        color: #fff;
        border-radius: 0.2rem;
      }
    }
    .EvaluationList{
      width: 100%;
      height: auto;
      padding: 0 0.5rem;
      margin-top: 0.5rem;
      li{
        height: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 0.5rem;
        .fs(30);
        border: 1px solid #ff7414;
        background-color: #fff;
        border-top:none ;
      }
      li:nth-child(1){
        border-top:1px solid #ff7414;
        background-color:#FFF1E7 ;
      }
    }
  }

</style>
