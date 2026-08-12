import apiClient from '../api/client'

export const login = async (credentials) => {
  const response = await apiClient.post('/login', credentials)
  return response.data
}

export const register = async (userDetails) => {
  const response = await apiClient.post('/register', userDetails)
  return response.data
}
