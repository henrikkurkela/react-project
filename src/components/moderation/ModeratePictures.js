import React, { useEffect, useState } from 'react'
import { Header, Image, Form, Message, Modal, Button, Divider } from 'semantic-ui-react'

import { getRequest, deleteRequest, postForm } from 'services/http'
import { useWidth } from 'hooks'

const ModeratePictures = () => {

    const [pictures, setPictures] = useState([])
    const [selectedFile, setSelectedFile] = useState(null)
    const [selectedPicture, setSelectedPicture] = useState(null)
    const [modalOpen, setModalOpen] = useState(false)
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)
    const [statusMessage, setStatusMessage] = useState('')
    const [buttonStyle, setButtonStyle] = useState({ width: '180px' })

    const mobile = useWidth()

    useEffect(() => {

        let mounted = true

        getRequest('pictures').then((response) => {
            if (mounted) {
                setPictures(response.data)
            }
        }).catch((error) => {
            console.log(error.response?.status)
        })

        return () => mounted = false
    }, [])

    useEffect(() => {

        if (mobile) {
            setButtonStyle({ width: '100%', marginBottom: '0.5em' })
        } else {
            setButtonStyle({ width: '180px' })
        }
    }, [mobile])

    const upload = () => {

        setSuccess(false)
        setError(false)
        setStatusMessage('')

        let formData = new FormData()
        formData.append('picture', selectedFile)

        postForm('upload', formData)
            .then((response) => {
                setSuccess(true)
                setStatusMessage('File uploaded successfully.')
                setPictures(pictures.concat(response.data.filename))

            })
            .catch((error) => {
                setError(true)
                setStatusMessage(error.response?.data)
                console.log(error.response?.status)
            })
    }

    const remove = (picture) => {

        setSuccess(false)
        setError(false)
        setStatusMessage('')

        const filename = picture.split('/').pop()

        deleteRequest(`pictures/${filename}`)
            .then(() => {
                setSuccess(true)
                setStatusMessage('File deleted successfully.')
                setPictures(pictures.filter((item) => item !== picture))
            })
            .catch((error) => {
                setError(true)
                setStatusMessage(error.response?.data)
                console.log(error)
            })
    }

    return (
        <>
            <div style={{ textAlign: 'center' }}>
                <Header as='h3'>Upload Picture</Header>
                <Form error={error} success={success} style={{ display: 'inline-block', width: '100%' }}>
                    <Message error header='Error' content={statusMessage} />
                    <Message success header='Success' content={statusMessage} />
                    <Form.Input required placeholder='Select file...' type='file' name='picture' onChange={(event) => setSelectedFile(event.target.files[0])} />
                    <Form.Button style={buttonStyle} content='Upload' type='button' onClick={upload} />
                </Form>
            </div>
            <Divider />
            <Image.Group size='small'>
                {pictures.map((picture, key) =>
                    <Image
                        key={key}
                        src={picture}
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                            setSelectedPicture(picture)
                            setModalOpen(true)
                        }}
                    />
                )}
            </Image.Group>
            <Modal
                onClose={() => setModalOpen(false)}
                onOpen={() => setModalOpen(true)}
                open={modalOpen}
            >
                <Modal.Content image>
                    <Image src={selectedPicture} />
                </Modal.Content>
                <Modal.Actions>
                    <Button color='red' onClick={() => {
                        remove(selectedPicture)
                        setModalOpen(false)
                    }}>Delete</Button>
                </Modal.Actions>
            </Modal>
        </>
    )
}

export default ModeratePictures
