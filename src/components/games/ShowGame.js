import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ShowGame = () => {
  const { id, name } = useParams();
  const userStr = localStorage.getItem("user");

  // Parser la chaîne JSON pour obtenir un objet JavaScript
  const user = userStr ? JSON.parse(userStr) : null;

  // Accéder à l'ID de l'utilisateur
  const userId = user ? user.id : null;
  const [game, setGame] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  console.log("User ID:", userId);

  useEffect(() => {
    const fetchGame = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          `http://localhost:8000/api/game/${id}/${name}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setGame(response.data);
        const isFollowed = response.data.users?.some(
          (user) => user.id === parseInt(userId) && user.pivot.is_wishlist
        );
        setIsFollowing(isFollowed); // Correctement initialisé selon les données utilisateur
      } catch (error) {
        console.error("Failed to fetch game details:", error);
      }
    };

    fetchGame();
  }, [id, name, userId]);

  const toggleFollow = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (isLoading) return; // Empêcher les appels multiples

    setIsLoading(true);
    const newIsFollowing = !isFollowing;
    console.log("Toggling follow, new isFollowing value:", newIsFollowing);

    try {
      const response = await axios.post(
        `http://localhost:8000/api/games/${id}/follow`,
        { isFollowed: newIsFollowing },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Response data:", response.data);
      // Mise à jour de l'état en fonction du message retourné par l'API
      if (response.data.message === "Jeu suivi avec succès.") {
        setIsFollowing(true);
      } else if (
        response.data.message === "Vous avez arrêté de suivre ce jeu."
      ) {
        setIsFollowing(false);
      } else {
        console.error("Unexpected response structure:", response.data);
      }
    } catch (error) {
      console.error(
        "Failed to toggle follow:",
        error.response?.data?.message || "Error"
      );
    } finally {
      setIsLoading(false); // Réactiver le bouton après la requête
    }
  }, [id, isFollowing, isLoading]);

  useEffect(() => {
    console.log("isFollowing has changed:", isFollowing);
  }, [isFollowing]);

  if (!game) {
    return <div>Loading game details...</div>;
  }

  const genreNames = game.genres.map((genre) => genre.name).join(", ");
  const platformNames = game.platforms
    .map((platform) => platform.name)
    .join(", ");

  return (
    <div className="game-container bg-gray-900 min-h-screen text-white p-5 rounded-lg shadow-lg">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2">
          <img
            src={`http://localhost:8000/${game.cover_image}`}
            alt={game.name}
            className="object-cover rounded-lg shadow-md"
          />
        </div>
        <div className="md:w-1/2 md:pl-10 mt-4 md:mt-0">
          <h1 className="text-3xl font-bold">{game.name}</h1>
          <p className="mt-2">{game.description}</p>
          <div className="mt-4">
            <h2 className="text-xl font-semibold">Details</h2>
            <p>Developer: {game.developer}</p>
            <p>Publisher: {game.publisher}</p>
            <p>Release Date: {game.release_date}</p>
            <p>Genres: {genreNames}</p>
            <p>Platforms: {platformNames}</p>
          </div>
          <button
            onClick={toggleFollow}
            disabled={isLoading}
            className={`mt-4 px-4 py-2 rounded ${
              isFollowing ? "bg-red-500" : "bg-green-500"
            } text-white`}
          >
            {isLoading ? "Processing..." : isFollowing ? "Unfollow" : "Follow"}{" "}
            Game
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShowGame;
