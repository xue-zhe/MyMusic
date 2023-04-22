// app.js
App({
  globalData: {
    screenWidth: 0,
    screenHeight: 0,
    statusBarHeight: 0,
    navBarHeight: 44,
    deviceRadio: 0
  },
  onLaunch:async function() {
    //1获取默认信息
    const info = wx.getSystemInfoSync()
    this.globalData.screenHeight = info.screenHeight
    this.globalData.screenWidth = info.screenWidth
    this.globalData.statusBarHeight = info.statusBarHeight
    const deviceRadio = info.screenHeight / info.screenWidth
    this.globalData.deviceRadio = deviceRadio
  }
})
