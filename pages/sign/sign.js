// pages/sign/sign.js
var content = null;
var touchs = [];
var canvasw = 0;
var canvash = 0;
var _that;
Page({

  /* 页面的初始数据*/
  data: {
    isEnd: false, // 是否签名
  },
  // 完成签名
  overSign: function() {
    if (this.data.isEnd) {
      wx.canvasToTempFilePath({
        canvasId: 'firstCanvas',
        fileType: 'png',
        success: function(res) {
          //打印图片路径
          console.log(res.tempFilePath)
          console.log('完成签名')
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success(res){
              wx.showToast({
                title: '保存成功',
                icon:'success'
              })
            },
            fail(err){
              // console.log(err)
              wx.showToast({
                title: '请点击右上角打开设置允许使用相册',
                icon:'none'
              })
            }
          })
          // let fsm = wx.getFileSystemManager();
          // fsm.readFile({
          //   filePath: res.tempFilePath,
          //   success: function(res) {
          //     //转换成功
          //     var arrayBuffer = res.data
          //     fsm.writeFile({
          //       filePath: `${wx.env.USER_DATA_PATH}/autograph.png`,
          //       data: arrayBuffer,
          //       encoding: 'binary',
          //       success() {
          //         console.log('写入成功')
          //         uni.navigateBack()
          //       },
          //       fail(err) {
          //         console.log(err)
          //       },
          //     });
          //   },
          //   fail: function(e) {}
          // })
        }
      })
    } else {
      wx.showToast({
        title: '内容为空或上次签名未完成,建议点击重签按钮后重新签名',
        icon: "none",
        duration: 1500,
        mask: true
      })
    }
  },

			// 画布的触摸移动开始手势响应
			start: function(event) {
				// console.log(event)
				console.log("触摸开始" + event.changedTouches[0].x)
				console.log("触摸开始" + event.changedTouches[0].y)
				//获取触摸开始的 x,y
				let point = {
					x: event.changedTouches[0].x,
					y: event.changedTouches[0].y
				}
				// console.log(point)
				touchs.push(point);

			},
			// 画布的触摸移动手势响应
			move: function(e) {
				let point = {
					x: e.touches[0].x,
					y: e.touches[0].y
				}
				// console.log(point)
				touchs.push(point)
				if (touchs.length >= 2) {
					this.draw(touchs)
				}
			},

			// 画布的触摸移动结束手势响应
			end: function(e) {
				console.log("触摸结束" + e)
				// 设置为已经签名
				this.setData({isEnd:true})
				// 清空轨迹数组
				for (let i = 0; i < touchs.length; i++) {
					touchs.pop()
				}

			},

			// 画布的触摸取消响应
			cancel: function(e) {
				console.log("触摸取消" + e)
			},

			// 画布的长按手势响应
			tap: function(e) {
				console.log("长按手势" + e)
			},

			error: function(e) {
				console.log("画布触摸错误" + e)
			},

			//绘制
			draw: function(touchs) {
				// console.log(touchs[0], touchs[1])
				let point1 = touchs[0]
				let point2 = touchs[1]
				touchs.shift()
				content.moveTo(point1.x, point1.y)
				content.lineTo(point2.x, point2.y)
				content.stroke()
				content.draw(true)
			},
			//清除操作
			clearClick: function() {
				// 设置为未签名
				this.setData({isEnd:false})
				//清除画布
				content.clearRect(0, 0, canvasw, canvash)
				content.draw(true)
			},
  /* 生命周期函数--监听页面加载*/
  onLoad: function (options) {
			_that = this
			let dev = wx.getSystemInfoSync()
			console.log(dev)
			// screenWidth windowHeight
			canvasw = dev.screenWidth - 20
			canvash = dev.screenHeight - 70
			//获得Canvas的上下文
			content = wx.createCanvasContext('firstCanvas')
			//设置线的颜色
			content.setStrokeStyle("#000")
			//设置线的宽度
			content.setLineWidth(5)
			//设置线两端端点样式更加圆润
			content.setLineCap('round')
			//设置两条线连接处更加圆润
			content.setLineJoin('round')
			content.setFillStyle('white'); //填充白色

			content.fillRect(0, 0, canvasw, canvash); //画出矩形白色背景

			content.restore()
			content.save()
  },

  /* 生命周期函数--监听页面初次渲染完成*/
  onReady: function () {},

  /* 生命周期函数--监听页面显示*/
  onShow: function () {},

  /* 生命周期函数--监听页面隐藏*/
  onHide: function () {},

  /* 生命周期函数--监听页面卸载*/
  onUnload: function () {},

  /* 页面相关事件处理函数--监听用户下拉动作*/
  onPullDownRefresh: function () {},

  /* 页面上拉触底事件的处理函数*/
  onReachBottom: function () {},

  /* 用户点击右上角分享*/
  onShareAppMessage: function () {}
})