import { defineStore } from 'pinia'
import { login as loginRequest, register as registerRequest, getMe } from '../services/authService'
import { getToken, removeToken, setToken } from '../services/tokenService'

const getAuthTokenFromResponse = (response) => response?.token || response?.jwtToken || response?.accessToken
const getUserFromResponse = (response) => response?.user || response?.data?.user || null

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: getToken()
  }),

  getters: {
    isAuthenticated: (state) => Boolean(state.token)
  },

  actions: {
    async login(email, password) {
      const response = await loginRequest(email, password)
      const token = getAuthTokenFromResponse(response)

      if (token) {
        this.token = token
        setToken(token)
      }

      const user = getUserFromResponse(response)
      if (user) {
        this.user = user
      }

      return response
    },

    async register(userData) {
      const response = await registerRequest(userData)
      const token = getAuthTokenFromResponse(response)

      if (token) {
        this.token = token
        setToken(token)

        const user = getUserFromResponse(response)
        if (user) {
          this.user = user
        }
      }

      return response
    },

    logout() {
      this.user = null
      this.token = null
      removeToken()
    },

    async fetchMe() {
      const user = await getMe()
      this.user = user
      return user
    }
  }
})