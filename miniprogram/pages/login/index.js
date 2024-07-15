import wxValidate from "wechat-validate"
const app = getApp()
Page({
  behaviors: [wxValidate],
  data: {
    countDownVisible: false,
    mobile: "",
    code: "",
    redirectUrl: ""
  },
  rules: {
    mobile: [{
        required: true,
        message: '请填写手机号码!'
      },
      {
        pattern: /^1[3-8]\d{9}$/,
        message: "手机号码输入有误"
      }
    ],
    code: [{
        required: true,
        message: '请填写验证码!'
      },
      {
        pattern: /^\d{6}$/,
        message: "请输入正确的验证码"
      }
    ]
  },
  onLoad({
    redirectUrl
  }) {
    this.setData({
      redirectUrl
    })
    console.log(this.data)


  },

  countDownChange(ev) {
    this.setData({
      timeData: ev.detail,
      countDownVisible: ev.detail.minutes === 1 || ev.detail.seconds > 0,
    })
  },
  async getCode() {
    const {
      valid,
      message
    } = this.validate('mobile')
    console.log('valid', valid, message)

    if (!valid) {
      return wx.utils.toast(message)
    }

    this.setData({
      countDownVisible: true
    })

    const {
      code,
      data
    } = await wx.http.get('/code', {
      mobile: this.data.mobile
    })
    if (code !== 10000) {
      return wx.utils.toast('发送失败')

    }
    console.log('data', data)
  },
  async login() {
    const res = this.validate()

    if (!res) {
      return false
    }

    const {
      code,
      data
    } = await wx.http.post('/login', {
      mobile: this.data.mobile,
      code: this.data.code
    })
    if (code !== 10000) {
      return wx.utils.toast('发送失败,稍后重试')
    }
    app.setToken('token', data.token)
    app.setToken('refreshToken', data.refreshToken)
debugger
    if (wx.utils.isTabBarPage(this.data.redirectUrl)) {
      //tabBar --wx.switchTab 
      console.log('switch');
      wx.switchTab({
        url: this.data.redirectUrl,
      })
    } else {
      wx.redirectTo({
        url: this.data.redirectUrl,
      })
    }





  }
})