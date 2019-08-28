<template >
  <div class="calculate-box">
    <common-header :tittle="tittle" :showleft="true" :routerBack="true" :showright="true" :routerLeft="routerLeft"></common-header>
    <div class="calculate-content">
      <li>
        <mt-field label="贷款年限"  type="number" v-model="birthday">
          <span style="margin-right: 3rem">{{colortext}}</span>
          <span @click="changedeadline(colortext)">选择</span>
          <van-actionsheet v-model="deadline" :actions="deadlineActions" @select="onSelectdeadline" />
        </mt-field>
      </li>
      <li><mt-field label="贷款利率"  type="number" v-model="number">
        <span style="margin-right: 3rem">{{interest}}</span>
      </mt-field>
      </li>
      <li><mt-field label="首付款"  type="url" v-model="website" placeholder="请输入首付款">元</mt-field></li>
     <li><mt-field label="金融服务" v-model="username"><span style="margin-right: 3rem">{{financeServicetext}}</span></mt-field></li>
     <li><mt-field label="销售价格"  type="tel" v-model="phone"><span  style="margin-right: 3rem">{{total}}元</span></mt-field></li>
      <mt-button @click="calculate" >计算</mt-button>
    </div>
    <div class="calculate-result">
      <h3 >计算结果</h3>
      <li>
        <div class="item">
          <p>5833</p>
          <span>月供(元)</span>
        </div>
        <div class="item">
          <p>36</p>
          <span>期限(月)</span>
        </div>
        <div class="item">
          <p>210000</p>
          <span>总价(元)</span>
        </div>
      </li>
    </div>
  </div>
</template>

<script>
import commonHeader from 'common/common-header'
import * as homeApi from '../../api/home-api'
export default {
  name: 'calculate',
  components: {
    commonHeader
  },
  data() {
    return {
      tittle: '贷款计算',
      routerLeft: '/orderinfodetail',
      username: '',
      phone: '',
      website: '',
      number: '',
      birthday:'',
      financeServicetext:localStorage.getItem('financeService'),
      deadline:false,
      deadlineActions:[],
      colortext:'',
      interest:'',
      periods:"",
      total:''
    }
  },
  created() {
  },
  beforeRouteLeave (to, from, next) {
    // 设置下一个路由的 meta
    to.meta.keepAlive = true // B 跳转到 A 时，让 A 缓存，即不刷新
    next()
  },
  mounted(){
    // this.financeServicetext=this.$route.params.financeService
    console.log(localStorage.getItem('financeServiceid'))
    this.getfinanceClasseslist()
  },
  methods: {
    onSelectdeadline(item){
      this.deadline=false
      this.colortext=item.name
      this.interest=item.value
    },
    changedeadline(){
      this.deadline=true
    },
    getfinanceClasseslist(){
      let params={
        id:localStorage.getItem('financeServiceid')
      }
      homeApi.financeClasses(params).then(res=>{
        res.data.data.financeTermList.forEach(item=>{
          item.name=item.name+'期'
          item.value=item.value+'%'
        })
            this.deadlineActions=res.data.data.financeTermList
      }).catch(err=>{
        console.log(err)
      })
    },
    calculate(){
      let a= parseInt(this.colortext)
      let b= parseInt(this.interest)
      let c= parseInt(this.website)
      this.total=a*b*c
    }
  }
}
</script>

<style scoped lang="less">
  @import "~styles/index.less";
  @import "~styles/variable.less";
  .calculate-box{
    width: 100%;
    height: auto;
    background: #fff;
    .fs(10)!important;
    .calculate-header{
      width: 100%;
      height: 1.35rem;
      background: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #FBFBFB;
      padding: 0 0.2rem 0 0.2rem;
      .fs(40);
      img{
        width: 0.4rem;
        height: 0.5rem;
      }
    }
    .calculate-content{
      padding-right: 0.3rem;
      padding-left: 0.3rem;
      .mint-cell:first-child,.mint-cell-wrapper{
        border-bottom: 1px solid #FBFBFB!important;
      }
      button{
        width: 100%;
        background: #F45416;
        color: #fff;
      }
    }
    .calculate-result{
      margin-top: 0.3rem;
      height: 3rem;
      .fs(30);
      h3{
        color: #F4642B;
        text-align: left;
        .fs(30);
        font-weight: 600;
        padding-left: 0.3rem;
      }
      li{
        width: 100%;
        display: flex;
        justify-content: space-around;
        height: 2rem;
        div{
          display: flex;
          justify-content: center;
          flex-direction: column;
          align-items: center;


        }
      }
    }
  }
</style>
