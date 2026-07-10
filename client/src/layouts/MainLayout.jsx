import React, { useEffect, useState } from 'react';
import { initTheme, toggleTheme } from '../utils/theme';
import { Moon, Sun } from 'lucide-react';
import { Toaster } from 'react-hot-toast';

const MainLayout = ({ children }) => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    setTheme(initTheme());
  }, []);

  const handleToggleTheme = () => {
    setTheme(toggleTheme());
  };

  return (
    <div className="min-h-screen">
      <Toaster position="top-right" />
      
      {/* Top Navigation / Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[color:var(--card-bg)] border-b border-[color:var(--card-border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 font-bold text-xl tracking-tight text-primary flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-blue-500 flex items-center justify-center text-white">
                  R
                </div>
                Routine
              </div>
            </div>
            <div className="flex items-center">
              <button
                onClick={handleToggleTheme}
                className="p-2 rounded-full hover:bg-[color:var(--card-border)] transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label="Toggle dark mode"
              >
                {theme === 'dark' ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-600" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
