//Page Object
import create from '../../utils/store/create'
import store from '../../store/index'
create.Page(store, {
    use: ['chapterNum', 'title'],
    data: {
        bookrackList: [],
        statics: 'https://statics.zhuishushenqi.com',
        isShow: false
    },
    //点击管理小说
    management() {
        this.setData({
            isShow: true
        })
    },
    complete() {
        this.setData({
            isShow: false
        })
    },
    //点击帮助
    helps() {
        wx.navigateTo({
            url: '/pages/help/help',
        });
    },
    goTo(e) {
        // console.log(e.currentTarget.dataset.item);
        if (e.currentTarget.dataset.item.chapter === 1) {
            wx.navigateTo({
                url: `../../pages/reading/reading?id=${e.currentTarget.dataset.item._id}&title=${e.currentTarget.dataset.item.title}`,
            });
        } else {
            wx.navigateTo({
                url: `../../pages/reading/reading?id=${e.currentTarget.dataset.item._id}&title=${e.currentTarget.dataset.item.title}&chapterNum=${e.currentTarget.dataset.item.chapter -1}`,
            });
        }

    },
    //点击刷新
    refresh() {
        wx.showLoading({
            title: '加载中...',
        });

        setTimeout(() => {
            wx.hideLoading()
        }, 500);
    },
    //删除书架的书
    delBookrack(e) {
        // console.log(e.currentTarget.dataset.title);
        wx.showModal({
            title: '删除',
            content: '主人确定要删除收藏吗？',
            showCancel: true,
            cancelText: '取消',
            cancelColor: '#000000',
            confirmText: '确定',
            confirmColor: '#3CC51F',
            success: (result) => {
                if (result.confirm) {
                    let arr = JSON.parse(wx.getStorageSync('bookrack'));
                    let newArr = arr.filter(item => {
                        return item.title !== e.currentTarget.dataset.title
                    })
                    wx.removeStorageSync("bookrack")
                    wx.setStorageSync('bookrack', JSON.stringify(newArr));
                    this.setData({
                            bookrackList: JSON.parse(wx.getStorageSync('bookrack'))
                        })
                        // console.log(this.data.bookrackList);
                }
            },
        });
    },
    //options(Object)
    onLoad: function(options) {
        // let arr = JSON.parse(wx.getStorageSync('bookrack'));
    },
    onReady: function() {

    },
    onShow: function() {
        if (wx.getStorageSync('bookrack')) {
            this.setData({
                    bookrackList: JSON.parse(wx.getStorageSync('bookrack'))
                })
                // console.log(this.data.bookrackList);
        }
        //看的过书
        if (this.store.data.title !== '') {
            // 取出Storage里面的所有书籍做比较
            let arr = JSON.parse(wx.getStorageSync('bookrack'));
            arr.map(item => {
                if (item.title === this.store.data.title) {
                    item.chapter = this.store.data.chapterNum
                }
            })
            wx.removeStorageSync("bookrack")
            wx.setStorageSync('bookrack', JSON.stringify(arr));
            this.setData({
                bookrackList: arr
            })
        }
    },
    onHide: function() {

    },
    onUnload: function() {

    },
    onPullDownRefresh: function() {

    },
    onReachBottom: function() {

    },
    onShareAppMessage: function() {

    },
    onPageScroll: function() {

    },
    //item(index,pagePath,text)
    onTabItemTap: function(item) {

    }
});