const toast = function (title = "数据加载中") {
  wx.showToast({
    title,
    icon: "none"
  })

}
const utils = {
  toast,
  isTabBarPage(path) {
    console.log('__wxConfig', __wxConfig)
    const tabBarList = __wxConfig.tabBar.list
    const dealedTabBarList = tabBarList.map(({
      pagePath
    }) => {
      return '/' + pagePath.split('.')[0]

    })

    console.log('100000', path, dealedTabBarList, dealedTabBarList.includes(path));
    debugger
    return dealedTabBarList.includes(path)

  },
}

wx.utils = utils

export default utils