import React, { useEffect } from 'react'
import { Header } from 'semantic-ui-react'

import { logoutToken } from './actions'

const Logout = () => {

    useEffect(() => {
        logoutToken()
    },[])

    return (
        <div style={{ margin: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Header as='h3'>Good Bye!</Header>
        </div>
    )
}

export default Logout
