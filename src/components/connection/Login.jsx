import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../axiosConfig'; // Assurez-vous que le chemin est correct

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [credentials, setCredentials] = useState({ identifier: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!credentials.identifier || !credentials.password) {
      toast.error('Veuillez remplir tous les champs requis.');
      return;
    }
    try {
      // Obtenir le token CSRF
      await api.get('/sanctum/csrf-cookie');
      // Soumettre les informations de connexion
      const response = await api.post('/api/login', credentials);
      login(response.data.user, response.data.token); // Utiliser uniquement les données de l'utilisateur
      navigate('/');
    } catch (err) {
      console.error("Erreur lors de la connexion", err.response);
      setError('Échec de la connexion. Veuillez vérifier vos informations.');
      toast.error('Échec de la connexion.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex justify-center items-center px-6">
      <div className="max-w-md w-full space-y-8">
        <ToastContainer position="bottom-right" autoClose={2000} hideProgressBar newestOnTop closeOnClick />
        <div className="bg-gray-800 text-white shadow-xl rounded px-10 py-12">
          <h2 className="text-center text-3xl font-extrabold">Connectez-vous à votre compte</h2>
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="identifier" className="sr-only">E-mail ou Nom d'utilisateur</label>
                <input
                  type="text"
                  id="identifier"
                  name="identifier"
                  autoComplete="username"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 bg-gray-800 placeholder-gray-500 text-white rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="E-mail ou Nom d'utilisateur"
                  value={credentials.identifier}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">Mot de passe</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 bg-gray-800 placeholder-gray-500 text-white rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Mot de passe"
                  value={credentials.password}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-700 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-400">
                  Se souvenir de moi
                </label>
              </div>
              <div className="text-sm">
                <Link to="/forgot-password" className="font-medium text-blue-500 hover:text-blue-400">
                  Mot de passe oublié ?
                </Link>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Se connecter
              </button>
            </div>
            <div className="text-center">
              <Link to="/register" className="font-medium text-blue-500 hover:text-blue-400">
                Vous n'avez pas de compte ? Inscrivez-vous
              </Link>
            </div>
          </form>
          {error && <p className="text-center text-sm text-red-400">{error}</p>}
        </div>
      </div>
    </div>
  );
}

export default Login;
