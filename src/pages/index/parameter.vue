<template>
    <div class="parameter-box">
      <div class="header-box">
        <li class="h-left" @click="back"><van-icon name="arrow-left" /></li>
        <li class="h-center">
          <span v-for="(item,index) in tabs" :class="{active:index==num}" @click="tab(index)">{{item}}</span>
        </li>
      </div>
      <div v-if="show" class="parameter-Complete">
        <div class="parameter-list" v-if="tCarBasic.length>0">
          <p>
            <span>基本信息</span>
            <span>
              <span>●&nbsp;标配&nbsp;</span>
              <span>○&nbsp;选配&nbsp;</span>
              <span>-&nbsp;无&nbsp;</span>
            </span>
          </p>
          <li v-for="(item,i) of tCarBasic" v-if="getIsShow(item)"><span>{{tCarBasicLabels[i].label}}</span><span>{{item}}</span></li>
          <!--<li v-if="!!dataList.tCarBasic.onSale"><span>是否在售</span><span >{{dataList.tCarBasic.onSale?dataList.tCarBasic.onSale='在售':'停产'}}</span></li>
          -->
          <p v-if="tCarSize.length>0">
            <span>车辆尺寸信息</span>
            <span>
              <span>●&nbsp;标配&nbsp;</span>
              <span>○&nbsp;选配&nbsp;</span>
              <span>-&nbsp;无&nbsp;</span>
              <!--<van-icon name="question" /><span>标配</span><van-icon name="circle" /><span>选配</span>- 无</span>-->
            </span>
          </p>
          <li v-for="(item,i) of tCarSize" v-if="getIsShow(item)"><span>{{tCarSizeLabels[i].label}}</span><span>{{item}}</span></li>
          <p v-if="tCarPower.length>0">
            <span>动力系统信息</span>
            <span>
              <span>●&nbsp;标配&nbsp;</span>
              <span>○&nbsp;选配&nbsp;</span>
              <span>-&nbsp;无&nbsp;</span>
              <!--<van-icon name="question" /><span>标配</span><van-icon name="circle" /><span>选配</span>- 无</span>-->
            </span>
          </p>
          <li v-for="(item,i) of tCarPower" v-if="getIsShow(item)"><span>{{tCarPowerLabels[i].label}}</span><span>{{item}}</span></li>
          <p v-if="tCarChassis.length>0">
            <span>底盘信息</span>
            <span>
              <span>●&nbsp;标配&nbsp;</span>
              <span>○&nbsp;选配&nbsp;</span>
              <span>-&nbsp;无&nbsp;</span>
              <!--<van-icon name="question" /><span>标配</span><van-icon name="circle" /><span>选配</span>- 无</span>-->
            </span>
          </p>
          <li v-for="(item,i) of tCarChassis" v-if="getIsShow(item)"><span>{{tCarChassisLabels[i].label}}</span><span>{{item}}</span></li>
          <p v-if="tCarSecurity.length>0">
            <span>安全匹配信息</span>
            <span>
              <span>●&nbsp;标配&nbsp;</span>
              <span>○&nbsp;选配&nbsp;</span>
              <span>-&nbsp;无&nbsp;</span>
              <!--<van-icon name="question" /><span>标配</span><van-icon name="circle" /><span>选配</span>- 无</span>-->
            </span>
          </p>
          <li v-for="(item,i) of tCarSecurity" v-if="getIsShow(item)"><span>{{tCarSecurityLabels[i].label}}</span><span>{{item}}</span></li>
          <p v-if="tCarAdas.length>0">
            <span>驾驶辅助信息</span>
            <span>
              <span>●&nbsp;标配&nbsp;</span>
              <span>○&nbsp;选配&nbsp;</span>
              <span>-&nbsp;无&nbsp;</span>
              <!--<van-icon name="question" /><span>标配</span><van-icon name="circle" /><span>选配</span>- 无-->
            </span>
          </p>
          <li v-for="(item,i) of tCarAdas" v-if="getIsShow(item)"><span>{{tCarAdasLabels[i].label}}</span><span>{{item}}</span></li>
          <p v-if="tCarEconfiguration.length>0">
            <span>外部配置信息</span>
            <span>
              <span>●&nbsp;标配&nbsp;</span>
              <span>○&nbsp;选配&nbsp;</span>
              <span>-&nbsp;无&nbsp;</span>
              <!--<van-icon name="question" /><span>标配</span><van-icon name="circle" /><span>选配</span>- 无</span>-->
            </span>
          </p>
          <li v-for="(item,i) of tCarEconfiguration" v-if="getIsShow(item)"><span>{{tCarEconfigurationLabels[i].label}}</span><span>{{item}}</span></li>
          <p v-if="tCarIconfiguration.length>0">
            <span>内部配置信息</span>
            <span>
              <span>●&nbsp;标配&nbsp;</span>
              <span>○&nbsp;选配&nbsp;</span>
              <span>-&nbsp;无&nbsp;</span>
              <!--<van-icon name="question" /><span>标配</span><van-icon name="circle" /><span>选配</span>- 无</span>-->
            </span>
          </p>
          <li v-for="(item,i) of tCarIconfiguration" v-if="getIsShow(item)"><span>{{tCarIconfigurationLabels[i].label}}</span><span>{{item}}</span></li>
          <p v-if="tCarEnt.length>0">
            <span>娱乐信息</span>
            <span>
              <span>●&nbsp;标配&nbsp;</span>
              <span>○&nbsp;选配&nbsp;</span>
              <span>-&nbsp;无&nbsp;</span>
              <!--<van-icon name="question" /><span>标配</span><van-icon name="circle" /><span>选配</span>- 无</span>-->
            </span>
          </p>
          <li v-for="(item,i) of tCarEnt" v-if="getIsShow(item)"><span>{{tCarEntLabels[i].label}}</span><span>{{item}}</span></li>
        </div>
      </div>
      <div v-if="!show" class="parameter-img">
        <li>
          <img :src="!!fileAddress?imgFileUrl+fileAddress:''" >
        </li>
      </div>
    </div>
</template>

<script>
import { imgFileUrl } from '../../apiconfig/index'
import * as homeApi from '../../api/home-api'
import { Toast } from 'vant'
export default {
  name: 'parameter',
  data() {
    return {
      backpath:'',
      imgFileUrl: imgFileUrl,
      tabs: ['概述', '完整参数'],
      num: 1,
      fileAddress: '20190716064501863a8vpc',
      fileAddress1: '20190411015758957EWrXA',
      fileAddress2: '20190411015759085kqwQ4',
      fileAddress3: '20190411015759149iIKHQ',
      show: true,
      dataList: {
        tCarBasic: {
          carProductCd: '',
          carProductNm: '',
          carProductUcd: '',
          carProductStyle: '',
          carProductVer: '',
          carProductPrice: '',
          carProductKeep: '',
          carProductKind: '',
          carProductIntro: '',
          onSale: ''
        },
        tCarSize: {
          compartmentType: '',
          carStructure: '',
          carSize: '',
          carSizeWheelbase: '',
          carSizeMass: '',
          carSizeSeat: '',
          carSizeLvolume: '',
          carSizeOvolume: '',
          carSizeTyreA: '',
          carSizeTyreB: '',
          carSizeTyreC: '',
          carSizeMinTd: '',
          carSizeMaxTd: ''
        },
        tCarPower: {
          motorType: '',
          motorMaterial: '',
          carPowerSvolume: '',
          carPowerKw: '',
          carPowerMaxPs: '',
          carPowerMaxNmRpm: '',
          carPowerMaxNm: '',
          carPowerCylinder: '',
          carPowerCpum: '',
          carPowerIa: '',
          carPowerOilType: '',
          carPowerOilNum: '',
          carPowerStart: '',
          carPowerT: '',
          carPowerTnum: '',
          carPowerMaxSpeed: '',
          carPowerAccs: '',
          carPowerOilBee: '',
          carPowerEp: '',
          carPowerZkw: '',
          carPowerZnm: '',
          carPowerHemkw: '',
          carPowerHemnm: '',
          carPowerBemkw: '',
          carPowerBatkwh: '',
          carPowerBatTime: '',
          carPowerBatBee: '',
          carPowerMaxKm: '',
          brsSystem: '',
          carPowerBatQa: ''
        },
        tCarChassis: {
          drivingMode: '',
          frontType: '',
          backType: '',
          susAdjust: '',
          frontBrakeT: '',
          backBrakeT: '',
          parkBrakeT: '',
          assistType: '',
          carStructure: '',
          slipDifferential: '',
          approachAngle: '',
          departureAngle: '',
          directionalLock: '',
          acceleratorPedal: ''
        },
        tCarSecurity: {
          carAbs: '',
          carEbd: '',
          carBa: '',
          carArs: '',
          carEsp: '',
          carAirbagM: '',
          carAirbagV: '',
          carAirbagF: '',
          carAirbagB: '',
          carSafeCur: '',
          carKneeBall: '',
          beltAirbag: '',
          tubeCentral: '',
          carTyreP: '',
          carTyreE: '',
          carChildChair: ''
        },
        tCarAdas: {
          carConstantSpeed: '',
          laneRetention: '',
          parallelAuxiliary: '',
          collisionAlarm: '',
          fatigueReminder: '',
          autoParking: '',
          teleParking: '',
          autopilotAssis: '',
          autoStation: '',
          uphillAssis: '',
          hillDecentCon: '',
          nightVision: '',
          varGearSteer: '',
          panorama: '',
          reverseSensorF: '',
          backupEffect: '',
          choiseDriveMode: ''
        },
        tCarEconfiguration: {
          carHeadlight: '',
          carLed: '',
          carAutoLight: '',
          carFoglampe: '',
          carLightFunc: '',
          stopLamp: '',
          carSkylightT: '',
          carWindowFe: '',
          carWindowBe: '',
          carRearviewAdjust: '',
          carDazzlingInner: '',
          rearviewMirrorEf: '',
          carMediaRear: '',
          carDazzlingEx: '',
          carPrivacyGlass: '',
          carSunshade: '',
          carSunshadeCur: '',
          carRearWiper: '',
          defrostFogging: '',
          carSuctionDoor: '',
          carSlideGate: '',
          electricBackupBox: '',
          carLuggRack: '',
          centralControlLock: '',
          intelligentKey: '',
          externalAntenna: '',
          telecontrol: '',
          empennage: '',
          sportSuit: '',
          carWiperFront: ''
        },
        tCarIconfiguration: {
          interiorMaterial: '',
          carAtmosLamp: '',
          cosmeticMirror: '',
          steerWheelMa: '',
          steerWheelMul: '',
          steerWheelAdjust: '',
          steerWheelHeat: '',
          steerWheelChgn: '',
          airConditionF: '',
          airConditionB: '',
          fragSys: '',
          airPurge: '',
          onboardRefrige: '',
          seatArrangeForm: '',
          masterSeat: '',
          copilotSeat: '',
          otherSeat: ''
        },
        tCarEnt: {
          crystalScreen: '',
          dashBoard: '',
          driveDisplayScreen: '',
          hudDisplay: '',
          guideGps: '',
          smartConnectLocation: '',
          voiceControl: '',
          carplay: '',
          wirelessCharge: '',
          gestureControl: '',
          radio: '',
          cdDvd: '',
          blueWifi: '',
          externalInterface: '',
          carTv: '',
          audioBrand: '',
          speakerNum: '',
          systemEnt: '',
          powerSupply: ''
        }
      },
      tCarBasic: [],
      tCarAdas: [],
      tCarPower: [],
      tCarSize: [],
      tCarChassis: [],
      tCarEconfiguration: [],
      tCarEnt: [],
      tCarIconfiguration: [],
      tCarSecurity: [],
      tCarBasicLabels: [
        {
          prop: 'carProductNm',
          label: '产品名称'
        },
        {
          prop: 'carProductCd',
          label: '产品编码'
        },
        {
          prop: 'carProductUcd',
          label: '产品识别码'
        },
        {
          prop: 'carProductStyle',
          label: '产品款式'
        },
        {
          prop: 'carProductVer',
          label: '产品版本'
        },
        {
          prop: 'carProductPrice',
          label: '厂商指导价格'
        },
        {
          prop: 'carProductKeep',
          label: '保修政策'
        },
        {
          prop: 'carProductKind',
          label: '产品类型'
        },
        {
          prop: 'carProductIntro',
          label: '产品简介'
        },
        {
          prop: 'onSaleName',
          label: '是否在售'
        }
      ],
      tCarSizeLabels: [
        {
          prop: 'compartmentType',
          label: '车身类型'
        },
        {
          prop: 'carStructure',
          label: '车身结构'
        },
        {
          prop: 'carSize',
          label: '长*宽*高'
        },
        {
          prop: 'carSizeWheelbase',
          label: '轴距'
        },
        {
          prop: 'carSizeMass',
          label: '整备质量'
        },
        {
          prop: 'carSizeSeat',
          label: '座位数'
        },
        {
          prop: 'carSizeLvolume',
          label: '行李箱容积'
        },
        {
          prop: 'carSizeOvolume',
          label: '油箱容积'
        },
        {
          prop: 'carSizeTyreA',
          label: '前轮胎规格'
        },
        {
          prop: 'carSizeTyreB',
          label: '后轮胎规格'
        },
        {
          prop: 'carSizeTyreC',
          label: '备胎'
        },
        {
          prop: 'carSizeMinTd',
          label: '最小转弯直径'
        },
        {
          prop: 'carSizeMaxTd',
          label: '最小离地间隙'
        }
      ],
      tCarPowerLabels: [
        {
          prop: 'motorType',
          label: '发动机型号',
          type: 'all'
        },
        {
          prop: 'motorMaterial',
          label: '发动机材质',
          type: '2'
        },
        {
          prop: 'carPowerSvolume',
          label: '排气量',
          type: '2'
        },
        {
          prop: 'carPowerKw',
          label: '最大功率',
          type: '2'
        },
        {
          prop: 'carPowerMaxPs',
          label: '最大马力',
          type: '2'
        },
        {
          prop: 'carPowerMaxNmRpm',
          label: '最大功率转速',
          type: '2'
        },
        {
          prop: 'carPowerMaxNm',
          label: '最大扭矩',
          type: '2'
        },
        {
          prop: 'carPowerMaxNmRpm',
          label: '最大扭矩转速',
          type: '2'
        },
        {
          prop: 'carPowerCylinder',
          label: '缸体形式',
          type: '2'
        },
        {
          prop: 'carPowerCpum',
          label: '气缸数',
          type: '2'
        },
        {
          prop: 'carPowerIa',
          label: '进气形式',
          type: '2'
        },
        {
          prop: 'carPowerOilType',
          label: '供油方式',
          type: '2'
        },
        {
          prop: 'carPowerOilNum',
          label: '燃油标号',
          type: '2'
        },
        {
          prop: 'carPowerStart',
          label: '发动机启停',
          type: 'all'
        },
        {
          prop: 'carPowerT',
          label: '变速箱类型',
          type: 'all'
        },
        {
          prop: 'carPowerTnum',
          label: '挡位个数',
          type: 'all'
        },
        {
          prop: 'carPowerMaxSpeed',
          label: '最高车速',
          type: 'all'
        },
        {
          prop: 'carPowerAccs',
          label: '0-100km/h加速时间',
          type: 'all'
        },
        {
          prop: 'carPowerOilBee',
          label: '混合工况油耗',
          type: '2'
        },
        {
          prop: 'carPowerEp',
          label: '环保标准',
          type: '2'
        },
        {
          prop: 'carPowerZkw',
          label: '电动机总功率',
          type: '1'
        },
        {
          prop: 'carPowerZnm',
          label: '电动机总扭矩',
          type: '1'
        },
        {
          prop: 'carPowerHemkw',
          label: '前电动机最大功率',
          type: '1'
        },
        {
          prop: 'carPowerHemnm',
          label: '前电动机最大扭矩',
          type: '1'
        },
        {
          prop: 'carPowerBemkw',
          label: '后电动机最大功率',
          type: '1'
        },
        {
          prop: 'carPowerBemnm',
          label: '后电动机最大扭矩(N.m)',
          type: '1'
        },
        {
          prop: 'batteryBrand',
          label: '电池品牌',
          type: '1'
        },
        {
          prop: 'carPowerBatkwh',
          label: '电池容量',
          type: '1'
        },
        {
          prop: 'carPowerBatTime',
          label: '电池充电时间',
          type: '1'
        },
        {
          prop: 'carPowerBatBee',
          label: '耗电量',
          type: '1'
        },
        {
          prop: 'carPowerMaxKm',
          label: '最大续航里程',
          type: '1'
        },
        {
          prop: 'brsSystem',
          label: 'BRS系统',
          type: 'all'
        },
        {
          prop: 'carPowerBatQa',
          label: '电池组质保',
          type: '1'
        }
      ],
      tCarChassisLabels: [
        {
          prop: 'drivingMode',
          label: '驱动方式'
        }, {
          prop: 'frontType',
          label: '前悬架类型'
        }, {
          prop: 'backType',
          label: '后悬架类型'
        }, {
          prop: 'susAdjust',
          label: '可调悬架'
        }, {
          prop: 'frontBrakeT',
          label: '前轮制动器类型'
        }, {
          prop: 'backBrakeT',
          label: '后轮制动器类型'
        }, {
          prop: 'parkBrakeT',
          label: '驻车制动器类型'
        }, {
          prop: 'assistType',
          label: '助力类型'
        }, {
          prop: 'carStructure',
          label: '车体结构'
        }, {
          prop: 'slipDifferential',
          label: '限滑差速器'
        }, {
          prop: 'approachAngle',
          label: '接近角'
        }, {
          prop: 'departureAngle',
          label: '离去角'
        }, {
          prop: 'directionalLock',
          label: '方向锁'
        }, {
          prop: 'acceleratorPedal',
          label: '油门踏板'
        }
      ],
      tCarSecurityLabels: [
        {
          prop: 'carAbs',
          label: '防抱死制动'
        }, {
          prop: 'carEbd',
          label: '制动力分配'
        }, {
          prop: 'carBa',
          label: '制动辅助'
        }, {
          prop: 'carArs',
          label: '牵引力控制'
        }, {
          prop: 'carEsp',
          label: '车身稳定控制'
        }, {
          prop: 'carAirbagM',
          label: '主驾驶安全气囊'
        }, {
          prop: 'carAirbagV',
          label: '副驾驶安全气囊'
        }, {
          prop: 'carAirbagF',
          label: '前侧气囊'
        }, {
          prop: 'carAirbagB',
          label: '后侧气囊'
        }, {
          prop: 'carSafeCur',
          label: '侧安全气帘'
        }, {
          prop: 'carKneeBall',
          label: '膝部气囊'
        }, {
          prop: 'beltAirbag',
          label: '安全带气囊'
        }, {
          prop: 'tubeCentral',
          label: '后排中央气管'
        }, {
          prop: 'carTyreP',
          label: '胎压监测'
        }, {
          prop: 'carTyreE',
          label: '零胎压续航轮胎'
        }, {
          prop: 'carChildChair',
          label: '儿童座椅接口'
        }
      ],
      tCarAdasLabels: [
        {
          prop: 'carConstantSpeed',
          label: '定速巡航'
        }, {
          prop: 'laneRetention',
          label: '车道保持'
        }, {
          prop: 'parallelAuxiliary',
          label: '并线辅助'
        }, {
          prop: 'collisionAlarm',
          label: '碰撞报警'
        }, {
          prop: 'fatigueReminder',
          label: '疲劳提醒'
        }, {
          prop: 'autoParking',
          label: '自动泊车'
        }, {
          prop: 'teleParking',
          label: '遥控泊车'
        }, {
          prop: 'autopilotAssis',
          label: '自动驾驶辅助'
        }, {
          prop: 'autoStation',
          label: '自动驻车'
        }, {
          prop: 'uphillAssis',
          label: '上坡辅助'
        }, {
          prop: 'hillDecentCon',
          label: '陡坡缓降'
        }, {
          prop: 'nightVision',
          label: '夜视系统'
        }, {
          prop: 'varGearSteer',
          label: '可变齿轮转向'
        }, {
          prop: 'panorama',
          label: '全景影像'
        }, {
          prop: 'reverseSensorF',
          label: '前/后倒车雷达'
        }, {
          prop: 'backupEffect',
          label: '倒车影像'
        }, {
          prop: 'choiseDriveMode',
          label: '驾驶模式选择'
        }
      ],
      tCarEconfigurationLabels: [
        {
          prop: 'carHeadlight',
          label: '前大灯'
        }, {
          prop: 'carLed',
          label: '日间行车灯'
        }, {
          prop: 'carAutolight',
          label: '自动大灯'
        }, {
          prop: 'carFoglampe',
          label: '前/后雾灯'
        }, {
          prop: 'carLightFunc',
          label: '大灯功能'
        }, {
          prop: 'stopLamp',
          label: '制动灯'
        }, {
          prop: 'carSkylightT',
          label: '天窗类型'
        }, {
          prop: 'carWindowFe',
          label: '前电动车窗'
        }, {
          prop: 'carWindowBe',
          label: '后电动车窗'
        }, {
          prop: 'carRearviewAdjust',
          label: '外后视镜电动调节'
        }, {
          prop: 'carDazzlingInner',
          label: '内后视镜自动防眩目'
        }, {
          prop: 'rearviewMirrorEf',
          label: '外后视镜功能'
        }, {
          prop: 'carMediaRear',
          label: '流媒体后视镜'
        }, {
          prop: 'carDazzlingEx',
          label: '外后视镜自动防眩目'
        }, {
          prop: 'carPrivacyGlass',
          label: '隐私玻璃'
        }, {
          prop: 'carSunshade',
          label: '后排侧遮阳帘'
        }, {
          prop: 'carSunshadeCur',
          label: '后遮阳帘'
        }, {
          prop: 'carRearWiper',
          label: '前/后雨刷器'
        }, {
          prop: 'defrostFogging',
          label: '除霜除雾'
        }, {
          prop: 'carSuctionDoor',
          label: '电吸门'
        }, {
          prop: 'carSlideGate',
          label: '电动侧滑门'
        }, {
          prop: 'electricBackupBox',
          label: '电动后备箱'
        }, {
          prop: 'carLuggRack',
          label: '行李架'
        }, {
          prop: 'centralControlLock',
          label: '中控锁'
        }, {
          prop: 'intelligentKey',
          label: '智能钥匙'
        }, {
          prop: 'externalAntenna',
          label: '外置天线'
        }, {
          prop: 'telecontrol',
          label: '远程遥控功能'
        }, {
          prop: 'empennage',
          label: '尾翼/扰流板'
        }, {
          prop: 'sportSuit',
          label: '运动外观套件'
        }, {
          prop: 'carWiperFront',
          label: '前雨刷器'
        }
      ],
      tCarIconfigurationLabels: [
        {
          prop: 'interiorMaterial',
          label: '内饰材质'
        }, {
          prop: 'carAtmosLamp',
          label: '车内氛围灯'
        }, {
          prop: 'cosmeticMirror',
          label: '遮阳板化妆镜'
        }, {
          prop: 'steerWheelMa',
          label: '方向盘材质'
        }, {
          prop: 'steerWheelMul',
          label: '多功能方向盘'
        }, {
          prop: 'steerWheelAdjust',
          label: '方向盘调节'
        }, {
          prop: 'steerWheelHeat',
          label: '方向盘加热'
        }, {
          prop: 'steerWheelChgn',
          label: '方向盘换挡'
        }, {
          prop: 'airConditionF',
          label: '前排空调'
        }, {
          prop: 'airConditionB',
          label: '后排空调'
        }, {
          prop: 'fragSys',
          label: '香氛系统'
        }, {
          prop: 'airPurge',
          label: '空气净化'
        }, {
          prop: 'onboardRefrige',
          label: '车载冰箱'
        }, {
          prop: 'seatArrangeForm',
          label: '座椅排列形式'
        }, {
          prop: 'masterSeat',
          label: '主驾驶座椅调节'
        }, {
          prop: 'copilotSeat',
          label: '副驾驶座椅调节'
        }, {
          prop: 'otherSeat',
          label: '其他座椅调节'
        }
      ],
      tCarEntLabels: [
        {
          prop: 'crystalScreen',
          label: '中控彩色液晶屏'
        }, {
          prop: 'dashBoard',
          label: '全液晶仪表盘'
        }, {
          prop: 'driveDisplayScreen',
          label: '行车电脑显示屏'
        }, {
          prop: 'hudDisplay',
          label: 'HUD平视显示'
        }, {
          prop: 'guideGps',
          label: 'GPS导航'
        }, {
          prop: 'smartConnectLocation',
          label: '智能互联定位'
        }, {
          prop: 'voiceControl',
          label: '语音控制'
        }, {
          prop: 'carplay',
          label: '手机互联'
        }, {
          prop: 'wirelessCharge',
          label: '手机无线充电'
        }, {
          prop: 'gestureControl',
          label: '手势控制系统'
        }, {
          prop: 'radio',
          label: '收音机'
        }, {
          prop: 'cdDvd',
          label: 'CD/DVD'
        }, {
          prop: 'blueWifi',
          label: '蓝牙/WIFI连接'
        }, {
          prop: 'externalInterface',
          label: '外接接口'
        }, {
          prop: 'carTv',
          label: '车载电视'
        }, {
          prop: 'audioBrand',
          label: '音响品牌'
        }, {
          prop: 'speakerNum',
          label: '扬声器数量'
        }, {
          prop: 'systemEnt',
          label: '后排液晶屏/娱乐系统'
        }, {
          prop: 'powerSupply',
          label: '车载电源'
        }
      ]
    }
  },
  beforeRouteLeave (to, from, next) {
    // 设置下一个路由的 meta
    to.meta.keepAlive = true // B 跳转到 A 时，让 A 缓存，即不刷新

    next()
  },
  beforeRouteEnter(to, from, next) {
    localStorage.setItem('backpath',from.path)
    next()
  },
  methods: {
    getIsShow(value) {
      let isShow = true
      if (value === undefined || value === null || value === '') {
        isShow = false
      }
      return isShow
    },
    tab(index) {
      this.show = index
      this.num = index
    },
    toNews() {
      this.$router.push('/message')
    },
    back() {
      this.$router.push({path: localStorage.getItem('backpath')})

    }
  },
  mounted() {
    let params = {
      carId: localStorage.getItem('carProductCd')
    }
    homeApi.parameter(params).then(res => {
      if (res.data.code === '200') {
        let type = localStorage.getItem('carProductKind') // res.data.carType
        // 基本信息
        let tCarBasicKeys = Object.keys(res.data.CarDetail.tCarBasic)
        let tCarBasicValue = Object.values(res.data.CarDetail.tCarBasic)
        for (let i = 0; i < this.tCarBasicLabels.length; i++) {
          for (let j = 0; j < tCarBasicKeys.length; j++) {
            if (this.tCarBasicLabels[i].prop == tCarBasicKeys[j]) {
              if (this.tCarBasicLabels[i].prop === 'carProductPrice') {
                tCarBasicValue[j] = tCarBasicValue[j] + '万元'
              }
              this.tCarBasic.push(tCarBasicValue[j])
            }
          }
        }
        // 车身尺寸信息
        let tCarSizeKeys = Object.keys(res.data.CarDetail.tCarSize)
        let tCarSizeValue = Object.values(res.data.CarDetail.tCarSize)
        for (let i = 0; i < this.tCarSizeLabels.length; i++) {
          for (let j = 0; j < tCarSizeKeys.length; j++) {
            if (this.tCarSizeLabels[i].prop == tCarSizeKeys[j]) {
              if (this.tCarSizeLabels[i].prop === 'carSizeMass') {
                tCarSizeValue[j] = !!tCarSizeValue[j] ? tCarSizeValue[j] + 'kg' : ''
              }
              this.tCarSize.push(tCarSizeValue[j])
            }
          }
        }
        // 驾驶辅助信息
        let tCarAdasKeys = Object.keys(res.data.CarDetail.tCarAdas)
        let tCarAdasValue = Object.values(res.data.CarDetail.tCarAdas)
        for (let i = 0; i < this.tCarAdasLabels.length; i++) {
          for (let j = 0; j < tCarAdasKeys.length; j++) {
            if (this.tCarAdasLabels[i].prop == tCarAdasKeys[j]) {
              this.tCarAdas.push(tCarAdasValue[j])
            }
          }
        }
        // 低盘信息
        let tCarChassisKeys = Object.keys(res.data.CarDetail.tCarChassis)
        let tCarChassisValue = Object.values(res.data.CarDetail.tCarChassis)
        for (let i = 0; i < this.tCarChassisLabels.length; i++) {
          for (let j = 0; j < tCarChassisKeys.length; j++) {
            if (this.tCarChassisLabels[i].prop == tCarChassisKeys[j]) {
              this.tCarChassis.push(tCarChassisValue[j])
            }
          }
        }
        // 外部配置信息
        let tCarEconfigurationKeys = Object.keys(res.data.CarDetail.tCarEconfiguration)
        let tCarEconfigurationValue = Object.values(res.data.CarDetail.tCarEconfiguration)
        for (let i = 0; i < this.tCarEconfigurationLabels.length; i++) {
          for (let j = 0; j < tCarEconfigurationKeys.length; j++) {
            if (this.tCarEconfigurationLabels[i].prop == tCarEconfigurationKeys[j]) {
              this.tCarEconfiguration.push(tCarEconfigurationValue[j])
            }
          }
        }
        // 娱乐信息 tCarEnt
        let tCarEntKeys = Object.keys(res.data.CarDetail.tCarEnt)
        let tCarEntValue = Object.values(res.data.CarDetail.tCarEnt)
        for (let i = 0; i < this.tCarEntLabels.length; i++) {
          for (let j = 0; j < tCarEntKeys.length; j++) {
            if (this.tCarEntLabels[i].prop == tCarEntKeys[j]) {
              this.tCarEnt.push(tCarEntValue[j])
            }
          }
        }
        // 内部配置信息
        let tCarIconfigurationKeys = Object.keys(res.data.CarDetail.tCarIconfiguration)
        let tCarIconfigurationValue = Object.values(res.data.CarDetail.tCarIconfiguration)
        for (let i = 0; i < this.tCarIconfigurationLabels.length; i++) {
          for (let j = 0; j < tCarIconfigurationKeys.length; j++) {
            if (this.tCarIconfigurationLabels[i].prop == tCarIconfigurationKeys[j]){
              this.tCarIconfiguration.push(tCarIconfigurationValue[j])
            }
          }
        }
        // 动力系统
        let tCarPowerKeys = Object.keys(res.data.CarDetail.tCarPower)
        let tCarPowerValue = Object.values(res.data.CarDetail.tCarPower)
        for (let i = 0; i < this.tCarPowerLabels.length; i++) {
          for (let j = 0; j < tCarPowerKeys.length; j++) {
            if (this.tCarPowerLabels[i].prop == tCarPowerKeys[j]) {
              if (this.tCarPowerLabels[i].type === '1' && type === '1') {
                this.tCarPower.push(tCarPowerValue[j])
              } else if (this.tCarPowerLabels[i].type === '2' && type === '2') {
                this.tCarPower.push(tCarPowerValue[j])
              } else if (this.tCarPowerLabels[i].type === 'all') {
                this.tCarPower.push(tCarPowerValue[j])
              } else {
                this.tCarPower.push('')
              }
            }
          }
        }
        // 安全配置信息tCarSecurity
        let tCarSecurityKeys = Object.keys(res.data.CarDetail.tCarSecurity)
        let tCarSecurityValue = Object.values(res.data.CarDetail.tCarSecurity)
        for (let i = 0; i < this.tCarSecurityLabels.length; i++) {
          for (let j = 0; j < tCarSecurityKeys.length; j++) {
            if (this.tCarSecurityLabels[i].prop == tCarSecurityKeys[j]) {
              this.tCarSecurity.push(tCarSecurityValue[j])
            }
          }
        }
      } else {
        Toast(res.data.msg)
      }
    })
  }
}

</script>

<style scoped lang="less">
  @import "~styles/index.less";
  @import "~styles/variable.less";
  .parameter-box{
    width: 100%;
    height: auto;
    .active{
      color: #FF822B;
    }
    .parameter-img{
      width: 100%;
      line-height: normal;
      li{
        width: 100%;
        height: auto;
        img{
          width: 100%;
          height: 100%;
          display: block;
        }
      }
    }
    .parameter-Complete{
      width: 100%;
      height: auto;
      .parameter-list{
        width: 100%;
        background: #fff;
        line-height: 1rem;
        .fs(30);
        margin-bottom: 0.6rem;
        background-color: #fff;
        >p{
          border-bottom: 1px solid #dedede;
          width: 100%;
          background: #FFF9F6;
          color: #FF944C;
          text-align: left;
          text-indent: 0.3rem;
          display: flex;
          justify-content: space-between;
          padding-right: 0.3rem;
          span:nth-child(2){
            color: #000;
          }
          .van-icon {
            margin-right: 0.1rem;
            /*font-size: 0.15rem;
            width:1rem;*/
          }
        }
        li{
          width: 100%;
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid #dedede;
          /*border-bottom: .5px solid #ccc;*/
          padding: 0 0.3rem;
        }
        .iconLine{
          width:0.3rem;
          margin-right: 0.1rem;
          display:inline-block;
          text-align:right;
          border:1px red solid;
        }
      }
    }
    .parameter-header {
      width: 100%;
      height: 50px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #fff;
      border-bottom: 1px solid #dedede;
      .padding(0,40);
      .fs(30);
      li:first-child {
        width: 10%;
        text-align: right;
        .van-icon{
          font-size: 0.6rem;
          line-height: 50px;
        }
        .icon-back {
          position: absolute;
          display: inline-block;
          .w(50);
          .h(50);
          .left(25);
          .top(25);
          background: url("../../assets/image/back.png") center no-repeat;
          background-size: 0.32rem 0.5rem;
        }
      }

      li {
        .input-box {
          position: relative;
          width: 92%;
          margin-left: 4%;
          .pl(30);
          .pr(30);
          .icon {
            position: absolute;
            display: inline-block;
            .w(30);
            .h(30);
            top: 53%;
            .mt(-18);
            .left(50);
            background-image: url("../../assets/image/search-f.png");
            background-size: cover;
          }

          .search {
            background-color: #f7f3f8;
            .b-radius(58);
            .lh(65);
            width: 100%;
            outline: none;
            .pl(65);
            .pr(65);
            .fs(30);
          }
        }
      }
      li:nth-child(2){
        width: 50%;
        display: flex;
        justify-content: space-between;
      }
      li:last-child {
        .van-icon{
          .fs(40);
        }
        .header-right {
          position: absolute;
          display: inline-block;
          .w(50);
          .h(50);
          .right(25);
          .top(25);
          background: url("../../assets/image/message.png") center no-repeat;
          background-size: 0.6rem 0.6rem;
        }
      }
    }
    .header-box{
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
        width: 85%;
        height: 100%;
        line-height: 50px;
        padding:0 2rem 0 1.4rem;
        .fs(32);
        color: #000;
        position: relative;
        text-align: center;
        display: flex;
        justify-content: space-between;
      }
    }
  }
</style>
