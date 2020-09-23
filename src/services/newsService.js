import axios from 'axios'

const getAll = () => {
    return axios.get('http://localhost:3001/news')
}

const patchNews = (id, item) => {
    return axios.patch(`http://localhost:3001/news/${id}`, { ...item })
}

export default getAll

export { patchNews }
