import axios from 'axios'

const postLogin = (user) => {
    return axios.post('http://localhost:3001/login', user)
}

const postSignup = (user) => {
    return axios.post('http://localhost:3001/signup', user)
}

export { postLogin, postSignup }