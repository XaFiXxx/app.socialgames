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
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [imageType, setImageType] = useState("");

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

  const handleImageChange = async () => {
    if (!selectedImage) return;

    const formData = new FormData();
    formData.append(imageType, selectedImage);

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await api.post(
        imageType === "avatar" ? '/api/user/update/profil_img' : '/api/user/update/cover_img',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setProfileData((prevData) => ({
        ...prevData,
        [`${imageType}_url`]: response.data[`${imageType}_url`],
      }));
      setSelectedImage(null);
      setImagePreviewUrl("");
      toast.success(`${imageType === "avatar" ? "Photo de profil" : "Photo de couverture"} mise à jour avec succès!`);
    } catch (error) {
      console.error(`Erreur lors de la mise à jour de la ${imageType}:`, error);
      toast.error(`Erreur lors de la mise à jour de la ${imageType}.`);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setImageType(type);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
      if (type === "avatar" && profileData.avatar_url !== "storage/img/users/defaultUser.webp") {
        toast.info("L'ancienne photo de profil sera supprimée du serveur.");
      } else if (type === "cover" && profileData.cover_url !== "storage/img/users/defaultCover.webp") {
        toast.info("L'ancienne photo de couverture sera supprimée du serveur.");
      }
    }
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
          <input
            type="file"
            id="coverUpload"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => handleFileChange(e, "cover")}
          />
          <div className="absolute bottom-0 transform translate-y-1/2 bg-white border-4 border-white rounded-full">
            <img
              src={`${process.env.REACT_APP_API_URL}/${profileData.avatar_url}`}
              alt="Profil"
              className="h-40 w-40 rounded-full object-cover"
            />
            <input
              type="file"
              id="avatarUpload"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) => handleFileChange(e, "avatar")}
            />
            <label
              htmlFor="avatarUpload"
              className="btn btn-blue absolute right-1 bottom-2 flex items-center justify-center cursor-pointer"
              title="Éditer la photo de profil"
            >
              <span className="material-symbols-outlined">photo_camera</span>
            </label>
          </div>
          <label
            htmlFor="coverUpload"
            className="btn btn-blue absolute right-0 bottom-0 mb-4 mr-4 flex items-center justify-center space-x-2 cursor-pointer"
            title="Éditer la photo de couverture"
          >
            <span className="material-symbols-outlined">photo_camera</span>
            <span>Éditer la photo de couverture</span>
          </label>
        </div>

        {imagePreviewUrl && (
          <div className="mb-4 text-center">
            <img
              src={imagePreviewUrl}
              alt="Prévisualisation"
              className="mx-auto rounded-lg shadow-md"
              style={{ maxWidth: "200px", maxHeight: "200px" }}
            />
            <div className="mt-2">
              <button
                onClick={handleImageChange}
                className="btn btn-green"
                disabled={loading}
              >
                {loading ? "Chargement..." : "Confirmer"}
              </button>
              <button
                onClick={() => {
                  setSelectedImage(null);
                  setImagePreviewUrl("");
                }}
                className="btn btn-red ml-2"
              >
                Annuler
              </button>
            </div>
          </div>
        )}

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
