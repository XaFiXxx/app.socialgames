import React, { useEffect, useState } from "react";
import api from '../../axiosConfig';
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import CreateGroup from "../group/CreateGroup"; // Assurez-vous que le chemin d'importation est correct

function UserGroups() {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); // État pour le modal
  const [games, setGames] = useState([]); // État pour les jeux

  useEffect(() => {
    const fetchUserGroups = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await api.get(
          "/api/user/groups",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setGroups(response.data.groups);
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des groupes:", error);
        toast.error("Erreur lors de la récupération des groupes.");
        setLoading(false);
      }
    };

    const fetchGames = async () => {
      try {
        const token = localStorage.getItem("token");
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

    fetchUserGroups();
    fetchGames();
  }, []);

  const handleDelete = async (groupId) => {
    const confirmDelete = () => {
      confirmAlert({
        title: "Confirmer la suppression",
        message: "Êtes-vous sûr de vouloir supprimer ce groupe ?",
        buttons: [
          {
            label: "Oui",
            onClick: async () => {
              const token = localStorage.getItem("token");
              try {
                await api.post(`/api/group/${groupId}/delete`, {}, {
                  headers: { Authorization: `Bearer ${token}` },
                });
                setGroups(groups.filter((group) => group.id !== groupId));
                toast.success("Groupe supprimé avec succès!");
              } catch (error) {
                console.error("Erreur lors de la suppression du groupe:", error);
                toast.error("Erreur lors de la suppression du groupe.");
              }
            },
          },
          {
            label: "Non",
            onClick: () => {},
          },
        ],
      });
    };
    confirmDelete();
  };

  const handleCreateGroup = (groupData) => {
    setGroups((prevGroups) => [...prevGroups, groupData]);
    setIsModalOpen(false);
    toast.success("Groupe créé avec succès!");
  };

  if (loading) {
    return <div className="text-center text-gray-300">Chargement des groupes...</div>;
  }

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <ToastContainer position="bottom-right" autoClose={2000} hideProgressBar newestOnTop closeOnClick />
      <h2 className="text-2xl text-gray-200 font-bold text-center mb-4">
        Mes Groupes
      </h2>
      <button
        className="mb-4 px-4 py-2 bg-green-500 text-white rounded"
        onClick={() => setIsModalOpen(true)}
      >
        Créer un nouveau groupe
      </button>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {groups.length > 0 ? (
          groups.map((group) => (
            <div key={group.id} className="bg-gray-800 p-4 rounded-lg shadow-lg overflow-hidden">
              <img
                src={`${process.env.REACT_APP_API_URL}/${group.group_image}`}
                alt={group.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold text-white">{group.name}</h3>
                <p className="text-gray-300 truncate">{group.description}</p>
                <div className="mt-4 text-center">
                  <Link
                    to={`/group/${group.id}`}
                    className="text-gray-200 btn btn-blue hover:underline mt-2 block"
                  >
                    Voir les détails
                  </Link>
                  <button
                    onClick={() => handleDelete(group.id)}
                    className="mt-2 px-4 py-2 bg-red-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300 transition-colors duration-300"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-200">Aucun groupe trouvé.</p>
        )}
      </div>

      {isModalOpen && (
        <CreateGroup
          games={games}
          onCreateGroup={handleCreateGroup}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}

export default UserGroups;
