import React, { useEffect, useState } from 'react'
import { Grid, Container } from 'semantic-ui-react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { getRequest } from 'services/http'
import { addNews, addAd, addComment, addUser, updateMarket, resetContent } from 'actions'

import SiteHeader from 'components/page/SiteHeader'
import RenderNews from 'components/RenderNews'
import Login from 'components/account/Login'
import Signup from 'components/account/Signup'
import Logout from 'components/account/Logout'
import Account from 'components/Account'
import Unregister from 'components/account/Unregister'
import User from 'components/account/User'
import RenderAds from 'components/RenderAds'
import Avatar from 'components/account/Avatar'
import Moderation from 'components/Moderation'
import About from 'components/page/About'
import SiteFooter from 'components/page/SiteFooter'

const App = () => {

	const [requestReset, setRequestReset] = useState(true)

	useEffect(() => {

		if (requestReset) {
			resetContent()

			getRequest('news').then(response => {
				const news = response.data
				news.map(item => addNews(item))
			})

			getRequest('ads').then(response => {
				const ads = response.data
				ads.map(item => addAd(item))
			})

			getRequest('comments').then(response => {
				const comments = response.data
				comments.map(item => addComment(item))
			})

			getRequest('users').then(response => {
				const users = response.data
				users.map(item => addUser(item))
			})

			getRequest('market').then(response => {
				const market = response.data
				updateMarket(market)
			})

			setRequestReset(false)
		}

	}, [requestReset])

	return (
		<BrowserRouter>
			<Container>
				<Grid columns='equal'>
					<Grid.Column>
						<Grid.Row>
							<SiteHeader />
						</Grid.Row>
						<Grid.Row style={{ backgroundColor: 'white', padding: '2em', borderRadius: '0.5em' }}>
							<Grid>
								<Grid.Column mobile={16} tablet={16} computer={12}>
									<Switch>
										<Route path='/moderation'>
											<Moderation requestReset={setRequestReset} />
										</Route>
										<Route path='/account'>
											<Account />
										</Route>
										<Route path='/avatar'>
											<Avatar />
										</Route>
										<Route path='/login'>
											<Login />
										</Route>
										<Route path='/signup'>
											<Signup />
										</Route>
										<Route path='/unregister'>
											<Unregister />
										</Route>
										<Route path='/logout'>
											<Logout />
										</Route>
										<Route path='/about'>
											<About />
										</Route>
										<Route path={['/users/:user', '/users']}>
											<User />
										</Route>
										<Route path={['/:category/:story', '/:category', '/']}>
											<RenderNews />
										</Route>
									</Switch>
								</Grid.Column>
								<Grid.Column only='computer' computer={4} style={{ borderLeft: 'solid 1px rgba(34,36,38,.15)' }}>
									<RenderAds />
								</Grid.Column>
							</Grid>
						</Grid.Row>
					</Grid.Column>
				</Grid>
				<Grid.Row>
					<SiteFooter />
				</Grid.Row>
			</Container>
		</BrowserRouter>
	)
}

export default App
