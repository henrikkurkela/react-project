import React from 'react'
import { Grid, Header, Divider, Container } from 'semantic-ui-react'
import RenderNews from './RenderNews'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

const App = () => {

	let categories = ['All News', 'Domestic', 'Foreign']

	return (
		<Container>
			<Grid columns='equal' padded>
				<Grid.Column>
					<Grid.Row style={{ backgroundColor: 'blue' }}>
						<Header as='h1' style={{ textAlign: 'center', color: 'white' }}>News Site</Header>
					</Grid.Row>
					<Router>
						<Grid.Row style={{ backgroundColor: 'blue' }}>
							{categories.map((category, index) => <Link key={index} to={`/${index}`} style={{ backgroundColor: 'blue', color: 'white' }}>{category}</Link>)}
						</Grid.Row>
						<Switch>
							<Route path="/:category/:story">
								<Grid.Row>
									<Divider />
									<RenderNews />
								</Grid.Row>
							</Route>
							<Route path="/:category">
								<Grid.Row>
									<Divider />
									<RenderNews />
								</Grid.Row>
							</Route>
							<Route path="/">
								<Grid.Row>
									<Divider />
									<RenderNews />
								</Grid.Row>
							</Route>
						</Switch>
					</Router>
				</Grid.Column>
			</Grid>
		</Container>
	)
}

export default App
