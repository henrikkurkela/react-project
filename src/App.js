import React, { useEffect } from 'react'
import { Grid, Header, Divider, Container } from 'semantic-ui-react'
import RenderNews from './RenderNews'
import ConnectedLogin from './Login'
import Signup from './Signup'
import Logout from './Logout'
import ConnectedAccount from './Account'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import RenderAds from './RenderAds'
import { getRequest } from './services/httpService'
import { addNews, addAd, addComment } from './actions'
import { useSelector } from 'react-redux'

const App = () => {

	const auth = useSelector(state => state.auth)

	useEffect(() => {
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
	}, [])

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
								<Route path="/account">
									<ConnectedAccount />
								</Route>
								<Route path="/login">
									<ConnectedLogin />
								</Route>
								<Route path="/signup">
									<Signup />
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
