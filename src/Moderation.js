import React, { useState, useEffect } from 'react'
import { Route, useHistory } from 'react-router-dom';
import { Header, Button } from 'semantic-ui-react'

import { useWidth } from './hooks'

import Publish from './Publish'
import ModeratePictures from './ModeratePictures'
import ModerateComments from './ModerateComments'
import ModerateNews from './ModerateNews'
import ModerateAds from './ModerateAds'

const Moderation = () => {

    const [buttonStyle, setButtonStyle] = useState({ width: '180px' })

    const mobile = useWidth()

    const history = useHistory()

    useEffect(() => {

        if (mobile) {
            setButtonStyle({ width: '100%', marginBottom: '0.5em' })
        } else {
            setButtonStyle({ width: '180px' })
        }
    }, [mobile])

    return (<>
        <Route exact path='/moderation'>
            <Header as='h3'>Publish</Header>
            <Button style={buttonStyle} onClick={() => history.push('/moderation/publish')}>Publish Story</Button>
            <Button style={buttonStyle} onClick={() => history.push('/moderation/pictures')}>Pictures</Button>
            <Header as='h3'>Moderate</Header>
            <Button style={buttonStyle} onClick={() => history.push('/moderation/comments')}>Comments</Button>
            <Button style={buttonStyle} onClick={() => history.push('/moderation/news')}>News</Button>
            <Header as='h3'>Collaboration</Header>
            <Button style={buttonStyle} onClick={() => history.push('/moderation/ads')}>Ads</Button>
        </Route>
        <Route path='/moderation/comments'>
            <ModerateComments />
        </Route>
        <Route path='/moderation/news'>
            <ModerateNews />
        </Route>
        <Route path='/moderation/ads'>
            <ModerateAds />
        </Route>
        <Route path='/moderation/publish'>
            <Publish />
        </Route>
        <Route path='/moderation/pictures'>
            <ModeratePictures />
        </Route>
    </>)
}

export default Moderation
