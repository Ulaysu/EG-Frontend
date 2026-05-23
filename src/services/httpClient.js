import { API_BASE_URL } from "@/config/env"
import { getToken, removeToken, removeRefreshToken } from "@/services/tokenService"
import { refreshAccessToken } from "@/services/authService"

const DEFAULT_TIMEOUT = 10000

function buildURL(path) {
  if (!API_BASE_URL) throw createAppError('Missing API base URL')

  if (/^https?:\/\//i.test(path)) {
    return path
  }

  if (path.startsWith('/api/')) {
    return new URL(path, API_BASE_URL).toString()
  }

  const cleanPath = path.replace(/^\/+/, '')
  return new URL(cleanPath, API_BASE_URL + '/').toString()
}

function createAppError(message, { statusCode = null, code = 'REQUEST_FAILED', cause = null } = {}) {
  return { message, statusCode, code, cause }
}

// Core fetch logic extracted so we can retry after refresh
async function executeRequest(path, { method = 'GET', headers = {}, body, token } = {}) {
  const response = await fetch(buildURL(path), {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers
    },
    body: body ? JSON.stringify(body) : undefined
  })

  const contentType = response.headers.get('content-type') || ''
  const isJson = contentType.includes('application/json')
  const payload = isJson ? await response.json() : null

  return { response, payload }
}

let isRefreshing = false // prevent multiple simultaneous refresh calls

export async function Request(path, { method = 'GET', headers = {}, body, timeout = DEFAULT_TIMEOUT } = {}) {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeout)

  try {
    const token = getToken()
    let { response, payload } = await executeRequest(path, { method, headers, body, token })

    // If 401 and not already refreshing, try to refresh
    if (response.status === 401 && !isRefreshing) {
      isRefreshing = true

      try {
        const newToken = await refreshAccessToken()
        
        // Retry the original request with the new token
        const retried = await executeRequest(path, { method, headers, body, token: newToken })
        
        if (!retried.response.ok) {
          throw createAppError(retried.payload?.message || 'Request failed', {
            statusCode: retried.response.status,
            code: 'HTTP_ERROR',
            cause: retried.payload
          })
        }

        return retried.payload

      } catch {
        //Refresh failed — clear everything and redirect to login
        removeToken()
        removeRefreshToken()
        window.location.href = '/login'
        return
      } finally {
        isRefreshing = false
      }
    }

    if (!response.ok) {
      throw createAppError(payload?.message || 'Request failed', {
        statusCode: response.status,
        code: 'HTTP_ERROR',
        cause: payload
      })
    }

    return payload

  } catch (error) {
    if (error?.name === 'AbortError') {
      throw createAppError('Request timed out. Please try again.', {
        statusCode: null,
        code: 'TIMEOUT',
        cause: error
      })
    }

    if (error?.code) throw error

    throw createAppError('Unable to reach the server. Please check your connection.', {
      statusCode: null,
      code: 'NETWORK_ERROR',
      cause: error
    })
  } finally {
    clearTimeout(timeoutId)
  }
}

export { createAppError }
