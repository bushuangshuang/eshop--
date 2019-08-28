export default function getDeviceInfo () {
  let deviceInfo = {
    'exDeviceId': '',
    'imsi1': '',
    'imsi2': '',
    'imei1': '',
    'imei2': '',
    'sim1Status': '',
    'sim2Status': '',
    'MEID': '',
    'androidid': '',
    'modle': '',
    'mobileBand': '',
    'appVersion': '',
    'networkType': '',
    'IP': '',
    'wifiMac': '',
    'wifiSsid': '',
    'SystemModle': '',
    'idfa': '',
    'idfv': '',
    'carrier': '',
    'IsRoot': '',
    'isSimulator': '',
    'is_Vpn': '',
    'is_proxy': '',
    'mobNum': '',
    'electricity': '',
    'Lat': '',
    'Lng': '',
    'cells': {
      'lac': '',
      'cid': ''
    },
    'applist': []
  }
  if (plus.os.name === 'Android') {
    var Context = plus.android.importClass('android.content.Context')
    // 安卓id
    let mainActivity = plus.android.runtimeMainActivity()
    let Settings = plus.android.importClass('android.provider.Settings')
    deviceInfo.exDeviceId = Settings.Secure.getString(mainActivity.getContentResolver(), Settings.Secure.ANDROID_ID)
    console.log('exDeviceId===' + Settings.Secure.getString(mainActivity.getContentResolver(), Settings.Secure.ANDROID_ID))
    // MEID移动设备识别码 返回当前移动终端的唯一标识 如果是GSM网络，返回IMEI；如果是CDMA网络，返回MEID
    let TelephonyManager = plus.android.importClass('android.telephony.TelephonyManager')
    TelephonyManager = plus.android.runtimeMainActivity().getSystemService(Context.TELEPHONY_SERVICE)
    let MEID = TelephonyManager.getDeviceId()
    let cellLocation = TelephonyManager.getCellLocation().toString()
    let DeviceSoftwareVersion = TelephonyManager.getDeviceSoftwareVersion()
    let phone = TelephonyManager.getLine1Number()
    let yunxingshang = TelephonyManager.getNetworkOperatorName()
    let simStatus = TelephonyManager.getSimState()
    /**
     * 返回移动终端
     * SIM_STATE_ABSENT SIM卡未找到 1
     * SIM_STATE_NETWORK_LOCKED SIM卡网络被锁定，需要Network PIN解锁 2
     * SIM_STATE_PIN_REQUIRED SIM卡PIN被锁定，需要User PIN解锁 3
     * SIM_STATE_PUK_REQUIRED SIM卡PUK被锁定，需要User PUK解锁 4
     * SIM_STATE_READY SIM卡可用 5
     * SIM_STATE_UNKNOWN SIM卡未知 6
     */
    console.log('MEID===' + MEID)
    console.log('cellLocation===' + cellLocation)
    console.log('DeviceSoftwareVersion===' + DeviceSoftwareVersion)
    console.log('phone===' + phone)
    console.log('运营商===' + yunxingshang)
    console.log('simStatus===' + simStatus)
  } else {
    let UIDevice = plus.ios.importClass('UIDevice')
    let currentDevice = UIDevice.currentDevice()
    console.log('名字为==ios====' + currentDevice.name())
    plus.ios.deleteObject(currentDevice)
  }
  // 国际移动用户识别码
  let imsi = plus.device.imsi
  let imsiArr = stringToArray(imsi)
  imsi === imsiArr ? deviceInfo.imsi1 = imsi : (deviceInfo.imsi1 = imsiArr[0], deviceInfo.imsi2 = imsiArr[0])
  console.log('国际移动用户识别码===' + imsi)

  // 国际移动设备识别码
  let imei = plus.device.imei
  let imeiArr = stringToArray(imei)
  imei === imeiArr ? deviceInfo.imei1 = imei : (deviceInfo.imei1 = imeiArr[0], deviceInfo.imei2 = imeiArr[0])
  console.log('国际移动设备识别码===' + imei)
  // sim1卡状态
  console.log('sim1卡状态===')
  // sim2卡状态
  console.log('sim2卡状态===')
  // 获取安卓ID
  deviceInfo.androidid = plus.device.uuid
  console.log('uuid===' + plus.device.uuid)
  // 获取手机型号
  deviceInfo.modle = plus.device.model
  console.log('手机型号===' + plus.device.model)
  // 获取手机品牌
  deviceInfo.mobileBand = plus.device.vendor
  console.log('手机品牌===' + plus.device.vendor)
  // 获取app版本号
  deviceInfo.appVersion = getAppVersion()
  console.log('app版本号===' + getAppVersion())
  // 获取网络类型
  deviceInfo.networkType = getNetInt()
  console.log('网络类型===' + getNetInt())
  // 获取ip
  deviceInfo.IP = getIp()
  console.log('获取ip===' + getIp())
  // 获取wifiMac
  deviceInfo.wifiMac = getWifiMac()
  console.log('获取wifiMac===' + getWifiMac())
  // 获取无线WIFI名称
  deviceInfo.wifiSsid = getWifiSsid()
  console.log('获取无线WIFI名称===' + getWifiSsid())
  // 获取操作系统版本号
  deviceInfo.SystemModle = plus.os.version
  console.log('获取操作系统版本号===' + plus.os.version)
  // 获取IOS广告标示符
  deviceInfo.idfa = getIdfa()
  console.log('获取IOS广告标示符===' + getIdfa())
  // 获取vendor识别符
  deviceInfo.idfv = getIdfv() // plus.os.vendor
  console.log('获取vendor识别符===' + getIdfv())
  // 获取用户所用设备运营商
  deviceInfo.carrier = getCarrier()
  console.log('获取用户所用设备运营商===' + getCarrier())
  // 获取是否越狱
  deviceInfo.IsRoot = getIsRoot()
  console.log('获取是否越狱===' + getIsRoot())
  // 获取是否模拟器
  deviceInfo.isSimulator = getIsSimulator()
  console.log('获取是否模拟器===' + getIsSimulator())
  // 获取是否使用vpn
  deviceInfo.is_Vpn = getIsVpn()
  console.log('获取是否使用vpn===' + getIsVpn())
  // 获取是否代理
  deviceInfo.is_proxy = getIsProxy()
  console.log('获取是否代理===' + getIsProxy())
  // 获取本机号码
  deviceInfo.mobNum = getMobNum()
  console.log('获取本机号码===' + getMobNum())
  // 获取电量
  deviceInfo.electricity = getElectricity()
  console.log('获取电量===' + getElectricity())
  // 获取经度
  deviceInfo.Lat = getLat()
  console.log('获取经度===' + getLat())
  // 获取纬度
  deviceInfo.Lng = getLng()
  console.log('获取纬度===' + getLng())
  // 获取基站信息
  deviceInfo.cells = getCells()
  console.log('获取基站信息===' + getCells())
  console.log('deviceInfo===' + JSON.stringify(deviceInfo))
  function stringToArray (strValue) {
    let arrValue = []
    if (!!strValue && strValue.indexOf(',') > 0) {
      arrValue = strValue.split(',')
      return arrValue
    } else {
      return strValue
    }
  }
  function getNetInt () {
    let networkType = ''
    // 获取当前网络类型
    var nt = plus.networkinfo.getCurrentType()
    switch (nt) {
      case 2: // plus.networkinfo.CONNECTION_ETHERNET:
      case 3:// plus.networkinfo.CONNECTION_WIFI:
        // mui.toast("当前网络为WiFi")
        networkType = 'WIFI'
        console.log('当前网络为WiFi')
        break
      case 4: // plus.networkinfo.CONNECTION_CELL2G:
        // mui.toast("当前网络为2G")
        networkType = '2G'
        console.log('当前网络为2G')
        break
      case 5: // plus.networkinfo.CONNECTION_CELL3G:
        // mui.toast("当前网络为3G");
        networkType = '3G'
        console.log('当前网络为3G')
        break
      case 6: // plus.networkinfo.CONNECTION_CELL4G:
        // mui.toast("当前网络4G")
        networkType = '4G'
        console.log('当前网络4G')
        break
      default:
        // mui.toast("当前没有网络")
        console.log('当前没有网络')
        break
    }
    return networkType
  }
  function getAppVersion() {
    let version = ''
    plus.runtime.getProperty(plus.runtime.appid, function(inf) {
      version = inf.version
      return version
    })
  }
  function getIp() {
    var ip = '127.0.0.1'
    var Context = plus.android.importClass('android.content.Context')
    if (plus.os.name === 'Android') {
      var WifiManager = plus.android.importClass('android.net.wifi.WifiManager')
      var wifiManager = plus.android.runtimeMainActivity().getSystemService(Context.WIFI_SERVICE)
      var WifiInfo = plus.android.importClass('android.net.wifi.WifiInfo')

      if (!wifiManager.isWifiEnabled()){//未连接wifi
        var Enumeration = plus.android.importClass('java.util.Enumeration')
        var NetworkInterface = plus.android.importClass('java.net.NetworkInterface')
        var Inet4Address = plus.android.importClass('java.net.Inet4Address')
        var en = NetworkInterface.getNetworkInterfaces()
        while (plus.android.invoke(en, 'hasMoreElements')) {
          var ni = plus.android.invoke(en, 'nextElement')
          var interfaceName = ni.getDisplayName()
          console.log('tag', '网络名字' + interfaceName)
          var enumIpAddr = plus.android.invoke(ni, 'getInetAddresses')
          while (plus.android.invoke(enumIpAddr, 'hasMoreElements')) {
            var inetAddress = plus.android.invoke(enumIpAddr, 'nextElement')
            if (!plus.android.invoke(inetAddress, 'isLoopbackAddress') && inetAddress instanceof Inet4Address) {
              ip = plus.android.invoke(inetAddress, 'getHostAddress')
              return ip
            }
          }
        }
      } else { // 连接wifi
        var wifiInfo = wifiManager.getConnectionInfo()
        ip = intToIp(wifiInfo.getIpAddress())
        var wifiInfo2 = wifiManager.getConnectionInfo()
        var ipAddress = wifiInfo2.getIpAddress()
        ip = intToIp(ipAddress)
      }
      return ip
    }
    /*else {
      var UIDevice = plus.ios.importClass('UIDevice')
      var dev = UIDevice.getDeviceIPAdress()
      if (!dev.isBatteryMonitoringEnabled()) {
        dev.setBatteryMonitoringEnabled(true)
      }
      var level = dev.batteryLevel()
      level = Number(level) * Number(100)
      console.log('获取电量=ios==' + level)
    }*/
    return ip
  }
  function intToIp(i) {
    return (i & 0xFF) + '.' + ((i >> 8) & 0xFF) + '.' + ((i >> 16) & 0xFF) + '.' + ((i >> 24 ) & 0xFF )
  }
  function getWifiMac() {
    var mac = 'xxx-xxx-xxx-xxx'
    if (plus.os.name === 'Android') {
      let Context = plus.android.importClass('android.content.Context')
      var WifiManagerMac1 = plus.android.importClass('android.net.wifi.WifiManager')
      var wifiManagerMac = plus.android.runtimeMainActivity().getSystemService(Context.WIFI_SERVICE)
      var WifiInfoMac = plus.android.importClass('android.net.wifi.WifiInfo')
      var wifiInfoMac = wifiManagerMac.getConnectionInfo()
      mac = wifiInfoMac.getMacAddress()
    }
    return mac
  }
  function getWifiSsid() {
    let wifiName = ''
    if (mui.os.android) {
      var wifiManager, wifiInfo
      var Context = plus.android.importClass('android.content.Context')
      var WifiManager = plus.android.importClass('android.net.wifi.WifiManager')
      var WifiInfo = plus.android.importClass('android.net.wifi.WifiInfo')
      wifiManager = plus.android.runtimeMainActivity().getSystemService(Context.WIFI_SERVICE)
      wifiInfo = wifiManager.getConnectionInfo()
      var ssid = wifiInfo.getSSID() || ''
      if(ssid.length == 0) {
        return wifiName
      }
      // 一些手机上获取SSID是有值的，但是实际IP为空，真实为未连接
      var i = parseInt(wifiInfo.getIpAddress())
      var ipStr = (i & 0xFF) + '.' +
        ((i >> 8) & 0xFF) + '.' +
        ((i >> 16) & 0xFF) + '.' +
        (i >> 24 & 0xFF)
      if (ipStr == '0.0.0.0') {
        return wifiName
      }
      if (ssid != '<unknown ssid>' && ssid.toUpperCase() != '0X') {
        return ssid.replace(/\"/g, '')
      }
      return wifiName
    }
    return wifiName
  }
  function getIdfa() {
    let idfa = ''
    if (plus.os.name === 'iOS') {
      var ASIdentifierManager = plus.ios.importClass('ASIdentifierManager')
      var sharedManager = plus.ios.importClass('sharedManager')
      var sharedManager = ASIdentifierManager.sharedManager()
      if (sharedManager.isAdvertisingTrackingEnabled()) {
        var advertisingIdentifier = sharedManager.advertisingIdentifier()
        idfa = plus.ios.invoke(advertisingIdentifier, 'UUIDString')
      }
    }
    console.log('IOS广告标示符 === ' + idfa)
    return idfa
  }
  function getIdfv() {
    let idfv = ''
    return idfv
  }
  function getCarrier() {
    let carrier = ''
    return carrier
  }
  function getIsRoot() {
    let IsRoot = ''
    return IsRoot
  }
  function getIsSimulator() {
    let isSimulator = ''
    return isSimulator
  }
  function getIsVpn() {
    let isVpn = ''
    return isVpn
  }
  function getIsProxy() {
    let isProxy = ''
    return isProxy
  }
  function getMobNum() {
    let mobNum = ''
    // var CoreTelephony = plus.ios.importClass('CoreTelephony')
    // // var core = new CoreTelephony()
    // var res = CoreTelephony.getCellInfo()
    // console.log('res===' + JSON.stringify(res))
    // plus.contacts.getAddressBook(plus.contacts.ADDRESSBOOK_PHONE, function(addressbook) {
    //   // 可通过addressbook进行通讯录操作
    //   console.log('contacts===' + JSON.stringify(addressbook))
    // }, function (e) {
    //   console.log('error=1==' + e.message)
    // })

    // plus.contacts.getAddressBook(plus.contacts.ADDRESSBOOK_PHONE, function(addressbook) {
    //   addressbook.find(['displayName', 'phoneNumbers'], function(contacts) {
    //     console.log('contacts===' + JSON.stringify(contacts))
    //   }, function(e) {
    //     console.log('error==2=' + e.message)
    //   })
    // }, function(e) {
    //   console.log('error=1==' + e.message)
    // })
    return mobNum
  }
  function getElectricity() {
    if (plus.os.name === 'Android') {
      var main = plus.android.runtimeMainActivity()
      var Intent = plus.android.importClass('android.content.Intent')
      var recevier = plus.android.implements('io.dcloud.feature.internal.reflect.BroadcastReceiver', {
        onReceive: function(context, intent) {
          var action = intent.getAction()
          if (action == Intent.ACTION_BATTERY_CHANGED) {
            var level = intent.getIntExtra('level', 0) // 电量 B5教程网
            var voltage = intent.getIntExtra('voltage', 0) // 电池电压
            var temperature = intent.getIntExtra('temperature', 0) // 电池温度
            // 如需获取别的，在这里继续写，此代码只提供获取电量
            return level
          }
        }
      })
      var IntentFilter = plus.android.importClass('android.content.IntentFilter')
      var filter = new IntentFilter(Intent.ACTION_BATTERY_CHANGED)
      main.registerReceiver(recevier, filter)
    } else {
      var UIDevice = plus.ios.import('UIDevice')
      var dev = UIDevice.currentDevice()
      if (!dev.isBatteryMonitoringEnabled()) {
        dev.setBatteryMonitoringEnabled(true)
      }
      var level = dev.batteryLevel()
      level = Number(level) * Number(100)
      return level
    }
  }
  function getLat() {
    let lat = ''
    return lat
  }
  function getLng() {
    let lng = ''
    return lng
  }
  function getCells() {
    let cells = {}
    return cells
  }
}
