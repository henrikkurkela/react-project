import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Header, Image } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom'

import { getRequest, patchRequest } from 'services/http'
import { updateUser, updateToken } from 'actions'

const Avatar = () => {

    const auth = useSelector(state => state.auth)

    const [avatars, setAvatars] = useState(['default.jpg'])
    const history = useHistory()

    useEffect(() => {
        getRequest('/avatars').then((response) => {
            setAvatars(response.data.avatars)
        })
    }, [])

    const chooseAvatar = (avatar) => {
        patchRequest(`/users/${auth.id}`, {
            action: 'avatar',
            avatar: avatar
        }).then((response) => {
            updateUser(response.data)
            updateToken({ avatar: response.data.avatar })
            history.push('/account')
        }).catch((error) => {
            console.log(error.response?.status)
        })
    }

    return (
        <>
            <Header as='h3'>Choose Avatar</Header>
            {
                avatars.map((item, key) => {
                    return <Image
                        src={`/assets/avatar/${item}`}
                        key={key}
                        style={{ float: 'left', padding: '1rem', cursor: 'pointer' }}
                        onClick={() => chooseAvatar(`/assets/avatar/${item}`)}
                    />
                })
            }
        </>
    )

}

export default Avatar
