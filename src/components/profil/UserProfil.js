import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
// import PostForm from "../posts/PostForm";
import Posts from "../posts/Posts";
import Jeux from "./Jeux";

function UserProfile() {
  const { id } = useParams();
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:8000/api/users/${id}/profile`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setProfileData(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération du profil:", error);
        toast.error("Impossible de charger les données du profil.");
      }
    };

    fetchUserData();
  }, [id]);

  if (!profileData) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="bg-gray-900 text-gray-700 min-h-screen">
      <div className="container mx-auto p-4">
        <div className="relative mb-6">
          <img
            src={`http://localhost:8000/${
              profileData.cover_url || "img/defaultCover.jpg"
            }`}
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
        </div>

        <div className="text-center">
          <h1 className="text-4xl text-gray-200 font-bold">
            {profileData.username}
          </h1>
          <p className="text-gray-200 mb-4">{profileData.biography}</p>
          {/* Dynamically display profile actions if the profile belongs to the logged-in user */}
        </div>

        {/* Additional details sections */}
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
          {/* <PostForm
            onPostSubmit={(newPost) =>
              setProfileData({
                ...profileData,
                posts: [newPost, ...profileData.posts],
              })
            }
          /> */}
          <Posts posts={profileData.posts} />
        </div>

        <div className="mt-8">
          <h2 className="text-xl text-gray-200 font-bold">Jeux préférés</h2>
          <Jeux games={profileData.games} />
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
