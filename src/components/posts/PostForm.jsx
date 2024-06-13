import React, { useState } from "react";
import api from '../../axiosConfig'; // Assurez-vous que le chemin est correct
import { toast } from "react-toastify";
import Cookies from "js-cookie"; // Importer js-cookie

function PostForm({ groupId = null }) {
  const [postContent, setPostContent] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreviewUrl("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!postContent.trim()) {
      toast.error("Le contenu du post ne peut pas être vide.");
      return;
    }

    const token = Cookies.get("token"); // Utiliser js-cookie pour récupérer le token
    const user = JSON.parse(Cookies.get("user"));
    const user_id = user.id;

    const formData = new FormData();
    formData.append("content", postContent);
    formData.append("user_id", user_id);
    if (groupId) {
      formData.append("group_id", groupId);
    }
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await api.post(
        "/api/create/post",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.post) {
        toast.success("Post créé avec succès!");
        window.location.reload(); // Rafraîchir la page après la création du post
      } else {
        throw new Error("Failed to create post");
      }
    } catch (error) {
      console.error("Erreur lors de la création du post:", error);
      toast.error("Erreur lors de la création du post.");
    }
  };

  return (
    <div className="flex justify-center pt-5">
      <div className="w-full max-w-xl bg-white rounded-lg shadow-md p-4">
        <form onSubmit={handleSubmit}>
          <textarea
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            placeholder="À quoi avez-vous joué aujourd'hui?"
            rows="4"
            className="resize-none w-full p-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
          {imagePreviewUrl && (
            <div className="mt-4">
              <img
                src={imagePreviewUrl}
                alt="Prévisualisation"
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>
          )}
          <div className="flex justify-between items-center mt-3">
            <div className="flex space-x-4 items-center">
              <label
                htmlFor="imageUpload"
                className="flex items-center justify-center p-2 rounded-full text-blue-500 hover:text-blue-600 transition bg-blue-100 hover:bg-blue-200 cursor-pointer"
              >
                <img
                  src="/img/logoImg.webp"
                  className="h-8 w-8"
                  alt="Ajouter"
                />
                <input
                  type="file"
                  id="imageUpload"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
              <button
                type="button"
                className="flex items-center justify-center p-2 rounded-full text-green-500 hover:text-green-600 transition bg-green-100 hover:bg-green-200"
                aria-label="Ajouter une vidéo"
              >
                <img
                  src="/img/logoVideo.webp"
                  className="h-8 w-8"
                  alt="Ajouter une vidéo"
                />
              </button>
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 hover:bg-blue-600 text-white rounded-lg transition"
            >
              Publier
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PostForm;
