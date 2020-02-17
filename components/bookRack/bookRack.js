// components/bookRack/bookRack.js
Component({
    /**
     * 组件的属性列表
     */

    properties: {
        booksList: {
            type: Array,
            value: []
        },
        limit: {
            type: Number,
            value: 0
        }
    },

    options: {
        addGlobalClass: true
    },
    /**
     * 组件的初始数据
     */
    data: {
        statics: 'https://statics.zhuishushenqi.com',
    },

    /**
     * 组件的方法列表
     */
    methods: {
        clickItem(e) {

            let item = e.currentTarget.dataset.item
                // console.log(item._id);
                // this.setData({
                //   inputValue: item
                // })
            wx.navigateTo({
                url: `../../pages/details/details?id=${item._id}`,
            });
        },
        add() {
            this.properties.limit += 10
            this.setData({
                limit: this.properties.limit
            })
            this.triggerEvent('newLimit', this.properties.limit)
        }
    },

})