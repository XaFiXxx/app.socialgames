import React, { useState, useEffect, useRef, useCallback } from 'react';
import api from '../../axiosConfig'; // Assurez-vous que le chemin est correct
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';

const FriendRequestModal = ({ onClose }) => {
  const [friendRequests, setFriendRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const modalRef = useRef(null);

  useEffect(() => {
    const fetchFriendRequests = async () => {
      try {
        const token = Cookies.get("token"); // Récupérer le token des cookies
        const response = await api.get('/api/friend-requests', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFriendRequests(Array.isArray(response.data.friend_requests) ? response.data.friend_requests : []);
      } catch (error) {
        console.error("Erreur lors de la récupération des demandes d'amis", error);
        toast.error('Erreur lors de la récupération des demandes d\'amis');
      } finally {
        setLoading(false);
      }
    };

    fetchFriendRequests();
  }, []);

  const handleResponse = async (friendId, response) => {
    try {
      const token = Cookies.get("token"); // Récupérer le token des cookies
      await api.post('/api/respond-friend-request', { friend_id: friendId, status: response }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFriendRequests(prevRequests => prevRequests.filter(req => req.id !== friendId));
      toast.success(`Demande d'ami ${response === 'accepted' ? 'acceptée' : response === 'declined' ? 'refusée' : 'bloquée'}`);
    } catch (error) {
      console.error("Erreur lors de la réponse à la demande d'ami", error);
      toast.error('Erreur lors de la réponse à la demande d\'ami');
    }
  };

  const handleOutsideClick = useCallback((e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [handleOutsideClick]);

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div ref={modalRef} className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-2xl"> {/* Agrandir la fenêtre modale */}
        <h2 className="text-2xl font-bold mb-6 text-white text-center">
          Demandes d'amis
        </h2>
        {loading ? (
          <div>Chargement des demandes d'amis...</div>
        ) : friendRequests.length === 0 ? (
          <div className='text-gray-200'>Aucune demande d'ami en attente.</div>
        ) : (
          <ul>
            {friendRequests.map(request => (
              <li key={request.id} className="friend-request flex justify-between items-center mb-4">
                <span className="text-white">{request.name} {request.surname} ({request.username})</span>
                <div className="flex space-x-2"> {/* Garder les boutons sur une seule ligne */}
                  <button 
                    onClick={() => handleResponse(request.id, 'accepted')}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Accepter
                  </button>
                  <button 
                    onClick={() => handleResponse(request.id, 'declined')}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    Refuser
                  </button>
                  <button 
                    onClick={() => handleResponse(request.id, 'blocked')}
                    className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
                  >
                    Bloquer
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

export default FriendRequestModal;
