import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Form, Divider, Header, Button } from 'semantic-ui-react'

import { postRequest } from './services/httpService'
import { addNews } from './actions'
import { categories } from './constants'

import { ParseArticle } from './RenderNews'
import PictureModal from './PictureModal'
import TextModal from './TextModal'

const Publish = () => {

    const auth = useSelector(state => state.auth)

    const defaultState = { content: '', headline: '', category: 0, likes: 0, author: auth ? auth.id : null }

    const [newNews, setNewNews] = useState(defaultState)
    const [showPictureModal, setShowPictureModal] = useState(false)
    const [showQuoteModal, setShowQuoteModal] = useState(false)
    const [showVideoModal, setShowVideoModal] = useState(false)

    const history = useHistory()

    const postNews = (news) => {

        postRequest(`news`, { ...news, headline: news.headline.trim(), content: news.content.trim() }).then((response) => {
            if (response.status === 200) {
                addNews(response.data)
                setNewNews(defaultState)
                history.push(`/${response.data.category}/${response.data.id}`)
            }
        }).catch((error) => {
            console.log(error.response.status)
        })
    }

    const insertMediaJson = (mediaJson) => {
        setNewNews({ ...newNews, content: `${newNews.content.trim()}\n\n${JSON.stringify(mediaJson)}\n\n` })
    }

    return (<>
        <Header as='h3'>Publish</Header>
        <Form style={{ float: 'left', minWidth: '100%', paddingBottom: '1em' }}>
            <Form.Input required placeholder='Headline' value={newNews.headline} onChange={(event) => setNewNews({ ...newNews, headline: event.target.value })} />
            <Form.Dropdown required placeholder='Category' options={categories} selection clearable onChange={(event, data) => setNewNews({ ...newNews, category: data.value })} />
            <Form.TextArea required placeholder='Content' rows='10' value={newNews.content} onChange={(event) => setNewNews({ ...newNews, content: event.target.value })} />
            <Button content='Insert Video' labelPosition='left' icon='video' onClick={() => setShowVideoModal(true)} />
            <Button content='Insert Picture' labelPosition='left' icon='image' onClick={() => setShowPictureModal(true)} />
            <Button content='Insert Quote' labelPosition='left' icon='quote right' onClick={() => setShowQuoteModal(true)} />
            <Divider />
            <Form.Button content='Post' labelPosition='left' icon='newspaper' onClick={() => postNews(newNews)} />
        </Form>
        <Divider style={{ clear: 'left' }} />
        <ParseArticle item={newNews} showComments={false} />
        <PictureModal
            state={showPictureModal}
            changeState={setShowPictureModal}
            action={(fields) => insertMediaJson({ type: 'picture', ...fields })}
        />
        <TextModal
            state={showQuoteModal}
            changeState={setShowQuoteModal}
            labels={{ header: 'Insert Quote', first: 'Quote', second: 'Author' }}
            action={(fields) => insertMediaJson({ type: 'quote', quote: fields.first, author: fields.second })}
        />
        <TextModal
            state={showVideoModal}
            changeState={setShowVideoModal}
            labels={{ header: 'Insert Video', first: 'ID', second: 'Caption' }}
            action={(fields) => insertMediaJson({ type: 'video', id: fields.first, caption: fields.second })}
        />
    </>)
}

export default Publish
