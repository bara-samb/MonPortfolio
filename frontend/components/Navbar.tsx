"use client";

import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Code2, Sun, Moon, Download, Home, Cpu, Briefcase, GraduationCap, Mail, Languages, ChevronDown } from 'lucide-react';
import { PERSONAL_INFO } from '@/lib/constants';
import { useLanguage } from '@/lib/LanguageContext';

const navLinks = [
  { key: 'nav_home' as const, href: '#accueil', icon: Home },
  { key: 'nav_skills' as const, href: '#competences', icon: Cpu },
  { key: 'nav_projects' as const, href: '#projets', icon: Briefcase },
  { key: 'nav_timeline' as const, href: '#parcours', icon: GraduationCap },
  { key: 'nav_contact' as const, href: '#contact', icon: Mail },
];

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

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

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null;
    const initialTheme = savedTheme || 'dark';
    setTheme(initialTheme);
    if (initialTheme === 'light') {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    if (newTheme === 'light') {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    }
  };

  return (
    <>
      {/* Main Navigation Header */}
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
      } ${
        scrolled 
          ? 'py-4 bg-[#030712]/80 backdrop-blur-md border-b border-white/5 shadow-lg' 
          : 'py-6 bg-transparent'
      }`}>
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a href="#accueil" className="flex items-center gap-2 group min-w-0">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center group-hover:border-sky-400 group-hover:bg-sky-500/20 transition-all shrink-0">
              <Code2 className="w-5 h-5 text-sky-400 shrink-0" />
            </div>
            <span className="font-display font-bold text-sm sm:text-base md:text-lg tracking-tight text-white group-hover:text-sky-400 transition-colors truncate max-w-[130px] sm:max-w-none">
              {PERSONAL_INFO.name}
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <ul className="flex items-center gap-8 text-sm font-medium text-slate-400">
              {navLinks.map((link) => (
                <li key={link.key}>
                  <a 
                    href={link.href}
                    className="hover:text-white transition-colors py-2 relative group"
                  >
                    {t(link.key)}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-sky-400 transition-all group-hover:w-full"></span>
                  </a>
                </li>
              ))}
            </ul>
            
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-white/5 border border-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
              aria-label="Changer le thème"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-sky-500" />}
            </button>

            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/5 border border-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-all text-xs font-semibold uppercase tracking-wider cursor-pointer select-none"
              >
                <Languages className="w-3.5 h-3.5 text-sky-400" />
                <span>{language}</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${langDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {langDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setLangDropdownOpen(false)} />
                  <div className={`absolute top-full ${language === 'ar' ? 'left-0' : 'right-0'} mt-2 w-28 rounded-lg bg-slate-950 border border-white/10 p-1 shadow-xl z-20`}>
                    <button
                      onClick={() => { setLanguage('fr'); setLangDropdownOpen(false); }}
                      className={`w-full text-left px-3 py-1.5 rounded text-xs transition-colors flex items-center justify-between cursor-pointer ${language === 'fr' ? 'text-sky-400 bg-white/5 font-bold' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                    >
                      <span>Français</span>
                      <span className="text-[10px] opacity-60">FR</span>
                    </button>
                    <button
                      onClick={() => { setLanguage('en'); setLangDropdownOpen(false); }}
                      className={`w-full text-left px-3 py-1.5 rounded text-xs transition-colors flex items-center justify-between cursor-pointer ${language === 'en' ? 'text-sky-400 bg-white/5 font-bold' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                    >
                      <span>English</span>
                      <span className="text-[10px] opacity-60">EN</span>
                    </button>
                    <button
                      onClick={() => { setLanguage('ar'); setLangDropdownOpen(false); }}
                      className={`w-full text-left px-3 py-1.5 rounded text-xs transition-colors flex items-center justify-between cursor-pointer ${language === 'ar' ? 'text-sky-400 bg-white/5 font-bold' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                    >
                      <span>العربية</span>
                      <span className="text-[10px] opacity-60">AR</span>
                    </button>
                  </div>
                </>
              )}
            </div>

            <a 
              href={PERSONAL_INFO.cvUrl} 
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-sky-400 border border-sky-400/30 rounded-lg hover:bg-sky-400 hover:text-slate-950 transition-all duration-300"
            >
              {t('hero_cv')}
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile controls (Theme Toggle, Language dropdown, Hamburger menu) */}
          <div className="flex items-center gap-2 md:hidden">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-white/5 border border-white/5 text-slate-400 hover:text-white transition-all cursor-pointer flex items-center justify-center shrink-0"
              aria-label="Changer le thème"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-sky-500" />}
            </button>

            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="p-2 rounded-lg bg-white/5 border border-white/5 text-slate-400 hover:text-white transition-all cursor-pointer flex items-center justify-center shrink-0"
                aria-label="Changer de langue"
              >
                <Languages className="w-4 h-4 text-sky-400" />
              </button>
              {langDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setLangDropdownOpen(false)} />
                  <div className="absolute top-full right-0 mt-2 w-28 rounded-lg bg-slate-950 border border-white/10 p-1 shadow-xl z-20">
                    <button
                      onClick={() => { setLanguage('fr'); setLangDropdownOpen(false); }}
                      className={`w-full text-left px-3 py-1.5 rounded text-xs transition-colors flex items-center justify-between cursor-pointer ${language === 'fr' ? 'text-sky-400 bg-white/5 font-bold' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                    >
                      <span>Français</span>
                      <span className="text-[10px] opacity-60">FR</span>
                    </button>
                    <button
                      onClick={() => { setLanguage('en'); setLangDropdownOpen(false); }}
                      className={`w-full text-left px-3 py-1.5 rounded text-xs transition-colors flex items-center justify-between cursor-pointer ${language === 'en' ? 'text-sky-400 bg-white/5 font-bold' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                    >
                      <span>English</span>
                      <span className="text-[10px] opacity-60">EN</span>
                    </button>
                    <button
                      onClick={() => { setLanguage('ar'); setLangDropdownOpen(false); }}
                      className={`w-full text-left px-3 py-1.5 rounded text-xs transition-colors flex items-center justify-between cursor-pointer ${language === 'ar' ? 'text-sky-400 bg-white/5 font-bold' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                    >
                      <span>العربية</span>
                      <span className="text-[10px] opacity-60">AR</span>
                    </button>
                  </div>
                </>
              )}
            </div>

            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-400 hover:text-white transition-colors"
              aria-label="Toggle menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Drawer Overlay (Slides from RIGHT) */}
      <div className={`fixed top-0 bottom-0 ${language === 'ar' ? 'left-0 border-r' : 'right-0 border-l'} w-[80%] sm:w-[320px] z-50 bg-slate-950 border-white/10 md:hidden transition-all duration-300 flex flex-col p-6 shadow-2xl ${
        isOpen 
          ? 'translate-x-0 opacity-100 pointer-events-auto' 
          : `${language === 'ar' ? '-translate-x-full' : 'translate-x-full'} opacity-0 pointer-events-none`
      }`}>
        {/* Drawer Header (Only Close control button, aligned right) */}
        <div className={`flex items-center ${language === 'ar' ? 'justify-start' : 'justify-end'} pb-4 border-b border-white/5`}>
          {/* Close Button */}
          <button 
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-lg bg-white/5 border border-white/5 text-slate-400 hover:text-white transition-all cursor-pointer flex items-center justify-center shrink-0"
            aria-label="Fermer le menu"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Drawer Navigation Links */}
        <ul className="flex flex-col gap-5 text-lg font-medium text-slate-400 pt-6">
          {navLinks.map((link, idx) => {
            const Icon = link.icon;
            return (
              <li 
                key={link.key}
                style={{ transitionDelay: isOpen ? `${idx * 60}ms` : '0ms' }}
                className={`transform transition-all duration-300 ${
                  isOpen 
                    ? 'translate-x-0 opacity-100' 
                    : `${language === 'ar' ? '-translate-x-4' : 'translate-x-4'} opacity-0`
                }`}
              >
                <a 
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3.5 py-2 text-slate-400 hover:text-white transition-colors group"
                >
                  <Icon className="w-5 h-5 text-emerald-400 drop-shadow-[0_0_6px_rgba(16,185,129,0.5)] transition-transform duration-300 group-hover:scale-110 shrink-0" />
                  <span>{t(link.key)}</span>
                </a>
              </li>
            );
          })}
        </ul>
        
        {/* Drawer Footer CV Controls */}
        <div className="space-y-4 pb-6 border-t border-white/5 pt-6 text-center mt-auto">
          <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold font-mono">Mon CV / Langue</p>
          <a 
            href={PERSONAL_INFO.cvUrl} 
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-center gap-2 w-full py-3.5 text-center text-sm font-semibold !text-white bg-sky-500 hover:bg-sky-400 text-slate-950 rounded-xl transition-all shadow-md active:scale-98"
          >
            <Download className="w-4 h-4 shrink-0" />
            <span>{t('hero_cv')}</span>
          </a>

          {/* Mobile Language Switcher Row */}
          <div className="flex items-center justify-center gap-2 bg-white/5 p-1.5 rounded-lg border border-white/5">
            <button
              onClick={() => { setLanguage('fr'); setIsOpen(false); }}
              className={`flex-1 py-1 text-xs font-semibold rounded transition-all cursor-pointer ${language === 'fr' ? 'bg-sky-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
            >
              FR
            </button>
            <button
              onClick={() => { setLanguage('en'); setIsOpen(false); }}
              className={`flex-1 py-1 text-xs font-semibold rounded transition-all cursor-pointer ${language === 'en' ? 'bg-sky-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
            >
              EN
            </button>
            <button
              onClick={() => { setLanguage('ar'); setIsOpen(false); }}
              className={`flex-1 py-1 text-xs font-semibold rounded transition-all cursor-pointer ${language === 'ar' ? 'bg-sky-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
            >
              AR
            </button>
          </div>
        </div>
      </div>

      {/* Dimmer backdrop overlay */}
      <div 
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden transition-all duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />
    </>
  );
}
