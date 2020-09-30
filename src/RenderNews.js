import React, { useState } from 'react'
import { Header, Divider, Modal, Image } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import ConnectedRenderComments from './RenderComments'

const NewsItem = ({ item, comments = null, selected = false }) => {

	const paragraphs = item.content.split('<br/>')
	const [open, setOpen] = useState(selected)

	return (
		<div style={{ cursor: 'pointer' }}>
			<Modal
				closeIcon
				open={open}
				onClose={() => setOpen(false)}
				onOpen={() => setOpen(true)}
				trigger={
					<div>
						<Header as='h3'>{item.headline}</Header>
						{paragraphs.map((paragraph, key) => <p key={key} style={{ textAlign: 'justify', textJustify: 'inter-word' }}>{paragraph}</p>)}
						<Divider />
					</div>
				}
			>
				<Modal.Header>{item.headline}</Modal.Header>
				<Modal.Content>
					{item.picture ? <Image fluid bordered style={{ marginBottom: '1.5rem' }} src={item.picture} /> : null}
					{paragraphs.map((paragraph, key) => <p key={key} style={{ textAlign: 'justify', textJustify: 'inter-word' }}>{paragraph}</p>)}
					{comments ? <ConnectedRenderComments id={item.id} /> : null}
				</Modal.Content>
			</Modal>
		</div>
	)
}

const RenderNews = ({ news, comments }) => {

	let { category, story } = useParams()

	switch (category) {
		case undefined:
		case "0":
			return (
				<>
					{
						news.map(item => <NewsItem key={item.id} item={item} comments={comments.filter(comment => comment.newsid === item.id)} selected={parseInt(story) === item.id ? true : false} />)
					}
				</>
			)
		default:
			return (
				<>
					{
						news
							.filter(item => item.category === parseInt(category))
							.map(item => <NewsItem key={item.id} item={item} selected={parseInt(story) === item.id ? true : false} />)
					}
				</>
			)
	}
}

const mapStateToProps = (state) => {
	return {
		news: state.news,
		comments: state.comments
	}
}

const ConnectedRenderNews = connect(mapStateToProps)(RenderNews)
export default ConnectedRenderNews

export { NewsItem }
