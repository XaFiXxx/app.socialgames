import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import Jeux from './Jeux';
import PostForm from '../posts/PostForm';
import Posts from '../posts/Posts';

function Profile() {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState({
    username: '',
    biography: '',
    avatar_url: '',
    cover_url: '',
    games: [],
    posts: [],
    friends: []
  });

  useEffect(() => {
    const fetchData = async () => {
      if (user?.id) {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get(`http://localhost:8000/api/users/${user.id}/profile`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          if (response.data) {
            setProfileData(response.data);
          } else {
            throw new Error('Data not found');
          }
        } catch (error) {
          console.error('Erreur lors de la récupération des données:', error);
          toast.error("Impossible de récupérer les données de l'utilisateur.");
        }
      }
    };
  
    fetchData();
  }, [user]);

  const handleNewPost = (newPost) => {
    setProfileData(prevData => ({
      ...prevData,
      posts: [newPost, ...prevData.posts]
    }));
  };

  return (
    <div className="bg-gray-900 text-gray-700 min-h-screen">
      <div className="container mx-auto p-4">
        <div className="relative mb-6">
          <img
            src={`http://localhost:8000/${profileData.cover_url || "img/defaultCover.jpg"}`}
            alt="Couverture"
            className="w-full h-96 object-cover rounded-lg shadow-md"
          />
          <div className="absolute bottom-0 transform translate-y-1/2 bg-white border-4 border-white rounded-full">
            <img
              src={`http://localhost:8000/${profileData.avatar_url}`}
              alt="Profil"
              className="h-40 w-40 rounded-full object-cover"
            />
          </div>
          <button className="absolute right-0 top-0 mt-4 mr-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
            Éditer la photo de couverture
          </button>
        </div>

        <div className="text-center">
          <h1 className="text-4xl text-gray-200 font-bold mb-2">{profileData.username}</h1>
          <p className="text-gray-200 mb-4">{profileData.biography}</p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
            Modifier le profil
          </button>
        </div>

        <div className="mt-4 w-full max-w-4xl mx-auto ">
        <PostForm onPostSubmit={handleNewPost} />
        </div>


        <Posts posts={profileData.posts || []} />

        <div className="mt-8">
          <h2 className="text-xl text-gray-200 font-bold">Jeux préférés</h2>
          <Jeux games={profileData.games || []} />
        </div>
      </div>
    </div>
  );
}

export default Profile;
