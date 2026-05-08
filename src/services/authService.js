import { Request } from './httpClient'
import { getToken, removeToken, setToken } from './tokenService'

export const login = async (email, password) => {
  const response = await Request('/auth/login', {
    method: 'POST',
    body: { email, password }
  })

  const token = response?.jwtToken
  if (token) {
    setToken(token)
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
  return Request('/api/v1/auth/me')
}

export { getToken, setToken, removeToken }

export default {
  login,
  register,
  getMe,
  getToken,
  setToken,
  removeToken
}