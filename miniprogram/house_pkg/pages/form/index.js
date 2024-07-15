// [\u4e00-\u9fa5] 中文验证规则
// 导入表单验证插件
import wxValidate from 'wechat-validate'
Page({
  behaviors: [wxValidate],
  data: {
    idcardFrontUrl: '',
    idcardBackUrl: '',
    building: "",
    room: "",
    point: "",
    name: "",
    gender: "1",
    mobile: " "
  },
  rules: {
    name: [{
        required: true,
        message: "业务姓名不能为空"
      },
      // {
      //   pattern: /^[\u4e00-\u9fa5]{2-5}$/,
      //   message: "业主姓名只能为中文"
      // }
    ],
    mobile: [{
        required: true,
        message: "手机号不能为空"
      },
      // {
      //   pattern: /^1[3-8]\d{9}$/,
      //   message: "手机号格式有误"
      // }
    ],
    idcardFrontUrl: [{
      required: true,
      message: "请上传身份证国徽面"
    }],
    idcardBackUrl: [{
      required: true,
      message: "身份证反面不能为空"
    }]
  },
  onLoad({
    building,
    room,
    point
  }) {

    console.log(point, 88888)
    this.setData({
      building,
      room,
      point
    })

  },
  async submitForm() {
    console.log(this)
    if (!this.validate()) return
    // 剔除多余数据，可能多余
    const {
      __webviewId__,
      ...data
    } = this.data;
    const {
      code,

    } = await wx.http.post('/room', data)
    console.log(code);
    if (code !== 10000) {
      return wx.utils.toast('保存失败！')
    }
    wx.navigateBack({
      delta: 4
    })

    // wx.reLaunch({
    //   url: '/house_pkg/pages/list/index',
    // })
  },
  removePicture(ev) {
    // 移除图片的类型（身份证正面或反面）
    const type = ev.mark?.type
    this.setData({
      [type]: ''
    })
  },
  async uploadImg(ev) {
    const {
      type
    } = ev.mark

    try {
      const media = await wx.chooseMedia({
        count: 1,
        sizeType: ['compressed'],
        mediaType: ["image"]
      })
      console.log(media);
      wx.uploadFile({
        url: wx.http.baseURL + '/upload',
        filePath: media.tempFiles[0].tempFilePath,
        name: 'file',

        // formData: {
        //   type: "avatar"
        // },
        header: {
          // 用户登录状态
          Authorization: 'Bearer ' + getApp().token
        },
        timeout: 2000,
        success: (result) => {
          console.log(result);
          const data = JSON.parse(result.data)
          if (data.code !== 10000) {
            return wx.utils.toast('上传失败！')
          }
          // pageStack[0].setData({
          //   avatar: data.data.url
          // })
          this.setData({
            [type]: data.data.url
          })
          const app = getApp()




        },
        fail: (res) => {},
        complete: (res) => {},
      })
    } catch (err) {
      console.log(err);

    }





  },
  uploadFile() {

  }
})