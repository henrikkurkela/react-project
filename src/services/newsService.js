import axios from 'axios'

const getAll = () => {
    return axios.get('http://localhost:3001/news')
}

const patchNews = (item) => {
    return axios.patch(`http://localhost:3001/news/${item.id}`, { ...item })
}

export default getAll

export { patchNews }
