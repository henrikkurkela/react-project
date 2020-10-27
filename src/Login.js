import React, { useState } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { Header, Form, Message, Button } from 'semantic-ui-react'

import { postRequest } from './services/httpService'
import { loginToken, addUser } from './actions'

const Login = ({ auth }) => {

    const [userError, setUserError] = useState(false)
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    async function login(username, userpass) {
        setUserError(false)

        try {
            const response = await postRequest("login", { email: username, password: userpass })

            loginToken(response.data)
            window.sessionStorage.setItem('auth', response.data.auth)
            axios.defaults.headers.post['Authorization'] = `Bearer ${response.data.auth}`
        } catch (error) {
            if (error.response.data) {
                setUserError(true)
                setErrorMessage(error.response.data)
            } else {
                setUserError(true)
                setErrorMessage('Something went wrong, try again later')
            }
        }
    }

    async function demoLogin(event) {
        try {
            const response = await postRequest("signup", { email: "demo@user.com", username: 'DemoUser', password: "demouser" })
            if (response.status !== 400) {
                addUser(response.data)
            }
        } catch (error) {
            console.log(error.response.status)
        } finally {
            await login("demo@user.com", "demouser")
        }
    }

    return (auth ? <Header as='h3'>Welcome!</Header> :
        <div style={{textAlign: 'center'}}>
            <Header as='h3'>Login</Header>
            <Form error={userError} style={{ display: 'inline-block', width: '33%' }}>
                <Message error header='Error' content={errorMessage} />
                <Form.Input placeholder='Email' onChange={(event) => setUser(event.target.value)} />
                <Form.Input placeholder='Password' type='password' onChange={(event) => setPassword(event.target.value)} />
                <Form.Button content='Login' onClick={(event) => login(user, password)} />
            </Form>
            <p style={{ paddingTop: '1em' }}>No account yet? Sign up <a href="/signup">here</a>.</p>
            <Header as='h3'>Demo User</Header>
            <Button onClick={demoLogin}>Login</Button>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

const ConnectedLogin = connect(mapStateToProps)(Login)

export default ConnectedLogin

export { Login }
