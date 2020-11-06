import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import newsReducer from './newsReducer'
import adsReducer from './adsReducer'
import commentsReducer from './commentsReducer'
import authReducer from  './authReducer'
import usersReducer from './usersReducer'
import marketReducer from './marketReducer'

const reducer = combineReducers({
	news: newsReducer,
	ads: adsReducer,
	comments: commentsReducer,
	users: usersReducer,
	market: marketReducer,
	auth: authReducer
})

const store = createStore(reducer, composeWithDevTools())

export default store
