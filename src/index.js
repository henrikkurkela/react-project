import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'
import 'semantic-ui-css/semantic.min.css'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import newsReducer from './reducers/newsReducer'
import axios from 'axios'

const store = createStore(newsReducer)


axios
	.get('http://localhost:3001/news')
	.then(response => {
		const items = response.data
		items.map(item => store.dispatch({
			type: "NEW_ITEM",
			data: {
				id: parseInt(item.id),
				headline: item.headline,
				content: item.content
			}
		})
		)
		console.log(store.getState())
	})


ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
