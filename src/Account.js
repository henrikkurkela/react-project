import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Header, Comment, Button, Icon, Modal } from 'semantic-ui-react'

import { deleteRequest } from './services/httpService'
import { removeComment } from './actions'

const Account = ({ auth, comments }) => {

    const [open, setOpen] = useState(false)
    const [selectedComment, setSelectedComment] = useState(null)

    const destroyComment = (comment) => {
        deleteRequest(`comments/${comment.id}`).then(
            removeComment(comment)
        )
    }

    return (<>
        <Header as='h3'>Account Management</Header>
        {auth ? <>
            <Link to='/unregister'>
                <Button to='/unregister'>Delete Account</Button>
            </Link>
            <Header as='h3'>Recent Activity</Header>
            <Comment.Group>
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
        </> : null}
    </>)
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        comments: state.comments
    }
}

const ConnectedAccount = connect(mapStateToProps)(Account)

export default ConnectedAccount

export { Account }
