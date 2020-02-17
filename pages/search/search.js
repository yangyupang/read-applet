// pages/search/search.js
import api from '../../http/api'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        hotWords: [],
        hotWordsCopy: [],
        // 搜索关键词
        keyWords: '',
        // 输入框的值变化
        inputValue: '',
        //搜索历史
        historyList: [],
        //搜索到的书籍内容
        booksList: [],
        limit: 10
    },
    //获取热门搜索
    getHotWord() {
        api.hotWord().then(res => {
            this.setData({
                hotWords: res.hotWords.slice(0, 6),
                hotWordsCopy: res.hotWords
            })
            wx.hideLoading();
            // console.log(res.hotWords);
        }).catch(err => {
            console.log(err);
            wx.hideLoading();
        });
    },
    //获取书籍信息
    getBooks() {
        api.bookSearch((this.data.keyWords || this.data.inputValue), 0, this.data.limit).then(res => {
            if (res.ok) {
                this.setData({
                        booksList: res.books
                    })
                    // console.log(this.data.booksList);
            }

        }).catch(err => {
            console.log(err);
        });
    },
    //触底 limit + 10 返回重新加载
    newLimit(e) {
        this.data.limit = e.detail
        this.setData({
            limit: this.data.limit,
        })
    },
    //
    bindKeyInput: function(e) {
        this.setData({
            inputValue: e.detail.value
        })
    },
    //清除输入框的值 和 搜索出来的结果
    clearInput() {
        this.setData({
            keyWords: "",
            inputValue: "",
            booksList: [],
        })
    },
    //触发换一换效果  更换热门搜索
    change() {
        //点击换一换  调用Math.random()生成(0-1)的数  不包括0和1
        let oneNum = Math.floor(Math.random() * 7)
        let twoNum = Math.floor(Math.random() * 7)
        if (oneNum > twoNum) {
            this.setData({
                hotWords: this.data.hotWordsCopy.slice(twoNum, oneNum)
            })
        } else if (oneNum < twoNum) {
            this.setData({
                hotWords: this.data.hotWordsCopy.slice(oneNum, twoNum)
            })
        } else if (oneNum === twoNum) {
            let oneNum = Math.floor(Math.random() * 7)
            let twoNum = Math.floor(Math.random() * 7)
            if (oneNum > twoNum) {
                this.setData({
                    hotWords: this.data.hotWordsCopy.slice(twoNum, oneNum)
                })
            } else if (oneNum < twoNum) {
                this.setData({
                    hotWords: this.data.hotWordsCopy.slice(oneNum, twoNum)
                })
            }
        }

    },
    //点击热门搜索  或  历史搜索
    clickItem(e) {
        // console.log(e);
        let item = e.currentTarget.dataset.item
        this.setData({
            inputValue: item
        })
        this.getBooks();
        this.saveHistory();
    },
    //清空 所有 历史记录
    delete() {
        wx.showModal({
            title: '删除',
            content: '清空所有历史搜索纪录',
            showCancel: true,
            cancelText: '取消',
            cancelColor: '#000000',
            confirmText: '确定',
            confirmColor: '#3CC51F',
            success: (result) => {
                if (result.confirm) {
                    wx.removeStorageSync("searchWords")
                    this.setData({
                        historyList: [],
                    })
                }
            },
        });

    },
    //触发搜索
    onSearch(e) {
        this.setData({
            keyWords: e.detail.value
        })
        this.getBooks();
        this.saveHistory();
        // console.log(e.detail.value);
    },
    //保存历史纪录
    saveHistory() {
        if ((this.data.keyWords.trim() !== '' || this.data.inputValue.trim() !== '') && (this.data.keyWords.trim() !== null || this.data.inputValue.trim() !== null)) {
            if (!wx.getStorageSync('searchWords')) {
                let arr = [];
                arr.push((this.data.keyWords.trim() || this.data.inputValue.trim()));
                wx.setStorageSync('searchWords', JSON.stringify(arr));
                this.updateHistory();
            } else if (wx.getStorageSync('searchWords')) {
                let historyArr = JSON.parse(wx.getStorageSync('searchWords'));
                if (!historyArr.some(item => item === (this.data.keyWords.trim() || this.data.inputValue.trim()))) {
                    let histories = JSON.parse(wx.getStorageSync('searchWords'));
                    histories.unshift((this.data.keyWords.trim() || this.data.inputValue.trim()));
                    wx.setStorageSync('searchWords', JSON.stringify(histories));
                    this.updateHistory();
                }
            }
        }
    },
    //更新搜索历史
    updateHistory() {
        this.data.historyList = JSON.parse(wx.getStorageSync('searchWords'))
        this.setData({
            historyList: this.data.historyList
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        wx.showLoading({
            title: '加载中...',
        });
        this.getHotWord();
        if (wx.getStorageSync('searchWords')) {
            this.updateHistory()
        }
        // console.log(this.data.historyList.length);
        // this.compData = this.selectComponent("#bookRack")
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
        //触底调用bookRack组件的add方法将 limit + 10 重新获取数据 
        this.selectComponent("#bookRack").add();
        setTimeout(() => {
            this.getBooks()
        }, 200);

        // console.log("我到底了");

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})