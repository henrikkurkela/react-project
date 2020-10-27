import React from 'react'
import { Header, Image, Divider } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'

import ConnectedRenderComments from './RenderComments'

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
					{item.picture ? <Image style={{ marginBottom: '1.5rem' }} src={item.picture} /> : null}
					{item.content.split('\n\n').map((paragraph, key) => <p key={key} style={{ textAlign: 'justify', textJustify: 'inter-word' }}>{paragraph}</p>)}
					<ConnectedRenderComments id={item.id} />
				</div>)
			}
	}

	switch (category) {
		case undefined:
			return (<div>
				{news.map((item, key) => {
					return (<div style={{ cursor: 'pointer', marginBottom: '1.5rem' }} key={key} onClick={() => history.push(`/${item.category}/${item.id}`)}>
						<Header as='h3'>{item.headline}</Header>
						{item.content.split('\n\n').map((paragraph, key) => <p key={key} style={{ textAlign: 'justify', textJustify: 'inter-word' }}>{paragraph}</p>)}
						<Divider />
					</div>)
				})}
			</div>)
		default:
			return (<div>
				{news.filter((item) => item.category === Number(category)).map((item, key) => {
					return (<div style={{ cursor: 'pointer', marginBottom: '1.5rem' }} key={key} onClick={() => history.push(`/${item.category}/${item.id}`)}>
						<Header as='h3'>{item.headline}</Header>
						{item.content.split('\n\n').map((paragraph, key) => <p key={key} style={{ textAlign: 'justify', textJustify: 'inter-word' }}>{paragraph}</p>)}
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
