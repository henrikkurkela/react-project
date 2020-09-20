import React, { useState } from 'react'
import { Grid, Header, Divider, Container, Button, Modal, Image } from 'semantic-ui-react'
import { useSelector } from 'react-redux'

const NewsItem = ({ headline, content, picture=null, selected=false }) => {

	const paragraphs = content.split('<br/>')
	const [open, setOpen] = React.useState(selected)

	return (
		<div style={{ cursor: 'pointer' }}>

			<Modal
				closeIcon
				open={open}
				onClose={() => setOpen(false)}
				onOpen={() => setOpen(true)}
				trigger={
					<div>
						<Header as='h3'>{headline}</Header>
						{paragraphs.map((paragraph, key) => <p key={key} style={{ textAlign: 'justify', textJustify: 'inter-word' }}>{paragraph}</p>)}
						<Divider />
					</div>
				}
			>
				<Modal.Header>{headline}</Modal.Header>
				<Modal.Content>
					{picture ? <Image fluid bordered style={{marginBottom: '1.5rem'}} src={picture} /> : null}
					{paragraphs.map((paragraph, key) => <p key={key} style={{ textAlign: 'justify', textJustify: 'inter-word' }}>{paragraph}</p>)}
				</Modal.Content>
			</Modal>
		</div >)
}

const App = () => {

	const news = useSelector(state => state)
	let [category, setCategory] = useState(0)
	let categories = ['All News', 'Domestic', 'Foreign']

	const renderNews = () => {
		switch (category) {
			case 0:
				return (<>
					{news.map(item => <NewsItem key={item.id} headline={item.headline} picture={item.picture} content={item.content} />)}
				</>
				)
			default:
				return (<>
					{news.filter(item => item.category === category).map(item => <NewsItem key={item.id} headline={item.headline} picture={item.picture} content={item.content} />)}
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
					<Grid.Row style={{ backgroundColor: 'blue' }}>
						{categories.map((category, index) => <Button key={index} style={{ backgroundColor: 'blue', color: 'white' }} onClick={() => setCategory(index)}>{category}</Button>)}
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

/* Extra Exports for Testing Purposes */
export { NewsItem }
