import { Routes, Route } from 'react-router-dom';
import { SearchResults } from './pages/SearchResults';
import { HomeSearch } from './pages/HomeSearch';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomeSearch />} />
      <Route path="/search" element={<SearchResults />} />
      <Route path="/homesearch" element={<HomeSearch />} />
    </Routes>
  );
}