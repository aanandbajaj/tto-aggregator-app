import React from 'react';
import { Link } from 'react-router-dom';

export function Header() {
  return <header className="py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-serif font-bold text-gray-900 hover:text-gray-700 transition-colors">
          Papyrus
        </Link>
        <nav>
          <a href="#" className="text-gray-700 hover:text-gray-900">
            Contact
          </a>
        </nav>
      </div>
    </header>;
}