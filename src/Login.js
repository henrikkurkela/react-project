import React, { useState } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { Header, Form, Message, Button } from 'semantic-ui-react'
import { postRequest, getRequest } from './services/httpService'
import { loginToken } from './actions'

const Login = ({ auth }) => {
    const [userError, setUserError] = useState(false)
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')

    const [errorMessage, setErrorMessage] = useState('')

    async function login(username, userpass) {
        setUserError(false)

        try {
            let response = await postRequest("login", { email: username, password: userpass })
            let userdata = await getRequest(`users/?email=${username}`)

            loginToken({ auth: response.data.auth, user: username, id: userdata.data[0].id })
            window.sessionStorage.setItem('auth', response.data.auth)
            axios.defaults.headers.post['Authorization'] = `Bearer ${response.data.auth}`
        } catch (error) {
            if (error.response.status === 400) {
                setUserError(true)
                setErrorMessage(error.response.data)
            }
        }
    }

    async function demoLogin(event) {
        try {
            await postRequest("signup", { email: "demo@user.com", password: "demouser" })
        } catch (error) {
            console.log(error.response.data)
        }
        await login("demo@user.com", "demouser")
    }

    return (auth ? <Header as='h3'>Welcome!</Header> :
        <>
            <Header as='h3'>Login</Header>
            <Form error={userError} style={{ display: 'inline-block' }}>
                <Message error header='Error' content={errorMessage} />
                <Form.Input placeholder='Email' onChange={(event) => setUser(event.target.value)} />
                <Form.Input placeholder='Password' type='password' onChange={(event) => setPassword(event.target.value)} />
                <Form.Button content='Login' onClick={(event) => login(user, password)} />
            </Form>
            <p>No account yet? sign up <a href="/signup">here</a>.</p>
            <Header as='h3'>Demo User</Header>
            <Button onClick={demoLogin}>Login</Button>
        </>
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
