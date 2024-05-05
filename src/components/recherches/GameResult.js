import React from "react";

const GameResult = ({ game }) => {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 ease-in-out m-4">
      <img
        src={`http://localhost:8000/${game.cover_image}`}
        alt={game.name}
        className="w-full h-64 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-bold text-white">{game.name}</h3>
        <p className="text-gray-300 mb-2 truncate">{game.description}</p>
        <p className="text-sm text-gray-400">Developer: {game.developer}</p>
        <p className="text-sm text-gray-400">Publisher: {game.publisher}</p>
        <div className="text-sm text-gray-400">
          Release Date: {game.release_date}
        </div>
      </div>
    </div>
  );
};

export default GameResult;
