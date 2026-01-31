
import React from 'react';

const ManitobaMap: React.FC = () => {
  return (
    <div className="relative w-full aspect-[3/4] max-w-sm mx-auto bg-indigo-950/20 rounded-3xl p-8 border border-amber-400/10 shadow-2xl overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c20] to-transparent pointer-events-none z-10"></div>
      
      <svg viewBox="0 0 300 400" className="w-full h-full drop-shadow-[0_0_25px_rgba(251,191,36,0.1)]">
        {/* Manitoba Outline - Stylized */}
        <path 
          d="M80,20 L220,20 L220,150 L250,180 L250,380 L50,380 L50,150 L80,120 Z" 
          fill="none" 
          stroke="#1e3a8a" 
          strokeWidth="3" 
          className="opacity-50"
        />

        {/* Zone 2: Interlake */}
        <path 
          d="M100,180 L200,180 L200,260 L100,260 Z" 
          className="fill-indigo-900/60 hover:fill-amber-400/40 transition-all cursor-pointer duration-300"
          stroke="#3b82f6"
          strokeWidth="1.5"
        />
        <text x="150" y="225" fill="#fbbf24" fontSize="12" fontWeight="900" textAnchor="middle" className="pointer-events-none uppercase tracking-widest opacity-80">Zone 2</text>

        {/* Zone 3: Westman */}
        <path 
          d="M50,260 L150,260 L150,380 L50,380 Z" 
          className="fill-indigo-800/60 hover:fill-amber-400/40 transition-all cursor-pointer duration-300"
          stroke="#3b82f6"
          strokeWidth="1.5"
        />
        <text x="100" y="325" fill="#fbbf24" fontSize="12" fontWeight="900" textAnchor="middle" className="pointer-events-none uppercase tracking-widest opacity-80">Zone 3</text>

        {/* Zone 4: Manitoba East */}
        <path 
          d="M150,260 L250,260 L250,380 L150,380 Z" 
          className="fill-indigo-950/60 hover:fill-amber-400/40 transition-all cursor-pointer duration-300"
          stroke="#3b82f6"
          strokeWidth="1.5"
        />
        <text x="200" y="325" fill="#fbbf24" fontSize="12" fontWeight="900" textAnchor="middle" className="pointer-events-none uppercase tracking-widest opacity-80">Zone 4</text>

        {/* Zone 1: Winnipeg */}
        <g className="cursor-pointer group/winnipeg transition-transform hover:scale-110 origin-[160px_265px] duration-300">
          <circle 
            cx="160" 
            cy="265" 
            r="18" 
            className="fill-amber-400 shadow-xl" 
          />
          <text x="160" y="270" fill="#0a0c20" fontSize="10" fontWeight="900" textAnchor="middle" className="pointer-events-none">Z1</text>
        </g>
        
        {/* Decorative North Arrow */}
        <g transform="translate(260, 40)" className="opacity-30">
           <path d="M0,0 L5,-15 L10,0 L5,-5 Z" fill="#fbbf24" />
           <text x="5" y="15" fill="#fbbf24" fontSize="8" textAnchor="middle" fontWeight="bold">NORTH</text>
        </g>
      </svg>

      <div className="absolute bottom-6 left-0 right-0 text-center z-20">
        <p className="text-[10px] text-amber-400/50 font-black uppercase tracking-[0.3em] flex items-center justify-center gap-2">
          <i className="fa-solid fa-crosshairs text-[8px]"></i> 
          Province of Manitoba
        </p>
      </div>
    </div>
  );
};

export default ManitobaMap;
