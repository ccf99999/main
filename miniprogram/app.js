// app.js
import utils from './utils/utils'
import http from './utils/http'
App({
  globalData: {},
  onLaunch() {
    this.getToken()

  },
  setToken(key, token) {
    this[key] = token;
    wx.setStorageSync(key, token)

  },
  getToken() {
    this.token = wx.getStorageSync('token')
    this.refreshToken = wx.getStorageSync('refreshToken')
  }
})