//app.js
App({
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
	  wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'haixian-w8bmo',
        // env: 'yunkaifa-xuexi-1',
        env:"haixian-2gzp69d6d77af666",
        traceUser: true,
      })
    }

    this.globalData = {}
  }
})
