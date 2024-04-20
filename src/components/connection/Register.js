import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    location: '',
    birthday: '', // Sera une chaîne de caractères au format 'YYYY-MM-DD'
  });

  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Crée un objet FormData et y ajoute les valeurs du formulaire
    const data = new FormData();
    for (const [key, value] of Object.entries(formData)) {
      data.append(key, value);
    }
    if (file) {
      data.append('avatar', file);
    }

    try {
      await axios.post('http://localhost:8000/api/register', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Inscription réussie !');
      navigate('/login');
    } catch (error) {
      toast.error('Erreur lors de l\'inscription.');
      console.error("Erreur lors de l'inscription:", error.response || error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex justify-center items-center px-6">
      <div className="max-w-md w-full space-y-8">
        <ToastContainer position="bottom-right" autoClose={2000} hideProgressBar newestOnTop closeOnClick />
        <div className="bg-gray-800 text-white shadow-xl rounded px-10 py-12">
          <h2 className="text-center text-3xl font-extrabold">Créez votre compte</h2>
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div>
              <label htmlFor="username" className="sr-only">Nom d'utilisateur</label>
              <input
                type="text"
                id="username"
                name="username"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 bg-gray-800 placeholder-gray-500 text-white rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Nom d'utilisateur"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">E-mail</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 bg-gray-800 placeholder-gray-500 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Adresse email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Mot de passe</label>
              <input
                type="password"
                id="password"
                name="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 bg-gray-800 placeholder-gray-500 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Mot de passe"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="location" className="sr-only">Pays</label>
              <input
                type="text"
                id="location"
                name="location"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 bg-gray-800 placeholder-gray-500 text-white rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Pays (facultatif)"
                value={formData.location}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="birthday" className="sr-only">Date de naissance</label>
              <input
                type="date"
                id="birthday"
                name="birthday"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Date de naissance"
                value={formData.birthday}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="avatar" className="block text-sm font-medium text-gray-200">
                Avatar (facultatif)
              </label>
              <input
                type="file"
                id="avatar"
                name="avatar"
                className="mt-1 block w-full text-sm text-gray-500 file:rounded file:border-0 file:bg-blue-600 file:py-2 file:px-4 file:text-white hover:file:bg-blue-700"
                onChange={handleFileChange}
              />
            </div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              S'inscrire
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
