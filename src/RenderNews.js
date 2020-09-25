import React, { useState } from 'react'
import { Header, Divider, Modal, Image, Button, Icon, Comment, Form } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { patchNews } from './services/newsService'
import { postComment } from './services/commentsService'
import { addComment, updateNews } from './actions'

const RenderComments = ({ comments, news }) => {

	const [newComment, setNewComment] = useState('')
	const [liked, setLiked] = useState(() => {
		if (window.localStorage.getItem(news.id) === 'true') {
			return true
		} else {
			return false
		}
	})

	const commentForm = (event) => {
		event.preventDefault()
		if (newComment !== null && newComment !== "") {
			postComment({ content: newComment, newsid: news.id }).then((response) => addComment(response.data))
		}
		setNewComment('')
	}

	const like = (news) => {
		if (liked === false) {
			setLiked(true)
			window.localStorage.setItem(news.id, true)
			patchNews(news.id, { likes: news.likes + 1 }).then((response) => updateNews(response.data))
		} else if (liked === true) {
			setLiked(false)
			window.localStorage.setItem(news.id, false)
			patchNews(news.id, { likes: news.likes - 1 }).then((response) => updateNews(response.data))
		}
	}

	return (
		<Comment.Group>
			<Header as='h3'>
				Comments
    		</Header>
			<Divider />
			{comments.map((comment, key) =>
				<Comment key={key}><Comment.Avatar src='https://via.placeholder.com/75x75?text=Anon' />
					<Comment.Content>
						<Comment.Author as='a'>Anonymous</Comment.Author>
						<Comment.Text>{comment.content}</Comment.Text>
					</Comment.Content>
				</Comment>
			)}
			<Form reply>
				<Form.TextArea value={newComment} onChange={(event) => setNewComment(event.target.value)} />
				<Button content='Comment' labelPosition='left' icon='edit' primary onClick={commentForm} />
				<Button animated onClick={() => like(news)} color={liked ? 'green' : null}>
					<Button.Content visible>
						{news.likes} <Icon name='heart' />
					</Button.Content>
					<Button.Content hidden>{liked ? 'Liked' : 'Like'}</Button.Content>
				</Button>
			</Form>
		</Comment.Group>
	)
}

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
					{comments ? <RenderComments comments={comments} news={item} /> : null}
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
