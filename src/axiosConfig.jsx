import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true, // Important pour les cookies
});

// Ajouter un intercepteur pour inclure le token CSRF
api.interceptors.request.use(
  async config => {
    // Obtenir le token CSRF depuis les cookies
    const xsrfToken = document.cookie.split(';').find(cookie => cookie.trim().startsWith('XSRF-TOKEN='));
    if (xsrfToken) {
      config.headers['X-XSRF-TOKEN'] = decodeURIComponent(xsrfToken.split('=')[1]);
    }
    return config;
  },
  error => Promise.reject(error)
);

export default api;
