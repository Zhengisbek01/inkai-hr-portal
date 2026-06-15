import axios from 'axios'

const BASE_URL = (import.meta as any).env?.VITE_API_URL || '/api'

const client = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
})

client.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

let refreshing = false
client.interceptors.response.use(
  (res) => res,
  async (err) => {
    if (err.response?.status !== 401 || refreshing) return Promise.reject(err)
    refreshing = true
    try {
      const { data } = await client.post('/auth/refresh')
      localStorage.setItem('token', data.accessToken)
      err.config.headers.Authorization = `Bearer ${data.accessToken}`
      return client(err.config)
    } catch {
      localStorage.removeItem('token')
      window.location.href = '/login'
      return Promise.reject(err)
    } finally {
      refreshing = false
    }
  }
)

export default client
