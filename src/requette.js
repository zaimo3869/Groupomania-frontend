
import axios from 'axios'

const b = localStorage.getItem('token')

export default axios.create({
    baseURL:"http://localhost:3000/api",
    headers:{"Content-type" : "application/json",
    Authorization: 'Bearer ' + b}
    
})
