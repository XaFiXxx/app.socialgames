import React from "react";

function Jeux({ games }) {
  console.log(games);

  const filteredGames = games.filter((game) => game.pivot.is_wishlist === 1);

  if (!Array.isArray(filteredGames) || !filteredGames.length) {
    return <p className="text-gray-300 mt-4">Aucun jeux à afficher.</p>;
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {filteredGames.map((game) => (
        <div key={game.id} className="card">
          <img
            src={`${process.env.REACT_APP_API_URL}/${game.cover_image}`}
            alt={game.name}
            className="w-full h-32 object-cover rounded-lg"
          />
          <div className="p-2 text-center">{game.name}</div>
        </div>
      ))}
    </div>
  );
}

export default Jeux;
