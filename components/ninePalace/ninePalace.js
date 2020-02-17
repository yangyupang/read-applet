// components/ninePalace/ninePalace.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        List: {
            type: Array,
            value: []
        },
        title: {
            type: String,
            value: ""
        }
    },

    options: {
        addGlobalClass: true
    },
    /**
     * 组件的初始数据
     */
    data: {
        // itemName: ''
    },

    /**
     * 组件的方法列表
     */
    methods: {
        chooseItem(e) {
            // console.log(e);
            let item = e.currentTarget.dataset.item;
            let titles = e.currentTarget.dataset.title
            wx.navigateTo({
                url: `/pages/classification/classification?major=${item.name}&gender=${titles}`,
            });
        },
    }
})