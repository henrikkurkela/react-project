import React from 'react'
import { useSelector } from 'react-redux'
import { Header, Comment, Image } from 'semantic-ui-react'
import { useParams } from 'react-router-dom'

import NotFound from 'components/page/NotFound'

const User = () => {

    const users = useSelector(state => state.users)
    const comments = useSelector(state => state.comments)
    const { user } = useParams()

    const commenterDetails = (userid = null) => {
        let user = users.find(item => item.id === userid)
        if (user) {
            return user
        } else {
            return { username: 'Anonymous', avatar: '/assets/avatar/anon.jpg' }
        }
    }

    switch (user) {
        case undefined:
            return (<div>
                <NotFound type='user' />
            </div>)
        default:

            const selectedUser = users.find(item => item.id === Number(user))

            if (selectedUser === undefined) {
                return (<div>
                    <NotFound type='user' />
                </div>)
            } else {
                return (<div>
                    <div style={{ margin: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Image
                            src={selectedUser.avatar}
                            style={{ borderRadius: '1em', float: 'left' }}
                        ></Image>
                        <Header as='h3' style={{ margin: '1em' }}>{selectedUser.username}</Header>
                    </div>
                    <Header as='h3'>Comments</Header>
                    <Comment.Group style={{ minWidth: '100%' }}>
                        {comments.filter(item => item.userid === Number(user)).map((comment, key) =>
                            <Comment key={key}>
                                <Comment.Avatar src={commenterDetails(comment.userid).avatar} />
                                <Comment.Content>
                                    <Comment.Author>{commenterDetails(comment.userid).username}</Comment.Author>
                                    <Comment.Text>{comment.content}</Comment.Text>
                                </Comment.Content>
                            </Comment>
                        )}
                    </Comment.Group>
                </div>)
            }
    }
}

export default User
