import React from 'react'
import { Header, Image, Divider, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import '../node_modules/react-vis/dist/style.css'

import ConnectedRenderComments from './RenderComments'
import NotFound from './NotFound'
import RenderMarket from './RenderMarket'

const ParseArticle = ({ item }) => {

	const parsedArticle = []

	if (item.headline) {
		parsedArticle.push(
			<Header key='headline' as='h3'>{item.headline}</Header>
		)
	}

	if (item.time) {
		parsedArticle.push(
			<p key='time' style={{ color: 'gray' }}><Icon name='clock outline'></Icon>{item.time}</p>
		)
	}

	if (item.picture) {
		parsedArticle.push(
			<div key='picture' style={{ marginBottom: '1em' }}>
				<Image style={{ marginBottom: '0.5em' }} src={item.picture} />
				{item.caption ? <b>{item.caption}</b> : null}
			</div>
		)
	}

	if (item.content) {
		const rawItems = item.content.split('\n\n')
		const parsedItems = rawItems.map((item, key) => {
			return (<p key={key} style={{ textAlign: 'justify', textJustify: 'inter-word' }}>{item}</p>)
		})
		parsedArticle.push(parsedItems)
	}

	return (<div>
		{parsedArticle}
		<ConnectedRenderComments id={item.id} />
	</div>)
}

const ParseArticlePreview = ({ item }) => {

	const history = useHistory()
	const parseContent = (content) => {
		const rawItems = content.split('\n\n')
		const parsedItems = rawItems.map((item, key) => {
			return (<p key={key} style={{ textAlign: 'justify', textJustify: 'inter-word' }}>{item}</p>)
		})
		return parsedItems
	}

	return (<div style={{ cursor: 'pointer', overflow: 'auto' }} onClick={() => history.push(`/${item.category}/${item.id}`)}>
		<Header as='h3'>{item.headline}</Header>
		<Image style={{ width: '30%', minWidth: '240px', float: 'left', marginRight: '1em' }} src={item.picture ? item.picture : null} />
		{parseContent(item.content)}
		<div style={{ clear: 'both' }} />
		<Divider />
	</div>)
}

const RenderNews = ({ news }) => {

	const { category, story } = useParams()

	switch (story) {
		case undefined:
			break
		default:
			const item = news.find((item) => item.id === Number(story))
			if (item !== undefined) {
				return (<ParseArticle item={item} />)
			} else {
				return (<div>
					<NotFound type='article' />
				</div>)
			}
	}

	switch (category) {
		case undefined:
			return (<div>
				{news.map((item, key) =>
					<ParseArticlePreview item={item} key={key} />
				)}
			</div>)
		default:
			return (<div>
				{Number(category) === 3 ? <>
					<RenderMarket />
				</> : null}
				{news.filter((item) => item.category === Number(category)).map((item, key) =>
					<ParseArticlePreview item={item} key={key} />
				)}
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
