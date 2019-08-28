<template>
    <div class="new">
      <div class="bgcolor" style="height: 0.2rem"></div>
        <div class="new-title">
          <h4>最新文章</h4>
        </div>
        <div class="news-bg">
          <div class="img" @click="newinfo">
            <img :src="!!oneImg?imgFileUrl+oneImg:''" alt="">
            <h4>{{oneTitle}}</h4>
          </div>
          <div class="new-list">
            <li v-for="item in showList" @click="newinfo">
              <div class="new-content">
                {{item.title}}
              </div>
              <div class="new-auth">
                <span>{{item.author}}</span>
                <span>{{item.publishtime}}</span>
              </div>
            </li>
            <div @click="showAll=!showAll" class="text">{{word}}</div>
          </div>
        </div>
    </div>
</template>

<script>
import { MessageBox } from 'mint-ui'
import * as homeApi from '../../api/home-api'
import { imgFileUrl } from '../../apiconfig/index'
import { Toast } from 'vant'
export default {
  name: 'new',
  components: {
    Toast
  },
  data() {
    return {
      newlist: [],
      showAll: false,
      imgFileUrl: imgFileUrl,
      oneImg: '',
      oneTitle: ''
    }
  },
  computed: {
    showList: function () {
      if (this.showAll == false) {
        var showList = []
        if (this.newlist.length > 2) {
          for (var i = 0; i < 2; i++) {
            showList.push(this.newlist[i])
          }
        } else {
          showList = this.newlist
        }
        return showList
      } else {
        return this.newlist
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
  mounted() {
    this.getlist()
  },
  methods: {
    getlist() {
      let data = {
        pageNumber: 1,
        pageSize: 10
      }
      homeApi.article(data).then(res => {
        if (res.data.code === '200') {
          this.newlist = res.data.page.list
          if (!!res.data.page.list[0]) {
            this.oneImg = res.data.page.list[0].url
            this.oneTitle = res.data.page.list[0].title
          }
        } else {
          Toast(res.data.msg)
        }
      })
    },
    newinfo() {
      this.$router.push('/newinfo')
    },
    toNews() {
      this.$router.push('/newlist')
    }
  }
}
</script>

<style scoped lang="less">
  @import "~styles/index.less";
  @import "~styles/variable.less";
  .new{
    width: 100%;
    height: auto;
    .pt(40);
    background-color: #ffffff;
    .new-title{
      width: 100%;
      height: 1rem;
      display: flex;
      justify-content: space-between;
      .pl(30);
      .pr(30);
      .pb(10);
      align-items: center;
      >h4{
        color: #FF6300;
        font-weight: 700;
        .fs(35);
        .pt(20);
        .pb(20);
      }
      span{
         color:#999999;
        .fs(32);
      }
    }
    .news-bg{
      .pl(30);
      .pr(30);
      .pt(24);
      .pb(24);
      border:1px solid #f5f5f5 ;
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
</style>
