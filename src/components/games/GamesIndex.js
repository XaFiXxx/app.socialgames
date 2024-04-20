import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import GameCard from './GameCard'; // Assurez-vous que le chemin est correct
import 'react-toastify/dist/ReactToastify.css';

function GamesIndex() {
  const [games, setGames] = useState([]);

  // Déclaration de fetchGames en dehors de useEffect pour la réutiliser
  const fetchGames = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8000/api/games/index', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setGames(response.data); // Suppose que la réponse contient une liste de jeux
    } catch (error) {
      console.error('Erreur lors de la récupération des jeux:', error);
      toast.error('Impossible de récupérer les jeux.');
    }
  };

  useEffect(() => {
    fetchGames();  // Appel initial à fetchGames lors du montage du composant
  }, []);

  // Gérer le suivi/désuivi d'un jeu
  const handleToggleFollow = async (gameId, isFollowed) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`http://localhost:8000/api/games/${gameId}/follow`, { isFollowed }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      // Recharger la liste des jeux pour refléter le changement d'état
      fetchGames(); // Réutiliser la fonction fetchGames pour actualiser la liste
      toast.success(isFollowed ? 'Jeu suivi avec succès !' : 'Suivi retiré avec succès !');
    } catch (error) {
      console.error('Erreur lors du suivi/désuivi:', error);
      toast.error('Erreur lors du changement de suivi.');
    }
  };

  return (
    <div className="container mx-auto px-4 min-h-screen">
      <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick pauseOnHover draggable />
      <h2 className="text-4xl font-bold mb-6 pt-4">Jeux Populaires</h2>
      <div className="grid bg-gray-800 grid-cols-1 md:grid-cols-3 gap-6">
        {games.map(game => (
          <GameCard key={game.id} game={game} onToggleFollow={handleToggleFollow} />
        ))}
      </div>
    </div>
  );
}

export default GamesIndex;
