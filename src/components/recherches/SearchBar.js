import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem("token"); // Récupération du token depuis le localStorage
      const response = await axios.get(
        `http://localhost:8000/api/search/users?username=${searchTerm}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Utilisation du token dans les headers de la requête
          },
        }
      );
      // Navigation vers une page de résultats de recherche, par exemple
      navigate("/search-results", { state: { results: response.data } });
    } catch (error) {
      console.error("Erreur lors de la recherche:", error);
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Rechercher..."
        className="px-3 py-2 rounded bg-gray-200 text-gray-700 focus:outline-none focus:bg-white focus:text-gray-900 w-full"
      />
      <button
        type="submit"
        className="absolute right-2 top-2 text-pink-400 focus:outline-none"
      >
        <span role="img" aria-label="Rechercher">
          🔍
        </span>
      </button>
    </form>
  );
}

export default SearchBar;
