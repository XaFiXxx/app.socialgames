// GameCard.js
import React from 'react';

const GameCard = ({ game }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <img src={`http://localhost:8000/${game.cover_image}`} alt={game.name} className="w-full h-64 object-cover rounded-t-lg" />
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900">{game.name}</h3>
        <p className='text-gray-900'>{game.description}</p>
        {/* Other game details if necessary */}
      </div>
    </div>
  );
};

export default GameCard;
