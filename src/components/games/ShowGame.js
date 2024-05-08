import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ShowGame = () => {
  const { id, name } = useParams();
  const [game, setGame] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false); // Ajout d'un état pour suivre si l'utilisateur suit le jeu

  useEffect(() => {
    const fetchGame = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          `http://localhost:8000/api/game/${id}/${name}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setGame(response.data);
        setIsFollowing(response.data.is_following); // Supposons que 'is_following' est envoyé par le serveur
      } catch (error) {
        console.error("Failed to fetch game details:", error);
      }
    };

    fetchGame();
  }, [id, name]);

  const toggleFollow = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `http://localhost:8000/api/games/${id}/follow`,
        { isFollowed: isFollowing }, // Assurez-vous que le payload correspond à l'attente du backend
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setIsFollowing(!isFollowing); // Toggle the follow state
      // Affichage d'un message basé sur la réponse du serveur pour confirmation
      console.log(response.data.message);
    } catch (error) {
      console.error(
        "Failed to toggle follow:",
        error.response?.data?.message || "Error"
      );
    }
  };

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
            className={`mt-4 px-4 py-2 rounded ${
              isFollowing ? "bg-red-500" : "bg-green-500"
            } text-white`}
          >
            {isFollowing ? "Unfollow" : "Follow"} Game
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShowGame;
