import QQMap from '../../../utils/qqmap'
Page({

  data: {
    points: [],
    address: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.getLocation()

  },
  async getLocation() {
    wx.getLocation({
      isHighAccuracy: true,
      type: "gcj02 ",
      success: (res) => {
        console.log(res);
        const {
          latitude,
          longitude
        } = res
        console.log('latitude', latitude)

        this.getPoint(latitude, longitude)
      },

      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
        console.log(res);
      }
    })

  },
  getPoint(latitude, longitude) {
    wx.showLoading({
      title: '正在加载',
    })
    // 逆地址解析
    QQMap.reverseGeocoder({
      location: [latitude, longitude].join(','),
      success: ({
        result
      }) => {
        console.log('sss79997', result);
        this.setData({
          address: result.address
        })
      }
    })
    console.log(latitude, longitude, [latitude, longitude].join(','));
    QQMap.search({
      keyword: '住宅小区', //搜索关键词
      location: [latitude, longitude].join(','),
      page_size: 5, //设置周边搜索中心点
      success: (res) => { //搜索成功后的回调
        console.log('sss77', res);
        const points = res.data.map(({
          id,
          title,
          _distance
        }) => {
          return {
            id,
            title,
            _distance
          }
        })

        console.log(points);
        this.setData({
          points
        })
        // var mks = []
        // for (var i = 0; i < res.data.length; i++) {
        //   mks.push({ // 获取返回结果，放到mks数组中
        //     title: res.data[i].title,
        //     id: res.data[i].id,
        //     latitude: res.data[i].location.lat,
        //     longitude: res.data[i].location.lng,
        //     iconPath: "/resources/my_marker.png", //图标路径
        //     width: 20,
        //     height: 20
        //   })
        // }

      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
        console.log(res);
        wx.hideLoading()
      }
    });
  },
  choosePosition() {
    wx.chooseLocation({
      // location: [latitude, longitude].join(','),
      success: (result) => {
        console.log('sss79997', result);
        this.getPoint(result.latitude, result.longitude)
        // this.setData({
        //   address: result.address
        // })

      }
    })
  }




})