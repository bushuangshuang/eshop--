<template>
  <div class="garagetbox-box">
    <common-header :tittle="tittle" :showleft="true"  :routerLeft="routerLeft"></common-header>
    <van-cell-group title="车辆状态">
      <van-cell title="车辆状态" :value="TBoxInfo.carStatus" />
      <van-cell title="整车电源档位" :value="TBoxInfo.powerStatusFeedBack" />
      <van-cell title="充电状态" :value="getLabel(TBoxInfo.chargeStatus,'chargeStatus')" />
      <van-cell title="DCDC状态" :value="getLabel(TBoxInfo.dcStatus,'dcStatus')"  />
      <van-cell title="电池充电状态" :value="getLabel(TBoxInfo.batteryChargeStatus,'batteryChargeStatus')" />
      <van-cell title="充电枪连接状态" :value="getLabel(TBoxInfo.chargingGunConnectionState,'chargingGunConnectionState')" />
    </van-cell-group>
    <van-cell-group title="基础数据">
      <van-cell title="车辆编码" :value="TBoxInfo.driveMotorData_num" />
      <van-cell title="驱动电机序号" :value="TBoxInfo.driveMotorData_num" />
      <van-cell title="总里程信息">
        <template slot="default">
          <span class="custom-text">{{TBoxInfo.totalOdometer}}km</span>
        </template>
      </van-cell>
      <van-cell title="续航里程">
        <template slot="default">
          <span class="custom-text">{{TBoxInfo.remainedPowerMile}}km</span>
        </template>
      </van-cell>
      <van-cell title="平均能耗">
        <template slot="default">
          <span class="custom-text">{{TBoxInfo.averageEnergyConsumption}}kWh/100km</span>
        </template>
      </van-cell>
    </van-cell-group>
    <van-cell-group title="能源数据">
      <van-cell title="电池剩余百分比">
        <template slot="default">
          <span class="custom-text">{{TBoxInfo.soc}}%</span>
        </template>
      </van-cell>
      <van-cell title="总电压">
        <template slot="default">
          <span class="custom-text">{{TBoxInfo.totalVoltage}}V</span>
        </template>
      </van-cell>
      <van-cell title="电池单体电压最高值">
        <template slot="default">
          <span class="custom-text">{{TBoxInfo.maxVoltageBattery}}V</span>
        </template>
      </van-cell>
      <van-cell title="电池单体电压最低值">
        <template slot="default">
          <span class="custom-text">{{TBoxInfo.minVoltageBattery}}V</span>
        </template>
      </van-cell>
      <van-cell title="总电流" :value="TBoxInfo.totalCurrent"  />
      <van-cell title="最高温度值">
        <template slot="default">
          <span class="custom-text">{{TBoxInfo.maxTemperatureValue}}℃</span>
        </template>
      </van-cell>
      <van-cell title="最低温度值">
        <template slot="default">
          <span class="custom-text">{{TBoxInfo.minTemperatureValue}}℃</span>
        </template>
      </van-cell>
    </van-cell-group>
    <van-cell-group title="30天内报警数据">
      <van-cell title="电池剩余百分比">
        <template slot="default">
          <span class="custom-text">{{TBoxInfo.soc}}%</span>
        </template>
      </van-cell>
      <van-cell title="总电压">
        <template slot="default">
          <span class="custom-text">{{TBoxInfo.totalVoltage}}V</span>
        </template>
      </van-cell>
      <van-cell title="电池单体电压最高值">
        <template slot="default">
          <span class="custom-text">{{TBoxInfo.maxVoltageBattery}}V</span>
        </template>
      </van-cell>
      <van-cell title="电池单体电压最低值">
        <template slot="default">
          <span class="custom-text">{{TBoxInfo.minVoltageBattery}}V</span>
        </template>
      </van-cell>
      <van-cell title="总电流" :value="TBoxInfo.totalCurrent"  />
      <van-cell title="最高温度值">
        <template slot="default">
          <span class="custom-text">{{TBoxInfo.maxTemperatureValue}}℃</span>
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import commonHeader from 'common/common-header'
  import * as homeApi from '../../api/home-api'
  import { Toast } from 'vant'
export default {
  components: { commonHeader },
  name: 'garagetbox',
  data() {
    return {
      tittle: '详细信息',
      routerLeft: '/garage',
      TBoxInfo: {
        carStatus: '',
        powerStatusFeedBack: '',
        chargeStatus: '',
        dcStatus: '',
        batteryChargeStatus: '',
        chargingGunConnectionState: '',
        driveMotorData_num: '',
        totalOdometer: '',
        remainedPowerMile: '',
        averageEnergyConsumption: '',
        soc: '',
        totalVoltage: '',
        maxVoltageBattery: '',
        minVoltageBattery: '',
        totalCurrent: '',
        maxTemperatureValue: '',
        minTemperatureValue: ''
      },
      chargeStatusOption: [
        {
          value: 1,
          label: '停车充电'
        },
        {
          value: 2,
          label: '行车充电'
        },
        {
          value: 3,
          label: '未充电'
        },
        {
          value: 4,
          label: '充电完成'
        }
      ],
      dcStatusOption: [
        {
          value: 1,
          label: '工作'
        },
        {
          value: 2,
          label: '断开'
        }
      ],
      batteryChargeStatusOption: [
        {
          value: 0,
          label: 'uncharged'
        },
        {
          value: 1,
          label: 'charging'
        },
        {
          value: 2,
          label: 'full of charge'
        },
        {
          value: 3,
          label: 'charge end'
        }
      ],
      chargingGunConnectionStateOption: [
        {
          value: 0,
          label: '解锁'
        },
        {
          value: 1,
          label: '锁定'
        },
        {
          value: 2,
          label: '失败'
        }
      ]

    }
  },
  mounted() {
    this.getTBoxList()
  },
  methods: {
    getTBoxList() {
      let data = {
        vin: localStorage.getItem('vin')
      }
      homeApi.queryMyTbox(data).then(res => {
        if (res.data.code === '200') {
          this.TBoxInfo = res.data.data
        } else {
          Toast(res.data.msg)
        }
      })
    },
    getLabel(value, name) {
      let arr = []
      if (name === 'chargeStatus') {
        arr = this.chargeStatusOption
      } else if (name === 'dcStatus') {
        arr = this.dcStatusOption
      } else if (name === 'batteryChargeStatus') {
        arr = this.batteryChargeStatusOption
      } else if (name === 'chargingGunConnectionState') {
        arr = this.chargingGunConnectionStateOption
      }
      var label = ''
      for (var child of arr) {
        if (child.value == value) {//eslint-disable-line
          label = child.label
          break
        }
      }
      return label
    }
  }
}
</script>

<style scoped lang="less">
  .van-cell-group__title{
    text-align: left;
    line-height: 24px;
    background: rgba(255,116,20,0.1);
    padding: 8px 15px;
    color: #ff7414;
    font-size: 0.4rem;
    font-weight: bold;
  }
  .van-cell__title{
    text-align: left;
  }
</style>
