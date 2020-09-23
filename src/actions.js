import store from './reducers'

const likeNews = (news, like = true) => {
    store.dispatch({
        type: "LIKE_NEWS",
        data: {
            id: news.id,
            like: like
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

export { likeNews, addNews, addAd }
