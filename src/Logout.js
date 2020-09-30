import React, { useEffect } from 'react'
import { Header } from 'semantic-ui-react'
import { logoutToken } from './actions'

const Logout = () => {

    useEffect(() => {
        logoutToken()
    },[])

    return (
        <>
            <Header as='h3'>Good Bye!</Header>
        </>
    )
}

export default Logout
