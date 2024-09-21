import axios from 'axios'
import { getCookie } from 'react-use-cookie';
import { BASE_URL } from './constants';

const getAuthToken = () => ({ Authorization: getCookie('userToken'), username: getCookie('username') })

const baseUrl = BASE_URL + "/api/v1/operation"

export const executeOperationApi = async (body) => {
  try {
    const response = await axios.post(`${baseUrl}?type=${body.type}`, body, { headers: getAuthToken() })
    console.log(response.data)
    return Promise.resolve(response.data)
  } catch (error) {
    console.log("error" + error)
    return Promise.reject(error)
  }
}