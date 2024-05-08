import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PostForm from "../posts/PostForm";
import Posts from "../posts/Posts";

const ShowGroup = () => {
  const { id } = useParams();
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchGroup();
  }, [id]);

  const fetchGroup = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `http://localhost:8000/api/group/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setGroup(response.data);
    } catch (err) {
      console.error(
        "Erreur lors de la récupération des détails du groupe:",
        err
      );
      setError("Erreur lors de la récupération des données");
      toast.error("Erreur lors de la récupération des détails du groupe.");
    } finally {
      setLoading(false);
    }
  };

  const handleFollowGroup = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `http://localhost:8000/api/group/${id}/follow`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(response.data.message); // Afficher le message retourné par le serveur
      setGroup((prevGroup) => ({
        ...prevGroup,
        is_member: !prevGroup.is_member, // Bascule l'état d'appartenance
      }));
    } catch (err) {
      console.error("Erreur lors de la tentative de suivi du groupe:", err);
      toast.error(
        err.response.data.message ||
          "Erreur lors de la tentative de suivi du groupe."
      );
    }
  };

  if (loading) return <div className="text-center">Chargement...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (!group)
    return <div className="text-center text-red-500">Groupe non trouvé.</div>;

  return (
    <div className="container mx-auto p-4">
      <ToastContainer />
      <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg">
        <div className="bg-gray-800 mb-6 p-4 rounded-lg">
          <img
            src={`http://localhost:8000/${group.group_image}`}
            alt={`${group.name} cover`}
            className="w-full h-64 object-cover rounded-lg"
          />
          <h1 className="text-3xl font-bold mt-4">{group.name}</h1>
          <p className="mt-2">{group.description}</p>
          <p className="mt-2 italic">Privacy: {group.privacy}</p>

          <button onClick={handleFollowGroup} className="btn btn-blue mt-4">
            {group.is_member ? "Ne plus suivre" : "Suivre le groupe"}
          </button>

          <div className="mt-4">
            <h2 className="font-bold">Jeu associé:</h2>
            {group.game ? (
              <div className="mt-2">
                <img
                  src={`http://localhost:8000/${group.game.cover_image}`}
                  alt={group.game.name}
                  className="w-32 h-32 object-cover rounded-md"
                />
                <p className="mt-2 font-semibold">{group.game.name}</p>
                <p>{group.game.description}</p>
                <p className="italic">Développé par: {group.game.developer}</p>
                <p className="italic">Publié par: {group.game.publisher}</p>
                <p className="italic">
                  Date de sortie: {group.game.release_date}
                </p>
              </div>
            ) : (
              <p>Aucun jeu associé</p>
            )}
          </div>

          <div className="mt-4">
            <h2 className="font-bold">Membres du groupe:</h2>
            {group.members.map((member) => (
              <p key={member.id}>{member.username}</p>
            ))}
          </div>

          {/* Intégration du composant PostForm */}
          <div className="mt-4">
            <PostForm groupId={group.id} />
          </div>

          {/* Intégration du composant Posts */}
          <div className="mt-4">
            <h2 className="font-bold">Posts récents:</h2>
            <Posts posts={group.posts} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowGroup;
