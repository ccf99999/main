// house_pkg/pages/building/index.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    size: 0,
    point: "",
    type: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad({
    point
  }) {
    this.fake(point)

  },
  fake(point) {
    //生成楼栋数
    const size = Math.floor(Math.random() * 5) + 3
    const type = size > 6 ? "号楼" : "栋"
    this.setData({
      type,
      size,
      point
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


})