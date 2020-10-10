import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Comment, Divider, Header, Form, Button, Icon } from 'semantic-ui-react'

import { postRequest, patchRequest } from './services/httpService'
import { addComment, updateNews } from './actions'

const RenderComments = ({ id, comments, news, users, auth }) => {

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
			postRequest("comments" , { content: newComment, newsid: id, userid: auth ? auth.id : null }).then((response) => addComment(response.data))
		}
		setNewComment('')
	}

	const like = () => {
		if (liked === false) {
			setLiked(true)
			window.sessionStorage.setItem(id, true)
			patchRequest(`news/${id}`, { id: id, action: 'like' }).then((response) => updateNews(response.data))
		} else if (liked === true) {
			setLiked(false)
			window.sessionStorage.setItem(id, false)
			patchRequest(`news/${id}`, { id: id, action: 'unlike' }).then((response) => updateNews(response.data))
		}
	}

	const commenterDetails = (userid = null) => {
		let user = users.find(item => item.id === userid)
		if (user) {
			return user
		} else {
			return { username: 'Anonymous', avatar: '/assets/avatar/anon.jpg' }
		}
	}

	return (
		<Comment.Group>
			<Header as='h3'>
				Comments
    		</Header>
			<Divider />
			{comments.filter(item => item.newsid === id).map((comment, key) =>
				<Comment key={key}>
					<Comment.Avatar src={commenterDetails(comment.userid).avatar} />
					<Comment.Content>
						<Comment.Author>{commenterDetails(comment.userid).username}</Comment.Author>
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
		users: state.users,
		auth: state.auth
	}
}

const ConnectedRenderComments = connect(mapStateToRenderCommentsProps)(RenderComments)

export default ConnectedRenderComments

export { RenderComments }
