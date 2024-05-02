import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PostForm from "../posts/PostForm";
import Post from "../posts/Posts";

function Home() {
  const [posts, setPosts] = useState([]); // État pour stocker les posts

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8000/api/home", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPosts(response.data); // Stocker les posts dans l'état
        console.log(response.data); // Afficher les données dans la console pour vérifier
      } catch (error) {
        console.error("Erreur lors de la récupération des posts:", error);
        toast.error("Impossible de récupérer les posts.");
      }
    };

    fetchPosts(); // Appel de la fonction au montage du composant
  }, []); // Le tableau vide assure que l'effet s'exécute une seule fois au montage

  return (
    <div className="bg-gray-800 text-gray-200 min-h-screen">
      <section className="text-center pt-8">
        <h1 className="text-5xl font-bold mb-4">Bienvenue sur GameSocial</h1>
        <p className="text-xl mb-8">
          Le réseau social pour les passionnés de jeux vidéo.
        </p>
      </section>
      <PostForm />

      <section className="flex flex-col items-center mb-8">
        <h2 className="text-3xl font-bold mt-8">Derniers posts</h2>
        <Post posts={posts} />
      </section>
    </div>
  );
}

export default Home;
