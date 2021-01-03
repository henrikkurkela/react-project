import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Comment, Divider, Header, Form, Button } from 'semantic-ui-react'

import { postRequest, patchRequest } from './services/httpService'
import { addComment, updateNews } from './actions'
import useWidth from './useWidth'

const RenderComments = ({ id }) => {

	const comments = useSelector(state => state.comments)
	const news = useSelector(state => state.news)
	const users = useSelector(state => state.users)
	const auth = useSelector(state => state.auth)

	const [newComment, setNewComment] = useState('')
	const [liked, setLiked] = useState(() => {
		if (window.sessionStorage.getItem(id) === 'true') {
			return true
		} else {
			return false
		}
	})
	const [linkCopied, setLinkCopied] = useState(false)
	const [buttonStyle, setButtonStyle] = useState({ width: '180px' })

	const mobile = useWidth()

	const history = useHistory()

	useEffect(() => {

		if (mobile) {
			setButtonStyle({ width: '100%', marginBottom: '0.5em' })
		} else {
			setButtonStyle({ width: '180px' })
		}
	}, [mobile])

	const commentForm = () => {
		if (newComment.trim() === null || newComment.trim() === "") {
			setNewComment('')
		} else {
			postRequest("comments", { content: newComment.trim(), newsid: id, userid: auth ? auth.id : null })
				.then((response) => {
					addComment(response.data)
					setNewComment('')
				})
		}
	}

	const commentOnKeyDown = (event) => {
		if (event.keyCode === 13) {
			commentForm()
		}
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

	const share = () => {
		setLinkCopied(true)
		navigator.clipboard.writeText(window.location.href)
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
		<Comment.Group style={{ minWidth: '100%' }}>
			<Header as='h3'>
				Comments
    		</Header>
			<Divider />
			{comments.filter(item => item.newsid === id).length > 0 ?
				comments.filter(item => item.newsid === id).map((comment, key) =>
					<Comment key={key}>
						<Comment.Avatar src={commenterDetails(comment.userid).avatar} />
						<Comment.Content>
							<Comment.Author style={{ cursor: 'pointer' }} onClick={() => history.push(`/users/${comment.userid}`)}>{commenterDetails(comment.userid).username}</Comment.Author>
							<Comment.Text>{comment.content}</Comment.Text>
						</Comment.Content>
					</Comment>
				) :
				<p style={{ textAlign: 'center', color: 'darkgray' }}>No comments... yet. Be the first one to comment below!</p>
			}
			<Form reply style={{ minWidth: '100%' }}>
				<Form.TextArea required value={newComment} onChange={(event) => setNewComment(event.target.value)} onKeyDown={commentOnKeyDown} />
				<Button style={buttonStyle} content='Comment' labelPosition='left' icon='edit' primary onClick={commentForm} />
				<Button style={buttonStyle} type='button' content={linkCopied ? 'Link Copied' : 'Share'} labelPosition='left' icon={linkCopied ? 'linkify' : 'share square'} onClick={share} />
				<Button style={buttonStyle} type='button' content={news.find(item => item.id === id).likes} labelPosition='left' icon='heart' onClick={like} color={liked ? 'green' : null} />
			</Form>
		</Comment.Group>
	)
}

export default RenderComments
