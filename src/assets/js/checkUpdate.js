export default function checkUpdate() {
  var wgtVer = null
  function plusReady() {
    // 获取本地应用资源版本号
    plus.runtime.getProperty(plus.runtime.appid, function(inf) {
      wgtVer = inf.version
      console.log('当前应用版本：' + wgtVer)
      if (mui.os.ios) { // 苹果手机
        mui.ajax({
          type: 'get',
          dataType: 'json',
          url: 'https://itunes.apple.com/lookup', // 获取当前上架APPStore版本信息
          data: {
            id: 1472327937 // APP唯一标识ID
          },
          contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
          success: function (data) {
            plus.nativeUI.closeWaiting()
            console.log('jsjsjsjs' + JSON.stringify(data))
            // $.each(data, function(i, norms) {
            //   $.each(norms, function(key, value) {
            //     $.each(value, function(j, normItem) {
            //       if (j=='version') {
            //         if (normItem > wgtVer) {
            //           plus.nativeUI.alert('发现新版本:V' + normItem)
            //           document.location.href = 'https://itunes.apple.com/cn/app/san-gu-hui/id1472327937?mt=8' // 上新APPStore下载地址
            //         } else {
            //           plus.nativeUI.alert('当前版本号已是最新')
            //         }
            //       }
            //     })
            //   })
            // })
            return
          }
        })
      } else if (mui.os.android) {
        checkUpdate()
      }
    })
  }
  if (window.plus) {
    plusReady()
  } else {
    document.addEventListener('plusready', plusReady, false)
  }
  // 检测更新
  var checkUrl = 'http://v.zqysjt.com:8080/apk.txt'
  function checkUpdate() {
    plus.nativeUI.showWaiting('检测更新...')
    var xhr = new XMLHttpRequest()
    xhr.responseType = 'text'
    xhr.onreadystatechange = function() {
      switch(xhr.readyState) {
        case 4:
          plus.nativeUI.closeWaiting()
          if (xhr.status == 200) {
            // console.log('检测更新成功：' + xhr.responseText)
            var newVer = xhr.responseText.replace(/[\r\n]/g, '') // xhr.responseText
            if (wgtVer && newVer && (wgtVer < newVer)) {
              downWgt() // 下载升级包
            } else {
              // console.log('已是最新版本')
              plus.nativeUI.alert('已是最新版本！')
            }
          } else {
            // console.log('检测更新失败！')
            plus.nativeUI.alert('检测更新失败！')
          }
          break
        default:
          break
      }
    }
    xhr.open('GET', checkUrl, true)
    xhr.send()
  }

  // 下载wgt文件
  var wgtUrl = 'https://eshopapk.s3.cn-north-1.jdcloud-oss.com/update.wgt'
  function downWgt() {
    var cfi = confirm('是否下载新的安装包?')
    if (cfi == true) {
      plus.nativeUI.showWaiting('正在更新软件，请稍后...')
      plus.downloader.createDownload(wgtUrl, {filename: '_doc/update/'}, function(d, status) {
        if (status == 200) {
          installWgt(d.filename) // 安装wgt包
        } else {
          plus.nativeUI.alert('下载安装包失败！')
        }
        plus.nativeUI.closeWaiting()
      }).start()
    }
  }
  function installWgt(path) {
    plus.nativeUI.showWaiting('正在安装文件，请稍后...')
    plus.runtime.install(path, {}, function() {
      plus.nativeUI.closeWaiting()
      // console.log('安装wgt文件成功！')
      plus.nativeUI.alert('应用资源更新完成！', function() {
        plus.runtime.restart()
      })
    }, function(e) {
      plus.nativeUI.closeWaiting()
      console.log('安装wgt文件失败[' + e.code + ']：' + e.message)
      plus.nativeUI.alert('安装文件失败')
    })
  }
}
