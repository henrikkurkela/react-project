import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { Header, Button } from 'semantic-ui-react'

import { deleteRequest } from './services/httpService'
import { logoutToken, removeComment } from './actions'

const Unregister = () => {

    const auth = useSelector(state => state.auth)
    const comments = useSelector(state => state.comments)

    const history = useHistory()

    const unregister = () => {
        deleteRequest(`users/${auth.id}`).then((response) => {
            comments.filter((item) => item.userid === auth.id).map((item) =>
                removeComment(item)
            )

            logoutToken()

            history.push('/')
        }).catch((error) => {
            console.log(error.response.status)
        })
    }

    return (
        <>
            <Header as='h3'>Confirm Delete Account</Header>
            <p>Are you sure you want to permanently delete your account?</p>
            <Link to='/account'>
                <Button color='green'>
                    Cancel
                </Button>
            </Link>
            <Button color='red' onClick={unregister}>
                Delete
            </Button>
        </>
    )
}

export default Unregister
