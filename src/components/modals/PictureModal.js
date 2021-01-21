import React, { useState, useEffect } from 'react'
import { Header, Button, Modal, Image, Input } from 'semantic-ui-react'

import { getRequest } from 'services/http'

const PictureModal = ({ state, changeState, action }) => {

    const pictureJson = { picture: '', caption: '' }

    const [pictures, setPictures] = useState([])
    const [newPicture, setNewPicture] = useState(pictureJson)

    useEffect(() => {

        let mounted = true

        getRequest('pictures').then((response) => {
            if (mounted) {
                setPictures(response.data)
            }
        }).catch((error) => {
            console.log(error)
        })

        return () => mounted = false
    }, [])

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
                            disabled={`${picture}` === newPicture.picture ? false : true}
                            key={key}
                            src={picture}
                            style={{ cursor: 'pointer' }}
                            onClick={() => setNewPicture({ ...newPicture, picture: `${picture}` })}
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

export default PictureModal
