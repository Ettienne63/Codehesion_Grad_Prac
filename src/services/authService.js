import axios from 'axios'
import apiClient from '../api/client'

const API_BASE_URL = 'https://edeaf-api-staging.azurewebsites.net'
const TOKEN_STORAGE_KEY = 'access_token'
const REFRESH_TOKEN_STORAGE_KEY = 'refresh_token'
const TOKEN_EXPIRES_AT_STORAGE_KEY = 'token_expires_at'

export const getAccessToken = () => localStorage.getItem(TOKEN_STORAGE_KEY)

export const isLoggedIn = () => {
  const token = getAccessToken()
  const expiresAt = Number(localStorage.getItem(TOKEN_EXPIRES_AT_STORAGE_KEY))

  return Boolean(token && expiresAt && Date.now() < expiresAt)
}

export const logout = () => {
  localStorage.removeItem(TOKEN_STORAGE_KEY)
  localStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY)
  localStorage.removeItem(TOKEN_EXPIRES_AT_STORAGE_KEY)
}

const storeTokens = (tokenResponse) => {
  const expiresAt = Date.now() + tokenResponse.expires_in * 1000

  localStorage.setItem(TOKEN_STORAGE_KEY, tokenResponse.access_token)
  localStorage.setItem(TOKEN_EXPIRES_AT_STORAGE_KEY, String(expiresAt))

  if (tokenResponse.refresh_token) {
    localStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, tokenResponse.refresh_token)
  }
}

export const login = async ({ email, password }) => {
  const formData = new URLSearchParams({
    grant_type: 'password',
    username: email,
    password,
    client_id: 'web-dashboard',
    client_secret: 'SuperSecretPassword',
    scope: 'openid profile role email offline_access adminApi mobileApi',
  })

  const response = await axios.post(`${API_BASE_URL}/connect/token`, formData, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })

  storeTokens(response.data)
  return response.data
}

export const inviteUser = async (userDetails) => {
  const response = await apiClient.post('/v1/admin/Users', userDetails)
  return response.data
}
