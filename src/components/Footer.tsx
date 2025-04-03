import React from 'react';
export function Footer() {
  return <footer className="py-8 px-4 sm:px-6 lg:px-8" style={{
    backgroundColor: 'white'
  }}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <p className="text-gray-600 text-sm">
            © 2023 Papyrus. All rights reserved.
          </p>
        </div>
        <div className="flex space-x-6">
          <a href="#" className="text-gray-600 hover:text-blue-600 text-sm">
            Help
          </a>
        </div>
      </div>
    </footer>;
}