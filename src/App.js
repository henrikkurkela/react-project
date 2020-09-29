import React, { useEffect } from 'react'
import { Grid, Header, Divider, Container } from 'semantic-ui-react'
import RenderNews from './RenderNews'
import Login from './Login'
import Logout from './Logout'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import RenderAds from './RenderAds'
import getAllNews from './services/newsService'
import getAllAds from './services/adsService'
import getAllComments from './services/commentsService'
import { addNews, addAd, addComment } from './actions'
import { useSelector } from 'react-redux'

const App = () => {

	const auth = useSelector(state => state.auth)

	useEffect(() => {
		getAllNews().then(response => {
			const news = response.data
			news.map(item => addNews(item))
		})

		getAllAds().then(response => {
			const ads = response.data
			ads.map(item => addAd(item))
		})

		getAllComments().then(response => {
			const comments = response.data
			comments.map(item => addComment(item))
		})
	}, [])

	let categories = ['All News', 'Domestic', 'Foreign']

	return (
		<Container style={{ backgroundColor: 'white' }}>
			<Grid columns='equal'>
				<Grid.Column>
					<Grid.Row style={{ backgroundColor: 'blue' }}>
						<Header as='h1' style={{ textAlign: 'center', color: 'white', padding: '1.5em' }}>News Site</Header>
					</Grid.Row>
					<Router>
						<Grid.Row style={{ backgroundColor: 'blue' }}>
							{categories.map((category, index) => <Link key={index} to={`/${index}`} style={{ display: 'inline-block', padding: '1em', backgroundColor: 'blue', color: 'white' }}>{category}</Link>)}
							{
								auth ?
									<Link to="/logout" style={{ float: 'right', display: 'inline-block', padding: '1em', backgroundColor: 'blue', color: 'white' }}>Logout</Link> :
									<Link to="/login" style={{ float: 'right', display: 'inline-block', padding: '1em', backgroundColor: 'blue', color: 'white' }}>Login</Link>
							}
						</Grid.Row>
						<Grid.Row style={{ padding: '1rem' }}>
							<Divider />
							<RenderAds />
							<Switch>
								<Route path="/login">
									<Login />
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
