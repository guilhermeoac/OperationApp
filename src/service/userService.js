import axios from 'axios'
import { getCookie } from 'react-use-cookie';
import { BASE_URL } from './constants';

const getAuthToken = () => ({ Authorization: getCookie('userToken'), username: getCookie('username') })

const baseUrl = BASE_URL + "/api/v1/user"

export const getUserByUsernameApi = async () => {
  try {
    const response = await axios.get(`${baseUrl}/username`, { headers: getAuthToken() })
    return Promise.resolve({data: response.data, success: true})
  } catch (error) {
    console.log(error)
    return {data: error.response.data, status: error.response.status, success: false}
  }
}