import React, { useState, useEffect } from "react";
import api from '../../axiosConfig';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PostForm from "../posts/PostForm";
import Posts from "../posts/Posts";
import GameCarousel from "./GameCarousel";
import Cookies from 'js-cookie'; // Importer js-cookie

function Home() {
  const [posts, setPosts] = useState([]);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true); // Ajout d'un état pour le chargement

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // On suppose que l'utilisateur est authentifié et que le token est dans les cookies
        const token = Cookies.get("token");
        const response = await api.get("/api/home", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data) {
          setPosts(response.data.posts);
          setGames(response.data.games);
        } else {
          throw new Error("Données invalides reçues de l'API.");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des posts:", error);
        toast.error("Impossible de récupérer les posts.");
      } finally {
        setLoading(false); // Terminer le chargement après la tentative de récupération des données
      }
    };
    fetchPosts();
  }, []);

  const handleNewPost = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  return (
    <div className="bg-gray-800 text-gray-200 min-h-screen">
      <ToastContainer position="bottom-right" autoClose={2000} hideProgressBar newestOnTop closeOnClick />
      <section className="text-center pt-8">
        <h1 className="text-5xl font-bold mb-4">Bienvenue sur GameSocial</h1>
        <p className="text-xl mb-8">
          Le réseau social pour les passionnés de jeux vidéo.
        </p>
      </section>

      <div className="mt-4 w-full max-w-4xl mx-auto ">
        <PostForm onPostSubmit={handleNewPost} />
      </div>

      {loading ? (
        <div className="text-center mt-8">
          <p>Chargement des données...</p>
        </div>
      ) : (
        <>
          <section className="flex flex-col items-center mb-8">
            <h2 className="text-3xl font-bold mt-8">Derniers posts</h2>
            <Posts posts={posts} />
          </section>

          <section className="flex flex-col items-center mb-8">
            <h2 className="text-3xl font-bold mt-8">Jeux populaires</h2>
            <GameCarousel games={games} />
          </section>
        </>
      )}
    </div>
  );
}

export default Home;
