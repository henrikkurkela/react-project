import axios from 'axios'

const getAll = () => {
    return axios.get('http://localhost:3001/news')
}

export default getAll
