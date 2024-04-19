import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Home() {
  // Fonction pour afficher le toast
  const showToast = () => {
    toast("Voici votre toast de test !", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div className="bg-gray-800 text-gray-200 min-h-screen">
      <ToastContainer />
      {/* Hero section */}
      <section className="text-center py-20">
        <h1 className="text-5xl font-bold mb-4">Bienvenue sur GameSocial</h1>
        <p className="text-xl mb-8">Le réseau social pour les passionnés de jeux vidéo.</p>
        <button onClick={showToast} className="px-6 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition duration-300">
          Test Toast
        </button>
      </section>

    </div>
  );
}

export default Home;
