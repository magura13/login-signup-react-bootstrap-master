import axios from "axios"

const usersAPI = axios.create({baseURL:"http://localhost:8000/signin"})

 async function LoginService(data) {
    const response = await usersAPI.post('/',data)
    return response.data
}

export {LoginService}