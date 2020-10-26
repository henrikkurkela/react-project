import React from 'react'
import { Route, useHistory } from 'react-router-dom';
import { Header, Button } from 'semantic-ui-react'


import Publish from './Publish'
import ConnectedModerateComments from './ModerateComments'
import ConnectedModerateNews from './ModerateNews'

const Moderation = () => {

    const history = useHistory()

    return (<>
        <Route exact path="/moderation">
            <Header as='h3'>Moderator Panel</Header>
            <Button onClick={() => history.push('/moderation/comments')}>Comments</Button>
            <Button onClick={() => history.push('/moderation/news')}>News</Button>
            <Button onClick={() => history.push('/moderation/publish')}>Publish Story</Button>
        </Route>
        <Route path="/moderation/comments">
            <ConnectedModerateComments />
        </Route>
        <Route path="/moderation/news">
            <ConnectedModerateNews />
        </Route>
        <Route path="/moderation/publish">
            <Publish />
        </Route>
    </>)
}

export default Moderation
