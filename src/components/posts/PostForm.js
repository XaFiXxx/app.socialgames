import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function PostForm() {
  const [postContent, setPostContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!postContent.trim()) {
      toast.error("Le contenu du post ne peut pas être vide.");
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user'));  // Assurez-vous que 'user' est la clé exacte où vous stockez l'objet utilisateur
      const user_id = user.id;

      await axios.post('http://localhost:8000/api/create/post', {
        content: postContent,
        user_id
      }, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      toast.success('Post créé avec succès!');
      setPostContent('');
    } catch (error) {
      console.error('Erreur lors de la création du post:', error);
      toast.error("Erreur lors de la création du post.");
    }
  };

  return (
    <div className="flex justify-center pt-5">
      <div className="w-full max-w-xl bg-white rounded-lg shadow-md p-4">
        <form onSubmit={handleSubmit}>
          <textarea
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            placeholder="A quoi avez-vous joué aujourd'hui Benjamin?"
            rows="4"
            className="resize-none w-full p-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
          <div className="flex justify-between items-center mt-3">
            <div className="flex space-x-4 items-center">
                <button
                    type="button"
                    className="flex items-center justify-center p-2 rounded-full text-blue-500 hover:text-blue-600 transition bg-blue-100 hover:bg-blue-200"
                    aria-label="Ajouter une image"
                >
                    <img src="/img/logoImg.webp" className="h-8 w-8" alt="Ajouter" />
                </button>
                <button
                    type="button"
                    className="flex items-center justify-center p-2 rounded-full text-green-500 hover:text-green-600 transition bg-green-100 hover:bg-green-200"
                    aria-label="Ajouter une vidéo"
                >
                    <img src="/img/logoVideo.webp" className="h-8 w-8" alt="Ajouter" />
                </button>
                {/* Ajoutez d'autres boutons ici si nécessaire */}
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition"
            >
              Publier
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PostForm;
