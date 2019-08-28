<template>
  <div class="box">
    <common-header :tittle="tittle" :showleft="true" :routerLeft="routerLeft" style="position:fixed;z-index: 10000"></common-header>
    <comparison
      :data = "list3"
      :contrast = "contrast"
      :props = "compProps"
      @add-item = "addItemHander"
      @hide-item="hide"
    >
      <div slot="symbol">
        <span class="tp-icon">-无</span>
        <span class="tp-icon">○选配</span>
        <span class="tp-icon">●标配</span>
      </div>
    </comparison>
  </div>
</template>
<script>
  import comparison from 'vue-comparison/src/components/Comparison'
  import commonHeader from 'common/common-header'
  import * as homeApi from '../../api/home-api'
export default {
  name: 'Vehiclecontrast',
  data() {
    return {
      // mockData,
      compProps: {
        name: 'name',
        key: 'id'
      },
      // 对比分组信息
      contrast: [{
        name: '基本信息',
        keys: {
          carProductCd: '产品编码',
          carProductNm: '产品名称',
          carProductUcd: '产品识别码',
          carProductStyle: '产品款式',
          carProductVer: '产品版本',
          carProductPrice: '厂商指导价格',
          carProductKeep: '保修政策',
          carProductKind: '产品类型',
          carProductIntro:'产品简介',
          productCd:'车系号',
          classSource:'来源',
          createDate:'产生时间',
          carProductPic:'产品图片',
          earnestMoney: '订金',
          lastUpdTime: '最后更新时间',
          lastUpdAcct: '最后更新流水',
          carWarehouse:'库存',
          lastUpdTtime:'最后更新时间',
          onSale:'是否在售',
        }
      },
        {
        name: '驾驶辅助信息',
        keys: {
          carConstantSpeed:'定速巡航',
          laneRetention:'车道保持',
          parallelAuxiliary: '并线辅助',
          collisionAlarm:'碰撞报警',
          fatigueReminder:'疲劳提醒',
          autoPaking:'自动泊车',
          teleParking:'遥控泊车',
          autopilotAssis:'自动驾驶辅助',
          autoStation:'自动驻车',
          uphillAssis:'上坡辅助',
          hillDecentCon:'陡坡缓降',
          nightVersion:'夜视系统',
          varGearSteer:'可变齿轮转向',
          panorama:'全景影像',
          reverseSensorF:'前/后倒车雷达',
          backupEffect:'倒车影像',
          choiseDriveMode:'驾驶模式选择',
          nightVision:'夜视系统',
          autoParking:'自动泊车',
        }
      }, {
        name: '底盘信息',
        keys: {
          drivingMode:'驱动方式',
          FrontType:'前悬架类型',
          backType:'后悬架类型',
          susAdjust:'可调悬架',
          frontBrakeT:'前轮制动器类型',
          backBreakT:'前轮制动器类型',
          parkBrakeT:'驻车制动器类型',
          assistType: '助力类型',
          carStructure: '车体结构',
          slipDifferential:'限滑差速器',
          approachAngle:'接近角',
          departureAngle:'离去角',
          directionalLock:'方向锁',
          acceleratorPedal:'油门踏板',
          frontType:'前悬架类型',
        }
      },
        {
        name: '外部配置信息',
        keys: {
          carHeadlight: '前大灯',
          carLed:'日间行车灯',
          carAutolight:'自动大灯',
          carFoglampe:'前/后雾灯',
          carLightFunc:'大灯功能',
          stopLamp:'制动灯',
          carWindowFe:'前电动车窗',
          carWindowBe:'后电动车窗',
          carRearviewAdjust:'外后视镜电动调节',
          approachAngle:'内后视镜自动防眩目',
          rearviewMirrorEf:'外后视镜功能',
          carMediaRear:'流媒体后视镜',
          carDazzlingEx:'外后视镜自动防眩目',
          carPrivacyGlass:'隐私玻璃',
          carSunshade:'后排侧遮阳帘',
          carSunshadeCur:'后遮阳帘',
          carRearWiper:'前/后雨刷器',
          defrostFogging:'除霜除雾',
          carSuctionDoor:'电吸门',
          carSlideGate:'电动侧滑门',
          electricBackupBox:'电动后备箱',
          carLuggRack:'行李架',
          centralControlLock:'中控锁',
          intelligentKey:'智能钥匙',
          externalAntenna:'外置天线',
          telecontrol: '远程遥控功能',
          empennage:'尾翼/扰流板',
          sportSuit:'运动外观套件',
          carWiperFront:'前雨刷器',
          carDazzlingInner:'内后视镜自动防炫目',
          compartmentType:'车身类型',
          carEsp:'车身稳定控制',
          carSkylightT:'天窗类型',
        }
      },
        {
          name: '动力系统信息',
          keys: {
            carPowerSvolume:'排气量',
            carPowerKw:'最大功率',
            carPowerMaxPs:'最大马力',
            carPowerMaxNmRpm:'最大扭矩转速',
            carPowerMaxRpm:'最大功率转速',
            carPowerOilType:'供油方式',
            carPowerCpum:'气缸数',
            carPowerCylinder:'缸体形式',
            carPowerStart:'发动机启停',
            carPowerOilNum:'燃油标号',
            carPowerAccs:'0-100km/h加速时间',
            carPowerMaxSpeed:'最高车速',
            carPowerTnum:'档位个数',
            carPowerT:'变速箱类型',
            carPowerZnm:'电动机总扭矩',
            carPowerZkw:'电动机总功率',
            carPowerEp:'环保标准',
            carPowerOilBee:'混合工况油耗',
            carPowerCylinder:'缸体形式',
            carPowerBemnm: '后电动机最大扭矩',
            carPowerBatTime:'电池充电时间',
            carPowerBatkwh:'电池容量',
            carPowerHemnm:'前电动机最大扭矩',
            carPowerBemkw:'后电动机最大功率',
            carPowerBatBee:'耗电量',
            carPowerMaxKm:'最大续航里程',
            carPowerHemkw:'前电动机最大功率',
            carPowerBatkwh:'电池容量',
            carPowerBatQa:'电池组质保',
            brsSystem:'BRS系统',
            motorType:'发动机型号',
            carPowerMaxNm:'最大扭矩',
            motorMaterial:'发动机材质',
            batteryBrand:'电池品牌',
          }
        },
        {
          name:'车辆尺寸信息',
          keys:{
            carSize:'长*宽*高',
            carPowerIa:'进气形式',
            backBrakeT:'后轮制动器类型',
            carSizeTyreB:'后轮胎规格',
            carSizeTyreA:'前轮胎规格',
            carSizeWheelbase:'轴距',
            carSizeMass:'整备质量',
            carSizeLvolume:'行李箱容积',
            carSizeMinTd:'最小弯直径',
            carSizeTyreC:'备胎',
            carSizeMaxTd: '最小离地间隙',
            carSizeOvolume:'油箱容积',
            carSizeSeat:'座位数',

          }
        },
        {
          name:'安全配置信息',
          keys:{
            carAirbagM:'主驾驶安全气囊',
            carAirbagV:'副驾驶安全气囊',
            carAirbagF:'前侧气囊',
            carAirbagB:'后侧气囊',
            beltAirbag:'安全带气囊',
            tubeCentral:'后排中央气囊',
            carChildChair:'儿童座椅接口',
            carEbd:'制动力分配',
            arAbs:'ABS防抱死',
            carSafeCur:'侧安全气帘',
            carKneeBall:'膝部气囊',
            arTyreP:'胎压监测',
            carTyreE:'零胎压续航轮胎',
            carBa:'制动辅助',
            carArs:'牵引力控制',

          }
        },
        {
          name:'内部配置信息',
          keys:{
            steerWheelHeat:'方向盘加热',
            steerWheelMa:'方向盘材质',
            steerWheelMul: '多功能方向盘',
            steerWheelAdjust:'方向盘调节',
            cosmeticMirror:'遮阳板化妆镜',
            steerWheelChgn:'方向盘换挡',
            carAtmosLamp:'车内氛围灯',
            fragSys:'香氛系统',
            airConditionB:'后排空调',
            airConditionF:'前排空调',
            onboardRefrige: '车载冰箱',
            copilotSeat: '副驾驶座椅调节',
            masterSeat:'主驾驶座椅调节',
            interiorMaterial:'内饰材质',
            airConditionB:'后排空调',
            seatArrangeForm:'座椅排列形式',
            otherSeat: '其它座椅调节',
          }
        },
        {
          name:'娱乐信息',
          keys:{
            wirelessCharge:'手机无线充电',
            carplay:'手机互联',
            driveDisplayScreen:'行车电脑显示屏',
            dashBoard:'全液晶仪表盘',
            crystalScreen: '中控彩色液晶屏',
            speakerNum:'扬声器数量',
            systemEnt:'后排液晶屏',
            powerSupply:'车载电源',
            audioBrand:'音响品牌',
            airPurge:'空气净化',
            carAutoIight:'自动大灯',
            gestureControl:'手势控制系统',
            cdDvd: 'cdDvd',
            blueWifi:'蓝牙/wifi连接',
            guideGps:'GPS导航',
            voiceControl:'语音控制',
            externalInterface:'外接接口',
            hudDisplay:'HUD平视显示',
            carTv:'车载电视',
            radio:'收音机',
          }
        },
        ],
      routerLeft: '/day',
      tittle: '车辆对比',
      list3: [],
      keyS:'',
      datalist:['1',]
    }
  },
  components: {
    commonHeader,comparison
  },
  mounted() {
    this.getlist()
  },
  methods: {
    hide(){
      console.log('123',this.list3)
    },
    addItemHander(){
      this.$router.push('/shopcar')
    },
    getlist() {
      let params = {
        carIds: this.$route.query.name
      }
      homeApi.Vehiclecontrast(params).then(res => {
        let carnumber = res.data.CarComparison
        let listobj=[]
        let dateList=[]
        console.log('carnumber===',carnumber)
        for(var i=0;i<carnumber.length;i++){
          listobj=carnumber[i].CarDetail.tCarAdas
          listobj=carnumber[i].CarDetail.tCarBasic
          listobj=carnumber[i].CarDetail.tCarChassis
          listobj=carnumber[i].CarDetail.tCarEnt
          listobj=carnumber[i].CarDetail.tCarIconfiguration
          listobj=carnumber[i].CarDetail.tCarPower
          listobj=carnumber[i].CarDetail.tCarSecurity
          listobj=carnumber[i].CarDetail.tCarSize
          listobj=carnumber[i].CarDetail.tCarEconfiguration
          for(var item in carnumber[i].CarDetail.tCarBasic){
            listobj.name=carnumber[i].CarDetail.tCarBasic.carProductNm
          }
          dateList.push(listobj)
          this.list3=dateList
        }
      }).catch(err => {
        console.log(err)
      })
    },
  }
}
</script>
<style lang="less">
  @import "~styles/index.less";
  @import "~styles/variable.less";
  .compare-header .main .slide .column .icon-add[data-v-45605f3f] {
    display: inline-block;
    width: 1.2em;
    height: 1.2em;
    background-color: #ccc;
    border-radius: 100%;
    line-height: 1.2em;
    text-align: center;
    font-weight: normal;
    font-size: 35px;
    color: #fff;
    margin: 1.5rem 0 0 0.7rem!important;
  }
  .slide .column h4[data-v-45605f3f] {
    margin: 0;
    height: 3rem;
    margin-top: 1.125rem;
    padding: 0 0.25rem;
    font-size: 0.75rem;
    font-weight: bold;
    color: #444;
    line-height: 2.3rem!important;
    white-space: normal;
    overflow: hidden;
    display: box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .markup .tp-icon[data-v-2c013d26] {
    font-size: 0.3rem!important;
    float: right;
    margin-left: 10px;
  }
  strong[data-v-2c013d26] {
    margin-left: 0.5rem;
    font-size: 0.3rem!important;
  }
  .compare-detail{
    margin-top: 1.3rem!important;
  }
  .compare-detail .left{
    width: 3rem!important;
  }
  .compare-detail .left .group h4{
    text-align: left!important;
    font-size: 0.3rem!important;
  }
  .compare-header .main .slide .column .reduce[data-v-45605f3f] {
    position: absolute;
    top: 52px!important;
    right: 0;
    z-index: 10;
    font-style: normal;
    width: 0.5rem!important;
    height: 0.5rem!important;
    font-size: 0.3rem!important;
    line-height: 0.5rem!important;
    border-radius: 50% !important;
    text-align: right;
    text-align: center;
    background-color: #ccc;
    color: #fff;
  }

  .compare-detail .main .slide .data .group .item:first-child{
    margin-top: 0!important;
  }

  .compare-detail .left .group {
    width: 3rem!important;
  }
  .compare-detail .left .group .item .inner {
    height: 1rem!important;
    font-size: 0.3rem!important;
    color: #666;
    line-height: 1.5rem!important;
  }
  .compare-detail .main .slide .data .group .item .inner[data-v-45605f3f] {
    display: table-cell;
    height: 1rem!important;
    padding: 0!important;
    font-size: 0.3rem!important;
    line-height: 1rem!important;
    text-align: center;
    vertical-align: middle;
    white-space: normal;
    border-top: solid #d7d7d7 1px;
    width: 3rem!important;

  }
  .compare-detail .main .slide .data .group[data-v-45605f3f] {
    width: auto;
    margin-top: 0.9rem!important;
  }
  .markbar{
    font-size: 0.3rem!important;
    text-align: left!important;
  }
  .compare-detail .left .group .item .inner{
    display: table-cell;
    height: 4rem;
    padding: 0 !important;
    font-size: 0.3rem!important;
    color: #666;
    line-height: 1rem!important;
    text-align: center;
    vertical-align: middle;
    white-space: normal;
    border-top: solid #d7d7d7 1px;
    word-wrap: break-word;
    word-break: break-all;
  }
  .compare-header {
    height: 3rem !important;
    line-height: 1.5rem !important;
    .left{
      width: 3rem !important;
      .group{
        width: 3rem !important;
        font-size: 0.3rem !important;
      }
    }
  }

  .compare-header .main .slide .column{
    line-height: 1.5rem !important;
    width: 4rem !important;
    font-size: 0.3rem !important;
  h4{
    font-size: 0.3rem!important;
  }
  }
</style>
