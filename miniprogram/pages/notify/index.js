Page({
  data: {
    noticeDetail: {}
  },
  onLoad({
    id
  }) {
    this.getNoticeDetail(id)

  },
  async getNoticeDetail(id) {
    if (id === undefined) {
      return

    }
    const {
      code,
      data
    } = await wx.http.get('/announcement/' + id)
    if (code !== 10000) {
      return wx.utils.toast()

    }
    this.setData({
      noticeDetail: data
    })
  }
})