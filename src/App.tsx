import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import { SearchResults } from './pages/SearchResults';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeSearch } from './pages/HomeSearch';

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  
  if (loading) return <div>Loading...</div>;
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  return <>{children}</>;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route 
        path="/search" 
        element={
          <ProtectedRoute>
            <SearchResults />
          </ProtectedRoute>
        } 
      />
      <Route path="/homesearch" element={<HomeSearch />} />
      {/* Add other protected routes as needed */}
    </Routes>
  );
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex flex-col flex-grow h-full">
             <AppRoutes />
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}