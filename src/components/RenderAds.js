import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Image, Header, Icon } from 'semantic-ui-react'

const RenderAds = () => {

    const ads = useSelector(state => state.ads)
    const [position, setPosition] = useState(0)
    const [hovered, setHovered] = useState({})

    useEffect(() => {

        const interval = setInterval(() => {
            if (position < ads.length - 1) {
                setPosition(position + 1)
            } else {
                setPosition(0)
            }
        }, 10000)

        return () => clearInterval(interval)
    }, [ads, position])

    return (
        <div
            style={{ position: 'sticky', top: '1em', margin: '-1em', padding: '1em', overflow: 'hidden', textAlign: 'center', ...hovered }}
            onMouseEnter={() => setHovered({ boxShadow: '0 4px 8px 8px rgba(0, 0, 0, 0.2)' })}
            onMouseLeave={() => setHovered({})}
        >
            <Header as='h3' color={'orange'}>Sponsored</Header>
            <div style={{ position: 'relative', width: '100%', paddingTop: '200%' }}>
                {
                    ads.map((item, key) => {
                        return (
                            <Image
                                src={item.picture}
                                key={key}
                                style={{ position: 'absolute', width: '245px', top: '0px', left: `${(key - position) * 300}px`, transition: 'left 0.5s' }}
                                as='a'
                                href={item.href}
                                target='_blank'
                            />
                        )
                    })
                }
            </div>
            {
                ads.map((item, key) => {
                    return (
                        <Icon name={key === position ? 'circle' : 'circle outline'} key={key} onClick={() => setPosition(key)} style={{ cursor: 'pointer' }} />
                    )
                })
            }
        </div>
    )
}

export default RenderAds
