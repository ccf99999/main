// app.js
App({
  // https://developers.weixin.qq.com/miniprogram/dev/reference/api/App.html#onShow-Object-object
  onLaunch: function () {
    console.log('微信小程序初始化')
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        traceUser: true,
      });
    }

    this.globalData = {
      userName:"曹春凤"
    };
  },
  onShow:function(){
    // 小程序启动，或从后台进入前台显示时触发。也可以使用 wx.onAppShow 绑定监听。
    console.log('微信小程序启动')
  },
  onPageNotFound(res) {
    // 小程序要打开的页面不存在时触发。也可以使用 wx.onPageNotFound 绑定监听。注意事项请参考 ///wx.onPageNotFound。
    wx.redirectTo({
      url: 'pages/...'
    }) // 如果是 tabbar 页面，请使用 wx.switchTab
  }
});
