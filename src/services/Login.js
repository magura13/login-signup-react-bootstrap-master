import axios from "axios"

const usersAPI = axios.create({baseURL:"https://api-typescript-express.onrender.com/signin"})

 async function LoginService(data) {
    const response = await usersAPI.post('/',data)
    return response.data
}

export {LoginService}