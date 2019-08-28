<template>
    <div class="feedback-box">
      <common-header :tittle="tittle" :showleft="true"  :routerLeft="routerLeft" ></common-header>
      <div class="feedback-content">
        <van-cell-group :border=false >
          <van-field v-model="value" placeholder="请填写您的问题或者建议" type="textarea" />
        </van-cell-group>
        <van-uploader  accept="image/gif, image/jpeg" multiple :max-count="2" :after-read="onReadIdCardVerso">
          <img class="img-icon" src="../../assets/image/aboutupload.png" alt="">
          <img class="img-file" v-if="(from.idCardVerso!=undefined&&from.idCardVerso!=null&&from.idCardVerso!='')?true:false" :src="!!from.idCardVerso?imgFileUrl+from.idCardVerso:''" alt="">
        </van-uploader>
      </div>
      <div class="feedback-phone">
        <van-cell-group :border=false >
          <van-field
            v-model="userphone"
            label="联系方式"
            placeholder="请输入您的手机微信QQ便于联系您"
            class="phone"
          />
        </van-cell-group>
      </div>
      <van-button type="default" class="btn" @click="add">提交反馈</van-button>
    </div>
</template>

<script>
  import commonHeader from 'common/common-header'
  import * as homeApi from '../../api/home-api'
  import { imgFileUrl } from '../../apiconfig/index'
    export default {
        name: "feedback",
        components:{commonHeader},
        data(){
            return{
              tittle:"帮助与反馈",
              routerLeft:'/index/out',
              value:'',
              fileList: [],
              userphone:'',
              imgFileUrl: imgFileUrl,
            from:{
              idCardVerso: ''
            }
            }
        },
      methods:{
          // 提交按钮
        add(){
        },
        // 图片上传至服务器
        onReadIdCardVerso(file){
          this.from.idCardVerso = ''
          const formData = new FormData()
          formData.append('upfile', file.file)
          homeApi.uploadFile(formData).then(res => {
            if (res.data.code === '200') {
              this.from.idCardVerso = res.data.list[0]
            } else {
              Toast(res.data.msg)
            }
          }).catch(err => {
            console.log(err)
          })
        }
      }
    }
</script>

<style scoped lang="less">
  @import "~styles/index.less";
  @import "~styles/variable.less";
  .feedback-box{
    width: 100%;
    height: auto;
    border: none !important;
    .van-field__label {
      max-width: 116px !important;
    }
    .feedback-content{
      width: 100%;
      background-color: #fff;
      .fs(30);
      text-align: left;
      padding-left: 0.8rem !important;
      padding-right: 0.8rem !important;
      padding-top: 1rem;
      margin-bottom: 0.3rem;
      padding-bottom: 0.5rem;
      .img-icon{
        width: 2rem;
        height: 2rem;
      }
      .img-file{
        width: 2rem;
        height: 2rem;
      }
    }
    .feedback-phone{
      .fs(30);
      .phone{
        height: 1rem !important;
        line-height: 1rem!important;
        padding-left: 0.3rem;
        padding-right: 0.8rem;
      }
    }
    .btn{
      width: 100%;
      position: fixed;
      bottom: 0;
      left: 0;
      background-color: #E6E6E6;
      .fs(30);

    }
  }
</style>
