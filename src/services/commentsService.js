import axios from 'axios'

const getAll = () => {
    return axios.get('http://localhost:3001/comments')
}

const postComment = (comment) => {
    return axios.post('http://localhost:3001/comments', comment)
}

export default getAll

export { postComment }
