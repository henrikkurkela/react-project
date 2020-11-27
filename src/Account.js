import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Header, Comment, Button, Icon, Modal, Image } from 'semantic-ui-react'

import { deleteRequest } from './services/httpService'
import { removeComment } from './actions'

const Account = () => {

    const auth = useSelector(state => state.auth)
    const comments = useSelector(state => state.comments)

    const [open, setOpen] = useState(false)
    const [selectedComment, setSelectedComment] = useState(null)

    const destroyComment = (comment) => {
        deleteRequest(`comments/${comment.id}`).then(
            removeComment(comment)
        )
    }

    return (
        <>
            {auth ? <>
                <div style={{ margin: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '1em' }}>
                    <Image
                        src={auth.avatar}
                        style={{ borderRadius: '1em', float: 'left' }}
                    />
                    <Header as='h3' style={{ margin: '1em' }}>{auth.username}</Header>
                </div>
                <Header as='h3'>Actions</Header>
                <Link to='/avatar'>
                    <Button to='/unregister'>Choose Avatar</Button>
                </Link>
                <Link to='/unregister'>
                    <Button color='red' to='/unregister'>Delete Account</Button>
                </Link>
                <Header as='h3'>Recent Activity</Header>
                <Comment.Group style={{ minWidth: '100%' }}>
                    {comments.filter(item => item.userid === auth.id).map((comment, key) =>
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
                    )}
                </Comment.Group>
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
