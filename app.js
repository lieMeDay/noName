//app.js
App({
  onLaunch: function () {
    const updateManager = wx.getUpdateManager()
			updateManager.onCheckForUpdate(function(res) {
				// 请求完新版本信息的回调
				// console.log(res.hasUpdate)
				if (res.hasUpdate) {
					// 下载新版本
					updateManager.onUpdateReady(function() {
						wx.showModal({
							title: '更新提示',
							content: '新版本已经准备好，是否重启应用？',
							success(res) {
								if (res.confirm) {
									// 重启应用
									updateManager.applyUpdate()
								}
							}
						})
					})
					// 新版本下载失败
					updateManager.onUpdateFailed(function(res) {
						// 新的版本下载失败
						wx.showModal({
							title: '已经有新版本了哟~',
							content: '版本更新失败~，请您删除当前小程序，重新搜索打开哟~',
						})
					})
				}
			})
  },
  globalData: {
  }
})