import axios from 'axios'

const api = axios.create({
    baseURL: "http://54.82.122.205:3000"
})

export default api