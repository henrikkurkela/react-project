import React from 'react'
import { Route, useHistory } from 'react-router-dom';
import { Header, Button } from 'semantic-ui-react'

import Publish from './Publish'
import ModerateComments from './ModerateComments'
import ModerateNews from './ModerateNews'

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
            <ModerateComments />
        </Route>
        <Route path="/moderation/news">
            <ModerateNews />
        </Route>
        <Route path="/moderation/publish">
            <Publish />
        </Route>
    </>)
}

export default Moderation
