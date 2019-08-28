<template>
  <div class="page">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <div :style="isIphoneX?'height:2rem;':'height:1rem'" v-if="ss">&nbsp;&nbsp;</div>
    <div class="nav-footer" v-show="hidshow" v-if="ss">
      <footer>
        <a v-for='(item, index) in navList' @click='toRouter(item.path)' :key='index'
            v-bind:class="{'active':activeRoute == item.path}">
          <div :class="'tab-'+index"></div>
          <p v-text="item.name"></p>
        </a>
      </footer>
    </div>

  </div>
</template>

<script>
import { Dialog, Toast } from 'vant'
export default {
  data () {
    return {
      docmHeight: '0', // 默认屏幕高度
      showHeight: '0', // 实时屏幕高度
      hidshow: true, // 显示或者隐藏footer,
      isResize: false, // 默认屏幕高度是否已获取
      ss: true,
      navList: [
        {
          'path': '/home',
          'name': '首页'
        },
        {
          'path': '/story',
          'name': '服务'
        },
        {
          'path': '/garage',
          'name': '车库'
        },
        {
          'path': '/day',
          'name': '我的'
        }
        // ,
        // {
        //   'path': '/framePage',
        //   'name': '嵌套测试'
        // }
      ],
      components: {},
      isIphoneX: false
    }
  },
  computed: {
    activeRoute () {
      return this.$route.path
    }
  },
  watch: {
    showHeight: function () {
      if (this.docmHeight > this.showHeight) {
        this.hidshow = false
      } else {
        this.hidshow = true
      }
    },
    '$route': 'getPath'
  },
  mounted() {
    this.getPath()
    window.onresize = () => {
      return (() => {
        if (!this.isResize) {
          this.docmHeight = document.documentElement.clientHeight
          this.isResize = true
        }
        this.showHeight = document.body.clientHeight
      })()
    }
    if (typeof window !== 'undefined' && window) {
      this.isIphoneX = (/iphone/gi.test(window.navigator.userAgent) && window.screen.height >= 812)
    }
  },
  methods: {
    getPath() {
      // console.log('path------',this.$route.path)
      if (this.$route.path == '/guidePage') {
        this.ss = false
      } else {
        this.ss = true
      }
    },
    toRouter(path) {
      if('/story' == path){
        Toast('建设中敬请期待...')
      }
      if ('/garage' == path && (localStorage.getItem('username') == undefined || localStorage.getItem('username')==null || localStorage.getItem('username')=='')) {
        Dialog.alert({
          title: '提示',
          message: '请先登录，在点击我的车库'
        }).then(() => {
          this.$router.push('/home/login')
        })
      } else {
        this.$router.push(path)
      }
      if ('/day' == path && (localStorage.getItem('username')==undefined || localStorage.getItem('username')==null || localStorage.getItem('username')=='')){
        this.$router.push(path)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "~styles/index.less";
@import "~styles/variable.less";
@supports (bottom: env(safe-area-inset-bottom)) {
  footer {
    margin-bottom: env(safe-area-inset-bottom);
  }
}
.nav-footer {
    position: fixed;
    left: 0;
    width: 100%;
    /*margin-top: 2rem!important;
    .h(98);*/
    background: @tab-general-bg-color;
    display: block!important;
    bottom: 0;
    footer {
      margin-bottom: constant(safe-area-inset-bottom);
      /*padding-bottom: constant(safe-area-inset-bottom);*/
      background-color: #ffffff;
      font-size: 0;
      /*border-top: 1px solid #e9e9e9;*/
      .pt(10);
      line-height: 1.2;
      width: 100%;
      // .h(98);
      height:100%;
      display: flex;
      a {
        text-decoration: none;
        color: @base-font-color;
        -webkit-box-flex: 1;
        -moz-box-flex: 1;
        -webkit-flex: 1;
        -ms-flex: 1;
        flex: 1;
        text-align: center;
        box-sizing: border-box;
        display: block;
        .fs(22);
        .tab-0, .tab-1, .tab-2, .tab-3 {
          display: inline-block;
          .h(42);
          .w(42);
          background-size: cover;
        }
        .tab-0 {
          background-image: url("../assets/imgs/首页选中-拷贝-2@2x.png");
        }
        .tab-1 {
          background-image: url("../assets/imgs/金融服务-(1)@2x.png");
        }
        .tab-2 {
          background-image: url("../assets/imgs/car1.png");
        }
        .tab-3 {
          background-image: url("../assets/imgs/我的-拷贝@2x.png");
        }
        &:hover {
          text-decoration: none;
        }
        /*&.router-link-active.active {*/
        &.active {
          .tab-0 {
            background-image: url("../assets/imgs/首页选中@2x.png");
          }
          .tab-1 {
            background-image: url("../assets/imgs/金融服务-(1)-拷贝@2x.png");
          }
          .tab-2 {
            background-image: url("../assets/imgs/car2.png");
          }
          .tab-3 {
            background-image: url("../assets/imgs/我的-拷贝-4@2x.png");
          }
      }
      p {
        margin: 0;
      }
    }
    }
  }
</style>
