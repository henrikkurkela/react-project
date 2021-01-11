import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { Header, Comment, Button, Icon, Modal, Image } from 'semantic-ui-react'

import { deleteRequest } from './services/http'
import { removeComment } from './actions'
import { useWidth } from './hooks'

const Account = () => {

    const auth = useSelector(state => state.auth)
    const comments = useSelector(state => state.comments)

    const [open, setOpen] = useState(false)
    const [selectedComment, setSelectedComment] = useState(null)
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

    const destroyComment = (comment) => {
        deleteRequest(`comments/${comment.id}`).then(
            removeComment(comment)
        )
    }

    return (
        <>
            {auth ? <>
                <Header as='h3'>{auth.username}</Header>
                <Image
                    label={{
                        color: 'grey',
                        content: 'Change Avatar',
                        icon: 'edit',
                        ribbon: true
                    }}
                    src={auth.avatar}
                    fluid={mobile ? true : false}
                    rounded={true}
                    onClick={() => history.push('/avatar')}
                />
                <Header as='h3'>Recent Activity</Header>
                <Comment.Group style={{ minWidth: '100%' }}>
                    {comments.filter(item => item.userid === auth.id).length > 0 ?
                        comments.filter(item => item.userid === auth.id).map((comment, key) =>
                            <Comment key={key}>
                                <Comment.Avatar src={auth.avatar} />
                                <Comment.Content>
                                    <Icon style={{ float: 'right', display: 'inline-block', cursor: 'pointer' }} name='delete' onClick={() => {
                                        setOpen(true)
                                        setSelectedComment(comment)
                                    }}></Icon>
                                    <Comment.Author>{auth.username}</Comment.Author>
                                    <Comment.Text>{comment.content}</Comment.Text>
                                </Comment.Content>
                            </Comment>
                        ) : <p style={{ textAlign: 'center', color: 'darkgray' }}>No recent activity.</p>
                    }
                </Comment.Group>
                <Header as='h3'>Actions</Header>
                <Button style={buttonStyle} color='red' onClick={() => history.push('/unregister')}>Delete Account</Button>
                <Modal
                    closeIcon
                    onClose={() => setOpen(false)}
                    onOpen={() => setOpen(true)}
                    open={open}
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
                        <Button color='green' onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <Button color='red' onClick={() => {
                            setOpen(false)
                            destroyComment(selectedComment)
                        }}>
                            Delete
                        </Button>
                    </Modal.Actions>
                </Modal>
            </> : <>
                    <Header as='h3'>Not Logged In</Header>
                    <p><Link to='/login'>Log in</Link> to manage your account.</p>
                </>}
        </>
    )
}

export default Account
