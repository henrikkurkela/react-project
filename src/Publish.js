import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Form, Divider, Header, Button, Modal, Image, Input } from 'semantic-ui-react'

import { getRequest, postRequest } from './services/httpService'
import { addNews } from './actions'
import { categories } from './constants'
import { ParseArticle } from './RenderNews'

const PictureModal = ({ state, changeState, action }) => {

    const pictureJson = { type: 'picture', picture: '', caption: '' }

    const [pictures, setPictures] = useState([])
    const [newPicture, setNewPicture] = useState(pictureJson)

    useEffect(() => {

        let mounted = true
        
        getRequest('/pictures').then((response) => {
            if (mounted) {
                setPictures(response.data.pictures)
            }
        })
        
        return () => mounted = false
    })

    return (
        <Modal
            open={state}
            onClose={() => changeState(false)}
        >
            <Header>Select Picture</Header>
            <Modal.Content>
                <Image.Group size='small'>
                    {pictures.map((picture, key) =>
                        <Image
                            disabled={`/assets/img/${picture}` === newPicture.picture ? false : true}
                            key={key}
                            src={`/assets/img/${picture}`}
                            style={{ cursor: 'pointer' }}
                            onClick={() => setNewPicture({ ...newPicture, picture: `/assets/img/${picture}` })}
                        />
                    )}
                </Image.Group>
                <Input
                    placeholder='Caption'
                    value={newPicture.caption}
                    style={{ width: '100%' }}
                    onChange={(event) => setNewPicture({ ...newPicture, caption: event.target.value })}
                />
            </Modal.Content>
            <Modal.Actions>
                <Button color='green' onClick={() => {
                    action(newPicture)
                    changeState(false)
                }}>
                    Insert
            </Button>
                <Button color='red' onClick={() => changeState(false)}>
                    Cancel
            </Button>
            </Modal.Actions>
        </Modal>
    )
}

const QuoteModal = ({ state, changeState, action }) => {

    const quoteJson = { type: 'quote', quote: '', author: '' }

    const [newQuote, setNewQuote] = useState(quoteJson)

    return (
        <Modal
            open={state}
            onClose={() => changeState(false)}
        >
            <Header>Insert Quote</Header>
            <Modal.Content>
                <Input
                    placeholder='Quote'
                    value={newQuote.quote}
                    style={{ width: '100%' }}
                    onChange={(event) => setNewQuote({ ...newQuote, quote: event.target.value })}
                />
                <Input
                    placeholder='Author'
                    value={newQuote.author}
                    style={{ width: '100%' }}
                    onChange={(event) => setNewQuote({ ...newQuote, author: event.target.value })}
                />
            </Modal.Content>
            <Modal.Actions>
                <Button color='green' onClick={() => {
                    action(newQuote)
                    changeState(false)
                }}>
                    Insert
            </Button>
                <Button color='red' onClick={() => changeState(false)}>
                    Cancel
            </Button>
            </Modal.Actions>
        </Modal>
    )
}

const VideoModal = ({ state, changeState, action }) => {

    const videoJson = { type: 'video', id: '', caption: '' }

    const [newVideo, setNewVideo] = useState(videoJson)

    return (
        <Modal
            open={state}
            onClose={() => changeState(false)}
        >
            <Header>Insert Video</Header>
            <Modal.Content>
                <Input
                    placeholder='ID'
                    value={newVideo.id}
                    style={{ width: '100%' }}
                    onChange={(event) => setNewVideo({ ...newVideo, id: event.target.value })}
                />
                <Input
                    placeholder='Caption'
                    value={newVideo.caption}
                    style={{ width: '100%' }}
                    onChange={(event) => setNewVideo({ ...newVideo, caption: event.target.value })}
                />
            </Modal.Content>
            <Modal.Actions>
                <Button color='green' onClick={() => {
                    action(newVideo)
                    changeState(false)
                }}>
                    Insert
            </Button>
                <Button color='red' onClick={() => changeState(false)}>
                    Cancel
            </Button>
            </Modal.Actions>
        </Modal>
    )
}

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
            <Form.Input placeholder='Headline' value={newNews.headline} onChange={(event) => setNewNews({ ...newNews, headline: event.target.value })} />
            <Form.Dropdown placeholder='Category' options={categories} selection clearable onChange={(event, data) => setNewNews({ ...newNews, category: data.value })} />
            <Form.TextArea placeholder='Content' rows='10' value={newNews.content} onChange={(event) => setNewNews({ ...newNews, content: event.target.value })} />
            <Button content='Insert Video' labelPosition='left' icon='video' onClick={() => setShowVideoModal(true)} />
            <Button content='Insert Picture' labelPosition='left' icon='image' onClick={() => setShowPictureModal(true)} />
            <Button content='Insert Quote' labelPosition='left' icon='quote right' onClick={() => setShowQuoteModal(true)} />
            <Divider />
            <Form.Button content='Post' labelPosition='left' icon='newspaper' onClick={() => postNews(newNews)} />
        </Form>
        <Divider style={{ clear: 'left' }} />
        <ParseArticle item={newNews} showComments={false} />
        <PictureModal state={showPictureModal} changeState={setShowPictureModal} action={insertMediaJson} />
        <QuoteModal state={showQuoteModal} changeState={setShowQuoteModal} action={insertMediaJson} />
        <VideoModal state={showVideoModal} changeState={setShowVideoModal} action={insertMediaJson} />
    </>)
}

export default Publish
