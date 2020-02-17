// pages/reading/reading.js
import api from "../../http/api";
import create from '../../utils/store/create'
import store from '../../store/index'

var WxParse = require('../../wxParse/wxParse.js');


create.Page(store, {
    use: ['chapterNum', 'title'],
    /**
     * 页面的初始数据
     */
    data: {
        title: '',
        id: '',
        isShowDir: false,
        isShowSet: false,
        isChange: false,
        directoryList: [],
        firstDirectory: {},
        article: '',
        num: 0,
        fontSize: 4,
        bgColor: 0,
        changeBg: ["", "", "", "", ""]
    },
    //获取目录
    getBookChaptersBookId() {
        // console.log(this.data.id);
        api.bookChaptersBookId(this.data.id).then(res => {
            if (res.ok) {
                this.setData({
                        directoryList: res.mixToc.chapters,
                        firstDirectory: res.mixToc.chapters[this.data.num]
                    })
                    // console.log(this.data.num);
                    // console.log(this.data.firstDirectory);
                this.getChapterContent()
            }
        }).catch(err => {
            console.log(err);
        });
    },
    showDirectory(e) {
        this.data.isShowDir = e.detail
        this.setData({
            isShowDir: this.data.isShowDir,
        })
    },
    // 获取章节内容
    getChapterContent() {
        // console.log(this.data.firstDirectory.link);
        api.chapterContent(this.data.firstDirectory.link).then(res => {
            if (res.ok) {
                this.setData({
                        article: res.chapter.body
                    })
                    // console.log(this.data.article);
                wx.hideLoading();
                this.textParsing()
            }
        }).catch(err => {
            wx.hideLoading();
            console.log(err);
        });
    },
    //文本解析
    textParsing() {
        let article = this.data.article;
        let that = this;
        WxParse.wxParse('article', 'md', article, that, 5);
    },
    //打开设置
    set() {
        this.setData({
            isShowSet: true,
        })
    },
    //关闭设置
    closeSet() {
        this.setData({
            isShowSet: false,
            isChange: false
        })
    },
    //上一章
    up() {
        if (this.data.num === 0) {
            wx.showToast({
                title: '主人上不去啦，已经是第一章了啦~',
                icon: 'none',
                duration: 1000 //持续的时间
            })
        } else if (this.data.num > 0) {
            // console.log(this.data.num);
            this.data.num--
                this.setData({
                    num: this.data.num
                })
            wx.showLoading({
                title: '加载中...',
            });
            this.getBookChaptersBookId()
        }
    },
    //下一章
    down() {
        if (this.data.num === this.data.directoryList.length - 1) {
            wx.showToast({
                title: '主人不能再下了，已经没有啦~',
                icon: 'none',
                duration: 1000 //持续的时间
            })
        } else if (this.data.num < this.data.directoryList.length - 1) {
            // console.log(this.data.num);
            this.data.num++
                this.setData({
                    num: this.data.num
                })
            wx.showLoading({
                title: '加载中...',
            });
            this.getBookChaptersBookId()
        }
    },
    //字体减小
    subtract() {
        if (this.data.fontSize === 0) {
            wx.showToast({
                title: '主人字体不能再小啦！',
                icon: 'none',
                duration: 1000 //持续的时间
            })
        } else {
            this.data.fontSize -= 1
            this.setData({
                fontSize: this.data.fontSize
            })
        }
    },
    //字体增大
    add() {
        if (this.data.fontSize === 8) {
            wx.showToast({
                title: '主人字体不能再大啦！',
                icon: 'none',
                duration: 1000 //持续的时间
            })
        } else {
            this.data.fontSize += 1
            this.setData({
                fontSize: this.data.fontSize
            })
        }
    },
    // 更换背景
    changeBg() {
        this.setData({
            isChange: true
        })
    },
    closeChangeBg() {
        this.setData({
            isChange: false
        })
    },
    changeItem(e) {
        let index = e.currentTarget.dataset.index;
        this.setData({
            bgColor: index
        })
    },
    //展示目录
    showDirectory() {
        this.setData({
            isShowDir: true
        })
    },
    showDirectory(e) {
        this.data.isShowDir = e.detail
        this.setData({
            isShowDir: this.data.isShowDir,
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        wx.showLoading({
            title: '加载中...',
        });
        // console.log(options);
        // let id = options.id
        wx.setNavigationBarTitle({
            title: options.title,
        });
        this.setData({
            title: options.title,
            id: options.id
        })
        if (options.chapterNum) {
            this.setData({
                num: options.chapterNum
            })
        }
        this.getBookChaptersBookId()
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
        if (this.data.num > 0) {
            this.store.data.chapterNum = parseInt(this.data.num) + 1;
            this.store.data.title = this.data.title;
            // console.log(this.store.data.chapterNum);
        }
        // this.store.data.title = this.data.title

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