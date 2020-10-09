import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import newsReducer from './newsReducer'
import adsReducer from './adsReducer'
import commentsReducer from './commentsReducer'
import authReducer from  './authReducer'
import usersReducer from './usersReducer'

const reducer = combineReducers({
	news: newsReducer,
	ads: adsReducer,
	comments: commentsReducer,
	users: usersReducer,
	auth: authReducer
})

const store = createStore(reducer, composeWithDevTools())

export default store
