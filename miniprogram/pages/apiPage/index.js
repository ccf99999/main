Page({

  data: {
    userName: "zs",
    userTel: "133",
  },

  onLoad(options) {
        // 更新导航栏的标题
        // wx.setNavigationBarTitle({
        //   title: '导航与跳转',
        // })
        wx.getLocation({
          type: 'wgs84',
          success: (res) => {
            console.log('res',res)
            const latitude = res.latitude // 纬度
            const longitude = res.longitude // 经度
          }
        })
    this.setData({
      userName:"李四"
      // envId: options.envId
    });
  },

});
