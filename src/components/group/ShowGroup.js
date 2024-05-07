import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // Importe useParams si tu utilises react-router v5 ou v6

const ShowGroup = () => {
  const { id } = useParams(); // Récupère l'id depuis l'URL
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:8000/api/group/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setGroup(response.data);
        setLoading(false);
      } catch (err) {
        console.error(
          "Erreur lors de la récupération des détails du groupe:",
          err
        );
        setError("Erreur lors de la récupération des données");
        setLoading(false);
      }
    };

    fetchGroup();
  }, [id]);

  if (loading) {
    return <div className="text-center">Chargement...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (!group) {
    return <div className="text-center text-red-500">Groupe non trouvé.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg">
        <div className="bg-gray-800 mb-6 p-4 rounded-lg">
          <img
            src={`http://localhost:8000/${group.group_image}`}
            alt={`${group.name} cover`}
            className="w-full h-64 object-cover rounded-lg"
          />
          <h1 className="text-2xl font-bold mt-4">{group.name}</h1>
          <p className="mt-2">{group.description}</p>
          <p className="mt-2 italic">Privacy: {group.privacy}</p>
          <div className="mt-4">
            <h2 className="font-bold">Jeu associé:</h2>
            {group.game ? (
              <div className="mt-2">
                <img
                  src={`http://localhost:8000/${group.game.cover_image}`}
                  alt={group.game.name}
                  className="w-32 h-32 object-cover rounded-md"
                />
                <p className="mt-2 font-semibold">{group.game.name}</p>
                <p>{group.game.description}</p>
                <p className="italic">Développé par: {group.game.developer}</p>
                <p className="italic">Publié par: {group.game.publisher}</p>
                <p className="italic">
                  Date de sortie: {group.game.release_date}
                </p>
              </div>
            ) : (
              <p>Aucun jeu associé</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowGroup;
