Page({
  data: {
    houseDetail: {}
  },
  onLoad({
    id
  }) {
    this.getDetail(id)

  },
  async getDetail(id) {
    if (!id) return

    const {
      code,
      data
    } = await wx.http.get('/room/' + id)

    console.log(data);
    if (code !== 10000) {
      return wx.utils.toast('查询失败！')
    }
    this.setData({
      houseDetail: data

    })

  },
  editHouse() {
    wx.navigateTo({
      url: '/house_pkg/pages/form/index',
    })
  },
})