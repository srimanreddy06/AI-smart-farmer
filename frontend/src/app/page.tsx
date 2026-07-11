'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sprout, Bug, CloudSun, FlaskConical, MessageSquare, LineChart, 
  Menu, X, Sun, Moon, ArrowRight, Star, ChevronDown, Check,
  Smartphone, Globe, Mail, Users, ArrowUpRight, ShieldCheck, Zap, HelpCircle
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// Types
type TabType = 'chat' | 'disease' | 'weather' | 'mandi' | 'analytics';

export default function LandingPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('chat');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sync dark mode class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Framer Motion presets
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  } as const;

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  } as const;

  // Dummy stats
  const stats = [
    { value: '95%', label: 'AI Accuracy', desc: 'Verified crop disease diagnostics' },
    { value: '24/7', label: 'Availability', desc: 'Real-time assistant, no waiting' },
    { value: '20+', label: 'Supported Crops', desc: 'Indian cash and food grains' },
    { value: '50+', label: 'AI Farming Solutions', desc: 'Dynamic agricultural advice models' }
  ];

  // Features list
  const features = [
    {
      icon: <Sprout className="w-8 h-8 text-emerald-500" />,
      title: 'Crop Recommendation',
      desc: 'Advanced machine learning models analyze soil type, region, climate, and season to suggest the highest-yielding crop combinations.'
    },
    {
      icon: <Bug className="w-8 h-8 text-emerald-500" />,
      title: 'Disease Detection',
      desc: 'Upload an instant leaf photo. Our deep-learning vision models diagnose infections, pests, and nutrient deficiencies with actionable organic fixes.'
    },
    {
      icon: <CloudSun className="w-8 h-8 text-emerald-500" />,
      title: 'Weather Forecast',
      desc: 'Hyperlocal weather forecasting specifically formatted for farmers—offering dynamic warnings on frost, dry spells, and heavy rain.'
    },
    {
      icon: <FlaskConical className="w-8 h-8 text-emerald-500" />,
      title: 'Fertilizer Advisor',
      desc: 'Input crop stage and soil quality to receive tailor-made chemical and organic fertilizer ratios (NPK ratios) for optimal plant nutrition.'
    },
    {
      icon: <MessageSquare className="w-8 h-8 text-emerald-500" />,
      title: 'Multilingual AI Chat',
      desc: 'Get expert agricultural support instantly. Converse in English, Hindi (हिन्दी), Telugu (తెలుగు), Tamil (தமிழ்), or Kannada in a custom chat UI.'
    },
    {
      icon: <LineChart className="w-8 h-8 text-emerald-500" />,
      title: 'Market Prices (Mandi)',
      desc: 'Real-time agricultural market updates. Monitor live crop prices across wholesale markets to sell at the best profit margins.'
    }
  ];

  // FAQ List
  const faqs = [
    {
      q: 'How does Smart Farmer AI work?',
      a: 'Smart Farmer AI uses advanced generative AI models and computer vision algorithms. By inputting text queries or uploading crop leaf photographs, our models analyze soil parameters, weather dynamics, and botanical characteristics to produce localized solutions.'
    },
    {
      q: 'Which languages are supported?',
      a: 'We support English, Hindi (हिन्दी), Telugu (తెలుగు), Tamil (தமிழ்), and Kannada. You can easily switch between languages with one tap on the dashboard.'
    },
    {
      q: 'Is it free?',
      a: 'Our core features—including AI chat advisor, weather analysis, and mandi price queries—are completely free for individual farmers. We offer premium enterprise features for bulk co-operatives and soil laboratories.'
    },
    {
      q: 'Can I upload crop images?',
      a: 'Yes! The Disease Detection interface allows uploading leaf photos directly from your phone camera, instantly identifying infections like leaf blast, blight, or pests.'
    },
    {
      q: 'Does it work on mobile?',
      a: 'Absolutely. Smart Farmer AI is built with a mobile-first philosophy, adapting to any screen size (desktop, tablet, or smartphone) and working efficiently even on slow 3G/4G networks.'
    }
  ];

  return (
    <div className={`min-h-screen text-slate-800 transition-colors duration-300 dark:text-slate-200 dark:bg-[#060a07]`}>
      
      {/* Background Decorative Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-[800px] right-1/4 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[150px] pointer-events-none -z-10" />
      <div className="absolute bottom-[1200px] left-1/3 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[130px] pointer-events-none -z-10" />

      {/* NAVBAR */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'glass py-4' : 'bg-transparent py-6'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-600/20 group-hover:scale-105 transition-transform duration-200">
              <Sprout className="w-6 h-6 text-white" />
            </div>
            <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent dark:from-emerald-400 dark:to-emerald-300">
              Smart Farmer <span className="font-light text-slate-500 dark:text-slate-400">AI</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium hover:text-emerald-600 transition-colors dark:hover:text-emerald-400">Features</a>
            <a href="#how-it-works" className="text-sm font-medium hover:text-emerald-600 transition-colors dark:hover:text-emerald-400">How It Works</a>
            <a href="#why-choose-us" className="text-sm font-medium hover:text-emerald-600 transition-colors dark:hover:text-emerald-400">Why Us</a>
            <a href="#testimonials" className="text-sm font-medium hover:text-emerald-600 transition-colors dark:hover:text-emerald-400">Testimonials</a>
            <a href="#faq" className="text-sm font-medium hover:text-emerald-600 transition-colors dark:hover:text-emerald-400">FAQ</a>
          </div>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Theme Toggle */}
            <button 
              onClick={() => setDarkMode(!darkMode)} 
              className="w-10 h-10 rounded-xl glass flex items-center justify-center hover:bg-slate-100 dark:hover:bg-emerald-950/40 transition-colors"
            >
              {darkMode ? <Sun className="w-5 h-5 text-amber-500" /> : <Moon className="w-5 h-5 text-emerald-600" />}
            </button>
            <Link 
              href="/chat" 
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium text-sm transition-all duration-200 shadow-md shadow-emerald-600/10 hover:shadow-lg hover:shadow-emerald-600/20 active:scale-98"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Navigation Toggle */}
          <div className="flex items-center gap-3 lg:hidden">
            <button 
              onClick={() => setDarkMode(!darkMode)} 
              className="w-10 h-10 rounded-xl glass flex items-center justify-center transition-colors"
            >
              {darkMode ? <Sun className="w-5 h-5 text-amber-500" /> : <Moon className="w-5 h-5 text-emerald-600" />}
            </button>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-10 h-10 rounded-xl glass flex items-center justify-center text-slate-700 dark:text-slate-300"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[75px] left-0 w-full bg-white dark:bg-[#0c120d] border-b border-slate-200 dark:border-emerald-950/40 z-40 p-6 flex flex-col gap-6 shadow-xl lg:hidden"
          >
            <div className="flex flex-col gap-4 font-medium">
              <a href="#features" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-slate-100 dark:border-emerald-950/20 hover:text-emerald-600">Features</a>
              <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-slate-100 dark:border-emerald-950/20 hover:text-emerald-600">How It Works</a>
              <a href="#why-choose-us" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-slate-100 dark:border-emerald-950/20 hover:text-emerald-600">Why Us</a>
              <a href="#testimonials" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-slate-100 dark:border-emerald-950/20 hover:text-emerald-600">Testimonials</a>
              <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-slate-100 dark:border-emerald-950/20 hover:text-emerald-600">FAQ</a>
            </div>
            <Link 
              href="/chat" 
              onClick={() => setMobileMenuOpen(false)} 
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium text-center shadow-lg shadow-emerald-600/10"
            >
              Get Started
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <section className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left Content */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="lg:col-span-6 flex flex-col items-start text-left"
          >
            {/* Small Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/40 rounded-full text-xs font-semibold text-emerald-700 dark:text-emerald-400 mb-6 shadow-sm">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              🚀 AI Powered Agriculture Assistant
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6">
              AI That Helps Farmers <br />
              Make <span className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600 bg-clip-text text-transparent dark:from-emerald-400 dark:via-emerald-300 dark:to-emerald-400">Better Decisions</span> <br />
              Every Day
            </h1>

            {/* Description */}
            <p className="text-lg text-slate-500 dark:text-slate-400 mb-8 max-w-xl leading-relaxed">
              Smart Farmer AI helps farmers increase productivity through AI-powered crop recommendations, disease detection, weather forecasting, fertilizer guidance, multilingual AI chat, and live market intelligence—all in one intelligent platform.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-8">
              <Link 
                href="/chat" 
                className="px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 group shadow-lg shadow-emerald-600/10 hover:shadow-emerald-600/25 transition-all active:scale-98"
              >
                Get Started 
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a 
                href="#features" 
                className="px-8 py-3.5 glass hover:bg-slate-100 dark:hover:bg-emerald-950/30 text-slate-700 dark:text-slate-300 rounded-xl font-semibold flex items-center justify-center gap-2 border border-slate-200 dark:border-emerald-950/60 transition-colors"
              >
                Explore Features
              </a>
            </div>

            {/* Trust Badging */}
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white dark:border-emerald-950 bg-emerald-800 flex items-center justify-center text-[10px] font-bold text-white overflow-hidden shadow-sm">
                    {`F${i}`}
                  </div>
                ))}
              </div>
              <div className="text-xs">
                <div className="flex text-amber-500 font-bold items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="w-3.5 h-3.5 fill-current" />)}
                </div>
                <span className="text-slate-500 dark:text-slate-400">Trusted by 10,000+ Farmers across India</span>
              </div>
            </div>

          </motion.div>

          {/* Hero Right Column (Cinematic Image & Floating Glass Cards) */}
          <div className="lg:col-span-6 relative flex items-center justify-center py-8">
            
            {/* Holographic Glowing Backdrop Circle */}
            <div className="absolute w-[350px] h-[350px] bg-emerald-500/20 rounded-full blur-[80px] -z-10 animate-pulse" />

            {/* Farmer Hero Image Container */}
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="relative w-full max-w-[480px] h-[520px] rounded-3xl overflow-hidden border border-emerald-500/10 shadow-2xl"
            >
              <Image 
                src="/indian_farmer_hero.png" 
                alt="Indian Farmer using Smart Farmer AI" 
                fill 
                priority
                sizes="(max-width: 768px) 100vw, 480px"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/40 via-transparent to-transparent" />
            </motion.div>

            {/* Floating Card 1: Soil Moisture */}
            <motion.div 
              className="absolute -top-4 -left-6 glass px-4 py-3 rounded-2xl flex items-center gap-3 shadow-lg border border-slate-200/50 dark:border-emerald-900/20 animate-float"
              style={{ animationDelay: '0.5s' }}
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/40 flex items-center justify-center text-emerald-600">
                <Sprout className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Soil Moisture</p>
                <p className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400">72% <span className="text-[9px] font-normal text-slate-400">Optimal</span></p>
              </div>
            </motion.div>

            {/* Floating Card 2: Market Price */}
            <motion.div 
              className="absolute top-1/4 -right-10 glass px-4 py-3 rounded-2xl flex items-center gap-3 shadow-lg border border-slate-200/50 dark:border-emerald-900/20 animate-float"
              style={{ animationDelay: '2s' }}
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/40 flex items-center justify-center text-emerald-600">
                <LineChart className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Rice Mandi Rate</p>
                <p className="text-sm font-extrabold text-slate-700 dark:text-slate-200">₹2,450 <span className="text-[9px] text-emerald-500 font-semibold">+4.2%</span></p>
              </div>
            </motion.div>

            {/* Floating Card 3: Crop Health / AI Diagnostic */}
            <motion.div 
              className="absolute bottom-12 -left-12 glass px-4 py-3 rounded-2xl flex items-center gap-3 shadow-lg border border-slate-200/50 dark:border-emerald-900/20 animate-float"
              style={{ animationDelay: '1s' }}
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/40 flex items-center justify-center text-emerald-600">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Crop Diagnostics</p>
                <p className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400">No Infections</p>
              </div>
            </motion.div>

            {/* Floating Card 4: Weather Widget */}
            <motion.div 
              className="absolute -bottom-2 -right-6 glass px-5 py-3.5 rounded-2xl shadow-lg border border-slate-200/50 dark:border-emerald-900/20 animate-float"
              style={{ animationDelay: '3s' }}
            >
              <div className="flex items-center gap-3">
                <CloudSun className="w-8 h-8 text-amber-500 animate-pulse" />
                <div>
                  <p className="text-sm font-extrabold text-slate-700 dark:text-slate-200">28°C</p>
                  <p className="text-[9px] text-slate-500 dark:text-slate-400">Partly Cloudy</p>
                </div>
              </div>
              <div className="mt-2 border-t border-slate-200/50 dark:border-emerald-950/40 pt-1.5 flex gap-3 text-[8px] font-semibold text-slate-400">
                <span>Humidity: 65%</span>
                <span>Rain: 12%</span>
              </div>
            </motion.div>

          </div>

        </div>
      </section>

      {/* TRUST / VALUE PROP SECTION */}
      <section className="py-16 bg-slate-100/50 dark:bg-emerald-950/10 border-y border-slate-200/50 dark:border-emerald-950/40 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">Core Foundations</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Engineered for rural connectivity, accessibility, and high performance</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            
            <div className="glass p-5 rounded-2xl flex flex-col items-center justify-center text-center border border-slate-200/40 dark:border-emerald-950/30">
              <Zap className="w-6 h-6 text-emerald-500 mb-3" />
              <h3 className="text-sm font-bold">Instant Answers</h3>
              <p className="text-[10px] text-slate-400 mt-1">24/7 AI response speeds</p>
            </div>

            <div className="glass p-5 rounded-2xl flex flex-col items-center justify-center text-center border border-slate-200/40 dark:border-emerald-950/30">
              <Globe className="w-6 h-6 text-emerald-500 mb-3" />
              <h3 className="text-sm font-bold">5+ Languages</h3>
              <p className="text-[10px] text-slate-400 mt-1">Regional script chat</p>
            </div>

            <div className="glass p-5 rounded-2xl flex flex-col items-center justify-center text-center border border-slate-200/40 dark:border-emerald-950/30">
              <ShieldCheck className="w-6 h-6 text-emerald-500 mb-3" />
              <h3 className="text-sm font-bold">Safe & Encrypted</h3>
              <p className="text-[10px] text-slate-400 mt-1">Secure local farming data</p>
            </div>

            <div className="glass p-5 rounded-2xl flex flex-col items-center justify-center text-center border border-slate-200/40 dark:border-emerald-950/30">
              <Smartphone className="w-6 h-6 text-emerald-500 mb-3" />
              <h3 className="text-sm font-bold">Works Everywhere</h3>
              <p className="text-[10px] text-slate-400 mt-1">Lightweight on low net</p>
            </div>

            <div className="col-span-2 md:col-span-1 glass p-5 rounded-2xl flex flex-col items-center justify-center text-center border border-slate-200/40 dark:border-emerald-950/30">
              <Users className="w-6 h-6 text-emerald-500 mb-3" />
              <h3 className="text-sm font-bold">10k+ Farmers</h3>
              <p className="text-[10px] text-slate-400 mt-1">Verified user community</p>
            </div>

          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="py-24 px-6 max-w-7xl mx-auto scroll-mt-10">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-emerald-600 dark:text-emerald-400 text-sm font-extrabold uppercase tracking-wider mb-2">Core Solutions</h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold mb-4">Everything You Need To Grow Better</h3>
          <p className="text-slate-500 dark:text-slate-400">
            Smart agriculture tools powered by cutting-edge deep learning models, local weather stations, and crop intelligence databases.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -6 }}
              className="glass p-8 rounded-3xl border border-slate-200/50 dark:border-emerald-950/40 flex flex-col items-start text-left shadow-sm hover:shadow-lg transition-all duration-300 relative group overflow-hidden"
            >
              {/* Subtle hover background highlight */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 to-emerald-500/5 group-hover:opacity-100 opacity-0 transition-opacity duration-300 -z-10" />
              
              {/* Card Icon */}
              <div className="w-14 h-14 rounded-2xl bg-emerald-100/50 dark:bg-emerald-950/20 flex items-center justify-center mb-6 shadow-inner group-hover:scale-105 transition-transform duration-200">
                {feat.icon}
              </div>

              {/* Card Title */}
              <h4 className="text-xl font-bold mb-3 text-slate-800 dark:text-slate-100">{feat.title}</h4>

              {/* Card Description */}
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{feat.desc}</p>
            </motion.div>
          ))}
        </div>

      </section>

      {/* HOW IT WORKS SECTION */}
      <section id="how-it-works" className="py-24 bg-slate-100/30 dark:bg-emerald-950/5 border-y border-slate-200/30 dark:border-emerald-950/20 px-6">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-emerald-600 dark:text-emerald-400 text-sm font-extrabold uppercase tracking-wider mb-2">Simplicity First</h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold mb-4">How It Works</h3>
            <p className="text-slate-500 dark:text-slate-400">
              An intuitive interface designed to get farmers direct agricultural advice in seconds.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 relative">
            
            {/* Steps line connector (visible on desktop) */}
            <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-emerald-100 via-emerald-600 to-emerald-100 dark:from-emerald-950 dark:via-emerald-400 dark:to-emerald-950 -z-10" />

            {/* Step 1 */}
            <div className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 rounded-2xl bg-white dark:bg-emerald-900/30 border border-slate-200/50 dark:border-emerald-950/50 flex items-center justify-center font-extrabold text-xl text-emerald-600 dark:text-emerald-400 shadow-md group-hover:scale-105 transition-transform duration-200">
                1
              </div>
              <h4 className="text-lg font-bold mt-6 mb-2">Ask Your Question</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-[200px]">Type or speak your farming query in your regional script.</p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 rounded-2xl bg-white dark:bg-emerald-900/30 border border-slate-200/50 dark:border-emerald-950/50 flex items-center justify-center font-extrabold text-xl text-emerald-600 dark:text-emerald-400 shadow-md group-hover:scale-105 transition-transform duration-200">
                2
              </div>
              <h4 className="text-lg font-bold mt-6 mb-2">AI Understands</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-[200px]">Smart Farmer AI models process soil context and crop stages.</p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 rounded-2xl bg-white dark:bg-emerald-900/30 border border-slate-200/50 dark:border-emerald-950/50 flex items-center justify-center font-extrabold text-xl text-emerald-600 dark:text-emerald-400 shadow-md group-hover:scale-105 transition-transform duration-200">
                3
              </div>
              <h4 className="text-lg font-bold mt-6 mb-2">Instant Smart Advice</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-[200px]">Receive immediate suggestions, dosages, and organic fixes.</p>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 rounded-2xl bg-emerald-600 flex items-center justify-center font-extrabold text-xl text-white shadow-lg shadow-emerald-600/10 group-hover:scale-105 transition-transform duration-200">
                4
              </div>
              <h4 className="text-lg font-bold mt-6 mb-2">Improve Crop Yield</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-[200px]">Implement tips to harvest healthy yields and secure profits.</p>
            </div>

          </div>

        </div>
      </section>

      {/* WHY CHOOSE US & STATISTICS SECTION */}
      <section id="why-choose-us" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 text-left">
            <h2 className="text-emerald-600 dark:text-emerald-400 text-sm font-extrabold uppercase tracking-wider mb-2">Data-Driven Success</h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold mb-6">Empowering Farmers with Accurate AI Models</h3>
            <p className="text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
              Farming is a precise science. Our platforms integrate data science with practical agronomic wisdom to help you avoid seed loss, control disease outbreaks, and maximize fertilizer efficiency.
            </p>
            <Link 
              href="/chat" 
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold inline-flex items-center gap-2 transition-all shadow-md shadow-emerald-600/10"
            >
              Access Dashboard <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <div key={i} className="glass p-8 rounded-3xl border border-slate-200/50 dark:border-emerald-950/40 shadow-sm text-left">
                <h4 className="text-3xl sm:text-4xl font-extrabold text-emerald-600 dark:text-emerald-400 mb-2">{stat.value}</h4>
                <p className="text-md font-bold mb-1">{stat.label}</p>
                <p className="text-xs text-slate-400 leading-normal">{stat.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SCREENSHOTS / INTERACTIVE MOCKUP SECTION */}
      <section className="py-24 bg-slate-100/50 dark:bg-emerald-950/10 px-6 border-y border-slate-200/50 dark:border-emerald-950/40">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-emerald-600 dark:text-emerald-400 text-sm font-extrabold uppercase tracking-wider mb-2">Interactive Preview</h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold mb-4">Explore the App Interface</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              Click the tabs below to preview the core dashboards Indian farmers use to interact with our system.
            </p>
          </div>

          {/* Interactive Navigation Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10 max-w-3xl mx-auto">
            {(['chat', 'disease', 'weather', 'mandi', 'analytics'] as TabType[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold capitalize transition-all border ${
                  activeTab === tab
                    ? 'bg-emerald-600 border-emerald-600 text-white shadow-md'
                    : 'glass border-slate-200 dark:border-emerald-950/60 hover:bg-slate-100/50 dark:hover:bg-emerald-950/30'
                }`}
              >
                {tab === 'mandi' ? 'Mandi Rates' : `${tab} dashboard`}
              </button>
            ))}
          </div>

          {/* Dynamic Mockup Viewport Container */}
          <div className="max-w-4xl mx-auto glass p-4 rounded-3xl border border-slate-200/50 dark:border-emerald-950/40 shadow-2xl relative">
            
            {/* Fake macOS Window Header Buttons */}
            <div className="flex items-center gap-2 mb-4 border-b border-slate-200/40 dark:border-emerald-950/30 pb-3">
              <span className="w-3 h-3 rounded-full bg-red-400"></span>
              <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
              <span className="w-3 h-3 rounded-full bg-green-400"></span>
              <span className="text-[10px] text-slate-400 ml-4 font-mono select-none">https://smartfarmer.ai/app/dashboard</span>
            </div>

            <div className="bg-slate-50 dark:bg-[#070c08] rounded-2xl p-6 min-h-[380px] flex flex-col justify-between">
              
              {/* Conditional rendering of fake components */}
              {activeTab === 'chat' && (
                <div className="flex flex-col gap-4 text-left">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white"><Sprout className="w-4 h-4" /></div>
                    <span className="font-bold text-sm">Smart Farmer AI Chatbot</span>
                  </div>
                  <div className="flex flex-col gap-3 max-w-lg mt-2">
                    <div className="bg-emerald-100 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300 text-xs p-3 rounded-2xl rounded-tl-sm border border-emerald-200/20">
                      Hello! Select your crop type and ask me about fertilizer dosage or pest remedies.
                    </div>
                    <div className="self-end bg-emerald-600 text-white text-xs p-3 rounded-2xl rounded-tr-sm">
                      What is the best fertilizer timeline for Rabi wheat in Haryana soil?
                    </div>
                    <div className="bg-emerald-100 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300 text-xs p-3 rounded-2xl rounded-tl-sm border border-emerald-200/20 leading-relaxed">
                      For wheat in northern Haryana, apply Nitrogen (N) 120kg/ha, Phosphorus (P) 60kg/ha, Potash (K) 40kg/ha. Split Nitrogen into three applications: 1/3 during sowing, 1/3 at first irrigation, and 1/3 at second irrigation.
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'disease' && (
                <div className="flex flex-col gap-4 text-left">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white"><Bug className="w-4 h-4" /></div>
                    <span className="font-bold text-sm">Vision Diagnostic Hub</span>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6 mt-4">
                    <div className="relative border-2 border-dashed border-emerald-600/30 rounded-2xl p-4 flex flex-col items-center justify-center text-center bg-emerald-500/5">
                      <Bug className="w-10 h-10 text-emerald-500 mb-2 animate-bounce" />
                      <p className="text-xs font-bold">leaf_diagnose_92.png</p>
                      <p className="text-[10px] text-slate-400 mt-1">Uploaded via smartphone camera</p>
                    </div>
                    <div className="flex flex-col justify-center">
                      <span className="px-2 py-0.5 self-start text-[9px] font-bold bg-red-100 dark:bg-red-950/50 text-red-700 dark:text-red-400 rounded-full border border-red-200/30 mb-2">Infection Detected</span>
                      <h4 className="text-md font-bold mb-1">Rice Leaf Blight</h4>
                      <p className="text-xs text-slate-400 leading-normal mb-3">Diagnostic confidence: 97.4%</p>
                      <div className="p-3 bg-slate-100 dark:bg-emerald-950/20 border border-slate-200/30 dark:border-emerald-950/40 rounded-xl">
                        <p className="text-[10px] font-extrabold text-emerald-600 mb-1">Recommended Action</p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">Spray copper hydroxide formulation, or apply organic neem seed oil extract to prevent fungal spread.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'weather' && (
                <div className="flex flex-col gap-4 text-left">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white"><CloudSun className="w-4 h-4" /></div>
                      <span className="font-bold text-sm">Hyperlocal Weather Intelligence</span>
                    </div>
                    <span className="px-2.5 py-0.5 text-[9px] font-bold bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 rounded-full">Station Live</span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                    <div className="p-4 bg-white dark:bg-emerald-950/20 border border-slate-200/20 dark:border-emerald-950/40 rounded-2xl">
                      <p className="text-[10px] text-slate-400 font-medium">Temperature</p>
                      <p className="text-xl font-bold text-slate-700 dark:text-slate-200">29.4°C</p>
                      <p className="text-[8px] text-emerald-500 mt-1 font-semibold">Normal for Wheat</p>
                    </div>
                    <div className="p-4 bg-white dark:bg-emerald-950/20 border border-slate-200/20 dark:border-emerald-950/40 rounded-2xl">
                      <p className="text-[10px] text-slate-400 font-medium">Precipitation</p>
                      <p className="text-xl font-bold text-slate-700 dark:text-slate-200">12%</p>
                      <p className="text-[8px] text-slate-400 mt-1 font-semibold">No rain expected</p>
                    </div>
                    <div className="p-4 bg-white dark:bg-emerald-950/20 border border-slate-200/20 dark:border-emerald-950/40 rounded-2xl">
                      <p className="text-[10px] text-slate-400 font-medium">Wind Speed</p>
                      <p className="text-xl font-bold text-slate-700 dark:text-slate-200">14 km/h</p>
                      <p className="text-[8px] text-emerald-500 mt-1 font-semibold">Good for spraying</p>
                    </div>
                    <div className="p-4 bg-white dark:bg-emerald-950/20 border border-slate-200/20 dark:border-emerald-950/40 rounded-2xl">
                      <p className="text-[10px] text-slate-400 font-medium">Soil Moisture</p>
                      <p className="text-xl font-bold text-slate-700 dark:text-slate-200">68%</p>
                      <p className="text-[8px] text-amber-500 mt-1 font-semibold">Irrigate in 2 days</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'mandi' && (
                <div className="flex flex-col gap-4 text-left">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white"><LineChart className="w-4 h-4" /></div>
                      <span className="font-bold text-sm">Live Agricultural Mandi Index</span>
                    </div>
                    <span className="text-[9px] text-slate-400">Updated 10m ago</span>
                  </div>
                  <div className="overflow-x-auto mt-4">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="border-b border-slate-200/40 dark:border-emerald-950/30 text-slate-400">
                          <th className="py-2 text-left">Crop</th>
                          <th className="py-2 text-left">Location (Mandi)</th>
                          <th className="py-2 text-right">Price per Quintal</th>
                          <th className="py-2 text-right">Daily Change</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-slate-200/10 dark:border-emerald-950/10">
                          <td className="py-2 font-bold">Rice (Basmati)</td>
                          <td className="py-2 text-slate-400">Karnal, Haryana</td>
                          <td className="py-2 text-right font-bold">₹2,450</td>
                          <td className="py-2 text-right text-emerald-500 font-semibold">+4.2%</td>
                        </tr>
                        <tr className="border-b border-slate-200/10 dark:border-emerald-950/10">
                          <td className="py-2 font-bold">Cotton (Long Staple)</td>
                          <td className="py-2 text-slate-400">Adilabad, Telangana</td>
                          <td className="py-2 text-right font-bold">₹6,850</td>
                          <td className="py-2 text-right text-emerald-500 font-semibold">+1.8%</td>
                        </tr>
                        <tr>
                          <td className="py-2 font-bold">Wheat (Kalyan)</td>
                          <td className="py-2 text-slate-400">Bhatinda, Punjab</td>
                          <td className="py-2 text-right font-bold">₹2,120</td>
                          <td className="py-2 text-right text-red-500 font-semibold">-0.5%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'analytics' && (
                <div className="flex flex-col gap-4 text-left">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white"><LineChart className="w-4 h-4" /></div>
                    <span className="font-bold text-sm">Farm Productivity Analytics</span>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4 mt-6">
                    <div className="p-4 bg-white dark:bg-emerald-950/20 border border-slate-200/20 dark:border-emerald-950/40 rounded-2xl flex flex-col justify-between">
                      <p className="text-[10px] text-slate-400 font-medium">Estimated Yield</p>
                      <h4 className="text-xl font-extrabold text-slate-700 dark:text-slate-200 mt-2">+28%</h4>
                      <p className="text-[8px] text-emerald-500 mt-1">Compared to last season</p>
                    </div>
                    <div className="p-4 bg-white dark:bg-emerald-950/20 border border-slate-200/20 dark:border-emerald-950/40 rounded-2xl flex flex-col justify-between">
                      <p className="text-[10px] text-slate-400 font-medium">Water Saved</p>
                      <h4 className="text-xl font-extrabold text-slate-700 dark:text-slate-200 mt-2">45,000L</h4>
                      <p className="text-[8px] text-emerald-500 mt-1">Via drip irrigation alerts</p>
                    </div>
                    <div className="p-4 bg-white dark:bg-emerald-950/20 border border-slate-200/20 dark:border-emerald-950/40 rounded-2xl flex flex-col justify-between">
                      <p className="text-[10px] text-slate-400 font-medium">Disease Mitigation</p>
                      <h4 className="text-xl font-extrabold text-slate-700 dark:text-slate-200 mt-2">100%</h4>
                      <p className="text-[8px] text-slate-400 mt-1">Zero crop loss reported</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Promo link footer in mockup */}
              <div className="mt-6 pt-3 border-t border-slate-200/40 dark:border-emerald-950/30 flex justify-between items-center text-[10px] text-slate-400">
                <span>Smart Farmer AI Suite</span>
                <Link href="/chat" className="text-emerald-600 hover:text-emerald-500 font-bold flex items-center gap-1">Open Interactive App <ArrowUpRight className="w-3.5 h-3.5" /></Link>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section id="testimonials" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-emerald-600 dark:text-emerald-400 text-sm font-extrabold uppercase tracking-wider mb-2">Farmer Feedback</h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold mb-4">Loved by 10,000+ Farmers</h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Read how Smart Farmer AI has impacted agricultural production across Indian states.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          
          <div className="glass p-8 rounded-3xl border border-slate-200/50 dark:border-emerald-950/40 flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex text-amber-500 font-bold mb-4 gap-0.5">
                {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-sm italic leading-relaxed mb-6">
                "The leaf image diagnosis saved my tomato field from early blight. I uploaded a picture, got organic remedy suggestions, and fixed it within 3 days without expensive chemical sprays."
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-white text-sm">
                RR
              </div>
              <div className="text-left">
                <h4 className="text-xs font-bold">Ramesh Reddy</h4>
                <p className="text-[10px] text-slate-400">Tomato Farmer, Guntur, AP</p>
              </div>
            </div>
          </div>

          <div className="glass p-8 rounded-3xl border border-slate-200/50 dark:border-emerald-950/40 flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex text-amber-500 font-bold mb-4 gap-0.5">
                {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-sm italic leading-relaxed mb-6">
                "The chatbot answers in Hindi perfectly. I asked about rice fertilizer rates, and the AI structured it split-wise for my acreage. Very simple to understand."
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-white text-sm">
                HS
              </div>
              <div className="text-left">
                <h4 className="text-xs font-bold">Harpreet Singh</h4>
                <p className="text-[10px] text-slate-400">Rice Farmer, Bhatinda, Punjab</p>
              </div>
            </div>
          </div>

          <div className="glass p-8 rounded-3xl border border-slate-200/50 dark:border-emerald-950/40 flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex text-amber-500 font-bold mb-4 gap-0.5">
                {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-sm italic leading-relaxed mb-6">
                "Finding Mandi rates daily was tough, but now I get wholesale prices for rice and wheat across neighboring markets directly on WhatsApp and SMS. Great service!"
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-white text-sm">
                SP
              </div>
              <div className="text-left">
                <h4 className="text-xs font-bold">Suresh Patil</h4>
                <p className="text-[10px] text-slate-400">Wheat Farmer, Pune, MH</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="py-24 bg-slate-100/30 dark:bg-emerald-950/5 border-y border-slate-200/30 dark:border-emerald-950/20 px-6 scroll-mt-10">
        <div className="max-w-4xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-emerald-600 dark:text-emerald-400 text-sm font-extrabold uppercase tracking-wider mb-2">Answers to Common Questions</h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold mb-4">Frequently Asked Questions</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              Have questions? Find quick answers about operations, accuracy, and support details.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {faqs.map((faq, i) => (
              <div 
                key={i} 
                className="glass rounded-2xl border border-slate-200/40 dark:border-emerald-950/30 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-100/30 dark:hover:bg-emerald-950/20 transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                    {faq.q}
                  </span>
                  <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                
                <AnimatePresence initial={false}>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 text-sm text-slate-500 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-emerald-950/10 pt-4">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* CALL TO ACTION SECTION */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden py-16 px-8 sm:px-12 bg-gradient-to-r from-emerald-800 to-emerald-900 dark:from-emerald-900 dark:to-emerald-950 shadow-2xl text-center flex flex-col items-center">
          
          {/* Farm Sunset Background Decorator */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1200')] bg-cover bg-center opacity-10 mix-blend-overlay" />
          
          <div className="absolute w-[300px] h-[300px] bg-emerald-500/25 rounded-full blur-[80px] -top-12 -left-12 pointer-events-none" />
          <div className="absolute w-[300px] h-[300px] bg-emerald-500/20 rounded-full blur-[80px] -bottom-12 -right-12 pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center max-w-2xl">
            <h3 className="text-3xl sm:text-4xl sm:leading-tight font-extrabold text-white mb-4">
              Ready to Farm Smarter?
            </h3>
            <p className="text-md text-emerald-100/80 mb-8 max-w-lg">
              Join thousands of farmers across India using Smart Farmer AI every day to secure crop yields and increase profits.
            </p>
            <Link 
              href="/chat" 
              className="px-8 py-4 bg-white text-emerald-800 hover:bg-slate-100 font-extrabold rounded-xl text-md inline-flex items-center gap-2 transition-all hover:scale-103 shadow-xl active:scale-98"
            >
              Start Free Now <ArrowRight className="w-5 h-5 text-emerald-800" />
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-100/80 dark:bg-emerald-950/10 border-t border-slate-200/50 dark:border-emerald-950/40 py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 text-left mb-12">
          
          {/* Logo & Description */}
          <div className="md:col-span-2 flex flex-col items-start">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                <Sprout className="w-5 h-5 text-white" />
              </div>
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent dark:from-emerald-400 dark:to-emerald-300">
                Smart Farmer AI
              </span>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed mb-6">
              AI-powered agriculture platform for modern Indian farmers, providing localized recommendations, crop diagnostics, and live mandi insights.
            </p>
          </div>

          {/* Links Quick */}
          <div>
            <h4 className="font-bold text-sm text-emerald-700 dark:text-emerald-400 mb-4">Platform</h4>
            <div className="flex flex-col gap-2.5 text-xs text-slate-500 dark:text-slate-400">
              <a href="#features" className="hover:text-emerald-600 transition-colors">Features</a>
              <a href="#how-it-works" className="hover:text-emerald-600 transition-colors">How It Works</a>
              <a href="#why-choose-us" className="hover:text-emerald-600 transition-colors">Why Choose Us</a>
              <Link href="/chat" className="hover:text-emerald-600 transition-colors">AI Chatbot</Link>
            </div>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-bold text-sm text-emerald-700 dark:text-emerald-400 mb-4">Contact Support</h4>
            <div className="flex flex-col gap-2.5 text-xs text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-2"><Mail className="w-3.5 h-3.5" /> support@smartfarmer.ai</span>
              <span className="flex items-center gap-2"><Smartphone className="w-3.5 h-3.5" /> +91 98765 43210</span>
              <span className="flex items-center gap-2"><Globe className="w-3.5 h-3.5" /> www.smartfarmer.ai</span>
            </div>
          </div>

        </div>

        {/* Footer Bottom Quote & Copyright */}
        <div className="max-w-7xl mx-auto border-t border-slate-200/50 dark:border-emerald-950/40 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <blockquote className="text-xs italic text-slate-400 font-serif max-w-md text-center md:text-left leading-normal border-l-2 border-emerald-500/50 pl-3">
            "Agriculture is our wisest pursuit, because it will in the end contribute most to real wealth, good morals, and happiness."
          </blockquote>
          <div className="text-center md:text-right">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              © 2026 Smart Farmer AI. Made with ❤️ for Indian Farmers.
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}
