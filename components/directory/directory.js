// components/directory/directory.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        directoryList: {
            type: Array,
            value: []
        },
        sid: {
            type: String,
            value: []
        },
        title: {
            type: String,
            value: []
        }
    },
    /**
     * 组件的初始数据
     */
    data: {
        showDirectory: false
    },
    // options: {
    //     addGlobalClass: true
    // },
    /**
     * 组件的方法列表
     */
    methods: {
        pack() {
            this.triggerEvent('showDirectory', this.properties.showDirectory)
        },
        clickItem(e) {
            // let item = e.currentTarget.dataset.item
            // console.log(item.title);
            // let arr = item.title.split("")
            // let text = [];
            // let num = [];
            // for (let i = 0; i < arr.length; i++) {
            //     if (arr[i] === "0" || arr[i] === "1" || arr[i] === "2" || arr[i] === "3" || arr[i] === "4" || arr[i] === "5" || arr[i] === "6" || arr[i] === "7" || arr[i] === "8" || arr[i] === "9" || arr[i] === "零" || arr[i] === "一" || arr[i] === "二" || arr[i] === "三" || arr[i] === "四" || arr[i] === "五" || arr[i] === "六" || arr[i] === "七" || arr[i] === "八" || arr[i] === '九') {
            //         if (arr[i] === "零" || arr[i] === "一" || arr[i] === "二" || arr[i] === "三" || arr[i] === "四" || arr[i] === "五" || arr[i] === "六" || arr[i] === "七" || arr[i] === "八" || arr[i] === '九') {
            //             if (arr[i] === "零") {
            //                 num.push("0")
            //             }
            //             if (arr[i] === "一") {
            //                 num.push("1")
            //             }
            //             if (arr[i] === "二") {
            //                 num.push("2")
            //             }
            //             if (arr[i] === "三") {
            //                 num.push("3")
            //             }
            //             if (arr[i] === "四") {
            //                 num.push("4")
            //             }
            //             if (arr[i] === "五") {
            //                 num.push("5")
            //             }
            //             if (arr[i] === "六") {
            //                 num.push("6")
            //             }
            //             if (arr[i] === "七") {
            //                 num.push("7")
            //             }
            //             if (arr[i] === "八") {
            //                 num.push("8")
            //             }
            //             if (arr[i] === "九") {
            //                 num.push("9")
            //             }
            //         } else {
            //             num.push(arr[i]);
            //         }
            //     } else {
            //         text.push(arr[i])
            //     }
            // }
            // let Num = num.join("");
            // console.log(Num);
            let index = e.currentTarget.dataset.index
            wx.redirectTo({
                url: `../../pages/reading/reading?id=${this.properties.sid}&title=${this.properties.title}&chapterNum=${index}`,
            });
            this.triggerEvent('showDirectory', this.properties.showDirectory)
        }
    }
})