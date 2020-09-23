import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'
import 'semantic-ui-css/semantic.min.css'
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import newsReducer from './reducers/newsReducer'
import getAllNews from './services/newsService'
import adsReducer from './reducers/adsReducer'
import getAllAds from './services/adsService'

/* Setup and fill news redux store */
const reducer = combineReducers({
	news: newsReducer,
	ads: adsReducer,
  })

const store = createStore(reducer, composeWithDevTools())

getAllNews().then(response => {
	const news = response.data
	news.map(item => store.dispatch({
		type: "NEW_NEWS",
		data: {
			id: parseInt(item.id),
			headline: item.headline,
			content: item.content,
			picture: item.picture,
			likes: item.likes,
			category: parseInt(item.category)
		}
	})
	)
})

getAllAds().then(response => {
	const ads = response.data
	ads.map(item => store.dispatch({
		type: "NEW_AD",
		data: {
			id: parseInt(item.id),
			picture: item.picture,
			href: item.href
		}
	}))
})

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);

document.body.style.backgroundColor = 'lightgray'
document.body.style.overflowY = 'scroll'

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
