import React from "react";
import UserResult from "./UserResult";
import GameResult from "./GameResult"; // Assure-toi que le chemin est correct
import GroupResult from "./GroupResult"; // Assure-toi que le chemin est correct

function SearchResults({ results }) {
  const users = Array.isArray(results.users) ? results.users : [];
  const games = Array.isArray(results.games) ? results.games : [];
  const groups = Array.isArray(results.groups) ? results.groups : [];

  return (
    <div className="container min-h-screen mx-auto p-4">
      <h2 className="text-2xl text-gray-200 font-bold text-center mb-4">
        Résultats de recherche
      </h2>

      {users.length > 0 && (
        <>
          <h3 className="text-xl text-gray-100 font-bold mb-3">Utilisateurs</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {users.map((user) => <UserResult key={user.id} user={user} />)}
          </div>
        </>
      )}

      {games.length > 0 && (
        <>
          <h3 className="text-xl text-gray-100 mt-4 font-bold mb-3">Jeux</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {games.map((game) => <GameResult key={game.id} game={game} />)}
          </div>
        </>
      )}

      {groups.length > 0 && (
        <>
          <h3 className="text-xl text-gray-100 mt-4 font-bold mb-3">Groupes</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {groups.map((group) => <GroupResult key={group.id} group={group} />)}
          </div>
        </>
      )}

      {users.length === 0 && games.length === 0 && groups.length === 0 && (
        <p className="text-gray-200 text-center mt-8">Aucun résultat trouvé.</p>
      )}
    </div>
  );
}

export default SearchResults;
