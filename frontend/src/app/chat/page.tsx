'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sprout, Bug, CloudSun, FlaskConical, Menu, X, Sun, Moon, 
  SendHorizontal, Mic, Lightbulb, ArrowLeft, Clock, MessageSquare
} from 'lucide-react';
import Link from 'next/link';

interface Message {
  text: string;
  sender: 'user' | 'ai';
  time: string;
}

// API Endpoint Configuration
const getApiUrl = () => {
  if (typeof window !== 'undefined') {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      return 'http://127.0.0.1:5000/chat';
    }
  }
  return 'https://ai-smart-farmer-yir3.onrender.com/chat';
};

const chipsPool = {
  en: [
    "Organic farming schemes",
    "Drip irrigation setup",
    "Soil testing guide",
    "Kharif crop fertilizer",
    "Pest control for cotton",
    "How to get soil health card",
    "Best time to sow wheat",
    "Natural composting methods",
    "Subsidy for tractors",
    "Rainwater harvesting tips"
  ],
  hi: [
    "जैविक खेती योजनाएं",
    "टपक सिंचाई सेटअप",
    "मिट्टी परीक्षण गाइड",
    "खरीफ फसल उर्वरक",
    "कपास के लिए कीट नियंत्रण",
    "मृदा स्वास्थ्य कार्ड कैसे प्राप्त करें",
    "गेहूं बोने का सही समय",
    "प्राकृतिक खाद बनाने की विधि",
    "ट्रैक्टर पर सब्सिडी",
    "वर्षा जल संचयन के उपाय"
  ],
  te: [
    "సేంద్రీయ వ్యవసాయ పథకాలు",
    "బిందు సేద్యం అమరిక",
    "నేల పరీక్ష గైడ్",
    "ఖరీఫ్ పంట ఎరువులు",
    "పత్తిలో తెగుళ్ల నివారణ",
    "సాయిల్ హెల్త్ కార్డ్ ఎలా పొందాలి",
    "గోధుమలు నాటడానికి ఉత్తమ సమయం",
    "సహజ కంపోస్టింగ్ పద్ధతులు",
    "ట్రాక్టర్ల సబ్సిడీ",
    "వర్షపు నీటి నిల్వ చిట్కాలు"
  ],
  ta: [
    "இயற்கை விவசாய திட்டங்கள்",
    "சொட்டு நீர் பாசனம்",
    "மண் பரிசோதனை வழிகாட்டி",
    "காரிஃப் பயிர் உரம்",
    "பருத்தி பூச்சி கட்டுப்பாடு",
    "மண்வள அட்டை பெறுவது எப்படி",
    "கோதுமை விதைக்க சிறந்த நேரம்",
    "இயற்கை உரம் தயாரிக்கும் முறைகள்",
    "டிராக்டர் மானியம்",
    "மழைநீர் சேகரிப்பு குறிப்புகள்"
  ]
};

export default function ChatPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [language, setLanguage] = useState<'en' | 'hi' | 'te' | 'ta'>('en');
  const [currentChips, setCurrentChips] = useState<string[]>([]);
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hello! I am Smart Farmer AI. How can I assist with your farming today?",
      sender: 'ai',
      time: ''
    }
  ]);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Weather state (simulated fetch)
  const [weatherLoading, setWeatherLoading] = useState(true);
  const [weatherData, setWeatherData] = useState<{
    temp: string;
    desc: string;
    humidity: string;
    wind: string;
  } | null>(null);

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Helper for generating formatted timestamps
  const getFormattedTime = () => {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    return `${hours}:${formattedMinutes} ${ampm}`;
  };

  // Sync dark mode class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Handle weather loading and initial setup
  useEffect(() => {
    // Initial timestamp for greeting message
    setMessages([
      {
        text: "Hello! I am Smart Farmer AI. How can I assist with your farming today?",
        sender: 'ai',
        time: getFormattedTime()
      }
    ]);

    // Weather load delay
    const timer = setTimeout(() => {
      setWeatherData({
        temp: '28°C',
        desc: 'Partly Cloudy',
        humidity: '65%',
        wind: '12 km/h'
      });
      setWeatherLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Update chips pool when language changes
  useEffect(() => {
    const pool = chipsPool[language] || chipsPool['en'];
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    setCurrentChips(shuffled.slice(0, 3));
  }, [language]);

  // Scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Handle suggested questions
  const triggerQuestion = (text: string) => {
    setUserInput(text);
    submitMessage(text);
  };

  // Send message
  const submitMessage = async (messageText: string) => {
    const textToSend = messageText.trim();
    if (!textToSend) return;

    // 1. Add user message
    const timestamp = getFormattedTime();
    setMessages(prev => [...prev, { text: textToSend, sender: 'user', time: timestamp }]);
    setUserInput('');
    setLoading(true);

    try {
      // 2. Query Render Flask Backend
      const response = await fetch(getApiUrl(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: textToSend, language })
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        setMessages(prev => [...prev, { text: data.reply, sender: 'ai', time: getFormattedTime() }]);
      } else {
        setMessages(prev => [...prev, { 
          text: `Error: ${data.error || 'Something went wrong.'}`, 
          sender: 'ai', 
          time: getFormattedTime() 
        }]);
      }
    } catch (error) {
      setLoading(false);
      setMessages(prev => [...prev, { 
        text: 'Sorry, the server is unreachable. Please make sure the Flask backend is running on Render.', 
        sender: 'ai', 
        time: getFormattedTime() 
      }]);
      console.error('Fetch error:', error);
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-[#060a07] text-slate-800 dark:text-slate-100 overflow-hidden relative">
      
      {/* Sidebar Overlay on mobile */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* SIDEBAR PANEL */}
      <aside className={`fixed inset-y-0 left-0 w-[280px] bg-slate-100 dark:bg-[#0c120d] border-r border-slate-200 dark:border-emerald-950/40 p-6 flex flex-col justify-between z-50 transition-transform duration-300 lg:static lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col gap-6 overflow-y-auto max-h-[85vh] pr-1">
          
          {/* Logo & Header */}
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 bg-emerald-600 rounded-lg flex items-center justify-center">
                <Sprout className="w-5 h-5 text-white" />
              </div>
              <span className="font-extrabold text-md tracking-tight dark:text-emerald-400">
                Smart Farmer AI
              </span>
            </Link>
            <button 
              onClick={() => setSidebarOpen(false)} 
              className="lg:hidden w-8 h-8 rounded-lg flex items-center justify-center hover:bg-slate-200 dark:hover:bg-emerald-950/40 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Crop Categories */}
          <div>
            <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-3">Crop Categories</h3>
            <ul className="flex flex-col gap-1 text-sm font-bold">
              {['Kharif Crops', 'Rabi Crops', 'Zaid Crops', 'Cash Crops'].map((category) => (
                <li 
                  key={category}
                  onClick={() => {
                    triggerQuestion(`Tell me about standard practices for ${category}`);
                    setSidebarOpen(false);
                  }}
                  className="p-2.5 rounded-lg hover:bg-slate-200 dark:hover:bg-emerald-950/30 cursor-pointer transition-colors flex items-center gap-2"
                >
                  <Sprout className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  {category}
                </li>
              ))}
            </ul>
          </div>

          {/* Language Selection Grid */}
          <div>
            <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-3">System Language</h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                { code: 'en', label: '🇺🇸 EN' },
                { code: 'hi', label: '🇮🇳 HI' },
                { code: 'te', label: '🇮🇳 TE' },
                { code: 'ta', label: '🇮🇳 TA' }
              ].map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code as any);
                    setSidebarOpen(false);
                  }}
                  className={`py-2 rounded-lg font-bold text-xs border transition-all flex items-center justify-center gap-1 ${
                    language === lang.code
                      ? 'bg-emerald-600 border-emerald-600 text-white shadow-md'
                      : 'bg-white dark:bg-emerald-950/10 border-slate-200 dark:border-emerald-950/40 hover:bg-slate-100 dark:hover:bg-emerald-950/20 text-slate-700 dark:text-slate-200'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>

          {/* Daily Tip Widget */}
          <div className="bg-white dark:bg-emerald-950/20 p-4 rounded-xl border border-slate-200/50 dark:border-emerald-950/40 shadow-sm">
            <h4 className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 mb-2">
              <Lightbulb className="w-4 h-4 text-amber-500 fill-amber-500/20" /> Daily Tip
            </h4>
            <p className="text-xs text-slate-650 dark:text-slate-350 leading-relaxed font-semibold">
              Rotate wheat crops with legumes like chickpeas to naturally enrich soil nitrogen levels.
            </p>
          </div>

          {/* Recent History */}
          <div>
            <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">Recent Chats</h3>
            <ul className="flex flex-col gap-1 text-xs text-slate-600 dark:text-slate-300 font-semibold">
              {['Wheat fertilizer needs', 'Pest control for cotton'].map((hist) => (
                <li 
                  key={hist}
                  onClick={() => triggerQuestion(hist)}
                  className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-emerald-950/30 cursor-pointer flex items-center gap-2 truncate"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  {hist}
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="border-t border-slate-200 dark:border-emerald-950/40 pt-4 flex items-center justify-between gap-4">
          <Link href="/" className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Landing
          </Link>
          <button 
            onClick={toggleDarkMode}
            className="w-9 h-9 rounded-lg flex items-center justify-center bg-white dark:bg-emerald-950/30 border border-slate-200 dark:border-emerald-950/40 shadow-sm hover:bg-slate-100 transition-colors"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-emerald-600" />}
          </button>
        </div>

      </aside>

      {/* CHAT WINDOW */}
      <main className="flex-1 flex flex-col justify-between overflow-hidden">
        
        {/* Chat Header */}
        <header className="bg-white dark:bg-[#0c120d] border-b border-slate-200 dark:border-emerald-950/40 px-6 py-4 flex items-center justify-between z-10 shadow-sm">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden w-10 h-10 rounded-lg flex items-center justify-center border border-slate-200 dark:border-emerald-950/40 bg-slate-50 dark:bg-emerald-950/20"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="text-left">
              <h2 className="font-extrabold text-md flex items-center gap-1.5">
                <Sprout className="w-4 animate-pulse text-emerald-600" /> Smart Farmer AI Chat
              </h2>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-semibold">
                ● Live connected to Render Flask app
              </span>
            </div>
          </div>

          {/* Quick weather status info */}
          <div className="flex items-center gap-4">
            <AnimatePresence mode="wait">
              {weatherLoading ? (
                <div className="hidden sm:flex items-center gap-2 animate-pulse">
                  <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-emerald-950/40" />
                  <div className="w-16 h-3 bg-slate-200 dark:bg-emerald-950/40 rounded" />
                </div>
              ) : (
                weatherData && (
                  <motion.div 
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="hidden sm:flex items-center gap-3 text-xs font-semibold glass px-3 py-1.5 rounded-full border border-slate-200/50 dark:border-emerald-900/30"
                  >
                    <CloudSun className="w-4 h-4 text-amber-500 animate-pulse" />
                    <span>{weatherData.temp} - {weatherData.desc}</span>
                  </motion.div>
                )
              )}
            </AnimatePresence>
          </div>
        </header>

        {/* Chat Bubbles Area */}
        <section className="flex-1 overflow-y-auto p-6 flex flex-col gap-4 bg-slate-50/50 dark:bg-[#060a07]">
          {messages.map((msg, i) => (
            <div 
              key={i} 
              className={`flex max-w-[80%] flex-col ${
                msg.sender === 'user' ? 'self-end' : 'self-start'
              }`}
            >
              <div 
                className={`p-4 rounded-2xl leading-relaxed shadow-sm text-sm relative group ${
                  msg.sender === 'user'
                    ? 'bg-emerald-600 text-white dark:text-[#060a07] rounded-tr-sm self-end'
                    : 'bg-white dark:bg-emerald-950/30 border border-slate-200/40 dark:border-emerald-950/30 rounded-tl-sm self-start'
                }`}
              >
                <div dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, '<br>') }} />
                
                {/* Timestamp */}
                {msg.time && (
                  <div className={`text-[9px] mt-1.5 flex items-center justify-end gap-1 opacity-80 select-none ${
                    msg.sender === 'user' ? 'text-white/90 dark:text-[#060a07]/90' : 'text-slate-500 dark:text-slate-400 font-medium'
                  }`}>
                    <Clock className="w-2.5 h-2.5" />
                    {msg.time}
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Typing State Loader */}
          {loading && (
            <div className="flex max-w-[80%] flex-col self-start">
              <div className="p-4 bg-white dark:bg-emerald-950/30 border border-slate-200/40 dark:border-emerald-950/30 rounded-2xl rounded-tl-sm shadow-sm flex flex-col gap-1.5">
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold">Smart Farmer AI is writing...</span>
                <div className="flex gap-1.5 items-center justify-start py-1">
                  <div className="w-2 h-2 rounded-full bg-emerald-600 typing-dot"></div>
                  <div className="w-2 h-2 rounded-full bg-emerald-600 typing-dot"></div>
                  <div className="w-2 h-2 rounded-full bg-emerald-600 typing-dot"></div>
                </div>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </section>

        {/* Input Bar & Suggested Chips */}
        <footer className="bg-white dark:bg-[#0c120d] border-t border-slate-200 dark:border-emerald-950/40 p-4 shadow-xl">
          <div className="max-w-4xl mx-auto flex flex-col gap-4">
            
            {/* Suggested Dynamic Chips */}
            <div className="flex gap-2 overflow-x-auto pb-1 max-w-full">
              {currentChips.map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => triggerQuestion(chip)}
                  className="px-3.5 py-1.5 bg-slate-50 hover:bg-emerald-50 dark:bg-emerald-950/10 dark:hover:bg-emerald-950/20 border border-slate-200 dark:border-emerald-950/40 hover:border-emerald-500 rounded-full text-xs font-bold text-emerald-600 dark:text-emerald-400 transition-colors whitespace-nowrap"
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Input Submission Form */}
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                submitMessage(userInput);
              }}
              className="flex items-center gap-3 bg-slate-50 dark:bg-emerald-950/10 border border-slate-200 dark:border-emerald-950/40 focus-within:border-emerald-500 focus-within:shadow-md focus-within:shadow-emerald-500/5 px-4 py-2.5 rounded-full transition-all"
            >
              <button 
                type="button" 
                title="Voice Input (Upcoming)"
                className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-slate-200 dark:hover:bg-emerald-950/30 text-slate-500 dark:text-slate-400 hover:text-emerald-600 transition-colors shrink-0"
              >
                <Mic className="w-5 h-5" />
              </button>
              
              <input 
                type="text" 
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Ask about fertilizer, pests, crops, seeds..." 
                className="flex-1 bg-transparent border-none outline-none text-sm placeholder-slate-500 dark:placeholder-slate-400"
              />

              <button 
                type="submit" 
                title="Send Message"
                disabled={!userInput.trim() || loading}
                className="w-10 h-10 rounded-full flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-200 dark:disabled:bg-emerald-950/20 text-white disabled:text-slate-500 hover:scale-105 active:scale-95 transition-all shrink-0 shadow-lg shadow-emerald-600/10"
              >
                <SendHorizontal className="w-4.5 h-4.5" />
              </button>
            </form>

          </div>
        </footer>

      </main>

    </div>
  );
}
