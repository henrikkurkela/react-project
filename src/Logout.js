import React from 'react'
import { Header } from 'semantic-ui-react'
import { logoutToken } from './actions'

const Logout = () => {

    window.localStorage.removeItem('auth')
    logoutToken()

    return (
        <>
            <Header as='h3'>Good Bye!</Header>
        </>
    )
}

export default Logout