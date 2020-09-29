import React, { useState } from 'react'
import { Header, Form, Message } from 'semantic-ui-react'
import { postLogin, postSignup } from './services/authService'
import { loginToken } from './actions'

const Login = () => {


    const [userError, setUserError] = useState(false)
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')

    const [newUserError, setNewUserError] = useState(false)
    const [newuser, setNewUser] = useState('')
    const [newpassword, setNewPassword] = useState('')

    const [errorMessage, setErrorMessage] = useState('')

    const login = (event) => {
        event.preventDefault()
        setUserError(false)
        setNewUserError(false)
        postLogin({ email: user, password: password })
            .then((response) => {
                window.localStorage.setItem('auth', response.data.accessToken)
                loginToken(response.data.accessToken)
            })
            .catch((error) => {
                if (error.response.status === 400) {
                    setUserError(true)
                    setErrorMessage(error.response.data)
                }
            })
    }

    const signup = (event) => {
        event.preventDefault()
        setUserError(false)
        setNewUserError(false)
        postSignup({ email: newuser, password: newpassword })
            .catch((error) => {
                if (error.response.status === 400) {
                    setNewUserError(true)
                    setErrorMessage(error.response.data)
                }
            })
    }

    return (
        <>
            <Header as='h3'>Login</Header>
            <Form error={userError} style={{ display: 'inline-block' }}>
                <Message error header='Error' content={errorMessage} />
                <Form.Input placeholder='Email' onChange={(event) => setUser(event.target.value)} />
                <Form.Input placeholder='Password' type='password' onChange={(event) => setPassword(event.target.value)} />
                <Form.Button content='Login' onClick={login} />
            </Form>
            <Header as='h3'>Sign Up</Header>
            <Form error={newUserError} style={{ display: 'inline-block' }}>
                <Message error header='Error' content={errorMessage} />
                <Form.Input placeholder='Email' onChange={(event) => setNewUser(event.target.value)} />
                <Form.Input placeholder='Password' type='password' onChange={(event) => setNewPassword(event.target.value)} />
                <Form.Button content='Sign Up' onClick={signup} />
            </Form>
        </>
    )
}

export default Login