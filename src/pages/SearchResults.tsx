import React from 'react';
import { SearchBar } from '../components/SearchBar';
import { useSearchParams } from 'react-router-dom';
import { useSearchTechnologies } from '../hooks/useSearchTechnologies';
import { useEffect } from 'react';

export function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { results, isLoading, error, searchTechnologies } = useSearchTechnologies();

  useEffect(() => {
    if (query) {
      searchTechnologies(query);
    }
  }, [query]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <SearchBar initialQuery={query} className="max-w-none" />
        </div>
      </div>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading ? (
          <div className="text-center py-12">
            <div className="text-gray-600">Loading results...</div>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="text-red-600">Error: {error}</div>
          </div>
        ) : results.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">No results found</h2>
            <p className="text-gray-600">
              Sorry, we couldn't find any technologies matching "{query}". Try using different keywords.
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {results.map(tech => (
              <div key={tech.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {tech.title}
                </h3>
                {tech.inventors && tech.inventors.length > 0 && (
                  <p className="text-sm text-gray-600 mb-3">
                    Inventors: {tech.inventors.join(', ')}
                  </p>
                )}
                {tech.technology_areas && tech.technology_areas.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {tech.technology_areas.map((area, index) => (
                      <span 
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                )}
                {tech.description && (
                  <p className="text-gray-700">
                    {tech.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
} 