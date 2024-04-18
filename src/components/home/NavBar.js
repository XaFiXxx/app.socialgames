import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function Navbar() {
    const navigate = useNavigate();
    const { isAuthenticated, user, logout } = useAuth();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-gray-900 text-white shadow-lg">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <div className="text-lg font-bold">
                    <Link to="/">GameSocial</Link>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="relative">
                        <input 
                            type="search" 
                            placeholder="Rechercher..." 
                            className="px-3 py-2 rounded bg-gray-700 text-white focus:bg-white focus:text-gray-900"
                        />
                        <div className="absolute right-3 top-2 text-gray-400">🔍</div>
                    </div>
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
                    </ul>
                    {isAuthenticated && user ? (
                        <div className="relative"
                             onMouseEnter={() => setDropdownOpen(true)}
                             onMouseLeave={() => setDropdownOpen(false)}
                        >
                            <button className="focus:outline-none">
                                {user.username}
                            </button>
                            {dropdownOpen && (
                                <div className={`absolute right-0 mt-2 py-2 w-48 bg-gray-800 rounded shadow-xl 
                                                transition-opacity duration-300 ease-out ${dropdownOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                                    <Link to="/profile" className="block px-4 py-2 hover:bg-gray-700">Profil</Link>
                                    <Link to="/settings" className="block px-4 py-2 hover:bg-gray-700">Paramètres</Link>
                                    <button onClick={handleLogout} className="block px-4 py-2 w-full text-left hover:bg-gray-700">Déconnexion</button>
                                </div>
                            )}
                        </div>
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
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
