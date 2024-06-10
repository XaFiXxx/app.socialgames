import React, { useState, useEffect } from "react";
import api from '../../axiosConfig'; // Assurez-vous que le chemin est correct
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import Jeux from "./Jeux";
import PostForm from "../posts/PostForm";
import Posts from "../posts/Posts";

function Profile() {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState({
    username: "",
    biography: "",
    avatar_url: "",
    cover_url: "",
    games: [],
    posts: [],
    friends: [],
    platforms: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      if (user?.id) {
        try {
          const token = localStorage.getItem("token");
          const response = await api.get(
            `/api/users/${user.id}/profile`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          if (response.data) {
            setProfileData(response.data);
            console.log(response.data);
          } else {
            throw new Error("Data not found");
          }
        } catch (error) {
          console.error("Erreur lors de la récupération des données:", error);
          toast.error("Impossible de récupérer les données de l'utilisateur.");
        }
      }
    };

    fetchData();
  }, [user]);

  const handleNewPost = (newPost) => {
    setProfileData((prevData) => ({
      ...prevData,
      posts: [newPost, ...prevData.posts],
    }));
  };

  const sortedPosts = profileData.posts.slice().sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  return (
    <div className="bg-gray-900 text-gray-700 min-h-screen">
      <div className="container mx-auto p-4">
        <div className="relative mb-6">
          <img
            src={`${process.env.REACT_APP_API_URL}/${
              profileData.cover_url || "img/defaultCover.jpg"
            }`}
            alt="Couverture"
            className="w-full h-96 object-cover rounded-lg shadow-md"
          />
          <div className="absolute bottom-0 transform translate-y-1/2 bg-white border-4 border-white rounded-full">
            <img
              src={`${process.env.REACT_APP_API_URL}/${profileData.avatar_url}`}
              alt="Profil"
              className="h-40 w-40 rounded-full object-cover"
            />
            <button
              className="btn btn-blue absolute right-1 bottom-2 flex items-center justify-center"
              title="Éditer la photo de profil"
            >
              <span className="material-symbols-outlined">photo_camera</span>
            </button>
          </div>
          <button
            className="btn btn-blue absolute right-0 bottom-0 mb-4 mr-4 flex items-center justify-center space-x-2"
            title="Éditer la photo de couverture"
          >
            <span className="material-symbols-outlined">photo_camera</span>
            <span>Éditer la photo de couverture</span>
          </button>
        </div>

        <div className="text-center">
          <h1 className="text-4xl text-gray-200 font-bold">
            {profileData.username}
          </h1>
          <p className="text-gray-200 mb-4">{profileData.biography}</p>
          <button className="btn btn-blue" title="Modifier le profil">
            <span className="material-symbols-outlined align-middle text-lg">
              edit
            </span>
            <span className="ml-2">Modifier le profil</span>
          </button>
        </div>

        {/* Section pour afficher les plateformes */}
        <div className="mt-8">
          <div className="flex flex-wrap justify-center gap-4">
            {profileData.platforms.map((platform) => (
              <div
                key={platform.id}
                className="bg-green-700 text-gray-200 rounded px-4 py-2 shadow"
              >
                {platform.name}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 w-full max-w-4xl mx-auto ">
          <PostForm onPostSubmit={handleNewPost} />
        </div>

        <section className="flex flex-col items-center mt-8">
          <h2 className="text-xl text-gray-200 font-bold text-center">
            Vos Posts
          </h2>
          <Posts posts={sortedPosts} />
        </section>

        <div className="mt-8">
          <h2 className="text-xl text-gray-200 font-bold">Jeux préférés</h2>
          <Jeux games={profileData.games || []} />
        </div>
      </div>
    </div>
  );
}

export default Profile;
