import React from 'react'
import { connect } from 'react-redux'
import { Header, Image } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom'

import { patchRequest } from './services/httpService'
import { updateUser, updateToken } from './actions'

const Avatar = ({ auth }) => {

    const avatars = ['default.jpg', '1.jpg', '2.jpg', '3.jpg']
    const history = useHistory()

    const chooseAvatar = (avatar) => {
        patchRequest(`/users/${auth.id}`, {
            action: 'avatar',
            avatar: avatar
        }).then((response) => {
            updateUser(response.data)
            updateToken({ avatar: response.data.avatar })
            history.push('/account')
        })
    }

    return (
        <>
            <Header as='h1'>Choose Avatar</Header>
            {avatars.map((item, key) => {
                return <Image 
                    src={`/assets/avatar/${item}`}
                    key={key}
                    style={{ float: 'left', padding: '1rem', cursor: 'pointer' }}
                    onClick={() => chooseAvatar(`/assets/avatar/${item}`)}
                ></Image>
            })}
        </>
    )

}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

const ConnectedAvatar = connect(mapStateToProps)(Avatar)

export default ConnectedAvatar

export { Avatar }
