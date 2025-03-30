import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { AppRoutes } from './routes';

export function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen" style={{
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
      }}>
        <Header />
        <AppRoutes />
        <Footer />
      </div>
    </BrowserRouter>
  );
}