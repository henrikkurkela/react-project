import React, { useEffect, useState } from 'react'
import { Grid, Header, Container } from 'semantic-ui-react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { getRequest } from './services/httpService'
import { addNews, addAd, addComment, addUser, resetContent } from './actions'
import { categories } from './constants'

import ConnectedRenderNews from './RenderNews'
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

	return (
		<Container>
			<Grid columns='equal'>
				<Grid.Column>
					<Router>
						<Grid.Row>
							<Header as='h1' style={{ color: 'white', textAlign: 'center', paddingTop: '1.5em', margin: '0', fontSize: '3em' }}>News Site</Header>
							<p style={{ textAlign: 'center', color: 'white', fontSize: '1em' }}>The Best News in Town!</p>
							<Link to={'/'} style={{ display: 'inline-block', padding: '1em', color: 'white' }}>All News</Link>
							{categories.filter(item => item.key !== 0).map((item) => <Link key={item.key} to={`/${item.value}`} style={{ display: 'inline-block', padding: '1em', color: 'white' }}>{item.text}</Link>)}
							<Link to="/development" style={{ float: 'right', display: 'inline-block', padding: '1em', color: 'orange' }}>Development</Link>
							{
								auth ?
									<>
										<Link to="/logout" style={{ float: 'right', display: 'inline-block', padding: '1em', color: 'white' }}>Logout</Link>
										<Link to="/account" style={{ float: 'right', display: 'inline-block', padding: '1em', color: 'white' }}>Account</Link>
									</> :
									<Link to="/login" style={{ float: 'right', display: 'inline-block', padding: '1em', color: 'white' }}>Login</Link>
							}
						</Grid.Row>
						<Grid.Row style={{ backgroundColor: 'white', padding: '2em', borderRadius: '0.5em', overflow: 'auto' }}>
							<Grid>
								<Grid.Column width={12}>
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
											<ConnectedRenderNews />
										</Route>
										<Route path="/:category">
											<ConnectedRenderNews />
										</Route>
										<Route path="/">
											<ConnectedRenderNews />
										</Route>
									</Switch>
								</ Grid.Column>
								<Grid.Column width={4} style={{ borderLeft: 'solid 1px rgba(34,36,38,.15)' }}>
									<RenderAds />
								</ Grid.Column>
							</Grid>
						</Grid.Row>
					</Router>
				</Grid.Column>
			</Grid>
			<Grid.Row>
				<div style={{ padding: '2em' }}>
					<p style={{ textAlign: 'center', color: 'white', fontSize: '1em' }}>
						Copyright © 1970 News Site Company, LLC. All rights reserved.<br />
						Any questions? Contact us via <a style={{ textAlign: 'center', fontSize: '1em', color: 'orange' }} href="mailto: admin@localhost.com">email</a>.
					</p>
				</div>
			</Grid.Row>
		</Container>
	)
}

export default App
