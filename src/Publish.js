import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Form, Divider, Header } from 'semantic-ui-react'

import { postRequest, getRequest } from './services/httpService'
import { addNews } from './actions'
import { categories } from './constants'
import { ParseArticle } from './RenderNews'

const Publish = () => {

    const auth = useSelector(state => state.auth)
    const defaultState = { content: "", headline: "", picture: "", caption: "", category: 0, likes: 0, author: auth ? auth.id : null }

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

    return (<>
        <Header as='h3'>Publish</Header>
        <Form style={{ float: 'left', minWidth: '100%', paddingBottom: '1em' }}>
            <Form.Input placeholder='Headline' value={newNews.headline} onChange={(event) => setNewNews({ ...newNews, headline: event.target.value })} />
            <Form.Dropdown placeholder='Category' options={categories} selection clearable onChange={(event, data) => setNewNews({ ...newNews, category: data.value })} />
            <Form.Dropdown placeholder='Picture' options={pictures} selection clearable onChange={(event, data) => setNewNews({ ...newNews, picture: `${data.value}` })} />
            <Form.Input placeholder='Caption' value={newNews.caption} onChange={(event) => setNewNews({ ...newNews, caption: event.target.value })} />
            <Form.TextArea placeholder='Content' value={newNews.content} onChange={(event) => setNewNews({ ...newNews, content: event.target.value })} />
            <Form.Button content='Post' onClick={() => postNews(newNews)} />
        </Form>
        <Divider style={{ clear: 'left' }} />
        <ParseArticle item={newNews} showComments={false} />
    </>)
}

export default Publish
