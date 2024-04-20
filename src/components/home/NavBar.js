import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function Navbar() {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [hoverTimeout, setHoverTimeout] = useState(null);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const openDropdown = () => {
    // Cancel any existing timeout to close the dropdown
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
    setDropdownOpen(true);
  };

  const closeDropdown = () => {
    // Start a timeout to close the dropdown
    setHoverTimeout(setTimeout(() => {
      setDropdownOpen(false);
    }, 300));
  };

  return (
    <nav className="bg-green-700 text-gray-900 shadow">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img src="/img/logo_SocialGames_trans.webp" alt="Logo SocialGames" className="mr-3 w-12 h-12" />
          <span className="text-xl font-bold">GameSocial</span>
        </Link>
        <div className="flex-grow">
          <div className="max-w-xs mx-auto">
            <div className="relative">
              <input 
                type="search" 
                placeholder="Rechercher..." 
                className="px-3 py-2 rounded bg-gray-200 text-gray-700 focus:outline-none focus:bg-white focus:text-gray-900 w-full"
              />
              <button className="absolute right-2 top-2 text-pink-400 focus:outline-none">
                <span role="img" aria-label="Rechercher">🔍</span>
              </button>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Link to="/games" className="tooltip hover:text-blue-300 text-xl">
            <img src="/img/videoGamesLogoT.webp" alt="Icone manette" className="w-14 h-14" />
            <span className="tooltiptext">Liste des jeux vidéos</span>
          </Link>

          {isAuthenticated ? (
            <div className="relative"
                 onMouseEnter={openDropdown}
                 onMouseLeave={closeDropdown}>
              <button className="flex items-center focus:outline-none">
                <img src={user?.avatar_url ? `http://127.0.0.1:8000/${user.avatar_url}` : "/img/defaultUser.webp"} alt="Avatar" className="w-12 h-12 rounded-full" />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 py-2 w-48 bg-green-500 rounded shadow-lg z-50">
                  <Link to="/profile" className="block px-4 py-2 hover:bg-yellow-200">Profil</Link>
                  <Link to="/friends" className="block px-4 py-2 hover:bg-yellow-200">Liste d'amis</Link>
                  <button onClick={handleLogout} className="block px-4 py-2 w-full text-left hover:bg-yellow-200">Déconnexion</button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/register" className="hover:text-gray-300">Inscription</Link>
              <Link to="/login" className="hover:text-gray-300">Connexion</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
