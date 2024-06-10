import React from "react";
import { Link } from "react-router-dom";


const GameCard = ({ game, onToggleFollow, userId }) => {
  const isFollowed = game.users?.some(
    (user) => user.id === parseInt(userId) && user.pivot.is_wishlist
  );

  const handleFollowClick = () => {
    onToggleFollow(game.id, !isFollowed);
  };

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 ease-in-out mb-4">
      <div className="relative group">
        <img
          src={`${process.env.REACT_APP_API_URL}/${game.cover_image}`}
          alt={game.name}
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-70 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
          <button
            onClick={handleFollowClick}
            className={`text-lg ${
              isFollowed
                ? "bg-red-500 hover:bg-red-700"
                : "bg-blue-500 hover:bg-blue-700"
            } text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out`}
          >
            <span className="material-symbols-outlined">
              {isFollowed ? "favorite" : "favorite_border"}
            </span>
            <span className="ml-2">{isFollowed ? "Unfollow" : "Follow"}</span>
          </button>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-white">{game.name}</h3>
        <p className="text-gray-300 mb-2 truncate">{game.description}</p>
        <p className="text-sm text-gray-400">Developer: {game.developer}</p>
        <p className="text-sm text-gray-400">Publisher: {game.publisher}</p>
        <div className="text-sm text-gray-400">
          Genres: {game.genres.map((genre) => genre.name).join(", ")}
        </div>
        <div className="text-sm text-gray-400 mb-2">
          Platforms:{" "}
          {game.platforms.map((platform) => platform.name).join(", ")}
        </div>
        <p className="text-sm text-gray-400">
          Release Date: {game.release_date}
        </p>
      </div>
      <div className="btn btn-blue">
        <Link
          to={`/game/${game.id}/${game.name}`}
          className="text-gray-200 text-center hover:underline mt-2 block"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default GameCard;
