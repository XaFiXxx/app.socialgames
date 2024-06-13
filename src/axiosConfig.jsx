import axios from 'axios';
import Cookies from 'js-cookie';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

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

// Ajouter un intercepteur pour vérifier les réponses 401 et afficher un message
api.interceptors.response.use(
  response => response,
  async error => {
    const { response } = error;
    if (response && response.status === 401) {
      console.log('Token expired. Attempting to log out.');

      // Envoyer une requête de révocation de token
      try {
        const token = Cookies.get('token');
        if (token) {
          console.log('Revoking token:', token);
          await axios.post(`${process.env.REACT_APP_API_URL}/api/logout`, {}, {
            headers: { Authorization: `Bearer ${token}` }
          });
          console.log('Token revoked successfully.');
        }
      } catch (err) {
        console.error('Failed to revoke token:', err);
      }

      Cookies.remove('token');
      Cookies.remove('user');
      console.log('Cookies removed.');

      confirmAlert({
        title: 'Session Expirée',
        message: 'Votre session a expiré. Vous allez être redirigé vers la page de connexion.',
        buttons: [
          {
            label: 'OK',
            onClick: () => {
              window.location.href = '/'; // Redirige immédiatement
            }
          }
        ],
        closeOnEscape: false,
        closeOnClickOutside: false
      });
    }
    return Promise.reject(error);
  }
);

export default api;
