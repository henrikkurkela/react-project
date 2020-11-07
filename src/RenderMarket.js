import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { XYPlot, LineSeries, VerticalGridLines, HorizontalGridLines, XAxis, YAxis } from 'react-vis'
import { Header } from 'semantic-ui-react'

import { getRequest } from './services/httpService'
import { updateMarket } from './actions'

const RenderMarket = () => {

    const market = useSelector(state => state.market)

    useEffect(() => {
        const interval = setInterval(() => {
            getRequest("market").then(response => {
                const market = response.data
                updateMarket(market)
            })
        }, 500)

        return () => clearInterval(interval)
    })

    return (<>
        <Header as='h3' style={{ textAlign: 'center' }}>Market Tracker</Header>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <XYPlot width={300} height={300}>
                <VerticalGridLines />
                <HorizontalGridLines />
                <XAxis hideTicks />
                <YAxis tickFormat={value => `${value} €`} />
                <LineSeries data={market} />
            </XYPlot>
            <div>
                <p>Get latest market data from our live feed!<br />Today's performance: {market ? market[market.length - 1].y - market[0].y : 'NaN'} €</p>
            </div>
        </div>
    </>)
}

export default RenderMarket
