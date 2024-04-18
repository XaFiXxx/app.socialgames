import React from 'react';

function Home() {
  return (
    <div className="bg-gray-700 text-white">
      {/* Hero section */}
      <section className="text-center py-20">
        <h1 className="text-5xl font-bold mb-4">Bienvenue sur GameSocial</h1>
        <p className="text-xl mb-8">Le réseau social pour les passionnés de jeux vidéo.</p>
      </section>

      {/* Popular Games section */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-6">Jeux Populaires</h2>
          {/* Game cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Dynamic game cards go here */}
          </div>
        </div>
      </section>

      {/* Latest News section */}
      <section className="bg-gray-800 py-10">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-6">Dernières Actualités</h2>
          {/* News cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Dynamic news cards go here */}
          </div>
        </div>
      </section>

      {/* Community section */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-6">Communauté</h2>
          {/* Community highlights or discussion threads */}
        </div>
      </section>
    </div>
  );
}

export default Home;
