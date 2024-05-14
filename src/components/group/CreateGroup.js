import React, { useState } from "react";

const CreateGroup = ({ games, onCreateGroup, onClose }) => {
  const [newGroupName, setNewGroupName] = useState("");
  const [newGroupDescription, setNewGroupDescription] = useState("");
  const [newGroupGameId, setNewGroupGameId] = useState("");
  const [newGroupImage, setNewGroupImage] = useState(null);
  const [newGroupImagePreview, setNewGroupImagePreview] = useState("");
  const [newGroupPrivacy, setNewGroupPrivacy] = useState("public");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewGroupImage(file);
      setNewGroupImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreateGroup({
      name: newGroupName,
      description: newGroupDescription,
      game_id: newGroupGameId,
      group_image: newGroupImage,
      privacy: newGroupPrivacy,
    });
    setNewGroupName("");
    setNewGroupDescription("");
    setNewGroupGameId("");
    setNewGroupImage(null);
    setNewGroupImagePreview("");
    setNewGroupPrivacy("public");
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-4 rounded shadow-lg">
        <h2 className="text-xl font-bold mb-4">Créer un nouveau groupe</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="border p-2 mb-4 w-full"
            placeholder="Nom du groupe"
            value={newGroupName}
            onChange={(e) => setNewGroupName(e.target.value)}
          />
          <input
            type="text"
            className="border p-2 mb-4 w-full"
            placeholder="Description du groupe"
            value={newGroupDescription}
            onChange={(e) => setNewGroupDescription(e.target.value)}
          />
          <select
            className="border p-2 mb-4 w-full"
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
          <input
            type="file"
            accept="image/*"
            className="border p-2 mb-4 w-full"
            onChange={handleImageChange}
          />
          {newGroupImagePreview && (
            <img
              src={newGroupImagePreview}
              alt="Aperçu"
              className="w-full h-32 object-cover rounded mb-4"
            />
          )}
          <select
            className="border p-2 mb-4 w-full"
            value={newGroupPrivacy}
            onChange={(e) => setNewGroupPrivacy(e.target.value)}
          >
            <option value="public">Public</option>
            <option value="private">Privé</option>
          </select>
          <div className="flex justify-end">
            <button
              type="button"
              className="px-4 py-2 bg-gray-500 text-white rounded mr-2"
              onClick={onClose}
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Créer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateGroup;
