Page({
  data: {
    notices: []
  },
  onLoad() {
    this.getNotice()


  },
  async getNotice() {
    const {
      code,
      data
    } = await wx.http.get('/announcement')
    console.log(code)
    if (code !== 10000) {
      return wx.utils.toast()

    }
    console.log(data, 888888)
    this.setData({
      notices: data
    })

  }
})