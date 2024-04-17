import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { useAuth } from '../../context/AuthContext'; // Assure-toi que le chemin est correct

function Navbar() {
    const navigate = useNavigate();
    const { isAuthenticated, user, logout } = useAuth();

    // Fonction de déconnexion qui nettoie l'état et redirige l'utilisateur
    const handleLogout = () => {
        logout();
        navigate('/login');  // Redirige l'utilisateur après la déconnexion
    };

    return (
        <nav className="bg-gray-900 text-white shadow-lg">
            <div className="container mx-auto px-4 py-6 flex justify-between items-center">
                <div className="text-lg font-bold">
                    <Link to="/">GameSocial</Link>
                </div>
                <div>
                    <ul className="flex space-x-4">
                        <li>
                            <Link to="/" className="hover:text-gray-300">Accueil</Link>
                        </li>
                        <li>
                            <Link to="/games" className="hover:text-gray-300">Jeux</Link>
                        </li>
                        <li>
                            <Link to="/about" className="hover:text-gray-300">À propos</Link>
                        </li>
                        {isAuthenticated ? (
                            <>
                                <li>
                                    <span className="hover:text-gray-300">{user ? user.username : "Chargement..."}</span>
                                </li>
                                <li>
                                    <button onClick={handleLogout} className="hover:text-gray-300" aria-label="Déconnexion">Déconnexion</button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link to="/register" className="hover:text-gray-300">Inscription</Link>
                                </li>
                                <li>
                                    <Link to="/login" className="hover:text-gray-300">Connexion</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
