
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-indigo-950 text-indigo-400 py-12 mt-20 border-t border-indigo-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12 border-b border-indigo-900 pb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-4 mb-6">
              <img 
                src="https://manitobadarts.ca/wp-content/uploads/2017/10/logo.png" 
                alt="MDA" 
                className="h-10 w-auto brightness-110"
              />
              <h2 className="text-lg font-bold text-white tracking-tight">MDA</h2>
            </div>
            <p className="text-sm leading-relaxed text-indigo-300">
              The official governing body for the sport of darts in Manitoba, Canada. Promoting excellence and community through competitive play.
            </p>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4 uppercase tracking-wider text-xs">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-amber-400 transition-colors">Find Your Zone</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">Provincials 2024</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">Hall of Fame</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">Youth Darts</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4 uppercase tracking-wider text-xs">Affiliations</h3>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <img src="https://ndfc.ca/templates/ndfc/images/logo.png" alt="NDFC" className="h-6 w-auto brightness-200 opacity-60" />
                <span className="text-xs font-medium text-indigo-300">NDFC Affiliate</span>
              </div>
              <div className="flex items-center gap-3">
                <img src="https://dartswdf.com/storage/app/media/Logos/WDF_Logo_Color.png" alt="WDF" className="h-6 w-auto opacity-60 grayscale brightness-125" />
                <span className="text-xs font-medium text-indigo-300">WDF Member</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4 uppercase tracking-wider text-xs">Connect</h3>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-indigo-900 rounded-full flex items-center justify-center hover:bg-amber-400 hover:text-indigo-950 transition-all border border-indigo-800">
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-indigo-900 rounded-full flex items-center justify-center hover:bg-amber-400 hover:text-indigo-950 transition-all border border-indigo-800">
                <i className="fa-brands fa-twitter"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-indigo-900 rounded-full flex items-center justify-center hover:bg-amber-400 hover:text-indigo-950 transition-all border border-indigo-800">
                <i className="fa-brands fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-indigo-500">
          <p>© 2024 Manitoba Darts Association. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="https://manitobadarts.ca" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors flex items-center gap-1">
               Official Site <i className="fa-solid fa-external-link text-[8px]"></i>
            </a>
            <a href="#" className="hover:text-amber-400 transition-colors">Grievance Process</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
