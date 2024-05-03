import React from "react";
import UserResult from "./UserResult"; // Assure-toi d'ajuster le chemin d'importation selon ta structure de fichiers

function SearchResults({ users }) {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl text-gray-200 font-bold text-center mb-4">
        Résultats de recherche
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {users.map((user) => (
          <UserResult key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}

export default SearchResults;
