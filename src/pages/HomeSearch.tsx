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
            <div className="max-w-4xl">
                <h1 className="text-3xl sm:text-4xl :text-5xl font-serif font-bold mb-6 leading-tight text-gray-900">
                    The Only Advanced Search Engine For University Discoveries

                </h1>


            </div>


            <div className="w-full max-w-xl mx-auto">
                <p className="text-lg sm:text-xl mb-8 text-gray-600 max-w-2xl mx-auto">
                    Search through <span className="bg-blue-600 text-white px-2 py-0.5 rounded-lg">10,000+</span> technologies from leading universities ready for commercialization.
                </p>
                <SearchBar placeholder="Search technologies, universities, inventors..." />
            </div>
        </div>
    );
}