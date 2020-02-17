// components/ranking/ranking.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        rankingList: {
            type: Array,
            value: []
        }
    },
    options: {
        addGlobalClass: true
    },
    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        chooseItem(e) {
            let item = e.currentTarget.dataset.item;
            // console.log(item.title);
            wx.navigateTo({
                url: `/pages/rank/rank?title=${item.title}&id=${item._id}`,
            });
        }
    }
})