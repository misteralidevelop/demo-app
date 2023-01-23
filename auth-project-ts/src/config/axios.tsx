import axioss from 'axios'
import { API_URL as BASE_URL_API } from '../utils/AppUtils'
const axios = axioss.create({
  baseURL: BASE_URL_API,
  timeout: 0,
  headers: {
    'Access-Control-Allow-Headers': 'X-Requested-With',
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
})

axios.interceptors.response.use(function (response) {
  return response
})

export default axios
