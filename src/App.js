import React from 'react'
import { Grid, Header, Divider, Container } from 'semantic-ui-react'
import RenderNews from './RenderNews'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import RenderAds from './RenderAds'

const App = () => {

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
						</Grid.Row>
						<Grid.Row style={{ padding: '1rem' }}>
							<Divider />
							<RenderAds />
							<Switch>
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
