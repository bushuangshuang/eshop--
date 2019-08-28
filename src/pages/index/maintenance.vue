<template>
    <div class="maintenance-box">
      <div class="maintenance-header">
          <li class="h-left" @click="goBackRouter"><van-icon name="arrow-left" /></li>
          <li class="h-center"><span>尼欧 ||<van-icon name="arrow-down" /></span></li>
          <li class="h-right news" @click="publish">编辑</li>
      </div>
      <div class="maintenance-content">
        <div class="maintenance-banner">
          <img :src="imgFileUrl+fileAddress" alt="">
          <div class="banner-position">
            <li>保养良好，请你继续保持</li>
            <li>
              <div>
                  <h5>568.00</h5>
                  <p>总维保费</p>
              </div>
              <div>
                <h5>2019-01-01</h5>
                <p>上次保养</p>
              </div>
              <div>
                <h5>2019-06-01</h5>
                <p>下次保养</p>
              </div>
            </li>
          </div>
        </div>
        <div class="maintenace-record" v-for="(item,id) in listdata" :key="id">
          <li >
            {{item.title}}
          </li>
          <li><span>保养</span><span>{{item.maintain}}</span></li>
          <li><span>日期</span><span>{{item.date}}</span></li>
          <li><span>花费</span><span>{{item.expenditure}}元</span></li>
        </div>
      </div>
      <button>导出记录</button>
    </div>
</template>

<script>
import { imgFileUrl } from '../../apiconfig/index'
export default {
  name: 'maintenance',
  data() {
    return {
      imgFileUrl: imgFileUrl,
      fileAddress: '20190409013540564zOLYy',
      listdata: [
        {title: '123000公里保养', maintain: '发动机机油', date: '2019-01-01', expenditure: 258, id: '0'},
        {title: '123000公里保养', maintain: '发动机机油', date: '2019-01-01', expenditure: 258, id: '0'}
      ]
    }
  },
  methods: {
    publish() {
      this.$router.push('/maintenance/maintenance')
    },
    toNews() {
      this.$router.push('/message')
    },
    goBackRouter() {
      // this.$router.goBack()
      this.$router.push('/garage')
    }
  }
}
</script>

<style scoped lang="less">
  @import "~styles/index.less";
  @import "~styles/variable.less";
  .maintenance-box{
    width: 100%;
    height: auto;
    .fs(30);
    /*background: #F5F5F5;*/
    .maintenance-header{
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

       span{
         display: flex;
         justify-content: center;
         align-items: center;
       }
      }
      .h-right{
        width: 15%;
        text-align: left;
        color: #F47442;
        .van-icon {
          line-height: 50px;
          font-size: 0.6rem;
        }
      }
    }
    .maintenance-content{
      width: 100%;
      height: auto;
      .maintenance-banner{
        width: 100%;
        height: 100%;
        position: relative;
        margin-bottom: 1.3rem;
        .banner-position{
          width: 90%;
          height: 2.5rem;
          border-radius: 0.2rem;
          background: #fff;
          position: absolute;
          top: 3.5rem;
          left: 0.5rem;
          padding-top: 0.3rem;
          margin-bottom: 1.3rem;
          li:nth-child(2){
            margin: 0.2rem auto;
            width: 90%;
            display: flex;
            justify-content: space-between;
            letter-spacing: 0.01rem;
            div{
              h5{
                margin-bottom: 0.1rem;
                .fs(30);
                font-weight: 600;
                color: #F47442;
              }
            }

          }
        }
        img{
          width: 100%;
          height: auto;
        }
      }

      .maintenace-record{
        width: 95%;
        height: auto;
        padding: 0.3rem;
        background: #fff;
        margin: 0 auto;
        border-radius: 0.2rem;
        line-height: 1rem;
        margin-bottom: 0.5rem;
        li{
          width: 100%;
          display: flex;
          justify-content: space-between;
          color: #7A7A7A;
          letter-spacing: 0.01rem;

        }
        li:nth-child(1){
          border-bottom: 1px solid #E3E3E3;
          color: #000;
        }
        li:last-child{
          span:last-child{
            color: #FF4F2A;
            font-weight: 600;
          }
        }
      }
    }
    button{
      width: 100%;
      height: 1.5rem;
      color: #fff;
      background: #ff7414;
      text-align: center;
      line-height: 1.5rem;
      position: fixed;
      bottom: 0;
      left: 0;
      border: none;
      outline: none;
      margin-top: 1.5rem;
      .fs(30);
      letter-spacing: 0.05rem;

    }
  }

</style>
