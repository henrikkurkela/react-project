import React, { useState, useEffect } from 'react'
import { Form } from 'semantic-ui-react'

import { postRequest, getRequest } from './services/httpService'
import { addNews } from './actions'

const Publish = () => {

    const [newNews, setNewNews] = useState({ content: "", headline: "", picture: "" })
    const [pictures, setPictures] = useState([])

    useEffect(() => {
        getRequest('/pictures').then((response) => {
            setPictures(response.data.pictures.map((item, key) => {return { key: key, value: item, text: item}}))
        })
    },[])
    
    const postNews = (news) => {

        news.category = 0
        news.likes = 0

        postRequest(`news`, news).then((response) => {
            if (response.status === 200) {
                addNews(response.data)
                setNewNews({ content: "", headline: "", picture: "" })
            }
        }).catch((error) => {
            console.log(error.response.status)
        })
    }

    return (<>
        <Form style={{ float: 'left', minWidth: 'calc(75% - 1em)' }}>
            <Form.Input placeholder='Headline' value={newNews.headline} onChange={(event) => setNewNews({ ...newNews, headline: event.target.value })} />
            <Form.Dropdown placeholder='Picture' options={pictures} selection onChange={(event, data) => setNewNews({ ...newNews, picture: `/assets/img/${data.value}` })} />
            <Form.TextArea placeholder='Content' value={newNews.content} onChange={(event) => setNewNews({ ...newNews, content: event.target.value })} />
            <Form.Button content='Post' onClick={() => postNews(newNews)} />
        </Form>
    </>)
}

export default Publish
