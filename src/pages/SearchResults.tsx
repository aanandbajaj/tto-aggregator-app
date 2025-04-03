import React, { useState, useEffect } from 'react';
import { SearchBar } from '../components/SearchBar';
import { useSearchParams } from 'react-router-dom';
import { useSearchTechnologies } from '../hooks/useSearchTechnologies';
import { X } from 'lucide-react';

// Define the technology interface
interface Technology {
  id: number;
  title: string;
  description?: string;
  inventors: string[];
  technology_areas: string[];
  university_name?: string;
  case_number?: string;
  url?: string;
}

// Maximum length for description preview
const MAX_DESCRIPTION_LENGTH = 150;

export function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { results, isLoading, error, searchTechnologies } = useSearchTechnologies();
  const [selectedTech, setSelectedTech] = useState<Technology | null>(null);

  useEffect(() => {
    if (query) {
      searchTechnologies(query);
    }
  // searchTechnologies should be included in dependency array if it's stable
  // eslint-disable-next-line react-hooks/exhaustive-deps 
  }, [query]);

  const handleCardClick = (tech: Technology) => {
    // Log the tech object being passed when a card is clicked
    console.log('handleCardClick - tech object received:', JSON.stringify(tech, null, 2)); 
    setSelectedTech(tech);
  };

  const closeDetailsPanel = () => {
    setSelectedTech(null);
  };

  const truncateText = (text: string, maxLength: number): string => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <SearchBar initialQuery={query} className="max-w-none" />
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row h-[calc(100vh-80px)] overflow-hidden">
        <main className={`overflow-auto h-full px-4 sm:px-6 lg:px-8 py-8 ${
          selectedTech 
            ? 'md:w-1/2 hidden md:block' // Hide on mobile when item selected, show as half width on desktop
            : 'w-full max-w-7xl mx-auto'
        }`}>
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
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1">
              {results.map(tech => (
                <div 
                  key={tech.id} 
                  className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow h-full flex flex-col cursor-pointer"
                  onClick={() => handleCardClick(tech)}
                >
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {tech.title}
                  </h3>
                  {tech.university_name && (
                    <p className="text-sm text-gray-500 mb-2">
                      {tech.university_name}
                    </p>
                  )}
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
                  {tech.description ? (
                    <div className="flex-grow">
                      <p className="text-gray-700">
                        {truncateText(tech.description, MAX_DESCRIPTION_LENGTH)}
                      </p>
                      {tech.description.length > MAX_DESCRIPTION_LENGTH && (
                        <button className="text-blue-600 font-medium mt-2">
                          Read more
                        </button>
                      )}
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          )}
        </main>

        {selectedTech && (
          <div className="w-full md:w-1/2 h-full overflow-auto border-l border-gray-200 bg-white p-8 relative">
            <button 
              onClick={closeDetailsPanel}
              className="absolute top-4 left-4 p-2 rounded-full hover:bg-gray-100"
              aria-label="Close details"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
            
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{selectedTech.title}</h2>
              
              <div className="mb-6">
                <h3 className="text-sm font-medium uppercase tracking-wider text-gray-500 mb-2">University</h3>
                <p className="text-gray-900">{selectedTech.university_name || "Not specified"}</p>
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-medium uppercase tracking-wider text-gray-500 mb-2">Inventors</h3>
                <p className="text-gray-900">
                  {selectedTech.inventors && selectedTech.inventors.length > 0 
                    ? selectedTech.inventors.join(', ')
                    : "Not specified"}
                </p>
              </div>

              {selectedTech.description ? (
                <div className="mb-6">
                  <h3 className="text-sm font-medium uppercase tracking-wider text-gray-500 mb-2">Description</h3>
                  <p className="text-gray-700 whitespace-pre-line">
                    {selectedTech.description}
                  </p>
                </div>
              ) : null}

              <div className="relative mt-8">
                <div className="sticky bottom-4 bg-white py-4">
                  {selectedTech.url && (
                    <a 
                      href={selectedTech.url} 
                      className="inline-block px-6 py-2 bg-blue-600 text-white text-center rounded mx-auto"
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      View Original Listing
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 