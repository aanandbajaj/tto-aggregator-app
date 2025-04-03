import React from 'react';
import { SearchBar } from '../components/SearchBar';

export function HomeSearch() {
  return (
    <div 
      className="flex-grow flex flex-col items-center justify-center text-center p-4" 
      style={{
        backgroundColor: '#F0F4F8', 
        backgroundImage: `
          linear-gradient(
            rgba(148, 163, 184, 0.1) 1px, 
            transparent 1px
          ),
          linear-gradient(
            90deg, 
            rgba(148, 163, 184, 0.1) 1px, 
            transparent 1px
          )
        `,
        backgroundSize: '20px 20px'
      }}
    >

        <h1 className="text-3xl sm:text-4xl :text-5xl font-serif font-bold mb-6 leading-tight text-gray-900">
          Papyrus
        </h1>

      <div className="w-full max-w-xl mx-auto">
          <SearchBar placeholder="Search destinations..." />
        </div>
    </div>
  );
}