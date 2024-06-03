import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

function UserGroups() {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserGroups = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          "http://localhost:8000/api/user/groups",
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

    fetchUserGroups();
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
                await axios.post(`http://localhost:8000/api/group/${groupId}/delete`, {}, {
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

  if (loading) {
    return <div className="text-center text-gray-300">Chargement des groupes...</div>;
  }

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <h2 className="text-2xl text-gray-200 font-bold text-center mb-4">
        Mes Groupes
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {groups.length > 0 ? (
          groups.map((group) => (
            <div key={group.id} className="bg-gray-800 p-4 rounded-lg shadow-lg overflow-hidden">
              <img
                src={`http://localhost:8000/${group.group_image}`}
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
    </div>
  );
}

export default UserGroups;
