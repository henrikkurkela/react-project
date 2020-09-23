import axios from 'axios'

const getAll = () => {
    return axios.get('http://localhost:3001/news')
}

const patchStoryLikes = (item) => {
    return axios.patch(`http://localhost:3001/news/${item.id}`, { likes: item.likes })
}

export default getAll

export { patchStoryLikes }
