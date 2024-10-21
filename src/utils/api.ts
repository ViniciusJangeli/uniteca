import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:3001',
    timeout: 5000,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
})

export default api