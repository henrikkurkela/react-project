import React from 'react'
import { Grid, Header, Divider } from 'semantic-ui-react'
import { useSelector } from 'react-redux'

const NewsItem = ({ headline, content }) => {
	return (<div>
		<Header as='h3'>{headline}</Header>
		<p>{content}</p>
		<Divider />
	</div>)
}

const App = () => {

  	const news = useSelector(state => state)

	const renderNews = () => {
		return (<>
			{news.map(item => <NewsItem key={item.id} headline={item.headline} content={item.content} />)}
		</>
		)
	}

	return (
		<Grid columns='equal' padded>
			<Grid.Column />
			<Grid.Column width={8}>
				<Header as='h1' textAlign='center'>News Site</Header>
				{renderNews()}
			</Grid.Column>
			<Grid.Column />
		</Grid>
	)
}

export default App