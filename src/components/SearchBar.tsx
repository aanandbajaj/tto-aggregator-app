import React, { useState } from 'react';
import { Search, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';

interface SearchBarProps {
  placeholder?: string
  buttonText?: string
  initialQuery?: string
  className?: string
}

export function SearchBar({ 
  placeholder = "Search technologies, inventors, and keywords...", 
  buttonText = "Search",
  initialQuery = '',
  className = ''
}: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`flex w-full items-center ${className}`}>
      <div className="relative flex-grow">
        <input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full h-14 px-6 py-2 text-lg border-2 border-r-0 border-slate-200 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
        />
      </div>
      <button 
        type="submit" 
        className="h-14 px-8 bg-blue-600 hover:bg-blue-700 text-white rounded-r-md border-2 border-blue-600 hover:border-blue-700 transition-colors"
        aria-label={buttonText}
      >
        <Search className="h-6 w-6" />
      </button>
      <div className="ml-2">
        <Info 
          className="h-6 w-6 text-gray-500 cursor-pointer" 
          data-tooltip-id="advanced-search-tooltip"
          data-tooltip-content="Use AND, OR, and NOT for advanced search. Example: 'term1 AND term2'"
        />
        <Tooltip id="advanced-search-tooltip" />
      </div>
    </form>
  );
}