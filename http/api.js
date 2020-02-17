import fly from './index'
export default ({
    "typeList": [{
            id: 'hot',
            name: '热门'
        },
        {
            id: 'new',
            name: '新书'
        },
        {
            id: 'reputation',
            name: '好评'
        },
        {
            id: 'over',
            name: '完结'
        },
        {
            id: 'monthly',
            name: 'VIP'
        }
    ],

    // 分类页数据

    // 大分类
    getBigClassify() {
        return fly.get('/cats/lv2/statistics')
    },
    // 小分类
    getSmallClassify() {
        return fly.get('/cats/lv2')
    },
    // 获取分类书籍  @param gender 性别排行（male）type 排行类型（hot）major 大类  start 分页开始 
    getCatsBooks(gender, type, major, limit, minor) {
        if (minor) {
            return fly.get(`/book/by-categories?gender=${gender}&type=${type}&major=${major}&start=0&limit=${limit}&minor=${minor}`)
        } else {
            return fly.get(`/book/by-categories?gender=${gender}&type=${type}&major=${major}&start=0&limit=${limit}`)
        }
    },

    // 书籍相关接口
    // @param book_id 书籍id
    // @param author 作者名

    // 书籍详情
    bookInfo(book_id) {
        return fly.get(`/book/${book_id}`)
    },
    // 相关推荐
    relatedRecommendedBooks(book_id) {
        return fly.get(`/book/${book_id}/recommend`)
    },
    // 作者名下的书籍
    authorBooks(author) {
        return fly.get(`/book/accurate-search?author=${author}`)
    },
    // 书源  注意：第一个优质书源为收费源
    bookSources(book_id) {
        return fly.get(`/atoc?view=summary&book=${book_id}`)
    },
    // 书籍章节 根据书源id
    // @param id 书源id
    bookChapters(id) {
        return fly.get(`/atoc/${id}?view=chapters`)
    },
    // 书籍章节 根据书book_id
    bookChaptersBookId(book_id) {
        return fly.get(`/mix-atoc/${book_id}?view=chapters`)
    },
    // 章节内容
    // @param link 章节link
    chapterContent(link) {
        return fly.get(`https://chapter2.zhuishushenqi.com/chapter/${encodeURIComponent(link)}`)
    },
    //搜索热词
    hotWord() {
        return fly.get('/book/hot-word')
    },
    // 书籍搜索 (分类，书名，作者名)
    //@param content 搜索内容
    bookSearch(content, pages, limit) {
        return fly.get(`/book/fuzzy-search?start=${pages}&limit=${limit}&v=1&query=${content}`)
    },

    // 排名相关接口

    // 排名分类
    rankCategory() {
        return fly.get('/ranking/gender')
    },
    // 排名详情
    //@param rank_id 分类ID
    rankInfo(rank_id) {
        return fly.get(`/ranking/${rank_id}`)
    },

    // 获取评论相关接口

    // 短评
    shortReviews(book_id, limit) {
        return fly.get(`/post/short-review?book=${book_id}&limit=${limit}&total=true&start=0&sortType=hottest`)
    },

    // 书单相关接口

    // 所有书单
    lists() {
        return fly.get('/book-list')
    },
    // 具体某一书单详情
    // @param id 书单id
    detail(id) {
        return fly.get(`/book-list/${id}`)
    }
})