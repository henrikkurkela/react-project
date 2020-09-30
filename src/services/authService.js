import axios from 'axios'

const postLogin = (user) => {
    return axios.post('http://localhost:3001/login', user)
}

const postSignup = (user) => {
    return axios.post('http://localhost:3001/signup', user)
}

async function deleteUser(user) {
    let userinfo = await axios.get(`http://localhost:3001/users?email=${user.user}`)
    return axios.delete(`http://localhost:3001/users/${userinfo.data[0].id}`)
}

export { postLogin, postSignup, deleteUser }
