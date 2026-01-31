
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
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  const SYSTEM_INSTRUCTION = `
    You are the Manitoba Darts Association (MDA) AI Assistant. 
    Your goal is to help prospective and current members with the registration process.
    MDA has 4 Zones:
    - Zone 1: Winnipeg (The city proper and immediate urban areas).
    - Zone 2: Interlake (Selkirk, Gimli, and the region between the lakes).
    - Zone 3: Westman (Brandon, Virden, and the South-Western region).
    - Zone 4: Manitoba East (Beausejour, Steinbach, and the Eastern border regions).
    Keep responses friendly, helpful, and concise.
  `;
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userMessage,
      config: { systemInstruction: SYSTEM_INSTRUCTION, temperature: 0.7 },
    });
    return response.text || "I'm sorry, I couldn't process that.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having a little trouble connecting. Please try again later!";
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
  <header className="bg-[#0a0c20] border-b border-indigo-500/20 sticky top-0 z-50 backdrop-blur-xl">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-20">
      <div className="flex items-center gap-4 cursor-pointer" onClick={() => onNavigate('membership')}>
        <img src="https://manitobadarts.ca/wp-content/uploads/2017/10/logo.png" className="h-14 w-14 object-contain" alt="MDA" />
        <div className="hidden sm:block">
          <h1 className="text-xl font-black text-white">MANITOBA <span className="text-amber-400">DARTS</span></h1>
          <p className="text-[10px] text-indigo-300 font-bold uppercase tracking-widest">Association</p>
        </div>
      </div>
      <nav className="flex space-x-4 md:space-x-8">
        <button onClick={() => onNavigate('about')} className={`text-sm font-bold ${currentView === 'about' ? 'text-amber-400' : 'text-indigo-100'}`}>About</button>
        <button onClick={() => onNavigate('membership')} className={`text-sm font-bold ${currentView === 'membership' ? 'text-amber-400' : 'text-indigo-100'}`}>Membership</button>
      </nav>
    </div>
  </header>
);

const MembershipForm = () => {
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '', membershipNumber: '',
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
    <div className="p-12 text-center bg-indigo-900/30 rounded-2xl border border-indigo-500/20">
      <h2 className="text-3xl font-bold text-white mb-4">Success!</h2>
      <p className="text-indigo-200 mb-8">Your registration is being processed.</p>
      <button onClick={() => setSubmitted(false)} className="px-8 py-3 bg-amber-400 text-indigo-950 font-black rounded-lg">Register Another</button>
    </div>
  );

  const inputClasses = "w-full px-4 py-2 bg-indigo-950/50 border border-indigo-800/50 rounded-lg text-white focus:ring-2 focus:ring-amber-400 outline-none";
  return (
    <form onSubmit={handleSubmit} className="bg-indigo-900/20 rounded-2xl border border-indigo-500/20 p-8 space-y-6">
      <h2 className="text-2xl font-bold text-white mb-4">Registration Form</h2>
      <div className="grid grid-cols-2 gap-4">
        <input placeholder="First Name" required className={inputClasses} onChange={e => setFormData({...formData, firstName: e.target.value})} />
        <input placeholder="Last Name" required className={inputClasses} onChange={e => setFormData({...formData, lastName: e.target.value})} />
      </div>
      <input placeholder="Email" type="email" required className={inputClasses} onChange={e => setFormData({...formData, email: e.target.value})} />
      <input placeholder="Phone" required className={inputClasses} onChange={e => setFormData({...formData, phone: e.target.value})} />
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
      <button type="submit" disabled={loading} className="w-full py-4 bg-amber-400 text-indigo-950 font-black rounded-xl uppercase">
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
        <div className="w-80 h-[450px] bg-[#141738] rounded-2xl shadow-2xl border border-indigo-500/20 flex flex-col overflow-hidden">
          <div className="bg-indigo-950 p-4 flex justify-between text-white font-bold border-b border-indigo-800/30">
            <span>MDA Assistant</span>
            <button onClick={() => setIsOpen(false)}>×</button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-indigo-950/20">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`p-2 rounded-lg text-sm max-w-[85%] ${m.role === 'user' ? 'bg-amber-400 text-indigo-950' : 'bg-indigo-900 text-white'}`}>{m.text}</div>
              </div>
            ))}
          </div>
          <div className="p-3 bg-indigo-950 border-t border-indigo-800/30 flex gap-2">
            <input className="flex-1 bg-indigo-900 rounded-lg p-2 text-sm text-white outline-none" placeholder="Ask about zones..." value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSend()} />
            <button onClick={handleSend} className="bg-amber-400 p-2 rounded-lg text-indigo-950">Send</button>
          </div>
        </div>
      ) : (
        <button onClick={() => setIsOpen(true)} className="w-14 h-14 bg-amber-400 rounded-full shadow-2xl flex items-center justify-center text-indigo-950 text-xl font-bold">?</button>
      )}
    </div>
  );
};

const About = () => (
  <div className="py-20 max-w-7xl mx-auto px-4 text-center space-y-20">
    <div className="space-y-8">
      <img src="https://manitobadarts.ca/wp-content/uploads/2017/10/logo.png" className="h-48 mx-auto" alt="MDA" />
      <h1 className="text-5xl font-black text-white">Legacy of the <span className="text-amber-400">Oche</span></h1>
      <p className="text-xl text-indigo-100 max-w-2xl mx-auto">Founded in 1974, the MDA is the heartbeat of competitive darts in Manitoba.</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      <div className="text-left space-y-6">
        <h2 className="text-3xl font-bold text-white">Unified Over the Board</h2>
        <p className="text-indigo-200">The Manitoba Darts Association stands as a beacon for sportsmanship and athletic rigor. Our iconic logo reflects our provincial strength and our roots in the prairie landscape.</p>
      </div>
      <ManitobaMap />
    </div>
  </div>
);

const App = () => {
  const [view, setView] = useState('membership');
  return (
    <div className="min-h-screen bg-[#0f1129] flex flex-col text-slate-100">
      <Header onNavigate={setView} currentView={view} />
      <main className="flex-1">
        {view === 'membership' ? (
          <div className="max-w-7xl mx-auto px-4 py-20 grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2"><MembershipForm /></div>
            <div className="space-y-8">
              <div className="bg-indigo-900/20 p-8 rounded-2xl border border-indigo-500/20">
                <h3 className="text-xl font-bold text-amber-400 mb-4">Member Perks</h3>
                <ul className="space-y-4 text-sm text-indigo-200">
                  <li>• Official Provincial Rankings</li>
                  <li>• Sanctioned Tournament Entry</li>
                  <li>• Elite Athlete Support</li>
                </ul>
              </div>
            </div>
          </div>
        ) : <About />}
      </main>
      <footer className="py-10 border-t border-indigo-900/50 text-center text-xs text-indigo-500">
        <p>© 2024 Manitoba Darts Association. Sanctioned by NDFC and WDF.</p>
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
