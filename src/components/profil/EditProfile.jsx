import React, { useState } from "react";
import { toast } from "react-toastify";
import Cookies from "js-cookie"; // Importer js-cookie
import api from '../../axiosConfig'; // Assurez-vous que le chemin est correct

function EditProfile({ profileData, onClose, onSave }) {
  const [formData, setFormData] = useState({
    id: profileData.id || "",
    name: profileData.name || "",
    surname: profileData.surname || "",
    username: profileData.username || "",
    email: profileData.email || "",
    biography: profileData.biography || "",
    birthday: profileData.birthday || "",
    location: profileData.location || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = Cookies.get("token"); // Utiliser js-cookie pour récupérer le token
      const response = await api.post('/api/users/update-profile', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onSave(response.data.user);
      toast.success("Profil mis à jour avec succès!");
      onClose();
    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil:", error);
      toast.error("Erreur lors de la mise à jour du profil.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-white w-full max-w-md">
        <h2 className="text-2xl mb-4">Modifier le profil</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-300 mb-1">Nom</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-900 text-white border border-gray-700 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-1">Prénom</label>
            <input
              type="text"
              name="surname"
              value={formData.surname}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-900 text-white border border-gray-700 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-1">Nom d'utilisateur</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-900 text-white border border-gray-700 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-900 text-white border border-gray-700 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-1">Biographie</label>
            <textarea
              name="biography"
              value={formData.biography}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-900 text-white border border-gray-700 rounded"
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-1">Date de naissance</label>
            <input
              type="date"
              name="birthday"
              value={formData.birthday}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-900 text-white border border-gray-700 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-1">Pays</label>
            <select
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-900 text-white border border-gray-700 rounded"
            >
              <option value="">Sélectionner un pays</option>
              <option value="France">France</option>
              <option value="Germany">Allemagne</option>
              <option value="Italy">Italie</option>
              <option value="Spain">Espagne</option>
              <option value="United Kingdom">Royaume-Uni</option>
              <option value="Belgium">Belgique</option>
              <option value="Netherlands">Pays-Bas</option>
              <option value="Sweden">Suède</option>
              <option value="Denmark">Danemark</option>
              <option value="Norway">Norvège</option>
              <option value="Finland">Finlande</option>
              <option value="Switzerland">Suisse</option>
              <option value="Austria">Autriche</option>
              <option value="Portugal">Portugal</option>
              <option value="Greece">Grèce</option>
              <option value="Ireland">Irlande</option>
              {/* Ajoutez d'autres pays ici */}
            </select>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-red mr-2"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="btn btn-blue"
            >
              Sauvegarder
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
