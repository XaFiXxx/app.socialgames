import React from "react";
import { Link } from "react-router-dom";

function UserResult({ user }) {
  return (
    <div className="bg-gray-600 p-4 rounded-lg shadow-lg overflow-hidden">
      <div className="flex items-center space-x-4">
        <img
          src={`${process.env.REACT_APP_API_URL}/${user.avatar_url}`}
          alt={`Avatar de ${user.username}`}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h3 className="text-lg font-bold text-white">{user.username}</h3>
          <p className="text-sm text-gray-400">{user.location}</p>
        </div>
      </div>
      <p className="text-gray-300 mt-2">{user.biography}</p>
      <Link
        to={`/profile/${user.id}/${user.username}`}
        className="text-blue-500 hover:underline mt-2 block"
      >
        Voir le profil
      </Link>
    </div>
  );
}

export default UserResult;
