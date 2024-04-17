import React from 'react';

function Home() {
  return (
    <div className="bg-gray-700 min-h-screen">
      <div className="container mx-auto px-4">
        <header className="text-white text-center py-10">
          <h1 className="text-4xl font-bold mb-3">Bienvenue sur GameSocial</h1>
          <p className="text-xl">Le réseau social pour les passionnés de jeux vidéo.</p>
        </header>

        <section className="mb-10">
          <h2 className="text-3xl text-white font-bold mb-5">Jeux Populaires</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Ici, tu pourrais mapper sur un tableau de jeux pour les afficher */}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl text-white font-bold mb-5">Dernières Actualités</h2>
          <div className="space-y-4">
            {/* Ici, tu pourrais afficher les dernières actualités ou posts des utilisateurs */}
          </div>
        </section>

      </div>
    </div>
  );
}

export default Home;
