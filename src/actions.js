import store from './reducers'
import axios from 'axios'

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

const addUser = (user) => {
    store.dispatch({
        type: "NEW_USER",
        data: user
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

    window.sessionStorage.removeItem('auth')
    axios.defaults.headers['Authorization'] = null
}

const resetContent = () => {
    store.dispatch({
        type: "RESET_KEEP_AUTH"
    })
}

export { updateNews, addNews, addAd, addComment, loginToken, logoutToken, removeComment, addUser, resetContent }
