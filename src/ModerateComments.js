import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Header, Comment, Icon, Modal, Button } from 'semantic-ui-react'

import { deleteRequest } from './services/httpService'
import { removeComment } from './actions'

const ModerateComments = ({ users, comments }) => {

    const [openComment, setOpenComment] = useState(false)
    const [selectedComment, setSelectedComment] = useState(null)

    const destroyComment = (comment) => {
        deleteRequest(`comments/${comment.id}`).then((response) => {
            if (response.status === 200) {
                removeComment(comment)
            }
        }).catch((error) => {
            console.log(error.response.status)
        })
    }

    const commenterDetails = (userid = null) => {
        const user = users.find(item => item.id === userid)
        if (user) {
            return user
        } else {
            return { username: 'Anonymous', avatar: '/assets/avatar/anon.jpg' }
        }
    }

    return (<>
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
    </>)

}

const mapStateToProps = (state) => {
    return {
        users: state.users,
        comments: state.comments
    }
}

const ConnectedModerateComments = connect(mapStateToProps)(ModerateComments)

export default ConnectedModerateComments
