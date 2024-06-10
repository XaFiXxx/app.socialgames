import React from "react";
import { Link } from "react-router-dom";

function GroupResult({ group }) {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg overflow-hidden">
      <img
        src={`${process.env.REACT_APP_API_URL}/${group.group_image}`}
        alt={group.name}
        className="w-full h-64 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-bold text-white">{group.name}</h3>
        <p className="text-gray-300 truncate">{group.description}</p>
        <div className="mt-4 text-center">
          <Link
            to={`/group/${group.id}`}
            className="text-gray-200 btn btn-blue hover:underline mt-2 block"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default GroupResult;
