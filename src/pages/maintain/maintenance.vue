<template>
    <div class="maintenance-box">
      <common-header :tittle="tittle" :showleft="true" :routerLeft="routerLeft" :showrightt="true" :routerpublic="routerpublic" :righttitle="righttitle"></common-header>
      <div class="maintenance-content">
        <div class="relname-list">
          <van-cell-group>
            <van-field clearable v-model="from.realName" label="行驶里程" placeholder="请输入行驶里程"  />
            <div class="address-box">
              <van-field clearable v-model="from.cardIssueDateName" label="卡片日期" @click="selAddress('date')" placeholder="请选择卡片日期" />
              <span @click="selAddress('date')" class="selectStyle">选择</span>
            </div>
            <van-field clearable v-model="from.realName" label="保养花费" placeholder="请输入保养花费"  />
            <van-field clearable v-model="from.realName" @click="objectclick" label="保养项目" placeholder="请选择保养项目"  />
            <div class="address-box">
              <van-field clearable v-model="from.address" label="保养城市" @click="selAddress('area')" placeholder="请输入保养城市" />
              <span @click="selAddress('area')" class="selectStyle">选择</span>
            </div>
            <van-field clearable v-model="from.realName" label="保养店铺" placeholder="请输入保养店铺"  />
            <van-field clearable v-model="from.realName" label="服务评价" placeholder="请输入评价" type="textarea" rows="1" autosize />
          </van-cell-group>
          <!--<li>
            <mt-field label="行驶里程" placeholder="请输入行驶里程" type="text" v-model="from.username"></mt-field>
          </li>
          <li>
            <mt-field label="保养日期" placeholder="请选择保养日期" type="date" v-model="from.bankCardDate"></mt-field>
          </li>
          <li>
            <mt-field label="保养花费" placeholder="请输入保养花费" type="text" v-model="from.username"></mt-field>
          </li>
          <li @click="objectclick">
            <mt-field label="保养项目" placeholder="请选择保养项目" type="text" v-model="from.region" ></mt-field>
          </li>
          <li>
            <mt-field label="保养城市" placeholder="请选择城市" type="select" v-model="from.identType"></mt-field>
          </li>
          <li>
            <mt-field label="保养店铺" placeholder="请输入店铺名称" type="number" v-model="from.ident"></mt-field>
          </li>
          <li>
            <mt-field label="服务评价" placeholder="请输入评价" type="number" v-model="from.bankCardCode"></mt-field>
          </li>-->
          <van-popup v-model="areaAndTypeShow" position="bottom" :overlay="true">
            <van-area v-if="isSelectedPopup=='area'?true:false" :area-list="areaList" v-model="from.address" @confirm="selectedArea" @cancel="cancelArea" />
            <van-datetime-picker v-if="isSelectedPopup=='date'?true:false" type="date" v-model="from.cardIssueDate"  @confirm="selectDate" @cancel="cancelArea" />
          </van-popup>
        </div>
        <div class="maintenance-text">
          <div class="text-content">
            <h4>保养心得</h4>
            <p>
              费用低，更实惠，价格只有4s店的几分之一服务透明,全程监控保养完之后可以通过视频查看操作全程。费用低
              更实惠，价格只有4s店的几分之一服务透明,全程监控保养完之后可以通过视频查看操作全程
            </p>
          </div>
         <div class="text-content">
           <h4>保养单据</h4>
           <table>
             <tr>
               <td>保养项目</td>
               <td>材料</td>
               <td>配件材料费(元)</td>
               <td>工时费(元)</td>
             </tr>
             <tr>
               <td>火花塞</td>
               <td>原厂</td>
               <td>258</td>
               <td>2</td>
             </tr>
             <tr>
               <td>合计</td>
               <td></td>
               <td>258</td>
               <td>2</td>
             </tr>
           </table>
         </div>

        </div>
      </div>

    </div>
</template>

<script>
import commonHeader from 'common/common-header'
import AreaList from '../../assets/area.js'

export default {
  name: 'maintenance',
  data() {
    return {
      tittle: '保养记录',
      righttitle: '发布',
      routerLeft: '/maintenance',
      routerpublic: '/maintenance',
      areaList: AreaList,
      currentDate: new Date(),
      show: false,
      mileage: '',
      date: '',
      expenditure: '',
      username: '',
      object: '',
      city: '',
      store: '',
      evaluate: '',
      from: {
        username: '',
        sex: '',
        email: '',
        phone: '',
        region: '',
        testCode: '',
        identType: '',
        ident: '',
        bankCardCode: '',
        bankName: '',
        bankCardDate: '',
        bankPhone: ''
      },
      areaAndTypeShow: false,
      isSelectedPopup: false
    }
  },
  components: {
    commonHeader
  },
  methods: {
    objectclick() {
      this.$router.push('/maintenance/MaintenanceProject')
    },
    selAddress(status) {
      this.isSelectedPopup = status
      this.areaAndTypeShow = true
    },
    selectedArea(value) {
      if (value[0].name == value[1].name) {
        this.from.address = value[0].name + value[2].name
      } else {
        this.from.address = value[0].name + value[1].name + value[2].name
      }
      this.areaAndTypeShow = false
    },
    selectDate(value) {
      console.log('datevalue===' + JSON.stringify(value))
      if (value==undefined&&value==null&&value=='') {
        value = new Date()
      }
      let year = value.getFullYear()
      let month = value.getMonth() + 1
      let date = value.getDate()
      this.from.cardIssueDate = value
      this.from.cardIssueDateName = year + '/' + (month.toString().length == 1 ? '0' + month : month) + '/' + (date.toString().length == 1 ? '0' + date : date)
      this.areaAndTypeShow = false
      console.log('this.from.cardIssueDate====' + JSON.stringify(this.from.cardIssueDate))
    },
    cancelArea() {
      this.areaAndTypeShow = false
    }

  }
}
</script>

<style scoped lang="less">
  @import "~styles/index.less";
  @import "~styles/variable.less";
  .maintenance-box{
    .maintenance-content{
      .relname-list{
        background-color: #ffffff;
        .padding(0,20);
        .van-field{
          .padding(0,10);
          border: none;
          line-height:45px;
          .fs(30);
        }
        .van-radio-group{
          width: 100%;
          .fs(30);
          line-height:45px;
          display: flex;
          justify-content: flex-start;
          .van-radio{
            .mr(50)
          }
        }
        .address-box{
          position: relative;
          .selectStyle{
            width: 1.2rem;
            height: 0.6rem;
            font-size: 0.4rem;
            position: absolute;
            right: 0;
            top: 50%;
            margin-top: -0.3rem;
          }
        }
        .btn{
          .pl(30);
          .pr(30);
          .pb(40);
          .mint-button--normal{
            width: 100% !important;
            background: #F45416;
          }
        }
        .idcard{
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .pt(40);
          .pb(40);
          .pl(70);
          .pr(70);
          label{
            position: relative;
          }
          .identfileinp{
            position: absolute;
            left: 0;
            top: 0;
            opacity: 0;
          }
          .identBtn{
            margin-right: 5px;
          }
          .identText{
            color: #ccc;
          }
          div{
            width: 40%;
            border: 1px solid #EBEBEB;
            background: #F7F7F7;
            text-align: center;
            .pt(20);
            .pb(40);
            .input-z{
              width:90%;
              height: 2rem;
              border: 3px dotted #ccc;
            }
            .van-uploader{
              width: 1.5rem;
              height: 1.5rem;
              border: 3px dotted #ccc;
              margin: 0 auto;
              margin-top: 0.3rem;
              border-radius: 0.3rem;
              display: flex;
              justify-content: center;
              align-items: center;
              line-height: 1.5rem;
              .img-icon{
                .mt(20);
                width:60%;
              }
              .img-file{
                position: absolute;
                width: 135%;
                top: -0.15rem;
              }
            }
          }
        }
      }
      /*li{
        .mint-cell{
          .mint-cell-wrapper{
            border-bottom: 1px solid #E6E6E6 !important;
            .fs(30)
          }
        }

        .van-cell {
          .mint-field-core{
            background: #fff;
          }
          padding-left: 0.4rem;
         text-align: left;
          .fs(30);
          letter-spacing: 0.06rem;
          height: 45px;
          line-height: 45px;
        }
      }*/
      .maintenance-text{
        .text-content{
          background: #fff;
          margin-bottom: 0.4rem;
          table{
            width: 100%;
            background: #fff;
            margin-top: 0.3rem;
            tr{
              width: 100%;
              display: flex;
              justify-content: space-between;
              td{
                text-align: center;
                flex-wrap: nowrap;
                width: 23%;
                border: 1px solid #000;
              }
              td:nth-child(3){
                width: 32%;
                /*border-top: none;*/
              }
            }
          }
          padding: 0.4rem;
          >h4{
            color: #F47442;
          }
          p{
            margin-bottom: 0.3rem;
          }
          line-height: 0.7rem;
          .fs(30);
          text-align: left;
          width: 100%;
          height: auto;

        }
        }

    }
  }
</style>
<style type="text/css">
  .van-cell:not(:last-child)::after{
    left: 0px;
  }
  .van-field__error-message {
    line-height: 30px;
    font-size: 0.4rem;
  }
  .van-cell__title, .van-cell__value{
    text-align: left;
  }
</style>
