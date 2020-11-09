import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { XYPlot, LineSeries, VerticalGridLines, HorizontalGridLines, XAxis, YAxis } from 'react-vis'
import { Header, Divider } from 'semantic-ui-react'

import { getRequest } from './services/httpService'
import { updateMarket } from './actions'

const RenderMarket = () => {

    const market = useSelector(state => state.market)
    const [showPlot, setShowPlot] = useState(false)

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

    useEffect(() => {
        const interval = setInterval(() => {
            getRequest("market").then(response => {
                const market = response.data
                updateMarket(market)
            })
        }, 1000)

        return () => clearInterval(interval)
    })

    return (<div onClick={() => setShowPlot(!showPlot)} style={{ cursor: 'pointer', backgroundImage: 'url(/assets/img/photo7.jpg)' }}>
        <Header as='h3' style={{ textAlign: 'center', paddingTop: '0.5em' }}>Market Tracker</Header>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ display: showPlot ? 'block' : 'none', background: 'white', borderRadius: '0.5em', padding: '1em', marginRight: '1em' }}>
                <XYPlot width={300} height={300}>
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
    </div>)
}

export default RenderMarket
