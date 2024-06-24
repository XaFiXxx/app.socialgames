import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FriendCard from './FriendCard'; // Import the FriendCard component

const Friends = ({ friends }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleOutsideClick = (event) => {
    if (event.target.id === 'modal-overlay') {
      closeModal();
    }
  };

  // Afficher seulement les 4 premiers amis
  const previewFriends = friends.slice(0, 3);

  return (
    <div className="mt-8">
      <h2 className="text-xl text-gray-200 font-bold">Amis</h2>
      <div className="flex flex-wrap justify-center gap-4">
        {previewFriends.length > 0 ? (
          previewFriends.map((friend) => (
            <div key={friend.id} className="w-1/2 md:w-1/4 p-2">
              <Link to={`/profile/${friend.id}/${friend.username}`}>
                <FriendCard friend={friend} />
              </Link>
            </div>
          ))
        ) : (
          <p className="text-gray-200">Pas d'amis disponibles</p>
        )}
      </div>
      {friends.length > 4 && (
        <div className="mt-4 text-center">
          <button onClick={openModal} className="text-blue-500 hover:underline">
            Voir tous les amis
          </button>
        </div>
      )}

      {modalIsOpen && (
        <div
          id="modal-overlay"
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={handleOutsideClick}
        >
          <div className="relative bg-white rounded-lg shadow-lg p-4 max-w-2xl w-full">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-red-500 hover:text-red-700"
            >
              &times;
            </button>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl text-gray-900 font-bold">Tous les amis</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {friends.map((friend) => (
                <div key={friend.id} className="w-full p-2">
                  <Link to={`/profile/${friend.id}/${friend.username}`} onClick={closeModal}>
                    <FriendCard friend={friend} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Friends;
