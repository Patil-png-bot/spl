
import React from 'react';
import type { AppView } from '../types';
import { TrophyIcon } from './IconComponents';

interface HeaderProps {
  activeView: AppView;
  setActiveView: (view: AppView) => void;
}

const NavButton: React.FC<{
  label: string;
  viewName: AppView;
  activeView: AppView;
  onClick: (view: AppView) => void;
}> = ({ label, viewName, activeView, onClick }) => {
  const isActive = activeView === viewName;
  return (
    <button
      onClick={() => onClick(viewName)}
      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
        isActive
          ? 'bg-blue-600 text-white shadow-lg'
          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
      }`}
    >
      {label}
    </button>
  );
};

export const Header: React.FC<HeaderProps> = ({ activeView, setActiveView }) => {
  return (
    <header className="bg-gray-800 shadow-xl sticky top-0 z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
             <TrophyIcon className="h-8 w-8 text-yellow-400 mr-3" />
            <h1 className="text-xl md:text-2xl font-bold text-white tracking-wider">
              Shiste Premier League
            </h1>
          </div>
          <nav className="flex space-x-2 md:space-x-4">
            <NavButton label="Teams" viewName="teams" activeView={activeView} onClick={setActiveView} />
            <NavButton label="Schedule" viewName="schedule" activeView={activeView} onClick={setActiveView} />
            <NavButton label="AI Insights" viewName="insights" activeView={activeView} onClick={setActiveView} />
          </nav>
        </div>
      </div>
    </header>
  );
};