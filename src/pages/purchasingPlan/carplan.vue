<template>
  <div class="carplan">
    <div class="content-box" >
      <li >
        <common-header :tittle="tittle" :showleft="true" :showinput="false" :showright="true" :routerLeft="routerLeft" :carProductCd="carProductCd" style="position: absolute;top: 0.4rem;left: 0;background-color: transparent;color: #fff;height: 0.5rem;border:none"></common-header>
        <img :src="imgFileUrl+fileAddress" style="height:246px;">
<!--        <div class="chose" >-->
<!--          <p>外观</p>-->
<!--          <p>内饰</p>-->
<!--          <p>中控</p>-->
<!--          <p>视频</p>-->
<!--        </div>-->
        <div class="color">
          <div class="color-center">
            <span v-for="item in list" :style="{backgroundColor:item.carColourValue,border:selectedName==item.name?'4px solid #EDCACA':'none',borderRadius:selectedName==item.name?'0.09rem':'',}" @click="changeImg(item)"></span>
          </div>
        </div>
        <div class="carplan-text">
          <div class="type">
          <span :style="list2.onSale=='0'?'color:#999;':''">
            {{list2.carProductVer}}&nbsp;
            <span>{{list2.carProductKind=='1'?'新能源':list2.carProductKind=='2'?'燃油':''}}</span>
          </span>
            <div @click="parameter(list2.carProductKind)">
              <img src="../../assets/image/configuration.png" alt="">
              <span :style="list2.onSale=='0'?'color:#999;':''">参数配置</span>
            </div>
          </div>
          <div class="check" :style="list2.onSale=='0'?'color:#999;':''">
            <span>{{list2.carProductStyle}}</span>
            <span>{{list2.carProductVer}}</span>
          </div>
          <div class="way" :style="list2.onSale=='0'?'color:#999;':''" v-if="list2.carProductKind=='1'?true:false">
            <span>容量:{{list2.carPowerBatkwh}}kWh</span>
            <span>续航:{{list2.carPowerMaxKm}}km</span>
            <span>变速箱:{{list2.carPowerT}}</span>
          </div>
          <div class='way1' :style="list2.onSale=='0'?'color:#999;':''" v-if="list2.carProductKind=='2'?true:false">
            <span >混合工况油耗：{{list2.carPowerOilBee}}L/100km</span>
            <span >排量：{{list2.carPowerSvolume}}L</span>
            <span >变速箱：{{list2.carPowerT}}</span>
          </div>
          <div class="display" :style="list2.onSale=='0'?'color:#999;':''">
            <span>{{list2.carProductKeep}}</span>
          </div>
          <div class="price"><span></span><span>销售价格：{{price}}万</span></div>
          <div class="display" :style="list2.onSale=='0'?'color:#999;':''">
            <span style="font-weight: 700;">库存充足</span>
            <div>指导价格：<span class="display-color" :style="list2.onSale=='0'?'color:#999;':''">{{list2.carProductPrice}}</span></div>
          </div>
        </div>

      </li>
    </div>
    <div class="line-f">&nbsp;</div>
    <div class="choose-box" v-if="form.onSale==1?true:false">
      <div class="choose-color">
        <li>选择颜色</li>
        <van-actionsheet v-model="colorshow" :actions="colorActions" @select="onSelectcolor" />
        <span class="textC">{{colortext}}</span>
        <span class="chooseSpan" @click="changeColor(colortext)">选择</span>
      </div>
      <div class="choose-color">
        <li>销售商</li>
        <span class="textC" @click="toShow(form.partnerNm)">{{form.partnerNmStr}}</span>
        <span @click="toStores" class="chooseSpan more">更多门店</span>
      </div>
      <div class="choose-color">
        <li>付款方式</li>
        <van-actionsheet v-model="show" :actions="payActions" @select="onSelect" />
        <span class="textC">{{paytext}}</span>
        <span class="chooseSpan" @click="changePay(paytext)">选择</span>
      </div>
      <div>
        <div class="choose-Finance" v-if="payD">
          <li>金融服务</li>
          <van-actionsheet v-model="showFinance" :actions="financeActions" @select="onSelectFinance" />
          <span class="textF" v-if="showFinance2">苏宁信用贷</span>
          <span class="textF" v-if="showFinance1">{{financeService}}</span>
          <span class="textS" @click="changeFinance()">选择</span>
          <span class="more">申请贷款</span>
        </div>
<!--        <mt-button type="primary" size="large" class="choose-btn" @click="loan" v-if="payD">预计贷款计算</mt-button>-->
<!--        <div class="deposit" v-if="payM"><span>订金</span>￥<span>{{form.earnestMoney}}</span></div>-->
      </div>
    </div>
    <div class="line-f">&nbsp;</div>
    <div class="tab">
      <mt-navbar v-model="selected">
        <mt-tab-item id="1"><span @click="changeSaleTab('1')">在售</span></mt-tab-item>
        <mt-tab-item id="2"><span @click="changeSaleTab('0')">停产</span></mt-tab-item>
      </mt-navbar>
      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="1">
          <div v-if="onSale1.length!=0?true:false">
            <div class="content-tab" v-for="item in onSale1">
              <div class="content-bg">
                <p style="color:#333;">
                  <span>
                    {{item.carProductVer}} {{item.carProductStyle}}&nbsp;
                     <span v-if="list2.carProductKind=='2'?true:false">燃油</span>
                      <span v-if="list2.carProductKind=='1'?true:false">电动</span>
                  </span>
                  <span style="color:#2fd26c">在售</span>
                </p>
                <!--<p style="color:#666;">容量：&nbsp;{{item.carPowerBatkwh}}kWh 续航里程：&nbsp;{{item.carPowerMaxKm}}km</p>-->
               <p v-if="list2.carProductKind=='2'?true:false">
                 <span>排量：{{list2.carPowerSvolume}}L</span>
                 <span>环保标准：{{list2.carPowerEp}}</span>
               </p>
                <p v-if="list2.carProductKind=='1'?true:false">
                  容量：&nbsp;{{item.carPowerBatkwh}}kWh 续航里程：&nbsp;{{item.carPowerMaxKm}}km
                </p>
                <p style="display: flex;justify-content: space-between"> <span></span><span>销售价格{{price}}万</span></p>
                <p style="color:#666;">
                  <span>{{item.carProductKeep}}</span>

                  <span>指导价格：&nbsp;<i style="color:#999;">{{item.carProductPrice}}</i></span>
                </p>
              </div>
            </div>
            <div @click="showAll1=!showAll1" class="text">{{word1}}</div>
          </div>
          <div v-if="onSale1.length==0?true:false" class="tipNull">
            <img src="../../assets/image/tipNull.png" />
            <p>暂无数据</p>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <div v-if="onSale2.length!=0?true:false">
            <div class="content-tab" v-for="item in onSale2">
              <div class="content-bg">
                <p style="color:#999;">
                  <span>{{item.carProductVer}}&nbsp;&nbsp;{{item.carProductStyle}}&nbsp;&nbsp;{{item.carProductKind}}</span>
                  <span style="color:#999999">停产</span>
                </p>
                <p style="color:#999;">容量：&nbsp;{{item.carPowerBatkwh}}kWh 续航里程：&nbsp;{{item.carPowerMaxKm}}km</p>
                <p style="display: flex;justify-content: space-between"> <span></span><span>销售价格{{price}}万</span></p>
                <p style="color:#999;">
                  <span>{{item.carProductKeep}}</span>

                  <span>指导价格：&nbsp;<i style="color:#999;">{{item.carProductPrice}}</i></span>
                </p>
              </div>
            </div>
            <div @click="showAll2=!showAll2" class="text">{{word2}}</div>
          </div>
          <div v-if="onSale2.length==0?true:false" class="tipNull">
            <img src="../../assets/image/tipNull.png" />
            <p>暂无数据</p>
          </div>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
    <div class="Recommended">
      <h4>推荐车系</h4>
      <div class="Recommended-swiper" >
      <van-swipe :autoplay="3000"  :touchable='true' :duration='300' indicator-color="white" class="swiper-container" :width="150">
        <div class="swiper-wrapper">
          <van-swipe-item
            v-for="item in Recommendedlist"
            class="swiper-slide"
          >
            <img :src="imgFileUrl+item.classPic" />
            <p>{{item.classNm}}</p>
            <p>{{item.carProductPriceRange}}</p>
          </van-swipe-item>
          <van-swipe-item
            v-for="item in Recommendedlist"
            class="swiper-slide"
          >
            <img :src="imgFileUrl+item.classPic" />
            <p>{{item.classNm}}</p>
            <p>{{item.carProductPriceRange}}</p>
          </van-swipe-item>
          <van-swipe-item
            v-for="item in Recommendedlist"
            class="swiper-slide"
          >
            <img :src="imgFileUrl+item.classPic" />
            <p>{{item.classNm}}</p>
            <p>{{item.carProductPriceRange}}</p>
          </van-swipe-item>
          <van-swipe-item
            v-for="item in Recommendedlist"
            class="swiper-slide"
          >
            <img :src="imgFileUrl+item.classPic" />
            <p>{{item.classNm}}</p>
            <p>{{item.carProductPriceRange}}</p>
          </van-swipe-item>
        </div>


      </van-swipe>
      </div>
    </div>
    <div class="fixedfooter">
      <li @click="toCollect(collectTxt)">
        <div>
          <img :src="collectSrc"/>
        </div>
        <span>{{ collectTxt }}</span>
      </li>
      <li @click="toLinkStore">
        <div>
          <img :src="contactSrc"/>
        </div>
        <span>联系销售</span>
      </li>
      <button class="shopcar" @click="addshopcar" >加入购物车</button>
      <button @click="toOrder" v-bind:disabled="isdisable">立即下单</button>
    </div>
    <van-dialog
      v-model="paydialog"
      show-cancel-button
      class="paydialog"
      :before-close="beforeClosepay"
    >
      <van-cell-group>
        <li class="payli">
          <van-field
            v-model="money.totalAmount"
            label="总金额："
            disabled
          >
          </van-field>
          <span>元</span>
        </li>
        <li class="payli" >
          <van-field
            v-model="money.amountPaid"
            label="已付金额："
            disabled
          >
          </van-field>
          <span>元</span>
        </li>
        <li class="payli">
          <van-field
            v-model="money.payAmount"
            clearable
            label="需支付金额："
          >
          </van-field>
          <span>元</span>
        </li>

      </van-cell-group>
    </van-dialog>
  </div>
</template>

<script>
import { Dialog, Toast } from 'vant'
import commonHeader from 'common/common-header'
import * as homeApi from '../../api/home-api'
import { imgFileUrl } from '../../apiconfig/index'
import collectGrey from '../../assets/image/collect-grey.png'
import collectSelect from '../../assets/image/collect-select.png'
import contaxt from '../../assets/image/contact.png'
import Swiper from 'swiper'

export default {
  name: 'carplan',
  components: {
    commonHeader
  },
  data() {
    return {
      money:{
        totalAmount:'',
        amountPaid:'0',
        payAmount:''
      },
      payId:'',
      paydialog:false,
      colortext:'',
      order2List: [],
      showFinance1: false,
      showFinance2: true,
      isdisable: false,
      radio: '2',
      routerLeft: '/info',
      tittle: '',
      imgFileUrl: imgFileUrl,
      show: false,
      showFinance: false,
      colorshow: false,
      onSale1list: [],
      onSale2list: [],
      Recommendedlist: [],
      paytext: '',
      list: [],
      list2: {},
      sheetVisible: false,
      sheetColorVisible: false,
      sheetPayVisible: false,
      sheetFinanceVisible: false,
      selected: '1',
      colorActions: [],
      payActions: [],
      financeActions: [],
      showAll1: false,
      showAll2: false,
      collectSrc: collectGrey,
      contactSrc: contaxt,
      collectTxt: '收藏',
      financeService: '',
      valueList: [],
      payM: false,
      payD: false,
      unserName: '',
      carProductCd: '',
      fileAddress: '', // 20190409013540564zOLYy',
      selectedName: '',
      form: {
        partnerId: '',
        partnerNm: '',
        partnerNmStr: '',
        carProductCd: '',
        earnestMoney: 0,
        financialServicesModel: '',
        orderPay: '',
        productColor:localStorage.getItem('Changecolor'),
        productCd: '',
        partnerLinkPhone: '',
        onSale: ''
      },
      onSale: '',
      price: localStorage.getItem('Changeprice'),
      swiperLength: ''
    }
  },
  beforeRouteLeave( to,from,next){
    next()
  },
  computed: {
    onSale1: function () {
      if (this.showAll1 === false) {
        var show1List = []
        if (this.onSale1list.length > 2) {
          for (var i = 0; i < 2; i++) {
            show1List.push(this.onSale1list[i])
          }
        } else {
          show1List = this.onSale1list
        }
        return show1List
      } else {
        return this.onSale1list
      }
    },
    onSale2: function () {
      if (this.showAll2 === false) {
        var show2List = []
        if (this.onSale2list.length > 2) {
          for (var i = 0; i < 2; i++) {
            show2List.push(this.onSale2list[i])
          }
        } else {
          show2List = this.onSale2list
        }
        return show2List
      } else {
        return this.onSale2list
      }
    },
    word1: function () {
      if (this.onSale1list.length > 2) {
        if (this.showAll1 === false) {
          return '展开更多'
        } else {
          return '点击收起'
        }
      } else {
        return ''
      }
    },
    word2: function () {
      if (this.onSale2list.length > 2) {
        if (this.showAll2 === false) {
          return '展开更多'
        } else {
          return '点击收起'
        }
      } else {
        return ''
      }
    }
  },
  activated() {
    this.isdisable = false
    this.form.partnerId = localStorage.getItem('partnerId')
    this.form.partnerNmStr = this.getStr10(this.form.partnerNm)
    this.colortext = localStorage.getItem('Changecolor')
    this.paytext = localStorage.getItem('payment')
    this.financeService = localStorage.getItem('financeService')
    this.showFinance2=true
    this.payD = localStorage.getItem('payD')
    this.form.partnerNm = localStorage.getItem('partnerNm')
    this.form.partnerNmStr = this.getStr10(this.form.partnerNm)
    this.form.partnerLinkPhone = localStorage.getItem('partnerLinkPhone')
    this.carProductCd = localStorage.getItem('carProductCd')
    this.form.orderPay=localStorage.getItem('paymentcode')

  },
  mounted() {
    this.colortext = localStorage.getItem('Changecolor')
    this.paytext = localStorage.getItem('payment')
    this.financeService = localStorage.getItem('financeService')
    this.showFinance2=true
    this.payD = localStorage.getItem('payD')
    this.form.partnerId = localStorage.getItem('partnerId')
    this.form.partnerNm = localStorage.getItem('partnerNm')
    this.form.partnerNmStr = this.getStr10(this.form.partnerNm)
    this.form.partnerLinkPhone = localStorage.getItem('partnerLinkPhone')
    this.carProductCd = localStorage.getItem('carProductCd')
    this.form.orderPay=localStorage.getItem('paymentcode')
    let paramss = {
      carId: localStorage.getItem('carProductCd')
    }
    homeApi.ModelsInDetail(paramss).then(res => {
      if (res.data.code === '200') {
        this.list2 = res.data.carInfo
        this.fileAddress = res.data.carInfo.carProductPic
        this.form.carProductCd = res.data.carInfo.carProductCd
        this.form.earnestMoney = res.data.carInfo.earnestMoney
        this.form.productCd = res.data.carInfo.productCd
        this.form.onSale = res.data.carInfo.onSale
        this.getFinance()
        if (res.data.carInfo.isCollect) {
          this.collectSrc = collectSelect
          this.collectTxt = '取消收藏'
        }
      } else {
        Toast(res.data.msg)
      }
    }).catch(err => {
    })
    homeApi.selectColor(paramss).then(res => {
      if (res.data.code === '200') {
        this.list = res.data.list
        this.colorActions = res.data.list

      } else {
        Toast(res.data.msg)
      }
    }).catch(err => {
    })
    let Recommended = {
      isRecommend: '1'
    }
    homeApi.Recommended(Recommended).then(res => {
      this.Recommendedlist = res.data.page.list
    }).catch(err => {
    })
    let loadDataByType = {
      type: 'PAYMENT_TYPE'
    }
    homeApi.loadDataByType(loadDataByType).then(res => {
      this.payActions = res.data.list
    }).catch(err => {
    })
    this.getOnSale1List()
    this.getOnSale2List()
  },
  created() {
  },
  updated() {
    new Swiper('.swiper-container', {
      loop: true,
      slidesPerView: 3,
      centeredSlides: true,
      autoplay: true,
      speed: 2000,
      observer: true,
      observeParents: true,
      loopAdditionalSlides: 50
    })
  },

  methods: {
    beforeClosepay(action, done){
      if(action === 'confirm'){
          // 输入的是数字 正整数 小数点后两位
          var isnumber= /^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/
          if(!isnumber.test(this.money.payAmount)){
            Toast('请输入正整数的金额或者最大不超过两位小数的金额')
          }else{
            let data = {
              'id': this.payId,
              "payamount": this.money.payAmount
            }
            homeApi.orderPayOfBail(data).then(res => {
              if (res.data.code === '200') {
                Toast('预支付成功！')
                this.money = {}
                this.$router.push({path: '/orderlist', name: 'orderlist', params: {active: 1}})
              } else {
                Toast(res.data.msg)
              }
            })
            Toast('预支付成功！')
          }
        done()
      }else if (action === 'cancel') {
        this.money={}
        this.$router.push({path: '/orderlist', name: 'orderlist', params: {active: 1}})
        done()
      }
    },
    // 取消收藏
    cancelCollection () {
      let data = {
        collectType: '1',
        businessId: this.form.carProductCd
      }
      homeApi.cancelCollection(data).then(res => {
        if (res.data.code === '200') {
          this.collectSrc = collectGrey
          this.collectTxt = '收藏'
        } else {
          Toast(res.data.msg)
        }
      })
    },
    getStr10(value) {
      let str = value
      if (value !== undefined && value !== null && value !== '') {
        if (value.length > 13) {
          str = value.substring(0, 12) + '...'
        }
      }
      return str
    },
    toShow(value) {
      Toast(value)
    },
    onClickIcon() {
      Toast('点击图标')
    },
    onClickButton() {
      Toast('点击按钮')
    },
    parameter(carProductKind) {
      localStorage.setItem('carProductKind', carProductKind)
      this.$router.push({path: '/parameter'})
    },
    getFinance() {
      let dataF = {
        carProductCd: this.carProductCd
      }
      homeApi.getFinanceType(dataF).then(res => {
        if (res.data.code === '200') {
          this.financeActions = res.data.financeVo
        } else if (res.data.msg === '该车系无金融方案') {
          Toast('该车系无金融方案')
        } else {
          Toast(res.data.msg)
        }
      })
    },
    getOnSale1List() {
      let onSale = {
        type: '1',
        carSeries: localStorage.getItem('seriesId')
      }
      homeApi.getOnSaleList(onSale).then(res => {
        if (res.data.code === '200') {
          this.onSale1list = res.data.list
        } else {
          Toast(res.data.msg)
        }
      }).catch(err => {
      })
    },
    getOnSale2List() {
      let onSale1 = {
        type: '0',
        carSeries: localStorage.getItem('seriesId')
      }
      homeApi.getOnSaleList(onSale1).then(res => {
        if (res.data.code === '200') {
          this.onSale2list = res.data.list
        } else {
          Toast(res.data.msg)
        }
      }).catch(err => {
      })
    },
    addshopcar() {
      let tipErrorMsg = ''
      if (this.form.partnerId === undefined || this.form.partnerId === null || this.form.partnerId === '') {
        tipErrorMsg += '经销商不能为空  '
      }
      if ( localStorage.getItem('Changecolor') === undefined ||  localStorage.getItem('Changecolor') === null ||  localStorage.getItem('Changecolor')  === '') {
        tipErrorMsg += '颜色不能为空  '
      }
      if (tipErrorMsg !== undefined && tipErrorMsg !== null && tipErrorMsg !== '') {
        Toast(tipErrorMsg)
        return
      }
      let params = {
        carproductcd: this.form.carProductCd,
        productColor: localStorage.getItem('Changecolor'),
        financeId: this.form.financialServicesModel,
        partnerId: this.form.partnerId,
        paymentWay: this.form.orderPay,
        earnestMoney: this.form.earnestMoney
      }
      homeApi.addcar(params).then(res => {
        if (res.data.code === '200') {
          Toast('加入购物车成功')
        } else {
          Toast(res.data.msg)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    onSelectcolor(item) {
      this.colorshow = false
      this.changeImg(item)
      localStorage.setItem('Changecolor',item.name)
    },
    onSelect(item) {
      // 点击选项时默认不会关闭菜单，可以手动关闭
      this.show = false
      this.paytext = item.name
      localStorage.setItem('payment',item.name)
      if (item.name === '线上全款支付') {
        this.payM = false
        this.payD = false
      } else if (item.name === '订金-全款') {
        this.payM = true
        this.payD = false
      } else if (item.name === '贷款支付') {
        this.payM = true
        this.payD = true
        localStorage.setItem('payD',true)
      }
      this.form.orderPay = item.key
      localStorage.setItem('paymentcode',item.key)
    },
    onSelectFinance(item) {
      this.showFinance = false
      this.financeService = item.name
      this.form.financialServicesModel = item.id
      localStorage.setItem('financeService',this.financeService)
      localStorage.setItem('financeServiceid',item.id)
    },
    a() {
      this.payM = false
    },
    changeColor() {
      this.colorshow = true
    },
    changePay(item) {
      this.showFinance1= true
      this.show = true
      this.sheetPayVisible = !this.sheetPayVisible
    },
    changeFinance() {
      this.showFinance1 = true
      this.showFinance = true
      this.showFinance2=false
      this.sheetFinanceVisible = !this.sheetFinanceVisible
    },
    selectedPay() {
      this.sheetPayVisible = !this.sheetPayVisible
    },
    change() {
      this.sheetVisible = !this.sheetVisible
    },
    back() {
      this.$router.push({path: '/info', name: 'carplan'})
    },
    toNews() {
      this.$router.push('/message')
    },
    toCollect(name) {
      let userName = localStorage.getItem('username')
      if (userName === undefined || userName === null || userName === '') {
        Dialog.alert({
          title: '提示',
          message: '请先登录，再收藏'
        }).then(() => {
          this.$router.push('/home/login')
        })
        return
      }
      if (name === '收藏') {
        let data = {
          collectType: '1',
          businessId: this.form.carProductCd,
          collectName: this.form.productCd
        }
        homeApi.AddCollection(data).then(res => {
          if (res.data.code === '200') {
            this.collectSrc = collectSelect
            this.collectTxt = '取消收藏'
          } else {
            Toast(res.data.msg)
          }
        })
      } else {
        let data = {
          collectType: '1',
          businessId: this.form.carProductCd
        }
        homeApi.cancelCollection(data).then(res => {
          if (res.data.code === '200') {
            this.collectSrc = collectGrey
            this.collectTxt = '收藏'
          } else {
            Toast(res.data.msg)
          }
        })
      }
    },
    loan() {
      this.$router.push({path: '/calculate'})
    },
    toStores() {
      this.$router.push({path: '/carplan/morestores', name: 'morestores', params: {carProductCd: this.carProductCd}})
    },
    changeImg(item) {
      this.fileAddress = item.fileAddress
      this.selectedName = item.name
      this.colortext = item.name
      localStorage.setItem('Changecolor',item.name)
      localStorage.setItem('Changeprice',item.carProductPrice)
    },
    keepTwoDecimalFull(num) {
      let result = parseFloat(num)
      if (isNaN(result)) {
        Toast('传递参数错误，请检查！')
        return false
      }
      result = Math.round(num * 100) / 100
      let sx = result.toString()
      var posDecimal = sx.indexOf('.')
      if (posDecimal < 0) {
        posDecimal = sx.length
        sx += '.'
      }
      while (sx.length <= posDecimal + 2) {
        sx += '0'
      }
      return sx
    },
    toOrder() {
      let tipErrorMsg = ''
      if (this.form.orderPay === undefined || this.form.orderPay === null || this.form.orderPay === '') {
        tipErrorMsg += '支付方式不能为空  '
      }
      if (this.form.partnerId === undefined || this.form.partnerId === null || this.form.partnerId === '') {
        tipErrorMsg += '经销商不能为空  '
      }
      if (this.form.productColor === undefined || this.form.productColor === null || this.form.productColor === '') {
        tipErrorMsg += '颜色不能为空'
      }
      if (this.form.orderPay === '3' && (this.form.partnerId === undefined || this.form.partnerId === null || this.form.partnerId === '')) {
        tipErrorMsg += '金融服务不能为空'
      }
      if (tipErrorMsg !== undefined && tipErrorMsg !== null && tipErrorMsg !== '') {
        Toast(tipErrorMsg)
        return
      }
      let data = {
        carProductCd: this.form.carProductCd,
        earnestMoney: this.form.earnestMoney,
        orderPay: this.form.orderPay,
        partnerId: this.form.partnerId,
        productColor:  localStorage.getItem('Changecolor'),
        financialServicesModel: this.form.financialServicesModel
      }
      this.isdisable = true
      homeApi.addOrder(data).then(res => {
        if (res.data.code === '200') {
          this.isdisable = false
          this.payId=res.data.id
          // 1 全款支付  线上全款支付  2 订金+全款支付  3  贷款支付
          this.paydialog=true
          // 总金额
          if(this.form.orderPay=='1'){
            this.money.totalAmount=(this.keepTwoDecimalFull(Number(localStorage.getItem('Changeprice')*10000)))
            this.money.payAmount=this.money.totalAmount
          }else if(this.form.orderPay=='2'){
            this.money.totalAmount=(this.form.earnestMoney)
            this.money.payAmount=this.money.totalAmount
          }
        }else{
          Toast(res.data.msg)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    changeSaleTab(type) {
      if (type === '1') {
        this.getOnSale1List()
      } else if (type === '0') {
        this.getOnSale2List()
      }
    },
    toLinkStore() {
      if (this.form.partnerLinkPhone === undefined || this.form.partnerLinkPhone === null || this.form.partnerLinkPhone ==='') {
        Toast('请先选择销售商')
      } else {
        let msgCon = this.form.partnerLinkPhone
        Dialog.confirm({
          title: '咨询电话',
          message: msgCon,
          confirmButtonText: '拨打'
        }).then(() => {
          // on confirm
          window.location.href = 'tel:' + msgCon
        }).catch(() => {
          // on cancel
        })
      }
    }
  }
}
</script>

<style scoped lang="less">
@import "~styles/index.less";
@import "~styles/variable.less";
  .carplan {
    width: 100%;
    height: auto;
    .fs(30);
    box-sizing: border-box;
    background-color: #ffffff;
    .paydialog{
      height: 4.5rem!important;
      .payli{
        display: flex;
        line-height: 1rem;
        color: red;
        padding-right: 0.3rem ;
        width: 8rem!important;
      }
      .van-cell{
        height: 1rem !important;
        line-height: 1rem!important;
        padding-left: 0.3rem!important;
        text-align: left!important;
        .van-field__label {
          max-width: 104px!important;
        }

      }
    }
    .header {
      width: 100%;
      height: 1.35rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #fff;
      border-bottom: 1px solid #dedede;
      padding: 0 0.2rem 0 0;
      li:first-child {
        .van-icon{
          font-size: 0.6rem;
        }
        .icon-back {
          position: absolute;
          display: inline-block;
          .w(50);
          .h(50);
          .left(25);
          .top(25);
          background: url("../../assets/image/back.png") center no-repeat;
          background-size: 0.32rem 0.5rem;
        }
      }

      li {
        .input-box {
          position: relative;
          width: 92%;
          margin-left: 4%;
          .pl(30);
          .pr(30);
          .icon {
            position: absolute;
            display: inline-block;
            .w(30);
            .h(30);
            top: 53%;
            .mt(-18);
            .left(50);
            background-image: url("../../assets/image/search-f.png");
            background-size: cover;
          }

          .search {
            background-color: #f7f3f8;
            .b-radius(58);
            .lh(65);
            width: 100%;
            outline: none;
            .pl(65);
            .pr(65);
            .fs(30);
          }
        }
      }

      li:last-child {
        .van-icon{
          font-size: 0.54rem;
        }
        .header-right {
          position: absolute;
          display: inline-block;
          .w(50);
          .h(50);
          .right(25);
          .top(25);
          background: url("../../assets/image/message.png") center no-repeat;
          background-size: 0.6rem 0.6rem;
        }
      }
    }

    .content-box {
      width: 100%;
      li {
        width: 100%;
        height: auto;
        position: relative;
        .chose{
          position: absolute;
          top: 1.5rem;
          right: 0.5rem;
          z-index: 100;
          color: #fff;
          p{
            height: 0.7rem;
            width: 1.5rem;
            border-radius: 1rem;
            line-height: 0.7rem;
            background-color: rgba(237,202,202,0.7);
          }
          p:nth-child(2){
            margin-top: 0.3rem;
            margin-bottom: 0.3rem;
          }
          p:nth-child(3){
            margin-bottom: 0.3rem;
          }
        }
        .price{
          width: 100%;
          display: flex;
          justify-content: space-between;
          padding-right: 0.4rem;
        }
        .display {
          color: #666;
          line-height: 0.8rem;
          width: 100%;
          display: flex;
          justify-content: space-between;
          padding-right: 0.4rem;

          .display-color {
            color: #FF3202;
            font-weight: 600;
          }
        }
        .mint-button {
          height: 1.2rem;
          margin-top: 0.2rem;
          margin-bottom: 0.2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #F47442;
        }
        .check {
          width: 100%;
          display: flex;
          justify-content: flex-start;
          line-height: 0.8rem;
          span {
            color: #000;
          }
          span:nth-child(2){
            padding-left: 0.35rem;
          }
        }
        .way1{
          width: 100%;
          text-align: left;
        }
        .way {
          width: 100%;
          display: flex;
          justify-content: space-between;
          padding-right: 0.4rem;
          color: #666;
          line-height: 0.8rem;
          span {
            height: 0.7rem;
            display: flex;
            flex-wrap: nowrap;
            align-items: center;
            justify-content: center;
          }
        }
        img {
          width: 100%;
          height: 100%;
        }
          .color {
            position: absolute;
            bottom: 4.9rem;
            left:50%;
            z-index: 100;

            .color-center{
              position: relative;
              left: -50%;
              bottom: 0.5rem;
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
        .type {
          width: 100%;
          display: flex;
          justify-content: space-between;
          padding-right: 0.4rem;
          margin-bottom: 0.2rem;
          margin-top: 0.5rem;
          position: relative;
          >div{
            display: flex;
            justify-content: center;
            flex-direction: column;
            align-items: center;
            position: absolute;
            top: -0.45rem;
            right: 0.5rem;
            width: 2rem;
            height: 1.7rem;
            box-shadow: 5px 5px 5px  #C8C8C8;
            -webkit-transform: scale(0.8);
            img{
              width: 1rem;
              height: 1rem;
            }
          }
          span {
            font-size: 0.45rem;
            font-weight: 600;
          }
          span:nth-child(2) {
            color: #FE5330;
          }

        }
      }

      li:last-child {
        .pb(10);
      }
    }

    .line-f {
      .h(20);
      background-color: #f5f5f5;
    }

    .choose-box {
      padding-left: 0.4rem;
      padding-right: 0.4rem;

      .choose-btn {
        background: #FD8E41;
        color: #fff;
        .mb(20);
      }

      .deposit {
        height: 1.25rem;
        line-height: 1.25rem;
      }

      .choose-color {
        width: 100%;
        height: 1.25rem;
        align-items: center;
        border-bottom: 1px solid #f5f5f5;
        text-align: left;
        li{
          width:20%;
          line-height: 1.25rem;
          display: inline-block;
        }
        .textC{
          display: inline-block;
          line-height: 1.25rem;
          width:57%;
        }
        .chooseSpan {
          line-height: 1.25rem;
          display: inline-block;
          text-align: center;
          width:20%;
        }
        .more {
          width: 100%!important;
          border: 1px solid #F86300;
          color: #F86300;
          display: inline!important;
          text-align: center!important;
          border-radius: 0.1rem;
          padding: 0.15rem 2px;
        }
      }
      .choose-Finance {
        width: 100%;
        height: 1.25rem;
        align-items: center;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #f5f5f5;
        position: relative;
        .textF {
          position:absolute;left:2.5rem;
        }
        .textS {
          position:absolute;right: 2.2rem;
        }
        .more {
          border: 1px solid #FFB887;
          color: #F86300;
          display: inline-block;
          width: 2rem;
          height: 0.7rem;
          line-height: 0.7rem;
          border-radius: 0.1rem;
        }
      }
    }

    .tab {
      width: 100%;
      height: auto;
      .mint-tab-item-label {
        span {
          .fs(30);
        }
      }
      .mint-navbar .mint-tab-item.is-selected {
        margin-bottom: 0;
      }
      .mint-tab-container-item {
        position: relative;
        background-color: #f5f5f5;

        .text {
          color: #888888;
          .mb(30);
        }
        li {
          background-color: #ffffff;
          height: 2.8rem;
          padding: 0.4rem;
          .mb(20);
          color: #898989;
          border-radius: 4px;
          .tab-title {
            color: #000;
          }
          div {
            height: 0.7rem;
            display: flex;
            justify-content: space-between;
            .price {
              color: #FF1E00;
              font-weight: 600;
            }
            div:nth-child(1) {
              span {
                width: 20%;
                display: inline-block;
              }
            }
          }
        }
      }
      .content-tab {
        .margin(30, 30);
        background-color: #fff;
        .padding(30, 30);
        text-align: left;
        border-radius: 5px;
        padding-bottom: 1rem;
        .content-bg {
          font-size: 16px;
          align-items: center;
          height: 2.1rem;
        }

        p {
          height: 0.7rem;
          display: flex;
          align-items: center;
          color: #666;
          justify-content: space-between;

          i {
            font-style: normal
          }
        }

        .mint-tab-item-label a {
          color: #333 !important;
        }
      }
      .tipNull{
        padding:0.4rem 0;
        img{ width:40%; }
        p{color: #999999;.fs(28)}
      }
    }
    .Recommended {
      width: 100%;
      height: auto;
      > h4 {
        color: #FF5D00;
        font-weight: 600;
        display: flex;
        justify-content: flex-start;
        padding-left: 0.4rem;
        .h(90);
        .lh(90);
        background-color: #ffffff;
        .fs(35);
      }
      .Recommended-swiper {
        .pt(25);
        .pl(30);
        .pr(30);
        .pt(25);
        background-color: #f5f5f5;
        padding-bottom: 1.7rem;
        width: 100%;
        height: 5.6rem;
        .swiper-wrapper {
          width: 100%;
          .swiper-slide {
            width: 40%;
            height: 3.4rem;
            display: flex;
            justify-content: space-between;
            flex-direction: column;
            align-items: center;
            background: #fff;
            padding-bottom: 0.3rem;
            p:nth-child(3) {
              color: #FF4014;
            }
            img {
              margin-top: 0.3rem;
              margin-bottom: 0.2rem;
              width: 3rem;
              height: 2rem;
            }
          }
        }
      }
    }
    body {
      padding-bottom: constant(safe-area-inset-bottom);
    }
    @supports (bottom: env(safe-area-inset-bottom)) {
      .fixedfooter {
        margin-bottom: env(safe-area-inset-bottom);
        padding-bottom: env(safe-area-inset-bottom);
      }
    }
    .fixedfooter {
      margin-bottom: constant(safe-area-inset-bottom);
      padding-bottom: constant(safe-area-inset-bottom);
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: fixed;
      bottom: 0;
      left: 0;
      background: #fff;
      z-index: 1;
      li:first-child {
        .w(150);
        border-right: 1px solid #f9f9f9;
        img {
          .w(40);
          .mt(0);
        }
        span {
          .fs(28)
        }
      }
      li {
        .w(150);
        img {
          .w(40);
          margin-bottom: -0.1rem;
        }
        span {
          .fs(28)
        }
      }
      .shopcar {
        height: 100%;
        width: 37%;
        color: #fff;
        line-height: 1.4rem;
        background: #FFB016;
        border:none;
        outline: none;
      }
      button:last-child {
        height: 100%;
        width: 37%;
        color: #fff;
        line-height: 1.4rem;
        background: #FC8328;
        outline: none;
        border: none;
      }
    }
    .carplan-text{
      padding-left: 0.3rem;
    }
  }
</style>
