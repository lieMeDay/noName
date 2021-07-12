Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: []
  },
  upImg() {
    let that = this
    this.setData({
      list: [],
      showC: false
    })
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album'],
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        wx.showLoading({
          title: '识别中',
          icon: 'none'
        })
        wx.getFileSystemManager().readFile({
          filePath: tempFilePaths[0], //选择图片返回的相对路径
          encoding: "base64", //这个是很重要的
          success: res => { //成功的回调
            //返回base64格式
            that.get(res.data)
          }
        })
      }
    })
  },
  get(img) {
    let that = this
    wx.request({
      url: 'https://aip.baidubce.com/oauth/2.0/token',
      data: {
        grant_type: 'client_credentials',
        client_id: "nLdPYlqWnO8Abk8I5zc06Lms",
        client_secret: "0WIiiHdGwYCTgXsRzd6rNhgz8SGaMCeW"
      },
      success(res) {
        // console.log(res.data)
        let at = res.data.access_token
        wx.request({
          url: 'https://aip.baidubce.com/rest/2.0/ocr/v1/general_basic',
          data: {
            access_token: at,
            image: img
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded' // 默认值
          },
          method: 'POST',
          success(rr) {
            // console.log(rr.data.words_result)
            let r = rr.data.words_result
            that.setData({
              list: r,
              showC: true
            })
            wx.hideLoading()
            // that.qu(r)
          },
          fail(err) {
            wx.hideLoading()
            wx.showToast({
              title: '识别失败',
              icon: 'none'
            })
          }
        })
      },
      fail(err) {
        wx.hideLoading()
        wx.showToast({
          title: '识别失败',
          icon: 'none'
        })
      }
    })
  },
  close() {
    this.setData({
      list: [],
      showC: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})