// pages/details/details.js
import api from "../../http/api";
import create from '../../utils/store/create'
import store from '../../store/index'
create.Page(store, {
    use: ['chapterNum'],
    /**
     * 页面的初始数据
     */
    data: {
        bookInfo: {},
        recommendedBooks: [],
        showBooks: [],
        statics: 'https://statics.zhuishushenqi.com',
        limit: 10,
        // rating: 0,
        haveStars: '',
        noStars: '',
        list: ["详情", "评价"],
        //拼接上评论个数
        newList: [],
        activeIndex: 0,
        //短评
        shortReviews: [],
        reviewsTotal: 0,
        display: '',
        displaies: '',
        isShow: false,
        isShowDir: false,
        id: '',
        // 目录
        directoryList: [],
        joinObj: {
            cover: "",
            title: "",
            chapter: 1,
        },
        isCollection: false,
        bookTitle: ''
    },
    // 书籍详情
    getBookInfo(id) {
        api.bookInfo(id).then(res => {
            this.setData({
                bookInfo: res,
                bookTitle: res.title,
                haveStars: Math.round(parseInt(res.rating.score) / 2),
                noStars: 5 - Math.round(parseInt(res.rating.score) / 2)
            })
            this.judgeCollection()
                // console.log(this.data.bookInfo);
                // console.log(this.data.haveStars);
                // console.log(this.data.noStars);
        }).catch(err => {
            console.log(err);
        });
    },
    // 相关推荐
    getRelatedRecommendedBooks(id) {
        api.relatedRecommendedBooks(id).then(res => {
            if (res.ok) {
                this.setData({
                        recommendedBooks: res.books,
                        showBooks: res.books.slice(0, 3)
                    })
                    // console.log(this.data.recommendedBooks);
                    // console.log(this.data.showBooks);
            }
        }).catch(err => {
            console.log(err);
        });
    },
    //相关评论
    getShortReviews(id) {
        api.shortReviews(id, this.data.limit).then(res => {
            if (res.ok) {
                let newArr = this.data.list.map(item => {
                    if (item === '评价') {
                        item = item + '(' + res.total + ')'
                    }
                    return item
                })
                this.setData({
                    reviewsTotal: res.total,
                    shortReviews: res.docs,
                    newList: newArr
                })

                // console.log(res.docs);
                // console.log(this.data.newList);
            }
        }).catch((err) => {
            console.log(err);
        });
    },
    //获取目录
    getBookChaptersBookId(id) {
        api.bookChaptersBookId(id).then(res => {
            if (res.ok) {
                this.setData({
                        directoryList: res.mixToc.chapters
                    })
                    // console.log(res.mixToc.chapters);
            }
        }).catch(err => {
            console.log(err);
        });
    },
    chooseItem(e) {
        let index = e.currentTarget.dataset.index;
        this.setData({
            activeIndex: index
        })
    },
    //换书
    changeBooks() {
        for (let i = 0; i < 3; i++) {
            let num = parseInt(Math.random() * this.data.recommendedBooks.length - 1)
            let flag = true
            this.data.showBooks.map(item => {
                if (item === this.data.recommendedBooks[num]) {
                    flag = false
                }
            })
            if (flag) {
                this.data.showBooks.push(this.data.recommendedBooks[num])
            } else {
                i--
            }
        }
        this.setData({
                showBooks: this.data.showBooks.slice(3, 6)
            })
            // console.log(this.data.showBooks);
    },
    goTo(e) {
        let item = e.currentTarget.dataset.item
            // console.log(item._id);
            // this.setData({
            //   inputValue: item
            // })
        wx.navigateTo({
            url: `../../pages/details/details?id=${item._id}`,
        });
    },
    showView: function() {
        this.setData({
            display: "block",
            isShow: true
        })
    },
    hideView: function() {
        this.setData({
            display: "none",
            isShow: false
        })
    },
    //显示图片保存的两个键
    isSave() {
        this.setData({
            displaies: "block"
        })
    },
    //取消保存
    cancel() {
        this.setData({
            displaies: "none"
        })
    },
    //保存图片
    determine() {
        let imgSrc = this.data.statics + this.data.bookInfo.cover
        wx.downloadFile({
            url: imgSrc,
            success: function(res) {
                // console.log(res);
                //图片保存到本地
                wx.saveImageToPhotosAlbum({
                    filePath: res.tempFilePath,
                    success: function(data) {
                        // console.log(data);
                    },
                    fail: function(err) {
                        console.log(err);
                        if (err.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
                            console.log("用户一开始拒绝了，我们想再次发起授权")
                            console.log('打开设置窗口')
                            wx.openSetting({
                                success(settingdata) {
                                    console.log(settingdata)
                                    if (settingdata.authSetting['scope.writePhotosAlbum']) {
                                        console.log('获取权限成功，给出再次点击图片保存到相册的提示。')
                                    } else {
                                        console.log('获取权限失败，给出不给权限就无法正常使用的提示')
                                    }
                                }
                            })
                        }
                    }
                })
            }
        })

    },
    //阅读
    reading() {
        wx.navigateTo({
            url: `../../pages/reading/reading?id=${this.data.id}&title=${this.data.bookInfo.title}`,
        });
    },
    join() {
        if (this.store.data.chapterNum === 1) {
            this.data.joinObj = {
                cover: this.data.bookInfo.cover,
                title: this.data.bookInfo.title,
                chapter: 1,
                _id: this.data.id
            }
            this.setData({
                joinObj: this.data.joinObj

            })
            if (!wx.getStorageSync('bookrack')) {
                let arr = [];
                arr.push(this.data.joinObj);
                wx.setStorageSync('bookrack', JSON.stringify(arr));
            } else if (wx.getStorageSync('bookrack')) {
                let historyArr = JSON.parse(wx.getStorageSync('bookrack'));
                if (!historyArr.some(item => item.title === this.data.joinObj.title)) {
                    let histories = JSON.parse(wx.getStorageSync('bookrack'));
                    histories.unshift(this.data.joinObj);
                    wx.setStorageSync('bookrack', JSON.stringify(histories));
                }
            }
            this.setData({
                isCollection: true
            })
        } else {
            this.data.joinObj = {
                cover: this.data.bookInfo.cover,
                title: this.data.bookInfo.title,
                chapter: this.store.data.chapterNum,
                _id: this.data.id
            }
            this.setData({
                joinObj: this.data.joinObj

            })
            if (!wx.getStorageSync('bookrack')) {
                let arr = [];
                arr.push(this.data.joinObj);
                wx.setStorageSync('bookrack', JSON.stringify(arr));
            } else if (wx.getStorageSync('bookrack')) {
                let historyArr = JSON.parse(wx.getStorageSync('bookrack'));
                if (!historyArr.some(item => item.title === this.data.joinObj.title)) {
                    let histories = JSON.parse(wx.getStorageSync('bookrack'));
                    histories.unshift(this.data.joinObj);
                    wx.setStorageSync('bookrack', JSON.stringify(histories));
                }
            }
            this.setData({
                isCollection: true
            })
        }

    },
    remove() {
        if (this.data.isCollection) {
            let arr = JSON.parse(wx.getStorageSync('bookrack'));
            let newArr = arr.filter(item => {
                return item.title !== this.data.bookInfo.title
            })
            wx.removeStorageSync("bookrack")
            wx.setStorageSync('bookrack', JSON.stringify(newArr));
        }
        this.setData({
            isCollection: false
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
    //判断是否收藏
    judgeCollection() {
        if (wx.getStorageSync('bookrack')) {
            let arr = JSON.parse(wx.getStorageSync('bookrack'));
            arr.map(item => {
                if (item.title === this.data.bookInfo.title) {
                    this.setData({
                        isCollection: true
                    })
                }
            })
        }

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let id = options.id
        this.getBookInfo(id)
        this.getRelatedRecommendedBooks(id)
        this.getShortReviews(id)
        this.getBookChaptersBookId(id)
        this.setData({
            id: id
        })

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
        this.data.limit += 10
        this.setData({
            limit: this.data.limit
        })
        this.getShortReviews(this.data.id)
            // console.log('我触底了');
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})