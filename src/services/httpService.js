import axios from 'axios'

axios.defaults.baseURL = `http://localhost:3001/`

const getRequest = (url) => {
    return axios.get(url)
}

const postRequest = (url, item) => {
    return axios.post(url, item)
}

const patchRequest = (url, item) => {
    return axios.patch(url, item)
}

const deleteRequest = (url) => {
    return axios.delete(url)
}

export { getRequest, postRequest, patchRequest, deleteRequest }
