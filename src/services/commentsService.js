import axios from 'axios'

const getAll = () => {
    return axios.get('http://localhost:3001/comments')
}

const postComment = (comment) => {
    return axios.post('http://localhost:3001/comments', comment)
}

const deleteComment = (comment) => {
    return axios.delete(`http://localhost:3001/comments/${comment.id}`)
}

export default getAll

export { postComment, deleteComment }
