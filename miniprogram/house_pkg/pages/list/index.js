Page({
  data: {
    dialogVisible: false,
    houseList: [],
    isEmpty: false
  },
  async onShow() {
    console.log(555555);
    this.getList()
  },
  async getList() {
    const {
      code,
      data: houseList
    } = await wx.http.get('/room')

    console.log(houseList);
    if (code !== 10000) {
      return wx.utils.toast('查询失败！')
    }
    this.setData({
      houseList,
      isEmpty: houseList.length === 0
    })

  },

  swipeClose(ev) {
    console.log(ev);
    const {
      id,
      index
    } = ev.mark;
    this.ceilId = id;
    this.ceilIndex = index
    const {
      position,
      instance
    } = ev.detail

    if (position === 'right') {
      // 显示 Dialog 对话框
      this.setData({
        dialogVisible: true,
      })

      // swiper-cell 滑块关闭
      instance.close()
    }
  },
  async dialogClose(ev) {
    if (ev.detail === 'confirm') {
      // this.ceilId = id;
      // this.ceilIndex = index
      const {
        code,

      } = await wx.http.delete('/room/' + this.ceilId, )
      console.log(code);
      if (code !== 10000) {
        return wx.utils.toast('删除失败！')
      }
      this.data.houseList.splice(this.ceilIndex, 1)
      this.setData({
        houseList: this.data.houseList,
        isEmpty: this.data.houseList.length === 0
      })


    }

  },

  goDetail(ev) {
    wx.navigateTo({
      url: '/house_pkg/pages/detail/index?id=' + ev.mark.id,
    })
  },

  addHouse() {
    wx.navigateTo({
      url: '/house_pkg/pages/locate/index',
    })
  },

})