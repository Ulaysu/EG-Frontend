const rawBaseURL = import.meta.env.VITE_API_BASE_URL;

if(!rawBaseURL) {
  console.warn('VITE_API_BASE_URL is not set. Please set it in your .env file.');
}

export const API_BASE_URL = (rawBaseURL || '').replace(/\/+$/, ''); // Remove trailing slashes  
