import React from 'react'
import { Header, Image, Divider, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { XYPlot, LineSeries, VerticalGridLines, HorizontalGridLines, XAxis, YAxis } from 'react-vis'
import '../node_modules/react-vis/dist/style.css'

import ConnectedRenderComments from './RenderComments'
import NotFound from './NotFound'

const RenderNews = ({ news }) => {

	const { category, story } = useParams()
	const history = useHistory()

	const data = [
		{ x: 0, y: 8 },
		{ x: 1, y: 5 },
		{ x: 2, y: 4 },
		{ x: 3, y: 9 },
		{ x: 4, y: 1 },
		{ x: 5, y: 7 },
		{ x: 6, y: 6 },
		{ x: 7, y: 3 },
		{ x: 8, y: 2 },
		{ x: 9, y: 0 }
	]

	switch (story) {
		case undefined:
			break
		default:
			const item = news.find((item) => item.id === Number(story))
			if (item !== undefined) {
				return (<div>
					<Header as='h3'>{item.headline}</Header>
					<p style={{ color: 'gray' }}><Icon name='clock outline'></Icon>{item.time}</p>
					{item.picture ? <div style={{ marginBottom: '1em' }}>
						<Image style={{ marginBottom: '0.5em' }} src={item.picture} />
						{item.caption ? <b>{item.caption}</b> : null}
					</div> : null}
					{item.content.split('\n\n').map((paragraph, key) => <p key={key} style={{ textAlign: 'justify', textJustify: 'inter-word' }}>{paragraph}</p>)}
					<ConnectedRenderComments id={item.id} />
				</div>)
			} else {
				return (<div>
					<NotFound type='article' />
				</div>)
			}
	}

	switch (category) {
		case '3':
			return (<div>
				<Header as='h3'>Market Tracker</Header>
				<XYPlot width={300} height={300}>
					<VerticalGridLines />
					<HorizontalGridLines />
					<XAxis />
					<YAxis />
					<LineSeries data={data} />
				</XYPlot>
				{news.filter((item) => item.category === Number(category)).map((item, key) => {
					return (<div style={{ cursor: 'pointer', overflow: 'auto' }} key={key} onClick={() => history.push(`/${item.category}/${item.id}`)}>
						<Header as='h3'>{item.headline}</Header>
						<Image style={{ width: '30%', minWidth: '240px', float: 'left', marginRight: '1em' }} src={item.picture ? item.picture : null} />
						{item.content.split('\n\n').map((paragraph, key) => <p key={key} style={{ textAlign: 'justify', textJustify: 'inter-word' }}>{paragraph}</p>)}
						<div style={{ clear: 'both' }} />
						<Divider />
					</div>)
				})}
			</div>)
		case undefined:
			return (<div>
				{news.map((item, key) => {
					return (<div style={{ cursor: 'pointer', overflow: 'auto' }} key={key} onClick={() => history.push(`/${item.category}/${item.id}`)}>
						<Header as='h3'>{item.headline}</Header>
						<Image style={{ width: '30%', minWidth: '240px', float: 'left', marginRight: '1em' }} src={item.picture ? item.picture : null} />
						{item.content.split('\n\n').map((paragraph, key) => <p key={key} style={{ textAlign: 'justify', textJustify: 'inter-word' }}>{paragraph}</p>)}
						<div style={{ clear: 'both' }} />
						<Divider />
					</div>)
				})}
			</div>)
		default:
			return (<div>
				{news.filter((item) => item.category === Number(category)).map((item, key) => {
					return (<div style={{ cursor: 'pointer', overflow: 'auto' }} key={key} onClick={() => history.push(`/${item.category}/${item.id}`)}>
						<Header as='h3'>{item.headline}</Header>
						<Image style={{ width: '30%', minWidth: '240px', float: 'left', marginRight: '1em' }} src={item.picture ? item.picture : null} />
						{item.content.split('\n\n').map((paragraph, key) => <p key={key} style={{ textAlign: 'justify', textJustify: 'inter-word' }}>{paragraph}</p>)}
						<div style={{ clear: 'both' }} />
						<Divider />
					</div>)
				})}
			</div>)
	}
}

const mapStateToProps = (state) => {
	return {
		news: state.news
	}
}

const ConnectedRenderNews = connect(mapStateToProps)(RenderNews)

export default ConnectedRenderNews
