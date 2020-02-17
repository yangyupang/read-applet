//app.js
App({
    onLaunch: function() {
        //获取相册授权
        wx.getSetting({
            success(res) {
                if (!res.authSetting['scope.writePhotosAlbum']) {
                    wx.authorize({
                        scope: 'scope.writePhotosAlbum',
                        success() {
                            console.log('授权成功')
                        }
                    })
                }
            }
        })

    },
    globalData: {
        userInfo: null
    }
})