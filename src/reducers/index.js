import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import newsReducer from './newsReducer'
import adsReducer from './adsReducer'
import commentsReducer from './commentsReducer'

const reducer = combineReducers({
	news: newsReducer,
	ads: adsReducer,
	comments: commentsReducer
})

const store = createStore(reducer, composeWithDevTools())

export default store
