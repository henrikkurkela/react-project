import React, { useState } from 'react'
import { Header, Form, Message } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom'
import { postRequest } from './services/httpService'

const Signup = ({ auth }) => {
    const [newUserError, setNewUserError] = useState(false)
    const [newemail, setNewEmail] = useState('')
    const [newusername, setNewUsername] = useState('')
    const [newpassword, setNewPassword] = useState('')

    const [errorMessage, setErrorMessage] = useState('')

    const history = useHistory()

    const signup = (event, email, username, userpass) => {
        event.preventDefault()
        setNewUserError(false)
        postRequest("signup", { email: email, username: username, password: userpass })
            .then(response => {
                if (response.status !== 400) {
                    history.push('/login')
                }
            })
            .catch(error => {
                if (error.response.data) {
                    setNewUserError(true)
                    setErrorMessage(error.response.data)
                }
            })
    }

    return (auth ? <Header as='h3'>Welcome!</Header> :
        <>
            <Header as='h3'>Sign Up</Header>
            <Form error={newUserError} style={{ display: 'inline-block' }}>
                <Message error header='Error' content={errorMessage} />
                <Form.Input placeholder='Email' onChange={(event) => setNewEmail(event.target.value)} />
                <Form.Input placeholder='Username' onChange={(event) => setNewUsername(event.target.value)} />
                <Form.Input placeholder='Password' type='password' onChange={(event) => setNewPassword(event.target.value)} />
                <Form.Button content='Sign Up' onClick={(event) => signup(event, newemail, newusername, newpassword)} />
            </Form>
        </>
    )
}

export default Signup
