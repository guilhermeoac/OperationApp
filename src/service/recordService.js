import axios from 'axios'
import { getCookie } from 'react-use-cookie';
import { BASE_URL } from './constants';

const getAuthToken = () => ({ Authorization: getCookie('userToken'), username: getCookie('username') })

const baseUrl = BASE_URL + "/api/v1/record"

export const getRecordListApi = async (filter) => {
  try {
    var urlParams = `?`
    if(filter != null) {
      Object.entries(filter).forEach((it) => {
        if(it[1] != null && String(it[1]) != ""){
          urlParams += (it[0] + "=" + it[1] + "&")
        }
      })
    } else urlParams = ""
    const response = await axios.get(baseUrl + urlParams, { headers: getAuthToken() })
    return Promise.resolve(response.data)
  } catch (error) {
    console.log("error" + error)
    return Promise.reject(error)
  }
}