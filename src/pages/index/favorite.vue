<template>
    <div class="favorite-box">
      <common-header :tittle="tittle" :showleft="true" :showright="true" :routerLeft="routerLeft"></common-header>
      <div class="favorite-content">
        <mt-navbar v-model="selected">
          <mt-tab-item id="name1" >
            <span @click="tabChange('name1')" style="font-size:16px">车辆</span>
          </mt-tab-item>
          <mt-tab-item id="name2" >
            <span @click="tabChange('name2')" style="font-size:16px">文章</span>
          </mt-tab-item>
        </mt-navbar>
        <div class="order-list">
          <div class="order-list-bg">
            <mt-tab-container v-model="selected">
              <mt-tab-container-item id="name1">
                <div v-if="tabList.length!=0" v-for="item in tabList">
                  <van-swipe-cell :right-width="60" :on-close="onClose" >
                  <div class="content-tab">
                    <li>
                        <span>
                          <!--<van-radio-group v-model="radio" >-->
                            <!--<van-radio name="1">XXX经销商</van-radio>-->
                        <!--</van-radio-group>-->
                        </span>
                        <span>库存充足</span>
                    </li>
                    <li>
                      <div class="left">
                        <img :src="imgFileUrl+item.url" alt="">
                      </div>
                      <div class="right">
                        <p>
                          <span>{{item.carProductStyle}}{{item.classNm}}&nbsp;</span>
                        </p>
                        <p></p>
                        <p><span>容量:{{item.carPowerBatkwh}}kwh</span><span>续航:{{item.carPowerMaxKm}}km</span></p>

                        <p><span>指导价格：<b>{{item.carProductPrice}}万</b></span></p>
                      </div>
                    </li>
                    <li>
                      <button class="btn">立即下单</button>
                      <!--<button class="btn" @click="friend">好友推荐</button>-->
                      <!--<router-link tag="button" :to="{name:'orderinfo',params:{info:item.id}}" class="btn">查看详情</router-link>-->
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

                </div>
                <div v-if="tabList.length==0" class="nullTip">
                  <img src="../../assets/image/tipNull.png">
                  <p>暂无数据</p>
                </div>
              </mt-tab-container-item>
              <mt-tab-container-item id="name2"  >
                <div v-if="tabList2.length!=0" >
                  <div class="content-tab2" v-for="item in tabList2">
                    <li>
                      <div class="left">
                        <img :src="imgFileUrl+item.url" alt="">
                          <div>
                            <p style="color: #000;">{{item.author}}</p>
                            <p>{{item.tab}}</p>
                            <!-- <p>{{item.createdate}}</p> -->
                            <p>{{item.collectName}}</p>
                          </div>
                      </div>
                      <div class="right">
                        <button @click="cancel">取消</button>
                      </div>
                    </li>
                    <li>
                      {{item.title}}
                    </li>
                    <li>{{item.content}}</li>
                  </div>
                </div>
                <div v-if="tabList.length==0" class="nullTip">
                  <img src="../../assets/image/tipNull.png">
                  <p>暂无数据</p>
                </div>
              </mt-tab-container-item>
            </mt-tab-container>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import commonHeader from 'common/common-header'
import * as homeApi from '../../api/home-api'
import { imgFileUrl } from '../../apiconfig/index'
import { Dialog, Toast } from 'vant'
export default {
  name: 'favorite',
  components: { commonHeader },
  data() {
    return {
      tittle: '收藏夹',
      routerLeft: '/day',
      imgFileUrl: imgFileUrl,
      selected: 'name1',
      tabList: [],
      tabList2: [ ],
      radio: ''
    }
  },
  mounted(){
    this.Collectionvehicles()
  },
  methods: {
    cancel(){
      let params={
        collectType:"2",
        businessId:"1"
      }
        homeApi.cancelCollection(params).then(res=>{
          if(res.data.code=='200'){
            Toast ('取消成功')
              this.gettArticle()
          }else{
             Toast(res.data.msg)
          }
        }).catch(err=>{
          console.log(err)
        })
    },
    tabChange(selected) {
      if(selected=='name1'){
        this.Collectionvehicles()
      }else{
        this.gettArticle()

      }

    },
    onClose(clickPosition, instance) {
      switch (clickPosition) {
        case 'cell':
        case 'outside':
          instance.close();
          break;
        // case 'right':
        // Dialog.confirm({
        //   title:'确定删除吗',
        //
        //
        // }).then(() => {
        //   console.log()
        //   // this.tabList.splice(1,1)
        // }
        // )
        // break;
      }
    },
    friend() {

    },
    deletd(id){
      Dialog.confirm({
        title:'确定删除吗',
      }).then(() => {
        console.log(id,'id')
        let params={
          id:id
        }
        homeApi.cancelCollection(params).then(res=>{

          // window.location.reload()
          this.Collectionvehicles()
        }).catch(err=>{
          console.log(err)
        })
      })

    },
      gettArticle(){
        let params={
         pageNumber:"1",
         pageSize:"10",
         collectType:"2"
        }
        homeApi.gettArticle(params).then(res=>{
          this.tabList2=res.data.page.list
        }).catch(err=>{
          console.log(err)
        })
      },
      Collectionvehicles(){
        let paramss={
          pageNumber:"1",
          pageSize:"10",
          collectType:'1'
        }
        homeApi.Collectionvehicles(paramss).then(res=>{
          this.tabList=res.data.page.list

        }).catch(err=>{
          console.log(err)
        })
      }


  }
}
</script>

<style scoped lang="less">
  @import "~styles/index.less";
  @import "~styles/variable.less";
  .favorite-box{
    width: 100%;
    height: auto;
    .favorite-header{
      width: 100%;
      height: 1.35rem;
      display:flex;
      justify-content: space-between;
      background: #fff;
      align-items: center;
      padding: 0 0.4rem;
      .fs(30);
      border-bottom: 0.01rem solid #ECECEC;
      li:nth-child(1){
        img{
          width: 0.3rem;
          height: 0.5rem;
        }
      }
      li:nth-child(3){
        img{
          width: 0.4rem;
          height: 0.4rem;
        }
      }
    }
    .favorite-content{
      .order-list{
        .padding(10,10);
        background-color: #ffffff;
        .order-list-bg{
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
                    margin-right: 0.5rem;
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
  }
</style>




