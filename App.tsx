
import React, { useState } from 'react';
import Header from './components/Header';
import MembershipForm from './components/MembershipForm';
import About from './components/About';
import Footer from './components/Footer';
import AiAssistant from './components/AiAssistant';

const App: React.FC = () => {
  const [view, setView] = useState<'membership' | 'about'>('membership');

  return (
    <div className="min-h-screen flex flex-col selection:bg-amber-400 selection:text-indigo-950">
      <Header onNavigate={setView} currentView={view} />
      
      <main className="flex-1">
        {view === 'membership' ? (
          <>
            {/* Hero Section */}
            <div className="relative bg-indigo-950 py-24 overflow-hidden animate-in fade-in duration-700">
              <div className="absolute inset-0 opacity-10">
                <img 
                  src="https://images.unsplash.com/photo-1544208062-4f364e0a9695?q=80&w=2070&auto=format&fit=crop" 
                  alt="Background" 
                  className="w-full h-full object-cover grayscale"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-950 via-indigo-950/90 to-transparent"></div>
              
              <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl">
                  <span className="inline-block px-3 py-1 bg-amber-400 text-indigo-950 text-[10px] font-black uppercase tracking-widest rounded-full mb-4 shadow-lg shadow-amber-400/20">
                    Elite Membership 2024
                  </span>
                  <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-6">
                    Step up to the oche. <br/>
                    <span className="text-amber-400">Join the Legacy.</span>
                  </h1>
                  <p className="text-lg text-indigo-200 mb-8 leading-relaxed max-w-xl">
                    The Manitoba Darts Association welcomes all players to our regional network. Gain access to official rankings, sanctioned tournaments, and a premium community of competitors.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-3 bg-indigo-900/40 border border-indigo-700/30 px-5 py-3 rounded-xl backdrop-blur-sm shadow-xl">
                      <i className="fa-solid fa-trophy text-amber-400"></i>
                      <span className="text-sm font-bold text-white tracking-wide">4 Regional Zones</span>
                    </div>
                    <div className="flex items-center gap-3 bg-indigo-900/40 border border-indigo-700/30 px-5 py-3 rounded-xl backdrop-blur-sm shadow-xl">
                      <i className="fa-solid fa-star text-amber-400"></i>
                      <span className="text-sm font-bold text-white tracking-wide">Provincial Rankings</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10 pb-20">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8">
                  <MembershipForm />
                </div>
                <div className="lg:col-span-4 space-y-8">
                  <div className="bg-indigo-900/20 backdrop-blur-md rounded-2xl shadow-2xl border border-indigo-500/20 p-8">
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                      <i className="fa-solid fa-crown text-amber-400"></i>
                      Member Perks
                    </h3>
                    <ul className="space-y-6">
                      <li className="flex gap-4">
                        <div className="w-10 h-10 shrink-0 bg-amber-400/10 border border-amber-400/20 rounded-xl flex items-center justify-center">
                          <i className="fa-solid fa-medal text-amber-400 text-lg"></i>
                        </div>
                        <div>
                          <h4 className="font-bold text-indigo-100 text-sm">Official Rankings</h4>
                          <p className="text-xs text-indigo-400 mt-1">Earn points in sanctioned events to climb the Provincial leaderboard.</p>
                        </div>
                      </li>
                      <li className="flex gap-4">
                        <div className="w-10 h-10 shrink-0 bg-amber-400/10 border border-amber-400/20 rounded-xl flex items-center justify-center">
                          <i className="fa-solid fa-calendar-check text-amber-400 text-lg"></i>
                        </div>
                        <div>
                          <h4 className="font-bold text-indigo-100 text-sm">Tournament Access</h4>
                          <p className="text-xs text-indigo-400 mt-1">Exclusive entry into Regionals, Provincials, and special opens.</p>
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-indigo-950 border border-amber-400/30 rounded-2xl shadow-2xl p-8 text-white relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:bg-amber-400/10 transition-colors"></div>
                    <h3 className="text-xl font-bold mb-4 relative z-10 text-amber-400">Assistance Center</h3>
                    <p className="text-indigo-200 text-sm mb-6 relative z-10 leading-relaxed">
                      Confused about your zone or the registration steps? Our AI Assistant is standing by with local Manitoba dart expertise.
                    </p>
                    <div className="inline-flex items-center gap-3 text-xs font-black uppercase tracking-widest text-amber-400 relative z-10">
                      Chat Now <i className="fa-solid fa-arrow-right-long animate-pulse"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <About />
        )}
      </main>

      <Footer />
      <AiAssistant />
    </div>
  );
};

export default App;
