
import React, { useState, useRef, useEffect } from 'https://esm.sh/react@^19.2.4';
import ReactDOM from 'https://esm.sh/react-dom@^19.2.4/client';
import { GoogleGenAI } from "https://esm.sh/@google/genai@^1.39.0";

/** 
 * TYPES & CONSTANTS 
 */
const Zone = {
  ZONE_1: "Zone 1 (Winnipeg)",
  ZONE_2: "Zone 2 (Interlake)",
  ZONE_3: "Zone 3 (Westman)",
  ZONE_4: "Zone 4 (Manitoba East)"
};

/**
 * AI SERVICE
 */
const getAiResponse = async (userMessage) => {
  // IMPORTANT: For Wix, you should ideally pass the API key via an attribute 
  // or use a backend proxy. This fallback uses the environment if available.
  const apiKey = window.MDA_API_KEY || ""; 
  if (!apiKey) return "AI Assistant is currently offline (API Key Missing). Please contact MDA directly.";

  const ai = new GoogleGenAI({ apiKey });
  const SYSTEM_INSTRUCTION = `
    You are the Manitoba Darts Association (MDA) AI Assistant. 
    Help prospective members with registration. 4 Zones exist:
    - Zone 1: Winnipeg
    - Zone 2: Interlake
    - Zone 3: Westman
    - Zone 4: Manitoba East
  `;
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userMessage,
      config: { systemInstruction: SYSTEM_INSTRUCTION, temperature: 0.7 },
    });
    return response.text || "I'm sorry, I couldn't process that.";
  } catch (error) {
    return "The assistant is busy. Please try again later!";
  }
};

/**
 * COMPONENTS
 */

const ManitobaMap = () => (
  <div className="relative w-full aspect-[3/4] max-w-sm mx-auto bg-indigo-950/20 rounded-3xl p-8 border border-amber-400/10 shadow-2xl overflow-hidden group">
    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c20] to-transparent pointer-events-none z-10"></div>
    <svg viewBox="0 0 300 400" className="w-full h-full drop-shadow-[0_0_25px_rgba(251,191,36,0.1)]">
      <path d="M80,20 L220,20 L220,150 L250,180 L250,380 L50,380 L50,150 L80,120 Z" fill="none" stroke="#1e3a8a" strokeWidth="3" className="opacity-50" />
      <path d="M100,180 L200,180 L200,260 L100,260 Z" className="fill-indigo-900/60 hover:fill-amber-400/40 transition-all cursor-pointer" stroke="#3b82f6" strokeWidth="1.5" />
      <path d="M50,260 L150,260 L150,380 L50,380 Z" className="fill-indigo-800/60 hover:fill-amber-400/40 transition-all cursor-pointer" stroke="#3b82f6" strokeWidth="1.5" />
      <path d="M150,260 L250,260 L250,380 L150,380 Z" className="fill-indigo-950/60 hover:fill-amber-400/40 transition-all cursor-pointer" stroke="#3b82f6" strokeWidth="1.5" />
      <circle cx="160" cy="265" r="18" className="fill-amber-400 shadow-xl cursor-pointer" />
    </svg>
  </div>
);

const Header = ({ onNavigate, currentView }) => (
  <header className="bg-[#0a0c20] border-b border-indigo-500/20 sticky top-0 z-50">
    <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-20">
      <div className="flex items-center gap-4 cursor-pointer" onClick={() => onNavigate('membership')}>
        <img src="https://manitobadarts.ca/wp-content/uploads/2017/10/logo.png" className="h-12 w-12 object-contain" alt="MDA" />
        <div className="hidden sm:block">
          <h1 className="text-lg font-black text-white">MANITOBA <span className="text-amber-400">DARTS</span></h1>
        </div>
      </div>
      <nav className="flex space-x-6">
        <button onClick={() => onNavigate('about')} className={`text-sm font-bold ${currentView === 'about' ? 'text-amber-400' : 'text-indigo-100'}`}>About</button>
        <button onClick={() => onNavigate('membership')} className={`text-sm font-bold ${currentView === 'membership' ? 'text-amber-400' : 'text-indigo-100'}`}>Join</button>
      </nav>
    </div>
  </header>
);

const MembershipForm = () => {
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address: { street: '', city: '', province: 'Manitoba', postalCode: '' },
    selectedZone: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1500);
  };

  if (submitted) return (
    <div className="p-12 text-center bg-indigo-900/30 rounded-2xl border border-indigo-500/20 my-10">
      <h2 className="text-3xl font-bold text-white mb-4">Success!</h2>
      <p className="text-indigo-200 mb-8">Your registration is being processed.</p>
      <button onClick={() => setSubmitted(false)} className="px-8 py-3 bg-amber-400 text-indigo-950 font-black rounded-lg">Register Another</button>
    </div>
  );

  const inputClasses = "w-full px-4 py-3 bg-indigo-950/50 border border-indigo-800/50 rounded-lg text-white focus:ring-2 focus:ring-amber-400 outline-none placeholder-indigo-700";
  return (
    <form onSubmit={handleSubmit} className="bg-indigo-900/20 rounded-2xl border border-indigo-500/20 p-6 md:p-10 space-y-6 my-10">
      <h2 className="text-2xl font-bold text-white mb-2">Membership Registration</h2>
      <p className="text-indigo-400 text-sm mb-6">Complete the form below to join the association.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input placeholder="First Name" required className={inputClasses} onChange={e => setFormData({...formData, firstName: e.target.value})} />
        <input placeholder="Last Name" required className={inputClasses} onChange={e => setFormData({...formData, lastName: e.target.value})} />
      </div>
      <input placeholder="Email Address" type="email" required className={inputClasses} onChange={e => setFormData({...formData, email: e.target.value})} />
      <input placeholder="Phone Number" required className={inputClasses} onChange={e => setFormData({...formData, phone: e.target.value})} />
      
      <div className="space-y-4">
        <input placeholder="Street Address" required className={inputClasses} onChange={e => setFormData({...formData, address: {...formData.address, street: e.target.value}})} />
        <div className="grid grid-cols-2 gap-4">
          <input placeholder="City" required className={inputClasses} onChange={e => setFormData({...formData, address: {...formData.address, city: e.target.value}})} />
          <input placeholder="Postal Code" required className={inputClasses} onChange={e => setFormData({...formData, address: {...formData.address, postalCode: e.target.value}})} />
        </div>
      </div>

      <select required className={inputClasses} onChange={e => setFormData({...formData, selectedZone: e.target.value})}>
        <option value="">-- Select Zone (1-4) --</option>
        {Object.values(Zone).map(z => <option key={z} value={z}>{z}</option>)}
      </select>

      <button type="submit" disabled={loading} className="w-full py-4 bg-amber-400 text-indigo-950 font-black rounded-xl uppercase tracking-wider hover:bg-amber-300 transition-colors">
        {loading ? 'Processing...' : 'Complete Registration'}
      </button>
    </form>
  );
};

const AiAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: 'model', text: "How can I help with your membership?" }]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || typing) return;
    const msg = input; setInput('');
    setMessages(prev => [...prev, { role: 'user', text: msg }]);
    setTyping(true);
    const res = await getAiResponse(msg);
    setTyping(false);
    setMessages(prev => [...prev, { role: 'model', text: res }]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="w-72 md:w-80 h-[400px] bg-[#141738] rounded-2xl shadow-2xl border border-indigo-500/20 flex flex-col overflow-hidden">
          <div className="bg-indigo-950 p-4 flex justify-between text-white font-bold border-b border-indigo-800/30">
            <span>MDA AI</span>
            <button onClick={() => setIsOpen(false)}>×</button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-indigo-950/20">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`p-2 rounded-lg text-xs max-w-[85%] ${m.role === 'user' ? 'bg-amber-400 text-indigo-950' : 'bg-indigo-900 text-white'}`}>{m.text}</div>
              </div>
            ))}
            {typing && <div className="text-[10px] text-indigo-400 animate-pulse">Assistant is thinking...</div>}
          </div>
          <div className="p-3 bg-indigo-950 border-t border-indigo-800/30 flex gap-2">
            <input className="flex-1 bg-indigo-900 rounded-lg p-2 text-xs text-white outline-none" placeholder="Ask anything..." value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSend()} />
            <button onClick={handleSend} className="bg-amber-400 px-3 py-1 rounded-lg text-indigo-950 text-xs font-bold">Send</button>
          </div>
        </div>
      ) : (
        <button onClick={() => setIsOpen(true)} className="w-12 h-12 bg-amber-400 rounded-full shadow-2xl flex items-center justify-center text-indigo-950 text-lg font-bold border-2 border-indigo-900/50 hover:scale-110 transition-transform">?</button>
      )}
    </div>
  );
};

const About = () => (
  <div className="py-10 max-w-5xl mx-auto px-4 text-center space-y-16">
    <div className="space-y-6">
      <img src="https://manitobadarts.ca/wp-content/uploads/2017/10/logo.png" className="h-32 mx-auto" alt="MDA" />
      <h1 className="text-4xl md:text-5xl font-black text-white">Legacy of the <span className="text-amber-400">Oche</span></h1>
      <p className="text-lg text-indigo-100 max-w-xl mx-auto">Founded in 1974, the MDA is the official governing body for the sport of darts in Manitoba.</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
      <div className="text-left space-y-4">
        <h2 className="text-2xl font-bold text-white uppercase tracking-tight">Unity Over the Board</h2>
        <p className="text-indigo-200 text-sm leading-relaxed">The Manitoba Darts Association stands as a beacon for sportsmanship. Our iconic buffalo logo reflects our provincial strength and our roots in the prairie landscape.</p>
        <p className="text-indigo-400 text-xs italic">Affiliated with NDFC and WDF.</p>
      </div>
      <ManitobaMap />
    </div>
  </div>
);

const App = () => {
  const [view, setView] = useState('membership');
  return (
    <div className="min-h-screen bg-[#0f1129] flex flex-col text-slate-100 font-sans">
      <Header onNavigate={setView} currentView={view} />
      <main className="flex-1">
        {view === 'membership' ? (
          <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2"><MembershipForm /></div>
            <div className="space-y-6 lg:mt-10">
              <div className="bg-indigo-900/20 p-6 rounded-2xl border border-indigo-500/20 shadow-xl">
                <h3 className="text-lg font-bold text-amber-400 mb-4">Member Benefits</h3>
                <ul className="space-y-3 text-xs text-indigo-200">
                  <li className="flex gap-2"><span>•</span> Official Provincial Rankings</li>
                  <li className="flex gap-2"><span>•</span> Sanctioned Tournament Entry</li>
                  <li className="flex gap-2"><span>•</span> Elite Athlete Support Programs</li>
                  <li className="flex gap-2"><span>•</span> Community Engagement Events</li>
                </ul>
              </div>
              <div className="bg-amber-400/5 p-6 rounded-2xl border border-amber-400/20">
                <p className="text-[10px] text-amber-400 font-bold uppercase mb-2">Notice</p>
                <p className="text-xs text-indigo-300">New memberships are processed within 3-5 business days. You will receive an official ID via email.</p>
              </div>
            </div>
          </div>
        ) : <About />}
      </main>
      <footer className="py-8 border-t border-indigo-900/50 text-center text-[10px] text-indigo-500 uppercase tracking-widest">
        <p>© 2024 Manitoba Darts Association</p>
      </footer>
      <AiAssistant />
    </div>
  );
};

/**
 * WIX CUSTOM ELEMENT DEFINITION
 */
class MDA_MembershipPortal extends HTMLElement {
  constructor() {
    super();
    this.root = null;
  }

  connectedCallback() {
    // Ensure the element is visible and occupies space in Wix
    this.style.display = 'block';
    this.style.width = '100%';
    this.style.minHeight = '600px'; // Set a default min-height for visibility

    // Check if Tailwind is loaded, if not, attempt to inject it for this session
    if (!window.tailwind) {
      const script = document.createElement('script');
      script.src = 'https://cdn.tailwindcss.com';
      document.head.appendChild(script);
    }

    // Mount React
    if (!this.root) {
      this.root = ReactDOM.createRoot(this);
    }
    this.render();
  }

  disconnectedCallback() {
    if (this.root) {
      this.root.unmount();
      this.root = null;
    }
  }

  render() {
    this.root.render(<App />);
  }
}

// Define the custom element for use in Wix
if (!customElements.get('mda-membership-portal')) {
  customElements.define('mda-membership-portal', MDA_MembershipPortal);
}
