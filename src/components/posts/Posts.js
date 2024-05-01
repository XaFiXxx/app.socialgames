import React, { useState, useEffect, useRef } from 'react';

// CommentModal.js
function CommentModal({ show, onClose, onSubmit }) {
  const [comment, setComment] = useState('');
  const modalRef = useRef(null);  // Ajout d'une référence pour accéder au modal

  // Gestion des événements clavier et focus
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();  // Permet de fermer le modal avec la touche Échap
      }
    };

    // Focus automatique sur le textarea quand le modal s'ouvre
    if (show) {
      document.addEventListener('keydown', handleKeyDown);
      modalRef.current?.querySelector('textarea').focus();
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [show, onClose]);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = () => {
    onSubmit(comment);
    setComment('');
    onClose();
  };

  const handleOverlayClick = (e) => {
    if (e.target.id === "modal-overlay") {
      onClose();
    }
  };

  if (!show) {
    return null;
  }

  return (
    <div id="modal-overlay" className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" onClick={handleOverlayClick}>
      <div ref={modalRef} className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="text-right">
          <button className="text-gray-600 hover:text-gray-700" onClick={onClose}>
            [X]
          </button>
        </div>
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Ajouter un commentaire</h3>
          <div className="mt-2 px-7 py-3">
            <textarea
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Votre commentaire..."
              value={comment}
              onChange={handleCommentChange}
            ></textarea>
          </div>
          <div className="items-center px-4 py-3">
            <button
              className="px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300"
              onClick={handleCommentSubmit}
            >
              Poster
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Post Component
function Post({ post }) {
  const [showCommentModal, setShowCommentModal] = useState(false);

  const addComment = (text) => {
    console.log('Commentaire ajouté:', text);
    // Ajouter ici la logique pour envoyer le commentaire à l'API ou le stocker
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <p className="text-gray-600">{post.content}</p>
      <div className="flex justify-between items-center mt-4">
        <button className="flex items-center text-blue-500 hover:text-blue-600">
          <span className="inline-block mr-2">👍</span>
          Like
        </button>
        <button
          onClick={() => setShowCommentModal(true)}
          className="flex items-center text-green-500 hover:text-green-600"
        >
          <span className="inline-block mr-2">💬</span>
          Commenter
        </button>
        <span className="text-gray-400">2 commentaires</span>
      </div>
      <CommentModal
        show={showCommentModal}
        onClose={() => setShowCommentModal(false)}
        onSubmit={addComment}
      />
    </div>
  );
}

// Posts Component
function Posts({ posts }) {
  if (!Array.isArray(posts) || !posts.length) {
    return <p className="text-gray-300 text-center mt-4">Aucun post à afficher.</p>;
  }

  return (
    <div className="container mx-auto mt-8 max-w-4xl">
      <h2 className="text-xl text-gray-700 font-bold mb-4 text-center">Vos Posts</h2>
      <div className="space-y-4">
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default Posts;
