import React from 'react'
import { Header, Button } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom'

import { postRequest } from './services/http'

const Development = ({ requestReset }) => {

    const history = useHistory()

    const reset = () => {
        postRequest("reset")
            .then((response) => {
                if (response.status === 200) {
                    requestReset(true)
                    history.push('/')
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const moderate = () => {
        history.push('/moderation')
    }

    return (<>
        <Header as='h3'>Development Tools</Header>
        <Button onClick={moderate}>Moderator Panel</Button>
        <Button onClick={reset}>Reset Database</Button>
    </>)
}

export default Development
