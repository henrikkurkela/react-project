import React, { useEffect, useState } from 'react'
import { Header, Image, Form, Message } from 'semantic-ui-react'
import axios from 'axios'

import { backendUrl } from './constants'
import { getRequest } from './services/httpService'

const ModeratePictures = () => {

    const [pictures, setPictures] = useState([])
    const [selectedFile, setSelectedFile] = useState(null)
    const [uploadError, setUploadError] = useState(false)
    const [uploadSuccess, setUploadSuccess] = useState(false)
    const [statusMessage, setStatusMessage] = useState('')

    useEffect(() => {

        let mounted = true

        getRequest('/pictures').then((response) => {
            if (mounted) {
                setPictures(response.data.pictures)
            }
        }).catch((error) => {
            console.log(error)
        })

        return () => mounted = false
    }, [])

    const upload = () => {

        setUploadSuccess(false)
        setUploadError(false)
        setStatusMessage('')

        let formData = new FormData()
        formData.append('picture', selectedFile)

        axios({
            method: 'post',
            url: `${backendUrl}/upload`,
            data: formData,
            headers: { 'Content-Type': 'multipart/form-data' }
        })
            .then((response) => {
                setUploadSuccess(true)
                setStatusMessage('File uploaded successfully.')
                setPictures(pictures.concat(response.data.filename))

            })
            .catch((error) => {
                setUploadError(true)
                setStatusMessage(error.response.data)
                console.log(error)
            })
    }

    return (
        <>
            <div style={{ textAlign: 'center' }}>
                <Header as='h3'>Upload Picture</Header>
                <Form error={uploadError} success={uploadSuccess} style={{ display: 'inline-block', width: '100%' }}>
                    <Message error header='Error' content={statusMessage} />
                    <Message success header='Success' content={statusMessage} />
                    <Form.Input required placeholder='Select file...' type='file' name='picture' onChange={(event) => setSelectedFile(event.target.files[0])} />
                    <Form.Button content='Upload' type='button' onClick={upload} />
                </Form>
            </div>
            <Header as='h3'>Moderate Pictures</Header>
            <Image.Group size='small'>
                {pictures.map((picture, key) =>
                    <Image
                        key={key}
                        src={`/assets/img/${picture}`}
                        style={{ cursor: 'pointer' }}
                    />
                )}
            </Image.Group>
        </>
    )
}

export default ModeratePictures
