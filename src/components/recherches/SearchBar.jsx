import React, { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [debounceTimeout, setDebounceTimeout] = useState(null);
  const [isFocused, setIsFocused] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const navigate = useNavigate();
  const suggestionsRef = useRef(null);

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
      // Assumons que response.data contient trois listes: users, games et groups
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
        ...response.data.groups.map((group) => ({
          ...group,
          label: group.name,
          type: "Group",
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
    setSelectedSuggestionIndex(-1); // Reset selection
  };

  // Fonction pour gérer la soumission du formulaire
  const handleSearch = async (event) => {
    event.preventDefault();
    if (!searchTerm.trim()) {
      // Afficher un message d'erreur ou empêcher la recherche si le terme de recherche est vide
      toast.error("Veuillez entrer un terme de recherche.");
      return;
    }
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
      setIsFocused(false); // Cache les suggestions après la recherche
    } catch (error) {
      console.error("Erreur lors de la recherche:", error);
    }
    setLoading(false);
  };

  // Fonction pour gérer la navigation dans les suggestions avec les flèches du clavier
  const handleKeyDown = (event) => {
    if (event.key === "ArrowDown") {
      setSelectedSuggestionIndex((prevIndex) =>
        prevIndex < suggestions.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (event.key === "ArrowUp") {
      setSelectedSuggestionIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : prevIndex
      );
    } else if (event.key === "Enter") {
      if (selectedSuggestionIndex >= 0) {
        setSearchTerm(suggestions[selectedSuggestionIndex].label);
        setSuggestions([]);
        setIsFocused(false);
      }
      handleSearch(event); // Execute search
    } else if (event.key === "Escape") {
      setIsFocused(false); // Cache les suggestions avec 'Escape'
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative">
      <ToastContainer />
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        onFocus={() => setIsFocused(true)}
        onKeyDown={handleKeyDown}
        placeholder="Rechercher..."
        className="px-3 py-2 rounded bg-gray-200 text-gray-700 focus:outline-none focus:bg-white focus:text-gray-900 w-full"
        disabled={loading}
      />
      {isFocused && suggestions.length > 0 && (
        <ul
          className="absolute z-10 w-full bg-white shadow-lg max-h-60 overflow-auto"
          ref={suggestionsRef}
        >
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className={`p-2 cursor-pointer ${
                index === selectedSuggestionIndex
                  ? "bg-gray-200"
                  : "hover:bg-gray-100"
              }`}
              onMouseDown={(e) => e.preventDefault()} // Prevents losing focus on the input
              onClick={() => {
                setSearchTerm(suggestion.label); // Utilise le champ 'label' pour remplir le champ de recherche
                setSuggestions([]); // Vide les suggestions après sélection
                setIsFocused(false); // Cache les suggestions après sélection
              }}
            >
              {suggestion.label}
            </li>
          ))}
        </ul>
      )}
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
