import React from "react";

const GameCard = ({ game, onToggleFollow, userId }) => {
  // Détermine si le jeu est suivi par l'utilisateur
  const isFollowed = game.users?.some(
    (user) => user.id === parseInt(userId) && user.pivot.is_wishlist
  );

  // Gère le clic sur le bouton de suivi
  const handleFollowClick = () => {
    onToggleFollow(game.id, !isFollowed);
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg overflow-hidden">
      <img
        src={`http://localhost:8000/${game.cover_image}`}
        alt={game.name}
        className="w-full h-64 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-bold text-white">{game.name}</h3>
        <p className="text-gray-300">{game.description}</p>
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={handleFollowClick}
            className={`btn flex items-center justify-center ${
              isFollowed ? "btn-red" : "btn-blue"
            }`}
          >
            <span className="material-symbols-outlined">
              {isFollowed ? "cancel" : "favorite_border"}
            </span>
            <span className="ml-2">{isFollowed ? "Unfollow" : "Follow"}</span>
          </button>
          <span className="text-sm text-gray-400">{game.release_date}</span>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
