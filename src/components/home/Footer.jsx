// components/Footer.js

import React from 'react';

function Footer() {
  return (
    <footer className="bg-green-700 text-gray-900 text-center p-4">
      <div className="container mx-auto">
        <div className="flex justify-center items-center">
          <div className="text-sm">
            © {new Date().getFullYear()} GameSocial. Tous droits réservés.
          </div>
        
        </div>
      </div>
    </footer>
  );
}

export default Footer;
