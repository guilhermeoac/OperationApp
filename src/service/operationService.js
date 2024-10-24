import axios from 'axios'
import { getCookie } from 'react-use-cookie';
import { BASE_URL } from './constants';

const getAuthToken = () => ({ Authorization: getCookie('userToken'), username: getCookie('username') })

const baseUrl = BASE_URL + "/api/v1/operation"

export const executeOperationApi = async (body) => {
  try {
    const response = await axios.post(`${baseUrl}?type=${body.type}`, body, { headers: getAuthToken() })
    return Promise.resolve({data: response.data, success: true})
  } catch (error) {
    console.log("error" + error)
    return {data: error.response.data, error: error.response.data, status: error.response.status, success: false}
  }
}

  export const getAllOperationsApi = async () => {
    try {
      const response = await axios.get(baseUrl, { headers: getAuthToken() })
      return Promise.resolve({data: response.data, success: true})
    } catch (error) {
      console.log("error" + error)
      return {data: error.response.data, error: error.response.data, status: error.response.status, success: false}
    }
}