import React, { useState } from 'react'
import { Header, Image, Divider, Icon, Embed, Label } from 'semantic-ui-react'
import { connect, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import '../node_modules/react-vis/dist/style.css'

import ConnectedRenderComments from './RenderComments'
import NotFound from './NotFound'
import RenderMarket from './RenderMarket'

const ParseVideo = ({ item }) => {

	return (
		<div style={{ marginBottom: '1em' }}>
			{ item.id ? <Embed
				style={{ marginBottom: '0.5em' }}
				id={item.id}
				placeholder='/assets/img/photo8.jpg'
				source='youtube'
			/> : null}
			{ item.caption ? <b>{item.caption}</b> : null}
		</div>
	)
}

const ParsePicture = ({ item }) => {

	return (
		<div style={{ marginBottom: '1em' }}>
			{item.picture ? <Image style={{ marginBottom: '0.5em' }} src={item.picture} /> : null}
			{item.caption ? <b>{item.caption}</b> : null}
		</div>
	)
}

const ParseQuote = ({ item }) => {

	return (
		<div style={{ backgroundColor: 'lightgray', width: '80%', margin: ' 0em auto 1em' }}>
			<Label style={{ float: 'left', margin: '1em' }} color='grey' ribbon>
				Quote
        	</Label>
			{item.quote ? <Header as='h3' color='grey' style={{ textAlign: 'center', padding: '1em 5em 0em', margin: '1rem 0' }}><i>{item.quote}</i></Header> : null}
			{item.author ? <p style={{ color: 'grey', textAlign: 'right', padding: '0em 3em 0.5em' }}> - {item.author}</p> : null}
		</div>
	)
}

const ParseContent = ({ content, textOnly = false }) => {

	const parsedItems = content.split('\n\n').map((item, key) => {
		if (item.trim().substring(0, 1) !== '{') {
			return (<p key={key} style={{ textAlign: 'justify', textJustify: 'inter-word' }}>{item.trim()}</p>)
		} else if (textOnly === true) {
			return null
		} else {
			try {
				const parseItem = JSON.parse(item)
				switch (parseItem.type) {
					case 'picture':
						return (<ParsePicture key={key} item={parseItem} />)
					case 'video':
						return (<ParseVideo key={key} item={parseItem} />)
					case 'quote':
						return (<ParseQuote key={key} item={parseItem} />)
					default:
						console.log(`ERROR: No parser found for content type ${parseItem.type}`)
						return null
				}
			} catch (error) {
				return null
			}
		}
	})

	return parsedItems
}

const ParseArticle = ({ item, showComments = true }) => {

	const parsedArticle = []
	const users = useSelector(state => state.users)

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
			<ParsePicture key='picture' item={{ picture: item.picture, caption: item.caption }} />
		)
	}

	if (item.content) {
		parsedArticle.push(<ParseContent key='content' content={item.content} />)
	}

	if (item.author) {
		const author = users.find(user => user.id === item.author)
		if (author) {
			parsedArticle.push(
				<div key='author'>
					<Header as='h3'>Author</Header>
					<Image style={{ float: 'left', width: '50px', marginRight: '1em' }} circular src={author.avatar} />
					<p>
						{author.username}<br />
						<a href={`mailto: ${author.email}`}>{author.email}</a>
					</p>
					<div style={{ clear: 'both' }} />
				</div>
			)
		}
	}

	return (<div>
		{parsedArticle}
		{showComments ? <ConnectedRenderComments id={item.id} /> : null}
	</div>)
}

const ParseArticlePreview = ({ item }) => {

	const history = useHistory()
	const [hovered, setHovered] = useState({})

	return (<>
		<div style={{ cursor: 'pointer', overflow: 'auto', margin: '-1em', padding: '1em', ...hovered }}
			onClick={() => history.push(`/${item.category}/${item.id}`)}
			onMouseEnter={() => setHovered({ boxShadow: '0 4px 8px 8px rgba(0, 0, 0, 0.2)' })}
			onMouseLeave={() => setHovered({})}
		>
			<Header as='h3'>{item.headline}</Header>
			<Image style={{ width: '30%', minWidth: '240px', float: 'left', marginRight: '1em' }} src={item.picture ? item.picture : null} />
			<ParseContent content={item.content} textOnly />
			<div style={{ clear: 'both' }} />
		</div>
		<Divider />
	</>)
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

export { ParseArticle }
