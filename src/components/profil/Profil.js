import React from 'react';
import { useAuth } from '../../context/AuthContext';

function Profile() {
  const { user } = useAuth();

  // Ici, tu pourras ajouter la logique pour récupérer les posts de l'utilisateur, ses jeux préférés, etc.

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="container mx-auto p-4">
        <div className="flex flex-col items-center">
          <img
            src={user.avatar_url || "https://via.placeholder.com/150"}
            alt={user.username}
            className="rounded-full w-32 h-32 object-cover"
          />
          <h1 className="text-2xl font-bold mt-4">{user.username}</h1>
          <p className="text-gray-400">Bio de l'utilisateur ici...</p>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-bold">Jeux préférés</h2>
          {/* Ici, tu afficherais les jeux préférés de l'utilisateur, par exemple dans une grille de cartes */}
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-bold">Derniers posts</h2>
          {/* Ici, tu afficherais les derniers posts de l'utilisateur */}
        </div>

        {/* Plus de sections pourraient être ajoutées ici, comme les amis de l'utilisateur, les groupes, etc. */}
      </div>
    </div>
  );
}

export default Profile;
