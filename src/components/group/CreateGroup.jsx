import React, { useState } from "react";
import api from "../../axiosConfig";
import Cookies from "js-cookie"; // Importer js-cookie

const CreateGroup = ({ games, onCreateGroup, onClose }) => {
  const [newGroupName, setNewGroupName] = useState("");
  const [newGroupDescription, setNewGroupDescription] = useState("");
  const [newGroupGameId, setNewGroupGameId] = useState("");
  const [newGroupImage, setNewGroupImage] = useState(null);
  const [newGroupImagePreview, setNewGroupImagePreview] = useState("");
  const [newGroupPrivacy, setNewGroupPrivacy] = useState("public");
  const [isSubmitting, setIsSubmitting] = useState(false); // Ajoutez un état pour la soumission

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewGroupImage(file);
      setNewGroupImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return; // Empêcher les multiples soumissions
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("name", newGroupName);
    formData.append("description", newGroupDescription);
    formData.append("game_id", newGroupGameId);
    formData.append("group_image", newGroupImage);
    formData.append("privacy", newGroupPrivacy);

    try {
      const token = Cookies.get("token"); // Récupérer le token des cookies
      const response = await api.post("/api/group/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      onCreateGroup(response.data); // Passer directement les données du groupe créé
      onClose(); // Fermer le formulaire après la création
    } catch (error) {
      console.error("Failed to create group:", error);
    } finally {
      setIsSubmitting(false);
    }

    setNewGroupName("");
    setNewGroupDescription("");
    setNewGroupGameId("");
    setNewGroupImage(null);
    setNewGroupImagePreview("");
    setNewGroupPrivacy("public");
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center p-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-white text-center">
          Créer un nouveau groupe
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Nom du groupe</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-900 text-white"
              placeholder="Nom du groupe"
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">
              Description du groupe
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-900 text-white"
              placeholder="Description du groupe"
              value={newGroupDescription}
              onChange={(e) => setNewGroupDescription(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Jeu associé</label>
            <select
              className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-900 text-white"
              value={newGroupGameId}
              onChange={(e) => setNewGroupGameId(e.target.value)}
            >
              <option value="">Sélectionner un jeu</option>
              {games.map((game) => (
                <option key={game.id} value={game.id}>
                  {game.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Image de groupe</label>
            <input
              type="file"
              accept="image/*"
              className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-900 text-white"
              onChange={handleImageChange}
            />
            {newGroupImagePreview && (
              <img
                src={newGroupImagePreview}
                alt="Aperçu"
                className="w-full h-32 object-cover rounded-lg mt-2"
              />
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Confidentialité</label>
            <select
              className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-900 text-white"
              value={newGroupPrivacy}
              onChange={(e) => setNewGroupPrivacy(e.target.value)}
            >
              <option value="public">Public</option>
              <option value="private" disabled>
                Privé (Indisponible)
              </option>
            </select>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="px-4 py-2 bg-red-600 text-white rounded-lg mr-2 hover:bg-red-700"
              onClick={onClose}
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              disabled={isSubmitting} // Désactiver le bouton pendant la soumission
            >
              {isSubmitting ? "Création en cours..." : "Créer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateGroup;
