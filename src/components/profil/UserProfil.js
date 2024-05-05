import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Posts from "../posts/Posts";
import Jeux from "./Jeux";

function UserProfile() {
  const { id } = useParams();
  const [profileData, setProfileData] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const userString = localStorage.getItem("user");
        const user = JSON.parse(userString);

        const response = await axios.get(
          `http://localhost:8000/api/users/${id}/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "X-User-Id": user.id, // Utiliser l'ID de l'objet utilisateur
            },
          }
        );
        setProfileData(response.data);
        setIsFollowing(response.data.isFollowing);
        console.log(response.data);
        console.log(response.data.isFollowing);
      } catch (error) {
        console.error("Erreur lors de la récupération du profil:", error);
        toast.error("Impossible de charger les données du profil.");
      }
    };

    fetchUserData();
  }, [id]);

  const handleFollowToggle = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `http://localhost:8000/api/user/follow/${id}`,
        { follow: !isFollowing },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setIsFollowing(!isFollowing); // Met à jour l'état de suivi
      toast.success(
        isFollowing
          ? "Vous ne suivez plus cet utilisateur."
          : "Vous suivez maintenant cet utilisateur."
      );
    } catch (error) {
      console.error("Erreur lors du suivi/désuivi:", error);
      toast.error("Erreur lors de la mise à jour du suivi.");
    }
  };

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
          <button
            onClick={handleFollowToggle}
            className={`btn ${isFollowing ? "btn-red" : "btn-blue"}`}
          >
            {isFollowing ? "Unfollow" : "Follow"}
          </button>
        </div>

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
