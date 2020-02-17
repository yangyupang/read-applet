// pages/classification/classification.js
import api from "../../http/api";
Page({

    /**
     * 页面的初始数据
     */
    data: {
        typeList: api.typeList,
        //性别选项  接口的  gender
        gender: '',
        //大类  接口的  major值
        major: '',
        minor: '',
        limit: 10,
        activeIndex: 0,
        //接口的 type 值
        typeName: "hot",
        //男生所有小分类
        maleSmallClassify: [],
        //女生所有小分类
        femaleSmallClassify: [],
        //点击跳转后获取的(男生 女生 )的真正小分类
        CorrectList: [],
        CorrectListIndex: 0,
        //用于展示的数据
        booksList: [],

    },
    //大类选择
    typeItem(e) {
        let {
            item,
            index
        } = e.currentTarget.dataset
        this.setData({
                activeIndex: index,
                typeName: item.id
            })
            // console.log(item.id);
        this.getCatsBooks()
    },
    //小类选择
    CorrectListItem(e) {
        let {
            item,
            index
        } = e.currentTarget.dataset
        this.setData({
            CorrectListIndex: index,
            minor: item
        })
        this.getCatsBooks()
    },
    //小类获取
    getSmallClassify() {
        api.getSmallClassify().then(res => {
            if (res.ok) {
                this.setData({
                    maleSmallClassify: res.male,
                    femaleSmallClassify: res.female
                })
                this.getCorrectClassify()
                    // console.log(this.data.maleSmallClassify);
                    // console.log(this.data.femaleSmallClassify);
            }
        }).catch(err => {
            console.log(err);
        });
    },
    //小类获取后操作选出对应小类
    getCorrectClassify() {
        if (this.data.gender === 'male') {
            // console.log(this.data.maleSmallClassify);
            this.data.CorrectList = this.data.maleSmallClassify.filter(item => {
                if (item.major === this.data.major) {
                    return item
                }
            })
            let newArr = this.data.CorrectList[0].mins;
            newArr.unshift("全部")
            this.setData({
                    CorrectList: newArr
                })
                // console.log(this.data.CorrectList);
                // console.log("男生");
        } else if (this.data.gender === 'female') {
            console.log("女生");
        } else if (this.data.gender === 'press') {
            console.log("出版");
        }
    },
    //书籍信息
    getCatsBooks() {
        if (this.data.minor === '' || this.data.minor === '全部') {
            api.getCatsBooks(this.data.gender, this.data.typeName, this.data.major, this.data.limit).then(res => {
                if (res.ok) {
                    this.setData({
                        booksList: res.books
                    })
                    wx.hideLoading();
                }
                // console.log(this.data.booksList);
            }).catch(err => {
                console.log(err);
            });
        } else {
            api.getCatsBooks(this.data.gender, this.data.typeName, this.data.major, this.data.limit, this.data.minor).then(res => {
                if (res.ok) {
                    this.setData({
                        booksList: res.books
                    })
                    wx.hideLoading();
                }
                // console.log(this.data.booksList);
            }).catch(err => {
                wx.hideLoading();
                console.log(err);
            });
        }

    },
    //触底 limit + 10 返回重新加载
    newLimit(e) {
        this.data.limit = e.detail
        this.setData({
            limit: this.data.limit,
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        wx.showLoading({
            title: '加载中...',
        });
        let major = options.major
        let gender = options.gender
        wx.setNavigationBarTitle({
            title: major,
        });
        this.setData({
                gender: gender,
                major: major
            })
            // console.log(this.data.gender);
        this.getSmallClassify()
        this.getCatsBooks()
            // console.log(this.data.typeList);
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
        this.selectComponent("#bookRack").add();
        setTimeout(() => {
            this.getCatsBooks()
        }, 200);
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})