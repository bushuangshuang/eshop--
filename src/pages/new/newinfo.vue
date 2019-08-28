<template>
  <div class="newinfo-box">
    <div class="newinfo-header">
      <li class="h-left" @click="back"><van-icon name="arrow-left" /></li>
      <li><van-search placeholder="请输入搜索关键词" v-model="value" /></li>
      <li><van-icon name="chat-o" @click="message"/><img src="../../assets/image/forward.png" alt=""></li>
    </div>
    <div class="newinfo-list-bg">
      <div class="content-tab2" v-for="item in tabList2">
        <li>
          <div class="left">
            <img src="../../assets/image/article.png" alt="">
            <div>
              <p style="color: #000;">{{item.name}}</p>
              <p>{{item.tab}}</p>
              <p>{{item.date}}</p>
            </div>
          </div>
          <div class="right">
            <button @click="collect">收藏</button>
          </div>
        </li>
        <li>
          {{item.title}}
        </li>
        <li>{{item.content}}</li>
        <li>展开更多</li>
      </div>
      <div class="Recommended">
        <h4>推荐车系</h4>
        <div class="Recommended-swiper">
          <div class="swiper-container">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="item in Recommendedlist" onSlideChangeEnd>
                <img :src="!!item.classPic?imgFileUrl+item.classPic:''" />
                <p>{{item.classNm}}</p>
                <p>{{item.carProductPriceRange}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { imgFileUrl } from '../../apiconfig/index'
import Swiper from 'swiper'
import * as homeApi from '../../api/home-api'
import { Dialog, Toast } from 'vant'
export default {
  name: 'newinfo',
  data() {
    return {
      imgFileUrl: imgFileUrl,
      Recommendedlist: [],
      value: '',
      // play:true,
      tabList2: [
        {
          name: '姓名姓名',
          tab: '标签标签',
          date: '2019/03/29',
          title: '促进汽车消费政策出台',
          content: '促进汽车消费政策出台！2019年二手车流，促进汽车消费政策出台！2019年二手车流.促进汽车消费政策出台！2019年二手车流促进汽车消费者政策出台了...'
        }
      ]
    }
  },
  methods: {
    back() {
      this.$router.push('/')
    },
    message() {
      this.$router.push('/message')
    },
    collect(){
      let params={
        collectType:"2",
        businessId:"1",
        collectName:"怎样才能让你的二手车卖出好价钱"
      }
      homeApi.AddCollection(params).then(res=>{
        if(res.data.code=='200'){
             Toast('收藏成功')
        }else{
          Toast(res.data.msg)
        }
      }).catch(err=>{
        console.log(err)
      })
    }
  },
  activated() {
    let Recommended = {
      isRecommend: '1'
    }
    homeApi.Recommended(Recommended).then(res => {
      this.Recommendedlist = res.data.page.list
      let play = false
      if (this.Recommendedlist.length > 3) {
        play = true
      }
      new Swiper('.swiper-container', {
        loop: true,
        slidesPerView: 3,
        centeredSlides: true,
        autoplay: play,
        speed: 2000,
        observer: true,
        observeParents: true
      })
    }).catch(err => {
      console.log(err)
    })
  },
  mounted() {
    let Recommended = {
      isRecommend: '1'
    }

    homeApi.Recommended(Recommended).then(res => {
      this.Recommendedlist = res.data.page.list
      let play = false
      if (this.Recommendedlist.length > 3) {
        play = true
      }
      new Swiper('.swiper-container', {
        loop: true,
        initialSlide: 0,
        slidesPerView: 3,
        centeredSlides: true,
        autoplay: play,
        speed: 2000,
        observer: true,
        observeParents: true
      })
    }).catch(err => {
      console.log(err)
    })
  },
  updated() {
    new Swiper('.swiper-container', {
      loop: true,
      slidesPerView: 3,
      centeredSlides: true,
      autoplay: true,
      speed: 2000,
      observer: true,
      observeParents: true
    })
  }

}
</script>

<style scoped lang="less">
  @import "~styles/index.less";
  @import "~styles/variable.less";
  .newinfo-box{
    width: 100%;
    height: auto;
    .newinfo-header{
      width: 100%;
      height: 1.35rem;
      background: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      /*padding: 0 0.2rem 0 0;*/
    /*li:nth-child(1){
      margin-right: 0.8rem;
      .van-icon{
        font-size: 0.6rem;
      }
    }*/
      .h-left{
        width: 10%;
        text-align: right;
        .van-icon {
          line-height: 50px;
          font-size: 0.6rem;
        }
      }
      li:nth-child(2){
        width: 60%;
        .pl(20);
        .van-search__content {
          /*width: 6.5rem;*/
          width: 100%;
          text-align: right;
          border-radius: 1rem;
          padding-left: 0.5rem;
        }
      }
      li:nth-child(3){
        width: 20%;
        /*width: 2rem;*/
        height: 100%;
        display: flex;
        align-items: center;
        margin-left: 0.4rem;
        .van-icon{
          font-size: 0.6rem;
        }
        img{
          width: 0.5rem;
          height: 0.5rem;
          margin-left: 0.4rem;
        }
      }
      li:nth-child(4){
        width: 10%;
        text-align: left;
        .van-icon{
          font-size: 0.6rem;
        }
      }
    }
    .newinfo-list-bg{
      width: 100%;
      .Recommended {
        width: 100%;
        height: auto;
        .fs(30);
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
          width: 100%;
          .pt(25);
          .pl(30);
          .pr(30);
          .pt(25);
          background-color: #f5f5f5;
          padding-bottom: 1.7rem;
          height: 5.6rem;
          .swiper-wrapper {
            width: 100%;
            margin-left: -3rem;
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
                margin-bottom: 0.3rem;
                width: 2.5rem;
                height: 1.5rem;
              }
            }
          }
        }
      }
      .padding(20,22);
      background-color: #f5f5f5;
      .nullTip{background-color:#fff;height:70vh;padding-top:20vh;

        img{
          width:50%;height:auto;
        }
        p{
          color:#999999;font-size:0.4rem;
        }
      }

      .content-tab2{
        background: #fff;
        width: 100%;
        padding: 0.4rem;
        margin-bottom: 0.4rem;
        li:nth-child(1){
          display: flex;
          align-items: center;
          .left{
            width: 80%;
            display: flex;
            align-items: center;
            line-height: 0.5rem;
            color: #AAAAAA;
            /*justify-content: space-between;*/
            img{
              width: 1rem;
              height: 1rem;
              border-radius: 50%;
            }
          }
          .right{
            button{
              background: transparent;
              border: none;
              outline: none;
              border: 1px solid #FF2300;
              border-radius: 0.2rem;
              text-align: center;
              color:#FF2300 ;
              width: 1.5rem;
              height: 0.6rem;
              line-height: 0.6rem;
            }
          }
        }
        li:nth-child(2),li:nth-child(3){
          .fs(30);
          text-align: left;
        }
        li:nth-child(2){
          font-weight: bold;
          .fs(37);
          line-height: 1rem;
          letter-spacing: 0.02rem;
        }
        li:nth-child(3){
          letter-spacing: 0.01rem;
          line-height: 0.6rem;
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
                margin-right: 2rem;
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
</style>
