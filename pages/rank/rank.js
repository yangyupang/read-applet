// pages/rank/rank.js
import api from "../../http/api";
Page({

    /**
     * 页面的初始数据
     */
    data: {
        booksList: [],
        zhouBangId: '',
        yueBangId: '',
        zongBangId: '',
        list: ["周榜", "月榜", "总榜"],
        activeIndex: 0
    },
    getRankInfo(id) {
        api.rankInfo(id).then(res => {
            // console.log(res);
            if (res.ok) {
                this.setData({
                    booksList: res.ranking.books
                })
                wx.hideLoading();
                if (res.ranking.monthRank && res.ranking.totalRank) {
                    this.setData({
                        zhouBangId: res.ranking._id,
                        yueBangId: res.ranking.monthRank,
                        zongBangId: res.ranking.totalRank
                    })
                }
                // console.log(res.ranking.books);
            }
        }).catch(err => {
            wx.hideLoading();
            console.log(err);
        });
    },
    clickItem(e) {
        let index = e.currentTarget.dataset.index;
        this.setData({
            activeIndex: index
        })
        if (index === 0) {
            api.rankInfo(this.data.zhouBangId).then(res => {
                if (res.ok) {
                    this.setData({
                        booksList: res.ranking.books
                    })
                }
            }).catch(err => {
                console.log(err);
            });
        } else if (index === 1) {
            api.rankInfo(this.data.yueBangId).then(res => {
                if (res.ok) {
                    this.setData({
                        booksList: res.ranking.books
                    })
                }
            }).catch(err => {
                console.log(err);
            });
        } else if (index === 2) {
            api.rankInfo(this.data.zongBangId).then(res => {
                if (res.ok) {
                    this.setData({
                        booksList: res.ranking.books
                    })
                }
            }).catch(err => {
                console.log(err);
            });
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        wx.showLoading({
            title: '加载中...',
        });
        let title = options.title
        wx.setNavigationBarTitle({
            title: title,
        });
        let id = options.id
        this.getRankInfo(id)
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})