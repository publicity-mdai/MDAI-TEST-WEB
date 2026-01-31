
import React, { useState, useRef, useEffect } from 'react';
import { getAiResponse } from '../services/geminiService';
import { ChatMessage } from '../types';

const AiAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Hi! I'm your MDA Assistant. Need help finding your zone or filling out the membership form?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    const response = await getAiResponse(userMsg);
    
    setIsTyping(false);
    setMessages(prev => [...prev, { role: 'model', text: response }]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      {isOpen ? (
        <div className="bg-[#141738] w-80 md:w-96 h-[500px] rounded-2xl shadow-2xl border border-indigo-500/20 flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 duration-300">
          <div className="bg-indigo-950 p-4 text-white flex justify-between items-center border-b border-indigo-800/30">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center">
                <i className="fa-solid fa-robot text-indigo-950 text-xs"></i>
              </div>
              <div>
                <h4 className="font-bold text-sm">MDA Assistant</h4>
                <p className="text-[10px] text-indigo-400 leading-none uppercase tracking-widest">Powered by Gemini</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-indigo-400 hover:text-white transition-colors">
              <i className="fa-solid fa-times"></i>
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-indigo-950/20">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                  msg.role === 'user' 
                    ? 'bg-amber-400 text-indigo-950 font-medium rounded-tr-none' 
                    : 'bg-indigo-900 text-indigo-100 border border-indigo-800/50 rounded-tl-none shadow-sm'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-indigo-900 border border-indigo-800/50 p-3 rounded-2xl rounded-tl-none shadow-sm">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 bg-amber-400/50 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-amber-400/50 rounded-full animate-bounce delay-75"></div>
                    <div className="w-1.5 h-1.5 bg-amber-400/50 rounded-full animate-bounce delay-150"></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 bg-indigo-950 border-t border-indigo-800/30">
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about zones..."
                className="w-full pl-4 pr-12 py-3 bg-indigo-900/50 border border-indigo-800/50 rounded-xl focus:ring-2 focus:ring-amber-400 outline-none text-sm text-white placeholder-indigo-700"
              />
              <button 
                onClick={handleSend}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-amber-400 text-indigo-950 rounded-lg flex items-center justify-center hover:bg-amber-300 transition-colors shadow-lg shadow-amber-400/10"
              >
                <i className="fa-solid fa-paper-plane text-xs"></i>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 bg-amber-400 text-indigo-950 rounded-full shadow-2xl hover:bg-amber-300 hover:scale-110 transition-all flex items-center justify-center shadow-amber-400/20"
        >
          <i className="fa-solid fa-message text-xl"></i>
        </button>
      )}
    </div>
  );
};

export default AiAssistant;
