import axios from "axios"

const usersAPI = axios.create({baseURL:"http://localhost:8000/user"})

 async function SignUp(data) {
    const response = await usersAPI.post('/',data)
    return response.data
}

export {SignUp}