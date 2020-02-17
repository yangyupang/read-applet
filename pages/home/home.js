import api from "../../http/api";

// pages/home/home.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        classificationRanking: ['分类', '排行'],
        activeIndex: 0,
        //男生分类
        maleList: [],
        //女生分类
        femaleList: [],
        //出版社分类
        pressList: [],
        //男生排行版信息
        rankMaleList: [],
        //女生排行版信息
        rankFemaleList: [],
    },
    chooseItem(e) {
        let index = e.currentTarget.dataset.index;
        this.setData({
            activeIndex: index
        })

    },
    //获取分类
    getStatistics() {
        api.getBigClassify().then(res => {
            if (res.ok) {
                this.setData({
                    maleList: res.male,
                    femaleList: res.female,
                    pressList: res.press
                })
                wx.hideLoading();
                // console.log(this.data.maleList);
            }
        }).catch(err => {
            wx.hideLoading();
            console.log(object);
        });
    },
    //获取排行信息
    getRankCategory() {
        api.rankCategory().then(res => {
            if (res.ok) {
                this.setData({
                        rankMaleList: res.male.slice(0, 6),
                        rankFemaleList: res.female.slice(0, 6),
                    })
                    // console.log(this.data.rankMaleList);
            }
        }).catch(err => {
            console.log(err);
        });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        wx.showLoading({
            title: '加载中...',
        });
        this.getStatistics();
        this.getRankCategory();
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