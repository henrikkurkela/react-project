import React from 'react'
import { Header, Button } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom'

import { postRequest } from './services/httpService'

const Development = () => {

    const history = useHistory()

    const reset = () => {
        postRequest("reset")
            .then((response) => {
                if (response.status === 200) {
                    history.push('/')
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (<>
        <Header as='h3'>Development Tools</Header>
        <Button onClick={reset}>Reset Database</Button>
    </>)
}

export default Development
