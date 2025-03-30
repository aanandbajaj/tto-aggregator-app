import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { SearchBar } from './components/SearchBar';
import { SearchResults } from './pages/SearchResults';

function HomePage() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl text-center">
        <h1 className="text-4xl font-bold mb-6 text-gray-900">
          The World's First Search Engine For University Discoveries
        </h1>
        <p className="text-lg mb-12 text-gray-600">
          Search through <span className="bg-blue-600 text-white px-3 py-1 rounded-lg">5,000+</span> technologies from leading universities ready
          for commercialization
        </p>
        <SearchBar className="max-w-3xl mx-auto" />
      </div>
    </main>
  );
}

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/search" element={<SearchResults />} />
    </Routes>
  );
}