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
