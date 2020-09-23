import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import newsReducer from './newsReducer'
import adsReducer from './adsReducer'

const reducer = combineReducers({
	news: newsReducer,
	ads: adsReducer,
})

const store = createStore(reducer, composeWithDevTools())

export default store
