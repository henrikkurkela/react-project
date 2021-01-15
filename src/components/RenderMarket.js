import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { XYPlot, LineSeries, VerticalGridLines, HorizontalGridLines, XAxis, YAxis } from 'react-vis'
import { Header, Divider, Label, Icon } from 'semantic-ui-react'
import 'react-vis/dist/style.css'

import { getRequest } from 'services/http'
import { updateMarket } from 'actions'
import { useWidth } from 'hooks'

const RenderMarket = () => {

    const market = useSelector(state => state.market)

    const [showPlot, setShowPlot] = useState(false)

    const mobile = useWidth()

    useEffect(() => {
        const interval = setInterval(() => {
            getRequest('market').then(response => {
                const market = response.data
                updateMarket(market)
            })
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    const performance = () => {
        const difference = market ? market[market.length - 1].y - market[0].y : null

        if (difference >= 50) {
            return `soaring (+${difference})`
        } else if (difference >= 25) {
            return `above expectations (+${difference})`
        } else if (difference >= 10) {
            return `lukewarm (+${difference})`
        } else if (difference >= -10) {
            return 'stable'
        } else if (difference >= -25) {
            return `chilly (${difference})`
        } else {
            return `crashing (${difference})`
        }
    }

    const handleMarketClick = () => {
        if (mobile) {
            setShowPlot(false)
        } else {
            setShowPlot(!showPlot)
        }
    }

    return (
        <div onClick={handleMarketClick} style={{ cursor: 'pointer', backgroundImage: 'url(/assets/img/photo7.jpg)' }}>
            {
                mobile ?
                    null :
                    <Label style={{ float: 'left' }} color='grey'>
                        <Icon name={showPlot ? 'compress' : 'expand'} />
                        {showPlot ? 'Minimize' : 'Expand'}
                    </Label>
            }
            <Header as='h3' style={{
                textAlign: 'center', padding: '0 0.5em 0.25em 0.5em',
                backgroundColor: 'white', borderRadius: ' 0 0 0.5em 0.5em',
                width: 'fit-content', margin: '-2.571px auto 0.5em auto'
            }}>
                Market Tracker
            </Header>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ display: showPlot ? 'block' : 'none', background: 'white', borderRadius: '0.5em', padding: '1em', marginRight: '1em' }}>
                    <XYPlot width={300} height={300} yDomain={[0, 100]}>
                        <VerticalGridLines />
                        <HorizontalGridLines />
                        <XAxis hideTicks />
                        <YAxis tickFormat={value => `${value} €`} />
                        <LineSeries data={market} />
                    </XYPlot>
                </div>
                <div>
                    <p style={{ textAlign: 'center', background: 'white', borderRadius: '0.5em', padding: '1em' }}>Get latest market data from our live feed!<br />Recent performance: {performance()}</p>
                </div>
            </div>
            <Divider />
        </div>
    )
}

export default RenderMarket
