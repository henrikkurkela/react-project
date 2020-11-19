import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Form, Divider, Header, Button } from 'semantic-ui-react'

import { postRequest, getRequest } from './services/httpService'
import { addNews } from './actions'
import { categories } from './constants'
import { ParseArticle } from './RenderNews'

const Publish = () => {

    const auth = useSelector(state => state.auth)
    const defaultState = { content: "", headline: "", picture: "", caption: "", category: 0, likes: 0, author: auth ? auth.id : null }
    const pictureJson = { type: 'picture', picture: '/assets/img/photo1.jpg', caption: 'Caption' }
    const videoJson = { type: 'video', id: '2lAe1cqCOXo', caption: 'Caption' }
    const quoteJson = { type: 'quote', quote: 'Lorem Ipsum', author: 'Cicero' }

    const [newNews, setNewNews] = useState(defaultState)
    const [pictures, setPictures] = useState([])

    const history = useHistory()

    useEffect(() => {
        getRequest('/pictures').then((response) => {
            setPictures(response.data.pictures.map((item, key) => { return { key: key, value: `/assets/img/${item}`, text: item, image: { src: `/assets/img/${item}` } } }))
        })
    }, [])

    const postNews = (news) => {

        postRequest(`news`, { ...news, likes: 0 }).then((response) => {
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
            <Form.Input placeholder='Headline' value={newNews.headline} onChange={(event) => setNewNews({ ...newNews, headline: event.target.value })} />
            <Form.Dropdown placeholder='Category' options={categories} selection clearable onChange={(event, data) => setNewNews({ ...newNews, category: data.value })} />
            <Form.Dropdown placeholder='Lead Picture' options={pictures} selection clearable onChange={(event, data) => setNewNews({ ...newNews, picture: `${data.value}` })} />
            <Form.Input placeholder='Lead Caption' value={newNews.caption} onChange={(event) => setNewNews({ ...newNews, caption: event.target.value })} />
            <Form.TextArea placeholder='Content' rows='10' value={newNews.content} onChange={(event) => setNewNews({ ...newNews, content: event.target.value })} />
            <Button content='Insert Video' labelPosition='left' icon='video' onClick={() => insertMediaJson(videoJson)} />
            <Button content='Insert Picture' labelPosition='left' icon='image' onClick={() => insertMediaJson(pictureJson)} />
            <Button content='Insert Quote' labelPosition='left' icon='quote right' onClick={() => insertMediaJson(quoteJson)} />
            <Divider />
            <Form.Button content='Post' labelPosition='left' icon='newspaper' onClick={() => postNews(newNews)} />
        </Form>
        <Divider style={{ clear: 'left' }} />
        <ParseArticle item={newNews} showComments={false} />
    </>)
}

export default Publish
