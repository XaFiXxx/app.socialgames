import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';  // Assure-toi que le chemin d'import est correct

function Login() {
    const navigate = useNavigate();
    const { login } = useAuth(); // Utilise la fonction login du contexte Auth
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prevCredentials => ({
            ...prevCredentials,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await axios.post('http://localhost:8000/api/login', credentials);
            console.log(response.data);
            localStorage.setItem('token', response.data.token); // Stocke le token dans le localStorage
            localStorage.setItem('user', JSON.stringify(response.data.user)); // Stocke les infos de l'utilisateur
            login(response.data.user, response.data.token); // Mise à jour de l'état avec les infos de l'utilisateur
            navigate('/'); // Redirige l'utilisateur vers la page d'accueil
        } catch (error) {
            console.error("Erreur lors de la connexion", error.response);
            setError('Échec de la connexion. Veuillez vérifier vos informations.');
        }
    };
    
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-700">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-100">
                        Connectez-vous à votre compte
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <input type="hidden" name="remember" value="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email" className="sr-only">Adresse email</label>
                            <input 
                                id="email" 
                                name="email" 
                                type="email" 
                                autoComplete="email" 
                                required 
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" 
                                placeholder="Adresse email"
                                value={credentials.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Mot de passe</label>
                            <input 
                                id="password" 
                                name="password" 
                                type="password" 
                                autoComplete="current-password" 
                                required 
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" 
                                placeholder="Mot de passe"
                                value={credentials.password}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div>
                        <button 
                            type="submit" 
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
