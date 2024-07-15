// components/authorization/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    isLogin: true
  },
  lifetimes: {
    attached() {
      const isLogin = !!getApp().token
      this.setData({
        isLogin
      })
      const pageStack = getCurrentPages()
      const pageInstance = pageStack.pop();

      if (!isLogin) {
        // 用户没有登录，覆盖onload，不发送请求
        pageInstance.onload = () => {

        }
        pageInstance.onshow = () => {

        }
        wx.redirectTo({
          url: '/pages/login/index?redirectUrl=/' + pageInstance.route,
        })

      }
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})