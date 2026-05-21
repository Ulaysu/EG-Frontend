import { defineStore } from 'pinia'
import { login as loginRequest, register as registerRequest, getMe } from '../services/authService'
import { getToken, removeToken, setToken, getRefreshToken, setRefreshToken, removeRefreshToken, isTokenValid } from '../services/tokenService'

const getAuthTokenFromResponse = (response) => response?.token || response?.jwtToken || response?.accessToken
const getUserFromResponse = (response) => response?.user || response?.data?.user || response?.data || response || null

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: getToken(),
    isRestoringSession: false
  }),

  getters: {
    isAuthenticated: (state) => Boolean(state.token) && isTokenValid()
  },

  actions: {
    async login(email, password) {
      const response = await loginRequest(email, password)
      const token = getAuthTokenFromResponse(response)

      if (token) {
        this.token = token
        setToken(token)
      }

      // ✅ Store refresh token
      if (response?.refreshToken) {
        setRefreshToken(response.refreshToken)
      }

      const user = getUserFromResponse(response)
      if (user) this.user = user

      return response
    },

    async register(userData) {
      const response = await registerRequest(userData)
      const token = getAuthTokenFromResponse(response)

      if (token) {
        this.token = token
        setToken(token)

        const user = getUserFromResponse(response)
        if (user) this.user = user
      }

      return response
    },

    logout() {
      this.user = null
      this.token = null
      removeToken()
      removeRefreshToken() // ✅ clear refresh token on logout
    },

    async fetchMe() {
      const response = await getMe()
      const user = getUserFromResponse(response)
      this.user = user
      return user
    },

    async restoreSession() {
      const token = getToken()

      if (!token) {
        this.logout()
        return null
      }

      this.token = token
      this.isRestoringSession = true

      try {
        return await this.fetchMe()
      } catch (error) {
        this.logout()
        throw error
      } finally {
        this.isRestoringSession = false
      }
    }
  }
})