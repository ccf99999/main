import http from 'wechat-http'

http.baseURL = ""

http.intercept.response = async function (res) {

  let {
    config
  } = res
  //401代表token失效
  if (res.data.code === 401) {

    const app = getApp();
    console.log('app', app)

    if (config.url.includes('/refreshToken')) {
      const pageStack = getCurrentPages()
      const currentPage = pageStack.pop()
      const redirectUrl = currentPage.route
      return wx.redirectTo({
        url: '/pages/login/index?redirectUrl=/' + redirectUrl,
      })

    }
    const res = await http({
      url: "/refreshToken",
      method: "POST",
      header: {
        Authorization: "Bearer " + app.refreshToken
      }

    })
    console.log('res1000', res)

    if (res.code !== 10000) {
      return wx.utils.toast('更新token失败')

    }
    app.setToken('token', res.data.token)
    app.setToken('refreshToken', res.data.refreshToken)

    console.log(config, 66666);
    config = Object.assign(config, {
      header: {
        Authorization: 'Bearer ' + res.data.token
      }
    })

    console.log('再次调用')

    return http(config)




  }
  return res.data

}
http.intercept.request = function (params) {
  const defaultHeader = {}
  console.log(getApp(), 999900000)
  defaultHeader.Authorization = "Bearer " + getApp().token;
  params.header = Object.assign({}, defaultHeader, params.header, )
  return params

}

export default http
wx.http = http