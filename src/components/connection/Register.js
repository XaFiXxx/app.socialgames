import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importe useNavigate

function Register() {
  const navigate = useNavigate(); // Utilise useNavigate pour la redirection
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    avatar_url: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/register', formData);
      console.log(response.data);
      navigate('/login'); // Redirige vers la page de connexion après une inscription réussie
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error.response || error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 flex justify-center items-center">
      <div className="max-w-md w-full">
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Nom d'utilisateur
            </label>
            <input
              type="text"
              id="username"
              name="username"
              required
              onChange={handleChange}
              value={formData.username}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              E-mail
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              onChange={handleChange}
              value={formData.email}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              onChange={handleChange}
              value={formData.password}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="avatar_url">
              URL de l'avatar (facultatif)
            </label>
            <input
              type="text"
              id="avatar_url"
              name="avatar_url"
              onChange={handleChange}
              value={formData.avatar_url}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              S'inscrire
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
