import axios from 'axios'

import { backendUrl } from '../../constants'

axios.defaults.baseURL = backendUrl

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
