import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import GameCard from "./GameCard"; // Assurez-vous que le chemin est correct
import api from '../../axiosConfig'; // Assurez-vous que le chemin est correct
import Cookies from 'js-cookie'; // Importer js-cookie
import "react-toastify/dist/ReactToastify.css";

function GamesIndex() {
  const [games, setGames] = useState([]);
  const userStr = Cookies.get("user");
  const user = userStr ? JSON.parse(userStr) : null;
  const userId = user ? user.id : null;

  // Déclaration de fetchGames en dehors de useEffect pour la réutiliser
  const fetchGames = async () => {
    try {
      const token = Cookies.get("token");
      const response = await api.get("/api/games/index", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setGames(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des jeux:", error);
      toast.error("Impossible de récupérer les jeux.");
    }
  };

  useEffect(() => {
    fetchGames(); // Appel initial à fetchGames lors du montage du composant
  }, []);

  // Gérer le suivi/désuivi d'un jeu
  const handleToggleFollow = async (gameId, isFollowed) => {
    try {
      const token = Cookies.get("token");
      await api.post(
        `/api/games/${gameId}/follow`,
        { isFollowed },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Recharger la liste des jeux pour refléter le changement d'état
      fetchGames(); // Réutiliser la fonction fetchGames pour actualiser la liste
      toast.success(
        isFollowed ? "Jeu suivi avec succès !" : "Suivi retiré avec succès !"
      );
    } catch (error) {
      console.error("Erreur lors du suivi/désuivi:", error);
      toast.error("Erreur lors du changement de suivi.");
    }
  };

  return (
    <div className="container mx-auto px-4 min-h-screen">
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
      />
      <h2 className="text-4xl text-gray-200 font-bold mb-6 pt-4">
        Liste des jeux
      </h2>
      <div className="grid bg-gray-800 grid-cols-1 md:grid-cols-3 gap-6">
        {games.map((game) => (
          <GameCard
            key={game.id}
            game={game}
            onToggleFollow={handleToggleFollow}
            userId={userId}
          />
        ))}
      </div>
    </div>
  );
}

export default GamesIndex;
