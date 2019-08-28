<template>
  <div class="shopcar-box">
    <common-header :tittle="tittle" :showleft="true" :showright="true" :routerLeft="routerLeft"></common-header>
      <div class="shopcar-content">
         <li class="checkall">
           <van-checkbox @click="toggleCheckedAll" v-model="checkedAll" checked-color="#FF7414">全选</van-checkbox></li>
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          :offset="20"
        >
        <van-cell
          v-for="(item,index) in tabList"
          :key="index"
        >
        <div class="shopcar-list" >
          <van-swipe-cell :right-width="60" :on-close="onClose" >
            <div class="content-tab" >
              <li>
              <span>
                <van-checkbox  v-model="item.index" checked-color="#FF7414" @click="checked(item.index)"   ref="checkboxes">{{item.partnerNm}}</van-checkbox>
              </span>
                <span>库存充足</span>
              </li>
              <li>
                <div class="left">
                  <img :src="!!item.url?imgFileUrl+item.url:''" alt="图片未找到">
                </div>
                <div class="right">
                  <p>
                    <span v-if="item.carProductKind==1">{{item.classNm}} || 电动</span>
                    <span v-if="item.carProductKind==2">{{item.classNm}} || 燃油</span>
                  </p>
                  <p  v-if="item.carProductKind==1">{{item.carProductStyle}}/{{item.carProductColour}}/电动</p>
                  <p  v-if="item.carProductKind==2">{{item.carProductStyle}}/{{item.carProductColour}}/燃油 </p>
                  <p><span>容量：{{item.carPowerBatkwh}}kWh</span><span>续航：{{item.carPowerMaxKm}}km</span></p>

                  <p><span>销售价格：<b >{{item.carProductPrice}}万</b></span></p>
                </div>
              </li>
              <li>
                <button class="btn" @click="order(item.carproductcd)">下单支付</button>
                <button class="btn" @click="friend(item)">好友推荐</button>
                <button class="btn" @click="info(item.carproductcd,item.id)">查看详情</button>
              </li>
            </div>
            <van-button
              square
              slot="right"
              type="danger"
              text="删除"
              @click="deletd(item.id)"
            />
          </van-swipe-cell>
          <div v-if="tabList.length==0" class="nullTip">
            <img src="../../assets/image/tipNull.png">
            <p>暂无数据</p>
          </div>
        </div>
            <div class="shopcar-fixed">
              <button @click="Vehiclecontrast(item.classNm)" >
                <span >车辆对比已选</span>
                <span>{{checkedarr.length}}</span>
              </button>
            </div>
      </van-cell>
      </van-list>
        <van-dialog v-model="showFriend" show-cancel-button :before-close="beforeClose" confirm-button-text="发送" >
          <van-field v-model="username" label="姓名" placeholder="请输入姓名"  class="dialog-inp" style="height: 1.2rem;line-height: 1.2rem"/>
          <van-field v-model="tel" type="phone" label="手机号" placeholder="请输入手机号" class="dialog-inp" style="height: 1rem;line-height: 1rem"/>
        </van-dialog>
      </div>

    </div>
</template>

<script>
import commonHeader from 'common/common-header'
import * as homeApi from '../../api/home-api'
import { imgFileUrl } from '../../apiconfig/index'
import {mapMutations, mapGetters, mapState} from 'vuex'
import { Dialog, Toast } from 'vant'
export default {
  name: 'shopcar',
  components: { commonHeader, Toast, Dialog },
  data() {
    return {
      tittle: '购物车',
      routerLeft: '/day',
      loading: false,
      finished: false,
      imgFileUrl: imgFileUrl,
      tabList: [],
      radio: false,
      pageNumber: 1,
      pageSize: 3,
      checkedarr: [],
      checkedAll: false,
      select: '',
      showFriend: false,
      username: '',
      tel: '',
      itemObj: '',
      businessId: ''
    }
  },
  beforeRouteLeave (to, from, next) {
    // 设置下一个路由的 meta
    to.meta.keepAlive = false // B 跳转到 A 时，让 A 缓存，即不刷新

    next()
  },
  mounted() {
    this.$store.commit({
      type: 'incrment',
      num: 1
    })
    // this.toggleCheckedAll()
  },
  computed: {
    // 与vuex中的getters相关联
    ...mapGetters([
      'number'
    ]),
    ...mapState({
      number: state => state.home.number
    })
  },
  methods: {
    order(carproductcd) {
      this.$router.push({path: '/orderinfodetail', params: {orderid: carproductcd}})
      localStorage.setItem('carProductCdX', carproductcd)
    },
    info(carProductCd,id) {
      this.$router.push('/shopCarDetail')
      localStorage.setItem('shopId',id)
      localStorage.setItem('carProductCd',carProductCd)
    },
    onClose(clickPosition, instance) {
      switch (clickPosition) {
        case 'cell':
        case 'outside':
          instance.close()
          break
      }
    },
    toggleCheckedAll(val) {
      if (this.checkedAll) {
        this.tabList.forEach((item) => {
          item.index = true
        })
        this.checkedAll = true
        this.checkedarr = this.tabList
      } else {
        this.tabList.forEach((item) => {
          item.index = false
        })
        this.checkedAll = false
        this.checkedarr = []
      }
    },
    checked(e) {
      if (e) {
        let arr = []
        this.tabList.forEach((item) => {
          if (item.index === true) {
            return arr.push(item.carproductcd)
          }
        })
        this.checkedarr = arr
        if (this.tabList.length === this.checkedarr.length) {
          this.checkedAll = true
        }
      } else {
        this.checkedAll = false
        let arr = []
        this.tabList.forEach((item) => {
          if (item.index === true) {
            return arr.push(item.carproductcd)
          }
        })
        this.checkedarr = arr
        e = false
      }
    },
    // 与vuex中的actions相关联
    ...mapMutations({
      incrment: 'incrment'
    }),
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        this.getList()
      }, 500)
    },
    friend(item) {
      this.showFriend = true
      this.itemObj = item
      this.businessId=item.id
    },

    Vehiclecontrast(classNm) {
      let checkedIds=this.checkedarr.join(',')
      if(!!checkedIds){
        let carIds = {
          carIds:checkedIds
        }
        this.$router.push({name: 'Vehiclecontrast', query: { name:checkedIds, classNm: classNm}})
      }else if(checkedIds===''||checkedIds===undefined||checkedIds===null){
        Dialog.alert({
          title: '系统异常请稍后重试',
        }).then(() => {
        });
      }

    },
    getList() {
      let params = {
        pageNumber: this.pageNumber,
        pageSize: this.pageSize
      }
      homeApi.shopcarlist(params).then(res => {

        for (let i = 0; i < res.data.page.list.length; i++) {
          this.tabList.push(res.data.page.list[i])
        }
        this.pageNumber = Number(this.pageNumber) + Number(1)
        this.loading = false
        if (res.data.page.lastPage === true) {
          this.finished = true
          this.pageNumber = Number(this.pageNumber) + Number(1)
          this.loading = false;
          if (res.data.page.lastPage == true) {
            this.finished = true;
            this.pageNumber = Number(this.pageNumber) + Number(1)
            this.loading = false;
            if (res.data.page.lastPage == true) {
              this.finished = true;
              this.pageNumber = Number(this.pageNumber) + Number(1)
              this.loading = false
              if (res.data.page.lastPage === true) {
                this.finished = true

              }
            }
          }
          this.pageNumber = Number(this.pageNumber) + Number(1)
          this.loading = false;
          if (res.data.page.lastPage == true) {
            this.finished = true;
          }
        }
      }).catch(err => {
        console.log(err)
      })
    },
    deletd(id) {
      Dialog.confirm({
        title: '确定删除吗'
      }).then(() => {
        let params = {
          idStr: id
        }
        homeApi.deleteCar(params).then(res => {
          window.location.reload()
        }).catch(err => {
          console.log(err)
        })
      })
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
          type: '1',
          businessId:this.businessId.toString(),
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
    }
  }
}
</script>

<style scoped lang="less">
  @import "~styles/index.less";
  @import "~styles/variable.less";
  .shopcar-box{
    width: 100%;
    height: auto;
    .shopcar-fixed{
      button{
        width: 100%;
        background: #FF7414;
        border: none;
        outline: none;
        color: #fff;
        height: 1rem;
        text-align: center;
        line-height: 1rem;
        .fs(30);
        position: fixed;
        bottom: 0;
        left: 0;

      }
    }

    .shopcar-header{
      width: 100%;
      height: 1.35rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #fff;
      border-bottom: 1px solid #dedede;
      padding: 0 0.2rem 0 0;
      .fs(30);
      li:first-child{
        .van-icon {
          font-size: 0.6rem;
        }
      }
      li{
        .input-box {
          .h(150);
          position: relative;
          .pt(43);
          .pl(30);
          .pr(30);
          .search {
            background-color:#f7f3f8;
            .b-radius(58);
            /*.h(50);*/
            .lh(58);
            width: 100%;
            outline: none;
            .pl(65);
            .pr(65);
            .pt(5);
            .fs(26);
          }
        }
      }
      li:last-child{
        .van-icon{
          .fs(40);
        }
      }
    }
    .shopcar-content{
      .checkall{
        width: 100%;
        background: #fff;
        display: flex;
        justify-content: space-between;
        padding-top: 0.2rem;
        padding-left: 0.4rem;
        .fs(30);
        /*border-bottom: 1px solid #ccc;*/
      }
      margin-bottom: 1rem;
      .shopcar-list{
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
            /*padding-bottom: 0.2rem;*/
            span:nth-child(1){
              color:#9E9E9E ;
            }
            span:nth-child(2){
              color:#2ED36B ;
              display: inline-block;
              width: 2rem;
              height: 0.7rem;
              line-height: 0.7rem;
              text-align: center;
              background: #E8FCF3;
              border-radius: 0.2rem;
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
            height: 3rem;
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
              line-height: 0.8rem;
              .fs(30);
              p{
                .fs(28);
                //letter-spacing: 0.01rem;
              }
              p:nth-child(1){
                display: flex;
                justify-content: space-between;
                span:nth-child(2){
                  i{
                    color: #FF3F12;
                    font-weight: 600;
                    font-style:normal
                  }
                }
                span:nth-child(1){
                  color: #000;
                  .fs(33);
                }
              }
              p:nth-child(3){
                span:nth-child(1){
                  margin-right: 1rem;
                }
              }
              p:nth-child(4){
                display: flex;
                justify-content: space-between;
                b{
                  color: #FF2300;
                  font-weight: bold;
                }
              }
              p:nth-child(5){
                span:last-child{
                  margin-left: 0.9rem;
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
  }
</style>
