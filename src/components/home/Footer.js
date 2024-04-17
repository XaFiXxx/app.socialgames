// components/Footer.js

import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-900 text-white text-center p-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div className="text-sm">
            © {new Date().getFullYear()} GameSocial. Tous droits réservés.
          </div>
          <div>
            <a href="/about" className="hover:text-gray-400 text-sm">À propos</a>
            <span className="mx-2">|</span>
            <a href="/terms" className="hover:text-gray-400 text-sm">Conditions d'utilisation</a>
            <span className="mx-2">|</span>
            <a href="/privacy" className="hover:text-gray-400 text-sm">Politique de confidentialité</a>
          </div>
        </div>
        <div className="mt-4">
          <span>Suivez-nous sur les réseaux sociaux:</span>
          {/* Ici, tu peux ajouter des icônes de réseaux sociaux ou d'autres liens */}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
