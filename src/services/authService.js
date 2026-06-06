import { Request } from './httpClient'
import { getToken, removeToken, setToken, getRefreshToken, setRefreshToken, removeRefreshToken } from './tokenService'

export const login = async (email, password) => {
  const response = await Request('/auth/login', {
    method: 'POST',
    body: { email, password }
  })

  // ✅ Store both tokens
  if (response?.jwtToken) {
    setToken(response.jwtToken)
  }
  if (response?.refreshToken) {
    setRefreshToken(response.refreshToken)
  }

  return response
}

export const register = async (userData) => {
  return Request('/auth/register', {
    method: 'POST',
    body: userData
  })
}

export const getMe = async () => {
  return Request('/auth/me')
}


export const refreshAccessToken = async () => {
  const accessToken = getToken()
  const refreshToken = getRefreshToken()

  if (!accessToken || !refreshToken) {
    throw new Error('No tokens available')
  }

  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/refresh-token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ accessToken, refreshToken })
  })

  if (!response.ok) {
    removeToken()
    removeRefreshToken()
    throw new Error('Refresh token expired. Please log in again.')
  }

  const data = await response.json()

  // ✅ Store new tokens
  setToken(data.accessToken)
  setRefreshToken(data.refreshToken)

  return data.accessToken
}

export const updateMe = async (data) => {
  return Request('/auth/me', {
    method: 'PUT',
    body: data
  })
}

export const getGuideProfile = async () => {
  return Request('/tour-guides/me')
}

export const updateGuideProfile = async (data) => {
  return Request('/tour-guides/me', {
    method: 'PUT',
    body: data
  })
}


export {
  getToken,
  setToken,
  removeToken,
  getRefreshToken,
  setRefreshToken,
  removeRefreshToken
}
