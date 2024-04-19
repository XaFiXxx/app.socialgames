import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';

function Profile() {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState({
    username: '',
    biography: '',
    avatar_url: '',
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
            friends: response.data.friends || []
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
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="container mx-auto p-4">
        <div className="flex flex-col items-center">
          <img
            src={profileData.avatar_url ? `http://127.0.0.1:8000/${profileData.avatar_url}` : "/img/defaultUser.webp"}
            alt={profileData.username}
            className="rounded-full w-32 h-32 object-cover"
          />
          <h1 className="text-2xl font-bold mt-4">{profileData.username}</h1>
          <p className="text-gray-400">{profileData.biography}</p>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-bold">Jeux préférés</h2>
          <div className="grid grid-cols-3 gap-4">
            {profileData.favoriteGames.map(game => (
              <div key={game.id} className="card">
               <img src={`http://127.0.0.1:8000/${game.cover_image}`} alt={game.name} className="w-full h-32 object-cover rounded-lg" />
                <div className="p-2 text-center">{game.name}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-bold">Derniers posts</h2>
          <ul>
            {profileData.posts.map(post => (
              <li key={post.id} className="p-2">{post.content}</li>
            ))}
          </ul>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-bold">Amis</h2>
          <ul>
            {profileData.friends.map(friend => (
              <li key={friend.id} className="p-2">{friend.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Profile;
