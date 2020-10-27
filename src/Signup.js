import React, { useState } from 'react'
import { Header, Form, Message } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom'

import { postRequest } from './services/httpService'
import { addUser } from './actions'

const Signup = () => {

    const [signupError, setSignupError] = useState(false)
    const [newemail, setNewEmail] = useState('')
    const [newusername, setNewUsername] = useState('')
    const [newpassword, setNewPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const history = useHistory()

    const signup = (event, email, username, userpass) => {
        event.preventDefault()
        setSignupError(false)
        postRequest("signup", { email: email, username: username, password: userpass })
            .then(response => {
                if (response.status !== 400) {
                    console.log(response.data)
                    addUser(response.data)
                    history.push('/login')
                }
            })
            .catch(error => {
                if (error.response.data) {
                    setSignupError(true)
                    setErrorMessage(error.response.data)
                } else {
                    setSignupError(true)
                    setErrorMessage('Something went wrong, try again later')
                }
            })
    }

    return (
        <div style={{textAlign: 'center'}}>
            <Header as='h3'>Sign Up</Header>
            <Form error={signupError} style={{ display: 'inline-block', width: '33%' }}>
                <Message error header='Error' content={errorMessage} />
                <Form.Input placeholder='Email' onChange={(event) => setNewEmail(event.target.value)} />
                <Form.Input placeholder='Username' onChange={(event) => setNewUsername(event.target.value)} />
                <Form.Input placeholder='Password' type='password' onChange={(event) => setNewPassword(event.target.value)} />
                <Form.Button content='Sign Up' onClick={(event) => signup(event, newemail, newusername, newpassword)} />
            </Form>
            <p style={{ paddingTop: '1em' }}>Already have an account? Log in <a href="/login">here</a>.</p>
        </div>
    )
}

export default Signup
