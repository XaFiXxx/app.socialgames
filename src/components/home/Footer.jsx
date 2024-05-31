// components/Footer.js

import React from 'react';

function Footer() {
  return (
    <footer className="bg-green-700 text-gray-900 text-center p-4">
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
      </div>
    </footer>
  );
}

export default Footer;
