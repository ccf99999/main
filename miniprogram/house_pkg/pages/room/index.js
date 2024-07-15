// house_pkg/pages/room/index.ts
Page({


  /**
   * 页面的初始数据
   */
  data: {
    rooms: [],
    size: "",
    point: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad({
    point,
    size
  }) {
    console.log(point, size);
    this.fake(point, size)

  },
  fake(point, size) {
    const rooms = []
    for (let i = 0; i < 5; i++) {
      const room = [i + 1, 0, i].join('')
      rooms.push(room)
    }

    console.log(rooms);
    this.setData({
      rooms,
      point,
      size
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

  }
})