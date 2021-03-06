import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from 'serviceWorker'
import 'semantic-ui-css/semantic.min.css'
import { Provider } from 'react-redux'

import store from 'reducers'

import App from 'App'

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
)

document.body.style.background = 'linear-gradient(0deg, rgba(0,0,255,1) 0%, rgba(0,0,255,1) 50%, rgba(0,255,255,1) 100%) no-repeat fixed'
document.body.style.overflowY = 'scroll'

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
