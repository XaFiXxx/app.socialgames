import React from 'react';

const GameCard = ({ game, onToggleFollow }) => {
  // Détermine si le jeu est suivi en vérifiant la liste des utilisateurs associés
  const isFollowed = game.users?.some(user => user.pivot.is_wishlist);

  const handleFollowClick = () => {
    onToggleFollow(game.id, !isFollowed);
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg overflow-hidden">
      <img src={`http://localhost:8000/${game.cover_image}`} alt={game.name} className="w-full h-64 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-bold text-white">{game.name}</h3>
        <p className='text-gray-300'>{game.description}</p>
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={handleFollowClick}
            className={`px-4 py-2 rounded font-bold ${isFollowed ? 'bg-red-500 hover:bg-red-700' : 'bg-blue-500 hover:bg-blue-700'} text-white transition-colors`}
          >
            {isFollowed ? 'Unfollow' : 'Follow'}
          </button>
          <span className="text-sm text-gray-400">{game.release_date}</span>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
