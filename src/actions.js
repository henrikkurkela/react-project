import axios from 'axios'

import store from './reducers'

const updateNews = (news) => {
    store.dispatch({
        type: "UPDATE_NEWS",
        data: {
            id: Number(news.id),
            headline: news.headline,
            content: news.content,
            picture: news.picture,
            likes: news.likes,
            category: Number(news.category)
        }
    })
}

const addNews = (news) => {
    store.dispatch({
        type: "NEW_NEWS",
        data: {
            id: Number(news.id),
            headline: news.headline,
            content: news.content,
            picture: news.picture,
            caption: news.caption,
            likes: Number(news.likes),
            category: Number(news.category),
            author: Number(news.author),
            time: Date(news.time).toString()
        }
    })
}

const removeNews = (news) => {
    store.dispatch({
        type: "REMOVE_NEWS",
        data: news
    })
}

const addAd = (item) => {
    store.dispatch({
        type: "NEW_AD",
        data: {
            id: Number(item.id),
            picture: item.picture,
            href: item.href
        }
    })
}

const addComment = (comment) => {
    store.dispatch({
        type: "NEW_COMMENT",
        data: {
            id: Number(comment.id),
            newsid: Number(comment.newsid),
            userid: comment.userid,
            content: comment.content
        }
    })
}

const removeComment = (comment) => {
    store.dispatch({
        type: "REMOVE_COMMENT",
        data: comment
    })
}

const updateMarket = (market) => {
    store.dispatch({
        type: "NEW_MARKET",
        data: market
    })
}

const addUser = (user) => {
    store.dispatch({
        type: "NEW_USER",
        data: user
    })
}

const updateUser = (user) => {
    store.dispatch({
        type: 'UPDATE_USER',
        data: user
    })
}

const updateToken = (auth) => {
    store.dispatch({
        type: "UPDATE_AUTH",
        data: auth
    })
}

const loginToken = (auth) => {
    store.dispatch({
        type: "LOGIN",
        data: auth
    })

    axios.defaults.headers['Authorization'] = `Bearer ${auth.auth}`
}

const logoutToken = () => {
    store.dispatch({
        type: "LOGOUT"
    })

    axios.defaults.headers['Authorization'] = null
}

const resetContent = () => {
    store.dispatch({
        type: "RESET"
    })
}

export { updateNews, addNews, removeNews, addAd, addComment, updateMarket, updateToken, loginToken, logoutToken, removeComment, addUser, updateUser, resetContent }
