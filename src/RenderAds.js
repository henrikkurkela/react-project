import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Image, Header } from 'semantic-ui-react'

const RenderAds = () => {

    const ads = useSelector(state => state.ads)
    const [randomAd, setRandomAd] = useState([])
    const [hovered, setHovered] = useState({})

    useEffect(() => {

        setRandomAd(ads[Math.floor(Math.random() * ads.length)])
        const interval = setInterval(() => {
            setRandomAd(ads[Math.floor(Math.random() * ads.length)])
        }, 10000)

        return () => clearInterval(interval)
    }, [ads])

    return (<div
        style={{ position: 'sticky', top: '1em', margin: '-1em', padding: '1em', textAlign: 'center', ...hovered }}
        onMouseEnter={() => setHovered({ boxShadow: '0 4px 8px 8px rgba(0, 0, 0, 0.2)' })}
        onMouseLeave={() => setHovered({})}
    >
        <Header as='h3' color={'orange'}>Sponsored</Header>
        <Image 
            key={randomAd ? randomAd.picture : null}
            src={randomAd ? randomAd.picture : null}
            style={{ animation: 'fadeIn ease 1s' }}
            as='a'
            href={randomAd ? randomAd.href : null}
            target='_blank'
        />
    </div>)
}

export default RenderAds
