// pages/home/home.js
let that=''
Page({

  /* 页面的初始数据*/
  data: {
    list:[{
      icon:'/images/i1.png',
      path:'/pages/findWC/findWC',
      tit:'wc',
      desc:'就在你附近呦'
    },{
      icon:'/images/i2.png',
      path:'/pages/boring/boring',
      tit:'点点',
      desc:'无聊的话可以点一下呦'
    },{
      icon:'/images/i3.png',
      path:'/pages/pic/pic',
      tit:'识图',
      desc:'正经的识别文字图片呀'
    },{
      icon:'/images/i4.png',
      path:'/pages/sign/sign',
      tit:'签签',
      desc:'来个电子签名吧'
    }]
  },
  writeTxt(story,type){
    var i = 0;
    var time=0
    time = setInterval(function () {
      var text = story.substring(0, i);
      i++;
      that.setData({
        text: text
      });
      if (text.length == story.length) {
        //   console.log("定时器结束！");
        clearInterval(time);
        setTimeout(() => {
          that.delTxt(story,type)
        }, 200);
      }
    }, 200)
  },
  delTxt(txt,type){
    let i=txt.length-1
    var time=0
    time = setInterval(function () {
      var text = txt.substring(0, i);
      i--;
      that.setData({
        text: text
      });
      if (text.length == 0) {
        //   console.log("定时器结束！");
        clearInterval(time);
        if(type=='CN')that.writeTxt("Please don't stop to be what you want to be",'EN')
        else that.writeTxt("请你一定不要停下来 成为你想成为的人",'CN')
      }
    }, 100)
  },
  goPage(e){
    let p=e.currentTarget.dataset.p
    wx.navigateTo({
      url: p
    })
  },
  /* 生命周期函数--监听页面加载*/
  onLoad: function (options) {
    that=this
    //文字逐个显示
    // "请你一定不要停下来 成为你想成为的人"
    // "Please don't stop to be what you to be"
    this.writeTxt("请你一定不要停下来 成为你想成为的人",'CN')
  },

  /* 生命周期函数--监听页面初次渲染完成*/
  onReady: function () {

  },

  /* 生命周期函数--监听页面显示*/
  onShow: function () {

  },

  /* 生命周期函数--监听页面隐藏*/
  onHide: function () {

  },

  /* 生命周期函数--监听页面卸载*/
  onUnload: function () {

  },

  /* 页面相关事件处理函数--监听用户下拉动作*/
  onPullDownRefresh: function () {

  },

  /* 页面上拉触底事件的处理函数*/
  onReachBottom: function () {

  },

  /* 用户点击右上角分享*/
  onShareAppMessage: function () {

  }
})