import axios from 'axios';
import {HeaderService} from '../services/auth_service'

// Config defaults
//----------------------------
// Config baseURL
axios.defaults.baseURL = process.env.REACT_APP_API_URL
// Config authentication info
axios.defaults.headers.common["Accept"] = "application/json"
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'


const service = new HeaderService()
// Request interceptor
axios.interceptors.request.use(config => {
  service.setAuthHeaders(config)
  return config
})
// Response interceptor
axios.interceptors.response.use( response => {
  service.persistAuthHeadersInLocalStorage(response.headers)
  return response
})

// Public axios
//----------------------------
window.axios = axios