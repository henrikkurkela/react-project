import React, { useEffect, useState } from 'react'
import { Grid, Container } from 'semantic-ui-react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { getRequest } from './services/httpService'
import { addNews, addAd, addComment, addUser, resetContent } from './actions'

import ConnectedSiteHeader from './SiteHeader'
import ConnectedRenderNews from './RenderNews'
import ConnectedLogin from './Login'
import Signup from './Signup'
import Logout from './Logout'
import ConnectedAccount from './Account'
import ConnectedUnregister from './Unregister'
import User from './User'
import RenderAds from './RenderAds'
import ConnectedAvatar from './Avatar'
import Development from './Development'
import Moderation from './Moderation'
import About from './About'
import SiteFooter from './SiteFooter'

const App = () => {

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
		<Router>
			<Container>
				<Grid columns='equal'>
					<Grid.Column>
						<Grid.Row>
							<ConnectedSiteHeader />
						</Grid.Row>
						<Grid.Row style={{ backgroundColor: 'white', padding: '2em', borderRadius: '0.5em' }}>
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
										<Route path="/about">
											<About />
										</Route>
										<Route path={["/users/:user", "/users"]}>
											<User />
										</Route>
										<Route path={["/:category/:story", "/:category", "/"]}>
											<ConnectedRenderNews />
										</Route>
									</Switch>
								</ Grid.Column>
								<Grid.Column width={4} style={{ borderLeft: 'solid 1px rgba(34,36,38,.15)' }}>
									<RenderAds />
								</ Grid.Column>
							</Grid>
						</Grid.Row>
					</Grid.Column>
				</Grid>
				<Grid.Row>
					<SiteFooter />
				</Grid.Row>
			</Container>
		</Router>
	)
}

export default App
