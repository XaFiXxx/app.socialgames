import React, { useState, useEffect } from "react";
import api from '../../axiosConfig'; // Assurez-vous que le chemin est correct
import CardGroup from "./CardGroup"; // Assurez-vous que le chemin d'importation est correct
import CreateGroup from "./CreateGroup"; // Importez le nouveau composant
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie"; // Importer js-cookie

const IndexGroup = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const token = Cookies.get("token"); // Utiliser js-cookie pour récupérer le token
        const response = await api.get("/api/groups", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setGroups(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des groupes:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchGames = async () => {
      try {
        const token = Cookies.get("token"); // Utiliser js-cookie pour récupérer le token
        const response = await api.get("/api/games/index", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setGames(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des jeux:", error);
      }
    };

    fetchGroups();
    fetchGames();
  }, []);

  const handleCreateGroup = (groupData) => {
    setGroups((prevGroups) => [...prevGroups, groupData]);
    setIsModalOpen(false);
    toast.success("Groupe créé avec succès!");
  };

  if (loading) {
    return <div>Chargement des groupes...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <ToastContainer position="bottom-right" autoClose={2000} hideProgressBar newestOnTop closeOnClick />
      <h1 className="text-xl font-bold text-gray-200 text-center mb-4">
        Liste des Groupes
      </h1>
      <button
        className="mb-4 px-4 py-2 bg-green-500 text-white rounded"
        onClick={() => setIsModalOpen(true)}
      >
        Créer un nouveau groupe
      </button>
      {groups.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {groups.map((group) => (
            <CardGroup key={group.id} group={group} />
          ))}
        </div>
      ) : (
        <p>Aucun groupe trouvé.</p>
      )}

      {isModalOpen && (
        <CreateGroup
          games={games}
          onCreateGroup={handleCreateGroup}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default IndexGroup;
