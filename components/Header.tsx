
import React from 'react';

interface HeaderProps {
  onNavigate: (view: 'membership' | 'about') => void;
  currentView: 'membership' | 'about';
}

const Header: React.FC<HeaderProps> = ({ onNavigate, currentView }) => {
  return (
    <header className="bg-[#0a0c20] border-b border-indigo-500/20 sticky top-0 z-50 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div 
            className="flex items-center gap-4 cursor-pointer group" 
            onClick={() => onNavigate('membership')}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-amber-400/20 blur-lg rounded-full scale-0 group-hover:scale-110 transition-transform"></div>
              <img 
                src="https://manitobadarts.ca/wp-content/uploads/2017/10/logo.png" 
                alt="Manitoba Darts Association" 
                className="h-14 w-14 object-contain relative z-10 transition-transform group-hover:scale-105"
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-black tracking-tight text-white leading-tight">
                MANITOBA <span className="text-amber-400">DARTS</span>
              </h1>
              <p className="text-[10px] text-indigo-300 font-bold uppercase tracking-[0.2em]">Association</p>
            </div>
          </div>
          
          <nav className="flex items-center space-x-1 md:space-x-8">
            <button 
              onClick={() => onNavigate('about')}
              className={`px-3 py-2 text-sm font-bold transition-all rounded-lg ${currentView === 'about' ? 'text-amber-400 bg-amber-400/10' : 'text-indigo-100 hover:text-amber-400 hover:bg-white/5'}`}
            >
              About
            </button>
            <button 
              onClick={() => onNavigate('membership')}
              className={`px-3 py-2 text-sm font-bold transition-all rounded-lg ${currentView === 'membership' ? 'text-amber-400 bg-amber-400/10' : 'text-indigo-100 hover:text-amber-400 hover:bg-white/5'}`}
            >
              Membership
            </button>
            <div className="h-6 w-px bg-indigo-800 mx-2 hidden md:block"></div>
            <button className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-amber-400 text-[#0a0c20] text-xs font-black uppercase rounded-full hover:bg-amber-300 transition-all shadow-lg shadow-amber-400/20">
              Tournament Schedule
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
