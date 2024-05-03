import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function FormPlateforms({ onSave }) {
  const [platforms, setPlatforms] = useState([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState(new Set());

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      try {
        const [allPlatformsResponse, userPlatformsResponse] = await Promise.all(
          [
            axios.get("http://localhost:8000/api/platforms", {
              headers: { Authorization: `Bearer ${token}` },
            }),
            axios.get("http://localhost:8000/api/user/platforms", {
              headers: { Authorization: `Bearer ${token}` },
            }),
          ]
        );
        setPlatforms(allPlatformsResponse.data);
        setSelectedPlatforms(
          new Set(userPlatformsResponse.data.map((p) => p.id))
        );
      } catch (error) {
        console.error("Error fetching platforms:", error);
        if (error.response) {
          toast.error(
            `Erreur lors de la récupération: ${error.response.data.message}`
          );
        } else {
          toast.error("Erreur de connexion au serveur");
        }
      }
    };

    fetchData();
  }, []);

  const handlePlatformChange = (platformId) => {
    setSelectedPlatforms((current) => {
      const updated = new Set(current);
      if (updated.has(platformId)) {
        updated.delete(platformId);
      } else {
        updated.add(platformId);
      }
      return updated;
    });
  };

  const submitPlatforms = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        "http://localhost:8000/api/user/update/platforms",
        {
          platforms: Array.from(selectedPlatforms),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Plateformes mises à jour !");
      if (typeof onSave === "function") {
        onSave(Array.from(selectedPlatforms));
      } else {
        console.error("onSave prop is not a function or not provided.");
      }
    } catch (error) {
      console.error("Error updating platforms:", error);
      if (error.response) {
        toast.error(
          `Erreur lors de la mise à jour: ${error.response.data.message}`
        );
      } else {
        toast.error("Impossible de connecter au serveur pour la mise à jour");
      }
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <h3 className="text-gray-100 text-lg font-bold mb-2">
        Choisissez vos plateformes de jeux :
      </h3>
      <div className="flex flex-wrap">
        {platforms.map((platform) => (
          <div key={platform.id} className="mr-2 mb-2">
            <button
              onClick={() => handlePlatformChange(platform.id)}
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border-2 ${
                selectedPlatforms.has(platform.id)
                  ? "bg-green-600 text-gray-800 border-blue-600"
                  : "text-gray-200 border-gray-600 hover:bg-gray-700"
              }`}
              aria-pressed={selectedPlatforms.has(platform.id)}
            >
              {platform.name}
            </button>
          </div>
        ))}
      </div>
      <button onClick={submitPlatforms} className="btn btn-blue mt-4">
        Sauvegarder les modifications
      </button>
    </div>
  );
}

export default FormPlateforms;
