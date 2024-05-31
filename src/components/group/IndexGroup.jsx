import React, { useState, useEffect } from "react";
import axios from "axios";
import CardGroup from "./CardGroup"; // Assurez-vous que le chemin d'importation est correct
import CreateGroup from "./CreateGroup"; // Importez le nouveau composant

const IndexGroup = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8000/api/groups", {
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
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:8000/api/games/index",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setGames(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des jeux:", error);
      }
    };

    fetchGroups();
    fetchGames();
  }, []);

  const handleCreateGroup = async (groupData) => {
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      for (const [key, value] of Object.entries(groupData)) {
        formData.append(key, value);
      }

      const response = await axios.post(
        "http://localhost:8000/api/group/create",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setGroups([...groups, response.data]);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Erreur lors de la création du groupe:", error);
    }
  };

  if (loading) {
    return <div>Chargement des groupes...</div>;
  }

  return (
    <div className="container mx-auto p-4">
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
