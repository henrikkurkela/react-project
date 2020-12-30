import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Header } from 'semantic-ui-react'

import { logoutToken } from './actions'

const Logout = () => {

    const history = useHistory()

    useEffect(() => {
        logoutToken()
        history.push('/')
    })

    return (
        <div style={{ margin: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Header as='h3'>Good Bye!</Header>
        </div>
    )
}

export default Logout
