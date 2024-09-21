import axios from 'axios'
import { BASE_URL } from './constants';

const baseUrl = BASE_URL + "/api/v1/auth"

export const signUpApi = async (body) => {
  try {
    await axios.post(baseUrl + "/signup", body)
    return Promise.resolve()
  } catch (error) {
    console.log("error" + error)
    return Promise.reject(error)
  }
}
export const signInApi = async (body) => {
  try {
    const response = await axios.post(baseUrl + "/signin", body)
    return Promise.resolve(response)
  } catch (error) {
    console.log("error" + error)
    return Promise.reject(error)
  }
}
