import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});

// Ajouter un intercepteur pour inclure le token CSRF et le token d'authentification
api.interceptors.request.use(
  config => {
    // Obtenir le token CSRF depuis les cookies
    const xsrfToken = Cookies.get('XSRF-TOKEN');
    if (xsrfToken) {
      config.headers['X-XSRF-TOKEN'] = xsrfToken;
    }
    
    // Obtenir le token d'authentification depuis les cookies
    const authToken = Cookies.get('token');
    if (authToken) {
      config.headers['Authorization'] = `Bearer ${authToken}`;
    }
    
    return config;
  },
  error => Promise.reject(error)
);

export default api;
