
import React from 'react';
import ManitobaMap from './ManitobaMap';

const About: React.FC = () => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Hero Header */}
      <div className="bg-[#0a0c20] py-24 border-b border-indigo-800/30 overflow-hidden relative">
        <div className="absolute inset-0 opacity-5">
           <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-400 via-transparent to-transparent"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-block relative mb-8">
            <div className="absolute inset-0 bg-amber-400 blur-[80px] opacity-20 rounded-full"></div>
            <img 
              src="https://manitobadarts.ca/wp-content/uploads/2017/10/logo.png" 
              alt="MDA Official Buffalo Logo" 
              className="h-48 w-48 md:h-64 md:w-64 mx-auto relative drop-shadow-[0_0_30px_rgba(251,191,36,0.3)] animate-in zoom-in duration-1000"
            />
          </div>
          <h1 className="text-4xl md:text-7xl font-black text-white mb-6 tracking-tighter">
            Legacy of the <span className="text-amber-400">Oche</span>
          </h1>
          <p className="text-xl md:text-2xl text-indigo-100 max-w-3xl mx-auto leading-relaxed font-medium">
            Representing the spirit and competitive excellence of Manitoba Darts since 1974.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-32">
        {/* Affiliations Section */}
        <section className="text-center">
          <h2 className="text-xs font-black text-amber-400 uppercase tracking-[0.5em] mb-12">Sanctioned & Affiliated</h2>
          <div className="flex flex-wrap justify-center items-center gap-16 md:gap-32">
            <div className="flex flex-col items-center gap-4 group">
              <img src="https://ndfc.ca/templates/ndfc/images/logo.png" alt="NDFC Logo" className="h-16 w-auto grayscale brightness-200 opacity-60 group-hover:opacity-100 group-hover:grayscale-0 transition-all" />
              <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest group-hover:text-amber-400 transition-colors">National (NDFC)</span>
            </div>
            <div className="flex flex-col items-center gap-4 group">
              <img src="https://dartswdf.com/storage/app/media/Logos/WDF_Logo_Color.png" alt="WDF Logo" className="h-16 w-auto grayscale opacity-40 group-hover:opacity-100 group-hover:grayscale-0 transition-all" />
              <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest group-hover:text-amber-400 transition-colors">World (WDF)</span>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div className="order-2 md:order-1">
            <div className="relative">
              <div className="absolute -inset-4 bg-indigo-500/10 blur-3xl rounded-full"></div>
              <div className="relative rounded-3xl overflow-hidden border border-indigo-500/20 shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1544208062-4f364e0a9695?q=80&w=2070&auto=format&fit=crop" 
                  alt="Competitive Play" 
                  className="w-full aspect-video object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c20] to-transparent"></div>
              </div>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <span className="text-amber-400 text-xs font-black uppercase tracking-[0.3em] mb-4 block">Our Commitment</span>
            <h2 className="text-4xl font-black text-white mb-8 leading-tight">Unity through the Dartboard</h2>
            <div className="space-y-6 text-indigo-100/80 leading-relaxed text-lg">
              <p>
                The Manitoba Darts Association stands as a beacon for sportsmanship and athletic rigor. Our iconic logo—the Buffalo standing firm over the dartboard—reflects our provincial strength and our roots in the prairie landscape.
              </p>
              <p>
                Whether you're a seasoned pro aiming for Team Manitoba or a newcomer picking up your first set of tungsten, the MDA provides the sanctioned framework to help you excel.
              </p>
            </div>
            <div className="mt-10 flex gap-6">
               <div className="text-center">
                 <div className="text-3xl font-black text-amber-400">4</div>
                 <div className="text-[10px] uppercase font-bold text-indigo-400 tracking-widest">Zones</div>
               </div>
               <div className="text-center">
                 <div className="text-3xl font-black text-amber-400">50+</div>
                 <div className="text-[10px] uppercase font-bold text-indigo-400 tracking-widest">Years</div>
               </div>
               <div className="text-center">
                 <div className="text-3xl font-black text-amber-400">100s</div>
                 <div className="text-[10px] uppercase font-bold text-indigo-400 tracking-widest">Members</div>
               </div>
            </div>
          </div>
        </section>

        {/* Interactive Zone Map */}
        <section className="py-20">
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            <div className="lg:w-1/2">
              <h2 className="text-4xl font-black text-white mb-6">Explore Our <span className="text-amber-400">Zones</span></h2>
              <p className="text-indigo-200 mb-10 text-lg">
                The MDA is structured to support every community across the province. Locate your zone to find local leagues and regional qualifiers.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { id: 1, name: 'Winnipeg', desc: 'The urban heart of Manitoba play.' },
                  { id: 2, name: 'Interlake', desc: 'Lakeside communities and Selkirk.' },
                  { id: 3, name: 'Westman', desc: 'Brandon and the southwestern plains.' },
                  { id: 4, name: 'Manitoba East', desc: 'Eastern borders and Steinbach area.' }
                ].map(z => (
                  <div key={z.id} className="p-5 bg-indigo-900/20 rounded-2xl border border-indigo-800/40 hover:border-amber-400/50 transition-colors">
                    <div className="text-amber-400 font-black mb-1">0{z.id}</div>
                    <div className="text-white font-bold mb-2">{z.name}</div>
                    <div className="text-indigo-400 text-xs">{z.desc}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:w-1/2 w-full flex justify-center">
              <ManitobaMap />
            </div>
          </div>
        </section>

        {/* Official Source */}
        <section className="pt-20 border-t border-indigo-900/50 flex flex-col items-center">
          <img 
            src="https://manitobadarts.ca/wp-content/uploads/2017/10/logo.png" 
            alt="MDA" 
            className="h-16 w-16 mb-6 opacity-30 grayscale"
          />
          <p className="text-indigo-500 text-xs italic mb-4">Official Governance Data Source:</p>
          <a 
            href="https://manitobadarts.ca" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-8 py-3 bg-white/5 hover:bg-white/10 text-indigo-300 hover:text-amber-400 font-bold rounded-full transition-all border border-white/10"
          >
            manitobadarts.ca
          </a>
        </section>
      </div>
    </div>
  );
};

export default About;
