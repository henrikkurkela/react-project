import React from 'react'
import { useSelector } from 'react-redux'
import { Image } from 'semantic-ui-react'

const RenderAds = () => {
    const ads = useSelector(state => state.ads)
    const randomAd = ads[Math.floor(Math.random() * ads.length)]

    return (
        <Image style={{ maxWidth: '25%' }} src={randomAd ? randomAd.picture : null}
            as='a'
            href={randomAd ? randomAd.href : null}
            target='_blank'
            floated='right' />
    )
}

export default RenderAds
