<template>
  <div class="out-box">
    <common-header :tittle="tittle" :showleft="true"  :routerLeft="routerLeft" ></common-header>
    <div class="out-one" v-if="isLogin">
      <!-- photo -->
      <li @click="AccountSetting(photo)"><span>账号设置</span><van-icon name="arrow" /></li>
      <li @click="invite "><span>邀请好友</span><van-icon name="arrow" /></li>
    </div>
    <div class="out-one">
      <li @click="feedback"><span>帮助与反馈</span><van-icon name="arrow" /></li>
      <li @click="about"><span>关于我们</span><van-icon name="arrow" /></li>
      <li @click="contact"><span>联系客服</span><van-icon name="arrow" /></li>
    </div>
    <div class="out-one"><!--checkversion(1)-->
      <li @click="checkUpdate"><span>检查版本与更新</span><span>{{version}}</span></li>
      <li @click="clearCache"><span>清除缓存</span><span>{{cacheSizeStr}}</span><van-icon name="arrow" /></li>
    </div>
    <div v-show="this.isshow" class="newversion">
      <img src="../../assets/image/newversion.png" alt="">
      <van-icon name="close" class="close" @click="close"/>
      <van-button type="primary" class="checkbtn">更新</van-button>
    </div>
    <van-dialog v-model="showFriend" show-cancel-button :before-close="beforeClose" confirm-button-text="发送" >
      <van-field v-model="username" label="姓名" placeholder="请输入姓名"  class="dialog-inp" />
      <van-field v-model="tel" type="phone" label="手机号" placeholder="请输入手机号" class="dialog-inp" />
    </van-dialog>
    <van-dialog v-model="phoneisShow" show-cancel-button :before-close="beforeClose" confirm-button-text="确定" >
      <van-field v-model="phone" label="手机号"  class="dialog-inp" />
    </van-dialog>
    <!--<van-button  @click="dropout">退出当前账号</van-button>-->
  </div>
</template>

<script>
import commonHeader from 'common/common-header'
import { Dialog, Toast } from 'vant'
import { imgFileUrl } from '../../apiconfig/index'
import * as homeApi from '../../api/home-api'
import checkUpdate from '../../assets/js/checkUpdate.js'

export default {
  name: 'out',
  components: {commonHeader},
  data() {
    return {
      tittle: '设置',
      routerLeft: '/day',
      username: '',
      tel: '',
      showFriend: false,
      version: '',
      isshow: false,
      photo: this.$route.params.urll,
      imgFileUrl: imgFileUrl,
      phoneisShow: false,
      phone: localStorage.getItem('partnerPhone'),
      isLogin: !!localStorage.getItem('username'),
      partnerPhone: '',
      cacheSize: 0,
      cacheSizeStr: ''
    }
  },
  mounted() {
    this.getVersion()
    this.getSizeCache()
    this.getPartnerPhone()
  },
  methods: {
    checkUpdate() {
      checkUpdate()
    },
    getSizeCache() {
      let that = this
      plus.cache.calculate(function(size) {
        that.cacheSize = size
        that.countSize(size) // = parseFloat(size / (1024 * 1024)).toFixed(2)
      })
    },
    countSize(size) {
      var kbCache = Number(size) / 1024
      var mbCache = Number(kbCache) / 1024
      if (kbCache < 20) {
        kbCache = kbCache + ''
        this.cacheSizeStr = kbCache.substring(0, kbCache.indexOf('.') + 6) + 'KB'
        return
      }
      if (mbCache < 2) {
        kbCache = kbCache + ''
        this.cacheSizeStr = kbCache.substring(0, kbCache.indexOf('.') + 2) + 'KB'
        return
      }
      mbCache = mbCache + ''
      this.cacheSizeStr = mbCache.substring(0, mbCache.indexOf('.') + 2) + 'MB'
    },
    getPartnerPhone() {
      homeApi.getConsultingPhone().then(res => {
        if (res.data.code === '200') {
          this.partnerPhone = res.data.partnerPhone
        } else {
          Toast('获取客服失败') // res.data.msg
        }
      }).catch(err => {

      })
    },
    getVersion() {
      let that = this
      plus.runtime.getProperty(plus.runtime.appid, function(inf) {
        that.version = inf.version
        // this.version = plus.runtime.version
      })
    },
    UpPackage() {
    },
    close() {
      this.isshow = false
    },
    checkversion(id) {
      if (id === 1) {
        Dialog.confirm({
          title: '已是最新版本',
          message: '1.1.1'
        }).then(() => {
        }).catch(() => {
        })
      } else {
        this.isshow = true
      }
    },
    contact() {
      Dialog.confirm({
        message: this.partnerPhone,
        confirmButtonText: '拨打'
      }).then(() => {
        // on confirm
        window.location.href = 'tel:' + this.partnerPhone
      }).catch(() => {
        // on cancel
      })
    },
    feedback() {
      this.$router.push('/index/out/feedback')
    },
    about() {
      this.$router.push('/index/out/about')
    },
    AccountSetting(url) {
      this.$router.push({path: '/index/out/Account', name: 'AccountSetting', params: { photo: url}})
    },
    invite() {
      if (!!localStorage.getItem('username')) {
        this.showFriend = true
      }
    },
    beforeClose(action, done) {
      if (action === 'confirm') {
        if (!this.username || !this.tel) {
          Toast('请输入姓名或手机号')
          done(false)
          return
        }
        if (!(/^[1][3,4,5,6,7,8][0-9]{9}$/.test(this.tel))) {
          Toast('手机号格式错误')
          done(false)
          return
        }
        let data={
          phone:this.tel
        }
        homeApi.inviteFrien(data).then(res=>{
          if(res.data.code=='200'){
            done() // 关闭
            Toast('发送完毕' +
              '')
          }
        }).catch(err=>{
        })
        // setTimeout(done, 1000)
      } else if (action === 'cancel') {
        this.username = ''
        this.tel = ''
        done() // 关闭
      }
    },
    clearCache() {
      if (this.cacheSize < 0.01) {
        mui.toast('系统暂无缓存')
        return
      }
      let that = this
      mui.confirm('您目前的系统缓存为' + that.cacheSizeStr + '？', '清除缓存', ['确认', '取消'], function(e) {
        if(e.index == 1) {} else {
          plus.cache.clear(function() {
            plus.nativeUI.alert('缓存清除完毕！')
            that.getSizeCache()
          })
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
  @import "~styles/index.less";
  @import "~styles/variable.less";
  *{
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .out-box{
    width: 100%;
    .newversion{
      position: fixed;
      top: 5rem;
      left: 2rem;
      .close{
        position: absolute;
        top: 0.2rem;
        right:0rem;
        color: #fff;
      }
      img{
        width: 6rem;
        /*height: 4rem;*/
      }
      .checkbtn{
        width: 4rem;
        height: 0.8rem;
        line-height: 0.8rem;
        border-radius: 0.2rem;
        position: absolute;
        bottom: 1rem;
        left: 1rem;
        background-color:#ff7414;
        border: none;
      }
    }
    .out-one{
      margin-bottom: 0.2rem;
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
          margin-left: 5.4rem;
          margin-right: 0.5rem;
        }
      }
      li:last-child{
        border-bottom: none;
        span:nth-child(2){
          margin-left: 5.4rem;
        }
      }
    }
    .dialog-inp{
      height:1.2rem!important;
      line-height: 1.2rem;
      .van-field__label{
        text-indent: 0.5rem;
      }

    }
  }

</style>
