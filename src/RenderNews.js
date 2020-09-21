import React from 'react'
import { Header, Divider, Modal, Image } from 'semantic-ui-react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const NewsItem = ({ headline, content, picture = null, selected = false }) => {

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
					{picture ? <Image fluid bordered style={{ marginBottom: '1.5rem' }} src={picture} /> : null}
					{paragraphs.map((paragraph, key) => <p key={key} style={{ textAlign: 'justify', textJustify: 'inter-word' }}>{paragraph}</p>)}
				</Modal.Content>
			</Modal>
		</div >)
}

const RenderNews = () => {

	const news = useSelector(state => state)
    let { category, story } = useParams()

	switch (category) {
        case undefined:
		case "0":
			return (<>
				{
					news.map(item => <NewsItem key={item.id} headline={item.headline} picture={item.picture} content={item.content} selected={parseInt(story) === item.id ? true : false} />)
				}
			</>
            )
		default:
			return (<>
				{
					news
						.filter(item => item.category === parseInt(category))
						.map(item => <NewsItem key={item.id} headline={item.headline} picture={item.picture} content={item.content} selected={parseInt(story) === item.id ? true : false} />)
				}
			</>
			)
	}
}

export default RenderNews

export { NewsItem }
