import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Header, Divider, Image } from 'semantic-ui-react'

import { postRequest, getRequest } from './services/httpService'
import { addNews } from './actions'
import { categories } from './constants'

const Publish = () => {

    const [newNews, setNewNews] = useState({ content: "", headline: "", picture: "", caption: "", category: 0, likes: 0 })
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
                setNewNews({ content: "", headline: "", picture: "", caption: "", category: 0, likes: 0 })
                history.push(`/${response.data.category}/${response.data.id}`)
            }
        }).catch((error) => {
            console.log(error.response.status)
        })
    }

    return (<>
        <Form style={{ float: 'left', minWidth: '100%', paddingBottom: '1em' }}>
            <Form.Input placeholder='Headline' value={newNews.headline} onChange={(event) => setNewNews({ ...newNews, headline: event.target.value })} />
            <Form.Dropdown placeholder='Category' options={categories} selection clearable onChange={(event, data) => setNewNews({ ...newNews, category: data.value })} />
            <Form.Dropdown placeholder='Picture' options={pictures} selection clearable onChange={(event, data) => setNewNews({ ...newNews, picture: `${data.value}` })} />
            <Form.Input placeholder='Caption' value={newNews.caption} onChange={(event) => setNewNews({ ...newNews, caption: event.target.value })} />
            <Form.TextArea placeholder='Content' value={newNews.content} onChange={(event) => setNewNews({ ...newNews, content: event.target.value })} />
            <Form.Button content='Post' onClick={() => postNews(newNews)} />
        </Form>
        <Divider style={{ clear: 'left' }} />
        <Header as='h3'>{newNews.headline}</Header>
        {newNews.picture ? <Image fluid bordered style={{ marginBottom: '1.5rem' }} src={newNews.picture} /> : null}
        {newNews.content.split('\n\n').map((paragraph, key) => <p key={key} style={{ textAlign: 'justify', textJustify: 'inter-word' }}>{paragraph}</p>)}
    </>)
}

export default Publish
