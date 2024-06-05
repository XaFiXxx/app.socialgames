import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import api from '../../axiosConfig'; // Assurez-vous que le chemin est correct
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Rating from "./Rating";
import ShowRate from "./ShowRate";

const ShowGame = () => {
  const { id, name } = useParams();
  const userStr = localStorage.getItem("user");

  const user = userStr ? JSON.parse(userStr) : null;
  const userId = user ? user.id : null;
  const [game, setGame] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  console.log("User ID:", userId);

  const fetchGame = useCallback(async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await api.get(`/api/game/${id}/${name}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setGame(response.data);
      console.log("Game details:", response.data);
      const isFollowed = response.data.users?.some(
        (user) => user.id === parseInt(userId) && user.pivot.is_wishlist
      );
      setIsFollowing(isFollowed);
    } catch (error) {
      console.error("Failed to fetch game details:", error);
      toast.error("Erreur lors de la récupération des détails du jeu.");
    }
  }, [id, name, userId]);

  useEffect(() => {
    fetchGame();
  }, [fetchGame]);

  const toggleFollow = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (isLoading) return;

    setIsLoading(true);
    const newIsFollowing = !isFollowing;
    console.log("Toggling follow, new isFollowing value:", newIsFollowing);

    try {
      const response = await api.post(
        `/api/games/${id}/follow`,
        { isFollowed: newIsFollowing },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Response data:", response.data);
      if (response.data.message === "Jeu suivi avec succès.") {
        setIsFollowing(true);
        setGame((prevGame) => ({
          ...prevGame,
          users: [...prevGame.users, { id: userId, pivot: { is_wishlist: true } }]
        }));
        toast.success("Jeu suivi avec succès.");
      } else if (response.data.message === "Vous avez arrêté de suivre ce jeu.") {
        setIsFollowing(false);
        setGame((prevGame) => ({
          ...prevGame,
          users: prevGame.users.filter(user => user.id !== userId)
        }));
        toast.success("Vous avez arrêté de suivre ce jeu.");
      } else {
        console.error("Unexpected response structure:", response.data);
        toast.error("Réponse inattendue du serveur.");
      }
    } catch (error) {
      console.error("Failed to toggle follow:", error.response?.data?.message || "Error");
      toast.error(error.response?.data?.message || "Erreur lors de la tentative de suivi du jeu.");
    } finally {
      setIsLoading(false);
    }
  }, [id, isFollowing, isLoading, userId]);

  useEffect(() => {
    console.log("isFollowing has changed:", isFollowing);
  }, [isFollowing]);

  if (!game) {
    return <div>Loading game details...</div>;
  }

  const genreNames = game.genres.map((genre) => genre.name).join(", ");
  const platformNames = game.platforms.map((platform) => platform.name).join(", ");

  return (
    <div className="bg-gray-900 min-h-screen text-white p-8 rounded-lg shadow-lg">
      <ToastContainer position="bottom-right" autoClose={2000} hideProgressBar newestOnTop closeOnClick />
      <div className="flex flex-col md:flex-row items-center md:items-start">
        <div className="md:w-1/2">
          <img
            src={`${process.env.REACT_APP_API_URL}/${game.cover_image}`}
            alt={game.name}
            className="w-full h-auto object-cover rounded-lg shadow-md"
          />
        </div>
        <div className="md:w-1/2 md:pl-10 mt-6 md:mt-0">
          <h1 className="text-4xl font-bold">{game.name}</h1>
          <p className="mt-4 text-gray-300">{game.description}</p>
          <div className="mt-6">
            <h2 className="text-2xl font-semibold">Details</h2>
            <p className="mt-2">Developer: {game.developer}</p>
            <p className="mt-1">Publisher: {game.publisher}</p>
            <p className="mt-1">Release Date: {game.release_date}</p>
            <p className="mt-1">Genres: {genreNames}</p>
            <p className="mt-1">Platforms: {platformNames}</p>
          </div>
          <button
            onClick={toggleFollow}
            disabled={isLoading}
            className={`mt-6 px-6 py-2 text-lg font-medium rounded-lg ${
              isFollowing
                ? "bg-red-600 hover:bg-red-700"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isLoading ? "Processing..." : isFollowing ? "Unfollow" : "Follow"}{" "}
            Game
          </button>
          <div className="mt-6">
            <h2 className="text-2xl font-semibold">Rate this Game</h2>
            <Rating
              gameId={id}
              userId={userId}
              initialRating={0}
              initialReview=""
              token={localStorage.getItem("token")}
              fetchGame={fetchGame} // Pass fetchGame to Rating
            />
          </div>
          <div className="mt-6">
            <ShowRate
              reviews={game.reviews}
              userId={userId}
              token={localStorage.getItem("token")}
              fetchGame={fetchGame}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowGame;
