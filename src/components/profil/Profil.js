import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import Jeux from './Jeux'; // Vérifiez le chemin

function Profile() {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState({
    username: '',
    biography: '',
    avatar_url: '',
    cover_photo_url: '', // ajout de l'url de la photo de couverture
    favoriteGames: [],
    posts: [],
    friends: []
  });

  useEffect(() => {
    if (user?.id) {
      const fetchData = async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get(`http://localhost:8000/api/users/${user.id}/profile`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setProfileData({
            ...response.data,
            favoriteGames: response.data.games || [],
            posts: response.data.posts || [],
            friends: response.data.friends || [],
            cover_photo_url: response.data.cover_photo_url || "/img/defaultCover.jpg", // Mettez une photo de couverture par défaut
          });
        } catch (error) {
          console.error('Erreur lors de la récupération des données:', error);
          toast.error("Impossible de récupérer les données de l'utilisateur.");
        }
      };

      fetchData();
    }
  }, [user]);

  return (
    <div className="bg-gray-200 text-gray-700 min-h-screen">
      <div className="container mx-auto p-4">
        {/* Photo de couverture */}
        <div className="relative mb-6">
          <img
            src={profileData.cover_photo_url}
            alt="Couverture"
            className="w-full h-64 object-cover rounded-lg shadow-md"
          />
          <div className="absolute bottom-0 transform translate-y-1/2 bg-white border-4 border-white rounded-full">
            {/* Photo de profil */}
            <img
              src={`http://localhost:8000/${profileData.avatar_url}`}
              alt="Profil"
              className="h-32 w-32 rounded-full object-cover"
            />
          </div>
          <button className="absolute right-0 top-0 mt-4 mr-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
            Éditer la photo de couverture
          </button>
        </div>
        {/* Informations et actions */}
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2">{profileData.username}</h1>
          <p className="text-gray-600 mb-4">{profileData.biography}</p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
            Modifier le profil
          </button>
        </div>
        {/* Section des jeux favoris */}
        <div className="mt-10">
          <Jeux games={profileData.favoriteGames} />
        </div>
        {/* Ajouter les autres sections ici */}
      </div>
    </div>
  );
}

export default Profile;
