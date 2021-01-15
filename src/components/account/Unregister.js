import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Header, Button } from 'semantic-ui-react'

import { deleteRequest } from 'services/http'
import { logoutToken, removeComment, removeUser } from 'actions'
import { useWidth } from 'hooks'

const Unregister = () => {

    const auth = useSelector(state => state.auth)
    const users = useSelector(state => state.users)
    const comments = useSelector(state => state.comments)

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

    const unregister = () => {
        deleteRequest(`users/${auth.id}`).then(() => {
            
            comments
                .filter((item) => item.userid === auth.id)
                .map((item) => removeComment(item))

            users
                .filter((item) => item.id === auth.id)
                .map((user) => removeUser(user))

            logoutToken()

            history.push('/')
        }).catch((error) => {
            console.log(error.response?.status)
        })
    }

    return (
        <>
            <Header as='h3'>Confirm Delete Account</Header>
            <p>Are you sure you want to permanently delete your account?</p>
            <Button color='green' style={buttonStyle} onClick={() => history.goBack()}>
                Cancel
            </Button>
            <Button color='red' style={buttonStyle} onClick={unregister}>
                Delete
            </Button>
        </>
    )
}

export default Unregister
