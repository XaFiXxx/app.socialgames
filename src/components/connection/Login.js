import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prevCredentials => ({
      ...prevCredentials,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post('http://localhost:8000/api/login', credentials);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      login(response.data.user, response.data.token);
      toast.success('Connexion réussie !');
      setTimeout(() => navigate('/'), 1000);
    } catch (error) {
      console.error("Erreur lors de la connexion", error.response);
      setError('Échec de la connexion. Veuillez vérifier vos informations.');
      toast.error('Échec de la connexion.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 flex justify-center items-center">
      <div className="max-w-md w-full">
        <ToastContainer position="bottom-right" autoClose={2000} hideProgressBar={true} newestOnTop={true} closeOnClick />
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div>
            <h2 className="text-center text-3xl font-extrabold text-gray-700">Connectez-vous à votre compte</h2>
          </div>
          <div className="mb-4 mt-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              E-mail
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Adresse email"
              value={credentials.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Mot de passe"
              value={credentials.password}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Se connecter
            </button>
          </div>
        </form>
        {error && <p className="mt-2 text-center text-sm text-red-600">{error}</p>}
      </div>
    </div>
  );
}

export default Login;
