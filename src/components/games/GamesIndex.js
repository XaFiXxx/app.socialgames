import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Assurez-vous que le CSS est importé

function GamesIndex() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/games/index');
        setGames(response.data); // Supposons que cela retourne un tableau de jeux
      } catch (error) {
        console.error('Erreur lors de la récupération des jeux:', error);
        toast.error('Impossible de récupérer les jeux.');
      }
    };
    fetchGames();
  }, []);

  return (
    <div className="container mx-auto px-4">
      <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick pauseOnHover draggable />
      <h2 className="text-4xl font-bold mb-6">Jeux Populaires</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {games.map(game => (
          <div key={game.id} className="bg-white p-4 rounded-lg shadow-md">
            <img src={`/img/${game.cover_image}`} alt={game.name} className="w-full h-64 object-cover rounded-t-lg" />
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-900">{game.name}</h3>
              <p className='text-gray-900'>{game.description}</p>
              {/* Other game details if necessary */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GamesIndex;
