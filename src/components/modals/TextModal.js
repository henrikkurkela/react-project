import React, { useState } from 'react'
import { Header, Button, Modal, Input } from 'semantic-ui-react'

const TextModal = ({ state, changeState, action, labels = { header: 'Text Modal', first: 'First Field', second: 'Second Field' } }) => {

    const [fields, setFields] = useState({ first: '', second: '' })

    return (
        <Modal
            open={state}
            onClose={() => changeState(false)}
        >
            <Header>{labels.header}</Header>
            <Modal.Content>
                <Input
                    placeholder={labels.first}
                    value={fields.first}
                    style={{ width: '100%' }}
                    onChange={(event) => setFields({ ...fields, first: event.target.value })}
                />
                <Input
                    placeholder={labels.second}
                    value={fields.second}
                    style={{ width: '100%' }}
                    onChange={(event) => setFields({ ...fields, second: event.target.value })}
                />
            </Modal.Content>
            <Modal.Actions>
                <Button color='green' onClick={() => {
                    action(fields)
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

export default TextModal
