import React from 'react'
import { useHistory } from 'react-router-dom'
import { Header, Button } from 'semantic-ui-react'

const NotFound = ({ type = 'site' }) => {

    const history = useHistory()

    return(<div>
        <Header as='h3'>Not Found</Header>
        <p>Sorry, we could not find the {type} you were looking for.</p>
        <Button color='green' onClick={() => history.goBack()}>Go Back</Button>
    </div>)
}

export default NotFound
