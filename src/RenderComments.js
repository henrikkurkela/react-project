import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Comment, Divider, Header, Form, Button, Icon } from 'semantic-ui-react'
import { patchNews } from './services/newsService'
import { postComment } from './services/commentsService'
import { addComment, updateNews } from './actions'

const RenderComments = ({ id, comments, news, auth }) => {

	const [newComment, setNewComment] = useState('')
	const [liked, setLiked] = useState(() => {
		if (window.sessionStorage.getItem(id) === 'true') {
			return true
		} else {
			return false
		}
	})

	const commentForm = (event) => {
		event.preventDefault()
		if (newComment !== null && newComment !== "") {
			postComment({ content: newComment, newsid: id, user: auth ? auth.user : null }).then((response) => addComment(response.data))
		}
		setNewComment('')
	}

	const like = () => {
		if (liked === false) {
			setLiked(true)
			window.sessionStorage.setItem(id, true)
			patchNews({ id: id, likes: news.find(item => item.id === id).likes + 1 }).then((response) => updateNews(response.data))
		} else if (liked === true) {
			setLiked(false)
			window.sessionStorage.setItem(id, false)
			patchNews({ id: id, likes: news.find(item => item.id === id).likes - 1 }).then((response) => updateNews(response.data))
		}
	}

	return (
		<Comment.Group>
			<Header as='h3'>
				Comments
    		</Header>
			<Divider />
			{comments.filter(item => item.newsid === id).map((comment, key) =>
				<Comment key={key}><Comment.Avatar src='https://via.placeholder.com/75x75?text=Anon' />
					<Comment.Content>
						<Comment.Author>{comment.user ? comment.user : 'Anonymous'}</Comment.Author>
						<Comment.Text>{comment.content}</Comment.Text>
					</Comment.Content>
				</Comment>
			)}
			<Form reply>
				<Form.TextArea value={newComment} onChange={(event) => setNewComment(event.target.value)} />
				<Button content='Comment' labelPosition='left' icon='edit' primary onClick={commentForm} />
				<Button animated onClick={like} color={liked ? 'green' : null}>
					<Button.Content visible>
						{(news.find(item => item.id === id).likes)} <Icon name='heart' />
					</Button.Content>
					<Button.Content hidden>{liked ? 'Liked' : 'Like'}</Button.Content>
				</Button>
			</Form>
		</Comment.Group>
	)
}

const mapStateToRenderCommentsProps = (state) => {
	return {
		comments: state.comments,
		news: state.news,
		auth: state.auth
	}
}

const ConnectedRenderComments = connect(mapStateToRenderCommentsProps)(RenderComments)

export default ConnectedRenderComments

export { RenderComments }
