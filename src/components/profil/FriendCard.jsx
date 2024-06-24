// src/components/profile/FriendCard.jsx

import React from 'react';

const FriendCard = ({ friend }) => {
  return (
    <div className="max-w-xs bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
      <div className="relative h-24">
        <img
          className="w-full h-full object-cover"
          src={`${process.env.REACT_APP_API_URL}/${friend.cover_url}`}
          alt={`${friend.name} cover`}
        />
        <img
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-16 h-16 rounded-full border-2 border-white object-cover"
          src={`${process.env.REACT_APP_API_URL}/${friend.avatar_url}`}
          alt={`${friend.name} avatar`}
        />
      </div>
      <div className="pt-10 px-3 pb-3">
        <h3 className="text-base font-semibold text-gray-900 text-center">{friend.name} {friend.surname}</h3>
        <p className="text-sm text-gray-600 text-center">@{friend.username}</p>
        <p className="text-xs text-gray-600 text-center">{friend.location}</p>
      </div>
    </div>
  );
};

export default FriendCard;
