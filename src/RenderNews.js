import React from 'react'
import { Header, Image, Divider, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import '../node_modules/react-vis/dist/style.css'

import ConnectedRenderComments from './RenderComments'
import NotFound from './NotFound'
import RenderMarket from './RenderMarket'

const RenderNews = ({ news }) => {

	const { category, story } = useParams()
	const history = useHistory()

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
				{Number(category) === 3 ? <>
					<RenderMarket />
				</> : null}
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
