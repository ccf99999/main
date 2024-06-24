// index.js
//获取全局属性
const app = getApp()
console.log('app.global', app.globalData)
const {
  envList
} = require('../../envList.js');

Page({
  setMsg:function(){
    console.log('初始化onSHow-Indexpage')
          this.setData({
        msg:"还是说"
      });

  },
  onShow: function () {
    console.log('初始化onSHow-Indexpage')

  },
  onLoad: function () {
    console.log('onLoad-Indexpage')

  },
  onHide: function () {
    console.log('onHide-Indexpage-离开本页面打开新页面')
  },
  data: {
    msg: "大家好",
    envList,
    selectedEnv: envList[0],
    haveCreateCollection: false
  },
  triggleTab: function () {
    //传参  https://developers.weixin.qq.com/community/develop/article/doc/00000453df06f07a5c8d91ef856c13
    // fn1
    app.globalData.userName = "张三里"
    //fn2
    // wx.setStorageSync('userInfo', this.data.userInfo)
    // let userInfo = wx.getStorageSync('userInfo', this.data.userInfo)
    wx.switchTab({
      url: '/pages/myPage/index'
    })
  },

  onClickPowerInfo(e) {
    const index = e.currentTarget.dataset.index;
    const powerList = this.data.powerList;
    const selectedItem = powerList[index];
    // selectedItem.showItem = !selectedItem.showItem;
    // if (selectedItem.link) {
    //   // 跳转页面
    //   wx.navigateTo({
    //     url: `../web/index?url=${selectedItem.link}&title=${selectedItem.title}`,
    //   });
    // } else if (selectedItem.page) {
    //   wx.navigateTo({
    //     url: `/pages/${selectedItem.page}/index`,
    //   });
    // } else if (selectedItem.title === '数据库' && !this.data.haveCreateCollection) {
    //   this.onClickDatabase(powerList);
    // } else {
    //   this.setData({
    //     powerList
    //   });
    // }
  },

  onChangeShowEnvChoose() {
    wx.showActionSheet({
      itemList: this.data.envList.map(i => i.alias),
      success: (res) => {
        this.onChangeSelectedEnv(res.tapIndex);
      },
      fail(res) {
        console.log(res.errMsg);
      }
    });
  },

  onChangeSelectedEnv(index) {
    if (this.data.selectedEnv.envId === this.data.envList[index].envId) {
      return;
    }
    const powerList = this.data.powerList;
    powerList.forEach(i => {
      i.showItem = false;
    });
    this.setData({
      selectedEnv: this.data.envList[index],
      powerList,
      haveCreateCollection: false
    });
  },

  jumpPage(e) {
    wx.navigateTo({
      url: `/pages/${e.currentTarget.dataset.page}/index?envId=${this.data.selectedEnv.envId}`,
    });
  },

  onClickDatabase(powerList) {
    wx.showLoading({
      title: '',
    });
    wx.cloud.callFunction({
      name: 'quickstartFunctions',
      config: {
        env: this.data.selectedEnv.envId
      },
      data: {
        type: 'createCollection'
      }
    }).then((resp) => {
      if (resp.result.success) {
        this.setData({
          haveCreateCollection: true
        });
      }
      this.setData({
        powerList
      });
      wx.hideLoading();
    }).catch((e) => {
      console.log(e);
      this.setData({
        showUploadTip: true
      });
      wx.hideLoading();
    });
  }
});