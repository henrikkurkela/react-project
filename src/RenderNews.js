import React, { useState } from 'react'
import { Header, Divider, Modal, Image, Button, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { patchStoryLikes } from './services/newsService'
import { likeNews } from './actions'

const NewsItem = ({ item, selected = false }) => {

	const paragraphs = item.content.split('<br/>')
	const [open, setOpen] = useState(selected)
	const [liked, setLiked] = useState(false)

	const like = (news) => {
		if (liked === false) {
			setLiked(true)
			patchStoryLikes({ ...news, likes: news.likes + 1 })
			likeNews(news, true)
		} else if (liked === true) {
			setLiked(false)
			patchStoryLikes({ ...news, likes: news.likes - 1 })
			likeNews(news, false)
		}
	}

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
				</Modal.Content>
				<Modal.Actions>
					<Button animated onClick={() => like(item)} color={liked ? 'green' : null}>
						<Button.Content visible>
							{item.likes} <Icon name='heart' />
						</Button.Content>
						<Button.Content hidden>{liked ? 'Liked' : 'Like'}</Button.Content>
					</Button>
				</Modal.Actions>
			</Modal>
		</div >)
}

const RenderNews = ({ news }) => {

	let { category, story } = useParams()

	switch (category) {
		case undefined:
		case "0":
			return (<>
				{
					news.map(item => <NewsItem key={item.id} item={item} selected={parseInt(story) === item.id ? true : false} />)
				}
			</>
			)
		default:
			return (<>
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
		news: state.news
	}
}

const ConnectedRenderNews = connect(mapStateToProps)(RenderNews)
export default ConnectedRenderNews

export { NewsItem }
