import React, { useState } from 'react'
import axios from 'axios'
import { Header, Form, Message } from 'semantic-ui-react'

import { backendUrl } from './constants'

const Upload = () => {

    const [selectedFile, setSelectedFile] = useState(null)
    const [uploadError, setUploadError] = useState(false)
    const [uploadSuccess, setUploadSuccess] = useState(false)
    const [statusMessage, setStatusMessage] = useState('')

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
            .then(() => {
                setUploadSuccess(true)
                setStatusMessage('File uploaded successfully.')
            })
            .catch((error) => {
                setUploadError(true)
                setStatusMessage('Something went wrong.')
                console.log(error)
            })
    }

    return (
        <div style={{ textAlign: 'center' }}>
            <Header as='h3'>Upload Picture</Header>
            <Form error={uploadError} success={uploadSuccess} style={{ display: 'inline-block', width: '100%' }}>
                <Message error header='Error' content={statusMessage} />
                <Message success header='Success' content={statusMessage} />
                <Form.Input required placeholder='Select file...' type='file' name='picture' onChange={(event) => setSelectedFile(event.target.files[0])} />
                <Form.Button content='Upload' type='button' onClick={upload} />
            </Form>
        </div>
    )
}

export default Upload
