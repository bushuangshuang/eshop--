<template>
    <div class="newlist-box">
      <common-header :showleft="true" :showinput="true" :showright="true"></common-header>
      <div class="newlist-content">
        <mt-navbar v-model="selected">
          <mt-tab-item v-for="item in titlelist" :id="item.id" @change="change(item.id)"><span style="font-size:16px">{{ item.name}}</span></mt-tab-item>
        </mt-navbar>
        <mt-tab-container v-model="selected">
          <mt-tab-container-item  v-for="item in titlelist" :id="item.id" >
            <div class="news-bg">
              <div class="img" >
                <img :src="!!fileAddress?imgFileUrl+fileAddress:''" alt="">
                <h4>怎么做才能让你的二手车卖一个好价钱</h4>
              </div>
              <div class="new-list">
                <li v-for="item in showList">
                  <div class="new-content">
                    {{item.content}}
                  </div>
                  <div class="new-auth">
                    <span>{{item.auth}}</span>
                    <span>{{item.date}}</span>
                  </div>
                </li>
                <div @click="showAll=!showAll" class="text">{{word}}</div>
              </div>
            </div>
            <div v-if="titlelist.length==0" class="content-tab" >
              <div class="nullTip">
                <img src="../../assets/image/tipNull.png">
                <div>暂无数据</div>
              </div>
            </div>
          </mt-tab-container-item>
        </mt-tab-container>
      </div>
    </div>
</template>

<script>
  import commonHeader from 'common/common-header'
  import { imgFileUrl } from '../../apiconfig/index'
  import * as homeApi from '../../api/home-api'
    export default {
        name: "newlist",
      components: {
  commonHeader
      },
        data(){
            return{
              selected:1,
              imgFileUrl:imgFileUrl,
              fileAddress:'20190409013540486T24w5',
              titlelist:[
                {id:1,name:'最新文章',content:'促进汽车消费政策出台！2019年二手车流',auth:'文章作者',date:'2019/2/14'},
                {id:2,name:'政策解读',content:'促进汽车消费政策出台！2019年二手车流',auth:'文章作者',date:'2019/2/14'},
                {id:3,name:'保养篇',content:'促进汽车消费政策出台！2019年二手车流',auth:'文章作者',date:'2019/2/14'},
                {id:4,name:'使用篇',content:'促进汽车消费政策出台！2019年二手车流',auth:'文章作者',date:'2019/2/14'},
                {id:5,name:'其他',content:'促进汽车消费政策出台！2019年二手车流',auth:'文章作者',date:'2019/2/14'},
              ],
              showAll:false,
            }
        },
      created(){
        this.getlist()
      },
      methods:{
        change(item){
        },
        getlist(){
          let data={
                  pageNumber:1,
                  pageSize:10,
                  globalSearch:'文章'
          }
          homeApi.article(data).then(res=>{
          }).catch(err=>{
            console.log(err)
          })
        }
      },
      computed: {
        showList: function () {
          if (this.showAll == false) {
            var showList = []
            if (this.titlelist.length > 4) {
              for (var i = 0; i < 4; i++) {
                showList.push(this.titlelist[0])
              }
            } else {
              showList = this.titlelist
            }
            return showList
          } else {
            return this.titlelist
          }
        },
        word: function () {
          if (this.showAll == false) {
            return '展开更多'
          } else {
            return '收起'
          }
        }
      },
    }
</script>

<style scoped lang="less">
  @import "~styles/index.less";
  @import "~styles/variable.less";
  .newlist-box{
    .newlist-content{
      .mint-tab-container{
        margin-top: 0.2rem;
      }
      .news-bg{
        .pl(30);
        .pr(30);
        .pt(24);
        .pb(24);
        background-color:#f5f5f5;
        .img{
          width: 100%;
          height: 3.5rem;
          position: relative;
          h4{
            position: absolute;
            bottom: 0.12rem;
            left: 0.5rem;
            color: #fff;
            .fs(30)
          }
          >img{
            width: 100%;
            height: 100%;
            display: block;
            border-radius:0.12rem 0.12rem 0 0;
            vertical-align:top;
            display: block;
          }
        }
        .new-list{
          width: 100%;
          background-color:#ffffff;
          position: relative;
          .text{
            color:#999;
            .fs(30);
            .pt(20);
            .pb(20);

          }
          >li{
            >div{
              width: 100%;
              display: flex;
              justify-content: space-between;
            }

            .new-content{
              .pt(30);
              .pl(20);
              .pr(20);
              .pb(20);
              .fs(30);
              .left-title{
                .w(6);
                .h(6);
                .b-radius(3);
                background-color:#000;
              }
              span{display: inline}
            }
            .new-auth{
              .pl(20);
              .pr(20);
              .fs(27);
              .pb(20);
              color: #949494;
              border-bottom:1px solid #dedede;
            }
          }
        }
      }
    }
  }
</style>
