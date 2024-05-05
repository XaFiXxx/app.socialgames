import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [debounceTimeout, setDebounceTimeout] = useState(null);
  const navigate = useNavigate();

  // Fonction pour charger les suggestions de manière délayée
  const fetchSuggestions = async (query) => {
    if (!query) {
      setSuggestions([]);
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:8000/api/search/suggestions?query=${query}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Assumons que response.data contient deux listes: users et games
      const combinedSuggestions = [
        ...response.data.users.map((user) => ({
          ...user,
          label: user.username,
          type: "User",
        })),
        ...response.data.games.map((game) => ({
          ...game,
          label: game.name,
          type: "Game",
        })),
      ];
      setSuggestions(combinedSuggestions);
    } catch (error) {
      console.error("Erreur lors du chargement des suggestions:", error);
    }
  };

  // Fonction pour gérer les changements de l'input
  const handleInputChange = (e) => {
    const { value } = e.target;
    setSearchTerm(value);
    clearTimeout(debounceTimeout);
    const newTimeout = setTimeout(() => {
      fetchSuggestions(value);
    }, 300);
    setDebounceTimeout(newTimeout);
  };

  // Fonction pour gérer la soumission du formulaire
  const handleSearch = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:8000/api/search?query=${searchTerm}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate("/search-results", { state: { results: response.data } });
      setSearchTerm("");
      setSuggestions([]);
    } catch (error) {
      console.error("Erreur lors de la recherche:", error);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSearch} className="relative">
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Rechercher..."
        className="px-3 py-2 rounded bg-gray-200 text-gray-700 focus:outline-none focus:bg-white focus:text-gray-900 w-full"
        disabled={loading}
      />
      <ul className="absolute z-10 w-full bg-white shadow-lg max-h-60 overflow-auto">
        {suggestions.map((suggestion, index) => (
          <li
            key={index}
            className="p-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => {
              setSearchTerm(suggestion.label); // Utilise le champ 'label' pour remplir le champ de recherche
              setSuggestions([]); // Vide les suggestions après sélection
            }}
          >
            {suggestion.label}
          </li>
        ))}
      </ul>
      <button
        type="submit"
        className="absolute right-2 top-2 text-pink-400 focus:outline-none"
        disabled={loading}
      >
        {loading ? (
          "Chargement..."
        ) : (
          <span role="img" aria-label="Rechercher">
            🔍
          </span>
        )}
      </button>
    </form>
  );
}

export default SearchBar;
