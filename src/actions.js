import store from './reducers'

const updateNews = (news) => {
    store.dispatch({
        type: "UPDATE_NEWS",
        data : {
            id: parseInt(news.id),
            headline: news.headline,
            content: news.content,
            picture: news.picture,
            likes: news.likes,
            category: parseInt(news.category)
        }
    })
}

const addNews = (news) => {
    store.dispatch({
        type: "NEW_NEWS",
        data: {
            id: parseInt(news.id),
            headline: news.headline,
            content: news.content,
            picture: news.picture,
            likes: news.likes,
            category: parseInt(news.category)
        }
    })
}

const addAd = (item) => {
    store.dispatch({
        type: "NEW_AD",
        data: {
            id: parseInt(item.id),
            picture: item.picture,
            href: item.href
        }
    })
}

const addComment = (comment) => {
    store.dispatch({
        type: "NEW_COMMENT",
        data: {
            id: parseInt(comment.id),
            newsid: parseInt(comment.newsid),
            content: comment.content
        }
    })
}

export { updateNews, addNews, addAd, addComment }
