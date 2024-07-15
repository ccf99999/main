// pages/profile/index.ts
const pageStack = getCurrentPages()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    console.log(777777778888999)
    const app = getApp()
    console.log('app-profile-onload', app)
    this.setData({
      ...app.userProfile
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  ncBlur(ev) {
    console.log(ev)
    if (ev.detail.value) {
      this.updateNc(ev.detail.value)

    }
  },
  async updateNc(nickName) {
    const {
      code,
      data
    } = await wx.http.put('/userInfo', {
      nickName
    })
    if (code !== 10000) {
      return wx.utils.toast('更新昵称失败')

    }
    pageStack[0].setData({
      nickName
    })
    const app = getApp()
    app.userProfile.nickName = nickName


  },
  getAvatar(ev) {
    console.log(ev, 8888)
    let _this = this
    if (ev.detail.avatarUrl) {
      console.log(ev.detail.avatarUrl, 898989)
      wx.uploadFile({
        filePath: ev.detail.avatarUrl,
        name: 'file',
        url: wx.http.baseURL + '/upload',
        formData: {
          type: "avatar"
        },
        header: {
          // 用户登录状态
          Authorization: 'Bearer ' + getApp().token
        },
        timeout: 2000,
        success: (result) => {
          const data = JSON.parse(result.data)
          if (data.code !== 10000) {
            return wx.utils.toast('上传头像失败！')
          }
          pageStack[0].setData({
            avatar: data.data.url
          })
          this.setData({
            avatar: data.data.url
          })
          const app = getApp()
          if (app.userProfile) {
            app.userProfile.avatar = data.data.url
          } else {
            app.userProfile = {
              avatar: data.data.url
            }
          }



        },
        fail: (res) => {},
        complete: (res) => {},
      })
    }



  }
})