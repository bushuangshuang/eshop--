<template>
  <div class="story-box">
    <common-header :tittle="tittle" :showright="true" :showleft="false"></common-header>
    <div class="story-content">
      <!--<img src="../../assets/image/bgimg.png" alt="">-->
      <img src="../../assets/image/bgfs.png" alt="" class="img">
      <div class="text">
          <p></p>金融服务
          <P></P>
      </div>
      <div class="story-step">
        <li>
          <img src="../../assets/image/cd.png" alt="">
            <span>贷款计算</span>
        </li>
        <li>
          <img src="../../assets/image/yj.png" alt="">
          <span>一键授信</span>
        </li>
        <li>
          <img src="../../assets/image/dk.png" alt="">
          <span>申请贷款</span>
        </li>
        <li>
          <img src="../../assets/image/jd.png" alt="">
          <span>进度查询</span>
        </li>
      </div>
      <div class="story-online">
        <img src="../../assets/image/jx.png" alt="">
          <span>在线审批</span>
          <p>通过四步获得贷款信息并获得贷款额度</p>
        <img src="../../assets/image/searchbtn.png" alt="" class="btn">
        <p class="search">查询额度</p>
      </div>
      <div class="story-online">
        <img src="../../assets/image/jx.png" alt="">
        <span>贷款方案</span>
        <!--<p>通过四步获得贷款信息并获得贷款额度</p>-->
        <img src="../../assets/image/searchbtn.png" alt="" class="btn">
        <p class="search">立即申请</p>
      </div>
      <div class="story-loan">
        <img src="../../assets/image/jx.png" alt="">
        <span>贷款流程</span>
        <div class="story-list">
          <li>
            <img src="../../assets/image/minutes.png" alt="">
            <p>十分钟申请</p>
          </li>
          <li>
            <img src="../../assets/image/make.png" alt="">
            <p>预约看车</p>
          </li>
          <li>
            <img src="../../assets/image/onlie.png" alt="">
            <p>线上审批</p>
          </li>
          <li>
            <img src="../../assets/image/loan.png" alt="">
            <p>放款提车</p>
          </li>
        </div>

      </div>
      <div class="story-online">
        <img src="../../assets/image/jx.png" alt="">
        <span>保险服务</span>
        <!--<p>通过四步获得贷款信息并获得贷款额度</p>-->
        <img src="../../assets/image/searchbtn.png" alt="" class="btn">
        <p class="search">立即申请</p>
      </div>
    </div>
  </div>
</template>

<script>
import commonHeader from 'common/common-header'
export default {
  data() {
    return {
      tittle: '金融服务'
    }
  },
  components: {
    commonHeader
  },
  created() {
  },
  methods: {
    back() {
      this.$router.goBack()
    },
    toNews() {
      this.$router.push('/message')
    }
  },
  computed: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "~styles/index.less";
@import "~styles/variable.less";
.story-box{
  width: 100%;
  height: auto;
  .story-content{
    width: 100%;
    height: 170vh;
    background-image: url('../../assets/image/bgimg.png');
    background-size: 100%;
    background-repeat: no-repeat;
    background-origin: border-box;
    .img{
      width: 60%;
      margin: 1rem auto;
    }
    .text{
      color: #fff;
      .fs(30);
      letter-spacing: 0.2rem;
      position: relative;
      p{
        border: 1px solid #fff;
        width: 1rem;
        position: absolute;
        border-radius: 0.1rem;
        top: 47%;
      }
      p:nth-child(1){
        left:25%;
      }
      p:nth-child(2){
        right:25%;
      }
    }
    .story-step{
      width: 90%;
      margin: 0.5rem auto;
      height: 2rem;
      border-radius: 0.2rem;
      background: #fff;
      display: flex;
      justify-content: center;
      /*flex-direction: column;*/
      align-items: center;

      li{
        width: 25%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        color: #8C8C8C;
        /*height: 100%;*/
        img{
          width: 0.5rem;
          height: 0.5rem;
          margin-bottom: 0.1rem;
        }
      }
    }
    .story-online{
      width: 90%;
      height: 30vh;
      background: #fff;
      margin:0.7rem auto;
      position: relative;
      >img{
        margin: -0.3rem auto;
        width: 80%;
      }
     >span{
       position: absolute;
       left: 40%;
       top: 0rem;
       z-index: 100;
       color: #fff;
       .fs(30)
     }
      >p{
        margin-top: 0.4rem;
        .fs(30);
        color: #655952;
      }
      >.btn{
        width: 70%;
        height: 0.9rem;
        position: absolute;
        bottom: 0.5rem;
        left:15%;
      }
      .search{
        position: absolute;
        left: 41%;
        bottom: 0.37rem;
        color: #fff;
      }
    }
    .story-loan{
      width: 90%;
      height: 20vh;
      background: #fff;
      margin:0.7rem auto;
      position: relative;
      >img{
        margin: -0.3rem auto;
        width: 80%;
      }
      >span{
        position: absolute;
        left: 40%;
        top: 0rem;
        z-index: 100;
        color: #fff;
        .fs(30)
      }
      .story-list{
        width: 100%;
        display: flex;
        justify-content: center;
        margin: 0.7rem auto;
        li{
          width: 25%;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          color: #8E8E8E;
          img{
            width: 1rem;
            height: 1rem;
            margin-bottom: 0.2rem;
          }
        }
      }
    }
  }
}
</style>
