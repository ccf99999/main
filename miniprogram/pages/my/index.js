const app = getApp()
Page({
  onLoad() {
    console.log('appppppp', app, app.token)
    app.token && this.getUserInfo()

  },
  async getUserInfo() {
    debugger
    const {
      code,
      data
    } = await wx.http.get('/userInfo')
    console.log(code, 999)
    if (code !== 10000) {
      return wx.utils.toast()

    }
    const {
      avatar,
      nickName
    } = data
    console.log(data, 11112221)
    this.setData({
      avatar,
      nickName
    })
    console.log('avatar9999', avatar)
    app.userProfile = {
      avatar,
      nickName
    }

  },
  goLogin() {
    wx.navigateTo({
      url: '/pages/login/index',
    })
  },
})