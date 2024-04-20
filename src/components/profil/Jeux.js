import React from 'react';

function Jeux({ games }) {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold">Jeux préférés</h2>
      <div className="grid grid-cols-3 gap-4">
        {games.map(game => (
          <div key={game.id} className="card">
            <img src={`http://127.0.0.1:8000/${game.cover_image}`} alt={game.name} className="w-full h-32 object-cover rounded-lg" />
            <div className="p-2 text-center">{game.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Jeux;
