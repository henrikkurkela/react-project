import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import newsReducer from 'reducers/newsReducer'
import adsReducer from 'reducers/adsReducer'
import commentsReducer from 'reducers/commentsReducer'
import authReducer from  'reducers/authReducer'
import usersReducer from 'reducers/usersReducer'
import marketReducer from 'reducers/marketReducer'

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
