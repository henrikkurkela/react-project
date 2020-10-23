import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Route, useHistory } from 'react-router-dom';
import { Header, Comment, Modal, Button, Icon, Divider, Image, Confirm } from 'semantic-ui-react'

import { deleteRequest } from './services/httpService'
import { removeComment, removeNews } from './actions'

const Moderation = ({ users, news, comments }) => {

    const [openComment, setOpenComment] = useState(false)
    const [selectedComment, setSelectedComment] = useState(null)
    const [openConfrim, setOpenConfirm] = useState(false)
    const [selectedNews, setSelectedNews] = useState(null)

    const history = useHistory()

    const destroyComment = (comment) => {
        deleteRequest(`comments/${comment.id}`).then(
            removeComment(comment)
        )
    }

    const destroyNews = (news) => {
        deleteRequest(`news/${news.id}`).then(
            removeNews(news)
        )
    }

    const commenterDetails = (userid = null) => {
        let user = users.find(item => item.id === userid)
        if (user) {
            return user
        } else {
            return { username: 'Anonymous', avatar: '/assets/avatar/anon.jpg' }
        }
    }

    return (<>
        <Route exact path="/moderation">
            <Header as='h3'>Moderator Panel</Header>
            <Button onClick={() => history.push('/moderation/comments')}>Comments</Button>
            <Button onClick={() => history.push('/moderation/news')}>News</Button>
        </Route>
        <Route path="/moderation/comments">
            <Header as='h3'>Comments</Header>
            <Comment.Group>
                {comments.map((comment, key) =>
                    <Comment key={key}>
                        <Comment.Avatar src={commenterDetails(comment.userid).avatar} />
                        <Comment.Content>
                            <Icon style={{ float: 'right', display: 'inline-block', cursor: 'pointer' }} name='delete' onClick={() => {
                                setOpenComment(true)
                                setSelectedComment(comment)
                            }}></Icon>
                            <Comment.Author>{commenterDetails(comment.userid).username}</Comment.Author>
                            <Comment.Text>{comment.content}</Comment.Text>
                        </Comment.Content>
                    </Comment>
                )}
            </Comment.Group>
            <Modal
                closeIcon
                onClose={() => setOpenComment(false)}
                onOpen={() => setOpenComment(true)}
                open={openComment}
            >
                <Modal.Header>Confirm Delete Comment</Modal.Header>
                <Modal.Content>
                    {selectedComment ? <Comment>
                        <Comment.Content>
                            <Comment.Text>{selectedComment.content}</Comment.Text>
                        </Comment.Content>
                    </Comment> : null}
                </Modal.Content>
                <Modal.Actions>
                    <Button color='green' onClick={() => setOpenComment(false)}>
                        Cancel
                    </Button>
                    <Button color='red' onClick={() => {
                        setOpenComment(false)
                        destroyComment(selectedComment)
                    }}>
                        Delete
                    </Button>
                </Modal.Actions>
            </Modal>
        </Route>
        <Route path="/moderation/news">
            <Header as="h3">News</Header>
            <div>
                {news.map((item, key) =>
                    <div key={key}>
                        <Icon style={{ float: 'right', display: 'inline-block', cursor: 'pointer' }} name='delete' onClick={() => {
                            setOpenConfirm(true)
                            setSelectedNews(item)
                        }}></Icon>
                        <Confirm
                            open={openConfrim}
                            onCancel={() => setOpenConfirm(false)}
                            onConfirm={() => {
                                destroyNews(selectedNews)
                                setOpenConfirm(false)
                            }}
                        />
                        <Header as='h3'>{item.headline}</Header>
                        {item.picture ? <Image fluid bordered style={{ marginBottom: '1.5rem', maxWidth: '50%' }} src={item.picture} /> : null}
                        {item.content.split('<br/>').map((paragraph, key) => <p key={key} style={{ textAlign: 'justify', textJustify: 'inter-word' }}>{paragraph}</p>)}
                        < Divider />
                    </ div>)}
            </ div>
        </Route>
    </>)
}

const mapStateToProps = (state) => {
    return {
        users: state.users,
        news: state.news,
        comments: state.comments
    }
}

const ConnectedModeration = connect(mapStateToProps)(Moderation)

export default ConnectedModeration
