import axios from "axios"

const usersAPI = axios.create({baseURL:"https://api-typescript-express.onrender.com/user"})

 async function SignUp(data) {
    const response = await usersAPI.post('/',data)
    return response.data
}

export {SignUp}