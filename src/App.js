import React, { useState } from 'react'
import { Grid, Header, Divider, Container, Button } from 'semantic-ui-react'
import { useSelector } from 'react-redux'

const NewsItem = ({ headline, content }) => {

	const paragraphs = content.split('<br/>')

	return (
		<div style={{ cursor: 'pointer' }}>
			<Header as='h3'>{headline}</Header>
			{paragraphs.map((paragraph, key) => <p style={{ textAlign: 'justify', textJustify: 'inter-word' }}>{paragraph}</p>)}
			<Divider />
		</div>)
}

const App = () => {

	const news = useSelector(state => state)
	let [category, setCategory] = useState(0)
	let categories = ['All News', 'Domestic', 'Foreign']

	const renderNews = () => {
		switch (category) {
			case 0:
				return (<>
					{news.map(item => <NewsItem key={item.id} headline={item.headline} content={item.content} />)}
				</>
				)
			default:
				return (<>
					{news.filter(item => item.category === category).map(item => <NewsItem key={item.id} headline={item.headline} content={item.content} />)}
				</>
				)
		}

	}

	return (
		<Container>
			<Grid columns='equal' padded>
				<Grid.Column>
					<Grid.Row style={{ backgroundColor: 'blue' }}>
						<Header as='h1' style={{ textAlign: 'center', color: 'white' }}>News Site</Header>
					</Grid.Row>
					<Grid.Row style={{ background: 'blue' }}>
						{categories.map((category, index) => <Button onClick={() => setCategory(index)}>{category}</Button>)}
					</Grid.Row>
					<Grid.Row>
						<Divider />
						{renderNews()}
					</Grid.Row>
				</Grid.Column>
			</Grid>
		</Container>
	)
}

export default App