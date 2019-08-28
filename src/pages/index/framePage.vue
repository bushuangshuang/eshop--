<template>
    <div>
      <div class="header-box">
        <li class="h-left" @click="closeViewBack"><van-icon name="arrow-left" /></li>
        <li class="h-center">嵌套页面test</li>
        <li class="h-right news" >&nbsp;</li>
      </div>
    </div>
</template>

<script>
import commonHeader from 'common/common-header'
import getDeviceInfo from '../../assets/js/deviceInfo.js'

export default {
  name: 'frame-page',
  components: {commonHeader},
  data() {
    return {
      tittle: '嵌套页面test',
      routerLeft: '/home',
      viewId: ''
    }
  },
  created() {
  },
  mounted() {
    window.closeViewBackBtn = () => {
      this.closeViewBack()
    }
    this.framePage()
  },
  methods: {
    closeViewBack() {
      console.log('New Window close!')
      plus.webview.close(this.viewId)
    },
    framePage() {
      let that = this
      var nwaiting = plus.nativeUI.showWaiting()
      var ws = plus.webview.currentWebview() // 'http://www.yungoche.com/' http://192.168.1.109:8087/
      var embed = plus.webview.create('http://192.168.1.109:8087/', 'testFramePage', {top: '50px', bottom: '0px'})
      embed.addEventListener('loaded', function() {
        ws.append(embed)
        that.viewId = embed.id
        mui.fire(embed, 'getDeviceInfoCallback', {id: '123456'})
        mui.fire(embed, 'callbackFn', {id: embed.id})
        nwaiting.close()
      }, false)
      embed.addEventListener('close', function() {
        console.log('222221111')
        that.$router.push({path: '/home' })
      }, false)
      embed.addEventListener('getDeviceInfoCallback', function() {
        console.log('getDeviceInfoCallback监听')
      }, false)
    }
  }
}
</script>

<style lang="less" scoped>
  @import "~styles/index.less";
  @import "~styles/variable.less";
  .header-box{
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #fff;
    border-bottom: 1px solid #dedede;
  .fs(30);
  .h-left{
    width: 15%;
    text-align: center;
  .van-icon {
    line-height: 50px;
    font-size: 0.6rem;
  }
  }
  .h-center{
    width: 70%;
    height: 100%;
    line-height: 50px;
  .padding(0,60);
  .fs(32);
    color: #000;
    position: relative;
    text-align: center;
  .icon {
    position: absolute;
    display: inline-block;
  .w(30);
  .h(30);
  .top(36);
  .left(80);
    background-image: url('../../assets/image/search-f.png');
    background-repeat: no-repeat;
    background-size: cover;
  }
  .search {
    background-color:#f7f3f8;
  .b-radius(58);
  .lh(58);
    width: 100%;
    outline: none;
  .pl(65);
  .pr(65);
  .pt(5);
  .fs(28);
  }
  }
  .h-right{
    width: 15%;
    text-align: center;
  .fs(30);
    line-height: 50px;
  .van-icon {
    line-height: 50px;
    font-size: 0.6rem;
  }
  }
  }
</style>
