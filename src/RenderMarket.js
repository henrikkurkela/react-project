import React from 'react'
import { useSelector } from 'react-redux'
import { XYPlot, LineSeries, VerticalGridLines, HorizontalGridLines, XAxis, YAxis } from 'react-vis'

const RenderMarket = () => {

    const market = useSelector(state => state.market)

    return (
        <XYPlot width={300} height={300}>
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis />
            <YAxis />
            <LineSeries data={market} />
        </XYPlot>
    )
}

export default RenderMarket
