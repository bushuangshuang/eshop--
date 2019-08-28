<template>
  <div class="orderlist-box">
    <common-header :tittle="tittle" :showleft="true" :showright="true" :routerLeft="routerLeft"></common-header>
    <div class="orderlist-tab">
      <van-tabs @click="tabChange(active)"  v-model="active" >
        <van-tab title="全部">
          <div class="orderlist-date">
            <li>选择日期</li>
            <li @click="popupBegin">
              <span class="text-time">{{yearBegin}}{{monthBegin}}{{dateBegin}}</span>
              <van-popup v-model="showBegin" position="bottom" :overlay="false">
                <van-datetime-picker
                  v-model="currentDateBegin"
                  type="date"
                  @confirm="selectedBegin(currentDateBegin)"
                  :formatter="formatter"
                />
              </van-popup>
              <span></span> <span></span><img src="../../assets/image/date.png" alt="">
            </li>
            <li><p></p></li>
            <li @click="popupEnd">
              <span class="text-time">{{yearEnd}}{{monthEnd}}{{dateEnd}}</span>
              <van-popup v-model="showEnd" position="bottom" :overlay="false">
                <van-datetime-picker
                  v-model="currentDateEnd"
                  type="date"
                  @confirm="selectedEnd(currentDateEnd)"
                  :min-date="minDateEnd"
                  :formatter="formatter"
                />
              </van-popup>
              <span></span> <span></span><img src="../../assets/image/date.png" alt="">
            </li>
            <li @click="toSearch(active)">查询</li>
          </div>
          <div class="order-list">
            <common-order-block
              :orderList="order1List"
              @on-to-pay="toPay"
              @on-to-apply-refund="toApplyRefund"
              @on-friend="friend"
              @on-to-order-info="toOrderInfo"
              @on-to-revoke="toRevoke"
              @on-to-order-usercar="touserTesting"
            >
            </common-order-block>
          </div>
        </van-tab>
        <van-tab title="待付款">
          <div class="orderlist-date">
            <li>选择日期</li>
            <li @click="popupBegin">
              <span class="text-time">{{yearBegin}}{{monthBegin}}{{dateBegin}}</span>
              <van-popup v-model="showBegin" position="bottom" :overlay="false">
                <van-datetime-picker
                  v-model="currentDateBegin"
                  type="date"
                  @confirm="selectedBegin(currentDateBegin)"
                  :formatter="formatter"
                />
              </van-popup>
              <span></span> <span></span><img src="../../assets/image/date.png" alt="">
            </li>
            <li><p></p></li>
            <li @click="popupEnd">
              <span class="text-time">{{yearEnd}}{{monthEnd}}{{dateEnd}}</span>
              <van-popup v-model="showEnd" position="bottom" :overlay="false">
                <van-datetime-picker
                  v-model="currentDateEnd"
                  type="date"
                  @confirm="selectedEnd(currentDateEnd)"
                  :min-date="minDateEnd"
                  :formatter="formatter"
                />
              </van-popup>
              <span></span> <span></span><img src="../../assets/image/date.png" alt="">
            </li>
            <li @click="toSearch(active)">查询</li>
          </div>
          <div class="order-list">
            <common-order-block
              :orderList="order2List"
              @on-to-pay="toPay"
              @on-to-order-info="toOrderInfo"
              @on-to-order-userTesting="touserTesting"
              @on-to-delete-order="deleteOrder"
            >
            </common-order-block>
          </div>
        </van-tab>
        <van-tab title="备车中">
          <div class="orderlist-date">
            <li>选择日期</li>
            <li @click="popupBegin">
              <span class="text-time">{{yearBegin}}{{monthBegin}}{{dateBegin}}</span>
              <van-popup v-model="showBegin" position="bottom" :overlay="false">
                <van-datetime-picker
                  v-model="currentDateBegin"
                  type="date"
                  @confirm="selectedBegin(currentDateBegin)"
                  :formatter="formatter"
                />
              </van-popup>
              <span></span> <span></span><img src="../../assets/image/date.png" alt="">
            </li>
            <li><p></p></li>
            <li @click="popupEnd">
              <span class="text-time">{{yearEnd}}{{monthEnd}}{{dateEnd}}</span>
              <van-popup v-model="showEnd" position="bottom" :overlay="false">
                <van-datetime-picker
                  v-model="currentDateEnd"
                  type="date"
                  @confirm="selectedEnd(currentDateEnd)"
                  :min-date="minDateEnd"
                  :formatter="formatter"
                />
              </van-popup>
              <span></span> <span></span><img src="../../assets/image/date.png" alt="">
            </li>
            <li @click="toSearch(active)">查询</li>
          </div>
          <div class="order-list">
            <common-order-block
              :orderList="order3List"
              @on-to-apply-refund="toApplyRefund"
              @on-to-order-info="toOrderInfo"
            >
            </common-order-block>
          </div>
        </van-tab>
        <van-tab title="线下验车">
          <div class="orderlist-date">
            <li>选择日期</li>
            <li @click="popupBegin">
              <span class="text-time">{{yearBegin}}{{monthBegin}}{{dateBegin}}</span>
              <van-popup v-model="showBegin" position="bottom" :overlay="false">
                <van-datetime-picker
                  v-model="currentDateBegin"
                  type="date"
                  @confirm="selectedBegin(currentDateBegin)"
                  :formatter="formatter"
                />
              </van-popup>
              <span></span> <span></span><img src="../../assets/image/date.png" alt="">
            </li>
            <li><p></p></li>
            <li @click="popupEnd">
              <span class="text-time">{{yearEnd}}{{monthEnd}}{{dateEnd}}</span>
              <van-popup v-model="showEnd" position="bottom" :overlay="false">
                <van-datetime-picker
                  v-model="currentDateEnd"
                  type="date"
                  @confirm="selectedEnd(currentDateEnd)"
                  :min-date="minDateEnd"
                  :formatter="formatter"
                />
              </van-popup>
              <span></span> <span></span><img src="../../assets/image/date.png" alt="">
            </li>
            <li @click="toSearch(active)">查询</li>
          </div>
          <div class="order-list">
            <common-order-block
              :orderList="order4List"
              @on-to-apply-refund="toApplyRefund"
              @on-to-order-info="toOrderInfo"
              @on-to-order-usercar="touserTesting"
            >
            </common-order-block>
          </div>
        </van-tab>
        <van-tab title="已取消">
          <div class="orderlist-date">
            <li>选择日期</li>
            <li @click="popupBegin">
              <span class="text-time">{{yearBegin}}{{monthBegin}}{{dateBegin}}</span>
              <van-popup v-model="showBegin" position="bottom" :overlay="false">
                <van-datetime-picker
                  v-model="currentDateBegin"
                  type="date"
                  @confirm="selectedBegin(currentDateBegin)"
                  :formatter="formatter"
                />
              </van-popup>
              <span></span> <span></span><img src="../../assets/image/date.png" alt="">
            </li>
            <li><p></p></li>
            <li @click="popupEnd">
              <span class="text-time">{{yearEnd}}{{monthEnd}}{{dateEnd}}</span>
              <van-popup v-model="showEnd" position="bottom" :overlay="false">
                <van-datetime-picker
                  v-model="currentDateEnd"
                  type="date"
                  @confirm="selectedEnd(currentDateEnd)"
                  :min-date="minDateEnd"
                  :formatter="formatter"
                />
              </van-popup>
              <span></span> <span></span><img src="../../assets/image/date.png" alt="">
            </li>
            <li @click="toSearch(active)">查询</li>
          </div>
          <div class="order-list">
            <common-order-block
              :orderList="order5List"
              @on-to-order-info="toOrderInfo"
            >
            </common-order-block>
          </div>
        </van-tab>
        <van-tab title="申请退款">
          <div class="orderlist-date">
            <li>选择日期</li>
            <li @click="popupBegin">
              <span class="text-time">{{yearBegin}}{{monthBegin}}{{dateBegin}}</span>
              <van-popup v-model="showBegin" position="bottom" :overlay="false">
                <van-datetime-picker
                  v-model="currentDateBegin"
                  type="date"
                  @confirm="selectedBegin(currentDateBegin)"
                  :formatter="formatter"
                />
              </van-popup>
              <span></span> <span></span><img src="../../assets/image/date.png" alt="">
            </li>
            <li><p></p></li>
            <li @click="popupEnd">
              <span class="text-time">{{yearEnd}}{{monthEnd}}{{dateEnd}}</span>
              <van-popup v-model="showEnd" position="bottom" :overlay="false">
                <van-datetime-picker
                  v-model="currentDateEnd"
                  type="date"
                  @confirm="selectedEnd(currentDateEnd)"
                  :min-date="minDateEnd"
                  :formatter="formatter"
                />
              </van-popup>
              <span></span> <span></span><img src="../../assets/image/date.png" alt="">
            </li>
            <li @click="toSearch(active)">查询</li>
          </div>
          <div class="order-list">
            <common-order-block
              :orderList="order6List"
              @on-to-revoke="toRevoke"
              @on-to-order-info="toOrderInfo"
            >
            </common-order-block>
          </div>
        </van-tab>
        <van-tab title="已完成">
          <div class="orderlist-date">
            <li>选择日期</li>
            <li @click="popupBegin">
              <span class="text-time">{{yearBegin}}{{monthBegin}}{{dateBegin}}</span>
              <van-popup v-model="showBegin" position="bottom" :overlay="false">
                <van-datetime-picker
                  v-model="currentDateBegin"
                  type="date"
                  @confirm="selectedBegin(currentDateBegin)"
                  :formatter="formatter"
                />
              </van-popup>
              <span></span> <span></span><img src="../../assets/image/date.png" alt="">
            </li>
            <li><p></p></li>
            <li @click="popupEnd">
              <span class="text-time">{{yearEnd}}{{monthEnd}}{{dateEnd}}</span>
              <van-popup v-model="showEnd" position="bottom" :overlay="false">
                <van-datetime-picker
                  v-model="currentDateEnd"
                  type="date"
                  @confirm="selectedEnd(currentDateEnd)"
                  :min-date="minDateEnd"
                  :formatter="formatter"
                />
              </van-popup>
              <span></span> <span></span><img src="../../assets/image/date.png" alt="">
            </li>
            <li @click="toSearch(active)">查询</li>
          </div>
          <div class="order-list">
            <common-order-block
              :orderList="order7List"
              @on-friend="friend"
              @on-to-order-info="toOrderInfo"
            >
            </common-order-block>
          </div>
        </van-tab>
      </van-tabs>
      <van-dialog v-model="showFriend" show-cancel-button :before-close="beforeClose" confirm-button-text="推送" >
        <van-field v-model="username" label="姓名" placeholder="请输入姓名"  class="dialog-inp" />
        <van-field v-model="tel" type="phone" label="手机号" placeholder="请输入手机号" class="dialog-inp" />
      </van-dialog>
      <van-dialog v-model="withdrawtext" :before-close="closewithdraw" show-cancel-button>
        <van-cell-group>
          <van-field
            v-model="withdrawtextt"
            type='textarea'
            placeholder="请输入退款理由"
          />
      </van-cell-group>
      </van-dialog>
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
  </div>
</template>

<script>
import imgsrc from '../../assets/image/defaltcar.png'
import * as homeApi from '../../api/home-api'
import { Dialog, Toast } from 'vant'
import { imgFileUrl } from '../../apiconfig/index'
import commonHeader from 'common/common-header'
import commonOrderBlock from 'common/common-order-block'
import Link from 'iview/src/mixins/link'
export default {
  name: 'orderlist',
  components: {
    Link,
    commonHeader, commonOrderBlock
  },
  data() {
    return {
      money:{
        totalAmount:'',
        amountPaid:'',
        payAmount:''
      },
      Payid:'',
      Paystatus:'',
      payamount:'',
      orderMoney:'',
      countAmountPaid:'',
      countDepositPaid:'',
      paydialog:false,
      active: this.$route.params.active || 0,
      routerLeft: '/day',
      tittle: '我的订单',
      pickerVisibleEnd: '',
      pickerVisibleBegin: '',
      isclickedEnd: false,
      isclickedBegin: false,
      yearBegin: '',
      monthBegin: '',
      dateBegin: '',
      yearEnd: '',
      monthEnd: '',
      dateEnd: '',
      imgFileUrl: imgFileUrl,
      showBegin: false,
      showEnd: false,
      currentDateBegin: new Date(),
      currentDateEnd: new Date(),
      minDateEnd: new Date(),
      imgsrc: imgsrc,
      orderStatusOption: [],
      order1List: [],
      order2List: [],
      order3List: [],
      order4List: [],
      order5List: [],
      order6List: [],
      order7List: [],
      page: {
        pageNumber: 1,
        pageSize: 1000000
      },
      search: {
        orderBeginTime: '',
        orderEndTime: ''
      },
      showFriend: false,
      username: '',
      tel: '',
      withdrawtext: false,
      withdrawtextt: '',
      revokeid: '',
      orderFlowNo: '',
      refundid:'',
      orderId:''
    }
  },
  created() {
    this.getLoadDataByType()
    this.toSearch(this.active)
  },
  methods: {
    onClose(clickPosition, instance) {
      switch (clickPosition) {
        case 'cell':
        case 'outside':
          instance.close()
          break
      }
    },
    deleteOrder({id}) {
      Dialog.confirm({
        title: '确定删除吗'
      }).then(() => {
        let params = {
          id: id
        }
        homeApi.deleteorder(params).then(res => {
          this.getTab2List()
        }).catch(err => {
          console.log(err)
        })
      })
    },
    touserTesting(id) {
      for(var i in id){
        this.orderId=id[i]
      }
      localStorage.setItem('orderId',this.orderId)
      localStorage.setItem('orderTitle','1')
      if(this.orderId===null ||this.orderId===undefined ||this.orderId===''){
        Dialog.alert({
          message: '系统异常请稍后重试'
        }).then(() => {})
        return
      }else {
        this.$router.push({path: '/orderinfo', name: 'orderinfo', params: {checkCar: true}})
      }
    },
    // 点击进入订单详情
    toOrderInfo({id}) {
      localStorage.setItem('orderId',id)
      localStorage.setItem('orderTitle','2')
      if(id===null ||id===undefined ||id===''){
        Dialog.alert({
          message: '系统异常请稍后重试'
        }).then(() => {})
        return
      }else {
        this.$router.push({path: '/orderinfo', name: 'orderinfo', params: {orderId: id, checkCar: true,active:this.active}})
      }
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

    // 继续付款
    toPay({ item }) {
      this.Payid=item.id
      this.Paystatus=item.orderStatus
      if(item.orderStatus === 6 || this.Paystatus === 11){
        let orderMoney=(!!item.orderMoney?this.keepTwoDecimalFull(Number(item.orderMoney)*10000):item.orderMoney)
        this.money.totalAmount = orderMoney
        this.money.amountPaid = item.countAmountPaid
       if(!!item.countAmountPaid){
         this.money.payAmount=(!!orderMoney&&!!item.countAmountPaid)?(this.keepTwoDecimalFull(Number(orderMoney)-Number(item.countAmountPaid))):''
       }else{
         this.money.payAmount=orderMoney
       }
        this.paydialog=true
      } else if (item.orderStatus === 8){
        let earnestMoney = !!item.earnestMoney?item.earnestMoney:item.earnestMoney
        this.money.totalAmount = earnestMoney
        this.money.amountPaid = item.countDepositPaid
        if(!!this.money.amountPaid){
          this.money.payAmount=(!!earnestMoney && !!item.countDepositPaid)?(this.keepTwoDecimalFull(Number(earnestMoney)-Number(item.countDepositPaid))):''
        }else{
          this.money.payAmount=earnestMoney
        }
        this.paydialog=true
      } else if (this.Paystatus === 7 ) {
        let data = {
          'id': this.Payid.toString(),
          'payamount':item.orderMoney
        }
        homeApi.orderPayOfBalance(data).then(res => {
          if (res.data.code === '200') {
            Toast('预支付成功！')
            this.toSearch(this.active)
          } else {
            Toast(res.data.msg)
          }
        })
      }
    },
    // 撤销申请
    toRevoke({id}) {
      this.revokeid = id
      let params = {
        id: this.revokeid
      }
      homeApi.revoke(params).then(res => {
        if (res.data.code === '200') {
          Toast('撤销成功')
        } else {
          Toast(res.data.msg)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`
      } else if (type === 'month') {
        return `${value}月`
      } else if (type === 'day') {
        return `${value}日`
      }
      return value
    },
    popupBegin () {
      if (!this.showBegin) {
        this.currentDateBegin = new Date()
        this.showBegin = true
      } else {
        this.showBegin = false
      }
    },
    popupEnd() {
      if (this.yearBegin == undefined || this.yearBegin == null || this.yearBegin == '') {
        Dialog.alert({
          message: '请先选择开始时间'
        }).then(() => {})
        return
      }
      if (!this.showEnd) {
        this.currentDateEnd = this.minDateEnd
        this.showEnd = true
      } else {
        this.showEnd = false
      }
    },
    selectedBegin(value) {
      if (value == undefined && value == null && value == '') {
        value = new Date()
      }
      this.minDateEnd = value
      this.yearBegin = value.getFullYear()
      let month1 = value.getMonth() + 1
      this.monthBegin = '/' + (month1.toString().length == 1 ? '0' + month1 : month1)
      let date1 = value.getDate()
      this.dateBegin = '/' + (date1.toString().length == 1 ? '0' + date1 : date1)
      this.search.orderBeginTime = value
    },
    selectedEnd(value) {
      if (value == undefined && value == null && value == '') {
        value = this.minDateEnd
      }
      this.yearEnd = value.getFullYear()
      let month1 = value.getMonth() + 1
      this.monthEnd = '/' + (month1.toString().length == 1 ? '0' + month1 : month1)
      let date1 = value.getDate()
      this.dateEnd = '/' + (date1.toString().length == 1 ? '0' + date1 : date1)
      this.search.orderEndTime = value
    },
    getLoadDataByType() {
      let data = {
        type: 'ORDER_STATUS'
      }
      homeApi.loadDataByType(data).then(res => {
        if (res.data.code === '200') {
          this.orderStatusOption = res.data.list
        } else {
          Toast(res.data.msg)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getTab1List() {
      let data = {
        orderBegintime: this.search.orderBeginTime,
        orderEndtime: this.search.orderEndTime,
        pageNumber: this.page.pageNumber,
        pageSize: this.page.pageSize
      }
      homeApi.orderList(data).then(res => {
        if (res.data.code === '200') {
          this.order1List = res.data.page.list
        } else if(this.order1List.length>=1){
          this.loading=false
        }else{
          Toast(res.data.msg)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getTab2List() { // 未付款
      let data = {
        orderStatus: '6,7,8,11',
        orderBegintime: this.search.orderBeginTime,
        orderEndtime: this.search.orderEndTime,
        pageNumber: this.page.pageNumber,
        pageSize: this.page.pageSize
      }
      homeApi.orderList(data).then(res => {
        if (res.data.code === '200') {
          this.order2List = res.data.page.list
        } else {
          Toast(res.data.msg)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getTab3List() { // 备车中
      let data = {
        orderStatus: '2',
        orderBegintime: this.search.orderBeginTime,
        orderEndtime: this.search.orderEndTime,
        pageNumber: this.page.pageNumber,
        pageSize: this.page.pageSize
      }
      homeApi.orderList(data).then(res => {
        if (res.data.code === '200') {
          this.order3List = res.data.page.list
        } else {
          Toast(res.data.msg)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getTab4List() { // 线下验车
      let data = {
        orderStatus: '3,4',
        orderBegintime: this.search.orderBeginTime,
        orderEndtime: this.search.orderEndTime,
        pageNumber: this.page.pageNumber,
        pageSize: this.page.pageSize
      }
      homeApi.orderList(data).then(res => {
        if (res.data.code === '200') {
          this.order4List = res.data.page.list
        } else {
          Toast(res.data.msg)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getTab5List() { // 已取消
      let data = {
        orderStatus: '12',
        orderBegintime: this.search.orderBeginTime,
        orderEndtime: this.search.orderEndTime,
        pageNumber: this.page.pageNumber,
        pageSize: this.page.pageSize
      }
      homeApi.orderList(data).then(res => {
        if (res.data.code === '200') {
          this.order5List = res.data.page.list
        } else {
          Toast(res.data.msg)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getTab6List() { // 申请退款
      let data = {
        orderStatus: '14,15',
        orderBegintime: this.search.orderBeginTime,
        orderEndtime: this.search.orderEndTime,
        pageNumber: this.page.pageNumber,
        pageSize: this.page.pageSize
      }
      homeApi.orderList(data).then(res => {
        if (res.data.code === '200') {
          this.order6List = res.data.page.list
        } else {
          Toast(res.data.msg)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getTab7List() { // 已完成
      let data = {
        orderStatus: '10',
        orderBegintime: this.search.orderBeginTime,
        orderEndtime: this.search.orderEndTime,
        pageNumber: this.page.pageNumber,
        pageSize: this.page.pageSize
      }
      homeApi.orderList(data).then(res => {
        if (res.data.code === '200') {
          this.order7List = res.data.page.list
        } else {
          Toast(res.data.msg)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    toSearch(active) {
      if (active === 0) {
        this.getTab1List()
      } else if (active === 1) {
        this.getTab2List()
      } else if (active === 2) {
        this.getTab3List()
      } else if (active === 3) {
        this.getTab4List()
      } else if (active === 4) {
        this.getTab5List()
      } else if (active === 5) {
        this.getTab6List()
      } else if (active === 6) {
        this.getTab7List()
      }
    },
    tabChange() {
      this.isShows=false
      this.search.orderEndTime = ''
      this.search.orderBeginTime = ''
      this.currentDateBegin = ''
      this.currentDateEnd = ''
      this.yearBegin = ''
      this.monthBegin = ''
      this.dateBegin = ''
      this.yearEnd = ''
      this.monthEnd = ''
      this.dateEnd = ''
      this.toSearch(this.active)
    },
    friend({ orderFlowNo }) {
      this.showFriend = true
      this.orderFlowNo = orderFlowNo

    },
    closewithdraw(action, done) {
      if (action === 'confirm') {
        if(this.withdrawtextt===null||this.withdrawtextt===undefined||this.withdrawtextt===''){
          Toast('申请理由不能为空')
        }else{
         let params = {
           id: this.refundid,
           applyRefundReason:this.withdrawtextt
        }
        homeApi.drawback(params).then(res => {
          if (res.data.code === '200') {
            Toast('撤销退款成功')
            this.active = 5
            this.getTab6List()
          }
        }).catch(err => {
          console.log(err)
        })

        }
        done()
      }else if(action === 'cancel'){
        done()
      }

    },
    beforeClosepay(action, done){
      if(action === 'confirm'){
        if (this.Paystatus === 6 || this.Paystatus === 8 || this.Paystatus === 11) {
          // 输入的是数字 正整数 小数点后两位
          var isnumber= /^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/
          if(!isnumber.test(this.money.payAmount)){
            Toast('请输入正整数的金额或者最大不超过两位小数的金额')
          }else{
            let data = {
                    'id': this.Payid.toString(),
                    "payamount": this.money.payAmount
                  }
                  homeApi.orderPayOfBail(data).then(res => {
                    if (res.data.code === '200') {
                      Toast('预支付成功！')
                      this.money = {}
                      this.toSearch(this.active)
                    } else {
                      Toast(res.data.msg)
                    }
                  })
            Toast('预支付成功！')
          }
        }
        done()
      }else if (action === 'cancel') {
        this.money={}
        done()
      }
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
          businessId: this.orderFlowNo.toString()
        }
        homeApi.tShoppingCart(data).then(res => {
          if (res.data.code === '200') {
            done()
            Toast('好友推荐成功')
          } else {
            done()
            Toast(res.data.msg)
          }
        })
      } else if (action === 'cancel') {
        this.username = ''
        this.tel = ''
        this.orderFlowNo = ''
        done() // 关闭
      }
    },
    toApplyRefund({ id}) {
      this.refundid=id
      this.withdrawtext = true
    }
  }
}
</script>

<style scoped lang="less">
  @import "~styles/index.less";
  @import "~styles/variable.less";
  .orderlist-box {
    width: 100%;
    height: auto;

    .orderlist-header {
      width: 100%;
      height: 1.35rem;
      background: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 0.4rem;
      .fs(35);
      border-bottom: 1px solid #E8E8E8;
      li:nth-child(1) {
        img {
          width: 0.3rem;
          height: 0.5rem;
        }
      }
      li:nth-child(3) {
        img {
          width: 0.5rem;
          height: 0.5rem;
        }
      }
    }
    .orderlist-tab {
      .paydialog{
        height: 4.5rem!important;
        .payli{
          display: flex;
          line-height: 1rem;
          color: red;
          padding-right: 0.3rem ;
        }
        .van-cell{
          height: 1rem !important;
          line-height: 1rem!important;
          padding-left: 0.3rem!important;
          text-align: left!important;
        }
      }
      .van-dialog{
        padding-top:0.4rem;
        .van-field__label{
          max-width: 136px!important;
        }
        .van-field__control{
          padding-left: 1rem !important;
        }
        .dialog-inp{
          height: 1rem!important;
          line-height: 1rem;
          text-align: left;
          padding-left: 0.3rem;
        }
      }
      .mint-tab-item-label{
        span{
          font-size: 0.4rem!important;
        }
      }
      .order-list{

        .padding(10,10);
        background-color: #ffffff;
        .order-list-bg{
          .pt(20);
          .pl(22);
          .pr(22);
          background-color: #f5f5f5;
          .nullTip{background-color:#fff;height:70vh;padding-top:20vh;
            img{
              width:50%;height:auto;
            }
            p{
              color:#999999;font-size:0.4rem;
            }
          }
          .content-tab{
            border-radius:5px;
            background: #fff;
            padding: 0 0.4rem;
            .mb(20);
            li:nth-child(1){
              width: 100%;
              display: flex;
              justify-content: space-between;
              background: #fff;
              .fs(30);
              padding-top: 0.4rem;
              span:nth-child(1){
                color:#9E9E9E ;
              }
              span:nth-child(2){
                color:#2ED36B ;
              }
            }
            li:nth-child(2){
              color: #989898;
              height: auto;
              display: flex;
              justify-content: space-between;
              background: #fff;
              align-items: center;
              margin-top: 0.3rem;
              height: 3.6rem;
              border-bottom: 1px solid #F5F5F5;
              padding-bottom: 0.2rem;
              .left{
                width: 30%;
                height: 100%;
                img{
                  width: 100%;
                  height: 100%;
                  border-radius: 0.2rem;
                  vertical-align: middle;
                }
              }
              .right{
                width: 70%;
                text-align: left;
                padding-left: 0.3rem;
                line-height: 0.6rem;
                .fs(30);
                p{.fs(28);}
                p:nth-child(1){
                  color: #000;
                  .fs(33);
                }
                p:nth-child(4){
                  display: flex;
                  justify-content: space-between;
                }
                p:nth-child(5){
                  display: flex;
                  justify-content: space-between;
                }
                p:nth-child(6){
                  display: flex;
                  justify-content: space-between;
                  span:nth-child(1){
                    i{
                      color: #FF3F12;
                      font-weight: 600;
                      font-style:normal
                    }
                  }
                  span:nth-child(2){
                    color: #2ED36B;
                  }
                }
              }
            }
            li:nth-child(3){
              margin-top: 0.3rem;
              display: flex;
              justify-content: flex-end;
              .pb(30);
              .btn{
                .fs(28);
                background: #fff;
                border: 1px solid #F68151;
                border-radius: 4px;
                .padding(10,24);
              }
              .btn:nth-child(1){
                background: #F45416;
                color: #fff;
              }
              .btn:nth-child(2){
                color: #F45416;
                margin-left: 0.3rem;
                margin-right: 0.3rem;
              }
              .btn:nth-child(3){
                color: #F45416;
              }
            }
          }
        }
      }
      .mint-navbar {
        border-bottom: 1px solid #EBEBEB;
      }
    }
    .orderlist-date{
      .fs(25);
      width: 100%;
      background: #fff;
      display: flex;
      justify-content: space-between;
      height: 2.8rem;
      align-items: center;
      padding:1.3rem 0.4rem 0 0.4rem;
      li:nth-child(1){
        .pr(10);
      }
      li:nth-child(2){
        width: 20%;
        width: 3rem;
        height: 0.7rem;
        border: 1px solid #D7D7D7;
        border-radius:4px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .padding(0,10);
        .text-time{
          .mt(4);
        }
        img{
          width: 0.45rem;
          height: 0.45rem;
          margin-right: 0.05rem;
        }
      }
      li:nth-child(3){
        .margin(0,10);
        width: 0.25rem;
        border: 0.5px solid #D7D7D7;
      }
      li:nth-child(4){
        width: 20%;
        width: 3rem;
        height: 0.7rem;
        border: 1px solid #D7D7D7;
        border-radius: 4px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .padding(0,10);
        .text-time{
          .mt(4);
        }
        img{
          width: 0.45rem;
          height: 0.45rem;
          margin-right: 0.05rem;
        }
      }
      li:nth-child(5){
        .padding(0,20);
        color: #F35818;
      }

    }
    .nullTip{background-color:#fff;height:70vh;padding-top:20vh;
      img{
        width:50%;height:auto;
      }
      p{
        color:#999999;font-size:0.4rem;
      }
    }
    .content-tab{
      border-radius:5px;
      background: #fff;
      padding: 0 0.4rem;
      .mb(20);
      li:nth-child(1){
        width: 100%;
        display: flex;
        justify-content: space-between;
        background: #fff;
        .fs(30);
        padding-top: 0.4rem;
        span:nth-child(1){
          color:#9E9E9E ;
        }
        span:nth-child(2){
          color:#2ED36B ;
        }
      }
      li:nth-child(2){
        color: #989898;
        height: auto;
        display: flex;
        justify-content: space-between;
        background: #fff;
        align-items: center;
        margin-top: 0.3rem;
        height: 3.6rem;
        border-bottom: 1px solid #F5F5F5;
        padding-bottom: 0.2rem;
        .left{
          width: 30%;
          height: 100%;
          img{
            width: 100%;
            height: 100%;
            border-radius: 0.2rem;
            vertical-align: middle;
          }
        }
        .right{
          width: 70%;
          text-align: left;
          padding-left: 0.3rem;
          line-height: 0.6rem;
          .fs(30);
          p{.fs(28);}
          p:nth-child(1){
            color: #000;
            .fs(33);
          }
          p:nth-child(4){
            display: flex;
            justify-content: space-between;
          }
          p:nth-child(5){
            display: flex;
            justify-content: space-between;
          }
          p:nth-child(6){
            display: flex;
            justify-content: space-between;
            span:nth-child(1){
              i{
                color: #FF3F12;
                font-weight: 600;
                font-style:normal
              }
            }
            span:nth-child(2){
              color: #2ED36B;
            }
          }
        }
      }
      li:nth-child(3){
        margin-top: 0.3rem;
        display: flex;
        justify-content: flex-end;
        .pb(30);
        .btn{
          .fs(28);
          background: #fff;
          border: 1px solid #F68151;
          border-radius: 4px;
          .padding(10,24);
        }
        .btn:nth-child(1){
          background: #F45416;
          color: #fff;
        }
        .btn:nth-child(2){
          color: #F45416;
          margin-left: 0.3rem;
          margin-right: 0.3rem;
        }
        .btn:nth-child(3){
          color: #F45416;
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
        padding-left: 0.3rem;
      }
    }
  }
</style>
