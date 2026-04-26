import { API_BASE_URL } from "@/config/env";

const DEFAULT_TIMEOUT = 10000; // 10 seconds

function buildURL(path) {
    if(!path.startsWith('/')) {
        throw new Error('Path must start with a forward slash (/)');
    }

  if (!API_BASE_URL) {
    throw createAppError('API base URL is missing. Set VITE_API_BASE_URL in your environment.', {
      statusCode: null,
      code: 'MISSING_API_BASE_URL'
    });
  }}

function createAppError(message, {statusCode = null, code = 'REQUEST FAILED', cause = null} = {}) {
    return { message, statusCode, code, cause };
}

export async function Request(path, { method = 'GET', headers = {}, body, timeout = DEFAULT_TIMEOUT } = {}){
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

      try {
    const response = await fetch(buildUrl(path), {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal
    })

    const contentType = response.headers.get('content-type') || ''
    const isJson = contentType.includes('application/json')
    const payload = isJson ? await response.json() : null

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

    if (error?.code) {
      throw error
    }

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