import React, { useState, useEffect } from 'react'
import { Route, useHistory } from 'react-router-dom';
import { Header, Button } from 'semantic-ui-react'

import { postRequest } from './services/http'
import { useWidth } from './hooks'

import Publish from './Publish'
import ModeratePictures from './ModeratePictures'
import ModerateComments from './ModerateComments'
import ModerateNews from './ModerateNews'
import ModerateAds from './ModerateAds'

const Moderation = ({ requestReset }) => {

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

    const reset = () => {
        postRequest('reset')
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
            <Header as='h3'>Development</Header>
            <Button style={buttonStyle} onClick={reset}>Reset</Button>
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
