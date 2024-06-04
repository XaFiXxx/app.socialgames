import React, { useState, useEffect } from "react";
import api from '../../axiosConfig'; // Assurez-vous que le chemin est correct
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PostForm from "../posts/PostForm";
import Posts from "../posts/Posts";
import GameCarousel from "./GameCarousel";

function Home() {
  const [posts, setPosts] = useState([]);
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await api.get("/api/home", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPosts(response.data.posts);
        setGames(response.data.games);
        console.log(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des posts:", error);
        toast.error("Impossible de récupérer les posts.");
      }
    };
    fetchPosts();
  }, []);

  const handleNewPost = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  return (
    <div className="bg-gray-800 text-gray-200 min-h-screen">
      <section className="text-center pt-8">
        <h1 className="text-5xl font-bold mb-4">Bienvenue sur GameSocial</h1>
        <p className="text-xl mb-8">
          Le réseau social pour les passionnés de jeux vidéo.
        </p>
      </section>

      <div className="mt-4 w-full max-w-4xl mx-auto ">
        <PostForm onPostSubmit={handleNewPost} />
      </div>

      <section className="flex flex-col items-center mb-8">
        <h2 className="text-3xl font-bold mt-8">Derniers posts</h2>
        <Posts posts={posts} />
      </section>

      <section className="flex flex-col items-center mb-8">
        <h2 className="text-3xl font-bold mt-8">Jeux populaires</h2>
        <GameCarousel games={games} />
      </section>
    </div>
  );
}

export default Home;
