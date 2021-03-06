import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Header, Form, Message } from 'semantic-ui-react'

import { postRequest } from 'services/http'
import { loginToken } from 'actions'

const Login = () => {

    const auth = useSelector(state => state.auth)

    const [userError, setUserError] = useState(false)
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const history = useHistory()

    async function login(username, userpass) {
        setUserError(false)

        try {
            const response = await postRequest("login", { email: username, password: userpass })
            loginToken(response.data)
            history.push('/')
        } catch (error) {
            if (error.response?.data) {
                setUserError(true)
                setErrorMessage(error.response?.data)
            } else {
                setUserError(true)
                setErrorMessage('Something went wrong, try again later')
            }
        }
    }

    return (auth ?
        <div style={{ margin: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Header as='h3'>Welcome!</Header>
        </div> :
        <div style={{ textAlign: 'center' }}>
            <Header as='h3'>Login</Header>
            <Form error={userError} style={{ display: 'inline-block', width: '33%', minWidth: '234px' }}>
                <Message error header='Error' content={errorMessage} />
                <Form.Input required placeholder='Email' onChange={(event) => setUser(event.target.value)} />
                <Form.Input required placeholder='Password' type='password' onChange={(event) => setPassword(event.target.value)} />
                <Form.Button content='Login' onClick={() => login(user, password)} />
            </Form>
            <p style={{ paddingTop: '1em' }}>No account yet? Sign up <a href="/signup">here</a>.</p>
        </div>
    )
}

export default Login
