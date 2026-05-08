import { API_BASE_URL } from "@/config/env";
import {getToken}

const DEFAULT_TIMEOUT = 10000; // 10 seconds

function buildURL(path) {
  if (!API_BASE_URL) {
    throw createAppError('Missing API base URL');
  }

  // remove leading slash to avoid path reset
  const cleanPath = path.replace(/^\/+/, '');

  const url = new URL(cleanPath, API_BASE_URL + '/').toString();

  console.log('FINAL URL:', url);

  return url;
}

function createAppError(message, {statusCode = null, code = 'REQUEST FAILED', cause = null} = {}) {
    return { message, statusCode, code, cause };
}

export async function Request(path, { method = 'GET', headers = {}, body, timeout = DEFAULT_TIMEOUT } = {}){
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

      try {
    const response = await fetch(buildURL(path), {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal
    })

     // 👇 ADD DEBUG LOGS HERE
    console.log('STATUS:', response.status);
    console.log('CONTENT-TYPE:', response.headers.get('content-type'));

    const contentType = response.headers.get('content-type') || ''
    const isJson = contentType.includes('application/json')
    const payload = isJson ? await response.json() : null
 console.log('PAYLOAD:', payload); // Log the raw payload for debugging
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