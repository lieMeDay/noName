// 引入SDK核心类
var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
var qqmapsdk;
var util = require('../../utils/util')
Page({
  data: {
    list: [],
    lat: 39.91799,
    lng: 116.397027
  },
  getmy(s) {
    let that = this
    wx.getLocation({
      type: 'gcj02',
      success(res) {
        let lat = res.latitude
        let lng = res.longitude
        // console.log(lat, lng)
        that.setData({
          lat: lat,
          lng: lng
        })
        that.seach()
        if (s) {
          wx.hideNavigationBarLoading();
          //停止下拉刷新
          wx.stopPullDownRefresh();
        }
      },
      fail(err) {
        wx.showToast({
          title: '竟然被拒绝了呀,(⊙▽⊙),那我只能随便找个地方了呀',
          icon: 'none',
          duration: 3000
        })
        that.seach()
      }
    })
  },
  seach() {
    let that = this
    let td = that.data
    // 调用接口
    qqmapsdk.search({
      keyword: '公园',
      filter:'category=公园',
      page_size:20,
      location: td.lat + ',' + td.lng,
      success: function (res) {
        let rr = res.data
        console.log(rr)
        rr.forEach(v => {
          let dis = util.getDistance(td.lat, td.lng, v.location.lat, v.location.lng)
          if (dis < 1) {
            v.dis = (dis * 1000).toFixed(1) + 'M'
          } else {
            v.dis = dis.toFixed(2) + 'KM'
          }
        })
        that.setData({
          list: res.data
        })
      },
      fail: function (res) {
        console.log(res);
      },
    });
  },
  goAddress(e) {
    let loc = e.currentTarget.dataset.loc
    wx.openLocation({
      latitude: loc.lat,
      longitude: loc.lng
    })
  },
  onLoad: function () {
    // 实例化API核心类
    qqmapsdk = new QQMapWX({
      key: 'EQFBZ-4AO33-NEH3W-YRHXX-RUIFZ-DRBS2'
    });
    this.getmy()
  },

  onPullDownRefresh: function () {
    // console.log(1)
    wx.showNavigationBarLoading();
    this.getmy(1)
  }
})