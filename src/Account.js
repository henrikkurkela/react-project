import React from 'react'
import { connect } from 'react-redux'
import { Header, Comment, Button, Icon } from 'semantic-ui-react'
import { deleteUser } from './services/authService'
import { deleteComment } from './services/commentsService'
import { logoutToken, removeComment } from './actions'

const Account = ({ auth, comments }) => {

    const unregister = () => {
        deleteUser(auth)
        logoutToken()
    }

    const destroyComment = (comment) => {
        deleteComment(comment).then(
            removeComment(comment)
        )
    }

    return (<>
        <Header as='h3'>Account Management</Header>
        {auth ? <>
            <Button onClick={unregister}>Delete Account</Button>
            <Header as='h3'>Recent Activity</Header>
            <Comment.Group>
                {comments.filter(item => item.user === auth.user).map((comment, key) =>
                    <Comment key={key}><Comment.Avatar src='https://via.placeholder.com/75x75?text=Anon' />
                        <Comment.Content>
                            <Icon style={{ float: 'right', display: 'inline-block', cursor: 'pointer' }} name='delete' onClick={() => destroyComment(comment)}></Icon>
                            <Comment.Author>{comment.user ? comment.user : 'Anonymous'}</Comment.Author>
                            <Comment.Text>{comment.content}</Comment.Text>
                        </Comment.Content>
                    </Comment>
                )}
            </Comment.Group>
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

