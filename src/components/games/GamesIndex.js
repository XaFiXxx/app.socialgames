// GamesIndex.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import GameCard from './GameCard'; // Assure-toi que le chemin d'importation est correct
import 'react-toastify/dist/ReactToastify.css';

function GamesIndex() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8000/api/games/index', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setGames(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des jeux:', error);
        toast.error('Impossible de récupérer les jeux.');
      }
    };
    fetchGames();
  }, []);
  

  return (
    <div className="container mx-auto px-4 min-h-screen">
      <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick pauseOnHover draggable />
      <h2 className="text-4xl font-bold mb-6">Jeux Populaires</h2>
      <div className="grid bg-gray-800 grid-cols-1 md:grid-cols-3 gap-6">
        {games.map(game => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
}

export default GamesIndex;
