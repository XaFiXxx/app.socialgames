import React from "react";
import { Link } from "react-router-dom";

const CardGroup = ({ group }) => {
  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg shadow-lg">
      <div className="mb-2">
        <img
          src={`${process.env.REACT_APP_API_URL}/${group.group_image}`}
          alt={`${group.name} cover`}
          className="w-full h-32 object-cover rounded-lg"
        />
      </div>
      <h2 className="font-bold text-lg">{group.name}</h2>
      <p>{group.description}</p>
      <p className="italic">
        Jeu associé: {group.game ? group.game.name : "Aucun jeu associé"}
      </p>
      <p>Privacy: {group.privacy}</p>
      <Link
        to={`/group/${group.id}`}
        className="btn btn-blue mt-2 block w-full text-center"
      >
        Voir Détails
      </Link>
    </div>
  );
};

export default CardGroup;
