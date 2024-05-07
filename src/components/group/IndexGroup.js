import React, { useState, useEffect } from "react";
import axios from "axios";
import CardGroup from "./CardGroup"; // Assurez-vous que le chemin d'importation est correct

const IndexGroup = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);

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
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des groupes:", error);
        setLoading(false);
      }
    };

    fetchGroups();
  }, []);

  if (loading) {
    return <div>Chargement des groupes...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold text-center mb-4">Liste des Groupes</h1>
      {groups.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {groups.map((group) => (
            <CardGroup key={group.id} group={group} />
          ))}
        </div>
      ) : (
        <p>Aucun groupe trouvé.</p>
      )}
    </div>
  );
};

export default IndexGroup;
