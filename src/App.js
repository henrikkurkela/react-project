import React, { useEffect, useState } from 'react'
import { Grid, Header, Divider, Container } from 'semantic-ui-react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { getRequest } from './services/httpService'
import { addNews, addAd, addComment, addUser, resetContent } from './actions'

import RenderNews from './RenderNews'
import ConnectedLogin from './Login'
import Signup from './Signup'
import Logout from './Logout'
import ConnectedAccount from './Account'
import ConnectedUnregister from './Unregister'
import RenderAds from './RenderAds'
import ConnectedAvatar from './Avatar'
import Development from './Development'
import Moderation from './Moderation'

const App = () => {

	const auth = useSelector(state => state.auth)
	const [requestReset, setRequestReset] = useState(true)

	useEffect(() => {

		if (requestReset) {
			resetContent()

			getRequest("news").then(response => {
				const news = response.data
				news.map(item => addNews(item))
			})

			getRequest("ads").then(response => {
				const ads = response.data
				ads.map(item => addAd(item))
			})

			getRequest("comments").then(response => {
				const comments = response.data
				comments.map(item => addComment(item))
			})

			getRequest("users").then(response => {
				const users = response.data
				users.map(item => addUser(item))
			})

			setRequestReset(false)
		}

	}, [requestReset])

	let categories = ['All News', 'Domestic', 'Foreign']

	return (
		<Container style={{ backgroundColor: 'white' }}>
			<Grid columns='equal'>
				<Grid.Column>
					<Grid.Row style={{ background: 'blue' }}>
						<Header as='h1' style={{ textAlign: 'center', color: 'white', padding: '1.5em', fontFamily: 'stencil' }}>News Site</Header>
					</Grid.Row>
					<Router>
						<Grid.Row style={{ backgroundColor: 'blue' }}>
							{categories.map((category, index) => <Link key={index} to={`/${index}`} style={{ display: 'inline-block', padding: '1em', backgroundColor: 'blue', color: 'white' }}>{category}</Link>)}
							<Link to="/development" style={{ float: 'right', display: 'inline-block', padding: '1em', backgroundColor: 'blue', color: 'orange' }}>Development</Link>
							{
								auth ?
									<>
										<Link to="/logout" style={{ float: 'right', display: 'inline-block', padding: '1em', backgroundColor: 'blue', color: 'white' }}>Logout</Link>
										<Link to="/account" style={{ float: 'right', display: 'inline-block', padding: '1em', backgroundColor: 'blue', color: 'white' }}>Account</Link>
									</> :
									<Link to="/login" style={{ float: 'right', display: 'inline-block', padding: '1em', backgroundColor: 'blue', color: 'white' }}>Login</Link>
							}
						</Grid.Row>
						<Grid.Row style={{ padding: '1rem' }}>
							<Divider />
							<RenderAds />
							<Switch>
								<Route path="/development">
									<Development requestReset={setRequestReset} />
								</Route>
								<Route path="/moderation">
									<Moderation />
								</Route>
								<Route path="/account">
									<ConnectedAccount />
								</Route>
								<Route path="/avatar">
									<ConnectedAvatar />
								</Route>
								<Route path="/login">
									<ConnectedLogin />
								</Route>
								<Route path="/signup">
									<Signup />
								</Route>
								<Route path="/unregister">
									<ConnectedUnregister />
								</Route>
								<Route path="/logout">
									<Logout />
								</Route>
								<Route path="/:category/:story">
									<RenderNews />
								</Route>
								<Route path="/:category">
									<RenderNews />
								</Route>
								<Route path="/">
									<RenderNews />
								</Route>
							</Switch>
						</Grid.Row>
					</Router>
				</Grid.Column>
			</Grid>
		</Container>
	)
}

export default App
